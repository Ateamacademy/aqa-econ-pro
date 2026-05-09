/**
 * EconomicsDiagramLibrary · Standalone interactive showcase
 * 5 canonical A-Level / IB Economics diagrams with mathematical precision.
 * Converted from uploaded JSX to TypeScript for the Lovable platform.
 */

import { useState } from "react";

// ── LAYOUT ENGINE ───────────────────────────────────────────────────────────

const SVG_W = 580;
const SVG_H = 430;
const PAD = { L: 70, R: 82, T: 42, B: 65 };
const PLOT_X0 = PAD.L;
const PLOT_Y0 = PAD.T;
const PLOT_X1 = SVG_W - PAD.R;
const PLOT_Y1 = SVG_H - PAD.B;
const PLOT_W = PLOT_X1 - PLOT_X0;
const PLOT_H = PLOT_Y1 - PLOT_Y0;
const D_MAX = 10;

const toS = (dx: number, dy: number): [number, number] => [
  PLOT_X0 + (dx / D_MAX) * PLOT_W,
  PLOT_Y1 - (dy / D_MAX) * PLOT_H,
];

function intersect(m1: number, b1: number, m2: number, b2: number): [number, number] | null {
  if (Math.abs(m1 - m2) < 1e-9) return null;
  const x = (b2 - b1) / (m1 - m2);
  return [x, m1 * x + b1];
}

function clipLine(m: number, b: number, xMin = 0, xMax = D_MAX, yMin = 0, yMax = D_MAX): [number, number][] {
  const pts: [number, number][] = [];
  const tryAdd = (x: number, y: number) => {
    if (x < xMin - 1e-9 || x > xMax + 1e-9) return;
    if (y < yMin - 1e-9 || y > yMax + 1e-9) return;
    const cx = Math.max(xMin, Math.min(xMax, x));
    const cy = Math.max(yMin, Math.min(yMax, y));
    if (!pts.some(p => Math.abs(p[0] - cx) < 0.005 && Math.abs(p[1] - cy) < 0.005)) {
      pts.push([cx, cy]);
    }
  };
  tryAdd(xMin, m * xMin + b);
  tryAdd(xMax, m * xMax + b);
  if (Math.abs(m) > 1e-9) {
    tryAdd(-b / m, yMin);
    tryAdd((yMax - b) / m, yMax);
  }
  return pts.sort((a, c) => a[0] - c[0]);
}

// ── COLOURS (semantic tokens where possible, fallback for SVG) ──────────

const C = {
  bg: "hsl(var(--background))",
  surface: "hsl(var(--card))",
  border: "hsl(var(--border))",
  grid: "hsl(228 36% 14%)",
  demand: "#4f8ef7",
  supply: "#ef5b5b",
  supply2: "#f5a623",
  lras: "#a78bfa",
  mr: "#f472b6",
  ac: "#34d399",
  mc: "#fb923c",
  eq1: "#4ade80",
  eq2: "#fbbf24",
  axis: "hsl(var(--muted-foreground))",
  muted: "hsl(var(--muted-foreground))",
  text: "hsl(var(--foreground))",
  wedge: "rgba(245,166,35,0.14)",
  profit: "rgba(74,222,128,0.12)",
};

const MONO = `'Courier New', 'Lucida Console', monospace`;

// ── SHARED SVG PRIMITIVES ───────────────────────────────────────────────

function GridLines() {
  return (
    <g>
      {Array.from({ length: D_MAX - 1 }, (_, i) => i + 1).map(i => {
        const [sx] = toS(i, 0);
        const [, sy] = toS(0, i);
        return (
          <g key={i}>
            <line x1={sx} y1={PLOT_Y0} x2={sx} y2={PLOT_Y1} stroke={C.grid} strokeWidth="1" />
            <line x1={PLOT_X0} y1={sy} x2={PLOT_X1} y2={sy} stroke={C.grid} strokeWidth="1" />
          </g>
        );
      })}
    </g>
  );
}

