/**
 * DiagramSpecRenderer · The single renderDiagram() engine.
 *
 * Takes a DiagramSpec and renders a complete SVG economics diagram:
 *   1. Resolves all curve equations mathematically
 *   2. Computes ALL equilibria via intersect() · never hardcoded
 *   3. Draws shading, then curves, then equilibrium points
 *   4. Places every label relative to its computed SVG coordinate
 *   5. Runs sanity checks and logs console.error if violated
 *
 * All positioning goes through toSx/toSy · no diagram-specific code
 * touches SVG coordinates directly.
 */

import { useState, useId, useMemo } from "react";
import type {
  DiagramSpec,
  CurveSpec,
  CurveParams,
  LinearCurve,
  VerticalCurve,
  HorizontalCurve,
  QuadraticCurve,
  PiecewiseCurve,
  EquilibriumSpec,
  ShadingSpec,
  VertexRef,
  SanityCheck,
} from "./diagramSpecs";

/* ══════════════════════════════════════════════
   SVG Layout Constants · single source of truth
   ══════════════════════════════════════════════ */

const SVG_W = 700;
const SVG_H = 500;
const PAD = 60;
const LABEL_SAFE = 40;

const PX = PAD;         // plot area x origin
const PY = PAD;         // plot area y origin
const PW = SVG_W - 2 * PAD;  // 580
const PH = SVG_H - 2 * PAD;  // 380

/** Data space range. All curve equations are in [0, DS_MAX] */
const DS_MAX = 10;

/* ══════════════════════════════════════════════
   Coordinate mapping: data ↔ SVG
   ══════════════════════════════════════════════ */

/** Map data-space x → SVG x */
const toSx = (dx: number) => PX + (dx / DS_MAX) * PW;
/** Map data-space y → SVG y (inverted: data 0 = bottom) */
const toSy = (dy: number) => PY + PH - (dy / DS_MAX) * PH;

/* ══════════════════════════════════════════════
   Curve evaluation
   ══════════════════════════════════════════════ */

/** Evaluate a curve at a given data-space x, returning data-space y */
function evalCurve(params: CurveParams, x: number): number | null {
  switch (params.type) {
    case "linear":
      return params.slope * x + params.intercept;
    case "horizontal":
      return params.y;
    case "vertical":
      return null; // vertical lines don't have a y-for-x function
    case "quadratic":
      return params.a * x * x + params.b * x + params.c;
    case "piecewise": {
      const seg = params.segments.find(s => x >= s.xFrom && x <= s.xTo);
      if (!seg) return null;
      return evalCurve(seg.curve, x);
    }
    default:
      return null;
  }
}

