/**
 * IB ECONOMICS BOARD PROFILE (HL & SL)
 *
 * Board-specific diagram taxonomy, vocabulary, rubrics, and expectations
 * for IB Economics Higher Level and Standard Level.
 *
 * Key IB principles:
 *   - Diagrams support explanation, analysis, and evaluation
 *   - Real-world application required in every answer
 *   - HL extends SL with market structures, calculations, J-curve, trade diversion
 *   - Command terms: explain, discuss, evaluate, examine, suggest, calculate, recommend
 *   - Paper 1 essays, Paper 2 data response, Paper 3 policy (HL)
 */

import type { DiagramFamilyProfile, BoardProfile } from "@/data/edexcelBoardProfiles";

/* ══════════════════════════════════════════════
   A. INTRODUCTORY
   ══════════════════════════════════════════════ */

const IB_INTRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ppc",
    name: "Production Possibility Curve / Frontier",
    theme: "Unit 1 — Introduction to Economics",
    axes: { x: "Good X / Consumer Goods", y: "Good Y / Capital Goods" },
    curveNames: ["PPC", "PPC₁", "PPC₂"],
    requiredLabels: ["Efficient point (on PPC)", "Inefficient (inside)", "Unattainable (outside)", "Shift arrows"],
    commandWords: ["explain", "draw", "show", "illustrate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ib_ppc_basic", "ib_ppc_growth", "ppf_balanced_growth", "ppf_biased_capital", "ppf_unemployment"],
    identificationKeywords: [
      "production possibility", "PPC", "ppf", "opportunity cost",
      "scarcity", "choice", "trade-off", "efficient", "inefficient",
      "unattainable", "economic growth", "factors of production",
    ],
  },
];

/* ══════════════════════════════════════════════
   B. MICROECONOMICS
   ══════════════════════════════════════════════ */

