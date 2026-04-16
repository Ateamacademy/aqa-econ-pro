export interface EdexcelIgcseTopic {
  slug: string;
  board: "Edexcel-IGCSE";
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

export const edexcelIgcseTopics: EdexcelIgcseTopic[] = [
  {
    slug: "edxig-demand-shift-ev",
    board: "Edexcel-IGCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Demand",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "Norway has seen a significant increase in the popularity of Electric Vehicles (EVs). In 2023, the Norwegian government increased subsidies for EV buyers while simultaneously raising taxes on petrol-powered cars. At the same time, average real disposable incomes in Norway rose by 3.2%.",
    question:
      "Using a demand and supply diagram, analyse the effect of the increase in incomes and the rising cost of petrol cars on the equilibrium price and quantity of Electric Vehicles in Norway.",
    figureFile: "/figures/edxig-demand-shift-ev.svg",
    explanation:
      "An increase in disposable income makes EVs more affordable (EVs are a normal good). As petrol cars (substitutes) become more expensive due to taxes, consumers switch to EVs. These factors cause the demand curve for EVs to shift to the right (D₁ → D₂). The rightward shift creates a shortage at the original price, forcing equilibrium price and quantity to rise (P₁→P₂, Q₁→Q₂). In Norway (2023), policy incentives and high income levels resulted in EVs capturing an 82% share of all new car sales.",
    keyTerms: ["disposable income", "substitutes", "shift in demand", "equilibrium", "normal good"],
    diagramRequirements: [
      { requirement: "Draw a demand and supply diagram with correctly labelled axes", marks: 1 },
      { requirement: "Show the demand curve shifting to the right (D₁ → D₂)", marks: 1 },
      { requirement: "Label the original (P₁, Q₁) and new (P₂, Q₂) equilibrium positions", marks: 1 },
      { requirement: "Explain the reasons for the shift (income rise + substitute effect)", marks: 1 },
    ],
    scenarioVariant: "Electric Vehicles in Norway — Rising Incomes & Substitute Effect",
  },
  {
    slug: "edxig-supply-shift-coffee",
    board: "Edexcel-IGCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Supply",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "A prolonged period of severe drought and unexpected frosts in Brazil has significantly damaged the world's largest coffee plantations. This event has led to a substantial increase in the global price of raw coffee beans, a major input for coffee roasting firms.",
    question:
      "Draw a supply and demand diagram to show the effect of this increase in the cost of production on the market for roasted coffee beans. You must annotate your diagram to show the change in equilibrium price and quantity, and briefly explain the reasoning for your shifts.",
    figureFile: "/figures/edxig-supply-shift-coffee.svg",
    explanation:
      "The increase in raw bean prices represents an increase in the cost of production for roasters. At any given price, firms are less willing/able to supply — the supply curve shifts left (S₁ → S₂). The shift creates a shortage at the original price, causing equilibrium price to rise. As price rises, the quantity demanded contracts, leading to a lower final equilibrium quantity. In 2021, coffee prices surged by nearly 70% after extreme weather in Brazil destroyed crops.",
    keyTerms: ["cost of production", "supply shift", "equilibrium price", "annotate"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram for roasted coffee beans", marks: 1 },
      { requirement: "Shift the supply curve to the left (S₁ → S₂)", marks: 1 },
      { requirement: "Annotate the new equilibrium price (P₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Briefly explain the reasoning for the shift", marks: 1 },
    ],
    scenarioVariant: "Coffee Beans after Brazil Frost — Rising Costs of Production",
  },
  {
    slug: "edxig-ad-shock-uk",
    board: "Edexcel-IGCSE",
    tier: "Foundation",
    section: "AD/AS — Demand-Side Shock",
    marks: 4,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "In 2024, a major trading partner of the UK enters a deep recession. This leads to widespread fears of job losses among domestic households, causing consumer confidence to fall sharply. As a result, households increase their savings and reduce their spending on luxury items and durable goods.",
    question:
      "Draw and annotate an Aggregate Demand/Aggregate Supply (AD/AS) diagram to show the effect of this fall in consumer confidence on the equilibrium level of Real GDP and the price level. Explain your diagram.",
    figureFile: "/figures/edxig-ad-shock-uk.svg",
    explanation:
      "A fall in consumer confidence reduces Consumption (C), a major component of AD (AD = C + I + G + (X − M)). AD shifts to the left (inwards) from AD₁ to AD₂. The new equilibrium shows a lower Price Level (P₂) and lower Real GDP (Y₂) — a slowdown in economic growth. In 2020, during the initial stages of the COVID-19 pandemic, extreme uncertainty caused consumer spending to collapse, shifting AD left and leading to significant contraction in national output.",
    keyTerms: ["aggregate demand (AD)", "real GDP", "price level", "consumption (C)"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with initial equilibrium at P₁, Y₁", marks: 1 },
      { requirement: "Show AD shifting to the left (AD₁ → AD₂)", marks: 1 },
      { requirement: "Label the new equilibrium (P₂, Y₂)", marks: 1 },
      { requirement: "Explain the mechanism (↓C → ↓AD → ↓Y, ↓PL)", marks: 1 },
    ],
    scenarioVariant: "UK Consumer Confidence Fall — Demand-Side Shock",
  },
  {
    slug: "edxig-sras-shock-nigeria",
    board: "Edexcel-IGCSE",
    tier: "Foundation",
    section: "AD/AS — Supply-Side Shock",
    marks: 4,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "The economy of Nigeria is heavily dependent on imported refined petroleum. A sudden disruption in global shipment routes leads to a 40% increase in the prices of fuel and energy for all Nigerian manufacturers.",
    question:
      "Using an AD/AS diagram, analyse the effect of this increase in energy prices on the equilibrium level of Real GDP and the Price Level in Nigeria.",
    figureFile: "/figures/edxig-sras-shock-nigeria.svg",
    explanation:
      "A sudden increase in energy prices raises transport and production costs for almost all firms. Firms respond by reducing production or raising prices to maintain profit margins. SRAS shifts to the left (SRAS₁ → SRAS₂). The new equilibrium shows a higher price level (P₂) and lower Real GDP (Y₂) — stagflation risk. In 2022, the UK experienced a significant supply-side shock as global natural gas prices soared, contributing to inflation rising above 10%.",
    keyTerms: ["aggregate supply (AS)", "cost-push inflation", "real GDP", "macroeconomic equilibrium"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with initial equilibrium at P₁, Y₁", marks: 1 },
      { requirement: "Show SRAS shifting to the left (SRAS₁ → SRAS₂)", marks: 1 },
      { requirement: "Label the new equilibrium (P₂, Y₂)", marks: 1 },
      { requirement: "Explain the impact: higher prices and lower output", marks: 1 },
    ],
    scenarioVariant: "Nigeria Fuel Price Surge — Supply-Side Shock",
  },
  {
    slug: "edxig-lras-shift-malaysia",
    board: "Edexcel-IGCSE",
    tier: "Foundation",
    section: "AD/AS — Economic Growth (LRAS Shift)",
    marks: 4,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "The government of Malaysia has recently invested $5 billion into a nationwide 'Digital Infrastructure Transformation' project. This initiative aims to provide high-speed internet and modern computing equipment to all schools and vocational training centres to improve the skills of the future labour force.",
    question:
      "Using an AD/AS diagram, analyse the effect of this investment on Malaysia's long-run economic growth.",
    figureFile: "/figures/edxig-lras-shift-malaysia.svg",
    explanation:
      "Investment in training and digital infrastructure improves the quality of labour and capital. This raises the economy's productive capacity — LRAS shifts right (LRAS₁ → LRAS₂). At the new long-run equilibrium, Real GDP is higher (Y₁ → Y₂). With AD unchanged, the price level typically falls (P₁ → P₂), showing non-inflationary growth. South Korea's sustained investment in education and R&D since the 1970s is a classic example of LRAS-driven long-run growth.",
    keyTerms: ["LRAS", "productive capacity", "investment", "non-inflationary growth"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with LRAS₁ and initial equilibrium", marks: 1 },
      { requirement: "Show LRAS shifting to the right (LRAS₁ → LRAS₂)", marks: 1 },
      { requirement: "Label the new equilibrium Real GDP (Y₂) and Price Level (P₂)", marks: 1 },
      { requirement: "Explain how investment leads to increased productive capacity", marks: 1 },
    ],
    scenarioVariant: "Malaysia Digital Infrastructure — Long-Run Growth",
  },
  {
    slug: "edxig-labour-tech",
    board: "Edexcel-IGCSE",
    tier: "Foundation",
    section: "Labour Market — Wage Determination",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario:
      "The demand for software engineers has risen significantly across the global economy as more firms invest in digital transformation and artificial intelligence.",
    question:
      "Using a demand and supply diagram for labour, show the effect of this increase in demand on the equilibrium wage rate and the equilibrium quantity of software engineers employed. Annotate your diagram and provide a brief explanation of the changes shown.",
    figureFile: "/figures/edxig-labour-tech.svg",
    explanation:
      "Digital transformation raises the value of software engineers' output — the MRP of engineers rises. The demand-for-labour curve shifts right (D₁ → D₂). At the original wage there is now a shortage of engineers. Wages are bid up to W₂ and the quantity employed rises to Q₂. US software engineer wages rose roughly 30% between 2020–2023 as tech firms competed for AI/ML talent.",
    keyTerms: ["demand for labour", "supply of labour", "equilibrium wage", "marginal revenue product (MRP)"],
    diagramRequirements: [
      { requirement: "Draw a labour market diagram with wage on y-axis and quantity on x-axis", marks: 1 },
      { requirement: "Shift the demand for labour to the right (D₁ → D₂)", marks: 1 },
      { requirement: "Label the new equilibrium wage (W₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Briefly explain the mechanism (↑MRP → ↑demand → ↑W, ↑Q)", marks: 1 },
    ],
    scenarioVariant: "Software Engineers — Rising Demand for Tech Labour",
  },
];
