/**
 * WJEC A-Level Economics (1EC0) — marking convention.
 *
 * WJEC uses AO1–AO4 with weightings of approximately 25% per AO across the
 * full qualification. Mark bands and descriptors below are taken from the
 * WJEC A-Level Economics specification and published mark schemes
 * (Summer 2018–Summer 2024).
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
} from "@/lib/non-aqa/marking-convention.types";

const bands: Record<number, MarkBand[]> = {
  10: [
    { level: 1, range: [1, 3], aoReferences: ["AO1", "AO2"], descriptor: "Demonstrates limited knowledge and understanding (AO1). Application is generic or absent (AO2). Limited analytical development." },
    { level: 2, range: [4, 7], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Sound knowledge of relevant economic concepts (AO1). Application uses the context but is partial (AO2). Analysis develops one chain of reasoning (AO3)." },
    { level: 3, range: [8, 10], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Accurate, detailed knowledge (AO1). Sustained contextual application (AO2). Multi-step analysis with logical chains of reasoning (AO3)." },
  ],
  20: [
    { level: 1, range: [1, 5], aoReferences: ["AO1"], descriptor: "Limited knowledge (AO1). Weak application; analysis and evaluation absent." },
    { level: 2, range: [6, 10], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Sound knowledge (AO1). Some application (AO2). Reasonable analysis but evaluation is descriptive (AO3)." },
    { level: 3, range: [11, 15], aoReferences: ["AO1", "AO2", "AO3", "AO4"], descriptor: "Accurate knowledge (AO1). Sustained application (AO2). Multi-step analysis (AO3). Evaluation identifies counter-arguments and reaches a partial judgement (AO4)." },
    { level: 4, range: [16, 20], aoReferences: ["AO1", "AO2", "AO3", "AO4"], descriptor: "Detailed knowledge with depth (AO1). Fully integrated application (AO2). Rigorous, multi-step analysis with quantitative support (AO3). Balanced evaluation with a prioritised, well-supported judgement (AO4)." },
  ],
};

export const WJEC_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "wjec-a-level",
  skillFramework: "AO1-AO4",
  descriptorStyle: "level-of-response",
  markBandsByQuestionMarks: bands,
  annotationTags: ["AO1", "AO2", "AO3", "AO4", "BOD", "JUD"],
  sourceReference: "WJEC A-Level Economics 1EC0 mark schemes (Summer 2018–2024)",
  verifiedByAdmin: false,
};
