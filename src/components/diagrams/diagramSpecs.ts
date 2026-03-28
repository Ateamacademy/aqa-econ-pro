/**
 * DIAGRAM_SPECS — Declarative config objects for all economics diagrams.
 *
 * Each diagram is described as a pure data object:
 *   - curves: what lines to draw (linear, vertical, horizontal, quadratic, piecewise)
 *   - equilibria: which curve intersections to compute (NEVER hardcoded)
 *   - shading: welfare loss/gain regions defined by curve intersections
 *   - axisLabels: x and y axis text
 *   - notes: human-readable economics explanation
 *
 * The renderDiagram() function in DiagramSpecRenderer.tsx consumes these specs.
 * NO diagram-specific code should touch SVG coordinates directly.
 */

/* ══════════════════════════════════════════════
   Curve types — all operate in DATA SPACE (0–10)
   ══════════════════════════════════════════════ */

export interface LinearCurve {
  type: "linear";
  /** y = slope * x + intercept  (data space 0–10) */
  slope: number;
  intercept: number;
}

export interface VerticalCurve {
  type: "vertical";
  /** x position in data space */
  x: number;
}

export interface HorizontalCurve {
  type: "horizontal";
  /** y position in data space */
  y: number;
}

export interface QuadraticCurve {
  type: "quadratic";
  /** y = a*x² + b*x + c  (data space) */
  a: number;
  b: number;
  c: number;
}

export interface PiecewiseCurve {
  type: "piecewise";
  /** Ordered segments. Each segment is a mini-curve definition with explicit x range. */
  segments: Array<{
    xFrom: number;
    xTo: number;
    curve: LinearCurve | QuadraticCurve;
  }>;
}

export type CurveParams = LinearCurve | VerticalCurve | HorizontalCurve | QuadraticCurve | PiecewiseCurve;

export interface CurveSpec {
  id: string;
  label: string;
  params: CurveParams;
  color: string;
  dash?: boolean;
  /** Width override (default 2.5) */
  width?: number;
  /** For shifted curves: the id of the original curve (draws shift arrow) */
  shiftedFrom?: string;
}

/* ══════════════════════════════════════════════
   Equilibrium — always computed via intersection
   ══════════════════════════════════════════════ */

export interface EquilibriumSpec {
  id: string;
  label: string;
  /** First curve id to intersect */
  curve1: string;
  /** Second curve id to intersect */
  curve2: string;
  color: string;
  pLabel: string;
  qLabel: string;
  /** Optional hover tooltip */
  tooltip?: string;
  /** Label position relative to dot */
  labelPos?: "tr" | "tl" | "br" | "bl";
}

/* ══════════════════════════════════════════════
   Shading regions — vertices from curve intersections
   ══════════════════════════════════════════════ */

/**
 * A vertex can reference:
 *   - An equilibrium point: { eq: "E1" }
 *   - A point on a curve at the x-value of an equilibrium: { curve: "MPC", atEqX: "E2" }
 *   - A point on a curve at a fixed x: { curve: "MPC", atX: 5 }
 *   - A raw data-space point: { x: 3, y: 5 }
 */
export type VertexRef =
  | { eq: string }
  | { curve: string; atEqX: string }
  | { curve: string; atX: number }
  | { x: number; y: number };

export interface ShadingSpec {
  type: "triangle" | "polygon";
  vertices: VertexRef[];
  color: string;
  opacity?: number;
  strokeColor?: string;
  strokeDash?: boolean;
  label?: string;
  labelColor?: string;
}

/* ══════════════════════════════════════════════
   Annotation — free text at computed positions
   ══════════════════════════════════════════════ */

export interface AnnotationSpec {
  text: string;
  /** Position: either a raw data-space point or relative to an equilibrium */
  position: { x: number; y: number } | { eq: string; dx?: number; dy?: number };
  color: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}

/* ══════════════════════════════════════════════
   Full Diagram Spec
   ══════════════════════════════════════════════ */

export interface DiagramSpec {
  title: string;
  axisLabels: { x: string; y: string };
  curves: CurveSpec[];
  equilibria: EquilibriumSpec[];
  shading?: ShadingSpec[];
  annotations?: AnnotationSpec[];
  legend?: Array<{ label: string; color: string }>;
  /** Human-readable economics note */
  notes?: string;
  /** Exam tips for the diagram */
  examTips?: string[];
  /** Sanity checks: assertions that must hold. Logs console.error if violated. */
  sanityChecks?: SanityCheck[];
}

