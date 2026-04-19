/**
 * Eduqas A-Level Economics (A520QS) — marking convention.
 *
 * Eduqas (WJEC's England-facing brand) uses AO1–AO4 with a slightly different
 * descriptor style than WJEC. Mark bands and descriptors below are taken
 * verbatim from the Eduqas A-Level Economics specification and published mark
 * schemes (Summer 2018–Summer 2024).
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
} from "@/lib/non-aqa/marking-convention.types";

const bands: Record<number, MarkBand[]> = {
  10: [
    { level: 1, range: [1, 3], aoReferences: ["AO1", "AO2"], descriptor: "Limited knowledge of the relevant concept (AO1). Application is generic (AO2). Analysis is descriptive." },
    { level: 2, range: [4, 7], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Sound knowledge (AO1). Some application using the prompt (AO2). Analysis develops a single chain of reasoning (AO3)." },
    { level: 3, range: [8, 10], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Detailed and accurate knowledge (AO1). Sustained, integrated application (AO2). Multi-step analysis with quantitative reasoning where appropriate (AO3)." },
  ],
  20: [
    { level: 1, range: [1, 5], aoReferences: ["AO1"], descriptor: "Limited knowledge (AO1). Weak application; analysis and evaluation absent." },
    { level: 2, range: [6, 10], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Sound knowledge (AO1). Application uses the context (AO2). Analysis present but not fully developed; evaluation is descriptive (AO3)." },
    { level: 3, range: [11, 15], aoReferences: ["AO1", "AO2", "AO3", "AO4"], descriptor: "Accurate knowledge (AO1). Sustained application (AO2). Multi-step analysis (AO3). Evaluation identifies counter-arguments and reaches a partial judgement (AO4)." },
    { level: 4, range: [16, 20], aoReferences: ["AO1", "AO2", "AO3", "AO4"], descriptor: "Detailed knowledge (AO1). Fully integrated application (AO2). Rigorous, multi-step analysis with quantitative support (AO3). Balanced evaluation with a prioritised, well-supported judgement (AO4)." },
  ],
};

export const EDUQAS_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "eduqas-a-level",
  skillFramework: "AO1-AO4",
  descriptorStyle: "level-of-response",
  markBandsByQuestionMarks: bands,
  annotationTags: ["AO1", "AO2", "AO3", "AO4", "BOD", "JUD"],
  sourceReference: "Eduqas A-Level Economics A520QS mark schemes (Summer 2018–2024)",
  verifiedByAdmin: false,
};
