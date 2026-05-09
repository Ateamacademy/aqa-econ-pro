import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * AQA GCSE Economics (8136) · predicted papers, synced verbatim from the
 * official-style mock PDFs in /public/aqa-gcse-mocks/.
 *
 * Set mapping (display label is applied by PredictedPapers.tsx):
 *   - Set A  =  Moderate   (paper-1-moderate.pdf  / paper-2-moderate.pdf)
 *   - Set B  =  Hard       (paper-1-hard.pdf      / paper-2-hard.pdf)
 *   - Set C  =  Advanced   (paper-1-advanced.pdf  / paper-2-advanced.pdf)
 *
 * AQA GCSE Economics 8136 has TWO papers only (8136/1 and 8136/2). There is
 * no Paper 3 · do NOT add one.
 */
export const gcsePredictedPapers: PredictedPaper[] = [
  /* ──────────────────────────────────────────────────────────────────────
   * Paper 1 · How Markets Work (8136/1) · 80 marks · 1h 45m
   * ────────────────────────────────────────────────────────────────────── */

  {
    id: "gcse-p1-a",
    subject: "aqa-gcse" as any,
    paper: "1",
    title: "Paper 1 · Set A",
    description: "How Markets Work. Moderate difficulty · synced verbatim from the official-style mock (8136/1-M).",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136/1) · Paper 1: How Markets Work · Predicted Paper Set A (Moderate)

**Time allowed: 1 hour 45 minutes | Total: 80 marks**

You will need no other materials. You may use a calculator.

## Section A

Answer **all** questions in the spaces provided. For multiple-choice questions, only **one** answer per question is allowed.

**01** The fundamental economic problem arises because [1 mark]
- A all countries trade with each other.
- B governments must collect taxes.
- C resources are scarce but wants are unlimited.
- D some firms make very high profits.

**02** Which of the following is an example of the factor of production **capital**? [1 mark]
- A A skilled engineer
- B A delivery van used by a bakery
- C A natural forest
- D An entrepreneur's business idea

**03** A student chooses to study A-levels rather than take an apprenticeship that would pay £18 000 per year. The opportunity cost of this decision is [1 mark]
- A the cost of textbooks for A-levels.
- B the £18 000 income given up.
- C the time spent doing homework.
- D the satisfaction of passing exams.

**04** Which of the following is most likely to be a benefit of specialisation for **workers**? [1 mark]
- A Increased boredom from repetitive tasks
- B Higher wages due to developed skills
- C Less need for training
- D A greater variety of tasks each day

**05** **Table 1** shows the value of output in selected industries of an economy in year Y.

**Table 1**
| Industry | Value of output (£ bn) |
|----------|-----------------------|
| Farming | 14.2 |
| Construction | 48.6 |
| Car manufacturing | 55.1 |
| Retail | 72.3 |
| Finance | 88.9 |

Using **Table 1**, identify the correct statement. In year Y [1 mark]
- A the primary sector had an output of £62.8 bn.
- B the secondary sector was the most valuable economic sector.
- C the tertiary sector had an output of £161.2 bn.
- D the tertiary sector was less valuable than the secondary sector.

**06** **Table 2** shows the weekly pay of two occupations.

**Table 2**
| Occupation | Weekly pay (£) |
|------------|---------------|
| Solicitor | 900 |
| Cleaner | 450 |

Calculate the ratio of a solicitor's weekly pay to a cleaner's weekly pay from **Table 2**. [1 mark]
- A 0.50 : 1
- B 1.50 : 1
- C 2.00 : 1
- D 4.50 : 1

**07** Identify which of the following is an example of a firm acting in an **ethical** manner. [1 mark]
- A The firm pays its workers less than the legal minimum wage.
- B The firm sources its raw materials from sustainable suppliers.
- C The firm disposes of waste chemicals in a local river.
- D The firm uses misleading advertising to increase sales.

**08** Goods X and Y are substitutes. The price of good X increases. What will happen in the market for good Y? [1 mark]
- A Demand decreases
- B Demand increases
- C Supply decreases
- D Supply increases

**09** Which of the following firms is most likely to operate in a **competitive** market? [1 mark]

| Firm | Ease of entry | Number of firms in industry | Product differentiation |
|------|---------------|----------------------------|------------------------|
| A | Low | Low | High |
| B | Low | High | Low |
| C | High | High | Low |
| D | High | Low | High |

**10** The price elasticity of demand for bread is –0.5. The price of bread increases by 10%. What is the change in quantity demanded as a result? [1 mark]
- A –5%
- B –20%
- C +5%
- D +20%

**11** State **two** functions of money. [2 marks]

**12** Explain **one** way a bakery could increase its profit. [2 marks]

**13** Explain why a stock exchange is an example of a market. [2 marks]

**14.1** Rosie's Bakery has total fixed costs of £1 200 per week, average variable cost per loaf of £0.80, sells loaves for £2.30 each, and produced 1 800 loaves last week. Calculate the total profit earned. [2 marks]

**14.2** Explain **one** way the bakery could increase its profit. [2 marks]

**15 Figure 1 · Rising wages in the UK hospitality sector**

In 2024, many UK hospitality businesses such as pubs, cafés and restaurants were affected by a significant rise in the legal minimum wage. This increase led to concerns among employers about the impact upon prices, employment and the survival of smaller businesses.

| Year | National Living Wage (£/hr) |
|------|----------------------------|
| 2022 | 9.50 |
| 2023 | 10.42 |
| 2024 | 11.44 |

Analyse the possible impact of rising wages such as those shown in **Figure 1** upon UK hospitality businesses. [6 marks]

**16** State **two** features of a market operating under perfect competition. [2 marks]

**17** Explain **one** possible reason why doctors tend to earn more than supermarket cashiers. [2 marks]

**18** Explain **one** possible reason why the demand for table salt is likely to be price **inelastic**. [2 marks]

**19.1** **Table 3** shows data relating to the workforce of Rosie's Bakery, which is one of several bakeries in a town centre.

**Table 3**
| Number of workers | Loaves baked per day |
|-------------------|---------------------|
| 5 | 178 |

Using **Table 3**, calculate the daily productivity of the workforce of Rosie's Bakery. Give your answer to the nearest whole number. [2 marks]

Loaves per day = ____

**19.2** Explain **one** benefit of increased productivity to a business such as Rosie's Bakery. [2 marks]

**20** Draw and label demand and supply curves on the graph below from the following table of information. Clearly identify the equilibrium price and quantity. [3 marks]

| Price (£) | Quantity demanded (units) | Quantity supplied (units) |
|-----------|--------------------------|--------------------------|
| 2 | 16 | 4 |
| 4 | 12 | 8 |
| 6 | 8 | 12 |
| 8 | 4 | 16 |

**21 Figure 2 · Harry's Honey**

Harry's Honey is a small business that produces and sells jars of honey. Since Harry started the business, it has increased in size. He has employed more labour, bought more hives and acquired specialist bottling machinery. This has helped the business to become more efficient. However, Harry has noticed that as output has risen, it has become harder to keep track of what each employee is doing and some mistakes have appeared. Harry has worked out his total costs of production at different levels of output, as shown in **Table 4**.

**Table 4 · Output and cost data for Harry's Honey**
| Output of honey (jars) | Total costs (£) |
|-----------------------|-----------------|
| 500 | 4 000 |
| 1 000 | 7 000 |
| 1 500 | 9 750 |
| 2 000 | 14 000 |

Using **Figure 2** and **Table 4**, assess whether the benefits of growth for a business such as Harry's Honey exceed the costs. [9 marks]

## Section B

Answer **all** questions in the spaces provided.

### Item A · The UK coffee shop market

The UK coffee shop market has grown rapidly over the past two decades. There are now more than 27 000 coffee shops in the UK, employing around 210 000 workers. A small number of large chains, including Costa Coffee, Starbucks and Caffè Nero, together account for more than half of all branded outlets.

Independent coffee shops (those that are not part of a large chain) compete with these chains. They tend to offer a more personal service and locally-sourced products, but face higher average costs per cup than their larger rivals. Between 2018 and 2023, the average price of a takeaway cappuccino in a UK chain rose by around 35%. **Figure 3** shows the UK coffee shop price index from 2015 to 2023.

Economists say that the UK coffee shop market is an example of an imperfectly competitive market, where the actions of a few large firms can affect prices. Rising prices have led consumers to switch to cheaper alternatives such as making coffee at home.

**Figure 3 · UK coffee shop price index 2015 to 2023 (2015 = 100)**
| Year | Price Index |
|------|-------------|
| 2015 | 100 |
| 2016 | 103 |
| 2017 | 105 |
| 2018 | 108 |
| 2019 | 110 |
| 2020 | 112 |
| 2021 | 118 |
| 2022 | 128 |
| 2023 | 134 |

### Item B · Possible government actions in the coffee shop market

The UK government has considered ways to promote more competition in the coffee shop market and to reduce the cost of coffee to consumers. One option would be to impose a tax on the largest coffee chains, using the revenue to support independent shops. This could make independent shops more competitive.

Alternatively, the government could reduce business rates (a tax on commercial property) for smaller independent shops, or run advertising campaigns encouraging consumers to support local businesses. Others argue that no action is needed, because the market already offers plenty of choice and consumers can easily make coffee at home or switch to other hot drinks.

Critics of government intervention point out that taxing large chains may simply lead to higher prices for consumers, as the chains pass the tax on. Subsidising smaller shops may create an opportunity cost for the government, meaning that money is not available for other important areas such as the NHS or schools.

**22** Define the term '**supply**'. [2 marks]

**23** Using **Figure 3**, calculate the percentage change in the UK coffee shop price index between 2017 and 2023. Give your answer to the nearest whole %. [3 marks]

Answer = ____

**24** Analyse the possible **positive** externalities that may result from a growing number of coffee shops in a local area. [6 marks]

**25** Explain **two** possible disadvantages of the UK coffee shop market being dominated by a few large chains. [6 marks]

**26** The UK government may use several methods to reduce the market power of large coffee chains. Do you think the UK government should impose an extra tax on large coffee chains in the UK? Use **Items A** and **B** and your own economic knowledge to justify your view. [15 marks]

END OF QUESTIONS`,
  },

  {
    id: "gcse-p1-b",
    subject: "aqa-gcse" as any,
    paper: "1",
    title: "Paper 1 · Set B",
    description: "How Markets Work. Hard difficulty · synced verbatim from the official-style mock (8136/1-H).",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136/1) · Paper 1: How Markets Work · Predicted Paper Set B (Hard)

**Time allowed: 1 hour 45 minutes | Total: 80 marks**

You will need no other materials. You may use a calculator.

## Section A

Answer **all** questions in the spaces provided. For multiple-choice questions, only **one** answer per question is allowed.

**01** Which of the following best describes the main purpose of an economic system? [1 mark]
- A To redistribute income between households.
- B To allocate scarce resources to meet needs and wants.
- C To maximise exports and minimise imports.
- D To guarantee full employment at all times.

**02** A farmer decides to take a second job as a part-time teacher in the local school. Which factor of production has changed in the school? [1 mark]
- A Capital
- B Enterprise
- C Labour
- D Land

**03** A government spends £60 million building a new motorway instead of renovating schools. The opportunity cost of this decision is [1 mark]
- A the £60 million spent on the motorway.
- B the additional tax revenue raised from road users.
- C the benefits given up from not renovating the schools.
- D the reduction in traffic congestion on old roads.

**04** Which of the following is most likely to be a **disadvantage** of specialisation for a country? [1 mark]
- A Reduced average costs of production
- B Increased output per worker
- C Greater dependence on international trade
- D Wider variety of goods available to consumers

**05** **Table 1** shows the share of total employment by sector in two countries in year X.

**Table 1**
| Sector | Country P (%) | Country Q (%) |
|--------|--------------|---------------|
| Primary | 45 | 2 |
| Secondary | 32 | 18 |
| Tertiary | 23 | 80 |

Using **Table 1**, which of the following statements is correct? [1 mark]
- A Country P is most likely to be a highly developed economy.
- B Country Q is most likely to be a less developed economy.
- C Country P is most likely to be a less developed economy.
- D Both countries are at a similar stage of development.

**06** In year X, a worker's gross annual income was £32 000. Their total deductions were £8 400. What was the worker's net income in year X? [1 mark]
- A £8 400
- B £23 600
- C £24 000
- D £40 400

**07** Identify which of the following is an example of a firm acting **against** the moral and ethical interests of its customers. [1 mark]
- A The firm labels its products clearly so consumers can compare them.
- B The firm offers a full refund if a product is faulty.
- C The firm hides important safety information from buyers.
- D The firm publishes the full list of ingredients in its food.

**08** Goods X and Y are complements. The price of good X decreases. What will happen in the market for good Y? [1 mark]
- A Demand decreases
- B Demand increases
- C Supply decreases
- D Supply increases

**09** Which of the following firms is most likely to be operating in a market of **monopolistic competition**? [1 mark]

| Firm | Ease of entry | Number of firms in industry | Product differentiation |
|------|---------------|----------------------------|------------------------|
| A | Low | Low | Low |
| B | High | High | Low |
| C | High | High | High |
| D | Low | Low | High |

**10** The price elasticity of demand for a particular brand of smartphone is –2.0. The price of this smartphone falls by 15%. What is the change in quantity demanded as a result? [1 mark]
- A –30%
- B –7.5%
- C +7.5%
- D +30%

**11** State **two** possible differences between gross pay and net pay. [2 marks]

**12** Explain **one** impact of an increase in the number of firms in a market on the prices charged to consumers. [2 marks]

**13** Explain why a stock exchange is an example of a market. [2 marks]

**14.1** The following data relate to a small clothing firm that has produced and sold 4 200 T-shirts:
- Total fixed costs: £5 460
- Average variable cost per T-shirt: £3.20
- Selling price per T-shirt: £7.50

Calculate the total profit earned by the firm from selling 4 200 T-shirts. [2 marks]

**14.2** Explain **one** way the clothing firm could try to increase its profit **without** increasing the selling price. [2 marks]

**15 Figure 1 · Global oil prices**

In 2023, global oil prices began to fall significantly after a period of high prices caused by international conflict and supply disruption. This led to concern about the impact of these price falls upon a wide range of markets, including airlines, road haulage and plastics manufacturing.

| Period | Price of crude oil (USD per barrel) |
|--------|------------------------------------|
| Early 2022 | 120 |
| Late 2022 | 95 |
| Mid 2023 | 75 |

Analyse the possible impact of the fall in global oil prices shown in **Figure 1** upon other markets such as airlines and road haulage. [6 marks]

**16** State **two** features of a market operating under **monopolistic competition**. [2 marks]

**17** Explain **one** possible reason why professional footballers in the Premier League tend to earn much higher salaries than nurses in the NHS. [2 marks]

**18** Explain **one** possible reason why the demand for petrol in the short run is likely to be price **inelastic**. [2 marks]

**19.1** **Table 3** shows data relating to the workforce of Priya's Pottery, a ceramics workshop.

**Table 3**
| Number of workers | Vases produced per week |
|-------------------|------------------------|
| 8 | 260 |

Using **Table 3**, calculate the weekly productivity of the workforce of Priya's Pottery. Give your answer to the nearest whole number. [2 marks]

Vases per worker per week = ____

**19.2** Explain **one** benefit of increased productivity to a business such as Priya's Pottery. [2 marks]

**20** Draw and label demand and supply curves on the graph below from the following table of information. Clearly identify the equilibrium price and quantity. [3 marks]

| Price (£) | Quantity demanded (units) | Quantity supplied (units) |
|-----------|--------------------------|--------------------------|
| 10 | 30 | 6 |
| 20 | 24 | 12 |
| 30 | 18 | 18 |
| 40 | 12 | 24 |
| 50 | 6 | 30 |

**21 Figure 2 · Mia's Mechanics**

Mia's Mechanics is a car repair and servicing firm. Since Mia opened her first garage in 2012, the business has grown rapidly. She now employs 44 mechanics across three sites, has purchased specialist diagnostic equipment and has negotiated bulk discounts with parts suppliers. However, Mia has noticed that communication between sites has become slower and more expensive, and some mechanics report that decisions now take weeks rather than days. Mia has worked out her total costs of production at different levels of output, as shown in **Table 4**.

**Table 4 · Output and cost data for Mia's Mechanics**
| Cars serviced per month | Total costs (£) |
|------------------------|-----------------|
| 200 | 30 000 |
| 400 | 52 000 |
| 600 | 66 000 |
| 800 | 104 000 |

Using **Figure 2** and **Table 4**, assess whether the benefits of growth for a business such as Mia's Mechanics exceed the costs. [9 marks]

## Section B

Answer **all** questions in the spaces provided.

### Item A · The UK electric vehicle market

In 2023, just under 315 000 new fully electric vehicles (EVs) were registered in the UK, accounting for around 16.5% of all new cars sold. This was a rapid increase on the 1.6% share that EVs had in 2018. However, critics argue that UK EV adoption still lags behind many European neighbours, partly because the price of a new EV remains significantly higher than the price of an equivalent petrol vehicle.

The UK government has set a target to ban the sale of new petrol and diesel cars from 2035. Meeting this target will require substantial investment in public charging infrastructure. In 2023, there were around 53 000 public charging points in the UK, but the Climate Change Committee estimates that at least 300 000 will be needed by 2030.

The price elasticity of demand for new EVs in the UK is estimated at –1.8, indicating that demand is highly sensitive to changes in price. **Figure 3** shows the UK EV market share of new car sales from 2018 to 2023. Economists argue that the transition away from petrol cars involves significant positive externalities but also significant costs that are not always covered by the private market.

**Figure 3 · UK electric vehicle share of new car sales, 2018–2023 (%)**
| Year | EV Share (%) |
|------|--------------|
| 2018 | ~2 |
| 2019 | ~3 |
| 2020 | ~7 |
| 2021 | ~12 |
| 2022 | ~17 |
| 2023 | ~17 |

### Item B · Possible methods to support the EV market in the UK

The UK government is considering several ways to accelerate the switch to electric vehicles. These include offering financial subsidies to consumers who buy a new EV, subsidising the installation of public and home charging points, and imposing higher taxes on new petrol and diesel vehicles.

Supporters of intervention argue that a faster switch to EVs would reduce air pollution in urban areas, cut carbon emissions, lower the UK's dependence on imported oil and create jobs in battery manufacturing. They also argue that without government support, the high purchase price of EVs means that many low-income households will be priced out of the market.

Critics of EV subsidies argue that they mostly benefit wealthier households who can afford a new car in the first place. Building batteries requires large amounts of lithium and cobalt, the mining of which can create serious environmental and human-rights problems in producing countries. Subsidies also carry a significant opportunity cost for the government and may not actually speed up the transition if charging infrastructure remains limited.

**22** Define the term '**market failure**'. [2 marks]

**23** Using **Figure 3**, calculate the percentage change in the UK electric vehicle share of new car sales between **2018** and **2022**. Give your answer to the nearest whole %. [3 marks]

Answer = ____

**24** Analyse the possible **positive** externalities that may result from an increase in the number of electric vehicles on UK roads. [6 marks]

**25** Explain **two** possible disadvantages of the UK remaining heavily reliant on petrol and diesel vehicles. [6 marks]

**26** The UK government may use several methods to increase the uptake of electric vehicles. Do you think the UK government should subsidise the purchase of new electric vehicles in the UK? Use **Items A** and **B** and your own economic knowledge to justify your view. [15 marks]

END OF QUESTIONS`,
  },

  {
    id: "gcse-p1-c",
    subject: "aqa-gcse" as any,
    paper: "1",
    title: "Paper 1 · Set C",
    description: "How Markets Work. Advanced difficulty · synced verbatim from the official-style mock (8136/1-A).",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136/1) · Paper 1: How Markets Work · Predicted Paper Set C (Advanced)

