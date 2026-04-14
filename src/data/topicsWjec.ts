export interface WjecTopic {
  slug: string;
  board: "WJEC";
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

export const wjecTopics: WjecTopic[] = [
  // ── Foundation [4 marks] ──
  {
    slug: "wjec-sd-shift-demand-ev",
    board: "WJEC",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "2024 UK data show real disposable incomes have risen by 2.1%. Electric vehicles are a normal good: demand rises with income.",
    question:
      "Using a supply and demand diagram, explain the likely impact of rising real disposable incomes on the equilibrium price and quantity of EVs in the UK. You must: 1) draw the initial equilibrium (P1, Q1); 2) show the shift in demand and resulting new equilibrium (P2, Q2); 3) explain the reasoning.",
    figureFile: "/figures/wjec-sd-shift-demand.svg",
    explanation:
      "EVs are a NORMAL GOOD → demand rises with income. Higher disposable income raises the quantity demanded at every price level, shifting the demand curve RIGHT (D1→D2). Supply is unchanged. New equilibrium: price RISES (P1→P2) as consumers compete for the existing supply, and quantity RISES (Q1→Q2) as producers expand output along their supply curve (expansion of supply — movement along the curve, not a shift).",
    keyTerms: ["demand shift", "normal good", "disposable income", "equilibrium price", "expansion of supply"],
    diagramRequirements: [
      { requirement: "Axes labelled Price (P) and Quantity (Q)", marks: 1 },
      { requirement: "Original D1 and S drawn with equilibrium P1, Q1 marked", marks: 1 },
      { requirement: "Demand shifts RIGHT to D2 with arrow; supply unchanged", marks: 1 },
      { requirement: "New equilibrium P2 > P1 and Q2 > Q1 with dashed drop-lines", marks: 1 },
    ],
  },
  {
    slug: "wjec-sd-shift-supply-ev",
    board: "WJEC",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "In 2024 the UK's Zero Emission Vehicle (ZEV) mandate required a higher % of EV sales. Simultaneously, technical advances in lithium-ion battery production sharply cut EV manufacturing marginal costs.",
    question:
      "Using a supply and demand diagram, explain the effect of lower production costs on the equilibrium price and quantity of EVs. You should: draw and label an SD diagram; show the shift in supply and resulting equilibrium change; explain the reasoning.",
    figureFile: "/figures/wjec-sd-shift-supply.svg",
    explanation:
      "Lower battery manufacturing costs reduce producers' marginal cost → supply curve shifts RIGHT (S1→S2). Demand is unchanged. New equilibrium: price FALLS (P1→P2) and quantity RISES (Q1→Q2). Consumers willingly absorb the extra units at the lower price along the unchanged demand curve.",
    keyTerms: ["supply shift", "production costs", "equilibrium price", "equilibrium quantity", "technological advance"],
    diagramRequirements: [
      { requirement: "Axes labelled Price (P) and Quantity (Q)", marks: 1 },
      { requirement: "Original S1 and D drawn with equilibrium P1, Q1 marked", marks: 1 },
      { requirement: "Supply shifts RIGHT to S2 with arrow; demand unchanged", marks: 1 },
      { requirement: "New equilibrium P2 < P1 and Q2 > Q1 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "wjec-adas-demand-shock",
    board: "WJEC",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "Since 2022 the Bank of England has maintained restrictive monetary policy to fight inflation, pushing interest rates to a 15-year high of 5.25%. Borrowing costs rose and disposable income available for consumption fell.",
    question:
      "Using an AD/AS diagram, explain the impact of rising interest rates on the UK's Price Level and Real National Output. You must: 1) draw the initial equilibrium; 2) show the shift caused by higher interest rates; 3) briefly explain the transmission mechanism.",
    figureFile: "/figures/wjec-ad-shock.svg",
    explanation:
      "Higher interest rates work through multiple channels: (i) CONSUMPTION ↓ — mortgage and credit-card payments consume more disposable income; (ii) INVESTMENT ↓ — higher borrowing costs make firms' projects less profitable; (iii) NET EXPORTS ↓ — higher rates attract foreign capital, sterling appreciates. Each channel reduces a component of AD, so AD shifts LEFT (AD1→AD2). New equilibrium: LOWER price level (P1→P2) AND LOWER real output (Y1→Y2).",
    keyTerms: ["aggregate demand", "interest rates", "consumption", "investment", "transmission mechanism", "contractionary", "AD shift"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real GDP", marks: 1 },
      { requirement: "AD1 and SRAS drawn with initial equilibrium P1, Y1", marks: 1 },
      { requirement: "AD shifts LEFT to AD2 with arrow labelled '↑ interest rates'", marks: 1 },
      { requirement: "New equilibrium P2 < P1 and Y2 < Y1 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "wjec-adas-supply-shock",
    board: "WJEC",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "In 2022 UK and Welsh economies faced imported inflationary pressure from a sharp rise in global natural gas and electricity prices — key inputs for most British firms. Costs of production rose across all sectors, contracting aggregate supply.",
    question:
      "Using an AD/SRAS diagram, explain the likely impact of rising energy prices on the UK's Price Level and Real National Output. You must: 1) draw and label the AD/AS diagram showing the SRAS shift; 2) label initial and new equilibria; 3) explain the reasoning and resulting changes.",
    figureFile: "/figures/wjec-supply-shock.svg",
    explanation:
      "Energy is a non-labour input across almost all sectors. A sharp rise in gas and electricity prices raises per-unit production costs economy-wide. SRAS shifts LEFT (SRAS1→SRAS2). With AD unchanged, price level RISES (P1→P2) and real output FALLS (Yfe→Y2). This combination is STAGFLATION, driven by COST-PUSH INFLATION.",
    keyTerms: ["SRAS shift", "cost-push inflation", "stagflation", "supply shock", "input costs", "imported inflation"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real Output; LRAS vertical at Yfe; AD downward", marks: 1 },
      { requirement: "SRAS1 upward; initial equilibrium on LRAS at (Yfe, P1)", marks: 1 },
      { requirement: "SRAS shifts LEFT to SRAS2 with arrow labelled '↑ energy costs'", marks: 1 },
      { requirement: "New equilibrium P2 > P1 and Y2 < Yfe; written explanation mentions stagflation / cost-push", marks: 1 },
    ],
  },
  {
    slug: "wjec-adas-lras-growth",
    board: "WJEC",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "The Welsh Government announces a significant increase in capital investment for high-tech manufacturing hubs plus a nationwide vocational retraining programme to improve labour productivity. Show the impact on long-term equilibrium.",
    question:
      "Using an AD/AS diagram, illustrate the effect of an increase in the economy's productive capacity. Draw the LRAS shift, identify the change in Yfe, and briefly explain the link between investment and long-run growth.",
    figureFile: "/figures/wjec-lras-growth.svg",
    explanation:
      "Investment raises BOTH the quantity (capital stock) and QUALITY (skilled workers) of factors of production. Productivity rises → productive capacity expands → LRAS shifts RIGHT (LRAS1→LRAS2), with full-employment output rising from Yfe1 to Yfe2. With AD unchanged, real GDP rises and price level falls (P1→P2) — NON-INFLATIONARY ECONOMIC GROWTH.",
    keyTerms: ["LRAS", "productive capacity", "potential output", "human capital", "productivity", "supply-side policy", "non-inflationary growth"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real GDP; AD downward; SRAS upward", marks: 1 },
      { requirement: "LRAS1 drawn vertical at Yfe1; initial equilibrium on LRAS1 at P1", marks: 1 },
      { requirement: "LRAS shifts RIGHT to LRAS2 at Yfe2 with arrow", marks: 1 },
      { requirement: "New equilibrium at (Yfe2, P2) with P2 < P1 and Yfe2 > Yfe1 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "wjec-labour-wage-demand-rise",
    board: "WJEC",
    tier: "Foundation",
    section: "Labour Market",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario:
      "Following UK tourism recovery in 2024, consumer spending at hotels and restaurants rose sharply. Demand for hospitality staff across Wales and the UK increased substantially.",
    question:
      "Using a labour market diagram, illustrate and explain how this increase in demand for hospitality staff affects the equilibrium wage rate and level of employment. You must: 1) draw and label the diagram; 2) show the shift in labour demand; 3) identify the new equilibrium wage and employment; 4) briefly explain the reasoning.",
    figureFile: "/figures/wjec-wage-determination.svg",
    explanation:
      "Demand for labour is a DERIVED DEMAND — it derives from demand for the goods/services the labour produces. Higher consumer spending means each worker's output generates more revenue, raising MRPL. Labour demand shifts RIGHT (D_L1→D_L2). Labour supply unchanged. New equilibrium: wage RISES (We1→We2) and employment RISES (Le1→Le2).",
    keyTerms: ["labour demand", "derived demand", "MRPL", "equilibrium wage", "employment", "labour supply", "MPP"],
    diagramRequirements: [
      { requirement: "Axes labelled Wage Rate (W) and Employment/Quantity of Labour (L)", marks: 1 },
      { requirement: "Original D_L1 (downward) and S_L (upward) drawn with equilibrium We1, Le1", marks: 1 },
      { requirement: "Labour demand shifts RIGHT to D_L2 with arrow", marks: 1 },
      { requirement: "New equilibrium We2 > We1 and Le2 > Le1 clearly marked", marks: 1 },
    ],
  },

  // ── Advanced [8 marks] ──
  {
    slug: "wjec-indirect-tax-sugar",
    board: "WJEC",
    tier: "Advanced",
    section: "Microeconomics",
    marks: 8,
    title: "Indirect Tax (Ad Valorem / Specific)",
    scenario:
      "The Welsh Government is concerned about rising healthcare costs from overconsumption of highly processed, high-sugar snacks. To address the negative consumption externalities, policymakers are considering a SPECIFIC indirect tax on sugar-sweetened confectionery to discourage consumption and internalise the external costs.",
    question:
      "Using a demand and supply diagram, explain the impact of imposing a specific indirect tax on the market for sugary snacks in Wales. In your response you must:\n- Show the impact on equilibrium price and equilibrium quantity.\n- Identify and label the areas of tax incidence for both consumer and producer.\n- Annotate the total tax revenue generated for the government.",
    figureFile: "/figures/wjec-indirect-tax-sugar.svg",
    explanation:
      "A specific indirect tax raises producers' per-unit costs, shifting supply VERTICALLY UP from S to S1 by the tax amount. Initial equilibrium (PE, QE) where S meets D. New equilibrium (P1, Q1) where S1 meets D — P1 > PE and Q1 < QE. Four key reference points: W at (Q1, P1) = new equilibrium on D and S1; Y at (Q1, PE) = horizontal reference at original price; Z at (Q1, A) = price the producer receives NET of tax, read off the original S curve at Q1; A on the price axis = producer net price. Vertical distance P1 − A = TAX PER UNIT. Areas: CONSUMER TAX (upper, rectangle W-Y between P1 and PE across 0→Q1) = (P1 − PE) × Q1 — the price rise consumers absorb; PRODUCER TAX (lower, rectangle Y-Z between PE and A across 0→Q1) = (PE − A) × Q1 — the fall in net price producers accept. TOTAL TAX REVENUE = Consumer Tax + Producer Tax = (P1 − A) × Q1 = tax × Q1 — the full rectangle P1-W-Z-A. The SPLIT depends on ELASTICITIES: demand for sugary snacks is relatively inelastic (habit-forming), so consumers bear the LARGER burden.",
    keyTerms: ["specific tax", "ad valorem", "indirect tax", "tax incidence", "consumer tax", "producer tax", "tax revenue", "PED", "negative externality", "supply shift"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "Original supply S and demand D drawn with initial equilibrium PE, QE", marks: 1 },
      { requirement: "S shifts vertically UP to S1 by tax amount; both curves labelled with vertical tax distance visible", marks: 1 },
      { requirement: "New equilibrium W at (P1, Q1) on S1 and D; P1 > PE and Q1 < QE clearly marked", marks: 1 },
      { requirement: "Net producer price A (on original S at Q1) marked; points Y (at Q1, PE) and Z (at Q1, A) labelled", marks: 1 },
      { requirement: "Consumer Tax rectangle (upper, between P1 and PE across 0→Q1) shaded/labelled", marks: 1 },
      { requirement: "Producer Tax rectangle (lower, between PE and A across 0→Q1) shaded/labelled", marks: 1 },
      { requirement: "Written explanation links incidence to PED and connects to externality internalisation", marks: 1 },
    ],
  },
];
