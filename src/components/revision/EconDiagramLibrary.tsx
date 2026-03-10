/**
 * Predefined SVG Economics Diagram Templates — Premium Polished Edition
 * 
 * All curves are clipped to the plot area so nothing extends beyond axes.
 * Hover annotations provide A-Level exam tips for producing high-quality diagrams.
 */

import { cn } from "@/lib/utils";
import { useState } from "react";

export type DiagramType =
  | "supply_demand"
  | "demand_increase"
  | "demand_decrease"
  | "supply_increase"
  | "supply_decrease"
  | "positive_externality"
  | "negative_externality"
  | "negative_production_externality"
  | "positive_production_externality"
  | "ad_increase"
  | "ad_decrease"
  | "sras_decrease"
  | "sras_increase"
  | "ped_elastic"
  | "ped_inelastic"
  | "ppf"
  | "ppf_growth"
  | "phillips_curve"
  | "tax_incidence"
  | "subsidy"
  | "price_floor"
  | "price_ceiling"
  | "monopoly"
  | "perfect_competition";

interface DiagramConfig {
  title: string;
  xAxis: string;
  yAxis: string;
  legend?: { label: string; color: string }[];
  examTips: string[];
  render: (p: DrawParams) => JSX.Element;
}

interface DrawParams {
  W: number; H: number;
  mx: number; my: number; pw: number; ph: number;
}

const COLORS = {
  demand: "#3b82f6",
  supply: "#ef4444",
  shifted: "#f59e0b",
  eq: "#16a34a",
  area: "#8b5cf6",
  msc: "#ef4444",
  msb: "#3b82f6",
  mpb: "#93c5fd",
  mpc: "#fca5a5",
  lras: "#6b7280",
};

