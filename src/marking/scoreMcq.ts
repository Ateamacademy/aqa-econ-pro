/**
 * scoreMcq — single source of truth for MCQ marking across every board.
 *
 * Pure function. No option-text matching, no index comparisons, no
 * "close enough" logic. The only thing that decides a mark is whether
 * the submitted option id equals the mark-scheme answer id (case-
 * insensitive, whitespace-trimmed).
 *
 * If you find another scoring path in this codebase, route it through
 * here and delete the duplicate.
 */

export interface McqScoreResult {
  correct: boolean;
  mark: 0 | 1;
  /** Canonicalised submitted id (uppercased, trimmed). */
  submitted: string;
  /** Canonicalised answer id (uppercased, trimmed). */
  answer: string;
}

export function scoreMcq(
  submittedOptionId: string | null | undefined,
  markSchemeAnswerId: string | null | undefined,
): McqScoreResult {
  const submitted = (submittedOptionId ?? "").trim().toUpperCase();
  const answer = (markSchemeAnswerId ?? "").trim().toUpperCase();
  // Empty submission is never correct, even against an empty key.
  const correct = submitted.length > 0 && answer.length > 0 && submitted === answer;
  return { correct, mark: correct ? 1 : 0, submitted, answer };
}

/**
 * Render-time content guard for MCQs. Returns null if the question is
 * safe to render, otherwise a human-readable reason — caller should skip
 * the question and emit an `mcq_defect` analytics event.
 */
export interface McqGuardInput {
  questionId: string;
  stem?: string | null;
  options?: Array<{ letter: string; text: string }> | null;
  /** Optional: case-study id this question references. */
  caseStudyRef?: string | null;
  /** Optional: ids the case study itself declares as linked. */
  caseStudyLinkedIds?: string[] | null;
}

export type McqDefectReason =
  | "missing_stem"
  | "too_few_options"
  | "duplicate_option_ids"
  | "case_study_mismatch";

export function checkMcqDefects(input: McqGuardInput): McqDefectReason | null {
  if (!input.stem || !input.stem.trim()) return "missing_stem";
  const opts = input.options ?? [];
  if (opts.length < 2) return "too_few_options";
  const ids = opts.map((o) => o.letter.trim().toUpperCase());
  if (new Set(ids).size !== ids.length) return "duplicate_option_ids";
  if (
    input.caseStudyRef &&
    Array.isArray(input.caseStudyLinkedIds) &&
    !input.caseStudyLinkedIds.includes(input.questionId)
  ) {
    return "case_study_mismatch";
  }
  return null;
}
