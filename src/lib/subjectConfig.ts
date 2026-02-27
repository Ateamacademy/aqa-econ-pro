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
};

/* ── Practice: question styles per subject ── */
export const stylesBySubject: Record<Subject, string[]> = {
  economics: ["Multiple Choice", "Short Answer (Data Response)", "Essay Question"],
  maths: ["Multiple Choice", "Short Answer (1–3 marks)", "Multi-step Problem (4–5 marks)"],
  chemistry: ["Multiple Choice", "Short Answer (1–3 marks)", "Extended Response (6 marks)", "Required Practical"],
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
};
