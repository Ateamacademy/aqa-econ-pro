/**
 * IB ECONOMICS DIAGRAM_SPECS (HL & SL)
 *
 * Covers all major IB Economics diagram families across:
 *   Introduction, Microeconomics, Macroeconomics, Global Economy.
 *
 * IB-specific principles:
 *   - Diagrams must support explanation, analysis, and evaluation
 *   - Real-world application context required
 *   - HL-only diagrams marked separately
 *   - Command terms: explain, discuss, evaluate, examine, calculate
 *   - Paper 1 essays, Paper 2 data response, Paper 3 policy (HL)
 */

import type { DiagramSpec } from "@/components/diagrams/diagramSpecs";

const C = {
  demand: "#ef4444",
  supply: "#3b82f6",
  shifted: "#f59e0b",
  eq: "#16a34a",
  area: "#8b5cf6",
  msc: "#ef4444",
  msb: "#3b82f6",
  mpc: "#f97316",
  mpb: "#93c5fd",
  orange: "#f97316",
  gold: "#eab308",
  teal: "#14b8a6",
  pink: "#ec4899",
  lras: "#6b7280",
};

export const IB_DIAGRAM_SPECS: Record<string, DiagramSpec> = {

  /* ══════════════════════════════════════════
     A. INTRODUCTORY — PPC / PPF
     ══════════════════════════════════════════ */

  ib_ppc_basic: {
    title: "PPC — Scarcity, Choice & Opportunity Cost",
    axisLabels: { x: "Good X", y: "Good Y" },
    curves: [
      { id: "PPC", label: "PPC", params: { type: "quadratic", a: -0.12, b: -0.1, c: 9 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "A (efficient)", position: { x: 3, y: 7.5 }, color: C.eq, size: 10 },
      { text: "B (efficient)", position: { x: 6, y: 4.5 }, color: C.eq, size: 10 },
      { text: "C (inefficient)", position: { x: 3, y: 4 }, color: C.area, size: 10 },
      { text: "D (unattainable)", position: { x: 7, y: 7 }, color: C.demand, size: 10 },
    ],
    legend: [{ label: "PPC", color: C.supply }],
    notes: "Points on the PPC are productively efficient. Points inside represent unemployed resources. Points outside are unattainable with current resources.",
    examTips: [
      "Movement A→B shows opportunity cost",
      "Point C = unemployed resources or productive inefficiency",
      "Point D = unattainable without growth",
      "IB requires linking to real-world scarcity examples",
    ],
  },

  ib_ppc_growth: {
    title: "PPC — Economic Growth (Outward Shift)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPC1", label: "PPC₁", params: { type: "quadratic", a: -0.12, b: -0.1, c: 8 }, color: C.supply },
      { id: "PPC2", label: "PPC₂", params: { type: "quadratic", a: -0.12, b: -0.1, c: 10 }, color: C.eq, dash: true, shiftedFrom: "PPC1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Economic growth", position: { x: 5, y: 9 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "PPC₁", color: C.supply }, { label: "PPC₂ (growth)", color: C.eq }],
    notes: "Outward shift from increased quantity/quality of factors of production. Both goods can now be produced in greater quantities.",
    examTips: [
      "Causes: investment, immigration, technological progress, discovery of resources",
      "Shifts outward = increased productive capacity",
      "Link to long-run aggregate supply in macro context",
    ],
  },

  /* ══════════════════════════════════════════
     B. MICROECONOMICS — DEMAND & SUPPLY
     ══════════════════════════════════════════ */

  ib_demand_shift: {
    title: "Shift in Demand",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "D2", label: "D₂", params: { type: "linear", slope: -0.8, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "D1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D2", curve2: "S1", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    legend: [{ label: "Demand", color: C.demand }, { label: "Supply", color: C.supply }, { label: "Shift →", color: C.shifted }],
    notes: "Demand shifts right: higher income, population growth, advertising, change in tastes, rise in price of substitutes.",
    examTips: [
      "IB Paper 1: explain the determinant causing the shift",
      "Always distinguish shift IN demand vs movement ALONG demand",
      "Show both equilibria clearly with dashed projections",
    ],
  },

  ib_supply_shift: {
    title: "Shift in Supply",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    legend: [{ label: "Demand", color: C.demand }, { label: "Supply", color: C.supply }, { label: "Shift →", color: C.shifted }],
    notes: "Supply shifts right: lower costs, better technology, subsidies, more firms entering.",
  },

  ib_simultaneous_shift: {
    title: "Simultaneous Shift in Demand & Supply",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "D2", label: "D₂", params: { type: "linear", slope: -0.8, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "D1" },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D2", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    notes: "Both demand and supply shift right. Quantity definitely increases; price change depends on relative magnitudes.",
  },

  /* ══════════════════════════════════════════
     CONSUMER & PRODUCER SURPLUS
     ══════════════════════════════════════════ */

  ib_consumer_producer_surplus: {
    title: "Consumer & Producer Surplus",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "P*", qLabel: "Q*" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ x: 0, y: 9 }, { eq: "E" }, { curve: "D", atX: 0 }],
        color: C.supply,
        opacity: 0.12,
        label: "CS",
      },
      {
        type: "triangle",
        vertices: [{ x: 0, y: 1 }, { eq: "E" }, { curve: "S", atX: 0 }],
        color: C.demand,
        opacity: 0.12,
        label: "PS",
      },
    ],
    legend: [{ label: "Consumer Surplus", color: C.supply }, { label: "Producer Surplus", color: C.demand }],
    notes: "CS = area above price, below demand. PS = area below price, above supply. Total welfare = CS + PS.",
    examTips: [
      "IB requires explaining how interventions change CS and PS",
      "Taxes reduce both CS and PS; create deadweight loss",
      "Subsidies increase quantity but create government expenditure",
    ],
  },

  /* ══════════════════════════════════════════
     GOVERNMENT INTERVENTION
     ══════════════════════════════════════════ */

  ib_indirect_tax: {
    title: "Indirect Tax",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S + tax", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    annotations: [
      { text: "Tax per unit", position: { x: 1, y: 2.5 }, color: C.orange, size: 10 },
    ],
    notes: "Tax shifts S left. Price rises but not by full tax amount (depends on PED/PES). Creates deadweight loss.",
    examTips: [
      "Show tax incidence: consumer burden (P₂−P₁) vs producer burden",
      "IB requires discussing stakeholder effects",
      "Evaluate effectiveness: depends on PED of the good",
    ],
  },

  ib_subsidy: {
    title: "Subsidy",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 2 }, color: C.supply },
      { id: "S2", label: "S + subsidy", params: { type: "linear", slope: 0.8, intercept: 0 }, color: C.eq, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    notes: "Subsidy shifts S right, lowering price and increasing quantity. Government cost = subsidy × Q₂.",
  },

  ib_price_ceiling: {
    title: "Price Ceiling (Maximum Price)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmax", label: "Pmax", params: { type: "horizontal", y: 4 }, color: C.orange, dash: true, width: 2.5 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "P*", qLabel: "Q*" },
    ],
    annotations: [
      { text: "Shortage", position: { x: 5, y: 3 }, color: C.demand, size: 11 },
    ],
    notes: "Price ceiling below equilibrium creates shortage: Qd > Qs. Consumers benefit if they can buy; some are rationed out.",
    examTips: [
      "Must be below equilibrium to be effective",
      "Creates excess demand (shortage)",
      "IB: discuss welfare effects — some consumers gain, others lose",
    ],
  },

  ib_price_floor: {
    title: "Price Floor (Minimum Price)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmin", label: "Pmin", params: { type: "horizontal", y: 6 }, color: C.orange, dash: true, width: 2.5 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "P*", qLabel: "Q*" },
    ],
    annotations: [
      { text: "Surplus", position: { x: 5, y: 7 }, color: C.supply, size: 11 },
    ],
    notes: "Price floor above equilibrium creates surplus: Qs > Qd. Common for agricultural products and minimum wages.",
  },

  /* ══════════════════════════════════════════
     EXTERNALITIES
     ══════════════════════════════════════════ */

  ib_negative_prod_ext: {
    title: "Negative Externality of Production",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curves: [
      { id: "MPC", label: "MPC = S", params: { type: "linear", slope: 0.6, intercept: 1.5 }, color: C.mpc },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.msc },
      { id: "D", label: "MPB = MSB = D", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.supply },
    ],
    equilibria: [
      { id: "Qm", label: "Market", curve1: "MPC", curve2: "D", color: C.eq, pLabel: "Pm", qLabel: "Qm" },
      { id: "Qopt", label: "Optimal", curve1: "MSC", curve2: "D", color: C.shifted, pLabel: "Popt", qLabel: "Qopt" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ curve: "MSC", atEqX: "Qm" }, { eq: "Qm" }, { eq: "Qopt" }],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qopt < Qm (overproduction)", check: { eq1: "Qopt", eq2: "Qm", axis: "x", relation: "<" } }],
    notes: "MSC > MPC because of external costs (pollution). Free market overproduces. Welfare loss = triangle between MSC and MPB from Qopt to Qm.",
    examTips: [
      "MSC above MPC = external costs imposed on third parties",
      "Free market: MPC = MPB → overproduction",
      "Correction: Pigouvian tax = external cost per unit at Qopt",
      "IB: link to real-world example (e.g. carbon emissions)",
    ],
  },

  ib_negative_cons_ext: {
    title: "Negative Externality of Consumption",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curves: [
      { id: "S", label: "MPC = MSC = S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MPB", label: "MPB = D", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.msb },
    ],
    equilibria: [
      { id: "Qm", label: "Market", curve1: "S", curve2: "MPB", color: C.eq, pLabel: "Pm", qLabel: "Qm" },
      { id: "Qopt", label: "Optimal", curve1: "S", curve2: "MSB", color: C.shifted, pLabel: "Popt", qLabel: "Qopt" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ curve: "MSB", atEqX: "Qm" }, { eq: "Qm" }, { eq: "Qopt" }],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qopt < Qm (overconsumption)", check: { eq1: "Qopt", eq2: "Qm", axis: "x", relation: "<" } }],
    notes: "MSB < MPB — consumers ignore external costs to third parties (e.g. passive smoking). Overconsumption at free market.",
  },

  ib_positive_prod_ext: {
    title: "Positive Externality of Production",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curves: [
      { id: "MPC", label: "MPC = S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.mpc },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.4, intercept: 0.5 }, color: C.msc },
      { id: "D", label: "MPB = MSB = D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.supply },
    ],
    equilibria: [
      { id: "Qm", label: "Market", curve1: "MPC", curve2: "D", color: C.eq, pLabel: "Pm", qLabel: "Qm" },
      { id: "Qopt", label: "Optimal", curve1: "MSC", curve2: "D", color: C.shifted, pLabel: "Popt", qLabel: "Qopt" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ curve: "MPC", atEqX: "Qopt" }, { eq: "Qm" }, { eq: "Qopt" }],
        color: C.eq,
        opacity: 0.15,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qm < Qopt (underproduction)", check: { eq1: "Qm", eq2: "Qopt", axis: "x", relation: "<" } }],
    notes: "MSC < MPC — production generates external benefits (e.g. R&D spillovers). Free market underproduces.",
  },

  ib_positive_cons_ext: {
    title: "Positive Externality of Consumption",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curves: [
      { id: "S", label: "MPC = MSC = S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MPB", label: "MPB = D", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.msb },
    ],
    equilibria: [
      { id: "Qm", label: "Market", curve1: "S", curve2: "MPB", color: C.eq, pLabel: "Pm", qLabel: "Qm" },
      { id: "Qopt", label: "Optimal", curve1: "S", curve2: "MSB", color: C.shifted, pLabel: "Popt", qLabel: "Qopt" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ curve: "MSB", atEqX: "Qm" }, { eq: "Qopt" }, { eq: "Qm" }],
        color: C.eq,
        opacity: 0.15,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qm < Qopt (underconsumption)", check: { eq1: "Qm", eq2: "Qopt", axis: "x", relation: "<" } }],
    notes: "MSB > MPB — consumption generates external benefits (e.g. education, vaccination). Free market underconsumes.",
    examTips: [
      "MSB above MPB = external benefits to third parties",
      "Free market: MPB = MPC → underconsumption",
      "Correction: subsidy or direct provision",
      "IB: connect to merit goods and government intervention debate",
    ],
  },

  /* ══════════════════════════════════════════
     MARKET STRUCTURES (HL ONLY)
     ══════════════════════════════════════════ */

  ib_monopoly: {
    title: "Monopoly — Profit Maximisation (HL)",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Revenue" },
    curves: [
      { id: "AR", label: "AR = D", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "MR", label: "MR", params: { type: "linear", slope: -1.2, intercept: 9 }, color: C.demand, dash: true },
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.15, b: -1.2, c: 5 }, color: C.supply },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.08, b: -0.7, c: 4.5 }, color: C.orange },
    ],
    equilibria: [
      { id: "PM", label: "Profit Max", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "MC = MR → profit maximisation" },
    ],
    annotations: [
      { text: "Supernormal profit", position: { x: 2, y: 6 }, color: C.eq, size: 10 },
      { text: "DWL", position: { x: 5.5, y: 4.5 }, color: C.demand, size: 10 },
    ],
    legend: [{ label: "AR = D", color: C.demand }, { label: "MR", color: C.demand }, { label: "MC", color: C.supply }, { label: "ATC", color: C.orange }],
    notes: "Monopoly: MC = MR determines Qm, then read price from AR. Supernormal profit = (AR − ATC) × Qm. Allocative inefficiency: P > MC.",
    examTips: [
      "HL only: must show MC = MR for profit max",
      "Shade supernormal profit rectangle: (P − ATC) × Q",
      "Evaluate: barriers to entry, natural monopoly, regulation",
      "IB: discuss efficiency implications (allocative, productive)",
    ],
  },

  ib_perfect_comp: {
    title: "Perfect Competition — Long Run (HL)",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Revenue" },
    curves: [
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.15, b: -1.2, c: 5 }, color: C.supply },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.08, b: -0.7, c: 4.5 }, color: C.orange },
      { id: "MR", label: "AR = MR = P", params: { type: "horizontal", y: 3.2 }, color: C.demand },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "P", qLabel: "Q", tooltip: "MC = MR = AR = min ATC" },
    ],
    notes: "LR equilibrium: P = MC = min ATC. Normal profit only. Allocatively and productively efficient.",
    examTips: [
      "HL: firms are price takers — horizontal AR = MR",
      "LR: entry/exit drives profit to zero",
      "Both allocative (P = MC) and productive (min ATC) efficiency",
    ],
  },

  ib_monopolistic_comp: {
    title: "Monopolistic Competition — LR (HL)",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Revenue" },
    curves: [
      { id: "AR", label: "AR = D", params: { type: "linear", slope: -0.5, intercept: 8 }, color: C.demand },
      { id: "MR", label: "MR", params: { type: "linear", slope: -1.0, intercept: 8 }, color: C.demand, dash: true },
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.15, b: -1.2, c: 5 }, color: C.supply },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.08, b: -0.6, c: 4.2 }, color: C.orange },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "P", qLabel: "Q" },
    ],
    notes: "LR: AR tangent to ATC — normal profit only. Neither allocatively nor productively efficient. Excess capacity.",
    examTips: [
      "HL: AR is tangent to ATC in LR (not intersecting)",
      "Normal profit: no incentive for entry or exit",
      "Excess capacity: produces left of min ATC",
    ],
  },

  /* ══════════════════════════════════════════
     C. MACROECONOMICS — AD/AS
     ══════════════════════════════════════════ */

  ib_ad_increase: {
    title: "AD Increase — Demand-Pull Pressure",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.7, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "AD1" },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 6 }, color: C.lras, width: 2.5 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD1", curve2: "SRAS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD2", curve2: "SRAS", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "AD shifts right: C, I, G, or (X−M) increases. Output and price level both rise. If beyond Yf, inflationary gap.",
    examTips: [
      "Causes: fiscal stimulus, lower interest rates, export growth",
      "Beyond LRAS = inflationary gap",
      "IB: discuss short-run vs long-run effects",
    ],
  },

  ib_sras_decrease: {
    title: "SRAS Decrease — Cost-Push Inflation",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "SRAS1", label: "SRAS₁", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "SRAS2", label: "SRAS₂", params: { type: "linear", slope: 0.7, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "SRAS1" },
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 6 }, color: C.lras, width: 2.5 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD", curve2: "SRAS1", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD", curve2: "SRAS2", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "SRAS shifts left: higher input costs (oil, wages). Stagflation: price level rises, output falls.",
  },

  ib_lras_increase: {
    title: "LRAS Increase — Long-Run Growth",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "LRAS1", label: "LRAS₁", params: { type: "vertical", x: 5.5 }, color: C.lras, width: 2.5 },
      { id: "LRAS2", label: "LRAS₂", params: { type: "vertical", x: 7 }, color: C.eq, width: 2.5, dash: true, shiftedFrom: "LRAS1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD", curve2: "SRAS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
    ],
    annotations: [
      { text: "Yf₁", position: { x: 5.5, y: 0.5 }, color: C.lras, size: 11 },
      { text: "Yf₂", position: { x: 7, y: 0.5 }, color: C.eq, size: 11 },
    ],
    notes: "LRAS shifts right: improved quality/quantity of factors. Potential output increases. Supply-side growth.",
  },

  ib_keynesian_as: {
    title: "Keynesian AS Model",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.7, intercept: 5 }, color: C.demand },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.7, intercept: 8 }, color: C.demand, dash: true, shiftedFrom: "AD1" },
      { id: "KAS", label: "KAS", params: {
        type: "piecewise",
        segments: [
          { xFrom: 0, xTo: 4, curve: { type: "linear", slope: 0, intercept: 2 } },
          { xFrom: 4, xTo: 7, curve: { type: "linear", slope: 0.8, intercept: -1.2 } },
          { xFrom: 7, xTo: 7.01, curve: { type: "linear", slope: 100, intercept: -695.4 } },
        ],
      }, color: C.supply, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD1", curve2: "KAS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD2", curve2: "KAS", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    annotations: [
      { text: "Spare capacity", position: { x: 1.5, y: 1.2 }, color: C.eq, size: 9 },
      { text: "Full employment", position: { x: 7.5, y: 6 }, color: C.lras, size: 9 },
    ],
    notes: "Keynesian AS: flat (spare capacity), upward-sloping (approaching Yf), vertical (full employment). Shows why fiscal stimulus works in recession.",
  },

  /* ══════════════════════════════════════════
     PHILLIPS CURVE
     ══════════════════════════════════════════ */

  ib_phillips_curve: {
    title: "Short-Run & Long-Run Phillips Curve",
    axisLabels: { x: "Unemployment Rate (%)", y: "Inflation Rate (%)" },
    curves: [
      { id: "SRPC", label: "SRPC", params: { type: "quadratic", a: 0.15, b: -2.0, c: 9 }, color: C.demand },
      { id: "LRPC", label: "LRPC", params: { type: "vertical", x: 5 }, color: C.lras, width: 2.5 },
    ],
    equilibria: [],
    annotations: [
      { text: "NRU", position: { x: 5, y: 0.5 }, color: C.lras, size: 11 },
      { text: "Trade-off zone", position: { x: 3, y: 5 }, color: C.demand, size: 10 },
    ],
    legend: [{ label: "SRPC", color: C.demand }, { label: "LRPC", color: C.lras }],
    notes: "SR trade-off between inflation and unemployment. LR: LRPC vertical at NRU. Expectations-augmented analysis.",
  },

  /* ══════════════════════════════════════════
     INEQUALITY — LORENZ CURVE
     ══════════════════════════════════════════ */

  ib_lorenz_curve: {
    title: "Lorenz Curve & Gini Coefficient",
    axisLabels: { x: "Cumulative % of Population", y: "Cumulative % of Income" },
    curves: [
      { id: "equality", label: "Line of equality", params: { type: "linear", slope: 1, intercept: 0 }, color: C.lras, dash: true },
      { id: "lorenz", label: "Lorenz curve", params: { type: "quadratic", a: 0.1, b: 0, c: 0 }, color: C.demand, width: 2.5 },
    ],
    equilibria: [],
    annotations: [
      { text: "Area A", position: { x: 3, y: 4 }, color: C.shifted, size: 11 },
      { text: "Area B", position: { x: 5, y: 2 }, color: C.area, size: 11 },
      { text: "Gini = A / (A+B)", position: { x: 2, y: 8 }, color: C.lras, size: 10 },
    ],
    legend: [{ label: "Line of equality", color: C.lras }, { label: "Lorenz curve", color: C.demand }],
    notes: "Gini coefficient = Area A / (A + B). Closer to 0 = more equal. Closer to 1 = more unequal.",
    examTips: [
      "IB: compare Lorenz curves before and after government intervention",
      "Tax and transfer policies shift Lorenz curve closer to line of equality",
      "Link to HDI and other development measures",
    ],
  },

  /* ══════════════════════════════════════════
     D. GLOBAL ECONOMY — TRADE
     ══════════════════════════════════════════ */

  ib_tariff: {
    title: "Tariff Diagram",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "Sd", params: { type: "linear", slope: 0.6, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw (World)", params: { type: "horizontal", y: 3 }, color: C.eq, width: 2 },
      { id: "Pw_t", label: "Pw + tariff", params: { type: "horizontal", y: 4.2 }, color: C.orange, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "A", label: "A", curve1: "Sd", curve2: "Pw", color: C.eq, pLabel: "", qLabel: "Q₁" },
      { id: "B", label: "B", curve1: "D", curve2: "Pw", color: C.eq, pLabel: "", qLabel: "Q₂" },
      { id: "C", label: "C", curve1: "Sd", curve2: "Pw_t", color: C.shifted, pLabel: "", qLabel: "Q₃" },
      { id: "D_pt", label: "D", curve1: "D", curve2: "Pw_t", color: C.shifted, pLabel: "", qLabel: "Q₄" },
    ],
    annotations: [
      { text: "Tariff revenue", position: { x: 5, y: 3.6 }, color: C.orange, size: 10 },
      { text: "DWL", position: { x: 3, y: 3.4 }, color: C.demand, size: 9 },
      { text: "DWL", position: { x: 7.5, y: 3.4 }, color: C.demand, size: 9 },
    ],
    notes: "Tariff raises domestic price, increases domestic production, reduces imports, creates deadweight loss and government revenue.",
    examTips: [
      "HL: calculate tariff revenue, changes in CS, PS, and DWL",
      "Stakeholders: domestic producers gain, consumers lose, government gains revenue",
      "IB: evaluate effectiveness — depends on PED, retaliation risk",
    ],
  },

  ib_quota: {
    title: "Quota Diagram",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "Sd", params: { type: "linear", slope: 0.6, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw", params: { type: "horizontal", y: 3 }, color: C.eq, width: 2 },
      { id: "Sq", label: "Sd + quota", params: { type: "linear", slope: 0.6, intercept: 2.5 }, color: C.orange, dash: true },
    ],
    equilibria: [
      { id: "E_free", label: "Free trade", curve1: "D", curve2: "Pw", color: C.eq, pLabel: "Pw", qLabel: "Qd" },
      { id: "E_quota", label: "With quota", curve1: "D", curve2: "Sq", color: C.shifted, pLabel: "Pq", qLabel: "Qq" },
    ],
    annotations: [
      { text: "Quota rent", position: { x: 4, y: 3.5 }, color: C.orange, size: 10 },
    ],
    notes: "Quota restricts import quantity. Domestic price rises above world price. Creates quota rent and deadweight loss.",
  },

  ib_trade_subsidy: {
    title: "Export/Production Subsidy in Trade",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "Sd", params: { type: "linear", slope: 0.6, intercept: 2 }, color: C.supply },
      { id: "Sd_sub", label: "Sd + subsidy", params: { type: "linear", slope: 0.6, intercept: 0.5 }, color: C.eq, dash: true, shiftedFrom: "Sd" },
      { id: "Pw", label: "Pw", params: { type: "horizontal", y: 3 }, color: C.lras, width: 2 },
    ],
    equilibria: [
      { id: "A", label: "A", curve1: "Sd", curve2: "Pw", color: C.eq, pLabel: "", qLabel: "Q₁" },
      { id: "B", label: "B", curve1: "Sd_sub", curve2: "Pw", color: C.shifted, pLabel: "", qLabel: "Q₂" },
    ],
    annotations: [
      { text: "Govt cost", position: { x: 3, y: 2 }, color: C.shifted, size: 10 },
    ],
    notes: "Domestic subsidy shifts Sd right, increasing domestic production and reducing imports. No price change for consumers (Pw stays). Government bears the cost.",
  },

  /* ══════════════════════════════════════════
     EXCHANGE RATES
     ══════════════════════════════════════════ */

  ib_exchange_rate: {
    title: "Exchange Rate — Floating",
    axisLabels: { x: "Quantity of Currency", y: "Exchange Rate (ER)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D2", label: "D₂", params: { type: "linear", slope: -0.7, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "D1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "ER₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D2", curve2: "S1", color: C.shifted, pLabel: "ER₂", qLabel: "Q₂" },
    ],
    notes: "Higher demand for currency → appreciation. Causes: higher interest rates, strong exports, FDI inflows, speculation.",
    examTips: [
      "IB: always state cause of shift in D or S for currency",
      "Appreciation: ER rises → imports cheaper, exports dearer",
      "Link to current account, inflation, competitiveness",
    ],
  },

  ib_exchange_depreciation: {
    title: "Exchange Rate — Depreciation",
    axisLabels: { x: "Quantity of Currency", y: "Exchange Rate (ER)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.7, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "ER₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "ER₂", qLabel: "Q₂" },
    ],
    notes: "Supply of currency increases → depreciation. Causes: higher imports, capital flight, lower interest rates.",
  },

  /* ══════════════════════════════════════════
     J-CURVE (HL ONLY)
     ══════════════════════════════════════════ */

  ib_j_curve: {
    title: "J-Curve Effect (HL)",
    axisLabels: { x: "Time", y: "Current Account Balance" },
    curves: [
      { id: "zero", label: "", params: { type: "horizontal", y: 5 }, color: C.lras, dash: true, width: 1 },
      { id: "jcurve", label: "CA balance", params: {
        type: "piecewise",
        segments: [
          { xFrom: 0, xTo: 2, curve: { type: "linear", slope: 0, intercept: 4 } },
          { xFrom: 2, xTo: 4, curve: { type: "linear", slope: -1.5, intercept: 7 } },
          { xFrom: 4, xTo: 8, curve: { type: "quadratic", a: 0.5, b: -3, c: 7 } },
        ],
      }, color: C.demand, width: 2.5 },
    ],
    equilibria: [],
    annotations: [
      { text: "Depreciation", position: { x: 2, y: 4.5 }, color: C.shifted, size: 10 },
      { text: "Initial worsening", position: { x: 3, y: 2.5 }, color: C.demand, size: 9 },
      { text: "Long-run improvement", position: { x: 7, y: 7 }, color: C.eq, size: 9 },
    ],
    notes: "After depreciation, CA worsens initially (contracts already agreed at old ER), then improves as volumes adjust. Requires Marshall-Lerner condition (PEDx + PEDm > 1).",
    examTips: [
      "HL only: link to Marshall-Lerner condition",
      "Short-run: J-shape because demand for imports/exports is price inelastic",
      "Long-run: volumes adjust → trade balance improves",
    ],
  },

  /* ══════════════════════════════════════════
     MONETARY & FISCAL POLICY
     ══════════════════════════════════════════ */

  ib_monetary_expansion: {
    title: "Expansionary Monetary Policy (AD Shift)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.7, intercept: 8 }, color: C.demand },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.7, intercept: 9.5 }, color: C.demand, dash: true, shiftedFrom: "AD1" },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 6 }, color: C.lras, width: 2.5 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD1", curve2: "SRAS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD2", curve2: "SRAS", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "Lower interest rates → higher C + I → AD shifts right. Output rises, price level rises. Transmission: r↓ → C↑ I↑ → AD↑.",
  },

  ib_supply_side_policy: {
    title: "Supply-Side Policy (LRAS Shift)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "LRAS1", label: "LRAS₁", params: { type: "vertical", x: 5.5 }, color: C.lras, width: 2.5 },
      { id: "LRAS2", label: "LRAS₂", params: { type: "vertical", x: 7 }, color: C.eq, width: 2.5, dash: true, shiftedFrom: "LRAS1" },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "AD", curve2: "SRAS", color: C.eq, pLabel: "PL", qLabel: "Y" },
    ],
    annotations: [
      { text: "Potential output ↑", position: { x: 7.5, y: 3 }, color: C.eq, size: 10 },
    ],
    notes: "Supply-side policies: education, deregulation, infrastructure, privatisation → LRAS shifts right. Non-inflationary growth.",
  },

  /* ══════════════════════════════════════════
     DEVELOPMENT
     ══════════════════════════════════════════ */

  ib_poverty_cycle: {
    title: "Poverty Cycle / Trap",
    axisLabels: { x: "", y: "" },
    curves: [],
    equilibria: [],
    annotations: [
      { text: "Low income", position: { x: 5, y: 9 }, color: C.demand, size: 12 },
      { text: "Low savings", position: { x: 8, y: 7 }, color: C.demand, size: 12 },
      { text: "Low investment", position: { x: 8, y: 4 }, color: C.demand, size: 12 },
      { text: "Low productivity", position: { x: 5, y: 2 }, color: C.demand, size: 12 },
      { text: "Low output", position: { x: 2, y: 4 }, color: C.demand, size: 12 },
      { text: "→", position: { x: 7, y: 8.2 }, color: C.lras, size: 14 },
      { text: "→", position: { x: 8.5, y: 5.5 }, color: C.lras, size: 14 },
      { text: "←", position: { x: 7, y: 2.8 }, color: C.lras, size: 14 },
      { text: "←", position: { x: 2.5, y: 5.5 }, color: C.lras, size: 14 },
      { text: "↑", position: { x: 3, y: 7.5 }, color: C.lras, size: 14 },
    ],
    notes: "Circular causation: low income → low savings → low investment → low productivity → low output → low income. Breaking the cycle requires intervention.",
    examTips: [
      "IB: discuss how aid, FDI, education, or microfinance can break the cycle",
      "Link to Harrod-Domar model: S → I → Growth",
      "Evaluate: structural barriers, institutional quality, corruption",
    ],
  },

  /* ══════════════════════════════════════════
     COMPARATIVE ADVANTAGE
     ══════════════════════════════════════════ */

  ib_comparative_advantage: {
    title: "Comparative Advantage — Gains from Trade",
    axisLabels: { x: "Good X", y: "Good Y" },
    curves: [
      { id: "A", label: "Country A", params: { type: "linear", slope: -0.5, intercept: 8 }, color: C.demand },
      { id: "B", label: "Country B", params: { type: "linear", slope: -2, intercept: 10 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "A: lower OC of X", position: { x: 7, y: 5.5 }, color: C.demand, size: 10 },
      { text: "B: lower OC of Y", position: { x: 2, y: 8 }, color: C.supply, size: 10 },
    ],
    notes: "Each country specialises where opportunity cost is lower. Trade allows consumption beyond the PPC. Gains from trade exist even without absolute advantage.",
    examTips: [
      "Calculate opportunity costs from production data",
      "Specialise where OC is lower",
      "IB: evaluate assumptions — transport costs, terms of trade, factor mobility",
    ],
  },
};
