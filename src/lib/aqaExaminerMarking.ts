/**
 * AQA Examiner Marking · client wrapper.
 *
 * IMPORTANT: This module is OPT-IN and PARALLEL to the existing AQA marking
 * pipeline. It does NOT modify or replace `src/lib/aiMarking.ts`,
 * `src/lib/aqa-marking-engine.ts`, or any other AQA-protected file.
 *
 * It calls the new `mark-aqa-examiner` edge function which returns a
 * structured JSON result conforming to the schema documented in
 * `AQA_EXAMINER_PROMPT.md`.
 */
import { supabase } from "@/integrations/supabase/client";

export type AqaExaminerInput = {
  subject: string;
  paper_code: string;
  question_number: string;
  max_marks: number;
  ao_breakdown: string;
  question_type:
    | "points-based"
    | "levels-based"
    | "calculation"
    | "essay"
    | "source-analysis";
  question_text: string;
  source_material?: string;
  mark_scheme_text: string;
  indicative_content?: string;
  level_descriptors?: string;
  student_response: string;
  /** Optional override; defaults to google/gemini-2.5-pro server-side. */
  model?: string;
};

export type AqaExaminerAoBreakdown = {
  ao_code: string;
  marks_awarded: number;
  marks_available: number;
  justification: string;
};

export type AqaExaminerMarkedPoint = {
  mark_scheme_point: string;
  credited: boolean;
  evidence_from_response: string;
  comment: string;
};

export type AqaExaminerImprovement = {
  issue: string;
  how_to_improve: string;
  reference_to_response: string;
};

export type AqaExaminerResult = {
  total_mark: number;
  max_marks: number;
  percentage: number;
  grade_band_estimate: "A*" | "A" | "B" | "C" | "D" | "E" | "U";
  ao_breakdown: AqaExaminerAoBreakdown[];
  level_awarded: {
    level: string | number | null;
    level_range: string | null;
    rationale: string;
  };
  marked_points: AqaExaminerMarkedPoint[];
  strengths: string[];
  areas_for_improvement: AqaExaminerImprovement[];
  examiner_summary: string;
  examiner_notes: string;
  confidence: "high" | "medium" | "low";
  confidence_explanation: string;
};

export type AqaExaminerError =
  | "not_configured"
  | "rate_limited"
  | "credits_exhausted"
  | "provider_error"
  | "malformed_response"
  | "network_error";

export type AqaExaminerOutcome =
  | { ok: true; marking: AqaExaminerResult }
  | { ok: false; error: AqaExaminerError; message?: string };

export async function callAqaExaminerMarking(
  input: AqaExaminerInput,
): Promise<AqaExaminerOutcome> {
  try {
    const { data, error } = await supabase.functions.invoke("mark-aqa-examiner", {
      body: input,
    });

    if (error) {
      const ctx = (error as unknown as { context?: { error?: string } }).context;
      const code = ctx?.error;
      if (code === "rate_limited") return { ok: false, error: "rate_limited" };
      if (code === "credits_exhausted")
        return { ok: false, error: "credits_exhausted" };
      if (code === "provider_error") return { ok: false, error: "provider_error" };
      if (code === "malformed_response")
        return { ok: false, error: "malformed_response" };
      if (typeof code === "string" && code.includes("LOVABLE_API_KEY"))
        return { ok: false, error: "not_configured" };
      return { ok: false, error: "network_error", message: error.message };
    }

    const marking = (data as { marking?: AqaExaminerResult } | null)?.marking;
    if (!marking) return { ok: false, error: "malformed_response" };
    return { ok: true, marking };
  } catch (err) {
    console.error("AQA examiner marking client error:", err);
    return { ok: false, error: "network_error" };
  }
}
