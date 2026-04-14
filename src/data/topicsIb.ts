export interface IbTopic {
  slug: string;
  board: "IB HL/SL";
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

export const ibTopics: IbTopic[] = [
  // ── Foundation [4 marks] ──
  {
    slug: "ib-sd-shift-demand",
    board: "IB HL/SL",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "In 2023 Norway raised annual road tax on petrol and diesel cars while keeping EVs tax-exempt. New lower-priced EV models also entered the market, making EVs more accessible to the average consumer.",
    question:
      "Using a demand and supply diagram, show the impact of the increased tax on petrol cars (a SUBSTITUTE good) on the market for Electric Vehicles. You must: 1) draw the initial equilibrium; 2) show the shift in the demand curve and the resulting change in equilibrium price and quantity; 3) fully label your diagram; 4) briefly explain the reasoning behind the shift.",
    figureFile: "/figures/ib-sd-shift-demand.svg",
    explanation:
      "EVs and petrol cars are SUBSTITUTES. When the tax on petrol cars rises, their effective price to consumers rises, so consumers switch away from petrol cars toward EVs. Demand for EVs rises at every price → demand curve shifts RIGHT (D1→D2). Supply is unchanged in this scenario. New equilibrium: price RISES (Pe1→Pe2) and quantity RISES (Qe1→Qe2).",
    keyTerms: ["demand shift", "substitute goods", "equilibrium price", "equilibrium quantity", "ceteris paribus"],
    diagramRequirements: [
      { requirement: "Axes labelled Price (P) and Quantity (Q)", marks: 1 },
      { requirement: "Original D1 and S drawn with equilibrium Pe1, Qe1 marked", marks: 1 },
      { requirement: "Demand shifts RIGHT to D2 with arrow; supply unchanged", marks: 1 },
      { requirement: "New equilibrium Pe2 > Pe1 and Qe2 > Qe1 with dashed drop-lines", marks: 1 },
    ],
  },
  {
    slug: "ib-sd-shift-supply",
    board: "IB HL/SL",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "Automated manufacturing and new Australian lithium reserves have lowered unit production costs for lithium-ion batteries. Global electricity prices are stable and demand for batteries in energy storage and transport remains robust.",
    question:
      "Using a supply and demand diagram, explain the impact of reduced production costs on the equilibrium price and quantity in the global market for lithium-ion batteries.",
    figureFile: "/figures/ib-sd-shift-supply.svg",
    explanation:
      "Lower input costs mean firms can profitably supply more at every price → supply curve shifts RIGHT (S1→S2). Demand is unchanged. New equilibrium: price FALLS (Pe1→Pe2) and quantity RISES (Qe1→Qe2). The size of the price fall vs quantity rise depends on PED.",
    keyTerms: ["supply shift", "input costs", "technological advancement", "equilibrium", "demand unchanged"],
    diagramRequirements: [
      { requirement: "Axes labelled Price (P) and Quantity (Q)", marks: 1 },
      { requirement: "Original S1 and D drawn with equilibrium Pe1, Qe1 marked", marks: 1 },
      { requirement: "Supply shifts RIGHT to S2 with arrow; demand unchanged", marks: 1 },
      { requirement: "New equilibrium Pe2 < Pe1 and Qe2 > Qe1 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "ib-adas-demand-shock",
    board: "IB HL/SL",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "In 2024 Germany's consumer confidence fell sharply after rising interest rates and economic uncertainty. Household consumption dropped substantially across the eurozone's largest economy.",
    question:
      "Using an AD/AS diagram, show the impact of the decrease in consumer confidence on Germany's Price Level and Real GDP. Briefly explain the reasoning for the shift.",
    figureFile: "/figures/ib-ad-shock.svg",
    explanation:
      "Consumption (C) is a component of AD (= C + I + G + X − M). Falling consumer confidence means households defer spending. Consumption falls → AD shifts LEFT (AD1→AD2). New equilibrium shows LOWER price level (P1→P2) AND LOWER real output (Y1→Y2). This is a classic deflationary/recessionary demand-side shock.",
    keyTerms: ["aggregate demand", "consumption", "consumer confidence", "AD shift", "price level", "real GDP", "recessionary gap"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real GDP (Y)", marks: 1 },
      { requirement: "AD1 and SRAS drawn with initial equilibrium P1, Y1", marks: 1 },
      { requirement: "AD shifts LEFT to AD2 with arrow labelled '↓C'", marks: 1 },
      { requirement: "New equilibrium P2 < P1 and Y2 < Y1 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "ib-adas-supply-shock",
    board: "IB HL/SL",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "Islandia is in long-run equilibrium. Geopolitical tensions push the global price of crude oil — a critical imported input for manufacturing and transport — up by 40%.",
    question:
      "Using an AD/AS diagram, show the impact of the oil-price increase on Islandia's macroeconomic equilibrium. You must annotate the changes in price level and real GDP. Briefly explain the reasoning and the resulting impact on the economy.",
    figureFile: "/figures/ib-supply-shock.svg",
    explanation:
      "Oil is a fundamental input → higher crude prices raise marginal costs across manufacturing and transport. SRAS shifts LEFT (SRAS1→SRAS2). With unchanged AD, the new equilibrium shows HIGHER price level (P1→P2) and LOWER real GDP (YFE→Y2). This combination is STAGFLATION, caused by COST-PUSH INFLATION.",
    keyTerms: ["SRAS shift", "cost-push inflation", "stagflation", "supply shock", "input costs", "LRAS unchanged"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real Output; LRAS vertical at YFE; AD downward", marks: 1 },
      { requirement: "SRAS1 drawn upward; initial equilibrium on LRAS at (YFE, P1)", marks: 1 },
      { requirement: "SRAS shifts LEFT to SRAS2 with arrow; cost-push annotated", marks: 1 },
      { requirement: "New equilibrium P2 > P1 and Y2 < YFE; written explanation mentions stagflation / cost-push", marks: 1 },
    ],
  },
  {
    slug: "ib-adas-lras-growth",
    board: "IB HL/SL",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "In 2023 a developing nation's government launched a major human-capital initiative providing universal access to specialised vocational training and technical education. Diagram requirement: use the Monetarist/New Classical model (VERTICAL LRAS).",
    question:
      "Using an AD/AS diagram with a vertical LRAS, show the long-run effect of an increase in the QUALITY OF LABOUR on Real GDP and Price Level. Briefly explain the reasoning.",
    figureFile: "/figures/ib-lras-growth.svg",
    explanation:
      "Human-capital investment raises the PRODUCTIVITY of labour. Productive capacity expands → LRAS shifts RIGHT (LRAS1→LRAS2), with potential output Yp1→Yp2. With unchanged AD, the new equilibrium also shows a LOWER price level (P1→P2). This is NON-INFLATIONARY ECONOMIC GROWTH.",
    keyTerms: ["LRAS", "potential output", "human capital", "productivity", "non-inflationary growth", "vertical LRAS", "Monetarist/New Classical"],
    diagramRequirements: [
      { requirement: "Axes Price Level and Real GDP; AD downward; SRAS upward", marks: 1 },
      { requirement: "LRAS1 drawn vertical at Yp1; initial equilibrium on LRAS1 at P1", marks: 1 },
      { requirement: "LRAS shifts RIGHT to LRAS2 at Yp2 with arrow", marks: 1 },
      { requirement: "New equilibrium at (Yp2, P2) with P2 < P1 and Yp2 > Yp1 clearly shown", marks: 1 },
    ],
  },
  {
    slug: "ib-labour-wage-determination",
    board: "IB HL/SL",
    tier: "Foundation",
    section: "Labour Market",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario:
      "The UK hospitality industry faces a significant shortage of chefs and servers following migration-policy changes and shifting domestic career preferences. Fewer people are willing and able to work at any given wage rate.",
    question:
      "Using a labour market diagram, draw and explain the effect of a DECREASE IN THE SUPPLY OF LABOUR on the equilibrium wage rate and level of employment in the UK hospitality sector.",
    figureFile: "/figures/ib-wage-determination.svg",
    explanation:
      "Labour supply (S_L, upward-sloping) shows the quantity of labour offered at each wage. Labour demand (D_L = MRPL, downward-sloping) shows quantity employers want to hire. Migration restrictions and changing career preferences reduce the pool of available workers → S_L shifts LEFT (S_L1→S_L2). Demand for labour is unchanged. New equilibrium: wage rate RISES (We1→We2) and employment FALLS (Le1→Le2).",
    keyTerms: ["labour supply", "labour demand", "MRPL", "wage rate", "employment", "supply shift", "shortage"],
    diagramRequirements: [
      { requirement: "Axes labelled Wage Rate (W) and Employment (L)", marks: 1 },
      { requirement: "Original S_L1 (upward) and D_L (downward) drawn with equilibrium We1, Le1", marks: 1 },
      { requirement: "S_L shifts LEFT to S_L2 with arrow", marks: 1 },
      { requirement: "New equilibrium We2 > We1 and Le2 < Le1 clearly marked", marks: 1 },
    ],
  },
];
