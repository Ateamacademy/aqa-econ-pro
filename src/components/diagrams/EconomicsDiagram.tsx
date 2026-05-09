/**
 * EconomicsDiagram · A fully declarative, reusable Economics SVG diagram component.
 *
 * Props-driven: pass curves, equilibria, shifted curves, shaded regions, and annotations.
 * All equilibrium points are mathematically computed from actual line intersections.
 * Labels use collision detection to prevent overlaps.
 * Dashed reference lines always project from equilibrium points to both axes.
 *
 * Coordinate system:
 *   Economic space: x ∈ [0, 1], y ∈ [0, 1]  (origin = bottom-left)
 *   SVG space:      viewBox "0 0 700 500", plot area padded by 60px
 *   All curve definitions use economic [0,1] coordinates; the component maps to SVG internally.
 */

import { useState, useId, useMemo } from "react";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

export interface CurveDef {
  /** Unique identifier used by equilibria to reference this curve */
  id: string;
  /** Display label (e.g. "D₁", "S₁", "SRAS") */
  label: string;
  /**
   * Slope in economic space (rise/run).
   * Positive = upward sloping (supply-like), Negative = downward sloping (demand-like).
   * Use `Infinity` or `-Infinity` for vertical lines (e.g. LRAS).
   */
  slope: number;
  /** Y-intercept in economic [0,1] space (value of y when x = 0) */
  intercept: number;
  /** Stroke color */
  color: string;
  /** Line style */
  style?: "solid" | "dashed";
  /** Stroke width override (default 2.5) */
  width?: number;
  /** Optional glow filter name */
  glow?: string;
}

export interface EquilibriumDef {
  /** Display label (e.g. "E₁", "E₂") */
  label: string;
  /** Tuple of exactly two curve IDs whose intersection defines this point */
  curveIds: [string, string];
  /** Dot / projection color */
  color: string;
  /** P-axis label (e.g. "P₁") */
  pLabel?: string;
  /** Q-axis label (e.g. "Q₁") */
  qLabel?: string;
  /** Tooltip on hover */
  tooltip?: string;
}

export interface ShadedRegionDef {
  /** Vertices in economic [0,1] space · the polygon is drawn in order */
  vertices: Array<{ x: number; y: number }>;
  /** Fill color */
  color: string;
  /** Fill opacity (default 0.15) */
  opacity?: number;
  /** Region label */
  label?: string;
  /** Label color override (defaults to `color`) */
  labelColor?: string;
}

export interface AnnotationDef {
  /** Position in economic [0,1] space */
  x: number;
  y: number;
  /** Text content */
  text: string;
  /** Color */
  color: string;
  /** Font size (default 10) */
  size?: number;
  /** Text anchor (default "start") */
  anchor?: "start" | "middle" | "end";
}

export interface EconomicsDiagramProps {
  /** X-axis label (e.g. "Quantity (Q)") */
  xAxis: string;
  /** Y-axis label (e.g. "Price (P)") */
  yAxis: string;
  /** Title shown above the diagram */
  title?: string;
  /** Curve definitions */
  curves: CurveDef[];
  /** Equilibrium point definitions · intersections computed mathematically */
  equilibria?: EquilibriumDef[];
  /** Shifted curves rendered as dashed overlays with shift arrows from original */
  shiftedCurves?: Array<CurveDef & {
    /** ID of the original curve this is shifted from (for drawing shift arrow) */
    originalId?: string;
  }>;
  /** Shaded / bounded regions */
  regions?: ShadedRegionDef[];
  /** Free-form annotations */
  annotations?: AnnotationDef[];
  /** Legend entries (auto-generated from curves if omitted) */
  legend?: Array<{ label: string; color: string }>;
  /** Additional className on wrapper */
  className?: string;
}

/* ═══════════════════════════════════════════
   Constants · single source of truth
   ═══════════════════════════════════════════ */

const SVG_W = 700;
const SVG_H = 500;
const PAD = 60; // minimum padding around the plot area
const LABEL_SAFE = 40; // labels must stay ≥40px from SVG edges

