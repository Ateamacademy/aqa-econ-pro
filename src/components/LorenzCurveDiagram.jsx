/**
 * LorenzCurveDiagram.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * DO NOT let an AI regenerate this file. All curve equations are verified.
 *
 * WHAT THIS SHOWS:
 *   - 45° Line of Perfect Equality (diagonal from origin to top-right)
 *   - Country A Lorenz curve: closer to equality (less inequality)
 *   - Country B Lorenz curve: further from equality (more inequality)
 *   - Gini coefficient regions: Area A (between line and curve) and
 *     Area B (below curve), where Gini = A / (A + B)
 *   - Reference lines at 20% and 60% population
 *
 * ─── VERIFIED MATHS ─────────────────────────────────────────────────────────
 *
 *   Lorenz curves use power functions: y = x^n, where x,y ∈ [0,1]
 *   Both curves pass through (0,0) and (1,1) exactly ✓
 *   Both curves are convex to the origin (bow downward) for n > 1 ✓
 *
 *   Country A (more equal):   y = x^1.8
 *     Gini_A = (n-1)/(n+1) = 0.8/2.8 ≈ 0.286
 *     At x=0.4: y = 0.4^1.8 ≈ 0.224  (bottom 40% earn ~22% of income)
 *
 *   Country B (more unequal): y = x^3.5
 *     Gini_B = (n-1)/(n+1) = 2.5/4.5 ≈ 0.556
 *     At x=0.4: y = 0.4^3.5 ≈ 0.040  (bottom 40% earn ~4% of income)
 *
 *   Gini_A < Gini_B ✓  (Country A more equal as required)
 *   Country A curve is always above Country B curve ✓ (for all x ∈ (0,1))
 *
 * CRITICAL SHAPE RULE:
 *   Lorenz curves are CONVEX to the origin · they sag BELOW the 45° line.
 *   They must NOT be concave (hump-shaped). This is enforced by n > 1.
 *
 * AXES (AQA A-Level standard):
 *   X-axis: "Cumulative % of Population (poorest → richest)"
 *   Y-axis: "Cumulative % of Income"
 *   Both axes run 0 → 100%
 *
 * USAGE: <LorenzCurveDiagram />
 */

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ECONOMICS CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

// Lorenz curve functions · input/output in [0,1], multiply by 100 for display
const lorenzA = x => Math.pow(x, 1.8);   // Country A (more equal)
const lorenzB = x => Math.pow(x, 3.5);   // Country B (more unequal)

// Gini coefficients · exact formula for y = x^n: Gini = (n-1)/(n+1)
const GINI_A = (1.8 - 1) / (1.8 + 1);   // ≈ 0.286
const GINI_B = (3.5 - 1) / (3.5 + 1);   // ≈ 0.556

// ─────────────────────────────────────────────────────────────────────────────
// SVG LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

const SVG_W = 580, SVG_H = 540;
const PAD   = { L: 72, R: 50, T: 44, B: 70 };
const PW    = SVG_W - PAD.L - PAD.R;   // plot width  = 458
const PH    = SVG_H - PAD.T - PAD.B;   // plot height = 426
const X0    = PAD.L;                    // left edge of plot
const Y0    = PAD.T;                    // top edge of plot
const Y1    = PAD.T + PH;              // bottom edge of plot

const MONO  = "'Courier New','Lucida Console',monospace";

// Data [0,100] → SVG pixels (origin = bottom-left of plot)
const toS = (px, py) => [
  X0 + (px / 100) * PW,
  Y1 - (py / 100) * PH,
];

const C = {
  bg:       "#0b0f1a",
  surface:  "#101827",
  border:   "#1d2c40",
  grid:     "#111925",
  equality: "#dde4ef",   // 45° line of perfect equality (white/light)
  countryA: "#4ade80",   // Country A curve (green · more equal)
  countryB: "#f5a623",   // Country B curve (orange · more unequal)
  giniA:    "rgba(74,222,128,0.12)",   // Gini A shading
  giniB:    "rgba(245,166,35,0.10)",   // Gini B shading
  ref:      "#8292a4",   // reference lines
  axis:     "#8292a4",
  muted:    "#4a5568",
  text:     "#dde4ef",
};

// ─────────────────────────────────────────────────────────────────────────────
// CURVE SAMPLING
// ─────────────────────────────────────────────────────────────────────────────

/** Sample a Lorenz function fn(x∈[0,1]) → SVG polyline string */
function sampleCurve(fn, n = 200) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const x  = i / n;
    const y  = fn(x);
    const [sx, sy] = toS(x * 100, y * 100);
    return `${sx.toFixed(2)},${sy.toFixed(2)}`;
  }).join(" ");
}

/**
 * Build a filled polygon for the Gini shading between two curves.
 * Goes forward along the top curve then backward along the bottom curve.
 */
