import { useEffect, useState } from "react";
import { Loader2, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  markDiagramAi,
  isFallback,
  safeText,
  type AiDiagramResult,
} from "@/lib/aqa-diagram-ai";
import {
  checkDiagramRubric,
  type AqaDiagramRubric,
  type CanvasElement,
} from "@/lib/aqa-diagram-rubric";
import { AqaTierBadge } from "./AqaTierBadge";

interface Props {
  questionNumber: number;
  prompt: string;
  rubric: AqaDiagramRubric;
  /** Structured canvas elements derived from the student's drawing. */
  diagramElements: CanvasElement[];
  /** Has the student drawn anything? Drives the "no diagram" warning. */
  hasDiagram: boolean;
  writtenAnswer?: string;
  /** When false, defer fetching until the parent enables it. */
  autoRun?: boolean;
}

/**
 * Combined diagram marking panel — runs the structural check synchronously
 * and the AI contextual analysis on demand. The AI never assigns a mark.
 */
export function AqaDiagramMarkPanel({
  questionNumber,
  prompt,
  rubric,
  diagramElements,
  hasDiagram,
  writtenAnswer,
  autoRun = false,
}: Props) {
  const [aiResult, setAiResult] = useState<AiDiagramResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(autoRun);

  const structural = checkDiagramRubric(rubric, diagramElements);

  useEffect(() => {
    if (!requested || aiResult || loading) return;
    if (!hasDiagram) return;
    setLoading(true);
    markDiagramAi({
      prompt,
      rubric,
      diagramElements: diagramElements as unknown[],
      writtenAnswer,
      structuralResults: structural.componentResults
        .filter((r) => r.source === "auto" && r.passed !== undefined)
        .map((r) => ({ componentId: r.componentId, passed: !!r.passed })),
    })
      .then(setAiResult)
      .finally(() => setLoading(false));
  }, [requested, aiResult, loading, hasDiagram, prompt, rubric, diagramElements, writtenAnswer, structural.componentResults]);

  if (!hasDiagram) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-200 flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold mb-0.5">No diagram drawn for Q{questionNumber}</div>
          <p className="leading-snug text-amber-200/80">
            AQA mark schemes for this question expect a diagram. Open the question and use the
            inline canvas before running marking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Structural — auto */}
      <section className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-foreground">Structural check (Q{questionNumber})</h4>
          <AqaTierBadge tier="auto" />
        </div>
        {structural.priceLevel.applies && (
          <div
            className={cn(
              "rounded-lg border px-3 py-2 mb-3 text-[11px] flex items-start gap-2",
              structural.priceLevel.passed
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                : "bg-red-500/10 border-red-500/30 text-red-200",
            )}
          >
            {structural.priceLevel.passed ? (
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            )}
            <span>{structural.priceLevel.message}</span>
          </div>
        )}
        <ul className="space-y-1.5">
          {structural.componentResults.map((c) => (
            <li
              key={c.componentId}
              className="flex items-start gap-2 text-[11px] text-foreground/85"
            >
              <span className="font-mono text-muted-foreground w-7 shrink-0">{c.levelCategory}</span>
              <span className="shrink-0 mt-0.5">
                {c.source === "self" ? "○" : c.passed ? "✓" : "✗"}
              </span>
              <span className="leading-snug">
                <span className="text-foreground">{c.description}</span>
                <span className="block text-muted-foreground">{c.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* AI — contextual */}
      <section className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            Contextual analysis
          </h4>
          <AqaTierBadge tier="ai" />
        </div>

        {!requested && (
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-[11px] text-muted-foreground leading-snug">
              Optional — analyses your diagram against AQA's level-of-response framework.
              Recommends a level only; never assigns a mark.
            </p>
            <Button size="sm" variant="outline" onClick={() => setRequested(true)} className="text-xs">
              Run analysis
            </Button>
          </div>
        )}

        {requested && loading && (
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analysing…
          </div>
        )}

        {requested && aiResult && isFallback(aiResult) && (
          <div className="text-[11px] text-amber-200 flex items-start gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {safeText(aiResult.message)}
          </div>
        )}

        {requested && aiResult && !isFallback(aiResult) && (
          <div className="space-y-3 text-[11px]">
            <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-200 mb-0.5">
                Recommended level
              </div>
              <div className="text-sm font-bold text-foreground">
                {aiResult.levelRecommendation.level}
              </div>
              <p className="text-muted-foreground leading-snug mt-1">
                {safeText(aiResult.levelRecommendation.rationale)}
              </p>
            </div>

            {aiResult.strengths.length > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-1">
                  Strengths
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-foreground/90">
                  {aiResult.strengths.map((s, i) => <li key={i}>{safeText(s)}</li>)}
                </ul>
              </div>
            )}

            {aiResult.gaps.length > 0 && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-300 mb-1">
                  Gaps
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-foreground/90">
                  {aiResult.gaps.map((g, i) => <li key={i}>{safeText(g)}</li>)}
                </ul>
              </div>
            )}

            {aiResult.writtenAnswerInteraction && (
              <div className="rounded-lg border border-border bg-card px-3 py-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                  Diagram ↔ written answer
                </div>
                <p className="text-foreground/85 leading-snug">{safeText(aiResult.writtenAnswerInteraction)}</p>
              </div>
            )}

            <p className="text-[10px] text-muted-foreground italic">
              AI analysis is for revision direction, not a mark. Marks come from your self-assessment.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