// Plot area within padding
const PLOT_X = PAD;
const PLOT_Y = PAD;
const PLOT_W = SVG_W - PAD * 2; // 580
const PLOT_H = SVG_H - PAD * 2; // 380

/* ═══════════════════════════════════════════
   Coordinate mapping: economic ↔ SVG
   ═══════════════════════════════════════════ */

/** Map economic x ∈ [0,1] → SVG x */
const eToSvgX = (ex: number) => PLOT_X + ex * PLOT_W;
/** Map economic y ∈ [0,1] → SVG y  (y inverted: econ 0=bottom → SVG bottom) */
const eToSvgY = (ey: number) => PLOT_Y + PLOT_H - ey * PLOT_H;

/** Evaluate a line equation y = slope * x + intercept at a given x */
const evalLine = (slope: number, intercept: number, x: number) => slope * x + intercept;

/**
 * Compute SVG endpoints for a curve clipped to [0,1] economic space.
 * For finite slopes: evaluates y at x=0 and x=1, then clips.
 * For vertical lines (±Infinity slope): draws a vertical at x = intercept.
 */
function curveEndpoints(c: CurveDef): { x1: number; y1: number; x2: number; y2: number } {
  if (!isFinite(c.slope)) {
    // Vertical line at x = intercept
    return {
      x1: eToSvgX(c.intercept),
      y1: eToSvgY(1), // top of plot
      x2: eToSvgX(c.intercept),
      y2: eToSvgY(0), // bottom of plot
    };
  }

  // Parametric clip to [0,1] box
  let x0 = 0, x1 = 1;
  const y0 = evalLine(c.slope, c.intercept, x0);
  const y1val = evalLine(c.slope, c.intercept, x1);

  // Clip y to [0, 1]
  const clipX = (targetY: number) => (targetY - c.intercept) / c.slope;

  let startX = x0, startY = y0;
  let endX = x1, endY = y1val;

  // Clip start
  if (startY < 0) { startX = clipX(0); startY = 0; }
  if (startY > 1) { startX = clipX(1); startY = 1; }
  // Clip end
  if (endY < 0) { endX = clipX(0); endY = 0; }
  if (endY > 1) { endX = clipX(1); endY = 1; }

  // Clamp x to [0,1]
  startX = Math.max(0, Math.min(1, startX));
  endX = Math.max(0, Math.min(1, endX));
  startY = evalLine(c.slope, c.intercept, startX);
  endY = evalLine(c.slope, c.intercept, endX);

  return {
    x1: eToSvgX(startX),
    y1: eToSvgY(startY),
    x2: eToSvgX(endX),
    y2: eToSvgY(endY),
  };
}

/* ═══════════════════════════════════════════
   Math: line-line intersection
   ═══════════════════════════════════════════ */

interface Point { x: number; y: number }

/**
 * Find the intersection of two lines defined in SVG pixel space.
 * Returns null if lines are parallel.
 */
function lineIntersectSVG(
  ax1: number, ay1: number, ax2: number, ay2: number,
  bx1: number, by1: number, bx2: number, by2: number
): Point | null {
  const denom = (ax1 - ax2) * (by1 - by2) - (ay1 - ay2) * (bx1 - bx2);
  if (Math.abs(denom) < 0.001) return null;
  const t = ((ax1 - bx1) * (by1 - by2) - (ay1 - by1) * (bx1 - bx2)) / denom;
  return { x: ax1 + t * (ax2 - ax1), y: ay1 + t * (ay2 - ay1) };
}

/* ═══════════════════════════════════════════
   Label collision detection
   ═══════════════════════════════════════════ */

interface LabelRect {
  x: number; y: number;
  w: number; h: number;
}

function rectsOverlap(a: LabelRect, b: LabelRect): boolean {
  return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);
}

/**
 * Clamp a label so it stays within LABEL_SAFE from SVG edges.
 */
