/**
 * AQA GCSE Economics & Cambridge International IGCSE Economics
 * Diagram specifications · simplified diagrams for GCSE/IGCSE level.
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

export const GCSE_DIAGRAM_SPECS: Record<string, DiagramSpec> = {
  /* ══════════════════════════════════════════════
     A. FOUNDATION DIAGRAMS
     ══════════════════════════════════════════════ */

  gcse_ppf: {
    title: "Production Possibility Frontier (GCSE/IGCSE)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
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
    notes: "The PPF shows the maximum output of two goods with fixed resources. Points on the curve are efficient; inside is inefficient; outside is unattainable.",
    examTips: [
      "Label both axes with the two goods",
      "Mark points inside (inefficient), on (efficient), and outside (unattainable)",
      "Opportunity cost = what you give up when moving along the curve",
    ],
  },

  gcse_ppf_outward_shift: {
    title: "PPF Outward Shift · Economic Growth",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "quadratic", a: -0.12, b: -0.1, c: 8.5 }, color: C.supply },
      { id: "PPF2", label: "PPF₂", params: { type: "quadratic", a: -0.1, b: -0.08, c: 9.8 }, color: C.supply, dash: true, shiftedFrom: "PPF1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Economic growth", position: { x: 5, y: 3 }, color: C.shifted, size: 12 },
    ],
    notes: "An outward shift of the PPF represents economic growth · more of both goods can be produced. Caused by better technology, more resources, or improved education.",
    examTips: [
      "Show PPF₁ (original) and PPF₂ (shifted out)",
      "Explain the cause: new technology, discovery of resources, better education",
      "Previously unattainable combinations are now possible",
    ],
  },

  gcse_demand_shift: {
    title: "Increase in Demand (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "D2", label: "D₂", params: { type: "linear", slope: -0.8, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "D1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "Original equilibrium" },
      { id: "E2", label: "E₂", curve1: "D2", curve2: "S1", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "New equilibrium after demand increase" },
    ],
    notes: "When demand increases (shifts right), both equilibrium price and quantity rise. Causes: higher incomes, advertising, population growth, changes in tastes.",
    examTips: [
      "Show D₁ shifting right to D₂",
      "Price rises from P₁ to P₂",
      "Quantity rises from Q₁ to Q₂",
      "State the cause of the demand shift in your answer",
    ],
  },

  gcse_supply_shift: {
    title: "Increase in Supply (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₂", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "Original equilibrium" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "New equilibrium after supply increase" },
    ],
    notes: "When supply increases (shifts right), price falls and quantity rises. Causes: lower costs, better technology, more firms entering the market.",
    examTips: [
      "Show S₁ shifting right to S₂",
      "Price falls from P₁ to P₂",
      "Quantity rises from Q₁ to Q₂",
    ],
  },

  gcse_equilibrium: {
    title: "Market Equilibrium (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*", tooltip: "Market equilibrium: Qd = Qs" },
    ],
    annotations: [
      { text: "Excess supply above P*", position: { x: 7.5, y: 7.5 }, color: C.supply, size: 10 },
      { text: "Excess demand below P*", position: { x: 7.5, y: 2.5 }, color: C.demand, size: 10 },
    ],
    notes: "Equilibrium is where demand equals supply. Above P*, there is excess supply (surplus). Below P*, there is excess demand (shortage).",
    examTips: [
      "Label equilibrium price P* and quantity Q*",
      "If price is above P*, there is a surplus · price falls",
      "If price is below P*, there is a shortage · price rises",
    ],
  },

  gcse_excess_demand: {
    title: "Excess Demand / Shortage (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Plow", label: "P₁", params: { type: "horizontal", y: 3.5 }, color: C.orange, dash: true },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*", tooltip: "Equilibrium" },
    ],
    annotations: [
      { text: "Shortage", position: { x: 5, y: 2.8 }, color: C.demand, size: 12 },
    ],
    notes: "At P₁ (below equilibrium), quantity demanded exceeds quantity supplied · there is a shortage. Price will rise towards P*.",
    examTips: [
      "Show horizontal line at P₁ below equilibrium",
      "Mark Qd and Qs at that price level",
      "The gap is the shortage / excess demand",
    ],
  },

  gcse_excess_supply: {
    title: "Excess Supply / Surplus (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Phigh", label: "P₂", params: { type: "horizontal", y: 7 }, color: C.orange, dash: true },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*", tooltip: "Equilibrium" },
    ],
    annotations: [
      { text: "Surplus", position: { x: 5, y: 7.5 }, color: C.supply, size: 12 },
    ],
    notes: "At P₂ (above equilibrium), quantity supplied exceeds quantity demanded · there is a surplus. Price will fall towards P*.",
    examTips: [
      "Show horizontal line at P₂ above equilibrium",
      "Mark Qd and Qs at that price level",
      "The gap is the surplus / excess supply",
    ],
  },

  /* ══════════════════════════════════════════════
     B. CORE MARKET DIAGRAMS
     ══════════════════════════════════════════════ */

  gcse_indirect_tax: {
    title: "Indirect Tax (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₁ + tax", params: { type: "linear", slope: 0.8, intercept: 2.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "Before tax" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "After tax · price rises, quantity falls" },
    ],
    annotations: [
      { text: "Tax", position: { eq: "E2", dx: 1.5, dy: -0.8 }, color: C.orange, size: 11 },
    ],
    notes: "An indirect tax shifts supply left (S + tax). Consumers pay a higher price, producers receive less. Output falls. The tax reduces consumption of demerit goods.",
    examTips: [
      "Tax shifts supply UP/LEFT by the tax amount",
      "Price rises but usually by less than the full tax · consumers and producers share the burden",
      "Quantity traded falls from Q₁ to Q₂",
    ],
  },

  gcse_subsidy: {
    title: "Subsidy (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S2", label: "S₁ + subsidy", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.supply, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "Before subsidy" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "After subsidy · price falls, quantity rises" },
    ],
    notes: "A subsidy shifts supply right (lower cost to produce). Consumers pay less, output increases. Used to encourage merit good consumption.",
    examTips: [
      "Subsidy shifts supply DOWN/RIGHT",
      "Price falls, quantity rises",
      "Government pays the subsidy · has an opportunity cost",
    ],
  },

  gcse_price_ceiling: {
    title: "Maximum Price / Price Ceiling (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmax", label: "Pmax", params: { type: "horizontal", y: 3.5 }, color: C.orange, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*", tooltip: "Free market equilibrium" },
    ],
    annotations: [
      { text: "Shortage", position: { x: 5, y: 2.8 }, color: C.demand, size: 12 },
      { text: "Maximum price", position: { x: 8, y: 3.8 }, color: C.orange, size: 11 },
    ],
    notes: "A maximum price (price ceiling) is set below equilibrium to make goods affordable. It causes a shortage · quantity demanded exceeds quantity supplied.",
    examTips: [
      "Pmax must be BELOW equilibrium to have an effect",
      "Creates a shortage · Qd > Qs at Pmax",
      "May lead to rationing, black markets, or queues",
    ],
  },

  gcse_price_floor: {
    title: "Minimum Price / Price Floor (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmin", label: "Pmin", params: { type: "horizontal", y: 6.5 }, color: C.orange, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*", tooltip: "Free market equilibrium" },
    ],
    annotations: [
      { text: "Surplus", position: { x: 5, y: 7 }, color: C.supply, size: 12 },
      { text: "Minimum price", position: { x: 8, y: 6.8 }, color: C.orange, size: 11 },
    ],
    notes: "A minimum price (price floor) is set above equilibrium. It causes a surplus · quantity supplied exceeds quantity demanded. Example: minimum wage, agricultural price support.",
    examTips: [
      "Pmin must be ABOVE equilibrium to have an effect",
      "Creates a surplus · Qs > Qd at Pmin",
      "Minimum wage: surplus of labour = unemployment",
    ],
  },

  gcse_negative_externality: {
    title: "Negative Externality (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price / Cost" },
    curves: [
      { id: "MPC", label: "Private cost (S)", params: { type: "linear", slope: 0.6, intercept: 1.5 }, color: C.supply },
      { id: "MSC", label: "Social cost", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.msc },
      { id: "D", label: "D", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "MPC", curve2: "D", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "Free market: too much produced" },
      { id: "Esocial", label: "Social opt.", curve1: "MSC", curve2: "D", color: C.shifted, pLabel: "Ps", qLabel: "Qs", tooltip: "Social optimum: less output" },
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
    notes: "Social cost > Private cost due to external costs (e.g. pollution). The free market overproduces. The shaded triangle is the welfare loss from overproduction.",
    examTips: [
      "Social cost is ABOVE private cost · the gap is the external cost",
      "Free market produces too much (Qm > Qs)",
      "Government can use a tax to reduce output towards the socially optimal level",
    ],
    sanityChecks: [
      { description: "Qm > Qs (overproduction)", check: { eq1: "Emarket", eq2: "Esocial", axis: "x", relation: ">" } },
    ],
  },

  gcse_positive_externality: {
    title: "Positive Externality (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price / Benefit" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "MPB", label: "Private benefit (D)", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand },
      { id: "MSB", label: "Social benefit", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.msb },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "S", curve2: "MPB", color: C.eq, pLabel: "Pm", qLabel: "Qm", tooltip: "Free market: too little consumed" },
      { id: "Esocial", label: "Social opt.", curve1: "S", curve2: "MSB", color: C.shifted, pLabel: "Ps", qLabel: "Qs", tooltip: "Social optimum: more output" },
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
    notes: "Social benefit > Private benefit due to external benefits (e.g. education, healthcare). The free market underconsumes. Subsidy can correct this.",
    examTips: [
      "Social benefit is ABOVE private benefit · the gap is the external benefit",
      "Free market produces too little (Qm < Qs)",
      "Government can use a subsidy to increase output towards the social optimum",
    ],
    sanityChecks: [
      { description: "Qm < Qs (underconsumption)", check: { eq1: "Emarket", eq2: "Esocial", axis: "x", relation: "<" } },
    ],
  },

  gcse_merit_good: {
    title: "Merit Good · Information Failure (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D1", label: "D₁ (perceived)", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.demand },
      { id: "D2", label: "D₂ (actual)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.msb, dash: true },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "S", curve2: "D1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "Underconsumption due to information failure" },
      { id: "Eopt", label: "Optimal", curve1: "S", curve2: "D2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "Socially desirable level" },
    ],
    notes: "Consumers undervalue merit goods (e.g. education, vaccinations) due to imperfect information. Actual benefit (D₂) exceeds perceived benefit (D₁).",
    examTips: [
      "D₁ (perceived/actual demand) is below D₂ (true benefit)",
      "Underconsumption: Q₁ < Q₂",
      "Government can subsidise, provide free, or make it compulsory",
    ],
  },

  gcse_demerit_good: {
    title: "Demerit Good · Information Failure (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D1", label: "D₁ (perceived)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "D2", label: "D₂ (actual)", params: { type: "linear", slope: -0.7, intercept: 7 }, color: C.msb, dash: true },
    ],
    equilibria: [
      { id: "Emarket", label: "Market", curve1: "S", curve2: "D1", color: C.eq, pLabel: "P₁", qLabel: "Q₁", tooltip: "Overconsumption due to information failure" },
      { id: "Eopt", label: "Optimal", curve1: "S", curve2: "D2", color: C.shifted, pLabel: "P₂", qLabel: "Q₂", tooltip: "Socially desirable level" },
    ],
    notes: "Consumers overvalue demerit goods (e.g. cigarettes, alcohol) · perceived benefit (D₁) exceeds actual benefit (D₂). Overconsumption results.",
    examTips: [
      "D₁ (perceived) is above D₂ (actual benefit)",
      "Overconsumption: Q₁ > Q₂",
      "Government can tax, ban advertising, or regulate",
    ],
  },

  gcse_consumer_producer_surplus: {
    title: "Consumer & Producer Surplus (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { x: 0, y: 9 },
          { eq: "E1" },
          { curve: "D1", atX: 0 },
        ],
        color: C.supply,
        opacity: 0.15,
        label: "Consumer Surplus",
      },
      {
        type: "triangle",
        vertices: [
          { x: 0, y: 1 },
          { eq: "E1" },
          { curve: "S1", atX: 0 },
        ],
        color: C.demand,
        opacity: 0.15,
        label: "Producer Surplus",
      },
    ],
    notes: "Consumer surplus is the difference between what consumers are willing to pay and what they actually pay. Producer surplus is the difference between what producers receive and their minimum acceptable price.",
    examTips: [
      "CS = triangle above P* and below D",
      "PS = triangle below P* and above S",
      "Total welfare = CS + PS",
    ],
  },

  gcse_ped_elastic: {
    title: "Price Elastic Demand (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D (elastic)", params: { type: "linear", slope: -0.3, intercept: 7 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "PED > 1 (elastic)", position: { x: 5, y: 3 }, color: C.demand, size: 12 },
      { text: "Small ΔP → Large ΔQ", position: { x: 5, y: 2 }, color: C.lras, size: 10 },
    ],
    notes: "Elastic demand: a small change in price leads to a proportionally larger change in quantity demanded. PED > 1. Examples: luxury goods, goods with many substitutes.",
  },

  gcse_ped_inelastic: {
    title: "Price Inelastic Demand (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D (inelastic)", params: { type: "linear", slope: -2.5, intercept: 14 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "PED < 1 (inelastic)", position: { x: 4, y: 5 }, color: C.demand, size: 12 },
      { text: "Large ΔP → Small ΔQ", position: { x: 4, y: 4 }, color: C.lras, size: 10 },
    ],
    notes: "Inelastic demand: a change in price leads to a proportionally smaller change in quantity demanded. PED < 1. Examples: necessities, addictive goods, goods with few substitutes.",
  },

  /* ══════════════════════════════════════════════
     C. LABOUR / MACRO / TRADE DIAGRAMS
     ══════════════════════════════════════════════ */

  gcse_labour_market: {
    title: "Labour Market (GCSE/IGCSE)",
    axisLabels: { x: "Quantity of Labour (L)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D (labour)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "SL", label: "S (labour)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "W*", qLabel: "L*", tooltip: "Equilibrium wage and employment" },
    ],
    notes: "Wage is determined by the demand for and supply of labour. Demand for labour is derived demand · it depends on the demand for the product the labour makes.",
    examTips: [
      "X-axis: Quantity of Labour, Y-axis: Wage Rate",
      "Demand for labour slopes down · firms hire less at higher wages",
      "Supply of labour slopes up · more workers willing to work at higher wages",
    ],
  },

  gcse_minimum_wage: {
    title: "Minimum Wage (GCSE/IGCSE)",
    axisLabels: { x: "Quantity of Labour (L)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D (labour)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "SL", label: "S (labour)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "NMW", label: "NMW", params: { type: "horizontal", y: 6.5 }, color: C.orange, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "W*", qLabel: "L*", tooltip: "Free market equilibrium" },
    ],
    annotations: [
      { text: "Unemployment", position: { x: 5, y: 7 }, color: C.demand, size: 12 },
      { text: "NMW above W*", position: { x: 8, y: 6.8 }, color: C.orange, size: 10 },
    ],
    notes: "A minimum wage set above the equilibrium wage creates unemployment · the quantity of labour supplied exceeds the quantity demanded.",
    examTips: [
      "NMW must be ABOVE W* to have an effect",
      "Creates surplus of labour = unemployment",
      "Ld < Ls at the NMW level",
    ],
  },

  gcse_ad_as: {
    title: "AD/AS Diagram (GCSE/IGCSE)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AS", label: "AS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "AD", curve2: "AS", color: C.eq, pLabel: "PL*", qLabel: "Y*", tooltip: "Macroeconomic equilibrium" },
    ],
    notes: "AD/AS shows the overall price level and real GDP. AD slopes down (higher PL → lower spending). AS slopes up (higher PL → firms produce more).",
    examTips: [
      "X-axis: Real GDP (Y), Y-axis: Price Level (PL)",
      "AD shifts right → growth + inflation",
      "AS shifts left → cost-push inflation + lower output",
    ],
  },

  gcse_ad_increase: {
    title: "Increase in Aggregate Demand (GCSE/IGCSE)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.7, intercept: 10.5 }, color: C.demand, dash: true, shiftedFrom: "AD1" },
      { id: "AS", label: "AS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "AD1", curve2: "AS", color: C.eq, pLabel: "PL₁", qLabel: "Y₁", tooltip: "Initial equilibrium" },
      { id: "E2", label: "E₂", curve1: "AD2", curve2: "AS", color: C.shifted, pLabel: "PL₂", qLabel: "Y₂", tooltip: "AD increase → higher PL and Y" },
    ],
    notes: "An increase in AD (C, I, G, or X−M rises) shifts AD right. Real GDP increases (economic growth) but price level also rises (inflation).",
    examTips: [
      "AD₂ shifts right from AD₁",
      "Real GDP rises (Y₁ to Y₂) → economic growth",
      "Price level rises (PL₁ to PL₂) → demand-pull inflation",
    ],
  },

  gcse_exchange_rate: {
    title: "Exchange Rate (GCSE/IGCSE)",
    axisLabels: { x: "Quantity of Currency", y: "Exchange Rate" },
    curves: [
      { id: "D", label: "D (currency)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S (currency)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "ER*", qLabel: "Q*", tooltip: "Equilibrium exchange rate" },
    ],
    notes: "The exchange rate is determined by demand for and supply of a currency. Demand comes from foreigners buying exports or investing. Supply comes from importing or investing abroad.",
    examTips: [
      "Increased demand for exports → D shifts right → appreciation",
      "Increased imports → S shifts right → depreciation",
    ],
  },

  gcse_exchange_rate_appreciation: {
    title: "Exchange Rate Appreciation (GCSE/IGCSE)",
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
    notes: "Appreciation: the exchange rate rises (£ buys more $). Caused by increased demand for the currency · e.g. higher interest rates attracting hot money, or strong exports.",
    examTips: [
      "Demand for £ shifts right → exchange rate rises (appreciation)",
      "Makes exports more expensive, imports cheaper",
    ],
  },

  gcse_tariff: {
    title: "Tariff Diagram (GCSE/IGCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D (domestic)", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "S (domestic)", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw (world)", params: { type: "horizontal", y: 3 }, color: C.eq, dash: true },
      { id: "Pw_t", label: "Pw + tariff", params: { type: "horizontal", y: 4.5 }, color: C.orange, dash: true },
    ],
    equilibria: [],
    annotations: [
      { text: "World price", position: { x: 8.5, y: 3.3 }, color: C.eq, size: 10 },
      { text: "Pw + tariff", position: { x: 8.5, y: 4.8 }, color: C.orange, size: 10 },
      { text: "Tariff revenue", position: { x: 5, y: 3.8 }, color: C.orange, size: 11 },
      { text: "Imports shrink", position: { x: 5, y: 2.2 }, color: C.lras, size: 10 },
    ],
    notes: "A tariff raises the price of imports from Pw to Pw + tariff. Domestic production increases, imports decrease, consumers pay more, and the government earns tariff revenue.",
    examTips: [
      "Tariff raises the price of imports",
      "Domestic producers gain (produce more at higher price)",
      "Consumers lose (pay higher prices, buy less)",
      "Government gains tariff revenue",
    ],
  },

  gcse_lorenz_curve: {
    title: "Lorenz Curve (GCSE/IGCSE)",
    axisLabels: { x: "Cumulative % of Population", y: "Cumulative % of Income" },
    curves: [
      { id: "equality", label: "Line of Equality", params: { type: "linear", slope: 1, intercept: 0 }, color: C.lras, dash: true },
      { id: "lorenz", label: "Lorenz Curve", params: { type: "quadratic", a: 0.1, b: 0, c: 0 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "Gini = A / (A+B)", position: { x: 3, y: 6 }, color: C.lras, size: 11 },
      { text: "Area A", position: { x: 5, y: 4 }, color: C.orange, size: 11 },
    ],
    notes: "The Lorenz curve shows income distribution. The further it bows from the line of equality, the greater the inequality. The Gini coefficient measures this gap.",
    examTips: [
      "Line of equality = perfect equality",
      "The further the Lorenz curve bows away, the more unequal",
      "Gini coefficient: 0 = perfect equality, 1 = perfect inequality",
    ],
  },

  gcse_economies_of_scale: {
    title: "Economies of Scale / LRAC (GCSE/IGCSE)",
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
    notes: "As a firm grows, average costs fall (economies of scale) until the minimum efficient scale (MES). Beyond MES, costs may rise (diseconomies of scale).",
    examTips: [
      "Falling LRAC = economies of scale",
      "Lowest point = MES (minimum efficient scale)",
      "Rising LRAC = diseconomies of scale",
      "Types: technical, managerial, purchasing, financial economies",
    ],
  },

  gcse_comparative_advantage: {
    title: "Comparative Advantage (GCSE/IGCSE)",
    axisLabels: { x: "Good X", y: "Good Y" },
    curves: [
      { id: "PPF_A", label: "Country A", params: { type: "linear", slope: -1.5, intercept: 9 }, color: C.demand },
      { id: "PPF_B", label: "Country B", params: { type: "linear", slope: -0.6, intercept: 6 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "Country A: lower opp. cost of Y", position: { x: 2, y: 8 }, color: C.demand, size: 10 },
      { text: "Country B: lower opp. cost of X", position: { x: 6, y: 2 }, color: C.supply, size: 10 },
    ],
    notes: "Each country specialises in producing the good where it has the lowest opportunity cost. Both countries can gain from trade even if one is absolutely better at producing both goods.",
    examTips: [
      "Compare opportunity costs, not absolute output",
      "Specialise in the good with the LOWER opportunity cost",
      "Both countries can benefit from trade after specialisation",
    ],
  },
};
