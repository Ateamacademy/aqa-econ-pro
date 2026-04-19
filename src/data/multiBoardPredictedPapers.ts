import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * Backfill: ensures every non-AQA board exposes Papers 1/2/3 × Sets A/B/C
 * (= 9 cards) in the Predicted Papers library. Existing entries in
 * board-specific files (gcsePredictedPapers, igcsePredictedPapers, etc.)
 * are preserved; this file only adds the missing Sets/Papers.
 */
export const multiBoardPredictedPapers: PredictedPaper[] = [
  // ── AQA GCSE Economics (8136) ──
  {
    id: "gcse-p1-c",
    subject: "aqa-gcse" as any,
    paper: "1",
    title: "Paper 1 — Set C",
    description: "How Markets Work. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136) (8136/1) — How Markets Work — Predicted Paper Set C

**Time: 105 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Labour markets in the gig economy:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to labour markets in the gig economy, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to labour markets in the gig economy, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to competition in the supermarket sector, explain two consequences of the issue.

Question 4 [9 marks]
With reference to labour markets in the gig economy, explain one government response to the issue.

Question 5 [12 marks]
With reference to labour markets in the gig economy, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of price elasticity and consumer spending, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of labour markets in the gig economy, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "gcse-p2-c",
    subject: "aqa-gcse" as any,
    paper: "2",
    title: "Paper 2 — Set C",
    description: "How the Economy Works. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136) (8136/2) — How the Economy Works — Predicted Paper Set C

**Time: 105 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Fiscal policy and the 2024 uk budget:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to fiscal policy and the 2024 UK budget, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to fiscal policy and the 2024 UK budget, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to balance of payments and the £/\$ exchange rate, explain two consequences of the issue.

Question 4 [9 marks]
With reference to fiscal policy and the 2024 UK budget, explain one government response to the issue.

Question 5 [12 marks]
With reference to fiscal policy and the 2024 UK budget, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK inflation and Bank of England interest rate decisions, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of fiscal policy and the 2024 UK budget, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "gcse-p3-a",
    subject: "aqa-gcse" as any,
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Synoptic & Applied Economics. Set A — core practice.",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136) (8136/3) — Synoptic & Applied Economics — Predicted Paper Set A

**Time: 105 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Climate policy: carbon pricing vs subsidies:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to climate policy: carbon pricing vs subsidies, explain two consequences of the issue.

Question 2 [4 marks]
With reference to climate policy: carbon pricing vs subsidies, explain one government response to the issue.

Question 3 [6 marks]
With reference to the cost-of-living crisis and government intervention, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to climate policy: carbon pricing vs subsidies, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to globalisation: UK manufacturing decline and trade with China, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of climate policy: carbon pricing vs subsidies, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of globalisation: UK manufacturing decline and trade with China, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "gcse-p3-b",
    subject: "aqa-gcse" as any,
    paper: "3",
    title: "Paper 3 — Set B",
    description: "Synoptic & Applied Economics. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136) (8136/3) — Synoptic & Applied Economics — Predicted Paper Set B

**Time: 105 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — The cost-of-living crisis and government intervention:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to the cost-of-living crisis and government intervention, explain one government response to the issue.

Question 2 [4 marks]
With reference to the cost-of-living crisis and government intervention, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to the cost-of-living crisis and government intervention, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to the cost-of-living crisis and government intervention, explain two consequences of the issue.

Question 5 [12 marks]
With reference to globalisation: UK manufacturing decline and trade with China, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of climate policy: carbon pricing vs subsidies, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of globalisation: UK manufacturing decline and trade with China, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "gcse-p3-c",
    subject: "aqa-gcse" as any,
    paper: "3",
    title: "Paper 3 — Set C",
    description: "Synoptic & Applied Economics. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136) (8136/3) — Synoptic & Applied Economics — Predicted Paper Set C

**Time: 105 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Globalisation: uk manufacturing decline and trade with china:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to globalisation: UK manufacturing decline and trade with China, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to globalisation: UK manufacturing decline and trade with China, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to the cost-of-living crisis and government intervention, explain two consequences of the issue.

Question 4 [9 marks]
With reference to globalisation: UK manufacturing decline and trade with China, explain one government response to the issue.

Question 5 [12 marks]
With reference to globalisation: UK manufacturing decline and trade with China, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of climate policy: carbon pricing vs subsidies, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of globalisation: UK manufacturing decline and trade with China, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  // ── Cambridge IGCSE Economics (0455) ──
  {
    id: "igcse-p1-c",
    subject: "cambridge-igcse" as any,
    paper: "1",
    title: "Paper 1 — Set C",
    description: "Multiple Choice. Set C — challenge — synoptic & evaluative.",
    totalMarks: 30,
    content: `# Cambridge IGCSE Economics (0455) (0455/1) — Multiple Choice — Predicted Paper Set C

**Time: 45 minutes | Total: 30 marks**

Answer all 30 questions. Each question carries 1 mark.

Question 1 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 2 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 3 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 4 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 5 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 6 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 7 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 8 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 9 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 10 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 11 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 12 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 13 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 14 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 15 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 16 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 17 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 18 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 19 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 20 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 21 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 22 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 23 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 24 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 25 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 26 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 27 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 28 [1 marks]
Which of the following best describes macroeconomic indicators?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 29 [1 marks]
Which of the following best describes international trade fundamentals?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss

Question 30 [1 marks]
Which of the following best describes microeconomic foundations and market mechanisms?
- A A short-run price adjustment
- B A long-run structural change in supply
- C A demand-side shock with secondary effects
- D An equilibrium outcome with no welfare loss
`,
  },
  {
    id: "igcse-p2-c",
    subject: "cambridge-igcse" as any,
    paper: "2",
    title: "Paper 2 — Set C",
    description: "Structured Questions. Set C — challenge — synoptic & evaluative.",
    totalMarks: 90,
    content: `# Cambridge IGCSE Economics (0455) (0455/2) — Structured Questions — Predicted Paper Set C

**Time: 135 minutes | Total: 90 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Government policies for growth:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to government policies for growth, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to government policies for growth, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to labour markets and wage differentials, explain two consequences of the issue.

Question 4 [9 marks]
With reference to government policies for growth, explain one government response to the issue.

Question 5 [12 marks]
With reference to government policies for growth, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of price determination and market failure, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of government policies for growth, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "igcse-p3-a",
    subject: "cambridge-igcse" as any,
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Synoptic Data Response. Set A — core practice.",
    totalMarks: 60,
    content: `# Cambridge IGCSE Economics (0455) (0455/3) — Synoptic Data Response — Predicted Paper Set A

**Time: 90 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Development economics and hdi comparison:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to development economics and HDI comparison, explain two consequences of the issue.

Question 2 [4 marks]
With reference to development economics and HDI comparison, explain one government response to the issue.

Question 3 [6 marks]
With reference to exchange rate movements and exporters, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to development economics and HDI comparison, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to inflation, unemployment and policy trade-offs, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of development economics and HDI comparison, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of inflation, unemployment and policy trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "igcse-p3-b",
    subject: "cambridge-igcse" as any,
    paper: "3",
    title: "Paper 3 — Set B",
    description: "Synoptic Data Response. Set B — stretch — applied scenarios.",
    totalMarks: 60,
    content: `# Cambridge IGCSE Economics (0455) (0455/3) — Synoptic Data Response — Predicted Paper Set B

**Time: 90 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Exchange rate movements and exporters:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to exchange rate movements and exporters, explain one government response to the issue.

Question 2 [4 marks]
With reference to exchange rate movements and exporters, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to exchange rate movements and exporters, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to exchange rate movements and exporters, explain two consequences of the issue.

Question 5 [12 marks]
With reference to inflation, unemployment and policy trade-offs, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of development economics and HDI comparison, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of inflation, unemployment and policy trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "igcse-p3-c",
    subject: "cambridge-igcse" as any,
    paper: "3",
    title: "Paper 3 — Set C",
    description: "Synoptic Data Response. Set C — challenge — synoptic & evaluative.",
    totalMarks: 60,
    content: `# Cambridge IGCSE Economics (0455) (0455/3) — Synoptic Data Response — Predicted Paper Set C

**Time: 90 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Inflation, unemployment and policy trade-offs:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to inflation, unemployment and policy trade-offs, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to inflation, unemployment and policy trade-offs, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to exchange rate movements and exporters, explain two consequences of the issue.

Question 4 [9 marks]
With reference to inflation, unemployment and policy trade-offs, explain one government response to the issue.

Question 5 [12 marks]
With reference to inflation, unemployment and policy trade-offs, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of development economics and HDI comparison, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of inflation, unemployment and policy trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  // ── Edexcel IGCSE Economics (4EC1) ──
  {
    id: "edxigcse-p1-a",
    subject: "edexcel-igcse" as any,
    paper: "1",
    title: "Paper 1 — Set A",
    description: "Microeconomics & Business Economics. Set A — core practice.",
    totalMarks: 80,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/01) — Microeconomics & Business Economics — Predicted Paper Set A

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Consumer demand and elasticity in the smartphone market:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to consumer demand and elasticity in the smartphone market, explain two consequences of the issue.

Question 2 [4 marks]
With reference to consumer demand and elasticity in the smartphone market, explain one government response to the issue.

Question 3 [6 marks]
With reference to business growth: organic vs takeover at Tesco, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to consumer demand and elasticity in the smartphone market, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to competitive markets and contestability, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of consumer demand and elasticity in the smartphone market, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of competitive markets and contestability, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p1-b",
    subject: "edexcel-igcse" as any,
    paper: "1",
    title: "Paper 1 — Set B",
    description: "Microeconomics & Business Economics. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/01) — Microeconomics & Business Economics — Predicted Paper Set B

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Business growth: organic vs takeover at tesco:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to business growth: organic vs takeover at Tesco, explain one government response to the issue.

Question 2 [4 marks]
With reference to business growth: organic vs takeover at Tesco, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to business growth: organic vs takeover at Tesco, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to business growth: organic vs takeover at Tesco, explain two consequences of the issue.

Question 5 [12 marks]
With reference to competitive markets and contestability, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of consumer demand and elasticity in the smartphone market, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of competitive markets and contestability, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p1-c",
    subject: "edexcel-igcse" as any,
    paper: "1",
    title: "Paper 1 — Set C",
    description: "Microeconomics & Business Economics. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/01) — Microeconomics & Business Economics — Predicted Paper Set C

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Competitive markets and contestability:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to competitive markets and contestability, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to competitive markets and contestability, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to business growth: organic vs takeover at Tesco, explain two consequences of the issue.

Question 4 [9 marks]
With reference to competitive markets and contestability, explain one government response to the issue.

Question 5 [12 marks]
With reference to competitive markets and contestability, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of consumer demand and elasticity in the smartphone market, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of competitive markets and contestability, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p2-a",
    subject: "edexcel-igcse" as any,
    paper: "2",
    title: "Paper 2 — Set A",
    description: "Macroeconomics & the Global Economy. Set A — core practice.",
    totalMarks: 80,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/02) — Macroeconomics & the Global Economy — Predicted Paper Set A

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Uk inflation, cpi and the bank of england's response:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to UK inflation, CPI and the Bank of England's response, explain two consequences of the issue.

Question 2 [4 marks]
With reference to UK inflation, CPI and the Bank of England's response, explain one government response to the issue.

Question 3 [6 marks]
With reference to balance of payments and the global manufacturing shift, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to UK inflation, CPI and the Bank of England's response, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to fiscal policy and the public finances, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK inflation, CPI and the Bank of England's response, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of fiscal policy and the public finances, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p2-b",
    subject: "edexcel-igcse" as any,
    paper: "2",
    title: "Paper 2 — Set B",
    description: "Macroeconomics & the Global Economy. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/02) — Macroeconomics & the Global Economy — Predicted Paper Set B

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Balance of payments and the global manufacturing shift:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to balance of payments and the global manufacturing shift, explain one government response to the issue.

Question 2 [4 marks]
With reference to balance of payments and the global manufacturing shift, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to balance of payments and the global manufacturing shift, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to balance of payments and the global manufacturing shift, explain two consequences of the issue.

Question 5 [12 marks]
With reference to fiscal policy and the public finances, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK inflation, CPI and the Bank of England's response, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of fiscal policy and the public finances, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p2-c",
    subject: "edexcel-igcse" as any,
    paper: "2",
    title: "Paper 2 — Set C",
    description: "Macroeconomics & the Global Economy. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/02) — Macroeconomics & the Global Economy — Predicted Paper Set C

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Fiscal policy and the public finances:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to fiscal policy and the public finances, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to fiscal policy and the public finances, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to balance of payments and the global manufacturing shift, explain two consequences of the issue.

Question 4 [9 marks]
With reference to fiscal policy and the public finances, explain one government response to the issue.

Question 5 [12 marks]
With reference to fiscal policy and the public finances, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK inflation, CPI and the Bank of England's response, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of fiscal policy and the public finances, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p3-a",
    subject: "edexcel-igcse" as any,
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Synoptic Application. Set A — core practice.",
    totalMarks: 60,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/03) — Synoptic Application — Predicted Paper Set A

**Time: 75 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Globalisation winners and losers: textiles in bangladesh:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to globalisation winners and losers: textiles in Bangladesh, explain two consequences of the issue.

Question 2 [4 marks]
With reference to globalisation winners and losers: textiles in Bangladesh, explain one government response to the issue.

Question 3 [6 marks]
With reference to exchange rates and UK exporters post-Brexit, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to globalisation winners and losers: textiles in Bangladesh, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to sustainable development and the green transition, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of globalisation winners and losers: textiles in Bangladesh, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of sustainable development and the green transition, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p3-b",
    subject: "edexcel-igcse" as any,
    paper: "3",
    title: "Paper 3 — Set B",
    description: "Synoptic Application. Set B — stretch — applied scenarios.",
    totalMarks: 60,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/03) — Synoptic Application — Predicted Paper Set B

