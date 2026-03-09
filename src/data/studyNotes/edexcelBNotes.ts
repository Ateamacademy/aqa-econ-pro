import type { Topic } from "./edexcelANotes";

export const edexcelBPaper1Topics: Topic[] = [
  {
    name: "Demand, Supply & Market Equilibrium",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to buy at each price in a given period.",
        keyTerms: [
          { term: "Effective Demand", definition: "Desire for a good backed by ability to pay" },
          { term: "Conditions of Demand", definition: "Non-price factors that shift the demand curve" },
        ],
        explanation: "**Demand shifts right with:** Higher income (normal goods), higher price of substitutes, lower price of complements, advertising, favourable expectations, population growth",
        diagram: "demand_increase",
        examTip: "Edexcel B focuses heavily on real-world application. Always link demand shifts to specific business or market examples.",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to sell at each price in a given period.",
        explanation: "**Supply shifts right with:** Lower costs of production, better technology, subsidies, more firms entering, favourable weather\n**Supply shifts left with:** Higher costs, taxes, fewer firms, adverse shocks",
        diagram: "supply_decrease",
      },
      {
        title: "Market Equilibrium",
        definition: "**Equilibrium** occurs where demand equals supply — there is no tendency for price or quantity to change.",
        explanation: "1. **Excess supply** (P > Pe) → unsold stock → firms cut prices\n2. **Excess demand** (P < Pe) → shortages → consumers bid prices up\n3. New equilibrium reached after shifts in demand or supply",
        diagram: "supply_demand",
      },
    ],
  },
  {
    name: "Elasticity",
    subtopics: [
      {
        title: "Price Elasticity of Demand",
        definition: "**PED** measures how responsive quantity demanded is to a change in price.",
        formula: "PED = % change in Qd ÷ % change in P",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Qd is highly responsive to price changes" },
          { term: "Inelastic (PED < 1)", definition: "Qd is not very responsive to price changes" },
        ],
        explanation: "**Determinants:** Number of substitutes, necessity vs luxury, time period, proportion of income, brand loyalty, habit",
        examTip: "Link PED to business strategy: firms with inelastic demand can raise prices to boost revenue; firms with elastic demand compete on price.",
        diagram: "ped_elastic",
      },
      {
        title: "YED, XED & PES",
        definition: "**YED** measures demand responsiveness to income. **XED** to price of related goods. **PES** measures supply responsiveness to price.",
        formula: "YED = %ΔQd ÷ %ΔY\nXED = %ΔQd(A) ÷ %ΔP(B)\nPES = %ΔQs ÷ %ΔP",
        keyTerms: [
          { term: "Normal Good", definition: "YED > 0 — demand rises with income" },
          { term: "Inferior Good", definition: "YED < 0 — demand falls as income rises" },
          { term: "Luxury Good", definition: "YED > 1 — demand rises more than proportionally with income" },
        ],
        example: "During recession, inferior goods like budget supermarket brands see rising demand as consumers trade down from premium brands.",
      },
    ],
  },
  {
    name: "Market Failure & Government Intervention",
    subtopics: [
      {
        title: "Externalities",
        definition: "**Externalities** are spillover effects on third parties not involved in the transaction, causing a divergence between private and social costs/benefits.",
        keyTerms: [
          { term: "Negative Externality", definition: "MSC > MPC — e.g., pollution from factories" },
          { term: "Positive Externality", definition: "MSB > MPB — e.g., education benefits to society" },
          { term: "Welfare Loss", definition: "Deadweight loss from over/underproduction relative to social optimum" },
        ],
        diagram: "negative_externality",
        examTip: "In Edexcel B, always identify whether it's a production or consumption externality, then explain WHY the market overproduces or underproduces.",
      },
      {
        title: "Public Goods & Information Failure",
        definition: "**Public goods** are non-rival and non-excludable — the free rider problem prevents private provision. **Information failure** leads to irrational decisions.",
        keyTerms: [
          { term: "Free Rider Problem", definition: "Consumers can benefit without paying → no incentive for private supply" },
          { term: "Asymmetric Information", definition: "One side of the market has more information than the other" },
          { term: "Bounded Rationality", definition: "Consumers make satisficing rather than optimising decisions" },
        ],
        example: "Health insurance markets suffer from adverse selection — those most likely to claim are most likely to buy insurance.",
      },
      {
        title: "Government Intervention & Failure",
        definition: "Government intervenes through taxes, subsidies, regulation, and direct provision — but intervention can itself cause **government failure**.",
        explanation: "**Methods:** Indirect taxes (Pigouvian), subsidies, minimum/maximum prices, regulation, tradable permits, provision of information, state provision\n\n**Government failure:** Distortion of market signals, unintended consequences, bureaucracy, regulatory capture, information gaps",
        diagram: "tax_incidence",
      },
    ],
  },
  {
    name: "Business Objectives & Market Structures",
    subtopics: [
      {
        title: "Revenue, Costs & Profits",
        definition: "Firms seek to maximise profit where **MC = MR**. Normal profit is the minimum to keep firms in the industry; supernormal profit exceeds this.",
        formula: "Total Profit = TR − TC\nMR = ΔTR ÷ ΔQ\nMC = ΔTC ÷ ΔQ",
        keyTerms: [
          { term: "Fixed Costs", definition: "Costs that don't vary with output (e.g., rent)" },
          { term: "Variable Costs", definition: "Costs that change with output (e.g., raw materials)" },
          { term: "Economies of Scale", definition: "Falling long-run average costs as output increases" },
        ],
      },
      {
        title: "Market Structures",
        definition: "Markets range from **perfect competition** (many firms, homogeneous products) to **monopoly** (one firm, high barriers to entry).",
        keyTerms: [
          { term: "Perfect Competition", definition: "Many firms, identical products, perfect info, no barriers → normal profit in LR" },
          { term: "Monopoly", definition: "One dominant firm, high barriers, price maker → supernormal profit in LR" },
          { term: "Oligopoly", definition: "Few dominant firms, interdependent, non-price competition" },
          { term: "Monopolistic Competition", definition: "Many firms, differentiated products, low barriers" },
        ],
        explanation: "**Key distinction:** In competitive markets, firms are price takers. With market power, firms are price makers.",
        examTip: "For Edexcel B, focus on real business examples. Link theory to firms like Tesco (oligopoly), local cafes (monopolistic competition).",
      },
      {
        title: "Labour Market",
        definition: "Demand for labour is derived from demand for the product. Wages are determined by the interaction of labour demand and supply.",
        formula: "MRP = MPP × MR",
        keyTerms: [
          { term: "Derived Demand", definition: "Labour demand depends on demand for the good it produces" },
          { term: "Wage Differentials", definition: "Differences in pay between occupations/industries" },
          { term: "Monopsony", definition: "A single buyer of labour with power to set wages below MRP" },
        ],
        explanation: "**Causes of wage differentials:** Skills & qualifications, trade union power, compensating wage differentials, discrimination, monopsony power",
      },
    ],
  },
];

