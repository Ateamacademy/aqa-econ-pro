import type { Topic } from "./edexcelANotes";

export const caiePaper1Topics: Topic[] = [
  {
    name: "Basic Economic Ideas & Resource Allocation",
    subtopics: [
      {
        title: "Scarcity, Choice & Opportunity Cost",
        definition: "Economics studies how societies allocate **scarce** resources. Every decision involves an **opportunity cost** — the next best alternative foregone.",
        keyTerms: [
          { term: "Scarcity", definition: "Unlimited wants vs finite resources — the fundamental economic problem" },
          { term: "Opportunity Cost", definition: "The value of the next best alternative not chosen" },
          { term: "Factors of Production", definition: "Land, labour, capital, enterprise — the inputs to production" },
        ],
        examTip: "CAIE MCQs (Paper 1) often test opportunity cost with numerical PPF data. Practise calculating OC from two-good tables.",
      },
      {
        title: "Production Possibility Curves",
        definition: "A **PPC** shows the maximum combinations of two goods that can be produced with existing resources and technology.",
        explanation: "1. On the curve = efficient\n2. Inside = inefficient (unemployed resources)\n3. Outside = unattainable\n4. Outward shift = growth (more FOP or better technology)\n5. Movement along = reallocation with opportunity cost",
        diagram: "ppf",
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
        ],
        explanation: "**Conditions of demand (shift factors):** Income, prices of related goods, tastes, population, expectations, advertising",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price level.",
        explanation: "**Conditions of supply (shift factors):** Costs of production, technology, taxes/subsidies, number of firms, weather, expectations",
        diagram: "supply_decrease",
      },
      {
        title: "Price Determination",
        definition: "**Equilibrium** occurs where demand equals supply. At equilibrium there is no tendency for price or quantity to change.",
        explanation: "**Excess supply** → price falls → equilibrium restored\n**Excess demand** → price rises → equilibrium restored\n**Consumer surplus:** Area below demand, above price\n**Producer surplus:** Area above supply, below price",
        diagram: "supply_demand",
        examTip: "CAIE Paper 2 data response often asks you to explain price changes using S&D diagrams. Always identify the initial shift first.",
      },
      {
        title: "Elasticity",
        definition: "Elasticity measures **responsiveness** — how one variable responds to changes in another.",
        formula: "PED = %ΔQd ÷ %ΔP\nYED = %ΔQd ÷ %ΔY\nXED = %ΔQd(A) ÷ %ΔP(B)\nPES = %ΔQs ÷ %ΔP",
        keyTerms: [
          { term: "Elastic (>1)", definition: "Proportionally larger response" },
          { term: "Inelastic (<1)", definition: "Proportionally smaller response" },
          { term: "Perfectly Elastic (∞)", definition: "Horizontal demand/supply — infinite response" },
          { term: "Perfectly Inelastic (0)", definition: "Vertical demand/supply — zero response" },
        ],
        diagram: "ped_elastic",
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
          { term: "Negative Externality of Production", definition: "MSC > MPC — e.g., factory pollution" },
          { term: "Negative Externality of Consumption", definition: "MSC > MPC — e.g., cigarette smoke" },
          { term: "Positive Externality of Consumption", definition: "MSB > MPB — e.g., vaccination" },
          { term: "Positive Externality of Production", definition: "MSB > MPB — e.g., R&D spillovers" },
        ],
        diagram: "negative_externality",
        examTip: "CAIE requires clear distinction between production and consumption externalities. Use separate diagrams for each.",
      },
      {
        title: "Public Goods, Merit & Demerit Goods",
        definition: "**Public goods** are non-rival and non-excludable. **Merit goods** are underconsumed. **Demerit goods** are overconsumed.",
        explanation: "**Public goods:** Free rider problem → complete market failure → government provision\n**Merit goods:** Information failure + positive externalities → underconsumption\n**Demerit goods:** Information failure + negative externalities → overconsumption",
      },
      {
        title: "Government Intervention Methods",
        definition: "Governments use maximum/minimum prices, taxes, subsidies, regulation, and direct provision to correct market failure.",
        explanation: "**Maximum price** (below equilibrium): Protects consumers but creates shortages\n**Minimum price** (above equilibrium): Protects producers but creates surpluses\n**Taxes:** Internalise external costs\n**Subsidies:** Internalise external benefits\n**Regulation:** Direct controls on behaviour",
        diagram: "tax_incidence",
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
          { term: "Nominal GDP", definition: "GDP at current prices — not adjusted for inflation" },
          { term: "Real GDP", definition: "GDP adjusted for inflation — measures actual output changes" },
          { term: "GDP per head", definition: "GDP ÷ population — indicates average living standards" },
          { term: "GNI", definition: "Gross National Income — GDP + net income from abroad" },
        ],
        explanation: "**Limitations:** Ignores inequality, informal economy, environmental degradation, quality of life, leisure time",
      },
      {
        title: "The Circular Flow of Income",
        definition: "Income flows between households and firms. **Injections** (I, G, X) add to the flow; **withdrawals** (S, T, M) remove from it.",
        explanation: "**Equilibrium:** Total injections = total withdrawals\n**If I > W:** National income rises\n**If W > I:** National income falls",
        examTip: "CAIE often tests the circular flow model in MCQs. Know the difference between injections and withdrawals clearly.",
      },
    ],
  },
  {
    name: "Macroeconomic Analysis",
    subtopics: [
      {
        title: "Aggregate Demand",
        definition: "**AD = C + I + G + (X − M)**. It shows the total planned expenditure at each price level.",
        explanation: "**C determinants:** Disposable income, interest rates, confidence, wealth effect\n**I determinants:** Interest rates, business expectations, technology, government policy\n**AD shifts right:** Tax cuts, lower interest rates, rising confidence, weaker £",
        diagram: "ad_increase",
      },
      {
        title: "Aggregate Supply",
        definition: "**AS** shows the total output firms are willing to supply at each price level.",
        keyTerms: [
          { term: "SRAS", definition: "Upward sloping — affected by costs of production" },
          { term: "LRAS", definition: "Vertical at full employment (classical) or L-shaped (Keynesian)" },
        ],
        diagram: "sras_increase",
      },
      {
        title: "Inflation",
        definition: "A sustained increase in the general price level. CAIE distinguishes between demand-pull and cost-push causes.",
        keyTerms: [
          { term: "Demand-Pull", definition: "Caused by excess AD — 'too much money chasing too few goods'" },
          { term: "Cost-Push", definition: "Caused by rising production costs shifting SRAS left" },
        ],
        diagram: "sras_decrease",
      },
      {
        title: "Unemployment",
        definition: "Those of working age who are willing and able to work but cannot find employment.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by insufficient AD — demand-deficient" },
          { term: "Structural", definition: "Skills mismatch from industrial change" },
          { term: "Frictional", definition: "Between jobs — short-term and voluntary" },
        ],
        diagram: "phillips_curve",
      },
      {
        title: "Balance of Payments",
        definition: "Records all international transactions. The **current account** tracks trade in goods, services, and income flows.",
        explanation: "**Current account deficit:** Imports > exports → more money leaving than entering\n**Causes:** Strong exchange rate, high consumer spending on imports, uncompetitive exports\n**Remedies:** Depreciation, deflation, supply-side policies, protectionism",
      },
    ],
  },
  {
    name: "Macroeconomic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "Government uses **spending** and **taxation** to influence AD.",
        explanation: "**Expansionary:** ↑G or ↓T → ↑AD → ↑output and employment\n**Contractionary:** ↓G or ↑T → ↓AD → ↓inflation\n\n**Evaluation:** Time lags, crowding out, size of multiplier, impact on national debt",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "Central bank sets interest rates and may use QE to influence money supply and AD.",
        explanation: "Lower interest rates → cheaper borrowing → ↑C + I → ↑AD\n\n**Limitations:** Liquidity trap, banks may not pass on rate cuts, exchange rate effects",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies aimed at increasing LRAS — improving the economy's productive capacity.",
        keyTerms: [
          { term: "Market-Based", definition: "Deregulation, privatisation, tax incentives, trade liberalisation" },
          { term: "Interventionist", definition: "Education, training, infrastructure, healthcare investment" },
        ],
        diagram: "lras_increase",
        examTip: "CAIE essays (25 marks) require balanced evaluation. Always discuss at least TWO limitations of any policy you recommend.",
      },
    ],
  },
  {
    name: "International Trade & Development",
    subtopics: [
      {
        title: "International Trade & Comparative Advantage",
        definition: "Countries benefit from trade by specialising where they have the **lowest opportunity cost** (comparative advantage).",
        keyTerms: [
          { term: "Absolute Advantage", definition: "Producing more output with same resources" },
          { term: "Comparative Advantage", definition: "Producing at a lower opportunity cost" },
          { term: "Terms of Trade", definition: "Ratio of export prices to import prices" },
        ],
        explanation: "**Benefits of trade:** Lower prices, greater variety, economies of scale, technology transfer\n**Arguments for protection:** Infant industries, strategic industries, dumping, balance of payments",
      },
      {
        title: "Economic Development",
        definition: "**Development** is broader than growth — it includes improvements in living standards, health, education, and human rights.",
        keyTerms: [
          { term: "HDI", definition: "Human Development Index — combines income, education, and life expectancy" },
          { term: "Developing Economy", definition: "Low GDP per capita, poor infrastructure, high poverty" },
        ],
        explanation: "**Barriers to development:** Corruption, poor infrastructure, debt, trade dependency, climate vulnerability, conflict\n**Strategies:** Aid, trade liberalisation, FDI, microfinance, education investment",
        examTip: "For CAIE development essays, always evaluate whether economic growth alone is sufficient for development.",
      },
    ],
  },
];
