import { CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
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
}

/**
 * Diagram marking panel · runs structural checks against AQA's rubric in pure
 * browser JavaScript. No external API calls. Phrases output as level
 * contribution, never direct marks.
 */
export function AqaDiagramMarkPanel({
  questionNumber,
  rubric,
  diagramElements,
  hasDiagram,
}: Props) {
  const structural = checkDiagramRubric(rubric, diagramElements);

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

  // Highest level reached by the diagram alone.
  const passedLevels = structural.componentResults
    .filter((c) => c.passed)
    .map((c) => parseInt(c.levelCategory.replace("L", ""), 10));
  const topLevel = passedLevels.length ? Math.max(...passedLevels) : 0;

  return (
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

      {topLevel > 0 && (
        <p className="mt-3 text-[11px] text-muted-foreground border-t border-border pt-2">
          This diagram supports a <span className="font-mono text-foreground">Level {topLevel}</span>{" "}
          contribution. Use this as evidence when self-assessing your overall level below · AQA marks
          holistically across diagram and writing.
        </p>
      )}
    </section>
  );
}
