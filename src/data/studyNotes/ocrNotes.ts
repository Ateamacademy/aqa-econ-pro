import type { Topic } from "./edexcelANotes";

export const ocrComponent1Topics: Topic[] = [
  {
    name: "The Economic Problem & Resource Allocation",
    subtopics: [
      {
        title: "Scarcity, Choice & Opportunity Cost",
        definition: "The fundamental economic problem is **scarcity** — unlimited wants but limited resources. Every choice involves an **opportunity cost**.",
        keyTerms: [
          { term: "Scarcity", definition: "Resources are finite relative to infinite wants" },
          { term: "Opportunity Cost", definition: "The next best alternative foregone" },
          { term: "Factors of Production", definition: "Land, labour, capital, enterprise" },
        ],
        examTip: "OCR expects precise definitions. 'Opportunity cost' must include 'next best' and 'foregone' — marks are lost without both.",
      },
      {
        title: "Production Possibility Frontiers",
        definition: "A **PPF** shows the maximum output of two goods possible with available resources, assuming full efficiency.",
        explanation: "1. On the PPF = productively efficient\n2. Inside = inefficient / unemployed resources\n3. Outside = currently unattainable\n4. Concave shape = increasing opportunity cost\n5. Outward shift = economic growth",
        diagram: "ppf",
      },
    ],
  },
  {
    name: "Demand, Supply & Market Equilibrium",
    subtopics: [
      {
        title: "Demand & Its Determinants",
        definition: "**Demand** is the willingness and ability to buy at each price level. The demand curve slopes downward due to the income and substitution effects.",
        explanation: "**Non-price determinants (shift factors):** Income, prices of related goods, tastes, population, advertising, expectations, interest rates",
        diagram: "demand_increase",
      },
      {
        title: "Supply & Its Determinants",
        definition: "**Supply** is the willingness and ability of producers to sell at each price level.",
        explanation: "**Shift factors:** Costs of production, technology, indirect taxes/subsidies, number of firms, weather, expectations",
        diagram: "supply_decrease",
      },
      {
        title: "Market Equilibrium & Disequilibrium",
        definition: "**Equilibrium** is where Qd = Qs. At any other price, there is either excess demand (shortage) or excess supply (surplus).",
        diagram: "supply_demand",
        examTip: "For OCR 'explain' questions (4 marks), always use a diagram and clearly label the initial and new equilibrium positions.",
      },
    ],
  },
  {
    name: "Elasticity",
    subtopics: [
      {
        title: "PED, YED, XED & PES",
        definition: "Elasticity measures **responsiveness**. PED measures demand response to price; YED to income; XED to other goods' prices; PES measures supply response to price.",
        formula: "PED = %ΔQd ÷ %ΔP\nYED = %ΔQd ÷ %ΔY\nXED = %ΔQd(A) ÷ %ΔP(B)\nPES = %ΔQs ÷ %ΔP",
        keyTerms: [
          { term: "Elastic", definition: "Coefficient > 1 — responsive" },
          { term: "Inelastic", definition: "Coefficient < 1 — unresponsive" },
          { term: "Unit Elastic", definition: "Coefficient = 1 — proportionate response" },
        ],
        explanation: "**PED determinants:** Substitutes, necessity, proportion of income, time, habit\n**PES determinants:** Spare capacity, stocks, time period, factor mobility",
        diagram: "ped_elastic",
        examTip: "For OCR 8-mark 'explain with diagram' questions, draw the diagram showing elastic vs inelastic curves and explain the revenue implications.",
      },
      {
        title: "Consumer & Producer Surplus",
        definition: "**Consumer surplus** = the difference between what consumers are willing to pay and what they actually pay. **Producer surplus** = the difference between the price received and the minimum price producers would accept.",
        explanation: "CS = area below demand, above price\nPS = area above supply, below price\nTotal welfare = CS + PS\nMarket equilibrium maximises total welfare (allocative efficiency)",
        diagram: "supply_demand",
      },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      {
        title: "Externalities",
        definition: "**Externalities** are costs or benefits imposed on third parties not involved in the transaction.",
        keyTerms: [
          { term: "Negative Externality", definition: "MSC > MPC — social costs exceed private costs → overproduction" },
          { term: "Positive Externality", definition: "MSB > MPB — social benefits exceed private benefits → underproduction" },
          { term: "Welfare Loss", definition: "The deadweight loss triangle between private and social optimum" },
        ],
        diagram: "positive_externality",
        examTip: "OCR 8-mark diagram questions on externalities are very common. Always label MPC, MSC (or MPB, MSB), Qm, Q*, and shade the welfare loss.",
      },
      {
        title: "Public Goods & Merit/Demerit Goods",
        definition: "**Public goods** are non-rival and non-excludable → complete market failure. **Merit goods** are underconsumed due to information failure.",
        keyTerms: [
          { term: "Free Rider Problem", definition: "Non-payers cannot be excluded → no profit incentive for private firms" },
          { term: "Merit Good", definition: "Positive externalities + information failure → underconsumed" },
          { term: "Demerit Good", definition: "Negative externalities + information failure → overconsumed" },
        ],
        example: "Street lighting (public good) vs education (merit good) — different types of market failure require different interventions.",
      },
      {
        title: "Government Intervention",
        definition: "Government corrects market failure through taxes, subsidies, regulation, price controls, and direct provision.",
        explanation: "**Tools:** Pigouvian taxes, subsidies, tradable permits, regulation, state provision, information campaigns\n\n**Government failure:** Information gaps, unintended consequences, bureaucracy, distortion of market signals, regulatory capture",
        diagram: "tax_incidence",
      },
    ],
  },
  {
    name: "Market Structures",
    subtopics: [
      {
        title: "Business Objectives & Costs",
        definition: "Firms may pursue profit maximisation (MC = MR), revenue maximisation (MR = 0), sales maximisation, or satisficing.",
        keyTerms: [
          { term: "Profit Max", definition: "MC = MR — the output where extra revenue = extra cost" },
          { term: "Economies of Scale", definition: "Falling LRAC as output increases" },
          { term: "Diseconomies of Scale", definition: "Rising LRAC as output increases beyond optimal" },
        ],
        formula: "Profit = TR − TC\nAC = TC ÷ Q\nMC = ΔTC ÷ ΔQ",
      },
      {
        title: "Perfect Competition vs Monopoly",
        definition: "Perfect competition (many firms, homogeneous, no barriers) delivers allocative and productive efficiency. Monopoly (one firm, high barriers) can earn supernormal profit in the long run.",
        explanation: "**Perfect competition LR:** P = MC (allocative), P = min AC (productive), normal profit only\n**Monopoly:** P > MC (allocative inefficiency), possible X-inefficiency, but supernormal profit can fund R&D (dynamic efficiency)",
        examTip: "OCR loves comparison questions: always present both sides. A monopoly may be more dynamically efficient despite being allocatively inefficient.",
      },
      {
        title: "Oligopoly & Contestable Markets",
        definition: "**Oligopoly**: few dominant firms, interdependent, high barriers. **Contestable markets**: low barriers to entry/exit — even a monopoly behaves competitively.",
        keyTerms: [
          { term: "Interdependence", definition: "Each firm's decisions are influenced by its rivals' actions" },
          { term: "Collusion", definition: "Firms cooperate to raise prices or restrict output" },
          { term: "Contestability", definition: "Threat of new entry forces incumbent firms to keep prices low" },
        ],
        example: "Budget airlines (Ryanair, EasyJet) made the UK airline market more contestable — low sunk costs, easy entry/exit.",
      },
      {
        title: "Labour Market",
        definition: "Wages are determined by supply and demand for labour. Demand for labour is derived from demand for the product.",
        formula: "MRP = MPP × MR",
        keyTerms: [
          { term: "Derived Demand", definition: "Labour is demanded for the product it produces, not for itself" },
          { term: "Wage Differentials", definition: "Differences in pay due to skills, education, risk, trade unions" },
          { term: "Monopsony", definition: "Single employer of labour — can pay below MRP" },
        ],
      },
    ],
  },
];

