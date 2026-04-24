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
    subject: "cambridge-igcse",
    paper: "2",
    title: "Paper 2 Data Response & Essays — Set C",
    description: "Cambridge IGCSE Paper 2. Set C — Advanced. Verbatim from official-style mock.",
    totalMarks: 60,
    content: `# Cambridge International AS & A Level Economics (9708/02A) — Paper 2 AS Level Data Response and Essays — Predicted Paper 2026 Practice Series 2026

**Time: 2 hours | Total: 60 marks**

Answer three questions in total: Section A: answer Question 1. Section B: answer one question. Section C: answer one question.

## Section A (20 marks)

Answer all parts of question 1.

**1 The United States economy: a policy dilemma in 2023–2024**

The United States economy has faced an unusual combination of conditions since 2022. Headline CPI inflation peaked at 9.1% in June 2022 — a 40-year high — before declining to 3.2% by October 2023. Nevertheless, 'core' inflation (excluding food and energy) remained persistently above 4%, and the Federal Reserve raised its federal funds target range from 0.00–0.25% in March 2022 to 5.25–5.50% by July 2023. Unemployment remained near historic lows at 3.7%, whilst the labour force participation rate rose back to its pre-pandemic level. Wage growth averaged 4.5% annually, which some economists argued was sustaining inflationary pressure through a 'wage-driven' channel rather than a traditional wage–price spiral.

At the same time, the US dollar appreciated by over 15% against a basket of currencies between January 2022 and October 2023, raising concerns in emerging markets about capital outflows and higher dollar-denominated debt burdens. The Biden administration enacted the Inflation Reduction Act (2022), a $369 billion package of climate and clean-energy subsidies, and the CHIPS Act, which provided $52 billion in semiconductor manufacturing subsidies. Critics argued these fiscal measures worked against the Federal Reserve's tightening. Commentators disagreed on whether the US could achieve a 'soft landing' — bringing inflation to target without a recession — or whether a 'hard landing' with higher unemployment was unavoidable.

**Table 1.1 United States — key macroeconomic and labour market data**

| Indicator | 2021 | 2022 | 2023 |
| --- | --- | --- | --- |
| Real GDP growth (%) | 5.8 | 1.9 | 2.5 |
| Headline CPI inflation (%, annual avg) | 4.7 | 8.0 | 4.1 |
| Core CPI inflation (%, annual avg) | 3.6 | 6.2 | 4.8 |
| Unemployment rate (%) | 5.4 | 3.6 | 3.6 |
| Nominal wage growth (%) | 4.9 | 5.2 | 4.5 |
| Federal budget deficit (% of GDP) | –12.3 | –5.4 | –6.3 |
| USD trade-weighted index (Jan 2020=100) | 105.3 | 118.7 | 121.5 |
*Source: adapted from Bureau of Economic Analysis, BLS, Federal Reserve, 2024*

Question 1a(i) [1 marks]
Using Table 1.1, calculate the gap between headline and core CPI inflation in 2022.

Question 1a(ii) [1 marks]
Identify the trend in the US federal budget deficit between 2021 and 2023.

Question 1b [2 marks]
Explain, using examples from the data, two reasons why real GDP growth may not be a reliable measure of changes in living standards in the US.

Question 1c [4 marks]
Consider whether persistent core inflation of 4.8% alongside unemployment of 3.6% indicates that the US economy is operating above its potential output.

Question 1d [6 marks]
Assess the extent to which the appreciation of the US dollar between 2022 and 2023 would have helped the Federal Reserve reduce US inflation.

Question 1e [6 marks]
Assess the extent to which simultaneous expansionary fiscal policy (through the Inflation Reduction Act and CHIPS Act) and contractionary monetary policy would make it more difficult for the US to achieve a 'soft landing'.

## Section B (20 marks)

Answer one question.

EITHER

Question 2a [8 marks]
With the help of diagrams, explain the concepts of consumer surplus and producer surplus, and consider the effect of a maximum price set below the market equilibrium on the distribution of economic welfare.

Question 2b [12 marks]
Assess the extent to which knowledge of both the price elasticity of demand and the price elasticity of supply is necessary for a government to predict the effects of an indirect tax on a particular market.

OR

Question 3a [8 marks]
Explain the difference between a merit good and a public good, and consider why each type of good presents a different type of market failure that justifies government intervention.

Question 3b [12 marks]
Assess whether direct provision by the government is always the most efficient way to correct market failures associated with merit goods such as healthcare and education in a developed economy.

## Section C (20 marks)

Answer one question.

EITHER

Question 4a [8 marks]
Using an AD/AS diagram, explain the difference between demand-side and supply-side causes of economic growth, and consider which is likely to be a more sustainable source of rising living standards.

Question 4b [12 marks]
Assess the extent to which supply-side policies aimed at raising productivity are the most effective way for a developed economy such as the UK to achieve stable, non-inflationary growth.

OR

Question 5a [8 marks]
Explain the difference between a fixed exchange rate, a managed floating exchange rate and a freely floating exchange rate, and consider one advantage of each system for a developed economy.

Question 5b [12 marks]
The Eurozone uses a single currency whilst the UK maintains a floating pound sterling. Assess whether joining a single currency area is always beneficial for a developed economy's macroeconomic stability.`,
  },
  {
    id: "igcse-p3-a",
    subject: "cambridge-igcse",
    paper: "3",
    title: "Paper 3 Multiple Choice — Set A",
    description: "Cambridge IGCSE Paper 3. Set A — Moderate. Verbatim from official-style mock.",
    totalMarks: 30,
    content: `# Cambridge International AS & A Level Economics (9708) — Paper 3 A Level Multiple Choice — Predicted Paper Set A (Moderate)

**Time: 1 hour 15 minutes | Total: 30 marks**

Answer ALL questions.

Question 1 [1 marks]
A consumer allocates their income between two goods to maximise total utility. The consumer is in equilibrium. What is the condition for this equilibrium?
- A The marginal utility of both goods is zero.
- B The marginal utility of both goods is equal.
- C The marginal utility per dollar spent on each good is equal.
- D The total utility of each good is equal.

Question 2 [1 marks]
Which statement best describes allocative efficiency?
- A Price equals the lowest average cost.
- B Price equals marginal cost.
- C Average revenue equals average cost.
- D Marginal revenue equals marginal cost.

Question 3 [1 marks]
In the short run, a firm in perfect competition will continue to produce, despite making a loss, as long as:
- A total revenue exceeds total cost.
- B average revenue exceeds average total cost.
- C average revenue exceeds average variable cost.
- D marginal revenue exceeds average fixed cost.

Question 4 [1 marks]
Which of the following is a characteristic of a monopoly?
- A A large number of firms.
- B Freedom of entry to the market.
- C Significant barriers to entry.
- D Firms are price takers.

Question 5 [1 marks]
A firm doubles all its inputs and output more than doubles. This illustrates:
- A diseconomies of scale.
- B constant returns to scale.
- C economies of scale.
- D diminishing marginal returns.

Question 6 [1 marks]
Which of the following is most likely to be an example of price discrimination?
- A A restaurant charging more for meals at weekends.
- B A train company charging different fares at peak and off-peak times for the same journey.
- C A supermarket charging a higher price for premium-brand products than for own-brand.
- D A car manufacturer charging more for a car with a more powerful engine.

Question 7 [1 marks]
An oligopolistic market is most likely to be characterised by:
- A price-taking behaviour.
- B perfect information.
- C mutual interdependence between firms.
- D homogeneous products.

Question 8 [1 marks]
A contestable market is one in which:
- A firms make supernormal profit in the long run.
- B entry and exit are costless.
- C only one firm operates.
- D government regulation prevents competition.

Question 9 [1 marks]
The marginal revenue product (MRP) of labour is equal to:
- A the marginal product of labour.
- B the marginal cost of labour.
- C the marginal product of labour multiplied by the marginal revenue of output.
- D the wage rate.

Question 10 [1 marks]
A trade union successfully negotiates a wage rate above the equilibrium wage in a competitive labour market. The most likely consequence is:
- A an increase in employment in that market.
- B unemployment in that market.
- C higher marginal productivity.
- D an inward shift of the supply of labour.

Question 11 [1 marks]
A negative externality of production exists when:
- A marginal private cost exceeds marginal social cost.
- B marginal social cost exceeds marginal private cost.
- C marginal private benefit exceeds marginal social benefit.
- D marginal social benefit exceeds marginal private benefit.

Question 12 [1 marks]
The Coase theorem suggests that externalities can be internalised if:
- A the government imposes a Pigouvian tax.
- B the government issues tradable permits.
- C property rights are clearly defined and transaction costs are low.
- D firms are nationalised.

Question 13 [1 marks]
Which of the following is most likely to be classified as a public good?
- A Basic healthcare provided by the state.
- B State school education.
- C A public park open to all.
- D A lighthouse providing warning signals to ships.

Question 14 [1 marks]
Government failure may arise when:
- A markets fully internalise externalities.
- B the cost of government intervention exceeds the benefits.
- C property rights are clearly defined.
- D firms earn normal profits.

Question 15 [1 marks]
Asymmetric information in an insurance market can lead to:
- A perfect competition.
- B economies of scale.
- C adverse selection.
- D allocative efficiency.

Question 16 [1 marks]
The Gini coefficient is a measure of:
- A the rate of economic growth.
- B inflation.
- C income inequality.
- D unemployment.

Question 17 [1 marks]
Which of the following is most likely to increase the long-run potential output of an economy?
- A An increase in aggregate demand.
- B A cut in interest rates.
- C An increase in investment in education.
- D A depreciation of the currency.

Question 18 [1 marks]
The Human Development Index (HDI) includes all of the following EXCEPT:
- A life expectancy at birth.
- B years of schooling.
- C gross national income per capita.
- D the rate of inflation.

Question 19 [1 marks]
If the marginal propensity to consume is 0.8, the value of the simple spending multiplier is:
- A 1.25
- B 1.8
- C 4
- D 5

Question 20 [1 marks]
Demand-pull inflation is most likely to be caused by:
- A a fall in labour productivity.
- B an increase in the price of imported raw materials.
- C a rise in indirect taxes.
- D a rise in consumer spending when the economy is near full employment.

Question 21 [1 marks]
The short-run Phillips curve shows the relationship between:
- A economic growth and inflation.
- B unemployment and inflation.
- C unemployment and economic growth.
- D interest rates and inflation.

Question 22 [1 marks]
An increase in the Bank Rate is most likely to:
- A increase consumer spending.
- B increase aggregate demand.
- C decrease the exchange rate.
- D decrease investment.

Question 23 [1 marks]
A government pursuing expansionary fiscal policy is most likely to:
- A raise income tax rates.
- B reduce government spending.
- C reduce direct taxes.
- D increase the Bank Rate.

Question 24 [1 marks]
Which of the following is a supply-side policy?
- A A rise in VAT.
- B A reduction in the Bank Rate.
- C Investment in training and education.
- D An increase in unemployment benefits.

Question 25 [1 marks]
The Marshall–Lerner condition is satisfied when:
- A PEDx + PEDm > 1
- B PEDx + PEDm < 1
- C PEDx = PEDm
- D PEDx – PEDm = 1

Question 26 [1 marks]
A country with a persistent current account deficit must necessarily have:
- A a capital/financial account surplus.
- B a capital/financial account deficit.
- C a balanced capital/financial account.
- D a floating exchange rate.

Question 27 [1 marks]
Absolute advantage exists when a country can produce a good:
- A with a lower opportunity cost than another country.
- B with a higher opportunity cost than another country.
- C using fewer resources than another country.
- D using more resources than another country.

Question 28 [1 marks]
A tariff on imported steel in the US is most likely to:
- A increase consumer surplus in the US.
- B decrease producer surplus in the US.
- C decrease the price paid by US consumers.
- D decrease the quantity of steel imported.

Question 29 [1 marks]
Which organisation aims to promote free international trade?
- A International Monetary Fund (IMF)
- B World Bank
- C World Trade Organization (WTO)
- D Organisation for Economic Co-operation and Development (OECD)

Question 30 [1 marks]
A depreciation of the UK pound against the euro is likely to:
- A make UK exports to the Eurozone more expensive.
- B make UK imports from the Eurozone cheaper.
- C improve the UK current account if the Marshall–Lerner condition holds.
- D reduce UK inflation.`,
  },
  {
    id: "igcse-p3-b",
    subject: "cambridge-igcse",
    paper: "3",
    title: "Paper 3 Multiple Choice — Set B",
    description: "Cambridge IGCSE Paper 3. Set B — Hard. Verbatim from official-style mock.",
    totalMarks: 30,
    content: `# Cambridge International AS & A Level Economics (9708/03H) — Paper 3 A Level Multiple Choice — Predicted Paper Set B (Hard)

**Time: 1 hour 15 minutes | Total: 30 marks**
Answer all questions.

Question 1 [1 marks]
A consumer buys two goods, X and Y. The marginal utility of X is 20 utils at the current consumption level and the marginal utility of Y is 30 utils. The price of X is $4 and the price of Y is $5. To maximise total utility, the consumer should:
- A buy more X and less Y.
- B buy more Y and less X.
- C keep consumption unchanged.
- D consume only Y.

Question 2 [1 marks]
The law of diminishing marginal utility implies that as consumption of a good rises:
- A total utility becomes negative immediately.
- B the marginal utility of each successive unit falls.
- C the price the consumer is willing to pay rises.
- D the demand curve slopes upward.

Question 3 [1 marks]
A firm's total cost of producing 100 units is $500 and the total cost of producing 101 units is $508. The marginal cost of the 101st unit is:
- A $5.00
- B $5.08
- C $8.00
- D $503.00

Question 4 [1 marks]
In the long run, a firm in perfect competition makes:
- A supernormal profit.
- B subnormal profit.
- C normal profit only.
- D a loss equal to fixed costs.

Question 5 [1 marks]
A monopolist faces a downward-sloping demand curve. At the profit-maximising output:
- A price equals marginal cost.
- B marginal revenue equals marginal cost, and price exceeds marginal cost.
- C price equals average revenue equals marginal cost.
- D marginal revenue is negative.

Question 6 [1 marks]
A concentration ratio measures:
- A the productivity of an industry.
- B the share of total market output of the largest n firms.
- C the number of firms in an industry.
- D the profit of the largest firm.

Question 7 [1 marks]
Two firms in a duopoly face the following payoff matrix (profits are in $m and shown for Firm A, Firm B):

| | Firm B: Low Price | Firm B: High Price |
| :--- | :--- | :--- |
| **Firm A: Low Price** | 10, 10 | 40, 5 |
| **Firm A: High Price** | 5, 40 | 25, 25 |

What is the dominant strategy for Firm A?
- A Charge a high price, regardless of B's choice.
- B Charge a low price, regardless of B's choice.
- C Match Firm B's price.
- D There is no dominant strategy.

Question 8 [1 marks]
Which of the following is most consistent with the existence of barriers to entry?
- A Firms in the industry earn only normal profit in the long run.
- B Firms in the industry earn supernormal profit in the long run.
- C The price equals average cost at minimum.
- D The long-run supply curve is horizontal.

Question 9 [1 marks]
A perfectly contestable market will, in equilibrium, display:
- A price above marginal cost.
- B persistent supernormal profit.
- C price equal to average cost, even with only one firm.
- D significant economies of scale for each firm.

Question 10 [1 marks]
The production possibility curve (PPC) of an economy becomes more bowed (concave to the origin) if:
- A resources are equally suited to producing both goods.
- B resources are specialised and not equally suited to producing both goods.
- C the economy experiences constant opportunity costs.
- D the economy is operating below full capacity.

Question 11 [1 marks]
In a perfectly competitive labour market, the marginal cost of labour to the firm is equal to:
- A the average revenue product of labour.
- B the marginal revenue product of labour.
- C the going wage rate.
- D zero.

Question 12 [1 marks]
A monopsonist in a labour market (single dominant employer) sets the wage rate and quantity of labour such that:
- A the wage rate equals the marginal revenue product of labour.
- B the marginal cost of labour equals the marginal revenue product of labour, and the wage rate is below the MRP.
- C the wage is above the marginal revenue product of labour.
- D the wage equals the average cost of labour.

Question 13 [1 marks]
Which of the following is most likely to increase wage differentials between high-skilled and low-skilled workers in a developed economy?
- A A legal minimum wage set above the equilibrium wage for low-skilled labour.
- B An increase in the supply of high-skilled workers.
- C Skill-biased technological change that raises the productivity of high-skilled workers.
- D Trade union activity limited to the high-skilled sector only.

Question 14 [1 marks]
A government introduces a per-unit tax on the production of a demerit good. The fall in consumption will be greater if:
- A demand for the good is inelastic.
- B supply for the good is inelastic.
- C demand for the good is elastic.
- D both demand and supply are inelastic.

Question 15 [1 marks]
The optimal level of pollution in an economy, from the perspective of economic efficiency, is where:
- A pollution is zero.
- B the marginal benefit of pollution abatement equals its marginal cost.
- C the marginal cost of production is zero.
- D the marginal private benefit of consumption equals the marginal social cost.

Question 16 [1 marks]
A country's nominal GDP is $500 billion and its real GDP in base-year prices is $400 billion. The GDP deflator is:
- A 80.0
- B 100.0
- C 125.0
- D 200.0

Question 17 [1 marks]
In an economy with a marginal propensity to save of 0.25, a marginal rate of taxation of 0.15 and a marginal propensity to import of 0.1, the value of the multiplier is:
- A 1.0
- B 1.67
- C 2.0
- D 4.0

Question 18 [1 marks]
The natural rate of unemployment (NAIRU) is the rate at which:
- A all unemployment is cyclical.
- B cyclical unemployment is zero and inflation is stable.
- C real wages are maximised.
- D aggregate demand equals potential output at zero inflation.

Question 19 [1 marks]
An increase in labour productivity would most likely:
- A shift both AD and LRAS to the right.
- B shift only AD to the right.
- C shift LRAS to the right, putting downward pressure on the price level.
- D have no effect on LRAS.

Question 20 [1 marks]
The quantity theory of money (MV = PY) predicts that, in the long run, if V and Y are constant, a 10% rise in the money supply will cause:
- A a 10% rise in real output.
- B a 10% rise in the price level.
- C a 10% rise in nominal interest rates.
- D a 10% fall in the velocity of money.

Question 21 [1 marks]
A central bank pursuing an inflation target will most likely respond to a rise in demand-pull inflation by:
- A cutting the official interest rate.
- B raising the official interest rate.
- C selling government bonds in exchange for the domestic currency, only if the money supply is contracting.
- D devaluing the currency.

Question 22 [1 marks]
A government seeking to reduce structural unemployment would most likely:
- A raise unemployment benefits substantially.
- B reduce taxes on corporate profits.
- C invest in retraining programmes targeted at displaced workers.
- D restrict international trade.

Question 23 [1 marks]
The J-curve effect describes how, after a currency depreciation:
- A the current account improves immediately.
- B the current account worsens initially and then improves as quantities adjust.
- C the current account worsens permanently.
- D the financial account adjusts to offset the current account.

Question 24 [1 marks]
A country with a GDP per capita of $30,000, a life expectancy of 82 years and mean years of schooling of 13 will typically have:
- A a low HDI value below 0.5.
- B an HDI value indicating very high human development.
- C a GDP per capita too low for classification.
- D an HDI value below 0.7.

Question 25 [1 marks]
Comparative advantage exists when a country can produce a good:
- A using fewer resources than another country.
- B at a lower opportunity cost than another country.
- C at a lower wage rate than another country.
- D with a higher productivity level than another country.

Question 26 [1 marks]
An import quota differs from a tariff in that:
- A a quota generates government revenue but a tariff does not.
- B a tariff restricts quantity directly, while a quota raises price directly.
- C a quota restricts quantity directly, while a tariff raises price directly.
- D a quota is always more economically efficient.

Question 27 [1 marks]
Which is the most likely consequence of a successful currency union between several small open economies?
- A Loss of a common monetary policy.
- B Reduction in intra-union trade.
- C Elimination of exchange rate risk between members.
- D An increase in transaction costs between members.

Question 28 [1 marks]
A country's central bank intervenes to prevent its currency from appreciating. The most likely action is:
- A selling foreign currency reserves and buying its own currency.
- B buying foreign currency reserves and selling its own currency.
- C raising its official interest rate.
- D imposing capital controls on outflows.

Question 29 [1 marks]
The Lorenz curve for Country X lies further from the 45° line of perfect equality than the Lorenz curve for Country Y. This indicates that:
- A Country X has a higher GDP per capita than Y.
- B Country X has a higher HDI than Y.
- C Country X has greater income inequality than Y.
- D Country X has a lower Gini coefficient than Y.

Question 30 [1 marks]
Which of the following would most effectively reduce absolute poverty in a developing country in the short run?
- A Removing all agricultural subsidies.
- B Direct cash transfers to poor households.
- C Raising import tariffs on consumer goods.
- D Increasing restrictions on foreign direct investment.`,
  },
  {
    id: "igcse-p3-c",
    subject: "cambridge-igcse",
    paper: "3",
    title: "Paper 3 Multiple Choice — Set C",
    description: "Cambridge IGCSE Paper 3. Set C — Advanced. Verbatim from official-style mock.",
    totalMarks: 30,
    content: `# Cambridge IGCSE Economics — Paper 3 Multiple Choice — Set C (Advanced)

**Time: 1 hour 15 minutes | Total: 30 marks**
Answer ALL questions.

Question 1 [1 marks]
A consumer's indifference curve is convex to the origin. Which statement correctly describes the implied diminishing marginal rate of substitution (MRS)?
- A The consumer is willing to give up less of good Y for each additional unit of good X as X becomes more abundant.
- B The marginal utility of both goods is constant.
- C The consumer is always willing to substitute X for Y at the same rate.
- D The slope of the indifference curve is always equal to the price ratio.

Question 2 [1 marks]
A firm is a monopolist in its product market and a monopsonist in its labour market. Compared with perfect competition in both markets, the firm will most likely:
- A produce less output and employ more labour, paying a higher wage.
- B produce less output and employ less labour, paying a lower wage.
- C produce more output and employ fewer workers, paying a higher wage.
- D produce the same output but employ fewer workers.

Question 3 [1 marks]
An industry is characterised by large economies of scale such that the long-run average cost curve continues to fall over the range of industry demand. The most appropriate description of this industry is:
- A a perfectly competitive industry.
- B a natural monopoly.
- C monopolistic competition.
- D an oligopoly with high barriers to entry.

Question 4 [1 marks]
A firm in monopolistic competition, in long-run equilibrium, will have all the following EXCEPT:
- A price equal to average cost.
- B marginal revenue equal to marginal cost.
- C price equal to marginal cost.
- D excess capacity (producing below minimum efficient scale).

Question 5 [1 marks]
An industry's 4-firm concentration ratio is 85%. Which market structure is this most consistent with?
- A Perfect competition.
- B Monopolistic competition.
- C Oligopoly.
- D Natural monopoly.

Question 6 [1 marks]
A monopolist practising third-degree price discrimination will charge a higher price in the market with:
- A the more price-elastic demand.
- B the less price-elastic demand.
- C the higher total revenue without discrimination.
- D the lower marginal cost of supply.

Question 7 [1 marks]
A firm faces a kinked demand curve at the current price. The most important prediction of this model is:
- A the firm will engage in aggressive price competition.
- B a small shift in marginal cost may leave the profit-maximising price unchanged.
- C the firm will always earn supernormal profit.
- D firms in the industry will always collude.

Question 8 [1 marks]
Two firms play a repeated Prisoner's Dilemma game. Which of the following makes sustained cooperation more likely?
- A A lower discount rate (firms value future payoffs more heavily).
- B A higher discount rate.
- C A shorter time horizon.
- D Lower penalties for defection.

Question 9 [1 marks]
A profit-maximising monopolist facing a linear demand curve will always set a price where demand is:
- A perfectly inelastic.
- B inelastic (|PED| < 1).
- C unit elastic.
- D elastic (|PED| > 1).

Question 10 [1 marks]
Consumer surplus in a perfectly competitive market is equal to:
- A the area below the demand curve, above the equilibrium price, up to the equilibrium quantity.
- B the area above the supply curve, below the equilibrium price.
- C the total revenue of firms.
- D the total cost of production.

Question 11 [1 marks]
In a competitive labour market, the supply of labour to a particular industry is perfectly elastic. An increase in the demand for labour will:
- A raise both employment and the wage rate.
- B raise employment but leave the wage rate unchanged.
- C raise the wage rate but leave employment unchanged.
- D have no effect on employment or the wage rate.

Question 12 [1 marks]
The efficient Pigouvian tax on a good with a negative production externality is equal to the marginal external cost at:
- A the current market equilibrium output.
- B the socially optimal output.
- C the output where marginal private cost equals marginal private benefit.
- D zero output.

Question 13 [1 marks]
If private bargaining according to the Coase theorem cannot resolve an externality, the most likely reason is:
- A one party has a dominant strategy.
- B transaction costs are prohibitively high.
- C property rights are clearly defined.
- D the externality is positive.

Question 14 [1 marks]
Which is most likely to be a cause of government failure?
- A Clearly defined property rights.
- B Rational economic decisions by consumers.
- C Information failure on the part of policymakers.
- D The existence of merit goods.

Question 15 [1 marks]
A closed economy has the following aggregate demand components: C = 0.7Y + 100, I = 200, G = 150. Assume no taxes. The equilibrium level of income is:
- A 1,000
- B 1,500
- C 1,625
- D 1,500 only if G = 100

Question 16 [1 marks]
Ricardian equivalence suggests that a tax-financed and a bond-financed increase in government spending have:
- A the same effect on aggregate demand if consumers are forward-looking.
- B a larger effect on AD if bond-financed because it crowds out investment.
- C a larger effect on AD if tax-financed because households save less.
- D no effect on aggregate demand in any case.

Question 17 [1 marks]
If the short-run Phillips curve is vertical at the natural rate of unemployment:
- A there is a permanent trade-off between inflation and unemployment.
- B inflation can be reduced at no cost to unemployment.
- C attempts to reduce unemployment below the natural rate will only cause rising inflation.
- D monetary policy can permanently reduce unemployment.

Question 18 [1 marks]
A central bank uses open market operations to increase the money supply. The immediate effect is most likely:
- A the central bank sells government bonds, raising interest rates.
- B the central bank buys government bonds, injecting reserves into the banking system.
- C the central bank raises reserve requirements.
- D a direct fall in the price level.

Question 19 [1 marks]
An economy's real exchange rate is defined as the nominal exchange rate adjusted for:
- A the current account balance.
- B relative price levels between the two countries.
- C interest rate differentials.
- D GDP per capita differentials.

Question 20 [1 marks]
A country's balance of payments is in long-run disequilibrium if:
- A it runs a persistent current account surplus requiring large reserve accumulation at a fixed exchange rate.
- B it has a small current account deficit financed by sustainable FDI.
- C it has a balanced trade account.
- D its financial account is near zero.

Question 21 [1 marks]
Interest rate parity predicts that, in equilibrium, a country with a higher nominal interest rate than another country will have a currency that is expected to:
- A appreciate.
- B depreciate.
- C remain fixed.
- D have no relationship to interest rate differentials.

Question 22 [1 marks]
A Lorenz curve for Country X shows that the bottom 40% of households receive 10% of total income. A Gini coefficient calculated for Country X is likely to be:
- A close to 0.
- B close to 1.
- C around 0.4–0.5.
- D exactly 0.5.

Question 23 [1 marks]
The Kuznets curve hypothesises that, as a country develops, income inequality:
- A rises monotonically.
- B falls monotonically.
- C first rises, then falls.
- D is unrelated to the level of development.

Question 24 [1 marks]
Which best describes 'import substitution' as a development strategy?
- A Encouraging foreign direct investment in export sectors.
- B Using tariffs and subsidies to develop domestic industries that replace imports.
- C Joining a free trade area.
- D Specialising in primary commodity exports.

Question 25 [1 marks]
A country has a savings rate of 20% of GDP and a capital-output ratio of 4. Using the Harrod–Domar growth model (ignoring depreciation), the implied rate of economic growth is:
- A 4%
- B 5%
- C 16%
- D 80%

Question 26 [1 marks]
A key prediction of the Solow growth model is that, in the long run:
- A all countries converge to the same level of income per capita.
- B differences in income per capita are explained only by savings rates.
- C long-run growth in per capita income is determined by exogenous technological progress.
- D higher savings rates permanently raise the growth rate of per capita income.

Question 27 [1 marks]
A country running a persistent current account deficit financed by short-term capital inflows is most vulnerable to:
- A excessive FDI.
- B a sudden stop of capital inflows.
- C appreciation of its currency.
- D export-led growth.

Question 28 [1 marks]
Two countries form a customs union. A consequence is:
- A tariffs are abolished between members, with each maintaining its own external tariff.
- B tariffs are abolished between members and a common external tariff is adopted.
- C factor mobility is established.
- D a single currency is adopted.

Question 29 [1 marks]
A developing country adopts a 'big push' strategy of simultaneous investment across multiple sectors. The core justification is:
- A to exploit comparative advantage in a single export crop.
- B to internalise inter-industry demand complementarities.
- C to reduce its saving rate.
- D to raise tariffs on industrial imports.

Question 30 [1 marks]
If a central bank credibly adopts an inflation target and is perceived as independent, the short-run Phillips curve is likely to:
- A become steeper, raising the cost of disinflation.
- B shift leftward, allowing lower inflation at the natural rate of unemployment.
- C become horizontal.
- D shift rightward permanently.`,
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
    subject: "ib",
    paper: "3",
    title: "Paper 3 — Predicted Set A",
    description: "IB HL Paper 3 (policy paper). Set A — Moderate. Verbatim from official-style mock.",
    totalMarks: 60,
    content: `# IB Higher Level Economics — Paper 3 — Predicted Paper Set A (Moderate)

**Time: 1 hour | Total: 60 marks**
Answer all questions.

Coffee is one of the most widely traded agricultural commodities in the world.
Brazil is the largest producer and exporter of coffee, accounting for around 35% of
global output.
The global coffee market operates under conditions close to perfect competition at the farm level,
with many small producers and a homogeneous product. Figure 1 below shows the cost curves of
Firm A, a typical Brazilian coffee farmer. The current world market price of coffee is $4.50 per kg.

[Figure 1 — refer to printed paper]

Question 1a(i) [2 marks]
Define the term price taker.

Question 1a(ii) [1 marks]
Using Figure 1, identify Firm A's short-run profit maximising level of output.

Question 1a(iii) [2 marks]
Using Figure 1, calculate Firm A's short-run economic profit/loss at the level of output identified in part (a)(ii).

Question 1a(iv) [2 marks]
With reference to Figure 1, identify the long-run equilibrium price and level of output for Firm A.

Question 1a(v) [4 marks]
Explain, using Figure 1, how Firm A will move from short-run equilibrium to long-run equilibrium.

Coffee is a water-intensive crop. According to the WWF it takes approximately 140 litres of water to produce the coffee beans for a single cup. The rapid expansion of coffee production in Brazil contributes to the strain on water resources and is thus responsible for a negative impact on watersheds and local ecosystems.

Question 1a(vi) [1 marks]
State one of the characteristics of common access resources.

Still, there are countries that heavily subsidise their coffee farmers so that they are able to meet high global demand. Brazil operates a price-support scheme that guarantees a minimum price of $4.00 per kg. Assume the Brazilian government had to purchase 400 million kg at $4.00 per kg in 2023 to maintain the price floor.

Question 1a(vii) [2 marks]
Using the information above, calculate the total cost of the price-support scheme to the Brazilian government in 2023.

Overall, the coffee industry faces sustainability challenges:
- Coffee production is associated with significant deforestation in tropical regions, reducing forest cover and biodiversity.
- The use of fertilisers and pesticides can contaminate water sources, harm ecosystems and pose risks to human health.
- Coffee processing and transport generate greenhouse gas emissions; reliance on long supply chains contributes to climate change.

Question 1a(viii) [4 marks]
Using an externalities diagram and the information provided, explain how coffee production is responsible for the generation of negative externalities.

Currently, indirect taxes targeted specifically at coffee-related environmental harms do not exist in Brazil. Standard value-added and consumption taxes (PIS/COFINS, ICMS) do apply. For instance, the average monthly spending per household on coffee in Brazil is R$52.00 while the combined indirect-tax rate on packaged coffee is 25%.

Question 1a(ix) [2 marks]
Using the information above, calculate the indirect tax paid per household each month on coffee in Brazil.

Question 1b [10 marks]
Using the text/data provided and your knowledge of economics, recommend a policy that could be introduced to promote sustainability in the Brazilian coffee industry.

Ethiopia is a low-income country in East Africa with a population of around 123 million. Table 1 below provides selected data for Ethiopia.

**Table 1: Selected macroeconomic data for Ethiopia, 2020–2021**
| | Nominal GDP (billion $) | GDP Deflator | Real GDP (billion $) | Population (million) |
| :--- | :--- | :--- | :--- | :--- |
| **2020** | 107.50 | 100.00 | 107.50 | 117.2 |
| **2021** | 111.30 | 105.30 | | 120.0 |

Question 2a(i) [2 marks]
Using the information in Table 1, calculate the real GDP for Ethiopia in 2021.

Question 2a(ii) [2 marks]
Using the information in Table 1, calculate the real GDP per capita for Ethiopia in 2021.

In 2021 Ethiopia held a low position by nominal GDP while its Human Development Index (HDI) ranking placed Ethiopia at 175th out of 191 countries published.

Question 2a(iii) [2 marks]
State two indicators that are used to construct the Human Development Index (HDI).

Question 2a(iv) [2 marks]
Outline one disadvantage of using the Human Development Index as a measure of economic development.

Ethiopia belongs to the low-income transition economies. Over the past two decades the country has seen rapid growth driven by market-oriented reforms, agricultural-sector expansion and significant foreign direct investment (FDI), particularly into industrial parks that produce textiles and apparel.

Question 2a(v) [4 marks]
Explain two possible consequences of economic growth for Ethiopia.

Table 2 below provides selected data from Ethiopia's balance of payments for 2021 (US$ million).

**Table 2: Balance-of-payments data for Ethiopia, 2021**
| Item | $ million |
| :--- | :--- |
| Exports of goods | 3,625 |
| Imports of goods | 14,198 |
| Exports of services | 4,350 |
| Imports of services | 5,700 |
| Net primary income | -652 |
| Net secondary income | 5,860 |

Question 2a(vi) [2 marks]
Using Table 2, calculate the current account balance for Ethiopia in 2021.

Question 2a(vii) [4 marks]
Explain two implications of a rising current account deficit.

Ethiopia's export base is narrow. Coffee alone accounts for around 30% of goods exports, followed by oil seeds (10%) and cut flowers (9%). Over the last five years, GDP growth has slowed from around 10% in the 2010s to below 6%, highlighting the vulnerabilities of an economy dependent on primary commodities and with stagnant productivity growth.

Question 2a(viii) [2 marks]
Outline why dependence on primary sector products can pose a barrier to economic growth and/or economic development.

Question 2b [10 marks]
Using the text/data provided and your knowledge of economics, recommend a policy that could be introduced to revitalize economic growth in Ethiopia.`,
  },
  {
    id: "ib-p3-b",
    subject: "ib",
    paper: "3",
    title: "Paper 3 — Predicted Set B",
    description: "IB HL Paper 3 (policy paper). Set B — Hard. Verbatim from official-style mock.",
    totalMarks: 60,
    content: `# IB Higher Level Economics — Paper 3 — Predicted Paper Set B (Hard)

**Time: 1 hour | Total: 60 marks**

Answer all questions.

The global smartphone market is dominated by a small number of firms, including Apple, Samsung, Xiaomi and Huawei. In 2022, the top five firms controlled approximately 72% of global smartphone sales.
Firm B is a typical firm operating in this market. Figure 1 shows Firm B's demand (AR), marginal revenue (MR), average cost (AC) and marginal cost (MC) curves.

[Figure 1 — refer to printed paper]

Question 1a(i) [2 marks]
Define the term concentration ratio.

Question 1a(ii) [1 marks]
Using Figure 1, identify Firm B's profit maximising level of output.

Question 1a(iii) [2 marks]
Using Figure 1, calculate Firm B's short-run economic profit/loss at the level of output identified in part (a)(ii).

Question 1a(iv) [2 marks]
With reference to Figure 1, identify the price charged by Firm B and explain why this firm is able to earn abnormal profit in the long run.

Question 1a(v) [4 marks]
Using a kinked demand curve diagram, explain why prices may remain rigid in a non-collusive oligopoly.

Smartphones rely on rare earth minerals extracted under conditions often associated with significant environmental damage. Many of these minerals are sourced from common pool resources such as shared watersheds and forested land. It is estimated that producing one smartphone generates around 55 kg of CO2e emissions.

Question 1a(vi) [1 marks]
State one of the characteristics of common pool (common-access) resources.

Still, the smartphone industry continues to expand to meet the high global demand. If Firm B produces 66 million units in a year:

Question 1a(vii) [2 marks]
Using the information above, calculate the total CO2e emissions (in million tonnes) associated with Firm B's output.

Overall, the smartphone industry faces sustainability challenges:
*   Rapid product cycles and planned obsolescence promote overconsumption and generate large quantities of electronic waste.
*   Mining of rare earth elements can contaminate water sources, harm local ecosystems and pose health risks to communities.
*   The industry has a significant carbon footprint; energy-intensive manufacturing and long global supply chains drive greenhouse-gas emissions.

Question 1a(viii) [4 marks]
Using an externalities diagram and the information provided, explain how smartphone production is responsible for the generation of negative externalities.

In response to environmental concerns, the government of a major economy introduces a specific tax of $40 per smartphone. Assume that Firm B continues to produce 66 million units in a year.

Question 1a(ix) [2 marks]
Using the information above, calculate the total indirect tax revenue collected from Firm B's output in a year.

Question 1b [10 marks]
Using the text/data provided and your knowledge of economics, recommend a policy that could be introduced to correct the market failures associated with smartphone production.

2. South Africa is an upper-middle-income country and the second-largest economy in sub-Saharan Africa. Table 1 below provides selected macroeconomic data for South Africa.

| | Nominal GDP (bn R) | GDP Deflator | Real GDP (bn R) | CPI | Unemployment (%) |
|---|---|---|---|---|---|
| **2021** | 6,589 | 110.4 | 5,969 | 108.0 | 34.3 |
| **2022** | 7,245 | 118.5 | | 116.4 | 32.7 |
*Table 1: Selected macroeconomic data for South Africa, 2021–2022*

Question 2a(i) [2 marks]
Using the information in Table 1, calculate the real GDP for South Africa in 2022 (to 2 dp).

Question 2a(ii) [2 marks]
Using the information in Table 1, calculate the rate of inflation in South Africa between 2021 and 2022 (to 2 dp).

In 2022, South Africa's unemployment rate stood at 32.7%, among the highest in the world. Youth unemployment exceeded 60%.

Question 2a(iii) [2 marks]
Define the term cyclical unemployment.

Question 2a(iv) [2 marks]
Outline one limitation of the official unemployment rate as a measure of labour underutilisation.

South Africa's central bank (SARB) responded to inflation above its 3–6% target band by raising the policy (repo) rate from 3.5% at the start of 2022 to 7.0% by early 2023, with further hikes expected.

Question 2a(v) [4 marks]
Using an AD/AS diagram, explain how a rise in interest rates is expected to affect real GDP and the price level in South Africa.

Table 2 below provides selected balance-of-payments data for South Africa in 2022 (US$ billion).

| Item | $ billion |
|---|---|
| Exports of goods | 123.4 |
| Imports of goods | 117.8 |
| Exports of services | 14.1 |
| Imports of services | 16.2 |
| Net primary income | -12.8 |
| Net secondary income | -2.3 |
*Table 2: Balance-of-payments data for South Africa, 2022*

Question 2a(vi) [2 marks]
Using Table 2, calculate the current account balance for South Africa in 2022.

Question 2a(vii) [4 marks]
Explain two implications of a rising current account deficit.

Power outages ('load-shedding') cost the South African economy an estimated R560 billion in 2022, reducing business productivity and export competitiveness. Investment in electricity generation has been insufficient, and growth has slowed from around 3% in the early 2010s to below 1% in recent years, highlighting the vulnerabilities of an economy with persistent infrastructure bottlenecks.

Question 2a(viii) [2 marks]
Outline why weak infrastructure can pose a barrier to economic growth and/or economic development.

Question 2b [10 marks]
Using the text/data provided and your knowledge of economics, recommend a policy that could be introduced to revitalize economic growth in South Africa.`,
  },
  {
    id: "ib-p3-c",
    subject: "ib",
    paper: "3",
    title: "Paper 3 — Predicted Set C",
    description: "IB HL Paper 3 (policy paper). Set C — Advanced. Verbatim from official-style mock.",
    totalMarks: 60,
    content: `# IB Higher Level Economics — Paper 3 — Predicted Paper Set C (Advanced)

**Time: 1 hour | Total: 60 marks**
Answer all questions.

1. Pharmaceutical markets for patented drugs often exhibit monopoly characteristics. Firm C holds a 20-year patent on a branded medicine used to treat a chronic disease.
Figure 1 shows Firm C's cost and revenue curves in the market for this drug. Firm C faces constant marginal cost of production.

[Figure 1 — refer to printed paper]

Question 1a(i) [2 marks]
Define the term monopoly.

Question 1a(ii) [1 marks]
Using Figure 1, identify Firm C's profit maximising level of output.

Question 1a(iii) [2 marks]
Using Figure 1, calculate Firm C's abnormal profit at the level of output identified in part (a)(ii).

Question 1a(iv) [2 marks]
With reference to Figure 1, identify the allocatively efficient level of output for this market.

Question 1a(v) [4 marks]
Using a price-discrimination diagram, explain how Firm C can increase total revenue by charging different prices in markets with different price elasticities of demand.

Many pharmaceutical inputs (such as plant-derived active ingredients) are drawn from common pool resources. Access to these resources is not easily excludable but their use reduces availability for others.

Question 1a(vi) [1 marks]
State one of the characteristics of common pool (common-access) resources.

Firm C engages in international third-degree price discrimination. In 2023 it sold 22 million doses in high-income markets at $120 per dose and 45 million doses in low-income markets at $18 per dose.

Question 1a(vii) [2 marks]
Using the information above, calculate Firm C's total revenue from the two markets combined in 2023.

Overall, the patented-pharmaceuticals market faces well-documented welfare and sustainability challenges:

- Monopoly pricing reduces allocative efficiency and restricts access to essential medicines, particularly in low-income countries.
- High prices can deter adherence to treatment, leading to poorer public-health outcomes and higher long-term healthcare costs.
- Concentration of R&D in high-margin diseases leaves neglected tropical diseases under-researched.

Question 1a(viii) [4 marks]
Using Figure 1 and a welfare-analysis diagram, explain how monopoly pricing generates a welfare loss (deadweight loss) compared to the allocatively efficient outcome.

The US government imposes a per-unit excise tax of $5 per dose on Firm C's domestic sales in 2023 as part of a price-regulation initiative. Assume Firm C sold 22 million doses in the US high-income market in 2023.

Question 1a(ix) [2 marks]
Using the information above, calculate the total indirect tax revenue collected by the US government in 2023.

Question 1b [10 marks]
Using the text/data provided and your knowledge of economics, recommend a policy that could be introduced to improve access to essential medicines while preserving incentives to innovate.

2. Argentina is a large upper-middle-income Latin American economy that has experienced repeated episodes of high inflation, currency crises and sovereign debt problems. Table 1 below provides selected macroeconomic data.

| | Nominal GDP (tn ARS) | GDP Deflator | Real GDP (tn ARS) | CPI (YoY %) | Policy rate (%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2022** | 72.0 | 100.0 | 72.0 | 94.8 | 75.0 |
| **2023** | 165.0 | 210.0 | | 211.4 | 133.0 |
*Table 1: Selected macroeconomic data for Argentina, 2022–2023*

Question 2a(i) [2 marks]
Using the information in Table 1, calculate Argentina's real GDP in 2023 (to 2 dp).

Question 2a(ii) [2 marks]
Using the information in Table 1, calculate the percentage change in real GDP between 2022 and 2023 (to 2 dp).

Inflation in Argentina accelerated sharply during 2022 and 2023, reaching triple digits and threatening to tip into hyperinflation.

Question 2a(iii) [2 marks]
Define the term hyperinflation.

Question 2a(iv) [2 marks]
Outline one cause of the very high inflation rate observed in Argentina.

The Argentine peso (ARS) depreciated sharply against the US dollar over 2022–2023, from around ARS 130/US$ to ARS 800/US$ (official rate). A parallel 'blue-dollar' rate traded even weaker.

Question 2a(v) [4 marks]
Using an exchange-rate diagram, explain two possible reasons for the depreciation of the peso.

Table 2 below provides selected balance-of-payments data for Argentina in 2023 (US$ billion).

| Item | $ billion |
| :--- | :--- |
| Exports of goods | 66.8 |
| Imports of goods | 73.7 |
| Exports of services | 14.2 |
| Imports of services | 20.6 |
| Net primary income | -17.2 |
| Net secondary income | 0.9 |
*Table 2: Balance-of-payments data for Argentina, 2023*

Question 2a(vi) [2 marks]
Using Table 2, calculate the current account balance for Argentina in 2023.

Question 2a(vii) [4 marks]
Using an AD/AS diagram, explain two implications of a sharp currency depreciation for Argentina's price level and real output.

In late 2023 Argentina announced plans including drastic fiscal spending cuts, removal of price controls, and discussions around full dollarisation of the economy. Over the last decade, Argentina's real GDP growth has averaged below 1%, highlighting the vulnerabilities of an economy with persistent macroeconomic instability.

Question 2a(viii) [2 marks]
Outline why persistent macroeconomic instability can pose a barrier to economic growth and/or economic development.

Question 2b [10 marks]
Using the text/data provided and your knowledge of economics, recommend a policy mix that the Argentine government could use to simultaneously address high inflation and the current account deficit.`,
  },
  // ── WJEC A-Level Economics ──
  // Paper 1 (A520U10-1) — Economic Principles. Verbatim sync with /wjec-mocks/paper-1-{moderate|hard|advanced}.pdf
  // Format: 20 MCQs (1 mark each) + Section B Q21–Q27 (3+6+3+4+8+8+8 = 40) → 60 marks total, 1h 30m.
  {
    id: "wjec-p1-a",
    subject: "wjec" as any,
    paper: "1",
    title: "Paper 1 — Moderate",
    description: "Economic Principles (A520U10-1). Moderate difficulty — 20 MCQs + 7 structured questions.",
    totalMarks: 60,
    content: `# WJEC GCE A-Level Economics (A520U10-1) — Component 1: Economic Principles — Predicted Paper (Moderate)

**Time: 1 hour 30 minutes | Total: 60 marks**

Answer ALL questions. The number of marks is given in brackets at the end of each question.

## Section A — Multiple Choice (20 marks)

For each question in Section A, write the letter (A, B, C, D or E) that corresponds to your answer in the box provided. You are advised to spend approximately 30 minutes on this section.

Question 1 [1 mark]
Which one of the following would most likely increase an economy's long run potential economic growth?
A. Higher rates of consumption spending by households
B. An increase in net investment in capital goods
C. A fall in the exchange rate
D. A rise in transfer payments by the government
E. An increase in imports of consumer goods

Question 2 [1 mark]
A good that is non-rival and non-excludable is best described as:
A. A private good
B. A merit good
C. A demerit good
D. A public good
E. A quasi-public good

Question 3 [1 mark]
A firm operating in perfect competition is currently producing at an output where AR = £10, MC = £12 and AC = £8. To maximise profits, the firm should:
A. Increase output until MC = MR
B. Decrease output until MC = MR
C. Shut down immediately
D. Maintain current output
E. Raise its price

Question 4 [1 mark]
In 2023, improved growing conditions in major coffee-producing countries led to a bumper harvest. At the same time, consumer preferences shifted towards tea. The most likely effect on the coffee market would be:
A. A rise in price and a rise in quantity
B. A fall in price and a fall in quantity
C. A rise in price and an indeterminate change in quantity
D. A fall in price and an indeterminate change in quantity
E. No change in equilibrium

Question 5 [1 mark]
A sustained appreciation of the pound sterling would most likely:
A. Increase the price of UK imports
B. Reduce the competitiveness of UK exports
C. Increase the UK's rate of inflation
D. Improve the UK's current account balance
E. Increase UK real GDP in the short run

Question 6 [1 mark]
Which of the following would most likely cause demand-pull inflation in an economy?
A. A rise in the price of imported raw materials
B. A fall in labour productivity
C. A sharp rise in consumer confidence and spending
D. An increase in direct taxes
E. An increase in the savings ratio

Question 7 [1 mark]
The table below shows income distribution data for four economies:

| Country | Gini Coefficient | GDP per capita ($) | HDI |
|---------|------------------|---------------------|------|
| W | 0.25 | 45,000 | 0.92 |
| X | 0.35 | 38,000 | 0.88 |
| Y | 0.48 | 12,000 | 0.72 |
| Z | 0.55 | 3,500 | 0.48 |

It can be concluded that:
A. Country Z has the highest level of income inequality
B. Country W has a higher GDP than Country X
C. Country Y has a lower standard of living than Country Z
D. Income inequality is positively correlated with HDI in all four countries
E. Country X has the most equal income distribution

Question 8 [1 mark]
In a market, equilibrium price is £20 and equilibrium quantity is 500 units. The maximum price consumers are willing to pay is £50 (for the first unit), and the minimum price producers are willing to accept is £5 (for the first unit). Assume linear demand and supply. Consumer surplus at equilibrium is:
A. £5,000
B. £7,500
C. £10,000
D. £12,500
E. £15,000

Question 9 [1 mark]
Compared to a perfectly competitive market, a pure monopoly is most likely to:
A. Produce a higher output at a lower price
B. Produce a lower output at a higher price
C. Be both allocatively and productively efficient
D. Earn only normal profits in the long run
E. Face a perfectly elastic demand curve

Question 10 [1 mark]
In a city where the government has introduced strict rent controls (a maximum price below equilibrium), the most likely consequences include:
A. Higher investment in new housing
B. Shortages of rental accommodation
C. Increased quality of rental properties
D. A rise in equilibrium rent
E. Surplus of available housing

Question 11 [1 mark]
The UK Government's national debt rose from £1,800bn in 2019 to £2,600bn in 2023. Over the same period, nominal GDP rose from £2,200bn to £2,700bn. It can be concluded that:
A. Real GDP rose over the period
B. The debt-to-GDP ratio fell over the period
C. The debt-to-GDP ratio rose from approximately 82% to approximately 96%
D. The budget deficit must have been falling
E. Inflation averaged 5% per year

Question 12 [1 mark]
Which of the following best explains why CPI may overstate the true rise in the cost of living?
A. It excludes housing costs
B. It does not account for substitution effects as consumers move to cheaper alternatives
C. It uses outdated weights
D. It includes indirect taxes
E. It excludes imported goods

Question 13 [1 mark]
A firm reduces the price of its product from £20 to £16. As a result, quantity demanded increases from 400 to 600 units. The price elasticity of demand (using the average/midpoint method) is approximately:
A. -0.5
B. -1.0
C. -1.8
D. -2.0
E. -2.5

Question 14 [1 mark]
Country X can produce either 100 tonnes of wheat OR 50 cars with its resources. Country Y can produce either 80 tonnes of wheat OR 20 cars. Which of the following is true?
A. Country X has a comparative advantage in both goods
B. Country Y has a comparative advantage in wheat
C. Country X has a comparative advantage in cars
D. No mutually beneficial trade is possible
E. Country Y has an absolute advantage in cars

Question 15 [1 mark]
According to the quantity theory of money (MV = PY), if the money supply rises by 8%, the velocity of circulation falls by 2%, and real GDP rises by 3%, inflation will be approximately:
A. 3%
B. 5%
C. 6%
D. 9%
E. 13%

Question 16 [1 mark]
Country A's index of export prices rises from 100 to 120. Its index of import prices rises from 100 to 110. Which of the following is correct?
A. The terms of trade have deteriorated
B. The terms of trade index is 91.7
C. The terms of trade index has risen to 109.1
D. The current account will automatically improve
E. Exports will become less competitive

Question 17 [1 mark]
A country's central bank raises interest rates significantly. In the short run, this would most likely cause:
A. A depreciation of the currency
B. A fall in hot money inflows
C. An appreciation of the currency
D. A rise in the rate of inflation
E. A fall in the value of exports

Question 18 [1 mark]
The overuse of antibiotics leading to antimicrobial resistance is best described as an example of:
A. A public good
B. A positive externality of consumption
C. A negative externality of consumption
D. A merit good
E. Asymmetric information

Question 19 [1 mark]
In a market with a negative externality of production, the socially optimal output is where:
A. MPB = MPC
B. MSB = MSC
C. MPB = MSC
D. MSB = MPC
E. Price = MSC

Question 20 [1 mark]
The government imposes a specific tax of £2 per unit on sugary drinks. If demand is price inelastic and supply is price elastic, which of the following is most likely?
A. The tax will be borne mainly by producers
B. The tax will be borne equally by consumers and producers
C. The tax will be borne mainly by consumers
D. The tax will not affect price at all
E. Quantity demanded will fall significantly

## Section B — Structured Questions (40 marks)

Answer all the questions in the spaces provided.

Question 21 [3 marks]
The diagram below shows a firm operating in perfect competition in the short run, producing at output Q₁ where it maximises profits.
[Diagram: MC curve, AC curve, AR=MR=D horizontal line at P₁, output Q₁ at MC=MR intersection]
Using the diagram, explain why the firm maximises profit at output Q₁.

Question 22 [6 marks]
The diagram below shows an economy initially in equilibrium at P₁Y₁, where real GDP is below the full employment level. The Bank of England then cuts the Bank Rate from 5% to 2%.
[Diagram: AD/AS framework showing SRAS, LRAS, AD, initial equilibrium at P₁Y₁ below LRAS]
Consider the extent to which this policy would be beneficial for the economy. Adapt the diagram as part of your answer.

Question 23 [3 marks]
Norway has large North Sea oil reserves. Extracting oil from offshore rigs is capital intensive and requires complex infrastructure. When new oil deposits are discovered, it typically takes 5–10 years before production can begin.
With the aid of a diagram, comment on the likely price elasticity of supply of Norwegian oil in the short run.

Question 24 [4 marks]
A bakery has fixed costs of £500 per week (rent, equipment depreciation). The diagram below shows the bakery's short-run total cost curve as output of loaves increases from 0 to 1,000.
[Diagram: TC curve starting at £500, rising gradually then more steeply as output increases]
Explain the shape of this firm's short run total cost curve.

Question 25 [8 marks]
The pay-off matrix below shows the expected changes in employment (in thousands) for two neighbouring countries depending on whether they introduce a carbon tax.

|  | Country B: Carbon Tax | Country B: No Carbon Tax |
|---|---|---|
| **Country A: Carbon Tax** | -10, -15 | -50, +30 |
| **Country A: No Carbon Tax** | +40, -40 | +5, +10 |

With reference to the matrix and economic theory, discuss whether or not governments should coordinate climate policy internationally.

Question 26 [8 marks]
The UK has one of the highest levels of obesity in Europe, with around 26% of adults classified as obese. In 2018, the government introduced the Soft Drinks Industry Levy ('sugar tax') on drinks with high sugar content. Since then, many manufacturers have reformulated their drinks to reduce sugar content.

Additional data:
- UK obesity rate (adults): 2010 — 22%; 2023 — 26%
- NHS spending on obesity-related conditions: £6.5bn (2023)
- Revenue from sugar tax: £300m (2023)
- Reduction in sugar content in taxed drinks: 43% since 2018
- Children from the most deprived areas are twice as likely to be obese as those from the least deprived areas

With reference to the data above, consider how effective the UK Government's sugar tax has been in correcting market failure.

Question 27 [8 marks]
The table below gives information on selected African economies:

| Country | GDP per capita ($, PPP) | Adult literacy rate (%) | Life expectancy (years) | HDI |
|---------|--------------------------|--------------------------|--------------------------|------|
| Botswana | 17,100 | 88 | 61 | 0.693 |
| Ghana | 6,400 | 80 | 64 | 0.632 |
| Kenya | 5,200 | 83 | 67 | 0.601 |
| Rwanda | 2,800 | 73 | 70 | 0.550 |
| Ethiopia | 2,800 | 52 | 66 | 0.498 |
| DR Congo | 1,500 | 80 | 60 | 0.457 |

Using the information above and relevant economic theory, discuss the extent to which investment in education is the most effective way to promote economic development.
`,
  },
  {
    id: "wjec-p1-b",
    subject: "wjec" as any,
    paper: "1",
    title: "Paper 1 — Hard",
    description: "Economic Principles (A520U10-1). Hard difficulty — 20 MCQs + 7 structured questions.",
    totalMarks: 60,
    content: `# WJEC GCE A-Level Economics (A520U10-1) — Component 1: Economic Principles — Predicted Paper (Hard)

**Time: 1 hour 30 minutes | Total: 60 marks**

Answer ALL questions. The number of marks is given in brackets at the end of each question.

## Section A — Multiple Choice (20 marks)

For each question in Section A, write the letter (A, B, C, D or E) that corresponds to your answer in the box provided.

Question 1 [1 mark]
An economy's labour force grows by 1.5% per year and its output per worker grows by 2.2% per year. However, the average number of hours worked per worker falls by 0.4% per year. The annual rate of actual economic growth is approximately:
A. 2.3%
B. 2.7%
C. 3.3%
D. 3.7%
E. 4.1%

Question 2 [1 mark]
According to the Coase theorem, in the presence of externalities, bargaining between the affected parties will lead to an efficient outcome provided that:
A. Government sets a Pigouvian tax equal to the external cost
B. Property rights are well-defined and transaction costs are low
C. The externality is a public good
D. There is perfect information in the market
E. The market is perfectly competitive

Question 3 [1 mark]
A firm's current price is £8 and quantity demanded is 1,000 units per week. The firm's accountants estimate that PED = −1.5 at this point. If the firm reduces price by 10%, total revenue will:
A. Rise by approximately £1,200/week
B. Rise by approximately £600/week
C. Rise by approximately £300/week
D. Fall by approximately £400/week
E. Remain unchanged

Question 4 [1 mark]
A drought in wheat-producing regions coincides with rising incomes in developing countries where wheat is a normal good. In the wheat market, the most likely outcome is:
A. Price rises, quantity falls
B. Price rises, quantity rises
C. Price falls, quantity rises
D. Price rises, quantity change indeterminate
E. Price change indeterminate, quantity rises

Question 5 [1 mark]
Following a sharp depreciation of its currency, a country's trade balance initially worsens before improving. This pattern is most commonly referred to as:
A. The Laffer curve
B. The Phillips curve
C. The J-curve effect
D. The Kuznets curve
E. The Okun curve

Question 6 [1 mark]
The short-run Phillips curve shifts upwards. The most likely cause is:
A. A rise in productivity
B. An increase in labour force participation
C. An increase in expected inflation
D. A fall in commodity prices
E. A cut in the Bank Rate

Question 7 [1 mark]
A Lorenz curve that moves closer to the line of absolute equality indicates:
A. A rise in income inequality
B. A fall in income inequality
C. An increase in GDP
D. A rise in the Gini coefficient
E. A fall in average incomes

Question 8 [1 mark]
In a market with linear supply and demand, the government imposes an indirect tax that reduces equilibrium quantity from 1,000 to 800 units. The tax per unit is £5. The deadweight (welfare) loss from the tax is:
A. £250
B. £500
C. £750
D. £1,000
E. £2,000

Question 9 [1 mark]
For a price-discriminating monopolist to successfully charge different prices to different consumer groups, which of the following is NOT required?
A. The ability to identify different consumer groups
B. Different PEDs between groups
C. The ability to prevent resale between groups
D. Some degree of monopoly power
E. Constant marginal costs across groups

Question 10 [1 mark]
'Adverse selection' in the market for used cars ('lemons' problem) arises primarily because:
A. Buyers know more about car quality than sellers
B. Sellers know more about car quality than buyers
C. The market has too few sellers
D. There is excessive government regulation
E. Cars are a public good

Question 11 [1 mark]
In an economy, the marginal propensity to consume is 0.75, the marginal tax rate is 0.2, and the marginal propensity to import is 0.15. The government spending multiplier is approximately:
A. 1.25
B. 1.67
C. 2.00
D. 2.50
E. 4.00

Question 12 [1 mark]
The nominal interest rate is 4% and the expected inflation rate is 6%. Using the Fisher equation, the real interest rate is approximately:
A. +10%
B. +2%
C. 0%
D. −2%
E. −10%

Question 13 [1 mark]
The demand for a product has an income elasticity of demand of +2.5. This product is best classified as:
A. An inferior good
B. A necessity
C. A Giffen good
D. A luxury (income-elastic normal) good
E. A demerit good

Question 14 [1 mark]
Country X can produce 1 unit of good A in 4 hours OR 1 unit of good B in 6 hours. Country Y can produce 1 unit of good A in 2 hours OR 1 unit of good B in 4 hours. Which of the following is true?
A. Y has comparative advantage in A; X has comparative advantage in B
B. X has comparative advantage in A; Y has comparative advantage in B
C. Y has absolute advantage in both but no comparative advantage
D. X has comparative advantage in both A and B
E. No mutually beneficial trade is possible

Question 15 [1 mark]
An expansionary fiscal policy is most likely to cause significant 'crowding out' when:
A. The economy is in a deep recession with much spare capacity
B. The economy is operating close to full employment
C. Interest rates are at the zero lower bound
D. Private investment is highly interest-inelastic
E. Exchange rates are fixed

Question 16 [1 mark]
A country has a current account deficit of £40bn. In the same period, its capital and financial account shows a net inflow of £35bn. Assuming no errors or omissions, the change in official reserves is most likely:
A. A rise of £5bn
B. A fall of £5bn
C. A rise of £40bn
D. A fall of £75bn
E. Zero

Question 17 [1 mark]
The Marshall-Lerner condition states that a depreciation will improve the current account if:
A. Sum of PEDs for exports and imports > 0
B. Sum of PEDs for exports and imports > 1
C. PED for exports > PED for imports
D. Both PEDs are less than 1
E. Both PEDs equal zero

Question 18 [1 mark]
In an oligopoly market, a Nash equilibrium occurs when:
A. All firms earn zero economic profits
B. Each firm's strategy is the best response given the strategies of rival firms
C. Firms collude to maximise joint profits
D. Firms produce where P = MC
E. One firm dominates the market completely

Question 19 [1 mark]
The behavioural economics concept of 'loss aversion' suggests that:
A. People value gains more than equivalent losses
B. People value losses more than equivalent gains
C. People are always rational utility maximisers
D. People have stable preferences over time
E. People always use full information when deciding

Question 20 [1 mark]
The demand function is Qd = 1000 − 20P and the supply function is Qs = 100 + 10P (where P is in £ and Q is in units/week). A specific tax of £6/unit is imposed on producers. The revenue raised by this tax is:
A. £2,160
B. £3,240
C. £3,960
D. £4,800
E. £5,400

## Section B — Structured Questions (40 marks)

Answer all the questions in the spaces provided.

Question 21 [3 marks]
The diagram below shows a firm operating in monopolistic competition in long-run equilibrium.
[Diagram: MC, AC, D=AR, MR curves. AC is tangent to AR at profit-maximising output Q₁, with P₁ = AC at Q₁]
Using the diagram, explain why the firm earns only normal profit in the long run.

Question 22 [6 marks]
The diagram below shows an economy in equilibrium at P₁Y₁. A major global supply-side shock (a sharp rise in world oil prices) hits the economy.
[Diagram: AD/AS framework — SRAS, LRAS, AD intersecting at P₁Y₁]
Consider the extent to which monetary policy can restore the economy to its initial position. Adapt the diagram as part of your answer.

Question 23 [3 marks]
In central London, planning restrictions severely limit the construction of new residential buildings. The average time from planning application to occupancy of a new development is over 5 years. Meanwhile, demand for housing has risen sharply due to population growth and international migration.
With the aid of a diagram, comment on the likely price elasticity of supply of housing in central London and its implications for house prices.

Question 24 [4 marks]
The diagram below shows the long-run average cost (LRAC) curve for an electricity generation firm. Output ranges from 100 MW to 5,000 MW.
[Diagram: LRAC curve — falling sharply from 100 MW to 2,000 MW (minimum efficient scale), roughly flat from 2,000 to 4,000 MW, then rising after 4,000 MW]
Explain the shape of this firm's long-run average cost curve, referring to the concepts of economies and diseconomies of scale.

Question 25 [8 marks]
Two large supermarket chains (Tesla-Mart and BigBasket) operate in a duopoly market. The pay-off matrix below shows weekly profits (in £m) depending on each firm's advertising strategy.

|  | BigBasket: High Advertising | BigBasket: Low Advertising |
|---|---|---|
| **Tesla-Mart: High Advertising** | £12m, £10m | £25m, £4m |
| **Tesla-Mart: Low Advertising** | £6m, £22m | £18m, £15m |

With reference to the matrix and economic theory, discuss whether the firms would be better off forming a collusive agreement rather than competing on advertising.

Question 26 [8 marks]
Read the following information about healthcare in the UK:

The NHS budget has risen from £123bn in 2013/14 to approximately £190bn in 2023/24. In real terms (adjusted for inflation), this represents an average annual real-terms increase of about 1.5%. However, the long-run historical average is 3.7% real growth per year.

Key pressures on the NHS include:
- Ageing population: 18% of UK population is now aged 65+ (vs 16% in 2011)
- Median NHS waiting time for elective surgery has risen from 7 weeks (2010) to 14 weeks (2023)
- Private healthcare spending in the UK has risen by 50% in real terms since 2015
- Over 7 million people are currently on NHS waiting lists (vs 2.5m in 2012)
- Obesity, mental health and long-Covid cases all rising sharply

Critics argue the funding model is unsustainable; supporters argue that increasing investment would correct market failures in healthcare provision.

With reference to the data above, consider the extent to which increased government spending on the NHS is the best way to correct market failure in healthcare.

Question 27 [8 marks]
The table below gives information on selected economies in the context of globalisation:

| Country | Trade openness (X+M as % GDP) | FDI inflow (% GDP) | Average growth rate 2000–2020 (% p.a.) | Gini coefficient | HDI |
|---------|--------------------------------|---------------------|-----------------------------------------|------------------|------|
| Singapore | 320% | 20.1% | 4.7% | 0.46 | 0.938 |
| South Korea | 85% | 1.2% | 4.0% | 0.35 | 0.925 |
| Vietnam | 210% | 6.3% | 6.2% | 0.36 | 0.704 |
| China | 38% | 1.8% | 8.9% | 0.47 | 0.764 |
| Nigeria | 31% | 0.7% | 4.1% | 0.35 | 0.535 |
| North Korea | ~5% | ~0% | est. 1–2% | n/a | est. <0.5 |

Using the information above and relevant economic theory, discuss the extent to which openness to trade and foreign investment is the most effective driver of economic development.
`,
  },
  {
    id: "wjec-p1-c",
    subject: "wjec" as any,
    paper: "1",
    title: "Paper 1 — Advanced",
    description: "Economic Principles (A520U10-1). Advanced difficulty — 20 MCQs + 7 structured questions.",
    totalMarks: 60,
    content: `# WJEC GCE A-Level Economics (A520U10-1) — Component 1: Economic Principles — Predicted Paper (Advanced)

**Time: 1 hour 30 minutes | Total: 60 marks**

Answer ALL questions. The number of marks is given in brackets at the end of each question.

## Section A — Multiple Choice (20 marks)

For each question in Section A, write the letter (A, B, C, D or E) that corresponds to your answer.

Question 1 [1 mark]
According to the Solow growth model, sustained long-run growth in GDP per capita ultimately depends on:
A. Growth in the labour force
B. Growth in the capital stock
C. Exogenous technological progress (total factor productivity)
D. Increases in the savings rate
E. Higher rates of population growth

Question 2 [1 mark]
In a market with a negative externality of production, if the government sets a per-unit tax exactly equal to the marginal external cost (a Pigouvian tax), the post-tax outcome will:
A. Eliminate all pollution
B. Internalise the externality and achieve the socially optimal output
C. Create a deadweight loss equal to the original welfare loss
D. Reduce output below the socially optimal level
E. Increase welfare by the full amount of tax revenue

Question 3 [1 mark]
A natural monopoly is characterised by an LRAC curve that falls continuously over the relevant range of output. If such a firm is regulated to price at marginal cost (P = MC), it will:
A. Earn normal profits
B. Earn supernormal profits
C. Make a loss because MC is below AC
D. Be productively efficient but not allocatively efficient
E. Face zero deadweight loss and positive economic profit

Question 4 [1 mark]
In a market, Qd = 600 − 4P and Qs = -100 + 6P (both in units/day, P in £). If the government sets a maximum price of £50, the resulting market imbalance will be:
A. An excess supply of 200 units
B. An excess demand of 200 units
C. An excess demand of 100 units
D. An excess supply of 100 units
E. Market equilibrium (no imbalance)

Question 5 [1 mark]
The UK has an inflation rate of 6% while the Eurozone has an inflation rate of 2%. Over the same period, the nominal £/€ exchange rate appreciates by 1%. The change in the UK's real effective exchange rate (against the Euro) is approximately:
A. Appreciation of 3%
B. Appreciation of 5%
C. Depreciation of 3%
D. Depreciation of 5%
E. No change

Question 6 [1 mark]
The long-run Phillips curve is vertical at the Non-Accelerating Inflation Rate of Unemployment (NAIRU) because:
A. All unemployment is voluntary
B. Workers adjust their inflation expectations to actual inflation in the long run
C. Money is neutral in both short and long run
D. Monetary policy has no effect on inflation
E. Supply shocks cancel out in the long run

Question 7 [1 mark]
The poorest 20% of households in Country X receive 5% of total income; the richest 20% receive 50%. A progressive tax-and-benefit system raises the share of the poorest 20% to 8% and reduces the richest 20% to 42%. The Gini coefficient will:
A. Rise
B. Fall
C. Remain unchanged
D. Approach 1
E. Become negative

Question 8 [1 mark]
Demand: P = 120 − 2Q. Supply: P = 20 + 3Q. The government imposes a specific tax of £10 per unit on producers. The loss in consumer surplus due to the tax is:
A. £76
B. £140
C. £176
D. £380
E. £400

Question 9 [1 mark]
In a perfectly contestable market, which of the following outcomes is most likely?
A. Firms will charge monopoly prices
B. Firms will earn only normal profits in the long run, even with few competitors
C. Firms will always operate below MES
D. Firms will face inelastic demand
E. Firms will engage in tacit collusion

Question 10 [1 mark]
The 'principal-agent problem' in the context of publicly listed companies refers to the conflict between:
A. Buyers and sellers
B. Shareholders (principals) and managers (agents) arising from information asymmetry
C. Workers and trade unions
D. Government regulators and firms
E. Creditors and debtors

Question 11 [1 mark]
At the zero lower bound on nominal interest rates, conventional monetary policy becomes ineffective because:
A. Fiscal policy always dominates
B. Nominal rates cannot be cut further to stimulate demand
C. Inflation is automatically zero
D. Households save more when rates are low
E. Banks hoard all reserves

Question 12 [1 mark]
In a closed economy, the theoretical multiplier is k = 1/(1−MPC). Empirical estimates of the multiplier in open economies with flexible exchange rates and partial crowding out are typically:
A. Larger than the theoretical value
B. About equal to the theoretical value
C. Smaller than the theoretical value
D. Negative
E. Infinite

Question 13 [1 mark]
A government wishes to maximise tax revenue from a specific indirect tax. This is most likely to be achieved when demand for the taxed product is:
A. Perfectly elastic
B. Price elastic
C. Perfectly inelastic
D. Unit elastic
E. Price inelastic with many complements

Question 14 [1 mark]
Country A experiences a 10% improvement in its terms of trade. Its trade volume (quantity of exports and imports) remains unchanged. The most likely effect on its current account balance is:
A. The current account will deteriorate
B. The current account will improve
C. The current account will be unchanged
D. The current account will shift to surplus only if PEDs are elastic
E. Cannot be determined without more information

Question 15 [1 mark]
Quantitative easing (QE) is most likely to stimulate AD through all of the following channels EXCEPT:
A. Lower long-term interest rates (portfolio rebalancing)
B. Higher asset prices and wealth effects
C. A weaker exchange rate
D. Increased bank lending to SMEs in every case
E. Signalling commitment to low rates for longer

Question 16 [1 mark]
The use of 'nudges' (e.g. default enrolment into pension schemes) in public policy is based on the behavioural insight that:
A. Consumers always make fully rational choices
B. Small changes in choice architecture can significantly alter behaviour
C. Economic agents have identical preferences
D. Market failures do not exist in practice
E. Information provision alone solves all market failures

Question 17 [1 mark]
The 'tragedy of the commons' is most commonly associated with which pair of characteristics?
A. Non-rival and excludable
B. Rival and excludable
C. Non-rival and non-excludable
D. Rival and non-excludable
E. Non-rival and non-diminishable

Question 18 [1 mark]
In year 1, nominal GDP is £2,000bn and the GDP deflator is 100. In year 2, nominal GDP rises to £2,184bn and the GDP deflator is 104. Real GDP growth (rounded) is:
A. 2.0%
B. 4.0%
C. 5.0%
D. 9.2%
E. 13.2%

Question 19 [1 mark]
The Kuznets curve hypothesises that, as a country develops, income inequality:
A. Continuously rises
B. Continuously falls
C. First rises, then falls (inverted-U shape)
D. First falls, then rises
E. Remains constant

Question 20 [1 mark]
The demand for a product is given by Q = 500 − 10P and supply by Q = 20P − 100. The government introduces a specific tax of £6/unit paid by producers. The new equilibrium quantity is:
A. 220
B. 240
C. 260
D. 280
E. 300

## Section B — Structured Questions (40 marks)

Answer all the questions in the spaces provided.

Question 21 [3 marks]
The diagram below shows the kinked demand curve faced by an oligopoly firm, with the discontinuous 'gap' in the MR curve between points A and B.
[Diagram: kinked demand curve with an elastic upper segment and inelastic lower segment, kink at the current price P*. MR curve has a vertical discontinuity at Q*]
Using the diagram, explain why price stability is a common feature of oligopoly markets.

Question 22 [6 marks]
The diagram below shows an economy with a Keynesian AS curve (perfectly elastic at low output, becoming vertical at full employment). The economy is currently in a deep recession at Y₁.
[Diagram: Keynesian AS curve (L-shaped / three-stage: flat, upward-sloping, vertical), with AD intersecting in the flat portion at Y₁]
Consider the extent to which a £50bn expansionary fiscal stimulus would be an effective policy response. Adapt the diagram as part of your answer.

Question 23 [3 marks]
Lithium is a key input in electric vehicle batteries. Global demand is forecast to quadruple over the next decade. Lithium mines take 7–10 years to develop from initial exploration to full production. Existing mines are operating at near-full capacity.
With the aid of a diagram, comment on the likely consequences for lithium prices over the next 5 years, referring to the price elasticity of supply.

Question 24 [4 marks]
A firm operates in two distinct stages of production: a small-scale 'artisan' stage (1–100 units) using skilled labour, and a large-scale 'factory' stage (100+ units) requiring substantial investment in machinery. The firm's short-run total cost curve has a distinctive kink at 100 units, with TC jumping from £5,000 at Q=99 to £25,000 at Q=100.
Explain the shape of this firm's short-run total cost curve and the economic significance of the discontinuity.

Question 25 [8 marks]
The pay-off matrix below shows the expected changes in real GDP (%, annualised) for two economies depending on their trade policy stance. The economies are significant trading partners.

|  | Economy Y: Free Trade | Economy Y: Retaliatory Tariffs |
|---|---|---|
| **Economy X: Free Trade** | +2.4%, +3.0% | -1.8%, +1.5% |
| **Economy X: Tariffs on Y's exports** | +1.2%, -2.0% | -3.5%, -4.0% |

Additional context:
- Economy X is a large developed economy; Economy Y is a fast-growing emerging economy.
- The WTO average 'bound' tariff for developed economies is approximately 3.5%; for developing economies, around 15%.
- Recent empirical studies estimate trade wars reduce global GDP by 0.8–1.5%.

With reference to the matrix and economic theory, discuss whether the optimal trade policy is unilateral free trade.

Question 26 [8 marks]
The UK has a legally binding target of reaching 'net zero' greenhouse gas emissions by 2050. Read the information below.

The UK's current approach combines:
- The UK Emissions Trading Scheme (ETS): a 'cap-and-trade' system covering ~30% of emissions, with the carbon price averaging £40/tonne in 2024 (down from £90/tonne in 2023).
- Fuel duty on petrol and diesel (frozen in nominal terms since 2011).
- Subsidies for renewables (via Contracts for Difference).
- Various regulations and standards.

Key data:
- UK CO₂ emissions have fallen by 48% since 1990.
- Renewable share of UK electricity: 43% (2023), up from 7% in 2010.
- UK ETS revenue: £5.5bn (2023), £3.2bn (2024).
- Climate Change Committee estimates the shadow cost of carbon for policy should be £240/tonne by 2030.
- Global CO₂ emissions continue to rise; UK accounts for ~1% of world emissions.
- Price Elasticity of Demand for petrol: ≈ −0.3 (short run), ≈ −0.7 (long run).

With reference to the data above, consider the extent to which the UK's carbon pricing policies are effective at correcting the market failure of climate change.

Question 27 [8 marks]
The table below presents development indicators for selected economies, comparing 'extractive' vs 'inclusive' institutional frameworks (as theorised by Acemoglu and Robinson).

| Country | GDP per capita ($, PPP) | Rule of Law Index (0–1, higher=better) | HDI | Corruption Perceptions rank /180 | Institutional classification |
|---------|--------------------------|-----------------------------------------|------|-----------------------------------|-------------------------------|
| South Korea | 52,000 | 0.81 | 0.925 | 32 | Inclusive |
| North Korea | 1,700 | 0.14 | <0.5 (est.) | 172 | Extractive |
| Chile | 28,000 | 0.67 | 0.855 | 29 | Mixed (largely inclusive) |
| Argentina | 26,500 | 0.52 | 0.842 | 98 | Mixed/extractive |
| Botswana | 17,100 | 0.65 | 0.693 | 45 | Inclusive (for region) |
| Zimbabwe | 2,800 | 0.36 | 0.593 | 149 | Extractive |
| Singapore | 116,000 | 0.80 | 0.938 | 5 | Inclusive |
| Nigeria | 5,900 | 0.44 | 0.535 | 145 | Mixed/extractive |

Using the information above and relevant economic theory, discuss the extent to which institutional quality is the most fundamental determinant of long-run economic development.
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