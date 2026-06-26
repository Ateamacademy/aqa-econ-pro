import React from "react";
import {
  MONOP_COMP_COLORS as C, svgLabelStyle, VIEW, PLOT, toX, toY,
  acFn, mcFn, acDeriv, curvePoints, Q_STAR,
} from "@/components/Diagrams/monopolisticCompetitionShared";

// Long-run equilibrium: entry shifts demand left until AR is TANGENT to AC.
// Pick the tangency quantity Q2 (on AC's falling limb → excess capacity); derive
// AR2 from the tangency conditions AR2(Q2)=AC(Q2) and AR2'(Q2)=AC'(Q2). At that
// point MR2 = MC automatically (since MR=AR+q·AR' and MC=AC+q·AC').
const Q2 = 4;
const AR_M = acDeriv(Q2);
const AR_B = acFn(Q2) - AR_M * Q2;
const arFn = (q: number) => AR_B + AR_M * q;
const mrFn = (q: number) => AR_B + 2 * AR_M * q;

// Faint "ghost" of the short-run demand (before entry), for context.
const ghostFn = (q: number) => 8.5 - 0.7 * q;

function MonopCompLongRunSvgInner() {
  const p2 = acFn(Q2);
  const x2 = toX(Q2);
  const yP2 = toY(p2);
  const mrEndQ = AR_B / (-2 * AR_M); // where MR hits zero
  const acMinX = toX(Q_STAR);

  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <g style={svgLabelStyle}>
        {/* Axes */}
        <line x1={PLOT.left} y1={PLOT.top - 20} x2={PLOT.left} y2={PLOT.bottom} stroke={C.muted} strokeWidth="2" />
        <line x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right + 20} y2={PLOT.bottom} stroke={C.muted} strokeWidth="2" />
        <text x={(PLOT.left + PLOT.right) / 2} y={PLOT.bottom + 56} textAnchor="middle" fontSize="24" fontWeight="700" fill={C.text}>Quantity (Q)</text>
        <text x="44" y={(PLOT.top + PLOT.bottom) / 2} textAnchor="middle" fontSize="24" fontWeight="700" fill={C.text} transform={`rotate(-90 44 ${(PLOT.top + PLOT.bottom) / 2})`}>Price / Cost / Revenue</text>

        {/* Ghost short-run demand (before entry) */}
        <line x1={toX(0)} y1={toY(ghostFn(0))} x2={toX(10)} y2={toY(ghostFn(10))} stroke={C.ghost} strokeWidth="4" strokeDasharray="10 14" strokeLinecap="round" />
        <text x={toX(10) - 6} y={toY(ghostFn(10)) - 8} textAnchor="end" fontSize="18" fontWeight="700" fill={C.ghost}>D₁ (SR)</text>

        {/* Curves */}
        <line x1={toX(0)} y1={toY(arFn(0))} x2={toX(10)} y2={toY(arFn(10))} stroke={C.shortRun} strokeWidth="6" strokeLinecap="round" />
        <line x1={toX(0)} y1={toY(mrFn(0))} x2={toX(mrEndQ)} y2={toY(0)} stroke={C.shortRun} strokeWidth="5" strokeDasharray="18 14" strokeLinecap="round" />
        <polyline points={curvePoints(mcFn)} fill="none" stroke={C.marginalCost} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={curvePoints(acFn)} fill="none" stroke={C.averageCost} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

        {/* Curve labels */}
        <text x={toX(10) - 6} y={toY(arFn(10)) - 10} textAnchor="end" fontSize="22" fontWeight="700" fill={C.shortRun}>AR₂ = D₂</text>
        <text x={toX(mrEndQ) + 6} y={toY(0) - 10} fontSize="22" fontWeight="700" fill={C.shortRun}>MR₂</text>
        <text x={toX(9.4)} y={toY(mcFn(9.4))} fontSize="22" fontWeight="700" fill={C.marginalCost}>MC</text>
        <text x={toX(9.6) + 4} y={toY(acFn(9.6)) + 8} fontSize="22" fontWeight="700" fill={C.averageCost}>AC</text>

        {/* Guides + tangency point (P = AC at Q2) */}
        <line x1={PLOT.left} y1={yP2} x2={x2} y2={yP2} stroke={C.shortRun} strokeWidth="2" strokeDasharray="7 7" />
        <line x1={x2} y1={PLOT.bottom} x2={x2} y2={yP2} stroke={C.averageCost} strokeWidth="2" strokeDasharray="7 7" />
        <circle cx={x2} cy={yP2} r="12" fill="none" stroke={C.averageCost} strokeWidth="4" />
        <circle cx={x2} cy={yP2} r="5" fill={C.averageCost} />
        <text x={PLOT.left - 12} y={yP2 + 6} textAnchor="end" fontSize="20" fontWeight="700" fill={C.shortRun}>P₂</text>
        <text x={x2} y={PLOT.bottom + 26} textAnchor="middle" fontSize="20" fontWeight="700" fill={C.averageCost}>Q₂</text>

        {/* AC minimum (efficient scale) */}
        <circle cx={acMinX} cy={toY(acFn(Q_STAR))} r="6" fill={C.averageCost} />
        <text x={acMinX + 10} y={toY(acFn(Q_STAR)) + 24} fontSize="18" fontWeight="700" fill={C.averageCost}>AC min</text>

        {/* Normal-profit callout */}
        <rect x={x2 + 18} y={yP2 - 64} width="210" height="58" rx="10" fill={C.yellowCallout} stroke={C.border} />
        <text x={x2 + 123} y={yP2 - 40} textAnchor="middle" fontSize="18" fontWeight="700" fill={C.calloutText}>Normal profit</text>
        <text x={x2 + 123} y={yP2 - 20} textAnchor="middle" fontSize="14" fill={C.calloutText}>(P = AC at Q₂)</text>
        <text x={PLOT.left + 14} y={yP2 + 40} fontSize="18" fontStyle="italic" fill={C.averageCost}>AR tangent to AC → zero supernormal profit</text>

        {/* Entry annotation */}
        <line x1={toX(7.2)} y1={toY(7)} x2={toX(5.6)} y2={toY(7)} stroke={C.longRun} strokeWidth="4" />
        <polygon points={`${toX(5.6)},${toY(7)} ${toX(5.6) + 16},${toY(7) - 9} ${toX(5.6) + 16},${toY(7) + 9}`} fill={C.longRun} />
        <text x={toX(6.4)} y={toY(7) - 16} textAnchor="middle" fontSize="19" fontWeight="700" fill={C.longRun}>New firms enter → D shifts left</text>

        {/* Excess capacity (Q2 below efficient scale Q*) */}
        <line x1={x2} y1={PLOT.bottom - 24} x2={acMinX} y2={PLOT.bottom - 24} stroke={C.danger} strokeWidth="4" />
        <polygon points={`${x2},${PLOT.bottom - 24} ${x2 + 14},${PLOT.bottom - 32} ${x2 + 14},${PLOT.bottom - 16}`} fill={C.danger} />
        <polygon points={`${acMinX},${PLOT.bottom - 24} ${acMinX - 14},${PLOT.bottom - 32} ${acMinX - 14},${PLOT.bottom - 16}`} fill={C.danger} />
        <text x={(x2 + acMinX) / 2} y={PLOT.bottom - 34} textAnchor="middle" fontSize="18" fontWeight="700" fill={C.danger}>Excess capacity</text>
      </g>
    </svg>
  );
}

export const MonopCompLongRunSvg = React.memo(MonopCompLongRunSvgInner);
