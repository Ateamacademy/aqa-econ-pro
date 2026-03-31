/**
 * EDEXCEL INTERNATIONAL GCSE ECONOMICS (4EC1)
 * Board-specific diagram specifications.
 * Paper 1: Microeconomics & Business Economics
 * Paper 2: Macroeconomics & the Global Economy
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
  mpc: "#fca5a5",
  mpb: "#93c5fd",
  lras: "#6b7280",
  orange: "#f97316",
  gold: "#eab308",
};

export const EDEXCEL_IGCSE_DIAGRAM_SPECS: Record<string, DiagramSpec> = {
  /* ══════════════════════════════════════════════
     PAPER 1: MICROECONOMICS & BUSINESS ECONOMICS
     ══════════════════════════════════════════════ */

  edxig_ppf: {
    title: "Production Possibility Frontier (Edexcel IGCSE)",
    axisLabels: { x: "Good X", y: "Good Y" },
    curves: [
      { id: "PPF", label: "PPF", params: { type: "quadratic", a: -0.12, b: -0.1, c: 8.5 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "A (efficient)", position: { x: 3, y: 7.1 }, color: C.eq, size: 11 },
      { text: "B (efficient)", position: { x: 6, y: 4.9 }, color: C.eq, size: 11 },
      { text: "C (inefficient)", position: { x: 3, y: 4 }, color: C.demand, size: 11 },
      { text: "D (unattainable)", position: { x: 7, y: 7.5 }, color: C.orange, size: 11 },
    ],
    notes: "The PPF shows maximum combinations of two goods with fixed resources. Points on the curve are productively efficient; inside is inefficient (unemployed resources); outside is unattainable.",
    examTips: [
      "Label both axes clearly with good names",
      "Mark efficient, inefficient, and unattainable points",
      "Opportunity cost = slope of the PPF",
      "Outward shift = economic growth (more resources or better technology)",
    ],
  },

  edxig_ppf_growth: {
    title: "PPF Outward Shift — Economic Growth (Edexcel IGCSE)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "quadratic", a: -0.12, b: -0.1, c: 8.5 }, color: C.supply },
      { id: "PPF2", label: "PPF₂", params: { type: "quadratic", a: -0.1, b: -0.08, c: 9.8 }, color: C.supply, dash: true, shiftedFrom: "PPF1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Economic growth →", position: { x: 5, y: 3 }, color: C.shifted, size: 12 },
    ],
    notes: "An outward shift represents economic growth. Caused by: more resources, improved technology, better education/training, FDI.",
    examTips: [
      "Show PPF₁ shifting outward to PPF₂",
      "Explain the cause of the shift",
      "Previously unattainable points become attainable",
    ],
  },

  edxig_demand_supply_equilibrium: {
    title: "Market Equilibrium (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "Pe", qLabel: "Qe", tooltip: "Equilibrium: Qd = Qs" },
    ],
    annotations: [
      { text: "Excess supply above Pe", position: { x: 7.5, y: 7.5 }, color: C.supply, size: 10 },
      { text: "Excess demand below Pe", position: { x: 7.5, y: 2.5 }, color: C.demand, size: 10 },
    ],
    notes: "The price mechanism allocates resources. At equilibrium, quantity demanded equals quantity supplied. The price mechanism has three functions: signalling, rationing, and incentive.",
    examTips: [
      "Use Pe and Qe notation for Edexcel IGCSE",
      "Explain how excess demand/supply causes price adjustment",
      "State the three functions of the price mechanism",
    ],
  },

  edxig_demand_increase: {
    title: "Increase in Demand (Edexcel IGCSE)",
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
    notes: "Demand shifts right: income rises (normal goods), population growth, advertising, tastes change, price of substitutes rises, price of complements falls.",
    examTips: [
      "D₁ → D₂ rightward shift",
      "Price rises from P₁ to P₂, quantity rises from Q₁ to Q₂",
      "State the cause from the data extract",
    ],
  },

  edxig_supply_decrease: {
    title: "Decrease in Supply (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    notes: "Supply shifts left: higher input costs, indirect taxes, bad weather, fewer firms. Price rises, quantity falls.",
    examTips: [
      "S₁ shifts LEFT to S₂",
      "Price rises, quantity falls",
      "Explain the cause clearly in your answer",
    ],
  },

  edxig_ped: {
    title: "Price Elasticity of Demand (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D_elastic", label: "D (elastic)", params: { type: "linear", slope: -0.3, intercept: 7 }, color: C.demand },
      { id: "D_inelastic", label: "D (inelastic)", params: { type: "linear", slope: -2.5, intercept: 14 }, color: C.orange },
    ],
    equilibria: [],
    annotations: [
      { text: "Elastic: PED > 1", position: { x: 7, y: 5.5 }, color: C.demand, size: 11 },
      { text: "Inelastic: PED < 1", position: { x: 3, y: 3 }, color: C.orange, size: 11 },
    ],
    notes: "PED = %ΔQd / %ΔP. Elastic (>1): many substitutes, luxury, large share of income. Inelastic (<1): necessities, few substitutes, habit-forming. Business uses PED for pricing strategy.",
    examTips: [
      "Show formula, substitute values, interpret the result",
      "Elastic → price cut increases revenue",
      "Inelastic → price rise increases revenue",
    ],
  },

  edxig_pes: {
    title: "Price Elasticity of Supply (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "S_elastic", label: "S (elastic)", params: { type: "linear", slope: 0.3, intercept: 1 }, color: C.supply },
      { id: "S_inelastic", label: "S (inelastic)", params: { type: "linear", slope: 2.5, intercept: 1 }, color: C.orange },
    ],
    equilibria: [],
    annotations: [
      { text: "Elastic: PES > 1", position: { x: 7, y: 3.5 }, color: C.supply, size: 11 },
      { text: "Inelastic: PES < 1", position: { x: 2, y: 6 }, color: C.orange, size: 11 },
    ],
    notes: "PES depends on: spare capacity, stock levels, time period, factor mobility. Short run → inelastic. Long run → more elastic.",
  },

  edxig_indirect_tax: {
    title: "Indirect Tax (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₁ + tax", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    annotations: [
      { text: "Tax wedge", position: { eq: "E2", dx: 1.5, dy: -0.8 }, color: C.orange, size: 11 },
    ],
    notes: "An indirect tax shifts supply left. Consumers pay more, producers receive less. The incidence depends on PED and PES. Used to correct negative externalities (demerit goods).",
    examTips: [
      "Show tax shifting S up/left",
      "Consumer + producer share burden depending on elasticity",
      "Revenue = tax × Q₂",
    ],
  },

  edxig_subsidy: {
    title: "Subsidy (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₁ + subsidy", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    notes: "A subsidy shifts supply right, lowering price and increasing output. Used to encourage merit good consumption or support industries.",
  },

  edxig_neg_externality: {
    title: "Negative Externality (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curves: [
      { id: "MPC", label: "Private cost (S)", params: { type: "linear", slope: 0.6, intercept: 1.5 }, color: C.supply },
      { id: "MSC", label: "Social cost", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.msc },
      { id: "D", label: "D", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "MPC", curve2: "D", color: C.eq, pLabel: "Pm", qLabel: "Qm" },
      { id: "Esocial", label: "Social opt.", curve1: "MSC", curve2: "D", color: C.shifted, pLabel: "Ps", qLabel: "Qs" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { curve: "MSC", atEqX: "Emarket" },
          { eq: "Emarket" },
          { eq: "Esocial" },
        ],
        color: C.demand,
        opacity: 0.18,
        label: "Welfare loss",
      },
    ],
    notes: "Social cost > Private cost due to external costs (pollution, noise). Free market overproduces (Qm > Qs). Government uses taxes, regulation, or tradeable permits to correct.",
    examTips: [
      "External cost = MSC − MPC (the vertical gap)",
      "Overproduction creates welfare loss triangle",
      "Corrective tax shifts MPC up towards MSC",
    ],
    sanityChecks: [
      { description: "Qm > Qs (overproduction)", check: { eq1: "Emarket", eq2: "Esocial", axis: "x", relation: ">" } },
    ],
  },

  edxig_pos_externality: {
    title: "Positive Externality (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MPB", label: "Private benefit (D)", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand },
      { id: "MSB", label: "Social benefit", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.msb },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "S", curve2: "MPB", color: C.eq, pLabel: "Pm", qLabel: "Qm" },
      { id: "Esocial", label: "Social opt.", curve1: "S", curve2: "MSB", color: C.shifted, pLabel: "Ps", qLabel: "Qs" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { curve: "MSB", atEqX: "Emarket" },
          { eq: "Emarket" },
          { eq: "Esocial" },
        ],
        color: C.supply,
        opacity: 0.18,
        label: "Welfare loss",
      },
    ],
    notes: "Social benefit > Private benefit due to external benefits (education, healthcare). Free market underconsumes. Government uses subsidies or free provision.",
    sanityChecks: [
      { description: "Qm < Qs (underconsumption)", check: { eq1: "Emarket", eq2: "Esocial", axis: "x", relation: "<" } },
    ],
  },

  edxig_merit_good: {
    title: "Merit Good — Information Failure (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D1", label: "D₁ (perceived)", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand },
      { id: "D2", label: "D₂ (actual)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.msb, dash: true },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "S", curve2: "D1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "Eopt", label: "Optimal", curve1: "S", curve2: "D2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    notes: "Consumers undervalue merit goods due to imperfect information. Actual benefit D₂ > perceived D₁. Results in underconsumption.",
  },

  edxig_demerit_good: {
    title: "Demerit Good — Information Failure (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D1", label: "D₁ (perceived)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "D2", label: "D₂ (actual)", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.msb, dash: true },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "S", curve2: "D1", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
      { id: "Eopt", label: "Optimal", curve1: "S", curve2: "D2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂" },
    ],
    notes: "Consumers overvalue demerit goods. Perceived benefit D₁ > actual D₂. Results in overconsumption. Government uses taxes, bans, or information campaigns.",
  },

  edxig_price_ceiling: {
    title: "Maximum Price (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmax", label: "Pmax", params: { type: "horizontal", y: 3.5 }, color: C.orange, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "Pe", qLabel: "Qe" },
    ],
    annotations: [
      { text: "Shortage (excess demand)", position: { x: 5, y: 2.8 }, color: C.demand, size: 11 },
    ],
    notes: "Maximum price set below equilibrium to make goods affordable. Creates a shortage — Qd > Qs. May lead to black markets or rationing.",
  },

  edxig_price_floor: {
    title: "Minimum Price (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmin", label: "Pmin", params: { type: "horizontal", y: 6.5 }, color: C.orange, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "Pe", qLabel: "Qe" },
    ],
    annotations: [
      { text: "Surplus (excess supply)", position: { x: 5, y: 7 }, color: C.supply, size: 11 },
    ],
    notes: "Minimum price set above equilibrium. Creates a surplus. Used in labour market (minimum wage) and agriculture.",
  },

  edxig_costs_revenue: {
    title: "Costs, Revenue & Profit (Edexcel IGCSE)",
    axisLabels: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curves: [
      { id: "TC", label: "Total Cost", params: { type: "linear", slope: 0.8, intercept: 2 }, color: C.demand },
      { id: "TR", label: "Total Revenue", params: { type: "linear", slope: 1.2, intercept: 0 }, color: C.supply },
    ],
    equilibria: [
      { id: "BEP", label: "Break-even", curve1: "TC", curve2: "TR", color: C.eq, pLabel: "", qLabel: "Q(BE)", tooltip: "Break-even: TR = TC" },
    ],
    annotations: [
      { text: "Loss", position: { x: 2, y: 4 }, color: C.demand, size: 11 },
      { text: "Profit", position: { x: 7, y: 5 }, color: C.eq, size: 11 },
    ],
    notes: "Profit = TR − TC. Break-even where TR = TC. At output below break-even, the firm makes a loss. Above break-even, it makes profit.",
    examTips: [
      "Total Revenue = Price × Quantity",
      "Total Cost = Fixed Costs + Variable Costs",
      "Profit = TR − TC",
    ],
  },

  edxig_economies_of_scale: {
    title: "Economies of Scale (Edexcel IGCSE)",
    axisLabels: { x: "Output (Q)", y: "Average Cost (£)" },
    curves: [
      { id: "LRAC", label: "LRAC", params: { type: "quadratic", a: 0.15, b: -1.5, c: 7.5 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "Economies of scale", position: { x: 2.5, y: 6 }, color: C.eq, size: 10 },
      { text: "Diseconomies of scale", position: { x: 7.5, y: 6 }, color: C.demand, size: 10 },
      { text: "MES", position: { x: 5, y: 3.5 }, color: C.shifted, size: 11 },
    ],
    notes: "Types of economies of scale: purchasing, managerial, technical, financial, marketing. MES = minimum efficient scale.",
  },

  edxig_minimum_wage: {
    title: "Minimum Wage (Edexcel IGCSE)",
    axisLabels: { x: "Quantity of Labour (L)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D (labour)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "SL", label: "S (labour)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "MW", label: "Min Wage", params: { type: "horizontal", y: 6.5 }, color: C.orange, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "W*", qLabel: "L*" },
    ],
    annotations: [
      { text: "Unemployment", position: { x: 5, y: 7 }, color: C.demand, size: 12 },
    ],
    notes: "Minimum wage above equilibrium creates surplus of labour = unemployment (classical view). But may boost spending and productivity (Keynesian view).",
    examTips: [
      "Must be set ABOVE W* to have effect",
      "Classical view: creates unemployment",
      "Keynesian view: boosts spending, increases productivity",
    ],
  },

  /* ══════════════════════════════════════════════
     PAPER 2: MACROECONOMICS & GLOBAL ECONOMY
     ══════════════════════════════════════════════ */

  edxig_ad_as: {
    title: "AD/AS Diagram (Edexcel IGCSE)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AS", label: "AS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "AD", curve2: "AS", color: C.eq, pLabel: "PL*", qLabel: "Y*" },
    ],
    notes: "AD = C + I + G + (X−M). AS shows total output at each price level. Equilibrium determines real GDP and price level.",
  },

  edxig_ad_shift: {
    title: "Increase in AD — Demand-Pull Inflation (Edexcel IGCSE)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.7, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "AD1" },
      { id: "AS", label: "AS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD1", curve2: "AS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD2", curve2: "AS", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "AD increases → real GDP rises (growth) and price level rises (demand-pull inflation). Causes: lower interest rates, higher G, tax cuts, rising consumer confidence.",
  },

  edxig_as_decrease: {
    title: "Decrease in AS — Cost-Push Inflation (Edexcel IGCSE)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AS1", label: "AS₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "AS2", label: "AS₂", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "AS1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD", curve2: "AS1", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD", curve2: "AS2", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "AS decreases (shifts left) → price level rises (cost-push inflation) and real GDP falls (recession risk). Causes: rising oil/commodity prices, higher wages, supply chain disruption.",
  },

  edxig_supply_side: {
    title: "Supply-Side Policy — LRAS Shift (Edexcel IGCSE)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AS1", label: "AS₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "AS2", label: "AS₂", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "AS1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD", curve2: "AS1", color: C.eq, pLabel: "PL₁", qLabel: "Y₁" },
      { id: "E2", label: "E₂", curve1: "AD", curve2: "AS2", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂" },
    ],
    notes: "Supply-side policies shift AS right → lower price level and higher output. Non-inflationary growth. E.g. education, deregulation, privatisation, infrastructure.",
    examTips: [
      "AS shifts right — growth without inflation",
      "Slow to take effect — evaluate this limitation",
      "Link to specific policy from the question",
    ],
  },

  edxig_exchange_rate: {
    title: "Exchange Rate Determination (Edexcel IGCSE)",
    axisLabels: { x: "Quantity of Currency", y: "Exchange Rate" },
    curves: [
      { id: "D", label: "D (currency)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S (currency)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "ER*", qLabel: "Q*" },
    ],
    notes: "Exchange rate determined by demand/supply of currency. Demand from exports, tourism, FDI, speculation. Supply from imports, investment abroad.",
  },

  edxig_appreciation: {
    title: "Currency Appreciation (Edexcel IGCSE)",
    axisLabels: { x: "Quantity of £", y: "Exchange Rate ($/£)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "D2", label: "D₂", params: { type: "linear", slope: -0.8, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "D1" },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S", color: C.eq, pLabel: "ER₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D2", curve2: "S", color: C.shifted, pLabel: "ER₂", qLabel: "Q₂" },
    ],
    notes: "Appreciation: currency rises in value. Imports cheaper, exports dearer. Caused by: higher interest rates attracting hot money, strong exports, FDI inflows.",
    examTips: [
      "SPICED: Strong Pound, Imports Cheap, Exports Dear",
      "May worsen current account deficit",
    ],
  },

  edxig_depreciation: {
    title: "Currency Depreciation (Edexcel IGCSE)",
    axisLabels: { x: "Quantity of £", y: "Exchange Rate ($/£)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "ER₁", qLabel: "Q₁" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "ER₂", qLabel: "Q₂" },
    ],
    notes: "Depreciation: currency falls in value. Exports cheaper, imports dearer. May improve current account but risk imported inflation.",
  },

  edxig_tariff: {
    title: "Tariff Diagram (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D (domestic)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "S (domestic)", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw", params: { type: "horizontal", y: 3 }, color: C.eq, dash: true },
      { id: "Pw_t", label: "Pw + tariff", params: { type: "horizontal", y: 4.5 }, color: C.orange, dash: true },
    ],
    equilibria: [],
    annotations: [
      { text: "World price", position: { x: 8.5, y: 3.3 }, color: C.eq, size: 10 },
      { text: "Pw + tariff", position: { x: 8.5, y: 4.8 }, color: C.orange, size: 10 },
      { text: "Tariff revenue", position: { x: 5, y: 3.8 }, color: C.orange, size: 11 },
      { text: "Imports shrink ←→", position: { x: 5, y: 2.2 }, color: C.lras, size: 10 },
    ],
    notes: "A tariff is a tax on imports. Raises domestic price, reduces imports, increases domestic output. Government earns revenue. Arguments: infant industry, jobs, dumping, national security.",
    examTips: [
      "Show Pw and Pw + tariff as horizontal lines",
      "Domestic output rises, imports fall",
      "Consumer surplus falls, producer surplus rises",
      "Evaluate: may cause retaliation, higher prices for consumers",
    ],
  },

  edxig_quota: {
    title: "Import Quota (Edexcel IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D (domestic)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "S (domestic)", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw", params: { type: "horizontal", y: 3 }, color: C.eq, dash: true },
    ],
    equilibria: [],
    annotations: [
      { text: "World price", position: { x: 8.5, y: 3.3 }, color: C.eq, size: 10 },
      { text: "Quota limit", position: { x: 5, y: 4 }, color: C.orange, size: 11 },
      { text: "Price rises to Pq", position: { x: 5, y: 5.5 }, color: C.demand, size: 10 },
    ],
    notes: "A quota is a physical limit on imports. Reduces quantity of imports, raises domestic price. No government revenue (unlike tariff). Quota rent may go to foreign producers.",
  },

  edxig_lorenz: {
    title: "Lorenz Curve (Edexcel IGCSE)",
    axisLabels: { x: "Cumulative % of Population", y: "Cumulative % of Income" },
    curves: [
      { id: "equality", label: "Line of Equality", params: { type: "linear", slope: 1, intercept: 0 }, color: C.lras, dash: true },
      { id: "lorenz", label: "Lorenz Curve", params: { type: "quadratic", a: 0.1, b: 0, c: 0 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "Gini coefficient = A / (A+B)", position: { x: 3, y: 6 }, color: C.lras, size: 11 },
    ],
    notes: "Shows income/wealth distribution. Further from line of equality = more inequality. Gini: 0 = perfect equality, 1 = perfect inequality.",
  },

  edxig_comparative_advantage: {
    title: "Comparative Advantage (Edexcel IGCSE)",
    axisLabels: { x: "Good X", y: "Good Y" },
    curves: [
      { id: "PPF_A", label: "Country A", params: { type: "linear", slope: -1.5, intercept: 9 }, color: C.demand },
      { id: "PPF_B", label: "Country B", params: { type: "linear", slope: -0.6, intercept: 6 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "A: lower opp. cost of Y", position: { x: 2, y: 8 }, color: C.demand, size: 10 },
      { text: "B: lower opp. cost of X", position: { x: 6, y: 2 }, color: C.supply, size: 10 },
    ],
    notes: "Each country specialises in the good where it has the lowest opportunity cost. Both can gain from trade. Compare opportunity costs, not absolute output.",
  },
};
