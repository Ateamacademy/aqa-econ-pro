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
        diagram: "perfect_competition" as any,
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

/* ═══════════════════════════════════════════════════════════════
 *  TEXTBOOK CHAPTER STRUCTURE
 *  Based on Powell & Powell AQA A-Level Economics (Hodder Education)
 *  Book 1 = Year 1 (AS), Book 2 = Year 2 (A2)
 * ═══════════════════════════════════════════════════════════════ */

/* ── NEW subtopics for content gaps ── */

const elasticitySubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Price Elasticity of Demand (PED)",
    definition: "**PED** measures the responsiveness of quantity demanded to a change in price. It is always negative (inverse relationship) but we use the absolute value.",
    keyTerms: [
      { term: "PED", definition: "% change in Qd ÷ % change in P" },
      { term: "Elastic Demand", definition: "PED > 1 — quantity demanded is highly responsive to price changes" },
      { term: "Inelastic Demand", definition: "PED < 1 — quantity demanded is relatively unresponsive to price changes" },
      { term: "Unit Elastic", definition: "PED = 1 — % change in Qd exactly equals % change in P" },
      { term: "Perfectly Elastic", definition: "PED = ∞ — any price rise causes demand to fall to zero (horizontal demand curve)" },
      { term: "Perfectly Inelastic", definition: "PED = 0 — demand is completely unresponsive to price (vertical demand curve)" },
    ],
    formula: "PED = % change in Qd ÷ % change in P",
    explanation: "**Determinants of PED:**\n- **Substitutes:** More substitutes → more elastic (consumers can switch)\n- **Necessity vs luxury:** Necessities → inelastic; luxuries → elastic\n- **Proportion of income:** Higher proportion → more elastic\n- **Time period:** Longer time → more elastic (consumers find alternatives)\n- **Habit/addiction:** Addictive goods → more inelastic\n- **Brand loyalty:** Strong loyalty → more inelastic\n\n**PED and Total Revenue:**\n- Elastic demand: price ↓ → TR ↑ (volume effect outweighs price effect)\n- Inelastic demand: price ↑ → TR ↑ (price effect outweighs volume effect)\n- Unit elastic: TR unchanged when price changes\n\n**PED and tax incidence:** If demand is inelastic, consumers bear more of the tax burden. If elastic, producers bear more.",
    examTip: "Always link PED to revenue. The key insight: firms with inelastic demand should raise prices to increase revenue; firms with elastic demand should lower prices.",
    diagram: "ped_elastic",
  },
  {
    title: "Income Elasticity of Demand (YED)",
    definition: "**YED** measures the responsiveness of demand to a change in income. The SIGN matters: positive = normal good, negative = inferior good.",
    keyTerms: [
      { term: "YED", definition: "% change in Qd ÷ % change in Y (income)" },
      { term: "Normal Good", definition: "YED > 0 — demand rises as income rises" },
      { term: "Luxury Good", definition: "YED > 1 — demand rises more than proportionately as income rises" },
      { term: "Necessity", definition: "0 < YED < 1 — demand rises less than proportionately as income rises" },
      { term: "Inferior Good", definition: "YED < 0 — demand falls as income rises (consumers switch to better alternatives)" },
    ],
    formula: "YED = % change in Qd ÷ % change in Y",
    explanation: "**Why YED matters:**\n- Firms use YED to predict how demand will change during economic growth or recession\n- Luxury goods firms benefit most during booms but suffer most during recessions\n- Inferior goods firms are counter-cyclical — demand rises during recessions\n- Supermarkets stock both luxury and inferior ranges to hedge against the economic cycle\n\n**Examples:**\n- Luxury: designer clothes (YED ≈ +2.5), fine dining, foreign holidays\n- Necessity: basic food (YED ≈ +0.2), utilities, toothpaste\n- Inferior: budget supermarket brands (YED ≈ −0.3), public transport, instant noodles",
    example: "During the 2008-09 recession, demand for Aldi and Lidl (inferior goods) surged, while demand for premium brands like Waitrose fell. As the economy recovered, the trend reversed. This demonstrates YED in action.",
  },
  {
    title: "Cross Elasticity of Demand (XED)",
    definition: "**XED** measures the responsiveness of demand for good A to a change in the price of good B. The SIGN indicates the relationship between the goods.",
    keyTerms: [
      { term: "XED", definition: "% change in Qd of A ÷ % change in P of B" },
      { term: "Substitutes", definition: "XED > 0 — price of B rises → demand for A rises (switch to A)" },
      { term: "Complements", definition: "XED < 0 — price of B rises → demand for A falls (used together)" },
      { term: "Unrelated Goods", definition: "XED ≈ 0 — no relationship between the goods" },
    ],
    formula: "XED = % change in Qd of A ÷ % change in P of B",
    explanation: "**Why XED matters:**\n- Close substitutes: high positive XED (e.g., Coca-Cola & Pepsi ≈ +0.8)\n- Strong complements: high negative XED (e.g., printers & ink cartridges ≈ −0.6)\n- Firms use XED to predict how competitors' pricing affects their sales\n- Competition authorities use XED to define markets (high XED = same market)\n\n**Strategic implications:**\n- If XED is high → your product is easily substituted → focus on differentiation\n- If XED is negative → complementary goods → bundle pricing strategies\n- Firms monitor competitors' prices closely when XED is high",
    examTip: "Remember: positive XED = substitutes, negative XED = complements. The MAGNITUDE shows how closely related the goods are. XED close to 0 = unrelated.",
  },
  {
    title: "Price Elasticity of Supply (PES)",
    definition: "**PES** measures the responsiveness of quantity supplied to a change in price. It is always positive (positive relationship between price and supply).",
    keyTerms: [
      { term: "PES", definition: "% change in Qs ÷ % change in P" },
      { term: "Elastic Supply", definition: "PES > 1 — quantity supplied is highly responsive to price changes" },
      { term: "Inelastic Supply", definition: "PES < 1 — quantity supplied is relatively unresponsive to price changes" },
    ],
    formula: "PES = % change in Qs ÷ % change in P",
    explanation: "**Determinants of PES:**\n- **Spare capacity:** More spare capacity → more elastic (can increase output quickly)\n- **Stocks/inventories:** Large stocks → more elastic (can release stock immediately)\n- **Time period:** Longer time → more elastic (firms can invest in new capacity)\n- **Factor mobility:** Easy to switch resources → more elastic\n- **Nature of the product:** Manufacturing → more elastic; agriculture/mining → more inelastic (growing seasons, extraction limits)\n\n**PES and tax incidence:**\n- Inelastic supply + elastic demand → producers bear most of the tax burden\n- Elastic supply + inelastic demand → consumers bear most of the tax burden\n\n**Primary commodities** tend to have inelastic supply (take time to grow crops, extract minerals), making prices volatile.",
    examTip: "PES is crucial for understanding tax incidence and price volatility. Agricultural goods have inelastic supply in the short run → small demand changes cause large price swings.",
  },
];

const economicPerformanceSubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Economic Growth & the Economic Cycle",
    definition: "**Economic growth** is an increase in the productive potential of the economy, measured by real GDP. The **economic cycle** describes fluctuations in GDP around the long-run trend.",
    keyTerms: [
      { term: "Short-Run Growth", definition: "Increase in actual GDP — moving towards the PPF (using spare capacity)" },
      { term: "Long-Run Growth", definition: "Increase in potential GDP — outward shift of the PPF (more/better resources)" },
      { term: "Trend Rate of Growth", definition: "The long-run average growth rate of potential GDP (UK ≈ 2-2.5%)" },
      { term: "Output Gap", definition: "Difference between actual and potential GDP" },
      { term: "Positive Output Gap", definition: "Actual GDP > potential GDP → inflationary pressure" },
      { term: "Negative Output Gap", definition: "Actual GDP < potential GDP → spare capacity, unemployment" },
    ],
    explanation: "**Phases of the economic cycle:**\n1. **Boom:** High growth, low unemployment, rising inflation, positive output gap\n2. **Slowdown:** Growth decelerating, confidence falling\n3. **Recession:** Two consecutive quarters of negative GDP growth, rising unemployment\n4. **Recovery:** GDP growing again, unemployment falling, confidence returning\n\n**Causes of economic cycles:**\n- Changes in consumer/business confidence (animal spirits)\n- External shocks (oil price, financial crisis, pandemic)\n- Policy changes (interest rate cuts/rises, fiscal stimulus)\n- Credit cycles (excessive lending → boom → bust)\n- Asset price bubbles (housing, stock market)\n\n**Costs of growth:** Environmental damage, inequality may worsen, inflation risk, resource depletion\n**Benefits of growth:** Higher living standards, lower unemployment, higher tax revenues, poverty reduction",
    diagram: "ppf_growth",
    examTip: "Distinguish clearly between short-run growth (AD shift, closing negative output gap) and long-run growth (LRAS shift, expanding productive capacity). Use PPF and AD/AS diagrams.",
  },
  {
    title: "Employment & Unemployment",
    definition: "**Unemployment** occurs when people who are willing and able to work at the going wage rate cannot find a job. It is both an economic waste and a social problem.",
    keyTerms: [
      { term: "Claimant Count", definition: "Number of people claiming unemployment-related benefits (JSA/UC)" },
      { term: "Labour Force Survey (LFS)", definition: "ILO measure: people available and actively seeking work in the last 4 weeks" },
      { term: "Cyclical Unemployment", definition: "Demand-deficient — caused by a fall in AD during recessions" },
      { term: "Structural Unemployment", definition: "Mismatch between workers' skills and available jobs (occupational/geographical immobility)" },
      { term: "Frictional Unemployment", definition: "Short-term — workers between jobs, searching for the right match" },
      { term: "Seasonal Unemployment", definition: "Regular fluctuations in employment due to seasonal patterns" },
      { term: "Real Wage Unemployment", definition: "Wages held above equilibrium (e.g., by unions or NMW) → labour supply > demand" },
      { term: "Natural Rate of Unemployment", definition: "The rate at which the labour market is in equilibrium — frictional + structural" },
    ],
    explanation: "**Consequences of unemployment:**\n- Lost output (inside the PPF)\n- Fiscal costs (lower tax revenue + higher benefit spending)\n- Hysteresis (long-term unemployed lose skills)\n- Social costs (poverty, crime, mental health, inequality)\n\n**Policies to reduce unemployment:**\n- Cyclical: expansionary fiscal/monetary policy (↑AD)\n- Structural: education & training, relocation subsidies, information provision\n- Real wage: reform NMW, reduce union power (controversial)\n- Frictional: improve job matching (job centres, online platforms)\n\n**Key debate:** Is unemployment primarily a demand-side or supply-side problem?\n- Keynesian: demand-deficient → boost AD\n- Classical: supply-side → improve labour market flexibility",
  },
  {
    title: "Inflation & Deflation",
    definition: "**Inflation** is a sustained increase in the general price level. **Deflation** is a sustained decrease. **Disinflation** is a falling rate of inflation.",
    keyTerms: [
      { term: "CPI", definition: "Consumer Prices Index — weighted basket of goods, UK's main inflation measure (target: 2%)" },
      { term: "RPI", definition: "Retail Prices Index — includes housing costs like mortgage interest payments" },
      { term: "Demand-Pull Inflation", definition: "Inflation caused by excessive AD (too much money chasing too few goods)" },
      { term: "Cost-Push Inflation", definition: "Inflation caused by rising costs of production (energy, wages, raw materials)" },
      { term: "Quantity Theory of Money", definition: "MV = PQ — if V and Q are constant, increasing M causes proportional increase in P" },
    ],
    formula: "MV = PQ (Fisher's Equation of Exchange)",
    explanation: "**Causes of inflation:**\n- **Demand-pull:** Excessive AD growth → economy overheats → prices rise. Caused by: tax cuts, low rates, credit expansion, rising confidence\n- **Cost-push:** Rising input costs → firms pass on to consumers. Caused by: oil price shocks, wage increases, currency depreciation, supply chain disruption\n- **Monetary:** Excessive money supply growth (quantity theory)\n\n**Consequences of inflation:**\n- Erosion of purchasing power (especially harmful for those on fixed incomes)\n- Uncertainty reduces investment and planning\n- International competitiveness falls (exports become expensive)\n- Menu costs, shoe-leather costs\n- Redistribution from savers to borrowers\n\n**Deflation risks:**\n- Consumers delay purchases (expect lower prices)\n- Rising real value of debt → defaults\n- Deflationary spiral (falling demand → lower prices → lower profits → job cuts → lower demand)\n- Monetary policy becomes ineffective (zero lower bound)",
    examTip: "Always distinguish demand-pull from cost-push inflation — the policy response differs. Demand-pull → raise rates. Cost-push → dilemma (raising rates worsens the supply shock).",
  },
  {
    title: "The Balance of Payments",
    definition: "The **balance of payments** records all financial transactions between UK residents and the rest of the world over a period of time.",
    keyTerms: [
      { term: "Current Account", definition: "Trade in goods, trade in services, primary income (investment returns), secondary income (transfers)" },
      { term: "Trade Deficit", definition: "Imports of goods and services exceed exports — UK has had a persistent trade deficit" },
      { term: "Financial Account", definition: "Records investment flows — FDI, portfolio investment, bank deposits" },
      { term: "Capital Account", definition: "Records transfers of capital assets (relatively small)" },
    ],
    explanation: "**The UK current account deficit:**\n- UK has run a persistent current account deficit (≈3-5% of GDP)\n- Driven by: trade deficit in goods (UK imports more manufactured goods than it exports)\n- Partly offset by: trade surplus in services (financial services, education, creative industries)\n\n**Causes of current account deficits:**\n- High domestic demand for imports (strong consumer spending)\n- Lack of international competitiveness (high costs, low productivity)\n- Strong exchange rate (makes exports expensive, imports cheap)\n- Structural decline of manufacturing\n\n**Does a deficit matter?**\n- Must be financed by capital/financial inflows (foreign investment)\n- If financed by FDI → generally sustainable and beneficial\n- If financed by debt → potentially unsustainable\n- UK benefits from being a major financial centre attracting investment",
    examTip: "Evaluate whether a current account deficit matters by discussing HOW it is financed and whether it is sustainable. FDI-financed deficits are less concerning than debt-financed ones.",
  },
];

const technologicalChangeSubtopic: import("./edexcelANotes").Subtopic = {
  title: "Technological Change",
  definition: "**Technological change** includes both invention (creating new ideas) and innovation (bringing ideas to market). It is a key driver of long-run growth and creative destruction.",
  keyTerms: [
    { term: "Invention", definition: "The creation of a new product, process, or idea" },
    { term: "Innovation", definition: "The successful commercial application of an invention" },
    { term: "Creative Destruction", definition: "New technologies and firms destroy existing ones — Schumpeter's view of capitalism" },
    { term: "Process Innovation", definition: "New methods of production → lower costs → higher productivity" },
    { term: "Product Innovation", definition: "Development of new or improved goods and services" },
  ],
  explanation: "**Effects of technological change:**\n- Lower costs of production → SRAS shifts right\n- New products and markets → economic growth\n- Increased productivity → LRAS shifts right\n- Creative destruction → structural unemployment in some sectors\n- May create natural monopolies (network effects in tech)\n- Can reduce barriers to entry (digital platforms) or increase them (patents, R&D costs)\n\n**Impact on market structure:**\n- Tech can increase competition (e.g., internet shopping, price comparison websites)\n- Tech can increase monopoly power (e.g., network effects, data advantages — Google, Amazon)\n- Disruption: Netflix vs Blockbuster, Uber vs taxis, Amazon vs high street\n\n**Policy implications:** Governments support innovation through R&D subsidies, patent protection, education investment, and digital infrastructure. But must balance innovation incentives (patents) with competition (avoiding permanent monopolies).",
  example: "The smartphone revolution (iPhone, 2007) is a classic example of creative destruction. It destroyed the market for standalone cameras, MP3 players, GPS devices, and feature phones, while creating entirely new markets (app economy, mobile payments, ride-hailing).",
};

const utilityTheorySubtopic: import("./edexcelANotes").Subtopic = {
  title: "Consumer Behaviour & Utility Theory",
  definition: "**Utility** is the satisfaction a consumer gains from consuming a good or service. Rational consumers aim to maximise their total utility given their budget constraint.",
  keyTerms: [
    { term: "Total Utility", definition: "The overall satisfaction from consuming a given quantity of a good" },
    { term: "Marginal Utility", definition: "The extra satisfaction from consuming one more unit of a good" },
    { term: "Diminishing Marginal Utility", definition: "Each additional unit consumed provides less extra satisfaction than the previous one" },
    { term: "Rational Consumer", definition: "A consumer who aims to maximise utility given their income and prices" },
  ],
  explanation: "**The hypothesis of diminishing marginal utility:**\n- First slice of pizza → very high MU\n- Second slice → still enjoyable but less MU\n- Third slice → even less MU\n- Fourth slice → MU may approach zero or become negative\n\n**Why this supports a downward-sloping demand curve:**\n- Consumers are only willing to pay a price equal to the marginal utility of the last unit\n- As they consume more, MU falls → willingness to pay falls\n- Therefore: lower price → more quantity demanded\n\n**Utility maximisation:** A rational consumer allocates spending so that the MU per £ is equal across all goods. If MU per £ is higher for good A than good B, buy more A and less B until equalised.",
  examTip: "You don't need to know equi-marginal utility for AQA, but you DO need to understand how diminishing MU supports the law of demand. Link MU directly to willingness to pay.",
};

