/**
 * OCR GCSE Economics (J205) — marking convention.
 *
 * AO1–AO4 framework but with simpler 3-level banding compared to OCR A-Level.
 * Verified against OCR J205 mark schemes (June 2019–June 2024).
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
  PointMarkingRubric,
} from "@/lib/non-aqa/marking-convention.types";

const bands: Record<number, MarkBand[]> = {
  6: [
    { level: 1, range: [1, 2], aoReferences: ["AO1"], descriptor: "Basic knowledge (AO1); little or no application." },
    { level: 2, range: [3, 4], aoReferences: ["AO1", "AO2"], descriptor: "Sound knowledge (AO1); application uses the source (AO2); one chain of reasoning." },
    { level: 3, range: [5, 6], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Detailed knowledge (AO1); sustained application (AO2); multi-step analysis using the source (AO3)." },
  ],
  9: [
    { level: 1, range: [1, 3], aoReferences: ["AO1"], descriptor: "Basic knowledge (AO1); descriptive; no evaluation." },
    { level: 2, range: [4, 6], aoReferences: ["AO1", "AO2", "AO3"], descriptor: "Sound knowledge (AO1); application using the source (AO2); analysis develops one chain of reasoning (AO3); brief evaluation." },
    { level: 3, range: [7, 9], aoReferences: ["AO1", "AO2", "AO3", "AO4"], descriptor: "Detailed knowledge (AO1); sustained application (AO2); multi-step analysis (AO3); balanced evaluation with a supported conclusion (AO4)." },
  ],
};

const point: Record<number, PointMarkingRubric> = {
  1: { totalMarks: 1, acceptedPoints: ["Correct identification (1)"] },
  2: { totalMarks: 2, acceptedPoints: ["Identification (1)", "Accurate definition / calculation (1)"] },
  3: {
    totalMarks: 3,
    acceptedPoints: ["Identification (1)", "Accurate definition (1)", "Application to source (1)"],
  },
};

export const OCR_GCSE_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "ocr-gcse",
  skillFramework: "AO1-AO4",
  descriptorStyle: "level-of-response",
  markBandsByQuestionMarks: bands,
  pointMarkingByQuestionMarks: point,
  annotationTags: ["AO1", "AO2", "AO3", "AO4", "BOD", "DEV"],
  sourceReference: "OCR GCSE Economics J205 mark schemes (June 2019–June 2024)",
  verifiedByAdmin: false,
};
