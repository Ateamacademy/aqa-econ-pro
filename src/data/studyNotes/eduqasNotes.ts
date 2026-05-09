import type { Topic } from "./edexcelANotes";

/* ═══════════════════════════════════════════════════════════════
 *  EDUQAS A-LEVEL ECONOMICS · STUDY NOTES
 *  Components 1 (Micro), 2 (Macro), 3 (Synoptic)
 * ═══════════════════════════════════════════════════════════════ */

export const eduqasComponent1Topics: Topic[] = [
  {
    name: "Component 1: Markets & Market Failure",
    subtopics: [
      {
        title: "The Economic Problem & Resource Allocation",
        definition: "Economics studies how scarce resources are allocated to satisfy unlimited wants. The fundamental questions: what, how, and for whom to produce.",
        keyTerms: [
          { term: "Scarcity", definition: "Finite resources vs infinite wants · the basis of all economics" },
          { term: "Opportunity Cost", definition: "The next best alternative foregone when making a choice" },
          { term: "Specialisation", definition: "Focusing on producing specific goods/services for efficiency gains" },
        ],
        explanation: "Resource allocation methods: free market (price mechanism), command economy (state planning), mixed economy (combination).\n\nThe PPC model: shows maximum output, opportunity cost, efficiency, and economic growth.",
        examTip: "Eduqas data response questions require application to real-world data · always reference the extract/data provided.",
        diagram: "ppf",
      },
      {
        title: "Demand, Supply & Price Determination",
        definition: "The **price mechanism** coordinates buyers and sellers, allocating resources through the signalling, incentive, and rationing functions of price.",
        keyTerms: [
          { term: "Signalling Function", definition: "Prices communicate information to buyers and sellers" },
          { term: "Incentive Function", definition: "Price changes motivate economic agents to change behaviour" },
          { term: "Rationing Function", definition: "Prices allocate scarce resources to those willing and able to pay" },
        ],
        explanation: "Demand curve: downward sloping (law of diminishing marginal utility). Supply curve: upward sloping (profit motive).\n\nEquilibrium: where D = S. Disequilibrium → automatic adjustment via price changes.\n\nElasticity: PED, PES, YED, XED · all measure responsiveness to changes.",
        examTip: "For Eduqas, always explain the adjustment mechanism: excess demand → price rises → Qd falls, Qs rises → back to equilibrium.",
        diagram: "supply_demand",
      },
      {
        title: "Market Failure & Government Intervention",
        definition: "**Market failure** occurs when the free market misallocates resources. MSC ≠ MSB at the market equilibrium.",
        keyTerms: [
          { term: "Negative Externality", definition: "External cost to third parties not reflected in market price" },
          { term: "Positive Externality", definition: "External benefit to third parties not reflected in market price" },
          { term: "Government Failure", definition: "When intervention leads to a worse allocation than the free market" },
        ],
        explanation: "Types: externalities, public goods, merit/demerit goods, information failure, monopoly power, inequality.\n\nGovernment responses: indirect taxes, subsidies, regulation, direct provision, tradable permits, information provision.\n\nAlways evaluate: government failure is possible · unintended consequences, information gaps, bureaucratic costs, political motivation.",
        examTip: "Eduqas 20-mark essays need evaluation of BOTH the market failure AND government intervention. Always discuss government failure as a counterpoint.",
      },
      {
        title: "Market Structures",
        definition: "Markets differ by the number of firms, barriers to entry, product differentiation, and market power.",
        keyTerms: [
          { term: "Perfect Competition", definition: "Many firms, homogeneous products, no barriers to entry" },
          { term: "Monopoly", definition: "Single seller, high barriers to entry, price-maker" },
          { term: "Oligopoly", definition: "Few dominant firms, interdependence, barriers to entry" },
          { term: "Contestable Market", definition: "Low barriers to entry and exit · threat of competition disciplines firms" },
        ],
        explanation: "Key concepts: normal vs supernormal profit, productive vs allocative efficiency, dynamic efficiency, price discrimination.\n\nOligopoly: kinked demand curve (price rigidity), game theory, collusion, cartels.\n\nMonopoly evaluation: X-inefficiency and deadweight loss vs economies of scale and dynamic efficiency.",
        examTip: "Eduqas expects cost/revenue diagrams for market structures. Practice drawing MC, ATC, AR, and MR curves for each structure.",
      },
    ],
  },
];

