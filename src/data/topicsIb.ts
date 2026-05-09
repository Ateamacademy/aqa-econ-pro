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
    title: "Supply & Demand · Shift in Demand",
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
    title: "Supply & Demand · Shift in Supply",
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
    title: "AD/AS · Demand-Side Shock",
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
    title: "AD/AS · Supply-Side Shock",
    scenario:
      "Islandia is in long-run equilibrium. Geopolitical tensions push the global price of crude oil · a critical imported input for manufacturing and transport · up by 40%.",
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
    title: "AD/AS · Economic Growth (LRAS Shift)",
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
    title: "Labour Market · Wage Determination",
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

  // ── Intermediate [6 marks] ──
  {
    slug: "ib-subsidy-solar",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Microeconomics",
    marks: 6,
    title: "Subsidy on a Good",
    scenario:
      "Spain provides a direct per-unit subsidy to domestic manufacturers of photovoltaic (solar) panels as part of its renewable-energy transition. The goal: lower consumer prices and expand installed solar capacity.",
    question:
      "Using a subsidy diagram, explain the impact of this government intervention on the Spanish solar panel market, specifically addressing the effect on equilibrium price, equilibrium quantity, and producer revenue.",
    figureFile: "/figures/ib-subsidy.svg",
    explanation:
      "A per-unit subsidy lowers the marginal cost of production → supply shifts VERTICALLY DOWN by the subsidy amount (S1→S2). New equilibrium at (P1, Q1) with price LOWER (PE→P1) and quantity HIGHER (QE→Q1). Consumers pay P1; producers RECEIVE P1 + subsidy per unit = price A (on original S curve at Q1). Total producer revenue = A × Q1. Subsidy area is split between CONSUMER SUBSIDY (PE − P1) × Q1 and PRODUCER SUBSIDY (A − PE) × Q1. The split depends on PED and PES. Allocative efficiency case: justified if positive externalities of consumption bring MSB above MPB.",
    keyTerms: ["subsidy", "supply shift", "equilibrium price", "equilibrium quantity", "producer revenue", "consumer subsidy", "producer subsidy", "positive externality"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "Original S1 and D drawn with equilibrium PE, QE", marks: 1 },
      { requirement: "S1 shifts vertically DOWN to S2 by subsidy amount (arrow labelled 'subsidy')", marks: 1 },
      { requirement: "New equilibrium P1 < PE and Q1 > QE marked; producer receives A > PE on original S curve at Q1", marks: 1 },
      { requirement: "Producer subsidy (A − PE) and Consumer subsidy (PE − P1) rectangles shaded and labelled", marks: 1 },
      { requirement: "Written explanation covers revenue impact and government cost", marks: 1 },
    ],
  },
  {
    slug: "ib-neg-externality-soda",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Market Failure",
    marks: 6,
    title: "Negative Externality (Overconsumption / Overproduction)",
    scenario:
      "Overconsumption of high-sugar soft drinks in high-income countries is linked to rising Type 2 diabetes and obesity. These create major burdens on public healthcare and reduce economy-wide productivity.",
    question:
      "Using a negative externality diagram, explain why overconsumption of high-sugar soft drinks leads to market failure. You must: 1) draw MPB, MSB, MSC; 2) identify market equilibrium and social optimum; 3) shade the welfare loss; 4) explain why the market fails to allocate efficiently.",
    figureFile: "/figures/ib-neg-ext-soda.svg",
    explanation:
      "Soft drinks generate NEGATIVE CONSUMPTION EXTERNALITIES: third parties bear costs not reflected in market transactions. MSB = MPB − MEC, so MSB lies BELOW MPB. Free market equilibrium at (Pe, Qe) where MPC (=MSC) meets MPB. Social optimum at (Po, Qo) where MSC meets MSB · Qo < Qe. Between Qo and Qe, MSC > MSB · the WELFARE-LOSS TRIANGLE. Correction: sin tax raises private price toward MSC, reducing consumption toward Qo.",
    keyTerms: ["negative externality of consumption", "MPB", "MSB", "MSC", "MEC", "over-consumption", "welfare loss", "sugar tax", "market failure"],
    diagramRequirements: [
      { requirement: "Axes labelled Costs/Benefits and Output", marks: 1 },
      { requirement: "MPC = MSC (upward), MPB (downward), MSB (downward, BELOW MPB by MEC) · all three labelled", marks: 2 },
      { requirement: "Market equilibrium (Qe, Pe) at MPC=MPB and social optimum (Qo, Po) at MSC=MSB; Qo < Qe", marks: 1 },
      { requirement: "Welfare-loss triangle shaded between Qo and Qe", marks: 1 },
      { requirement: "Written explanation links over-consumption to failure to internalise external cost", marks: 1 },
    ],
  },
  {
    slug: "ib-pos-externality-healthcare",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Market Failure",
    marks: 6,
    title: "Positive Externality (Underconsumption / Underproduction)",
    scenario:
      "In a middle-income country, consumption of preventive healthcare (annual check-ups, vaccinations) is below the socially optimal level. Individuals gain privately; society also benefits via reduced infectious-disease transmission and lower public-healthcare burden.",
    question:
      "Using a positive externalities diagram, explain why the free market under-provides preventive healthcare services and identify the welfare loss. Your answer must: define positive externalities of consumption; draw MPB, MSB, MSC; annotate market equilibrium and social optimum; shade welfare loss; explain using the relationship between curves.",
    figureFile: "/figures/ib-pos-ext-healthcare.svg",
    explanation:
      "Preventive healthcare generates POSITIVE CONSUMPTION EXTERNALITIES: MSB = MPB + MEB, so MSB lies ABOVE MPB. Free market equilibrium at (Pm, Qm) where MPC (=MSC) meets MPB. Social optimum at (Ps, Qs) where MSC meets MSB; Qs > Qm. Between Qm and Qs MSB > MSC · the WELFARE-LOSS TRIANGLE of under-consumption. Correction: subsidy equal to MEB shifts MPB up to MSB, moving output to Qs.",
    keyTerms: ["positive externality of consumption", "MPB", "MSB", "MEB", "MPC = MSC", "under-consumption", "welfare loss", "subsidy", "market failure"],
    diagramRequirements: [
      { requirement: "Axes labelled Price/Costs/Benefits and Output", marks: 1 },
      { requirement: "MPC = MSC (upward), MPB (downward), MSB (downward, ABOVE MPB by MEB) · all three labelled", marks: 2 },
      { requirement: "MEB gap annotated between MPB and MSB", marks: 1 },
      { requirement: "Market equilibrium (Qm) and social optimum (Qs) with Qs > Qm; welfare-loss triangle shaded", marks: 1 },
      { requirement: "Written explanation covers under-consumption logic + subsidy correction", marks: 1 },
    ],
  },
  {
    slug: "ib-max-price-rent",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Microeconomics",
    marks: 6,
    title: "Maximum Price (Price Ceiling)",
    scenario:
      "Berlin has faced rapidly rising housing costs. The local government imposed a MAXIMUM PRICE (price ceiling) on residential rents, set BELOW the market equilibrium, to make housing more affordable for low-income households.",
    question:
      "Using a maximum price diagram, explain the impacts of setting a rent ceiling below market equilibrium. Your answer must identify the shortage and explain consequences.",
    figureFile: "/figures/ib-max-price.svg",
    explanation:
      "A price ceiling Pmax BELOW equilibrium Pe is BINDING. At Pmax: quantity SUPPLIED falls (Q→Qs) and quantity DEMANDED rises (Q→Qd). The gap Qd − Qs is EXCESS DEMAND (SHORTAGE). Consequences: queues, deterioration of housing stock, black markets, reduced investment. A DEADWEIGHT-LOSS TRIANGLE emerges because mutually beneficial trades between Qs and Q are prevented.",
    keyTerms: ["price ceiling", "maximum price", "excess demand", "shortage", "consumer surplus", "producer surplus", "deadweight loss", "binding"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "Standard S (upward) and D (downward) with equilibrium P, Q marked", marks: 1 },
      { requirement: "Horizontal Pmax line BELOW equilibrium P", marks: 1 },
      { requirement: "Qs (on S at Pmax) and Qd (on D at Pmax); excess demand bracket labelled", marks: 2 },
      { requirement: "Deadweight-loss triangle shaded; written explanation of shortage and welfare loss", marks: 1 },
    ],
  },
  {
    slug: "ib-min-price-sugar",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Microeconomics",
    marks: 6,
    title: "Minimum Price (Price Floor)",
    scenario:
      "In 2023 a developing nation considers a MINIMUM PRICE on raw sugar cane · ABOVE equilibrium · to protect small-scale farmers from volatile global prices and rising production costs.",
    question:
      "Using a price floor diagram, explain how imposing a minimum price ABOVE equilibrium affects the sugar-cane market and the impacts on consumer and producer surplus.",
    figureFile: "/figures/ib-min-price.svg",
    explanation:
      "A price floor Pmin ABOVE equilibrium Pe is BINDING. At Pmin: quantity SUPPLIED rises (Qe→Qs) and quantity DEMANDED falls (Qe→Qd). Qs − Qd is EXCESS SUPPLY (SURPLUS). Consequences: unsold stockpiles, government buy-ups, dumping. CONSUMER SURPLUS falls; PRODUCER SURPLUS effect depends on whether government buys surplus. DEADWEIGHT LOSS triangle emerges between Qd and Qe.",
    keyTerms: ["price floor", "minimum price", "excess supply", "surplus", "consumer surplus", "producer surplus", "deadweight loss", "farmer protection"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "S (upward) and D (downward) with equilibrium Pe, Qe marked", marks: 1 },
      { requirement: "Horizontal Pmin line ABOVE equilibrium", marks: 1 },
      { requirement: "Qd (demand at Pmin) and Qs (supply at Pmin); excess supply bracket labelled", marks: 2 },
      { requirement: "Written explanation covers CS falling, PS effect, deadweight loss", marks: 1 },
    ],
  },
  {
    slug: "ib-keynesian-spare-vs-full",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Macroeconomics",
    marks: 6,
    title: "Keynesian AS · Spare Capacity vs Full Employment",
    scenario:
      "Spain is currently experiencing significant spare capacity: 11.5% unemployment and low consumer confidence. The government plans a large fiscal stimulus to raise AD.",
    question:
      "Using a Keynesian AS diagram, explain how an increase in AD affects Spain's Real GDP and Average Price Level when operating at a LOW level of output, compared to when approaching Full Employment (Yfe).",
    figureFile: "/figures/ib-keynesian-spare-full.svg",
    explanation:
      "The Keynesian AS has THREE sections: HORIZONTAL (spare capacity) · AD shift → output rises, price unchanged; INTERMEDIATE (bottlenecks) · both Y and P rise; VERTICAL (full employment Yfe) · AD shift → ALL effect on price, no output response. In Spain's current position: fiscal stimulus shifts AD right along horizontal section, Real GDP rises, price unchanged. At Yfe: AD shift raises price but leaves output stuck · pure inflation.",
    keyTerms: ["Keynesian AS", "spare capacity", "full employment", "horizontal section", "vertical section", "bottlenecks", "Yfe", "fiscal stimulus"],
    diagramRequirements: [
      { requirement: "TWO side-by-side panels (Spare Capacity | Full Capacity)", marks: 1 },
      { requirement: "Each panel labels Price Level and Real Output axes", marks: 1 },
      { requirement: "Spare Capacity panel: AD shifts right along horizontal AS · Y↑ with P unchanged", marks: 2 },
      { requirement: "Full Capacity panel: vertical AS at Yfe; AD shifts right → P↑ with Y unchanged", marks: 1 },
      { requirement: "Written explanation contrasts the two cases", marks: 1 },
    ],
  },
  {
    slug: "ib-monopoly-profit-max",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Monopoly · Profit Maximisation (MC=MR)",
    scenario:
      "Pharmaceutical firm HealthGen has a 20-year patent on a new life-saving drug · sole provider. Objective: maximise abnormal profit.",
    question:
      "Using a monopoly diagram, explain how HealthGen determines its profit-maximising output and price. You must: draw and label a monopoly diagram; identify Q1 and P1; shade abnormal profit; explain why the firm chooses MC = MR output.",
    figureFile: "/figures/ib-monopoly-profitmax.svg",
    explanation:
      "A monopolist faces the entire market demand curve (D = AR, downward-sloping). MR lies BELOW AR. Profit max rule: produce where MC = MR. At Q1, the firm reads price up to AR at P1. AC at Q1 is below P1. ABNORMAL PROFIT = (P1 − AC) × Q1 · the shaded rectangle. Patent protection is a barrier to entry, so abnormal profit persists in the long run.",
    keyTerms: ["monopoly", "profit maximisation", "MC = MR", "AR", "MR", "AC", "abnormal profit", "barriers to entry", "patent"],
    diagramRequirements: [
      { requirement: "Axes labelled Price/Cost and Output", marks: 1 },
      { requirement: "D = AR (downward), MR (steeper, below AR), MC (U), AC (U) drawn and labelled", marks: 2 },
      { requirement: "Profit-max point at MC = MR with Q1 marked; P1 read up to AR at Q1", marks: 1 },
      { requirement: "AC at Q1 identified below P1; abnormal profit rectangle shaded", marks: 1 },
      { requirement: "Written explanation covers MC=MR rule + patent as barrier → long-run profit", marks: 1 },
    ],
  },
  {
    slug: "ib-perfect-comp-lr-kale",
    board: "IB HL/SL",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Perfect Competition · Short Run & Long Run",
    scenario:
      "UK organic kale market is near-perfectly competitive: many small producers, homogeneous product. 2021–23 health-food demand surge produced abnormal profits for existing farmers in the short run.",
    question:
      "Using a perfect competition diagram, draw and annotate the transition from short-run abnormal profit to long-run equilibrium. You must: 1) draw market and firm side-by-side; 2) label initial SR price P1 and output q1; 3) show new-firm entry shifting market supply; 4) identify LR equilibrium P2, q2 at normal profit; 5) explain the adjustment process.",
    figureFile: "/figures/ib-pc-lr-kale.svg",
    explanation:
      "TWO PANELS. Market: D shifts right (demand surge), price rises to P1. Firm (price-taker): AR=MR horizontal at P1. Firm produces where MC = MR at q1, earning abnormal profit (P1 − ATC at q1) × q1. LONG RUN: freedom of entry → new farmers enter, market supply shifts RIGHT (S1→S2). Price falls to min ATC = P2. Firm produces at q2 where MC = MR = min ATC, earning only NORMAL PROFIT. P = MC = min AC → productive AND allocative efficiency.",
    keyTerms: ["perfect competition", "price taker", "abnormal profit", "normal profit", "freedom of entry", "perfect information", "min ATC", "long-run equilibrium", "supply shift"],
    diagramRequirements: [
      { requirement: "Two-panel diagram: Firm (left) and Market (right), both axes labelled", marks: 2 },
      { requirement: "Market panel: D1/D2 and S1/S2 shifts shown", marks: 1 },
      { requirement: "Firm panel: MC, ATC (U-shape); AR=MR horizontal at P1 (SR) and P2 = min ATC (LR)", marks: 1 },
      { requirement: "SR abnormal profit rectangle shaded; LR: no profit at min ATC", marks: 1 },
      { requirement: "Written explanation of entry + supply-shift mechanism leading to normal profit", marks: 1 },
    ],
  },

  // ── Advanced [8 marks] ──
  {
    slug: "ib-indirect-tax-soda",
    board: "IB HL/SL",
    tier: "Advanced",
    section: "Microeconomics",
    marks: 8,
    title: "Indirect Tax (Ad Valorem / Specific)",
    scenario:
      "France has imposed a SPECIFIC indirect tax on sugar-sweetened beverages to address rising obesity rates. The tax is paid by producers but passed on to consumers through higher shelf prices.",
    question:
      "Using an appropriate diagram, explain how the imposition of a specific indirect tax on high-sugar soda producers affects market price, quantity traded, and tax incidence for consumers and producers. In your response you must:\n1. Draw and properly label a tax_incidence diagram.\n2. Show the shift in the supply curve and the vertical distance representing the tax.\n3. Identify areas representing consumer burden, producer burden, and government revenue.\n4. Explain the transition from initial to new equilibrium, referencing PED and PES in determining incidence.",
    figureFile: "/figures/ib-indirect-tax-soda.svg",
    explanation:
      "A specific indirect tax shifts the supply curve VERTICALLY UP by the tax amount (S → S1 = S + Tax). Initial equilibrium: (PE, QE) where S meets D. New equilibrium: (P1, Q1) where S1 meets D, with P1 > PE and Q1 < QE. Critical reference points: P1 = consumer price paid (at point W on D), A = price producer receives NET of tax (read off original S at Q1), vertical distance P1 − A = tax per unit. CONSUMER BURDEN (upper rectangle W-Y) = (P1 − PE) × Q1. PRODUCER BURDEN (lower rectangle Y-Z) = (PE − A) × Q1. GOVERNMENT REVENUE = consumer burden + producer burden = tax × Q1. The SPLIT depends on ELASTICITIES: the more INELASTIC side bears the GREATER burden. If PED < PES: consumer burden > producer burden · classic sin-tax result for soft drinks. Welfare implications: DEADWEIGHT LOSS triangle to the right of Q1. Policy justification rests on whether health gains from reduced soda consumption outweigh this deadweight loss · plausible given the negative consumption externality.",
    keyTerms: [
      "specific tax",
      "ad valorem",
      "indirect tax",
      "tax incidence",
      "consumer burden",
      "producer burden",
      "government revenue",
      "PED",
      "PES",
      "deadweight loss",
      "supply shift",
    ],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "Original supply S and demand D drawn with initial equilibrium PE, QE", marks: 1 },
      { requirement: "S shifts VERTICALLY UP to S1 by tax amount; both supply curves labelled", marks: 1 },
      { requirement: "New equilibrium P1, Q1 on S1 and D; P1 > PE and Q1 < QE", marks: 1 },
      { requirement: "Net producer price A on original S at Q1 marked; vertical bracket P1 − A = tax per unit", marks: 1 },
      { requirement: "Consumer burden rectangle AND Producer burden rectangle clearly shaded/labelled", marks: 2 },
      { requirement: "Written explanation links tax split to relative PED vs PES and identifies government revenue", marks: 1 },
    ],
  },
];
