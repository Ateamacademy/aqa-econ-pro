import type { Topic } from "./edexcelANotes";

export const gcsePaper1Topics: Topic[] = [
  {
    name: "Economic Foundations",
    subtopics: [
      {
        title: "The Economic Problem",
        definition: "The central economic problem is **scarcity** — resources are limited but human wants are unlimited. This forces us to make **choices**.",
        keyTerms: [
          { term: "Scarcity", definition: "Not enough resources to satisfy all wants" },
          { term: "Opportunity Cost", definition: "The next best thing you give up when you make a choice" },
          { term: "Factors of Production", definition: "Land, labour, capital, enterprise — the 4 types of resources" },
          { term: "Economic Good", definition: "A good that requires resources and has an opportunity cost" },
          { term: "Free Good", definition: "A good with no opportunity cost (e.g., air)" },
        ],
        example: "If the government spends money on new hospitals, the opportunity cost might be fewer new schools.",
        examTip: "Always mention opportunity cost when discussing any economic decision. It's tested in almost every paper.",
      },
      {
        title: "Economic Systems",
        definition: "Economies must decide **what**, **how**, and **for whom** to produce. Different systems solve this differently.",
        keyTerms: [
          { term: "Free Market", definition: "Decisions made by supply and demand — no government intervention" },
          { term: "Command Economy", definition: "Government makes all economic decisions" },
          { term: "Mixed Economy", definition: "Combination of free market and government — like the UK" },
        ],
        explanation: "**Free market advantages:** Consumer choice, competition drives innovation, efficient resource allocation\n**Free market disadvantages:** Market failure, inequality, no public goods\n**Command advantages:** Greater equality, public goods provided, full employment planned\n**Command disadvantages:** Inefficiency, no incentives, lack of choice\n**The UK is a mixed economy** — most goods are produced by the market, but government provides healthcare, education, and defence.",
      },
      {
        title: "Production Possibility Frontiers",
        definition: "A **PPF** shows the maximum output of two goods an economy can produce with its available resources.",
        diagram: "ppf",
        explanation: "Points **on** the curve = using all resources efficiently\nPoints **inside** = some resources are being wasted\nPoints **outside** = not possible with current resources\n\n**Curve shifts outward** with economic growth — more workers, better technology, more investment\n**Moving along the curve** shows the opportunity cost of producing more of one good",
        examTip: "Always explain what 'inside the PPF' means — it shows wasted/unemployed resources, not just 'less output'.",
      },
      {
        title: "Specialisation & Division of Labour",
        definition: "**Specialisation** means focusing on making one type of product. **Division of labour** means each worker does a different task.",
        keyTerms: [
          { term: "Specialisation", definition: "Concentrating on producing one type of good or service" },
          { term: "Division of Labour", definition: "Splitting production into separate tasks done by different workers" },
        ],
        explanation: "**Advantages:** Workers get faster (practice makes perfect), less time wasted switching tasks, easier to train, can use specialist tools\n**Disadvantages:** Work becomes boring and repetitive, workers depend on each other, if one worker is absent the whole process stops",
        example: "In a car factory, one worker fits engines, another paints the body, another installs seats — each specialises in one task.",
      },
    ],
  },
  {
    name: "How Markets Work",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to buy at each price.",
        explanation: "**The demand curve slopes downward** — as price rises, quantity demanded falls.\n\n**Shifts in demand caused by:**\n- Income changes (higher income → buy more normal goods)\n- Changes in taste (new fashion → demand rises)\n- Price of substitutes (if competitor's price rises → your demand rises)\n- Price of complements (if petrol price rises → demand for cars falls)\n- Advertising (more advertising → more demand)\n- Population changes (more people → more demand)\n- Seasons (ice cream demand higher in summer)",
        diagram: "demand_increase",
        examTip: "Always say whether it's a 'movement along' (price change) or a 'shift' (non-price factor). This is worth marks every time.",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price.",
        explanation: "**The supply curve slopes upward** — as price rises, firms supply more because it's more profitable.\n\n**Shifts in supply caused by:**\n- Cost changes (higher wages → supply shifts left)\n- New technology (robots → supply shifts right)\n- Taxes (indirect tax → supply shifts left)\n- Subsidies (government payment → supply shifts right)\n- Number of firms (more firms entering → supply shifts right)\n- Weather (bad harvest → supply shifts left)",
        diagram: "supply_decrease",
      },
      {
        title: "Price Determination",
        definition: "The **equilibrium price** is where demand equals supply. The market clears with no shortage or surplus.",
        keyTerms: [
          { term: "Equilibrium", definition: "Where demand = supply — no tendency for price to change" },
          { term: "Excess Demand", definition: "Price too low → not enough supply → shortage → price rises" },
          { term: "Excess Supply", definition: "Price too high → not enough demand → surplus → price falls" },
        ],
        diagram: "supply_demand",
        examTip: "For 4-mark 'analyse' questions, always draw a diagram showing the shift and label old/new equilibrium clearly.",
      },
      {
        title: "Price Elasticity of Demand",
        definition: "**PED** measures how much the quantity demanded changes when price changes.",
        formula: "PED = % change in quantity demanded ÷ % change in price",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Demand changes a lot when price changes (e.g., luxury goods, many substitutes)" },
          { term: "Inelastic (PED < 1)", definition: "Demand doesn't change much (e.g., necessities like bread, petrol)" },
        ],
        explanation: "**What makes demand elastic?**\n- Many substitutes available\n- The good is a luxury, not a necessity\n- It takes up a large proportion of income\n- There's a long time period to respond\n\n**What makes demand inelastic?**\n- Few or no substitutes\n- The good is a necessity\n- Habit-forming or addictive (e.g., cigarettes)\n- Small proportion of income",
        example: "Petrol is price inelastic — people still need to drive even when prices rise. Designer handbags are elastic — people stop buying when prices rise.",
      },
      {
        title: "Income Elasticity of Demand",
        definition: "**YED** measures how demand changes when people's income changes.",
        formula: "YED = % change in quantity demanded ÷ % change in income",
        keyTerms: [
          { term: "Normal Good (YED positive)", definition: "Demand rises when income rises (e.g., holidays, restaurants)" },
          { term: "Inferior Good (YED negative)", definition: "Demand falls when income rises (e.g., value brands, bus travel)" },
        ],
        example: "When people earn more, they switch from value supermarket brands (inferior) to premium brands (normal). During recession, demand for budget goods rises.",
      },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      {
        title: "What is Market Failure?",
        definition: "**Market failure** happens when the free market doesn't allocate resources efficiently — too much or too little of something is produced.",
        keyTerms: [
          { term: "Externality", definition: "A cost or benefit to someone not involved in the transaction" },
          { term: "Public Good", definition: "A good that is non-excludable and non-rivalrous (e.g., street lighting)" },
          { term: "Merit Good", definition: "A good that is underconsumed because people don't realise its full benefits (e.g., education)" },
          { term: "Demerit Good", definition: "A good overconsumed because people underestimate the harm (e.g., cigarettes)" },
        ],
        explanation: "**Types of market failure:**\n1. **Externalities** — costs/benefits to third parties\n2. **Public goods** — market won't provide them\n3. **Merit/demerit goods** — wrong quantity consumed\n4. **Information failure** — people make bad decisions\n5. **Monopoly power** — firms charge too much",
      },
      {
        title: "Externalities",
        definition: "**Externalities** are spillover effects on third parties — they can be positive or negative.",
        explanation: "**Negative externalities (costs to others):**\n- Pollution from factories → health costs for residents\n- Noise from airports → reduced quality of life for neighbours\n- Congestion from driving → delays for other road users\n- Passive smoking → health costs for non-smokers\n\n**Positive externalities (benefits to others):**\n- Education → more productive workforce for society\n- Vaccination → protects unvaccinated people (herd immunity)\n- Training → workers take skills to other employers\n- Bee-keeping → pollination helps nearby farmers",
        diagram: "negative_externality",
        examTip: "For 6-mark questions, identify the externality, explain who is affected (the third party), and suggest a government solution.",
      },
      {
        title: "Government Intervention",
        definition: "The government can try to fix market failure using taxes, subsidies, laws, and direct provision.",
        keyTerms: [
          { term: "Indirect Tax", definition: "A tax on spending (e.g., tax on cigarettes makes them more expensive)" },
          { term: "Subsidy", definition: "A payment from government to reduce costs (e.g., bus fare subsidy)" },
          { term: "Regulation", definition: "Laws to control behaviour (e.g., speed limits, smoking bans)" },
          { term: "Government Failure", definition: "When government intervention makes things worse" },
        ],
        explanation: "**Methods of intervention:**\n- **Indirect taxes** on cigarettes, alcohol, sugar → discourage consumption\n- **Subsidies** for public transport, renewables → encourage consumption\n- **Minimum prices** for alcohol → reduce excessive drinking\n- **Regulation** — smoking ban in public places, planning laws\n- **State provision** — NHS, state schools, defence\n- **Information** — health warnings on packets, food labelling\n\n**But government intervention can fail too** — this is called **government failure**. The tax might be too high, creating black markets. The subsidy might be too expensive.",
        example: "The sugar tax in the UK aimed to reduce consumption of sugary drinks (demerit good with negative externalities). Many firms reformulated their drinks to avoid the tax — an intended consequence!",
      },
    ],
  },
  {
    name: "The Role of Money & Financial Sector",
    subtopics: [
      {
        title: "Money & Its Functions",
        definition: "**Money** is anything widely accepted as payment. It serves four functions that make trade easier than barter.",
        keyTerms: [
          { term: "Medium of Exchange", definition: "Money is accepted in return for goods and services" },
          { term: "Store of Value", definition: "Money holds its value over time (though inflation reduces this)" },
          { term: "Unit of Account", definition: "Money provides a common measure for comparing prices" },
          { term: "Standard of Deferred Payment", definition: "Money allows buying now and paying later (credit)" },
        ],
        explanation: "**Without money (barter):** You need a 'double coincidence of wants' — you must find someone who has what you want AND wants what you have. This is very inefficient.\n\n**Money makes trade much easier** — you just exchange money for goods. This allows specialisation and a more efficient economy.",
      },
      {
        title: "The Role of Banks & Financial Institutions",
        definition: "Banks accept deposits, make loans, and facilitate payments. The Bank of England sets interest rates.",
        keyTerms: [
          { term: "Commercial Bank", definition: "Accepts deposits and makes loans to individuals and businesses" },
          { term: "Central Bank", definition: "The Bank of England — sets interest rates and regulates the banking system" },
          { term: "Interest Rate", definition: "The cost of borrowing money / the reward for saving" },
        ],
        explanation: "**Interest rates affect:**\n- **Borrowing:** Higher rates → borrowing more expensive → less spending\n- **Saving:** Higher rates → saving more attractive → less spending\n- **House prices:** Higher rates → mortgages cost more → house prices fall\n- **Exchange rate:** Higher rates → currency appreciates → imports cheaper\n- **Business investment:** Higher rates → more expensive to borrow → less investment",
        example: "When the Bank of England raises interest rates, mortgages become more expensive, so people spend less on other goods.",
      },
    ],
  },
];

