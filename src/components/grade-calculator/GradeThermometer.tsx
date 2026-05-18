import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Grade, PredictionResult } from "@/lib/gradeCalculator";

interface Props {
  prediction: PredictionResult;
  targetGrade: Grade;
  grades: Grade[];
}

export function GradeThermometer({ prediction, targetGrade, grades }: Props) {
  const pct = Math.max(2, Math.min(100, prediction.percent));
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Projected grade</h3>
        <span className="font-mono text-3xl font-bold text-primary">{prediction.likelyGrade}</span>
      </div>
      <div className="relative h-4 rounded-full bg-popover overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-pop shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2">
        {grades.slice().reverse().map((g) => (
          <span key={g} className={cn(g === targetGrade && "text-primary font-bold")}>{g}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Worst</div>
          <div className="font-mono text-lg text-foreground">{prediction.worstCaseGrade}</div>
        </div>
        <div className="border-x border-border">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Likely</div>
          <div className="font-mono text-lg text-primary font-bold">{prediction.likelyGrade}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Stretch</div>
          <div className="font-mono text-lg text-foreground">{prediction.optimisticGrade}</div>
        </div>
      </div>
    </div>
  );
}
