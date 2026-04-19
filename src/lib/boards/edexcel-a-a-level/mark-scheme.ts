/**
 * Edexcel A A-Level Economics (9EC0) — per-skill (K/Ap/An/Ev) mark scheme.
 *
 * Unlike AQA (level-of-response grids), Edexcel awards marks per skill.
 * The marking UI for Edexcel must show this per-skill breakdown.
 *
 * Splits below are derived from published Pearson 9EC0 mark schemes.
 */
import type { MarkSchemeConvention, SkillSplit } from "../board-definition";

const splits: Record<number, SkillSplit> = {
  // Section A 4-mark explain (K + Ap only)
  4: { K: 2, Ap: 2, An: 0, Ev: 0 },
  // Section B (a) 5-mark define / explain (K + Ap)
  5: { K: 2, Ap: 3, An: 0, Ev: 0 },
  // Section B (b) 8-mark examine (K + Ap + An)
  8: { K: 2, Ap: 2, An: 4, Ev: 0 },
  // Section B (c) 10-mark assess
  10: { K: 2, Ap: 2, An: 4, Ev: 2 },
  // Section B (d) 12-mark discuss
  12: { K: 2, Ap: 3, An: 4, Ev: 3 },
  // Section B (e) 15-mark evaluate
  15: { K: 3, Ap: 3, An: 5, Ev: 4 },
  // Section C and Paper 3 (d) — 25-mark essay
  25: { K: 4, Ap: 5, An: 8, Ev: 8 },
};

export const EDEXCEL_A_MARK_SCHEME: MarkSchemeConvention = {
  skillFramework: "K/Ap/An/Ev",
  levelBands: {}, // Edexcel does not use level grids
  skillSplits: splits,
  examinerAnnotations: ["K", "Ap", "An", "Ev", "BOD", "OFR"],
  descriptorStyle: "verbatim",
};

/** Helper: get the K/Ap/An/Ev split for a question of the given mark value. */
export function getEdexcelASkillSplit(marks: number): SkillSplit | null {
  return splits[marks] ?? null;
}
