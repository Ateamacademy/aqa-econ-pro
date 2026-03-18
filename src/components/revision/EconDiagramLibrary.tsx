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
  | "demand_side_shock";

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
    legend: [{ label: "MPC = S", color: COLORS.supply }, { label: "MPB = D", color: COLORS.mpb }, { label: "MSB", color: COLORS.demand }, { label: "Welfare Gain", color: COLORS.area }],
    examTips: [
      "MSB is above MPB — third-party benefits not captured by consumers",
      "Under-consumption in free market: Qₘ < Q*",
      "Welfare loss triangle between Qₘ and Q*",
      "Policy: subsidy = external benefit per unit to internalise",
      "Label subsidy arrow between MPC and MSB at Q*",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const sL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      const mpbL = { x1: mx + pad, y1: my + ph * 0.15, x2: mx + pw * 0.72, y2: my + ph - pad };
      const msbL = { x1: mx + pw * 0.18, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };

      const freeEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, mpbL.x1, mpbL.y1, mpbL.x2, mpbL.y2);
      const optEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, msbL.x1, msbL.y1, msbL.x2, msbL.y2);

      const msbSlope = (msbL.y2 - msbL.y1) / (msbL.x2 - msbL.x1);
      const msbAtFreeX = msbL.y1 + msbSlope * (freeEq.x - msbL.x1);

      // External benefit at Q*: gap between MSB and MPB
      const mpbSlope = (mpbL.y2 - mpbL.y1) / (mpbL.x2 - mpbL.x1);
      const mpbAtOptX = mpbL.y1 + mpbSlope * (optEq.x - mpbL.x1);

      return (
        <>
          {/* Welfare loss triangle — RENDERED FIRST so it sits behind curves */}
          <WelfareRegion
            points={[
              { x: freeEq.x, y: freeEq.y },
              { x: freeEq.x, y: msbAtFreeX },
              { x: optEq.x, y: optEq.y },
            ]}
            fill="#3b82f6"
            fillOpacity={0.45}
            strokeWidth={3}
            label="WL"
            labelSize={9}
          />
          {/* Curves rendered on top of welfare region */}
          <GLine {...sL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sL.x2 - 8} y={sL.y2 - 6} text="S = MPC" color={COLORS.supply} />
          <GLine {...mpbL} color={COLORS.mpb} width={2} />
          <Label x={mpbL.x2 + 4} y={mpbL.y2 - 6} text="D = MPB" color={COLORS.mpb} />
          <GLine {...msbL} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbL.x2 + 4} y={msbL.y2 - 6} text="MSB" color={COLORS.demand} />
          {/* Subsidy annotation arrow at Q* */}
          <line x1={optEq.x + 12} y1={optEq.y} x2={optEq.x + 12} y2={mpbAtOptX} stroke={COLORS.eq} strokeWidth={2} markerEnd="url(#arrow-shifted)" markerStart="url(#arrow-shifted)" />
          <Label x={optEq.x + 18} y={(optEq.y + mpbAtOptX) / 2 + 3} text="Subsidy" color={COLORS.eq} size={8} />
          {/* Ext. benefit bracket */}
          <line x1={freeEq.x - 8} y1={freeEq.y} x2={freeEq.x - 8} y2={msbAtFreeX} stroke={COLORS.area} strokeWidth={1.5} opacity={0.6} />
          <Label x={freeEq.x - 14} y={(freeEq.y + msbAtFreeX) / 2 + 3} text="Ext. Benefit" color={COLORS.area} size={7} anchor="end" />
          <DashedToAxes x={freeEq.x} y={freeEq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEq.x} y={freeEq.y} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Under-provides — Qₘ < Q*" />
          <DashedToAxes x={optEq.x} y={optEq.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEq.x} y={optEq.y} color={COLORS.shifted} label="Soc. Opt." labelPos="tr" gradientId="dot-amber"
            tooltipText="✓ Optimal where MSB = MPC" />
        </>
      );
    },
  },
  negative_externality: {
    title: "Negative Consumption Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC = S", color: COLORS.supply }, { label: "MPB = D", color: COLORS.mpb }, { label: "MSB", color: COLORS.demand }, { label: "Welfare Loss", color: COLORS.area }],
    examTips: [
      "MSB is below MPB — consumers ignore external costs to third parties",
      "Over-consumption in free market: Qₘ > Q*",
      "Welfare loss = triangle between MSB and MPC from Q* to Qₘ",
      "Policy: indirect tax = external cost per unit to internalise",
      "Show tax arrow between MPB and MSB at optimal quantity",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      const sL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      const mpbL = { x1: mx + pw * 0.18, y1: my + pad, x2: mx + pw - pad, y2: my + ph - pad };
      const msbL = { x1: mx + pad, y1: my + ph * 0.15, x2: mx + pw * 0.72, y2: my + ph - pad };

      const freeEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, mpbL.x1, mpbL.y1, mpbL.x2, mpbL.y2);
      const optEq = lineIntersect(sL.x1, sL.y1, sL.x2, sL.y2, msbL.x1, msbL.y1, msbL.x2, msbL.y2);

      // DWL vertex: MPC value at Qₘ
      const msbSlope = (msbL.y2 - msbL.y1) / (msbL.x2 - msbL.x1);
      const msbAtFreeX = msbL.y1 + msbSlope * (freeEq.x - msbL.x1);

      // External cost annotation at Q*: gap between MPB and MSB
      const mpbSlope = (mpbL.y2 - mpbL.y1) / (mpbL.x2 - mpbL.x1);
      const mpbAtOptX = mpbL.y1 + mpbSlope * (optEq.x - mpbL.x1);

      return (
        <>
          {/* Welfare loss triangle — RENDERED FIRST so it sits behind curves */}
          <WelfareRegion
            points={[
              { x: optEq.x, y: optEq.y },
              { x: freeEq.x, y: freeEq.y },
              { x: freeEq.x, y: msbAtFreeX },
            ]}
            fill="#ef4444"
            fillOpacity={0.45}
            strokeWidth={3}
            label="WL"
            labelSize={9}
          />
          {/* Curves rendered on top of welfare region */}
          <GLine {...sL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={sL.x2 - 8} y={sL.y2 - 6} text="S = MPC" color={COLORS.supply} />
          <GLine {...mpbL} color={COLORS.mpb} width={2} />
          <Label x={mpbL.x2 + 4} y={mpbL.y2 - 6} text="D = MPB" color={COLORS.mpb} />
          <GLine {...msbL} color={COLORS.demand} gradientId="grad-demand" dashed glow="glow-blue" />
          <Label x={msbL.x2 + 4} y={msbL.y2 - 6} text="MSB" color={COLORS.demand} />
          {/* Tax annotation arrow at Q* */}
          <line x1={optEq.x - 10} y1={optEq.y} x2={optEq.x - 10} y2={mpbAtOptX} stroke={COLORS.shifted} strokeWidth={2} markerEnd="url(#arrow-shifted)" markerStart="url(#arrow-shifted)" />
          <Label x={optEq.x - 16} y={(optEq.y + mpbAtOptX) / 2 + 3} text="Tax" color={COLORS.shifted} size={8} anchor="end" />
          {/* External cost bracket at Qₘ */}
          <line x1={freeEq.x + 8} y1={freeEq.y} x2={freeEq.x + 8} y2={msbAtFreeX} stroke="#ef4444" strokeWidth={1.5} opacity={0.6} />
          <Label x={freeEq.x + 14} y={(freeEq.y + msbAtFreeX) / 2 + 3} text="Ext. Cost" color="#ef4444" size={7} />
          <DashedToAxes x={freeEq.x} y={freeEq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="P₁" qLabel="Qₘ" />
          <PremiumDot x={freeEq.x} y={freeEq.y} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Over-consumption — Qₘ > Q*" />
          <DashedToAxes x={optEq.x} y={optEq.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEq.x} y={optEq.y} color={COLORS.shifted} label="Soc. Opt." gradientId="dot-amber"
            tooltipText="✓ Optimal where MSB = MPC" />
        </>
      );
    },
  },
  negative_production_externality: {
    title: "Negative Production Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC = S", color: COLORS.mpc }, { label: "MSC", color: COLORS.msc }, { label: "D = MPB = MSB", color: COLORS.demand }, { label: "Welfare Loss", color: "#ef4444" }],
    examTips: [
      "MSC is above MPC — producers ignore external costs (e.g. pollution)",
      "Overproduction in free market: Qₘ > Q*",
      "Welfare loss = triangle between MSC and MPC from Q* to Qₘ",
      "Tax = external cost per unit shifts MPC up to MSC",
      "Show the tax arrow between MPC and MSC at optimal quantity Q*",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      // MPC: upward sloping (private cost, lower)
      const mpcL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + ph * 0.15 };
      // MSC: upward sloping, above MPC (social cost higher)
      const mscL = { x1: mx + pw * 0.15, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      // D = MSB = MPB: downward sloping
      const dL = { x1: mx + pad, y1: my + pad + 5, x2: mx + pw - pad, y2: my + ph - pad };

      const freeEq = lineIntersect(mpcL.x1, mpcL.y1, mpcL.x2, mpcL.y2, dL.x1, dL.y1, dL.x2, dL.y2);
      const optEq = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, dL.x1, dL.y1, dL.x2, dL.y2);

      // DWL top vertex: MSC at freeEq.x
      const mscSlope = (mscL.y2 - mscL.y1) / (mscL.x2 - mscL.x1);
      const mscAtFreeX = mscL.y1 + mscSlope * (freeEq.x - mscL.x1);

      // Tax annotation: MPC at Q* (gap = external cost)
      const mpcSlope = (mpcL.y2 - mpcL.y1) / (mpcL.x2 - mpcL.x1);
      const mpcAtOptX = mpcL.y1 + mpcSlope * (optEq.x - mpcL.x1);

      return (
        <>
          {/* Welfare loss triangle — RENDERED FIRST so it sits behind curves */}
          <WelfareRegion
            points={[
              { x: optEq.x, y: optEq.y },
              { x: freeEq.x, y: freeEq.y },
              { x: freeEq.x, y: mscAtFreeX },
            ]}
            fill="#ef4444"
            fillOpacity={0.45}
            strokeWidth={3}
            label="WL"
            labelSize={9}
          />
          {/* Curves rendered on top of welfare region */}
          <GLine {...mpcL} color={COLORS.mpc} width={2.5} />
          <Label x={mpcL.x2 - 8} y={mpcL.y2 - 6} text="S = MPC" color={COLORS.mpc} />
          <GLine {...mscL} color={COLORS.msc} gradientId="grad-supply" dashed glow="glow-red" />
          <Label x={mscL.x2 + 4} y={mscL.y2 - 6} text="MSC" color={COLORS.msc} />
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D = MPB = MSB" color={COLORS.demand} />
          {/* Tax annotation arrow at Q* — vertical gap between MSC and MPC */}
          <line x1={optEq.x - 10} y1={optEq.y} x2={optEq.x - 10} y2={mpcAtOptX} stroke={COLORS.shifted} strokeWidth={2} markerEnd="url(#arrow-shifted)" markerStart="url(#arrow-shifted)" />
          <Label x={optEq.x - 16} y={(optEq.y + mpcAtOptX) / 2 + 3} text="Tax" color={COLORS.shifted} size={8} anchor="end" />
          {/* External cost bracket at Qₘ */}
          <line x1={freeEq.x + 8} y1={freeEq.y} x2={freeEq.x + 8} y2={mscAtFreeX} stroke="#ef4444" strokeWidth={1.5} opacity={0.6} />
          <Label x={freeEq.x + 14} y={(freeEq.y + mscAtFreeX) / 2 + 3} text="Ext. Cost" color="#ef4444" size={7} />
          <DashedToAxes x={freeEq.x} y={freeEq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="Pₘ" qLabel="Qₘ" />
          <PremiumDot x={freeEq.x} y={freeEq.y} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Over-produces at Qₘ" />
          <DashedToAxes x={optEq.x} y={optEq.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEq.x} y={optEq.y} color={COLORS.shifted} label="Soc. Opt." gradientId="dot-amber"
            tooltipText="✓ Optimal: MSC = MSB" />
        </>
      );
    },
  },
  positive_production_externality: {
    title: "Positive Production Externality",
    xAxis: "Quantity (Q)", yAxis: "Price / Cost / Benefit",
    legend: [{ label: "MPC = S", color: COLORS.supply }, { label: "MSC", color: COLORS.eq }, { label: "D = MPB = MSB", color: COLORS.demand }, { label: "Welfare Gain", color: COLORS.area }],
    examTips: [
      "MSC is below MPC — production generates external benefits (e.g. training)",
      "Under-production in free market: Qₘ < Q*",
      "Welfare gain triangle between Q* and Qₘ",
      "Policy: subsidy = external benefit per unit to shift MPC down to MSC",
      "Show subsidy arrow between MPC and MSC at optimal quantity",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;
      // MPC: upward sloping (private cost, higher)
      const mpcL = { x1: mx + pw * 0.15, y1: my + ph - pad, x2: mx + pw - pad, y2: my + pad };
      // MSC: upward sloping, BELOW MPC (social cost is lower due to ext. benefit)
      const mscL = { x1: mx + pad, y1: my + ph - pad, x2: mx + pw - pad, y2: my + ph * 0.15 };
      // D = MPB = MSB: downward sloping
      const dL = { x1: mx + pad, y1: my + pad + 5, x2: mx + pw - pad, y2: my + ph - pad };

      const freeEq = lineIntersect(mpcL.x1, mpcL.y1, mpcL.x2, mpcL.y2, dL.x1, dL.y1, dL.x2, dL.y2);
      const optEq = lineIntersect(mscL.x1, mscL.y1, mscL.x2, mscL.y2, dL.x1, dL.y1, dL.x2, dL.y2);

      // DWL bottom vertex: MSC at freeEq.x
      const mscSlope = (mscL.y2 - mscL.y1) / (mscL.x2 - mscL.x1);
      const mscAtFreeX = mscL.y1 + mscSlope * (freeEq.x - mscL.x1);

      // Subsidy annotation: MPC at Q* (gap = external benefit)
      const mpcSlope = (mpcL.y2 - mpcL.y1) / (mpcL.x2 - mpcL.x1);
      const mpcAtOptX = mpcL.y1 + mpcSlope * (optEq.x - mpcL.x1);

      return (
        <>
          {/* Welfare gain triangle — RENDERED FIRST so it sits behind curves */}
          <WelfareRegion
            points={[
              { x: freeEq.x, y: freeEq.y },
              { x: freeEq.x, y: mscAtFreeX },
              { x: optEq.x, y: optEq.y },
            ]}
            fill="#16a34a"
            fillOpacity={0.45}
            strokeWidth={3}
            label="WG"
            labelSize={9}
          />
          {/* Curves rendered on top of welfare region */}
          <GLine {...mpcL} color={COLORS.supply} gradientId="grad-supply" glow="glow-red" />
          <Label x={mpcL.x2 - 8} y={mpcL.y2 - 6} text="S = MPC" color={COLORS.supply} />
          <GLine {...mscL} color={COLORS.eq} width={2.5} dashed />
          <Label x={mscL.x2 + 4} y={mscL.y2 - 6} text="MSC" color={COLORS.eq} />
          <GLine {...dL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" />
          <Label x={dL.x2 + 4} y={dL.y2 - 6} text="D = MPB = MSB" color={COLORS.demand} />
          {/* Subsidy annotation arrow at Q* */}
          <line x1={optEq.x + 12} y1={mpcAtOptX} x2={optEq.x + 12} y2={optEq.y} stroke={COLORS.shifted} strokeWidth={2} markerEnd="url(#arrow-shifted)" markerStart="url(#arrow-shifted)" />
          <Label x={optEq.x + 18} y={(mpcAtOptX + optEq.y) / 2 + 3} text="Subsidy" color={COLORS.shifted} size={8} />
          {/* External benefit bracket at Qₘ */}
          <line x1={freeEq.x - 8} y1={freeEq.y} x2={freeEq.x - 8} y2={mscAtFreeX} stroke={COLORS.area} strokeWidth={1.5} opacity={0.6} />
          <Label x={freeEq.x - 14} y={(freeEq.y + mscAtFreeX) / 2 + 3} text="Ext. Benefit" color={COLORS.area} size={7} anchor="end" />
          <DashedToAxes x={freeEq.x} y={freeEq.y} mx={mx} ph={ph} my={my} color={COLORS.eq} pLabel="Pₘ" qLabel="Qₘ" />
          <PremiumDot x={freeEq.x} y={freeEq.y} color={COLORS.eq} label="Free Mkt" gradientId="dot-green"
            tooltipText="✓ Under-produces at Qₘ" />
          <DashedToAxes x={optEq.x} y={optEq.y} mx={mx} ph={ph} my={my} color={COLORS.shifted} pLabel="P*" qLabel="Q*" />
          <PremiumDot x={optEq.x} y={optEq.y} color={COLORS.shifted} label="Soc. Opt." gradientId="dot-amber"
            tooltipText="✓ Optimal: MSC = MSB" />
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

  /* ── SRAS Decrease / Supply-Side Shock ── */
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
          <PremiumDot x={eq1.x} y={eq1.y} color={COLORS.eq} label="" gradientId="dot-green" />
          <PremiumDot x={eq2.x} y={eq2.y} color={COLORS.shifted} label="" gradientId="dot-amber" />

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
          {/* Tax revenue area — closed polygon */}
          <WelfareRegion
            points={[
              { x: mx, y: eq2.y },
              { x: eq2.x, y: eq2.y },
              { x: eq2.x, y: prodPriceY },
              { x: mx, y: prodPriceY },
            ]}
            fill="#8b5cf6"
            fillOpacity={0.18}
            strokeWidth={1.5}
            label="Tax Rev."
            labelSize={8}
          />
          {/* Deadweight loss triangle */}
          <WelfareRegion
            points={[
              { x: eq2.x, y: eq2.y },
              { x: eq1.x, y: eq1.y },
              { x: eq2.x, y: prodPriceY },
            ]}
            fill="#ef4444"
            fillOpacity={0.30}
            strokeWidth={2.5}
            label="DWL"
            labelSize={8}
          />

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
    legend: [{ label: "MC", color: COLORS.eq }, { label: "Demand (AR)", color: COLORS.demand }, { label: "MR", color: COLORS.shifted }],
    examTips: [
      "Profit max at MC = MR — always state this rule",
      "Price read UP from Q₁ to the Demand (AR) curve, not MC",
      "Supernormal profit = shaded area (AR - AC) × Q",
      "AR is above MR because the monopolist is a price-maker",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      const pad = 10;

      // Demand (AR): downward sloping — dark blue like reference
      const arL = { x1: mx + pad + 5, y1: my + pad + 5, x2: mx + pw - pad, y2: my + ph - pad - 5 };
      // MR: steeper downward (same y-intercept, reaches x-axis at ~half quantity) — amber/yellow
      const mrL = { x1: mx + pad + 5, y1: my + pad + 5, x2: mx + pw * 0.52, y2: my + ph - pad - 5 };
      // MC: curved upward from bottom-left — green like reference
      const mcStartX = mx + pw * 0.12;
      const mcStartY = my + ph * 0.72;
      const mcMidX = mx + pw * 0.35;
      const mcMidY = my + ph * 0.48;
      const mcEndX = mx + pw * 0.72;
      const mcEndY = my + pad + 5;
      const mcPath = `M ${mcStartX} ${mcStartY} Q ${mcMidX} ${mcMidY + 15} ${mcMidX + 15} ${mcMidY} Q ${mcMidX + 35} ${mcMidY - 20} ${mcEndX} ${mcEndY}`;

      // Find MC=MR intersection (approximate: use the linear portion of MC near MR)
      // MC roughly passes through (mcMidX+15, mcMidY) and (mcEndX, mcEndY)
      const mcMrInt = lineIntersect(
        mcMidX, mcMidY + 8, mcEndX, mcEndY,
        mrL.x1, mrL.y1, mrL.x2, mrL.y2
      );

      // Price = read up from Q₁ to AR (demand) curve
      const arSlope = (arL.y2 - arL.y1) / (arL.x2 - arL.x1);
      const priceY = arL.y1 + arSlope * (mcMrInt.x - arL.x1);

      return (
        <>
          {/* Demand (AR) — blue */}
          <GLine {...arL} color={COLORS.demand} gradientId="grad-demand" glow="glow-blue" width={2.5} />
          <Label x={arL.x2 + 4} y={arL.y2 - 8} text="Demand" color={COLORS.demand} />
          {/* MR — amber */}
          <GLine {...mrL} color={COLORS.shifted} gradientId="grad-shifted" width={2.5} />
          <Label x={mrL.x2 + 4} y={mrL.y2 - 8} text="MR" color={COLORS.shifted} />
          {/* MC — green curve */}
          <CurvePath d={mcPath} color={COLORS.eq} width={2.5} glow="glow-green" />
          <Label x={mcEndX + 4} y={mcEndY + 4} text="MC" color={COLORS.eq} />
          {/* MC=MR intersection dot and label */}
          <PremiumDot x={mcMrInt.x} y={mcMrInt.y} color={COLORS.eq} label="MR = MC" labelPos="bl" gradientId="dot-green"
            tooltipText="✓ Profit max rule: produce where MC=MR" />
          {/* Projection lines: Q₁ down to x-axis, P₁ to y-axis via AR */}
          <DashedToAxes x={mcMrInt.x} y={priceY} mx={mx} ph={ph} my={my} color={COLORS.demand} pLabel="P₁" qLabel="Q₁" />
          {/* Price dot on AR */}
          <circle cx={mcMrInt.x} cy={priceY} r={3.5} fill={COLORS.demand} />
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

  /* ── Perfect Competition — Short-Run & Long-Run (4 panels) ── */
  perfect_competition: {
    title: "Perfect Competition — Short-Run & Long-Run",
    xAxis: "Output", yAxis: "Price / Costs",
    legend: [
      { label: "S / MC", color: COLORS.supply },
      { label: "D / AR=MR", color: COLORS.demand },
      { label: "ATC", color: "#8b5cf6" },
      { label: "Supernormal Profit", color: "#ef4444" },
    ],
    examTips: [
      "SR: P > ATC → supernormal profit attracts new firms into the market",
      "Entry of new firms shifts market supply right (S₁ → S₂) → price falls",
      "LR: P = min ATC → only normal profit — no incentive to enter or exit",
      "LR equilibrium: allocatively efficient (P = MC) AND productively efficient (min ATC)",
      "Always draw BOTH the market AND the firm diagram side by side",
    ],
    render: (p) => {
      const { mx, my, pw, ph } = p;
      // 4-panel layout: 2×2 grid
      const gap = 16;
      const halfW = (pw - gap) / 2;
      const halfH = (ph - gap) / 2;

      // Panel origins
      const p1x = mx, p1y = my;                      // Top-left: Market SR
      const p2x = mx + halfW + gap, p2y = my;        // Top-right: Firm SR
      const p3x = mx, p3y = my + halfH + gap;        // Bottom-left: Market LR
      const p4x = mx + halfW + gap, p4y = my + halfH + gap; // Bottom-right: Firm LR

      const pad = 6;
      const atcColor = "#8b5cf6";
      const mcColor = COLORS.supply; // cyan in ref but we use our system red/blue
      const arColor = "#06b6d4"; // cyan for AR=MR=D

      // ═══ Panel titles ═══
      const panelTitle = (x: number, y: number, text: string) => (
        <text x={x + halfW / 2} y={y - 3} textAnchor="middle" fontSize={8} fontWeight={700}
          fill="currentColor" opacity={0.55} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{text}</text>
      );

      // ═══ Mini axes ═══
      const miniAxes = (ox: number, oy: number, xLbl: string, yLbl: string) => (
        <>
          <line x1={ox} y1={oy} x2={ox} y2={oy + halfH} stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
          <line x1={ox} y1={oy + halfH} x2={ox + halfW} y2={oy + halfH} stroke="currentColor" strokeWidth={1.5} opacity={0.6} />
          <text x={ox - 8} y={oy + halfH / 2} textAnchor="middle" fontSize={7} fontWeight={600}
            transform={`rotate(-90 ${ox - 8} ${oy + halfH / 2})`} fill="currentColor" opacity={0.5}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{yLbl}</text>
          <text x={ox + halfW / 2} y={oy + halfH + 14} textAnchor="middle" fontSize={7} fontWeight={600}
            fill="currentColor" opacity={0.5} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{xLbl}</text>
        </>
      );

      // ═══ PANEL 1: Market S&D (Short-Run) ═══
      const s1 = { x1: p1x + pad, y1: p1y + halfH - pad, x2: p1x + halfW - pad, y2: p1y + pad };
      const d1 = { x1: p1x + pad, y1: p1y + pad, x2: p1x + halfW - pad, y2: p1y + halfH - pad };
      const eq1 = lineIntersect(s1.x1, s1.y1, s1.x2, s1.y2, d1.x1, d1.y1, d1.x2, d1.y2);
      const srPriceY = eq1.y; // The short-run market price

      // ═══ PANEL 2: Firm SR (MC, ATC, AR=MR=D horizontal at P₁) ═══
      const firmPad = pad;
      // ATC U-shape
      const atcMinX = p2x + halfW * 0.48;
      const atcMinY = srPriceY + 14; // ATC min BELOW price → supernormal profit
      const atcStartY = p2y + pad + 5;
      const atcEndY = p2y + pad + 12;
      const atcPath = `M ${p2x + firmPad + 8} ${atcStartY} Q ${atcMinX - 8} ${atcMinY + 4} ${atcMinX} ${atcMinY} Q ${atcMinX + 20} ${atcMinY - 6} ${p2x + halfW - firmPad} ${atcEndY}`;
      // MC steep curve crossing ATC at min
      const mcPath = `M ${p2x + firmPad + 15} ${p2y + halfH - pad - 8} Q ${atcMinX - 20} ${atcMinY + 12} ${atcMinX} ${atcMinY} Q ${atcMinX + 15} ${atcMinY - 18} ${p2x + halfW - firmPad - 5} ${p2y + pad}`;
      // AR=MR=D horizontal at market price
      const arY = srPriceY;
      // Profit-maximising Q: where MC = AR (find MC crossing the horizontal AR line)
      const profitQ = atcMinX + 8; // approximately where MC crosses AR
      // Supernormal profit rectangle: from ATC to AR, width = Q
      const profitLeft = p2x + halfW * 0.28;
      const profitRight = profitQ;

      // ═══ PANEL 3: Market LR (S₁ → S₂ shift right, price falls) ═══
      const s2offset = 30;
      const s2 = { x1: s1.x1 + s2offset, y1: s1.y1, x2: s1.x2 + s2offset, y2: s1.y2 };
      // Shift to panel 3 coordinates
      const s3_1 = { x1: p3x + pad, y1: p3y + halfH - pad, x2: p3x + halfW - pad, y2: p3y + pad };
      const d3 = { x1: p3x + pad, y1: p3y + pad, x2: p3x + halfW - pad, y2: p3y + halfH - pad };
      const s3_2 = { x1: s3_1.x1 + s2offset, y1: s3_1.y1, x2: s3_1.x2 + s2offset, y2: s3_1.y2 };
      const eq3_1 = lineIntersect(s3_1.x1, s3_1.y1, s3_1.x2, s3_1.y2, d3.x1, d3.y1, d3.x2, d3.y2);
      const eq3_2 = lineIntersect(s3_2.x1, s3_2.y1, s3_2.x2, s3_2.y2, d3.x1, d3.y1, d3.x2, d3.y2);
      const lrPriceY = eq3_2.y; // The long-run price (lower)

      // ═══ PANEL 4: Firm LR (MC, ATC, AR=MR at min ATC → normal profit) ═══
      const lrAtcMinX = p4x + halfW * 0.48;
      const lrAtcMinY = lrPriceY; // In LR, price = min ATC
      const lrAtcPath = `M ${p4x + firmPad + 8} ${p4y + pad + 5} Q ${lrAtcMinX - 8} ${lrAtcMinY + 4} ${lrAtcMinX} ${lrAtcMinY} Q ${lrAtcMinX + 20} ${lrAtcMinY - 6} ${p4x + halfW - firmPad} ${p4y + pad + 12}`;
      const lrMcPath = `M ${p4x + firmPad + 15} ${p4y + halfH - pad - 8} Q ${lrAtcMinX - 20} ${lrAtcMinY + 12} ${lrAtcMinX} ${lrAtcMinY} Q ${lrAtcMinX + 15} ${lrAtcMinY - 18} ${p4x + halfW - firmPad - 5} ${p4y + pad}`;

      return (
        <>
          {/* ── Panel 1: Market SR ── */}
          {panelTitle(p1x, p1y, "Market (Short Run)")}
          {miniAxes(p1x, p1y, "Output", "Price")}
          <GLine {...s1} color={COLORS.supply} width={2} />
          <Label x={s1.x2 + 2} y={s1.y2 + 2} text="S₁" color={COLORS.supply} size={9} />
          <GLine {...d1} color={COLORS.demand} width={2} />
          <Label x={d1.x2 + 2} y={d1.y2 - 4} text="D" color={COLORS.demand} size={9} />
          <circle cx={eq1.x} cy={eq1.y} r={3} fill={COLORS.eq} />
          {/* P₁ label */}
          <line x1={p1x} y1={eq1.y} x2={eq1.x} y2={eq1.y} stroke={COLORS.eq} strokeWidth={0.6} strokeDasharray="2,2" opacity={0.5} />
          <text x={p1x - 3} y={eq1.y + 3} textAnchor="end" fontSize={7} fontWeight={700} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>P₁</text>

          {/* ── Panel 2: Firm SR ── */}
          {panelTitle(p2x, p2y, "Firm (Short Run)")}
          {miniAxes(p2x, p2y, "Output", "Costs")}
          {/* Supernormal profit area (red rectangle) */}
          <rect x={profitLeft} y={arY} width={profitRight - profitLeft} height={atcMinY - arY}
            fill="#ef4444" fillOpacity={0.25} stroke="#ef4444" strokeWidth={1} strokeOpacity={0.4} />
          <text x={(profitLeft + profitRight) / 2} y={(arY + atcMinY) / 2 + 3} textAnchor="middle"
            fontSize={6} fontWeight={700} fill="#ef4444" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Supernormal Profit
          </text>
          <CurvePath d={mcPath} color={arColor} width={2.5} />
          <Label x={p2x + halfW - firmPad} y={p2y + pad + 8} text="MC" color={arColor} size={9} />
          <CurvePath d={atcPath} color={atcColor} width={2} />
          <Label x={p2x + halfW - firmPad} y={atcEndY + 8} text="ATC" color={atcColor} size={9} />
          {/* AR = MR = D horizontal */}
          <GLine x1={p2x + firmPad} y1={arY} x2={p2x + halfW - firmPad} y2={arY} color={arColor} width={1.5} />
          <Label x={p2x + halfW - firmPad + 2} y={arY - 2} text="AR=MR=D" color={arColor} size={7} />

          {/* ── Panel 3: Market LR ── */}
          {panelTitle(p3x, p3y, "Market (Long Run)")}
          {miniAxes(p3x, p3y, "Output", "Price")}
          <GLine {...s3_1} color={COLORS.supply} width={1.5} dashed />
          <Label x={s3_1.x2 + 2} y={s3_1.y2 + 2} text="S₁" color={COLORS.supply} size={8} />
          <GLine {...s3_2} color={COLORS.supply} width={2} />
          <Label x={s3_2.x2 + 2} y={s3_2.y2 + 2} text="S₂" color={COLORS.supply} size={9} />
          <GLine {...d3} color={COLORS.demand} width={2} />
          <Label x={d3.x2 + 2} y={d3.y2 - 4} text="D" color={COLORS.demand} size={9} />
          {/* Shift arrow */}
          <ShiftArrow x1={eq3_1.x} y1={eq3_1.y} x2={eq3_2.x} y2={eq3_2.y} color={COLORS.shifted} />
          <circle cx={eq3_1.x} cy={eq3_1.y} r={2.5} fill={COLORS.lras} />
          <circle cx={eq3_2.x} cy={eq3_2.y} r={3} fill={COLORS.eq} />
          {/* Price labels */}
          <line x1={p3x} y1={eq3_1.y} x2={eq3_1.x} y2={eq3_1.y} stroke={COLORS.lras} strokeWidth={0.6} strokeDasharray="2,2" opacity={0.4} />
          <text x={p3x - 3} y={eq3_1.y + 3} textAnchor="end" fontSize={7} fontWeight={600} fill={COLORS.lras}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>P₂</text>
          <line x1={p3x} y1={eq3_2.y} x2={eq3_2.x} y2={eq3_2.y} stroke={COLORS.eq} strokeWidth={0.6} strokeDasharray="2,2" opacity={0.5} />
          <text x={p3x - 3} y={eq3_2.y + 3} textAnchor="end" fontSize={7} fontWeight={700} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>P₁</text>

          {/* ── Panel 4: Firm LR ── */}
          {panelTitle(p4x, p4y, "Firm (Long Run)")}
          {miniAxes(p4x, p4y, "Output", "Costs")}
          <CurvePath d={lrMcPath} color={arColor} width={2.5} />
          <Label x={p4x + halfW - firmPad} y={p4y + pad + 8} text="MC" color={arColor} size={9} />
          <CurvePath d={lrAtcPath} color={atcColor} width={2} />
          <Label x={p4x + halfW - firmPad} y={p4y + pad + 20} text="ATC" color={atcColor} size={9} />
          {/* AR = MR = D at min ATC (normal profit) */}
          <GLine x1={p4x + firmPad} y1={lrPriceY} x2={p4x + halfW - firmPad} y2={lrPriceY} color={arColor} width={1.5} />
          <Label x={p4x + halfW - firmPad + 2} y={lrPriceY - 2} text="AR=MR=D" color={arColor} size={7} />
          {/* Normal profit dot */}
          <circle cx={lrAtcMinX} cy={lrAtcMinY} r={3.5} fill={COLORS.eq} />
          <text x={lrAtcMinX + 6} y={lrAtcMinY - 6} fontSize={7} fontWeight={700} fill={COLORS.eq}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Normal Profit</text>
          {/* Dashed line down from LR eq */}
          <line x1={lrAtcMinX} y1={lrAtcMinY} x2={lrAtcMinX} y2={p4y + halfH} stroke={COLORS.eq} strokeWidth={0.6} strokeDasharray="2,2" opacity={0.4} />
        </>
      );
    },
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
          <circle cx={eq.x} cy={eq.y} r={3.5} fill={COLORS.supply} />
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
          <circle cx={firmQ1X} cy={wageY} r={3} fill={COLORS.eq} />
          <text x={firmQ1X} y={p2y + fullH + 12} textAnchor="middle" fontSize={8} fontWeight={700} fill="currentColor" opacity={0.7}
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Q₁</text>
        </>
      );
    },
  },
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
  "lras_shift": "sras_decrease",
  "deflationary_gap": "sras_decrease",
  "recessionary_gap": "sras_decrease",
  "monetarist": "sras_decrease",
  "supply_side_shock": "sras_decrease",
  "supply_shock": "sras_decrease",
  "negative_supply_shock": "sras_decrease",
  "stagflation": "sras_decrease",
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
  "tariff": "trade_quota",
  "trade": "trade_quota",
  "world_supply": "trade_quota",
  "trade_diagram": "trade_quota",
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
  "demand_shift": "demand_increase",
  "supply_shift": "supply_increase",
  "increase_in_demand": "demand_increase",
  "decrease_in_demand": "demand_decrease",
  "increase_in_supply": "supply_increase",
  "decrease_in_supply": "supply_decrease",
  "shift_in_demand": "demand_increase",
  "shift_in_supply": "supply_increase",
};

export function resolveDiagramType(raw: string, shiftHint?: string): DiagramType | null {
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_").replace(/[^a-z0-9_]/g, "");
  if (key in DIAGRAMS) return key as DiagramType;
  if (key in ALIASES) return ALIASES[key] as DiagramType;

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
    // Macro
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
    [["quota"], "trade_quota"],
    [["tariff"], "trade_quota"],
    [["trade", "diagram"], "trade_quota"],
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