**Time: 75 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Exchange rates and uk exporters post-brexit:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to exchange rates and UK exporters post-Brexit, explain one government response to the issue.

Question 2 [4 marks]
With reference to exchange rates and UK exporters post-Brexit, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to exchange rates and UK exporters post-Brexit, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to exchange rates and UK exporters post-Brexit, explain two consequences of the issue.

Question 5 [12 marks]
With reference to sustainable development and the green transition, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of globalisation winners and losers: textiles in Bangladesh, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of sustainable development and the green transition, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "edxigcse-p3-c",
    subject: "edexcel-igcse" as any,
    paper: "3",
    title: "Paper 3 — Set C",
    description: "Synoptic Application. Set C — challenge — synoptic & evaluative.",
    totalMarks: 60,
    content: `# Edexcel IGCSE Economics (4EC1) (4EC1/03) — Synoptic Application — Predicted Paper Set C

**Time: 75 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Sustainable development and the green transition:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to sustainable development and the green transition, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to sustainable development and the green transition, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to exchange rates and UK exporters post-Brexit, explain two consequences of the issue.

Question 4 [9 marks]
With reference to sustainable development and the green transition, explain one government response to the issue.

Question 5 [12 marks]
With reference to sustainable development and the green transition, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of globalisation winners and losers: textiles in Bangladesh, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of sustainable development and the green transition, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  // ── OCR GCSE Economics (J205) ──
  {
    id: "ocrgcse-p1-a",
    subject: "ocr-gcse" as any,
    paper: "1",
    title: "Paper 1 — Set A",
    description: "Introduction to Economics. Set A — core practice.",
    totalMarks: 80,
    content: `# OCR GCSE Economics (J205) (J205/01) — Introduction to Economics — Predicted Paper Set A

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Scarcity, choice and opportunity cost in households:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to scarcity, choice and opportunity cost in households, explain two consequences of the issue.