/** Get SVG endpoints for a curve, clipped to data space [0, DS_MAX] */
function curveToSVG(params: CurveParams): { path: string; x1: number; y1: number; x2: number; y2: number; isPath: boolean } {
  switch (params.type) {
    case "vertical":
      return { path: "", x1: toSx(params.x), y1: toSy(DS_MAX), x2: toSx(params.x), y2: toSy(0), isPath: false };

    case "horizontal":
      return { path: "", x1: toSx(0), y1: toSy(params.y), x2: toSx(DS_MAX), y2: toSy(params.y), isPath: false };

    case "linear": {
      // Clip to [0, DS_MAX] data space
      let x0 = 0, x1 = DS_MAX;
      let y0 = params.slope * x0 + params.intercept;
      let y1 = params.slope * x1 + params.intercept;

      // Clip y to [0, DS_MAX]
      if (y0 < 0) { x0 = -params.intercept / params.slope; y0 = 0; }
      if (y0 > DS_MAX) { x0 = (DS_MAX - params.intercept) / params.slope; y0 = DS_MAX; }
      if (y1 < 0) { x1 = -params.intercept / params.slope; y1 = 0; }
      if (y1 > DS_MAX) { x1 = (DS_MAX - params.intercept) / params.slope; y1 = DS_MAX; }

      x0 = Math.max(0, Math.min(DS_MAX, x0));
      x1 = Math.max(0, Math.min(DS_MAX, x1));
      y0 = params.slope * x0 + params.intercept;
      y1 = params.slope * x1 + params.intercept;

      return { path: "", x1: toSx(x0), y1: toSy(y0), x2: toSx(x1), y2: toSy(y1), isPath: false };
    }

    case "quadratic": {
      // Sample the curve and produce an SVG path
      const steps = 40;
      const points: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * DS_MAX;
        const y = params.a * x * x + params.b * x + params.c;
        if (y >= 0 && y <= DS_MAX) {
          points.push(`${points.length === 0 ? "M" : "L"} ${toSx(x)} ${toSy(y)}`);
        }
      }
      const first = points.length > 0 ? points[0] : "";
      const last = points.length > 1 ? points[points.length - 1] : first;
      // Extract endpoints for label positioning
      const firstMatch = first.match(/[\d.]+/g);
      const lastMatch = last.match(/[\d.]+/g);
      return {
        path: points.join(" "),
        x1: firstMatch ? parseFloat(firstMatch[0]) : PX,
        y1: firstMatch ? parseFloat(firstMatch[1]) : PY,
        x2: lastMatch ? parseFloat(lastMatch[0]) : PX + PW,
        y2: lastMatch ? parseFloat(lastMatch[1]) : PY + PH,
        isPath: true,
      };
    }

    case "piecewise": {
      const points: string[] = [];
      for (const seg of params.segments) {
        const steps = 20;
        for (let i = 0; i <= steps; i++) {
          const x = seg.xFrom + (i / steps) * (seg.xTo - seg.xFrom);
          const y = evalCurve(seg.curve, x);
          if (y !== null && y >= 0 && y <= DS_MAX) {
            points.push(`${points.length === 0 ? "M" : "L"} ${toSx(x)} ${toSy(y)}`);
          }
        }
      }
      const firstMatch = points[0]?.match(/[\d.]+/g);
      const lastMatch = points[points.length - 1]?.match(/[\d.]+/g);
      return {
        path: points.join(" "),
        x1: firstMatch ? parseFloat(firstMatch[0]) : PX,
        y1: firstMatch ? parseFloat(firstMatch[1]) : PY,
        x2: lastMatch ? parseFloat(lastMatch[0]) : PX + PW,
        y2: lastMatch ? parseFloat(lastMatch[1]) : PY + PH,
        isPath: true,
      };
    }
  }
}

/* ══════════════════════════════════════════════
   Intersection math (data space)
   ══════════════════════════════════════════════ */

interface DataPoint { x: number; y: number }

/** Find intersection of two curves in data space. Returns null if parallel/unsupported. */
function intersectCurves(a: CurveParams, b: CurveParams): DataPoint | null {
  // Linear ∩ Linear
  if (a.type === "linear" && b.type === "linear") {
    const denom = a.slope - b.slope;
    if (Math.abs(denom) < 1e-6) return null;
    const x = (b.intercept - a.intercept) / denom;
    const y = a.slope * x + a.intercept;
    return { x, y };
  }

  // Vertical ∩ Linear (or vice versa)
  if (a.type === "vertical" && b.type === "linear") {
    const y = b.slope * a.x + b.intercept;
    return { x: a.x, y };
  }
  if (a.type === "linear" && b.type === "vertical") {
    const y = a.slope * b.x + a.intercept;
    return { x: b.x, y };
  }

  // Horizontal ∩ Linear (or vice versa)
  if (a.type === "horizontal" && b.type === "linear") {
    if (Math.abs(b.slope) < 1e-6) return null;
    const x = (a.y - b.intercept) / b.slope;
    return { x, y: a.y };
  }
  if (a.type === "linear" && b.type === "horizontal") {
    if (Math.abs(a.slope) < 1e-6) return null;
    const x = (b.y - a.intercept) / a.slope;
    return { x, y: b.y };
  }

  // Vertical ∩ Horizontal (or vice versa)
  if (a.type === "vertical" && b.type === "horizontal") return { x: a.x, y: b.y };
  if (a.type === "horizontal" && b.type === "vertical") return { x: b.x, y: a.y };

  // Vertical ∩ Quadratic
  if (a.type === "vertical" && b.type === "quadratic") {
    const y = b.a * a.x * a.x + b.b * a.x + b.c;
    return { x: a.x, y };
  }
  if (a.type === "quadratic" && b.type === "vertical") {
    const y = a.a * b.x * b.x + a.b * b.x + a.c;
    return { x: b.x, y };
  }

  // Linear ∩ Quadratic · solve a*x² + (b-m)*x + (c-k) = 0
  if (a.type === "quadratic" && b.type === "linear") {
    const A = a.a;
    const B = a.b - b.slope;
    const CC = a.c - b.intercept;
    const disc = B * B - 4 * A * CC;
    if (disc < 0) return null;
    const x1 = (-B + Math.sqrt(disc)) / (2 * A);
    const x2 = (-B - Math.sqrt(disc)) / (2 * A);
    // Pick the solution in [0, DS_MAX]
    const valid = [x1, x2].filter(x => x >= 0 && x <= DS_MAX);
    if (valid.length === 0) return null;
    const x = valid[0];
    const y = b.slope * x + b.intercept;
    return { x, y };
  }
  if (a.type === "linear" && b.type === "quadratic") {
    return intersectCurves(b, a);
  }

  // Vertical/Horizontal ∩ Piecewise
  if (b.type === "piecewise" && (a.type === "vertical" || a.type === "horizontal" || a.type === "linear")) {
    for (const seg of b.segments) {
      const result = intersectCurves(a, seg.curve);
      if (result && result.x >= seg.xFrom && result.x <= seg.xTo) return result;
    }
    return null;
  }
  if (a.type === "piecewise") {
    for (const seg of a.segments) {
      const result = intersectCurves(seg.curve, b);
      if (result && result.x >= seg.xFrom && result.x <= seg.xTo) return result;
    }
    return null;
  }

  return null;
}

