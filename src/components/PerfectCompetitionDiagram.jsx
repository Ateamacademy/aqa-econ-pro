/**
 * PerfectCompetitionDiagram.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * DO NOT let an AI regenerate this file. All curve equations are mathematically
 * verified. Edit only the ECONOMICS CONSTANTS section if you need to adjust values.
 *
 * WHAT THIS SHOWS:
 *  LEFT PANEL  · Industry: D, S₀ (original supply), S₁ (post-entry supply)
 *  RIGHT PANEL · Firm: MC, AC, AR=MR line (horizontal, set by market)
 *
 *  Short run: high price P → AR=MR=P above min AC → supernormal profit (shaded)
 *  Long run:  new firms enter → S shifts right → price falls to P₁ = min AC
 *             → AR=MR=P₁ tangent to AC minimum → normal profit only
 *
 * VERIFIED MATHS:
 *  MC  = 0.5x² − 3.5x + 10   →  min at x=3.5 (MC=3.875)
 *  AC  = 0.3x² − 2.4x + 8.8  →  min at x=4.0 (AC=4.0 = P_LR ✓)
 *  MC = AC at x=4 ✓ (necessary condition for min AC)
 *  MC = P_SR=6.5 at x≈5.79 (q_SR, upward portion ✓)
 *  AC(q_SR)≈4.97 < P_SR=6.5  →  supernormal profit ✓
 *  P_LR=4.0 = min AC ✓        →  normal profit in LR ✓
 *
 * USAGE: <PerfectCompetitionDiagram />
 */

import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ECONOMICS CONSTANTS · edit only here if adjusting values
// ─────────────────────────────────────────────────────────────────────────────

const P_SR = 6.5;    // short-run market price (firm's AR=MR in SR)
const P_LR = 4.0;    // long-run price = min AC (verified: ACfn(4)=4.0)
const q_SR = 5.791;  // firm SR output where MC=P_SR (verified below)
const q_LR = 4.0;    // firm LR output where MC=AC=P_LR

// FIRM curves (x = firm quantity, domain roughly 0–8)
const MCfn  = x => 0.5 * x * x - 3.5 * x + 10;   // U-shaped, min at x=3.5
const ACfn  = x => 0.3 * x * x - 2.4 * x + 8.8;  // U-shaped, min at x=4 (=P_LR)
// Verify: MCfn(4)=0.5*16-14+10=4 ✓, ACfn(4)=0.3*16-9.6+8.8=4 ✓

const AC_at_qSR = ACfn(q_SR);  // ≈ 4.972 · bottom of profit rectangle

// INDUSTRY curves (x = market quantity, domain 0–10)
// D passes through (5, P_SR=6.5) and (8, P_LR=4.0)
// slope = (4-6.5)/(8-5) = -5/6
const Dfn   = x => (-5 / 6) * x + 10.6667;       // Verify: D(5)≈6.5 ✓, D(8)≈4 ✓
// S₀ passes through (5, 6.5) slope=1
const S0fn  = x => x + 1.5;                        // Verify: S0(5)=6.5 ✓
// S₁ passes through (8, 4.0) slope=1 (same slope = parallel shift right)
const S1fn  = x => x - 4.0;                        // Verify: S1(8)=4.0 ✓

// Industry quantities at each equilibrium
const Q_SR = 5;    // D(5)=6.5 ✓, S0(5)=6.5 ✓ · market output in SR
const Q_LR = 8;    // D(8)=4.0 ✓, S1(8)=4.0 ✓ · market output in LR (more firms)

// ─────────────────────────────────────────────────────────────────────────────
// SVG LAYOUT · two panels sharing the same y-scale for price alignment
// ─────────────────────────────────────────────────────────────────────────────

const SVG_W = 900, SVG_H = 510;
const MONO = "'Courier New', 'Lucida Console', monospace";

// Plot areas · BOTH must have same y0, y1 so prices align horizontally
const L = { x0: 58, x1: 400, y0: 38, y1: 440 };  // Industry (left)
const R = { x0: 500, x1: 855, y0: 38, y1: 440 };  // Firm (right)
const PH = L.y1 - L.y0;  // 402 · shared vertical scale

