interface AqaPaper3OverrideConfig {
  setLabel: string;
  caseStudy: string;
  q31: string;
  q32: string;
  q33: string;
  /** 30 MCQ stems. Each is a one-line question. */
  mcqs: string[];
}

const STANDARD_MCQ_OPTIONS = `A. Option A
B. Option B
C. Option C
D. Option D`;

const PAPER_3_TOPIC_BANK: string[] = [
  "Which of the following is most likely to shift the demand curve for a normal good to the right?",
  "If the price elasticity of demand for a good is -0.4, the good is best described as:",
  "A monopolist maximises profit where:",
  "Which of the following is a characteristic of a perfectly competitive market?",
  "An indirect tax on a good with inelastic demand will mainly:",
  "A negative production externality results in:",
  "A subsidy on a merit good is most likely to:",
  "Which of the following best defines economic efficiency?",
  "If the marginal propensity to consume is 0.75, the multiplier is:",
  "An increase in long-run aggregate supply will most likely:",
  "Demand-pull inflation is most likely caused by:",
  "Which of the following would tend to reduce structural unemployment?",
  "A floating exchange rate that depreciates is most likely to:",
  "Which of the following is a supply-side policy?",
  "An increase in income tax is most likely to cause:",
  "Quantitative easing is best described as:",
  "A fall in real wages will most likely:",
  "Which of the following best describes price discrimination?",
  "An economy operating inside its production possibility frontier indicates:",
  "Which of the following is a feature of an oligopolistic market?",
  "An import tariff will most likely:",
  "A current account deficit means that:",
  "Which of the following is most likely to reduce inequality of income?",
  "An increase in the natural rate of unemployment is most likely caused by:",
  "Which of the following is most consistent with the Phillips curve relationship?",
  "A leakage from the circular flow of income is:",
  "Which of the following is a function of money?",
  "Behavioural economics suggests that consumers are:",
  "Government failure is most likely to occur when:",
  "Which of the following best defines opportunity cost?",
];

