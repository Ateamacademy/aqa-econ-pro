/**
 * LorenzCurveDiagram · Exam-accurate Lorenz Curve with optional Country A/B comparison.
 *
 * Axes: X = Cumulative % of Population, Y = Cumulative % of Income
 * Always shows: 45° Line of Perfect Equality
 * Toggle: Single curve vs Two-country comparison
 * Gini shading between equality line and Lorenz curve(s)
 */

import { useState } from "react";
import { cn } from "@/lib/utils";

const W = 700, H = 500, PAD = 70;
const plotL = PAD, plotR = W - PAD, plotT = PAD, plotB = H - PAD;
const pw = plotR - plotL, ph = plotB - plotT;

/** Map percentage (0-100) to SVG coords */
const toX = (pct: number) => plotL + (pct / 100) * pw;
const toY = (pct: number) => plotB - (pct / 100) * ph;

/** Generate a convex Lorenz curve path (bowed below equality line).
 *  bowFactor: 0 = perfect equality, higher = more inequality */
function lorenzPath(bowFactor: number, nPoints = 50): string {
  const pts: [number, number][] = [];
  for (let i = 0; i <= nPoints; i++) {
    const t = i / nPoints; // 0 to 1
    // y = t^(1+bowFactor) ensures convexity to origin
    const y = Math.pow(t, 1 + bowFactor) * 100;
    pts.push([toX(t * 100), toY(y)]);
  }
  return "M " + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ");
}

/** Build shading area between equality line and Lorenz curve */
function giniAreaPath(bowFactor: number, nPoints = 50): string {
  // Upper edge: equality line from (0,0) to (100,100) in data space
  const eqPts: string[] = [];
  const lzPts: string[] = [];
  for (let i = 0; i <= nPoints; i++) {
    const t = i / nPoints;
    eqPts.push(`${toX(t * 100).toFixed(1)} ${toY(t * 100).toFixed(1)}`);
    const y = Math.pow(t, 1 + bowFactor) * 100;
    lzPts.push(`${toX(t * 100).toFixed(1)} ${toY(y).toFixed(1)}`);
  }
  // Path: equality line forward, then Lorenz curve backward
  return `M ${eqPts.join(" L ")} L ${lzPts.reverse().join(" L ")} Z`;
}

interface LorenzCurveDiagramProps {
  className?: string;
}

