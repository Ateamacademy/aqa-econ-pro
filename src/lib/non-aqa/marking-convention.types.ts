/**
 * Non-AQA marking convention types.
 *
 * Strictly excludes AQA's KAA+E framework — AQA uses its own legacy types in
 * `src/lib/aqa-levels.ts` and friends. This file MUST NEVER be imported by
 * any AQA file, and AQA marking code MUST NEVER be imported here.
 */
import type { BoardId } from "@/lib/boards/board-definition";

export type NonAqaBoardId = Exclude<BoardId, "aqa-a-level">;

export type NonAqaSkillFramework =
  | "K/Ap/An/Ev"     // Edexcel A, Edexcel B, Edexcel IGCSE
  | "AO1-AO4"        // OCR, WJEC, Eduqas, OCR GCSE
  | "IB-Mark-Bands"  // IB HL/SL
  | "CAIE-Levels"    // CAIE A-Level (essay parts), CAIE IGCSE (extended)
  | "GCSE-Simple";   // AQA GCSE (3-level banding)

export type NonAqaDescriptorStyle =
  | "level-of-response"
  | "per-skill-split"
  | "mark-band"
  | "point-marking";

export type MarkBand = {
  level: number;
  range: [number, number]; // marks range, inclusive
  descriptor: string;
  /** Optional explicit AO references for AO-based boards. */
  aoReferences?: Array<"AO1" | "AO2" | "AO3" | "AO4">;
};

export type SkillSplit = {
  K: number;
  Ap: number;
  An: number;
  Ev: number;
};

export type PointMarkingRubric = {
  /** Total marks for the question. */
  totalMarks: number;
  /** Bullet-style point lists. The marker awards 1 per matched bullet. */
  acceptedPoints: string[];
  /** Maximum marks awardable for a single point cluster (caps double-counting). */
  cap?: number;
};

export type NonAqaMarkingConvention = {
  boardId: NonAqaBoardId;
  skillFramework: NonAqaSkillFramework;
  descriptorStyle: NonAqaDescriptorStyle;
  /** Level-of-response / mark-band grids keyed by question mark value. */
  markBandsByQuestionMarks: Record<number, MarkBand[]>;
  /** Per-skill K/Ap/An/Ev breakdown for boards that use it. */
  perSkillBreakdown?: Record<number, SkillSplit>;
  /** Point-marking rubrics keyed by question mark value. */
  pointMarkingByQuestionMarks?: Record<number, PointMarkingRubric>;
  annotationTags: string[];
  sourceReference: string;
  verifiedByAdmin: boolean;
};
