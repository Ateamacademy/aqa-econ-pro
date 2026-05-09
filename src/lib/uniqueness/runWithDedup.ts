import type { GeneratedPaper } from "@/lib/aqa-spec";
import { generateAqaPaper, type GenerateOptions } from "@/lib/aqaPaperGenerator";
import {
  buildFingerprint,
  checkFingerprintForDuplicates,
  checkWithinPaper,
  saveFingerprints,
  type QuestionFingerprint,
  type DuplicateMatch,
} from "@/lib/uniqueness";
import { UNIQUENESS_CONFIG } from "@/lib/uniqueness-config";

export type ProgressEvent =
  | { type: "section"; label: string }
  | { type: "question-ok"; questionNumber: string }
  | { type: "question-retry"; questionNumber: string; attempt: number; reason: string }
  | { type: "saving" }
  | { type: "saved" }
  | { type: "rejected"; error: string };

export type GenerateWithDedupResult = {
  paper: GeneratedPaper;
  events: ProgressEvent[];
  fingerprintsSaved: number;
};

/** Convert a GeneratedPaper into per-question fingerprints. */
function fingerprintPaper(paper: GeneratedPaper, setLabel: string): QuestionFingerprint[] {
  const fps: QuestionFingerprint[] = [];
  // Section A scenario text comes from extracts (concat title + body).
  const scenarioText = (paper.extracts ?? [])
    .map((e) => `${e.title ?? ""} ${e.body ?? ""}`)
    .join(" ");

  for (const q of paper.questions ?? []) {
    fps.push(
      buildFingerprint({
        paperCode: paper.paperCode,
        setLabel,
        section: q.section ?? "A",
        marks: q.marks,
        questionNumber: String(q.number).padStart(2, "0"),
        text: q.prompt ?? "",
        scenarioText: q.section === "A" ? scenarioText : undefined,
        mcqConcept: q.mcqOptions ? `mcq-${q.number}` : undefined,
        mcqAnswerValue: q.mcqAnswer,
      }),
    );
  }
  return fps;
}

/**
 * Generate an AQA paper, run within-paper + cross-set dedup, retry up to N times,
 * then persist fingerprints. Emits progress events via onProgress.
 */
export async function generateWithDedup(
  opts: GenerateOptions,
  onProgress?: (e: ProgressEvent) => void,
): Promise<GenerateWithDedupResult> {
  const events: ProgressEvent[] = [];
  const emit = (e: ProgressEvent) => {
    events.push(e);
    onProgress?.(e);
  };

  let lastPaper: GeneratedPaper | null = null;
  let attempts = 0;

  while (attempts < UNIQUENESS_CONFIG.maxRegenerationAttempts) {
    attempts++;
    emit({ type: "section", label: `Generating paper (attempt ${attempts})…` });
    const paper = generateAqaPaper(opts);
    lastPaper = paper;

    const fps = fingerprintPaper(paper, opts.practiceSetLabel);

    // 1. Within-paper duplicates
    const within = checkWithinPaper(fps);
    if (within) {
      emit({
        type: "question-retry",
        questionNumber: within.candidateQuestionNumber,
        attempt: attempts,
        reason: `within-paper duplicate (Jaccard ${within.jaccardScore.toFixed(2)})`,
      });
      continue;
    }

    // 2. Cross-set duplicates
    let crossDup: DuplicateMatch | null = null;
    let dupQuestionNumber = "";
    for (const fp of fps) {
      const result = await checkFingerprintForDuplicates(fp);
      if (result.isDuplicate && result.match) {
        crossDup = result.match;
        dupQuestionNumber = fp.questionNumber;
        break;
      }
    }
    if (crossDup) {
      emit({
        type: "question-retry",
        questionNumber: dupQuestionNumber,
        attempt: attempts,
        reason: `matches Set ${crossDup.candidateSetLabel} Q${crossDup.candidateQuestionNumber} (${crossDup.reason})`,
      });
      continue;
    }

    // ✅ Passed all checks · persist
    for (const fp of fps) emit({ type: "question-ok", questionNumber: fp.questionNumber });
    emit({ type: "saving" });
    const saved = await saveFingerprints(fps, paper.id);
    emit({ type: "saved" });
    return { paper, events, fingerprintsSaved: saved.saved };
  }

  // Out of retries
  const err = `Could not produce a unique paper after ${UNIQUENESS_CONFIG.maxRegenerationAttempts} attempts. Try a different topic focus.`;
  emit({ type: "rejected", error: err });
  if (lastPaper) {
    return { paper: { ...lastPaper, status: "rejected" as never }, events, fingerprintsSaved: 0 };
  }
  throw new Error(err);
}