function clampLabelPos(x: number, y: number, w: number, h: number, anchor: string): Point {
  let cx = x, cy = y;
  if (anchor === "start") {
    cx = Math.max(LABEL_SAFE, Math.min(cx, SVG_W - LABEL_SAFE - w));
  } else if (anchor === "end") {
    cx = Math.max(LABEL_SAFE + w, Math.min(cx, SVG_W - LABEL_SAFE));
  } else {
    cx = Math.max(LABEL_SAFE + w / 2, Math.min(cx, SVG_W - LABEL_SAFE - w / 2));
  }
  cy = Math.max(LABEL_SAFE + h, Math.min(cy, SVG_H - LABEL_SAFE));
  return { x: cx, y: cy };
}

/**
 * Auto-position labels to avoid collisions.
 * Tries the preferred position first, then nudges in 4 directions.
 */
function resolveLabels(
  labels: Array<{ preferredX: number; preferredY: number; text: string; size: number; anchor: string }>
): Array<Point> {
  const placed: LabelRect[] = [];
  const results: Point[] = [];
  const CHAR_W_RATIO = 0.62;
  const nudges: Point[] = [
    { x: 0, y: 0 },
    { x: 0, y: -16 },
    { x: 0, y: 16 },
    { x: 14, y: 0 },
    { x: -14, y: 0 },
    { x: 14, y: -12 },
    { x: -14, y: -12 },
    { x: 14, y: 12 },
    { x: -14, y: 12 },
  ];

  for (const lbl of labels) {
    const w = lbl.text.length * lbl.size * CHAR_W_RATIO;
    const h = lbl.size + 4;

    let best: Point | null = null;
    for (const nudge of nudges) {
      const clamped = clampLabelPos(
        lbl.preferredX + nudge.x,
        lbl.preferredY + nudge.y,
        w, h, lbl.anchor
      );
      const rect: LabelRect = {
        x: lbl.anchor === "end" ? clamped.x - w : lbl.anchor === "middle" ? clamped.x - w / 2 : clamped.x,
        y: clamped.y - h,
        w, h,
      };
      if (!placed.some(p => rectsOverlap(p, rect))) {
        best = clamped;
        placed.push(rect);
        break;
      }
    }
    if (!best) {
      // Fallback: use clamped preferred position even if overlapping
      best = clampLabelPos(lbl.preferredX, lbl.preferredY, w, h, lbl.anchor);
      placed.push({
        x: lbl.anchor === "end" ? best.x - w : lbl.anchor === "middle" ? best.x - w / 2 : best.x,
        y: best.y - h,
        w, h,
      });
    }
    results.push(best);
  }

  return results;
}

/* ═══════════════════════════════════════════
   SVG Sub-components
   ═══════════════════════════════════════════ */

function DiagramLabel({ x, y, text, color, size = 11, anchor = "start", bold = true }: {
  x: number; y: number; text: string; color: string; size?: number; anchor?: string; bold?: boolean;
}) {
  const charW = size * 0.62;
  const textW = text.length * charW;
  const textH = size + 2;
  const pad = 3;

  return (
    <g>
      <rect
        x={(anchor === "middle" ? x - textW / 2 : anchor === "end" ? x - textW : x) - pad}
        y={y - textH + 2}
        width={textW + pad * 2}
        height={textH + pad}
        rx={3}
        fill="hsl(var(--card))"
        opacity={0.88}
      />
      <text
        x={x} y={y} fill={color} textAnchor={anchor} fontSize={size}
        fontWeight={bold ? 700 : 500}
        className="select-none"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {text}
      </text>
    </g>
  );
}

function EqDot({ x, y, color, label, tooltip, gradId }: {
  x: number; y: number; color: string; label: string; tooltip?: string; gradId: string;
}) {
  const [hovered, setHovered] = useState(false);
  const tipW = 170;
  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="cursor-pointer">
      <circle cx={x} cy={y} r={hovered ? 10 : 6} fill={color} opacity={hovered ? 0.2 : 0.08}
        className="transition-all duration-300" />
      <circle cx={x} cy={y} r={hovered ? 5 : 4} fill={`url(#${gradId})`}
        stroke="white" strokeWidth={1.5} filter="url(#econ-drop-shadow)"
        className="transition-all duration-300" />
      <circle cx={x - 1} cy={y - 1} r={1.3} fill="white" opacity={0.6} />
      <text x={x + 8} y={y - 8} fill={color} fontSize={10} fontWeight={700}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{label}</text>
      {hovered && tooltip && (
        <g>
          <rect x={x - tipW / 2} y={y - 42} width={tipW} height={28} rx={6}
            fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={0.8}
            filter="url(#econ-drop-shadow)" opacity={0.97} />
          <text x={x} y={y - 24} textAnchor="middle" fontSize={8.5} fontWeight={600}
            fill="hsl(var(--popover-foreground))"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {tooltip.slice(0, 36)}
          </text>
        </g>
      )}
    </g>
  );
}