export const gcsePaper2Topics: Topic[] = [
  {
    name: "The UK Economy",
    subtopics: [
      {
        title: "Economic Growth",
        definition: "**Economic growth** is an increase in the total output of goods and services (real GDP).",
        keyTerms: [
          { term: "GDP", definition: "Gross Domestic Product — the total value of everything produced in a country" },
          { term: "Real GDP", definition: "GDP adjusted for inflation — shows actual increases in output" },
          { term: "Recession", definition: "Two consecutive quarters of negative GDP growth" },
          { term: "GDP per capita", definition: "GDP divided by population — shows average standard of living" },
        ],
        explanation: "**Benefits of growth:** Higher incomes, more jobs, more tax revenue, better public services, higher living standards\n**Costs of growth:** Pollution and environmental damage, inequality (rich may benefit more), resource depletion, inflation risk, work-life balance suffers\n\n**GDP limitations:** Doesn't show inequality, ignores environmental damage, misses informal economy (cash-in-hand work), doesn't measure happiness or well-being",
        diagram: "ppf_growth",
      },
      {
        title: "Unemployment",
        definition: "**Unemployment** means people who want to work and are looking for a job but cannot find one.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by a recession — not enough demand in the economy" },
          { term: "Structural", definition: "Caused by changes in the economy — skills don't match available jobs" },
          { term: "Frictional", definition: "People between jobs — usually short-term" },
          { term: "Seasonal", definition: "Jobs only available at certain times of year (e.g., tourism, farming)" },
        ],
        explanation: "**Consequences of unemployment:**\n- For individuals: lower income, stress, loss of skills, social problems\n- For the economy: lost output (economy inside PPF), less tax revenue, higher benefit spending\n- For government: higher spending on benefits, less tax collected, social problems\n\n**Solutions:**\n- **For cyclical:** Lower interest rates, increase government spending (boost demand)\n- **For structural:** Retraining programmes, improve education\n- **For frictional:** Better job information, jobcentres",
        examTip: "For 9-mark questions, evaluate whether unemployment is always bad. Consider: frictional unemployment is natural and healthy — it shows a dynamic, flexible economy.",
      },
      {
        title: "Inflation",
        definition: "**Inflation** is a sustained rise in the average price level. The UK target is 2%.",
        keyTerms: [
          { term: "CPI", definition: "Consumer Prices Index — measures the average change in prices using a basket of goods" },
          { term: "Demand-Pull", definition: "Too much spending pushes up prices — demand grows faster than supply" },
          { term: "Cost-Push", definition: "Rising costs of production push up prices — e.g., higher oil prices, higher wages" },
          { term: "Deflation", definition: "A sustained fall in the general price level — can be harmful" },
        ],
        explanation: "**Effects of inflation:**\n- Money buys less (reduced purchasing power)\n- Savers lose out (savings worth less in real terms)\n- Borrowers benefit (debt becomes cheaper in real terms)\n- Uncertainty for businesses (harder to plan)\n- Wages may not keep up → real income falls\n- UK exports become more expensive → less competitive\n\n**Effects of deflation:**\n- People delay buying (wait for lower prices) → demand falls\n- Businesses cut prices → lower profits → job losses\n- Debt becomes harder to repay (real value increases)\n\n**2% target is 'goldilocks'** — not too hot, not too cold. A little inflation encourages spending and investment.",
        examTip: "Remember: inflation isn't just 'prices going up'. It must be SUSTAINED and GENERAL (across the whole economy, not just one product).",
      },
    ],
  },
  {
    name: "Government Economic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** is when the government changes spending or taxes to influence the economy.",
        keyTerms: [
          { term: "Government Spending", definition: "Money the government spends on public services (NHS, schools, defence)" },
          { term: "Taxation", definition: "Money collected by government (income tax, VAT, corporation tax)" },
          { term: "Budget Deficit", definition: "Government spends more than it collects in tax" },
          { term: "Budget Surplus", definition: "Government collects more than it spends" },
          { term: "National Debt", definition: "Total amount the government owes from accumulated deficits" },
        ],
        explanation: "**To boost growth/reduce unemployment:**\n- Increase spending → more money in the economy → more jobs\n- Cut taxes → people have more money to spend → more demand\n\n**To reduce inflation:**\n- Cut spending → less money in the economy → less demand pressure\n- Raise taxes → people have less money → less spending\n\n**Problems:** Budget deficit may increase, national debt grows, time lags before policy works, may cause inflation",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** is when the Bank of England changes interest rates to influence spending and inflation.",
        keyTerms: [
          { term: "Interest Rate", definition: "The cost of borrowing and the reward for saving" },
          { term: "Bank of England", definition: "The UK's central bank — independent from government" },
          { term: "MPC", definition: "Monetary Policy Committee — decides interest rates each month" },
        ],
        explanation: "**Lower interest rates (to boost economy):**\n- Cheaper to borrow → more spending and investment\n- Less incentive to save → more spending\n- Mortgage payments fall → more disposable income\n- But risk of inflation\n\n**Higher interest rates (to control inflation):**\n- More expensive to borrow → less spending\n- More incentive to save → less spending\n- Mortgage payments rise → less disposable income\n- But risk of unemployment and slower growth",
        examTip: "At GCSE, focus on the simple transmission mechanism: interest rates → borrowing/saving → spending → AD → growth/inflation.",
      },
      {
        title: "Supply-Side Policies",
        definition: "**Supply-side policies** aim to increase the productive capacity of the economy — making the economy able to produce MORE.",
        explanation: "**Examples:**\n- **Education and training** → better skilled workers → more productive\n- **Infrastructure** (roads, broadband) → businesses work more efficiently\n- **Tax cuts** → incentivise people to work harder and businesses to invest\n- **Deregulation** → remove red tape → easier to start businesses\n- **Privatisation** → private firms run services more efficiently\n\n**Advantages:** Growth without inflation, improved long-term competitiveness\n**Disadvantages:** Takes a LONG time to work (years), expensive, may increase inequality",
        examTip: "Supply-side policies are the answer when the examiner asks about LONG-RUN growth. They shift LRAS/PPF outward.",
      },
    ],
  },
  {
    name: "International Trade",
    subtopics: [
      {
        title: "Why Countries Trade",
        definition: "Countries trade because they can't produce everything they need. Trade allows **specialisation** in what countries are best at.",
        keyTerms: [
          { term: "Imports", definition: "Goods and services bought from other countries" },
          { term: "Exports", definition: "Goods and services sold to other countries" },
          { term: "Specialisation", definition: "Focusing on producing what you're most efficient at" },
          { term: "Free Trade", definition: "Trading without barriers like tariffs or quotas" },
          { term: "Protectionism", definition: "Using barriers to restrict imports and protect domestic firms" },
        ],
        explanation: "**Benefits of trade:** More choice for consumers, lower prices (competition), access to resources not available locally, economic growth, economies of scale, new ideas and technology\n\n**Costs:** Job losses in uncompetitive industries, environmental damage from transport, dependency on other countries, cultural impacts\n\n**Reasons for protectionism:** Protect jobs, protect infant industries, national security, prevent dumping (selling below cost), protect the environment",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the price of one currency in terms of another (e.g., £1 = $1.25).",
        keyTerms: [
          { term: "Appreciation", definition: "The currency gets stronger — can buy more foreign currency" },
          { term: "Depreciation", definition: "The currency gets weaker — buys less foreign currency" },
        ],
        explanation: "**Strong pound (appreciation):**\n- Imports cheaper → good for consumers, cheaper raw materials\n- Exports more expensive → bad for UK businesses selling abroad\n\n**Weak pound (depreciation):**\n- Imports more expensive → higher prices, cost-push inflation\n- Exports cheaper → good for UK businesses, more competitive\n\n**What affects exchange rates?**\n- Interest rates (higher UK rates → more demand for pounds → appreciation)\n- Inflation (high UK inflation → pound weakens)\n- Trade balance (more exports → more demand for pounds → appreciation)\n- Speculation (traders betting on future changes)",
        examTip: "Remember the phrase: 'Strong Pound Imports Cheap, Exports Dear' (SPICED). And: 'Weak Pound Imports Dear, Exports Cheap' (WIDEC).",
      },
      {
        title: "Balance of Payments",
        definition: "The **balance of payments** records all money flowing in and out of the country.",
        keyTerms: [
          { term: "Current Account", definition: "Records trade in goods and services" },
          { term: "Trade Deficit", definition: "Imports > exports — more money leaving the country" },
          { term: "Trade Surplus", definition: "Exports > imports — more money entering the country" },
        ],
        explanation: "**The UK has a trade deficit** — we import more than we export, especially manufactured goods.\n\n**Causes:** Strong pound makes imports cheap, decline of UK manufacturing, high consumer spending on imports\n\n**Policies to improve:** Weaker exchange rate (makes exports cheaper), supply-side policies (make UK firms more competitive), protectionism (but risks retaliation)",
      },
      {
        title: "Globalisation",
        definition: "**Globalisation** is the process by which the world's economies are becoming more interconnected.",
        keyTerms: [
          { term: "Globalisation", definition: "Increasing trade, investment, and cultural links between countries" },
          { term: "Multinational Company", definition: "A firm that operates in more than one country (e.g., Apple, McDonald's)" },
        ],
        explanation: "**Causes:** Lower transport costs, internet and technology, trade agreements, multinational companies expanding\n\n**Benefits:** Lower prices, more consumer choice, access to foreign investment, technology transfer, jobs in developing countries\n**Costs:** Job losses in developed countries (moved abroad), environmental damage, exploitation of workers, cultural homogenisation, growing inequality",
        example: "Apple designs iPhones in California, sources components from 40+ countries, and assembles them in China — a perfect example of globalisation.",
      },
    ],
  },
];
