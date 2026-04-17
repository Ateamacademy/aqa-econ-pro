/**
 * Shared mark-scheme builder for AQA A-Level Economics overrides.
 * Produces level-of-response descriptors (KAA + E) for 9, 15, 25-mark questions
 * and point-marked rubrics for 2 and 4-mark questions.
 */

export interface PointMarkSpec {
  /** e.g. "0 1" */
  questionLabel: string;
  totalMarks: 2 | 4;
  /** The expected answer (used as the headline). */
  expectedAnswer: string;
  /** Each line with its mark value; rendered as a rubric. */
  markPoints: { description: string; marks: number }[];
}

export interface LevelMarkSpec {
  questionLabel: string;
  totalMarks: 9 | 15 | 25;
  /** Optional diagram requirement for 9/25-mark questions. */
  diagram?: {
    primary: string;
    alternatives?: string[];
    requiredLabels: string[];
  };
  /** Indicative content the answer should engage with. */
  indicativeContent: string[];
}

export interface McqMarkSpec {
  questionLabel: string;
  answer: "A" | "B" | "C" | "D";
  justification: string;
}

const NINE_MARK_BANDS: Array<[number, number]> = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 9],
];

const FIFTEEN_MARK_BANDS: Array<[number, number]> = [
  [1, 3],
  [4, 6],
  [7, 9],
  [10, 12],
  [13, 15],
];

const TWENTYFIVE_MARK_BANDS: Array<[number, number]> = [
  [1, 5],
  [6, 10],
  [11, 15],
  [16, 20],
  [21, 25],
];

const NINE_MARK_DESCRIPTORS = [
  "Limited knowledge and understanding. Weak or no application. No analysis or evaluation.",
  "Some knowledge and understanding. Some application. Limited analysis. Little or no evaluation.",
  "Reasonable knowledge and understanding. Reasonable application. Reasonable analysis with some chains of reasoning. Diagram present but may have errors.",
  "Good knowledge and understanding. Good application to the issue. Good analysis with developed chains of reasoning supported by an accurate, fully-labelled diagram.",
];

const FIFTEEN_MARK_DESCRIPTORS = [
  "No creditable content.",
  "Limited knowledge and understanding. Weak or no application. No analysis or evaluation.",
  "Some knowledge and understanding. Some application. Limited analysis. Little or no evaluation.",
  "Reasonable knowledge and understanding. Reasonable application. Reasonable analysis. Some evaluation — conclusion may be unsupported.",
  "Good knowledge and understanding. Good application to the issue. Good analysis. Good evaluation, leading to a supported conclusion.",
];

const TWENTYFIVE_MARK_DESCRIPTORS = [
  "Limited knowledge and understanding. Weak or no application. No analysis or evaluation.",
  "Some knowledge and understanding. Some application. Limited analysis. Little or no evaluation.",
  "Reasonable knowledge and understanding. Reasonable application. Reasonable analysis. Some evaluation, but conclusion may be unsupported.",
  "Good knowledge and understanding. Good application throughout. Good analysis with developed chains of reasoning. Good evaluation with a clear judgement.",
  "Precise knowledge and full theoretical depth. Sustained application throughout. Rigorous, multi-step analysis. Balanced evaluation with a prioritised, well-supported conclusion.",
];

function levelTable(bands: Array<[number, number]>, descriptors: string[]): string {
  return bands
    .map(
      (band, i) =>
        `- **Level ${i + 1} (${band[0]}–${band[1]} marks):** ${descriptors[i]}`,
    )
    .join("\n");
}

export function renderPointMark(spec: PointMarkSpec): string {
  const lines = spec.markPoints
    .map((p) => `- ${p.description} — **${p.marks} mark${p.marks === 1 ? "" : "s"}**`)
    .join("\n");
  return `**Question ${spec.questionLabel} (${spec.totalMarks} marks)**

Expected answer: ${spec.expectedAnswer}

${lines}
- No creditable content — **0 marks**`;
}

export function renderLevelMark(spec: LevelMarkSpec): string {
  let bands: Array<[number, number]>;
  let descriptors: string[];
  if (spec.totalMarks === 9) {
    bands = NINE_MARK_BANDS;
    descriptors = NINE_MARK_DESCRIPTORS;
  } else if (spec.totalMarks === 15) {
    bands = FIFTEEN_MARK_BANDS;
    descriptors = FIFTEEN_MARK_DESCRIPTORS;
  } else {
    bands = TWENTYFIVE_MARK_BANDS;
    descriptors = TWENTYFIVE_MARK_DESCRIPTORS;
  }

  const indicative = spec.indicativeContent.map((c) => `- ${c}`).join("\n");

  let diagramBlock = "";
  if (spec.diagram) {
    const alts = spec.diagram.alternatives && spec.diagram.alternatives.length > 0
      ? `\nAlternatives accepted: ${spec.diagram.alternatives.join("; ")}`
      : "";
    diagramBlock = `\n\n**Required diagram:** ${spec.diagram.primary}${alts}\n**Labels required:** ${spec.diagram.requiredLabels.join(", ")}`;
  }

  return `**Question ${spec.questionLabel} (${spec.totalMarks} marks)**

${levelTable(bands, descriptors)}${diagramBlock}

**Indicative content (KAA + E):**
${indicative}`;
}

export function renderMcqMark(spec: McqMarkSpec): string {
  return `${spec.questionLabel}  **${spec.answer}**  (${spec.justification})`;
}
