// ── Rubric Types ──
export type CommandWord = "Examine" | "Evaluate" | "Assess" | "Discuss" | "Explain" | "Analyse" | "Draw";
export type QuestionType = "diagram" | "short" | "data-response" | "essay";

export interface DiagramReq {
  id: string;
  requirement: string;
  marks: number;
  critical: boolean;
}

export interface Level {
  level: 1 | 2 | 3 | 4;
  markRange: [number, number];
  descriptor: string;
}

export interface Rubric {
  id: string;
  totalMarks: number;
  questionType: QuestionType;
  command: CommandWord;
  levels: Level[];
  indicativeContent: string[];
  diagramRequirements?: DiagramReq[];
  keyTerms: string[];
  commonErrors: string[];
  contextHooks: string[];
}

// ── Standard Edexcel Level Descriptors (8-mark diagram) ──
const diagramLevels8: Level[] = [
  { level: 1, markRange: [1, 2], descriptor: "Isolated points of knowledge; diagram absent or fundamentally flawed; no application to context." },
  { level: 2, markRange: [3, 4], descriptor: "Limited knowledge with some relevant theory; diagram partially correct but missing key labels or curves; limited application." },
  { level: 3, markRange: [5, 6], descriptor: "Good knowledge and understanding; diagram largely correct with most labels; clear application to context; some analytical chains." },
  { level: 4, markRange: [7, 8], descriptor: "Comprehensive knowledge; fully accurate, clearly labelled diagram; strong application to context; well-developed chains of reasoning throughout." },
];

// ── Five Diagram Rubrics ──

export const oligopolyRubric: Rubric = {
  id: "oligopoly-game-theory",
  totalMarks: 8,
  questionType: "diagram",
  command: "Draw",
  levels: diagramLevels8,
  indicativeContent: [
    "Game theory / prisoner's dilemma applied to oligopoly pricing",
    "Dominant strategy exists for both firms",
    "Nash equilibrium at (Low, Low) — both worse off than collusion",
    "Collusion is jointly optimal but individually unstable",
    "Interdependence: each firm's payoff depends on rival's choice",
  ],
  diagramRequirements: [
    { id: "OLI-1", requirement: "2×2 payoff matrix drawn with both firms labelled on axes", marks: 1, critical: true },
    { id: "OLI-2", requirement: "Four payoff cells filled correctly: (100,100) (10,150) (150,10) (40,40)", marks: 2, critical: true },
    { id: "OLI-3", requirement: "Nash equilibrium identified at (Low, Low)", marks: 2, critical: false },
    { id: "OLI-4", requirement: "Dominant strategy reasoning shown (150>100, 40>10 for each firm)", marks: 2, critical: false },
    { id: "OLI-5", requirement: "Reference to collusion being jointly optimal but unstable", marks: 1, critical: false },
  ],
  keyTerms: ["Nash equilibrium", "dominant strategy", "prisoner's dilemma", "collusion", "interdependence", "oligopoly"],
  commonErrors: [
    "Swapping payoffs between firms",
    "Identifying wrong cell as Nash equilibrium",
    "Confusing dominant strategy with Nash equilibrium",
    "Failing to explain WHY collusion breaks down",
  ],
  contextHooks: ["UK supermarket pricing", "price wars", "Tesco/Sainsbury's"],
};

