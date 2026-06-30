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
        example: "A farmer using land to grow wheat gives up the opportunity to use it for cattle · the opportunity cost is the cattle production foregone.",
        examTip: "IGCSE examiners want you to always state 'the NEXT BEST alternative' · not just 'what you give up'.",
      },
      {
        title: "Factors of Production",
        definition: "The four categories of resources used to produce goods and services.",
        keyTerms: [
          { term: "Land", definition: "All natural resources · soil, minerals, water, forests, climate" },
          { term: "Labour", definition: "The human effort used in production · physical and mental" },
          { term: "Capital", definition: "Man-made aids to production · machinery, tools, factories, roads" },
          { term: "Enterprise", definition: "The skill of organising other factors, taking risks, and making decisions" },
        ],
        explanation: "**Rewards for each factor:**\n- Land → **Rent**\n- Labour → **Wages**\n- Capital → **Interest**\n- Enterprise → **Profit**\n\n**Labour is mobile** · workers can move between jobs (occupational mobility) and locations (geographical mobility). But mobility is limited by skills, housing costs, and family ties.",
      },
      {
        title: "Production Possibility Curves",
        definition: "A **PPC** shows the maximum possible output of two goods with available resources.",
        diagram: "ppf",
        explanation: "Points on the curve = efficient (all resources used well)\nPoints inside = resources are wasted or unemployed\nPoints outside = not possible with current resources\nCurve shifts outward = economic growth (more resources or better technology)\nMovement along = opportunity cost of producing more of one good\n\n**Shape:** Concave (bowing outward) because of increasing opportunity costs · resources are not equally suited to producing both goods.\n\n**Straight line PPC:** If opportunity cost is constant (unusual in reality)",
      },
      {
        title: "Economic Systems",
        definition: "Different countries use different systems to decide what, how, and for whom to produce.",
        keyTerms: [
          { term: "Market Economy", definition: "Decisions made by consumers and firms through the price mechanism" },
          { term: "Command/Planned Economy", definition: "Government makes all decisions about resource allocation" },
          { term: "Mixed Economy", definition: "Combination of market forces and government control" },
          { term: "Transition Economy", definition: "An economy moving from command to market (e.g., China, Vietnam)" },
        ],
        explanation: "**Market economy advantages:** Consumer choice, competition drives innovation, efficient allocation, rewards hard work\n**Market economy disadvantages:** Market failure, inequality, no public goods, instability, exploitation\n\n**Command economy advantages:** Greater equality, public goods provided, full employment, less pollution (potentially)\n**Command economy disadvantages:** Inefficiency, lack of incentives, no consumer choice, bureaucracy, corruption\n\n**Most countries are mixed** · the question is how much government intervention there should be.\n\n**Transition economies:** China moved from command to mixed since 1978 · rapid growth but increasing inequality. Russia's transition in the 1990s caused economic collapse before recovery.",
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
        explanation: "**How it works:**\n1. High demand → price rises → signal to produce more → more resources allocated\n2. Low demand → price falls → signal to produce less → resources move elsewhere\n3. The price mechanism works without any central planning · it's the 'invisible hand' (Adam Smith)\n\n**Limitations of the price mechanism:**\n- Doesn't provide public goods (free rider problem)\n- Produces too much of goods with negative externalities\n- Produces too little of goods with positive externalities\n- May lead to inequality\n- Information failure can distort choices",
      },
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to buy at each price.",
        explanation: "**Demand curve slopes downward** · higher price = lower quantity demanded (because of income effect and substitution effect)\n\n**Income effect:** Higher price → your real income falls → you can buy less\n**Substitution effect:** Higher price → you switch to cheaper alternatives\n\n**Shifts caused by:**\n- Income (higher income → more demand for normal goods, less for inferior goods)\n- Tastes and preferences (new fashion → more demand)\n- Population (more people → more demand)\n- Price of substitutes (if substitute gets expensive → your demand rises)\n- Price of complements (if complement gets expensive → your demand falls)\n- Advertising (more advertising → more demand)\n- Expectations (if you expect price to rise → buy now)\n- Interest rates (lower rates → more borrowing → more demand)",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price.",
        explanation: "**Supply curve slopes upward** · higher price = higher quantity supplied (more profitable to produce)\n\n**Shifts caused by:**\n- Costs of production (higher wages/materials → supply shifts left)\n- Technology (better tech → supply shifts right → more produced at each price)\n- Taxes (indirect tax → supply shifts left → higher costs)\n- Subsidies (government payment → supply shifts right → lower costs)\n- Weather (bad weather → supply of crops shifts left)\n- Number of firms (more firms → supply shifts right)\n- Government regulation (stricter rules → higher costs → supply shifts left)",
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
        explanation: "**How markets adjust:**\n1. Price too low → shortage → buyers bid up prices → equilibrium\n2. Price too high → surplus → sellers cut prices → equilibrium\n\n**Changes in equilibrium:**\n- Demand increases → price rises AND quantity rises\n- Demand decreases → price falls AND quantity falls\n- Supply increases → price falls AND quantity rises\n- Supply decreases → price rises AND quantity falls",
        examTip: "For structured questions, always draw a diagram. Label axes (Price on Y, Quantity on X), curves (D, S), equilibrium price (Pe) and quantity (Qe).",
      },
      {
        title: "Price Elasticity of Demand",
        definition: "**PED** measures how much quantity demanded responds to a change in price.",
        formula: "PED = % change in quantity demanded ÷ % change in price",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Demand is responsive · e.g., luxury goods, many substitutes" },
          { term: "Inelastic (PED < 1)", definition: "Demand is unresponsive · e.g., necessities, addictive goods" },
          { term: "Unit Elastic (PED = 1)", definition: "Proportionate response · revenue stays the same" },
        ],
        explanation: "**What makes demand elastic?**\n- Many substitutes available\n- The good is a luxury\n- Takes up a large share of income\n- Long time to adjust\n\n**What makes demand inelastic?**\n- Few substitutes\n- Necessity or addictive\n- Small share of income\n- Short time period\n\n**Significance for firms:** If demand is inelastic, raising price increases total revenue. If elastic, lowering price increases revenue.\n\n**Significance for government:** Taxes on inelastic goods (cigarettes, petrol) raise more revenue because demand doesn't fall much.",
        example: "Water is price inelastic · people need it regardless of price. Designer handbags are elastic · people buy less when prices rise.",
      },
      {
        title: "Price Elasticity of Supply",
        definition: "**PES** measures how much quantity supplied responds to a change in price.",
        formula: "PES = % change in quantity supplied ÷ % change in price",
        keyTerms: [
          { term: "Elastic Supply", definition: "Firms can easily increase output when price rises" },
          { term: "Inelastic Supply", definition: "Firms struggle to increase output quickly" },
        ],
        explanation: "**Determinants of PES:**\n- Spare capacity (more capacity = more elastic)\n- Time period (longer = more elastic)\n- Stocks/inventories (more stocks = more elastic)\n- Ease of switching production\n- Availability of raw materials and labour\n\n**Examples:** Agricultural supply is inelastic short-run (crops take months). Manufacturing can be more elastic (adjust production lines). Digital goods are almost perfectly elastic (zero cost to copy).",
      },
    ],
  },
  {
    name: "Microeconomic Decision Makers",
    subtopics: [
      {
        title: "Money & Banking",
        definition: "**Money** is anything widely accepted as payment for goods and services. It overcomes the inefficiency of **barter**, which needs a 'double coincidence of wants'.",
        keyTerms: [
          { term: "Medium of Exchange", definition: "Money is accepted in return for goods and services" },
          { term: "Store of Value", definition: "Money holds its purchasing power over time, so it can be saved" },
          { term: "Unit of Account", definition: "Money gives a common measure to compare the value of goods" },
          { term: "Standard of Deferred Payment", definition: "Money allows buying now and paying later (credit)" },
          { term: "Central Bank", definition: "A country's main monetary authority · issues currency and sets interest rates" },
          { term: "Commercial Bank", definition: "A high-street bank that accepts deposits and lends to households and firms" },
        ],
        explanation: "**Forms of money:** cash (notes and coins) and bank deposits (money held in current/savings accounts, used via cards, transfers and cheques).\n\n**Characteristics of good money:** durable, portable, divisible, acceptable, limited in supply (scarce), recognisable and hard to forge.\n\n**Role of the central bank:**\n- Issues notes and coins (the currency)\n- Acts as banker to the government and to commercial banks\n- Sets interest rates and controls the money supply\n- Acts as lender of last resort to banks in difficulty\n- Helps maintain a stable financial system and exchange rate\n\n**Role of commercial banks:**\n- Accept deposits and keep customers' money safe\n- Lend to households and firms (loans, overdrafts, mortgages)\n- Enable payments (debit/credit cards, transfers, cheques)\n- Pay interest on savings and provide services such as foreign exchange",
        examTip: "A common IGCSE question asks for the functions OR characteristics of money · learn the four functions and the key characteristics, and be able to distinguish the role of the central bank from commercial banks.",
      },
      {
        title: "The Role of Firms",
        definition: "Firms combine factors of production to produce goods and services for sale in markets.",
        keyTerms: [
          { term: "Sole Trader", definition: "One person owns the business · unlimited liability" },
          { term: "Partnership", definition: "Two or more people share ownership · unlimited liability" },
          { term: "Private Limited Company (Ltd)", definition: "Separate legal entity · limited liability, shares not publicly traded" },
          { term: "Public Limited Company (PLC)", definition: "Shares traded on stock exchange · limited liability" },
          { term: "Unlimited Liability", definition: "Owner personally responsible for ALL business debts" },
          { term: "Limited Liability", definition: "Shareholders only lose what they invested if the business fails" },
          { term: "Multinational Corporation", definition: "A firm that operates in two or more countries" },
        ],
        explanation: "**Why firms grow:**\n- Economies of scale → lower costs\n- More market power → influence prices\n- Diversification → spread risk\n- Survival → bigger firms are harder to take over\n\n**How firms grow:**\n- **Internal (organic):** Reinvesting profits, expanding gradually\n- **External:** Mergers (two firms combine), takeovers (one firm buys another)\n- **Horizontal:** Merging with a firm at the same stage of production\n- **Vertical:** Merging with a firm at a different stage (forward or backward)\n- **Conglomerate:** Merging with a firm in a different industry\n\n**Economies of scale:** Buying in bulk, specialised machinery, better borrowing rates, spread marketing costs\n**Diseconomies of scale:** Communication problems, co-ordination failures, demotivation",
      },
      {
        title: "Costs, Revenue & Profit",
        definition: "Firms aim to make a **profit** · the difference between total revenue and total costs.",
        keyTerms: [
          { term: "Total Cost", definition: "Fixed costs + variable costs" },
          { term: "Fixed Costs", definition: "Costs that don't change with output (e.g., rent, insurance)" },
          { term: "Variable Costs", definition: "Costs that change with output (e.g., raw materials, wages)" },
          { term: "Total Revenue", definition: "Price × quantity sold" },
          { term: "Profit", definition: "Total revenue − total costs" },
          { term: "Average Cost", definition: "Total cost ÷ quantity · cost per unit" },
        ],
        explanation: "**Break-even:** Where total revenue = total costs (profit = 0)\n**Above break-even:** Making a profit\n**Below break-even:** Making a loss\n\n**Why average costs fall then rise:**\n- Initially: spreading fixed costs over more units → AC falls\n- Eventually: overcrowding, management problems → AC rises\n- This gives a U-shaped average cost curve",
        formula: "Profit = Total Revenue − Total Cost\nAverage Cost = Total Cost ÷ Quantity",
      },
      {
        title: "Workers & Wage Determination",
        definition: "Wages are determined by the demand for and supply of labour in different occupations.",
        keyTerms: [
          { term: "Derived Demand", definition: "Demand for workers depends on demand for the product they make" },
          { term: "Trade Union", definition: "Organisation that negotiates wages and conditions for workers" },
          { term: "Minimum Wage", definition: "The lowest legal hourly pay · a price floor in the labour market" },
          { term: "Human Capital", definition: "The skills, knowledge, and experience that make workers productive" },
        ],
        explanation: "**Why some workers earn more:**\n- Higher skills and qualifications (doctors, lawyers)\n- Dangerous or unpleasant jobs (compensating differential)\n- Experience and productivity\n- Strong trade unions bargaining for higher wages\n- Scarce skills in high demand (IT specialists)\n- Long training periods (surgeons · 10+ years)\n\n**Minimum wage debate:**\n- FOR: Reduces poverty, increases motivation, fairer society, reduces inequality\n- AGAINST: May cause unemployment (if set above equilibrium), increased costs for businesses, may lead to inflation, may reduce hours offered\n\n**Gender pay gap:** Women earn on average 14% less than men in the UK. Causes: career breaks, part-time work, occupational segregation, discrimination.",
      },
      {
        title: "The Role of Government",
        definition: "Government intervenes to correct market failure, provide public goods, and redistribute income.",
        keyTerms: [
          { term: "Direct Tax", definition: "Tax on income or profits (e.g., income tax, corporation tax)" },
          { term: "Indirect Tax", definition: "Tax on spending (e.g., VAT, excise duty)" },
          { term: "Progressive Tax", definition: "Higher earners pay a higher percentage (e.g., income tax)" },
          { term: "Regressive Tax", definition: "Takes a larger proportion from lower earners (e.g., VAT)" },
          { term: "Proportional Tax", definition: "Same percentage for everyone regardless of income" },
        ],
        explanation: "**Reasons for intervention:** Externalities, public goods, merit goods, monopoly power, inequality, stabilise the economy\n**Methods:** Taxation, subsidies, regulation, price controls, state provision, minimum wage, information campaigns\n\n**Taxes can be:** Progressive (income tax · fairer), proportional (flat rate), regressive (VAT · harder on the poor)\n\n**Principles of a good tax system:** Fair (progressive), simple, cheap to collect, difficult to avoid, doesn't distort behaviour too much",
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
          { term: "Negative Externality", definition: "Harmful effect on others · e.g., pollution, noise, congestion" },
          { term: "Positive Externality", definition: "Beneficial effect on others · e.g., education benefits society, vaccination" },
          { term: "Social Cost", definition: "Private cost + external cost" },
          { term: "Social Benefit", definition: "Private benefit + external benefit" },
        ],
        explanation: "**Negative externalities → overproduction:**\nThe market produces too much because firms don't pay for the external costs. E.g., a factory polluting a river doesn't pay for the damage to fishermen.\n\n**Positive externalities → underproduction:**\nThe market produces too little because consumers don't consider the benefits to others. E.g., fewer people get vaccinated than is socially optimal.\n\n**Solutions:** Taxes (on negative), subsidies (on positive), regulation, tradable permits, bans\n\n**Social cost = private cost + external cost.** If social cost > private cost, there is a negative externality and the market overproduces.",
        diagram: "negative_externality",
        example: "A factory polluting a river creates a negative externality · the fishermen downstream bear costs they didn't cause.",
        examTip: "Always identify WHO the third party is and HOW they are affected.",
      },
      {
        title: "Public Goods & Merit/Demerit Goods",
        definition: "Different types of goods cause different types of market failure.",
        keyTerms: [
          { term: "Public Good", definition: "Non-excludable and non-rivalrous (e.g., street lighting, national defence)" },
          { term: "Merit Good", definition: "Underconsumed because people underestimate the benefits (e.g., education)" },
          { term: "Demerit Good", definition: "Overconsumed because people underestimate the harm (e.g., cigarettes)" },
          { term: "Free Rider Problem", definition: "People use public goods without paying → private firms can't profit → don't provide them" },
        ],
        explanation: "**Public goods:** Complete market failure → government must provide\n**Merit goods:** Partial market failure → subsidise or provide free\n**Demerit goods:** Partial market failure → tax, regulate, or ban\n\n**Examples of each:**\n- Public: street lighting, national defence, flood defences, public parks\n- Merit: education, healthcare, vaccines, museums, public libraries\n- Demerit: cigarettes, alcohol, drugs, gambling, junk food",
      },
      {
        title: "Government Intervention in Markets",
        definition: "Government uses taxes, subsidies, and regulations to correct market failure.",
        keyTerms: [
          { term: "Maximum Price", definition: "Price ceiling set below equilibrium · protects consumers but causes shortage" },
          { term: "Minimum Price", definition: "Price floor set above equilibrium · protects producers but causes surplus" },
          { term: "Government Failure", definition: "When intervention makes outcomes worse than the market" },
        ],
        explanation: "**Taxes:** Discourage consumption of demerit goods (e.g., cigarette tax → higher price → people buy less)\n**Subsidies:** Encourage consumption of merit goods (e.g., education funding → lower cost → more people attend)\n**Regulation:** Laws to limit pollution, ensure food safety, protect workers\n**Maximum price:** Helps consumers (e.g., rent controls) but creates shortages and black markets\n**Minimum price:** Helps producers (e.g., minimum wage) but may cause unemployment\n\n**Government failure:** Intervention can go wrong · unintended consequences, too much bureaucracy, not enough information to set the right tax/subsidy level, corruption, political self-interest",
        diagram: "tax_incidence",
      },
      {
        title: "Environmental Market Failure",
        definition: "Environmental damage is a key example of negative externalities · the market overproduces pollution because firms don't pay the full social cost.",
        keyTerms: [
          { term: "Carbon Emissions", definition: "CO₂ released by burning fossil fuels · contributes to climate change" },
          { term: "Sustainability", definition: "Meeting present needs without compromising future generations' ability to meet theirs" },
          { term: "Renewable Energy", definition: "Energy from sources that won't run out · solar, wind, hydro" },
        ],
        explanation: "**Why the market fails on the environment:**\n- Firms don't pay for pollution (external cost)\n- Consumers don't pay the full environmental cost of products\n- Future generations can't voice their preferences\n- Common resources (air, oceans) have no owner → tragedy of the commons\n\n**Solutions:**\n- Carbon taxes (make firms pay for emissions)\n- Tradable pollution permits (cap-and-trade)\n- Regulation (emission standards, fuel efficiency rules)\n- Subsidies for renewables\n- International agreements (Paris Agreement)\n\n**Difficulty:** Environmental problems are global · one country acting alone has limited impact. Free rider problem at the international level.",
        examTip: "Environmental questions are increasingly common at IGCSE. Link to sustainability, future generations, and the difficulty of international cooperation.",
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
        definition: "Governments aim for: **economic growth**, **low unemployment**, **low inflation**, a **healthy balance of payments**, and an **equitable redistribution of income** (reducing the gap between rich and poor).",
        keyTerms: [
          { term: "Economic Growth", definition: "An increase in real GDP · the economy produces more" },
          { term: "Inflation", definition: "A sustained rise in the general price level" },
          { term: "Unemployment", definition: "People able and willing to work but cannot find a job" },
          { term: "Balance of Payments", definition: "Record of all trade and financial flows with other countries" },
          { term: "Redistribution of Income", definition: "Government action (e.g. progressive taxes and welfare benefits) to reduce inequality and create a fairer distribution of income" },
        ],
        explanation: "**These objectives can conflict:**\n- Reducing unemployment (boosting demand) may cause inflation\n- Controlling inflation (reducing demand) may cause unemployment\n- Growth may worsen the balance of payments (more imports)\n- Growth may damage the environment\n- Pursuing growth/efficiency may worsen income inequality, conflicting with redistribution\n\n**The ideal:** Steady growth (2-3%), low inflation (2%), low unemployment, balanced trade, and a fairer (more equitable) distribution of income. But achieving ALL at once is very difficult · there are always trade-offs.",
        examTip: "IGCSE often asks about conflicts between objectives · e.g., reducing unemployment may cause inflation. Always explain the trade-off.",
      },
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** uses government spending and taxation to influence the economy.",
        keyTerms: [
          { term: "Government Spending", definition: "Spending on public services · healthcare, education, defence, infrastructure" },
          { term: "Taxation", definition: "Money collected from individuals and businesses" },
          { term: "Budget Deficit", definition: "Spending > revenue → government borrows" },
          { term: "National Debt", definition: "Total accumulated borrowing over time" },
        ],
        explanation: "**Expansionary (to boost growth/cut unemployment):**\n- ↑spending or ↓taxes → more money in the economy → more demand → more jobs\n\n**Contractionary (to control inflation):**\n- ↓spending or ↑taxes → less money being spent → less demand pressure → prices stabilise\n\n**Budget deficit:** Government spends more than it collects in tax → must borrow\n**Budget surplus:** Government collects more than it spends → can repay debt\n\n**Types of tax:**\n- Direct (income tax, corporation tax) · on income/profits\n- Indirect (VAT, customs duties) · on spending\n- Progressive (higher earners pay more) · reduces inequality\n- Regressive (hits lower earners harder) · increases inequality",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** involves changing interest rates and money supply to influence the economy.",
        keyTerms: [
          { term: "Interest Rate", definition: "The cost of borrowing money and the reward for saving" },
          { term: "Central Bank", definition: "Sets interest rates and manages the financial system" },
          { term: "Money Supply", definition: "The total amount of money circulating in the economy" },
        ],
        explanation: "**Lower interest rates (to boost economy):**\n- Borrowing cheaper → more spending and investment → growth and jobs\n- Less incentive to save → more spending\n- Mortgage payments fall → more disposable income\n- Exchange rate may fall → exports cheaper → more competitive\n\n**Higher interest rates (to control inflation):**\n- Borrowing costlier → less spending → less demand → prices stabilise\n- More incentive to save → less spending\n- Exchange rate may rise → imports cheaper → less inflation\n\n**Limitations:**\n- Takes time to work (time lags of 18-24 months)\n- May not work if confidence is very low\n- Interest rates can't go much below zero (liquidity trap)",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies to increase the productive capacity of the economy · shifting AS right.",
        explanation: "**Examples:**\n- **Education and training** → better skilled workers → higher productivity\n- **Infrastructure** (roads, ports, internet) → businesses more efficient\n- **Deregulation** → easier to start businesses → more competition\n- **Privatisation** → private firms may be more efficient than government\n- **Tax incentives** → encourage work and investment\n- **Healthcare improvement** → healthier, more productive workforce\n- **Immigration** → more workers, new skills\n\n**Benefits:** Non-inflationary growth (more supply, not just more demand), improved competitiveness, more jobs\n**Limitations:** Long time to work (years, not months), expensive, may increase inequality, benefits uncertain, government may choose wrong sectors to support",
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
          { term: "GDP per capita", definition: "Total GDP divided by population · used to compare living standards between countries" },
          { term: "HDI", definition: "Human Development Index · combines income, education, and health" },
          { term: "Standard of Living", definition: "The level of material comfort measured by goods/services" },
          { term: "Quality of Life", definition: "Broader measure including health, environment, freedom, leisure" },
        ],
        explanation: "**GDP per capita limitations:**\n- Doesn't show inequality (rich/poor gap)\n- Ignores black market/informal economy (up to 30% in developing countries)\n- Doesn't measure happiness, leisure, or environment\n- Doesn't account for price differences between countries\n- Doesn't measure quality improvements\n\n**HDI is better because:** It includes non-monetary factors (education and health), gives a broader picture of development. Ranges from 0 to 1 (Norway ≈ 0.96, Niger ≈ 0.39).\n\n**Other indicators:** Life expectancy, literacy rate, access to clean water, infant mortality rate, Gini coefficient (inequality)",
      },
      {
        title: "Employment & Unemployment",
        definition: "Unemployment is measured as a percentage of the labour force. Different types have different causes and solutions.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by recession · not enough demand" },
          { term: "Structural", definition: "Caused by changes in the economy · old industries decline, new skills needed" },
          { term: "Frictional", definition: "Between jobs · natural and usually short-term" },
          { term: "Seasonal", definition: "Due to time of year (e.g., tourism workers in winter)" },
          { term: "Labour Force", definition: "All people of working age who are either employed or looking for work" },
          { term: "Underemployment", definition: "Working fewer hours or in a lower-skilled job than desired" },
        ],
        explanation: "**Consequences of unemployment:**\n- **For individuals:** Lower income, stress, loss of skills, reduced self-esteem, health problems\n- **For the economy:** Lower output, less tax revenue, higher benefit spending, wasted resources\n- **For society:** Crime, social problems, inequality, community decline\n\n**Solutions:**\n- Cyclical → boost demand (lower rates, increase spending)\n- Structural → retrain workers, improve education\n- Frictional → better job information, reduce search time\n- Seasonal → diversify the local economy\n\n**Hidden unemployment:** Some people stop looking for work and are not counted. Official statistics may underestimate the true problem.",
      },
      {
        title: "Inflation & Deflation",
        definition: "**Inflation** is rising prices. **Deflation** is falling prices. Both can cause problems.",
        keyTerms: [
          { term: "Demand-Pull Inflation", definition: "Too much demand chasing too few goods" },
          { term: "Cost-Push Inflation", definition: "Rising production costs push up prices" },
          { term: "Hyperinflation", definition: "Extremely rapid inflation · money becomes worthless" },
          { term: "Consumer Price Index", definition: "A basket of goods used to measure the average price level" },
        ],
        explanation: "**Inflation effects:**\n- Erodes purchasing power (your money buys less)\n- Savers lose out (savings worth less in real terms)\n- Borrowers benefit (debt becomes cheaper in real terms)\n- Creates uncertainty (businesses can't plan)\n- Exports become uncompetitive (higher prices)\n- Fixed income earners suffer (wages don't adjust)\n\n**Deflation effects:**\n- Consumers delay purchases (expect prices to fall further)\n- Firms cut wages/jobs (revenue falls)\n- Debt becomes harder to repay (real value increases)\n- Can lead to a deflationary spiral (lower spending → lower prices → lower spending)\n\n**Target:** Most countries aim for low, stable inflation (2%) · not zero, not high.\n\n**Hyperinflation examples:** Zimbabwe (2008) · prices doubled every 24 hours. Venezuela (2018) · 1,000,000% inflation.",
        examTip: "Be prepared to explain why BOTH inflation and deflation are problematic. The ideal is low, stable inflation (around 2%).",
      },
      {
        title: "Poverty & Inequality",
        definition: "**Poverty** means lacking enough income to afford basic necessities. **Inequality** refers to uneven distribution of income/wealth.",
        keyTerms: [
          { term: "Absolute Poverty", definition: "Income too low to afford basic needs · food, shelter, clothing" },
          { term: "Relative Poverty", definition: "Income significantly below the average in that country" },
          { term: "Income Inequality", definition: "Gap between high earners and low earners" },
          { term: "Wealth Inequality", definition: "Gap between those with many assets and those with few" },
        ],
        explanation: "**Causes of poverty:** Low wages, unemployment, lack of education, discrimination, illness, old age, single parenthood, rapid population growth, poor governance\n\n**Government solutions:** Progressive taxation, minimum wage, benefits and welfare, free education and healthcare, job creation programmes, land reform, anti-discrimination laws\n\n**Causes of inequality:** Different skills/education, inheritance, discrimination, globalisation, tax policies, market power\n\n**Does inequality matter?** Some argue inequality provides incentives (work hard → earn more). Others argue extreme inequality is unfair, reduces social mobility, and causes social problems.",
        examTip: "Distinguish between absolute poverty (can't afford basics) and relative poverty (below average for that country). The solutions are different.",
      },
      {
        title: "Population & Labour Force",
        definition: "Population size and structure affect economic performance and living standards.",
        keyTerms: [
          { term: "Birth Rate", definition: "Number of births per 1,000 population per year" },
          { term: "Death Rate", definition: "Number of deaths per 1,000 population per year" },
          { term: "Net Migration", definition: "Immigration minus emigration" },
          { term: "Ageing Population", definition: "Rising proportion of elderly people in the population" },
          { term: "Dependency Ratio", definition: "Ratio of dependents (young + old) to working-age population" },
        ],
        explanation: "**Rapid population growth (developing countries):**\n- Pressure on resources, education, healthcare\n- More mouths to feed → lower living standards\n- But: larger future workforce, more consumers\n\n**Ageing population (developed countries):**\n- Higher pension costs → government spending rises\n- More healthcare needed → pressure on NHS\n- Smaller workforce → less tax revenue\n- But: experience and skills, 'silver economy'\n\n**Migration effects:**\n- Immigration: fills skill gaps, increases tax revenue, cultural diversity, but pressure on public services, potential wage depression for locals\n- Emigration: remittances sent home, but brain drain (losing skilled workers)",
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
          { term: "Tariff", definition: "A tax on imported goods · makes them more expensive" },
          { term: "Quota", definition: "A limit on the quantity of imports allowed" },
          { term: "Specialisation", definition: "Countries focus on what they produce most efficiently" },
          { term: "Embargo", definition: "A complete ban on trade with a particular country" },
        ],
        explanation: "**Benefits of free trade:** Lower prices for consumers, more variety and choice, specialisation (each country does what it's best at), economies of scale, encourages innovation and competition, access to resources\n\n**Reasons for protection:** Protect domestic jobs, help infant industries grow, national security (e.g., food, defence), prevent dumping (selling below cost), protect the environment, raise government revenue (tariff revenue)\n\n**Risks of protection:** Higher prices for consumers, retaliation from other countries (trade wars), inefficiency (no pressure to compete), reduced consumer choice",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the value of one currency expressed in terms of another.",
        keyTerms: [
          { term: "Floating Exchange Rate", definition: "Rate determined by supply and demand in currency markets" },
          { term: "Fixed Exchange Rate", definition: "Rate set and maintained by the government/central bank" },
          { term: "Managed Float", definition: "Mainly floating, but central bank intervenes sometimes" },
          { term: "Appreciation", definition: "Currency becomes more valuable · imports cheaper, exports dearer" },
          { term: "Depreciation", definition: "Currency becomes less valuable · imports dearer, exports cheaper" },
        ],
        explanation: "**Appreciation (stronger currency):**\n- Imports cheaper → good for consumers buying foreign goods\n- Exports dearer → bad for businesses selling abroad\n- Can reduce inflation (cheaper imports)\n\n**Depreciation (weaker currency):**\n- Imports dearer → higher prices, cost-push inflation\n- Exports cheaper → good for businesses, more competitive\n- Can improve the trade balance\n\n**Determined by:** Interest rates, trade flows, speculation, inflation rates, economic performance, political stability\n\n**Fixed vs floating:**\n- Fixed: stability, certainty, low inflation, but needs reserves, may be wrong level\n- Floating: automatic adjustment, monetary freedom, but volatility, uncertainty",
        examTip: "Use the SPICED mnemonic: Strong Pound = Imports Cheap, Exports Dear.",
      },
      {
        title: "Balance of Payments",
        definition: "The **balance of payments** records all financial transactions between a country and the rest of the world.",
        keyTerms: [
          { term: "Current Account", definition: "Records trade in goods, services, and income flows" },
          { term: "Current Account Deficit", definition: "Imports exceed exports · more money flowing out" },
          { term: "Current Account Surplus", definition: "Exports exceed imports · more money flowing in" },
          { term: "Capital/Financial Account", definition: "Records investment flows in and out of the country" },
        ],
        explanation: "**Current account components:**\n- Trade in goods (visible trade)\n- Trade in services (invisible trade · tourism, financial services)\n- Income from investments abroad\n- Transfers (aid, remittances)\n\n**Causes of deficit:** Strong currency (imports cheap), high consumer demand for imports, uncompetitive domestic firms, natural resources must be imported\n\n**Solutions:** Depreciate currency → exports cheaper. Supply-side policies → improve competitiveness. Protectionism → limit imports (but risks retaliation).",
      },
      {
        title: "Globalisation",
        definition: "**Globalisation** is the increasing interconnection of the world's economies through trade, investment, and migration.",
        keyTerms: [
          { term: "Multinational Corporation (MNC)", definition: "A company operating in more than one country" },
          { term: "Foreign Direct Investment", definition: "Companies investing in productive capacity in other countries" },
          { term: "Interdependence", definition: "Countries depending on each other for trade and resources" },
          { term: "Trading Bloc", definition: "Group of countries with reduced trade barriers (e.g., EU, ASEAN)" },
        ],
        explanation: "**Benefits:**\n- Lower prices through competition and specialisation\n- More choice for consumers\n- Technology transfer to developing countries\n- Job creation in developing countries\n- Economic growth and poverty reduction\n\n**Costs:**\n- Job losses in developed countries (outsourcing)\n- Environmental damage (more production, transport)\n- Exploitation of workers (low wages, poor conditions)\n- Cultural erosion (local traditions lost)\n- Growing inequality within countries\n- Tax avoidance by MNCs\n\n**Impact on developing countries:** Mixed · brings jobs and technology but also dependency and exploitation. Benefits depend on governance, regulation, and institutions.",
        examTip: "IGCSE examiners want balanced answers. Always give advantages AND disadvantages, with examples from both developed and developing countries.",
      },
      {
        title: "Economic Development",
        definition: "**Economic development** means improving living standards, reducing poverty, and increasing opportunities · it's broader than just economic growth.",
        keyTerms: [
          { term: "GDP per capita", definition: "Total GDP divided by population · average income per person" },
          { term: "HDI", definition: "Human Development Index · combines income, education, and health (0 to 1)" },
          { term: "Developing Country", definition: "Low GDP per capita, limited infrastructure, high poverty rates" },
          { term: "Developed Country", definition: "High GDP per capita, good infrastructure, low poverty rates" },
          { term: "Aid", definition: "Financial or material help given by one country to another" },
        ],
        explanation: "**Indicators of development:**\n- GDP per capita (but doesn't show inequality)\n- HDI (broader · includes health and education)\n- Life expectancy, infant mortality\n- Literacy rate, years of schooling\n- Access to clean water, sanitation\n\n**Barriers to development:**\n- Corruption and poor governance\n- Lack of infrastructure (roads, electricity, internet)\n- Debt burden (interest payments divert spending)\n- Over-dependence on primary commodities\n- Climate change and natural disasters\n- Conflict and political instability\n- Disease (HIV/AIDS, malaria)\n- Rapid population growth\n- Brain drain (skilled workers emigrate)\n\n**How to promote development:**\n- Aid (but may create dependency)\n- Trade (but may expose weak industries)\n- FDI (creates jobs but profits leave)\n- Education investment (long-term but essential)\n- Infrastructure (roads, electricity, internet)\n- Good governance (rule of law, property rights)\n- Microfinance (small loans for entrepreneurs)",
        examTip: "For 6-mark questions, always explain WHY a barrier prevents development and suggest a specific policy to address it.",
      },
      {
        title: "Sustainability & the Environment",
        definition: "**Sustainable development** means meeting today's needs without preventing future generations from meeting theirs.",
        keyTerms: [
          { term: "Sustainability", definition: "Using resources at a rate that can be maintained long-term" },
          { term: "Renewable Resources", definition: "Resources that can be replenished (solar, wind, timber)" },
          { term: "Non-Renewable Resources", definition: "Resources that will eventually run out (oil, gas, coal)" },
          { term: "Climate Change", definition: "Long-term changes in temperature and weather patterns, mainly from burning fossil fuels" },
        ],
        explanation: "**Why growth can be unsustainable:**\n- Burning fossil fuels → climate change\n- Deforestation → loss of biodiversity\n- Overfishing → depleted fish stocks\n- Pollution → health costs and environmental damage\n\n**Solutions:**\n- Carbon taxes and tradable permits\n- Investment in renewable energy\n- Regulation (emission standards)\n- International agreements (Paris Agreement, COP)\n- Sustainable development goals (UN SDGs)\n\n**The dilemma for developing countries:** They need growth to reduce poverty, but growth often causes environmental damage. How do they develop sustainably?\n\n**Circular economy:** Designing products to be reused, repaired, and recycled · reducing waste and resource depletion.",
      },
    ],
  },
];
