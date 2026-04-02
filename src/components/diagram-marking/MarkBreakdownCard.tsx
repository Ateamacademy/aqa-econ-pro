import { cn } from "@/lib/utils";
import type { ComponentResult } from "./types";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from "lucide-react";

const STATUS_CONFIG = {
  correct: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30", label: "Correct" },
  partially_correct: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30", label: "Partial" },
  incorrect: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", label: "Incorrect" },
  missing: { icon: HelpCircle, color: "text-muted-foreground", bg: "bg-muted/50", border: "border-border", label: "Missing" },
};

export function MarkBreakdownCard({ results }: { results: ComponentResult[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        Mark Breakdown
        <span className="text-xs font-normal text-muted-foreground">
          ({results.reduce((a, r) => a + r.marks_awarded, 0)}/{results.reduce((a, r) => a + r.marks_available, 0)})
        </span>
      </h3>
      <div className="space-y-1.5">
        {results.map((r, i) => {
          const cfg = STATUS_CONFIG[r.status];
          const Icon = cfg.icon;
          return (
            <div
              key={i}
              className={cn("flex items-start gap-3 rounded-lg border p-3 transition-colors", cfg.border, cfg.bg)}
            >
              <Icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", cfg.color)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">{r.component}</span>
                  <span className={cn("text-xs font-bold", cfg.color)}>
                    {r.marks_awarded}/{r.marks_available}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{r.feedback}</p>
                {r.student_label && r.status !== "correct" && (
                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span className="text-red-400 line-through">{r.student_label}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-emerald-400 font-medium">{r.correct_label}</span>
                  </div>
                )}
                {r.confidence < 0.8 && (
                  <span className="inline-block mt-1 text-[10px] text-muted-foreground/70 italic">
                    Confidence: {Math.round(r.confidence * 100)}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
