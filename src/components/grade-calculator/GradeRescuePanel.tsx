import { motion } from "framer-motion";
import { LifeBuoy } from "lucide-react";
import type { Grade, PredictionResult } from "@/lib/gradeCalculator";

interface Props {
  prediction: PredictionResult;
  targetGrade: Grade;
  p3Max: number;
  rescueText?: string;
  finalPaperLabel?: string;
}

export function GradeRescuePanel({ prediction, targetGrade, p3Max, rescueText, finalPaperLabel = "Paper 3" }: Props) {
  if (prediction.onTrack) return null;
  const need = prediction.p3RequiredForTarget;
  const impossible = need === -1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-destructive/30 bg-gradient-to-br from-destructive/10 to-card p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <LifeBuoy className="h-5 w-5 text-destructive" />
        <h3 className="text-sm font-semibold text-foreground">Grade Rescue Plan</h3>
      </div>
      <p className="text-sm text-foreground mb-3">
        You're currently projecting <span className="font-mono font-bold">{prediction.likelyGrade}</span>{" "}
        against a target of <span className="font-mono font-bold text-primary">{targetGrade}</span>.
      </p>
      {impossible ? (
        <p className="text-sm text-muted-foreground">
          A {targetGrade} is not mathematically reachable from {finalPaperLabel} alone. Focus on maximising your {finalPaperLabel} score —
          aim for the next achievable boundary up.
        </p>
      ) : (
        <p className="text-sm text-foreground">
          A <span className="font-mono font-bold text-primary">{targetGrade}</span> remains achievable with
          approximately <span className="font-mono font-bold">{need}/{p3Max}</span> on {finalPaperLabel}.
        </p>
      )}
      {rescueText && (
        <p className="mt-3 text-sm text-muted-foreground italic border-t border-border pt-3">{rescueText}</p>
      )}
    </motion.div>
  );
}