export interface SanityCheck {
  /** e.g. "Qm < Qopt" */
  description: string;
  /** Equilibrium ids to compare */
  check: { eq1: string; eq2: string; axis: "x" | "y"; relation: "<" | ">" | "=" };
}

/* ══════════════════════════════════════════════
   COLOR CONSTANTS
   ══════════════════════════════════════════════ */

const C = {
  demand: "#ef4444",
  supply: "#3b82f6",
  shifted: "#f59e0b",
  eq: "#16a34a",
  area: "#8b5cf6",
  msc: "#ef4444",
  msb: "#3b82f6",
  mpb: "#93c5fd",
  mpc: "#fca5a5",
  lras: "#6b7280",
  orange: "#f97316",
  gold: "#eab308",
};

/* ══════════════════════════════════════════════
   DIAGRAM_SPECS — the canonical registry
   ══════════════════════════════════════════════ */

export const DIAGRAM_SPECS: Record<string, DiagramSpec> = {
  /* ── Supply & Demand ── */
  supply_demand: {
    title: "Supply & Demand Equilibrium",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Always label equilibrium clearly with E₁" },
    ],
    legend: [{ label: "Demand", color: C.demand }, { label: "Supply", color: C.supply }, { label: "Equilibrium", color: C.eq }],
    notes: "Basic market equilibrium where demand meets supply. Price and quantity are determined by the intersection.",
    examTips: [
      "Always label both axes: Price (P) on Y, Quantity (Q) on X",
      "Mark the equilibrium point clearly as E with dashed lines to both axes",
      "Label curves at the end: D for demand, S for supply",
      "Include origin 'O' at the intersection of axes",
    ],
  },

  demand_increase: {
    title: "Increase in Demand",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "D2", label: "D₂", params: { type: "linear", slope: -0.8, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "D1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
      { id: "E2", label: "E₂", curve1: "D2", curve2: "S1", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ D↑ → higher P & Q" },
    ],
    legend: [{ label: "Demand", color: C.demand }, { label: "Supply", color: C.supply }, { label: "Shift →", color: C.shifted }],
    notes: "Demand shifts right due to higher incomes, advertising, or changes in tastes. Both price and quantity rise.",
    examTips: [
      "Show the original D₁ and shifted D₂ clearly",
      "Use an arrow to indicate direction of the shift",
      "Mark both E₁ and E₂ with corresponding P and Q values",
      "State the cause of the shift in your written answer",
    ],
  },

  demand_decrease: {
    title: "Decrease in Demand",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "D2", label: "D₂", params: { type: "linear", slope: -0.8, intercept: 7.5 }, color: C.demand, dash: true, shiftedFrom: "D1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
      { id: "E2", label: "E₂", curve1: "D2", curve2: "S1", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ D↓ → lower P & Q" },
    ],
    legend: [{ label: "Demand", color: C.demand }, { label: "Supply", color: C.supply }, { label: "Shift ←", color: C.shifted }],
    notes: "Demand shifts left due to falling incomes, change in preferences, or fall in price of substitutes.",
    examTips: [
      "D₂ shifts LEFT — closer to origin",
      "Price falls from P₁ to P₂, quantity falls from Q₁ to Q₂",
      "Always draw dashed projection lines to both axes",
    ],
  },

  supply_increase: {
    title: "Increase in Supply",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ S↑ → lower P, higher Q" },
    ],
    legend: [{ label: "Demand", color: C.demand }, { label: "Supply", color: C.supply }, { label: "Shift →", color: C.shifted }],
    notes: "Supply shifts right due to lower costs, better technology, or more suppliers entering the market.",
    examTips: [
      "Supply shifts RIGHT — more supplied at every price",
      "Price falls, quantity rises — show both changes clearly",
      "Common causes: technology improvement, lower input costs",
    ],
  },

  supply_decrease: {
    title: "Decrease in Supply",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "✓ Initial equilibrium" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "✓ S↓ → higher P, lower Q" },
    ],
    legend: [{ label: "Demand", color: C.demand }, { label: "Supply", color: C.supply }, { label: "Shift ←", color: C.shifted }],
    notes: "Supply shifts left due to higher input costs, taxes, or supply chain disruption.",
    examTips: [
      "Supply shifts LEFT — less supplied at every price",
      "Price rises, quantity falls",
      "Common causes: higher costs of production, indirect taxes",
    ],
  },

  /* ── Externalities ── */
  positive_externality: {
    title: "Positive Externality of Consumption",
    axisLabels: { x: "Quantity", y: "Benefit / Cost / Price" },
    curves: [
      { id: "MSC", label: "MSC = MPC", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "MPB", label: "MPB", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand, width: 2 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "MSC", curve2: "MPB", color: C.eq, pLabel: "p", qLabel: "q", tooltip: "Free market: MPB = MPC" },
      { id: "B", label: "B", curve1: "MSC", curve2: "MSB", color: C.shifted, pLabel: "p₁", qLabel: "q₁", tooltip: "Social optimum: MSB = MSC" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { curve: "MSB", atEqX: "E" },
          { eq: "B" },
          { eq: "E" },
        ],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare Loss",
      },
    ],
    legend: [{ label: "MSC = MPC", color: C.supply }, { label: "MSB", color: C.demand }, { label: "MPB", color: C.demand }, { label: "Welfare Loss", color: C.demand }],
    notes: "MSC = MPC — no external costs. MSB > MPB — consumption generates external benefits. Underconsumption at free market outcome.",
    examTips: [
      "MSC = MPC — no external costs in production",
      "MSB is above MPB — consumption generates external benefits to third parties",
      "Free market outcome where MPB = MPC: point E at (q, p)",
      "Socially optimal outcome where MSB = MSC: point B at (q₁, p₁)",
      "Underconsumption of q₁ − q. Welfare loss ABE",
    ],
  },

  negative_externality: {
    title: "Negative Externality of Consumption",
    axisLabels: { x: "Quantity", y: "Benefit / Cost / Price" },
    curves: [
      { id: "MSC", label: "MSC = MPC", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MPB", label: "MPB", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand, width: 2 },
    ],
    equilibria: [
      { id: "B", label: "B", curve1: "MSC", curve2: "MPB", color: C.eq, pLabel: "p", qLabel: "q", tooltip: "Free market: MPB = MPC" },
      { id: "E", label: "E", curve1: "MSC", curve2: "MSB", color: C.shifted, pLabel: "p₁", qLabel: "q₁", tooltip: "Social optimum: MSB = MSC" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { curve: "MSB", atEqX: "B" },
          { eq: "B" },
          { eq: "E" },
        ],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare Loss",
      },
    ],
    legend: [{ label: "MSC = MPC", color: C.supply }, { label: "MPB", color: C.demand }, { label: "MSB", color: C.demand }, { label: "Welfare Loss", color: C.demand }],
    notes: "MSC = MPC — no external costs in production. MSB < MPB — consumers ignore harm to third parties. Overconsumption at free market.",
    examTips: [
      "MSC = MPC — no external costs in production",
      "MSB is below MPB — consumers ignore harm to third parties (demerit goods)",
      "Free market outcome where MPB = MPC: overconsumption",
      "Socially optimal outcome where MSB = MSC: point E",
      "Overconsumption of q − q₁. Welfare loss ABE",
    ],
  },

  negative_production_externality: {
    title: "Negative Externality of Production",
    axisLabels: { x: "Quantity", y: "Benefit / Cost / Price" },
    curves: [
      { id: "MPC", label: "MPC", params: { type: "linear", slope: 0.6, intercept: 1.5 }, color: C.demand },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.supply },
      { id: "D", label: "MPB = MSB", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "MPC", curve2: "D", color: C.eq, pLabel: "p", qLabel: "q", tooltip: "Free market: MPC = MPB" },
      { id: "B", label: "B", curve1: "MSC", curve2: "D", color: C.shifted, pLabel: "p₁", qLabel: "q₁", tooltip: "Social optimum: MSC = MSB" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { curve: "MSC", atEqX: "E" },
          { eq: "E" },
          { eq: "B" },
        ],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare Loss",
      },
    ],
    legend: [{ label: "MSC", color: C.supply }, { label: "MPC", color: C.demand }, { label: "MPB = MSB", color: C.demand }, { label: "Welfare Loss", color: C.demand }],
    notes: "MSC > MPC — producers ignore external costs (e.g. pollution). Overproduction at free market.",
    examTips: [
      "MSC is above MPC — producers ignore external costs",
      "Free market produces where MPB = MPC: overproduction",
      "Socially optimal outcome where MSC = MSB",
      "Overproduction of q − q₁. Welfare loss ABE",
    ],
  },

  positive_production_externality: {
    title: "Positive Externality of Production",
    axisLabels: { x: "Quantity (Q)", y: "Benefit / Cost / Price" },
    curves: [
      { id: "MPB", label: "MPB = MSB = D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply },
      { id: "MPC", label: "S = MPC", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.demand },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.4, intercept: 0.5 }, color: C.orange },
    ],
    equilibria: [
      { id: "Emkt", label: "Market eq", curve1: "MPB", curve2: "MPC", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "Free market: MPB = MPC → under-production" },
      { id: "Eopt", label: "Social optimum", curve1: "MPB", curve2: "MSC", color: C.gold, pLabel: "Popt", qLabel: "Qopt", tooltip: "Social optimum: MPB = MSC → more output" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { eq: "Emkt" },
          { eq: "Eopt" },
          { curve: "MPC", atEqX: "Eopt" },
        ],
        color: C.orange,
        opacity: 0.18,
        strokeColor: C.orange,
        strokeDash: true,
        label: "Welfare Loss",
      },
    ],
    sanityChecks: [
      { description: "Qm < Qopt (under-production)", check: { eq1: "Emkt", eq2: "Eopt", axis: "x", relation: "<" } },
      { description: "Pm > Popt", check: { eq1: "Emkt", eq2: "Eopt", axis: "y", relation: ">" } },
    ],
    legend: [
      { label: "S = MPC", color: C.demand },
      { label: "MSC", color: C.orange },
      { label: "MPB = MSB = Demand", color: C.supply },
      { label: "Welfare Loss", color: C.orange },
    ],
    notes: "MSC < MPC — production generates external benefits. Free market under-produces relative to social optimum.",
    examTips: [
      "MSC is BELOW MPC — production generates external benefits",
      "Free market: MPB ∩ MPC → Qm (under-produces)",
      "Social optimum: MPB ∩ MSC → Qopt (more output is desirable)",
      "Welfare loss triangle between market eq, social optimum, and MPC at Qopt",
    ],
  },

  /* ── Macro: AD/AS ── */
  ad_increase: {
    title: "Increase in Aggregate Demand",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 6.5 }, color: C.lras },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.8, intercept: 7.5 }, color: C.supply },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply, dash: true, shiftedFrom: "AD1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "SRAS", curve2: "AD1", color: C.eq, pLabel: "PL₁", qLabel: "Y₁", tooltip: "✓ Label initial equilibrium clearly" },
      { id: "E2", label: "E₂", curve1: "SRAS", curve2: "AD2", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂", tooltip: "✓ AD↑ → higher PL & real GDP" },
    ],
    legend: [{ label: "AD", color: C.supply }, { label: "SRAS", color: C.demand }, { label: "LRAS", color: C.lras }],
    notes: "AD shifts right due to increased C, I, G, or X-M. Price level rises and real GDP increases.",
    examTips: [
      "LRAS is vertical at Yf (full employment output)",
      "AD shifts RIGHT — demand-pull inflation if near Yf",
      "Show both equilibria E₁ and E₂ with PL and Y values",
    ],
  },

  ad_decrease: {
    title: "Decrease in Aggregate Demand",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 6.5 }, color: C.lras },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.8, intercept: 7.5 }, color: C.supply, dash: true, shiftedFrom: "AD1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "SRAS", curve2: "AD1", color: C.eq, pLabel: "PL₁", qLabel: "Y₁", tooltip: "✓ Initial equilibrium before AD↓" },
      { id: "E2", label: "E₂", curve1: "SRAS", curve2: "AD2", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂", tooltip: "✓ AD↓ → lower PL & GDP (recession)" },
    ],
    legend: [{ label: "AD", color: C.supply }, { label: "SRAS", color: C.demand }, { label: "LRAS", color: C.lras }],
    notes: "AD shifts left — deflationary pressure. Real GDP falls, risk of demand-deficient unemployment.",
    examTips: [
      "AD shifts LEFT — deflationary pressure",
      "Real GDP falls, price level falls",
      "Risk of demand-deficient (cyclical) unemployment",
    ],
  },

  sras_increase: {
    title: "Increase in SRAS (Positive Supply Shock)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 6.5 }, color: C.lras },
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.8, intercept: 8.5 }, color: C.supply },
      { id: "SRAS1", label: "SRAS₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "SRAS2", label: "SRAS₂", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.demand, dash: true, shiftedFrom: "SRAS1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "SRAS1", curve2: "AD", color: C.eq, pLabel: "PL₁", qLabel: "Y₁", tooltip: "✓ Initial equilibrium" },
      { id: "E2", label: "E₂", curve1: "SRAS2", curve2: "AD", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂", tooltip: "✓ SRAS↑ → lower PL & higher GDP" },
    ],
    legend: [{ label: "SRAS", color: C.demand }, { label: "AD", color: C.supply }, { label: "LRAS", color: C.lras }],
    notes: "SRAS shifts right due to lower costs. Price level falls, real GDP rises — non-inflationary growth.",
    examTips: [
      "SRAS shifts RIGHT — lower costs of production",
      "Price level falls AND real GDP rises — non-inflationary growth",
      "Key causes: lower oil prices, better technology, deregulation",
    ],
  },

  sras_decrease: {
    title: "Supply Side Shock",
    axisLabels: { x: "Real Output", y: "Price Level" },
    curves: [
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 5.5 }, color: C.lras },
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.8, intercept: 8.5 }, color: C.supply },
      { id: "SRAS1", label: "SRAS₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "SRAS2", label: "SRAS₂", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.demand, dash: true, shiftedFrom: "SRAS1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "SRAS1", curve2: "AD", color: C.eq, pLabel: "P₁", qLabel: "Y₁", tooltip: "✓ Initial equilibrium at Yfe" },
      { id: "E2", label: "E₂", curve1: "SRAS2", curve2: "AD", color: C.shifted, pLabel: "P₂", qLabel: "Y₂", tooltip: "✓ Stagflation: higher PL, lower Y" },
    ],
    legend: [{ label: "SRAS", color: C.demand }, { label: "AD", color: C.supply }, { label: "LRAS", color: C.lras }],
    notes: "SRAS shifts left — higher costs. Stagflation: price level rises AND real output falls.",
    examTips: [
      "NEGATIVE SHIFT from SRAS₁ to SRAS₂ — higher costs of production",
      "Price level rises AND real output falls — stagflation",
      "Key causes: oil price shocks, rising wages, supply chain disruption",
    ],
  },

  /* ── Tax Incidence ── */
  tax_incidence: {
    title: "Effect of an Indirect Tax (Ad Valorem)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D1", label: "D1", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply },
      { id: "S1", label: "S1", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "S2", label: "S1 + Tax", params: { type: "linear", slope: 0.8, intercept: 2.8 }, color: C.shifted, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P1", qLabel: "Q1", tooltip: "✓ Pre-tax equilibrium" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P2", qLabel: "Q2", tooltip: "✓ After tax: higher P, lower Q" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { eq: "E2" },
          { eq: "E1" },
          { curve: "S1", atEqX: "E2" },
        ],
        color: C.demand,
        opacity: 0.4,
        label: "Welfare loss",
      },
    ],
    legend: [{ label: "D1", color: C.supply }, { label: "S1", color: C.demand }, { label: "S1 + Tax", color: C.shifted }, { label: "Welfare loss", color: C.demand }],
    notes: "Tax shifts supply left/up. Price rises, quantity falls. Welfare loss triangle between old and new equilibrium.",
    examTips: [
      "Supply shifts LEFT/UP by the amount of the tax per unit",
      "Welfare loss triangle between old and new equilibrium",
      "Price rises from P1 to P2, quantity falls from Q1 to Q2",
    ],
  },

  /* ── LRAS Shift ── */
  lras_shift: {
    title: "LRAS Shift Right — Long-Run Growth",
    axisLabels: { x: "Real GDP", y: "Price Level" },
    curves: [
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 4 }, color: C.lras },
      { id: "LRAS1", label: "LRAS₁", params: { type: "vertical", x: 6.5 }, color: C.eq, shiftedFrom: "LRAS" },
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "LRAS", curve2: "AD", color: C.lras, pLabel: "PL", qLabel: "Y", labelPos: "tl" },
      { id: "E1", label: "E₁", curve1: "LRAS1", curve2: "AD", color: C.eq, pLabel: "PL₁", qLabel: "Y₁", labelPos: "tr" },
    ],
    legend: [{ label: "LRAS", color: C.lras }, { label: "LRAS₁", color: C.eq }, { label: "AD", color: C.supply }],
    notes: "LRAS shifts right due to productivity or technology improvements. Higher real GDP and lower price level.",
    examTips: ["LRAS shifts right due to productivity/technology improvements", "Higher real GDP and lower price level"],
  },

  /* ── Exchange Rate ── */
  exchange_rate: {
    title: "Currency Market — Exchange Rate",
    axisLabels: { x: "Quantity of £", y: "Exchange Rate ($/£)" },
    curves: [
      { id: "S1", label: "S£", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "D1", label: "D£", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply },
      { id: "S2", label: "S£₁", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.shifted, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "S1", curve2: "D1", color: C.eq, pLabel: "e₁", qLabel: "Q₁", labelPos: "tl" },
      { id: "E1", label: "E₁", curve1: "S2", curve2: "D1", color: C.shifted, pLabel: "e₂", qLabel: "Q₂", labelPos: "tr", tooltip: "£ depreciates" },
    ],
    legend: [{ label: "S£", color: C.demand }, { label: "D£", color: C.supply }, { label: "S£₁", color: C.shifted }],
    notes: "D for £ = foreigners buying UK exports. S of £ = UK residents buying imports. S shifts right → £ depreciates.",
    examTips: [
      "D for £ = foreigners buying UK exports",
      "S of £ = UK residents buying imports",
      "S shifts right → £ depreciates",
    ],
  },

  /* ── Crowding Out ── */
  crowding_out: {
    title: "Crowding Out",
    axisLabels: { x: "Quantity of loanable funds", y: "Interest Rate" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "D1", label: "D (Private)", params: { type: "linear", slope: -0.9, intercept: 7.5 }, color: C.supply },
      { id: "D2", label: "D (Priv+Pub)", params: { type: "linear", slope: -0.9, intercept: 9.5 }, color: C.shifted, shiftedFrom: "D1" },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "S", curve2: "D1", color: C.supply, pLabel: "r", qLabel: "Q", labelPos: "tl" },
      { id: "E1", label: "E₁", curve1: "S", curve2: "D2", color: C.shifted, pLabel: "r₁", qLabel: "Q₁", labelPos: "tr" },
    ],
    legend: [{ label: "D (Private)", color: C.supply }, { label: "D (Priv+Pub)", color: C.shifted }, { label: "S", color: C.demand }],
    notes: "Higher G raises demand for funds → interest rate rises → private spending falls. Reduces fiscal multiplier.",
    examTips: [
      "Higher G raises demand for funds",
      "Interest rate rises r→r₁",
      "Private spending falls (crowded out)",
    ],
  },

  /* ── Multiplier Effect ── */
  multiplier_effect: {
    title: "AD Shift with Multiplier Effect",
    axisLabels: { x: "Real GDP", y: "Price Level" },
    curves: [
      { id: "AS", label: "AS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.demand },
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.9, intercept: 7.5 }, color: C.supply },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.9, intercept: 10 }, color: C.shifted, shiftedFrom: "AD" },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "AS", curve2: "AD", color: C.lras, pLabel: "PL", qLabel: "Y", labelPos: "tl" },
      { id: "E2", label: "E₂", curve1: "AS", curve2: "AD2", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂", labelPos: "tr" },
    ],
    legend: [{ label: "AS", color: C.demand }, { label: "AD → AD₂", color: C.supply }, { label: "Multiplier", color: C.shifted }],
    notes: "Initial G↑ shifts AD right. Multiplier causes larger shift. Final GDP increase > initial injection.",
    examTips: ["Initial G↑ shifts AD right", "Multiplier causes second larger shift", "Final GDP increase > initial injection", "Multiplier = 1/(1−MPC)"],
  },

  /* ── Pollution Permits ── */
  pollution_permits: {
    title: "Pollution Permits — Tradeable Emissions",
    axisLabels: { x: "Quantity of Permits", y: "Price of Permits" },
    curves: [
      { id: "S1", label: "S", params: { type: "vertical", x: 5.5 }, color: C.demand },
      { id: "S2", label: "S₁", params: { type: "vertical", x: 3.5 }, color: C.shifted, shiftedFrom: "S1" },
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "S1", curve2: "D", color: C.demand, pLabel: "p", qLabel: "q", labelPos: "tr" },
      { id: "E1", label: "E₁", curve1: "S2", curve2: "D", color: C.shifted, pLabel: "p₁", qLabel: "q₁", labelPos: "tl" },
    ],
    legend: [{ label: "S (fixed)", color: C.demand }, { label: "S₁ (reduced)", color: C.shifted }, { label: "D", color: C.supply }],
    notes: "Supply perfectly inelastic — set by govt. Reducing permits → S left → higher price. Market-based incentive to cut emissions.",
    examTips: [
      "Supply perfectly inelastic — set by govt",
      "Reducing permits → S left → higher price",
      "Market-based incentive to cut emissions",
    ],
  },

  /* ── Monopsony ── */
  monopsony: {
    title: "Monopsony — Dominant Employer",
    axisLabels: { x: "Quantity of Labour", y: "Wage / Costs" },
    curves: [
      { id: "ACL", label: "S=ACL", params: { type: "linear", slope: 0.6, intercept: 1.5 }, color: C.demand },
      { id: "MCL", label: "MCL", params: { type: "linear", slope: 1.2, intercept: 1.5 }, color: C.shifted },
      { id: "MRPL", label: "D=MRPL", params: { type: "linear", slope: -0.7, intercept: 8.5 }, color: C.supply },
    ],
    equilibria: [
      { id: "Ecomp", label: "Competitive", curve1: "ACL", curve2: "MRPL", color: C.eq, pLabel: "W", qLabel: "Q", labelPos: "tr", tooltip: "✓ Competitive wage" },
      { id: "Emon", label: "Monopsony", curve1: "MCL", curve2: "MRPL", color: C.shifted, pLabel: "W₁", qLabel: "Q₁", labelPos: "bl", tooltip: "Hires where MCL=MRPL, pays on ACL" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { curve: "ACL", atEqX: "Emon" },
          { eq: "Ecomp" },
          { eq: "Emon" },
        ],
        color: C.eq,
        opacity: 0.25,
        label: "WL",
      },
    ],
    legend: [{ label: "S=ACL", color: C.demand }, { label: "MCL", color: C.shifted }, { label: "D=MRPL", color: C.supply }, { label: "WL", color: C.eq }],
    notes: "Monopsony hires where MCL=MRPL but pays wage on ACL curve. Lower wage and employment than competitive market.",
    examTips: [
      "Hires where MCL=MRPL → Q₁",
      "Wage on ACL at W₁ < competitive W",
      "Min wage can increase employment",
    ],
  },

  /* ── Perfect Competition (two-panel) ──
   * This is a MULTI-PANEL diagram rendered by PerfectCompDiagram.tsx
   * The spec here is for registry/reference only — the actual rendering
   * is handled by the dedicated component, not DiagramSpecRenderer.
   */
  perfectComp: {
    title: "Perfect Competition — Industry & Firm",
    axisLabels: { x: "Quantity", y: "Price / Cost" },
    curves: [
      // Panel (a) Industry
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: "#3b82f6" },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.9, intercept: 0.5 }, color: "#f97316" },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.9, intercept: 2.2 }, color: "#ef4444", dash: true, shiftedFrom: "S1" },
      // Panel (b) Firm
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.6, b: -2, c: 3.5 }, color: "#f97316" },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.5, b: -2.2, c: 4.8 }, color: "#3b82f6" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S1", color: "#16a34a", pLabel: "P₁", qLabel: "Q₁", tooltip: "LR equilibrium: firms enter → normal profit" },
      { id: "E2", label: "E₂", curve1: "D", curve2: "S2", color: "#d97706", pLabel: "P₂", qLabel: "Q₂", tooltip: "SR equilibrium: higher price → supernormal profit" },
    ],
    legend: [
      { label: "D (Demand)", color: "#3b82f6" },
      { label: "S₁", color: "#f97316" },
      { label: "S₂", color: "#ef4444" },
      { label: "MC", color: "#f97316" },
      { label: "ATC", color: "#3b82f6" },
    ],
    notes: "Two-panel diagram. Panel (a) shows industry S/D with S₁→S₂ shift. Panel (b) shows individual firm MC/ATC with SR supernormal profit and LR normal profit. Toggle between Short Run and Long Run views.",
    examTips: [
      "Short run: P > ATC → supernormal profit attracts new firms",
      "Long run: entry shifts S right → P falls to min ATC → normal profit",
      "AR = MR = P = min ATC in long run (allocative + productive efficiency)",
      "Key: In perfect competition, firms are price takers",
    ],
  },
};
