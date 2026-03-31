/**
 * Board profiles for Edexcel International GCSE Economics (4EC1) and OCR GCSE Economics (J205).
 */

import type { DiagramFamilyProfile, BoardProfile } from "@/data/edexcelBoardProfiles";

/* ══════════════════════════════════════════════
   EDEXCEL IGCSE DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const EDXIG_MICRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ppf",
    name: "Production Possibility Frontier",
    theme: "The Market System",
    axes: { x: "Good X", y: "Good Y" },
    curveNames: ["PPF", "PPF₁", "PPF₂"],
    requiredLabels: ["PPF", "Efficient", "Inefficient", "Unattainable"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["edxig_ppf", "edxig_ppf_growth"],
    identificationKeywords: [
      "ppf", "production possibility", "opportunity cost", "scarcity",
      "economic growth", "efficient", "inefficient", "unattainable",
    ],
  },
  {
    id: "supply_demand",
    name: "Supply & Demand",
    theme: "The Market System",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "D₁", "D₂", "S", "S₁", "S₂"],
    requiredLabels: ["Pe", "Qe", "D", "S", "E"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: [
      "edxig_demand_supply_equilibrium", "edxig_demand_increase", "edxig_supply_decrease",
    ],
    identificationKeywords: [
      "supply", "demand", "equilibrium", "price mechanism",
      "signalling", "rationing", "incentive",
      "excess demand", "excess supply", "shortage", "surplus",
    ],
  },
  {
    id: "elasticity",
    name: "Price Elasticity",
    theme: "The Market System",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (elastic)", "D (inelastic)", "S (elastic)", "S (inelastic)"],
    requiredLabels: ["PED", "PES"],
    commandWords: ["draw", "compare", "explain", "calculate"],
    expectedActions: ["draw", "label", "calculate", "explain"],
    specKeys: ["edxig_ped", "edxig_pes"],
    identificationKeywords: [
      "elasticity", "PED", "PES", "elastic", "inelastic",
      "responsiveness", "revenue", "steep", "shallow",
    ],
  },
  {
    id: "tax_subsidy",
    name: "Indirect Tax & Subsidy",
    theme: "The Market System / Business Economics",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "S + tax", "S + subsidy"],
    requiredLabels: ["P₁", "P₂", "Q₁", "Q₂"],
    commandWords: ["show", "explain", "draw"],
    expectedActions: ["draw", "shift", "label", "explain"],
    specKeys: ["edxig_indirect_tax", "edxig_subsidy"],
    identificationKeywords: [
      "tax", "indirect tax", "subsidy", "demerit", "merit",
      "government intervention", "incidence",
    ],
  },
  {
    id: "price_controls",
    name: "Price Controls",
    theme: "The Market System",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "Pmax", "Pmin"],
    requiredLabels: ["Pe", "Pmax/Pmin", "Shortage/Surplus"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["edxig_price_ceiling", "edxig_price_floor"],
    identificationKeywords: [
      "maximum price", "minimum price", "price floor", "price ceiling",
      "rent control", "minimum wage",
    ],
  },
  {
    id: "externalities",
    name: "Externalities",
    theme: "The Market System",
    axes: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curveNames: ["Private cost", "Social cost", "Private benefit", "Social benefit"],
    requiredLabels: ["Welfare loss", "Market output", "Social optimum"],
    commandWords: ["draw", "show", "shade", "explain"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["edxig_neg_externality", "edxig_pos_externality"],
    identificationKeywords: [
      "externality", "external cost", "external benefit",
      "welfare loss", "overproduction", "underconsumption",
      "pollution", "third party",
    ],
  },
  {
    id: "merit_demerit",
    name: "Merit & Demerit Goods",
    theme: "The Market System",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (perceived)", "D (actual)", "S"],
    requiredLabels: ["D₁", "D₂", "Q₁", "Q₂"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "shift", "explain"],
    specKeys: ["edxig_merit_good", "edxig_demerit_good"],
    identificationKeywords: [
      "merit good", "demerit good", "information failure",
      "imperfect information", "underconsumption", "overconsumption",
    ],
  },
  {
    id: "cost_curves",
    name: "Costs, Revenue & Economies of Scale",
    theme: "Business Economics",
    axes: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curveNames: ["TC", "TR", "LRAC"],
    requiredLabels: ["Break-even", "Profit", "Economies of scale", "MES"],
    commandWords: ["draw", "calculate", "explain"],
    expectedActions: ["draw", "label", "calculate", "explain"],
    specKeys: ["edxig_costs_revenue", "edxig_economies_of_scale"],
    identificationKeywords: [
      "total cost", "total revenue", "profit", "loss", "break-even",
      "economies of scale", "diseconomies", "average cost", "LRAC",
      "fixed cost", "variable cost",
    ],
  },
  {
    id: "labour_market",
    name: "Labour Market",
    theme: "Business Economics",
    axes: { x: "Quantity of Labour", y: "Wage Rate" },
    curveNames: ["D (labour)", "S (labour)", "Min Wage"],
    requiredLabels: ["W*", "L*"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["edxig_minimum_wage"],
    identificationKeywords: [
      "labour market", "wage", "derived demand", "minimum wage",
      "trade union", "unemployment",
    ],
  },
];

const EDXIG_MACRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ad_as",
    name: "Aggregate Demand / Aggregate Supply",
    theme: "The National Economy",
    axes: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curveNames: ["AD", "AD₁", "AD₂", "AS", "AS₁", "AS₂"],
    requiredLabels: ["PL", "Y", "AD", "AS", "E"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["edxig_ad_as", "edxig_ad_shift", "edxig_as_decrease", "edxig_supply_side"],
    identificationKeywords: [
      "aggregate demand", "aggregate supply", "AD", "AS",
      "demand-pull", "cost-push", "inflation", "fiscal policy",
      "monetary policy", "supply-side",
    ],
  },
  {
    id: "exchange_rate",
    name: "Exchange Rates",
    theme: "The Global Economy",
    axes: { x: "Quantity of Currency", y: "Exchange Rate" },
    curveNames: ["D (currency)", "S (currency)"],
    requiredLabels: ["ER*", "Q*"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["edxig_exchange_rate", "edxig_appreciation", "edxig_depreciation"],
    identificationKeywords: [
      "exchange rate", "appreciation", "depreciation",
      "SPICED", "currency", "floating",
    ],
  },
  {
    id: "international_trade",
    name: "Trade Protection",
    theme: "The Global Economy",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (domestic)", "S (domestic)", "Pw", "Pw + tariff"],
    requiredLabels: ["Pw", "Tariff", "Imports"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["edxig_tariff", "edxig_quota"],
    identificationKeywords: [
      "tariff", "quota", "protectionism", "free trade",
      "infant industry", "dumping", "world price",
    ],
  },
  {
    id: "development",
    name: "Development & Inequality",
    theme: "The Global Economy",
    axes: { x: "Cumulative % Population", y: "Cumulative % Income" },
    curveNames: ["Lorenz", "Line of Equality"],
    requiredLabels: ["Gini"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["edxig_lorenz", "edxig_comparative_advantage"],
    identificationKeywords: [
      "Lorenz curve", "Gini", "inequality",
      "comparative advantage", "specialisation",
    ],
  },
];

/* ══════════════════════════════════════════════
   EDEXCEL INTERNATIONAL GCSE PROFILE (4EC1)
   ══════════════════════════════════════════════ */