function buildGiniPolygon(topFn, bottomFn, n = 200) {
  const fwd = Array.from({ length: n + 1 }, (_, i) => {
    const x = i / n;
    const [sx, sy] = toS(x * 100, topFn(x) * 100);
    return `${sx.toFixed(2)},${sy.toFixed(2)}`;
  });
  const bwd = Array.from({ length: n + 1 }, (_, i) => {
    const x = 1 - i / n;
    const [sx, sy] = toS(x * 100, bottomFn(x) * 100);
    return `${sx.toFixed(2)},${sy.toFixed(2)}`;
  });
  return [...fwd, ...bwd].join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function GridLines() {
  // Grid at 20% intervals
  const ticks = [20, 40, 60, 80];
  return (
    <g>
      {ticks.map(t => {
        const [sx]  = toS(t, 0);
        const [, sy] = toS(0, t);
        return (
          <g key={t}>
            <line x1={sx} y1={Y0} x2={sx} y2={Y1}
              stroke={C.grid} strokeWidth="1" />
            <line x1={X0} y1={sy} x2={X0 + PW} y2={sy}
              stroke={C.grid} strokeWidth="1" />
            {/* Tick labels */}
            <text x={sx} y={Y1 + 18} fill={C.muted} fontSize="11"
              fontFamily={MONO} textAnchor="middle">{t}%</text>
            <text x={X0 - 8} y={sy} fill={C.muted} fontSize="11"
              fontFamily={MONO} textAnchor="end" dominantBaseline="middle">{t}%</text>
          </g>
        );
      })}
      {/* 100% labels */}
      {(() => {
        const [sx100] = toS(100, 0);
        const [, sy100] = toS(0, 100);
        return (
          <>
            <text x={sx100} y={Y1 + 18} fill={C.muted} fontSize="11"
              fontFamily={MONO} textAnchor="middle">100%</text>
            <text x={X0 - 8} y={sy100} fill={C.muted} fontSize="11"
              fontFamily={MONO} textAnchor="end" dominantBaseline="middle">100%</text>
          </>
        );
      })()}
    </g>
  );
}

function Axes() {
  const midX = X0 + PW / 2;
  const midY = Y0 + PH / 2;
  return (
    <g>
      {/* Y axis */}
      <line x1={X0} y1={Y0 - 14} x2={X0} y2={Y1}
        stroke={C.axis} strokeWidth="2.2" />
      <polygon
        points={`${X0},${Y0 - 24} ${X0 - 5},${Y0 - 12} ${X0 + 5},${Y0 - 12}`}
        fill={C.axis}
      />
      {/* X axis */}
      <line x1={X0} y1={Y1} x2={X0 + PW + 14} y2={Y1}
        stroke={C.axis} strokeWidth="2.2" />
      <polygon
        points={`${X0 + PW + 24},${Y1} ${X0 + PW + 12},${Y1 - 5} ${X0 + PW + 12},${Y1 + 5}`}
        fill={C.axis}
      />
      {/* Origin */}
      <text x={X0 - 12} y={Y1 + 18} fill={C.muted} fontSize="11"
        fontFamily={MONO} textAnchor="middle">0</text>
      {/* Axis labels */}
      <text x={midX} y={SVG_H - 4} fill={C.axis} fontSize="12" fontWeight="600"
        fontFamily={MONO} textAnchor="middle">
        Cumulative % of Population (poorest → richest)
      </text>
      <text x={13} y={midY} fill={C.axis} fontSize="12" fontWeight="600"
        fontFamily={MONO} textAnchor="middle"
        transform={`rotate(-90, 13, ${midY})`}>
        Cumulative % of Income
      </text>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DIAGRAM
// ─────────────────────────────────────────────────────────────────────────────

function DiagramSVG({ showGini, showRef }) {
  // Pre-compute all polylines
  const equalityLine = `${toS(0, 0).join(",")  } ${toS(100, 100).join(",")}`;
  const curveAPts    = sampleCurve(lorenzA);
  const curveBPts    = sampleCurve(lorenzB);

  // Gini shading polygons
  // Region between equality line and Country B (total area = A+B)
  const totalRegion  = buildGiniPolygon(x => x, lorenzB);
  // Region between Country A and Country B (= A shading for A)
  // Region between equality and Country A
  const giniARegion  = buildGiniPolygon(x => x, lorenzA);
  // Region between Country A and Country B
  const giniBRegion  = buildGiniPolygon(lorenzA, lorenzB);

  // Reference point labels: 20% population
  const refX = 20;
  const [refSx]     = toS(refX, 0);
  const [, refSyEq] = toS(0, refX);           // on equality line: y=x
  const [, refSyA]  = toS(0, lorenzA(0.2) * 100);
  const [, refSyB]  = toS(0, lorenzB(0.2) * 100);

  // Gini region label positions
  const [gALx, gALy] = toS(38, 68);  // centre of "A" region (between line and A curve)
  const [gBLx, gBLy] = toS(55, 30);  // centre of "B" region (between A and B curve)

  // Curve label positions
  const [eqLx, eqLy]  = toS(72, 76);
  const [aLx, aLy]    = toS(78, lorenzA(0.78) * 100 - 4);
  const [bLx, bLy]    = toS(82, lorenzB(0.82) * 100 - 4);

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: "100%", display: "block" }}>
      <GridLines />
      <Axes />

      {/* ── Gini shading (drawn first, behind curves) ───────────────── */}
      {showGini && (
        <>
          {/* Region A: between equality line and Country A */}
          <polygon points={giniARegion}
            fill={C.giniA}
            stroke="none" />
          {/* Region B: between Country A and Country B */}
          <polygon points={giniBRegion}
            fill={C.giniB}
            stroke="none" />
          {/* Labels A and B */}
          <text x={gALx} y={gALy} fill={C.countryA} fontSize="20" fontWeight="700"
            fontFamily={MONO} textAnchor="middle" dominantBaseline="middle"
            opacity="0.7">A</text>
          <text x={gBLx} y={gBLy} fill={C.countryB} fontSize="20" fontWeight="700"
            fontFamily={MONO} textAnchor="middle" dominantBaseline="middle"
            opacity="0.7">B</text>
          {/* Gini formulas */}
          {(() => {
            const [fx, fy] = toS(24, 84);
            return (
              <>
                <text x={fx} y={fy} fill={C.countryA} fontSize="10"
                  fontFamily={MONO} textAnchor="start">
                  {`Gini (Country A) = A/(A+B) ≈ ${GINI_A.toFixed(2)}`}
                </text>
                <text x={fx} y={fy + 16} fill={C.countryB} fontSize="10"
                  fontFamily={MONO} textAnchor="start">
                  {`Gini (Country B) = A/(A+B) ≈ ${GINI_B.toFixed(2)}`}
                </text>
              </>
            );
          })()}
        </>
      )}

      {/* ── Reference lines at 20% population ───────────────────────── */}
      {showRef && (
        <g>
          {/* Vertical at 20% */}
          <line x1={refSx} y1={Y1} x2={refSx} y2={refSyEq}
            stroke={C.ref} strokeWidth="1.2" strokeDasharray="5,4" opacity="0.55" />
          {/* Horizontal at equality level */}
          <line x1={X0} y1={refSyEq} x2={refSx} y2={refSyEq}
            stroke={C.equality} strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
          {/* Horizontal at Country A level */}
          <line x1={X0} y1={refSyA} x2={refSx} y2={refSyA}
            stroke={C.countryA} strokeWidth="1" strokeDasharray="4,4" opacity="0.55" />
          {/* Horizontal at Country B level */}
          <line x1={X0} y1={refSyB} x2={refSx} y2={refSyB}
            stroke={C.countryB} strokeWidth="1" strokeDasharray="4,4" opacity="0.55" />
          {/* Y-axis labels */}
          <text x={X0 - 8} y={refSyEq} fill={C.equality} fontSize="10"
            fontFamily={MONO} textAnchor="end" dominantBaseline="middle">20%</text>
          <text x={X0 - 8} y={refSyA} fill={C.countryA} fontSize="10"
            fontFamily={MONO} textAnchor="end" dominantBaseline="middle">
            {`${(lorenzA(0.2) * 100).toFixed(0)}%`}
          </text>
          <text x={X0 - 8} y={refSyB} fill={C.countryB} fontSize="10"
            fontFamily={MONO} textAnchor="end" dominantBaseline="middle">
            {`${(lorenzB(0.2) * 100).toFixed(0)}%`}
          </text>
        </g>
      )}

      {/* ── Country B curve (drawn first, underneath A) ──────────────── */}
      <polyline points={curveBPts} fill="none"
        stroke={C.countryB} strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" />
      <text x={bLx} y={bLy} fill={C.countryB} fontSize="12" fontWeight="700"
        fontFamily={MONO} textAnchor="start" dominantBaseline="middle">
        Country B
      </text>

      {/* ── Country A curve ──────────────────────────────────────────── */}
      <polyline points={curveAPts} fill="none"
        stroke={C.countryA} strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" />
      <text x={aLx} y={aLy} fill={C.countryA} fontSize="12" fontWeight="700"
        fontFamily={MONO} textAnchor="start" dominantBaseline="middle">
        Country A
      </text>

      {/* ── 45° Line of Perfect Equality (drawn on top) ─────────────── */}
      <line
        x1={toS(0, 0)[0]} y1={toS(0, 0)[1]}
        x2={toS(100, 100)[0]} y2={toS(100, 100)[1]}
        stroke={C.equality} strokeWidth="2.2"
        strokeDasharray="none"
      />
      {/* Label rotated along the line */}
      <text x={eqLx - 8} y={eqLy + 14} fill={C.equality} fontSize="11"
        fontWeight="600" fontFamily={MONO} textAnchor="middle"
        transform={`rotate(-45, ${eqLx - 8}, ${eqLy + 14})`}>
        Line of Perfect Equality (45°)
      </text>

      {/* ── Origin dot ────────────────────────────────────────────────── */}
      {(() => {
        const [ox, oy] = toS(0, 0);
        return <circle cx={ox} cy={oy} r="4" fill={C.axis} />;
      })()}

      {/* ── Top-right corner dot (all curves meet at 100,100) ────────── */}
      {(() => {
        const [cx, cy] = toS(100, 100);
        return <circle cx={cx} cy={cy} r="4" fill={C.equality} />;
      })()}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function LorenzCurveDiagram() {
  const [showGini, setShowGini] = useState(true);
  const [showRef,  setShowRef]  = useState(false);

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: MONO,
      color: C.text,
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg,#3b5ef7,#8b3cf7)",
            borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, flexShrink: 0,
          }}>📊</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
              LORENZ CURVE & GINI COEFFICIENT
            </div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
              Country A (Gini ≈ {GINI_A.toFixed(2)}) vs Country B (Gini ≈ {GINI_B.toFixed(2)})
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12 }}>
          <Toggle label="Show Gini regions (A & B)"
            value={showGini} color="#4ade80"
            onChange={() => setShowGini(v => !v)} />
          <Toggle label="Show 20% reference lines"
            value={showRef} color="#8292a4"
            onChange={() => setShowRef(v => !v)} />
        </div>
      </div>

      {/* Diagram */}
      <div style={{ flex: 1, padding: "12px 16px" }}>
        <div style={{
          background: C.surface,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          padding: "6px 2px 2px 0",
        }}>
          <DiagramSVG showGini={showGini} showRef={showRef} />
        </div>

        {/* Legend */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: "6px 20px", marginTop: 12, paddingLeft: 6,
        }}>
          {[
            { color: C.equality, label: "45° Line of Perfect Equality", dash: false },
            { color: C.countryA, label: `Country A · Gini ≈ ${GINI_A.toFixed(2)} (more equal)`, dash: false },
            { color: C.countryB, label: `Country B · Gini ≈ ${GINI_B.toFixed(2)} (more unequal)`, dash: false },
            { color: C.countryA, label: "Area A · between equality line and Lorenz curve", filled: true },
            { color: C.countryB, label: "Area B · between curve and x-axis", filled: true },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              {item.filled ? (
                <div style={{
                  width: 18, height: 11, borderRadius: 3,
                  background: `${item.color}28`,
                  border: `1px solid ${item.color}`,
                  flexShrink: 0,
                }} />
              ) : (
                <svg width="22" height="4" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="2" x2="22" y2="2"
                    stroke={item.color} strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={item.dash ? "6,3" : undefined} />
                </svg>
              )}
              <span style={{ fontSize: 10, color: C.muted }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Key concepts */}
        <div style={{
          marginTop: 10, padding: "9px 14px",
          background: C.surface,
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          fontSize: 10, color: C.muted,
          lineHeight: 1.75, fontFamily: MONO,
        }}>
          <strong style={{ color: C.text }}>Gini coefficient = A ÷ (A + B)</strong>
          {" · "}
          where A is the area between the 45° equality line and the Lorenz curve,
          and (A+B) is the total area of the triangle below the equality line.
          {" "}
          Country A (Gini ≈ {GINI_A.toFixed(2)}) has a LOWER Gini → more equal income distribution.
          Country B (Gini ≈ {GINI_B.toFixed(2)}) has a HIGHER Gini → less equal distribution.
          A Gini of 0 = perfect equality (curve IS the 45° line).
          A Gini of 1 = perfect inequality (one person owns everything).
          Lorenz curves are always CONVEX to the origin · they must sag BELOW
          the 45° line, never above it and never hump-shaped.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOGGLE HELPER
// ─────────────────────────────────────────────────────────────────────────────

function Toggle({ label, value, color, onChange }) {
  return (
    <label onClick={onChange} style={{
      display: "flex", alignItems: "center", gap: 8,
      cursor: "pointer", userSelect: "none",
    }}>
      <div style={{
        width: 34, height: 19, borderRadius: 10,
        position: "relative",
        background: value ? color : "#1d2c40",
        transition: "background 0.2s",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute",
          top: 2, left: value ? 17 : 2,
          width: 15, height: 15,
          borderRadius: "50%",
          background: "white",
          transition: "left 0.2s",
        }} />
      </div>
      <span style={{ fontSize: 10, color: value ? color : "#4a5568" }}>{label}</span>
    </label>
  );
}
