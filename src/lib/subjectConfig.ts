import type { Subject } from "@/contexts/SubjectContext";

/* ── Predicted Papers: paper options per subject ── */
export const paperOptionsBySubject: Record<Subject, { value: string; label: string; title: string; desc: string }[]> = {
  economics: [
    { value: "1", label: "Paper 1", title: "Markets & Market Failure", desc: "Microeconomics — supply & demand, elasticity, market failure, government intervention" },
    { value: "2", label: "Paper 2", title: "National & International Economy", desc: "Macroeconomics — GDP, inflation, unemployment, fiscal & monetary policy, trade" },
    { value: "3", label: "Paper 3", title: "Economic Principles & Issues", desc: "Mixed micro & macro — market structures, labour markets, inequality, policy conflicts" },
  ],
  maths: [
    { value: "1", label: "Paper 1", title: "Non-Calculator", desc: "Pure maths without a calculator — number, algebra, ratio, geometry, probability & statistics" },
    { value: "2", label: "Paper 2", title: "Calculator (1)", desc: "Calculator paper — number, algebra, ratio, proportion, geometry, probability & statistics" },
    { value: "3", label: "Paper 3", title: "Calculator (2)", desc: "Calculator paper — number, algebra, ratio, proportion, geometry, probability & statistics" },
  ],
  chemistry: [
    { value: "1", label: "Paper 1", title: "Topics 1–5", desc: "Atomic structure, bonding, quantitative chemistry, chemical changes, energy changes" },
    { value: "2", label: "Paper 2", title: "Topics 6–10", desc: "Rate & extent, organic chemistry, chemical analysis, chemistry of the atmosphere, using resources" },
  ],
  "edexcel-a": [
    { value: "1", label: "Paper 1", title: "Markets & Business Behaviour", desc: "Microeconomics — demand, supply, market structures, labour markets, government intervention (9EC0/01)" },
    { value: "2", label: "Paper 2", title: "The National & Global Economy", desc: "Macroeconomics — AD/AS, economic performance, financial sector, trade, development (9EC0/02)" },
    { value: "3", label: "Paper 3", title: "Micro & Macroeconomics", desc: "Synoptic — data response + extended open-response across all themes (9EC0/03)" },
  ],
  "edexcel-b": [
    { value: "1", label: "Paper 1", title: "Markets, Consumers & Firms", desc: "How markets work, market failure, business behaviour, the labour market (9EB0/01)" },
    { value: "2", label: "Paper 2", title: "The Wider Economic Environment", desc: "Economic indicators, macroeconomic policy, inequality, the financial sector (9EB0/02)" },
    { value: "3", label: "Paper 3", title: "The Global Economy", desc: "Globalisation, trade, development, financial markets, role of the state (9EB0/03)" },
  ],
  "ocr": [
    { value: "1", label: "Component 01", title: "Microeconomics", desc: "Markets, market failure, business objectives, market structures, labour market (H460/01)" },
    { value: "2", label: "Component 02", title: "Macroeconomics", desc: "AD/AS, policy objectives, fiscal/monetary/supply-side, trade, financial sector (H460/02)" },
    { value: "3", label: "Component 03", title: "Themes in Economics", desc: "Synoptic — draws together micro and macro across all content areas (H460/03)" },
  ],
  "cambridge": [
    { value: "1", label: "Paper 1", title: "Multiple Choice (AS)", desc: "30 MCQs covering AS micro & macro — scarcity, markets, externalities, AD/AS, policy (9708/1)" },
    { value: "2", label: "Paper 2", title: "Data Response & Essay (AS)", desc: "Data response with extracts + structured essay on AS topics (9708/2)" },
    { value: "3", label: "Paper 3", title: "Multiple Choice (A2)", desc: "30 MCQs on A2 — market structures, labour markets, development, trade (9708/3)" },
    { value: "4", label: "Paper 4", title: "Data Response & Essay (A2)", desc: "A2 data response + extended essays on development, trade, policy evaluation (9708/4)" },
  ],
};

