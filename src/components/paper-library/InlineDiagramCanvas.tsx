import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { DrawingCanvas } from "@/components/tools/DrawingCanvas";
import type { AqaDiagramRubric, DiagramType } from "@/lib/aqa-diagram-rubric";
import { cn } from "@/lib/utils";

interface Props {
  questionNumber: number;
  paperId: string;
  rubric?: AqaDiagramRubric;
  diagramType?: DiagramType;
  /** When true, canvas is collapsed behind a "Add a diagram" button. */
  optional?: boolean;
  onChange?: (dataUrl: string) => void;
}

const DIAGRAM_LABELS: Record<DiagramType, string> = {
  adAs: "AD/AS",
  lras: "LRAS shift",
  phillips: "Phillips curve",
  supplyDemand: "Supply & demand",
  ppf: "PPF",
  monopoly: "Monopoly",
  monopolisticComp: "Monopolistic competition",
  perfectComp: "Perfect competition",
  monopsony: "Monopsony",
  labour: "Labour market",
  externality: "Externality",
  negExtPalmOil: "Negative externality (palm oil)",
  indirectTax: "Indirect tax",
  specificAdValorem: "Specific vs ad valorem tax",
  subsidy: "Subsidy",
  priceControl: "Price control",
  pedRevenue: "PED & revenue",
  lorenz: "Lorenz curve & Gini",
  jCurve: "J-curve effect",
  other: "Diagram",
};

const STORAGE_KEY = (paperId: string, qn: number) => `aqa-diagram-${paperId}-q${qn}`;

/**
 * Inline drawing canvas embedded directly under a diagram-required paper question.
 * - Auto-saves drawing as a data URL per `(paperId, questionNumber)` to localStorage.
 * - Restores on remount.
 * - When `optional`, sits behind an "Add a diagram" expander.
 */
export function InlineDiagramCanvas({
  questionNumber,
  paperId,
  rubric,
  diagramType,
  optional,
  onChange,
}: Props) {
  const [open, setOpen] = useState(!optional);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Restore on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY(paperId, questionNumber));
    if (raw) setSavedAt(Date.now());
  }, [paperId, questionNumber]);

  const handleDrawEnd = (dataUrl: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY(paperId, questionNumber), dataUrl);
      setSavedAt(Date.now());
      onChange?.(dataUrl);
    } catch {
      // quota exceeded — silent
    }
  };

  if (optional && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full mt-2 mb-3 rounded-lg border border-dashed border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors px-4 py-3 text-left flex items-center gap-2 text-xs text-indigo-200"
      >
        <Pencil className="h-3.5 w-3.5" />
        <span className="font-semibold">Add a diagram</span>
        <span className="text-muted-foreground">— optional, but recommended for top-band answers.</span>
        <ChevronDown className="h-3.5 w-3.5 ml-auto" />
      </button>
    );
  }

  return (
    <div className="mt-2 mb-3 rounded-xl border border-indigo-500/30 bg-indigo-500/[0.03]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-indigo-500/20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            Draw your diagram
          </span>
          {diagramType && (
            <span className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">
              {DIAGRAM_LABELS[diagramType]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {savedAt && (
            <span className="text-[10px] font-mono text-emerald-300">Saved</span>
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
      </div>

      <div className="p-3">
        <DrawingCanvas
          width={720}
          height={400}
          showGrid
          label=""
          onDrawEnd={handleDrawEnd}
        />
        {rubric && (
          <div className="mt-2 text-[10px] text-muted-foreground leading-snug">
            <span className="font-semibold text-foreground/80">Examiner expects: </span>
            {rubric.primaryExpected}
            {rubric.requiredLabels.length > 0 && (
              <span className="block mt-0.5">
                <span className="font-semibold text-foreground/70">Required labels: </span>
                <span className="font-mono">{rubric.requiredLabels.join(" · ")}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Read all saved drawings for a paper (used by the marking flow). */
export function loadSavedDiagrams(paperId: string, questionNumbers: number[]): Record<number, string> {
  if (typeof window === "undefined") return {};
  const out: Record<number, string> = {};
  for (const qn of questionNumbers) {
    const raw = window.localStorage.getItem(STORAGE_KEY(paperId, qn));
    if (raw) out[qn] = raw;
  }
  return out;
}

/** Used by both the canvas and the marker so the storage key stays in sync. */
export const diagramStorageKey = STORAGE_KEY;
