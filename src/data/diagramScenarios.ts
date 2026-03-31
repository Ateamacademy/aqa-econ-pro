/**
 * Scenario-based diagram practice questions inspired by the Edexcel A Level
 * Economics Diagram Practice Book (tutor2u). Each scenario provides real-world
 * context requiring students to draw, annotate and explain an economic diagram.
 */

export interface DiagramScenario {
  id: string;
  section: string;
  topic: string;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  scenario: string;
  question: string;
  marks: number;
  expectedDiagramKeyword: string;
  hints?: string[];
}

export const DIAGRAM_SECTIONS = [
  "PPFs, Markets & Allocation",
  "Elasticity & Revenue",
  "Market Failure & Externalities",
  "Government Intervention",
  "Costs & Economies of Scale",
  "Revenue, Profits & Objectives",
  "Market Structures",
  "Labour Market",
  "National Income & Macro Equilibrium",
  "Macro Objectives",
  "Financial Markets & Monetary Policy",
  "Fiscal & Supply-Side Policies",
  "International Economy",
  "Inequality & Development",
] as const;

export type DiagramSection = (typeof DIAGRAM_SECTIONS)[number];

export const diagramScenarios: DiagramScenario[] = [
  // ── Section 1: PPFs, Markets & Allocation ──
  {
    id: "ppf-1",
    section: "PPFs, Markets & Allocation",
    topic: "PPF — Balanced Growth",
    difficulty: "Foundation",
    scenario: "An economy experiences balanced economic growth due to investment in both the manufacturing and services sectors.",
    question: "Draw a fully labelled production possibility frontier (PPF) showing balanced economic growth. Label the axes with 'Capital goods' and 'Consumer goods'. Show the original and new PPF, and mark a point inside the PPF representing unemployed resources.",
    marks: 4,
    expectedDiagramKeyword: "ppf",
    hints: ["The new PPF should shift outward symmetrically", "An interior point represents productive inefficiency"],
  },
  {
    id: "ppf-2",
    section: "PPFs, Markets & Allocation",
    topic: "PPF — Biased Growth",
    difficulty: "Intermediate",
    scenario: "A country invests heavily in AI and technology, dramatically improving productivity in capital goods production, while consumer goods production remains unchanged.",
    question: "Draw a PPF demonstrating biased (unbalanced) growth in favour of capital goods. Show the original and new PPF, labelling both axes and indicating the direction of the shift.",
    marks: 4,
    expectedDiagramKeyword: "ppf",
  },
  {
    id: "ppf-3",
    section: "PPFs, Markets & Allocation",
    topic: "PPF — Natural Disaster",
    difficulty: "Foundation",
    scenario: "A devastating earthquake destroys a proportion of all factors of production in a small island economy.",
    question: "Draw a PPF diagram showing the impact of this natural disaster on the economy's productive capacity. Label all axes and show both the original and new PPF positions.",
    marks: 4,
    expectedDiagramKeyword: "ppf",
  },

  // ── Section 2: Elasticity & Revenue ──
  {
    id: "elas-1",
    section: "Elasticity & Revenue",
    topic: "PED — Revenue Impact",
    difficulty: "Foundation",
    scenario: "A petrol retailer increases its price by 10%. Petrol has very price inelastic demand because there are few substitutes for most drivers.",
    question: "Draw a demand curve for petrol showing price inelastic demand. Show the price increase and shade the area of revenue gained and any area of revenue lost. What is the net effect on total revenue?",
    marks: 5,
    expectedDiagramKeyword: "supply_demand",
    hints: ["A steep demand curve represents inelastic demand", "Revenue gained > revenue lost for inelastic goods"],
  },
  {
    id: "elas-2",
    section: "Elasticity & Revenue",
    topic: "Cross Elasticity — Complements",
    difficulty: "Intermediate",
    scenario: "Apps and smartphones are complementary goods. A new generation of smartphones is released at a lower price point.",
    question: "Draw a cross-price elasticity of demand (XED) diagram with 'Price of Good Y' on the vertical axis and 'Quantity of Good X' on the horizontal axis. Show two curves: (1) a downward-sloping demand curve representing complementary goods (negative XED), and (2) an upward-sloping demand curve representing substitute goods (positive XED). Mark two price levels (P₁ and P₂) and two quantity levels (Q₁ and Q₂) with dashed projections. Explain the sign and magnitude of XED for each relationship.",
    marks: 6,
    expectedDiagramKeyword: "xed",
    hints: ["Complements: negative XED — price of Y rises, quantity of X falls", "Substitutes: positive XED — price of Y rises, quantity of X rises"],
  },
  {
    id: "elas-3",
    section: "Elasticity & Revenue",
    topic: "YED — Luxury Goods",
    difficulty: "Foundation",
    scenario: "Holidays to Disneyworld in the US have a high, positive income elasticity of demand — they are luxury goods.",
    question: "Draw a YED (income elasticity of demand) diagram with 'Average Income (£) Week' on the vertical axis and 'Quantity' on the horizontal axis. Show two upward-sloping demand curves: (1) 'Demand for Normal Good (YED > 0)' — a steeper curve, and (2) 'Demand for Luxury Good (YED > 1)' — a flatter, more responsive curve. Mark two income levels (e.g. 550 and 800) and two quantity levels (e.g. 850 and 950) with dashed projections showing how luxury goods are more income-elastic.",
    marks: 4,
    expectedDiagramKeyword: "yed",
    hints: ["Normal goods: YED > 0 but < 1 — demand rises less than proportionally with income", "Luxury goods: YED > 1 — demand rises more than proportionally with income"],
  },

  // ── Section 3: Market Failure & Externalities ──
  {
    id: "ext-1",
    section: "Market Failure & Externalities",
    topic: "Positive Externality in Consumption",
    difficulty: "Intermediate",
    scenario: "The MMR vaccine protects children from Measles, Mumps and Rubella. It generates significant private benefits for those vaccinated, plus external benefits because unvaccinated people benefit from reduced disease transmission. However, vaccination rates have fallen from 95% to 87% due to 'fake news' about vaccine dangers.",
    question: "Draw a fully labelled MSB/MPB diagram showing the positive externality in consumption from vaccination. Show the free market output, the socially optimal output, and shade the welfare loss triangle caused by under-consumption. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "positive_externality_consumption",
    hints: ["MSB lies above MPB (= Demand)", "The welfare loss triangle is between Q_market and Q_optimal"],
  },
  {
    id: "ext-2",
    section: "Market Failure & Externalities",
    topic: "Negative Externality in Production",
    difficulty: "Intermediate",
    scenario: "Steel production generates significant air pollution and carbon emissions, imposing costs on local communities in terms of health problems and environmental damage. The free market does not account for these external costs.",
    question: "Draw a fully labelled MSC/MPC diagram showing the negative externality in production from steel manufacturing. Show the free market output and the socially optimal output. Shade the welfare loss caused by overproduction. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "negative_externality_production",
    hints: ["MSC lies above MPC (= Supply)", "Overproduction occurs at Q_market > Q_optimal"],
  },
  {
    id: "ext-3",
    section: "Market Failure & Externalities",
    topic: "Information Failure — Demerit Good",
    difficulty: "Advanced",
    scenario: "Due to the addictive nature of alcohol and the fact that health effects are experienced far in the future, consumers suffer from information failure. This means demand is higher than it would be with full information.",
    question: "Draw a diagram showing the information gap in the alcohol consumption market. Show the perceived demand curve and the true demand curve (with full information), and indicate the extent of over-consumption. [5 marks]",
    marks: 5,
    expectedDiagramKeyword: "demerit_good",
  },

  // ── Section 4: Government Intervention ──
  {
    id: "gov-1",
    section: "Government Intervention",
    topic: "Maximum Price (Price Ceiling)",
    difficulty: "Foundation",
    scenario: "The UK government sets a maximum price for prescription medicine at £9.90 per item, below the free market equilibrium, to ensure everyone can afford essential medication regardless of income.",
    question: "Draw a supply and demand diagram showing the impact of a maximum price on the market for prescription medicine. Show the excess demand created and label the price ceiling. [5 marks]",
    marks: 5,
    expectedDiagramKeyword: "maximum_price",
    hints: ["Maximum price is set BELOW equilibrium", "Creates excess demand (shortage)"],
  },
  {
    id: "gov-2",
    section: "Government Intervention",
    topic: "Minimum Price (Price Floor)",
    difficulty: "Intermediate",
    scenario: "In May 2018, the Scottish government implemented a minimum price on alcohol of 50p per unit. Ministers said the minimum price was intended to tackle 'problem drinkers' who typically drink very cheap alcohol. A 2-litre bottle of strong cider (14 units) previously cost £2.50 but now costs £7.50.",
    question: "Draw a supply and demand diagram showing the impact of the minimum price on the market for cheap cider. Show the new price, the resulting excess supply, and explain the impact on consumption. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "minimum_price",
  },
  {
    id: "gov-3",
    section: "Government Intervention",
    topic: "Subsidy",
    difficulty: "Intermediate",
    scenario: "The UK Government's Energy Company Obligation Scheme (ECO) helps low-income families reduce energy bills by offering subsidies to building firms to reduce the price of home insulation materials.",
    question: "Draw a supply and demand diagram for the UK home insulation market showing the effect of a government subsidy. Show the shift in supply, the new equilibrium price and quantity, and explain how this corrects the market failure of under-consumption. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "subsidy",
  },
  {
    id: "gov-4",
    section: "Government Intervention",
    topic: "Ad Valorem vs Specific Tax",
    difficulty: "Advanced",
    scenario: "The government uses indirect taxes to correct market failure. VAT is an ad valorem tax (percentage of price), while the sugar tax is a specific tax (fixed amount per unit).",
    question: "Draw two separate diagrams: one showing the impact of an ad valorem tax and one showing a specific (unit) tax on a supply and demand diagram. Clearly show how the supply curve shifts differently in each case. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "indirect_tax",
  },
  {
    id: "gov-5",
    section: "Government Intervention",
    topic: "Tradable Pollution Permits",
    difficulty: "Advanced",
    scenario: "The EU Emissions Trading Scheme (EU-ETS) operates as a 'cap-and-trade' system. Carbon-producing firms receive permits; the government reduces the total 'cap' over time. By 2030, carbon emissions will be 43% lower than in 2005.",
    question: "Draw a supply and demand diagram for the market for carbon permits. Show what happens when the government reduces the cap (supply of permits). Show the impact on the equilibrium price and quantity of permits, and explain how this reduces pollution. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "supply_demand",
  },

  // ── Section 5: Costs & Economies of Scale ──
  {
    id: "costs-1",
    section: "Costs & Economies of Scale",
    topic: "Short-Run Cost Curves",
    difficulty: "Foundation",
    scenario: "Widgets Ltd is a small manufacturing firm. As it increases output, it initially benefits from division of labour but eventually experiences diminishing marginal returns.",
    question: "Draw a fully labelled diagram showing the ATC (Average Total Cost), AVC (Average Variable Cost), AFC (Average Fixed Cost), and MC (Marginal Cost) curves. Ensure the MC curve passes through the minimum points of both ATC and AVC. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "cost_curves",
  },
  {
    id: "costs-2",
    section: "Costs & Economies of Scale",
    topic: "Long-Run Average Cost (Envelope Curve)",
    difficulty: "Intermediate",
    scenario: "A car manufacturer is considering expanding its scale of production. At low output levels, it benefits from technical and managerial economies of scale. Beyond a certain point, coordination problems and bureaucracy lead to diseconomies of scale.",
    question: "Draw a series of short-run average cost curves (SRAC) and the associated long-run average cost curve (LRAC / 'envelope curve'). Label the regions of economies of scale, constant returns to scale, and diseconomies of scale. Show the minimum efficient scale (MES). [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "economies_of_scale",
  },
  {
    id: "costs-3",
    section: "Costs & Economies of Scale",
    topic: "Short-Run Shutdown Point",
    difficulty: "Advanced",
    scenario: "A small bakery faces rising ingredient costs. It is currently making a loss but is deciding whether to continue operating in the short run or shut down.",
    question: "Draw a diagram showing the firm's cost and revenue curves. Identify the shutdown point where P = min AVC. Show the area of loss the firm makes when price is between AVC and ATC. Explain why the firm continues to operate in the short run. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "perfect_competition",
  },

  // ── Section 6: Revenue, Profits & Market Structures ──
  {
    id: "mkt-1",
    section: "Revenue, Profits & Objectives",
    topic: "Monopoly — Supernormal Profit",
    difficulty: "Intermediate",
    scenario: "A pharmaceutical company holds a patent on a life-saving drug, giving it monopoly power. It sets price where MC = MR to maximise profit.",
    question: "Draw a fully labelled monopoly diagram showing the firm's AR (Demand), MR, MC, and ATC curves. Show the profit-maximising price and output (where MC = MR), and shade the area of supernormal profit. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "monopoly",
  },
  {
    id: "mkt-2",
    section: "Market Structures",
    topic: "Perfect Competition — Long Run",
    difficulty: "Intermediate",
    scenario: "In the market for organic strawberries, many small farms compete selling identical products. In the short run, some farms earn supernormal profit, attracting new entrants.",
    question: "Draw TWO diagrams side by side: (1) a perfectly competitive firm earning supernormal profit in the short run, and (2) the same firm in long-run equilibrium earning only normal profit. Show how the entry of new firms affects the market price. [8 marks]",
    marks: 8,
    expectedDiagramKeyword: "perfect_competition",
  },
  {
    id: "mkt-3",
    section: "Market Structures",
    topic: "Oligopoly — Kinked Demand Curve",
    difficulty: "Advanced",
    scenario: "In the UK supermarket industry, the 'Big Four' (Tesco, Sainsbury's, Asda, Morrisons) are reluctant to change prices. If one raises prices, rivals don't follow; if one cuts prices, rivals match.",
    question: "Draw a kinked demand curve diagram for an oligopolistic firm. Show the two sections of the demand curve with different elasticities, the corresponding discontinuous MR curve, and explain why prices tend to be 'sticky'. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "kinked_demand",
  },
  {
    id: "mkt-4",
    section: "Market Structures",
    topic: "Monopolistic Competition",
    difficulty: "Intermediate",
    scenario: "The UK high street coffee shop market has many competitors (Costa, Starbucks, independents) selling differentiated products. In the long run, freedom of entry erodes supernormal profit.",
    question: "Draw a diagram showing a monopolistically competitive firm in long-run equilibrium. Show why the firm earns only normal profit and identify the 'excess capacity' gap between actual output and the efficient scale. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "monopolistic_competition",
  },

  // ── Section 7: Labour Market ──
  {
    id: "lab-1",
    section: "Labour Market",
    topic: "Minimum Wage",
    difficulty: "Foundation",
    scenario: "The UK National Living Wage is set at £11.44 per hour (2024), above the equilibrium wage in some low-skill labour markets such as hospitality.",
    question: "Draw a labour market diagram showing the impact of a minimum wage set above the equilibrium wage. Show the wage rate on the Y-axis, quantity of labour on the X-axis, and identify the level of unemployment created. [5 marks]",
    marks: 5,
    expectedDiagramKeyword: "minimum_wage",
  },
  {
    id: "lab-2",
    section: "Labour Market",
    topic: "Monopsony Employer",
    difficulty: "Advanced",
    scenario: "The NHS is the largest employer of nurses in the UK. As the dominant buyer of nursing labour, it has monopsony power and can set wages below the competitive equilibrium.",
    question: "Draw a monopsony labour market diagram. Show the S(AC_L), MC_L, and D(MRP_L) curves. Identify the monopsony wage and employment level, and compare to the competitive outcome. Shade the area of welfare loss. [8 marks]",
    marks: 8,
    expectedDiagramKeyword: "monopsony",
  },

  // ── Macro Section 1: National Income ──
  {
    id: "macro-1",
    section: "National Income & Macro Equilibrium",
    topic: "AD/AS — Demand-Pull Inflation",
    difficulty: "Foundation",
    scenario: "Consumer confidence rises sharply following tax cuts and low interest rates, leading to a surge in household spending and aggregate demand.",
    question: "Draw an AD/AS diagram showing demand-pull inflation. Show the original and new AD curves, and identify the impact on the price level and real GDP. Distinguish between the short-run and long-run effects. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "ad_as",
  },
  {
    id: "macro-2",
    section: "National Income & Macro Equilibrium",
    topic: "AD/AS — Cost-Push Inflation",
    difficulty: "Intermediate",
    scenario: "Global oil prices surge by 40% due to geopolitical tensions in the Middle East, significantly increasing production costs for firms across the economy.",
    question: "Draw an AD/AS diagram showing cost-push inflation caused by rising oil prices. Show the shift in SRAS and identify the new equilibrium with higher price level and lower real GDP (stagflation). [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "ad_as",
  },
  {
    id: "macro-3",
    section: "National Income & Macro Equilibrium",
    topic: "Keynesian AS — Spare Capacity",
    difficulty: "Advanced",
    scenario: "The UK economy is in a deep recession with significant spare capacity. The government implements a large fiscal stimulus package.",
    question: "Draw a Keynesian aggregate supply diagram with horizontal, upward-sloping, and vertical sections. Show the initial equilibrium in the spare capacity region, and demonstrate how a fiscal stimulus shifts AD with a large increase in real GDP but minimal inflation. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "keynesian_as",
  },

  // ── Macro Section 2: Objectives ──
  {
    id: "macro-4",
    section: "Macro Objectives",
    topic: "Phillips Curve — SR vs LR",
    difficulty: "Advanced",
    scenario: "A central bank cuts interest rates to reduce unemployment. In the short run, this creates a trade-off between inflation and unemployment. However, in the long run, expectations adjust.",
    question: "Draw TWO side-by-side diagrams:\n\nDiagram A — AD/AS: Show 'PL' on the vertical axis and 'Real GDP' on the horizontal axis. Draw LRAS₁ (vertical), SRAS₁, SRAS₂, AD₁, and AD₂. Mark equilibria showing how an AD shift raises the price level from Pe to P2 to P3, with output returning to YFe.\n\nDiagram B — Phillips Curve: Show 'Inflation' on the vertical axis and 'Unemployment' on the horizontal axis. Draw LRPC₁ (vertical at natural rate, e.g. 5%), SRPC₁, and SRPC₂ (shifted up). Mark points A (3%, 5%), B (4%, 3%), C (5%, 5%) showing the short-run trade-off and long-run adjustment. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "phillips_curve",
  },
  {
    id: "macro-5",
    section: "Macro Objectives",
    topic: "Lorenz Curve & Gini Coefficient",
    difficulty: "Intermediate",
    scenario: "Country A has a more equal income distribution than Country B. Both have experienced changes in inequality due to different tax policies.",
    question: "Draw a Lorenz Curve diagram for both countries showing the 45-degree line of perfect equality, and two Lorenz curves — one closer to equality (Country A) and one further away (Country B). Explain how the Gini coefficient differs between them. [5 marks]",
    marks: 5,
    expectedDiagramKeyword: "lorenz_curve",
  },

  // ── Macro Section 3: International ──
  {
    id: "intl-1",
    section: "International Economy",
    topic: "Tariff Diagram",
    difficulty: "Advanced",
    scenario: "The US imposes a 25% tariff on steel imports from China, citing national security. Before the tariff, domestic production was 40 million tonnes and imports were 60 million tonnes at the world price.",
    question: "Draw a tariff diagram showing the world supply price, the domestic supply and demand curves, the tariff-inclusive price, and identify the four key areas: (1) increase in domestic producer surplus, (2) government tariff revenue, (3) deadweight welfare loss from production inefficiency, and (4) deadweight welfare loss from reduced consumption. [8 marks]",
    marks: 8,
    expectedDiagramKeyword: "tariff",
  },
  {
    id: "intl-2",
    section: "International Economy",
    topic: "J-Curve Effect",
    difficulty: "Intermediate",
    scenario: "The UK's exchange rate depreciates by 15% following the Brexit referendum. Initially, the trade deficit worsens because import contracts are fixed in foreign currency. Over 12-18 months, exports become more competitive.",
    question: "Draw a J-Curve diagram showing the current account balance over time following the depreciation. Label the initial worsening and subsequent improvement. Explain why the Marshall-Lerner condition must be met for the long-run improvement. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "j_curve",
  },
  {
    id: "intl-3",
    section: "International Economy",
    topic: "Exchange Rate Determination",
    difficulty: "Foundation",
    scenario: "The Bank of England raises interest rates, attracting foreign investment into UK assets (hot money flows). This increases demand for pounds sterling on the foreign exchange market.",
    question: "Draw a supply and demand diagram for the foreign exchange market showing the determination of the exchange rate (£ against $). Show how increased demand for sterling leads to an appreciation. [5 marks]",
    marks: 5,
    expectedDiagramKeyword: "exchange_rate",
  },

  // ── Additional real-world scenarios ──
  {
    id: "rw-1",
    section: "Market Failure & Externalities",
    topic: "Negative Externality — Palm Oil",
    difficulty: "Advanced",
    scenario: "Iceland (the supermarket) produced an advert outlining the devastating impact of palm oil collection on orangutan habitats. The advert went viral on social media, making consumers much more aware of the environmental damage. Palm oil is used in many cosmetic products such as shampoo.",
    question: "Draw a negative externality of production diagram with 'MC/MB ($)' on the vertical axis and 'Quantity' on the horizontal axis. Show three curves: (1) MSC (Social Marginal Cost) above the supply curve, (2) S = MPC (Private Marginal Cost), and (3) D = MPB = MSB (demand). Label the private equilibrium at Qp, Pp and the social optimum at Qs, Ps. Shade the deadweight welfare loss triangle between MSC and MPB from Qs to Qp. Show the 'negative externality per unit' gap between MSC and MPC. [8 marks]",
    marks: 8,
    expectedDiagramKeyword: "negative_externality_production",
  },
  {
    id: "rw-2",
    section: "PPFs, Markets & Allocation",
    topic: "Supply & Demand — Multiple Shifts",
    difficulty: "Advanced",
    scenario: "In the market for fast food: (1) the price of meat rises (an essential ingredient), (2) a health-conscious movement reduces demand, (3) a 'fat tax' is imposed, and (4) a new cooking oil speeds up chip production.",
    question: "Draw a supply and demand diagram for the fast food market. Starting from initial equilibrium, show the combined impact of ALL four changes on the market. Identify which shifts are demand-side and which are supply-side, and determine the overall effect on price and quantity. [8 marks]",
    marks: 8,
    expectedDiagramKeyword: "supply_demand",
  },
  {
    id: "rw-3",
    section: "Government Intervention",
    topic: "Sugar Tax — Welfare Analysis",
    difficulty: "Advanced",
    scenario: "The UK sugar tax was imposed in 2018. Before the tax, the equilibrium price of a sugary drink was £1.90. After the tax, the consumer price rose to £2.50 and the producer price fell to £1.90, with total tax revenue collected by the government.",
    question: "Draw a negative externality of production diagram showing the sugar tax as a Pigouvian tax. Show 'P' on the vertical axis and 'Q' on the horizontal axis. Include: (1) S = PMC (private marginal cost / supply), (2) SMC (social marginal cost — above PMC by the externality), (3) D = PMB = SMB (demand). Mark the free-market equilibrium at Q1, P1 and the socially optimal equilibrium at Q2, P2. Shade the deadweight welfare loss triangle between the two equilibria. [8 marks]",
    marks: 8,
    expectedDiagramKeyword: "negative_externality_production",
  },
  {
    id: "rw-4",
    section: "Market Failure & Externalities",
    topic: "Competition & Consumer Surplus",
    difficulty: "Advanced",
    scenario: "The proposed merger between Sainsbury's and Asda would create 463 areas where there is a 'realistic prospect of a substantial lessening of competition' according to the CMA. This could lead to higher prices or worse service for shoppers.",
    question: "Draw a supply and demand diagram for the food retailing market showing the potential market failure from reduced competition after the merger. Show the loss of consumer surplus by shading the relevant area on your diagram. [6 marks]",
    marks: 6,
    expectedDiagramKeyword: "supply_demand",
  },
];

/** Get scenarios filtered by section */
export function getScenariosBySection(section: DiagramSection): DiagramScenario[] {
  return diagramScenarios.filter((s) => s.section === section);
}

/** Get scenarios filtered by difficulty */
export function getScenariosByDifficulty(difficulty: string): DiagramScenario[] {
  return diagramScenarios.filter((s) => s.difficulty === difficulty);
}

/** Get a random scenario, optionally filtered */
export function getRandomScenario(filters?: {
  section?: DiagramSection;
  difficulty?: string;
}): DiagramScenario {
  let pool = diagramScenarios;
  if (filters?.section) pool = pool.filter((s) => s.section === filters.section);
  if (filters?.difficulty) pool = pool.filter((s) => s.difficulty === filters.difficulty);
  if (pool.length === 0) pool = diagramScenarios;
  return pool[Math.floor(Math.random() * pool.length)];
}
