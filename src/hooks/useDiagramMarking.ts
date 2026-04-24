import { useState, useCallback } from "react";
import { markDiagram, type DiagramMarkingInput } from "@/lib/markDiagram";
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
  imageBase64?: string;
  imageSrc?: string;
  scenarioRubric?: DiagramMarkingInput["scenarioRubric"];
  scenarioRubricPrompt?: string;
}

export function useDiagramMarking() {
  const [isMarking, setIsMarking] = useState(false);
  const [result, setResult] = useState<DiagramMarkingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const markDiagramCall = useCallback(async (params: MarkDiagramParams) => {
    setIsMarking(true);
    setError(null);
    setResult(null);

    try {
      const data = await markDiagram(params as DiagramMarkingInput);
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

  return { markDiagram: markDiagramCall, isMarking, result, error, reset };
}
