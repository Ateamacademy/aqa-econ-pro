import { useState, useCallback, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Lock, Sparkles, RotateCcw, ArrowRight, Library, Wand2, BookOpen, Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { FREE_LIMITS } from "@/lib/plans";
import { PaperSelector } from "@/components/predicted-papers/PaperSelector";
import { TierSelector } from "@/components/predicted-papers/TierSelector";
import { QuestionCard } from "@/components/predicted-papers/QuestionCard";
import { parseQuestions, type ParsedQuestion } from "@/components/predicted-papers/parseQuestions";
import { paperOptionsBySubject } from "@/lib/subjectConfig";
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

CALCULATOR: ${isCalc ? "YES — this is a CALCULATOR paper. Questions can involve complex arithmetic, trigonometry with decimals, statistical calculations, and iterative methods." : "NO — this is a NON-CALCULATOR paper. All arithmetic must be manageable by hand. Focus on fractions, mental methods, estimation, exact values, and algebraic manipulation."}

STRUCTURE (match real Edexcel papers EXACTLY):
- 20–25 questions, numbered sequentially
- Total: 80 marks
- Questions progress from easy (1–2 marks) to hard (5–6 marks)
- Multi-part questions use (a), (b), (c) labelling
- Include a variety of command words: "Work out", "Calculate", "Show that", "Prove", "Explain why", "Give a reason"
- Start with 3–4 short 1–2 mark "warm-up" questions, then build complexity

USE THE PAST-PAPER PATTERNS ABOVE to create NEW questions that feel like they belong in a real Edexcel paper. Do NOT copy questions verbatim — create original questions in the SAME STYLE and DIFFICULTY.

Ensure EVERY topic area from the past-paper patterns is represented. Include at least 6 graph/diagram/figure/table questions.

IMPORTANT FORMATTING — FOLLOW EXACTLY:
Question 1 [2 marks]
Question 2 [3 marks]
Question 3a [1 marks]
Question 3b [2 marks]

Do NOT wrap question headers in bold/asterisks. Write them exactly as shown above.
Use realistic Figure/Table blocks where appropriate, but always include all required data in text so the question is fully answerable.
Make questions topical, varied, and exam-authentic. Avoid repeating similar question types.

FIGURE/CHART/GRAPH FORMAT (CRITICAL — DO NOT USE ASCII ART):
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
    "1": `PAPER 1: Markets and Business Behaviour (9EC0/01) — 2 hours, 100 marks
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
Question 06 [5 marks] — Short data interpretation
Question 07 [8 marks] — "Explain, using a diagram..."
Question 08 [12 marks] — "Evaluate..." / "Assess..."
Question 09 [15 marks] — Extended evaluation (KAA + Evaluation)

## Section C: Extended Open-Response (one from two, 40 marks)
### EITHER Essay 1 OR Essay 2
Each has a brief context then two parts:
Question 10a [5 marks] — Define/explain a concept
Question 10b [15 marks] — "Evaluate the view that..." / "Assess whether..."
Question 10c [20 marks] — Extended evaluation essay`,

    "2": `PAPER 2: The National and Global Economy (9EC0/02) — 2 hours, 100 marks
Same structure as Paper 1 but MACROECONOMIC topics:
Section A: 5 supported MCQs (20 marks)
Section B: Data response with macro data (GDP, inflation, trade, etc.) (40 marks)
Section C: Extended open-response macro essay (40 marks)
Topics: AD/AS, economic growth, unemployment, inflation, fiscal/monetary policy, financial markets, exchange rates, globalisation, development.`,

    "3": `PAPER 3: Microeconomics and Macroeconomics (9EC0/03) — 2 hours, 100 marks
SYNOPTIC PAPER — tests BOTH micro AND macro.
## Section A: Data Response (one from two, 50 marks)
Extended case study with 4-5 Extracts covering both micro and macro themes.
Questions range from 2-mark define to 25-mark evaluate.
## Section B: Extended Open-Response (one from two, 50 marks)
Two-part essay requiring synoptic links between micro and macro.
Question a [25 marks] and Question b [25 marks].`,
  };

  const specBTemplates: Record<string, string> = {
    "1": `PAPER 1: Markets, Consumers and Firms (9EB0/01) — 2 hours, 80 marks
STRUCTURE:
## Section A: Data Response (compulsory, 40 marks)
Case study with 3-4 Extracts + Figures
Question 01 [4 marks] — Knowledge/application
Question 02 [8 marks] — "Explain, using a diagram..."
Question 03 [10 marks] — "Assess..."
Question 04 [18 marks] — "Evaluate..." (extended)

## Section B: Essay (one from three, 40 marks)
Question 05/06/07 [40 marks] — Full essay with KAA + Evaluation
Topics: demand/supply, elasticity, market failure, business behaviour, costs/revenue, market structures, labour market.`,

    "2": `PAPER 2: The Wider Economic Environment (9EB0/02) — 2 hours, 80 marks
Same structure as Paper 1 but MACRO topics:
Section A: compulsory data response (40 marks)
Section B: essay choice (40 marks)
Topics: economic indicators, AD/AS, macro policy, inequality, financial sector, role of state.`,

    "3": `PAPER 3: The Global Economy (9EB0/03) — 2 hours, 80 marks
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

OUTPUT FORMAT (CRITICAL):
- Every question MUST start: Question XX [Y marks]
- Do NOT bold question headers
- MCQ options on separate lines: - A, - B, - C, - D
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
    "1": `COMPONENT 01: Microeconomics (H460/01) — 2 hours, 80 marks
## Section A: Data Response (compulsory, 30 marks)
Case study with 2-3 Extracts (text + data tables/figures)
Question 01 [2 marks] — calculation/define
Question 02 [4 marks] — explain with reasoning
Question 03 [8 marks] — "Explain, with the aid of a diagram..."
Question 04 [16 marks] — "Evaluate..."

## Section B: Essay (choose TWO from THREE, 50 marks)
Question 05 [25 marks] — Extended evaluation essay (micro)
Question 06 [25 marks] — Extended evaluation essay (micro)
Question 07 [25 marks] — Extended evaluation essay (micro)`,

    "2": `COMPONENT 02: Macroeconomics (H460/02) — 2 hours, 80 marks
Same structure as Component 01 but MACRO topics:
Section A: Data response (30 marks) — 2m, 4m, 8m, 16m
Section B: Two essays from three (50 marks) — each 25 marks
Topics: AD/AS, growth, inflation, unemployment, fiscal/monetary/supply-side policy, trade, financial sector.`,

    "3": `COMPONENT 03: Themes in Economics (H460/03) — 2 hours, 80 marks
SYNOPTIC — tests BOTH micro AND macro.
Section A: Data response (30 marks) — synoptic case study requiring micro+macro links
Section B: Two essays from three (50 marks) — synoptic evaluation essays
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

OUTPUT FORMAT:
- Every question: Question XX [Y marks]
- Do NOT bold question headers
- MCQ options: - A, - B, - C, - D
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
    "1": `PAPER 1: Multiple Choice (AS) — 1 hour, 30 marks
30 MCQs covering both AS micro and macro. Each worth 1 mark.
Mix of: recall, calculation, diagram interpretation, and application.
Topics: scarcity, PPC, demand/supply, elasticity, market failure, externalities, AD/AS, inflation, unemployment, fiscal/monetary policy, trade.`,
    "2": `PAPER 2: Data Response and Essay (AS) — 1h30, 40 marks
## Section A (choose ONE from TWO data response questions, 20 marks each)
Each has a Table/Figure + Extract (150-250 words)
Question pattern: 2m calculate → 2m identify → 4m explain → 6m analyse with diagram → 6m discuss/evaluate

## Section B (choose ONE from TWO essays, 8 marks each)
Short structured essay requiring explanation with economic reasoning.`,
    "3": `PAPER 3: Multiple Choice (A2) — 1h15, 30 marks
30 MCQs on A2 content. More analytical than Paper 1.
Topics: market structures, costs/revenue, labour markets, price discrimination, game theory, development, trade theory, welfare economics, policy evaluation.`,
    "4": `PAPER 4: Data Response and Essay (A2) — 2h15, 70 marks
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

OUTPUT FORMAT:
- Every question: Question XX [Y marks]
- Do NOT bold question headers
- MCQ options: - A, - B, - C, - D
- Do NOT include mark schemes or answers

FIGURE/CHART FORMAT:
- NEVER use ASCII art
- Data: markdown tables with Source line
- Diagrams: structured text with axes, curves, equilibrium points`;
};