/* ── Practice: topics per subject ── */
export const topicsBySubject: Record<Subject, string[]> = {
  economics: [
    "Price Elasticity of Demand", "Income Elasticity of Demand", "Cross Elasticity of Demand",
    "Supply and Demand", "Market Failure", "Externalities", "Public Goods", "Merit & Demerit Goods",
    "Government Intervention", "Competition Policy", "Labour Markets", "Wage Determination",
    "Aggregate Demand", "Aggregate Supply", "Fiscal Policy", "Monetary Policy",
    "Supply-Side Policies", "Economic Growth", "Unemployment", "Inflation",
    "Balance of Payments", "Exchange Rates", "Globalisation", "Trade Blocs & Protectionism",
    "Development Economics", "Inequality & Poverty",
  ],
  maths: [
    "Number — Fractions, Decimals & Percentages", "Number — Indices & Standard Form",
    "Algebra — Expressions & Formulae", "Algebra — Equations & Inequalities",
    "Algebra — Sequences", "Algebra — Graphs",
    "Ratio, Proportion & Rates of Change",
    "Geometry — Angles & Properties of Shapes", "Geometry — Transformations",
    "Geometry — Pythagoras & Trigonometry", "Geometry — Area, Perimeter & Volume",
    "Geometry — Vectors", "Geometry — Circle Theorems",
    "Probability — Single & Combined Events", "Probability — Tree Diagrams & Venn Diagrams",
    "Statistics — Averages & Spread", "Statistics — Charts & Graphs", "Statistics — Cumulative Frequency & Box Plots",
  ],
  chemistry: [
    "Atomic Structure & The Periodic Table", "Electronic Structure",
    "Bonding, Structure & Properties of Matter", "Ionic Bonding", "Covalent Bonding", "Metallic Bonding",
    "Quantitative Chemistry — Moles & Calculations", "Chemical Changes — Acids & Bases",
    "Chemical Changes — Electrolysis", "Reactivity Series & Extraction of Metals",
    "Energy Changes — Exothermic & Endothermic", "Rates of Reaction",
    "Equilibrium & Le Chatelier's Principle", "Organic Chemistry — Crude Oil & Hydrocarbons",
    "Chemical Analysis — Chromatography & Tests", "Chemistry of the Atmosphere",
    "Using Resources — Potable Water & Life Cycle Assessments",
  ],
  "edexcel-a": [
    "Nature of Economics", "How Markets Work", "Market Failure", "Government Intervention",
    "Market Structures", "Labour Market", "Poverty & Inequality",
    "Measures of Economic Performance", "Aggregate Demand", "Aggregate Supply",
    "National Income", "Economic Growth", "Macroeconomic Objectives & Policy",
    "Financial Markets & Monetary Policy", "Fiscal Policy & Supply-Side Policies",
    "International Economics & Trade", "Globalisation", "Exchange Rates",
    "Balance of Payments", "Development Economics",
  ],
  "edexcel-b": [
    "Demand, Supply & Market Equilibrium", "Elasticity", "Market Failure & Government Intervention",
    "Business Objectives & Behaviour", "Revenue, Costs & Profits", "Market Structures",
    "Labour Market", "Government Intervention in Markets",
    "Economic Indicators", "Aggregate Demand & Aggregate Supply", "Macroeconomic Policy",
    "Inequality", "Financial Sector", "Global Trade & the WTO",
    "Trading Blocs & Globalisation", "Emerging & Developing Economies", "Public Finance",
    "The Role of the State in the Macroeconomy",
  ],
  "ocr": [
    "The Economic Problem & Opportunity Cost", "Demand & Supply", "Market Equilibrium",
    "Elasticity (PED, YED, XED, PES)", "Consumer & Producer Surplus",
    "Market Failure & Externalities", "Public Goods & Merit Goods", "Government Intervention",
    "Business Objectives", "Market Structures", "Contestable Markets",
    "Costs & Revenue", "Labour Market & Wage Determination",
    "Aggregate Demand & Aggregate Supply", "Economic Growth", "Inflation & Unemployment",
    "Fiscal Policy", "Monetary Policy", "Supply-Side Policies",
    "International Trade & Globalisation", "Exchange Rates & Balance of Payments",
    "Financial Sector", "Inequality & Development",
  ],
  "cambridge": [
    "Scarcity, Choice & Opportunity Cost", "Production Possibility Curves",
    "Demand, Supply & Market Equilibrium", "Elasticity (PED, YED, XED, PES)",
    "Consumer & Producer Surplus", "Market Failure & Externalities",
    "Public Goods & Merit Goods", "Government Intervention & Government Failure",
    "National Income & Living Standards", "Aggregate Demand & Aggregate Supply",
    "Inflation", "Unemployment", "Balance of Payments & Exchange Rates",
    "Fiscal, Monetary & Supply-Side Policies", "The Multiplier",
    "Market Structures (Perfect Competition, Monopoly, Oligopoly, Monopolistic Competition)",
    "Contestable Markets", "Labour Market & Wage Determination",
    "International Trade & Comparative Advantage", "Protectionism & Trade Blocs",
    "Economic Development & Developing Countries", "Globalisation",
    "Inequality & Poverty", "Role of the State in the Macroeconomy",
  ],
};

/* ── Practice: question styles per subject ── */
export const stylesBySubject: Record<Subject, string[]> = {
  economics: ["Multiple Choice", "Short Answer (Data Response)", "Essay Question"],
  maths: ["Multiple Choice", "Short Answer (1–3 marks)", "Multi-step Problem (4–5 marks)"],
  chemistry: ["Multiple Choice", "Short Answer (1–3 marks)", "Extended Response (6 marks)", "Required Practical"],
  "edexcel-a": ["Multiple Choice", "Short Answer (Data Response)", "Essay Question (25 marks)"],
  "edexcel-b": ["Multiple Choice", "Short Answer (Data Response)", "Extended Open-Response"],
  "ocr": ["Short Answer (Data Response)", "Explain with Diagram (8 marks)", "Essay Question (25 marks)"],
  "cambridge": ["Multiple Choice", "Short Answer (Data Response)", "Explain with Diagram", "Essay Question (25 marks)"],
};

/* ── Essay Grader: question types per subject ── */
export const questionTypesBySubject: Record<Subject, string[]> = {
  economics: [
    "9-mark evaluate", "15-mark discuss", "25-mark essay",
    "4-mark define and explain", "5-mark extract question", "12-mark analyse",
  ],
  maths: [
    "1–2 mark short answer", "3–4 mark method question",
    "5–6 mark multi-step problem", "Problem-solving / reasoning",
  ],
  chemistry: [
    "1–2 mark recall", "3–4 mark application",
    "6-mark extended response", "Required practical question",
    "Calculation question", "Balanced equation question",
  ],
  "edexcel-a": [
    "5-mark data response", "8-mark explain/analyse", "12-mark evaluate",
    "20-mark data response evaluate", "25-mark essay",
  ],
  "edexcel-b": [
    "4-mark knowledge/application", "8-mark analyse", "12-mark evaluate",
    "20-mark data response evaluate", "Extended open-response",
  ],
  "ocr": [
    "2-mark define/calculate", "4-mark explain", "8-mark explain with diagram",
    "16-mark evaluate", "25-mark essay",
  ],
  "cambridge": [
    "1-mark MCQ", "2-mark calculate/define", "4-mark explain",
    "6-mark analyse with diagram", "8-mark evaluate", "20-mark data response evaluate",
    "25-mark essay",
  ],
};
