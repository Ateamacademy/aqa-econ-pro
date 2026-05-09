/**
 * CAIE IGCSE Economics (0455) · marking convention.
 *
 * Two papers:
 *   • Paper 1 (MCQ, 30 questions, 30 marks)         · point-marking
 *   • Paper 2 (structured + extended, 90 marks)     · point-marking on short
 *                                                     parts; CAIE level
 *                                                     descriptors on the
 *                                                     8-mark extended part.
 *
 * Verified against CAIE 0455 mark schemes (May/June 2017–2024).
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
  PointMarkingRubric,
} from "@/lib/non-aqa/marking-convention.types";

// Paper 2 extended 8-mark
const extendedBands: MarkBand[] = [
  { level: 1, range: [1, 3], descriptor: "Some understanding of the issue; basic explanation; little or no use of evidence." },
  { level: 2, range: [4, 6], descriptor: "Reasonable understanding; explanation develops one chain of reasoning; some evidence used." },
  { level: 3, range: [7, 8], descriptor: "Detailed understanding; explanation develops multi-step reasoning supported by evidence; conclusion is supported." },
];

const bands: Record<number, MarkBand[]> = {
  8: extendedBands,
};

const point: Record<number, PointMarkingRubric> = {
  1: { totalMarks: 1, acceptedPoints: ["Correct answer / identification (1)"] },
  2: { totalMarks: 2, acceptedPoints: ["Identification (1)", "Accurate definition / correct calculation (1)"] },
  4: {
    totalMarks: 4,
    acceptedPoints: [
      "Identification of relevant concept (1)",
      "Accurate definition (1)",
      "Application using the source (1)",
      "Worked numerical step / second concept (1)",
    ],
  },
  6: {
    totalMarks: 6,
    acceptedPoints: [
      "First reason identified (1)",
      "First reason explained (1)",
      "Application of first reason (1)",
      "Second reason identified (1)",
      "Second reason explained (1)",
      "Application of second reason (1)",
    ],
  },
};

export const CAIE_IGCSE_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "caie-igcse",
  skillFramework: "CAIE-Levels",
  descriptorStyle: "level-of-response",
  markBandsByQuestionMarks: bands,
  pointMarkingByQuestionMarks: point,
  annotationTags: ["L1", "L2", "L3", "BOD", "TV"],
  sourceReference: "CAIE IGCSE Economics 0455 mark schemes (May/June 2017–2024)",
  verifiedByAdmin: false,
};
