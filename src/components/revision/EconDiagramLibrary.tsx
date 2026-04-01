/**
 * Predefined SVG Economics Diagram Templates — Premium Polished Edition
 * 
 * All curves are clipped to the plot area so nothing extends beyond axes.
 * Equilibrium points are computed from actual line intersections (not hardcoded).
 * Hover annotations provide A-Level exam tips for producing high-quality diagrams.
 * 
 * IMPORTANT: Each diagram instance uses a unique clipPath ID (via useId) to prevent
 * SVG ID collisions when multiple diagrams render on the same page.
 */

import { cn } from "@/lib/utils";
import { useState, useId } from "react";
import { WelfareRegion } from "@/components/diagrams/WelfareRegion";
import EconomicsDiagram, { type EconomicsDiagramProps } from "@/components/diagrams/EconomicsDiagram";
import PerfectCompetitionDiagram from "@/components/PerfectCompetitionDiagram";
import MonopolisticCompetitionDiagram from "@/components/MonopolisticCompetitionDiagram";
import LorenzCurveDiagram from "@/components/LorenzCurveDiagram";
import LRACDiagram from "@/components/diagrams/LRACDiagram";
import SpecificAdValoremDiagram from "@/components/SpecificAdValoremDiagram";
import InformationFailureDemeritGood from "@/components/InformationFailureDemeritGood";

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
  | "perfect_competition"
  | "lorenz_curve"
  | "oligopoly_payoff"
  | "cost_curves"
  | "lrac"
  | "monopolistic_competition"
  | "keynesian_as"
  | "trade_quota"
  | "short_run_shutdown"
  | "labour_market"
  | "demand_side_shock"
  | "demand_shift_dual"
  | "supply_shift_dual"
  | "lras_shift"
  | "tariff"
  | "laffer_curve"
  | "multiplier_effect"
  | "exchange_rate"
  | "j_curve"
  | "crowding_out"
  | "kinked_demand"
  | "natural_monopoly"
  | "monopsony"
  | "pollution_permits"
  | "tax_externality"
  | "subsidy_externality"
  | "comparative_advantage"
  | "business_objectives"
  | "price_discrimination"
  | "specific_ad_valorem"
  | "information_failure_demerit";

interface DiagramConfig {
  title: string;
  xAxis: string;
  yAxis: string;
  legend?: { label: string; color: string }[];
  examTips: string[];
  render: (p: DrawParams) => JSX.Element;
  /** When set, EconDiagramTemplate renders the new declarative EconomicsDiagram component instead of manual SVG */
  declarative?: Omit<EconomicsDiagramProps, "className">;
}

interface DrawParams {
  W: number; H: number;
  mx: number; my: number; pw: number; ph: number;
  /** Unique prefix for SVG IDs (clipPath, gradients) to avoid collisions */
  uid: string;
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

/* ── Math helper: find intersection of two lines ── */
function lineIntersect(
  x1: number, y1: number, x2: number, y2: number,
  x3: number, y3: number, x4: number, y4: number
): { x: number; y: number } {
  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denom) < 0.001) return { x: (x1 + x3) / 2, y: (y1 + y3) / 2 };
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
}

