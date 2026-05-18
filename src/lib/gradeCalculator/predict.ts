import type { Confidence, Grade, PredictionInput, PredictionResult } from "./types";

const CONFIDENCE_BAND: Record<Confidence, number> = {
  very: 0.04,      // ±4% of paper total
  somewhat: 0.08,
  unsure: 0.12,
  worst: 0.16,
};

const CONFIDENCE_SCORE: Record<Confidence, number> = {
  very: 90,
  somewhat: 70,
  unsure: 50,
  worst: 30,
};

function gradeFromTotal(total: number, boundaries: Record<string, number>, grades: Grade[]): Grade {
  for (const g of grades) {
    if (total >= (boundaries[g] ?? Infinity)) return g;
  }
  return grades[grades.length - 1] === "E" ? ("U" as Grade) : ("U" as Grade);
}

function gradeIndex(grade: Grade, grades: Grade[]) {
  return grades.indexOf(grade);
}

export function predictGrade(input: PredictionInput): PredictionResult {
  const { config, paper1, paper2, confidence, targetGrade, paper3Override } = input;
  const [p1Max, p2Max, p3Max] = config.paperMax;
  const totalMax = p1Max + p2Max + p3Max;

  const p1 = Math.max(0, Math.min(paper1, p1Max));
  const p2 = Math.max(0, Math.min(paper2, p2Max));

  // For current projection (before Paper 3), assume an average of the percent
  // achieved on P1+P2 carried into P3, unless an override is provided.
  const p12Total = p1 + p2;
  const p12Max = p1Max + p2Max;
  const p12Pct = p12Max > 0 ? p12Total / p12Max : 0;

  const p3Assumed = paper3Override != null ? Math.max(0, Math.min(paper3Override, p3Max)) : p12Pct * p3Max;
  const total = p12Total + p3Assumed;
  const percent = totalMax > 0 ? (total / totalMax) * 100 : 0;

  // Band: widen by confidence × paper total
  const band = CONFIDENCE_BAND[confidence] * totalMax;

  const likelyGrade = gradeFromTotal(total, config.boundaries, config.grades);
  const optimisticGrade = gradeFromTotal(Math.min(totalMax, total + band), config.boundaries, config.grades);
  const worstCaseGrade = gradeFromTotal(Math.max(0, total - band), config.boundaries, config.grades);

  // Paper 3 required for each grade
  const p3RequiredByGrade: Record<string, number> = {};
  for (const g of config.grades) {
    const need = (config.boundaries[g] ?? 0) - p12Total;
    if (need <= 0) p3RequiredByGrade[g] = 0;
    else if (need > p3Max) p3RequiredByGrade[g] = -1;
    else p3RequiredByGrade[g] = Math.ceil(need);
  }
  const p3RequiredForTarget = p3RequiredByGrade[targetGrade] ?? -1;

  const targetIdx = gradeIndex(targetGrade, config.grades);
  const likelyIdx = gradeIndex(likelyGrade, config.grades);
  const gapToTarget = targetIdx - likelyIdx; // negative means above target
  const onTrack = likelyIdx <= targetIdx;

  let risk: PredictionResult["risk"] = "low";
  if (p3RequiredForTarget === -1) risk = "high";
  else if (p3RequiredForTarget > p3Max * 0.85) risk = "high";
  else if (p3RequiredForTarget > p3Max * 0.65) risk = "medium";

  return {
    total: Math.round(total),
    totalMax,
    percent: Math.round(percent * 10) / 10,
    likelyGrade,
    optimisticGrade,
    worstCaseGrade,
    p3RequiredByGrade,
    p3RequiredForTarget,
    confidenceScore: CONFIDENCE_SCORE[confidence],
    risk,
    gapToTarget,
    onTrack,
  };
}
