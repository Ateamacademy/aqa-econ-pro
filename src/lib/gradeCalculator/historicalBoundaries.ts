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

/* ─────────────────────────── Edexcel A A-Level (9EC0) ─────────────────────────── */
/**
 * Source: savemyexams.com (originally Pearson Edexcel boundary archive).
 * Full qualification, /335 (papers 1+2+3, 9EC0 01/02/03).
 */
export const EDEXCEL_A_LEVEL_HISTORY: HistoricalRow[] = [
  { year: 2022, max: 335, boundaries: { "A*": 262, A: 235, B: 199, C: 163, D: 127, E: 92 } },
  { year: 2023, max: 335, boundaries: { "A*": 273, A: 245, B: 211, C: 177, D: 143, E: 110 } },
  { year: 2024, max: 335, boundaries: { "A*": 278, A: 251, B: 216, C: 181, D: 146, E: 112 } },
  { year: 2025, max: 335, boundaries: { "A*": 287, A: 262, B: 227, C: 192, D: 158, E: 124 } },
];

export const EDEXCEL_A_LEVEL_PREDICTION = predictFromHistory(EDEXCEL_A_LEVEL_HISTORY);

/* ─────────────────────────── Edexcel B A-Level (9EB0) ─────────────────────────── */
/**
 * Source: savemyexams.com (originally Pearson Edexcel boundary archive).
 * Full qualification, /335 (papers 1+2+3, 9EB0 01/02/03).
 */
export const EDEXCEL_B_A_LEVEL_HISTORY: HistoricalRow[] = [
  { year: 2022, max: 335, boundaries: { "A*": 197, A: 171, B: 143, C: 115, D: 87, E: 60 } },
  { year: 2023, max: 335, boundaries: { "A*": 219, A: 189, B: 161, C: 134, D: 107, E: 80 } },
  { year: 2024, max: 335, boundaries: { "A*": 221, A: 192, B: 164, C: 136, D: 108, E: 81 } },
  { year: 2025, max: 335, boundaries: { "A*": 224, A: 195, B: 169, C: 143, D: 118, E: 93 } },
];

export const EDEXCEL_B_A_LEVEL_PREDICTION = predictFromHistory(EDEXCEL_B_A_LEVEL_HISTORY);

/** Pro-rata a full-qualification boundary set to a different paper-total scale. */
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
