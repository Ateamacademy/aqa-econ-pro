export interface EdexcelBTopic {
  slug: string;
  board: "Edexcel B";
  tier: "Foundation";
  marks: number;
  title: string;
  scenario: string;
  question: string;
  figureFile: string;
  explanation: string;
  keyTerms: string[];
  diagramRequirements: { requirement: string; marks: number }[];
}

export const edexcelBTopics: EdexcelBTopic[] = [
  {
    slug: "supply-demand-coffee",
    board: "Edexcel B",
    tier: "Foundation",
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
];

export function getEdexcelBTopicBySlug(slug: string): EdexcelBTopic | undefined {
  return edexcelBTopics.find((t) => t.slug === slug);
}
