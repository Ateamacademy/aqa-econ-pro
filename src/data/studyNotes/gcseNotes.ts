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
      },
    ],
  },
  {
    name: "How Markets Work",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to buy at each price.",
        explanation: "**The demand curve slopes downward** — as price rises, quantity demanded falls.\n\n**Shifts in demand:** Income changes, changes in taste, price of substitutes/complements, advertising, population",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price.",
        explanation: "**The supply curve slopes upward** — as price rises, firms supply more.\n\n**Shifts in supply:** Cost changes, new technology, taxes/subsidies, number of firms",
        diagram: "supply_decrease",
      },
      {
        title: "Price Determination",
        definition: "The **equilibrium price** is where demand equals supply. The market clears with no shortage or surplus.",
        diagram: "supply_demand",
        examTip: "For 4-mark 'analyse' questions, always draw a diagram showing the shift and label old/new equilibrium clearly.",
      },
      {
        title: "Price Elasticity of Demand",
        definition: "**PED** measures how much the quantity demanded changes when price changes.",
        formula: "PED = % change in quantity demanded ÷ % change in price",
        keyTerms: [
          { term: "Elastic", definition: "PED > 1 — demand changes a lot when price changes (e.g., luxury goods)" },
          { term: "Inelastic", definition: "PED < 1 — demand doesn't change much (e.g., necessities like bread)" },
        ],
        example: "Petrol is price inelastic — people still need to drive even when prices rise.",
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
        ],
      },
      {
        title: "Externalities",
        definition: "**Externalities** are spillover effects on third parties — they can be positive or negative.",
        explanation: "**Negative externalities:** Pollution, noise, congestion → too much is produced\n**Positive externalities:** Education benefits, vaccination → too little is consumed",
        diagram: "negative_externality",
        examTip: "For 6-mark questions, identify the externality, explain who is affected, and suggest a government solution.",
      },
      {
        title: "Government Intervention",
        definition: "The government can try to fix market failure using taxes, subsidies, laws, and direct provision.",
        explanation: "**Methods:** Indirect taxes (on cigarettes), subsidies (for public transport), minimum prices, regulation, state provision\n\n**But government intervention can fail too** — this is called government failure",
        example: "The sugar tax in the UK aimed to reduce consumption of sugary drinks (demerit good with negative externalities).",
      },
    ],
  },
];

export const gcsePaper2Topics: Topic[] = [
  {
    name: "The Role of Money & Financial Sector",
    subtopics: [
      {
        title: "Money & Its Functions",
        definition: "**Money** is anything widely accepted as payment. It serves four functions: medium of exchange, store of value, unit of account, standard of deferred payment.",
        keyTerms: [
          { term: "Medium of Exchange", definition: "Money is accepted in return for goods and services" },
          { term: "Store of Value", definition: "Money holds its value over time (though inflation reduces this)" },
        ],
      },
      {
        title: "The Role of Banks",
        definition: "Banks accept deposits, make loans, and facilitate payments. The Bank of England sets interest rates.",
        explanation: "**Interest rates affect:** Borrowing costs, saving incentives, spending levels, house prices, exchange rate",
        example: "When the Bank of England raises interest rates, mortgages become more expensive, so people spend less on other goods.",
      },
    ],
  },
  {
    name: "The UK Economy",
    subtopics: [
      {
        title: "Economic Growth",
        definition: "**Economic growth** is an increase in the total output of goods and services (real GDP).",
        keyTerms: [
          { term: "GDP", definition: "Gross Domestic Product — the total value of everything produced in a country" },
          { term: "Recession", definition: "Two consecutive quarters of negative GDP growth" },
        ],
        explanation: "**Benefits of growth:** Higher incomes, more jobs, more tax revenue, better public services\n**Costs of growth:** Pollution, inequality, resource depletion, inflation risk",
        diagram: "ppf_growth",
      },
      {
        title: "Unemployment",
        definition: "**Unemployment** means people who want to work and are looking for a job but cannot find one.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by a recession — not enough demand" },
          { term: "Structural", definition: "Caused by changes in the economy — skills don't match available jobs" },
          { term: "Frictional", definition: "People between jobs — usually short-term" },
        ],
        explanation: "**Consequences:** Lost output, lower tax revenue, higher benefit spending, social problems",
        examTip: "For 9-mark questions, evaluate whether unemployment is always bad. Consider: frictional unemployment is natural and healthy.",
      },
      {
        title: "Inflation",
        definition: "**Inflation** is a sustained rise in the average price level. The UK target is 2%.",
        keyTerms: [
          { term: "CPI", definition: "Consumer Prices Index — measures the average change in prices" },
          { term: "Demand-Pull", definition: "Too much spending pushes up prices" },
          { term: "Cost-Push", definition: "Rising costs of production push up prices" },
        ],
        explanation: "**Effects of inflation:** Money buys less, savers lose out, uncertainty for businesses, wages may not keep up",
      },
    ],
  },
  {
    name: "Government Economic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** is when the government changes spending or taxes to influence the economy.",
        explanation: "**To boost growth:** Increase spending or cut taxes → more money in the economy\n**To reduce inflation:** Cut spending or raise taxes → less money being spent\n\n**Budget deficit:** Government spends more than it collects in tax\n**Budget surplus:** Government collects more than it spends",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** is when the Bank of England changes interest rates to influence spending and inflation.",
        explanation: "**Lower interest rates:** Cheaper to borrow → more spending → more growth → risk of inflation\n**Higher interest rates:** More expensive to borrow → less spending → less inflation → risk of unemployment",
        examTip: "At GCSE, focus on the simple transmission mechanism: interest rates → borrowing/saving → spending → AD → growth/inflation.",
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
        ],
        explanation: "**Benefits of trade:** More choice, lower prices, access to resources, economic growth\n**Costs:** Job losses in uncompetitive industries, environmental damage from transport",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the price of one currency in terms of another (e.g., £1 = $1.25).",
        explanation: "**Strong pound:** Imports cheaper (good for consumers), exports more expensive (bad for UK firms)\n**Weak pound:** Imports more expensive, exports cheaper (good for UK firms)",
        examTip: "Remember the phrase: 'Strong Pound Imports Cheap, Exports Dear' (SPICED).",
      },
    ],
  },
];
