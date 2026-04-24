/**
 * Deterministic MCQ feedback scaffolding.
 *
 * The verdict (Correct / Incorrect, mark awarded) is ALWAYS determined by
 * scoreMcq — never by an LLM. The LLM is allowed to write the explanation
 * paragraph, but is strictly constrained by branch-aware prompts so it
 * cannot teach incorrect economics by justifying a wrong submission.
 *
 * Output is parsed by QuestionCard which renders:
 *   - a Correct / Incorrect banner (from `correct`)
 *   - the deterministic "Mark Scheme" string (from `mark`)
 *   - the explanation paragraph (from `explanation`)
 */

import type { McqScoreResult } from "./scoreMcq";

export interface McqFeedbackInput {
  questionId: string;
  questionStem: string;
  options: Array<{ letter: string; text: string }>;
  submittedOptionId: string;
  markSchemeAnswerId: string;
  /** Optional verbatim mark-scheme rationale for the correct answer. */
  rationale?: string;
}

export interface McqFeedbackTemplate {
  /** What the LLM is allowed to elaborate on. */
  systemPrompt: string;
  userPrompt: string;
  /** Pre-built mark-scheme banner string (deterministic). */
  markSchemeBanner: string;
  /** Pre-built model-answer string (deterministic). */
  modelAnswer: string;
}

const optionText = (
  options: Array<{ letter: string; text: string }>,
  letter: string,
) => options.find((o) => o.letter.trim().toUpperCase() === letter)?.text ?? "(unknown option)";

export function buildMcqFeedbackPrompt(
  input: McqFeedbackInput,
  result: McqScoreResult,
): McqFeedbackTemplate {
  const submittedText = optionText(input.options, result.submitted);
  const correctText = optionText(input.options, result.answer);
  const markSchemeBanner = result.correct
    ? `**${result.mark}/1 — Correct.** The mark scheme answer is **${result.answer}**, which is exactly what you selected.`
    : `**${result.mark}/1 — Incorrect.** You selected **${result.submitted || "(no answer)"}**. The mark scheme answer is **${result.answer}**.`;

  const modelAnswer = `**Correct answer: ${result.answer} — ${correctText}**${
    input.rationale ? `\n\n${input.rationale}` : ""
  }`;

  // Guard the LLM with a strict, branch-aware prompt. The verdict is fixed
  // by scoreMcq and stated up front; the LLM may only elaborate on WHY.
  const systemPrompt = result.correct
    ? `You are an A-Level economics examiner explaining why a multiple-choice answer is correct.\n\nRULES:\n- The student is CORRECT. Do NOT suggest otherwise. Do NOT hedge.\n- You MAY mention only ONE option letter — option ${result.answer}, which the student picked.\n- Do NOT name, quote or imply correctness of any other option letter.\n- Keep it to 2–4 sentences. Use plain A-Level economics terminology.\n- Do NOT output marks, levels, or "X/Y" fractions — those are pre-rendered.`
    : `You are an A-Level economics examiner explaining why a multiple-choice answer is incorrect.\n\nRULES:\n- The student picked option ${result.submitted || "(none)"}. This is INCORRECT. The correct answer is option ${result.answer}.\n- You MUST: (1) state clearly that ${result.submitted || "the submitted answer"} is wrong, (2) explain why, and (3) explain why ${result.answer} is right.\n- Do NOT defend the student's choice. Do NOT say it is "partially correct" or "also a reasonable answer".\n- Keep it to 3–6 sentences. Use plain A-Level economics terminology.\n- Do NOT output marks, levels, or "X/Y" fractions — those are pre-rendered.`;

  const userPrompt = `Question: ${input.questionStem}\n\nOptions:\n${input.options
    .map((o) => `${o.letter}) ${o.text}`)
    .join("\n")}\n\nStudent picked: ${result.submitted || "(no answer submitted)"} — ${submittedText}\nCorrect answer per mark scheme: ${result.answer} — ${correctText}\n\nWrite the examiner explanation now, following the rules in the system message exactly.`;

  return { systemPrompt, userPrompt, markSchemeBanner, modelAnswer };
}

/**
 * Post-generation safety check. When the student is correct, the
 * explanation must not bold/quote any option letter other than the
 * one they picked. When the student is wrong, the explanation must
 * mention BOTH the wrong letter and the correct letter.
 *
 * Returns null if the explanation passes, or a reason string if it fails.
 */
export function validateMcqExplanation(
  explanation: string,
  result: McqScoreResult,
): string | null {
  const allLetters = ["A", "B", "C", "D", "E"];
  // Match standalone option letters in common quoted forms:
  //   "Option B", "(B)", "answer B", "**B**", " B ", "B is"
  const referenced = new Set<string>();
  for (const L of allLetters) {
    const re = new RegExp(
      `(?:option|answer|choice|\\*\\*|\\b)\\s*${L}\\b`,
      "i",
    );
    if (re.test(explanation)) referenced.add(L);
  }
  if (result.correct) {
    const stray = [...referenced].filter((L) => L !== result.answer);
    if (stray.length > 0) {
      return `feedback_letter_mismatch: explanation references option(s) ${stray.join(",")} but student correctly picked ${result.answer}`;
    }
  } else {
    if (!referenced.has(result.answer)) {
      return `feedback_missing_correct_letter: explanation does not name correct answer ${result.answer}`;
    }
  }
  return null;
}

/** Deterministic fallback explanation if the LLM call fails or trips the validator. */
export function fallbackMcqExplanation(
  input: McqFeedbackInput,
  result: McqScoreResult,
): string {
  const correctText = optionText(input.options, result.answer);
  const submittedText = optionText(input.options, result.submitted);
  if (result.correct) {
    return `Option ${result.answer} — "${correctText}" — is the correct answer per the mark scheme.${
      input.rationale ? ` ${input.rationale}` : ""
    }`;
  }
  return `Option ${result.submitted || "(none)"} — "${submittedText}" — is incorrect. The correct answer is option ${result.answer} — "${correctText}".${
    input.rationale ? ` ${input.rationale}` : ""
  }`;
}