**Time allowed: 1 hour 45 minutes | Total: 80 marks**

You will need no other materials. You may use a calculator.

## Section A

Answer **all** questions in the spaces provided. For multiple-choice questions, only **one** answer per question is allowed.

**01** The study of **economics** primarily concerns [1 mark]
- A how governments set tax rates.
- B how scarce resources are allocated to satisfy unlimited wants.
- C how firms maximise short-run profit.
- D how prices are set by the government.

**02** An inventor uses their savings to set up a software company, hire programmers and lease office space. Which factor of production is most directly represented by the inventor's decision to set up the company and bear the risk? [1 mark]
- A Capital
- B Enterprise
- C Labour
- D Land

**03** A worker can earn £24 000 in a full-time job or £11 000 working part-time while completing a university degree. If the university degree costs £9 250 per year, the **opportunity cost** of studying full-time for one year is approximately [1 mark]
- A £9 250.
- B £11 000.
- C £24 000.
- D £33 250.

**04** Which of the following is most likely to be a **disadvantage** of specialisation for **workers**? [1 mark]
- A Lower wages due to a lack of skills
- B Reduced output per worker
- C Boredom and dissatisfaction from repetitive tasks
- D Higher costs of production for firms

**05** **Table 1** shows the value of output in selected industries in an economy in year X.

