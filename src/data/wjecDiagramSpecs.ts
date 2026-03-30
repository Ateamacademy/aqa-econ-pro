/**
 * WJEC / EDUQAS A-LEVEL DIAGRAM_SPECS
 *
 * Diagram specs for WJEC Wales (Units 1–4) and Eduqas (Components 1–3).
 *
 * WJEC-specific conventions:
 *   - Unit 1 & 2 cover AS-level micro/macro foundations
 *   - Unit 3 & 4 extend to A2 market structures, trade, development
 *   - Eduqas Components 1–3 map similarly but use England-specific terminology
 *   - Both boards expect diagrams to support structured data-response and essay answers
 *   - Welfare analysis uses standard MSC/MSB/MPC/MPB labelling
 *   - Labour market diagrams feature prominently in Unit 2/3
 *   - Trade diagrams (tariffs, quotas, exchange rates) in Unit 4 / Component 2
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

export const WJEC_DIAGRAM_SPECS: Record<string, DiagramSpec> = {

  /* ══════════════════════════════════════════
     1. PPF — BASIC
     ══════════════════════════════════════════ */
  wjec_ppf_basic: {
    title: "Production Possibility Frontier",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF", label: "PPF", params: { type: "quadratic", a: -0.12, b: -0.1, c: 9 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "A (efficient)", position: { x: 3, y: 7.32 }, color: C.eq, size: 11 },
      { text: "B (inefficient)", position: { x: 3, y: 4 }, color: C.demand, size: 11 },
      { text: "C (unattainable)", position: { x: 7, y: 8 }, color: C.orange, size: 11 },
    ],
    notes: "Points on the PPF are productively efficient. Inside = unemployment/inefficiency. Outside = unattainable with current resources.",
    examTips: [
      "WJEC Unit 1: always label axes with context-specific goods if named in the question",
      "Show opportunity cost as movement along the curve",
      "Explain why points inside represent unemployment of resources",
    ],
  },

  /* ══════════════════════════════════════════
     2. PPF — OUTWARD SHIFT (Economic Growth)
     ══════════════════════════════════════════ */
  wjec_ppf_growth: {
    title: "PPF Outward Shift — Economic Growth",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "quadratic", a: -0.12, b: -0.1, c: 7 }, color: C.supply },
      { id: "PPF2", label: "PPF₂", params: { type: "quadratic", a: -0.12, b: -0.1, c: 9 }, color: C.eq, dash: true, shiftedFrom: "PPF1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Growth →", position: { x: 5, y: 6.5 }, color: C.eq, size: 12 },
    ],
    notes: "Outward shift from more/better resources, technology, or education. Previously unattainable points become achievable.",
    examTips: [
      "Link to supply-side policies: education, infrastructure, deregulation",
      "Distinguish actual growth (using spare capacity) from potential growth (PPF shift)",
    ],
  },

  /* ══════════════════════════════════════════
     3. PPF — BIASED SHIFT
     ══════════════════════════════════════════ */
  wjec_ppf_biased: {
    title: "PPF Biased Shift — Sector-Specific Growth",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "quadratic", a: -0.12, b: -0.1, c: 7 }, color: C.supply },
      {
        id: "PPF2", label: "PPF₂", params: {
          type: "piecewise",
          segments: [
            { xFrom: 0, xTo: 4, curve: { type: "quadratic", a: -0.08, b: -0.1, c: 9 } },
            { xFrom: 4, xTo: 9, curve: { type: "quadratic", a: -0.14, b: 0.1, c: 7.5 } },
          ],
        }, color: C.eq, dash: true, shiftedFrom: "PPF1",
      },
    ],
    equilibria: [],
    annotations: [
      { text: "Capital-biased growth", position: { x: 2, y: 9 }, color: C.eq, size: 11 },
    ],
    notes: "Technology improvement in one sector shifts PPF asymmetrically — more capital goods possible without proportional consumer goods gain.",
    examTips: [
      "WJEC may ask about sector-specific productivity improvements",
      "Explain why the shift is uneven using specific causes",
    ],
  },

  /* ══════════════════════════════════════════
     4. SUPPLY & DEMAND — Market Equilibrium
     ══════════════════════════════════════════ */
  wjec_market_equilibrium: {
    title: "Market Equilibrium — Price Determination",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "Market equilibrium: D = S" },
    ],
    notes: "Equilibrium where quantity demanded equals quantity supplied. Price mechanism adjusts via signalling, incentive, and rationing functions.",
    examTips: [
      "WJEC/Eduqas: explain the adjustment mechanism — excess demand → price rises → Qd falls, Qs rises",
      "Always reference the three functions of the price mechanism",
    ],
  },

  /* ══════════════════════════════════════════
     5. INDIRECT TAX
     ══════════════════════════════════════════ */
  wjec_indirect_tax: {
    title: "Indirect Tax — Specific Tax",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₁ + tax", params: { type: "linear", slope: 0.8, intercept: 3 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    shading: [
      {
        type: "polygon",
        vertices: [
          { eq: "E2" },
          { curve: "S1", atEqX: "E2" },
          { eq: "E1" },
          { curve: "S2", atEqX: "E1" },
        ],
        color: C.orange,
        opacity: 0.15,
        label: "Tax revenue",
      },
    ],
    notes: "Tax shifts S left/up. Consumer pays P₂−P₁, producer bears rest. Tax revenue = tax per unit × Q₂.",
    examTips: [
      "Show the tax wedge between S₁ and S₁+tax at the new quantity",
      "Discuss incidence: depends on relative elasticities of D and S",
      "Evaluate: may reduce consumption of demerit goods but causes DWL",
    ],
  },

  /* ══════════════════════════════════════════
     6. SUBSIDY
     ══════════════════════════════════════════ */
  wjec_subsidy: {
    title: "Subsidy — Effect on Market",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 2 }, color: C.supply },
      { id: "S2", label: "S₁ + subsidy", params: { type: "linear", slope: 0.8, intercept: 0 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    shading: [
      {
        type: "polygon",
        vertices: [
          { curve: "S1", atEqX: "E2" },
          { eq: "E2" },
          { eq: "E1" },
          { curve: "S2", atEqX: "E1" },
        ],
        color: C.eq,
        opacity: 0.12,
        label: "Govt cost",
      },
    ],
    notes: "Subsidy shifts S right/down. Price falls, quantity rises. Government cost = subsidy per unit × new quantity.",
    examTips: [
      "Show who benefits: consumers get lower price, producers get higher effective price",
      "Evaluate: opportunity cost of subsidy, risk of government failure",
    ],
  },

  /* ══════════════════════════════════════════
     7. NEGATIVE PRODUCTION EXTERNALITY
     ══════════════════════════════════════════ */
  wjec_neg_prod_ext: {
    title: "Negative Externality of Production",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit / Price" },
    curves: [
      { id: "MPC", label: "MPC (S)", params: { type: "linear", slope: 0.6, intercept: 1.5 }, color: C.supply },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.msc },
      { id: "D", label: "MPB = MSB (D)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
    ],
    equilibria: [
      { id: "Mkt", label: "Mkt", curve1: "MPC", curve2: "D", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "Free market: MPC = MPB → overproduction" },
      { id: "Soc", label: "Soc", curve1: "MSC", curve2: "D", color: C.shifted, pLabel: "Ps", qLabel: "Qs", tooltip: "Socially optimal: MSC = MSB" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ curve: "MSC", atEqX: "Mkt" }, { eq: "Mkt" }, { eq: "Soc" }],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qm > Qs (overproduction)", check: { eq1: "Mkt", eq2: "Soc", axis: "x", relation: ">" } }],
    notes: "MSC > MPC — external costs (pollution, congestion). Free market overproduces. Welfare loss = triangle between MSC, MPC, and D.",
    examTips: [
      "WJEC: always label the welfare loss triangle explicitly",
      "Explain external costs with real examples (e.g. carbon emissions, noise)",
      "Discuss corrective tax to internalise the externality",
    ],
  },

  /* ══════════════════════════════════════════
     8. POSITIVE CONSUMPTION EXTERNALITY
     ══════════════════════════════════════════ */
  wjec_pos_cons_ext: {
    title: "Positive Externality of Consumption",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit / Price" },
    curves: [
      { id: "S", label: "MSC = MPC (S)", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MPB", label: "MPB (D)", params: { type: "linear", slope: -0.7, intercept: 7.5 }, color: C.mpb },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.7, intercept: 9.5 }, color: C.msb },
    ],
    equilibria: [
      { id: "Mkt", label: "Mkt", curve1: "S", curve2: "MPB", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "Free market: MPC = MPB → underconsumption" },
      { id: "Soc", label: "Soc", curve1: "S", curve2: "MSB", color: C.shifted, pLabel: "Ps", qLabel: "Qs", tooltip: "Socially optimal: MSC = MSB" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ curve: "MSB", atEqX: "Mkt" }, { eq: "Soc" }, { eq: "Mkt" }],
        color: C.eq,
        opacity: 0.15,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qm < Qs (underconsumption)", check: { eq1: "Mkt", eq2: "Soc", axis: "x", relation: "<" } }],
    notes: "MSB > MPB — consumption creates external benefits (e.g. education, vaccination). Free market underconsumes.",
    examTips: [
      "Label MPB (private demand) and MSB (social demand) clearly",
      "Show welfare loss from underconsumption",
      "Discuss subsidy or direct provision as correction",
    ],
  },

  /* ══════════════════════════════════════════
     9. NEGATIVE CONSUMPTION EXTERNALITY
     ══════════════════════════════════════════ */
  wjec_neg_cons_ext: {
    title: "Negative Externality of Consumption",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit / Price" },
    curves: [
      { id: "S", label: "MSC = MPC (S)", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MPB", label: "MPB (D)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.msb },
    ],
    equilibria: [
      { id: "Mkt", label: "Mkt", curve1: "S", curve2: "MPB", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "Free market: overconsumption" },
      { id: "Soc", label: "Soc", curve1: "S", curve2: "MSB", color: C.shifted, pLabel: "Ps", qLabel: "Qs", tooltip: "Socially optimal: MSB = MSC" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ curve: "MSB", atEqX: "Mkt" }, { eq: "Mkt" }, { eq: "Soc" }],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qm > Qs (overconsumption)", check: { eq1: "Mkt", eq2: "Soc", axis: "x", relation: ">" } }],
    notes: "MSB < MPB — consumers ignore external costs (e.g. alcohol, tobacco). Free market overconsumes.",
    examTips: [
      "Explain demerit good context: consumers ignore harm to third parties",
      "Corrective tools: indirect tax, regulation, information provision",
    ],
  },

  /* ══════════════════════════════════════════
     10. POSITIVE PRODUCTION EXTERNALITY
     ══════════════════════════════════════════ */
  wjec_pos_prod_ext: {
    title: "Positive Externality of Production",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit / Price" },
    curves: [
      { id: "MPC", label: "MPC (S)", params: { type: "linear", slope: 0.7, intercept: 2 }, color: C.supply },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.4, intercept: 0.5 }, color: C.msc },
      { id: "D", label: "MPB = MSB (D)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
    ],
    equilibria: [
      { id: "Mkt", label: "Mkt", curve1: "MPC", curve2: "D", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "Free market: MPC = MPB → underproduction" },
      { id: "Soc", label: "Soc", curve1: "MSC", curve2: "D", color: C.shifted, pLabel: "Ps", qLabel: "Qs", tooltip: "Socially optimal: MSC = MSB" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ eq: "Mkt" }, { eq: "Soc" }, { curve: "MPC", atEqX: "Soc" }],
        color: C.eq,
        opacity: 0.15,
        label: "Welfare loss",
      },
    ],
    sanityChecks: [{ description: "Qm < Qs (underproduction)", check: { eq1: "Mkt", eq2: "Soc", axis: "x", relation: "<" } }],
    notes: "MSC < MPC — production generates external benefits (e.g. R&D spillovers, training). Free market underproduces.",
    examTips: [
      "MSC is BELOW MPC — external benefit in production",
      "Subsidy can close the gap between Qm and Qs",
    ],
  },

  /* ══════════════════════════════════════════
     11. MAXIMUM PRICE (Price Ceiling)
     ══════════════════════════════════════════ */
  wjec_max_price: {
    title: "Maximum Price (Price Ceiling)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmax", label: "Pmax", params: { type: "horizontal", y: 3.5 }, color: C.orange, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "Pe", qLabel: "Qe" },
    ],
    annotations: [
      { text: "Shortage", position: { x: 5, y: 2.5 }, color: C.demand, size: 12 },
      { text: "Pmax", position: { x: 0.5, y: 3.8 }, color: C.orange, size: 12 },
    ],
    notes: "Max price set below equilibrium creates a shortage: Qd > Qs at Pmax. Benefits consumers who can buy but may cause rationing, black markets.",
    examTips: [
      "Must be set BELOW equilibrium to be effective",
      "Show excess demand (shortage) clearly",
      "Evaluate: rationing problems, reduced quality, black markets",
    ],
  },

  /* ══════════════════════════════════════════
     12. MINIMUM PRICE (Price Floor)
     ══════════════════════════════════════════ */
  wjec_min_price: {
    title: "Minimum Price (Price Floor)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmin", label: "Pmin", params: { type: "horizontal", y: 6.5 }, color: C.teal, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "Pe", qLabel: "Qe" },
    ],
    annotations: [
      { text: "Surplus", position: { x: 5, y: 7.2 }, color: C.teal, size: 12 },
      { text: "Pmin", position: { x: 0.5, y: 6.8 }, color: C.teal, size: 12 },
    ],
    notes: "Min price set above equilibrium creates a surplus: Qs > Qd at Pmin. Used for minimum wage, agricultural support.",
    examTips: [
      "Must be set ABOVE equilibrium to be effective",
      "Show excess supply (surplus) clearly",
      "Evaluate: unemployment (labour market), government cost of buying surplus",
    ],
  },

  /* ══════════════════════════════════════════
     13. CONSUMER & PRODUCER SURPLUS
     ══════════════════════════════════════════ */
  wjec_cs_ps: {
    title: "Consumer & Producer Surplus",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "Pe", qLabel: "Qe" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [{ x: 0, y: 9 }, { eq: "E" }, { curve: "D", atX: 0 }],
        color: C.demand,
        opacity: 0.12,
        label: "Consumer surplus",
      },
      {
        type: "triangle",
        vertices: [{ x: 0, y: 1 }, { eq: "E" }, { curve: "S", atX: 0 }],
        color: C.supply,
        opacity: 0.12,
        label: "Producer surplus",
      },
    ],
    notes: "CS = area between demand curve and market price. PS = area between supply curve and market price. Total welfare = CS + PS.",
    examTips: [
      "CS is above the price line and below demand",
      "PS is below the price line and above supply",
      "Changes in CS and PS are key to evaluating policy interventions",
    ],
  },

  /* ══════════════════════════════════════════
     14. LABOUR MARKET — Wage Determination
     ══════════════════════════════════════════ */
  wjec_labour_market: {
    title: "Labour Market — Wage Determination",
    axisLabels: { x: "Quantity of Labour (Q)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D_L (MRP)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "SL", label: "S_L", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "W₁", qLabel: "L₁", tooltip: "Labour market equilibrium" },
    ],
    notes: "Wage determined where labour demand (MRP) = labour supply. Shifts from productivity, migration, skills, or union power.",
    examTips: [
      "WJEC Unit 2: labour demand derives from MRP (marginal revenue product)",
      "Show how minimum wage above W₁ creates unemployment",
      "Discuss elasticity of D_L and S_L for policy evaluation",
    ],
  },

  /* ══════════════════════════════════════════
     15. MINIMUM WAGE (Labour Market)
     ══════════════════════════════════════════ */
  wjec_minimum_wage: {
    title: "National Minimum Wage",
    axisLabels: { x: "Quantity of Labour (Q)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D_L", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "SL", label: "S_L", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "NMW", label: "NMW", params: { type: "horizontal", y: 6.5 }, color: C.orange, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "We", qLabel: "Le" },
    ],
    annotations: [
      { text: "Unemployment", position: { x: 5, y: 7.2 }, color: C.demand, size: 12 },
    ],
    notes: "NMW above equilibrium wage creates excess supply of labour = unemployment. Those employed benefit; some lose jobs.",
    examTips: [
      "Show Ld < Ls at NMW clearly",
      "Evaluate: depends on elasticity of D_L — inelastic demand → less unemployment",
      "Real-world: monopsony may mean NMW increases employment",
    ],
  },

  /* ══════════════════════════════════════════
     16. SHORT-RUN COST CURVES
     ══════════════════════════════════════════ */
  wjec_sr_costs: {
    title: "Short-Run Cost Curves",
    axisLabels: { x: "Output (Q)", y: "Cost (£)" },
    curves: [
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.35, b: -2.8, c: 9 }, color: C.demand },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.18, b: -1.5, c: 7 }, color: C.supply },
      { id: "AVC", label: "AVC", params: { type: "quadratic", a: 0.15, b: -1.3, c: 5 }, color: C.teal },
    ],
    equilibria: [],
    annotations: [
      { text: "Productive efficiency", position: { x: 4.2, y: 3.5 }, color: C.eq, size: 10 },
    ],
    notes: "MC cuts ATC and AVC at their minimum points. Productive efficiency at min ATC.",
    examTips: [
      "MC always passes through the minimum of ATC and AVC",
      "Shutdown point: P < min AVC in short run",
      "Link to market structures: where MC = MR determines profit-max output",
    ],
  },

  /* ══════════════════════════════════════════
     17. MONOPOLY — Profit Maximisation
     ══════════════════════════════════════════ */
  wjec_monopoly: {
    title: "Monopoly — Supernormal Profit",
    axisLabels: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curves: [
      { id: "AR", label: "AR (D)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "MR", label: "MR", params: { type: "linear", slope: -1.4, intercept: 9 }, color: C.pink },
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.35, b: -2.8, c: 9 }, color: C.supply },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.18, b: -1.5, c: 7 }, color: C.teal },
    ],
    equilibria: [
      { id: "PM", label: "Profit Max", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "MC = MR: profit maximisation" },
    ],
    annotations: [
      { text: "Supernormal profit", position: { x: 4.5, y: 6 }, color: C.eq, size: 11 },
      { text: "DWL", position: { x: 5.5, y: 4.5 }, color: C.demand, size: 10 },
    ],
    notes: "Monopoly: price-maker, P > MC → allocative inefficiency. Supernormal profit sustained by barriers to entry.",
    examTips: [
      "Find output where MC = MR, then price from AR curve at that Q",
      "Supernormal profit = (AR − ATC) × Q — shade the rectangle",
      "Evaluate: economies of scale, dynamic efficiency, X-inefficiency",
    ],
  },

  /* ══════════════════════════════════════════
     18. AD/AS — Macroeconomic Equilibrium
     ══════════════════════════════════════════ */
  wjec_ad_as: {
    title: "AD/AS Macroeconomic Equilibrium",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 7 }, color: C.lras, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "AD", curve2: "SRAS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁", tooltip: "Short-run equilibrium" },
    ],
    notes: "Short-run equilibrium where AD = SRAS. LRAS shows full-employment output (Yn).",
    examTips: [
      "WJEC: distinguish classical (vertical LRAS) from Keynesian (L-shaped LRAS)",
      "AD shifts: C, I, G, (X−M) changes",
      "SRAS shifts: input costs, commodity prices",
    ],
  },

  /* ══════════════════════════════════════════
     19. AD INCREASE — Demand-Pull Inflation
     ══════════════════════════════════════════ */
  wjec_ad_increase: {
    title: "Increase in AD — Demand-Pull Inflation",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.7, intercept: 8 }, color: C.demand },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.7, intercept: 9.5 }, color: C.demand, dash: true, shiftedFrom: "AD1" },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 7 }, color: C.lras, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD1", curve2: "SRAS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD2", curve2: "SRAS", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "AD shifts right → higher PL and Y. Beyond Yn, purely inflationary.",
    examTips: [
      "Show both equilibria with dashed projections",
      "Discuss multiplier effect if triggered by G or I increase",
      "Evaluate: trade-off between growth and inflation",
    ],
  },

  /* ══════════════════════════════════════════
     20. SRAS DECREASE — Cost-Push Inflation
     ══════════════════════════════════════════ */
  wjec_cost_push: {
    title: "SRAS Decrease — Cost-Push Inflation",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "SRAS1", label: "SRAS₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "SRAS2", label: "SRAS₂", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "SRAS1" },
      { id: "LRAS", label: "LRAS", params: { type: "vertical", x: 7 }, color: C.lras, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD", curve2: "SRAS1", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD", curve2: "SRAS2", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "SRAS shifts left → stagflation (higher PL, lower Y). Causes: oil price rises, wage increases, supply chain disruption.",
    examTips: [
      "Higher PL AND lower Y: worst of both worlds (stagflation)",
      "Causes: commodity price rises, exchange rate depreciation, higher indirect taxes",
      "Policy dilemma: expansionary policy worsens inflation, contractionary worsens unemployment",
    ],
  },

  /* ══════════════════════════════════════════
     21. LRAS SHIFT — Supply-Side Growth
     ══════════════════════════════════════════ */
  wjec_lras_shift: {
    title: "LRAS Shift — Supply-Side Improvement",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "SRAS", label: "SRAS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "LRAS1", label: "LRAS₁", params: { type: "vertical", x: 6 }, color: C.lras, dash: true, width: 2 },
      { id: "LRAS2", label: "LRAS₂", params: { type: "vertical", x: 8 }, color: C.eq, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "AD", curve2: "SRAS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
    ],
    annotations: [
      { text: "Yn₁", position: { x: 6, y: 0.5 }, color: C.lras, size: 11 },
      { text: "Yn₂", position: { x: 8, y: 0.5 }, color: C.eq, size: 11 },
      { text: "Growth →", position: { x: 7, y: 2 }, color: C.eq, size: 12 },
    ],
    notes: "LRAS shifts right from education, training, infrastructure, technology, deregulation. Non-inflationary growth.",
    examTips: [
      "Supply-side policies shift LRAS right without raising PL",
      "Evaluate: time lags, cost, inequality, political feasibility",
    ],
  },

  /* ══════════════════════════════════════════
     22. KEYNESIAN AS
     ══════════════════════════════════════════ */
  wjec_keynesian_as: {
    title: "Keynesian Aggregate Supply",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand },
      {
        id: "KAS", label: "Keynesian AS", params: {
          type: "piecewise",
          segments: [
            { xFrom: 0, xTo: 4, curve: { type: "linear", slope: 0, intercept: 2 } },
            { xFrom: 4, xTo: 7, curve: { type: "quadratic", a: 0.3, b: -2.1, c: 5.8 } },
            { xFrom: 7, xTo: 10, curve: { type: "linear", slope: 50, intercept: -344 } },
          ],
        }, color: C.supply, width: 3,
      },
    ],
    equilibria: [],
    annotations: [
      { text: "Spare capacity", position: { x: 2, y: 1.5 }, color: C.eq, size: 10 },
      { text: "Near full employment", position: { x: 5.5, y: 3.5 }, color: C.orange, size: 10 },
      { text: "Full employment", position: { x: 7.5, y: 7 }, color: C.demand, size: 10 },
    ],
    notes: "Three ranges: horizontal (spare capacity), upward-sloping (near capacity), vertical (full employment). Keynesian argument for fiscal stimulus in a recession.",
    examTips: [
      "WJEC expects awareness of BOTH Classical and Keynesian LRAS",
      "In recession (horizontal section): AD increase → higher Y, no inflation",
      "Near full employment: AD increase → both Y and PL rise",
    ],
  },

  /* ══════════════════════════════════════════
     23. PHILLIPS CURVE
     ══════════════════════════════════════════ */
  wjec_phillips_curve: {
    title: "Phillips Curve — Short-Run Trade-Off",
    axisLabels: { x: "Unemployment Rate (%)", y: "Inflation Rate (%)" },
    curves: [
      { id: "SRPC", label: "SRPC", params: { type: "quadratic", a: 0.15, b: -2.2, c: 9 }, color: C.demand },
      { id: "LRPC", label: "LRPC", params: { type: "vertical", x: 5 }, color: C.lras, dash: true, width: 2 },
    ],
    equilibria: [],
    annotations: [
      { text: "NRU", position: { x: 5, y: 0.5 }, color: C.lras, size: 11 },
      { text: "Trade-off zone", position: { x: 3, y: 5 }, color: C.demand, size: 11 },
    ],
    notes: "Short-run trade-off between inflation and unemployment. LRPC vertical at NRU — no long-run trade-off (expectations-augmented).",
    examTips: [
      "Short run: lower unemployment → higher inflation",
      "Long run: LRPC vertical at NRU — supply-side policies shift NRU left",
      "Evaluate: breakdown of relationship (stagflation of 1970s)",
    ],
  },

  /* ══════════════════════════════════════════
     24. TARIFF DIAGRAM
     ══════════════════════════════════════════ */
  wjec_tariff: {
    title: "Tariff on Imports",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "S_dom", label: "S_dom", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw", params: { type: "horizontal", y: 3 }, color: C.eq, width: 2 },
      { id: "Pw_t", label: "Pw + tariff", params: { type: "horizontal", y: 4.5 }, color: C.orange, dash: true, width: 2 },
    ],
    equilibria: [],
    annotations: [
      { text: "Tariff revenue", position: { x: 5, y: 3.8 }, color: C.orange, size: 11 },
      { text: "Imports before", position: { x: 5, y: 2.5 }, color: C.eq, size: 10 },
      { text: "Imports after", position: { x: 5, y: 5.2 }, color: C.orange, size: 10 },
    ],
    notes: "Tariff raises domestic price. Domestic production rises, consumption falls, imports shrink. Government gains tariff revenue but deadweight loss occurs.",
    examTips: [
      "Show: domestic Q rises, consumption Q falls, imports contract",
      "Tariff revenue = tariff per unit × quantity of imports after tariff",
      "Evaluate: protection vs efficiency loss, retaliation risk, WTO rules",
    ],
  },

  /* ══════════════════════════════════════════
     25. QUOTA DIAGRAM
     ══════════════════════════════════════════ */
  wjec_quota: {
    title: "Import Quota",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "S_dom", label: "S_dom", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw", params: { type: "horizontal", y: 3 }, color: C.eq, width: 2 },
    ],
    equilibria: [],
    annotations: [
      { text: "Quota limit", position: { x: 5, y: 5 }, color: C.orange, size: 11 },
      { text: "Price rises to Pq", position: { x: 2, y: 4.5 }, color: C.demand, size: 10 },
    ],
    notes: "Quota restricts import volume. Domestic price rises above world price. Domestic producers gain, consumers lose. Quota rent to licence holders.",
    examTips: [
      "Unlike tariff, no government revenue — quota rent goes to import licence holders",
      "Show reduced imports and higher domestic price",
      "Evaluate: less transparent than tariff, harder to remove, potential corruption",
    ],
  },

  /* ══════════════════════════════════════════
     26. EXCHANGE RATE — Floating
     ══════════════════════════════════════════ */
  wjec_exchange_rate: {
    title: "Floating Exchange Rate",
    axisLabels: { x: "Quantity of Currency", y: "Exchange Rate (£/$)" },
    curves: [
      { id: "D_curr", label: "D£", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "S_curr", label: "S£", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E", label: "E", curve1: "D_curr", curve2: "S_curr", color: C.eq, pLabel: "ER₁", qLabel: "Q₁", tooltip: "Equilibrium exchange rate" },
    ],
    notes: "Exchange rate determined by demand for and supply of currency. Demand from exports, FDI, hot money. Supply from imports, investment abroad.",
    examTips: [
      "Appreciation: D£ shifts right or S£ shifts left → higher ER",
      "Depreciation: D£ shifts left or S£ shifts right → lower ER",
      "Discuss J-curve and Marshall-Lerner condition for current account effects",
    ],
  },

  /* ══════════════════════════════════════════
     27. LORENZ CURVE — Inequality
     ══════════════════════════════════════════ */
  wjec_lorenz: {
    title: "Lorenz Curve — Income Inequality",
    axisLabels: { x: "Cumulative % of Population", y: "Cumulative % of Income" },
    curves: [
      { id: "equality", label: "Line of Equality", params: { type: "linear", slope: 1, intercept: 0 }, color: C.lras, dash: true },
      { id: "lorenz", label: "Lorenz Curve", params: { type: "quadratic", a: 0.1, b: 0, c: 0 }, color: C.demand, width: 3 },
    ],
    equilibria: [],
    annotations: [
      { text: "Gini = A / (A+B)", position: { x: 3, y: 6 }, color: C.lras, size: 11 },
      { text: "A", position: { x: 4, y: 3 }, color: C.orange, size: 14 },
      { text: "B", position: { x: 6, y: 1.5 }, color: C.eq, size: 14 },
    ],
    notes: "Line of equality = perfect equality. Lorenz curve bows further out = more inequality. Gini coefficient = area A / (A+B), ranges 0 to 1.",
    examTips: [
      "More bowed curve = greater inequality",
      "Policy effects: progressive taxation shifts Lorenz closer to equality line",
      "Compare countries or time periods using Gini changes",
    ],
  },

  /* ══════════════════════════════════════════
     28. MONOPOLISTIC COMPETITION
     ══════════════════════════════════════════ */
  wjec_mon_comp: {
    title: "Monopolistic Competition — Long-Run Equilibrium",
    axisLabels: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curves: [
      { id: "AR", label: "AR (D)", params: { type: "linear", slope: -0.5, intercept: 8 }, color: C.demand },
      { id: "MR", label: "MR", params: { type: "linear", slope: -1.0, intercept: 8 }, color: C.pink },
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.3, b: -2.5, c: 8 }, color: C.supply },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.15, b: -1.3, c: 6.5 }, color: C.teal },
    ],
    equilibria: [
      { id: "PM", label: "LR Eq", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "P", qLabel: "Q", tooltip: "Long run: AR tangent to ATC → normal profit only" },
    ],
    annotations: [
      { text: "Normal profit only", position: { x: 5, y: 7 }, color: C.eq, size: 11 },
    ],
    notes: "Long run: entry of new firms shifts AR left until AR is tangent to ATC. Normal profit, allocatively and productively inefficient.",
    examTips: [
      "AR tangent to ATC at profit-max output (MC = MR)",
      "No supernormal profit in LR — free entry eliminates it",
      "Evaluate: product differentiation, non-price competition, excess capacity",
    ],
  },
};
