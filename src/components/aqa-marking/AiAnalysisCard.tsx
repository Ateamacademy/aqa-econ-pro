import { Sparkles, Check, X, Info, Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AiMarkingState } from "@/hooks/useAiMarking";

interface Props {
  questionNumber: string;
  totalMarks: number;
  selfAssessedLevel?: string; // e.g. "L3"
  state: AiMarkingState;
  onRetry?: () => void;
  variant?: "extended" | "diagram";
}

const KAAE_LABEL = {
  knowledge: "Knowledge",
  application: "Application",
  analysis: "Analysis",
  evaluation: "Evaluation",
} as const;

export function AiAnalysisCard({
  questionNumber,
  totalMarks,
  selfAssessedLevel,
  state,
  onRetry,
  variant = "extended",
}: Props) {
  const heading =
    variant === "diagram"
      ? `AI analysis — your diagram (Q${questionNumber})`
      : `AI analysis — Q${questionNumber} (${totalMarks} marks)`;

  return (
    <div
      className={cn(
        "rounded-2xl border-2 bg-card overflow-hidden",
        "border-purple-500/40",
      )}
    >
      <div className="px-5 py-3 border-b border-purple-500/30 bg-purple-500/5 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-purple-300" />
        <h3 className="text-sm font-bold text-foreground flex-1">{heading}</h3>
        <Badge
          variant="outline"
          className="border-purple-500/40 text-purple-200 text-[10px] gap-1"
        >
          <Sparkles className="h-3 w-3" /> AI analysis
        </Badge>
      </div>

      <div className="p-5 space-y-4">
        {state.status === "loading" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-3">
            <Loader2 className="h-4 w-4 animate-spin text-purple-300" />
            Analysing your answer…
          </div>
        )}

        {state.status === "error" && (
          <ErrorState error={state.error} retryAfterSec={state.retryAfterSec} onRetry={onRetry} />
        )}

        {state.status === "done" && state.analysis && (
          <>
            {/* Level recommendation vs self-assessment */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-purple-500/10 border border-purple-500/30 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-200/80 mb-1">
                  Recommended level
                </div>
                <div className="text-xl font-mono font-bold text-purple-100">
                  {state.analysis.levelRecommendation.level}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                  {state.analysis.levelRecommendation.rationale}
                </p>
              </div>
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200/80 mb-1">
                  Your self-assessment
                </div>
                <div className="text-xl font-mono font-bold text-amber-100">
                  {selfAssessedLevel ?? "—"}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                  Source of truth for the marks shown in this report.
                </p>
              </div>
            </div>

            {/* KAA+E breakdown */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                KAA + E breakdown
              </div>
              <ul className="space-y-1.5">
                {(Object.keys(KAAE_LABEL) as Array<keyof typeof KAAE_LABEL>).map((k) => {
                  const v = state.analysis!.kaaeBreakdown[k];
                  return (
                    <li key={k} className="flex items-start gap-2 text-xs">
                      {v.present ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                      )}
                      <span>
                        <span className="font-semibold text-foreground">
                          {KAAE_LABEL[k]}
                        </span>
                        {v.evidence && (
                          <span className="text-muted-foreground"> — {v.evidence}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Strengths */}
            {state.analysis.strengths.length > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/80 mb-1.5">
                  {variant === "diagram" ? "What's working" : "Strengths"}
                </div>
                <ul className="space-y-1">
                  {state.analysis.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-foreground/90 leading-snug pl-3 relative">
                      <span className="absolute left-0 text-emerald-400">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gaps */}
            {state.analysis.gaps.length > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-300/80 mb-1.5">
                  {variant === "diagram" ? "What would lift this to the next level" : "Gaps"}
                </div>
                <ul className="space-y-1">
                  {state.analysis.gaps.map((g, i) => (
                    <li key={i} className="text-xs text-foreground/90 leading-snug pl-3 relative">
                      <span className="absolute left-0 text-red-400">•</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {state.cached && (
              <div className="text-[10px] text-muted-foreground italic">
                Cached from a previous identical answer — no new AI call made.
              </div>
            )}
          </>
        )}

        {/* Disclaimer — load-bearing, always visible per spec */}
        <div className="flex items-start gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 p-2.5 text-[11px] text-purple-200/90">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>
            {variant === "diagram"
              ? "AI analysis supplements the structural check above. Your self-assessment of the full answer is final."
              : "AI analysis is for revision direction, not grading. Marks in this report are from your self-assessment."}
          </span>
        </div>
      </div>
    </div>
  );
}

function ErrorState({
  error,
  retryAfterSec,
  onRetry,
}: {
  error?: string;
  retryAfterSec?: number;
  onRetry?: () => void;
}) {
  let message = "AI analysis couldn't run just now — try again, or proceed with your self-assessment.";
  let allowRetry = true;
  if (error === "rate_limited") {
    const hrs = retryAfterSec ? Math.max(1, Math.ceil(retryAfterSec / 3600)) : 1;
    message = `You've used today's AI analysis quota. Your self-assessment marks are still saved — AI analysis will be available in about ${hrs} ${hrs === 1 ? "hour" : "hours"}.`;
    allowRetry = false;
  } else if (error === "malformed_response") {
    message = "AI response was incomplete for this question — your self-assessment stays as your primary feedback.";
  } else if (error === "not_configured") {
    message = "AI analysis isn't configured for this project yet.";
    allowRetry = false;
  }
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-200 flex items-start justify-between gap-3">
      <span>{message}</span>
      {allowRetry && onRetry && (
        <Button onClick={onRetry} size="sm" variant="outline" className="gap-1 shrink-0">
          <RefreshCw className="h-3 w-3" /> Retry
        </Button>
      )}
    </div>
  );
}
