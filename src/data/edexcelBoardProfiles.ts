/**
 * EDEXCEL BOARD PROFILES
 * 
 * Board-specific diagram taxonomy, vocabulary, rubrics, and expectations
 * for Edexcel A (Pearson Edexcel Economics A) and Edexcel B (Economics B).
 * 
 * Used by:
 *   - Figure analysis pipeline (classify detected diagrams)
 *   - Predicted paper generation (enforce board-correct diagrams)
 *   - Diagram Practice module (board-aware rubrics)
 *   - Study Notes (board-specific exam tips)
 */

export interface DiagramFamilyProfile {
  id: string;
  /** Display name */
  name: string;
  /** Edexcel theme/section */
  theme: string;
  /** Expected axis labels */
  axes: { x: string; y: string };
  /** Common curve names in this board's terminology */
  curveNames: string[];
  /** What the diagram must show to earn full marks */
  requiredLabels: string[];
  /** Common command words that trigger this diagram */
  commandWords: string[];
  /** What student action is expected */
  expectedActions: ("draw" | "label" | "shift" | "shade" | "calculate" | "explain" | "evaluate" | "adapt" | "illustrate")[];
  /** Related DIAGRAM_SPECS keys */
  specKeys: string[];
  /** Keywords that help identify this diagram family in text */
  identificationKeywords: string[];
}

export interface BoardProfile {
  boardId: string;
  boardName: string;
  /** Paper structure */
  papers: Array<{
    paper: string;
    themes: string[];
    marks: number;
    duration: string;
    sections: string[];
  }>;
  /** All diagram families for this board */
  diagramFamilies: DiagramFamilyProfile[];
  /** Board-specific terminology preferences */
  terminology: Record<string, string>;
  /** Common formatting patterns in papers */
  paperFormatting: {
    extractLabel: string;
    figureLabel: string;
    sectionLabels: string[];
  };
}

/* ══════════════════════════════════════════════
   MICRO DIAGRAM FAMILIES (shared by A and B)
   ══════════════════════════════════════════════ */

const MICRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ppf",
    name: "Production Possibility Frontier",
    theme: "Theme 1",
    axes: { x: "Consumer Goods", y: "Capital Goods" },
    curveNames: ["PPF", "PPF₁", "PPF₂"],
    requiredLabels: ["Consumer goods", "Capital goods", "PPF", "Point labels"],
    commandWords: ["draw", "show", "illustrate", "demonstrate", "adapt"],
    expectedActions: ["draw", "label", "shift"],
    specKeys: [
      "ppf", "ppf_growth", "ppf_balanced_growth", "ppf_biased_capital",
      "ppf_biased_consumer", "ppf_unemployment", "ppf_inward_shift",
    ],
    identificationKeywords: [
      "ppf", "production possibility", "opportunity cost", "trade-off",
      "economic growth", "productive capacity", "factors of production",
      "capital goods", "consumer goods", "productive inefficiency",
    ],
  },
  {
    id: "supply_demand",
    name: "Supply & Demand",
    theme: "Theme 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "D₁", "D₂", "S", "S₁", "S₂"],
    requiredLabels: ["P", "Q", "D", "S", "E", "P₁", "Q₁"],
    commandWords: ["draw", "show", "illustrate", "adapt", "demonstrate"],
    expectedActions: ["draw", "label", "shift"],
    specKeys: [
      "supply_demand", "demand_increase", "demand_decrease",
      "supply_increase", "supply_decrease",
    ],
    identificationKeywords: [
      "supply", "demand", "equilibrium", "price", "quantity",
      "market", "shift", "excess demand", "excess supply",
      "shortage", "surplus",
    ],
  },
  {
    id: "consumer_producer_surplus",
    name: "Consumer & Producer Surplus",
    theme: "Theme 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S"],
    requiredLabels: ["CS", "PS", "P*", "Q*"],
    commandWords: ["shade", "show", "identify", "calculate"],
    expectedActions: ["shade", "label", "calculate"],
    specKeys: ["consumer_producer_surplus"],
    identificationKeywords: [
      "consumer surplus", "producer surplus", "total surplus",
      "welfare", "allocative efficiency",
    ],
  },
  {
    id: "elasticity",
    name: "Price Elasticity (Demand/Supply)",
    theme: "Theme 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (elastic)", "D (inelastic)", "D (unit elastic)", "S"],
    requiredLabels: ["P", "Q", "PED > 1", "PED < 1"],
    commandWords: ["draw", "show", "compare", "explain"],
    expectedActions: ["draw", "label", "explain"],
    specKeys: ["ped_elastic", "ped_inelastic"],
    identificationKeywords: [
      "elasticity", "elastic", "inelastic", "unit elastic",
      "PED", "PES", "XED", "YED",
    ],
  },
  {
    id: "tax_subsidy",
    name: "Indirect Tax & Subsidy",
    theme: "Theme 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "S + tax", "S + subsidy"],
    requiredLabels: ["P₁", "P₂", "Q₁", "Q₂", "Tax/Subsidy amount"],
    commandWords: ["show", "illustrate", "adapt", "shade"],
    expectedActions: ["draw", "shift", "shade", "calculate"],
    specKeys: ["tax_incidence", "subsidy"],
    identificationKeywords: [
      "tax", "indirect tax", "specific tax", "ad valorem",
      "subsidy", "tax incidence", "deadweight loss",
    ],
  },
  {
    id: "externalities",
    name: "Externalities (Consumption & Production)",
    theme: "Theme 1",
    axes: { x: "Quantity", y: "Benefit / Cost / Price" },
    curveNames: ["MPC", "MSC", "MPB", "MSB"],
    requiredLabels: ["MPC", "MSC", "MPB", "MSB", "Welfare Loss", "Social optimum"],
    commandWords: ["draw", "show", "illustrate", "shade", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: [
      "positive_externality", "negative_externality",
      "negative_production_externality", "positive_production_externality",
    ],
    identificationKeywords: [
      "externality", "external cost", "external benefit",
      "market failure", "welfare loss", "deadweight loss",
      "merit good", "demerit good", "MSC", "MPC", "MSB", "MPB",
      "socially optimal", "overproduction", "underconsumption",
    ],
  },
  {
    id: "price_controls",
    name: "Price Floor & Ceiling",
    theme: "Theme 1",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D", "S", "Pmin", "Pmax"],
    requiredLabels: ["P*", "Pmin/Pmax", "Shortage/Surplus", "Qd", "Qs"],
    commandWords: ["draw", "show", "illustrate", "adapt"],
    expectedActions: ["draw", "label", "shade"],
    specKeys: ["price_floor", "price_ceiling"],
    identificationKeywords: [
      "price floor", "minimum price", "price ceiling", "maximum price",
      "rent control", "minimum wage", "CAP", "buffer stock",
    ],
  },
  {
    id: "cost_curves",
    name: "Cost Curves (SR & LR)",
    theme: "Theme 3",
    axes: { x: "Output (Q)", y: "Costs (£)" },
    curveNames: ["MC", "ATC", "AVC", "AFC", "LRAC"],
    requiredLabels: ["MC", "ATC", "AVC", "AFC/LRAC", "Min ATC", "MES"],
    commandWords: ["draw", "show", "shade", "adapt", "illustrate"],
    expectedActions: ["draw", "label", "shade", "adapt"],
    specKeys: ["cost_curves", "cost_curves_short_run", "lrac"],
    identificationKeywords: [
      "marginal cost", "average cost", "ATC", "AVC", "AFC",
      "total cost", "fixed cost", "variable cost",
      "economies of scale", "diseconomies", "LRAC", "MES",
      "minimum efficient scale", "constant returns",
    ],
  },
  {
    id: "market_structures",
    name: "Market Structures",
    theme: "Theme 3",
    axes: { x: "Output (Q)", y: "Price / Cost / Revenue (£)" },
    curveNames: ["AR", "MR", "MC", "ATC", "AVC"],
    requiredLabels: ["AR", "MR", "MC", "ATC", "Profit max (MC=MR)", "Supernormal profit"],
    commandWords: ["draw", "show", "shade", "adapt", "compare", "evaluate"],
    expectedActions: ["draw", "label", "shade", "explain", "evaluate"],
    specKeys: [
      "monopoly", "perfect_competition", "perfectComp",
      "monopolistic_competition", "monopolistic_competition_sr",
      "monopolistic_competition_lr", "kinked_demand",
    ],
    identificationKeywords: [
      "monopoly", "perfect competition", "monopolistic competition",
      "oligopoly", "price maker", "price taker",
      "supernormal profit", "normal profit", "loss",
      "barriers to entry", "profit maximisation",
      "revenue maximisation", "sales maximisation",
      "shut down", "kinked demand",
    ],
  },
  {
    id: "labour_market",
    name: "Labour Market",
    theme: "Theme 3",
    axes: { x: "Quantity of Labour (L)", y: "Wage Rate (W)" },
    curveNames: ["D = MRP", "S (labour)", "MCL", "ACL"],
    requiredLabels: ["W*", "L*", "DL", "SL"],
    commandWords: ["draw", "show", "illustrate", "adapt"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: [
      "labour_market", "labour_market_minimum_wage",
      "monopsony",
    ],
    identificationKeywords: [
      "labour market", "wage", "employment", "MRP",
      "marginal revenue product", "monopsony",
      "minimum wage", "trade union", "migration",
      "derived demand", "labour supply",
    ],
  },
];

/* ══════════════════════════════════════════════
   MACRO DIAGRAM FAMILIES (shared by A and B)
   ══════════════════════════════════════════════ */

const MACRO_FAMILIES: DiagramFamilyProfile[] = [
  {
    id: "ad_as",
    name: "Aggregate Demand / Aggregate Supply",
    theme: "Theme 2",
    axes: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curveNames: ["AD", "AD₁", "AD₂", "SRAS", "SRAS₁", "SRAS₂", "LRAS"],
    requiredLabels: ["PL", "Y", "AD", "SRAS", "LRAS", "E₁", "E₂", "Yfe"],
    commandWords: ["draw", "show", "illustrate", "adapt", "evaluate"],
    expectedActions: ["draw", "label", "shift", "explain", "evaluate"],
    specKeys: [
      "ad_increase", "ad_decrease", "sras_increase", "sras_decrease",
      "lras_shift", "multiplier_effect", "keynesian_as",
    ],
    identificationKeywords: [
      "aggregate demand", "aggregate supply", "AD", "AS",
      "SRAS", "LRAS", "price level", "real GDP",
      "demand-pull", "cost-push", "stagflation",
      "inflationary gap", "deflationary gap", "output gap",
      "supply-side", "Keynesian", "classical",
    ],
  },
  {
    id: "phillips_curve",
    name: "Phillips Curve",
    theme: "Theme 2",
    axes: { x: "Unemployment Rate (%)", y: "Inflation Rate (%)" },
    curveNames: ["SRPC", "SRPC₁", "SRPC₂", "LRPC"],
    requiredLabels: ["SRPC", "LRPC", "NRU", "π", "U"],
    commandWords: ["draw", "show", "illustrate", "adapt"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["phillips_curve"],
    identificationKeywords: [
      "Phillips curve", "inflation", "unemployment",
      "NAIRU", "NRU", "natural rate", "expectations",
      "trade-off", "stagflation",
    ],
  },
  {
    id: "monetary_policy",
    name: "Monetary Policy Transmission",
    theme: "Theme 2",
    axes: { x: "Real GDP / Money", y: "Interest Rate / Price Level" },
    curveNames: ["MS", "MD", "AD", "AS"],
    requiredLabels: ["Base rate", "AD shift", "PL change"],
    commandWords: ["show", "explain", "illustrate", "adapt"],
    expectedActions: ["draw", "shift", "explain"],
    specKeys: ["crowding_out", "multiplier_effect"],
    identificationKeywords: [
      "monetary policy", "base rate", "interest rate",
      "quantitative easing", "QE", "money supply",
      "forward guidance", "funding for lending",
      "transmission mechanism",
    ],
  },
  {
    id: "exchange_rate",
    name: "Exchange Rate",
    theme: "Theme 4",
    axes: { x: "Quantity of £", y: "Exchange Rate ($/£)" },
    curveNames: ["D£", "S£"],
    requiredLabels: ["e₁", "e₂", "Q₁", "Q₂"],
    commandWords: ["draw", "show", "illustrate", "adapt"],
    expectedActions: ["draw", "label", "shift", "explain"],
    specKeys: ["exchange_rate", "j_curve"],
    identificationKeywords: [
      "exchange rate", "depreciation", "appreciation",
      "hot money", "capital flows", "floating",
      "fixed exchange rate", "Marshall-Lerner", "J-curve",
    ],
  },
  {
    id: "international_trade",
    name: "International Trade (Tariffs, Quotas, Subsidies)",
    theme: "Theme 4",
    axes: { x: "Quantity (Q)", y: "Price (P)" },
    curveNames: ["D (domestic)", "S (domestic)", "S (world)", "S (world + tariff)"],
    requiredLabels: ["Pw", "Pw + tariff", "Q₁-Q₄", "Import volume", "DWL"],
    commandWords: ["draw", "show", "shade", "calculate", "evaluate"],
    expectedActions: ["draw", "label", "shade", "calculate", "evaluate"],
    specKeys: ["tariff", "trade_quota", "trade_subsidy"],
    identificationKeywords: [
      "tariff", "quota", "trade barrier", "protectionism",
      "free trade", "imports", "exports", "world price",
      "domestic supply", "WTO", "comparative advantage",
    ],
  },
  {
    id: "development",
    name: "Development & Inequality",
    theme: "Theme 4",
    axes: { x: "Various", y: "Various" },
    curveNames: ["Lorenz", "AD", "AS"],
    requiredLabels: ["Gini coefficient", "Line of equality"],
    commandWords: ["draw", "show", "explain", "evaluate"],
    expectedActions: ["draw", "label", "explain", "evaluate"],
    specKeys: ["lorenz_curve"],
    identificationKeywords: [
      "Lorenz curve", "Gini", "inequality", "poverty",
      "HDI", "development", "Harrod-Domar",
      "primary products", "commodity prices",
      "capital flight",
    ],
  },
];

/* ══════════════════════════════════════════════
   EDEXCEL A BOARD PROFILE
   ══════════════════════════════════════════════ */

export const EDEXCEL_A_PROFILE: BoardProfile = {
  boardId: "edexcel_a",
  boardName: "Edexcel A Economics (9EC0)",
  papers: [
    {
      paper: "Paper 1: Markets and Business Behaviour",
      themes: ["Theme 1", "Theme 3"],
      marks: 100,
      duration: "2 hours",
      sections: ["Section A: Short answers & MCQ (25 marks)", "Section B: Data response (50 marks)", "Section C: Essay (25 marks)"],
    },
    {
      paper: "Paper 2: The National and Global Economy",
      themes: ["Theme 2", "Theme 4"],
      marks: 100,
      duration: "2 hours",
      sections: ["Section A: Short answers & MCQ (25 marks)", "Section B: Data response (50 marks)", "Section C: Essay (25 marks)"],
    },
    {
      paper: "Paper 3: Microeconomics and Macroeconomics",
      themes: ["Theme 1", "Theme 2", "Theme 3", "Theme 4"],
      marks: 100,
      duration: "2 hours",
      sections: ["Section A: Data response + essay (50 marks)", "Section B: Data response + essay (50 marks)"],
    },
  ],
  diagramFamilies: [...MICRO_FAMILIES, ...MACRO_FAMILIES],
  terminology: {
    "aggregate supply": "SRAS / LRAS",
    "equilibrium": "E₁, E₂",
    "welfare loss": "Deadweight loss / Welfare loss triangle",
    "profit": "Supernormal profit / Normal profit / Subnormal profit",
    "shutdown": "AR < AVC (short run), AR < ATC (long run)",
    "efficiency": "Allocative (P=MC), Productive (min ATC), Dynamic, X-efficiency",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B", "Section C"],
  },
};

/* ══════════════════════════════════════════════
   EDEXCEL B BOARD PROFILE
   ══════════════════════════════════════════════ */

export const EDEXCEL_B_PROFILE: BoardProfile = {
  boardId: "edexcel_b",
  boardName: "Edexcel B Economics (9EB0)",
  papers: [
    {
      paper: "Paper 1: Markets, Consumers and Firms",
      themes: ["Theme 1", "Theme 2"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Supported multiple choice (20 marks)", "Section B: Data response (40 marks)", "Section C: Extended open response (20 marks)"],
    },
    {
      paper: "Paper 2: The Wider Economic Environment",
      themes: ["Theme 3", "Theme 4"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Supported multiple choice (20 marks)", "Section B: Data response (40 marks)", "Section C: Extended open response (20 marks)"],
    },
    {
      paper: "Paper 3: The Economic Environment and Business",
      themes: ["Theme 1", "Theme 2", "Theme 3", "Theme 4"],
      marks: 80,
      duration: "2 hours",
      sections: ["Section A: Data response", "Section B: Data response"],
    },
  ],
  diagramFamilies: [...MICRO_FAMILIES, ...MACRO_FAMILIES],
  terminology: {
    "aggregate supply": "SRAS / LRAS",
    "equilibrium": "E, E₁, E₂",
    "welfare loss": "Welfare loss",
    "profit": "Supernormal profit / Normal profit",
    "shutdown": "P < AVC (short run)",
    "efficiency": "Allocative, Productive, Dynamic",
  },
  paperFormatting: {
    extractLabel: "Extract",
    figureLabel: "Figure",
    sectionLabels: ["Section A", "Section B", "Section C"],
  },
};

import { OCR_ALEVEL_PROFILE, OCR_AS_PROFILE } from "@/data/ocrBoardProfile";

/** All board profiles indexed by board id */
export const BOARD_PROFILES: Record<string, BoardProfile> = {
  edexcel_a: EDEXCEL_A_PROFILE,
  edexcel_b: EDEXCEL_B_PROFILE,
  ocr_alevel: OCR_ALEVEL_PROFILE,
  ocr_as: OCR_AS_PROFILE,
};

/**
 * Given a snippet of text, find the most likely diagram family.
 * Returns the best-matching family profile or null.
 */
export function identifyDiagramFamily(
  text: string,
  boardId: "edexcel_a" | "edexcel_b" = "edexcel_a"
): DiagramFamilyProfile | null {
  const profile = BOARD_PROFILES[boardId];
  if (!profile) return null;

  const lower = text.toLowerCase();
  let bestMatch: DiagramFamilyProfile | null = null;
  let bestScore = 0;

  for (const family of profile.diagramFamilies) {
    let score = 0;
    for (const kw of family.identificationKeywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.length; // longer keywords = more specific match
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = family;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

/**
 * Get all diagram spec keys for a given board profile.
 */
export function getAllSpecKeys(boardId: "edexcel_a" | "edexcel_b" = "edexcel_a"): string[] {
  const profile = BOARD_PROFILES[boardId];
  if (!profile) return [];
  const keys = new Set<string>();
  for (const family of profile.diagramFamilies) {
    for (const key of family.specKeys) {
      keys.add(key);
    }
  }
  return Array.from(keys);
}