function Axes({ xLabel = "Quantity (Q)", yLabel = "Price (P)" }: { xLabel?: string; yLabel?: string }) {
  const midY = (PLOT_Y0 + PLOT_Y1) / 2;
  const midX = (PLOT_X0 + PLOT_X1) / 2;
  return (
    <g>
      <line x1={PLOT_X0} y1={PLOT_Y0 - 14} x2={PLOT_X0} y2={PLOT_Y1} stroke={C.axis} strokeWidth="2.2" />
      <polygon points={`${PLOT_X0},${PLOT_Y0 - 24} ${PLOT_X0 - 5},${PLOT_Y0 - 12} ${PLOT_X0 + 5},${PLOT_Y0 - 12}`} fill={C.axis} />
      <line x1={PLOT_X0} y1={PLOT_Y1} x2={PLOT_X1 + 14} y2={PLOT_Y1} stroke={C.axis} strokeWidth="2.2" />
      <polygon points={`${PLOT_X1 + 24},${PLOT_Y1} ${PLOT_X1 + 12},${PLOT_Y1 - 5} ${PLOT_X1 + 12},${PLOT_Y1 + 5}`} fill={C.axis} />
      <text x={PLOT_X0 - 14} y={PLOT_Y1 + 17} fill={C.muted} fontSize="13" fontFamily={MONO} textAnchor="middle">O</text>
      <text x={midX} y={SVG_H - 5} fill={C.axis} fontSize="13" fontWeight="600" fontFamily={MONO} textAnchor="middle">{xLabel}</text>
      <text x={14} y={midY} fill={C.axis} fontSize="13" fontWeight="600" fontFamily={MONO} textAnchor="middle" transform={`rotate(-90, 14, ${midY})`}>{yLabel}</text>
    </g>
  );
}

function SvgLine({ m, b, color, strokeWidth = 2.5, dash, label, xMin = 0, xMax = D_MAX }: {
  m: number; b: number; color: string; strokeWidth?: number; dash?: string; label?: string; xMin?: number; xMax?: number;
}) {
  const pts = clipLine(m, b, xMin, xMax);
  if (pts.length < 2) return null;
  const [sx1, sy1] = toS(pts[0][0], pts[0][1]);
  const [sx2, sy2] = toS(pts[pts.length - 1][0], pts[pts.length - 1][1]);
  return (
    <g>
      <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={dash} />
      {label && (
        <text x={sx2 + 8} y={sy2} fill={color} fontSize="13" fontWeight="700" fontFamily={MONO} textAnchor="start" dominantBaseline="middle">{label}</text>
      )}
    </g>
  );
}

function EqPoint({ dx, dy, label, color, pLabel, qLabel, labelDx = 10, labelDy = -14 }: {
  dx: number; dy: number; label?: string; color: string; pLabel?: string; qLabel?: string; labelDx?: number; labelDy?: number;
}) {
  const [sx, sy] = toS(dx, dy);
  const [, pAxisY] = toS(0, dy);
  const [qAxisX] = toS(dx, 0);
  const badgeW = label ? label.length * 7.5 + 12 : 0;

  return (
    <g>
      <line x1={PLOT_X0} y1={sy} x2={sx} y2={sy} stroke={color} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.62" />
      <line x1={sx} y1={PLOT_Y1} x2={sx} y2={sy} stroke={color} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.62" />
      <circle cx={sx} cy={sy} r="8.5" fill="hsl(var(--background))" stroke={color} strokeWidth="2.5" />
      <circle cx={sx} cy={sy} r="3.5" fill={color} />
      {label && (
        <>
          <rect x={sx + labelDx - 3} y={sy + labelDy - 10} width={badgeW} height="20" rx="4" fill="hsl(var(--card))" opacity="0.93" stroke={color} strokeWidth="0.5" />
          <text x={sx + labelDx + badgeW / 2 - 3} y={sy + labelDy} fill={color} fontSize="12" fontWeight="700" fontFamily={MONO} textAnchor="middle" dominantBaseline="middle">{label}</text>
        </>
      )}
      {pLabel && <text x={PLOT_X0 - 8} y={pAxisY} fill={color} fontSize="11" fontWeight="600" fontFamily={MONO} textAnchor="end" dominantBaseline="middle">{pLabel}</text>}
      {qLabel && <text x={qAxisX} y={PLOT_Y1 + 17} fill={color} fontSize="11" fontWeight="600" fontFamily={MONO} textAnchor="middle">{qLabel}</text>}
    </g>
  );
}