export const monopsonyRubric: Rubric = {
  id: "monopsony-labour",
  totalMarks: 8,
  questionType: "diagram",
  command: "Draw",
  levels: diagramLevels8,
  indicativeContent: [
    "Monopsony = single buyer of labour (or dominant employer)",
    "MC_L lies above AC_L because hiring extra worker raises wage for all",
    "Profit-maximising employment at MC_L = MRP_L",
    "Wage set from AC_L at Qm, below competitive wage",
    "Welfare loss: fewer workers employed at lower wage than competition",
  ],
  diagramRequirements: [
    { id: "MON-1", requirement: "Axes labelled W (wage rate) and Q (quantity of labour)", marks: 1, critical: true },
    { id: "MON-2", requirement: "S_L / AC_L upward sloping, labelled", marks: 1, critical: true },
    { id: "MON-3", requirement: "MC_L drawn ABOVE and steeper than AC_L, labelled", marks: 2, critical: true },
    { id: "MON-4", requirement: "MRP_L (= D_L) downward sloping, labelled", marks: 1, critical: false },
    { id: "MON-5", requirement: "Monopsony employment at MC_L = MRP_L (Qm)", marks: 1, critical: false },
    { id: "MON-6", requirement: "Wage read off AC_L at Qm (Wm), shown below competitive wage", marks: 1, critical: false },
    { id: "MON-7", requirement: "Comparison: Qm < Qc and Wm < Wc explicitly stated", marks: 1, critical: false },
  ],
  keyTerms: ["monopsony", "MC_L", "AC_L", "MRP_L", "wage rate", "exploitation"],
  commonErrors: [
    "Drawing MC_L below AC_L (fundamentally wrong)",
    "Reading wage from MC_L instead of AC_L",
    "Omitting competitive comparison (Qc, Wc)",
    "Unlabelled axes",
  ],
  contextHooks: ["UK social care market", "NHS as employer", "Amazon warehouses"],
};

export const phillipsCurveRubric: Rubric = {
  id: "phillips-curve",
  totalMarks: 8,
  questionType: "diagram",
  command: "Draw",
  levels: diagramLevels8,
  indicativeContent: [
    "Short-run trade-off between inflation and unemployment",
    "Long-run Phillips Curve vertical at NRU — no trade-off",
    "Adaptive expectations shift SRPC upward",
    "Monetarist/New Classical conclusion: only supply-side can reduce NRU",
  ],
  diagramRequirements: [
    { id: "PC-1", requirement: "Axes: inflation rate (y-axis), unemployment rate (x-axis)", marks: 1, critical: true },
    { id: "PC-2", requirement: "SRPC1 downward sloping", marks: 1, critical: true },
    { id: "PC-3", requirement: "LRPC vertical at NRU, labelled", marks: 2, critical: true },
    { id: "PC-4", requirement: "Movement A→B along SRPC1 (AD rises, inflation up, unemployment down)", marks: 1, critical: false },
    { id: "PC-5", requirement: "Expectations shift SRPC1→SRPC2 upward", marks: 2, critical: false },
    { id: "PC-6", requirement: "Return to NRU at C with higher inflation — vertical LRPC conclusion", marks: 1, critical: false },
  ],
  keyTerms: ["SRPC", "LRPC", "NRU", "adaptive expectations", "inflation", "unemployment"],
  commonErrors: [
    "Drawing LRPC as downward sloping",
    "Confusing movement along SRPC with shift of SRPC",
    "Omitting the expectations adjustment mechanism",
    "Not labelling the NRU",
  ],
  contextHooks: ["Bank of England monetary policy", "UK inflation 2022-24", "cost of living crisis"],
};

export const lorenzRubric: Rubric = {
  id: "lorenz-gini",
  totalMarks: 8,
  questionType: "diagram",
  command: "Draw",
  levels: diagramLevels8,
  indicativeContent: [
    "Lorenz curve shows cumulative income distribution",
    "45° line = perfect equality",
    "Greater bow = greater inequality",
    "Gini coefficient = A / (A + B), ranges 0 to 1",
    "Shift outward from 45° line = rising inequality",
  ],
  diagramRequirements: [
    { id: "LOR-1", requirement: "Axes: cumulative % population (x) vs cumulative % income (y), both to 100", marks: 1, critical: true },
    { id: "LOR-2", requirement: "45° line of perfect equality drawn & labelled", marks: 1, critical: true },
    { id: "LOR-3", requirement: "Original Lorenz curve drawn correctly (bowed below 45°)", marks: 1, critical: true },
    { id: "LOR-4", requirement: "Shifted Lorenz curve drawn FURTHER from 45° line (greater inequality)", marks: 2, critical: false },
    { id: "LOR-5", requirement: "Areas A and B correctly identified", marks: 1, critical: false },
    { id: "LOR-6", requirement: "Gini formula G = A/(A+B) stated, with direction of change (higher G = more inequality)", marks: 2, critical: false },
  ],
  keyTerms: ["Lorenz curve", "Gini coefficient", "income inequality", "perfect equality", "cumulative distribution"],
  commonErrors: [
    "Drawing curve above 45° line",
    "Mislabelling areas A and B",
    "Confusing wealth and income inequality",
    "Omitting Gini formula",
  ],
  contextHooks: ["UK income inequality 2020-2024", "progressive taxation", "universal credit"],
};

