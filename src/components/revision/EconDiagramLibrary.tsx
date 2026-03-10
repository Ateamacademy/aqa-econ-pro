/**
 * Predefined SVG Economics Diagram Templates — Premium 3D Edition
 * 
 * Features: gradient curve strokes, radial-gradient equilibrium dots with
 * specular highlights, glow filters, drop shadows, animated arrow tips,
 * pill-badge legends, depth layering, and hover-triggered tooltip animations.
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

/* ── Premium SVG Defs (filters, gradients) ── */
function PremiumDefs() {
  return (
    <defs>
      {/* Glow filters */}
      <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="#3b82f6" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="#ef4444" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="#f59e0b" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="#16a34a" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodColor="#8b5cf6" floodOpacity="0.4" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      {/* Drop shadow for depth */}
      <filter id="drop-shadow">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.12" />
      </filter>
      {/* Gradient strokes */}
      <linearGradient id="grad-demand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="grad-supply" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="grad-shifted" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="grad-eq" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="grad-area" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="grad-lras" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9ca3af" />
        <stop offset="100%" stopColor="#4b5563" />
      </linearGradient>
      {/* Radial gradients for dots */}
      <radialGradient id="dot-green" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#86efac" />
        <stop offset="60%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#15803d" />
      </radialGradient>
      <radialGradient id="dot-amber" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="60%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </radialGradient>
      <radialGradient id="dot-blue" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#bfdbfe" />
        <stop offset="60%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </radialGradient>
      {/* Animated arrow marker */}
      <marker id="arrow-demand" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="url(#grad-demand)" />
      </marker>
      <marker id="arrow-supply" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="url(#grad-supply)" />
      </marker>
      <marker id="arrow-shifted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="url(#grad-shifted)" />
      </marker>
      {/* Grid pattern */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
      </pattern>
    </defs>
  );
}

/* ── Gradient Line with optional glow ── */
function GLine({ x1, y1, x2, y2, color, dashed, width = 2.5, glow, gradientId }: {
  x1: number; y1: number; x2: number; y2: number; color: string; dashed?: boolean; width?: number; glow?: string; gradientId?: string;
}) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={gradientId ? `url(#${gradientId})` : color}
      strokeWidth={width}
      strokeDasharray={dashed ? "6,3" : undefined}
      strokeLinecap="round"
      filter={glow ? `url(#${glow})` : undefined}
      className="transition-all duration-300"
    />
  );
}

function Label({ x, y, text, color, size = 10, anchor = "start", bold = true }: {
  x: number; y: number; text: string; color: string; size?: number; anchor?: string; bold?: boolean;
}) {
  return (
    <text
      x={x} y={y} fill={color} textAnchor={anchor} fontSize={size}
      fontWeight={bold ? "bold" : "normal"}
      className="drop-shadow-sm select-none"
      style={{ textShadow: `0 1px 2px rgba(0,0,0,0.1)` }}
    >
      {text}
    </text>
  );
}

/* ── Premium 3D Dot with radial gradient, specular highlight & hover tooltip ── */
function PremiumDot({ x, y, color, label, labelPos = "tr", gradientId, tooltipText }: {
  x: number; y: number; color: string; label: string; labelPos?: "tr" | "tl" | "br";
  gradientId?: string; tooltipText?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const dx = labelPos === "tl" ? -8 : 8;
  const dy = labelPos === "br" ? 14 : -6;
  const grad = gradientId || "dot-green";
  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      {/* Outer glow ring */}
      <circle cx={x} cy={y} r={hovered ? 12 : 8} fill={color} opacity={hovered ? 0.18 : 0.1}
        className="transition-all duration-300" />
      {/* Main dot with radial gradient */}
      <circle cx={x} cy={y} r={hovered ? 6 : 5} fill={`url(#${grad})`}
        stroke="white" strokeWidth={2} filter="url(#drop-shadow)"
        className="transition-all duration-300" />
      {/* Specular highlight */}
      <circle cx={x - 1.5} cy={y - 1.5} r={1.8} fill="white" opacity={0.7} />
      {/* Label */}
      <Label x={x + dx} y={y + dy} text={label} color={color} size={9} />
      {/* Hover tooltip */}
      {hovered && tooltipText && (
        <g className="animate-fade-in">
          <rect
            x={x - 50} y={y - 32} width={100} height={20} rx={10}
            fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={1}
            filter="url(#drop-shadow)"
          />
          <text x={x} y={y - 18} textAnchor="middle" fontSize={8} fill="hsl(var(--popover-foreground))" fontWeight="600">
            {tooltipText}
          </text>
        </g>
      )}
    </g>
  );
}