// Data → SVG pixel
const toL = (dx, dy) => [
  L.x0 + (dx / 10) * (L.x1 - L.x0),
  L.y1 - (dy / 10) * PH,
];
const toR = (dx, dy) => [
  R.x0 + (dx / 10) * (R.x1 - R.x0),
  R.y1 - (dy / 10) * PH,
];

// ─────────────────────────────────────────────────────────────────────────────
// COLOUR PALETTE
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg:      "#0b0f1a",
  surface: "#101827",
  border:  "#1d2c40",
  grid:    "#111925",
  demand:  "#4f8ef7",   // D curve (blue)
  s0:      "#ef5b5b",   // S₀ original supply (red)
  s1:      "#f5a623",   // S₁ shifted supply (orange)
  mc:      "#f5a623",   // MC (orange)
  ac:      "#34d399",   // AC (teal)
  mr_sr:   "#4f8ef7",   // AR=MR short-run (blue)
  mr_lr:   "#a78bfa",   // AR=MR long-run (purple)
  eq_sr:   "#4ade80",   // SR equilibrium dot (green)
  eq_lr:   "#fbbf24",   // LR equilibrium dot (gold)
  profit:  "rgba(74,222,128,0.13)",
  axis:    "#8292a4",
  muted:   "#4a5568",
  text:    "#dde4ef",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Sample a function into a polyline string for the LEFT panel */
function sampleL(fn, x0, x1, steps = 100) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = x0 + (x1 - x0) * (i / steps);
    const y = fn(x);
    if (y < -0.1 || y > 10.6) return null;
    const [sx, sy] = toL(x, Math.min(Math.max(y, 0), 10.5));
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  }).filter(Boolean).join(" ");
}

/** Sample a function into a polyline string for the RIGHT panel */
function sampleR(fn, x0, x1, steps = 100) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = x0 + (x1 - x0) * (i / steps);
    const y = fn(x);
    if (y < -0.1 || y > 10.6) return null;
    const [sx, sy] = toR(x, Math.min(Math.max(y, 0), 10.5));
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  }).filter(Boolean).join(" ");
}

/** Draw axes with arrow heads for one panel */
function PanelAxes({ panel, xLabel, yLabel }) {
  const p = panel;
  const midX = (p.x0 + p.x1) / 2;
  const midY = (p.y0 + p.y1) / 2;
  return (
    <g>
      {/* Y axis */}
      <line x1={p.x0} y1={p.y0 - 12} x2={p.x0} y2={p.y1}
        stroke={C.axis} strokeWidth="2" />
      <polygon
        points={`${p.x0},${p.y0 - 22} ${p.x0 - 5},${p.y0 - 10} ${p.x0 + 5},${p.y0 - 10}`}
        fill={C.axis}
      />
      {/* X axis */}
      <line x1={p.x0} y1={p.y1} x2={p.x1 + 12} y2={p.y1}
        stroke={C.axis} strokeWidth="2" />
      <polygon
        points={`${p.x1 + 22},${p.y1} ${p.x1 + 10},${p.y1 - 5} ${p.x1 + 10},${p.y1 + 5}`}
        fill={C.axis}
      />
      {/* Labels */}
      <text x={midX} y={p.y1 + 32} fill={C.axis} fontSize="12"
        fontWeight="600" fontFamily={MONO} textAnchor="middle">{xLabel}</text>
      <text x={p.x0 - 40} y={midY} fill={C.axis} fontSize="12"
        fontWeight="600" fontFamily={MONO} textAnchor="middle"
        transform={`rotate(-90, ${p.x0 - 40}, ${midY})`}>{yLabel}</text>
      {/* O label */}
      <text x={p.x0 - 14} y={p.y1 + 16} fill={C.muted} fontSize="12"
        fontFamily={MONO} textAnchor="middle">O</text>
    </g>
  );
}

/** Dashed horizontal reference line across both panels at a given price */
function PriceAlignLine({ price, color }) {
  // Y pixel is the same in both panels because PH and y1 are shared
  const [, sy] = toL(0, price);
  return (
    <line
      x1={L.x0} y1={sy} x2={R.x1} y2={sy}
      stroke={color} strokeWidth="1" strokeDasharray="4,4" opacity="0.35"
    />
  );
}