export const ocrComponent2Topics: Topic[] = [
  {
    name: "Aggregate Demand & Aggregate Supply",
    subtopics: [
      {
        title: "Aggregate Demand",
        definition: "**AD** is total planned expenditure in the economy at each price level: **AD = C + I + G + (X − M)**.",
        explanation: "**AD slopes downward:** Wealth effect, interest rate effect, trade effect\n**Shifts right:** Tax cuts, lower interest rates, rising confidence, weaker exchange rate, increased G",
        diagram: "ad_increase",
      },
      {
        title: "Short-Run & Long-Run Aggregate Supply",
        definition: "**SRAS** reflects costs of production. **LRAS** reflects the economy's full-employment capacity.",
        keyTerms: [
          { term: "SRAS", definition: "Upward sloping — higher price level incentivises more output in the short run" },
          { term: "LRAS (Classical)", definition: "Vertical at full employment — output determined by supply-side factors" },
          { term: "LRAS (Keynesian)", definition: "Horizontal when spare capacity, vertical at full employment" },
        ],
        diagram: "lras_increase",
      },
      {
        title: "The Multiplier",
        definition: "An initial injection into the circular flow leads to a larger final increase in GDP through successive rounds of spending.",
        formula: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ MPW",
        examTip: "OCR frequently tests multiplier calculations. Practise: if MPC = 0.8, multiplier = 5. An injection of £10bn → final GDP increase of £50bn.",
      },
    ],
  },
  {
    name: "Economic Growth, Inflation & Unemployment",
    subtopics: [
      {
        title: "Economic Growth",
        definition: "**Short-run growth** = increase in real GDP using existing capacity. **Long-run growth** = increase in productive potential (LRAS shifts right).",
        keyTerms: [
          { term: "Actual Growth", definition: "Increase in real GDP — using up spare capacity" },
          { term: "Potential Growth", definition: "Increase in productive capacity — outward shift of PPF/LRAS" },
          { term: "Output Gap", definition: "Difference between actual and potential output" },
        ],
        diagram: "ppf_growth",
      },
      {
        title: "Inflation",
        definition: "A sustained increase in the general price level. The BoE targets 2% CPI inflation.",
        keyTerms: [
          { term: "Demand-Pull", definition: "AD rises faster than AS" },
          { term: "Cost-Push", definition: "Rising costs shift SRAS left" },
          { term: "Expectations", definition: "If workers expect inflation, they demand higher wages → wage-price spiral" },
        ],
        diagram: "sras_decrease",
        examTip: "For OCR 16-mark questions, evaluate whether inflation is always harmful. Consider: a little inflation may be better than deflation.",
      },
      {
        title: "Unemployment",
        definition: "Those willing and able to work at the going wage rate who cannot find a job.",
        keyTerms: [
          { term: "Cyclical", definition: "Caused by low AD during recession" },
          { term: "Structural", definition: "Caused by industrial change — skills mismatch" },
          { term: "Frictional", definition: "Between jobs — natural and short-term" },
          { term: "Real Wage", definition: "Caused by wages being above the market-clearing level" },
        ],
        diagram: "phillips_curve",
      },
    ],
  },
  {
    name: "Macroeconomic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "Government uses **spending (G)** and **taxation (T)** to influence AD and achieve macroeconomic objectives.",
        explanation: "**Expansionary:** ↑G or ↓T → ↑AD → ↑growth & employment\n**Contractionary:** ↓G or ↑T → ↓AD → ↓inflation\n\n**Limitations:** Time lags, crowding out, opportunity cost, political cycle",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "The **MPC** sets the Bank Rate to achieve the 2% inflation target. QE is used as an additional tool.",
        explanation: "Lower rates → ↓cost of borrowing → ↑C + I → ↑AD\nHigher rates → ↑cost of borrowing → ↓C + I → ↓AD\n\n**Limitations:** Liquidity trap, transmission mechanism delays, asymmetric effects",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies that increase LRAS by improving the quantity or quality of factors of production.",
        keyTerms: [
          { term: "Market-Based", definition: "Deregulation, privatisation, tax cuts, flexible labour markets" },
          { term: "Interventionist", definition: "Education, training, infrastructure, R&D subsidies" },
        ],
        diagram: "lras_increase",
        examTip: "For OCR 25-mark essays, weigh market-based vs interventionist policies. Argue which is most appropriate for the specific problem discussed.",
      },
    ],
  },
  {
    name: "International Trade & Globalisation",
    subtopics: [
      {
        title: "Comparative Advantage & Trade",
        definition: "Countries should specialise in goods where they have the lowest opportunity cost, then trade — both countries gain.",
        keyTerms: [
          { term: "Absolute Advantage", definition: "Producing more output with the same resources" },
          { term: "Comparative Advantage", definition: "Producing at a lower opportunity cost" },
        ],
        explanation: "**Free trade benefits:** Lower prices, greater choice, economies of scale, promotes innovation\n**Limitations of theory:** Assumes constant costs, ignores transport costs, exchange rates, and power imbalances",
      },
      {
        title: "Protectionism",
        definition: "Government restricts imports to protect domestic industries using tariffs, quotas, subsidies, and regulations.",
        keyTerms: [
          { term: "Tariff", definition: "A tax on imports — raises price, reduces import quantity" },
          { term: "Quota", definition: "A physical limit on the quantity of imports" },
          { term: "Infant Industry", definition: "A new industry that needs temporary protection to grow" },
        ],
        examTip: "Always evaluate protectionism by discussing retaliation, the impact on consumers (higher prices), and whether infant industries ever 'grow up'.",
      },
      {
        title: "Exchange Rates & Balance of Payments",
        definition: "Exchange rates determine the price of exports and imports. The current account records trade in goods and services.",
        explanation: "**Depreciation:** Exports cheaper, imports dearer → improves trade balance if Marshall-Lerner holds\n**Appreciation:** Exports dearer, imports cheaper → worsens trade balance\n\nThe BoP must balance: current account deficit offset by financial account surplus",
      },
      {
        title: "Financial Sector",
        definition: "The financial sector channels funds from savers to borrowers, facilitating investment and economic activity.",
        keyTerms: [
          { term: "Commercial Banks", definition: "Accept deposits, make loans, facilitate payments" },
          { term: "Central Bank", definition: "Sets monetary policy, lender of last resort, regulates financial system" },
          { term: "Financial Stability", definition: "The absence of crises that could disrupt the real economy" },
        ],
        example: "The 2008 financial crisis showed how bank failures can cause systemic risk — leading to recession, bailouts, and regulatory reform.",
      },
    ],
  },
];