// ── DIAGRAM 1: SUPPLY & DEMAND ──────────────────────────────────────────

function DiagramSupplyDemand({ shift }: { shift: boolean }) {
  const mD = -0.8, mS = 0.7;
  const bD1 = 9, bD2 = 7, bS = 1;
  const e1 = intersect(mD, bD1, mS, bS);
  const e2 = shift ? intersect(mD, bD2, mS, bS) : null;

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full">
      <GridLines />
      <Axes />
      <SvgLine m={mS} b={bS} color={C.supply} label="S₁" />
      <SvgLine m={mD} b={bD1} color={C.demand} label="D₁" />
      {shift && <SvgLine m={mD} b={bD2} color={C.demand} dash="9,5" label="D₂" />}
      {e1 && <EqPoint dx={e1[0]} dy={e1[1]} label="E₁" color={C.eq1} pLabel="P₁" qLabel="Q₁" />}
      {e2 && <EqPoint dx={e2[0]} dy={e2[1]} label="E₂" color={C.eq2} pLabel="P₂" qLabel="Q₂" />}
    </svg>
  );
}

// ── DIAGRAM 2: INDIRECT TAX ─────────────────────────────────────────────

function DiagramIndirectTax({ taxAmt }: { taxAmt: number }) {
  const mD = -0.8, mS = 0.7;
  const bD = 9, bS1 = 1, bS2 = 1 + taxAmt;
  const e1 = intersect(mD, bD, mS, bS1);
  const e2 = intersect(mD, bD, mS, bS2);
  const pprice = e2 ? e2[1] - taxAmt : null;

  const [e1sx, e1sy] = e1 ? toS(e1[0], e1[1]) : [0, 0];
  const [e2sx, e2sy] = e2 ? toS(e2[0], e2[1]) : [0, 0];
  const [wedgeX] = e2 ? toS(e2[0], 0) : [0];
  const [, consumerSy] = e2 ? toS(0, e2[1]) : [0, 0];
  const [, producerSy] = pprice != null ? toS(0, pprice) : [0, 0];
  const [, s1AtQ2Sy] = e2 ? toS(0, mS * e2[0] + bS1) : [0, 0];
  const trianglePts = e1 && e2 ? `${e1sx},${e1sy} ${e2sx},${e2sy} ${e2sx},${s1AtQ2Sy}` : "";

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full">
      <GridLines />
      <Axes />
      {e2 && pprice != null && (
        <rect x={wedgeX - 30} y={consumerSy} width={60} height={Math.abs(producerSy - consumerSy)} fill={C.wedge} stroke={C.supply2} strokeWidth="1" strokeDasharray="4,3" />
      )}
      {trianglePts && <polygon points={trianglePts} fill="rgba(239,91,91,0.14)" stroke={C.supply} strokeWidth="1" strokeDasharray="4,3" />}
      <SvgLine m={mS} b={bS1} color={C.supply} label="S₁" />
      <SvgLine m={mS} b={bS2} color={C.supply2} label="S₁+tax" />
      <SvgLine m={mD} b={bD} color={C.demand} label="D₁" />
      {e1 && <EqPoint dx={e1[0]} dy={e1[1]} label="E₁" color={C.eq1} pLabel="P₁" qLabel="Q₁" labelDy={14} />}
      {e2 && <EqPoint dx={e2[0]} dy={e2[1]} label="E₂" color={C.eq2} pLabel="Pc" qLabel="Q₂" />}
      {e2 && pprice != null && (
        <g>
          <line x1={PLOT_X0} y1={producerSy} x2={wedgeX} y2={producerSy} stroke={C.supply} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.68" />
          <text x={PLOT_X0 - 8} y={producerSy} fill={C.supply} fontSize="11" fontWeight="600" fontFamily={MONO} textAnchor="end" dominantBaseline="middle">Pp</text>
          <text x={wedgeX + 40} y={(consumerSy + producerSy) / 2} fill={C.supply2} fontSize="11" fontWeight="700" fontFamily={MONO} textAnchor="start" dominantBaseline="middle">Tax = {taxAmt.toFixed(1)}</text>
          {e1 && <text x={(e1sx + e2sx) / 2 + 14} y={(e1sy + e2sy) / 2 + 10} fill={C.supply} fontSize="10" fontFamily={MONO} textAnchor="start" dominantBaseline="middle" opacity="0.8">Welfare loss</text>}
        </g>
      )}
    </svg>
  );
}

