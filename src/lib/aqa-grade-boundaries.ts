/**
 * AQA A-Level Economics (7136) — published grade boundaries.
 *
 * Only verified years are populated. Unverified years are `null` —
 * NEVER estimate. The marking report falls back to the most recent
 * verified series when displaying pro-rata guidance.
 */

export interface AqaBoundarySet {
  "A*": number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  maxMarks: number;
}

export type AqaSeries = "summer-2024" | "summer-2023" | "summer-2022";

export const AQA_GRADE_BOUNDARIES: Record<
  "7136",
  Record<AqaSeries, AqaBoundarySet | null>
> = {
  "7136": {
    // Verified from AQA Grade Boundary Report — A-Level June 2024 (full qualification, /240).
    "summer-2024": {
      "A*": 189,
      A: 161,
      B: 134,
      C: 107,
      D: 81,
      E: 55,
      maxMarks: 240,
    },
    "summer-2023": null,
    "summer-2022": null,
  },
};

export function latestVerifiedSeries(): { series: AqaSeries; boundaries: AqaBoundarySet } | null {
  const order: AqaSeries[] = ["summer-2024", "summer-2023", "summer-2022"];
  for (const s of order) {
    const b = AQA_GRADE_BOUNDARIES["7136"][s];
    if (b) return { series: s, boundaries: b };
  }
  return null;
}

export function seriesLabel(series: AqaSeries): string {
  return series
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/** Pro-rata a full-qualification boundary (out of 240) to a single paper (out of 80). */
export function proRataPaper(boundaries: AqaBoundarySet, paperTotal: 80 = 80): {
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

export function gradeFromMark(mark: number, paperBounds: ReturnType<typeof proRataPaper>): string {
  if (mark >= paperBounds["A*"]) return "A*";
  if (mark >= paperBounds.A) return "A";
  if (mark >= paperBounds.B) return "B";
  if (mark >= paperBounds.C) return "C";
  if (mark >= paperBounds.D) return "D";
  if (mark >= paperBounds.E) return "E";
  return "U";
}
