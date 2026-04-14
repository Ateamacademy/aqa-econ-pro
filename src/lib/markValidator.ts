/**
 * Post-marking validation and enforcement layer.
 * Runs AFTER Claude returns marks, BEFORE displaying to user.
 */

import type { MarkingResult, RequirementResult } from "./validation";
import type { Rubric } from "./rubrics";
import type { VerificationReport } from "./verification";

export interface ValidationFlags {
  capped: boolean;
  capReason: string | null;
  correctedRequirements: string[];
  recalculated: boolean;
  originalTotal: number;
}

/**
 * Cross-check requirement marks against verification report.
 * Force 0 for requirements where the corresponding feature is absent.
 */
function crossCheckRequirements(
  breakdown: RequirementResult[],
  verification: VerificationReport
): { corrected: RequirementResult[]; corrections: string[] } {
  const corrections: string[] = [];

  const corrected = breakdown.map((req) => {
    if (req.marksAwarded === 0) return req;

    const reqLower = req.requirement.toLowerCase();
    let featurePresent = true;

    // Check axes-related requirements
    if (reqLower.includes("axes") || reqLower.includes("axis")) {
      if (!verification.hasAxes.horizontal && !verification.hasAxes.vertical) {
        featurePresent = false;
      }
    }

    // Check labelling requirements
    if ((reqLower.includes("label") || reqLower.includes("labelled")) && !reqLower.includes("matrix")) {
      if (verification.axesLabels.length === 0 && verification.textElements.length === 0) {
        featurePresent = false;
      }
    }

    // Check curve requirements
    if (reqLower.includes("curve") || reqLower.includes("sloping") || reqLower.includes("drawn")) {
      if (verification.curvesDetected.length === 0 && !reqLower.includes("matrix")) {
        featurePresent = false;
      }
    }

    // Check point labelling requirements
    if (reqLower.includes("equilibrium") || reqLower.includes("qm") || reqLower.includes("wm") || reqLower.includes("qc") || reqLower.includes("wc")) {
      if (verification.pointsLabelled.length === 0 && verification.textElements.length === 0) {
        featurePresent = false;
      }
    }

    if (!featurePresent) {
      corrections.push(`${req.id}: "${req.requirement}" — feature not detected in verification, marks forced to 0`);
      return { ...req, marksAwarded: 0, status: "missing" as const, examinerNote: `${req.examinerNote} [CORRECTED: feature not verified in diagram]` };
    }

    return req;
  });

  return { corrected, corrections };
}

/**
 * Apply hard caps based on verification completeness and ink ratio.
 */
function applyHardCaps(
  totalAwarded: number,
  totalMarks: number,
  verification: VerificationReport,
  inkRatio: number
): { cappedTotal: number; capReason: string | null } {
  if (verification.completeness === "empty" || verification.isBlank) {
    return { cappedTotal: 0, capReason: "Diagram verified as empty — score set to 0." };
  }

  if (verification.completeness === "sparse") {
    const cap = Math.min(totalAwarded, 1);
    if (cap < totalAwarded) {
      return { cappedTotal: cap, capReason: "Diagram verified as sparse — maximum 1 mark." };
    }
  }

  if (verification.completeness === "partial") {
    const cap = Math.min(totalAwarded, Math.floor(totalMarks * 0.5));
    if (cap < totalAwarded) {
      return { cappedTotal: cap, capReason: `Diagram verified as partial — capped at ${Math.floor(totalMarks * 0.5)} marks.` };
    }
  }

  if (inkRatio < 0.05) {
    const cap = Math.min(totalAwarded, 1);
    if (cap < totalAwarded) {
      return { cappedTotal: cap, capReason: "Very low ink content — maximum 1 mark." };
    }
  }

  return { cappedTotal: totalAwarded, capReason: null };
}

/**
 * Validate and correct marking results using verification report.
 */
