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

  // ── Higher Tier (6 marks) — all unique sections ─────────────────────
  {
    slug: "edxig-higher-max-price-rent",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Government Intervention — Maximum Price",
    marks: 6,
    title: "Government Intervention — Maximum Price",
    scenario:
      "In 2023, the Scottish Government introduced a rent freeze capping private rents at their September 2022 levels. This was a response to a cost-of-living crisis where average rents in Edinburgh rose by 13% year-on-year. Landlords argued the freeze would discourage new investment in rental properties, while tenant groups welcomed the protection from unaffordable rent increases.",
    question:
      "Using a supply and demand diagram, analyse the effect of a maximum price (rent ceiling) set below the free-market equilibrium on the rental housing market in Edinburgh. Evaluate the short-run and long-run consequences of the policy.",
    figureFile: "/figures/edxig-demand-shift-ev.svg",
    explanation:
      "A maximum price (Pmax) set below the equilibrium rent (P₁) creates a shortage: at Pmax, quantity demanded (Qd) exceeds quantity supplied (Qs). In the short run, tenants benefit from lower rents. However, in the long run: (1) landlords withdraw properties from the rental market or convert to short-term lets (Airbnb); (2) developers reduce new build-to-rent investment because expected returns fall below the cost of capital; (3) a black market may emerge where tenants pay key money or accept substandard conditions. Edinburgh saw a 40% fall in available rental listings within 6 months of the freeze. The policy protects existing tenants but harms those seeking new accommodation, creating winners and losers.",
    keyTerms: ["maximum price", "price ceiling", "shortage", "excess demand", "black market", "allocative inefficiency"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram with correctly labelled axes (Rent, Quantity of Housing)", marks: 1 },
      { requirement: "Show the free-market equilibrium (P₁, Q₁) and a maximum price line below it (Pmax)", marks: 1 },
      { requirement: "Identify the shortage: Qd − Qs at Pmax", marks: 1 },
      { requirement: "Explain why the maximum price creates excess demand", marks: 1 },
      { requirement: "Analyse the long-run supply-side consequences (landlord exit, reduced investment)", marks: 1 },
      { requirement: "Evaluate the trade-off between affordability for existing tenants and reduced availability", marks: 1 },
    ],
    scenarioVariant: "Edinburgh Rent Freeze — Maximum Price and Housing Shortage",
  },
  {
    slug: "edxig-higher-subsidy-evs",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Government Intervention — Subsidy",
    marks: 6,
    title: "Government Intervention — Subsidy",
    scenario:
      "The French government offers a €7,000 subsidy to consumers purchasing electric vehicles priced under €47,000. This 'bonus écologique' aims to accelerate the transition from petrol and diesel cars to reduce transport emissions. In 2023, French EV sales rose by 47% year-on-year. However, critics argue that the subsidy primarily benefits middle-income households who can already afford EVs, and that Chinese-made EVs are capturing a growing share of the subsidised market.",
    question:
      "Using a supply and demand diagram, analyse the effect of a consumer subsidy on the market for electric vehicles in France. Show the subsidy wedge, and evaluate whether the subsidy achieves its environmental objectives efficiently.",
    figureFile: "/figures/edxig-demand-shift-ev.svg",
    explanation:
      "A consumer subsidy effectively increases willingness to pay, shifting the demand curve right from D₁ to D₂ by the subsidy amount. The new equilibrium has higher quantity (Q₁ → Q₂) and higher market price (P₁ → P₂), though the effective price paid by consumers falls (P₂ − subsidy < P₁). The subsidy wedge is the vertical distance between D₂ and D₁ at the new quantity. The policy increases EV adoption, reducing CO₂ emissions from transport. However, concerns include: (1) deadweight loss if some recipients would have bought EVs anyway (windfall gains); (2) regressive distribution — lower-income households cannot afford EVs even with the subsidy; (3) trade leakage — subsidising imports from China doesn't create domestic jobs. The opportunity cost is the €1.2bn annual budget that could fund public transport or charging infrastructure instead.",
    keyTerms: ["subsidy", "consumer subsidy", "subsidy wedge", "deadweight loss", "opportunity cost", "market-based intervention"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram with correctly labelled axes", marks: 1 },
      { requirement: "Show demand shifting right due to subsidy (D₁ → D₂)", marks: 1 },
      { requirement: "Label original and new equilibrium, and the effective consumer price", marks: 1 },
      { requirement: "Explain the transmission mechanism: subsidy → ↑demand → ↑Q, ↑P", marks: 1 },
      { requirement: "Evaluate environmental effectiveness (CO₂ reduction vs deadweight loss)", marks: 1 },
      { requirement: "Discuss distributional concerns and opportunity cost of the subsidy", marks: 1 },
    ],
    scenarioVariant: "French EV Subsidy — Environmental Effectiveness and Equity",
  },
  {
    slug: "edxig-higher-pos-ext-vaccines",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Market Failure — Positive Externality",
    marks: 6,
    title: "Market Failure — Positive Externality",
    scenario:
      "The UK's childhood vaccination programme provides free immunisations against diseases including measles, whooping cough, and meningitis. In 2023, MMR vaccination rates fell to 85% in England — below the 95% threshold needed for herd immunity. Public health experts warned that low uptake could lead to measles outbreaks, as occurred in London in early 2024 with over 100 confirmed cases.",
    question:
      "Using an externality diagram with MPB, MSB, and MPC curves, explain why the free market under-provides vaccinations. Identify the welfare loss and evaluate one government policy to correct this market failure.",
    figureFile: "/figures/edxig-lras-shift-malaysia.svg",
    explanation:
      "Vaccinations generate positive externalities in consumption: the individual benefits (MPB — personal immunity) are less than the total social benefits (MSB — herd immunity, reduced NHS costs, lower transmission to vulnerable groups). MSB lies above MPB. The free market produces at Q₁ where MPC = MPB, but the socially optimal output is Q* where MPC = MSB, with Q* > Q₁. Between Q₁ and Q*, each additional vaccination creates more social benefit than it costs — the shaded triangle is the deadweight welfare loss from under-consumption. Government corrective policies include: (1) direct provision — free NHS vaccinations (eliminates price barrier); (2) advertising campaigns to increase perceived MPB; (3) mandating vaccinations for school entry (as in France and Italy). Free provision has been most effective historically, raising UK childhood vaccination rates above 95% until recent vaccine hesitancy reduced uptake.",
    keyTerms: ["positive externality", "marginal private benefit (MPB)", "marginal social benefit (MSB)", "under-consumption", "herd immunity", "merit good"],
    diagramRequirements: [
      { requirement: "Draw an externality diagram with MPB, MSB above MPB, and MPC = S", marks: 1 },
      { requirement: "Identify the free-market equilibrium (Q₁) at MPC = MPB", marks: 1 },
      { requirement: "Identify the social optimum (Q*) at MPC = MSB", marks: 1 },
      { requirement: "Shade the welfare loss triangle between Q₁ and Q*", marks: 1 },
      { requirement: "Explain why under-consumption occurs (individuals ignore external benefits)", marks: 1 },
      { requirement: "Evaluate one corrective policy with advantages and limitations", marks: 1 },
    ],
    scenarioVariant: "UK Childhood Vaccinations — Under-Provision and Herd Immunity",
  },
  {
    slug: "edxig-higher-keynesian-spare",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "AD/AS — Keynesian vs Classical",
    marks: 6,
    title: "AD/AS — Keynesian vs Classical",
    scenario:
      "During the 2020 recession, UK Real GDP fell by 9.7% — the largest annual decline in over 300 years. Unemployment rose to 5.2% and there was significant spare capacity across the economy. The government responded with £400 billion in fiscal support (furlough, business loans, grants). By late 2021, GDP had recovered to pre-pandemic levels, but inflation began rising sharply.",
    question:
      "Using a Keynesian AS diagram, analyse why the fiscal stimulus increased Real GDP with minimal inflation during the recession (spare capacity), but caused significant inflation once the economy approached full capacity. Explain the shape of the Keynesian AS curve.",
    figureFile: "/figures/edxig-ad-shock-uk.svg",
    explanation:
      "The Keynesian AS curve has three distinct sections: (1) a horizontal (perfectly elastic) section at low output — here, there is mass unemployment and spare capacity, so increases in AD raise output (Y) with no inflation; (2) an upward-sloping section as the economy approaches capacity — AD increases cause both ↑Y and ↑P as bottlenecks emerge; (3) a vertical section at full employment (Yfe) — further AD increases cause only inflation. In 2020, the UK was in the horizontal section — fiscal stimulus raised Y from Y₁ to Y₂ with P unchanged. By late 2021, the economy had moved into the upward-sloping section — continued demand growth pushed prices up (P₁ → P₂) alongside smaller GDP gains. This explains why the same policy (fiscal expansion) had different effects depending on the economy's position on the AS curve.",
    keyTerms: ["Keynesian AS curve", "spare capacity", "full employment", "demand-pull inflation", "output gap", "fiscal policy effectiveness"],
    diagramRequirements: [
      { requirement: "Draw a Keynesian AS curve with horizontal, upward-sloping, and vertical sections", marks: 1 },
      { requirement: "Show AD₁ intersecting in the horizontal (spare capacity) section", marks: 1 },
      { requirement: "Show AD₂ intersecting in the upward-sloping section (approaching capacity)", marks: 1 },
      { requirement: "Explain why ↑AD in spare capacity raises Y but not P", marks: 1 },
      { requirement: "Explain why ↑AD near full employment raises both Y and P", marks: 1 },
      { requirement: "Evaluate fiscal policy effectiveness at different points on the AS curve", marks: 1 },
    ],
    scenarioVariant: "UK 2020–2021 Recovery — Spare Capacity vs Inflationary Pressure",
  },
  {
    slug: "edxig-higher-commodity-volatility",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Supply & Demand — Price Volatility",
    marks: 6,
    title: "Supply & Demand — Price Volatility",
    scenario:
      "Global wheat prices doubled between June 2021 and March 2022, rising from $280 to $580 per tonne following Russia's invasion of Ukraine. Russia and Ukraine together account for approximately 30% of global wheat exports. The price spike caused food crises in import-dependent nations such as Egypt, Lebanon, and Somalia. By late 2023, prices had fallen back to $320 per tonne as alternative supply routes were established.",
    question:
      "Using supply and demand diagrams, analyse why agricultural commodity prices are particularly volatile. Explain how both supply-side shocks and demand inelasticity contribute to large price swings, and evaluate one policy that could reduce price volatility.",
    figureFile: "/figures/edxig-supply-shift-coffee.svg",
    explanation:
      "Agricultural commodity prices are volatile because: (1) Supply is price inelastic in the short run — crops take months to grow, so supply cannot respond quickly to price signals; (2) Supply shocks are frequent and unpredictable (war, weather, disease); (3) Demand is price inelastic — wheat is a staple food with no close substitutes, so consumers cannot easily reduce consumption when prices rise. When a supply-side shock shifts S left (S₁ → S₂), the combination of inelastic supply and inelastic demand magnifies the price change: a small reduction in quantity causes a very large rise in price (P₁ → P₂). The cobweb model explains price oscillations: high prices → farmers increase planting → over-supply next season → price crash → farmers reduce planting → under-supply → prices spike again. Buffer stock schemes (governments buy surplus at low prices, sell reserves at high prices) can stabilise prices but are expensive to operate and subject to storage costs and political manipulation.",
    keyTerms: ["price volatility", "inelastic demand", "inelastic supply", "supply shock", "cobweb model", "buffer stock scheme"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram with steep (inelastic) curves", marks: 1 },
      { requirement: "Show a leftward supply shift (S₁ → S₂) representing the Ukraine disruption", marks: 1 },
      { requirement: "Label the large price increase (P₁ → P₂) and small quantity decrease (Q₁ → Q₂)", marks: 1 },
      { requirement: "Explain why inelastic demand amplifies the price change", marks: 1 },
      { requirement: "Explain why inelastic supply prevents a quick market adjustment", marks: 1 },
      { requirement: "Evaluate one policy to reduce volatility (e.g. buffer stocks, diversification)", marks: 1 },
    ],
    scenarioVariant: "Global Wheat Crisis 2022 — Price Volatility and Food Security",
  },
  {
    slug: "edxig-higher-labour-monopsony",
    board: "Edexcel-IGCSE",
    tier: "Higher",
    section: "Labour Market — Monopsony Power",
    marks: 6,
    title: "Labour Market — Monopsony Power",
    scenario:
      "The UK social care sector employs approximately 1.5 million workers, but local authorities (councils) are often the dominant employer of care workers in their area. Care worker wages averaged £10.50 per hour in 2023 — barely above the National Living Wage of £10.42. High staff turnover (34% annually) and over 150,000 vacancies suggest wages are suppressed below the competitive level. Care workers have limited alternative employment options in many rural areas.",
    question:
      "Using a labour market diagram showing monopsony, analyse why care worker wages are below the competitive equilibrium. Explain the role of monopsony power and evaluate whether a minimum wage could increase both wages and employment in this market.",
    figureFile: "/figures/edxig-labour-tech.svg",
    explanation:
      "In a monopsony labour market, the employer faces an upward-sloping labour supply curve (S = ACL). To hire additional workers, the monopsonist must raise wages for all workers, so the marginal cost of labour (MCL) is above the supply curve. The monopsonist maximises profit by hiring where MCL = MRP (demand for labour), setting employment at Qm and wage at Wm — both below the competitive equilibrium (Qc, Wc). This explains why care workers are paid near minimum wage despite high demand: councils exploit their monopsony power. A minimum wage set between Wm and Wc can actually increase both employment and wages — the MCL curve becomes horizontal up to the minimum wage, removing the monopsonist's incentive to restrict hiring. This is why the UK minimum wage has not caused significant unemployment in social care despite theoretical predictions.",
    keyTerms: ["monopsony", "marginal cost of labour (MCL)", "wage suppression", "competitive equilibrium", "minimum wage", "labour market power"],
    diagramRequirements: [
      { requirement: "Draw a labour market diagram with S (= ACL), MCL above S, and MRP = D", marks: 1 },
      { requirement: "Show the monopsony equilibrium (Wm, Qm) where MCL = MRP", marks: 1 },
      { requirement: "Show the competitive equilibrium (Wc, Qc) where S = MRP for comparison", marks: 1 },
      { requirement: "Explain why Wm < Wc and Qm < Qc under monopsony", marks: 1 },
      { requirement: "Show how a minimum wage between Wm and Wc can increase both W and Q", marks: 1 },
      { requirement: "Evaluate with reference to the UK social care market evidence", marks: 1 },
    ],
    scenarioVariant: "UK Social Care — Monopsony Wage Suppression and Minimum Wage Paradox",
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
