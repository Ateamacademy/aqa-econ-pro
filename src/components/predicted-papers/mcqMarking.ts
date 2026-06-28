/**
 * Instant, offline MCQ marking against the official answer key.
 *
 * Why this exists: MCQ predicted papers used to sit on "pending marking" forever.
 * Submitting an exam triggered NO marking, and MCQs had no answer key to grade
 * against (ParsedQuestion has no `correctAnswer`). This module parses the verbatim
 * mark-scheme markdown (the official "Question / Answer / Marks" table) into a
 * { questionNumber -> letter } map and builds per-question feedback locally — with
 * NO AI call, so MCQ marking is instant and can never hang or fail silently.
 */

export type McqAnswerKey = Record<string, string>;

/**
 * Parse the MCQ answer key from a mark-scheme markdown string.
 *
 * Handles the official plain-text table, e.g.
 *     Question   Answer   Marks
 *        1         C        1
 *        2         A        1
 * and pipe-delimited variants, e.g. "| 1 | C | 1 |".
 *
 * A trailing marks digit is required so prose such as "5 A student earns…" is
 * NOT mistaken for an answer row.
 */
export function parseMcqAnswerKey(markScheme: string | null | undefined): McqAnswerKey {
  const key: McqAnswerKey = {};
  if (!markScheme) return key;
  const re = /(?:^|\n)[ \t|]*(\d{1,2})[ \t|]+([A-D])[ \t|]+\d+\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markScheme)) !== null) {
    const n = parseInt(m[1], 10);
    if (Number.isFinite(n)) key[String(n)] = m[2].toUpperCase();
  }
  return key;
}

/** Normalise a question's number for answer-key lookup ("01" -> "1", "Question 7" -> "7"). */
export function questionNumberKey(q: { number?: string; label?: string }): string | null {
  const raw = q.number ?? (q.label ? q.label.replace(/[^0-9]/g, "") : "");
  if (!raw) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? String(n) : null;
}

export interface McqFeedback {
  markScheme: string;
  modelAnswer: string;
  examinerTip: string;
}

/** Build local feedback for a single MCQ from the student's chosen letter + the key. */
export function buildMcqFeedback(selectedLetter: string, correctLetter: string): McqFeedback {
  const selected = (selectedLetter || "").trim().toUpperCase();
  const correct = correctLetter.trim().toUpperCase();
  const isCorrect = selected === correct;
  return {
    markScheme: isCorrect
      ? `**1/1 mark** · Correct ✓\n\nThe correct answer is **${correct}**.`
      : `**0/1 marks** · Incorrect ✗\n\nYou selected **${selected || "—"}**. The correct answer is **${correct}**.`,
    modelAnswer: `The correct answer is **${correct}**.`,
    examinerTip: isCorrect
      ? "Correct — make sure you can explain *why* the other options are wrong; that is the skill that protects your marks under time pressure."
      : `Review this topic: work out why **${correct}** is right and why **${selected || "your choice"}** is a distractor. Eliminating wrong options is the core MCQ technique.`,
  };
}
