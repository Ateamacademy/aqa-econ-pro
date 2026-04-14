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
    title: "Supply & Demand — Market Equilibrium",
    scenario:
      "The global market for Arabica coffee beans begins in equilibrium. A period of perfect weather in Brazil significantly increases the harvest yield for coffee farmers.",
    question:
      "Using a supply and demand diagram, explain the effect of this increased harvest on the equilibrium price and quantity of coffee beans. Your response must: 1) draw the initial equilibrium Pe, Qe; 2) show the shift in the relevant curve caused by the increased harvest; 3) identify the new market equilibrium and resulting changes.",
    figureFile: "/figures/caie-sd-coffee.svg",
    explanation:
      "A larger harvest is a favourable SUPPLY-side shock — at every price, producers now supply more. Supply shifts RIGHT (S1→S2). Demand is unchanged. New equilibrium: Pe1 → Pe2 (price falls) and Qe1 → Qe2 (quantity rises).",
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
    title: "Price Elasticity of Demand — Effect on Revenue",
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
    title: "Indirect Tax — Consumer vs Producer Burden",
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
    title: "AD/AS — Inflationary / Deflationary Gap",
    scenario:
      "The economy of a middle-income country is currently operating at full-employment output (Yf). Following a sustained increase in imported oil and gas prices, firms across all sectors experience a sharp rise in production costs.",
    question:
      "Using an AD/AS diagram, explain the effect of rising energy prices on the country's general price level and real national output. You must: 1) show the initial equilibrium at Yf; 2) show the shift in the relevant curve from higher production costs; 3) identify the resulting type of inflation and the output gap.",
    figureFile: "/figures/caie-inflationary-gap.svg",
    explanation:
      "Rising input costs shift SRAS LEFT (SRAS1→SRAS2). New equilibrium: higher price level and lower real output — cost-push inflation with a negative (recessionary) output gap. This is STAGFLATION.",
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
    title: "Comparative Advantage — PPC Approach",
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
    title: "The Multiplier — AD Shift",
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
];