export const edexcelBPaper2Topics: Topic[] = [
  {
    name: "Economic Indicators",
    subtopics: [
      {
        title: "Economic Growth & GDP",
        definition: "**Economic growth** is an increase in real GDP — the total value of goods and services produced, adjusted for inflation.",
        keyTerms: [
          { term: "Real GDP", definition: "GDP adjusted for inflation — measures actual changes in output" },
          { term: "GDP per capita", definition: "GDP ÷ population — indicates average living standards" },
          { term: "Recession", definition: "Two consecutive quarters of negative GDP growth" },
        ],
        explanation: "**Limitations of GDP:** Doesn't measure inequality, environmental damage, informal economy, quality of life, leisure time",
        diagram: "ppf_growth",
      },
      {
        title: "Inflation",
        definition: "**Inflation** is a sustained rise in the general price level. The UK target is 2% (CPI).",
        formula: "Inflation rate = ((CPI₁ − CPI₀) ÷ CPI₀) × 100",
        keyTerms: [
          { term: "Demand-Pull", definition: "AD grows faster than AS — excess demand pulls up prices" },
          { term: "Cost-Push", definition: "Rising costs of production push up the price level" },
          { term: "Deflation", definition: "A sustained fall in the general price level" },
        ],
        diagram: "sras_decrease",
        examTip: "For data response: always read the extract carefully for clues about whether inflation is demand-pull or cost-push before recommending policy.",
      },
      {
        title: "Unemployment & Employment",
        definition: "**Unemployment** is measured by the Labour Force Survey (ILO definition) and the Claimant Count.",
        keyTerms: [
          { term: "Structural", definition: "Long-term — caused by decline of industries and skills mismatch" },
          { term: "Cyclical", definition: "Caused by recession — demand-deficient unemployment" },
          { term: "Frictional", definition: "Short-term — people between jobs" },
        ],
        explanation: "**Consequences:** Lost output (inside PPF), fiscal costs (benefits), social costs (crime, health), hysteresis effect",
      },
    ],
  },
  {
    name: "Aggregate Demand & Aggregate Supply",
    subtopics: [
      {
        title: "AD Components & Shifts",
        definition: "**AD = C + I + G + (X − M)**. It shows total planned spending at each price level.",
        explanation: "**C influenced by:** Income, interest rates, confidence, wealth, credit availability\n**I influenced by:** Interest rates, business confidence, technological change, government policy\n**G influenced by:** Political decisions, fiscal policy\n**(X−M) influenced by:** Exchange rate, world GDP, competitiveness",
        diagram: "ad_increase",
      },
      {
        title: "AS and Macroeconomic Equilibrium",
        definition: "**SRAS** reflects short-run production costs. **LRAS** reflects the economy's productive capacity at full employment.",
        explanation: "**SRAS shifts left:** Rising oil/energy prices, wage increases, supply chain disruptions\n**LRAS shifts right:** More/better labour, capital investment, technology, institutional improvements",
        diagram: "lras_increase",
      },
      {
        title: "The Multiplier Effect",
        definition: "The **multiplier** shows how an initial change in spending leads to a larger final change in GDP.",
        formula: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ MPW",
        explanation: "Initial injection → rounds of spending → each round smaller due to withdrawals (saving, tax, imports)\n\n**Larger multiplier when:** High MPC, low tax rates, low import propensity\n**Smaller multiplier when:** High savings rate, open economy, high tax rates",
        examTip: "Always consider the multiplier when evaluating fiscal policy effectiveness. A small multiplier weakens the case for government spending.",
      },
    ],
  },
  {
    name: "Macroeconomic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "Using government spending (G) and taxation (T) to influence AD and achieve macroeconomic objectives.",
        explanation: "**Expansionary:** ↑G or ↓T → ↑AD → ↑output & employment\n**Contractionary:** ↓G or ↑T → ↓AD → ↓inflation\n\n**Evaluation:** Time lags, opportunity cost, crowding out, effect on national debt",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "The Bank of England sets the base rate to achieve the 2% inflation target and uses QE as an unconventional tool.",
        keyTerms: [
          { term: "Base Rate", definition: "The interest rate set by the MPC — influences borrowing and saving" },
          { term: "QE", definition: "Central bank buys bonds to increase money supply and lower long-term rates" },
        ],
        explanation: "Lower rates → ↓cost of borrowing → ↑C + I → ↑AD\n\n**Limitations:** Liquidity trap, low rates may not stimulate spending if confidence is low, distributional effects (asset price inflation benefits wealthy)",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies to increase LRAS by improving the economy's productive capacity.",
        keyTerms: [
          { term: "Market-Based", definition: "Deregulation, privatisation, income tax cuts, trade union reform" },
          { term: "Interventionist", definition: "Education, training, infrastructure, industrial strategy" },
        ],
        diagram: "lras_increase",
        examTip: "Evaluate by considering: which policies address the specific problem in the data? Market-based policies may worsen inequality; interventionist policies have long time lags.",
      },
    ],
  },
  {
    name: "Inequality & The Global Economy",
    subtopics: [
      {
        title: "Income & Wealth Inequality",
        definition: "**Income inequality** refers to uneven distribution of earnings. **Wealth inequality** refers to uneven distribution of assets.",
        keyTerms: [
          { term: "Gini Coefficient", definition: "Measures inequality from 0 (perfect equality) to 1 (perfect inequality)" },
          { term: "Lorenz Curve", definition: "Graphical representation of income/wealth distribution" },
        ],
        explanation: "**Causes:** Wage differentials, inheritance, tax system, globalisation, education access\n**Consequences:** Lower social mobility, health/education gaps, political instability, reduced growth (if extreme)",
        example: "The UK's Gini coefficient is around 0.35, indicating moderate inequality. Nordic countries have lower inequality (0.25–0.28).",
      },
      {
        title: "Globalisation & Trade",
        definition: "**Globalisation** is the increasing interdependence of world economies through trade, capital flows, and migration.",
        explanation: "**Benefits:** Consumer choice, lower prices, technology transfer, economic growth\n**Costs:** Deindustrialisation in developed countries, environmental damage, cultural erosion, dependency",
        examTip: "For extended responses, evaluate whether globalisation has been a net positive or negative for specific groups (workers, consumers, developing nations).",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the price of one currency in terms of another. A floating rate is determined by supply and demand.",
        keyTerms: [
          { term: "Appreciation", definition: "Currency rises in value → exports more expensive, imports cheaper" },
          { term: "Depreciation", definition: "Currency falls in value → exports cheaper, imports more expensive" },
        ],
        explanation: "**Causes of depreciation:** Lower interest rates, higher inflation, weaker economic performance, speculation\n**Impact:** Improves trade balance (if Marshall-Lerner holds) but may cause cost-push inflation",
      },
    ],
  },
];