const AQA_PAPER_3_OVERRIDE_CONFIGS: Record<string, AqaPaper3OverrideConfig> = {
  "econ-p3-a": {
    setLabel: "Predicted Paper Set A",
    caseStudy: `The UK economy faces a complex set of challenges: weak productivity growth, persistent regional inequality, an ageing population, and the need to decarbonise while maintaining international competitiveness. Policymakers must weigh the trade-offs between short-run macroeconomic stability and long-run structural reform.

Real GDP per head has barely grown since 2008, and business investment as a share of GDP remains among the lowest in the G7. Successive governments have set out 'levelling-up' agendas, but progress has been slow. Meanwhile, the transition to net zero requires major investment in renewable energy, electric vehicles and grid infrastructure. The Bank of England has navigated a tight labour market and persistent services inflation by holding Bank Rate at restrictive levels. Critics argue that fiscal and monetary policy alone cannot address the UK's deeper supply-side weaknesses, and that synoptic, joined-up policy is needed across micro and macro.`,
    q31: `With reference to the case study, explain how weak productivity growth could affect the UK's long-run aggregate supply.`,
    q32: `Analyse the microeconomic and macroeconomic effects of large-scale public investment in the UK's transition to net zero.`,
    q33: `Evaluate the view that supply-side policies are the most effective way to reduce regional inequality and raise long-run economic growth in the UK.`,
    mcqs: PAPER_3_TOPIC_BANK,
  },
  "econ-p3-b": {
    setLabel: "Predicted Paper Set B",
    caseStudy: `Global financial markets have been reshaped by the post-pandemic interest rate cycle, the rise of large technology firms, and renewed concerns about financial stability. Regulators face a difficult balance between supporting innovation and protecting consumers and the wider financial system.

In the UK, banks have remained well-capitalised, but smaller firms have reported tighter credit conditions. The growth of fintech, digital wallets and 'buy now, pay later' has expanded access to credit but also raised concerns about consumer debt. Behavioural biases — including present bias and loss aversion — appear to influence borrowing and saving decisions, and asymmetric information remains a key feature of financial markets. Internationally, capital flows have shifted in response to monetary policy divergence, with implications for emerging market currencies and debt sustainability.`,
    q31: `With reference to the case study, explain how asymmetric information may lead to market failure in financial markets.`,
    q32: `Analyse the microeconomic and macroeconomic effects of tighter regulation of consumer credit in the UK.`,
    q33: `Evaluate the view that financial market regulation does more harm than good in promoting long-run economic welfare.`,
    mcqs: PAPER_3_TOPIC_BANK,
  },
  "econ-p3-c": {
    setLabel: "Predicted Paper Set C",
    caseStudy: `Public sector economics has come to the centre of UK policy debate. Pressures on healthcare, education and infrastructure have grown alongside an ageing population and rising public expectations. At the same time, public sector net debt is approaching 100% of GDP, and debt-servicing costs have risen sharply.

Government failure remains a concern: large-scale public projects have suffered from cost overruns and delays, while regulatory bodies have been criticised for both excessive intervention and insufficient enforcement. Policymakers face trade-offs between equity and efficiency, between current consumption and long-run investment, and between centralisation and devolution of decision-making. Economists disagree about the appropriate size of the state, the design of taxation, and the optimal mix of universal versus targeted welfare provision.`,
    q31: `With reference to the case study, explain why government failure may occur when the public sector provides public goods.`,
    q32: `Analyse the microeconomic and macroeconomic effects of a significant rise in government spending on public services.`,
    q33: `Evaluate the view that the size of the public sector should be reduced to improve long-run economic performance in the UK.`,
    mcqs: PAPER_3_TOPIC_BANK,
  },
  "econ-p3-d": {
    setLabel: "Predicted Paper Set D",
    caseStudy: `Behavioural economics has changed how policymakers design interventions in the UK. From auto-enrolment in workplace pensions to nudges in tax compliance and energy use, behavioural insights are now embedded in many areas of public policy.

Traditional models assume rational agents with stable preferences, full information and unbiased decision-making. In practice, consumers and firms display bounded rationality, anchoring, herding, and present bias. These features can help explain under-saving for retirement, over-consumption of demerit goods, and persistent productivity gaps. Behavioural policy tools — including default settings, framing, and salience — are often cheaper than traditional regulation or taxation but raise questions about paternalism and consent.`,
    q31: `With reference to the case study, explain how behavioural biases can lead to suboptimal consumer decisions.`,
    q32: `Analyse the microeconomic and macroeconomic effects of using behavioural 'nudge' policies to address the UK's low household saving rate.`,
    q33: `Evaluate the view that behavioural economics offers a more useful framework than traditional economic theory for designing UK government policy.`,
    mcqs: PAPER_3_TOPIC_BANK,
  },
  "econ-p3-e": {
    setLabel: "Predicted Paper Set E",
    caseStudy: `The UK is engaged in a long-term transition towards a low-carbon economy. Government policy combines carbon pricing, regulation, subsidies for green technology, and major public investment in grid infrastructure. The transition has microeconomic implications for firms, workers and consumers, and macroeconomic implications for growth, inflation, and the public finances.

The transition raises distributional concerns: low-income households spend a larger share of income on energy and may be disproportionately affected by carbon taxes. Policymakers must consider not just the efficiency of policies but also their fairness. Internationally, the UK's actions interact with policies in the EU, US and China, and with global trade rules. Synoptic analysis is needed across micro and macro to evaluate the overall effectiveness of the UK's net zero strategy.`,
    q31: `With reference to the case study, explain why a carbon tax may be regressive.`,
    q32: `Analyse the microeconomic and macroeconomic effects of a sharp increase in the UK carbon price.`,
    q33: `Evaluate the view that market-based environmental policies are more effective than direct regulation in achieving the UK's net zero target.`,
    mcqs: PAPER_3_TOPIC_BANK,
  },
  "econ-p3-f": {
    setLabel: "Predicted Paper Set F",
    caseStudy: `The UK competition policy framework has been strengthened in recent years, with the Competition and Markets Authority gaining new powers over digital markets. Large technology firms operate in highly concentrated markets characterised by network effects, control of data and significant economies of scale.

Some economists argue that strong intervention is needed to prevent abuse of dominance and to keep markets contestable for new entrants. Others argue that excessive regulation could damage dynamic efficiency and reduce the UK's attractiveness as a destination for technology investment. The synoptic question is whether competition policy should focus narrowly on consumer prices, or take a broader view that includes innovation, data privacy, and the impact on labour markets.`,
    q31: `With reference to the case study, explain how network effects can act as a barrier to entry in digital markets.`,
    q32: `Analyse the microeconomic and macroeconomic effects of stronger competition policy in UK digital markets.`,
    q33: `Evaluate the view that UK competition policy should prioritise long-run dynamic efficiency over short-run consumer welfare.`,
    mcqs: PAPER_3_TOPIC_BANK,
  },
};

function buildAqaPaper3Override(config: AqaPaper3OverrideConfig): string {
  const mcqLines = config.mcqs
    .slice(0, 30)
    .map(
      (stem, i) => `Question ${i + 1} [1 marks]
${stem}
${STANDARD_MCQ_OPTIONS}`,
    )
    .join("\n\n");

  return `# AQA A-Level Economics (7136) — Paper 3: Economic Principles and Issues — ${config.setLabel}

**Time: 2 hours | Total: 80 marks**

## Section A — Multiple Choice (30 marks)

Each question is worth 1 mark. Select the single best option (A, B, C or D).

${mcqLines}

## Section B — Case Study (50 marks)

### Case Study Extract
${config.caseStudy}

Question 31 [10 marks]
${config.q31}

Question 32 [15 marks]
${config.q32}

Question 33 [25 marks]
${config.q33}`;
}

const AQA_PAPER_3_OVERRIDES = Object.fromEntries(
  Object.entries(AQA_PAPER_3_OVERRIDE_CONFIGS).map(([id, cfg]) => [id, buildAqaPaper3Override(cfg)]),
) as Record<string, string>;

export function getAqaPaper3OverrideContent(paperId: string): string | null {
  return AQA_PAPER_3_OVERRIDES[paperId] ?? null;
}