const imperfectInfoSubtopic: import("./edexcelANotes").Subtopic = {
  title: "Imperfect & Asymmetric Information",
  definition: "**Imperfect information** means economic agents lack complete knowledge. **Asymmetric information** means one party in a transaction has more information than the other.",
  keyTerms: [
    { term: "Asymmetric Information", definition: "Unequal information between buyer and seller — leads to market failure" },
    { term: "Moral Hazard", definition: "One party changes behaviour after a transaction because the other can't monitor them (e.g., insured driver takes more risks)" },
    { term: "Adverse Selection", definition: "Those most likely to make claims are most likely to buy insurance — drives up premiums" },
  ],
  explanation: "**How information failure causes market failure:**\n- Consumers may overconsume harmful goods (smoking — underestimate health risks)\n- Consumers may underconsume beneficial goods (exercise, pensions — underestimate long-term benefits)\n- Markets may produce 'lemons' (Akerlof) — sellers know quality, buyers don't → good products driven out\n\n**Examples:**\n- Second-hand car market (seller knows the car's history, buyer doesn't)\n- Insurance markets (buyers know their risk level, insurers don't)\n- Financial products (complex derivatives, mis-selling of PPI)\n- Healthcare (doctor knows more than patient → supplier-induced demand)\n\n**Solutions:** Regulation, mandatory disclosure, guarantees, professional standards, consumer protection laws, education/information campaigns",
};

const revisitingMarketFailureSubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Environmental Market Failures & Property Rights",
    definition: "Environmental problems are a major source of market failure, arising from missing markets, absent property rights, and the tragedy of the commons.",
    keyTerms: [
      { term: "Tragedy of the Commons", definition: "Shared resources (common goods) are overused because no individual bears the full cost" },
      { term: "Property Rights", definition: "Legal ownership — if property rights are well-defined, externalities can be resolved through negotiation (Coase Theorem)" },
      { term: "Carbon Trading", definition: "Tradable pollution permits create a market for the right to pollute — cap-and-trade" },
    ],
    explanation: "**Why the environment is a market failure:**\n- No property rights over the atmosphere, oceans, or biodiversity\n- Pollution is a negative externality — costs imposed on third parties\n- Future generations cannot participate in today's markets\n- Climate change is a global public 'bad' — non-excludable, non-rival damage\n\n**Solutions:**\n1. **Carbon taxes** (Pigouvian tax) — internalise the externality\n2. **Tradable permits** (cap-and-trade) — set a quantity limit and let the market find the cheapest way to reduce pollution\n3. **Regulation** — emission standards, bans on specific substances\n4. **Property rights** — Coase Theorem: if property rights are defined and transaction costs are low, private bargaining can solve externalities\n5. **International agreements** (Paris Agreement, COP conferences)\n\n**Evaluation:** Carbon taxes are efficient but regressive. Permits allow quantity certainty but are complex. Regulation is direct but may be inflexible. No single solution is sufficient for climate change.",
    examTip: "Always evaluate environmental policies using: efficiency (does it minimise costs?), effectiveness (does it reduce pollution?), equity (who bears the burden?), and enforcement (can it be policed?).",
  },
  {
    title: "Competition Policy",
    definition: "**Competition policy** aims to promote competition, prevent abuse of market power, and protect consumer interests. In the UK, the CMA is the key regulator.",
    keyTerms: [
      { term: "CMA", definition: "Competition and Markets Authority — investigates mergers, cartels, and anti-competitive behaviour" },
      { term: "Restrictive Practices", definition: "Price-fixing, market sharing, bid-rigging — illegal under Competition Act 1998" },
      { term: "Merger Policy", definition: "CMA can block mergers that substantially lessen competition" },
    ],
    explanation: "**Tools of competition policy:**\n1. **Merger regulation:** CMA investigates mergers above thresholds, can block or impose conditions\n2. **Anti-cartel enforcement:** Detecting and punishing collusion, price-fixing (fines up to 10% of turnover)\n3. **Market investigations:** In-depth analysis of markets that appear to lack competition\n4. **Consumer protection:** Preventing misleading practices, ensuring fair terms\n\n**Evaluation:**\n✅ Prevents monopoly abuse, lowers prices, promotes innovation\n✅ Deters anti-competitive behaviour\n❌ Difficult to define the relevant market (narrow vs broad)\n❌ Breaking up large firms may lose economies of scale\n❌ Dynamic efficiency argument — large profits fund R&D\n❌ Regulatory capture — regulators may favour industry interests",
  },
  {
    title: "Privatisation, Regulation & Deregulation",
    definition: "**Privatisation** transfers state-owned enterprises to the private sector. **Regulation** imposes rules on firms. **Deregulation** removes regulations to increase competition.",
    keyTerms: [
      { term: "Privatisation", definition: "Sale of government-owned businesses to the private sector (e.g., BT, British Gas, Royal Mail)" },
      { term: "Nationalisation", definition: "Government takeover of private firms (e.g., Northern Rock 2007, East Coast rail)" },
      { term: "Regulatory Capture", definition: "Regulators act in the interests of the industry they regulate, not consumers" },
    ],
    explanation: "**Arguments for privatisation:**\n- Profit motive → efficiency and cost reduction\n- Competition → lower prices and better quality\n- Reduces government borrowing\n- Shareholder pressure for performance\n\n**Arguments against privatisation:**\n- Natural monopolies may charge monopoly prices\n- Short-termism (maximise profit, not long-term investment)\n- 'Cherry-picking' profitable services, abandoning unprofitable ones\n- Loss of public control over essential services\n\n**Regulation of privatised utilities:** Ofgem (energy), Ofwat (water), Ofcom (telecoms) — price capping (RPI-X), quality standards, service obligations\n\n**Deregulation:** Opening markets to new competitors (e.g., bus deregulation, energy market opening). Benefits: more competition, lower prices, innovation. Risks: cream-skimming, reduced service in unprofitable areas.",
  },
];

const financialMarketsExtendedSubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Structure of Financial Markets",
    definition: "Financial markets consist of money markets (short-term), capital markets (long-term), and foreign exchange markets. They channel funds from savers to borrowers.",
    keyTerms: [
      { term: "Bond", definition: "Fixed-income debt instrument — government (gilts) or corporate bonds. Inverse relationship between bond price and yield" },
      { term: "Equity (Shares)", definition: "Ownership stake in a company — dividends + capital gains" },
      { term: "Yield", definition: "Annual return on a bond: coupon ÷ market price. Falls when bond prices rise" },
      { term: "Narrow Money (M0)", definition: "Notes, coins, and central bank reserves — the most liquid form of money" },
      { term: "Broad Money (M4)", definition: "Includes bank deposits — measures the total money supply in the economy" },
    ],
    explanation: "**Characteristics of money:** Medium of exchange, store of value, unit of account, standard of deferred payment\n\n**Bond prices and interest rates:**\n- When market interest rates RISE → existing bonds (with lower coupons) become less attractive → bond prices FALL → yield rises\n- When market interest rates FALL → existing bonds become more attractive → bond prices RISE → yield falls\n- This INVERSE relationship is fundamental to understanding monetary policy transmission\n\n**How firms raise finance:**\n1. Retained profits (internal finance — most common)\n2. Bank loans (debt finance)\n3. Corporate bonds (debt finance)\n4. Share issues (equity finance)\n\nEach has different costs, risks, and implications for ownership and control.",
    examTip: "The inverse relationship between bond prices and interest rates is frequently tested. Remember: when rates rise, bond prices fall (and vice versa). Be able to explain WHY using the concept of opportunity cost.",
  },
  {
    title: "Commercial & Investment Banks",
    definition: "**Commercial banks** accept deposits and make loans to households and businesses. **Investment banks** help firms raise finance, trade securities, and advise on mergers.",
    keyTerms: [
      { term: "Credit Creation", definition: "Banks lend out a multiple of their deposits, creating new money in the process" },
      { term: "Liquidity", definition: "How easily assets can be converted to cash — banks must balance liquidity with profitability" },
      { term: "Capital Ratio", definition: "Bank's own capital as a % of its risk-weighted assets — higher ratio = safer" },
    ],
    explanation: "**How banks create credit (money):**\n1. Bank receives £100 deposit\n2. Keeps £10 as reserves (10% reserve ratio)\n3. Lends out £90\n4. Borrower spends £90 → ends up as deposit in another bank\n5. That bank keeps £9, lends £81\n6. Process repeats → total money created = £100 × (1/0.1) = £1,000\n\n**The bank's dilemma:** Profitability vs liquidity vs security\n- More lending → more profit but more risk\n- More reserves → safer but less profitable\n- Basel III regulations set minimum capital ratios to ensure stability\n\n**Ring-fencing (2019):** UK banks must separate retail banking (deposits, mortgages) from investment banking (trading, speculation) to protect depositors from investment losses.",
  },
];

const revisitingMacroSubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "National Income & Circular Flow Revisited",
    definition: "National income can be measured in three equivalent ways: income, output, and expenditure. The circular flow model shows how money flows between households, firms, government, and the rest of the world.",
    keyTerms: [
      { term: "Nominal GDP", definition: "GDP measured at current prices — includes the effect of inflation" },
      { term: "Real GDP", definition: "GDP adjusted for inflation — measures actual changes in output" },
      { term: "GDP per capita", definition: "GDP ÷ population — better indicator of living standards than total GDP" },
      { term: "PPP", definition: "Purchasing Power Parity — adjusts for cost-of-living differences between countries" },
    ],
    explanation: "**Three measures of national income:**\n1. **Income approach:** Total wages + rent + interest + profit\n2. **Output approach:** Total value added by all industries\n3. **Expenditure approach:** C + I + G + (X − M)\n\nAll three give the same answer (in theory).\n\n**Limitations of GDP as a welfare measure:**\n- Ignores income distribution (GDP can rise while inequality worsens)\n- Ignores the informal/shadow economy\n- Ignores negative externalities (pollution not deducted)\n- Doesn't account for non-market activity (unpaid care work, volunteering)\n- Doesn't measure quality of life, happiness, or well-being\n- GDP per capita is better but still limited\n\n**Alternative measures:** HDI, GNH (Gross National Happiness), ISEW (Index of Sustainable Economic Welfare), genuine progress indicator",
  },
];

const fiscalPolicyExtendedSubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Fiscal Policy — Extended Analysis",
    definition: "At A2, fiscal policy analysis requires deeper understanding of budget deficits, national debt, austerity, and the fiscal policy debates.",
    keyTerms: [
      { term: "Cyclical Deficit", definition: "Deficit caused by the economic cycle — falls automatically during recovery (automatic stabilisers)" },
      { term: "Structural Deficit", definition: "Underlying deficit that persists even at full employment — requires deliberate policy action to close" },
      { term: "Austerity", definition: "Reducing government spending and/or raising taxes to close the budget deficit" },
      { term: "Fiscal Rules", definition: "Self-imposed limits on borrowing/debt (e.g., debt must fall as a % of GDP within 5 years)" },
    ],
    explanation: "**The austerity debate (2010-2019):**\n- UK ran large deficits after 2008 crisis (peaked at 10% of GDP)\n- Coalition government pursued austerity: spending cuts + tax rises\n- Keynesians argued: austerity during a recession reduces AD → prolongs the downturn → self-defeating\n- Fiscal conservatives argued: high debt is unsustainable → must restore fiscal credibility → lower bond yields\n\n**National debt considerations:**\n- UK national debt ≈ 100% of GDP (post-COVID)\n- Is this a problem? Depends on: interest costs, growth rate, whether debt is domestically held, what the borrowing funded\n- If growth rate > interest rate → debt-to-GDP ratio falls naturally\n- Borrowing for investment (infrastructure, education) may be self-financing if it raises future GDP\n\n**Automatic stabilisers vs discretionary policy:**\n- Automatic: tax revenues fall and benefit spending rises in recession (no policy decision needed)\n- Discretionary: deliberate changes (e.g., furlough scheme, tax cuts, spending announcements)\n- Automatic stabilisers are immediate; discretionary policy has time lags",
    examTip: "For 25-mark essays, evaluate austerity by considering: Keynesian criticism (multiplier, hysteresis), fiscal credibility argument, composition of cuts (capital vs current spending), distributional impact.",
  },
];

/* ═════════════════════════════════════════════════════════════
 *  YEAR 1 (AS) — MICROECONOMICS
 * ═════════════════════════════════════════════════════════════ */

/* ── Additional Year 1 depth subtopics ── */

const governmentInterventionExtended: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Indirect Taxes & Subsidies",
    definition: "**Indirect taxes** (e.g., VAT, excise duty) raise the cost of supply, shifting the supply curve leftward. **Subsidies** lower production costs, shifting supply rightward.",
    keyTerms: [
      { term: "Specific Tax", definition: "A fixed amount per unit (e.g., 58p per litre on petrol)" },
      { term: "Ad Valorem Tax", definition: "A percentage of the price (e.g., 20% VAT)" },
      { term: "Tax Incidence", definition: "How the burden of a tax is shared between consumers and producers — depends on PED and PES" },
      { term: "Pigouvian Tax", definition: "A tax set equal to the marginal external cost to internalise a negative externality" },
    ],
    formula: "Tax revenue = tax per unit × quantity sold\nDeadweight loss = ½ × tax × ΔQ",
    explanation: "**Tax incidence depends on elasticities:**\n- **Inelastic demand** → consumers bear most of the burden (firms can pass on the tax)\n- **Elastic demand** → producers bear most of the burden (consumers switch away)\n- **Inelastic supply** → producers bear more\n- **Elastic supply** → consumers bear more\n\n**Subsidies mirror taxes in reverse:**\n- Shift supply curve rightward by the subsidy amount\n- Benefit shared between consumers (lower prices) and producers (higher revenue)\n- Can correct positive externalities by encouraging production to the socially optimal level\n\n**Evaluation of indirect taxes:**\n✅ Generate government revenue, internalise externalities, discourage consumption of demerit goods\n❌ Regressive (take a larger % of income from the poor), may encourage black markets, difficult to set at the correct level, may reduce competitiveness",
    diagram: "tax_incidence",
    examTip: "Always discuss who bears the tax burden — it depends on relative elasticities, NOT who the tax is legally imposed on. Draw diagrams showing the incidence split.",
  },
  {
    title: "Maximum & Minimum Prices",
    definition: "**Maximum prices** (price ceilings) are set BELOW equilibrium to make goods affordable. **Minimum prices** (price floors) are set ABOVE equilibrium to protect producers.",
    keyTerms: [
      { term: "Price Ceiling", definition: "A maximum price set by government below the equilibrium — creates excess demand (shortages)" },
      { term: "Price Floor", definition: "A minimum price set above the equilibrium — creates excess supply (surpluses)" },
      { term: "Rationing", definition: "Non-price allocation methods needed when a price ceiling creates shortages (queues, vouchers, first-come-first-served)" },
    ],
    explanation: "**Maximum prices (e.g., rent controls):**\n- Set below equilibrium → Qd > Qs → shortage\n- Consumers benefit from lower prices (those who CAN get the good)\n- But: shortages, black markets, reduced quality, landlords withdraw supply\n- Allocative inefficiency — not allocated to those who value it most\n\n**Minimum prices (e.g., National Minimum Wage, agricultural price supports):**\n- Set above equilibrium → Qs > Qd → surplus\n- NMW: workers who keep their jobs earn more, but some may become unemployed\n- Agriculture: guarantees farmer income but creates butter mountains / wine lakes\n- Government may need to buy up surplus stock\n\n**Buffer stock schemes:** Government buys surplus when price is low and sells stock when price is high — stabilises prices but costly to operate and difficult to sustain.",
    diagram: "price_ceiling",
    examTip: "For price control questions, always identify: (1) who gains, (2) who loses, (3) the deadweight loss, and (4) unintended consequences (black markets, quality reduction).",
  },
  {
    title: "Government Failure",
    definition: "**Government failure** occurs when government intervention leads to a net welfare loss — the cure is worse than the disease.",
    keyTerms: [
      { term: "Government Failure", definition: "When intervention makes resource allocation WORSE than the free market outcome" },
      { term: "Unintended Consequences", definition: "Secondary effects of policy not anticipated by policymakers" },
      { term: "Regulatory Capture", definition: "Regulators act in the interests of the industry they regulate, not consumers" },
      { term: "Moral Hazard", definition: "People take more risks because they are protected from the consequences (e.g., bank bailouts)" },
    ],
    explanation: "**Causes of government failure:**\n1. **Distortion of price signals** — subsidies, price controls interfere with the price mechanism\n2. **Unintended consequences** — e.g., biofuel subsidies raised food prices\n3. **Excessive bureaucracy and costs** — administration costs may exceed benefits\n4. **Information gaps** — government may lack data to set optimal tax/subsidy levels\n5. **Political short-termism** — policies designed to win elections, not maximise welfare\n6. **Regulatory capture** — industry lobbying influences regulation\n7. **Moral hazard** — bailouts incentivise risky behaviour\n\n**Examples:**\n- EU Common Agricultural Policy (butter mountains, wine lakes, high food prices)\n- UK biofuel mandate (raised global food prices)\n- 2008 bank bailouts (moral hazard — banks took excessive risks knowing they'd be rescued)\n- Prohibition (1920s USA — created organised crime, no reduction in drinking)\n\n**Key evaluation:** Compare the welfare loss from market failure WITH the potential welfare loss from government intervention. Sometimes doing nothing is better.",
    examTip: "Government failure is the go-to evaluation for ANY question about government intervention. Always consider: Is the intervention worse than the market failure it's trying to correct?",
  },
];

