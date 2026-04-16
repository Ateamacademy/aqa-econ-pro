export interface OcrGcseTopic {
  slug: string;
  board: "OCR-GCSE";
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

export const ocrGcseTopics: OcrGcseTopic[] = [
  {
    slug: "ocr-blueberries-demand",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Demand",
    marks: 4,
    title: "Supply & Demand — Shift in Demand",
    scenario:
      "Renewed medical research in the UK has highlighted the significant health benefits of consuming blueberries, leading to a surge in popularity among health-conscious consumers. Prior to this research, the blueberry market was in equilibrium.",
    question:
      "Using the information provided, draw and annotate a demand and supply diagram to show the effects of this new medical research on the equilibrium price and equilibrium quantity of blueberries.",
    figureFile: "/figures/ocr-blueberries-demand.svg",
    explanation:
      "Positive health news changes consumer tastes/preferences. Consumers now want more blueberries at every price level — D shifts right (D₁ → D₂). At the old price there is now excess demand; prices rise. Equilibrium price rises (P₁ → P₂) and equilibrium quantity rises (Q₁ → Q₂). UK blueberry sales grew by over 130% between 2012 and 2022 as health-focused media coverage labelled them a 'superfood'.",
    keyTerms: ["equilibrium", "shift in demand", "tastes & preferences", "excess demand"],
    diagramRequirements: [
      { requirement: "Draw a demand and supply diagram with correctly labelled axes", marks: 1 },
      { requirement: "Show the demand curve shifting to the right (D₁ → D₂)", marks: 1 },
      { requirement: "Label the new equilibrium price (P₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Explain why the demand curve shifted (health research → tastes)", marks: 1 },
    ],
    scenarioVariant: "UK Blueberries — Health Research Drives Demand",
  },
  {
    slug: "ocr-ev-automation",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "Supply & Demand — Shift in Supply",
    marks: 4,
    title: "Supply & Demand — Shift in Supply",
    scenario:
      "Renewable energy technology has advanced rapidly in the UK. Many car manufacturers have invested in new automated production lines, which significantly reduces the cost of production for each electric vehicle (EV) built.",
    question:
      "Using a supply and demand diagram, show the effect of lower production costs on the equilibrium price and quantity of electric vehicles.",
    figureFile: "/figures/ocr-ev-automation.svg",
    explanation:
      "Automation reduces the unit cost of producing each EV. Firms are now willing to supply more at every price level — S shifts right (S₁ → S₂). At the old price there is excess supply; prices fall. New equilibrium: LOWER price (P₁ → P₂) and HIGHER quantity (Q₁ → Q₂). Tesla's Gigafactories use heavy automation to cut per-unit labour costs — a key reason real EV prices have fallen around 20% since 2018.",
    keyTerms: ["cost of production", "technology", "shift in supply", "equilibrium"],
    diagramRequirements: [
      { requirement: "Draw a supply and demand diagram with correctly labelled axes", marks: 1 },
      { requirement: "Show the supply curve shifting to the right (S₁ → S₂)", marks: 1 },
      { requirement: "Label the new equilibrium price (P₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Explain why the supply curve shifted (automation → lower costs)", marks: 1 },
    ],
    scenarioVariant: "UK EV Automation — Lower Costs of Production",
  },
  {
    slug: "ocr-uk-confidence-rise",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "AD/AS — Demand-Side Shock",
    marks: 4,
    title: "AD/AS — Demand-Side Shock",
    scenario:
      "The UK economy experiences a significant increase in consumer confidence due to rising house prices and a fall in unemployment. As a result, households decide to increase their spending on goods and services.",
    question:
      "Using AD/AS, draw and annotate a diagram to show the effect of this increase in consumer spending on Real GDP and the Price Level, and briefly explain one reason the AD curve shifted.",
    figureFile: "/figures/ocr-confidence-rises.svg",
    explanation:
      "Rising house prices create a 'wealth effect' — households feel richer and spend more. Falling unemployment removes fear of income loss, further boosting Consumption (C). Higher C is a component of AD, so AD shifts RIGHT (AD₁ → AD₂). New equilibrium: Real GDP rises (Y₁ → Y₂) AND the Price Level rises (P₁ → P₂). UK household spending rose sharply in 2013–2015 following house price recovery and falling unemployment.",
    keyTerms: ["aggregate demand (AD)", "consumer confidence", "real GDP", "price level"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with initial equilibrium at P₁, Y₁", marks: 1 },
      { requirement: "Shift AD to the right (AD₁ → AD₂)", marks: 1 },
      { requirement: "Label new equilibrium (P₂, Y₂)", marks: 1 },
      { requirement: "Explain the mechanism (rising house prices → wealth effect → higher C)", marks: 1 },
    ],
    scenarioVariant: "UK Consumer Confidence Rises — Demand-Side Shock",
  },
  {
    slug: "ocr-uk-energy-shock",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "AD/AS — Supply-Side Shock",
    marks: 4,
    title: "AD/AS — Supply-Side Shock",
    scenario:
      "In 2022, the UK experienced a significant energy price shock due to global instability. This led to a massive increase in electricity and gas prices for UK manufacturers and service providers.",
    question:
      "Using an AD/AS diagram, show the effect of this energy price increase on the UK's general price level and Real GDP. Label initial and new equilibria and explain the macroeconomic impact.",
    figureFile: "/figures/ocr-uk-energy-shock.svg",
    explanation:
      "Higher energy prices raise firms' production costs across the economy. Firms supply less at every price level — SRAS shifts LEFT (SRAS₁ → SRAS₂). Price Level RISES (P₁ → P₂) — this is cost-push inflation. Real GDP FALLS (Y₁ → Y₂) — a slowdown in economic growth, with rising unemployment risk. UK inflation reached a 40-year high of 11.1% in 2022, largely driven by the post-Ukraine-invasion energy shock.",
    keyTerms: ["aggregate supply (AS)", "cost-push inflation", "SRAS", "stagflation"],
    diagramRequirements: [
      { requirement: "Draw an AD/SRAS diagram with initial equilibrium (Y₁, P₁)", marks: 1 },
      { requirement: "Shift SRAS to the LEFT (SRAS₁ → SRAS₂)", marks: 1 },
      { requirement: "Label new equilibrium (Y₂, P₂)", marks: 1 },
      { requirement: "Explain impact on inflation, growth, and unemployment", marks: 1 },
    ],
    scenarioVariant: "UK 2022 Energy Crisis — Supply-Side Shock",
  },
  {
    slug: "ocr-uk-investment",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "AD/AS — Economic Growth (LRAS Shift)",
    marks: 4,
    title: "AD/AS — Economic Growth (LRAS Shift)",
    scenario:
      "The UK government announces a £20 billion investment fund dedicated to upgrading national broadband infrastructure and providing advanced technical training for workers in the manufacturing sector.",
    question:
      "Using an AD/AS diagram, show the effect of this industrial investment on the UK's LRAS and the resulting impact on Real GDP.",
    figureFile: "/figures/ocr-uk-investment.svg",
    explanation:
      "Better broadband allows firms to communicate faster and adopt digital tools — capital productivity rises. Technical training raises human capital — workers are more productive per hour. Together these increase the economy's productive capacity — LRAS shifts RIGHT (LRAS₁ → LRAS₂). Result: higher potential Real GDP (Y → Y₁) with a LOWER price level if AD is unchanged. South Korea's sustained investment in education and digital infrastructure is a classic example of supply-side policies driving long-run LRAS outward.",
    keyTerms: ["LRAS", "productive capacity", "capital investment", "human capital"],
    diagramRequirements: [
      { requirement: "Draw an AD/AS diagram with LRAS₁ and initial equilibrium", marks: 1 },
      { requirement: "Shift LRAS to the right (LRAS₁ → LRAS₂)", marks: 1 },
      { requirement: "Show change in full employment output (Y → Y₁)", marks: 1 },
      { requirement: "Explain how infrastructure and training cause the shift", marks: 1 },
    ],
    scenarioVariant: "UK Broadband + Training Investment — Long-Run Growth",
  },
  {
    slug: "ocr-uk-hospitality",
    board: "OCR-GCSE",
    tier: "Foundation",
    section: "Labour Market — Wage Determination",
    marks: 4,
    title: "Labour Market — Wage Determination",
    scenario:
      "The UK hospitality industry (hotels and restaurants) has experienced a significant increase in the demand for labour following a rise in consumer spending on leisure activities. The supply of labour has remained constant.",
    question:
      "Using a labour market diagram, show the effect of an increase in the demand for labour on the equilibrium wage rate and the quantity of labour employed in hospitality.",
    figureFile: "/figures/ocr-uk-hospitality.svg",
    explanation:
      "Rising consumer leisure spending means more demand for meals, hotel stays, and bar service. Hospitality firms need more workers to meet this demand — labour demand shifts RIGHT (D₁ → D₂). At the original wage W₁, there is now a shortage of hospitality workers. Employers bid up wages (extension along supply) until the new equilibrium at W₂ and Q₂. After the 2021 UK reopening following COVID restrictions, hospitality pay rose by nearly 15% year-on-year in 2022.",
    keyTerms: ["demand for labour", "supply of labour", "equilibrium wage", "derived demand"],
    diagramRequirements: [
      { requirement: "Draw a labour market diagram with wage on y-axis and quantity on x-axis", marks: 1 },
      { requirement: "Shift the demand for labour to the right (D₁ → D₂)", marks: 1 },
      { requirement: "Label the new equilibrium wage (W₂) and quantity (Q₂)", marks: 1 },
      { requirement: "Explain the mechanism (↑ leisure spending → ↑ labour demand → ↑W, ↑Q)", marks: 1 },
    ],
    scenarioVariant: "UK Hospitality — Post-COVID Labour Demand Surge",
  },

  // ===== HIGHER TIER (6 marks) =====
  {
    slug: "ocr-indirect-tax-sdil",
    board: "OCR-GCSE",
    tier: "Higher",
    section: "Government Intervention — Indirect Tax",
    marks: 6,
    title: "Government Intervention — Indirect Tax",
    scenario:
      "In 2018, the UK introduced the Soft Drinks Industry Levy (SDIL), commonly known as the 'sugar tax'. Drinks containing more than 8g of sugar per 100ml were taxed at 24p per litre, while those with 5–8g were taxed at 18p per litre. The policy aimed to correct the negative externality of obesity and incentivise producers to reformulate recipes.",
    question:
      "Using an appropriate diagram, explain the impact of a specific indirect tax on the market for high-sugar soft drinks. Draw the shift in supply, identify the new equilibrium (P₁, Q₁), shade the total tax revenue area, and explain how the tax reduces sugar consumption.",
    figureFile: "/figures/gcse-indirect-tax-sdil.svg",
    explanation:
      "The tax acts as an additional cost of production for firms. The supply curve shifts upwards by the tax amount — new supply is S + tax. At the old price there is excess demand; the price rises to P₁. Consumers respond with a contraction in Qd — movement along D. New equilibrium has lower Q₁ and the tax revenue is the rectangle between P₁ and Pp, width Q₁. Mexico's 2014 soda tax led to a 6% average decline in taxed beverage purchases.",
    keyTerms: ["specific tax", "contraction in demand", "incidence of tax", "tax revenue"],
    diagramRequirements: [
      { requirement: "Draw D and S curves with original equilibrium (P, Q)", marks: 1 },
      { requirement: "Shift supply vertically upwards by the per-unit tax (S → S + tax)", marks: 1 },
      { requirement: "Label new consumer price P₁, quantity Q₁, and producer-received price Pp", marks: 1 },
      { requirement: "Shade the tax revenue rectangle (width Q₁, height P₁ − Pp)", marks: 1 },
      { requirement: "Explain the mechanism — how the tax raises costs and reduces consumption", marks: 1 },
      { requirement: "Evaluate effectiveness — reformulation, regressive impact, or substitution", marks: 1 },
    ],
    scenarioVariant: "UK Sugar Tax (SDIL) — Tax Incidence and Effectiveness",
  },
  {
    slug: "ocr-neg-ext-fast-fashion",
    board: "OCR-GCSE",
    tier: "Higher",
    section: "Market Failure — Negative Externality",
    marks: 6,
    title: "Market Failure — Negative Externality",
    scenario:
      "The fast fashion industry produces approximately 92 million tonnes of textile waste per year globally. Manufacturing processes release toxic chemicals into water systems, and carbon emissions from the industry account for 10% of global emissions. Retail prices of £5 T-shirts do not reflect these costs — they are borne by local communities and future generations.",
    question:
      "Using a negative production externality diagram, analyse the impact of fast fashion on market efficiency. Label MPC, MSC, and MSB (=D). Identify the market and socially optimum outputs, shade the welfare loss, and explain why the market fails.",
    figureFile: "/figures/gcse-ad-demand-shock.svg",
    explanation:
      "Pollution is an external cost of production — not borne by the firm. MSC lies above MPC; the vertical gap is the MEC (marginal external cost). The market produces at Q₁ where MPC = MSB, but society prefers Q* where MSC = MSB — fewer units produced. Because Q₁ > Q*, there is overproduction and the welfare loss triangle appears between MSC and MSB from Q* to Q₁. In Bangladesh, the textile sector discharges untreated waste into the Buriganga River.",
    keyTerms: ["MPC", "MSC", "external cost (MEC)", "welfare loss", "overproduction"],
    diagramRequirements: [
      { requirement: "Draw D = MPB = MSB (downward sloping)", marks: 1 },
      { requirement: "Draw S = MPC (upward sloping)", marks: 1 },
      { requirement: "Draw MSC above MPC (parallel shift up by MEC)", marks: 1 },
      { requirement: "Label market equilibrium (Q₁, P₁) and social optimum (Q*, P*)", marks: 1 },
      { requirement: "Shade the welfare loss triangle between Q* and Q₁", marks: 1 },
      { requirement: "Explain overproduction — why the free market ignores external costs", marks: 1 },
    ],
    scenarioVariant: "Fast Fashion Pollution — Overproduction and Environmental Externalities",
  },
  {
    slug: "ocr-max-price-rent",
    board: "OCR-GCSE",
    tier: "Higher",
    section: "Government Intervention — Maximum Price",
    marks: 6,
    title: "Government Intervention — Maximum Price",
    scenario:
      "In 2023, the Scottish Government introduced a rent freeze capping private rents at their September 2022 levels. This was a response to a cost-of-living crisis where average rents in Edinburgh rose by 13% year-on-year. The policy aims to protect tenants, but economists warn it may have unintended consequences for the housing supply.",
    question:
      "Draw a demand and supply diagram to show the effect of a maximum price being imposed on the market for rental apartments. Show the original equilibrium, the level of the maximum price, and the resulting shortage. Using your diagram, explain the impact on the quantity of apartments available.",
    figureFile: "/figures/gcse-labour-market-hospitality.svg",
    explanation:
      "A maximum price (price ceiling) must be set below the equilibrium price to be effective. At the lower rent, landlords reduce supply (contraction in supply — Qs falls) as letting becomes less profitable. Meanwhile, more tenants wish to rent at the lower price (extension in demand — Qd rises). The gap between Qd and Qs is the shortage (excess demand). In Berlin (2020), the 'Mietendeckel' rent cap led to a significant decrease in apartments listed for rent.",
    keyTerms: ["price ceiling", "excess demand", "shortage", "equilibrium", "incentive"],
    diagramRequirements: [
      { requirement: "Draw a standard demand and supply diagram for rental apartments", marks: 1 },
      { requirement: "Mark the original equilibrium (Pe, Qe)", marks: 1 },
      { requirement: "Draw the maximum price horizontal line clearly BELOW Pe", marks: 1 },
      { requirement: "Identify Qs and Qd at the maximum price and label the shortage", marks: 1 },
      { requirement: "Explain the mechanism — why supply contracts and demand extends", marks: 1 },
      { requirement: "Evaluate — unintended consequences such as black markets or reduced quality", marks: 1 },
    ],
    scenarioVariant: "Edinburgh Rent Freeze — Maximum Price and Housing Shortage",
  },
  {
    slug: "ocr-pos-ext-vaccines",
    board: "OCR-GCSE",
    tier: "Higher",
    section: "Market Failure — Positive Externality",
    marks: 6,
    title: "Market Failure — Positive Externality",
    scenario:
      "The UK's childhood vaccination programme provides free immunisations against diseases including measles, whooping cough, and meningitis. In 2023, MMR vaccination rates fell to 85% in England — below the 95% threshold needed for herd immunity. Private clinics charge up to £200 per MMR dose, leaving low-income families unable to afford full protection without NHS support.",
    question:
      "With the use of a positive externality diagram, explain why the free market provides fewer vaccinations than are socially desirable. You must label MSB, MPB (= D), the market equilibrium, the social optimum, and the resulting welfare loss.",
    figureFile: "/figures/gcse-lras-shift-skills.svg",
    explanation:
      "Individuals consume vaccinations based on their own MPB (personal protection). But vaccinated people reduce disease transmission — a benefit to others. MSB > MPB. The market stops at Qm where MPB = MPC, but this is below the social optimum Q* where MSB = MSC. Between Qm and Q*, society would gain more benefit than the cost — this gap is the welfare loss. The UK COVID-19 vaccination programme generated huge positive externalities.",
    keyTerms: ["MPB", "MSB", "external benefit", "welfare loss", "under-consumption"],
    diagramRequirements: [
      { requirement: "Draw D = MPB, S = MPC = MSC, and MSB (parallel and to the right of D)", marks: 1 },
      { requirement: "Label market equilibrium (Qm, Pm) where D = S", marks: 1 },
      { requirement: "Label social optimum (Q*, P*) where MSB = MSC", marks: 1 },
      { requirement: "Shade the welfare loss triangle between Qm and Q*", marks: 1 },
      { requirement: "Explain why the free market under-consumes vaccinations", marks: 1 },
      { requirement: "Suggest a government intervention to correct the market failure", marks: 1 },
    ],
    scenarioVariant: "UK Childhood Vaccinations — Under-Provision and Herd Immunity",
  },
  {
    slug: "ocr-keynesian-spare-capacity",
    board: "OCR-GCSE",
    tier: "Higher",
    section: "AD/AS — Keynesian AS Curve",
    marks: 6,
    title: "AD/AS — Keynesian AS Curve",
    scenario:
      "During the 2020 recession, UK Real GDP fell by 9.7% — the largest annual decline in over 300 years. Unemployment rose to 5.2% and there was significant spare capacity across the economy. The government responded with major fiscal expansion: furlough, increased NHS spending, and infrastructure projects worth £600 billion.",
    question:
      "Using a Keynesian AS diagram, show the effect of increased government spending on an economy with high unemployment. Explain the impact on output and the price level, distinguishing between the spare capacity and full employment regions.",
    figureFile: "/figures/gcse-as-supply-shock.svg",
    explanation:
      "The Keynesian AS curve has three stages: perfectly elastic (spare capacity), upward sloping (bottlenecks), and perfectly inelastic (full employment at Yf). Increased government spending (G) raises AD — the curve shifts right. Because the economy begins with spare capacity, AD meets AS on the horizontal section. Firms hire idle workers without bidding up input prices. Real GDP rises significantly (Y₁ → Y₂) with little or no increase in the price level.",
    keyTerms: ["Keynesian AS", "spare capacity", "full employment", "fiscal expansion", "multiplier"],
    diagramRequirements: [
      { requirement: "Draw a Keynesian AS curve with horizontal, upward-sloping, and vertical sections", marks: 1 },
      { requirement: "Draw AD₁ intersecting AS on the horizontal (spare capacity) section", marks: 1 },
      { requirement: "Shift AD rightward to AD₂", marks: 1 },
      { requirement: "Label Y₁, Y₂, P₁, P₂ (note: P₂ ≈ P₁ in spare capacity region)", marks: 1 },
      { requirement: "Explain using the concept of spare capacity why prices don't rise", marks: 1 },
      { requirement: "Explain what happens if AD shifts further into the vertical section", marks: 1 },
    ],
    scenarioVariant: "UK 2020–2021 Recovery — Spare Capacity vs Inflationary Pressure",
  },
  {
    slug: "ocr-ped-elastic-demand",
    board: "OCR-GCSE",
    tier: "Higher",
    section: "Elasticity — PED and Revenue",
    marks: 6,
    title: "Elasticity — PED and Revenue",
    scenario:
      "Netflix raised its standard subscription price from £10.99 to £12.99 per month in the UK in 2023. Market research suggests that demand for Netflix is relatively price inelastic in the short run (|PED| ≈ 0.5) because consumers are locked into viewing habits and close substitutes offer different content libraries. Netflix reported an increase in total revenue despite small subscriber losses.",
    question:
      "Analyse, using a demand diagram, how the price increase leads to higher total revenue. Draw a price-inelastic demand curve, label P₁/P₂ and Q₁/Q₂, indicate the revenue gain and loss rectangles, and explain the PED–TR relationship.",
    figureFile: "/figures/gcse-demand-shift-evs.svg",
    explanation:
      "Because demand is inelastic, the percentage increase in price exceeds the percentage decrease in quantity. Revenue GAIN area (vertical rectangle at kept subscribers × price rise) is LARGER than revenue LOSS (horizontal rectangle of lost subscribers × old price). Therefore Total Revenue (P × Q) RISES when price rises, because the 'price effect' outweighs the 'quantity effect'. Spotify's 2023 price rise showed similar inelastic demand behaviour.",
    keyTerms: ["PED", "total revenue", "price inelastic", "price elastic", "substitutes"],
    diagramRequirements: [
      { requirement: "Draw a STEEP (inelastic) demand curve", marks: 1 },
      { requirement: "Show price rising from P₁ to P₂", marks: 1 },
      { requirement: "Label Q₁ > Q₂ (small fall in quantity)", marks: 1 },
      { requirement: "Shade 'gain' rectangle: (P₂ − P₁) × Q₂", marks: 1 },
      { requirement: "Shade 'loss' rectangle: P₁ × (Q₁ − Q₂)", marks: 1 },
      { requirement: "Explain why gain > loss when |PED| < 1", marks: 1 },
    ],
    scenarioVariant: "Netflix Price Increase — Short-Run vs Long-Run Revenue Effects",
  },
];