export const EDEXCEL_IGCSE_PROFILE: BoardProfile = {
  boardId: "edexcel_igcse",
  boardName: "Edexcel International GCSE Economics (4EC1)",
  papers: [
    {
      paper: "Paper 1: Microeconomics & Business Economics",
      themes: ["The Market System", "Business Economics"],
      marks: 80,
      duration: "1 hour 30 minutes",
      sections: ["Section A (20 marks)", "Section B: Structured questions (60 marks)"],
    },
    {
      paper: "Paper 2: Macroeconomics & the Global Economy",
      themes: ["The National Economy", "The Global Economy"],
      marks: 80,
      duration: "1 hour 30 minutes",
      sections: ["Section A (20 marks)", "Section B: Structured questions (60 marks)"],
    },
  ],
  diagramFamilies: [...EDXIG_MICRO_FAMILIES, ...EDXIG_MACRO_FAMILIES],
  terminology: {
    "equilibrium": "E, Pe, Qe",
    "externality": "External cost / External benefit, MPC, MSC, MPB, MSB",
    "merit good": "Merit good — D₁ (perceived) vs D₂ (actual)",
    "price mechanism": "Signalling, Rationing, Incentive",
    "elasticity": "PED, PES with formula and calculation",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B"],
  },
};

/* ══════════════════════════════════════════════
   OCR GCSE DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const OCR_GCSE_COMP1_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "supply_demand",
    name: "Supply & Demand / Price",
    theme: "The Role of Markets and Money",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "D₁", "D₂", "S", "S₁", "S₂"],
    requiredLabels: ["P*", "Q*", "D", "S", "E"],
    commandWords: ["draw", "explain", "analyse"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: [
      "ocr_gcse_demand", "ocr_gcse_demand_shift", "ocr_gcse_supply",
      "ocr_gcse_supply_shift", "ocr_gcse_equilibrium",
    ],
    identificationKeywords: [
      "supply", "demand", "equilibrium", "price",
      "market", "shift", "movement",
      "excess demand", "excess supply", "shortage", "surplus",
    ],
  },
  {
    id: "elasticity",
    name: "Price Elasticity",
    theme: "The Role of Markets and Money",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (elastic)", "D (inelastic)", "S (elastic)", "S (inelastic)"],
    requiredLabels: ["PED", "PES"],
    commandWords: ["draw", "explain", "evaluate"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["ocr_gcse_ped", "ocr_gcse_pes"],
    identificationKeywords: [
      "elasticity", "elastic", "inelastic", "PED", "PES",
      "responsive",
    ],
  },
  {
    id: "competition",
    name: "Competition & Market Power",
    theme: "The Role of Markets and Money",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S (competitive)", "S (monopoly)"],
    requiredLabels: ["Pc", "Pm", "Qc", "Qm"],
    commandWords: ["explain", "evaluate"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["ocr_gcse_competition"],
    identificationKeywords: [
      "competition", "monopoly", "oligopoly", "market power",
      "concentration", "barriers to entry",
    ],
  },
  {
    id: "cost_curves",
    name: "Costs, Revenue & Profit",
    theme: "The Role of Markets and Money",
    axes: { x: "Output (Q)", y: "Cost / Revenue (£)" },
    curveNames: ["TC", "TR", "LRAC"],
    requiredLabels: ["Break-even", "Profit", "Loss"],
    commandWords: ["calculate", "explain", "evaluate"],
    expectedActions: ["calculate", "draw", "label", "explain"],
    specKeys: ["ocr_gcse_costs_revenue", "ocr_gcse_economies_of_scale"],
    identificationKeywords: [
      "total cost", "total revenue", "average cost", "profit", "loss",
      "break-even", "economies of scale",
    ],
  },
  {
    id: "labour_market",
    name: "Labour Market",
    theme: "The Role of Markets and Money",
    axes: { x: "Quantity of Labour", y: "Wage Rate" },
    curveNames: ["D (labour)", "S (labour)"],
    requiredLabels: ["W*", "L*"],
    commandWords: ["draw", "analyse", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ocr_gcse_labour_market"],
    identificationKeywords: [
      "labour market", "wage", "employment",
      "supply of labour", "demand for labour",
    ],
  },
  {
    id: "externalities",
    name: "Externalities",
    theme: "Limitations of Markets",
    axes: { x: "Quantity (Q)", y: "Cost / Benefit" },
    curveNames: ["Private cost", "Social cost", "Private benefit", "Social benefit"],
    requiredLabels: ["Welfare loss", "Market output", "Social optimum"],
    commandWords: ["explain", "evaluate", "draw"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["ocr_gcse_externality_negative", "ocr_gcse_externality_positive", "ocr_gcse_indirect_tax"],
    identificationKeywords: [
      "externality", "external cost", "external benefit",
      "market failure", "welfare loss",
      "taxation", "subsidy", "regulation",
    ],
  },
];

const OCR_GCSE_COMP2_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ad_as",
    name: "AD/AS & Government Policy",
    theme: "Economic Objectives & Government",
    axes: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curveNames: ["AD", "AD₁", "AD₂", "AS", "AS₁", "AS₂"],
    requiredLabels: ["PL", "Y", "AD", "AS", "E"],
    commandWords: ["draw", "explain", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ocr_gcse_ad_as", "ocr_gcse_fiscal_expansion", "ocr_gcse_monetary_policy", "ocr_gcse_supply_side"],
    identificationKeywords: [
      "aggregate demand", "aggregate supply",
      "fiscal policy", "monetary policy", "supply side",
      "economic growth", "inflation", "unemployment",
    ],
  },
  {
    id: "exchange_rate",
    name: "Exchange Rates",
    theme: "International Trade",
    axes: { x: "Quantity of Currency", y: "Exchange Rate" },
    curveNames: ["D (£)", "S (£)"],
    requiredLabels: ["ER*", "Q*"],
    commandWords: ["draw", "analyse", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ocr_gcse_exchange_rate", "ocr_gcse_exchange_rate_change"],
    identificationKeywords: [
      "exchange rate", "appreciation", "depreciation",
      "currency", "imports", "exports",
    ],
  },
  {
    id: "international_trade",
    name: "International Trade & Globalisation",
    theme: "International Trade",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S (domestic)", "Pw", "Pw + tariff"],
    requiredLabels: ["Pw", "Imports"],
    commandWords: ["draw", "explain", "evaluate"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["ocr_gcse_tariff", "ocr_gcse_comparative_advantage"],
    identificationKeywords: [
      "tariff", "free trade", "globalisation",
      "comparative advantage", "specialisation",
      "imports", "exports",
    ],
  },
  {
    id: "development",
    name: "Development & Inequality",
    theme: "International Trade / Globalisation",
    axes: { x: "Cumulative % Population", y: "Cumulative % Income" },
    curveNames: ["Lorenz", "Line of Equality"],
    requiredLabels: ["Inequality"],
    commandWords: ["explain", "evaluate"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["ocr_gcse_lorenz"],
    identificationKeywords: [
      "Lorenz curve", "inequality", "distribution of income",
      "development", "GDP per capita",
    ],
  },
];

/* ══════════════════════════════════════════════
   OCR GCSE ECONOMICS BOARD PROFILE (J205)
   ══════════════════════════════════════════════ */

