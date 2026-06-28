import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { canGeneratePapers } from "@/lib/paperGenAccess";
import { getPredictedPaperDifficulty, hasPremiumAccess, isPremiumPredictedPaper } from "@/lib/premiumAccess";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Lock, Sparkles, RotateCcw, ArrowRight, Library, Wand2, BookOpen, Download, CheckCircle, Loader2, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { FigureAnalysisPanel } from "@/components/predicted-papers/FigureAnalysisPanel";
import { FREE_LIMITS } from "@/lib/plans";
import { PaperSelector } from "@/components/predicted-papers/PaperSelector";
import { TierSelector } from "@/components/predicted-papers/TierSelector";
import { QuestionCard } from "@/components/predicted-papers/QuestionCard";
import { parseQuestions, type ParsedQuestion } from "@/components/predicted-papers/parseQuestions";
import { paperOptionsBySubject, topicsBySubject } from "@/lib/subjectConfig";
import { PeriodicTable } from "@/components/tools/PeriodicTable";
import { ChemistryEquations } from "@/components/tools/ChemistryEquations";
import { predictedPapersLibrary, type PredictedPaper } from "@/data/predictedPapersLibrary";
import {
  MATHS_PAST_PAPER_KNOWLEDGE,
  CHEMISTRY_PAST_PAPER_KNOWLEDGE,
  ECONOMICS_PAST_PAPER_KNOWLEDGE,
  EDEXCEL_A_PAST_PAPER_KNOWLEDGE,
  EDEXCEL_B_PAST_PAPER_KNOWLEDGE,
  OCR_PAST_PAPER_KNOWLEDGE,
} from "@/data/pastPaperPatterns";
import { generateKnowledgeGraphPrompt } from "@/data/economicsKnowledgeGraph";
import { generatePaperPdf } from "@/lib/generatePaperPdf";
import { generateSolutionPdf, type SolutionEntry } from "@/lib/generateSolutionPdf";
import { resolveStaticPaperPdf, triggerStaticPdfDownload } from "@/lib/staticPaperResolver";
import { UpgradeModal } from "@/components/UpgradeModal";
import { ReportButton } from "@/components/report/ReportButton";
import { ComingSoonBoard } from "@/components/predicted-papers/ComingSoonBoard";
import { subjectToBoardId, getBoardDefinition } from "@/lib/boards/registry";
import { ExamTimer } from "@/components/predicted-papers/ExamTimer";
import { ExamResultsSummary } from "@/components/predicted-papers/ExamResultsSummary";
import { resolveDiagramType } from "@/components/revision/EconDiagramLibrary";
import { tagAqaQuestion, inferPaperFromContext } from "@/lib/aqaPredictedDiagramTagging";
import { getAqaPaper3OverrideContent } from "@/data/aqaPaper3Overrides";
import { getOcrPredictedMarkScheme } from "@/data/ocrPredictedMarkSchemes";
import { loadPredictedMarkScheme } from "@/lib/predictedMarkSchemeLoader";

// Exam durations in minutes per subject + paper.
// AQA A-Level Economics (7136) · every paper is 2 hours. Source of truth: AQA_SPEC.durationMinutes.
const EXAM_DURATIONS: Record<string, Record<string, number>> = {
  economics:        { "1": 120, "2": 120, full: 120 },
  "edexcel-a":      { "1": 120, "2": 120, full: 120 },
  "edexcel-b":      { "1": 120, "2": 120, full: 120 },
  "ocr":            { "1": 120, "2": 120, full: 120 },
  "cambridge":      { "1": 75,  "2": 135, full: 135 },
  "ib":             { "1": 90,  "2": 105, full: 105 },
  "wjec":           { "1": 90,  "2": 90,  full: 120 },
  "eduqas":         { "1": 120, "2": 120, full: 135 },
  "aqa-gcse":       { "1": 105, "2": 105, full: 105 },
  "cambridge-igcse": { "1": 45, "2": 135, full: 135 },
  "edexcel-igcse":  { "1": 75,  "2": 85,  full: 85 },
  "ocr-gcse":       { "1": 75,  "2": 75,  full: 75 },
};

// Display-only mapping: rename Set A/B/C to Moderate/Hard/Advanced for predicted papers.
// Underlying paper IDs and data structures keep the Set A/B/C convention so routing,
// sorting, and library lookups continue to work unchanged.
const SET_LABEL_DISPLAY_MAP: Record<string, string> = {
  A: "Moderate",
  B: "Hard",
  C: "Advanced",
};

function displayPaperTitle(title: string): string {
  return title.replace(/Set\s+([A-Z])\b/gi, (match, letter: string) => {
    const mapped = SET_LABEL_DISPLAY_MAP[letter.toUpperCase()];
    return mapped ?? match;
  });
}

type QuestionFeedback = {
  markScheme: string;
  modelAnswer: string;
  examinerTip: string;
  // Smart Mark format for diagram questions
  isDiagramFeedback?: boolean;
  mark?: string;
  smartFeedback?: string;
  explainFeedback?: string;
  improveFeedback?: string;
};

const MATHS_PAPER_PROMPT = (paperLabel: string, isCalc: boolean, tier: "Foundation" | "Higher") => {
  const tierDesc = tier === "Foundation"
    ? "Foundation tier (targeting grades 1–5). Questions should be accessible and build gradually. Include standard procedural questions, real-life context problems, and some reasoning questions. Avoid higher-only topics like surds, circle theorems, sine/cosine rule, and algebraic proof."
    : "Higher tier (targeting grades 4–9). Include a good mix of difficulty. Start with accessible crossover questions (grades 4–5), build through grades 6–7 questions, and finish with challenging grade 8–9 questions including proof, circle theorems, iteration, algebraic fractions, and advanced trigonometry.";

  return `You are an expert Edexcel GCSE Mathematics examiner trained on every Edexcel GCSE Maths paper from 2017–2024. Generate a COMPLETE, REALISTIC predicted exam paper for ${paperLabel}.

${MATHS_PAST_PAPER_KNOWLEDGE}

TIER: ${tierDesc}

CALCULATOR: ${isCalc ? "YES · this is a CALCULATOR paper. Questions can involve complex arithmetic, trigonometry with decimals, statistical calculations, and iterative methods." : "NO · this is a NON-CALCULATOR paper. All arithmetic must be manageable by hand. Focus on fractions, mental methods, estimation, exact values, and algebraic manipulation."}

STRUCTURE (match real Edexcel papers EXACTLY):
- 20–25 questions, numbered sequentially
- Total: 80 marks
- Questions progress from easy (1–2 marks) to hard (5–6 marks)
- Multi-part questions use (a), (b), (c) labelling
- Include a variety of command words: "Work out", "Calculate", "Show that", "Prove", "Explain why", "Give a reason"
- Start with 3–4 short 1–2 mark "warm-up" questions, then build complexity

USE THE PAST-PAPER PATTERNS ABOVE to create NEW questions that feel like they belong in a real Edexcel paper. Do NOT copy questions verbatim · create original questions in the SAME STYLE and DIFFICULTY.

Ensure EVERY topic area from the past-paper patterns is represented. Include at least 6 graph/diagram/figure/table questions.

IMPORTANT FORMATTING · FOLLOW EXACTLY:
Question 1 [2 marks]
Question 2 [3 marks]
Question 3a [1 marks]
Question 3b [2 marks]

Do NOT wrap question headers in bold/asterisks. Write them exactly as shown above.
Use realistic Figure/Table blocks where appropriate, but always include all required data in text so the question is fully answerable.
Make questions topical, varied, and exam-authentic. Avoid repeating similar question types.

FIGURE/CHART/GRAPH FORMAT (CRITICAL · DO NOT USE ASCII ART):
- NEVER draw charts, graphs, or diagrams using ASCII characters (|, /, \\, -, +, ^, X, etc.)
- For DATA figures (bar charts, line graphs, scatter plots): present the data in a **markdown table** with clear column headers, then add a brief description like "Figure 1: Average Purchase Price of New BEVs in the UK (constant 2023 prices, £000s)" above the table
- For DIAGRAMS (supply & demand, cost curves, reaction profiles): describe them in structured text using a "**Figure N:**" heading followed by bullet points listing axes, curves, key points, equilibrium positions, and shifts
- Example data figure format:
  **Figure 1:** Average Purchase Price of New Battery Electric Vehicles (BEVs) in the UK (constant 2023 prices, £000s)
  | Year | Price (£000s) |
  |------|--------------|
  | 2020 | 50 |
  | 2021 | 45 |
  | 2022 | 40 |
  | 2023 | 35 |
  | 2024 (Forecast) | 33 |
  Source: Office for National Statistics, 2024
- Example diagram figure format:
  **Figure 2:** Demand and Supply Conditions in the UK Housing Market
  - Vertical axis: Price (£000s), ranging from 0 to 300
  - Horizontal axis: Quantity of Houses (units)
  - Demand curve D₁ slopes downward from left to right
  - Supply curve S₁ slopes upward from left to right
  - Equilibrium at intersection: price P₁, quantity Q₁
  Source: Hypothetical representation of the UK housing market, 2024`;
};

const EDEXCEL_ECON_PAPER_PROMPT = (paperLabel: string, spec: "edexcel-a" | "edexcel-b", paperValue: string) => {
  const isSpecA = spec === "edexcel-a";
  const specName = isSpecA ? "Edexcel Economics A (9EC0)" : "Edexcel Economics B (9EB0)";
  const paperNum = paperValue === "full" ? "3" : paperValue.includes("1") ? "1" : "2";

  const specATemplates: Record<string, string> = {
    "1": `PAPER 1: Markets and Business Behaviour (9EC0/01) · 2 hours, 100 marks
STRUCTURE:
## Section A: Supported Multiple Choice (5 questions × 4 marks = 20 marks)
Each question has a stimulus (short extract/data), a 1-mark MCQ (A/B/C/D), then a 3-mark "Explain your answer" follow-up.
Question 01a [1 marks] MCQ
Question 01b [3 marks] Explain your answer
Question 02a [1 marks] MCQ
Question 02b [3 marks] Explain your answer
(... through Question 05)

## Section B: Data Response (one from two options, 40 marks)
### EITHER Option 1 OR Option 2
Each option has 2-3 Extracts (data + text) followed by:
Question 06 [5 marks] · Short data interpretation
Question 07 [8 marks] · "Explain, using a diagram..."
Question 08 [12 marks] · "Evaluate..." / "Assess..."
Question 09 [15 marks] · Extended evaluation (KAA + Evaluation)

## Section C: Extended Open-Response (one from two, 40 marks)
### EITHER Essay 1 OR Essay 2
Each has a brief context then two parts:
Question 10a [5 marks] · Define/explain a concept
Question 10b [15 marks] · "Evaluate the view that..." / "Assess whether..."
Question 10c [20 marks] · Extended evaluation essay`,

    "2": `PAPER 2: The National and Global Economy (9EC0/02) · 2 hours, 100 marks
Same structure as Paper 1 but MACROECONOMIC topics:
Section A: 5 supported MCQs (20 marks)
Section B: Data response with macro data (GDP, inflation, trade, etc.) (40 marks)
Section C: Extended open-response macro essay (40 marks)
Topics: AD/AS, economic growth, unemployment, inflation, fiscal/monetary policy, financial markets, exchange rates, globalisation, development.`,

    "3": `PAPER 3: Microeconomics and Macroeconomics (9EC0/03) · 2 hours, 100 marks
SYNOPTIC PAPER · tests BOTH micro AND macro.
## Section A: Data Response (one from two, 50 marks)
Extended case study with 4-5 Extracts covering both micro and macro themes.
Questions range from 2-mark define to 25-mark evaluate.
## Section B: Extended Open-Response (one from two, 50 marks)
Two-part essay requiring synoptic links between micro and macro.
Question a [25 marks] and Question b [25 marks].`,
  };

  const specBTemplates: Record<string, string> = {
    "1": `PAPER 1: Markets, Consumers and Firms (9EB0/01) · 2 hours, 80 marks
STRUCTURE:
## Section A: Data Response (compulsory, 40 marks)
Case study with 3-4 Extracts + Figures
Question 01 [4 marks] · Knowledge/application
Question 02 [8 marks] · "Explain, using a diagram..."
Question 03 [10 marks] · "Assess..."
Question 04 [18 marks] · "Evaluate..." (extended)

## Section B: Essay (one from three, 40 marks)
Question 05/06/07 [40 marks] · Full essay with KAA + Evaluation
Topics: demand/supply, elasticity, market failure, business behaviour, costs/revenue, market structures, labour market.`,

    "2": `PAPER 2: The Wider Economic Environment (9EB0/02) · 2 hours, 80 marks
Same structure as Paper 1 but MACRO topics:
Section A: compulsory data response (40 marks)
Section B: essay choice (40 marks)
Topics: economic indicators, AD/AS, macro policy, inequality, financial sector, role of state.`,

    "3": `PAPER 3: The Global Economy (9EB0/03) · 2 hours, 80 marks
SYNOPTIC PAPER:
## Section A: Data Response (compulsory, 40 marks)
Global case study with extracts on trade, development, globalisation.
## Section B: Essay (one from three, 40 marks)
Essay on global economy themes requiring synoptic micro+macro links.
Topics: globalisation, trade, WTO, trading blocs, development, financial markets.`,
  };

  const template = isSpecA ? specATemplates[paperNum] : specBTemplates[paperNum];

  const patternKnowledge = isSpecA ? EDEXCEL_A_PAST_PAPER_KNOWLEDGE : EDEXCEL_B_PAST_PAPER_KNOWLEDGE;

  return `You are an expert ${specName} chief examiner trained on every ${specName} paper from 2017–2024.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${patternKnowledge}

${template}

CRITICAL RULES:
1. Follow the template structure EXACTLY
2. Extracts must contain realistic 2023-2025 UK/global data
3. Tables must have specific numerical data so calculation questions are answerable
4. Every diagram question must specify "Using a diagram" or "With the help of a diagram"
5. At least 40% of marks must target Analyse/Evaluate (Bloom's levels 4-6)
6. 15+ mark questions MUST require chains of reasoning, counter-arguments, and justified judgement
7. Use precise command words: "Evaluate", "Assess", "To what extent", "Discuss"

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01a [1 marks], Question 01b [3 marks], Question 06 [5 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks. Do NOT put marks at the end of the line after question text.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- MCQ options on separate lines: - A, - B, - C, - D
- WRONG: **Question 1** text [2], Question 1 text (2 marks), Q1 [2 marks]
- CORRECT: Question 01a [1 marks] Which of the following best describes allocative efficiency?
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data figures: use markdown tables with headers and Source line
- Diagrams: describe with bullet points (axes, curves, equilibrium points)`;
};

const OCR_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "3" : paperValue.includes("1") ? "1" : "2";
  const knowledgeGraphSection = generateKnowledgeGraphPrompt(paperNum, "ocr");

  const templates: Record<string, string> = {
    "1": `COMPONENT 01: Microeconomics (H460/01) · 2 hours, 80 marks
## Section A: Data Response (compulsory, 30 marks)
Case study with 2-3 Extracts (text + data tables/figures)
Question 01 [2 marks] · calculation/define
Question 02 [4 marks] · explain with reasoning
Question 03 [8 marks] · "Explain, with the aid of a diagram..."
Question 04 [16 marks] · "Evaluate..."

## Section B: Essay (choose TWO from THREE, 50 marks)
Question 05 [25 marks] · Extended evaluation essay (micro)
Question 06 [25 marks] · Extended evaluation essay (micro)
Question 07 [25 marks] · Extended evaluation essay (micro)`,

    "2": `COMPONENT 02: Macroeconomics (H460/02) · 2 hours, 80 marks
Same structure as Component 01 but MACRO topics:
Section A: Data response (30 marks) · 2m, 4m, 8m, 16m
Section B: Two essays from three (50 marks) · each 25 marks
Topics: AD/AS, growth, inflation, unemployment, fiscal/monetary/supply-side policy, trade, financial sector.`,

    "3": `COMPONENT 03: Themes in Economics (H460/03) · 2 hours, 80 marks
SYNOPTIC · tests BOTH micro AND macro.
Section A: Data response (30 marks) · synoptic case study requiring micro+macro links
Section B: Two essays from three (50 marks) · synoptic evaluation essays
Each essay MUST require students to draw on knowledge from BOTH Components 01 and 02.`,
  };

  return `You are an expert OCR A-Level Economics (H460) chief examiner trained on every OCR Economics paper.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${OCR_PAST_PAPER_KNOWLEDGE}

${knowledgeGraphSection}

${templates[paperNum]}

CRITICAL RULES:
1. Follow the template structure EXACTLY
2. Extracts must contain realistic 2023-2025 UK/global data
3. 8-mark questions MUST include "Explain, with the aid of a diagram"
4. 25-mark essays require KAA (12 marks) + Evaluation (13 marks)
5. At least 40% of marks must target Analyse/Evaluate (AO3+AO4)
6. Use OCR command words precisely: "Explain", "Evaluate", "Calculate"

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01 [2 marks], Question 02 [4 marks], Question 03 [8 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks. Do NOT put marks at the end of the line after question text.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- WRONG: **Question 1** Calculate... [2], Question 1 Calculate... [2 marks], Q1 [2 marks]
- CORRECT: Question 01 [2 marks] Calculate the percentage change...
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data figures: markdown tables with Source line
- Diagrams: structured text with axes, curves, equilibrium points`;
};

const CAIE_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "4" : paperValue.includes("1") ? "1" : "2";
  const knowledgeGraphSection = generateKnowledgeGraphPrompt(paperNum, "cambridge");

  const templates: Record<string, string> = {
    "1": `PAPER 1: Multiple Choice (AS) · 1 hour, 30 marks
30 MCQs covering both AS micro and macro. Each worth 1 mark.
Mix of: recall, calculation, diagram interpretation, and application.
Topics: scarcity, PPC, demand/supply, elasticity, market failure, externalities, AD/AS, inflation, unemployment, fiscal/monetary policy, trade.`,
    "2": `PAPER 2: Data Response and Essay (AS) · 1h30, 40 marks
## Section A (choose ONE from TWO data response questions, 20 marks each)
Each has a Table/Figure + Extract (150-250 words)
Question pattern: 2m calculate → 2m identify → 4m explain → 6m analyse with diagram → 6m discuss/evaluate

## Section B (choose ONE from TWO essays, 8 marks each)
Short structured essay requiring explanation with economic reasoning.`,
    "3": `PAPER 3: Multiple Choice (A2) · 1h15, 30 marks
30 MCQs on A2 content. More analytical than Paper 1.
Topics: market structures, costs/revenue, labour markets, price discrimination, game theory, development, trade theory, welfare economics, policy evaluation.`,
    "4": `PAPER 4: Data Response and Essay (A2) · 2h15, 70 marks
## Section A (choose ONE from TWO data response questions, 20 marks each)
Each has Table + 2 Extracts (200-300 words each)
Question pattern: 2m → 2m → 4m → 4m explain with diagram → 8m evaluate

## Section B (choose ONE from THREE essays, 25 marks each)
Extended evaluation essay requiring KAA + Evaluation + Judgement.
Topics: market structures, development, trade, globalisation, policy.`,
  };

  return `You are an expert Cambridge International (CAIE) A-Level Economics (9708) chief examiner.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${templates[paperNum]}

${knowledgeGraphSection}

CRITICAL RULES:
1. Follow the template structure EXACTLY
2. Use realistic 2023-2025 global data in extracts
3. Paper 1 & 3: exactly 30 MCQs with A/B/C/D options
4. Paper 2 & 4: tables must have specific data for calculations
5. Diagram questions must specify "Using a diagram" or "With the aid of a diagram"
6. 25-mark essays require KAA + Evaluation + justified judgement
7. Use CAIE command words: "Explain", "Analyse", "Evaluate", "Discuss", "Calculate"

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01 [1 marks], Question 02 [2 marks], Question 03 [4 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks. Do NOT put marks at the end of the line after question text.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- MCQ options on separate lines: - A, - B, - C, - D
- WRONG: **Question 1** text [2], Question 1 text (2 marks)
- CORRECT: Question 01 [1 marks] What is the basic economic problem?
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: structured text with axes, curves, equilibrium points`;
};