/* ── SVG Defs ── */
function PremiumDefs({ mx, my, pw, ph }: { mx: number; my: number; pw: number; ph: number }) {
  return (
    <defs>
      {/* Clip path — nothing renders outside the plot area */}
      <clipPath id="plot-clip">
        <rect x={mx} y={my} width={pw} height={ph} />
      </clipPath>
      {/* Glow filters */}
      {["blue|#3b82f6", "red|#ef4444", "amber|#f59e0b", "green|#16a34a", "purple|#8b5cf6"].map(s => {
        const [name, col] = s.split("|");
        return (
          <filter key={name} id={`glow-${name}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor={col} floodOpacity="0.35" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        );
      })}
      <filter id="drop-shadow">
        <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.10" />
      </filter>
      {/* Gradient strokes */}
      {[
        { id: "grad-demand", c1: "#60a5fa", c2: "#2563eb" },
        { id: "grad-supply", c1: "#f87171", c2: "#dc2626" },
        { id: "grad-shifted", c1: "#fbbf24", c2: "#d97706" },
        { id: "grad-eq", c1: "#4ade80", c2: "#16a34a" },
        { id: "grad-area", c1: "#a78bfa", c2: "#7c3aed" },
        { id: "grad-lras", c1: "#9ca3af", c2: "#4b5563" },
      ].map(g => (
        <linearGradient key={g.id} id={g.id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={g.c1} />
          <stop offset="100%" stopColor={g.c2} />
        </linearGradient>
      ))}
      {/* Radial gradients for dots */}
      {[
        { id: "dot-green", c1: "#86efac", c2: "#16a34a", c3: "#15803d" },
        { id: "dot-amber", c1: "#fde68a", c2: "#f59e0b", c3: "#d97706" },
        { id: "dot-blue", c1: "#bfdbfe", c2: "#3b82f6", c3: "#2563eb" },
      ].map(g => (
        <radialGradient key={g.id} id={g.id} cx="35%" cy="35%">
          <stop offset="0%" stopColor={g.c1} />
          <stop offset="60%" stopColor={g.c2} />
          <stop offset="100%" stopColor={g.c3} />
        </radialGradient>
      ))}
      {/* Arrow markers */}
      {["demand", "supply", "shifted"].map(name => (
        <marker key={name} id={`arrow-${name}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={`url(#grad-${name})`} />
        </marker>
      ))}
      {/* Grid */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.25" opacity="0.06" />
      </pattern>
    </defs>
  );
}

/* ── Drawing primitives ── */

function GLine({ x1, y1, x2, y2, color, dashed, width = 2.5, glow, gradientId }: {
  x1: number; y1: number; x2: number; y2: number; color: string;
  dashed?: boolean; width?: number; glow?: string; gradientId?: string;
}) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={gradientId ? `url(#${gradientId})` : color}
      strokeWidth={width}
      strokeDasharray={dashed ? "6,3" : undefined}
      strokeLinecap="round"
      filter={glow ? `url(#${glow})` : undefined}
    />
  );
}

function CurvePath({ d, color, dashed, width = 2.5, glow, gradientId }: {
  d: string; color: string;
  dashed?: boolean; width?: number; glow?: string; gradientId?: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={gradientId ? `url(#${gradientId})` : color}
      strokeWidth={width}
      strokeDasharray={dashed ? "6,3" : undefined}
      strokeLinecap="round"
      filter={glow ? `url(#${glow})` : undefined}
    />
  );
}

function Label({ x, y, text, color, size = 11, anchor = "start", bold = true }: {
  x: number; y: number; text: string; color: string; size?: number; anchor?: string; bold?: boolean;
}) {
  return (
    <text
      x={x} y={y} fill={color} textAnchor={anchor} fontSize={size}
      fontWeight={bold ? 700 : 500}
      className="select-none"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {text}
    </text>
  );
}

/* ── Equilibrium dot with hover exam-tip tooltip ── */
function PremiumDot({ x, y, color, label, labelPos = "tr", gradientId, tooltipText }: {
  x: number; y: number; color: string; label: string; labelPos?: "tr" | "tl" | "br" | "bl";
  gradientId?: string; tooltipText?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const dx = labelPos.includes("l") ? -10 : 8;
  const dy = labelPos.includes("b") ? 15 : -8;
  const grad = gradientId || "dot-green";

  // Calculate tooltip position — keep it on-screen
  const tipW = 160;
  const tipH = 34;
  const tipX = x - tipW / 2;
  const tipY = y - 44;

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      {/* Outer glow ring */}
      <circle cx={x} cy={y} r={hovered ? 11 : 7} fill={color} opacity={hovered ? 0.2 : 0.08}
        className="transition-all duration-300" />
      {/* Main dot */}
      <circle cx={x} cy={y} r={hovered ? 5.5 : 4.5} fill={`url(#${grad})`}
        stroke="white" strokeWidth={1.5} filter="url(#drop-shadow)"
        className="transition-all duration-300" />
      {/* Specular highlight */}
      <circle cx={x - 1.2} cy={y - 1.2} r={1.5} fill="white" opacity={0.65} />
      {/* Label */}
      <text x={x + dx} y={y + dy} fill={color} fontSize={10} fontWeight={700}
        textAnchor={labelPos.includes("l") ? "end" : "start"}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </text>
      {/* Hover tooltip with exam tip */}
      {hovered && tooltipText && (
        <g>
          <rect
            x={tipX} y={tipY} width={tipW} height={tipH} rx={8}
            fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={0.8}
            filter="url(#drop-shadow)" opacity={0.97}
          />
          {/* Tooltip arrow */}
          <polygon
            points={`${x - 5},${tipY + tipH} ${x},${tipY + tipH + 5} ${x + 5},${tipY + tipH}`}
            fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={0.8}
          />
          <rect x={x - 6} y={tipY + tipH - 1} width={12} height={3} fill="hsl(var(--popover))" />
          <text x={x} y={tipY + 14} textAnchor="middle" fontSize={8.5} fontWeight={600}
            fill="hsl(var(--popover-foreground))"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {tooltipText.length > 24 ? tooltipText.slice(0, 24) : tooltipText}
          </text>
          {tooltipText.length > 24 && (
            <text x={x} y={tipY + 26} textAnchor="middle" fontSize={8} fontWeight={500}
              fill="hsl(var(--muted-foreground))"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {tooltipText.slice(24, 52)}
            </text>
          )}
        </g>
      )}
    </g>
  );
}

/* ── Dashed projection lines to axes ── */
function DashedToAxes({ x, y, mx, ph, my, color, pLabel, qLabel }: {
  x: number; y: number; mx: number; ph: number; my: number; color: string; pLabel: string; qLabel: string;
}) {
  return (
    <>
      {/* Horizontal to Y-axis */}
      <line x1={mx} y1={y} x2={x} y2={y} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      {/* Vertical to X-axis */}
      <line x1={x} y1={y} x2={x} y2={my + ph} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      {/* Y-axis pill label */}
      <g>
        <rect x={mx - 24} y={y - 8} width={20} height={16} rx={8} fill={color} opacity={0.12} />
        <text x={mx - 14} y={y + 4} fill={color} fontSize={9} fontWeight={700} textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{pLabel}</text>
      </g>
      {/* X-axis pill label */}
      <g>
        <rect x={x - 10} y={my + ph + 2} width={20} height={16} rx={8} fill={color} opacity={0.12} />
        <text x={x} y={my + ph + 14} fill={color} fontSize={9} fontWeight={700} textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{qLabel}</text>
      </g>
    </>
  );
}

/* ── Axes with origin, arrow tips, bold labels ── */
function Axes({ mx, my, pw, ph, xLabel, yLabel }: {
  mx: number; my: number; pw: number; ph: number; xLabel: string; yLabel: string;
}) {
  return (
    <>
      {/* Background grid */}
      <rect x={mx} y={my} width={pw} height={ph} fill="url(#grid)" />
      {/* Y-axis */}
      <line x1={mx} y1={my} x2={mx} y2={my + ph} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
      {/* X-axis */}
      <line x1={mx} y1={my + ph} x2={mx + pw} y2={my + ph} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
      {/* Y-axis arrow */}
      <polygon points={`${mx - 4},${my + 6} ${mx},${my - 2} ${mx + 4},${my + 6}`} fill="currentColor" opacity={0.75} />
      {/* X-axis arrow */}
      <polygon points={`${mx + pw - 6},${my + ph - 4} ${mx + pw + 2},${my + ph} ${mx + pw - 6},${my + ph + 4}`} fill="currentColor" opacity={0.75} />
      {/* Origin */}
      <text x={mx - 12} y={my + ph + 14} fontSize={11} fontWeight={700} fill="currentColor" opacity={0.45}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>
      {/* Y-axis label */}
      <text
        x={mx - 14} y={my + ph / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${mx - 14} ${my + ph / 2})`}
        fontSize={11} fontWeight={700} fill="currentColor" opacity={0.6}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >{yLabel}</text>
      {/* X-axis label */}
      <text x={mx + pw / 2} y={my + ph + 34} textAnchor="middle" fontSize={11} fontWeight={700} fill="currentColor" opacity={0.6}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{xLabel}</text>
    </>
  );
}

/* ── Shift Arrow ── */
function ShiftArrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={1.5} strokeDasharray="3,2"
      markerEnd="url(#arrow-shifted)" opacity={0.7}
    >
      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
    </line>
  );
}

/* ══════════════════════ DIAGRAM CONFIGS ══════════════════════ */

const supplyDemandBase = (p: DrawParams, shiftCurve?: "demand" | "supply", shiftDir?: "left" | "right") => {
  const { mx, my, pw, ph } = p;
  const offset = shiftDir === "right" ? 45 : shiftDir === "left" ? -45 : 0;

  // Curves strictly within plot area
  const d = { x1: mx + 8, y1: my + 8, x2: mx + pw - 8, y2: my + ph - 8 };
  const s = { x1: mx + 8, y1: my + ph - 8, x2: mx + pw - 8, y2: my + 8 };

  const eqX = mx + pw * 0.47;
  const eqY = my + ph * 0.47;

  let newX = eqX, newY = eqY;
  if (shiftCurve === "supply") {
    newX = eqX + (shiftDir === "left" ? -22 : 22);
    newY = eqY + (shiftDir === "left" ? -18 : 18);
  } else if (shiftCurve === "demand") {
    newX = eqX + (shiftDir === "right" ? 22 : -22);
    newY = eqY + (shiftDir === "right" ? -18 : 18);
  }

  return (
    <>
      {/* Demand */}
      <GLine {...d} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
      <Label x={d.x2 - 16} y={d.y2 - 4} text="D₁" color={COLORS.demand} />

      {shiftCurve === "demand" && (
        <>
          <GLine x1={d.x1 + offset} y1={d.y1} x2={d.x2 + offset} y2={d.y2} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={d.x2 + offset - 16} y={d.y2 - 4} text="D₂" color={COLORS.demand} />
          <ShiftArrow x1={eqX} y1={eqY} x2={newX} y2={newY} color={COLORS.shifted} />
        </>
      )}

      {/* Supply */}
      <GLine {...s} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
      <Label x={s.x2 - 16} y={s.y2 + 14} text="S₁" color={COLORS.supply} />

      {shiftCurve === "supply" && (
        <>
          <GLine x1={s.x1 + offset} y1={s.y1} x2={s.x2 + offset} y2={s.y2} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={s.x2 + offset - 16} y={s.y2 + 14} text="S₂" color={COLORS.supply} />
          <ShiftArrow x1={eqX} y1={eqY} x2={newX} y2={newY} color={COLORS.shifted} />
        </>
      )}

      <DashedToAxes x={eqX} y={eqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
      <PremiumDot x={eqX} y={eqY} color={COLORS.eq} label="E₁" gradientId="dot-green"
        tooltipText="✓ Always label equilibrium clearly with E₁" />

      {shiftCurve && (
        <>
          <DashedToAxes x={newX} y={newY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <PremiumDot x={newX} y={newY} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ Show new equilibrium E₂ with P₂, Q₂" />
        </>
      )}
    </>
  );
};

const DIAGRAMS: Record<string, DiagramConfig> = {
  supply_demand: {
    title: "Supply & Demand Equilibrium",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Equilibrium", color: COLORS.eq }],
    examTips: [
      "Always label both axes: Price (P) on Y, Quantity (Q) on X",
      "Mark the equilibrium point clearly as E with dashed lines to both axes",
      "Label curves at the end: D for demand, S for supply",
      "Include origin 'O' at the intersection of axes",
    ],
    render: (p) => <>{supplyDemandBase(p)}</>,
  },
  demand_increase: {
    title: "Increase in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift →", color: COLORS.shifted }],
    examTips: [
      "Show the original D₁ and shifted D₂ clearly",
      "Use an arrow to indicate direction of the shift",
      "Mark both E₁ and E₂ with corresponding P and Q values",
      "State the cause of the shift in your written answer",
    ],
    render: (p) => <>{supplyDemandBase(p, "demand", "right")}</>,
  },
  demand_decrease: {
    title: "Decrease in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift ←", color: COLORS.shifted }],
    examTips: [
      "D₂ shifts LEFT — closer to origin",
      "Price falls from P₁ to P₂, quantity falls from Q₁ to Q₂",
      "Always draw dashed projection lines to both axes",
    ],
    render: (p) => <>{supplyDemandBase(p, "demand", "left")}</>,
  },
  supply_increase: {
    title: "Increase in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift →", color: COLORS.shifted }],
    examTips: [
      "Supply shifts RIGHT — more supplied at every price",
      "Price falls, quantity rises — show both changes clearly",
      "Common causes: technology improvement, lower input costs",
    ],
    render: (p) => <>{supplyDemandBase(p, "supply", "right")}</>,
  },
  supply_decrease: {
    title: "Decrease in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift ←", color: COLORS.shifted }],
    examTips: [
      "Supply shifts LEFT — less supplied at every price",
      "Price rises, quantity falls",
      "Common causes: higher costs of production, indirect taxes",
    ],
    render: (p) => <>{supplyDemandBase(p, "supply", "left")}</>,
  },
  positive_externality: {
    title: "Positive Consumption Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC = S", color: COLORS.supply }, { label: "MPB = D", color: COLORS.mpb }, { label: "MSB", color: COLORS.demand }, { label: "Welfare Loss", color: COLORS.area }],
    examTips: [
      "MSB is above MPB — third-party benefits not captured",
      "Triangle of welfare loss between free market & social optimum",
      "Label Qₘ (free market) and Q* (social optimum) on X-axis",
      "Explain the divergence: MSB > MPB means under-consumption",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      // Supply (MPC) — upward sloping
      const sX1 = mx + 8, sY1 = my + ph - 8, sX2 = mx + pw - 8, sY2 = my + 8;
      // MPB — downward, lower
      const mpbX1 = mx + 8, mpbY1 = my + 20, mpbX2 = mx + pw * 0.72, mpbY2 = my + ph - 20;
      // MSB — downward, higher (shifted right of MPB)
      const msbX1 = mx + pw * 0.15, msbY1 = my + 12, msbX2 = mx + pw - 8, msbY2 = my + ph - 20;

      const freeEqX = mx + pw * 0.36, freeEqY = my + ph * 0.44;
      const optEqX = mx + pw * 0.50, optEqY = my + ph * 0.36;

      return (
        <>
          <GLine x1={sX1} y1={sY1} x2={sX2} y2={sY2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sX2 - 50} y={sY2 + 14} text="S = MPC" color={COLORS.supply} />
          <GLine x1={mpbX1} y1={mpbY1} x2={mpbX2} y2={mpbY2} color={COLORS.mpb} width={2} />
          <Label x={mpbX2 - 4} y={mpbY2 + 14} text="D = MPB" color={COLORS.mpb} />
          <GLine x1={msbX1} y1={msbY1} x2={msbX2} y2={msbY2} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbX2 - 22} y={msbY2 + 14} text="MSB" color={COLORS.demand} />
          {/* Welfare loss triangle */}
          <polygon
            points={`${freeEqX},${freeEqY} ${optEqX},${optEqY} ${mx + pw * 0.43},${my + ph * 0.54}`}
            fill={COLORS.area} fillOpacity={0.10} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
          />
          <Label x={mx + pw * 0.41} y={my + ph * 0.50} text="DWL" color={COLORS.area} size={9} anchor="middle" />
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Free market under-provides — Qₘ < Q*" />
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEqX} y={optEqY} color={COLORS.shifted} label="Soc. Opt." labelPos="tr" gradientId="dot-amber"
            tooltipText="✓ Socially optimal — where MSB = MSC" />
        </>
      );
    },
  },
  negative_externality: {
    title: "Negative Consumption Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC = S", color: COLORS.supply }, { label: "MPB = D", color: COLORS.mpb }, { label: "MSB", color: COLORS.demand }, { label: "Welfare Loss", color: COLORS.area }],
    examTips: [
      "MSB is below MPB — third-party costs not accounted for",
      "Free market over-provides: Qₘ > Q*",
      "Show welfare loss triangle between the two equilibria",
      "Government may impose indirect tax to correct the failure",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const sX1 = mx + 8, sY1 = my + ph - 8, sX2 = mx + pw - 8, sY2 = my + 8;
      const mpbX1 = mx + pw * 0.15, mpbY1 = my + 12, mpbX2 = mx + pw - 8, mpbY2 = my + ph - 20;
      const msbX1 = mx + 8, msbY1 = my + 20, msbX2 = mx + pw * 0.72, msbY2 = my + ph - 20;

      const freeEqX = mx + pw * 0.50, freeEqY = my + ph * 0.36;
      const optEqX = mx + pw * 0.36, optEqY = my + ph * 0.44;

      return (
        <>
          <GLine x1={sX1} y1={sY1} x2={sX2} y2={sY2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sX2 - 50} y={sY2 + 14} text="S = MPC" color={COLORS.supply} />
          <GLine x1={mpbX1} y1={mpbY1} x2={mpbX2} y2={mpbY2} color={COLORS.mpb} width={2} />
          <Label x={mpbX2 - 4} y={mpbY2 + 14} text="D = MPB" color={COLORS.mpb} />
          <GLine x1={msbX1} y1={msbY1} x2={msbX2} y2={msbY2} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbX2 - 22} y={msbY2 + 14} text="MSB" color={COLORS.demand} />
          <polygon
            points={`${optEqX},${optEqY} ${freeEqX},${freeEqY} ${mx + pw * 0.43},${my + ph * 0.54}`}
            fill={COLORS.area} fillOpacity={0.10} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
          />
          <Label x={mx + pw * 0.44} y={my + ph * 0.50} text="DWL" color={COLORS.area} size={9} anchor="middle" />
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Over-consumption — Qₘ exceeds Q*" />
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEqX} y={optEqY} color={COLORS.shifted} label="Soc. Opt." gradientId="dot-amber"
            tooltipText="✓ Socially optimal where MSB = MSC" />
        </>
      );
    },
  },
  negative_production_externality: {
    title: "Negative Production Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC", color: COLORS.mpc }, { label: "MSC", color: COLORS.msc }, { label: "D = MSB", color: COLORS.demand }],
    examTips: [
      "MSC is above MPC — external costs of production",
      "Overproduction in free market: Qₘ > Q*",
      "Welfare loss triangle between MSC and MPC at free market output",
      "Policy: tax = external cost per unit to internalise the externality",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const mpcX1 = mx + 8, mpcY1 = my + ph - 8, mpcX2 = mx + pw - 8, mpcY2 = my + 25;
      const mscX1 = mx + pw * 0.12, mscY1 = my + ph - 8, mscX2 = mx + pw - 8, mscY2 = my + 8;
      const dX1 = mx + 8, dY1 = my + 15, dX2 = mx + pw - 8, dY2 = my + ph - 8;

      const freeEqX = mx + pw * 0.47, freeEqY = my + ph * 0.42;
      const optEqX = mx + pw * 0.37, optEqY = my + ph * 0.37;

      return (
        <>
          <GLine x1={mpcX1} y1={mpcY1} x2={mpcX2} y2={mpcY2} color={COLORS.mpc} width={2} />
          <Label x={mpcX2 - 42} y={mpcY2 + 14} text="S = MPC" color={COLORS.mpc} />
          <GLine x1={mscX1} y1={mscY1} x2={mscX2} y2={mscY2} color={COLORS.msc} gradientId="grad-supply" dashed glow="glow-red" />
          <Label x={mscX2 - 26} y={mscY2 + 14} text="MSC" color={COLORS.msc} />
          <GLine x1={dX1} y1={dY1} x2={dX2} y2={dY2} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dX2 - 46} y={dY2 - 4} text="D = MSB" color={COLORS.demand} />
          <polygon
            points={`${optEqX},${optEqY} ${freeEqX},${freeEqY} ${mx + pw * 0.42},${my + ph * 0.28}`}
            fill={COLORS.area} fillOpacity={0.10} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
          />
          <Label x={mx + pw * 0.42} y={my + ph * 0.36} text="DWL" color={COLORS.area} size={9} anchor="middle" />
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Free market over-produces at Qₘ" />
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEqX} y={optEqY} color={COLORS.shifted} label="Soc. Opt." gradientId="dot-amber"
            tooltipText="✓ Optimal output where MSC = MSB" />
        </>
      );
    },
  },
  ad_increase: {
    title: "Increase in Aggregate Demand",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "AD", color: COLORS.demand }, { label: "SRAS", color: COLORS.supply }, { label: "LRAS", color: COLORS.lras }],
    examTips: [
      "LRAS is vertical at Yf (full employment output)",
      "AD shifts RIGHT — demand-pull inflation if near Yf",
      "Show both equilibria E₁ and E₂ with PL and Y values",
      "Explain the multiplier effect in your written answer",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.62;
      const eq1X = mx + pw * 0.37, eq1Y = my + ph * 0.50;
      const eq2X = mx + pw * 0.48, eq2Y = my + ph * 0.40;

      return (
        <>
          {/* LRAS */}
          <GLine x1={lrasX} y1={my + 8} x2={lrasX} y2={my + ph - 8} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 6} y={my + 20} text="LRAS" color={COLORS.lras} />
          {/* SRAS */}
          <GLine x1={mx + 8} y1={my + ph - 15} x2={mx + pw - 8} y2={my + 25} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={mx + pw - 40} y={my + 20} text="SRAS" color={COLORS.supply} />
          {/* AD₁ */}
          <GLine x1={mx + 15} y1={my + 18} x2={mx + pw * 0.58} y2={my + ph - 15} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw * 0.52} y={my + ph - 4} text="AD₁" color={COLORS.demand} />
          {/* AD₂ */}
          <GLine x1={mx + pw * 0.15} y1={my + 18} x2={mx + pw * 0.72} y2={my + ph - 15} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={mx + pw * 0.66} y={my + ph - 4} text="AD₂" color={COLORS.demand} />
          {/* Shift arrow */}
          <ShiftArrow x1={mx + pw * 0.36} y1={my + ph * 0.55} x2={mx + pw * 0.46} y2={my + ph * 0.55} color={COLORS.shifted} />

          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Label initial equilibrium clearly" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ AD↑ → higher PL & real GDP" />
        </>
      );
    },
  },
  ad_decrease: {
    title: "Decrease in Aggregate Demand",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "AD", color: COLORS.demand }, { label: "SRAS", color: COLORS.supply }, { label: "LRAS", color: COLORS.lras }],
    examTips: [
      "AD shifts LEFT — deflationary pressure",
      "Real GDP falls, price level falls",
      "Risk of demand-deficient (cyclical) unemployment",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.62;
      const eq1X = mx + pw * 0.48, eq1Y = my + ph * 0.40;
      const eq2X = mx + pw * 0.37, eq2Y = my + ph * 0.50;

      return (
        <>
          <GLine x1={lrasX} y1={my + 8} x2={lrasX} y2={my + ph - 8} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 6} y={my + 20} text="LRAS" color={COLORS.lras} />
          <GLine x1={mx + 8} y1={my + ph - 15} x2={mx + pw - 8} y2={my + 25} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={mx + pw - 40} y={my + 20} text="SRAS" color={COLORS.supply} />
          <GLine x1={mx + pw * 0.15} y1={my + 18} x2={mx + pw * 0.72} y2={my + ph - 15} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw * 0.66} y={my + ph - 4} text="AD₁" color={COLORS.demand} />
          <GLine x1={mx + 15} y1={my + 18} x2={mx + pw * 0.58} y2={my + ph - 15} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={mx + pw * 0.52} y={my + ph - 4} text="AD₂" color={COLORS.demand} />
          <ShiftArrow x1={mx + pw * 0.46} y1={my + ph * 0.55} x2={mx + pw * 0.36} y2={my + ph * 0.55} color={COLORS.shifted} />

          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium before AD↓" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ AD↓ → lower PL & GDP (recession)" />
        </>
      );
    },
  },
  sras_decrease: {
    title: "Decrease in SRAS (Cost-Push Inflation)",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "SRAS", color: COLORS.supply }, { label: "AD", color: COLORS.demand }, { label: "LRAS", color: COLORS.lras }],
    examTips: [
      "SRAS shifts LEFT — higher costs of production",
      "Creates stagflation: higher PL AND lower real GDP",
      "Key causes: oil price shocks, rising wages, supply chain disruption",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.62;
      const eq1X = mx + pw * 0.44, eq1Y = my + ph * 0.44;
      const eq2X = mx + pw * 0.36, eq2Y = my + ph * 0.34;

      return (
        <>
          <GLine x1={lrasX} y1={my + 8} x2={lrasX} y2={my + ph - 8} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 6} y={my + 20} text="LRAS" color={COLORS.lras} />
          <GLine x1={mx + 8} y1={my + ph - 15} x2={mx + pw - 8} y2={my + 25} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={mx + pw - 44} y={my + 20} text="SRAS₁" color={COLORS.supply} />
          <GLine x1={mx + pw * 0.1} y1={my + ph - 15} x2={mx + pw * 0.85} y2={my + 12} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={mx + pw * 0.78} y={my + 10} text="SRAS₂" color={COLORS.supply} />
          <GLine x1={mx + 15} y1={my + 18} x2={mx + pw * 0.65} y2={my + ph - 15} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw * 0.58} y={my + ph - 4} text="AD" color={COLORS.demand} />

          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium before cost shock" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ Stagflation: ↑PL + ↓GDP together" />
        </>
      );
    },
  },
  tax_incidence: {
    title: "Effect of an Indirect Tax",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Tax Revenue", color: COLORS.area }],
    examTips: [
      "Supply shifts LEFT by the amount of the tax per unit",
      "Show tax revenue as shaded area between P_consumer and P_producer",
      "Consumer burden depends on PED — more inelastic = more burden",
      "Label S₁ (pre-tax) and S₁+Tax clearly",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const d = { x1: mx + 8, y1: my + 8, x2: mx + pw - 8, y2: my + ph - 8 };
      const s1 = { x1: mx + 8, y1: my + ph - 8, x2: mx + pw - 8, y2: my + 8 };
      const taxShift = 40;
      const s2 = { x1: s1.x1 + taxShift, y1: s1.y1, x2: s1.x2 + taxShift, y2: s1.y2 };

      const eq1X = mx + pw * 0.47, eq1Y = my + ph * 0.47;
      const eq2X = mx + pw * 0.38, eq2Y = my + ph * 0.38;

      return (
        <>
          <GLine {...d} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={d.x2 - 10} y={d.y2 - 4} text="D" color={COLORS.demand} />
          <GLine {...s1} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={s1.x2 - 14} y={s1.y2 + 14} text="S₁" color={COLORS.supply} />
          <GLine {...s2} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={s2.x2 - 30} y={s2.y2 + 14} text="S₁+Tax" color={COLORS.supply} />
          {/* Tax revenue area */}
          <rect x={eq2X - 4} y={eq2Y} width={eq1X - eq2X + 8} height={18}
            fill="url(#grad-area)" fillOpacity={0.12} stroke="url(#grad-area)" strokeWidth={1} rx={3} />
          <Label x={(eq1X + eq2X) / 2} y={eq2Y + 13} text="Tax Rev." color={COLORS.area} size={8} anchor="middle" />

          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Pre-tax equilibrium" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ After tax: higher P, lower Q" />
        </>
      );
    },
  },
  ppf: {
    title: "Production Possibility Frontier",
    xAxis: "Good B", yAxis: "Good A",
    legend: [{ label: "PPF", color: COLORS.demand }, { label: "Efficient", color: COLORS.eq }, { label: "Inefficient", color: COLORS.shifted }],
    examTips: [
      "Points ON the curve = productively efficient",
      "Points INSIDE = unemployed resources / inefficiency",
      "Points OUTSIDE = currently unattainable",
      "Concave shape shows increasing opportunity cost",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <CurvePath
            d={`M ${mx + 8} ${my + 12} Q ${mx + pw * 0.8} ${my + ph * 0.08} ${mx + pw - 12} ${my + ph - 8}`}
            color={COLORS.demand} gradientId="grad-demand" width={3} glow="glow-blue"
          />
          <Label x={mx + pw * 0.58} y={my + 18} text="PPF" color={COLORS.demand} />
          <PremiumDot x={mx + pw * 0.42} y={my + ph * 0.30} color={COLORS.eq} label="A (efficient)" gradientId="dot-green"
            tooltipText="✓ On the frontier = all resources used" />
          <PremiumDot x={mx + pw * 0.30} y={my + ph * 0.55} color={COLORS.shifted} label="B (inefficient)" labelPos="br" gradientId="dot-amber"
            tooltipText="✓ Inside = spare capacity / unemployment" />
        </>
      );
    },
  },
  ppf_growth: {
    title: "Economic Growth (PPF Shift)",
    xAxis: "Good B", yAxis: "Good A",
    legend: [{ label: "PPF₁", color: COLORS.demand }, { label: "PPF₂ (Growth)", color: COLORS.shifted }],
    examTips: [
      "Outward shift = increase in productive capacity",
      "Causes: investment, technology, education, immigration",
      "Distinguish actual growth (moving to PPF) vs potential growth (shifting PPF)",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <CurvePath
            d={`M ${mx + 8} ${my + 20} Q ${mx + pw * 0.72} ${my + ph * 0.10} ${mx + pw * 0.68} ${my + ph - 8}`}
            color={COLORS.demand} gradientId="grad-demand" width={3} glow="glow-blue"
          />
          <Label x={mx + pw * 0.42} y={my + 28} text="PPF₁" color={COLORS.demand} />
          <CurvePath
            d={`M ${mx + 8} ${my + 10} Q ${mx + pw * 0.88} ${my + ph * 0.06} ${mx + pw - 12} ${my + ph - 8}`}
            color={COLORS.shifted} gradientId="grad-shifted" width={3} dashed glow="glow-amber"
          />
          <Label x={mx + pw * 0.62} y={my + 16} text="PPF₂" color={COLORS.shifted} />
          <ShiftArrow x1={mx + pw * 0.48} y1={my + ph * 0.34} x2={mx + pw * 0.58} y2={my + ph * 0.28} color={COLORS.shifted} />
        </>
      );
    },
  },
  phillips_curve: {
    title: "Short-Run Phillips Curve",
    xAxis: "Unemployment Rate (%)", yAxis: "Inflation Rate (%)",
    legend: [{ label: "SRPC", color: COLORS.demand }],
    examTips: [
      "Inverse relationship between inflation and unemployment",
      "Trade-off only holds in the short run",
      "Long-run Phillips Curve is vertical at the NRU (natural rate)",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <CurvePath
            d={`M ${mx + 20} ${my + 15} Q ${mx + pw * 0.28} ${my + ph * 0.48} ${mx + pw - 20} ${my + ph - 20}`}
            color={COLORS.demand} gradientId="grad-demand" width={3} glow="glow-blue"
          />
          <Label x={mx + pw - 35} y={my + ph - 8} text="SRPC" color={COLORS.demand} />
          <PremiumDot x={mx + pw * 0.28} y={my + ph * 0.28} color={COLORS.eq} label="Low U, High π" gradientId="dot-green"
            tooltipText="✓ Boom: low unemployment, high inflation" />
          <PremiumDot x={mx + pw * 0.62} y={my + ph * 0.62} color={COLORS.shifted} label="High U, Low π" labelPos="tl" gradientId="dot-amber"
            tooltipText="✓ Recession: high unemployment, low inflation" />
        </>
      );
    },
  },
  ped_elastic: {
    title: "Price Elastic Demand (PED > 1)",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Elastic D", color: COLORS.demand }],
    examTips: [
      "Shallow/flat curve = elastic demand",
      "Small price change → large quantity change",
      "Many substitutes, luxuries, long run — all increase elasticity",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <GLine x1={mx + 15} y1={my + ph * 0.28} x2={mx + pw - 15} y2={my + ph * 0.58} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw - 60} y={my + ph * 0.58 + 14} text="D (elastic)" color={COLORS.demand} />
          <DashedToAxes x={mx + pw * 0.32} y={my + ph * 0.34} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <DashedToAxes x={mx + pw * 0.60} y={my + ph * 0.44} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Label x={mx + pw * 0.48} y={my + ph * 0.72} text="Small ΔP → Large ΔQ" color={COLORS.area} size={10} anchor="middle" bold={false} />
        </>
      );
    },
  },
  ped_inelastic: {
    title: "Price Inelastic Demand (PED < 1)",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Inelastic D", color: COLORS.demand }],
    examTips: [
      "Steep curve = inelastic demand",
      "Large price change → small quantity change",
      "Necessities, few substitutes, short run — all decrease elasticity",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <GLine x1={mx + pw * 0.36} y1={my + 12} x2={mx + pw * 0.54} y2={my + ph - 12} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw * 0.54 + 6} y={my + ph - 8} text="D (inelastic)" color={COLORS.demand} />
          <DashedToAxes x={mx + pw * 0.40} y={my + ph * 0.30} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <DashedToAxes x={mx + pw * 0.47} y={my + ph * 0.56} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Label x={mx + pw * 0.50} y={my + ph * 0.80} text="Large ΔP → Small ΔQ" color={COLORS.area} size={10} anchor="middle" bold={false} />
        </>
      );
    },
  },
  monopoly: {
    title: "Monopoly Profit Maximisation",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Revenue",
    legend: [{ label: "MC", color: COLORS.supply }, { label: "AR = D", color: COLORS.demand }, { label: "MR", color: COLORS.mpb }, { label: "Supernormal Profit", color: COLORS.area }],
    examTips: [
      "Profit max at MC = MR — always state this rule",
      "Price read UP from Qₘ to AR curve, not MC",
      "Supernormal profit = shaded area (AR - AC) × Qₘ",
      "AR is above MR due to the price-making power",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const profitMaxX = mx + pw * 0.36;
      const priceY = my + ph * 0.30;
      const costY = my + ph * 0.50;

      return (
        <>
          {/* MC — upward */}
          <GLine x1={mx + pw * 0.18} y1={my + ph - 20} x2={mx + pw - 12} y2={my + 25} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={mx + pw - 30} y={my + 20} text="MC" color={COLORS.supply} />
          {/* AR = D — downward */}
          <GLine x1={mx + 12} y1={my + 18} x2={mx + pw - 12} y2={my + ph - 15} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw - 46} y={my + ph - 4} text="AR = D" color={COLORS.demand} />
          {/* MR — steeper downward */}
          <GLine x1={mx + 12} y1={my + 18} x2={mx + pw * 0.52} y2={my + ph - 15} color={COLORS.mpb} dashed width={2} />
          <Label x={mx + pw * 0.52 - 20} y={my + ph - 4} text="MR" color={COLORS.mpb} />
          {/* Supernormal profit area */}
          <rect x={mx} y={priceY} width={profitMaxX - mx} height={costY - priceY}
            fill="url(#grad-area)" fillOpacity={0.10} rx={3} />
          <Label x={mx + (profitMaxX - mx) / 2} y={(priceY + costY) / 2 + 4} text="Supernormal" color={COLORS.area} size={8} anchor="middle" />
          <Label x={mx + (profitMaxX - mx) / 2} y={(priceY + costY) / 2 + 14} text="Profit" color={COLORS.area} size={8} anchor="middle" />

          <DashedToAxes x={profitMaxX} y={priceY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="Pₘ" qLabel="Qₘ" />
          <PremiumDot x={profitMaxX} y={priceY} color={COLORS.eq} label="MC=MR" labelPos="tr" gradientId="dot-green"
            tooltipText="✓ Profit max where MC = MR" />
        </>
      );
    },
  },
};

// Alias mappings
const ALIASES: Record<string, string> = {
  "positive_consumption_externality": "positive_externality",
  "negative_consumption_externality": "negative_externality",
  "externality_positive": "positive_externality",
  "externality_negative": "negative_externality",
  "ad_as": "ad_increase",
  "adas": "ad_increase",
  "aggregate_demand_increase": "ad_increase",
  "aggregate_demand_decrease": "ad_decrease",
  "cost_push": "sras_decrease",
  "cost_push_inflation": "sras_decrease",
  "demand_pull": "ad_increase",
  "demand_pull_inflation": "ad_increase",
  "indirect_tax": "tax_incidence",
  "taxation": "tax_incidence",
  "tax": "tax_incidence",
  "production_possibility": "ppf",
  "production_possibility_frontier": "ppf",
  "production_possibility_curve": "ppf",
  "economic_growth": "ppf_growth",
  "growth": "ppf_growth",
  "elastic": "ped_elastic",
  "inelastic": "ped_inelastic",
  "price_elasticity": "ped_elastic",
  "monopoly_profit": "monopoly",
  "profit_maximisation": "monopoly",
};

export function resolveDiagramType(raw: string): DiagramType | null {
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_").replace(/[^a-z0-9_]/g, "");
  if (key in DIAGRAMS) return key as DiagramType;
  if (key in ALIASES) return ALIASES[key] as DiagramType;
  return null;
}

/* ── Exam Tips Panel (shown on diagram hover) ── */
function ExamTipsPanel({ tips, visible }: { tips: string[]; visible: boolean }) {
  if (!visible || !tips.length) return null;
  return (
    <div className="mt-3 px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/15 animate-fade-in">
      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5 flex items-center gap-1.5">
        <span>📝</span> A-Level Exam Tips
      </p>
      <ul className="space-y-1">
        {tips.map((tip, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
            <span className="text-primary mt-0.5 shrink-0">✓</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EconDiagramTemplate({ type, className }: { type: DiagramType; className?: string }) {
  const config = DIAGRAMS[type];
  const [hovered, setHovered] = useState(false);
  if (!config) return null;

  const W = 420, H = 320;
  const mx = 55, my = 25, pw = W - mx - 30, ph = H - my - 50;

  return (
    <div
      className={cn(
        "my-4 rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-lg relative overflow-hidden group transition-shadow duration-300 hover:shadow-xl",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle depth layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
      <p className="text-xs font-bold uppercase tracking-widest mb-4 text-primary flex items-center gap-2 relative z-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">📊</span>
        {config.title}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] h-auto text-foreground relative z-10">
        <PremiumDefs mx={mx} my={my} pw={pw} ph={ph} />
        <Axes mx={mx} my={my} pw={pw} ph={ph} xLabel={config.xAxis} yLabel={config.yAxis} />
        {/* All curves clipped to the plot area */}
        <g clipPath="url(#plot-clip)">
          {config.render({ W, H, mx, my, pw, ph })}
        </g>
      </svg>
      {/* Pill-badge legend */}
      {config.legend && config.legend.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 relative z-10">
          {config.legend.map((item, i) => (
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
      {/* Exam tips panel — appears on hover */}
      <ExamTipsPanel tips={config.examTips} visible={hovered} />
    </div>
  );
}

export function getAllDiagramTypes(): { type: DiagramType; title: string }[] {
  return Object.entries(DIAGRAMS).map(([type, config]) => ({
    type: type as DiagramType,
    title: config.title,
  }));
}
