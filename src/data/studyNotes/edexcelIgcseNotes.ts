import type { Topic } from "./edexcelANotes";

/* ═══════════════════════════════════════════════════════════════
 *  EDEXCEL IGCSE ECONOMICS (4EC1) — STUDY NOTES
 *  Paper 1: Microeconomics & Business Economics
 *  Paper 2: Macroeconomics & the Global Economy
 * ═══════════════════════════════════════════════════════════════ */

export const edexcelIgcsePaper1Topics: Topic[] = [
  {
    name: "Section A: The Market System",
    subtopics: [
      {
        title: "The Economic Problem",
        definition: "The basic economic problem is that resources are **scarce** but wants are **unlimited**, forcing societies to make choices.",
        keyTerms: [
          { term: "Scarcity", definition: "Resources are limited relative to unlimited wants" },
          { term: "Opportunity Cost", definition: "The next best alternative given up when making a choice" },
          { term: "Factors of Production", definition: "Land, labour, capital, enterprise — the inputs to production" },
        ],
        explanation: "Economic systems solve three questions: What to produce? How to produce? For whom to produce?\n\nMarket economy: decisions made by price mechanism. Command economy: government decides. Mixed economy: combination of both.\n\nThe PPC shows opportunity cost and helps illustrate economic growth (outward shift).",
        examTip: "Edexcel IGCSE Paper 1 has structured questions — define key terms precisely and use examples from the data.",
        diagram: "ppf",
      },
      {
        title: "Demand & Supply",
        definition: "**Demand** is the quantity consumers are willing and able to buy at each price. **Supply** is the quantity producers are willing and able to offer at each price.",
        keyTerms: [
          { term: "Law of Demand", definition: "As price rises, quantity demanded falls (ceteris paribus)" },
          { term: "Law of Supply", definition: "As price rises, quantity supplied rises (ceteris paribus)" },
          { term: "Equilibrium", definition: "Where demand equals supply — the market-clearing price" },
        ],
        explanation: "Demand shifts: income, tastes, population, prices of substitutes/complements, expectations.\nSupply shifts: costs, technology, taxes/subsidies, number of firms, weather.\n\nPrice mechanism functions: signalling (information), rationing (allocation), incentive (motivation).",
        examTip: "Always draw fully labelled diagrams: axes (Price, Quantity), curves (D, S), equilibrium (E), and shifts (D₁→D₂).",
        diagram: "supply-demand",
      },
      {
        title: "Elasticity",
        definition: "Elasticity measures the responsiveness of demand or supply to a change in a variable.",
        keyTerms: [
          { term: "PED", definition: "Price Elasticity of Demand — responsiveness of Qd to price change" },
          { term: "PES", definition: "Price Elasticity of Supply — responsiveness of Qs to price change" },
        ],
        explanation: "PED > 1 = elastic (luxury goods, many substitutes). PED < 1 = inelastic (necessities, few substitutes).\n\nPES depends on: spare capacity, stock availability, time period, factor mobility.\n\nBusiness relevance: elastic demand → price cuts increase revenue; inelastic → price rises increase revenue.",
        examTip: "Show your calculation clearly. State the formula, substitute values, and interpret the result (elastic/inelastic/unit elastic).",
      },
    ],
  },
  {
    name: "Section B: Business Economics",
    subtopics: [
      {
        title: "Business Costs, Revenue & Profit",
        definition: "Firms aim to maximise profit (Total Revenue - Total Cost). Understanding costs is essential for pricing and output decisions.",
        keyTerms: [
          { term: "Fixed Costs", definition: "Costs that don't change with output (e.g. rent)" },
          { term: "Variable Costs", definition: "Costs that change with output (e.g. raw materials)" },
          { term: "Average Cost", definition: "Total cost divided by quantity produced" },
          { term: "Economies of Scale", definition: "Falling long-run average costs as output increases" },
        ],
        explanation: "Revenue: Total Revenue = Price × Quantity. Average Revenue = TR/Q. Marginal Revenue = revenue from one extra unit.\n\nProfit maximisation: where MC = MR. Normal profit = minimum needed to stay in industry. Supernormal profit = above normal profit.\n\nEconomies of scale: purchasing, managerial, technical, financial, marketing.",
        examTip: "For IGCSE level, focus on the difference between fixed and variable costs, and why firms want to achieve economies of scale.",
      },
      {
        title: "Market Structures & Competition",
        definition: "Markets range from highly competitive (many firms) to monopoly (one firm), each with different characteristics.",
        keyTerms: [
          { term: "Competitive Market", definition: "Many firms, similar products, easy entry/exit" },
          { term: "Monopoly", definition: "Single or dominant firm with barriers to entry" },
        ],
        explanation: "Competitive markets: firms are price takers, earn normal profit in long run, allocatively efficient.\n\nMonopoly: price maker, can earn supernormal profit, may be productively inefficient. But may have economies of scale and invest in R&D.\n\nGovernment may regulate monopolies through competition policy, price controls, or breaking them up.",
        examTip: "The IGCSE exam tests advantages and disadvantages of monopoly vs competition — always give both sides.",
      },
      {
        title: "The Labour Market",
        definition: "The labour market determines wages through the interaction of demand for labour (from firms) and supply of labour (from workers).",
        keyTerms: [
          { term: "Derived Demand", definition: "Demand for labour depends on demand for the product it produces" },
          { term: "Minimum Wage", definition: "A legal price floor in the labour market" },
          { term: "Trade Union", definition: "Organisation representing workers to negotiate wages and conditions" },
        ],
        explanation: "Wage determination: supply and demand for labour. High demand + low supply = high wages (e.g. surgeons). Low demand + high supply = low wages.\n\nMinimum wage: above equilibrium → may cause unemployment (classical view) or may boost spending (Keynesian view).\n\nWage differentials: skills, education, experience, danger, discrimination, bargaining power.",
        examTip: "When discussing minimum wages, always consider BOTH the potential unemployment effect AND the income benefit to workers.",
      },
    ],
  },
];

