import { motion } from "framer-motion";
import { CheckCircle2, Star, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BoardConfig, Grade, PredictionResult } from "@/lib/gradeCalculator";

interface Props {
  prediction: PredictionResult;
  config: BoardConfig;
}

function probabilityFor(risk: PredictionResult["risk"], kind: "likely" | "stretch" | "risk") {
  // Coarse, honest probability bands — not a guarantee.
  if (kind === "likely") return risk === "low" ? 78 : risk === "medium" ? 62 : 48;
  if (kind === "stretch") return risk === "low" ? 42 : risk === "medium" ? 28 : 16;
  return risk === "low" ? 18 : risk === "medium" ? 32 : 48;
}

function p3RangeFor(needed: number, p3Max: number, kind: "likely" | "stretch" | "risk") {
  if (needed < 0) return "out of reach";
  if (kind === "stretch") {
    const lo = Math.min(p3Max, needed);
    const hi = Math.min(p3Max, needed + Math.round(p3Max * 0.15));
    return `${lo}–${hi}/${p3Max}`;
  }
  if (kind === "risk") {
    const hi = Math.max(0, needed - 1);
    const lo = Math.max(0, hi - Math.round(p3Max * 0.15));
    return `${lo}–${hi}/${p3Max}`;
  }
  const lo = Math.max(0, needed - Math.round(p3Max * 0.06));
  const hi = Math.min(p3Max, needed + Math.round(p3Max * 0.06));
  return `${lo}–${hi}/${p3Max}`;
}

export function ProbabilityBands({ prediction, config }: Props) {
  const p3Max = config.paperMax[2];
  const grades = config.grades;
  const likelyIdx = grades.indexOf(prediction.likelyGrade);
  const stretchGrade = (likelyIdx > 0 ? grades[likelyIdx - 1] : prediction.likelyGrade) as Grade;
  const riskGrade = (likelyIdx < grades.length - 1 ? grades[likelyIdx + 1] : prediction.likelyGrade) as Grade;

  const bands = [
    {
      key: "likely",
      label: "Likely",
      grade: prediction.likelyGrade,
      icon: CheckCircle2,
      color: "text-emerald-400",
      ring: "border-emerald-500/30 bg-emerald-500/5",
      prob: probabilityFor(prediction.risk, "likely"),
      range: p3RangeFor(prediction.p3RequiredByGrade[prediction.likelyGrade] ?? 0, p3Max, "likely"),
    },
    {
      key: "stretch",
      label: "Stretch",
      grade: stretchGrade,
      icon: Star,
      color: "text-primary",
      ring: "border-primary/30 bg-primary/5",
      prob: probabilityFor(prediction.risk, "stretch"),
      range: p3RangeFor(prediction.p3RequiredByGrade[stretchGrade] ?? 0, p3Max, "stretch"),
    },
    {
      key: "risk",
      label: "Risk",
      grade: riskGrade,
      icon: AlertTriangle,
      color: "text-amber-400",
      ring: "border-amber-500/30 bg-amber-500/5",
      prob: probabilityFor(prediction.risk, "risk"),
      range: p3RangeFor(prediction.p3RequiredByGrade[riskGrade] ?? 0, p3Max, "risk"),
    },
  ] as const;

  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {bands.map((b, i) => {
        const Icon = b.icon;
        return (
          <motion.div
            key={b.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={cn("rounded-2xl border p-4", b.ring)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={cn("h-4 w-4", b.color)} />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                {b.label}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className={cn("font-mono text-2xl font-bold", b.color)}>{b.grade}</span>
              <span className="font-mono text-xs text-muted-foreground">~{b.prob}%</span>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">
              Paper 3: <span className="font-mono text-foreground">{b.range}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
