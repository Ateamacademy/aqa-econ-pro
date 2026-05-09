import { Check, X, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type AqaDiagramRubric,
  type CanvasElement,
  checkDiagramRubric,
  type ComponentCheckResult,
} from "@/lib/aqa-diagram-rubric";
import { useMemo, useState } from "react";
import { AqaTierBadge } from "./AqaTierBadge";

interface Props {
  rubric: AqaDiagramRubric;
  /** Canvas elements from the diagram tool. Pass `[]` to surface "no diagram drawn" warnings. */
  elements: CanvasElement[];
}

/**
 * AQA diagram rubric checker.
 * - Structural components → auto-checked from canvas elements.
 * - Contextual components → student self-confirms (visually distinct).
 * - "Price level" axis check runs automatically on macro diagrams.
 */
export function AqaDiagramRubricCheck({ rubric, elements }: Props) {
  const result = useMemo(() => checkDiagramRubric(rubric, elements), [rubric, elements]);
  const [selfState, setSelfState] = useState<Record<string, boolean | undefined>>({});

  const setSelf = (id: string, v: boolean) =>
    setSelfState((p) => ({ ...p, [id]: v }));

  const finalResults: ComponentCheckResult[] = result.componentResults.map((r) =>
    r.source === "self"
      ? { ...r, passed: selfState[r.componentId], detail: selfState[r.componentId] === undefined ? "Awaiting your confirmation." : (selfState[r.componentId] ? "You confirmed this is correct." : "You marked this as not done.") }
      : r,
  );

  // Compute the level the diagram supports.
  const order: Array<"L1" | "L2" | "L3" | "L4"> = ["L1", "L2", "L3", "L4"];
  let levelReached: 1 | 2 | 3 | 4 = 1;
  for (let i = 0; i < order.length; i++) {
    const at = finalResults.filter((r) => r.levelCategory === order[i]);
    if (at.length === 0) continue;
    if (at.every((r) => r.passed === true)) levelReached = (i + 1) as 1 | 2 | 3 | 4;
    else break;
  }
  if (result.priceLevel.applies && !result.priceLevel.passed) levelReached = 1;

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Required diagram
        </div>
        <p className="text-sm text-foreground/90">{rubric.primaryExpected}</p>
        {rubric.acceptableAlternatives.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            <span className="font-semibold text-foreground/70">Also acceptable: </span>
            {rubric.acceptableAlternatives.join("; ")}
          </p>
        )}
      </div>

      {result.priceLevel.applies && (
        <div
          className={cn(
            "rounded-lg border p-3 text-xs flex items-start gap-2",
            result.priceLevel.passed
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
              : "bg-red-500/10 border-red-500/30 text-red-200",
          )}
        >
          {result.priceLevel.passed ? (
            <Check className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <X className="h-4 w-4 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-semibold mb-0.5">Macro axis check</div>
            <p className="leading-snug">{result.priceLevel.message}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {finalResults.map((r) => (
          <RubricRow
            key={r.componentId}
            result={r}
            onConfirm={(v) => setSelf(r.componentId, v)}
          />
        ))}
      </div>

      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-1">
          Diagram contribution
        </div>
        <p className="text-sm text-foreground">
          This diagram supports a <span className="font-bold">Level {levelReached}</span> answer.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          AQA marks the whole answer at one level · your written explanation must match the
          diagram's level for the mark to be awarded.
        </p>
      </div>
    </div>
  );
}

function RubricRow({
  result,
  onConfirm,
}: {
  result: ComponentCheckResult;
  onConfirm: (v: boolean) => void;
}) {
  const isAuto = result.source === "auto";
  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        isAuto ? "bg-card border-border" : "bg-amber-500/5 border-amber-500/30",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          {result.passed === true && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
          {result.passed === false && <X className="h-4 w-4 text-red-400 shrink-0" />}
          {result.passed === undefined && (
            <MessageSquare className="h-4 w-4 text-amber-300 shrink-0" />
          )}
          <span className="text-sm text-foreground/90 leading-snug">{result.description}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-mono text-muted-foreground">
            {result.levelCategory}
          </span>
          <AqaTierBadge tier={isAuto ? "auto" : "self"} />
        </div>
      </div>
      <p className="text-xs text-muted-foreground pl-6">{result.detail}</p>
      {!isAuto && (
        <div className="mt-2 pl-6 flex items-center gap-2">
          <button
            onClick={() => onConfirm(true)}
            className={cn(
              "text-[11px] px-2.5 py-1 rounded border transition-colors",
              result.passed === true
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
                : "bg-card border-border text-muted-foreground hover:text-foreground",
            )}
          >
            ✓ Yes, I did this
          </button>
          <button
            onClick={() => onConfirm(false)}
            className={cn(
              "text-[11px] px-2.5 py-1 rounded border transition-colors",
              result.passed === false
                ? "bg-red-500/20 border-red-500/50 text-red-200"
                : "bg-card border-border text-muted-foreground hover:text-foreground",
            )}
          >
            ✗ No
          </button>
        </div>
      )}
    </div>
  );
}
