import React from "react";
import {
  MONOP_COMP_COLORS as C, svgLabelStyle, VIEW, PLOT, toX, toY,
  acFn, mcFn, curvePoints, solveCross,
} from "@/components/Diagrams/monopolisticCompetitionShared";

// AR (demand) downward; MR has the same intercept and twice the slope.
const AR_B = 8.5, AR_M = -0.7;
const arFn = (q: number) => AR_B + AR_M * q;
const mrFn = (q: number) => AR_B + 2 * AR_M * q;

function MonopCompShortRunSvgInner() {
  // Profit-max output where MR = MC; price from AR; cost from AC.
  const q1 = solveCross((q) => mrFn(q) - mcFn(q));
  const p1 = arFn(q1);
  const ac1 = acFn(q1);
  const mrEndQ = AR_B / (-2 * AR_M); // where MR hits zero

  const x1 = toX(q1);
  const yP1 = toY(p1);
  const yAC1 = toY(ac1);

  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <g style={svgLabelStyle}>
        {/* Axes */}
        <line x1={PLOT.left} y1={PLOT.top - 20} x2={PLOT.left} y2={PLOT.bottom} stroke={C.muted} strokeWidth="2" />
        <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right + 20} y2={PLOT.bottom} stroke={C.muted} strokeWidth="2" />
        <text x={(PLOT.left + PLOT.right) / 2} y={PLOT.bottom + 56} textAnchor="middle" fontSize="24" fontWeight="700" fill={C.text}>Quantity (Q)</text>
        <text x="44" y={(PLOT.top + PLOT.bottom) / 2} textAnchor="middle" fontSize="24" fontWeight="700" fill={C.text} transform={`rotate(-90 44 ${(PLOT.top + PLOT.bottom) / 2})`}>Price / Cost / Revenue</text>

        {/* Supernormal profit: between AR (P1) and AC (AC1) from 0 to Q1 */}
        <rect x={PLOT.left} y={yP1} width={x1 - PLOT.left} height={yAC1 - yP1} fill={C.profitFill} />
        <text x={(PLOT.left + x1) / 2} y={(yP1 + yAC1) / 2 + 8} textAnchor="middle" fontSize="24" fontWeight="700" fill={C.profitText}>Supernormal profit</text>

        {/* Curves */}
        <line x1={toX(0)} y1={toY(arFn(0))} x2={toX(10)} y2={toY(arFn(10))} stroke={C.shortRun} strokeWidth="6" strokeLinecap="round" />
        <line x1={toX(0)} y1={toY(mrFn(0))} x2={toX(mrEndQ)} y2={toY(0)} stroke={C.shortRun} strokeWidth="5" strokeDasharray="18 14" strokeLinecap="round" />
        <polyline points={curvePoints(mcFn)} fill="none" stroke={C.marginalCost} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={curvePoints(acFn)} fill="none" stroke={C.averageCost} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Curve labels */}
        <text x={toX(10) - 6} y={toY(arFn(10)) - 10} textAnchor="end" fontSize="22" fontWeight="700" fill={C.shortRun}>AR = D</text>
        <text x={toX(mrEndQ) + 6} y={toY(0) - 10} fontSize="22" fontWeight="700" fill={C.shortRun}>MR</text>
        <text x={toX(9.4)} y={toY(mcFn(9.4))} fontSize="22" fontWeight="700" fill={C.marginalCost}>MC</text>
        <text x={toX(9.6) + 4} y={toY(acFn(9.6)) + 8} fontSize="22" fontWeight="700" fill={C.averageCost}>AC</text>

        {/* Guides + equilibrium markers */}
        <line x1={PLOT.left} y1={yP1} x2={x1} y2={yP1} stroke={C.shortRun} strokeWidth="2" strokeDasharray="7 7" />
        <line x1={PLOT.left} y1={yAC1} x2={x1} y2={yAC1} stroke={C.averageCost} strokeWidth="2" strokeDasharray="7 7" />
        <line x1={x1} y1={PLOT.bottom} x2={x1} y2={yP1} stroke={C.averageCost} strokeWidth="2" strokeDasharray="7 7" />
        <circle cx={x1} cy={toY(mcFn(q1))} r="8" fill={C.marginalCost} />
        <circle cx={x1} cy={yP1} r="8" fill={C.shortRun} />

        {/* Profit-max callout */}
        <rect x={x1 + 16} y={toY(mcFn(q1)) - 28} width="172" height="56" rx="10" fill={C.yellowCallout} stroke={C.border} />
        <text x={x1 + 102} y={toY(mcFn(q1)) - 4} textAnchor="middle" fontSize="18" fontWeight="700" fill={C.calloutText}>Profit max</text>
        <text x={x1 + 102} y={toY(mcFn(q1)) + 17} textAnchor="middle" fontSize="14" fill={C.calloutText}>(MR = MC)</text>

        {/* Axis value labels */}
        <text x={PLOT.left - 12} y={yP1 + 6} textAnchor="end" fontSize="20" fontWeight="700" fill={C.shortRun}>P₁</text>
        <text x={PLOT.left - 12} y={yAC1 + 6} textAnchor="end" fontSize="20" fontWeight="700" fill={C.averageCost}>AC₁</text>
        <text x={x1} y={PLOT.bottom + 26} textAnchor="middle" fontSize="20" fontWeight="700" fill={C.averageCost}>Q₁</text>
      </g>
    </svg>
  );
}

export const MonopCompShortRunSvg = React.memo(MonopCompShortRunSvgInner);
