import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/lib/supabaseConfig";

type MessageContent = string | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }>;
type Msg = { role: "user" | "assistant"; content: MessageContent };

const RETRY_DELAYS_MS = [700, 1400, 2500];
const TRANSIENT_STATUSES = new Set([502, 503, 504]);
// Hard ceiling so a stalled edge function can NEVER leave marking spinning forever.
const DEFAULT_TIMEOUT_MS = 120_000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, init: RequestInit, attempt = 0): Promise<Response> {
  try {
    const response = await fetch(url, init);
    if (TRANSIENT_STATUSES.has(response.status) && attempt < RETRY_DELAYS_MS.length) {
      await wait(RETRY_DELAYS_MS[attempt]);
      return fetchWithRetry(url, init, attempt + 1);
    }
    return response;
  } catch (error) {
    // A deliberate timeout/abort must surface immediately — never retry it.
    if ((init.signal as AbortSignal | undefined)?.aborted) throw error;
    if (attempt < RETRY_DELAYS_MS.length) {
      await wait(RETRY_DELAYS_MS[attempt]);
      return fetchWithRetry(url, init, attempt + 1);
    }
    throw error;
  }
}

async function readErrorMessage(response: Response) {
  const fallback = TRANSIENT_STATUSES.has(response.status)
    ? "Tutor service is temporarily unavailable. Please try again in a moment."
    : "Tutor request failed.";

  try {
    const err = await response.json();
    if (typeof err?.message === "string") return err.message;
    if (typeof err?.error === "string") return err.error;
    return fallback;
  } catch {
    return fallback;
  }
}

export async function streamChat({
  messages,
  mode,
  subject,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  mode?: "tutor" | "grade" | "practice";
  subject?: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError?: (error: string) => void;
}) {
  const url = `${SUPABASE_URL}/functions/v1/ai-tutor`;
  let completed = false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  const finish = () => {
    if (!completed) {
      completed = true;
      clearTimeout(timeout);
      onDone();
    }
  };

  try {
    const resp = await fetchWithRetry(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, mode, subject: subject || "economics" }),
      signal: controller.signal,
    });

    if (!resp.ok) {
      onError?.(await readErrorMessage(resp));
      finish();
      return;
    }

    const contentType = resp.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      const data = await resp.json().catch(() => null);
      if (data?.fallback || data?.error || data?.message) {
        onError?.(data?.message || data?.error || "Tutor service is temporarily unavailable. Please try again in a moment.");
      }
      finish();
      return;
    }

    if (!resp.body) { finish(); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { finish(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
    finish();
  } catch (error) {
    clearTimeout(timeout);
    const aborted = controller.signal.aborted;
    console.warn("Tutor request unavailable (degraded):", error);
    onError?.(
      aborted
        ? "Marking is taking longer than expected and timed out. Your answer is saved — please try marking again."
        : "Tutor service is temporarily unavailable. Please try again in a moment.",
    );
    finish();
  }
}
