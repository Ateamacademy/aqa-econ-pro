/**
 * PerfectCompDiagram — Two-panel Perfect Competition diagram.
 *
 * Panel (a): Industry/Market — D, S1, S2 with equilibria E1, E2
 * Panel (b): Individual Firm — MC, ATC, MR1/MR2 with SR/LR toggle
 *
 * All equilibria computed mathematically via intersect().
 * No hardcoded SVG coordinates — everything via toSx/toSy.
 */

import { useState, useId, useMemo } from "react";

/* ═══════ SVG Layout ═══════ */
const SVG_W = 700;
const SVG_H = 500;
const PAD = 60;
const GAP = 40; // gap between panels

// Each panel width
const PANEL_W = (SVG_W - 2 * PAD - GAP) / 2; // ~260
const PANEL_H = SVG_H - 2 * PAD; // 380

// Panel origins
const P1_X = PAD;
const P2_X = PAD + PANEL_W + GAP;
const P_Y = PAD;

const DS_MAX = 5; // data space for each panel is 0–5

/* ═══════ Coordinate mapping per panel ═══════ */
const toSx = (dx: number, panelX: number) => panelX + (dx / DS_MAX) * PANEL_W;
const toSy = (dy: number) => P_Y + PANEL_H - (dy / DS_MAX) * PANEL_H;

/* ═══════ Curve evaluation ═══════ */
function evalLinear(slope: number, intercept: number, x: number) {
  return slope * x + intercept;
}

function evalQuad(a: number, b: number, c: number, x: number) {
  return a * x * x + b * x + c;
}

/* ═══════ Intersection math ═══════ */
function intersectLinear(s1: number, i1: number, s2: number, i2: number) {
  const denom = s1 - s2;
  if (Math.abs(denom) < 1e-9) return null;
  const x = (i2 - i1) / denom;
  const y = s1 * x + i1;
  return { x, y };
}

/** Solve ax²+bx+c = y for x, return positive root in [0, DS_MAX] */
function solveQuadForY(a: number, b: number, c: number, y: number): number | null {
  // ax² + bx + (c-y) = 0
  const A = a;
  const B = b;
  const C = c - y;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return null;
  const x1 = (-B + Math.sqrt(disc)) / (2 * A);
  const x2 = (-B - Math.sqrt(disc)) / (2 * A);
  const valid = [x1, x2].filter(x => x >= 0 && x <= DS_MAX).sort((a, b) => a - b);
  // Return the rightmost valid root (upward-sloping right side of U)
  return valid.length > 0 ? valid[valid.length - 1] : null;
}

/** Find where MC = ATC (minimum ATC point) */
function findMinATC(mcA: number, mcB: number, mcC: number, atcA: number, atcB: number, atcC: number) {
  // MC = ATC → (mcA-atcA)x² + (mcB-atcB)x + (mcC-atcC) = 0
  const A = mcA - atcA;
  const B = mcB - atcB;
  const C = mcC - atcC;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return null;
  const x1 = (-B + Math.sqrt(disc)) / (2 * A);
  const x2 = (-B - Math.sqrt(disc)) / (2 * A);
  const valid = [x1, x2].filter(x => x > 0.5 && x <= DS_MAX);
  if (valid.length === 0) return null;
  const x = valid[0];
  const y = evalQuad(atcA, atcB, atcC, x);
  return { x, y };
}

