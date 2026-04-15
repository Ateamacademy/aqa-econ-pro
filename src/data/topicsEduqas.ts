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
  // ── Foundation (4 marks) ──────────────────────────────────────
  {
    slug: "eduqas-sd-demand-evs",
    board: "Eduqas",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario: "The UK government has recently announced a significant increase in the subsidy available for consumers purchasing new electric vehicles (EVs). At the same time, high-profile marketing campaigns and rising environmental awareness have led to a shift in consumer tastes and preferences towards greener transport options. You should consider how these factors combined would impact the market for electric vehicles.",
    question: "Using a supply and demand diagram, explain the effect of both the increased subsidy and the change in consumer preferences on the equilibrium price and quantity of electric vehicles in the UK.",
    figureFile: "/figures/eduqas-sd-demand-evs.svg",
    explanation: "Both the subsidy and the change in consumer preferences raise willingness to buy at every price, shifting demand right from D1 to D2. Supply is unchanged. The new equilibrium (P2, Q2) sits at a higher price and higher quantity than the original (P1, Q1) — the rationing function of price moves the market to a new clearing point.",
    keyTerms: ["subsidy", "equilibrium", "demand shift", "consumer preferences", "price mechanism"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "S (upward) and D1 (downward) with initial equilibrium P1, Q1", marks: 1 },
      { requirement: "D shifts RIGHT to D2; new equilibrium P2 > P1, Q2 > Q1 marked", marks: 1 },
      { requirement: "Written explanation of the adjustment process", marks: 1 },
    ],
  },
  {
    slug: "eduqas-sd-supply-coffee",
    board: "Eduqas",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario: "In 2024, extreme weather events in Brazil, the world's largest producer of Arabica coffee, led to significant crop failures and damage to agricultural infrastructure. At the same time, the cost of nitrogen-based fertilisers — a key input for coffee farmers — rose by 15% due to global supply chain disruptions.",
    question: "Using a supply and demand diagram, explain the effect of these supply-side shocks on the equilibrium price and quantity of coffee.",
    figureFile: "/figures/eduqas-sd-supply-coffee.svg",
    explanation: "Crop failures cut productive capacity and higher fertiliser costs raise marginal costs of production, so less coffee is supplied at every price. Supply shifts left from S1 to S2. With demand unchanged, the new equilibrium (P2, Q2) shows a higher price and a lower quantity traded.",
    keyTerms: ["supply shock", "marginal cost", "productive capacity", "equilibrium"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "D (downward) and S1 (upward) with initial equilibrium P1, Q1", marks: 1 },
      { requirement: "S shifts LEFT to S2; new equilibrium P2 > P1, Q2 < Q1 marked", marks: 1 },
      { requirement: "Written explanation of the reasoning behind the change", marks: 1 },
    ],
  },
  {
    slug: "eduqas-adas-demand-shock",
    board: "Eduqas",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Demand Shock",
    scenario: "Between 2022 and 2023, the UK economy experienced a significant 'cost of living crisis.' Rapidly rising energy prices and high interest rates caused Consumer Confidence to plummet. Households significantly reduced their discretionary spending, leading to a sharp reduction in total consumption across the economy.",
    question: "Using an AD/AS diagram, illustrate and explain the impact of this fall in consumer confidence on the UK's high-level macroeconomic equilibrium.",
    figureFile: "/figures/eduqas-adas-demand-shock.svg",
    explanation: "A fall in consumer confidence reduces consumption (C), the largest component of AD = C + I + G + (X − M). AD shifts left from AD1 to AD2. The new equilibrium with SRAS gives a lower price level (P2) and lower real output (Y2), opening a negative output gap below LRAS and raising the likelihood of cyclical unemployment.",
    keyTerms: ["aggregate demand", "consumer confidence", "negative output gap", "cyclical unemployment"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real GDP", marks: 1 },
      { requirement: "AD1 intersects SRAS at initial equilibrium P1, Y1; LRAS shown", marks: 1 },
      { requirement: "AD shifts LEFT to AD2; new equilibrium P2 < P1, Y2 < Y1", marks: 1 },
      { requirement: "Written explanation of negative output gap and unemployment risk", marks: 1 },
    ],
  },
  {
    slug: "eduqas-adas-supply-shock",
    board: "Eduqas",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Supply Shock",
    scenario: "Since 2022, the UK has experienced a significant increase in the price of imported natural gas and electricity. These inputs are used extensively by UK firms in manufacturing and service delivery. This increase in commodity prices represents a significant increase in the costs of production for businesses across the domestic economy.",
    question: "Using an AD/AS diagram, explain the likely impact of rising energy prices on the UK's high-level macroeconomic objectives, specifically Real GDP and the Price Level.",
    figureFile: "/figures/eduqas-adas-supply-shock.svg",
    explanation: "Higher imported energy costs raise firms' marginal costs of production. SRAS shifts left from SRAS1 to SRAS2. With AD unchanged, the new equilibrium has a higher price level (P2) and lower real output (Y2) — a classic stagflationary outcome combining cost-push inflation with falling real GDP.",
    keyTerms: ["SRAS", "cost-push inflation", "stagflation", "marginal cost"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real GDP", marks: 1 },
      { requirement: "AD and SRAS1 with initial equilibrium; LRAS shown", marks: 1 },
      { requirement: "SRAS shifts LEFT to SRAS2; new equilibrium P2 > P1, Y2 < Y1", marks: 1 },
      { requirement: "Written explanation of stagflation outcome", marks: 1 },
    ],
  },
  {
    slug: "eduqas-adas-long-run-growth",
    board: "Eduqas",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Long-Run Growth",
    scenario: "The Welsh Government has recently intensified its focus on the 'Innovation Strategy for Wales', aiming to increase investment in Research and Development (R&D) and high-tech manufacturing. By increasing the quantity and quality of capital goods and improving labour productivity through skills training, the economy aims to increase its productive capacity over the long term.",
    question: "Using a Production Possibility Frontier (PPF) diagram, explain how an increase in investment in R&D and worker training can lead to long-run economic growth for the Welsh economy.",
    figureFile: "/figures/eduqas-adas-long-run-growth.svg",
    explanation: "R&D investment raises the quantity and quality of capital, while skills training increases labour productivity. Both expand the economy's productive capacity, shifting the PPF outward from PPF1 to PPF2. Combinations of consumer and capital goods that were previously unattainable are now achievable — the definition of long-run economic growth.",
    keyTerms: ["PPF", "long-run growth", "labour productivity", "productive capacity"],
    diagramRequirements: [
      { requirement: "Axes labelled Consumer Goods and Capital Goods", marks: 1 },
      { requirement: "PPF1 drawn as concave curve", marks: 1 },
      { requirement: "PPF shifts OUTWARD to PPF2", marks: 1 },
      { requirement: "Written explanation linking R&D/training to productive potential", marks: 1 },
    ],
  },
  {
    slug: "eduqas-labour-hospitality",
    board: "Eduqas",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario: "In 2024, the UK hospitality industry faced a significant labour shortage as the number of available workers fell while the demand for restaurant and hotel services surged. You must show how this change in the labour market affects the equilibrium wage rate and the quantity of labour employed in this specific sector.",
    question: "Using a labour market diagram, illustrate a decrease in the supply of labour within the hospitality sector.",
    figureFile: "/figures/eduqas-labour-hospitality.svg",
    explanation: "The fall in available workers reduces the supply of labour at every wage, shifting S1 to S2. Demand for labour (the MRP curve) is unchanged. The new equilibrium occurs at a higher wage rate (W2) and a lower quantity of labour employed (L2) — firms must pay more to attract scarce workers, and some demand for labour goes unfilled.",
    keyTerms: ["MRP", "equilibrium wage", "labour shortage", "labour supply"],
    diagramRequirements: [
      { requirement: "Axes labelled Wage Rate (W) and Quantity of Labour (L)", marks: 1 },
      { requirement: "D = MRP (downward) and S1 (upward) with initial equilibrium W1, L1", marks: 1 },
      { requirement: "S shifts LEFT to S2; new equilibrium W2 > W1, L2 < L1", marks: 1 },
      { requirement: "Written explanation of the wage and employment change", marks: 1 },
    ],
  },
  // ── Advanced (8 marks) ────────────────────────────────────────
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
