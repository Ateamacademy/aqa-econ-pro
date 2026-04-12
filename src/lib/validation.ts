import type { Rubric } from "./rubrics";

export interface RequirementResult {
  id: string;
  requirement: string;
  marksAwarded: number;
  marksAvailable: number;
  status: "met" | "partial" | "missing" | "incorrect";
  evidence: string;
  examinerNote: string;
}

export interface AOScore {
  score: number;
  outOf: number;
  comment: string;
}

export interface MarkingResult {
  totalAwarded: number;
  totalPossible: number;
  level: 1 | 2 | 3 | 4;
  levelJustification: string;
  requirementBreakdown: RequirementResult[];
  writtenExplanation: {
    ao1: AOScore;
    ao2: AOScore;
    ao3: AOScore;
    ao4: AOScore | null;
  };
  strengths: string[];
  improvements: string[];
  modelImprovement: string;
  nextSteps: string[];
}

export interface SynthesisResult {
  overallGrade: "A*" | "A" | "B" | "C" | "D" | "E" | "U";
  overallPercentage: number;
  totalAwarded: number;
  totalPossible: number;
  gradeBoundaryContext: string;
  aoBreakdown: { ao1: number; ao2: number; ao3: number; ao4: number };
  themesWeakest: string[];
  themesStrongest: string[];
  examTechniqueFeedback: string;
  personalisedStudyPlan: Array<{ week: number; focus: string; resources: string[] }>;
}

/**
 * Validate that mark totals are internally consistent.
 * Returns null if valid, or a warning string if mismatch.
 */
export function validateMarks(result: MarkingResult, rubric: Rubric): string | null {
  const reqTotal = result.requirementBreakdown.reduce((s, r) => s + r.marksAwarded, 0);
  const aoTotal =
    (result.writtenExplanation.ao1?.score ?? 0) +
    (result.writtenExplanation.ao2?.score ?? 0) +
    (result.writtenExplanation.ao3?.score ?? 0) +
    (result.writtenExplanation.ao4?.score ?? 0);

  // For diagram questions, total should roughly equal req marks (AO may overlap)
  // For essay questions, total should roughly equal AO sum
  const computedTotal = rubric.questionType === "diagram" ? reqTotal : aoTotal;

  if (Math.abs(result.totalAwarded - computedTotal) > 0.5) {
    return `Mark mismatch: total awarded (${result.totalAwarded}) ≠ computed sum (${computedTotal}). Marking re-check recommended.`;
  }

  if (result.totalAwarded > result.totalPossible) {
    return `Total awarded (${result.totalAwarded}) exceeds total possible (${result.totalPossible}).`;
  }

  return null;
}

/**
 * Cap enforcement: if diagram axes are unlabelled, cap at Level 2.
 */
export function enforceAxesCap(result: MarkingResult, rubric: Rubric): MarkingResult {
  if (!rubric.diagramRequirements) return result;

  const axesReq = result.requirementBreakdown.find(
    (r) => r.requirement.toLowerCase().includes("axes") && (r.status === "missing" || r.status === "incorrect")
  );

  if (axesReq && result.level > 2) {
    const level2Max = rubric.levels.find((l) => l.level === 2)?.markRange[1] ?? result.totalAwarded;
    return {
      ...result,
      level: 2,
      levelJustification: `${result.levelJustification} [CAPPED at Level 2: diagram axes unlabelled/incorrect]`,
      totalAwarded: Math.min(result.totalAwarded, level2Max),
    };
  }

  return result;
}

/**
 * Parse Claude's JSON response defensively.
 */
export function parseMarkingJSON(raw: string): MarkingResult {
  // Strip markdown fences
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  return JSON.parse(cleaned) as MarkingResult;
}

export function parseSynthesisJSON(raw: string): SynthesisResult {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  return JSON.parse(cleaned) as SynthesisResult;
}
