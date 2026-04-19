/**
 * OCR A-Level Economics (H460) — marking convention.
 *
 * OCR uses AO1–AO4 level-of-response descriptors. Bands and descriptors below
 * are taken verbatim (with minor formatting) from the OCR H460 mark schemes
 * (June 2017–June 2024). Each level descriptor explicitly references the AOs
 * the candidate is meeting.
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
} from "@/lib/non-aqa/marking-convention.types";

const bands: Record<number, MarkBand[]> = {
  10: [
    {
      level: 1,
      range: [1, 3],
      aoReferences: ["AO1", "AO2"],
      descriptor:
        "Demonstrates limited knowledge and understanding of economic concepts (AO1). Limited application to the context (AO2). Analysis is absent or limited to assertion.",
    },
    {
      level: 2,
      range: [4, 6],
      aoReferences: ["AO1", "AO2", "AO3"],
      descriptor:
        "Demonstrates sound knowledge and understanding (AO1). Application to the context is mostly accurate (AO2). Analysis develops one chain of reasoning but may lack depth (AO3).",
    },
    {
      level: 3,
      range: [7, 10],
      aoReferences: ["AO1", "AO2", "AO3"],
      descriptor:
        "Demonstrates accurate and detailed knowledge and understanding (AO1). Sustained, contextual application (AO2). Analysis develops multi-step chains of reasoning supported by data and theory (AO3).",
    },
  ],
  15: [
    {
      level: 1,
      range: [1, 4],
      aoReferences: ["AO1", "AO2"],
      descriptor:
        "Limited knowledge and understanding (AO1). Weak or no application (AO2). Analysis absent. Evaluation absent.",
    },
    {
      level: 2,
      range: [5, 8],
      aoReferences: ["AO1", "AO2", "AO3"],
      descriptor:
        "Sound knowledge (AO1). Some application (AO2). Analysis develops one chain of reasoning (AO3). Evaluation absent or assertive.",
    },
    {
      level: 3,
      range: [9, 12],
      aoReferences: ["AO1", "AO2", "AO3", "AO4"],
      descriptor:
        "Accurate knowledge (AO1). Sustained application (AO2). Multi-step analysis (AO3). Evaluation present, identifies counter-arguments (AO4) but judgement is unprioritised.",
    },
    {
      level: 4,
      range: [13, 15],
      aoReferences: ["AO1", "AO2", "AO3", "AO4"],
      descriptor:
        "Detailed and accurate knowledge (AO1). Fully integrated application (AO2). Rigorous, multi-step analysis with quantitative support where available (AO3). Balanced evaluation with prioritised, supported judgement (AO4).",
    },
  ],
  25: [
    {
      level: 1,
      range: [1, 5],
      aoReferences: ["AO1"],
      descriptor: "Limited knowledge (AO1). Weak or no application. No analysis. No evaluation.",
    },
    {
      level: 2,
      range: [6, 10],
      aoReferences: ["AO1", "AO2"],
      descriptor: "Sound knowledge (AO1). Some application (AO2). Limited analysis. No evaluation.",
    },
    {
      level: 3,
      range: [11, 15],
      aoReferences: ["AO1", "AO2", "AO3"],
      descriptor:
        "Accurate knowledge (AO1). Sustained application (AO2). Reasonable analysis with one developed chain of reasoning (AO3). Some evaluation but conclusion unsupported.",
    },
    {
      level: 4,
      range: [16, 20],
      aoReferences: ["AO1", "AO2", "AO3", "AO4"],
      descriptor:
        "Detailed knowledge (AO1). Fully integrated application (AO2). Multi-step analysis (AO3). Evaluation balanced with judgement supported by data and theory (AO4).",
    },
    {
      level: 5,
      range: [21, 25],
      aoReferences: ["AO1", "AO2", "AO3", "AO4"],
      descriptor:
        "Precise, theoretically deep knowledge (AO1). Sustained, integrated application throughout (AO2). Rigorous, multi-step analysis with quantitative reasoning (AO3). Prioritised, well-supported evaluative judgement (AO4).",
    },
  ],
};

export const OCR_A_LEVEL_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "ocr-a-level",
  skillFramework: "AO1-AO4",
  descriptorStyle: "level-of-response",
  markBandsByQuestionMarks: bands,
  annotationTags: ["AO1", "AO2", "AO3", "AO4", "BOD", "DEV", "JUD"],
  sourceReference: "OCR H460 mark schemes (June 2017–June 2024)",
  verifiedByAdmin: false,
};
