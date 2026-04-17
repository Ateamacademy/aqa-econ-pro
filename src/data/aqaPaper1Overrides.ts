interface AqaPaper1OverrideConfig {
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

const AQA_PAPER_1_OVERRIDE_CONFIGS: Record<string, AqaPaper1OverrideConfig> = {
  "econ-p1-a": {
    setLabel: "Predicted Paper Set A",
    extractA: `The UK government announced in 2024 that it would extend the Soft Drinks Industry Levy to more high-sugar milk-based drinks. Public Health England estimated that obesity-related illness continued to impose major costs on the NHS. Reformulation accelerated after earlier levy bands were introduced, with several major brands cutting sugar content to avoid the higher rate.

| Year | Sugary drink consumption (litres per capita) | Adult obesity rate (%) | Levy revenue (£m) |
|------|----------------------------------------------|------------------------|-------------------|
| 2018 | 78.4 | 28.7 | 240 |
| 2020 | 65.1 | 29.0 | 336 |
| 2022 | 58.3 | 28.5 | 380 |
| 2024 | 52.7 | 27.8 | 415 |`,
    extractB: `Supporters of the levy argue that sugary drinks are a demerit good because consumers may underestimate the long-term health costs of excessive sugar consumption. They also argue that obesity creates external costs for taxpayers through higher NHS expenditure and lower labour productivity.`,
    extractC: `Critics argue that indirect taxes are regressive and fall proportionately more heavily on low-income households. Some economists also suggest that education, better labelling, and restrictions on advertising to children may be more effective than taxation in changing behaviour over time.`,
    extractD: `Several English city regions increased bus subsidies in 2024 in an attempt to reduce congestion, improve labour mobility, and cut transport-related emissions. Passenger groups argued that lower fares would raise access to work and education, while critics questioned whether subsidies represented good value for taxpayers.`,
    q1: `Using Extract A, calculate the percentage fall in sugary drink consumption between 2018 and 2024.`,
    q2: `Using Extracts A and B, explain two reasons why the demand for sugary drinks may be price inelastic in the short run.`,
    q3: `With the aid of a supply and demand diagram, analyse the impact of an indirect tax on the market for sugary drinks.`,
    q4: `Evaluate the view that indirect taxes are the most effective way to reduce the consumption of demerit goods.`,
    q5: `Explain how a subsidy to public transport could improve allocative efficiency in urban transport markets.`,
    q6: `Evaluate the extent to which government subsidy of public transport is justified on economic grounds.`,
  },
  "econ-p1-b": {
    setLabel: "Predicted Paper Set B",
    extractA: `The UK Emissions Trading Scheme requires large emitters to acquire permits for each tonne of carbon dioxide released. Since 2021, carbon prices have increased as policymakers attempted to tighten the cap and encourage firms to reduce emissions.

| Year | Carbon price (£/tonne) | UK industrial emissions (MtCO₂) | Renewable energy share (%) |
|------|------------------------|----------------------------------|----------------------------|
| 2019 | 22 | 102 | 37 |
| 2021 | 50 | 92 | 40 |
| 2022 | 68 | 85 | 42 |
| 2024 | 78 | 79 | 47 |`,
    extractB: `Environmental groups argue that putting a price on pollution forces firms to internalise an external cost that would otherwise be ignored in a free market. Manufacturers respond that higher carbon prices raise average costs and may reduce international competitiveness if firms in other countries face weaker regulation.`,
    extractC: `Some economists favour tradable permits and carbon taxes because they use market incentives rather than direct controls. Others argue that regulation, subsidies for green investment, and international coordination are still necessary because emissions targets may not be met through price signals alone.`,
    extractD: `The UK broadband and mobile markets remain highly concentrated, with a few large firms controlling substantial infrastructure. Consumer groups complain about weak competition, while defenders of large firms argue that market power can support long-term investment in networks and innovation.`,
    q1: `Using Extract A, calculate the total fall in UK industrial emissions between 2019 and 2024.`,
    q2: `Using Extracts A and B, explain two reasons why a higher carbon price may reduce emissions from firms.`,
    q3: `With the aid of an externality diagram, analyse how tradable pollution permits aim to reduce market failure from industrial emissions.`,
    q4: `Evaluate the view that market-based policies, such as carbon trading and environmental taxes, are more effective than government regulation in tackling climate change.`,
    q5: `Explain why monopoly power may lead to allocative and productive inefficiency.`,
    q6: `Evaluate the view that monopoly power is always against the public interest.`,
  },
  "econ-p1-c": {
    setLabel: "Predicted Paper Set C",
    extractA: `Following the 2022 energy crisis, the government introduced the Energy Price Guarantee to limit the rise in household energy bills. By 2024, the cap had fallen as wholesale gas prices eased, but policymakers remained divided about whether price controls help or hinder efficient resource allocation.

| Year | Average annual bill (£) | Wholesale gas price (p/therm) | Fuel poverty (% households) |
|------|--------------------------|-------------------------------|-----------------------------|
| 2019 | 1254 | 40 | 10.3 |
| 2021 | 1138 | 55 | 13.2 |
| 2022 | 2500 | 200 | 19.8 |
| 2024 | 1568 | 68 | 14.5 |`,
    extractB: `Supporters of the cap argue that energy demand is price inelastic in the short run, so large price rises can create severe hardship, especially for low-income households. Critics respond that maximum prices distort market signals, reduce incentives to conserve energy, and may discourage new investment in supply.`,
    extractC: `At the same time, governments have offered subsidies and contracts to stimulate renewable energy investment. Advocates say this can speed up the transition to cleaner electricity generation, while opponents warn that poorly designed intervention may create government failure and misallocation of resources.`,
    extractD: `A chemical manufacturing cluster in northern England has come under criticism for local air and water pollution. Residents argue that firms do not bear the full social cost of production, while business groups warn that tougher regulation could reduce investment and employment in the region.`,
    q1: `Using Extract A, calculate the percentage change in the average annual household energy bill between 2022 and 2024.`,
    q2: `Using Extracts B and C, explain two reasons why governments intervene in energy markets.`,
    q3: `With the aid of a supply and demand diagram, analyse the effect of a maximum price on the market for household energy.`,
    q4: `Evaluate the view that government price controls do more harm than good in correcting market failure.`,
    q5: `Explain how a negative externality of production causes welfare loss.`,
    q6: `Evaluate the effectiveness of different methods a government could use to reduce negative externalities of production.`,
  },
  "econ-p1-d": {
    setLabel: "Predicted Paper Set D",
    extractA: `The UK's Competition and Markets Authority examined a major proposed merger in the gaming industry amid concerns about competition in cloud gaming. Policymakers noted that console markets remain highly concentrated, while smaller developers have expanded rapidly in mobile and independent game publishing.

| Indicator | 2019 | 2021 | 2023 | 2024 |
|-----------|------|------|------|------|
| Industry revenue (£bn) | 5.7 | 7.2 | 7.5 | 7.8 |
| Console market concentration (CR3, %) | 97 | 96 | 95 | 95 |
| Mobile gaming share of revenue (%) | 42 | 48 | 50 | 52 |
| Number of UK indie studios | 2200 | 2800 | 3100 | 3400 |`,
    extractB: `Supporters of the merger argued that scale is necessary to compete internationally and finance innovation in subscription and cloud gaming. Critics argued that increased concentration could reduce consumer choice, raise prices, and create barriers for rival firms seeking access to platforms and content.`,
    extractC: `Some economists suggest that dynamic efficiency may justify a degree of market power in technology industries. Others argue that competition policy remains essential because short-run consumer harm and strategic barriers to entry can outweigh any claimed innovation benefits.`,
    extractD: `Water supply networks exhibit very high fixed costs and substantial economies of scale. As a result, many economists classify water distribution as a natural monopoly, though there is disagreement over whether regulation or public ownership offers the better long-run solution.`,
    q1: `Using Extract A, calculate the increase in the number of UK indie studios between 2019 and 2024.`,
    q2: `Using Extracts B and C, explain two reasons why high concentration ratios may indicate market power.`,
    q3: `With the aid of a monopoly diagram, analyse how market power can lead to a welfare loss for consumers.`,
    q4: `Evaluate the view that competition policy, such as blocking mergers, is the most effective way to protect consumer welfare.`,
    q5: `Explain why a natural monopoly may arise in a utility market such as water supply.`,
    q6: `Evaluate whether a natural monopoly should always be regulated or nationalised.`,
  },
  "econ-p1-e": {
    setLabel: "Predicted Paper Set E",
    extractA: `The UK energy market remains dominated by a small number of major suppliers. In 2024, average household bills stayed elevated, and policymakers continued to debate whether stronger intervention was needed to protect consumers.

| Year | CR4 (%) | Average bill (£) | Switching rate (%) |
|------|---------|------------------|--------------------|
| 2019 | 73 | 1254 | 18.3 |
| 2020 | 69 | 1138 | 15.7 |
| 2021 | 65 | 1277 | 12.4 |
| 2022 | 71 | 1971 | 9.8 |
| 2023 | 74 | 1834 | 8.1 |
| 2024 | 76 | 1928 | 6.2 |`,
    extractB: `Consumer groups argue that falling switching rates and rising concentration suggest weak competitive pressure. Firms argue that the industry faces high regulatory and financing costs, making larger scale efficient and necessary for investment in infrastructure and customer support.`,
    extractC: `Governments have considered price caps, windfall taxes, and stronger regulation in response to the cost-of-living crisis. Economists disagree over whether such measures improve outcomes or merely reduce incentives for entry, investment, and innovation.`,
    extractD: `Debate continues over whether merit goods such as healthcare, education, and vaccinations should be provided free at the point of use. Some economists focus on positive externalities and imperfect information, while others emphasise opportunity cost and government failure.`,
    q1: `Using Extract A, calculate the percentage change in the average household energy bill between 2019 and 2024.`,
    q2: `Using Extracts A and B, explain two barriers to entry in the UK energy market.`,
    q3: `With the aid of a diagram, analyse how oligopolistic behaviour in the energy market may lead to allocative inefficiency.`,
    q4: `Evaluate whether government intervention through price caps is the most effective way to protect consumers in oligopolistic markets such as the UK energy market.`,
    q5: `Explain why merit goods may be under-consumed in a free market.`,
    q6: `Evaluate the view that the government should intervene to ensure merit goods are provided at zero price to the consumer.`,
  },
  "econ-p1-f": {
    setLabel: "Predicted Paper Set F",
    extractA: `The UK National Living Wage rose to £11.44 per hour in April 2024. Policymakers argued that higher statutory pay would support living standards, though some employers warned that labour costs could reduce hiring in low-margin sectors.

| Year | NLW (£/hr) | Workers affected (m) | Unemployment (%) | Vacancies (000s) |
|------|------------|----------------------|------------------|------------------|
| 2020 | 8.72 | 2.0 | 4.5 | 345 |
| 2021 | 8.91 | 2.1 | 4.4 | 820 |
| 2022 | 9.50 | 2.3 | 3.7 | 1295 |
| 2023 | 10.42 | 2.5 | 4.0 | 934 |
| 2024 | 11.44 | 2.7 | 4.3 | 878 |`,
    extractB: `Trade unions argue that higher minimum wages improve incentives, reduce in-work poverty, and may raise productivity through lower labour turnover. Business groups respond that when wage floors are set above equilibrium, the result may be reduced employment or substitution towards automation.`,
    extractC: `At the same time, advances in AI and automation are changing labour demand across the economy. High-skill occupations in data science and software development have expanded rapidly, while routine clerical and manufacturing roles face increased displacement.`,
    extractD: `Online markets often involve hidden fees, misleading reviews, and unequal access to information. Economists note that when sellers know more than buyers, consumers may make decisions that do not maximise welfare, creating a form of market failure.`,
    q1: `Using Extract A, calculate the percentage increase in the National Living Wage between 2020 and 2024.`,
    q2: `Using Extracts B and C, explain two reasons why labour market outcomes may become more unequal over time.`,
    q3: `With the aid of a labour market diagram, analyse the impact of a significant increase in the National Living Wage on employment in a low-paid sector.`,
    q4: `Evaluate the view that the National Living Wage always improves the welfare of low-paid workers.`,
    q5: `Explain how asymmetric information can cause market failure.`,
    q6: `Evaluate the view that asymmetric information is the most significant cause of market failure.`,
  },
  "econ-p1-g": {
    setLabel: "Predicted Paper Set G",
    extractA: `The Digital Markets, Competition and Consumers Act 2024 gave UK regulators stronger powers to oversee large online platforms. Critics argued that a small number of firms retained exceptional market power in search, app distribution, and operating systems.

| Company | Revenue ($bn) | Operating margin (%) | Market share in core market (%) |
|---------|---------------|----------------------|---------------------------------|
| Google | 307 | 27 | 92 |
| Apple | 383 | 30 | 55 |
| Meta | 135 | 35 | 77 |
| Amazon | 575 | 6 | 38 |
| Microsoft | 212 | 42 | 75 |`,
    extractB: `Large technology firms benefit from network effects, control of data, and strong brand recognition. These features can increase barriers to entry and allow incumbents to maintain high market shares even when prices are zero for some users and monetisation comes through advertising or ecosystem control.`,
    extractC: `Regulators argue that conduct requirements and competition policy are necessary to limit abuse of dominance. Firms respond that excessive intervention could reduce innovation, deter investment, and punish success in markets where consumer benefits may already be substantial.`,
    extractD: `Some economists claim that even highly concentrated markets can deliver competitive outcomes if entry and exit are easy and sunk costs are low. Others argue that these assumptions rarely hold in practice, especially in industries with strong network effects or major infrastructure requirements.`,
    q1: `Using Extract A, identify the firm with the highest operating margin and state that margin.`,
    q2: `Using Extracts B and C, explain two characteristics of digital markets that create barriers to entry.`,
    q3: `With the aid of a monopoly diagram, analyse how a dominant technology firm can restrict output and create a welfare loss.`,
    q4: `Evaluate whether regulation is more effective than competition policy in controlling the market power of large technology firms.`,
    q5: `Explain the key assumptions of contestable market theory.`,
    q6: `Evaluate the view that contestable markets always produce outcomes superior to monopoly.`,
  },
};

function buildAqaPaper1Override(config: AqaPaper1OverrideConfig): string {
  return `# AQA A-Level Economics (7136) — Paper 1: Markets and Market Failure — ${config.setLabel}

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

const AQA_PAPER_1_OVERRIDES = Object.fromEntries(
  Object.entries(AQA_PAPER_1_OVERRIDE_CONFIGS).map(([paperId, config]) => [paperId, buildAqaPaper1Override(config)]),
) as Record<string, string>;

export function getAqaPaper1OverrideContent(paperId: string): string | null {
  return AQA_PAPER_1_OVERRIDES[paperId] ?? null;
}
