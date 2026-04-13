export interface EdexcelBTopic {
  slug: string;
  board: "Edexcel B";
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

export const edexcelBTopics: EdexcelBTopic[] = [
  // ── Foundation [4 marks] ──
  {
    slug: "supply-demand-coffee",
    board: "Edexcel B",
    tier: "Foundation",
    section: "Microeconomics",
    marks: 4,
    title: "Supply & Demand — Price Mechanism",
    scenario:
      "The UK coffee shop industry, valued at over £5 billion, has faced significant pressure as the global price of Arabica coffee beans rose by 12% in early 2024 due to adverse weather in Brazil. UK chains also reported that the rise in the National Living Wage increased operating costs. Despite these rising costs, consumer demand for 'premium' takeaway coffee has remained relatively stable.",
    question:
      "Using the data in Extract A, draw a supply and demand diagram to show the effect of rising raw material and labour costs on the equilibrium price and quantity of coffee in the UK market.",
    figureFile: "/figures/sd-coffee.svg",
    explanation:
      "Rising bean prices and higher wages are input cost shocks — they shift the SUPPLY curve LEFT (S1 → S2). Demand is unchanged (consumer demand 'remained relatively stable'). New equilibrium: price RISES from P1 to P2, quantity FALLS from Q1 to Q2. The relatively inelastic demand for premium coffee means most of the cost increase is passed on to consumers via higher prices, with a smaller fall in quantity.",
    keyTerms: ["supply", "demand", "equilibrium", "price", "cost-push", "input costs"],
    diagramRequirements: [
      { requirement: "Axes labelled Price (P) on y-axis, Quantity (Q) on x-axis", marks: 1 },
      { requirement: "Original S1 and D drawn correctly with initial equilibrium P1, Q1 marked", marks: 1 },
      { requirement: "Supply shifts LEFT to S2 (cost shock) — demand UNCHANGED", marks: 1 },
      { requirement: "New equilibrium P2 > P1 and Q2 < Q1 clearly marked with dashed lines", marks: 1 },
    ],
  },
  {
    slug: "adas-macro-equilibrium",
    board: "Edexcel B",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Macroeconomic Equilibrium",
    scenario:
      "In 2024 the UK Government announced an additional £20 billion of discretionary fiscal spending on national infrastructure (transport, green energy grids). The aim is to stimulate growth and reduce the output gap.",
    question:
      "Using an AD/AS diagram, illustrate and explain the likely impact of this increased infrastructure spending on the UK's real national output and the general price level.",
    figureFile: "/figures/adas-equilibrium.svg",
    explanation:
      "Government spending (G) is a component of AD (C+I+G+X-M). A £20bn injection shifts AD RIGHT from AD1 to AD2. With a non-vertical SRAS, the new equilibrium shows real output rising (Y1→Y2) AND the price level rising (PL1→PL2). The size of each effect depends on where the economy sits on the AS curve — with spare capacity, mostly output rises; near full employment (LRAS), mostly prices rise.",
    keyTerms: ["aggregate demand", "aggregate supply", "equilibrium", "real output", "price level", "fiscal policy"],
    diagramRequirements: [
      { requirement: "Axes labelled Price Level (PL) and Real GDP (Y)", marks: 1 },
      { requirement: "AD1, SRAS (and ideally LRAS) drawn with initial equilibrium PL1, Y1", marks: 1 },
      { requirement: "AD shifts RIGHT to AD2 (rightward arrow shown)", marks: 1 },
      { requirement: "New equilibrium PL2 > PL1 and Y2 > Y1 clearly marked", marks: 1 },
    ],
  },
  {
    slug: "adas-fiscal-effect",
    board: "Edexcel B",
    tier: "Foundation",
    section: "Macroeconomics",
    marks: 4,
    title: "AD/AS — Fiscal Policy Effect",
    scenario:
      "The UK government announced an additional £20bn for regional transport and green energy. This injection into the circular flow of income shifts AD and creates a new macroeconomic equilibrium. Sluggish consumer demand means the economy currently has spare capacity.",
    question:
      "Using the information in Extract A, draw an AD/AS diagram to show the effect of increased government spending on the UK's price level and real national output. Briefly explain the likely impact on the UK economy.",
    figureFile: "/figures/adas-fiscal.svg",
    explanation:
      "Initial spending shifts AD1→AD2. The MULTIPLIER EFFECT then triggers a further round: higher incomes for construction workers and supply chains lead to extra induced consumption, shifting AD2→AD3. Real output rises Y1→Y3, price level rises GPL1→GPL3. Because the economy has spare capacity (negative output gap), most of the impact is on output rather than prices — inflationary pressure stays low. Risk: if AD3 reaches LRAS, further rises become purely inflationary.",
    keyTerms: ["expansionary fiscal policy", "multiplier", "circular flow", "spare capacity", "output gap", "AD shift"],
    diagramRequirements: [
      { requirement: "PL on y-axis, Real GDP (Y) on x-axis, with LRAS shown as vertical at YP", marks: 1 },
      { requirement: "AD1 and SRAS1 with initial equilibrium GPL1, Y1", marks: 1 },
      { requirement: "AD shifts RIGHT to AD2, then multiplier shifts AD2 → AD3", marks: 1 },
      { requirement: "New equilibrium GPL2/3 > GPL1 and Y2/Y3 > Y1, with multiplier effect labelled", marks: 1 },
    ],
  },
  {
    slug: "labour-trade-union",
    board: "Edexcel B",
    tier: "Foundation",
    section: "Labour Market",
    marks: 4,
    title: "Labour Market — Trade Union Effect",
    scenario:
      "In early 2024 ASLEF (the train drivers' union) entered prolonged negotiations with Train Operating Companies. The union used collective bargaining to push the nominal wage above the existing market equilibrium to offset high inflation.",
    question:
      "Using a labour market diagram, explain how the introduction of a trade union wage agreement might lead to excess supply of labour in the UK rail industry.",
    figureFile: "/figures/labour-union.svg",
    explanation:
      "Without a union, the market clears at We, Qe (where SL = DL). A union-imposed wage floor at Wu (above We) acts like a minimum wage. At Wu: quantity of labour SUPPLIED rises to Qs (more workers want jobs at the higher wage), but quantity of labour DEMANDED falls to Qd (firms hire fewer workers because MRP < Wu for marginal workers). The horizontal gap Qs − Qd is EXCESS SUPPLY OF LABOUR — i.e. unemployment in the rail industry. Trade-off: existing workers gain higher wages, but some workers are priced out.",
    keyTerms: ["trade union", "collective bargaining", "wage floor", "excess supply", "labour demand", "labour supply", "unemployment"],
    diagramRequirements: [
      { requirement: "Axes labelled Wage Rate (W) and Quantity of Labour (Q)", marks: 1 },
      { requirement: "Upward-sloping SL and downward-sloping DL with free-market equilibrium We, Qe shown", marks: 1 },
      { requirement: "Union wage Wu drawn as horizontal line ABOVE We", marks: 1 },
      { requirement: "Excess supply (Qs − Qd) clearly identified at Wu", marks: 1 },
    ],
  },

  // ── Intermediate [6 marks] ──
  {
    slug: "externalities-coal",
    board: "Edexcel B",
    tier: "Intermediate",
    section: "Market Failure",
    marks: 6,
    title: "Market Failure — Externalities",
    scenario:
      "In 2024, the UK officially closed its last coal-fired power station, ending 142 years of coal-generated electricity. Coal provided cheap, reliable energy for firms, but combustion released carbon dioxide and sulfur dioxide — contributing to global warming and respiratory illnesses. These costs are not reflected in the market price of electricity paid by consumers.",
    question:
      "Using a negative production externality diagram, explain why the unregulated production of coal-fired electricity leads to a misallocation of resources and a deadweight loss to society.",
    figureFile: "/figures/externality.svg",
    explanation:
      "In a free market, firms produce where MPC = MPB (= MSB), giving output Q1 at price P1 — they ignore the external cost of pollution. The true social marginal cost (MSC) lies ABOVE MPC by the value of the external cost. The socially optimal output is Q* (< Q1), where MSC = MSB, at a higher price P*. Between Q* and Q1 the extra units generate MSC > MSB — the shaded triangle is the deadweight welfare loss. The market OVER-PRODUCES coal electricity because prices don't reflect the full social cost. Government intervention (carbon tax, emissions cap, closure mandate) internalises the externality and shifts output toward Q*.",
    keyTerms: ["negative externality", "MPC", "MSC", "MPB/MSB", "social optimum", "deadweight loss", "welfare loss", "misallocation"],
    diagramRequirements: [
      { requirement: "Axes labelled Costs/Benefits (£) and Output (Q)", marks: 1 },
      { requirement: "MPC, MPB (=MSB), MSC curves drawn and labelled; MSC clearly ABOVE MPC", marks: 2 },
      { requirement: "Free market equilibrium Q1 (MPC=MPB) and social optimum Q* (MSC=MSB) both identified; Q* < Q1", marks: 1 },
      { requirement: "Welfare loss triangle correctly shaded between Q* and Q1, bounded by MSC and MSB", marks: 1 },
      { requirement: "Written explanation links over-production to ignored external cost + deadweight loss", marks: 1 },
    ],
  },
  {
    slug: "monopoly-netflix",
    board: "Edexcel B",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Cost & Revenue Curves — Profit Maximisation",
    scenario:
      "Netflix dominates the UK video-on-demand market with approximately 45% share. Despite rising competition from Disney+ and Amazon Prime, the firm retains significant monopoly power through its vast library of original content and strong brand loyalty. Netflix seeks to profit-maximise to fund its multi-billion pound content production budget.",
    question:
      "Draw a monopoly diagram to illustrate a firm operating at the profit-maximising level of output. Label the area of supernormal profit and the price (P) and quantity (Q) levels. Using your diagram, explain the reasoning behind the firm's choice of output and why this generates supernormal profit in the long run.",
    figureFile: "/figures/monopoly-profit.svg",
    explanation:
      "A profit-maximising monopolist produces where MC = MR (Qm). The price is set by going UP from Qm to the demand (AR) curve, giving Pm. Since MR lies below D=AR for a price-maker (a discount must be offered on all units to sell one more), Pm > MC at Qm. The unit cost at Qm is read off the ATC curve. Supernormal profit = (Pm − ATC) × Qm — the shaded rectangle. Netflix can sustain this in the long run because of HIGH BARRIERS TO ENTRY: sunk costs in original content, network effects of a large subscriber base, brand loyalty, and intellectual property. These barriers stop new entrants from competing profits away (unlike in perfect competition).",
    keyTerms: ["profit maximisation", "MC=MR", "demand", "AR", "MR", "ATC", "supernormal profit", "barriers to entry", "price-maker"],
    diagramRequirements: [
      { requirement: "Axes labelled Cost/Revenue (£) and Output (Q)", marks: 1 },
      { requirement: "Demand (=AR), MR (steeper, below AR), MC (U), ATC (U) all drawn and labelled", marks: 2 },
      { requirement: "Profit-max point at MC=MR with Qm marked; Pm read up to AR from Qm", marks: 1 },
      { requirement: "ATC at Qm identified; supernormal profit rectangle clearly shaded", marks: 1 },
      { requirement: "Written explanation covers MC=MR rule AND barriers-to-entry reasoning for LR profits", marks: 1 },
    ],
  },
  {
    slug: "natural-monopoly-water",
    board: "Edexcel B",
    tier: "Intermediate",
    section: "Market Structures",
    marks: 6,
    title: "Market Structures — Monopoly vs Perfect Competition",
    scenario:
      "The UK water industry is dominated by regional monopolies (Thames Water, United Utilities). These operate as natural monopolies: high fixed costs and significant economies of scale make it inefficient for more than one firm to provide the infrastructure. Unlike perfect competition, these firms set prices above MC, earning supernormal profits. Ofwat monitors these profits to protect consumers while keeping firms viable.",
    question:
      "Using the information in Extract A and your own economic knowledge, draw a diagram to show a firm operating as a monopoly. Identify the area of supernormal profit and the price/output levels chosen by a profit-maximising firm. Briefly explain why a monopolist can maintain these profits in the long run compared to a firm in perfect competition.",
    figureFile: "/figures/natural-monopoly.svg",
    explanation:
      "A natural monopolist's LRAC falls continuously over the relevant output range because of large economies of scale from high fixed infrastructure costs. MC lies BELOW LRAC (a falling average pulls MC beneath it). Profit-max output Qm is where MC = MR. Pm is found on the demand curve at Qm. Pm exceeds LRAC at Qm, so supernormal profit = (Pm − LRAC) × Qm (shaded rectangle). These profits persist in the long run because high sunk infrastructure costs act as a barrier to entry — no rival can build parallel pipes or the grid profitably. Contrast perfect competition: homogeneous goods, many firms, free entry/exit, so any supernormal profit attracts entrants, LRAC shifts right, and profits compete away to normal in the long run. Ofwat regulates price to prevent consumer exploitation while letting firms earn enough to invest.",
    keyTerms: ["natural monopoly", "economies of scale", "LRAC", "barriers to entry", "MC=MR", "supernormal profit", "perfect competition", "homogeneous goods", "regulation"],
    diagramRequirements: [
      { requirement: "Axes labelled Cost/Revenue (£) and Output (Q)", marks: 1 },
      { requirement: "Downward-sloping LRAC (economies of scale) with MC drawn BELOW LRAC, both labelled", marks: 2 },
      { requirement: "Demand and MR (steeper) drawn and labelled", marks: 1 },
      { requirement: "Qm at MC=MR, Pm read up to D at Qm", marks: 1 },
      { requirement: "Supernormal profit rectangle shaded; explanation covers EoS + barriers vs PC free entry", marks: 1 },
    ],
  },

  // ── Advanced [8 marks] ──
  {
    slug: "phillips-curve-movement",
    board: "Edexcel B",
    tier: "Advanced",
    section: "Macroeconomics",
    marks: 8,
    scenarioVariant: "Single-curve movement",
    title: "Phillips Curve",
    scenario:
      "In 2024 the UK economy experienced persistent cost-push inflation alongside a softening labour market. The Bank of England held interest rates high to curb prices, while some economists argued the government should use fiscal stimulus to lower unemployment. Critics argue any short-term fall in unemployment would only fuel further inflation — illustrating the classic trade-off policymakers face.",
    question:
      "Using an appropriate diagram, explain the trade-off between inflation and unemployment in the UK economy. You must:\n1. Draw and correctly label a Short-Run Phillips Curve (SRPC).\n2. Annotate the movement along the curve to show the effect of an increase in Aggregate Demand.\n3. Explain the economic reasoning behind the relationship shown in your diagram.",
    figureFile: "/figures/phillips-movement.svg",
    explanation:
      "The SRPC plots inflation (y) against unemployment (x) and shows an INVERSE relationship — convex to the origin because at very low unemployment, further reductions cost disproportionately more inflation (labour market becomes tight, wages spike, firms pass costs on). Point A: starting equilibrium (e.g. unemployment 6%, inflation 2%). A fiscal stimulus raises AD → firms hire more workers → unemployment falls to 3% but wage and price pressures rise → inflation climbs to 5% (point B). Movement A→B is ALONG the same SRPC — no shift. Mechanism: the Phillips relationship works through wage-price dynamics: lower unemployment means tighter labour market, stronger worker bargaining power, higher nominal wage growth, which firms pass on as higher prices.",
    keyTerms: ["Phillips Curve", "SRPC", "inflation", "unemployment", "trade-off", "aggregate demand", "wage-price spiral", "tight labour market"],
    diagramRequirements: [
      { requirement: "Axes labelled Inflation rate (%) on y-axis, Unemployment rate (%) on x-axis; realistic % values shown", marks: 1 },
      { requirement: "Single downward-sloping SRPC drawn, convex to origin, labelled 'SRPC' or 'Phillips Curve'", marks: 2 },
      { requirement: "Point A marked at high-unemployment/low-inflation position (e.g. 6%, 2%)", marks: 1 },
      { requirement: "Point B marked at low-unemployment/high-inflation position (e.g. 3%, 5%)", marks: 1 },
      { requirement: "Arrow from A to B along the curve, labelled '↑AD' or similar", marks: 1 },
      { requirement: "Written explanation: inverse relationship + wage-price mechanism + AD stimulus logic", marks: 2 },
    ],
  },
  {
    slug: "lorenz-gini-brazil",
    board: "Edexcel B",
    tier: "Advanced",
    section: "Inequality",
    marks: 8,
    scenarioVariant: "Cross-country comparison",
    title: "Lorenz Curve & Gini Coefficient",
    scenario:
      "Between 2021 and 2024 the UK's Gini Coefficient fluctuated between 0.34 and 0.36, reflecting persistent income inequality. Brazil — despite significant economic growth over the last decade — maintains a Gini Coefficient of approximately 0.49. Critics of UK fiscal policy argue that a shift from progressive taxation toward indirect taxes (like VAT) may further skew the distribution of income, moving the economy away from the line of perfect equality.",
    question:
      "Using the context provided, draw a Lorenz Curve diagram to illustrate the difference in income inequality between a country with a high Gini Coefficient (Brazil) and a country with a lower Gini Coefficient (UK). You must:\n1. Correctly label the axes and the line of perfect equality.\n2. Annotate the areas required to calculate the Gini Coefficient.\n3. Explain how the distance between the Lorenz Curve and the line of equality relates to the degree of inequality in these two nations.",
    figureFile: "/figures/lorenz-brazil.svg",
    explanation:
      "The 45° line is the line of perfect equality — every x% of the population receives exactly x% of total income. A country's Lorenz curve bows BELOW this line; the greater the bow, the greater the inequality. UK curve sits closer to the 45° line (Gini ≈ 0.35). Brazil's curve sits further away (Gini ≈ 0.49) — the bottom 50% of Brazilians hold a much smaller share of national income than the bottom 50% of UK residents. Gini = A / (A + B), where A is the area between the 45° line and the Lorenz curve, and B is the area under the Lorenz curve. As A grows, G rises toward 1; as A shrinks, G falls toward 0. Policy link: progressive taxes pull the curve TOWARD the 45° line (redistributive); indirect taxes like VAT are regressive and push it AWAY, raising G.",
    keyTerms: ["Lorenz Curve", "Gini Coefficient", "line of perfect equality", "cumulative income", "deciles", "progressive taxation", "regressive taxation", "redistribution"],
    diagramRequirements: [
      { requirement: "Axes labelled: cumulative % population (x) and cumulative % income (y), both 0–100", marks: 1 },
      { requirement: "45° line of perfect equality drawn and labelled", marks: 1 },
      { requirement: "Two Lorenz curves drawn: UK closer to 45° line, Brazil further, both labelled with Gini values", marks: 2 },
      { requirement: "Areas A (between 45° line and Lorenz curve) and B (below Lorenz curve) annotated for at least one country", marks: 1 },
      { requirement: "Gini formula G = A/(A+B) shown on the diagram", marks: 1 },
      { requirement: "Written explanation: higher distance = higher G = more inequality; link to UK vs Brazil figures", marks: 2 },
    ],
  },
];

export function getEdexcelBTopicBySlug(slug: string): EdexcelBTopic | undefined {
  return edexcelBTopics.find((t) => t.slug === slug);
}
