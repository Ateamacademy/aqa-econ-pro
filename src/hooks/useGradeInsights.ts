import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PredictionResult } from "@/lib/gradeCalculator";

interface Params {
  qualification: string;
  board: string;
  targetGrade: string;
  confidence: string;
  paper1: number;
  paper2: number;
  paper1Max: number;
  paper2Max: number;
  paper3Max: number;
  prediction: PredictionResult;
  enabled: boolean;
}

export interface Insights {
  summary: string;
  reassurance: string;
  strategy: string;
  priorities: string[];
  rescuePlan?: string;
}

export function useGradeInsights(p: Params) {
  const key = [
    "grade-insights",
    p.qualification, p.board, p.targetGrade, p.confidence,
    p.paper1, p.paper2,
    p.prediction.likelyGrade, p.prediction.p3RequiredForTarget,
  ];

  return useQuery<Insights>({
    queryKey: key,
    enabled: p.enabled,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("grade-calculator-insights", {
        body: {
          qualification: p.qualification,
          board: p.board,
          targetGrade: p.targetGrade,
          confidence: p.confidence,
          paper1: p.paper1,
          paper2: p.paper2,
          paper1Max: p.paper1Max,
          paper2Max: p.paper2Max,
          paper3Max: p.paper3Max,
          likelyGrade: p.prediction.likelyGrade,
          optimisticGrade: p.prediction.optimisticGrade,
          worstCaseGrade: p.prediction.worstCaseGrade,
          p3RequiredForTarget: p.prediction.p3RequiredForTarget,
          onTrack: p.prediction.onTrack,
          risk: p.prediction.risk,
        },
      });
      if (error) throw error;
      return {
        summary: data?.summary ?? "",
        reassurance: data?.reassurance ?? "",
        strategy: data?.strategy ?? "",
        priorities: Array.isArray(data?.priorities) ? data.priorities : [],
        rescuePlan: data?.rescuePlan || undefined,
      };
    },
  });
}