**Table 1**
| Industry | Value of output (£ bn) |
|----------|-----------------------|
| Agriculture | 12.4 |
| Mining | 8.6 |
| Manufacturing | 54.2 |
| Construction | 28.9 |
| Retail | 46.8 |
| Professional services | 73.7 |

Using **Table 1**, what is the value of output in the **secondary** sector in year X? [1 mark]
- A £21.0 bn
- B £54.2 bn
- C £83.1 bn
- D £120.5 bn

**06** A worker's gross monthly pay is £2 800. Deductions include £420 income tax and £224 National Insurance. What is the worker's net pay as a percentage of their gross pay, to the nearest whole %? [1 mark]
- A 15%
- B 23%
- C 69%
- D 77%

**07** Which of the following is most likely to describe a firm that is acting in **both** a profit-seeking **and** ethically responsible manner? [1 mark]
- A The firm lowers its costs by paying workers below the minimum wage.
- B The firm invests in more efficient machinery that also reduces pollution.
- C The firm uses international tax loopholes to reduce its tax bill.
- D The firm engages in misleading advertising to boost sales.

**08** Goods X and Y are strong complements. The price of good X **rises**. Which of the following is most likely to happen in the market for good Y? [1 mark]
- A The equilibrium price and quantity of Y both rise.
- B The equilibrium price of Y falls and the equilibrium quantity of Y rises.
- C The equilibrium price and quantity of Y both fall.
- D The equilibrium price of Y rises and the equilibrium quantity of Y falls.