/* ══════════════════════════════════════════════
   Label positioning with collision detection
   ══════════════════════════════════════════════ */

interface LabelRect { x: number; y: number; w: number; h: number }

function rectsOverlap(a: LabelRect, b: LabelRect): boolean {
  return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y);
}

function clampLabel(x: number, y: number, w: number, h: number): { x: number; y: number } {
  return {
    x: Math.max(LABEL_SAFE, Math.min(x, SVG_W - LABEL_SAFE - w)),
    y: Math.max(LABEL_SAFE + h, Math.min(y, SVG_H - LABEL_SAFE)),
  };
}

/* ══════════════════════════════════════════════
   SVG Sub-components
   ══════════════════════════════════════════════ */

function SpecLabel({ x, y, text, color, size = 11, anchor = "start", bold = true }: {
  x: number; y: number; text: string; color: string; size?: number; anchor?: string; bold?: boolean;
}) {
  const charW = size * 0.62;
  const textW = text.length * charW;
  const textH = size + 2;
  const pad = 3;
  const clamped = clampLabel(
    anchor === "end" ? x - textW : anchor === "middle" ? x - textW / 2 : x,
    y, textW, textH
  );
  const cx = anchor === "end" ? clamped.x + textW : anchor === "middle" ? clamped.x + textW / 2 : clamped.x;
  const cy = clamped.y;

  return (
    <g>
      <rect
        x={clamped.x - pad}
        y={cy - textH + 2}
        width={textW + pad * 2}
        height={textH + pad}
        rx={3}
        fill="hsl(var(--card))"
        opacity={0.88}
      />
      <text
        x={cx} y={cy} fill={color} textAnchor={anchor} fontSize={size}
        fontWeight={bold ? 700 : 500}
        className="select-none"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {text}
      </text>
    </g>
  );
}

