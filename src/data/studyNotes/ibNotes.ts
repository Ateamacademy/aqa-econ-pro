import type { Topic } from "./edexcelANotes";

/* ═══════════════════════════════════════════════════════════════
 *  IB ECONOMICS (HL/SL) · STUDY NOTES
 *  Structured by the 4 IB syllabus units
 * ═══════════════════════════════════════════════════════════════ */

export const ibUnit1And2Topics: Topic[] = [
  {
    name: "1.1 What is Economics? & The Economic Problem",
    subtopics: [
      {
        title: "Scarcity, Choice & Opportunity Cost",
        definition: "**Scarcity** is the fundamental economic problem: unlimited wants vs limited resources. Every choice has an **opportunity cost** · the next best alternative foregone.",
        keyTerms: [
          { term: "Scarcity", definition: "Unlimited human wants but finite resources" },
          { term: "Opportunity Cost", definition: "The value of the next best alternative foregone" },
          { term: "Factors of Production", definition: "Land, Labour, Capital, Entrepreneurship" },
          { term: "Free Good", definition: "A good with zero opportunity cost (e.g. air)" },
        ],
        explanation: "The IB syllabus centres on **nine key concepts**: scarcity, choice, efficiency, equity, economic well-being, sustainability, change, interdependence, intervention.\n\nThe **PPC model** illustrates opportunity cost, efficiency, and growth. Points on the curve are productively efficient; inside = unemployed resources; outside = unattainable without growth.",
        examTip: "IB examiners reward use of the nine key concepts. Always link your analysis back to at least one concept for top marks.",
        diagram: "ppf",
      },
      {
        title: "The Circular Flow of Income",
        definition: "The **circular flow model** shows interdependence between households and firms, with leakages (S, T, M) and injections (I, G, X).",
        keyTerms: [
          { term: "Leakages", definition: "Savings, taxation, and import expenditure · money leaving the circular flow" },
          { term: "Injections", definition: "Investment, government spending, export revenue · money entering the circular flow" },
        ],
        explanation: "If injections > leakages → national income rises (expansion). If leakages > injections → national income falls (contraction). Equilibrium when S+T+M = I+G+X.",
        examTip: "Always draw the full open-economy model with government and foreign sectors · the simple two-sector model is insufficient at IB level.",
      },
    ],
  },
  {
    name: "2.1–2.3 Demand, Supply & Market Equilibrium",
    subtopics: [
      {
        title: "The Law of Demand & Supply",
        definition: "The **law of demand** states that as price rises, quantity demanded falls (ceteris paribus). The **law of supply** states that as price rises, quantity supplied rises.",
        keyTerms: [
          { term: "Ceteris Paribus", definition: "All other things being equal · holding other variables constant" },
          { term: "Market Equilibrium", definition: "Where demand equals supply; no tendency for price to change" },
          { term: "Excess Demand", definition: "When quantity demanded exceeds quantity supplied (shortage)" },
          { term: "Excess Supply", definition: "When quantity supplied exceeds quantity demanded (surplus)" },
        ],
        explanation: "Non-price determinants of demand: income, tastes, prices of related goods, expectations, demographics.\nNon-price determinants of supply: input costs, technology, taxes/subsidies, expectations, number of firms.\n\nIB HL students must also handle **linear demand/supply functions** and calculate equilibrium algebraically.",
        examTip: "When shifting curves, always state the determinant, direction of shift, and new equilibrium. Label diagrams fully with P₀→P₁ and Q₀→Q₁.",
        diagram: "supply_demand",
      },
      {
        title: "Consumer & Producer Surplus",
        definition: "**Consumer surplus** is the difference between willingness to pay and the market price. **Producer surplus** is the difference between the market price and the minimum price a producer would accept.",
        keyTerms: [
          { term: "Consumer Surplus", definition: "Area above price and below demand curve" },
          { term: "Producer Surplus", definition: "Area below price and above supply curve" },
          { term: "Allocative Efficiency", definition: "Achieved at competitive equilibrium where MSB = MSC" },
        ],
        explanation: "At competitive equilibrium, **social (community) surplus** = consumer surplus + producer surplus, and is maximised. This represents allocative efficiency.",
        examTip: "Shade surplus areas clearly on diagrams and label them. IB examiners specifically look for this.",
      },
    ],
  },
  {
    name: "2.5–2.6 Elasticities",
    subtopics: [
      {
        title: "Price Elasticity of Demand (PED)",
        definition: "**PED** measures the responsiveness of quantity demanded to a change in price. PED = % change in Qd / % change in P.",
        keyTerms: [
          { term: "Elastic Demand", definition: "PED > 1 · quantity demanded is highly responsive to price changes" },
          { term: "Inelastic Demand", definition: "PED < 1 · quantity demanded is not very responsive to price changes" },
          { term: "Unit Elastic", definition: "PED = 1 · proportional change in Qd equals proportional change in P" },
        ],
        explanation: "Determinants: number of substitutes, necessity vs luxury, proportion of income, time period.\n\n**Revenue relationship:** If demand is elastic, a price cut increases total revenue. If inelastic, a price rise increases total revenue.\n\nHL: PED varies along a straight-line demand curve (not equal to slope).",
        examTip: "Always treat PED as a positive value (absolute value convention in IB). Link PED to total revenue implications for firms.",
      },
      {
        title: "YED, XED & PES",
        definition: "**YED** measures responsiveness of demand to income changes. **XED** measures responsiveness of demand to price changes of related goods. **PES** measures responsiveness of quantity supplied to price changes.",
        keyTerms: [
          { term: "Normal Good", definition: "Positive YED · demand rises as income rises" },
          { term: "Inferior Good", definition: "Negative YED · demand falls as income rises" },
          { term: "Substitutes", definition: "Positive XED · demand for one rises when price of other rises" },
          { term: "Complements", definition: "Negative XED · demand for one falls when price of other rises" },
        ],
        explanation: "YED significance: primary commodities have low YED; services have high YED. As countries develop, the share of services in GDP rises.\n\nPES determinants: time, factor mobility, unused capacity, ability to store stock. Primary commodities generally have low PES.",
        examTip: "For YED and XED, always state the sign AND the magnitude · both carry marks.",
      },
    ],
  },
  {
    name: "2.7–2.9 Government Intervention & Market Failure",
    subtopics: [
      {
        title: "Indirect Taxes & Subsidies",
        definition: "**Indirect taxes** raise the cost of production, shifting supply left. **Subsidies** lower costs, shifting supply right.",
        keyTerms: [
          { term: "Specific Tax", definition: "A fixed amount per unit (e.g. 50p per litre)" },
          { term: "Ad Valorem Tax", definition: "A percentage of the price (e.g. VAT at 20%)" },
          { term: "Tax Incidence", definition: "The burden of tax split between consumers and producers, determined by PED and PES" },
        ],
        explanation: "With a tax: new supply curve shifts left by the tax amount. Consumer pays part, producer absorbs part. Deadweight loss = welfare loss.\n\nHL: Calculate tax incidence using linear functions. The more inelastic side bears the greater burden.",
        examTip: "Always draw both the original and new supply curves, show the tax wedge, and shade the deadweight loss triangle.",
        diagram: "tax_incidence",
      },
      {
        title: "Externalities & Welfare Loss",
        definition: "**Externalities** are costs or benefits to third parties not reflected in market prices. They cause market failure because MSC ≠ MPC or MSB ≠ MPB.",
        keyTerms: [
          { term: "Negative Externality", definition: "External cost · MSC > MPC (e.g. pollution)" },
          { term: "Positive Externality", definition: "External benefit · MSB > MPB (e.g. education)" },
          { term: "Merit Good", definition: "Good whose consumption creates positive externalities" },
          { term: "Demerit Good", definition: "Good whose consumption creates negative externalities" },
        ],
        explanation: "With negative externalities of production: market overproduces (Q market > Q optimal). Welfare loss = area between MSC and MSB from Q optimal to Q market.\n\nWith positive externalities of consumption: market underproduces (Q market < Q optimal).\n\nGovernment responses: taxes, subsidies, regulation, tradable permits, direct provision.",
        examTip: "Draw externality diagrams precisely: MPC, MSC (or MPB, MSB), show the welfare loss triangle, and label Q market vs Q optimal.",
      },
      {
        title: "Public Goods & Common Access Resources",
        definition: "**Public goods** are non-rivalrous and non-excludable, leading to the free rider problem. **Common access resources** are rivalrous but non-excludable, leading to overuse.",
        keyTerms: [
          { term: "Non-Rivalrous", definition: "One person's consumption does not reduce availability for others" },
          { term: "Non-Excludable", definition: "Impossible to prevent non-payers from consuming" },
          { term: "Free Rider Problem", definition: "People benefit without paying, so private market under-provides" },
          { term: "Tragedy of the Commons", definition: "Overexploitation of shared resources due to lack of ownership" },
        ],
        explanation: "Public goods: street lighting, national defence, flood barriers. Market fails because no profit incentive → government must provide directly.\n\nCommon access resources: fisheries, forests, atmosphere. Overuse threatens sustainability. Solutions: regulation, property rights, carbon taxes, cap-and-trade.",
        examTip: "Always classify goods using the rivalry/excludability matrix. For common access resources, link to sustainability · a key IB concept.",
      },
    ],
  },
];

