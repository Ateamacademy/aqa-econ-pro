/**
 * Edexcel B A-Level Economics (9EB0) · marking convention.
 *
 * Edexcel B uses the same K/Ap/An/Ev per-skill framework as Edexcel A but with
 * a business-economics emphasis. Mark splits below are derived from published
 * Pearson 9EB0 mark schemes (June 2018–June 2024).
 */
import type {
  NonAqaMarkingConvention,
  SkillSplit,
  MarkBand,
} from "@/lib/non-aqa/marking-convention.types";

const splits: Record<number, SkillSplit> = {
  4:  { K: 2, Ap: 2, An: 0, Ev: 0 }, // Section A short explain
  5:  { K: 2, Ap: 3, An: 0, Ev: 0 }, // Section B (a) define / explain
  8:  { K: 2, Ap: 2, An: 4, Ev: 0 }, // Section B (b) examine
  10: { K: 2, Ap: 2, An: 4, Ev: 2 }, // Section B (c) assess
  12: { K: 2, Ap: 3, An: 4, Ev: 3 }, // Section B (d) discuss
  15: { K: 3, Ap: 3, An: 5, Ev: 4 }, // Section B (e) evaluate
  20: { K: 3, Ap: 4, An: 7, Ev: 6 }, // Section C 20-mark essay (Edexcel B variant)
};

// Indicative descriptors for the per-skill UI sliders.
const bands: Record<number, MarkBand[]> = {
  8: [
    { level: 1, range: [1, 2], descriptor: "Knowledge of relevant economic concepts is limited; application to the business context is weak; little or no analysis." },
    { level: 2, range: [3, 5], descriptor: "Sound knowledge of relevant concepts; application is partly developed using the extract; analysis shows some chains of reasoning." },
    { level: 3, range: [6, 8], descriptor: "Accurate knowledge of relevant concepts; application is sustained and integrated with the business context; analysis develops logical, multi-step chains of reasoning." },
  ],
  10: [
    { level: 1, range: [1, 3], descriptor: "Limited K/Ap/An. Evaluation absent or assertive without support." },
    { level: 2, range: [4, 6], descriptor: "Reasonable K/Ap/An; evaluation is brief but identifies a relevant counter-point." },
    { level: 3, range: [7, 10], descriptor: "Good K/Ap/An sustained throughout; evaluation prioritises arguments and reaches a supported judgement." },
  ],
  12: [
    { level: 1, range: [1, 4], descriptor: "Limited K and Ap; analysis weak; evaluation assertive." },
    { level: 2, range: [5, 8], descriptor: "Reasonable K, Ap, An; evaluation identifies counter-arguments but judgement is unsupported." },
    { level: 3, range: [9, 12], descriptor: "Sustained K, Ap, An; evaluation balanced with prioritised judgement supported by data and theory." },
  ],
  15: [
    { level: 1, range: [1, 5], descriptor: "Limited knowledge / weak application. No analysis or evaluation." },
    { level: 2, range: [6, 10], descriptor: "Some knowledge and application. Reasonable analysis. Evaluation identifies counter-points but conclusion unsupported." },
    { level: 3, range: [11, 15], descriptor: "Good knowledge and application throughout. Developed analysis. Evaluation balanced with prioritised, supported conclusion." },
  ],
  20: [
    { level: 1, range: [1, 6], descriptor: "Limited K/Ap/An; evaluation absent." },
    { level: 2, range: [7, 12], descriptor: "Reasonable K/Ap/An; evaluation present but unprioritised." },
    { level: 3, range: [13, 20], descriptor: "Sustained K/Ap/An; balanced evaluation with prioritised, well-supported judgement." },
  ],
};

export const EDEXCEL_B_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "edexcel-b-a-level",
  skillFramework: "K/Ap/An/Ev",
  descriptorStyle: "per-skill-split",
  markBandsByQuestionMarks: bands,
  perSkillBreakdown: splits,
  annotationTags: ["K", "Ap", "An", "Ev", "BOD", "OFR"],
  sourceReference: "Pearson Edexcel B 9EB0 mark schemes (June 2018–June 2024)",
  verifiedByAdmin: false,
};
