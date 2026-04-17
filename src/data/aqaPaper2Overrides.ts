interface AqaPaper2OverrideConfig {
  setLabel: string;
  extractA: string;
  extractB: string;
  extractC: string;
  extractD: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
}

const AQA_PAPER_2_OVERRIDE_CONFIGS: Record<string, AqaPaper2OverrideConfig> = {
  "econ-p2-a": {
    setLabel: "Predicted Paper Set A",
    extractA: `The Bank of England raised Bank Rate from 0.1% in December 2021 to 5.25% by August 2023 in an effort to combat rising inflation. CPI inflation peaked at 11.1% in October 2022 before falling to 4.0% by December 2023.

| Indicator | 2021 | 2022 | 2023 | 2024 (est.) |
|-----------|------|------|------|-------------|
| GDP growth (%) | 7.6 | 4.3 | 0.1 | 0.6 |
| CPI inflation (%) | 2.6 | 9.1 | 7.3 | 3.2 |
| Unemployment (%) | 4.5 | 3.7 | 4.2 | 4.4 |
| Bank Rate (%) | 0.1 | 3.5 | 5.25 | 5.0 |`,
    extractB: `Higher Bank Rate raises the cost of borrowing for households and firms. Mortgage holders on variable-rate deals saw monthly repayments rise sharply, while business investment slowed. Some economists argued that monetary tightening was necessary to anchor inflation expectations after a major supply shock.`,
    extractC: `Critics warned that monetary policy operates with long and variable lags, so the full effect of past rate rises had not yet been felt. They also pointed out that much of the inflation was imported through energy and food prices, which monetary policy cannot directly control.`,
    extractD: `The UK ran a persistent current account deficit through 2024, driven mainly by a large trade-in-goods deficit and weaker net investment income. Some commentators argued that this reflected long-standing structural weakness; others viewed it as a manageable counterpart to net capital inflows.`,
    q1: `Define the term 'real wages'.`,
    q2: `Using Extract A, explain two ways in which a rise in Bank Rate may reduce aggregate demand.`,
    q3: `With the aid of an AD/AS diagram, analyse the impact of a sustained increase in interest rates on UK macroeconomic performance.`,
    q4: `Evaluate the effectiveness of monetary policy as a tool for controlling demand-pull inflation in the UK.`,
    q5: `Explain how a persistent current account deficit can affect macroeconomic performance.`,
    q6: `Evaluate the view that a current account deficit is always harmful to the UK economy.`,
  },
  "econ-p2-b": {
    setLabel: "Predicted Paper Set B",
    extractA: `In 2024 the UK government announced further increases in capital spending on infrastructure, alongside targeted tax incentives for business investment. Supporters argued the package would raise productivity; critics warned about the impact on the deficit.

| Year | Public sector net investment (% GDP) | Real GDP growth (%) | Productivity growth (%) | Public sector net debt (% GDP) |
|------|--------------------------------------|---------------------|--------------------------|-------------------------------|
| 2019 | 2.1 | 1.6 | 0.4 | 84 |
| 2021 | 2.6 | 7.6 | 1.0 | 95 |
| 2023 | 2.4 | 0.1 | -0.1 | 98 |
| 2024 | 3.0 | 0.6 | 0.3 | 99 |`,
    extractB: `Supporters of higher public investment argue that better transport, energy and digital infrastructure raise long-run productive capacity. They also note that crowding-in effects can encourage private firms to invest alongside the government in priority sectors.`,
    extractC: `Critics warn that loose fiscal policy combined with elevated debt may push up gilt yields and crowd out private investment. They argue supply-side reforms — such as planning, skills and tax simplification — could deliver growth at lower fiscal cost.`,
    extractD: `Many developing economies depend heavily on exports of primary commodities. Volatile world prices, narrow export bases and limited domestic processing have been linked to slow long-run development for some countries.`,
    q1: `Using Extract A, calculate the change in public sector net investment as a percentage of GDP between 2019 and 2024.`,
    q2: `Using Extracts A and B, explain two ways in which higher public investment may raise long-run aggregate supply.`,
    q3: `With the aid of an AD/AS diagram, analyse the impact of an expansionary fiscal policy on the UK macroeconomy.`,
    q4: `Evaluate the view that fiscal policy is the most effective way to raise long-run economic growth in the UK.`,
    q5: `Explain why dependence on primary commodity exports may constrain economic development.`,
    q6: `Evaluate the view that trade liberalisation is the most effective way to promote economic development.`,
  },
  "econ-p2-c": {
    setLabel: "Predicted Paper Set C",
    extractA: `The UK labour market remained tight through 2024, with elevated vacancies and historically low unemployment. Wage growth in services stayed above 5%, contributing to concerns about underlying inflation persistence.

| Year | Unemployment (%) | Vacancies (000s) | Average weekly earnings growth (%) | Inactivity rate (%) |
|------|------------------|------------------|------------------------------------|---------------------|
| 2019 | 3.8 | 800 | 3.4 | 20.5 |
| 2021 | 4.5 | 1190 | 4.7 | 21.4 |
| 2023 | 4.2 | 940 | 7.0 | 21.6 |
| 2024 | 4.3 | 870 | 5.6 | 21.4 |`,
    extractB: `Some economists argue that strong wage growth in a tight labour market generates 'second-round' inflation effects as firms pass higher wage costs onto prices. Others stress that wages are still catching up after a long period of falling real pay.`,
    extractC: `Inactivity remains elevated relative to pre-pandemic levels, partly reflecting long-term sickness. Policymakers debate whether welfare reforms, training subsidies, or improved healthcare access would be most effective in raising labour market participation.`,
    extractD: `Globalisation has reshaped UK labour and product markets through trade, FDI and migration. Some workers have benefited from new opportunities; others have faced competition from cheaper imports and offshoring.`,
    q1: `Using Extract A, calculate the change in vacancies between 2021 and 2024.`,
    q2: `Using Extracts A and B, explain two reasons why wage growth may put upward pressure on inflation.`,
    q3: `With the aid of an AD/AS diagram, analyse the impact of a tight labour market on UK inflation and growth.`,
    q4: `Evaluate the view that supply-side policies are the most effective way to reduce inflation in the UK.`,
    q5: `Explain how globalisation may affect income distribution within the UK.`,
    q6: `Evaluate the view that the benefits of globalisation outweigh the costs for the UK economy.`,
  },
  "econ-p2-d": {
    setLabel: "Predicted Paper Set D",
    extractA: `Sterling weakened against the US dollar through parts of 2022 and 2023 before partially recovering in 2024. Movements in the exchange rate had significant implications for trade, inflation and the current account.

| Year | £/$ rate | Goods trade balance (£bn) | Services trade balance (£bn) | Current account (% GDP) |
|------|---------|---------------------------|------------------------------|-------------------------|
| 2019 | 1.28 | -141 | 109 | -2.7 |
| 2021 | 1.38 | -157 | 116 | -1.5 |
| 2023 | 1.24 | -185 | 156 | -3.3 |
| 2024 | 1.27 | -176 | 168 | -2.6 |`,
    extractB: `A weaker pound makes UK exports more competitive abroad and imports more expensive. The eventual impact on the trade balance depends on the price elasticities of demand for exports and imports — sometimes described by the Marshall–Lerner condition and the J-curve effect.`,
    extractC: `A depreciation can also raise imported inflation, especially in an economy that imports a large share of energy and food. Monetary policy may then need to respond, creating a trade-off between supporting growth and controlling inflation.`,
    extractD: `Many emerging economies use a mix of exchange rate management, capital controls and reserve accumulation to stabilise their currencies. Such policies have costs and benefits, and may be constrained by international agreements.`,
    q1: `Using Extract A, calculate the change in the £/$ exchange rate between 2021 and 2023.`,
    q2: `Using Extracts A and B, explain two effects of a sterling depreciation on UK macroeconomic performance.`,
    q3: `With the aid of a diagram, analyse the impact of a depreciation of sterling on the UK current account.`,
    q4: `Evaluate the view that a floating exchange rate is the most appropriate exchange rate system for the UK economy.`,
    q5: `Explain why developing economies may choose to manage their exchange rate.`,
    q6: `Evaluate the policies a government can use to reduce a persistent current account deficit.`,
  },
  "econ-p2-e": {
    setLabel: "Predicted Paper Set E",
    extractA: `UK public finances came under sustained pressure following the pandemic and energy crisis, with debt-servicing costs rising as Bank Rate increased. Debate intensified over the appropriate fiscal stance.

| Year | Public sector net borrowing (% GDP) | Public sector net debt (% GDP) | Debt interest spending (% GDP) | Real GDP growth (%) |
|------|-------------------------------------|--------------------------------|--------------------------------|---------------------|
| 2019 | 2.5 | 84 | 1.5 | 1.6 |
| 2021 | 7.6 | 95 | 1.7 | 7.6 |
| 2023 | 4.4 | 98 | 4.4 | 0.1 |
| 2024 | 4.0 | 99 | 3.9 | 0.6 |`,
    extractB: `Some economists argue that with debt approaching 100% of GDP, the government should prioritise reducing borrowing to maintain market confidence and prevent further rises in long-term interest rates.`,
    extractC: `Others argue that growth-friendly investment in infrastructure, skills and the green transition is more important than rapid consolidation, and that a credible medium-term fiscal framework is preferable to short-term cuts.`,
    extractD: `Some developing economies face very high debt-to-GDP ratios denominated in foreign currency. They face complex trade-offs between debt servicing, public investment and exchange rate stability.`,
    q1: `Using Extract A, calculate the percentage point change in debt interest spending as a percentage of GDP between 2019 and 2024.`,
    q2: `Using Extracts A and B, explain two reasons why a rising debt interest burden can constrain government policy.`,
    q3: `With the aid of an AD/AS diagram, analyse the impact of a contractionary fiscal policy on the UK macroeconomy.`,
    q4: `Evaluate the view that the UK government should prioritise reducing public sector borrowing rather than increasing public investment.`,
    q5: `Explain how a high level of external debt may constrain economic development.`,
    q6: `Evaluate the role of international institutions such as the IMF in supporting developing economies.`,
  },
  "econ-p2-f": {
    setLabel: "Predicted Paper Set F",
    extractA: `Productivity growth in the UK has remained weak compared with the pre-2008 period. Government, businesses and economists have proposed a range of supply-side reforms.

| Year | Output per hour growth (%) | Business investment growth (%) | Real GDP growth (%) |
|------|----------------------------|--------------------------------|---------------------|
| 2007 | 1.9 | 6.2 | 2.7 |
| 2015 | 0.9 | 4.5 | 2.4 |
| 2019 | 0.4 | 1.6 | 1.6 |
| 2024 | 0.3 | 1.1 | 0.6 |`,
    extractB: `The 'productivity puzzle' is often linked to weak business investment, low R&D spending, and skills mismatches. Some economists also point to regional inequality and underinvestment in transport infrastructure outside London and the South East.`,
    extractC: `Supply-side reforms include tax incentives for investment, education and training reforms, planning liberalisation and competition policy. The choice between market-based and interventionist supply-side policies depends on the underlying causes of weak productivity.`,
    extractD: `Globally, productivity growth has slowed across many advanced economies. Trade integration, technology diffusion and demographic change are all relevant factors in cross-country comparisons.`,
    q1: `Using Extract A, calculate the percentage point fall in output-per-hour growth between 2007 and 2024.`,
    q2: `Using Extracts A and B, explain two reasons why productivity growth may have slowed in the UK.`,
    q3: `With the aid of an AD/AS diagram, analyse the impact of effective supply-side policies on the UK macroeconomy.`,
    q4: `Evaluate the view that market-based supply-side policies are more effective than interventionist supply-side policies in raising long-run productivity.`,
    q5: `Explain how international trade may raise productivity in an economy.`,
    q6: `Evaluate the view that protectionism can be justified to support domestic industries.`,
  },
  "econ-p2-g": {
    setLabel: "Predicted Paper Set G",
    extractA: `The UK has set a legally binding net zero target for 2050. Achieving this requires significant changes in production, consumption and investment across the economy.

| Year | Greenhouse gas emissions (MtCO2e) | Renewable share of electricity (%) | Green investment (£bn) |
|------|-----------------------------------|-------------------------------------|-------------------------|
| 2010 | 645 | 7 | 8 |
| 2019 | 472 | 37 | 22 |
| 2024 | 384 | 47 | 31 |`,
    extractB: `Decarbonisation requires large-scale investment in renewable generation, grid infrastructure, electric vehicles and energy efficiency. Public and private finance must work together if investment is to scale rapidly.`,
    extractC: `Some economists argue that carbon pricing and regulation are essential to internalise the external costs of emissions. Others stress the importance of supporting innovation and protecting low-income households from rising energy costs.`,
    extractD: `Climate change is a global externality. International coordination through agreements such as the Paris Accord is necessary to limit free-riding and prevent carbon leakage between countries.`,
    q1: `Using Extract A, calculate the percentage fall in UK greenhouse gas emissions between 2010 and 2024.`,
    q2: `Using Extracts A and B, explain two reasons why decarbonisation may raise long-run aggregate supply.`,
    q3: `With the aid of an AD/AS diagram, analyse the macroeconomic impact of large-scale green investment in the UK.`,
    q4: `Evaluate the view that government intervention is essential to achieve the UK's net zero target.`,
    q5: `Explain why international coordination is needed to tackle climate change.`,
    q6: `Evaluate the role of international agreements in addressing global environmental problems.`,
  },
};

function buildAqaPaper2Override(config: AqaPaper2OverrideConfig): string {
  return `# AQA A-Level Economics (7136) — Paper 2: National and International Economy — ${config.setLabel}

**Time: 2 hours | Total: 80 marks**

## Section A

### Extract A
${config.extractA}

### Extract B
${config.extractB}

### Extract C
${config.extractC}

Question 1 [2 marks]
${config.q1}

Question 2 [4 marks]
${config.q2}

Question 3 [9 marks]
${config.q3}

Question 4 [25 marks]
${config.q4}

## Section B

### Extract D
${config.extractD}

Question 5 [15 marks]
${config.q5}

Question 6 [25 marks]
${config.q6}`;
}

const AQA_PAPER_2_OVERRIDES = Object.fromEntries(
  Object.entries(AQA_PAPER_2_OVERRIDE_CONFIGS).map(([id, cfg]) => [id, buildAqaPaper2Override(cfg)]),
) as Record<string, string>;

export function getAqaPaper2OverrideContent(paperId: string): string | null {
  return AQA_PAPER_2_OVERRIDES[paperId] ?? null;
}