/* ── Additional depth for Chapter 1 ── */
const additionalMethodologySubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Economic Models & Assumptions",
    definition: "**Economic models** are simplified representations of reality used to explain and predict economic behaviour. They rely on assumptions like ceteris paribus and rational economic agents.",
    keyTerms: [
      { term: "Model", definition: "A simplified framework to explain economic relationships (e.g., supply & demand, circular flow)" },
      { term: "Ceteris Paribus", definition: "'All other things being equal' — isolates the effect of one variable" },
      { term: "Rational Agent", definition: "An economic agent who acts in their own self-interest, weighing costs and benefits" },
    ],
    explanation: "**Why models matter:**\n- Reality is too complex to analyse without simplification\n- Models generate testable predictions (hypotheses)\n- They help identify cause and effect through ceteris paribus reasoning\n\n**Limitations of models:**\n- Based on unrealistic assumptions (perfect information, rationality)\n- Behavioural economics shows agents aren't always rational\n- Ceteris paribus rarely holds in the real world — many variables change simultaneously\n- Models may be culturally biased or outdated\n\n**The scientific method in economics:**\n1. Observe patterns → 2. Form hypothesis → 3. Build model → 4. Test with data → 5. Refine or reject\n\n**Deductive vs inductive reasoning:**\n- Deductive: from theory to prediction (if demand ↑, price should ↑)\n- Inductive: from data to theory (observe correlation, infer causation — but correlation ≠ causation!)",
    examTip: "When asked about economic methodology, emphasise that models are useful simplifications, not perfect descriptions of reality. Evaluative comments about assumptions earn top marks.",
  },
];

export const aqaBook1MicroTopics: Topic[] = [
  {
    name: "Chapter 1: Economic Methodology & the Economic Problem",
    subtopics: [...aqaYear1Paper1Topics[0].subtopics, ...additionalMethodologySubtopics],
  },
  {
    name: "Chapter 3: Price Determination in Competitive Markets",
    subtopics: [...aqaYear1Paper1Topics[1].subtopics, ...elasticitySubtopics],
  },
  {
    name: "Chapter 4: Production, Costs & Revenue",
    subtopics: aqaYear1Paper1Topics[2].subtopics,
  },
  {
    name: "Chapter 5: Perfect & Imperfectly Competitive Markets & Monopolies",
    subtopics: aqaYear1Paper1Topics[3].subtopics,
  },
  {
    name: "Chapter 8: The Market Mechanism, Market Failure & Government Intervention",
    subtopics: [...aqaYear1Paper1Topics[4].subtopics, ...governmentInterventionExtended],
  },
];

/* ── Additional macro depth subtopics ── */
const circularFlowSubtopic: import("./edexcelANotes").Subtopic = {
  title: "The Circular Flow of Income",
  definition: "The **circular flow** model shows how income flows between households and firms, with injections (I, G, X) and withdrawals (S, T, M) determining the equilibrium level of national income.",
  keyTerms: [
    { term: "Injection", definition: "Addition to the circular flow — Investment (I), Government spending (G), Exports (X)" },
    { term: "Withdrawal (Leakage)", definition: "Removal from the circular flow — Saving (S), Taxation (T), Imports (M)" },
    { term: "Equilibrium National Income", definition: "Where total injections = total withdrawals (S + T + M = I + G + X)" },
  ],
  explanation: "**The simple model:** Households provide factors of production → firms pay factor incomes → households spend on goods → firms earn revenue → cycle continues.\n\n**With government and trade:**\n- Injections ADD spending: investment, government spending, export revenue\n- Withdrawals REMOVE spending: saving, taxation, import spending\n- If injections > withdrawals → national income RISES\n- If withdrawals > injections → national income FALLS\n- Equilibrium: J = W\n\n**Key insight:** A change in any injection or withdrawal has a MULTIPLIED effect on national income.",
  examTip: "The circular flow is fundamental — link it to multiplier analysis. An increase in government spending (injection) has a multiplied effect on national income, but the size depends on the marginal propensity to withdraw.",
};

const macroMeasurementExtended: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Measuring National Income (GDP, GNI, GNP)",
    definition: "**GDP** measures the total value of goods and services produced within a country's borders. **GNI** adds net income from abroad. These are key indicators but have significant limitations.",
    keyTerms: [
      { term: "GDP (Gross Domestic Product)", definition: "Total value of goods & services produced within a country in a given period" },
      { term: "GNI (Gross National Income)", definition: "GDP + net income from abroad (profits, dividends, interest from overseas assets)" },
      { term: "Real GDP", definition: "GDP adjusted for inflation — measures changes in actual output" },
      { term: "GDP Deflator", definition: "Price index used to convert nominal GDP to real GDP" },
    ],
    explanation: "**Three ways to measure GDP (all should be equal):**\n1. **Output method:** Sum of value added by each industry\n2. **Income method:** Sum of all factor incomes (wages, rent, interest, profit)\n3. **Expenditure method:** C + I + G + (X − M)\n\n**GDP vs GNI:**\n- Ireland: GDP much higher than GNI (multinationals report profits in Ireland but repatriate them)\n- UK: GNI slightly above GDP (UK earns significant investment income from abroad)\n\n**Why GDP is imperfect:**\n- Ignores distribution of income\n- Excludes unpaid work (childcare, volunteering)\n- Ignores the informal/underground economy\n- Doesn't account for environmental degradation\n- More ≠ better (earthquake rebuilding raises GDP)\n- PPP adjustments needed for international comparisons",
    examTip: "Always state GDP limitations when evaluating economic performance. Compare GDP with broader measures like HDI, IHDI, or the Genuine Progress Indicator for top marks.",
  },
  {
    title: "Index Numbers & the CPI",
    definition: "**Index numbers** allow comparison of data over time by expressing values relative to a base year (= 100). The **CPI** is the UK's main inflation measure.",
    keyTerms: [
      { term: "Index Number", definition: "A number showing the value of a variable relative to a base year (base = 100)" },
      { term: "CPI", definition: "Consumer Prices Index — tracks the cost of a weighted basket of ~700 goods and services" },
      { term: "Base-Weighted Index", definition: "Uses quantities from the base year as weights (Laspeyres index — CPI is based on this)" },
    ],
    explanation: "**How CPI is calculated:**\n1. Choose a representative basket of goods & services (~700 items)\n2. Assign weights based on spending patterns (from the Living Costs & Food Survey)\n3. Collect prices from ~140 locations across the UK\n4. Calculate weighted price change from the base period\n5. Update the basket and weights annually\n\n**CPI vs RPI:**\n- CPI excludes mortgage interest payments; RPI includes them\n- CPI uses geometric mean; RPI uses arithmetic mean → RPI typically higher\n- CPI is the official inflation target measure\n- RPI still used for some contracts, index-linked gilts, student loan interest\n\n**Limitations of CPI:**\n- Substitution bias (consumers switch to cheaper alternatives)\n- New product bias (slow to include new goods)\n- Quality changes not fully captured\n- Doesn't reflect individual experience (your inflation ≠ average inflation)\n- Housing costs poorly represented",
    examTip: "AQA frequently tests CPI limitations. Always mention the substitution bias and that CPI doesn't reflect individual spending patterns — a pensioner's inflation rate differs from a student's.",
  },
];

export const aqaBook1MacroTopics: Topic[] = [
  {
    name: "Chapter 9: Measuring Macroeconomic Performance",
    subtopics: [...aqaYear1Paper2Topics[0].subtopics, ...macroMeasurementExtended],
  },
  {
    name: "Chapter 10: How the Macroeconomy Works",
    subtopics: [circularFlowSubtopic, ...aqaYear1Paper2Topics[1].subtopics],
  },
  {
    name: "Chapter 11: Economic Performance",
    subtopics: economicPerformanceSubtopics,
  },
  {
    name: "Chapter 12: Macroeconomic Policy",
    subtopics: aqaYear1Paper2Topics[2].subtopics,
  },
];

/* ═════════════════════════════════════════════════════════════
 *  YEAR 2 (A2) — MICROECONOMICS
 * ═════════════════════════════════════════════════════════════ */