export const jCurveRubric: Rubric = {
  id: "j-curve",
  totalMarks: 8,
  questionType: "diagram",
  command: "Draw",
  levels: diagramLevels8,
  indicativeContent: [
    "J-curve shows current account response to depreciation over time",
    "Short-run: trade balance worsens (contracts already set, volumes slow to adjust)",
    "Long-run: exports become cheaper, imports dearer → balance improves",
    "Marshall-Lerner condition: PEDx + PEDm > 1 for improvement",
  ],
  diagramRequirements: [
    { id: "JC-1", requirement: "Axes: time (x-axis), current account balance (y-axis) with zero line", marks: 1, critical: true },
    { id: "JC-2", requirement: "Initial position and depreciation event marked", marks: 1, critical: false },
    { id: "JC-3", requirement: "Short-run deterioration (trough below zero) drawn", marks: 2, critical: true },
    { id: "JC-4", requirement: "Return to original level, then improvement above it", marks: 2, critical: false },
    { id: "JC-5", requirement: "Reasoning: PEDx + PEDm < 1 short run, > 1 long run (Marshall-Lerner condition)", marks: 2, critical: false },
  ],
  keyTerms: ["J-curve", "depreciation", "current account", "Marshall-Lerner condition", "PED", "trade balance"],
  commonErrors: [
    "Drawing improvement before deterioration",
    "Omitting the zero/equilibrium line",
    "Not mentioning Marshall-Lerner condition",
    "Confusing depreciation with appreciation",
  ],
  contextHooks: ["sterling depreciation post-Brexit", "UK current account deficit", "Bank of England interest rates"],
};

export const diagramRubrics: Record<string, Rubric> = {
  "oligopoly-game-theory": oligopolyRubric,
  "monopsony-labour": monopsonyRubric,
  "phillips-curve": phillipsCurveRubric,
  "lorenz-gini": lorenzRubric,
  "j-curve": jCurveRubric,
};

// ── Paper Rubrics ──

const essayLevels25: Level[] = [
  { level: 1, markRange: [1, 6], descriptor: "Few relevant points; no real analysis; no evaluation; poor or no use of economic terminology." },
  { level: 2, markRange: [7, 12], descriptor: "Some relevant knowledge; limited analysis with undeveloped chains; limited or generic application; superficial evaluation if present." },
  { level: 3, markRange: [13, 19], descriptor: "Good knowledge and understanding; developed analysis with clear chains of reasoning; good application to context; evaluation present but may lack balance." },
  { level: 4, markRange: [20, 25], descriptor: "Comprehensive and accurate knowledge; well-developed analytical chains; strong contextual application throughout; balanced, justified evaluation with a supported final judgement." },
];

const dataResponseLevels12: Level[] = [
  { level: 1, markRange: [1, 3], descriptor: "Isolated points; limited relevant knowledge; no application to data." },
  { level: 2, markRange: [4, 6], descriptor: "Some relevant knowledge; limited analysis; some reference to data." },
  { level: 3, markRange: [7, 9], descriptor: "Good knowledge; clear analysis with some chains; good use of data and context." },
  { level: 4, markRange: [10, 12], descriptor: "Comprehensive knowledge; well-developed analysis; strong data application; evaluation where required." },
];

