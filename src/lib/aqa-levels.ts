/**
 * AQA A-Level Economics (7136) · VERBATIM level-of-response descriptors
 * and KAA+E framework enums. Used by the marking UI for self-assessment.
 *
 * Source: AQA published mark schemes (June 2022, 2023, 2024).
 * Do NOT paraphrase · descriptors must match the published phrasing.
 */

export type AqaLevel = 1 | 2 | 3 | 4 | 5;
export type KaaeSkill = "K" | "App" | "An" | "Eval";

export interface AqaLevelBand {
  level: AqaLevel;
  markBand: [number, number];
  descriptor: string;
}

/* ── 9-mark question (4 levels) ── */
export const NINE_MARK_LEVELS: AqaLevelBand[] = [
  {
    level: 1,
    markBand: [1, 2],
    descriptor:
      "Limited knowledge and understanding. Weak or no application. No analysis or evaluation.",
  },
  {
    level: 2,
    markBand: [3, 4],
    descriptor:
      "Some knowledge and understanding. Some application. Limited analysis. Little or no evaluation.",
  },
  {
    level: 3,
    markBand: [5, 6],
    descriptor:
      "Reasonable knowledge and understanding. Reasonable application. Reasonable analysis · conclusion may be unsupported.",
  },
  {
    level: 4,
    markBand: [7, 9],
    descriptor:
      "Good knowledge and understanding. Good application to the issue. Good analysis, leading to a supported conclusion.",
  },
];

/* ── 15-mark question (4 levels + 0–3 floor) ── */
export const FIFTEEN_MARK_LEVELS: AqaLevelBand[] = [
  {
    level: 1,
    markBand: [1, 3],
    descriptor:
      "No creditable content / limited knowledge and understanding. Weak or no application. No analysis or evaluation.",
  },
  {
    level: 2,
    markBand: [4, 6],
    descriptor:
      "Some knowledge and understanding. Some application. Limited analysis. Little or no evaluation.",
  },
  {
    level: 3,
    markBand: [7, 9],
    descriptor:
      "Reasonable knowledge and understanding. Reasonable application. Reasonable analysis. Some evaluation · conclusion may be unsupported.",
  },
  {
    level: 4,
    markBand: [10, 12],
    descriptor:
      "Good knowledge and understanding. Good application to the issue. Good analysis. Good evaluation, leading to a supported conclusion.",
  },
  {
    level: 5,
    markBand: [13, 15],
    descriptor:
      "Precise knowledge with full theoretical depth. Sustained application. Rigorous, multi-step analysis. Balanced evaluation with a prioritised, well-supported conclusion.",
  },
];

/* ── 25-mark question (5 levels) ── */
export const TWENTYFIVE_MARK_LEVELS: AqaLevelBand[] = [
  {
    level: 1,
    markBand: [1, 5],
    descriptor:
      "Limited knowledge and understanding. Weak or no application. No analysis or evaluation.",
  },
  {
    level: 2,
    markBand: [6, 10],
    descriptor:
      "Some knowledge and understanding. Some application. Limited analysis. Little or no evaluation.",
  },
  {
    level: 3,
    markBand: [11, 15],
    descriptor:
      "Reasonable knowledge and understanding. Reasonable application. Reasonable analysis. Some evaluation · conclusion may be unsupported.",
  },
  {
    level: 4,
    markBand: [16, 20],
    descriptor:
      "Good knowledge and understanding. Good application throughout. Good analysis with developed chains of reasoning. Good evaluation with a clear judgement.",
  },
  {
    level: 5,
    markBand: [21, 25],
    descriptor:
      "Precise knowledge and full theoretical depth. Sustained application throughout. Rigorous, multi-step analysis. Balanced evaluation with a prioritised, well-supported conclusion.",
  },
];

export function levelsForMarks(totalMarks: number): AqaLevelBand[] | null {
  if (totalMarks === 9) return NINE_MARK_LEVELS;
  if (totalMarks === 15) return FIFTEEN_MARK_LEVELS;
  if (totalMarks === 25) return TWENTYFIVE_MARK_LEVELS;
  return null;
}

/* ── KAA+E framework ── */
export const KAAE_SKILLS: { id: KaaeSkill; label: string; question: string }[] = [
  {
    id: "K",
    label: "Knowledge",
    question: "Does your answer show Knowledge of the relevant concepts?",
  },
  {
    id: "App",
    label: "Application",
    question: "Does it Apply that knowledge specifically to the extract / context given?",
  },
  {
    id: "An",
    label: "Analysis",
    question: "Does it Analyse with chains of reasoning (X → Y → Z)?",
  },
  {
    id: "Eval",
    label: "Evaluation",
    question: "Does it Evaluate with a supported conclusion?",
  },
];

/* ── AQA examiner annotation tags (used on scripts) ── */
export interface AqaAnnotation {
  code: string;
  label: string;
  description: string;
  tone: "positive" | "neutral" | "negative";
}

export const AQA_ANNOTATIONS: AqaAnnotation[] = [
  { code: "KU", label: "KU", description: "Knowledge / understanding shown", tone: "positive" },
  { code: "APP", label: "APP", description: "Application to the context", tone: "positive" },
  { code: "✓", label: "✓", description: "Analysis (extended) or correct (Q01/02/05/06)", tone: "positive" },
  { code: "EVAL", label: "EVAL", description: "Evaluation present", tone: "positive" },
  { code: "BD", label: "BD", description: "Benefit of the doubt awarded", tone: "positive" },
  { code: "SEEN", label: "SEEN", description: "Place marker · seen by examiner", tone: "neutral" },
  { code: "NR", label: "NR", description: "Not relevant", tone: "negative" },
  { code: "NAQ", label: "NAQ", description: "Not answering question", tone: "negative" },
  { code: "REP", label: "REP", description: "Repetition", tone: "negative" },
  { code: "✗", label: "✗", description: "Incorrect", tone: "negative" },
];