export const edexcelIgcsePaper2Topics: Topic[] = [
  {
    name: "Section A: The National Economy",
    subtopics: [
      {
        title: "Government Objectives & Indicators",
        definition: "Governments aim for: economic growth, low unemployment, low inflation, and a healthy balance of payments.",
        keyTerms: [
          { term: "Economic Growth", definition: "Increase in real GDP over time" },
          { term: "Inflation", definition: "A sustained rise in the general price level" },
          { term: "Unemployment", definition: "People who are willing and able to work but cannot find a job" },
          { term: "Balance of Payments", definition: "Record of all international transactions" },
        ],
        explanation: "GDP measures total output. Real GDP adjusts for inflation. GDP per capita = GDP / population.\n\nInflation measured by CPI. Causes: demand-pull (excess AD) and cost-push (rising input costs).\n\nUnemployment types: frictional (job search), structural (mismatch), cyclical (recession), seasonal.",
        examTip: "Edexcel IGCSE Paper 2 tests application — use data from the extract to support your analysis of economic indicators.",
      },
      {
        title: "Fiscal & Monetary Policy",
        definition: "**Fiscal policy** uses government spending and taxation. **Monetary policy** uses interest rates and money supply to manage the economy.",
        keyTerms: [
          { term: "Budget Deficit", definition: "Government spending exceeds tax revenue" },
          { term: "National Debt", definition: "Total accumulated government borrowing" },
          { term: "Interest Rate", definition: "Cost of borrowing / reward for saving" },
        ],
        explanation: "Expansionary fiscal: ↑G or ↓T → ↑AD → ↑growth, ↓unemployment, but risk ↑inflation.\nContractionary fiscal: ↓G or ↑T → ↓AD → ↓inflation, but risk ↓growth.\n\nLower interest rates → cheaper borrowing → ↑C and ↑I → ↑AD. Higher rates → opposite.",
        examTip: "For 8-mark questions, explain the policy, show the mechanism (cause and effect chain), and evaluate with at least one limitation.",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies that aim to increase the productive capacity of the economy — shifting LRAS to the right.",
        keyTerms: [
          { term: "Privatisation", definition: "Selling state-owned enterprises to the private sector" },
          { term: "Deregulation", definition: "Removing government restrictions on businesses" },
          { term: "Education & Training", definition: "Investing in human capital to increase labour productivity" },
        ],
        explanation: "Market-based: privatisation, deregulation, tax cuts, trade union reform.\nInterventionist: education spending, infrastructure, R&D subsidies, regional policy.\n\nAdvantages: long-term growth without inflation. Disadvantages: slow to take effect, costly, may increase inequality.",
        examTip: "Link supply-side policies to specific objectives — e.g. education improves productivity AND reduces structural unemployment.",
      },
    ],
  },
  {
    name: "Section B: The Global Economy",
    subtopics: [
      {
        title: "International Trade",
        definition: "Countries trade because of **comparative advantage** — producing goods at a lower opportunity cost.",
        keyTerms: [
          { term: "Exports", definition: "Goods and services sold to other countries" },
          { term: "Imports", definition: "Goods and services bought from other countries" },
          { term: "Tariff", definition: "A tax on imported goods" },
          { term: "Quota", definition: "A physical limit on the quantity of imports" },
        ],
        explanation: "Benefits of trade: specialisation, lower prices, more choice, access to resources, competition drives efficiency.\n\nProtectionism: tariffs, quotas, subsidies, regulations. Arguments for: infant industry, jobs, national security, dumping.",
        examTip: "Draw tariff diagrams showing world price, domestic supply/demand, tariff line, and identify government revenue + deadweight loss.",
      },
      {
        title: "Exchange Rates & Globalisation",
        definition: "An **exchange rate** is the price of one currency in terms of another. **Globalisation** is the increasing integration of world economies.",
        keyTerms: [
          { term: "Floating Exchange Rate", definition: "Determined by supply and demand in the forex market" },
          { term: "Appreciation", definition: "Currency increases in value — imports cheaper, exports dearer" },
          { term: "Depreciation", definition: "Currency decreases in value — exports cheaper, imports dearer" },
          { term: "Globalisation", definition: "Growing interdependence of world economies" },
        ],
        explanation: "Causes of exchange rate changes: interest rates, inflation, trade balance, speculation, foreign investment.\n\nGlobalisation drivers: technology, reduced trade barriers, capital mobility, MNCs.\n\nBenefits: growth, jobs, lower prices, technology transfer. Costs: inequality, job losses in some sectors, environmental damage, cultural homogenisation.",
        examTip: "For globalisation questions, always discuss winners AND losers — developed vs developing countries, workers vs consumers.",
      },
    ],
  },
];