**09** Which combination of features most accurately describes an **oligopolistic** market? [1 mark]

| Firm | Market share of top firms | Barriers to entry | Use of non-price competition |
|------|--------------------------|-------------------|-----------------------------|
| A | Low | Low | Low |
| B | Low | High | High |
| C | High | Low | Low |
| D | High | High | High |

**10** A cinema has a price elasticity of demand of –0.8 for its tickets. The cinema increases ticket prices by 20%. What will happen to the cinema's total revenue from ticket sales? [1 mark]
- A Total revenue will fall by 16%.
- B Total revenue will rise by approximately 4%.
- C Total revenue will stay the same.
- D Total revenue will fall by 25%.

**11** State **two** forms of **non-price** competition that firms may use. [2 marks]

**12** Explain **one** possible impact of a highly competitive market on the **efficiency** of firms. [2 marks]

**13** Explain why the foreign exchange (**forex**) market is an example of a market. [2 marks]

**14.1** The following data relate to a software firm that sold 1 200 annual subscriptions last year:
- Total revenue: £108 000
- Total fixed costs: £28 000
- Average variable cost per subscription: £24

Calculate the firm's **profit margin** (profit as a percentage of total revenue) to the nearest whole %. [2 marks]

Profit margin = ____

**14.2** Explain **one** way the software firm could increase its **profit margin**. [2 marks]

**15 Figure 1 · Rising input costs in UK manufacturing**

UK manufacturing firms have faced significant rises in input costs in recent years, including raw materials and industrial energy. These cost pressures have raised concerns about competitiveness and the viability of energy-intensive industries.

| Input | Index (2019 = 100) |
|-------|--------------------|
| Industrial electricity | 86 |
| Industrial natural gas | 141 |

Analyse the possible impact of rising input costs such as those shown in **Figure 1** upon UK manufacturing firms and the markets in which they operate. [6 marks]

**16** State **two** possible **barriers to entry** that firms in an industry might face. [2 marks]

**17** Explain **one** possible reason why investment bankers in the City of London tend to earn substantially higher salaries than primary-school teachers. [2 marks]

**18** Explain **one** possible reason why the demand for a life-saving prescription drug such as insulin is likely to be price **inelastic**. [2 marks]

**19.1** **Table 3** shows data relating to the workforce of Ansel's Analytics, a data-analysis firm that faces strong competition.

**Table 3**
| Number of analysts | Reports completed per month |
|-------------------|----------------------------|
| 14 | 203 |

Using **Table 3**, calculate the monthly productivity of an analyst at Ansel's Analytics. Give your answer to **one decimal place**. [2 marks]

Reports per analyst per month = ____

**19.2** Explain **one** benefit of increased labour productivity to a business such as Ansel's Analytics. [2 marks]

**20** Draw and label demand and supply curves on the graph below from the following table of information. Clearly identify the equilibrium price and quantity. [3 marks]

| Price (£) | Quantity demanded (units) | Quantity supplied (units) |
|-----------|--------------------------|--------------------------|
| 10 | 50 | 10 |
| 20 | 40 | 20 |
| 30 | 30 | 30 |
| 40 | 20 | 40 |
| 50 | 10 | 50 |

**21 Figure 2 · TechCo Solutions**

TechCo Solutions is a UK-based cloud software business founded in 2015. The business has grown rapidly, expanding from 8 engineers at a single office to 260 staff across four international offices. TechCo has invested heavily in specialist servers, automated testing systems and a dedicated research-and-development team. Senior managers now report, however, that meetings have become longer and less productive, decision-making has slowed, and it is increasingly difficult to maintain a consistent company culture across the four sites. TechCo's total costs at different levels of output are shown in **Table 4**.

**Table 4 · Output and cost data for TechCo Solutions**
| Software licences sold per year | Total costs (£ 000s) |
|--------------------------------|---------------------|
| 5 000 | 1 250 |
| 10 000 | 2 100 |
| 20 000 | 3 600 |
| 30 000 | 6 900 |
| 40 000 | 11 200 |

Using **Figure 2** and **Table 4**, assess whether the benefits of growth for a business such as TechCo Solutions continue to exceed the costs as it becomes very large. [9 marks]

## Section B

Answer **all** questions in the spaces provided.

### Item A · The UK video streaming market

The UK video streaming market has been transformed over the past decade. In 2013, only around 4% of UK households subscribed to a video streaming service. By 2023, that figure had risen to more than 68% of UK households. A small number of large global firms · including Netflix, Amazon Prime Video and Disney+ · now account for a large majority of all paid subscriptions. Smaller providers struggle to compete against the budgets of these large firms for original content.

Between 2020 and 2023, the major streaming platforms increased their monthly subscription prices several times. The average price of a standard Netflix subscription in the UK rose from £8.99 to £10.99 over this period. In 2023, Netflix, Disney+ and Amazon all began introducing new "ad-supported" tiers and restrictions on password sharing. **Figure 3** shows UK household streaming subscription penetration from 2015 to 2023.