function DashedToAxes({ x, y, mx, ph, my, color, pLabel, qLabel }: {
  x: number; y: number; mx: number; ph: number; my: number; color: string; pLabel: string; qLabel: string;
}) {
  return (
    <>
      <line x1={mx} y1={y} x2={x} y2={y} stroke={color} strokeWidth={1} strokeDasharray="4,3" opacity={0.6} />
      <line x1={x} y1={y} x2={x} y2={my + ph} stroke={color} strokeWidth={1} strokeDasharray="4,3" opacity={0.6} />
      {/* Pill badges for axis labels */}
      <g>
        <rect x={mx - 22} y={y - 7} width={18} height={14} rx={7} fill={color} opacity={0.15} />
        <text x={mx - 13} y={y + 4} fill={color} fontSize={8} fontWeight="bold" textAnchor="middle">{pLabel}</text>
      </g>
      <g>
        <rect x={x - 9} y={my + ph + 3} width={18} height={14} rx={7} fill={color} opacity={0.15} />
        <text x={x} y={my + ph + 14} fill={color} fontSize={8} fontWeight="bold" textAnchor="middle">{qLabel}</text>
      </g>
    </>
  );
}

/* ── Premium Axes with depth ── */
function Axes({ mx, my, pw, ph, xLabel, yLabel }: {
  mx: number; my: number; pw: number; ph: number; xLabel: string; yLabel: string;
}) {
  return (
    <>
      {/* Background grid */}
      <rect x={mx} y={my} width={pw} height={ph} fill="url(#grid)" />
      {/* Axes with gradient feel */}
      <line x1={mx} y1={my} x2={mx} y2={my + ph} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" opacity={0.8} />
      <line x1={mx} y1={my + ph} x2={mx + pw} y2={my + ph} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" opacity={0.8} />
      {/* Arrow tips */}
      <polygon points={`${mx - 5},${my + 8} ${mx},${my - 4} ${mx + 5},${my + 8}`} fill="currentColor" opacity={0.8} />
      <polygon points={`${mx + pw - 8},${my + ph - 5} ${mx + pw + 4},${my + ph} ${mx + pw - 8},${my + ph + 5}`} fill="currentColor" opacity={0.8} />
      {/* Origin label */}
      <text x={mx - 10} y={my + ph + 14} fontSize={10} fontWeight="bold" fill="currentColor" opacity={0.5}>O</text>
      {/* Axis labels with pill background */}
      <g>
        <text
          x={mx - 10} y={my + ph / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${mx - 10} ${my + ph / 2})`}
          fontSize={10} fontWeight={700} fill="currentColor" opacity={0.7}
        >{yLabel}</text>
      </g>
      <text x={mx + pw / 2} y={my + ph + 32} textAnchor="middle" fontSize={10} fontWeight={700} fill="currentColor" opacity={0.7}>{xLabel}</text>
    </>
  );
}

/* ── Shift Arrow (animated) ── */
function ShiftArrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={1.5} strokeDasharray="3,2"
      markerEnd="url(#arrow-shifted)"
      opacity={0.7}
    >
      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1.5s" repeatCount="indefinite" />
    </line>
  );
}

/* ── Pill-Badge Legend ── */
function PillLegend({ items, mx, my }: { items: { label: string; color: string }[]; mx: number; my: number }) {
  let xOff = 0;
  return (
    <g>
      {items.map((item, i) => {
        const w = item.label.length * 6.5 + 20;
        const el = (
          <g key={i} transform={`translate(${mx + xOff}, ${my})`}>
            <rect width={w} height={18} rx={9} fill={item.color} opacity={0.15} />
            <circle cx={10} cy={9} r={4} fill={item.color} />
            <text x={18} y={13} fontSize={8} fontWeight="bold" fill={item.color}>{item.label}</text>
          </g>
        );
        xOff += w + 6;
        return el;
      })}
    </g>
  );
}

/* ── Diagram Definitions ── */

const supplyDemandBase = (p: DrawParams, shiftCurve?: "demand" | "supply", shiftDir?: "left" | "right") => {
  const { mx, my, pw, ph } = p;
  const offset = shiftDir === "right" ? 50 : shiftDir === "left" ? -50 : 0;
  
  const d = { x1: mx + 30, y1: my + 15, x2: mx + pw - 30, y2: my + ph - 15 };
  const s = { x1: mx + 30, y1: my + ph - 15, x2: mx + pw - 30, y2: my + 15 };
  
  const eqX = mx + pw * 0.45;
  const eqY = my + ph * 0.45;
  
  let newX = eqX, newY = eqY;
  if (shiftCurve === "supply") {
    newX = eqX + (shiftDir === "left" ? -25 : 25);
    newY = eqY + (shiftDir === "left" ? -20 : 20);
  } else if (shiftCurve === "demand") {
    newX = eqX + (shiftDir === "right" ? 25 : -25);
    newY = eqY + (shiftDir === "right" ? -20 : 20);
  }
  
  return (
    <>
      <GLine {...d} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
      <Label x={d.x2 + 4} y={d.y2 + 4} text="D₁" color={COLORS.demand} />
      
      {shiftCurve === "demand" && (
        <>
          <GLine x1={d.x1 + offset} y1={d.y1} x2={d.x2 + offset} y2={d.y2} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={d.x2 + offset + 4} y={d.y2 + 4} text="D₂" color={COLORS.demand} />
          <ShiftArrow x1={eqX} y1={eqY} x2={newX} y2={newY} color={COLORS.shifted} />
        </>
      )}
      
      <GLine {...s} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
      <Label x={s.x2 + 4} y={s.y2 + 4} text="S₁" color={COLORS.supply} />
      
      {shiftCurve === "supply" && (
        <>
          <GLine x1={s.x1 + offset} y1={s.y1} x2={s.x2 + offset} y2={s.y2} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={s.x2 + offset + 4} y={s.y2 + 4} text="S₂" color={COLORS.supply} />
          <ShiftArrow x1={eqX} y1={eqY} x2={newX} y2={newY} color={COLORS.shifted} />
        </>
      )}
      
      <DashedToAxes x={eqX} y={eqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
      <PremiumDot x={eqX} y={eqY} color={COLORS.eq} label="E₁" gradientId="dot-green" tooltipText={`Equilibrium: P₁, Q₁`} />
      
      {shiftCurve && (
        <>
          <DashedToAxes x={newX} y={newY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <PremiumDot x={newX} y={newY} color={COLORS.shifted} label="E₂" gradientId="dot-amber" tooltipText={`New Equilibrium: P₂, Q₂`} />
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
    render: (p) => <>{supplyDemandBase(p)}</>,
  },
  demand_increase: {
    title: "Increase in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift →", color: COLORS.shifted }],
    render: (p) => <>{supplyDemandBase(p, "demand", "right")}</>,
  },
  demand_decrease: {
    title: "Decrease in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift ←", color: COLORS.shifted }],
    render: (p) => <>{supplyDemandBase(p, "demand", "left")}</>,
  },
  supply_increase: {
    title: "Increase in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift →", color: COLORS.shifted }],
    render: (p) => <>{supplyDemandBase(p, "supply", "right")}</>,
  },
  supply_decrease: {
    title: "Decrease in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Shift ←", color: COLORS.shifted }],
    render: (p) => <>{supplyDemandBase(p, "supply", "left")}</>,
  },
  positive_externality: {
    title: "Positive Consumption Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC", color: COLORS.supply }, { label: "MPB", color: COLORS.mpb }, { label: "MSB", color: COLORS.demand }, { label: "Welfare Loss", color: COLORS.area }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const sX1 = mx + 30, sY1 = my + ph - 15, sX2 = mx + pw - 30, sY2 = my + 15;
      const mpbX1 = mx + 30, mpbY1 = my + 15, mpbX2 = mx + pw - 50, mpbY2 = my + ph - 30;
      const msbX1 = mx + 60, msbY1 = my + 15, msbX2 = mx + pw - 20, msbY2 = my + ph - 30;
      const freeEqX = mx + pw * 0.38, freeEqY = my + ph * 0.42;
      const optEqX = mx + pw * 0.52, optEqY = my + ph * 0.35;
      return (
        <>
          <GLine x1={sX1} y1={sY1} x2={sX2} y2={sY2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sX2 + 4} y={sY2 + 4} text="S = MPC" color={COLORS.supply} />
          <GLine x1={mpbX1} y1={mpbY1} x2={mpbX2} y2={mpbY2} color={COLORS.mpb} />
          <Label x={mpbX2 + 4} y={mpbY2 + 4} text="D = MPB" color={COLORS.mpb} />
          <GLine x1={msbX1} y1={msbY1} x2={msbX2} y2={msbY2} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbX2 + 4} y={msbY2 + 4} text="MSB" color={COLORS.demand} />
          <polygon
            points={`${freeEqX},${freeEqY} ${optEqX},${optEqY} ${mx + pw * 0.45},${my + ph * 0.55}`}
            fill={COLORS.area} fillOpacity={0.12} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
            filter="url(#glow-purple)"
          />
          <Label x={mx + pw * 0.42} y={my + ph * 0.48} text="Welfare" color={COLORS.area} size={8} anchor="middle" />
          <Label x={mx + pw * 0.42} y={my + ph * 0.53} text="Loss" color={COLORS.area} size={8} anchor="middle" />
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Market" gradientId="dot-green" tooltipText="Free market equilibrium" />
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEqX} y={optEqY} color={COLORS.shifted} label="Social Optimum" gradientId="dot-amber" tooltipText="Socially optimal output" />
        </>
      );
    },
  },
  negative_externality: {
    title: "Negative Consumption Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC", color: COLORS.supply }, { label: "MPB", color: COLORS.mpb }, { label: "MSB", color: COLORS.demand }, { label: "Welfare Loss", color: COLORS.area }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const sX1 = mx + 30, sY1 = my + ph - 15, sX2 = mx + pw - 30, sY2 = my + 15;
      const mpbX1 = mx + 60, mpbY1 = my + 15, mpbX2 = mx + pw - 20, mpbY2 = my + ph - 30;
      const msbX1 = mx + 30, msbY1 = my + 15, msbX2 = mx + pw - 50, msbY2 = my + ph - 30;
      const freeEqX = mx + pw * 0.52, freeEqY = my + ph * 0.35;
      const optEqX = mx + pw * 0.38, optEqY = my + ph * 0.42;
      return (
        <>
          <GLine x1={sX1} y1={sY1} x2={sX2} y2={sY2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sX2 + 4} y={sY2 + 4} text="S = MPC" color={COLORS.supply} />
          <GLine x1={mpbX1} y1={mpbY1} x2={mpbX2} y2={mpbY2} color={COLORS.mpb} />
          <Label x={mpbX2 + 4} y={mpbY2 + 4} text="D = MPB" color={COLORS.mpb} />
          <GLine x1={msbX1} y1={msbY1} x2={msbX2} y2={msbY2} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbX2 + 4} y={msbY2 + 4} text="MSB" color={COLORS.demand} />
          <polygon
            points={`${optEqX},${optEqY} ${freeEqX},${freeEqY} ${mx + pw * 0.45},${my + ph * 0.55}`}
            fill={COLORS.area} fillOpacity={0.12} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
            filter="url(#glow-purple)"
          />
          <Label x={mx + pw * 0.45} y={my + ph * 0.48} text="Welfare" color={COLORS.area} size={8} anchor="middle" />
          <Label x={mx + pw * 0.45} y={my + ph * 0.53} text="Loss" color={COLORS.area} size={8} anchor="middle" />
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Market" gradientId="dot-green" tooltipText="Free market equilibrium" />
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEqX} y={optEqY} color={COLORS.shifted} label="Social Optimum" gradientId="dot-amber" tooltipText="Socially optimal output" />
        </>
      );
    },
  },
  negative_production_externality: {
    title: "Negative Production Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC", color: COLORS.mpc }, { label: "MSC", color: COLORS.msc }, { label: "MSB", color: COLORS.demand }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const mpcX1 = mx + 30, mpcY1 = my + ph - 15, mpcX2 = mx + pw - 20, mpcY2 = my + 25;
      const mscX1 = mx + 60, mscY1 = my + ph - 15, mscX2 = mx + pw - 20, mscY2 = my + 5;
      const dX1 = mx + 30, dY1 = my + 15, dX2 = mx + pw - 30, dY2 = my + ph - 15;
      const freeEqX = mx + pw * 0.48, freeEqY = my + ph * 0.40;
      const optEqX = mx + pw * 0.38, optEqY = my + ph * 0.35;
      return (
        <>
          <GLine x1={mpcX1} y1={mpcY1} x2={mpcX2} y2={mpcY2} color={COLORS.mpc} />
          <Label x={mpcX2 + 4} y={mpcY2 + 4} text="S = MPC" color={COLORS.mpc} />
          <GLine x1={mscX1} y1={mscY1} x2={mscX2} y2={mscY2} color={COLORS.msc} gradientId="grad-supply" dashed glow="glow-red" />
          <Label x={mscX2 + 4} y={mscY2 - 4} text="MSC" color={COLORS.msc} />
          <GLine x1={dX1} y1={dY1} x2={dX2} y2={dY2} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dX2 + 4} y={dY2 + 4} text="D = MSB" color={COLORS.demand} />
          <polygon
            points={`${optEqX},${optEqY} ${freeEqX},${freeEqY} ${mx + pw * 0.43},${my + ph * 0.28}`}
            fill={COLORS.area} fillOpacity={0.12} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
          />
          <DashedToAxes x={freeEqX} y={freeEqY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEqX} y={freeEqY} color={COLORS.eq} label="Free Market" gradientId="dot-green" tooltipText="Free market equilibrium" />
          <DashedToAxes x={optEqX} y={optEqY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEqX} y={optEqY} color={COLORS.shifted} label="Social Optimum" gradientId="dot-amber" tooltipText="Socially optimal output" />
        </>
      );
    },
  },
  ad_increase: {
    title: "Increase in Aggregate Demand",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "AD", color: COLORS.demand }, { label: "SRAS", color: COLORS.supply }, { label: "LRAS", color: COLORS.lras }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.65;
      const srasX1 = mx + 20, srasY1 = my + ph - 20, srasX2 = mx + pw - 20, srasY2 = my + 30;
      const ad1X1 = mx + 20, ad1Y1 = my + 20, ad1X2 = mx + pw * 0.6, ad1Y2 = my + ph - 20;
      const ad2X1 = mx + 60, ad2Y1 = my + 20, ad2X2 = mx + pw * 0.8, ad2Y2 = my + ph - 20;
      const eq1X = mx + pw * 0.38, eq1Y = my + ph * 0.48;
      const eq2X = mx + pw * 0.50, eq2Y = my + ph * 0.38;
      return (
        <>
          <GLine x1={lrasX} y1={my + 10} x2={lrasX} y2={my + ph - 10} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 4} y={my + 20} text="LRAS" color={COLORS.lras} />
          <GLine x1={srasX1} y1={srasY1} x2={srasX2} y2={srasY2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={srasX2 + 4} y={srasY2 + 4} text="SRAS" color={COLORS.supply} />
          <GLine x1={ad1X1} y1={ad1Y1} x2={ad1X2} y2={ad1Y2} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={ad1X2 + 4} y={ad1Y2 + 4} text="AD₁" color={COLORS.demand} />
          <GLine x1={ad2X1} y1={ad2Y1} x2={ad2X2} y2={ad2Y2} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={ad2X2 + 4} y={ad2Y2 + 4} text="AD₂" color={COLORS.demand} />
          <ShiftArrow x1={(ad1X1 + ad1X2) / 2} y1={(ad1Y1 + ad1Y2) / 2} x2={(ad2X1 + ad2X2) / 2} y2={(ad2Y1 + ad2Y2) / 2} color={COLORS.shifted} />
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green" tooltipText="Initial equilibrium" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber" tooltipText="New equilibrium after AD↑" />
        </>
      );
    },
  },
  ad_decrease: {
    title: "Decrease in Aggregate Demand",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "AD", color: COLORS.demand }, { label: "SRAS", color: COLORS.supply }, { label: "LRAS", color: COLORS.lras }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.65;
      const srasX1 = mx + 20, srasY1 = my + ph - 20, srasX2 = mx + pw - 20, srasY2 = my + 30;
      const ad1X1 = mx + 60, ad1Y1 = my + 20, ad1X2 = mx + pw * 0.8, ad1Y2 = my + ph - 20;
      const ad2X1 = mx + 20, ad2Y1 = my + 20, ad2X2 = mx + pw * 0.6, ad2Y2 = my + ph - 20;
      const eq1X = mx + pw * 0.50, eq1Y = my + ph * 0.38;
      const eq2X = mx + pw * 0.38, eq2Y = my + ph * 0.48;
      return (
        <>
          <GLine x1={lrasX} y1={my + 10} x2={lrasX} y2={my + ph - 10} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 4} y={my + 20} text="LRAS" color={COLORS.lras} />
          <GLine x1={srasX1} y1={srasY1} x2={srasX2} y2={srasY2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={srasX2 + 4} y={srasY2 + 4} text="SRAS" color={COLORS.supply} />
          <GLine x1={ad1X1} y1={ad1Y1} x2={ad1X2} y2={ad1Y2} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={ad1X2 + 4} y={ad1Y2 + 4} text="AD₁" color={COLORS.demand} />
          <GLine x1={ad2X1} y1={ad2Y1} x2={ad2X2} y2={ad2Y2} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={ad2X2 + 4} y={ad2Y2 + 4} text="AD₂" color={COLORS.demand} />
          <ShiftArrow x1={(ad1X1 + ad1X2) / 2} y1={(ad1Y1 + ad1Y2) / 2} x2={(ad2X1 + ad2X2) / 2} y2={(ad2Y1 + ad2Y2) / 2} color={COLORS.shifted} />
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green" tooltipText="Initial equilibrium" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber" tooltipText="New equilibrium after AD↓" />
        </>
      );
    },
  },
  sras_decrease: {
    title: "Decrease in SRAS (Cost-Push Inflation)",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "SRAS", color: COLORS.supply }, { label: "AD", color: COLORS.demand }, { label: "LRAS", color: COLORS.lras }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const lrasX = mx + pw * 0.65;
      const sras1X1 = mx + 20, sras1Y1 = my + ph - 20, sras1X2 = mx + pw - 20, sras1Y2 = my + 30;
      const sras2X1 = mx + 50, sras2Y1 = my + ph - 20, sras2X2 = mx + pw - 20, sras2Y2 = my + 10;
      const adX1 = mx + 30, adY1 = my + 20, adX2 = mx + pw * 0.7, adY2 = my + ph - 20;
      const eq1X = mx + pw * 0.45, eq1Y = my + ph * 0.42;
      const eq2X = mx + pw * 0.38, eq2Y = my + ph * 0.32;
      return (
        <>
          <GLine x1={lrasX} y1={my + 10} x2={lrasX} y2={my + ph - 10} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 4} y={my + 20} text="LRAS" color={COLORS.lras} />
          <GLine x1={sras1X1} y1={sras1Y1} x2={sras1X2} y2={sras1Y2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sras1X2 + 4} y={sras1Y2 + 4} text="SRAS₁" color={COLORS.supply} />
          <GLine x1={sras2X1} y1={sras2Y1} x2={sras2X2} y2={sras2Y2} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={sras2X2 + 4} y={sras2Y2 + 4} text="SRAS₂" color={COLORS.supply} />
          <GLine x1={adX1} y1={adY1} x2={adX2} y2={adY2} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={adX2 + 4} y={adY2 + 4} text="AD" color={COLORS.demand} />
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green" tooltipText="Initial equilibrium" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber" tooltipText="Stagflation: higher PL, lower Y" />
        </>
      );
    },
  },
  tax_incidence: {
    title: "Effect of an Indirect Tax",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Tax Revenue", color: COLORS.area }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const dX1 = mx + 30, dY1 = my + 15, dX2 = mx + pw - 30, dY2 = my + ph - 15;
      const s1X1 = mx + 30, s1Y1 = my + ph - 15, s1X2 = mx + pw - 30, s1Y2 = my + 15;
      const s2X1 = mx + 60, s2Y1 = my + ph - 15, s2X2 = mx + pw - 10, s2Y2 = my + 15;
      const eq1X = mx + pw * 0.45, eq1Y = my + ph * 0.45;
      const eq2X = mx + pw * 0.38, eq2Y = my + ph * 0.38;
      return (
        <>
          <GLine x1={dX1} y1={dY1} x2={dX2} y2={dY2} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dX2 + 4} y={dY2 + 4} text="D" color={COLORS.demand} />
          <GLine x1={s1X1} y1={s1Y1} x2={s1X2} y2={s1Y2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={s1X2 + 4} y={s1Y2 + 4} text="S₁" color={COLORS.supply} />
          <GLine x1={s2X1} y1={s2Y1} x2={s2X2} y2={s2Y2} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={s2X2 + 4} y={s2Y2 + 4} text="S₁ + Tax" color={COLORS.supply} />
          <rect x={eq2X - 5} y={eq2Y} width={eq1X - eq2X + 10} height={20}
            fill="url(#grad-area)" fillOpacity={0.15} stroke="url(#grad-area)" strokeWidth={1} rx={3}
            filter="url(#glow-purple)" />
          <Label x={mx + pw * 0.41} y={eq2Y + 14} text="Tax Revenue" color={COLORS.area} size={8} anchor="middle" />
          <DashedToAxes x={eq1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <PremiumDot x={eq1X} y={eq1Y} color={COLORS.eq} label="E₁" gradientId="dot-green" tooltipText="Pre-tax equilibrium" />
          <DashedToAxes x={eq2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <PremiumDot x={eq2X} y={eq2Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber" tooltipText="Post-tax equilibrium" />
        </>
      );
    },
  },
  ppf: {
    title: "Production Possibility Frontier",
    xAxis: "Good B", yAxis: "Good A",
    legend: [{ label: "PPF", color: COLORS.demand }, { label: "Efficient", color: COLORS.eq }, { label: "Inefficient", color: COLORS.shifted }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const cx = mx + pw * 0.85, cy = my + ph * 0.15;
      const startX = mx + 10, startY = my + 15;
      const endX = mx + pw - 15, endY = my + ph - 10;
      return (
        <>
          <path
            d={`M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`}
            fill="none" stroke="url(#grad-demand)" strokeWidth={3} strokeLinecap="round"
            filter="url(#glow-blue)"
          />
          <Label x={mx + pw * 0.55} y={my + 25} text="PPF" color={COLORS.demand} />
          <PremiumDot x={mx + pw * 0.45} y={my + ph * 0.32} color={COLORS.eq} label="A (efficient)" gradientId="dot-green" tooltipText="On the frontier — productive efficiency" />
          <PremiumDot x={mx + pw * 0.35} y={my + ph * 0.55} color={COLORS.shifted} label="B (inefficient)" gradientId="dot-amber" tooltipText="Inside the frontier — resources wasted" />
        </>
      );
    },
  },
  ppf_growth: {
    title: "Economic Growth (PPF Shift)",
    xAxis: "Good B", yAxis: "Good A",
    legend: [{ label: "PPF₁", color: COLORS.demand }, { label: "PPF₂ (Growth)", color: COLORS.shifted }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <path
            d={`M ${mx + 10} ${my + 20} Q ${mx + pw * 0.75} ${my + ph * 0.15} ${mx + pw * 0.7} ${my + ph - 10}`}
            fill="none" stroke="url(#grad-demand)" strokeWidth={3} strokeLinecap="round" filter="url(#glow-blue)"
          />
          <Label x={mx + pw * 0.45} y={my + 30} text="PPF₁" color={COLORS.demand} />
          <path
            d={`M ${mx + 10} ${my + 10} Q ${mx + pw * 0.9} ${my + ph * 0.1} ${mx + pw * 0.85} ${my + ph - 10}`}
            fill="none" stroke="url(#grad-shifted)" strokeWidth={3} strokeLinecap="round" strokeDasharray="6,3"
            filter="url(#glow-amber)"
          />
          <Label x={mx + pw * 0.6} y={my + 18} text="PPF₂" color={COLORS.shifted} />
          <ShiftArrow x1={mx + pw * 0.5} y1={my + ph * 0.35} x2={mx + pw * 0.6} y2={my + ph * 0.3} color={COLORS.shifted} />
        </>
      );
    },
  },
  phillips_curve: {
    title: "Short-Run Phillips Curve",
    xAxis: "Unemployment Rate (%)", yAxis: "Inflation Rate (%)",
    legend: [{ label: "SRPC", color: COLORS.demand }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <path
            d={`M ${mx + 30} ${my + 20} Q ${mx + pw * 0.3} ${my + ph * 0.5} ${mx + pw - 30} ${my + ph - 30}`}
            fill="none" stroke="url(#grad-demand)" strokeWidth={3} strokeLinecap="round" filter="url(#glow-blue)"
          />
          <Label x={mx + pw - 25} y={my + ph - 15} text="SRPC" color={COLORS.demand} />
          <PremiumDot x={mx + pw * 0.3} y={my + ph * 0.3} color={COLORS.eq} label="Low U, high π" gradientId="dot-green" tooltipText="Trade-off: low unemployment → high inflation" />
          <PremiumDot x={mx + pw * 0.65} y={my + ph * 0.65} color={COLORS.shifted} label="High U, low π" gradientId="dot-amber" tooltipText="Trade-off: high unemployment → low inflation" />
        </>
      );
    },
  },
  ped_elastic: {
    title: "Price Elastic Demand (PED > 1)",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Elastic D", color: COLORS.demand }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <GLine x1={mx + 20} y1={my + ph * 0.25} x2={mx + pw - 20} y2={my + ph * 0.55} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw - 15} y={my + ph * 0.55 + 12} text="D (elastic)" color={COLORS.demand} />
          <DashedToAxes x={mx + pw * 0.35} y={my + ph * 0.33} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <DashedToAxes x={mx + pw * 0.6} y={my + ph * 0.42} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Label x={mx + pw * 0.5} y={my + ph * 0.7} text="Small ΔP → Large ΔQ" color={COLORS.area} size={10} anchor="middle" />
        </>
      );
    },
  },
  ped_inelastic: {
    title: "Price Inelastic Demand (PED < 1)",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Inelastic D", color: COLORS.demand }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      return (
        <>
          <GLine x1={mx + pw * 0.35} y1={my + 15} x2={mx + pw * 0.55} y2={my + ph - 15} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={mx + pw * 0.55 + 4} y={my + ph - 10} text="D (inelastic)" color={COLORS.demand} />
          <DashedToAxes x={mx + pw * 0.40} y={my + ph * 0.3} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <DashedToAxes x={mx + pw * 0.47} y={my + ph * 0.55} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Label x={mx + pw * 0.5} y={my + ph * 0.8} text="Large ΔP → Small ΔQ" color={COLORS.area} size={10} anchor="middle" />
        </>
      );
    },
  },
  monopoly: {
    title: "Monopoly Profit Maximisation",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Revenue",
    legend: [{ label: "MC", color: COLORS.supply }, { label: "AR = D", color: COLORS.demand }, { label: "MR", color: COLORS.mpb }, { label: "Profit", color: COLORS.area }],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const mcX1 = mx + pw * 0.2, mcY1 = my + ph - 30, mcX2 = mx + pw - 20, mcY2 = my + 30;
      const arX1 = mx + 20, arY1 = my + 20, arX2 = mx + pw - 20, arY2 = my + ph - 20;
      const mrX1 = mx + 20, mrY1 = my + 20, mrX2 = mx + pw * 0.55, mrY2 = my + ph - 20;
      const profitMaxX = mx + pw * 0.38;
      const priceY = my + ph * 0.3;
      const costY = my + ph * 0.5;
      return (
        <>
          <GLine x1={mcX1} y1={mcY1} x2={mcX2} y2={mcY2} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={mcX2 + 4} y={mcY2 + 4} text="MC" color={COLORS.supply} />
          <GLine x1={arX1} y1={arY1} x2={arX2} y2={arY2} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={arX2 + 4} y={arY2 + 4} text="AR = D" color={COLORS.demand} />
          <GLine x1={mrX1} y1={mrY1} x2={mrX2} y2={mrY2} color={COLORS.mpb} dashed />
          <Label x={mrX2 + 4} y={mrY2 + 4} text="MR" color={COLORS.mpb} />
          <rect x={mx} y={priceY} width={profitMaxX - mx} height={costY - priceY}
            fill="url(#grad-area)" fillOpacity={0.12} rx={4} filter="url(#glow-purple)" />
          <Label x={mx + (profitMaxX - mx) / 2} y={(priceY + costY) / 2 + 4} text="Supernormal Profit" color={COLORS.area} size={8} anchor="middle" />
          <DashedToAxes x={profitMaxX} y={priceY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="Pₘ" qLabel="Qₘ" />
          <PremiumDot x={profitMaxX} y={priceY} color={COLORS.eq} label="MC=MR" gradientId="dot-green" tooltipText="Profit-maximising output" />
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

export function EconDiagramTemplate({ type, className }: { type: DiagramType; className?: string }) {
  const config = DIAGRAMS[type];
  if (!config) return null;
  
  const W = 420, H = 340;
  const mx = 55, my = 25, pw = W - mx - 25, ph = H - my - 50;
  
  return (
    <div className={cn(
      "my-4 rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-lg relative overflow-hidden group",
      className
    )}>
      {/* Subtle depth layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
      <p className="text-xs font-bold uppercase tracking-widest mb-4 text-primary flex items-center gap-2 relative z-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">📊</span>
        {config.title}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] h-auto text-foreground relative z-10">
        <PremiumDefs />
        <Axes mx={mx} my={my} pw={pw} ph={ph} xLabel={config.xAxis} yLabel={config.yAxis} />
        {config.render({ W, H, mx, my, pw, ph })}
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
    </div>
  );
}

export function getAllDiagramTypes(): { type: DiagramType; title: string }[] {
  return Object.entries(DIAGRAMS).map(([type, config]) => ({
    type: type as DiagramType,
    title: config.title,
  }));
}
