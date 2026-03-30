/**
 * WJEC WALES & EDUQAS A-LEVEL BOARD PROFILES
 *
 * Board-specific diagram taxonomy, vocabulary, rubrics, and expectations
 * for WJEC Wales A-Level Economics (Units 1–4) and Eduqas A-Level Economics
 * (Components 1–3).
 */

import type { DiagramFamilyProfile, BoardProfile } from "@/data/edexcelBoardProfiles";

/* ══════════════════════════════════════════════
   SHARED MICRO DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const WJEC_MICRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ppf",
    name: "Production Possibility Frontier",
    theme: "Unit 1 / Component 1",
    axes: { x: "Consumer Goods", y: "Capital Goods" },
    curveNames: ["PPF", "PPF₁", "PPF₂"],
    requiredLabels: ["Axes in context", "Efficient/inefficient/unattainable points", "Shift arrows"],
    commandWords: ["explain", "draw", "show", "illustrate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["wjec_ppf_basic", "wjec_ppf_growth", "wjec_ppf_biased"],
    identificationKeywords: [
      "ppf", "production possibility", "opportunity cost", "trade-off",
      "economic growth", "productive capacity", "scarcity", "capital goods",
      "consumer goods", "productive inefficiency",
    ],
  },
  {
    id: "supply_demand",
    name: "Supply & Demand / Market Equilibrium",
    theme: "Unit 1 / Component 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "D₁", "S₁"],
    requiredLabels: ["P₁", "Q₁", "E", "Axes"],
    commandWords: ["explain", "show", "illustrate", "draw", "analyse"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["wjec_market_equilibrium"],
    identificationKeywords: [
      "demand", "supply", "equilibrium", "price determination",
      "excess demand", "excess supply", "shortage", "surplus",
      "price mechanism", "market clearing",
    ],
  },
  {
    id: "elasticity",
    name: "Elasticity Diagrams",
    theme: "Unit 1 / Component 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (elastic)", "D (inelastic)", "S (elastic)", "S (inelastic)"],
    requiredLabels: ["Steep vs flat curves", "Revenue rectangles"],
    commandWords: ["explain", "show", "compare", "illustrate"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: [],
    identificationKeywords: [
      "elasticity", "ped", "pes", "elastic", "inelastic",
      "unit elastic", "price elasticity", "income elasticity",
      "cross elasticity", "revenue",
    ],
  },
  {
    id: "cs_ps",
    name: "Consumer & Producer Surplus",
    theme: "Unit 1 / Component 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S"],
    requiredLabels: ["CS area", "PS area", "Equilibrium"],
    commandWords: ["show", "identify", "explain", "evaluate"],
    expectedActions: ["shade", "label", "explain"],
    specKeys: ["wjec_cs_ps"],
    identificationKeywords: [
      "consumer surplus", "producer surplus", "welfare",
      "total welfare", "economic welfare",
    ],
  },
  {
    id: "indirect_tax",
    name: "Indirect Tax",
    theme: "Unit 1 / Component 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S₁", "S₁ + tax"],
    requiredLabels: ["Tax wedge", "Tax revenue", "Incidence", "DWL"],
    commandWords: ["explain", "show", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "shift", "shade", "explain"],
    specKeys: ["wjec_indirect_tax"],
    identificationKeywords: [
      "indirect tax", "specific tax", "ad valorem", "tax revenue",
      "tax incidence", "excise duty", "vat",
    ],
  },
  {
    id: "subsidy",
    name: "Subsidy",
    theme: "Unit 1 / Component 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S₁", "S₁ + subsidy"],
    requiredLabels: ["Subsidy wedge", "Govt cost", "Consumer/producer benefit"],
    commandWords: ["explain", "show", "evaluate"],
    expectedActions: ["draw", "label", "shift", "shade", "explain"],
    specKeys: ["wjec_subsidy"],
    identificationKeywords: [
      "subsidy", "government subsidy", "production subsidy",
    ],
  },
  {
    id: "price_controls",
    name: "Price Controls",
    theme: "Unit 1 / Component 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "Pmax", "Pmin"],
    requiredLabels: ["Shortage/surplus", "Effective price", "Equilibrium"],
    commandWords: ["explain", "show", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["wjec_max_price", "wjec_min_price"],
    identificationKeywords: [
      "maximum price", "minimum price", "price ceiling", "price floor",
      "rent control", "minimum wage",
    ],
  },
  {
    id: "externalities",
    name: "Externalities",
    theme: "Unit 1 / Component 1",
    axes: { x: "Quantity (Q)", y: "Cost / Benefit / Price" },
    curveNames: ["MPC", "MSC", "MPB", "MSB"],
    requiredLabels: ["Welfare loss triangle", "Socially optimum output", "Market output"],
    commandWords: ["explain", "show", "analyse", "evaluate", "discuss"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: ["wjec_neg_prod_ext", "wjec_pos_cons_ext", "wjec_neg_cons_ext", "wjec_pos_prod_ext"],
    identificationKeywords: [
      "externality", "external cost", "external benefit", "market failure",
      "mpc", "msc", "mpb", "msb", "welfare loss", "social cost",
      "social benefit", "negative externality", "positive externality",
      "pollution", "merit good", "demerit good", "overproduction",
      "underconsumption", "overconsumption",
    ],
  },
  {
    id: "labour_market",
    name: "Labour Market",
    theme: "Unit 2 / Component 1",
    axes: { x: "Quantity of Labour", y: "Wage Rate" },
    curveNames: ["D_L (MRP)", "S_L", "NMW"],
    requiredLabels: ["Equilibrium wage", "Labour quantity", "Unemployment"],
    commandWords: ["explain", "show", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain", "evaluate"],
    specKeys: ["wjec_labour_market", "wjec_minimum_wage"],
    identificationKeywords: [
      "labour market", "wage", "minimum wage", "nmw", "nlw",
      "mrp", "marginal revenue product", "trade union",
      "migration", "labour demand", "labour supply",
    ],
  },
  {
    id: "costs_revenues",
    name: "Costs, Revenues & Profit",
    theme: "Unit 3 / Component 1",
    axes: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curveNames: ["MC", "ATC", "AVC", "AR", "MR"],
    requiredLabels: ["Min ATC", "Min AVC", "Profit/loss shading"],
    commandWords: ["explain", "show", "draw", "analyse"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["wjec_sr_costs"],
    identificationKeywords: [
      "marginal cost", "average cost", "average total cost", "average variable cost",
      "economies of scale", "diseconomies", "lrac", "cost curves",
      "productive efficiency", "shutdown",
    ],
  },
  {
    id: "market_structures",
    name: "Market Structures",
    theme: "Unit 3 / Component 1",
    axes: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curveNames: ["MC", "ATC", "AR (D)", "MR"],
    requiredLabels: ["Profit-max output", "Supernormal profit", "DWL"],
    commandWords: ["explain", "draw", "show", "analyse", "evaluate", "compare"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: ["wjec_monopoly", "wjec_mon_comp"],
    identificationKeywords: [
      "monopoly", "monopolistic competition", "perfect competition",
      "oligopoly", "market structure", "supernormal profit",
      "normal profit", "price maker", "barriers to entry",
      "ar", "mr", "mc = mr", "profit maximisation",
      "allocative efficiency", "productive efficiency",
    ],
  },
];

/* ══════════════════════════════════════════════
   SHARED MACRO DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const WJEC_MACRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ad_as",
    name: "AD/AS Macroeconomic Equilibrium",
    theme: "Unit 2 / Component 2",
    axes: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curveNames: ["AD", "SRAS", "LRAS", "Keynesian AS"],
    requiredLabels: ["Equilibrium", "PL", "Y", "Yn"],
    commandWords: ["explain", "show", "analyse", "evaluate", "discuss"],
    expectedActions: ["draw", "label", "shift", "explain", "evaluate"],
    specKeys: ["wjec_ad_as", "wjec_ad_increase", "wjec_cost_push", "wjec_lras_shift", "wjec_keynesian_as"],
    identificationKeywords: [
      "aggregate demand", "aggregate supply", "ad", "as", "sras", "lras",
      "price level", "real gdp", "demand-pull", "cost-push",
      "macroeconomic equilibrium", "output gap", "keynesian",
      "classical", "supply-side", "fiscal policy", "monetary policy",
      "multiplier", "inflation", "deflation", "recession",
      "economic growth", "national income",
    ],
  },
  {
    id: "phillips_curve",
    name: "Phillips Curve",
    theme: "Unit 2 / Component 2",
    axes: { x: "Unemployment Rate (%)", y: "Inflation Rate (%)" },
    curveNames: ["SRPC", "LRPC"],
    requiredLabels: ["NRU", "Trade-off zone"],
    commandWords: ["explain", "show", "evaluate", "discuss"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["wjec_phillips_curve"],
    identificationKeywords: [
      "phillips curve", "inflation", "unemployment", "trade-off",
      "natural rate", "nru", "nairu", "expectations",
    ],
  },
  {
    id: "lorenz_gini",
    name: "Lorenz Curve & Gini Coefficient",
    theme: "Unit 4 / Component 2",
    axes: { x: "Cumulative % of Population", y: "Cumulative % of Income" },
    curveNames: ["Line of equality", "Lorenz curve"],
    requiredLabels: ["Gini formula", "Area A", "Area B"],
    commandWords: ["explain", "show", "compare", "analyse"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["wjec_lorenz"],
    identificationKeywords: [
      "lorenz", "gini", "inequality", "income distribution",
      "wealth distribution", "line of equality",
    ],
  },
];

/* ══════════════════════════════════════════════
   TRADE / INTERNATIONAL DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const WJEC_TRADE_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "tariff",
    name: "Tariff on Imports",
    theme: "Unit 4 / Component 2",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S_dom", "Pw", "Pw + tariff"],
    requiredLabels: ["Tariff revenue", "Imports before/after", "DWL"],
    commandWords: ["explain", "show", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: ["wjec_tariff"],
    identificationKeywords: [
      "tariff", "import duty", "trade protection", "protectionism",
      "world price", "domestic production",
    ],
  },
  {
    id: "quota",
    name: "Import Quota",
    theme: "Unit 4 / Component 2",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S_dom", "Pw"],
    requiredLabels: ["Quota limit", "Price rise", "Reduced imports"],
    commandWords: ["explain", "show", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["wjec_quota"],
    identificationKeywords: [
      "quota", "import quota", "quantitative restriction",
      "quota rent",
    ],
  },
  {
    id: "exchange_rate",
    name: "Exchange Rate Determination",
    theme: "Unit 4 / Component 2",
    axes: { x: "Quantity of Currency", y: "Exchange Rate" },
    curveNames: ["D£", "S£"],
    requiredLabels: ["ER₁", "Appreciation/depreciation arrows"],
    commandWords: ["explain", "show", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain", "evaluate"],
    specKeys: ["wjec_exchange_rate"],
    identificationKeywords: [
      "exchange rate", "appreciation", "depreciation",
      "floating", "fixed", "currency", "forex",
      "hot money", "capital flows", "marshall-lerner",
      "j-curve", "competitiveness",
    ],
  },
];

/* ══════════════════════════════════════════════
   WJEC WALES BOARD PROFILE (Units 1–4)
   ══════════════════════════════════════════════ */