const GCSE_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "full" : paperValue.includes("1") ? "1" : "2";

  const templates: Record<string, string> = {
    "1": `PAPER 1: How Markets Work (8136/1) · 1 hour 45 minutes, 80 marks
## Section A: Short Answer and Data Response (60 marks)
Mix of 1-mark definitions, 2-mark state/explain, 4-mark explain, and 6-mark evaluate questions.
Include 2-3 data extracts with tables/figures and Source lines.
Question pattern builds from simple recall to extended response.

## Section B: Extended Response (choose ONE from TWO, 20 marks each)
Extended writing question requiring analysis and evaluation.
Topics: economic foundations, resource allocation, supply & demand, elasticity, market failure, government intervention.`,
    "2": `PAPER 2: How the Economy Works (8136/2) · 1 hour 45 minutes, 80 marks
## Section A: Short Answer and Data Response (60 marks)
Same structure as Paper 1 but MACRO topics.
Include data on GDP, unemployment, inflation, trade balance.

## Section B: Extended Response (choose ONE from TWO, 20 marks each)
Topics: role of money, income & expenditure, AD/AS, economic growth, unemployment, inflation, international trade, government role.`,
    "full": `FULL GCSE PAPER covering BOTH micro and macro GCSE topics · 80 marks total.
This is a GCSE-level paper for 15-16 year old students. It must NOT include A-Level content.

## Section A: Short Answer and Data Response (60 marks)
Mix of micro and macro questions with data extracts.
Include 1-mark definitions, 2-mark state/explain, 4-mark explain, and 6-mark evaluate questions.
Include 2-3 data extracts with tables/figures and Source lines.

## Section B: Extended Response (choose ONE from TWO, 20 marks each)
Synoptic question requiring both micro and macro knowledge.
Maximum question mark allocation is 20 marks (NOT 25 marks · that is A-Level).`,
  };

  return `You are an expert AQA GCSE Economics (8136) chief examiner. This is a GCSE qualification for students aged 15-16. You are NOT an A-Level examiner.

CRITICAL · THIS IS A GCSE PAPER (8136), NOT A-LEVEL (7136):
- Qualification: AQA GCSE Economics (8136) for 15-16 year olds
- Maximum marks per question: 20 marks (A-Level uses 25 · DO NOT use 25)
- Total paper marks: 80 (NOT 100)
- Duration: 1 hour 45 minutes (NOT 2 hours)
- Use GCSE-appropriate language · simpler, more accessible than A-Level
- Section B extended responses are worth exactly 20 marks each

BANNED A-LEVEL TOPICS · DO NOT include any of these:
oligopoly, monopolistic competition, contestable markets, game theory, kinked demand curve, price discrimination (1st/2nd/3rd degree), natural monopoly theory, X-inefficiency, productive vs allocative efficiency diagrams, labour market wage determination theory, marginal revenue product, monopsony, bilateral monopoly, Phillips curve, NAIRU, Keynesian vs Classical/Monetarist debate, multiplier calculations, accelerator theory, Laffer curve, comparative advantage (Ricardian model), terms of trade, J-curve, Marshall-Lerner condition, balance of payments components, exchange rate systems theory, Lorenz curve, Gini coefficient calculations, cost-benefit analysis (NPV)

ALLOWED GCSE TOPICS ONLY (AQA 8136 specification):
Paper 1: Economic foundations (scarcity, opportunity cost, PPC), resource allocation, supply & demand basics, price determination, competition vs monopoly (basic only), production, market failure (externalities, public/merit/demerit goods), government intervention (taxes, subsidies, regulation, price controls)
Paper 2: Role of money, income & expenditure, aggregate demand & supply (basic), economic growth, unemployment, inflation, fiscal policy (basic), monetary policy (basic), international trade (basic), globalisation (basic), the role of government

Generate a COMPLETE predicted exam paper for \${paperLabel}.

\${templates[paperNum]}

CRITICAL FORMATTING RULES:
1. Follow the template structure EXACTLY
2. Questions MUST be GCSE level · accessible and age-appropriate
3. Include at least 2 data extracts with markdown tables and Source lines
4. 6-mark questions require analysis + evaluation
5. Use AQA GCSE command words: "Define", "State", "Explain", "Analyse", "Evaluate"
6. Include at least 2 MCQs (1 mark each with A/B/C/D options)
7. Extended response questions are worth 20 marks maximum

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with: Question XX [Y marks]
  Examples: Question 01 [1 marks], Question 02 [2 marks], Question 03 [4 marks]
- Do NOT use bold/asterisks around question headers
- The question text MUST appear AFTER the [Y marks] tag
- MCQ options on separate lines: - A, - B, - C, - D
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: describe with structured text (axes, curves, key points)`;
};

const IGCSE_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "full" : paperValue.includes("1") ? "1" : "2";

  const templates: Record<string, string> = {
    "1": `PAPER 1: Multiple Choice (0455/1) · 45 minutes, 30 marks
30 MCQs covering all IGCSE Economics topics. Each worth 1 mark.
Mix of: recall, application, data interpretation, and diagram analysis.
Topics: basic economic problem, allocation of resources, microeconomic decision makers, government & macroeconomy, economic development, international trade.`,
    "2": `PAPER 2: Structured Questions (0455/2) · 2 hours 15 minutes, 90 marks
## Section A (compulsory, 20 marks)
Data response with 1-2 extracts + figures.
Questions: 2m define → 2m state → 4m explain → 6m analyse → 6m discuss

## Section B (choose THREE from FOUR structured questions, ~23 marks each)
Each question has sub-parts from 2-mark definitions to 8-mark evaluate.
Topics must span the full IGCSE specification.`,
    "full": `FULL PAPER covering all IGCSE Economics topics · 90 marks total.
## Section A: Data Response (20 marks)
Compulsory data response with extracts and figures.
## Section B: Structured Questions (70 marks)
4-5 structured questions with sub-parts.`,
  };

  return `You are an expert Cambridge IGCSE Economics (0455) chief examiner.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${templates[paperNum]}

CRITICAL RULES:
1. Follow the template structure EXACTLY
2. Paper 1: exactly 30 MCQs with A/B/C/D options
3. Paper 2: use realistic global data in extracts
4. Questions must be IGCSE level · international context where possible
5. Diagram questions must specify "Using a diagram" or "With the aid of a diagram"
6. 8-mark questions require balanced analysis with evaluation
7. Use Cambridge IGCSE command words: "Define", "Identify", "Explain", "Analyse", "Discuss", "Evaluate"

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01 [1 marks], Question 02 [2 marks], Question 03 [4 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks. Do NOT put marks at the end of the line after question text.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- MCQ options on separate lines: - A, - B, - C, - D
- WRONG: **Question 1** text [2], Question 1 text (2 marks)
- CORRECT: Question 01 [1 marks] What is meant by the term "scarcity"?
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: describe with structured text (axes, curves, key points)`;
};

const EDEXCEL_IGCSE_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "full" : paperValue.includes("1") ? "1" : "2";

  const templates: Record<string, string> = {
    "1": `PAPER 1: Microeconomics and Business Economics (4EC1/01) · 1 hour 15 minutes, 80 marks
## Section A: Multiple Choice (20 marks)
20 MCQs covering microeconomics and business economics. Each worth 1 mark.
Topics: scarcity, opportunity cost, PPC, demand & supply, elasticity, market failure, government intervention, costs & revenue, market structures, labour market.

## Section B: Data Response (30 marks)
One compulsory data response question with 2 extracts/figures.
Questions: 2m define → 2m explain → 4m analyse → 6m explain with data → 8m discuss → 8m evaluate

## Section C: Extended Writing (30 marks)
Choose ONE from TWO extended writing questions.
Each worth 30 marks total with sub-parts building from 4m explain to 12m evaluate.
Topics must be within Edexcel IGCSE Paper 1 specification: the market system, demand & supply, elasticity, business costs/revenue/profit, market structures, labour market.`,
    "2": `PAPER 2: Macroeconomics and the Global Economy (4EC1/02) · 1 hour 25 minutes, 80 marks
## Section A: Multiple Choice (20 marks)
20 MCQs covering macroeconomics and global economy. Each worth 1 mark.
Topics: government objectives, GDP, inflation, unemployment, balance of payments, fiscal policy, monetary policy, supply-side policies, international trade, exchange rates, globalisation, development.

## Section B: Data Response (30 marks)
One compulsory data response question with economic data/extracts.
Questions build from 2m definitions to 8m evaluate.

## Section C: Extended Writing (30 marks)
Choose ONE from TWO extended writing questions.
Topics must be within Edexcel IGCSE Paper 2 specification: government objectives & indicators, fiscal & monetary policy, supply-side policies, international trade, exchange rates, globalisation.`,
    "full": `FULL PAPER covering BOTH Paper 1 and Paper 2 Edexcel IGCSE Economics topics · 80 marks total.
## Section A: Multiple Choice (20 marks)
20 MCQs spanning both micro and macro IGCSE Economics topics.

## Section B: Data Response (30 marks)
Compulsory data response with extracts covering both micro and macro themes.

## Section C: Extended Writing (30 marks)
Choose ONE from TWO extended writing questions covering synoptic micro + macro content.`,
  };

  return `You are an expert Edexcel International GCSE Economics (4EC1) chief examiner.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${templates[paperNum]}

CRITICAL RULES:
1. Follow the template structure EXACTLY
2. This is an IGCSE (International GCSE) paper · use international examples and contexts where appropriate
3. Questions must be IGCSE level · accessible but rigorous, NOT A-Level difficulty
4. Include at least 2 data extracts with tables/figures containing specific numerical data
5. 8-mark questions require balanced analysis with evaluation
6. Use Edexcel IGCSE command words: "Define", "State", "Explain", "Analyse", "Discuss", "Evaluate"
7. All content must be within the Edexcel IGCSE Economics (4EC1) specification · do NOT include A-Level content

SPECIFICATION SCOPE (4EC1):
Paper 1 topics: The economic problem, demand & supply, price determination, elasticity (PED, PES), market failure, government intervention, business costs/revenue/profit, economies of scale, market structures (competitive vs monopoly), labour market, wage determination, minimum wage, trade unions.
Paper 2 topics: Government objectives (growth, employment, inflation, balance of payments), GDP measurement, fiscal policy, monetary policy, supply-side policies, international trade, comparative advantage, protectionism (tariffs, quotas), exchange rates (floating, fixed, appreciation, depreciation), globalisation, economic development.

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01 [1 marks], Question 02 [2 marks], Question 03 [4 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- MCQ options on separate lines: - A, - B, - C, - D
- WRONG: **Question 1** text [2], Question 1 text (2 marks)
- CORRECT: Question 01 [1 marks] What is meant by the term "opportunity cost"?
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: describe with structured text (axes, curves, key points)`;
};
const IB_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "3" : paperValue.includes("1") ? "1" : "2";

  const templates: Record<string, string> = {
    "1": `PAPER 1: Extended Response · SL: 1h15m, HL: 1h30m, 25 marks (SL) / 40 marks (HL)
## Part (a) [10 marks] · Explain
Using economic theory and real-world examples, explain [microeconomic/macroeconomic concept].
Requires definitions, diagrams, and chains of reasoning.

## Part (b) [15 marks] · Evaluate (SL: 15m, HL: 15m)
"Evaluate the view that..." / "Discuss whether..." / "To what extent..."
Requires: definitions (2), diagrams (1-2), real-world examples (2+), evaluation with counter-arguments, and a reasoned conclusion.

STRUCTURE:
- Choose ONE question from a choice of THREE. Each question is from a DIFFERENT syllabus unit.
- Each question has Part (a) and Part (b).
- HL candidates also answer a THIRD part: Part (c) [10 marks] · deeper analysis with HL extension content.
- Syllabus units: Unit 1 (Intro to Economics), Unit 2 (Microeconomics), Unit 3 (Macroeconomics), Unit 4 (The Global Economy).`,
    "2": `PAPER 2: Data Response · SL: 1h45m, HL: 1h45m, 40 marks
## Question structure (choose ONE from TWO):
Each question provides:
- A real-world text extract (200-400 words) with economic data
- Supporting data (table/chart with specific figures)

Sub-questions:
Question 01a [2 marks] · Define a key term from the text
Question 01b [2 marks] · Define another key term from the text  
Question 01c [4 marks] · Using an economic diagram, explain...
Question 01d [4 marks] · Using the text/data, explain...
Question 01e [4 marks] · Using an economic diagram, explain...
Question 01f [8 marks] · Using information from the text/data AND your knowledge of economics, discuss/evaluate...

HL ADDITIONAL (if HL):
Question 01g [4 marks] · Calculate/analyse using quantitative data
Question 01h [6 marks] · Evaluate with HL extension theory

Topics span: micro, macro, international trade, development.`,
    "3": `PAPER 3: HL Extension Paper · 1h45m, 60 marks (HL ONLY)
## Question structure (answer TWO from THREE):
Each question provides a brief scenario/context (2-3 sentences).

Sub-questions per question:
Question 01a [2 marks] · Define a key economic term
Question 01b [4 marks] · Using a diagram, explain...
Question 01c [4 marks] · Calculate (using given data: elasticity, multiplier, tariff effects, etc.)
Question 01d [4 marks] · Using a diagram, explain a policy/theory
Question 01e [6 marks] · Using your knowledge of economics, explain the likely consequences...
Question 01f [10 marks] · "Evaluate..." / "Discuss..." / "To what extent..."

HL-ONLY TOPICS to include: theory of the firm (revenue/cost curves), market power, asymmetric information, terms of trade, economic integration, fiscal/monetary effectiveness, Keynesian vs monetarist, market-based vs interventionist strategies for development.`,
  };

  return `You are an expert IB Economics examiner trained on every IB Economics paper from 2020–2024 (both SL and HL, Papers 1, 2, and 3).

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${templates[paperNum]}

CRITICAL RULES:
1. Follow the IB Economics template structure EXACTLY · NOT AQA or any other board
2. Use real-world examples and data from 2023-2025
3. Paper 1: Essay-based, Part (a) = explain, Part (b) = evaluate with criteria
4. Paper 2: Data response with extracts containing specific numerical data
5. Paper 3 (HL only): Includes calculations (elasticity, multiplier, tariffs, terms of trade)
6. Diagrams must be appropriate IB style (S&D, AD/AS, cost curves, Lorenz curve, J-curve, etc.)
7. Use IB command words: "Define", "Explain", "Analyse", "Evaluate", "Discuss", "To what extent", "Compare and contrast"
8. 10+ mark questions require: definitions, diagrams, real-world examples, stakeholder perspectives, and a reasoned conclusion

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01a [10 marks], Question 01b [15 marks], Question 02a [2 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- WRONG: **Question 1** text [2], Question 1 text (2 marks)
- CORRECT: Question 01a [10 marks] Using economic theory, explain how...
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: structured text with axes, curves, equilibrium points`;
};

const WJEC_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "full" : paperValue.includes("1") ? "1" : "2";

  const templates: Record<string, string> = {
    "1": `UNIT 1: Introduction to Economics (AS) · 1h30m, 60 marks
## Section A: Data Response (compulsory, 30 marks)
Data stimulus with 1-2 extracts + data table.
Question 01 [2 marks] · Define a key term
Question 02 [2 marks] · State/identify from data
Question 03 [4 marks] · Explain with reference to data
Question 04 [6 marks] · Explain, using a diagram
Question 05 [8 marks] · Analyse with data application
Question 06 [8 marks] · Evaluate/Discuss

## Section B: Essay (choose ONE from TWO, 30 marks)
Question 07 [12 marks] · "Explain..." / "Analyse..."
Question 08 [18 marks] · "Evaluate..." / "Discuss..." / "To what extent..."

Topics: market mechanisms, demand & supply, elasticity, market failure, externalities, public goods, government intervention.`,
    "2": `UNIT 2: Economics in Action (AS) · 1h30m, 60 marks
Same structure as Unit 1 but MACRO topics:
Section A: Data response (30 marks) with macroeconomic data
Section B: Essay choice (30 marks) · 12m + 18m

Topics: economic indicators, AD/AS, economic growth, unemployment, inflation, fiscal policy, monetary policy, supply-side policies, balance of payments.`,
    "full": `UNITS 3 & 4: A2 Applied Economics · 2 hours, 80 marks
## Section A: Data Response (compulsory, 40 marks)
Extended case study with 3-4 extracts covering both micro and macro themes.
Question 01 [2 marks] · Define
Question 02 [4 marks] · Explain
Question 03 [6 marks] · Analyse with diagram
Question 04 [8 marks] · Assess/Evaluate
Question 05 [20 marks] · Extended evaluation essay

## Section B: Essay (choose ONE from THREE, 40 marks)
Question 06/07/08 [40 marks] · Full essay with analysis and evaluation, requiring synoptic micro+macro links.
Two-part structure: Part (a) [16 marks] explain/analyse + Part (b) [24 marks] evaluate.

Topics: market structures, labour markets, income distribution, trade, globalisation, development, macro policy effectiveness.`,
  };

  return `You are an expert WJEC A-Level Economics examiner trained on WJEC Economics papers.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${templates[paperNum]}

CRITICAL RULES:
1. Follow the WJEC template structure EXACTLY · NOT AQA format
2. WJEC uses Units (not Papers): Unit 1 = AS micro, Unit 2 = AS macro, Units 3/4 = A2
3. Section A data response is compulsory; Section B is essay choice
4. Use realistic Welsh/UK economic data and examples where appropriate
5. 6-mark questions must require a labelled diagram
6. 18+ mark questions require evaluation with counter-arguments and reasoned judgement
7. Use WJEC command words: "Define", "Explain", "Analyse", "Evaluate", "Discuss", "To what extent"

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks.
- The question text MUST appear AFTER the [Y marks] tag
- CORRECT: Question 01 [2 marks] Define the term "market failure".
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: structured text with axes, curves, equilibrium points`;
};