Economists argue that this market displays the classic features of an oligopoly: a small number of large firms, high barriers to entry (particularly the cost of producing original content), high levels of non-price competition through branding and exclusive shows, and the ability of firms to raise prices without losing many customers. Some economists argue that this market represents a case of market failure, because the dominant firms can earn significant producer surplus at the expense of consumers.

**Figure 3 · UK household video-streaming subscription rate, 2015–2023 (%)**
| Year | Subscription Rate (%) |
|------|----------------------|
| 2015 | ~13 |
| 2016 | ~19 |
| 2017 | ~27 |
| 2018 | ~37 |
| 2019 | ~48 |
| 2020 | ~59 |
| 2021 | ~64 |
| 2022 | ~67 |
| 2023 | ~69 |

### Item B · Possible methods of regulating the UK streaming market

Concerns about the market power of the major streaming firms have led to a debate about whether the UK government should intervene. Options under discussion include: capping annual price increases; breaking up the largest firms; imposing quotas to ensure a minimum percentage of British-made content; supporting new UK-based streaming platforms through subsidies or tax breaks; and requiring streaming firms to contribute directly to the financing of UK public-service broadcasters such as the BBC and Channel 4.

Supporters of intervention argue that without regulation, consumers will continue to face rising prices and a narrowing of choice, particularly as UK content production becomes increasingly dependent on the priorities of a small number of US-owned companies. They point to the large producer surplus enjoyed by the dominant firms as evidence of market failure.

Critics argue that the streaming market is still highly dynamic and that regulation risks deterring investment in new UK content. They argue that consumer power remains strong, because subscriptions can easily be cancelled and alternative services are available. Subsidies for smaller UK platforms would create an opportunity cost for the government, diverting resources away from areas such as the NHS, schools or defence. They also warn that price caps could reduce the quality of content produced.

**22** Define the term '**oligopoly**'. [2 marks]

**23** Using **Figure 3**, calculate the percentage change in the UK household video-streaming subscription rate between **2015** and **2023**. Give your answer to the nearest whole %. [3 marks]

Answer = ____

**24** Analyse the possible **positive** externalities that may result from the widespread availability of affordable video-streaming services. [6 marks]

**25** Explain **two** possible disadvantages, for consumers, of the UK video-streaming market being dominated by a small number of large firms. [6 marks]

**26** The UK government may use several methods to reduce the market power of large streaming firms. Do you think the UK government should actively regulate the UK streaming market · for example, by capping prices, imposing UK content quotas and subsidising smaller UK-based platforms? Use **Items A** and **B** and your own economic knowledge to justify your view. [15 marks]

END OF QUESTIONS`,
  },

  /* ──────────────────────────────────────────────────────────────────────
   * Paper 2 · How the Economy Works (8136/2) · 80 marks · 1h 45m
   * ────────────────────────────────────────────────────────────────────── */

  {
    id: "gcse-p2-a",
    subject: "aqa-gcse" as any,
    paper: "2",
    title: "Paper 2 · Set A",
    description: "How the Economy Works. Moderate difficulty · synced verbatim from the official-style mock (8136/2-M).",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136/2) · Paper 2: How the Economy Works · Predicted Paper Set A (Moderate)

**Time allowed: 1 hour 45 minutes | Total: 80 marks**

You will need no other materials. You may use a calculator.

## Section A

Answer **all** questions in the spaces provided. For multiple-choice questions, only **one** answer per question is allowed.

**01** Which of the following is the most likely effect of a decrease in interest rates? [1 mark]
- A Decreased consumer spending
- B Decreased investment
- C Increased borrowing
- D Increased saving

**02** Which of the following is an example of a direct tax? [1 mark]
- A Council tax
- B Fuel duty
- C Income tax
- D Value-added tax (VAT)

**03** Which of the following best describes progressive taxation? [1 mark]
- A All households pay the same amount of tax
- B Richer households pay a higher proportion of their income in tax
- C Richer households pay a lower proportion of their income in tax
- D Tax rates stay the same as income rises

**04** Which of the following is most likely to cause cost-push inflation? [1 mark]
- A A decrease in labour costs
- B A decrease in raw material prices
- C An increase in consumer spending
- D An increase in wages across the economy

**05** Which of the following is an objective of the UK government? [1 mark]
- A Achieving low and stable inflation
- B Increasing income inequality
- C Maximising the budget deficit
- D Reducing exports

**06** 'Money can be used to buy goods and services now and in the future.' Which function of money does this statement most closely relate to? [1 mark]
- A Means of deferred payment
- B Medium of exchange
- C Store of value
- D Unit of account

**07** Which of the following is most likely to cause a fall in the value of the pound against the euro? [1 mark]
- A Higher UK interest rates
- B Increased UK exports to the Eurozone
- C Increased UK imports from the Eurozone
- D Reduced UK demand for euros

**08** An individual deposits £4 000 into a savings account with an annual interest rate of 3%. How much interest will they earn in one year? [1 mark]
- A £60
- B £120
- C £150
- D £400

**09** Which of the following is most likely to be classified as structural unemployment? [1 mark]
- A A builder who is between jobs for two weeks
- B A coal miner made redundant when pits close permanently
- C A ski instructor unemployed in the summer
- D A worker made redundant during a recession

**10** Which of the following pairs of changes would be expansionary fiscal policy? [1 mark]

| | Tax rates | Government spending |
|---|-----------|--------------------|
| A | Decrease | Decrease |
| B | Decrease | Increase |
| C | Increase | Decrease |
| D | Increase | Increase |

**11** State **two** examples of direct taxes used in the UK. [2 marks]

**12** Explain what is meant by progressive taxation. [2 marks]

**13** Explain **one** function of money. [2 marks]

**14 Table 1** shows the Consumer Price Index (CPI) for an economy.

**Table 1**
| Date | CPI |
|------|-----|
| January 2022 | 100.0 |
| December 2022 | 109.2 |

**14.1** Using **Table 1**, calculate the annual inflation rate at December 2022 to one decimal place. [2 marks]

Answer ____ %

**14.2** Explain **one** problem caused by high inflation for consumers. [2 marks]

**15 Figure 1 · The Bank of England and interest rates**

The Bank of England is responsible for setting interest rates in the UK through its Monetary Policy Committee (MPC). The MPC meets regularly to decide the Bank Rate, which influences the cost of borrowing and the reward for saving in the UK economy.

In recent years, the Bank of England has used interest rate changes to respond to rising inflation. Higher interest rates can reduce consumer spending and borrowing, helping to slow the rate of inflation. However, there are other effects on the economy that need to be considered.

Using **Figure 1**, analyse how an increase in interest rates by the Bank of England can affect the UK economy. [6 marks]

**16** State **two** supply-side policies that could be used by the UK government. [2 marks]

**17** Explain **one** benefit of economic growth for a country. [2 marks]

**18** Explain **one** role of a commercial bank. [2 marks]

**19 Table 2** shows unemployment data for an economy.

**Table 2**
| Year | Number unemployed (millions) |
|------|------------------------------|
| 2022 | 1.35 |
| 2023 | 1.42 |

**19.1** Using **Table 2**, calculate the percentage change in unemployment between 2022 and 2023 to one decimal place. [2 marks]

Answer ____ %

**19.2** Explain **one** cost of unemployment for an individual. [2 marks]

**20 Figure 2** shows the US dollar (\\$)/British pound (£) exchange rate.

**Figure 2 · US dollar (\\$)/British pound (£) exchange rate**

(Vertical axis: Dollars (\\$) per pound (£); Horizontal axis: Quantity of pounds (£))

On **Figure 2**, draw and label the effects on the exchange rate of increased UK exports to the United States. [3 marks]

**21 Figure 3 · UK unemployment**

Keeping unemployment low is one of the main objectives of the UK government. Unemployment has varied considerably over recent decades, reaching highs of over 10% in the 1980s and 1990s, and falling to around 4% in recent years before the COVID-19 pandemic.

When unemployment rises, the government often takes action to reduce it, such as increasing government spending or cutting taxes. However, these policies can have negative effects, including higher inflation or larger budget deficits. Some economists argue that a small amount of unemployment is natural and cannot be avoided.

Using **Figure 3**, assess whether the UK government should always aim for the lowest possible level of unemployment as an objective for the UK economy. [9 marks]

## Section B

Answer **all** questions in the spaces provided.

### Item A · UK government taxation and spending

Taxation is an important source of revenue for the UK government. The UK government uses taxes to fund public services such as the NHS, education and defence. There are different types of taxes, including direct taxes like income tax and indirect taxes like VAT.

Data for UK government tax revenues in 2022–23 is shown in **Table 3**.

**Table 3 · UK tax revenues 2022–23**
| | £ billion |
|---|-----------|
| Income tax | 249 |
| National Insurance contributions | 178 |
| VAT | 160 |
| Corporation tax | 85 |

Source: HMRC

Some economists argue that the UK government should rely more heavily on direct taxes, as these can be made progressive to reduce inequality. Other economists believe that indirect taxes are better, as they can influence consumer behaviour and discourage harmful consumption. Government spending is also used to achieve economic objectives such as low unemployment and economic growth.

### Item B · Globalisation and UK trade

Globalisation has led to increased trade between countries around the world. The UK is an open economy, meaning it trades extensively with other countries. UK consumers benefit from a wider range of goods at lower prices, while UK producers gain access to larger export markets.

However, globalisation also brings challenges. Some UK industries have declined due to cheaper competition from abroad, leading to job losses in certain regions. Concerns about the environmental impact of increased global trade have also grown in recent years.

**Figure 4** shows UK imports of goods and services between 2000 and 2021 (£ billions).

**22** Define the term 'direct tax'. [2 marks]

**23** Using **Table 3** in **Item A**, calculate the percentage of total tax revenue (from the four sources shown) that comes from income tax. Give your answer to one decimal place. [3 marks]

**24** Using **Item A**, explain **two** ways the UK government could use taxation to achieve its economic objectives. [6 marks]

**25** Using **Item B**, analyse the possible consequences of increased globalisation for UK consumers. [6 marks]

**26** Using **Item A** and **Item B** and your own economic knowledge, discuss whether the UK government should use taxation as the main policy to reduce income inequality. Justify your answer. [15 marks]

END OF QUESTIONS`,
  },

  {
    id: "gcse-p2-b",
    subject: "aqa-gcse" as any,
    paper: "2",
    title: "Paper 2 · Set B",
    description: "How the Economy Works. Hard difficulty · synced verbatim from the official-style mock (8136/2-H).",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136/2) · Paper 2: How the Economy Works · Predicted Paper Set B (Hard)

