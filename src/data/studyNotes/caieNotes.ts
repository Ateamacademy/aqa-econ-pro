import type { Topic } from "./edexcelANotes";

export const caiePaper1Topics: Topic[] = [
  {
    name: "Basic Economic Ideas & Resource Allocation",
    subtopics: [
      {
        title: "Scarcity, Choice & Opportunity Cost",
        definition: "Economics studies how societies allocate **scarce** resources. Every decision involves an **opportunity cost** · the next best alternative foregone.",
        keyTerms: [
          { term: "Scarcity", definition: "Unlimited wants vs finite resources · the fundamental economic problem" },
          { term: "Opportunity Cost", definition: "The value of the next best alternative not chosen" },
          { term: "Factors of Production", definition: "Land, labour, capital, enterprise · the inputs to production" },
          { term: "Economic Good", definition: "A good that requires scarce resources and has an opportunity cost" },
          { term: "Free Good", definition: "A good with no opportunity cost (e.g., air)" },
        ],
        explanation: "**The 3 fundamental questions:**\n1. **What** to produce? (allocation)\n2. **How** to produce? (methods)\n3. **For whom** to produce? (distribution)\n\nDifferent economic systems answer these differently · free market uses price mechanism, command economy uses central planning.",
        examTip: "CAIE MCQs (Paper 1) often test opportunity cost with numerical PPF data. Practise calculating OC from two-good tables.",
      },
      {
        title: "Production Possibility Curves",
        definition: "A **PPC** shows the maximum combinations of two goods that can be produced with existing resources and technology.",
        explanation: "1. On the curve = efficient (productively)\n2. Inside = inefficient (unemployed resources)\n3. Outside = unattainable with current resources\n4. Outward shift = growth (more FOP or better technology)\n5. Movement along = reallocation with opportunity cost\n6. Concave shape = increasing opportunity cost\n7. Straight line = constant opportunity cost",
        diagram: "ppf",
      },
      {
        title: "Specialisation & Division of Labour",
        definition: "**Specialisation** is concentrating on producing a limited range of goods. **Division of labour** splits production into separate tasks.",
        keyTerms: [
          { term: "Specialisation", definition: "Focusing on a narrow range of goods/tasks" },
          { term: "Division of Labour", definition: "Breaking production into distinct tasks done by different workers" },
        ],
        explanation: "**Advantages:** Higher productivity, economies of scale, expertise, faster production\n**Disadvantages:** Boredom, structural unemployment, dependency, loss of flexibility\n\n**Countries specialise** based on comparative advantage · leads to international trade.",
        example: "Adam Smith's pin factory · 10 specialised workers produced 48,000 pins/day vs 200 if each worked alone.",
      },
      {
        title: "Money & Exchange",
        definition: "**Money** serves four functions that facilitate trade and overcome the limitations of barter.",
        keyTerms: [
          { term: "Medium of Exchange", definition: "Accepted in return for goods/services" },
          { term: "Store of Value", definition: "Holds purchasing power over time" },
          { term: "Unit of Account", definition: "Common measure for comparing values" },
          { term: "Standard of Deferred Payment", definition: "Allows future transactions and credit" },
        ],
        explanation: "**Without money (barter):** Requires 'double coincidence of wants' · extremely inefficient\n**Money enables:** Specialisation, trade, saving, credit, economic development",
      },
    ],
  },
  {
    name: "The Price System & Market Mechanism",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to purchase at each price level in a given time period.",
        keyTerms: [
          { term: "Law of Demand", definition: "Inverse relationship between price and quantity demanded" },
          { term: "Individual vs Market Demand", definition: "Market demand = horizontal summation of individual demands" },
          { term: "Effective Demand", definition: "Demand backed by ability to pay" },
        ],
        explanation: "**Conditions of demand (shift factors):** Income (normal vs inferior goods), prices of related goods (substitutes/complements), tastes and preferences, population size and structure, expectations, advertising, interest rates\n\n**Movement along:** Change in own price\n**Shift:** Change in non-price factor",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price level.",
        explanation: "**Conditions of supply (shift factors):** Costs of production (wages, raw materials, energy), technology improvements, taxes and subsidies, number of firms, weather/natural factors, expectations, exchange rate\n\n**Joint supply:** Producing one good automatically creates another (beef and leather)\n**Competitive supply:** Producing more of one means less of another",
        diagram: "supply_decrease",
      },
      {
        title: "Price Determination & Market Equilibrium",
        definition: "**Equilibrium** occurs where demand equals supply. At equilibrium there is no tendency for price or quantity to change.",
        keyTerms: [
          { term: "Consumer Surplus", definition: "Area below demand, above price · benefit of paying less than willing to" },
          { term: "Producer Surplus", definition: "Area above supply, below price · benefit of receiving more than minimum accepted" },
          { term: "Total Welfare", definition: "CS + PS · maximised at market equilibrium" },
        ],
        explanation: "**Excess supply** → price falls → equilibrium restored\n**Excess demand** → price rises → equilibrium restored\n\n**Interrelated markets:** A shift in one market affects related markets. E.g., rise in oil price → shifts supply left in transport market AND shifts demand right in market for electric cars.",
        diagram: "supply_demand",
        examTip: "CAIE Paper 2 data response often asks you to explain price changes using S&D diagrams. Always identify the initial shift first, then trace through the effects.",
      },
      {
        title: "Price Elasticity of Demand (PED)",
        definition: "**PED** measures **responsiveness** of quantity demanded to a change in price.",
        formula: "PED = %ΔQd ÷ %ΔP",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Proportionally larger response · many substitutes, luxury" },
          { term: "Inelastic (PED < 1)", definition: "Proportionally smaller response · necessity, addictive" },
          { term: "Unit Elastic (PED = 1)", definition: "Proportionate response" },
          { term: "Perfectly Elastic (∞)", definition: "Horizontal demand · any price rise loses all demand" },
          { term: "Perfectly Inelastic (0)", definition: "Vertical demand · price has no effect on Qd" },
        ],
        explanation: "**Determinants:** Substitutes, necessity vs luxury, proportion of income, time period, habit/addiction, definition of market\n\n**PED and Revenue:**\n- Elastic: ↓P → ↑TR\n- Inelastic: ↑P → ↑TR\n\n**PED and Tax:**\n- Inelastic → consumers bear more tax\n- Elastic → producers bear more tax",
        diagram: "ped_elastic",
      },
      {
        title: "Income, Cross & Supply Elasticity",
        definition: "**YED** measures demand response to income. **XED** to other goods' prices. **PES** measures supply response to price.",
        formula: "YED = %ΔQd ÷ %ΔY\nXED = %ΔQd(A) ÷ %ΔP(B)\nPES = %ΔQs ÷ %ΔP",
        keyTerms: [
          { term: "Normal Good (YED > 0)", definition: "Demand rises with income" },
          { term: "Inferior Good (YED < 0)", definition: "Demand falls as income rises" },
          { term: "Substitutes (XED > 0)", definition: "Positive relationship between goods" },
          { term: "Complements (XED < 0)", definition: "Negative relationship between goods" },
        ],
        explanation: "**YED significance:** Luxury goods (YED > 1) boom-dependent. Inferior goods (YED < 0) recession-proof. As economies develop, demand shifts to services.\n\n**PES determinants:** Spare capacity, stocks, time period, factor mobility, length of production process",
      },
    ],
  },
  {
    name: "Government Intervention & Market Failure",
    subtopics: [
      {
        title: "Externalities",
        definition: "**Externalities** are costs or benefits to third parties not reflected in market prices.",
        keyTerms: [
          { term: "Negative Externality of Production", definition: "MSC > MPC · e.g., factory pollution" },
          { term: "Negative Externality of Consumption", definition: "MSC > MPC · e.g., cigarette smoke, drunk driving" },
          { term: "Positive Externality of Consumption", definition: "MSB > MPB · e.g., vaccination, education" },
          { term: "Positive Externality of Production", definition: "MSB > MPB · e.g., R&D spillovers, bee-keeping" },
          { term: "Welfare Loss", definition: "Deadweight loss triangle · area between private and social optimum" },
        ],
        explanation: "**Negative externality:** Market overproduces (Qm > Q*). Welfare loss = triangle. Solution: tax, regulation, tradable permits.\n**Positive externality:** Market underproduces (Qm < Q*). Solution: subsidy, state provision, information.",
        diagram: "negative_externality",
        examTip: "CAIE requires clear distinction between production and consumption externalities. Use separate diagrams for each type.",
      },
      {
        title: "Public Goods, Merit & Demerit Goods",
        definition: "**Public goods** are non-rival and non-excludable. **Merit goods** are underconsumed. **Demerit goods** are overconsumed.",
        keyTerms: [
          { term: "Non-Rival", definition: "One person's use doesn't reduce availability" },
          { term: "Non-Excludable", definition: "Can't prevent non-payers from benefiting" },
          { term: "Free Rider Problem", definition: "People benefit without paying → market fails" },
          { term: "Merit Good", definition: "Underconsumed · information failure + positive externalities" },
          { term: "Demerit Good", definition: "Overconsumed · information failure + negative externalities" },
        ],
        explanation: "**Public goods:** Free rider problem → complete market failure → government provision\n**Merit goods:** Information failure + positive externalities → underconsumption → subsidies, state provision, information\n**Demerit goods:** Information failure + negative externalities → overconsumption → taxes, regulation, bans\n\n**Quasi-public goods:** Partially non-rival or non-excludable (e.g., roads · excludable via tolls, rivalrous in congestion)",
      },
      {
        title: "Information Failure",
        definition: "**Information failure** leads to irrational decisions and misallocation of resources.",
        keyTerms: [
          { term: "Asymmetric Information", definition: "One party has more knowledge than the other" },
          { term: "Moral Hazard", definition: "Taking more risk because another party bears the cost" },
          { term: "Adverse Selection", definition: "The wrong type of agent enters the market" },
        ],
        explanation: "**Examples:**\n- Used cars: sellers know quality, buyers don't (Akerlof's lemons)\n- Insurance: policyholders know their risk better than insurers\n- Healthcare: doctors know more than patients\n\n**Solutions:** Regulation, licensing, guarantees/warranties, mandatory disclosure, government provision of information",
      },
      {
        title: "Government Intervention Methods",
        definition: "Governments use maximum/minimum prices, taxes, subsidies, regulation, and direct provision to correct market failure.",
        keyTerms: [
          { term: "Maximum Price", definition: "Price ceiling below equilibrium · protects consumers but creates shortage" },
          { term: "Minimum Price", definition: "Price floor above equilibrium · protects producers but creates surplus" },
          { term: "Buffer Stock Scheme", definition: "Government buys surplus when prices low, sells when prices high · stabilises prices" },
        ],
        explanation: "**Maximum price** (below equilibrium): Protects consumers but creates shortages, black markets, need for rationing\n**Minimum price** (above equilibrium): Protects producers but creates surpluses, cost to government\n**Taxes:** Internalise external costs · shift supply left\n**Subsidies:** Internalise external benefits · shift supply right\n**Regulation:** Direct controls on behaviour (emission standards, planning permission)\n**Buffer stocks:** Stabilise agricultural prices · buy low, sell high",
        diagram: "tax_incidence",
      },
      {
        title: "Government Failure",
        definition: "**Government failure** occurs when intervention leads to a net welfare loss · outcomes are worse than the market.",
        explanation: "**Causes:** Information gaps (can't calculate exact tax), unintended consequences, political self-interest, bureaucratic inefficiency, regulatory capture, time lags, distortion of market signals, moral hazard\n\n**Examples:** Agricultural subsidies causing overproduction, rent controls creating housing shortages, prohibition creating black markets",
        examTip: "CAIE essays require balanced evaluation. Always discuss government failure as a counter-argument to ANY intervention you recommend.",
      },
    ],
  },
];

