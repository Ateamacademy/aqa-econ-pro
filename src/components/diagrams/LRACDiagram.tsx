/**
 * LRACDiagram · Long-Run Average Cost (Envelope) Curve
 * 
 * Shows: U-shaped LRAC curve, MES point, Economies/Constant Returns/Diseconomies zones
 * Matches the reference style from Figure 5.
 */

import { cn } from "@/lib/utils";

const W = 700, H = 500, PAD = 70;
const plotL = PAD, plotR = W - PAD, plotT = PAD, plotB = H - PAD;
const pw = plotR - plotL, ph = plotB - plotT;

/** Map normalised 0-1 to SVG x */
const toX = (t: number) => plotL + t * pw;
/** Map normalised 0-1 to SVG y (0 = bottom, 1 = top) */
const toY = (t: number) => plotB - t * ph;

/**
 * U-shaped LRAC: cost(t) where t ∈ [0,1] maps to output range.
 * We use a quadratic that dips at ~0.35 (MES) then rises.
 */
function lracY(t: number): number {
  // Shifted quadratic: cost = a*(t - tMin)^2 + cMin
  const tMin = 0.35;
  const cMin = 0.25; // minimum cost (normalised)
  // a kept low enough that cost stays below the clamp across the plotted range,
  // otherwise the right end flattens into an (atypical) plateau at cost = 1.
  const a = 1.8;
  const cost = a * (t - tMin) * (t - tMin) + cMin;
  // Clamp to 0-1
  return Math.min(Math.max(cost, 0), 1);
}

function lracPath(nPoints = 80): string {
  const pts: string[] = [];
  for (let i = 0; i <= nPoints; i++) {
    const t = i / nPoints;
    // Start from t=0.03 to avoid edge artifacts
    const tActual = 0.03 + t * 0.92;
    pts.push(`${toX(tActual).toFixed(1)} ${toY(lracY(tActual)).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

interface LRACDiagramProps {
  className?: string;
}

export default function LRACDiagram({ className }: LRACDiagramProps) {
  const mesT = 0.35;
  const mesX = toX(mesT);
  const mesY = toY(lracY(mesT));

  // Constant returns zone: roughly 0.35 to 0.50
  const constEndT = 0.50;
  const constEndX = toX(constEndT);

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: 480 }}>
        {/* Axes */}
        <line x1={plotL} y1={plotB} x2={plotR} y2={plotB} stroke="currentColor" strokeWidth={2} />
        <line x1={plotL} y1={plotB} x2={plotL} y2={plotT} stroke="currentColor" strokeWidth={2} />
        {/* Arrowheads */}
        <polygon points={`${plotR},${plotB} ${plotR - 8},${plotB - 4} ${plotR - 8},${plotB + 4}`} fill="currentColor" />
        <polygon points={`${plotL},${plotT} ${plotL - 4},${plotT + 8} ${plotL + 4},${plotT + 8}`} fill="currentColor" />

        {/* Axis labels */}
        <text x={(plotL + plotR) / 2} y={plotB + 50} fill="currentColor" fontSize="13" fontWeight="600" textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Output (Q)
        </text>
        <text x={plotL - 50} y={(plotT + plotB) / 2} fill="currentColor" fontSize="13" fontWeight="600" textAnchor="middle"
          transform={`rotate(-90, ${plotL - 50}, ${(plotT + plotB) / 2})`}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Long-Run Average Cost (£)
        </text>

        {/* Origin */}
        <text x={plotL - 8} y={plotB + 16} fill="currentColor" fontSize="11" fontWeight="600">O</text>

        {/* LRAC curve */}
        <path d={lracPath()} fill="none" stroke="#3b82f6" strokeWidth={3} />
        {/* LRAC label at end of curve */}
        <text x={toX(0.88)} y={toY(lracY(0.88)) - 12} fill="#3b82f6" fontSize="14" fontWeight="700"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          LRAC
        </text>

        {/* MES dashed line */}
        <line x1={mesX} y1={plotB} x2={mesX} y2={mesY} stroke="#16a34a" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />
        <circle cx={mesX} cy={mesY} r={4} fill="#16a34a" />
        <text x={mesX} y={plotB + 16} fill="#16a34a" fontSize="11" fontWeight="700" textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          MES
        </text>

        {/* Zone labels along X-axis */}
        {/* Economies of Scale zone */}
        <line x1={plotL + 10} y1={plotB + 28} x2={mesX - 8} y2={plotB + 28} stroke="#16a34a" strokeWidth={2} />
        <polygon points={`${plotL + 10},${plotB + 28} ${plotL + 16},${plotB + 25} ${plotL + 16},${plotB + 31}`} fill="#16a34a" />
        <polygon points={`${mesX - 8},${plotB + 28} ${mesX - 14},${plotB + 25} ${mesX - 14},${plotB + 31}`} fill="#16a34a" />
        <text x={(plotL + 10 + mesX - 8) / 2} y={plotB + 42} fill="#16a34a" fontSize="10" fontWeight="600" textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Economies of Scale
        </text>

        {/* Constant Returns zone */}
        <line x1={mesX + 8} y1={plotB + 28} x2={constEndX - 8} y2={plotB + 28} stroke="currentColor" strokeWidth={1.5} opacity={0.5} />
        <text x={(mesX + constEndX) / 2} y={plotB + 42} fill="currentColor" fontSize="10" fontWeight="500" textAnchor="middle" opacity={0.7}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Constant Returns
        </text>

        {/* Diseconomies of Scale zone */}
        <line x1={constEndX + 8} y1={plotB + 28} x2={plotR - 20} y2={plotB + 28} stroke="#ef4444" strokeWidth={2} />
        <polygon points={`${constEndX + 8},${plotB + 28} ${constEndX + 14},${plotB + 25} ${constEndX + 14},${plotB + 31}`} fill="#ef4444" />
        <polygon points={`${plotR - 20},${plotB + 28} ${plotR - 26},${plotB + 25} ${plotR - 26},${plotB + 31}`} fill="#ef4444" />
        <text x={(constEndX + 8 + plotR - 20) / 2} y={plotB + 42} fill="#ef4444" fontSize="10" fontWeight="600" textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Diseconomies of Scale
        </text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }} /> LRAC
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: "#16a34a" }} /> Economies
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }} /> Diseconomies
        </span>
      </div>

      {/* Theory box */}
      <div className="mt-3 rounded-lg border border-border/60 bg-card/50 p-3 text-sm space-y-1">
        <p className="font-semibold text-foreground">Key Points:</p>
        <ul className="list-disc pl-4 text-muted-foreground space-y-0.5 text-xs">
          <li>The <strong>LRAC</strong> curve is U-shaped · falling due to economies of scale, then rising due to diseconomies</li>
          <li><strong>MES</strong> (Minimum Efficient Scale) = the lowest output at which LRAC is minimised</li>
          <li><strong>Economies of scale</strong>: technical, managerial, purchasing, financial, marketing, risk-bearing</li>
          <li><strong>Diseconomies of scale</strong>: communication breakdown, co-ordination problems, loss of motivation</li>
          <li>The LRAC is the "envelope" of all possible short-run average cost curves</li>
        </ul>
      </div>
    </div>
  );
}