Question 2 [4 marks]
With reference to scarcity, choice and opportunity cost in households, explain one government response to the issue.

Question 3 [6 marks]
With reference to price mechanism and market failure in housing, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to scarcity, choice and opportunity cost in households, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to the role of money and the financial sector, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of scarcity, choice and opportunity cost in households, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the role of money and the financial sector, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p1-b",
    subject: "ocr-gcse" as any,
    paper: "1",
    title: "Paper 1 — Set B",
    description: "Introduction to Economics. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# OCR GCSE Economics (J205) (J205/01) — Introduction to Economics — Predicted Paper Set B

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Price mechanism and market failure in housing:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to price mechanism and market failure in housing, explain one government response to the issue.

Question 2 [4 marks]
With reference to price mechanism and market failure in housing, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to price mechanism and market failure in housing, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to price mechanism and market failure in housing, explain two consequences of the issue.

Question 5 [12 marks]
With reference to the role of money and the financial sector, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of scarcity, choice and opportunity cost in households, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the role of money and the financial sector, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p1-c",
    subject: "ocr-gcse" as any,
    paper: "1",
    title: "Paper 1 — Set C",
    description: "Introduction to Economics. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# OCR GCSE Economics (J205) (J205/01) — Introduction to Economics — Predicted Paper Set C

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — The role of money and the financial sector:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to the role of money and the financial sector, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to the role of money and the financial sector, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to price mechanism and market failure in housing, explain two consequences of the issue.

Question 4 [9 marks]
With reference to the role of money and the financial sector, explain one government response to the issue.

