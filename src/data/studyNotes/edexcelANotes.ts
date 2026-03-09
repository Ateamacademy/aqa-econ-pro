import type { DiagramType } from "@/components/revision/EconDiagramLibrary";

export interface Subtopic {
  title: string;
  definition?: string;
  keyTerms?: { term: string; definition: string }[];
  explanation?: string;
  example?: string;
  formula?: string;
  examTip?: string;
  diagram?: DiagramType;
  content?: string;
}

export interface Topic {
  name: string;
  subtopics: Subtopic[];
}

export const edexcelAPaper1Topics: Topic[] = [
  {
    name: "Nature of Economics",
    subtopics: [
      {
        title: "The Economic Problem",
        definition: "Economics studies how scarce resources are allocated to satisfy unlimited wants. The central problem is **scarcity** — there are not enough resources to produce everything people desire.",
        keyTerms: [
          { term: "Scarcity", definition: "The excess of human wants over what can be produced with limited resources" },
          { term: "Opportunity Cost", definition: "The value of the next best alternative foregone" },
          { term: "Free Good", definition: "A good with zero opportunity cost (e.g. air)" },
        ],
        example: "A student choosing between university and full-time work faces an opportunity cost — the salary foregone while studying.",
        examTip: "Edexcel loves applying opportunity cost to real-world scenarios. Always quantify it where possible.",
      },
      {
        title: "Production Possibility Frontiers",
        definition: "A **PPF** shows the maximum combinations of two goods/services an economy can produce using all its resources efficiently.",
        explanation: "1. Points on the PPF = productively efficient\n2. Points inside = unemployed resources\n3. Points outside = unattainable with current resources\n4. Outward shift = economic growth\n5. The concave shape reflects increasing opportunity costs",
        diagram: "ppf",
        examTip: "In 8-mark questions, always link PPF shifts to specific factors (e.g., immigration shifts PPF outward by increasing labour supply).",
      },
      {
        title: "Specialisation & Trade",
        definition: "**Specialisation** occurs when individuals, firms, or countries concentrate on producing goods in which they have a comparative advantage.",
        keyTerms: [
          { term: "Division of Labour", definition: "Breaking production into separate tasks, each done by different workers" },
          { term: "Comparative Advantage", definition: "The ability to produce at a lower opportunity cost than another producer" },
        ],
        explanation: "**Benefits:** Higher productivity, economies of scale, higher output\n**Costs:** Monotony for workers, structural unemployment, over-dependence on other countries",
        example: "China specialises in manufacturing due to low labour costs, while the UK specialises in financial services.",
      },
    ],
  },
  {
    name: "How Markets Work",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good that consumers are willing and able to buy at each price level in a given time period.",
        keyTerms: [
          { term: "Effective Demand", definition: "Desire backed by ability to pay" },
          { term: "Conditions of Demand", definition: "Non-price factors that shift the demand curve" },
        ],
        explanation: "**Shifts in demand caused by:**\n- Changes in income (normal vs inferior goods)\n- Prices of substitutes and complements\n- Tastes, fashion, advertising\n- Population size and structure\n- Interest rates and expectations",
        diagram: "demand_increase",
        examTip: "Always distinguish between a movement along (price change) and a shift of the curve (non-price factor). This is tested in virtually every paper.",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity of a good that producers are willing and able to sell at each price level in a given time period.",
        explanation: "**Shifts in supply caused by:**\n- Changes in costs of production\n- Technology improvements\n- Indirect taxes and subsidies\n- Number of firms\n- Weather and natural factors",
        diagram: "supply_decrease",
      },
      {
        title: "Price Elasticity of Demand",
        definition: "**PED** measures the responsiveness of quantity demanded to a change in price.",
        formula: "PED = % change in quantity demanded ÷ % change in price",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Demand is responsive — a price rise causes a proportionally larger fall in Qd" },
          { term: "Inelastic (PED < 1)", definition: "Demand is unresponsive — a price rise causes a proportionally smaller fall in Qd" },
        ],
        explanation: "**Determinants:** Substitutes available, necessity vs luxury, proportion of income, habit, time period, brand loyalty",
        examTip: "For Edexcel Paper 1, always link PED to revenue. If demand is elastic, cutting price raises total revenue.",
        diagram: "ped_elastic",
      },
      {
        title: "Income & Cross Elasticity",
        definition: "**YED** measures demand responsiveness to income changes. **XED** measures demand responsiveness to changes in the price of another good.",
        formula: "YED = % change in Qd ÷ % change in income\nXED = % change in Qd of A ÷ % change in price of B",
        keyTerms: [
          { term: "Normal Good (YED > 0)", definition: "Demand rises as income rises" },
          { term: "Inferior Good (YED < 0)", definition: "Demand falls as income rises" },
          { term: "Substitutes (XED > 0)", definition: "Rise in price of B increases demand for A" },
          { term: "Complements (XED < 0)", definition: "Rise in price of B decreases demand for A" },
        ],
        example: "As incomes rise, demand for budget airlines may fall (inferior) while demand for premium airlines rises (luxury normal).",
      },
      {
        title: "Price Elasticity of Supply",
        definition: "**PES** measures the responsiveness of quantity supplied to a change in price.",
        formula: "PES = % change in quantity supplied ÷ % change in price",
        explanation: "**Determinants:** Spare capacity, ease of storage, time period, factor mobility, availability of stocks",
      },
      {
        title: "Market Equilibrium & Price Mechanism",
        definition: "**Equilibrium** is where demand equals supply. The **price mechanism** allocates resources through the signalling, incentive, and rationing functions.",
        keyTerms: [
          { term: "Signalling", definition: "Prices communicate information to buyers and sellers" },
          { term: "Incentive", definition: "Price changes motivate producers and consumers to change behaviour" },
          { term: "Rationing", definition: "Prices allocate scarce resources to those willing to pay" },
        ],
        diagram: "supply_demand",
        example: "A rise in oil prices signals scarcity, incentivises producers to explore alternatives, and rations oil to highest-value uses.",
      },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      {
        title: "Types of Market Failure",
        definition: "**Market failure** occurs when the free market leads to a misallocation of resources — either overproduction or underproduction relative to the socially optimal level.",
        keyTerms: [
          { term: "Allocative Inefficiency", definition: "Resources not allocated to maximise social welfare (P ≠ MC)" },
          { term: "Complete Market Failure", definition: "The market fails to produce the good at all (e.g., public goods)" },
          { term: "Partial Market Failure", definition: "The market produces but at the wrong quantity (e.g., externalities)" },
        ],
      },
      {
        title: "Externalities",
        definition: "**Externalities** are spillover effects on third parties not directly involved in the economic transaction.",
        keyTerms: [
          { term: "Negative Production Externality", definition: "MSC > MPC — e.g., factory pollution" },
          { term: "Negative Consumption Externality", definition: "MSC > MPC — e.g., passive smoking" },
          { term: "Positive Production Externality", definition: "MSB > MPB — e.g., R&D knowledge spillovers" },
          { term: "Positive Consumption Externality", definition: "MSB > MPB — e.g., vaccination" },
        ],
        explanation: "1. Negative externality → overproduction at Qm vs Q*\n2. Positive externality → underproduction at Qm vs Q*\n3. Welfare loss = triangle between MSC/MSB and MPC/MPB from Qm to Q*",
        diagram: "negative_externality",
        examTip: "Edexcel requires you to distinguish between production and consumption externalities. Label diagrams clearly with MPC, MSC, MPB, MSB.",
      },
      {
        title: "Public Goods",
        definition: "**Public goods** are non-rivalrous and non-excludable. The free rider problem means private firms cannot charge for them, leading to complete market failure.",
        keyTerms: [
          { term: "Non-Rival", definition: "One person's consumption does not reduce availability for others" },
          { term: "Non-Excludable", definition: "It is impossible to prevent non-payers from consuming" },
          { term: "Free Rider Problem", definition: "Consumers benefit without paying, so firms cannot make a profit" },
        ],
        example: "National defence — everyone benefits regardless of whether they pay taxes.",
      },
      {
        title: "Information Failure",
        definition: "**Information failure** occurs when economic agents lack perfect information, leading to irrational decisions.",
        keyTerms: [
          { term: "Asymmetric Information", definition: "One party has more information than the other" },
          { term: "Merit Good", definition: "Underconsumed because consumers underestimate private benefits" },
          { term: "Demerit Good", definition: "Overconsumed because consumers underestimate private costs" },
        ],
        example: "Consumers may undervalue education (merit good) because they cannot fully appreciate its long-term benefits.",
        examTip: "Link information failure to behavioural economics — bounded rationality, heuristics, and nudge theory.",
      },
    ],
  },
  {
    name: "Government Intervention",
    subtopics: [
      {
        title: "Indirect Taxes & Subsidies",
        definition: "**Indirect taxes** raise the cost of production (shift supply left). **Subsidies** lower costs (shift supply right).",
        explanation: "**Tax:** Reduces consumption of demerit goods (e.g., sugar tax). Tax incidence depends on PED/PES.\n**Subsidy:** Encourages consumption of merit goods (e.g., renewable energy subsidies).",
        diagram: "tax_incidence",
        examTip: "Always draw the tax/subsidy diagram showing the welfare gain or deadweight loss. Discuss who bears the burden using PED.",
      },
      {
        title: "Price Controls",
        definition: "**Maximum prices** (price ceilings) are set below equilibrium to protect consumers. **Minimum prices** (price floors) are set above equilibrium to protect producers.",
        explanation: "**Max price:** Creates excess demand / shortage → need for rationing → black markets\n**Min price:** Creates excess supply / surplus → government may need to buy surplus",
        example: "The National Minimum Wage is a price floor in the labour market — it creates a surplus of labour (unemployment) if set above equilibrium.",
      },
      {
        title: "Government Failure",
        definition: "**Government failure** occurs when intervention leads to a net welfare loss — making the situation worse than the free market outcome.",
        keyTerms: [
          { term: "Unintended Consequences", definition: "Policies produce effects opposite to those intended" },
          { term: "Information Gaps", definition: "Government lacks perfect information to set optimal tax/subsidy levels" },
          { term: "Administrative Costs", definition: "The cost of implementing and enforcing policies" },
        ],
        example: "The US Prohibition (1920–33) banned alcohol but led to organised crime and a thriving black market — a classic government failure.",
        examTip: "Every evaluation of government intervention should consider government failure. This is a key evaluative point for 12-mark and 25-mark questions.",
      },
    ],
  },
  {
    name: "Market Structures",
    subtopics: [
      {
        title: "Perfect Competition",
        definition: "A market structure with many firms, homogeneous products, perfect information, and no barriers to entry.",
        keyTerms: [
          { term: "Price Taker", definition: "Firms accept the market price — AR = MR = P" },
          { term: "Normal Profit", definition: "AR = AC — just enough to keep firms in the industry (long run)" },
          { term: "Supernormal Profit", definition: "AR > AC — attracts new entrants in the long run" },
        ],
        explanation: "**Short run:** Firms can earn supernormal or subnormal profit\n**Long run:** New entry/exit drives profit to normal → allocatively and productively efficient",
        examTip: "Perfect competition is allocatively efficient (P = MC) and productively efficient (min AC) in the long run. Use this as a benchmark against other structures.",
      },
      {
        title: "Monopoly",
        definition: "A market dominated by a single firm (legal definition: 25%+ market share in the UK). High barriers to entry prevent competition.",
        keyTerms: [
          { term: "Price Maker", definition: "The monopolist sets the price — faces a downward-sloping AR curve" },
          { term: "Barriers to Entry", definition: "Factors preventing new firms entering: patents, economies of scale, legal barriers" },
          { term: "Natural Monopoly", definition: "An industry where one firm can supply the whole market at lower cost than two or more" },
        ],
        explanation: "**Costs:** Higher prices, lower output, allocative inefficiency (P > MC), X-inefficiency, income inequality\n**Benefits:** Supernormal profits fund R&D, economies of scale, dynamic efficiency",
        examTip: "For 25-mark essays, always evaluate whether monopoly is necessarily bad. Use examples of dynamic efficiency (e.g., Apple, pharmaceutical companies).",
      },
      {
        title: "Oligopoly",
        definition: "A market dominated by a few large firms with high concentration ratios. Firms are interdependent — each firm's decisions affect rivals.",
        keyTerms: [
          { term: "Interdependence", definition: "Firms must consider rivals' reactions when making decisions" },
          { term: "Collusion", definition: "Firms agree (tacitly or overtly) to restrict competition" },
          { term: "Game Theory", definition: "Analysing strategic decision-making — e.g., the Prisoner's Dilemma" },
        ],
        explanation: "**Kinked demand curve:** Prices tend to be rigid — firms match price cuts but not price rises\n**Price competition** is risky → firms compete through non-price methods (branding, quality, innovation)",
        example: "UK supermarkets (Tesco, Sainsbury's, Asda, Morrisons) — high concentration ratio, interdependent pricing, extensive non-price competition.",
      },
      {
        title: "Labour Market",
        definition: "The labour market determines wages and employment levels. Demand for labour is derived from demand for the product.",
        keyTerms: [
          { term: "MRP", definition: "Marginal Revenue Product — the extra revenue from hiring one more worker" },
          { term: "Derived Demand", definition: "Demand for labour depends on demand for the product it produces" },
          { term: "Monopsony", definition: "A single buyer of labour — can suppress wages below the competitive level" },
        ],
        formula: "MRP = MPP × MR",
        explanation: "**Wage determination:** In perfect competition, wage = MRP. With monopsony power, wages are lower and employment is lower.",
        examTip: "For labour market questions, always consider trade unions vs monopsony power, and how the NMW affects different labour markets differently.",
      },
    ],
  },
];

