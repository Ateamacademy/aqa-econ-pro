/**
 * Tier 3 AI marking · client wrapper around the `mark-with-ai` Edge Function.
 *
 * Tier 3 is advisory: the AI never assigns marks. Tier 1 (auto) and Tier 2
 * (self-assessment) remain the source of truth for the report's totals.
 */

import { supabase } from "@/integrations/supabase/client";

export type AiMarkingError =
  | "not_configured"
  | "rate_limited"
  | "provider_error"
  | "malformed_response"
  | "auth_required"
  | "network_error";

export interface AiMarkingPayload {
  kind: "extended-response" | "diagram";
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

export interface AiAnalysis {
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

export type AiMarkingResult =
  | { ok: true; analysis: AiAnalysis; cached: boolean }
  | { ok: false; error: AiMarkingError; retryAfterSec?: number };

export async function callAiMarking(payload: AiMarkingPayload): Promise<AiMarkingResult> {
  try {
    const { data, error } = await supabase.functions.invoke("mark-with-ai", {
      body: payload,
    });

    if (error) {
      // Edge function returned a non-2xx · supabase-js puts the body in error.context
      const ctx = (error as unknown as { context?: { error?: string; retryAfterSec?: number } })
        .context;
      const code = ctx?.error;
      if (code === "ai_not_configured") return { ok: false, error: "not_configured" };
      if (code === "rate_limited")
        return { ok: false, error: "rate_limited", retryAfterSec: ctx?.retryAfterSec };
      if (code === "provider_error") return { ok: false, error: "provider_error" };
      if (code === "malformed_response") return { ok: false, error: "malformed_response" };
      if (code === "auth_required") return { ok: false, error: "auth_required" };
      return { ok: false, error: "network_error" };
    }

    const a = (data as { analysis?: AiAnalysis; cached?: boolean })?.analysis;
    if (!a) return { ok: false, error: "malformed_response" };
    return { ok: true, analysis: a, cached: !!(data as { cached?: boolean }).cached };
  } catch (err) {
    console.error("AI marking client error:", err);
    return { ok: false, error: "network_error" };
  }
}