const EDUQAS_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "3" : paperValue.includes("1") ? "1" : "2";

  const templates: Record<string, string> = {
    "1": `COMPONENT 1: Markets and Market Failure · 2 hours, 80 marks
## Section A: Data Response (compulsory, 40 marks)
Case study with 2-3 extracts + data figures.
Question 01 [2 marks] · Define
Question 02 [4 marks] · Explain with reference to data
Question 03 [6 marks] · Explain using a diagram
Question 04 [8 marks] · Analyse
Question 05 [20 marks] · "Evaluate..." / "To what extent..."

## Section B: Essay (choose ONE from THREE, 40 marks)
Each essay has two parts:
Part (a) [16 marks] · Explain/Analyse
Part (b) [24 marks] · Evaluate with counter-arguments and judgement

Topics: demand & supply, elasticity, market failure, externalities, public goods, merit goods, government intervention, market structures.`,
    "2": `COMPONENT 2: National and International Economy · 2 hours, 80 marks
Same structure as Component 1 but MACRO topics:
Section A: Data response (40 marks) with macro data (GDP, inflation, trade)
Section B: Essay choice (40 marks) · two-part essay

Topics: economic growth, unemployment, inflation, AD/AS, fiscal policy, monetary policy, supply-side policies, international trade, exchange rates, balance of payments, globalisation, development.`,
    "3": `COMPONENT 3: Synoptic Data Response · 2h15m, 80 marks
SYNOPTIC PAPER · draws on BOTH micro AND macro content.
## Section A: Data Response (compulsory, 40 marks)
Extended case study with 3-4 extracts combining micro and macro themes.
Question 01 [2 marks] · Define
Question 02 [4 marks] · Explain
Question 03 [8 marks] · Analyse with diagram
Question 04 [26 marks] · Extended evaluation requiring synoptic links

## Section B: Essay (choose ONE from TWO, 40 marks)
Question 05/06 [40 marks] · Synoptic essay with two parts:
Part (a) [16 marks] · Analyse
Part (b) [24 marks] · Evaluate

Each essay MUST require links between micro and macro concepts.`,
  };

  return `You are an expert Eduqas A-Level Economics examiner.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${templates[paperNum]}

CRITICAL RULES:
1. Follow the Eduqas template structure EXACTLY · NOT AQA or WJEC format
2. Eduqas uses Components (not Papers): Component 1 = micro, Component 2 = macro, Component 3 = synoptic
3. Section A is compulsory data response; Section B is essay choice
4. Use realistic UK/Welsh economic data and examples
5. 6-mark questions must require a labelled diagram
6. 20+ mark questions require sustained evaluation with counter-arguments
7. Use Eduqas command words: "Define", "Explain", "Analyse", "Evaluate", "Discuss", "To what extent"
8. Component 3 questions MUST explicitly link micro and macro concepts

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks.
- The question text MUST appear AFTER the [Y marks] tag
- CORRECT: Question 01 [2 marks] Define the term "opportunity cost".
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: structured text with axes, curves, equilibrium points`;
};

const OCR_GCSE_ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "full" : paperValue.includes("1") ? "1" : "2";

  const templates: Record<string, string> = {
    "1": `COMPONENT 1: Introduction to Economics (J205/01) · 1h15m, 60 marks
## Section A: Multiple Choice (15 marks)
15 MCQs (1 mark each, A/B/C/D). Mix of recall, application, and data interpretation.
Topics: scarcity, opportunity cost, specialisation, demand & supply, PED, market failure, government intervention.

## Section B: Short Answer and Data Response (25 marks)
2-3 structured questions with sub-parts.
Questions: 1m state → 2m explain → 4m analyse → 6m explain with diagram

## Section C: Extended Response (20 marks)
Choose ONE from TWO extended writing questions.
Question has two parts:
Part (a) [8 marks] · Explain/Analyse
Part (b) [12 marks] · "Evaluate..." / "Discuss..."

Topics: the role of markets, demand & supply, elasticity, market failure, externalities, government intervention.`,
    "2": `COMPONENT 2: National and International Economics (J205/02) · 1h15m, 60 marks
Same structure as Component 1 but MACRO topics:
Section A: 15 MCQs (15 marks)
Section B: Short answer and data response (25 marks) with macro data
Section C: Extended response choice (20 marks)

Topics: economic growth, unemployment, inflation, fiscal policy, monetary policy, international trade, globalisation, exchange rates.`,
    "full": `FULL PAPER covering BOTH Components · 60 marks total.
Section A: 15 MCQs spanning micro and macro (15 marks)
Section B: Structured questions with data (25 marks)
Section C: Extended response (20 marks)`,
  };

  return `You are an expert OCR GCSE Economics (J205) chief examiner.

Generate a COMPLETE predicted exam paper for ${paperLabel}.

${templates[paperNum]}

CRITICAL RULES:
1. Follow the OCR GCSE template structure EXACTLY · this is GCSE level, NOT A-Level
2. This is OCR J205, NOT OCR H460 (A-Level) · keep difficulty appropriate for GCSE students
3. Total marks: 60 per component (NOT 80)
4. Duration: 1h15m per component (NOT 2 hours)
5. Questions must be accessible for GCSE students aged 15-16
6. Include at least 2 data extracts with tables/figures
7. 6-mark questions require some analysis and evaluation
8. 12-mark questions require balanced evaluation with counter-arguments
9. Use OCR GCSE command words: "Define", "State", "Describe", "Explain", "Analyse", "Evaluate", "Discuss"
10. MCQ options must have plausible distractors

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks.
- The question text MUST appear AFTER the [Y marks] tag
- MCQ options on separate lines: - A, - B, - C, - D
- CORRECT: Question 01 [1 marks] What is meant by the term "scarcity"?
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: structured text with axes, curves, key points`;
};

const ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "3" : paperValue.includes("1") ? "1" : "2";
  const knowledgeGraphSection = generateKnowledgeGraphPrompt(paperNum);
  const isSynopticPaper = paperNum === "3";

  const paper1Template = `PAPER 1 TEMPLATE · Markets and Market Failure (7136/1):
EXACT STRUCTURE (copy this layout precisely):

## Section A
Answer EITHER Context 1 OR Context 2.

### EITHER
### Context 1
Total for this context: 40 marks
[Title: a topical micro/market failure theme e.g. "The market for university accommodation"]

Study Extracts A, B and C and then answer all parts of Context 1 which follow.

#### Extract A: [A data table with real-world statistics · 3-6 rows, 4-6 columns, with a Source line]
#### Figure 1: [A chart/graph described with specific data points so questions can reference it]
#### Extract B: [2-3 paragraphs of real-world context, 150-200 words, with Source line. Do NOT include line numbers or line references.]
#### Extract C: [2-3 paragraphs discussing policies/solutions, 150-200 words, with Source line. Do NOT include line numbers or line references.]

Question 01 [2 marks] · a calculation using data from Extract A
Question 02 [4 marks] · "Explain how the data in Extract A show that..." (data interpretation)
Question 03 [9 marks] · "With the help of a diagram, explain..." (reference Extract B/C content directly, require a labelled diagram + applied analysis)
Question 04 [25 marks] · "Using the data in the extracts and your knowledge of economics, discuss/evaluate..." (reference Extract C content directly, deep evaluation with counter-arguments)

### OR
### Context 2
Total for this context: 40 marks
[Title: a different topical micro/market failure theme]

[Same structure: Extract D (table), Figure 2 (chart), Extract E (context), Extract F (policies)]
Question 05 [2 marks]
Question 06 [4 marks]
Question 07 [9 marks]
Question 08 [25 marks]

## Section B
Answer ONE essay from this section. Each essay carries 40 marks TOTAL, split into TWO compulsory parts: a 15-mark "Explain/Analyse" part FOLLOWED BY a 25-mark "Evaluate" part. You MUST output BOTH parts for every essay choice. NEVER collapse the essay into a single 25-mark or 40-mark question · that is incorrect AQA format.

### EITHER
### Essay 1
[Context paragraph: 3-4 sentences of real-world background]
Question 09 [15 marks] · "Explain..." (analyse/apply)
Question 10 [25 marks] · "Evaluate the view that..." / "Assess whether..."

### OR
### Essay 2
[Context paragraph]
Question 11 [15 marks] · "Explain..."
Question 12 [25 marks] · "Evaluate..."

### OR
### Essay 3
[Context paragraph]
Question 13 [15 marks] · "Explain..."
Question 14 [25 marks] · "Evaluate..."

CRITICAL: Section B MUST contain exactly SIX questions (09, 10, 11, 12, 13, 14) · three essay choices, each with a 15-mark part AND a 25-mark part. Total Section B = 40 marks (student answers ONE pair: 15 + 25).`;

  const paper2Template = `PAPER 2 TEMPLATE · National and International Economy (7136/2):
EXACT STRUCTURE (identical to Paper 1 but with MACRO topics):

## Section A
Answer EITHER Context 1 OR Context 2.

### EITHER
### Context 1
Total for this context: 40 marks
[Title: a topical macro theme e.g. "Productivity and living standards"]

Study Extracts A, B and C and then answer all parts of Context 1 which follow.

#### Extract A: [A data table comparing countries/years · GDP, inflation, trade, etc.]
#### Extract B: [2-3 paragraphs of macroeconomic context, with Source]
#### Extract C: [2-3 paragraphs discussing macro policies, with Source]

Question 01 [2 marks] · calculation from Extract A
Question 02 [4 marks] · "Explain how the data in Extract A show that..."
Question 03 [9 marks] · "With the help of a diagram, explain..." (AD/AS, Phillips curve, etc.)
Question 04 [25 marks] · "Using the data... assess/discuss/evaluate..."

### OR
### Context 2
Total for this context: 40 marks
[Different macro theme]
[Same structure with Extracts D, E, F + Questions 05-08]

## Section B
Answer ONE essay from this section. Each essay carries 40 marks TOTAL, split into TWO compulsory parts: a 15-mark "Explain/Analyse" part FOLLOWED BY a 25-mark "Evaluate" part. You MUST output BOTH parts for every essay choice. NEVER collapse the essay into a single 25-mark or 40-mark question · that is incorrect AQA format.

### Essay 1
Question 09 [15 marks] · Explain (macro analysis)
Question 10 [25 marks] · Evaluate/Assess/Discuss

### Essay 2
Question 11 [15 marks] · Explain
Question 12 [25 marks] · Evaluate

### Essay 3
Question 13 [15 marks] · Explain
Question 14 [25 marks] · Evaluate

CRITICAL: Section B MUST contain exactly SIX questions (09, 10, 11, 12, 13, 14) · three essay choices, each with a 15-mark part AND a 25-mark part. Total Section B = 40 marks (student answers ONE pair: 15 + 25).`;

  const paper3Template = `PAPER 3 TEMPLATE · Economic Principles and Issues (7136/3):
EXACT STRUCTURE:

## Section A
Answer all questions in this section.
Only one answer per question is allowed.

30 multiple-choice questions, each worth 1 mark.
Label them Question 01 through Question 30.
Each must have EXACTLY 4 options: A, B, C, D.

MCQ REQUIREMENTS:
- Mix micro AND macro topics (synoptic paper)
- At least 8 MCQs must require calculation or data interpretation (tables, figures, index numbers)
- At least 5 MCQs must include a table or figure with specific numerical data
- Include MCQs on: market structures, elasticity, costs/revenue, labour markets, AD/AS, fiscal/monetary policy, trade, exchange rates, development
- Difficulty must match June 2024 Paper 3 · NOT easy recall questions

DIAGRAM-BASED MCQ REQUIREMENTS (CRITICAL · match AQA June 2024 Paper 3 Q10, Q11 style):
- At least 6 MCQs MUST include a "Figure X" diagram described in detail
- Diagram MCQ examples to follow:
  1. Joint supply / competitive demand: "Figure X shows how the markets for Good X and Good Y are affected by [change]. It can be concluded that Good X and Good Y are in: A competitive demand, B composite demand, C derived demand, D joint supply." Include TWO side-by-side S&D diagrams showing shifts with labelled P₁, P₂, Q₁, Q₂ and equilibrium points.
  2. Cost/revenue curves: "Figure X shows the short-run average costs (AC), marginal costs (MC), average revenue (AR) and marginal revenue (MR) curves for a typical firm in a [market structure]. In the long run, market forces are most likely to cause the firm's revenue curves to: A shift left and become flatter, B shift left and become steeper, C shift right and become flatter, D shift right and become steeper."
  3. AD/AS diagrams: "Figure X shows the economy at equilibrium Y₁. A decrease in [variable] would shift: A AD left, B AD right, C SRAS left, D SRAS right."
  4. PPF diagrams: "Figure X shows a production possibility frontier. A movement from point X to point Y represents: A economic growth, B opportunity cost, C productive efficiency, D allocative efficiency."
  5. Lorenz curve / Gini coefficient: "Figure X shows Lorenz curves for Country A and Country B. Which is true? A Country A has greater equality, B Country B has a lower Gini coefficient, ..."
  6. Labour market diagrams: "Figure X shows the labour market for [industry]. The introduction of a minimum wage at W₂ would result in: A excess demand for labour, B excess supply of labour, ..."
- Each diagram MCQ must describe the diagram using markdown text (axis labels, curve names, key points, equilibrium positions) so the student can visualise it
- Format diagram descriptions as: "**Figure X:** [Diagram description with axes, curves, points labelled]"
- Place the Figure description BEFORE the question text

## Section B
Total for this Investigation: 50 marks

### INVESTIGATION
### Scenario
[You are an economist working for... 2-3 sentences setting up the investigation context]

Referring to the Insert, study Extracts A, B and C, then use these and your knowledge of economics to help answer Questions 31 and 32. There is also a news report, Extract D, which is to be used with the other extracts to help answer Question 33.

#### Extract A: [Data table with regional/national comparison data]
#### Extract B: [Chart/figure with specific data points]
#### Extract C: [2-3 paragraphs of context, with Source]
#### Extract D: [News report, 2-3 paragraphs, with Source]

Question 31 [10 marks] · "To what extent, if at all, do the data suggest that..." (data analysis + evaluation)
Question 32 [15 marks] · "Explain why/how..." (applied analysis using extracts)
Question 33 [25 marks] · "After considering Extract D, and the original evidence... would you recommend that... Justify your recommendation." (full evaluation + justified recommendation)`;

  const structureTemplate = paperValue === "full"
    ? paper3Template
    : paperNum === "2" ? paper2Template : paper1Template;

  return `You are an expert AQA A-Level Economics chief examiner. You have written and moderated EVERY AQA A-Level Economics paper from 2017 to 2024 (Papers 1, 2, and 3). You know the exact format, register, difficulty level, and marking expectations intimately.

Generate a COMPLETE, FULL-LENGTH predicted exam paper for ${paperLabel}.

${ECONOMICS_PAST_PAPER_KNOWLEDGE}

${knowledgeGraphSection}

${structureTemplate}

CRITICAL RULES:
1. Follow the template EXACTLY · same section structure, same question numbering, same mark allocations
2. Extracts must be 150-250 words each, written in formal news/academic register with realistic 2023-2025 UK/global data
3. Tables must contain specific numerical data (GDP figures, percentages, prices, indices) so calculation questions are answerable
4. Every "line X" reference in a question must match an actual quote in the extract

DIAGRAM QUESTION REQUIREMENTS (NON-NEGOTIABLE):
1. EVERY 9-mark question MUST begin with "Using a diagram" or "With the help of a diagram" · this is mandatory per AQA specification
2. 9-mark diagram questions follow the KAA marking pattern: Knowledge 1-2, Application 1-2, Analysis 3-5
3. MANDATORY 5-MARK BOTH-CURVES-SHIFT QUESTION (AQA June 2024 Q6a pattern):
   - You MUST include at least ONE question in this EXACT format:
   "Use a demand and supply diagram to explain the impact on price and quantity, of the changes in demand and supply of [specific market from Extract/Figure]. (Figure X and Extract Y)."
   - Mark scheme for this 5-mark pattern:
     Knowledge/understanding: 1 mark · accurate supply and demand diagram with labels and original equilibrium (E₁). (1)
     Application: 1 mark · for identifying that demand and supply in the [specific market] have both [increased/decreased/one each]. (1)
     Analysis: Up to 3 marks, 1 for each of the following:
     • Supply curve shifts rightwards S₁ to S₂. (1)
     • Demand curve shifts rightwards D₁ to D₂. (1)
     • There is a new equilibrium showing [lower/higher] price and [increased/decreased] quantity E₂. (1)
   - The context MUST reference specific Figures and Extracts from the paper
4. For other S&D diagram questions (single-curve shift, 9-mark):
   - "Using a supply and demand diagram, explain the likely effect of [policy/change] on the market for [good/service]."
   - KAA: Knowledge 1, Application 1, Analysis up to 3-5
5. Each Paper 1 MUST include: 1 both-curves-shift 5-mark question (Q6a pattern), 1 externality/welfare loss 9-mark diagram question
6. Each Paper 2 MUST include at least: 1 AD/AS diagram question, and reference Phillips Curve or Keynesian AS where relevant
7. Paper 3 Section B MUST include at least one question requiring diagram analysis
8. Diagram questions must specify which Figure/Extract to reference

DIFFICULTY GUARDRAILS (MATCH JUNE 2024 STANDARD):
1. 2-mark questions: precise calculation or definition · NOT easy recall
2. 4-mark questions: "Explain how the data show..." · requires data interpretation + economic reasoning
3. 9-mark questions: MUST require a labelled diagram + contextual chain of reasoning + application to the extract
4. 15-mark questions: sustained explanation with at least 2 developed chains of analysis
5. 25-mark questions: MUST include counter-arguments, "it depends on" factors, conditional judgement, synoptic links

HOTS REQUIREMENTS (NON-NEGOTIABLE):
- At least 40% of marks target Analyse/Evaluate (Bloom's taxonomy levels 4-6)
- Every 25-mark essay requires genuine evaluation, not description
- Use precise command words: "Evaluate the view that", "Assess whether", "Discuss", "To what extent"

OUTPUT FORMAT (CRITICAL · the parser depends on this exact format):
- Use markdown headings (## for sections, ### for contexts/essays, #### for extracts)
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01 [2 marks], Question 02 [4 marks], Question 03 [9 marks], Question 09 [15 marks], Question 10 [25 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks. Do NOT put marks at the end of the line.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- MCQ options on separate lines starting with "- A", "- B", "- C", "- D"
- Do NOT include solutions or mark schemes
- WRONG: **Question 1** (2 marks), 01. Calculate... [2 marks], Q1 [2 marks]
- CORRECT: Question 01 [2 marks] Calculate the percentage change...

FIGURE/CHART/GRAPH FORMAT (CRITICAL · DO NOT USE ASCII ART):
- NEVER draw charts, graphs, or diagrams using ASCII characters (|, /, \\, -, +, ^, X, etc.)
- For DATA figures (Extract A tables, bar charts, line graphs, scatter plots): present data in a **markdown table** with clear column headers. Add a "**Figure N:**" or "**Extract A:**" title above.
- For DIAGRAM figures (S&D, AD/AS, PPF, cost curves, Lorenz curves, labour markets): describe them in structured text using a "**Figure N:**" heading followed by bullet points listing axes, curves, key points, equilibrium positions, and shifts.
- Example data figure:
  **Figure 1:** Average Purchase Price of New BEVs (constant 2023 prices, £000s)
  | Year | Price (£000s) |
  |------|--------------|
  | 2020 | 50 |
  | 2021 | 45 |
  Source: ONS, 2024
- Example diagram figure:
  **Figure 2:** Demand and Supply in the UK Housing Market
  - Vertical axis: Price (£000s)
  - Horizontal axis: Quantity of Houses (units)
  - D₁ slopes downward; S₁ slopes upward
  - Equilibrium at intersection: P₁, Q₁
  Source: Hypothetical, 2024`;
};

