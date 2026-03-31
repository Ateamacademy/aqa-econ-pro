/**
 * Board profiles for AQA GCSE Economics and Cambridge International IGCSE Economics.
 */

import type { DiagramFamilyProfile, BoardProfile } from "@/data/edexcelBoardProfiles";

/* ══════════════════════════════════════════════
   GCSE / IGCSE DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const GCSE_MICRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ppf",
    name: "Production Possibility Frontier",
    theme: "How Markets Work",
    axes: { x: "Good A", y: "Good B" },
    curveNames: ["PPF", "PPF₁", "PPF₂"],
    requiredLabels: ["PPF", "Efficient point", "Inefficient point", "Unattainable point"],
    commandWords: ["draw", "show", "explain", "identify"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["gcse_ppf", "gcse_ppf_outward_shift"],
    identificationKeywords: [
      "ppf", "production possibility", "opportunity cost", "trade-off",
      "scarcity", "choice", "economic growth", "efficient", "inefficient", "unattainable",
    ],
  },
  {
    id: "supply_demand",
    name: "Supply & Demand",
    theme: "How Markets Work",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "D₁", "D₂", "S", "S₁", "S₂"],
    requiredLabels: ["P", "Q", "D", "S", "E", "P*", "Q*"],
    commandWords: ["draw", "show", "explain", "identify"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: [
      "gcse_equilibrium", "gcse_demand_shift", "gcse_supply_shift",
      "gcse_excess_demand", "gcse_excess_supply",
    ],
    identificationKeywords: [
      "supply", "demand", "equilibrium", "price", "quantity",
      "market", "shift", "excess demand", "excess supply",
      "shortage", "surplus", "disequilibrium",
    ],
  },
  {
    id: "consumer_producer_surplus",
    name: "Consumer & Producer Surplus",
    theme: "How Markets Work",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S"],
    requiredLabels: ["CS", "PS", "P*", "Q*"],
    commandWords: ["shade", "show", "identify"],
    expectedActions: ["shade", "label", "explain"],
    specKeys: ["gcse_consumer_producer_surplus"],
    identificationKeywords: [
      "consumer surplus", "producer surplus", "welfare",
    ],
  },
  {
    id: "elasticity",
    name: "Price Elasticity of Demand",
    theme: "How Markets Work",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (elastic)", "D (inelastic)"],
    requiredLabels: ["PED > 1", "PED < 1"],
    commandWords: ["draw", "compare", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["gcse_ped_elastic", "gcse_ped_inelastic"],
    identificationKeywords: [
      "elasticity", "elastic", "inelastic", "PED", "PES",
      "responsive", "steep", "shallow",
    ],
  },
  {
    id: "tax_subsidy",
    name: "Indirect Tax & Subsidy",
    theme: "Market Failure & Government Intervention",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "S + tax", "S + subsidy"],
    requiredLabels: ["P₁", "P₂", "Q₁", "Q₂", "Tax/Subsidy"],
    commandWords: ["show", "explain", "draw"],
    expectedActions: ["draw", "shift", "label", "explain"],
    specKeys: ["gcse_indirect_tax", "gcse_subsidy"],
    identificationKeywords: [
      "tax", "indirect tax", "subsidy", "demerit", "merit",
      "government intervention", "correct market failure",
    ],
  },
  {
    id: "price_controls",
    name: "Price Floor & Ceiling",
    theme: "Market Failure & Government Intervention",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "Pmin", "Pmax"],
    requiredLabels: ["P*", "Pmin/Pmax", "Shortage/Surplus"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["gcse_price_ceiling", "gcse_price_floor"],
    identificationKeywords: [
      "price floor", "minimum price", "price ceiling", "maximum price",
      "minimum wage", "rent control",
    ],
  },
  {
    id: "externalities",
    name: "Externalities",
    theme: "Market Failure & Government Intervention",
    axes: { x: "Quantity (Q)", y: "Price / Cost / Benefit" },
    curveNames: ["Private cost", "Social cost", "Private benefit", "Social benefit"],
    requiredLabels: ["Welfare loss", "Market output", "Social optimum"],
    commandWords: ["draw", "show", "shade", "explain"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["gcse_negative_externality", "gcse_positive_externality"],
    identificationKeywords: [
      "externality", "external cost", "external benefit",
      "market failure", "welfare loss", "overproduction", "underconsumption",
      "pollution", "third party",
    ],
  },
  {
    id: "merit_demerit",
    name: "Merit & Demerit Goods",
    theme: "Market Failure & Government Intervention",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (perceived)", "D (actual)", "S"],
    requiredLabels: ["D₁", "D₂", "Q₁", "Q₂"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "shift", "explain"],
    specKeys: ["gcse_merit_good", "gcse_demerit_good"],
    identificationKeywords: [
      "merit good", "demerit good", "information failure",
      "imperfect information", "underconsumption", "overconsumption",
      "education", "healthcare", "cigarettes", "alcohol",
    ],
  },
  {
    id: "cost_curves",
    name: "Economies of Scale / LRAC",
    theme: "Production, Costs, Revenue & Profit",
    axes: { x: "Output (Q)", y: "Average Cost (£)" },
    curveNames: ["LRAC"],
    requiredLabels: ["Economies of scale", "MES", "Diseconomies"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["gcse_economies_of_scale"],
    identificationKeywords: [
      "economies of scale", "diseconomies", "average cost",
      "LRAC", "MES", "minimum efficient scale",
    ],
  },
];

const GCSE_MACRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "labour_market",
    name: "Labour Market",
    theme: "How Markets Work / National Economy",
    axes: { x: "Quantity of Labour", y: "Wage Rate" },
    curveNames: ["D (labour)", "S (labour)", "NMW"],
    requiredLabels: ["W*", "L*", "DL", "SL"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["gcse_labour_market", "gcse_minimum_wage"],
    identificationKeywords: [
      "labour market", "wage", "employment", "minimum wage",
      "NMW", "unemployment", "derived demand",
    ],
  },
  {
    id: "ad_as",
    name: "Aggregate Demand / Aggregate Supply",
    theme: "National Economy",
    axes: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curveNames: ["AD", "AD₁", "AD₂", "AS"],
    requiredLabels: ["PL", "Y", "AD", "AS", "E"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["gcse_ad_as", "gcse_ad_increase"],
    identificationKeywords: [
      "aggregate demand", "aggregate supply", "AD", "AS",
      "price level", "real GDP", "economic growth",
      "inflation", "demand-pull", "cost-push",
    ],
  },
  {
    id: "exchange_rate",
    name: "Exchange Rate",
    theme: "International Economy",
    axes: { x: "Quantity of Currency", y: "Exchange Rate" },
    curveNames: ["D (currency)", "S (currency)"],
    requiredLabels: ["ER*", "Q*"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["gcse_exchange_rate", "gcse_exchange_rate_appreciation"],
    identificationKeywords: [
      "exchange rate", "appreciation", "depreciation",
      "currency", "imports", "exports",
    ],
  },
  {
    id: "international_trade",
    name: "Trade Protection (Tariffs)",
    theme: "International Economy",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (domestic)", "S (domestic)", "Pw", "Pw + tariff"],
    requiredLabels: ["Pw", "Tariff", "Imports"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["gcse_tariff"],
    identificationKeywords: [
      "tariff", "quota", "trade protection", "protectionism",
      "free trade", "imports", "world price",
    ],
  },
  {
    id: "development",
    name: "Development & Inequality",
    theme: "International Economy / Development",
    axes: { x: "Cumulative % Population", y: "Cumulative % Income" },
    curveNames: ["Lorenz", "Line of Equality"],
    requiredLabels: ["Gini", "Line of Equality"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["gcse_lorenz_curve", "gcse_comparative_advantage"],
    identificationKeywords: [
      "Lorenz curve", "Gini", "inequality", "development",
      "comparative advantage", "specialisation",
    ],
  },
];

/* ══════════════════════════════════════════════
   AQA GCSE ECONOMICS BOARD PROFILE (8136)
   ══════════════════════════════════════════════ */

