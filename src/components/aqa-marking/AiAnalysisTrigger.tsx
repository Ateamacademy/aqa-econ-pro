import { Sparkles, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  questionCount: number;
  totalQuestions: number;
  isRunning: boolean;
  hasAnyResults: boolean;
  onRun: () => void;
}

/**
 * The opt-in CTA that appears after Tier 1 + Tier 2 are complete on the
 * marking report. Triggers parallel AI analysis across all extended-response
 * (and diagram) questions.
 */
export function AiAnalysisTrigger({
  questionCount,
  totalQuestions,
  isRunning,
  hasAnyResults,
  onRun,
}: Props) {
  if (hasAnyResults && !isRunning) {
    return (
      <div className="rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-purple-200">
          <Check className="h-4 w-4 text-emerald-400" />
          AI analysis complete for {questionCount} question{questionCount === 1 ? "" : "s"}.
        </div>
        <Button onClick={onRun} size="sm" variant="outline" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Re-run
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 p-5 space-y-3">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-purple-500/15 p-2 shrink-0">
          <Sparkles className="h-5 w-5 text-purple-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground">
            Get AI analysis for your extended-response answers
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            Tier 3 gives you specific strengths and gaps analysis for {totalQuestions}{" "}
            extended-response question{totalQuestions === 1 ? "" : "s"}. The AI won't assign
            marks — your self-assessment stays the source of truth. About 30 seconds per paper.
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onRun}
          disabled={isRunning}
          size="sm"
          className="gap-1.5 bg-purple-500 hover:bg-purple-600 text-white"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analysing…
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" /> Run AI analysis
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