const CHEM_PAPER_PROMPT = (paperLabel: string, tier: "Foundation" | "Higher") => {
  const tierDesc = tier === "Foundation"
    ? "Foundation tier (grades 1–5). Avoid higher-only content like moles calculations, titration calculations, and rate tangent method. Focus on recall, description, and simple application. All questions must be accessible with straightforward language."
    : "Higher tier (grades 4–9). Include moles calculations, concentration, titration with Table of results (rough + 3 concordant readings, one anomalous), rate tangent method, atom economy, percentage yield, empirical formula, strong vs weak acids, and Le Chatelier's principle.";
  
  const paperTopics = paperLabel.includes("1")
    ? `Paper 1 covers Topics 1–5:
- Topic 1: Atomic structure, isotopes, RAM calculation, electronic configuration, periodic table development (Dalton→Thomson→Rutherford→Bohr→Chadwick), Group 1 trends, Group 7 trends, Group 0 properties
- Topic 2: Ionic bonding (dot-and-cross for MgO, NaCl, MgCl₂), covalent bonding (H₂O, NH₃, CH₄, HCl), metallic bonding, giant covalent structures (diamond vs graphite · 6-mark comparison), graphene, fullerenes, nanoparticles, simple molecular substances, polymers
- Topic 3 (Higher): Moles = mass÷Mr, concentration = moles÷volume, titration calculations with Table data, atom economy, percentage yield, empirical formula from % composition, volume of gas at RTP (moles × 24 dm³)
- Topic 4: Reactivity series with bar chart data, displacement reactions, ionic equations, electrolysis (half equations for molten PbBr₂, brine, CuSO₄), metal extraction, acids + metals/bases/carbonates, strong vs weak acids, Required Practical: electrolysis
- Topic 5: Reaction profiles with numerical values (Ea, ΔH), bond energy calculations with Figure/Table (MUST include one with unknown bond energy to back-calculate), Q=mcΔT calculations, exo vs endothermic, hydrogen fuel cells, Required Practical: temperature changes`
    : `Paper 2 covers Topics 6–10:
- Topic 6: Rate graphs (volume vs time with specific coordinates), tangent method for rate at a point (Higher), collision theory for T/concentration/surface area/catalyst, comparing two rate curves on same axes, reversible reactions, dynamic equilibrium, Le Chatelier's principle, Haber process graph (% yield vs pressure at 3 temperatures), Required Practical: rate of reaction
- Topic 7: Alkanes (CₙH₂ₙ₊₂) and alkenes (CₙH₂ₙ), displayed formulae, complete/incomplete combustion, cracking, bromine water test, polymerisation (addition + condensation for Higher), alcohols and carboxylic acids (Higher), fermentation vs hydration
- Topic 8: Chromatography with Rf calculation (EVERY paper), flame tests (Li=crimson, Na=yellow, K=lilac, Ca=orange-red, Cu=green), NaOH precipitate tests (Cu²⁺=blue, Fe²⁺=green, Fe³⁺=brown, Al³⁺=white dissolves in excess), gas tests (H₂, O₂, CO₂, Cl₂), Required Practicals: chromatography, ion tests
- Topic 9: Evolution of atmosphere (stacked area graph), greenhouse effect, enhanced greenhouse effect, carbon footprint, human activities increasing CO₂
- Topic 10: Potable water treatment, desalination, life cycle assessment with Table comparing materials, reduce/reuse/recycle, corrosion, alloys, ceramics, polymers, composites`;

  return `You are an expert AQA GCSE Chemistry chief examiner. You have been trained on EVERY AQA GCSE Chemistry paper from 2018 to 2024 (both Foundation and Higher, Papers 1 and 2), plus the Specimen paper.

Generate a COMPLETE, REALISTIC predicted exam paper for ${paperLabel}.

${CHEMISTRY_PAST_PAPER_KNOWLEDGE}

TIER: ${tierDesc}

SPECIFIC TOPICS FOR THIS PAPER:
${paperTopics}

STRUCTURE (match real AQA papers EXACTLY):
- Total: 100 marks
- Section A: 15 multiple-choice questions (1 mark each, A/B/C/D options). MCQs must test recall AND application · not just definitions. Include at least 3 MCQs that require calculation or interpretation.
- Section B: Structured questions (~85 marks), numbered sequentially after MCQs
- Multi-part questions use (a), (b), (c) labelling
- Include AT LEAST ONE 6-mark extended response question using Level of Response marking
- Include AT LEAST ONE Required Practical context question

GRAPH/DIAGRAM/FIGURE/TABLE REQUIREMENTS (MANDATORY · at least 8 per paper):
1. At least ONE reaction profile with specific numerical energy values
2. At least ONE data Table (titration results OR experimental data OR bond energies)
3. At least ONE rate graph with specific (time, volume) coordinate pairs
4. At least ONE dot-and-cross diagram question
5. At least ONE bar chart or pie chart with numerical data
6. At least ONE chromatogram with distances for Rf calculation (Paper 2 only)
7. For Higher: at least ONE bond energy calculation with Figure showing displayed formula + Table of bond energies (Paper 1 only)
8. For Higher: at least ONE Haber process yield graph with 3 temperature curves (Paper 2 only)

ALL graphs/figures MUST include specific numerical data points so the question is fully answerable from text.

IMPORTANT FORMATTING · FOLLOW EXACTLY:
Question 1 [1 marks]
Question 2 [2 marks]
Question 3a [1 marks]
Question 3b [3 marks]

Do NOT wrap question headers in bold/asterisks. Include balanced equations with state symbols throughout. Use correct IUPAC naming. Use **Figure N** and **Table N** headings for all visual data.

FIGURE/CHART/GRAPH FORMAT (CRITICAL · DO NOT USE ASCII ART):
- NEVER draw charts, graphs, or diagrams using ASCII characters (|, /, \\, -, +, ^, X, etc.)
- For DATA (tables, bar charts, rate graphs, titration results): use **markdown tables** with clear column headers
- For DIAGRAMS (reaction profiles, dot-and-cross, rate curves): describe in structured text with bullet points for axes, curves, energy values, and key points
- Example: **Figure 1:** Rate of Reaction Graph
  | Time (s) | Volume of gas (cm³) |
  |----------|-------------------|
  | 0 | 0 |
  | 10 | 25 |
  | 20 | 40 |
  | 30 | 48 |
  | 40 | 50 |
  | 50 | 50 |

FIRST PRINCIPLES: Generate questions from first principles of chemistry, not by copying. Each question should test genuine understanding. Create novel scenarios that mirror real exam difficulty and style.`;
};

/* ── Difficulty modifiers injected into AI prompt ── */
const DIFFICULTY_PROMPT_MODIFIERS: Record<string, string> = {
  moderate: `
DIFFICULTY LEVEL: MODERATE
- Exam-realistic difficulty matching the average real paper.
- Questions should be accessible with clear command words.
- Data response extracts should use straightforward data.
- Essay/evaluation questions should expect standard-depth analysis.
- Great for confidence-building and consolidating core knowledge.`,
  hard: `
DIFFICULTY LEVEL: HARD
- Application-heavy questions requiring deeper analysis and evaluation.
- Data extracts should include more complex, multi-variable data requiring interpretation.
- At least 50% of marks must target Analyse/Evaluate (Bloom's 4-6).
- Essay/evaluation questions must expect nuanced counter-arguments.
- Extracts should cover less common topics or unusual real-world scenarios.
- Calculation questions should require multi-step reasoning.`,
  "very-hard": `
DIFFICULTY LEVEL: VERY HARD
- Top-grade difficulty designed for A*/A students aiming for the highest marks.
- Extended reasoning, sophisticated counter-arguments, and reasoned judgement required throughout.
- Data extracts must include complex, ambiguous data that could support multiple interpretations.
- At least 60% of marks must target Analyse/Evaluate (Bloom's 5-6).
- Questions should require synoptic links across multiple topics.
- Calculation questions must require creative multi-step reasoning.
- Essay questions must demand nuanced evaluation with "it depends on" factors and justified conclusions.`,
  "limited-edition": `
DIFFICULTY LEVEL: LIMITED EDITION (ELITE CHALLENGE)
- This is the most original, demanding, and high-value predicted paper available.
- Questions must go BEYOND typical exam difficulty · designed to stretch even the strongest students.
- Use novel, topical, and unexpected real-world scenarios (2024-2025 cutting-edge issues).
- Evaluation questions must demand sophisticated analysis with multiple competing perspectives.
- At least 70% of marks must target Analyse/Evaluate (Bloom's 5-6).
- Include at least one question that combines concepts from 3+ topic areas.
- Data should be complex, requiring students to identify trends, anomalies, and draw nuanced conclusions.
- This paper should feel exclusive and premium · the hardest paper a student has ever attempted.`,
};