// ── DIAGRAM 3: AD / AS ──────────────────────────────────────────────────

function DiagramADAS({ adShift }: { adShift: boolean }) {
  const asHorizPL = 3;
  const asKinkY = 5;
  const mASup = 1.2;
  const bASup = asHorizPL - mASup * asKinkY;
  const lrasY = 8;
  const mAD = -0.7;
  const bAD1 = 5.5, bAD2 = 7.5;

  const e1x = (asHorizPL - bAD1) / mAD;
  const e1: [number, number] = [e1x, asHorizPL];
  const e2 = adShift ? intersect(mAD, bAD2, mASup, bASup) : null;

  const [asHStart_x, asHStart_y] = toS(0, asHorizPL);
  const [asKink_x, asKink_y] = toS(asKinkY, asHorizPL);
  const asUpPts = clipLine(mASup, bASup, asKinkY, D_MAX);
  const [asEnd_x, asEnd_y] = asUpPts.length >= 2 ? toS(asUpPts[asUpPts.length - 1][0], asUpPts[asUpPts.length - 1][1]) : [PLOT_X1, PLOT_Y0];
  const [lrasSx] = toS(lrasY, 0);

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full">
      <GridLines />
      <Axes xLabel="Real Output (Y)" yLabel="Price Level (P)" />
      <line x1={lrasSx} y1={PLOT_Y0} x2={lrasSx} y2={PLOT_Y1} stroke={C.lras} strokeWidth="2.5" />
      <text x={lrasSx + 7} y={PLOT_Y0 + 18} fill={C.lras} fontSize="13" fontWeight="700" fontFamily={MONO}>LRAS</text>
      <polyline points={`${asHStart_x},${asHStart_y} ${asKink_x},${asKink_y} ${asEnd_x},${asEnd_y}`} fill="none" stroke={C.supply} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <text x={asEnd_x + 7} y={asEnd_y} fill={C.supply} fontSize="13" fontWeight="700" fontFamily={MONO} dominantBaseline="middle">SRAS</text>
      <SvgLine m={mAD} b={bAD1} color={C.demand} label="AD₁" />
      {adShift && <SvgLine m={mAD} b={bAD2} color={C.demand} dash="9,5" label="AD₂" />}
      <EqPoint dx={e1[0]} dy={e1[1]} label="E₁" color={C.eq1} pLabel="PL₁" qLabel="Y₁" />
      {adShift && e2 && e2[0] > 0 && e2[0] < D_MAX && e2[1] > 0 && e2[1] < D_MAX && (
        <EqPoint dx={e2[0]} dy={e2[1]} label="E₂" color={C.eq2} pLabel="PL₂" qLabel="Y₂" />
      )}
    </svg>
  );
}

// ── DIAGRAM 4: MONOPOLY ─────────────────────────────────────────────────

