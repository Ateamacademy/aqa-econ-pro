import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * ~20 predicted papers for OCR A-Level Economics (H460)
 * Component 01: Microeconomics, Component 02: Macroeconomics, Component 03: Themes
 */
export const ocrPredictedPapers: PredictedPaper[] = [
  // ── COMPONENT 01: Microeconomics ──
  {
    id: "ocr-c01-set-a",
    subject: "ocr",
    paper: "1",
    title: "Component 01 Micro — Set A (Moderate)",
    description: "H460/01 Microeconomics — Moderate predicted paper: UK coffee shop market, monopolistic competition, sugar tax, public transport subsidies, minimum wage.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/01) — Component 01: Microeconomics — Predicted Paper (Moderate)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions in Section A, **one** question in Section B and **one** question in Section C.

## Section A: Data Response

Read the stimulus material and answer all the parts of Question 1.

**Is the UK coffee shop market becoming more competitive?**

The UK branded coffee shop market has grown rapidly over the past two decades. By the end of 2023, there were over 9,500 outlets, with total market turnover of approximately £4.9bn. The 'Big Three' chains – Costa Coffee, Starbucks and Caffè Nero – have traditionally dominated the market, although their combined share has fallen from around 53% in 2015 to 28% in 2023.

Independent coffee shops have grown rapidly since 2020. Research suggests independents now account for roughly half of UK coffee shop outlets. High-street bakery Greggs has also expanded aggressively into coffee, selling over 150 million cups in 2023, while Pret A Manger's subscription scheme signed up over 1.25 million members.

**Fig. 1 — Selected UK coffee-market cost and wage indices (Jan 2020 = 100)**

| Date | National Living Wage (£/hr) | Coffee-shop prices (index) | Coffee-bean price (index) |
|---|---|---|---|
| Jan 2020 | 8.72 | 100 | 100 |
| Jan 2021 | 8.91 | 102 | 106 |
| Jan 2022 | 9.50 | 109 | 148 |
| Dec 2023 | 10.42 | 128 | 172 |
| Apr 2024 | 11.44 | 132 | 161 |

Rising Arabica and Robusta bean prices – driven by drought in Brazil, supply disruption in Vietnam, and higher shipping costs – have raised input costs for all coffee shops. Energy bills for UK cafes rose by over 60% between 2021 and 2023, and staff costs have also risen sharply as the National Living Wage (NLW) has increased each year.

Despite rising costs, entry to the coffee shop market remains relatively easy compared to other parts of the hospitality sector. Start-up costs for an independent cafe can be under £30,000, and consumers can readily switch between outlets. Product differentiation – through branding, décor, loyalty schemes, speciality drinks and quality of service – is therefore central to competition.

Some economists argue the UK coffee market now closely resembles monopolistic competition. Others point to the continued strength of the largest chains, long-term lease agreements on prime locations, and the buying power of large chains over suppliers as evidence that the market is not fully competitive.

**Fig. 2 — Estimated UK coffee shop market shares by number of outlets (2023)**

| Operator | Market share (%) |
|---|---|
| Costa Coffee | 12 |
| Starbucks | 9 |
| Caffè Nero | 7 |
| Greggs | 5 |
| Pret A Manger | 4 |
| Independents | 50 |
| Other chains | 13 |

The UK Government has continued to raise the NLW to support low-paid workers, many of whom work in hospitality. Coffee shops have responded by raising drink prices, reducing staff hours, investing in self-order technology, and in some cases closing under-performing outlets.

Question 1a [2 marks]
Explain what is meant by a 'concentration ratio'.

Question 1b [4 marks]
Explain, using an appropriate diagram, the likely impact of rising coffee-bean prices on the market for branded coffee shop drinks.

Question 1c(i) [2 marks]
Refer to Fig. 1. Calculate, to one decimal place, the percentage change in the National Living Wage between January 2020 and December 2023.

Question 1c(ii) [2 marks]
Compare the trend in coffee-shop prices with the trend in coffee-bean prices over the period shown in Fig. 1.

Question 1d [8 marks]
"Rising Arabica and Robusta bean prices … have raised input costs." (Lines 15–18). Evaluate, using evidence from the stimulus material, the effectiveness of raising the National Living Wage in supporting the real incomes of coffee-shop workers.

Question 1e [12 marks]
Evaluate, using evidence from the stimulus material, the extent to which the UK coffee shop market can be considered to be an example of monopolistic competition.

## Section B

Answer **Question 2 OR Question 3**.

Question 2 [25 marks]
UK markets such as hairdressing, takeaway restaurants and independent coffee shops are often given as examples of monopolistic competition. Evaluate, using an appropriate diagram(s), whether firms in monopolistic competition are likely to be productively and allocatively efficient.

Question 3 [25 marks]
In April 2018 the UK Government introduced the Soft Drinks Industry Levy – a tax on manufacturers of sugary soft drinks. Similar sugar taxes are in place in over 50 countries worldwide. Evaluate, using an appropriate diagram(s), the likely microeconomic effects of a sugar tax on the market for sugary drinks.

## Section C

Answer **Question 4 OR Question 5**.

Question 4 [25 marks]
In 2023 public transport fares in England rose by 5.9%. Some economists argue that public transport should be more heavily subsidised by the government, both to reduce car use and to support lower-income commuters. Evaluate, using an appropriate diagram(s), whether the UK government should increase subsidies for public transport.

Question 5 [25 marks]
Between April 2020 and April 2024 the UK National Living Wage rose from £8.72 to £11.44 per hour – an increase of over 31%. Hospitality and retail, which employ large numbers of low-paid workers, have been particularly affected. Evaluate, using an appropriate diagram(s), the likely impact of rising minimum wages on the UK labour market.`,
  },
  // ── COMPONENT 01: Microeconomics ─ Set B (Hard) ──
  {
    id: "ocr-c01-set-b",
    subject: "ocr",
    paper: "1",
    title: "Component 01 Micro — Set B (Hard)",
    description: "H460/01 Microeconomics — Hard predicted paper: UK domestic energy supply market, Default Tariff Cap, oligopoly, externalities, trade unions.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/01) — Component 01: Microeconomics — Predicted Paper (Hard)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions in Section A, **one** question in Section B and **one** question in Section C.

## Section A: Data Response

Read the stimulus material and answer all the parts of Question 1.

**Is the UK domestic energy supply market working for consumers?**

For many years the UK domestic energy supply market was dominated by the 'Big Six' suppliers – British Gas, E.ON, EDF, npower, Scottish Power and SSE. Following a wave of mergers and acquisitions between 2019 and 2023, the market is now dominated by five major suppliers. Together these firms account for over 85% of residential customers.

In January 2019, following an investigation by the Competition and Markets Authority (CMA), Ofgem introduced the Default Tariff Cap. The cap limits the maximum price that suppliers can charge households on standard variable tariffs. Ofgem updates the cap every three months to reflect changes in wholesale gas and electricity costs.

**Fig. 1 — UK wholesale gas price index and average annual household dual-fuel bill (Jan 2020 = 100 / £ per year)**

| Date | Wholesale gas index (Jan 2020 = 100) | Average annual bill (£) |
|---|---|---|
| Jan 2020 | 100 | 1,179 |
| Jan 2021 | 118 | 1,138 |
| Oct 2021 | 285 | 1,277 |
| Oct 2022 | 510 | 2,500 |
| Oct 2023 | 215 | 1,834 |
| Jul 2024 | 175 | 1,568 |

The 2021–22 wholesale gas crisis pushed European gas prices up by over 400%. Around 29 UK energy suppliers collapsed between August 2021 and April 2022, forcing the government and Ofgem to protect households through the Supplier of Last Resort process and the temporary Energy Price Guarantee.

Burning natural gas and other fossil fuels to generate electricity produces carbon dioxide emissions, which contribute to climate change. To reach the UK's legally binding net-zero target by 2050, the government supports renewable generation through Contracts for Difference (CfDs) – a guaranteed price for each unit of electricity generated. The Climate Change Levy also taxes business energy use.

Switching rates between suppliers have fallen sharply since the 2021 crisis. In the year to April 2024 only 5% of households switched supplier, compared with over 18% in 2018. Commentators suggest that consumer inertia, concerns about supplier financial stability, and the effect of the Default Tariff Cap have all reduced the incentive to switch.

**Fig. 2 — Estimated UK domestic energy supplier market shares (2024)**

| Supplier | Market share (%) |
|---|---|
| British Gas (Centrica) | 22 |
| Octopus Energy | 19 |
| E.ON Next | 16 |
| EDF Energy | 14 |
| OVO Energy | 14 |
| Other suppliers | 15 |

Firms in the UK energy market compete on price, customer service ratings, smart-meter rollout, and green tariffs backed by renewable generation. However, critics argue that high barriers to entry – large capital requirements, network access, and tightened Ofgem financial-resilience rules – have reduced the contestability of the market and may be limiting the benefits of competition.

Question 1a [2 marks]
Explain what is meant by a 'negative externality of consumption'.

Question 1b [4 marks]
Explain, using an appropriate diagram, the likely effect of the Default Tariff Cap on the UK domestic energy supply market.

Question 1c(i) [2 marks]
Refer to Fig. 1. Calculate, to one decimal place, the percentage change in the average annual household dual-fuel bill between January 2020 and October 2022.

Question 1c(ii) [2 marks]
Compare the trend in the wholesale gas price index with the trend in the average annual household bill over the period shown in Fig. 1.

Question 1d [8 marks]
"the government supports renewable generation through Contracts for Difference (CfDs)." (Lines 21–23). Evaluate, using evidence from the stimulus material, the effectiveness of subsidies such as Contracts for Difference in reducing the negative externalities associated with electricity generation.

Question 1e [12 marks]
Evaluate, using evidence from the stimulus material, the extent to which the UK domestic energy supply market can be considered to be an oligopoly.

## Section B: Extended Response

Answer Question 2 OR Question 3.

Question 2 [25 marks]
Ofgem's Default Tariff Cap limits the maximum unit price that UK suppliers can charge households on standard variable tariffs. Maximum prices are also used in rent control schemes in parts of Europe and in pharmaceutical price regulation. Evaluate, using an appropriate diagram(s), the likely microeconomic effects of imposing a maximum price in a market.

Question 3 [25 marks]
Governments commonly use indirect taxes, tradable pollution permits, and regulations such as bans on specific pollutants to address environmental problems. Evaluate, using an appropriate diagram(s), whether indirect taxes are the most effective method of correcting negative externalities.

## Section C: Essay

Answer Question 4 OR Question 5.

Question 4 [25 marks]
In the 1980s and 1990s the UK and other governments broke up and privatised a number of state-owned monopolies, including British Gas, British Telecom, and the regional electricity boards. Some economists argue that today's large technology and platform firms should be broken up in a similar way. Evaluate, using an appropriate diagram(s), whether governments should break up dominant firms in oligopolistic markets.

Question 5 [25 marks]
In 2023 around 22% of UK employees were members of a trade union, a figure that has fallen from around 38% in the late 1980s. However, union membership has risen in several sectors over the past five years, including transport and public services, and collective bargaining covers about half of UK employees. Evaluate, using an appropriate diagram(s), the likely impact of trade unions on the UK labour market.`,
  },
  // ── COMPONENT 01: Microeconomics ─ Set C (Advanced) ──
  {
    id: "ocr-c01-set-c",
    subject: "ocr",
    paper: "1",
    title: "Component 01 Micro — Set C (Advanced)",
    description: "H460/01 Microeconomics — Advanced predicted paper: UK grocery sector, contestability, CMA investigations, price discrimination, privatisation, ageing population.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/01) — Component 01: Microeconomics — Predicted Paper (Advanced)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions in Section A, **one** question in Section B and **one** question in Section C.

## Section A: Data Response

Read the stimulus material and answer all the parts of Question 1.

**Is competition in the UK grocery market working for households?**

The UK grocery sector is one of the most significant retail markets in the country, with annual sales of over £240bn. The 'Big Four' – Tesco, Sainsbury's, Asda and Morrisons – have historically dominated the market. However, the last decade has seen the rapid growth of German discounters Aldi and Lidl, whose combined UK market share rose from around 9.7% in 2015 to 18.3% in early 2024.

Between 2021 and 2023, UK grocery price inflation rose sharply, peaking at 17.5% in March 2023 – the highest level since the 1970s. In May 2023 the Competition and Markets Authority (CMA) launched an investigation into alleged 'greedflation', examining whether grocery retailers used rising input costs as cover for increasing their profit margins beyond what was needed.

**Fig. 1 — UK grocery retailer market shares, 2015 – 2024 (% of 12-week grocery sales)**

| Retailer | 2015 | 2019 | 2024 |
|---|---|---|---|
| Tesco | 28.4 | 27.3 | 27.6 |
| Sainsbury's | 16.5 | 15.0 | 15.2 |
| Asda | 16.6 | 14.9 | 13.3 |
| Morrisons | 10.9 | 10.3 | 8.6 |
| Aldi | 5.6 | 8.1 | 10.1 |
| Lidl | 4.1 | 5.9 | 8.2 |
| Other (inc. Waitrose, Co-op, Iceland) | 17.9 | 18.5 | 17.0 |

The CMA's 2023 update into the grocery sector concluded that competition was 'broadly working', but flagged concerns about the pricing of branded goods by some major manufacturers, the complexity of loyalty-scheme pricing, and unit-pricing transparency. Loyalty schemes such as Tesco Clubcard Prices and Sainsbury's Nectar Prices now apply to over 8,000 products.

Barriers to entry into UK grocery include access to prime real estate, economies of scale, sophisticated supply-chain technology and national distribution networks. Exit, however, is also costly – Morrisons was acquired by private equity firm CD&R for £7bn in 2021, and online grocer Ocado reported cumulative losses of over £500m between 2020 and 2023.

**Fig. 2 — UK grocery price inflation and Big Four operating margins, 2020 – 2024**

| Year | Annual grocery price inflation (%) | Average Big Four operating margin (%) |
|---|---|---|
| 2020 | 1.9 | 3.4 |
| 2021 | 2.1 | 3.5 |
| 2022 | 9.3 | 2.6 |
| 2023 | 14.1 | 2.8 |
| 2024 (est.) | 2.2 | 3.1 |

While some economists argue that the growth of Aldi and Lidl and the threat of online grocers shows the UK market is highly contestable, others point to the persistence of the Big Four and the stability of their combined market share as evidence of significant market power, tacit coordination on pricing, and collusive behaviour over supplier terms and shelf space.

Question 1a [2 marks]
Explain what is meant by a 'contestable market'.

Question 1b [4 marks]
Explain, using an appropriate diagram, the likely effect of the expansion of Aldi and Lidl on the pricing behaviour of the Big Four supermarkets.

Question 1c(i) [2 marks]
Refer to Fig. 1. Calculate the combined percentage-point change in the market share of Aldi and Lidl between 2015 and 2024.

Question 1c(ii) [2 marks]
Calculate, to one decimal place, the four-firm concentration ratio for the UK grocery market in 2024 using the four retailers with the largest market shares in Fig. 1.

Question 1d [8 marks]
"the Competition and Markets Authority (CMA) launched an investigation into alleged 'greedflation'." (Lines 11–13). Evaluate, using evidence from the stimulus material, the effectiveness of CMA investigations in reducing anti-competitive behaviour in UK markets.

Question 1e [12 marks]
Evaluate, using evidence from the stimulus material, the extent to which the UK grocery market can be considered to be contestable.

## Section B: Extended Response

Answer Question 2 OR Question 3.

Question 2 [25 marks]
UK supermarket loyalty schemes such as Tesco Clubcard Prices and Sainsbury's Nectar Prices offer lower prices to members on over 8,000 products. Rail operators, airlines, cinemas and utility companies also use a wide range of price-discrimination strategies. Evaluate, using an appropriate diagram(s), whether price discrimination benefits consumers.

Question 3 [25 marks]
Economic theory suggests that contestable markets may produce better outcomes for consumers than traditional oligopolies, even when only a small number of firms are present in each market. Evaluate, using an appropriate diagram(s), whether contestable markets lead to better outcomes for consumers than oligopolies.

## Section C: Essay

Answer Question 4 OR Question 5.

Question 4 [25 marks]
In 2021 Morrisons was taken private by US private equity firm Clayton, Dubilier & Rice for £7bn. More broadly, since the 1980s the UK has privatised over 50 major state-owned enterprises, including British Gas, British Telecom, the water authorities, British Rail, and Royal Mail. Evaluate, using an appropriate diagram(s), whether privatisation improves economic efficiency.

Question 5 [25 marks]
The UK population is ageing. The Office for National Statistics projects that by 2045, over 24% of the UK population will be aged 65 or older, compared with around 19% today. Increased life expectancy, lower birth rates and the retirement of the 'baby boomer' generation are already affecting UK labour markets. Evaluate, using an appropriate diagram(s), the likely impact of an ageing population on UK labour markets.`,
  },
  // ── COMPONENT 02: Macroeconomics ─ Set A (Moderate) ──
  {
    id: "ocr-c02-set-a",
    subject: "ocr",
    paper: "2",
    title: "Component 02 Macro — Set A (Moderate)",
    description: "H460/02 Macroeconomics — Moderate predicted paper: Vietnam's economic transformation, FDI, inflation, productivity, supply-side policy.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/02) — Component 02: Macroeconomics — Predicted Paper (Moderate)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions in Section A, **one** question in Section B and **one** question in Section C.

## Section A: Data Response

Read the stimulus material and answer all the parts of Question 1.

**Vietnam's economic transformation**

Vietnam has been one of the fastest growing economies in Southeast Asia. In the 2010s, the country experienced an average real GDP growth rate of 6.3% per year, driven by rising consumer expenditure, expanding manufactured exports and substantial foreign direct investment (FDI). Vietnam's manufacturing sector has grown rapidly as multinational companies from Japan, South Korea and the United States have built factories in the country.

In 2022, Vietnam's inflation rate was 3.2%, but it rose to 4.6% in 2023 as global commodity prices increased and the Vietnamese dong depreciated. The country's export price index was 128.5 in 2023 while its import price index was 142.0. Policymakers have expressed concern that continuing imported inflation could reduce the purchasing power of Vietnamese households and harm the country's international competitiveness.

Vietnam has actively sought FDI as a means of promoting economic growth and creating employment.

**Fig. 1 — Annual FDI inflows (US$bn) and real GDP growth rate (%) for selected Asian economies, 2022**

| Country | FDI inflows (US$ billions) | Real GDP growth rate (%) |
|---|---|---|
| Vietnam | 17.9 | 8.0 |
| Indonesia | 22.0 | 5.3 |
| Philippines | 9.2 | 7.6 |
| Thailand | 11.2 | 2.6 |
| Malaysia | 16.9 | 8.7 |
| Cambodia | 3.6 | 5.2 |

Vietnam's government has increased its spending on education, vocational training and infrastructure with the aim of raising the country's labour productivity.

**Table 1 — Unemployment rate and labour productivity index, selected countries, 2023**

| Country | Unemployment rate (%) | Labour productivity index (2015 = 100) |
|---|---|---|
| Vietnam | 2.3 | 139.2 |
| Indonesia | 5.3 | 124.8 |
| Philippines | 4.5 | 118.7 |
| Thailand | 1.0 | 112.4 |
| Malaysia | 3.4 | 131.6 |
| Cambodia | 0.6 | 108.9 |

Vietnam's principal export markets include the United States, China and the European Union. Its main export categories are electronic components, textiles and footwear. The rapid growth in FDI has transformed employment opportunities, particularly for young workers in urban areas. However, critics argue that the benefits of FDI have not been evenly distributed. The gap between wages in foreign multinational companies and those in domestic firms has widened, and some rural areas have seen limited improvement in living standards. The Vietnamese government has also faced criticism over environmental standards at some factories owned by multinational companies.

Question 1a [2 marks]
Using information from the stimulus material, identify two components of Vietnam's aggregate demand.

Question 1b [1 marks]
Using information from the stimulus material, calculate to one decimal place Vietnam's terms of trade in 2023.

Question 1c [3 marks]
Explain whether the relationship shown in Fig. 1 between FDI inflows and the real GDP growth rate is the expected one.

Question 1d [4 marks]
Using Table 1, explain the relationship between the unemployment rate and the labour productivity index.

Question 1e [8 marks]
Using information from the stimulus material, evaluate whether the rise in inflation is likely to harm Vietnam's economic growth.

Question 1f [12 marks]
Using information from the stimulus material, evaluate whether Vietnamese workers are likely to benefit from the increase in foreign direct investment in the country.

## Section B: Extended Response

Answer Question 2 OR Question 3.

Question 2 [25 marks]
A cut in income tax is often proposed as a policy to stimulate an economy. Evaluate, with the use of an appropriate diagram(s), whether a cut in income tax will help a government to achieve its macroeconomic policy objectives.

Question 3 [25 marks]
Labour productivity varies significantly between countries. Evaluate, with the use of an appropriate diagram(s), whether an increase in labour productivity will benefit an economy.

## Section C: Essay

Answer Question 4 OR Question 5.

Question 4 [25 marks]
Many governments have used supply-side policies to address unemployment in recent years. Evaluate whether supply-side policies are the most effective way to reduce unemployment.

Question 5 [25 marks]
Central banks use interest rates as a key monetary policy tool to influence economic activity. Evaluate whether low interest rates are an effective way to stimulate economic growth.`,
  },
  // ── COMPONENT 02: Macroeconomics ─ Set B (Hard) ──
  {
    id: "ocr-c02-set-b",
    subject: "ocr",
    paper: "2",
    title: "Component 02 Macro — Set B (Hard)",
    description: "H460/02 Macroeconomics — Hard predicted paper: UK post-pandemic challenges, productivity puzzle, government debt, monetary policy, exchange rates.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/02) — Component 02: Macroeconomics — Predicted Paper (Hard)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions in Section A, **one** question in Section B and **one** question in Section C.

## Section A: Data Response

Read the stimulus material and answer all the parts of Question 1.

**The UK's post-pandemic economic challenges**

The United Kingdom's economy has faced a series of supply-side and demand-side shocks since the Covid-19 pandemic. In 2022, the UK's inflation rate reached 11.1% — a 41-year high — driven by rising energy prices, disrupted supply chains and tight labour markets. Although inflation fell back to around 4.0% during 2024, real wages had fallen for much of this period as nominal wage growth failed to keep pace with rising prices.

The Bank of England responded by raising the Bank Rate from 0.1% in December 2021 to 5.25% in August 2023 — its highest level in over 15 years. This contractionary monetary stance has sharpened the trade-off between the objectives of controlling inflation and supporting output growth. In 2024, UK real GDP grew by just 0.9% and the current account deficit remained around 3.3% of GDP.

A continuing concern is the UK's weak productivity growth — often described as the 'productivity puzzle'.

**Fig. 1 — Average annual labour productivity growth and real wage growth, 2019–2023 (% per year)**

| Country | Labour productivity growth (%) | Real wage growth (%) |
|---|---|---|
| United Kingdom | 0.4 | −0.8 |
| United States | 1.5 | 0.6 |
| Germany | 0.2 | −0.5 |
| France | 0.6 | 0.2 |
| Japan | 0.9 | 0.1 |
| South Korea | 2.1 | 1.8 |

The UK's fiscal position has also deteriorated. Government borrowing rose sharply during the pandemic, and public sector net debt reached 98% of GDP by 2024. The government's headline interest payments on debt more than doubled between 2021 and 2023, partly reflecting higher interest rates and the fact that about a quarter of UK government debt is index-linked.

**Table 1 — Government debt (% of GDP) and ten-year government bond yields (%), 2024**

| Country | Government debt (% of GDP) | 10-year bond yield (%) |
|---|---|---|
| United Kingdom | 98 | 4.2 |
| United States | 123 | 4.1 |
| Germany | 64 | 2.3 |
| Japan | 252 | 1.1 |
| Italy | 137 | 3.8 |
| France | 112 | 3.2 |

The UK's main trading partners include the European Union, the United States and China. Following Brexit, UK exporters to the EU have faced additional regulatory and customs costs. In 2024, the UK's export price index was 118.5 while its import price index was 125.0. Some economists argue that persistent supply-side weaknesses — low investment, skill shortages and regulatory friction — have reduced the UK's potential growth rate. Others highlight the role of demand management: reducing the budget deficit through tax rises and spending cuts may help control inflation but could tip the economy into recession.

Question 1a [2 marks]
Using information from the stimulus material, identify two factors that may have caused the rise in the UK's inflation rate in 2022.

Question 1b [1 marks]
Using information from the stimulus material, calculate to one decimal place the UK's terms of trade in 2024.

Question 1c [3 marks]
Explain whether the relationship shown in Fig. 1 between labour productivity growth and real wage growth is the expected one.

Question 1d [4 marks]
Using Table 1, explain the relationship between government debt (% of GDP) and 10-year government bond yields.

Question 1e [8 marks]
Using information from the stimulus material, evaluate whether the Bank of England's rise in interest rates is likely to reduce UK inflation without damaging economic growth.

Question 1f [12 marks]
Using information from the stimulus material, evaluate whether the UK government should prioritise reducing its budget deficit.

## Section B: Extended Response

Answer Question 2 OR Question 3.

Question 2 [25 marks]
In 2022, many developed economies including the United Kingdom experienced sharp appreciations in their currencies against some trading partners' currencies. Evaluate, with the use of an appropriate diagram(s), whether an appreciation of a country's currency will benefit the economy.

Question 3 [25 marks]
Cost-push and demand-pull inflation can have different effects on an economy. Evaluate, with the use of an appropriate diagram(s), whether cost-push inflation is more harmful than demand-pull inflation.

## Section C: Essay

Answer Question 4 OR Question 5.

Question 4 [25 marks]
Income inequality has widened in many developed economies over recent decades. Evaluate whether progressive taxation is the most effective way to reduce income inequality.

Question 5 [25 marks]
A number of European countries have chosen to adopt the euro as their national currency. Evaluate whether a country is likely to benefit from joining a monetary union such as the eurozone.`,
  },
  // ── COMPONENT 02: Macroeconomics ─ Set C (Advanced) ──
  {
    id: "ocr-c02-set-c",
    subject: "ocr",
    paper: "2",
    title: "Component 02 Macro — Set C (Advanced)",
    description: "H460/02 Macroeconomics — Advanced predicted paper: Argentina's macroeconomic instability, hyperinflation, IMF, dollarisation, quantitative tightening.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/02) — Component 02: Macroeconomics — Predicted Paper (Advanced)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions in Section A, **one** question in Section B and **one** question in Section C.

## Section A: Data Response

Read the stimulus material and answer all the parts of Question 1.

**Argentina's macroeconomic instability**

Argentina has a long history of macroeconomic instability. Between 2018 and 2023, the country experienced multiple currency crises, sovereign debt defaults and periods of extremely high inflation. Annual inflation exceeded 50% in 2021, rose above 100% in 2022 and reached 211% by the end of 2023 — one of the highest rates in the world. Over the same period, the Argentine peso depreciated from around 30 pesos per US dollar in early 2018 to over 800 pesos per US dollar by December 2023 (official rate).

High inflation and currency depreciation have significantly eroded household purchasing power. It is estimated that over 40% of Argentina's population were living below the national poverty line by 2023. The country's central bank raised its policy interest rate to 133% in October 2023 to combat inflation. Real interest rates — the policy rate adjusted for inflation — were, however, still deeply negative for most of the period.

Argentina has received multiple loan packages from the International Monetary Fund (IMF). In 2018, it received the largest single IMF loan in the Fund's history (US$57 billion). In 2022, the country agreed a refinancing programme with the IMF. Loans from the IMF typically come with conditions requiring fiscal consolidation, structural reform and the building up of foreign currency reserves.

**Fig. 1 — Average annual currency depreciation against the US dollar and average annual CPI inflation rate, 2019–2023 (%)**

| Country | Avg. currency depreciation (%/yr) | Avg. CPI inflation (%/yr) |
|---|---|---|
| Argentina | 74.2 | 94.7 |
| Turkey | 42.8 | 41.6 |
| Brazil | 8.2 | 7.1 |
| Mexico | 2.1 | 5.4 |
| Indonesia | 3.4 | 3.6 |
| India | 3.0 | 5.6 |

Argentina's export performance has been a source of foreign currency but is highly concentrated in primary commodities — principally soybeans, beef and maize — making the country vulnerable to global commodity price fluctuations and drought. In 2023, Argentina's export price index was 152.4 and its import price index was 168.0. Argentina has also imposed strict capital controls restricting access to foreign currency, creating a black-market exchange rate that trades at a substantial premium to the official rate.

**Table 1 — Real GDP growth rate and unemployment rate in six IMF programme countries, 2023**

| Country | Real GDP growth (%) | Unemployment rate (%) |
|---|---|---|
| Argentina | -1.6 | 7.3 |
| Pakistan | -0.2 | 8.5 |
| Sri Lanka | -2.3 | 4.7 |
| Ghana | 2.9 | 3.9 |
| Egypt | 3.8 | 7.1 |
| Kenya | 5.6 | 5.7 |

Debate continues within Argentina about the appropriate policy response. Some economists have argued for "dollarisation" — formally adopting the US dollar as legal tender — to impose external discipline on monetary policy. Others advocate structural reform of public expenditure, privatisation of loss-making state firms and removal of subsidies on energy and transport. Critics point out that fiscal austerity can further depress output, widen poverty and provoke political instability.

Question 1a [2 marks]
Using information from the stimulus material, identify two causes of Argentina's currency depreciation.

Question 1b [1 marks]
Using information from the stimulus material, calculate to one decimal place Argentina's real interest rate when its policy interest rate was 133% and inflation was 211%. (Use the approximation: real rate ≈ nominal rate − inflation rate.)

Question 1c [3 marks]
Explain whether the relationship shown in Fig. 1 between currency depreciation and inflation is the expected one.

Question 1d [4 marks]
Using Table 1, explain the relationship between real GDP growth and unemployment in IMF programme countries.

Question 1e [8 marks]
Using information from the stimulus material, evaluate whether a depreciation of the Argentine peso is likely to improve the country's current account on the balance of payments.

Question 1f [12 marks]
Using information from the stimulus material, evaluate whether IMF loans are likely to benefit developing economies such as Argentina.

## Section B: Extended Response

Answer Question 2 OR Question 3.

Question 2 [25 marks]
Following a prolonged period of low interest rates and large-scale asset purchases, several major central banks have embarked on quantitative tightening to reduce the size of their balance sheets. Evaluate, with the use of an appropriate diagram(s), whether quantitative tightening is an effective policy to reduce inflation.

Question 3 [25 marks]
Government debt as a percentage of GDP has risen to historically high levels in many advanced economies since 2008. Evaluate, with the use of an appropriate diagram(s), whether high levels of government debt necessarily harm an economy's long-run economic growth.

## Section C: Essay

Answer Question 4 OR Question 5.

Question 4 [25 marks]
Protectionist measures such as tariffs and quotas have been used increasingly by some major economies in recent years. Evaluate whether free trade benefits all countries that participate in it.

Question 5 [25 marks]
In pursuit of their macroeconomic objectives, central banks frequently face short-run trade-offs between inflation and unemployment. Evaluate whether central banks should always prioritise the control of inflation over the pursuit of low unemployment.`,
  },
  // ── COMPONENT 03: Themes ─ Set A (Moderate) ──
  {
    id: "ocr-c03-set-a",
    subject: "ocr",
    paper: "3",
    title: "Component 03 Themes — Set A (Moderate)",
    description: "H460/03 Themes — Moderate: 30 MCQs + UK rail industry, UK housing market & interest rates, teachers' pay extracts.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/03) — Component 03: Themes in Economics — Predicted Paper (Moderate)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions.

## Section A: Multiple Choice (30 marks)

Question 1 [1 marks]
Which of these is a factor of production?
- A. Goods
- B. Labour
- C. Money
- D. Services

Question 2 [1 marks]
The marginal propensity to consume (MPC) in an economy is 0.75. An injection of £200 billion enters the economy. What is the final increase in GDP?
- A. £150 billion
- B. £266 billion
- C. £600 billion
- D. £800 billion

Question 3 [1 marks]
Which of the following would be classified as a merit good?
- A. Cigarettes
- B. Education
- C. National defence
- D. Street lighting

Question 4 [1 marks]
Which of these is an example of expansionary fiscal policy?
- A. An increase in income tax rates
- B. An increase in interest rates
- C. A reduction in corporation tax rates
- D. A reduction in the money supply

Question 5 [1 marks]
A 10% increase in the price of Good X leads to a 4% fall in the quantity demanded. What is the price elasticity of demand (PED) for Good X?
- A. -2.5
- B. -0.4
- C. 0.4
- D. 2.5

Question 6 [1 marks]
Which of the following describes allocative efficiency?
- A. MC = AC at the lowest point of the AC curve
- B. MC = AR
- C. MC = MR
- D. P > MC

Question 7 [1 marks]
What is meant by economies of scope?
- A. Cost savings from producing larger volumes of a single good
- B. Cost savings from producing a wider range of related goods together
- C. Diseconomies arising from firm size
- D. The minimum efficient scale of production

Question 8 [1 marks]
Which of the following is a characteristic of an oligopoly market?
- A. A large number of small firms
- B. High entry barriers and interdependent firms
- C. Homogeneous goods and no advertising
- D. Perfect information available to all consumers

Question 9 [1 marks]
If the equilibrium wage in a competitive labour market is £12 per hour and the government imposes a minimum wage of £15 per hour, what is the most likely effect?
- A. A shortage of labour
- B. An excess supply of labour
- C. Higher demand for labour
- D. No change in the level of employment

Question 10 [1 marks]
A UK firm exports machinery worth £500,000 to the USA. The exchange rate is £1 = $1.25. How much revenue does the firm receive in US dollars?
- A. $400,000
- B. $500,000
- C. $625,000
- D. $750,000

Question 11 [1 marks]
A monopolist's profit-maximising level of output occurs where:
- A. AC = AR
- B. AR = MR
- C. MC = AR
- D. MC = MR

Question 12 [1 marks]
A worker is paid £15 per hour and produces 30 units per hour. If productivity rises to 40 units per hour, what is the new unit labour cost?
- A. £0.375
- B. £0.50
- C. £0.60
- D. £1.33

Question 13 [1 marks]
Which of the following would shift the supply of labour curve to the right?
- A. A decrease in the school leaving age
- B. A decrease in the working-age population
- C. A rise in the marginal product of labour
- D. An increase in trade union power

Question 14 [1 marks]
The Phillips curve shows a relationship between:
- A. Economic growth and inflation
- B. Government spending and tax revenue
- C. Unemployment and inflation
- D. Unemployment and GDP

Question 15 [1 marks]
If a country's currency appreciates sharply, what is the likely short-run effect on its current account balance (assuming demand for exports and imports is inelastic)?
- A. It will improve
- B. It will remain unchanged
- C. It will worsen
- D. It will become balanced

Question 16 [1 marks]
In a country, workers earning below $10,000 pay 0% tax, those earning $10,001–$50,000 pay 20% tax, and those earning above $50,000 pay 40% tax. This is an example of:
- A. A proportional tax
- B. A progressive tax
- C. A regressive tax
- D. An indirect tax

Question 17 [1 marks]
Which of the following policies is most likely to reduce income inequality?
- A. An increase in VAT on essential goods
- B. An increase in the personal income tax allowance
- C. A reduction in corporation tax
- D. A reduction in the top rate of income tax

Question 18 [1 marks]
A subsidy is imposed on a good with a price-inelastic demand. Which of these is most likely?
- A. Consumers receive most of the benefit
- B. Consumer surplus falls
- C. Producers receive most of the benefit
- D. There is no change in price

Question 19 [1 marks]
Which of the following is an injection into the circular flow of income?
- A. Government expenditure
- B. Imports
- C. Savings
- D. Taxation

Question 20 [1 marks]
Which of the following best describes the free-rider problem?
- A. Consumers demanding goods without understanding their true value
- B. Firms gaining market power without competing on price
- C. Goods that create negative externalities for third parties
- D. People benefiting from a good without paying for it

Question 21 [1 marks]
The diagram of a firm in perfect competition shows the firm making a loss in the short run. In the long run, what will happen?
- A. Firms will exit the market until normal profit is restored
- B. Firms will continue to make losses indefinitely
- C. New firms will enter the market
- D. Price will fall further

Question 22 [1 marks]
A firm engaged in first-degree price discrimination charges:
- A. A single uniform price to all consumers
- B. Different prices based on time of purchase
- C. Each consumer the maximum price they are willing to pay
- D. Lower prices to bulk buyers only

Question 23 [1 marks]
A country imposes a tariff on imported steel. Which group is most likely to benefit directly?
- A. Consumers of steel
- B. Domestic steel producers
- C. Foreign steel producers
- D. Importers of steel

Question 24 [1 marks]
Which of these is the most liquid form of money?
- A. Cash in a current account
- B. Government bonds
- C. Shares in a private company
- D. Time deposits with a 90-day notice period

Question 25 [1 marks]
A minimum price for alcohol is set above the equilibrium price. What is the most likely short-run impact?
- A. An excess supply of alcohol
- B. A decrease in producer surplus
- C. A shortage of alcohol
- D. An increase in consumer surplus

Question 26 [1 marks]
Which of the following is an example of an anti-competitive practice?
- A. Advertising a new product
- B. Investing in new technology
- C. Predatory pricing
- D. Training employees

Question 27 [1 marks]
An outward shift in a country's LRAS curve is most likely to be caused by:
- A. An increase in consumer confidence
- B. An increase in labour productivity
- C. An increase in wage rates
- D. A rise in the price of imported raw materials

Question 28 [1 marks]
Which of these is measured as part of the Human Development Index (HDI)?
- A. Gini coefficient
- B. Infant mortality rate
- C. Life expectancy at birth
- D. Unemployment rate

Question 29 [1 marks]
A Lorenz curve that lies closer to the line of equality indicates:
- A. A more equal distribution of income
- B. A more unequal distribution of income
- C. A country with higher GDP
- D. A country with lower GDP

Question 30 [1 marks]
Where on the current account of the balance of payments would interest received from overseas investments be recorded?
- A. Primary income
- B. Secondary income
- C. Trade in goods
- D. Trade in services

## Section B: Data Response

### Extract 1 — The UK Rail Industry

The UK rail network is one of the oldest in the world. In 1994 the industry was privatised; passenger services were split into regional franchises operated by private sector firms, while the infrastructure (tracks, signals and stations) has been managed by Network Rail, a public sector body, since 2002. Each passenger franchise operates as a regional monopoly, with consumers on most routes having no choice of operator.

Passenger numbers on the UK rail network rose from 735 million journeys in 1995 to over 1,700 million in 2019, before falling sharply during the pandemic. By 2022, numbers had partially recovered to around 1,380 million. Rail fares have risen faster than average wages for over a decade, and in 2023 the UK had some of the highest rail fares in Europe. The rail regulator, the Office of Rail and Road (ORR), caps regulated fare increases but has no direct control over unregulated fares, which make up around half of ticket sales.

In 2022/23, UK government spending on the rail network totalled £24.3 billion, a figure that can be compared with UK GDP of £2,275 billion in the same year. Train operating companies received government subsidies totalling £11.9 billion. Despite this, several franchises have collapsed back into public ownership in recent years, including the East Coast main line and Northern Rail. The Williams-Shapps Plan, announced in 2021, proposed a new public body, Great British Railways, to take strategic control of the network.

Critics argue that splitting the industry into many operating firms has led to a loss of economies of scale and inefficient duplication, while supporters of privatisation point to the rise in passenger numbers, investment in new rolling stock, and improvements in punctuality compared with the pre-1994 era. Customer satisfaction scores, however, have declined from 83% in 2013 to 76% in 2023.

**Fig. 1.1 — Selected indicators for the UK rail industry, 2013–2023**

| Year | Passenger journeys (millions) | Average fare index (2013=100) | Customer satisfaction (%) |
|---|---|---|---|
| 2013 | 1,594 | 100 | 83 |
| 2016 | 1,718 | 116 | 81 |
| 2019 | 1,739 | 128 | 79 |
| 2021 | 990 | 135 | 78 |
| 2023 | 1,384 | 148 | 76 |

Question 31 [2 marks]
Using the data in Extract 1, calculate UK government spending on the rail network as a proportion of UK GDP in 2022/23. Show your working.

Question 32 [3 marks]
Explain, using the information in Extract 1, one reason why customer satisfaction scores in the UK rail industry may have declined between 2013 and 2023.

Question 33 [15 marks]
Evaluate, using an appropriate diagram and the information in Extract 1, whether a natural monopoly such as the rail network should be owned and operated by the public sector.

### Extract 2 — UK Housing Market and Interest Rates

The UK housing market has long been a key driver of household wealth and consumer spending. Between 2020 and 2022, house prices rose by 22%, fuelled by historically low interest rates, a temporary cut in Stamp Duty, and a post-pandemic 'race for space' as more people worked from home. Housing demand was strong, but supply remained constrained — the UK built only 210,000 new homes in 2022/23, well below the government target of 300,000.

In response to rising inflation, which peaked at 11.1% in October 2022, the Bank of England's Monetary Policy Committee (MPC) raised the official bank rate from 0.1% in December 2021 to 5.25% by August 2023. For the roughly 1.6 million households due to remortgage in 2024, this has meant sharp increases in monthly repayments. Around 2.4 million mortgages are due to come off fixed rates before the end of 2026.

The housing market has cooled significantly. The Halifax House Price Index fell by 4.8% in the year to December 2023, the sharpest annual fall since 2011. New mortgage approvals fell by 33% between 2021 and 2023. The construction sector has also felt the impact: housebuilding starts fell by 44% in Q4 2023 compared with Q4 2022.

Some economists argue that higher interest rates are a blunt tool that punishes borrowers while doing little to address supply-side inflation pressures. Others argue that the tightening of monetary policy was essential to re-anchor inflation expectations and that the lagged effects of higher interest rates are necessary to return inflation to the 2% target.

**Fig. 2.1 — UK CPI annual inflation rate and Bank of England base rate (%)**

| Date | CPI inflation (%) | Bank rate (%) |
|---|---|---|
| December 2021 | 5.4 | 0.25 |
| June 2022 | 9.4 | 1.25 |
| October 2022 | 11.1 | 2.25 |
| June 2023 | 7.9 | 5.00 |
| December 2023 | 4.0 | 5.25 |

Question 34 [3 marks]
Using the data in Fig. 2.1, calculate the percentage point change in the Bank of England base rate between December 2021 and December 2023.

Question 35 [2 marks]
Using Fig. 2.1 and information in Extract 2, identify evidence that suggests higher interest rates may have been effective in reducing UK inflation.

Question 36 [15 marks]
Evaluate, using the information in Extract 2, whether the Bank of England's decision to raise the bank rate sharply between 2021 and 2023 was the best policy response to rising inflation.

### Extract 3 — Teachers' Pay and the Supply of Teachers

The teaching profession in England has faced a sustained recruitment and retention crisis. In 2022/23, the Department for Education missed its target for secondary school teacher recruitment by 50%, and the number of teachers leaving the profession within five years of qualifying rose to 32%. To qualify as a teacher in the UK, individuals must complete an undergraduate degree followed by a one-year teacher training course, after which they undertake a statutory induction period of one year.

The National Education Union (NEU) represents over 450,000 members and is the largest education trade union in Europe. In 2023 the NEU organised eight days of strike action in response to what it called a 'decade of real-terms pay cuts'. According to the Institute for Fiscal Studies (IFS), teacher pay in England fell by around 13% in real terms between 2010 and 2023. Most teachers' salaries are determined by the School Teachers' Review Body (STRB) and funded by government, making the government effectively a monopsony employer of teachers in state schools.

In 2023, the government accepted an STRB recommendation for a 6.5% pay rise, although headteachers warned that without additional funding, this would need to be funded from existing school budgets. The average salary for a classroom teacher in England was £41,500 in 2023 — below the average salary of £47,200 for graduates working in the private sector with 5–10 years of experience.

**Fig. 3.1 — Teacher recruitment (% of target met) and real-terms average teacher pay index (2010 = 100), England**

| Year | Recruitment target met (%) | Real-terms pay index (2010=100) |
|---|---|---|
| 2010 | 108 | 100 |
| 2015 | 94 | 94 |
| 2018 | 83 | 90 |
| 2020 | 102 | 89 |
| 2023 | 50 | 87 |

Question 37 [2 marks]
Using Fig. 3.1, compare the change in teacher recruitment and real-terms pay between 2010 and 2023.

Question 38 [8 marks]
Evaluate, using the information in Extract 3, whether teachers' pay is likely to rise significantly in the next few years.`,
  },
  // ── COMPONENT 03: Themes ─ Set B (Hard) ──
  {
    id: "ocr-c03-set-b",
    subject: "ocr",
    paper: "3",
    title: "Component 03 Themes — Set B (Hard)",
    description: "H460/03 Themes — Hard: 30 MCQs + UK supermarket sector, UK fiscal policy & government debt, gig economy & labour markets extracts.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/03) — Component 03: Themes in Economics — Predicted Paper (Hard)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions.

## Section A: Multiple Choice (30 marks)

Question 1 [1 marks]
Which of these correctly describes the concept of marginal utility?
- A. The additional satisfaction gained from consuming one more unit of a good
- B. The total satisfaction gained from consumption
- C. The cost of producing one additional unit of output
- D. The price a consumer is willing to pay for a good

Question 2 [1 marks]
An economy has a marginal propensity to consume of 0.6, a marginal propensity to tax of 0.2 and a marginal propensity to import of 0.1. What is the value of the multiplier?
- A. 1.43
- B. 1.54
- C. 2.00
- D. 2.50

Question 3 [1 marks]
In a Keynesian liquidity trap:
- A. Expansionary fiscal policy becomes ineffective
- B. Interest rates are very high and savings rates low
- C. Monetary policy becomes ineffective as households hold money rather than spend it
- D. The velocity of circulation rises sharply

Question 4 [1 marks]
Which of the following would reduce the natural rate of unemployment in an economy?
- A. An increase in out-of-work benefits
- B. An increase in structural unemployment
- C. An increase in trade union bargaining power
- D. Increased spending on labour market retraining programmes

Question 5 [1 marks]
A good has a YED of +2.3. The economy enters a recession and real incomes fall by 5%. What is the likely change in the quantity demanded of the good?
- A. A fall of 11.5%
- B. A fall of 2.3%
- C. A rise of 2.3%
- D. A rise of 11.5%

Question 6 [1 marks]
A firm in a kinked demand curve model experiences an increase in marginal cost from MC1 to MC2, but the new MC curve still passes through the vertical section of the MR curve. What happens to price and output?
- A. Both increase
- B. Both decrease
- C. Price falls, output increases
- D. Price and output remain unchanged

Question 7 [1 marks]
Which of the following is NOT a barrier to entry in a market?
- A. Economies of scale enjoyed by incumbents
- B. Patents held by existing firms
- C. Strong brand loyalty
- D. The existence of many substitute goods

Question 8 [1 marks]
Under the Cournot model of oligopoly, firms compete by choosing:
- A. Advertising budgets
- B. Output quantities simultaneously
- C. Prices simultaneously
- D. Whether to collude

Question 9 [1 marks]
A consumer's total utility from consuming 4 units of a good is 80 utils. Consuming a 5th unit reduces total utility to 78 utils. This suggests:
- A. Diminishing marginal utility but positive total utility
- B. Marginal utility is zero
- C. Negative marginal utility
- D. Rising marginal utility

Question 10 [1 marks]
A UK firm imports $960,000 of goods when the exchange rate is £1 = $1.60. The exchange rate then changes to £1 = $1.20. All else equal, what is the change in the sterling cost of these imports?
- A. Cost falls by £200,000
- B. Cost falls by £400,000
- C. Cost rises by £200,000
- D. Cost rises by £400,000

Question 11 [1 marks]
A monopolist's total revenue is maximised when:
- A. AC = MC
- B. MC = MR
- C. MR = 0
- D. Price elasticity of demand is zero

Question 12 [1 marks]
X-inefficiency is most likely to occur in:
- A. A contestable market
- B. A market characterised by low barriers to entry
- C. A monopoly protected by high barriers to entry
- D. Perfect competition

Question 13 [1 marks]
In a monopsony labour market, compared with a competitive labour market, the monopsonist will pay:
- A. A higher wage and employ more workers
- B. A higher wage and employ fewer workers
- C. A lower wage and employ fewer workers
- D. A lower wage and employ more workers

Question 14 [1 marks]
Using the Fisher equation MV = PY, if the money supply rises by 8%, velocity of circulation falls by 2% and real national income rises by 3%, what is the approximate rate of inflation?
- A. 3%
- B. 5%
- C. 7%
- D. 9%

Question 15 [1 marks]
Following a depreciation of the currency, the Marshall-Lerner condition states that the current account will improve if:
- A. The sum of the price elasticities of demand for exports and imports is greater than one
- B. The sum of the price elasticities of demand for exports and imports is less than one
- C. The sum of the price elasticities of supply for exports and imports is greater than zero
- D. The price elasticity of demand for exports alone is greater than one

Question 16 [1 marks]
A tax system where the average rate of tax falls as income rises is:
- A. Ad valorem
- B. Progressive
- C. Proportional
- D. Regressive

Question 17 [1 marks]
If country A has a Gini coefficient of 0.28 and country B has a Gini coefficient of 0.42, this suggests that:
- A. Country A has higher absolute poverty than country B
- B. Country A has higher GDP per capita than country B
- C. Country A has a more equal distribution of income than country B
- D. Country B has a more equal distribution of income than country A

Question 18 [1 marks]
A specific tax is imposed on a good with perfectly inelastic demand. Which of the following statements is correct?
- A. Consumers bear all of the tax burden
- B. Producers bear all of the tax burden
- C. The tax burden is shared equally
- D. There is a large deadweight loss

Question 19 [1 marks]
Which of the following best explains the paradox of thrift?
- A. An increase in saving by all households simultaneously reduces aggregate demand and national income
- B. Households save more when interest rates fall
- C. Increased saving leads to higher investment and growth in the long run
- D. Saving always equals investment in equilibrium

Question 20 [1 marks]
Adverse selection in the market for used cars occurs because:
- A. Buyers know more about cars than sellers, so sellers of good cars charge too little
- B. Buyers take more risks once they have purchased insurance
- C. Sellers of low-quality cars dominate the market as buyers cannot distinguish quality
- D. There is a free-rider problem

Question 21 [1 marks]
A firm in perfect competition is producing at the minimum of its average cost curve. This firm is:
- A. Allocatively efficient only
- B. Both productively and allocatively efficient
- C. Making supernormal profit
- D. Productively efficient only

Question 22 [1 marks]
A firm successfully engages in third-degree price discrimination. The market with the more inelastic PED will face:
- A. A higher price and a lower output proportion
- B. A higher price and a higher output proportion
- C. A lower price and a higher output proportion
- D. A lower price and a lower output proportion

Question 23 [1 marks]
Country X removes all tariffs on imports from country Y but maintains tariffs on imports from country Z. Previously, country X imported these goods from country Z. This is an example of:
- A. Absolute advantage
- B. Comparative advantage
- C. Trade creation
- D. Trade diversion

Question 24 [1 marks]
Which of these would increase the money supply in an economy via the money multiplier?
- A. An increase in the reserve ratio
- B. An increase in the demand for cash by households
- C. Quantitative tightening by the central bank
- D. The central bank purchasing government bonds from commercial banks

Question 25 [1 marks]
A price ceiling is imposed below the free-market equilibrium price. The long-run impact is likely to include:
- A. A fall in the number of firms supplying the market
- B. An increase in producer surplus
- C. Increased price stability
- D. Reduced deadweight loss

Question 26 [1 marks]
Hit-and-run competition is a feature of:
- A. A contestable market
- B. A monopoly
- C. A natural monopoly
- D. Perfect competition

Question 27 [1 marks]
The IMF forecasts that a country will experience stagflation. This is most consistent with:
- A. An inward shift of LRAS and an outward shift of AD
- B. An inward shift of SRAS and an inward shift of AD
- C. An outward shift of both AD and SRAS
- D. An outward shift of LRAS and an inward shift of AD

Question 28 [1 marks]
Which is a limitation of using GNI per capita to compare living standards between countries?
- A. It accounts for income distribution inequalities
- B. It accounts for the informal economy
- C. It does not account for differences in purchasing power between currencies
- D. It measures the value of net exports only

Question 29 [1 marks]
According to the Kuznets curve hypothesis, as a country develops from low to middle income:
- A. Income inequality first rises then falls
- B. Income inequality rises continuously
- C. Income inequality remains constant
- D. Income inequality falls continuously

Question 30 [1 marks]
A rise in the UK's current account deficit, with all other components of the balance of payments unchanged, would be matched by:
- A. A fall in financial account net inflows
- B. A fall in official reserves
- C. A rise in the financial account net inflows
- D. A rise in the capital account net outflows

## Section B: Data Response

### Extract 1 — The UK Supermarket Sector

The UK grocery market was worth approximately £225 billion in 2023. The four largest chains — Tesco, Sainsbury's, Asda and Morrisons — together hold around 65% of the market, down from 76% a decade ago. The entry of German discounters Aldi and Lidl, which together now hold over 18% of the market, has significantly increased competition in the sector. Tesco alone accounts for a 27.3% share, making it the largest supermarket chain in the UK.

In 2022 and 2023, food price inflation in the UK exceeded general CPI inflation, peaking at 19.2% in March 2023 — the highest level since 1977. The Competition and Markets Authority (CMA) launched an investigation in 2023 to examine whether the big supermarkets were using their market power to widen profit margins during the cost-of-living crisis. The investigation concluded in July 2023 that there was no clear evidence of profiteering, but did identify weak price competition for some essential products.

The largest supermarkets engage heavily in non-price competition through loyalty schemes (such as Tesco Clubcard and Sainsbury's Nectar), price-matching guarantees against Aldi and Lidl, and significant advertising expenditure — Tesco alone spent £78 million on advertising in 2022. Price wars have, at times, led to allegations of predatory pricing on branded goods. The Groceries Supply Code of Practice (GSCOP), overseen by the Groceries Code Adjudicator (GCA), regulates the relationship between supermarkets and their suppliers.

Tesco's operating profit was £2.63 billion in 2022/23, a margin of 3.8%. By comparison, Aldi UK reported an operating loss of £75.9 million in 2022, despite strong sales growth of 16%, as the firm absorbed higher input costs rather than passing them on to consumers.

**Fig. 1.1 — UK grocery market shares (%)**

| Firm | Market share 2013 (%) | Market share 2023 (%) |
|---|---|---|
| Tesco | 29.9 | 27.3 |
| Sainsbury's | 16.8 | 14.8 |
| Asda | 17.1 | 13.7 |
| Morrisons | 11.3 | 9.0 |
| Aldi | 4.1 | 10.1 |
| Lidl | 3.5 | 7.7 |
| Others | 17.3 | 17.4 |

Question 31 [2 marks]
Using the data in Fig. 1.1, calculate the three-firm concentration ratio for the UK grocery market in 2023.

Question 32 [3 marks]
Explain, using the information in Extract 1, one reason why the four largest UK supermarkets may engage in non-price competition rather than price competition.

Question 33 [15 marks]
Evaluate, using an appropriate diagram and the information in Extract 1, the likely consequences for consumers of the oligopolistic structure of the UK supermarket sector.

### Extract 2 — UK Fiscal Policy and Government Debt

The UK national debt reached £2,650 billion by the end of 2023 — equivalent to approximately 98% of GDP, the highest ratio since the early 1960s. The budget deficit averaged 5.2% of GDP between 2020 and 2023, reflecting the fiscal cost of COVID-19 support schemes (such as furlough, which cost £70 billion), the Energy Price Guarantee (which cost around £40 billion) and subsequent tax cuts announced in the autumn 2022 'mini-budget'.

The 'mini-budget' of September 2022, which included £45 billion of unfunded tax cuts, triggered a sharp rise in UK government bond yields. The yield on the 30-year gilt rose from 3.6% to over 5% in a matter of days. This forced the Bank of England to intervene with emergency bond purchases to protect pension funds and stabilise the market, and ultimately led to the resignation of the Chancellor and Prime Minister.

In 2023, debt interest payments cost the UK government £89 billion — more than the entire annual budget for education (£84 billion) and more than twice the defence budget (£52 billion). The rise in interest rates has made servicing the debt significantly more expensive: a 1 percentage point rise in gilt yields adds approximately £20 billion to annual debt servicing costs over time.

The Office for Budget Responsibility (OBR) warned in its 2023 Fiscal Risks Report that the UK's fiscal position is 'increasingly vulnerable'. The Chancellor's self-imposed fiscal rules require debt as a share of GDP to be falling in five years' time. Some economists argue that higher taxes or spending cuts are needed to stabilise the public finances, while others argue that higher growth — driven by investment in productivity-enhancing infrastructure — is the only sustainable route.

**Fig. 2.1 — UK budget deficit, national debt and debt interest payments, 2019–2023**

| Year | Budget deficit (% of GDP) | National debt (% of GDP) | Debt interest (£ billion) |
|---|---|---|---|
| 2019 | 2.3 | 82 | 48 |
| 2020 | 14.4 | 96 | 39 |
| 2021 | 7.9 | 95 | 66 |
| 2022 | 4.5 | 97 | 111 |
| 2023 | 4.4 | 98 | 89 |

Question 34 [3 marks]
Using the data in Fig. 2.1, compare the change in the UK budget deficit with the change in debt interest payments between 2019 and 2023.

Question 35 [2 marks]
Using the information in Extract 2, identify two potential economic consequences of rising UK government bond yields.

Question 36 [15 marks]
Evaluate, using the information in Extract 2, the view that the UK government should raise taxes or cut spending to reduce the national debt.

### Extract 3 — The Gig Economy and Labour Markets

The UK gig economy has grown rapidly in the past decade. By 2023, an estimated 4.4 million workers — around 13% of the working-age population — had earned money through gig platforms in the preceding year, up from 3.6 million in 2019. Platforms such as Deliveroo, Uber and Amazon Flex classify most of their workers as 'independent contractors' rather than employees, meaning they do not receive sick pay, paid holiday, or employer pension contributions.

Supporters argue that the gig economy provides flexibility for workers and lower prices for consumers. Critics argue that it shifts risk from firms onto workers and contributes to in-work poverty. Research by the University of Oxford in 2023 found that the median hourly earnings of UK gig workers were £11.80 per hour before costs, but only £8.20 per hour after costs such as vehicle maintenance and fuel — below the National Living Wage of £10.42 at the time.

In 2021, the Supreme Court ruled in Uber BV v Aslam that Uber drivers should be classified as 'workers' (an intermediate category) and therefore entitled to minimum wage and paid holiday. However, subsequent rulings have left the classification of workers on many other platforms unclear. The Low Pay Commission estimates that around 40% of gig workers earn below the National Living Wage when all hours waiting for jobs are included.

Trade union membership among gig workers remains low at around 5%, compared with 22% of UK workers overall. The Independent Workers' Union of Great Britain (IWGB) has attempted to organise gig workers but faces challenges because workers are geographically dispersed and often work for multiple platforms simultaneously. Meanwhile, the supply of labour to gig platforms remains high, partly because entry requires few qualifications — typically a smartphone, a vehicle, and a right to work in the UK.

**Fig. 3.1 — Share of workers by type and median hourly earnings (£), UK 2023**

| Worker type | Share of workers (%) | Median hourly earnings (£) |
|---|---|---|
| Full-time employee | 64 | 15.80 |
| Part-time employee | 22 | 11.90 |
| Self-employed (non-gig) | 9 | 14.60 |
| Gig worker (after costs) | 5 | 8.20 |

Question 37 [2 marks]
Using Fig. 3.1, compare the median hourly earnings of gig workers and full-time employees in the UK in 2023.

Question 38 [8 marks]
Evaluate, using the information in Extract 3, whether government intervention is necessary to protect the wages and working conditions of gig economy workers.`,
  },
  // ── COMPONENT 03: Themes ─ Set C (Advanced) ──
  {
    id: "ocr-c03-set-c",
    subject: "ocr",
    paper: "3",
    title: "Component 03 Themes — Set C (Advanced)",
    description: "H460/03 Themes — Advanced: 30 high-difficulty MCQs + UK banking 'too big to fail', QE & central bank independence, global inequality extracts.",
    totalMarks: 80,
    content: `# OCR A-Level Economics (H460/03) — Component 03: Themes in Economics — Predicted Paper (Advanced)

**Time: 2 hours | Total: 80 marks**

Answer **all** the questions.

## Section A: Multiple Choice (30 marks)

Question 1 [1 marks]
According to the theory of rational expectations, anticipated expansionary monetary policy will:
- A. Have no effect on real output, only on the price level
- B. Permanently reduce unemployment below its natural rate
- C. Raise both output and inflation in the long run
- D. Reduce the natural rate of unemployment

Question 2 [1 marks]
In a closed economy with no government, the equilibrium level of national income is where:
- A. AD = AS at full employment
- B. Consumption equals investment
- C. Injections equal withdrawals (S = I)
- D. The marginal propensity to consume equals 1

Question 3 [1 marks]
Which theory of the firm assumes that managers maximise their own utility, subject to a minimum profit constraint imposed by shareholders?
- A. Baumol's revenue maximisation model
- B. Cyert and March's behavioural theory
- C. Williamson's managerial discretion model
- D. Neoclassical profit maximisation

Question 4 [1 marks]
A negative production externality generates a marginal external cost (MEC) of £6 per unit. The marginal private cost (MPC) is £10 and marginal private benefit (MPB) equals price. If the market price is £14, the socially optimal Pigouvian tax per unit is:
- A. £4
- B. £6
- C. £10
- D. £14

Question 5 [1 marks]
A good has a cross-elasticity of demand of -1.8 with respect to a related good. Which of the following is most likely true about the two goods?
- A. They are close complements and consumers tend to buy them together
- B. They are close substitutes with highly elastic demand
- C. They are independent goods with only a weak relationship
- D. They are weak complements with inelastic demand

Question 6 [1 marks]
In game theory, a Nash equilibrium is a set of strategies where:
- A. All firms maximise their joint profits
- B. Each firm cooperates with the others
- C. No firm can improve its outcome by unilaterally changing its strategy
- D. Output is maximised across the industry

Question 7 [1 marks]
A firm operating on the declining section of its long-run average cost curve is said to be experiencing:
- A. Constant returns to scale
- B. Diminishing marginal returns
- C. Diseconomies of scale
- D. Economies of scale

Question 8 [1 marks]
Under contestable market theory, the credible threat of entry:
- A. Forces incumbent firms to price at minimum AC earning normal profit
- B. Has no effect on incumbent firms as they already maximise profit
- C. Leads to incumbents charging monopoly prices to pre-empt rivals
- D. Only matters in markets with many firms

Question 9 [1 marks]
Behavioural economics suggests that consumers often exhibit 'present bias'. This means that consumers:
- A. Are systematically rational in their intertemporal choices
- B. Place disproportionate weight on immediate rewards compared with future rewards
- C. Use cognitive shortcuts only in unfamiliar situations
- D. Value future benefits equally with immediate ones

Question 10 [1 marks]
A country's real exchange rate appreciates by 4%, while its nominal exchange rate appreciates by 6%. This implies that:
- A. Domestic inflation was 2 percentage points higher than foreign inflation
- B. Domestic inflation was 2 percentage points lower than foreign inflation
- C. Domestic inflation was 10 percentage points higher than foreign inflation
- D. The two economies had identical inflation rates

Question 11 [1 marks]
A natural monopoly operating at socially optimal output with price set at marginal cost will:
- A. Earn normal profit
- B. Earn supernormal profit
- C. Make a loss requiring a subsidy
- D. Produce at minimum average cost

Question 12 [1 marks]
Okun's law describes the empirical relationship between:
- A. Changes in inflation and changes in the output gap
- B. Changes in real wages and unemployment
- C. Changes in unemployment and changes in real GDP
- D. Nominal and real interest rates

Question 13 [1 marks]
A monopsonist in a labour market pays a wage equal to W1 and employs Q1 workers, where the marginal cost of labour (MCL) equals the marginal revenue product (MRP). Imposition of a legal minimum wage set between W1 and the competitive equilibrium wage will:
- A. Decrease both wages and employment
- B. Decrease employment but increase wages
- C. Have no effect on employment or wages
- D. Increase both wages and employment

Question 14 [1 marks]
Given the quantity equation MV = PY, if the central bank targets a stable price level, and velocity of circulation is falling at 1% per year while real GDP grows at 2% per year, what growth rate of the money supply is required?
- A. 1%
- B. 2%
- C. 3%
- D. 5%

Question 15 [1 marks]
According to the Marshall-Lerner condition and the J-curve effect, following a currency depreciation:
- A. The current account will always improve immediately
- B. The current account may worsen in the short run before improving in the long run, if PEDx + PEDm > 1
- C. The current account will worsen permanently if PEDs are price inelastic
- D. There will be no effect on the current account if capital flows dominate

Question 16 [1 marks]
A windfall tax on supernormal profits in the oil industry is most likely to:
- A. Be fully passed on to consumers through higher prices
- B. Be progressive in terms of its incidence on shareholders and be difficult to pass on in the short run
- C. Cause a significant decline in investment in the short run, reducing supply
- D. Reduce government tax revenue overall

Question 17 [1 marks]
The Lorenz curve for a country shifts outward (away from the line of perfect equality). Which of the following Gini coefficient changes is consistent with this shift?
- A. Gini falls from 0.40 to 0.30
- B. Gini remains constant at 0.35
- C. Gini rises from 0.25 to 0.45
- D. Gini rises from 0.45 to 0.40

Question 18 [1 marks]
A per-unit subsidy is introduced in a market where the supply curve is price-elastic and the demand curve is price-inelastic. The incidence of the subsidy will fall:
- A. Equally on consumers and producers
- B. Entirely on consumers
- C. Entirely on producers
- D. Mainly on consumers

Question 19 [1 marks]
The hysteresis effect in labour markets suggests that:
- A. A high cyclical unemployment rate may permanently raise the natural rate of unemployment
- B. Cyclical unemployment disappears automatically once demand recovers
- C. Real wage rigidity is the main cause of unemployment
- D. Structural unemployment declines during recessions

Question 20 [1 marks]
A government introduces a scheme in which drivers who buy 'black box' telematics devices receive lower car insurance premiums. This is most likely an attempt to address:
- A. Adverse selection in the insurance market
- B. Diminishing returns in insurance production
- C. Monopoly power of insurers
- D. Public good characteristics of insurance

Question 21 [1 marks]
Dynamic efficiency is most associated with:
- A. Minimising average total costs in the short run
- B. Producing where MC = AR
- C. Reallocating resources to address externalities
- D. Reinvestment of supernormal profits into innovation and product development

Question 22 [1 marks]
Under third-degree price discrimination across two markets, profit is maximised where:
- A. MR1 = MR2 = MC
- B. MR is maximised in each market separately
- C. Price is equalised in each market
- D. Total revenue is maximised in each market

Question 23 [1 marks]
The Heckscher-Ohlin model of international trade predicts that countries will:
- A. Always export high-technology goods
- B. Export goods that use their relatively abundant factor of production intensively
- C. Import goods they can produce at absolute advantage
- D. Trade only with countries at similar stages of development

Question 24 [1 marks]
Quantitative easing (QE) primarily operates through which transmission mechanism?
- A. Direct reductions in the official bank rate
- B. Lowering long-term interest rates and raising asset prices, stimulating wealth effects and investment
- C. Printing physical currency to spend into the economy
- D. Targeted wage subsidies to households

Question 25 [1 marks]
Time inconsistency problems in monetary policy arise when:
- A. Central banks face a conflict between their short-run incentives and their long-run credibility
- B. Fiscal and monetary policy are not coordinated
- C. Interest rate changes have lagged effects on inflation
- D. The money supply grows faster than real GDP

Question 26 [1 marks]
A sunk cost:
- A. Can be recovered on exit from the market and therefore does not deter entry
- B. Cannot be recovered on exit and therefore represents a barrier to entry in contestable market theory
- C. Is equivalent to a fixed cost in the short run
- D. Only exists in monopolistic markets

Question 27 [1 marks]
A negative output gap combined with demand-pull inflationary pressure is most consistent with:
- A. An inward shift of LRAS combined with modest growth in AD
- B. An outward shift of AD beyond LRAS
- C. An outward shift of LRAS and SRAS
- D. Simultaneous outward shifts of both LRAS and AD of equal magnitude

Question 28 [1 marks]
The Human Development Index (HDI) has been criticised because it:
- A. Excludes differences in income between countries
- B. Includes literacy rates and not years of schooling
- C. Includes life expectancy at birth only for children under 5
- D. Weights each of its three components equally, which may not reflect their relative importance to development

Question 29 [1 marks]
The resource curse refers to:
- A. A correlation between a country's abundance of natural resources and its tendency to have slower economic growth and weaker institutions
- B. The exhaustion of non-renewable resources in developing economies
- C. The tendency of developed countries to consume excessive natural resources
- D. The tragedy of the commons in common pool resources

Question 30 [1 marks]
The 'trilemma' (or 'impossible trinity') in international finance states that a country cannot simultaneously have:
- A. Free trade, capital mobility and domestic production
- B. High growth, low inflation and full employment
- C. High savings, high investment and trade surpluses
- D. Independent monetary policy, a fixed exchange rate, and free capital movement

## Section B: Data Response

### Extract 1 — The UK Banking Sector and 'Too Big to Fail'

The UK banking sector is highly concentrated. The 'big four' clearing banks — HSBC, Barclays, Lloyds Banking Group and NatWest — hold around 75% of personal current accounts and over 85% of business lending to small and medium-sized enterprises. During the 2008 global financial crisis, the UK government was forced to nationalise or provide emergency support to several major banks. The total cost of the bailout was £137 billion in cash support, although the National Audit Office has estimated the ultimate long-term cost to the taxpayer at between £27 and £33 billion.

The doctrine of 'too big to fail' — that the failure of a large bank would cause systemic damage to the wider economy — creates a moral hazard problem. Banks that believe they will be bailed out in a crisis have an incentive to take on excessive risk. The implicit public subsidy from the government guarantee was estimated by the Bank of England at £30 billion per year during the peak of the crisis, although it has fallen since.

Following the crisis, the Vickers Commission (2011) recommended the ring-fencing of retail banking from investment banking, which was implemented by 2019. The capital adequacy requirements set by the Basel III framework require banks to hold Common Equity Tier 1 (CET1) capital equal to at least 4.5% of risk-weighted assets, with additional buffers for systemically important institutions. UK banks now hold CET1 ratios averaging around 14%, compared with 3–4% before the crisis.

Despite these reforms, concerns remain. The collapse of Silicon Valley Bank in March 2023 and the forced sale of Credit Suisse to UBS the same month showed that banking crises can still propagate rapidly. In response to the collapse of SVB UK (bought by HSBC for £1), the Bank of England has proposed easing certain rules for smaller banks, which critics argue could recreate the conditions for future crises. The UK's Financial Services Compensation Scheme (FSCS) guarantees deposits up to £85,000 per person per institution.

**Fig. 1.1 — Market share of UK personal current accounts and profits before tax (£ billion), 2023**

| Bank | PCA market share (%) | Profit before tax 2023 (£ billion) |
|---|---|---|
| Lloyds Banking Group | 23 | 7.5 |
| NatWest Group | 17 | 6.2 |
| Barclays | 13 | 6.6 |
| HSBC (UK) | 12 | 30.3 |
| Santander UK | 10 | 2.0 |
| Challenger banks & others | 25 | n/a |

Question 31 [2 marks]
Using the data in Fig. 1.1, calculate the five-firm concentration ratio for the UK personal current account market in 2023.

Question 32 [3 marks]
Explain, using the information in Extract 1, how the doctrine of 'too big to fail' may generate moral hazard in the UK banking sector.

Question 33 [15 marks]
Evaluate, using an appropriate diagram and the information in Extract 1, whether tighter regulation is the most effective way to address market failures in the UK banking sector.

### Extract 2 — Quantitative Easing and Central Bank Independence

Since its introduction in March 2009, the Bank of England has conducted extensive quantitative easing (QE) programmes, expanding its stock of asset purchases from zero to a peak of £895 billion by the end of 2021 — approximately 40% of UK GDP. In late 2022, the Bank began quantitative tightening (QT), allowing maturing bonds to run off its balance sheet and actively selling others back into the market.

The transmission mechanisms of QE include lowering long-term interest rates, raising asset prices (stimulating a wealth effect on consumption), increasing bank liquidity, and signalling a commitment to future loose monetary policy. Research by the Bank of England suggests that the £450 billion of QE carried out between 2009 and 2012 raised UK GDP by approximately 2.5% and added 1.5 percentage points to CPI inflation.

However, QE has been criticised for its distributional consequences. By raising asset prices, it has disproportionately benefited wealthier households who own more financial assets and property. The Resolution Foundation estimated in 2022 that QE contributed around £1.2 trillion to UK household wealth, with the top 10% of households capturing approximately 40% of this gain. The Treasury indemnity for the Bank of England's Asset Purchase Facility is also estimated to cost up to £150 billion over the coming decade, as the Bank sells bonds at a loss.

The Bank of England has had operational independence from the Treasury since 1997. Supporters argue that independence has helped anchor inflation expectations and given monetary policy greater credibility. Critics, however, argue that QE has blurred the line between monetary and fiscal policy, and that the scale of central bank intervention raises questions about democratic accountability. In 2022, the House of Lords Economic Affairs Committee described QE as 'a pre-existing condition' of financial market fragility, making future rises in interest rates more politically and economically costly.

**Fig. 2.1 — Bank of England asset purchases (£ billion), bank rate (%) and CPI inflation (%), 2009–2023**

| Year | Asset purchases (£ billion) | Bank rate (%) | CPI inflation (%) |
|---|---|---|---|
| 2009 | 200 | 0.50 | 2.2 |
| 2012 | 375 | 0.50 | 2.8 |
| 2016 | 435 | 0.25 | 0.7 |
| 2020 | 745 | 0.10 | 0.9 |
| 2021 | 895 | 0.25 | 5.4 |
| 2023 | 760 | 5.25 | 4.0 |

Question 34 [3 marks]
Using the data in Fig. 2.1, calculate the percentage change in the Bank of England's asset purchases between 2009 and 2021.

Question 35 [2 marks]
Using Extract 2 and Fig. 2.1, identify evidence which suggests that quantitative easing (QE) was effective in stimulating the UK economy between 2009 and 2021.

Question 36 [15 marks]
Evaluate, using the information in Extract 2, whether the benefits of quantitative easing (QE) have outweighed its costs for the UK economy.

### Extract 3 — Global Inequality and the Challenge of Development

In 2023, the World Bank reported that global extreme poverty — living on less than $2.15 per day at purchasing power parity — stood at 8.4%, up from 8.0% in 2019. This was the first rise in decades, driven by the pandemic and global food and energy price shocks. At the same time, the wealth of the world's billionaires increased by 34% in real terms between 2020 and 2023, according to Forbes.

Sub-Saharan Africa remains home to around 60% of the world's extreme poor. The region's GDP per capita was $1,720 in 2023, compared with a world average of $13,920. Child mortality in the region stood at 72 deaths per 1,000 live births in 2022, compared with a developed-country average of 4 per 1,000. However, Sub-Saharan Africa has made substantial gains in recent years: mean years of schooling have risen from 4.4 years in 2000 to 6.0 years in 2022.

The International Monetary Fund (IMF) warns that developing countries now face a 'debt-distress decade'. Around 60% of low-income countries are in or at high risk of debt distress. Debt servicing now consumes more government revenue than health and education combined in 25 developing countries. Rising US interest rates and a strong US dollar have compounded the problem, as much of this debt is denominated in dollars.

Remittances from migrant workers to low- and middle-income countries reached $669 billion in 2023 — larger than total foreign direct investment (FDI) to these countries. However, some economists argue that the true cost of remittances is high: the global average transaction fee is 6.3% of the amount sent, well above the UN Sustainable Development Goal target of 3%. Others point to 'brain drain' — the emigration of skilled workers — as a major obstacle to development.

**Fig. 3.1 — Selected development indicators by region, 2023**

| Region | GDP per capita (USD PPP) | HDI | Extreme poverty rate (%) |
|---|---|---|---|
| Sub-Saharan Africa | 4,210 | 0.547 | 35.0 |
| South Asia | 7,820 | 0.641 | 10.8 |
| East Asia & Pacific | 19,580 | 0.748 | 1.2 |
| Latin America & Caribbean | 17,920 | 0.754 | 4.3 |
| Advanced economies | 56,360 | 0.896 | <0.5 |

Question 37 [2 marks]
Using Fig. 3.1, compare development in Sub-Saharan Africa with that of advanced economies in 2023.

Question 38 [8 marks]
Evaluate, using the information in Extract 3, the most effective strategies for reducing extreme poverty in Sub-Saharan Africa.`,
  },
];
