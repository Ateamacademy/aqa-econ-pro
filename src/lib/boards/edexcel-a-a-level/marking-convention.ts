/**
 * Edexcel A A-Level Economics (9EC0) — non-AQA marking convention adapter.
 *
 * Edexcel A's per-skill (K/Ap/An/Ev) splits already live in
 * `src/lib/boards/edexcel-a-a-level/mark-scheme.ts`. This file mirrors them
 * into the `NonAqaMarkingConvention` shape for use by the new non-AQA marking
 * UI / AI / verification pipeline. Source of truth remains `mark-scheme.ts`.
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
} from "@/lib/non-aqa/marking-convention.types";
import { getEdexcelASkillSplit } from "./mark-scheme";

const SUPPORTED_MARKS = [4, 5, 8, 10, 12, 15, 25] as const;

const splits = SUPPORTED_MARKS.reduce<Record<number, ReturnType<typeof getEdexcelASkillSplit>>>(
  (acc, m) => {
    const s = getEdexcelASkillSplit(m);
    if (s) acc[m] = s;
    return acc;
  },
  {},
);

// Indicative descriptors used by the per-skill UI sliders for context only.
const bands: Record<number, MarkBand[]> = {
  8: [
    { level: 1, range: [1, 2], descriptor: "Limited K and Ap; weak or no An." },
    { level: 2, range: [3, 5], descriptor: "Sound K and Ap; analysis develops one chain of reasoning." },
    { level: 3, range: [6, 8], descriptor: "Sustained K, Ap and An; multi-step analysis with quantitative support where possible." },
  ],
  10: [
    { level: 1, range: [1, 3], descriptor: "Limited K/Ap/An; evaluation absent or assertive." },
    { level: 2, range: [4, 6], descriptor: "Reasonable K/Ap/An; brief but relevant evaluation." },
    { level: 3, range: [7, 10], descriptor: "Sustained K/Ap/An; prioritised, supported evaluative judgement." },
  ],
  12: [
    { level: 1, range: [1, 4], descriptor: "Limited K and Ap; analysis weak; evaluation absent." },
    { level: 2, range: [5, 8], descriptor: "Reasonable K/Ap/An; evaluation identifies counter-arguments." },
    { level: 3, range: [9, 12], descriptor: "Sustained K/Ap/An; balanced evaluation with prioritised, supported judgement." },
  ],
  15: [
    { level: 1, range: [1, 5], descriptor: "Limited K/Ap; weak analysis." },
    { level: 2, range: [6, 10], descriptor: "Sound K/Ap/An; reasonable evaluation." },
    { level: 3, range: [11, 15], descriptor: "Sustained K/Ap/An; balanced, prioritised evaluation with supported judgement." },
  ],
  25: [
    { level: 1, range: [1, 8], descriptor: "Limited K/Ap; weak An; evaluation absent." },
    { level: 2, range: [9, 15], descriptor: "Reasonable K/Ap/An; evaluation present but unprioritised." },
    { level: 3, range: [16, 20], descriptor: "Sustained K/Ap/An; balanced evaluation with supported judgement." },
    { level: 4, range: [21, 25], descriptor: "Precise, theoretically deep K with quantitative reasoning. Sustained Ap throughout. Rigorous multi-step An. Balanced evaluation with a prioritised, well-supported conclusion." },
  ],
};

export const EDEXCEL_A_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "edexcel-a-a-level",
  skillFramework: "K/Ap/An/Ev",
  descriptorStyle: "per-skill-split",
  markBandsByQuestionMarks: bands,
  perSkillBreakdown: splits as NonAqaMarkingConvention["perSkillBreakdown"],
  annotationTags: ["K", "Ap", "An", "Ev", "BOD", "OFR"],
  sourceReference: "Pearson Edexcel A 9EC0 mark schemes (June 2017–June 2024)",
  verifiedByAdmin: true,
};