const shortLevels5: Level[] = [
  { level: 1, markRange: [1, 2], descriptor: "Basic or partial definition/explanation." },
  { level: 2, markRange: [3, 5], descriptor: "Accurate definition with relevant elaboration or example." },
];

export interface PaperQuestion {
  id: string;
  questionNumber: string;
  questionText: string;
  extract?: string;
  rubric: Rubric;
}

export interface Paper {
  id: string;
  title: string;
  board: string;
  timeMinutes: number;
  totalMarks: number;
  questions: PaperQuestion[];
}

export const samplePapers: Paper[] = [
  {
    id: "paper-1-micro",
    title: "Paper 1 — Markets & Business Behaviour",
    board: "Edexcel A",
    timeMinutes: 120,
    totalMarks: 80,
    questions: [
      {
        id: "p1q1a",
        questionNumber: "1(a)",
        questionText: "Define the term 'allocative efficiency'.",
        rubric: {
          id: "p1q1a-rubric",
          totalMarks: 2,
          questionType: "short",
          command: "Explain",
          levels: [{ level: 1, markRange: [1, 1], descriptor: "Partial definition." }, { level: 2, markRange: [2, 2], descriptor: "Full definition: P = MC, resources allocated to reflect consumer preferences." }],
          indicativeContent: ["Price equals marginal cost", "Resources allocated according to consumer preferences", "No reallocation can make anyone better off without making someone worse off"],
          keyTerms: ["allocative efficiency", "P = MC"],
          commonErrors: ["Confusing with productive efficiency"],
          contextHooks: [],
        },
      },
      {
        id: "p1q1b",
        questionNumber: "1(b)",
        questionText: "With reference to Extract A, examine the impact of increased market concentration on consumer welfare in the UK grocery market.",
        extract: "Extract A: The UK grocery market has seen increasing concentration, with the 'Big Four' supermarkets (Tesco, Sainsbury's, Asda, Morrisons) controlling approximately 67% of the market in 2024. Aldi and Lidl have grown from 3% combined share in 2010 to over 18% in 2024, intensifying price competition. However, concerns remain about buyer power over suppliers, with the Groceries Code Adjudicator reporting 15 formal investigations since 2015.",
        rubric: {
          id: "p1q1b-rubric",
          totalMarks: 8,
          questionType: "data-response",
          command: "Examine",
          levels: diagramLevels8,
          indicativeContent: [
            "Market concentration measured by CR4/CR5",
            "Oligopoly characteristics: interdependence, barriers to entry",
            "Potential for tacit collusion → higher prices → consumer welfare loss",
            "Counter: Aldi/Lidl entry has increased competition → lower prices",
            "Monopsony power over suppliers — could reduce quality/variety",
            "Consumer welfare = consumer surplus + quality + choice",
          ],
          keyTerms: ["market concentration", "oligopoly", "consumer welfare", "monopsony power", "barriers to entry"],
          commonErrors: ["Assuming concentration always harms consumers", "Ignoring the discount retailers' impact"],
          contextHooks: ["Big Four 67% market share", "Aldi and Lidl growth from 3% to 18%", "Groceries Code Adjudicator", "buyer power over suppliers"],
        },
      },
      {
        id: "p1q2",
        questionNumber: "2",
        questionText: "Evaluate the view that monopoly power is always against the public interest.",
        rubric: {
          id: "p1q2-rubric",
          totalMarks: 25,
          questionType: "essay",
          command: "Evaluate",
          levels: essayLevels25,
          indicativeContent: [
            "Monopoly: supernormal profit, DWL, allocative inefficiency (P > MC)",
            "X-inefficiency due to lack of competitive pressure",
            "Counter: natural monopoly — lower AC than competition",
            "Dynamic efficiency — supernormal profits fund R&D (Schumpeter)",
            "Economies of scale → lower prices potentially",
            "Regulation as alternative (price caps, RPI-X)",
            "Contestable markets theory — potential competition disciplines",
          ],
          keyTerms: ["monopoly", "public interest", "allocative efficiency", "dynamic efficiency", "natural monopoly", "X-inefficiency", "deadweight loss"],
          commonErrors: ["One-sided argument (only costs OR only benefits)", "No diagram", "No evaluation/judgement"],
          contextHooks: ["UK energy market", "Big Tech regulation", "CMA investigations"],
        },
      },
    ],
  },
  {
    id: "paper-2-macro",
    title: "Paper 2 — The National & Global Economy",
    board: "Edexcel A",
    timeMinutes: 120,
    totalMarks: 80,
    questions: [
      {
        id: "p2q1a",
        questionNumber: "1(a)",
        questionText: "Define the term 'current account deficit'.",
        rubric: {
          id: "p2q1a-rubric",
          totalMarks: 2,
          questionType: "short",
          command: "Explain",
          levels: [{ level: 1, markRange: [1, 1], descriptor: "Partial or vague definition." }, { level: 2, markRange: [2, 2], descriptor: "Net outflow on trade in goods, services, primary and secondary income combined." }],
          indicativeContent: ["Debits exceed credits on the current account", "Includes trade balance, primary income, secondary income"],
          keyTerms: ["current account", "deficit", "trade balance"],
          commonErrors: ["Confusing with budget deficit", "Only mentioning goods trade"],
          contextHooks: [],
        },
      },
      {
        id: "p2q1b",
        questionNumber: "1(b)",
        questionText: "With reference to Extract B, analyse the likely impact of a depreciation of sterling on the UK's current account balance.",
        extract: "Extract B: Sterling fell 12% against the US dollar between June 2023 and March 2024. UK exports of goods totalled £340bn while imports reached £490bn in 2023. The Office for Budget Responsibility estimates that the UK's price elasticity of demand for imports is 0.6 in the short run, rising to 1.3 in the long run. Services exports, particularly financial services worth £95bn, showed greater resilience.",
        rubric: {
          id: "p2q1b-rubric",
          totalMarks: 10,
          questionType: "data-response",
          command: "Analyse",
          levels: [
            { level: 1, markRange: [1, 2], descriptor: "Basic knowledge of depreciation effects." },
            { level: 2, markRange: [3, 5], descriptor: "Some analysis with reference to data; limited chains." },
            { level: 3, markRange: [6, 8], descriptor: "Good analysis with developed chains; good use of data." },
            { level: 4, markRange: [9, 10], descriptor: "Thorough analysis with well-developed chains; strong data application; Marshall-Lerner referenced." },
          ],
          indicativeContent: [
            "Depreciation → exports cheaper in foreign currency, imports dearer",
            "J-curve effect: short-run worsening before improvement",
            "Marshall-Lerner condition: PEDx + PEDm > 1 needed for improvement",
            "Data shows PED imports 0.6 short run < 1, 1.3 long run > 1",
            "Services exports may be less price elastic",
          ],
          keyTerms: ["depreciation", "Marshall-Lerner", "J-curve", "price elasticity", "current account"],
          commonErrors: ["Ignoring time lags", "Not using the elasticity data provided"],
          contextHooks: ["Sterling fell 12%", "exports £340bn imports £490bn", "PED imports 0.6 short run 1.3 long run", "financial services £95bn"],
        },
      },
      {
        id: "p2q2",
        questionNumber: "2",
        questionText: "Evaluate the effectiveness of supply-side policies in achieving sustainable economic growth in the UK.",
        rubric: {
          id: "p2q2-rubric",
          totalMarks: 25,
          questionType: "essay",
          command: "Evaluate",
          levels: essayLevels25,
          indicativeContent: [
            "Supply-side: market-based (deregulation, tax cuts, privatisation) vs interventionist (education, infrastructure, R&D)",
            "Shift LRAS right → increase productive capacity → sustainable growth without inflation",
            "Time lags — education/infrastructure take years",
            "Inequality trade-off with market-based approaches",
            "Counter: demand-side may be needed first in recession",
            "Evaluation: depends on type, time horizon, starting position of economy",
          ],
          keyTerms: ["supply-side policies", "LRAS", "sustainable growth", "productive capacity", "human capital"],
          commonErrors: ["Only discussing one type of supply-side", "No AD/AS diagram", "Confusing short-run and long-run effects"],
          contextHooks: ["UK productivity puzzle", "Levelling Up agenda", "HS2 cancellation", "apprenticeship levy"],
        },
      },
    ],
  },
  {
    id: "paper-3-synoptic",
    title: "Paper 3 — Microeconomics & Macroeconomics",
    board: "Edexcel A",
    timeMinutes: 120,
    totalMarks: 70,
    questions: [
      {
        id: "p3q1a",
        questionNumber: "1(a)(i)",
        questionText: "Calculate the percentage change in real GDP between 2022 and 2024 using Extract C.",
        rubric: {
          id: "p3q1a-rubric",
          totalMarks: 2,
          questionType: "short",
          command: "Explain",
          levels: [{ level: 1, markRange: [1, 1], descriptor: "Correct method shown." }, { level: 2, markRange: [2, 2], descriptor: "Correct calculation with units." }],
          indicativeContent: ["Percentage change formula applied correctly", "Correct figures extracted from data"],
          keyTerms: ["real GDP", "percentage change"],
          commonErrors: ["Using nominal instead of real", "Arithmetic error"],
          contextHooks: [],
        },
      },
      {
        id: "p3q1b",
        questionNumber: "1(b)",
        questionText: "With reference to Extract C, assess the likely consequences of rising income inequality for the UK economy.",
        rubric: {
          id: "p3q1b-rubric",
          totalMarks: 12,
          questionType: "data-response",
          command: "Assess",
          levels: dataResponseLevels12,
          indicativeContent: [
            "Lower MPC among wealthy → reduced consumption multiplier",
            "Social costs: health inequalities, crime, social immobility",
            "Reduced human capital investment among lower-income groups",
            "Counter: inequality may incentivise entrepreneurship (Hayek)",
            "Counter: trickle-down effects",
            "Depends on: degree of inequality, policy response, social safety net",
          ],
          keyTerms: ["income inequality", "Gini coefficient", "marginal propensity to consume", "social mobility"],
          commonErrors: ["Confusing income and wealth inequality", "No data reference"],
          contextHooks: ["UK Gini coefficient", "top 10% vs bottom 10%", "regional disparities"],
        },
      },
      {
        id: "p3q2",
        questionNumber: "2",
        questionText: "Evaluate the view that free trade is always beneficial for developing economies.",
        rubric: {
          id: "p3q2-rubric",
          totalMarks: 15,
          questionType: "essay",
          command: "Evaluate",
          levels: [
            { level: 1, markRange: [1, 3], descriptor: "Limited knowledge; no analysis." },
            { level: 2, markRange: [4, 7], descriptor: "Some relevant knowledge; basic analysis; limited evaluation." },
            { level: 3, markRange: [8, 11], descriptor: "Good knowledge and analysis; clear evaluation with some balance." },
            { level: 4, markRange: [12, 15], descriptor: "Comprehensive knowledge; well-developed analysis; balanced, well-supported evaluation." },
          ],
          indicativeContent: [
            "Comparative advantage → specialisation → higher world output",
            "Access to larger markets → economies of scale",
            "Counter: infant industry argument",
            "Primary product dependency → volatile export revenues",
            "Terms of trade may deteriorate (Prebisch-Singer)",
            "Depends on: stage of development, institutions, terms of trade",
          ],
          keyTerms: ["free trade", "comparative advantage", "infant industry", "terms of trade", "primary product dependency"],
          commonErrors: ["Absolute vs comparative advantage confusion", "One-sided argument"],
          contextHooks: ["Sub-Saharan Africa", "WTO negotiations", "China's development model"],
        },
      },
    ],
  },
];

export function getRubricById(id: string): Rubric | undefined {
  return diagramRubrics[id] || samplePapers.flatMap(p => p.questions).find(q => q.rubric.id === id)?.rubric;
}

export function getPaperById(id: string): Paper | undefined {
  return samplePapers.find(p => p.id === id);
}
