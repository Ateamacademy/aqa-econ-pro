import type { Topic } from "./edexcelANotes";

export const ocrGcseComponent1Topics: Topic[] = [
  {
    title: "The Role of Markets",
    subtopics: [
      {
        title: "The Economic Problem",
        content: "Economics studies how scarce resources are allocated to satisfy unlimited wants. The basic economic problem is **scarcity** — there are not enough resources to produce everything people want.\n\n**Factors of production**: Land, Labour, Capital, Enterprise.\n\n**Opportunity cost** is the next best alternative foregone when a choice is made.",
        keyTerms: ["Scarcity", "Opportunity cost", "Factors of production", "Needs vs wants"],
        examTip: "Always define opportunity cost with a real-world example — e.g. 'If a government spends £10bn on defence, the opportunity cost might be £10bn less spent on the NHS.'",
      },
      {
        title: "Demand",
        content: "**Demand** is the quantity of a good or service consumers are willing and able to buy at a given price.\n\nThe **law of demand** states that as price rises, quantity demanded falls (ceteris paribus).\n\n**Shifts in demand** are caused by changes in income, tastes, population, price of substitutes/complements, and advertising.",
        keyTerms: ["Demand", "Law of demand", "Movement along", "Shift in demand", "Substitutes", "Complements"],
        examTip: "Distinguish between a movement along the demand curve (caused by price changes) and a shift of the curve (caused by non-price factors).",
        diagram: "supply-demand" as any,
      },
      {
        title: "Supply",
        content: "**Supply** is the quantity of a good or service producers are willing and able to sell at a given price.\n\nThe **law of supply** states that as price rises, quantity supplied rises (ceteris paribus).\n\n**Shifts in supply** are caused by changes in costs of production, technology, taxes, subsidies, and weather.",
        keyTerms: ["Supply", "Law of supply", "Costs of production", "Subsidies", "Indirect taxes"],
        examTip: "A subsidy shifts supply to the right (more supplied at each price). An indirect tax shifts supply to the left.",
      },
      {
        title: "Price Determination",
        content: "**Equilibrium** occurs where demand equals supply. At this point, there is no tendency for the price to change.\n\nIf price is above equilibrium → **surplus** (excess supply).\nIf price is below equilibrium → **shortage** (excess demand).\n\nThe price mechanism acts as a signal, incentive, and rationing device.",
        keyTerms: ["Equilibrium", "Surplus", "Shortage", "Price mechanism"],
        diagram: "supply-demand" as any,
      },
    ],
  },
  {
    title: "Market Failure",
    subtopics: [
      {
        title: "Types of Market Failure",
        content: "**Market failure** occurs when the free market fails to allocate resources efficiently.\n\nTypes include:\n- **Externalities** (positive and negative, production and consumption)\n- **Public goods** (non-rivalrous, non-excludable)\n- **Merit and demerit goods**\n- **Information failure**\n- **Monopoly power**",
        keyTerms: ["Market failure", "Externalities", "Public goods", "Merit goods", "Demerit goods", "Information failure"],
      },
      {
        title: "Externalities",
        content: "**Negative externalities** are harmful side effects to third parties (e.g. pollution from a factory).\n\n**Positive externalities** are beneficial side effects (e.g. education benefits society).\n\nExternalities cause a divergence between **private costs/benefits** and **social costs/benefits**, leading to over- or under-production.",
        keyTerms: ["Negative externality", "Positive externality", "Social cost", "Private cost", "Third party"],
        examTip: "In 6-mark questions, always draw a diagram showing MSC/MSB diverging from MPC/MPB to illustrate the welfare loss.",
      },
      {
        title: "Government Intervention",
        content: "Governments can correct market failure through:\n- **Indirect taxes** (raise price of demerit goods)\n- **Subsidies** (lower price of merit goods)\n- **Regulation and legislation**\n- **Provision of public goods**\n- **Information provision**\n- **Minimum/maximum prices**",
        keyTerms: ["Indirect tax", "Subsidy", "Regulation", "Minimum price", "Maximum price"],
        examTip: "Evaluate interventions — consider unintended consequences, government failure, and whether the policy addresses the root cause.",
      },
    ],
  },
  {
    title: "The Labour Market",
    subtopics: [
      {
        title: "Wage Determination",
        content: "Wages are determined by the **demand for and supply of labour**.\n\n**Demand for labour** depends on productivity, demand for the product (derived demand), and cost of capital.\n\n**Supply of labour** depends on wages, working conditions, qualifications needed, and population.\n\nThe **minimum wage** sets a floor price in the labour market.",
        keyTerms: ["Derived demand", "Minimum wage", "Labour supply", "Wage rate"],
      },
    ],
  },
];