/* ═══════ Curve path generators ═══════ */
function linearPath(slope: number, intercept: number, panelX: number) {
  // Clip to data space [0, DS_MAX] x [0, ~10]
  const yMax = 10;
  let x0 = 0, x1 = DS_MAX;
  let y0 = evalLinear(slope, intercept, x0);
  let y1 = evalLinear(slope, intercept, x1);

  if (y0 < 0) { x0 = -intercept / slope; y0 = 0; }
  if (y0 > yMax) { x0 = (yMax - intercept) / slope; y0 = yMax; }
  if (y1 < 0) { x1 = -intercept / slope; y1 = 0; }
  if (y1 > yMax) { x1 = (yMax - intercept) / slope; y1 = yMax; }

  x0 = Math.max(0, Math.min(DS_MAX, x0));
  x1 = Math.max(0, Math.min(DS_MAX, x1));
  y0 = evalLinear(slope, intercept, x0);
  y1 = evalLinear(slope, intercept, x1);

  return {
    x1: toSx(x0, panelX), y1: toSy(y0),
    x2: toSx(x1, panelX), y2: toSy(y1),
  };
}

function quadPath(a: number, b: number, c: number, panelX: number, xFrom = 0, xTo = DS_MAX) {
  const steps = 50;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = xFrom + (i / steps) * (xTo - xFrom);
    const y = evalQuad(a, b, c, x);
    if (y >= 0 && y <= 10) {
      points.push(`${points.length === 0 ? "M" : "L"} ${toSx(x, panelX).toFixed(1)} ${toSy(y).toFixed(1)}`);
    }
  }
  return points.join(" ");
}

function horizontalLine(y: number, panelX: number) {
  return {
    x1: toSx(0, panelX), y1: toSy(y),
    x2: toSx(DS_MAX, panelX), y2: toSy(y),
  };
}

/* ═══════ Sub-components ═══════ */
function DashedProjection({ x, y, color, pLabel, qLabel, panelX }: {
  x: number; y: number; color: string; pLabel: string; qLabel: string; panelX: number;
}) {
  const axisX = panelX;
  const axisY = P_Y + PANEL_H;
  return (
    <>
      <line x1={axisX} y1={y} x2={x} y2={y} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <line x1={x} y1={y} x2={x} y2={axisY} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <text x={axisX - 6} y={y + 3.5} fill={color} fontSize={8} fontWeight={700} textAnchor="end"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{pLabel}</text>
      <text x={x} y={axisY + 12} fill={color} fontSize={8} fontWeight={700} textAnchor="middle"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{qLabel}</text>
    </>
  );
}

function Dot({ x, y, color, label, labelDx = 6, labelDy = -8 }: {
  x: number; y: number; color: string; label: string; labelDx?: number; labelDy?: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill={color} opacity={0.1} />
      <circle cx={x} cy={y} r={4} fill={color} stroke="white" strokeWidth={1.2} />
      <text x={x + labelDx} y={y + labelDy} fill={color} fontSize={9} fontWeight={700}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{label}</text>
    </g>
  );
}

function CurveLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  const charW = 5.5;
  const w = text.length * charW + 6;
  return (
    <g>
      <rect x={x - 3} y={y - 10} width={w} height={14} rx={3} fill="hsl(var(--card))" opacity={0.88} />
      <text x={x} y={y} fill={color} fontSize={9} fontWeight={700}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{text}</text>
    </g>
  );
}

