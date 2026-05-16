/**
 * Client-side error telemetry.
 *
 * Always logs to console. Best-effort writes to `public.client_errors`
 * (created in Phase 2) — if the table doesn't exist yet or RLS rejects
 * the write, we swallow silently so the error path itself never throws.
 */
import { supabase } from "@/integrations/supabase/client";

export interface ErrorContext {
  /** Logical area (e.g. "predicted-papers", "auth", "marking"). */
  area?: string;
  /** Route at time of error. */
  route?: string;
  /** Component or boundary name. */
  component?: string;
  /** Extra structured metadata (small JSON). */
  meta?: Record<string, unknown>;
}

const MAX_MESSAGE = 1000;
const MAX_STACK = 4000;

export async function logClientError(error: unknown, context: ErrorContext = {}): Promise<void> {
  const err = normalize(error);
  // 1) Always console — visible in dev + browser logs
  // eslint-disable-next-line no-console
  console.error("[client-error]", { ...context, message: err.message, stack: err.stack });

  // 2) Best-effort remote telemetry. Never let this throw.
  try {
    const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));
    const payload = {
      user_id: user?.id ?? null,
      area: context.area ?? null,
      route: context.route ?? (typeof window !== "undefined" ? window.location.pathname : null),
      component: context.component ?? null,
      message: err.message.slice(0, MAX_MESSAGE),
      stack: err.stack?.slice(0, MAX_STACK) ?? null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      meta: context.meta ?? null,
    };
    // @ts-expect-error — table may not exist until Phase 2 migration runs
    await supabase.from("client_errors").insert(payload);
  } catch {
    /* swallow — telemetry must never break the app */
  }
}

function normalize(e: unknown): { message: string; stack?: string } {
  if (e instanceof Error) return { message: e.message || "Unknown error", stack: e.stack };
  if (typeof e === "string") return { message: e };
  try { return { message: JSON.stringify(e) }; }
  catch { return { message: "Non-serializable error" }; }
}
