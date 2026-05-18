/**
 * Historical grade boundaries used to PREDICT the upcoming series.
 *
 * Source (AQA A-Level Economics 7136, /240):
 *   https://www.savemyexams.com/learning-hub/grade-boundaries/a-level/aqa/economics/
 *   (Originally published by AQA — https://www.aqa.org.uk/exams-administration/results-days/grade-boundaries/archive)
 *
 * We use these to predict next-series boundaries via an exponentially
 * weighted average of the most recent years (recent years count more,
 * because exams have trended slightly more lenient post-2022). We also
 * compute the standard deviation so the Grade Calculator can show an
 * uncertainty band on the projected grade.
 */

export type HistoricalGrade = "A*" | "A" | "B" | "C" | "D" | "E";

export interface HistoricalRow {
  year: number;
  max: number;
  boundaries: Record<HistoricalGrade, number>;
}

export interface PredictedBoundaries {
  max: number;
  /** Weighted-average predicted boundary marks for the next series. */
  predicted: Record<HistoricalGrade, number>;
  /** ±1σ uncertainty (marks) for each grade based on historical variance. */
  stdDev: Record<HistoricalGrade, number>;
  /** History used to build the prediction (ordered oldest → newest). */
  history: HistoricalRow[];
  /** Years included in the weighted fit. */
  yearsUsed: number[];
  /** Human-readable methodology string for the UI. */
  method: string;
}

/* ─────────────────────────── AQA A-Level (7136) ─────────────────────────── */

export const AQA_A_LEVEL_HISTORY: HistoricalRow[] = [
  { year: 2017, max: 240, boundaries: { "A*": 193, A: 167, B: 144, C: 121, D: 99, E: 77 } },
  { year: 2018, max: 240, boundaries: { "A*": 188, A: 163, B: 140, C: 117, D: 94, E: 72 } },
  { year: 2019, max: 240, boundaries: { "A*": 191, A: 164, B: 140, C: 116, D: 92, E: 69 } },
  { year: 2020, max: 240, boundaries: { "A*": 184, A: 156, B: 132, C: 108, D: 85, E: 62 } },
  // 2021 — Teacher-Assessed Grades, no formal boundaries published; excluded.
  { year: 2022, max: 240, boundaries: { "A*": 175, A: 151, B: 125, C: 100, D: 75, E: 50 } },
  { year: 2023, max: 240, boundaries: { "A*": 182, A: 156, B: 132, C: 108, D: 85, E: 62 } },
  { year: 2024, max: 240, boundaries: { "A*": 173, A: 149, B: 127, C: 105, D: 83, E: 61 } },
  { year: 2025, max: 240, boundaries: { "A*": 177, A: 153, B: 130, C: 107, D: 84, E: 61 } },
];

const GRADES: HistoricalGrade[] = ["A*", "A", "B", "C", "D", "E"];

/**
 * Exponentially-weighted prediction of next-series boundaries.
 *
 * Weights decay by `lambda` per year going backwards from the most recent.
 * `lambda=0.7` means each older year contributes 70% as much as the next.
 * This biases the prediction toward the recent (post-pandemic) regime
 * while still anchoring on long-run history.
 */
export function predictFromHistory(
  history: HistoricalRow[],
  opts: { lambda?: number; lookback?: number } = {},
): PredictedBoundaries {
  const lambda = opts.lambda ?? 0.7;
  const lookback = opts.lookback ?? 6; // last 6 published series

  const recent = [...history].sort((a, b) => a.year - b.year).slice(-lookback);
  const max = recent[recent.length - 1].max;

  // Newest year gets weight 1, previous 1*lambda, etc.
  const weights = recent.map((_, i) => Math.pow(lambda, recent.length - 1 - i));
  const wSum = weights.reduce((a, b) => a + b, 0);

  const predicted = {} as Record<HistoricalGrade, number>;
  const stdDev = {} as Record<HistoricalGrade, number>;

  for (const g of GRADES) {
    const vals = recent.map((r) => r.boundaries[g]);
    const mean = vals.reduce((acc, v, i) => acc + v * weights[i], 0) / wSum;
    const variance =
      vals.reduce((acc, v, i) => acc + weights[i] * (v - mean) ** 2, 0) / wSum;
    predicted[g] = Math.round(mean);
    stdDev[g] = Math.round(Math.sqrt(variance) * 10) / 10;
  }

  return {
    max,
    predicted,
    stdDev,
    history: recent,
    yearsUsed: recent.map((r) => r.year),
    method:
      `Exponentially-weighted average of the last ${recent.length} published series ` +
      `(λ=${lambda}). Recent years are weighted more heavily because boundaries ` +
      `have trended lower since 2022.`,
  };
}

export const AQA_A_LEVEL_PREDICTION = predictFromHistory(AQA_A_LEVEL_HISTORY);

/** Pro-rata a /240 full-qualification boundary set to the 3-paper split (80+80+80). */
export function proRataToPapers(
  totalBoundaries: Record<HistoricalGrade, number>,
  paperMaxSum: number,
  fullMax: number,
): Record<HistoricalGrade, number> {
  const ratio = paperMaxSum / fullMax;
  const out = {} as Record<HistoricalGrade, number>;
  for (const g of GRADES) out[g] = Math.round(totalBoundaries[g] * ratio);
  return out;
}