/* ═══════ Main Component ═══════ */
export default function PerfectCompDiagram({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const [showSR, setShowSR] = useState(true);

  // ── Panel (a) Industry curves ──
  const D = { slope: -0.8, intercept: 9 };
  const S1 = { slope: 0.9, intercept: 0.5 };
  const S2 = { slope: 0.9, intercept: 2.2 };

  // ── Panel (b) Firm curves ──
  const MC = { a: 0.6, b: -2, c: 3.5 };
  const ATC = { a: 0.5, b: -2.2, c: 4.8 };

  const computed = useMemo(() => {
    // Industry equilibria
    const E1 = intersectLinear(D.slope, D.intercept, S1.slope, S1.intercept)!;
    const E2 = intersectLinear(D.slope, D.intercept, S2.slope, S2.intercept)!;

    const P1 = E1.y; // LR equilibrium price
    const P2 = E2.y; // SR elevated price

    // Firm: where MC = horizontal MR at P2 (SR profit max)
    const q_sr = solveQuadForY(MC.a, MC.b, MC.c, P2);
    const atc_at_qsr = q_sr !== null ? evalQuad(ATC.a, ATC.b, ATC.c, q_sr) : null;

    // Firm: min ATC point (MC = ATC)
    const minATCpt = findMinATC(MC.a, MC.b, MC.c, ATC.a, ATC.b, ATC.c);

    // Firm: where MC = horizontal MR at P1 (LR)
    const q_lr = solveQuadForY(MC.a, MC.b, MC.c, P1);

    // Sanity
    if (E1 && E2 && E2.y > E1.y) {
      // Expected: E2 higher price (S shifted left)
    } else {
      console.error("[PerfectComp] Sanity: E2 price should > E1 price");
    }

    return { E1, E2, P1, P2, q_sr, atc_at_qsr, minATCpt, q_lr };
  }, []);

  const { E1, E2, P1, P2, q_sr, atc_at_qsr, minATCpt, q_lr } = computed;

  // ── SVG coordinates ──
  // Panel (a)
  const dLine = linearPath(D.slope, D.intercept, P1_X);
  const s1Line = linearPath(S1.slope, S1.intercept, P1_X);
  const s2Line = linearPath(S2.slope, S2.intercept, P1_X);
  const e1svg = { x: toSx(E1.x, P1_X), y: toSy(E1.y) };
  const e2svg = { x: toSx(E2.x, P1_X), y: toSy(E2.y) };

  // Panel (b)
  const mcPath = quadPath(MC.a, MC.b, MC.c, P2_X, 0.5, DS_MAX);
  const atcPath = quadPath(ATC.a, ATC.b, ATC.c, P2_X, 0.3, DS_MAX);
  const mr1Line = horizontalLine(P1, P2_X);
  const mr2Line = horizontalLine(P2, P2_X);

  // SR profit max point
  const srProfitPt = q_sr !== null ? { x: toSx(q_sr, P2_X), y: toSy(P2) } : null;
  const srATCPt = q_sr !== null && atc_at_qsr !== null
    ? { x: toSx(q_sr, P2_X), y: toSy(atc_at_qsr) } : null;

  // LR normal profit point
  const lrPt = q_lr !== null ? { x: toSx(q_lr, P2_X), y: toSy(P1) } : null;

  // Min ATC
  const minATCsvg = minATCpt ? { x: toSx(minATCpt.x, P2_X), y: toSy(minATCpt.y) } : null;

  return (
    <div className={`rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-lg relative overflow-hidden group transition-shadow duration-300 hover:shadow-xl ${className ?? ""}`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">📊</span>
          Perfect Competition
        </p>
        {/* SR / LR Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSR(true)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              showSR ? "bg-primary text-primary-foreground shadow" : "bg-muted/60 text-muted-foreground hover:bg-muted"
            }`}
          >
            Short Run
          </button>
          <button
            onClick={() => setShowSR(false)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              !showSR ? "bg-primary text-primary-foreground shadow" : "bg-muted/60 text-muted-foreground hover:bg-muted"
            }`}
          >
            Long Run
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-[700px] h-auto text-foreground relative z-10">
        <defs>
          <pattern id={`pc-grid-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.06" />
          </pattern>
          <filter id={`pc-shadow-${uid}`}>
            <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* ═══ Panel (a) — Industry ═══ */}
        <g>
          {/* Panel title */}
          <text x={P1_X + PANEL_W / 2} y={P_Y - 14} textAnchor="middle" fontSize={11} fontWeight={700}
            fill="currentColor" opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            (a) Industry
          </text>

          {/* Grid */}
          <rect x={P1_X} y={P_Y} width={PANEL_W} height={PANEL_H} fill={`url(#pc-grid-${uid})`} />

          {/* Axes */}
          <line x1={P1_X} y1={P_Y} x2={P1_X} y2={P_Y + PANEL_H} stroke="currentColor" strokeWidth={2} opacity={0.75} />
          <line x1={P1_X} y1={P_Y + PANEL_H} x2={P1_X + PANEL_W} y2={P_Y + PANEL_H} stroke="currentColor" strokeWidth={2} opacity={0.75} />
          <polygon points={`${P1_X - 3},${P_Y + 5} ${P1_X},${P_Y - 2} ${P1_X + 3},${P_Y + 5}`} fill="currentColor" opacity={0.75} />
          <polygon points={`${P1_X + PANEL_W - 5},${P_Y + PANEL_H - 3} ${P1_X + PANEL_W + 2},${P_Y + PANEL_H} ${P1_X + PANEL_W - 5},${P_Y + PANEL_H + 3}`} fill="currentColor" opacity={0.75} />

          {/* Axis labels */}
          <text x={P1_X - 10} y={P_Y + PANEL_H / 2} textAnchor="middle"
            transform={`rotate(-90 ${P1_X - 10} ${P_Y + PANEL_H / 2})`}
            fontSize={9} fontWeight={700} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Price (P)</text>
          <text x={P1_X + PANEL_W / 2} y={P_Y + PANEL_H + 30} textAnchor="middle"
            fontSize={9} fontWeight={700} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Quantity (Q)</text>
          <text x={P1_X - 8} y={P_Y + PANEL_H + 12} fontSize={9} fontWeight={700} fill="currentColor" opacity={0.45}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>

          {/* Demand curve */}
          <line x1={dLine.x1} y1={dLine.y1} x2={dLine.x2} y2={dLine.y2}
            stroke="#3b82f6" strokeWidth={2.5} strokeLinecap="round" />
          <CurveLabel x={dLine.x2 - 16} y={dLine.y2 - 8} text="D" color="#3b82f6" />

          {/* S1 */}
          <line x1={s1Line.x1} y1={s1Line.y1} x2={s1Line.x2} y2={s1Line.y2}
            stroke="#f97316" strokeWidth={2.5} strokeLinecap="round" />
          <CurveLabel x={s1Line.x2 - 16} y={s1Line.y2 + 14} text="S₁" color="#f97316" />

          {/* S2 */}
          <line x1={s2Line.x1} y1={s2Line.y1} x2={s2Line.x2} y2={s2Line.y2}
            stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" strokeDasharray="6,3" />
          <CurveLabel x={s2Line.x2 - 16} y={s2Line.y2 + 14} text="S₂" color="#ef4444" />

          {/* Shift arrow S1 → S2 */}
          <line
            x1={(s1Line.x1 + s1Line.x2) / 2} y1={(s1Line.y1 + s1Line.y2) / 2}
            x2={(s2Line.x1 + s2Line.x2) / 2} y2={(s2Line.y1 + s2Line.y2) / 2}
            stroke="#ef4444" strokeWidth={1.2} strokeDasharray="3,2" opacity={0.7} />

          {/* E1 - LR equilibrium */}
          <DashedProjection x={e1svg.x} y={e1svg.y} color="#16a34a" pLabel="P₁" qLabel="Q₁" panelX={P1_X} />
          <Dot x={e1svg.x} y={e1svg.y} color="#16a34a" label="E₁" />

          {/* E2 - SR equilibrium */}
          <DashedProjection x={e2svg.x} y={e2svg.y} color="#d97706" pLabel="P₂" qLabel="Q₂" panelX={P1_X} />
          <Dot x={e2svg.x} y={e2svg.y} color="#d97706" label="E₂" />
        </g>

        {/* ═══ Panel separator ═══ */}
        <line
          x1={P1_X + PANEL_W + GAP / 2} y1={P_Y - 10}
          x2={P1_X + PANEL_W + GAP / 2} y2={P_Y + PANEL_H + 10}
          stroke="currentColor" strokeWidth={1} strokeDasharray="4,4" opacity={0.2} />

        {/* ═══ Panel (b) — Firm ═══ */}
        <g>
          {/* Panel title */}
          <text x={P2_X + PANEL_W / 2} y={P_Y - 14} textAnchor="middle" fontSize={11} fontWeight={700}
            fill="currentColor" opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            (b) Firm
          </text>

          {/* Grid */}
          <rect x={P2_X} y={P_Y} width={PANEL_W} height={PANEL_H} fill={`url(#pc-grid-${uid})`} />

          {/* Axes */}
          <line x1={P2_X} y1={P_Y} x2={P2_X} y2={P_Y + PANEL_H} stroke="currentColor" strokeWidth={2} opacity={0.75} />
          <line x1={P2_X} y1={P_Y + PANEL_H} x2={P2_X + PANEL_W} y2={P_Y + PANEL_H} stroke="currentColor" strokeWidth={2} opacity={0.75} />
          <polygon points={`${P2_X - 3},${P_Y + 5} ${P2_X},${P_Y - 2} ${P2_X + 3},${P_Y + 5}`} fill="currentColor" opacity={0.75} />
          <polygon points={`${P2_X + PANEL_W - 5},${P_Y + PANEL_H - 3} ${P2_X + PANEL_W + 2},${P_Y + PANEL_H} ${P2_X + PANEL_W - 5},${P_Y + PANEL_H + 3}`} fill="currentColor" opacity={0.75} />

          {/* Axis labels */}
          <text x={P2_X - 10} y={P_Y + PANEL_H / 2} textAnchor="middle"
            transform={`rotate(-90 ${P2_X - 10} ${P_Y + PANEL_H / 2})`}
            fontSize={9} fontWeight={700} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Cost / Revenue</text>
          <text x={P2_X + PANEL_W / 2} y={P_Y + PANEL_H + 30} textAnchor="middle"
            fontSize={9} fontWeight={700} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Output (q)</text>
          <text x={P2_X - 8} y={P_Y + PANEL_H + 12} fontSize={9} fontWeight={700} fill="currentColor" opacity={0.45}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>

          {/* MC curve */}
          <path d={mcPath} fill="none" stroke="#f97316" strokeWidth={2.5} strokeLinecap="round" />
          {/* ATC curve */}
          <path d={atcPath} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinecap="round" />

          {/* Curve labels at end */}
          {(() => {
            const mcEndY = evalQuad(MC.a, MC.b, MC.c, DS_MAX);
            const atcEndY = evalQuad(ATC.a, ATC.b, ATC.c, DS_MAX);
            return (
              <>
                <CurveLabel x={toSx(DS_MAX, P2_X) - 24} y={toSy(mcEndY) - 6} text="MC" color="#f97316" />
                <CurveLabel x={toSx(DS_MAX, P2_X) - 28} y={toSy(atcEndY) + 16} text="ATC" color="#3b82f6" />
              </>
            );
          })()}

          {/* ── Short Run view ── */}
          {showSR && (
            <>
              {/* MR2 = P2 */}
              <line x1={mr2Line.x1} y1={mr2Line.y1} x2={mr2Line.x2} y2={mr2Line.y2}
                stroke="#ef4444" strokeWidth={2} strokeLinecap="round" />
              <CurveLabel x={mr2Line.x2 - 60} y={mr2Line.y1 - 10} text="MR₂ = P₂" color="#ef4444" />

              {/* Supernormal profit shading */}
              {srProfitPt && srATCPt && q_sr !== null && atc_at_qsr !== null && P2 > atc_at_qsr && (
                <rect
                  x={toSx(0, P2_X)}
                  y={toSy(P2)}
                  width={toSx(q_sr, P2_X) - toSx(0, P2_X)}
                  height={toSy(atc_at_qsr) - toSy(P2)}
                  fill="rgba(74,222,128,0.12)"
                  stroke="#16a34a"
                  strokeWidth={1}
                  strokeDasharray="4,2"
                />
              )}
              {srProfitPt && srATCPt && q_sr !== null && atc_at_qsr !== null && P2 > atc_at_qsr && (
                <text
                  x={(toSx(0, P2_X) + toSx(q_sr, P2_X)) / 2}
                  y={(toSy(P2) + toSy(atc_at_qsr)) / 2 + 3}
                  textAnchor="middle" fontSize={7} fontWeight={700} fill="#16a34a"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  Supernormal Profit
                </text>
              )}

              {/* SR profit max dot */}
              {srProfitPt && (
                <>
                  <DashedProjection
                    x={srProfitPt.x} y={srProfitPt.y} color="#ef4444"
                    pLabel="P₂" qLabel="q₁" panelX={P2_X} />
                  <Dot x={srProfitPt.x} y={srProfitPt.y} color="#ef4444" label="Profit max" labelDx={-50} labelDy={-10} />
                </>
              )}

              {/* ATC at q_sr */}
              {srATCPt && (
                <Dot x={srATCPt.x} y={srATCPt.y} color="#3b82f6" label="ATC(q₁)" labelDx={6} labelDy={12} />
              )}
            </>
          )}

          {/* ── Long Run view ── */}
          {!showSR && (
            <>
              {/* MR1 = P1 */}
              <line x1={mr1Line.x1} y1={mr1Line.y1} x2={mr1Line.x2} y2={mr1Line.y2}
                stroke="#3b82f6" strokeWidth={2} strokeLinecap="round" />
              <CurveLabel x={mr1Line.x2 - 60} y={mr1Line.y1 - 10} text="MR₁ = P₁" color="#3b82f6" />

              {/* LR profit max dot (normal profit: P = min ATC) */}
              {lrPt && (
                <>
                  <DashedProjection
                    x={lrPt.x} y={lrPt.y} color="#16a34a"
                    pLabel="P₁" qLabel="q₂" panelX={P2_X} />
                  <Dot x={lrPt.x} y={lrPt.y} color="#16a34a" label="Normal profit" labelDx={-60} labelDy={-10} />
                </>
              )}

              {/* Min ATC label */}
              {minATCsvg && (
                <Dot x={minATCsvg.x} y={minATCsvg.y} color="#6b7280" label="Min ATC" labelDx={6} labelDy={14} />
              )}

              {/* Annotation: AR=MR=P=minATC */}
              <text x={P2_X + PANEL_W / 2} y={P_Y + PANEL_H - 20} textAnchor="middle"
                fontSize={8} fontWeight={600} fill="#16a34a" opacity={0.8}
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                AR = MR = P = min ATC → Normal Profit
              </text>
            </>
          )}
        </g>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-3 relative z-10">
        {[
          { label: "D (Demand)", color: "#3b82f6" },
          { label: "S₁ (Original)", color: "#f97316" },
          { label: "S₂ (Shifted)", color: "#ef4444" },
          { label: "MC", color: "#f97316" },
          { label: "ATC", color: "#3b82f6" },
          ...(showSR
            ? [{ label: "MR₂ = P₂ (SR)", color: "#ef4444" }, { label: "Supernormal Profit", color: "#16a34a" }]
            : [{ label: "MR₁ = P₁ (LR)", color: "#3b82f6" }, { label: "Normal Profit", color: "#16a34a" }]
          ),
        ].map((item, i) => (
          <span key={i}
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 4px ${item.color}60` }} />
            {item.label}
          </span>
        ))}
      </div>

      {/* Exam tips */}
      <div className="mt-3 text-[10px] text-muted-foreground/70 relative z-10 space-y-0.5">
        {showSR ? (
          <>
            <p>• Short run: P₂ {">"} ATC → supernormal profit (green rectangle)</p>
            <p>• Firms attracted by profit → enter the market → S shifts right</p>
          </>
        ) : (
          <>
            <p>• Long run: entry of new firms → S₁ → price falls to P₁ = min ATC</p>
            <p>• AR = MR = P = min ATC → zero supernormal profit (allocative + productive efficiency)</p>
          </>
        )}
      </div>
    </div>
  );
}
