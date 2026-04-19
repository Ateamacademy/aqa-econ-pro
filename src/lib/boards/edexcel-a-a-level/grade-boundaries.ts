/**
 * Edexcel A A-Level Economics (9EC0) — published grade boundaries.
 *
 * Boundaries apply to the full qualification (all three papers, /300).
 * Per-paper pro-rata is indicative only.
 *
 * Only verified series are populated. Unverified years remain `null` —
 * NEVER estimate.
 */
import type { GradeBoundarySet } from "../board-definition";

export const EDEXCEL_A_GRADE_BOUNDARIES: Record<string, GradeBoundarySet | null> = {
  // Verified from Pearson Edexcel Grade Boundaries — A-Level June 2024 (full qualification, /300).
  "summer-2024": {
    "A*": 217,
    A: 185,
    B: 154,
    C: 123,
    D: 93,
    E: 63,
    maxMarks: 300,
  },
  "summer-2023": null,
  "summer-2022": null,
};

export function proRataPaperEdexcelA(boundaries: GradeBoundarySet, paperTotal = 100): {
  "A*": number; A: number; B: number; C: number; D: number; E: number;
} {
  const ratio = paperTotal / boundaries.maxMarks;
  return {
    "A*": Math.round(boundaries["A*"] * ratio),
    A: Math.round(boundaries.A * ratio),
    B: Math.round(boundaries.B * ratio),
    C: Math.round(boundaries.C * ratio),
    D: Math.round(boundaries.D * ratio),
    E: Math.round(boundaries.E * ratio),
  };
}