export const ocrGcseComponent2Topics: Topic[] = [
  {
    title: "The UK Economy",
    subtopics: [
      {
        title: "Economic Growth",
        content: "**Economic growth** is an increase in real GDP over time.\n\n**GDP** measures the total value of goods and services produced in an economy.\n\nGrowth can be shown by an outward shift of the **PPC** or a rightward shift of **LRAS**.\n\nBenefits: higher living standards, lower unemployment.\nCosts: inflation, environmental damage, inequality.",
        keyTerms: ["GDP", "Real GDP", "Economic growth", "PPC", "Living standards"],
      },
      {
        title: "Unemployment",
        content: "**Unemployment** occurs when people who are willing and able to work cannot find a job.\n\nTypes: **Cyclical** (demand-deficient), **Structural**, **Frictional**, **Seasonal**.\n\nConsequences: lower GDP, higher government spending on benefits, social problems.",
        keyTerms: ["Unemployment", "Cyclical", "Structural", "Frictional", "Claimant count"],
      },
      {
        title: "Inflation",
        content: "**Inflation** is a sustained rise in the general price level.\n\n**Demand-pull inflation**: caused by excess demand (AD shifts right).\n**Cost-push inflation**: caused by rising costs of production (AS shifts left).\n\nMeasured by **CPI** (Consumer Price Index).\n\nConsequences: reduced purchasing power, uncertainty, menu costs.",
        keyTerms: ["Inflation", "CPI", "Demand-pull", "Cost-push", "Purchasing power"],
        examTip: "Always distinguish between demand-pull and cost-push inflation and use AD/AS diagrams to illustrate.",
      },
    ],
  },
  {
    title: "Government Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        content: "**Fiscal policy** involves changes in government spending and taxation to influence the economy.\n\n**Expansionary**: increase spending / cut taxes → boost AD.\n**Contractionary**: cut spending / raise taxes → reduce AD.\n\nUsed to manage growth, unemployment, and inflation.",
        keyTerms: ["Fiscal policy", "Government spending", "Taxation", "Budget deficit", "Budget surplus"],
      },
      {
        title: "Monetary Policy",
        content: "**Monetary policy** involves changes in interest rates and money supply by the central bank.\n\nLower interest rates → cheaper borrowing → more spending → AD rises.\nHigher interest rates → more expensive borrowing → less spending → AD falls.\n\nThe Bank of England targets 2% CPI inflation.",
        keyTerms: ["Monetary policy", "Interest rates", "Bank of England", "Inflation target"],
      },
      {
        title: "Supply-Side Policies",
        content: "**Supply-side policies** aim to increase the productive capacity of the economy (shift LRAS right).\n\nExamples: education & training, deregulation, infrastructure investment, tax cuts to incentivise work.\n\nAdvantages: sustainable growth without inflation.\nDisadvantages: time lag, costly, may increase inequality.",
        keyTerms: ["Supply-side policies", "LRAS", "Productivity", "Deregulation", "Training"],
      },
    ],
  },
  {
    title: "International Trade & Globalisation",
    subtopics: [
      {
        title: "International Trade",
        content: "Countries trade because of **specialisation** and **comparative advantage** — producing goods at a lower opportunity cost.\n\nBenefits: lower prices, greater choice, economies of scale.\nRisks: job losses in uncompetitive industries, over-dependence on imports.",
        keyTerms: ["Specialisation", "Comparative advantage", "Exports", "Imports", "Free trade"],
      },
      {
        title: "Globalisation",
        content: "**Globalisation** is the increasing integration and interdependence of world economies.\n\nCauses: improved transport, technology, trade liberalisation, MNCs.\n\nBenefits: economic growth, lower prices, cultural exchange.\nCosts: environmental damage, exploitation, inequality between nations.",
        keyTerms: ["Globalisation", "MNCs", "Trade liberalisation", "Interdependence"],
        examTip: "In discuss questions, weigh up both sides and consider who benefits — developed vs developing countries.",
      },
    ],
  },
];