function DiagramMonopoly() {
  const mAR = -0.8, bAR = 9;
  const mMR = -1.6, bMR = 9;
  const mMC = 0.5, bMC = 0.5;
  const acFn = (x: number) => 0.1 * x * x - 1.1 * x + 5;

  const qm = (bMR - bMC) / (mMC - mMR);
  const pm = mAR * qm + bAR;
  const acQm = acFn(qm);
  const mcQm = mMC * qm + bMC;

  const [qmSx] = toS(qm, 0);
  const [, pmSy] = toS(0, pm);
  const [, acSy] = toS(0, acQm);
  const [, mcDotSy] = toS(0, mcQm);

  const acPolyline = Array.from({ length: 97 }, (_, i) => {
    const x = 0.3 + i * (9.4 / 96);
    const y = acFn(x);
    if (y < 0 || y > D_MAX) return null;
    const [sx, sy] = toS(x, y);
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  }).filter(Boolean).join(" ");

  const acLabelX = 9.7, acLabelY = acFn(9.7);
  const profitRectX = PLOT_X0;
  const profitRectY = pmSy;
  const profitRectW = qmSx - PLOT_X0;
  const profitRectH = Math.abs(acSy - pmSy);

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full">
      <GridLines />
      <Axes />
      <rect x={profitRectX} y={profitRectY} width={profitRectW} height={profitRectH} fill={C.profit} stroke={C.eq1} strokeWidth="1.2" strokeDasharray="5,4" />
      <text x={profitRectX + profitRectW / 2} y={profitRectY + profitRectH / 2} fill={C.eq1} fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="middle" opacity="0.82">Supernormal Profit</text>
      <SvgLine m={mAR} b={bAR} color={C.demand} label="AR=D" />
      <SvgLine m={mMR} b={bMR} color={C.mr} label="MR" />
      <SvgLine m={mMC} b={bMC} color={C.mc} label="MC" />
      <polyline points={acPolyline} fill="none" stroke={C.ac} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {acLabelY >= 0 && acLabelY <= D_MAX && (() => {
        const [lx, ly] = toS(acLabelX, acLabelY);
        return <text x={lx + 7} y={ly} fill={C.ac} fontSize="13" fontWeight="700" fontFamily={MONO} dominantBaseline="middle">AC</text>;
      })()}
      <line x1={qmSx} y1={PLOT_Y1} x2={qmSx} y2={pmSy} stroke={C.eq2} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.62" />
      <line x1={PLOT_X0} y1={pmSy} x2={qmSx} y2={pmSy} stroke={C.eq2} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.62" />
      <line x1={PLOT_X0} y1={acSy} x2={qmSx} y2={acSy} stroke={C.ac} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.62" />
      <text x={qmSx} y={PLOT_Y1 + 17} fill={C.eq2} fontSize="11" fontWeight="600" fontFamily={MONO} textAnchor="middle">Qm</text>
      <text x={PLOT_X0 - 8} y={pmSy} fill={C.eq2} fontSize="11" fontWeight="600" fontFamily={MONO} textAnchor="end" dominantBaseline="middle">Pm</text>
      <text x={PLOT_X0 - 8} y={acSy} fill={C.ac} fontSize="11" fontWeight="600" fontFamily={MONO} textAnchor="end" dominantBaseline="middle">ACm</text>
      <circle cx={qmSx} cy={pmSy} r="8.5" fill="hsl(var(--background))" stroke={C.eq2} strokeWidth="2.5" />
      <circle cx={qmSx} cy={pmSy} r="3.5" fill={C.eq2} />
      <circle cx={qmSx} cy={mcDotSy} r="6.5" fill="hsl(var(--background))" stroke={C.mc} strokeWidth="2.2" />
      <circle cx={qmSx} cy={mcDotSy} r="2.5" fill={C.mc} />
      <text x={qmSx + 10} y={mcDotSy - 8} fill={C.mc} fontSize="10" fontFamily={MONO} textAnchor="start" dominantBaseline="middle" opacity="0.85">MR=MC</text>
    </svg>
  );
}

// ── DIAGRAM 5: PPC ──────────────────────────────────────────────────────

