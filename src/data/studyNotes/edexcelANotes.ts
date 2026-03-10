import type { DiagramType } from "@/components/revision/EconDiagramLibrary";

export interface Subtopic {
  title: string;
  definition?: string;
  keyTerms?: { term: string; definition: string }[];
  explanation?: string;
  example?: string;
  formula?: string;
  examTip?: string;
  diagram?: DiagramType;
  content?: string;
}

export interface Topic {
  name: string;
  subtopics: Subtopic[];
}

export const edexcelAPaper1Topics: Topic[] = [
  {
    name: "Nature of Economics",
    subtopics: [
      {
        title: "The Economic Problem",
        definition: "Economics studies how scarce resources are allocated to satisfy unlimited wants. The central problem is **scarcity** — there are not enough resources to produce everything people desire.",
        keyTerms: [
          { term: "Scarcity", definition: "The excess of human wants over what can be produced with limited resources" },
          { term: "Opportunity Cost", definition: "The value of the next best alternative foregone" },
          { term: "Free Good", definition: "A good with zero opportunity cost (e.g. air)" },
          { term: "Economic Good", definition: "A good that is scarce and requires resources to produce" },
        ],
        example: "A student choosing between university and full-time work faces an opportunity cost — the salary foregone while studying.",
        examTip: "Edexcel loves applying opportunity cost to real-world scenarios. Always quantify it where possible.",
      },
      {
        title: "Production Possibility Frontiers",
        definition: "A **PPF** shows the maximum combinations of two goods/services an economy can produce using all its resources efficiently.",
        explanation: "1. Points on the PPF = productively efficient\n2. Points inside = unemployed resources\n3. Points outside = unattainable with current resources\n4. Outward shift = economic growth\n5. The concave shape reflects increasing opportunity costs\n6. Capital goods vs consumer goods trade-off affects future growth\n7. Movement along shows reallocation and opportunity cost",
        diagram: "ppf",
        examTip: "In 8-mark questions, always link PPF shifts to specific factors (e.g., immigration shifts PPF outward by increasing labour supply).",
      },
      {
        title: "Specialisation & Trade",
        definition: "**Specialisation** occurs when individuals, firms, or countries concentrate on producing goods in which they have a comparative advantage.",
        keyTerms: [
          { term: "Division of Labour", definition: "Breaking production into separate tasks, each done by different workers" },
          { term: "Comparative Advantage", definition: "The ability to produce at a lower opportunity cost than another producer" },
          { term: "Absolute Advantage", definition: "The ability to produce more output with the same resources" },
        ],
        explanation: "**Benefits:** Higher productivity, economies of scale, higher output, development of expertise\n**Costs:** Monotony for workers, structural unemployment, over-dependence on other countries, vulnerability to supply disruptions",
        example: "China specialises in manufacturing due to low labour costs, while the UK specialises in financial services due to skilled labour and infrastructure.",
      },
      {
        title: "Positive & Normative Statements",
        definition: "**Positive statements** are objective and can be tested with evidence. **Normative statements** contain value judgements and opinions.",
        keyTerms: [
          { term: "Positive Statement", definition: "'UK inflation is 2.5%' — factual, testable" },
          { term: "Normative Statement", definition: "'The government should reduce inflation' — opinion, value judgement" },
        ],
        examTip: "Edexcel tests this distinction frequently in MCQs. Look for words like 'should', 'ought to', 'unfair' — these signal normative statements.",
      },
    ],
  },
  {
    name: "How Markets Work",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good that consumers are willing and able to buy at each price level in a given time period.",
        keyTerms: [
          { term: "Effective Demand", definition: "Desire backed by ability to pay" },
          { term: "Conditions of Demand", definition: "Non-price factors that shift the demand curve" },
          { term: "Individual vs Market Demand", definition: "Market demand = horizontal sum of individual demands" },
        ],
        explanation: "**Shifts in demand caused by:**\n- Changes in income (normal vs inferior goods)\n- Prices of substitutes and complements\n- Tastes, fashion, advertising\n- Population size and structure\n- Interest rates and expectations\n- Seasonal factors\n\n**Movement along** = change in own price\n**Shift** = change in a non-price factor",
        diagram: "demand_increase",
        examTip: "Always distinguish between a movement along (price change) and a shift of the curve (non-price factor). This is tested in virtually every paper.",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity of a good that producers are willing and able to sell at each price level in a given time period.",
        explanation: "**Shifts in supply caused by:**\n- Changes in costs of production (wages, raw materials, energy)\n- Technology improvements\n- Indirect taxes (shift left) and subsidies (shift right)\n- Number of firms in the market\n- Weather and natural factors\n- Productivity improvements\n- Exchange rate changes (affect import costs)",
        diagram: "supply_decrease",
      },
      {
        title: "Price Elasticity of Demand",
        definition: "**PED** measures the responsiveness of quantity demanded to a change in price.",
        formula: "PED = % change in quantity demanded ÷ % change in price",
        keyTerms: [
          { term: "Elastic (PED > 1)", definition: "Demand is responsive — a price rise causes a proportionally larger fall in Qd" },
          { term: "Inelastic (PED < 1)", definition: "Demand is unresponsive — a price rise causes a proportionally smaller fall in Qd" },
          { term: "Unit Elastic (PED = 1)", definition: "Proportionate response — total revenue unchanged by price change" },
        ],
        explanation: "**Determinants:** Substitutes available, necessity vs luxury, proportion of income, habit, time period, brand loyalty\n\n**PED and Revenue:**\n- Elastic demand: lower price → higher TR\n- Inelastic demand: raise price → higher TR\n\n**PED and Tax Incidence:**\n- Inelastic demand → consumers bear more tax burden\n- Elastic demand → producers bear more tax burden",
        examTip: "For Edexcel Paper 1, always link PED to revenue. If demand is elastic, cutting price raises total revenue.",
        diagram: "ped_elastic",
      },
      {
        title: "Income & Cross Elasticity",
        definition: "**YED** measures demand responsiveness to income changes. **XED** measures demand responsiveness to changes in the price of another good.",
        formula: "YED = % change in Qd ÷ % change in income\nXED = % change in Qd of A ÷ % change in price of B",
        keyTerms: [
          { term: "Normal Good (YED > 0)", definition: "Demand rises as income rises" },
          { term: "Inferior Good (YED < 0)", definition: "Demand falls as income rises" },
          { term: "Luxury (YED > 1)", definition: "Demand rises more than proportionally with income" },
          { term: "Substitutes (XED > 0)", definition: "Rise in price of B increases demand for A" },
          { term: "Complements (XED < 0)", definition: "Rise in price of B decreases demand for A" },
        ],
        explanation: "**YED significance for firms:**\n- Luxury goods firms benefit in booms, suffer in recessions\n- Inferior goods firms are recession-proof\n- Firms can use YED to forecast demand changes\n\n**XED significance:**\n- Close substitutes = high positive XED = intense competition\n- Strong complements = high negative XED = bundling opportunities",
        example: "As incomes rise, demand for budget airlines may fall (inferior) while demand for premium airlines rises (luxury normal). During COVID-19 recession, Aldi and Lidl (inferior goods) saw rising demand.",
      },
      {
        title: "Price Elasticity of Supply",
        definition: "**PES** measures the responsiveness of quantity supplied to a change in price.",
        formula: "PES = % change in quantity supplied ÷ % change in price",
        explanation: "**Determinants:** Spare capacity, ease of storage, time period, factor mobility, availability of stocks, length of production process\n\n**Primary sector** (agriculture, mining) tends to have inelastic supply — long production periods, weather-dependent\n**Manufacturing** tends to be more elastic — can adjust production levels\n**Services** can be very elastic — easier to scale up with more staff",
      },
      {
        title: "Market Equilibrium & Price Mechanism",
        definition: "**Equilibrium** is where demand equals supply. The **price mechanism** allocates resources through the signalling, incentive, and rationing functions.",
        keyTerms: [
          { term: "Signalling", definition: "Prices communicate information to buyers and sellers about scarcity" },
          { term: "Incentive", definition: "Price changes motivate producers and consumers to change behaviour" },
          { term: "Rationing", definition: "Prices allocate scarce resources to those willing and able to pay" },
          { term: "Consumer Surplus", definition: "Difference between willingness to pay and actual price paid" },
          { term: "Producer Surplus", definition: "Difference between actual price received and minimum price accepted" },
        ],
        diagram: "supply_demand",
        example: "A rise in oil prices signals scarcity, incentivises producers to explore alternatives (renewables, fracking), and rations oil to highest-value uses.",
      },
      {
        title: "Indirect Taxes & Subsidies",
        definition: "**Indirect taxes** shift supply left (increase costs). **Subsidies** shift supply right (reduce costs).",
        keyTerms: [
          { term: "Specific Tax", definition: "Fixed amount per unit (e.g., fuel duty)" },
          { term: "Ad Valorem Tax", definition: "Percentage of price (e.g., VAT at 20%)" },
          { term: "Tax Incidence", definition: "How the burden is shared — depends on PED and PES" },
        ],
        explanation: "**Tax on inelastic demand:** Consumers bear most of the burden — demand barely falls\n**Tax on elastic demand:** Producers bear most — demand falls significantly\n**Subsidy effects:** Lower price, higher quantity, but cost to taxpayer, possible government failure",
        diagram: "tax_incidence",
      },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      {
        title: "Types of Market Failure",
        definition: "**Market failure** occurs when the free market leads to a misallocation of resources — either overproduction or underproduction relative to the socially optimal level.",
        keyTerms: [
          { term: "Allocative Inefficiency", definition: "Resources not allocated to maximise social welfare (P ≠ MC)" },
          { term: "Complete Market Failure", definition: "The market fails to produce the good at all (e.g., public goods)" },
          { term: "Partial Market Failure", definition: "The market produces but at the wrong quantity (e.g., externalities)" },
        ],
      },
      {
        title: "Externalities",
        definition: "**Externalities** are spillover effects on third parties not directly involved in the economic transaction.",
        keyTerms: [
          { term: "Negative Production Externality", definition: "MSC > MPC — e.g., factory pollution" },
          { term: "Negative Consumption Externality", definition: "MSC > MPC — e.g., passive smoking" },
          { term: "Positive Production Externality", definition: "MSB > MPB — e.g., R&D knowledge spillovers" },
          { term: "Positive Consumption Externality", definition: "MSB > MPB — e.g., vaccination" },
          { term: "Welfare Loss", definition: "Deadweight loss triangle between private and social optimum" },
        ],
        explanation: "1. Negative externality → overproduction at Qm vs Q*\n2. Positive externality → underproduction at Qm vs Q*\n3. Welfare loss = triangle between MSC/MSB and MPC/MPB from Qm to Q*\n4. **Pigouvian tax** = tax equal to external cost → internalises externality\n5. **Pigouvian subsidy** = subsidy equal to external benefit",
        diagram: "negative_externality",
        examTip: "Edexcel requires you to distinguish between production and consumption externalities. Label diagrams clearly with MPC, MSC, MPB, MSB.",
      },
      {
        title: "Public Goods",
        definition: "**Public goods** are non-rivalrous and non-excludable. The free rider problem means private firms cannot charge for them, leading to complete market failure.",
        keyTerms: [
          { term: "Non-Rival", definition: "One person's consumption does not reduce availability for others" },
          { term: "Non-Excludable", definition: "It is impossible to prevent non-payers from consuming" },
          { term: "Free Rider Problem", definition: "Consumers benefit without paying, so firms cannot make a profit" },
          { term: "Quasi-Public Good", definition: "Partially non-rival or non-excludable (e.g., roads — rivalrous in rush hour)" },
        ],
        example: "National defence — everyone benefits regardless of whether they pay taxes. Lighthouses — non-excludable and non-rivalrous.",
      },
      {
        title: "Information Failure",
        definition: "**Information failure** occurs when economic agents lack perfect information, leading to irrational decisions.",
        keyTerms: [
          { term: "Asymmetric Information", definition: "One party has more information than the other" },
          { term: "Merit Good", definition: "Underconsumed because consumers underestimate private benefits" },
          { term: "Demerit Good", definition: "Overconsumed because consumers underestimate private costs" },
          { term: "Moral Hazard", definition: "Taking more risks because another party bears the costs" },
          { term: "Adverse Selection", definition: "The wrong type of agent enters the market due to information gaps" },
        ],
        example: "Used car market (Akerlof's 'Market for Lemons') — sellers know the car's quality, buyers don't. This drives good cars out of the market.",
        examTip: "Link information failure to behavioural economics — bounded rationality, heuristics, anchoring, default bias, and nudge theory.",
      },
      {
        title: "Labour Immobility",
        definition: "Factor immobility prevents the efficient reallocation of resources, leading to persistent unemployment and regional inequality.",
        keyTerms: [
          { term: "Occupational Immobility", definition: "Workers lack skills for available jobs" },
          { term: "Geographical Immobility", definition: "Workers cannot relocate due to housing costs, family ties" },
        ],
        explanation: "**Causes:** Specialised skills not transferable, regional house price differences, family commitments, information gaps about jobs\n**Solutions:** Government retraining programmes, relocation subsidies, improved transport links, housing policy",
      },
    ],
  },
  {
    name: "Government Intervention",
    subtopics: [
      {
        title: "Indirect Taxes & Subsidies",
        definition: "**Indirect taxes** raise the cost of production (shift supply left). **Subsidies** lower costs (shift supply right).",
        explanation: "**Tax:** Reduces consumption of demerit goods (e.g., sugar tax). Tax incidence depends on PED/PES.\n**Subsidy:** Encourages consumption of merit goods (e.g., renewable energy subsidies).\n\n**Pigouvian tax** = set equal to external cost → internalises the externality perfectly in theory\n**Problems:** Difficult to calculate exact external cost, regressive (hit low earners hardest), smuggling/tax avoidance",
        diagram: "tax_incidence",
        examTip: "Always draw the tax/subsidy diagram showing the welfare gain or deadweight loss. Discuss who bears the burden using PED.",
      },
      {
        title: "Price Controls",
        definition: "**Maximum prices** (price ceilings) are set below equilibrium to protect consumers. **Minimum prices** (price floors) are set above equilibrium to protect producers.",
        explanation: "**Max price:** Creates excess demand / shortage → need for rationing → black markets → lower quality\n**Min price:** Creates excess supply / surplus → government may need to buy surplus → cost to taxpayer\n\n**Examples:** Rent controls in London (max price), National Minimum Wage (min price in labour market), Minimum Unit Pricing for alcohol in Scotland",
        example: "The National Minimum Wage is a price floor in the labour market — it creates a surplus of labour (unemployment) if set above equilibrium, but monopsony theory suggests it can raise wages without job losses.",
      },
      {
        title: "Regulation & Tradable Permits",
        definition: "Government uses regulation and market-based mechanisms like tradable permits to correct externalities.",
        keyTerms: [
          { term: "Regulation", definition: "Legal rules that restrict behaviour (e.g., emission limits)" },
          { term: "Tradable Permits", definition: "Cap on total pollution, with permits that can be bought/sold" },
          { term: "Carbon Tax", definition: "A tax on carbon emissions to internalise the environmental externality" },
        ],
        explanation: "**Tradable permits:** Set a cap → firms that cut emissions sell permits → efficient allocation of abatement\n**EU ETS:** Carbon prices rose from €5 to €90+, incentivising green investment\n\n**Regulation advantages:** Clear rules, immediate effect\n**Regulation problems:** Costly enforcement, inflexible, regulatory capture",
      },
      {
        title: "State Provision & Information",
        definition: "Government directly provides public goods and merit goods, and corrects information failure through campaigns and labelling.",
        explanation: "**State provision:** Healthcare (NHS), education, defence, street lighting\n**Provision of information:** Health warnings, food labelling, public health campaigns, school league tables\n\n**Advantages:** Ensures universal access, corrects market failure\n**Disadvantages:** Costly, may be inefficient (no profit motive), information overload, people may ignore warnings",
      },
      {
        title: "Government Failure",
        definition: "**Government failure** occurs when intervention leads to a net welfare loss — making the situation worse than the free market outcome.",
        keyTerms: [
          { term: "Unintended Consequences", definition: "Policies produce effects opposite to those intended" },
          { term: "Information Gaps", definition: "Government lacks perfect information to set optimal tax/subsidy levels" },
          { term: "Administrative Costs", definition: "The cost of implementing and enforcing policies" },
          { term: "Regulatory Capture", definition: "Regulators begin to act in the interests of the firms they regulate" },
          { term: "Moral Hazard", definition: "Government protection encourages risky behaviour (e.g., bank bailouts)" },
        ],
        example: "The US Prohibition (1920–33) banned alcohol but led to organised crime and a thriving black market. The UK's Help to Buy scheme intended to help first-time buyers but may have inflated house prices further.",
        examTip: "Every evaluation of government intervention should consider government failure. This is a key evaluative point for 12-mark and 25-mark questions.",
      },
    ],
  },
  {
    name: "Market Structures",
    subtopics: [
      {
        title: "Revenue, Costs & Profit",
        definition: "Understanding cost and revenue curves is essential for analysing how firms behave in different market structures.",
        keyTerms: [
          { term: "Fixed Costs", definition: "Costs that don't vary with output (e.g., rent, insurance)" },
          { term: "Variable Costs", definition: "Costs that change with output (e.g., raw materials, energy)" },
          { term: "Normal Profit", definition: "AR = AC — minimum to keep the firm in the industry (an opportunity cost)" },
          { term: "Supernormal Profit", definition: "AR > AC — profit above normal, attracts new entrants" },
          { term: "Economies of Scale", definition: "Falling LRAC as output increases" },
          { term: "Diseconomies of Scale", definition: "Rising LRAC as the firm grows too large" },
        ],
        formula: "Profit = TR − TC\nMR = ΔTR ÷ ΔQ\nMC = ΔTC ÷ ΔQ\nAR = TR ÷ Q",
        explanation: "**Short run:** At least one factor fixed (e.g., capital)\n**Long run:** All factors variable\n\n**Shut-down rule:** Firm shuts down if P < AVC (short run) or P < AC (long run)\n**Profit maximisation:** MC = MR",
      },
      {
        title: "Perfect Competition",
        definition: "A market structure with many firms, homogeneous products, perfect information, and no barriers to entry.",
        keyTerms: [
          { term: "Price Taker", definition: "Firms accept the market price — AR = MR = P" },
          { term: "Homogeneous Products", definition: "Identical goods — no brand differentiation" },
        ],
        explanation: "**Short run:** Firms can earn supernormal or subnormal profit\n**Long run:** New entry/exit drives profit to normal → allocatively efficient (P = MC) and productively efficient (min AC)\n\n**Unrealistic but useful as a benchmark** — shows what perfect efficiency looks like",
        examTip: "Perfect competition is allocatively efficient (P = MC) and productively efficient (min AC) in the long run. Use this as a benchmark against other structures.",
      },
      {
        title: "Monopolistic Competition",
        definition: "Many firms sell differentiated products with low barriers to entry. Each firm has a small degree of market power.",
        explanation: "**Features:** Many firms, product differentiation (branding, quality), low barriers, non-price competition\n\n**Short run:** Can earn supernormal profit\n**Long run:** Entry erodes profit → normal profit only. But P > MC (allocatively inefficient) and not at min AC (productively inefficient)\n\n**Examples:** Restaurants, hairdressers, clothing brands",
      },
      {
        title: "Oligopoly",
        definition: "A market dominated by a few large firms with high concentration ratios. Firms are interdependent — each firm's decisions affect rivals.",
        keyTerms: [
          { term: "Interdependence", definition: "Firms must consider rivals' reactions when making decisions" },
          { term: "Collusion", definition: "Firms agree (tacitly or overtly) to restrict competition" },
          { term: "Game Theory", definition: "Analysing strategic decision-making — e.g., the Prisoner's Dilemma" },
          { term: "Kinked Demand Curve", definition: "Explains price rigidity — rivals match cuts but not rises" },
          { term: "Cartel", definition: "Formal agreement to fix prices/output (illegal in most countries)" },
        ],
        explanation: "**Kinked demand curve:** Prices tend to be rigid — firms match price cuts but not price rises\n**Price competition** is risky → firms compete through non-price methods (branding, quality, innovation)\n\n**Game theory:** Prisoner's Dilemma — firms are tempted to cheat on collusion. Dominant strategy = compete\n**Collusion more likely when:** Few firms, similar costs, high barriers, weak regulation",
        example: "UK supermarkets (Tesco, Sainsbury's, Asda, Morrisons) — high concentration ratio, interdependent pricing, extensive non-price competition.",
      },
      {
        title: "Monopoly",
        definition: "A market dominated by a single firm (legal definition: 25%+ market share). High barriers to entry prevent competition.",
        keyTerms: [
          { term: "Price Maker", definition: "The monopolist sets the price — faces a downward-sloping AR curve" },
          { term: "Barriers to Entry", definition: "Patents, economies of scale, legal barriers, control of resources, branding" },
          { term: "Natural Monopoly", definition: "An industry where one firm can supply at lower cost than two or more (e.g., water)" },
          { term: "Price Discrimination", definition: "Charging different prices for the same product to different consumers" },
          { term: "X-Inefficiency", definition: "Operating above minimum cost due to lack of competitive pressure" },
        ],
        explanation: "**Costs:** Higher prices, lower output, allocative inefficiency (P > MC), X-inefficiency, income inequality\n**Benefits:** Supernormal profits fund R&D (dynamic efficiency), economies of scale, cross-subsidisation\n\n**Price discrimination:** 1st degree (each consumer), 2nd degree (quantity discounts), 3rd degree (different groups — e.g., student discounts, peak/off-peak)",
        examTip: "For 25-mark essays, always evaluate whether monopoly is necessarily bad. Use examples of dynamic efficiency (e.g., Apple, pharmaceutical companies).",
      },
      {
        title: "Contestable Markets",
        definition: "A market is contestable when barriers to entry and exit are low — the threat of competition disciplines incumbents.",
        keyTerms: [
          { term: "Hit-and-Run Entry", definition: "Firms enter to exploit profits, exit when profits fall" },
          { term: "Sunk Costs", definition: "Costs that cannot be recovered on exit — key barrier to contestability" },
        ],
        explanation: "**Key insight:** Market structure matters less than the THREAT of entry. Even a monopoly behaves competitively if markets are contestable.\n**Conditions:** Low barriers to entry/exit, low sunk costs, access to same technology\n**Result:** Firms keep prices close to AC to deter hit-and-run entry",
        example: "Budget airlines — low sunk costs (lease planes), easy entry/exit. This forced legacy carriers to reduce prices.",
      },
      {
        title: "Labour Market",
        definition: "The labour market determines wages and employment levels. Demand for labour is derived from demand for the product.",
        keyTerms: [
          { term: "MRP", definition: "Marginal Revenue Product — the extra revenue from hiring one more worker" },
          { term: "Derived Demand", definition: "Demand for labour depends on demand for the product it produces" },
          { term: "Monopsony", definition: "A single buyer of labour — can suppress wages below the competitive level" },
          { term: "Trade Union", definition: "Organisation that collectively bargains for higher wages/better conditions" },
          { term: "Wage Differentials", definition: "Differences in pay between occupations caused by skills, risk, unions, discrimination" },
        ],
        formula: "MRP = MPP × MR",
        explanation: "**Wage determination:** In perfect competition, wage = MRP. With monopsony power, wages are lower and employment is lower.\n\n**NMW analysis:** Above equilibrium → unemployment (classical). But monopsony → NMW can raise wages AND employment.\n\n**Wage differentials:** Skills, qualifications, compensating differentials (dangerous jobs), trade unions, discrimination, regional differences",
        examTip: "For labour market questions, always consider trade unions vs monopsony power, and how the NMW affects different labour markets differently.",
      },
    ],
  },
];

