export interface EduqasTopic {
  slug: string;
  board: "Eduqas";
  tier: "Foundation" | "Intermediate" | "Advanced";
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

export const eduqasTopics: EduqasTopic[] = [
  {
    slug: "eduqas-indirect-tax-sdil",
    board: "Eduqas",
    tier: "Advanced",
    section: "Microeconomics",
    marks: 8,
    title: "Indirect Tax (Ad Valorem / Specific)",
    scenario:
      "In 2018 the UK government implemented the Soft Drinks Industry Levy (SDIL) — a SPECIFIC indirect tax of £0.24 per litre on drinks containing ≥8g sugar per 100ml — to reduce consumption of high-sugar beverages and combat obesity and Type 2 diabetes. Many manufacturers reformulated to avoid the tax; for those that didn't, prices rose and sales volumes for high-sugar drinks fell significantly.",
    question:
      "Using an appropriate diagram, explain how the imposition of a specific tax on sugar-sweetened beverages affects equilibrium price and quantity, and illustrate the resulting tax incidence on both consumers and producers. Your answer must:\n1. Show the supply-curve shift caused by the tax (S1 → S2).\n2. Identify the new equilibrium and changes to price and quantity.\n3. Highlight the consumer burden area.\n4. Highlight the producer burden area.\n5. Reference how PED affects the split.",
    figureFile: "/figures/eduqas-indirect-tax-sdil.svg",
    explanation:
      "A specific indirect tax raises producers' marginal cost by a FIXED AMOUNT per unit, shifting supply VERTICALLY UPWARDS by the exact tax amount (S1 → S2). Initial equilibrium at (P1, Q1) where S1 = D. New equilibrium at (P2, Q2) where S2 = D, with P2 > P1 and Q2 < Q1. The consumer pays P2; the producer keeps P3 per unit AFTER tax (P3 < P1), where P3 is read off the original S1 curve at Q2. Tax per unit = P2 − P3 (vertical distance between the supply curves). CONSUMER BURDEN = (P2 − P1) × Q2 — the rectangle between P2 and P1 across 0 → Q2. PRODUCER BURDEN = (P1 − P3) × Q2 — the rectangle between P1 and P3 across 0 → Q2. TOTAL GOVERNMENT TAX REVENUE = consumer burden + producer burden = tax per unit × Q2. The SPLIT depends on RELATIVE elasticities: when DEMAND is INELASTIC (as for high-sugar drinks — habit and limited substitutes), consumers bear the LARGER share because they're unresponsive to price; producers can pass most of the tax through. Real-world evidence: SDIL caused widespread reformulation (avoiding the tax) AND for un-reformulated drinks, retail prices rose substantially with limited sales-volume drop — confirming consumer-borne burden under inelastic demand. WELFARE LOSS triangle to the right of Q2 represents allocative inefficiency from reduced trade — but is justified IF the negative consumption externalities (NHS costs, lost productivity) exceed this triangle.",
    keyTerms: [
      "specific tax",
      "ad valorem tax",
      "indirect tax",
      "tax incidence",
      "consumer burden",
      "producer burden",
      "tax revenue",
      "PED",
      "price inelastic",
      "supply shift",
      "Soft Drinks Industry Levy",
    ],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "Original supply S1 and demand D drawn with initial equilibrium P1, Q1", marks: 1 },
      { requirement: "S1 shifts VERTICALLY UP to S2 by tax amount; both supply curves labelled with tax distance visible as a vertical bracket", marks: 1 },
      { requirement: "New equilibrium A at (P2, Q2) on S2 and D; P2 > P1 and Q2 < Q1 clearly marked", marks: 1 },
      { requirement: "Producer net price P3 (on original S1 at Q2) marked; reference points A, B, C labelled", marks: 1 },
      { requirement: "Consumer burden rectangle (P1-P2-A-B) AND Producer burden rectangle (P1-P3-C-B) clearly shaded/labelled", marks: 2 },
      { requirement: "Written explanation links the burden split to inelastic PED for sugary drinks AND identifies total tax revenue = tax × Q2", marks: 1 },
    ],
  },
];
