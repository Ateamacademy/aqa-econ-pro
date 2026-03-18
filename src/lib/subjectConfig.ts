import type { Subject } from "@/contexts/SubjectContext";

/* ── Predicted Papers: paper options per subject ── */
export const paperOptionsBySubject: Record<Subject, { value: string; label: string; title: string; desc: string }[]> = {
  economics: [
    { value: "1", label: "Paper 1", title: "Markets & Market Failure", desc: "Microeconomics — supply & demand, elasticity, market failure, government intervention (7136/1)" },
    { value: "2", label: "Paper 2", title: "National & International Economy", desc: "Macroeconomics — GDP, inflation, unemployment, fiscal & monetary policy, trade (7136/2)" },
    { value: "full", label: "Paper 3", title: "Economic Principles & Issues", desc: "Synoptic paper — 30 MCQs + case study investigation covering both micro & macro (7136/3)" },
  ],
  "edexcel-a": [
    { value: "1", label: "Paper 1", title: "Markets & Business Behaviour", desc: "Microeconomics — demand, supply, market structures, labour markets, government intervention (9EC0/01)" },
    { value: "2", label: "Paper 2", title: "The National & Global Economy", desc: "Macroeconomics — AD/AS, economic performance, financial sector, trade, development (9EC0/02)" },
    { value: "full", label: "Paper 3", title: "Microeconomics & Macroeconomics", desc: "Synoptic paper — data response + extended open-response covering both micro & macro (9EC0/03)" },
  ],
  "edexcel-b": [
    { value: "1", label: "Paper 1", title: "Markets, Consumers & Firms", desc: "How markets work, market failure, business behaviour, the labour market (9EB0/01)" },
    { value: "2", label: "Paper 2", title: "The Wider Economic Environment", desc: "Economic indicators, macroeconomic policy, inequality, the financial sector (9EB0/02)" },
    { value: "full", label: "Paper 3", title: "The Global Economy", desc: "Synoptic paper — globalisation, trade, development, financial markets (9EB0/03)" },
  ],
  "ocr": [
    { value: "1", label: "Component 01", title: "Microeconomics", desc: "Markets, market failure, business objectives, market structures, labour market (H460/01)" },
    { value: "2", label: "Component 02", title: "Macroeconomics", desc: "AD/AS, policy objectives, fiscal/monetary/supply-side, trade, financial sector (H460/02)" },
    { value: "full", label: "Full Paper", title: "Full Predicted Paper", desc: "Synoptic — draws together micro and macro across all content areas (H460/03)" },
  ],
  "cambridge": [
    { value: "1", label: "Paper 1", title: "Multiple Choice (AS)", desc: "30 MCQs covering AS micro & macro — scarcity, markets, externalities, AD/AS, policy (9708/1)" },
    { value: "2", label: "Paper 2", title: "Data Response & Essay (AS)", desc: "Data response with extracts + structured essay on AS topics (9708/2)" },
    { value: "full", label: "Full Paper", title: "Full Predicted Paper", desc: "Complete A2 paper — data response + extended essays on development, trade, policy (9708/3+4)" },
  ],
  "aqa-gcse": [
    { value: "1", label: "Paper 1", title: "How Markets Work", desc: "Microeconomics — economic foundations, resource allocation, how markets work (8136/1)" },
    { value: "2", label: "Paper 2", title: "How the Economy Works", desc: "Macroeconomics — the role of markets, the economy, the UK & global economy (8136/2)" },
    { value: "full", label: "Full Paper", title: "Full Predicted Paper", desc: "Complete exam paper covering both micro & macro GCSE Economics topics" },
  ],
  "cambridge-igcse": [
    { value: "1", label: "Paper 1", title: "Multiple Choice", desc: "30 MCQs covering all IGCSE Economics topics (0455/1)" },
    { value: "2", label: "Paper 2", title: "Structured Questions", desc: "Data response and structured questions on micro & macro (0455/2)" },
    { value: "full", label: "Full Paper", title: "Full Predicted Paper", desc: "Complete IGCSE Economics predicted paper covering all topics" },
  ],
  "ib": [
    { value: "1", label: "Paper 1", title: "Extended Response", desc: "Essay-based paper — two questions from different syllabus units, 1h15m SL / 1h30m HL" },
    { value: "2", label: "Paper 2", title: "Data Response", desc: "Data response paper with quantitative and qualitative questions on real-world extracts" },
    { value: "full", label: "Paper 3 (HL)", title: "HL Extension Paper", desc: "HL only — policy questions with calculations, diagrams, and extended analysis" },
  ],
  "wjec": [
    { value: "1", label: "Unit 1", title: "Introduction to Economics", desc: "AS-level micro: market mechanisms, market failure, government intervention (1h30m)" },
    { value: "2", label: "Unit 2", title: "Economics in Action", desc: "AS-level macro: economic indicators, AD/AS, fiscal & monetary policy (1h30m)" },
    { value: "full", label: "Full Paper", title: "Full Predicted Paper", desc: "Complete A2 paper — covers Units 3 & 4: micro & macro applied economics" },
  ],
  "eduqas": [
    { value: "1", label: "Component 1", title: "Markets & Market Failure", desc: "Microeconomics — demand, supply, elasticity, market failure, government intervention (2h)" },
    { value: "2", label: "Component 2", title: "National & International Economy", desc: "Macroeconomics — economic growth, inflation, trade, fiscal/monetary policy (2h)" },
    { value: "full", label: "Component 3", title: "Full Synoptic Paper", desc: "Synoptic data response paper drawing on all micro and macro content (2h15m)" },
  ],
  "edexcel-igcse": [
    { value: "1", label: "Paper 1", title: "Microeconomics & Business", desc: "Microeconomics and business economics — demand, supply, market structure (4EC1/01)" },
    { value: "2", label: "Paper 2", title: "Macroeconomics & Global", desc: "Macroeconomics and the global economy — GDP, trade, development (4EC1/02)" },
    { value: "full", label: "Full Paper", title: "Full Predicted Paper", desc: "Complete IGCSE Economics predicted paper covering all topics" },
  ],
  "ocr-gcse": [
    { value: "1", label: "Component 1", title: "Introduction to Economics", desc: "Microeconomics — the role of markets, market failure, the economy (J205/01)" },
    { value: "2", label: "Component 2", title: "National & International Economics", desc: "Macroeconomics — the UK economy, international trade, globalisation (J205/02)" },
    { value: "full", label: "Full Paper", title: "Full Predicted Paper", desc: "Complete OCR GCSE Economics predicted paper covering all topics" },
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
  "aqa-gcse": [
    "Economic Foundations", "Resource Allocation", "How Markets Work",
    "Market Failure", "Government Intervention", "The Role of Money",
    "The UK Economy", "Income & Expenditure", "Aggregate Demand & Supply",
    "Economic Growth", "Unemployment", "Inflation", "International Trade",
    "The Role of Government",
  ],
  "cambridge-igcse": [
    "The Basic Economic Problem", "The Allocation of Resources",
    "Microeconomic Decision Makers", "Government & the Macroeconomy",
    "Economic Development", "International Trade & Globalisation",
    "Demand & Supply", "Elasticity", "Market Failure", "Government Intervention",
    "Living Standards", "Employment & Unemployment", "Inflation & Deflation",
  ],
  "ib": [
    "Introduction to Economics & the Economic Problem", "Demand", "Supply",
    "Competitive Market Equilibrium", "Critique of Maximizing Behaviour (HL)",
    "Elasticities of Demand (PED, YED, XED)", "Elasticity of Supply (PES)",
    "Role of Government in Microeconomics", "Market Failure — Externalities",
    "Market Failure — Public Goods", "Asymmetric Information (HL)", "Market Power (HL)",
    "Measuring Economic Activity (GDP)", "Variations in Economic Activity — AD/AS",
    "Macroeconomic Objectives", "Economics of Inequality & Poverty",
    "Monetary Policy", "Fiscal Policy", "Supply-Side Policies",
    "International Trade", "Exchange Rates", "Balance of Payments",
    "Economic Integration", "Terms of Trade (HL)",
    "Economic Development", "Barriers to Development", "Strategies for Development",
  ],
  "wjec": [
    "Basic Economic Problem & Opportunity Cost", "Price Determination",
    "Elasticity (PED, YED, XED, PES)", "Market Failure & Externalities",
    "Public Goods & Merit Goods", "Government Intervention in Markets",
    "National Economic Performance", "Aggregate Demand",
    "Aggregate Supply", "Macroeconomic Policy Objectives",
    "Fiscal Policy", "Monetary Policy", "Supply-Side Policies",
    "Market Structures", "Labour Market", "Income Distribution & Poverty",
    "International Trade & Globalisation", "Exchange Rates & Balance of Payments",
    "Economic Growth & Development",
  ],
  "eduqas": [
    "Basic Economic Problem", "Demand & Supply", "Elasticity",
    "Market Failure & Externalities", "Public Goods & Merit Goods",
    "Government Intervention", "Market Structures",
    "Labour Market & Wage Determination", "Income Distribution",
    "Macroeconomic Indicators", "Aggregate Demand & Aggregate Supply",
    "Economic Growth", "Unemployment", "Inflation",
    "Fiscal Policy", "Monetary Policy", "Supply-Side Policies",
    "International Trade", "Exchange Rates & Balance of Payments",
    "Globalisation", "Development Economics",
  ],
  "edexcel-igcse": [
    "The Market System", "Demand & Supply", "Elasticity",
    "Market Failure", "Government Intervention", "Business Economics",
    "Costs, Revenue & Profit", "Market Structures",
    "Labour Market", "Government & the Economy",
    "Macroeconomic Objectives", "Fiscal Policy", "Monetary Policy",
    "Supply-Side Policies", "International Trade",
    "Exchange Rates", "Balance of Payments", "Globalisation & Development",
  ],
  "ocr-gcse": [
    "The Role of Markets", "Demand & Supply", "Elasticity",
    "Market Failure", "Government Intervention", "The Labour Market",
    "The Role of Money & Financial Markets",
    "The UK Economy", "Economic Growth", "Unemployment", "Inflation",
    "Fiscal Policy", "Monetary Policy", "Supply-Side Policies",
    "International Trade", "Globalisation",
  ],
};

/* ── Practice: question styles per subject ── */
export const stylesBySubject: Record<Subject, string[]> = {
  economics: ["Multiple Choice", "Short Answer (Data Response)", "Essay Question"],
  "edexcel-a": ["Multiple Choice", "Short Answer (Data Response)", "Essay Question (25 marks)"],
  "edexcel-b": ["Multiple Choice", "Short Answer (Data Response)", "Extended Open-Response"],
  "ocr": ["Short Answer (Data Response)", "Explain with Diagram (8 marks)", "Essay Question (25 marks)"],
  "cambridge": ["Multiple Choice", "Short Answer (Data Response)", "Explain with Diagram", "Essay Question (25 marks)"],
  "aqa-gcse": ["Multiple Choice", "Short Answer", "Extended Response (6 marks)"],
  "cambridge-igcse": ["Multiple Choice", "Short Answer (Data Response)", "Structured Question"],
  "ib": ["Short Answer (Data Response)", "Essay Question (Part a/b)", "HL Paper 3 Calculation"],
  "wjec": ["Short Answer (Data Response)", "Explain with Diagram", "Essay Question (12 marks)"],
  "eduqas": ["Short Answer (Data Response)", "Explain with Diagram", "Essay Question (20 marks)"],
  "edexcel-igcse": ["Multiple Choice", "Short Answer (Data Response)", "Structured Question (8 marks)"],
  "ocr-gcse": ["Multiple Choice", "Short Answer", "Extended Response (6 marks)"],
};

/* ── Essay Grader: question types per subject ── */
export const questionTypesBySubject: Record<Subject, string[]> = {
  economics: [
    "9-mark evaluate", "15-mark discuss", "25-mark essay",
    "4-mark define and explain", "5-mark extract question", "12-mark analyse",
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
  "aqa-gcse": [
    "1-mark define", "2-mark explain", "4-mark analyse",
    "6-mark evaluate", "9-mark extended response",
  ],
  "cambridge-igcse": [
    "1-mark MCQ", "2-mark define", "4-mark explain",
    "6-mark analyse", "8-mark evaluate",
  ],
  "ib": [
    "10-mark short answer", "15-mark essay (Part a)",
    "10-mark essay (Part b)", "HL Paper 3 calculation (4 marks)",
    "HL policy response (8 marks)",
  ],
  "wjec": [
    "2-mark define", "4-mark explain", "6-mark analyse with diagram",
    "8-mark data response", "12-mark evaluate",
  ],
  "eduqas": [
    "2-mark define", "4-mark explain", "8-mark analyse",
    "12-mark data response", "20-mark evaluate essay",
  ],
  "edexcel-igcse": [
    "1-mark define", "2-mark explain", "4-mark analyse",
    "6-mark evaluate", "8-mark extended response",
  ],
  "ocr-gcse": [
    "1-mark define", "2-mark state", "4-mark explain",
    "6-mark discuss/evaluate", "9-mark extended response",
  ],
};
