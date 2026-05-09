import type { Topic } from "./edexcelANotes";

export const ocrGcseComponent1Topics: Topic[] = [
  {
    name: "The Role of Markets",
    subtopics: [
      {
        title: "The Economic Problem",
        content: "Economics studies how scarce resources are allocated to satisfy unlimited wants. The basic economic problem is **scarcity** · there are not enough resources to produce everything people want.\n\n**Factors of production**: Land, Labour, Capital, Enterprise.\n\n**Opportunity cost** is the next best alternative foregone when a choice is made.",
        keyTerms: [
          { term: "Scarcity", definition: "The excess of wants over available resources" },
          { term: "Opportunity cost", definition: "The next best alternative foregone when a choice is made" },
          { term: "Factors of production", definition: "Land, labour, capital, and enterprise used to produce goods" },
        ],
        examTip: "Always define opportunity cost with a real-world example · e.g. 'If a government spends £10bn on defence, the opportunity cost might be £10bn less spent on the NHS.'",
      },
      {
        title: "Demand",
        content: "**Demand** is the quantity of a good or service consumers are willing and able to buy at a given price.\n\nThe **law of demand** states that as price rises, quantity demanded falls (ceteris paribus).\n\n**Shifts in demand** are caused by changes in income, tastes, population, price of substitutes/complements, and advertising.",
        keyTerms: [
          { term: "Demand", definition: "The quantity consumers are willing and able to buy at a given price" },
          { term: "Law of demand", definition: "As price rises, quantity demanded falls, ceteris paribus" },
          { term: "Substitutes", definition: "Goods that can be used in place of each other" },
          { term: "Complements", definition: "Goods that are used together" },
        ],
        examTip: "Distinguish between a movement along the demand curve (caused by price changes) and a shift of the curve (caused by non-price factors).",
        diagram: "supply-demand" as any,
      },
      {
        title: "Supply",
        content: "**Supply** is the quantity of a good or service producers are willing and able to sell at a given price.\n\nThe **law of supply** states that as price rises, quantity supplied rises (ceteris paribus).\n\n**Shifts in supply** are caused by changes in costs of production, technology, taxes, subsidies, and weather.",
        keyTerms: [
          { term: "Supply", definition: "The quantity producers are willing and able to sell at a given price" },
          { term: "Costs of production", definition: "Expenses incurred in making a good or service" },
          { term: "Indirect taxes", definition: "Taxes on goods that shift supply left" },
          { term: "Subsidies", definition: "Government payments to producers that shift supply right" },
        ],
      },
      {
        title: "Price Determination",
        content: "**Equilibrium** occurs where demand equals supply. At this point, there is no tendency for the price to change.\n\nIf price is above equilibrium → **surplus** (excess supply).\nIf price is below equilibrium → **shortage** (excess demand).\n\nThe price mechanism acts as a signal, incentive, and rationing device.",
        keyTerms: [
          { term: "Equilibrium", definition: "The point where demand equals supply" },
          { term: "Surplus", definition: "Excess supply when price is above equilibrium" },
          { term: "Shortage", definition: "Excess demand when price is below equilibrium" },
          { term: "Price mechanism", definition: "The system by which prices allocate resources via signals, incentives, and rationing" },
        ],
        diagram: "supply-demand" as any,
      },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      {
        title: "Types of Market Failure",
        content: "**Market failure** occurs when the free market fails to allocate resources efficiently.\n\nTypes include:\n- **Externalities** (positive and negative, production and consumption)\n- **Public goods** (non-rivalrous, non-excludable)\n- **Merit and demerit goods**\n- **Information failure**\n- **Monopoly power**",
        keyTerms: [
          { term: "Market failure", definition: "When the free market fails to allocate resources efficiently" },
          { term: "Externalities", definition: "Costs or benefits to third parties not involved in a transaction" },
          { term: "Public goods", definition: "Goods that are non-rivalrous and non-excludable" },
          { term: "Merit goods", definition: "Goods under-provided by the market due to information failure" },
          { term: "Demerit goods", definition: "Goods over-consumed due to information failure" },
        ],
      },
      {
        title: "Externalities",
        content: "**Negative externalities** are harmful side effects to third parties (e.g. pollution from a factory).\n\n**Positive externalities** are beneficial side effects (e.g. education benefits society).\n\nExternalities cause a divergence between **private costs/benefits** and **social costs/benefits**, leading to over- or under-production.",
        keyTerms: [
          { term: "Negative externality", definition: "A harmful side effect on third parties" },
          { term: "Positive externality", definition: "A beneficial side effect on third parties" },
          { term: "Social cost", definition: "Private cost plus external cost" },
        ],
        examTip: "In 6-mark questions, always draw a diagram showing MSC/MSB diverging from MPC/MPB to illustrate the welfare loss.",
      },
      {
        title: "Government Intervention",
        content: "Governments can correct market failure through:\n- **Indirect taxes** (raise price of demerit goods)\n- **Subsidies** (lower price of merit goods)\n- **Regulation and legislation**\n- **Provision of public goods**\n- **Information provision**\n- **Minimum/maximum prices**",
        keyTerms: [
          { term: "Indirect tax", definition: "A tax on goods/services that shifts supply left" },
          { term: "Subsidy", definition: "A government payment to producers to lower costs" },
          { term: "Regulation", definition: "Rules imposed by government to control behaviour" },
          { term: "Minimum price", definition: "A floor price set above equilibrium" },
          { term: "Maximum price", definition: "A ceiling price set below equilibrium" },
        ],
        examTip: "Evaluate interventions · consider unintended consequences, government failure, and whether the policy addresses the root cause.",
      },
    ],
  },
  {
    name: "The Labour Market",
    subtopics: [
      {
        title: "Wage Determination",
        content: "Wages are determined by the **demand for and supply of labour**.\n\n**Demand for labour** depends on productivity, demand for the product (derived demand), and cost of capital.\n\n**Supply of labour** depends on wages, working conditions, qualifications needed, and population.\n\nThe **minimum wage** sets a floor price in the labour market.",
        keyTerms: [
          { term: "Derived demand", definition: "Demand for labour that comes from demand for the product" },
          { term: "Minimum wage", definition: "A legal minimum hourly rate of pay" },
          { term: "Labour supply", definition: "The number of workers willing and able to work at a given wage" },
        ],
      },
    ],
  },
];