export const WJEC_PROFILE: BoardProfile = {
  boardId: "wjec",
  boardName: "WJEC Economics (Wales)",
  papers: [
    {
      paper: "Unit 1: Introduction to Economics",
      themes: ["Basic economic ideas", "Price mechanism", "Market failure"],
      marks: 60,
      duration: "1 hour 30 minutes",
      sections: ["Section A: Multiple choice", "Section B: Data response", "Section C: Structured questions"],
    },
    {
      paper: "Unit 2: Economics in Action",
      themes: ["Macroeconomic measures", "Macroeconomic policy", "Labour market"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Data response", "Section B: Essay"],
    },
    {
      paper: "Unit 3: Exploring Economic Behaviour",
      themes: ["Market structures", "Business behaviour", "Labour market"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Data response", "Section B: Essay"],
    },
    {
      paper: "Unit 4: Evaluating Economic Models & Policies",
      themes: ["International trade", "Development", "Policy evaluation"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Data response", "Section B: Essay"],
    },
  ],
  diagramFamilies: [...WJEC_MICRO_FAMILIES, ...WJEC_MACRO_FAMILIES, ...WJEC_TRADE_FAMILIES],
  terminology: {
    "aggregate supply": "SRAS / LRAS / Keynesian AS",
    "equilibrium": "E, E₁, E₂",
    "welfare loss": "Welfare loss / DWL",
    "profit": "Supernormal profit / Normal profit",
    "efficiency": "Allocative, Productive, Dynamic",
    "externality labels": "MPC, MSC, MPB, MSB",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B", "Section C"],
  },
};

/* ══════════════════════════════════════════════
   EDUQAS BOARD PROFILE (Components 1–3)
   ══════════════════════════════════════════════ */

export const EDUQAS_PROFILE: BoardProfile = {
  boardId: "eduqas",
  boardName: "Eduqas Economics (England, A-Level)",
  papers: [
    {
      paper: "Component 1: Markets & Market Failure",
      themes: ["Economic problem", "Price mechanism", "Market failure", "Market structures"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Data response", "Section B: Essay"],
    },
    {
      paper: "Component 2: National & International Economy",
      themes: ["Macroeconomic performance", "AD/AS", "Policy", "International trade"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Data response", "Section B: Essay"],
    },
    {
      paper: "Component 3: Synoptic Assessment",
      themes: ["All topics — micro, macro, international"],
      marks: 80,
      duration: "2 hours 15 minutes",
      sections: ["Section A: Data response", "Section B: Extended essay"],
    },
  ],
  diagramFamilies: [...WJEC_MICRO_FAMILIES, ...WJEC_MACRO_FAMILIES, ...WJEC_TRADE_FAMILIES],
  terminology: {
    "aggregate supply": "SRAS / LRAS / Keynesian AS",
    "equilibrium": "E, E₁, E₂",
    "welfare loss": "Welfare loss / DWL",
    "profit": "Supernormal profit / Normal profit",
    "efficiency": "Allocative, Productive, Dynamic",
    "externality labels": "MPC, MSC, MPB, MSB",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B"],
  },
};
