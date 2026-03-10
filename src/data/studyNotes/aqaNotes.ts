import type { Topic } from "./edexcelANotes";

/* ═══════════════════════════════════════════════════════════════
 *  AQA A-LEVEL ECONOMICS (7136) — STUDY NOTES
 *  Structured by Year 1 (AS content) and Year 2 (A2 content)
 *  per the AQA 7135/7136 specification (2015 onwards)
 * ═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
 *  YEAR 1 (AS) — PAPER 1: MARKETS & MARKET FAILURE
 *  Spec sections 4.1.1 – 4.1.8
 * ────────────────────────────────────────────────────────────── */

export const aqaYear1Paper1Topics: Topic[] = [
  {
    name: "4.1.1 Economic Methodology & the Economic Problem",
    subtopics: [
      {
        title: "Scarcity, Choice & Opportunity Cost",
        definition: "**Scarcity** occurs because resources are finite but human wants are infinite. This forces economic agents to make **choices** about resource allocation. Every choice involves an **opportunity cost**.",
        keyTerms: [
          { term: "Scarcity", definition: "The fundamental economic problem — unlimited wants vs limited resources" },
          { term: "Opportunity Cost", definition: "The next best alternative foregone when a decision is made" },
          { term: "Factors of Production", definition: "Land (natural resources), Labour (human effort), Capital (man-made resources), Enterprise (risk-taking & organisation)" },
          { term: "Economic Good", definition: "A good that is scarce and therefore has an opportunity cost" },
          { term: "Free Good", definition: "A good with no opportunity cost (e.g., air, sunlight)" },
        ],
        explanation: "**The fundamental economic questions:**\n1. **What** to produce? — Which goods and services?\n2. **How** to produce? — Which combination of resources?\n3. **For whom** to produce? — How to distribute output?\n\nThese questions arise because of scarcity. Different economic systems answer them in different ways.",
        example: "A government choosing to spend £10bn on defence instead of the NHS faces an opportunity cost of improved healthcare. A student choosing to study economics instead of history has an opportunity cost of the history knowledge forgone.",
        examTip: "Always define opportunity cost precisely: 'the NEXT BEST alternative foregone.' Examiners penalise vague definitions like 'what you give up'. It must be the NEXT BEST, not just any alternative.",
      },
      {
        title: "Production Possibility Frontiers (PPF)",
        definition: "A **PPF** shows the maximum output combinations of two goods an economy can produce with given resources and technology. It illustrates scarcity, choice, and opportunity cost.",
        keyTerms: [
          { term: "Productive Efficiency", definition: "Operating on the PPF — all resources are fully and efficiently employed" },
          { term: "Allocative Efficiency", definition: "Producing the combination of goods most wanted by society (P = MC)" },
          { term: "Capital Goods", definition: "Goods used to make other goods (e.g., machinery, factories)" },
          { term: "Consumer Goods", definition: "Goods bought for personal satisfaction (e.g., food, clothing)" },
        ],
        explanation: "**Key points about the PPF:**\n1. Points **on** the curve = productively efficient (all resources used)\n2. Points **inside** = inefficient (unemployed resources or productive inefficiency)\n3. Points **outside** = currently unattainable (would need more resources or better technology)\n4. **Outward shift** = economic growth (more FOP or improved technology)\n5. **Inward shift** = destruction of resources (war, natural disaster)\n6. **Opportunity cost** = the gradient of the PPF\n7. A **concave** PPF reflects increasing opportunity costs (resources not perfectly substitutable)\n8. A **straight-line** PPF implies constant opportunity costs\n\n**Capital vs consumer goods trade-off:** Producing more capital goods today shifts the PPF outward tomorrow (investment-led growth), but means fewer consumer goods today.",
        examTip: "On a PPF question, always state that the curve illustrates opportunity cost, and explicitly reference whether points are on, inside, or outside the frontier. Show the adjustment mechanism.",
        diagram: "ppf",
      },
      {
        title: "Specialisation & Division of Labour",
        definition: "**Specialisation** means concentrating on a particular product or task. **Division of labour** breaks the production process into separate tasks, each performed by different workers.",
        keyTerms: [
          { term: "Specialisation", definition: "Focusing on producing a narrow range of goods or services" },
          { term: "Division of Labour", definition: "Splitting production into distinct tasks performed by different workers" },
          { term: "Economies of Scale", definition: "Cost advantages from large-scale production enabled by specialisation" },
        ],
        explanation: "**Advantages of specialisation & division of labour:**\n- Higher output per worker (productivity gains)\n- Workers develop expertise and skill\n- Time saved switching between tasks\n- Enables use of specialised machinery\n- Economies of scale reduce unit costs\n\n**Disadvantages:**\n- Monotony and boredom → lower motivation\n- Structural unemployment if demand changes\n- Over-dependence on others / supply chain risk\n- Loss of craftsmanship and flexibility\n- Workers become deskilled outside their specialism\n\n**International specialisation:** Countries specialise based on comparative advantage — trading to benefit both parties.",
        example: "Adam Smith's pin factory (1776) — one worker alone makes 20 pins/day, but 10 workers each specialising in a different task make 48,000 pins/day. Modern equivalent: a car assembly line with hundreds of specialised roles.",
      },
      {
        title: "Free Market, Mixed & Command Economies",
        definition: "Economic systems differ in how they answer the three fundamental questions: **what**, **how**, and **for whom** to produce. Systems exist on a spectrum from pure free market to pure command.",
        keyTerms: [
          { term: "Free Market Economy", definition: "Resources allocated by supply and demand with minimal government intervention" },
          { term: "Command Economy", definition: "Government makes all economic decisions centrally (what, how, for whom)" },
          { term: "Mixed Economy", definition: "Combination of market forces and government intervention — like the UK" },
          { term: "Consumer Sovereignty", definition: "Consumers determine what is produced through their spending decisions" },
        ],
        explanation: "**Free market strengths:** Consumer sovereignty, profit motive drives innovation and efficiency, price mechanism allocates resources, freedom of choice\n**Free market weaknesses:** Market failure (externalities, public goods, inequality), exploitation, instability\n\n**Command economy strengths:** Greater equality, provision of public goods, can mobilise resources quickly\n**Command economy weaknesses:** Lack of incentives, information problems, bureaucracy, no consumer choice\n\n**Mixed economy:** Most real-world economies. Government corrects market failures while markets allocate most resources. Debate centres on the optimal DEGREE of intervention.",
        examTip: "Most real economies are mixed. Evaluate the degree of government intervention needed by discussing specific market failures that justify intervention.",
      },
      {
        title: "Positive & Normative Statements",
        definition: "**Positive statements** are objective and can be tested with evidence. **Normative statements** are value judgements that cannot be proven true or false.",
        keyTerms: [
          { term: "Positive Statement", definition: "'UK inflation was 10.1% in October 2022' — factual, testable with data" },
          { term: "Normative Statement", definition: "'The government should spend more on the NHS' — opinion, involves a value judgement" },
          { term: "Ceteris Paribus", definition: "'All other things being equal' — assumption used to isolate cause and effect" },
        ],
        explanation: "**Why the distinction matters:**\n- Policy debates often mix positive claims with normative opinions\n- Economists can agree on positive statements but disagree normatively\n- Good economic analysis separates facts from value judgements\n- Exam answers should use positive economic reasoning, then offer normative policy recommendations\n\n**Identifying normative statements:** Look for words like 'should', 'ought', 'better', 'unfair', 'too much' — these signal value judgements.\n\n**Economic methodology:** Economists build models using ceteris paribus assumptions, test hypotheses with data, and draw policy conclusions. Models are simplifications of reality — useful but imperfect.",
        examTip: "AQA MCQs frequently test this. Look for value-laden language ('should', 'ought', 'fair') — these indicate normative statements. A statement can contain data but still be normative if it makes a judgement.",
      },
    ],
  },
  {
    name: "4.1.2 Price Determination in a Competitive Market",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to purchase at a given price in a given time period, ceteris paribus. The demand curve shows the inverse relationship between price and quantity demanded.",
        keyTerms: [
          { term: "Law of Demand", definition: "As price rises, quantity demanded falls, ceteris paribus (inverse relationship)" },
          { term: "Effective Demand", definition: "Desire for a good backed by the ability to pay" },
          { term: "Individual Demand", definition: "A single consumer's demand at each price" },
          { term: "Market Demand", definition: "Horizontal summation of all individual demand curves" },
        ],
        explanation: "**Movements ALONG the demand curve** (caused by a change in the good's OWN price):\n- Price rises → contraction in demand\n- Price falls → extension in demand\n\n**SHIFTS of the demand curve** (caused by non-price factors):\n- **Income changes:** Normal goods → income ↑ → demand ↑. Inferior goods → income ↑ → demand ↓\n- **Prices of substitutes:** Price of substitute ↑ → demand for this good ↑\n- **Prices of complements:** Price of complement ↑ → demand for this good ↓\n- **Tastes & preferences:** Fashion, advertising, trends\n- **Population changes:** Size, age structure, migration\n- **Interest rates:** Lower rates → more disposable income → demand ↑\n- **Expectations:** Expected price rises → demand ↑ now",
        example: "A rise in the price of Coca-Cola increases demand for Pepsi (substitute), shifting Pepsi's demand curve rightward. A fall in the price of printers increases demand for ink cartridges (complement).",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity of a good producers are willing and able to offer for sale at a given price in a given time period, ceteris paribus.",
        keyTerms: [
          { term: "Law of Supply", definition: "As price rises, quantity supplied rises (positive relationship) — higher prices incentivise more production" },
          { term: "Individual Supply", definition: "A single firm's supply at each price" },
          { term: "Market Supply", definition: "Horizontal summation of all individual supply curves" },
        ],
        explanation: "**Movements ALONG the supply curve** (change in the good's OWN price):\n- Price rises → extension in supply\n- Price falls → contraction in supply\n\n**SHIFTS of the supply curve** (non-price factors):\n- **Costs of production:** Wages ↑, raw materials ↑, energy ↑ → supply shifts LEFT\n- **Technology improvements:** Better tech → lower costs → supply shifts RIGHT\n- **Indirect taxes:** Raise costs → supply shifts LEFT\n- **Subsidies:** Lower costs → supply shifts RIGHT\n- **Number of firms:** More firms → supply shifts RIGHT\n- **Weather / external shocks:** Drought → agricultural supply shifts LEFT\n- **Productivity:** Higher productivity → supply shifts RIGHT",
        examTip: "A change IN price = movement ALONG the curve. A change in OTHER factors = SHIFT of the curve. Examiners test this distinction relentlessly. ALWAYS specify whether it's a movement or a shift.",
        diagram: "supply_decrease",
      },
      {
        title: "Market Equilibrium & Disequilibrium",
        definition: "**Market equilibrium** occurs where demand equals supply. At the equilibrium price, there is no tendency for change — the market clears.",
        keyTerms: [
          { term: "Equilibrium Price", definition: "The price at which quantity demanded equals quantity supplied" },
          { term: "Excess Supply", definition: "Price above equilibrium → Qs > Qd → unsold stock → price falls" },
          { term: "Excess Demand", definition: "Price below equilibrium → Qd > Qs → shortages → price rises" },
          { term: "Consumer Surplus", definition: "The difference between what consumers are willing to pay and what they actually pay" },
          { term: "Producer Surplus", definition: "The difference between the price received and the minimum price a producer would accept" },
        ],
        explanation: "**The adjustment mechanism:**\n1. **Excess supply** (price above equilibrium) → firms compete → prices fall → movement down supply curve and up demand curve → back to equilibrium\n2. **Excess demand** (price below equilibrium) → consumers compete → prices rise → movement up supply curve and down demand curve → back to equilibrium\n\n**Total economic welfare** = Consumer surplus + Producer surplus\n\n**Changes in equilibrium:** An increase in demand (shift right) → higher equilibrium price and quantity. An increase in supply (shift right) → lower equilibrium price and higher quantity.\n\nWhen both shift simultaneously, the effect on EITHER price or quantity is ambiguous — it depends on the relative magnitudes of the shifts.",
        diagram: "supply_demand",
        examTip: "Always show the adjustment process — explain HOW the market moves to equilibrium, not just WHERE equilibrium is. Use arrows to show the direction of price and quantity changes.",
      },
      {
        title: "The Price Mechanism",
        definition: "The **price mechanism** allocates resources in a free market through three interrelated functions: signalling, incentivising, and rationing.",
        keyTerms: [
          { term: "Signalling", definition: "Prices communicate information about scarcity and demand to producers and consumers" },
          { term: "Incentive Function", definition: "Rising prices incentivise producers to supply more and consumers to demand less" },
          { term: "Rationing Function", definition: "Prices allocate scarce resources to those willing and able to pay the most" },
        ],
        explanation: "**How the three functions work together:**\n1. **Signal:** A shortage causes prices to rise, signalling high demand and scarcity\n2. **Incentive:** Higher prices incentivise new firms to enter and existing firms to produce more\n3. **Ration:** Higher prices ration the good to consumers who value it most\n\nThe price mechanism works best when markets are competitive, information is good, and there are no externalities.",
        example: "During the 2022 energy crisis, rising gas prices signalled scarcity, incentivised firms to invest in renewables and alternative energy, and rationed gas to those who valued it most (or could afford it).",
      },
      {
        title: "Interrelated Markets",
        definition: "Markets are interconnected — a change in one market causes ripple effects in related markets through substitutes, complements, derived demand, composite demand, and joint supply.",
        keyTerms: [
          { term: "Substitute Goods", definition: "Goods that can replace each other — rise in price of one increases demand for the other" },
          { term: "Complementary Goods", definition: "Goods used together — rise in price of one decreases demand for the other" },
          { term: "Derived Demand", definition: "Demand for a factor of production that arises from demand for the final good it produces" },
          { term: "Composite Demand", definition: "A good demanded for multiple purposes (e.g., milk for drinking, cheese, butter, yoghurt)" },
          { term: "Joint Supply", definition: "Producing one good automatically creates another as a by-product (e.g., beef and leather)" },
        ],
        explanation: "**Chain of reasoning through interrelated markets:**\n\nOil price rise → petrol more expensive → less driving → less demand for cars (complement) → more demand for public transport (substitute) → less demand for car tyres (derived demand falls) → car manufacturers lay off workers\n\n**Composite demand:** If more wheat is used for biofuel, less is available for bread → bread price rises\n\n**Joint supply:** More cattle slaughtered for beef → more leather → leather prices fall\n\n**Derived demand in the labour market:** Higher demand for houses → higher demand for bricklayers → higher wages for bricklayers",
        examTip: "AQA loves chain-of-reasoning questions about interrelated markets. Practise tracing effects through 3+ markets using supply & demand diagrams for each. Show the causal chain clearly.",
      },
    ],
  },
  {
    name: "4.1.3 Production, Costs & Revenue",
    subtopics: [
      {
        title: "Production & Productivity",
        definition: "**Production** is the process of converting inputs (factors of production) into outputs. **Productivity** measures the efficiency of that conversion.",
        keyTerms: [
          { term: "Total Product (TP)", definition: "The total output produced by all workers" },
          { term: "Average Product (AP)", definition: "Output per worker: TP ÷ number of workers" },
          { term: "Marginal Product (MP)", definition: "The extra output from employing one additional worker" },
          { term: "Labour Productivity", definition: "Output per worker per hour — a key measure of efficiency" },
        ],
        formula: "AP = TP ÷ L\nMP = ΔTP ÷ ΔL",
        explanation: "**The Law of Diminishing Marginal Returns (short run):**\nAs more units of a variable factor (labour) are added to a fixed factor (capital), marginal product eventually falls.\n\n**Relationship between AP and MP:**\n- When MP > AP → AP is rising\n- When MP = AP → AP is at its maximum\n- When MP < AP → AP is falling\n\n**Significance:** Diminishing returns explains why MC eventually rises in the short run — as each extra worker adds less output, the cost of each extra unit rises.",
        examTip: "Diminishing returns is a SHORT-RUN concept (at least one fixed factor). Don't confuse with diseconomies of scale (LONG-RUN, all factors variable).",
      },
      {
        title: "Short-Run Costs",
        definition: "In the **short run**, at least one factor is fixed. Costs are divided into fixed costs (don't vary with output) and variable costs (vary with output).",
        keyTerms: [
          { term: "Fixed Costs (FC/TFC)", definition: "Costs that don't vary with output (e.g., rent, insurance, interest payments)" },
          { term: "Variable Costs (VC/TVC)", definition: "Costs that vary directly with output (e.g., raw materials, wages for production staff)" },
          { term: "Total Cost (TC)", definition: "TFC + TVC" },
          { term: "Average Fixed Cost (AFC)", definition: "TFC ÷ Q — falls continuously as output rises (spreading the overhead)" },
          { term: "Average Variable Cost (AVC)", definition: "TVC ÷ Q — U-shaped due to diminishing returns" },
          { term: "Average Total Cost (ATC/AC)", definition: "TC ÷ Q = AFC + AVC — U-shaped" },
          { term: "Marginal Cost (MC)", definition: "The extra cost of producing one more unit: ΔTC ÷ ΔQ" },
        ],
        formula: "TC = TFC + TVC\nAC = TC ÷ Q = AFC + AVC\nMC = ΔTC ÷ ΔQ",
        explanation: "**Why the MC curve is U-shaped:**\n- Initially, increasing returns → MC falls\n- Beyond a point, diminishing returns → MC rises\n\n**MC intersects AVC and ATC at their minimum points:**\n- When MC < AC → AC is falling\n- When MC = AC → AC is at minimum (productive efficiency)\n- When MC > AC → AC is rising\n\n**The shut-down rule (short run):** If price < AVC, the firm should shut down — it can't even cover variable costs. If AVC < price < ATC, it should continue (covering VCs and some FCs).",
      },
      {
        title: "Long-Run Costs & Economies of Scale",
        definition: "In the **long run**, all factors are variable. The firm can choose its optimal plant size. The LRAC curve shows the minimum cost at each output level.",
        keyTerms: [
          { term: "Economies of Scale", definition: "Falling LRAC as the firm increases its scale of production" },
          { term: "Diseconomies of Scale", definition: "Rising LRAC when the firm becomes too large to manage efficiently" },
          { term: "Minimum Efficient Scale (MES)", definition: "The lowest output at which LRAC is minimised" },
          { term: "Constant Returns to Scale", definition: "LRAC remains unchanged as output increases" },
          { term: "Internal EoS", definition: "Cost advantages from the growth of the firm itself" },
          { term: "External EoS", definition: "Cost advantages from the growth of the industry as a whole" },
        ],
        explanation: "**Internal economies of scale (TPFMR):**\n- **Technical:** Larger machines are more efficient, container principle (volume ↑ faster than surface area), specialised capital\n- **Purchasing/Bulk-buying:** Discounts from ordering in large quantities\n- **Financial:** Lower borrowing rates, access to bond and equity markets\n- **Managerial:** Specialist managers for each department (HR, finance, marketing)\n- **Risk-bearing:** Diversification across products, markets, geographies\n\n**External economies:** Skilled labour pool, supplier networks, knowledge spillovers, shared infrastructure, specialist training providers\n\n**Diseconomies of scale:** Communication breakdowns, co-ordination problems, loss of control, bureaucracy, principal-agent problems, loss of worker motivation\n\n**LRAC is the 'envelope' of all possible short-run ATC curves** — each tangent point represents the optimal plant size for that output level.",
        example: "Amazon achieves massive technical and purchasing economies through automated warehouses and bulk buying. GE experienced diseconomies — too many divisions to manage effectively, leading to its eventual break-up.",
        examTip: "AQA tests diminishing returns (short run) vs economies of scale (long run). Don't confuse them — diminishing returns is about adding ONE variable factor to fixed factors. Economies of scale is about increasing ALL factors.",
      },
      {
        title: "Revenue",
        definition: "Revenue is the income a firm receives from selling its output. The relationship between AR, MR, and TR depends on the market structure.",
        keyTerms: [
          { term: "Total Revenue (TR)", definition: "Price × Quantity sold" },
          { term: "Average Revenue (AR)", definition: "TR ÷ Q = price per unit — the demand curve IS the AR curve" },
          { term: "Marginal Revenue (MR)", definition: "The extra revenue from selling one more unit: ΔTR ÷ ΔQ" },
        ],
        formula: "TR = P × Q\nAR = TR ÷ Q\nMR = ΔTR ÷ ΔQ",
        explanation: "**In perfect competition:** AR = MR = Price (horizontal demand curve — firm is a price taker)\n**In imperfect competition:** AR slopes downward. MR is below AR and falls twice as steeply.\n\n**Key relationship:** TR is maximised where MR = 0.\n\n**Profit maximisation rule:** Firms maximise profit where MC = MR (as long as MC is rising through MR).",
      },
      {
        title: "Profit",
        definition: "Profit is the difference between total revenue and total costs. Economists distinguish between normal and supernormal profit.",
        keyTerms: [
          { term: "Normal Profit", definition: "AR = AC — the minimum return to keep a firm in the industry. It IS an economic cost (opportunity cost of enterprise)" },
          { term: "Supernormal (Abnormal) Profit", definition: "AR > AC — returns above normal profit; attracts new entrants" },
          { term: "Subnormal Profit (Loss)", definition: "AR < AC — firm may shut down in the long run if losses persist" },
        ],
        formula: "Profit = TR − TC\nProfit per unit = AR − AC",
        explanation: "**Normal profit** is included in the cost curves — it's the opportunity cost of the entrepreneur's time and capital.\n\n**Profit maximisation:** MC = MR (provided MC cuts MR from below).\n**Revenue maximisation:** MR = 0 (TR is at its maximum).\n**Sales maximisation:** AC = AR (normal profit constraint — produce as much as possible without making a loss).\n\n**Why firms may not profit-maximise:** Satisficing behaviour, principal-agent problem, pursuit of market share, managerial objectives, corporate social responsibility.",
        examTip: "Always show supernormal profit on diagrams as the shaded area between AR and AC at the profit-maximising output (where MC = MR).",
      },
    ],
  },
  {
    name: "4.1.4 Competitive & Concentrated Markets",
    subtopics: [
      {
        title: "Market Structures Overview",
        definition: "Market structure describes the competitive environment in which firms operate. Key features include number of firms, barriers to entry, product type, and information availability.",
        keyTerms: [
          { term: "Market Structure", definition: "The organisational characteristics of a market — from perfect competition to monopoly" },
          { term: "Barriers to Entry", definition: "Factors that prevent new firms from entering — patents, EoS, branding, legal, capital requirements" },
          { term: "Concentration Ratio", definition: "Market share of the largest firms (e.g., CR5 = combined share of top 5 firms)" },
        ],
        explanation: "**Spectrum of market structures:**\n\n| Feature | Perfect Comp. | Monopolistic Comp. | Oligopoly | Monopoly |\n|---|---|---|---|---|\n| Firms | Many | Many | Few | One |\n| Products | Homogeneous | Differentiated | Differentiated | Unique |\n| Barriers | None | Low | High | Very High |\n| Price-setting | Price taker | Some power | Interdependent | Price maker |\n| Profit (LR) | Normal | Normal | Supernormal | Supernormal |",
      },
      {
        title: "Perfect Competition",
        definition: "A theoretical market structure with many firms selling identical products, with perfect information and no barriers to entry or exit.",
        keyTerms: [
          { term: "Price Taker", definition: "Firms accept the market price — each firm's output is too small to influence price" },
          { term: "Homogeneous Product", definition: "Identical products — consumers see no difference between firms" },
          { term: "Perfect Information", definition: "All buyers and sellers know all prices and product qualities" },
        ],
        explanation: "**Assumptions:** Many small buyers and sellers, homogeneous products, perfect information, no barriers to entry/exit, price takers, profit maximisers\n\n**Short run:** Firms can earn supernormal profit (P > AC) or subnormal profit (P < AC)\n**Long run:** Entry/exit drives profit to normal:\n- Supernormal profit → new firms enter → supply ↑ → price ↓ → profit eroded\n- Subnormal profit → firms exit → supply ↓ → price ↑ → losses eliminated\n\n**Efficiency:** Allocatively efficient (P = MC) and productively efficient (min AC) in the long run.\n**Limitation:** May lack dynamic efficiency — normal profits mean little R&D investment. Also completely unrealistic — no real market meets all assumptions.",
        examTip: "Perfect competition is the benchmark. Always compare other structures against it. In the long run: P = MC (allocative) and P = min AC (productive). But dynamic efficiency may be lacking.",
      },
      {
        title: "Monopoly",
        definition: "A market dominated by a single firm (legal definition: 25%+ market share in the UK). High barriers to entry prevent effective competition.",
        keyTerms: [
          { term: "Price Maker", definition: "The monopolist sets the price — faces a downward-sloping AR curve" },
          { term: "Barriers to Entry", definition: "Patents, economies of scale, legal monopoly, branding, control of key resources, high start-up costs" },
          { term: "Natural Monopoly", definition: "An industry where one firm can supply the whole market at lower average cost than two or more firms" },
          { term: "X-Inefficiency", definition: "Producing above minimum cost due to organisational slack (no competitive pressure)" },
        ],
        explanation: "**Costs of monopoly:**\n- Higher prices, lower output vs competitive market\n- Allocative inefficiency: P > MC\n- Productive inefficiency: not at min AC\n- X-inefficiency (organisational slack)\n- Supernormal profits → income inequality\n- Reduced consumer surplus\n\n**Benefits of monopoly:**\n- Supernormal profits fund R&D → dynamic efficiency\n- Economies of scale may lower costs below competitive levels\n- Cross-subsidisation (profitable routes fund unprofitable ones)\n- Natural monopoly: one firm is most efficient\n\n**Evaluation:** Whether monopoly is harmful depends on: contestability, regulation, dynamic efficiency, whether it's a natural monopoly.",
        examTip: "For 25-mark essays, ALWAYS evaluate whether monopoly is necessarily bad. Use dynamic efficiency examples (Apple investing profits in iPhone development, pharma companies funding drug research).",
      },
      {
        title: "The Competitive Market Process",
        definition: "Competition is a process, not just a market structure. Even in concentrated markets, the THREAT of competition can discipline firm behaviour.",
        explanation: "**Key insight:** What matters is not just how many firms exist NOW, but how easy it is for new firms to ENTER.\n\n**Creative destruction (Schumpeter):** Innovation by new entrants destroys established firms — this is the engine of capitalism. Monopoly profits incentivise innovation, which then disrupts the monopolist.\n\n**Examples:** Netflix disrupted Blockbuster, Uber disrupted traditional taxis, Amazon disrupted high-street retail.\n\n**Policy implication:** Competition policy should focus on removing barriers to entry rather than just breaking up large firms.",
        example: "Kodak held 90% of the US film market but was destroyed by digital photography. Nokia dominated mobile phones but was disrupted by Apple's iPhone. Monopoly power is often temporary if markets are contestable.",
      },
    ],
  },
  {
    name: "4.1.5 Market Mechanism, Market Failure & Government Intervention",
    subtopics: [
      {
        title: "Types of Market Failure",
        definition: "**Market failure** occurs when the free market leads to a misallocation of resources — producing the wrong quantity of goods from society's perspective.",
        keyTerms: [
          { term: "Allocative Inefficiency", definition: "Resources not allocated where P = MC — social welfare not maximised" },
          { term: "Complete Market Failure", definition: "The market fails to produce the good at all (e.g., public goods)" },
          { term: "Partial Market Failure", definition: "The market produces but at the wrong quantity (e.g., externalities)" },
          { term: "Missing Market", definition: "A market that should exist but doesn't (e.g., carbon market before regulation)" },
        ],
        explanation: "**Causes of market failure:**\n1. Externalities (costs/benefits to third parties)\n2. Public goods (non-rival, non-excludable)\n3. Merit/demerit goods (information failure)\n4. Information failure and asymmetric information\n5. Monopoly power\n6. Factor immobility\n7. Inequality\n\n**Why does the market fail?** Because private costs/benefits diverge from social costs/benefits, or because the assumptions of the free market (perfect info, no externalities, many firms) don't hold.",
      },
      {
        title: "Externalities",
        definition: "**Externalities** are costs or benefits that affect third parties not directly involved in the economic transaction. They create a divergence between private and social costs/benefits.",
        keyTerms: [
          { term: "Negative Production Externality", definition: "MSC > MPC — e.g., factory pollution harming local residents" },
          { term: "Negative Consumption Externality", definition: "MSC > MPC on the demand side — e.g., passive smoking, alcohol-related violence" },
          { term: "Positive Production Externality", definition: "MSC < MPC — e.g., R&D spillovers benefiting other firms" },
          { term: "Positive Consumption Externality", definition: "MSB > MPB — e.g., vaccination creating herd immunity" },
          { term: "Marginal External Cost (MEC)", definition: "MSC − MPC: the cost imposed on third parties per unit" },
          { term: "Marginal External Benefit (MEB)", definition: "MSB − MPB: the benefit to third parties per unit" },
          { term: "Social Optimum", definition: "Output where MSB = MSC — welfare is maximised" },
        ],
        explanation: "**Negative externality → overproduction:**\n- MSC > MPC → market produces Qm (too much) vs social optimum Q*\n- Welfare loss = triangle between MSC and MSB from Q* to Qm\n- Solution: tax (Pigouvian), regulation, tradable permits\n\n**Positive externality → underproduction:**\n- MSB > MPB → market produces Qm (too little) vs social optimum Q*\n- Welfare loss = triangle between MSB and MSC from Qm to Q*\n- Solution: subsidies, provision of information, direct provision",
        example: "Vaccination creates positive consumption externalities — the individual benefits (MPB) AND the wider community benefits from herd immunity (MSB > MPB). The free market underproduces vaccines because individuals ignore the external benefit.",
        diagram: "positive_externality",
        examTip: "Always label the welfare loss triangle on diagrams. State: 'The free market produces at Qm but the social optimum is Q*. The deadweight loss triangle represents the welfare cost of market failure.'",
      },
      {
        title: "Public Goods",
        definition: "**Public goods** are non-rivalrous and non-excludable. These characteristics mean the free market fails to provide them — the free rider problem prevents private firms from charging.",
        keyTerms: [
          { term: "Non-Rivalrous", definition: "One person's consumption doesn't reduce availability for others (zero marginal cost of extra user)" },
          { term: "Non-Excludable", definition: "Impossible to prevent non-payers from consuming the good" },
          { term: "Free Rider Problem", definition: "Rational consumers benefit without paying → no revenue → no private provision → market failure" },
          { term: "Quasi-Public Good", definition: "Partially non-rival or non-excludable (e.g., roads — rivalrous during rush hour, parks — can charge entry)" },
        ],
        explanation: "**Why the market fails completely:**\n1. Non-excludable → can't charge consumers → no revenue\n2. Rational consumers free-ride → won't voluntarily pay\n3. No profit incentive → private firms won't provide\n4. Result: ZERO private provision — complete market failure\n\n**Examples:** Street lighting, national defence, flood defences, lighthouses\n**Quasi-public goods:** BBC (excludable with licence), roads (excludable with tolls), parks\n\n**Solution:** Government provision funded by taxation. This overcomes the free rider problem but raises questions about how much to provide and how to fund it efficiently.",
        example: "National defence: non-rivalrous (protecting one citizen doesn't reduce protection for others) and non-excludable (can't charge individuals for defence). No private firm would provide it → government must.",
        examTip: "Public goods = COMPLETE market failure (no private provision at all). Merit goods = PARTIAL market failure (provided, but underprovided). Don't confuse the two — examiners penalise this.",
      },
      {
        title: "Merit & Demerit Goods",
        definition: "**Merit goods** are underconsumed because consumers underestimate their private benefits (information failure) and they generate positive externalities. **Demerit goods** are overconsumed for the opposite reasons.",
        keyTerms: [
          { term: "Merit Good", definition: "Underconsumed due to information failure + positive externalities (e.g., education, healthcare, vaccinations)" },
          { term: "Demerit Good", definition: "Overconsumed due to information failure + negative externalities (e.g., cigarettes, alcohol, gambling)" },
          { term: "Information Failure", definition: "Consumers lack full knowledge about the true costs or benefits of consumption" },
        ],
        explanation: "**Merit goods are underconsumed because:**\n1. **Information failure:** Consumers don't fully appreciate the long-term benefits (e.g., students don't realise how education will boost their future earnings)\n2. **Positive externalities:** Third-party benefits are ignored in private decisions (e.g., a more educated workforce benefits society)\n\n**Demerit goods are overconsumed because:**\n1. **Information failure:** Consumers underestimate the harm (e.g., young smokers don't appreciate long-term health risks)\n2. **Negative externalities:** Third-party costs are ignored (e.g., passive smoking, drink-driving)\n3. **Addiction:** Bounded self-control means consumption continues despite awareness of harm\n\n**Key distinction from public goods:** Merit goods ARE provided by the market, just at the wrong quantity. Public goods are NOT provided at all.",
        example: "Education: students undervalue future earning benefits (information failure). Society benefits from a more productive, innovative workforce (positive externality). Result: free market underprovides education.",
      },
      {
        title: "Information Failure",
        definition: "**Information failure** occurs when economic agents lack or misinterpret information, leading to irrational decisions and a misallocation of resources.",
        keyTerms: [
          { term: "Symmetric Information", definition: "Both parties have equal information — the ideal market assumption" },
          { term: "Asymmetric Information", definition: "One party has more/better information than the other — creates market failure" },
          { term: "Moral Hazard", definition: "Taking greater risks because someone else bears the cost of failure" },
          { term: "Adverse Selection", definition: "The 'wrong' type of buyer/seller enters the market due to information asymmetry" },
        ],
        explanation: "**Examples of information failure:**\n- Consumers don't know the true quality of a used car (Akerlof's 'Market for Lemons')\n- Patients can't assess the quality of medical treatment\n- Borrowers know more about their ability to repay than lenders\n\n**Moral hazard examples:**\n- Insurance: insured people take more risks\n- Banking: 'too big to fail' banks take excessive risks expecting government bailouts\n- Employment: workers with guaranteed contracts may shirk\n\n**Adverse selection examples:**\n- Health insurance: sickest people most likely to buy → premiums rise → healthy people leave → death spiral\n- Used car market: buyers assume cars are 'lemons' → good cars withdrawn → only bad cars sold",
        example: "The 2008 financial crisis: banks took excessive risks (moral hazard — expected government bailouts), and asymmetric information meant borrowers knew more about their ability to repay than lenders.",
        examTip: "Link information failure to behavioural economics — bounded rationality, biases, and nudge theory are all relevant to AQA. They demonstrate WHY consumers make irrational decisions.",
      },
      {
        title: "Government Intervention in Markets",
        definition: "Government intervenes to correct market failure, but intervention itself can lead to **government failure** if outcomes worsen.",
        keyTerms: [
          { term: "Indirect Tax", definition: "Tax on spending — specific (fixed amount per unit) or ad valorem (% of price)" },
          { term: "Subsidy", definition: "Payment from government to producers that lowers costs and shifts supply right" },
          { term: "Maximum Price (Ceiling)", definition: "Set below equilibrium to protect consumers — causes excess demand" },
          { term: "Minimum Price (Floor)", definition: "Set above equilibrium to protect producers — causes excess supply" },
          { term: "Tradable Pollution Permits", definition: "A cap-and-trade system that creates a market for the right to pollute" },
          { term: "Regulation", definition: "Laws that directly prohibit or mandate behaviour" },
          { term: "Pigouvian Tax", definition: "Tax set equal to the marginal external cost to internalise the externality" },
        ],
        explanation: "**Indirect taxes:**\n- Shift supply LEFT by the tax amount\n- Tax incidence depends on PED/PES: inelastic demand → consumers bear more\n- Pigouvian tax = MEC → internalises the externality\n\n**Subsidies:**\n- Shift supply RIGHT by the subsidy amount\n- Encourage consumption of merit goods / correct positive externalities\n- Problem: costly, may encourage inefficiency\n\n**Price controls:**\n- Max price (below equilibrium): shortages, black markets, reduced quality\n- Min price (above equilibrium): surpluses, government must buy excess\n\n**Tradable permits:** Cap total pollution → firms trade permits → efficient allocation of pollution reduction\n\n**Provision of information:** Correct information failure (calorie labels, health warnings)\n\n**Direct provision:** Government provides the good itself (NHS, state schools)",
        diagram: "tax_incidence",
        examTip: "For every intervention, discuss: (1) how it corrects the market failure, (2) potential government failure, (3) who bears the cost, (4) practical difficulties (information requirements, time lags).",
      },
      {
        title: "Government Failure",
        definition: "**Government failure** occurs when intervention leads to a net welfare loss — making the situation worse than the free market outcome.",
        keyTerms: [
          { term: "Unintended Consequences", definition: "Policies produce effects opposite to those intended or create new problems" },
          { term: "Information Gaps", definition: "Government lacks perfect information to set optimal tax/subsidy/regulation levels" },
          { term: "Administrative Costs", definition: "The cost of implementing and enforcing policies may exceed the benefits" },
          { term: "Regulatory Capture", definition: "Regulators start acting in the interest of the firms they're supposed to regulate" },
          { term: "Distortion of Price Signals", definition: "Intervention obscures the information conveyed by market prices" },
        ],
        explanation: "**Causes of government failure:**\n1. **Information problems:** Can't calculate the optimal Pigouvian tax or subsidy\n2. **Political self-interest:** Short-term vote-winning policies over long-term solutions\n3. **Regulatory capture:** Revolving door between regulators and industry\n4. **Unintended consequences:** Rent controls → housing shortages → homelessness\n5. **Administrative costs:** Bureaucracy absorbs resources\n6. **Moral hazard:** Protection encourages risky behaviour\n\n**Key principle:** Just because the market fails doesn't mean the government can do better. The cost of government failure may exceed the cost of market failure.",
        example: "US Prohibition (1920–33) banned alcohol but created organised crime and a thriving black market. The Cobra Effect in India: bounties for dead cobras led people to breed cobras. UK rent controls in the 1970s led to housing shortages and deteriorating property conditions.",
        examTip: "Every evaluation of government intervention should consider government failure. This is a KEY evaluative point for 15-mark and 25-mark questions. Ask: 'Is the cure worse than the disease?'",
      },
    ],
  },
  {
    name: "4.1.6 Elasticity",
    subtopics: [
      {
        title: "Price Elasticity of Demand (PED)",
        definition: "**PED** measures the responsiveness of quantity demanded to a change in the good's own price. It is always negative (law of demand) but we use the absolute value.",
        formula: "PED = % change in Qd ÷ % change in P",
        keyTerms: [
          { term: "Elastic (|PED| > 1)", definition: "Demand is responsive to price — % change in Qd > % change in P" },
          { term: "Inelastic (|PED| < 1)", definition: "Demand is unresponsive — % change in Qd < % change in P" },
          { term: "Unit Elastic (|PED| = 1)", definition: "Proportionate response — total revenue unchanged by price change" },
          { term: "Perfectly Elastic (PED = ∞)", definition: "Horizontal demand — any price rise loses ALL demand (perfect competition)" },
          { term: "Perfectly Inelastic (PED = 0)", definition: "Vertical demand — price has NO effect on quantity demanded" },
        ],
        explanation: "**Determinants of PED (SPLAT):**\n- **S**ubstitutes: More substitutes → more elastic\n- **P**roportion of income: Higher proportion → more elastic\n- **L**uxury vs necessity: Luxuries → more elastic; necessities → inelastic\n- **A**ddiction / habit: Addictive goods → inelastic\n- **T**ime period: Longer time → more elastic (more time to find alternatives)\n\n**PED and Total Revenue:**\n- |PED| > 1 (elastic): ↓P → ↑TR — cut price to boost revenue\n- |PED| < 1 (inelastic): ↑P → ↑TR — raise price to boost revenue\n- |PED| = 1: Price change has no effect on TR\n\n**Business significance:** Firms with inelastic demand (necessities, addictive goods, strong brands) have more pricing power.",
        diagram: "ped_elastic",
        examTip: "For revenue questions: elastic → lower price increases revenue. Inelastic → raise price increases revenue. Always explain WHY using the SPLAT determinants.",
      },
      {
        title: "Income Elasticity of Demand (YED)",
        definition: "**YED** measures the responsiveness of demand to a change in real income. The SIGN tells you the type of good.",
        formula: "YED = % change in Qd ÷ % change in Y",
        keyTerms: [
          { term: "Normal Good (YED > 0)", definition: "Demand rises as income rises" },
          { term: "Luxury/Superior Good (YED > 1)", definition: "Demand rises more than proportionally with income" },
          { term: "Necessity (0 < YED < 1)", definition: "Demand rises less than proportionally with income" },
          { term: "Inferior Good (YED < 0)", definition: "Demand falls as income rises — consumers switch to better alternatives" },
        ],
        explanation: "**Significance for firms:**\n- Firms selling luxury goods (high YED) benefit during booms but suffer in recessions — cyclical demand\n- Firms selling inferior goods (negative YED) are recession-proof — demand rises during downturns\n- Firms selling necessities (low positive YED) have stable demand throughout the cycle\n\n**Significance for structural change:**\n- As incomes rise, demand shifts from primary sector (low YED) to services (high YED)\n- This explains deindustrialisation in developed economies\n- Developing economies shift from agriculture to manufacturing to services (Rostow's stages)",
        example: "As incomes rise, demand for Aldi own-brand products falls (inferior, YED < 0) while demand for organic Waitrose products rises (luxury, YED > 1). During the 2008 recession, Aldi and Lidl gained market share.",
      },
      {
        title: "Cross Elasticity of Demand (XED)",
        definition: "**XED** measures the responsiveness of demand for good A to a change in the price of good B. The SIGN reveals the relationship.",
        formula: "XED = % change in Qd of A ÷ % change in P of B",
        keyTerms: [
          { term: "Substitutes (XED > 0)", definition: "Price of B rises → demand for A rises (positive relationship)" },
          { term: "Complements (XED < 0)", definition: "Price of B rises → demand for A falls (negative relationship)" },
          { term: "Unrelated Goods (XED ≈ 0)", definition: "No meaningful relationship between the goods" },
        ],
        explanation: "**Close substitutes** have high positive XED (Coke vs Pepsi ≈ +0.8)\n**Strong complements** have high negative XED (printers and ink ≈ −0.5)\n\n**Significance for firms:** Understanding XED helps with pricing strategy, product positioning, and anticipating competitive threats.\n\n**Significance for competition policy:** High positive XED between two firms' products indicates they are in the same market — relevant for CMA merger assessments. If XED is low, they may not be competing directly.",
        example: "When Uber cut prices, demand for traditional black cabs fell sharply — high positive XED confirms they are close substitutes. When razor prices fall, demand for razor blades rises — negative XED confirms they are complements.",
      },
      {
        title: "Price Elasticity of Supply (PES)",
        definition: "**PES** measures the responsiveness of quantity supplied to a change in price. It is always positive (law of supply).",
        formula: "PES = % change in Qs ÷ % change in P",
        keyTerms: [
          { term: "Elastic Supply (PES > 1)", definition: "Firms can increase output quickly in response to price rises" },
          { term: "Inelastic Supply (PES < 1)", definition: "Firms struggle to increase output quickly" },
        ],
        explanation: "**Determinants of PES:**\n- **Spare capacity:** More idle resources → more elastic\n- **Ease of storing stock:** Easy to stockpile → more elastic\n- **Time period:** Momentary supply is perfectly inelastic; long-run supply is more elastic\n- **Factor mobility:** Easier to switch resources → more elastic\n- **Availability of raw materials:** Abundant → more elastic\n- **Length of production process:** Short process → more elastic\n\n**Key markets:**\n- Agricultural supply: inelastic in short run (crops take months to grow)\n- Housing supply: inelastic (planning permission, construction time)\n- Manufacturing: more elastic (can increase shifts, use spare capacity)",
        examTip: "PES is often tested in the context of agricultural or housing markets. Always link to specific determinants relevant to the market being discussed.",
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
 *  YEAR 1 (AS) — PAPER 2: THE NATIONAL ECONOMY IN A GLOBAL CONTEXT
 *  Spec sections 4.2.1 – 4.2.6
 * ────────────────────────────────────────────────────────────── */

export const aqaYear1Paper2Topics: Topic[] = [
  {
    name: "4.2.1 The Measurement of Macroeconomic Performance",
    subtopics: [
      {
        title: "Economic Growth & GDP",
        definition: "**Economic growth** is an increase in real GDP over time. GDP measures the total value of goods and services produced in an economy in a given period.",
        keyTerms: [
          { term: "Real GDP", definition: "GDP adjusted for inflation — measures actual output changes" },
          { term: "Nominal GDP", definition: "GDP at current prices — not adjusted for inflation (can be misleading)" },
          { term: "GDP per Capita", definition: "GDP ÷ population — better indicator of living standards than total GDP" },
          { term: "Output Gap", definition: "The difference between actual GDP and potential GDP" },
        ],
        explanation: "**Positive output gap:** Actual GDP > potential → inflationary pressure, overheating\n**Negative output gap:** Actual GDP < potential → spare capacity, unemployment, room for growth\n\n**GDP as a measure of living standards — limitations:**\n- Ignores income distribution (inequality)\n- Doesn't capture non-market activity (housework, volunteering)\n- Ignores the informal/shadow economy\n- Quality of life factors excluded (leisure, environment, health)\n- Doesn't account for sustainability or resource depletion\n\n**Alternative measures:** HDI (Human Development Index), GNH (Gross National Happiness), Green GDP, Genuine Progress Indicator",
        diagram: "ppf_growth",
      },
      {
        title: "Inflation",
        definition: "**Inflation** is a sustained increase in the general price level, measured by the Consumer Price Index (CPI). The UK target is 2% (set by the government, achieved by the Bank of England).",
        keyTerms: [
          { term: "CPI", definition: "Consumer Price Index — measures the average price change of a basket of 700+ goods and services" },
          { term: "RPI", definition: "Retail Price Index — includes mortgage interest payments; tends to be higher than CPI" },
          { term: "CPIH", definition: "CPI including owner-occupiers' housing costs — now the ONS's preferred measure" },
          { term: "Demand-Pull Inflation", definition: "Caused by excessive aggregate demand — 'too much money chasing too few goods'" },
          { term: "Cost-Push Inflation", definition: "Caused by rising production costs shifting SRAS left" },
        ],
        explanation: "**How CPI is calculated:**\n1. ONS selects a 'basket' of 700+ goods (updated annually)\n2. Prices surveyed at 150+ locations across the UK\n3. Items weighted by their share of average household spending\n4. Price changes multiplied by weights to produce the overall index\n\n**CPI limitations:**\n- Doesn't reflect individual spending patterns (elderly vs students)\n- Slow to update the basket (misses new products)\n- Quality improvements not fully captured\n- Housing costs underrepresented in CPI (better in CPIH)\n- Substitution bias (consumers switch to cheaper alternatives)",
        diagram: "sras_decrease",
      },
      {
        title: "Employment & Unemployment",
        definition: "**Unemployment** is measured by the ILO Labour Force Survey (people without a job who have sought work in the last 4 weeks and are available to start).",
        keyTerms: [
          { term: "Labour Force Survey (ILO)", definition: "International standard: without work, seeking work in last 4 weeks, available to start within 2 weeks" },
          { term: "Claimant Count", definition: "Number claiming unemployment-related benefits — tends to be lower than LFS" },
          { term: "Economically Inactive", definition: "People not in employment and not seeking work (students, retirees, carers)" },
          { term: "Underemployment", definition: "Workers in jobs offering fewer hours or lower skills than they want/have" },
          { term: "Employment Rate", definition: "% of working-age population in employment" },
        ],
        explanation: "**Measurement issues:**\n- Claimant Count underestimates (excludes those not eligible for benefits)\n- LFS is survey-based (sample errors, self-reported)\n- Neither fully captures hidden unemployment or discouraged workers\n- Underemployment is increasingly significant but poorly measured\n\n**UK labour market trends:**\n- Record high employment pre-COVID, sharp spike during lockdowns, rapid recovery\n- Rise of gig economy and zero-hour contracts\n- Increasing economic inactivity post-COVID (long-term sickness)",
      },
      {
        title: "Balance of Payments",
        definition: "The **balance of payments** records all economic transactions between UK residents and the rest of the world over a period of time.",
        keyTerms: [
          { term: "Current Account", definition: "Trade in goods & services + primary income (investment returns) + secondary income (transfers)" },
          { term: "Financial Account", definition: "FDI, portfolio investment, and reserve assets" },
          { term: "Trade Balance", definition: "Exports of goods & services minus imports of goods & services" },
          { term: "Current Account Deficit", definition: "Total imports > total exports — money flowing out of the economy" },
        ],
        explanation: "**The BoP must always balance:** A current account deficit must be matched by a financial account surplus (capital inflows).\n\n**UK current account:** Persistent deficit, driven by large goods deficit (we import more manufactured goods). Partially offset by services surplus (financial services, education, creative industries).\n\n**Does a deficit matter?** Consider: size, duration, cause (investment-driven vs consumption-driven), how it's financed, and confidence of foreign investors.",
      },
    ],
  },
  {
    name: "4.2.2 How the Macroeconomy Works",
    subtopics: [
      {
        title: "The Circular Flow of Income",
        definition: "The circular flow model shows how income flows between households and firms. **Injections** add to the flow; **withdrawals** remove from it.",
        keyTerms: [
          { term: "Injection", definition: "Investment (I), Government Spending (G), Exports (X) — add to the circular flow" },
          { term: "Withdrawal/Leakage", definition: "Saving (S), Taxation (T), Imports (M) — remove from the circular flow" },
          { term: "National Income Equilibrium", definition: "When total injections = total withdrawals → stable GDP" },
        ],
        explanation: "**Two-sector model:** Households supply factors of production → firms → wages/rent/interest/profit → households → spending → firms\n\n**Four-sector model:** Adds government (T and G) and international trade (M and X)\n\n**Equilibrium:** When I + G + X = S + T + M\n- If injections > withdrawals → national income rises (expansion)\n- If withdrawals > injections → national income falls (contraction)\n\n**The multiplier** means that changes in injections/withdrawals have a magnified effect on national income.",
      },
      {
        title: "Aggregate Demand (AD)",
        definition: "**AD** is the total planned spending on goods and services at each price level in the economy over a given time period.",
        formula: "AD = C + I + G + (X − M)",
        keyTerms: [
          { term: "Consumption (C)", definition: "Household spending on goods & services — the largest component of AD (60%+)" },
          { term: "Investment (I)", definition: "Spending by firms on capital goods (machinery, equipment, buildings)" },
          { term: "Government Spending (G)", definition: "Public sector expenditure on goods, services, and public investment" },
          { term: "Net Exports (X − M)", definition: "Value of exports minus value of imports" },
        ],
        explanation: "**Why the AD curve slopes downward (3 effects):**\n1. **Wealth/Real Balance effect:** Higher prices → savings worth less in real terms → less spending\n2. **Interest rate effect:** Higher prices → central bank raises rates → less borrowing → less C and I\n3. **International trade effect:** Higher domestic prices → exports expensive → imports cheap → net exports fall\n\n**Shifts of AD:**\n- Tax cuts / lower interest rates / increased G → AD shifts RIGHT\n- Tax rises / higher interest rates / reduced G → AD shifts LEFT\n- Weaker exchange rate / rising confidence / increased wealth → AD shifts RIGHT",
        diagram: "ad_increase",
      },
      {
        title: "Consumption & Saving",
        definition: "**Consumption** is the largest component of AD. Saving is the proportion of income not spent. The two are inversely related: what isn't consumed is saved.",
        keyTerms: [
          { term: "MPC", definition: "Marginal Propensity to Consume — fraction of each extra £1 of income that is spent" },
          { term: "MPS", definition: "Marginal Propensity to Save — fraction of each extra £1 that is saved (MPC + MPS = 1 in a simple model)" },
          { term: "APC", definition: "Average Propensity to Consume — C ÷ Y (proportion of total income spent)" },
          { term: "Wealth Effect", definition: "Rising asset prices (houses, shares) make people feel richer → spend more" },
        ],
        explanation: "**Key determinants of consumption:**\n- Real disposable income (biggest factor — Keynesian consumption function)\n- Interest rates (lower → cheaper borrowing → more spending)\n- Consumer confidence and expectations\n- Wealth effects (house prices, share prices, pension values)\n- Availability and cost of credit\n- Distribution of income (lower earners have higher MPC)\n\n**The Keynesian consumption function:** C = a + bY where 'a' = autonomous consumption (spending even at zero income), 'b' = MPC",
        example: "During COVID-19, forced saving rose sharply (couldn't spend). Post-lockdown, the release of pent-up savings boosted consumption — a key driver of the 2021-22 recovery.",
      },
      {
        title: "Investment",
        definition: "**Investment (I)** is spending by firms on capital goods — the most volatile component of AD, highly sensitive to confidence and interest rates.",
        keyTerms: [
          { term: "Gross Investment", definition: "Total spending on new capital goods" },
          { term: "Net Investment", definition: "Gross investment minus depreciation of existing capital" },
          { term: "Accelerator Effect", definition: "Investment depends on the RATE OF CHANGE of GDP, not its level" },
        ],
        explanation: "**Determinants of investment:**\n- Interest rates (lower → cheaper to borrow → more investment)\n- Business confidence and animal spirits (Keynes)\n- Demand for goods and services (accelerator)\n- Corporation tax rate (lower → higher post-tax profits → more investment)\n- Government policy (tax incentives, subsidies, infrastructure spending)\n- Technological change (new tech creates investment opportunities)\n- Retained profits / cash flow (internal finance)\n\n**The accelerator:** When GDP growth ACCELERATES, investment rises rapidly. When growth merely SLOWS (not even falls), investment can collapse. This makes investment extremely volatile and amplifies the business cycle.",
      },
      {
        title: "Aggregate Supply (SRAS & LRAS)",
        definition: "**SRAS** shows total planned output at each price level in the short run. **LRAS** represents the economy's productive capacity — the maximum sustainable output.",
        keyTerms: [
          { term: "SRAS", definition: "Short-run aggregate supply — shifts with changes in costs of production" },
          { term: "LRAS", definition: "Long-run aggregate supply — determined by quantity and quality of factors of production" },
          { term: "Full Employment Output (Yfe)", definition: "The level of real output when all willing workers are employed" },
        ],
        explanation: "**SRAS shifts:**\n- LEFT (costs rise): Higher oil prices, wages, supply chain disruption, exchange rate depreciation, indirect taxes\n- RIGHT (costs fall): Lower commodity prices, improved productivity, subsidies, technological progress\n\n**Two views of LRAS:**\n\n**Classical LRAS:** Always vertical at Yfe. The economy self-corrects to full employment in the long run through flexible wages and prices.\n\n**Keynesian LRAS:** Three sections: (1) Horizontal at low output — spare capacity, can increase output without inflation. (2) Upward-sloping — approaching full capacity, bottlenecks cause inflation. (3) Vertical at Yfe — fully at capacity.\n\n**Policy implications:** Classical → supply-side policies are key. Keynesian → demand management is vital when there's spare capacity.",
        diagram: "sras_increase",
      },
      {
        title: "The Multiplier Effect",
        definition: "The **multiplier** shows how an initial change in spending leads to a larger final change in GDP, as the injection circulates through the economy.",
        formula: "k = 1 ÷ (1 − MPC) = 1 ÷ (MPS + MPT + MPM) = 1 ÷ MPW",
        keyTerms: [
          { term: "MPC", definition: "Marginal Propensity to Consume" },
          { term: "MPW", definition: "Marginal Propensity to Withdraw = MPS + MPT + MPM" },
          { term: "Injection", definition: "Addition to the circular flow (I, G, or X)" },
        ],
        explanation: "**How the multiplier works:**\nGovernment spends £1bn on infrastructure → construction workers earn wages → they spend (say) 80% at shops → shopkeepers earn income → they spend 80% → and so on.\n\nIf MPC = 0.8: k = 1 ÷ 0.2 = 5. So £1bn injection → £5bn final GDP increase.\n\n**Large multiplier when:** High MPC, low tax rates, low import propensity, lots of spare capacity\n**Small multiplier when:** High savings rate, high taxes, open economy with high imports, near full capacity\n\n**The negative multiplier:** Works in reverse — a fall in investment has a multiplied negative effect on GDP. This is why recessions can be self-reinforcing.\n\n**Real-world complications:** Time lags, crowding out, confidence effects, capacity constraints, different MPCs for different groups.",
        examTip: "Always evaluate fiscal policy by discussing the multiplier's size. In a globalised economy with high imports (like the UK), the multiplier is often small — reducing fiscal policy's effectiveness.",
      },
    ],
  },
  {
    name: "4.2.3 Macroeconomic Objectives & Policy",
    subtopics: [
      {
        title: "Macroeconomic Objectives",
        definition: "The UK government pursues several key macroeconomic objectives, which often conflict with each other.",
        explanation: "**The main objectives:**\n1. **Economic growth:** Sustained increase in real GDP (target: trend rate ≈ 2-2.5%)\n2. **Low & stable inflation:** CPI target = 2% (set by government, achieved by BoE)\n3. **Low unemployment:** High and stable employment\n4. **Balance of payments equilibrium:** Sustainable current account position\n\n**Secondary objectives:**\n- Balanced government budget (fiscal sustainability)\n- Environmental sustainability\n- Greater income equality\n- Balanced regional development\n\n**Key conflicts:**\n- Growth ↔ Inflation (demand-pull)\n- Growth ↔ Current account (imports rise with income)\n- Low unemployment ↔ Low inflation (Phillips Curve trade-off)\n- Growth ↔ Environment (pollution, resource depletion)\n- Equality ↔ Efficiency (redistribution may reduce incentives)",
      },
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** uses government spending (G) and taxation (T) to influence aggregate demand and achieve macroeconomic objectives.",
        keyTerms: [
          { term: "Expansionary Fiscal Policy", definition: "↑G / ↓T → ↑AD → higher output & employment" },
          { term: "Contractionary Fiscal Policy", definition: "↓G / ↑T → ↓AD → lower inflation" },
          { term: "Automatic Stabilisers", definition: "Tax receipts and benefit spending automatically dampen the economic cycle" },
          { term: "Discretionary Fiscal Policy", definition: "Deliberate policy changes (budget announcements, emergency measures)" },
          { term: "Budget Deficit", definition: "Government spending > tax revenue (borrows the difference)" },
          { term: "National Debt", definition: "Total accumulated stock of government borrowing" },
        ],
        formula: "k = 1 ÷ (1 − MPC)",
        explanation: "**How fiscal policy works:**\n- Government ↑ spending → direct injection into circular flow → multiplied increase in AD\n- Government ↓ taxes → households have more disposable income → ↑C → ↑AD\n\n**Automatic stabilisers:** In recession, tax receipts automatically fall (less income to tax) and benefit spending automatically rises (more unemployment) → supports AD WITHOUT deliberate policy action.\n\n**Limitations:**\n- Time lags (recognition → decision → implementation → impact: 12-18 months)\n- Crowding out (government borrowing ↑ interest rates → ↓ private investment)\n- Ricardian equivalence (consumers save tax cuts, expecting future tax rises)\n- Budget deficit concerns → may not be politically feasible\n- Size of multiplier (may be small in open economy)",
        diagram: "ad_increase",
        examTip: "For data response questions, always link fiscal policy to the specific data given. If data shows rising unemployment → argue for expansionary fiscal policy and evaluate effectiveness.",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** involves the Bank of England (BoE) setting interest rates and using quantitative easing (QE) to control inflation and influence AD.",
        keyTerms: [
          { term: "Bank Rate", definition: "The interest rate set by the MPC — the main monetary policy tool" },
          { term: "MPC", definition: "Monetary Policy Committee — 9 members who vote on interest rates monthly" },
          { term: "QE", definition: "Quantitative Easing — BoE buys government bonds with newly created money → increases money supply → lowers long-term rates" },
          { term: "Inflation Targeting", definition: "BoE targets 2% CPI inflation — must write an open letter to Chancellor if >3% or <1%" },
          { term: "Forward Guidance", definition: "BoE signals future rate path to manage expectations and reduce uncertainty" },
        ],
        explanation: "**The transmission mechanism (how rate changes affect the economy):**\n1. ↓ Rate → ↓ cost of borrowing → ↑ consumption (mortgages, loans) and investment\n2. ↓ Rate → ↓ return on saving → ↑ incentive to spend\n3. ↓ Rate → ↓ exchange rate → ↑ export competitiveness → ↑ net exports\n4. ↓ Rate → ↑ asset prices (houses, shares) → ↑ wealth effect → ↑ consumption\n\n**Limitations:**\n- Liquidity trap: when rates are near zero, further cuts have no effect\n- Asymmetric effects: rate changes affect borrowers more than savers\n- Time lags: takes 18-24 months for full effect\n- Depends on bank willingness to lend and consumer confidence to borrow\n- QE may cause asset price inflation → increases wealth inequality",
        diagram: "ad_increase",
      },
      {
        title: "Supply-Side Policies",
        definition: "**Supply-side policies** aim to increase the productive capacity of the economy (shift LRAS right) by improving the quantity and quality of factors of production.",
        keyTerms: [
          { term: "Market-Based SSPs", definition: "Deregulation, privatisation, tax reform, trade union reform, flexible labour markets" },
          { term: "Interventionist SSPs", definition: "Education & training, infrastructure, R&D subsidies, industrial strategy, regional policy" },
        ],
        explanation: "**Market-based policies:**\n- Income tax cuts → incentive to work and increase labour supply\n- Corporation tax cuts → incentive to invest → capital accumulation\n- Deregulation → removes barriers, promotes competition\n- Privatisation → profit motive drives efficiency and innovation\n- Trade union reform → flexible wages, less cost-push inflation\n\n**Interventionist policies:**\n- Education spending → human capital → productivity\n- Infrastructure (roads, rail, broadband) → reduces costs, increases efficiency\n- R&D subsidies → technological progress → innovation\n- Regional policy → reduce spatial inequality, develop neglected areas\n\n**Benefits:** Non-inflationary growth, improved competitiveness, lower NAIRU, sustainable\n**Limitations:** Very long time lags (5-10+ years), expensive, market-based may worsen inequality, interventionist may involve government failure",
        diagram: "sras_increase",
        examTip: "The best evaluation contrasts market-based vs interventionist approaches. Market-based → more efficient but may increase inequality. Interventionist → more equitable but risk of government failure.",
      },
    ],
  },
  {
    name: "4.2.4–4.2.6 The International Economy",
    subtopics: [
      {
        title: "Globalisation",
        definition: "**Globalisation** is the increasing integration and interdependence of the world's economies through trade, investment, migration, and technology.",
        keyTerms: [
          { term: "TNC (Transnational Corporation)", definition: "A firm that operates in more than one country (e.g., Apple, Unilever, Toyota)" },
          { term: "FDI (Foreign Direct Investment)", definition: "Investment by a firm in productive capacity in another country" },
          { term: "Deindustrialisation", definition: "Decline of manufacturing as a share of GDP and employment" },
        ],
        explanation: "**Causes of globalisation:**\n- Lower transport and communication costs\n- Reduced trade barriers (WTO, free trade agreements)\n- Internet and digital technology\n- Financial deregulation and capital mobility\n- Growth of TNCs and global supply chains\n\n**Benefits:** Lower prices, greater consumer choice, technology transfer, economic growth in developing countries, economies of scale, FDI creates jobs\n\n**Costs:** Structural unemployment in developed countries, environmental damage, exploitation of workers in developing countries, tax avoidance by TNCs, cultural homogenisation, increased inequality",
        example: "China's integration into the global economy since the 1980s lifted 800 million people out of poverty but contributed to deindustrialisation in Western economies and manufacturing job losses.",
      },
      {
        title: "Trade & Comparative Advantage",
        definition: "Countries benefit from trade by specialising in goods where they have the **lowest opportunity cost** — this is the principle of comparative advantage.",
        keyTerms: [
          { term: "Absolute Advantage", definition: "Producing more output with the same resources" },
          { term: "Comparative Advantage", definition: "Producing at a lower opportunity cost than another country" },
          { term: "Terms of Trade", definition: "Ratio of export prices to import prices (index, base year = 100)" },
        ],
        explanation: "**Ricardo's theory:** Even if one country is more productive at EVERYTHING (absolute advantage in all goods), both countries gain from trade if their opportunity costs differ (comparative advantage).\n\n**Conditions for mutual benefit:** The terms of trade must lie between the two countries' opportunity cost ratios.\n\n**Limitations of the theory:**\n- Assumes constant costs (no economies of scale)\n- Ignores transport costs, exchange rates, trade barriers\n- Assumes full employment and perfect factor mobility\n- Ignores quality differences and dynamic considerations\n- Doesn't account for infant industries or power imbalances\n- In practice, comparative advantage can be created (industrial policy)",
      },
      {
        title: "Exchange Rates",
        definition: "The **exchange rate** is the price of one currency in terms of another, determined by supply and demand in the foreign exchange market (under a floating system).",
        keyTerms: [
          { term: "Floating Exchange Rate", definition: "Determined freely by supply and demand in forex markets" },
          { term: "Fixed Exchange Rate", definition: "Pegged by the central bank at a set value" },
          { term: "Appreciation", definition: "Currency rises in value → exports dearer, imports cheaper" },
          { term: "Depreciation", definition: "Currency falls in value → exports cheaper, imports dearer" },
        ],
        explanation: "**Causes of appreciation:** Higher interest rates (attracting hot money), strong economic performance, high demand for exports, speculation\n\n**Causes of depreciation:** Lower interest rates, higher inflation than trading partners, poor economic outlook, political uncertainty\n\n**Impact of depreciation:**\n- Exports become cheaper → more competitive → ↑X\n- Imports become dearer → ↑import prices → cost-push inflation\n- Overall effect on current account depends on elasticities\n\n**Marshall-Lerner condition:** Depreciation improves the current account ONLY IF PED(X) + PED(M) > 1\n\n**J-Curve effect:** Short-run → current account worsens (contracts already agreed at old prices). Long-run → current account improves (volumes adjust to new prices).",
        examTip: "Always use Marshall-Lerner and J-Curve in evaluation. Discuss whether elasticity conditions are met and the time frame for adjustment.",
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
 *  YEAR 2 (A2) — PAPER 1: MARKETS & MARKET FAILURE (EXTENDED)
 *  Additional A2 content beyond AS
 * ────────────────────────────────────────────────────────────── */

export const aqaYear2Paper1Topics: Topic[] = [
  {
    name: "4.1.4 (A2) Individual Economic Decision Making",
    subtopics: [
      {
        title: "Behavioural Economics",
        definition: "**Behavioural economics** challenges the assumption that economic agents are always rational. It studies how psychological biases systematically affect decision-making.",
        keyTerms: [
          { term: "Bounded Rationality", definition: "People 'satisfice' (accept 'good enough') rather than optimise — limited cognitive ability and information processing" },
          { term: "Bounded Self-Control", definition: "People lack willpower to act in their long-term interest (e.g., smoking, overspending)" },
          { term: "Anchoring", definition: "Over-reliance on the first piece of information received (e.g., initial price quoted)" },
          { term: "Availability Bias", definition: "Judging probability based on how easily examples come to mind (e.g., overestimating plane crash risk)" },
          { term: "Default Bias (Status Quo Bias)", definition: "Tendency to stick with the default/pre-selected option rather than actively choosing" },
          { term: "Loss Aversion", definition: "Losses are felt roughly twice as strongly as equivalent gains — people are risk-averse for gains, risk-seeking for losses" },
          { term: "Herding", definition: "Copying others' behaviour rather than making independent, rational decisions" },
          { term: "Framing Effect", definition: "Decisions are affected by HOW information is presented, not just WHAT the information is" },
        ],
        explanation: "**Traditional economics assumes:** Rational, self-interested agents with stable preferences and perfect information processing.\n\n**Behavioural economics shows:** Systematic, predictable biases and heuristics lead to consistently 'irrational' decisions.\n\n**Key biases explained:**\n- **Anchoring:** A shirt marked '£80 → £40' feels like a bargain even if it's worth £30\n- **Loss aversion:** People are more upset losing £50 than they are happy gaining £50\n- **Default bias:** Auto-enrolment in pensions works because people don't opt out\n- **Herding:** Stock market bubbles — people buy because others are buying\n- **Framing:** '90% survival rate' sounds better than '10% mortality rate' — same data, different decision\n\n**Policy implication: NUDGE THEORY**\nSmall changes in 'choice architecture' that guide better decisions without restricting freedom of choice:\n- Auto-enrolment in workplace pensions (default bias)\n- Calorie labelling on restaurant menus (information provision)\n- Opt-out organ donation (UK adopted 2020)\n- Placing healthy food at eye level in canteens\n- Simplifying tax forms to improve compliance\n\n**Evaluation of nudges:**\n✅ Low cost, preserve freedom, behaviourally informed\n❌ Paternalistic? Do they address root causes? Long-term effectiveness unclear. May not work for all groups.",
        example: "UK pension auto-enrolment (2012) uses default bias — workers are automatically enrolled but can opt out. Participation rose from 55% to 88%, showing the power of defaults over active choice.",
        examTip: "AQA specifically tests behavioural economics. Know at least 4 biases, link each to a real-world example, and connect to policy solutions (nudges). Always evaluate: effective or paternalistic?",
      },
    ],
  },
  {
    name: "4.1.4 (A2) Market Structures — Extended",
    subtopics: [
      {
        title: "Monopolistic Competition",
        definition: "A market with many firms selling **differentiated** products, with **low barriers to entry**. Combines elements of competition and monopoly.",
        keyTerms: [
          { term: "Product Differentiation", definition: "Making products distinct through branding, quality, features, location, customer service" },
          { term: "Non-Price Competition", definition: "Competing through advertising, branding, quality, innovation, loyalty schemes — rather than cutting prices" },
          { term: "Excess Capacity", definition: "In long-run equilibrium, firms produce below minimum efficient scale — spare capacity exists" },
        ],
        explanation: "**Short run:** Supernormal profit is possible (like monopoly — downward-sloping demand due to differentiation)\n**Long run:** New firms are attracted by supernormal profit → enter → demand for existing firms shifts LEFT → profit eroded to NORMAL\n\n**Long-run outcome:**\n- P > MC → allocatively inefficient\n- Not at min AC → productively inefficient\n- Excess capacity (could produce more at lower cost)\n\n**But advantages exist:**\n- Product variety and consumer choice\n- Innovation driven by desire to differentiate\n- Dynamic efficiency through constant product improvement\n\n**Examples:** Coffee shops, restaurants, hairdressers, clothing brands, independent retailers",
        example: "High street coffee shops (Costa, Starbucks, Nero, independents) — many sellers, differentiated products (ambience, loyalty cards, food range), easy entry/exit. Supernormal profit attracts entry until only normal profit remains.",
      },
      {
        title: "Oligopoly",
        definition: "A market dominated by a **few large firms** with high concentration ratios. The defining feature is **interdependence** — each firm's decisions affect and are affected by rivals.",
        keyTerms: [
          { term: "Interdependence", definition: "Each firm must consider how rivals will react to its pricing and output decisions" },
          { term: "Collusion", definition: "Firms cooperate (formally or tacitly) to restrict output, fix prices, or share markets" },
          { term: "Overt Collusion / Cartel", definition: "Formal illegal agreement to fix prices or output (e.g., OPEC)" },
          { term: "Tacit Collusion", definition: "Informal understanding — firms follow a price leader without explicit agreement" },
          { term: "Game Theory", definition: "Analysis of strategic decision-making when outcomes depend on others' choices" },
          { term: "Prisoner's Dilemma", definition: "Each firm's dominant strategy is to undercut, even though cooperation would give a better joint outcome" },
          { term: "Kinked Demand Curve", definition: "Model explaining price rigidity: rivals match price cuts but not price rises" },
          { term: "Nash Equilibrium", definition: "Each firm is doing the best it can given what rivals are doing — no incentive to change unilaterally" },
        ],
        explanation: "**The Kinked Demand Curve (price rigidity):**\n- If a firm RAISES price → rivals don't follow → firm loses customers → demand is elastic above current price\n- If a firm CUTS price → rivals match → small gain in customers → demand is inelastic below current price\n- Result: KINK at current price → prices tend to be RIGID/STICKY\n- Firms compete through NON-PRICE methods instead\n\n**Game Theory & Prisoner's Dilemma:**\n- Two firms must choose: cooperate (high price) or undercut (low price)\n- Dominant strategy = undercut (regardless of what rival does)\n- But mutual undercutting → both worse off than if they'd cooperated\n- This explains why collusion is tempting but unstable\n\n**Collusion is more likely when:** Few firms, similar costs, homogeneous products, high barriers, stable demand, weak regulator\n**Collusion breaks down when:** Many firms, different costs, new entrants, economic downturn, strong regulator (CMA), cheating detected",
        example: "UK supermarkets (Tesco, Sainsbury's, Asda, Morrisons) — CR4 ≈ 67%. Interdependent pricing, extensive non-price competition through loyalty cards (Clubcard, Nectar), convenience formats, and own-brand ranges.",
        examTip: "For oligopoly essays, always discuss the tension between the incentive to cooperate (cartels) and the incentive to cheat (undercut). Use the Prisoner's Dilemma to illustrate.",
      },
      {
        title: "Price Discrimination",
        definition: "**Price discrimination** means charging different prices to different consumers for the SAME product (where the price difference is NOT due to cost differences).",
        keyTerms: [
          { term: "1st Degree (Perfect)", definition: "Each consumer charged their maximum willingness to pay — firm extracts ALL consumer surplus" },
          { term: "2nd Degree", definition: "Different prices for different quantities — bulk discounts, multi-buy offers" },
          { term: "3rd Degree", definition: "Different prices for different groups — student discounts, peak/off-peak, age-based pricing" },
        ],
        explanation: "**Three conditions needed:**\n1. **Market power** — firm must be a price maker (not a price taker)\n2. **Ability to segment the market** — identify and separate different consumer groups\n3. **Ability to prevent resale/arbitrage** — consumers can't buy cheap and resell at the higher price\n\n**3rd degree examples (most common):**\n- Train tickets: peak vs off-peak (time-based)\n- Cinema: adult vs student vs child (age-based)\n- Airlines: business class vs economy (willingness to pay)\n- Pharma: rich countries pay more than poor countries (geography-based)\n\n**Evaluation:**\n✅ Higher profits for firm → funds R&D (dynamic efficiency)\n✅ Some consumers pay LESS than they would under uniform pricing\n✅ Cross-subsidisation: profitable routes fund unprofitable ones (rural bus services)\n✅ May increase total output (firm supplies markets it otherwise wouldn't)\n\n❌ Some consumers pay MORE — reduced consumer surplus\n❌ Allocatively inefficient (P ≠ MC for some consumers)\n❌ Can be seen as unfair or exploitative",
        example: "Pharmaceutical companies charge high prices in the US and lower prices in developing countries — 3rd degree price discrimination based on willingness/ability to pay. This funds expensive R&D while allowing access in poorer countries.",
      },
      {
        title: "Monopsony",
        definition: "A **monopsony** is a market with a single (or dominant) buyer. In the labour market, this means one dominant employer that can suppress wages below the competitive level.",
        keyTerms: [
          { term: "Monopsony Power", definition: "The ability of a buyer to influence the price it pays — squeezing suppliers or workers" },
          { term: "Wage Setting", definition: "Monopsony employer pays below MRP — exploitation of workers" },
          { term: "MCL > ACL", definition: "To hire one more worker, the monopsonist must raise wages for ALL workers → MCL rises faster than ACL" },
        ],
        explanation: "**Labour market monopsony:**\n- One dominant employer → faces upward-sloping labour supply (ACL)\n- To hire more workers, must raise wages for ALL → MCL > ACL\n- Profit-maximising employment: MCL = MRP → hires fewer workers at lower wage vs competitive market\n\n**Key implication for NMW:**\n- In a competitive labour market: NMW above equilibrium → unemployment\n- In a monopsony: NMW can increase BOTH wages AND employment (up to the competitive level)\n- This resolves the apparent contradiction in empirical evidence (Card & Krueger studies)\n\n**Product market monopsony:** Large supermarkets squeezing farmer/supplier margins → may reduce quality or drive suppliers out of business (Amazon in books, Tesco with dairy farmers)",
        example: "The NHS is the dominant employer of nurses in the UK. As a monopsonist, it can set wages below the competitive level → contributes to chronic staff shortages and reliance on expensive agency nurses.",
      },
      {
        title: "Contestable Markets",
        definition: "A market is **contestable** when barriers to entry AND exit are low. The THREAT of new competition disciplines incumbent firms — even if they are monopolists.",
        keyTerms: [
          { term: "Hit-and-Run Entry", definition: "Firms enter to exploit supernormal profits, then exit quickly if prices fall (only possible with low sunk costs)" },
          { term: "Sunk Costs", definition: "Costs that cannot be recovered on exit — the KEY barrier to contestability" },
          { term: "Perfectly Contestable Market", definition: "Zero entry/exit barriers, zero sunk costs — even a monopolist earns only normal profit" },
        ],
        explanation: "**Key insight:** Market structure (number of firms) matters LESS than the degree of contestability. A monopoly can behave competitively if entry is easy.\n\n**What makes a market MORE contestable:**\n- Low barriers to entry and exit\n- Low sunk costs (equipment can be resold, leases can be terminated)\n- Access to same technology as incumbents\n- No legal barriers (patents, licences)\n\n**Result:** Even dominant firms keep prices close to AC to deter potential entrants.\n\n**Digital markets:** Often appear contestable (low startup costs, easy to launch an app) BUT network effects, data advantages, and switching costs can create hidden barriers (Facebook, Amazon, Google).",
        example: "Budget airlines made aviation more contestable — low sunk costs (aircraft leased, not bought), easy entry/exit. This forced BA and legacy carriers to launch budget subsidiaries and cut prices.",
      },
      {
        title: "Efficiency in Different Market Structures",
        definition: "Economists evaluate market outcomes using multiple efficiency concepts. The 'best' market structure depends on which type of efficiency is prioritised.",
        keyTerms: [
          { term: "Allocative Efficiency", definition: "P = MC — resources allocated according to consumer preferences" },
          { term: "Productive Efficiency", definition: "Production at minimum AC — no waste of resources, on the AC curve" },
          { term: "Dynamic Efficiency", definition: "Innovation and improvement over time — often requires supernormal profits to fund R&D" },
          { term: "X-Inefficiency", definition: "Operating above minimum cost due to lack of competitive pressure (organisational slack)" },
          { term: "Pareto Efficiency", definition: "No one can be made better off without making someone else worse off" },
        ],
        explanation: "**Efficiency comparison:**\n\n| | Allocative | Productive | Dynamic |\n|---|---|---|---|\n| Perfect Comp. | ✅ (P=MC, LR) | ✅ (min AC, LR) | ❌ (no profits for R&D) |\n| Monopolistic Comp. | ❌ (P>MC) | ❌ (excess capacity) | ✅ (product innovation) |\n| Oligopoly | ❌ (P>MC) | ❓ (depends) | ✅✅ (profits fund R&D) |\n| Monopoly | ❌ (P>MC) | ❌ (X-inefficiency) | ✅ (if profits used for R&D) |\n\n**The fundamental trade-off:** Static efficiency (allocative + productive) vs Dynamic efficiency (innovation over time).\n\nMonopoly profits may fund the R&D that drives long-run growth, innovation, and ultimately consumer benefit. Schumpeter argued monopoly is the BEST structure for innovation — 'creative destruction' is the engine of capitalism.",
        examTip: "ALWAYS discuss the static vs dynamic efficiency trade-off when comparing market structures. This is the highest-scoring evaluative point. Use real examples: Apple, pharma, tech companies.",
      },
    ],
  },
  {
    name: "4.1.7 (A2) The Labour Market",
    subtopics: [
      {
        title: "Labour Demand, Supply & Wage Determination",
        definition: "The labour market determines wages and employment. Demand for labour is **derived** from demand for the product it produces.",
        keyTerms: [
          { term: "MRP (Marginal Revenue Product)", definition: "The extra revenue from hiring one more worker: MRP = MPP × MR" },
          { term: "Derived Demand", definition: "Demand for labour depends on demand for the product" },
          { term: "Elasticity of Labour Demand", definition: "Responsiveness of labour demand to wage changes" },
          { term: "Transfer Earnings", definition: "Minimum payment to keep a factor in its current use (opportunity cost)" },
          { term: "Economic Rent", definition: "Payment above transfer earnings — reflects scarcity and unique talent" },
        ],
        formula: "MRP = MPP × MR",
        explanation: "**Wage determination in perfect competition:**\n- Firm hires where MRP = Wage (MC of labour)\n- Industry wage set by market supply and demand for labour\n- Individual firm is a wage taker\n\n**Determinants of labour demand (demand for labour = MRP curve):**\n- Productivity of workers (MPP)\n- Price of the product (MR)\n- Cost of capital (substitute for labour)\n- State of the economy (demand for final product)\n\n**Determinants of labour supply:**\n- Wage rate in this occupation\n- Wages in alternative occupations\n- Non-monetary benefits (job satisfaction, working conditions, status)\n- Barriers to entry (qualifications, training, professional bodies)\n- Net migration\n\n**Wage differentials explained by:** Skills, education, experience, compensating wage differentials (dangerous jobs), discrimination, trade union power, monopsony, barriers to occupational entry",
        example: "Premier League footballers earn millions because: huge MRP (each goal/assist generates massive broadcast and sponsorship revenue), extremely scarce talent, global derived demand. Transfer earnings might be £500/week (next best job) — the rest is economic rent.",
        examTip: "For labour market questions, always consider BOTH demand side (MRP) and supply side factors. Then evaluate: trade unions vs monopsony, NMW effects, and discrimination.",
      },
      {
        title: "Trade Unions & Wage Bargaining",
        definition: "A **trade union** bargains collectively on behalf of workers for higher wages and better conditions. Unions create a form of monopoly power in the labour market.",
        keyTerms: [
          { term: "Collective Bargaining", definition: "Union negotiates wages and conditions on behalf of all its members" },
          { term: "Bilateral Monopoly", definition: "A monopsony employer faces a monopoly union — wage is determined by bargaining power" },
        ],
        explanation: "**Union effects on wages and employment:**\n- Unions push wages above the competitive equilibrium\n- In competitive labour markets: higher wages → lower employment (standard D/S analysis)\n- Against a monopsony: unions can increase BOTH wages AND employment (moving towards competitive outcome)\n\n**Bilateral monopoly:** When a monopsony employer faces a monopoly union, the wage outcome depends on relative bargaining power — it's indeterminate from theory alone.\n\n**Evaluation of unions:**\n✅ Counterbalance monopsony power → fairer wages\n✅ Improve working conditions and safety\n✅ Reduce labour turnover → higher productivity\n❌ May cause real wage unemployment in competitive markets\n❌ Insider-outsider problem (protect members at expense of non-members/unemployed)\n❌ May resist technological change → lower productivity",
      },
      {
        title: "Discrimination in the Labour Market",
        definition: "Labour market discrimination occurs when workers with identical productivity receive different wages or employment opportunities based on characteristics unrelated to their ability.",
        keyTerms: [
          { term: "Gender Pay Gap", definition: "Difference between average male and female earnings (UK ≈ 14% in 2023)" },
          { term: "Occupational Segregation", definition: "Certain groups concentrated in particular (often lower-paid) occupations" },
          { term: "Statistical Discrimination", definition: "Using group averages to make individual employment decisions" },
        ],
        explanation: "**Causes of wage differentials that reflect discrimination:**\n- Employer prejudice (taste-based discrimination)\n- Statistical discrimination (using gender/ethnicity as a proxy for productivity)\n- Occupational segregation (women concentrated in lower-paid sectors)\n- Glass ceiling (barriers to promotion for women and minorities)\n- Monopsony power (exploiting less mobile workers)\n- Historical factors and institutional bias\n\n**Government responses:** Equal Pay Act 1970, Equality Act 2010, gender pay gap reporting (firms with 250+ employees), National Minimum Wage, education and training programmes\n\n**Evaluation:** Laws address overt discrimination but are less effective against structural/unconscious bias. Occupational segregation requires broader social and educational change.",
      },
    ],
  },
  {
    name: "4.1.8 (A2) Distribution of Income & Wealth",
    subtopics: [
      {
        title: "Income & Wealth Inequality",
        definition: "**Income** is a flow of money over time (wages, interest, profit, rent). **Wealth** is a stock of assets (property, savings, shares, pensions).",
        keyTerms: [
          { term: "Gini Coefficient", definition: "Measures inequality from 0 (perfect equality) to 1 (perfect inequality)" },
          { term: "Lorenz Curve", definition: "Graphical representation — further from the 45° line of equality = more unequal" },
          { term: "Absolute Poverty", definition: "Income below the level needed for basic necessities (food, shelter, clothing)" },
          { term: "Relative Poverty", definition: "Income below 60% of median household income — a measure of inequality within a society" },
        ],
        explanation: "**Causes of inequality:**\n- Wage differentials (skills, education, occupation, experience)\n- Wealth inheritance and intergenerational transfers\n- Tax system design (regressive taxes increase inequality)\n- Globalisation and technological change (skill-biased)\n- Regional differences (London vs rest of UK)\n- Discrimination (gender, ethnicity)\n- Housing wealth (property ownership gap)\n\n**Why inequality is a market failure:**\n- Low-income households have higher MPC → redistribution can boost AD\n- Inequality of OPPORTUNITY reduces social mobility and economic efficiency\n- Extreme inequality causes social instability, reduced trust, and poorer health outcomes\n- Rent-seeking behaviour by the wealthy distorts resource allocation\n\n**Government responses:**\n- Progressive income tax (higher earners pay higher %)\n- Means-tested benefits (UC, housing benefit, tax credits)\n- National Minimum Wage / Living Wage\n- Investment in education (equalise opportunity)\n- Inheritance tax (reduce wealth concentration)\n- Regional policy ('levelling up')",
        example: "UK Gini coefficient ≈ 0.35. The richest 10% own 45% of all wealth. During 2010-2020, the richest decile saw wealth grow significantly (rising house/share prices) while the bottom decile saw little change.",
        examTip: "Link inequality to economic efficiency, not just fairness. Argue that inequality reduces social mobility, wastes talent, and lowers overall productivity. This is a stronger economic argument than a purely normative one.",
      },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────
 *  YEAR 2 (A2) — PAPER 2: THE NATIONAL & INTERNATIONAL ECONOMY (EXTENDED)
 *  Additional A2 content beyond AS
 * ────────────────────────────────────────────────────────────── */

export const aqaYear2Paper2Topics: Topic[] = [
  {
    name: "4.2.3 (A2) Macroeconomic Policy — Extended",
    subtopics: [
      {
        title: "Conflicts Between Macroeconomic Objectives",
        definition: "Achieving one macroeconomic objective often worsens performance on another — the central challenge of economic policy-making.",
        explanation: "**Key conflicts:**\n\n1. **Growth vs Inflation:** Expansionary policy boosts GDP but risks demand-pull inflation\n2. **Growth vs Current Account:** Higher incomes → more imports → current account deterioration\n3. **Growth vs Environment:** More output → more pollution, resource depletion, carbon emissions\n4. **Low Unemployment vs Low Inflation:** Phillips Curve — stimulating jobs creates inflationary pressure\n5. **Equality vs Efficiency:** Progressive redistribution may reduce work/investment incentives\n6. **Short Run vs Long Run:** Austerity may harm short-run growth but improve long-run fiscal position\n\n**Resolving conflicts:**\n- Supply-side policies can achieve growth WITHOUT inflation (shift LRAS right)\n- Green growth strategies aim for growth AND environmental sustainability\n- The policy MIX matters: monetary for demand management + supply-side for capacity\n\n**Keynesian vs Classical/Monetarist debate:**\n- Keynesian: Government should actively manage AD (fiscal policy is powerful, multiplier is large)\n- Classical: Free markets self-correct; focus on supply-side and monetary stability\n- This debate underpins most policy evaluation questions at A2",
        examTip: "25-mark essays often ask you to evaluate policy choices. Always discuss at least TWO conflicts. Explicitly reference the Keynesian-Monetarist debate for top marks.",
      },
      {
        title: "The Phillips Curve",
        definition: "The **Phillips Curve** shows the observed inverse relationship between unemployment and inflation — originally an empirical finding (A.W. Phillips, 1958).",
        keyTerms: [
          { term: "Short-Run Phillips Curve", definition: "Downward-sloping — trade-off between unemployment and inflation" },
          { term: "Long-Run Phillips Curve", definition: "Vertical at the NAIRU — no permanent trade-off (Friedman/Phelps)" },
          { term: "NAIRU", definition: "Non-Accelerating Inflation Rate of Unemployment — the 'natural rate'" },
          { term: "Expectations-Augmented Phillips Curve", definition: "Incorporating inflation expectations — workers bargain for higher wages, shifting the SRPC upward" },
        ],
        explanation: "**Short-run trade-off:** Lower unemployment → tighter labour market → higher wages → higher inflation. Policy can 'buy' lower unemployment with higher inflation (temporarily).\n\n**Friedman's critique (Long Run):**\n1. Government stimulates AD → unemployment falls below NAIRU\n2. Inflation rises → workers demand higher wages (adjust expectations)\n3. Real wages unchanged → unemployment returns to NAIRU\n4. But now inflation expectations are HIGHER → SRPC has shifted UP\n5. Any attempt to stay below NAIRU requires ever-accelerating inflation\n\n**LRPC is vertical at NAIRU.** To reduce the NAIRU itself, supply-side policies are needed (education, training, labour market flexibility).\n\n**Breakdown in the 1970s:** Stagflation (high inflation + high unemployment) — the original Phillips Curve didn't hold. Explained by supply-side shocks (oil crisis) shifting SRAS left.",
        diagram: "phillips_curve",
      },
    ],
  },
  {
    name: "4.2.4 (A2) The Financial Sector",
    subtopics: [
      {
        title: "The Role of Financial Markets",
        definition: "Financial markets channel funds from savers to borrowers, facilitate risk management, and enable economic transactions. A well-functioning financial sector is essential for growth.",
        keyTerms: [
          { term: "Commercial Banks", definition: "Accept deposits, make loans, facilitate payments — profit-driven" },
          { term: "Central Bank (Bank of England)", definition: "Sets monetary policy, lender of last resort, regulates the financial system, issues currency" },
          { term: "Money Market", definition: "Short-term lending/borrowing (< 1 year) — e.g., Treasury bills, interbank lending" },
          { term: "Capital Market", definition: "Long-term finance — stock market (equities), bond market (debt)" },
          { term: "Foreign Exchange Market", definition: "Trading of currencies — determines exchange rates under floating system" },
        ],
        explanation: "**Functions of the financial sector:**\n1. **Financial intermediation:** Connecting savers and borrowers (channelling funds efficiently)\n2. **Maturity transformation:** Converting short-term deposits into long-term loans\n3. **Risk transformation:** Pooling and spreading risk across many borrowers/depositors\n4. **Payment systems:** Facilitating transactions in the economy\n5. **Price discovery:** Markets determine the price of financial assets (stocks, bonds, currencies)\n\n**Why it matters for the economy:**\n- Without financial intermediation, investment would collapse\n- Banks create money through the multiplier process (fractional reserve banking)\n- Financial stability is a prerequisite for sustained economic growth",
      },
      {
        title: "Market Failure in the Financial Sector",
        definition: "The financial sector is prone to significant market failures — information asymmetry, moral hazard, and systemic risk — which can cause devastating economic crises.",
        keyTerms: [
          { term: "Systemic Risk", definition: "Risk that failure of one institution triggers a chain reaction through the interconnected system" },
          { term: "Moral Hazard", definition: "'Too big to fail' — banks take excessive risks expecting government bailouts" },
          { term: "Credit Crunch", definition: "Banks stop lending to each other and to consumers/businesses → investment and spending collapse" },
          { term: "Securitisation", definition: "Bundling loans into tradable securities — spread risk but also spread toxic debt" },
          { term: "Leverage", definition: "Ratio of borrowed funds to own capital — high leverage amplifies both gains and losses" },
        ],
        explanation: "**The 2008 Financial Crisis — a case study:**\n\n**Causes:**\n1. Sub-prime mortgages (loans to borrowers who couldn't afford them)\n2. Securitisation spread risk through the global system\n3. Excessive leverage (banks borrowed 30-50x their capital)\n4. Moral hazard ('too big to fail' assumption)\n5. Inadequate regulation (self-regulation failed)\n6. Herding and irrational exuberance in housing market\n\n**Consequences:**\n- Bank bailouts (UK: £500bn in guarantees, RBS £45bn)\n- Credit crunch → severe recession (UK GDP fell 6%)\n- QE on unprecedented scale\n- Austerity policies (2010-2019)\n- Rising inequality and political populism\n\n**Regulatory response (post-2008):**\n- Basel III: Higher capital requirements (more reserves)\n- Stress testing (annual checks on bank resilience)\n- Ring-fencing (separating retail and investment banking)\n- Living wills (plans for orderly failure)\n- Macroprudential regulation (monitoring systemic risk)",
        example: "Northern Rock (2007) — first UK bank run in 150 years. Relied on wholesale funding, not deposits. When money markets froze, it couldn't fund itself. Government had to nationalise it. RBS received a £45bn bailout — the world's largest bank rescue.",
        examTip: "The 2008 crisis is the best example for financial market failure. Link moral hazard, asymmetric information, and systemic risk. Evaluate whether post-crisis regulation has been sufficient.",
      },
    ],
  },
  {
    name: "4.2.5–4.2.6 (A2) International Economics — Extended",
    subtopics: [
      {
        title: "Protectionism",
        definition: "**Protectionism** restricts imports to protect domestic industries using tariffs, quotas, subsidies, and non-tariff barriers.",
        keyTerms: [
          { term: "Tariff", definition: "Tax on imports — raises the domestic price, protects domestic firms, generates government revenue" },
          { term: "Quota", definition: "Physical limit on the quantity of imports allowed" },
          { term: "Subsidy to Domestic Firms", definition: "Lowers costs so domestic firms can compete with cheaper foreign imports" },
          { term: "Non-Tariff Barrier (NTB)", definition: "Regulations, standards, bureaucracy, or red tape that restrict trade" },
          { term: "Embargo", definition: "Complete ban on trade with a particular country" },
          { term: "Dumping", definition: "Selling exports below cost of production to gain market share (predatory pricing)" },
        ],
        explanation: "**Arguments FOR protectionism:**\n- Infant industry protection (nurture new industries until competitive)\n- National security (food, defence, energy independence)\n- Preventing dumping (unfair competition)\n- Protecting jobs in declining industries (short-term)\n- Correcting BoP deficits\n- Environmental and labour standards (prevent 'race to the bottom')\n\n**Arguments AGAINST:**\n- Higher consumer prices → reduced consumer surplus\n- Inefficiency (protected firms have no incentive to improve)\n- Retaliation and trade wars (tit-for-tat tariffs)\n- Reduced consumer choice\n- Violates WTO rules\n- Infant industries may never 'grow up' (become permanently dependent)\n- Rent-seeking behaviour (lobbying for protection)",
        examTip: "Always evaluate protectionism by discussing: (1) consumer impact, (2) retaliation risk, (3) whether infant industries ever 'grow up', (4) alternatives like supply-side policies to boost competitiveness.",
      },
      {
        title: "Trading Blocs & the EU",
        definition: "**Trading blocs** are agreements between countries to reduce trade barriers. They exist on a spectrum from free trade areas to full economic and political union.",
        keyTerms: [
          { term: "Free Trade Area (FTA)", definition: "No internal tariffs between members; each sets own external tariffs (e.g., USMCA)" },
          { term: "Customs Union", definition: "No internal tariffs + common external tariff (e.g., EU customs union)" },
          { term: "Single/Common Market", definition: "Customs union + free movement of goods, services, capital, and labour (e.g., EU Single Market)" },
          { term: "Monetary Union", definition: "Single market + common currency (e.g., Eurozone with the Euro)" },
          { term: "Trade Creation", definition: "Members buy from more efficient partner instead of less efficient domestic producer → welfare gain" },
          { term: "Trade Diversion", definition: "Members buy from less efficient partner instead of cheaper non-member → welfare loss" },
        ],
        explanation: "**Benefits of trading blocs:** Larger market → economies of scale, FDI attraction, political stability, increased choice, specialisation benefits, stronger negotiating position\n\n**Costs:** Loss of sovereignty, trade diversion, adjustment costs, uneven benefits between members, regulatory burden\n\n**Brexit analysis:**\n- UK left the EU Single Market and Customs Union (Jan 2021)\n- New trade barriers with EU (UK's largest trading partner)\n- Gained sovereignty over trade deals, immigration, regulation\n- Short-term: trade disruption, increased costs for businesses\n- New trade deals signed: Australia, NZ, Japan, CPTPP\n- Ongoing debate about long-term economic impact",
      },
      {
        title: "Exchange Rate Systems & Policy",
        definition: "Countries choose how to manage their exchange rates — from fully floating (market-determined) to fixed (pegged by the central bank).",
        keyTerms: [
          { term: "Floating Exchange Rate", definition: "Value determined by supply and demand in forex markets — UK system since 1992" },
          { term: "Fixed Exchange Rate", definition: "Central bank commits to buying/selling currency to maintain a target rate" },
          { term: "Managed Float", definition: "Primarily market-determined with occasional central bank intervention to prevent excessive volatility" },
          { term: "Marshall-Lerner Condition", definition: "Depreciation improves current account IF sum of PED for exports + PED for imports > 1" },
          { term: "J-Curve Effect", definition: "Short-run deterioration then long-run improvement in current account following depreciation" },
        ],
        explanation: "**Floating rate advantages:** Automatic adjustment to economic shocks, independent monetary policy, no need for foreign exchange reserves, market-determined (efficient)\n\n**Floating rate disadvantages:** Volatility and uncertainty, speculation, may not correct BoP disequilibria if J-Curve is strong, imported inflation from depreciation\n\n**Fixed rate advantages:** Certainty for trade and investment, anti-inflationary discipline, prevents competitive devaluations\n\n**Fixed rate disadvantages:** Requires large foreign exchange reserves, loss of independent monetary policy, may be set at wrong level, vulnerable to speculative attacks (e.g., ERM crisis 1992)\n\n**Evaluation:** Most major economies now use floating rates. The UK's experience with the ERM (joined 1990, crashed out 1992) demonstrated the difficulties of maintaining a fixed rate without independent monetary policy.",
        examTip: "Use Marshall-Lerner and J-Curve in EVERY exchange rate evaluation question. Always discuss whether elasticity conditions are met and the time frame for adjustment.",
      },
      {
        title: "Economic Growth & Development",
        definition: "**Economic growth** (rising GDP) is necessary but not sufficient for **development** (broader improvement in living standards, health, education, and human capabilities).",
        keyTerms: [
          { term: "Economic Development", definition: "Improvement in economic well-being AND quality of life (broader than just GDP growth)" },
          { term: "HDI (Human Development Index)", definition: "Composite measure: life expectancy, education (mean/expected years of schooling), GNI per capita" },
          { term: "Sustainable Development", definition: "Meeting present needs without compromising future generations' ability to meet theirs" },
        ],
        explanation: "**Why growth ≠ development:**\n- GDP growth may not be evenly distributed (inequality)\n- Environmental degradation may worsen quality of life\n- Growth may come from unsustainable resource extraction\n- Informal economy activity isn't captured in GDP\n- Non-economic factors matter: political freedom, security, social cohesion\n\n**Barriers to development in LDCs:**\n- Corruption and poor governance\n- Inadequate infrastructure\n- Low human capital (poor education and health systems)\n- Primary product dependency (volatile commodity prices)\n- Debt burden\n- Conflict and political instability\n- Climate change vulnerability\n\n**Strategies for development:** Trade liberalisation, FDI, aid (tied vs untied), microfinance, institutional reform, education investment, infrastructure development",
      },
    ],
  },
];

/* ── Legacy exports for backward compatibility ── */
export const aqaPaper1Topics: Topic[] = [...aqaYear1Paper1Topics, ...aqaYear2Paper1Topics];
export const aqaPaper2Topics: Topic[] = [...aqaYear1Paper2Topics, ...aqaYear2Paper2Topics];
