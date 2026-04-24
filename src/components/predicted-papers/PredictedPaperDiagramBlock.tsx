import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DrawingCanvas } from "@/components/tools/DrawingCanvas";
import { cn } from "@/lib/utils";
import type { AqaDiagramRubric } from "@/lib/aqa-diagram-rubric";

const TYPE_LABELS: Record<string, string> = {
  adAs: "AD/AS",
  lras: "LRAS shift",
  phillips: "Phillips curve",
  supplyDemand: "Supply & demand",
  ppf: "PPF",
  monopoly: "Monopoly",
  perfectComp: "Perfect competition",
  monopsony: "Monopsony",
  labour: "Labour market",
  externality: "Externality",
  indirectTax: "Indirect tax",
  subsidy: "Subsidy",
  priceControl: "Price control",
  other: "Diagram",
};

interface Props {
  questionId: string;
  paperKey: string;
  required: boolean;
  optional?: boolean;
  diagramType?: string;
  rubric?: AqaDiagramRubric | unknown;
  /** Fires whenever the student finishes a stroke. */
  onChange?: (dataUrl: string) => void;
}

const storageKey = (paperKey: string, qid: string) => `aqa-paper-diagram-${paperKey}-${qid}`;

/**
 * Drawing canvas embedded under a predicted-paper question. When `required`
 * is true the canvas is shown by default; when `optional` is true it sits
 * behind an expander so the student can choose to add a diagram.
 *
 * Auto-saves the data-URL to localStorage on every drawEnd so drawings
 * survive navigation/reload during a paper attempt.
 */
export function PredictedPaperDiagramBlock({
  questionId,
  paperKey,
  required,
  optional,
  diagramType,
  rubric,
  onChange,
}: Props) {
  const [open, setOpen] = useState<boolean>(required && !optional);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const r = rubric as AqaDiagramRubric | undefined;

  // Restore an indicator only — the canvas itself starts blank because the
  // drawing tool stores ImageData internally; restoring pixels onto a fresh
  // canvas requires a code--add to the drawing tool that we can do later.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(storageKey(paperKey, questionId));
    if (raw) setSavedAt(Date.now());
  }, [paperKey, questionId]);

  const handleDrawEnd = (dataUrl: string) => {
    try {
      window.localStorage.setItem(storageKey(paperKey, questionId), dataUrl);
      setSavedAt(Date.now());
      onChange?.(dataUrl);
    } catch {
      // quota exceeded — silent
    }
  };

  const templateLabel = useMemo(
    () => (diagramType && TYPE_LABELS[diagramType]) || "Diagram",
    [diagramType],
  );

  if (optional && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full mt-3 mb-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors px-4 py-3 text-left flex items-center gap-2 text-xs text-foreground"
      >
        <Pencil className="h-3.5 w-3.5 text-primary" />
        <span className="font-semibold">Add a diagram</span>
        <span className="text-muted-foreground">
          — optional, but strengthens top-band answers.
        </span>
        <ChevronDown className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="mt-3 mb-3 rounded-xl border border-primary/30 bg-primary/[0.04]">
      {(savedAt || optional) && (
        <div className="flex items-center justify-end gap-2 px-3 py-2 border-b border-primary/20">
          {savedAt && (
            <span className="text-[10px] font-mono text-emerald-300 inline-flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Saved
            </span>
          )}
          {optional && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Hide canvas"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      <div className="p-3">
        <DrawingCanvas
          width={720}
          height={420}
          showGrid
          label=""
          onDrawEnd={handleDrawEnd}
        />
        {r && (
          <div className="mt-2 text-[10px] text-muted-foreground leading-snug border-t border-border/40 pt-2">
            <div>
              <span className="font-semibold text-foreground/80">Examiner expects: </span>
              {r.primaryExpected}
            </div>
            {r.requiredLabels?.length > 0 && (
              <div className="mt-1">
                <span className="font-semibold text-foreground/70">Required labels: </span>
                <span className="font-mono">{r.requiredLabels.join(" · ")}</span>
              </div>
            )}
          </div>
        )}
        {!savedAt && required && !optional && (
          <div className="mt-2 flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 px-2.5 py-1.5 text-[11px] text-amber-200">
            <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
            <span>
              AQA mark schemes for this question expect a diagram. Marking before drawing one will
              cap your level.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export const predictedPaperDiagramKey = storageKey;

/** Read the saved drawing for a single question (if any). */
export function readSavedDiagram(paperKey: string, questionId: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(storageKey(paperKey, questionId));
}

/** Strip every saved diagram for this paper attempt. */
export function clearSavedDiagrams(paperKey: string, questionIds: string[]) {
  if (typeof window === "undefined") return;
  for (const id of questionIds) {
    window.localStorage.removeItem(storageKey(paperKey, id));
  }
}
