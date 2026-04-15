export interface GcseTopic {
  slug: string;
  board: "AQA";
  tier: "Foundation" | "Intermediate" | "Higher";
  section: string;
  marks: number;
  title: string;
  scenario: string;
  question: string;
  figureFile: string;
  explanation: string;
  keyTerms: string[];
  diagramRequirements: { requirement: string; marks: number }[];
  scenarioVariant?: string;
}

export const gcseTopics: GcseTopic[] = [
  // ── Higher (9 marks) ──────────────────────────────────────
  {
    slug: "gcse-indirect-tax-sdil",
    board: "AQA",
    tier: "Higher",
    section: "Government Intervention",
    marks: 9,
    title: "Indirect Tax (Ad Valorem / Specific)",
    scenario:
      "In 2018, the UK government introduced the Soft Drinks Industry Levy (often called the 'Sugar Tax'). This was an indirect tax aimed at reducing the consumption of high-sugar beverages to tackle rising rates of obesity and Type 2 diabetes. Prior to the tax, the market for a typical high-sugar soda was in equilibrium. Following the intervention, producers faced higher costs of production for every unit sold containing more than 5g of sugar per 100ml.",
    question:
      "Draw and annotate a supply and demand diagram to show the effect of an indirect tax on the market for sugary soft drinks. Using your diagram, explain how the tax affects the equilibrium price, the quantity traded, and the distribution of the tax burden between consumers and producers.",
    figureFile: "/figures/gcse-indirect-tax-sdil.svg",
    explanation:
      "An ad valorem tax raises producers' marginal costs by a fixed percentage, pivoting the supply curve up from the origin (S → S + tax). The new equilibrium sits at a higher price (P2) and lower quantity (Q2). At Q2, consumers pay P2 while producers retain only P_prod after handing the tax to government — the vertical gap is the tax wedge per unit. Total tax revenue (yellow rectangle) = tax wedge × Q2. The consumer incidence is P2 − P1 (the price rise above the original); the producer incidence is P1 − P_prod (the revenue lost per unit). The split between the two depends on the relative price elasticities of demand and supply: the more inelastic side bears more of the burden. A specific (per-unit) tax would shift S parallel rather than pivoting it, but the analysis of incidence is the same.",
    keyTerms: [
      "indirect tax",
      "ad valorem tax",
      "specific tax",
      "tax incidence",
      "tax wedge",
    ],
    diagramRequirements: [
      { requirement: "Correctly labelled diagram showing S → S + tax shift and new equilibrium", marks: 3 },
      { requirement: "Step-by-step explanation of how the tax raises costs, higher price, lower quantity", marks: 3 },
      { requirement: "Identification of tax wedge and discussion of consumer/producer burden split", marks: 3 },
    ],
    scenarioVariant: "UK Soft Drinks Industry Levy (Sugar Tax)",
  },
];
