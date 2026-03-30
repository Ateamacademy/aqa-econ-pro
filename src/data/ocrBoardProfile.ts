/**
 * OCR A-LEVEL BOARD PROFILE
 *
 * Board-specific diagram taxonomy, vocabulary, rubrics, and expectations
 * for OCR A-Level Economics (H460) and OCR AS Economics (H060).
 *
 * Derived from the official OCR Teacher Support Diagram Guide (2024)
 * and OCR-endorsed textbooks (Peter Smith, 4th Edition).
 *
 * Key OCR principles embedded:
 *   - Diagrams must support explanation, analysis, and evaluation
 *   - Chain-of-reasoning approach rather than isolated bullet points
 *   - Context-specific axis labelling (rename axes to match question goods)
 *   - Explicit reference to labelled points in written analysis
 *   - OCR distinguishes merit/demerit goods from externalities clearly
 */

import type { DiagramFamilyProfile, BoardProfile } from "@/data/edexcelBoardProfiles";

/* ══════════════════════════════════════════════
   OCR MICRO DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const OCR_MICRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "trade_off",
    name: "Straight-Line Trade-Off",
    theme: "Component 1 — Section 1",
    axes: { x: "Consumer Goods", y: "Capital Goods" },
    curveNames: ["PPC (straight line)"],
    requiredLabels: ["Points x, y", "a, b (quantities)", "Axes in context"],
    commandWords: ["explain", "show", "illustrate"],
    expectedActions: ["draw", "label", "explain", "explain"],
    specKeys: ["ocr_tradeoff_straight"],
    identificationKeywords: [
      "trade-off", "trade off", "constant opportunity cost",
      "straight line", "PPC straight", "linear PPC",
    ],
  },
  {
    id: "ppf",
    name: "Production Possibility Curve",
    theme: "Component 1 — Topic 1.3",
    axes: { x: "Consumer Goods", y: "Capital Goods" },
    curveNames: ["PPC", "PPC₁", "PPC₂"],
    requiredLabels: ["Efficient points (on PPC)", "Inefficient (inside)", "Unattainable (outside)", "Shift arrows"],
    commandWords: ["explain", "draw", "show", "illustrate", "demonstrate"],
    expectedActions: ["draw", "label", "shift", "explain", "explain"],
    specKeys: [
      "ocr_ppc_basic", "ocr_ppc_shift_out", "ocr_ppc_biased",
      "ppf_balanced_growth", "ppf_biased_capital", "ppf_unemployment",
    ],
    identificationKeywords: [
      "production possibility", "PPC", "ppf", "opportunity cost",
      "efficient", "inefficient", "unattainable", "factors of production",
      "technical progress", "productive capacity", "economic growth",
    ],
  },
  {
    id: "demand",
    name: "Demand",
    theme: "Component 1 — Topic 2.2",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "D₁", "D₂"],
    requiredLabels: ["P", "P₁", "Q", "Q₁", "D"],
    commandWords: ["explain", "show", "illustrate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ocr_demand_basic", "ocr_demand_shift", "ocr_demand_joint", "ocr_demand_competitive"],
    identificationKeywords: [
      "demand", "quantity demanded", "demand curve",
      "joint demand", "competitive demand", "composite demand",
      "extension", "contraction", "shift in demand",
      "complementary", "substitute",
    ],
  },
  {
    id: "supply",
    name: "Supply",
    theme: "Component 1 — Topic 2.3",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["S", "S₁", "S₂"],
    requiredLabels: ["P", "P₁", "Q", "Q₁", "S"],
    commandWords: ["explain", "show", "illustrate"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["ocr_supply_basic", "ocr_supply_shift", "ocr_supply_joint", "ocr_supply_competitive"],
    identificationKeywords: [
      "supply", "quantity supplied", "supply curve",
      "joint supply", "competitive supply",
      "extension of supply", "contraction of supply",
    ],
  },
  {
    id: "consumer_producer_surplus",
    name: "Consumer & Producer Surplus",
    theme: "Component 1 — Topic 2.4",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "S"],
    requiredLabels: ["CS (shaded)", "PS (shaded)", "P", "Market price", "Change labels"],
    commandWords: ["explain", "show", "shade", "identify", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: ["ocr_consumer_surplus", "ocr_producer_surplus", "consumer_producer_surplus"],
    identificationKeywords: [
      "consumer surplus", "producer surplus", "total surplus",
      "welfare", "area above price", "area below price",
    ],
  },
  {
    id: "marginal_utility",
    name: "Marginal Utility / Diminishing Marginal Utility",
    theme: "Component 1 — Topic 2.7",
    axes: { x: "Quantity", y: "Price / Utility" },
    curveNames: ["D = MU"],
    requiredLabels: ["D = MU", "P", "P₁", "Q", "Q₁"],
    commandWords: ["explain", "calculate"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["ocr_marginal_utility"],
    identificationKeywords: [
      "marginal utility", "diminishing", "total utility",
      "willingness to pay", "satisfaction",
    ],
  },
  {
    id: "supply_demand",
    name: "Interaction of Demand & Supply",
    theme: "Component 1 — Topic 2.5",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "D₁", "S", "S₁"],
    requiredLabels: ["P", "Q", "Equilibrium", "Excess demand / supply"],
    commandWords: ["explain", "show", "illustrate", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain", "evaluate"],
    specKeys: [
      "supply_demand", "demand_increase", "supply_increase",
      "ocr_simultaneous_shift",
    ],
    identificationKeywords: [
      "equilibrium", "market equilibrium", "disequilibrium",
      "excess demand", "excess supply", "market clearing",
      "interaction", "price mechanism",
    ],
  },
  {
    id: "elasticity",
    name: "Elasticity (PED, PES, YED, XED)",
    theme: "Component 1 — Topic 2.6",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D (elastic)", "D (inelastic)", "D (unit elastic)", "D (perfectly elastic)", "D (perfectly inelastic)"],
    requiredLabels: ["PED values", "Revenue implications", "Slope indications"],
    commandWords: ["explain", "show", "compare", "calculate"],
    expectedActions: ["draw", "label", "explain", "calculate"],
    specKeys: ["ocr_ped_elastic", "ocr_ped_inelastic", "ocr_pes_variants", "ocr_yed", "ocr_xed"],
    identificationKeywords: [
      "elasticity", "elastic", "inelastic", "unit elastic",
      "PED", "PES", "YED", "XED", "perfectly elastic",
      "perfectly inelastic", "total revenue", "income elasticity",
      "cross elasticity", "responsiveness",
    ],
  },
  {
    id: "externalities",
    name: "Externalities (Production & Consumption)",
    theme: "Component 1 — Topics 2.7/2.8",
    axes: { x: "Quantity", y: "Costs / Benefits / Price" },
    curveNames: ["MPC", "MSC", "MPB", "MSB", "MB", "MC"],
    requiredLabels: ["MPC", "MSC", "MPB", "MSB", "Welfare loss/gain triangle", "Social optimum", "Free market eq"],
    commandWords: ["explain", "show", "illustrate", "shade", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: [
      "ocr_neg_prod_ext", "ocr_pos_prod_ext",
      "ocr_neg_cons_ext", "ocr_pos_cons_ext",
      "negative_production_externality", "positive_production_externality",
    ],
    identificationKeywords: [
      "externality", "external cost", "external benefit",
      "MPC", "MSC", "MPB", "MSB", "MEC",
      "market failure", "welfare loss", "deadweight",
      "overproduction", "underproduction",
      "overconsumption", "underconsumption",
      "socially optimum", "third party",
    ],
  },
  {
    id: "information_failure",
    name: "Information Failure (Merit & Demerit Goods)",
    theme: "Component 1 — Topic 2.9",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D (perceived)", "D₁ (actual)", "S"],
    requiredLabels: ["D (perceived)", "D₁ (actual)", "Market failure point", "Optimum allocation", "Welfare triangle"],
    commandWords: ["explain", "evaluate", "show"],
    expectedActions: ["draw", "label", "shift", "shade", "explain", "evaluate"],
    specKeys: ["ocr_merit_good", "ocr_demerit_good"],
    identificationKeywords: [
      "merit good", "demerit good", "information failure",
      "perceived benefit", "actual benefit",
      "underconsumption", "overconsumption",
      "education", "smoking", "alcohol", "healthcare",
    ],
  },
  {
    id: "government_intervention",
    name: "Government Intervention",
    theme: "Component 1 — Topics 2.8/2.11",
    axes: { x: "Quantity", y: "Price" },
    curveNames: ["D", "S", "S + tax", "S - subsidy", "P Max", "P Min"],
    requiredLabels: ["Tax/subsidy amount", "New equilibrium", "Welfare change", "Excess demand/supply"],
    commandWords: ["explain", "evaluate", "show", "illustrate"],
    expectedActions: ["draw", "label", "shift", "shade", "explain", "evaluate"],
    specKeys: [
      "ocr_indirect_tax", "ocr_subsidy_correction",
      "ocr_max_price", "ocr_min_price", "ocr_buffer_stock",
      "ocr_tradeable_permits", "ocr_info_provision",
      "tax_incidence", "price_floor", "price_ceiling",
    ],
    identificationKeywords: [
      "indirect tax", "subsidy", "maximum price", "minimum price",
      "price ceiling", "price floor", "price cap",
      "buffer stock", "tradeable permits", "pollution permits",
      "information provision", "government intervention",
      "correct market failure", "internalise",
    ],
  },
  {
    id: "cost_curves",
    name: "Cost Curves & Economies of Scale",
    theme: "Component 2 — Costs & Revenue",
    axes: { x: "Output (Q)", y: "Costs (£)" },
    curveNames: ["MC", "ATC", "AVC", "AFC", "LRAC"],
    requiredLabels: ["MC", "ATC", "AVC", "Min ATC", "MES"],
    commandWords: ["draw", "show", "shade", "explain"],
    expectedActions: ["draw", "label", "shade", "explain"],
    specKeys: ["cost_curves", "cost_curves_short_run", "lrac"],
    identificationKeywords: [
      "marginal cost", "average cost", "ATC", "AVC", "AFC",
      "economies of scale", "diseconomies", "LRAC",
      "minimum efficient scale", "returns to scale",
    ],
  },
  {
    id: "market_structures",
    name: "Market Structures",
    theme: "Component 2 — Market Structures",
    axes: { x: "Output (Q)", y: "Price / Cost / Revenue (£)" },
    curveNames: ["AR", "MR", "MC", "ATC"],
    requiredLabels: ["AR", "MR", "MC", "ATC", "Profit max", "Supernormal profit"],
    commandWords: ["draw", "show", "shade", "compare", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: [
      "monopoly", "perfectComp", "monopolistic_competition_sr",
      "monopolistic_competition_lr",
    ],
    identificationKeywords: [
      "monopoly", "perfect competition", "monopolistic competition",
      "oligopoly", "contestable", "price maker", "price taker",
      "supernormal profit", "normal profit",
      "barriers to entry", "profit maximisation",
    ],
  },
];

/* ══════════════════════════════════════════════
   OCR MACRO DIAGRAM FAMILIES
   ══════════════════════════════════════════════ */