function SpecDot({ x, y, color, label, labelPos = "tr", gradId, tooltip }: {
  x: number; y: number; color: string; label: string; labelPos?: "tr" | "tl" | "br" | "bl";
  gradId: string; tooltip?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const dx = labelPos.includes("l") ? -10 : 8;
  const dy = labelPos.includes("b") ? 15 : -8;
  const tipW = 170;

  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="cursor-pointer">
      <circle cx={x} cy={y} r={hovered ? 11 : 7} fill={color} opacity={hovered ? 0.2 : 0.08}
        className="transition-all duration-300" />
      <circle cx={x} cy={y} r={hovered ? 5.5 : 4.5} fill={`url(#${gradId})`}
        stroke="white" strokeWidth={1.5} filter="url(#spec-drop-shadow)"
        className="transition-all duration-300" />
      <circle cx={x - 1.2} cy={y - 1.2} r={1.5} fill="white" opacity={0.65} />
      <text x={x + dx} y={y + dy} fill={color} fontSize={10} fontWeight={700}
        textAnchor={labelPos.includes("l") ? "end" : "start"}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {label}
      </text>
      {hovered && tooltip && (
        <g>
          <rect x={x - tipW / 2} y={y - 42} width={tipW} height={28} rx={6}
            fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={0.8}
            filter="url(#spec-drop-shadow)" opacity={0.97} />
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

function SpecProjection({ x, y, color, pLabel, qLabel }: {
  x: number; y: number; color: string; pLabel: string; qLabel: string;
}) {
  return (
    <>
      <line x1={PX} y1={y} x2={x} y2={y} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <line x1={x} y1={y} x2={x} y2={PY + PH} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <g>
        <rect x={PX - 24} y={y - 8} width={20} height={16} rx={8} fill={color} opacity={0.12} />
        <text x={PX - 14} y={y + 4} fill={color} fontSize={9} fontWeight={700} textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{pLabel}</text>
      </g>
      <g>
        <rect x={x - 10} y={PY + PH + 2} width={20} height={16} rx={8} fill={color} opacity={0.12} />
        <text x={x} y={PY + PH + 14} fill={color} fontSize={9} fontWeight={700} textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{qLabel}</text>
      </g>
    </>
  );
}

/* ══════════════════════════════════════════════
   Main Renderer
   ══════════════════════════════════════════════ */

interface DiagramSpecRendererProps {
  spec: DiagramSpec;
  className?: string;
}

export default function DiagramSpecRenderer({ spec, className }: DiagramSpecRendererProps) {
  const uid = useId().replace(/:/g, "");

  // ── 1. Resolve all curve SVG data ──
  const curveMap = useMemo(() => {
    const map = new Map<string, { spec: CurveSpec; svg: ReturnType<typeof curveToSVG> }>();
    for (const c of spec.curves) {
      map.set(c.id, { spec: c, svg: curveToSVG(c.params) });
    }
    return map;
  }, [spec.curves]);

  // ── 2. Compute ALL equilibria via intersect() ──
  const eqMap = useMemo(() => {
    const map = new Map<string, { spec: EquilibriumSpec; point: DataPoint | null; svgPoint: { x: number; y: number } | null }>();
    for (const eq of spec.equilibria) {
      const cA = spec.curves.find(c => c.id === eq.curve1);
      const cB = spec.curves.find(c => c.id === eq.curve2);
      if (!cA || !cB) {
        console.error(`[DiagramSpec] Equilibrium "${eq.id}" references unknown curve(s): ${eq.curve1}, ${eq.curve2}`);
        map.set(eq.id, { spec: eq, point: null, svgPoint: null });
        continue;
      }
      const pt = intersectCurves(cA.params, cB.params);
      if (!pt) {
        console.error(`[DiagramSpec] No intersection found for "${eq.id}" between ${eq.curve1} and ${eq.curve2}`);
        map.set(eq.id, { spec: eq, point: null, svgPoint: null });
        continue;
      }
      map.set(eq.id, { spec: eq, point: pt, svgPoint: { x: toSx(pt.x), y: toSy(pt.y) } });
    }
    return map;
  }, [spec.curves, spec.equilibria]);

  // ── 3. Run sanity checks ──
  useMemo(() => {
    if (!spec.sanityChecks) return;
    for (const check of spec.sanityChecks) {
      const a = eqMap.get(check.check.eq1)?.point;
      const b = eqMap.get(check.check.eq2)?.point;
      if (!a || !b) continue;
      const va = check.check.axis === "x" ? a.x : a.y;
      const vb = check.check.axis === "x" ? b.x : b.y;
      let ok = false;
      if (check.check.relation === "<") ok = va < vb;
      else if (check.check.relation === ">") ok = va > vb;
      else ok = Math.abs(va - vb) < 0.01;
      if (!ok) {
        console.error(`[DiagramSpec] SANITY CHECK FAILED: ${check.description} · got ${va.toFixed(2)} vs ${vb.toFixed(2)}`);
      }
    }
  }, [eqMap, spec.sanityChecks]);

  // ── 4. Resolve shading vertices ──
  const resolvedShadings = useMemo(() => {
    if (!spec.shading) return [];
    return spec.shading.map(shade => {
      const svgVertices = shade.vertices.map(v => resolveVertex(v, eqMap, spec.curves));
      return { ...shade, svgVertices };
    });
  }, [spec.shading, eqMap, spec.curves]);

  // ── Dot gradients ──
  const dotGrads = useMemo(() => {
    const colors: Record<string, [string, string, string]> = {
      "#16a34a": ["#86efac", "#16a34a", "#15803d"],
      "#d97706": ["#fde68a", "#f59e0b", "#d97706"],
      "#f59e0b": ["#fde68a", "#f59e0b", "#d97706"],
      "#eab308": ["#fde68a", "#eab308", "#ca8a04"],
      "#ef4444": ["#fca5a5", "#ef4444", "#dc2626"],
      "#3b82f6": ["#bfdbfe", "#3b82f6", "#2563eb"],
      "#6b7280": ["#d1d5db", "#6b7280", "#4b5563"],
    };
    return Array.from(eqMap.values()).map((eq, i) => {
      const c = colors[eq.spec.color] ?? ["#d1d5db", eq.spec.color, eq.spec.color];
      return { id: `spec-dot-${uid}-${i}`, c1: c[0], c2: c[1], c3: c[2] };
    });
  }, [eqMap, uid]);

  const legendItems = spec.legend ?? spec.curves.map(c => ({ label: c.label, color: c.color }));

  return (
    <div className={`rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-lg relative overflow-hidden group transition-shadow duration-300 hover:shadow-xl ${className ?? ""}`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
      <p className="text-xs font-bold uppercase tracking-widest mb-4 text-primary flex items-center gap-2 relative z-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">📊</span>
        {spec.title}
      </p>

      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-[700px] h-auto text-foreground relative z-10">
        <defs>
          <clipPath id={`spec-clip-${uid}`}>
            <rect x={PX} y={PY} width={PW} height={PH} />
          </clipPath>
          <pattern id={`spec-grid-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.06" />
          </pattern>
          <filter id="spec-drop-shadow">
            <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.10" />
          </filter>
          {dotGrads.map(g => (
            <radialGradient key={g.id} id={g.id} cx="35%" cy="35%">
              <stop offset="0%" stopColor={g.c1} />
              <stop offset="60%" stopColor={g.c2} />
              <stop offset="100%" stopColor={g.c3} />
            </radialGradient>
          ))}
          <marker id={`spec-arrow-${uid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" opacity="0.7" />
          </marker>
        </defs>

        {/* Grid */}
        <rect x={PX} y={PY} width={PW} height={PH} fill={`url(#spec-grid-${uid})`} />

        {/* Axes */}
        <line x1={PX} y1={PY} x2={PX} y2={PY + PH} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
        <line x1={PX} y1={PY + PH} x2={PX + PW} y2={PY + PH} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
        <polygon points={`${PX - 4},${PY + 6} ${PX},${PY - 2} ${PX + 4},${PY + 6}`} fill="currentColor" opacity={0.75} />
        <polygon points={`${PX + PW - 6},${PY + PH - 4} ${PX + PW + 2},${PY + PH} ${PX + PW - 6},${PY + PH + 4}`} fill="currentColor" opacity={0.75} />
        <text x={PX - 12} y={PY + PH + 14} fontSize={11} fontWeight={700} fill="currentColor" opacity={0.45}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>
        <text
          x={PX - 14} y={PY + PH / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${PX - 14} ${PY + PH / 2})`}
          fontSize={11} fontWeight={700} fill="currentColor" opacity={0.6}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >{spec.axisLabels.y}</text>
        <text x={PX + PW / 2} y={PY + PH + 34} textAnchor="middle" fontSize={11} fontWeight={700}
          fill="currentColor" opacity={0.6} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{spec.axisLabels.x}</text>

        {/* Clipped content */}
        <g clipPath={`url(#spec-clip-${uid})`}>
          {/* ── Layer 1: Shading ── */}
          {resolvedShadings.map((shade, i) => {
            const pts = shade.svgVertices.filter(Boolean) as { x: number; y: number }[];
            if (pts.length < 3) return null;
            const pointsStr = pts.map(p => `${p.x},${p.y}`).join(" ");
            const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
            const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
            return (
              <g key={`shade-${i}`}>
                <polygon
                  points={pointsStr}
                  fill={shade.color}
                  fillOpacity={shade.opacity ?? 0.18}
                  stroke={shade.strokeColor ?? shade.color}
                  strokeWidth={shade.strokeColor ? 1.5 : 0}
                  strokeDasharray={shade.strokeDash ? "5,3" : undefined}
                />
                {shade.label && (
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fontWeight={700}
                    fill={shade.labelColor ?? shade.color} opacity={0.9}
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {shade.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* ── Layer 2: Curves ── */}
          {spec.curves.map(c => {
            const cd = curveMap.get(c.id);
            if (!cd) return null;
            const { svg } = cd;
            if (svg.isPath) {
              return (
                <path
                  key={c.id}
                  d={svg.path}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={c.width ?? 2.5}
                  strokeDasharray={c.dash ? "6,3" : undefined}
                  strokeLinecap="round"
                />
              );
            }
            return (
              <line
                key={c.id}
                x1={svg.x1} y1={svg.y1} x2={svg.x2} y2={svg.y2}
                stroke={c.color}
                strokeWidth={c.width ?? 2.5}
                strokeDasharray={c.dash ? "6,3" : undefined}
                strokeLinecap="round"
              />
            );
          })}

          {/* ── Shift arrows ── */}
          {spec.curves.filter(c => c.shiftedFrom).map(c => {
            const orig = curveMap.get(c.shiftedFrom!)?.svg;
            const shifted = curveMap.get(c.id)?.svg;
            if (!orig || !shifted) return null;
            const mx = (orig.x1 + orig.x2) / 2;
            const my = (orig.y1 + orig.y2) / 2;
            const sx = (shifted.x1 + shifted.x2) / 2;
            const sy = (shifted.y1 + shifted.y2) / 2;
            return (
              <line
                key={`arrow-${c.id}`}
                x1={mx} y1={my} x2={sx} y2={sy}
                stroke={c.color} strokeWidth={1.5} strokeDasharray="3,2"
                markerEnd={`url(#spec-arrow-${uid})`} opacity={0.7}
              >
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
              </line>
            );
          })}
        </g>

        {/* ── Layer 3: Equilibrium projections + dots (outside clip) ── */}
        {Array.from(eqMap.values()).map((eq, i) => {
          if (!eq.svgPoint) return null;
          return (
            <g key={`eq-${eq.spec.id}`}>
              <SpecProjection
                x={eq.svgPoint.x} y={eq.svgPoint.y} color={eq.spec.color}
                pLabel={eq.spec.pLabel} qLabel={eq.spec.qLabel}
              />
              <SpecDot
                x={eq.svgPoint.x} y={eq.svgPoint.y} color={eq.spec.color}
                label={eq.spec.label} tooltip={eq.spec.tooltip}
                labelPos={eq.spec.labelPos ?? "tr"}
                gradId={dotGrads[i]?.id ?? `spec-dot-${uid}-0`}
              />
            </g>
          );
        })}

        {/* ── Layer 4: Curve labels ── */}
        {spec.curves.map(c => {
          const cd = curveMap.get(c.id);
          if (!cd) return null;
          const { svg } = cd;
          // Anchor at end of line
          const isUp = c.params.type === "linear" && c.params.slope >= 0;
          const dx = c.params.type === "vertical" ? 8 : -8;
          const dy = isUp ? 14 : -10;
          return (
            <SpecLabel
              key={`lbl-${c.id}`}
              x={svg.x2 + dx}
              y={svg.y2 + dy}
              text={c.label}
              color={c.color}
              size={10}
              anchor="end"
            />
          );
        })}

        {/* ── Annotations ── */}
        {spec.annotations?.map((ann, i) => {
          let ax: number, ay: number;
          if ("eq" in ann.position) {
            const eq = eqMap.get(ann.position.eq);
            if (!eq?.svgPoint) return null;
            ax = eq.svgPoint.x + (ann.position.dx ?? 0);
            ay = eq.svgPoint.y + (ann.position.dy ?? 0);
          } else {
            ax = toSx(ann.position.x);
            ay = toSy(ann.position.y);
          }
          return (
            <SpecLabel
              key={`ann-${i}`}
              x={ax} y={ay}
              text={ann.text} color={ann.color}
              size={ann.size ?? 10}
              anchor={ann.anchor ?? "start"}
            />
          );
        })}
      </svg>

      {/* Legend */}
      {legendItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 relative z-10">
          {legendItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full transition-transform duration-200 hover:scale-105"
              style={{
                backgroundColor: `${item.color}18`,
                color: item.color,
                border: `1px solid ${item.color}30`,
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 4px ${item.color}60` }} />
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Vertex resolution helper
   ══════════════════════════════════════════════ */

function resolveVertex(
  v: VertexRef,
  eqMap: Map<string, { spec: EquilibriumSpec; point: DataPoint | null; svgPoint: { x: number; y: number } | null }>,
  curves: CurveSpec[]
): { x: number; y: number } | null {
  if ("eq" in v) {
    return eqMap.get(v.eq)?.svgPoint ?? null;
  }
  if ("curve" in v) {
    const curve = curves.find(c => c.id === v.curve);
    if (!curve) return null;

    let dataX: number;
    if ("atEqX" in v) {
      const eq = eqMap.get(v.atEqX);
      if (!eq?.point) return null;
      dataX = eq.point.x;
    } else if ("atX" in v) {
      dataX = v.atX;
    } else {
      return null;
    }

    const dataY = evalCurve(curve.params, dataX);
    if (dataY === null) return null;
    return { x: toSx(dataX), y: toSy(dataY) };
  }
  if ("x" in v && "y" in v) {
    return { x: toSx(v.x), y: toSy(v.y) };
  }
  return null;
}
