export interface CaieIgcseTopic {
  slug: string;
  board: "CAIE-IGCSE";
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

export const caieIgcseTopics: CaieIgcseTopic[] = [
  {
    slug: "caie-sd-demand-evs",
    board: "CAIE-IGCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Demand",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "The UK government releases data showing that disposable incomes for households have risen by 4% in 2024. At the same time, growing environmental awareness has shifted consumer preferences toward greener transport. Electric Vehicles (EVs) are considered a normal good.",
    question:
      "Using a demand and supply diagram, show the effect of rising disposable incomes on the equilibrium price and quantity of Electric Vehicles. Label the original (P1, Q1) and new (P2, Q2) equilibria, and briefly explain the reasoning behind your shifts.",
    figureFile: "/figures/caie-demand-shift-evs-income.svg",
    explanation:
      "EVs are a normal good, so when household disposable income rises by 4%, consumers can afford more EVs at every price. Greener tastes reinforce this. Demand shifts right from D1 to D2. At the original price P1 there is now excess demand (Qd > Qs), so the price mechanism rations supply — price is bid up, leading to an extension along supply until a new equilibrium (P2, Q2) is reached at higher price and higher quantity.",
    keyTerms: ["disposable income", "normal good", "shift in demand", "equilibrium"],
    diagramRequirements: [
      { requirement: "Label the original equilibrium price (P1) and quantity (Q1)", marks: 1 },
      { requirement: "Shift the relevant curve to show the impact of the change in income", marks: 1 },
      { requirement: "Label the new equilibrium price (P2) and quantity (Q2)", marks: 1 },
      { requirement: "Briefly explain the reasoning behind your shifts", marks: 1 },
    ],
    scenarioVariant: "Market for Electric Vehicles (EVs) — Rising Disposable Income",
  },
  {
    slug: "caie-sd-supply-coffee",
    board: "CAIE-IGCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Supply",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "In 2023, Brazil, the world's largest producer of coffee beans, experienced exceptionally favorable weather conditions and a significant reduction in the cost of imported fertilizers.",
    question:
      "Draw and label a supply and demand diagram to show the effect of these favourable changes on the equilibrium price and quantity of coffee. Explain the reasoning behind your diagram.",
    figureFile: "/figures/caie-supply-shift-coffee-increase.svg",
    explanation:
      "Better growing conditions raise yields and lower fertilizer costs reduce the marginal cost of production. Both factors mean farmers can profitably supply more coffee at every price, so supply shifts right from S1 to S2. With demand unchanged, the new equilibrium (P2, Q2) shows a lower price and a higher quantity traded — the textbook outcome of a supply increase.",
    keyTerms: ["supply shift", "cost of production", "extension in demand", "price elasticity of supply"],
    diagramRequirements: [
      { requirement: "Identify the non-price factors affecting supply (weather, input costs)", marks: 1 },
      { requirement: "Shift the supply curve in the correct direction (rightward)", marks: 1 },
      { requirement: "Identify the new equilibrium where the new supply intersects the original demand", marks: 1 },
      { requirement: "Explain the resulting changes in equilibrium price and quantity", marks: 1 },
    ],
    scenarioVariant: "Market Changes in the Global Coffee Industry — 2023",
  },
  {
    slug: "caie-adas-demand-pull",
    board: "CAIE-IGCSE",
    tier: "Foundation",
    section: "AD/AS — Demand-Side Shock",
    marks: 4,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "The UK economy experiences a significant increase in consumer confidence and a rise in disposable income. As a result, households increase their spending on luxury goods and services.",
    question:
      "Using an AD/AS diagram, analyse the impact of this increase in consumer spending on the UK's general price level and real GDP. Show the shift in the AD curve and the resulting change in the equilibrium position.",
    figureFile: "/figures/caie-ad-demand-pull.svg",
    explanation:
      "Higher consumer confidence and rising disposable income raise consumption (C), the largest component of AD = C + I + G + (X − M). AD shifts right from AD1 to AD2. The new equilibrium with SRAS sits at higher Real GDP (Y2 > Y1) AND higher price level (P2 > P1) — the classic demand-pull inflation outcome where strong demand 'pulls' prices up.",
    keyTerms: ["aggregate demand", "demand-pull inflation", "price level", "real GDP"],
    diagramRequirements: [
      { requirement: "Draw the initial equilibrium where AD1 intersects SRAS, identifying P1 and Y1", marks: 1 },
      { requirement: "Shift AD to the right (AD1 → AD2) to reflect higher consumer spending", marks: 1 },
      { requirement: "Identify the new equilibrium price level (P2) and real output (Y2)", marks: 1 },
      { requirement: "Explain that this represents both economic growth and demand-pull inflation", marks: 1 },
    ],
    scenarioVariant: "Demand-Pull Inflation in the UK Economy",
  },
  {
    slug: "caie-adas-supply-shock",
    board: "CAIE-IGCSE",
    tier: "Foundation",
    section: "AD/AS — Supply-Side Shock",
    marks: 4,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "In 2022, global energy prices rose sharply due to geopolitical tensions in Europe. This significantly increased the costs of electricity and fuel for manufacturers and transport firms in many countries.",
    question:
      "Using an AD/AS diagram, analyse the effect of this increase in energy costs on an economy's price level and real GDP. Show the initial equilibrium, the shift in the curve, and the new equilibrium point.",
    figureFile: "/figures/caie-as-supply-shock.svg",
    explanation:
      "Higher energy prices raise costs of production for almost every firm. Producers require higher prices to supply the same quantity, so SRAS shifts left from SRAS1 to SRAS2. With AD unchanged, the new equilibrium has a higher price level (cost-push inflation) and lower Real GDP. UK CPI hit a 40-year high of 11.1% in October 2022 from this kind of shock — stagflationary pressures emerge.",
    keyTerms: ["SRAS", "cost-push inflation", "stagflation", "real GDP"],
    diagramRequirements: [
      { requirement: "Draw correctly labelled axes (Price Level and Real GDP/Output)", marks: 1 },
      { requirement: "Show the initial equilibrium (P1, Y1)", marks: 1 },
      { requirement: "Shift the SRAS curve to the left (SRAS1 → SRAS2)", marks: 1 },
      { requirement: "Label the new equilibrium with higher price level (P2) and lower real output (Y2)", marks: 1 },
    ],
    scenarioVariant: "Macroeconomic Instability — 2022 Global Energy Price Shock",
  },
  {
    slug: "caie-adas-lras-developing",
    board: "CAIE-IGCSE",
    tier: "Foundation",
    section: "AD/AS — Economic Growth (LRAS Shift)",
    marks: 4,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "Between 2021 and 2024, the government of a developing economy significantly increased its spending on vocational training and high-speed internet infrastructure. These investments have led to a permanent increase in the skills of the labor force and improved the efficiency of nationwide production.",
    question:
      "Using an AD/AS diagram, analyse the effect of increased investment in infrastructure and education on the economy's price level and real GDP in the long run. Explain how this shift affects the long-term productive capacity of the economy.",
    figureFile: "/figures/caie-lras-shift-developing.svg",
    explanation:
      "Better infrastructure (e.g. high-speed internet) speeds up production and lowers transaction costs, while vocational training raises labour productivity. Both factors permanently expand productive capacity, shifting LRAS right from LRAS1 to LRAS2. With AD unchanged, the new long-run equilibrium has higher Real GDP (Y2 > Y1) and lower Price Level (P2 < P1) — sustainable, non-inflationary growth driven by genuine supply-side improvement.",
    keyTerms: ["LRAS", "productive capacity", "capital investment", "supply-side policy"],
    diagramRequirements: [
      { requirement: "Draw the initial equilibrium using AD and LRAS1", marks: 1 },
      { requirement: "Shift LRAS to the right to reflect higher productive capacity", marks: 1 },
      { requirement: "Label the new equilibrium and the change in Real GDP", marks: 1 },
      { requirement: "Briefly explain how this raises the long-term productive capacity of the economy", marks: 1 },
    ],
    scenarioVariant: "Developing Economy 2021–24 — Infrastructure and Education",
  },
  {
    slug: "caie-labour-nurses",
    board: "CAIE-IGCSE",
    tier: "Foundation",
    section: "Labour Market — Wage Determination",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario:
      "Between 2021 and 2024, the UK experienced a significant shortage of qualified nurses. At the same time, an ageing population increased the demand for healthcare services, forcing the NHS and private hospitals to compete for a limited pool of staff.",
    question:
      "Using a labour market diagram, explain how an increase in the demand for healthcare services and a decrease in the number of qualified nurses would affect the equilibrium wage and employment levels for nurses.",
    figureFile: "/figures/caie-labour-market-nurses.svg",
    explanation:
      "Labour demand is a derived demand. The ageing population raises demand for healthcare, which raises demand for nurses → D shifts right (D1 → D2). At the same time, fewer qualified nurses means supply contracts at every wage → S shifts left (S1 → S2). Both shifts unambiguously raise the equilibrium wage (W2 well above W1). The effect on quantity employed is theoretically ambiguous — it depends on the relative magnitudes of the two shifts. In the diagram, equal-sized shifts leave employment roughly unchanged. Hospitals must pay much more to fill posts.",
    keyTerms: ["demand for labour", "supply of labour", "equilibrium wage", "derived demand"],
    diagramRequirements: [
      { requirement: "Show the initial equilibrium at wage W1 and quantity Q1 (intersection of D1 and S1)", marks: 1 },
      { requirement: "Shift the demand for labour to the right (D1 → D2)", marks: 1 },
      { requirement: "Shift the supply of labour to the left (S1 → S2)", marks: 1 },
      { requirement: "Identify the new equilibrium wage (W2) and explain the effect on employment", marks: 1 },
    ],
    scenarioVariant: "Wage Determination in the UK Nursing Labour Market",
  },
];
