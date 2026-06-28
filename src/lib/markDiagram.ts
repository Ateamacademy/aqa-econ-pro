/**
 * markDiagram.ts · SINGLE ENTRY POINT for all diagram marking.
 * No other code path may call the marker API directly for diagrams.
 *
 * Pipeline:
 *   1. Pre-flight image gates (client-side pixel analysis)
 *   2. Vision verification (AI describes what's literally in the image)
 *   3. Hard empty-check (bypasses marker entirely if empty)
 *   4. Call marker
 *   5. Post-marking validation and caps
 */

import { validateDiagramImage, type ValidationResult } from "./imageValidation";
import { verifyDiagramImage, type VerificationReport } from "./verification";
import type { DiagramMarkingResult, ComponentResult } from "@/components/diagram-marking/types";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/lib/supabaseConfig";

export interface DiagramMarkingInput {
  question: string;
  studentAnswer: string;
  diagramType: string;
  difficulty: string;
  totalMarks: number;
  board: string;
  answerType: "labels" | "text" | "image";
  scenarioId?: string;
  userId?: string;
  imageBase64?: string; // raw base64 (no data: prefix) for drawn diagrams
  imageSrc?: string;    // data URL for validation gates
  scenarioRubric?: Array<{
    component_name: string;
    mark_value: number;
    accepted_labels: string[];
    positional_required: boolean;
    strict_mode: boolean;
    notes?: string;
  }>;
  scenarioRubricPrompt?: string;
}

export interface GateResult {
  pass: boolean;
  reason: string;
  inkRatio: number;
  componentCount: number;
}

/**
 * Determine if a diagram is essentially empty based on verification + gates.
 * ANY of these conditions → treat as empty, skip marker entirely.
 */
export function isEssentiallyEmpty(
  verification: VerificationReport | null,
  gates: GateResult
): boolean {
  if (!verification) return gates.inkRatio < 0.03;
  if (verification.completeness === "empty") return true;
  if (verification.isBlank) return true;
  if (!verification.hasAxes.horizontal && !verification.hasAxes.vertical) return true;
  if (verification.curvesDetected.length === 0) return true;
  if (gates.inkRatio < 0.03) return true;
  if (gates.componentCount < 3) return true;
  return false;
}

/**
 * Build a zero-result when the diagram is empty/invalid.
 * NO API CALL IS MADE · this is a pure client-side result.
 */
function zeroResult(totalMarks: number, reason: string): DiagramMarkingResult {
  return {
    marks_awarded: 0,
    total_marks: totalMarks,
    mark_percentage: 0,
    component_results: [],
    examiner_summary: {
      overall_feedback: `No diagram was detected in your submission. ${reason}`,
      strongest_areas: [],
      errors_by_type: {
        wrong_label: [],
        vague_explanation: [],
        incomplete_process: [],
        misplacement: [],
        terminology_weakness: [],
      },
      priority_revision: [
        "Draw both axes with clear labels (e.g. Price, Quantity)",
        "Include all required curves with labels",
        "Mark equilibrium points with coordinates",
      ],
      how_to_gain_full_marks:
        "Start by drawing clearly labelled axes spanning most of the canvas. Add all required curves with labels, mark equilibrium points, and use the full canvas area.",
      estimated_grade_band: "U",
    },
    model_answer: {
      text: "",
      key_labels: [],
      diagram_description: "",
    },
    follow_up_questions: [],
    misconceptions_detected: [],
    _capApplied: "empty" as any,
    _capReason: reason as any,
    _gateBlocked: true as any,
  };
}

/**
 * Run pre-flight image gates. Returns pass/fail with reason.
 */
async function runImageGates(
  imageSrc: string,
  totalMarks: number
): Promise<GateResult> {
  try {
    const result = await validateDiagramImage(imageSrc, totalMarks);
    return {
      pass: result.passed,
      reason: result.message,
      inkRatio: result.inkRatio,
      componentCount: result.componentCount ?? 0,
    };
  } catch (e) {
    console.warn("Image gate failed, blocking submission for safety:", e);
    return {
      pass: false,
      reason: "Image validation failed · please redraw and resubmit.",
      inkRatio: 0,
      componentCount: 0,
    };
  }
}