export const eduqasComponent2Topics: Topic[] = [
  {
    name: "Component 2: National & International Economy",
    subtopics: [
      {
        title: "Macroeconomic Performance",
        definition: "The key indicators: GDP growth, inflation, unemployment, and the balance of payments. These form the 'macroeconomic diamond'.",
        keyTerms: [
          { term: "Real GDP", definition: "GDP adjusted for inflation · measures true economic output" },
          { term: "GDP per Capita", definition: "GDP divided by population · indicator of average living standards" },
          { term: "HDI", definition: "Human Development Index · composite measure including health, education, income" },
        ],
        explanation: "GDP limitations: ignores inequality, informal economy, environmental damage, quality of life, leisure time.\n\nThe business cycle: recovery → boom → slowdown → recession. Each phase has characteristic patterns in unemployment, inflation, investment, and consumer confidence.\n\nOutputgap: positive = overheating; negative = spare capacity.",
        examTip: "Eduqas loves data interpretation. When given GDP data, calculate growth rates and identify trends before analysing causes.",
      },
      {
        title: "Aggregate Demand, Aggregate Supply & Equilibrium",
        definition: "**AD** = C + I + G + (X-M). Short-run equilibrium where AD = SRAS. Long-run equilibrium where AD = LRAS at Yn.",
        keyTerms: [
          { term: "Multiplier", definition: "k = 1/(1-MPC) or 1/(MPW). Initial change in spending leads to larger change in national income" },
          { term: "Keynesian LRAS", definition: "Three sections: horizontal (spare capacity), upward-sloping (near full employment), vertical (full employment)" },
          { term: "Classical LRAS", definition: "Always vertical at Yn · economy self-corrects in long run" },
        ],
        explanation: "AD shifts: consumer confidence, interest rates, fiscal policy, exchange rate, global demand.\n\nSRAS shifts: input costs, commodity prices, exchange rate, indirect taxes.\n\nLRAS shifts: labour force, technology, education, infrastructure, institutions.",
        examTip: "For Eduqas synoptic questions, show both Keynesian and Classical perspectives · demonstrating awareness of different schools of thought.",
        diagram: "ad_increase",
      },
      {
        title: "Macroeconomic Policy",
        definition: "Government uses fiscal, monetary, and supply-side policies to achieve macroeconomic objectives.",
        keyTerms: [
          { term: "Fiscal Policy", definition: "Use of government spending (G) and taxation (T) to influence AD" },
          { term: "Monetary Policy", definition: "Use of interest rates, money supply, and QE by the central bank" },
          { term: "Supply-Side Policies", definition: "Policies to shift LRAS right · education, deregulation, tax incentives" },
        ],
        explanation: "Policy conflicts: growth vs inflation, unemployment vs inflation (Phillips Curve), growth vs current account deficit, growth vs environmental sustainability.\n\nEvaluation framework: effectiveness depends on time lags, magnitude, side effects, global conditions, and coordination between policy tools.",
        examTip: "For 20-mark essays, structure as: define → explain → apply → evaluate (with counterarguments and conclusion).",
      },
      {
        title: "International Trade & Globalisation",
        definition: "**Globalisation** is the increasing integration of world economies through trade, capital flows, migration, and technology.",
        keyTerms: [
          { term: "Comparative Advantage", definition: "Ability to produce at a lower opportunity cost" },
          { term: "Terms of Trade", definition: "(Export price index / Import price index) × 100" },
          { term: "Current Account Deficit", definition: "Imports of goods and services exceed exports" },
        ],
        explanation: "Benefits of trade: specialisation, lower prices, greater choice, technology transfer, economies of scale.\n\nArguments for protectionism: infant industry, dumping, job protection, national security, environmental standards.\n\nExchange rates: floating vs fixed. Depreciation → exports cheaper, imports dearer (Marshall-Lerner condition for improvement).",
        examTip: "Eduqas Component 3 (synoptic) draws on both micro and macro · practice linking trade to market structures, development, and inequality.",
      },
    ],
  },
];