Question 5 [12 marks]
With reference to the role of money and the financial sector, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of scarcity, choice and opportunity cost in households, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the role of money and the financial sector, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p2-a",
    subject: "ocr-gcse" as any,
    paper: "2",
    title: "Paper 2 — Set A",
    description: "The National & International Economy. Set A — core practice.",
    totalMarks: 80,
    content: `# OCR GCSE Economics (J205) (J205/02) — The National & International Economy — Predicted Paper Set A

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Uk economic objectives and the policy mix:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to UK economic objectives and the policy mix, explain two consequences of the issue.

Question 2 [4 marks]
With reference to UK economic objectives and the policy mix, explain one government response to the issue.

Question 3 [6 marks]
With reference to international trade and protectionism, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to UK economic objectives and the policy mix, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to exchange rates and the UK's trade position, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK economic objectives and the policy mix, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of exchange rates and the UK's trade position, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p2-b",
    subject: "ocr-gcse" as any,
    paper: "2",
    title: "Paper 2 — Set B",
    description: "The National & International Economy. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# OCR GCSE Economics (J205) (J205/02) — The National & International Economy — Predicted Paper Set B

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — International trade and protectionism:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to international trade and protectionism, explain one government response to the issue.

Question 2 [4 marks]
With reference to international trade and protectionism, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to international trade and protectionism, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to international trade and protectionism, explain two consequences of the issue.

Question 5 [12 marks]
With reference to exchange rates and the UK's trade position, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK economic objectives and the policy mix, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of exchange rates and the UK's trade position, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p2-c",
    subject: "ocr-gcse" as any,
    paper: "2",
    title: "Paper 2 — Set C",
    description: "The National & International Economy. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# OCR GCSE Economics (J205) (J205/02) — The National & International Economy — Predicted Paper Set C

**Time: 90 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Exchange rates and the uk's trade position:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to exchange rates and the UK's trade position, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to exchange rates and the UK's trade position, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to international trade and protectionism, explain two consequences of the issue.

Question 4 [9 marks]
With reference to exchange rates and the UK's trade position, explain one government response to the issue.

Question 5 [12 marks]
With reference to exchange rates and the UK's trade position, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK economic objectives and the policy mix, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of exchange rates and the UK's trade position, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p3-a",
    subject: "ocr-gcse" as any,
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Synoptic Applied Economics. Set A — core practice.",
    totalMarks: 60,
    content: `# OCR GCSE Economics (J205) (J205/03) — Synoptic Applied Economics — Predicted Paper Set A

**Time: 75 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — The labour market and the national living wage:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to the labour market and the National Living Wage, explain two consequences of the issue.

Question 2 [4 marks]
With reference to the labour market and the National Living Wage, explain one government response to the issue.

Question 3 [6 marks]
With reference to environmental economics and the cost of net zero, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to the labour market and the National Living Wage, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to the global economy and emerging markets, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of the labour market and the National Living Wage, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the global economy and emerging markets, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p3-b",
    subject: "ocr-gcse" as any,
    paper: "3",
    title: "Paper 3 — Set B",
    description: "Synoptic Applied Economics. Set B — stretch — applied scenarios.",
    totalMarks: 60,
    content: `# OCR GCSE Economics (J205) (J205/03) — Synoptic Applied Economics — Predicted Paper Set B

**Time: 75 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Environmental economics and the cost of net zero:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to environmental economics and the cost of net zero, explain one government response to the issue.

Question 2 [4 marks]
With reference to environmental economics and the cost of net zero, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to environmental economics and the cost of net zero, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to environmental economics and the cost of net zero, explain two consequences of the issue.

Question 5 [12 marks]
With reference to the global economy and emerging markets, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of the labour market and the National Living Wage, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the global economy and emerging markets, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ocrgcse-p3-c",
    subject: "ocr-gcse" as any,
    paper: "3",
    title: "Paper 3 — Set C",
    description: "Synoptic Applied Economics. Set C — challenge — synoptic & evaluative.",
    totalMarks: 60,
    content: `# OCR GCSE Economics (J205) (J205/03) — Synoptic Applied Economics — Predicted Paper Set C

**Time: 75 minutes | Total: 60 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — The global economy and emerging markets:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to the global economy and emerging markets, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to the global economy and emerging markets, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to environmental economics and the cost of net zero, explain two consequences of the issue.

Question 4 [9 marks]
With reference to the global economy and emerging markets, explain one government response to the issue.