/* ── Extended production/costs subtopics for Year 2 Chapter 2 ── */
const extendedProductionCosts: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Short-Run & Long-Run Cost Curves (Revisited)",
    definition: "At A2, you must understand the relationship between short-run and long-run cost curves in greater detail, including the 'envelope' curve and its implications for firm behaviour.",
    keyTerms: [
      { term: "LRAC (Envelope Curve)", definition: "The LRAC is tangent to an infinite number of SRAC curves — each representing a different plant size" },
      { term: "Returns to Scale", definition: "How output changes when ALL inputs are increased proportionally" },
      { term: "Constant Returns to Scale", definition: "Doubling all inputs doubles output → LRAC is flat" },
    ],
    explanation: "**The LRAC as the 'envelope' of SRAC curves:**\n- In the short run, at least one factor is fixed → firm is on a specific SRAC curve\n- In the long run, ALL factors are variable → firm can choose optimal plant size\n- LRAC shows the minimum cost achievable for each output level when ALL factors can be varied\n- Each point on the LRAC corresponds to the most efficient plant size for that output\n\n**Why the LRAC is typically U-shaped:**\n1. Initially falling: increasing returns to scale (economies of scale)\n2. Minimum point: constant returns to scale (MES reached)\n3. Eventually rising: decreasing returns to scale (diseconomies of scale)\n\n**L-shaped LRAC:** Some industries may experience continuous economies of scale with no diseconomies — the LRAC flattens but doesn't rise. This is more realistic for many modern industries (tech, services).\n\n**Policy implications:**\n- If MES is large relative to market size → natural monopoly / oligopoly\n- If MES is small → many efficient firms can coexist → competitive market",
    examTip: "Draw the LRAC as an envelope of SRAC curves. Show how the firm selects the optimal plant size by choosing the SRAC that is tangent to the LRAC at the desired output level.",
  },
  {
    title: "Revenue Maximisation & Sales Maximisation",
    definition: "Firms may pursue objectives other than profit maximisation. **Revenue maximisation** occurs where MR = 0; **sales maximisation** occurs where AC = AR (normal profit constraint).",
    keyTerms: [
      { term: "Revenue Maximisation", definition: "Producing where MR = 0 (total revenue is at its peak)" },
      { term: "Sales Maximisation", definition: "Producing the maximum output while still covering costs (AR = AC)" },
      { term: "Satisficing", definition: "Earning enough profit to keep shareholders satisfied, then pursuing other goals (market share, growth)" },
      { term: "Principal-Agent Problem", definition: "Managers (agents) may pursue their own objectives rather than those of shareholders (principals)" },
    ],
    explanation: "**Comparison of objectives:**\n\n| Objective | Condition | Output | Price |\n|---|---|---|---|\n| Profit max | MC = MR | Lowest | Highest |\n| Revenue max | MR = 0 | Higher | Lower |\n| Sales max | AC = AR | Highest | Lowest |\n\n**Why firms may not profit-maximise:**\n- Managers prefer revenue/growth (larger firms = higher salaries, prestige)\n- Satisficing: enough profit to prevent shareholder revolt, then pursue other goals\n- Market share objectives (especially in tech — Amazon prioritised growth over profits for years)\n- Corporate social responsibility (B Corps, stakeholder capitalism)\n- Price wars to drive out competitors (predatory pricing)\n\n**Williamson's managerial utility model:** Managers maximise their own utility (salary, staff, perks) subject to a minimum profit constraint.",
    examTip: "For 25-mark essays on firm behaviour, always evaluate WHETHER firms actually profit-maximise. The principal-agent problem and satisficing are powerful evaluation points.",
  },
];

/* ── Extended labour market subtopics ── */
const extendedLabourMarket: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Monopsony in the Labour Market",
    definition: "A **monopsony** employer is a single (or dominant) buyer of labour. It has the power to set wages below the competitive equilibrium, creating a welfare loss.",
    keyTerms: [
      { term: "Monopsony", definition: "A market with a single or dominant buyer — in the labour market, one employer dominates" },
      { term: "MCL (Marginal Cost of Labour)", definition: "The extra cost of hiring one more worker — above ACL because all workers must be paid the higher wage" },
      { term: "ACL (Average Cost of Labour)", definition: "The wage rate — the supply curve of labour" },
    ],
    explanation: "**How monopsony depresses wages:**\n- Monopsonist faces an upward-sloping labour supply curve (must raise wages to attract more workers)\n- MCL > ACL (raising the wage for the marginal worker means raising it for ALL workers)\n- Profit-maximising employment: MCL = MRPL → employs fewer workers at a lower wage than competitive market\n\n**Examples:** NHS (largest UK employer of nurses), Amazon in small towns, agricultural employers in rural areas, Walmart in small US towns\n\n**NMW and monopsony:**\n- Classical model: NMW → unemployment\n- Monopsony model: NMW can INCREASE both wages AND employment (up to competitive level)\n- This explains why moderate NMW increases haven't caused significant unemployment (Card & Krueger, 1994)\n\n**Policy implications:** Monopsony power justifies government intervention in labour markets (NMW, trade unions, employment regulation).",
    examTip: "The monopsony model is crucial for evaluating the NMW. It explains why a NMW can increase employment — contradicting the simple competitive model. Always use this in NMW evaluation questions.",
  },
  {
    title: "Trade Unions & Wage Determination",
    definition: "**Trade unions** are organisations of workers that collectively bargain with employers for better wages, conditions, and job security. They act as a monopoly seller of labour.",
    keyTerms: [
      { term: "Collective Bargaining", definition: "Negotiations between unions and employers over wages and working conditions" },
      { term: "Bilateral Monopoly", definition: "A market with one buyer (monopsony employer) and one seller (trade union) — wage is indeterminate" },
      { term: "Real Wage Unemployment", definition: "Unemployment caused by wages being held above the market-clearing level (by unions or NMW)" },
    ],
    explanation: "**Economic effects of trade unions:**\n\n**Arguments FOR unions:**\n- Correct monopsony power — push wages towards competitive level\n- Reduce inequality by raising wages for lower-paid workers\n- Improve working conditions, health and safety\n- Give workers a 'voice' → reduces labour turnover → raises productivity\n- Bilateral monopoly: counter monopsony power → wage closer to competitive equilibrium\n\n**Arguments AGAINST unions:**\n- May push wages above equilibrium → real wage unemployment\n- Restrictive practices reduce flexibility and productivity\n- Insider-outsider problem: protect existing members at expense of unemployed\n- May cause cost-push inflation if wage rises exceed productivity gains\n- Reduce firms' competitiveness in global markets\n\n**Evaluation:** Impact depends on: union density, employer's market power, labour market conditions, type of industry, and whether wages were initially below competitive level.",
    examTip: "In bilateral monopoly, the wage outcome is theoretically indeterminate — it depends on bargaining power. This is a strong evaluative point for labour market essays.",
  },
];

/* ── Dedicated NMW subtopic (spec 4.1.6.6) ── */
const nmwSubtopic: import("./edexcelANotes").Subtopic = {
  title: "The National Minimum Wage (NMW) & National Living Wage (NLW)",
  definition: "The **NMW** is the legal minimum hourly rate employers must pay workers. The **NLW** is the higher rate for workers aged 21+ (from April 2024). It is a price floor in the labour market.",
  keyTerms: [
    { term: "National Minimum Wage", definition: "Legal minimum hourly pay — varies by age (16-17, 18-20, 21+, apprentices)" },
    { term: "National Living Wage", definition: "The NMW rate for workers aged 21+ — currently £11.44/hr (April 2024)" },
    { term: "Real Living Wage", definition: "A voluntary, higher rate set by the Living Wage Foundation based on actual living costs (≈£12/hr, £13.15 in London)" },
    { term: "Price Floor", definition: "A minimum price set above equilibrium — in the labour market, the NMW prevents wages falling below a set level" },
  ],
  explanation: "**Competitive labour market analysis:**\n- NMW set above equilibrium → Qs of labour > Qd → surplus of labour → unemployment\n- The higher the NMW above equilibrium, the greater the unemployment effect\n- Classical economists predict job losses, especially for low-skilled workers\n\n**Monopsony labour market analysis:**\n- If employer has monopsony power, wages are below competitive level\n- NMW can increase BOTH wages AND employment (up to competitive level)\n- This explains empirical evidence (Card & Krueger) showing minimal unemployment effects from moderate NMW increases\n\n**Arguments FOR the NMW:**\n✅ Reduces in-work poverty and income inequality\n✅ Corrects monopsony exploitation\n✅ Reduces the need for in-work benefits (taxpayer savings)\n✅ Increases motivation and reduces staff turnover\n✅ Boosts AD (low earners have high MPC)\n\n**Arguments AGAINST:**\n❌ May cause unemployment if set too high above equilibrium\n❌ May reduce employment of young/low-skilled workers most\n❌ Could lead to inflation if firms pass on higher costs\n❌ May encourage substitution of capital for labour (automation)\n❌ Regional variation — £11.44/hr may be appropriate in London but high in rural areas\n\n**Evaluation:** Empirical evidence suggests moderate NMW increases have had minimal negative employment effects in the UK, supporting the monopsony model. However, very large increases could cross the threshold where job losses become significant.",
  examTip: "Always evaluate the NMW using BOTH the competitive model (predicts unemployment) and the monopsony model (predicts no unemployment or even increased employment). The best answers discuss which model better fits the UK labour market.",
};