export function validateAndCorrectMarks(
  result: MarkingResult,
  rubric: Rubric,
  verification: VerificationReport | null,
  inkRatio: number,
  writtenWordCount: number
): { result: MarkingResult; flags: ValidationFlags } {
  const flags: ValidationFlags = {
    capped: false,
    capReason: null,
    correctedRequirements: [],
    recalculated: false,
    originalTotal: result.totalAwarded,
  };

  let correctedResult = { ...result };

  // ZERO-CHECK (FIRST validation step): if verification says empty/no curves, force 0
  if (verification) {
    const essentiallyEmpty =
      verification.completeness === "empty" ||
      verification.isBlank ||
      (!verification.hasAxes.horizontal && !verification.hasAxes.vertical) ||
      verification.curvesDetected.length === 0;

    if (essentiallyEmpty || inkRatio < 0.03) {
      flags.capped = true;
      flags.capReason = `OVERRIDE: Marker returned ${result.totalAwarded}/${result.totalPossible}, corrected to 0 because verification detected empty/near-empty diagram.`;
      correctedResult.totalAwarded = 0;
      correctedResult.level = 1;
      correctedResult.levelJustification = flags.capReason;
      correctedResult.requirementBreakdown = correctedResult.requirementBreakdown.map((r) => ({
        ...r,
        marksAwarded: 0,
        status: "missing" as const,
        examinerNote: `${r.examinerNote} [CORRECTED: diagram verified as empty/near-empty]`,
      }));
      correctedResult.writtenExplanation = {
        ao1: { score: 0, outOf: correctedResult.writtenExplanation.ao1.outOf, comment: "No diagram detected — written marks withheld." },
        ao2: { score: 0, outOf: correctedResult.writtenExplanation.ao2.outOf, comment: "No diagram detected — written marks withheld." },
        ao3: { score: 0, outOf: correctedResult.writtenExplanation.ao3.outOf, comment: "No diagram detected — written marks withheld." },
        ao4: correctedResult.writtenExplanation.ao4
          ? { score: 0, outOf: correctedResult.writtenExplanation.ao4.outOf, comment: "No diagram detected — written marks withheld." }
          : null,
      };
      return { result: correctedResult, flags };
    }
  }

  // 1. Cross-check requirements if verification available
  if (verification) {
    const { corrected, corrections } = crossCheckRequirements(result.requirementBreakdown, verification);
    correctedResult.requirementBreakdown = corrected;
    flags.correctedRequirements = corrections;

    // 2. Apply hard caps
    const reqTotal = corrected.reduce((s, r) => s + r.marksAwarded, 0);
    const { cappedTotal, capReason } = applyHardCaps(reqTotal, rubric.totalMarks, verification, inkRatio);

    if (capReason) {
      flags.capped = true;
      flags.capReason = capReason;
      correctedResult.totalAwarded = cappedTotal;

      // Adjust level based on capped total
      if (cappedTotal === 0) {
        correctedResult.level = 1;
        correctedResult.levelJustification = capReason;
      }
    } else {
      correctedResult.totalAwarded = reqTotal;
    }
  }

  // 3. Empty written explanation check
  if (writtenWordCount < 20) {
    const noFeatures = !verification || verification.completeness === "empty" || verification.completeness === "sparse";
    if (noFeatures) {
      correctedResult.writtenExplanation = {
        ao1: { score: 0, outOf: correctedResult.writtenExplanation.ao1.outOf, comment: "Written explanation too brief for any marks." },
        ao2: { score: 0, outOf: correctedResult.writtenExplanation.ao2.outOf, comment: "Written explanation too brief for any marks." },
        ao3: { score: 0, outOf: correctedResult.writtenExplanation.ao3.outOf, comment: "Written explanation too brief for any marks." },
        ao4: correctedResult.writtenExplanation.ao4
          ? { score: 0, outOf: correctedResult.writtenExplanation.ao4.outOf, comment: "Written explanation too brief for any marks." }
          : null,
      };
    }
  }

  // 4. Recompute and check total consistency
  const recomputedReq = correctedResult.requirementBreakdown.reduce((s, r) => s + r.marksAwarded, 0);
  if (Math.abs(correctedResult.totalAwarded - recomputedReq) > 0.5 && !flags.capped) {
    correctedResult.totalAwarded = recomputedReq;
    flags.recalculated = true;
  }

  // Ensure total doesn't exceed possible
  correctedResult.totalAwarded = Math.min(correctedResult.totalAwarded, correctedResult.totalPossible);

  return { result: correctedResult, flags };
}

/**
 * Word count gates for predicted paper sub-questions.
 */
export function checkWordCountGate(wordCount: number, totalMarks: number): { passed: boolean; minWords: number } {
  const gates: Record<number, number> = {
    2: 15, 4: 40, 5: 50, 8: 120, 10: 180, 12: 220, 15: 300, 25: 500,
  };

  // Find the closest gate
  const sortedKeys = Object.keys(gates).map(Number).sort((a, b) => a - b);
  let minWords = 15;
  for (const key of sortedKeys) {
    if (totalMarks >= key) minWords = gates[key];
  }

  return { passed: wordCount >= minWords, minWords };
}

/**
 * Key term gate: if fewer than 50% of key terms appear, cap AO1.
 */
export function checkKeyTermGate(answer: string, keyTerms: string[]): { passed: boolean; found: number; total: number } {
  if (keyTerms.length === 0) return { passed: true, found: 0, total: 0 };

  const answerLower = answer.toLowerCase();
  const found = keyTerms.filter((term) => answerLower.includes(term.toLowerCase())).length;
  const ratio = found / keyTerms.length;

  return { passed: ratio >= 0.5, found, total: keyTerms.length };
}

/**
 * Context engagement gate: if zero contextHooks are referenced, cap AO2.
 */
export function checkContextGate(answer: string, contextHooks: string[]): { passed: boolean; found: number; total: number } {
  if (contextHooks.length === 0) return { passed: true, found: 0, total: 0 };

  const answerLower = answer.toLowerCase();
  const found = contextHooks.filter((hook) => answerLower.includes(hook.toLowerCase())).length;

  return { passed: found > 0, found, total: contextHooks.length };
}

/**
 * Plagiarism/model answer gate using Jaccard similarity on 5-grams.
 */
export function checkPlagiarismGate(answer: string, modelAnswers: string[]): { flagged: boolean; similarity: number } {
  if (modelAnswers.length === 0) return { flagged: false, similarity: 0 };

  function getNGrams(text: string, n: number): Set<string> {
    const words = text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
    const grams = new Set<string>();
    for (let i = 0; i <= words.length - n; i++) {
      grams.add(words.slice(i, i + n).join(" "));
    }
    return grams;
  }

  const answerGrams = getNGrams(answer, 5);
  if (answerGrams.size === 0) return { flagged: false, similarity: 0 };

  let maxSimilarity = 0;
  for (const model of modelAnswers) {
    const modelGrams = getNGrams(model, 5);
    const intersection = new Set([...answerGrams].filter((g) => modelGrams.has(g)));
    const union = new Set([...answerGrams, ...modelGrams]);
    const sim = union.size > 0 ? intersection.size / union.size : 0;
    if (sim > maxSimilarity) maxSimilarity = sim;
  }

  return { flagged: maxSimilarity > 0.7, similarity: maxSimilarity };
}
