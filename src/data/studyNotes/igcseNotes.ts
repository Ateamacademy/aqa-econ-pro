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
          { term: "Economic Good", definition: "A good that requires resources (has opportunity cost)" },
          { term: "Free Good", definition: "A good with no opportunity cost (e.g., air)" },
        ],
        example: "A farmer using land to grow wheat gives up the opportunity to use it for cattle — the opportunity cost is the cattle production foregone.",
        examTip: "IGCSE examiners want you to always state 'the NEXT BEST alternative' — not just 'what you give up'.",
      },
      {
        title: "Production Possibility Curves",
        definition: "A **PPC** shows the maximum possible output of two goods with available resources.",
        diagram: "ppf",
        explanation: "Points on the curve = efficient (all resources used well)\nPoints inside = resources are wasted or unemployed\nPoints outside = not possible with current resources\nCurve shifts outward = economic growth (more resources or better technology)\nMovement along = opportunity cost of producing more of one good\n\n**Shape:** Concave (bowing outward) because of increasing opportunity costs — resources are not equally suited to producing both goods.",
      },
      {
        title: "Economic Systems",
        definition: "Different countries use different systems to decide what, how, and for whom to produce.",
        keyTerms: [
          { term: "Market Economy", definition: "Decisions made by consumers and firms through the price mechanism" },
          { term: "Command/Planned Economy", definition: "Government makes all decisions about resource allocation" },
          { term: "Mixed Economy", definition: "Combination of market forces and government control" },
        ],
        explanation: "**Market economy advantages:** Consumer choice, competition drives innovation, efficient allocation\n**Market economy disadvantages:** Market failure, inequality, no public goods, instability\n\n**Command economy advantages:** Greater equality, public goods provided, full employment\n**Command economy disadvantages:** Inefficiency, lack of incentives, no consumer choice, bureaucracy\n\n**Most countries are mixed** — the question is how much government intervention there should be.",
        examTip: "IGCSE loves comparing economic systems. Always give advantages AND disadvantages of each.",
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
          { term: "Signalling", definition: "Prices send signals to buyers and sellers about scarcity" },
          { term: "Rationing", definition: "Prices allocate scarce goods to those willing to pay" },
          { term: "Incentive", definition: "Price changes motivate producers and consumers to change behaviour" },
        ],
        explanation: "**How it works:**\n1. High demand → price rises → signal to produce more → more resources allocated\n2. Low demand → price falls → signal to produce less → resources move elsewhere\n3. The price mechanism works without any central planning — it's 'invisible hand' (Adam Smith)",
      },
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to buy at each price.",
        explanation: "**Demand curve slopes downward** — higher price = lower quantity demanded (because of income effect and substitution effect)\n\n**Shifts caused by:**\n- Income (higher income → more demand for normal goods, less for inferior goods)\n- Tastes and preferences (new fashion → more demand)\n- Population (more people → more demand)\n- Price of substitutes (if substitute gets expensive → your demand rises)\n- Price of complements (if complement gets expensive → your demand falls)\n- Advertising (more advertising → more demand)\n- Expectations (if you expect price to rise → buy now)",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price.",
        explanation: "**Supply curve slopes upward** — higher price = higher quantity supplied (more profitable to produce)\n\n**Shifts caused by:**\n- Costs of production (higher wages/materials → supply shifts left)\n- Technology (better tech → supply shifts right → more produced at each price)\n- Taxes (indirect tax → supply shifts left → higher costs)\n- Subsidies (government payment → supply shifts right → lower costs)\n- Weather (bad weather → supply of crops shifts left)\n- Number of firms (more firms → supply shifts right)",
        diagram: "supply_decrease",
      },
      {
        title: "Price Determination",
        definition: "**Equilibrium** is where demand equals supply. At this price, there is no excess supply or demand.",
        keyTerms: [
          { term: "Equilibrium Price", definition: "The price where quantity demanded equals quantity supplied" },
          { term: "Excess Demand (Shortage)", definition: "Price below equilibrium → buyers want more than sellers offer" },
          { term: "Excess Supply (Surplus)", definition: "Price above equilibrium → sellers offer more than buyers want" },
        ],
        diagram: "supply_demand",
        examTip: "For structured questions, always draw a diagram. Label axes (Price on Y, Quantity on X), curves (D, S), equilibrium price (Pe) and quantity (Qe).",
      },
      {
        title: "Price Elasticity of Demand",
        definition: "**PED** measures how much quantity demanded responds to a change in price.",
        formula: "PED = % change in quantity demanded ÷ % change in price",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Demand is responsive — e.g., luxury goods, many substitutes" },
          { term: "Inelastic (PED < 1)", definition: "Demand is unresponsive — e.g., necessities, addictive goods" },
          { term: "Unit Elastic (PED = 1)", definition: "Proportionate response — revenue stays the same" },
        ],
        explanation: "**What makes demand elastic?**\n- Many substitutes available\n- The good is a luxury\n- Takes up a large share of income\n- Long time to adjust\n\n**What makes demand inelastic?**\n- Few substitutes\n- Necessity or addictive\n- Small share of income\n- Short time period\n\n**Significance for firms:** If demand is inelastic, raising price increases total revenue. If elastic, lowering price increases revenue.",
        example: "Water is price inelastic — people need it regardless of price. Designer handbags are elastic — people buy less when prices rise.",
      },
      {
        title: "Price Elasticity of Supply",
        definition: "**PES** measures how much quantity supplied responds to a change in price.",
        formula: "PES = % change in quantity supplied ÷ % change in price",
        keyTerms: [
          { term: "Elastic Supply", definition: "Firms can easily increase output when price rises" },
          { term: "Inelastic Supply", definition: "Firms struggle to increase output quickly" },
        ],
        explanation: "**Determinants of PES:**\n- Spare capacity (more capacity = more elastic)\n- Time period (longer = more elastic)\n- Stocks/inventories (more stocks = more elastic)\n- Ease of switching production\n\n**Examples:** Agricultural supply is inelastic short-run (crops take months). Manufacturing can be more elastic (adjust production lines).",
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
          { term: "Partnership", definition: "Two or more people share ownership — unlimited liability" },
          { term: "Private Limited Company (Ltd)", definition: "Separate legal entity — limited liability, shares not publicly traded" },
          { term: "Public Limited Company (PLC)", definition: "Shares traded on stock exchange — limited liability" },
          { term: "Unlimited Liability", definition: "Owner personally responsible for ALL business debts" },
          { term: "Limited Liability", definition: "Shareholders only lose what they invested if the business fails" },
        ],
        explanation: "**Why firms grow:**\n- Economies of scale → lower costs\n- More market power → influence prices\n- Diversification → spread risk\n- Survival → bigger firms are harder to take over\n\n**How firms grow:**\n- **Internal (organic):** Reinvesting profits, expanding gradually\n- **External:** Mergers (two firms combine), takeovers (one firm buys another)\n\n**Economies of scale:** Buying in bulk, specialised machinery, better borrowing rates, spread marketing costs",
      },
      {
        title: "Workers & Wage Determination",
        definition: "Wages are determined by the demand for and supply of labour in different occupations.",
        keyTerms: [
          { term: "Derived Demand", definition: "Demand for workers depends on demand for the product they make" },
          { term: "Trade Union", definition: "Organisation that negotiates wages and conditions for workers" },
          { term: "Minimum Wage", definition: "The lowest legal hourly pay — a price floor in the labour market" },
        ],
        explanation: "**Why some workers earn more:**\n- Higher skills and qualifications\n- Dangerous or unpleasant jobs (compensating differential)\n- Experience and productivity\n- Strong trade unions\n- Scarce skills in high demand\n\n**Minimum wage debate:**\n- FOR: Reduces poverty, increases motivation, fairer society\n- AGAINST: May cause unemployment (if set above equilibrium), increased costs for businesses, may lead to inflation",
      },
      {
        title: "The Role of Government",
        definition: "Government intervenes to correct market failure, provide public goods, and redistribute income.",
        keyTerms: [
          { term: "Direct Tax", definition: "Tax on income or profits (e.g., income tax, corporation tax)" },
          { term: "Indirect Tax", definition: "Tax on spending (e.g., VAT, excise duty)" },
          { term: "Progressive Tax", definition: "Higher earners pay a higher percentage (e.g., income tax)" },
          { term: "Regressive Tax", definition: "Takes a larger proportion from lower earners (e.g., VAT)" },
        ],
        explanation: "**Reasons for intervention:** Externalities, public goods, merit goods, monopoly power, inequality, stabilise the economy\n**Methods:** Taxation, subsidies, regulation, price controls, state provision, minimum wage\n\n**Taxes can be:** Progressive (income tax — fairer), proportional (flat rate), regressive (VAT — harder on the poor)",
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
          { term: "Negative Externality", definition: "Harmful effect on others — e.g., pollution, noise, congestion" },
          { term: "Positive Externality", definition: "Beneficial effect on others — e.g., education benefits society, vaccination" },
          { term: "Social Cost", definition: "Private cost + external cost" },
          { term: "Social Benefit", definition: "Private benefit + external benefit" },
        ],
        explanation: "**Negative externalities → overproduction:**\nThe market produces too much because firms don't pay for the external costs. E.g., a factory polluting a river doesn't pay for the damage to fishermen.\n\n**Positive externalities → underproduction:**\nThe market produces too little because consumers don't consider the benefits to others. E.g., fewer people get vaccinated than is socially optimal.\n\n**Solutions:** Taxes (on negative), subsidies (on positive), regulation, tradable permits",
        diagram: "negative_externality",
        example: "A factory polluting a river creates a negative externality — the fishermen downstream bear costs they didn't cause.",
        examTip: "Always identify WHO the third party is and HOW they are affected.",
      },
      {
        title: "Government Intervention in Markets",
        definition: "Government uses taxes, subsidies, and regulations to correct market failure.",
        keyTerms: [
          { term: "Maximum Price", definition: "Price ceiling set below equilibrium — protects consumers but causes shortage" },
          { term: "Minimum Price", definition: "Price floor set above equilibrium — protects producers but causes surplus" },
          { term: "Government Failure", definition: "When intervention makes outcomes worse than the market" },
        ],
        explanation: "**Taxes:** Discourage consumption of demerit goods (e.g., cigarette tax → higher price → people buy less)\n**Subsidies:** Encourage consumption of merit goods (e.g., education funding → lower cost → more people attend)\n**Regulation:** Laws to limit pollution, ensure food safety, protect workers\n**Maximum price:** Helps consumers (e.g., rent controls) but creates shortages and black markets\n**Minimum price:** Helps producers (e.g., minimum wage) but may cause unemployment\n\n**Government failure:** Intervention can go wrong — unintended consequences, too much bureaucracy, not enough information to set the right tax/subsidy level",
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
          { term: "Economic Growth", definition: "An increase in real GDP — the economy produces more" },
          { term: "Inflation", definition: "A sustained rise in the general price level" },
          { term: "Unemployment", definition: "People able and willing to work but cannot find a job" },
          { term: "Balance of Payments", definition: "Record of all trade and financial flows with other countries" },
        ],
        explanation: "**These objectives can conflict:**\n- Reducing unemployment (boosting demand) may cause inflation\n- Controlling inflation (reducing demand) may cause unemployment\n- Growth may worsen the balance of payments (more imports)\n- Growth may damage the environment",
        examTip: "IGCSE often asks about conflicts between objectives — e.g., reducing unemployment may cause inflation. Always explain the trade-off.",
      },
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** uses government spending and taxation to influence the economy.",
        keyTerms: [
          { term: "Government Spending", definition: "Spending on public services — healthcare, education, defence, infrastructure" },
          { term: "Taxation", definition: "Money collected from individuals and businesses" },
          { term: "Budget Deficit", definition: "Spending > revenue → government borrows" },
          { term: "National Debt", definition: "Total accumulated borrowing over time" },
        ],
        explanation: "**Expansionary (to boost growth/cut unemployment):**\n- ↑spending or ↓taxes → more money in the economy → more demand → more jobs\n\n**Contractionary (to control inflation):**\n- ↓spending or ↑taxes → less money being spent → less demand pressure → prices stabilise\n\n**Budget deficit:** Government spends more than it collects in tax → must borrow\n**Budget surplus:** Government collects more than it spends → can repay debt",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** involves changing interest rates and money supply to influence the economy.",
        keyTerms: [
          { term: "Interest Rate", definition: "The cost of borrowing money and the reward for saving" },
          { term: "Central Bank", definition: "Sets interest rates and manages the financial system" },
        ],
        explanation: "**Lower interest rates (to boost economy):**\n- Borrowing cheaper → more spending and investment → growth and jobs\n- Less incentive to save → more spending\n- Mortgage payments fall → more disposable income\n- Exchange rate may fall → exports cheaper → more competitive\n\n**Higher interest rates (to control inflation):**\n- Borrowing costlier → less spending → less demand → prices stabilise\n- More incentive to save → less spending\n- Exchange rate may rise → imports cheaper → less inflation",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies to increase the productive capacity of the economy — shifting AS right.",
        explanation: "**Examples:**\n- **Education and training** → better skilled workers → higher productivity\n- **Infrastructure** (roads, ports, internet) → businesses more efficient\n- **Deregulation** → easier to start businesses → more competition\n- **Privatisation** → private firms may be more efficient than government\n- **Tax incentives** → encourage work and investment\n\n**Benefits:** Non-inflationary growth (more supply, not just more demand), improved competitiveness\n**Limitations:** Long time to work (years, not months), expensive, may increase inequality",
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
          { term: "GDP per capita", definition: "Total GDP divided by population — used to compare living standards between countries" },
          { term: "HDI", definition: "Human Development Index — combines income, education, and health" },
          { term: "Standard of Living", definition: "The level of material comfort measured by goods/services" },
          { term: "Quality of Life", definition: "Broader measure including health, environment, freedom, leisure" },
        ],
        explanation: "**GDP per capita limitations:**\n- Doesn't show inequality (rich/poor gap)\n- Ignores black market/informal economy\n- Doesn't measure happiness, leisure, or environment\n- Doesn't account for price differences between countries\n\n**HDI is better because:** It includes non-monetary factors (education and health), gives a broader picture of development\n\n**Other indicators:** Life expectancy, literacy rate, access to clean water, infant mortality rate",
      },
      {
        title: "Employment & Unemployment",
        definition: "Unemployment is measured as a percentage of the labour force. Different types have different causes and solutions.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by recession — not enough demand" },
          { term: "Structural", definition: "Caused by changes in the economy — old industries decline, new skills needed" },
          { term: "Frictional", definition: "Between jobs — natural and usually short-term" },
          { term: "Seasonal", definition: "Due to time of year (e.g., tourism workers in winter)" },
          { term: "Labour Force", definition: "All people of working age who are either employed or looking for work" },
        ],
        explanation: "**Consequences of unemployment:**\n- **For individuals:** Lower income, stress, loss of skills, reduced self-esteem\n- **For the economy:** Lower output, less tax revenue, higher benefit spending\n- **For society:** Crime, social problems, inequality\n\n**Solutions:**\n- Cyclical → boost demand (lower rates, increase spending)\n- Structural → retrain workers, improve education\n- Frictional → better job information, reduce search time\n- Seasonal → diversify the local economy",
      },
      {
        title: "Inflation & Deflation",
        definition: "**Inflation** is rising prices. **Deflation** is falling prices. Both can cause problems.",
        keyTerms: [
          { term: "Demand-Pull Inflation", definition: "Too much demand chasing too few goods" },
          { term: "Cost-Push Inflation", definition: "Rising production costs push up prices" },
          { term: "Hyperinflation", definition: "Extremely rapid inflation — money becomes worthless" },
        ],
        explanation: "**Inflation effects:**\n- Erodes purchasing power (your money buys less)\n- Savers lose out (savings worth less)\n- Borrowers benefit (debt becomes cheaper in real terms)\n- Creates uncertainty (businesses can't plan)\n- Exports become uncompetitive (higher prices)\n\n**Deflation effects:**\n- Consumers delay purchases (expect prices to fall further)\n- Firms cut wages/jobs (revenue falls)\n- Debt becomes harder to repay (real value increases)\n- Can lead to a deflationary spiral (lower spending → lower prices → lower spending)\n\n**Target:** Most countries aim for low, stable inflation (2%) — not zero, not high.",
        examTip: "Be prepared to explain why BOTH inflation and deflation are problematic. The ideal is low, stable inflation (around 2%).",
      },
      {
        title: "Poverty & Inequality",
        definition: "**Poverty** means lacking enough income to afford basic necessities. **Inequality** refers to uneven distribution of income/wealth.",
        keyTerms: [
          { term: "Absolute Poverty", definition: "Income too low to afford basic needs — food, shelter, clothing" },
          { term: "Relative Poverty", definition: "Income significantly below the average in that country" },
          { term: "Income Inequality", definition: "Gap between high earners and low earners" },
        ],
        explanation: "**Causes of poverty:** Low wages, unemployment, lack of education, discrimination, illness, old age, single parenthood\n\n**Government solutions:** Progressive taxation, minimum wage, benefits and welfare, free education and healthcare, job creation programmes\n\n**Causes of inequality:** Different skills/education, inheritance, discrimination, globalisation, tax policies",
        examTip: "Distinguish between absolute poverty (can't afford basics) and relative poverty (below average for that country). The solutions are different.",
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
          { term: "Tariff", definition: "A tax on imported goods — makes them more expensive" },
          { term: "Quota", definition: "A limit on the quantity of imports allowed" },
          { term: "Specialisation", definition: "Countries focus on what they produce most efficiently" },
        ],
        explanation: "**Benefits of free trade:** Lower prices for consumers, more variety and choice, specialisation (each country does what it's best at), economies of scale, encourages innovation and competition\n\n**Reasons for protection:** Protect domestic jobs, help infant industries grow, national security (e.g., food, defence), prevent dumping (selling below cost), protect the environment\n\n**Risks of protection:** Higher prices, retaliation from other countries (trade wars), inefficiency (no pressure to compete)",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the value of one currency expressed in terms of another.",
        keyTerms: [
          { term: "Floating Exchange Rate", definition: "Rate determined by supply and demand in currency markets" },
          { term: "Fixed Exchange Rate", definition: "Rate set and maintained by the government/central bank" },
          { term: "Appreciation", definition: "Currency becomes more valuable — imports cheaper, exports dearer" },
          { term: "Depreciation", definition: "Currency becomes less valuable — imports dearer, exports cheaper" },
        ],
        explanation: "**Appreciation (stronger currency):**\n- Imports cheaper → good for consumers buying foreign goods\n- Exports dearer → bad for businesses selling abroad\n- Can reduce inflation (cheaper imports)\n\n**Depreciation (weaker currency):**\n- Imports dearer → higher prices, cost-push inflation\n- Exports cheaper → good for businesses, more competitive\n- Can improve the trade balance\n\n**Determined by:** Interest rates, trade flows, speculation, inflation rates, economic performance",
        examTip: "Use the SPICED mnemonic: Strong Pound = Imports Cheap, Exports Dear.",
      },
      {
        title: "Balance of Payments",
        definition: "The **balance of payments** records all money flowing in and out of a country from trade and financial transactions.",
        keyTerms: [
          { term: "Current Account", definition: "Records trade in goods and services, plus income flows" },
          { term: "Trade Deficit", definition: "Imports of goods/services exceed exports" },
          { term: "Trade Surplus", definition: "Exports exceed imports" },
        ],
        explanation: "**Trade deficit causes:** Strong currency (imports cheap), high consumer demand for imports, uncompetitive domestic firms, natural resources must be imported\n\n**Policies to correct deficit:**\n- Depreciate currency → exports cheaper\n- Supply-side policies → improve competitiveness\n- Protectionism → limit imports (but risks retaliation)\n- Deflation → reduce spending on imports (but causes unemployment)",
      },
      {
        title: "Economic Development",
        definition: "**Development** is broader than growth — it includes improvements in health, education, and quality of life.",
        keyTerms: [
          { term: "Developing Country", definition: "Low GDP per capita, poor health/education indicators" },
          { term: "HDI", definition: "Combines income, education, and life expectancy to measure development" },
          { term: "Aid", definition: "Money, goods, or expertise given by one country to another" },
          { term: "FDI", definition: "Foreign Direct Investment — when a foreign company invests in your country" },
        ],
        explanation: "**Barriers to development:** Poverty trap (too poor to invest), corruption and poor governance, poor infrastructure (roads, water, electricity), conflict and instability, climate and natural disasters, debt burden, trade dependency (relying on one export), brain drain (skilled workers leaving), disease (HIV, malaria)\n\n**Policies for development:**\n- Aid (bilateral/multilateral) — helps but may create dependency\n- Trade — 'trade not aid' — but developing countries need to be competitive\n- FDI — creates jobs and transfers technology, but profits may leave\n- Microfinance — small loans to entrepreneurs (especially women)\n- Education investment — long-term but essential\n- Debt relief — frees up money for development spending\n- Fair trade — ensures farmers get fair prices",
        examTip: "IGCSE frequently asks whether aid or trade is better for development. Present both sides with examples. There's no single right answer — it depends on the country's specific circumstances.",
      },
    ],
  },
];