export const ibUnit3And4Topics: Topic[] = [
  {
    name: "3.1–3.2 Measuring Economic Activity & AD/AS",
    subtopics: [
      {
        title: "GDP & National Income",
        definition: "**GDP** (Gross Domestic Product) measures the total value of goods and services produced in an economy over a period.",
        keyTerms: [
          { term: "Nominal GDP", definition: "GDP measured at current prices (not adjusted for inflation)" },
          { term: "Real GDP", definition: "GDP adjusted for inflation · shows true growth" },
          { term: "GDP per Capita", definition: "GDP divided by population · better indicator of living standards" },
          { term: "Green GDP", definition: "GDP adjusted for environmental degradation" },
        ],
        explanation: "Three methods of calculating GDP: output (production), income, expenditure. All should give the same result.\n\nGDP = C + I + G + (X - M)\n\nLimitations: ignores informal economy, inequality, environmental damage, non-market activity, quality of life.",
        examTip: "IB loves evaluation of GDP as a measure of well-being. Always discuss at least 2 limitations and suggest alternatives (HDI, HPI, GNI).",
      },
      {
        title: "Aggregate Demand & Aggregate Supply",
        definition: "**AD** = total spending in an economy (C+I+G+X-M). **AS** = total output firms are willing to supply at each price level.",
        keyTerms: [
          { term: "AD Curve", definition: "Downward sloping · real wealth, interest rate, and international competitiveness effects" },
          { term: "SRAS Curve", definition: "Upward sloping · higher prices incentivise more output in short run" },
          { term: "LRAS Curve", definition: "Vertical at full employment output (Yn) · in the long run, output determined by supply-side factors" },
        ],
        explanation: "**Keynesian AS** has three sections: horizontal (spare capacity), upward-sloping (near capacity), vertical (full employment).\n\n**New Classical AS**: LRAS is always vertical at Yn; short-run adjustments occur via shifting SRAS.\n\nIB students should be comfortable with BOTH models and know when to use each.",
        examTip: "Always specify whether you're using the Keynesian or New Classical model. IB examiners accept both but require consistency.",
        diagram: "ad_increase",
      },
    ],
  },
  {
    name: "3.3–3.4 Macroeconomic Objectives & Inequality",
    subtopics: [
      {
        title: "Economic Growth, Unemployment & Inflation",
        definition: "The four main macroeconomic objectives: economic growth, low unemployment, low & stable inflation, and a sustainable balance of payments.",
        keyTerms: [
          { term: "Actual Growth", definition: "Increase in real GDP · movement towards or along the PPF" },
          { term: "Potential Growth", definition: "Increase in productive capacity · outward shift of PPF / LRAS" },
          { term: "Natural Rate of Unemployment", definition: "The equilibrium rate of unemployment when the labour market clears" },
          { term: "Demand-Pull Inflation", definition: "Inflation caused by excess aggregate demand" },
          { term: "Cost-Push Inflation", definition: "Inflation caused by rising costs of production" },
        ],
        explanation: "**Conflicts between objectives:**\n- Growth ↔ Inflation (short-run trade-off)\n- Growth ↔ Environment (sustainability)\n- Low unemployment ↔ Low inflation (Phillips Curve trade-off)\n\nIB emphasises the **equity** concept throughout · growth that increases inequality may not improve well-being.",
        examTip: "For any policy evaluation, discuss at least one conflict between objectives. This shows sophisticated analysis.",
      },
      {
        title: "Inequality & Poverty",
        definition: "**Income inequality** measures the uneven distribution of income. **Poverty** can be absolute (below subsistence) or relative (below a proportion of median income).",
        keyTerms: [
          { term: "Gini Coefficient", definition: "Measures inequality from 0 (perfect equality) to 1 (perfect inequality)" },
          { term: "Lorenz Curve", definition: "Graphical representation of income distribution · further from 45° line = more inequality" },
          { term: "Absolute Poverty", definition: "Income below the level needed to meet basic needs" },
          { term: "Relative Poverty", definition: "Income below a certain percentage of the median (e.g. 60%)" },
        ],
        explanation: "Causes of inequality: wage differentials, wealth inheritance, discrimination, globalisation, tax systems.\n\nPolicies to reduce: progressive taxation, transfer payments, minimum wages, education spending, anti-discrimination laws.\n\nIB stresses equity as a core concept · evaluate whether policies trade efficiency for equity.",
        examTip: "Draw the Lorenz curve with the 45° line of equality. Shade the area between them and label it as the basis for the Gini coefficient.",
      },
    ],
  },
  {
    name: "3.5–3.7 Demand & Supply-Side Policies",
    subtopics: [
      {
        title: "Monetary & Fiscal Policy",
        definition: "**Monetary policy** uses interest rates, money supply, and unconventional tools (QE) to manage AD. **Fiscal policy** uses government spending and taxation.",
        keyTerms: [
          { term: "Expansionary Fiscal Policy", definition: "Increase G or cut T to boost AD" },
          { term: "Contractionary Monetary Policy", definition: "Raise interest rates to reduce AD and control inflation" },
          { term: "Quantitative Easing", definition: "Central bank purchases assets to increase money supply when rates are near zero" },
          { term: "Multiplier Effect", definition: "Initial injection leads to a larger final increase in national income" },
        ],
        explanation: "IB requires understanding of both demand-side and supply-side responses.\n\n**Fiscal policy evaluation:** time lags, crowding out, government debt, political constraints.\n**Monetary policy evaluation:** time lags, liquidity trap, transmission mechanism uncertainty, exchange rate effects.",
        examTip: "Always discuss the multiplier when evaluating fiscal policy. Show the multiplier effect on an AD/AS diagram with the shift being larger than the initial injection.",
      },
      {
        title: "Supply-Side Policies",
        definition: "**Supply-side policies** aim to increase LRAS/potential output by improving the efficiency and productivity of the economy.",
        keyTerms: [
          { term: "Market-Based SSP", definition: "Deregulation, privatisation, trade liberalisation, tax reform" },
          { term: "Interventionist SSP", definition: "Education & training, infrastructure, industrial policy, R&D subsidies" },
        ],
        explanation: "Market-based: reduce government interference to improve incentives and efficiency. Interventionist: government actively invests to address market failures in skills, infrastructure, innovation.\n\nIB evaluates both approaches · neither is universally superior. Context matters.",
        examTip: "Show supply-side policies as a rightward shift of LRAS on the AD/AS diagram. Discuss both short-run and long-run effects.",
      },
    ],
  },
  {
    name: "4.1–4.5 The Global Economy",
    subtopics: [
      {
        title: "International Trade & Comparative Advantage",
        definition: "**Comparative advantage** exists when a country can produce a good at a lower opportunity cost than another country. This is the basis for mutual gains from trade.",
        keyTerms: [
          { term: "Absolute Advantage", definition: "Ability to produce more output with given resources" },
          { term: "Comparative Advantage", definition: "Ability to produce at a lower opportunity cost" },
          { term: "Free Trade", definition: "Trade without barriers between countries" },
          { term: "Protectionism", definition: "Government policies restricting imports (tariffs, quotas, subsidies)" },
        ],
        explanation: "Arguments for free trade: specialisation, lower prices, greater choice, competition, economies of scale.\n\nArguments for protectionism: infant industry, national security, anti-dumping, environmental protection, revenue.\n\nHL: Terms of trade = (index of export prices / index of import prices) × 100.",
        examTip: "IB loves tariff diagrams. Show domestic supply, world supply, tariff wedge, and label consumer surplus loss, government revenue, producer surplus gain, and deadweight loss.",
      },
      {
        title: "Economic Development",
        definition: "**Economic development** is a broader concept than growth · it includes improvements in living standards, health, education, freedom, and sustainability.",
        keyTerms: [
          { term: "HDI", definition: "Human Development Index · composite of life expectancy, education, and GNI per capita" },
          { term: "Sustainable Development", definition: "Development that meets present needs without compromising future generations" },
          { term: "MDGs/SDGs", definition: "Millennium/Sustainable Development Goals · global targets for development" },
        ],
        explanation: "Barriers to development: poverty cycle, institutional weaknesses, geography, international trade barriers, debt, corruption.\n\nStrategies: aid (bilateral, multilateral), trade liberalisation, FDI, microfinance, fair trade, debt relief, institutional reform.\n\nIB emphasises interdependence · development challenges require international cooperation.",
        examTip: "Use specific real-world examples from developing countries. IB rewards application to real contexts. Mention at least one SDG when discussing development.",
      },
    ],
  },
];