/**
 * Call the mark-diagram edge function.
 */
async function callMarker(
  input: DiagramMarkingInput
): Promise<DiagramMarkingResult> {
  const url = `${SUPABASE_URL}/functions/v1/mark-diagram`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({
      question: input.question,
      studentAnswer: input.studentAnswer,
      diagramType: input.diagramType,
      difficulty: input.difficulty,
      totalMarks: input.totalMarks,
      board: input.board,
      answerType: input.answerType,
      scenarioId: input.scenarioId,
      userId: input.userId,
      scenarioRubric: input.scenarioRubric,
      scenarioRubricPrompt: input.scenarioRubricPrompt,
    }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Marking failed" }));
    throw new Error(err.error || `Marking failed (${resp.status})`);
  }

  return resp.json();
}

/**
 * Post-marking validation: force zero if verification says empty.
 */
function postMarkValidate(
  raw: DiagramMarkingResult,
  verification: VerificationReport | null,
  gates: GateResult
): DiagramMarkingResult {
  // FIRST check: if essentially empty, force zero regardless of marker output
  if (isEssentiallyEmpty(verification, gates)) {
    return {
      ...raw,
      marks_awarded: 0,
      mark_percentage: 0,
      component_results: raw.component_results.map((c) => ({
        ...c,
        marks_awarded: 0,
        status: "missing" as const,
        feedback: `${c.feedback} [OVERRIDE: diagram verified as empty/near-empty]`,
      })),
      examiner_summary: {
        ...raw.examiner_summary,
        overall_feedback: `OVERRIDE: Marker returned ${raw.marks_awarded}/${raw.total_marks}, corrected to 0/${raw.total_marks} because verification detected empty/near-empty diagram. ${raw.examiner_summary.overall_feedback}`,
      },
      _capApplied: "empty" as any,
      _capReason: `Marker returned ${raw.marks_awarded} but verification detected empty diagram` as any,
    };
  }

  // Sparse cap: max 1 mark
  if (verification?.completeness === "sparse") {
    if (raw.marks_awarded > 1) {
      return {
        ...raw,
        marks_awarded: 1,
        mark_percentage: Math.round((1 / raw.total_marks) * 100),
        _capApplied: "sparse" as any,
        _capReason: "Diagram verified as sparse · maximum 1 mark" as any,
      };
    }
  }

  // Partial cap: max 50%
  if (verification?.completeness === "partial") {
    const cap = Math.floor(raw.total_marks * 0.5);
    if (raw.marks_awarded > cap) {
      return {
        ...raw,
        marks_awarded: cap,
        mark_percentage: Math.round((cap / raw.total_marks) * 100),
        _capApplied: "partial" as any,
        _capReason: `Diagram verified as partial · capped at ${cap} marks` as any,
      };
    }
  }

  return raw;
}

/**
 * MAIN ENTRY POINT · all diagram marking goes through here.
 */
export async function markDiagram(
  input: DiagramMarkingInput
): Promise<DiagramMarkingResult> {
  // Step 1: Pre-flight image gates (only for drawn/image submissions)
  let gates: GateResult = { pass: true, reason: "", inkRatio: 1, componentCount: 10 };

  if (input.answerType === "image" && input.imageSrc) {
    gates = await runImageGates(input.imageSrc, input.totalMarks);
    if (!gates.pass) {
      return zeroResult(input.totalMarks, gates.reason);
    }
  }

  // Step 2: Vision verification (only for image submissions)
  let verification: VerificationReport | null = null;
  if (input.answerType === "image" && input.imageBase64) {
    verification = await verifyDiagramImage(input.imageBase64);
  }

  // Step 3: Hard empty-check BEFORE calling marker
  if (input.answerType === "image" && isEssentiallyEmpty(verification, gates)) {
    return zeroResult(input.totalMarks, "Diagram not detected in submission");
  }

  // Step 4: Call marker
  const rawResult = await callMarker(input);

  // Step 5: Post-marking validation and caps
  return postMarkValidate(rawResult, verification, gates);
}