Question 5 [12 marks]
With reference to the global economy and emerging markets, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of the labour market and the National Living Wage, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the global economy and emerging markets, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  // ── IB Diploma Economics (IBDP) ──
  {
    id: "ib-p1-a",
    subject: "ib" as any,
    paper: "1",
    title: "Paper 1 — Set A",
    description: "Extended Response. Set A — core practice.",
    totalMarks: 25,
    content: `# IB Diploma Economics (IBDP) (IB/P1) — Extended Response — Predicted Paper Set A

**Time: 75 minutes | Total: 25 marks**

Answer ONE question from each section. Each question is worth 12 marks.

## Section A — Microeconomics

Question 1 [10 marks]
Evaluate the view that, in the context of market failure and government intervention, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 2 [15 marks]
Evaluate the view that, in the context of macroeconomic objectives and trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

## Section B — Macroeconomics

Question 3 [10 marks]
Evaluate the view that, in the context of macroeconomic objectives and trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 4 [15 marks]
Evaluate the view that, in the context of the global economy and economic development, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p1-b",
    subject: "ib" as any,
    paper: "1",
    title: "Paper 1 — Set B",
    description: "Extended Response. Set B — stretch — applied scenarios.",
    totalMarks: 25,
    content: `# IB Diploma Economics (IBDP) (IB/P1) — Extended Response — Predicted Paper Set B

**Time: 75 minutes | Total: 25 marks**

Answer ONE question from each section. Each question is worth 12 marks.

## Section A — Microeconomics

Question 1 [10 marks]
Evaluate the view that, in the context of market failure and government intervention, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 2 [15 marks]
Evaluate the view that, in the context of macroeconomic objectives and trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

## Section B — Macroeconomics

Question 3 [10 marks]
Evaluate the view that, in the context of macroeconomic objectives and trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 4 [15 marks]
Evaluate the view that, in the context of the global economy and economic development, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p1-c",
    subject: "ib" as any,
    paper: "1",
    title: "Paper 1 — Set C",
    description: "Extended Response. Set C — challenge — synoptic & evaluative.",
    totalMarks: 25,
    content: `# IB Diploma Economics (IBDP) (IB/P1) — Extended Response — Predicted Paper Set C

**Time: 75 minutes | Total: 25 marks**

Answer ONE question from each section. Each question is worth 12 marks.

## Section A — Microeconomics

Question 1 [10 marks]
Evaluate the view that, in the context of market failure and government intervention, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 2 [15 marks]
Evaluate the view that, in the context of macroeconomic objectives and trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

## Section B — Macroeconomics

Question 3 [10 marks]
Evaluate the view that, in the context of macroeconomic objectives and trade-offs, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 4 [15 marks]
Evaluate the view that, in the context of the global economy and economic development, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p2-a",
    subject: "ib" as any,
    paper: "2",
    title: "Paper 2 — Set A",
    description: "Data Response. Set A — core practice.",
    totalMarks: 40,
    content: `# IB Diploma Economics (IBDP) (IB/P2) — Data Response — Predicted Paper Set A

**Time: 105 minutes | Total: 40 marks**

Answer ALL parts. Refer to the data extract throughout.

**Extract 1:** Recent data on price controls in the rental market: a case study shows price levels rising 4.2% year-on-year, while real wages have grown only 1.1%. Policy responses have included a 0.5 percentage-point base-rate rise and targeted subsidies worth £2.1 bn.

Question 1 [2 marks]
With reference to price controls in the rental market: a case study, explain two consequences of the issue.

Question 2 [2 marks]
With reference to monetary policy in a small open economy, explain one government response to the issue.

Question 3 [4 marks]
With reference to price controls in the rental market: a case study, explain one factor that influences the issue.

Question 4 [4 marks]
With reference to monetary policy in a small open economy, explain one mechanism that determines the issue.

Question 5 [4 marks]
With reference to trade protection and the steel industry, explain two consequences of the issue.

Question 6 [9 marks]
With reference to price controls in the rental market: a case study, explain one government response to the issue.

Question 7 [15 marks]
Evaluate the view that, in the context of price controls in the rental market: a case study, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p2-b",
    subject: "ib" as any,
    paper: "2",
    title: "Paper 2 — Set B",
    description: "Data Response. Set B — stretch — applied scenarios.",
    totalMarks: 40,
    content: `# IB Diploma Economics (IBDP) (IB/P2) — Data Response — Predicted Paper Set B

**Time: 105 minutes | Total: 40 marks**

Answer ALL parts. Refer to the data extract throughout.

**Extract 1:** Recent data on monetary policy in a small open economy shows price levels rising 4.2% year-on-year, while real wages have grown only 1.1%. Policy responses have included a 0.5 percentage-point base-rate rise and targeted subsidies worth £2.1 bn.

Question 1 [2 marks]
With reference to monetary policy in a small open economy, explain one government response to the issue.

Question 2 [2 marks]
With reference to monetary policy in a small open economy, explain one factor that influences the issue.

Question 3 [4 marks]
With reference to monetary policy in a small open economy, explain one mechanism that determines the issue.

Question 4 [4 marks]
With reference to monetary policy in a small open economy, explain two consequences of the issue.

Question 5 [4 marks]
With reference to trade protection and the steel industry, explain one government response to the issue.

Question 6 [9 marks]
With reference to monetary policy in a small open economy, explain one factor that influences the issue.

Question 7 [15 marks]
Evaluate the view that, in the context of monetary policy in a small open economy, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p2-c",
    subject: "ib" as any,
    paper: "2",
    title: "Paper 2 — Set C",
    description: "Data Response. Set C — challenge — synoptic & evaluative.",
    totalMarks: 40,
    content: `# IB Diploma Economics (IBDP) (IB/P2) — Data Response — Predicted Paper Set C

**Time: 105 minutes | Total: 40 marks**

Answer ALL parts. Refer to the data extract throughout.

**Extract 1:** Recent data on trade protection and the steel industry shows price levels rising 4.2% year-on-year, while real wages have grown only 1.1%. Policy responses have included a 0.5 percentage-point base-rate rise and targeted subsidies worth £2.1 bn.

Question 1 [2 marks]
With reference to trade protection and the steel industry, explain one factor that influences the issue.

Question 2 [2 marks]
With reference to monetary policy in a small open economy, explain one mechanism that determines the issue.

Question 3 [4 marks]
With reference to trade protection and the steel industry, explain two consequences of the issue.

Question 4 [4 marks]
With reference to monetary policy in a small open economy, explain one government response to the issue.

Question 5 [4 marks]
With reference to trade protection and the steel industry, explain one factor that influences the issue.

Question 6 [9 marks]
With reference to trade protection and the steel industry, explain one mechanism that determines the issue.

Question 7 [15 marks]
Evaluate the view that, in the context of trade protection and the steel industry, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p3-a",
    subject: "ib" as any,
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Policy Paper (HL). Set A — core practice.",
    totalMarks: 30,
    content: `# IB Diploma Economics (IBDP) (IB/P3) — Policy Paper (HL) — Predicted Paper Set A

**Time: 75 minutes | Total: 30 marks**

Higher-Level Policy Paper. Use the data and your knowledge to recommend a policy response.

**Background:** A government is considering interventions in evaluating fiscal stimulus in a recession. Inflation is at 5.8%, unemployment at 4.6%, and the budget deficit at 4.1% of GDP.

Question 1 [2 marks]
With reference to evaluating fiscal stimulus in a recession, explain two consequences of the issue.

Question 2 [3 marks]
With reference to exchange-rate management for an emerging economy, explain one government response to the issue.

Question 3 [5 marks]
With reference to evaluating fiscal stimulus in a recession, explain one factor that influences the issue.

Question 4 [10 marks]
With reference to evaluating fiscal stimulus in a recession, explain one mechanism that determines the issue.

Question 5 [10 marks]
Evaluate the view that, in the context of evaluating fiscal stimulus in a recession, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p3-b",
    subject: "ib" as any,
    paper: "3",
    title: "Paper 3 — Set B",
    description: "Policy Paper (HL). Set B — stretch — applied scenarios.",
    totalMarks: 30,
    content: `# IB Diploma Economics (IBDP) (IB/P3) — Policy Paper (HL) — Predicted Paper Set B

**Time: 75 minutes | Total: 30 marks**

Higher-Level Policy Paper. Use the data and your knowledge to recommend a policy response.

**Background:** A government is considering interventions in exchange-rate management for an emerging economy. Inflation is at 5.8%, unemployment at 4.6%, and the budget deficit at 4.1% of GDP.

Question 1 [2 marks]
With reference to exchange-rate management for an emerging economy, explain one government response to the issue.

Question 2 [3 marks]
With reference to exchange-rate management for an emerging economy, explain one factor that influences the issue.

Question 3 [5 marks]
With reference to exchange-rate management for an emerging economy, explain one mechanism that determines the issue.

Question 4 [10 marks]
With reference to exchange-rate management for an emerging economy, explain two consequences of the issue.

Question 5 [10 marks]
Evaluate the view that, in the context of exchange-rate management for an emerging economy, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "ib-p3-c",
    subject: "ib" as any,
    paper: "3",
    title: "Paper 3 — Set C",
    description: "Policy Paper (HL). Set C — challenge — synoptic & evaluative.",
    totalMarks: 30,
    content: `# IB Diploma Economics (IBDP) (IB/P3) — Policy Paper (HL) — Predicted Paper Set C

**Time: 75 minutes | Total: 30 marks**

Higher-Level Policy Paper. Use the data and your knowledge to recommend a policy response.

**Background:** A government is considering interventions in policies to reduce income inequality. Inflation is at 5.8%, unemployment at 4.6%, and the budget deficit at 4.1% of GDP.

Question 1 [2 marks]
With reference to policies to reduce income inequality, explain one factor that influences the issue.

Question 2 [3 marks]
With reference to exchange-rate management for an emerging economy, explain one mechanism that determines the issue.

Question 3 [5 marks]
With reference to policies to reduce income inequality, explain two consequences of the issue.

Question 4 [10 marks]
With reference to policies to reduce income inequality, explain one government response to the issue.

Question 5 [10 marks]
Evaluate the view that, in the context of policies to reduce income inequality, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  // ── WJEC A-Level Economics ──
  {
    id: "wjec-p1-a",
    subject: "wjec" as any,
    paper: "1",
    title: "Paper 1 — Set A",
    description: "Markets, Business & the Allocation of Resources. Set A — core practice.",
    totalMarks: 80,
    content: `# WJEC A-Level Economics (1EC0/01) — Markets, Business & the Allocation of Resources — Predicted Paper Set A

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Oligopoly and collusion in uk supermarkets:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to oligopoly and collusion in UK supermarkets, explain two consequences of the issue.

Question 2 [4 marks]
With reference to oligopoly and collusion in UK supermarkets, explain one government response to the issue.

Question 3 [6 marks]
With reference to labour market failure and minimum wage, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to oligopoly and collusion in UK supermarkets, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to externalities in the energy sector, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of oligopoly and collusion in UK supermarkets, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of externalities in the energy sector, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p1-b",
    subject: "wjec" as any,
    paper: "1",
    title: "Paper 1 — Set B",
    description: "Markets, Business & the Allocation of Resources. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# WJEC A-Level Economics (1EC0/01) — Markets, Business & the Allocation of Resources — Predicted Paper Set B

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Labour market failure and minimum wage:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to labour market failure and minimum wage, explain one government response to the issue.

Question 2 [4 marks]
With reference to labour market failure and minimum wage, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to labour market failure and minimum wage, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to labour market failure and minimum wage, explain two consequences of the issue.

Question 5 [12 marks]
With reference to externalities in the energy sector, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of oligopoly and collusion in UK supermarkets, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of externalities in the energy sector, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p1-c",
    subject: "wjec" as any,
    paper: "1",
    title: "Paper 1 — Set C",
    description: "Markets, Business & the Allocation of Resources. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# WJEC A-Level Economics (1EC0/01) — Markets, Business & the Allocation of Resources — Predicted Paper Set C

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Externalities in the energy sector:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to externalities in the energy sector, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to externalities in the energy sector, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to labour market failure and minimum wage, explain two consequences of the issue.

Question 4 [9 marks]
With reference to externalities in the energy sector, explain one government response to the issue.

Question 5 [12 marks]
With reference to externalities in the energy sector, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of oligopoly and collusion in UK supermarkets, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of externalities in the energy sector, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p2-a",
    subject: "wjec" as any,
    paper: "2",
    title: "Paper 2 — Set A",
    description: "Macroeconomics & Public Policy. Set A — core practice.",
    totalMarks: 80,
    content: `# WJEC A-Level Economics (1EC0/02) — Macroeconomics & Public Policy — Predicted Paper Set A

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Uk fiscal policy and the budget deficit:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to UK fiscal policy and the budget deficit, explain two consequences of the issue.

Question 2 [4 marks]
With reference to UK fiscal policy and the budget deficit, explain one government response to the issue.

Question 3 [6 marks]
With reference to supply-side reform and productivity, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to UK fiscal policy and the budget deficit, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to monetary policy and inflation expectations, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK fiscal policy and the budget deficit, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of monetary policy and inflation expectations, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p2-b",
    subject: "wjec" as any,
    paper: "2",
    title: "Paper 2 — Set B",
    description: "Macroeconomics & Public Policy. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# WJEC A-Level Economics (1EC0/02) — Macroeconomics & Public Policy — Predicted Paper Set B

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Supply-side reform and productivity:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to supply-side reform and productivity, explain one government response to the issue.

Question 2 [4 marks]
With reference to supply-side reform and productivity, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to supply-side reform and productivity, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to supply-side reform and productivity, explain two consequences of the issue.

Question 5 [12 marks]
With reference to monetary policy and inflation expectations, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK fiscal policy and the budget deficit, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of monetary policy and inflation expectations, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p2-c",
    subject: "wjec" as any,
    paper: "2",
    title: "Paper 2 — Set C",
    description: "Macroeconomics & Public Policy. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# WJEC A-Level Economics (1EC0/02) — Macroeconomics & Public Policy — Predicted Paper Set C

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Monetary policy and inflation expectations:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to monetary policy and inflation expectations, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to monetary policy and inflation expectations, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to supply-side reform and productivity, explain two consequences of the issue.

Question 4 [9 marks]
With reference to monetary policy and inflation expectations, explain one government response to the issue.

Question 5 [12 marks]
With reference to monetary policy and inflation expectations, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of UK fiscal policy and the budget deficit, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of monetary policy and inflation expectations, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p3-a",
    subject: "wjec" as any,
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Applied Economics & Synoptic. Set A — core practice.",
    totalMarks: 100,
    content: `# WJEC A-Level Economics (1EC0/03) — Applied Economics & Synoptic — Predicted Paper Set A

**Time: 150 minutes | Total: 100 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Welsh economic development and devolution:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to welsh economic development and devolution, explain two consequences of the issue.

Question 2 [4 marks]
With reference to welsh economic development and devolution, explain one government response to the issue.

Question 3 [6 marks]
With reference to global trade imbalances and the WTO, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to welsh economic development and devolution, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to the green transition and just-transition policy, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of welsh economic development and devolution, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the green transition and just-transition policy, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p3-b",
    subject: "wjec" as any,
    paper: "3",
    title: "Paper 3 — Set B",
    description: "Applied Economics & Synoptic. Set B — stretch — applied scenarios.",
    totalMarks: 100,
    content: `# WJEC A-Level Economics (1EC0/03) — Applied Economics & Synoptic — Predicted Paper Set B

**Time: 150 minutes | Total: 100 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Global trade imbalances and the wto:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to global trade imbalances and the WTO, explain one government response to the issue.

Question 2 [4 marks]
With reference to global trade imbalances and the WTO, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to global trade imbalances and the WTO, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to global trade imbalances and the WTO, explain two consequences of the issue.

Question 5 [12 marks]
With reference to the green transition and just-transition policy, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of welsh economic development and devolution, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the green transition and just-transition policy, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "wjec-p3-c",
    subject: "wjec" as any,
    paper: "3",
    title: "Paper 3 — Set C",
    description: "Applied Economics & Synoptic. Set C — challenge — synoptic & evaluative.",
    totalMarks: 100,
    content: `# WJEC A-Level Economics (1EC0/03) — Applied Economics & Synoptic — Predicted Paper Set C

**Time: 150 minutes | Total: 100 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — The green transition and just-transition policy:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to the green transition and just-transition policy, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to the green transition and just-transition policy, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to global trade imbalances and the WTO, explain two consequences of the issue.

Question 4 [9 marks]
With reference to the green transition and just-transition policy, explain one government response to the issue.

Question 5 [12 marks]
With reference to the green transition and just-transition policy, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of welsh economic development and devolution, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the green transition and just-transition policy, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  // ── Eduqas A-Level Economics ──
  {
    id: "eduqas-p1-a",
    subject: "eduqas" as any,
    paper: "1",
    title: "Paper 1 — Set A",
    description: "Markets & Market Failure. Set A — core practice.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A510QS/01) — Markets & Market Failure — Predicted Paper Set A

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Price discrimination in the airline industry:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to price discrimination in the airline industry, explain two consequences of the issue.

Question 2 [4 marks]
With reference to price discrimination in the airline industry, explain one government response to the issue.

Question 3 [6 marks]
With reference to monopoly power in tech: investigating Google, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to price discrimination in the airline industry, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to behavioural economics and consumer nudges, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of price discrimination in the airline industry, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of behavioural economics and consumer nudges, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p1-b",
    subject: "eduqas" as any,
    paper: "1",
    title: "Paper 1 — Set B",
    description: "Markets & Market Failure. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A510QS/01) — Markets & Market Failure — Predicted Paper Set B

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Monopoly power in tech: investigating google:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to monopoly power in tech: investigating Google, explain one government response to the issue.

Question 2 [4 marks]
With reference to monopoly power in tech: investigating Google, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to monopoly power in tech: investigating Google, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to monopoly power in tech: investigating Google, explain two consequences of the issue.

Question 5 [12 marks]
With reference to behavioural economics and consumer nudges, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of price discrimination in the airline industry, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of behavioural economics and consumer nudges, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p1-c",
    subject: "eduqas" as any,
    paper: "1",
    title: "Paper 1 — Set C",
    description: "Markets & Market Failure. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A510QS/01) — Markets & Market Failure — Predicted Paper Set C

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Behavioural economics and consumer nudges:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to behavioural economics and consumer nudges, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to behavioural economics and consumer nudges, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to monopoly power in tech: investigating Google, explain two consequences of the issue.

Question 4 [9 marks]
With reference to behavioural economics and consumer nudges, explain one government response to the issue.

Question 5 [12 marks]
With reference to behavioural economics and consumer nudges, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of price discrimination in the airline industry, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of behavioural economics and consumer nudges, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p2-a",
    subject: "eduqas" as any,
    paper: "2",
    title: "Paper 2 — Set A",
    description: "Macroeconomic Performance & Policy. Set A — core practice.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A510QS/02) — Macroeconomic Performance & Policy — Predicted Paper Set A

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — The uk output gap and the recovery:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to the UK output gap and the recovery, explain two consequences of the issue.

Question 2 [4 marks]
With reference to the UK output gap and the recovery, explain one government response to the issue.

Question 3 [6 marks]
With reference to supply-side policy and the productivity puzzle, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to the UK output gap and the recovery, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to exchange rate regimes and the eurozone, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of the UK output gap and the recovery, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of exchange rate regimes and the eurozone, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p2-b",
    subject: "eduqas" as any,
    paper: "2",
    title: "Paper 2 — Set B",
    description: "Macroeconomic Performance & Policy. Set B — stretch — applied scenarios.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A510QS/02) — Macroeconomic Performance & Policy — Predicted Paper Set B

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Supply-side policy and the productivity puzzle:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to supply-side policy and the productivity puzzle, explain one government response to the issue.

Question 2 [4 marks]
With reference to supply-side policy and the productivity puzzle, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to supply-side policy and the productivity puzzle, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to supply-side policy and the productivity puzzle, explain two consequences of the issue.

Question 5 [12 marks]
With reference to exchange rate regimes and the eurozone, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of the UK output gap and the recovery, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of exchange rate regimes and the eurozone, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p2-c",
    subject: "eduqas" as any,
    paper: "2",
    title: "Paper 2 — Set C",
    description: "Macroeconomic Performance & Policy. Set C — challenge — synoptic & evaluative.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A510QS/02) — Macroeconomic Performance & Policy — Predicted Paper Set C

**Time: 120 minutes | Total: 80 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Exchange rate regimes and the eurozone:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to exchange rate regimes and the eurozone, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to exchange rate regimes and the eurozone, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to supply-side policy and the productivity puzzle, explain two consequences of the issue.

Question 4 [9 marks]
With reference to exchange rate regimes and the eurozone, explain one government response to the issue.

Question 5 [12 marks]
With reference to exchange rate regimes and the eurozone, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of the UK output gap and the recovery, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of exchange rate regimes and the eurozone, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p3-a",
    subject: "eduqas" as any,
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Themes in Applied Economics. Set A — core practice.",
    totalMarks: 100,
    content: `# Eduqas A-Level Economics (A510QS/03) — Themes in Applied Economics — Predicted Paper Set A

**Time: 150 minutes | Total: 100 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Financial markets and the 2008 crisis revisited:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to financial markets and the 2008 crisis revisited, explain two consequences of the issue.

Question 2 [4 marks]
With reference to financial markets and the 2008 crisis revisited, explain one government response to the issue.

Question 3 [6 marks]
With reference to developing economies: poverty traps and aid, explain one factor that influences the issue.

Question 4 [9 marks]
With reference to financial markets and the 2008 crisis revisited, explain one mechanism that determines the issue.

Question 5 [12 marks]
With reference to the future of work: AI and labour displacement, explain two consequences of the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of financial markets and the 2008 crisis revisited, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the future of work: AI and labour displacement, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p3-b",
    subject: "eduqas" as any,
    paper: "3",
    title: "Paper 3 — Set B",
    description: "Themes in Applied Economics. Set B — stretch — applied scenarios.",
    totalMarks: 100,
    content: `# Eduqas A-Level Economics (A510QS/03) — Themes in Applied Economics — Predicted Paper Set B

**Time: 150 minutes | Total: 100 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — Developing economies: poverty traps and aid:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to developing economies: poverty traps and aid, explain one government response to the issue.

Question 2 [4 marks]
With reference to developing economies: poverty traps and aid, explain one factor that influences the issue.

Question 3 [6 marks]
With reference to developing economies: poverty traps and aid, explain one mechanism that determines the issue.

Question 4 [9 marks]
With reference to developing economies: poverty traps and aid, explain two consequences of the issue.

Question 5 [12 marks]
With reference to the future of work: AI and labour displacement, explain one government response to the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of financial markets and the 2008 crisis revisited, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the future of work: AI and labour displacement, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
  {
    id: "eduqas-p3-c",
    subject: "eduqas" as any,
    paper: "3",
    title: "Paper 3 — Set C",
    description: "Themes in Applied Economics. Set C — challenge — synoptic & evaluative.",
    totalMarks: 100,
    content: `# Eduqas A-Level Economics (A510QS/03) — Themes in Applied Economics — Predicted Paper Set C

**Time: 150 minutes | Total: 100 marks**

Answer ALL questions in Section A and ONE question from Section B.

## Section A: Data Response

**Extract 1 — The future of work: ai and labour displacement:** Industry data shows demand has shifted by 8% in the past year while supply-side conditions have tightened. Average prices rose by 6.4%, output fell 2.1%, and consumer real incomes declined by 1.9%. Policymakers have responded with a mix of subsidies, regulation and monetary tightening.

**Figure 1:** | Year | Price Index | Output (000 units) | Real Wages Index |
|------|-------------|---------------------|------------------|
| 2021 | 100 | 540 | 100 |
| 2022 | 104 | 528 | 99 |
| 2023 | 108 | 522 | 98 |
| 2024 | 115 | 510 | 96 |

Question 1 [2 marks]
With reference to the future of work: AI and labour displacement, explain one factor that influences the issue.

Question 2 [4 marks]
With reference to the future of work: AI and labour displacement, explain one mechanism that determines the issue.

Question 3 [6 marks]
With reference to developing economies: poverty traps and aid, explain two consequences of the issue.

Question 4 [9 marks]
With reference to the future of work: AI and labour displacement, explain one government response to the issue.

Question 5 [12 marks]
With reference to the future of work: AI and labour displacement, explain one factor that influences the issue.

## Section B: Essay (choose ONE)

Question 6 [25 marks]
Evaluate the view that, in the context of financial markets and the 2008 crisis revisited, government intervention is more effective than market forces in achieving an efficient and equitable outcome.

Question 7 [25 marks]
Evaluate the view that, in the context of the future of work: AI and labour displacement, government intervention is more effective than market forces in achieving an efficient and equitable outcome.
`,
  },
];