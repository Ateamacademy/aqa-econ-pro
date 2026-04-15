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

  // ── Higher (6 marks) ────────────────────────────────────────
  {
    slug: "caie-indirect-tax-cigarettes",
    board: "CAIE-IGCSE",
    tier: "Higher",
    section: "Government Intervention — Indirect Tax",
    marks: 6,
    title: "Government Intervention — Indirect Tax",
    scenario:
      "The government of a developing country introduces a specific tax on cigarettes to reduce smoking rates and raise revenue for public health services. Prior to the tax, the market was in equilibrium at price P1 and quantity Q1.",
    question:
      "Using a supply and demand diagram, analyse the impact of a specific indirect tax on the market for cigarettes. In your answer, show the tax wedge, identify the new equilibrium, and explain how the tax burden is shared between consumers and producers. Discuss whether the tax is likely to significantly reduce smoking.",
    figureFile: "/figures/caie-indirect-tax.svg",
    explanation:
      "A specific tax adds a fixed amount to each unit's cost of production, shifting the supply curve upward (parallel) from S to S + Tax. The new equilibrium sits at a higher consumer price (P2) and lower quantity (Q2). The vertical gap between P2 and P_prod is the tax wedge — government revenue per unit. Consumer incidence = P2 − P1; producer incidence = P1 − P_prod. Because demand for cigarettes is highly price inelastic (addictive good), consumers bear most of the tax burden and quantity falls only slightly — the tax raises substantial revenue but may not significantly reduce consumption.",
    keyTerms: ["indirect tax", "specific tax", "tax incidence", "tax wedge", "price inelasticity"],
    diagramRequirements: [
      { requirement: "Correctly labelled diagram showing S → S + Tax shift and new equilibrium (P2, Q2)", marks: 2 },
      { requirement: "Clear identification of tax wedge (P2 − P_prod) and government revenue area", marks: 2 },
      { requirement: "Analysis of consumer vs producer burden and link to PED of cigarettes", marks: 2 },
    ],
    scenarioVariant: "Specific Tax on Cigarettes in a Developing Country",
  },
  {
    slug: "caie-neg-ext-copper-mining",
    board: "CAIE-IGCSE",
    tier: "Higher",
    section: "Market Failure — Negative Externality",
    marks: 6,
    title: "Market Failure — Negative Externality",
    scenario:
      "A large copper mining company in Zambia produces significant water and air pollution that affects local communities. The private costs of production (MPC) do not include the environmental and health costs imposed on third parties.",
    question:
      "Using an externality diagram with MPC, MSC, and MPB curves, explain why the free market over-produces copper relative to the socially optimal level. Identify the deadweight welfare loss and suggest one government policy to correct this market failure.",
    figureFile: "/figures/caie-neg-ext-copper.svg",
    explanation:
      "Copper mining creates negative externalities (water pollution, respiratory illness) that impose costs on third parties not involved in the transaction. MSC > MPC at every output level — the gap is the external cost per unit. The free market produces at Qm (where MPB = MPC), but the socially optimal output is Q* (where MSB = MSC). Over-production of Qm − Q* units creates a deadweight welfare loss (the shaded triangle). Government could impose a Pigouvian tax equal to the external cost at Q*, shifting MPC up to MSC and internalising the externality.",
    keyTerms: ["negative externality", "MSC", "MPC", "deadweight welfare loss", "Pigouvian tax"],
    diagramRequirements: [
      { requirement: "Draw MPC, MSC, and MPB/MSB with correct relative positions (MSC above MPC)", marks: 2 },
      { requirement: "Identify free market output (Qm) and socially optimal output (Q*) with DWL", marks: 2 },
      { requirement: "Explain external cost and suggest a corrective policy (e.g. tax, regulation)", marks: 2 },
    ],
    scenarioVariant: "Copper Mining Pollution in Zambia",
  },
  {
    slug: "caie-pos-ext-vaccines",
    board: "CAIE-IGCSE",
    tier: "Higher",
    section: "Market Failure — Positive Externality",
    marks: 6,
    title: "Market Failure — Positive Externality",
    scenario:
      "The World Health Organisation (WHO) recommends that all children receive vaccinations against measles. Vaccination creates benefits not only for the individual (private benefit) but also for the wider community through herd immunity (external benefit).",
    question:
      "Using an externality diagram, explain why the free market is likely to under-provide vaccinations. Show the difference between the free market and socially optimal outcomes, and suggest one policy the government could use to increase vaccination rates.",
    figureFile: "/figures/caie-pos-ext-vaccines.svg",
    explanation:
      "Vaccination creates positive externalities — herd immunity protects unvaccinated individuals, reducing disease transmission. MSB > MPB at every quantity. The free market produces at Qm (where MPB = MPC), but the socially optimal output is Q* (where MSB = MSC). The gap Qm to Q* represents under-consumption — a welfare loss. Government can subsidise vaccines (shifting MPC down to encourage consumption to Q*), provide them free through the NHS, or mandate vaccination for school entry.",
    keyTerms: ["positive externality", "MSB", "MPB", "under-consumption", "merit good"],
    diagramRequirements: [
      { requirement: "Draw MPC/MSC, MPB, and MSB with correct positions (MSB above MPB)", marks: 2 },
      { requirement: "Identify free market output (Qm) vs socially optimal output (Q*)", marks: 2 },
      { requirement: "Explain external benefit and suggest a corrective policy (subsidy, provision)", marks: 2 },
    ],
    scenarioVariant: "Childhood Vaccination and Herd Immunity",
  },
  {
    slug: "caie-perfect-comp-sr",
    board: "CAIE-IGCSE",
    tier: "Higher",
    section: "Market Structure — Perfect Competition",
    marks: 6,
    title: "Market Structure — Perfect Competition",
    scenario:
      "A small wheat farmer operates in a perfectly competitive market. In the short run, the market price is above the farmer's average total cost (ATC), allowing the firm to earn abnormal profit.",
    question:
      "Using a diagram showing MC, ATC, and AR/MR, explain how a perfectly competitive firm determines its profit-maximising output in the short run. Show the area of abnormal profit and explain why this profit cannot persist in the long run.",
    figureFile: "/figures/caie-perfect-competition.svg",
    explanation:
      "The firm is a price taker — it faces a perfectly elastic demand curve at the market price (AR = MR = P). Profit is maximised where MC = MR, giving output Q*. At Q*, AR > ATC, so the firm earns abnormal (supernormal) profit — the shaded rectangle between AR and ATC over the range 0 to Q*. In the long run, abnormal profit attracts new entrants → market supply increases → market price falls until AR = ATC and only normal profit remains. This is allocative efficiency: P = MC at long-run equilibrium.",
    keyTerms: ["perfect competition", "abnormal profit", "MC = MR rule", "price taker", "allocative efficiency"],
    diagramRequirements: [
      { requirement: "Draw MC, ATC curves and horizontal AR = MR = P line", marks: 2 },
      { requirement: "Identify profit-maximising output (Q*) where MC = MR and shade abnormal profit", marks: 2 },
      { requirement: "Explain long-run adjustment: entry of firms, price falls to ATC, normal profit only", marks: 2 },
    ],
    scenarioVariant: "Wheat Farming — Short-Run Abnormal Profit",
  },
  {
    slug: "caie-price-discrimination-airlines",
    board: "CAIE-IGCSE",
    tier: "Higher",
    section: "Market Structure — Price Discrimination",
    marks: 6,
    title: "Market Structure — Price Discrimination",
    scenario:
      "A major airline charges business travellers significantly higher fares than leisure travellers for the same flight. Business travellers have inelastic demand (they must travel for work), while leisure travellers have elastic demand (they can choose alternative holidays).",
    question:
      "Using diagrams for two separate markets, explain how third-degree price discrimination works. Show why the airline charges a higher price to business travellers and a lower price to leisure travellers. Discuss the conditions necessary for price discrimination to be successful.",
    figureFile: "/figures/caie-price-discrimination.svg",
    explanation:
      "Third-degree price discrimination involves charging different prices to different groups of consumers for the same product. The airline segments the market by PED: business travellers (inelastic demand → steep curve → higher fare P_b) and leisure travellers (elastic demand → flat curve → lower fare P_l). The firm sets MR = MC in each market. Conditions required: (1) market power (price maker), (2) ability to separate markets (prevent resale between groups), (3) different PED between groups. The firm increases total revenue compared to charging a single price.",
    keyTerms: ["price discrimination", "third-degree", "PED", "market power", "consumer surplus"],
    diagramRequirements: [
      { requirement: "Draw two market diagrams showing different demand elasticities (steep vs flat)", marks: 2 },
      { requirement: "Show higher price in inelastic market (P_b) and lower price in elastic market (P_l)", marks: 2 },
      { requirement: "Explain conditions for price discrimination and its effect on revenue", marks: 2 },
    ],
    scenarioVariant: "Airline Pricing — Business vs Leisure Travellers",
  },
  {
    slug: "caie-ped-revenue-elastic",
    board: "CAIE-IGCSE",
    tier: "Higher",
    section: "Elasticity — PED and Revenue",
    marks: 6,
    title: "Elasticity — PED and Revenue",
    scenario:
      "A supermarket chain is considering whether to reduce the price of its branded smartphones. Market research suggests that the demand for these smartphones is price elastic (|PED| > 1), meaning consumers are highly responsive to price changes.",
    question:
      "Using a diagram, explain the relationship between price elasticity of demand and total revenue. Show what happens to total revenue when the supermarket reduces the price of smartphones. Identify the areas of revenue gained and revenue lost on your diagram.",
    figureFile: "/figures/caie-ped-elastic.svg",
    explanation:
      "When |PED| > 1, the percentage change in quantity demanded exceeds the percentage change in price. A price cut from P1 to P2 causes a proportionally larger increase in quantity from Q1 to Q2. Revenue lost (on existing units sold at a lower price) is smaller than revenue gained (from the large increase in units sold). Net effect: total revenue rises. The diagram shows the red 'revenue lost' rectangle is smaller than the green 'revenue gained' rectangle. This is why firms with elastic demand should cut prices — and why firms with inelastic demand should raise prices — to maximise total revenue.",
    keyTerms: ["PED", "elastic demand", "total revenue", "revenue maximisation", "price strategy"],
    diagramRequirements: [
      { requirement: "Draw a relatively flat (elastic) demand curve with two price-quantity points", marks: 2 },
      { requirement: "Show and label revenue lost (red) and revenue gained (green) areas", marks: 2 },
      { requirement: "Explain why TR rises when price falls with elastic demand (|PED| > 1)", marks: 2 },
    ],
    scenarioVariant: "Smartphone Pricing — Elastic Demand and Revenue",
  },
];