export default function LorenzCurveDiagram({ className }: LorenzCurveDiagramProps) {
  const [showComparison, setShowComparison] = useState(true);

  const bowA = 0.8;  // Country A · more equal (closer to line)
  const bowB = 1.8;  // Country B · less equal (further from line)
  const bowSingle = 1.2;

  // Annotation points at 20% of population
  const pct20x = toX(20);
  const incomeA20 = Math.pow(0.2, 1 + bowA) * 100;
  const incomeB20 = Math.pow(0.2, 1 + bowB) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-1 mb-3">
        <button
          onClick={() => setShowComparison(false)}
          className={cn(
            "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
            !showComparison ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          Single Country
        </button>
        <button
          onClick={() => setShowComparison(true)}
          className={cn(
            "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
            showComparison ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          Country A vs B
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: 480 }}>
        {/* Axes */}
        <line x1={plotL} y1={plotB} x2={plotR} y2={plotB} stroke="currentColor" strokeWidth={2} />
        <line x1={plotL} y1={plotB} x2={plotL} y2={plotT} stroke="currentColor" strokeWidth={2} />
        {/* Arrowheads */}
        <polygon points={`${plotR},${plotB} ${plotR - 8},${plotB - 4} ${plotR - 8},${plotB + 4}`} fill="currentColor" />
        <polygon points={`${plotL},${plotT} ${plotL - 4},${plotT + 8} ${plotL + 4},${plotT + 8}`} fill="currentColor" />

        {/* Axis labels */}
        <text x={(plotL + plotR) / 2} y={plotB + 45} fill="currentColor" fontSize="13" fontWeight="600" textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Cumulative % of Population (Poorest → Richest)
        </text>
        <text x={plotL - 50} y={(plotT + plotB) / 2} fill="currentColor" fontSize="13" fontWeight="600" textAnchor="middle"
          transform={`rotate(-90, ${plotL - 50}, ${(plotT + plotB) / 2})`}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Cumulative % of Income
        </text>

        {/* Grid ticks */}
        {[20, 40, 60, 80, 100].map(pct => (
          <g key={pct}>
            <line x1={toX(pct)} y1={plotB} x2={toX(pct)} y2={plotB + 5} stroke="currentColor" strokeWidth={1} opacity={0.5} />
            <text x={toX(pct)} y={plotB + 18} fill="currentColor" fontSize="10" textAnchor="middle" opacity={0.7}>{pct}</text>
            <line x1={plotL - 5} y1={toY(pct)} x2={plotL} y2={toY(pct)} stroke="currentColor" strokeWidth={1} opacity={0.5} />
            <text x={plotL - 10} y={toY(pct) + 4} fill="currentColor" fontSize="10" textAnchor="end" opacity={0.7}>{pct}</text>
            {/* Light grid lines */}
            <line x1={plotL} y1={toY(pct)} x2={plotR} y2={toY(pct)} stroke="currentColor" strokeWidth={0.3} opacity={0.15} />
            <line x1={toX(pct)} y1={plotT} x2={toX(pct)} y2={plotB} stroke="currentColor" strokeWidth={0.3} opacity={0.15} />
          </g>
        ))}
        <text x={plotL - 10} y={plotB + 4} fill="currentColor" fontSize="10" textAnchor="end" opacity={0.7}>0</text>

        {/* 45° Line of Perfect Equality */}
        <line x1={toX(0)} y1={toY(0)} x2={toX(100)} y2={toY(100)} stroke="#16a34a" strokeWidth={2.5} strokeDasharray="8 4" />
        <text x={toX(55)} y={toY(60)} fill="#16a34a" fontSize="12" fontWeight="700"
          transform={`rotate(-45, ${toX(55)}, ${toY(60)})`}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Line of Perfect Equality (45°)
        </text>

        {showComparison ? (
          <>
            {/* Gini area for Country B (larger, lighter) */}
            <path d={giniAreaPath(bowB)} fill="#ef4444" fillOpacity={0.08} />
            {/* Gini area for Country A (smaller, between equality and A curve) */}
            <path d={giniAreaPath(bowA)} fill="#3b82f6" fillOpacity={0.12} />

            {/* Country A Lorenz curve (more equal) */}
            <path d={lorenzPath(bowA)} fill="none" stroke="#3b82f6" strokeWidth={2.5} />
            <text x={toX(75)} y={toY(Math.pow(0.75, 1 + bowA) * 100) - 12} fill="#3b82f6" fontSize="13" fontWeight="700"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Country A (more equal)
            </text>

            {/* Country B Lorenz curve (less equal) */}
            <path d={lorenzPath(bowB)} fill="none" stroke="#ef4444" strokeWidth={2.5} />
            <text x={toX(60)} y={toY(Math.pow(0.6, 1 + bowB) * 100) + 20} fill="#ef4444" fontSize="13" fontWeight="700"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Country B (less equal)
            </text>

            {/* Area labels */}
            <text x={toX(35)} y={toY(25)} fill="#3b82f6" fontSize="14" fontWeight="700" textAnchor="middle" opacity={0.8}>A</text>
            <text x={toX(45)} y={toY(12)} fill="#ef4444" fontSize="14" fontWeight="700" textAnchor="middle" opacity={0.8}>B</text>

            {/* 20% annotation for Country B */}
            <line x1={pct20x} y1={plotB} x2={pct20x} y2={toY(incomeB20)} stroke="#ef4444" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
            <line x1={plotL} y1={toY(incomeB20)} x2={pct20x} y2={toY(incomeB20)} stroke="#ef4444" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
            <circle cx={pct20x} cy={toY(incomeB20)} r={4} fill="#ef4444" />
            <text x={plotL - 10} y={toY(incomeB20) + 4} fill="#ef4444" fontSize="9" textAnchor="end" fontWeight="600">
              {incomeB20.toFixed(0)}%
            </text>

            {/* 20% annotation for Country A */}
            <line x1={pct20x} y1={toY(incomeB20)} x2={pct20x} y2={toY(incomeA20)} stroke="#3b82f6" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
            <line x1={plotL} y1={toY(incomeA20)} x2={pct20x} y2={toY(incomeA20)} stroke="#3b82f6" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
            <circle cx={pct20x} cy={toY(incomeA20)} r={4} fill="#3b82f6" />
            <text x={plotL - 10} y={toY(incomeA20) + 4} fill="#3b82f6" fontSize="9" textAnchor="end" fontWeight="600">
              {incomeA20.toFixed(0)}%
            </text>

            {/* Inequality gap brace/arrow */}
            <text x={toX(50)} y={plotB + 58} fill="currentColor" fontSize="11" textAnchor="middle" fontWeight="600" opacity={0.8}
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Gini: Country B {">"} Country A → Greater inequality in B
            </text>
          </>
        ) : (
          <>
            {/* Single country shading */}
            <path d={giniAreaPath(bowSingle)} fill="#f59e0b" fillOpacity={0.15} />
            <path d={lorenzPath(bowSingle)} fill="none" stroke="#f59e0b" strokeWidth={2.5} />
            <text x={toX(70)} y={toY(Math.pow(0.7, 1 + bowSingle) * 100) + 18} fill="#f59e0b" fontSize="13" fontWeight="700"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Lorenz Curve
            </text>

            {/* A and B area labels */}
            <text x={toX(35)} y={toY(28)} fill="#16a34a" fontSize="16" fontWeight="700" textAnchor="middle" opacity={0.7}>A</text>
            <text x={toX(55)} y={toY(14)} fill="#f59e0b" fontSize="16" fontWeight="700" textAnchor="middle" opacity={0.7}>B</text>

            {/* 20% annotation */}
            {(() => {
              const inc20 = Math.pow(0.2, 1 + bowSingle) * 100;
              return (
                <>
                  <line x1={pct20x} y1={plotB} x2={pct20x} y2={toY(inc20)} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
                  <line x1={plotL} y1={toY(inc20)} x2={pct20x} y2={toY(inc20)} stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
                  <circle cx={pct20x} cy={toY(inc20)} r={4} fill="#f59e0b" />
                  <text x={plotL - 10} y={toY(inc20) + 4} fill="#f59e0b" fontSize="9" textAnchor="end" fontWeight="600">
                    {inc20.toFixed(0)}%
                  </text>
                  <text x={pct20x} y={plotB + 18} fill="currentColor" fontSize="9" textAnchor="middle" opacity={0.6}>20%</text>
                </>
              );
            })()}

            <text x={toX(50)} y={plotB + 58} fill="currentColor" fontSize="11" textAnchor="middle" fontWeight="600" opacity={0.8}
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Gini Coefficient = Area A ÷ (Area A + Area B)
            </text>
          </>
        )}

        {/* Origin label */}
        <text x={plotL - 8} y={plotB + 16} fill="currentColor" fontSize="11" fontWeight="600">O</text>
      </svg>

      {/* Theory box */}
      <div className="mt-3 rounded-lg border border-border/60 bg-card/50 p-3 text-sm space-y-1">
        <p className="font-semibold text-foreground">Key Points:</p>
        <ul className="list-disc pl-4 text-muted-foreground space-y-0.5 text-xs">
          <li>The <strong>Lorenz Curve</strong> is always convex (bowed below the 45° line)</li>
          <li>The further the curve bows from the line of equality → greater income inequality</li>
          <li><strong>Gini Coefficient</strong> = Area A ÷ (Area A + Area B), ranges from 0 (perfect equality) to 1 (perfect inequality)</li>
          {showComparison && <li>Country A has a <strong>lower Gini</strong> (more equal) than Country B</li>}
          <li>Progressive taxation and transfer payments shift the Lorenz Curve closer to the line of equality</li>
        </ul>
      </div>
    </div>
  );
}
