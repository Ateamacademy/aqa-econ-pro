/**
 * Edexcel IGCSE Economics (4EC1) — marking convention.
 *
 * Same K/Ap/An/Ev framework as Edexcel A-Level but with reduced evaluation
 * weighting at IGCSE level. Mark splits below are derived from published
 * Pearson 4EC1 mark schemes (June 2018–June 2024).
 */
import type {
  NonAqaMarkingConvention,
  SkillSplit,
  MarkBand,
  PointMarkingRubric,
} from "@/lib/non-aqa/marking-convention.types";

const splits: Record<number, SkillSplit> = {
  4: { K: 2, Ap: 2, An: 0, Ev: 0 },
  6: { K: 2, Ap: 2, An: 2, Ev: 0 },
  8: { K: 2, Ap: 2, An: 3, Ev: 1 }, // reduced Ev weighting at IGCSE
  12: { K: 3, Ap: 3, An: 4, Ev: 2 },
};

const bands: Record<number, MarkBand[]> = {
  8: [
    { level: 1, range: [1, 3], descriptor: "Limited K/Ap; analysis weak; evaluation absent." },
    { level: 2, range: [4, 6], descriptor: "Reasonable K/Ap; one chain of reasoning; brief evaluation." },
    { level: 3, range: [7, 8], descriptor: "Sustained K/Ap; multi-step analysis; supported evaluation." },
  ],
  12: [
    { level: 1, range: [1, 4], descriptor: "Limited K/Ap; weak analysis; no evaluation." },
    { level: 2, range: [5, 8], descriptor: "Reasonable K/Ap/An; brief evaluation with assertive judgement." },
    { level: 3, range: [9, 12], descriptor: "Sustained K/Ap/An throughout; balanced evaluation with prioritised judgement." },
  ],
};

const point: Record<number, PointMarkingRubric> = {
  1: { totalMarks: 1, acceptedPoints: ["Correct identification (1)"] },
  2: { totalMarks: 2, acceptedPoints: ["Identification (1)", "Accurate definition (1)"] },
  3: {
    totalMarks: 3,
    acceptedPoints: ["Identification (1)", "Accurate definition (1)", "Worked example or context (1)"],
  },
};

export const EDEXCEL_IGCSE_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "edexcel-igcse",
  skillFramework: "K/Ap/An/Ev",
  descriptorStyle: "per-skill-split",
  markBandsByQuestionMarks: bands,
  perSkillBreakdown: splits,
  pointMarkingByQuestionMarks: point,
  annotationTags: ["K", "Ap", "An", "Ev", "BOD", "OFR"],
  sourceReference: "Pearson Edexcel IGCSE Economics 4EC1 mark schemes (June 2018–June 2024)",
  verifiedByAdmin: false,
};
