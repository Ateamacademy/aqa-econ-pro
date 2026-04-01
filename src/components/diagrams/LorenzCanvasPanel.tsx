import { useState } from "react";
import { useLorenzCanvas } from "@/hooks/useLorenzCanvas";
import { cn } from "@/lib/utils";

interface LorenzCanvasPanelProps {
  /** If true, regions always on, no toggles shown */
  locked?: boolean;
  height?: number;
  className?: string;
}

export default function LorenzCanvasPanel({ locked = false, height = 420, className }: LorenzCanvasPanelProps) {
  const [showRegions, setShowRegions] = useState(true);
  const [showRef, setShowRef] = useState(false);

  const effectiveRegions = locked ? true : showRegions;
  const effectiveRef = locked ? false : showRef;

  const canvasRef = useLorenzCanvas({ showRegions: effectiveRegions, showRef: effectiveRef, height });

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-700 to-blue-900 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
            LORENZ CURVE &amp; GINI COEFFICIENT
          </p>
          <p className="text-[11px] text-muted-foreground">
            Country A (Gini ≈ 0.29) vs Country B (Gini ≈ 0.56)
          </p>
        </div>
      </div>

      {/* Toggles (hidden when locked) */}
      {!locked && (
        <div className="flex items-center gap-4 mb-2">
          <Toggle label="Show Gini regions (A & B)" checked={showRegions} onChange={setShowRegions} />
          <Toggle label="Show 20% reference lines" checked={showRef} onChange={setShowRef} />
        </div>
      )}

      {/* Canvas */}
      <div className="w-full rounded-lg overflow-hidden border" style={{ borderColor: "rgba(100,180,255,0.15)", background: "#0a1628" }}>
        <canvas ref={canvasRef} />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-2 text-xs text-muted-foreground">
        <LegendItem color="#ffffff" label="Line of perfect equality" />
        <LegendItem color="#4ade80" label="Country A" />
        <LegendItem color="#fb923c" label="Country B" />
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-9 h-5 rounded-full transition-colors duration-200",
          checked ? "bg-green-600" : "bg-muted"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
            checked && "translate-x-4"
          )}
        />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </label>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-5 h-0.5 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}