**Time allowed: 1 hour 45 minutes | Total: 80 marks**

You will need no other materials. You may use a calculator.

## Section A

Answer **all** questions in the spaces provided. For multiple-choice questions, only **one** answer per question is allowed.

**01** Which of the following is most likely to occur following a significant rise in the Bank Rate? [1 mark]
- A An appreciation of the pound
- B Increased consumer borrowing
- C Increased demand-pull inflation
- D Increased investment by firms

**02** Which of the following is an example of a supply-side policy aimed at reducing structural unemployment? [1 mark]
- A Cutting income tax rates
- B Increasing government borrowing
- C Investment in retraining programmes
- D Raising interest rates

**03** A country's current account deficit is most likely to be worsened by which of the following? [1 mark]
- A An appreciation of the domestic currency
- B A fall in domestic inflation
- C Improved productivity in export industries
- D Reduced import tariffs on foreign goods

**04** Which of the following is most likely to cause demand-pull inflation? [1 mark]
- A A decrease in business confidence
- B A fall in government spending
- C A rise in energy prices worldwide
- D A significant cut in income tax rates

**05** Which of the following best describes the Laffer curve concept? [1 mark]
- A Higher tax rates always lead to higher tax revenue
- B Tax revenue falls continuously as tax rates rise
- C Tax revenue may fall if tax rates become too high
- D Tax revenue is independent of tax rates

**06** A government runs a budget surplus of £20 billion. Which of the following is most likely to be true? [1 mark]
- A Government spending exceeds tax revenue by £20 billion
- B National debt will increase by £20 billion
- C Tax revenue exceeds government spending by £20 billion
- D The economy is definitely in recession

**07** Which of the following is the most likely effect of an appreciation of the pound sterling? [1 mark]
- A A fall in the price of UK imports
- B A rise in UK export competitiveness
- C Higher UK inflation
- D Higher UK unemployment in export industries

**08** Real GDP in a country grew from £1 600 billion to £1 664 billion over one year. What was the rate of economic growth? [1 mark]
- A 3.0%
- B 4.0%
- C 4.2%
- D 6.4%

**09** Which of the following is most likely to be a consequence of increased globalisation for a developed economy? [1 mark]
- A Increased inflation across all sectors
- B Loss of low-skilled manufacturing jobs
- C Reduced access to foreign markets
- D Reduced competition for domestic firms

**10** Which of the following pairs of changes represents contractionary monetary policy? [1 mark]

| | Interest rates | Money supply |
|---|---------------|--------------|
| A | Decrease | Decrease |
| B | Decrease | Increase |
| C | Increase | Decrease |
| D | Increase | Increase |

**11** State **two** functions of money. [2 marks]

**12** Explain what is meant by a progressive tax. [2 marks]

**13** Explain **one** role of commercial banks in the UK financial system. [2 marks]

**14 Table 1** shows real GDP data for an economy.

**Table 1**
| Year | Real GDP (£ billions) |
|------|----------------------|
| 2021 | 2 080 |
| 2023 | 2 163 |

**14.1** Using **Table 1**, calculate the total percentage change in real GDP between 2021 and 2023 to one decimal place. [2 marks]

Answer ____ %

**14.2** Explain **one** possible cause of economic growth. [2 marks]

**15 Figure 1 · Fiscal policy and inflation**