/** Equilibrium dot with optional axis tick labels */
function EqDot({ toPixel, dx, dy, color, radius = 8, pLabel, qLabel, panel }) {
  const [sx, sy] = toPixel(dx, dy);
  const p = panel;
  const [qsx]  = toPixel(dx, 0);
  const [, psy] = toPixel(0, dy);
  return (
    <g>
      {/* Dashed ref to y-axis */}
      <line x1={p.x0} y1={sy} x2={sx} y2={sy}
        stroke={color} strokeWidth="1.2" strokeDasharray="5,4" opacity="0.55" />
      {/* Dashed ref to x-axis */}
      <line x1={sx} y1={p.y1} x2={sx} y2={sy}
        stroke={color} strokeWidth="1.2" strokeDasharray="5,4" opacity="0.55" />
      {/* Dot */}
      <circle cx={sx} cy={sy} r={radius + 1} fill={C.bg} stroke={color} strokeWidth="2.5" />
      <circle cx={sx} cy={sy} r={radius * 0.42} fill={color} />
      {/* Axis labels */}
      {pLabel && (
        <text x={p.x0 - 7} y={psy} fill={color} fontSize="11"
          fontWeight="700" fontFamily={MONO} textAnchor="end" dominantBaseline="middle">
          {pLabel}
        </text>
      )}
      {qLabel && (
        <text x={qsx} y={p.y1 + 17} fill={color} fontSize="11"
          fontWeight="700" fontFamily={MONO} textAnchor="middle">
          {qLabel}
        </text>
      )}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRY PANEL
// ─────────────────────────────────────────────────────────────────────────────

function IndustryPanel({ showLR }) {
  // Grid
  const gridLines = Array.from({ length: 9 }, (_, i) => {
    const [sx] = toL(i + 1, 0);
    const [, sy] = toL(0, i + 1);
    return <g key={i}>
      <line x1={sx} y1={L.y0} x2={sx} y2={L.y1} stroke={C.grid} strokeWidth="1" />
      <line x1={L.x0} y1={sy} x2={L.x1} y2={sy} stroke={C.grid} strokeWidth="1" />
    </g>;
  });

  // D: draw from x=0 (y=10.667 → clip at 10) to x=8 (y=4)
  const dPts = sampleL(Dfn, 0, 8.2);

  // S₀: draw from x=0 (y=1.5) to where it exits top (y=10 → x=8.5)
  const s0Pts = sampleL(S0fn, 0, 8.5);

  // S₁: draw from x=4 (y=0) upward
  const s1Pts = sampleL(S1fn, 4.0, 9.5);

  // Equilibrium pixels
  const [srX, srY] = toL(Q_SR, P_SR);
  const [lrX, lrY] = toL(Q_LR, P_LR);

  // Horizontal arrow showing supply shift (between S₀ and S₁ at mid-price)
  const arrowY_data = 7.5;
  const [arrSx] = toL(5.8, arrowY_data);
  const [arrEx] = toL(7.2, arrowY_data);
  const [, arrSy] = toL(0, arrowY_data);

  return (
    <g>
      {gridLines}
      <PanelAxes panel={L} xLabel="Quantity" yLabel="Price" />

      {/* Panel title */}
      <text x={(L.x0 + L.x1) / 2} y={L.y0 - 14} fill={C.text} fontSize="13"
        fontWeight="700" fontFamily={MONO} textAnchor="middle" letterSpacing="0.08em">
        INDUSTRY
      </text>

      {/* D curve */}
      <polyline points={dPts} fill="none" stroke={C.demand} strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" />
      {(() => {
        const [ex, ey] = toL(8.2, Dfn(8.2));
        return <text x={ex + 8} y={ey} fill={C.demand} fontSize="13"
          fontWeight="700" fontFamily={MONO} dominantBaseline="middle">D</text>;
      })()}

      {/* S₀ original supply */}
      <polyline points={s0Pts} fill="none" stroke={C.s0} strokeWidth="2.8"
        strokeLinecap="round" />
      {(() => {
        const [ex, ey] = toL(8.5, S0fn(8.5));
        return <text x={ex + 7} y={ey} fill={C.s0} fontSize="13"
          fontWeight="700" fontFamily={MONO} dominantBaseline="middle">S</text>;
      })()}

      {/* S₁ shifted supply (long run) */}
      {showLR && (
        <>
          <polyline points={s1Pts} fill="none" stroke={C.s1} strokeWidth="2.8"
            strokeLinecap="round" strokeDasharray="none" />
          {(() => {
            const [ex, ey] = toL(9.5, S1fn(9.5));
            return <text x={ex + 7} y={ey} fill={C.s1} fontSize="13"
              fontWeight="700" fontFamily={MONO} dominantBaseline="middle">S₁</text>;
          })()}

          {/* Arrow showing shift direction */}
          <defs>
            <marker id="arr-orange" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="6" markerHeight="6" orient="auto">
              <path d="M1 1L9 5L1 9" fill="none" stroke={C.s1}
                strokeWidth="1.5" strokeLinecap="round" />
            </marker>
          </defs>
          <line x1={arrSx} y1={arrSy} x2={arrEx} y2={arrSy}
            stroke={C.s1} strokeWidth="1.5" markerEnd="url(#arr-orange)"
            strokeDasharray="5,3" opacity="0.75" />
        </>
      )}

      {/* SR equilibrium */}
      <EqDot toPixel={toL} dx={Q_SR} dy={P_SR} color={C.eq_sr}
        pLabel="P" qLabel="Q" panel={L} />

      {/* LR equilibrium */}
      {showLR && (
        <EqDot toPixel={toL} dx={Q_LR} dy={P_LR} color={C.eq_lr}
          pLabel="P₁" qLabel="Q₁" panel={L} />
      )}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FIRM PANEL
// ─────────────────────────────────────────────────────────────────────────────

function FirmPanel({ showLR }) {
  // Grid
  const gridLines = Array.from({ length: 9 }, (_, i) => {
    const [sx] = toR(i + 1, 0);
    const [, sy] = toR(0, i + 1);
    return <g key={i}>
      <line x1={sx} y1={R.y0} x2={sx} y2={R.y1} stroke={C.grid} strokeWidth="1" />
      <line x1={R.x0} y1={sy} x2={R.x1} y2={sy} stroke={C.grid} strokeWidth="1" />
    </g>;
  });

  // MC: draw only upward-sloping portion (x=1 to x=7, where MC≤10)
  // MC(7) = 0.5*49-24.5+10 = 10 exactly · convenient clip point
  const mcPts = sampleR(MCfn, 0.9, 7.0);

  // AC: draw from x=0.7 to x=8 (AC stays below 10 in this range)
  // AC(0.7) = 0.3*0.49-1.68+8.8 ≈ 7.267  AC(8) = 19.2-19.2+8.8=8.8
  const acPts = sampleR(ACfn, 0.6, 8.5);

  // AR=MR line (horizontal, price-taker · stretches full plot width)
  const mrPrice = showLR ? P_LR : P_SR;
  const mrColor = showLR ? C.mr_lr : C.mr_sr;
  const [, mrSy] = toR(0, mrPrice);
  const mrLabel  = showLR ? "AR = MR = P₁" : "AR = MR = P";

  // Supernormal profit rectangle (short-run only)
  // Top: P_SR, Bottom: AC(q_SR), Left: x=0, Right: x=q_SR
  const [rectX0] = toR(0,     AC_at_qSR);
  const [rectX1] = toR(q_SR,  AC_at_qSR);
  const [, rectY_top]    = toR(0, P_SR);
  const [, rectY_bottom] = toR(0, AC_at_qSR);
  const rectW = rectX1 - rectX0;
  const rectH = Math.abs(rectY_bottom - rectY_top);

  // Profit max dot (SR): MC = AR=MR=P at q_SR, y=P_SR
  // LR equilibrium: MC = AC = P_LR at q_LR=4
  const eqX  = showLR ? q_LR : q_SR;
  const eqY  = showLR ? P_LR : P_SR;
  const eqColor = showLR ? C.eq_lr : C.eq_sr;
  const eqLabel = showLR ? "Q₁" : "q";

  // AC label position
  const [acLx, acLy] = toR(8.5, ACfn(8.5));

  return (
    <g>
      {gridLines}
      <PanelAxes panel={R} xLabel="Output (q)" yLabel="Revenue / Cost" />

      {/* Panel title */}
      <text x={(R.x0 + R.x1) / 2} y={R.y0 - 14} fill={C.text} fontSize="13"
        fontWeight="700" fontFamily={MONO} textAnchor="middle" letterSpacing="0.08em">
        FIRM
      </text>

      {/* Supernormal profit rectangle (SR only) */}
      {!showLR && (
        <>
          <rect x={rectX0} y={rectY_top} width={rectW} height={rectH}
            fill={C.profit}
            stroke={C.eq_sr} strokeWidth="1.2" strokeDasharray="5,4" />
          <text
            x={rectX0 + rectW / 2} y={rectY_top + rectH / 2}
            fill={C.eq_sr} fontSize="10" fontFamily={MONO}
            textAnchor="middle" dominantBaseline="middle" opacity="0.85">
            Supernormal profit
          </text>
        </>
      )}

      {/* AC curve */}
      <polyline points={acPts} fill="none" stroke={C.ac} strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" />
      <text x={acLx + 7} y={acLy} fill={C.ac} fontSize="13"
        fontWeight="700" fontFamily={MONO} dominantBaseline="middle">AC</text>

      {/* MC curve */}
      <polyline points={mcPts} fill="none" stroke={C.mc} strokeWidth="2.8"
        strokeLinecap="round" strokeLinejoin="round" />
      {(() => {
        const [mx, my] = toR(7.0, MCfn(7.0));
        return <text x={mx + 7} y={my} fill={C.mc} fontSize="13"
          fontWeight="700" fontFamily={MONO} dominantBaseline="middle">MC</text>;
      })()}

      {/* AR = MR horizontal line */}
      <line x1={R.x0} y1={mrSy} x2={R.x1} y2={mrSy}
        stroke={mrColor} strokeWidth="2.8" />
      <text x={R.x1 + 8} y={mrSy} fill={mrColor} fontSize="11"
        fontWeight="700" fontFamily={MONO} dominantBaseline="middle">
        {mrLabel}
      </text>

      {/* Equilibrium dot · single source of truth */}
      <EqDot toPixel={toR} dx={eqX} dy={eqY} color={eqColor}
        pLabel={showLR ? "P₁" : "P"} qLabel={eqLabel} panel={R} />

      {/* Long-run annotation */}
      {showLR && (() => {
        const [dotX, dotY] = toR(q_LR, P_LR);
        return (
          <text x={dotX + 12} y={dotY - 18} fill={C.eq_lr} fontSize="10"
            fontFamily={MONO} dominantBaseline="middle" opacity="0.85">
            P = min AC → normal profit
          </text>
        );
      })()}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function PerfectCompetitionDiagram() {
  const [showLR, setShowLR] = useState(false);

  const [, srAlignSy] = toL(0, P_SR);
  const [, lrAlignSy] = toL(0, P_LR);

  return (
    <div style={{
      background: C.bg,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: MONO,
      color: C.text,
      borderRadius: 8,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg,#3b5ef7,#8b3cf7)",
            borderRadius: 8, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>📊</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
              PERFECT COMPETITION
            </div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
              {showLR
                ? "Long run · new firms enter → supply shifts right → P falls to min AC"
                : "Short run · price set by market → supernormal profit attracts entrants"}
            </div>
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 11, color: !showLR ? C.mr_sr : C.muted,
            fontWeight: !showLR ? 700 : 400,
          }}>Short run</span>
          <div
            onClick={() => setShowLR(v => !v)}
            style={{
              width: 46, height: 24, borderRadius: 12, position: "relative",
              background: showLR ? C.mr_lr : C.mr_sr,
              cursor: "pointer", transition: "background 0.2s", flexShrink: 0,
            }}
          >
            <div style={{
              position: "absolute",
              top: 3, left: showLR ? 25 : 3,
              width: 18, height: 18, borderRadius: "50%",
              background: "white", transition: "left 0.2s",
            }} />
          </div>
          <span style={{
            fontSize: 11, color: showLR ? C.mr_lr : C.muted,
            fontWeight: showLR ? 700 : 400,
          }}>Long run</span>
        </div>
      </div>

      {/* Diagram */}
      <div style={{ flex: 1, padding: "12px 16px" }}>
        <div style={{
          background: C.surface,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          padding: "10px 6px 10px 0",
          overflow: "hidden",
        }}>
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ width: "100%", display: "block" }}
          >
            {/*
              ── PRICE ALIGNMENT LINES ──────────────────────────────────────
              These horizontal guides span BOTH panels at the same y-pixel,
              proving alignment. They sit behind everything else.
            */}
            <line
              x1={L.x0 - 5} y1={srAlignSy} x2={R.x1 + 15} y2={srAlignSy}
              stroke={C.eq_sr} strokeWidth="0.8" strokeDasharray="3,6" opacity="0.2"
            />
            <line
              x1={L.x0 - 5} y1={lrAlignSy} x2={R.x1 + 15} y2={lrAlignSy}
              stroke={C.eq_lr} strokeWidth="0.8" strokeDasharray="3,6" opacity="0.2"
            />

            {/* Vertical divider between panels */}
            <line
              x1={(L.x1 + R.x0) / 2} y1={L.y0 - 24}
              x2={(L.x1 + R.x0) / 2} y2={L.y1 + 40}
              stroke={C.border} strokeWidth="1.5"
            />

            {/* Both panels */}
            <IndustryPanel showLR={showLR} />
            <FirmPanel showLR={showLR} />
          </svg>
        </div>

        {/* Legend */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "8px 20px",
          marginTop: 12, paddingLeft: 6,
        }}>
          {[
            { color: C.demand, label: "D · demand" },
            { color: C.s0,     label: "S · original supply" },
            ...(showLR ? [{ color: C.s1, label: "S₁ · new supply (entry)", dash: true }] : []),
            { color: C.mc,     label: "MC · marginal cost" },
            { color: C.ac,     label: "AC · average cost" },
            { color: showLR ? C.mr_lr : C.mr_sr,
              label: showLR ? "AR = MR = P₁ (long run)" : "AR = MR = P (short run)" },
            { color: C.eq_sr,  label: "Short-run equilibrium", dot: true },
            ...(showLR ? [{ color: C.eq_lr, label: "Long-run equilibrium", dot: true }] : []),
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              {item.dot
                ? <div style={{ width: 10, height: 10, borderRadius: "50%",
                    background: item.color, flexShrink: 0 }} />
                : <svg width="22" height="4" style={{ flexShrink: 0 }}>
                    <line x1="0" y1="2" x2="22" y2="2" stroke={item.color}
                      strokeWidth="2.5" strokeLinecap="round"
                      strokeDasharray={item.dash ? "6,3" : undefined} />
                  </svg>
              }
              <span style={{ fontSize: 10, color: C.muted, fontFamily: MONO }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Economics note */}
        <div style={{
          marginTop: 12, padding: "10px 14px",
          background: C.surface, borderRadius: 8,
          border: `1px solid ${C.border}`,
          fontSize: 10, color: C.muted, lineHeight: 1.7,
          fontFamily: MONO,
        }}>
          {showLR
            ? "Long run: supernormal profit → new firms enter → S shifts right → price falls to P₁ = min AC. " +
              "Firm produces at Q₁ where MC = AC = AR = MR = P₁. Zero supernormal profit. Allocative (P=MC) and productive (P=min AC) efficiency achieved."
            : "Short run: market sets price P. Firm is a price-taker · AR = MR = P (horizontal). " +
              "Profit max where MC = MR. Since P > AC, supernormal profit exists (shaded). " +
              "This attracts new entrants → shifts supply right in the long run."
          }
        </div>
      </div>
    </div>
  );
}