function DashedProjection({ x, y, color, pLabel, qLabel }: {
  x: number; y: number; color: string; pLabel: string; qLabel: string;
}) {
  const axisLeft = PLOT_X;
  const axisBottom = PLOT_Y + PLOT_H;
  return (
    <>
      {/* Horizontal → Y-axis */}
      <line x1={axisLeft} y1={y} x2={x} y2={y} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      {/* Vertical → X-axis */}
      <line x1={x} y1={y} x2={x} y2={axisBottom} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      {/* P label on Y-axis */}
      <g>
        <rect x={axisLeft - 24} y={y - 8} width={20} height={16} rx={8} fill={color} opacity={0.12} />
        <text x={axisLeft - 14} y={y + 4} fill={color} fontSize={9} fontWeight={700} textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{pLabel}</text>
      </g>
      {/* Q label on X-axis */}
      <g>
        <rect x={x - 10} y={axisBottom + 2} width={20} height={16} rx={8} fill={color} opacity={0.12} />
        <text x={x} y={axisBottom + 14} fill={color} fontSize={9} fontWeight={700} textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{qLabel}</text>
      </g>
    </>
  );
}

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */

export default function EconomicsDiagram({
  xAxis,
  yAxis,
  title,
  curves,
  equilibria = [],
  shiftedCurves = [],
  regions = [],
  annotations = [],
  legend,
  className,
}: EconomicsDiagramProps) {
  const uid = useId().replace(/:/g, "");

  // Compute all curve endpoints (SVG space)
  const allCurves = useMemo(() => {
    const map = new Map<string, { def: CurveDef; endpoints: ReturnType<typeof curveEndpoints> }>();
    for (const c of [...curves, ...shiftedCurves]) {
      map.set(c.id, { def: c, endpoints: curveEndpoints(c) });
    }
    return map;
  }, [curves, shiftedCurves]);

  // Compute equilibrium points (single source of truth)
  const eqPoints = useMemo(() => {
    return equilibria.map((eq) => {
      const cA = allCurves.get(eq.curveIds[0]);
      const cB = allCurves.get(eq.curveIds[1]);
      if (!cA || !cB) return { ...eq, point: null as Point | null };

      const a = cA.endpoints;
      const b = cB.endpoints;
      const point = lineIntersectSVG(a.x1, a.y1, a.x2, a.y2, b.x1, b.y1, b.x2, b.y2);
      return { ...eq, point };
    });
  }, [allCurves, equilibria]);

  // Resolve curve label positions with collision detection
  const curveLabels = useMemo(() => {
    const allDefs = [...curves, ...shiftedCurves];
    const preferred = allDefs.map((c) => {
      const ep = allCurves.get(c.id)?.endpoints;
      if (!ep) return { preferredX: 0, preferredY: 0, text: c.label, size: 11, anchor: "end" };

      // Anchor label at end of line with 8px inward offset
      const dx = isFinite(c.slope) ? -8 : 8;
      const dy = c.slope >= 0 ? 14 : -10;
      return {
        preferredX: ep.x2 + dx,
        preferredY: ep.y2 + dy,
        text: c.label,
        size: 11,
        anchor: "end" as const,
      };
    });
    return resolveLabels(preferred);
  }, [allCurves, curves, shiftedCurves]);

  // Resolve equilibrium label positions with collision detection (for the E-labels on dots)
  const eqLabelPositions = useMemo(() => {
    const preferred = eqPoints.map((eq) => ({
      preferredX: (eq.point?.x ?? 0) + 8,
      preferredY: (eq.point?.y ?? 0) - 8,
      text: eq.label,
      size: 10,
      anchor: "start" as const,
    }));
    return resolveLabels(preferred);
  }, [eqPoints]);

  // Build legend
  const legendItems = legend ?? curves.map((c) => ({ label: c.label, color: c.color }));

  // Gradient IDs for equilibrium dots
  const dotGradients = useMemo(() => {
    const colors: Record<string, [string, string, string]> = {
      "#16a34a": ["#86efac", "#16a34a", "#15803d"],
      "#d97706": ["#fde68a", "#f59e0b", "#d97706"],
      "#059669": ["#6ee7b7", "#059669", "#047857"],
      "#ef4444": ["#fca5a5", "#ef4444", "#dc2626"],
      "#3b82f6": ["#bfdbfe", "#3b82f6", "#2563eb"],
    };
    return eqPoints.map((eq, i) => {
      const c = colors[eq.color] ?? ["#d1d5db", eq.color, eq.color];
      return { id: `eq-dot-${uid}-${i}`, c1: c[0], c2: c[1], c3: c[2] };
    });
  }, [eqPoints, uid]);

  return (
    <div className={`rounded-2xl border border-border/40 bg-gradient-to-br from-card via-card to-muted/30 p-4 shadow-lg ${className ?? ""}`}>
      {title && (
        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-primary flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">📊</span>
          {title}
        </p>
      )}

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full max-w-[700px] mx-auto h-auto"
        role="img"
        aria-label={`Economics diagram: ${title ?? xAxis}`}
      >
        <defs>
          <clipPath id={`plot-clip-${uid}`}>
            <rect x={PLOT_X} y={PLOT_Y} width={PLOT_W} height={PLOT_H} />
          </clipPath>
          <pattern id={`grid-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.06" />
          </pattern>
          <filter id="econ-drop-shadow">
            <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.10" />
          </filter>
          {dotGradients.map((g) => (
            <radialGradient key={g.id} id={g.id} cx="35%" cy="35%">
              <stop offset="0%" stopColor={g.c1} />
              <stop offset="60%" stopColor={g.c2} />
              <stop offset="100%" stopColor={g.c3} />
            </radialGradient>
          ))}
          <marker id={`arrow-shift-${uid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" opacity="0.7" />
          </marker>
        </defs>

        {/* Grid background */}
        <rect x={PLOT_X} y={PLOT_Y} width={PLOT_W} height={PLOT_H} fill={`url(#grid-${uid})`} />

        {/* Axes */}
        <line x1={PLOT_X} y1={PLOT_Y} x2={PLOT_X} y2={PLOT_Y + PLOT_H} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
        <line x1={PLOT_X} y1={PLOT_Y + PLOT_H} x2={PLOT_X + PLOT_W} y2={PLOT_Y + PLOT_H} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
        {/* Arrowheads */}
        <polygon points={`${PLOT_X - 4},${PLOT_Y + 6} ${PLOT_X},${PLOT_Y - 2} ${PLOT_X + 4},${PLOT_Y + 6}`} fill="currentColor" opacity={0.75} />
        <polygon points={`${PLOT_X + PLOT_W - 6},${PLOT_Y + PLOT_H - 4} ${PLOT_X + PLOT_W + 2},${PLOT_Y + PLOT_H} ${PLOT_X + PLOT_W - 6},${PLOT_Y + PLOT_H + 4}`} fill="currentColor" opacity={0.75} />
        {/* Origin "O" */}
        <text x={PLOT_X - 12} y={PLOT_Y + PLOT_H + 14} fontSize={11} fontWeight={700} fill="currentColor" opacity={0.45}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>
        {/* Y-axis label */}
        <text
          x={PLOT_X - 14} y={PLOT_Y + PLOT_H / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${PLOT_X - 14} ${PLOT_Y + PLOT_H / 2})`}
          fontSize={11} fontWeight={700} fill="currentColor" opacity={0.6}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >{yAxis}</text>
        {/* X-axis label */}
        <text x={PLOT_X + PLOT_W / 2} y={PLOT_Y + PLOT_H + 34} textAnchor="middle" fontSize={11} fontWeight={700}
          fill="currentColor" opacity={0.6} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{xAxis}</text>

        {/* Clipped content */}
        <g clipPath={`url(#plot-clip-${uid})`}>
          {/* Shaded regions */}
          {regions.map((r, i) => {
            const points = r.vertices.map((v) => `${eToSvgX(v.x)},${eToSvgY(v.y)}`).join(" ");
            const cx = r.vertices.reduce((s, v) => s + eToSvgX(v.x), 0) / r.vertices.length;
            const cy = r.vertices.reduce((s, v) => s + eToSvgY(v.y), 0) / r.vertices.length;
            return (
              <g key={`region-${i}`}>
                <polygon points={points} fill={r.color} opacity={r.opacity ?? 0.15} />
                {r.label && (
                  <text x={cx} y={cy} textAnchor="middle" fontSize={9} fontWeight={700}
                    fill={r.labelColor ?? r.color} opacity={0.9}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {r.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Curves */}
          {[...curves, ...shiftedCurves].map((c) => {
            const ep = allCurves.get(c.id)?.endpoints;
            if (!ep) return null;
            return (
              <line
                key={c.id}
                x1={ep.x1} y1={ep.y1} x2={ep.x2} y2={ep.y2}
                stroke={c.color}
                strokeWidth={c.width ?? 2.5}
                strokeDasharray={c.style === "dashed" ? "6,3" : undefined}
                strokeLinecap="round"
              />
            );
          })}

          {/* Shift arrows */}
          {shiftedCurves.map((sc) => {
            if (!sc.originalId) return null;
            const orig = allCurves.get(sc.originalId)?.endpoints;
            const shifted = allCurves.get(sc.id)?.endpoints;
            if (!orig || !shifted) return null;
            const midOx = (orig.x1 + orig.x2) / 2;
            const midOy = (orig.y1 + orig.y2) / 2;
            const midSx = (shifted.x1 + shifted.x2) / 2;
            const midSy = (shifted.y1 + shifted.y2) / 2;
            return (
              <line
                key={`arrow-${sc.id}`}
                x1={midOx} y1={midOy} x2={midSx} y2={midSy}
                stroke={sc.color} strokeWidth={1.5} strokeDasharray="3,2"
                markerEnd={`url(#arrow-shift-${uid})`} opacity={0.7}
              />
            );
          })}
        </g>

        {/* Equilibria: dashed projections + dots (outside clip so labels aren't cut) */}
        {eqPoints.map((eq, i) => {
          if (!eq.point) return null;
          const pt = eq.point;
          return (
            <g key={`eq-${i}`}>
              <DashedProjection
                x={pt.x} y={pt.y} color={eq.color}
                pLabel={eq.pLabel ?? `P${i + 1}`}
                qLabel={eq.qLabel ?? `Q${i + 1}`}
              />
              <EqDot
                x={pt.x} y={pt.y} color={eq.color}
                label={eq.label} tooltip={eq.tooltip}
                gradId={dotGradients[i]?.id ?? `eq-dot-${uid}-0`}
              />
            </g>
          );
        })}

        {/* Curve labels (collision-resolved) */}
        {[...curves, ...shiftedCurves].map((c, i) => {
          const pos = curveLabels[i];
          if (!pos) return null;
          return (
            <DiagramLabel
              key={`lbl-${c.id}`}
              x={pos.x} y={pos.y}
              text={c.label} color={c.color}
              anchor="end"
            />
          );
        })}

        {/* Annotations */}
        {annotations.map((a, i) => (
          <DiagramLabel
            key={`ann-${i}`}
            x={eToSvgX(a.x)} y={eToSvgY(a.y)}
            text={a.text} color={a.color}
            size={a.size ?? 10}
            anchor={a.anchor ?? "start"}
          />
        ))}
      </svg>

      {/* Legend */}
      {legendItems.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3 px-2">
          {legendItems.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="w-3 h-[3px] rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-[10px] font-medium text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
