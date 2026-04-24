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
    title: "Paper 1 — Set A (Moderate)",
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
    title: "Paper 1 — Set B (Hard)",
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
    title: "Paper 1 — Set C (Advanced)",
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
  // ─────────────────────────────────────────────────────────────────
  // WJEC A-Level Economics — Component 2 (A520U20-1) — verbatim from
  // /public/wjec-mocks/paper-2-{moderate|hard|advanced}.pdf.
  // Each paper = 80 marks (Section A 5+5+10+10+10=40, Section B 5+7+10+7+11=40).
  // ─────────────────────────────────────────────────────────────────
  {
    id: "wjec-p2-a",
    subject: "wjec" as any,
    paper: "2",
    title: "Paper 2 — Set A (Moderate)",
    description: "Component 2: Exploring Economic Behaviour — Moderate tier (verbatim from PDF).",
    totalMarks: 80,
    content: `# WJEC GCE A LEVEL Economics — A520U10-1 — Component 2: Exploring Economic Behaviour — Predicted Paper (Moderate)

**Time: 2 hours 30 minutes | Total: 80 marks**

Answer **all** questions.

## SECTION A — The cost of going green

In 2019 the UK became the first major economy to pass a law committing it to net-zero greenhouse gas emissions by 2050. Reaching that target will require major structural change in the way the economy produces energy, transports people and goods, and heats homes.

**The scale of the challenge.** Over the past decade the UK has made real progress in decarbonising its electricity supply. The share of electricity generated from renewable sources has risen sharply as old coal-fired power stations have been closed and replaced with wind and solar capacity (Figure 1).

**Figure 1 — UK electricity generated from renewables (%)**

| Year | % |
|---|---|
| 2010 | ~7 | 2011 | ~9 | 2012 | ~11 | 2013 | ~15 | 2014 | ~19 | 2015 | ~25 | 2016 | ~25 | 2017 | ~29 | 2018 | ~33 | 2019 | ~37 | 2020 | ~43 | 2021 | ~40 | 2022 | ~42 | 2023 | ~47 |

This shift has been supported by a combination of carbon pricing, subsidies for renewable developers (Contracts for Difference) and planning reform. However, electricity prices paid by UK households remain among the highest in Europe (Figure 2), partly because gas still sets the wholesale price during most hours of the year, and partly because green levies and network costs add around 25% to the typical bill.

**Figure 2 — Domestic electricity prices in selected European countries (pence per kWh)**

| Country | Price | Country | Price |
|---|---|---|---|
| Germany | ~40 | UK | ~38 | Belgium | ~32 | Italy | ~29 |
| France | ~25 | Spain | ~24 | Poland | ~19 | | |

**Winners and losers.** Supporters of the transition argue that it will create hundreds of thousands of new 'green' jobs in sectors such as offshore wind, heat-pump installation, electric-vehicle manufacturing and grid upgrades. Some of these jobs will be concentrated in regions with existing heavy-industry expertise, including the North East, Humberside and South Wales.

Critics point out that the transition also creates losers. Workers in carbon-intensive industries face the risk of job displacement, and low-income households spend a larger share of their income on energy, transport and food, all of which are affected by the rising price of carbon. Because the poorest 10% of UK households spend around 12% of their income on domestic energy, compared with just 3% for the richest 10%, carbon taxes risk being regressive unless the revenue is recycled back to households (Figure 3).

**Figure 3 — Share of household income spent on domestic energy, by decile (D1 = poorest)**

| Decile | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 |
|---|---|---|---|---|---|---|---|---|---|---|
| % of disposable income | 12 | 10 | 8 | 7 | 6 | 5 | 4.5 | 4 | 3.5 | 3 |

**Policy options.** The government faces a choice between several policy instruments to drive the transition further. A higher carbon price would internalise the negative externality of emissions but risks accelerating cost-push inflation and damaging the competitiveness of energy-intensive manufacturing. Larger direct subsidies for heat pumps, insulation and electric vehicles would be more politically popular but require significant public spending at a time when the debt-to-GDP ratio is close to 100%. Tighter regulation — for example banning the sale of new gas boilers from 2035 — is cheaper for the Treasury but shifts the cost directly onto households.

At the same time, unilateral UK action can only deliver limited global impact. UK emissions account for less than 1% of the world total, so without broadly aligned action from large emitters such as China, the United States and India, the UK risks incurring the transition costs while capturing only a small share of the benefits.

Question 1.1 [5 marks]
Using the data, explain why the share of UK electricity generated from renewable sources has increased in recent years.

Question 1.2 [5 marks]
Using the data, explain why carbon taxes may have a regressive effect on low-income households.

Question 1.3 [10 marks]
Evaluate the likely effectiveness of carbon taxes as a way of reducing UK greenhouse gas emissions.

Question 1.4 [10 marks]
Using the data, discuss whether government subsidies are the most effective way to accelerate the adoption of renewable energy.

Question 1.5 [10 marks]
Using the data, discuss the extent to which the UK's transition to net zero will benefit low-income households.

## SECTION B — Who wins at the checkout?

The UK grocery market is one of the most visible examples of oligopoly in the British economy. A small number of large supermarket chains account for the vast majority of grocery sales, with Tesco alone holding around 27% of the market. The market has changed significantly over the past decade as the German discounters Aldi and Lidl have expanded rapidly, forcing the established 'big four' (Tesco, Sainsbury's, Asda and Morrisons) to respond (Figure 1).

**Figure 1 — Market shares of UK supermarkets (approximate, 2024, % of UK grocery sales)**

| Tesco | Sainsbury's | Asda | Aldi | Morrisons | Lidl | Co-op | Waitrose | Iceland | Other |
|---|---|---|---|---|---|---|---|---|---|
| ~27 | ~16 | ~13 | ~10 | ~8.5 | ~7.5 | ~5.5 | ~4.5 | ~2.5 | ~5 |

As the discounters have grown, competition on price has intensified. Tesco launched its 'Aldi Price Match' scheme in 2020, which guarantees that the price of hundreds of everyday products is no higher than at Aldi. Sainsbury's and Morrisons have launched similar programmes. At the same time the supermarkets continue to compete heavily on non-price dimensions: expanded loyalty schemes (Clubcard, Nectar), same-day delivery, larger own-brand ranges, in-store cafés and self-service checkouts.

**Bob's Supermarket.** The data in Figure 2 show a simplified weekly cost and revenue schedule for a mid-sized supermarket, 'Bob's Supermarket', operating in a competitive town-centre location. Prices are shown per basket of goods.

**Figure 2 — Bob's Supermarket: weekly price-quantity and cost schedule**

| Price/basket | Baskets/week | Total Cost |
|---|---|---|
| £24 | 0 | £250 |
| £22 | 100 | £340 |
| £20 | 200 | £400 |
| £18 | 300 | £480 |
| £16 | 400 | £580 |
| £14 | 500 | £700 |
| £12 | 600 | £840 |
| £10 | 700 | £1020 |
| £8 | 800 | £1280 |

**A game of strategy.** Oligopoly markets are characterised by strong interdependence between firms, which means each firm has to think carefully about how its rivals will react before changing price. The 'big four' have, on several occasions, been investigated by the Competition and Markets Authority (CMA) for behaviour that raised concerns about implicit coordination, including a £50 million fine imposed in 2011 for exchanging price information on dairy products.

Although explicit price-fixing cartels are illegal, economists argue that tacit collusion can be difficult to prevent in a market where firms are so visible to each other and to the consumer. The kinked demand curve theory suggests that prices in oligopoly markets can be unusually stable, even when costs change, because each firm fears that a price rise will be unmatched by rivals while a price cut will be matched immediately, triggering a price war.

Despite these concerns, grocery price inflation has been a major political issue. In 2022-23 UK food prices rose by around 19% at their peak, and the CMA launched a review of whether the big supermarkets were using the cost-of-living crisis to protect or expand their profit margins. Consumer groups argued that shoppers in rural areas, where there is often only one supermarket within easy reach, had no ability to shop around.

Question 2.1 [5 marks]
Using the data, outline the characteristics of oligopoly shown in the UK supermarket market.

Question 2.2 [7 marks]
Using Figure 2, calculate the marginal revenue (MR) and marginal cost (MC) for each of the output levels (baskets/week) from 0 to 800. Record the answers in your pink answer booklet. Using your answers, explain at what level of output Bob's Supermarket will, in theory, maximise profits.

Question 2.3 [10 marks]
Using a costs and revenue diagram, evaluate the effects on a supermarket's abnormal profits of participating in an 'Aldi Price Match' scheme.

Question 2.4 [7 marks]
Evaluate the view that tacit collusion is inevitable in oligopoly markets.

Question 2.5 [11 marks]
With reference to the data, discuss the extent to which oligopoly in the UK supermarket industry leads to a reduction in economic welfare.

**END OF PAPER**
`,
  },
  {
    id: "wjec-p2-b",
    subject: "wjec" as any,
    paper: "2",
    title: "Paper 2 — Set B (Hard)",
    description: "Component 2: Exploring Economic Behaviour — Hard tier (verbatim from PDF).",
    totalMarks: 80,
    content: `# WJEC GCE A LEVEL Economics — A520U20-1 — Component 2: Exploring Economic Behaviour — Predicted Paper (Hard)

**Time: 2 hours 30 minutes | Total: 80 marks**

Answer **all** questions.

## SECTION A — A roof over your head

Few economic issues generate as much political heat in the UK as the price of housing. Over the last forty years, the average UK house price has risen much faster than average earnings, so that the ratio of house prices to incomes has roughly doubled (Figure 1). The gap is most extreme in London and the South East, where median house prices now stand at more than 12 times median earnings — well above the long-run average of around four times.

**Figure 1 — UK house price to earnings ratio, 1985-2024 (long-run average ≈ 4)**

| Year | Ratio | Year | Ratio | Year | Ratio | Year | Ratio |
|---|---|---|---|---|---|---|---|
| 1985 | 3.2 | 1995 | 3.4 | 2005 | 6.7 | 2015 | 7.0 |
| 1987 | 3.5 | 1997 | 3.7 | 2007 | 7.3 | 2017 | 7.7 |
| 1989 | 3.9 | 1999 | 4.2 | 2009 | 7.1 | 2019 | 8.4 |
| 1991 | 3.3 | 2001 | 5.0 | 2011 | 6.9 | 2021 | 8.8 |
| 1993 | 3.1 | 2003 | 5.8 | 2013 | 6.6 | 2023 | 8.3 |

**Supply and demand.** Commentators disagree on the causes. On the demand side, real incomes, population growth, smaller household sizes and — until recently — historically low interest rates have all pushed demand upwards. Between 2009 and 2021 the Bank Rate averaged below 1%, making mortgages cheaper and encouraging purchasers to bid more. The Help to Buy scheme, which provided government-backed equity loans for buyers of new-build homes, is estimated by the NAO to have raised prices by around £16,000 for eligible homes.

On the supply side, UK housebuilding has consistently fallen short of government targets. Against an official target of 300,000 new homes per year, completions have averaged around 220,000 over the last decade (Figure 2).

**Figure 2 — UK annual housing completions vs government target (target = 300k)**

| Year | Homes built (thousands) |
|---|---|
| 2014 | ~145 | 2015 | ~160 | 2016 | ~175 | 2017 | ~195 | 2018 | ~215 |
| 2019 | ~220 | 2020 | ~185 | 2021 | ~210 | 2022 | ~235 | 2023 | ~230 |

**The affordability squeeze.** Since 2022 the picture has changed. The Bank of England has raised interest rates sharply to fight inflation, pushing the average two-year fixed mortgage rate above 5%. For a typical first-time buyer, this has added several hundred pounds per month to their mortgage payments. At the same time, private rents have risen by around 9% a year, because landlords face higher mortgage costs of their own and some have left the market. The English Housing Survey estimates that 4.2 million households now spend more than 30% of their disposable income on housing — the accepted threshold for housing stress.

**Figure 3 — UK nominal wage growth vs private rent growth (% per year)**

| Year | Nominal wage growth | Private rent growth |
|---|---|---|
| 2015 | ~2.0 | ~1.8 | 2016 | ~2.2 | ~1.9 | 2017 | ~2.5 | ~1.7 |
| 2018 | ~2.8 | ~1.3 | 2019 | ~3.2 | ~1.4 | 2020 | ~1.8 | ~1.5 |
| 2021 | ~4.0 | ~2.4 | 2022 | ~5.6 | ~5.5 | 2023 | ~6.7 | ~9.2 |
| 2024 | ~5.3 | ~8.5 | | | | |

**What the government could do.** Policy proposals fall into three broad groups. First, some argue for more aggressive supply-side action: planning reform, compulsory purchase of under-used urban land, and large-scale social housebuilding directly by local authorities. Second, others advocate demand-side measures such as stricter rules on mortgage lending or stamp duty reform. Third, rent controls have been proposed for the private rented sector, arguing that regulation is needed because tenants cannot easily relocate and face significant search and moving costs when choosing between landlords.

Each approach has strengths and weaknesses. Supply-side reforms face significant political opposition from existing homeowners. Demand-side restrictions can lock first-time buyers out of the market altogether. And the economic evidence on rent controls is heavily contested: some studies suggest that controls reduce the quality and quantity of rental supply, while others find that moderate 'second-generation' controls — which cap increases rather than absolute rents — can protect existing tenants without greatly reducing supply.

Question 1.1 [5 marks]
Using the data, explain why UK house prices have risen more quickly than average incomes over the past forty years.

Question 1.2 [5 marks]
Using the data, explain why higher interest rates have reduced housing affordability for first-time buyers.

Question 1.3 [10 marks]
Evaluate the effectiveness of government policies aimed at improving the affordability of owner-occupied housing in the UK.

Question 1.4 [10 marks]
Using the data, discuss the extent to which rent controls would be beneficial for low-income tenants.

Question 1.5 [10 marks]
Using the data, discuss whether increasing housing supply is the best way to solve the UK housing crisis.

## SECTION B — Working in the gig economy

Over the past decade the UK labour market has been transformed by the rise of the 'gig economy'. The Office for National Statistics estimates that around 4.4 million people now do some paid work through digital platforms such as Uber, Deliveroo, Amazon Flex and TaskRabbit — up from fewer than 400,000 in 2016. For many of these workers, platform work is a second job that provides additional income; for others, it is their main source of earnings.

**Why workers and firms use platforms.** Workers report that the main advantages of gig work are flexibility and the ability to fit earning around caring responsibilities or studies. Firms, for their part, benefit from a large on-demand workforce without the fixed costs of employing staff directly, and without paying employer National Insurance, holiday pay or sick pay, because most gig workers are classified as self-employed rather than employees.

**The other side of the coin.** Critics point out that the same features that make gig work attractive to firms can be damaging for workers. Platforms typically set the price of each ride or delivery unilaterally, and individual workers have no realistic ability to negotiate. Because switching between platforms is costly (each requires vehicle checks, training and a period of building up a reputation score), many workers effectively face a small number of dominant buyers for their labour — a situation sometimes described as 'platform monopsony'.

**Figure 1 — Hourly labour supply schedule for a delivery platform**

| Hourly wage offered | Workers willing to supply labour | MRP of the last worker | Total wage bill |
|---|---|---|---|
| £8 | 0 | — | £0 |
| £9 | 10 | £18 | £90 |
| £10 | 20 | £16 | £200 |
| £11 | 30 | £14 | £330 |
| £12 | 40 | £12 | £480 |
| £13 | 50 | £10 | £650 |
| £14 | 60 | £8 | £840 |
| £15 | 70 | £6 | £1050 |

**The minimum wage debate.** The National Living Wage, which applies to workers aged 21 and over, rose to £11.44 per hour in April 2024, with the Low Pay Commission aiming to reach two-thirds of median hourly earnings. Supporters argue that the minimum wage has raised the incomes of the lowest-paid workers without causing significant unemployment — exactly what standard theory predicts when employers have monopsony power. Critics respond that a rising minimum wage squeezes small businesses in low-wage sectors and that, in the longer term, firms respond by automating tasks previously done by low-paid workers.

Gig workers, however, are excluded from much of this protection because they are not technically employees. A series of high-profile legal cases, including the Supreme Court's 2021 ruling against Uber, have begun to narrow this gap. The Court ruled that Uber drivers were 'workers' under UK employment law and were entitled to the minimum wage, paid leave and whistleblowing protection. Similar challenges are continuing against other platforms.

**Figure 2 — UK real wages and labour productivity, 1990-2023 (Index, 1990 = 100)**

| Year | Real labour productivity | Real wages |
|---|---|---|
| 1990 | 100 | 100 | 1995 | ~118 | ~114 | 2000 | ~139 | ~130 |
| 2005 | ~151 | ~134 | 2010 | ~156 | ~125 | 2015 | ~163 | ~126 |
| 2020 | ~171 | ~126 | | | | | | |

Over the long run UK real wages have grown much more slowly than labour productivity (Figure 2). Economists are divided on how much of this 'wage squeeze' reflects the decline of collective bargaining, how much reflects structural changes in the labour market including the growth of platform work, and how much reflects slower productivity growth of its own accord.

Question 2.1 [5 marks]
Using the data, outline the characteristics of monopsony power shown in the UK labour market for gig workers.

Question 2.2 [7 marks]
Using Figure 1, calculate the marginal cost of labour (MCL) at each level of employment. Record the answers in your pink answer booklet. Using your answers, explain at what level of employment a monopsonistic platform would maximise profits.

Question 2.3 [10 marks]
Using a labour market diagram, evaluate the effects on employment and wages of imposing a binding minimum wage in a monopsonistic labour market.

Question 2.4 [7 marks]
Evaluate the view that trade unions always cause unemployment.

Question 2.5 [11 marks]
With reference to the data, discuss the extent to which the growth of the gig economy has reduced economic welfare in the UK.

**END OF PAPER**
`,
  },
  {
    id: "wjec-p2-c",
    subject: "wjec" as any,
    paper: "2",
    title: "Paper 2 — Set C (Advanced)",
    description: "Component 2: Exploring Economic Behaviour — Advanced tier (verbatim from PDF).",
    totalMarks: 80,
    content: `# WJEC GCE A LEVEL Economics — A520U20-1 — Component 2: Exploring Economic Behaviour — Predicted Paper (Advanced)

**Time: 2 hours 30 minutes | Total: 80 marks**

Answer **all** questions.

## SECTION A — The productivity puzzle

For most of the post-war period, UK output per hour worked rose steadily at around 2-2.5% per year. Since the 2008 financial crisis, however, productivity growth has almost ground to a halt, averaging around 0.5% per year. This slowdown has become so persistent that economists refer to it as the 'UK productivity puzzle' (Figure 1). If productivity had continued to grow at the pre-crisis trend, UK GDP per capita would be around 25% higher today.

**Figure 1 — UK labour productivity vs pre-crisis trend (Index, 1998 = 100)**

| Year | Actual productivity | Pre-2008 trend |
|---|---|---|
| 2000 | ~103 | ~101 | 2005 | ~120 | ~116 | 2007 | ~124 | ~122 |
| 2010 | ~121 | ~130 | 2015 | ~124 | ~144 | 2020 | ~127 | ~160 |
| 2023 | ~129 | ~173 | | | | | | |

**Possible explanations.** There is no consensus on the cause. One school of thought emphasises weak investment: UK business investment as a share of GDP has been below the G7 average for most of the past forty years (Figure 2). Low investment means a smaller capital stock per worker, and hence lower potential output per worker.

**Figure 2 — Business investment as share of GDP, G7 comparison (Gross fixed capital formation, % of GDP, avg 2010-2022)**

| Country | Japan | Germany | France | Canada | US | Italy | UK |
|---|---|---|---|---|---|---|---|
| % of GDP | ~25.5 | ~23.0 | ~23.0 | ~23.5 | ~21.5 | ~20.5 | ~18.0 |

A second school stresses structural change. Productivity growth in the finance and ICT sectors — which drove much of the pre-crisis acceleration — has slowed dramatically, while the rapidly growing service sectors such as hospitality and social care typically have lower productivity than manufacturing.

A third argues that mismeasurement plays a role: digital goods and services often have very low marginal cost and are available free to consumers, so the value they generate may not be fully captured by GDP. If true, this implies that measured productivity understates actual welfare gains.

**Demographic and fiscal pressures.** At the same time, the UK's population is ageing. The Office for Budget Responsibility projects that the old-age dependency ratio — the ratio of over-65s to people of working age — will rise from around 31% today to 47% by 2070. This has two major consequences. First, the potential growth rate of the economy falls, because a smaller share of the population is in work. Second, public spending on pensions, healthcare and long-term care rises faster than the tax base, putting pressure on the public finances (Figure 3).

**Figure 3 — Old-age dependency and projected debt interest, UK**

| Year | Old-age dependency ratio (%) | Debt interest (% of GDP) |
|---|---|---|
| ~1995 | ~24 | ~3.2 | 2000 | ~27 | ~2.2 | ~2005 | ~26 | ~2.5 |
| 2010 | ~30 | ~2.8 | ~2015 | ~34 | ~3.1 | 2020 | ~40 | ~3.5 |
| ~2025 | ~43 | ~4.2 | ~2030 | ~45 | ~5.0 | ~2035 | ~47 | ~5.8 |
| ~2040 | ~49 | ~6.5 | | | | | | |

UK public sector net debt has risen from around 35% of GDP in 2007 to close to 100% today. With interest rates higher than in the 2010s, debt interest now absorbs around 8% of total government spending — more than is spent on defence or transport. Economists disagree about the significance. Some argue that fiscal space is genuinely constrained and that any new spending must be funded by tax rises or spending cuts elsewhere. Others argue that well-targeted public investment — particularly in research and development, infrastructure and skills — can pay for itself over time by raising the growth rate.

**Policy responses.** The UK government has proposed a range of supply-side policies including 'full expensing' of business investment in plant and machinery, reforms to the R&D tax credits system, planning reforms to accelerate infrastructure delivery, and changes to the apprenticeship levy. The Bank of England, meanwhile, has highlighted long-run risks to potential output from the post-pandemic rise in long-term sickness, which has pushed several hundred thousand people out of the labour force.

Question 1.1 [5 marks]
Using the data, explain why UK productivity growth has slowed since 2008.

Question 1.2 [5 marks]
Using the data, explain why an ageing population creates challenges for the sustainability of the UK public finances.

Question 1.3 [10 marks]
Evaluate the effectiveness of supply-side policies in raising UK productivity.

Question 1.4 [10 marks]
Using the data, discuss the extent to which rising public debt limits the UK government's ability to boost long-run economic growth.

Question 1.5 [10 marks]
Using the data, discuss whether the UK's productivity problems are primarily structural or cyclical.

## SECTION B — Too big to compete?

Over the past two decades a small number of digital platforms — Alphabet (Google), Amazon, Apple, Meta (Facebook) and Microsoft — have come to dominate major segments of the global economy. Between them they account for well over half of global digital advertising, more than 80% of mobile operating systems and a rising share of cloud computing and AI infrastructure. Their revenues and, in particular, their operating margins, far exceed those of traditional firms (Figure 1).

**Figure 1 — Operating margins and R&D intensity, large US tech firms (2023)**

| Firm | Operating margin (%) | R&D as % of revenue |
|---|---|---|
| Alphabet | 26 | 14 | Amazon | 6 | 12 | Apple | 30 | 8 |
| Meta | 35 | 29 | Microsoft | 42 | 13 | S&P 500 avg | 11 | 3 |

**Sources of market power.** These firms enjoy market power for reasons that are distinctive to digital markets. First, network effects: a social network, search engine or marketplace becomes more valuable to each user as more users join, creating a strong tendency towards 'winner-takes-most' outcomes. Second, economies of scale: the marginal cost of serving an additional user is often close to zero, meaning a larger firm can set prices below the average cost of smaller rivals. Third, control over data: dominant platforms accumulate data on user behaviour that can be used to refine products and target advertising in ways that new entrants cannot easily match.

Figure 2 shows a stylised monthly cost and revenue schedule for 'PlatformCo', a dominant digital platform. All values are in millions of pounds.

**Figure 2 — PlatformCo: monthly price, quantity and cost schedule**

| Price (£/user) | Users (m) | Total Cost (£m) |
|---|---|---|
| £100 | 0 | £20 |
| £90 | 1 | £35 |
| £80 | 2 | £60 |
| £70 | 3 | £95 |
| £60 | 4 | £140 |
| £50 | 5 | £195 |
| £40 | 6 | £260 |
| £30 | 7 | £335 |
| £20 | 8 | £420 |

**Innovation and consumer welfare.** Defenders of big tech argue that high monopoly profits have funded unprecedented levels of investment in research and development. Alphabet and Microsoft each spend more on R&D each year than the entire UK government, and much of this spending has translated into products that consumers use for free. On this view, the large producer surplus earned by dominant platforms is a reward for innovation, and attempts to constrain it — whether through structural break-up, price regulation or mandatory interoperability — risk reducing the incentive to innovate.

**The case for regulation.** Critics reply that the welfare effects of platform dominance are more complex. When consumers pay nothing for a service such as search or social networking, traditional measures of consumer surplus based on price do not capture the cost to users. Instead, users pay with attention and personal data, and they may be exposed to lower-quality services, weaker privacy protection or higher advertising loads than would prevail in a competitive market. There is also growing evidence that dominant platforms use their position in one market to foreclose competition in adjacent markets — for example by favouring their own products in search results or app stores.

The UK Digital Markets, Competition and Consumers Act 2024 gives the CMA new powers to designate firms with 'strategic market status' and to impose bespoke conduct requirements on them. The EU's Digital Markets Act (2022) takes a similar ex-ante approach in Europe, while the United States has so far relied on case-by-case antitrust litigation. Each of these frameworks faces difficult trade-offs between deterring harmful conduct, preserving incentives to innovate, and keeping up with fast-moving technological change.

Question 2.1 [5 marks]
Using the data, outline the characteristics of monopoly shown by dominant digital platforms.

Question 2.2 [7 marks]
Using Figure 2, calculate the total revenue, total cost and abnormal profit at each output level for PlatformCo. Record the answers in your pink answer booklet. Using your answers, identify the profit-maximising output and the revenue-maximising output, and explain why they differ.

Question 2.3 [10 marks]
Using a monopoly diagram, evaluate the welfare effects of breaking up a dominant digital platform into smaller competing firms.

Question 2.4 [7 marks]
Evaluate the view that sustained innovation requires firms to enjoy significant monopoly power.

Question 2.5 [11 marks]
With reference to the data, discuss the extent to which ex-ante regulation (such as the UK's Digital Markets, Competition and Consumers Act 2024) can effectively constrain the market power of dominant digital platforms.

**END OF PAPER**
`,
  },
  // ─────────────────────────────────────────────────────────────────
  // WJEC A-Level Economics — A2 Unit 3 (1520U30-1) — verbatim from
  // /public/wjec-mocks/paper-3-{moderate|hard|advanced}.pdf.
  // Each paper = 80 marks (Section A 8+7+8+6+11=40, Section B 10+8+10+12=40).
  // ─────────────────────────────────────────────────────────────────
  {
    id: "wjec-p3-a",
    subject: "wjec" as any,
    paper: "3",
    title: "Paper 3 — Set A (Moderate)",
    description: "A2 Unit 3: Exploring Economic Behaviour — Moderate tier (verbatim from PDF).",
    totalMarks: 80,
    content: `# WJEC GCE A LEVEL Economics — 1520U30-1 — A2 Unit 3: Exploring Economic Behaviour — Predicted Paper (Moderate)

**Time: 2 hours | Total: 80 marks**

Answer **all** questions.

## SECTION A

**Question 1.** In 2022, Amazon opened its largest UK fulfilment centre in Swindon, covering an area the size of 28 football pitches. Amazon has aggressively expanded its UK warehouse network to benefit from economies of scale, bulk-buying from suppliers and using sophisticated robotic technology. Amazon's investment has encouraged component suppliers, logistics firms and packaging companies to open facilities nearby, and the local council has improved road links to the site.

However, some commentators have raised concerns about Amazon's expansion. Reports suggest that as sites have grown larger, managers have struggled to supervise workers effectively, communication between warehouse floors has broken down, and staff turnover has risen sharply as worker morale declines.

Question 1 (a) [4 marks]
Using a diagram and with reference to the data, outline the difference between internal economies of scale and internal diseconomies of scale.

Question 1 (b) [4 marks]
Using a diagram, outline how Amazon might benefit from external economies of scale in Swindon.

**Question 2.** The diagram below represents a short-run profit-maximising firm operating in a monopolistically competitive market. (Standard monopolistically competitive firm diagram showing downward-sloping AR and MR curves, with U-shaped AC and MC curves. AR is above AC at the profit-maximising output. Key curves shown: MC, AC, AR (D), MR.)

Question 2 (a) [1 marks]
On the diagram, indicate the profit-maximising level of output produced by this firm.

Question 2 (b) [2 marks]
Shade the area that represents the firm's short-run supernormal (abnormal) profit.

Question 2 (c) [4 marks]
Explain what will happen to this firm's level of supernormal profit in the long run.

**Question 3.** Royal Mail is the UK's universal postal service, established in 1516 and nationalised in 1969. In 2013, the UK government partially privatised Royal Mail, selling 60% of its shares to private investors and employees through a stock market flotation. By 2015, Royal Mail had been fully privatised.

Supporters of privatisation argued that Royal Mail needed private investment to modernise, respond to declining letter volumes, and compete with parcel rivals such as DPD and Amazon Logistics. Critics argued that the shares were sold at too low a price, meaning taxpayers lost out, and that a privatised Royal Mail would prioritise shareholder returns over service quality.

Since privatisation, Royal Mail has invested heavily in parcel automation, but has also faced strikes by Communication Workers' Union (CWU) members, a fall in share price below the 2013 flotation level, and fines from Ofcom for missing delivery targets. In 2024, Royal Mail's parent company agreed to a £3.5bn takeover by a Czech billionaire.

Question 3 [8 marks]
Evaluate the view that the privatisation of Royal Mail has been successful.

**Question 4.** In 2022 and 2023, the Bank of England raised its Bank Rate from 0.25% to 5.25% in response to rising inflation.

**Figure 1: Bank of England Bank Rate 2021–2024**

| Date | Bank Rate (%) |
|---|---|
| Dec 2021 | 0.25 |
| June 2022 | 1.25 |
| Dec 2022 | 3.50 |
| June 2023 | 5.00 |
| Aug 2023 | 5.25 |
| Aug 2024 | 5.00 |

Question 4 [6 marks]
Analyse the likely impact of higher interest rates on aggregate demand in the UK.

**Question 5.** The Bank of England has a symmetric CPI inflation target of 2%.

**Figure 1: UK CPI inflation rate 2019–2024 (annual % change)**

| Year | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|---|
| CPI inflation (%) | 1.8 | 0.9 | 2.6 | 9.1 | 7.3 | 2.8 |

**Figure 2: UK annual inflation rate for selected product categories, March 2022 to March 2023**

| Category | Food | Household energy | Clothing & footwear | Housing rent | Transport services | Motor fuel |
|---|---|---|---|---|---|---|
| Annual inflation rate | 19.1% | 26.1% | 7.2% | 4.9% | 6.3% | -5.9% |
| Weighting (% of spending) | 11 | 27 | 7 | 31 | 18 | 6 |

Question 5 (a) [3 marks]
Using the data in Figure 2, calculate a price index for the UK in March 2023, taking March 2022 as the base period. You are advised to show your working.

**Figure 3: Index of real and nominal average weekly earnings in the UK, 2019–2023 (2023 = 100)**

| Year | Nominal wage index | Real wage index |
|---|---|---|
| 2019 | 84 | 104 |
| 2020 | 87 | 105 |
| 2021 | 91 | 104 |
| 2022 | 95 | 101 |
| 2023 | 100 | 100 |

Question 5 (b) [8 marks]
Assess whether the UK is likely to experience a wage-price spiral.

## SECTION B — The UK Cost of Living Crisis

Between 2021 and 2024, UK households experienced the most severe squeeze on living standards since the 1950s. Consumer prices rose by over 20% cumulatively, while average real wages fell for much of the period. Low-income households were hit hardest, as essentials such as food and energy make up a larger share of their spending.

**Figure 1: UK household disposable income per capita (2019 = 100, real terms)**

| Year | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|---|
| Real disposable income per capita | 100 | 101 | 102 | 98 | 97 | 99 |

The energy price shock was driven partly by the war in Ukraine, which pushed European wholesale gas prices to record highs. The UK is particularly vulnerable because around 40% of homes rely on gas-fired heating and the UK imports roughly half of its natural gas.

**Table 1: UK imported commodity prices 2020–2023**

| Commodity | 2020 price | 2023 price |
|---|---|---|
| Natural gas (£/therm) | 0.25 | 1.10 |
| Wheat (£/tonne) | 155 | 230 |
| Crude oil (£/barrel) | 34 | 65 |
| Fertiliser (£/tonne) | 180 | 560 |

UK firms that import raw materials, components or energy passed rising costs through to final consumers. This was particularly evident in food manufacturing and hospitality. Many small and medium-sized enterprises (SMEs) reported falling profit margins and, in some sectors, a wave of business closures. Pub closures reached their highest level in over a decade in 2023.

**Figure 2: UK Bank Rate and CPI inflation, 2021–2024**

| Year | Bank Rate (%) end-year | CPI inflation (%) |
|---|---|---|
| 2021 | 0.25 | 5.4 |
| 2022 | 3.50 | 10.5 |
| 2023 | 5.25 | 4.0 |
| 2024 | 5.00 | 2.8 |

The UK government faced policy difficulties. Running a large fiscal deficit could fuel inflation further, while austerity would damage public services already struggling after more than a decade of restraint. The government ultimately chose a mixed approach: an Energy Price Guarantee subsidy that cost an estimated £40bn, one-off cost-of-living payments to low-income households, and an increase in the windfall tax on North Sea oil and gas producers. UK public sector debt rose above 100% of GDP for the first time since the 1960s.

The Bank of England could have intervened more aggressively. Some commentators argued that the Bank should have raised interest rates earlier and more sharply to contain inflation. Others argued this would have pushed the UK into a deep recession, with millions of mortgage holders facing unaffordable repayments. Alternatively, the Bank could have used quantitative tightening (selling government bonds) more rapidly to reduce the money supply.

In the long run, some have argued that the UK needs a coherent industrial strategy to reduce dependence on imported energy and food. Proposals include investment in nuclear power, offshore wind, domestic food production, and retraining to support the green transition. Critics argue that such strategies have been tried before and that the UK's problems are more deep-seated, including chronically low productivity growth (under 1% per year since 2008), skills shortages, and regional inequality.

**Table 2: Selected UK socio-economic indicators**

| Indicator | UK | G7 average | OECD average |
|---|---|---|---|
| Life expectancy at birth (years) | 80.4 | 82.1 | 80.3 |
| Labour productivity (GDP per hour, US$) | 62.5 | 71.8 | 57.2 |
| Adult literacy (%) | 99.0 | 99.1 | 98.1 |
| Gini coefficient (income inequality) | 0.355 | 0.330 | 0.316 |
| Public debt (% of GDP) | 101.3 | 121.8 | 90.4 |
| Renewable electricity generation (%) | 43.1 | 32.0 | 31.7 |

By late 2024, UK inflation had fallen back close to the 2% target, and the Bank of England began to cut interest rates. However, many households reported that their standard of living had not yet recovered to pre-2022 levels. The new government promised a 'decade of national renewal' based on investment, reform of planning rules, and closer trading relations with the EU.

Question 6 (a) (i) [2 marks]
Using the data in Table 1, calculate the percentage change in the price of natural gas between 2020 and 2023. You are advised to show your working.

Question 6 (a) (ii) [2 marks]
A UK food manufacturer uses 500 tonnes of wheat and 100 tonnes of fertiliser per year. Using the data in Table 1, calculate the percentage increase in its total annual commodity cost between 2020 and 2023. You are advised to show your working.

Question 6 (b) [6 marks]
With reference to the data and using a cost and revenue diagram, show how higher commodity and energy prices have resulted in higher prices, fewer sales and falling profits for UK firms.

Question 7 [8 marks]
Evaluate the extent to which the UK's cost of living crisis was the result of external rather than internal factors.

Question 8 [10 marks]
Discuss whether the Bank of England should have intervened more aggressively through monetary policy, as suggested in the case, to control inflation in the UK.

Question 9 [12 marks]
With reference to the case study, discuss whether living standards in the UK are likely to be improved by the government's proposed industrial strategy.

**END OF PAPER**
`,
  },
  {
    id: "wjec-p3-b",
    subject: "wjec" as any,
    paper: "3",
    title: "Paper 3 — Set B (Hard)",
    description: "A2 Unit 3: Exploring Economic Behaviour — Hard tier (verbatim from PDF).",
    totalMarks: 80,
    content: `# WJEC GCE A LEVEL Economics — 1520U30-1 — A2 Unit 3: Exploring Economic Behaviour — Predicted Paper (Hard)

**Time: 2 hours | Total: 80 marks**

Answer **all** questions.

## SECTION A

**Question 1.** Toyota is the world's largest carmaker by volume, producing over 10 million vehicles per year. Toyota's Tsutsumi plant in Japan produces more than 500,000 vehicles annually using specialised robotic assembly lines and the Toyota Production System (TPS), which is widely studied as a model of efficient manufacturing. Specialisation within the plant and long production runs help keep the unit cost of each vehicle low.

Toyota's presence in Aichi Prefecture has drawn in hundreds of component suppliers (known as 'keiretsu' firms), a dense network of local engineering schools, and transport infrastructure subsidised by the regional government. However, Toyota's global expansion has led to well-publicised difficulties: a 2010 recall of over 9 million vehicles was partly blamed on communication failures between distant divisions; middle-management layers expanded rapidly; and production mistakes at overseas plants have at times caused costly delays.

Question 1 (a) [4 marks]
Using a diagram and with reference to the data, outline the difference between internal economies of scale and internal diseconomies of scale.

Question 1 (b) [4 marks]
Using a diagram, outline how Toyota might benefit from external economies of scale in Aichi Prefecture.

**Question 2.** The diagram below represents a profit-maximising firm operating in an oligopolistic market with a kinked demand curve. (Kinked demand curve with price P* on the y-axis. AR (demand) is elastic above the kink and inelastic below. MR has a vertical discontinuity at the kink. MC and AC curves shown, with MC passing through the vertical section of MR. Key curves shown: MC, AC, AR (kinked demand), MR (with discontinuity at the kink).)

Question 2 (a) [1 marks]
On the diagram, indicate the profit-maximising level of output produced by this firm.

Question 2 (b) [2 marks]
Shade the area that represents the firm's total fixed costs of production.

Question 2 (c) [4 marks]
Explain why the firm's price is likely to remain stable even if its marginal cost changes slightly.

**Question 3.** Japan Post (Nippon Yūsei) is the giant state-owned postal, banking and life insurance conglomerate. At the time of its partial privatisation in 2015, it held over ¥200 trillion (US$1.8tn) in deposits and insurance funds, making it one of the largest financial institutions in the world. Japan Post was privatised in stages, with the government initially selling around 11% of shares and continuing to hold a majority stake.

The reform aimed to improve efficiency, release capital for investment, and allow Japan Post to compete with private banks and insurers on equal terms. Supporters argued Japan Post's deposits were being inefficiently recycled into low-return Japanese Government Bonds, crowding out private investment. Critics countered that Japan Post's network of 24,000 post offices served an ageing rural population who depend on its savings and insurance products; privatisation might lead to branch closures and loss of universal service.

Post-privatisation, Japan Post's acquisition of Australia's Toll Holdings in 2015 resulted in a ¥400bn write-down. The company's share price has underperformed the Nikkei. Rural branch closures have been limited by regulation, but critics say service quality has declined. In 2021, mis-selling scandals at Japan Post Insurance prompted further reform pressure.

Question 3 [8 marks]
Evaluate the view that Japan's partial privatisation of Japan Post has been successful.

**Question 4.** The Bank of Japan (BoJ) ran negative interest rates from 2016 to 2024. Figure 1 shows the BoJ policy rate over this period.

**Figure 1: Bank of Japan short-term policy rate, 2015–2024 (%)**

| Year | 2015 | 2016 | 2018 | 2020 | 2022 | 2024 (Mar) | 2024 (Jul) |
|---|---|---|---|---|---|---|---|
| Policy rate (%) | 0.10 | -0.10 | -0.10 | -0.10 | -0.10 | 0.10 | 0.25 |

Question 4 [6 marks]
Analyse the likely impact of negative interest rates on aggregate demand in Japan.

**Question 5.** For over two decades, Japan experienced near-zero or negative inflation. In 2022–2023 Japanese inflation rose sharply due to a weak yen and rising global commodity prices. The BoJ has a 2% CPI inflation target.

**Figure 1: Japan core CPI inflation rate 2018–2024 (annual % change)**

| Year | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|---|---|
| Core CPI (%) | 0.3 | 0.5 | -0.4 | -0.2 | 2.3 | 3.1 | 2.5 |

**Figure 2: Japan annual inflation rate for selected product categories, April 2022 to April 2023**

| Category | Energy | Food (excl. fresh) | Durable goods | Services | Rent | Recreation |
|---|---|---|---|---|---|---|
| Annual inflation rate | 14.6% | 9.0% | 7.4% | 1.8% | 0.4% | 3.7% |
| Weighting (% of spending) | 7 | 22 | 12 | 50 | 7 | 2 |

Question 5 (a) [3 marks]
Using the data in Figure 2, calculate a price index for Japan in April 2023, taking April 2022 as the base period. You are advised to show your working.

**Figure 3: Index of real and nominal average wages in Japan, 2019–2023 (2023 = 100)**

| Year | Nominal wage index | Real wage index |
|---|---|---|
| 2019 | 98 | 104 |
| 2020 | 96 | 103 |
| 2021 | 97 | 103 |
| 2022 | 99 | 102 |
| 2023 | 100 | 100 |

In Japan's 'shuntō' (spring wage negotiations), 2023 delivered average wage rises of 3.6% — the largest in thirty years — and 2024 produced 5.1% rises. However, real wages remained negative for 21 consecutive months through 2024.

Question 5 (b) [8 marks]
Assess whether Japan is likely to experience a wage-price spiral.

## SECTION B — Japan's yen crisis and 'Abenomics' reckoning

In 2022 the Japanese yen (¥) collapsed to a 32-year low against the US dollar, depreciating from ¥115/US$ at the start of the year to over ¥150/US$ by October. Although the yen recovered partially by 2024, it remained historically weak, touching ¥161/US$ in July 2024 before the Bank of Japan finally ended its negative-interest-rate policy. Japan is the world's third-largest economy and its currency moves have global financial market implications.

**Figure 1: USD/JPY exchange rate, 2021–2024 (yen per US dollar)** *(A higher number means a weaker yen.)*

| Date | Jan 2021 | Jan 2022 | Oct 2022 | Jan 2023 | Jul 2024 | Oct 2024 |
|---|---|---|---|---|---|---|
| ¥ per US$ | 103 | 115 | 150 | 131 | 161 | 152 |

Japan is highly dependent on imports of energy and food. The country imports around 90% of its oil and over 60% of its food. Combined with rising global commodity prices from 2021 onwards, yen weakness created severe inflationary pressure for Japanese consumers and firms for the first time in a generation.

**Table 1: Prices of selected Japanese imports 2020–2023 (¥/tonne or ¥/barrel)**

| Commodity | 2020 price (¥) | 2023 price (¥) |
|---|---|---|
| Crude oil (¥/barrel) | 4,400 | 11,800 |
| LNG (¥/tonne) | 47,000 | 143,000 |
| Wheat (¥/tonne) | 27,000 | 54,000 |
| Beef (¥/kg import) | 760 | 1,320 |

Japanese firms have absorbed much of these cost increases, with profit margins squeezed. However, from 2023 onward, companies began passing costs through to consumers: in a society where price rises were long considered taboo, firms such as Yamazaki Baking and Kewpie mayonnaise increased prices repeatedly, to consumer outcry. Small businesses have been particularly vulnerable — Teikoku Databank recorded a 30% year-on-year rise in corporate bankruptcies in 2023, with yen weakness cited as a primary factor for import-dependent firms.

Japan's central bank faced a policy dilemma. Raising interest rates would support the yen and tame imported inflation, but risked triggering a 'carry-trade unwind' — global investors have borrowed yen cheaply for decades to invest in higher-yielding assets abroad, and a Japanese rate rise could cause sharp global market volatility (as was briefly seen in August 2024). Higher rates would also raise debt-service costs on Japan's government debt, which at 263% of GDP is the highest of any developed economy. Alternatively, the BoJ could intervene directly in currency markets by selling US dollars and buying yen.

**Figure 2: Japan's foreign exchange reserves (US$ billion, month-end)**

| Month | Jan 2022 | Jul 2022 | Oct 2022 | Jan 2023 | Jul 2023 | Jul 2024 |
|---|---|---|---|---|---|---|
| Forex reserves (US$bn) | 1,386 | 1,323 | 1,194 | 1,228 | 1,253 | 1,219 |

In September and October 2022, Japan spent over ¥9 trillion (US$65bn) of its reserves intervening to support the yen — the largest yen-buying intervention in history. A further ¥9.8 trillion was spent in April and May 2024. While these interventions temporarily slowed the yen's slide, they did not reverse the trend until the BoJ finally raised rates in July 2024.

The weak yen has had mixed effects on Japan's current account. Japan's famed exporters — Toyota, Sony, Nintendo — have benefited from more competitive prices abroad and a translation boost when foreign earnings are converted to yen. Japan's tourism sector has boomed, with inbound visitor numbers exceeding pre-COVID levels in 2024. However, Japan's energy and food import bill has ballooned, and many of Japan's export 'champions' now produce much of their output overseas, reducing the boost to the trade balance from a weak yen.

Some economists argue Japan's problems are structural rather than cyclical. Japan's population is ageing rapidly — the working-age population has shrunk by over 12 million since 1995. Productivity growth has been sluggish (around 0.5% per year since 2000). Labour market rigidities mean wages adjust slowly, and 'lifetime employment' norms can discourage labour mobility. Critics of 'Abenomics' — the reform programme launched by the late PM Shinzo Abe in 2013 — argue that while the first two 'arrows' (loose monetary policy, fiscal expansion) were fired, the crucial 'third arrow' of structural reform was never delivered.

**Table 2: Japan — selected indicators**

| Indicator | Japan | OECD average | G7 average |
|---|---|---|---|
| GDP growth (2015–2023, annual avg) | 0.7% | 1.9% | 1.6% |
| Productivity (GDP per hour, US$) | 53.4 | 57.2 | 71.8 |
| Old-age dependency ratio (65+ / working age, %) | 50.3 | 31.7 | 37.4 |
| Female labour force participation (%) | 73.6 | 65.1 | 66.7 |
| Public debt (% of GDP) | 263.0 | 90.4 | 121.8 |
| Corporate R&D (% of GDP) | 2.6 | 1.8 | 2.2 |

In October 2024, a new Japanese government announced a ¥13 trillion fiscal support package to ease cost-of-living pressures and support small businesses. The BoJ signalled further gradual rate rises through 2025. But some commentators argue that after three decades of unconventional monetary policy, Japan needs deeper reform: immigration, greater female workforce participation, corporate governance reform, and a rethink of the energy mix to reduce import dependence. Whether the new administration can deliver where previous ones have failed remains to be seen.

Question 6 (a) (i) [2 marks]
Using the data in Table 1, calculate the percentage change in the yen price of LNG (liquefied natural gas) between 2020 and 2023. You are advised to show your working.

Question 6 (a) (ii) [2 marks]
'The yen weakened from ¥103/US$ in Jan 2021 to ¥150/US$ in Oct 2022' (Figure 1). Using this information and the fact that crude oil is priced in US dollars on world markets, show how the yen depreciation affected the yen price of imported crude oil over this period, assuming the US dollar price of oil was constant. You are advised to show your working.

Question 6 (b) [6 marks]
With reference to the data and using a cost and revenue diagram, show how the weak yen has resulted in higher prices, fewer sales and falling profits for Japanese firms that import commodities.

Question 7 [8 marks]
Evaluate the extent to which Japan's economic difficulties in 2022–2024 were the result of external rather than internal factors.

Question 8 [10 marks]
Discuss whether the Bank of Japan should have intervened in the ways described in the case (raising interest rates and/or direct currency market intervention) to strengthen the yen.

Question 9 [12 marks]
With reference to the case study, discuss whether living standards in Japan are likely to be improved by a programme of deeper structural reform, including greater immigration, female workforce participation and corporate governance reform.

**END OF PAPER**
`,
  },
  {
    id: "wjec-p3-c",
    subject: "wjec" as any,
    paper: "3",
    title: "Paper 3 — Set C (Advanced)",
    description: "A2 Unit 3: Exploring Economic Behaviour — Advanced tier (verbatim from PDF).",
    totalMarks: 80,
    content: `# WJEC GCE A LEVEL Economics — 1520U30-1 — A2 Unit 3: Exploring Economic Behaviour — Predicted Paper (Advanced)

**Time: 2 hours | Total: 80 marks**

Answer **all** questions.

## SECTION A

**Question 1.** Taiwan Semiconductor Manufacturing Company (TSMC) is the world's largest contract chipmaker, producing more than 90% of the world's most advanced semiconductors. TSMC's huge 'gigafabs' cost over US$20 billion each to build and operate on production runs measured in billions of chips, exploiting substantial internal economies of scale. Its newest 3-nanometre fab in Hsinchu uses extreme ultraviolet lithography machines costing up to US$380m each; spreading this capital cost over massive output volumes dramatically lowers unit cost.

TSMC's presence has made Taiwan's 'Silicon Shield' region the densest semiconductor cluster in the world. Hundreds of specialist equipment suppliers, materials firms and IP-design houses are co-located nearby. The Taiwanese government has funded the Industrial Technology Research Institute, upgraded the Hsinchu Science Park's transport and power infrastructure, and supported dedicated Masters and PhD programmes at National Taiwan University.

However, TSMC's rapid expansion has created managerial strains. Building new fabs abroad (in Arizona and Kumamoto) has revealed problems transferring the TSMC culture: 30-year engineers have reported burnout, managers struggle to coordinate across global sites, and TSMC's Arizona fab was delayed by 18 months partly due to labour disputes and poor communication between Taiwanese and American staff. Chip yields have occasionally been affected by communication breakdowns inside the firm.

Question 1 (a) [4 marks]
Using a diagram and with reference to the data, outline the difference between internal economies of scale and internal diseconomies of scale.

Question 1 (b) [4 marks]
Using a diagram, outline how TSMC might benefit from external economies of scale in Hsinchu.

**Question 2.** The diagram below represents a natural monopoly, such as a national water utility, subject to regulation. (Classic natural monopoly diagram with continuously falling AC and MC curves (LRAC declining over the relevant range). Market demand (AR) curve is downward-sloping. MR is below AR. Three possible regulated price points are typically considered: (i) unregulated profit-maximising output at MC = MR; (ii) allocative efficiency at AR = MC; (iii) average-cost pricing at AR = AC. Key curves shown: MC, AC (both falling), AR (demand), MR.)

Question 2 (a) [1 marks]
On the diagram, indicate the level of output that an unregulated profit-maximising natural monopoly would produce.

Question 2 (c) [4 marks]
Explain why regulators often set a price equal to average cost (AC) rather than equal to marginal cost (MC) for a natural monopoly.

**Question 3.** YPF (Yacimientos Petrolíferos Fiscales) is Argentina's largest oil and gas producer. Founded as a state enterprise in 1922, YPF was privatised in 1993 and sold to Spain's Repsol, becoming one of Latin America's largest-ever privatisations. In 2012, President Cristina Fernández de Kirchner re-nationalised 51% of YPF, citing underinvestment by Repsol and declining production. Argentina paid US$5 billion in compensation after prolonged legal disputes.

In 2023–2024, Argentina's new President Javier Milei — a self-described libertarian — announced plans to re-privatise YPF again, along with the national airline Aerolíneas Argentinas, the state media holding, and a number of other state-owned enterprises. Milei argues that state ownership has distorted incentives, accumulated losses (Aerolíneas has required repeated government bailouts), and diverted scarce fiscal resources from public services. Critics argue that previous Argentine privatisations (including YPF itself in 1993) produced uneven results, and that under Milei's 'shock therapy' approach, assets may be sold quickly and below fair value.

Argentina faces particular challenges with privatisation: the peso has lost over 90% of its value since 2018; inflation ran above 200% in 2023; investors face currency controls and risk premiums are high; and Argentina has restructured its sovereign debt nine times since independence. The Vaca Muerta shale formation, in which YPF has major holdings, is one of the world's largest unconventional oil and gas resources — but developing it requires substantial foreign investment.

Question 3 [8 marks]
Evaluate the view that Argentina's planned privatisation programme is likely to be successful.

**Question 4.** In 2023–24, the US Federal Reserve held its federal funds rate at a 23-year high of 5.25–5.50%. Figure 1 shows the impact on a selection of emerging market central bank policy rates.

**Figure 1: Central bank policy rates, selected countries, end-2021 to end-2023 (%)**

| Country | End-2021 | End-2022 | End-2023 |
|---|---|---|---|
| United States (Fed funds) | 0.25 | 4.50 | 5.50 |
| Argentina | 38.00 | 75.00 | 133.00 |
| Turkey | 14.00 | 9.00 | 42.50 |
| Brazil | 9.25 | 13.75 | 11.75 |
| Mexico | 5.50 | 10.50 | 11.25 |
| Egypt | 8.25 | 16.25 | 19.25 |

Question 4 [6 marks]
Analyse the likely impact of aggressive interest rate rises on aggregate demand in an emerging-market economy such as Argentina.

**Question 5.** Argentina has suffered chronic inflation for much of its history. In December 2023, monthly inflation reached 25.5% (an annualised rate of over 1500%) following President Milei's initial 54% devaluation of the peso.

**Figure 1: Argentina annual CPI inflation rate, 2017–2024 (%)**

| Year | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 (est.) |
|---|---|---|---|---|---|---|---|---|
| Annual CPI (%) | 24 | 48 | 54 | 42 | 51 | 95 | 211 | 118 |

**Figure 2: Argentina monthly inflation rate by selected categories, December 2023**

| Category | Food & bev. | Health | Transport | Housing & utilities | Clothing | Education |
|---|---|---|---|---|---|---|
| Monthly inflation rate | 29.7% | 32.6% | 31.7% | 13.8% | 18.9% | 8.7% |
| Weighting (% of spending) | 27 | 10 | 14 | 28 | 8 | 13 |

Question 5 (a) [3 marks]
Using the data in Figure 2, calculate a monthly price index for Argentina in December 2023, taking November 2023 as the base period. You are advised to show your working.

**Figure 3: Argentina index of real and nominal wages, 2019–2024 (Dec 2023 = 100)**

| Year (Dec) | Nominal wage index | Real wage index |
|---|---|---|
| 2019 | 8 | 148 |
| 2020 | 13 | 140 |
| 2021 | 22 | 138 |
| 2022 | 45 | 130 |
| 2023 | 100 | 100 |
| 2024 | 210 | 96 |

Argentine trade unions have historically indexed wages formally to past inflation through 'paritarias' (collective bargaining agreements). In 2024, some leading unions negotiated wage adjustments of 15–25% per month, matching recent monthly inflation.

Question 5 (b) [8 marks]
Assess whether Argentina is likely to experience a continued wage-price spiral in 2024–2025.

## SECTION B — Argentina's peso crisis, Milei's 'chainsaw' and the IMF

In December 2023, libertarian economist Javier Milei was inaugurated as Argentina's President after a remarkable electoral victory. Brandishing a chainsaw during campaign rallies to symbolise his plans to cut the state, Milei promised 'shock therapy' to rescue an economy facing collapse. On his first full day in office, Milei's Economy Minister devalued the official peso by 54% and announced sweeping spending cuts.

**Figure 1: Argentine peso (ARS) per US dollar, 2019–2024 (official exchange rate)** *(A higher number means a weaker peso — the peso has lost more than 96% of its official US dollar value since 2019.)*

| Date | Jan 2019 | Jan 2021 | Jan 2023 | Dec 2023 | Jun 2024 | Nov 2024 |
|---|---|---|---|---|---|---|
| ARS per US$ | 38 | 85 | 185 | 800 | 900 | 1,025 |

Argentina's economic troubles are long-standing but acute. In 2022, public debt stood at 85% of GDP. Around 40% of this debt was denominated in US dollars. By late 2023, 70% of Argentine federal tax revenue was being spent on debt-service costs alone. The Central Bank of Argentina had almost no net foreign reserves — when Milei took office, net reserves were estimated at minus US$11 billion.

Argentina's parallel exchange rate (the 'blue dollar' rate available on informal markets) diverged wildly from the official rate during periods of capital controls. In mid-2023, the blue dollar rate was more than double the official rate, reflecting severe lack of confidence in the peso.

Argentine firms have been hammered by peso weakness and global supply shocks. Imports priced in dollars — machinery, fuels, fertilisers, pharmaceuticals — have risen sharply in peso terms (Table 1). Argentine manufacturers have laid off workers, reduced output, or exited the market.

**Table 1: Prices of selected Argentine imports (US$ and implied peso terms — peso changes reflect both US$ price changes and the peso's depreciation from ~85 to ~1,000 per US$)**

| Commodity | 2020 US$ price | 2024 US$ price | % change in peso terms |
|---|---|---|---|
| Pharmaceuticals (index, US$) | 100 | 128 | +2,978% |
| Diesel fuel (US$/litre) | 0.42 | 0.88 | +4,500% |
| Natural gas (US$/mmbtu) | 2.60 | 3.20 | +3,000% |
| Fertiliser (US$/tonne) | 280 | 380 | +3,150% |

The sustained depreciation of the peso has caused severe policy challenges. Investors have repeatedly fled the peso, worsening the currency's decline. Between 2021 and 2023, Argentina experienced capital outflows of over US$15 billion per year, draining reserves and raising country risk premiums. Sovereign bond yields exceeded 30% at times — making new borrowing effectively impossible.

**Figure 2: Argentina Central Bank net international reserves, 2019–2024 (US$ billion)**

| Year | 2019 | 2020 | 2021 | 2022 | 2023 (Nov) | 2024 (Oct) |
|---|---|---|---|---|---|---|

Regardless of the path chosen, the short-term human cost of adjustment has been severe. Food banks report unprecedented demand. Whether Argentina can sustain the reform momentum, rebuild its real economy, and deliver genuine improvements in living standards — rather than just stabilising prices — is the question that will shape South America's second-largest economy for years to come.

Question 6 (a) (i) [2 marks]
Using the data in Table 1, calculate the percentage change in the US dollar price of diesel fuel between 2020 and 2024. You are advised to show your working.

Question 6 (b) [6 marks]
With reference to the data and using a cost and revenue diagram, show how the weak peso has resulted in higher prices, fewer sales and falling profits for Argentine firms that import inputs.

Question 7 [8 marks]
Evaluate the extent to which Argentina's economic difficulties in 2023–2024 were the result of external rather than internal factors.

Question 8 [10 marks]
Discuss whether the Argentine authorities should have intervened in the ways described in the case to strengthen the peso, rather than pursuing devaluation and fiscal adjustment.

Question 9 [12 marks]
With reference to the case study, discuss whether living standards in Argentina are likely to be improved by President Milei's 'shock therapy' approach combined with continuing IMF support.

**END OF PAPER**
`,
  },
  // ── Eduqas A-Level Economics ──
  // Verbatim sync with /public/eduqas-mocks/paper-{1|2|3}-{moderate|hard|advanced}.pdf
  // Paper 1 (A520U10-1) Component 1 Economic Principles: 60 marks (20 MCQ + Q21-26 = 4+7+4+8+8+9 = 40), 1h 30m
  // Paper 2 (A520U20-1) Component 2 Exploring Economic Behaviour: 80 marks, 2h 30m
  // Paper 3 (A520U30-1) Component 3 Evaluating Economic Models and Policies: 90 marks (3 sections × 30), 2h 30m
  {
    id: "eduqas-p1-a",
    subject: "eduqas" as any,
    paper: "1",
    title: "Paper 1 — Set A (Moderate)",
    description: "Component 1: Economic Principles (A520U10-1). Moderate — 20 MCQs + 6 structured.",
    totalMarks: 60,
    content: `# Eduqas A-Level Economics (A520U10-1) — Component 1: Economic Principles — Predicted Paper (Moderate)

**Time: 1 hour 30 minutes | Total: 60 marks**

Answer ALL questions. The number of marks is given in brackets at the end of each question or part-question.

## Section A — Multiple Choice (20 marks)

For each question in Section A, write the letter (A, B, C, D or E) that corresponds to your answer in the box provided. You are advised to spend approximately 30 minutes on this section.

Question 1 [1 mark]
Which of the following is NOT considered a factor of production?
A. Land
B. Labour
C. Capital
D. Enterprise
E. Money

Question 2 [1 mark]
If the demand for a good increases and supply simultaneously falls, the effect on equilibrium price and quantity will be:
A. Price rises; quantity rises
B. Price rises; quantity uncertain
C. Price uncertain; quantity rises
D. Price falls; quantity falls
E. Price uncertain; quantity uncertain

Question 3 [1 mark]
The price of a good rises from £10 to £12. As a result, quantity demanded falls from 200 units to 170 units. The price elasticity of demand is approximately:
A. −0.15
B. −0.75
C. −1.00
D. −1.33
E. −1.75

Question 4 [1 mark]
Which of the following is a feature of monopolistic competition?
A. A single seller dominates the market
B. Products are identical between firms
C. There are significant barriers to entry and exit
D. Firms sell differentiated products in a market with many sellers
E. Firms have no control over the price they charge

Question 5 [1 mark]
Economic profit differs from accounting profit because economic profit:
A. Excludes explicit costs
B. Includes the opportunity cost of resources used by the owner
C. Is always greater than accounting profit
D. Ignores variable costs
E. Is calculated only in the long run

Question 6 [1 mark]
A country runs a budget deficit for five consecutive years. All other things remaining equal, what will happen to the national debt?
A. It will rise
B. It will fall
C. It will remain constant
D. It will rise only if interest rates fall
E. It cannot be determined

Question 7 [1 mark]
The multiplier effect refers to:
A. The process by which tax cuts increase government revenue
B. The ratio of consumer spending to disposable income
C. The proportional increase in national income arising from an initial injection of spending
D. The increase in exports resulting from a currency depreciation
E. The increase in money supply caused by central bank bond purchases

Question 8 [1 mark]
A shop sells a product for £72 including 20% VAT. How much of this price is VAT?
A. £6.00
B. £12.00
C. £14.40
D. £15.00
E. £18.00

Question 9 [1 mark]
The Consumer Prices Index (CPI) in an economy was 110 in May 2023 and 115.5 in May 2024. What is the annual rate of inflation over this period?
A. 0.5%
B. 4.76%
C. 5.00%
D. 5.5%
E. 11.0%

Question 10 [1 mark]
The law of diminishing marginal returns states that:
A. Total output always falls as more variable factors are added
B. Average cost rises as more workers are employed
C. Beyond a certain point, adding more of a variable factor to a fixed factor will reduce the marginal product
D. Profits fall as firms grow larger in the long run
E. Output rises proportionately as all factors increase

Question 11 [1 mark]
The cross elasticity of demand between two goods is calculated as +2.5. This means the goods are:
A. Strong complements
B. Weak complements
C. Unrelated
D. Weak substitutes
E. Strong substitutes

Question 12 [1 mark]
In the calculation of the UK CPI, new items are added to the basket of goods primarily because:
A. They have become cheaper
B. They are taxed more heavily
C. Government wants to raise inflation estimates
D. Spending patterns have changed
E. Older items have become illegal

Question 13 [1 mark]
The chart below shows the share of household income spent on food and non-alcoholic drink in five countries:

| Country | % of household income on food |
|---|---|
| Nigeria | 56% |
| Pakistan | 42% |
| Mexico | 22% |
| UK | 10% |
| USA | 7% |

Which of the following best explains this pattern?
A. Food has a negative income elasticity in richer countries
B. As incomes rise, a smaller proportion of income is spent on necessities
C. Food is cheaper in richer countries
D. Poorer countries consume larger total quantities of food
E. Richer countries spend less in total on food

Question 14 [1 mark]
A current account deficit indicates that:
A. The country is spending more on imports of goods, services, income and transfers than it earns from exports of these
B. The government is running a budget deficit
C. The central bank is selling foreign exchange
D. Net foreign investment into the country is negative
E. The country's exchange rate must be falling

Question 15 [1 mark]
Country X can produce either 80 units of wheat or 40 units of cloth. Country Y can produce either 60 units of wheat or 20 units of cloth. The theory of comparative advantage suggests that:
A. Country X should specialise in cloth, Country Y in wheat
B. Country X should specialise in wheat, Country Y in cloth
C. No trade is possible because Country X has an absolute advantage in both goods
D. Both countries should remain self-sufficient
E. Trade is only possible if the two countries have the same technology

Question 16 [1 mark]
A government imposes a specific tax of £2 per unit on a demerit good. If demand is relatively price inelastic, the result will be:
A. A small fall in quantity consumed and most of the tax falling on producers
B. A large fall in quantity consumed and most of the tax falling on consumers
C. A small fall in quantity consumed and most of the tax falling on consumers
D. No change in quantity consumed and all of the tax falling on consumers
E. A rise in quantity consumed and the tax being absorbed by producers

Question 17 [1 mark]
A UK supermarket chain purchases one of its milk suppliers. This is best described as:
A. Horizontal integration
B. Forward vertical integration
C. Backward vertical integration
D. Conglomerate integration
E. A hostile takeover

Question 18 [1 mark]
In an economy suffering from demand-pull inflation, which combination of policies would be most consistent with reducing inflation?
A. Cut interest rates, raise taxes, raise government spending
B. Raise interest rates, raise taxes, cut government spending
C. Cut interest rates, cut taxes, raise government spending
D. Raise interest rates, cut taxes, raise government spending
E. Leave interest rates unchanged, cut taxes, cut government spending

Question 19 [1 mark]
A firm raises its price by 5% and its total revenue rises by 3%. The price elasticity of demand for its product is:
A. Perfectly elastic
B. Elastic
C. Unit elastic
D. Inelastic
E. Perfectly inelastic

Question 20 [1 mark]
A market has the following equilibrium: price £10, quantity 200. The maximum price anyone would pay is £30 and producers would be willing to supply at a minimum price of £2. Consumer surplus is:
A. £1,000
B. £1,600
C. £2,000
D. £2,800
E. £3,200

## Section B — Structured Questions (40 marks)

Question 21 [4 marks]
The charts below show (1) the Sterling exchange rate index (2015 = 100) and (2) the UK's current account balance (% of GDP) between 2016 and 2023.

Chart 1 — Sterling effective exchange rate index (2015 = 100):
2016: 100 | 2017: 90 | 2018: 92 | 2019: 89 | 2020: 86 | 2021: 92 | 2022: 83 | 2023: 88

Chart 2 — UK current account balance (% of GDP):
2016: −5.4% | 2017: −3.8% | 2018: −3.9% | 2019: −2.7% | 2020: −2.7% | 2021: −1.5% | 2022: −3.1% | 2023: −2.0%

Using the data, explain the possible link between the two charts.

Question 22 [7 marks]
The diagram below illustrates the market for public transport services, which has positive consumption externalities.
[Diagram: a supply curve MPC = MSC, a private demand curve D = MPB, and a marginal social benefit curve MSB to the right of D = MPB. Free market equilibrium is at Q1, with social optimum at Q2 where MSC = MSB.]
Using the diagram, discuss whether the government should subsidise public transport services.

Question 23 [4 marks]
Two rival firms, Alpha and Beta, are deciding whether to launch a major advertising campaign. The matrix below shows the resulting annual profits (£m) for each firm depending on the combination of decisions. Neither firm knows in advance what the other will choose.

|  | Beta: Advertise | Beta: Don't advertise |
|---|---|---|
| **Alpha: Advertise** | £30m, £30m | £60m, £20m |
| **Alpha: Don't advertise** | £20m, £60m | £45m, £45m |

Use the data to explain where the Nash equilibrium lies in this matrix.

Question 24 [8 marks]
The UK economy is operating with a negative output gap of approximately 2% of GDP. The government proposes a £30 billion fiscal stimulus package involving increased spending on public infrastructure.

Diagram 1: UK real GDP growth (%), 2019–2024
2019: 1.6% | 2020: −10.4% | 2021: 8.7% | 2022: 4.3% | 2023: 0.1% | 2024: 0.4%

Diagram 2: UK unemployment rate (%)
2019: 3.8% | 2020: 4.6% | 2021: 4.6% | 2022: 3.7% | 2023: 4.0% | 2024: 4.4%

Using the data, discuss whether such a fiscal stimulus will raise the UK's rate of economic growth.

Question 25 [8 marks]
The table below provides 2022 Human Development Index (HDI) data for two countries, Botswana and Vietnam.

| | Classification | HDI | Life expectancy | Mean years schooling | Expected years schooling | GNI/capita (PPP $) |
|---|---|---|---|---|---|---|
| **Botswana** | High | 0.708 | 61.1 | 9.9 | 12.2 | 16,780 |
| **Vietnam** | High | 0.726 | 73.7 | 8.4 | 13.1 | 11,397 |

Botswana is located in Southern Africa. Vietnam is in South East Asia.

Discuss whether it is reasonable to conclude that Vietnam has a higher level of human development than Botswana.

Question 26 [9 marks]
The extract and chart below relate to global coffee prices.

Chart: Arabica coffee price (US cents per pound)
Jan 2022: 240 | Jun 2022: 225 | Dec 2022: 165 | Jun 2023: 175 | Dec 2023: 195 | Jun 2024: 225

**Extract:** Global coffee prices remain volatile. Brazil, the world's largest producer, has experienced severe droughts in recent years, with some plantations losing up to 30% of their crop. Meanwhile, demand for coffee continues to grow strongly in emerging market economies such as China and India as incomes rise and Western-style coffee shop culture spreads.

However, there are also downward pressures on price. Vietnamese production of the cheaper robusta variety is expanding rapidly, and many consumers are willing to substitute robusta for arabica coffee. A possible slowdown in the global economy may also reduce demand from cafés and restaurants.

Using supply and demand diagram(s), discuss whether the data suggests that coffee prices are more likely to rise or fall in the future.
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
    title: "Paper 2 — Set A (Moderate)",
    description: "Component 2: Exploring Economic Behaviour. Set A — Moderate.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A520U20-1) — Component 2: Exploring Economic Behaviour — Predicted Paper Set A (Moderate)

**Time: 2 hours 30 minutes | Total: 80 marks**

Answer all questions.

## Question 1 — Things can only get better?

In recent years, the UK housing market has come to symbolise some of the deepest tensions in the modern UK economy. Average house prices have risen faster than earnings for much of the past two decades, locking younger households out of ownership, widening regional wealth gaps, and reshaping patterns of consumption, saving and political debate.

In 2023 the Government renewed its commitment to deliver 300,000 new homes per year across the UK, supported by infrastructure investment, planning reform and targeted subsidies for first-time buyers. Yet completions have repeatedly fallen short of that target.

**Affordability and prices.** The ratio of average house prices to average earnings has roughly doubled since 2000 (Figure 1).

**Figure 1 — UK house price to earnings ratio, 2000–2023.**

Meanwhile housing completions have been well below the level the Government and most independent analysts agree is needed to bring prices into line with earnings (Figure 2).

**Figure 2 — UK housing completions vs the 300,000 target, 2010–2023.**

**Ownership, renting and generational divides.** Home-ownership rates among younger households have fallen sharply since the 1990s (Figure 3). At the same time, the share of households renting privately has risen (Figure 4).

**Figure 3 — Home-ownership rate by age group, 1991 vs 2023.**

**Figure 4 — Housing tenure in the UK, 1981 vs 2023.**

**The role of mortgage rates.** Mortgage rates fell steadily from the late 2000s, supporting higher house prices by reducing the monthly cost of borrowing. That pattern reversed sharply in 2022–23 as the Bank of England raised Bank Rate to combat inflation (Figure 5).

**Figure 5 — Average 2-year fixed-rate UK mortgage rate, 2005–2023.**

**Regional patterns.** The UK's housing stock is not distributed evenly across regions. Some regions have a relatively low number of dwellings per head of population; London stands out as having the fewest (Figure 6). Prices vary even more dramatically (Figure 7): an average home in London is more than three times the price of one in the North East.

**Figure 6 — Dwellings per 1,000 population by UK region, 2022.**

**Figure 7 — Average house prices by UK region, 2023 (£000s).**

**The Government's housing strategy.** The Government has set out a comprehensive housing strategy with the stated aim of improving both affordability and supply. The key elements of the plan are summarised in Figure 8.

**Figure 8 — The UK Government's housing strategy**

| Strand | Key measures |
|---|---|
| Supply | 300,000 new homes per year target, with a £11.5 billion Affordable Homes Programme (2021–26). Planning reform to speed up local-authority decisions and bring more land forward for development. |
| Demand support | Stamp Duty nil-rate band raised to £250,000 (£425,000 for first-time buyers). Mortgage Guarantee Scheme providing lender guarantees on 95% mortgages. |
| Regional rebalancing | Levelling-Up Fund and Towns Fund investing in brownfield sites outside London and the South East. Freeports and Investment Zones offering planning flexibility and tax incentives. |
| Renters | Renters Reform Bill abolishing no-fault evictions and introducing a Decent Homes Standard for the private rented sector. |

*Sources: ONS, Bank of England, MHCLG, HM Treasury.*

Question 1.1 [5 marks]
Using the data, explain why house prices have risen faster than earnings in the UK since 2000 (Figure 1).

Question 1.2 [5 marks]
Using the data, explain why the UK Government might want to increase the supply of housing in the UK.

Question 1.3 [10 marks]
How effective is the UK Government's housing strategy (Figure 8) likely to be in improving housing affordability?

Question 1.4 [10 marks]
Using the data, discuss the extent to which the rise in mortgage rates since 2022 (Figure 5) will affect the UK housing market.

Question 1.5 [10 marks]
Using the data, discuss whether falling home-ownership rates among younger households (Figure 3) are likely to widen UK regional inequalities.

## Question 2 — Long live oligopolistic competition!

The UK grocery market is worth around £220 billion a year and is dominated by four large supermarket chains: Tesco, Sainsbury's, Asda and Morrisons. Together they account for around two-thirds of all grocery sales. In recent years, German discount chains Aldi and Lidl have rapidly expanded their market share, while premium grocers Waitrose and Marks & Spencer occupy a smaller but distinctive niche. The market displays many of the classic features of an oligopoly.

**Figure 1 — UK grocery market: market shares and key facts (2023)**

| Firm (share) | Notes |
|---|---|
| Tesco: 27.5% | The market leader since the 1990s. Operates around 4,000 stores. Launched Clubcard Prices in 2020 — lower shelf prices for loyalty-card holders. |
| Sainsbury's: 15.1% | Operates around 1,400 stores. Runs the Nectar loyalty programme. Owns Argos and the Habitat brand. Launched Nectar Prices in 2023. |
| Asda: 13.6% | Acquired by the Issa Brothers and TDR Capital in 2021. Best known for "Every Day Low Pricing" strategy. |
| Morrisons: 8.7% | Strong presence in Yorkshire and the North. Vertically integrated, with its own farms and manufacturing. |
| Aldi: 10.4% | Discount chain with a limited-range, high-turnover model. Grew share from 3% in 2010. Price Match pressure on Big Four. |
| Lidl: 7.9% | Second major discounter. Operates around 960 UK stores. Aggressive expansion plan announced in 2023. |
| Others: 16.8% | Waitrose (4.5%), Co-op (5.7%), M&S Food (3.7%), Iceland and others. |

Competition between these firms is intense but largely non-price in nature. The Big Four supermarkets respond quickly to each other's promotions, launch continuous range innovations, and increasingly compete on convenience (small-format stores, online delivery slots, rapid-delivery partnerships). Loyalty pricing schemes such as Clubcard Prices and Nectar Prices have, according to critics, introduced a form of two-tier pricing that may obscure underlying prices from non-members.

The Competition and Markets Authority (CMA) has opened several investigations into the sector, including into loyalty pricing practices in 2023 and into supplier relations in 2024. Most recent mergers have been blocked or required significant divestments — for example, the 2019 Sainsbury's–Asda merger proposal was rejected on the grounds that it would harm consumers.

The data below (Figure 2) shows the weekly demand at different prices for a ready-meal lasagne produced by FreshMart Ltd, an oligopolistic supermarket.

**Figure 2 — FreshMart Ltd: Demand and cost schedule for lasagne (£)**

| Price | Lasagne/week (000s) | Total Revenue | Marginal Revenue | Total Cost | Marginal Cost |
|---|---|---|---|---|---|
| £8 | 0 | | | £200 | |
| £7 | 10 | | | £300 | |
| £6 | 20 | | | £380 | |
| £5 | 30 | | | £450 | |
| £4 | 40 | | | £540 | |
| £3 | 50 | | | £660 | |
| £2 | 60 | | | £820 | |
| £1 | 70 | | | £1,050 | |
| £0.50 | 80 | | | £1,380 | |

Many supermarkets also face significant upward pressure on their costs. Energy, labour and freight costs rose sharply between 2021 and 2023, squeezing operating margins. At the same time, the expansion of Aldi and Lidl has put downward pressure on prices. Supermarkets have responded with cost-cutting programmes, automation of checkouts and warehouses, and the rollout of private-label products which typically carry lower costs than branded alternatives.

Is the UK grocery market serving consumers well? Supporters of the current structure argue that competition between a handful of large chains, supplemented by fast-growing discounters, is delivering choice and value. Critics point to the CMA's investigations, the high profits earned by leading firms at the peak of the 2022 cost-of-living crisis, and the long-standing concerns about pressure placed on suppliers — farmers in particular — as evidence that the market is not as competitive as it appears.

*Sources: Kantar Worldpanel; CMA.*

Question 2.1 [5 marks]
Using the information provided on the UK grocery market, outline the characteristics of an oligopolistic industry.

Question 2.2 [7 marks]
Using Figure 2, calculate the marginal revenue (MR) and marginal cost (MC) for each of the output levels (lasagne/week) from 0 to 80,000. Record the answers in your pink answer booklet. Using your answers explain at what level of output FreshMart Ltd will, in theory, maximise profits.

Question 2.3 [10 marks]
Using a costs and revenue diagram, evaluate the effects on a supermarket's abnormal profits of the expansion of Aldi and Lidl.

Question 2.4 [7 marks]
Evaluate the view that loyalty-pricing schemes such as Clubcard Prices and Nectar Prices are harmful to consumers in the UK grocery market.

Question 2.5 [11 marks]
With reference to the data, discuss the extent to which the UK grocery market leads to a reduction of economic welfare.

**END OF PAPER**
`,
  },
  {
    id: "eduqas-p2-b",
    subject: "eduqas" as any,
    paper: "2",
    title: "Paper 2 — Set B (Hard)",
    description: "Component 2: Exploring Economic Behaviour. Set B — Hard.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A520U20-1) — Component 2: Exploring Economic Behaviour — Predicted Paper Set B (Hard)

**Time: 2 hours 30 minutes | Total: 80 marks**

Answer all questions.

## Question 1 — Things can only get better?

Between 2021 and 2023 the UK economy experienced its sharpest inflationary episode in more than forty years. Headline CPI inflation rose from under 1% in early 2021 to a peak of 11.1% in October 2022 — the highest reading since 1981. The policy response from the Bank of England and HM Treasury tested the theoretical frameworks that have dominated UK macroeconomic policy since 1997.

**The inflation shock.** The inflationary surge had multiple drivers. Global demand rebounded rapidly following the easing of Covid-19 restrictions; supply chains were dislocated; energy markets were disrupted by Russia's invasion of Ukraine in February 2022; and UK labour supply was constrained by a rise in economic inactivity. Together these forces pushed inflation far above the Bank of England's 2% target (Figure 1).

**Figure 1 — UK CPI inflation, Jan 2018 – Dec 2023.**

**Monetary policy tightening.** The Monetary Policy Committee (MPC) kept Bank Rate at its historic low of 0.1% until December 2021. Once it began raising the rate, it did so repeatedly and aggressively, taking Bank Rate from 0.1% in late 2021 to 5.25% by August 2023 — the highest rate since 2008 (Figure 2).

**Figure 2 — UK Bank Rate and CPI inflation, 2020–2023.**

**The cost of living and wage response.** With inflation far above nominal wage growth for most of the 2022–23 period, real wages fell sharply. Only in late 2023 did nominal wage growth catch up with price rises (Figure 3).

**Figure 3 — Nominal wage growth vs CPI inflation, 2021–2023.**

**The monetary aggregates.** Critics of the Bank of England argue that the expansion of the broad money supply during the pandemic — partly a result of large-scale asset purchases (quantitative easing) — created the conditions for the subsequent inflation (Figure 4).

**Figure 4 — UK broad money (M4) annual growth, 2019–2023.**

**Household confidence and output.** The cost-of-living shock weighed heavily on household confidence (Figure 5) and UK growth was either weak or negative through most of 2022–23 (Figure 7).

**Figure 5 — GfK Consumer Confidence index, 2020–2023.**

**Figure 6 — Contribution to annual CPI by component, late 2023.**

**Figure 7 — UK quarterly GDP growth, 2021–2023.**

**The fiscal-monetary mix.** The Bank of England's tightening was partly offset by fiscal measures designed to cushion households from rising costs. A summary of the main elements of the policy response is shown in Figure 8.

**Figure 8 — UK macroeconomic policy response, 2022–2024**

| Strand | Key measures |
|---|---|
| Monetary policy | Bank Rate raised from 0.1% (Dec 2021) to 5.25% (Aug 2023) — the steepest tightening cycle since 1989. Quantitative Tightening: the Bank of England began actively selling gilts from the asset purchase programme in late 2022. |
| Fiscal support | Energy Price Guarantee (Oct 2022 – June 2023): typical bills capped at £2,500/year at a cost of around £40 billion. Cost-of-living payments totalling £900 to households on means-tested benefits. |
| Supply-side | Increased childcare support (15 hours free childcare for 9-month-olds from April 2024) aimed at reducing economic inactivity. Reforms to Restart and Returnerships schemes to encourage over-50s back into the labour market. |
| Wage policy | National Living Wage rose 9.7% in April 2023 (to £10.42) and 9.8% in April 2024 (to £11.44). Public sector pay awards of 5–7% for most occupations during 2023–24. |

*Sources: ONS, Bank of England, HM Treasury, GfK.*

Question 1.1 [5 marks]
Using the data, explain the main causes of the rise in UK inflation between 2021 and 2022 (Figure 1).

Question 1.2 [5 marks]
Using the data, explain why the Bank of England raised Bank Rate so aggressively between December 2021 and August 2023 (Figure 2).

Question 1.3 [10 marks]
How effective is the UK's policy response (Figure 8) likely to be in returning inflation to the 2% target without causing a recession?

Question 1.4 [10 marks]
Using the data, discuss the extent to which the rise in Bank Rate is likely to reduce UK inflation (Figures 1 and 2).

Question 1.5 [10 marks]
Using the data, discuss whether the fall in real wages during 2022–23 (Figure 3) is likely to have a lasting effect on the UK economy.

## Question 2 — The natural monopoly question

The UK domestic energy market was transformed during the 2010s and 2020s. Liberalisation in the 1990s had ended the regional monopolies held by the privatised successors to British Gas and the old Electricity Boards; by 2018 more than 70 independent suppliers competed for residential customers. Then came the energy price shock of 2021–22: wholesale gas prices rose nine-fold, the Ofgem price cap jumped sharply, and 29 suppliers failed in 2021 alone. The market has since consolidated around a smaller number of large firms (Figure 1), many of which display classic natural-monopoly characteristics.

**Figure 1 — GB domestic energy market shares, late 2023.**

Some of the essential features of the market make it different from a typical competitive market. The electricity transmission and gas transmission networks are natural monopolies — it would be economically wasteful to duplicate the pylons, wires and pipes. Retail supply is nominally competitive, but customer acquisition is costly and the price cap introduced in 2019 sets an effective price ceiling for default-tariff customers. Economies of scale in procurement, hedging and operations strongly favour larger suppliers.

The Ofgem price cap is reviewed every three months and is based on a formula that passes through wholesale costs with a limited retailer margin. During the 2022 price shock the cap rose sharply, leaving suppliers squeezed between high wholesale costs and a cap that lagged behind (Figure 2).

**Figure 2 — Ofgem price cap, typical household (£/year), 2021–2023.**

The data below (Figure 3) shows the cost and revenue schedule for Power-Up Ltd, a medium-sized energy supplier. Demand is measured in thousands of megawatt-hours (MWh) sold per month.

**Figure 3 — Power-Up Ltd: Cost and revenue schedule**

| Price (£/MWh) | MWh sold (000s) | Total Revenue | Marginal Revenue | Total Cost | Marginal Cost |
|---|---|---|---|---|---|
| £260 | 0 | | | £2,000 | |
| £240 | 10 | | | £3,600 | |
| £220 | 20 | | | £5,000 | |
| £200 | 30 | | | £6,400 | |
| £180 | 40 | | | £7,800 | |
| £160 | 50 | | | £9,400 | |
| £140 | 60 | | | £11,200 | |
| £120 | 70 | | | £13,400 | |
| £100 | 80 | | | £16,200 | |

The market structure has important implications for consumers. First, the price cap protects most households from the worst of volatile wholesale prices — but it also limits the range of tariffs on offer, reducing the benefit of active switching. Second, the failure of 29 smaller suppliers in 2021 imposed large costs on remaining customers through the Supplier of Last Resort levy and the Energy Company Obligation, concentrating risk among the largest firms. Third, the natural-monopoly elements of the sector (networks, metering) are subject to price controls rather than market competition.

Is the current market structure in consumers' interests? Supporters argue that a stable market of large, well-capitalised suppliers is more resilient and able to pass through efficiency gains. Critics point to the limited scope for genuine price competition, the high concentration after consolidation, and the opacity of how wholesale costs are passed through to the cap. The CMA completed a market investigation in 2016 and Ofgem is regularly consulted on reform — including proposals for social tariffs, dynamic pricing and expanded heat-pump tariffs as Net Zero approaches.

*Sources: Ofgem; Cornwall Insight; ONS.*

Question 2.1 [5 marks]
Using the information provided on the UK energy market, outline the characteristics of a natural monopoly.

Question 2.2 [7 marks]
Using Figure 3, calculate the marginal revenue (MR) and marginal cost (MC) for each of the output levels (MWh sold) from 0 to 80,000. Record the answers in your pink answer booklet. Using your answers explain at what level of output Power-Up Ltd will, in theory, maximise profits.

Question 2.3 [10 marks]
Using a costs and revenue diagram, evaluate the effects on an energy supplier's abnormal profits of Ofgem tightening the price cap.

Question 2.4 [7 marks]
Evaluate the view that price regulation (such as the Ofgem price cap) is the best way to protect consumers in a natural-monopoly industry.

Question 2.5 [11 marks]
With reference to the data, discuss the extent to which the consolidation of the UK energy market since 2021 reduces economic welfare.

**END OF PAPER**
`,
  },
  {
    id: "eduqas-p2-c",
    subject: "eduqas" as any,
    paper: "2",
    title: "Paper 2 — Set C (Advanced)",
    description: "Component 2: Exploring Economic Behaviour. Set C — Advanced.",
    totalMarks: 80,
    content: `# Eduqas A-Level Economics (A520U20-1) — Component 2: Exploring Economic Behaviour — Predicted Paper Set C (Advanced)

**Time: 2 hours 30 minutes | Total: 80 marks**

Answer all questions.

## Question 1 — Things can only get better?

The UK has positioned itself at the forefront of the global transition to a low-carbon economy. The Climate Change Act 2008 committed the country to legally binding carbon budgets, and in June 2019 the UK became the first major economy to legislate for Net Zero by 2050. Since 1990, UK territorial greenhouse-gas emissions have fallen by around 52% — further than in any other G7 country (Figure 1).

**Figure 1 — UK territorial greenhouse-gas emissions, 1990–2022.**

The bulk of the reduction so far has come from decarbonising electricity generation. Coal's share of UK electricity has fallen from 70% in 1990 to less than 2% in 2023. The next phase of the transition is harder: it requires decarbonising transport, heat in buildings, and the most energy-intensive parts of industry, sectors that still account for the majority of residual emissions (Figure 2).

**Figure 2 — UK emissions by sector, 2022 (% of total).**

**The investment gap.** The Climate Change Committee estimates that the UK needs £50–70 billion a year of low-carbon investment across the 2025–2030 period to meet the Sixth Carbon Budget. Actual investment is running well below that level (Figure 3).

**Figure 3 — UK low-carbon investment vs CCC target, 2015–2023.**

**International comparisons.** The UK's emissions per capita have fallen faster than those of most other advanced economies. But comparisons also highlight the scale of the challenge: some major trading partners emit three times more per person (Figure 4).

**Figure 4 — Emissions per capita, selected advanced economies, 2023.**

**The green economy.** Employment in the low-carbon and renewable-energy economy (LCREE) has risen rapidly, reaching 432,000 jobs in 2023. The sector is growing faster than the UK economy overall (Figure 5).

**Figure 5 — LCREE employment, 2015–2023 (full-time equivalent, 000s).**

**The cost of going green.** Low-carbon technologies typically cost more up-front than their fossil-fuel counterparts, even where running costs are lower (Figure 6). This creates a short-term affordability barrier for many households.

**Figure 6 — Upfront cost of low-carbon vs fossil alternatives (£).**

**Regional job creation.** Green-economy jobs are not evenly distributed across the UK. Regions historically dependent on fossil-fuel extraction (Scotland, North East, Yorkshire & Humber) are projected to capture a disproportionate share of the offshore-wind, carbon-capture and hydrogen jobs created by 2030 (Figure 7).

**Figure 7 — Projected additional green jobs by region to 2030.**

**The UK's net-zero policy framework.** The UK policy response combines carbon pricing, targeted subsidies, sectoral regulation and international measures (Figure 8).

**Figure 8 — UK net-zero policy framework**

| Strand | Key measures |
|---|---|
| Carbon pricing | UK Emissions Trading Scheme (UK ETS): cap-and-trade covering power, industry and aviation. Cap declines by 2.2% per year. Carbon Price Support tops up ETS prices for power generators to around £18/tonne. |
| Low-carbon investment | £20 billion programme for CCUS (Carbon Capture, Utilisation and Storage) industrial clusters by 2030. Contracts for Difference auctions guaranteeing prices for offshore wind and other renewables. |
| Demand-side subsidies | Boiler Upgrade Scheme: £7,500 grant for heat pumps in owner-occupied homes. Electric vehicle charging infrastructure investment (£1.6 billion by 2030). |
| Regulation & standards | Phase-out of new petrol and diesel cars from 2035 (extended from 2030 in Sept 2023). New-build Future Homes Standard prohibits gas boilers in new homes from 2025. |
| Border measures | UK Carbon Border Adjustment Mechanism (CBAM) from 2027, covering imports of iron, steel, aluminium, cement, fertiliser and hydrogen. |

*Sources: DESNZ, CCC, ONS, IEA.*

Question 1.1 [5 marks]
Using the data, explain why UK greenhouse-gas emissions have fallen since 1990 (Figure 1).

Question 1.2 [5 marks]
Using the data, explain why the UK Government might want to accelerate investment in low-carbon technologies (Figure 3).

Question 1.3 [10 marks]
How effective is the UK's net-zero policy framework (Figure 8) likely to be in delivering the transition to a low-carbon economy?

Question 1.4 [10 marks]
Using the data, discuss the extent to which the distribution of green jobs across UK regions (Figure 7) is likely to reduce UK regional inequalities.

Question 1.5 [10 marks]
Using the data, discuss whether the higher upfront cost of low-carbon technologies (Figure 6) is likely to make the net-zero transition regressive.

## Question 2 — The winner takes most

A small number of digital platforms now dominate the world's most strategically important markets. Google accounts for around 92% of global search; the iOS and Android operating systems together hold 99% of the global smartphone market; Apple and Google's app stores together control around 95% of the mobile-app distribution market; Meta's apps (Facebook, Instagram, WhatsApp, Messenger) are used by over 3.5 billion people (Figure 1). These firms combine the classical economic features of natural monopoly — very high fixed costs and near-zero marginal costs — with powerful network effects and massive data advantages.

**Figure 1 — Market shares in key digital markets, late 2023.**

The business models of these firms depend on scale. Apple and Google charge a standard 30% commission on app-store transactions, a rate that has attracted sustained criticism from developers and, since 2021, several regulatory interventions including the EU Digital Markets Act (DMA). Google pays Apple an estimated $18 billion a year to be the default search engine on iOS devices — a practice under investigation in the US antitrust case against Google that concluded in August 2024 with a finding that Google had illegally maintained a monopoly in search.

The top five firms (Alphabet, Apple, Meta, Amazon and Microsoft) spent around $225 billion on research and development in 2022 — roughly 14% of combined revenue, and more than the entire UK government R&D budget. They have also been the major force behind the commercialisation of generative AI from 2022 onwards.

The UK's Competition and Markets Authority (CMA) gained new powers under the Digital Markets, Competition and Consumers Act 2024 to impose "conduct requirements" on firms with Strategic Market Status (SMS). The first SMS designations are expected in 2025, covering mobile ecosystems and search. Conduct requirements may include mandatory interoperability, data portability, non-discrimination and price transparency — each of which would affect the abnormal profits earned by designated firms.

The data below (Figure 2) shows the cost and revenue schedule for PulseApp Ltd, a digital platform business. Demand is measured in thousands of monthly subscribers.

**Figure 2 — PulseApp Ltd: Cost and revenue schedule (per month)**

| Price (£/month) | Subscribers (000s) | Total Revenue | Marginal Revenue | Total Cost | Marginal Cost |
|---|---|---|---|---|---|
| £18 | 0 | | | £500 | |
| £16 | 100 | | | £520 | |
| £14 | 200 | | | £560 | |
| £12 | 300 | | | £620 | |
| £10 | 400 | | | £720 | |
| £8 | 500 | | | £860 | |
| £6 | 600 | | | £1,060 | |
| £4 | 700 | | | £1,340 | |
| £2 | 800 | | | £1,720 | |

The table illustrates one of the most striking features of digital-platform economics: very high fixed costs (reflecting R&D, engineering and infrastructure spend) combined with very low marginal costs. Once the fixed cost of developing and running a platform has been sunk, the cost of serving an additional user is close to zero. This is a classic condition for natural monopoly, but unlike a traditional network utility, platform firms combine this cost structure with powerful demand-side network effects: each additional user makes the platform more valuable to every other user. The interaction of these two forces — supply-side economies of scale and demand-side network effects — is the core reason that digital markets tend towards winner-takes-most outcomes.

How should competition authorities respond? Supporters of the current market structure argue that consumers receive enormous benefits at zero price — search, email, social networking, maps — and that the rents earned by platforms fund innovation (generative AI being the latest example). Critics argue that the concentration of market power has become unprecedented, that innovation by rivals is suppressed through strategic acquisitions and entry barriers, and that classical remedies (breakup, structural separation) may be needed. Between the two positions lies a growing body of targeted regulation — the EU's DMA, the UK's SMS regime, the US antitrust litigation — that attempts to restore contestability without dismantling the firms.

*Sources: Statcounter, Bloomberg, CMA, European Commission.*

Question 2.1 [5 marks]
Using the information on digital platforms, outline the characteristics of a market with substantial network effects and high fixed costs.

Question 2.2 [7 marks]
Using Figure 2, calculate the marginal revenue (MR) and marginal cost (MC) for each of the subscriber levels (0 to 800,000). Record the answers in your pink answer booklet. Using your answers explain at what level of output PulseApp Ltd will, in theory, maximise profits.

Question 2.3 [10 marks]
Using a costs and revenue diagram, evaluate the effects on a dominant digital platform's abnormal profits of the imposition of regulation requiring it to offer interoperability with rival platforms.

Question 2.4 [7 marks]
Evaluate the view that competition authorities should break up dominant digital platforms in order to improve market outcomes.

Question 2.5 [11 marks]
With reference to the data, discuss the extent to which dominant digital platforms are harmful to economic welfare.

**END OF PAPER**
`,
  },
  {
    id: "eduqas-p3-a",
    subject: "eduqas" as any,
    paper: "3",
    title: "Paper 3 — Set A (Moderate)",
    description: "Component 3: Evaluating Economic Models and Policies. Set A — Moderate.",
    totalMarks: 90,
    content: `# Eduqas A-Level Economics (A520U30-1M) — Component 3: Evaluating Economic Models and Policies — Predicted Paper Set A (Moderate)

**Time: 2 hours 30 minutes | Total: 90 marks**

Answer both parts of one question from Section A.
Answer both parts of one question from Section B.
Answer both parts of one question from Section C.

## SECTION A

Answer both parts of one question from this section.

**Either,**

*Plastic bag charge leads to 98% drop in usage in UK supermarkets*

Question 1.1 [10 marks]
Explain what is meant by a negative externality and why it leads to market failure.

**and**

Question 1.2 [20 marks]
Discuss whether indirect taxation is the most effective government policy to correct negative externalities of consumption.

**Or,**

*Energy regulator Ofgem caps household bills as "Big Six" profits soar*

Question 2.1 [10 marks]
Outline what is meant by a monopoly and explain how it differs from a firm operating under perfect competition.

**and**

Question 2.2 [20 marks]
Discuss whether monopolies always act against the public interest.

## SECTION B

Answer both parts of one question from this section.

**Either,**

*UK inflation rate falls to the 2% Bank of England target for the first time in three years*

Question 3.1 [10 marks]
Using a diagram, explain what is meant by demand-pull inflation.

**and**

Question 3.2 [20 marks]
Evaluate the effectiveness of monetary policy in controlling inflation.

**Or,**

*UK unemployment rises for the first time in 18 months as labour market cools*

Question 4.1 [10 marks]
Explain the different types of unemployment.

**and**

Question 4.2 [20 marks]
Evaluate the likely effectiveness of supply-side policies in reducing unemployment.

## SECTION C

Answer both parts of one question from this section.

**Either,**

*UK joins CPTPP Pacific trade bloc in first major post-Brexit trade deal*

Question 5.1 [10 marks]
With the aid of a diagram, explain the theory of comparative advantage.

**and**

Question 5.2 [20 marks]
Discuss the extent to which free trade agreements benefit the UK economy.

**Or,**

*Sub-Saharan Africa's GDP growth forecast at 3.8% amid calls for increased aid*

Question 6.1 [10 marks]
Explain the main characteristics of low-income countries.

**and**

Question 6.2 [20 marks]
Discuss whether foreign aid is the most effective strategy for promoting economic development in low-income countries.
`,
  },
  {
    id: "eduqas-p3-b",
    subject: "eduqas" as any,
    paper: "3",
    title: "Paper 3 — Set B (Hard)",
    description: "Component 3: Evaluating Economic Models and Policies. Set B — Hard.",
    totalMarks: 90,
    content: `# Eduqas A-Level Economics (A520U30-1H) — Component 3: Evaluating Economic Models and Policies — Predicted Paper Set B (Hard)

**Time: 2 hours 30 minutes | Total: 90 marks**

Answer both parts of one question from Section A.
Answer both parts of one question from Section B.
Answer both parts of one question from Section C.

## SECTION A

Answer both parts of one question from this section.

**Either,**

*Major supermarkets accused of "greedflation" during the cost-of-living crisis*

Question 1.1 [10 marks]
Explain what is meant by price elasticity of demand and the main factors affecting it.

**and**

Question 1.2 [20 marks]
Discuss whether firms with significant pricing power always act to exploit consumers.

**Or,**

*Streaming wars intensify: Netflix loses subscribers as Disney+ and Apple TV+ expand*

Question 2.1 [10 marks]
Outline what is meant by a contestable market and explain the conditions required for contestability.

**and**

Question 2.2 [20 marks]
Evaluate whether digital streaming services operate as genuinely contestable markets.

## SECTION B

Answer both parts of one question from this section.

**Either,**

*Pound sterling falls to 12-month low against the US dollar*

Question 3.1 [10 marks]
Using a diagram, explain the factors that determine the exchange rate of the pound in a floating exchange rate system.

**and**

Question 3.2 [20 marks]
Evaluate the impact of a sustained depreciation of the pound on the UK economy.

**Or,**

*Chancellor announces £30bn increase in public spending despite rising national debt*

Question 4.1 [10 marks]
Explain the difference between discretionary fiscal policy and automatic stabilisers.

**and**

Question 4.2 [20 marks]
Evaluate the extent to which expansionary fiscal policy is effective in stimulating economic growth.

## SECTION C

Answer both parts of one question from this section.

**Either,**

*UK current account deficit widens to a record £71bn*

Question 5.1 [10 marks]
With the aid of a diagram or balance, explain the main components of the balance of payments.

**and**

Question 5.2 [20 marks]
Assess the extent to which a persistent current account deficit is a problem for the UK.

**Or,**

*FDI into Africa hits record $83bn as investors target energy transition projects*

Question 6.1 [10 marks]
Explain how foreign direct investment (FDI) can contribute to economic development in low-income countries.

**and**

Question 6.2 [20 marks]
Evaluate whether FDI is always beneficial for host developing countries.
`,
  },
  {
    id: "eduqas-p3-c",
    subject: "eduqas" as any,
    paper: "3",
    title: "Paper 3 — Set C (Advanced)",
    description: "Component 3: Evaluating Economic Models and Policies. Set C — Advanced.",
    totalMarks: 90,
    content: `# Eduqas A-Level Economics (A520U30-1A) — Component 3: Evaluating Economic Models and Policies — Predicted Paper Set C (Advanced)

**Time: 2 hours 30 minutes | Total: 90 marks**

Answer both parts of one question from Section A.
Answer both parts of one question from Section B.
Answer both parts of one question from Section C.

## SECTION A

Answer both parts of one question from this section.

**Either,**

*Tech giants accused of using "dark patterns" to manipulate consumer choices*

Question 1.1 [10 marks]
Explain what is meant by information asymmetry and how it can lead to market failure.

**and**

Question 1.2 [20 marks]
Discuss the extent to which behavioural economics has challenged the assumptions of traditional neoclassical economics.

**Or,**

*Premier League clubs investigated by CMA over potential anti-competitive agreements*

Question 2.1 [10 marks]
Outline what is meant by game theory and explain its application to oligopolistic markets.

**and**

Question 2.2 [20 marks]
Evaluate whether price discrimination is always against the consumer interest.

## SECTION B

Answer both parts of one question from this section.

**Either,**

*Bank of England independence under political scrutiny after rate hike controversy*

Question 3.1 [10 marks]
Using a diagram, explain the transmission mechanism of monetary policy.

**and**

Question 3.2 [20 marks]
Evaluate whether central bank independence has been successful in achieving macroeconomic objectives.

**Or,**

*UK economy shows signs of a persistent negative output gap*

Question 4.1 [10 marks]
Explain what is meant by an output gap and how it might be identified.

**and**

Question 4.2 [20 marks]
Evaluate the most appropriate policy response to a prolonged negative output gap.

## SECTION C

Answer both parts of one question from this section.

**Either,**

*US-China trade tensions trigger a new round of tariffs on electric vehicles and semiconductors*

Question 5.1 [10 marks]
With the aid of a diagram, explain the economic impact of a trade war on the global economy.

**and**

Question 5.2 [20 marks]
Discuss whether protectionism can ever be economically justified in a modern interconnected economy.

**Or,**

*World Bank approves $50bn debt relief for Highly Indebted Poor Countries (HIPC)*

Question 6.1 [10 marks]
Explain the causes and consequences of unsustainable debt burdens in developing countries.

**and**

Question 6.2 [20 marks]
Evaluate the extent to which debt relief is an effective strategy for promoting sustainable development.
`,
  },
];