/* ── Extended inequality subtopics ── */
const extendedInequalitySubtopics: import("./edexcelANotes").Subtopic[] = [
  {
    title: "The Lorenz Curve & Gini Coefficient",
    definition: "The **Lorenz Curve** shows the cumulative distribution of income/wealth. The **Gini Coefficient** measures inequality on a scale from 0 (perfect equality) to 1 (perfect inequality).",
    keyTerms: [
      { term: "Lorenz Curve", definition: "A graph plotting cumulative % of population against cumulative % of income/wealth" },
      { term: "Gini Coefficient", definition: "Area between Lorenz Curve and line of equality ÷ total area under the line (0 = equal, 1 = unequal)" },
      { term: "Line of Perfect Equality", definition: "45° line on Lorenz diagram — each % of population earns the same % of income" },
    ],
    explanation: "**Reading the Lorenz Curve:**\n- The further the Lorenz Curve from the 45° line → the greater the inequality\n- UK Lorenz Curve for WEALTH is much further from equality than for INCOME\n- Wealth inequality > income inequality (wealth accumulates over generations)\n\n**UK Gini Coefficient:**\n- Before taxes/transfers: ~0.52 (high inequality)\n- After taxes/transfers: ~0.34 (significant redistribution)\n- UK is more unequal than Scandinavia (~0.27) but less than USA (~0.39)\n\n**Causes of rising inequality:**\n- Globalisation (returns to capital vs labour)\n- Technological change (skill-biased — raises demand for skilled workers)\n- Decline of trade union membership\n- Tax changes (top rate cuts, shift from direct to indirect taxes)\n- Housing wealth concentration\n- Executive pay growth outstripping average wages\n\n**Policies to reduce inequality:** Progressive taxation, means-tested benefits, NMW increases, education and training investment, inheritance tax reform.",
    examTip: "Always distinguish between income and wealth inequality — they have different causes and policy solutions. The Gini coefficient is useful for international and historical comparisons.",
  },
  {
    title: "Absolute & Relative Poverty",
    definition: "**Absolute poverty** means lacking the income to afford basic necessities (food, shelter, clothing). **Relative poverty** means having significantly less than the average in society.",
    keyTerms: [
      { term: "Absolute Poverty", definition: "Income below the minimum needed to sustain life — World Bank: $2.15/day (2022 threshold)" },
      { term: "Relative Poverty", definition: "Income below 60% of median household income (UK definition)" },
      { term: "Poverty Trap", definition: "Situation where taking paid work results in loss of benefits, leaving people no better off" },
    ],
    explanation: "**Key distinction:**\n- Absolute poverty can be eliminated through economic growth\n- Relative poverty can persist even as living standards rise (it's about the gap)\n- A country can have NO absolute poverty but significant relative poverty (UK)\n\n**The poverty trap explained:**\n1. Person on benefits gets a job → loses housing benefit, tax credits, free prescriptions\n2. Effective marginal tax rate can exceed 70-80%\n3. Financial incentive to work is very weak → poverty trap\n4. Universal Credit was designed to address this by tapering benefits more gradually\n\n**Causes of poverty:**\n- Unemployment and low-wage employment\n- Lack of education and skills\n- Family breakdown, disability, mental health\n- Regional disparities\n- Structural changes in the economy (deindustrialisation)\n\n**Evaluation:** Economic growth is necessary but not sufficient to reduce poverty. Growth must be inclusive and accompanied by effective redistribution policies.",
    examTip: "AQA commonly asks about the effectiveness of policies to reduce poverty. Always evaluate using the poverty trap — well-intentioned benefits can discourage work if not designed carefully.",
  },
];

/* ── Extended market failure subtopics for Year 2 ── */
const extendedMarketFailure: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Cost-Benefit Analysis (CBA)",
    definition: "**CBA** is a technique used by governments to assess whether a project should go ahead by comparing total social costs with total social benefits, expressed in monetary terms.",
    keyTerms: [
      { term: "Social Cost", definition: "Private cost + external cost" },
      { term: "Social Benefit", definition: "Private benefit + external benefit" },
      { term: "Net Present Value (NPV)", definition: "The difference between discounted benefits and discounted costs — project goes ahead if NPV > 0" },
      { term: "Discount Rate", definition: "The rate used to convert future costs/benefits into present values — reflects time preference" },
    ],
    explanation: "**Steps in CBA:**\n1. Identify all costs and benefits (private AND external)\n2. Quantify them in monetary terms\n3. Apply a discount rate to future flows\n4. Compare total discounted benefits with total discounted costs\n5. If NPV > 0 → project should proceed\n\n**Advantages:** Considers externalities, provides a structured framework, allows comparison of different projects\n\n**Disadvantages:**\n- Extremely difficult to value externalities (what is a life worth? what is noise pollution worth?)\n- Discount rate choice is subjective and politically influenced\n- Risk of political manipulation (choosing assumptions to support a desired outcome)\n- Distributional effects ignored (who gains and who loses?)\n- Shadow pricing is inherently uncertain\n\n**Example:** HS2 — original CBA showed positive NPV based on time savings for business travellers. But costs escalated, assumptions were questioned, and distributional concerns (benefits concentrated in London/Birmingham) led to ongoing controversy.",
    examTip: "CBA questions require you to evaluate the reliability of the analysis. Focus on: valuation difficulties, discount rate sensitivity, and the risk of political manipulation.",
  },
];

export const aqaBook2MicroTopics: Topic[] = [
  {
    name: "Chapter 2: Individual Economic Decision Making",
    subtopics: [utilityTheorySubtopic, imperfectInfoSubtopic, ...aqaYear2Paper1Topics[0].subtopics],
  },
  {
    name: "Chapter 4: Production, Costs & Revenue (Extended)",
    subtopics: [technologicalChangeSubtopic, ...extendedProductionCosts],
  },
  {
    name: "Chapter 5: Perfect Competition, Imperfect Competition & Monopoly",
    subtopics: aqaYear2Paper1Topics[1].subtopics,
  },
  {
    name: "Chapter 6: The Labour Market",
    subtopics: [...aqaYear2Paper1Topics[2].subtopics, ...extendedLabourMarket, nmwSubtopic],
  },
  {
    name: "Chapter 7: Distribution of Income & Wealth, Poverty & Inequality",
    subtopics: [...aqaYear2Paper1Topics[3].subtopics, ...extendedInequalitySubtopics],
  },
  {
    name: "Chapter 8: Revisiting Market Failure & Government Intervention",
    subtopics: [...revisitingMarketFailureSubtopics, ...extendedMarketFailure],
  },
];

/* ═════════════════════════════════════════════════════════════
 *  YEAR 2 (A2) — MACROECONOMICS
 * ═════════════════════════════════════════════════════════════ */

