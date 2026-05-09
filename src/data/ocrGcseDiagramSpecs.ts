/**
 * OCR GCSE ECONOMICS (J205)
 * Board-specific diagram specifications.
 * Component 1: Introduction to Economics
 * Component 2: National and International Economics
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

export const OCR_GCSE_DIAGRAM_SPECS: Record<string, DiagramSpec> = {
  /* ══════════════════════════════════════════════
     COMPONENT 1: INTRODUCTION TO ECONOMICS
     ══════════════════════════════════════════════ */

  ocr_gcse_demand: {
    title: "Demand Curve (OCR GCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "Price ↑ → Qd ↓", position: { x: 6, y: 3 }, color: C.demand, size: 11 },
      { text: "Movement along D", position: { x: 6, y: 2 }, color: C.lras, size: 10 },
    ],
    notes: "Demand shows the quantity consumers are willing and able to buy at each price. Downward sloping: higher price → lower Qd (law of demand).",
    examTips: [
      "OCR: draw using data provided in the question",
      "Movement ALONG = price change",
      "Shift = non-price factor (income, tastes, substitutes/complements)",
    ],
  },

  ocr_gcse_demand_shift: {
    title: "Shift in Demand (OCR GCSE)",
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
    notes: "Demand increases (shifts right): higher incomes, advertising, population growth, price of substitutes rises. Both price and quantity rise.",
    examTips: [
      "OCR expects clear chains of reasoning",
      "State cause → explain mechanism → show outcome on diagram",
      "Impact on both consumers and producers",
    ],
  },

  ocr_gcse_supply: {
    title: "Supply Curve (OCR GCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "Price ↑ → Qs ↑", position: { x: 6, y: 7 }, color: C.supply, size: 11 },
    ],
    notes: "Supply shows what producers are willing and able to sell at each price. Upward sloping: higher price → higher Qs.",
  },

  ocr_gcse_supply_shift: {
    title: "Shift in Supply (OCR GCSE)",
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
    notes: "Supply increases: lower costs, better technology, more firms, subsidies. Price falls, quantity rises.",
  },

  ocr_gcse_equilibrium: {
    title: "Market Equilibrium (OCR GCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*", tooltip: "Equilibrium: efficient allocation of resources" },
    ],
    notes: "At equilibrium, demand equals supply. The price mechanism allocates resources. Above P* → surplus → price falls. Below P* → shortage → price rises.",
    examTips: [
      "OCR: 'explain the role of markets in the determination of price'",
      "The price mechanism determines WHAT, HOW, and FOR WHOM to produce",
      "Competition drives prices toward equilibrium",
    ],
  },

  ocr_gcse_ped: {
    title: "Price Elasticity of Demand (OCR GCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D_elastic", label: "D (elastic)", params: { type: "linear", slope: -0.3, intercept: 7 }, color: C.demand },
      { id: "D_inelastic", label: "D (inelastic)", params: { type: "linear", slope: -2.5, intercept: 14 }, color: C.orange },
    ],
    equilibria: [],
    annotations: [
      { text: "Elastic (PED > 1)", position: { x: 7, y: 5.5 }, color: C.demand, size: 11 },
      { text: "Inelastic (PED < 1)", position: { x: 3, y: 3 }, color: C.orange, size: 11 },
    ],
    notes: "PED measures responsiveness of Qd to price change. Important for producers: elastic demand → price cuts boost revenue; inelastic demand → price rises boost revenue.",
    examTips: [
      "OCR: 'evaluate the importance of PED for consumers and producers'",
      "Factors: number of substitutes, necessity/luxury, time period, proportion of income",
    ],
  },

  ocr_gcse_pes: {
    title: "Price Elasticity of Supply (OCR GCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "S_elastic", label: "S (elastic)", params: { type: "linear", slope: 0.3, intercept: 1 }, color: C.supply },
      { id: "S_inelastic", label: "S (inelastic)", params: { type: "linear", slope: 2.5, intercept: 1 }, color: C.orange },
    ],
    equilibria: [],
    annotations: [
      { text: "Elastic (PES > 1)", position: { x: 7, y: 3.5 }, color: C.supply, size: 11 },
      { text: "Inelastic (PES < 1)", position: { x: 2, y: 6 }, color: C.orange, size: 11 },
    ],
    notes: "PES depends on: spare capacity, stock levels, ease of switching production, time period.",
  },

  ocr_gcse_competition: {
    title: "Competition & Market Power (OCR GCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S_comp", label: "S (competitive)", params: { type: "linear", slope: 0.6, intercept: 0.5 }, color: C.supply },
      { id: "S_mono", label: "S (monopoly)", params: { type: "linear", slope: 0.6, intercept: 2.5 }, color: C.orange, dash: true },
    ],
    equilibria: [
      { id: "E_comp", label: "Competitive", curve1: "D1", curve2: "S_comp", color: C.eq, pLabel: "Pc", qLabel: "Qc" },
      { id: "E_mono", label: "Monopoly", curve1: "D1", curve2: "S_mono", color: C.demand, pLabel: "Pm", qLabel: "Qm" },
    ],
    annotations: [
      { text: "Higher price, lower output", position: { x: 7, y: 7 }, color: C.demand, size: 10 },
    ],
    notes: "In competitive markets: lower prices, more output, more choice. With monopoly/oligopoly: higher prices, restricted output, less consumer choice. But may have economies of scale.",
    examTips: [
      "OCR: compare impact on producers AND consumers",
      "Monopoly: higher price (Pm > Pc), lower output (Qm < Qc)",
      "But monopoly may invest in R&D and achieve economies of scale",
    ],
  },

  ocr_gcse_costs_revenue: {
    title: "Total Cost, Revenue & Profit (OCR GCSE)",
    axisLabels: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curves: [
      { id: "TC", label: "Total Cost", params: { type: "linear", slope: 0.8, intercept: 2 }, color: C.demand },
      { id: "TR", label: "Total Revenue", params: { type: "linear", slope: 1.2, intercept: 0 }, color: C.supply },
    ],
    equilibria: [
      { id: "BEP", label: "Break-even", curve1: "TC", curve2: "TR", color: C.eq, pLabel: "", qLabel: "Q(BE)" },
    ],
    annotations: [
      { text: "Loss region", position: { x: 2, y: 4 }, color: C.demand, size: 11 },
      { text: "Profit region", position: { x: 7, y: 5 }, color: C.eq, size: 11 },
    ],
    notes: "OCR requires calculating TC, AC, TR, AR, profit and loss. Profit = TR − TC. Break-even where TR = TC.",
    examTips: [
      "OCR: 'calculate and explain total cost, average cost, total revenue, average revenue, profit and loss'",
      "TC = FC + VC",
      "AC = TC / Q",
      "Profit = TR − TC",
    ],
  },

  ocr_gcse_economies_of_scale: {
    title: "Economies of Scale (OCR GCSE)",
    axisLabels: { x: "Output (Q)", y: "Average Cost (£)" },
    curves: [
      { id: "LRAC", label: "LRAC", params: { type: "quadratic", a: 0.15, b: -1.5, c: 7.5 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "Economies of scale", position: { x: 2.5, y: 6 }, color: C.eq, size: 10 },
      { text: "Diseconomies", position: { x: 7.5, y: 6 }, color: C.demand, size: 10 },
      { text: "MES", position: { x: 5, y: 3.5 }, color: C.shifted, size: 11 },
    ],
    notes: "As firms grow, average costs fall (economies of scale). Beyond MES, average costs may rise (diseconomies). OCR focuses on explaining economies of scale conceptually.",
  },

  ocr_gcse_labour_market: {
    title: "Labour Market (OCR GCSE)",
    axisLabels: { x: "Quantity of Labour (L)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D (labour)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "SL", label: "S (labour)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "W*", qLabel: "L*" },
    ],
    notes: "Wages determined by supply and demand for labour. Demand is derived demand. Factors: skills, productivity, migration, union power, danger of job.",
    examTips: [
      "OCR: 'analyse the determination of wages through supply and demand'",
      "Include factors affecting supply AND demand for labour",
    ],
  },

  ocr_gcse_externality_negative: {
    title: "Negative Externality (OCR GCSE)",
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
    notes: "External costs imposed on third parties. Social cost > private cost. Free market overproduces. Government corrects with taxation, legislation, regulation.",
    examTips: [
      "OCR: 'explain government policies to correct negative externalities'",
      "Include: taxation, subsidies, state provision, legislation/regulation, information provision",
    ],
    sanityChecks: [
      { description: "Qm > Qs (overproduction)", check: { eq1: "Emarket", eq2: "Esocial", axis: "x", relation: ">" } },
    ],
  },

  ocr_gcse_externality_positive: {
    title: "Positive Externality (OCR GCSE)",
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
    notes: "External benefits to third parties. Social benefit > private benefit. Free market underconsumes. Government uses subsidies, free provision, information.",
    sanityChecks: [
      { description: "Qm < Qs (underconsumption)", check: { eq1: "Emarket", eq2: "Esocial", axis: "x", relation: "<" } },
    ],
  },

  /* ══════════════════════════════════════════════
     COMPONENT 2: NATIONAL & INTERNATIONAL ECONOMICS
     ══════════════════════════════════════════════ */

  ocr_gcse_ad_as: {
    title: "AD/AS Diagram (OCR GCSE)",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      { id: "AD", label: "AD", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "AS", label: "AS", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "AD", curve2: "AS", color: C.eq, pLabel: "PL*", qLabel: "Y*" },
    ],
    notes: "Macro equilibrium where AD meets AS. AD = total spending. AS = total output firms willing to produce.",
  },

  ocr_gcse_fiscal_expansion: {
    title: "Fiscal Policy · Increase in AD (OCR GCSE)",
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
    notes: "Expansionary fiscal policy: ↑G or ↓T → AD shifts right → growth + employment. But risks demand-pull inflation and budget deficit.",
    examTips: [
      "OCR: 'explain fiscal policy and how it can achieve economic objectives'",
      "Chain: ↑G → ↑AD → ↑real GDP → ↓unemployment, but ↑PL",
      "Evaluate: opportunity cost, time lags, budget deficit",
    ],
  },

  ocr_gcse_monetary_policy: {
    title: "Monetary Policy Effect (OCR GCSE)",
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
    notes: "Lower interest rates → cheaper borrowing → ↑consumer spending → ↑investment → AD shifts right. Higher rates → opposite.",
    examTips: [
      "OCR: 'analyse how monetary policy can affect growth, employment and price stability'",
      "Transmission: interest rate → spending/saving → AD → output/prices",
    ],
  },

  ocr_gcse_supply_side: {
    title: "Supply-Side Policy (OCR GCSE)",
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
    notes: "Supply-side policies increase productive potential: education, infrastructure, deregulation, tax incentives. AS shifts right → non-inflationary growth.",
    examTips: [
      "OCR: 'evaluate the costs and benefits of supply side policies'",
      "Benefits: long-term growth without inflation",
      "Costs: slow to take effect, expensive, may increase inequality",
    ],
  },

  ocr_gcse_indirect_tax: {
    title: "Indirect Tax · Correcting Externalities (OCR GCSE)",
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
    notes: "OCR spec: government uses taxation to correct negative externalities. Tax shifts supply left, raising price and reducing output of the harmful good.",
    examTips: [
      "OCR: 'explain government policies to correct positive and negative externalities'",
      "Taxation reduces consumption of demerit goods / goods with negative externalities",
      "Evaluate: may be regressive, difficult to set correct tax level",
    ],
  },

  ocr_gcse_exchange_rate: {
    title: "Exchange Rate Determination (OCR GCSE)",
    axisLabels: { x: "Quantity of Currency", y: "Exchange Rate" },
    curves: [
      { id: "D", label: "D (£)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S (£)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D", curve2: "S", color: C.eq, pLabel: "ER*", qLabel: "Q*" },
    ],
    notes: "OCR: 'draw and analyse how exchange rates are determined through the interaction of supply and demand'. Appreciation → imports cheaper, exports dearer.",
    examTips: [
      "OCR requires students to DRAW exchange rate diagrams",
      "Calculate currency conversions using the rate",
      "Evaluate effects on consumers and producers",
    ],
  },

  ocr_gcse_exchange_rate_change: {
    title: "Exchange Rate Change (OCR GCSE)",
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
    notes: "Increased demand for £ (e.g. higher interest rates, strong exports) → appreciation (ER₂ > ER₁). SPICED: Strong Pound, Imports Cheap, Exports Dear.",
  },

  ocr_gcse_tariff: {
    title: "Tariff Diagram (OCR GCSE)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.7, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "S (domestic)", params: { type: "linear", slope: 0.9, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "Pw", params: { type: "horizontal", y: 3 }, color: C.eq, dash: true },
      { id: "Pw_t", label: "Pw + tariff", params: { type: "horizontal", y: 4.5 }, color: C.orange, dash: true },
    ],
    equilibria: [],
    annotations: [
      { text: "World price", position: { x: 8.5, y: 3.3 }, color: C.eq, size: 10 },
      { text: "Price with tariff", position: { x: 8.5, y: 4.8 }, color: C.orange, size: 10 },
    ],
    notes: "OCR Component 2 covers importance of international trade. Tariffs raise price above world price, reduce imports, protect domestic industry.",
  },

  ocr_gcse_lorenz: {
    title: "Income Distribution · Lorenz Curve (OCR GCSE)",
    axisLabels: { x: "Cumulative % of Population", y: "Cumulative % of Income" },
    curves: [
      { id: "equality", label: "Line of Equality", params: { type: "linear", slope: 1, intercept: 0 }, color: C.lras, dash: true },
      { id: "lorenz", label: "Lorenz Curve", params: { type: "quadratic", a: 0.1, b: 0, c: 0 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "Greater inequality →", position: { x: 4, y: 2 }, color: C.demand, size: 11 },
      { text: "Line of perfect equality", position: { x: 6, y: 7 }, color: C.lras, size: 10 },
    ],
    notes: "OCR: 'explain the distribution of income'. Lorenz curve shows inequality. Further from line of equality = more unequal. Government can redistribute via progressive taxes and benefits.",
  },

  ocr_gcse_comparative_advantage: {
    title: "Comparative Advantage (OCR GCSE)",
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
    notes: "OCR: 'evaluate the costs and benefits of specialisation and exchange'. Countries specialise in goods with lowest opportunity cost. Both gain from trade.",
    examTips: [
      "Compare opportunity costs, not absolute output",
      "Benefits: lower prices, more choice, efficiency",
      "Costs: over-dependence, structural unemployment",
    ],
  },
};
