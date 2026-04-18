import { useCallback, useState } from "react";
import {
  callAiMarking,
  type AiAnalysis,
  type AiMarkingError,
  type AiMarkingPayload,
  type AiMarkingResult,
} from "@/lib/aiMarking";

export interface AiMarkingState {
  status: "idle" | "loading" | "done" | "error";
  analysis?: AiAnalysis;
  error?: AiMarkingError;
  retryAfterSec?: number;
  cached?: boolean;
}

function toState(r: AiMarkingResult): AiMarkingState {
  if (r.ok) return { status: "done", analysis: r.analysis, cached: r.cached };
  return { status: "error", error: r.error, retryAfterSec: r.retryAfterSec };
}

/**
 * Manages a map of question-id → AI marking state. Used by the marking report
 * to run analyses in parallel across all extended-response (and diagram)
 * questions when the student opts in.
 */
export function useAiMarking() {
  const [byQuestion, setByQuestion] = useState<Record<string, AiMarkingState>>({});
  const [isRunning, setIsRunning] = useState(false);

  const runOne = useCallback(async (payload: AiMarkingPayload) => {
    setByQuestion((p) => ({ ...p, [payload.questionId]: { status: "loading" } }));
    const result = await callAiMarking(payload);
    setByQuestion((p) => ({ ...p, [payload.questionId]: toState(result) }));
    return result;
  }, []);

  const runMany = useCallback(async (payloads: AiMarkingPayload[]) => {
    setIsRunning(true);
    try {
      setByQuestion((p) => {
        const next = { ...p };
        for (const pl of payloads) next[pl.questionId] = { status: "loading" };
        return next;
      });
      const results = await Promise.all(
        payloads.map((pl) => callAiMarking(pl).then((r) => ({ pl, r }))),
      );
      setByQuestion((p) => {
        const next = { ...p };
        for (const { pl, r } of results) next[pl.questionId] = toState(r);
        return next;
      });
      return results;
    } finally {
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(() => setByQuestion({}), []);

  const globallyUnavailable = Object.values(byQuestion).some(
    (s) => s.status === "error" && s.error === "not_configured",
  );

  return { byQuestion, isRunning, runOne, runMany, reset, globallyUnavailable };
}
