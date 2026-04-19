/**
 * Non-AQA Tier-3 AI marking — parallel implementation to `src/lib/aiMarking.ts`.
 *
 * AQA continues to use the legacy `markWithAi` in `src/lib/aiMarking.ts`
 * (which is a thin wrapper around `callAiMarking`). This file is the
 * non-AQA equivalent. The two are deliberately separate so that changes
 * here cannot affect AQA's marking pipeline.
 *
 * Routing happens at the call site:
 *   const fn = boardId === "aqa-a-level"
 *     ? (await import("@/lib/aiMarking")).callAiMarking
 *     : (await import("@/lib/non-aqa/ai-marking")).markWithAiNonAqa;
 */
import { supabase } from "@/integrations/supabase/client";
import type { NonAqaBoardId, NonAqaMarkingConvention } from "./marking-convention.types";
import { getNonAqaConvention } from "./conventions";

export type NonAqaAiError =
  | "not_configured"
  | "rate_limited"
  | "provider_error"
  | "malformed_response"
  | "auth_required"
  | "network_error"
  | "unknown_board";

export interface NonAqaAiPayload {
  kind: "extended-response" | "diagram";
  boardId: NonAqaBoardId;
  paperId?: string;
  questionId: string;
  question: {
    number: string;
    marks: number;
    prompt: string;
    skillTags?: string[];
  };
  studentAnswer: string;
  diagramData?: unknown;
}

export interface NonAqaAiAnalysis {
  strengths: string[];
  gaps: string[];
  /** Level/band recommendation, encoded by the board's framework. */
  recommendation: { label: string; rationale: string };
  /** Skill-by-skill notes — keys depend on framework. */
  skillNotes: Record<string, { present: boolean; evidence: string }>;
}

export type NonAqaAiResult =
  | { ok: true; analysis: NonAqaAiAnalysis; cached: boolean }
  | { ok: false; error: NonAqaAiError; retryAfterSec?: number };

/** Build a board-specific system prompt from the convention. */
function buildSystemPrompt(convention: NonAqaMarkingConvention, marks: number): string {
  const bands = convention.markBandsByQuestionMarks[marks] ?? [];
  const bandText = bands
    .map((b) => `Level ${b.level} (${b.range[0]}–${b.range[1]} marks): ${b.descriptor}`)
    .join("\n");
  const split = convention.perSkillBreakdown?.[marks];
  const splitText = split
    ? `Per-skill split: K=${split.K}, Ap=${split.Ap}, An=${split.An}, Ev=${split.Ev}`
    : "";
  return [
    `You are an experienced examiner for ${convention.boardId}.`,
    `Skill framework: ${convention.skillFramework}.`,
    `Descriptor style: ${convention.descriptorStyle}.`,
    bandText ? `Mark bands for ${marks}-mark question:\n${bandText}` : "",
    splitText,
    "Provide an advisory analysis only — never assign marks. Tier 1 (auto) and Tier 2 (self-assessment) are the source of truth.",
  ].filter(Boolean).join("\n\n");
}

export async function markWithAiNonAqa(payload: NonAqaAiPayload): Promise<NonAqaAiResult> {
  const convention = getNonAqaConvention(payload.boardId);
  if (!convention) return { ok: false, error: "unknown_board" };

  const systemPrompt = buildSystemPrompt(convention, payload.question.marks);

  try {
    const { data, error } = await supabase.functions.invoke("mark-with-ai", {
      body: {
        ...payload,
        // Pass board context so the edge function can adapt prompts if needed.
        boardContext: {
          boardId: payload.boardId,
          skillFramework: convention.skillFramework,
          descriptorStyle: convention.descriptorStyle,
          systemPrompt,
        },
        // The same edge function serves both AQA and non-AQA — the request
        // shape is backwards-compatible (boardContext is additive).
        question: {
          ...payload.question,
          markScheme: {
            levels: (convention.markBandsByQuestionMarks[payload.question.marks] ?? []).map((b) => ({
              level: `L${b.level}`,
              band: `${b.range[0]}–${b.range[1]}`,
              descriptor: b.descriptor,
            })),
          },
        },
      },
    });

    if (error) {
      const ctx = (error as unknown as { context?: { error?: string; retryAfterSec?: number } }).context;
      const code = ctx?.error;
      if (code === "ai_not_configured") return { ok: false, error: "not_configured" };
      if (code === "rate_limited")
        return { ok: false, error: "rate_limited", retryAfterSec: ctx?.retryAfterSec };
      if (code === "provider_error") return { ok: false, error: "provider_error" };
      if (code === "malformed_response") return { ok: false, error: "malformed_response" };
      if (code === "auth_required") return { ok: false, error: "auth_required" };
      return { ok: false, error: "network_error" };
    }

    const a = (data as { analysis?: unknown; cached?: boolean })?.analysis as
      | { strengths?: string[]; gaps?: string[]; levelRecommendation?: { level: string; rationale: string }; kaaeBreakdown?: Record<string, { present: boolean; evidence: string }> }
      | undefined;
    if (!a) return { ok: false, error: "malformed_response" };

    // Map the AQA-shaped response into the framework-agnostic NonAqa shape.
    const analysis: NonAqaAiAnalysis = {
      strengths: a.strengths ?? [],
      gaps: a.gaps ?? [],
      recommendation: {
        label: a.levelRecommendation?.level ?? "L?",
        rationale: a.levelRecommendation?.rationale ?? "",
      },
      skillNotes: a.kaaeBreakdown
        ? Object.fromEntries(Object.entries(a.kaaeBreakdown).map(([k, v]) => [k, v]))
        : {},
    };

    return { ok: true, analysis, cached: !!(data as { cached?: boolean }).cached };
  } catch (err) {
    console.error("Non-AQA AI marking client error:", err);
    return { ok: false, error: "network_error" };
  }
}