function DiagramPPC({ growthShift }: { growthShift: boolean }) {
  const r1 = 8, r2 = 9.5;
  const ppcY = (x: number, r: number) => Math.sqrt(Math.max(0, r * r - x * x));

  const buildCurve = (r: number) => {
    const steps = 90;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const x = (r / steps) * i;
      const y = ppcY(x, r);
      if (x > D_MAX || y > D_MAX) return null;
      const [sx, sy] = toS(x, y);
      return `${sx.toFixed(1)},${sy.toFixed(1)}`;
    }).filter(Boolean).join(" ");
  };

  const ppc1Pts = buildCurve(r1);
  const ppc2Pts = buildCurve(r2);
  const ptA: [number, number] = [5, ppcY(5, r1)];
  const ptB: [number, number] = [4, 4];
  const ptC: [number, number] = [6.5, 6.5];
  const [ppc1LabelSx, ppc1LabelSy] = toS(r1 + 0.05, 0.6);
  const [ppc2LabelSx, ppc2LabelSy] = toS(r2, 0.7);

  const KeyPoint = ({ dx, dy, color, lx = 10, ly = -14, children }: {
    dx: number; dy: number; color: string; lx?: number; ly?: number; children: React.ReactNode;
  }) => {
    const [sx, sy] = toS(dx, dy);
    return (
      <g>
        <circle cx={sx} cy={sy} r="8.5" fill="hsl(var(--background))" stroke={color} strokeWidth="2.5" />
        <circle cx={sx} cy={sy} r="3.5" fill={color} />
        <text x={sx + lx} y={sy + ly} fill={color} fontSize="11" fontWeight="700" fontFamily={MONO} dominantBaseline="middle">{children}</text>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full">
      <GridLines />
      <Axes xLabel="Good X (Capital Goods)" yLabel="Good Y (Consumer Goods)" />
      {growthShift && (
        <>
          <polyline points={ppc2Pts} fill="none" stroke={C.supply2} strokeWidth="2.5" strokeDasharray="9,5" strokeLinecap="round" />
          {ppc2LabelSy >= PLOT_Y0 && ppc2LabelSy <= PLOT_Y1 && (
            <text x={ppc2LabelSx + 8} y={ppc2LabelSy} fill={C.supply2} fontSize="13" fontWeight="700" fontFamily={MONO} dominantBaseline="middle">PPC₂</text>
          )}
        </>
      )}
      <polyline points={ppc1Pts} fill="none" stroke={C.supply} strokeWidth="2.5" strokeLinecap="round" />
      <text x={ppc1LabelSx + 8} y={ppc1LabelSy} fill={C.supply} fontSize="13" fontWeight="700" fontFamily={MONO} dominantBaseline="middle">PPC₁</text>
      <KeyPoint dx={ptA[0]} dy={ptA[1]} color={C.eq1} lx={10} ly={-14}>A · efficient</KeyPoint>
      <KeyPoint dx={ptB[0]} dy={ptB[1]} color={C.eq2} lx={10} ly={14}>B · inefficient</KeyPoint>
      <KeyPoint dx={ptC[0]} dy={ptC[1]} color={growthShift ? C.eq1 : C.muted} lx={10} ly={-14}>{growthShift ? "C · now attainable" : "C · unattainable"}</KeyPoint>
    </svg>
  );
}

// ── DIAGRAM REGISTRY ────────────────────────────────────────────────────

interface LegendEntry { color: string; label: string; dot?: boolean; filled?: boolean; dash?: boolean; line?: boolean; }

