import { cn } from "@/lib/utils";
import type { PredictionResult, BoardConfig, Grade } from "@/lib/gradeCalculator";

interface Props {
  prediction: PredictionResult;
  config: BoardConfig;
  targetGrade: Grade;
}

export function Paper3RequirementCard({ prediction, config, targetGrade }: Props) {
  const p3Max = config.paperMax[2];
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Paper 3 marks needed</h3>
      <div className="space-y-2">
        {config.grades.map((g) => {
          const needed = prediction.p3RequiredByGrade[g];
          const impossible = needed === -1;
          const safe = needed === 0;
          const pct = impossible || safe ? (safe ? 0 : 100) : (needed / p3Max) * 100;
          const isTarget = g === targetGrade;
          return (
            <div key={g} className={cn("flex items-center gap-3 rounded-lg p-2", isTarget && "bg-primary/5 border border-primary/20")}>
              <span className={cn("w-8 font-mono text-sm font-bold", isTarget ? "text-primary" : "text-muted-foreground")}>{g}</span>
              <div className="flex-1 h-2 rounded-full bg-popover overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    impossible ? "bg-destructive" : safe ? "bg-emerald-500" : isTarget ? "bg-primary" : "bg-primary/40",
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-20 text-right font-mono text-xs text-foreground">
                {impossible ? "out of reach" : safe ? "secured" : `${needed}/${p3Max}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