const OCR_MACRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ad_as",
    name: "Aggregate Demand / Aggregate Supply",
    theme: "Component 2 — Macro Equilibrium",
    axes: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curveNames: ["AD", "AD₁", "SRAS", "SRAS₁", "LRAS"],
    requiredLabels: ["PL", "Y", "AD", "SRAS", "LRAS", "Equilibrium"],
    commandWords: ["draw", "show", "illustrate", "explain", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain", "evaluate"],
    specKeys: [
      "ad_increase", "ad_decrease", "sras_increase", "sras_decrease",
      "lras_shift", "keynesian_as",
    ],
    identificationKeywords: [
      "aggregate demand", "aggregate supply", "AD", "AS",
      "SRAS", "LRAS", "price level", "real GDP",
      "demand-pull", "cost-push", "inflation",
      "output gap", "supply-side", "Keynesian",
    ],
  },
  {
    id: "phillips_curve",
    name: "Phillips Curve",
    theme: "Component 2 — Inflation & Unemployment",
    axes: { x: "Unemployment Rate (%)", y: "Inflation Rate (%)" },
    curveNames: ["SRPC", "LRPC"],
    requiredLabels: ["SRPC", "LRPC", "NRU"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["phillips_curve"],
    identificationKeywords: [
      "Phillips curve", "inflation", "unemployment",
      "trade-off", "NAIRU", "natural rate",
    ],
  },
  {
    id: "exchange_rate",
    name: "Exchange Rate",
    theme: "Component 2 — International",
    axes: { x: "Quantity of £", y: "Exchange Rate ($/£)" },
    curveNames: ["D£", "S£"],
    requiredLabels: ["e₁", "e₂", "Q₁", "Q₂"],
    commandWords: ["draw", "show", "explain"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["exchange_rate"],
    identificationKeywords: [
      "exchange rate", "depreciation", "appreciation",
      "foreign exchange", "currency",
    ],
  },
  {
    id: "international_trade",
    name: "International Trade",
    theme: "Component 2 — Trade",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S (domestic)", "S (world)"],
    requiredLabels: ["Pw", "Import volume", "DWL"],
    commandWords: ["draw", "show", "shade", "evaluate"],
    expectedActions: ["draw", "label", "shade", "evaluate"],
    specKeys: ["tariff", "trade_quota"],
    identificationKeywords: [
      "tariff", "quota", "protectionism", "free trade",
      "world price", "imports", "comparative advantage",
    ],
  },
  {
    id: "circular_flow",
    name: "Circular Flow / Injections & Withdrawals",
    theme: "Component 2 — National Income",
    axes: { x: "National Income (Y)", y: "Injections / Withdrawals (£)" },
    curveNames: ["J (injections)", "W (withdrawals)"],
    requiredLabels: ["J", "W", "Equilibrium Y", "Multiplier"],
    commandWords: ["explain", "show", "illustrate"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["ocr_circular_flow", "multiplier_effect"],
    identificationKeywords: [
      "circular flow", "injections", "withdrawals",
      "leakages", "national income", "multiplier",
      "equilibrium national income",
    ],
  },
  {
    id: "development",
    name: "Development & Inequality",
    theme: "Component 2 — Development",
    axes: { x: "Various", y: "Various" },
    curveNames: ["Lorenz"],
    requiredLabels: ["Line of equality", "Gini coefficient"],
    commandWords: ["draw", "show", "explain", "evaluate"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["lorenz_curve"],
    identificationKeywords: [
      "Lorenz curve", "Gini", "inequality",
      "poverty", "development",
    ],
  },
];

/* ══════════════════════════════════════════════
   OCR A-LEVEL BOARD PROFILE
   ══════════════════════════════════════════════ */

export const OCR_ALEVEL_PROFILE: BoardProfile = {
  boardId: "ocr_alevel",
  boardName: "OCR A-Level Economics (H460)",
  papers: [
    {
      paper: "Component 1: Microeconomics",
      themes: ["Microeconomics"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Multiple choice (30 marks)", "Section B: Case study (50 marks)"],
    },
    {
      paper: "Component 2: Macroeconomics",
      themes: ["Macroeconomics"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Multiple choice (30 marks)", "Section B: Case study (50 marks)"],
    },
    {
      paper: "Component 3: Themes in Economics",
      themes: ["Microeconomics", "Macroeconomics"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Case study (40 marks)", "Section B: Case study (40 marks)"],
    },
  ],
  diagramFamilies: [...OCR_MICRO_FAMILIES, ...OCR_MACRO_FAMILIES],
  terminology: {
    "aggregate supply": "SRAS / LRAS",
    "equilibrium": "E, E₁, E₂",
    "welfare loss": "Deadweight welfare loss / Welfare that could have been gained",
    "profit": "Supernormal profit / Normal profit",
    "merit good": "D (perceived benefit) / D₁ (actual benefit) — NOT externality labels",
    "demerit good": "D (perceived benefit) / D₁ (actual benefit) — NOT externality labels",
    "externality labels": "MPC, MSC, MPB, MSB — only for true externalities",
    "chain of reasoning": "OCR expects linked causal analysis, not isolated bullet points",
    "context labelling": "Rename axes to match question-specific goods/services",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B"],
  },
};

export const OCR_AS_PROFILE: BoardProfile = {
  boardId: "ocr_as",
  boardName: "OCR AS Economics (H060)",
  papers: [
    {
      paper: "Component 1: Microeconomics",
      themes: ["Microeconomics"],
      marks: 60,
      duration: "1 hour 30 minutes",
      sections: ["Section A: Multiple choice (20 marks)", "Section B: Case study (40 marks)"],
    },
    {
      paper: "Component 2: Macroeconomics",
      themes: ["Macroeconomics"],
      marks: 60,
      duration: "1 hour 30 minutes",
      sections: ["Section A: Multiple choice (20 marks)", "Section B: Case study (40 marks)"],
    },
  ],
  diagramFamilies: [...OCR_MICRO_FAMILIES, ...OCR_MACRO_FAMILIES],
  terminology: {
    ...OCR_ALEVEL_PROFILE.terminology,
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B"],
  },
};
