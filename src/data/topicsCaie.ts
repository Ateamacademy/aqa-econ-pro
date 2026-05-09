export interface CaieTopic {
  slug: string;
  board: "CAIE";
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

export const caieTopics: CaieTopic[] = [
  // ── Foundation [4 marks] ──
  {
    slug: "caie-sd-coffee-harvest",
    board: "CAIE",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand · Market Equilibrium",
    scenario:
      "The global market for Arabica coffee beans begins in equilibrium. A period of perfect weather in Brazil significantly increases the harvest yield for coffee farmers.",
    question:
      "Using a supply and demand diagram, explain the effect of this increased harvest on the equilibrium price and quantity of coffee beans. Your response must: 1) draw the initial equilibrium Pe, Qe; 2) show the shift in the relevant curve caused by the increased harvest; 3) identify the new market equilibrium and resulting changes.",
    figureFile: "/figures/caie-sd-coffee.svg",
    explanation:
      "A larger harvest is a favourable SUPPLY-side shock · at every price, producers now supply more. Supply shifts RIGHT (S1→S2). Demand is unchanged. New equilibrium: Pe1 → Pe2 (price falls) and Qe1 → Qe2 (quantity rises).",
    keyTerms: ["equilibrium", "market clearing", "supply shift", "demand", "equilibrium price", "equilibrium quantity"],
    diagramRequirements: [
      { requirement: "Axes labelled Price (P) and Quantity (Q)", marks: 1 },
      { requirement: "Original S1 and D drawn with initial equilibrium Pe1, Qe1 marked", marks: 1 },
      { requirement: "Supply shifts RIGHT to S2 (with arrow); demand unchanged", marks: 1 },
      { requirement: "New equilibrium Pe2 < Pe1 and Qe2 > Qe1 clearly marked with dashed drop-lines", marks: 1 },
    ],
  },
  {
    slug: "caie-ped-elastic",
    board: "CAIE",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Price Elasticity of Demand · Effect on Revenue",
    scenario:
      "You are an economic consultant for a premium smartphone manufacturer. Current market research indicates the PED for the latest handset is −2.5. The firm is considering a 10% price reduction to increase market share.",
    question:
      "Using a demand curve diagram, explain the effect of a price fall on the firm's total revenue when demand is price elastic. You must: 1) identify the diagram as ped_elastic; 2) label the revenue LOSS (lower price) and revenue GAIN (increased quantity); 3) explain why total revenue changes in the direction you've illustrated, referencing PED = −2.5.",
    figureFile: "/figures/caie-ped-elastic.svg",
    explanation:
      "With |PED| = 2.5 (elastic), a 10% price cut triggers a 25% rise in quantity demanded. The revenue GAIN rectangle exceeds the revenue LOSS rectangle → total revenue RISES.",
    keyTerms: ["price elasticity", "PED", "elastic demand", "total revenue", "revenue gain", "revenue loss", "proportional change"],
    diagramRequirements: [
      { requirement: "Relatively flat (elastic) demand curve drawn on P–Q axes", marks: 1 },
      { requirement: "Price fall P1→P2 and quantity rise Q1→Q2 clearly marked with dashed lines", marks: 1 },
      { requirement: "Revenue LOSS rectangle (top strip) and revenue GAIN rectangle (right strip) both shaded and labelled", marks: 1 },
      { requirement: "Written explanation links |PED|>1 to TR rising when P falls; references −2.5", marks: 1 },
    ],
  },
  {
    slug: "caie-indirect-tax-sugar",
    board: "CAIE",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Indirect Tax · Consumer vs Producer Burden",
    scenario:
      "A developing economy imposes a specific indirect tax on sugary soft drinks to address rising obesity. PED is relatively INELASTIC.",
    question:
      "Using an appropriately labelled diagram, explain the distribution of the tax burden between consumers and producers following imposition of this specific tax. Your answer must identify consumer-burden and producer-burden areas and link the outcome to inelastic PED.",
    figureFile: "/figures/caie-indirect-tax.svg",
    explanation:
      "The specific tax shifts supply VERTICALLY up by the tax amount (S1→S1+Tax). Because demand is INELASTIC, consumers bear the majority of the tax burden.",
    keyTerms: ["specific tax", "tax incidence", "consumer burden", "producer burden", "inelastic demand", "supply shift", "Pnet"],
    diagramRequirements: [
      { requirement: "Steep (inelastic) demand curve and original S drawn; axes labelled", marks: 1 },
      { requirement: "S1 shifts vertically UP to S1+Tax by the tax amount, labelled", marks: 1 },
      { requirement: "P1, P2, Pnet and Q1, Q2 all marked with dashed drop-lines", marks: 1 },
      { requirement: "Consumer burden (top rectangle) and producer burden (bottom rectangle) shaded with consumer portion clearly larger", marks: 1 },
    ],
  },
  {
    slug: "caie-adas-inflationary-gap",
    board: "CAIE",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS · Inflationary / Deflationary Gap",
    scenario:
      "The economy of a middle-income country is currently operating at full-employment output (Yf). Following a sustained increase in imported oil and gas prices, firms across all sectors experience a sharp rise in production costs.",
    question:
      "Using an AD/AS diagram, explain the effect of rising energy prices on the country's general price level and real national output. You must: 1) show the initial equilibrium at Yf; 2) show the shift in the relevant curve from higher production costs; 3) identify the resulting type of inflation and the output gap.",
    figureFile: "/figures/caie-inflationary-gap.svg",
    explanation:
      "Rising input costs shift SRAS LEFT (SRAS1→SRAS2). New equilibrium: higher price level and lower real output · cost-push inflation with a negative (recessionary) output gap. This is STAGFLATION.",
    keyTerms: ["cost-push inflation", "SRAS shift", "output gap", "recessionary gap", "stagflation", "full employment", "LRAS"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real Output; LRAS vertical at Yf, AD downward, SRAS1 upward", marks: 1 },
      { requirement: "Initial equilibrium at (Yf, P1) on LRAS", marks: 1 },
      { requirement: "SRAS shifts LEFT to SRAS2 with arrow, cost-push labelled", marks: 1 },
      { requirement: "New equilibrium at Y1 < Yf and P2 > P1; recessionary output gap (Y1 to Yf) labelled", marks: 1 },
    ],
  },
  {
    slug: "caie-comparative-advantage-ppc",
    board: "CAIE",
    tier: "Foundation",
    section: "International",
    marks: 4,
    title: "Comparative Advantage · PPC Approach",
    scenario:
      "Vietnam can produce max 100 bags of coffee OR 20 computers; Brazil can produce max 80 bags of coffee OR 40 computers. Both countries use all resources and share given technology.",
    question:
      "Using the data: 1) Draw a single diagram with both PPFs, axes labelled; 2) Calculate opportunity costs to identify which country has comparative advantage in computers; 3) Explain how your diagram illustrates that both countries can gain from specialisation and trade.",
    figureFile: "/figures/caie-comparative-ppc.svg",
    explanation:
      "Brazil has LOWER opportunity cost for computers (2 bags vs 5 bags) → comparative advantage in COMPUTERS. Vietnam has LOWER opportunity cost for coffee → comparative advantage in COFFEE. Specialisation and trade allow both to consume beyond their PPFs.",
    keyTerms: ["comparative advantage", "opportunity cost", "PPF", "specialisation", "gains from trade", "slope"],
    diagramRequirements: [
      { requirement: "Axes labelled Coffee (bags) and Computers (units) with values", marks: 1 },
      { requirement: "Vietnam's PPF drawn from (0, 20) to (100, 0), labelled", marks: 1 },
      { requirement: "Brazil's PPF drawn from (0, 40) to (80, 0), labelled", marks: 1 },
      { requirement: "Opportunity-cost calculation shown; comparative advantage in computers assigned to Brazil and coffee to Vietnam", marks: 1 },
    ],
  },
  {
    slug: "caie-multiplier-ad",
    board: "CAIE",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "The Multiplier · AD Shift",
    scenario:
      "In 2023 the government of a developing economy increased investment expenditure on national infrastructure by $500 million. The final increase in National Income was significantly greater than $500 million.",
    question:
      "With the aid of an AD/AS diagram, explain how an initial increase in investment can lead to a more than proportionate increase in the equilibrium level of national income. You must show the multiplier effect clearly on your diagram.",
    figureFile: "/figures/caie-multiplier.svg",
    explanation:
      "Initial investment shifts AD1→AD2. Induced consumption from the MPC causes further rounds of spending, pushing AD2→AD_Final. The multiplier k = 1/(1−MPC) means Y_Final − Y1 exceeds the initial injection.",
    keyTerms: ["multiplier", "MPC", "MPW", "investment", "injection", "induced consumption", "aggregate demand", "circular flow"],
    diagramRequirements: [
      { requirement: "Axes Price Level and Real GDP (Y); AD1 and SRAS drawn with equilibrium at P1, Y1", marks: 1 },
      { requirement: "AD1 shifts RIGHT to AD2 (initial investment)", marks: 1 },
      { requirement: "AD2 shifts RIGHT AGAIN to AD_Final (multiplier / induced spending)", marks: 1 },
      { requirement: "Final equilibrium Y_Final clearly further right than Y2; gap Y_Final−Y1 > initial shift, with 'multiplier effect' annotated", marks: 1 },
    ],
  },

  // ── Intermediate [6 marks] ──
  {
    slug: "caie-neg-externality-copper",
    board: "CAIE",
    tier: "Intermediate",
    section: "Market Failure",
    marks: 6,
    title: "Negative Externality · MSC vs MPC",
    scenario:
      "In Zambia and Chile, copper extraction by private firms often causes environmental degradation · water contamination and air pollution from smelting plants. Mining firms focus on private costs; external costs fall on local agriculture and healthcare systems and are not reflected in the copper market price.",
    question:
      "With the aid of a diagram, explain how the existence of negative externalities in copper production leads to misallocation of resources and market failure. Your response must: 1) label MPC, MSC, MSB; 2) identify market equilibrium (Qm, Pm) and socially optimum (Qs, Ps); 3) shade the deadweight welfare loss; 4) explain the relationship between curves and why allocative efficiency fails.",
    figureFile: "/figures/caie-neg-ext-copper.svg",
    explanation:
      "Mining firms equate MPC = MSB (=MPB) giving market output Qm at price Pm. The true social cost of copper includes pollution damage to farms and healthcare costs: MSC = MPC + MEC, so MSC lies ABOVE MPC by a constant external-cost gap. The SOCIALLY OPTIMUM output is Qs (< Qm) where MSC = MSB, at higher price Ps. Between Qs and Qm every additional unit has MSC > MSB · the shaded WELFARE LOSS triangle. Market failure arises because prices don't capture the full social cost: resources over-allocated to copper. Allocative efficiency fails because P = MPC rather than P = MSC. Corrective policy: Pigouvian tax equal to MEC or tradable pollution permits shift MPC toward MSC and reduce output toward Qs.",
    keyTerms: ["negative externality", "MPC", "MSC", "MSB", "market failure", "allocative efficiency", "deadweight welfare loss", "over-production", "Pigouvian tax"],
    diagramRequirements: [
      { requirement: "Axes labelled Benefit/Cost and Quantity", marks: 1 },
      { requirement: "MPB = MSB (downward), MPC (upward), MSC (upward, ABOVE MPC by constant MEC gap) · all three labelled", marks: 2 },
      { requirement: "Market equilibrium Qm, Pm (MPC = MSB) AND social optimum Qs, Ps (MSC = MSB) both marked; Qs < Qm", marks: 1 },
      { requirement: "Welfare-loss triangle shaded between Qs and Qm bounded by MSC and MSB", marks: 1 },
      { requirement: "Written explanation links over-production to ignored external cost and loss of allocative efficiency", marks: 1 },
    ],
  },
  {
    slug: "caie-pos-externality-vaccines",
    board: "CAIE",
    tier: "Intermediate",
    section: "Market Failure",
    marks: 6,
    title: "Positive Externality · MSB vs MPB",
    scenario:
      "In developing economies like India and Vietnam, governments fund free or subsidised vaccinations. An individual gains private immunity (MPB), but vaccination also reduces transmission risk to the wider community · a positive external benefit not reflected in the market price. COVID-19 rollouts in 2021 illustrated this: private immunity plus economy-wide reopening benefits.",
    question:
      "With the aid of a diagram, explain how positive externalities of consumption in the healthcare market lead to market failure and under-consumption of vaccinations.",
    figureFile: "/figures/caie-pos-ext-vaccines.svg",
    explanation:
      "In a free market, consumers weigh only MPB. Market equilibrium: MPC = MPB at Qm, price Pm. Because vaccination carries external benefits (herd immunity, reduced hospital transmission, economic reopening), MSB = MPB + External Benefit lies ABOVE MPB by a constant EB gap. The SOCIAL OPTIMUM is at Qs (> Qm) where MSB = MSC (= MPC). Between Qm and Qs, MSB > MSC · society values those units more than the private cost, but the market under-provides. The WELFARE-GAIN TRIANGLE represents the lost welfare · a deadweight loss from UNDER-CONSUMPTION. Correction: subsidy equal to EB shifts MPB up to meet MSB → output moves to Qs.",
    keyTerms: ["positive externality", "MPB", "MSB", "external benefit", "MPC = MSC", "under-consumption", "welfare gain", "deadweight loss", "subsidy"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "MPC = MSC (upward), MPB (downward), MSB (downward, ABOVE MPB by constant EB) · all three labelled", marks: 2 },
      { requirement: "EB gap annotated as vertical distance between MPB and MSB", marks: 1 },
      { requirement: "Market equilibrium Qm (MPC = MPB) AND social optimum Qs (MSC = MSB) marked; Qs > Qm", marks: 1 },
      { requirement: "Welfare-gain triangle between Qm and Qs shaded with written explanation of subsidy correction", marks: 1 },
    ],
  },
  {
    slug: "caie-keynesian-as",
    board: "CAIE",
    tier: "Intermediate",
    section: "Macroeconomics",
    marks: 6,
    title: "Keynesian AS · Horizontal, Upward Sloping, Vertical Sections",
    scenario:
      "An economy is in severe recession with 12% unemployment. The government implements expansionary fiscal policy · increased infrastructure spending · to stimulate AD.",
    question:
      "Use a Keynesian AS diagram to illustrate how an increase in Aggregate Demand affects Real GDP and Price Level when starting from significant spare capacity. You must: 1) draw a Keynesian AS curve with its three distinct sections; 2) show the initial equilibrium at low output Y1 and a rightward AD shift; 3) explain the P-Y relationship in the horizontal section.",
    figureFile: "/figures/caie-keynesian-as.svg",
    explanation:
      "The Keynesian AS curve has THREE sections: HORIZONTAL (deep recession, massive spare capacity · firms can expand output without raising prices because unemployed workers/resources are available at existing wages); INTERMEDIATE (upward sloping · as output rises, bottlenecks emerge, some resources become scarce, costs and prices rise modestly); VERTICAL (near full employment · no additional output is possible, so any AD rise translates purely into price level rises). Starting at Y1 in the HORIZONTAL section, expansionary fiscal policy shifts AD1→AD2. The new equilibrium moves right along the horizontal section: real GDP rises (Y1→Y2) with NO rise in the price level.",
    keyTerms: ["Keynesian AS", "horizontal section", "intermediate section", "vertical section", "spare capacity", "full employment", "AD shift", "recessionary gap"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real GDP", marks: 1 },
      { requirement: "Keynesian AS drawn with three clearly distinct sections: horizontal (left), upward-sloping (middle), vertical (right) · labelled", marks: 2 },
      { requirement: "Initial AD1 intersects AS in the HORIZONTAL section at Y1, P1", marks: 1 },
      { requirement: "AD shifts RIGHT to AD2 with arrow", marks: 1 },
      { requirement: "New equilibrium Y2 > Y1 with P unchanged (since still in horizontal section); written explanation of P-Y relationship", marks: 1 },
    ],
  },
  {
    slug: "caie-price-discrimination-rail",
    board: "CAIE",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Monopoly · Price Discrimination",
    scenario:
      "A natural monopoly high-speed rail operator runs between two cities. It identifies two market segments: BUSINESS travellers (price-inelastic demand · strict schedules) and LEISURE travellers (price-elastic · can switch mode or date). The firm uses third-degree price discrimination to increase producer surplus and total revenue.",
    question:
      "Using an appropriate diagram, explain how a monopoly can increase total profit by charging different prices to business and leisure travellers. You must: 1) draw two separate sub-markets (A: Business, B: Leisure) alongside a combined MR/MC diagram; 2) annotate P1, P2 and Q1, Q2; 3) explain the two essential conditions for success; 4) analyse MC = MR in each market.",
    figureFile: "/figures/caie-price-discrimination.svg",
    explanation:
      "Third-degree price discrimination charges different prices to different groups with different PEDs. The firm faces a COMBINED MC. Profit max in EACH sub-market requires MR_A = MC and MR_B = MC. Business market (A): steep (inelastic) demand → P_A (HIGH). Leisure market (B): flat (elastic) demand → P_B (LOWER). Result: P_A > P_B. Combined total profit > single-price profit because the firm extracts more consumer surplus from each segment. TWO ESSENTIAL CONDITIONS: (i) market power to set price; (ii) ability to SEGREGATE markets and PREVENT RESALE (arbitrage).",
    keyTerms: ["price discrimination", "third-degree", "sub-markets", "MC = MR", "PED", "arbitrage", "market segregation", "producer surplus"],
    diagramRequirements: [
      { requirement: "Three-panel diagram: Market A (business), Market B (leisure), Combined MC", marks: 1 },
      { requirement: "Market A: steep D_A, steeper MR_A; Market B: flatter D_B, MR_B", marks: 1 },
      { requirement: "Combined MC line shown as horizontal (or mildly upward) in each panel", marks: 1 },
      { requirement: "P_A and Q_A identified in Market A where MR_A = MC; P_B and Q_B in Market B where MR_B = MC; P_A > P_B clearly shown", marks: 2 },
      { requirement: "Written explanation of two conditions: market power + prevention of arbitrage", marks: 1 },
    ],
  },
  {
    slug: "caie-perfect-competition-lr",
    board: "CAIE",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Perfect Competition · Long Run Equilibrium",
    scenario:
      "The international wheat market is a near-approximation of perfect competition. An unexpected permanent rise in demand (from global health awareness) initially generates supernormal profit for existing firms in the SHORT RUN.",
    question:
      "Using a correctly labelled diagram for BOTH the market AND an individual firm, explain the process by which a perfectly competitive market returns to long-run equilibrium following entry of new firms. You must: 1) draw the perfect_competition diagram showing SR → LR transition; 2) explain the role of freedom of entry and perfect information; 3) identify the final profit level.",
    figureFile: "/figures/caie-perfect-competition.svg",
    explanation:
      "TWO PANELS. Market (right panel): D shifts right (D1→D2) due to higher demand. Market price rises Pe1→Pe2. Firm (left panel): at Pe2 the firm produces where MC = MR and earns SUPERNORMAL PROFIT · shaded rectangle between Pe2 and ATC. In the LONG RUN: perfect information means new firms observe the supernormal profit; freedom of entry means they enter the industry. Market supply shifts RIGHT. Market price falls back until it equals minimum ATC · profits competed away. Firm produces at MC = MR = min ATC earning only NORMAL PROFIT. Long-run equilibrium: P = MC = min AC → productive AND allocative efficiency.",
    keyTerms: ["perfect competition", "price taker", "supernormal profit", "normal profit", "freedom of entry", "perfect information", "min ATC", "productive efficiency", "allocative efficiency", "long-run equilibrium"],
    diagramRequirements: [
      { requirement: "Two-panel diagram: individual firm (left) + industry/market (right), both axes labelled", marks: 2 },
      { requirement: "Market panel: D1, D2 shift right, initial equilibrium Pe1 and short-run Pe2 marked", marks: 1 },
      { requirement: "Firm panel: MC (U-shape), ATC (U-shape), AR=MR horizontal at market price; profit-max at MC=MR", marks: 1 },
      { requirement: "SR supernormal profit rectangle shaded when AR = Pe2; LR AR drops to Pe3 = min ATC with only normal profit", marks: 1 },
      { requirement: "Written explanation covers entry mechanism + final profit = normal", marks: 1 },
    ],
  },
  {
    slug: "caie-bilateral-monopoly",
    board: "CAIE",
    tier: "Intermediate",
    section: "Labour Market",
    marks: 6,
    title: "Labour Market · Bilateral Monopoly",
    scenario:
      "In a remote region of South Africa, a single large mining corporation is the monopsony employer of thousands of specialised drill operators. Those operators are all members of a powerful trade union · the sole supplier of this labour. The union demands higher real wages and better safety conditions, threatening strike action.",
    question:
      "With the aid of a labour market diagram, explain how the interaction between a monopsony employer and a monopolistic supplier of labour (trade union) determines the wage rate and employment in a bilateral monopoly. You must: 1) draw and focus on the range of wage negotiations between monopsonist's preferred Wm and union's preferred Wu; 2) identify profit-maximising employment L1; 3) explain why the final outcome for wages and employment is INDETERMINATE.",
    figureFile: "/figures/caie-bilateral-monopoly.svg",
    explanation:
      "The diagram shows four curves: S_L (labour supply, upward), MFC (marginal factor cost of labour, upward, ABOVE S_L), MRP = D_L (labour demand, downward), MR_L (marginal revenue of labour to the union, below D_L). Without a union, the monopsonist employs L1 at MFC = MRP, paying wage Wm off S_L at L1 (LOW wage). Without the monopsonist, the union would pick L_u where MR_L = S_L and charge wage Wu off D_L (HIGH wage). The negotiated wage falls somewhere in the range [Wm, Wu]. The final wage depends on BARGAINING POWER. Outcome is INDETERMINATE because standard price theory doesn't pin down a unique equilibrium.",
    keyTerms: ["bilateral monopoly", "monopsony", "trade union", "MFC", "S_L", "MRP", "MR_L", "bargaining range", "wage determination", "indeterminate"],
    diagramRequirements: [
      { requirement: "Axes labelled Real Wage Rate and Quantity of Labour", marks: 1 },
      { requirement: "Four curves: S_L (upward), MFC (upward, above S_L), MRP = D_L (downward), MR_L (downward, below D_L) · all labelled", marks: 2 },
      { requirement: "Monopsonist's preferred Wm identified at L1 (MFC = MRP)", marks: 1 },
      { requirement: "Union's preferred Wu identified at higher wage (on D_L at the union's chosen employment)", marks: 1 },
      { requirement: "Bargaining range [Wm, Wu] shaded or bracketed; written explanation identifies indeterminacy", marks: 1 },
    ],
  },

  // ── Advanced [8 marks] ──
  {
    slug: "caie-oligopoly-kinked",
    board: "CAIE",
    tier: "Advanced",
    section: "Market Structures",
    marks: 8,
    title: "Oligopoly · Kinked Demand Curve",
    scenario:
      "The market for domestic airline services in a developing economy is dominated by three large firms. Despite significant fluctuations in global aviation fuel prices (a major variable cost), flight ticket prices have remained remarkably stable over the last 18 months. Economists suggest this is due to INTERDEPENDENCE and fear of price wars.",
    question:
      "With the aid of a kinked demand curve diagram, explain why prices in an oligopoly often remain 'sticky' or rigid, even when marginal costs change. You must: 1) draw and label the kinked demand curve (AR), corresponding MR, and MC curves; 2) explain the different price elasticities of demand above and below the current market price; 3) show how a change in costs may not lead to a change in profit-maximising price or output.",
    figureFile: "/figures/caie-kinked-demand.svg",
    explanation:
      "The kinked demand curve (Sweezy 1939) models oligopolistic interdependence. The firm FACES a kinked AR curve at the current market price P with the KINK at equilibrium point E. ABOVE P (price rises): demand is ELASTIC because rivals will NOT follow a price rise · they keep their prices to steal customers. Our firm loses a lot of sales for a small price rise. BELOW P (price cuts): demand is INELASTIC because rivals WILL follow a price cut · they must, to avoid losing customers. So our firm gains few extra customers from cutting price. The MR curve corresponding to the kinked AR has a VERTICAL DISCONTINUITY (gap) directly below the kink because the slope changes abruptly. Profit-maximising firms produce where MC = MR. If the MC curve passes through the DISCONTINUITY (anywhere within the vertical gap), then MC can shift UP OR DOWN within that range and the MC=MR intersection stays at Q, so price and output DON'T CHANGE · this explains price rigidity in oligopoly. Only when cost changes are large enough to push MC above or below the entire gap does price adjust. Applies directly to the airline case: fuel-cost shocks are absorbed into margins rather than passed to ticket prices, because firms fear triggering a price war.",
    keyTerms: ["oligopoly", "kinked demand", "interdependence", "price rigidity", "AR", "MR discontinuity", "elastic above", "inelastic below", "MC=MR", "price war"],
    diagramRequirements: [
      { requirement: "Axes labelled Cost/Revenue and Output", marks: 1 },
      { requirement: "Kinked AR curve drawn with clear KINK at point E, price P and quantity Q marked", marks: 2 },
      { requirement: "ELASTIC upper segment and INELASTIC lower segment both labelled", marks: 1 },
      { requirement: "MR curve drawn with clear VERTICAL DISCONTINUITY beneath the kink", marks: 2 },
      { requirement: "MC curve drawn passing THROUGH the MR discontinuity; MC1 and MC2 both shown to demonstrate price stays at P", marks: 1 },
      { requirement: "Written explanation links the gap to price rigidity", marks: 1 },
    ],
  },
  {
    slug: "caie-marshall-lerner-jcurve",
    board: "CAIE",
    tier: "Advanced",
    section: "International",
    marks: 8,
    title: "Marshall-Lerner Condition · J-Curve",
    scenario:
      "In 2023, a developing economy with a persistent current-account deficit allowed its currency to undergo significant depreciation against major trading partners. In the first six months the trade balance WORSENED, causing political pressure to reverse the policy. Central bank economists argue the Marshall-Lerner condition will eventually be met, improving net trade in the long run.",
    question:
      "Using a J-curve diagram, explain the likely effect of currency depreciation on this country's current-account balance in BOTH the short run and the long run. You must: 1) draw and label the J-curve (trade balance on y, time on x); 2) identify the depreciation event and the 'dip' into deeper deficit; 3) explain why the trade balance worsens in the short run (PEDx + PEDm < 1); 4) define the Marshall-Lerner condition and explain improvement in the long run (PEDx + PEDm > 1).",
    figureFile: "/figures/caie-j-curve.svg",
    explanation:
      "The Marshall-Lerner condition states that a currency depreciation will improve the current account ONLY IF the sum of price elasticities of demand for exports and imports exceeds 1 (PEDx + PEDm > 1). Short run: demand for exports and imports is relatively INELASTIC because (i) existing trade contracts are already signed at fixed volumes and prices, (ii) consumers take time to switch to domestic substitutes, and (iii) firms take time to source new suppliers. When the currency depreciates: import prices rise (in domestic currency) but import volumes barely fall → import spending rises; export prices fall (in foreign currency) but export volumes barely rise → export earnings fall or stay flat. Net effect: trade balance WORSENS · the 'dip' of the J. LONG RUN: as contracts expire and consumers/firms adjust, PEDx + PEDm grows above 1. Cheaper exports become more competitive abroad → export VOLUMES rise significantly; expensive imports get substituted for domestic goods → import volumes fall. Net trade position improves, rising ABOVE the original starting level · completing the J shape. Policy takeaway: the depreciation isn't failing at month 6 · it's tracing the short-run dip. The central bank is right to hold the line; reversing now would lock in the short-run pain without the long-run gain.",
    keyTerms: ["Marshall-Lerner condition", "J-curve", "depreciation", "current account", "PEDx", "PEDm", "short run", "long run", "trade balance", "price inelastic"],
    diagramRequirements: [
      { requirement: "Axes labelled: trade balance / current account (y-axis, with zero line) and Time (x-axis)", marks: 1 },
      { requirement: "Horizontal line showing initial trade balance before depreciation", marks: 1 },
      { requirement: "Vertical dashed line marking depreciation event; labelled 'depreciation'", marks: 1 },
      { requirement: "J-shaped curve: flat → dip down (SR deficit worsens) → rise back up through zero → rise ABOVE original level (LR improvement)", marks: 2 },
      { requirement: "Short-run trough explicitly marked and labelled", marks: 1 },
      { requirement: "Long-run improved level explicitly marked and labelled", marks: 1 },
      { requirement: "Marshall-Lerner condition stated: SR PEDx+PEDm < 1; LR PEDx+PEDm > 1", marks: 1 },
    ],
  },
];