export default function PredictedPapers() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const canGenerate = canGeneratePapers(user?.email);
  const isPremium = hasPremiumAccess({ subscribed, email: user?.email });
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [mode, setMode] = useState<"library" | "generate">("library");
  const [paper, setPaper] = useState("1");
  const [tier, setTier] = useState<"Foundation" | "Higher">("Higher");
  const [topicScope, setTopicScope] = useState<"full" | "year1" | "year1+2" | "custom">("full");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<"select" | "paper">("select");
  const [libraryDifficulty, setLibraryDifficulty] = useState<string | null>(null);
  const [librarySet, setLibrarySet] = useState<string | null>(null);

  const [selectedLibraryPaper, setSelectedLibraryPaper] = useState<PredictedPaper | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [showRefSheet, setShowRefSheet] = useState(false);
  const [paperContext, setPaperContext] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, QuestionFeedback>>({});
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [examActive, setExamActive] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const markAllRef = useRef(false);
  const autoGenTriggered = useRef(false);
  const [solutionLoading, setSolutionLoading] = useState(false);
  const [solutionProgress, setSolutionProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });

  const used = (profile as any)?.free_predicted_papers_used ?? 0;
  const canUse = isPremium || used < FREE_LIMITS.predictedPapers;
  const remaining = FREE_LIMITS.predictedPapers - used;

  const paperOptions = paperOptionsBySubject[subject];
  const isMaths = false;
  const isChemistry = false;
  const isEconomics = subject === "economics";
  const isEdexcelA = subject === "edexcel-a";
  const isEdexcelB = subject === "edexcel-b";
  const isOCR = subject === "ocr";
  const isCambridge = subject === "cambridge";
  const isGCSE = subject === "aqa-gcse";
  const isIGCSE = subject === "cambridge-igcse";
  const isEdexcelIGCSE = subject === "edexcel-igcse";
  const isOcrGcse = subject === "ocr-gcse";
  const isIB = subject === "ib";
  const isAnyIGCSEorGCSE = isGCSE || isIGCSE || isEdexcelIGCSE || isOcrGcse || isIB;
  const isAnyEcon = true;

  const examDuration = useMemo(() => {
    const subjectDurations = EXAM_DURATIONS[subject] || EXAM_DURATIONS.economics;
    return subjectDurations[paper] || 120;
  }, [subject, paper]);

  const handleExamTimeUp = useCallback(() => {
    setTimeExpired(true);
    setExamActive(false);
    setExamFinished(true);
  }, []);

  const handleStartExam = useCallback(() => {
    setExamActive(true);
    setExamFinished(false);
    setTimeExpired(false);
  }, []);

  const libraryPapers = useMemo(
    () => {
      const setLabel = (title: string) => {
        const m = title.match(/Set\s+([A-Z])/i);
        return m ? m[1].toUpperCase() : "Z";
      };
      // Product rule: every board exposes exactly Sets A/B/C × Papers 1/2/3 = 9 papers.
      // AQA A-Level is exempt · it ships with 7 sets per paper (A–G) and that
      // extended library must NOT be reduced.
      const isAqa = subject === "economics";
      const allowedSets = new Set(["A", "B", "C"]);
      const allowedPapers = new Set(["1", "2", "3"]);
      const filtered = predictedPapersLibrary.filter((p) => {
        if (p.subject !== subject) return false;
        if (isAqa) return true;
        // Every non-AQA board: exactly Papers 1/2/3 × Sets A/B/C = 9 cards.
        if (!allowedPapers.has(p.paper) && !p.paper.startsWith("as-")) return false;
        return allowedSets.has(setLabel(p.title));
      });
      return [...filtered].sort((a, b) => {
        // AQA AS papers (paper id "as-1", "as-2") sort AFTER A-Level Papers 1/2/3.
        const asWeight = (p: PredictedPaper) => (p.paper.startsWith("as-") ? 1000 : 0);
        const wa = asWeight(a), wb = asWeight(b);
        if (wa !== wb) return wa - wb;
        const numOf = (p: PredictedPaper) =>
          p.paper.startsWith("as-") ? (parseInt(p.paper.slice(3), 10) || 0) : (parseInt(p.paper, 10) || 0);
        const pa = numOf(a), pb = numOf(b);
        if (pa !== pb) return pa - pb;
        return setLabel(a.title).localeCompare(setLabel(b.title));
      });
    },
    [subject]
  );

  useEffect(() => { reset(); }, [subject]);

  /* ── Auto-generate from Paper Library link ── */
  useEffect(() => {
    const fromLibrary = searchParams.get("fromLibrary");
    const paramPaper = searchParams.get("paper");
    const paramDifficulty = searchParams.get("difficulty");
    const paramSet = searchParams.get("set");
    const paramPaperId = searchParams.get("paperId");

    if (fromLibrary !== "1" || !paramPaper || autoGenTriggered.current) return;

    autoGenTriggered.current = true;
    setPaper(paramPaper);

    const targetSetLabel = paramSet ? `Set ${String.fromCharCode(64 + Number(paramSet))}` : null;
    const exactLibraryPaper = predictedPapersLibrary.find((candidate) => {
      if (candidate.subject !== subject) return false;
      if (candidate.paper !== paramPaper) return false;
      if (paramPaperId) return candidate.id === paramPaperId;
      if (targetSetLabel && !candidate.title.includes(targetSetLabel)) return false;
      return true;
    });

    setSearchParams({}, { replace: true });

    if (exactLibraryPaper) {
      setMode("library");
      openLibraryPaper(exactLibraryPaper);
      return;
    }

    if (paramDifficulty) setLibraryDifficulty(paramDifficulty);
    setLibrarySet(paramSet);
    if (!canGenerate) {
      setMode("library");
      return;
    }
    setMode("generate");

    setTimeout(() => {
      const genBtn = document.querySelector<HTMLButtonElement>('[data-auto-generate]');
      if (genBtn) genBtn.click();
    }, 300);
  }, [searchParams, subject]);

  const isValidAqaPaperStructure = (questions: ParsedQuestion[], paperNumber?: string) => {
    if (subject !== "economics") return true;
    if (paperNumber === "1" || paperNumber === "2") {
      // AQA A-Level Paper 1 & 2 (7136/1, 7136/2). Two accepted shapes:
      //  • Legacy 6Q: Section A (2+4+9+25) + Section B (15+25) = 80 marks.
      //  • Full 14Q: Section A EITHER/OR contexts (2+4+9+25)×2 + Section B
      //    choose ONE of three essays (15+25)×3 = 14 questions, 160 nominal
      //    marks (student answers half · 80 marks scored).
      const legacy = [2, 4, 9, 25, 15, 25];
      const full = [2, 4, 9, 25, 2, 4, 9, 25, 15, 25, 15, 25, 15, 25];
      const matches = (req: number[]) =>
        questions.length === req.length && questions.every((q, i) => q.marks === req[i]);
      return matches(legacy) || matches(full);
    }
    if (paperNumber === "3") {
      // AQA A-Level Paper 3 (7136/3): 30 × 1-mark MCQs + 10/15/25 case study = 80 marks, 33 questions.
      if (questions.length !== 33) return false;
      for (let i = 0; i < 30; i++) if (questions[i].marks !== 1) return false;
      return questions[30].marks === 10 && questions[31].marks === 15 && questions[32].marks === 25;
    }
    return true;
  };

  function applyAqaDiagramTags(
    questions: ParsedQuestion[],
    paperNumber?: string,
    setLabel?: string,
  ): ParsedQuestion[] {
    if (subject !== "economics") return questions;
    // AQA-specific diagram tagger · do not apply to other boards (OCR, Edexcel, WJEC, etc.)
    if (!/aqa/i.test(examBoard || "")) return questions;
    const paperNum = inferPaperFromContext(paperNumber ?? paper);
    return questions.map((q) => {
      const isMcq = !!q.mcqOptions && q.mcqOptions.length >= 2;
      const tag = tagAqaQuestion({
        number: q.number ?? "",
        marks: q.marks,
        text: q.text,
        isMcq,
        paper: paperNum,
        setLabel,
      });
      if (import.meta.env.DEV) {
        console.info("[solution-pipeline] tag", {
          label: q.label,
          number: q.number,
          marks: q.marks,
          paper: paperNum,
          explicitStem: q.text.slice(0, 160),
          requiresDiagram: !!tag?.requiresDiagram,
          optional: !!tag?.optional,
          diagramType: tag?.diagramType ?? null,
          referenceFigureId: tag?.referenceFigureId ?? null,
          referenceFigureMissing: tag?.referenceFigureMissing ?? null,
        });
      }
      if (!tag) return q;
      return {
        ...q,
        requiresDiagram: tag.requiresDiagram,
        diagramOptional: tag.optional,
        diagramType: tag.diagramType,
        diagramRubric: tag.rubric,
        referenceFigureId: tag.referenceFigureId,
        referenceFigureScenario: tag.referenceFigureScenario,
        referenceFigureMissing: tag.referenceFigureMissing,
      };
    });
  }

  function parsePredictedPaperContent(rawContent: string, paperNumber?: string) {
    const parsed = parseQuestions(rawContent);

    if (subject === "economics" && !isValidAqaPaperStructure(parsed.questions, paperNumber)) {
      const expected =
        paperNumber === "3"
          ? "30 × 1-mark MCQs + 10/15/25"
          : "2/4/9/25 + 15/25";
      toast.error(`AQA Paper ${paperNumber} must follow the ${expected} marking pattern. This paper was rejected.`);
      return null;
    }

    return { ...parsed, questions: applyAqaDiagramTags(parsed.questions, paperNumber) };
  }

  function openLibraryPaper(lp: PredictedPaper) {
    if (isPremiumPredictedPaper(lp) && !isPremium) {
      setShowUpgrade(true);
      return;
    }
    // AQA AS Paper 1: ship as static PDF booklets — open the QP in a new tab
    // and trigger a download for the mark scheme so the student has both.
    if (lp.paper.startsWith("as-")) {
      const qp = resolveStaticPaperPdf(lp.id, "paper");
      const ms = resolveStaticPaperPdf(lp.id, "mark-scheme");
      if (qp) {
        window.open(qp.url, "_blank", "noopener,noreferrer");
        if (ms) {
          triggerStaticPdfDownload(ms);
          toast.success("Question paper opened. Mark scheme downloaded.", { duration: 5000 });
        } else {
          toast.success("Question paper opened in a new tab.");
        }
      } else {
        toast.error("PDF not available for this paper yet.");
      }
      return;
    }
    const setLabel = (lp.id.match(/-([a-g])$/i)?.[1] ?? "A").toUpperCase();
    // For AQA A-Level Paper 3, prefer the curated override that wires every
    // diagram MCQ to a real /figures asset (Monopolistic Competition, J-Curve,
    // Ad Valorem vs Specific Tax, Lorenz/Gini, PED Revenue Impact, Negative
    // Externality · palm oil). Falls back to the library prose if no override.
    const overrideContent =
      subject === "economics" && lp.paper === "3"
        ? getAqaPaper3OverrideContent(lp.id)
        : null;
    const sourceContent = overrideContent ?? lp.content;
    const baseParsed = parseQuestions(sourceContent);
    if (subject === "economics" && !isValidAqaPaperStructure(baseParsed.questions, lp.paper)) {
      const expected = lp.paper === "3" ? "30 × 1-mark MCQs + 10/15/25" : "2/4/9/25 + 15/25";
      toast.error(`AQA Paper ${lp.paper} must follow the ${expected} marking pattern.`);
      return;
    }
    const questions = applyAqaDiagramTags(baseParsed.questions, lp.paper, setLabel);
    setSelectedLibraryPaper(lp);
    setPaperContext(baseParsed.context);
    setParsedQuestions(questions);
    setAnswers({});
    setFeedbacks({});
    setMarkingId(null);
    setStep("paper");
  }

  const generatePaper = async () => {
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    setIsGenerating(true);
    setGeneratedPaper("");
    setSelectedLibraryPaper(null);
    let result = "";

    const selectedPaper = paperOptions.find((p) => p.value === paper);
    const paperLabel = selectedPaper ? `${selectedPaper.label}: ${selectedPaper.title}` : `Paper ${paper}`;
    const isCalc = paper !== "1";

    let dbContextPrompt = "";
    if (isAnyEcon) {
      try {
        const { data: patternData } = await supabase.functions.invoke("retrieve-patterns", {
          body: { paper, subject: isEdexcelA ? "edexcel-a" : isEdexcelB ? "edexcel-b" : isOCR ? "ocr_economics" : isCambridge ? "cambridge" : isGCSE ? "aqa-gcse" : isIGCSE ? "cambridge-igcse" : isEdexcelIGCSE ? "edexcel-igcse" : isOcrGcse ? "ocr_gcse" : isIB ? "ib_economics" : subject === "wjec" ? "wjec" : subject === "eduqas" ? "eduqas" : "economics", limit: 250 },
        });
        if (patternData?.contextPrompt) {
          dbContextPrompt = patternData.contextPrompt;
        }
      } catch (e) {
        console.warn("Failed to fetch patterns from DB, using static patterns:", e);
      }
    }

    const basePrompt = isMaths
      ? MATHS_PAPER_PROMPT(paperLabel, isCalc, tier)
      : isChemistry
      ? CHEM_PAPER_PROMPT(paperLabel, tier)
      : (isEdexcelA || isEdexcelB)
      ? EDEXCEL_ECON_PAPER_PROMPT(paperLabel, subject as "edexcel-a" | "edexcel-b", paper)
      : isOCR
      ? OCR_ECON_PAPER_PROMPT(paperLabel, paper)
      : isCambridge
      ? CAIE_ECON_PAPER_PROMPT(paperLabel, paper)
      : isGCSE
      ? GCSE_ECON_PAPER_PROMPT(paperLabel, paper)
      : isIGCSE
      ? IGCSE_ECON_PAPER_PROMPT(paperLabel, paper)
      : isEdexcelIGCSE
      ? EDEXCEL_IGCSE_ECON_PAPER_PROMPT(paperLabel, paper)
      : subject === "ib"
      ? IB_ECON_PAPER_PROMPT(paperLabel, paper)
      : subject === "wjec"
      ? WJEC_ECON_PAPER_PROMPT(paperLabel, paper)
      : subject === "eduqas"
      ? EDUQAS_ECON_PAPER_PROMPT(paperLabel, paper)
      : isOcrGcse
      ? OCR_GCSE_ECON_PAPER_PROMPT(paperLabel, paper)
      : ECON_PAPER_PROMPT(paperLabel, paper);

    const scopeInstruction = topicScope === "year1"
      ? "\n\nIMPORTANT: Only use Year 1 (AS) topics. For AQA: microeconomics topics only (markets, market failure, government intervention). Do NOT include macroeconomics, trade, or Year 2 content."
      : topicScope === "year1+2"
      ? "\n\nUse the FULL specification · both Year 1 and Year 2 topics (micro + macro, including trade, development, and synoptic links)."
      : topicScope === "custom" && selectedTopics.length > 0
      ? `\n\nCUSTOM TOPIC SELECTION: The student has specifically chosen these topics. ONLY generate questions on these topics: ${selectedTopics.join(", ")}. Do NOT include questions on any other topics. Distribute marks evenly across the selected topics. Maintain the same exam structure and question types, but restrict content to the chosen topics only.`
      : "";

    const ECON_DIAGRAM_FAMILY_RULES = `

DIAGRAM FAMILY RULES (CRITICAL · include in every diagram block):
When describing a diagram in a Figure block or in a model answer, you MUST include a "Diagram family" field that maps to a canonical diagram type. This ensures the app renders the correct interactive template.

Use EXACTLY one of these canonical family IDs:
- supply-demand, demand-increase, demand-decrease, supply-increase, supply-decrease
- indirect-tax, subsidy, price-floor, price-ceiling
- negative-externality-production, negative-externality-consumption, positive-externality-production, positive-externality-consumption
- tax-externality, subsidy-externality, pollution-permits
- adas-ad-shift, adas-ad-shift-left, adas-sras-shift, adas-sras-shift-right, lras-shift
- keynesian-as, multiplier-effect, crowding-out, laffer-curve
- monopoly-profit, perfect-competition, monopolistic-competition, kinked-demand, natural-monopoly
- cost-curves, labour-market, monopsony-labour, business-objectives, price-discrimination
- exchange-rate-demand, exchange-rate-supply, j-curve, tariff-welfare, import-quota, comparative-advantage
- ppf, ppf-growth, lorenz-curve, srpc
- demand-shift-dual, supply-shift-dual

Example Figure format:
**Figure 2:** Supply and Demand in the UK Coffee Market
- Diagram family: supply-decrease
- Vertical axis: Price (P)
- Horizontal axis: Quantity (Q)
- D₁ slopes downward; S₁ slopes upward
- Equilibrium at E₁: P₁, Q₁
- S₁ shifts left to S₂ due to rising input costs
- New equilibrium at E₂: P₂ (higher), Q₂ (lower)
Source: Hypothetical, 2024

Every diagram block MUST include "Diagram family: <family-id>" on its own line.

CRITICAL: Do NOT place economics diagram Figure blocks (supply & demand, AD/AS, externality, etc.) inside Extract or context sections. Diagram Figures belong ONLY inside or after questions that explicitly ask students to "draw", "sketch", or "use a diagram". Extract sections should contain ONLY text passages, data tables, and statistical charts · never theoretical economics diagrams.`;

    const econDiagramAppendix = isAnyEcon ? ECON_DIAGRAM_FAMILY_RULES : "";
    const difficultyModifier = libraryDifficulty && DIFFICULTY_PROMPT_MODIFIERS[libraryDifficulty]
      ? DIFFICULTY_PROMPT_MODIFIERS[libraryDifficulty]
      : "";

    const setLabel = librarySet ? `\n\nPAPER SET: Set ${String.fromCharCode(64 + Number(librarySet))}. Generate a UNIQUE paper · do not repeat questions from other sets. Use a different theme/context for each set.` : "";

    const prompt = dbContextPrompt
      ? `${basePrompt}\n\n${dbContextPrompt}${scopeInstruction}${econDiagramAppendix}${difficultyModifier}${setLabel}\n\nMANDATORY QUALITY CHECK BEFORE FINAL OUTPUT: ensure the paper is full-length, exam-authentic, and matches the exact format, mark allocations, and difficulty level of recent ${examBoard} ${level} papers. If any question feels too easy or uses the wrong structure, rewrite it before finishing.`
      : `${basePrompt}${scopeInstruction}${econDiagramAppendix}${difficultyModifier}${setLabel}`;

    await streamChat({
      messages: [{ role: "user", content: prompt }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setGeneratedPaper(result); },
      onDone: () => {
        setIsGenerating(false);
        const parsed = parsePredictedPaperContent(result, paper);
        if (!parsed) return;
        setPaperContext(parsed.context);
        setParsedQuestions(parsed.questions);
        setStep("paper");
      },
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const markQuestion = useCallback(
    async (question: ParsedQuestion, diagramImage?: string) => {
      if (!isPremium) {
        setShowUpgrade(true);
        return;
      }
      const answer = answers[question.id];
      if (!answer?.trim()) { toast.error("Please write your answer first."); return; }
      setMarkingId(question.id);

      // Resolve the EXPECTED diagram from the question (and its context) only — NOT the
      // student's answer. A correct answer's incidental wording (e.g. mentioning "tax"
      // many times in a minimum-wage essay) was hijacking the diagram type, producing an
      // indirect-tax diagram instead of the price-floor/minimum-wage one the question needs.
      const expectedDiagramType = resolveDiagramType(`${question.label}\n${question.text}\n${paperContext}`) ?? "supply_demand";

      // Predicted papers · load the verbatim board mark scheme parsed from
      // the official Download Solution PDF so the AI grades against the
      // exact answer key for every supported board (AQA, Edexcel A/B, OCR,
      // IB, CIE, WJEC, Eduqas + GCSE/IGCSE variants).
      const verbatimMarkScheme =
        (isOCR ? getOcrPredictedMarkScheme(selectedLibraryPaper?.id) : null) ??
        (await loadPredictedMarkScheme(selectedLibraryPaper?.id));
      const boardMarkSchemeBlock = verbatimMarkScheme
        ? `\n\n═══ OFFICIAL ${examBoard.toUpperCase()} ${level.toUpperCase()} MARK SCHEME (verbatim from the Download Solution PDF) ═══\nYou MUST mark this answer strictly against the official mark scheme below. Locate the entry that matches the question label "${question.label}" (e.g. "1 (a)", "Question 33", "Section B Question 2*") and apply its indicative content, accepted answers, level descriptors and guidance EXACTLY. For level-of-response questions use the board's verbatim Level/band descriptors. Do NOT invent your own marks; reward only points listed (or clearly equivalent valid alternatives) in the mark scheme. For numerical questions, the correct answer and accepted tolerance are stated · apply them strictly. For diagram questions, use the diagram requirements stated in the mark scheme to award diagram marks. If the mark scheme is silent on this exact sub-question, fall back to the board's standard rubric.\n\n--- BEGIN MARK SCHEME ---\n${verbatimMarkScheme}\n--- END MARK SCHEME ---\n`
        : "";


      const markingPrompt = isMaths
        ? `You are marking an Edexcel GCSE Maths (${tier} tier) answer.

Here is the context from the paper:
${paperContext}

Here is the question:
${question.label} [${question.marks} marks]
${question.text}

Here is the student's answer:
${answer}

Mark this answer using Edexcel mark scheme criteria. Award marks using:
- **M marks** (method) · for correct approach/strategy
- **A marks** (accuracy) · for correct answers following correct method
- **B marks** (independent) · for correct results independent of method

If this is a graph/diagram question, explicitly mark:
- axis labels + units
- sensible scales
- correct plotted points/curve shape/gradient features
- correct final reading or conclusion
Use any student graph notes/diagram notes in their answer as marking evidence.

You MUST respond in this EXACT structure:

## Mark Scheme
Give a mark out of ${question.marks}. List each M/A/B mark and whether it was awarded. If a mark was lost, explain exactly why. Use "you" and "your" · speak directly to the student.

## Model Answer
Write a full model answer that would score ${question.marks}/${question.marks}. Show ALL working step by step. For graph/diagram questions, include a concise Figure-style description of what should be drawn.

## Examiner Tip
Give 2–3 specific, actionable tips. Mention common mistakes to avoid. Address the student directly.`
        : isChemistry
        ? `You are marking an AQA GCSE Chemistry (${tier} tier) answer.

Here is the context from the paper:
${paperContext}

Here is the question:
${question.label} [${question.marks} marks]
${question.text}

Here is the student's answer:
${answer}

Mark this answer using AQA GCSE Chemistry mark scheme criteria. Award marks using:
- **AO1** (Knowledge and understanding) · recall of facts, formulae, definitions
- **AO2** (Application) · applying knowledge to familiar and unfamiliar contexts
- **AO3** (Analysis and evaluation) · interpreting data, drawing conclusions

For 6-mark questions, use Level of Response marking (Level 1: 1-2, Level 2: 3-4, Level 3: 5-6).
Check: balanced equations, state symbols, correct formulae, units, significant figures.

If this is a graph/image/diagram question, explicitly mark:
- axis labels + units
- labelled curves/peaks/arrows and what they represent
- correct values read from figure/table data
- correct calculation chain from that data
Use any student diagram notes or graph notes in their answer as valid evidence.

You MUST respond in this EXACT structure:

## Mark Scheme
Give a mark out of ${question.marks}. List each mark point and whether it was awarded. If a mark was lost, explain exactly why. Check for correct chemical notation, balanced equations, state symbols, and figure/table interpretation. Use "you" and "your" · speak directly to the student.

## Model Answer
Write a full model answer that would score ${question.marks}/${question.marks}. Include balanced equations with state symbols, correct units, and full working for any calculations. For graph/diagram/image questions, include a clear Figure/Table-style description of the expected labels and values.

## Examiner Tip
Give 2–3 specific, actionable tips. Mention common mistakes (e.g., forgetting state symbols, not balancing equations, missing units, misreading graph axes). Address the student directly.`
        : (() => {
          // Detect if this is a diagram question
          const qTextLower = question.text.toLowerCase();
          const isDiagramQ = /\b(diagram|draw|sketch)\b/i.test(qTextLower) && /\b(with the (help|aid) of|using|draw|sketch)\b/i.test(qTextLower);

          if (isDiagramQ) {
            // Smart Mark format for diagram questions (matches DiagramPractice)
            return `You are marking a diagram-based Economics answer for ${examBoard} ${level}.

Here is the context from the paper:
${paperContext}

Here is the question:
${question.label} [${question.marks} marks]
${question.text}

Here is the student's answer:
${answer}

You MUST evaluate using ALL 5 diagram marking criteria:

1. **AXES** · Are axes labelled correctly? (e.g., Price/P on Y-axis, Quantity/Q on X-axis; for macro: Price Level & Real GDP)
2. **CURVE DIRECTION** · Are curves sloping the correct way? (Demand downward, Supply upward, LRAS vertical, etc.)
3. **SHIFT DIRECTION** · Does the described shift match the scenario? (Right = increase, Left = decrease)
4. **EQUILIBRIUM** · Is original equilibrium (P1,Q1) marked? Is new equilibrium (P2,Q2) identified with dotted lines?
5. **EXPLANATION ↔ DIAGRAM CONSISTENCY** · Does the written answer match what the diagram shows?

DIAGRAM-TYPE EQUIVALENCE (do NOT penalise for terminology):
- A "supply and demand diagram showing an indirect tax / sugar tax / SDIL / VAT" is the SAME diagram as an "indirect tax", "tax incidence" or "tax on a demerit good" diagram. All require: D, S, S+tax (shifted up by the per-unit tax), original eq (P,Q), new eq (P₁,Q₁), producer price Pₚ on the original S, and (where marks allow) tax-revenue rectangle and welfare-loss triangle.
- Do NOT mark down a student for calling it a "supply and demand diagram" when the question asks for one · that is the correct generic name. Reward whichever of the components above are present and accurately drawn.
- Specific (per-unit) tax → parallel upward shift of S. Ad valorem (% of price) tax → pivoted shift from price-axis intercept. Either is acceptable for a generic "indirect tax" question unless the question explicitly specifies one.

Use any "[DIAGRAM:" notes or "[DIAGRAM NOTES]" blocks in the student's answer as evidence of their diagram work.

You MUST structure your response using EXACTLY these section headers (the app parses them):

## Your mark: X/${question.marks}

State the mark awarded clearly.

## Smart Mark feedback

Give the main feedback summary in 2-3 sentences. Be direct and specific about what the student got right or wrong. Use bullet points for key corrections with **bold** for important terms.

## Explain my feedback

Provide a detailed breakdown of each of the 5 marking criteria. Use tick ✓ or cross ✗ for each:
- **Axes**: ✓/✗ · detail
- **Curve direction**: ✓/✗ · detail
- **Shift direction**: ✓/✗ · detail
- **Equilibrium**: ✓/✗ · detail
- **Explanation-diagram consistency**: ✓/✗ · detail

## Improve my answer

Give specific, actionable steps to improve. Include:
- What to add or correct in the diagram
- How to strengthen the written explanation
- A memory trick or exam technique tip
- You MUST include exactly ONE structured diagram block with this exact keyword (do not use placeholders):

### Diagram: ${expectedDiagramType}
- **X-axis**: [label]
- **Y-axis**: [label]
- **Initial curves**: [describe D1, S1 etc.]
- **Initial equilibrium**: [P1, Q1]
- **Shift**: [which curve shifts which direction, e.g. "Supply shifts left from S1 to S2"]
- **New equilibrium**: [P2, Q2 and direction of change]
- **Key conclusion**: [one sentence summary]

Then provide a model written explanation that would score full marks.

Speak directly to the student using "you" and "your". Be encouraging but honest.`;
          }

          // ─── Edexcel B (9EB0) · point-based for 4/6, level-based for 8/10/12/20 ───
          if (isEdexcelB) {
            const m = question.marks;
            const isPointBased = m === 4 || m === 6;
            const skillAlloc =
              m === 4  ? "Knowledge/understanding 1, Application 2, Analysis 1, Evaluation 0" :
              m === 6  ? "Knowledge/understanding 2, Application 2, Analysis 2, Evaluation 0" :
              m === 8  ? "Knowledge/understanding 2, Application 2, Analysis 2, Evaluation 2" :
              m === 10 ? "Knowledge/understanding 2, Application 2, Analysis 3, Evaluation 3" :
              m === 12 ? "Knowledge/understanding 2, Application 2, Analysis 4, Evaluation 4" :
              m === 20 ? "Knowledge/understanding 4, Application 4, Analysis 6, Evaluation 6" :
              `Knowledge/understanding, Application, Analysis${m >= 8 ? ", Evaluation" : ""} (allocate proportionally to ${m} marks)`;

            const levelTable8 = `Level 0 (0): completely inaccurate.
Level 1 (1–2): isolated K&U; little/no relevant evidence; reasoning attempted; limited address of question.
Level 2 (3–5): some K&U with limited evidence; chains of reasoning developed; judgements may be attempted.
Level 3 (6–8): accurate K&U supported by well-chosen evidence; logical, coherent chains of reasoning; balanced awareness of competing arguments.`;

            const levelTable10 = `Level 0 (0): completely inaccurate.
Level 1 (1–2): isolated K&U; little/no evidence; reasoning attempted; limited address of question.
Level 2 (3–4): some K&U with limited evidence; chains of reasoning presented but limited; comparisons/judgements attempted.
Level 3 (5–7): accurate K&U with relevant evidence; clear chains of reasoning; awareness of competing arguments though may lack balance.
Level 4 (8–10): accurate K&U fully supported by well-chosen evidence; logical, coherent reasoning; arguments developed AND evaluated; full balanced awareness of competing arguments.`;

            const levelTable12 = `Level 0 (0): completely inaccurate.
Level 1 (1–2): isolated K&U; little/no evidence; reasoning attempted; limited address of question.
Level 2 (3–5): some K&U with limited evidence; reasoning presented but limited; comparisons/judgements attempted.
Level 3 (6–9): accurate K&U with relevant evidence; clear chains of reasoning; awareness of competing arguments though may lack balance.
Level 4 (10–12): accurate K&U fully supported by well-chosen evidence; logical reasoning; arguments developed AND evaluated; full balanced awareness of competing arguments.`;

            const levelTable20 = `Level 0 (0): completely inaccurate.
Level 1 (1–4): isolated K&U; little/no evidence; reasoning fails to connect cause and consequence; limited address of question.
Level 2 (5–9): some K&U with limited evidence; reasoning presented but cause–consequence links incomplete; comparisons/judgements unsupported or generic.
Level 3 (10–15): accurate K&U with relevant evidence; developed reasoning showing cause–consequence links; competing arguments present though may lack balance.
Level 4 (16–20): accurate K&U fully integrated with well-chosen evidence; well-developed, logical, coherent reasoning; arguments fully developed AND evaluated; nuanced and balanced comparisons/judgements/conclusions.`;

            const levelTable =
              m === 8  ? levelTable8 :
              m === 10 ? levelTable10 :
              m === 12 ? levelTable12 :
              m === 20 ? levelTable20 : "";

            return `You are a senior Pearson Edexcel B A-Level Economics (9EB0) examiner marking a candidate's response strictly against the official Edexcel B mark scheme conventions.

PAPER CONTEXT (extracts/figures the question may reference):
${paperContext}

QUESTION:
${question.label} [${question.marks} marks]
${question.text}

STUDENT'S ANSWER:
${answer}

═══ EDEXCEL B MARKING RULES (DO NOT DEVIATE) ═══
- This is a ${m}-mark question.
- Skill allocation (must sum to ${m}): ${skillAlloc}.
- Use the ${isPointBased ? "POINT-BASED rubric (no level table)" : "LEVEL-BASED rubric (use the verbatim Pearson level descriptors below)"}.
- Edexcel B uses K (Knowledge/understanding), Ap (Application), An (Analysis), Ev (Evaluation). Evaluation is ONLY assessed from 8 marks upward.
- Where the question references stimulus material (extracts/data), the candidate MUST directly reference, interpret or analyse it for AO2 (Application) credit. If they ignore the stimulus, deny Application marks.
- Do NOT use AQA KAA banding. Do NOT invent custom marks/levels.

${isPointBased ? `═══ POINT-BASED MARK SCHEME (${m} marks) ═══
List the specific point(s) earning each mark, broken down by skill:
- Knowledge/understanding (state the formula / definition / concept the student must show)
- Application (state the contextual data point / scenario reference required from the extract)
- Analysis (state the chain of reasoning required)
${m === 4 ? "If this is a calculation question, include an NB note: e.g. award full marks for the correct numerical answer with units even if working is missing; deduct 1 mark for missing units; zero for wrong sign." : ""}` : `═══ LEVEL-BASED MARK SCHEME (${m} marks) ═══
Apply the verbatim Pearson level descriptors:

${levelTable}

Then list 4–6 indicative content bullets (accepted analysis points). For 8+ mark questions, include at least 2 evaluation points prefixed with "Evaluation ·".`}

═══ AO2 APPLICATION NOTE (always include verbatim under the level table) ═══
Demonstrating application (AO2): Where questions specifically stipulate the use of data or information provided in a stimulus, students must directly reference, interpret or analyse the information provided in the stimulus; in addition, they may select examples from their own knowledge but these must be relevant and directly connected to the context/issues set out in the stimulus. Where questions do not specifically stipulate the use of data or information provided in a stimulus, students must select relevant examples from their own knowledge, these must be directly connected to the context/issues set out in the question.

You MUST respond in EXACTLY this structure (the app parses these headings):

## Mark Scheme
**Skill allocation:** ${skillAlloc}

${isPointBased
  ? `Then a per-skill breakdown showing exactly how each of the ${m} marks is awarded for THIS student's answer (mark awarded vs. mark lost, with the reason). Use "you" / "your".`
  : `Then state the LEVEL awarded (Level 0–${m === 8 ? "3" : "4"}) and the specific mark within the band (e.g. "Level 2 · 4/${m}"). Justify by quoting the relevant descriptor language and pointing to evidence (or its absence) in the student's answer. Then list the indicative content points the student covered vs. missed. Then include the AO2 application note in italics. Use "you" / "your".`}

## Model Answer
A full top-band response that would score ${m}/${m}. Write in continuous prose as a candidate would, integrating the stimulus where the question requires it. ${m >= 8 ? "Include developed analysis chains AND balanced evaluation with a prioritised judgement." : "Show the formula/working or definition + applied context + clear analytical chain."} If a diagram is required (Q1(e) on Paper 2), describe axes, curves, shifts, equilibria and shaded areas in words.

## Examiner Tip
2–3 short, actionable tips that distinguish a top-band Edexcel B response from a mid-band one for THIS specific question (e.g. "anchor every analytical chain back to a figure from Extract X", "always finish with a prioritised judgement, not a summary"). Address the student directly.`;
          }

          // Standard economics marking prompt
          return `You are marking an AQA A-Level Economics answer using the EXACT AQA mark scheme methodology.

Here is the context from the paper:
${paperContext}

Here is the question:
${question.label} [${question.marks} marks]
${question.text}

Here is my answer:
${answer}

Mark my answer using AQA KAA marking criteria. You MUST respond in this exact structure:

## Mark Scheme
Give me a mark out of ${question.marks}. Use the AQA KAA (Knowledge, Application, Analysis) + Evaluation framework:

${question.marks <= 5 ? `**For this ${question.marks}-mark question, use this breakdown:**
- **Knowledge/understanding:** 1 mark for accurate economic knowledge (correct definitions, correctly drawn and labelled diagram with original equilibrium)
- **Application:** 1 mark for applying to the specific context (identifying the relevant change from the extract/data)
- **Analysis:** Up to ${question.marks - 2} marks, 1 for each of the following analytical points:
  • Correct shift direction with labelled curves (e.g. S₁ to S₂, D₁ to D₂)
  • New equilibrium showing the impact on price and quantity (P₂, Q₂)
  • Chain of reasoning explaining WHY the shift occurs and its consequences
  • Any additional analytical points (e.g. ambiguous outcomes, relative magnitude of shifts)` :
question.marks === 9 ? `**For this 9-mark question, use this breakdown:**
- **Knowledge/understanding:** Up to 2 marks for accurate definitions and correctly drawn diagram
- **Application:** Up to 2 marks for applying theory to the specific context with reference to data/extracts
- **Analysis:** Up to 5 marks for chains of reasoning, diagram explanation, cause→effect→consequence

**DIAGRAM ASSESSMENT (if required by the question):**
Award diagram marks as follows:
- Correctly labelled axes (e.g. Price/Quantity, Price Level/Real GDP) · 1 mark
- Original curves correctly drawn and labelled · 1 mark
- Correct shift direction with new curve labelled · 1 mark
- New equilibrium clearly marked with dashed lines to axes · 1 mark
- Relevant shaded areas correctly identified (welfare loss, surplus, etc.) · 1 mark` :
question.marks === 15 ? `**For this 15-mark question:**
- **KAA (Knowledge, Application, Analysis):** Up to 8 marks
  - Define key terms (1-2 marks)
  - Apply to context with data references (2-3 marks)
  - At least 2 developed chains of analysis (3-4 marks)
- **Evaluation:** Up to 7 marks (if applicable)` :
question.marks === 12 ? `**For this 12-mark "assess" question (mark out of 12):**
- **Analysis (knowledge, application, reasoning):** Up to 8 marks — accurate definitions, application to context, and developed chains of reasoning. NOTE: advantages AND disadvantages both count as ANALYSIS here, not as evaluation.
- **Evaluation:** Up to 4 marks — awarded ONLY for weighing the arguments and reaching a prioritised, justified judgement (see the CAIE evaluation rule below).` :
question.marks === 20 ? `**For this 20-mark "assess" question (mark out of 20):**
- **Analysis (knowledge, application, reasoning):** Up to 12 marks — at least two developed, two-sided chains of reasoning applied to the context.
- **Evaluation:** Up to 8 marks — weighing, prioritisation and a justified judgement (see the CAIE evaluation rule below).` :
`**For this 25-mark question:**
- **KAA (Knowledge, Application, Analysis):** Up to 12 marks
  - Define key terms (1-2 marks)
  - Apply to context using real data (2-3 marks)
  - Analyse with chain of reasoning + diagram (4-5 marks)
  - Develop second chain of reasoning (3-4 marks)
- **Evaluation:** Up to 13 marks
  - Counter-argument with reasoning (3-4 marks)
  - Limitation of main argument (2-3 marks)
  - "It depends on..." factors (2-3 marks)
  - Final judgement with justification (3-4 marks)

**DIAGRAM in 25-mark essays:** If a diagram is used, award up to 4 KAA marks for it: correct axes (1), correct curves (1), correct shift (1), correct analysis of diagram (1).`}
${isCambridge ? `
═══ APPLY CAIE 9708 METHODOLOGY (NOT AQA). Ignore the AQA KAA ladder above and mark as a Cambridge examiner. ═══
Mark strictly out of ${question.marks} — never out of any other total (CAIE questions are 2/4/6/8/12/20, never 25).

THE THREE ASSESSMENT OBJECTIVES (there is NO "AO4" in 9708):
- AO1 Knowledge & understanding — definitions/formulae/concepts AND application to the question's context/data.
- AO2 Analysis — explained cause-and-effect chains. An ASSERTION is not analysis; only an explained mechanism earns AO2.
- AO3 Evaluation — weighing both sides, then a supported, question-focused judgement/conclusion.

DETECT THE TYPE FROM THE ${question.marks}-mark tariff and apply the matching scheme:
${question.marks === 8 ? `• 8-mark essay part (a) — POINT-MARKED with hard sub-caps: AO1 up to 3, AO2 up to 3, AO3 up to 2. 1 mark per accurate definition/formula (AO1), 1 per developed explained factor (AO2, needs ≥3 for full 3), 1 for a judgement of relative importance + 1 for a supported conclusion (AO3). Never exceed a sub-cap.`
: question.marks === 12 ? `• 12-mark essay part (b) — LEVELS-MARKED: Table A (AO1+AO2) out of 8 + Table B (AO3) out of 4. Table A: Level 3 = 6–8, Level 2 = 3–5, Level 1 = 1–2, Level 0 = 0. Table B: Level 2 = 3–4, Level 1 = 1–2, Level 0 = 0.`
: question.marks === 20 ? `• 20-mark essay (A-Level Paper 4) — LEVELS-MARKED: Table A (AO1+AO2) out of 14 + Table B (AO3) out of 6. Table A: Level 3 = 11–14, Level 2 = 6–10, Level 1 = 1–5, Level 0 = 0. Table B: Level 2 = 4–6, Level 1 = 1–3, Level 0 = 0.`
: `• ${question.marks}-mark data-response part — POINT-MARKED; the answer MUST use the stimulus data. Up to (tariff − 2) marks for explained analysis + up to 2 for evaluation; on "assess/discuss/consider" parts ONE mark is RESERVED for a supported conclusion (no conclusion ⇒ that mark cannot be awarded). Evaluation = 0 if one-sided or not in the data's context.`}

TABLE A standard (AO1+AO2): TOP band = detailed accurate knowledge, fully developed explanations, developed & detailed analysis using concepts/theory (and a fully-explained diagram where needed). MIDDLE band = some knowledge, limited development, analysis generally accurate but thin. BOTTOM band = few points, significant errors, little relevance, analysis largely DESCRIPTIVE.
TABLE B standard (AO3): TOP band = a JUSTIFIED conclusion addressing the SPECIFIC question + developed, reasoned, well-supported evaluative comments. BOTTOM band = vague/general conclusion with simple undeveloped comments. No conclusion or no genuine weighing ⇒ 0 for AO3.
BEST-FIT: choose the single best-fit level, then top/middle/bottom of that band by how convincingly it is met.

STRINGENCY RULES (enforce — this is where examiners dock marks):
1. ONE-SIDED answers are CAPPED at mid-Table-A and earn ZERO evaluation. Require genuine two-sided weighing before any AO3 credit.
2. Evaluation must WEIGH, not list. "Adding a however", an unexplained "it depends", summarising, or listing pros/cons in isolation is NOT evaluation. Top AO3 needs the comment to be analytical and to engage the question's exact qualifier ("always"/"only"/"alone"/"best") ending in a supported conclusion.
3. APPLICATION/CONTEXT required — generic, pre-learned answers lose marks; data-response answers ignoring the supplied figures forfeit application AND evaluation marks.
4. RELEVANCE gates the level — off-question / wrong-scenario material earns nothing however accurate; cover all named elements.
5. DIAGRAMS: for the 20-mark Paper 4 essay, if a diagram is REQUIRED, a missing/incorrect/unlabelled diagram CAPS Table A at the MIDDLE band (max 10/14); a correct, labelled, referenced diagram is needed for the top band. For AS Paper 2, a diagram is required only where the question explicitly asks; otherwise credit it where it genuinely aids analysis but do NOT make it a prerequisite.
6. PRECISION — define each key term exactly (elasticity = % change in quantity ÷ % change in price; opportunity cost = next best alternative forgone). Positive marking: never deduct for errors/omissions — penalise by placing the work in a lower band. Whole marks only.

CONCLUSION CHECK (report each): (1) follows from the analysis without contradiction; (2) prioritises/weighs rather than restates; (3) is not mere repetition; (4) a reasoned, qualified "it depends on X" conclusion is FULLY creditable.

REQUIRED OUTPUT — in "## Mark Scheme" you MUST give a PER-AO breakdown using the correct maxima for this ${question.marks}-mark tariff, and for levels-marked parts NAME the table and level:
  - AO1 Knowledge & understanding: X/[max] — what earned / what was missing
  - AO2 Analysis: X/[max] — which explained chains were credited / where it lapsed into assertion (for 12/20-mark parts state "Table A: Level N (X/8 or X/14)")
  - AO3 Evaluation: X/[max] — (for 12/20-mark parts "Table B: Level N (X/4 or X/6)") whether it weighed both sides, engaged the qualifier, and concluded; if 0, say why.
Then sum to the final mark and state explicitly any cap applied (one-sided, or missing required diagram).
` : ""}
${isIGCSE ? `
═══ APPLY CAIE IGCSE 0455 METHODOLOGY (NOT AQA). This is IGCSE, not A-level — mark as a 0455 examiner. ═══
Mark strictly out of ${question.marks}. THREE assessment objectives (NO "AO4"): AO1 Knowledge & understanding
(identify/define terms + use data), AO2 Analysis (developed cause->effect chains; description is NOT analysis),
AO3 Evaluation (genuinely two-sided discussion + a supported judgement). Do not assert AO percentage weightings.

DETECT THE PART FROM THE ${question.marks}-mark tariff + command word:
${question.marks === 1 ? `• 1-mark Calculate — AO2: correct value/magnitude from the data; the currency symbol and exact format are NOT required (accept 0.7bn / 700m / 700,000,000 and reasonable rounding) but a percentage must not be a money amount. Own-figure rule applies.`
: question.marks === 2 ? `• 2-mark Identify/State/Define — AO1, POINT-marked: 1 mark per correct point, NO development rewarded. Partial/incomplete definition = 1/2 (e.g. trade deficit must be financial; supply = willing AND able). Same-category pair scores once. "Consider the first n" — mark only the first two listed. Nothing for a diagram.`
: question.marks === 4 ? `• 4-mark Explain — AO1+AO2, POINT-marked "identify (1) + develop (1)" x2: TWO distinct points, each with an explicit causal link. Identification-only caps at the identification marks (typically 2/4); one developed point when two are required = 2/4; a repeated second point earns nothing. Answer the exact thing asked.`
: question.marks === 5 ? `• 5-mark data Analyse (Q1) — AO2, POINT-marked: state the relationship EXACTLY + supporting data + cause + any exception/anomaly. Transcribing figures without interpretation earns nothing; "proportional"/"indirectly proportional" loses precision where the relationship is merely direct/negative.`
: question.marks === 6 ? `• 6-mark — detect: "Analyse" (AO2) is POINT-marked ~1 mark per developed cause->effect link (one-sided is CORRECT; adding the other side is wasted); "only identifying the reasons" caps at 3/6; with a required diagram split up to 4 diagram + up to 2 analysis. "Discuss whether or not" (AO2+AO3) is POINT-marked up to 4 each side, total 6, EACH SIDE capped at 4 (one-sided = max 4/6); reverse/mirror of a credited point = 0, a different mechanism = 1.`
: question.marks === 8 ? `• 8-mark Discuss/"Do you think" — AO1+AO2+AO3, LEVELS-marked on the verbatim 0455 grid:
   Level 3 (6-8): accurately examines BOTH sides with clear logical analysis AND thoughtful evaluation (one side may be deeper, but both considered and developed; may note uncertainties).
   Level 2 (3-5): reasoned discussion with clear analysis but lacking depth, OR development may be one-sided.
   Level 1 (1-2): a simple attempt at definitions/terminology; points asserted without development.
   Level 0 (0): no creditable content, OR off-question/misread focus.
   Place by best-fit: AO1 only -> L1; clear AO2 analysis -> L2; TWO developed sides + genuine evaluation/judgement -> L3. ONE-SIDED CANNOT EXCEED Level 2 (max 5). Two sides merely asserted = Level 1.`
: `• ${question.marks}-mark part — point-marked: award 1 mark per valid distinct point (identification AO1 / developed analysis AO2 / evaluation AO3); withhold for repetition, no development, off-target, or description-not-analysis.`}

GENERIC PRINCIPLES: POSITIVE marking — never deduct for errors/omissions (place weak work LOW by best-fit); whole marks only; do not credit a key term merely for being named, nor repetition/mirror statements; a conclusion is credited only if it adds a NEW supported judgement. DIAGRAMS are point-marked on additive components (D&S: axes price/quantity + labelled curves + correct shift + both equilibria; PPC: axes = two outputs not price/quantity + curve meeting both axes + new curve + shift); two diagrams = max 3 (lose equilibrium); on a "Draw" command written commentary earns nothing.

REQUIRED OUTPUT — per-part, per-AO (never a holistic mark): in "## Mark Scheme" list each creditable point labelled AO1/AO2/AO3 with 1 mark each up to the tariff, name every REFUSED point with the reason, and for the 8-mark (d) assign the LEVEL by best-fit, place the mark within the band, and state any cap (one-sided -> max Level 2 = 5; off-question -> 0). Then sum to the final mark out of ${question.marks}.
` : ""}
${isOCR ? `
═══ APPLY OCR ECONOMICS METHODOLOGY (NOT AQA). Mark as an OCR examiner using OCR's FOUR AOs. ═══
Mark strictly out of ${question.marks}. AO1 Knowledge & understanding; AO2 Application (genuine USE of the stimulus/named
context — paraphrase or copied figures is NOT application); AO3 Analysis (developed cause->consequence CHAINS, not single
statements); AO4 Evaluation (balanced TWO sides + a SUPPORTED judgement, not a summary). Rate each strand Strong / Good /
Reasonable / Limited: Analysis — Strong = "fully developing the links in the chain", Good = "most of the links", Reasonable
= "omit some key links", Limited = "simple statement(s) of cause and consequence". Evaluation — Strong = "weighs up both
sides AND reaches a supported judgement", Good = "weighs up both sides but no supported judgement", Reasonable = "some
attempt at a conclusion", Limited = "unsupported assertion".

DETECT THE PART FROM THE ${question.marks}-mark tariff + command word:
${question.marks <= 3 ? `• Short answer/define/calculate — POINT-marked (AO1/AO2; calc = AO2). 1 mark per discrete point; a 2-mark definition needs meaning + a developed element. Calculations need correct method + answer + units/sign (%, $, "deficit"); own-figure rule applies and method marks survive a wrong final answer. An answer not addressing the exact thing asked = 0.`
: question.marks <= 6 ? `• Data/diagram part — POINT-marked with a question-specific AO split (e.g. 4-mark data ≈ AO1x1 AO2x3; a 6-mark diagram part ≈ up to 4 diagram + up to 2 explanation). Application needs GENUINE use of the named data; the WRONG diagram type earns 0 diagram marks; diagram marks are itemised per feature (axes/curve/equilibria).`
: question.marks === 8 ? `• 8-mark evaluative — LEVELS: AO1x1 AO2x1 AO3x3 AO4x3. Level 2 = 5-8, Level 1 = 1-4. Level 2 needs developed analysis + two-sided evaluation; reaching a supported judgement pushes to the top of L2.`
: question.marks === 12 ? `• 12-mark evaluative — LEVELS: AO1x1 AO2x1 AO3x5 AO4x5. Level 3 = 9-12, Level 2 = 5-8, Level 1 = 1-4. Top of level needs BOTH stimulus use AND own knowledge; failing to link to the stimulus caps analysis at Limited (comprehension).`
: question.marks === 15 ? `• 15-mark synoptic data essay — LEVELS: AO1x2 AO2x3 AO3x4 AO4x6. Level 3 = 11-15, Level 2 = 6-10, Level 1 = 1-5. DIAGRAM HARD GATE where "using an appropriate diagram(s)" is stated: no diagram is unlikely to exceed Level 1.`
: question.marks === 25 ? `• 25-mark essay — LEVELS: AO1x6 AO2x6 AO3x6 AO4x7. FIVE levels: L5 21-25 (Strong on all strands + supported judgement; integrated correct diagram), L4 16-20 (Strong analysis + two-sided evaluation but NO supported judgement), L3 11-15 (Good analysis + Reasonable evaluation), L2 6-10 (single-link analysis), L1 1-5 (little/no analysis). Section B essays REQUIRE a diagram; Section C do not but credit one that lifts analysis.`
: `• ${question.marks}-mark — if extended/"evaluate", mark by OCR levels (Strong/Good/Reasonable/Limited on the three strands); otherwise point-mark 1 per valid point by AO. State the level and within-level position.`}

THE GATES (where OCR marks are won/lost — check each): CONTEXT (analysis cannot be Strong / a 25-marker cannot be full without applying to the specific context — the #1 reason for 24/25); SUPPORTED-JUDGEMENT (top band needs a justified "depends on / which side wins and why", NOT a summary); NO-SKIP (evaluation must reach Good two-sided weighing BEFORE a judgement makes it Strong); DIAGRAM (required diagram must be correct type + labelled with equilibria + INTEGRATED/referred-to; "see diagram"/numbering it caps analysis at Reasonable); FOCUS (address the exact object/agent/qualifier — off-question earns nothing however accurate); ONE-SIDED (cannot reach evaluation top bands); COMPREHENSION (paraphrasing the stimulus = K&U only, capped Limited analysis).

GENERIC: POSITIVE marking — credit valid unexpected approaches; never deduct for digressions (they earn nothing) or negatively-mark a later slip; own-figure rule; whole marks; within a level award top if it consistently meets the criteria, the default mid-mark if squarely in the band, bottom if borderline.

REQUIRED OUTPUT — per-AO/per-strand (never a holistic mark): in "## Mark Scheme", for POINT-marked parts list each point with its AO and tick/cross + reasons for refused marks; for LEVELS-marked parts give a THREE-STRAND verdict (K&U+Application [AO1+AO2], Analysis [AO3], Evaluation [AO4]) each rated Strong/Good/Reasonable/Limited with a one-line reason, then the NAMED LEVEL with its mark range, the within-level position, and the mark. State PASS/FAIL for each applicable gate, then one "why not higher" sentence. Sum to the final mark out of ${question.marks}.
` : ""}
${isOcrGcse ? `
═══ APPLY OCR GCSE (9-1) ECONOMICS J205 METHODOLOGY (NOT AQA, NOT A-level). Mark as an OCR GCSE examiner. ═══
Mark strictly out of ${question.marks}. THREE AOs (NO AO4; analysis & evaluation are COMBINED in AO3): AO1 Knowledge &
understanding; AO2 Application (genuine USE of the scenario/extract data — generic theory with no scenario use is not
application); AO3 = AO3a Analysis (developed cause->effect CHAINS, not single effects) + AO3b Evaluation (weigh BOTH
sides + a SUPPORTED judgement). The largest tariff in J205 is 6 marks — there is NO Level 4 and no essay.

DETECT THE PART FROM THE ${question.marks}-mark tariff + command word:
${question.marks <= 2 ? `• 1-2 mark State/Give/Define/Explain/Calculate/Draw — POINT-marked, a SINGLE AO. State/Give/Define = AO1 (a 2-mark definition splits into named components; partial = 1/2; an effect given instead of a definition = 0). Explain = AO1b or AO2 (identify (1) + develop (1); identification alone or out-of-context = 1). Calculate = AO2 (show working; own-figure rule keeps the method mark, capped at 1; units/signs are mark-bearing). Draw = AO2 (1 per correctly drawn AND labelled curve, or accurate plot (1) + join (1)).`
: question.marks === 6 ? `• 6-mark question — detect ANALYSE vs EVALUATE from the command word:
   ANALYSE (AO1a 1 + AO2 2 + AO3a 3; NO evaluation rewarded, one-sided is correct): Level 3 (5-6) = GOOD analysis (developed links / chain of reasoning addressing the question) + application in context; Level 2 (3-4) = Reasonable analysis (single effects, not developed into a chain); Level 1 (1-2) = Limited (an attempt, single effect with some link).
   EVALUATE (AO2 1 + AO3a 2 + AO3b 3; NO AO1 rewarded; this is the extended-response/QWC question): Level 3 (5-6) = GOOD evaluation (a FULLY SUPPORTED judgement developed from weighing both sides / comparing alternatives — typically "it depends on"/"provided that") + well-developed line of reasoning; Level 2 (3-4) = Reasonable evaluation (both sides considered, judgement present but not fully supported); Level 1 (1-2) = Limited (incomplete consideration, unsupported).`
: `• ${question.marks}-mark part — if it is a 6-mark Analyse/Evaluate mark by the J205 level grid above; otherwise point-mark 1 per valid point by AO (AO1/AO2), capping partial definitions at 1 and applying the own-figure rule to calculations.`}

GATES (where J205 marks are won/lost): APPLICATION (no use of the scenario/data caps a 6-marker at Level 1; reaching Level 3 needs application AND a developed chain, and on Evaluate a supported judgement); ANALYSIS = a developed CHAIN not a single effect (single effect = Level 2 ceiling); EVALUATION needs BOTH sides AND a supported judgement (one-sided or asserted judgement = Level 2 ceiling); DIAGRAM — where a diagram is required apply the question's stated cap (commonly "max 4 if no correct diagram", sometimes "max 3"; some Analyse questions make it optional with no cap), and a correct but UNLINKED diagram caps at Level 2; COMMAND WORD — do not reward evaluation on an Analyse, nor AO1 on an Evaluate; answer the exact qualifier and any emboldened stem word.

GENERIC: POSITIVE/best-fit marking (start at the highest level, work down); credit valid points beyond the indicative list but only once; whole marks; within a level award top if it consistently meets the criteria, bottom if borderline.

REQUIRED OUTPUT — per-AO/per-strand (never a holistic mark): in "## Mark Scheme", for POINT-marked parts list each point with its AO (AO1a/AO1b/AO2) and tick/cross + the reason for any refused mark; for the 6-mark questions name the type (ANALYSE or EVALUATE) and its AO mix, rate EACH strand Good/Reasonable/Limited with a one-line reason (Analyse: K&U/Application/Analysis; Evaluate: Application/Analysis/Evaluation), then the NAMED LEVEL (1/2/3) by best-fit, the within-level position, the mark /${question.marks} with the AO sub-allocation, any cap applied, and one line on what is needed to reach the next level. Never award AO3 in Section A; never AO1 on an Evaluate; never evaluation on an Analyse.
` : ""}

=== DIAGRAM MARKING CHECKLIST (apply ALL 5 criteria if a diagram is present) ===
1. **AXES** (1 mark): Both axes labelled correctly? (Price/Quantity, Price Level/Real GDP, etc.)
2. **CURVE DIRECTION** (1 mark): Demand downward sloping? Supply upward sloping? AD downward, SRAS upward, LRAS vertical?
3. **SHIFT DIRECTION** (1 mark): Does the shift match the scenario? (e.g., tax → supply left, income rise → demand right)
4. **EQUILIBRIUM** (1 mark): Original equilibrium (P₁,Q₁) AND new equilibrium (P₂,Q₂) identified with dotted lines?
5. **EXPLANATION-DIAGRAM CONSISTENCY** (1-2 marks): Does the written answer match what the diagram shows? If diagram shows supply left but student writes "price falls" → INCONSISTENT → deny marks.

Use any "[DIAGRAM:" notes or "[DIAGRAM NOTES]" blocks in the student's answer as evidence of their hand-drawn diagram work.

List each mark point and whether it was awarded. If a mark was lost, explain exactly why.

For diagram questions, include a **Diagram Assessment** section:
- **Axes**: ✓/✗ · [detail]
- **Curve direction**: ✓/✗ · [detail]
- **Shift direction**: ✓/✗ · [detail]
- **Equilibrium**: ✓/✗ · [detail]
- **Explanation consistency**: ✓/✗ · [detail]
- **Diagram mark**: [X/Y]

Speak DIRECTLY to me using "you" and "your".

## Model Answer
Write a full top-band model answer that would score full marks. For diagram questions, describe the diagram in full detail using this format:

**Diagram: [Type]**
- **X-axis**: Quantity (Q)
- **Y-axis**: Price (P)
- **Initial curves**: D₁ (downward sloping from top-left to bottom-right), S₁ (upward sloping from bottom-left to top-right)
- **Initial equilibrium**: E₁ at intersection of D₁ and S₁, giving P₁ and Q₁ (show dotted lines to both axes)
- **Shift**: [Which curve] shifts [direction] from [old label] to [new label], because [economic reason]
- **New equilibrium**: E₂ at intersection, giving P₂ and Q₂ (show dotted lines to both axes)
- **Shaded area**: [what it represents, e.g., welfare loss, tax revenue, consumer surplus change]
- **Key conclusion**: Price [rises/falls] from P₁ to P₂, Quantity [rises/falls] from Q₁ to Q₂

## Examiner Tip
Give 2-3 specific, actionable tips. For diagram questions:
- Always label BOTH axes correctly · examiners deny the axes mark if even one is missing
- Show BOTH original and new equilibrium with dashed lines to axes · this shows the examiner you understand the price/quantity effects
- Ensure your written explanation MATCHES your diagram · if you draw supply shifting left, your text must say "price rises and quantity falls"
- A rough but correctly labelled diagram scores higher than a neat but incorrectly shifted one
Address me directly. Be encouraging but honest about where I lost marks.`;
        })();

      // AQA-tagged diagram questions force the Smart Mark path even when the
      // legacy regex misses them (e.g. "Analyse using an AD/AS framework").
      const isDiagramQ =
        !!question.requiresDiagram ||
        (/\b(diagram|draw|sketch)\b/i.test(question.text.toLowerCase()) &&
          /\b(with the (help|aid) of|using|draw|sketch)\b/i.test(question.text.toLowerCase()));

      let result = "";

      // When an AQA rubric is attached, surface the examiner's expected diagram
      // verbatim so the marker grades against AQA's mark-scheme convention.
      const rubric = question.diagramRubric as { primaryExpected?: string; requiredLabels?: string[] } | undefined;
      const aqaRubricBlock = rubric
        ? `\n\n[AQA EXPECTED DIAGRAM]\nPrimary expected: ${rubric.primaryExpected ?? "(none)"}\nRequired labels on canvas: ${(rubric.requiredLabels ?? []).join(", ") || "(none specified)"}\nMark holistically against AQA's level-of-response framework. Recommend a Level (L1–L4) · do NOT output 'X/Y' style numerical fractions.`
        : "";

      const messageContent: any = diagramImage
        ? [
            {
              type: "text",
              text:
                markingPrompt +
                aqaRubricBlock +
                boardMarkSchemeBlock +
                "\n\n[The student has drawn a diagram · see the attached image. Apply the DIAGRAM MARKING CHECKLIST: (1) Are axes labelled Price and Quantity (or Price level / Real output for macro)? (2) Is demand downward sloping? (3) Is supply upward sloping? (4) Is the shift in the correct direction for the scenario? (5) Is the new equilibrium correctly identified? Check if the written explanation logically matches what the diagram shows. Award/deny marks accordingly.]" +
                (boardMarkSchemeBlock ? "\n\n[Diagram marking · also award diagram marks strictly per the diagram requirements (axes, curves, equilibria, shifts, shaded areas) stated in the official mark scheme above.]" : ""),
            },
            { type: "image_url", image_url: { url: diagramImage } },
          ]
        : markingPrompt + aqaRubricBlock + boardMarkSchemeBlock;

      await streamChat({
        messages: [{ role: "user", content: messageContent }],
        mode: "grade",
        subject,
        onDelta: (chunk) => { result += chunk; },
        onDone: async () => {
          let feedbackData: QuestionFeedback;

          if (isDiagramQ) {
            // Parse Smart Mark format
            const markMatch = result.match(/## Your mark:\s*([\s\S]*?)(?=##|$)/i);
            const smartMatch = result.match(/## Smart Mark feedback\s*([\s\S]*?)(?=## Explain|## Improve|$)/i);
            const explainMatch = result.match(/## Explain my feedback\s*([\s\S]*?)(?=## Improve|$)/i);
            const improveMatch = result.match(/## Improve my answer\s*([\s\S]*?)$/i);

            feedbackData = {
              markScheme: "",
              modelAnswer: "",
              examinerTip: "",
              isDiagramFeedback: true,
              mark: markMatch?.[1]?.trim() || "",
              smartFeedback: smartMatch?.[1]?.trim() || result,
              explainFeedback: explainMatch?.[1]?.trim() || "",
              improveFeedback: improveMatch?.[1]?.trim() || "",
            };
          } else {
            const markSchemeMatch = result.match(/## Mark Scheme\s*([\s\S]*?)(?=## Model Answer|$)/i);
            const modelAnswerMatch = result.match(/## Model Answer\s*([\s\S]*?)(?=## Examiner Tip|$)/i);
            const examinerTipMatch = result.match(/## Examiner Tip\s*([\s\S]*?)$/i);

            feedbackData = {
              markScheme: markSchemeMatch?.[1]?.trim() || result,
              modelAnswer: modelAnswerMatch?.[1]?.trim() || "",
              examinerTip: examinerTipMatch?.[1]?.trim() || "",
            };
          }

          setFeedbacks((prev) => ({
            ...prev,
            [question.id]: feedbackData,
          }));
          setMarkingId(null);

          if (!isPremium && Object.keys(feedbacks).length === 0) {
            await supabase
              .from("profiles")
              .update({ free_predicted_papers_used: used + 1 } as any)
              .eq("user_id", user.id);
            refreshProfile();
          }
        },
        onError: (err) => { toast.error(err); setMarkingId(null); },
      });
    },
    [answers, paperContext, feedbacks, used, user?.id, refreshProfile, subject, tier, isMaths, isPremium]
  );

  const handleDownloadSolutions = useCallback(async () => {
    if (!isPremium) {
      setShowUpgrade(true);
      return;
    }
    // For library papers with curated static mark scheme PDFs (matches the
    // official Papers section), serve them directly instead of generating.
    const staticMs = resolveStaticPaperPdf(selectedLibraryPaper?.id, "mark-scheme");
    if (staticMs) {
      triggerStaticPdfDownload(staticMs);
      toast.success(staticMs.label);
      return;
    }
    if (parsedQuestions.length === 0) {
      toast.error("No questions to generate solutions for.");
      return;
    }
    if (solutionLoading) return;

    setSolutionLoading(true);
    setSolutionProgress({ done: 0, total: parsedQuestions.length });
    toast.info(`Generating solutions for ${parsedQuestions.length} questions… this can take a minute.`);

    const entries: SolutionEntry[] = [];

    // Pre-extract figure / table blocks from the paper context so we can attach
    // any figures referenced by a question to its solution entry.
    const figureBlocks: { id: string; aliases: string[]; markdown: string }[] = [];
    if (paperContext) {
      const ctxLines = paperContext.split("\n");
      const headerRe = /^#{0,4}\s*\*{0,2}((Figure|Table)\s+([A-Z0-9]+))(?::.*)?\*{0,2}\s*$/i;
      const stopRe = /^#{1,4}\s|^Question\s|^\*{0,2}(?:Figure|Table|Extract)\s/i;
      for (let i = 0; i < ctxLines.length; i++) {
        const m = ctxLines[i].trim().match(headerRe);
        if (!m) continue;
        const kind = m[2];
        const num = m[3];
        const id = `${kind} ${num}`.toLowerCase();
        const block: string[] = [ctxLines[i]];
        let j = i + 1;
        while (j < ctxLines.length) {
          const ln = ctxLines[j].trim();
          if (ln && stopRe.test(ln)) break;
          block.push(ctxLines[j]);
          j++;
        }
        figureBlocks.push({
          id,
          aliases: [`${kind} ${num}`, `${kind}${num}`].map(s => s.toLowerCase()),
          markdown: block.join("\n").trimEnd(),
        });
      }
    }

    const figuresForQuestion = (qText: string): string => {
      if (!qText || figureBlocks.length === 0) return "";
      const lower = qText.toLowerCase();
      const matched: string[] = [];
      for (const b of figureBlocks) {
        if (b.aliases.some(a => lower.includes(a))) matched.push(b.markdown);
      }
      return matched.join("\n\n");
    };

    try {
      for (let i = 0; i < parsedQuestions.length; i++) {
        const q = parsedQuestions[i];

        const prompt = `You are a senior ${examBoard} ${level} ${subjectLabel} examiner writing the OFFICIAL mark scheme and a top-band model answer for a predicted paper.

PAPER CONTEXT (extracts / figures the question may reference):
${paperContext || "(no paper-level extracts)"}

QUESTION:
${q.label} [${q.marks} marks]
${q.text}

Produce the response in EXACTLY this structure (use these exact headings, no extras):

## Mark Scheme
A clear, examiner-style breakdown of how the ${q.marks} marks are awarded. Use the appropriate AO framework (Knowledge / Application / Analysis / Evaluation for essays; level-of-response bands where relevant). List the specific points a candidate must make to access each mark. Be concise and exam-board accurate.

## Model Answer
A full top-band answer that would score full marks. Write it as a candidate would, in continuous prose where appropriate. For diagram questions, describe the diagram fully (axes, curves, shifts, equilibria, shaded areas) in words. Use real economic theory and refer to the paper context where the question demands it.

## Examiner Tip
2–3 short, actionable tips on technique that distinguish a top-band answer from a mid-band one for this specific question.

Do NOT include any other headings, preamble, or commentary outside these three sections.`;

        let raw = "";
        await streamChat({
          messages: [{ role: "user", content: prompt }],
          mode: "grade",
          subject,
          onDelta: (chunk) => { raw += chunk; },
          onDone: () => {},
          onError: (err) => { toast.error(err); },
        });

        const msMatch = raw.match(/##\s*Mark Scheme\s*([\s\S]*?)(?=##\s*Model Answer|$)/i);
        const maMatch = raw.match(/##\s*Model Answer\s*([\s\S]*?)(?=##\s*Examiner Tip|$)/i);
        const tipMatch = raw.match(/##\s*Examiner Tip\s*([\s\S]*?)$/i);

        const markScheme = msMatch?.[1]?.trim() || raw.trim() || "(no mark scheme returned)";
        const modelAnswer = maMatch?.[1]?.trim() || "";
        const examinerTip = tipMatch?.[1]?.trim() || "";
        const fallbackDetected = /diagram description\s*:|(?:^|\n)\s*[*-]\s*(?:x-axis|y-axis)\s*:/im.test(`${markScheme}\n${modelAnswer}`);
        const rawMarkdownDetected = /\|\s*Level\s*\||(?:^|\n)\s*\|\s*:?-{3,}|(?:^|\n)\s*[*-]\s+/m.test(`${markScheme}\n${modelAnswer}\n${examinerTip}`);
        if (import.meta.env.DEV) {
          console.info("[solution-pipeline] llm-output", {
            label: q.label,
            requiresDiagram: !!(q as any).requiresDiagram,
            referenceFigureId: (q as any).referenceFigureId ?? null,
            diagramTypeOnQuestion: (q as any).diagramType ?? null,
            diagramTypePassedToSolutionEntry: null,
            referenceFigureScenarioPassedToSolutionEntry: null,
            fallbackDetected,
            rawMarkdownDetected,
            markSchemePreview: markScheme.slice(0, 220),
            modelAnswerPreview: modelAnswer.slice(0, 220),
          });
        }

        entries.push({
          label: q.label,
          marks: q.marks,
          questionText: q.text,
          markScheme,
          modelAnswer,
          examinerTip,
          figuresMarkdown: figuresForQuestion(q.text),
          referenceFigureId: (q as any).referenceFigureId,
          requiresDiagram: !!(q as any).requiresDiagram,
        });

        setSolutionProgress({ done: i + 1, total: parsedQuestions.length });
      }

      const paperTitle = displayPaperTitle(selectedLibraryPaper?.title || `${examBoard} ${level} ${subjectLabel} Predicted Paper ${paper}`);
      await generateSolutionPdf(paperTitle, entries, {
        subject: subjectLabel,
        examBoard,
        level,
        tier: (isMaths || isChemistry) ? tier : undefined,
      });
      toast.success("Solution PDF downloaded!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to generate solutions.");
    } finally {
      setSolutionLoading(false);
      setSolutionProgress({ done: 0, total: 0 });
    }
  }, [parsedQuestions, paperContext, examBoard, level, subjectLabel, paper, selectedLibraryPaper, subject, tier, isMaths, isChemistry, solutionLoading, isPremium]);

  const reset = () => {
    setStep("select");
    setGeneratedPaper("");
    setSelectedLibraryPaper(null);
    setParsedQuestions([]);
    setPaperContext("");
    setAnswers({});
    setFeedbacks({});
    setMarkingId(null);
    setExamActive(false);
    setExamFinished(false);
    setTimeExpired(false);
    setLibraryDifficulty(null);
    setLibrarySet(null);
    autoGenTriggered.current = false;
  };

  useEffect(() => {
    if (!selectedLibraryPaper || isPremium || !isPremiumPredictedPaper(selectedLibraryPaper)) return;
    setStep("select");
    setSelectedLibraryPaper(null);
    setParsedQuestions([]);
    setPaperContext("");
    setAnswers({});
    setFeedbacks({});
    setMarkingId(null);
    setExamActive(false);
    setExamFinished(false);
    setTimeExpired(false);
    setShowUpgrade(true);
  }, [selectedLibraryPaper, isPremium]);

  const handleSubmitExam = useCallback(() => {
    setExamActive(false);
    setExamFinished(true);
  }, []);

  if (!user) {
    return (
      <div className="container py-24 max-w-3xl text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Sign in to access Predicted Papers</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Generate predicted exam papers with full marking and model solutions.</p>
        <Button onClick={() => navigate("/auth")} size="lg" className="rounded-full px-10 shadow-lg shadow-primary/20">Sign In</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen dot-grid-bg">
      {/* Hero header */}
      <div className="relative overflow-hidden pt-20 pb-14">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[350px] bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="container max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-card/80 backdrop-blur-sm text-muted-foreground rounded-full px-4 py-1.5 mb-6 border border-border/60">
              <FileText className="h-3.5 w-3.5 text-primary" /> {examBoard} {level} {subjectLabel}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-5">
              <span
                className="inline-block bg-clip-text text-transparent animate-shimmer pb-2 leading-[1.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--cyan-pop)), hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
                }}
              >
                Predicted Papers
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {libraryPapers.length} expertly crafted papers ready to practice.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-5xl pb-20">
        {(() => {
          const boardId = subjectToBoardId(subject);
          const def = boardId ? getBoardDefinition(boardId) : null;
          if (def && def.refinementStatus !== "refined" && step === "select") {
            return <ComingSoonBoard boardName={def.displayName} />;
          }
          return null;
        })()}
        {step === "select" && (() => {
          const boardId = subjectToBoardId(subject);
          const def = boardId ? getBoardDefinition(boardId) : null;
          return def && def.refinementStatus !== "refined" ? null : true;
        })() && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Generate New mode removed · Paper Library only */}

            {mode === "library" ? (
              <div className="space-y-10">
                {libraryPapers.length === 0 ? (
                  <div className="flex flex-col items-center py-20">
                    <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No pre-generated papers for this subject yet.</p>
                  </div>
                ) : (() => {
                  // Group library papers by paper number so each paper gets its
                  // own labelled section (Paper 1 / Paper 2 / Paper 3 / AS Paper 1).
                  const groups = new Map<string, typeof libraryPapers>();
                  libraryPapers.forEach((lp) => {
                    const key = lp.paper;
                    if (!groups.has(key)) groups.set(key, [] as typeof libraryPapers);
                    groups.get(key)!.push(lp);
                  });
                  const groupLabel = (key: string) => {
                    if (key.startsWith("as-")) {
                      const n = key.replace("as-", "");
                      // CAIE Papers 3 & 4 are A2 (only CAIE produces as-3/as-4; AQA AS
                      // has only as-1/as-2). Papers 1 & 2 are AS.
                      const isA2 = n === "3" || n === "4";
                      // Paper 2 across AS boards is Macro; Paper 1 is Micro.
                      const focus = n === "2" ? "Macroeconomics" : "Microeconomics";
                      return isA2
                        ? { title: `A2 Paper ${n}`, subtitle: "A2 · A-Level" }
                        : { title: `AS Paper ${n}`, subtitle: `AS-Level · ${focus}` };
                    }
                    return { title: `Paper ${key}`, subtitle: "A-Level" };
                  };
                  const groupAccent = (key: string) =>
                    key.startsWith("as-")
                      ? "from-violet-500/20 to-fuchsia-500/10 border-violet-500/20 text-violet-300"
                      : "from-primary/20 to-accent/10 border-primary/20 text-primary";

                  let cardIndex = 0;
                  return (
                    <div className="space-y-10">
                      {Array.from(groups.entries()).map(([groupKey, papers]) => {
                        const label = groupLabel(groupKey);
                        const accent = groupAccent(groupKey);
                        return (
                          <section key={groupKey} className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-br ${accent} border text-xs font-bold uppercase tracking-wider`}>
                                {label.title}
                              </div>
                              <div className="text-xs text-muted-foreground">{label.subtitle} · {papers.length} {papers.length === 1 ? "set" : "sets"}</div>
                              <div className="flex-1 h-px bg-border/40" />
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                              {papers.map((lp) => {
                                const difficulty = getPredictedPaperDifficulty(lp);
                                const isLocked = isPremiumPredictedPaper(lp) && !isPremium;
                                const i = cardIndex++;
                                return (
                                  <motion.div
                                    key={lp.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.03, ease: [0.25, 0.4, 0.25, 1] }}
                                  >
                                    <button
                                      onClick={() => openLibraryPaper(lp)}
                                      className="w-full h-full text-left group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
                                    >
                                      <div className="flex items-start justify-between mb-4">
                                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/10">
                                          <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5" />
                                      </div>
                                      <h3 className="font-bold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">{displayPaperTitle(lp.title)}</h3>
                                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{lp.description}</p>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                                          {lp.totalMarks} marks
                                        </span>
                                        {difficulty && (() => {
                                          const diffStyles: Record<string, string> = {
                                            Moderate: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
                                            Hard: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
                                            Advanced: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
                                          };
                                          const cls = diffStyles[difficulty] ?? "bg-muted text-muted-foreground";
                                          return (
                                            <span className={`text-[11px] ${cls} px-2.5 py-1 rounded-full font-semibold`}>
                                              {difficulty}
                                            </span>
                                          );
                                        })()}
                                        {isLocked && (
                                          <span className="text-[11px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-semibold inline-flex items-center gap-1">
                                            <Lock className="h-3 w-3" /> Pro
                                          </span>
                                        )}
                                      </div>
                                    </button>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-10">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">1</span>
                    Choose Paper
                  </h3>
                  <PaperSelector selected={paper} onSelect={setPaper} subject={subject} />
                </div>

                {(isMaths || isChemistry) && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">2</span>
                      Select Tier
                    </h3>
                    <TierSelector selected={tier} onSelect={setTier} />
                  </div>
                )}

                {/* Topic scope selector */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{(isMaths || isChemistry) ? "3" : "2"}</span>
                    Topic Coverage
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      ...(!isAnyIGCSEorGCSE ? [
                        { value: "year1" as const, label: "Year 1 Only", desc: "AS / Year 12 topics only · perfect if you haven't covered Year 2 yet" },
                        { value: "year1+2" as const, label: "Year 1 + Year 2", desc: "Full A-Level specification · all micro and macro topics" },
                      ] : []),
                      { value: "full" as const, label: "Full Predicted Paper", desc: "Complete exam paper matching the official structure and difficulty" },
                      { value: "custom" as const, label: "Custom Topics", desc: "Choose exactly which topics to include in your paper" },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setTopicScope(opt.value);
                          if (opt.value !== "custom") setSelectedTopics([]);
                        }}
                        className={cn(
                          "text-left rounded-xl border-2 p-4 transition-all duration-200",
                          topicScope === opt.value
                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                            : "border-border hover:border-primary/30 hover:bg-card"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={cn(
                            "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors",
                            topicScope === opt.value ? "border-primary" : "border-muted-foreground/40"
                          )}>
                            {topicScope === opt.value && <div className="h-2 w-2 rounded-full bg-primary" />}
                          </div>
                          <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-6">{opt.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Custom topic picker */}
                  {topicScope === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-5"
                    >
                      <div className="rounded-xl border border-border bg-card/50 p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-foreground">
                            Select Topics
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                              ({selectedTopics.length} selected)
                            </span>
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedTopics(topicsBySubject[subject] || [])}
                              className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                              Select All
                            </button>
                            <span className="text-muted-foreground/40">·</span>
                            <button
                              onClick={() => setSelectedTopics([])}
                              className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(topicsBySubject[subject] || []).map((topic) => {
                            const isSelected = selectedTopics.includes(topic);
                            return (
                              <button
                                key={topic}
                                onClick={() => {
                                  setSelectedTopics((prev) =>
                                    isSelected
                                      ? prev.filter((t) => t !== topic)
                                      : [...prev, topic]
                                  );
                                }}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                  isSelected
                                    ? "bg-primary/15 border-primary/40 text-primary shadow-sm shadow-primary/10"
                                    : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                                )}
                              >
                                {isSelected && <span className="mr-1">✓</span>}
                                {topic}
                              </button>
                            );
                          })}
                        </div>
                        {selectedTopics.length === 0 && (
                          <p className="text-xs text-destructive mt-3">
                            Please select at least one topic to generate a paper.
                          </p>
                        )}
                        {selectedTopics.length > 0 && selectedTopics.length <= 2 && (
                          <p className="text-xs text-warning mt-3">
                            Tip: Selecting 3+ topics creates a more balanced paper.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center space-y-4 pt-6"
                >
                  {!isPremium && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-bold text-foreground">{Math.max(0, remaining)}</span> of{" "}
                      {FREE_LIMITS.predictedPapers} free papers remaining
                      {remaining <= 0 && (
                        <>
                          {" · "}
                          <button onClick={() => setShowUpgrade(true)} className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                            Upgrade to Pro
                          </button>
                        </>
                      )}
                    </p>
                  )}

                  <Button
                    data-auto-generate
                    onClick={canUse ? generatePaper : () => setShowUpgrade(true)}
                    disabled={isGenerating || (topicScope === "custom" && selectedTopics.length === 0)}
                    size="lg"
                    className="gap-2.5 px-12 h-13 rounded-full text-base font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {isGenerating ? (
                      <><Sparkles className="h-4 w-4 animate-spin" /> Generating...</>
                    ) : canUse ? (
                      <><Sparkles className="h-4 w-4" /> Generate Paper</>
                    ) : (
                      <>Upgrade to Generate <ArrowRight className="h-4 w-4" /></>
                    )}
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {isGenerating && generatedPaper && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-border/60 bg-card overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <MathsMarkdown>{generatedPaper}</MathsMarkdown>
              </div>
            </div>
          </motion.div>
        )}

        {step === "paper" && !isGenerating && !examFinished && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6 mt-8"
          >
            {/* Paper header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-border/40">
              <div>
                {selectedLibraryPaper ? (
                  <>
                    <h2 className="text-2xl font-bold tracking-tight">{displayPaperTitle(selectedLibraryPaper.title)}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{selectedLibraryPaper.description}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold tracking-tight">{examBoard} {level} {subjectLabel} · Paper {paper}</h2>
                    <p className="text-sm text-muted-foreground mt-1">Predicted Paper</p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {!examActive && (
                  <ExamTimer
                    durationMinutes={examDuration}
                    onTimeUp={handleExamTimeUp}
                    isActive={false}
                    onStart={handleStartExam}
                  />
                )}
                <Button
                  size="lg"
                  className="gap-2.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                  onClick={() => {
                    // For library papers with curated static PDFs (matches the
                    // official Papers section), serve them directly instead of
                    // regenerating from text content.
                    const staticQp = resolveStaticPaperPdf(selectedLibraryPaper?.id, "paper");
                    if (staticQp) {
                      triggerStaticPdfDownload(staticQp);
                      toast.success(staticQp.label);
                      return;
                    }
                    const paperTitle = displayPaperTitle(selectedLibraryPaper?.title || `${examBoard} ${level} ${subjectLabel} Predicted Paper ${paper}`);
                    const fullContent = paperContext + "\n\n" + parsedQuestions.map(q => `${q.label} [${q.marks} marks]\n${q.text}`).join("\n\n");
                    generatePaperPdf(paperTitle, fullContent, {
                      subject: subjectLabel,
                      examBoard,
                      level,
                      tier: (isMaths || isChemistry) ? tier : undefined,
                    });
                    toast.success("PDF downloaded!");
                  }}
                >
                  <Download className="h-5 w-5" /> Download PDF
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2.5 rounded-full"
                  onClick={handleDownloadSolutions}
                  disabled={solutionLoading || parsedQuestions.length === 0}
                  title={!isPremium ? "Upgrade to Pro to download solutions" : undefined}
                >
                  {solutionLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Building solutions… {solutionProgress.done}/{solutionProgress.total}
                    </>
                  ) : !isPremium ? (
                    <>
                      <Lock className="h-5 w-5" /> Download Solution PDF
                      <span className="ml-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary">Pro</span>
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="h-5 w-5" /> Download Solution PDF
                    </>
                  )}
                </Button>
                <ReportButton
                  context={{
                    page: `Predicted Papers → ${displayPaperTitle(selectedLibraryPaper?.title || `${examBoard} ${level} ${subjectLabel} Paper ${paper}`)}`,
                    board: examBoard,
                    paperCode: `${examBoard} Paper ${paper}`,
                  }}
                />
              </div>
            </div>

            {/* Sticky exam timer bar when active */}
            {examActive && (
              <ExamTimer
                durationMinutes={examDuration}
                onTimeUp={handleExamTimeUp}
                isActive={examActive}
                onStart={handleStartExam}
              />
            )}

            {paperContext && (
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <MathsMarkdown suppressDiagrams>{paperContext}</MathsMarkdown>
                  </div>
                </div>
              </div>
            )}

            {/* Figure relevance analysis · works across all 12 exam boards */}
            {generatedPaper && (
              <FigureAnalysisPanel
                paperContent={generatedPaper}
                examBoard={`${examBoard} ${level}`}
                paperTitle={displayPaperTitle(selectedLibraryPaper?.title || `${examBoard} ${level} ${subjectLabel} · Paper ${paper}`)}
                onCleanedContent={(cleaned) => {
                  const { context, questions } = parseQuestions(cleaned);
                  setPaperContext(context);
                  setParsedQuestions(questions);
                }}
              />
            )}

            {/* Chemistry reference materials */}
            {isChemistry && (
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="p-5">
                  <Button
                    variant="outline"
                    onClick={() => setShowRefSheet(!showRefSheet)}
                    className="w-full gap-2 justify-center rounded-xl"
                  >
                    <BookOpen className="h-4 w-4" />
                    {showRefSheet ? "Hide" : "Show"} Reference Materials
                  </Button>
                  {showRefSheet && (
                    <div className="mt-4 space-y-6">
                      <PeriodicTable />
                      <ChemistryEquations />
                    </div>
                  )}
                </div>
              </div>
            )}

            {parsedQuestions.map((q, i) => (
              <div key={q.id}>
                {q.sectionHeader && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="flex items-center gap-3 py-4 mt-4"
                  >
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                      {q.sectionHeader}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: [0.25, 0.4, 0.25, 1] }}
                >
                  <QuestionCard
                    question={q}
                    answer={answers[q.id] || ""}
                    onAnswerChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                    onMark={(diagramImage) => markQuestion(q, diagramImage)}
                    isMarking={markingId === q.id}
                    feedback={feedbacks[q.id] || null}
                    showMathTools={isMaths || isChemistry || isAnyEcon}
                    showEconDiagram={false}
                    showDrawingCanvas={isMaths || isChemistry || isAnyEcon}
                    showGraphPaper={isMaths}
                    showGeometryTools={isMaths}
                    subject={subject}
                    paperKey={selectedLibraryPaper?.id || `${examBoard}-${paper}`}
                  />
                </motion.div>
              </div>
            ))}

            <div className="flex flex-wrap justify-center gap-4 pt-8 pb-4">
              {examActive && (
                <Button
                  onClick={handleSubmitExam}
                  size="lg"
                  className="gap-2 rounded-full px-10 bg-success hover:bg-success/90 text-white font-bold shadow-xl shadow-success/25"
                >
                  <CheckCircle className="h-5 w-5" /> Submit Exam
                </Button>
              )}
              <Button variant="outline" onClick={reset} className="gap-2 rounded-full px-8 border-border/60 hover:bg-card hover:border-primary/30 transition-all">
                <RotateCcw className="h-4 w-4" /> Back to Papers
              </Button>
            </div>
          </motion.div>
        )}

        {/* Exam results view */}
        {step === "paper" && examFinished && (
          <div className="mt-8">
            <ExamResultsSummary
              questions={parsedQuestions}
              feedbacks={feedbacks}
              answers={answers}
              onBackToPapers={reset}
              paperTitle={displayPaperTitle(selectedLibraryPaper?.title || `${examBoard} ${level} ${subjectLabel} · Paper ${paper}`)}
              timeExpired={timeExpired}
            />
          </div>
        )}
      </div>
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} feature="predicted papers" />
    </div>
  );
}
