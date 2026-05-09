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
    title: "Supply & Demand · Shift in Demand",
    scenario:
      "2024 UK data show real disposable incomes have risen by 2.1%. Electric vehicles are a normal good: demand rises with income.",
    question:
      "Using a supply and demand diagram, explain the likely impact of rising real disposable incomes on the equilibrium price and quantity of EVs in the UK. You must: 1) draw the initial equilibrium (P1, Q1); 2) show the shift in demand and resulting new equilibrium (P2, Q2); 3) explain the reasoning.",
    figureFile: "/figures/wjec-sd-shift-demand.svg",
    explanation:
      "EVs are a NORMAL GOOD → demand rises with income. Higher disposable income raises the quantity demanded at every price level, shifting the demand curve RIGHT (D1→D2). Supply is unchanged. New equilibrium: price RISES (P1→P2) as consumers compete for the existing supply, and quantity RISES (Q1→Q2) as producers expand output along their supply curve (expansion of supply · movement along the curve, not a shift).",
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
    title: "Supply & Demand · Shift in Supply",
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
    title: "AD/AS · Demand-Side Shock",
    scenario:
      "Since 2022 the Bank of England has maintained restrictive monetary policy to fight inflation, pushing interest rates to a 15-year high of 5.25%. Borrowing costs rose and disposable income available for consumption fell.",
    question:
      "Using an AD/AS diagram, explain the impact of rising interest rates on the UK's Price Level and Real National Output. You must: 1) draw the initial equilibrium; 2) show the shift caused by higher interest rates; 3) briefly explain the transmission mechanism.",
    figureFile: "/figures/wjec-ad-shock.svg",
    explanation:
      "Higher interest rates work through multiple channels: (i) CONSUMPTION ↓ · mortgage and credit-card payments consume more disposable income; (ii) INVESTMENT ↓ · higher borrowing costs make firms' projects less profitable; (iii) NET EXPORTS ↓ · higher rates attract foreign capital, sterling appreciates. Each channel reduces a component of AD, so AD shifts LEFT (AD1→AD2). New equilibrium: LOWER price level (P1→P2) AND LOWER real output (Y1→Y2).",
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
    title: "AD/AS · Supply-Side Shock",
    scenario:
      "In 2022 UK and Welsh economies faced imported inflationary pressure from a sharp rise in global natural gas and electricity prices · key inputs for most British firms. Costs of production rose across all sectors, contracting aggregate supply.",
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
    title: "AD/AS · Economic Growth (LRAS Shift)",
    scenario:
      "The Welsh Government announces a significant increase in capital investment for high-tech manufacturing hubs plus a nationwide vocational retraining programme to improve labour productivity. Show the impact on long-term equilibrium.",
    question:
      "Using an AD/AS diagram, illustrate the effect of an increase in the economy's productive capacity. Draw the LRAS shift, identify the change in Yfe, and briefly explain the link between investment and long-run growth.",
    figureFile: "/figures/wjec-lras-growth.svg",
    explanation:
      "Investment raises BOTH the quantity (capital stock) and QUALITY (skilled workers) of factors of production. Productivity rises → productive capacity expands → LRAS shifts RIGHT (LRAS1→LRAS2), with full-employment output rising from Yfe1 to Yfe2. With AD unchanged, real GDP rises and price level falls (P1→P2) · NON-INFLATIONARY ECONOMIC GROWTH.",
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
    title: "Labour Market · Wage Determination",
    scenario:
      "Following UK tourism recovery in 2024, consumer spending at hotels and restaurants rose sharply. Demand for hospitality staff across Wales and the UK increased substantially.",
    question:
      "Using a labour market diagram, illustrate and explain how this increase in demand for hospitality staff affects the equilibrium wage rate and level of employment. You must: 1) draw and label the diagram; 2) show the shift in labour demand; 3) identify the new equilibrium wage and employment; 4) briefly explain the reasoning.",
    figureFile: "/figures/wjec-wage-determination.svg",
    explanation:
      "Demand for labour is a DERIVED DEMAND · it derives from demand for the goods/services the labour produces. Higher consumer spending means each worker's output generates more revenue, raising MRPL. Labour demand shifts RIGHT (D_L1→D_L2). Labour supply unchanged. New equilibrium: wage RISES (We1→We2) and employment RISES (Le1→Le2).",
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
      "A specific indirect tax raises producers' per-unit costs, shifting supply VERTICALLY UP from S to S1 by the tax amount. Initial equilibrium (PE, QE) where S meets D. New equilibrium (P1, Q1) where S1 meets D · P1 > PE and Q1 < QE. Four key reference points: W at (Q1, P1) = new equilibrium on D and S1; Y at (Q1, PE) = horizontal reference at original price; Z at (Q1, A) = price the producer receives NET of tax, read off the original S curve at Q1; A on the price axis = producer net price. Vertical distance P1 − A = TAX PER UNIT. Areas: CONSUMER TAX (upper, rectangle W-Y between P1 and PE across 0→Q1) = (P1 − PE) × Q1 · the price rise consumers absorb; PRODUCER TAX (lower, rectangle Y-Z between PE and A across 0→Q1) = (PE − A) × Q1 · the fall in net price producers accept. TOTAL TAX REVENUE = Consumer Tax + Producer Tax = (P1 − A) × Q1 = tax × Q1 · the full rectangle P1-W-Z-A. The SPLIT depends on ELASTICITIES: demand for sugary snacks is relatively inelastic (habit-forming), so consumers bear the LARGER burden.",
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

  // ── Intermediate [6 marks] ──
  {
    slug: "wjec-subsidy-ev",
    board: "WJEC",
    tier: "Intermediate",
    section: "Microeconomics",
    marks: 6,
    title: "Subsidy on a Good",
    scenario:
      "The Welsh Government is considering increasing financial support for domestic EV component manufacturers. High battery-production costs keep EV market prices well above petrol vehicles, leading to under-consumption of this merit good.",
    question:
      "Using a supply and demand diagram, explain how a government subsidy to EV component manufacturers could correct a market failure. Annotate the effect on equilibrium price, quantity traded, and total cost of subsidy to the government.",
    figureFile: "/figures/wjec-subsidy-ev.svg",
    explanation:
      "A per-unit subsidy reduces producers' marginal cost, shifting supply VERTICALLY DOWN by the subsidy amount (S1→S2). Initial equilibrium at (PE, QE). New equilibrium at (P1, Q1) where P1 < PE and Q1 > QE · consumers pay a lower price and more is produced. Producer receives A > PE per unit, where A is the price on the ORIGINAL S curve at Q1. Subsidy per unit = A − P1 (vertical gap between the two supply curves). CONSUMER SUBSIDY rectangle (PE − P1) × Q1 represents the price fall consumers enjoy. PRODUCER SUBSIDY rectangle (A − PE) × Q1 represents the price rise producers enjoy above the original. TOTAL GOVERNMENT COST = (A − P1) × Q1 = the full subsidy rectangle P1 to A, across 0 → Q1. Policy rationale: EVs are a MERIT GOOD with positive consumption externalities (cleaner air, decarbonisation). A subsidy internalises the external benefit, moving output toward the socially optimum level.",
    keyTerms: ["subsidy", "supply shift", "consumer subsidy", "producer subsidy", "merit good", "positive externality", "government expenditure", "total subsidy cost"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "Original S1 and D drawn with equilibrium PE, QE", marks: 1 },
      { requirement: "S1 shifts vertically DOWN to S2 by subsidy amount", marks: 1 },
      { requirement: "New equilibrium P1 < PE and Q1 > QE marked; producer receives A > PE on original S at Q1", marks: 1 },
      { requirement: "Consumer and Producer subsidy rectangles shaded/labelled; total government cost = (A − P1) × Q1 annotated", marks: 1 },
      { requirement: "Written explanation links to merit-good/externality correction", marks: 1 },
    ],
  },
  {
    slug: "wjec-neg-externality-hfss",
    board: "WJEC",
    tier: "Intermediate",
    section: "Market Failure",
    marks: 6,
    title: "Negative Externality (Overconsumption / Overproduction)",
    scenario:
      "The Welsh Government is concerned about high consumption of high-fat, salt and sugar (HFSS) foods. External costs include NHS Wales strain from rising type 2 diabetes and heart disease. Consumers ignore these third-party effects; market price is too low, leading to misallocation of resources and allocative inefficiency.",
    question:
      "Using a marginal social cost/benefit diagram, explain why the free market over-consumes goods that create negative externalities of consumption such as sugary snacks. You must: 1) draw and correctly label the diagram; 2) identify market equilibrium and social optimum; 3) shade and label the welfare loss.",
    figureFile: "/figures/wjec-neg-ext-hfss.svg",
    explanation:
      "HFSS foods generate NEGATIVE CONSUMPTION EXTERNALITIES: third parties (taxpayers funding NHS, employers losing productivity) bear costs not reflected in market transactions. MSB = MPB − MEC, so MSB lies BELOW MPB by a constant MEC. Free market equilibrium at (Pe, Qe) where MPC (=MSC) meets MPB. SOCIAL OPTIMUM at (Po, Qo) where MSC meets MSB; Qo < Qe. Between Qo and Qe each unit has MSC > MSB · the shaded WELFARE LOSS TRIANGLE (deadweight loss). Allocative efficiency fails because P = MPB rather than P = MSB → over-allocation of resources to HFSS. Correction: sin tax on sugar and salt raises private price toward MSC, reducing consumption toward Qo.",
    keyTerms: ["negative externality of consumption", "MPB", "MSB", "MSC", "MEC", "over-consumption", "welfare loss", "allocative inefficiency", "merit good", "sin tax"],
    diagramRequirements: [
      { requirement: "Axes labelled Costs/Benefits and Quantity", marks: 1 },
      { requirement: "MPC = MSC (upward), MPB (downward), MSB (downward, BELOW MPB by MEC) labelled", marks: 2 },
      { requirement: "Market equilibrium (Qe, Pe) and social optimum (Qo, Po) with Qo < Qe", marks: 1 },
      { requirement: "Welfare loss triangle shaded between Qo and Qe, bounded by MSC above MSB below", marks: 1 },
      { requirement: "Written explanation covers over-consumption logic + corrective tax", marks: 1 },
    ],
  },
  {
    slug: "wjec-pos-externality-flu",
    board: "WJEC",
    tier: "Intermediate",
    section: "Market Failure",
    marks: 6,
    title: "Positive Externality (Underconsumption / Underproduction)",
    scenario:
      "In 2024 the Welsh Government announced extra funding for the nationwide influenza vaccination programme. Vaccinations protect the individual AND reduce transmission to others · especially the vulnerable. Despite these external benefits, the free market results in consumption below the socially optimum level.",
    question:
      "Using a positive externality diagram, explain why the free market provision of vaccinations leads to market failure. You must: 1) draw MPB, MSB, MSC; 2) identify market equilibrium and social optimum; 3) shade welfare loss; 4) explain the reasoning.",
    figureFile: "/figures/wjec-pos-ext-flu.svg",
    explanation:
      "Flu vaccines generate POSITIVE CONSUMPTION EXTERNALITIES: individual immunity PLUS herd immunity (reduced transmission to others). MSB = MPB + MEB, so MSB lies ABOVE MPB by constant MEB. Free market equilibrium at (P1, Q1) where MPC (=MSC) meets MPB. SOCIAL OPTIMUM at (P2, Q2) where MSC meets MSB; Q2 > Q1. Between Q1 and Q2 MSB > MSC · the shaded WELFARE LOSS represents the deadweight loss from under-consumption of a valuable good. Market fails because consumers don't capture the external benefit themselves. Correction: subsidy or free provision shifts MPB up to meet MSB, moving consumption to Q2.",
    keyTerms: ["positive externality of consumption", "MPB", "MSB", "MEB", "MPC = MSC", "under-consumption", "welfare loss", "merit good", "subsidy", "herd immunity"],
    diagramRequirements: [
      { requirement: "Axes labelled Costs/Benefits and Output/Quantity", marks: 1 },
      { requirement: "MPC = MSC (upward), MPB (downward), MSB (downward, ABOVE MPB by MEB) labelled", marks: 2 },
      { requirement: "Market equilibrium (Q1, P1) and social optimum (Q2, P2) with Q2 > Q1", marks: 1 },
      { requirement: "Welfare loss/gain triangle shaded between Q1 and Q2 (MSB above, MSC below)", marks: 1 },
      { requirement: "Written explanation covers under-consumption logic + subsidy correction", marks: 1 },
    ],
  },
  {
    slug: "wjec-max-price-cardiff-rent",
    board: "WJEC",
    tier: "Intermediate",
    section: "Microeconomics",
    marks: 6,
    title: "Maximum Price (Price Ceiling)",
    scenario:
      "The Welsh Government faces calls to introduce a MAXIMUM PRICE (price ceiling) on private rental properties in Cardiff, where rents have risen over 10% in a single year. Proponents want affordable housing as a merit good; critics warn of welfare loss and housing shortages.",
    question:
      "Using a demand and supply diagram, explain the likely impact of the Welsh Government imposing a maximum price on private rentals. You must: 1) draw and annotate the price-ceiling diagram; 2) label excess demand; 3) explain the change in quantity supplied.",
    figureFile: "/figures/wjec-max-price-rent.svg",
    explanation:
      "A maximum price Pc BELOW equilibrium Pe is BINDING. At Pc: quantity SUPPLIED falls (Qe→Qs) because landlords find renting unprofitable at the lower regulated price; some withdraw properties, others let existing stock deteriorate. Quantity DEMANDED rises (Qe→Qd) because more renters can afford to apply at the lower price. The gap Qd − Qs = EXCESS DEMAND (housing SHORTAGE). Consequences: long waiting lists, queues, informal black markets where rents above Pc are paid illegally, reduced investment in new housing. WELFARE LOSS triangle emerges because mutually beneficial trades between Qs and Qe are now prevented.",
    keyTerms: ["price ceiling", "maximum price", "excess demand", "shortage", "welfare loss", "binding", "black market", "allocative efficiency"],
    diagramRequirements: [
      { requirement: "Axes labelled Price (Rent) and Quantity (Rentals)", marks: 1 },
      { requirement: "S (upward) and D (downward) with equilibrium Pe, Qe marked", marks: 1 },
      { requirement: "Pc horizontal line BELOW equilibrium, labelled Price Ceiling", marks: 1 },
      { requirement: "Qs (on S at Pc) and Qd (on D at Pc); excess demand bracket Qs→Qd labelled", marks: 2 },
      { requirement: "Welfare loss triangle shaded; written explanation of shortage consequences", marks: 1 },
    ],
  },
  {
    slug: "wjec-min-price-nlw",
    board: "WJEC",
    tier: "Intermediate",
    section: "Microeconomics",
    marks: 6,
    title: "Minimum Price (Price Floor)",
    scenario:
      "April 2024: UK Government raised the National Living Wage to £11.44/hour for workers aged 21+. Designed to improve living standards, but some economists warn setting wages well above equilibrium may cause unintended employment effects in hospitality and retail.",
    question:
      "Using a demand and supply diagram, explain the likely effect on the UK's low-skilled labour market of raising the National Living Wage above equilibrium. You should: 1) draw and label the price floor; 2) identify excess supply (unemployment); 3) explain the change in quantity demanded and supplied.",
    figureFile: "/figures/wjec-min-price-nlw.svg",
    explanation:
      "The labour market has Labour Supply (upward) and Labour Demand (downward, = MRPL). Competitive equilibrium at (We, Le). A statutory minimum wage Wmin > We is BINDING. At Wmin: quantity of LABOUR SUPPLIED rises (Le → Ls) because more workers want to work at higher pay; quantity of LABOUR DEMANDED falls (Le → Ld) because employers find fewer workers profitable at Wmin (MRPL < Wmin for marginal workers). Gap Ls − Ld = EXCESS SUPPLY OF LABOUR = UNEMPLOYMENT caused by the policy. Impacts: existing workers who keep jobs enjoy higher wages (winners); some workers (especially young/low-skilled) are priced out of employment entirely (losers).",
    keyTerms: ["price floor", "minimum wage", "National Living Wage", "excess supply", "unemployment", "MRPL", "labour demand", "labour supply", "binding"],
    diagramRequirements: [
      { requirement: "Axes labelled Wage and Employment/Quantity of Labour", marks: 1 },
      { requirement: "Labour supply (upward) and labour demand (downward) with equilibrium We, Le marked", marks: 1 },
      { requirement: "Wmin horizontal line ABOVE equilibrium labelled £11.44 or Wmin", marks: 1 },
      { requirement: "Ld (on demand curve at Wmin) and Ls (on supply curve at Wmin)", marks: 2 },
      { requirement: "Excess supply bracket Ld→Ls labelled 'unemployment'; written explanation of demand/supply response", marks: 1 },
    ],
  },
  {
    slug: "wjec-keynesian-spare-capacity",
    board: "WJEC",
    tier: "Intermediate",
    section: "Macroeconomics",
    marks: 6,
    title: "Keynesian AS · Spare Capacity vs Full Employment",
    scenario:
      "The Welsh economy is currently experiencing significant under-utilisation of resources: high unemployment in former industrial hubs, many factories at only 60% capacity. The Welsh Government proposes a significant increase in infrastructure spending to stimulate AD.",
    question:
      "Using a Keynesian AS diagram, illustrate and explain the impact of rising AD on real output and price level when the economy has significant spare capacity. You must: 1) draw a correctly labelled Keynesian AS; 2) show initial AD1/AS equilibrium in the horizontal section; 3) show AD2 shift staying within spare capacity; 4) explain why price level does not change.",
    figureFile: "/figures/wjec-keynesian-spare-capacity.svg",
    explanation:
      "The Keynesian AS curve has three sections. HORIZONTAL (spare capacity) · unemployed workers and idle capital mean firms can hire/produce more at existing wages/costs, so AS is PERFECTLY ELASTIC; AD shifts raise output but NOT price level. INTERMEDIATE · bottlenecks emerge as specific inputs become scarce; further AD rises raise both Y and P. VERTICAL (full employment Yfe) · perfectly inelastic; all resources fully employed, AD rises raise ONLY the price level. For the WELSH ECONOMY in recession: AD1 intersects AS in the horizontal section at Y1, price level P. Infrastructure stimulus shifts AD1→AD2 along this horizontal section. New equilibrium: real output rises (Y1→Y2) with price level UNCHANGED at P.",
    keyTerms: ["Keynesian AS", "spare capacity", "horizontal section", "bottlenecks", "full employment", "perfectly elastic", "AD shift", "output gap"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real Output", marks: 1 },
      { requirement: "Keynesian AS drawn with three visible sections: horizontal, intermediate, vertical", marks: 2 },
      { requirement: "AD1 drawn intersecting AS in the HORIZONTAL section at Y1, P1", marks: 1 },
      { requirement: "AD shifts RIGHT to AD2 staying within the horizontal section", marks: 1 },
      { requirement: "Y2 > Y1 with P unchanged at P1; written explanation of why P doesn't change in the horizontal section", marks: 1 },
    ],
  },
  {
    slug: "wjec-monopoly-welsh-water",
    board: "WJEC",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Monopoly · Profit Maximisation (MC=MR)",
    scenario:
      "Dŵr Cymru (Welsh Water) operates as a regional monopoly for water and sewerage services. Unlike firms in competitive markets, it faces a downward-sloping AR curve and sets output where total profit is maximised.",
    question:
      "Using an appropriate diagram, explain how a monopolist like Welsh Water identifies its profit-maximising price and output level. You must: 1) draw AR, MR, MC, AC; 2) label profit-maximising equilibrium; 3) shade supernormal profit; 4) explain the firm's logical steps.",
    figureFile: "/figures/wjec-monopoly-welsh-water.svg",
    explanation:
      "A monopolist faces the entire market demand (D = AR, downward). MR lies BELOW AR because selling one more unit requires lowering price on ALL units (not just the marginal one). Profit-max rule: choose output where MC = MR. Below that output, MR > MC so extra units add to profit · expand; above it, MR < MC so extra units lose money · contract. At Q1 (MC = MR), price P1 is found by going UP to the AR curve. Average cost AC at Q1 is below P1 (for a profitable monopoly). SUPERNORMAL PROFIT = (P1 − AC) × Q1 · the shaded rectangle. For Welsh Water: natural-monopoly cost structure (high fixed infrastructure costs, huge economies of scale in pipe networks) means a single firm is more efficient than duplication.",
    keyTerms: ["monopoly", "profit maximisation", "MC = MR", "AR", "MR", "AC", "supernormal profit", "barriers to entry", "natural monopoly", "regulator"],
    diagramRequirements: [
      { requirement: "Axes labelled Price/Cost and Output", marks: 1 },
      { requirement: "AR = D (downward), MR (steeper below AR), MC (U), AC (U) drawn and labelled", marks: 2 },
      { requirement: "Profit-max at MC = MR giving Q1; P1 read up to AR", marks: 1 },
      { requirement: "AC at Q1 marked below P1; supernormal profit rectangle (P1 − AC) × Q1 shaded", marks: 1 },
      { requirement: "Written explanation of MC=MR rule + barriers to long-run profit", marks: 1 },
    ],
  },
  {
    slug: "wjec-pc-sr-lr-courier",
    board: "WJEC",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Perfect Competition · Short Run & Long Run",
    scenario:
      "The UK courier industry has seen an influx of small independent drivers via gig-economy platforms · approximating perfect competition (many firms, homogeneous service, low barriers). A sudden surge in home-delivery demand has lifted your firm into short-run supernormal profit.",
    question:
      "Using a perfect competition diagram, illustrate the SR equilibrium with supernormal profit, then show the transition to LR equilibrium with only normal profit. You must: 1) draw MC, AC, AR, MR for the firm; 2) shade SR supernormal profit; 3) explain how entry drives the market to LR.",
    figureFile: "/figures/wjec-pc-sr-lr-courier.svg",
    explanation:
      "TWO PANELS. FIRM (left): price-taker sees horizontal AR = MR at the market-determined price. SR: after demand surge, AR = MR is above min AC, firm produces where MC = MR at q1 earning supernormal profit (P1 − AC) × q1 · shaded rectangle. LR ADJUSTMENT: perfect information means new courier drivers observe profits; absence of barriers to entry lets them enter freely. Market supply curve shifts RIGHT as more drivers join. Market price falls from P1 back down toward min AC. Firm's AR line drops accordingly. This continues until P = min AC · no further incentive to enter, no firms exiting. LR EQUILIBRIUM: firm produces at q2 where MC = MR = AR = min AC, earning ONLY NORMAL PROFIT (zero economic profit).",
    keyTerms: ["perfect competition", "price taker", "homogeneous product", "freedom of entry", "supernormal profit", "normal profit", "min AC", "long-run equilibrium", "allocative efficiency", "productive efficiency"],
    diagramRequirements: [
      { requirement: "Two-panel diagram: Firm (left) and Market (right), both axes labelled", marks: 2 },
      { requirement: "Market panel: D and S drawn; SR price P1 higher than LR price P2", marks: 1 },
      { requirement: "Firm panel: MC, AC (U-shape); AR=MR horizontal at P1 (SR) and at P2 = min AC (LR)", marks: 1 },
      { requirement: "SR supernormal profit rectangle shaded; LR: AR line tangent to min AC, no profit rectangle", marks: 1 },
      { requirement: "Written explanation of entry mechanism leading to normal profit", marks: 1 },
    ],
  },
];
