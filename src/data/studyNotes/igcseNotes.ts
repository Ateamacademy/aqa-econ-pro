import type { Topic } from "./edexcelANotes";

export const igcsePart1Topics: Topic[] = [
  {
    name: "The Basic Economic Problem",
    subtopics: [
      {
        title: "Scarcity & Choice",
        definition: "The basic economic problem is that resources are **scarce** but human wants are **unlimited**. This means choices must be made.",
        keyTerms: [
          { term: "Scarcity", definition: "When there are not enough resources to satisfy all wants" },
          { term: "Opportunity Cost", definition: "The next best alternative given up when a choice is made" },
          { term: "Factors of Production", definition: "Land, labour, capital, enterprise" },
        ],
        example: "A farmer using land to grow wheat gives up the opportunity to use it for cattle — the opportunity cost is the cattle production foregone.",
        examTip: "IGCSE examiners want you to always state 'the NEXT BEST alternative' — not just 'what you give up'.",
      },
      {
        title: "Production Possibility Curves",
        definition: "A **PPC** shows the maximum possible output of two goods with available resources.",
        diagram: "ppf",
        explanation: "Points on the curve = efficient\nPoints inside = resources are wasted\nPoints outside = not possible with current resources\nCurve shifts outward = economic growth",
      },
    ],
  },
  {
    name: "The Allocation of Resources",
    subtopics: [
      {
        title: "The Price Mechanism",
        definition: "In a market economy, the **price mechanism** allocates resources through the forces of supply and demand.",
        keyTerms: [
          { term: "Market Economy", definition: "Resources allocated by supply and demand" },
          { term: "Command Economy", definition: "Resources allocated by the government" },
          { term: "Mixed Economy", definition: "Combination of market forces and government control" },
        ],
      },
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to buy at each price.",
        explanation: "**Demand curve slopes downward** — higher price = lower quantity demanded\n\n**Shifts caused by:** Income, tastes, population, price of substitutes/complements, advertising",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price.",
        explanation: "**Supply curve slopes upward** — higher price = higher quantity supplied\n\n**Shifts caused by:** Costs of production, technology, taxes/subsidies, weather",
        diagram: "supply_decrease",
      },
      {
        title: "Price Determination",
        definition: "**Equilibrium** is where demand equals supply. At this price, there is no excess supply or demand.",
        diagram: "supply_demand",
        examTip: "For structured questions, always draw a diagram. Label axes, curves, equilibrium price (Pe) and quantity (Qe).",
      },
      {
        title: "Elasticity",
        definition: "**PED** measures how much quantity demanded responds to a change in price.",
        formula: "PED = % change in quantity demanded ÷ % change in price",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Demand is responsive — e.g., luxury goods" },
          { term: "Inelastic (PED < 1)", definition: "Demand is unresponsive — e.g., necessities" },
        ],
        example: "Water is price inelastic — people need it regardless of price. Designer handbags are elastic — people buy less when prices rise.",
      },
    ],
  },
  {
    name: "Microeconomic Decision Makers",
    subtopics: [
      {
        title: "The Role of Firms",
        definition: "Firms combine factors of production to produce goods and services for sale in markets.",
        keyTerms: [
          { term: "Sole Trader", definition: "One person owns the business — unlimited liability" },
          { term: "Partnership", definition: "Two or more people share ownership" },
          { term: "Company (Ltd/PLC)", definition: "Separate legal entity — limited liability for shareholders" },
        ],
        explanation: "**Why firms grow:** Economies of scale, more market power, diversification\n**How firms grow:** Internal (organic) growth or external (mergers/takeovers)",
      },
      {
        title: "The Role of Government",
        definition: "Government intervenes to correct market failure, provide public goods, and redistribute income.",
        explanation: "**Reasons for intervention:** Externalities, public goods, merit goods, monopoly power, inequality\n**Methods:** Taxation, subsidies, regulation, price controls, state provision",
      },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      {
        title: "Externalities",
        definition: "**Externalities** are effects on third parties not involved in the transaction.",
        keyTerms: [
          { term: "Negative Externality", definition: "Harmful effect on others — e.g., pollution" },
          { term: "Positive Externality", definition: "Beneficial effect on others — e.g., education" },
        ],
        diagram: "negative_externality",
        example: "A factory polluting a river creates a negative externality — the fishermen downstream bear costs they didn't cause.",
        examTip: "Always identify WHO the third party is and HOW they are affected.",
      },
      {
        title: "Government Intervention in Markets",
        definition: "Government uses taxes, subsidies, and regulations to correct market failure.",
        explanation: "**Taxes:** Discourage consumption of demerit goods (e.g., cigarette tax)\n**Subsidies:** Encourage consumption of merit goods (e.g., education funding)\n**Regulation:** Laws to limit pollution, ensure food safety, protect workers",
        diagram: "tax_incidence",
      },
    ],
  },
];

