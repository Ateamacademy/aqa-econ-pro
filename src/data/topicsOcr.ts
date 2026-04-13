export interface OcrTopic {
  slug: string;
  board: "OCR";
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

export const ocrTopics: OcrTopic[] = [
  // ── Foundation [4 marks] ──
  {
    slug: "sd-housing",
    board: "OCR",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Market Equilibrium",
    scenario:
      "In 2024 the UK government announced planning-system reforms to increase new home building. At the same time, high mortgage rates caused many potential buyers to withdraw from the market.",
    question:
      "Using a demand and supply diagram, explain how these two factors TOGETHER would be expected to impact the equilibrium price and equilibrium quantity in the UK housing market.",
    figureFile: "/figures/sd-housing.svg",
    explanation:
      "Planning reform → SUPPLY shifts RIGHT (S1→S2). Higher mortgage rates reduce affordability → DEMAND shifts LEFT (D1→D2). Both forces push PRICE DOWN unambiguously (P1→P2). Quantity effect is indeterminate: if supply expansion dominates, Q rises; if demand contraction dominates, Q falls; if shifts match, Q unchanged.",
    keyTerms: ["equilibrium", "supply shift", "demand shift", "price mechanism"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity of Housing", marks: 1 },
      { requirement: "Original S1 and D1 intersecting at P1, Q1", marks: 1 },
      { requirement: "S1 → S2 rightward AND D1 → D2 leftward", marks: 1 },
      { requirement: "New equilibrium at lower P2, quantity change commented on", marks: 1 },
    ],
  },
  {
    slug: "indirect-tax-sugar",
    board: "OCR",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Indirect Tax — Incidence on Consumers & Producers",
    scenario:
      "The UK government imposes a specific indirect tax on manufacturers of high-sugar soft drinks to internalise obesity externalities. Demand is relatively price-INELASTIC due to the habit-forming nature of these drinks (UK Soft Drinks Industry Levy, 2018).",
    question:
      "Using a supply and demand diagram, explain the incidence of a specific indirect tax on consumers and producers for a product with inelastic demand.",
    figureFile: "/figures/indirect-tax.svg",
    explanation:
      "The specific tax shifts supply UP VERTICALLY by the tax amount (S1→S2). New equilibrium at higher P2 and lower Q2. Inelastic (steep) D → consumers unresponsive to price, firms pass most of tax on. Consumer incidence (P2−P1) × Q2 is the upper rectangle; producer incidence (P1−Pnet) × Q2 is the lower rectangle. Upper rectangle is clearly larger — consumers bear majority of the burden.",
    keyTerms: ["specific tax", "tax incidence", "inelastic demand", "consumer burden", "producer burden"],
    diagramRequirements: [
      { requirement: "Axes labelled, steep (inelastic) D1 clearly drawn", marks: 1 },
      { requirement: "S1 shifts vertically UP to S2 by tax amount, labelled 'tax'", marks: 1 },
      { requirement: "P1, P2, Pnet and Q1, Q2 marked with dashed lines", marks: 1 },
      { requirement: "Consumer burden (upper) and producer burden (lower) rectangles shaded, consumer portion larger", marks: 1 },
    ],
  },
  {
    slug: "ad-as-demand-pull",
    board: "OCR",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Demand-Pull Inflation",
    scenario:
      "Between 2021 and 2022 UK households released 'pent-up' savings from COVID lockdowns. Rapid consumer spending plus expansionary fiscal policy shifted AD. CPI peaked above 11% in 2022.",
    question:
      "Using an AD/AS diagram, explain the impact of an increase in consumer spending on the UK's price level and real national output. Show an initial equilibrium, the AD shift, and the new equilibrium.",
    figureFile: "/figures/demand-pull.svg",
    explanation:
      "AD = C + I + G + (X−M). A surge in C shifts AD1→AD2 RIGHT. With non-vertical SRAS, equilibrium moves to higher P (P1→P2) and higher Y (Y1→Y2) — demand-pull inflation. Nearer full employment, SRAS steepens → further AD rises translate mostly into inflation, not output. 'Too much money chasing too few goods.'",
    keyTerms: ["aggregate demand", "demand-pull inflation", "SRAS", "consumer spending", "price level", "real GDP"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real GDP", marks: 1 },
      { requirement: "AD1 and SRAS drawn, intersecting at P1, Y1", marks: 1 },
      { requirement: "AD shifts RIGHT to AD2 with arrow indicating ↑C", marks: 1 },
      { requirement: "New equilibrium P2 > P1 and Y2 > Y1 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "ad-as-supply-side",
    board: "OCR",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Supply-Side Policy",
    scenario:
      "The UK government announces a large-scale national infrastructure project funded through discretionary fiscal policy. Focus on the SHORT-RUN impact of the resulting injection into the circular flow.",
    question:
      "Using an AD/AS diagram, explain the impact of increased government infrastructure spending on the UK's Real GDP and Price Level in the short run. Show the shift in the relevant curve, identify the AD component, and explain the change in equilibrium output.",
    figureFile: "/figures/ad-as-g.svg",
    explanation:
      "G is a component of AD. Infrastructure spending is a direct injection into the circular flow → AD1→AD2 (RIGHTWARD shift). Short run: SRAS unchanged (infrastructure only raises productive capacity LATER when complete). New equilibrium: higher Real GDP (Y1→Y2) AND higher price level (P1→P2). This is a short-run DEMAND-side effect. Long-run supply-side gains (LRAS shifting right) appear only once infrastructure is operational.",
    keyTerms: ["government spending", "fiscal policy", "injection", "circular flow", "aggregate demand", "short run"],
    diagramRequirements: [
      { requirement: "Axes: Price Level and Real GDP", marks: 1 },
      { requirement: "AD1 and SRAS drawn with initial equilibrium P1, Y1", marks: 1 },
      { requirement: "AD shifts RIGHT to AD2 with '↑G' arrow", marks: 1 },
      { requirement: "New equilibrium Y2 > Y1 and P2 > P1; written explanation identifies G as the component", marks: 1 },
    ],
  },
  {
    slug: "contestable-aviation",
    board: "OCR",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Contestable Markets — Hit-and-Run Entry",
    scenario:
      "In 2024 the UK short-haul flight market saw rising contestability. Low-cost carriers use 'hit-and-run' entry: they enter when supernormal profits exist, exit when those are eroded, because sunk costs are low (aircraft redeployable).",
    question:
      "Using a supply and demand diagram, explain how the threat of 'hit-and-run' entry by new firms is likely to affect the equilibrium price and quantity of flights in a previously less-competitive market.",
    figureFile: "/figures/contestable.svg",
    explanation:
      "In a less-contestable market, incumbents act quasi-monopolistically — S1 sits LEFT, equilibrium at high P1, low Q1. The credible THREAT of entry (even without actual entry) forces incumbents to expand output and cut prices to deter rivals. Effective market supply shifts right (S1→S2): lower P2, higher Q2. Baumol's key insight: the THREAT alone drives the pricing change.",
    keyTerms: ["contestable market", "hit-and-run entry", "sunk costs", "barriers to entry", "potential competition", "supernormal profit"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity of flights", marks: 1 },
      { requirement: "Original S1 and D drawn with equilibrium at high P1, low Q1", marks: 1 },
      { requirement: "Supply shifts RIGHT to S2 (threat of entry forces expansion)", marks: 1 },
      { requirement: "New equilibrium at lower P2 and higher Q2 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "comparative-advantage-quota",
    board: "OCR",
    tier: "Foundation",
    section: "International",
    marks: 4,
    title: "Comparative Advantage & Terms of Trade",
    scenario:
      "Country A has comparative advantage in wheat (lower opportunity cost). Country B's farmers face a surge of cheap imports. Country B's government imposes a strict QUOTA (physical import limit) on wheat.",
    question:
      "Draw a diagram to show the effect of Country B imposing a quota on wheat imports. Annotate the impact on domestic price, domestic quantity supplied, and volume of imports. Briefly explain how this affects domestic producer surplus.",
    figureFile: "/figures/quota.svg",
    explanation:
      "At world price Pw (below domestic equilibrium), domestic supply is Qs1, demand is Qd1 — imports fill the gap (Qd1 − Qs1). A quota restricts imports to a fixed volume. Market-clearing price rises from Pw to Pq. At Pq: domestic supply expands (Qs1→Qs2), domestic demand contracts (Qd1→Qd2). Imports fall to quota volume (Qd2 − Qs2). Domestic producer surplus RISES (higher price + higher output) but consumer surplus falls and deadweight welfare losses emerge — the trade-off of protectionism.",
    keyTerms: ["comparative advantage", "quota", "world price", "domestic supply", "imports", "producer surplus", "protectionism"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity of Wheat; domestic S and D drawn", marks: 1 },
      { requirement: "World price Pw shown as horizontal line BELOW domestic equilibrium; initial imports identified", marks: 1 },
      { requirement: "Post-quota higher price Pq, with Qs2 > Qs1 and Qd2 < Qd1", marks: 1 },
      { requirement: "Quota volume (Qd2 − Qs2) labelled; producer-surplus increase annotated", marks: 1 },
    ],
  },

  // ── Intermediate [6 marks] ──
  {
    slug: "cost-push-energy",
    board: "OCR",
    tier: "Intermediate",
    section: "Macroeconomics",
    marks: 6,
    title: "AD/AS — Cost-Push Inflation",
    scenario:
      "In 2022–2023 the UK experienced a major supply-side shock as global wholesale gas and electricity prices hit record highs. This raised production costs across nearly all industrial sectors. The UK faced cost-push inflation — the general price level rose despite sluggish growth.",
    question:
      "Using the information provided and your macro knowledge, draw an AD/AS diagram to show the effect of an increase in energy prices on the UK's price level and real GDP. You must:\n1. Draw and correctly label the diagram using the Short-Run Aggregate Supply (SRAS) curve.\n2. Annotate the diagram to show the change in equilibrium.\n3. Explain the transmission mechanism through which rising energy costs lead to a change in the macroeconomic equilibrium.",
    figureFile: "/figures/cost-push.svg",
    explanation:
      "Energy is a core input for firms across manufacturing, services, transport, and retail. When wholesale gas and electricity prices rise, per-unit production costs rise for essentially every firm simultaneously — this is a NEGATIVE supply-side shock. The SRAS curve shifts LEFT from SRAS1 to SRAS2 (producers now require a higher price to supply the same output). At unchanged AD, the new equilibrium moves from A (Y1, P1) to B (Y2, P2). Real output FALLS (Y1→Y2) and the price level RISES (P1→P2) — the definition of STAGFLATION. Transmission mechanism: ↑energy cost → ↑unit production cost → firms raise output prices to protect margins → ↑general price level; simultaneously firms cut output because higher costs squeeze profitability at any given price → ↓real GDP. Note LRAS is unchanged (productive capacity is unaffected unless the cost shock becomes permanent).",
    keyTerms: ["cost-push inflation", "supply-side shock", "SRAS", "transmission mechanism", "stagflation", "real GDP", "price level", "production costs"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level and Real Output (Y); LRAS drawn vertical at YFE", marks: 1 },
      { requirement: "AD drawn downward-sloping and SRAS1 drawn upward-sloping", marks: 1 },
      { requirement: "SRAS shifts LEFT to SRAS2 with clear arrow indicating the leftward shift", marks: 2 },
      { requirement: "Initial equilibrium A (Y1=YFE, P1) and new equilibrium B (Y2, P2) both marked; P2 > P1 and Y2 < YFE", marks: 1 },
      { requirement: "Written explanation covers transmission mechanism: ↑energy cost → ↑unit cost → SRAS shifts left → stagflation", marks: 1 },
    ],
  },
  {
    slug: "monopoly-abnormal-profit",
    board: "OCR",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Monopoly — Abnormal Profit",
    scenario:
      "In the UK, regional water companies often operate as natural monopolies within their geographic areas. High barriers to entry — especially sunk costs in infrastructure — mean these firms face little or no competition. In 2023 several reported significant financial returns, sparking public debate about profit levels for essential-utility providers.",
    question:
      "Using a diagram, explain how a monopoly firm can earn abnormal profit in the long run. In your response you should:\n1. Draw and correctly label a monopoly diagram.\n2. Identify the area of supernormal (abnormal) profit.\n3. Explain the relationship between Average Revenue (AR) and Average Total Cost (ATC) that allows this profit to persist.",
    figureFile: "/figures/monopoly-abnormal.svg",
    explanation:
      "A monopolist profit-maximises where MC = MR, giving output Qm. The price Pm is found by going UP from Qm to the DEMAND (=AR) curve. The AVERAGE TOTAL COST at Qm is read off the ATC curve. Because Pm (=AR at Qm) > ATC at Qm, the firm earns ABNORMAL (SUPERNORMAL) PROFIT equal to (AR − ATC) × Q — the shaded rectangle. This profit persists in the LONG RUN because HIGH BARRIERS TO ENTRY prevent rivals entering and bidding profits away. For UK water companies, barriers include: enormous sunk costs in pipe networks and treatment plants, geographical/legal monopoly rights granted by regulators, and economies of scale that make duplicate infrastructure wasteful.",
    keyTerms: ["monopoly", "profit maximisation", "MC=MR", "abnormal profit", "supernormal profit", "AR", "ATC", "barriers to entry", "sunk costs", "long run"],
    diagramRequirements: [
      { requirement: "Axes labelled Price/Cost and Output (Q)", marks: 1 },
      { requirement: "D = AR (downward sloping) and MR (steeper, half-slope) drawn and labelled", marks: 1 },
      { requirement: "MC (U-shape) and ATC (U-shape) drawn and labelled", marks: 1 },
      { requirement: "Profit-max point identified at MC = MR giving Qm; Pm read up to AR", marks: 1 },
      { requirement: "ATC at Qm identified; abnormal profit rectangle clearly shaded with AR > ATC labelled", marks: 1 },
      { requirement: "Written explanation links AR > ATC to abnormal profit and barriers-to-entry to long-run persistence", marks: 1 },
    ],
  },

  // ── Advanced [8 marks] ──
  {
    slug: "negative-externality-welfare",
    board: "OCR",
    tier: "Advanced",
    section: "Market Failure",
    marks: 8,
    title: "Negative Externality — Welfare Loss Triangle",
    scenario:
      "The UK Government has identified that continued operation of coal-fired power stations generates significant external costs — carbon emissions and local air pollution. These costs are not reflected in the market price of electricity, producing misallocation of resources and a welfare loss to society.",
    question:
      "Using a negative production externality diagram, explain why the unregulated production of electricity from coal leads to market failure. Your answer must show the socially optimum level of output and the resulting area of deadweight welfare loss. [Key point: to reach top band, ensure the vertical distance between MPC and MSC clearly represents the Marginal External Cost (MEC).]",
    figureFile: "/figures/neg-externality-welfare.svg",
    explanation:
      "In a free market, producers weigh only their PRIVATE costs (MPC). Firms maximise profit where MPC = MPB (=MSB) giving market output Qm at market price Pm. The TRUE social cost of coal electricity is MSC = MPC + MEC, where MEC captures carbon emissions and local air pollution valued in £ terms. MSC sits ABOVE MPC by a constant MEC vertical gap. The SOCIALLY OPTIMUM output is Q* where MSC = MSB, at a higher price P*. Between Q* and Qm, each additional unit adds MSC > MSB — the shaded WELFARE-LOSS TRIANGLE bounded by MSC, MSB, and the vertical at Qm. This is the deadweight loss: net welfare society loses from over-production.",
    keyTerms: ["negative externality", "MPC", "MSC", "MEC", "MPB/MSB", "social optimum", "welfare loss", "deadweight loss", "Pigouvian tax"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "MPB = MSB = Demand (downward), MPC = Supply (upward), MSC (upward, above MPC by constant MEC gap) — all three labelled", marks: 2 },
      { requirement: "MEC gap annotated as vertical distance between MPC and MSC", marks: 1 },
      { requirement: "Market equilibrium Qm, Pm (MPC = MPB) AND social optimum Q*, P* (MSC = MSB) both marked; Q* < Qm", marks: 2 },
      { requirement: "Welfare-loss triangle correctly shaded between Q* and Qm, bounded by MSC above and MSB below", marks: 1 },
      { requirement: "Written explanation: over-production logic + link to Pigouvian tax correction", marks: 1 },
    ],
  },
  {
    slug: "positive-externality-welfare",
    board: "OCR",
    tier: "Advanced",
    section: "Market Failure",
    marks: 8,
    title: "Positive Externality — Welfare Gain",
    scenario:
      "In 2024 the UK government faced pressure to reintroduce EV consumer incentives. Private benefit to the driver includes lower running costs, but society also benefits: reduced NO₂ emissions and improved urban air quality lower the NHS cost burden. In a free market, consumers consider only MPB, leading to consumption BELOW the social optimum.",
    question:
      "Using a positive externality diagram, explain why the free market under-consumes electric vehicles and identify the area of welfare gain that would be created if the economy moved to the socially optimum level of output. Your response should include:\n1. A correctly labelled positive externality diagram showing MPB, MSB, and MSC curves.\n2. Clear identification of the market equilibrium (Q1) and the socially optimum equilibrium (Q*).\n3. Shading of the area representing the potential welfare gain at the free market equilibrium.\n4. A written explanation of why the Marginal External Benefit (MEB) leads to market failure.",
    figureFile: "/figures/pos-externality-welfare.svg",
    explanation:
      "EVs generate a POSITIVE consumption externality: cleaner air benefits non-drivers (reduced respiratory illness → lower NHS costs, productivity gains). MSB = MPB + MEB, so MSB sits ABOVE MPB by a constant MEB gap. In the free market, consumers weigh only MPB, so market equilibrium is at Q1 where MPB = MPC (=MSC). But the SOCIAL OPTIMUM is at Q* where MSB = MSC, with Q* > Q1 — society wants MORE EVs than the market provides. Under-consumption occurs because consumers don't capture the external benefit themselves.",
    keyTerms: ["positive externality", "MPB", "MSB", "MEB", "MPC = MSC", "social optimum", "welfare gain", "under-consumption", "subsidy"],
    diagramRequirements: [
      { requirement: "Axes labelled Price and Quantity", marks: 1 },
      { requirement: "MPC = MSC (upward), MPB (downward), MSB (downward, ABOVE MPB by constant MEB) — all three labelled", marks: 2 },
      { requirement: "MEB gap annotated as vertical distance between MPB and MSB", marks: 1 },
      { requirement: "Market equilibrium Q1 (MPB = MSC) and social optimum Q* (MSB = MSC) marked; Q* > Q1", marks: 2 },
      { requirement: "Welfare-gain triangle shaded between Q1 and Q*, bounded by MSB above and MSC below", marks: 1 },
      { requirement: "Written explanation: MEB causes under-consumption + subsidy corrects", marks: 1 },
    ],
  },
  {
    slug: "monopsony-social-care",
    board: "OCR",
    tier: "Advanced",
    section: "Labour Market",
    marks: 8,
    title: "Labour Market — Monopsony",
    scenario:
      "In many UK regions the local authority is the dominant buyer of social care services — effectively sole employer for thousands of care workers. Reports indicate wage restraint: pay is significantly below competing retail and hospitality sectors.",
    question:
      "Using a labour market diagram, explain how monopsony power in the social care sector can lead to BOTH lower wages AND lower levels of employment compared to a perfectly competitive labour market. You must:\n1. Draw a correctly labelled monopsony labour market diagram.\n2. Annotate the profit-max (cost-min) employment L1 and wage W1.\n3. Contrast with the competitive equilibrium (Wc, Lc).\n4. Provide a logical chain of reasoning on the MCL–ACL relationship.",
    figureFile: "/figures/monopsony-care.svg",
    explanation:
      "The monopsonist faces the upward-sloping market supply of labour (S_L = AC_L). To attract an additional worker, the monopsonist must raise the wage — AND pay that higher wage to ALL existing workers (no wage discrimination). Therefore MC_L rises faster than AC_L: the MC_L curve sits ABOVE and is STEEPER than AC_L. Profit-maximising employment is where MC_L = MRP_L (=D_L), giving employment L1. The wage paid is read off the supply curve (AC_L) at L1, giving W1 — which is BELOW MC_L at that point.",
    keyTerms: ["monopsony", "MC_L", "AC_L", "MRP_L", "wage exploitation", "competitive equilibrium", "supply of labour", "profit maximisation"],
    diagramRequirements: [
      { requirement: "Axes labelled Wage Rate and Employment", marks: 1 },
      { requirement: "S_L = AC_L (upward), MC_L (upward, ABOVE and STEEPER than AC_L), MRP_L = D_L (downward) — all three labelled", marks: 2 },
      { requirement: "Monopsony point: L1 at MC_L = MRP_L; W1 read down to AC_L at L1", marks: 1 },
      { requirement: "Competitive point: Lc at S_L = MRP_L; Wc on same curve. Lc > L1 AND Wc > W1 clearly shown", marks: 2 },
      { requirement: "'Lost wages' rectangle between Wc and W1 at L1 shaded", marks: 1 },
      { requirement: "Written explanation: MC_L > AC_L logic because raising wage applies to ALL workers", marks: 1 },
    ],
  },
  {
    slug: "phillips-curve-srlr",
    board: "OCR",
    tier: "Advanced",
    section: "Macroeconomics",
    marks: 8,
    title: "Phillips Curve — Short Run vs Long Run",
    scenario:
      "The UK economy in 2024 faced persistent inflation above the 2% target. After expansionary monetary and fiscal policy, unemployment initially fell below its Natural Rate (NRU) but eventually returned to the NRU as inflation expectations adjusted upward.",
    question:
      "Using BOTH an AD/AS diagram AND a Phillips Curve diagram, explain why an attempt by the government to reduce unemployment below the NRU through expansionary policy will only lead to higher inflation in the long run. Your response should show:\n1. In the AD/AS diagram: AD shifting right along SRAS, causing a temporary expansion of output above YFE, then SRAS shifting left as input costs adjust.\n2. In the Phillips Curve diagram: a movement from point A to B along SRPC1 (lower unemployment, higher inflation), then a shift to SRPC2 returning to the NRU at point C with permanently higher inflation.\n3. A vertical LRPC at the NRU.",
    figureFile: "/figures/phillips-srlr.svg",
    explanation:
      "PANEL A (AD/AS): The economy starts at long-run equilibrium where AD1 = SRAS1 = LRAS at YFE, price level Pe. Expansionary policy shifts AD1→AD2, moving equilibrium UP along SRAS1 to Y2 (above YFE) and price level P2. Output above YFE is unsustainable — an inflationary gap emerges. Workers notice their real wages have fallen and negotiate higher nominal wages; firms' input costs rise; SRAS1 shifts LEFT to SRAS2. Final long-run equilibrium returns to YFE (on LRAS) but at higher price level P3. PANEL B (Phillips): Movement from A (NRU, π1) to B (U1<NRU, π2) is ALONG SRPC1. Inflation expectations adjust upward, shifting SRPC1→SRPC2. Unemployment returns to the NRU but inflation is now permanently higher — point C. The LRPC is vertical at the NRU.",
    keyTerms: ["Phillips Curve", "SRPC", "LRPC", "NRU", "natural rate", "inflation expectations", "expectations-augmented", "AD/AS", "LRAS", "money neutrality"],
    diagramRequirements: [
      { requirement: "TWO-panel diagram: AD/AS on left, Phillips on right, both axes labelled", marks: 2 },
      { requirement: "AD/AS panel: AD1, AD2, SRAS1, SRAS2, LRAS — all labelled — with YFE, Y2 and price levels Pe, P2, P3 marked", marks: 2 },
      { requirement: "Phillips panel: SRPC1, SRPC2 (shifted right/up) and vertical LRPC at NRU labelled", marks: 2 },
      { requirement: "Three points A, B, C on Phillips panel: A (NRU, π1), B (U1<NRU, π2), C (NRU, π2) with movement A→B→C indicated", marks: 1 },
      { requirement: "Written explanation links the two panels: AD shift = movement along SRPC; SRAS shift = SRPC shift; LRPC = vertical at NRU", marks: 1 },
    ],
  },
];
