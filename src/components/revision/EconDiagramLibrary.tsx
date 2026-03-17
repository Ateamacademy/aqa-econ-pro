/**
 * Predefined SVG Economics Diagram Templates — Premium Polished Edition
 * 
 * All curves are clipped to the plot area so nothing extends beyond axes.
 * Equilibrium points are computed from actual line intersections (not hardcoded).
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
  | "perfect_competition"
  | "lorenz_curve"
  | "oligopoly_payoff"
  | "cost_curves"
  | "lrac"
  | "monopolistic_competition"
  | "keynesian_as"
  | "trade_quota"
  | "short_run_shutdown";

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
function PremiumDefs({ mx, my, pw, ph }: { mx: number; my: number; pw: number; ph: number }) {
  return (
    <defs>
      <clipPath id="plot-clip">
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
      {["demand", "supply", "shifted"].map(name => (
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

function Label({ x, y, text, color, size = 11, anchor = "start", bold = true, bg = true }: {
  x: number; y: number; text: string; color: string; size?: number; anchor?: string; bold?: boolean; bg?: boolean;
}) {
  // Estimate text width for background rect
  const charW = size * 0.62;
  const textW = text.length * charW;
  const textH = size + 2;
  const pad = 3;
  const anchorX = anchor === "middle" ? x - textW / 2 : anchor === "end" ? x - textW : x;

  return (
    <g>
      {bg && (
        <rect
          x={anchorX - pad}
          y={y - textH + 2}
          width={textW + pad * 2}
          height={textH + pad}
          rx={3}
          fill="hsl(var(--card))"
          opacity={0.88}
        />
      )}
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
      {/* Demand */}
      <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
      <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D₁" color={COLORS.demand} />

      {shiftCurve === "demand" && (
        <>
          <GLine {...dShifted} color={COLORS.demand} gradientId="grad-demand" dashed />
          <Label x={dShifted.x2 + 4} y={dShifted.y2 - 6} text="D₂" color={COLORS.demand} />
          <ShiftArrow x1={eq1.x} y1={eq1.y} x2={eq2.x} y2={eq2.y} color={COLORS.shifted} />
        </>
      )}

      {/* Supply */}
      <GLine {...sL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
      <Label x={sL.x2 + 4} y={sL.y2 + 4} text="S₁" color={COLORS.supply} />

      {shiftCurve === "supply" && (
        <>
          <GLine {...sShifted} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={sShifted.x2 + 4} y={sShifted.y2 + 4} text="S₂" color={COLORS.supply} />
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

  /* ── Externalities ── */
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
      const pad = 10;
      // Supply (MPC): upward sloping
      const sL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      // MPB: downward sloping, lower/left
      const mpbL = { x1: mx + pad, y1: my + ph * 0.15, x2: mx + pw * 0.72, y2: my + ph - pad };
      // MSB: downward sloping, higher/right (shifted right of MPB)
      const msbL = { x1: mx + pw * 0.18, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };

      // Free market eq = S ∩ MPB
      const freeEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, mpbL.x1, mpbL.y1, mpbL.x2, mpbL.y2);
      // Social optimum = S ∩ MSB
      const optEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, msbL.x1, msbL.y1, msbL.x2, msbL.y2);

      // DWL triangle: area between MSB and MPC from Qₘ to Q*
      // Vertex 3: MSB value at Qₘ (the social benefit NOT captured at free market qty)
      const msbSlope = (msbL.y2 - msbL.y1) / (msbL.x2 - msbL.x1);
      const msbAtFreeX = msbL.y1 + msbSlope * (freeEq.x - msbL.x1);

      return (
        <>
          <GLine {...sL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sL.x2 - 8} y={sL.y2 - 6} text="S = MPC" color={COLORS.supply} />
          <GLine {...mpbL} color={COLORS.mpb} width={2} />
          <Label x={mpbL.x2 + 4} y={mpbL.y2 - 6} text="D = MPB" color={COLORS.mpb} />
          <GLine {...msbL} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbL.x2 + 4} y={msbL.y2 - 6} text="MSB" color={COLORS.demand} />
          {/* Welfare loss triangle: freeEq → (Qₘ, MSB at Qₘ) → optEq */}
          <polygon
            points={`${freeEq.x},${freeEq.y} ${freeEq.x},${msbAtFreeX} ${optEq.x},${optEq.y}`}
            fill={COLORS.area} fillOpacity={0.12} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
          />
          <Label x={(freeEq.x + optEq.x) / 2} y={(freeEq.y + msbAtFreeX) / 2 + 4} text="DWL" color={COLORS.area} size={9} anchor="middle" />
          <DashedToAxes x={freeEq.x} y={freeEq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEq.x} y={freeEq.y} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Free market under-provides — Qₘ < Q*" />
          <DashedToAxes x={optEq.x} y={optEq.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEq.x} y={optEq.y} color={COLORS.shifted} label="Soc. Opt." labelPos="tr" gradientId="dot-amber"
            tooltipText="✓ Socially optimal — where MSB = MPC" />
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
      const pad = 10;
      // Supply (MPC): upward sloping
      const sL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      // MPB: downward, higher/right (over-valued by consumers)
      const mpbL = { x1: mx + pw * 0.18, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };
      // MSB: downward, lower/left (true social benefit is less)
      const msbL = { x1: mx + pad, y1: my + ph * 0.15, x2: mx + pw * 0.72, y2: my + ph - pad };

      // Free market eq = S ∩ MPB (over-consumption)
      const freeEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, mpbL.x1, mpbL.y1, mpbL.x2, mpbL.y2);
      // Social optimum = S ∩ MSB
      const optEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, msbL.x1, msbL.y1, msbL.x2, msbL.y2);

      // DWL: area between MPC and MSB from Q* to Qₘ (over-consumption region)
      // Vertex 3: MSB value at Qₘ
      const msbSlope = (msbL.y2 - msbL.y1) / (msbL.x2 - msbL.x1);
      const msbAtFreeX = msbL.y1 + msbSlope * (freeEq.x - msbL.x1);

      return (
        <>
          <GLine {...sL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sL.x2 - 8} y={sL.y2 - 6} text="S = MPC" color={COLORS.supply} />
          <GLine {...mpbL} color={COLORS.mpb} width={2} />
          <Label x={mpbL.x2 + 4} y={mpbL.y2 - 6} text="D = MPB" color={COLORS.mpb} />
          <GLine {...msbL} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbL.x2 + 4} y={msbL.y2 - 6} text="MSB" color={COLORS.demand} />
          {/* DWL triangle: optEq → freeEq → (Qₘ, MSB at Qₘ) */}
          <polygon
            points={`${optEq.x},${optEq.y} ${freeEq.x},${freeEq.y} ${freeEq.x},${msbAtFreeX}`}
            fill={COLORS.area} fillOpacity={0.12} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
          />
          <Label x={(optEq.x + freeEq.x) / 2} y={(freeEq.y + msbAtFreeX) / 2 + 4} text="DWL" color={COLORS.area} size={9} anchor="middle" />
          <DashedToAxes x={freeEq.x} y={freeEq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEq.x} y={freeEq.y} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Over-consumption — Qₘ exceeds Q*" />
          <DashedToAxes x={optEq.x} y={optEq.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEq.x} y={optEq.y} color={COLORS.shifted} label="Soc. Opt." gradientId="dot-amber"
            tooltipText="✓ Socially optimal where MSB = MPC" />
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
      const pad = 10;
      // MPC: upward sloping (private cost, lower)
      const mpcL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + ph * 0.15 };
      // MSC: upward sloping, above MPC (social cost higher)
      const mscL = { x1: mx + pw * 0.15, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      // D = MSB: downward sloping
      const dL = { x1: mx + pad, y1: my + pad + 5, x2: mx + pw - pad, y2: my + ph - pad };

      // Free market eq = MPC ∩ D
      const freeEq = lineIntersect(mpcL.x1, mpcL.y1, mpcL.x2, mpcL.y2, dL.x1, dL.y1, dL.x2, dL.y2);
      // Social optimum = MSC ∩ D
      const optEq = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, dL.x1, dL.y1, dL.x2, dL.y2);

      // DWL top vertex: point on MSC directly above freeEq
      // MSC at x=freeEq.x: interpolate
      const mscSlope = (mscL.y2 - mscL.y1) / (mscL.x2 - mscL.x1);
      const mscAtFreeX = mscL.y1 + mscSlope * (freeEq.x - mscL.x1);

      return (
        <>
          <GLine {...mpcL} color={COLORS.mpc} width={2} />
          <Label x={mpcL.x2 - 8} y={mpcL.y2 - 6} text="S = MPC" color={COLORS.mpc} />
          <GLine {...mscL} color={COLORS.msc} gradientId="grad-supply" dashed glow="glow-red" />
          <Label x={mscL.x2 + 4} y={mscL.y2 - 6} text="MSC" color={COLORS.msc} />
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D = MSB" color={COLORS.demand} />
          <polygon
            points={`${optEq.x},${optEq.y} ${freeEq.x},${freeEq.y} ${freeEq.x},${mscAtFreeX}`}
            fill={COLORS.area} fillOpacity={0.10} stroke="url(#grad-area)" strokeWidth={1.5} strokeDasharray="3,3"
          />
          <Label x={(optEq.x + freeEq.x) / 2} y={(optEq.y + freeEq.y) / 2 - 6} text="DWL" color={COLORS.area} size={9} anchor="middle" />
          <DashedToAxes x={freeEq.x} y={freeEq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEq.x} y={freeEq.y} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Free market over-produces at Qₘ" />
          <DashedToAxes x={optEq.x} y={optEq.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEq.x} y={optEq.y} color={COLORS.shifted} label="Soc. Opt." gradientId="dot-amber"
            tooltipText="✓ Optimal output where MSC = MSB" />
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

  /* ── SRAS shifts (Cost-Push / Positive Supply Shock) ── */
  sras_decrease: {
    title: "Decrease in SRAS (Cost-Push Inflation)",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "SRAS", color: COLORS.supply }, { label: "AD", color: COLORS.demand }, { label: "LRAS", color: COLORS.lras }],
    examTips: [
      "SRAS shifts LEFT — higher costs of production",
      "Creates stagflation: higher PL AND lower real GDP",
      "Key causes: oil price shocks, rising wages, supply chain disruption",
      "E₂ must show both higher price level AND lower output",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const lrasX = mx + pw * 0.65;
      const srasShift = -55; // LEFT shift

      // SRAS₁: upward sloping
      const sras1L = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad + 15 };
      // SRAS₂: parallel leftward shift
      const sras2L = { x1: sras1L.x1 + srasShift, y1: sras1L.y1, x2: sras1L.x2 + srasShift, y2: sras1L.y2 };
      // AD: downward sloping
      const adL = { x1: mx + pw * 0.12, y1: my + pad, x2: mx + pw * 0.68, y2: my + ph - pad };

      // E₁ = AD ∩ SRAS₁
      const eq1 = lineIntersect(sras1L.x1, sras1L.y1, sras1L.x2, sras1L.y2, adL.x1, adL.y1, adL.x2, adL.y2);
      // E₂ = AD ∩ SRAS₂
      const eq2 = lineIntersect(sras2L.x1, sras2L.y1, sras2L.x2, sras2L.y2, adL.x1, adL.y1, adL.x2, adL.y2);

      return (
        <>
          <GLine x1={lrasX} y1={my + pad} x2={lrasX} y2={my + ph - pad} color={COLORS.lras} gradientId="grad-lras" width={2} />
          <Label x={lrasX + 6} y={my + 20} text="LRAS" color={COLORS.lras} />
          <Label x={lrasX - 4} y={my + ph + 14} text="Yf" color={COLORS.lras} size={9} anchor="middle" />
          {/* SRAS₁ */}
          <GLine {...sras1L} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sras1L.x2 + 4} y={sras1L.y2 + 4} text="SRAS₁" color={COLORS.supply} />
          {/* SRAS₂ — shifted left */}
          <GLine {...sras2L} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={sras2L.x2 + 4} y={sras2L.y2 + 4} text="SRAS₂" color={COLORS.supply} />
          {/* Shift arrow between the two SRAS curves */}
          <ShiftArrow
            x1={(sras1L.x1 + sras1L.x2) / 2 + 5}
            y1={(sras1L.y1 + sras1L.y2) / 2}
            x2={(sras2L.x1 + sras2L.x2) / 2 - 5}
            y2={(sras2L.y1 + sras2L.y2) / 2}
            color={COLORS.shifted}
          />
          {/* AD */}
          <GLine {...adL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={adL.x2 + 4} y={adL.y2 - 6} text="AD" color={COLORS.demand} />

          <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="PL₁" qLabel="Y₁" />
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Initial equilibrium before cost shock" />
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="PL₂" qLabel="Y₂" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ Stagflation: ↑PL + ↓GDP together" />
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

  /* ── Tax Incidence ── */
  tax_incidence: {
    title: "Effect of an Indirect Tax",
    xAxis: "Quantity (Q)", yAxis: "Price (P)",
    legend: [{ label: "Demand", color: COLORS.demand }, { label: "Supply", color: COLORS.supply }, { label: "Tax Revenue", color: COLORS.area }],
    examTips: [
      "Supply shifts LEFT/UP by the amount of the tax per unit",
      "Show tax revenue as shaded area between P_consumer and P_producer",
      "Consumer burden depends on PED — more inelastic = more burden",
      "Label S₁ (pre-tax) and S₁+Tax clearly",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const taxShift = -50; // LEFT shift (tax increases costs → supply shifts left/up)

      const dL = { x1: mx + pad, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };
      const s1L = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      // S₁+Tax: shifted LEFT
      const s2L = { x1: s1L.x1 + taxShift, y1: s1L.y1, x2: s1L.x2 + taxShift, y2: s1L.y2 };

      const eq1 = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, s1L.x1, s1L.y1, s1L.x2, s1L.y2);
      const eq2 = lineIntersect(dL.x1, dL.y1, dL.x2, dL.y2, s2L.x1, s2L.y1, s2L.x2, s2L.y2);

      // Producer price at Q₂ on original supply
      const s1Slope = (s1L.y2 - s1L.y1) / (s1L.x2 - s1L.x1);
      const prodPriceY = s1L.y1 + s1Slope * (eq2.x - s1L.x1);

      return (
        <>
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D" color={COLORS.demand} />
          <GLine {...s1L} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={s1L.x2 + 4} y={s1L.y2 + 4} text="S₁" color={COLORS.supply} />
          <GLine {...s2L} color={COLORS.supply} gradientId="grad-supply" dashed />
          <Label x={s2L.x2 + 4} y={s2L.y2 + 4} text="S₁+Tax" color={COLORS.supply} />
          {/* Tax revenue area: rectangle between consumer price and producer price at Q₂ */}
          <rect x={mx} y={eq2.y} width={eq2.x - mx} height={prodPriceY - eq2.y}
            fill="url(#grad-area)" fillOpacity={0.12} stroke="url(#grad-area)" strokeWidth={1} rx={3} />
          <Label x={(mx + eq2.x) / 2} y={(eq2.y + prodPriceY) / 2 + 4} text="Tax Rev." color={COLORS.area} size={8} anchor="middle" />

          <DashedToAxes x={eq1.x} y={eq1.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Q₁" />
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="E₁" gradientId="dot-green"
            tooltipText="✓ Pre-tax equilibrium" />
          <DashedToAxes x={eq2.x} y={eq2.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P₂" qLabel="Q₂" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="E₂" gradientId="dot-amber"
            tooltipText="✓ After tax: higher P, lower Q" />
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

  /* ── Monopoly ── */
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
      const pad = 10;

      // MC: upward sloping
      const mcL = { x1: mx + pw * 0.18, y1: my + ph - pad - 10, x2: mx + pw - pad, y2: my + pad + 15 };
      // AR = D: downward sloping
      const arL = { x1: mx + pad, y1: my + pad + 10, x2: mx + pw - pad, y2: my + ph - pad };
      // MR: steeper downward (same intercept, hits x-axis at half the quantity)
      const mrL = { x1: mx + pad, y1: my + pad + 10, x2: mx + pw * 0.52, y2: my + ph - pad };

      // Profit max = MC ∩ MR
      const mcMrInt = lineIntersect(mcL.x1, mcL.y1, mcL.x2, mcL.y2, mrL.x1, mrL.y1, mrL.x2, mrL.y2);

      // Price = AR at Qₘ (read up to AR curve)
      const arSlope = (arL.y2 - arL.y1) / (arL.x2 - arL.x1);
      const priceY = arL.y1 + arSlope * (mcMrInt.x - arL.x1);

      // Approximate AC as horizontal line for supernormal profit illustration
      const acY = (priceY + mcMrInt.y) / 2 + 8;

      return (
        <>
          <GLine {...mcL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={mcL.x2 + 4} y={mcL.y2 + 4} text="MC" color={COLORS.supply} />
          <GLine {...arL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={arL.x2 + 4} y={arL.y2 - 6} text="AR = D" color={COLORS.demand} />
          <GLine {...mrL} color={COLORS.mpb} dashed width={2} />
          <Label x={mrL.x2 + 4} y={mrL.y2 - 6} text="MR" color={COLORS.mpb} />
          {/* AC line (simplified as horizontal) */}
          <GLine x1={mx + pad} y1={acY} x2={mx + pw - pad} y2={acY} color={COLORS.lras} dashed width={1} />
          <Label x={mx + pw - pad - 18} y={acY - 6} text="AC" color={COLORS.lras} size={10} />
          {/* Supernormal profit area */}
          <rect x={mx} y={priceY} width={mcMrInt.x - mx} height={acY - priceY}
            fill="url(#grad-area)" fillOpacity={0.10} rx={3} />
          <Label x={(mx + mcMrInt.x) / 2} y={(priceY + acY) / 2 + 4} text="Supernormal" color={COLORS.area} size={8} anchor="middle" />
          <Label x={(mx + mcMrInt.x) / 2} y={(priceY + acY) / 2 + 14} text="Profit" color={COLORS.area} size={8} anchor="middle" />

          {/* Projection from Qₘ up to AR (price) */}
          <DashedToAxes x={mcMrInt.x} y={priceY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="Pₘ" qLabel="Qₘ" />
          {/* MC=MR dot */}
          <PremiumDot x={mcMrInt.x} y={mcMrInt.y} color={COLORS.shifted} label="MC=MR" labelPos="br" gradientId="dot-amber"
            tooltipText="✓ Profit max rule: produce where MC=MR" />
          {/* Price dot on AR */}
          <PremiumDot x={mcMrInt.x} y={priceY} color={COLORS.eq} label="Pₘ on AR" labelPos="tl" gradientId="dot-green"
            tooltipText="✓ Price read UP to AR curve, not MC" />
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
          <path d={areaPath} fill={COLORS.area} fillOpacity={0.10} />

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
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      // MC: upward from low
      const mcPath = `M ${mx + pw * 0.15} ${my + ph - pad - 20} Q ${mx + pw * 0.35} ${my + ph * 0.65} ${mx + pw * 0.70} ${my + pad + 5}`;
      // AR = D: downward sloping (less steep than monopoly)
      const arL = { x1: mx + pad + 15, y1: my + pad + 20, x2: mx + pw * 0.78, y2: my + ph - pad };
      // MR: steeper downward
      const mrL = { x1: mx + pad + 15, y1: my + pad + 20, x2: mx + pw * 0.45, y2: my + ph - pad };
      // AC: U-shaped, tangent to AR at the equilibrium point
      const tangentX = mx + pw * 0.38, tangentY = my + ph * 0.38;
      const acPath = `M ${mx + pad + 25} ${my + pad + 30} Q ${tangentX - 10} ${tangentY + 18} ${tangentX} ${tangentY} Q ${tangentX + 30} ${tangentY - 8} ${mx + pw * 0.72} ${my + pad + 10}`;

      return (
        <>
          <CurvePath d={mcPath} color={COLORS.supply} gradientId="grad-supply" width={2.5} glow="glow-red" />
          <Label x={mx + pw * 0.72} y={my + pad + 12} text="MC" color={COLORS.supply} />
          <GLine {...arL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={arL.x2 + 4} y={arL.y2 - 6} text="AR = D" color={COLORS.demand} />
          <GLine {...mrL} color={COLORS.mpb} dashed width={2} />
          <Label x={mrL.x2 + 4} y={mrL.y2 - 6} text="MR" color={COLORS.mpb} />
          <CurvePath d={acPath} color={COLORS.lras} width={2} dashed />
          <Label x={mx + pw * 0.73} y={my + pad + 18} text="AC" color={COLORS.lras} />
          {/* Tangent point (normal profit) */}
          <PremiumDot x={tangentX} y={tangentY} color={COLORS.eq} label="Normal Profit" gradientId="dot-green"
            tooltipText="✓ AR tangent to AC = normal profit only" />
          <DashedToAxes x={tangentX} y={tangentY} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P" qLabel="Q" />
          {/* Excess capacity label */}
          <Label x={mx + pw * 0.52} y={my + ph * 0.82} text="← Excess Capacity →" color={COLORS.area} size={9} anchor="middle" bold={false} />
        </>
      );
    },
  },

  /* ── Keynesian Aggregate Supply ── */
  keynesian_as: {
    title: "Keynesian AS — Three Sections",
    xAxis: "Real GDP (Y)", yAxis: "Price Level (PL)",
    legend: [{ label: "Keynesian AS", color: COLORS.supply }, { label: "AD", color: COLORS.demand }],
    examTips: [
      "Horizontal section: spare capacity — output rises with NO inflation",
      "Upward sloping: approaching full employment — output rises WITH some inflation",
      "Vertical section: full employment (Yf) — only price level rises",
      "Keynesian view: economy can get stuck below Yf with demand deficiency",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const yf = mx + pw * 0.72;
      const flatY = my + ph * 0.68;

      // Keynesian AS: horizontal → upward sloping → vertical
      const kasPath = `M ${mx + pad + 5} ${flatY} L ${mx + pw * 0.42} ${flatY} Q ${mx + pw * 0.58} ${flatY - 10} ${yf} ${my + ph * 0.28} L ${yf} ${my + pad}`;

      // AD curves at different positions
      const ad1L = { x1: mx + pad + 20, y1: my + pad + 30, x2: mx + pw * 0.35, y2: my + ph - pad };
      const ad2L = { x1: mx + pw * 0.15, y1: my + pad + 10, x2: mx + pw * 0.58, y2: my + ph - pad };
      const ad3L = { x1: mx + pw * 0.40, y1: my + pad, x2: mx + pw * 0.82, y2: my + ph - pad };

      return (
        <>
          <CurvePath d={kasPath} color={COLORS.supply} gradientId="grad-supply" width={3} glow="glow-red" />
          <Label x={yf + 6} y={my + pad + 8} text="AS" color={COLORS.supply} />
          {/* Section labels */}
          <text x={mx + pw * 0.22} y={flatY + 18} textAnchor="middle" fontSize={7.5} fontWeight={600} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Spare Capacity</text>
          <text x={mx + pw * 0.56} y={my + ph * 0.42} textAnchor="middle" fontSize={7.5} fontWeight={600} fill={COLORS.shifted}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Near Full Emp.</text>
          <text x={yf + 12} y={my + ph * 0.22} textAnchor="start" fontSize={7.5} fontWeight={600} fill={COLORS.lras}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Full Emp.</text>
          {/* AD curves */}
          <GLine {...ad1L} color={COLORS.demand} width={1.5} dashed />
          <Label x={ad1L.x2 + 2} y={ad1L.y2 - 4} text="AD₁" color={COLORS.demand} size={9} />
          <GLine {...ad2L} color={COLORS.demand} gradientId="grad-demand" width={2} />
          <Label x={ad2L.x2 + 2} y={ad2L.y2 - 4} text="AD₂" color={COLORS.demand} size={9} />
          <GLine {...ad3L} color={COLORS.demand} width={1.5} dashed />
          <Label x={ad3L.x2 + 2} y={ad3L.y2 - 4} text="AD₃" color={COLORS.demand} size={9} />
          {/* Yf label */}
          <line x1={yf} y1={my + ph - pad} x2={yf} y2={my + ph - pad + 6} stroke="currentColor" strokeWidth={1.5} opacity={0.5} />
          <text x={yf} y={my + ph + 14} textAnchor="middle" fontSize={9} fontWeight={700} fill="currentColor" opacity={0.6}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Yf</text>
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
  "lorenz": "lorenz_curve",
  "income_inequality": "lorenz_curve",
  "gini": "lorenz_curve",
  "gini_coefficient": "lorenz_curve",
  "prisoners_dilemma": "oligopoly_payoff",
  "game_theory": "oligopoly_payoff",
  "payoff_matrix": "oligopoly_payoff",
  "oligopoly": "oligopoly_payoff",
  // New aliases from practice book
  "cost_curve": "cost_curves",
  "mc_ac": "cost_curves",
  "mc_atc_avc": "cost_curves",
  "short_run_costs": "cost_curves",
  "average_cost": "cost_curves",
  "marginal_cost": "cost_curves",
  "long_run_average_cost": "lrac",
  "economies_of_scale": "lrac",
  "diseconomies_of_scale": "lrac",
  "minimum_efficient_scale": "lrac",
  "mes": "lrac",
  "monopolistic": "monopolistic_competition",
  "monopolistic_comp": "monopolistic_competition",
  "excess_capacity": "monopolistic_competition",
  "keynesian": "keynesian_as",
  "keynesian_aggregate_supply": "keynesian_as",
  "keynesian_adas": "keynesian_as",
  "spare_capacity": "keynesian_as",
  "quota": "trade_quota",
  "import_quota": "trade_quota",
  "tariff": "trade_quota",
  "trade": "trade_quota",
  "world_supply": "trade_quota",
  "shutdown": "short_run_shutdown",
  "shutdown_point": "short_run_shutdown",
  "short_run_shutdown_point": "short_run_shutdown",
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
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
      <p className="text-xs font-bold uppercase tracking-widest mb-4 text-primary flex items-center gap-2 relative z-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">📊</span>
        {config.title}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] h-auto text-foreground relative z-10">
        <PremiumDefs mx={mx} my={my} pw={pw} ph={ph} />
        <Axes mx={mx} my={my} pw={pw} ph={ph} xLabel={config.xAxis} yLabel={config.yAxis} />
        <g clipPath="url(#plot-clip)">
          {config.render({ W, H, mx, my, pw, ph })}
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
