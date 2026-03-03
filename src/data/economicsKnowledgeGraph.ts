/**
 * Economics Knowledge Graph — Maps topic relationships, Bloom's taxonomy levels,
 * and cross-topic synoptic links for generating Higher Order Thinking Skills (HOTS) questions.
 *
 * Based on AQA A-Level Economics specification, textbooks, workbooks, exam technique guides,
 * and past papers 2017–2024.
 */

export interface KnowledgeNode {
  id: string;
  topic: string;
  subtopic: string;
  paper: "1" | "2" | "3";
  bloomLevel: "remember" | "understand" | "apply" | "analyse" | "evaluate" | "create";
  keywords: string[];
  relatedTopics: string[]; // IDs of related nodes for synoptic links
  questionStems: string[]; // Example question stems at this Bloom's level
  markAllocation: number;
  hotsCategory?: "application" | "analysis" | "evaluation" | "synthesis";
}

export interface SynopticLink {
  from: string; // node ID
  to: string;   // node ID
  relationship: string; // How these topics connect
  exampleQuestion: string; // A HOTS question linking both
}

// ─── KNOWLEDGE NODES ─────────────────────────────────────────────────

export const ECONOMICS_KNOWLEDGE_NODES: KnowledgeNode[] = [
  // ── PAPER 1: MICROECONOMICS ──

  // Topic: Scarcity & Choice
  {
    id: "micro-scarcity",
    topic: "Economic Problem",
    subtopic: "Scarcity, choice and opportunity cost",
    paper: "1",
    bloomLevel: "understand",
    keywords: ["scarcity", "opportunity cost", "PPF", "factors of production", "free goods", "economic goods"],
    relatedTopics: ["micro-ppf", "macro-growth", "macro-fiscal"],
    questionStems: [
      "Define opportunity cost. [2 marks]",
      "Using a PPF diagram, explain the concept of opportunity cost. [9 marks]",
    ],
    markAllocation: 2,
  },
  {
    id: "micro-ppf",
    topic: "Economic Problem",
    subtopic: "Production Possibility Frontiers",
    paper: "1",
    bloomLevel: "apply",
    keywords: ["PPF", "productive efficiency", "economic growth", "reallocation", "outward shift"],
    relatedTopics: ["micro-scarcity", "macro-growth", "macro-supply-side"],
    questionStems: [
      "Using a PPF diagram, explain the likely effect of increased investment in technology on an economy's productive capacity. [9 marks]",
    ],
    markAllocation: 9,
  },

  // Topic: Price Mechanism
  {
    id: "micro-demand",
    topic: "Price Determination",
    subtopic: "Demand: individual and market",
    paper: "1",
    bloomLevel: "apply",
    keywords: ["demand curve", "shifts in demand", "movements along", "conditions of demand", "ceteris paribus"],
    relatedTopics: ["micro-supply", "micro-elasticity-ped", "micro-market-equilibrium"],
    questionStems: [
      "Using a supply and demand diagram, explain the likely effect of a rise in consumer income on the market for organic food. [9 marks]",
    ],
    markAllocation: 9,
  },
  {
    id: "micro-supply",
    topic: "Price Determination",
    subtopic: "Supply: individual and market",
    paper: "1",
    bloomLevel: "apply",
    keywords: ["supply curve", "shifts in supply", "costs of production", "technology", "subsidies"],
    relatedTopics: ["micro-demand", "micro-market-equilibrium", "macro-sras"],
    questionStems: [
      "Explain two factors that could cause the supply curve for electric vehicles to shift to the right. [4 marks]",
    ],
    markAllocation: 4,
  },
  {
    id: "micro-market-equilibrium",
    topic: "Price Determination",
    subtopic: "Price determination and market equilibrium",
    paper: "1",
    bloomLevel: "analyse",
    keywords: ["equilibrium price", "equilibrium quantity", "excess demand", "excess supply", "price mechanism"],
    relatedTopics: ["micro-demand", "micro-supply", "micro-gov-intervention"],
    questionStems: [
      "Analyse the likely effect on the equilibrium price and quantity of housing if the government introduces a rent cap below the market equilibrium. [9 marks]",
    ],
    markAllocation: 9,
  },

  // Topic: Elasticity
  {
    id: "micro-elasticity-ped",
    topic: "Elasticity",
    subtopic: "Price elasticity of demand",
    paper: "1",
    bloomLevel: "apply",
    keywords: ["PED", "elastic", "inelastic", "unit elastic", "total revenue", "determinants of PED"],
    relatedTopics: ["micro-demand", "micro-elasticity-yed", "micro-elasticity-xed", "micro-indirect-tax"],
    questionStems: [
      "Calculate the PED from the data in Extract A. Comment on the significance of your answer for the firm's pricing strategy. [4 marks]",
    ],
    markAllocation: 4,
  },
  {
    id: "micro-elasticity-yed",
    topic: "Elasticity",
    subtopic: "Income elasticity of demand",
    paper: "1",
    bloomLevel: "analyse",
    keywords: ["YED", "normal goods", "inferior goods", "luxury goods", "necessity", "income changes"],
    relatedTopics: ["micro-elasticity-ped", "macro-growth", "macro-inequality"],
    questionStems: [
      "Using the concept of YED, analyse how a recession might affect demand for different types of goods. [9 marks]",
    ],
    markAllocation: 9,
  },
  {
    id: "micro-elasticity-xed",
    topic: "Elasticity",
    subtopic: "Cross elasticity of demand",
    paper: "1",
    bloomLevel: "apply",
    keywords: ["XED", "substitutes", "complements", "independent goods", "cross-price"],
    relatedTopics: ["micro-elasticity-ped", "micro-market-structures"],
    questionStems: [
      "Calculate XED from the data. What does this tell you about the relationship between these two goods? [4 marks]",
    ],
    markAllocation: 4,
  },

  // Topic: Market Failure
  {
    id: "micro-externalities",
    topic: "Market Failure",
    subtopic: "Externalities",
    paper: "1",
    bloomLevel: "evaluate",
    keywords: ["MSC", "MPC", "MSB", "MPB", "negative externality", "positive externality", "welfare loss", "deadweight loss"],
    relatedTopics: ["micro-gov-intervention", "micro-indirect-tax", "macro-environment"],
    questionStems: [
      "Using a diagram, explain how negative externalities of production lead to market failure. [9 marks]",
      "Evaluate the view that taxation is the most effective way to correct negative externalities. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "micro-public-goods",
    topic: "Market Failure",
    subtopic: "Public goods and quasi-public goods",
    paper: "1",
    bloomLevel: "analyse",
    keywords: ["non-excludable", "non-rivalrous", "free rider problem", "under-provision", "quasi-public"],
    relatedTopics: ["micro-externalities", "micro-gov-intervention", "macro-fiscal"],
    questionStems: [
      "Explain why public goods represent a case of complete market failure. [9 marks]",
    ],
    markAllocation: 9,
  },
  {
    id: "micro-merit-demerit",
    topic: "Market Failure",
    subtopic: "Merit and demerit goods",
    paper: "1",
    bloomLevel: "evaluate",
    keywords: ["information failure", "under-consumption", "over-consumption", "paternalism", "bounded rationality"],
    relatedTopics: ["micro-externalities", "micro-gov-intervention", "micro-behavioural"],
    questionStems: [
      "Evaluate whether the government should ban the advertising of demerit goods such as sugary drinks. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "micro-behavioural",
    topic: "Market Failure",
    subtopic: "Behavioural economics",
    paper: "1",
    bloomLevel: "evaluate",
    keywords: ["nudge theory", "bounded rationality", "choice architecture", "default bias", "anchoring", "heuristics"],
    relatedTopics: ["micro-merit-demerit", "micro-gov-intervention"],
    questionStems: [
      "Evaluate the effectiveness of nudge theory as an alternative to traditional government intervention. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },

  // Topic: Government Intervention
  {
    id: "micro-indirect-tax",
    topic: "Government Intervention",
    subtopic: "Indirect taxes and subsidies",
    paper: "1",
    bloomLevel: "analyse",
    keywords: ["ad valorem tax", "specific tax", "subsidy", "tax incidence", "deadweight loss", "PED impact"],
    relatedTopics: ["micro-externalities", "micro-elasticity-ped", "macro-fiscal"],
    questionStems: [
      "Using a diagram, analyse the impact of an indirect tax on a good with inelastic demand. [9 marks]",
    ],
    markAllocation: 9,
    hotsCategory: "analysis",
  },
  {
    id: "micro-gov-intervention",
    topic: "Government Intervention",
    subtopic: "Government failure and regulation",
    paper: "1",
    bloomLevel: "evaluate",
    keywords: ["government failure", "unintended consequences", "information gaps", "regulatory capture", "rent-seeking"],
    relatedTopics: ["micro-externalities", "micro-public-goods", "micro-market-structures"],
    questionStems: [
      "Evaluate the view that government intervention to correct market failure always leads to a more efficient allocation of resources. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },

  // Topic: Market Structures
  {
    id: "micro-market-structures",
    topic: "Market Structures",
    subtopic: "Perfect competition, monopoly, oligopoly, monopolistic competition",
    paper: "1",
    bloomLevel: "evaluate",
    keywords: ["barriers to entry", "supernormal profit", "allocative efficiency", "productive efficiency", "dynamic efficiency", "price maker", "price taker", "contestable markets"],
    relatedTopics: ["micro-gov-intervention", "micro-elasticity-ped", "macro-supply-side"],
    questionStems: [
      "Evaluate the view that monopolies are always against the public interest. [25 marks]",
      "Using a diagram, explain how a profit-maximising monopolist determines its price and output. [9 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },

  // Topic: Labour Market
  {
    id: "micro-labour",
    topic: "Labour Market",
    subtopic: "Wage determination and labour market failure",
    paper: "1",
    bloomLevel: "evaluate",
    keywords: ["MRP", "monopsony", "trade unions", "minimum wage", "wage differentials", "human capital"],
    relatedTopics: ["micro-market-structures", "macro-unemployment", "macro-inequality"],
    questionStems: [
      "Evaluate the impact of a national living wage on employment and poverty. [25 marks]",
      "Using a monopsony diagram, explain why wages may be set below the competitive equilibrium. [9 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },

  // ── PAPER 2: MACROECONOMICS ──

  {
    id: "macro-ad",
    topic: "Aggregate Demand",
    subtopic: "AD components and shifts",
    paper: "2",
    bloomLevel: "apply",
    keywords: ["consumption", "investment", "government spending", "net exports", "AD curve", "wealth effect"],
    relatedTopics: ["macro-as", "macro-multiplier", "macro-fiscal", "macro-monetary"],
    questionStems: [
      "Using an AD/AS diagram, explain the likely impact of a fall in consumer confidence on the UK economy. [9 marks]",
    ],
    markAllocation: 9,
  },
  {
    id: "macro-as",
    topic: "Aggregate Supply",
    subtopic: "SRAS, LRAS (Keynesian vs Classical)",
    paper: "2",
    bloomLevel: "analyse",
    keywords: ["SRAS", "LRAS", "Classical LRAS", "Keynesian LRAS", "spare capacity", "full employment output"],
    relatedTopics: ["macro-ad", "macro-supply-side", "macro-growth"],
    questionStems: [
      "Compare the Classical and Keynesian views of the long-run aggregate supply curve. [9 marks]",
    ],
    markAllocation: 9,
    hotsCategory: "analysis",
  },
  {
    id: "macro-growth",
    topic: "Economic Growth",
    subtopic: "Short-run and long-run growth, sustainability",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["real GDP", "GDP per capita", "trend growth", "output gap", "potential output", "sustainability", "green growth"],
    relatedTopics: ["micro-ppf", "macro-ad", "macro-supply-side", "macro-environment"],
    questionStems: [
      "Evaluate the extent to which economic growth is compatible with environmental sustainability. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-unemployment",
    topic: "Unemployment",
    subtopic: "Types, causes, consequences",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["cyclical", "structural", "frictional", "seasonal", "real wage", "natural rate", "NAIRU", "hysteresis"],
    relatedTopics: ["macro-phillips", "macro-fiscal", "macro-supply-side", "micro-labour"],
    questionStems: [
      "Evaluate the effectiveness of supply-side policies in reducing structural unemployment. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-inflation",
    topic: "Inflation",
    subtopic: "Causes, measurement, consequences",
    paper: "2",
    bloomLevel: "analyse",
    keywords: ["CPI", "RPI", "demand-pull", "cost-push", "inflation expectations", "deflation", "hyperinflation", "shoe-leather costs"],
    relatedTopics: ["macro-monetary", "macro-phillips", "macro-ad"],
    questionStems: [
      "Analyse the consequences of a sustained period of deflation for the UK economy. [9 marks]",
    ],
    markAllocation: 9,
    hotsCategory: "analysis",
  },
  {
    id: "macro-phillips",
    topic: "Phillips Curve",
    subtopic: "Short-run and long-run Phillips Curve",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["SRPC", "LRPC", "expectations-augmented", "NAIRU", "stagflation", "trade-off"],
    relatedTopics: ["macro-inflation", "macro-unemployment", "macro-monetary"],
    questionStems: [
      "Using a Phillips Curve diagram, evaluate the view that there is no long-run trade-off between inflation and unemployment. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-fiscal",
    topic: "Fiscal Policy",
    subtopic: "Government spending, taxation, budget deficit, national debt",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["expansionary", "contractionary", "automatic stabilisers", "discretionary", "budget deficit", "national debt", "crowding out", "Laffer curve"],
    relatedTopics: ["macro-ad", "macro-multiplier", "macro-supply-side", "micro-indirect-tax"],
    questionStems: [
      "Evaluate the effectiveness of expansionary fiscal policy in stimulating economic recovery. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-monetary",
    topic: "Monetary Policy",
    subtopic: "Interest rates, QE, money supply",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["Bank of England", "MPC", "base rate", "QE", "transmission mechanism", "liquidity trap", "time lags"],
    relatedTopics: ["macro-ad", "macro-inflation", "macro-exchange-rate"],
    questionStems: [
      "Evaluate the effectiveness of quantitative easing as a monetary policy tool. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-supply-side",
    topic: "Supply-Side Policies",
    subtopic: "Market-based and interventionist",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["deregulation", "privatisation", "education", "training", "infrastructure", "R&D", "labour market flexibility"],
    relatedTopics: ["macro-as", "macro-growth", "macro-unemployment", "micro-market-structures"],
    questionStems: [
      "Evaluate the view that market-based supply-side policies are more effective than interventionist policies in promoting long-run economic growth. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-multiplier",
    topic: "Multiplier",
    subtopic: "Multiplier effect and calculations",
    paper: "2",
    bloomLevel: "apply",
    keywords: ["MPC", "MPS", "MPT", "MPM", "multiplier formula", "injection", "withdrawal"],
    relatedTopics: ["macro-fiscal", "macro-ad"],
    questionStems: [
      "If MPC = 0.75, calculate the multiplier. Hence calculate the total impact on GDP of a £10 billion increase in government spending. [4 marks]",
    ],
    markAllocation: 4,
  },
  {
    id: "macro-bop",
    topic: "Balance of Payments",
    subtopic: "Current account, capital account, financial account",
    paper: "2",
    bloomLevel: "analyse",
    keywords: ["current account deficit", "capital flows", "trade deficit", "invisibles", "J-curve", "Marshall-Lerner"],
    relatedTopics: ["macro-exchange-rate", "macro-globalisation"],
    questionStems: [
      "Analyse the possible causes and consequences of a persistent current account deficit. [9 marks]",
    ],
    markAllocation: 9,
    hotsCategory: "analysis",
  },
  {
    id: "macro-exchange-rate",
    topic: "Exchange Rates",
    subtopic: "Floating, fixed, managed, impacts",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["appreciation", "depreciation", "floating", "fixed", "managed float", "competitiveness", "hot money"],
    relatedTopics: ["macro-bop", "macro-monetary", "macro-globalisation"],
    questionStems: [
      "Evaluate the impact of a significant depreciation of sterling on the UK economy. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-globalisation",
    topic: "Globalisation",
    subtopic: "Trade, FDI, MNCs, protectionism",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["free trade", "comparative advantage", "protectionism", "tariffs", "quotas", "WTO", "trading blocs", "FDI"],
    relatedTopics: ["macro-bop", "macro-exchange-rate", "macro-inequality"],
    questionStems: [
      "Evaluate the view that globalisation has been beneficial for developing countries. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-inequality",
    topic: "Inequality",
    subtopic: "Distribution of income and wealth",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["Gini coefficient", "Lorenz curve", "poverty", "progressive taxation", "universal credit", "absolute vs relative poverty"],
    relatedTopics: ["macro-fiscal", "micro-labour", "macro-globalisation"],
    questionStems: [
      "Evaluate government policies aimed at reducing income inequality in the UK. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
  {
    id: "macro-environment",
    topic: "Environment",
    subtopic: "Sustainability, climate policy, green growth",
    paper: "2",
    bloomLevel: "evaluate",
    keywords: ["carbon tax", "tradeable permits", "sustainability", "externalities", "market failure", "Paris Agreement", "net zero"],
    relatedTopics: ["micro-externalities", "macro-growth", "macro-supply-side"],
    questionStems: [
      "Evaluate the most effective economic policies for achieving net zero carbon emissions. [25 marks]",
    ],
    markAllocation: 25,
    hotsCategory: "evaluation",
  },
];

// ─── SYNOPTIC LINKS (cross-topic HOTS connections) ───────────────────

export const SYNOPTIC_LINKS: SynopticLink[] = [
  {
    from: "micro-externalities",
    to: "macro-fiscal",
    relationship: "Taxation as externality correction links to fiscal policy impacts on AD",
    exampleQuestion: "Evaluate the view that carbon taxes are an effective policy for both correcting market failure and improving the government's fiscal position. [25 marks]",
  },
  {
    from: "micro-labour",
    to: "macro-unemployment",
    relationship: "Labour market theory explains structural and real-wage unemployment",
    exampleQuestion: "Using both micro and macro analysis, evaluate whether a significant increase in the national minimum wage would reduce poverty without increasing unemployment. [25 marks]",
  },
  {
    from: "micro-market-structures",
    to: "macro-supply-side",
    relationship: "Competition policy as a supply-side measure",
    exampleQuestion: "Evaluate the extent to which promoting competition through deregulation is the most effective supply-side policy for increasing long-run economic growth. [25 marks]",
  },
  {
    from: "micro-elasticity-ped",
    to: "micro-indirect-tax",
    relationship: "PED determines tax incidence and revenue",
    exampleQuestion: "Using elasticity analysis, evaluate the effectiveness of indirect taxes on goods with different price elasticities of demand. [25 marks]",
  },
  {
    from: "macro-growth",
    to: "macro-environment",
    relationship: "Growth vs sustainability trade-off",
    exampleQuestion: "To what extent is it possible for the UK to achieve both sustained economic growth and its net zero targets by 2050? [25 marks]",
  },
  {
    from: "macro-monetary",
    to: "macro-inflation",
    relationship: "Monetary policy as primary inflation control tool",
    exampleQuestion: "Evaluate the effectiveness of monetary policy in controlling inflation during a period of cost-push inflationary pressure. [25 marks]",
  },
  {
    from: "macro-globalisation",
    to: "macro-inequality",
    relationship: "Globalisation impacts on income distribution",
    exampleQuestion: "Evaluate the view that globalisation has been the primary cause of increasing income inequality in developed countries. [25 marks]",
  },
  {
    from: "macro-bop",
    to: "macro-exchange-rate",
    relationship: "Current account and exchange rate interaction",
    exampleQuestion: "Using the concepts of the J-curve and Marshall-Lerner condition, evaluate whether a depreciation of sterling would be effective in reducing the UK's current account deficit. [25 marks]",
  },
  {
    from: "micro-behavioural",
    to: "micro-merit-demerit",
    relationship: "Behavioural insights explain under/over-consumption",
    exampleQuestion: "Evaluate the extent to which behavioural economics provides better solutions than traditional government intervention for correcting the under-consumption of merit goods. [25 marks]",
  },
  {
    from: "macro-phillips",
    to: "macro-fiscal",
    relationship: "Policy trade-offs between inflation and unemployment",
    exampleQuestion: "Using Phillips Curve analysis, evaluate the view that the government faces an inevitable trade-off between reducing unemployment and controlling inflation. [25 marks]",
  },
  {
    from: "micro-ppf",
    to: "macro-growth",
    relationship: "PPF shifts represent long-run economic growth",
    exampleQuestion: "Using both PPF and AD/AS analysis, evaluate the likely long-run effects of a significant increase in government investment in AI and technology infrastructure. [25 marks]",
  },
  {
    from: "macro-multiplier",
    to: "macro-fiscal",
    relationship: "Multiplier determines fiscal policy effectiveness",
    exampleQuestion: "Evaluate the factors that determine the size of the multiplier and their implications for the effectiveness of fiscal policy. [25 marks]",
  },
];

// ─── DIAGRAM MARKING CRITERIA (from AQA mark schemes 2017–2024) ─────

export interface DiagramMarkingCriteria {
  diagramType: string;
  requiredElements: string[];
  kaaBreakdown: { knowledge: number; application: number; analysis: number };
  markingPoints: string[];
}

export const DIAGRAM_MARKING_CRITERIA: DiagramMarkingCriteria[] = [
  {
    diagramType: "supply-demand",
    requiredElements: ["Price on y-axis", "Quantity on x-axis", "D₁ curve", "S₁ curve", "Original equilibrium E₁ (P₁, Q₁)", "Shifted curve with label", "New equilibrium E₂ (P₂, Q₂)", "Arrows showing shift direction"],
    kaaBreakdown: { knowledge: 1, application: 1, analysis: 3 },
    markingPoints: [
      "Knowledge/understanding: 1 mark for accurate supply and demand diagram with labels and original equilibrium (E₁)",
      "Application: 1 mark for identifying that demand/supply in the specific market has shifted and why",
      "Analysis: Up to 3 marks, 1 for each of: correct curve shift direction with label (e.g. S₁ to S₂), new equilibrium showing price/quantity change, explanation of why the shift leads to new equilibrium"
    ],
  },
  {
    diagramType: "both-curves-shift",
    requiredElements: ["Price on y-axis", "Quantity on x-axis", "D₁ curve (dashed, original)", "D₂ curve (solid, shifted)", "S₁ curve (dashed, original)", "S₂ curve (solid, shifted)", "Original equilibrium E₁ (P₁, Q₁)", "New equilibrium E₂ (P₂, Q₂)", "Dashed lines from E₁ and E₂ to both axes", "Shift arrows on both curves"],
    kaaBreakdown: { knowledge: 1, application: 1, analysis: 3 },
    markingPoints: [
      "Knowledge/understanding: 1 mark for accurate supply and demand diagram with labels and original equilibrium (E₁). (1)",
      "Application: 1 mark for identifying that demand and supply in the [market] have both increased/changed. (1)",
      "Analysis: Up to 3 marks, 1 for each of the following:",
      "  • Supply curve shifts rightwards S₁ to S₂. (1)",
      "  • Demand curve shifts rightwards D₁ to D₂. (1)",
      "  • There is a new equilibrium showing lower price and increased quantity E₂. (1)"
    ],
  },
  {
    diagramType: "supply-demand-shift",
    requiredElements: ["Price on y-axis", "Quantity on x-axis", "D₁ and D₂ (or S₁ and S₂)", "S curve (or D curve)", "E₁ at old intersection", "E₂ at new intersection", "Dashed lines to axes for P₁/P₂ and Q₁/Q₂"],
    kaaBreakdown: { knowledge: 1, application: 1, analysis: 3 },
    markingPoints: [
      "Knowledge/understanding: 1 mark for accurate diagram with correctly labelled axes and curves",
      "Application: 1 mark for identifying the correct shift (demand or supply) and linking to context",
      "Analysis: Up to 3 marks for: shift direction correct (1), new equilibrium with P₂/Q₂ shown (1), explanation of mechanism (1)"
    ],
  },
  {
    diagramType: "externality",
    requiredElements: ["Cost/Benefit on y-axis", "Quantity on x-axis", "MPB/MPC curves", "MSB/MSC curve showing divergence", "Free-market output Qm", "Socially optimal output Qs", "Welfare loss triangle shaded"],
    kaaBreakdown: { knowledge: 2, application: 2, analysis: 5 },
    markingPoints: [
      "Knowledge: 1 mark for correct axes, 1 mark for identifying MSC>MPC (negative) or MSB>MPB (positive)",
      "Application: 1 mark for linking to context, 1 mark for identifying the external cost/benefit",
      "Analysis: Up to 5 marks for: correct divergence shown (1), Qm vs Qs identified (1), welfare loss triangle (1), explanation of over/under-provision (1), policy correction (1)"
    ],
  },
  {
    diagramType: "adas",
    requiredElements: ["Price Level on y-axis", "Real GDP on x-axis", "AD curve", "SRAS curve", "LRAS curve (vertical or L-shaped)", "Equilibrium point(s)", "Shift direction with arrows"],
    kaaBreakdown: { knowledge: 2, application: 2, analysis: 5 },
    markingPoints: [
      "Knowledge: 1 mark for correctly labelled axes, 1 mark for correct AD/SRAS/LRAS curves",
      "Application: 1 mark for correct shift direction, 1 mark for linking to context (e.g. interest rate rise → C/I falls → AD left)",
      "Analysis: Up to 5 marks for: shift mechanism explained (1), short-run effect on PL and Y (1), new equilibrium shown (1), multiplier/accelerator effects (1), long-run adjustment (1)"
    ],
  },
  {
    diagramType: "monopoly",
    requiredElements: ["Revenue/Cost on y-axis", "Quantity on x-axis", "AR=D (downward sloping)", "MR (below AR, steeper)", "MC (U-shaped)", "AC (U-shaped)", "Profit-max at MC=MR", "Supernormal profit rectangle shaded"],
    kaaBreakdown: { knowledge: 2, application: 2, analysis: 5 },
    markingPoints: [
      "Knowledge: 1 mark for correct revenue/cost curves, 1 mark for MC=MR identified",
      "Application: 1 mark for reading price from AR at profit-max Q, 1 mark for showing AC at that Q",
      "Analysis: Up to 5 marks for: profit-max rule explained (1), supernormal profit area shown (1), comparison with competitive outcome (1), deadweight loss (1), efficiency implications (1)"
    ],
  },
  {
    diagramType: "ppf",
    requiredElements: ["Good A on y-axis", "Good B on x-axis", "Concave PPF curve", "Points: inside (inefficient), on curve (efficient), outside (unattainable)", "Outward shift for growth"],
    kaaBreakdown: { knowledge: 1, application: 1, analysis: 3 },
    markingPoints: [
      "Knowledge: 1 mark for correctly drawn and labelled PPF with correct shape",
      "Application: 1 mark for identifying the relevant shift/movement and linking to context",
      "Analysis: Up to 3 marks for: opportunity cost explained (1), shift direction and cause (1), implications for productive capacity (1)"
    ],
  },
  {
    diagramType: "labour-market",
    requiredElements: ["Wage Rate on y-axis", "Quantity of Labour on x-axis", "DL=MRP curve", "SL curve", "Equilibrium wage W₁ and employment L₁"],
    kaaBreakdown: { knowledge: 1, application: 1, analysis: 3 },
    markingPoints: [
      "Knowledge: 1 mark for correct labour market diagram with labelled axes and curves",
      "Application: 1 mark for identifying the wage/employment outcome and linking to context",
      "Analysis: Up to 3 marks for: wage determination explained (1), impact of intervention shown (1), effect on employment/unemployment (1)"
    ],
  },
  {
    diagramType: "phillips-curve",
    requiredElements: ["Inflation (%) on y-axis", "Unemployment (%) on x-axis", "SRPC (downward sloping)", "LRPC (vertical at NRU)", "Movement along SRPC", "Shift of SRPC if expectations change"],
    kaaBreakdown: { knowledge: 2, application: 2, analysis: 5 },
    markingPoints: [
      "Knowledge: 1 mark for SRPC shape, 1 mark for LRPC at NRU",
      "Application: 1 mark for identifying SR trade-off, 1 mark for linking to policy context",
      "Analysis: Up to 5 marks for: SR trade-off explained (1), expectations-augmented shift (1), LR no trade-off (1), NAIRU concept (1), policy implications (1)"
    ],
  },
  {
    diagramType: "tariff",
    requiredElements: ["Price on y-axis", "Quantity on x-axis", "D curve", "S(domestic) curve", "Pw (world price line)", "Pw+t (world price + tariff line)", "Areas: tariff revenue, deadweight loss triangles"],
    kaaBreakdown: { knowledge: 1, application: 2, analysis: 3 },
    markingPoints: [
      "Knowledge: 1 mark for correct tariff diagram with Pw and Pw+t",
      "Application: 1 mark for domestic production change, 1 mark for import reduction",
      "Analysis: Up to 3 marks for: tariff revenue rectangle (1), deadweight loss triangles (1), effect on consumer/producer surplus (1)"
    ],
  },
  {
    diagramType: "keynesian-as",
    requiredElements: ["Price Level on y-axis", "Real GDP on x-axis", "Keynesian AS (horizontal→upward→vertical)", "AD curve", "Full employment output Yf"],
    kaaBreakdown: { knowledge: 2, application: 2, analysis: 5 },
    markingPoints: [
      "Knowledge: 1 mark for Keynesian AS shape (three ranges), 1 mark for labelling Yf",
      "Application: 1 mark for AD position in correct range, 1 mark for linking to spare capacity/full employment",
      "Analysis: Up to 5 marks for: horizontal range = spare capacity (1), upward range = bottlenecks (1), vertical range = full employment (1), AD shift effect depends on range (1), policy implications (1)"
    ],
  },
];

// ─── BLOOM'S TAXONOMY HOTS QUESTION GENERATORS ──────────────────────

export const HOTS_QUESTION_TEMPLATES = {
  /** Application: Apply concepts to unfamiliar contexts */
  application: [
    "Using {diagram_type}, explain the likely impact of {real_world_event} on {market/economy}. [9 marks]",
    "Calculate {metric} from the data in Extract {letter}. Explain the significance of your answer. [4 marks]",
    "Using the data in Table {number}, explain {economic_relationship}. [4 marks]",
  ],
  /** Analysis: Chain reasoning, cause → effect → consequence */
  analysis: [
    "Analyse the likely short-run AND long-run effects of {policy} on {economic_variable}. [9 marks]",
    "Using {diagram_type}, analyse how {economic_change} might affect both {variable_1} and {variable_2}. [9 marks]",
    "With reference to the data, analyse the possible reasons for the change in {economic_indicator} between {year_1} and {year_2}. [9 marks]",
  ],
  /** Evaluation: Weigh evidence, make judgements */
  evaluation: [
    "Evaluate the view that {policy/statement} is the most effective way to achieve {objective}. [25 marks]",
    "To what extent does {economic_theory} explain {real_world_phenomenon}? [25 marks]",
    "Discuss whether {economic_change} is likely to have a net positive or negative impact on {stakeholder/economy}. [25 marks]",
    "''{provocative_statement}''. Discuss. [25 marks]",
  ],
  /** Synthesis: Combine micro + macro, or multiple theories */
  synthesis: [
    "Using both microeconomic and macroeconomic analysis, evaluate {complex_policy_question}. [25 marks]",
    "Drawing on at least TWO areas of economic theory, assess the likely impact of {real_world_event} on the UK economy. [25 marks]",
    "With reference to concepts from both Papers 1 and 2, evaluate {synoptic_question}. [25 marks]",
  ],
};

// ─── REAL-WORLD CONTEXTS FOR 2024-2025 ──────────────────────────────

export const CURRENT_ECONOMIC_CONTEXTS = {
  uk2024: [
    "UK cost of living crisis: CPI inflation falling from 11.1% (Oct 2022) to 3.9% (Nov 2023) to 2.3% (Oct 2024)",
    "Bank of England base rate rises from 0.1% to 5.25% (Aug 2023), first cuts to 4.75% (Nov 2024)",
    "UK GDP growth: -0.1% (Q3 2023), +0.6% (2024 forecast), sluggish recovery",
    "UK national debt exceeding 100% of GDP for first time since 1960s",
    "AI and automation: impact on UK labour market, 1.5m jobs at risk of automation",
    "NHS waiting lists exceeding 7.5 million (2024), healthcare market failure",
    "UK housing crisis: average house price £290,000, affordability ratio 8.3x earnings",
    "Post-Brexit trade: UK goods exports to EU down 15% vs pre-Brexit levels",
  ],
  global2024: [
    "Global supply chain resilience: reshoring and nearshoring trends",
    "US-China trade tensions: tariffs on $300bn of goods, technology decoupling",
    "OPEC+ oil production cuts: impact on global energy prices",
    "Green transition: EU Carbon Border Adjustment Mechanism (CBAM)",
    "Emerging market debt crises: Sri Lanka, Pakistan, Argentina",
    "Digital currencies and CBDC development by major central banks",
    "Global food price inflation following Ukraine conflict disruption",
  ],
};

/**
 * Generate a knowledge-graph-enhanced prompt section for Economics predicted papers.
 * Includes synoptic HOTS questions and Bloom's taxonomy requirements.
 */
export function generateKnowledgeGraphPrompt(paperNumber: string): string {
  const relevantNodes = ECONOMICS_KNOWLEDGE_NODES.filter(
    (n) => n.paper === paperNumber || n.paper === "3"
  );

  const hotsNodes = relevantNodes.filter(
    (n) => n.bloomLevel === "evaluate" || n.bloomLevel === "analyse"
  );

  const relevantLinks = SYNOPTIC_LINKS.filter(
    (l) =>
      relevantNodes.some((n) => n.id === l.from) ||
      relevantNodes.some((n) => n.id === l.to)
  );

  const topicsList = hotsNodes
    .map((n) => `- ${n.topic} → ${n.subtopic} [${n.bloomLevel.toUpperCase()}]: ${n.questionStems[0]}`)
    .join("\n");

  const synopticExamples = relevantLinks
    .slice(0, 5)
    .map((l) => `- SYNOPTIC LINK: ${l.relationship}\n  Example: "${l.exampleQuestion}"`)
    .join("\n");

  const contexts = [
    ...CURRENT_ECONOMIC_CONTEXTS.uk2024.slice(0, 4),
    ...CURRENT_ECONOMIC_CONTEXTS.global2024.slice(0, 2),
  ].map((c) => `  - ${c}`).join("\n");

  // Build diagram marking criteria section
  const diagramSection = DIAGRAM_MARKING_CRITERIA
    .slice(0, 6)
    .map((d) => `- **${d.diagramType}**: K${d.kaaBreakdown.knowledge} A${d.kaaBreakdown.application} An${d.kaaBreakdown.analysis} — Elements: ${d.requiredElements.slice(0, 4).join(", ")}`)
    .join("\n");

  return `
## KNOWLEDGE GRAPH — HIGHER ORDER THINKING SKILLS (HOTS) REQUIREMENTS

Your questions MUST span Bloom's taxonomy levels. Do NOT generate only "remember" or "understand" questions.

### Required Bloom's Distribution:
- Remember/Understand: 2-mark define questions only (max 10% of marks)
- Apply: 4-mark calculate/explain questions (20% of marks)
- Analyse: 9-mark diagram+explain questions (30% of marks)
- Evaluate/Synthesise: 25-mark essay questions (40% of marks)

### HOTS Topic Map (generate questions that test these higher-order connections):
${topicsList}

### SYNOPTIC CROSS-TOPIC LINKS (use at least 2 of these in your paper):
${synopticExamples}

### MANDATORY REAL-WORLD DATA CONTEXTS (use current 2024–2025 data):
${contexts}

### DIAGRAM QUESTION PATTERNS (from AQA mark schemes — generate questions in these EXACT patterns):

Each diagram question MUST follow the KAA (Knowledge, Application, Analysis) marking structure:

${diagramSection}

**Example pattern (from June 2024 Paper 1, Question 6a — 5 marks):**
"Use a demand and supply diagram to explain the impact on price and quantity, of the changes in demand and supply of online sales in the retail grocery market. (Figure 1 and Extract B)."
Mark scheme: Knowledge 1, Application 1, Analysis 3
- K: accurate S&D diagram with labels and original equilibrium (E₁) (1)
- A: identifying that demand and supply have both increased (1)
- An: Supply shifts rightwards S₁ to S₂ (1), Demand shifts rightwards D₁ to D₂ (1), New equilibrium E₂ showing lower price and increased quantity (1)

### HOTS Question Requirements:
1. 25-mark essays MUST require students to:
   - Present at least TWO chains of reasoning (cause → effect → consequence)
   - Consider counter-arguments and limitations
   - Make a supported judgement using evidence
   - Reference diagrams where relevant
2. 9-mark questions MUST require:
   - A correctly drawn and labelled diagram
   - Application to a specific real-world context
   - Analysis beyond simple description
   - Follow the KAA breakdown shown above
3. All data response questions MUST use realistic, current UK economic data
4. At least ONE question must be genuinely synoptic (linking micro and macro concepts)
`;
}