export const caiePaper2Topics: Topic[] = [
  {
    name: "National Income & Macroeconomic Measurement",
    subtopics: [
      {
        title: "Measuring Economic Performance",
        definition: "**GDP** measures the total value of goods and services produced in a country in a year. It can be measured by output, income, or expenditure.",
        keyTerms: [
          { term: "Nominal GDP", definition: "GDP at current prices · not adjusted for inflation" },
          { term: "Real GDP", definition: "GDP adjusted for inflation · measures actual output changes" },
          { term: "GDP per head", definition: "GDP ÷ population · indicates average living standards" },
          { term: "GNI", definition: "Gross National Income · GDP + net income from abroad" },
          { term: "PPP", definition: "Purchasing Power Parity · adjusts for price differences between countries" },
        ],
        explanation: "**Three methods of measuring GDP:**\n1. Output method · value added by each sector\n2. Income method · sum of all incomes earned\n3. Expenditure method · C + I + G + (X − M)\n\n**Limitations:** Ignores inequality, informal economy (up to 30% in developing countries), environmental degradation, quality of life, leisure time, unpaid work",
      },
      {
        title: "The Circular Flow of Income",
        definition: "Income flows between households and firms. **Injections** (I, G, X) add to the flow; **withdrawals** (S, T, M) remove from it.",
        keyTerms: [
          { term: "Injection", definition: "Investment (I), government spending (G), exports (X)" },
          { term: "Withdrawal", definition: "Saving (S), taxation (T), imports (M)" },
          { term: "Equilibrium", definition: "Total injections = total withdrawals" },
        ],
        explanation: "**If I > W:** National income rises → economic growth\n**If W > I:** National income falls → contraction\n\n**The multiplier amplifies** the effect of changes in injections/withdrawals",
        examTip: "CAIE often tests the circular flow model in MCQs. Know the difference between injections and withdrawals clearly.",
      },
      {
        title: "Living Standards & Development Indicators",
        definition: "**Living standards** encompass both material (GDP) and non-material (quality of life) well-being.",
        keyTerms: [
          { term: "HDI", definition: "Human Development Index · income + education + life expectancy (0 to 1)" },
          { term: "MPI", definition: "Multidimensional Poverty Index · health, education, living standards" },
          { term: "Gini Coefficient", definition: "Measures income inequality (0 = perfect equality, 1 = perfect inequality)" },
        ],
        explanation: "**GDP per capita limitations:** Ignores inequality, doesn't measure health/education/freedom, misses informal economy\n\n**Better measures:** HDI (broader), MPI (poverty-focused), Gini (inequality), environmental indicators",
      },
    ],
  },
  {
    name: "Macroeconomic Analysis",
    subtopics: [
      {
        title: "Aggregate Demand",
        definition: "**AD = C + I + G + (X − M)**. It shows the total planned expenditure at each price level.",
        keyTerms: [
          { term: "Consumption (C)", definition: "Household spending · largest component" },
          { term: "MPC", definition: "Marginal Propensity to Consume · fraction of extra income spent" },
          { term: "Accelerator", definition: "Investment depends on rate of change of GDP" },
        ],
        explanation: "**C determinants:** Disposable income, interest rates, confidence, wealth effect, credit availability, income distribution\n**I determinants:** Interest rates, business expectations, technology, government policy, demand changes (accelerator)\n**AD shifts right:** Tax cuts, lower interest rates, rising confidence, weaker currency, increased G\n**AD shifts left:** Tax rises, higher rates, falling confidence, stronger currency, austerity",
        diagram: "ad_increase",
      },
      {
        title: "Aggregate Supply",
        definition: "**AS** shows the total output firms are willing to supply at each price level.",
        keyTerms: [
          { term: "SRAS", definition: "Upward sloping · affected by costs of production" },
          { term: "LRAS (Classical)", definition: "Vertical at full employment · only supply-side factors matter" },
          { term: "LRAS (Keynesian)", definition: "L-shaped · elastic with spare capacity, vertical at full employment" },
        ],
        explanation: "**SRAS shifts left:** Rising energy prices, wages, supply disruptions, natural disasters\n**SRAS shifts right:** Falling commodity prices, productivity gains, subsidies\n\n**LRAS shifts right:** More/better labour, capital investment, technology, institutional improvements, education\n\n**Classical vs Keynesian:** Classical = economy self-corrects to full employment. Keynesian = can get stuck below full employment.",
        diagram: "sras_increase",
      },
      {
        title: "The Multiplier",
        definition: "An initial change in spending leads to a larger final change in GDP through successive rounds of spending.",
        formula: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ MPW",
        keyTerms: [
          { term: "MPC", definition: "Marginal Propensity to Consume" },
          { term: "MPW", definition: "Marginal Propensity to Withdraw (MPS + MPT + MPM)" },
        ],
        explanation: "**Example:** If MPC = 0.8, multiplier = 5. A £10bn injection → £50bn final increase in GDP.\n\n**Large multiplier:** High MPC, low taxes, low imports\n**Small multiplier:** High savings, open economy, high taxes\n**Also works in reverse** · a withdrawal multiplies into contraction",
        examTip: "CAIE frequently tests multiplier calculations. Always show your working: k = 1/(1-MPC).",
      },
      {
        title: "Inflation",
        definition: "A sustained increase in the general price level. CAIE distinguishes between demand-pull and cost-push causes.",
        keyTerms: [
          { term: "Demand-Pull", definition: "Caused by excess AD · 'too much money chasing too few goods'" },
          { term: "Cost-Push", definition: "Caused by rising production costs shifting SRAS left" },
          { term: "Wage-Price Spiral", definition: "Higher wages → higher costs → higher prices → demand for higher wages" },
          { term: "Deflation", definition: "Sustained fall in general price level" },
          { term: "Hyperinflation", definition: "Extremely rapid inflation · money becomes worthless (e.g., Zimbabwe, Venezuela)" },
        ],
        explanation: "**Costs of inflation:** Erodes purchasing power, uncertainty, menu costs, shoe-leather costs, international uncompetitiveness, redistribution (savers lose, borrowers gain)\n\n**Costs of deflation:** Delayed consumption, rising real debt, business failures, unemployment, deflationary spiral",
        diagram: "sras_decrease",
      },
      {
        title: "Unemployment",
        definition: "Those of working age who are willing and able to work but cannot find employment.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by insufficient AD · demand-deficient" },
          { term: "Structural", definition: "Skills mismatch from industrial change · long-term" },
          { term: "Frictional", definition: "Between jobs · short-term and voluntary" },
          { term: "Seasonal", definition: "Due to time of year · agriculture, tourism" },
          { term: "Natural Rate", definition: "Unemployment at labour market equilibrium (frictional + structural)" },
        ],
        explanation: "**Consequences:** Lost output (inside PPF), fiscal costs (more benefits, less tax), social problems (crime, health), hysteresis (long-term unemployed lose skills), regional inequality\n\n**Phillips Curve:** Short-run trade-off between unemployment and inflation. Long-run: vertical at natural rate.",
        diagram: "phillips_curve",
      },
      {
        title: "Balance of Payments",
        definition: "Records all international transactions. The **current account** tracks trade in goods, services, and income flows.",
        keyTerms: [
          { term: "Current Account", definition: "Trade in goods/services + primary income + secondary income" },
          { term: "Financial Account", definition: "FDI, portfolio investment, reserve changes" },
          { term: "Current Account Deficit", definition: "Imports > exports" },
          { term: "Terms of Trade", definition: "Index of export prices ÷ import prices × 100" },
        ],
        explanation: "**Current account deficit:** Imports > exports → more money leaving than entering\n**Causes:** Strong exchange rate, high consumer spending on imports, uncompetitive exports\n**Remedies:** Depreciation, deflation, supply-side policies, protectionism\n\n**The BoP must balance** · current account deficit offset by financial account surplus",
      },
    ],
  },
  {
    name: "Macroeconomic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "Government uses **spending** and **taxation** to influence AD.",
        keyTerms: [
          { term: "Expansionary", definition: "↑G or ↓T → ↑AD → growth and employment" },
          { term: "Contractionary", definition: "↓G or ↑T → ↓AD → controls inflation" },
          { term: "Automatic Stabilisers", definition: "Tax/benefits adjust automatically through the cycle" },
          { term: "Budget Deficit", definition: "Government spending > tax revenue" },
        ],
        explanation: "**Expansionary:** ↑G or ↓T → ↑AD → ↑output and employment\n**Contractionary:** ↓G or ↑T → ↓AD → ↓inflation\n\n**Evaluation:** Time lags, crowding out, size of multiplier, impact on national debt, political constraints, may cause inflation",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "Central bank sets interest rates and may use QE to influence money supply and AD.",
        keyTerms: [
          { term: "Interest Rate", definition: "The cost of borrowing / reward for saving" },
          { term: "QE", definition: "Central bank buys bonds to increase money supply" },
          { term: "Money Supply", definition: "Total amount of money in the economy" },
        ],
        explanation: "Lower interest rates → cheaper borrowing → ↑C + I → ↑AD\nLower rates → ↓saving incentive → ↑spending\nLower rates → ↓exchange rate → ↑exports\n\n**Limitations:** Liquidity trap (rates near zero), banks may not lend, time lags, exchange rate effects, may cause asset bubbles",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies aimed at increasing LRAS · improving the economy's productive capacity.",
        keyTerms: [
          { term: "Market-Based", definition: "Deregulation, privatisation, tax incentives, trade liberalisation" },
          { term: "Interventionist", definition: "Education, training, infrastructure, healthcare investment" },
        ],
        explanation: "**Market-based:** Tax cuts → work incentives, deregulation → competition, privatisation → efficiency, trade liberalisation → comparative advantage\n\n**Interventionist:** Education → human capital, infrastructure → productivity, healthcare → healthier workforce, R&D subsidies → innovation\n\n**Benefits:** Non-inflationary growth, improved competitiveness, higher productivity\n**Limitations:** Long time lags, expensive, may increase inequality, government failure risk",
        diagram: "sras_increase",
        examTip: "CAIE essays (25 marks) require balanced evaluation. Always discuss at least TWO limitations of any policy you recommend.",
      },
    ],
  },
  {
    name: "International Trade & Development",
    subtopics: [
      {
        title: "Comparative Advantage & Trade",
        definition: "Countries benefit from trade by specialising where they have the **lowest opportunity cost** (comparative advantage).",
        keyTerms: [
          { term: "Absolute Advantage", definition: "Producing more output with same resources" },
          { term: "Comparative Advantage", definition: "Producing at a lower opportunity cost" },
          { term: "Terms of Trade", definition: "Ratio of export prices to import prices" },
          { term: "WTO", definition: "World Trade Organisation · promotes free trade, resolves disputes" },
        ],
        explanation: "**Benefits of trade:** Lower prices, greater variety, economies of scale, technology transfer, promotes competition and innovation\n**Arguments for protection:** Infant industries, strategic industries (defence), dumping prevention, balance of payments, employment protection\n\n**Terms of trade improvement:** Export prices rise relative to import prices → can buy more imports per unit of exports\n**Terms of trade deterioration:** May indicate declining competitiveness or commodity price falls",
      },
      {
        title: "Protectionism",
        definition: "Government restricts imports to protect domestic industries.",
        keyTerms: [
          { term: "Tariff", definition: "Tax on imports · raises price for consumers" },
          { term: "Quota", definition: "Physical limit on quantity imported" },
          { term: "Subsidy to Domestic Firms", definition: "Lowers costs to compete with imports" },
          { term: "Embargo", definition: "Complete ban on trade with a country" },
          { term: "Non-Tariff Barriers", definition: "Regulations, standards, bureaucracy that restrict imports" },
        ],
        explanation: "**Tariff effects:** Higher price, lower consumer surplus, government revenue, deadweight loss, domestic producers gain\n\n**Arguments for:** Infant industries, prevent dumping, national security, employment, BoP correction\n**Arguments against:** Higher prices, retaliation, inefficiency, WTO rules, consumer welfare loss\n\n**Infant industry argument evaluation:** Difficult to identify which industries will succeed; protection may become permanent; political pressure to maintain protection",
        examTip: "CAIE loves tariff diagram questions. Always show: world price, tariff price, domestic production before/after, imports before/after, government revenue, deadweight loss.",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the price of one currency in terms of another.",
        keyTerms: [
          { term: "Floating", definition: "Determined by market supply and demand" },
          { term: "Fixed", definition: "Pegged by central bank" },
          { term: "Managed Float", definition: "Floating with occasional central bank intervention" },
          { term: "Appreciation", definition: "Currency rises in value" },
          { term: "Depreciation", definition: "Currency falls in value" },
        ],
        explanation: "**Floating rate advantages:** Automatic adjustment, monetary policy freedom, no need for reserves\n**Floating rate disadvantages:** Volatility, uncertainty, speculation\n\n**Fixed rate advantages:** Certainty, discipline, low inflation\n**Fixed rate disadvantages:** Requires large reserves, may be wrong level, limits monetary policy\n\n**Marshall-Lerner:** Depreciation improves current account if PED(X) + PED(M) > 1\n**J-Curve:** Short-run worsening, long-run improvement",
      },
      {
        title: "Economic Development",
        definition: "**Development** is broader than growth · it includes improvements in living standards, health, education, and human rights.",
        keyTerms: [
          { term: "HDI", definition: "Human Development Index · combines income, education, and life expectancy" },
          { term: "MPI", definition: "Multidimensional Poverty Index · health, education, living standards" },
          { term: "Developing Economy", definition: "Low GDP per capita, poor infrastructure, high poverty" },
          { term: "Emerging Economy", definition: "Rapidly growing, transitioning from low to middle income" },
          { term: "Sustainable Development", definition: "Growth that doesn't compromise future generations" },
        ],
        explanation: "**Barriers to development:** Corruption, poor infrastructure, debt, trade dependency, climate vulnerability, conflict, brain drain, disease, population growth, inequality, poor governance\n\n**Strategies for development:**\n- Aid (bilateral/multilateral) · but may create dependency\n- Trade liberalisation · but may expose vulnerable industries\n- FDI · creates jobs but profits may be repatriated\n- Microfinance · small loans to entrepreneurs\n- Education investment · long-term but expensive\n- Institutional reform · governance, property rights, rule of law",
        examTip: "For CAIE development essays, always evaluate whether economic growth alone is sufficient for development. Consider: growth can increase inequality if not inclusive.",
      },
      {
        title: "Globalisation & Its Effects",
        definition: "**Globalisation** is the increasing integration of world economies through trade, investment, migration, and technology.",
        keyTerms: [
          { term: "TNC", definition: "Transnational Corporation · operates across borders" },
          { term: "FDI", definition: "Foreign Direct Investment · productive capacity abroad" },
          { term: "Trade Liberalisation", definition: "Reducing tariffs and trade barriers" },
          { term: "Offshoring", definition: "Relocating production processes to other countries" },
        ],
        explanation: "**Benefits for developing countries:** Technology transfer, FDI creates jobs, access to larger markets, faster growth\n**Costs for developing countries:** Exploitation of workers, environmental damage, cultural erosion, dependency on TNCs, brain drain, profits repatriated\n\n**Benefits for developed countries:** Lower consumer prices, access to resources, new markets\n**Costs for developed countries:** Deindustrialisation, structural unemployment, inequality\n\n**COVID-19 impact on globalisation:** Exposed fragility of global supply chains, led to reshoring trends, vaccine nationalism vs international cooperation",
      },
    ],
  },
  {
    name: "Efficiency & Market Structure (A2)",
    subtopics: [
      {
        title: "Efficiency Concepts",
        definition: "Economists evaluate market outcomes using several measures of efficiency.",
        keyTerms: [
          { term: "Allocative Efficiency", definition: "P = MC · resources reflect consumer preferences" },
          { term: "Productive Efficiency", definition: "Production at minimum AC · no waste" },
          { term: "Dynamic Efficiency", definition: "Innovation over time · requires supernormal profit to fund R&D" },
          { term: "X-Inefficiency", definition: "Producing above minimum cost due to lack of competitive pressure" },
          { term: "Pareto Efficiency", definition: "No one can be made better off without someone else worse off" },
        ],
        explanation: "**Perfect competition:** Allocatively + productively efficient in long run, but may lack dynamic efficiency (normal profits → little R&D)\n**Monopoly:** Allocatively inefficient (P > MC) but may be dynamically efficient (supernormal profits fund innovation)\n\n**Trade-off:** Static efficiency today vs dynamic efficiency over time. This is the central debate in competition policy.",
        examTip: "CAIE Paper 4 essays frequently require comparison of efficiency across market structures. Always discuss the static vs dynamic efficiency trade-off.",
      },
      {
        title: "Market Structures Comparison",
        definition: "Different market structures produce different outcomes in terms of price, output, efficiency, and innovation.",
        explanation: "**Perfect competition:** P = MC, min AC, normal profit LR. Maximum static efficiency but minimal dynamic efficiency.\n**Monopolistic competition:** P > MC, not min AC, normal profit LR. Product variety but excess capacity.\n**Oligopoly:** Interdependence, non-price competition, possible collusion. May be dynamically efficient.\n**Monopoly:** P > MC, supernormal profit LR. May achieve dynamic efficiency through R&D investment.\n\n**Key evaluation points:**\n- Is the market contestable? Contestability matters more than structure.\n- Is the monopoly a natural monopoly? If so, regulation is preferable to breaking it up.\n- Does supernormal profit actually fund R&D? (Schumpeter vs Hayek debate)",
      },
      {
        title: "Natural Monopoly",
        definition: "A natural monopoly exists where economies of scale are so large that a single firm can supply the entire market at a lower average cost than two or more firms could.",
        keyTerms: [
          { term: "Natural Monopoly", definition: "LRAC falls across the whole range of market demand · one firm is most efficient" },
          { term: "Economies of Scale", definition: "Falling LRAC as output rises · the source of the natural monopoly" },
        ],
        diagram: "natural_monopoly",
        explanation: "**Why it arises:** Very high fixed/infrastructure costs and large economies of scale (e.g. water, rail, electricity grids) mean LRAC falls continuously over the relevant range, so average cost is minimised by a single producer.\n\n**Profit-max vs regulation:** Left unregulated, the firm produces where MR = MC, charging a high price and restricting output (allocatively inefficient, P > MC). Regulators may force P = MC (allocatively efficient, but the firm may make a loss as MC < AC) or P = AC (a fair return, normal profit).\n\n**Evaluation:** Breaking up a natural monopoly raises costs (lost economies of scale), so regulation (price caps, RPI-X) is usually preferred to introducing competition.",
        examTip: "Draw a natural monopoly with continuously falling LRAC and LRMC below it; mark the profit-max (MR=MC), allocatively-efficient (P=MC) and fair-return (P=AC) outputs.",
      },
      {
        title: "Labour Market Imperfections",
        definition: "Real labour markets deviate from the competitive model due to monopsony power, trade unions, discrimination, and immobility.",
        keyTerms: [
          { term: "Monopsony", definition: "Single buyer of labour · can pay below MRP" },
          { term: "Trade Union", definition: "Collectively bargains for higher wages" },
          { term: "Bilateral Monopoly", definition: "Monopsony employer faces a monopoly union · wage is indeterminate" },
          { term: "Discrimination", definition: "Wage differences not based on productivity · gender, race, age" },
        ],
        formula: "MRP = MPP × MR",
        explanation: "**Competitive labour market:** Wage = MRP, employment at market-clearing level\n**Monopsony:** Wage < MRP, employment below competitive level\n**Trade union effect:** Pushes wage above equilibrium · may cause unemployment OR counter monopsony\n**Bilateral monopoly:** Both sides have market power · outcome depends on bargaining strength\n\n**Minimum wage in monopsony:** Can raise BOTH wages and employment · important for CAIE evaluation",
        examTip: "CAIE Paper 3 often asks about labour market diagrams. Always draw competitive vs monopsony comparison.",
      },
      {
        title: "Economic Rent & Transfer Earnings",
        definition: "A factor's earnings can be split into transfer earnings (the minimum payment needed to keep it in its current use) and economic rent (any surplus above that).",
        keyTerms: [
          { term: "Transfer Earnings", definition: "The minimum needed to keep a factor in its present use · the area UNDER the supply curve" },
          { term: "Economic Rent", definition: "Earnings above transfer earnings · the area ABOVE supply and below the wage" },
        ],
        diagram: "economic_rent_transfer_earnings",
        explanation: "**Splitting the wage bill:** At wage We and employment Qe, total earnings (We × Qe) divide into transfer earnings (under the labour supply curve) and economic rent (between We and the supply curve).\n\n**Elasticity matters:** The more inelastic the supply of labour, the larger the proportion that is economic rent (e.g. top footballers); the more elastic the supply, the more is transfer earnings.",
        examTip: "Label both areas explicitly and link the size of economic rent to the elasticity of labour supply.",
      },
      {
        title: "Bilateral Monopoly",
        definition: "A bilateral monopoly is a labour market with a single buyer of labour (monopsony employer) facing a single seller (monopoly trade union), so the wage is indeterminate.",
        keyTerms: [
          { term: "Monopsony", definition: "A single buyer of labour · would set the wage on ACL at Qm (Wm)" },
          { term: "Monopoly Union", definition: "A single seller of labour · pushes the wage up toward MRP at Qm (Wu)" },
          { term: "Bargaining Range", definition: "Wm to Wu · the wage is settled by relative bargaining power" },
        ],
        diagram: "bilateral_monopoly",
        explanation: "**Employment:** The level of employment is Qm, where MCL = MRP.\n**The wage is indeterminate:** A monopsony acting alone would force the wage down to ACL at Qm (Wm); a monopoly union would push it up toward the MRP at Qm (Wu). The actual wage lies somewhere in the Wm–Wu bargaining range, depending on the bargaining strength of each side.\n\n**Evaluation:** Unlike pure monopsony, a strong union can raise wages without reducing employment, because the monopsony was already restricting both wages and jobs.",
        examTip: "Draw ACL, MCL, MRP and MRL, mark Qm at MCL=MRP, then show Wm on ACL and Wu on MRP with the bargaining range between them.",
      },
      {
        title: "Government Microeconomic Intervention (A2)",
        definition: "At A2, CAIE requires deeper analysis of competition policy, privatisation, and regulation.",
        keyTerms: [
          { term: "Competition Policy", definition: "Government action to prevent anti-competitive behaviour" },
          { term: "Privatisation", definition: "Transferring state-owned enterprises to private ownership" },
          { term: "Nationalisation", definition: "Government taking ownership of private firms" },
          { term: "Regulation", definition: "Rules imposed on firms to prevent abuse of market power" },
          { term: "Deregulation", definition: "Removing restrictions to increase competition" },
        ],
        explanation: "**Competition policy tools:** Preventing mergers that reduce competition, breaking up monopolies, fining cartels, promoting contestability\n\n**Privatisation advantages:** Profit motive → efficiency, reduces government debt, shareholder accountability\n**Privatisation disadvantages:** Natural monopoly remains monopoly, may focus on profit over service, regulatory capture\n\n**Regulation approaches:** Price cap (RPI-X), rate of return regulation, quality standards, environmental standards\n\n**Evaluation:** Market-based solutions assume rational behaviour and competitive markets. Government intervention assumes government has sufficient information. Both can fail.",
      },
    ],
  },
];
