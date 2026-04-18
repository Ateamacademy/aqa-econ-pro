import { CheckCircle2, RotateCcw, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgressEvent } from "@/lib/uniqueness/runWithDedup";

interface Props {
  events: ProgressEvent[];
  busy: boolean;
}

export default function GenerationProgressPanel({ events, busy }: Props) {
  if (events.length === 0 && !busy) return null;
  return (
    <div className="rounded-lg border border-border bg-card/50 p-3 mt-3 space-y-1.5 font-mono text-[11px]">
      <div className="text-foreground font-semibold mb-1">Generation log</div>
      {events.map((e, i) => (
        <div key={i} className="flex items-start gap-2">
          {e.type === "question-ok" && (
            <>
              <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">Question {e.questionNumber}</span>
            </>
          )}
          {e.type === "question-retry" && (
            <>
              <RotateCcw className="h-3 w-3 text-amber-400 mt-0.5 shrink-0 animate-spin" />
              <span className="text-amber-200">
                Question {e.questionNumber} — {e.reason}, retrying… (attempt {e.attempt} of 3)
              </span>
            </>
          )}
          {e.type === "section" && (
            <>
              <Loader2 className={cn("h-3 w-3 text-indigo-300 mt-0.5 shrink-0", busy && "animate-spin")} />
              <span className="text-indigo-200">{e.label}</span>
            </>
          )}
          {e.type === "saving" && (
            <>
              <Loader2 className="h-3 w-3 text-indigo-300 mt-0.5 shrink-0 animate-spin" />
              <span className="text-muted-foreground">Saving…</span>
            </>
          )}
          {e.type === "saved" && (
            <>
              <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-emerald-300">Saved</span>
            </>
          )}
          {e.type === "rejected" && (
            <>
              <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 shrink-0" />
              <span className="text-red-300">{e.error}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