export const igcsePart2Topics: Topic[] = [
  {
    name: "Government & the Macroeconomy",
    subtopics: [
      {
        title: "Macroeconomic Objectives",
        definition: "Governments aim for: **economic growth**, **low unemployment**, **low inflation**, and a **healthy balance of payments**.",
        keyTerms: [
          { term: "Economic Growth", definition: "An increase in real GDP" },
          { term: "Inflation", definition: "A sustained rise in the general price level" },
          { term: "Unemployment", definition: "People able and willing to work but cannot find a job" },
          { term: "Balance of Payments", definition: "Record of all trade and financial flows with other countries" },
        ],
        examTip: "IGCSE often asks about conflicts between objectives — e.g., reducing unemployment may cause inflation.",
      },
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** uses government spending and taxation to influence the economy.",
        explanation: "**Expansionary:** ↑spending or ↓taxes → more jobs and growth\n**Contractionary:** ↓spending or ↑taxes → controls inflation\n**Budget deficit:** Spending > revenue\n**National debt:** Total accumulated borrowing",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** involves changing interest rates and money supply to influence the economy.",
        explanation: "**Lower interest rates:** Borrowing cheaper → more spending → growth\n**Higher interest rates:** Borrowing costlier → less spending → lower inflation",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies to increase the productive capacity of the economy — shifting AS right.",
        explanation: "**Examples:** Education and training, deregulation, privatisation, infrastructure investment, tax incentives\n**Benefits:** Non-inflationary growth\n**Limitations:** Long time to work, expensive",
      },
    ],
  },
  {
    name: "Living Standards & Employment",
    subtopics: [
      {
        title: "Living Standards",
        definition: "**Living standards** refer to the quality and quantity of goods and services available to people.",
        keyTerms: [
          { term: "GDP per capita", definition: "Total GDP divided by population — used to compare living standards" },
          { term: "HDI", definition: "Human Development Index — combines income, education, and health" },
        ],
        explanation: "**GDP limitations:** Doesn't show inequality, ignores black market, doesn't measure happiness, environmental costs\n**HDI is better because:** It includes non-monetary factors",
      },
      {
        title: "Employment & Unemployment",
        definition: "Unemployment is measured as a percentage of the labour force.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by recession" },
          { term: "Structural", definition: "Caused by changes in the economy" },
          { term: "Frictional", definition: "Between jobs" },
          { term: "Seasonal", definition: "Due to time of year (e.g., tourism)" },
        ],
        explanation: "**Consequences:** Lower output, less tax revenue, more government spending on benefits, social problems\n**Solutions:** Job creation schemes, education, lower interest rates (for cyclical)",
      },
      {
        title: "Inflation & Deflation",
        definition: "**Inflation** is rising prices. **Deflation** is falling prices. Both can cause problems.",
        explanation: "**Inflation effects:** Erodes purchasing power, hurts savers, helps borrowers, creates uncertainty\n**Deflation effects:** Consumers delay purchases, firms cut wages/jobs, debt becomes harder to repay",
        examTip: "Be prepared to explain why BOTH inflation and deflation are problematic. The ideal is low, stable inflation (around 2%).",
      },
    ],
  },
  {
    name: "International Trade & Development",
    subtopics: [
      {
        title: "International Trade",
        definition: "Countries trade because no single country can produce everything it needs efficiently.",
        keyTerms: [
          { term: "Free Trade", definition: "No barriers to trade between countries" },
          { term: "Protectionism", definition: "Using barriers (tariffs, quotas) to restrict imports" },
          { term: "Tariff", definition: "A tax on imported goods" },
          { term: "Quota", definition: "A limit on the quantity of imports" },
        ],
        explanation: "**Benefits of free trade:** Lower prices, more choice, specialisation, economies of scale\n**Reasons for protection:** Protect jobs, infant industries, national security, prevent dumping",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the value of one currency expressed in terms of another.",
        explanation: "**Appreciation (stronger currency):** Imports cheaper, exports dearer\n**Depreciation (weaker currency):** Imports dearer, exports cheaper\n\n**Determined by:** Interest rates, trade flows, speculation, inflation rates",
        examTip: "Use the SPICED mnemonic: Strong Pound = Imports Cheap, Exports Dear.",
      },
      {
        title: "Economic Development",
        definition: "**Development** is broader than growth — it includes improvements in health, education, and quality of life.",
        keyTerms: [
          { term: "Developing Country", definition: "Low GDP per capita, poor health/education indicators" },
          { term: "HDI", definition: "Combines income, education, and life expectancy to measure development" },
        ],
        explanation: "**Barriers to development:** Poverty trap, corruption, poor infrastructure, climate, conflict, trade dependency, debt\n**Policies:** Aid (bilateral/multilateral), FDI, fair trade, microfinance, debt relief",
        examTip: "IGCSE frequently asks whether aid or trade is better for development. Present both sides with examples.",
      },
    ],
  },
];
