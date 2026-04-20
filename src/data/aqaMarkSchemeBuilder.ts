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
  /** Optional diagram requirement for 9/15/25-mark questions. */
  diagram?: {
    primary: string;
    alternatives?: string[];
    requiredLabels: string[];
    /** Filename in /public/figures (no leading slash) — rendered as the canonical reference figure. */
    figureKey?: string;
    /** Caption shown under the figure. Defaults to "Reference diagram". */
    figureCaption?: string;
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

// 15-mark — AQA 3-level structure (reviewer-confirmed canonical template).
// AO3 (Analysis) is the TOP-BAND discriminator — NOT AO4. 15-mark questions
// do not require evaluation.
const FIFTEEN_MARK_BANDS: Array<[number, number]> = [
  [1, 5],
  [6, 10],
  [11, 15],
];

// 25-mark — AQA 5-level structure (reviewer-confirmed canonical template).
// AO4 (Evaluation) is the TOP-BAND discriminator — supported judgement required.
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

// 15-mark — 3 levels, AO3 (Analysis) as the top-band discriminator.
const FIFTEEN_MARK_DESCRIPTORS = [
  "**Level 1 (1–5 marks) – Basic.** Vague or incorrect definitions. Very basic statements. No real analytical chains. No clear link to the question's economic concept.",
  "**Level 2 (6–10 marks) – Mid-Level.** Definitions partially correct. Some explanation, often unbalanced (one concept covered well, the other weak). Chains of reasoning incomplete. Examples generic or missing. Weak use of economic terminology.",
  "**Level 3 (11–15 marks) – Top Band.** AO1: accurate definitions of relevant concepts. AO2: clear use of relevant examples. **AO3 (top-band discriminator):** fully developed chains of reasoning with explicit logical chains (e.g. \"firms ignore external costs → price too low → over-consumption → welfare loss\"). Note: AO4 (evaluation) is NOT required at 15 marks.",
];

// 25-mark — 5 levels, AO4 (Evaluation) as the top-band discriminator.
const TWENTYFIVE_MARK_DESCRIPTORS = [
  "**Level 1 (1–5 marks) – Minimal.** Very basic points. No real structure. No evaluation.",
  "**Level 2 (6–10 marks) – Basic.** Limited knowledge. Weak or unclear analysis. Very little evaluation. No real use of extract.",
  "**Level 3 (11–15 marks) – Mid-Level.** Sound but basic explanation. Chains of reasoning short or underdeveloped. Limited or generic evaluation. Weak use of extract.",
  "**Level 4 (16–20 marks) – Strong Answer.** AO1/AO2: good knowledge and application; some use of extract (may not be fully integrated). AO3: clear chains of reasoning but may lack depth in places. AO4: evaluation present but uneven or less developed; judgement may be generic.",
  "**Level 5 (21–25 marks) – Top Band.** AO1: precise understanding of the topic. AO2: strong, consistent use of extracts; specific numerical data cited; UK-contextualised. AO3: well-developed chains of reasoning with clear transmission mechanisms. **AO4 (top-band discriminator):** balanced, well-developed evaluation throughout; supported, contextual judgement; multiple developed evaluation points (e.g. time lags, dependence on confidence, structural vs cyclical factors, regressivity, PED). **A supported judgement / conclusion paragraph is required.**",
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
    const figure = spec.diagram.figureKey
      ? `\n\n![${spec.diagram.figureCaption ?? "Reference diagram"}](/figures/${spec.diagram.figureKey})`
      : "";
    diagramBlock = `\n\n**Required diagram:** ${spec.diagram.primary}${alts}\n**Labels required:** ${spec.diagram.requiredLabels.join(", ")}${figure}`;
  }

  return `**Question ${spec.questionLabel} (${spec.totalMarks} marks)**

${levelTable(bands, descriptors)}${diagramBlock}

**Indicative content (KAA + E):**
${indicative}`;
}

export function renderMcqMark(spec: McqMarkSpec): string {
  return `${spec.questionLabel}  **${spec.answer}**  (${spec.justification})`;
}
