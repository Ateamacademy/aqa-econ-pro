// Tier 3 — provider-agnostic AI marking.
// Default provider is Lovable AI Gateway (no key setup required).
// To swap to Gemini-direct / Anthropic / OpenAI later, set AI_PROVIDER and
// AI_API_KEY in Supabase secrets — no code change needed.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type AnswerKind = "extended-response" | "diagram";

interface MarkingPayload {
  kind: AnswerKind;
  paperId?: string;
  questionId: string;
  question: {
    number: string;
    marks: number;
    prompt: string;
    markScheme?: {
      levels?: Array<{ level: string; band: string; descriptor: string }>;
      indicativeContent?: string[];
    };
  };
  studentAnswer: string;
  diagramData?: unknown;
  structuralCheckResults?: unknown;
}

interface AiAnalysis {
  strengths: string[];
  gaps: string[];
  levelRecommendation: { level: "L1" | "L2" | "L3" | "L4" | "L5"; rationale: string };
  kaaeBreakdown: {
    knowledge: { present: boolean; evidence: string };
    application: { present: boolean; evidence: string };
    analysis: { present: boolean; evidence: string };
    evaluation: { present: boolean; evidence: string };
  };
}

/* ── Rate limit: 20 calls / hour per user ── */
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkRate(userId: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const b = rateBuckets.get(userId);
  if (!b || b.resetAt < now) {
    rateBuckets.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (b.count >= RATE_LIMIT) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count++;
  return { ok: true };
}

/* ── SHA-256 cache key ── */
async function hashPayload(payload: MarkingPayload): Promise<string> {
  const text = JSON.stringify({
    q: payload.questionId,
    a: payload.studentAnswer,
    d: payload.diagramData ?? null,
  });
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ── Prompts ── */
function buildSystemPrompt(_payload: MarkingPayload): string {
  return `You are an AQA A-Level Economics marking assistant. You help students by identifying strengths and gaps in their answers against the AQA level-of-response framework. You do NOT assign marks.

ABSOLUTE RULES:
1. NEVER assign a numerical mark. Never output "7/9", "worth 5 marks", "awarded 15 marks", or similar.
2. Recommend a level (L1–L5) with rationale — not a mark within the level.
3. Use the AQA KAA+E framework: Knowledge, Application, Analysis, Evaluation. Evaluate each independently.
4. Ground every strength and gap in specific evidence from the student's answer. Quote short phrases from their work to illustrate points.
5. If the answer uses an acceptable alternative approach (different diagram, different argument structure), award the corresponding components generously.
6. Be direct about gaps — students benefit from specific feedback, not vague encouragement.
7. Output JSON only, no preamble or explanation outside the JSON structure.
8. Schema must match exactly:
{
  "strengths": [2-3 bullet points],
  "gaps": [2-3 bullet points],
  "levelRecommendation": {"level": "L1"|"L2"|"L3"|"L4"|"L5", "rationale": "1-2 sentences referencing KAA+E descriptors"},
  "kaaeBreakdown": {
    "knowledge": {"present": boolean, "evidence": "short quote or description"},
    "application": {"present": boolean, "evidence": "short quote or description"},
    "analysis": {"present": boolean, "evidence": "short quote or description"},
    "evaluation": {"present": boolean, "evidence": "short quote or description"}
  }
}`;
}

function buildUserPrompt(payload: MarkingPayload): string {
  const lines: string[] = [];
  lines.push(`Question ${payload.question.number} (${payload.question.marks} marks):`);
  lines.push(payload.question.prompt);
  if (payload.question.markScheme?.levels?.length) {
    lines.push("\nLevel descriptors:");
    for (const lvl of payload.question.markScheme.levels) {
      lines.push(`- ${lvl.level} (${lvl.band}): ${lvl.descriptor}`);
    }
  }
  if (payload.question.markScheme?.indicativeContent?.length) {
    lines.push("\nIndicative content:");
    for (const item of payload.question.markScheme.indicativeContent) {
      lines.push(`- ${item}`);
    }
  }
  if (payload.kind === "diagram") {
    lines.push("\nStudent's drawn diagram (structured canvas data):");
    lines.push(JSON.stringify(payload.diagramData ?? {}, null, 2));
    if (payload.structuralCheckResults) {
      lines.push("\nStructural check results from Tier 1:");
      lines.push(JSON.stringify(payload.structuralCheckResults, null, 2));
    }
    if (payload.studentAnswer?.trim()) {
      lines.push("\nWritten explanation accompanying the diagram:");
      lines.push(payload.studentAnswer);
    }
  } else {
    lines.push("\nStudent's answer:");
    lines.push(payload.studentAnswer || "(empty)");
  }
  lines.push("\nReturn the JSON analysis now.");
  return lines.join("\n");
}

/* ── Provider implementations ── */
type ProviderResult = { analysis: AiAnalysis; inputTokens?: number; outputTokens?: number };

async function callLovable(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Lovable AI error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Lovable AI returned empty response");
  return {
    analysis: JSON.parse(text),
    inputTokens: data.usage?.prompt_tokens,
    outputTokens: data.usage?.completion_tokens,
  };
}

async function callGemini(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1500,
        responseMimeType: "application/json",
      },
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gemini error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned empty response");
  return {
    analysis: JSON.parse(text),
    inputTokens: data.usageMetadata?.promptTokenCount,
    outputTokens: data.usageMetadata?.candidatesTokenCount,
  };
}

async function callAnthropic(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      temperature: 0.3,
      system: systemPrompt + "\n\nReturn ONLY the JSON object — no markdown fences.",
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Anthropic error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error("Anthropic returned empty response");
  // Strip code fences defensively
  const json = text.replace(/^```json\s*|\s*```$/g, "").trim();
  return {
    analysis: JSON.parse(json),
    inputTokens: data.usage?.input_tokens,
    outputTokens: data.usage?.output_tokens,
  };
}

async function callOpenAI(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`OpenAI error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenAI returned empty response");
  return {
    analysis: JSON.parse(text),
    inputTokens: data.usage?.prompt_tokens,
    outputTokens: data.usage?.completion_tokens,
  };
}

/* ── Sanitiser: defensively strip any numerical-mark phrases ── */
function stripMarks(text: string): string {
  if (!text) return text;
  return text
    .replace(/\b\d+\s*\/\s*\d+\b/g, "[mark stripped]")
    .replace(/\b\d+\s+marks?\b/gi, "[marks stripped]")
    .replace(/\bworth\s+\d+\b/gi, "[stripped]")
    .replace(/\baward(?:ed)?\s+\d+\b/gi, "[stripped]")
    .replace(/\bscore\s+of\s+\d+\b/gi, "[stripped]")
    .replace(/\blevel\s*\d\s+is\s+worth\b/gi, "[stripped]");
}

function sanitiseAnalysis(a: AiAnalysis): AiAnalysis {
  return {
    strengths: (a.strengths ?? []).map(stripMarks),
    gaps: (a.gaps ?? []).map(stripMarks),
    levelRecommendation: {
      level: a.levelRecommendation?.level ?? "L1",
      rationale: stripMarks(a.levelRecommendation?.rationale ?? ""),
    },
    kaaeBreakdown: {
      knowledge: {
        present: !!a.kaaeBreakdown?.knowledge?.present,
        evidence: stripMarks(a.kaaeBreakdown?.knowledge?.evidence ?? ""),
      },
      application: {
        present: !!a.kaaeBreakdown?.application?.present,
        evidence: stripMarks(a.kaaeBreakdown?.application?.evidence ?? ""),
      },
      analysis: {
        present: !!a.kaaeBreakdown?.analysis?.present,
        evidence: stripMarks(a.kaaeBreakdown?.analysis?.evidence ?? ""),
      },
      evaluation: {
        present: !!a.kaaeBreakdown?.evaluation?.present,
        evidence: stripMarks(a.kaaeBreakdown?.evaluation?.evidence ?? ""),
      },
    },
  };
}

function validateAnalysis(a: unknown): a is AiAnalysis {
  if (!a || typeof a !== "object") return false;
  const x = a as Record<string, unknown>;
  if (!Array.isArray(x.strengths) || !Array.isArray(x.gaps)) return false;
  const lr = x.levelRecommendation as Record<string, unknown> | undefined;
  if (!lr || typeof lr.level !== "string" || typeof lr.rationale !== "string") return false;
  const kb = x.kaaeBreakdown as Record<string, unknown> | undefined;
  if (!kb) return false;
  for (const k of ["knowledge", "application", "analysis", "evaluation"]) {
    const v = kb[k] as Record<string, unknown> | undefined;
    if (!v || typeof v.present !== "boolean" || typeof v.evidence !== "string") return false;
  }
  return true;
}

/* ── Main handler ── */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  // Auth
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  let userId: string | null = null;
  if (token) {
    const { data } = await supabase.auth.getUser(token);
    userId = data.user?.id ?? null;
  }
  if (!userId) {
    return new Response(JSON.stringify({ error: "auth_required" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Provider config
  const provider = (Deno.env.get("AI_PROVIDER") ?? "lovable").toLowerCase();
  const lovableKey = Deno.env.get("LOVABLE_API_KEY") ?? "";
  const customKey = Deno.env.get("AI_API_KEY") ?? "";
  const apiKey = provider === "lovable" ? lovableKey : customKey;
  const defaultModel =
    provider === "lovable" ? "google/gemini-2.5-flash"
    : provider === "gemini" ? "gemini-2.0-flash"
    : provider === "anthropic" ? "claude-sonnet-4-20250514"
    : provider === "openai" ? "gpt-4o-mini"
    : "google/gemini-2.5-flash";
  const model = Deno.env.get("AI_MODEL") ?? defaultModel;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ai_not_configured" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Parse payload
  let payload: MarkingPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!payload?.questionId || !payload?.question || !payload?.kind) {
    return new Response(JSON.stringify({ error: "missing_fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Cache lookup
  const cacheKey = await hashPayload(payload);
  const { data: cached } = await supabase
    .from("ai_marking_cache")
    .select("analysis")
    .eq("cache_key", cacheKey)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (cached?.analysis) {
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      paper_id: payload.paperId ?? null,
      question_id: payload.questionId,
      provider,
      model,
      cache_hit: true,
      status: "ok",
    });
    return new Response(JSON.stringify({ analysis: cached.analysis, cached: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Rate limit
  const rate = checkRate(userId);
  if (!rate.ok) {
    return new Response(
      JSON.stringify({ error: "rate_limited", retryAfterSec: rate.retryAfterSec }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rate.retryAfterSec ?? 3600),
        },
      },
    );
  }

  // Call provider
  const systemPrompt = buildSystemPrompt(payload);
  const userPrompt = buildUserPrompt(payload);

  let providerResult: ProviderResult;
  try {
    providerResult =
      provider === "lovable" ? await callLovable(apiKey, model, systemPrompt, userPrompt)
      : provider === "gemini" ? await callGemini(apiKey, model, systemPrompt, userPrompt)
      : provider === "anthropic" ? await callAnthropic(apiKey, model, systemPrompt, userPrompt)
      : provider === "openai" ? await callOpenAI(apiKey, model, systemPrompt, userPrompt)
      : (() => { throw new Error(`Unknown AI_PROVIDER: ${provider}`); })();
  } catch (err) {
    console.error("AI provider call failed:", err);
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      paper_id: payload.paperId ?? null,
      question_id: payload.questionId,
      provider,
      model,
      cache_hit: false,
      status: "provider_error",
    });
    return new Response(JSON.stringify({ error: "provider_error" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!validateAnalysis(providerResult.analysis)) {
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      paper_id: payload.paperId ?? null,
      question_id: payload.questionId,
      provider,
      model,
      cache_hit: false,
      input_tokens: providerResult.inputTokens ?? null,
      output_tokens: providerResult.outputTokens ?? null,
      status: "malformed_response",
    });
    return new Response(JSON.stringify({ error: "malformed_response" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const cleaned = sanitiseAnalysis(providerResult.analysis);

  // Cache (best-effort — ignore conflict)
  await supabase.from("ai_marking_cache").upsert(
    {
      cache_key: cacheKey,
      question_id: payload.questionId,
      analysis: cleaned,
    },
    { onConflict: "cache_key" },
  );

  await supabase.from("ai_usage_log").insert({
    user_id: userId,
    paper_id: payload.paperId ?? null,
    question_id: payload.questionId,
    provider,
    model,
    cache_hit: false,
    input_tokens: providerResult.inputTokens ?? null,
    output_tokens: providerResult.outputTokens ?? null,
    status: "ok",
  });

  return new Response(JSON.stringify({ analysis: cleaned, cached: false }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