export const ocrGcseComponent2Topics: Topic[] = [
  {
    name: "The UK Economy",
    subtopics: [
      {
        title: "Economic Growth",
        content: "**Economic growth** is an increase in real GDP over time.\n\n**GDP** measures the total value of goods and services produced in an economy.\n\nGrowth can be shown by an outward shift of the **PPC** or a rightward shift of **LRAS**.\n\nBenefits: higher living standards, lower unemployment.\nCosts: inflation, environmental damage, inequality.",
        keyTerms: [
          { term: "GDP", definition: "The total value of goods and services produced in an economy" },
          { term: "Real GDP", definition: "GDP adjusted for inflation" },
          { term: "Economic growth", definition: "An increase in real GDP over time" },
        ],
      },
      {
        title: "Unemployment",
        content: "**Unemployment** occurs when people who are willing and able to work cannot find a job.\n\nTypes: **Cyclical** (demand-deficient), **Structural**, **Frictional**, **Seasonal**.\n\nConsequences: lower GDP, higher government spending on benefits, social problems.",
        keyTerms: [
          { term: "Unemployment", definition: "When people willing and able to work cannot find a job" },
          { term: "Cyclical unemployment", definition: "Caused by a fall in aggregate demand during recession" },
          { term: "Structural unemployment", definition: "Caused by changes in the structure of the economy" },
          { term: "Frictional unemployment", definition: "Short-term unemployment between jobs" },
        ],
      },
      {
        title: "Inflation",
        content: "**Inflation** is a sustained rise in the general price level.\n\n**Demand-pull inflation**: caused by excess demand (AD shifts right).\n**Cost-push inflation**: caused by rising costs of production (AS shifts left).\n\nMeasured by **CPI** (Consumer Price Index).\n\nConsequences: reduced purchasing power, uncertainty, menu costs.",
        keyTerms: [
          { term: "Inflation", definition: "A sustained rise in the general price level" },
          { term: "CPI", definition: "Consumer Price Index · a measure of inflation" },
          { term: "Demand-pull", definition: "Inflation caused by excess aggregate demand" },
          { term: "Cost-push", definition: "Inflation caused by rising costs of production" },
        ],
        examTip: "Always distinguish between demand-pull and cost-push inflation and use AD/AS diagrams to illustrate.",
      },
    ],
  },
  {
    name: "Government Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        content: "**Fiscal policy** involves changes in government spending and taxation to influence the economy.\n\n**Expansionary**: increase spending / cut taxes → boost AD.\n**Contractionary**: cut spending / raise taxes → reduce AD.\n\nUsed to manage growth, unemployment, and inflation.",
        keyTerms: [
          { term: "Fiscal policy", definition: "Use of government spending and taxation to influence the economy" },
          { term: "Budget deficit", definition: "When government spending exceeds tax revenue" },
          { term: "Budget surplus", definition: "When tax revenue exceeds government spending" },
        ],
      },
      {
        title: "Monetary Policy",
        content: "**Monetary policy** involves changes in interest rates and money supply by the central bank.\n\nLower interest rates → cheaper borrowing → more spending → AD rises.\nHigher interest rates → more expensive borrowing → less spending → AD falls.\n\nThe Bank of England targets 2% CPI inflation.",
        keyTerms: [
          { term: "Monetary policy", definition: "Use of interest rates and money supply to influence the economy" },
          { term: "Interest rates", definition: "The cost of borrowing and the reward for saving" },
          { term: "Bank of England", definition: "The UK's central bank responsible for monetary policy" },
        ],
      },
      {
        title: "Supply-Side Policies",
        content: "**Supply-side policies** aim to increase the productive capacity of the economy (shift LRAS right).\n\nExamples: education & training, deregulation, infrastructure investment, tax cuts to incentivise work.\n\nAdvantages: sustainable growth without inflation.\nDisadvantages: time lag, costly, may increase inequality.",
        keyTerms: [
          { term: "Supply-side policies", definition: "Policies aimed at increasing productive capacity" },
          { term: "LRAS", definition: "Long-run aggregate supply · the economy's productive potential" },
          { term: "Productivity", definition: "Output per worker per unit of time" },
          { term: "Deregulation", definition: "Removing government rules and regulations" },
        ],
      },
    ],
  },
  {
    name: "International Trade & Globalisation",
    subtopics: [
      {
        title: "International Trade",
        content: "Countries trade because of **specialisation** and **comparative advantage** · producing goods at a lower opportunity cost.\n\nBenefits: lower prices, greater choice, economies of scale.\nRisks: job losses in uncompetitive industries, over-dependence on imports.",
        keyTerms: [
          { term: "Specialisation", definition: "Focusing on producing goods where you have lowest opportunity cost" },
          { term: "Comparative advantage", definition: "Ability to produce a good at a lower opportunity cost" },
          { term: "Free trade", definition: "Trade without barriers such as tariffs or quotas" },
        ],
      },
      {
        title: "Globalisation",
        content: "**Globalisation** is the increasing integration and interdependence of world economies.\n\nCauses: improved transport, technology, trade liberalisation, MNCs.\n\nBenefits: economic growth, lower prices, cultural exchange.\nCosts: environmental damage, exploitation, inequality between nations.",
        keyTerms: [
          { term: "Globalisation", definition: "Increasing integration and interdependence of world economies" },
          { term: "MNCs", definition: "Multinational corporations operating in multiple countries" },
          { term: "Trade liberalisation", definition: "Reducing barriers to international trade" },
        ],
        examTip: "In discuss questions, weigh up both sides and consider who benefits · developed vs developing countries.",
      },
    ],
  },
];