/* ── Extended macro theory subtopics ── */
const extendedMacroTheory: import("./edexcelANotes").Subtopic[] = [
  {
    title: "The Phillips Curve & NAIRU",
    definition: "The **Phillips Curve** shows an inverse relationship between unemployment and inflation. The **NAIRU** is the unemployment rate at which inflation is stable.",
    keyTerms: [
      { term: "Short-Run Phillips Curve (SRPC)", definition: "Shows a trade-off between unemployment and inflation in the short run" },
      { term: "Long-Run Phillips Curve (LRPC)", definition: "Vertical at the NAIRU — no long-run trade-off (Friedman's view)" },
      { term: "NAIRU", definition: "Non-Accelerating Inflation Rate of Unemployment — where inflation expectations are stable" },
      { term: "Expectations-Augmented Phillips Curve", definition: "Friedman's model: if workers expect inflation, SRPC shifts up, maintaining unemployment at NAIRU" },
    ],
    explanation: "**Original Phillips Curve (1958):**\n- A.W. Phillips found an inverse relationship between wage inflation and unemployment (UK 1861-1957)\n- Policy implication: governments can choose a point on the curve (trade-off)\n\n**Friedman's critique (monetarist):**\n1. Trade-off is only SHORT-RUN\n2. Government expands AD → unemployment falls temporarily → inflation rises\n3. Workers demand higher wages to compensate for inflation\n4. Real wages return to equilibrium → unemployment returns to NAIRU\n5. Result: higher inflation at the same unemployment rate → SRPC shifts up\n6. LRPC is vertical at the NAIRU\n\n**Reducing NAIRU:** Supply-side policies (training, flexibility, information) shift the LRPC left\n\n**Post-2008 puzzle:** Low unemployment AND low inflation — possibly due to: globalisation suppressing wages, gig economy, low productivity growth, anchored inflation expectations.",
    diagram: "phillips_curve",
    examTip: "Always distinguish SRPC from LRPC. The short-run trade-off exists; the long-run trade-off doesn't (Friedman). Use this framework to evaluate demand-management policies.",
  },
  {
    title: "Keynesian vs Classical/Monetarist Debate",
    definition: "The central macroeconomic debate: Keynesians emphasise demand-side failures and government intervention; Classical/Monetarists emphasise market self-correction and minimal intervention.",
    keyTerms: [
      { term: "Keynesian Economics", definition: "Markets can fail → AD deficiency → unemployment → government must intervene (fiscal policy)" },
      { term: "Classical Economics", definition: "Markets self-correct through flexible wages and prices → economy returns to full employment naturally" },
      { term: "Monetarism", definition: "Inflation is 'always and everywhere a monetary phenomenon' (Friedman) → control money supply" },
      { term: "New Classical", definition: "Rational expectations → government policy is anticipated and therefore ineffective" },
    ],
    explanation: "**Keynesian view:**\n- Wages and prices are 'sticky' downwards → markets don't clear\n- Economy can settle in equilibrium BELOW full employment (deflationary gap)\n- AD is the primary driver of output and employment\n- Fiscal policy is effective, especially during recessions\n- Animal spirits drive investment → inherent instability\n\n**Classical/Monetarist view:**\n- Economy is self-correcting in the long run (flexible wages/prices)\n- LRAS is vertical → AD changes only affect prices, not output (long run)\n- Government intervention causes more problems than it solves\n- Monetary policy should follow rules (e.g., money supply growth target)\n- Fiscal policy is ineffective (crowding out, Ricardian equivalence)\n\n**Modern synthesis:**\n- Most economists accept elements of both\n- Short run: Keynesian insights (sticky wages, AD matters)\n- Long run: Classical insights (supply-side determines growth)\n- Central bank independence + inflation targeting = practical compromise",
    examTip: "For 25-mark macro essays, ALWAYS present both perspectives. State which is more applicable given the current economic context (recession → Keynesian; near full capacity → Classical).",
  },
];

/* ── Extended supply-side policy subtopics ── */
const extendedSupplySide: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Evaluating Supply-Side Policies in Depth",
    definition: "Supply-side policies shift LRAS right, but their effectiveness depends on the type of policy, time horizon, and economic context.",
    explanation: "**Market-based supply-side policies — detailed evaluation:**\n\n**Income tax cuts:**\n✅ Incentivise work, increase labour supply, attract skilled workers from abroad\n❌ Laffer Curve is theoretical — tax cuts may simply reduce revenue without increasing supply\n❌ Benefits flow disproportionately to high earners → increases inequality\n❌ May require spending cuts → reduced public services\n\n**Deregulation:**\n✅ Removes bureaucratic barriers to entry → more competition → lower costs\n❌ May reduce consumer/worker/environmental protection (2008 financial crisis partly caused by deregulation)\n❌ Race to the bottom in standards\n\n**Interventionist supply-side policies — detailed evaluation:**\n\n**Education and training:**\n✅ Improves human capital → productivity → competitiveness\n✅ Reduces structural unemployment → lowers NAIRU\n❌ Very long time lags (10-20 years for school reforms to feed through)\n❌ Opportunity cost of public spending\n❌ Difficult to predict future skill needs\n\n**Infrastructure investment:**\n✅ Reduces transport costs, improves connectivity, attracts FDI\n✅ Has a multiplier effect on AD in the short run\n❌ Very expensive (HS2: £100bn+)\n❌ Planning delays, NIMBYism, cost overruns\n❌ Benefits may be geographically concentrated\n\n**Key evaluation:** Supply-side policies are necessary for sustainable growth but insufficient alone — they need to be combined with appropriate demand-side policies.",
    examTip: "The best answers evaluate specific policies rather than discussing 'supply-side policies' in general. Use real-world examples (apprenticeship levy, R&D tax credits, HS2) to demonstrate applied understanding.",
  },
];

/* ── Extended international economy subtopics ── */
const extendedInternational: import("./edexcelANotes").Subtopic[] = [
  {
    title: "Protectionism & Trade Policy",
    definition: "**Protectionism** involves government policies that restrict free trade to protect domestic industries. Methods include tariffs, quotas, subsidies, and non-tariff barriers.",
    keyTerms: [
      { term: "Tariff", definition: "A tax on imports — raises the price of imported goods" },
      { term: "Quota", definition: "A physical limit on the quantity of imports allowed" },
      { term: "Embargo", definition: "A complete ban on trade with a particular country" },
      { term: "Non-Tariff Barriers", definition: "Regulations, standards, bureaucracy that restrict trade without tariffs (e.g., product standards, labelling)" },
      { term: "Infant Industry Argument", definition: "Temporary protection for new industries until they achieve economies of scale to compete internationally" },
    ],
    explanation: "**Arguments FOR protection:**\n- **Infant industry:** New industries need time to grow and achieve EoS before competing with established foreign firms\n- **National security:** Strategic industries (defence, food, energy) shouldn't depend on imports\n- **Anti-dumping:** Prevent foreign firms selling below cost to destroy domestic competition\n- **Protect employment:** Prevent structural unemployment from import competition\n- **Improve BoP:** Reduce import spending\n\n**Arguments AGAINST protection:**\n- Higher prices for consumers → reduced consumer surplus\n- Reduced competition → less efficiency and innovation\n- Retaliation risk → trade wars (US-China tariffs 2018-2023)\n- Protects inefficient industries → misallocation of resources\n- Infant industries may never 'grow up' (permanent protection)\n- Comparative advantage not exploited → lower world output\n\n**The WTO:** Promotes free trade through negotiation and dispute resolution. Principles: MFN (most favoured nation), national treatment, tariff reduction.",
    examTip: "For trade policy essays, always evaluate the infant industry argument critically — in practice, protection is rarely temporary because lobbying creates political pressure to maintain it.",
  },
  {
    title: "Economic Integration & Trading Blocs",
    definition: "**Economic integration** involves countries removing trade barriers between each other while potentially maintaining common external barriers. There are different degrees of integration.",
    keyTerms: [
      { term: "Free Trade Area (FTA)", definition: "Members remove tariffs between each other but maintain independent external tariffs (e.g., USMCA)" },
      { term: "Customs Union", definition: "FTA + common external tariff (e.g., EU customs union)" },
      { term: "Single Market", definition: "Customs union + free movement of goods, services, capital, and labour (EU Single Market)" },
      { term: "Monetary Union", definition: "Single market + common currency (Eurozone)" },
      { term: "Trade Creation", definition: "New trade that occurs because tariffs are removed → efficiency gains" },
      { term: "Trade Diversion", definition: "Trade switched from an efficient non-member to a less efficient member → welfare loss" },
    ],
    explanation: "**Levels of integration (increasing):**\n1. Free Trade Area → 2. Customs Union → 3. Single Market → 4. Monetary Union → 5. Full Political Union\n\n**Benefits of integration:**\n- Trade creation → lower prices, greater choice\n- Economies of scale from larger market\n- Increased FDI (firms invest to access larger market)\n- Greater competition → efficiency\n- Political cooperation and stability\n\n**Costs of integration:**\n- Trade diversion (buying from less efficient partners)\n- Loss of sovereignty over trade policy, regulation, potentially monetary policy\n- Uneven distribution of benefits (core vs periphery)\n- Adjustment costs (structural unemployment in uncompetitive industries)\n\n**Brexit evaluation:** UK left the EU Single Market and Customs Union. Benefits: independent trade policy, regulatory autonomy. Costs: trade friction, reduced FDI, loss of passporting for financial services, supply chain disruption.",
    examTip: "Always analyse trade agreements using trade creation vs trade diversion. The net effect determines whether the agreement improves or worsens welfare.",
  },
];

export const aqaBook2MacroTopics: Topic[] = [
  {
    name: "Chapter 10: Revisiting & Developing Macroeconomic Theory",
    subtopics: [...revisitingMacroSubtopics, ...aqaYear2Paper2Topics[0].subtopics, ...extendedMacroTheory],
  },
  {
    name: "Chapter 12: Financial Markets & Monetary Policy",
    subtopics: [...financialMarketsExtendedSubtopics, ...aqaYear2Paper2Topics[1].subtopics],
  },
  {
    name: "Chapter 13: Fiscal Policy & Supply-Side Policies",
    subtopics: [...fiscalPolicyExtendedSubtopics, ...extendedSupplySide],
  },
  {
    name: "Chapter 14: The International Economy",
    subtopics: [...aqaYear2Paper2Topics[2].subtopics, ...extendedInternational],
  },
];
