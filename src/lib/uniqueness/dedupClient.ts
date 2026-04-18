import { supabase } from "@/integrations/supabase/client";
import { UNIQUENESS_CONFIG } from "../uniqueness-config";
import { jaccard, cosine } from "./similarity";
import type { QuestionFingerprint } from "./fingerprint";

export type DuplicateMatch = {
  candidateId: string;
  candidatePaperCode: string;
  candidateSetLabel: string;
  candidateQuestionNumber: string;
  jaccardScore: number;
  cosineScore: number;
  reason: "text" | "scenario" | "mcq";
};

export type DedupCheckResult = {
  isDuplicate: boolean;
  match?: DuplicateMatch;
};

/**
 * Check a single fingerprint against existing fingerprints in Supabase.
 * Scoped to same paper_code, section, marks (cross-paper overlap is allowed).
 */
export async function checkFingerprintForDuplicates(
  fp: QuestionFingerprint,
): Promise<DedupCheckResult> {
  // 1. MCQ-specific check (Paper 3)
  if (fp.mcqConcept && fp.mcqAnswerValue) {
    const { data: mcqHits } = await supabase
      .from("question_fingerprints")
      .select("id, paper_code, set_label, question_number, mcq_concept, mcq_answer_value")
      .eq("paper_code", fp.paperCode)
      .eq("mcq_concept", fp.mcqConcept)
      .eq("mcq_answer_value", fp.mcqAnswerValue)
      .limit(1);
    if (mcqHits && mcqHits.length > 0) {
      const m = mcqHits[0];
      return {
        isDuplicate: true,
        match: {
          candidateId: m.id,
          candidatePaperCode: m.paper_code,
          candidateSetLabel: m.set_label,
          candidateQuestionNumber: m.question_number,
          jaccardScore: 1,
          cosineScore: 1,
          reason: "mcq",
        },
      };
    }
  }

  // 2. Scenario-key check (Section A contexts)
  if (fp.scenarioKey) {
    const { data: scenarioHits } = await supabase
      .from("question_fingerprints")
      .select("id, paper_code, set_label, question_number, scenario_key")
      .eq("paper_code", fp.paperCode)
      .eq("scenario_key", fp.scenarioKey)
      .limit(1);
    if (scenarioHits && scenarioHits.length > 0) {
      const m = scenarioHits[0];
      return {
        isDuplicate: true,
        match: {
          candidateId: m.id,
          candidatePaperCode: m.paper_code,
          candidateSetLabel: m.set_label,
          candidateQuestionNumber: m.question_number,
          jaccardScore: 1,
          cosineScore: 1,
          reason: "scenario",
        },
      };
    }
  }

  // 3. Text similarity check on candidates with same paper / section / marks
  const { data: candidates } = await supabase
    .from("question_fingerprints")
    .select("id, paper_code, set_label, question_number, token_set, semantic_core")
    .eq("paper_code", fp.paperCode)
    .eq("section", fp.section)
    .eq("marks", fp.marks);

  if (!candidates || candidates.length === 0) return { isDuplicate: false };

  for (const c of candidates) {
    const j = jaccard(fp.tokenSet, c.token_set ?? []);
    const k = cosine(fp.semanticCore, c.semantic_core ?? "");
    if (j >= UNIQUENESS_CONFIG.jaccardThreshold || k >= UNIQUENESS_CONFIG.cosineThreshold) {
      return {
        isDuplicate: true,
        match: {
          candidateId: c.id,
          candidatePaperCode: c.paper_code,
          candidateSetLabel: c.set_label,
          candidateQuestionNumber: c.question_number,
          jaccardScore: j,
          cosineScore: k,
          reason: "text",
        },
      };
    }
  }

  return { isDuplicate: false };
}

/** Within-paper dedup: compare fingerprints in the same paper against each other. */
export function checkWithinPaper(fps: QuestionFingerprint[]): DuplicateMatch | null {
  for (let i = 0; i < fps.length; i++) {
    for (let j = i + 1; j < fps.length; j++) {
      const a = fps[i];
      const b = fps[j];
      if (a.section !== b.section || a.marks !== b.marks) continue;
      const jac = jaccard(a.tokenSet, b.tokenSet);
      const cos = cosine(a.semanticCore, b.semanticCore);
      if (jac >= UNIQUENESS_CONFIG.jaccardThreshold || cos >= UNIQUENESS_CONFIG.cosineThreshold) {
        return {
          candidateId: `local-${i}`,
          candidatePaperCode: a.paperCode,
          candidateSetLabel: a.setLabel,
          candidateQuestionNumber: a.questionNumber,
          jaccardScore: jac,
          cosineScore: cos,
          reason: "text",
        };
      }
    }
  }
  return null;
}

/** Persist fingerprints for a paper after it passes dedup. */
export async function saveFingerprints(
  fps: QuestionFingerprint[],
  paperId?: string,
): Promise<{ saved: number; error?: string }> {
  if (fps.length === 0) return { saved: 0 };
  const rows = fps.map((fp) => ({
    paper_id: paperId ?? null,
    paper_code: fp.paperCode,
    set_label: fp.setLabel,
    section: fp.section,
    marks: fp.marks,
    question_number: fp.questionNumber,
    normalised_text: fp.normalisedText,
    token_set: fp.tokenSet,
    semantic_core: fp.semanticCore,
    scenario_key: fp.scenarioKey ?? null,
    mcq_concept: fp.mcqConcept ?? null,
    mcq_answer_value: fp.mcqAnswerValue ?? null,
  }));
  const { error } = await supabase.from("question_fingerprints").insert(rows);
  if (error) return { saved: 0, error: error.message };
  return { saved: rows.length };
}

/** Fetch the top N most-similar existing questions to use as negative examples. */
export async function fetchNegativeExamples(
  paperCode: string,
  limit = UNIQUENESS_CONFIG.negativeExamplesCount,
): Promise<{ questionNumber: string; setLabel: string; semanticCore: string; scenarioKey?: string }[]> {
  const { data } = await supabase
    .from("question_fingerprints")
    .select("question_number, set_label, semantic_core, scenario_key")
    .eq("paper_code", paperCode)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []).map((d) => ({
    questionNumber: d.question_number,
    setLabel: d.set_label,
    semanticCore: d.semantic_core,
    scenarioKey: d.scenario_key ?? undefined,
  }));
}

/** Coverage stats for the scenario-exhaustion warning. */
export async function getScenarioCoverage(
  paperCode: string,
): Promise<{ used: number; pool: number; ratio: number; exhausted: boolean }> {
  const pool = UNIQUENESS_CONFIG.estimatedPools[paperCode]?.scenarios ?? 20;
  const isMcqPaper = paperCode.endsWith("/3");
  const column = isMcqPaper ? "mcq_concept" : "scenario_key";
  const { data } = await supabase
    .from("question_fingerprints")
    .select(column)
    .eq("paper_code", paperCode)
    .not(column, "is", null);
  const distinct = new Set((data ?? []).map((r: Record<string, unknown>) => r[column] as string));
  const used = distinct.size;
  const ratio = used / pool;
  return {
    used,
    pool,
    ratio,
    exhausted: ratio >= UNIQUENESS_CONFIG.scenarioExhaustionWarning,
  };
}