const IB_MICRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "demand",
    name: "Demand",
    theme: "Unit 2 — Microeconomics",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "D₁", "D₂"],
    requiredLabels: ["P", "Q", "D"],
    commandWords: ["explain", "show", "illustrate", "discuss"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ib_demand_shift", "demand_increase", "demand_decrease"],
    identificationKeywords: [
      "demand", "quantity demanded", "demand curve", "law of demand",
      "shift in demand", "movement along demand", "determinants of demand",
    ],
  },
  {
    id: "supply",
    name: "Supply",
    theme: "Unit 2 — Microeconomics",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["S", "S₁", "S₂"],
    requiredLabels: ["P", "Q", "S"],
    commandWords: ["explain", "show", "illustrate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ib_supply_shift", "supply_increase", "supply_decrease"],
    identificationKeywords: [
      "supply", "quantity supplied", "supply curve", "law of supply",
      "shift in supply", "movement along supply", "determinants of supply",
    ],
  },
  {
    id: "equilibrium",
    name: "Competitive Market Equilibrium",
    theme: "Unit 2 — Microeconomics",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "S"],
    requiredLabels: ["P*", "Q*", "E", "Excess demand", "Excess supply"],
    commandWords: ["explain", "show", "illustrate", "discuss"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["supply_demand", "ib_simultaneous_shift"],
    identificationKeywords: [
      "equilibrium", "market equilibrium", "price mechanism",
      "excess demand", "excess supply", "shortage", "surplus",
      "competitive market", "price adjustment",
    ],
  },
  {
    id: "consumer_producer_surplus",
    name: "Consumer & Producer Surplus",
    theme: "Unit 2 — Microeconomics",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "S"],
    requiredLabels: ["CS", "PS", "P*", "Q*"],
    commandWords: ["explain", "show", "shade", "discuss"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["ib_consumer_producer_surplus"],
    identificationKeywords: [
      "consumer surplus", "producer surplus", "welfare",
      "total surplus", "economic welfare", "deadweight loss",
    ],
  },
  {
    id: "elasticity",
    name: "Elasticity",
    theme: "Unit 2 — Microeconomics",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D (elastic)", "D (inelastic)", "S"],
    requiredLabels: ["P", "Q", "Revenue area"],
    commandWords: ["explain", "discuss", "calculate", "evaluate"],
    expectedActions: ["draw", "label", "explain", "calculate"],
    specKeys: [],
    identificationKeywords: [
      "elasticity", "PED", "PES", "YED", "XED",
      "price elasticity", "income elasticity", "cross elasticity",
      "elastic", "inelastic", "unit elastic", "revenue",
    ],
  },
  {
    id: "indirect_tax",
    name: "Indirect Tax",
    theme: "Unit 2 — Government Intervention",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "S", "S + tax"],
    requiredLabels: ["P₁", "P₂", "Q₁", "Q₂", "Tax per unit", "Tax incidence"],
    commandWords: ["explain", "show", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: ["ib_indirect_tax"],
    identificationKeywords: [
      "indirect tax", "specific tax", "ad valorem", "tax incidence",
      "tax burden", "Pigouvian tax", "sin tax",
    ],
  },
  {
    id: "subsidy",
    name: "Subsidy",
    theme: "Unit 2 — Government Intervention",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "S", "S + subsidy"],
    requiredLabels: ["P₁", "P₂", "Q₁", "Q₂", "Government expenditure"],
    commandWords: ["explain", "show", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["ib_subsidy"],
    identificationKeywords: [
      "subsidy", "government subsidy", "producer subsidy",
    ],
  },
  {
    id: "price_controls",
    name: "Price Controls (Ceiling & Floor)",
    theme: "Unit 2 — Government Intervention",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "S", "Pmax / Pmin"],
    requiredLabels: ["P*", "Pmax/Pmin", "Shortage/Surplus"],
    commandWords: ["explain", "show", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["ib_price_ceiling", "ib_price_floor"],
    identificationKeywords: [
      "price ceiling", "price floor", "maximum price", "minimum price",
      "price control", "rent control", "minimum wage",
    ],
  },
  {
    id: "externalities",
    name: "Externalities",
    theme: "Unit 2 — Market Failure",
    axes: { x: "Quantity", y: "Cost / Benefit" },
    curveNames: ["MPB", "MSB", "MPC", "MSC"],
    requiredLabels: ["Qm", "Qopt", "Welfare loss", "MSC/MPC/MSB/MPB"],
    commandWords: ["explain", "show", "draw", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: [
      "ib_negative_prod_ext", "ib_negative_cons_ext",
      "ib_positive_prod_ext", "ib_positive_cons_ext",
      "negative_production_externality", "positive_externality", "negative_externality",
    ],
    identificationKeywords: [
      "externality", "external cost", "external benefit",
      "negative externality", "positive externality",
      "MSC", "MSB", "MPC", "MPB", "marginal social",
      "marginal private", "welfare loss", "deadweight loss",
      "overproduction", "underconsumption", "underproduction",
      "overconsumption", "market failure", "third party",
      "pollution", "vaccination", "education", "demerit", "merit",
    ],
  },
  {
    id: "market_power",
    name: "Market Power / Structures (HL)",
    theme: "Unit 2 — HL Extension",
    axes: { x: "Quantity", y: "Cost / Revenue" },
    curveNames: ["AR", "MR", "MC", "ATC"],
    requiredLabels: ["Profit max (MC=MR)", "Supernormal profit", "DWL"],
    commandWords: ["explain", "draw", "discuss", "evaluate", "compare"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: ["ib_monopoly", "ib_perfect_comp", "ib_monopolistic_comp"],
    identificationKeywords: [
      "monopoly", "perfect competition", "monopolistic competition",
      "oligopoly", "market power", "market structure",
      "profit maximisation", "MC = MR", "supernormal profit",
      "normal profit", "barriers to entry", "price maker",
      "price taker", "allocative efficiency", "productive efficiency",
      "deadweight loss", "natural monopoly", "contestable",
    ],
  },
];

/* ══════════════════════════════════════════════
   C. MACROECONOMICS
   ══════════════════════════════════════════════ */

const IB_MACRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ad_as",
    name: "AD/AS Model",
    theme: "Unit 3 — Macroeconomics",
    axes: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curveNames: ["AD", "AD₁", "AD₂", "SRAS", "LRAS"],
    requiredLabels: ["PL", "Y", "Yf", "E"],
    commandWords: ["explain", "show", "discuss", "evaluate", "examine"],
    expectedActions: ["draw", "label", "shift", "explain", "evaluate"],
    specKeys: [
      "ib_ad_increase", "ib_sras_decrease", "ib_lras_increase",
      "ib_keynesian_as", "ib_monetary_expansion", "ib_supply_side_policy",
    ],
    identificationKeywords: [
      "aggregate demand", "aggregate supply", "AD", "AS", "SRAS", "LRAS",
      "macroeconomic equilibrium", "price level", "real GDP",
      "demand-pull", "cost-push", "inflationary gap", "deflationary gap",
      "recessionary gap", "full employment", "potential output",
      "Keynesian", "neoclassical", "fiscal policy", "monetary policy",
      "supply-side", "multiplier",
    ],
  },
  {
    id: "phillips_curve",
    name: "Phillips Curve",
    theme: "Unit 3 — Macroeconomics",
    axes: { x: "Unemployment Rate", y: "Inflation Rate" },
    curveNames: ["SRPC", "LRPC"],
    requiredLabels: ["NRU", "SRPC", "LRPC"],
    commandWords: ["explain", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ib_phillips_curve"],
    identificationKeywords: [
      "phillips curve", "inflation unemployment trade-off",
      "SRPC", "LRPC", "natural rate of unemployment", "NRU",
      "expectations", "stagflation",
    ],
  },
  {
    id: "inequality",
    name: "Inequality — Lorenz & Gini",
    theme: "Unit 3 — Macroeconomics",
    axes: { x: "Cumulative % Population", y: "Cumulative % Income" },
    curveNames: ["Line of equality", "Lorenz curve"],
    requiredLabels: ["Gini coefficient", "Area A", "Area B"],
    commandWords: ["explain", "discuss", "evaluate", "compare"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["ib_lorenz_curve"],
    identificationKeywords: [
      "lorenz", "gini", "inequality", "income distribution",
      "wealth distribution", "poverty", "redistribution",
    ],
  },
];

/* ══════════════════════════════════════════════
   D. GLOBAL ECONOMY
   ══════════════════════════════════════════════ */

const IB_GLOBAL_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "comparative_advantage",
    name: "Comparative Advantage",
    theme: "Unit 4 — Global Economy",
    axes: { x: "Good X", y: "Good Y" },
    curveNames: ["Country A PPC", "Country B PPC"],
    requiredLabels: ["Opportunity costs", "Specialisation"],
    commandWords: ["explain", "calculate", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "calculate", "explain"],
    specKeys: ["ib_comparative_advantage"],
    identificationKeywords: [
      "comparative advantage", "absolute advantage", "specialisation",
      "gains from trade", "opportunity cost", "terms of trade",
      "free trade", "Ricardo",
    ],
  },
  {
    id: "tariff",
    name: "Tariff",
    theme: "Unit 4 — Global Economy",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "Sd", "Pw", "Pw + tariff"],
    requiredLabels: ["Tariff revenue", "DWL", "Imports before/after"],
    commandWords: ["explain", "show", "discuss", "evaluate", "calculate"],
    expectedActions: ["draw", "label", "shade", "calculate", "evaluate"],
    specKeys: ["ib_tariff"],
    identificationKeywords: [
      "tariff", "import duty", "protectionism", "trade barrier",
      "domestic producers", "world price",
    ],
  },
  {
    id: "quota",
    name: "Quota",
    theme: "Unit 4 — Global Economy",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "Sd", "Pw", "Sd + quota"],
    requiredLabels: ["Quota rent", "DWL", "Restricted imports"],
    commandWords: ["explain", "show", "discuss", "evaluate", "calculate"],
    expectedActions: ["draw", "label", "shade", "calculate", "evaluate"],
    specKeys: ["ib_quota"],
    identificationKeywords: [
      "quota", "import quota", "quantitative restriction",
      "quota rent",
    ],
  },
  {
    id: "trade_subsidy",
    name: "Production/Export Subsidy in Trade",
    theme: "Unit 4 — Global Economy",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "Sd", "Sd + subsidy", "Pw"],
    requiredLabels: ["Government cost", "Domestic production change"],
    commandWords: ["explain", "show", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["ib_trade_subsidy"],
    identificationKeywords: [
      "trade subsidy", "export subsidy", "production subsidy",
      "domestic subsidy", "protectionism subsidy",
    ],
  },
  {
    id: "exchange_rate",
    name: "Exchange Rate",
    theme: "Unit 4 — Global Economy",
    axes: { x: "Quantity of Currency", y: "Exchange Rate" },
    curveNames: ["D", "S", "D₂", "S₂"],
    requiredLabels: ["ER₁", "ER₂", "Appreciation/Depreciation"],
    commandWords: ["explain", "show", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ib_exchange_rate", "ib_exchange_depreciation"],
    identificationKeywords: [
      "exchange rate", "appreciation", "depreciation",
      "floating", "fixed", "managed", "currency",
      "foreign exchange", "forex", "hot money",
    ],
  },
  {
    id: "j_curve",
    name: "J-Curve (HL)",
    theme: "Unit 4 — HL Extension",
    axes: { x: "Time", y: "Current Account Balance" },
    curveNames: ["CA balance"],
    requiredLabels: ["Depreciation point", "Initial worsening", "LR improvement"],
    commandWords: ["explain", "discuss", "evaluate"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["ib_j_curve"],
    identificationKeywords: [
      "j-curve", "j curve", "marshall-lerner", "marshall lerner",
      "current account", "trade balance", "depreciation effect",
    ],
  },
  {
    id: "development",
    name: "Development & Poverty",
    theme: "Unit 4 — Global Economy",
    axes: { x: "", y: "" },
    curveNames: [],
    requiredLabels: ["Poverty cycle stages", "Breaking points"],
    commandWords: ["explain", "discuss", "evaluate", "recommend"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["ib_poverty_cycle"],
    identificationKeywords: [
      "poverty cycle", "poverty trap", "development",
      "Harrod-Domar", "savings gap", "aid", "FDI",
      "sustainable development", "barriers to development",
    ],
  },
];

/* ══════════════════════════════════════════════
   BOARD PROFILES
   ══════════════════════════════════════════════ */

export const IB_HL_PROFILE: BoardProfile = {
  boardId: "ib_hl",
  boardName: "IB Economics HL",
  papers: [
    { paper: "Paper 1", themes: ["Microeconomics", "Macroeconomics"], marks: 25, duration: "1h15m", sections: ["Section A (Micro)", "Section B (Macro)"] },
    { paper: "Paper 2", themes: ["All units"], marks: 40, duration: "1h45m", sections: ["Section A", "Section B"] },
    { paper: "Paper 3", themes: ["All units (HL)"], marks: 60, duration: "1h45m", sections: ["Section A", "Section B"] },
  ],
  diagramFamilies: [
    ...IB_INTRO_FAMILIES,
    ...IB_MICRO_FAMILIES,
    ...IB_MACRO_FAMILIES,
    ...IB_GLOBAL_FAMILIES,
  ],
  terminology: {
    "opportunity cost": "The next best alternative forgone",
    "allocative efficiency": "P = MC",
    "productive efficiency": "Producing at minimum ATC",
    "welfare loss": "Deadweight loss triangle",
    "market failure": "Where the free market fails to allocate resources efficiently",
    "merit good": "Good with positive externalities of consumption / information failure",
    "demerit good": "Good with negative externalities of consumption / information failure",
    "NRU": "Natural rate of unemployment",
  },
  paperFormatting: {
    extractLabel: "Text / Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B"],
  },
};

export const IB_SL_PROFILE: BoardProfile = {
  boardId: "ib_sl",
  boardName: "IB Economics SL",
  papers: [
    { paper: "Paper 1", themes: ["Microeconomics", "Macroeconomics"], marks: 25, duration: "1h15m", sections: ["Section A (Micro)", "Section B (Macro)"] },
    { paper: "Paper 2", themes: ["All units"], marks: 40, duration: "1h45m", sections: ["Section A", "Section B"] },
  ],
  diagramFamilies: [
    ...IB_INTRO_FAMILIES,
    // SL micro — exclude market_power
    ...IB_MICRO_FAMILIES.filter(f => f.id !== "market_power"),
    ...IB_MACRO_FAMILIES,
    // SL global — exclude j_curve
    ...IB_GLOBAL_FAMILIES.filter(f => f.id !== "j_curve"),
  ],
  terminology: {
    ...IB_HL_PROFILE.terminology,
  },
  paperFormatting: {
    extractLabel: "Text / Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B"],
  },
};