/* ── SVG Defs ── */
function PremiumDefs({ mx, my, pw, ph, uid }: { mx: number; my: number; pw: number; ph: number; uid: string }) {
  return (
    <defs>
      <clipPath id={`plot-clip-${uid}`}>
        <rect x={mx} y={my} width={pw} height={ph} />
      </clipPath>
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
      {["demand", "supply", "shifted", "eq"].map(name => (
        <marker key={name} id={`arrow-${name}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={`url(#grad-${name})`} />
        </marker>
      ))}
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

/** SVG layout constants — single source of truth */
const SVG_W = 700;
const SVG_H = 500;
const SVG_PAD = 60; // minimum padding on all sides
const LABEL_SAFE = 40; // labels must not render within 40px of SVG boundary

function clampLabel(x: number, y: number, textW: number, textH: number, anchor: string) {
  let cx = x;
  let cy = y;
  // Clamp so label (including its width) stays ≥ LABEL_SAFE from edges
  if (anchor === "start") {
    cx = Math.max(LABEL_SAFE, Math.min(cx, SVG_W - LABEL_SAFE - textW));
  } else if (anchor === "end") {
    cx = Math.max(LABEL_SAFE + textW, Math.min(cx, SVG_W - LABEL_SAFE));
  } else {
    cx = Math.max(LABEL_SAFE + textW / 2, Math.min(cx, SVG_W - LABEL_SAFE - textW / 2));
  }
  cy = Math.max(LABEL_SAFE + textH, Math.min(cy, SVG_H - LABEL_SAFE));
  return { cx, cy };
}

function Label({ x, y, text, color, size = 11, anchor = "start", bold = true, bg = true }: {
  x: number; y: number; text: string; color: string; size?: number; anchor?: string; bold?: boolean; bg?: boolean;
}) {
  const charW = size * 0.62;
  const textW = text.length * charW;
  const textH = size + 2;
  const pad = 3;
  const { cx, cy } = clampLabel(x, y, textW, textH, anchor);
  const anchorX = anchor === "middle" ? cx - textW / 2 : anchor === "end" ? cx - textW : cx;

  return (
    <g>
      {bg && (
        <rect
          x={anchorX - pad}
          y={cy - textH + 2}
          width={textW + pad * 2}
          height={textH + pad}
          rx={3}
          fill="hsl(var(--card))"
          opacity={0.88}
        />
      )}
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

/* ── Equilibrium dot with hover tooltip ── */
function PremiumDot({ x, y, color, label, labelPos = "tr", gradientId, tooltipText }: {
  x: number; y: number; color: string; label: string; labelPos?: "tr" | "tl" | "br" | "bl";
  gradientId?: string; tooltipText?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const dx = labelPos.includes("l") ? -10 : 8;
  const dy = labelPos.includes("b") ? 15 : -8;
  const grad = gradientId || "dot-green";

  const tipW = 160;
  const tipY = y - 44;
  const tipX = x - tipW / 2;
  const tipH = 34;

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
    >
      <circle cx={x} cy={y} r={hovered ? 11 : 7} fill={color} opacity={hovered ? 0.2 : 0.08}
        className="transition-all duration-300" />
      <circle cx={x} cy={y} r={hovered ? 5.5 : 4.5} fill={`url(#${grad})`}
        stroke="white" strokeWidth={1.5} filter="url(#drop-shadow)"
        className="transition-all duration-300" />
      <circle cx={x - 1.2} cy={y - 1.2} r={1.5} fill="white" opacity={0.65} />
      <text x={x + dx} y={y + dy} fill={color} fontSize={10} fontWeight={700}
        textAnchor={labelPos.includes("l") ? "end" : "start"}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </text>
      {hovered && tooltipText && (
        <g>
          <rect
            x={tipX} y={tipY} width={tipW} height={tipH} rx={8}
            fill="hsl(var(--popover))" stroke="hsl(var(--border))" strokeWidth={0.8}
            filter="url(#drop-shadow)" opacity={0.97}
          />
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
      <line x1={mx} y1={y} x2={x} y2={y} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <line x1={x} y1={y} x2={x} y2={my + ph} stroke={color} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
      <g>
        <rect x={mx - 24} y={y - 8} width={20} height={16} rx={8} fill={color} opacity={0.12} />
        <text x={mx - 14} y={y + 4} fill={color} fontSize={9} fontWeight={700} textAnchor="middle"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{pLabel}</text>
      </g>
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
      <rect x={mx} y={my} width={pw} height={ph} fill="url(#grid)" />
      <line x1={mx} y1={my} x2={mx} y2={my + ph} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
      <line x1={mx} y1={my + ph} x2={mx + pw} y2={my + ph} stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.75} />
      <polygon points={`${mx - 4},${my + 6} ${mx},${my - 2} ${mx + 4},${my + 6}`} fill="currentColor" opacity={0.75} />
      <polygon points={`${mx + pw - 6},${my + ph - 4} ${mx + pw + 2},${my + ph} ${mx + pw - 6},${my + ph + 4}`} fill="currentColor" opacity={0.75} />
      <text x={mx - 12} y={my + ph + 14} fontSize={11} fontWeight={700} fill="currentColor" opacity={0.45}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>
      <text
        x={mx - 14} y={my + ph / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${mx - 14} ${my + ph / 2})`}
        fontSize={11} fontWeight={700} fill="currentColor" opacity={0.6}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >{yLabel}</text>
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

/**
 * Supply/Demand base — equilibrium computed from actual line intersections.
 * 
 * Demand: top-left → bottom-right (downward sloping)
 * Supply: bottom-left → top-right (upward sloping)
 * Lines are symmetric so E₁ is at exact centre.
 * Shifts move endpoints by ±offset in x, and E₂ is recalculated.
 */
const supplyDemandBase = (p: DrawParams, shiftCurve?: "demand" | "supply", shiftDir?: "left" | "right") => {
  const { mx, my, pw, ph } = p;
  const pad = 10;
  const offset = shiftDir === "right" ? 50 : shiftDir === "left" ? -50 : 0;

  // Line endpoints — demand: top-left to bottom-right; supply: bottom-left to top-right
  const dL = { x1: mx + pad, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };
  const sL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };

  // E₁ = exact centre (symmetric lines)
  const eq1 = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, sL.x1, sL.y1, sL.x2, sL.y2);

  // Shifted line endpoints
  const dShifted = { x1: dL.x1 + (shiftCurve === "demand" ? offset : 0), y1: dL.y1, x2: dL.x2 + (shiftCurve === "demand" ? offset : 0), y2: dL.y2 };
  const sShifted = { x1: sL.x1 + (shiftCurve === "supply" ? offset : 0), y1: sL.y1, x2: sL.x2 + (shiftCurve === "supply" ? offset : 0), y2: sL.y2 };

  // E₂ = intersection of (shifted curve) with (unchanged curve)
  const eq2 = shiftCurve === "demand"
    ? lineIntersect(dShifted.x1, dShifted.y1, dShifted.x2, dShifted.y2, sL.x1, sL.y1, sL.x2, sL.y2)
    : shiftCurve === "supply"
      ? lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, sShifted.x1, sShifted.y1, sShifted.x2, sShifted.y2)
      : eq1;

  return (
    <>
      {/* Demand (RED) */}
      <GLine {...dL} color="#ef4444" gradientId="grad-supply" glow="glow-red" />
      <Label x={dL.x2 - 12} y={dL.y2 - 10} text="D₁" color="#ef4444" anchor="end" />

      {shiftCurve === "demand" && (
        <>
          <GLine {...dShifted} color="#ef4444" gradientId="grad-supply" dashed />
          <Label x={dShifted.x2 - 12} y={dShifted.y2 - 10} text="D₂" color="#ef4444" anchor="end" />
          <ShiftArrow x1={eq1.x} y1={eq1.y} x2={eq2.x} y2={eq2.y} color={COLORS.shifted} />
        </>
      )}

      {/* Supply (BLUE) */}
      <GLine {...sL} color="#3b82f6" gradientId="grad-demand" glow="glow-blue" />
      <Label x={sL.x2 - 12} y={sL.y2 + 14} text="S₁" color="#3b82f6" anchor="end" />

      {shiftCurve === "supply" && (
        <>
          <GLine {...sShifted} color="#3b82f6" gradientId="grad-demand" dashed />
          <Label x={sShifted.x2 - 12} y={sShifted.y2 + 14} text="S₂" color="#3b82f6" anchor="end" />
          <ShiftArrow x1={eq1.x} y1={eq1.y} x2={eq2.x} y2={eq2.y} color={COLORS.shifted} />
        </>
      )}

      <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
      <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
        tooltipText="✓ Always label equilibrium clearly with E₁" />

      {shiftCurve && (
        <>
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
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
    legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Equilibrium", color: COLORS.eq }],
    examTips: [
      "Always label both axes: Price (P) on Y, Quantity (Q) on X",
      "Mark the equilibrium point clearly as E with dashed lines to both axes",
      "Label curves at the end: D for demand, S for supply",
      "Include origin 'O' at the intersection of axes",
    ],
    render: (p) => <>{supplyDemandBase(p)}</>,
    declarative: {
      xAxis: "Quantity (Q)", yAxis: "Price (P)",
      title: "Supply & Demand Equilibrium",
      curves: [
        { id: "D1", label: "D₁", slope: -0.95, intercept: 0.95, color: "#ef4444" },
        { id: "S1", label: "S₁", slope: 0.95, intercept: 0.05, color: "#3b82f6" },
      ],
      equilibria: [
        { label: "E₁", curveIds: ["D1", "S1"], color: "#16a34a", pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Always label equilibrium clearly with E₁" },
      ],
      legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Equilibrium", color: "#16a34a" }],
    },
  },
  demand_increase: {
    title: "Increase in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift →", color: COLORS.shifted }],
    examTips: [
      "Show the original D₁ and shifted D₂ clearly",
      "Use an arrow to indicate direction of the shift",
      "Mark both E₁ and E₂ with corresponding P and Q values",
      "State the cause of the shift in your written answer",
    ],
    render: (p) => <>{supplyDemandBase(p, "demand", "right")}</>,
    declarative: {
      xAxis: "Quantity (Q)", yAxis: "Price (P)",
      title: "Increase in Demand",
      curves: [
        { id: "D1", label: "D₁", slope: -0.95, intercept: 0.95, color: "#ef4444" },
        { id: "S1", label: "S₁", slope: 0.95, intercept: 0.05, color: "#3b82f6" },
      ],
      shiftedCurves: [
        { id: "D2", label: "D₂", slope: -0.95, intercept: 0.95 + 0.086, color: "#ef4444", style: "dashed", originalId: "D1" },
      ],
      equilibria: [
        { label: "E₁", curveIds: ["D1", "S1"], color: "#16a34a", pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
        { label: "E₂", curveIds: ["D2", "S1"], color: "#d97706", pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ D↑ → higher P & Q" },
      ],
      legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift →", color: "#f59e0b" }],
    },
  },
  demand_decrease: {
    title: "Decrease in Demand",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift ←", color: COLORS.shifted }],
    examTips: [
      "D₂ shifts LEFT — closer to origin",
      "Price falls from P₁ to P₂, quantity falls from Q₁ to Q₂",
      "Always draw dashed projection lines to both axes",
    ],
    render: (p) => <>{supplyDemandBase(p, "demand", "left")}</>,
    declarative: {
      xAxis: "Quantity (Q)", yAxis: "Price (P)",
      title: "Decrease in Demand",
      curves: [
        { id: "D1", label: "D₁", slope: -0.95, intercept: 0.95, color: "#ef4444" },
        { id: "S1", label: "S₁", slope: 0.95, intercept: 0.05, color: "#3b82f6" },
      ],
      shiftedCurves: [
        { id: "D2", label: "D₂", slope: -0.95, intercept: 0.95 - 0.086, color: "#ef4444", style: "dashed", originalId: "D1" },
      ],
      equilibria: [
        { label: "E₁", curveIds: ["D1", "S1"], color: "#16a34a", pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
        { label: "E₂", curveIds: ["D2", "S1"], color: "#d97706", pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ D↓ → lower P & Q" },
      ],
      legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift ←", color: "#f59e0b" }],
    },
  },
  supply_increase: {
    title: "Increase in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift →", color: COLORS.shifted }],
    examTips: [
      "Supply shifts RIGHT — more supplied at every price",
      "Price falls, quantity rises — show both changes clearly",
      "Common causes: technology improvement, lower input costs",
    ],
    render: (p) => <>{supplyDemandBase(p, "supply", "right")}</>,
    declarative: {
      xAxis: "Quantity (Q)", yAxis: "Price (P)",
      title: "Increase in Supply",
      curves: [
        { id: "D1", label: "D₁", slope: -0.95, intercept: 0.95, color: "#ef4444" },
        { id: "S1", label: "S₁", slope: 0.95, intercept: 0.05, color: "#3b82f6" },
      ],
      shiftedCurves: [
        { id: "S2", label: "S₂", slope: 0.95, intercept: 0.05 - 0.086, color: "#3b82f6", style: "dashed", originalId: "S1" },
      ],
      equilibria: [
        { label: "E₁", curveIds: ["D1", "S1"], color: "#16a34a", pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
        { label: "E₂", curveIds: ["D1", "S2"], color: "#d97706", pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ S↑ → lower P, higher Q" },
      ],
      legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift →", color: "#f59e0b" }],
    },
  },
  supply_decrease: {
    title: "Decrease in Supply",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift ←", color: COLORS.shifted }],
    examTips: [
      "Supply shifts LEFT — less supplied at every price",
      "Price rises, quantity falls",
      "Common causes: higher costs of production, indirect taxes",
    ],
    render: (p) => <>{supplyDemandBase(p, "supply", "left")}</>,
    declarative: {
      xAxis: "Quantity (Q)", yAxis: "Price (P)",
      title: "Decrease in Supply",
      curves: [
        { id: "D1", label: "D₁", slope: -0.95, intercept: 0.95, color: "#ef4444" },
        { id: "S1", label: "S₁", slope: 0.95, intercept: 0.05, color: "#3b82f6" },
      ],
      shiftedCurves: [
        { id: "S2", label: "S₂", slope: 0.95, intercept: 0.05 + 0.086, color: "#3b82f6", style: "dashed", originalId: "S1" },
      ],
      equilibria: [
        { label: "E₁", curveIds: ["D1", "S1"], color: "#16a34a", pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
        { label: "E₂", curveIds: ["D1", "S2"], color: "#d97706", pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ S↓ → higher P, lower Q" },
      ],
      legend: [{ label: "Demand", color: "#ef4444" }, { label: "Supply", color: "#3b82f6" }, { label: "Shift ←", color: "#f59e0b" }],
    },
  },

  /* ── Externalities ── */
  positive_externality: {
    title: "Positive Externality of Consumption",
    xAxis: "Quantity", yAxis: "Benefit /\ncost / price",
    legend: [{ label: "MSC = MPC", color: "#3b82f6" }, { label: "MSB", color: "#ef4444" }, { label: "MPB", color: "#ef4444" }, { label: "Welfare Loss ABE", color: "#ef4444" }],
    examTips: [
      "MSC = MPC — no external costs in production",
      "MSB is above MPB — consumption generates external benefits to third parties",
      "Free market outcome where MPB = MPC: point E at (q, p)",
      "Socially optimal outcome where MSB = MSC: point B at (q₁, p₁)",
      "Underconsumption of q₁ − q. Welfare loss ABE",
      "Example: consuming healthcare benefits the rest of society (healthier, more productive individuals)",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const axL = mx + pad;
      const axBot = my + ph - pad;
      const axTop = my + pad;

      // MSC = MPC: upward sloping (BLUE — cost/supply side)
      const mscL = { x1: axL + pw * 0.08, y1: axBot, x2: mx + pw - pad, y2: axTop };
      // MSB: downward sloping (RED) — above MPB, true social benefit
      const msbL = { x1: axL, y1: axTop + 5, x2: mx + pw * 0.75, y2: axBot };
      // MPB: downward sloping (RED) — what consumers perceive, below MSB
      const mpbL = { x1: axL + pw * 0.05, y1: my + ph * 0.45, x2: mx + pw * 0.58, y2: axBot };

      // E = free market: MPB ∩ MSC
      const ptE = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, mpbL.x1, mpbL.y1, mpbL.x2, mpbL.y2);
      // B = social optimum: MSB ∩ MSC
      const ptB = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, msbL.x1, msbL.y1, msbL.x2, msbL.y2);
      // A = MSB at free market Q (above E)
      const msbSlope = (msbL.y2 - msbL.y1) / (msbL.x2 - msbL.x1);
      const ptA = { x: ptE.x, y: msbL.y1 + msbSlope * (ptE.x - msbL.x1) };

      return (
        <>
          {/* Welfare loss triangle ABE */}
          <WelfareRegion
            points={[
              { x: ptA.x, y: ptA.y },
              { x: ptB.x, y: ptB.y },
              { x: ptE.x, y: ptE.y },
            ]}
            fill="#ef4444"
            fillOpacity={0.18}
            strokeWidth={0}
            label="Welfare Loss"
            labelSize={7}
          />
          {/* MSC = MPC (BLUE — cost curve) */}
          <GLine {...mscL} color="#3b82f6" gradientId="grad-demand" glow="glow-blue" width={2.5} />
          <Label x={mscL.x2 - 4} y={mscL.y2 - 8} text="MSC = MPC" color="#3b82f6" size={8} />
          {/* MSB (RED — benefit curve, above MPB) */}
          <GLine {...msbL} color="#ef4444" gradientId="grad-supply" glow="glow-red" width={2.5} />
          <Label x={msbL.x2 + 4} y={msbL.y2 - 8} text="MSB" color="#ef4444" />
          {/* MPB (RED — benefit curve, below MSB) */}
          <GLine {...mpbL} color="#ef4444" width={2.5} />
          <Label x={mpbL.x2 + 4} y={mpbL.y2 - 6} text="MPB" color="#ef4444" />
          {/* Dashed projections for E (q, p) */}
          <line x1={ptE.x} y1={ptE.y} x2={mx} y2={ptE.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <line x1={ptE.x} y1={ptE.y} x2={ptE.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <Label x={mx - 2} y={ptE.y + 3} text="p" color="hsl(var(--foreground))" size={10} anchor="end" />
          <Label x={ptE.x} y={axBot + 14} text="q" color="hsl(var(--foreground))" size={10} />
          {/* Dashed projections for B (q₁, p₁) */}
          <line x1={ptB.x} y1={ptB.y} x2={mx} y2={ptB.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <line x1={ptB.x} y1={ptB.y} x2={ptB.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <Label x={mx - 2} y={ptB.y + 3} text="p₁" color="hsl(var(--foreground))" size={10} anchor="end" />
          <Label x={ptB.x} y={axBot + 14} text="q₁" color="hsl(var(--foreground))" size={10} />
          {/* Point labels */}
          <PremiumDot x={ptE.x} y={ptE.y} color={COLORS.eq} label="E" gradientId="dot-green" />
          <PremiumDot x={ptB.x} y={ptB.y} color={COLORS.eq} label="B" gradientId="dot-amber" />
          <Label x={ptA.x + 6} y={ptA.y + 4} text="A" color="#ef4444" size={9} />
        </>
      );
    },
  },
  negative_externality: {
    title: "Negative Externality of Consumption",
    xAxis: "Quantity", yAxis: "Benefit /\ncost / price",
    legend: [{ label: "MSC = MPC", color: "#3b82f6" }, { label: "MPB", color: "#ef4444" }, { label: "MSB", color: "#ef4444" }, { label: "Welfare Loss ABE", color: "#ef4444" }],
    examTips: [
      "MSC = MPC — no external costs in production",
      "MSB is below MPB — consumers ignore harm to third parties (e.g. demerit goods)",
      "Free market outcome where MPB = MPC: point B at (q, p)",
      "Socially optimal outcome where MSB = MSC: point E at (q₁, p₁)",
      "Overconsumption of q − q₁. Welfare loss ABE",
      "Example: air pollution caused by car consumption of petrol",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const axL = mx + pad;
      const axBot = my + ph - pad;
      const axTop = my + pad;

      // MSC = MPC: upward sloping (BLUE — cost/supply side)
      const mscL = { x1: axL + pw * 0.08, y1: axBot, x2: mx + pw - pad, y2: axTop };
      // MPB: downward sloping (RED) — what consumers perceive (above MSB)
      const mpbL = { x1: axL, y1: axTop + 5, x2: mx + pw * 0.75, y2: axBot };
      // MSB: downward sloping, below MPB (RED) — true social benefit
      const msbL = { x1: axL + pw * 0.05, y1: my + ph * 0.45, x2: mx + pw * 0.58, y2: axBot };

      // B = free market: MPB ∩ MSC
      const ptB = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, mpbL.x1, mpbL.y1, mpbL.x2, mpbL.y2);
      // E = social optimum: MSB ∩ MSC
      const ptE = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, msbL.x1, msbL.y1, msbL.x2, msbL.y2);
      // A = MSB at free market Q (below B)
      const msbSlope = (msbL.y2 - msbL.y1) / (msbL.x2 - msbL.x1);
      const ptA = { x: ptB.x, y: msbL.y1 + msbSlope * (ptB.x - msbL.x1) };

      return (
        <>
          {/* Welfare loss triangle ABE */}
          <WelfareRegion
            points={[
              { x: ptA.x, y: ptA.y },
              { x: ptB.x, y: ptB.y },
              { x: ptE.x, y: ptE.y },
            ]}
            fill="#ef4444"
            fillOpacity={0.18}
            strokeWidth={0}
            label="Welfare Loss"
            labelSize={7}
          />
          {/* MSC = MPC (BLUE — cost curve) */}
          <GLine {...mscL} color="#3b82f6" gradientId="grad-demand" glow="glow-blue" width={2.5} />
          <Label x={mscL.x2 - 4} y={mscL.y2 - 8} text="MSC = MPC" color="#3b82f6" size={8} />
          {/* MPB (RED — benefit curve, above MSB) */}
          <GLine {...mpbL} color="#ef4444" gradientId="grad-supply" glow="glow-red" width={2.5} />
          <Label x={mpbL.x2 + 4} y={mpbL.y2 - 8} text="MPB" color="#ef4444" />
          {/* MSB (RED — benefit curve, below MPB) */}
          <GLine {...msbL} color="#ef4444" width={2.5} />
          <Label x={msbL.x2 + 4} y={msbL.y2 - 6} text="MSB" color="#ef4444" />
          {/* Dashed projections for B (q, p) */}
          <line x1={ptB.x} y1={ptB.y} x2={mx} y2={ptB.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <line x1={ptB.x} y1={ptB.y} x2={ptB.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <Label x={mx - 2} y={ptB.y + 3} text="p" color="hsl(var(--foreground))" size={10} anchor="end" />
          <Label x={ptB.x} y={axBot + 14} text="q" color="hsl(var(--foreground))" size={10} />
          {/* Dashed projections for E (q₁, p₁) */}
          <line x1={ptE.x} y1={ptE.y} x2={mx} y2={ptE.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <line x1={ptE.x} y1={ptE.y} x2={ptE.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <Label x={mx - 2} y={ptE.y + 3} text="p₁" color="hsl(var(--foreground))" size={10} anchor="end" />
          <Label x={ptE.x} y={axBot + 14} text="q₁" color="hsl(var(--foreground))" size={10} />
          {/* Point labels */}
          <PremiumDot x={ptB.x} y={ptB.y} color={COLORS.eq} label="B" gradientId="dot-green" />
          <PremiumDot x={ptE.x} y={ptE.y} color={COLORS.eq} label="E" gradientId="dot-amber" />
          <Label x={ptA.x + 6} y={ptA.y + 4} text="A" color="#ef4444" size={9} />
        </>
      );
    },
  },
  negative_production_externality: {
    title: "Negative Externality of Production",
    xAxis: "Quantity", yAxis: "Benefit /\ncost / price",
    legend: [{ label: "MSC", color: "#3b82f6" }, { label: "MPC", color: "#ef4444" }, { label: "MPB = MSB", color: "#ef4444" }, { label: "Welfare Loss ABE", color: "#ef4444" }],
    examTips: [
      "MSC is above MPC — producers ignore external costs (e.g. pollution)",
      "Free market produces where MPB = MPC: point E at (q, p)",
      "Socially optimal outcome where MSC = MSB: point B at (q₁, p₁)",
      "Overproduction of q − q₁. Welfare loss ABE",
      "Example: firm pollution of air and water",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const axL = mx + pad;
      const axBot = my + ph - pad;
      const axTop = my + pad;

      // MPC: upward sloping (RED) — private cost, lower
      const mpcL = { x1: axL + pw * 0.05, y1: axBot, x2: mx + pw * 0.7, y2: axTop + ph * 0.1 };
      // MSC: upward sloping, above MPC (BLUE) — social cost higher, steeper
      const mscL = { x1: axL + pw * 0.2, y1: axBot, x2: mx + pw * 0.55, y2: axTop };
      // MPB = MSB: downward sloping (RED)
      const dL = { x1: axL, y1: axTop + 5, x2: mx + pw - pad, y2: axBot };

      // E = free market: MPC ∩ MPB
      const ptE = lineIntersect(mpcL.x1, mpcL.y1, mpcL.x2, mpcL.y2, dL.x1, dL.y1, dL.x2, dL.y2);
      // B = social optimum: MSC ∩ MSB
      const ptB = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, dL.x1, dL.y1, dL.x2, dL.y2);
      // A = MSC at free market Q (above E)
      const mscSlope = (mscL.y2 - mscL.y1) / (mscL.x2 - mscL.x1);
      const ptA = { x: ptE.x, y: mscL.y1 + mscSlope * (ptE.x - mscL.x1) };

      return (
        <>
          {/* Welfare loss triangle ABE */}
          <WelfareRegion
            points={[
              { x: ptA.x, y: ptA.y },
              { x: ptB.x, y: ptB.y },
              { x: ptE.x, y: ptE.y },
            ]}
            fill="#ef4444"
            fillOpacity={0.18}
            strokeWidth={0}
            label="Welfare Loss"
            labelSize={7}
          />
          {/* MSC (BLUE — social cost, above MPC) */}
          <GLine {...mscL} color="#3b82f6" gradientId="grad-demand" glow="glow-blue" width={2.5} />
          <Label x={mscL.x2 - 4} y={mscL.y2 - 8} text="MSC" color="#3b82f6" size={9} />
          {/* MPC (RED — private cost, lower) */}
          <GLine {...mpcL} color="#ef4444" width={2.5} />
          <Label x={mpcL.x2 + 4} y={mpcL.y2 - 4} text="MPC" color="#ef4444" />
          {/* MPB = MSB (RED — benefit/demand) */}
          <GLine {...dL} color="#ef4444" gradientId="grad-supply" glow="glow-red" width={2.5} />
          <Label x={dL.x2 + 4} y={dL.y2 - 8} text="MPB = MSB" color="#ef4444" />
          {/* Dashed projections for E (q, p) */}
          <line x1={ptE.x} y1={ptE.y} x2={mx} y2={ptE.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <line x1={ptE.x} y1={ptE.y} x2={ptE.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <Label x={mx - 2} y={ptE.y + 3} text="p" color="hsl(var(--foreground))" size={10} anchor="end" />
          <Label x={ptE.x} y={axBot + 14} text="q" color="hsl(var(--foreground))" size={10} />
          {/* Dashed projections for B (q₁, p₁) */}
          <line x1={ptB.x} y1={ptB.y} x2={mx} y2={ptB.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <line x1={ptB.x} y1={ptB.y} x2={ptB.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <Label x={mx - 2} y={ptB.y + 3} text="p₁" color="hsl(var(--foreground))" size={10} anchor="end" />
          <Label x={ptB.x} y={axBot + 14} text="q₁" color="hsl(var(--foreground))" size={10} />
          {/* Point labels */}
          <PremiumDot x={ptE.x} y={ptE.y} color={COLORS.eq} label="E" gradientId="dot-green" />
          <PremiumDot x={ptB.x} y={ptB.y} color={COLORS.eq} label="B" gradientId="dot-amber" />
          <Label x={ptA.x + 6} y={ptA.y - 4} text="A" color="#ef4444" size={9} />
        </>
      );
    },
  },
  positive_production_externality: {
    title: "Positive Externality of Production",
    xAxis: "Quantity (Q)", yAxis: "Benefit / Cost / Price",
    legend: [
      { label: "S = MPC", color: "#ef4444" },
      { label: "MSC", color: "#f97316" },
      { label: "MPB = MSB = Demand", color: "#3b82f6" },
      { label: "Welfare Loss", color: "#fb923c" },
    ],
    examTips: [
      "MSC is BELOW MPC — production generates external benefits (e.g. job training, R&D spillovers)",
      "Free market: MPB ∩ MPC → Qm (under-produces relative to social optimum)",
      "Social optimum: MPB ∩ MSC → Qopt (more output is desirable)",
      "Welfare loss triangle between market eq, social optimum, and MPC at Qopt",
      "Policy: subsidise production to close gap between MPC and MSC",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;

      // Data-space equations (x: 0–10, y: 0–10):
      //   MPB = MSB = Demand: y = -0.8x + 9
      //   S = MPC:            y =  0.7x + 1   (ABOVE MSC)
      //   MSC:                y =  0.4x + 0.5  (BELOW MPC)
      const toSx = (v: number) => mx + (v / 10) * pw;
      const toSy = (v: number) => my + ph - (v / 10) * ph;

      // Compute data-space intersections
      // MPB ∩ MPC: -0.8x + 9 = 0.7x + 1 → 1.5x = 8 → x = 5.333
      const qm = 8 / 1.5;
      const pm = -0.8 * qm + 9;
      // MPB ∩ MSC: -0.8x + 9 = 0.4x + 0.5 → 1.2x = 8.5 → x = 7.083
      const qopt = 8.5 / 1.2;
      const popt = -0.8 * qopt + 9;
      // MPC value at Qopt
      const mpcAtQopt = 0.7 * qopt + 1;

      // SVG coordinates
      const eqMarket = { x: toSx(qm), y: toSy(pm) };
      const eqSocial = { x: toSx(qopt), y: toSy(popt) };
      const mpcAtQoptSvg = { x: toSx(qopt), y: toSy(mpcAtQopt) };

      // Curve endpoints in SVG (clip to data range 0–10)
      // MPB line: x=0→y=9, x=10→y=1 (but clamp x where y≥0: x=11.25, so use x=10)
      const mpbLine = { x1: toSx(0), y1: toSy(9), x2: toSx(10), y2: toSy(1) };
      // MPC line: x=0→y=1, x=10→y=8
      const mpcLine = { x1: toSx(0), y1: toSy(1), x2: toSx(10), y2: toSy(8) };
      // MSC line: x=0→y=0.5, x=10→y=4.5
      const mscLine = { x1: toSx(0), y1: toSy(0.5), x2: toSx(10), y2: toSy(4.5) };

      return (
        <>
          {/* Welfare loss triangle: Market eq → Social optimum → MPC at Qopt */}
          <polygon
            points={`${eqMarket.x},${eqMarket.y} ${eqSocial.x},${eqSocial.y} ${mpcAtQoptSvg.x},${mpcAtQoptSvg.y}`}
            fill="rgba(251,146,60,0.18)"
            stroke="#f97316"
            strokeWidth={1.5}
            strokeDasharray="5,3"
          />
          <Label
            x={(eqMarket.x + eqSocial.x + mpcAtQoptSvg.x) / 3}
            y={(eqMarket.y + eqSocial.y + mpcAtQoptSvg.y) / 3 + 4}
            text="Welfare Loss"
            color="#f97316"
            size={8}
            anchor="middle"
          />

          {/* S = MPC (Red — private cost, ABOVE MSC) */}
          <GLine {...mpcLine} color="#ef4444" gradientId="grad-supply" glow="glow-red" width={2.5} />
          <Label x={mpcLine.x2 - 8} y={mpcLine.y2 - 10} text="S = MPC" color="#ef4444" size={10} anchor="end" />

          {/* MSC (Orange — social cost, BELOW MPC) */}
          <GLine {...mscLine} color="#f97316" width={2.5} />
          <Label x={mscLine.x2 - 8} y={mscLine.y2 + 14} text="MSC" color="#f97316" size={10} anchor="end" />

          {/* MPB = MSB = Demand (Blue) */}
          <GLine {...mpbLine} color="#3b82f6" gradientId="grad-demand" glow="glow-blue" width={2.5} />
          <Label x={mpbLine.x2 - 8} y={mpbLine.y2 + 14} text="MPB = MSB = D" color="#3b82f6" size={9} anchor="end" />

          {/* Dashed projections — Market equilibrium (Qm, Pm) */}
          <line x1={eqMarket.x} y1={eqMarket.y} x2={mx} y2={eqMarket.y} stroke="#16a34a" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.5} />
          <line x1={eqMarket.x} y1={eqMarket.y} x2={eqMarket.x} y2={my + ph} stroke="#16a34a" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.5} />
          <Label x={mx - 4} y={eqMarket.y + 3} text="Pm" color="#16a34a" size={9} anchor="end" />
          <Label x={eqMarket.x} y={my + ph + 14} text="Qm" color="#16a34a" size={9} anchor="middle" />

          {/* Dashed projections — Social optimum (Qopt, Popt) */}
          <line x1={eqSocial.x} y1={eqSocial.y} x2={mx} y2={eqSocial.y} stroke="#eab308" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.5} />
          <line x1={eqSocial.x} y1={eqSocial.y} x2={eqSocial.x} y2={my + ph} stroke="#eab308" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.5} />
          <Label x={mx - 4} y={eqSocial.y + 3} text="Popt" color="#eab308" size={9} anchor="end" />
          <Label x={eqSocial.x} y={my + ph + 14} text="Qopt" color="#eab308" size={9} anchor="middle" />

          {/* Equilibrium dots */}
          <PremiumDot x={eqMarket.x} y={eqMarket.y} color="#16a34a" label="Market eq (Qm, Pm)" gradientId="dot-green"
            tooltipText="Free market: MPB = MPC → under-production" />
          <PremiumDot x={eqSocial.x} y={eqSocial.y} color="#eab308" label="Social optimum (Qopt, Popt)" gradientId="dot-amber"
            tooltipText="Social optimum: MPB = MSC → more output" />
        </>
      );
    },
  },

  /* ── Macro: AD/AS ── */
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
      const pad = 10;
      const lrasX = mx + pw * 0.65;

      // SRAS: upward sloping
      const srasL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad + 15 };
      // AD₁: downward sloping
      const ad1L = { x1: mx + pad + 10, y1: my + pad, x2: mx + pw * 0.58, y2: my + ph - pad };
      // AD₂: shifted right
      const ad2L = { x1: mx + pw * 0.18, y1: my + pad, x2: mx + pw * 0.72, y2: my + ph - pad };

      const eq1 = lineIntersect(srasL.x1, srasL.y1, srasL.x2, srasL.y2, ad1L.x1, ad1L.y1, ad1L.x2, ad1L.y2);
      const eq2 = lineIntersect(srasL.x1, srasL.y1, srasL.x2, srasL.y2, ad2L.x1, ad2L.y1, ad2L.x2, ad2L.y2);

      return (
        <>
          <GLine x1={lrasX} y1={my + pad} x2={lrasX} y2={my + ph - pad} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 6} y={my + 20} text="LRAS" color={COLORS.lras} />
          <Label x={lrasX - 4} y={my + ph + 14} text="Yf" color={COLORS.lras} size={9} anchor="middle" />
          <GLine {...srasL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={srasL.x2 + 4} y={srasL.y2 + 4} text="SRAS" color={COLORS.supply} />
          <GLine {...ad1L} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={ad1L.x2 + 4} y={ad1L.y2 - 6} text="AD₁" color={COLORS.demand} />
          <GLine {...ad2L} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={ad2L.x2 + 4} y={ad2L.y2 - 6} text="AD₂" color={COLORS.demand} />
          <ShiftArrow x1={eq1.x + 5} y1={eq1.y + 8} x2={eq2.x - 5} y2={eq2.y + 8} color={COLORS.shifted} />

          <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Label initial equilibrium clearly" />
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
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
      const pad = 10;
      const lrasX = mx + pw * 0.65;

      const srasL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad + 15 };
      // AD₁ is further right; AD₂ is shifted left
      const ad1L = { x1: mx + pw * 0.18, y1: my + pad, x2: mx + pw * 0.72, y2: my + ph - pad };
      const ad2L = { x1: mx + pad + 10, y1: my + pad, x2: mx + pw * 0.58, y2: my + ph - pad };

      const eq1 = lineIntersect(srasL.x1, srasL.y1, srasL.x2, srasL.y2, ad1L.x1, ad1L.y1, ad1L.x2, ad1L.y2);
      const eq2 = lineIntersect(srasL.x1, srasL.y1, srasL.x2, srasL.y2, ad2L.x1, ad2L.y1, ad2L.x2, ad2L.y2);

      return (
        <>
          <GLine x1={lrasX} y1={my + pad} x2={lrasX} y2={my + ph - pad} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 6} y={my + 20} text="LRAS" color={COLORS.lras} />
          <Label x={lrasX - 4} y={my + ph + 14} text="Yf" color={COLORS.lras} size={9} anchor="middle" />
          <GLine {...srasL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={srasL.x2 + 4} y={srasL.y2 + 4} text="SRAS" color={COLORS.supply} />
          <GLine {...ad1L} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={ad1L.x2 + 4} y={ad1L.y2 - 6} text="AD₁" color={COLORS.demand} />
          <GLine {...ad2L} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={ad2L.x2 + 4} y={ad2L.y2 - 6} text="AD₂" color={COLORS.demand} />
          <ShiftArrow x1={eq1.x - 5} y1={eq1.y + 8} x2={eq2.x + 5} y2={eq2.y + 8} color={COLORS.shifted} />

          <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium before AD↓" />
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ AD↓ → lower PL & GDP (recession)" />
        </>
      );
    },
  },

  /* ── Demand-Side Shock — Positive vs Negative (2 panels) ── */
  demand_side_shock: {
    title: "Aggregate Demand Shocks — Positive vs Negative",
    xAxis: "", yAxis: "",
    legend: [
      { label: "AD", color: COLORS.demand },
      { label: "SRAS", color: COLORS.supply },
      { label: "LRAS", color: COLORS.lras },
    ],
    examTips: [
      "Positive AD shock: AD shifts RIGHT → demand-pull inflation + shortage at old PL",
      "Negative AD shock: AD shifts LEFT → deflation + surplus at old PL",
      "Show both equilibria E₁/E₂ with price level and output projections",
      "Key causes: changes in C, I, G, or Xn (net exports)",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const halfW = pw / 2;
      const gap = 18;
      const pad = 8;

      const p1x = mx;
      const p2x = mx + halfW + gap / 2;
      const axTop = my + 18;
      const axBot = my + ph - 18;
      const axH = axBot - axTop;
      const panelW = halfW - gap / 2;

      const panelAxes = (ox: number, w: number, yLabel: string, xLabel: string) => (
        <>
          <line x1={ox + pad} y1={axTop} x2={ox + pad} y2={axBot} stroke="currentColor" strokeWidth={1.8} />
          <line x1={ox + pad} y1={axBot} x2={ox + w - pad} y2={axBot} stroke="currentColor" strokeWidth={1.8} />
          <text x={ox + pad - 3} y={axTop - 4} textAnchor="middle" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{yLabel}</text>
          <text x={ox + w - pad} y={axBot + 14} textAnchor="end" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{xLabel}</text>
          <text x={ox + pad - 2} y={axBot + 5} textAnchor="middle" fontSize={7} fontWeight={600} fill="currentColor" opacity={0.5}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>
        </>
      );

      // ══════════════════════════════
      // LEFT PANEL — Positive AD Shock
      // ══════════════════════════════
      const L = p1x + pad;
      const R1 = p1x + panelW - pad;
      const lrasX1 = L + (R1 - L) * 0.45;

      // SRAS upward sloping
      const sras1 = { x1: L + 5, y1: axBot - 4, x2: R1 - 5, y2: axTop + 4 };
      // AD (original)
      const ad1 = { x1: L + (R1 - L) * 0.08, y1: axTop + axH * 0.08, x2: L + (R1 - L) * 0.62, y2: axBot - 4 };
      // AD₁ (shifted right)
      const shift1 = (R1 - L) * 0.22;
      const ad1s = { x1: ad1.x1 + shift1, y1: ad1.y1, x2: ad1.x2 + shift1, y2: ad1.y2 };

      const eq1a = lineIntersect(sras1.x1, sras1.y1, sras1.x2, sras1.y2, ad1.x1, ad1.y1, ad1.x2, ad1.y2);
      const eq1b = lineIntersect(sras1.x1, sras1.y1, sras1.x2, sras1.y2, ad1s.x1, ad1s.y1, ad1s.x2, ad1s.y2);

      // Shortage = horizontal distance between AD₁ and SRAS at old price PLe
      // On AD₁ at PLe y: solve for x
      const adSlope = (ad1s.y2 - ad1s.y1) / (ad1s.x2 - ad1s.x1);
      const adXatPLe = ad1s.x1 + (eq1a.y - ad1s.y1) / adSlope;
      const srasSlope = (sras1.y2 - sras1.y1) / (sras1.x2 - sras1.x1);
      const srasXatPLe = sras1.x1 + (eq1a.y - sras1.y1) / srasSlope;

      // ══════════════════════════════
      // RIGHT PANEL — Negative AD Shock
      // ══════════════════════════════
      const L2 = p2x + pad;
      const R2 = p2x + panelW - pad;
      const lrasX2 = L2 + (R2 - L2) * 0.55;

      // SRAS
      const sras2 = { x1: L2 + 5, y1: axBot - 4, x2: R2 - 5, y2: axTop + 4 };
      // AD (original — further right)
      const ad2 = { x1: L2 + (R2 - L2) * 0.25, y1: axTop + axH * 0.05, x2: R2 - 5, y2: axBot - 4 };
      // AD₁ (shifted left)
      const shift2 = -(R2 - L2) * 0.22;
      const ad2s = { x1: ad2.x1 + shift2, y1: ad2.y1, x2: ad2.x2 + shift2, y2: ad2.y2 };

      const eq2a = lineIntersect(sras2.x1, sras2.y1, sras2.x2, sras2.y2, ad2.x1, ad2.y1, ad2.x2, ad2.y2);
      const eq2b = lineIntersect(sras2.x1, sras2.y1, sras2.x2, sras2.y2, ad2s.x1, ad2s.y1, ad2s.x2, ad2s.y2);

      // Surplus at old PLe
      const ad2Slope = (ad2s.y2 - ad2s.y1) / (ad2s.x2 - ad2s.x1);
      const ad2XatPLe = ad2s.x1 + (eq2a.y - ad2s.y1) / ad2Slope;
      const sras2Slope = (sras2.y2 - sras2.y1) / (sras2.x2 - sras2.x1);
      const sras2XatPLe = sras2.x1 + (eq2a.y - sras2.y1) / sras2Slope;

      return (
        <>
          {/* Panel titles */}
          <rect x={p1x + panelW * 0.08} y={my} width={panelW * 0.84} height={15} rx={3} fill={COLORS.demand} opacity={0.12} />
          <text x={p1x + panelW * 0.5} y={my + 11} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={COLORS.demand}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Positive AD Shock</text>
          <rect x={p2x + panelW * 0.08} y={my} width={panelW * 0.84} height={15} rx={3} fill={COLORS.supply} opacity={0.12} />
          <text x={p2x + panelW * 0.5} y={my + 11} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={COLORS.supply}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Negative AD Shock</text>

          {/* ── LEFT PANEL ── */}
          {panelAxes(p1x, panelW, "PL", "rGDP")}

          {/* LRAS */}
          <line x1={lrasX1} y1={axTop + 4} x2={lrasX1} y2={axBot - 4} stroke={COLORS.lras} strokeWidth={2} />
          <Label x={lrasX1 + 3} y={axTop + 4} text="LRAS" color={COLORS.lras} size={8} />
          <text x={lrasX1} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.lras} opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Yfe</text>

          {/* SRAS */}
          <GLine {...sras1} color={COLORS.supply} width={2} />
          <Label x={sras1.x2 + 2} y={sras1.y2 + 4} text="SRAS" color={COLORS.supply} size={8} />

          {/* AD (original) */}
          <GLine {...ad1} color={COLORS.demand} width={2} />
          <Label x={ad1.x2 + 2} y={ad1.y2 - 4} text="AD" color={COLORS.demand} size={8} />

          {/* AD₁ (shifted right) */}
          <GLine {...ad1s} color={COLORS.demand} width={2} dashed />
          <Label x={ad1s.x2 + 2} y={ad1s.y2 - 4} text="AD₁" color={COLORS.demand} size={8} />

          {/* Shift arrow */}
          <line x1={eq1a.x + 4} y1={eq1a.y + 10} x2={eq1b.x - 4} y2={eq1b.y + 10}
            stroke={COLORS.demand} strokeWidth={1.5} markerEnd="url(#arrowHead)" opacity={0.7} />

          {/* Equilibria */}
          <PremiumDot x={eq1a.x} y={eq1a.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium" />
          <PremiumDot x={eq1b.x} y={eq1b.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ After positive AD shock" />

          {/* Projections E₁ */}
          <line x1={eq1a.x} y1={eq1a.y} x2={L + pad} y2={eq1a.y} stroke={COLORS.eq} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <line x1={eq1a.x} y1={eq1a.y} x2={eq1a.x} y2={axBot} stroke={COLORS.eq} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <text x={L + pad - 2} y={eq1a.y + 3} textAnchor="end" fontSize={8} fontWeight={600} fill={COLORS.eq} opacity={0.8}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>PLe</text>
          <text x={eq1a.x} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.eq} opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Ye₁</text>

          {/* Projections E₂ */}
          <line x1={eq1b.x} y1={eq1b.y} x2={L + pad} y2={eq1b.y} stroke={COLORS.shifted} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <line x1={eq1b.x} y1={eq1b.y} x2={eq1b.x} y2={axBot} stroke={COLORS.shifted} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <text x={L + pad - 2} y={eq1b.y + 3} textAnchor="end" fontSize={8} fontWeight={600} fill={COLORS.shifted} opacity={0.8}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>PLa</text>
          <text x={eq1b.x} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.shifted} opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Yd</text>

          {/* Shortage annotation at PLe level */}
          <line x1={srasXatPLe + 2} y1={eq1a.y + 4} x2={adXatPLe - 2} y2={eq1a.y + 4}
            stroke={COLORS.supply} strokeWidth={1.2} strokeDasharray="2,2" opacity={0.6} />
          <text x={(srasXatPLe + adXatPLe) / 2} y={eq1a.y + 16} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.supply}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Shortage</text>

          {/* D-pull inflation label */}
          <text x={(eq1a.x + eq1b.x) / 2} y={eq1b.y - 8} textAnchor="middle" fontSize={6.5} fontWeight={600} fill={COLORS.demand} opacity={0.8}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>D-pull inflation</text>

          {/* ── RIGHT PANEL ── */}
          {panelAxes(p2x, panelW, "PL", "rGDP")}

          {/* LRAS */}
          <line x1={lrasX2} y1={axTop + 4} x2={lrasX2} y2={axBot - 4} stroke={COLORS.lras} strokeWidth={2} />
          <Label x={lrasX2 + 3} y={axTop + 4} text="LRAS" color={COLORS.lras} size={8} />
          <text x={lrasX2} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.lras} opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Yfe</text>

          {/* SRAS */}
          <GLine {...sras2} color={COLORS.supply} width={2} />
          <Label x={sras2.x2 + 2} y={sras2.y2 + 4} text="SRAS" color={COLORS.supply} size={8} />

          {/* AD (original) */}
          <GLine {...ad2} color={COLORS.demand} width={2} />
          <Label x={ad2.x2 + 2} y={ad2.y2 - 4} text="AD" color={COLORS.demand} size={8} />

          {/* AD₁ (shifted left) */}
          <GLine {...ad2s} color={COLORS.demand} width={2} dashed />
          <Label x={ad2s.x2 + 2} y={ad2s.y2 - 4} text="AD₁" color={COLORS.demand} size={8} />

          {/* Shift arrow */}
          <line x1={eq2a.x - 4} y1={eq2a.y + 10} x2={eq2b.x + 4} y2={eq2b.y + 10}
            stroke={COLORS.demand} strokeWidth={1.5} markerEnd="url(#arrowHead)" opacity={0.7} />

          {/* Equilibria */}
          <PremiumDot x={eq2a.x} y={eq2a.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium" />
          <PremiumDot x={eq2b.x} y={eq2b.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ After negative AD shock" />

          {/* Projections E₁ */}
          <line x1={eq2a.x} y1={eq2a.y} x2={L2 + pad} y2={eq2a.y} stroke={COLORS.eq} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <line x1={eq2a.x} y1={eq2a.y} x2={eq2a.x} y2={axBot} stroke={COLORS.eq} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <text x={L2 + pad - 2} y={eq2a.y + 3} textAnchor="end" fontSize={8} fontWeight={600} fill={COLORS.eq} opacity={0.8}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>PLe</text>

          {/* Projections E₂ */}
          <line x1={eq2b.x} y1={eq2b.y} x2={L2 + pad} y2={eq2b.y} stroke={COLORS.shifted} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <line x1={eq2b.x} y1={eq2b.y} x2={eq2b.x} y2={axBot} stroke={COLORS.shifted} strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
          <text x={L2 + pad - 2} y={eq2b.y + 3} textAnchor="end" fontSize={8} fontWeight={600} fill={COLORS.shifted} opacity={0.8}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>PLb</text>
          <text x={eq2b.x} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.shifted} opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Y₀</text>

          {/* Surplus annotation at PLe level */}
          <line x1={ad2XatPLe + 2} y1={eq2a.y + 4} x2={sras2XatPLe - 2} y2={eq2a.y + 4}
            stroke={COLORS.supply} strokeWidth={1.2} strokeDasharray="2,2" opacity={0.6} />
          <text x={(ad2XatPLe + sras2XatPLe) / 2} y={eq2a.y + 16} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.supply}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Surplus</text>
        </>
      );
    },
  },

  /* ── Demand Shift Right (single panel, textbook style) ── */
  demand_shift_dual: {
    title: "Supply & Demand — Shift in Demand",
    xAxis: "Quantity", yAxis: "Price",
    legend: [
      { label: "Supply (S)", color: "#3b82f6" },
      { label: "Demand (D)", color: "#ef4444" },
      { label: "Shifted Demand (D₁)", color: "#ef4444" },
    ],
    examTips: [
      "Demand shift right: caused by ↑ incomes (normal good), ↑ advertising, ↑ price of substitute, ↓ price of complement",
      "NOT a fall in the price of the good itself — that is a movement along the curve",
      "Right shift → higher price (p → p₁) and higher quantity (q → q₁)",
      "Always label both equilibria and show dashed projections to axes",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 12;
      const axL = mx + pad;
      const axR = mx + pw - pad;
      const axTop = my + pad;
      const axBot = my + ph - pad;

      // Supply: upward sloping (bottom-left → top-right)
      const s = { x1: axL + 5, y1: axBot - 5, x2: axR - 5, y2: axTop + 5 };

      // D (original demand): downward sloping, positioned left
      const d = {
        x1: axL + pw * 0.08, y1: axTop + 5,
        x2: axL + pw * 0.55, y2: axBot - 5,
      };

      // D₁ (shifted right): same slope, shifted rightward
      const shiftAmt = pw * 0.22;
      const d1 = {
        x1: d.x1 + shiftAmt, y1: d.y1,
        x2: d.x2 + shiftAmt, y2: d.y2,
      };

      // Equilibria
      const eqOrig = lineIntersect(s.x1, s.y1, s.x2, s.y2, d.x1, d.y1, d.x2, d.y2);
      const eqNew = lineIntersect(s.x1, s.y1, s.x2, s.y2, d1.x1, d1.y1, d1.x2, d1.y2);

      // Arrow midpoint between D and D₁ curves
      const arrowY = (axTop + axBot) * 0.42;
      // Find x on D at arrowY
      const tD = (arrowY - d.y1) / (d.y2 - d.y1);
      const arrowX1 = d.x1 + tD * (d.x2 - d.x1) + 6;
      const tD1 = (arrowY - d1.y1) / (d1.y2 - d1.y1);
      const arrowX2 = d1.x1 + tD1 * (d1.x2 - d1.x1) - 6;

      return (
        <>
          {/* Dashed projection lines for original equilibrium (p, q) */}
          <line x1={eqOrig.x} y1={eqOrig.y} x2={axL} y2={eqOrig.y}
            stroke="currentColor" strokeWidth={1} strokeDasharray="4,3" opacity={0.5} />
          <line x1={eqOrig.x} y1={eqOrig.y} x2={eqOrig.x} y2={axBot}
            stroke="currentColor" strokeWidth={1} strokeDasharray="4,3" opacity={0.5} />

          {/* Dashed projection lines for new equilibrium (p₁, q₁) */}
          <line x1={eqNew.x} y1={eqNew.y} x2={axL} y2={eqNew.y}
            stroke="currentColor" strokeWidth={1} strokeDasharray="4,3" opacity={0.5} />
          <line x1={eqNew.x} y1={eqNew.y} x2={eqNew.x} y2={axBot}
            stroke="currentColor" strokeWidth={1} strokeDasharray="4,3" opacity={0.5} />

          {/* Supply curve (BLUE) */}
          <GLine {...s} color="#3b82f6" width={2.5} />
          <Label x={s.x2 + 3} y={s.y2 + 10} text="S" color="#3b82f6" size={10} />

          {/* D (original demand — RED) */}
          <GLine {...d} color="#ef4444" width={2.5} />
          <Label x={d.x2 + 3} y={d.y2 - 4} text="D" color="#ef4444" size={10} />

          {/* D₁ (shifted right — RED) */}
          <GLine {...d1} color="#ef4444" width={2.5} />
          <Label x={d1.x2 + 3} y={d1.y2 - 4} text="D₁" color="#ef4444" size={10} />

          {/* Shift arrow between curves */}
          <line x1={arrowX1} y1={arrowY} x2={arrowX2} y2={arrowY}
            stroke={COLORS.eq} strokeWidth={2} markerEnd="url(#arrowHead)" />

          {/* Equilibrium dots with labels */}
          <DashedToAxes x={eqOrig.x} y={eqOrig.y} mx={axL} ph={axBot - axTop} my={axTop} color={COLORS.eq} pLabel="p" qLabel="q" />
          <PremiumDot x={eqOrig.x} y={eqOrig.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Original equilibrium" />
          <DashedToAxes x={eqNew.x} y={eqNew.y} mx={axL} ph={axBot - axTop} my={axTop} color={COLORS.shifted} pLabel="p₁" qLabel="q₁" />
          <PremiumDot x={eqNew.x} y={eqNew.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ New equilibrium after demand shift" />
        </>
      );
    },
  },

  /* ── Supply & Demand — Shift in Supply (Right) ── */
  supply_shift_dual: {
    title: "Supply & Demand — Shift in Supply",
    xAxis: "Quantity", yAxis: "Price",
    legend: [
      { label: "Demand (D)", color: "#ef4444" },
      { label: "Supply (S)", color: "#3b82f6" },
      { label: "Shifted (S₁)", color: "#3b82f6" },
    ],
    examTips: [
      "Right shift: S → S₁ — price falls from p to p₁, quantity rises from q to q₁",
      "Causes: reduced labour/capital costs, technological improvements, higher productivity",
      "Always show both equilibria with dashed projections to axes",
      "State the cause of the shift clearly in your written answer",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const axL = mx + 10;
      const axBot = my + ph - 18;
      const axTop = my + 18;

      // Supply shift amount (rightward)
      const shiftAmt = pw * 0.22;

      // Demand: downward sloping (red)
      const d = { x1: axL + pw * 0.08, y1: axTop + 5, x2: axL + pw * 0.75, y2: axBot - 5 };

      // S (original): upward sloping (red) — positioned left
      const s = { x1: axL + pw * 0.05, y1: axBot - 5, x2: axL + pw * 0.55, y2: axTop + 5 };

      // S₁ (shifted right): upward sloping (blue)
      const s1 = { x1: s.x1 + shiftAmt, y1: s.y1, x2: s.x2 + shiftAmt, y2: s.y2 };

      // Equilibria
      const eq1 = lineIntersect(d.x1, d.y1, d.x2, d.y2, s.x1, s.y1, s.x2, s.y2);
      const eq2 = lineIntersect(d.x1, d.y1, d.x2, d.y2, s1.x1, s1.y1, s1.x2, s1.y2);

      // Arrow midpoint between S and S₁
      const arrowY = (axTop + axBot) / 2 + 10;
      const arrowX1 = (s.x1 + s.x2) / 2 + 12;
      const arrowX2 = (s1.x1 + s1.x2) / 2 - 12;

      return (
        <>
          {/* Dashed projections for original equilibrium (p, q) */}
          <line x1={eq1.x} y1={eq1.y} x2={axL} y2={eq1.y}
            stroke="currentColor" strokeWidth={1.2} strokeDasharray="4,3" opacity={0.5} />
          <line x1={eq1.x} y1={eq1.y} x2={eq1.x} y2={axBot}
            stroke="currentColor" strokeWidth={1.2} strokeDasharray="4,3" opacity={0.5} />

          {/* Dashed projections for new equilibrium (p₁, q₁) */}
          <line x1={eq2.x} y1={eq2.y} x2={axL} y2={eq2.y}
            stroke="currentColor" strokeWidth={1.2} strokeDasharray="4,3" opacity={0.5} />
          <line x1={eq2.x} y1={eq2.y} x2={eq2.x} y2={axBot}
            stroke="currentColor" strokeWidth={1.2} strokeDasharray="4,3" opacity={0.5} />

          {/* Demand curve (RED) */}
          <GLine {...d} color="#ef4444" width={2.5} />
          <Label x={d.x2 + 4} y={d.y2 - 4} text="D" color="#ef4444" size={10} />

          {/* S — original supply (BLUE) */}
          <GLine {...s} color="#3b82f6" width={2.5} />
          <Label x={s.x2 + 4} y={s.y2 + 4} text="S" color="#3b82f6" size={10} />

          {/* S₁ — shifted right (BLUE) */}
          <GLine {...s1} color="#3b82f6" width={2.5} />
          <Label x={s1.x2 + 4} y={s1.y2 + 4} text="S₁" color="#3b82f6" size={10} />

          {/* Shift arrow → */}
          <defs>
            <marker id="arrowShift" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="currentColor" opacity="0.7" />
            </marker>
          </defs>
          <line x1={arrowX1} y1={arrowY} x2={arrowX2} y2={arrowY}
            stroke="currentColor" strokeWidth={2} markerEnd="url(#arrowShift)" opacity={0.7} />

          {/* Equilibrium dots with labels */}
          <DashedToAxes x={eq1.x} y={eq1.y} mx={axL} ph={axBot - axTop} my={axTop} color={COLORS.eq} pLabel="p" qLabel="q" />
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Original equilibrium" />
          <DashedToAxes x={eq2.x} y={eq2.y} mx={axL} ph={axBot - axTop} my={axTop} color={COLORS.shifted} pLabel="p₁" qLabel="q₁" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ New equilibrium after supply shift" />
        </>
      );
    },
  },

  sras_decrease: {
    title: "Supply Side Shock",
    xAxis: "Real Output", yAxis: "Price Level",
    legend: [{ label: "SRAS", color: COLORS.supply }, { label: "AD", color: COLORS.demand }, { label: "LRAS", color: COLORS.lras }],
    examTips: [
      "NEGATIVE SHIFT from SRAS₁ to SRAS₂ — higher costs of production",
      "Movement UP the SRAS curve",
      "Price level rises AND real output falls — stagflation",
      "Key causes: oil price shocks, rising wages, supply chain disruption",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const lrasX = mx + pw * 0.52;

      // SRAS₁ (original): upward sloping, intersects AD near LRAS
      const sras1L = { x1: mx + pad + 15, y1: my + ph - pad, x2: mx + pw - pad - 10, y2: my + pad + 10 };
      // SRAS₂ (shifted left — negative supply shock)
      const shift = -58;
      const sras2L = { x1: sras1L.x1 + shift, y1: sras1L.y1, x2: sras1L.x2 + shift, y2: sras1L.y2 };
      // AD: downward sloping (blue)
      const adL = { x1: mx + pw * 0.15, y1: my + pad + 5, x2: mx + pw * 0.78, y2: my + ph - pad };

      // E₁ = AD ∩ SRAS₁ (original — at Yfe)
      const eq1 = lineIntersect(sras1L.x1, sras1L.y1, sras1L.x2, sras1L.y2, adL.x1, adL.y1, adL.x2, adL.y2);
      // E₂ = AD ∩ SRAS₂ (shifted — at Y₂)
      const eq2 = lineIntersect(sras2L.x1, sras2L.y1, sras2L.x2, sras2L.y2, adL.x1, adL.y1, adL.x2, adL.y2);

      return (
        <>
          {/* LRAS vertical at Yfe */}
          <GLine x1={lrasX} y1={my + pad} x2={lrasX} y2={my + ph - pad} color={COLORS.lras} gradientId="grad-lras" width={2.5} />
          <Label x={lrasX + 5} y={my + 16} text="LRAS" color={COLORS.lras} />

          {/* SRAS₁ (original) */}
          <GLine {...sras1L} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sras1L.x2 + 4} y={sras1L.y2 + 4} text="SRAS₁" color={COLORS.supply} />

          {/* SRAS₂ (shifted left) */}
          <GLine {...sras2L} color={COLORS.supply} gradientId="grad-supply" />
          <Label x={sras2L.x2 + 4} y={sras2L.y2 + 4} text="SRAS₂" color={COLORS.supply} />

          {/* Shift arrow — bold leftward */}
          <ShiftArrow
            x1={(sras1L.x1 + sras1L.x2) / 2 + 5}
            y1={(sras1L.y1 + sras1L.y2) / 2}
            x2={(sras2L.x1 + sras2L.x2) / 2 - 5}
            y2={(sras2L.y1 + sras2L.y2) / 2}
            color={COLORS.shifted}
          />

          {/* AD (blue) */}
          <GLine {...adL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={adL.x2 + 4} y={adL.y2 - 6} text="AD" color={COLORS.demand} />

          {/* Price projections — P₁ at original, P₂ at new higher */}
          <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="" />
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Y₂" />

          {/* Equilibrium dots */}
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium at Yfe" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ Stagflation: higher PL, lower Y" />

          {/* Y_FE label on x-axis */}
          <line x1={lrasX} y1={my + ph - pad} x2={lrasX} y2={my + ph - pad + 6} stroke="currentColor" strokeWidth={1.5} opacity={0.5} />
          <text x={lrasX} y={my + ph + 14} textAnchor="middle" fontSize={9} fontWeight={700} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Y<tspan baselineShift="sub" fontSize={7}>FE</tspan></text>
        </>
      );
    },
  },
  sras_increase: {
    title: "Increase in SRAS (Positive Supply Shock)",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "SRAS", color: COLORS.supply }, { label: "AD", color: COLORS.demand }, { label: "LRAS", color: COLORS.lras }],
    examTips: [
      "SRAS shifts RIGHT — lower costs of production",
      "Price level falls AND real GDP rises — non-inflationary growth",
      "Key causes: lower oil prices, better technology, deregulation",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const lrasX = mx + pw * 0.65;
      const srasShift = 55; // RIGHT shift

      const sras1L = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad + 15 };
      const sras2L = { x1: sras1L.x1 + srasShift, y1: sras1L.y1, x2: sras1L.x2 + srasShift, y2: sras1L.y2 };
      const adL = { x1: mx + pw * 0.12, y1: my + pad, x2: mx + pw * 0.68, y2: my + ph - pad };

      const eq1 = lineIntersect(sras1L.x1, sras1L.y1, sras1L.x2, sras1L.y2, adL.x1, adL.y1, adL.x2, adL.y2);
      const eq2 = lineIntersect(sras2L.x1, sras2L.y1, sras2L.x2, sras2L.y2, adL.x1, adL.y1, adL.x2, adL.y2);

      return (
        <>
          <GLine x1={lrasX} y1={my + pad} x2={lrasX} y2={my + ph - pad} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 6} y={my + 20} text="LRAS" color={COLORS.lras} />
          <Label x={lrasX - 4} y={my + ph + 14} text="Yf" color={COLORS.lras} size={9} anchor="middle" />
          <GLine {...sras1L} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sras1L.x2 + 4} y={sras1L.y2 + 4} text="SRAS₁" color={COLORS.supply} />
          <GLine {...sras2L} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={sras2L.x2 + 4} y={sras2L.y2 + 4} text="SRAS₂" color={COLORS.supply} />
          <ShiftArrow
            x1={(sras1L.x1 + sras1L.x2) / 2 - 5}
            y1={(sras1L.y1 + sras1L.y2) / 2}
            x2={(sras2L.x1 + sras2L.x2) / 2 + 5}
            y2={(sras2L.y1 + sras2L.y2) / 2}
            color={COLORS.shifted}
          />
          <GLine {...adL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={adL.x2 + 4} y={adL.y2 - 6} text="AD" color={COLORS.demand} />

          <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium" />
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ SRAS↑ → lower PL & higher GDP" />
        </>
      );
    },
  },

  /* ── Tax Incidence (Ad Valorem / Specific) ── */
  tax_incidence: {
    title: "Effect of an Indirect Tax (Ad Valorem)",
    xAxis: "Quantity", yAxis: "Price",
    legend: [{ label: "D1", color: COLORS.demand }, { label: "S1", color: COLORS.supply }, { label: "S1 + Ad valorem tax", color: COLORS.shifted }, { label: "Welfare loss", color: "#ef4444" }],
    examTips: [
      "Supply shifts LEFT/UP by the amount of the tax per unit",
      "Ad valorem tax = percentage of price → S+Tax diverges from S",
      "Welfare loss triangle between old and new equilibrium",
      "Price rises from P1 to P2, quantity falls from Q1 to Q2",
      "Label S1, S1 + Ad valorem tax and D1 clearly",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const taxShift = -50; // LEFT shift (tax increases costs → supply shifts left/up)

      // D1: top-left to bottom-right
      const dL = { x1: mx + pad, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };
      // S1: bottom-left to top-right
      const s1L = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      // S1 + Ad valorem tax: shifted LEFT
      const s2L = { x1: s1L.x1 + taxShift, y1: s1L.y1, x2: s1L.x2 + taxShift, y2: s1L.y2 };

      // Equilibria
      const eq1 = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, s1L.x1, s1L.y1, s1L.x2, s1L.y2);
      const eq2 = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, s2L.x1, s2L.y1, s2L.x2, s2L.y2);

      // Producer price at Q2 on original supply (bottom of welfare loss)
      const s1Slope = (s1L.y2 - s1L.y1) / (s1L.x2 - s1L.x1);
      const prodPriceY = s1L.y1 + s1Slope * (eq2.x - s1L.x1);

      // Tax annotation arrow between S1 and S1+tax at midpoint
      const midX = (eq1.x + eq2.x) / 2;
      const s2Slope = (s2L.y2 - s2L.y1) / (s2L.x2 - s2L.x1);
      const s1AtMid = s1L.y1 + s1Slope * (midX - s1L.x1);
      const s2AtMid = s2L.y1 + s2Slope * (midX - s2L.x1);

      return (
        <>
          {/* Welfare loss triangle — red filled */}
          <WelfareRegion
            points={[
              { x: eq2.x, y: eq2.y },
              { x: eq1.x, y: eq1.y },
              { x: eq2.x, y: prodPriceY },
            ]}
            fill="#ef4444"
            fillOpacity={0.55}
            strokeWidth={2.5}
            label="Welfare loss"
            labelSize={8}
          />

          {/* D1 */}
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D1" color={COLORS.demand} />
          {/* S1 */}
          <GLine {...s1L} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={s1L.x2 + 4} y={s1L.y2 + 4} text="S1" color={COLORS.supply} />
          {/* S1 + Ad valorem tax */}
          <GLine {...s2L} color={COLORS.shifted} gradientId="grad-shifted" glow="glow-amber" />
          <Label x={s2L.x2 + 4} y={s2L.y2 + 4} text="S1 + Ad valorem tax" color={COLORS.shifted} />

          {/* Tax - 20% annotation arrow between the two supply curves */}
          <line x1={midX + 8} y1={s1AtMid} x2={midX + 8} y2={s2AtMid}
                stroke="#1e293b" strokeWidth={2} markerEnd="url(#arrow-shifted)" markerStart="url(#arrow-shifted)" />
          <Label x={midX + 16} y={(s1AtMid + s2AtMid) / 2 + 3} text="Tax - 20%" color="#1e293b" size={9} />

          {/* Original equilibrium P1 / Q1 */}
          <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P1" qLabel="Q1" />
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Pre-tax equilibrium" />

          {/* New equilibrium P2 / Q2 */}
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P2" qLabel="Q2" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ After tax: higher P, lower Q" />
        </>
      );
    },
  },

  /* ── Subsidy on a Good ── */
  subsidy: {
    title: "Effect of a Subsidy",
    xAxis: "Quantity", yAxis: "Price",
    legend: [{ label: "S (original)", color: "#3b82f6" }, { label: "S₁ (after subsidy)", color: "#3b82f6" }, { label: "D", color: "#ef4444" }, { label: "Producer incidence", color: "#93c5fd" }, { label: "Consumer incidence", color: "#fca5a5" }],
    examTips: [
      "Subsidy shifts supply RIGHT from S to S₁",
      "Price falls from p to p₁, quantity rises from q to q₁",
      "Consumer incidence = area between p and p₁ (red)",
      "Producer incidence = area between p and p₂ (blue)",
      "Total cost of subsidy = (p₂ − p₁) × q₁",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const axBot = my + ph;
      const axR = mx + pw;
      const subsidyShift = pw * 0.22;

      // S: bottom-left to top-right (blue)
      const sL = { x1: mx + pad, y1: axBot - pad, x2: mx + pw - pad, y2: my + pad };
      // S₁: shifted right (blue)
      const s1L = { x1: sL.x1 + subsidyShift, y1: sL.y1, x2: sL.x2 + subsidyShift, y2: sL.y2 };
      // D: top-left to bottom-right (red)
      const dL = { x1: mx + pad, y1: my + pad, x2: mx + pw - pad, y2: axBot - pad };

      // Equilibria
      const eq = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, sL.x1, sL.y1, sL.x2, sL.y2); // S ∩ D → (q, p)
      const eq1 = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, s1L.x1, s1L.y1, s1L.x2, s1L.y2); // S₁ ∩ D → (q₁, p₁)

      // p₂: price on original S at q₁ (what producers receive)
      const sSlope = (sL.y2 - sL.y1) / (sL.x2 - sL.x1);
      const p2Y = sL.y1 + sSlope * (eq1.x - sL.x1);

      // Shift arrow
      const arrowMidX = (eq.x + eq1.x) / 2;
      const arrowFromY = sL.y1 + sSlope * (arrowMidX - sL.x1);
      const s1Slope = (s1L.y2 - s1L.y1) / (s1L.x2 - s1L.x1);
      const arrowToY = s1L.y1 + s1Slope * (arrowMidX - s1L.x1);

      return (
        <>
          {/* Producer incidence: rectangle between p and p₂, from axis to q₁ */}
          <rect x={mx} y={eq.y < p2Y ? eq.y : p2Y} width={eq1.x - mx} height={Math.abs(p2Y - eq.y)} fill="#3b82f6" fillOpacity={0.25} stroke="none" />
          <text x={(mx + eq1.x) / 2} y={(eq.y + p2Y) / 2 + 4} fill="#2563eb" fontSize={10} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Producer incidence</text>

          {/* Consumer incidence: rectangle between p₁ and p, from axis to q₁ */}
          <rect x={mx} y={eq.y} width={eq1.x - mx} height={eq1.y - eq.y} fill="#ef4444" fillOpacity={0.25} stroke="none" />
          <text x={(mx + eq1.x) / 2} y={(eq.y + eq1.y) / 2 + 4} fill="#dc2626" fontSize={10} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Consumer incidence</text>

          {/* Demand (red) */}
          <GLine {...dL} color="#ef4444" width={2.5} />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D" color="#ef4444" />
          {/* Original supply S (blue) */}
          <GLine {...sL} color="#3b82f6" width={2.5} />
          <Label x={sL.x2 + 4} y={sL.y2 + 4} text="S" color="#3b82f6" />
          {/* S₁ after subsidy (blue) */}
          <GLine {...s1L} color="#3b82f6" width={2.5} />
          <Label x={s1L.x2 + 4} y={s1L.y2 + 4} text="S₁" color="#3b82f6" />

          {/* Shift arrow */}
          <line x1={arrowMidX - 2} y1={arrowFromY} x2={arrowMidX + subsidyShift * 0.4} y2={arrowToY} stroke="#166534" strokeWidth={2.5} markerEnd="url(#arrow-shifted)" />

          {/* p₂ projection */}
          <line x1={mx} y1={p2Y} x2={eq1.x} y2={p2Y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" />
          <text x={mx - 4} y={p2Y + 4} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p₂</text>

          {/* p projection */}
          <line x1={mx} y1={eq.y} x2={eq.x} y2={eq.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" />
          <line x1={eq.x} y1={eq.y} x2={eq.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" />
          <text x={mx - 4} y={eq.y + 4} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p</text>
          <text x={eq.x} y={axBot + 14} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q</text>

          {/* p₁ projection */}
          <line x1={mx} y1={eq1.y} x2={eq1.x} y2={eq1.y} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" />
          <line x1={eq1.x} y1={eq1.y} x2={eq1.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="4 3" />
          <text x={mx - 4} y={eq1.y + 4} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p₁</text>
          <text x={eq1.x} y={axBot + 14} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q₁</text>

          {/* Equilibrium dots */}
          <PremiumDot x={eq.x} y={eq.y} color="#16a34a" label="E₁" tooltipText="✓ Pre-subsidy equilibrium" />
          <PremiumDot x={eq1.x} y={eq1.y} color="#16a34a" label="E₂" tooltipText="✓ Post-subsidy equilibrium" />
        </>
      );
    },
  },

  /* ── PPF ── */
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
      const pad = 10;
      // PPF is a concave curve from top of Y-axis to right of X-axis
      const startX = mx + pad, startY = my + pad + 5;
      const endX = mx + pw - pad - 5, endY = my + ph - pad;
      const cpX = mx + pw * 0.78, cpY = my + ph * 0.10;

      // Point on curve (efficient) — roughly at parameter t≈0.4
      const t = 0.4;
      const effX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
      const effY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * endY;

      return (
        <>
          <CurvePath
            d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`}
            color={COLORS.demand} gradientId="grad-demand" width={3} glow="glow-blue"
          />
          <Label x={mx + pw * 0.60} y={my + 18} text="PPF" color={COLORS.demand} />
          <PremiumDot x={effX} y={effY} color={COLORS.eq} label="A (efficient)" gradientId="dot-green"
            tooltipText="✓ On the frontier = all resources used" />
          <PremiumDot x={mx + pw * 0.32} y={my + ph * 0.55} color={COLORS.shifted} label="B (inefficient)" labelPos="br" gradientId="dot-amber"
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
      const pad = 10;
      return (
        <>
          <CurvePath
            d={`M ${mx + pad} ${my + pad + 15} Q ${mx + pw * 0.68} ${my + ph * 0.08} ${mx + pw * 0.65} ${my + ph - pad}`}
            color={COLORS.demand} gradientId="grad-demand" width={3} glow="glow-blue"
          />
          <Label x={mx + pw * 0.40} y={my + 28} text="PPF₁" color={COLORS.demand} />
          <CurvePath
            d={`M ${mx + pad} ${my + pad + 5} Q ${mx + pw * 0.85} ${my + ph * 0.05} ${mx + pw - pad - 5} ${my + ph - pad}`}
            color={COLORS.shifted} gradientId="grad-shifted" width={3} dashed glow="glow-amber"
          />
          <Label x={mx + pw * 0.62} y={my + 16} text="PPF₂" color={COLORS.shifted} />
          <ShiftArrow x1={mx + pw * 0.46} y1={my + ph * 0.34} x2={mx + pw * 0.56} y2={my + ph * 0.28} color={COLORS.shifted} />
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
      const pad = 10;
      // Shallow downward slope
      const dL = { x1: mx + pad, y1: my + ph * 0.28, x2: mx + pw - pad, y2: my + ph * 0.58 };
      return (
        <>
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 4} y={dL.y2 + 4} text="D (elastic)" color={COLORS.demand} />
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
      const pad = 10;
      // Steep downward slope
      const dL = { x1: mx + pw * 0.36, y1: my + pad, x2: mx + pw * 0.54, y2: my + ph - pad };
      return (
        <>
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 6} y={dL.y2 - 8} text="D (inelastic)" color={COLORS.demand} />
          <DashedToAxes x={mx + pw * 0.40} y={my + ph * 0.30} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <DashedToAxes x={mx + pw * 0.47} y={my + ph * 0.56} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <Label x={mx + pw * 0.50} y={my + ph * 0.80} text="Large ΔP → Small ΔQ" color={COLORS.area} size={10} anchor="middle" bold={false} />
        </>
      );
    },
  },

  /* ── Maximum Price (Price Ceiling) ── */
  price_ceiling: {
    title: "Maximum Price (Price Ceiling)",
    xAxis: "Quantity", yAxis: "Price",
    legend: [
      { label: "Supply (S)", color: COLORS.supply },
      { label: "Demand (D)", color: COLORS.demand },
      { label: "Max price", color: "#111" },
      { label: "Welfare loss", color: "#16a34a" },
    ],
    examTips: [
      "Max price at p₁ below the free market equilibrium",
      "Leads to a shortage of q₁–q₂",
      "Fall in firm revenue and producer surplus",
      "Welfare loss (green area): units q–q₂ would be produced by the free market but are not under the max price",
      "Example: rent controls in Stockholm, Sweden",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const axTop = my + pad;
      const axBot = my + ph - pad;
      const axL = mx + pad;
      const axR = mx + pw - pad;

      // S upward (blue), D downward (red)
      const sL = { x1: axL, y1: axBot, x2: axL + pw * 0.55, y2: axTop };
      const dL = { x1: axL + pw * 0.15, y1: axTop, x2: axR, y2: axBot + 10 };

      // Free-market equilibrium
      const eq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, dL.x1, dL.y1, dL.x2, dL.y2);

      // Max price line at p₁ — below equilibrium
      const pmaxY = eq.y + (axBot - eq.y) * 0.55;

      // Where Pmax intersects S (q₁) and D (q₂)
      const sSlope = (sL.y2 - sL.y1) / (sL.x2 - sL.x1);
      const dSlope = (dL.y2 - dL.y1) / (dL.x2 - dL.x1);
      const q1X = sL.x1 + (pmaxY - sL.y1) / sSlope; // Qs at Pmax
      const q2X = dL.x1 + (pmaxY - dL.y1) / dSlope; // Qd at Pmax

      // Point on S at eq.x (the top of the welfare triangle)
      const sAtEqX = sL.y1 + sSlope * (eq.x - sL.x1);

      // Welfare loss triangle: vertices at (q1X, pmaxY), (eq.x, eq.y), (q2X, pmaxY)
      // But per diagram: triangle between S and D from q1X to q2X through equilibrium
      // Actually from the image: green triangle with vertices at:
      // - where S meets Pmax (q1X, pmaxY)
      // - equilibrium (eq.x, eq.y)  
      // - where D meets Pmax (q2X, pmaxY)
      const welfarePoints = [
        { x: q1X, y: pmaxY },
        { x: eq.x, y: eq.y },
        { x: q2X, y: pmaxY },
      ];

      return (
        <>
          {/* Welfare loss triangle (behind curves) */}
          <WelfareRegion
            points={welfarePoints}
            fill="#16a34a"
            fillOpacity={0.55}
            stroke="#16a34a"
            strokeWidth={0}
            label="Welfare Loss"
            labelSize={7}
          />

          {/* S (BLUE — supply) and D (RED — demand) */}
          <line x1={sL.x1} y1={sL.y1} x2={sL.x2} y2={sL.y2} stroke="#3b82f6" strokeWidth={3} strokeLinecap="round" />
          <Label x={sL.x2 + 4} y={sL.y2 + 12} text="S" color="#3b82f6" />
          <line x1={dL.x1} y1={dL.y1} x2={dL.x2} y2={dL.y2} stroke="#ef4444" strokeWidth={3} strokeLinecap="round" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D" color="#ef4444" />

          {/* Max price horizontal line — bold black */}
          <line
            x1={mx}
            y1={pmaxY}
            x2={axR + 15}
            y2={pmaxY}
            stroke="hsl(var(--foreground))"
            strokeWidth={2.5}
          />
          <text x={axR + 18} y={pmaxY + 4} fill="hsl(var(--foreground))" fontSize={10} fontWeight={600} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Max price</text>

          {/* p label on Y-axis at equilibrium */}
          <line x1={eq.x} y1={eq.y} x2={mx} y2={eq.y} stroke="hsl(var(--foreground))" strokeWidth={1.2} strokeDasharray="5,3" opacity={0.6} />
          <text x={mx - 6} y={eq.y + 4} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p</text>

          {/* p₁ label on Y-axis at max price */}
          <text x={mx - 6} y={pmaxY + 4} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p₁</text>

          {/* q₁ projection (Qs at Pmax) */}
          <line x1={q1X} y1={pmaxY} x2={q1X} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1.5} strokeDasharray="5,3" opacity={0.6} />
          <text x={q1X} y={axBot + 14} fill="hsl(var(--foreground))" fontSize={10} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q₁</text>

          {/* q projection (equilibrium quantity) */}
          <line x1={eq.x} y1={eq.y} x2={eq.x} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1.5} strokeDasharray="5,3" opacity={0.6} />
          <text x={eq.x} y={axBot + 14} fill="hsl(var(--foreground))" fontSize={10} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q</text>

          {/* q₂ projection (Qd at Pmax) */}
          <line x1={q2X} y1={pmaxY} x2={q2X} y2={axBot} stroke="hsl(var(--foreground))" strokeWidth={1.5} strokeDasharray="5,3" opacity={0.6} />
          <text x={q2X} y={axBot + 14} fill="hsl(var(--foreground))" fontSize={10} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q₂</text>

          {/* Excess demand arrow */}
          <line x1={q1X + 2} y1={pmaxY + 15} x2={q2X - 2} y2={pmaxY + 15} stroke="hsl(var(--foreground))" strokeWidth={1.5} markerEnd="url(#arrow-shifted)" markerStart="url(#arrow-shifted)" />
          <Label x={(q1X + q2X) / 2} y={pmaxY + 28} text="Excess demand" color="hsl(var(--foreground))" size={8} anchor="middle" bold={false} />

          {/* Equilibrium dot */}
          <PremiumDot x={eq.x} y={eq.y} color={COLORS.eq} label="E" gradientId="dot-green"
            tooltipText="✓ Free market equilibrium" />
        </>
      );
    },
  },

  /* ── Minimum Price (Price Floor) ── */
  price_floor: {
    title: "Minimum Price (Price Floor)",
    xAxis: "Quantity", yAxis: "Price",
    legend: [
      { label: "Supply (S)", color: COLORS.supply },
      { label: "Demand (D)", color: COLORS.demand },
      { label: "Min price (p₁)", color: "hsl(var(--foreground))" },
      { label: "Welfare Loss", color: "#16a34a" },
    ],
    examTips: [
      "Min price set at p₁, ABOVE free market equilibrium price p",
      "Results in surplus (excess supply) of q₁ − q₂",
      "Welfare loss shown by the green shaded triangle",
      "Label equilibrium (p, q) and quantities at the floor (q₂, q₁)",
      "Example: alcohol minimum unit pricing in Scotland",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const axL = mx;
      const axR = mx + pw;

      // D (downward — red) and S (upward — blue)
      const dL = { x1: mx + pad, y1: my + pad + 10, x2: mx + pw - pad, y2: my + ph - pad };
      const sL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad + 10 };

      // Equilibrium
      const eq = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, sL.x1, sL.y1, sL.x2, sL.y2);

      // Min price line — above equilibrium
      const pminY = eq.y - (eq.y - my - pad) * 0.45;

      // Where Pmin intersects S and D
      const sSlope = (sL.y2 - sL.y1) / (sL.x2 - sL.x1);
      const dSlope = (dL.y2 - dL.y1) / (dL.x2 - dL.x1);
      const q1X = sL.x1 + (pminY - sL.y1) / sSlope; // supply at Pmin (right — q₁)
      const q2X = dL.x1 + (pminY - dL.y1) / dSlope; // demand at Pmin (left — q₂)

      // Welfare loss triangle: vertices at D∩Pmin, equilibrium, S∩Pmin
      const welfarePoints = [
        { x: q2X, y: pminY },
        { x: eq.x, y: eq.y },
        { x: q1X, y: pminY },
      ];

      return (
        <>
          {/* Welfare loss triangle (behind curves) */}
          <WelfareRegion points={welfarePoints} fill="#16a34a" fillOpacity={0.55} label="Welfare Loss" labelSize={7} />

          {/* S curve (BLUE — supply, upward) */}
          <GLine {...sL} color="#3b82f6" gradientId="grad-demand" glow="glow-blue" />
          <Label x={sL.x2 + 4} y={sL.y2 - 6} text="S" color="#3b82f6" />

          {/* D curve (RED — demand, downward) */}
          <GLine {...dL} color="#ef4444" gradientId="grad-supply" glow="glow-red" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D" color="#ef4444" />

          {/* Min price line — bold black */}
          <line
            x1={axL}
            y1={pminY}
            x2={axR + 15}
            y2={pminY}
            stroke="hsl(var(--foreground))"
            strokeWidth={2.5}
          />
          <Label x={axR + 18} y={pminY + 4} text="Min price" color="hsl(var(--foreground))" size={9} />

          {/* p₁ label on Y-axis */}
          <line x1={axL} y1={pminY} x2={axL - 5} y2={pminY} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <text x={axL - 8} y={pminY + 4} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p₁</text>

          {/* Equilibrium p label on Y-axis */}
          <line x1={eq.x} y1={eq.y} x2={axL} y2={eq.y} stroke="hsl(var(--foreground))" strokeWidth={1.2} strokeDasharray="5,3" opacity={0.5} />
          <line x1={axL} y1={eq.y} x2={axL - 5} y2={eq.y} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
          <text x={axL - 8} y={eq.y + 4} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="end" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p</text>

          {/* q₂ projection (demand at Pmin — left) */}
          <line x1={q2X} y1={pminY} x2={q2X} y2={my + ph} stroke="hsl(var(--foreground))" strokeWidth={1.2} strokeDasharray="5,3" opacity={0.5} />
          <text x={q2X} y={my + ph + 14} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q₂</text>

          {/* q projection (equilibrium) */}
          <line x1={eq.x} y1={eq.y} x2={eq.x} y2={my + ph} stroke="hsl(var(--foreground))" strokeWidth={1.2} strokeDasharray="5,3" opacity={0.5} />
          <text x={eq.x} y={my + ph + 14} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q</text>

          {/* q₁ projection (supply at Pmin — right) */}
          <line x1={q1X} y1={pminY} x2={q1X} y2={my + ph} stroke="hsl(var(--foreground))" strokeWidth={1.2} strokeDasharray="5,3" opacity={0.5} />
          <text x={q1X} y={my + ph + 14} fill="hsl(var(--foreground))" fontSize={11} fontWeight={700} textAnchor="middle" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q₁</text>

          {/* Excess supply arrow */}
          <line x1={q2X + 2} y1={pminY - 18} x2={q1X - 2} y2={pminY - 18} stroke="hsl(var(--foreground))" strokeWidth={1.5} markerEnd="url(#arrow-shifted)" markerStart="url(#arrow-shifted)" />
          <Label x={(q2X + q1X) / 2} y={pminY - 26} text="Excess supply" color="hsl(var(--foreground))" size={8} anchor="middle" bold={false} />

          {/* Equilibrium dot */}
          <PremiumDot x={eq.x} y={eq.y} color={COLORS.eq} label="E" gradientId="dot-green"
            tooltipText="✓ Free market equilibrium" />
        </>
      );
    },
  },

  /* ── Monopoly ── */
  monopoly: {
    title: "Monopoly — Business Objectives",
    xAxis: "Output", yAxis: "Revenue / Cost",
    legend: [
      { label: "MC", color: COLORS.demand },
      { label: "ATC", color: COLORS.demand },
      { label: "AR", color: COLORS.supply },
      { label: "MR", color: COLORS.supply },
    ],
    examTips: [
      "Profit max at MC = MR → (q, p)",
      "Revenue max at MR = 0 → (q₁, p₁)",
      "Sales max at AR = ATC → (q₂, p₂)",
      "Price read UP from Q to the AR curve, not MC",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const axBot = my + ph;

      // AR (Demand): red, downward sloping
      const arL = { x1: mx + pad, y1: my + pad + 15, x2: mx + pw - pad, y2: axBot - pad - 10 };
      // MR: red, steeper (same intercept, hits x-axis at ~55% width)
      const mrL = { x1: mx + pad, y1: my + pad + 15, x2: mx + pw * 0.55, y2: axBot - pad - 10 };

      // MC: blue, U-shaped curve rising steeply
      const mcX0 = mx + pw * 0.18, mcY0 = my + ph * 0.58;
      const mcX1 = mx + pw * 0.32, mcY1 = my + ph * 0.72;
      const mcX2 = mx + pw * 0.42, mcY2 = my + ph * 0.52;
      const mcX3 = mx + pw * 0.58, mcY3 = my + pad + 5;
      const mcPath = `M ${mcX0} ${mcY0} Q ${mcX1 - 5} ${mcY1} ${mcX1 + 10} ${mcY1 - 5} Q ${mcX2 - 5} ${mcY2 + 20} ${mcX2} ${mcY2} Q ${mcX2 + 15} ${mcY2 - 25} ${mcX3} ${mcY3}`;

      // ATC: blue, U-shaped, wider & shallower than MC
      const atcX0 = mx + pad + 5, atcY0 = my + pad + 10;
      const atcMidX = mx + pw * 0.48, atcMidY = my + ph * 0.58;
      const atcEndX = mx + pw * 0.78, atcEndY = my + ph * 0.32;
      const atcPath = `M ${atcX0} ${atcY0} Q ${mx + pw * 0.2} ${my + ph * 0.48} ${atcMidX} ${atcMidY} Q ${mx + pw * 0.62} ${atcMidY + 5} ${atcEndX} ${atcEndY}`;

      // === Key points ===
      // Profit max: MC = MR intersection
      const mcMrInt = lineIntersect(
        mcX1 + 10, mcY1 - 5, mcX3, mcY3,
        mrL.x1, mrL.y1, mrL.x2, mrL.y2
      );
      // Price at profit max: read up to AR
      const arSlope = (arL.y2 - arL.y1) / (arL.x2 - arL.x1);
      const profitPriceY = arL.y1 + arSlope * (mcMrInt.x - arL.x1);

      // Revenue max: MR = 0 (MR hits x-axis)
      const revMaxX = mrL.x2;
      const revMaxPriceY = arL.y1 + arSlope * (revMaxX - arL.x1);

      // Sales max: AR = ATC intersection (approximate — use right portion of ATC)
      const salesMaxInt = lineIntersect(
        atcMidX, atcMidY, atcEndX, atcEndY,
        arL.x1, arL.y1, arL.x2, arL.y2
      );

      // ATC cost at profit-max quantity (for supernormal profit region)
      const atcAtQ = (() => {
        // Approximate ATC y at mcMrInt.x using the ATC curve's two segments
        const t = (mcMrInt.x - atcX0) / (atcEndX - atcX0);
        if (t <= 0.5) {
          const tt = t / 0.5;
          return atcY0 + 2 * tt * (1 - tt) * (my + ph * 0.48) + tt * tt * atcMidY - (1 - tt) * (1 - tt) * atcY0 + (1 - tt) * (1 - tt) * atcY0;
        }
        // Simple linear interp on second segment
        const tt = (mcMrInt.x - atcMidX) / (atcEndX - atcMidX);
        return atcMidY + tt * (atcEndY - atcMidY);
      })();

      return (
        <>
          {/* Supernormal Profit bounded region */}
          <rect
            x={mx + 10}
            y={profitPriceY}
            width={mcMrInt.x - mx - 10}
            height={atcAtQ - profitPriceY}
            fill="#22c55e"
            fillOpacity={0.15}
            stroke="#22c55e"
            strokeWidth={1}
            strokeOpacity={0.4}
            strokeDasharray="4 2"
          />
          <text
            x={(mx + 10 + mcMrInt.x) / 2}
            y={(profitPriceY + atcAtQ) / 2 + 3}
            fill="#22c55e"
            fontSize={8}
            fontWeight={700}
            textAnchor="middle"
            opacity={0.9}
          >
            Supernormal Profit
          </text>

          {/* AR (Demand) — red */}
          <GLine {...arL} color={COLORS.supply} width={2.5} />
          <Label x={arL.x2 + 2} y={arL.y2 - 6} text="A" color={COLORS.supply} size={10} />

          {/* MR — red */}
          <GLine {...mrL} color={COLORS.supply} width={2.5} />
          <Label x={mrL.x2 - 4} y={mrL.y2 + 14} text="MR" color={COLORS.supply} size={10} />

          {/* MC — blue curve */}
          <CurvePath d={mcPath} color={COLORS.demand} width={2.5} />
          <Label x={mcX3 - 8} y={mcY3 - 6} text="MC" color={COLORS.demand} size={10} />

          {/* ATC — blue curve */}
          <CurvePath d={atcPath} color={COLORS.demand} width={2.5} />
          <Label x={atcEndX + 4} y={atcEndY + 4} text="ATC" color={COLORS.demand} size={10} />

          {/* Profit max: MC=MR → (q, p) */}
          <DashedToAxes x={mcMrInt.x} y={profitPriceY} mx={mx} ph={ph} my={my} color="currentColor" pLabel="p" qLabel="q" />
          <PremiumDot x={mcMrInt.x} y={profitPriceY} label="Profit Max" tooltipText="Price read from AR at MC=MR quantity" color={COLORS.supply} />
          <PremiumDot x={mcMrInt.x} y={mcMrInt.y} label="MC=MR" tooltipText="Profit maximisation: MC = MR" color={COLORS.demand} />

          {/* Revenue max: MR=0 → (q₁, p₁) */}
          <DashedToAxes x={revMaxX} y={revMaxPriceY} mx={mx} ph={ph} my={my} color="currentColor" pLabel="p₁" qLabel="q₁" />
          <PremiumDot x={revMaxX} y={revMaxPriceY} label="Rev Max" tooltipText="Revenue maximisation: MR = 0" color={COLORS.supply} />

          {/* Sales max: AR=ATC → (q₂, p₂) */}
          <DashedToAxes x={salesMaxInt.x} y={salesMaxInt.y} mx={mx} ph={ph} my={my} color="currentColor" pLabel="p₂" qLabel="q₂" />
          <PremiumDot x={salesMaxInt.x} y={salesMaxInt.y} label="Sales Max" tooltipText="Sales maximisation: AR = ATC (normal profit)" color={COLORS.demand} />
        </>
      );
    },
  },

  /* ── Lorenz Curve (Income Inequality) ── */
  lorenz_curve: {
    title: "Lorenz Curve — Income Distribution",
    xAxis: "Cumulative % of Population", yAxis: "Cumulative % of Income",
    legend: [{ label: "Line of Equality", color: COLORS.lras }, { label: "Lorenz Curve", color: COLORS.demand }, { label: "Gini Area", color: COLORS.area }],
    examTips: [
      "The further the Lorenz curve bows from the 45° line, the greater inequality",
      "Gini coefficient = Area A / (Area A + Area B), range 0 to 1",
      "0 = perfect equality, 1 = perfect inequality",
      "Government redistribution shifts the curve closer to the 45° line",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const x0 = mx + pad, y0 = my + ph - pad;
      const x1 = mx + pw - pad, y1 = my + pad;

      // Line of equality (45° diagonal)
      const eqLine = { x1: x0, y1: y0, x2: x1, y2: y1 };

      // Lorenz curve (bowed below the equality line)
      const lx1 = x0 + pw * 0.25, ly1 = y0 - ph * 0.06;
      const lx2 = x0 + pw * 0.50, ly2 = y0 - ph * 0.18;
      const lx3 = x0 + pw * 0.75, ly3 = y0 - ph * 0.42;
      const lorenzPath = `M ${x0} ${y0} Q ${lx1} ${ly1 + 15} ${lx2} ${ly2 + 20} Q ${lx3 - 10} ${ly3 + 30} ${x1} ${y1}`;

      // Shaded area between curves (simplified polygon)
      const areaPath = `M ${x0} ${y0} L ${x1} ${y1} Q ${lx3 - 10} ${ly3 + 30} ${lx2} ${ly2 + 20} Q ${lx1} ${ly1 + 15} ${x0} ${y0} Z`;

      return (
        <>
          {/* Shaded Gini area */}
          <path d={areaPath} fill={COLORS.area} fillOpacity={0.25} stroke={COLORS.area} strokeWidth={1.5} />

          {/* Line of equality */}
          <GLine {...eqLine} color={COLORS.lras} dashed width={2} />
          <Label x={x1 - 60} y={y1 + 20} text="Line of Equality" color={COLORS.lras} size={9} />

          {/* Lorenz curve */}
          <CurvePath d={lorenzPath} color={COLORS.demand} gradientId="grad-demand" width={3} glow="glow-blue" />
          <Label x={lx2 - 20} y={ly2 + 42} text="Lorenz Curve" color={COLORS.demand} size={9} />

          {/* Labels */}
          <Label x={(x0 + x1) / 2 - 10} y={(y0 + y1) / 2 - 10} text="A" color={COLORS.area} size={14} anchor="middle" bg={false} />
          <Label x={(x0 + x1) / 2 + 20} y={(y0 + y1) / 2 + 40} text="B" color={COLORS.demand} size={14} anchor="middle" bg={false} />
        </>
      );
    },
  },

  /* ── Oligopoly Payoff Matrix (Game Theory) ── */
  oligopoly_payoff: {
    title: "Prisoner's Dilemma — Oligopoly Payoff Matrix",
    xAxis: "", yAxis: "",
    legend: [{ label: "Firm A", color: COLORS.demand }, { label: "Firm B", color: COLORS.supply }],
    examTips: [
      "Dominant strategy: both firms have incentive to cheat (lower price)",
      "Nash equilibrium: both cheat — worst combined outcome",
      "Collusion (both high price) is Pareto optimal but unstable",
      "Key evaluation: repeated games, regulation, and trust can sustain collusion",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const cx = mx + pw * 0.5, cy = my + ph * 0.5;
      const cellW = pw * 0.32, cellH = ph * 0.30;
      const gapX = cellW + 8, gapY = cellH + 8;
      const startX = cx - gapX / 2 - cellW / 2 + 10;
      const startY = cy - gapY / 2 - cellH / 2 + 15;

      const cells = [
        { r: 0, c: 0, a: "£8m", b: "£8m", bg: "#16a34a20", border: "#16a34a" },
        { r: 0, c: 1, a: "£2m", b: "£12m", bg: "#f59e0b15", border: "#f59e0b" },
        { r: 1, c: 0, a: "£12m", b: "£2m", bg: "#f59e0b15", border: "#f59e0b" },
        { r: 1, c: 1, a: "£5m", b: "£5m", bg: "#ef444420", border: "#ef4444" },
      ];

      const rowLabels = ["High Price", "Low Price"];
      const colLabels = ["High Price", "Low Price"];

      return (
        <>
          {/* Column header: Firm B */}
          <text x={cx + 10} y={startY - 22} fill={COLORS.supply} fontSize="12" fontWeight="700" textAnchor="middle"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Firm B</text>
          {colLabels.map((label, ci) => (
            <text key={`col${ci}`} x={startX + ci * gapX + cellW / 2} y={startY - 6} fill="currentColor" fontSize="9" fontWeight="600" textAnchor="middle"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{label}</text>
          ))}
          {/* Row header: Firm A */}
          <text x={startX - 30} y={cy + 5} fill={COLORS.demand} fontSize="12" fontWeight="700" textAnchor="middle"
            transform={`rotate(-90, ${startX - 30}, ${cy + 5})`}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Firm A</text>
          {rowLabels.map((label, ri) => (
            <text key={`row${ri}`} x={startX - 8} y={startY + ri * gapY + cellH / 2 + 4} fill="currentColor" fontSize="9" fontWeight="600" textAnchor="end"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{label}</text>
          ))}

          {/* Cells */}
          {cells.map(({ r, c, a, b, bg, border }) => {
            const x = startX + c * gapX;
            const y = startY + r * gapY;
            return (
              <g key={`${r}${c}`}>
                <rect x={x} y={y} width={cellW} height={cellH} rx={6} fill={bg} stroke={border} strokeWidth="1.5" />
                {/* Diagonal line to separate A and B payoffs */}
                <line x1={x} y1={y + cellH} x2={x + cellW} y2={y} stroke={border} strokeWidth="0.5" opacity="0.3" />
                {/* Firm A payoff (top-left) */}
                <text x={x + cellW * 0.3} y={y + cellH * 0.4} fill={COLORS.demand} fontSize="11" fontWeight="700" textAnchor="middle"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{a}</text>
                {/* Firm B payoff (bottom-right) */}
                <text x={x + cellW * 0.7} y={y + cellH * 0.72} fill={COLORS.supply} fontSize="11" fontWeight="700" textAnchor="middle"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{b}</text>
              </g>
            );
          })}

          {/* Nash equilibrium indicator */}
          <text x={startX + gapX + cellW / 2} y={startY + gapY + cellH + 18} fill={COLORS.shifted} fontSize="9" fontWeight="700" textAnchor="middle"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            ★ Nash Equilibrium (Both Low Price)
          </text>
        </>
      );
    },
  },

  /* ── Short-Run Cost Curves (MC, ATC, AVC) ── */
  cost_curves: {
    title: "Short-Run Cost Curves (MC, ATC, AVC)",
    xAxis: "Output (Q)", yAxis: "Costs (£)",
    legend: [{ label: "MC", color: COLORS.supply }, { label: "ATC", color: COLORS.demand }, { label: "AVC", color: COLORS.shifted }],
    examTips: [
      "MC crosses ATC and AVC at their minimum points",
      "ATC = AVC + AFC — the gap is AFC which falls as output rises",
      "When MC < ATC, ATC is falling; when MC > ATC, ATC is rising",
      "Shutdown point: P = min AVC (short run)",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const cx = mx + pw * 0.45;
      // U-shaped ATC
      const atcPath = `M ${mx + pad + 20} ${my + pad + 20} Q ${cx - 15} ${my + ph * 0.72} ${mx + pw - pad - 10} ${my + pad + 30}`;
      // U-shaped AVC (below ATC, converging at high output)
      const avcPath = `M ${mx + pad + 25} ${my + pad + 60} Q ${cx - 5} ${my + ph * 0.78} ${mx + pw - pad - 10} ${my + pad + 50}`;
      // MC (steep U-shape, crossing both at their minima)
      const mcPath = `M ${mx + pad + 35} ${my + ph - pad - 30} Q ${cx - 30} ${my + ph * 0.82} ${cx - 10} ${my + ph * 0.65} Q ${cx + 20} ${my + ph * 0.38} ${mx + pw - pad - 15} ${my + pad}`;

      return (
        <>
          <CurvePath d={mcPath} color={COLORS.supply} gradientId="grad-supply" width={3} glow="glow-red" />
          <Label x={mx + pw - pad - 5} y={my + pad + 8} text="MC" color={COLORS.supply} />
          <CurvePath d={atcPath} color={COLORS.demand} gradientId="grad-demand" width={2.5} glow="glow-blue" />
          <Label x={mx + pw - pad} y={my + pad + 40} text="ATC" color={COLORS.demand} />
          <CurvePath d={avcPath} color={COLORS.shifted} gradientId="grad-shifted" width={2} />
          <Label x={mx + pw - pad} y={my + pad + 58} text="AVC" color={COLORS.shifted} />
          {/* AFC indication */}
          <GLine x1={mx + pad + 30} y1={my + pad + 25} x2={mx + pad + 30} y2={my + pad + 64} color={COLORS.lras} dashed width={1} />
          <Label x={mx + pad + 34} y={my + pad + 48} text="AFC" color={COLORS.lras} size={8} />
        </>
      );
    },
  },

  /* ── Long-Run Average Cost (LRAC with Economies of Scale) ── */
  lrac: {
    title: "Long-Run Average Cost Curve",
    xAxis: "Output (Q)", yAxis: "Long-Run Average Cost (£)",
    legend: [{ label: "LRAC", color: COLORS.demand }, { label: "Economies", color: COLORS.eq }, { label: "Diseconomies", color: COLORS.supply }],
    examTips: [
      "Economies of scale: LRAC falls as output increases (Section A)",
      "Constant returns: flat section = minimum efficient scale (Section B)",
      "Diseconomies of scale: LRAC rises as firm becomes too large (Section C)",
      "MES = minimum efficient scale — output where LRAC first reaches minimum",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      // U-shaped LRAC — wide bottom for constant returns section
      const lracPath = `M ${mx + pad + 10} ${my + pad + 10} Q ${mx + pw * 0.22} ${my + ph * 0.75} ${mx + pw * 0.38} ${my + ph * 0.68} L ${mx + pw * 0.58} ${my + ph * 0.68} Q ${mx + pw * 0.78} ${my + ph * 0.68} ${mx + pw - pad - 10} ${my + pad + 20}`;

      // Section labels with brackets
      const secAx = mx + pw * 0.22, secBx = mx + pw * 0.48, secCx = mx + pw * 0.75;
      const botY = my + ph - pad - 8;

      return (
        <>
          <CurvePath d={lracPath} color={COLORS.demand} gradientId="grad-demand" width={3} glow="glow-blue" />
          <Label x={mx + pw - pad} y={my + pad + 28} text="LRAC" color={COLORS.demand} />
          {/* Section markers */}
          <rect x={mx + pad + 5} y={botY - 2} width={mx + pw * 0.36 - mx - pad - 5} height={16} rx={4} fill={COLORS.eq} fillOpacity={0.08} />
          <text x={secAx} y={botY + 10} textAnchor="middle" fontSize={8} fontWeight={600} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Economies of Scale</text>
          <rect x={mx + pw * 0.36} y={botY - 2} width={pw * 0.24} height={16} rx={4} fill={COLORS.lras} fillOpacity={0.08} />
          <text x={secBx} y={botY + 10} textAnchor="middle" fontSize={8} fontWeight={600} fill={COLORS.lras}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Constant Returns</text>
          <rect x={mx + pw * 0.60} y={botY - 2} width={pw * 0.36} height={16} rx={4} fill={COLORS.supply} fillOpacity={0.08} />
          <text x={secCx} y={botY + 10} textAnchor="middle" fontSize={8} fontWeight={600} fill={COLORS.supply}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Diseconomies of Scale</text>
          {/* MES dotted line */}
          <line x1={mx + pw * 0.38} y1={my + ph * 0.68} x2={mx + pw * 0.38} y2={my + ph - pad} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={mx + pw * 0.38} y={my + ph - 2} textAnchor="middle" fontSize={8} fontWeight={700} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>MES</text>
        </>
      );
    },
  },

  /* ── Monopolistic Competition (Long-Run Normal Profit) ── */
  monopolistic_competition: {
    title: "Monopolistic Competition — Long-Run Equilibrium",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Revenue",
    legend: [{ label: "MC", color: COLORS.supply }, { label: "AR = D", color: COLORS.demand }, { label: "MR", color: COLORS.mpb }, { label: "AC tangent", color: COLORS.lras }],
    examTips: [
      "Long-run: AR tangent to AC — normal profit only",
      "Excess capacity: firm produces LEFT of min AC (not productively efficient)",
      "P > MC so NOT allocatively efficient either",
      "Short-run supernormal profit attracts entry → demand curve shifts left",
    ],
    render: () => <></>,  // Rendering handled by MonopolisticCompetitionDiagram via customComponent
  },

  /* ── Keynesian AS — Spare Capacity vs Full Capacity (2 panels) ── */
  keynesian_as: {
    title: "Keynesian AS — Spare Capacity vs Full Employment",
    xAxis: "", yAxis: "",
    legend: [
      { label: "AS", color: COLORS.supply },
      { label: "LRAS", color: COLORS.lras },
      { label: "AD", color: COLORS.demand },
    ],
    examTips: [
      "Spare capacity: AD increase raises real output with little/no inflation",
      "Full capacity: AD increase only raises price level (demand-pull inflation)",
      "Keynesian AS is L-shaped: horizontal then vertical at Yfe",
      "Growth occurs in spare-capacity region; inflation at full employment",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const halfW = pw / 2;
      const gap = 18;
      const pad = 8;

      // ── Panel origins ──
      const p1x = mx;
      const p2x = mx + halfW + gap / 2;
      const axTop = my + 18;
      const axBot = my + ph - 18;
      const axH = axBot - axTop;
      const panelW = halfW - gap / 2;

      // ── Helper: draw axes for a panel ──
      const panelAxes = (ox: number, w: number, yLabel: string, xLabel: string) => (
        <>
          <line x1={ox + pad} y1={axTop} x2={ox + pad} y2={axBot} stroke="currentColor" strokeWidth={1.8} />
          <line x1={ox + pad} y1={axBot} x2={ox + w - pad} y2={axBot} stroke="currentColor" strokeWidth={1.8} />
          <text x={ox + pad - 3} y={axTop - 4} textAnchor="middle" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{yLabel}</text>
          <text x={ox + w - pad} y={axBot + 14} textAnchor="end" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{xLabel}</text>
          <text x={ox + pad - 2} y={axBot + 5} textAnchor="middle" fontSize={7} fontWeight={600} fill="currentColor" opacity={0.5}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>O</text>
        </>
      );

      // ══════════════════════════════════════
      // LEFT PANEL — Spare Capacity (Growth)
      // ══════════════════════════════════════
      const L = p1x + pad;
      const R1 = p1x + panelW - pad;
      const yfe1 = L + (R1 - L) * 0.72;
      const flatY = axTop + axH * 0.62;

      // Keynesian AS: horizontal → curve up → vertical at Yfe
      const kasPath1 = `M ${L + 5} ${flatY} L ${L + (R1 - L) * 0.38} ${flatY} Q ${L + (R1 - L) * 0.55} ${flatY - 8} ${yfe1} ${axTop + axH * 0.2} L ${yfe1} ${axTop + 4}`;

      // AD₁ (original — intersects in flat region)
      const ad1_x1 = L + 8;
      const ad1_y1 = axTop + axH * 0.12;
      const ad1_x2 = L + (R1 - L) * 0.32;
      const ad1_y2 = axBot - 4;
      // AD₂ (shifted right — still in spare capacity but further)
      const ad2_x1 = L + (R1 - L) * 0.12;
      const ad2_y1 = axTop + axH * 0.08;
      const ad2_x2 = L + (R1 - L) * 0.48;
      const ad2_y2 = axBot - 4;

      // Q outputs where AD hits flat section
      const q1x = L + (R1 - L) * 0.18;
      const q2x = L + (R1 - L) * 0.34;

      // Shift arrows
      const arrowMidY = axTop + axH * 0.45;

      // ══════════════════════════════════════
      // RIGHT PANEL — Full Capacity (Inflation)
      // ══════════════════════════════════════
      const L2 = p2x + pad;
      const R2 = p2x + panelW - pad;
      const yfe2 = L2 + (R2 - L2) * 0.48;

      // LRAS vertical at Yfe
      // AD (original)
      const rAd_x1 = L2 + (R2 - L2) * 0.2;
      const rAd_y1 = axTop + axH * 0.05;
      const rAd_x2 = R2 - 8;
      const rAd_y2 = axBot - 4;
      // AD₁ shifted right
      const rAd1_x1 = L2 + (R2 - L2) * 0.35;
      const rAd1_y1 = axTop + axH * 0.02;
      const rAd1_x2 = R2 + 4;
      const rAd1_y2 = axBot - 14;

      // Where AD intersects LRAS (vertical x = yfe2)
      const adSlope = (rAd_y2 - rAd_y1) / (rAd_x2 - rAd_x1);
      const pY = rAd_y1 + adSlope * (yfe2 - rAd_x1);
      const ad1Slope = (rAd1_y2 - rAd1_y1) / (rAd1_x2 - rAd1_x1);
      const p1Y = rAd1_y1 + ad1Slope * (yfe2 - rAd1_x1);

      return (
        <>
          {/* ── Panel titles ── */}
          <rect x={p1x + panelW * 0.15} y={my} width={panelW * 0.7} height={15} rx={3} fill={COLORS.lras} opacity={0.15} />
          <text x={p1x + panelW * 0.5} y={my + 11} textAnchor="middle" fontSize={9} fontWeight={700} fill={COLORS.lras}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Spare Capacity</text>
          <rect x={p2x + panelW * 0.15} y={my} width={panelW * 0.7} height={15} rx={3} fill={COLORS.supply} opacity={0.15} />
          <text x={p2x + panelW * 0.5} y={my + 11} textAnchor="middle" fontSize={9} fontWeight={700} fill={COLORS.supply}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Full Capacity</text>

          {/* ── LEFT PANEL axes ── */}
          {panelAxes(p1x, panelW, "Price\nLevel", "Real Output")}

          {/* Keynesian AS curve */}
          <CurvePath d={kasPath1} color={COLORS.supply} width={2.5} />
          <Label x={yfe1 + 4} y={axTop + 6} text="AS" color={COLORS.supply} size={9} />

          {/* AD₁ and AD₂ */}
          <GLine x1={ad1_x1} y1={ad1_y1} x2={ad1_x2} y2={ad1_y2} color={COLORS.demand} width={1.8} />
          <Label x={ad1_x1 - 1} y={ad1_y1 - 3} text="AD" color={COLORS.demand} size={8} />
          <GLine x1={ad2_x1} y1={ad2_y1} x2={ad2_x2} y2={ad2_y2} color={COLORS.demand} width={2} />
          <Label x={ad2_x1 + 4} y={ad2_y1 - 3} text="AD₁" color={COLORS.demand} size={8} />

          {/* Shift arrow */}
          <line x1={L + (R1 - L) * 0.18} y1={arrowMidY} x2={L + (R1 - L) * 0.28} y2={arrowMidY}
            stroke={COLORS.demand} strokeWidth={1.5} markerEnd="url(#arrowHead)" opacity={0.7} />

          {/* P horizontal dashed */}
          <line x1={L + pad} y1={flatY} x2={q2x} y2={flatY} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={L + pad - 2} y={flatY + 3} textAnchor="end" fontSize={8} fontWeight={600} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>P</text>

          {/* Q projections */}
          <line x1={q1x} y1={flatY} x2={q1x} y2={axBot} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={q1x} y={axBot + 12} textAnchor="middle" fontSize={7.5} fontWeight={600} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Y</text>
          <line x1={q2x} y1={flatY} x2={q2x} y2={axBot} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={q2x} y={axBot + 12} textAnchor="middle" fontSize={7.5} fontWeight={600} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Y₁</text>

          {/* Equilibrium dots */}
          <PremiumDot x={q1x} y={flatY} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial output in spare capacity" />
          <PremiumDot x={q2x} y={flatY} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ Higher output, same price level" />

          {/* Yfe tick */}
          <line x1={yfe1} y1={axBot} x2={yfe1} y2={axBot + 5} stroke="currentColor" strokeWidth={1} opacity={0.4} />
          <text x={yfe1} y={axBot + 14} textAnchor="middle" fontSize={7.5} fontWeight={600} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Yꜰₑ</text>

          {/* Growth badge */}
          <rect x={p1x + panelW * 0.25} y={axBot + 20} width={panelW * 0.5} height={14} rx={4} fill={COLORS.eq} opacity={0.18} />
          <text x={p1x + panelW * 0.5} y={axBot + 30} textAnchor="middle" fontSize={8} fontWeight={700} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Growth</text>

          {/* ── RIGHT PANEL axes ── */}
          {panelAxes(p2x, panelW, "Price\nLevel", "Real Output")}

          {/* LRAS vertical */}
          <line x1={yfe2} y1={axTop + 4} x2={yfe2} y2={axBot - 4} stroke={COLORS.lras} strokeWidth={2.5} />
          <Label x={yfe2 + 3} y={axTop + 4} text="LRAS" color={COLORS.lras} size={9} />

          {/* AD and AD₁ */}
          <GLine x1={rAd_x1} y1={rAd_y1} x2={rAd_x2} y2={rAd_y2} color={COLORS.demand} width={1.8} />
          <Label x={rAd_x2 + 1} y={rAd_y2 - 3} text="AD" color={COLORS.demand} size={8} />
          <GLine x1={rAd1_x1} y1={rAd1_y1} x2={rAd1_x2} y2={rAd1_y2} color={COLORS.demand} width={2} />
          <Label x={rAd1_x2 + 1} y={rAd1_y2 - 3} text="AD₁" color={COLORS.demand} size={8} />

          {/* Shift arrow */}
          <line x1={L2 + (R2 - L2) * 0.55} y1={axTop + axH * 0.55} x2={L2 + (R2 - L2) * 0.65} y2={axTop + axH * 0.55}
            stroke={COLORS.demand} strokeWidth={1.5} markerEnd="url(#arrowHead)" opacity={0.7} />

          {/* P and P₁ projections */}
          <line x1={L2 + pad} y1={pY} x2={yfe2} y2={pY} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={L2 + pad - 2} y={pY + 3} textAnchor="end" fontSize={8} fontWeight={600} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>P</text>
          <line x1={L2 + pad} y1={p1Y} x2={yfe2} y2={p1Y} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={L2 + pad - 2} y={p1Y + 3} textAnchor="end" fontSize={8} fontWeight={600} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>P₁</text>

          {/* Yfe tick */}
          <line x1={yfe2} y1={axBot} x2={yfe2} y2={axBot + 5} stroke="currentColor" strokeWidth={1} opacity={0.4} />
          <text x={yfe2} y={axBot + 14} textAnchor="middle" fontSize={7.5} fontWeight={600} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Yꜰₑ</text>

          {/* Equilibrium dots */}
          <PremiumDot x={yfe2} y={pY} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium at Yfe" />
          <PremiumDot x={yfe2} y={p1Y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ Higher PL, same output (inflation)" />

          {/* Inflation badge */}
          <rect x={p2x + panelW * 0.2} y={axBot + 20} width={panelW * 0.6} height={14} rx={4} fill={COLORS.supply} opacity={0.18} />
          <text x={p2x + panelW * 0.5} y={axBot + 30} textAnchor="middle" fontSize={8} fontWeight={700} fill={COLORS.supply}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Inflation</text>
        </>
      );
    },
  },

  /* ── Trade with Quota ── */
  trade_quota: {
    title: "Effect of an Import Quota",
    xAxis: "Quantity (Q)", yAxis: "Price (£)",
    legend: [{ label: "S (Domestic)", color: COLORS.supply }, { label: "S (World)", color: COLORS.eq }, { label: "S+Quota", color: COLORS.shifted }, { label: "Demand", color: COLORS.demand }],
    examTips: [
      "World supply (Sw) is perfectly elastic at world price Pw",
      "Quota restricts imports → S+Quota kinked above Sw",
      "Price rises from Pw to Pq, domestic output rises, imports fall",
      "Deadweight loss: areas between domestic S and D from Pw to Pq",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      // Domestic supply: upward sloping
      const dsL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad + 30 };
      // World supply: horizontal
      const pwY = my + ph * 0.62;
      // Quota supply: horizontal at higher price then follows domestic S
      const pqY = my + ph * 0.45;
      // Demand: downward
      const dL = { x1: mx + pad + 10, y1: my + pad, x2: mx + pw - pad - 10, y2: my + ph - pad };

      // Intersections
      const dsSlopeLong = (dsL.y2 - dsL.y1) / (dsL.x2 - dsL.x1);
      const dsAtPw = mx + pad + (pwY - (my + ph - pad)) / dsSlopeLong;
      const dsAtPq = mx + pad + (pqY - (my + ph - pad)) / dsSlopeLong;
      const dSlope = (dL.y2 - dL.y1) / (dL.x2 - dL.x1);
      const dAtPw = dL.x1 + (pwY - dL.y1) / dSlope;
      const dAtPq = dL.x1 + (pqY - dL.y1) / dSlope;

      return (
        <>
          {/* Domestic supply */}
          <GLine {...dsL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={dsL.x2 + 2} y={dsL.y2 + 4} text="S (Dom.)" color={COLORS.supply} size={9} />
          {/* World supply */}
          <GLine x1={mx + pad} y1={pwY} x2={mx + pw - pad} y2={pwY} color={COLORS.eq} width={2} />
          <Label x={mx + pw - pad + 2} y={pwY - 4} text="Sw" color={COLORS.eq} size={9} />
          {/* Quota supply — kinked: horizontal at Pq from dsAtPq to a quota limit, then follows */}
          <GLine x1={mx + pad} y1={pqY} x2={dAtPq} y2={pqY} color={COLORS.shifted} dashed width={2} />
          <Label x={dAtPq + 4} y={pqY - 4} text="Sw+Quota" color={COLORS.shifted} size={9} />
          {/* Demand */}
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D" color={COLORS.demand} />
          {/* Imports bracket at Pw */}
          <line x1={dsAtPw} y1={pwY + 8} x2={dAtPw} y2={pwY + 8} stroke={COLORS.area} strokeWidth={1.5} />
          <Label x={(dsAtPw + dAtPw) / 2} y={pwY + 22} text="Imports (no quota)" color={COLORS.area} size={7} anchor="middle" bold={false} />
          {/* Price labels */}
          <text x={mx - 2} y={pwY + 4} textAnchor="end" fontSize={8} fontWeight={700} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Pw</text>
          <text x={mx - 2} y={pqY + 4} textAnchor="end" fontSize={8} fontWeight={700} fill={COLORS.shifted}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Pq</text>
        </>
      );
    },
  },

  /* ── Short-Run Shutdown Point ── */
  short_run_shutdown: {
    title: "Short-Run Shutdown Point (P = min AVC)",
    xAxis: "Output (Q)", yAxis: "Price / Cost (£)",
    legend: [{ label: "MC", color: COLORS.supply }, { label: "ATC", color: COLORS.demand }, { label: "AVC", color: COLORS.shifted }, { label: "AR = MR", color: COLORS.eq }],
    examTips: [
      "Shutdown condition: AR < AVC (price below min AVC)",
      "At shutdown point: P = min AVC — firm just covers variable costs",
      "Below this price, losses exceed total fixed costs",
      "Different from long-run shutdown: AR < AC",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      // ATC U-shape
      const atcPath = `M ${mx + pad + 20} ${my + pad + 10} Q ${mx + pw * 0.42} ${my + ph * 0.60} ${mx + pw - pad - 10} ${my + pad + 20}`;
      // AVC U-shape (below ATC)
      const avcMinY = my + ph * 0.65;
      const avcMinX = mx + pw * 0.40;
      const avcPath = `M ${mx + pad + 25} ${my + pad + 50} Q ${avcMinX - 5} ${avcMinY + 6} ${avcMinX} ${avcMinY} Q ${avcMinX + 30} ${avcMinY - 8} ${mx + pw - pad - 10} ${my + pad + 40}`;
      // MC steep U-shape
      const mcPath = `M ${mx + pad + 35} ${my + ph - pad - 20} Q ${mx + pw * 0.32} ${my + ph * 0.72} ${mx + pw * 0.38} ${avcMinY} Q ${mx + pw * 0.48} ${my + ph * 0.32} ${mx + pw - pad - 15} ${my + pad}`;
      // AR = MR at shutdown price (horizontal at min AVC)
      return (
        <>
          <CurvePath d={mcPath} color={COLORS.supply} gradientId="grad-supply" width={2.5} glow="glow-red" />
          <Label x={mx + pw - pad - 5} y={my + pad + 8} text="MC" color={COLORS.supply} />
          <CurvePath d={atcPath} color={COLORS.demand} gradientId="grad-demand" width={2} />
          <Label x={mx + pw - pad} y={my + pad + 28} text="ATC" color={COLORS.demand} />
          <CurvePath d={avcPath} color={COLORS.shifted} gradientId="grad-shifted" width={2} />
          <Label x={mx + pw - pad} y={my + pad + 48} text="AVC" color={COLORS.shifted} />
          {/* AR = MR at shutdown price */}
          <GLine x1={mx + pad} y1={avcMinY} x2={mx + pw - pad} y2={avcMinY} color={COLORS.eq} width={1.5} dashed />
          <Label x={mx + pw - pad + 2} y={avcMinY - 4} text="AR = MR" color={COLORS.eq} size={9} />
          {/* Shutdown point */}
          <PremiumDot x={avcMinX} y={avcMinY} color={COLORS.supply} label="Shutdown Point" gradientId="dot-green"
            tooltipText="✓ P = min AVC — firm just covers variable costs" />
          <DashedToAxes x={avcMinX} y={avcMinY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="Ps" qLabel="Qs" />
        </>
      );
    },
  },

  /* ── Perfect Competition — Short-Run & Long-Run ── */
  perfect_competition: {
    title: "Perfect Competition — Industry & Firm",
    xAxis: "Quantity", yAxis: "Price / Cost",
    legend: [
      { label: "D (Demand)", color: "#3b82f6" },
      { label: "S₁ (Original)", color: "#f97316" },
      { label: "S₂ (Shifted)", color: "#ef4444" },
      { label: "MC", color: "#f97316" },
      { label: "ATC", color: "#3b82f6" },
    ],
    examTips: [
      "Short run: P > ATC → supernormal profit attracts new firms",
      "Long run: entry shifts S right → P falls to min ATC → normal profit",
      "AR = MR = P = min ATC in long run (allocative + productive efficiency)",
      "Key: In perfect competition, firms are price takers",
    ],
    render: () => <></>,  // Rendering handled by PerfectCompDiagram via customComponent
  },

  /* ── Labour Market — Wage Determination (Industry + Firm) ── */
  labour_market: {
    title: "Labour Market — Wage Determination (Competitive)",
    xAxis: "Quantity of Workers", yAxis: "Wage Rate",
    legend: [
      { label: "S (Industry)", color: COLORS.supply },
      { label: "D = MRP", color: COLORS.demand },
      { label: "SL = ACL = MCL", color: COLORS.eq },
    ],
    examTips: [
      "Industry: wage set where D(MRP) = S of labour → W₁",
      "Firm is a wage-taker: SL = ACL = MCL is perfectly elastic at W₁",
      "Firm hires where D(MRP) = MCL to maximise profit",
      "MRP = MPP × MR — demand for labour is a derived demand",
      "Draw BOTH industry and firm diagrams side by side for full marks",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const gap = 16;
      const halfW = (pw - gap) / 2;
      const fullH = ph;
      const pad = 6;

      // Panel origins
      const p1x = mx, p1y = my;                      // Left: Industry
      const p2x = mx + halfW + gap, p2y = my;        // Right: Firm

      const panelTitle = (x: number, y: number, text: string) => (
        <text x={x + halfW / 2} y={y - 3} textAnchor="middle" fontSize={9} fontWeight={800}
          fill="currentColor" opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{text}</text>
      );

      const miniAxes = (ox: number, oy: number, xLbl: string, yLbl: string) => (
        <>
          <line x1={ox} y1={oy} x2={ox} y2={oy + fullH} stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
          <line x1={ox} y1={oy + fullH} x2={ox + halfW} y2={oy + fullH} stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
          <text x={ox - 8} y={oy + fullH / 2} textAnchor="middle" fontSize={7} fontWeight={600}
            transform={`rotate(-90 ${ox - 8} ${oy + fullH / 2})`} fill="currentColor" opacity={0.5}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{yLbl}</text>
          <text x={ox + halfW / 2} y={oy + fullH + 14} textAnchor="middle" fontSize={7} fontWeight={600}
            fill="currentColor" opacity={0.5} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{xLbl}</text>
        </>
      );

      // ═══ PANEL 1: Industry — S & D=MRP ═══
      const sL = { x1: p1x + pad, y1: p1y + fullH - pad, x2: p1x + halfW - pad, y2: p1y + pad };
      const dL = { x1: p1x + pad, y1: p1y + pad, x2: p1x + halfW - pad, y2: p1y + fullH - pad };
      const eq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, dL.x1, dL.y1, dL.x2, dL.y2);
      const wageY = eq.y;

      // ═══ PANEL 2: Firm — D=MRP curve (hill shape) + SL=ACL=MCL horizontal ═══
      const mrpPeakX = p2x + halfW * 0.35;
      const mrpPeakY = p2y + fullH * 0.15;
      const mrpEndX = p2x + halfW - pad - 5;
      const mrpEndY = p2y + fullH - pad - 10;
      const mrpPath = `M ${p2x + pad + 5} ${p2y + fullH * 0.55} Q ${mrpPeakX - 10} ${mrpPeakY - 5} ${mrpPeakX} ${mrpPeakY} Q ${mrpPeakX + 30} ${mrpPeakY + 15} ${p2x + halfW * 0.6} ${wageY + 15} Q ${p2x + halfW * 0.78} ${wageY + 40} ${mrpEndX} ${mrpEndY}`;

      // Firm hires where MRP = W₁ (on the downward part of MRP curve)
      const firmQ1X = p2x + halfW * 0.58;

      return (
        <>
          {/* ── Panel 1: Industry ── */}
          {panelTitle(p1x, p1y, "Industry")}
          {miniAxes(p1x, p1y, "Quantity of workers", "Wage rate")}
          <GLine {...sL} color={COLORS.supply} width={2} />
          <Label x={sL.x2 + 2} y={sL.y2 + 2} text="S" color={COLORS.supply} size={9} />
          <GLine {...dL} color={COLORS.demand} width={2} />
          <Label x={dL.x2 + 2} y={dL.y2 - 6} text="D=MRP" color={COLORS.demand} size={9} />
          <PremiumDot x={eq.x} y={eq.y} color={COLORS.eq} label="E" gradientId="dot-green"
            tooltipText="✓ Wage W₁ set by D=S" />
          {/* W₁ and Q₁ projections — red dashed like reference */}
          <line x1={p1x} y1={wageY} x2={eq.x} y2={wageY} stroke="#ef4444" strokeWidth={0.8} strokeDasharray="2,1.5" opacity={0.7} />
          <line x1={eq.x} y1={wageY} x2={eq.x} y2={p1y + fullH} stroke="#ef4444" strokeWidth={0.8} strokeDasharray="2,1.5" opacity={0.7} />
          <text x={p1x - 3} y={wageY + 3} textAnchor="end" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>W₁</text>
          <text x={eq.x} y={p1y + fullH + 12} textAnchor="middle" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Q₁</text>

          {/* ── Panel 2: Firm ── */}
          {panelTitle(p2x, p2y, "Firm")}
          {miniAxes(p2x, p2y, "Quantity of workers", "Wage rate")}
          {/* SL = ACL = MCL horizontal at W₁ */}
          <GLine x1={p2x + pad} y1={wageY} x2={p2x + halfW - pad} y2={wageY} color={COLORS.eq} width={2} />
          <Label x={p2x + halfW - pad + 2} y={wageY - 3} text="SL=ACL=MCL" color={COLORS.eq} size={7} />
          <text x={p2x - 3} y={wageY + 3} textAnchor="end" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>W₁</text>
          {/* D = MRP curve (inverted U / hill shape) */}
          <CurvePath d={mrpPath} color={COLORS.demand} width={2.5} />
          <Label x={mrpEndX + 2} y={mrpEndY - 4} text="D=MRP" color={COLORS.demand} size={9} />
          {/* Firm Q₁ projection */}
          <line x1={firmQ1X} y1={wageY} x2={firmQ1X} y2={p2y + fullH} stroke="#ef4444" strokeWidth={0.8} strokeDasharray="2,1.5" opacity={0.7} />
          <PremiumDot x={firmQ1X} y={wageY} color={COLORS.eq} label="Hire" gradientId="dot-green"
            tooltipText="✓ Firm hires where MRP=W₁" />
          <text x={firmQ1X} y={p2y + fullH + 12} textAnchor="middle" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Q₁</text>
        </>
      );
    },
  },

  /* ── LRAS Shift Right ── */
  lras_shift: {
    title: "LRAS Shift Right — Long-Run Growth", xAxis: "Real GDP", yAxis: "Price Level",
    legend: [{ label: "LRAS", color: COLORS.lras }, { label: "LRAS₁", color: COLORS.eq }, { label: "AD", color: COLORS.demand }],
    examTips: ["LRAS shifts right due to productivity/technology improvements", "Higher real GDP and lower price level", "Distinguish from SRAS shift — LRAS = full capacity"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const lrasX = mx + pw * 0.4; const lras1X = mx + pw * 0.65; const ad = { x1: mx + 10, y1: my + 15, x2: mx + pw - 10, y2: axBot - 15 }; const s = (ad.y2 - ad.y1) / (ad.x2 - ad.x1); const eq1Y = ad.y1 + s * (lrasX - ad.x1); const eq2Y = ad.y1 + s * (lras1X - ad.x1); return (<><GLine x1={lrasX} y1={my + 5} x2={lrasX} y2={axBot - 5} color={COLORS.lras} width={2.5} /><Label x={lrasX + 4} y={my + 14} text="LRAS" color={COLORS.lras} size={10} /><GLine x1={lras1X} y1={my + 5} x2={lras1X} y2={axBot - 5} color={COLORS.eq} width={2.5} /><Label x={lras1X + 4} y={my + 14} text="LRAS₁" color={COLORS.eq} size={10} /><GLine {...ad} color={COLORS.demand} width={2.5} /><Label x={ad.x2 + 2} y={ad.y2 - 4} text="AD" color={COLORS.demand} size={10} /><ShiftArrow x1={lrasX + 8} y1={my + ph * 0.5} x2={lras1X - 8} y2={my + ph * 0.5} color={COLORS.shifted} /><DashedToAxes x={lrasX} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.lras} pLabel="PL" qLabel="Y" /><DashedToAxes x={lras1X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" /><PremiumDot x={lrasX} y={eq1Y} color={COLORS.lras} label="E" labelPos="tl" /><PremiumDot x={lras1X} y={eq2Y} color={COLORS.eq} label="E₁" labelPos="tr" /></>); },
  },

  /* ── Tariff ── */
  tariff: {
    title: "Tariff — Impact on Imports & Welfare", xAxis: "Quantity", yAxis: "Price",
    legend: [{ label: "Domestic S", color: COLORS.supply }, { label: "World Supply", color: COLORS.eq }, { label: "World S + Tariff", color: COLORS.shifted }, { label: "DWL", color: COLORS.area }],
    examTips: ["World supply is perfectly elastic", "Tariff shifts world supply upward", "Two DWL triangles + tariff revenue rectangle", "Imports fall from (Q₃−Q₁) to (Q₄−Q₂)"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const ds = { x1: mx + 10, y1: axBot - 15, x2: mx + pw * 0.75, y2: my + 15 }; const dd = { x1: mx + pw * 0.25, y1: my + 15, x2: mx + pw - 10, y2: axBot - 15 }; const wsY = my + ph * 0.65; const wtY = my + ph * 0.45; const q1X = ds.x1 + ((wsY - ds.y1) / (ds.y2 - ds.y1)) * (ds.x2 - ds.x1); const q2X = ds.x1 + ((wtY - ds.y1) / (ds.y2 - ds.y1)) * (ds.x2 - ds.x1); const q3X = dd.x1 + ((wsY - dd.y1) / (dd.y2 - dd.y1)) * (dd.x2 - dd.x1); const q4X = dd.x1 + ((wtY - dd.y1) / (dd.y2 - dd.y1)) * (dd.x2 - dd.x1); return (<><GLine {...ds} color={COLORS.supply} width={2.5} /><Label x={ds.x2 + 2} y={ds.y2 + 12} text="S (Domestic)" color={COLORS.supply} size={9} /><GLine {...dd} color={COLORS.demand} width={2.5} /><Label x={dd.x2 + 2} y={dd.y2 - 4} text="D" color={COLORS.demand} size={9} /><GLine x1={mx + 5} y1={wsY} x2={mx + pw - 5} y2={wsY} color={COLORS.eq} width={2} /><Label x={mx + pw - 5} y={wsY - 6} text="World Supply" color={COLORS.eq} size={8} anchor="end" /><GLine x1={mx + 5} y1={wtY} x2={mx + pw - 5} y2={wtY} color={COLORS.shifted} width={2} /><Label x={mx + pw - 5} y={wtY - 6} text="World S+Tariff" color={COLORS.shifted} size={8} anchor="end" /><WelfareRegion points={[{ x: q1X, y: wsY }, { x: q2X, y: wtY }, { x: q2X, y: wsY }]} fill={COLORS.area} fillOpacity={0.3} strokeWidth={1.5} label="DWL" /><WelfareRegion points={[{ x: q4X, y: wtY }, { x: q3X, y: wsY }, { x: q4X, y: wsY }]} fill={COLORS.area} fillOpacity={0.3} strokeWidth={1.5} label="DWL" /><rect x={q2X} y={wtY} width={q4X - q2X} height={wsY - wtY} fill={COLORS.shifted} fillOpacity={0.15} stroke={COLORS.shifted} strokeWidth={1} /><text x={(q2X + q4X) / 2} y={(wtY + wsY) / 2 + 3} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.shifted} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Tariff Rev.</text>{[{ x: q1X, l: "Q₁" }, { x: q2X, l: "Q₂" }, { x: q3X, l: "Q₃" }, { x: q4X, l: "Q₄" }].map((q, i) => (<g key={i}><line x1={q.x} y1={wsY} x2={q.x} y2={axBot} stroke="currentColor" strokeWidth={0.6} strokeDasharray="2,2" opacity={0.3} /><text x={q.x} y={axBot + 12} textAnchor="middle" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{q.l}</text></g>))}<text x={mx - 3} y={wsY + 3} textAnchor="end" fontSize={8} fontWeight={600} fill={COLORS.eq} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Pw</text><text x={mx - 3} y={wtY + 3} textAnchor="end" fontSize={8} fontWeight={600} fill={COLORS.shifted} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Pw+T</text></>); },
  },

  /* ── Laffer Curve ── */
  laffer_curve: {
    title: "Laffer Curve — Tax Rate vs Tax Revenue", xAxis: "Tax Rate (%)", yAxis: "Tax Revenue",
    legend: [{ label: "Laffer Curve", color: COLORS.demand }, { label: "t*", color: COLORS.eq }],
    examTips: ["At 0% and 100% tax rates, revenue is zero", "Peak = revenue-maximising rate (t*)", "Beyond t*, higher rates reduce revenue", "Justifies supply-side tax cuts"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const peakX = mx + pw * 0.5; const peakY = my + ph * 0.15; const d = `M ${mx + 5} ${axBot - 5} Q ${mx + pw * 0.25} ${my + ph * 0.1} ${peakX} ${peakY} Q ${mx + pw * 0.75} ${my + ph * 0.1} ${mx + pw - 5} ${axBot - 5}`; return (<><CurvePath d={d} color={COLORS.demand} width={3} /><PremiumDot x={peakX} y={peakY} color={COLORS.eq} label="t*" labelPos="tr" tooltipText="Revenue-maximising rate" /><line x1={peakX} y1={peakY} x2={peakX} y2={axBot} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} /><line x1={mx} y1={peakY} x2={peakX} y2={peakY} stroke={COLORS.eq} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} /><text x={peakX} y={axBot + 12} textAnchor="middle" fontSize={9} fontWeight={700} fill={COLORS.eq} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>t*</text><text x={mx + 8} y={axBot + 12} textAnchor="middle" fontSize={8} fontWeight={600} fill="currentColor" opacity={0.5} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>0%</text><text x={mx + pw - 8} y={axBot + 12} textAnchor="middle" fontSize={8} fontWeight={600} fill="currentColor" opacity={0.5} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>100%</text><text x={mx + pw * 0.25} y={my + ph * 0.55} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.eq} opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>↑ Revenue</text><text x={mx + pw * 0.75} y={my + ph * 0.55} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.supply} opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>↓ Revenue</text></>); },
  },

  /* ── Multiplier Effect ── */
  multiplier_effect: {
    title: "AD Shift with Multiplier Effect", xAxis: "Real GDP", yAxis: "Price Level",
    legend: [{ label: "AS", color: COLORS.supply }, { label: "AD → AD₂", color: COLORS.demand }, { label: "Multiplier", color: COLORS.shifted }],
    examTips: ["Initial G↑ shifts AD right", "Multiplier causes second larger shift", "Final GDP increase > initial injection", "Multiplier = 1/(1−MPC)"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const as1 = { x1: mx + 10, y1: axBot - 15, x2: mx + pw - 10, y2: my + 15 }; const ad0 = { x1: mx + 10, y1: my + 20, x2: mx + pw * 0.55, y2: axBot - 15 }; const s2 = pw * 0.30; const ad2 = { x1: ad0.x1 + s2, y1: ad0.y1, x2: ad0.x2 + s2, y2: ad0.y2 }; const eq0 = lineIntersect(as1.x1, as1.y1, as1.x2, as1.y2, ad0.x1, ad0.y1, ad0.x2, ad0.y2); const eq2 = lineIntersect(as1.x1, as1.y1, as1.x2, as1.y2, ad2.x1, ad2.y1, ad2.x2, ad2.y2); return (<><GLine {...as1} color={COLORS.supply} width={2.5} /><Label x={as1.x2 + 2} y={as1.y2 + 12} text="AS" color={COLORS.supply} size={10} /><GLine {...ad0} color={COLORS.demand} width={2.5} /><Label x={ad0.x2 + 2} y={ad0.y2 - 4} text="AD" color={COLORS.demand} size={10} /><GLine {...ad2} color={COLORS.shifted} width={2.5} /><Label x={ad2.x2 + 2} y={ad2.y2 - 4} text="AD₂" color={COLORS.shifted} size={10} /><ShiftArrow x1={eq0.x + 6} y1={eq0.y - 3} x2={eq2.x - 10} y2={eq2.y - 8} color={COLORS.shifted} /><text x={(eq0.x + eq2.x) / 2} y={Math.min(eq0.y, eq2.y) - 14} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.shifted} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Multiplier</text><DashedToAxes x={eq0.x} y={eq0.y} mx={mx} ph={ph} my={my} color={COLORS.lras} pLabel="PL" qLabel="Y" /><DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" /><PremiumDot x={eq0.x} y={eq0.y} color={COLORS.lras} label="E" labelPos="tl" /><PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" labelPos="tr" /></>); },
  },

  /* ── Exchange Rate ── */
  exchange_rate: {
    title: "Currency Market — Exchange Rate", xAxis: "Quantity of £", yAxis: "Exchange Rate ($/£)",
    legend: [{ label: "S£", color: COLORS.supply }, { label: "D£", color: COLORS.demand }, { label: "S£₁", color: COLORS.shifted }],
    examTips: ["D for £ = foreigners buying UK exports", "S of £ = UK residents buying imports", "S shifts right → £ depreciates", "D shifts right → £ appreciates"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const s1 = { x1: mx + 10, y1: axBot - 15, x2: mx + pw - 10, y2: my + 15 }; const d1 = { x1: mx + 10, y1: my + 15, x2: mx + pw - 10, y2: axBot - 15 }; const eq = lineIntersect(s1.x1, s1.y1, s1.x2, s1.y2, d1.x1, d1.y1, d1.x2, d1.y2); const shift = pw * 0.18; const s2 = { x1: s1.x1 + shift, y1: s1.y1, x2: s1.x2 + shift, y2: s1.y2 }; const eq2 = lineIntersect(s2.x1, s2.y1, s2.x2, s2.y2, d1.x1, d1.y1, d1.x2, d1.y2); return (<><GLine {...s1} color={COLORS.supply} width={2.5} /><Label x={s1.x2 + 2} y={s1.y2 + 12} text="S£" color={COLORS.supply} size={10} /><GLine {...s2} color={COLORS.shifted} width={2} dashed /><Label x={s2.x2 + 2} y={s2.y2 + 12} text="S£₁" color={COLORS.shifted} size={10} /><GLine {...d1} color={COLORS.demand} width={2.5} /><Label x={d1.x2 + 2} y={d1.y2 - 4} text="D£" color={COLORS.demand} size={10} /><ShiftArrow x1={eq.x + 6} y1={eq.y + 3} x2={eq2.x - 6} y2={eq2.y + 3} color={COLORS.shifted} /><DashedToAxes x={eq.x} y={eq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="e₁" qLabel="Q₁" /><DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="e₂" qLabel="Q₂" /><PremiumDot x={eq.x} y={eq.y} color={COLORS.eq} label="E" labelPos="tl" /><PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₁" labelPos="tr" tooltipText="£ depreciates" /></>); },
  },

  /* ── J-Curve ── */
  j_curve: {
    title: "J-Curve — Net Exports after Depreciation", xAxis: "Time", yAxis: "Net Exports (X−M)",
    legend: [{ label: "J-Curve", color: COLORS.demand }, { label: "Depreciation", color: COLORS.supply }],
    examTips: ["Initially worsens trade balance", "Short run: inelastic demand", "Long run: Marshall-Lerner holds → improvement", "|PEDx| + |PEDm| > 1"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const zeroY = my + ph * 0.45; const depX = mx + pw * 0.2; const troughX = mx + pw * 0.45; const troughY = my + ph * 0.78; const endX = mx + pw - 10; const endY = my + ph * 0.15; const d = `M ${mx + 10} ${zeroY} L ${depX} ${zeroY} Q ${depX + 15} ${zeroY + 5} ${mx + pw * 0.32} ${troughY - 10} Q ${troughX - 5} ${troughY + 5} ${troughX} ${troughY} Q ${troughX + 20} ${troughY - 5} ${mx + pw * 0.65} ${zeroY} Q ${mx + pw * 0.8} ${my + ph * 0.25} ${endX} ${endY}`; return (<><line x1={mx} y1={zeroY} x2={mx + pw} y2={zeroY} stroke="currentColor" strokeWidth={0.8} strokeDasharray="4,3" opacity={0.3} /><text x={mx + pw + 2} y={zeroY + 3} fontSize={7} fontWeight={600} fill="currentColor" opacity={0.4} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>0</text><CurvePath d={d} color={COLORS.demand} width={3} /><line x1={depX} y1={my} x2={depX} y2={axBot} stroke={COLORS.supply} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} /><PremiumDot x={depX} y={zeroY} color={COLORS.supply} label="" labelPos="tl" /><text x={depX} y={axBot + 12} textAnchor="middle" fontSize={8} fontWeight={700} fill={COLORS.supply} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Depreciation</text><PremiumDot x={troughX} y={troughY} color={COLORS.demand} label="Trough" labelPos="br" /><text x={(depX + troughX) / 2} y={my + 16} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.supply} opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Short Run</text><text x={(mx + pw * 0.65 + endX) / 2} y={my + 16} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.eq} opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Long Run</text></>); },
  },

  /* ── Crowding Out ── */
  crowding_out: {
    title: "Crowding Out", xAxis: "Quantity of loanable funds", yAxis: "Interest Rate",
    legend: [{ label: "D (Private)", color: COLORS.demand }, { label: "D (Priv+Pub)", color: COLORS.shifted }, { label: "S", color: COLORS.supply }],
    examTips: ["Higher G raises demand for funds", "Interest rate rises r→r₁", "Private spending falls (read off original D)", "Reduces fiscal multiplier"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const s1 = { x1: mx + 10, y1: axBot - 15, x2: mx + pw - 10, y2: my + 15 }; const d1 = { x1: mx + 10, y1: my + 20, x2: mx + pw * 0.55, y2: axBot - 15 }; const shift = pw * 0.2; const d2 = { x1: d1.x1 + shift, y1: d1.y1, x2: d1.x2 + shift, y2: d1.y2 }; const eq1 = lineIntersect(s1.x1, s1.y1, s1.x2, s1.y2, d1.x1, d1.y1, d1.x2, d1.y2); const eq2 = lineIntersect(s1.x1, s1.y1, s1.x2, s1.y2, d2.x1, d2.y1, d2.x2, d2.y2); const privX = d1.x1 + ((eq2.y - d1.y1) / (d1.y2 - d1.y1)) * (d1.x2 - d1.x1); return (<><GLine {...s1} color={COLORS.supply} width={2.5} /><Label x={s1.x2 + 2} y={s1.y2 + 12} text="S" color={COLORS.supply} size={10} /><GLine {...d1} color={COLORS.demand} width={2.5} /><Label x={d1.x2 + 2} y={d1.y2 - 4} text="D (Private)" color={COLORS.demand} size={8} /><GLine {...d2} color={COLORS.shifted} width={2.5} /><Label x={d2.x2 + 2} y={d2.y2 - 4} text="D (Priv+Pub)" color={COLORS.shifted} size={8} /><ShiftArrow x1={(d1.x1 + d1.x2) / 2} y1={(d1.y1 + d1.y2) / 2} x2={(d2.x1 + d2.x2) / 2} y2={(d2.y1 + d2.y2) / 2} color={COLORS.shifted} /><DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.demand} pLabel="r" qLabel="Q" /><PremiumDot x={eq1.x} y={eq1.y} color={COLORS.demand} label="E" labelPos="tl" /><DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="r₁" qLabel="Q₁" /><PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₁" labelPos="tr" /><line x1={privX} y1={eq2.y} x2={privX} y2={axBot} stroke={COLORS.supply} strokeWidth={0.8} strokeDasharray="2,2" opacity={0.5} /><text x={privX} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.supply} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Q₂</text><line x1={privX} y1={axBot + 18} x2={eq1.x} y2={axBot + 18} stroke={COLORS.supply} strokeWidth={1.5} opacity={0.6} /><text x={(privX + eq1.x) / 2} y={axBot + 28} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.supply} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Crowded out</text></>); },
  },

  /* ── Kinked Demand ── */
  kinked_demand: {
    title: "Oligopoly — Kinked Demand Curve", xAxis: "Output", yAxis: "Price / Revenue / Cost",
    legend: [{ label: "AR (kinked)", color: COLORS.demand }, { label: "MR", color: COLORS.area }, { label: "MC", color: COLORS.supply }],
    examTips: ["Above p*: elastic — rivals don't follow rises", "Below p*: inelastic — rivals match cuts", "MR gap at kink → price rigidity", "MC can shift within gap without changing price"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const kX = mx + pw * 0.45; const kY = my + ph * 0.4; return (<><CurvePath d={`M ${mx + 15} ${my + 15} L ${kX} ${kY}`} color={COLORS.demand} width={2.5} /><CurvePath d={`M ${kX} ${kY} L ${mx + pw - 15} ${axBot - 30}`} color={COLORS.demand} width={2.5} /><Label x={mx + pw - 12} y={axBot - 26} text="AR=D" color={COLORS.demand} size={9} /><CurvePath d={`M ${mx + 15} ${my + 40} L ${kX - 3} ${kY + 5}`} color={COLORS.area} width={2} /><CurvePath d={`M ${kX + 3} ${my + ph * 0.7} L ${mx + pw * 0.6} ${axBot - 15}`} color={COLORS.area} width={2} /><Label x={mx + pw * 0.62} y={axBot - 12} text="MR" color={COLORS.area} size={9} /><line x1={kX} y1={kY + 5} x2={kX} y2={my + ph * 0.7} stroke={COLORS.area} strokeWidth={1.5} strokeDasharray="3,2" opacity={0.6} /><CurvePath d={`M ${mx + pw * 0.15} ${axBot - 20} Q ${mx + pw * 0.3} ${my + ph * 0.45} ${mx + pw * 0.55} ${my + 15}`} color={COLORS.supply} width={2.5} /><Label x={mx + pw * 0.57} y={my + 12} text="MC" color={COLORS.supply} size={9} /><PremiumDot x={kX} y={kY} color={COLORS.eq} label="Kink" labelPos="tr" tooltipText="Price rigidity at p*" /><DashedToAxes x={kX} y={kY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="p*" qLabel="q*" /><text x={mx + pw * 0.18} y={my + ph * 0.2} fontSize={7} fontWeight={600} fill={COLORS.demand} opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Elastic</text><text x={mx + pw * 0.7} y={my + ph * 0.7} fontSize={7} fontWeight={600} fill={COLORS.demand} opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Inelastic</text></>); },
  },

  /* ── Natural Monopoly ── */
  natural_monopoly: {
    title: "Natural Monopoly — Significant EoS", xAxis: "Output", yAxis: "Revenue / Cost",
    legend: [{ label: "LRATC", color: COLORS.supply }, { label: "LRMC", color: COLORS.shifted }, { label: "AR / MR", color: COLORS.demand }],
    examTips: ["LRATC continuously falling", "MR=LRMC → output q, price p", "SNP = (p−c)×q", "Splitting would raise prices"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const qX = mx + pw * 0.38; const priceY = my + ph * 0.32; const costY = my + ph * 0.52; return (<><CurvePath d={`M ${mx + 20} ${my + 15} Q ${mx + pw * 0.3} ${my + ph * 0.45} ${mx + pw * 0.55} ${my + ph * 0.6} Q ${mx + pw * 0.75} ${my + ph * 0.7} ${mx + pw - 10} ${my + ph * 0.72}`} color={COLORS.supply} width={2.5} /><Label x={mx + pw - 8} y={my + ph * 0.69} text="LRATC" color={COLORS.supply} size={9} /><CurvePath d={`M ${mx + 20} ${my + 30} Q ${mx + pw * 0.3} ${my + ph * 0.55} ${mx + pw * 0.55} ${my + ph * 0.7} Q ${mx + pw * 0.75} ${my + ph * 0.78} ${mx + pw - 10} ${my + ph * 0.8}`} color={COLORS.shifted} width={2} /><Label x={mx + pw - 8} y={my + ph * 0.78} text="LRMC" color={COLORS.shifted} size={9} /><GLine x1={mx + 10} y1={my + 15} x2={mx + pw - 10} y2={axBot - 15} color={COLORS.demand} width={2.5} /><Label x={mx + pw - 8} y={axBot - 12} text="AR" color={COLORS.demand} size={10} /><GLine x1={mx + 10} y1={my + 15} x2={mx + pw * 0.55} y2={axBot - 15} color={COLORS.area} width={2} /><Label x={mx + pw * 0.57} y={axBot - 12} text="MR" color={COLORS.area} size={10} /><WelfareRegion points={[{ x: mx, y: priceY }, { x: qX, y: priceY }, { x: qX, y: costY }, { x: mx, y: costY }]} fill={COLORS.eq} fillOpacity={0.2} strokeWidth={1.5} label="SNP" /><DashedToAxes x={qX} y={priceY} mx={mx} ph={ph} my={my} color={COLORS.demand} pLabel="p" qLabel="q" /><line x1={mx} y1={costY} x2={qX} y2={costY} stroke={COLORS.supply} strokeWidth={0.8} strokeDasharray="2,2" opacity={0.5} /><text x={mx - 3} y={costY + 3} textAnchor="end" fontSize={8} fontWeight={600} fill={COLORS.supply} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>c</text><PremiumDot x={qX} y={priceY} color={COLORS.demand} label="A" labelPos="tr" /></>); },
  },

  /* ── Monopsony ── */
  monopsony: {
    title: "Monopsony — Dominant Employer", xAxis: "Quantity of Labour", yAxis: "Wage / Costs",
    legend: [{ label: "S=ACL", color: COLORS.supply }, { label: "MCL", color: COLORS.shifted }, { label: "D=MRPL", color: COLORS.demand }, { label: "WL", color: COLORS.eq }],
    examTips: ["Hires where MCL=MRPL → Q₁", "Wage on ACL at W₁ < competitive W", "Min wage can increase employment", "MCL steeper than ACL"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const acl = { x1: mx + 10, y1: axBot - 15, x2: mx + pw - 10, y2: my + ph * 0.25 }; const mcl = { x1: mx + 10, y1: axBot - 15, x2: mx + pw * 0.65, y2: my + 10 }; const mrpl = { x1: mx + 10, y1: my + 15, x2: mx + pw - 10, y2: axBot - 15 }; const eqMon = lineIntersect(mcl.x1, mcl.y1, mcl.x2, mcl.y2, mrpl.x1, mrpl.y1, mrpl.x2, mrpl.y2); const eqComp = lineIntersect(acl.x1, acl.y1, acl.x2, acl.y2, mrpl.x1, mrpl.y1, mrpl.x2, mrpl.y2); const t = (eqMon.x - acl.x1) / (acl.x2 - acl.x1); const monWY = acl.y1 + t * (acl.y2 - acl.y1); return (<><GLine {...acl} color={COLORS.supply} width={2.5} /><Label x={acl.x2 + 2} y={acl.y2 + 2} text="S=ACL" color={COLORS.supply} size={9} /><GLine {...mcl} color={COLORS.shifted} width={2.5} /><Label x={mcl.x2 + 2} y={mcl.y2 + 2} text="MCL" color={COLORS.shifted} size={9} /><GLine {...mrpl} color={COLORS.demand} width={2.5} /><Label x={mrpl.x2 + 2} y={mrpl.y2 - 4} text="D=MRPL" color={COLORS.demand} size={9} /><WelfareRegion points={[{ x: eqMon.x, y: monWY }, { x: eqComp.x, y: eqComp.y }, { x: eqMon.x, y: eqMon.y }]} fill={COLORS.eq} fillOpacity={0.25} strokeWidth={2} label="WL" /><PremiumDot x={eqComp.x} y={eqComp.y} color={COLORS.eq} label="Competitive" labelPos="tr" /><DashedToAxes x={eqComp.x} y={eqComp.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="W" qLabel="Q" /><PremiumDot x={eqMon.x} y={monWY} color={COLORS.shifted} label="Monopsony" labelPos="bl" /><DashedToAxes x={eqMon.x} y={monWY} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="W₁" qLabel="Q₁" /></>); },
  },

  /* ── Pollution Permits ── */
  pollution_permits: {
    title: "Pollution Permits — Tradeable Emissions", xAxis: "Quantity of Permits", yAxis: "Price of Permits",
    legend: [{ label: "S (fixed)", color: COLORS.supply }, { label: "S₁ (reduced)", color: COLORS.shifted }, { label: "D", color: COLORS.demand }],
    examTips: ["Supply perfectly inelastic — set by govt", "Reducing permits → S left → higher price", "Market-based incentive to cut emissions", "Firms trade permits — low-cost sell to high-cost"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const s1X = mx + pw * 0.55; const s2X = mx + pw * 0.35; const d1 = { x1: mx + 10, y1: my + 15, x2: mx + pw - 10, y2: axBot - 15 }; const sl = (d1.y2 - d1.y1) / (d1.x2 - d1.x1); const eq1Y = d1.y1 + sl * (s1X - d1.x1); const eq2Y = d1.y1 + sl * (s2X - d1.x1); return (<><GLine x1={s1X} y1={my + 5} x2={s1X} y2={axBot - 5} color={COLORS.supply} width={2.5} /><Label x={s1X + 4} y={my + 14} text="S" color={COLORS.supply} size={10} /><GLine x1={s2X} y1={my + 5} x2={s2X} y2={axBot - 5} color={COLORS.shifted} width={2.5} /><Label x={s2X + 4} y={my + 14} text="S₁" color={COLORS.shifted} size={10} /><GLine {...d1} color={COLORS.demand} width={2.5} /><Label x={d1.x2 + 2} y={d1.y2 - 4} text="D" color={COLORS.demand} size={10} /><ShiftArrow x1={s1X - 5} y1={my + ph * 0.5} x2={s2X + 8} y2={my + ph * 0.5} color={COLORS.shifted} /><DashedToAxes x={s1X} y={eq1Y} mx={mx} ph={ph} my={my} color={COLORS.supply} pLabel="p" qLabel="q" /><DashedToAxes x={s2X} y={eq2Y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="p₁" qLabel="q₁" /><PremiumDot x={s1X} y={eq1Y} color={COLORS.supply} label="E" labelPos="tr" /><PremiumDot x={s2X} y={eq2Y} color={COLORS.shifted} label="E₁" labelPos="tl" /></>); },
  },

  /* ── Tax on Externality ── */
  tax_externality: {
    title: "Tax to Correct Negative Externality", xAxis: "Quantity", yAxis: "Benefit / Cost / Price",
    legend: [{ label: "MSC", color: COLORS.msc }, { label: "MPC", color: COLORS.mpc }, { label: "MPC+Tax", color: COLORS.shifted }, { label: "MPB=MSB", color: COLORS.msb }],
    examTips: ["Tax shifts MPC up to MPC+Tax = MSC", "Quantity falls from q to q₁ (socially optimal)", "Firms internalise the externality", "Welfare gain = triangle ABE"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const msc = { x1: mx + 10, y1: axBot - 25, x2: mx + pw - 10, y2: my + 10 }; const mpc = { x1: mx + 10, y1: axBot - 10, x2: mx + pw - 10, y2: my + ph * 0.3 }; const msb = { x1: mx + 10, y1: my + 15, x2: mx + pw - 10, y2: axBot - 15 }; const eqF = lineIntersect(mpc.x1, mpc.y1, mpc.x2, mpc.y2, msb.x1, msb.y1, msb.x2, msb.y2); const eqO = lineIntersect(msc.x1, msc.y1, msc.x2, msc.y2, msb.x1, msb.y1, msb.x2, msb.y2); const tA = (eqF.x - msc.x1) / (msc.x2 - msc.x1); const aY = msc.y1 + tA * (msc.y2 - msc.y1); return (<><GLine {...msc} color={COLORS.msc} width={2.5} /><Label x={msc.x2 + 2} y={msc.y2 + 12} text="MSC" color={COLORS.msc} size={10} /><GLine {...mpc} color={COLORS.mpc} width={2} /><Label x={mpc.x2 + 2} y={mpc.y2 + 2} text="MPC" color={COLORS.mpc} size={9} /><GLine {...msc} color={COLORS.shifted} width={2} dashed /><Label x={msc.x2 + 2} y={msc.y2 + 24} text="MPC+Tax" color={COLORS.shifted} size={8} /><GLine {...msb} color={COLORS.msb} width={2.5} /><Label x={msb.x2 + 2} y={msb.y2 - 4} text="MPB=MSB" color={COLORS.msb} size={9} /><WelfareRegion points={[{ x: eqF.x, y: aY }, { x: eqO.x, y: eqO.y }, { x: eqF.x, y: eqF.y }]} fill={COLORS.eq} fillOpacity={0.3} strokeWidth={2} label="Gain" /><DashedToAxes x={eqF.x} y={eqF.y} mx={mx} ph={ph} my={my} color={COLORS.mpc} pLabel="" qLabel="q" /><DashedToAxes x={eqO.x} y={eqO.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="" qLabel="q₁" /><PremiumDot x={eqF.x} y={eqF.y} color={COLORS.mpc} label="E" labelPos="br" /><PremiumDot x={eqO.x} y={eqO.y} color={COLORS.eq} label="B" labelPos="tl" /><PremiumDot x={eqF.x} y={aY} color={COLORS.msc} label="A" labelPos="tr" /></>); },
  },

  /* ── Subsidy on Positive Externality ── */
  subsidy_externality: {
    title: "Subsidy to Correct Positive Externality", xAxis: "Quantity", yAxis: "Benefit / Cost / Price",
    legend: [{ label: "MSC=MPC", color: COLORS.msc }, { label: "MPB", color: COLORS.mpb }, { label: "MSB", color: COLORS.msb }],
    examTips: ["Subsidy shifts MPC right → quantity increases to q₁", "Moves from free market to socially optimal", "Eliminates welfare loss ABE", "Examples: education, healthcare subsidies"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const mpc = { x1: mx + 10, y1: axBot - 15, x2: mx + pw - 10, y2: my + 15 }; const mpb = { x1: mx + 10, y1: my + 20, x2: mx + pw * 0.6, y2: axBot - 15 }; const shift = pw * 0.15; const msb = { x1: mpb.x1 + shift, y1: mpb.y1, x2: mpb.x2 + shift, y2: mpb.y2 }; const eqF = lineIntersect(mpc.x1, mpc.y1, mpc.x2, mpc.y2, mpb.x1, mpb.y1, mpb.x2, mpb.y2); const eqO = lineIntersect(mpc.x1, mpc.y1, mpc.x2, mpc.y2, msb.x1, msb.y1, msb.x2, msb.y2); const tF = (eqF.x - msb.x1) / (msb.x2 - msb.x1); const msbAtFY = msb.y1 + tF * (msb.y2 - msb.y1); return (<><GLine {...mpc} color={COLORS.msc} width={2.5} /><Label x={mpc.x2 + 2} y={mpc.y2 + 12} text="MSC=MPC" color={COLORS.msc} size={9} /><GLine {...mpb} color={COLORS.mpb} width={2.5} /><Label x={mpb.x2 + 2} y={mpb.y2 - 4} text="MPB" color={COLORS.mpb} size={10} /><GLine {...msb} color={COLORS.msb} width={2.5} /><Label x={msb.x2 + 2} y={msb.y2 - 4} text="MSB" color={COLORS.msb} size={10} /><WelfareRegion points={[{ x: eqF.x, y: eqF.y }, { x: eqO.x, y: eqO.y }, { x: eqF.x, y: msbAtFY }]} fill={COLORS.eq} fillOpacity={0.3} strokeWidth={2} label="Gain" /><DashedToAxes x={eqF.x} y={eqF.y} mx={mx} ph={ph} my={my} color={COLORS.mpb} pLabel="" qLabel="q" /><DashedToAxes x={eqO.x} y={eqO.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="" qLabel="q₁" /><PremiumDot x={eqF.x} y={eqF.y} color={COLORS.mpb} label="E" labelPos="tl" /><PremiumDot x={eqO.x} y={eqO.y} color={COLORS.eq} label="B" labelPos="tr" /></>); },
  },

  /* ── Comparative Advantage ── */
  comparative_advantage: {
    title: "Comparative Advantage — PPFs & Gains from Trade", xAxis: "Good X", yAxis: "Good Y",
    legend: [{ label: "Country A", color: COLORS.demand }, { label: "Country B", color: COLORS.supply }, { label: "After trade", color: COLORS.eq }],
    examTips: ["Compare opportunity costs for CPA", "Each specialises in lower OC good", "Both consume beyond domestic PPF after trade", "Show points A, B (specialisation) and C (consumption)"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const gap = 16; const hW = (pw - gap) / 2; const p1x = mx; const p2x = mx + hW + gap; return (<><line x1={p1x} y1={my} x2={p1x} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><line x1={p1x} y1={axBot} x2={p1x + hW} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><line x1={p2x} y1={my} x2={p2x} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><line x1={p2x} y1={axBot} x2={p2x + hW} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><text x={p1x + hW / 2} y={my - 5} textAnchor="middle" fontSize={9} fontWeight={800} fill="currentColor" opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Country A</text><text x={p2x + hW / 2} y={my - 5} textAnchor="middle" fontSize={9} fontWeight={800} fill="currentColor" opacity={0.7} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Country B</text><CurvePath d={`M ${p1x + 5} ${my + 10} Q ${p1x + hW * 0.2} ${my + ph * 0.35} ${p1x + hW * 0.45} ${my + ph * 0.6} Q ${p1x + hW * 0.7} ${my + ph * 0.82} ${p1x + hW - 5} ${axBot - 5}`} color={COLORS.demand} width={2.5} /><CurvePath d={`M ${p2x + 5} ${my + ph * 0.35} Q ${p2x + hW * 0.3} ${my + ph * 0.55} ${p2x + hW * 0.55} ${my + ph * 0.75} Q ${p2x + hW * 0.8} ${my + ph * 0.9} ${p2x + hW - 5} ${axBot - 5}`} color={COLORS.supply} width={2.5} /><PremiumDot x={p1x + hW * 0.15} y={my + ph * 0.15} color={COLORS.demand} label="A" labelPos="tr" tooltipText="Specialise in Good Y" /><PremiumDot x={p2x + hW * 0.8} y={axBot - ph * 0.12} color={COLORS.supply} label="B" labelPos="tl" tooltipText="Specialise in Good X" /><PremiumDot x={p1x + hW * 0.5} y={my + ph * 0.35} color={COLORS.eq} label="C" labelPos="tr" tooltipText="After trade" /><PremiumDot x={p2x + hW * 0.45} y={my + ph * 0.45} color={COLORS.eq} label="C" labelPos="tr" tooltipText="After trade" /><text x={p1x + hW / 2} y={axBot + 14} textAnchor="middle" fontSize={7} fontWeight={600} fill="currentColor" opacity={0.5} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Good X</text><text x={p2x + hW / 2} y={axBot + 14} textAnchor="middle" fontSize={7} fontWeight={600} fill="currentColor" opacity={0.5} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Good X</text></>); },
  },

  /* ── Business Objectives ── */
  business_objectives: {
    title: "Business Objectives — Profit/Rev/Sales Max", xAxis: "Output", yAxis: "Revenue / Cost",
    legend: [{ label: "MC", color: COLORS.supply }, { label: "ATC", color: COLORS.shifted }, { label: "AR", color: COLORS.demand }, { label: "MR", color: COLORS.area }],
    examTips: ["Profit max: MC=MR → (q₁,p₁)", "Revenue max: MR=0 → (q₂,p₂)", "Sales max: AR=ATC → (q₃,p₃)", "Different objectives → different outcomes"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const ar = { x1: mx + 10, y1: my + 10, x2: mx + pw - 10, y2: axBot - 15 }; const mr = { x1: mx + 10, y1: my + 10, x2: mx + pw * 0.55, y2: axBot - 15 }; const q1X = mx + pw * 0.3; const q2X = mx + pw * 0.45; const q3X = mx + pw * 0.55; const sl = (ar.y2 - ar.y1) / (ar.x2 - ar.x1); const p1Y = ar.y1 + sl * (q1X - ar.x1); const p2Y = ar.y1 + sl * (q2X - ar.x1); const p3Y = ar.y1 + sl * (q3X - ar.x1); return (<><CurvePath d={`M ${mx + pw * 0.1} ${my + ph * 0.5} Q ${mx + pw * 0.25} ${my + ph * 0.7} ${mx + pw * 0.35} ${my + ph * 0.65} Q ${mx + pw * 0.45} ${my + ph * 0.55} ${mx + pw * 0.65} ${my + 10}`} color={COLORS.supply} width={2.5} /><Label x={mx + pw * 0.67} y={my + 8} text="MC" color={COLORS.supply} size={9} /><CurvePath d={`M ${mx + pw * 0.08} ${my + 15} Q ${mx + pw * 0.25} ${my + ph * 0.55} ${mx + pw * 0.4} ${my + ph * 0.55} Q ${mx + pw * 0.6} ${my + ph * 0.52} ${mx + pw * 0.8} ${my + ph * 0.35}`} color={COLORS.shifted} width={2} /><Label x={mx + pw * 0.82} y={my + ph * 0.33} text="ATC" color={COLORS.shifted} size={9} /><GLine {...ar} color={COLORS.demand} width={2.5} /><Label x={ar.x2 + 2} y={ar.y2 - 4} text="AR" color={COLORS.demand} size={10} /><GLine {...mr} color={COLORS.area} width={2} /><Label x={mr.x2 + 2} y={mr.y2 - 4} text="MR" color={COLORS.area} size={10} /><DashedToAxes x={q1X} y={p1Y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="p₁" qLabel="q₁" /><PremiumDot x={q1X} y={p1Y} color={COLORS.eq} label="Profit Max" labelPos="tr" /><line x1={q2X} y1={p2Y} x2={q2X} y2={axBot} stroke={COLORS.area} strokeWidth={0.8} strokeDasharray="2,2" opacity={0.5} /><text x={q2X} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.area} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q₂</text><PremiumDot x={q2X} y={p2Y} color={COLORS.area} label="Rev Max" labelPos="tr" /><line x1={q3X} y1={p3Y} x2={q3X} y2={axBot} stroke={COLORS.demand} strokeWidth={0.8} strokeDasharray="2,2" opacity={0.5} /><text x={q3X} y={axBot + 12} textAnchor="middle" fontSize={7} fontWeight={700} fill={COLORS.demand} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>q₃</text><PremiumDot x={q3X} y={p3Y} color={COLORS.demand} label="Sales Max" labelPos="br" /></>); },
  },

  /* ── Price Discrimination ── */
  price_discrimination: {
    title: "3rd Degree Price Discrimination", xAxis: "Output", yAxis: "Price / Cost / Revenue",
    legend: [{ label: "Elastic group", color: COLORS.demand }, { label: "Inelastic group", color: COLORS.supply }, { label: "MC=AC", color: COLORS.lras }],
    examTips: ["Lower price to elastic group", "Higher price to inelastic group", "Requires: market power, identifiable groups, no resale", "Total profit increases vs single price"],
    render: (p) => { const { mx, my, pw, ph } = p; const axBot = my + ph; const gap = 16; const hW = (pw - gap) / 2; const p1x = mx; const p2x = mx + hW + gap; const mcY = my + ph * 0.5; const p1Y = my + ph * 0.42; const p2Y = my + ph * 0.28; return (<><line x1={p1x} y1={my} x2={p1x} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><line x1={p1x} y1={axBot} x2={p1x + hW} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><line x1={p2x} y1={my} x2={p2x} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><line x1={p2x} y1={axBot} x2={p2x + hW} y2={axBot} stroke="currentColor" strokeWidth={1.5} opacity={0.6} /><text x={p1x + hW / 2} y={my - 5} textAnchor="middle" fontSize={9} fontWeight={800} fill={COLORS.demand} opacity={0.8} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Elastic Group</text><text x={p2x + hW / 2} y={my - 5} textAnchor="middle" fontSize={9} fontWeight={800} fill={COLORS.supply} opacity={0.8} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Inelastic Group</text><GLine x1={p1x + 3} y1={mcY} x2={p1x + hW - 3} y2={mcY} color={COLORS.lras} width={1.5} /><GLine x1={p2x + 3} y1={mcY} x2={p2x + hW - 3} y2={mcY} color={COLORS.lras} width={1.5} /><text x={p1x + hW - 3} y={mcY - 4} textAnchor="end" fontSize={7} fontWeight={600} fill={COLORS.lras} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>MC=AC</text><text x={p2x + hW - 3} y={mcY - 4} textAnchor="end" fontSize={7} fontWeight={600} fill={COLORS.lras} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>MC=AC</text><GLine x1={p1x + 5} y1={my + 20} x2={p1x + hW - 5} y2={axBot - 20} color={COLORS.demand} width={2} /><Label x={p1x + hW - 3} y={axBot - 18} text="AR" color={COLORS.demand} size={8} /><GLine x1={p1x + 5} y1={my + 20} x2={p1x + hW * 0.55} y2={axBot - 20} color={COLORS.area} width={1.5} /><Label x={p1x + hW * 0.57} y={axBot - 18} text="MR" color={COLORS.area} size={8} /><GLine x1={p2x + hW * 0.15} y1={my + 10} x2={p2x + hW - 5} y2={axBot - 25} color={COLORS.supply} width={2} /><Label x={p2x + hW - 3} y={axBot - 23} text="AR" color={COLORS.supply} size={8} /><GLine x1={p2x + hW * 0.15} y1={my + 10} x2={p2x + hW * 0.55} y2={axBot - 25} color={COLORS.area} width={1.5} /><Label x={p2x + hW * 0.57} y={axBot - 23} text="MR" color={COLORS.area} size={8} /><line x1={p1x} y1={p1Y} x2={p1x + hW * 0.4} y2={p1Y} stroke={COLORS.demand} strokeWidth={0.8} strokeDasharray="2,2" opacity={0.5} /><text x={p1x - 3} y={p1Y + 3} textAnchor="end" fontSize={8} fontWeight={700} fill={COLORS.demand} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p₁</text><line x1={p2x} y1={p2Y} x2={p2x + hW * 0.35} y2={p2Y} stroke={COLORS.supply} strokeWidth={0.8} strokeDasharray="2,2" opacity={0.5} /><text x={p2x - 3} y={p2Y + 3} textAnchor="end" fontSize={8} fontWeight={700} fill={COLORS.supply} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>p₂</text><text x={p1x + hW / 2} y={axBot + 14} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.demand} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Lower price</text><text x={p2x + hW / 2} y={axBot + 14} textAnchor="middle" fontSize={7} fontWeight={600} fill={COLORS.supply} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Higher price</text></>); },
  },

  /* ── Specific Tax & Ad Valorem Tax (locked component) ── */
  specific_ad_valorem: {
    title: "Specific Tax & Ad Valorem Tax",
    xAxis: "Quantity", yAxis: "Price",
    legend: [{ label: "Specific Tax", color: "#c8a800" }, { label: "Ad Valorem Tax", color: "#e14e4e" }],
    examTips: [
      "Specific tax = fixed amount per unit → parallel shift of supply",
      "Ad valorem tax = percentage of price → supply pivots (diverges)",
      "Both create welfare loss and raise price / reduce quantity",
      "Label the tax wedge clearly between S and S+Tax",
    ],
    render: () => <SpecificAdValoremDiagram />,
  },
};

// Canonical family-id aliases for structured "Diagram family: ..." values
const FAMILY_ALIASES: Record<string, string> = {
  "indirect-tax": "tax_incidence",
  "indirect_tax": "tax_incidence",
  "negative-externality-production": "negative_production_externality",
  "negative_externality_production": "negative_production_externality",
  "negative-externality-consumption": "negative_externality",
  "negative_externality_consumption": "negative_externality",
  "positive-externality-production": "positive_production_externality",
  "positive_externality_production": "positive_production_externality",
  "positive-externality-consumption": "positive_externality",
  "positive_externality_consumption": "positive_externality",
  "adas-ad-shift": "ad_increase",
  "adas_ad_shift": "ad_increase",
  "adas-ad-shift-left": "ad_decrease",
  "adas_ad_shift_left": "ad_decrease",
  "adas-sras-shift": "sras_decrease",
  "adas_sras_shift": "sras_decrease",
  "adas-sras-shift-right": "sras_increase",
  "adas_sras_shift_right": "sras_increase",
  "exchange-rate-demand": "exchange_rate",
  "exchange_rate_demand": "exchange_rate",
  "exchange-rate-supply": "exchange_rate",
  "exchange_rate_supply": "exchange_rate",
  "srpc": "phillips_curve",
  "short-run-phillips-curve": "phillips_curve",
  "short_run_phillips_curve": "phillips_curve",
  "lrpc": "phillips_curve",
  "long-run-phillips-curve": "phillips_curve",
  "supply-demand-shift": "demand_increase",
  "supply_demand_shift": "demand_increase",
  "price-floor": "price_floor",
  "price-ceiling": "price_ceiling",
  "price_cap": "price_ceiling",
  "monopoly-profit": "monopoly",
  "monopoly_profit": "monopoly",
  "perfect-competition": "perfect_competition",
  "monopolistic-competition": "monopolistic_competition",
  "kinked-demand": "kinked_demand",
  "natural-monopoly": "natural_monopoly",
  "j-curve": "j_curve",
  "j_curve_effect": "j_curve",
  "tariff-welfare": "tariff",
  "import-tariff": "tariff",
  "import-quota": "trade_quota",
  "trade-quota": "trade_quota",
  "lorenz-curve": "lorenz_curve",
  "cost-curves": "cost_curves",
  "labour-market": "labour_market",
  "labor-market": "labour_market",
  "ppf-growth": "ppf_growth",
  "comparative-advantage": "comparative_advantage",
  "pollution-permits": "pollution_permits",
  "cap-and-trade": "pollution_permits",
  "tax-externality": "tax_externality",
  "subsidy-externality": "subsidy_externality",
  "crowding-out": "crowding_out",
  "multiplier-effect": "multiplier_effect",
  "laffer-curve": "laffer_curve",
  "keynesian-as": "keynesian_as",
  "lras-shift": "lras_shift",
  "monopsony-labour": "monopsony",
  "price-discrimination": "price_discrimination",
  "business-objectives": "business_objectives",
};

// Alias mappings — comprehensive to catch AI-generated diagram titles
const ALIASES: Record<string, string> = {
  // Externality aliases
  "positive_consumption_externality": "positive_externality",
  "negative_consumption_externality": "negative_externality",
  "externality_positive": "positive_externality",
  "externality_negative": "negative_externality",
  "neg_production_externality": "negative_production_externality",
  "neg_externality_production": "negative_production_externality",
  "pos_production_externality": "positive_production_externality",
  "pos_externality_production": "positive_production_externality",
  "negative_externality_production": "negative_production_externality",
  "positive_externality_production": "positive_production_externality",
  "negative_externality_of_production": "negative_production_externality",
  "positive_externality_of_production": "positive_production_externality",
  "negative_externality_of_consumption": "negative_externality",
  "positive_externality_of_consumption": "positive_externality",
  "pollution": "negative_production_externality",
  "pollution_diagram": "negative_production_externality",
  "external_cost": "negative_production_externality",
  "external_costs": "negative_production_externality",
  "external_benefit": "positive_production_externality",
  "external_benefits": "positive_production_externality",
  "merit_good": "positive_externality",
  "merit_goods": "positive_externality",
  "demerit_good": "negative_externality",
  "demerit_goods": "negative_externality",
  "overconsumption": "negative_externality",
  "underconsumption": "positive_externality",
  "overproduction": "negative_production_externality",
  "underproduction": "positive_production_externality",
  "msc_mpc": "negative_production_externality",
  "msb_mpb": "positive_externality",
  "welfare_loss": "negative_production_externality",
  "welfare_loss_triangle": "negative_production_externality",
  "market_failure_externality": "negative_production_externality",
  "market_failure": "negative_production_externality",
  // AD/AS aliases
  "ad_as": "ad_increase",
  "adas": "ad_increase",
  "aggregate_demand_increase": "ad_increase",
  "aggregate_demand_decrease": "ad_decrease",
  "cost_push": "sras_decrease",
  "cost_push_inflation": "sras_decrease",
  "demand_pull": "ad_increase",
  "demand_pull_inflation": "ad_increase",
  "supply_side_improvement": "sras_increase",
  "aggregate_supply_increase": "sras_increase",
  "aggregate_supply_decrease": "sras_decrease",
  "lras_shift": "lras_shift",
  "deflationary_gap": "sras_decrease",
  "recessionary_gap": "sras_decrease",
  "monetarist": "sras_decrease",
  "supply_side_shock": "sras_decrease",
  "supply_shock": "sras_decrease",
  "negative_supply_shock": "sras_decrease",
  "stagflation": "sras_decrease",
  "demand_side_shock": "demand_side_shock",
  "demand_shock": "demand_side_shock",
  "aggregate_demand_shock": "demand_side_shock",
  "ad_shock": "demand_side_shock",
  "positive_demand_shock": "demand_side_shock",
  "negative_demand_shock": "demand_side_shock",
  // Tax/subsidy
  "indirect_tax": "tax_incidence",
  "taxation": "tax_incidence",
  "tax": "tax_incidence",
  "tax_on_supply": "tax_incidence",
  "specific_tax": "tax_incidence",
  "ad_valorem_tax": "tax_incidence",
  "subsidy_diagram": "subsidy",
  // Price controls
  "maximum_price": "price_ceiling",
  "minimum_price": "price_floor",
  "price_cap": "price_ceiling",
  "rent_control": "price_ceiling",
  "minimum_wage": "price_floor",
  "buffer_stock": "price_floor",
  // PPF
  "production_possibility": "ppf",
  "production_possibility_frontier": "ppf",
  "production_possibility_curve": "ppf",
  "ppf_diagram": "ppf",
  "economic_growth": "ppf_growth",
  "growth": "ppf_growth",
  // Elasticity
  "elastic": "ped_elastic",
  "inelastic": "ped_inelastic",
  "price_elasticity": "ped_elastic",
  "elastic_demand": "ped_elastic",
  "inelastic_demand": "ped_inelastic",
  // Market structures
  "monopoly_profit": "monopoly",
  "profit_maximisation": "monopoly",
  "profit_maximization": "monopoly",
  "monopoly_diagram": "monopoly",
  "perfect_competition_diagram": "perfect_competition",
  "perfectly_competitive": "perfect_competition",
  "monopolistic": "monopolistic_competition",
  "monopolistic_comp": "monopolistic_competition",
  "excess_capacity": "monopolistic_competition",
  // Income distribution
  "lorenz": "lorenz_curve",
  "income_inequality": "lorenz_curve",
  "gini": "lorenz_curve",
  "gini_coefficient": "lorenz_curve",
  "inequality": "lorenz_curve",
  // Game theory
  "prisoners_dilemma": "oligopoly_payoff",
  "game_theory": "oligopoly_payoff",
  "payoff_matrix": "oligopoly_payoff",
  "oligopoly": "oligopoly_payoff",
  // Cost curves
  "cost_curve": "cost_curves",
  "mc_ac": "cost_curves",
  "mc_atc_avc": "cost_curves",
  "short_run_costs": "cost_curves",
  "average_cost": "cost_curves",
  "marginal_cost": "cost_curves",
  "cost_and_revenue": "cost_curves",
  "cost_revenue_curves": "cost_curves",
  // LRAC
  "long_run_average_cost": "lrac",
  "economies_of_scale": "lrac",
  "diseconomies_of_scale": "lrac",
  "minimum_efficient_scale": "lrac",
  "mes": "lrac",
  // Keynesian
  "keynesian": "keynesian_as",
  "keynesian_aggregate_supply": "keynesian_as",
  "keynesian_adas": "keynesian_as",
  "spare_capacity": "keynesian_as",
  // Trade
  "quota": "trade_quota",
  "import_quota": "trade_quota",
  "tariff_diagram": "tariff",
  "tariff_impact": "tariff",
  "import_tariff": "tariff",
  "trade": "trade_quota",
  "world_supply": "trade_quota",
  "trade_diagram": "trade_quota",
  // LRAS shift
  "lras_shift_right": "lras_shift",
  "long_run_growth": "lras_shift",
  "productive_capacity": "lras_shift",
  // Laffer
  "laffer": "laffer_curve",
  "tax_revenue_curve": "laffer_curve",
  // Multiplier
  "multiplier": "multiplier_effect",
  "fiscal_multiplier": "multiplier_effect",
  "keynesian_multiplier": "multiplier_effect",
  // Exchange rate
  "currency_market": "exchange_rate",
  "forex": "exchange_rate",
  "foreign_exchange": "exchange_rate",
  "depreciation_currency": "exchange_rate",
  "appreciation_currency": "exchange_rate",
  // J-curve
  "j_curve_effect": "j_curve",
  "marshall_lerner": "j_curve",
  "trade_balance": "j_curve",
  // Crowding out
  "crowding_out_effect": "crowding_out",
  "loanable_funds": "crowding_out",
  // Kinked demand
  "kinked_demand_curve": "kinked_demand",
  "oligopoly_kinked": "kinked_demand",
  "price_rigidity": "kinked_demand",
  // Natural monopoly
  "natural_monopoly_diagram": "natural_monopoly",
  "falling_lratc": "natural_monopoly",
  // Monopsony
  "monopsony_labour": "monopsony",
  "monopsony_diagram": "monopsony",
  "dominant_employer": "monopsony",
  "mcl_acl": "monopsony",
  // Pollution permits
  "tradeable_permits": "pollution_permits",
  "carbon_permits": "pollution_permits",
  "emissions_trading": "pollution_permits",
  "cap_and_trade": "pollution_permits",
  // Tax/subsidy externality
  "pigouvian": "tax_externality",
  "tax_negative_externality": "tax_externality",
  "subsidy_positive_externality": "subsidy_externality",
  "subsidy_merit_good": "subsidy_externality",
  // Business objectives
  "business_objectives_diagram": "business_objectives",
  "revenue_maximisation": "business_objectives",
  "sales_maximisation": "business_objectives",
  // Price discrimination
  "third_degree_price_discrimination": "price_discrimination",
  "price_discrimination_diagram": "price_discrimination",
  // Comparative advantage
  "comparative_advantage_ppf": "comparative_advantage",
  "gains_from_trade": "comparative_advantage",
  "ricardian_trade": "comparative_advantage",
  // Shutdown
  "shutdown": "short_run_shutdown",
  "shutdown_point": "short_run_shutdown",
  "short_run_shutdown_point": "short_run_shutdown",
  // Labour market
  "labour_market_diagram": "labour_market",
  "labor_market": "labour_market",
  "wage_determination": "labour_market",
  "wage_rate": "labour_market",
  "mrp": "labour_market",
  "marginal_revenue_product": "labour_market",
  "derived_demand": "labour_market",
  "demand_for_labour": "labour_market",
  "supply_of_labour": "labour_market",
  "competitive_labour": "labour_market",
  "acl_mcl": "labour_market",
  // Phillips
  "phillips": "phillips_curve",
  "inflation_unemployment": "phillips_curve",
  // S&D basics
  "supply_and_demand": "supply_demand",
  "market_equilibrium": "supply_demand",
  "demand_shift": "demand_shift_dual",
  "supply_shift": "supply_shift_dual",
  "increase_in_demand": "demand_increase",
  "decrease_in_demand": "demand_decrease",
  "increase_in_supply": "supply_increase",
  "decrease_in_supply": "supply_decrease",
  "shift_in_demand": "demand_shift_dual",
  "shift_in_supply": "supply_shift_dual",
  "supply_shift_dual": "supply_shift_dual",
  "demand_shift_dual": "demand_shift_dual",
};

export function resolveDiagramType(raw: string, shiftHint?: string): DiagramType | null {
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_").replace(/[^a-z0-9_]/g, "");
  if (key in DIAGRAMS) return key as DiagramType;
  if (key in FAMILY_ALIASES) return FAMILY_ALIASES[key] as DiagramType;
  if (key in ALIASES) return ALIASES[key] as DiagramType;

  // Also check the hyphenated form for family IDs
  const hyphenKey = raw.toLowerCase().trim();
  if (hyphenKey in FAMILY_ALIASES) return FAMILY_ALIASES[hyphenKey] as DiagramType;

  // Fuzzy: check if any alias key is contained in the raw string or vice-versa
  const lc = raw.toLowerCase();
  for (const [alias, dtype] of Object.entries(ALIASES)) {
    const aliasWords = alias.replace(/_/g, " ");
    if (lc.includes(aliasWords) || aliasWords.includes(lc.trim())) {
      return dtype as DiagramType;
    }
  }

  // Keyword-based inference from raw text (covers natural language AI descriptions)
  const kwMap: [string[], DiagramType][] = [
    // Externalities (check specific before general)
    [["negative", "production", "externality"], "negative_production_externality"],
    [["positive", "production", "externality"], "positive_production_externality"],
    [["negative", "consumption", "externality"], "negative_externality"],
    [["positive", "consumption", "externality"], "positive_externality"],
    [["pollution", "externality"], "negative_production_externality"],
    [["demerit", "good"], "negative_externality"],
    [["merit", "good"], "positive_externality"],
    [["msc", "mpc"], "negative_production_externality"],
    [["msb", "mpb"], "positive_externality"],
    [["overconsumption"], "negative_externality"],
    [["underconsumption"], "positive_externality"],
    [["overproduction"], "negative_production_externality"],
    [["underproduction"], "positive_production_externality"],
    [["welfare", "loss"], "negative_production_externality"],
    [["market", "failure"], "negative_production_externality"],
    [["negative", "externality"], "negative_production_externality"],
    [["positive", "externality"], "positive_externality"],
    [["externality"], "negative_production_externality"],
    // Intervention
    [["indirect", "tax"], "tax_incidence"],
    [["tax", "incidence"], "tax_incidence"],
    [["specific", "tax"], "tax_incidence"],
    [["ad", "valorem"], "tax_incidence"],
    [["pigouvian", "tax"], "tax_incidence"],
    [["sugar", "tax"], "tax_incidence"],
    [["subsidy"], "subsidy"],
    [["minimum", "wage"], "price_floor"],
    [["price", "floor"], "price_floor"],
    [["minimum", "price"], "price_floor"],
    [["buffer", "stock"], "price_floor"],
    [["price", "ceiling"], "price_ceiling"],
    [["maximum", "price"], "price_ceiling"],
    [["rent", "control"], "price_ceiling"],
    [["price", "cap"], "price_ceiling"],
    // Macro — specific before generic
    [["supply", "side", "shock"], "sras_decrease"],
    [["demand", "side", "shock"], "demand_side_shock"],
    [["economic", "growth", "lras"], "lras_shift"],
    [["lras", "shift"], "lras_shift"],
    [["cost", "push"], "sras_decrease"],
    [["demand", "pull"], "ad_increase"],
    [["aggregate", "demand", "increase"], "ad_increase"],
    [["aggregate", "demand", "decrease"], "ad_decrease"],
    [["aggregate", "supply", "decrease"], "sras_decrease"],
    [["aggregate", "supply", "increase"], "sras_increase"],
    [["keynesian"], "keynesian_as"],
    [["ad", "as"], "ad_increase"],
    // Labour market
    [["labour", "market"], "labour_market"],
    [["labor", "market"], "labour_market"],
    [["wage", "determination"], "labour_market"],
    [["mrp"], "labour_market"],
    [["marginal", "revenue", "product"], "labour_market"],
    [["derived", "demand"], "labour_market"],
    [["demand", "labour"], "labour_market"],
    [["supply", "labour"], "labour_market"],
    // Market structures
    [["monopoly"], "monopoly"],
    [["monopolistic", "competition"], "monopolistic_competition"],
    [["perfect", "competition"], "perfect_competition"],
    [["oligopoly"], "oligopoly_payoff"],
    [["game", "theory"], "oligopoly_payoff"],
    [["prisoner"], "oligopoly_payoff"],
    [["payoff"], "oligopoly_payoff"],
    // Cost curves
    [["cost", "curve"], "cost_curves"],
    [["lrac"], "lrac"],
    [["economies", "scale"], "lrac"],
    [["diseconomies"], "lrac"],
    [["shutdown"], "short_run_shutdown"],
    // PPF
    [["ppf"], "ppf"],
    [["production", "possibility"], "ppf"],
    [["economic", "growth"], "ppf_growth"],
    // Elasticity
    [["elastic"], "ped_elastic"],
    [["inelastic"], "ped_inelastic"],
    // Distribution / other
    [["lorenz"], "lorenz_curve"],
    [["gini"], "lorenz_curve"],
    [["inequality"], "lorenz_curve"],
    [["phillips"], "phillips_curve"],
    // Trade
    [["tariff", "welfare"], "tariff"],
    [["tariff", "import"], "tariff"],
    [["quota"], "trade_quota"],
    [["tariff"], "tariff"],
    [["trade", "diagram"], "trade_quota"],
    // New macro
    [["lras", "shift"], "lras_shift"],
    [["laffer"], "laffer_curve"],
    [["multiplier"], "multiplier_effect"],
    [["exchange", "rate"], "exchange_rate"],
    [["forex"], "exchange_rate"],
    [["j", "curve"], "j_curve"],
    [["crowding", "out"], "crowding_out"],
    [["loanable", "funds"], "crowding_out"],
    [["comparative", "advantage"], "comparative_advantage"],
    // New micro
    [["kinked", "demand"], "kinked_demand"],
    [["natural", "monopoly"], "natural_monopoly"],
    [["monopsony"], "monopsony"],
    [["pollution", "permit"], "pollution_permits"],
    [["cap", "trade"], "pollution_permits"],
    [["emissions", "trading"], "pollution_permits"],
    [["tax", "externality"], "tax_externality"],
    [["pigouvian"], "tax_externality"],
    [["subsidy", "externality"], "subsidy_externality"],
    [["subsidy", "merit"], "subsidy_externality"],
    [["business", "objectives"], "business_objectives"],
    [["revenue", "maximis"], "business_objectives"],
    [["sales", "maximis"], "business_objectives"],
    [["price", "discrimination"], "price_discrimination"],
    // S&D basics
    [["supply", "demand"], "supply_demand"],
    [["demand", "increase"], "demand_increase"],
    [["demand", "decrease"], "demand_decrease"],
    [["supply", "increase"], "supply_increase"],
    [["supply", "decrease"], "supply_decrease"],
    [["demand", "shift"], "demand_increase"],
    [["supply", "shift"], "supply_increase"],
  ];

  for (const [keywords, dtype] of kwMap) {
    if (keywords.every(kw => lc.includes(kw))) return dtype;
  }

  // Use shift hint to infer diagram type (e.g. "Demand shifts left" → demand_decrease)
  if (shiftHint) {
    const sh = shiftHint.toLowerCase();
    const isLeft = sh.includes("left") || sh.includes("decrease") || sh.includes("inward");
    if (sh.includes("supply") || sh.includes("sras")) {
      if (sh.includes("aggregate") || sh.includes("sras")) return isLeft ? "sras_decrease" : "sras_increase";
      return isLeft ? "supply_decrease" : "supply_increase";
    }
    if (sh.includes("ad") || sh.includes("aggregate demand")) return isLeft ? "ad_decrease" : "ad_increase";
    if (sh.includes("demand")) return isLeft ? "demand_decrease" : "demand_increase";
  }

  // Last resort: if raw is very short, try partial keyword matches
  if (key.length <= 3) {
    if (key === "d" || key === "dd") return "demand_decrease";
    if (key === "s" || key === "sd" || key === "ss") return "supply_demand";
    if (key === "ad") return "ad_increase";
    if (key === "as") return "sras_decrease";
  }

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
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  if (!config) return null;

  // ── Perfect Competition: dedicated two-panel component ──
  if (type === "perfect_competition") {
    return <div className={cn("my-4", className)}><PerfectCompetitionDiagram /></div>;
  }

  // ── Monopolistic Competition: dedicated SR/LR component ──
  if (type === "monopolistic_competition") {
    return <div className={cn("my-4", className)}><MonopolisticCompetitionDiagram /></div>;
  }

  // ── Lorenz Curve: dedicated exam-accurate component ──
  if (type === "lorenz_curve") {
    return <div className={cn("my-4", className)}><LorenzCurveDiagram /></div>;
  }

  // ── LRAC: dedicated exam-accurate component ──
  if (type === "lrac") {
    return <div className={cn("my-4", className)}><LRACDiagram /></div>;
  }

  // ── Declarative path: delegate to the new EconomicsDiagram component ──
  if (config.declarative) {
    return (
      <div
        className={cn(
          "my-4 relative overflow-hidden group transition-shadow duration-300 hover:shadow-xl",
          className
        )}
      >
        <EconomicsDiagram {...config.declarative} className="" />
      </div>
    );
  }

  // ── Legacy path: manual SVG rendering ──
  const W = SVG_W, H = SVG_H;
  const mx = SVG_PAD, my = SVG_PAD, pw = W - mx - SVG_PAD, ph = H - my - SVG_PAD;

  return (
    <div
      className={cn(
        "my-4 rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-lg relative overflow-hidden group transition-shadow duration-300 hover:shadow-xl",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
      <p className="text-xs font-bold uppercase tracking-widest mb-4 text-primary flex items-center gap-2 relative z-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">📊</span>
        {config.title}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[700px] h-auto text-foreground relative z-10">
        <PremiumDefs mx={mx} my={my} pw={pw} ph={ph} uid={uid} />
        <Axes mx={mx} my={my} pw={pw} ph={ph} xLabel={config.xAxis} yLabel={config.yAxis} />
        <g clipPath={`url(#plot-clip-${uid})`}>
          {config.render({ W, H, mx, my, pw, ph, uid })}
        </g>
      </svg>
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
      {/* Exam tips removed per user request */}
    </div>
  );
}

export function getAllDiagramTypes(): { type: DiagramType; title: string }[] {
  return Object.entries(DIAGRAMS).map(([type, config]) => ({
    type: type as DiagramType,
    title: config.title,
  }));
}