export const OCR_GCSE_PROFILE: BoardProfile = {
  boardId: "ocr_gcse",
  boardName: "OCR GCSE Economics (J205)",
  papers: [
    {
      paper: "Component 1: Introduction to Economics (J205/01)",
      themes: ["Introduction to Economics", "The Role of Markets and Money", "Limitations of Markets"],
      marks: 80,
      duration: "1 hour 30 minutes",
      sections: ["Section A: Multiple Choice (20 marks)", "Section B: Case study questions (60 marks)"],
    },
    {
      paper: "Component 2: National and International Economics (J205/02)",
      themes: ["Economic Objectives & Government", "International Trade & Globalisation"],
      marks: 80,
      duration: "1 hour 30 minutes",
      sections: ["Section A: Multiple Choice (20 marks)", "Section B: Case study questions (60 marks)"],
    },
  ],
  diagramFamilies: [...OCR_GCSE_COMP1_FAMILIES, ...OCR_GCSE_COMP2_FAMILIES],
  terminology: {
    "equilibrium": "E, P*, Q*",
    "externality": "Positive/negative externality",
    "competition": "Monopoly, oligopoly, competitive markets",
    "command words": "State, Explain, Calculate, Draw, Analyse, Evaluate",
    "quantitative": "Min 10% of marks — calculate, interpret data",
  },
  paperFormatting: {
    extractLabel: "Case Study",
    figureLabel: "Figure",
    sectionLabels: ["Part A", "Part B"],
  },
};
