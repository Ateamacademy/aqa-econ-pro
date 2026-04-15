export interface GcseTopic {
  slug: string;
  board: "AQA";
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

export const gcseTopics: GcseTopic[] = [
  // ── Foundation (4 marks) ────────────────────────────────────
  {
    slug: "gcse-demand-shift-evs",
    board: "AQA",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Demand",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "Over the last year, the UK government has introduced new subsidies for buyers of electric vehicles (EVs) and increased investment in nationwide charging points. At the same time, rising consumer awareness regarding climate change has changed household preferences toward greener transport.",
    question:
      "Draw a demand and supply diagram to show the effect of these changes on the equilibrium price and quantity of electric vehicles in the UK. Annotate your diagram to show the new equilibrium (P2, Q2) and briefly explain one reason for the shift you have drawn.",
    figureFile: "/figures/gcse-demand-shift-evs.svg",
    explanation:
      "Both the EV subsidy and stronger green preferences raise willingness to buy at every price, shifting demand right from D1 to D2. Supply is unchanged. The new equilibrium has a higher price (P2) and a higher quantity (Q2). The market clears at the new intersection point as the price mechanism rations the increased demand.",
    keyTerms: ["demand", "ceteris paribus", "shift in demand", "equilibrium"],
    diagramRequirements: [
      { requirement: "Correctly labelled supply and demand diagram with original equilibrium (P1, Q1)", marks: 1 },
      { requirement: "Demand curve shifted right (D1 → D2)", marks: 1 },
      { requirement: "New equilibrium annotated (P2, Q2)", marks: 1 },
      { requirement: "Brief explanation of one reason for the shift", marks: 1 },
    ],
    scenarioVariant: "UK Car Market — Increase in Demand for EVs",
  },
  {
    slug: "gcse-supply-shift-bread",
    board: "AQA",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Supply",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "In 2024, many UK food manufacturers experienced a significant increase in business costs due to rising electricity and gas prices. Energy is a vital input for the machinery used in mass-producing bread and cereal.",
    question:
      "Using a supply and demand diagram, show the effect of rising energy costs on the equilibrium price and quantity of bread in the UK market.",
    figureFile: "/figures/gcse-supply-shift-bread.svg",
    explanation:
      "Higher electricity and gas prices raise bakers' costs of production. At every price, less bread is profitable to produce, so supply shifts left from S to S1. With demand unchanged, the new equilibrium (P2, Q2) shows a higher loaf price and a lower quantity traded. This is the supply-side mechanism behind a portion of UK food-price inflation in 2022–24.",
    keyTerms: ["supply shift", "production costs", "equilibrium price"],
    diagramRequirements: [
      { requirement: "Initial supply and demand diagram with original equilibrium", marks: 1 },
      { requirement: "Supply curve shifted left to reflect higher energy costs", marks: 1 },
      { requirement: "New equilibrium price and quantity labelled", marks: 1 },
      { requirement: "Brief explanation of why supply shifted", marks: 1 },
    ],
    scenarioVariant: "Market Forces: Rising Energy Costs in UK Bread Production",
  },
  {
    slug: "gcse-ad-demand-shock",
    board: "AQA",
    tier: "Foundation",
    section: "AD/AS — Demand-Side Shock",
    marks: 4,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "In 2024, surveys by the Confederation of British Industry (CBI) showed a significant drop in consumer confidence due to rising household energy bills. As a result, many households have decided to reduce their spending on luxury items and non-essential services.",
    question:
      "Using an AD/AS diagram, show the effect of this decrease in consumer spending on the equilibrium level of real GDP and the price level.",
    figureFile: "/figures/gcse-ad-demand-shock.svg",
    explanation:
      "Lower confidence reduces consumption (C), the largest component of AD. The AD curve shifts left from AD1 to AD2. The new equilibrium with SRAS has lower real GDP (Y2 < Y1) and a lower price level (P2 < P1). The fall in output indicates slower growth — and at large enough scale, a recession.",
    keyTerms: ["aggregate demand", "consumer confidence", "recession"],
    diagramRequirements: [
      { requirement: "Initial equilibrium where AD meets AS", marks: 1 },
      { requirement: "AD curve shifted left (AD1 → AD2)", marks: 1 },
      { requirement: "New equilibrium price level (P2) and real GDP (Y2) labelled", marks: 1 },
      { requirement: "Brief explanation of effect on UK economic growth", marks: 1 },
    ],
    scenarioVariant: "Falling Consumer Confidence in the UK Economy",
  },
  {
    slug: "gcse-as-supply-shock",
    board: "AQA",
    tier: "Foundation",
    section: "AD/AS — Supply-Side Shock",
    marks: 4,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "In 2022, the UK experienced a significant supply-side shock as global natural gas prices rose sharply. This increased the costs of production for almost all firms, particularly those in manufacturing and transport, leading to a shift in Short-Run Aggregate Supply (SRAS).",
    question:
      "Using an AD/AS diagram, explain the effect of rising energy costs on the UK's price level and Real GDP.",
    figureFile: "/figures/gcse-as-supply-shock.svg",
    explanation:
      "Higher imported energy costs raise firms' marginal costs of production. SRAS shifts left from SRAS1 to SRAS2. With AD unchanged, the new equilibrium has a higher price level (cost-push inflation) and lower Real GDP — the classic stagflationary mix of weakening output and rising prices.",
    keyTerms: ["SRAS", "cost-push inflation", "stagflation"],
    diagramRequirements: [
      { requirement: "Initial equilibrium showing AD and SRAS intersection", marks: 1 },
      { requirement: "SRAS shifted left (SRAS1 → SRAS2)", marks: 1 },
      { requirement: "New equilibrium P2 and Y2 labelled", marks: 1 },
      { requirement: "Brief explanation of cost-push inflation", marks: 1 },
    ],
    scenarioVariant: "Energy Price Spikes and UK SRAS",
  },
  {
    slug: "gcse-lras-shift-skills",
    board: "AQA",
    tier: "Foundation",
    section: "AD/AS — Economic Growth (LRAS Shift)",
    marks: 4,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "The UK government announces a new 'Skills for Life' scheme, providing £5 billion in funding for high-tech vocational training and apprenticeships to improve the quality of the UK labour force.",
    question:
      "Draw an AD/AS diagram to show the effect of this improved labour productivity on the UK's Long-Run Aggregate Supply (LRAS). Annotate the change in equilibrium real national output and price level, and explain how this leads to long-run economic growth.",
    figureFile: "/figures/gcse-lras-shift-skills.svg",
    explanation:
      "Skills training raises labour productivity — workers produce more output per hour. The economy's productive capacity rises, shifting LRAS rightward from LRAS1 to LRAS2. Holding AD constant, the new long-run equilibrium has higher Real GDP (Y2 > Y1) and a lower Price Level (P2 < P1). This is non-inflationary growth driven by genuine supply-side improvement, not by demand stimulus.",
    keyTerms: ["LRAS", "productivity", "human capital", "long-run growth"],
    diagramRequirements: [
      { requirement: "AD, SRAS, and LRAS1 with initial equilibrium (P1, Y1)", marks: 1 },
      { requirement: "LRAS shifted right to LRAS2", marks: 1 },
      { requirement: "New equilibrium (P2, Y2) labelled", marks: 1 },
      { requirement: "Explanation of long-run economic growth", marks: 1 },
    ],
    scenarioVariant: "UK 'Skills for Life' Scheme and Long-Run Growth",
  },
  {
    slug: "gcse-labour-market-hospitality",
    board: "AQA",
    tier: "Foundation",
    section: "Labour Market — Wage Determination",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario:
      "Between 2022 and 2024, many UK restaurants and hotels reported a significant shortage of workers. This was partly due to a decrease in the number of EU workers following changes to immigration rules.",
    question:
      "Draw and label a labour market diagram to show the effect of a decrease in the supply of workers on the equilibrium wage rate and the level of employment. Provide a brief explanation of your diagram.",
    figureFile: "/figures/gcse-labour-market-hospitality.svg",
    explanation:
      "The reduction in available EU workers shifts labour supply left from S1 to S2 — fewer people are willing and able to work at each wage. With unchanged labour demand (the MRP curve), the new equilibrium occurs at a higher wage (W2) and a lower quantity of labour employed (Q2). Firms must pay more to attract scarcer workers, and some labour demand goes unfilled.",
    keyTerms: ["demand for labour", "supply of labour", "labour shortage"],
    diagramRequirements: [
      { requirement: "Original equilibrium wage (W1) and employment (Q1)", marks: 1 },
      { requirement: "Labour supply shifted left (S1 → S2)", marks: 1 },
      { requirement: "New equilibrium wage (W2) and employment (Q2) labelled", marks: 1 },
      { requirement: "Explanation of direction of change", marks: 1 },
    ],
    scenarioVariant: "UK Hospitality Sector — EU Worker Decline",
  },
  // ── Higher (9 marks) ────────────────────────────────────────
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