const DIAGRAMS = [
  { id: "sd", label: "Supply & Demand", sub: "Equilibrium & market shifts",
    legend: (shift: boolean): LegendEntry[] => [
      { color: C.demand, label: "Demand (D₁)", line: true },
      { color: C.supply, label: "Supply (S₁)", line: true },
      { color: C.eq1, label: "E₁ · original", dot: true },
      ...(shift ? [{ color: C.eq2, label: "E₂ · after shift", dot: true }] : []),
    ],
  },
  { id: "tax", label: "Indirect Tax", sub: "Specific tax, wedge & welfare loss",
    legend: (): LegendEntry[] => [
      { color: C.demand, label: "D₁", line: true },
      { color: C.supply, label: "S₁ (original)", line: true },
      { color: C.supply2, label: "S₁ + specific tax", line: true },
      { color: C.eq1, label: "E₁", dot: true },
      { color: C.eq2, label: "E₂ (consumer price)", dot: true },
    ],
  },
  { id: "adas", label: "AD / AS", sub: "Keynesian model with LRAS",
    legend: (shift: boolean): LegendEntry[] => [
      { color: C.demand, label: "AD", line: true },
      { color: C.supply, label: "SRAS", line: true },
      { color: C.lras, label: "LRAS", line: true },
      { color: C.eq1, label: "E₁", dot: true },
      ...(shift ? [{ color: C.eq2, label: "E₂", dot: true }] : []),
    ],
  },
  { id: "monopoly", label: "Monopoly", sub: "AR, MR, AC, MC & supernormal profit",
    legend: (): LegendEntry[] => [
      { color: C.demand, label: "AR = Demand", line: true },
      { color: C.mr, label: "MR", line: true },
      { color: C.mc, label: "MC", line: true },
      { color: C.ac, label: "AC", line: true },
      { color: C.eq1, label: "Supernormal profit", filled: true },
    ],
  },
  { id: "ppc", label: "PPC", sub: "Production Possibility Curve",
    legend: (shift: boolean): LegendEntry[] => [
      { color: C.supply, label: "PPC₁", line: true },
      ...(shift ? [{ color: C.supply2, label: "PPC₂ (growth)", dash: true }] : []),
      { color: C.eq1, label: "A · efficient", dot: true },
      { color: C.eq2, label: "B · inefficient", dot: true },
      { color: shift ? C.eq1 : C.muted, label: shift ? "C · attainable" : "C · unattainable", dot: true },
    ],
  },
];

// ── UI COMPONENTS ───────────────────────────────────────────────────────

function SidebarSection({ label, children, marginTop = 0 }: { label: string; children: React.ReactNode; marginTop?: number }) {
  return (
    <div style={{ marginTop }}>
      {marginTop > 0 && <div className="border-t border-border mb-4" />}
      <div className="text-[9px] text-muted-foreground tracking-[0.14em] mb-2.5 pl-2" style={{ fontFamily: MONO }}>{label}</div>
      {children}
    </div>
  );
}

