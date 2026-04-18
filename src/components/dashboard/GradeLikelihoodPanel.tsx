import { motion } from "framer-motion";
import type { StudentDashboardState } from "@/hooks/useDashboardState";
import { cn } from "@/lib/utils";

interface Props {
  state: StudentDashboardState;
}

const GRADES = ["A*", "A", "B", "C", "D", "E"] as const;

export default function GradeLikelihoodPanel({ state }: Props) {
  const { letter, basedOnPapers, likelihoods } = state.predictedGrade;
  const empty = basedOnPapers === 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-semibold text-sm">Grade Likelihood</h3>
        {!empty && (
          <span className="text-2xl font-bold font-mono text-primary">{letter}</span>
        )}
      </div>

      {empty ? (
        <div className="h-[220px] flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground mb-1">No prediction yet</p>
          <p className="text-[11px] text-muted-foreground/70 px-6">
            Complete your first predicted paper to see a grade estimate.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {GRADES.map((g) => {
            const pct = likelihoods[g] ?? 0;
            const isTop = g === letter;
            return (
              <div key={g} className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-6 text-xs font-mono font-bold text-right",
                    isTop ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {g}
                </span>
                <div className="flex-1 h-3 rounded-full bg-popover overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
                    className={cn(
                      "h-full rounded-full",
                      isTop ? "bg-gradient-to-r from-primary to-cyan-pop" : "bg-primary/30",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "w-10 text-[11px] font-mono text-right",
                    isTop ? "text-primary font-semibold" : "text-muted-foreground",
                  )}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      )}

      {!empty && (
        <p className="text-[10px] text-muted-foreground mt-4 italic leading-relaxed">
          Based on {basedOnPapers} completed paper{basedOnPapers === 1 ? "" : "s"}. As you complete more, this prediction
          will refine.
        </p>
      )}
    </div>
  );
}