export const edexcelAPaper2Topics: Topic[] = [
  {
    name: "Measures of Economic Performance",
    subtopics: [
      {
        title: "Economic Growth",
        definition: "**Economic growth** is an increase in real GDP. Short-run growth = using spare capacity. Long-run growth = increasing productive capacity.",
        keyTerms: [
          { term: "Real GDP", definition: "GDP adjusted for inflation — measures actual output changes" },
          { term: "GDP per capita", definition: "GDP ÷ population — better indicator of living standards" },
          { term: "Output Gap", definition: "Difference between actual and potential GDP" },
        ],
        explanation: "**Positive output gap:** Actual GDP > potential → inflationary pressure\n**Negative output gap:** Actual GDP < potential → spare capacity, unemployment",
        diagram: "ppf_growth",
      },
      {
        title: "Inflation",
        definition: "**Inflation** is a sustained increase in the general price level, measured by CPI.",
        keyTerms: [
          { term: "CPI", definition: "Consumer Price Index — weighted basket of 700+ goods and services" },
          { term: "Demand-Pull", definition: "Inflation caused by excessive AD growth" },
          { term: "Cost-Push", definition: "Inflation caused by rising production costs" },
        ],
        explanation: "**Costs of inflation:** Reduced international competitiveness, menu costs, shoe-leather costs, fiscal drag, uncertainty\n**Benefits of low inflation:** Signals healthy economic growth, encourages spending over saving",
        diagram: "sras_decrease",
        examTip: "Always distinguish between the cause (demand-pull vs cost-push) and recommend appropriate policy responses.",
      },
      {
        title: "Unemployment",
        definition: "**Unemployment** exists when people willing and able to work at the going wage rate cannot find a job.",
        keyTerms: [
          { term: "Claimant Count", definition: "Number of people claiming unemployment-related benefits" },
          { term: "Labour Force Survey", definition: "ILO measure — those without a job who have sought work in the last 4 weeks" },
          { term: "Natural Rate", definition: "Unemployment that exists when the labour market is in equilibrium" },
        ],
        explanation: "**Types:** Frictional (between jobs), structural (skills mismatch), cyclical (recession), seasonal\n**Costs:** Lost output, government spending on benefits, social costs, hysteresis",
        diagram: "phillips_curve",
      },
      {
        title: "Balance of Payments",
        definition: "The **balance of payments** records all economic transactions between residents and the rest of the world.",
        keyTerms: [
          { term: "Current Account", definition: "Trade in goods & services, primary income, secondary income" },
          { term: "Financial Account", definition: "FDI, portfolio investment, other investment flows" },
          { term: "Current Account Deficit", definition: "Imports > exports — more money flowing out than in" },
        ],
        explanation: "The BoP must always balance: current account deficit = financial account surplus",
        examTip: "Discuss whether a current account deficit matters — it depends on size, cause (strong consumer demand vs uncompetitive exports), and how it's financed.",
      },
    ],
  },
  {
    name: "Aggregate Demand & Supply",
    subtopics: [
      {
        title: "Aggregate Demand",
        definition: "**AD** is the total planned spending on goods and services in an economy at a given price level.",
        formula: "AD = C + I + G + (X − M)",
        keyTerms: [
          { term: "Consumption (C)", definition: "Household spending — the largest component of AD" },
          { term: "Investment (I)", definition: "Spending by firms on capital goods" },
          { term: "Government Spending (G)", definition: "Public sector expenditure on goods and services" },
          { term: "Net Exports (X−M)", definition: "Exports minus imports" },
        ],
        diagram: "ad_increase",
        explanation: "**AD shifts right:** Tax cuts, lower interest rates, increased government spending, weaker exchange rate, rising consumer confidence",
      },
      {
        title: "Aggregate Supply",
        definition: "**SRAS** shows total output firms are willing to supply at each price level. **LRAS** represents the productive capacity of the economy.",
        keyTerms: [
          { term: "SRAS", definition: "Short-run aggregate supply — shifts with changes in costs of production" },
          { term: "LRAS", definition: "Long-run aggregate supply — determined by quantity and quality of factors of production" },
        ],
        explanation: "**Keynesian LRAS:** Horizontal at low output (spare capacity), then vertical at full capacity\n**Classical LRAS:** Always vertical at full employment output",
        diagram: "sras_increase",
      },
      {
        title: "The Multiplier",
        definition: "The **multiplier** is the ratio of the final change in GDP to the initial injection that caused it.",
        formula: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ (MPS + MPT + MPM)",
        keyTerms: [
          { term: "MPC", definition: "Marginal Propensity to Consume — the proportion of extra income spent" },
          { term: "MPW", definition: "Marginal Propensity to Withdraw — saving + taxation + imports" },
        ],
        explanation: "A high MPC → large multiplier → fiscal policy more effective\nA high MPW → small multiplier → fiscal policy less effective",
        examTip: "The multiplier works in reverse too — a fall in investment has a multiplied negative effect on GDP. Always mention this in evaluation.",
      },
    ],
  },
  {
    name: "Macroeconomic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** uses government spending and taxation to influence AD and achieve macroeconomic objectives.",
        explanation: "**Expansionary:** Increase G / cut T → AD shifts right → higher output & employment\n**Contractionary:** Cut G / raise T → AD shifts left → lower inflation\n\n**Limitations:** Time lags, crowding out, political constraints, impact on national debt",
        diagram: "ad_increase",
        examTip: "For 20-mark data response questions, always link fiscal policy to the specific data given — e.g., if the data shows rising unemployment, argue for expansionary fiscal policy.",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** involves the Bank of England setting interest rates and using QE to control inflation and influence AD.",
        keyTerms: [
          { term: "Base Rate", definition: "The interest rate set by the MPC — currently the main policy tool" },
          { term: "QE", definition: "Quantitative Easing — BoE buys government bonds to increase money supply" },
          { term: "Transmission Mechanism", definition: "How interest rate changes feed through to AD" },
        ],
        explanation: "Lower rates → cheaper borrowing → more C + I → AD right → higher output\n**Limitations:** Liquidity trap, asymmetric effects, time lags, exchange rate effects",
      },
      {
        title: "Supply-Side Policies",
        definition: "**Supply-side policies** aim to increase LRAS by improving the productive capacity of the economy.",
        keyTerms: [
          { term: "Market-Based", definition: "Deregulation, privatisation, tax reform, flexible labour markets" },
          { term: "Interventionist", definition: "Education & training, infrastructure investment, R&D subsidies" },
        ],
        explanation: "**Benefits:** Non-inflationary growth, improved competitiveness, lower natural rate of unemployment\n**Limitations:** Long time lags (5–10 years), expensive, may worsen inequality",
        diagram: "lras_increase",
        examTip: "The best evaluation contrasts market-based vs interventionist approaches, discussing trade-offs between efficiency and equity.",
      },
    ],
  },
  {
    name: "International Economics",
    subtopics: [
      {
        title: "Globalisation",
        definition: "**Globalisation** is the increasing integration and interdependence of the world's economies through trade, investment, and migration.",
        explanation: "**Causes:** Lower transport costs, reduced trade barriers, technology, FDI, TNCs\n**Benefits:** Consumer choice, lower prices, economic growth, technology transfer\n**Costs:** Structural unemployment, environmental damage, cultural homogenisation, inequality",
        example: "China's integration into the global economy since the 1980s has lifted hundreds of millions out of poverty but contributed to deindustrialisation in Western economies.",
      },
      {
        title: "Trade & Protectionism",
        definition: "**Free trade** occurs when there are no artificial barriers to trade. **Protectionism** involves government restrictions on imports.",
        keyTerms: [
          { term: "Tariff", definition: "A tax on imports — raises price, reduces quantity imported" },
          { term: "Quota", definition: "A physical limit on the quantity of imports" },
          { term: "Comparative Advantage", definition: "A country's ability to produce at a lower opportunity cost" },
        ],
        explanation: "**Arguments for protection:** Infant industries, national security, preventing dumping, protecting jobs\n**Arguments against:** Higher prices for consumers, retaliation, inefficiency, reduced choice",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the price of one currency in terms of another.",
        keyTerms: [
          { term: "Floating", definition: "Determined by market forces of supply and demand" },
          { term: "Appreciation", definition: "Currency rises in value — exports dearer, imports cheaper" },
          { term: "Depreciation", definition: "Currency falls in value — exports cheaper, imports dearer" },
        ],
        explanation: "**Appreciation:** Reduces inflation (cheaper imports) but worsens current account (less competitive exports)\n**Depreciation:** Improves competitiveness but may cause cost-push inflation",
        examTip: "Use the Marshall-Lerner condition: depreciation only improves the current account if PED(X) + PED(M) > 1. Discuss the J-curve effect.",
      },
    ],
  },
];