export const AQA_GCSE_PROFILE: BoardProfile = {
  boardId: "aqa_gcse",
  boardName: "AQA GCSE Economics (8136)",
  papers: [
    {
      paper: "Paper 1: How Markets Work",
      themes: ["How Markets Work", "Market Failure & Government Intervention"],
      marks: 80,
      duration: "1 hour 45 minutes",
      sections: ["Section A: Multiple choice (20 marks)", "Section B: Short answer & data response (60 marks)"],
    },
    {
      paper: "Paper 2: How the Economy Works",
      themes: ["National Economy", "International Economy"],
      marks: 80,
      duration: "1 hour 45 minutes",
      sections: ["Section A: Multiple choice (20 marks)", "Section B: Short answer & data response (60 marks)"],
    },
  ],
  diagramFamilies: [...GCSE_MICRO_FAMILIES, ...GCSE_MACRO_FAMILIES],
  terminology: {
    "equilibrium": "E, P*, Q*",
    "welfare loss": "Welfare loss triangle",
    "externality": "External cost / External benefit",
    "merit good": "Merit good — underconsumption",
    "demerit good": "Demerit good — overconsumption",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B"],
  },
};

/* ══════════════════════════════════════════════
   CAMBRIDGE INTERNATIONAL IGCSE ECONOMICS (0455)
   ══════════════════════════════════════════════ */

export const CAIE_IGCSE_PROFILE: BoardProfile = {
  boardId: "caie_igcse",
  boardName: "Cambridge IGCSE Economics (0455)",
  papers: [
    {
      paper: "Paper 1: Multiple Choice",
      themes: ["Basic Economic Problem", "Allocation of Resources", "Microeconomic Decision Makers", "Government & Macroeconomy", "Economic Development", "International Trade & Globalisation"],
      marks: 30,
      duration: "45 minutes",
      sections: ["30 multiple-choice questions"],
    },
    {
      paper: "Paper 2: Structured Questions",
      themes: ["Basic Economic Problem", "Allocation of Resources", "Microeconomic Decision Makers", "Government & Macroeconomy", "Economic Development", "International Trade & Globalisation"],
      marks: 90,
      duration: "2 hours 15 minutes",
      sections: ["Section A: Answer one question (20 marks)", "Section B: Answer three questions (70 marks)"],
    },
  ],
  diagramFamilies: [...GCSE_MICRO_FAMILIES, ...GCSE_MACRO_FAMILIES],
  terminology: {
    "equilibrium": "E, Pe, Qe",
    "disequilibrium": "Excess demand / Excess supply",
    "externality": "External costs / External benefits",
    "market failure": "Market failure — resource misallocation",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Fig.",
    sectionLabels: ["Section A", "Section B"],
  },
};
