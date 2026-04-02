import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DiagramMarkingResult } from "@/components/diagram-marking/types";

interface MarkDiagramParams {
  question: string;
  studentAnswer: string;
  diagramType: string;
  difficulty: string;
  totalMarks: number;
  board: string;
  answerType: "labels" | "text" | "image";
  scenarioId?: string;
  userId?: string;
}

export function useDiagramMarking() {
  const [isMarking, setIsMarking] = useState(false);
  const [result, setResult] = useState<DiagramMarkingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const markDiagram = useCallback(async (params: MarkDiagramParams) => {
    setIsMarking(true);
    setError(null);
    setResult(null);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mark-diagram`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify(params),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Marking failed" }));
        throw new Error(err.error || `Marking failed (${resp.status})`);
      }

      const data: DiagramMarkingResult = await resp.json();
      setResult(data);
      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      return null;
    } finally {
      setIsMarking(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { markDiagram, isMarking, result, error, reset };
}
