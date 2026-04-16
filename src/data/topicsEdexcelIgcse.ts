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

  // ── Higher Tier (6 marks) ──────────────────────────────────────────
  {
    slug: "edxig-higher-demand-housing",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Supply & Demand — Shift in Demand",
    marks: 6,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "The UK government announced a new Help to Buy scheme in 2024, offering interest-free loans to first-time buyers. Simultaneously, net migration to London reached record levels, increasing the population by 350,000 in a single year. Housing supply in London is constrained by strict planning regulations and limited land availability.",
    question:
      "Using a demand and supply diagram, analyse the combined effect of the Help to Buy scheme and rising population on the equilibrium price and quantity of housing in London. Evaluate which factor is likely to have the greater impact on house prices.",
    figureFile: "/figures/edxig-demand-shift-ev.svg",
    explanation:
      "Both the Help to Buy scheme (easier access to credit) and rising population increase demand for housing. The demand curve shifts right from D₁ to D₂. Because housing supply is highly price inelastic in the short run (planning restrictions, long construction times), the rightward demand shift leads to a large rise in price (P₁ → P₂) but only a small increase in quantity (Q₁ → Q₂). The population effect is likely larger because it represents a sustained, structural increase in demand, whereas Help to Buy is a temporary policy stimulus. London house prices rose 12% in 2021–2023 despite multiple demand-side interventions, suggesting supply-side constraints dominate.",
    keyTerms: ["price inelastic supply", "derived demand", "population growth", "credit availability", "planning restrictions", "structural demand"],
    diagramRequirements: [
      { requirement: "Draw a demand and supply diagram with correctly labelled axes (Price, Quantity of Housing)", marks: 1 },
      { requirement: "Show the demand curve shifting to the right (D₁ → D₂)", marks: 1 },
      { requirement: "Label both equilibrium positions (P₁, Q₁) and (P₂, Q₂)", marks: 1 },
      { requirement: "Explain how both factors (credit access + population) shift demand right", marks: 1 },
      { requirement: "Note that inelastic supply amplifies the price rise relative to quantity change", marks: 1 },
      { requirement: "Evaluate which factor has greater long-term impact on equilibrium price", marks: 1 },
    ],
    scenarioVariant: "London Housing Market — Dual Demand Pressures with Inelastic Supply",
  },
  {
    slug: "edxig-higher-supply-semiconductors",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Supply & Demand — Shift in Supply",
    marks: 6,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "In 2021, a global semiconductor shortage disrupted manufacturing across the automotive and electronics industries. Major chip fabrication plants in Taiwan were operating at full capacity, and a drought reduced water supplies critical for chip production. Simultaneously, demand for consumer electronics surged as remote working became widespread.",
    question:
      "Using a supply and demand diagram, analyse the effect of the semiconductor shortage on the market for new cars. Explain the impact on equilibrium price and quantity, and evaluate whether the price increase is likely to be temporary or persistent.",
    figureFile: "/figures/edxig-supply-shift-coffee.svg",
    explanation:
      "Semiconductors are a key input in modern car manufacturing. The shortage raises production costs and limits the number of cars that can be produced — the supply curve shifts left from S₁ to S₂. At the original price P₁, there is now excess demand. The equilibrium price rises to P₂ and quantity falls to Q₂. The price increase may be persistent because: (1) building new chip fabrication plants takes 3–5 years and costs $10bn+; (2) the automotive industry is increasingly reliant on chips (EVs use 3× more chips than ICE vehicles); (3) geopolitical tensions around Taiwan create ongoing supply uncertainty. However, if new capacity comes online (TSMC Arizona, Intel Ohio), supply could shift back right, making the price rise temporary.",
    keyTerms: ["cost of production", "input shortage", "supply chain disruption", "excess demand", "derived demand", "capacity constraints"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram with correctly labelled axes", marks: 1 },
      { requirement: "Shift the supply curve to the left (S₁ → S₂) due to input shortage", marks: 1 },
      { requirement: "Label both equilibrium positions showing higher P₂ and lower Q₂", marks: 1 },
      { requirement: "Explain the chain: chip shortage → ↑ costs → ↓ supply → ↑P, ↓Q", marks: 1 },
      { requirement: "Discuss whether the price change is temporary or persistent with reasoning", marks: 1 },
      { requirement: "Reference real-world evidence (e.g. new fab construction timelines)", marks: 1 },
    ],
    scenarioVariant: "Global Semiconductor Shortage — Impact on New Car Market",
  },
  {
    slug: "edxig-higher-ad-fiscal-stimulus",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "AD/AS — Demand-Side Shock",
    marks: 6,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "In response to a severe economic downturn, the US government launched a $1.9 trillion fiscal stimulus package in 2021 (the American Rescue Plan). This included direct payments of $1,400 to most households, extended unemployment benefits, and increased federal spending on infrastructure. At the time, supply chains were still disrupted from the pandemic.",
    question:
      "Using an AD/AS diagram, analyse the effect of this fiscal stimulus on the US price level and Real GDP. Evaluate whether the stimulus was more likely to cause demand-pull inflation or genuine economic recovery.",
    figureFile: "/figures/edxig-ad-shock-uk.svg",
    explanation:
      "The fiscal stimulus directly increases Government spending (G) and boosts Consumption (C) through household transfers. Both are components of AD = C + I + G + (X − M), so AD shifts right from AD₁ to AD₂. With supply chains still disrupted (SRAS relatively inelastic), the rightward AD shift leads to a significant rise in the price level (P₁ → P₂) alongside a moderate increase in Real GDP (Y₁ → Y₂). The outcome depends on the position on the AS curve: if the economy has spare capacity, the stimulus primarily raises output (recovery); if near full employment, it primarily raises prices (demand-pull inflation). US inflation rose from 1.4% to 9.1% between January 2021 and June 2022, suggesting the economy was closer to capacity than policymakers assumed.",
    keyTerms: ["fiscal policy", "government spending (G)", "demand-pull inflation", "spare capacity", "multiplier effect", "output gap"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with initial equilibrium at P₁, Y₁", marks: 1 },
      { requirement: "Show AD shifting to the right (AD₁ → AD₂) due to fiscal stimulus", marks: 1 },
      { requirement: "Label the new equilibrium (P₂, Y₂)", marks: 1 },
      { requirement: "Explain the transmission mechanism: ↑G + ↑C → ↑AD", marks: 1 },
      { requirement: "Evaluate whether outcome is inflationary or growth-enhancing", marks: 1 },
      { requirement: "Reference the role of spare capacity in determining the split between ↑P and ↑Y", marks: 1 },
    ],
    scenarioVariant: "US Fiscal Stimulus 2021 — Demand-Pull vs Recovery Debate",
  },
  {
    slug: "edxig-higher-sras-wages",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "AD/AS — Supply-Side Shock",
    marks: 6,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "In 2023, the UK National Living Wage increased by 9.7% — from £9.50 to £10.42 per hour. This affected approximately 2.5 million workers. At the same time, energy prices remained elevated following the 2022 gas crisis, and food price inflation reached 19.2%.",
    question:
      "Using an AD/AS diagram, analyse the combined effect of rising wages and elevated energy costs on the UK's price level and Real GDP. Discuss whether this represents cost-push inflation or a wage-price spiral.",
    figureFile: "/figures/edxig-sras-shock-nigeria.svg",
    explanation:
      "Rising wages increase firms' labour costs, while elevated energy prices raise transport and production costs. Both are supply-side shocks that shift SRAS left from SRAS₁ to SRAS₂. The new equilibrium has a higher price level (P₂) and lower Real GDP (Y₂) — classic stagflation. This is cost-push inflation because the price rise originates from the supply side (higher input costs), not from excess demand. A wage-price spiral risk exists if workers demand further wage rises to compensate for higher prices, which then raises costs further, shifting SRAS left again. The Bank of England raised interest rates to 5.25% to anchor inflation expectations and prevent this spiral from becoming embedded.",
    keyTerms: ["cost-push inflation", "wage-price spiral", "stagflation", "National Living Wage", "input costs", "inflation expectations"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with initial equilibrium at P₁, Y₁", marks: 1 },
      { requirement: "Show SRAS shifting left (SRAS₁ → SRAS₂) due to dual cost pressures", marks: 1 },
      { requirement: "Label the new equilibrium showing ↑P₂ and ↓Y₂", marks: 1 },
      { requirement: "Explain the transmission: ↑wages + ↑energy → ↑costs → ↓SRAS", marks: 1 },
      { requirement: "Distinguish between cost-push inflation and demand-pull inflation", marks: 1 },
      { requirement: "Evaluate the risk of a wage-price spiral with reference to monetary policy", marks: 1 },
    ],
    scenarioVariant: "UK Wage & Energy Cost Pressures — Cost-Push vs Wage-Price Spiral",
  },
  {
    slug: "edxig-higher-lras-education",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "AD/AS — Economic Growth (LRAS Shift)",
    marks: 6,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "Rwanda has invested heavily in education and healthcare over the past two decades. The adult literacy rate rose from 58% in 2000 to 73% by 2022. Life expectancy increased from 48 to 69 years. The government also introduced a universal healthcare programme and expanded access to vocational training in ICT and agriculture.",
    question:
      "Using an AD/AS diagram, analyse how investment in human capital has affected Rwanda's long-run productive capacity. Evaluate the extent to which education alone can drive sustained economic growth in a developing economy.",
    figureFile: "/figures/edxig-lras-shift-malaysia.svg",
    explanation:
      "Investment in education and healthcare improves human capital — the quality of the labour force increases through higher skills, better health, and greater productivity. This raises the economy's productive potential, shifting LRAS right from LRAS₁ to LRAS₂. Real GDP increases from Y₁ to Y₂, while the price level may fall (P₁ → P₂), representing non-inflationary growth. However, education alone may be insufficient: Rwanda also needs physical capital investment (roads, factories), stable institutions, property rights, and access to international markets. The time lag between education spending and productivity gains can be 10–20 years. Rwanda's GDP per capita grew from $220 to $820 between 2000–2022, but it remains heavily dependent on foreign aid (approximately 40% of government budget).",
    keyTerms: ["human capital", "productive capacity", "non-inflationary growth", "labour productivity", "developing economy", "time lags"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with LRAS₁ and initial equilibrium", marks: 1 },
      { requirement: "Show LRAS shifting right (LRAS₁ → LRAS₂) due to human capital improvement", marks: 1 },
      { requirement: "Label the new equilibrium showing higher Y₂ and lower P₂", marks: 1 },
      { requirement: "Explain the link: education → ↑human capital → ↑productivity → ↑LRAS", marks: 1 },
      { requirement: "Evaluate limitations of education-only growth strategy", marks: 1 },
      { requirement: "Reference real-world evidence from Rwanda or similar developing economy", marks: 1 },
    ],
    scenarioVariant: "Rwanda Human Capital Investment — Limits of Education-Led Growth",
  },
  {
    slug: "edxig-higher-labour-minimum-wage",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Labour Market — Wage Determination",
    marks: 6,
    title: "Labour Market — Wage Determination",
    scenario:
      "The UK government is considering raising the National Living Wage to £12 per hour for workers aged 23 and over. Critics argue this will lead to job losses in low-margin sectors such as hospitality, retail, and social care. Supporters argue it will reduce in-work poverty and boost consumer spending.",
    question:
      "Using a labour market diagram, analyse the effect of a minimum wage set above the equilibrium wage on the level of employment and unemployment in the hospitality sector. Evaluate whether the benefits of a higher minimum wage outweigh the costs.",
    figureFile: "/figures/edxig-labour-tech.svg",
    explanation:
      "A minimum wage set above the free-market equilibrium creates a price floor in the labour market. At the minimum wage (Wmin > W₁), the quantity of labour supplied (Qs) exceeds the quantity demanded (Qd), creating excess supply — unemployment of Qs − Qd. In hospitality, where profit margins are thin (typically 3–9%) and labour costs represent 30–40% of total costs, firms may respond by reducing hours, automating, or hiring fewer workers. However, monopsony theory suggests that if employers have wage-setting power, a moderate minimum wage increase can actually increase employment by counteracting the firm's tendency to suppress wages below the competitive level. The net effect depends on the elasticity of demand for labour: if demand is inelastic (workers are hard to replace), the unemployment effect is small.",
    keyTerms: ["minimum wage", "price floor", "excess supply of labour", "unemployment", "monopsony", "elasticity of demand for labour"],
    diagramRequirements: [
      { requirement: "Draw a labour market diagram with wage on y-axis and quantity on x-axis", marks: 1 },
      { requirement: "Show the equilibrium wage (W₁) and a minimum wage line above it (Wmin)", marks: 1 },
      { requirement: "Identify the excess supply of labour (unemployment gap: Qs − Qd)", marks: 1 },
      { requirement: "Explain why the minimum wage causes unemployment in the standard model", marks: 1 },
      { requirement: "Evaluate using monopsony theory or elasticity arguments", marks: 1 },
      { requirement: "Discuss the trade-off between reducing poverty and risking job losses", marks: 1 },
    ],
    scenarioVariant: "UK National Living Wage Rise — Employment vs Poverty Trade-Off",
  },

  // ── Higher-only topics (new sections) ──────────────────────────────
  {
    slug: "edxig-higher-indirect-tax-sugar",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Government Intervention — Indirect Tax",
    marks: 6,
    title: "Government Intervention — Indirect Tax",
    scenario:
      "In 2018, the UK introduced the Soft Drinks Industry Levy (SDIL), commonly known as the 'sugar tax'. Drinks containing more than 8g of sugar per 100ml were taxed at 24p per litre, while those with 5–8g were taxed at 18p per litre. The tax aimed to reduce sugar consumption and tackle rising obesity rates, particularly among children.",
    question:
      "Using a supply and demand diagram, analyse the impact of the sugar tax on the market for sugary drinks. Show the tax wedge, explain how the burden is shared between consumers and producers, and evaluate the effectiveness of the tax in reducing sugar consumption.",
    figureFile: "/figures/edxig-supply-shift-coffee.svg",
    explanation:
      "The specific tax raises sellers' costs by a fixed amount per unit, shifting the supply curve left (upward) from S₁ to S₂ by the amount of the tax. The new equilibrium has a higher consumer price (P₂) and lower quantity (Q₂). The tax wedge is the vertical distance between S₁ and S₂, split between consumers (who pay P₂ instead of P₁) and producers (who receive P_prod < P₁). The incidence depends on relative elasticities: if demand is inelastic (habitual consumption), consumers bear a larger share. Evidence suggests the SDIL was partially effective — many manufacturers reformulated drinks to fall below the tax threshold (60% of drinks were reformulated by 2020), reducing average sugar content by 44%. However, overall sugar consumption from other sources remained high, suggesting the tax alone is insufficient.",
    keyTerms: ["specific tax", "tax incidence", "consumer burden", "producer burden", "price elasticity of demand", "reformulation"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram with correctly labelled axes", marks: 1 },
      { requirement: "Show supply shifting left/upward by the tax amount (S₁ → S₂)", marks: 1 },
      { requirement: "Identify the tax wedge and label P₂ (consumer price) and P_prod (producer price)", marks: 1 },
      { requirement: "Explain how PED determines the consumer vs producer burden split", marks: 1 },
      { requirement: "Evaluate effectiveness using evidence (reformulation, substitution)", marks: 1 },
      { requirement: "Discuss limitations of the tax as a standalone policy", marks: 1 },
    ],
    scenarioVariant: "UK Sugar Tax (SDIL) — Tax Incidence and Effectiveness",
  },
  {
    slug: "edxig-higher-negative-externality-fast-fashion",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Market Failure — Negative Externality",
    marks: 6,
    title: "Market Failure — Negative Externality",
    scenario:
      "The fast fashion industry produces approximately 92 million tonnes of textile waste per year globally. Manufacturing processes release toxic chemicals into water systems, and carbon emissions from the industry account for 10% of global CO₂ output. Consumers benefit from cheap clothing but do not pay for the environmental damage caused during production.",
    question:
      "Using an externality diagram with MPC, MSC, and MPB curves, explain why the free market overproduces fast fashion relative to the socially optimal level. Identify the deadweight welfare loss and evaluate one government policy that could correct this market failure.",
    figureFile: "/figures/edxig-sras-shock-nigeria.svg",
    explanation:
      "Fast fashion firms consider only their private costs (MPC = labour, materials, transport) when setting output. The true social cost (MSC) includes pollution, water contamination, and carbon emissions — MSC lies above MPC. The free market produces at Q₁ where MPC = MPB, but the socially optimal output is Q* where MSC = MPB, with Q* < Q₁. Between Q* and Q₁, each additional unit produced imposes more social cost than private benefit — the shaded triangle is the deadweight welfare loss (DWL). Policy options include: (1) a carbon tax on textile manufacturers to internalise the externality; (2) regulation setting maximum pollution limits; (3) tradeable pollution permits. A carbon tax of £15 per tonne (as proposed by the EU) would shift MPC up toward MSC, reducing output toward Q*. However, enforcement across global supply chains is challenging, and consumers may simply switch to cheaper non-taxed imports.",
    keyTerms: ["marginal private cost (MPC)", "marginal social cost (MSC)", "deadweight welfare loss", "negative production externality", "Pigouvian tax", "internalise the externality"],
    diagramRequirements: [
      { requirement: "Draw an externality diagram with MPC, MSC above MPC, and MPB = D", marks: 1 },
      { requirement: "Identify the free-market equilibrium (Q₁) at MPC = MPB", marks: 1 },
      { requirement: "Identify the social optimum (Q*) at MSC = MPB", marks: 1 },
      { requirement: "Shade the deadweight welfare loss triangle between Q* and Q₁", marks: 1 },
      { requirement: "Explain why over-production occurs (firms ignore external costs)", marks: 1 },
      { requirement: "Evaluate one corrective policy with advantages and limitations", marks: 1 },
    ],
    scenarioVariant: "Fast Fashion Pollution — Overproduction and Environmental Externalities",
  },
  {
    slug: "edxig-higher-ped-revenue-streaming",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Elasticity — PED and Revenue",
    marks: 6,
    title: "Elasticity — PED and Revenue",
    scenario:
      "Netflix raised its standard subscription price from £10.99 to £12.99 per month in the UK in 2023. Market research suggests that demand for Netflix is relatively price inelastic in the short run (|PED| ≈ 0.5) because consumers are locked into viewing habits. However, in the long run, demand becomes more elastic (|PED| ≈ 1.8) as consumers have time to switch to competing services like Disney+, Amazon Prime, and free ad-supported platforms.",
    question:
      "Using a demand diagram, explain the relationship between PED and total revenue. Analyse the short-run and long-run effects of the Netflix price increase on total revenue. Evaluate whether the price increase was a good business decision.",
    figureFile: "/figures/edxig-demand-shift-ev.svg",
    explanation:
      "When demand is price inelastic (|PED| < 1), a price increase leads to a proportionally smaller fall in quantity demanded, so total revenue rises. In the short run, Netflix's price rise from £10.99 to £12.99 (an 18% increase) causes only a ~9% fall in subscribers (|PED| = 0.5), so TR rises: the revenue gained from higher price per subscriber exceeds the revenue lost from fewer subscribers. However, in the long run (|PED| = 1.8), the same price difference causes a proportionally larger subscriber loss as consumers switch to substitutes. Now the revenue lost from departing subscribers exceeds the revenue gained from the price rise — TR falls. Netflix lost 1.2 million subscribers globally in Q1-Q2 2022 after previous price increases. The optimal strategy is to price where |PED| = 1 (unit elastic), maximising total revenue.",
    keyTerms: ["price elasticity of demand (PED)", "total revenue", "inelastic demand", "elastic demand", "unit elastic", "substitutes"],
    diagramRequirements: [
      { requirement: "Draw a demand curve with price on y-axis and quantity on x-axis", marks: 1 },
      { requirement: "Mark the original price/quantity (P₁, Q₁) and new price/quantity (P₂, Q₂)", marks: 1 },
      { requirement: "Show revenue gained (higher price on remaining subscribers) and revenue lost (lost subscribers)", marks: 1 },
      { requirement: "Explain why TR rises when |PED| < 1 (inelastic — short run)", marks: 1 },
      { requirement: "Explain why TR falls when |PED| > 1 (elastic — long run)", marks: 1 },
      { requirement: "Evaluate the decision with reference to time horizon and availability of substitutes", marks: 1 },
    ],
    scenarioVariant: "Netflix Price Increase — Short-Run vs Long-Run Revenue Effects",
  },
];
