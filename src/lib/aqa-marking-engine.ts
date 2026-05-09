/**
 * AQA Tier 1 · automatic marking engine.
 *
 * Handles: MCQs (Paper 3 Q1–30), 2-mark calculation questions (Q01/02/05/06).
 * AQA's 2-mark calc convention: 2 marks for correct value WITH formatting,
 * 1 mark for value-only or correct-method-wrong-answer with formatting,
 * 0 otherwise.
 */

export interface McqMarkResult {
  questionNumber: number;
  studentChoice?: "A" | "B" | "C" | "D";
  correctAnswer: "A" | "B" | "C" | "D";
  correct: boolean;
  marksAwarded: 0 | 1;
  totalMarks: 1;
  tier: "auto";
}

export function markMcq(
  questionNumber: number,
  studentChoice: "A" | "B" | "C" | "D" | undefined,
  correctAnswer: "A" | "B" | "C" | "D",
): McqMarkResult {
  const correct = studentChoice === correctAnswer;
  return {
    questionNumber,
    studentChoice,
    correctAnswer,
    correct,
    marksAwarded: correct ? 1 : 0,
    totalMarks: 1,
    tier: "auto",
  };
}

/* ── 2-mark calculation marking ── */

export type CalcFormatting =
  | { kind: "decimal-places"; places: 0 | 1 | 2 | 3 }
  | { kind: "percent" }
  | { kind: "currency"; symbol: "£" | "$" | "€" }
  | { kind: "ratio" } // e.g. "1.43" for "ratio to one"
  | { kind: "none" };

export interface CalcMarkSpec {
  questionNumber: number;
  /** Correct numeric answer. */
  correctValue: number;
  /** ± tolerance allowed (default 0.01 for 2dp questions). */
  tolerance?: number;
  /** Formatting AQA explicitly requires. */
  formatting: CalcFormatting;
  /** Human-readable hint shown in feedback. */
  formattingHint: string;
}

export interface CalcMarkResult {
  questionNumber: number;
  studentAnswer: string;
  parsedValue: number | null;
  correctValue: number;
  withinTolerance: boolean;
  formattingMet: boolean;
  marksAwarded: 0 | 1 | 2;
  totalMarks: 2;
  tier: "auto";
  feedback: string;
}

/** Pull the first numeric value from a string (handles £, $, €, %, commas). */
export function parseNumeric(input: string): number | null {
  if (!input) return null;
  // Remove currency symbols, %, commas · but keep . and -.
  const cleaned = input.replace(/[£$€,%\s]/g, "");
  const match = cleaned.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const v = parseFloat(match[0]);
  return Number.isFinite(v) ? v : null;
}

/** Test whether the raw student string meets the required formatting. */
export function meetsFormatting(raw: string, fmt: CalcFormatting): boolean {
  if (!raw) return false;
  const trimmed = raw.trim();
  switch (fmt.kind) {
    case "decimal-places": {
      // The first numeric token must have exactly `places` decimal digits.
      const tok = trimmed.match(/-?\d+(?:\.(\d+))?/);
      if (!tok) return false;
      const decs = tok[1]?.length ?? 0;
      return decs === fmt.places;
    }
    case "percent":
      return /%/.test(trimmed);
    case "currency":
      return trimmed.includes(fmt.symbol);
    case "ratio": {
      // Accept "1.43", "1.43:1", "1.43 to 1"
      return /-?\d+\.\d{1,3}/.test(trimmed);
    }
    case "none":
      return true;
  }
}

export function markCalculation(
  spec: CalcMarkSpec,
  studentAnswer: string,
): CalcMarkResult {
  const tolerance = spec.tolerance ?? 0.01;
  const parsed = parseNumeric(studentAnswer);
  const within = parsed !== null && Math.abs(parsed - spec.correctValue) <= tolerance;
  const fmt = meetsFormatting(studentAnswer || "", spec.formatting);

  let marks: 0 | 1 | 2 = 0;
  let feedback = "";

  if (within && fmt) {
    marks = 2;
    feedback = `Correct value with required formatting (${spec.formattingHint}).`;
  } else if (within && !fmt) {
    marks = 1;
    feedback = `Correct value but missing formatting: ${spec.formattingHint}.`;
  } else if (!within && fmt && parsed !== null) {
    // AQA awards 1 for "correct method, wrong answer, with correct formatting"
    // · we approximate this by checking formatting compliance even when value is wrong.
    marks = 1;
    feedback = `Wrong final value but formatting (${spec.formattingHint}) is correct · examiner may award 1 for correct method.`;
  } else {
    marks = 0;
    feedback = parsed === null
      ? "No numeric answer detected."
      : `Value differs from correct answer (${spec.correctValue}) and formatting (${spec.formattingHint}) not met.`;
  }

  return {
    questionNumber: spec.questionNumber,
    studentAnswer,
    parsedValue: parsed,
    correctValue: spec.correctValue,
    withinTolerance: within,
    formattingMet: fmt,
    marksAwarded: marks,
    totalMarks: 2,
    tier: "auto",
    feedback,
  };
}

/* ── KAA+E aggregation across self-assessed questions ── */

export interface KaaeSelfScore {
  K: boolean;
  App: boolean;
  An: boolean;
  Eval: boolean;
  /** Max marks for the question (used when weighting). */
  weight: number;
}

export interface KaaeAggregate {
  K: number; // 0–100
  App: number;
  An: number;
  Eval: number;
}

export function aggregateKaae(scores: KaaeSelfScore[]): KaaeAggregate {
  if (scores.length === 0) return { K: 0, App: 0, An: 0, Eval: 0 };
  const totalWeight = scores.reduce((s, x) => s + x.weight, 0);
  const sum = (key: keyof KaaeSelfScore) =>
    scores.reduce((s, x) => (x[key] ? s + x.weight : s), 0);
  return {
    K: Math.round((sum("K") / totalWeight) * 100),
    App: Math.round((sum("App") / totalWeight) * 100),
    An: Math.round((sum("An") / totalWeight) * 100),
    Eval: Math.round((sum("Eval") / totalWeight) * 100),
  };
}

/* ── Tier 3 sanitisation: strip AI-emitted marks/level claims ── */

export function sanitiseAiFeedback(raw: string): string {
  let out = raw;
  // Strip "X / Y", "X out of Y" patterns
  out = out.replace(/\b\d+\s*(?:\/|out of)\s*\d+(?:\s*marks?)?\b/gi, "[mark removed]");
  // Strip "Level X" claims
  out = out.replace(/\blevel\s*\d\b/gi, "[level removed]");
  // Strip "X marks" awarded phrases
  out = out.replace(/\baward(?:ed)?\s*\d+\s*marks?\b/gi, "[mark removed]");
  return out.trim();
}