Fiscal policy involves changes in government spending and taxation. The UK government can use fiscal policy to influence aggregate demand in the economy. During periods of high inflation, the government may choose to reduce aggregate demand by cutting spending or raising taxes. This is known as contractionary fiscal policy.

However, contractionary fiscal policy can have conflicting effects on other economic objectives. Cutting government spending on public services may reduce the quality of healthcare or education. Raising taxes reduces disposable income and can cause unemployment to rise. Policymakers must therefore weigh up trade-offs when using fiscal policy to control inflation.

Using **Figure 1**, analyse how contractionary fiscal policy could be used to reduce inflation in the UK. [6 marks]

**16** State **two** policies that could be used by a government to reduce negative externalities from production. [2 marks]

**17** Explain **one** benefit of low unemployment for the UK government. [2 marks]

**18** Explain **one** role of the Bank of England as 'lender of last resort'. [2 marks]

**19 Table 2** shows balance of trade data for an economy in £ millions.

**Table 2**
| | £ millions |
|---|-----------|
| Exports of goods | 342 000 |
| Imports of goods | 478 000 |

**19.1** Using **Table 2**, calculate the balance of trade in goods. State whether it is in surplus or deficit. [2 marks]

**19.2** Explain **one** possible consequence of a persistent trade deficit for an economy. [2 marks]

**20 Figure 2** shows the US dollar (\\$)/British pound (£) exchange rate.

**Figure 2 · US dollar (\\$)/British pound (£) exchange rate**

(Vertical axis: Dollars (\\$) per pound (£); Horizontal axis: Quantity of pounds (£))

On **Figure 2**, draw and label the effects on the exchange rate of a significant rise in UK interest rates relative to US interest rates. [3 marks]

**21 Figure 3 · UK economic growth**

Economic growth is one of the key objectives of the UK government. Sustained economic growth can lead to higher living standards, improved public services, and lower unemployment. UK growth has been relatively modest in recent years, averaging around 1.5% since the 2008 financial crisis, well below the long-run average of around 2.5%.

Governments can use both demand-side and supply-side policies to promote growth. However, economic growth also has costs, including environmental damage, increased inequality, and depletion of natural resources. Some economists argue that GDP is not a reliable measure of well-being and that governments should focus on other objectives such as sustainability or happiness.

Using **Figure 3**, assess whether the UK government should prioritise economic growth as its main economic objective. [9 marks]

## Section B

Answer **all** questions in the spaces provided.

### Item A · UK monetary policy and inflation

Controlling inflation is a key objective of UK monetary policy. The Bank of England's Monetary Policy Committee (MPC) is tasked with keeping inflation at 2% as measured by the Consumer Price Index (CPI). When inflation rises significantly above target, the Bank of England typically raises interest rates.

Data on UK interest rates and inflation is shown in **Table 3**.

**Table 3 · UK Bank Rate and CPI inflation 2020–2023**
| Year | Bank Rate (%) | CPI inflation (%) |
|------|--------------|-------------------|
| 2020 | 0.1 | 0.9 |
| 2021 | 0.25 | 2.6 |
| 2022 | 3.5 | 9.1 |
| 2023 | 5.25 | 6.8 |

Source: Bank of England / ONS

Higher interest rates are designed to reduce aggregate demand by discouraging borrowing and encouraging saving. However, higher rates can also harm economic growth and increase unemployment. Some economists argue that cost-push inflation, caused by rising energy and food prices, cannot be effectively controlled by raising interest rates.

Quantitative tightening · the reverse of quantitative easing · is another tool that the Bank of England can use to reduce the money supply and bring down inflation.

### Item B · Multinational companies in developing economies

Multinational companies (MNCs) play a major role in the global economy. Many MNCs based in developed countries have set up operations in developing economies, where labour costs are lower and regulation is often less strict. This has brought both benefits and drawbacks to these developing economies.

On one hand, MNCs can bring investment, jobs, and new technology. They can help to develop infrastructure and improve skills in the local workforce. On the other hand, MNCs have been criticised for exploiting workers, paying low wages, and harming the environment. Profits generated in developing economies are often repatriated to the MNC's home country rather than reinvested locally.

**Figure 4** shows foreign direct investment (FDI) inflows to developing economies, 2005–2021 (\\$ billions).

**22** Define the term 'inflation'. [2 marks]

**23** Using **Table 3** in **Item A**, calculate the percentage point change in CPI inflation between 2021 and 2022. State whether this represents an increase or a decrease. [3 marks]

**24** Using **Item A**, explain **two** ways the Bank of England could reduce inflation. [6 marks]

**25** Using **Item B**, analyse the possible consequences of increased investment by multinational companies for workers in developing economies. [6 marks]

**26** Using **Item A** and **Item B** and your own economic knowledge, discuss whether monetary policy is the most effective way to control inflation in the UK. Justify your answer. [15 marks]

END OF QUESTIONS`,
  },

  {
    id: "gcse-p2-c",
    subject: "aqa-gcse" as any,
    paper: "2",
    title: "Paper 2 · Set C",
    description: "How the Economy Works. Advanced difficulty · synced verbatim from the official-style mock (8136/2-A).",
    totalMarks: 80,
    content: `# AQA GCSE Economics (8136/2) · Paper 2: How the Economy Works · Predicted Paper Set C (Advanced)

**Time allowed: 1 hour 45 minutes | Total: 80 marks**

You will need no other materials. You may use a calculator.

## Section A

Answer **all** questions in the spaces provided. For multiple-choice questions, only **one** answer per question is allowed.

**01** Which of the following best describes the effect on aggregate demand of a simultaneous rise in interest rates and increase in income tax? [1 mark]
- A Ambiguous effect on aggregate demand
- B Clear decrease in aggregate demand
- C Clear increase in aggregate demand
- D No change in aggregate demand

**02** Which combination of policies would most likely be used to address a recession combined with a current account deficit? [1 mark]

| | Monetary policy | Exchange rate |
|---|----------------|---------------|
| A | Lower interest rates | Allow depreciation |
| B | Lower interest rates | Force appreciation |
| C | Raise interest rates | Allow depreciation |
| D | Raise interest rates | Force appreciation |

**03** Which of the following is most likely to cause a conflict between achieving low inflation and low unemployment? [1 mark]
- A An appreciation of the exchange rate
- B An expansionary fiscal policy during a boom
- C Improvements in productivity
- D Supply-side reforms in the labour market

**04** A regressive tax is best illustrated by which of the following scenarios? [1 mark]
- A A household earning £20 000 pays £2 000 VAT; a household earning £100 000 pays £5 000 VAT
- B All households pay the same percentage of income in tax regardless of earnings
- C Higher-income households pay a greater proportion of their income in tax
- D Tax allowances rise in line with earnings

**05** Which of the following is most likely to result in imported inflation for the UK? [1 mark]
- A A depreciation of the pound combined with rising global commodity prices
- B A fall in global commodity prices
- C An appreciation of the pound combined with falling global demand
- D Increased UK labour productivity