export const edexcelAPaper2Topics: Topic[] = [
  {
    name: "Measures of Economic Performance",
    subtopics: [
      {
        title: "Economic Growth",
        definition: "**Economic growth** is an increase in real GDP. Short-run growth = using spare capacity. Long-run growth = increasing productive capacity.",
        keyTerms: [
          { term: "Real GDP", definition: "GDP adjusted for inflation — measures actual output changes" },
          { term: "GDP per capita", definition: "GDP ÷ population — better indicator of living standards" },
          { term: "Output Gap", definition: "Difference between actual and potential GDP" },
          { term: "Trend Growth Rate", definition: "The long-run average rate of growth (UK ≈ 2.5%)" },
          { term: "GNI", definition: "Gross National Income — includes net income from abroad" },
        ],
        explanation: "**Positive output gap:** Actual GDP > potential → inflationary pressure\n**Negative output gap:** Actual GDP < potential → spare capacity, unemployment\n\n**GDP limitations:** Ignores inequality, informal economy, environmental damage, quality of life, leisure time, distribution",
        diagram: "ppf_growth",
      },
      {
        title: "Inflation",
        definition: "**Inflation** is a sustained increase in the general price level, measured by CPI.",
        keyTerms: [
          { term: "CPI", definition: "Consumer Price Index — weighted basket of 700+ goods and services" },
          { term: "Demand-Pull", definition: "Inflation caused by excessive AD growth" },
          { term: "Cost-Push", definition: "Inflation caused by rising production costs" },
          { term: "Wage-Price Spiral", definition: "Workers demand higher wages → costs rise → prices rise → further wage demands" },
          { term: "Deflation", definition: "A sustained fall in the general price level" },
        ],
        explanation: "**Costs of inflation:** Reduced international competitiveness, menu costs, shoe-leather costs, fiscal drag, uncertainty, redistribution (savers to borrowers)\n**Benefits of low inflation:** Signals healthy economic growth, encourages spending over saving\n\n**Costs of deflation:** Delayed spending, rising real debt, deflationary spiral, unemployment",
        diagram: "sras_decrease",
        examTip: "Always distinguish between the cause (demand-pull vs cost-push) and recommend appropriate policy responses.",
      },
      {
        title: "Unemployment",
        definition: "**Unemployment** exists when people willing and able to work at the going wage rate cannot find a job.",
        keyTerms: [
          { term: "Claimant Count", definition: "Number of people claiming unemployment-related benefits" },
          { term: "Labour Force Survey", definition: "ILO measure — those without a job who have sought work in the last 4 weeks" },
          { term: "Natural Rate", definition: "Unemployment that exists when the labour market is in equilibrium (NAIRU)" },
          { term: "Cyclical", definition: "Caused by recession — demand-deficient unemployment" },
          { term: "Structural", definition: "Skills mismatch from industrial change" },
          { term: "Frictional", definition: "Between jobs — natural and short-term" },
        ],
        explanation: "**Types:** Frictional (between jobs), structural (skills mismatch), cyclical (recession), seasonal, real wage\n**Costs:** Lost output (inside PPF), government spending on benefits, social costs (crime, health), hysteresis effect, regional inequality\n\n**Phillips Curve:** Short-run trade-off between unemployment and inflation. Long-run: vertical at NAIRU.",
        diagram: "phillips_curve",
      },
      {
        title: "Balance of Payments",
        definition: "The **balance of payments** records all economic transactions between residents and the rest of the world.",
        keyTerms: [
          { term: "Current Account", definition: "Trade in goods & services, primary income, secondary income" },
          { term: "Financial Account", definition: "FDI, portfolio investment, other investment flows" },
          { term: "Current Account Deficit", definition: "Imports > exports — more money flowing out than in" },
          { term: "J-Curve", definition: "Depreciation initially worsens then improves the current account" },
        ],
        explanation: "The BoP must always balance: current account deficit = financial account surplus\n\n**Causes of UK deficit:** Strong pound, high consumer spending, deindustrialisation, price uncompetitiveness\n**Does it matter?** Depends on size, cause, sustainability, how financed",
        examTip: "Discuss whether a current account deficit matters — it depends on size, cause (strong consumer demand vs uncompetitive exports), and how it's financed.",
      },
    ],
  },
  {
    name: "Aggregate Demand & Supply",
    subtopics: [
      {
        title: "Aggregate Demand",
        definition: "**AD** is the total planned spending on goods and services in an economy at a given price level.",
        formula: "AD = C + I + G + (X − M)",
        keyTerms: [
          { term: "Consumption (C)", definition: "Household spending — the largest component of AD (60%+)" },
          { term: "Investment (I)", definition: "Spending by firms on capital goods" },
          { term: "Government Spending (G)", definition: "Public sector expenditure on goods and services" },
          { term: "Net Exports (X−M)", definition: "Exports minus imports" },
        ],
        explanation: "**Why AD slopes down:** Wealth effect, interest rate effect, international competitiveness effect\n\n**Determinants of C:** Disposable income, interest rates, consumer confidence, wealth, credit availability\n**Determinants of I:** Interest rates, business confidence, technology, government policy, accelerator\n**AD shifts right:** Tax cuts, lower interest rates, increased government spending, weaker exchange rate, rising confidence",
        diagram: "ad_increase",
      },
      {
        title: "Aggregate Supply",
        definition: "**SRAS** reflects short-run production costs. **LRAS** reflects the economy's productive capacity at full employment.",
        keyTerms: [
          { term: "SRAS", definition: "Upward sloping — higher price level incentivises more output in the short run" },
          { term: "LRAS (Classical)", definition: "Vertical at full employment — output determined by supply-side factors only" },
          { term: "LRAS (Keynesian)", definition: "Horizontal when spare capacity exists, vertical at full employment" },
        ],
        explanation: "**SRAS shifts left:** Rising oil/energy prices, wage increases, supply chain disruptions, exchange rate depreciation\n**SRAS shifts right:** Falling commodity prices, productivity gains, subsidies\n\n**LRAS shifts right:** More labour (immigration), better education, technology, infrastructure investment, institutional improvements",
        diagram: "sras_increase",
      },
      {
        title: "The Multiplier Effect",
        definition: "The **multiplier** shows how an initial change in spending leads to a larger final change in GDP.",
        formula: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ MPW",
        keyTerms: [
          { term: "MPC", definition: "Marginal Propensity to Consume — proportion of extra income spent" },
          { term: "MPW", definition: "Marginal Propensity to Withdraw — saving + taxation + imports" },
          { term: "Negative Multiplier", definition: "Works in reverse — withdrawal leads to multiplied fall in GDP" },
        ],
        explanation: "Initial injection → rounds of spending → each round smaller due to withdrawals (saving, tax, imports)\n\n**Larger multiplier when:** High MPC, low tax rates, low import propensity\n**Smaller multiplier when:** High savings rate, open economy, high tax rates\n\n**The multiplier works in reverse** — a withdrawal has a multiplied negative effect on GDP",
        examTip: "Always consider the multiplier when evaluating fiscal policy effectiveness. A small multiplier weakens the case for government spending.",
      },
      {
        title: "The Accelerator",
        definition: "The **accelerator** theory states that investment is a function of the rate of change of GDP, not its absolute level.",
        explanation: "**When GDP growth accelerates:** Investment increases rapidly (firms need more capacity)\n**When GDP growth slows:** Investment falls even if GDP is still rising\n**When GDP falls:** Investment collapses (net disinvestment)\n\n**Combined with multiplier:** Creates business cycles — accelerator drives investment → multiplier amplifies → slowdown → accelerator reverses → multiplier amplifies downturn",
      },
    ],
  },
  {
    name: "Macroeconomic Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "Using government spending (G) and taxation (T) to influence AD and achieve macroeconomic objectives.",
        keyTerms: [
          { term: "Expansionary", definition: "↑G or ↓T → ↑AD → ↑output & employment" },
          { term: "Contractionary", definition: "↓G or ↑T → ↓AD → ↓inflation" },
          { term: "Automatic Stabilisers", definition: "Tax and benefit changes that dampen the cycle automatically" },
          { term: "Discretionary Policy", definition: "Deliberate government policy changes" },
          { term: "Budget Deficit", definition: "Government spending exceeds revenue" },
          { term: "National Debt", definition: "Total accumulated stock of government borrowing" },
        ],
        explanation: "**Expansionary:** ↑G or ↓T → ↑AD → ↑output and employment\n**Contractionary:** ↓G or ↑T → ↓AD → ↓inflation\n\n**Evaluation:** Time lags (recognition, implementation, impact), opportunity cost, crowding out (government borrowing raises interest rates → less private investment), effect on national debt, political constraints, size of multiplier",
        diagram: "ad_increase",
      },
      {
        title: "Monetary Policy",
        definition: "The Bank of England sets the base rate to achieve the 2% inflation target and uses QE as an unconventional tool.",
        keyTerms: [
          { term: "Base Rate", definition: "The interest rate set by the MPC — influences borrowing and saving" },
          { term: "QE", definition: "Central bank buys bonds to increase money supply and lower long-term rates" },
          { term: "Transmission Mechanism", definition: "How rate changes feed through to the real economy" },
          { term: "MPC", definition: "Monetary Policy Committee — 9 members who set interest rates" },
        ],
        explanation: "**Transmission mechanism:**\nRate ↓ → ↓borrowing costs → ↑C + I → ↑AD\nRate ↓ → ↓saving incentive → ↑spending\nRate ↓ → ↓exchange rate → ↑exports\nRate ↓ → ↑asset prices → ↑wealth → ↑C\n\n**Limitations:** Liquidity trap (rates near zero), banks may not pass on cuts, time lags (18-24 months), distributional effects (QE benefits wealthy), asymmetric effects",
      },
      {
        title: "Supply-Side Policies",
        definition: "Policies to increase LRAS by improving the economy's productive capacity.",
        keyTerms: [
          { term: "Market-Based", definition: "Deregulation, privatisation, income tax cuts, trade union reform" },
          { term: "Interventionist", definition: "Education, training, infrastructure, industrial strategy" },
        ],
        explanation: "**Market-based:**\n- Tax cuts → work/investment incentives\n- Deregulation → competition\n- Privatisation → efficiency\n- Flexible labour markets → lower NAIRU\n\n**Interventionist:**\n- Education → human capital\n- Infrastructure → productivity\n- R&D subsidies → innovation\n\n**Benefits:** Non-inflationary growth, improved competitiveness\n**Limitations:** Long time lags (5-10 years), expensive, may increase inequality (market-based), government failure risk (interventionist)",
        diagram: "sras_increase",
        examTip: "Evaluate by considering: which policies address the specific problem in the data? Market-based policies may worsen inequality; interventionist policies have long time lags.",
      },
    ],
  },
  {
    name: "International Economics",
    subtopics: [
      {
        title: "Globalisation",
        definition: "**Globalisation** is the increasing integration and interdependence of world economies through trade, capital flows, and migration.",
        keyTerms: [
          { term: "TNC", definition: "Transnational Corporation — operates in multiple countries" },
          { term: "FDI", definition: "Foreign Direct Investment — building productive capacity abroad" },
          { term: "Deindustrialisation", definition: "Decline of manufacturing as share of GDP" },
          { term: "Offshoring", definition: "Moving production to another country to reduce costs" },
          { term: "Reshoring", definition: "Bringing production back to the home country" },
        ],
        explanation: "**Causes:** Lower transport costs, trade liberalisation (WTO), technology, financial deregulation, TNCs, containerisation\n\n**Benefits:** Consumer choice, lower prices, technology transfer, economic growth, poverty reduction in developing countries, cultural exchange\n**Costs:** Deindustrialisation in developed countries, environmental damage, cultural erosion, growing inequality, exploitation, tax avoidance by TNCs\n\n**COVID-19 effects:** Exposed fragility of global supply chains → reshoring trend, strategic autonomy debate",
        example: "China's integration has lifted 800 million from poverty but contributed to deindustrialisation in Western economies. Post-COVID, firms like Apple diversified supply chains away from China.",
      },
      {
        title: "Trade & Comparative Advantage",
        definition: "Countries should specialise in goods where they have the lowest opportunity cost, then trade — both gain.",
        keyTerms: [
          { term: "Comparative Advantage", definition: "Producing at a lower opportunity cost" },
          { term: "Absolute Advantage", definition: "Producing more output with the same resources" },
          { term: "Terms of Trade", definition: "Ratio of export prices to import prices" },
        ],
        explanation: "**Ricardo's theory:** Even if one country is better at everything, both gain from specialisation and trade\n\n**Free trade benefits:** Lower prices, greater choice, economies of scale, promotes innovation, technology transfer, specialisation\n**Limitations:** Constant costs assumption, transport costs, exchange rates, power imbalances, infant industry argument, environmental costs of transport",
      },
      {
        title: "Protectionism",
        definition: "Government restricts free trade to protect domestic industries from foreign competition.",
        keyTerms: [
          { term: "Tariff", definition: "Tax on imports — raises price, protects domestic firms" },
          { term: "Quota", definition: "Physical limit on quantity of imports" },
          { term: "Subsidy", definition: "Payment to domestic firms to lower costs vs imports" },
          { term: "Non-Tariff Barrier", definition: "Regulations, standards, red tape that restrict trade" },
          { term: "Dumping", definition: "Selling exports below cost to destroy foreign competitors" },
        ],
        explanation: "**Arguments for:** Infant industries, national security, preventing dumping, protecting jobs, correcting BoP deficit, environmental/health standards\n**Arguments against:** Higher prices, inefficiency, retaliation (trade wars), reduced choice, WTO rules, may protect sunset industries indefinitely\n\n**Recent examples:** US-China trade war (tariffs on $370bn of Chinese goods), EU carbon border adjustment mechanism",
        examTip: "Always evaluate protectionism by discussing retaliation, impact on consumers, and whether infant industries ever 'grow up'.",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the price of one currency in terms of another.",
        keyTerms: [
          { term: "Floating", definition: "Determined by supply and demand" },
          { term: "Fixed", definition: "Pegged by central bank" },
          { term: "Managed Float", definition: "Floating with central bank intervention" },
          { term: "Appreciation", definition: "Currency rises in value → exports dearer, imports cheaper" },
          { term: "Depreciation", definition: "Currency falls in value → exports cheaper, imports dearer" },
          { term: "Marshall-Lerner Condition", definition: "Depreciation improves BoP if PED(X) + PED(M) > 1" },
          { term: "J-Curve Effect", definition: "Short-run worsening of trade balance after depreciation before improvement" },
        ],
        explanation: "**Causes of depreciation:** Lower interest rates, higher inflation, poor economic performance, speculation, political uncertainty\n**Impact:** Improves trade balance (if M-L holds) but may cause cost-push inflation\n\n**J-Curve:** In the short run, existing contracts mean quantities don't adjust → BoP worsens. In the long run, quantities adjust → BoP improves.",
        examTip: "Use Marshall-Lerner and J-curve in evaluation. Always discuss whether elasticity conditions are met in the specific context.",
      },
      {
        title: "European Union & Trading Blocs",
        definition: "**Trading blocs** reduce trade barriers between member states, promoting economic integration.",
        keyTerms: [
          { term: "Free Trade Area", definition: "No internal tariffs, each sets own external tariffs (e.g., USMCA)" },
          { term: "Customs Union", definition: "No internal tariffs + common external tariff" },
          { term: "Single Market", definition: "Free movement of goods, services, capital, labour (EU)" },
          { term: "Trade Creation", definition: "Buying from efficient partner instead of domestic producer → welfare gain" },
          { term: "Trade Diversion", definition: "Buying from less efficient partner instead of cheaper non-member → welfare loss" },
        ],
        explanation: "**Benefits:** Larger market, economies of scale, FDI attraction, political stability, lower transaction costs\n**Costs:** Loss of sovereignty, trade diversion, adjustment costs, uneven benefits\n\n**Brexit analysis:** UK left EU single market/customs union → new trade barriers with largest trading partner, but regained sovereignty on trade deals, immigration, regulation. UK-Australia FTA, CPTPP membership as alternative strategy.",
        examTip: "For Edexcel A 25-mark essays, evaluate whether Brexit has been a net positive for the UK economy. Consider trade, FDI, sovereignty, and immigration effects.",
      },
    ],
  },
  {
    name: "Development Economics",
    subtopics: [
      {
        title: "Economic Development vs Growth",
        definition: "**Economic development** goes beyond GDP growth to include improvements in living standards, health, education, and freedom.",
        keyTerms: [
          { term: "HDI", definition: "Human Development Index — income + education + life expectancy (0 to 1)" },
          { term: "MPI", definition: "Multidimensional Poverty Index — health, education, living standards" },
          { term: "Gini Coefficient", definition: "Measures inequality (0 = equal, 1 = unequal)" },
          { term: "Sustainable Development", definition: "Meeting present needs without compromising future generations" },
        ],
        explanation: "**Growth ≠ development:** A country can grow GDP but not develop if growth is unequal, environmentally destructive, or based on resource extraction without investment in human capital.\n\n**Key indicators:**\n- GDP per capita (PPP adjusted)\n- HDI (broader measure)\n- Life expectancy, literacy, infant mortality\n- Access to clean water, sanitation\n- Gini coefficient (inequality)",
      },
      {
        title: "Barriers to Development",
        definition: "Developing countries face structural obstacles preventing sustained economic development.",
        explanation: "**Key barriers:**\n- **Corruption** — misallocation of resources, deters FDI\n- **Poor infrastructure** — limits trade and productivity\n- **Debt burden** — interest payments divert spending from development\n- **Trade dependency** — reliance on primary commodities\n- **Climate vulnerability** — natural disasters destroy capital\n- **Conflict** — destroys infrastructure, creates refugees\n- **Brain drain** — skilled workers emigrate\n- **Disease** — HIV/AIDS, malaria reduce labour force\n- **Population growth** — outpaces economic growth\n- **Poor governance** — weak institutions, property rights\n\n**Prebisch-Singer hypothesis:** Terms of trade for primary commodities decline over time → commodity-dependent countries fall further behind",
      },
      {
        title: "Development Strategies",
        definition: "Countries use various strategies to promote economic development, each with advantages and limitations.",
        explanation: "**Trade liberalisation:** Open markets → specialisation → growth. But may expose infant industries.\n**FDI attraction:** Creates jobs, technology transfer. But profits repatriated, exploitation.\n**Aid:** Bilateral/multilateral → fills savings gap. But may create dependency, corruption.\n**Microfinance:** Small loans to entrepreneurs → empowerment. But high interest rates.\n**Education investment:** Long-term human capital. But expensive, takes decades.\n**Institutional reform:** Property rights, rule of law. But politically difficult.\n\n**Washington Consensus:** Free markets, privatisation, fiscal discipline. Criticised for ignoring inequality.\n**Post-Washington Consensus:** More role for government, institutions matter, inclusive growth.",
        examTip: "Evaluate each strategy by considering: who benefits (elites vs poor), time horizon, sustainability, and whether it addresses root causes.",
      },
    ],
  },
];