function SidebarButton({ active, onClick, label, sub }: { active: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg px-3 py-2.5 mb-1 transition-all border ${
        active ? "bg-primary/10 border-primary/30" : "bg-transparent border-transparent hover:bg-muted/30"
      }`}
    >
      <div className={`text-xs font-bold ${active ? "text-primary" : "text-foreground"}`} style={{ fontFamily: MONO }}>{label}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5" style={{ fontFamily: MONO }}>{sub}</div>
    </button>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label onClick={() => onChange(!value)} className="flex items-center gap-2.5 cursor-pointer px-1 mb-2.5 select-none">
      <div className={`w-9 h-5 rounded-full relative transition-colors ${value ? "bg-primary" : "bg-border"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-[18px]" : "left-0.5"}`} />
      </div>
      <span className="text-[11px] text-muted-foreground" style={{ fontFamily: MONO }}>{label}</span>
    </label>
  );
}

function SliderControl({ label, value, min, max, step, color, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number; color: string; onChange: (v: number) => void; format: (v: number) => string;
}) {
  return (
    <div className="px-1 mb-2.5">
      <div className="text-[11px] text-muted-foreground mb-2" style={{ fontFamily: MONO }}>
        {label}: <strong style={{ color }}>{format(value)}</strong>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full" style={{ accentColor: color }} />
    </div>
  );
}

function LegendItem({ color, label, dot, filled, dash }: LegendEntry) {
  return (
    <div className="flex items-center gap-2">
      {dot ? (
        <div className="w-[11px] h-[11px] rounded-full shrink-0" style={{ background: color }} />
      ) : filled ? (
        <div className="w-[18px] h-[11px] rounded shrink-0" style={{ background: `${color}28`, border: `1px solid ${color}` }} />
      ) : (
        <svg width="22" height="4" className="shrink-0">
          <line x1="0" y1="2" x2="22" y2="2" stroke={color} strokeWidth="2.5" strokeDasharray={dash ? "7,4" : undefined} strokeLinecap="round" />
        </svg>
      )}
      <span className="text-[10px] text-muted-foreground" style={{ fontFamily: MONO }}>{label}</span>
    </div>
  );
}

// ── ROOT COMPONENT ──────────────────────────────────────────────────────

export default function EconomicsDiagramShowcase() {
  const [active, setActive] = useState("sd");
  const [sdShift, setSdShift] = useState(false);
  const [taxAmt, setTaxAmt] = useState(2);
  const [adShift, setAdShift] = useState(false);
  const [growthShift, setGrowthShift] = useState(false);

  const diagram = DIAGRAMS.find(d => d.id === active);
  const toggleMap: Record<string, boolean> = { sd: sdShift, adas: adShift, ppc: growthShift };
  const legend = diagram?.legend(toggleMap[active] ?? false) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: MONO }}>
      {/* Header */}
      <div className="border-b border-border px-6 py-3.5 flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-[9px] flex items-center justify-center text-xl shrink-0" style={{ background: "linear-gradient(135deg, #3b5ef7, #8b3cf7)" }}>📊</div>
        <div>
          <div className="text-[13px] font-bold tracking-[0.1em]">ECONOMICS DIAGRAM LIBRARY</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">A-Level · IB · Canonical Templates · Mathematically Precise</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[220px] border-r border-border px-2.5 py-4 shrink-0 overflow-y-auto">
          <SidebarSection label="DIAGRAM TYPE">
            {DIAGRAMS.map(d => (
              <SidebarButton key={d.id} active={active === d.id} onClick={() => setActive(d.id)} label={d.label} sub={d.sub} />
            ))}
          </SidebarSection>

          <SidebarSection label="CONTROLS" marginTop={24}>
            {active === "sd" && <Toggle label="Demand shift (decrease)" value={sdShift} onChange={setSdShift} />}
            {active === "tax" && <SliderControl label="Tax size" value={taxAmt} min={0.5} max={4} step={0.5} color={C.supply2} onChange={setTaxAmt} format={v => v.toFixed(1)} />}
            {active === "adas" && <Toggle label="AD shift right" value={adShift} onChange={setAdShift} />}
            {active === "ppc" && <Toggle label="Economic growth (PPC₂)" value={growthShift} onChange={setGrowthShift} />}
            {active === "monopoly" && <div className="text-[10px] text-muted-foreground px-1 leading-relaxed" style={{ fontFamily: MONO }}>Static · profit max at MR = MC</div>}
          </SidebarSection>
        </div>

        {/* Diagram area */}
        <div className="flex-1 flex flex-col p-5 overflow-auto">
          <div className="mb-3.5">
            <div className="text-[15px] font-bold tracking-[0.08em]">{diagram?.label?.toUpperCase()}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{diagram?.sub}</div>
          </div>

          <div className="flex-1 min-h-[380px] bg-card rounded-xl border border-border p-2 overflow-hidden">
            {active === "sd" && <DiagramSupplyDemand shift={sdShift} />}
            {active === "tax" && <DiagramIndirectTax taxAmt={taxAmt} />}
            {active === "adas" && <DiagramADAS adShift={adShift} />}
            {active === "monopoly" && <DiagramMonopoly />}
            {active === "ppc" && <DiagramPPC growthShift={growthShift} />}
          </div>

          <div className="mt-3.5 flex flex-wrap gap-x-[18px] gap-y-2">
            {legend.map((item, i) => <LegendItem key={i} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