**06** An economy has a nominal GDP growth rate of 5.2% and an inflation rate of 3.5%. What is the approximate rate of real economic growth? [1 mark]
- A 1.5%
- B 1.7%
- C 3.5%
- D 8.7%

**07** Which of the following is the most likely long-run effect of persistent supply-side policies aimed at improving education? [1 mark]
- A Higher long-run unemployment
- B Increased productive capacity
- C Increased short-run inflation
- D Worsening of the current account

**08** A government's budget deficit rises from 3% to 7% of GDP during a recession. Which of the following is the most likely explanation? [1 mark]
- A A deliberate policy to reduce unemployment during recession
- B A surprise fall in unemployment
- C Private sector investment has crowded out public spending
- D The economy has entered a boom phase

**09** Which of the following identifies the most likely effects of a significant depreciation of a country's currency? [1 mark]

| | Effect on exports | Effect on inflation |
|---|------------------|---------------------|
| A | Decrease | Decrease |
| B | Decrease | Increase |
| C | Increase | Decrease |
| D | Increase | Increase |

**10** If the UK has a current account deficit of £45 billion and capital inflows of £52 billion, which of the following is most likely true? [1 mark]
- A The balance of payments as a whole is approximately in balance
- B The government must borrow £7 billion to fund the deficit
- C The pound must depreciate to restore balance
- D UK exports must rise by £45 billion to close the gap

**11** State **two** examples of supply-side policies that could increase long-run productive capacity. [2 marks]

**12** Explain what is meant by 'crowding out' in the context of government spending. [2 marks]

**13** Explain **one** role of the Bank of England in maintaining financial stability. [2 marks]

**14 Table 1** shows price index data for an economy.

**Table 1**
| Date | CPI |
|------|-----|
| Q1 2023 | 112.5 |
| Q1 2024 | 117.8 |

**14.1** Using **Table 1**, calculate the annual rate of inflation at Q1 2024 to one decimal place. [2 marks]

Answer ____ %

**14.2** Explain **one** limitation of CPI as a measure of inflation. [2 marks]

**15 Figure 1 · Trade-offs between government objectives**

The UK government has several macroeconomic objectives, including low and stable inflation, low unemployment, steady economic growth, and a satisfactory balance of payments. However, achieving all of these simultaneously is difficult because policies used to achieve one objective can often conflict with another.

For example, policies that stimulate economic growth and reduce unemployment may also cause inflation to rise. Similarly, raising interest rates to control inflation can harm economic growth and worsen unemployment. Governments must therefore carefully balance competing objectives when designing economic policy, and may sometimes have to accept trade-offs.

Using **Figure 1**, analyse how a policy to reduce unemployment could potentially conflict with the objective of low and stable inflation. [6 marks]

**16** State **two** policies that could be used to address the market failure caused by demerit goods. [2 marks]

**17** Explain **one** impact on the UK government's budget of a prolonged recession. [2 marks]

**18** Explain **one** difference between a commercial bank and a building society. [2 marks]

**19 Table 2** shows government finances for an economy.

**Table 2**
| | £ billions |
|---|-----------|
| Total government spending | 1 180 |
| Total tax revenue | 1 045 |

**19.1** Using **Table 2**, calculate the budget balance as a percentage of government spending, to one decimal place. State whether it is a surplus or deficit. [2 marks]

Answer ____ %

**19.2** Explain **one** reason why a government may accept a budget deficit during a recession. [2 marks]

**20 Figure 2** shows the Euro (€)/British pound (£) exchange rate.

**Figure 2 · Euro (€)/British pound (£) exchange rate**

(Vertical axis: Euros (€) per pound (£); Horizontal axis: Quantity of pounds (£))

On **Figure 2**, draw and label the effects on the exchange rate of a significant fall in UK interest rates relative to Eurozone interest rates. [3 marks]

**21 Figure 3 · UK government debt as % of GDP**

The UK's national debt has risen substantially since the 2008 financial crisis and has been further increased by the COVID-19 pandemic. By 2023, UK government debt had reached approximately 100% of GDP, its highest level since the 1960s.

Some economists argue that rising national debt is a serious economic problem. Future generations will have to pay for today's spending through higher taxes, and large debt servicing costs reduce resources available for public services. However, others argue that debt is less of a concern when interest rates are low, and that borrowing to invest in infrastructure or education can boost long-run growth. Attempting to reduce debt quickly through austerity can also harm the economy.

Using **Figure 3**, assess whether reducing the national debt should be a priority for the UK government. [9 marks]

## Section B

Answer **all** questions in the spaces provided.

### Item A · UK balance of payments and exchange rates

The UK has run a persistent current account deficit for many decades. This deficit is financed by capital inflows from abroad, including foreign investment into UK businesses, property, and government bonds. Some economists argue that a large and persistent current account deficit is unsustainable and poses risks to the UK economy.

Data for the UK current account in 2022 is shown in **Table 3**.

**Table 3 · UK current account 2022**
| | £ billions |
|---|-----------|
| Exports of goods and services | 825.6 |
| Imports of goods and services | 893.4 |
| Primary income balance | -22.5 |
| Secondary income balance | -15.2 |

Source: ONS

The exchange rate plays a significant role in determining the balance of payments. A depreciation of the pound makes UK exports cheaper and imports more expensive, which can help reduce a trade deficit. However, depreciation can also lead to imported inflation, particularly for countries that rely heavily on imported energy, food and raw materials.

Beyond the exchange rate, the UK government can try to address the current account deficit through supply-side reforms, competitiveness policies, or demand-reduction measures.

### Item B · Globalisation, winners and losers in the UK

Globalisation has transformed the UK economy over the past four decades. The share of UK employment in manufacturing has fallen sharply as production has shifted to lower-cost economies, particularly in Asia. At the same time, UK services · including finance, insurance, consulting, and higher education · have become major exports and employ millions of workers.

The benefits and costs of globalisation have not been shared equally. Higher-skilled workers in services have generally gained from globalisation, while lower-skilled manufacturing workers have often seen stagnant or falling real wages. Regional inequality has widened, with London and the South East benefitting more than traditional industrial areas in the Midlands and North.

**Figure 4** shows UK manufacturing as a percentage of total UK employment between 1980 and 2022.

**22** Define the term 'current account of the balance of payments'. [2 marks]

**23** Using **Table 3** in **Item A**, calculate the UK current account balance for 2022 in £ billions. Tick (✓) one box to indicate whether it is in surplus or deficit. [3 marks]

**24** Using **Item A**, explain **two** policies other than changing the exchange rate that the UK government could use to reduce the current account deficit. [6 marks]

**25** Using **Item B**, analyse the possible consequences of globalisation for lower-skilled workers in the UK. [6 marks]

**26** Using **Item A** and **Item B** and your own economic knowledge, discuss whether the benefits of globalisation for the UK outweigh the costs. Justify your answer. [15 marks]

END OF QUESTIONS`,
  },
];
