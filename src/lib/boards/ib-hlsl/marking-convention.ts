/**
 * IB Diploma Economics (HL & SL) — marking convention.
 *
 * IB uses mark-band descriptors aligned to the IB Economics syllabus
 * (first assessment 2022). HL has three papers, SL has two:
 *   • Paper 1 (extended response, 25 marks)         — both HL and SL
 *   • Paper 2 (data response, 40 marks)             — both HL and SL
 *   • Paper 3 (policy paper, 60 marks)              — HL only
 *
 * Verified against IB published markschemes (May 2022–Nov 2024).
 */
import type {
  NonAqaMarkingConvention,
  MarkBand,
} from "@/lib/non-aqa/marking-convention.types";

// Paper 1 — 25-mark extended response (10-mark + 15-mark parts)
const tenMarkBands: MarkBand[] = [
  { level: 1, range: [1, 2], descriptor: "Little understanding of the question. Few relevant economic terms used; no diagrams or diagrams that are not relevant." },
  { level: 2, range: [3, 4], descriptor: "Some understanding of the question. Some relevant economic terms; diagrams included but with errors or omissions." },
  { level: 3, range: [5, 6], descriptor: "Understanding of the question is shown. Relevant economic terms used; correctly drawn and labelled diagrams; explanation present but with limited depth." },
  { level: 4, range: [7, 8], descriptor: "Question is well understood. Accurate use of economic terms; correct, fully labelled diagrams; analysis is developed with logical chains of reasoning." },
  { level: 5, range: [9, 10], descriptor: "All parts of the question are answered with depth and clarity. Precise economic terminology; fully labelled diagrams integrated into the explanation; rigorous multi-step analysis." },
];

const fifteenMarkBands: MarkBand[] = [
  { level: 1, range: [1, 3], descriptor: "Little understanding. Few or no relevant economic terms; little or no analysis or evaluation." },
  { level: 2, range: [4, 6], descriptor: "Some understanding. Some relevant terms; descriptive rather than analytical; evaluation is asserted not supported." },
  { level: 3, range: [7, 9], descriptor: "Understanding shown. Accurate use of economic terms; analysis present with one developed chain of reasoning; evaluation identifies counter-arguments but conclusion is unsupported." },
  { level: 4, range: [10, 12], descriptor: "Question well understood. Accurate terminology; multi-step analysis with diagrams; evaluation balanced with judgement supported by reference to the question stimulus." },
  { level: 5, range: [13, 15], descriptor: "All parts answered with depth and clarity. Precise terminology; rigorous multi-step analysis with diagrams and quantitative support; evaluation balanced and prioritised, with a well-supported conclusion." },
];

const bands: Record<number, MarkBand[]> = {
  10: tenMarkBands,
  15: fifteenMarkBands,
  // Paper 3 (HL) policy 60-mark — sub-parts are point-marked; banding is per sub-part.
};

export const IB_HLSL_MARKING_CONVENTION: NonAqaMarkingConvention = {
  boardId: "ib-hlsl",
  skillFramework: "IB-Mark-Bands",
  descriptorStyle: "mark-band",
  markBandsByQuestionMarks: bands,
  pointMarkingByQuestionMarks: {
    // Common Paper 2 / Paper 3 short parts
    2: {
      totalMarks: 2,
      acceptedPoints: ["Identification (1)", "Accurate definition / correct calculation (1)"],
    },
    4: {
      totalMarks: 4,
      acceptedPoints: [
        "Identification of relevant concept (1)",
        "Accurate definition (1)",
        "Application to the prompt (1)",
        "Diagram or quantitative support (1)",
      ],
    },
  },
  annotationTags: ["AO1", "AO2", "AO3", "AO4", "DIAG", "EVAL"],
  sourceReference: "IB Diploma Economics markschemes (May 2022–Nov 2024)",
  verifiedByAdmin: false,
};
