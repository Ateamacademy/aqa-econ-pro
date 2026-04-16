export interface OcrGcseTopic {
  slug: string;
  board: "OCR-GCSE";
  tier: "Foundation" | "Higher";
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

export const ocrGcseTopics: OcrGcseTopic[] = [
  {
    slug: "ocr-blueberries-demand",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Demand",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "Renewed medical research in the UK has highlighted the significant health benefits of consuming blueberries, leading to a surge in popularity among health-conscious consumers. Prior to this research, the blueberry market was in equilibrium.",
    question:
      "Using the information provided, draw and annotate a demand and supply diagram to show the effects of this new medical research on the equilibrium price and equilibrium quantity of blueberries.",
    figureFile: "/figures/ocr-blueberries-demand.svg",
    explanation:
      "Positive health news changes consumer tastes/preferences. Consumers now want more blueberries at every price level — D shifts right (D₁ → D₂). At the old price there is now excess demand; prices rise. Equilibrium price rises (P₁ → P₂) and equilibrium quantity rises (Q₁ → Q₂). UK blueberry sales grew by over 130% between 2012 and 2022 as health-focused media coverage labelled them a 'superfood'.",
    keyTerms: ["equilibrium", "shift in demand", "tastes & preferences", "excess demand"],
    diagramRequirements: [
      { requirement: "Draw a demand and supply diagram with correctly labelled axes", marks: 1 },
      { requirement: "Show the demand curve shifting to the right (D₁ → D₂)", marks: 1 },
      { requirement: "Label the new equilibrium price (P₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Explain why the demand curve shifted (health research → tastes)", marks: 1 },
    ],
    scenarioVariant: "UK Blueberries — Health Research Drives Demand",
  },
  {
    slug: "ocr-ev-automation",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Supply",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "Renewable energy technology has advanced rapidly in the UK. Many car manufacturers have invested in new automated production lines, which significantly reduces the cost of production for each electric vehicle (EV) built.",
    question:
      "Using a supply and demand diagram, show the effect of lower production costs on the equilibrium price and quantity of electric vehicles.",
    figureFile: "/figures/ocr-ev-automation.svg",
    explanation:
      "Automation reduces the unit cost of producing each EV. Firms are now willing to supply more at every price level — S shifts right (S₁ → S₂). At the old price there is excess supply; prices fall. New equilibrium: LOWER price (P₁ → P₂) and HIGHER quantity (Q₁ → Q₂). Tesla's Gigafactories use heavy automation to cut per-unit labour costs — a key reason real EV prices have fallen around 20% since 2018.",
    keyTerms: ["cost of production", "technology", "shift in supply", "equilibrium"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram with correctly labelled axes", marks: 1 },
      { requirement: "Show the supply curve shifting to the right (S₁ → S₂)", marks: 1 },
      { requirement: "Label the new equilibrium price (P₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Explain why the supply curve shifted (automation → lower costs)", marks: 1 },
    ],
    scenarioVariant: "UK EV Automation — Lower Costs of Production",
  },
  {
    slug: "ocr-uk-confidence-rise",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "AD/AS — Demand-Side Shock",
    marks: 4,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "The UK economy experiences a significant increase in consumer confidence due to rising house prices and a fall in unemployment. As a result, households decide to increase their spending on goods and services.",
    question:
      "Using AD/AS, draw and annotate a diagram to show the effect of this increase in consumer spending on Real GDP and the Price Level, and briefly explain one reason the AD curve shifted.",
    figureFile: "/figures/ocr-confidence-rises.svg",
    explanation:
      "Rising house prices create a 'wealth effect' — households feel richer and spend more. Falling unemployment removes fear of income loss, further boosting Consumption (C). Higher C is a component of AD, so AD shifts RIGHT (AD₁ → AD₂). New equilibrium: Real GDP rises (Y₁ → Y₂) AND the Price Level rises (P₁ → P₂). UK household spending rose sharply in 2013–2015 following house price recovery and falling unemployment.",
    keyTerms: ["aggregate demand (AD)", "consumer confidence", "real GDP", "price level"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with initial equilibrium at P₁, Y₁", marks: 1 },
      { requirement: "Shift AD to the right (AD₁ → AD₂)", marks: 1 },
      { requirement: "Label new equilibrium (P₂, Y₂)", marks: 1 },
      { requirement: "Explain the mechanism (rising house prices → wealth effect → higher C)", marks: 1 },
    ],
    scenarioVariant: "UK Consumer Confidence Rises — Demand-Side Shock",
  },
  {
    slug: "ocr-uk-energy-shock",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "AD/AS — Supply-Side Shock",
    marks: 4,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "In 2022, the UK experienced a significant energy price shock due to global instability. This led to a massive increase in electricity and gas prices for UK manufacturers and service providers.",
    question:
      "Using an AD/AS diagram, show the effect of this energy price increase on the UK's general price level and Real GDP. Label initial and new equilibria and explain the macroeconomic impact.",
    figureFile: "/figures/ocr-uk-energy-shock.svg",
    explanation:
      "Higher energy prices raise firms' production costs across the economy. Firms supply less at every price level — SRAS shifts LEFT (SRAS₁ → SRAS₂). Price Level RISES (P₁ → P₂) — this is cost-push inflation. Real GDP FALLS (Y₁ → Y₂) — a slowdown in economic growth, with rising unemployment risk. UK inflation reached a 40-year high of 11.1% in 2022, largely driven by the post-Ukraine-invasion energy shock.",
    keyTerms: ["aggregate supply (AS)", "cost-push inflation", "SRAS", "stagflation"],
    diagramRequirements: [
      { requirement: "Draw an AD/SRAS diagram with initial equilibrium (Y₁, P₁)", marks: 1 },
      { requirement: "Shift SRAS to the LEFT (SRAS₁ → SRAS₂)", marks: 1 },
      { requirement: "Label new equilibrium (Y₂, P₂)", marks: 1 },
      { requirement: "Explain impact on inflation, growth, and unemployment", marks: 1 },
    ],
    scenarioVariant: "UK 2022 Energy Crisis — Supply-Side Shock",
  },
  {
    slug: "ocr-uk-investment",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "AD/AS — Economic Growth (LRAS Shift)",
    marks: 4,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "The UK government announces a £20 billion investment fund dedicated to upgrading national broadband infrastructure and providing advanced technical training for workers in the manufacturing sector.",
    question:
      "Using an AD/AS diagram, show the effect of this industrial investment on the UK's LRAS and the resulting impact on Real GDP.",
    figureFile: "/figures/ocr-uk-investment.svg",
    explanation:
      "Better broadband allows firms to communicate faster and adopt digital tools — capital productivity rises. Technical training raises human capital — workers are more productive per hour. Together these increase the economy's productive capacity — LRAS shifts RIGHT (LRAS₁ → LRAS₂). Result: higher potential Real GDP (Y → Y₁) with a LOWER price level if AD is unchanged. South Korea's sustained investment in education and digital infrastructure is a classic example of supply-side policies driving long-run LRAS outward.",
    keyTerms: ["LRAS", "productive capacity", "capital investment", "human capital"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with LRAS₁ and initial equilibrium", marks: 1 },
      { requirement: "Shift LRAS to the right (LRAS₁ → LRAS₂)", marks: 1 },
      { requirement: "Show change in full employment output (Y → Y₁)", marks: 1 },
      { requirement: "Explain how infrastructure and training cause the shift", marks: 1 },
    ],
    scenarioVariant: "UK Broadband + Training Investment — Long-Run Growth",
  },
  {
    slug: "ocr-uk-hospitality",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "Labour Market — Wage Determination",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario:
      "The UK hospitality industry (hotels and restaurants) has experienced a significant increase in the demand for labour following a rise in consumer spending on leisure activities. The supply of labour has remained constant.",
    question:
      "Using a labour market diagram, show the effect of an increase in the demand for labour on the equilibrium wage rate and the quantity of labour employed in hospitality.",
    figureFile: "/figures/ocr-uk-hospitality.svg",
    explanation:
      "Rising consumer leisure spending means more demand for meals, hotel stays, and bar service. Hospitality firms need more workers to meet this demand — labour demand shifts RIGHT (D₁ → D₂). At the original wage W₁, there is now a shortage of hospitality workers. Employers bid up wages (extension along supply) until the new equilibrium at W₂ and Q₂. After the 2021 UK reopening following COVID restrictions, hospitality pay rose by nearly 15% year-on-year in 2022.",
    keyTerms: ["demand for labour", "supply of labour", "equilibrium wage", "derived demand"],
    diagramRequirements: [
      { requirement: "Draw a labour market diagram with wage on y-axis and quantity on x-axis", marks: 1 },
      { requirement: "Shift the demand for labour to the right (D₁ → D₂)", marks: 1 },
      { requirement: "Label the new equilibrium wage (W₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Explain the mechanism (↑ leisure spending → ↑ labour demand → ↑W, ↑Q)", marks: 1 },
    ],
    scenarioVariant: "UK Hospitality — Post-COVID Labour Demand Surge",
  },
];
