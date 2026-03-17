/**
 * Dynamic Curve Shifting Component
 * Allows interactive control over which curve shifts and by how much.
 */
import { useState, useMemo, useId } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type CurveType = "demand" | "supply";
type ShiftDirection = "left" | "right" | "none";

interface ShiftConfig {
  curve: CurveType;
  direction: ShiftDirection;
  magnitude: number; // 0-100
}

const COLORS = {
  demand: "#3b82f6",
  supply: "#ef4444",
  shifted: "#f59e0b",
  eq: "#16a34a",
};

function lineIntersect(
  x1: number, y1: number, x2: number, y2: number,
  x3: number, y3: number, x4: number, y4: number
) {
  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denom) < 0.001) return { x: (x1 + x3) / 2, y: (y1 + y3) / 2 };
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

interface DynamicShiftDiagramProps {
  initialShift?: ShiftConfig;
  title?: string;
  className?: string;
}

export function DynamicShiftDiagram({ initialShift, title, className }: DynamicShiftDiagramProps) {
  const [curve, setCurve] = useState<CurveType>(initialShift?.curve ?? "demand");
  const [magnitude, setMagnitude] = useState(initialShift?.magnitude ?? 50);
  const [direction, setDirection] = useState<ShiftDirection>(initialShift?.direction ?? "right");
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");

  const W = 420, H = 320;
  const mx = 55, my = 25, pw = W - mx - 30, ph = H - my - 50;
  const pad = 10;

  const shiftPx = useMemo(() => {
    if (direction === "none") return 0;
    const base = (magnitude / 100) * 80;
    return direction === "right" ? base : -base;
  }, [magnitude, direction]);

  // Base curves
  const dL = { x1: mx + pad, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };
  const sL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };

  // Shifted curve
  const dShifted = curve === "demand"
    ? { x1: dL.x1 + shiftPx, y1: dL.y1, x2: dL.x2 + shiftPx, y2: dL.y2 }
    : dL;
  const sShifted = curve === "supply"
    ? { x1: sL.x1 + shiftPx, y1: sL.y1, x2: sL.x2 + shiftPx, y2: sL.y2 }
    : sL;

  const eq1 = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, sL.x1, sL.y1, sL.x2, sL.y2);
  const eq2 = lineIntersect(dShifted.x1, dShifted.y1, dShifted.x2, dShifted.y2, sShifted.x1, sShifted.y1, sShifted.x2, sShifted.y2);

  const hasShift = direction !== "none" && magnitude > 0;

  return (
    <div className={cn(
      "my-6 rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-lg",
      className
    )}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4 text-primary flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">⚡</span>
        {title || "Interactive Curve Shift"}
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex gap-1.5">
          {(["demand", "supply"] as CurveType[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurve(c)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                curve === c
                  ? c === "demand"
                    ? "bg-blue-500/15 text-blue-600 border-blue-500/30"
                    : "bg-red-500/15 text-red-600 border-red-500/30"
                  : "bg-muted/40 text-muted-foreground border-border/40 hover:bg-muted/60"
              )}
            >
              {c === "demand" ? "Demand" : "Supply"}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {(["left", "none", "right"] as ShiftDirection[]).map((d) => (
            <button
              key={d}
              onClick={() => setDirection(d)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                direction === d
                  ? "bg-amber-500/15 text-amber-600 border-amber-500/30"
                  : "bg-muted/40 text-muted-foreground border-border/40 hover:bg-muted/60"
              )}
            >
              {d === "left" ? "← Left" : d === "right" ? "Right →" : "Reset"}
            </button>
          ))}
        </div>
        {direction !== "none" && (
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <span className="text-[10px] text-muted-foreground font-medium">Shift:</span>
            <Slider
              value={[magnitude]}
              onValueChange={([v]) => setMagnitude(v)}
              min={0}
              max={100}
              step={5}
              className="flex-1"
            />
            <span className="text-[10px] font-bold text-foreground w-8">{magnitude}%</span>
          </div>
        )}
      </div>

      {/* SVG Diagram */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] h-auto">
        <defs>
          <clipPath id={`shift-clip-${uid}`}><rect x={mx} y={my} width={pw} height={ph} /></clipPath>
        </defs>
        {/* Grid */}
        <rect x={mx} y={my} width={pw} height={ph} fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        {/* Axes */}
        <line x1={mx} y1={my} x2={mx} y2={my + ph} stroke="currentColor" strokeWidth="2" />
        <line x1={mx} y1={my + ph} x2={mx + pw} y2={my + ph} stroke="currentColor" strokeWidth="2" />
        <text x={mx - 8} y={my + ph / 2} fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" transform={`rotate(-90, ${mx - 8}, ${my + ph / 2})`}>Price (P)</text>
        <text x={mx + pw / 2} y={my + ph + 35} fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle">Quantity (Q)</text>
        <text x={mx - 4} y={my + ph + 14} fill="currentColor" fontSize="10" fontWeight="700" textAnchor="middle">O</text>

        <g clipPath="url(#shift-clip)">
          {/* Original curves */}
          <line {...dL} stroke={COLORS.demand} strokeWidth="2.5" strokeLinecap="round" />
          <line {...sL} stroke={COLORS.supply} strokeWidth="2.5" strokeLinecap="round" />

          {/* Shifted curve */}
          {hasShift && (
            <line
              {...(curve === "demand" ? dShifted : sShifted)}
              stroke={COLORS.shifted}
              strokeWidth="2.5"
              strokeDasharray="6,3"
              strokeLinecap="round"
            />
          )}

          {/* Equilibrium dots */}
          <circle cx={eq1.x} cy={eq1.y} r="5" fill={COLORS.eq} />
          <text x={eq1.x + 8} y={eq1.y - 6} fill={COLORS.eq} fontSize="11" fontWeight="700">E₁</text>

          {hasShift && (
            <>
              <circle cx={eq2.x} cy={eq2.y} r="5" fill={COLORS.shifted} />
              <text x={eq2.x + 8} y={eq2.y - 6} fill={COLORS.shifted} fontSize="11" fontWeight="700">E₂</text>
              {/* Dashed projection lines for E₂ */}
              <line x1={eq2.x} y1={eq2.y} x2={mx} y2={eq2.y} stroke={COLORS.shifted} strokeWidth="1" strokeDasharray="4,2" />
              <line x1={eq2.x} y1={eq2.y} x2={eq2.x} y2={my + ph} stroke={COLORS.shifted} strokeWidth="1" strokeDasharray="4,2" />
              <text x={mx - 6} y={eq2.y + 4} fill={COLORS.shifted} fontSize="9" fontWeight="600" textAnchor="end">P₂</text>
              <text x={eq2.x} y={my + ph + 14} fill={COLORS.shifted} fontSize="9" fontWeight="600" textAnchor="middle">Q₂</text>
            </>
          )}

          {/* Dashed projection for E₁ */}
          <line x1={eq1.x} y1={eq1.y} x2={mx} y2={eq1.y} stroke={COLORS.eq} strokeWidth="1" strokeDasharray="4,2" />
          <line x1={eq1.x} y1={eq1.y} x2={eq1.x} y2={my + ph} stroke={COLORS.eq} strokeWidth="1" strokeDasharray="4,2" />
          <text x={mx - 6} y={eq1.y + 4} fill={COLORS.eq} fontSize="9" fontWeight="600" textAnchor="end">P₁</text>
          <text x={eq1.x} y={my + ph + 14} fill={COLORS.eq} fontSize="9" fontWeight="600" textAnchor="middle">Q₁</text>
        </g>

        {/* Labels */}
        <text x={dL.x2 + 4} y={dL.y2 - 6} fill={COLORS.demand} fontSize="11" fontWeight="700">{curve === "demand" ? "D₁" : "D"}</text>
        <text x={sL.x2 + 4} y={sL.y2 + 12} fill={COLORS.supply} fontSize="11" fontWeight="700">{curve === "supply" ? "S₁" : "S"}</text>
        {hasShift && (
          <text
            x={(curve === "demand" ? dShifted : sShifted).x2 + 4}
            y={curve === "demand" ? dShifted.y2 - 6 : sShifted.y2 + 12}
            fill={COLORS.shifted}
            fontSize="11"
            fontWeight="700"
          >
            {curve === "demand" ? "D₂" : "S₂"}
          </text>
        )}
      </svg>

      {/* Analysis text */}
      {hasShift && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-muted/40 border border-border/40">
          <p className="text-xs text-foreground/80">
            <span className="font-semibold text-foreground">{curve === "demand" ? "Demand" : "Supply"}</span> shifts{" "}
            <span className="font-semibold" style={{ color: COLORS.shifted }}>{direction}</span>
            {" → "}
            {curve === "demand" && direction === "right" && "Price ↑ and Quantity ↑"}
            {curve === "demand" && direction === "left" && "Price ↓ and Quantity ↓"}
            {curve === "supply" && direction === "right" && "Price ↓ and Quantity ↑"}
            {curve === "supply" && direction === "left" && "Price ↑ and Quantity ↓"}
          </p>
        </div>
      )}
    </div>
  );
}
