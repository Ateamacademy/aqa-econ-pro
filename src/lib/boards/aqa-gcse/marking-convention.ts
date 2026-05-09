/**
 * AQA GCSE Economics (8136) · marking convention.
 *
 * IMPORTANT: This board is `aqa-gcse` and is NOT covered by the AQA A-Level
 * (7136) zero-touch protection. AQA GCSE has a separate, simpler 3-level
 * banding for extended responses (vs A-Level's 4–5 levels). It can be
 * authored freely without affecting any AQA A-Level file.
 *
 * Verified against AQA 8136 mark schemes (June 2018–June 2024).
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
  PointMarkingRubric,
} from "@/lib/non-aqa/marking-convention.types";

const bands: Record<number, MarkBand[]> = {
  6: [
    { level: 1, range: [1, 2], descriptor: "Basic understanding of the concept; limited application; little or no analysis." },
    { level: 2, range: [3, 4], descriptor: "Reasonable understanding; application using the source; one developed chain of reasoning." },
    { level: 3, range: [5, 6], descriptor: "Accurate understanding with developed chains of reasoning supported by the source; clear application throughout." },
  ],
  9: [
    { level: 1, range: [1, 3], descriptor: "Basic understanding; limited application; descriptive rather than analytical; no evaluation." },
    { level: 2, range: [4, 6], descriptor: "Reasonable understanding; application using the source; analysis present; evaluation is asserted not supported." },
    { level: 3, range: [7, 9], descriptor: "Accurate understanding with developed analysis; evaluation balanced with a supported judgement using the source." },
  ],
  12: [
    { level: 1, range: [1, 4], descriptor: "Basic understanding; limited application; descriptive analysis; evaluation absent." },
    { level: 2, range: [5, 8], descriptor: "Reasonable understanding; application uses the source; analysis develops one chain of reasoning; evaluation present but unsupported." },
    { level: 3, range: [9, 12], descriptor: "Detailed and accurate understanding; sustained application; multi-step analysis; balanced evaluation with a prioritised, supported conclusion." },
  ],
};

const point: Record<number, PointMarkingRubric> = {
  1: { totalMarks: 1, acceptedPoints: ["Correct identification (1)"] },
  2: { totalMarks: 2, acceptedPoints: ["Identification (1)", "Accurate definition / correct calculation (1)"] },
  3: {
    totalMarks: 3,
    acceptedPoints: [
      "Identification of relevant concept (1)",
      "Accurate definition (1)",
      "Application using the source (1)",
    ],
  },
};

export const AQA_GCSE_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "aqa-gcse",
  skillFramework: "GCSE-Simple",
  descriptorStyle: "level-of-response",
  markBandsByQuestionMarks: bands,
  pointMarkingByQuestionMarks: point,
  annotationTags: ["L1", "L2", "L3", "BOD", "DEV"],
  sourceReference: "AQA GCSE Economics 8136 mark schemes (June 2018–June 2024)",
  verifiedByAdmin: false,
};