const ECON_PAPER_PROMPT = (paperLabel: string, paperValue: string) => {
  const paperNum = paperValue === "full" ? "3" : paperValue.includes("1") ? "1" : "2";
  const knowledgeGraphSection = generateKnowledgeGraphPrompt(paperNum);
  const isSynopticPaper = paperNum === "3";

  const paper1Template = `PAPER 1 TEMPLATE — Markets and Market Failure (7136/1):
EXACT STRUCTURE (copy this layout precisely):

## Section A
Answer EITHER Context 1 OR Context 2.

### EITHER
### Context 1
Total for this context: 40 marks
[Title: a topical micro/market failure theme e.g. "The market for university accommodation"]

Study Extracts A, B and C and then answer all parts of Context 1 which follow.

#### Extract A: [A data table with real-world statistics — 3-6 rows, 4-6 columns, with a Source line]
#### Figure 1: [A chart/graph described with specific data points so questions can reference it]
#### Extract B: [2-3 paragraphs of real-world context, 150-200 words, with Source line. Include specific quotes that questions will reference by line number.]
#### Extract C: [2-3 paragraphs discussing policies/solutions, 150-200 words, with Source line. Include specific quotes that questions will reference by line number.]

Question 01 [2 marks] — a calculation using data from Extract A
Question 02 [4 marks] — "Explain how the data in Extract A show that..." (data interpretation)
Question 03 [9 marks] — "With the help of a diagram, explain..." (quote a line from Extract B/C, require a labelled diagram + applied analysis)
Question 04 [25 marks] — "Using the data in the extracts and your knowledge of economics, discuss/evaluate..." (quote a line from Extract C, deep evaluation with counter-arguments)

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
Answer one essay from this section. Each essay carries 40 marks.

### EITHER
### Essay 1
[Context paragraph: 3-4 sentences of real-world background]
Question 09 [15 marks] — "Explain..." (analyse/apply)
Question 10 [25 marks] — "Evaluate the view that..." / "Assess whether..."

### OR
### Essay 2
[Context paragraph]
Question 11 [15 marks]
Question 12 [25 marks]

### OR
### Essay 3
[Context paragraph]
Question 13 [15 marks]
Question 14 [25 marks]`;

  const paper2Template = `PAPER 2 TEMPLATE — National and International Economy (7136/2):
EXACT STRUCTURE (identical to Paper 1 but with MACRO topics):

## Section A
Answer EITHER Context 1 OR Context 2.

### EITHER
### Context 1
Total for this context: 40 marks
[Title: a topical macro theme e.g. "Productivity and living standards"]

Study Extracts A, B and C and then answer all parts of Context 1 which follow.

#### Extract A: [A data table comparing countries/years — GDP, inflation, trade, etc.]
#### Extract B: [2-3 paragraphs of macroeconomic context, with Source]
#### Extract C: [2-3 paragraphs discussing macro policies, with Source]

Question 01 [2 marks] — calculation from Extract A
Question 02 [4 marks] — "Explain how the data in Extract A show that..."
Question 03 [9 marks] — "With the help of a diagram, explain..." (AD/AS, Phillips curve, etc.)
Question 04 [25 marks] — "Using the data... assess/discuss/evaluate..."

### OR
### Context 2
Total for this context: 40 marks
[Different macro theme]
[Same structure with Extracts D, E, F + Questions 05-08]

## Section B
Answer one essay from this section. Each essay carries 40 marks.

### Essay 1
Question 09 [15 marks] — Explain (macro analysis)
Question 10 [25 marks] — Evaluate/Assess/Discuss

### Essay 2
Question 11 [15 marks]
Question 12 [25 marks]

### Essay 3
Question 13 [15 marks]
Question 14 [25 marks]`;

  const paper3Template = `PAPER 3 TEMPLATE — Economic Principles and Issues (7136/3):
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
- Difficulty must match June 2024 Paper 3 — NOT easy recall questions

DIAGRAM-BASED MCQ REQUIREMENTS (CRITICAL — match AQA June 2024 Paper 3 Q10, Q11 style):
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

Question 31 [10 marks] — "To what extent, if at all, do the data suggest that..." (data analysis + evaluation)
Question 32 [15 marks] — "Explain why/how..." (applied analysis using extracts)
Question 33 [25 marks] — "After considering Extract D, and the original evidence... would you recommend that... Justify your recommendation." (full evaluation + justified recommendation)`;

  const structureTemplate = paperValue === "full"
    ? paper3Template
    : paperNum === "2" ? paper2Template : paper1Template;

  return `You are an expert AQA A-Level Economics chief examiner. You have written and moderated EVERY AQA A-Level Economics paper from 2017 to 2024 (Papers 1, 2, and 3). You know the exact format, register, difficulty level, and marking expectations intimately.

Generate a COMPLETE, FULL-LENGTH predicted exam paper for ${paperLabel}.

${ECONOMICS_PAST_PAPER_KNOWLEDGE}

${knowledgeGraphSection}

${structureTemplate}

CRITICAL RULES:
1. Follow the template EXACTLY — same section structure, same question numbering, same mark allocations
2. Extracts must be 150-250 words each, written in formal news/academic register with realistic 2023-2025 UK/global data
3. Tables must contain specific numerical data (GDP figures, percentages, prices, indices) so calculation questions are answerable
4. Every "line X" reference in a question must match an actual quote in the extract

DIAGRAM QUESTION REQUIREMENTS (NON-NEGOTIABLE):
1. EVERY 9-mark question MUST begin with "Using a diagram" or "With the help of a diagram" — this is mandatory per AQA specification
2. 9-mark diagram questions follow the KAA marking pattern: Knowledge 1-2, Application 1-2, Analysis 3-5
3. MANDATORY 5-MARK BOTH-CURVES-SHIFT QUESTION (AQA June 2024 Q6a pattern):
   - You MUST include at least ONE question in this EXACT format:
   "Use a demand and supply diagram to explain the impact on price and quantity, of the changes in demand and supply of [specific market from Extract/Figure]. (Figure X and Extract Y)."
   - Mark scheme for this 5-mark pattern:
     Knowledge/understanding: 1 mark — accurate supply and demand diagram with labels and original equilibrium (E₁). (1)
     Application: 1 mark — for identifying that demand and supply in the [specific market] have both [increased/decreased/one each]. (1)
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
1. 2-mark questions: precise calculation or definition — NOT easy recall
2. 4-mark questions: "Explain how the data show..." — requires data interpretation + economic reasoning
3. 9-mark questions: MUST require a labelled diagram + contextual chain of reasoning + application to the extract
4. 15-mark questions: sustained explanation with at least 2 developed chains of analysis
5. 25-mark questions: MUST include counter-arguments, "it depends on" factors, conditional judgement, synoptic links

HOTS REQUIREMENTS (NON-NEGOTIABLE):
- At least 40% of marks target Analyse/Evaluate (Bloom's taxonomy levels 4-6)
- Every 25-mark essay requires genuine evaluation, not description
- Use precise command words: "Evaluate the view that", "Assess whether", "Discuss", "To what extent"

OUTPUT FORMAT (CRITICAL — the parser depends on this exact format):
- Use markdown headings (## for sections, ### for contexts/essays, #### for extracts)
- EVERY question MUST start on its own line with this EXACT format: Question XX [Y marks]
  Examples: Question 01 [2 marks], Question 02 [4 marks], Question 03 [9 marks], Question 09 [15 marks], Question 10 [25 marks]
- Do NOT use bold/asterisks around question headers. Do NOT use parentheses for marks. Do NOT put marks at the end of the line.
- The question text MUST appear AFTER the [Y marks] tag, either on the same line or the next line
- MCQ options on separate lines starting with "- A", "- B", "- C", "- D"
- Do NOT include solutions or mark schemes
- WRONG: **Question 1** (2 marks), 01. Calculate... [2 marks], Q1 [2 marks]
- CORRECT: Question 01 [2 marks] Calculate the percentage change...

FIGURE/CHART/GRAPH FORMAT (CRITICAL — DO NOT USE ASCII ART):
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
- Topic 2: Ionic bonding (dot-and-cross for MgO, NaCl, MgCl₂), covalent bonding (H₂O, NH₃, CH₄, HCl), metallic bonding, giant covalent structures (diamond vs graphite — 6-mark comparison), graphene, fullerenes, nanoparticles, simple molecular substances, polymers
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
- Section A: 15 multiple-choice questions (1 mark each, A/B/C/D options). MCQs must test recall AND application — not just definitions. Include at least 3 MCQs that require calculation or interpretation.
- Section B: Structured questions (~85 marks), numbered sequentially after MCQs
- Multi-part questions use (a), (b), (c) labelling
- Include AT LEAST ONE 6-mark extended response question using Level of Response marking
- Include AT LEAST ONE Required Practical context question

GRAPH/DIAGRAM/FIGURE/TABLE REQUIREMENTS (MANDATORY — at least 8 per paper):
1. At least ONE reaction profile with specific numerical energy values
2. At least ONE data Table (titration results OR experimental data OR bond energies)
3. At least ONE rate graph with specific (time, volume) coordinate pairs
4. At least ONE dot-and-cross diagram question
5. At least ONE bar chart or pie chart with numerical data
6. At least ONE chromatogram with distances for Rf calculation (Paper 2 only)
7. For Higher: at least ONE bond energy calculation with Figure showing displayed formula + Table of bond energies (Paper 1 only)
8. For Higher: at least ONE Haber process yield graph with 3 temperature curves (Paper 2 only)

ALL graphs/figures MUST include specific numerical data points so the question is fully answerable from text.

IMPORTANT FORMATTING — FOLLOW EXACTLY:
Question 1 [1 marks]
Question 2 [2 marks]
Question 3a [1 marks]
Question 3b [3 marks]

Do NOT wrap question headers in bold/asterisks. Include balanced equations with state symbols throughout. Use correct IUPAC naming. Use **Figure N** and **Table N** headings for all visual data.

FIGURE/CHART/GRAPH FORMAT (CRITICAL — DO NOT USE ASCII ART):
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

export default function PredictedPapers() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"library" | "generate">("library");
  const [paper, setPaper] = useState("1");
  const [tier, setTier] = useState<"Foundation" | "Higher">("Higher");
  const [topicScope, setTopicScope] = useState<"full" | "year1" | "year1+2">("full");
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<"select" | "paper">("select");

  const [selectedLibraryPaper, setSelectedLibraryPaper] = useState<PredictedPaper | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [showRefSheet, setShowRefSheet] = useState(false);
  const [paperContext, setPaperContext] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, QuestionFeedback>>({});
  const [markingId, setMarkingId] = useState<string | null>(null);

  const used = (profile as any)?.free_predicted_papers_used ?? 0;
  const canUse = subscribed || used < FREE_LIMITS.predictedPapers;
  const remaining = FREE_LIMITS.predictedPapers - used;

  const paperOptions = paperOptionsBySubject[subject];
  const isMaths = false;
  const isChemistry = false;
  const isEconomics = subject === "economics";
  const isEdexcelA = subject === "edexcel-a";
  const isEdexcelB = subject === "edexcel-b";
  const isOCR = subject === "ocr";
  const isCambridge = subject === "cambridge";
  const isAnyEcon = true;

  const libraryPapers = useMemo(
    () => predictedPapersLibrary.filter((p) => p.subject === subject),
    [subject]
  );

  useEffect(() => { reset(); }, [subject]);

  const openLibraryPaper = (lp: PredictedPaper) => {
    setSelectedLibraryPaper(lp);
    const { context, questions } = parseQuestions(lp.content);
    setPaperContext(context);
    setParsedQuestions(questions);
    setAnswers({});
    setFeedbacks({});
    setMarkingId(null);
    setStep("paper");
  };

  const generatePaper = async () => {
    if (!canUse) {
      toast.error("Free predicted paper limit reached. Subscribe for unlimited access.");
      navigate("/pricing");
      return;
    }
    setIsGenerating(true);
    setGeneratedPaper("");
    setSelectedLibraryPaper(null);
    let result = "";

    const selectedPaper = paperOptions.find((p) => p.value === paper);
    const paperLabel = selectedPaper ? `${selectedPaper.label}: ${selectedPaper.title}` : `Paper ${paper}`;
    const isCalc = paper !== "1";

    // For Economics, fetch past paper patterns from vector DB + knowledge graph
    let dbContextPrompt = "";
    if (isAnyEcon) {
      try {
        const { data: patternData } = await supabase.functions.invoke("retrieve-patterns", {
          body: { paper, subject: isEdexcelA ? "edexcel-a" : isEdexcelB ? "edexcel-b" : isOCR ? "ocr_economics" : isCambridge ? "cambridge" : "economics", limit: 250 },
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
      : ECON_PAPER_PROMPT(paperLabel, paper);

    // Inject DB-retrieved patterns + topic scope for Economics
    const scopeInstruction = topicScope === "year1"
      ? "\n\nIMPORTANT: Only use Year 1 (AS) topics. For AQA: microeconomics topics only (markets, market failure, government intervention). Do NOT include macroeconomics, trade, or Year 2 content."
      : topicScope === "year1+2"
      ? "\n\nUse the FULL specification — both Year 1 and Year 2 topics (micro + macro, including trade, development, and synoptic links)."
      : "";

    const prompt = dbContextPrompt
      ? `${basePrompt}\n\n${dbContextPrompt}${scopeInstruction}\n\nMANDATORY QUALITY CHECK BEFORE FINAL OUTPUT: ensure the paper is full-length, exam-authentic, and as challenging as recent AQA papers (especially 9/25-mark questions). If any question feels too easy or generic, rewrite it to match A-Level standard before finishing.`
      : `${basePrompt}${scopeInstruction}`;

    await streamChat({
      messages: [{ role: "user", content: prompt }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setGeneratedPaper(result); },
      onDone: () => {
        setIsGenerating(false);
        const { context, questions } = parseQuestions(result);
        setPaperContext(context);
        setParsedQuestions(questions);
        setStep("paper");
      },
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const markQuestion = useCallback(
    async (question: ParsedQuestion, diagramImage?: string) => {
      const answer = answers[question.id];
      if (!answer?.trim()) { toast.error("Please write your answer first."); return; }
      setMarkingId(question.id);

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
- **M marks** (method) — for correct approach/strategy
- **A marks** (accuracy) — for correct answers following correct method
- **B marks** (independent) — for correct results independent of method

If this is a graph/diagram question, explicitly mark:
- axis labels + units
- sensible scales
- correct plotted points/curve shape/gradient features
- correct final reading or conclusion
Use any student graph notes/diagram notes in their answer as marking evidence.

You MUST respond in this EXACT structure:

## Mark Scheme
Give a mark out of ${question.marks}. List each M/A/B mark and whether it was awarded. If a mark was lost, explain exactly why. Use "you" and "your" — speak directly to the student.

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
- **AO1** (Knowledge and understanding) — recall of facts, formulae, definitions
- **AO2** (Application) — applying knowledge to familiar and unfamiliar contexts
- **AO3** (Analysis and evaluation) — interpreting data, drawing conclusions

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
Give a mark out of ${question.marks}. List each mark point and whether it was awarded. If a mark was lost, explain exactly why. Check for correct chemical notation, balanced equations, state symbols, and figure/table interpretation. Use "you" and "your" — speak directly to the student.

## Model Answer
Write a full model answer that would score ${question.marks}/${question.marks}. Include balanced equations with state symbols, correct units, and full working for any calculations. For graph/diagram/image questions, include a clear Figure/Table-style description of the expected labels and values.

## Examiner Tip
Give 2–3 specific, actionable tips. Mention common mistakes (e.g., forgetting state symbols, not balancing equations, missing units, misreading graph axes). Address the student directly.`
        : `You are marking an AQA A-Level Economics answer using the EXACT AQA mark scheme methodology.

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
- Correctly labelled axes (e.g. Price/Quantity, Price Level/Real GDP) — 1 mark
- Original curves correctly drawn and labelled — 1 mark
- Correct shift direction with new curve labelled — 1 mark
- New equilibrium clearly marked with dashed lines to axes — 1 mark
- Relevant shaded areas correctly identified (welfare loss, surplus, etc.) — 1 mark` :
question.marks === 15 ? `**For this 15-mark question:**
- **KAA (Knowledge, Application, Analysis):** Up to 8 marks
  - Define key terms (1-2 marks)
  - Apply to context with data references (2-3 marks)
  - At least 2 developed chains of analysis (3-4 marks)
- **Evaluation:** Up to 7 marks (if applicable)` :
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

=== DIAGRAM MARKING CHECKLIST (apply ALL 5 criteria if a diagram is present) ===
1. **AXES** (1 mark): Both axes labelled correctly? (Price/Quantity, Price Level/Real GDP, etc.)
2. **CURVE DIRECTION** (1 mark): Demand downward sloping? Supply upward sloping? AD downward, SRAS upward, LRAS vertical?
3. **SHIFT DIRECTION** (1 mark): Does the shift match the scenario? (e.g., tax → supply left, income rise → demand right)
4. **EQUILIBRIUM** (1 mark): Original equilibrium (P₁,Q₁) AND new equilibrium (P₂,Q₂) identified with dotted lines?
5. **EXPLANATION-DIAGRAM CONSISTENCY** (1-2 marks): Does the written answer match what the diagram shows? If diagram shows supply left but student writes "price falls" → INCONSISTENT → deny marks.

Use any "[DIAGRAM:" notes or "[DIAGRAM NOTES]" blocks in the student's answer as evidence of their hand-drawn diagram work. Students draw diagrams freehand using a drawing canvas — assess the diagram based on their written description of labels, curves, shifts, equilibrium points, and shaded areas. A well-described diagram with correct labels, shifts, and shading should receive full diagram marks.

List each mark point and whether it was awarded. If a mark was lost, explain exactly why.

For diagram questions, include a **Diagram Assessment** section:
- **Axes**: ✓/✗ — [detail]
- **Curve direction**: ✓/✗ — [detail]
- **Shift direction**: ✓/✗ — [detail]
- **Equilibrium**: ✓/✗ — [detail]
- **Explanation consistency**: ✓/✗ — [detail]
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
- Always label BOTH axes correctly — examiners deny the axes mark if even one is missing
- Show BOTH original and new equilibrium with dashed lines to axes — this shows the examiner you understand the price/quantity effects
- Ensure your written explanation MATCHES your diagram — if you draw supply shifting left, your text must say "price rises and quantity falls"
- A rough but correctly labelled diagram scores higher than a neat but incorrectly shifted one
Address me directly. Be encouraging but honest about where I lost marks.`;

      let result = "";

      // Build multimodal message if diagram image is provided
      const messageContent: any = diagramImage
        ? [
            { type: "text", text: markingPrompt + "\n\n[The student has drawn a diagram — see the attached image. Apply the DIAGRAM MARKING CHECKLIST: (1) Are axes labelled Price and Quantity? (2) Is demand downward sloping? (3) Is supply upward sloping? (4) Is the shift in the correct direction for the scenario? (5) Is the new equilibrium correctly identified? Check if the written explanation logically matches what the diagram shows. Award/deny marks accordingly.]" },
            { type: "image_url", image_url: { url: diagramImage } },
          ]
        : markingPrompt;

      await streamChat({
        messages: [{ role: "user", content: messageContent }],
        mode: "grade",
        subject,
        onDelta: (chunk) => { result += chunk; },
        onDone: async () => {
          const markSchemeMatch = result.match(/## Mark Scheme\s*([\s\S]*?)(?=## Model Answer|$)/i);
          const modelAnswerMatch = result.match(/## Model Answer\s*([\s\S]*?)(?=## Examiner Tip|$)/i);
          const examinerTipMatch = result.match(/## Examiner Tip\s*([\s\S]*?)$/i);

          setFeedbacks((prev) => ({
            ...prev,
            [question.id]: {
              markScheme: markSchemeMatch?.[1]?.trim() || result,
              modelAnswer: modelAnswerMatch?.[1]?.trim() || "",
              examinerTip: examinerTipMatch?.[1]?.trim() || "",
            },
          }));
          setMarkingId(null);

          if (!subscribed && Object.keys(feedbacks).length === 0) {
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
    [answers, paperContext, feedbacks, subscribed, used, user?.id, refreshProfile, subject, tier, isMaths]
  );

  const reset = () => {
    setStep("select");
    setGeneratedPaper("");
    setSelectedLibraryPaper(null);
    setParsedQuestions([]);
    setPaperContext("");
    setAnswers({});
    setFeedbacks({});
    setMarkingId(null);
  };

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to access Predicted Papers</h1>
        <p className="text-muted-foreground mb-6">Generate AI-predicted exam papers with full marking and model solutions.</p>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background pt-16 pb-12">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-foreground/5 backdrop-blur-sm text-muted-foreground rounded-full px-4 py-1.5 mb-5 border border-border/50">
              <FileText className="h-3.5 w-3.5" /> {examBoard} {level} {subjectLabel}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
              Predicted Papers
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {libraryPapers.length} expertly crafted papers ready to practice, or generate a fresh one instantly.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-5xl pb-16">
        {step === "select" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Mode toggle */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center bg-muted/60 backdrop-blur rounded-full p-1 border border-border/50">
                <button
                  onClick={() => setMode("library")}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    mode === "library"
                      ? "bg-foreground text-background shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Library className="h-4 w-4" /> Paper Library
                </button>
                <button
                  onClick={() => setMode("generate")}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    mode === "generate"
                      ? "bg-foreground text-background shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Wand2 className="h-4 w-4" /> Generate New
                </button>
              </div>
            </div>

            {mode === "library" ? (
              <div className="space-y-4">
                {libraryPapers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-16">No pre-generated papers for this subject yet.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {libraryPapers.map((lp, i) => (
                      <motion.div
                        key={lp.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        <button
                          onClick={() => openLibraryPaper(lp)}
                          className="w-full text-left group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5" />
                          </div>
                          <h3 className="font-semibold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">{lp.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{lp.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] bg-primary/8 text-primary/80 px-2.5 py-0.5 rounded-full font-medium">
                              {lp.totalMarks} marks
                            </span>
                            {lp.tier && (
                              <span className="text-[11px] bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full font-medium">
                                {lp.tier}
                              </span>
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-8">
                <PaperSelector selected={paper} onSelect={setPaper} subject={subject} />

                {(isMaths || isChemistry) && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Select Tier</h3>
                    <TierSelector selected={tier} onSelect={setTier} />
                  </div>
                )}

                {/* Topic scope selector */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Topic Coverage</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "year1" as const, label: "Year 1 Only", desc: "AS / Year 12 topics only — perfect if you haven't covered Year 2 yet" },
                      { value: "year1+2" as const, label: "Year 1 + Year 2", desc: "Full A-Level specification — all micro and macro topics" },
                      { value: "full" as const, label: "Full Predicted Paper", desc: "Complete exam paper matching the official structure and difficulty" },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setTopicScope(opt.value)}
                        className={cn(
                          "text-left rounded-xl border-2 p-4 transition-all duration-200",
                          topicScope === opt.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/30 hover:bg-muted/30"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={cn(
                            "h-4 w-4 rounded-full border-2 flex items-center justify-center",
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
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center space-y-4 pt-4"
                >
                  {!subscribed && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{Math.max(0, remaining)}</span> of{" "}
                      {FREE_LIMITS.predictedPapers} free papers remaining
                      {remaining <= 0 && (
                        <>
                          {" · "}
                          <button onClick={() => navigate("/pricing")} className="font-semibold text-primary underline underline-offset-2">
                            Upgrade to Pro
                          </button>
                        </>
                      )}
                    </p>
                  )}

                  <Button
                    onClick={canUse ? generatePaper : () => navigate("/pricing")}
                    disabled={isGenerating}
                    size="lg"
                    className="gap-2.5 px-10 h-12 rounded-full text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
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

        {step === "paper" && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6 mt-8"
          >
            {/* Paper header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
              <div>
                {selectedLibraryPaper ? (
                  <>
                    <h2 className="text-2xl font-bold tracking-tight">{selectedLibraryPaper.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{selectedLibraryPaper.description}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold tracking-tight">{examBoard} {level} {subjectLabel} — Paper {paper}</h2>
                    <p className="text-sm text-muted-foreground mt-1">Predicted Paper</p>
                  </>
                )}
              </div>
              <Button
                size="lg"
                className="gap-2.5 rounded-full shadow-lg shadow-primary/20"
                onClick={() => {
                  const paperTitle = selectedLibraryPaper?.title || `${examBoard} ${level} ${subjectLabel} Predicted Paper ${paper}`;
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
            </div>

            {paperContext && (
              <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <MathsMarkdown>{paperContext}</MathsMarkdown>
                  </div>
                </div>
              </div>
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
              <motion.div
                key={q.id}
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
                />
              </motion.div>
            ))}

            <div className="flex justify-center pt-6 pb-4">
              <Button variant="outline" onClick={reset} className="gap-2 rounded-full px-6">
                <RotateCcw className="h-4 w-4" /> Back to Papers
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
