import type { Topic } from "./edexcelANotes";

/* ═══════════════════════════════════════════════════════════════
 *  WJEC A-LEVEL ECONOMICS — STUDY NOTES
 *  Units 1 & 2 (AS), Units 3 & 4 (A2)
 * ═══════════════════════════════════════════════════════════════ */

export const wjecUnit1Topics: Topic[] = [
  {
    name: "Unit 1: Introduction to Economics — The Market Mechanism",
    subtopics: [
      {
        title: "The Economic Problem",
        definition: "The basic economic problem is **scarcity**: unlimited wants but limited resources forcing choices with **opportunity costs**.",
        keyTerms: [
          { term: "Scarcity", definition: "Unlimited wants exceed finite resources" },
          { term: "Opportunity Cost", definition: "The next best alternative foregone" },
          { term: "PPC", definition: "Production Possibility Curve — shows maximum output combinations" },
        ],
        explanation: "Resources (factors of production) are scarce: land, labour, capital, enterprise. Economic agents must decide what, how, and for whom to produce.\n\nThe PPC illustrates trade-offs: points on the curve = efficient; inside = inefficient; outside = currently unattainable.",
        examTip: "WJEC data response questions often start with a definition — always give precise definitions with economic terminology.",
        diagram: "ppf",
      },
      {
        title: "Demand, Supply & Market Equilibrium",
        definition: "Markets coordinate the decisions of buyers and sellers through the **price mechanism**.",
        keyTerms: [
          { term: "Effective Demand", definition: "Willingness and ability to pay at a given price" },
          { term: "Market Equilibrium", definition: "Where quantity demanded equals quantity supplied" },
          { term: "Excess Demand", definition: "Shortage — price is below equilibrium" },
        ],
        explanation: "Demand curve slopes downward (substitution, income, diminishing marginal utility effects). Supply curve slopes upward (profit incentive).\n\nShifts vs movements: price changes → movement along; non-price factors → shift of curve. Always distinguish clearly.",
        examTip: "WJEC loves sequential analysis: state the initial change, shift the correct curve, identify new equilibrium, state the effect on P and Q.",
        diagram: "supply_demand",
      },
      {
        title: "Elasticity",
        definition: "**Elasticity** measures the responsiveness of one variable to a change in another.",
        keyTerms: [
          { term: "PED", definition: "Price Elasticity of Demand = %ΔQd / %ΔP" },
          { term: "YED", definition: "Income Elasticity of Demand = %ΔQd / %ΔY" },
          { term: "XED", definition: "Cross Elasticity of Demand = %ΔQd of X / %ΔP of Y" },
          { term: "PES", definition: "Price Elasticity of Supply = %ΔQs / %ΔP" },
        ],
        explanation: "PED determinants: substitutes, necessity, time, proportion of income.\nPES determinants: time, spare capacity, factor mobility, stock levels.\n\nRevenue: elastic → price cut increases TR; inelastic → price rise increases TR.",
        examTip: "WJEC frequently asks you to calculate elasticity from data — show all working and state the formula first.",
      },
      {
        title: "Market Failure",
        definition: "**Market failure** occurs when the free market fails to allocate resources efficiently, leading to welfare loss.",
        keyTerms: [
          { term: "Externality", definition: "A cost or benefit to a third party not reflected in market prices" },
          { term: "Public Good", definition: "Non-rivalrous and non-excludable good" },
          { term: "Merit Good", definition: "Good with positive externalities — underprovided by the market" },
          { term: "Information Failure", definition: "When economic agents lack full information to make rational decisions" },
        ],
        explanation: "Types of market failure: externalities (positive/negative), public goods (free rider problem), merit/demerit goods, information asymmetry, monopoly power.\n\nGovernment responses: taxation, subsidies, regulation, direct provision, information campaigns, property rights.",
        examTip: "Always draw externality diagrams with MSC/MPC or MSB/MPB lines. Show welfare loss as a shaded triangle.",
      },
    ],
  },
];

export const wjecUnit2Topics: Topic[] = [
  {
    name: "Unit 2: Economics in Action — The National Economy",
    subtopics: [
      {
        title: "Macroeconomic Indicators",
        definition: "Key measures of economic performance: GDP, inflation (CPI/RPI), unemployment rate, balance of payments.",
        keyTerms: [
          { term: "Real GDP", definition: "GDP adjusted for inflation" },
          { term: "CPI", definition: "Consumer Price Index — measures changes in the cost of a representative basket of goods" },
          { term: "Claimant Count", definition: "Number of people claiming unemployment-related benefits" },
          { term: "Current Account", definition: "Record of trade in goods, services, investment income, and transfers" },
        ],
        explanation: "Economic growth = increase in real GDP. Sustainable growth requires both AD growth and LRAS growth.\n\nThe business cycle: boom, slowdown, recession (2 consecutive quarters of negative growth), recovery.",
        examTip: "WJEC often gives data tables — extract key trends (rates of change, not just levels) and use them in your analysis.",
      },
      {
        title: "Aggregate Demand & Aggregate Supply",
        definition: "**AD** = C + I + G + (X-M). **AS** represents the total output firms are willing to supply at each price level.",
        keyTerms: [
          { term: "AD", definition: "Total planned expenditure in the economy" },
          { term: "SRAS", definition: "Short-run aggregate supply — upward sloping" },
          { term: "LRAS", definition: "Long-run aggregate supply — vertical at full employment" },
          { term: "Output Gap", definition: "Difference between actual and potential GDP" },
        ],
        explanation: "AD shifts: changes in C, I, G, or net exports. SRAS shifts: input costs, commodity prices, exchange rate. LRAS shifts: technology, labour force, capital stock, institutions.\n\nKeynesians emphasise demand management; supply-siders emphasise improving productive capacity.",
        examTip: "Show policy impacts on AD/AS diagrams. WJEC expects both the diagram AND written analysis — one without the other loses marks.",
        diagram: "ad_increase",
      },
      {
        title: "Fiscal, Monetary & Supply-Side Policies",
        definition: "Governments use a mix of fiscal policy (G & T), monetary policy (interest rates & money supply), and supply-side policies to manage the economy.",
        keyTerms: [
          { term: "Budget Deficit", definition: "Government spending exceeds tax revenue" },
          { term: "Base Rate", definition: "Interest rate set by the central bank" },
          { term: "Supply-Side Policies", definition: "Policies to increase productive capacity (education, deregulation, tax reform)" },
        ],
        explanation: "Fiscal policy: expansionary (↑G or ↓T) boosts AD but risks inflation and debt. Contractionary (↓G or ↑T) reduces inflation but risks unemployment.\n\nMonetary policy: lower rates → cheaper borrowing → ↑C and ↑I → ↑AD. Higher rates → opposite.\n\nSupply-side: education, training, deregulation, privatisation, infrastructure investment.",
        examTip: "WJEC evaluation requires you to consider time lags, unintended consequences, and trade-offs between objectives.",
      },
    ],
  },
];
