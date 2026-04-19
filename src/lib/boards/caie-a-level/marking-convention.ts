/**
 * CAIE A-Level Economics (9708) — marking convention.
 *
 * CAIE A-Level has FOUR papers:
 *   • Paper 1 (AS, MCQ, 30 marks)            — point-marking
 *   • Paper 2 (AS, data + essay, 40 marks)   — point-marking with mark points
 *   • Paper 3 (A2, MCQ, 30 marks)            — point-marking
 *   • Paper 4 (A2, data + essay, 70 marks)   — CAIE level descriptors on the
 *                                              25-mark essay; point-marking
 *                                              for shorter parts.
 *
 * Verified against published 9708 mark schemes (May/June 2017–2024).
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
  PointMarkingRubric,
} from "@/lib/non-aqa/marking-convention.types";

// CAIE 25-mark essay (Paper 4 part b)
const essayBands: MarkBand[] = [
  {
    level: 1,
    range: [1, 6],
    descriptor:
      "Some knowledge of relevant concepts. Application is limited or generic. Analysis is descriptive rather than analytical. No evaluation.",
  },
  {
    level: 2,
    range: [7, 12],
    descriptor:
      "Sound knowledge with some accurate definitions. Reasonable application using the prompt context. Analysis develops at least one chain of reasoning. Evaluation, if present, is assertive.",
  },
  {
    level: 3,
    range: [13, 18],
    descriptor:
      "Accurate knowledge with appropriate diagrams. Sustained application. Multi-step analysis with logical chains of reasoning. Evaluation identifies counter-arguments but prioritisation is partial.",
  },
  {
    level: 4,
    range: [19, 25],
    descriptor:
      "Detailed and precise knowledge with accurate diagrams and quantitative reasoning where appropriate. Fully integrated application throughout. Rigorous multi-step analysis. Balanced evaluation with a prioritised, well-supported conclusion.",
  },
];

// Generic CAIE 8-mark structured part (Paper 4 part a)
const eightMarkBands: MarkBand[] = [
  { level: 1, range: [1, 3], descriptor: "Limited knowledge of relevant concepts; little or no application." },
  { level: 2, range: [4, 6], descriptor: "Sound knowledge with some application; analysis develops one chain of reasoning." },
  { level: 3, range: [7, 8], descriptor: "Accurate knowledge with diagrams as appropriate; sustained application; developed multi-step analysis." },
];

const bands: Record<number, MarkBand[]> = {
  8: eightMarkBands,
  25: essayBands,
};

const point: Record<number, PointMarkingRubric> = {
  // Paper 1 / Paper 3 MCQ — 1 mark per correct answer; total controlled per paper.
  1: {
    totalMarks: 1,
    acceptedPoints: ["Correct single best answer A/B/C/D"],
  },
  // Generic 2-mark "define" — 1 mark for partial, 2 for full.
  2: {
    totalMarks: 2,
    acceptedPoints: [
      "Identification of the correct concept (1)",
      "Accurate / complete definition with appropriate qualifier (1)",
    ],
  },
  4: {
    totalMarks: 4,
    acceptedPoints: [
      "Correct concept identification (1)",
      "Accurate definition (1)",
      "Application to the context (1)",
      "Worked numerical step / formula (1)",
    ],
    cap: 4,
  },
  6: {
    totalMarks: 6,
    acceptedPoints: [
      "Definition of key term (1)",
      "Identification of relevant theory (1)",
      "First analytical step (1)",
      "Second analytical step (1)",
      "Application using the prompt context (1)",
      "Diagram/quantitative support (1)",
    ],
    cap: 6,
  },
};

export const CAIE_A_LEVEL_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "caie-a-level",
  skillFramework: "CAIE-Levels",
  descriptorStyle: "level-of-response",
  markBandsByQuestionMarks: bands,
  pointMarkingByQuestionMarks: point,
  annotationTags: ["L1", "L2", "L3", "L4", "BOD", "TV"],
  sourceReference: "CAIE 9708 mark schemes (May/June 2017–2024)",
  verifiedByAdmin: false,
};
