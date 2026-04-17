import {
  renderLevelMark,
  renderPointMark,
} from "./aqaMarkSchemeBuilder";

/** A diagram-requirement for a paper question. The optional `figureKey`
 *  resolves to a file in `/public/figures` and is rendered as the canonical
 *  reference figure in both the Question Paper and the Mark Scheme. */
export interface DiagramSpec {
  primary: string;
  alternatives?: string[];
  requiredLabels: string[];
  figureKey?: string;
  figureCaption?: string;
}

function figureMd(diagram?: DiagramSpec): string {
  if (!diagram?.figureKey) return "";
  return `\n\n![${diagram.figureCaption ?? "Figure (reference diagram)"}](/figures/${diagram.figureKey})`;
}

export interface AqaPaper1OverrideSet {
  setLabel: string;

  /** Section A — Context 1 */
  c1: {
    title: string;
    extractA: string; // Table/Figure with source
    extractB: { subtitle: string; body: string; source: string };
    extractC: { subtitle: string; body: string; source: string };
    q01: string; q01Answer: string; q01Hint: string;
    q02: string;
    q03: string; q03Diagram: DiagramSpec;
    q04: string;
  };

  /** Section A — Context 2 */
  c2: {
    title: string;
    extractD: string;
    extractE: { subtitle: string; body: string; source: string };
    extractF: { subtitle: string; body: string; source: string };
    q05: string; q05Answer: string; q05Hint: string;
    q06: string;
    q07: string; q07Diagram: DiagramSpec;
    q08: string;
  };

  /** Section B — three essays, each with 15-mark + 25-mark parts */
  essays: Array<{
    stimulus: string; // 40-70 word current event hook
    explain: string;
    evaluate: string;
    explainContent: string[];
    evaluateContent: string[];
    diagram?: DiagramSpec;
  }>;
}

const SETS: Record<string, AqaPaper1OverrideSet> = {
  "econ-p1-a": {
    setLabel: "Predicted Paper Set A",
    c1: {
      title: "The market for student accommodation",
      extractA: `**Table 1:** Purpose-built student accommodation in the UK, 2018–2024
Source: Cushman Wakefield Student Accommodation Report, 2024

| Year | Full-time students (000s) | PBSA bed spaces (000s) | Average weekly rent (£) | Vacancy rate (%) |
|------|--------------------------|------------------------|--------------------------|------------------|
| 2018 | 1747 | 622 | 147 | 4.1 |
| 2020 | 1872 | 651 | 152 | 5.7 |
| 2022 | 2071 | 678 | 166 | 2.3 |
| 2024 | 2156 | 693 | 187 | 1.4 |`,
      extractB: {
        subtitle: "A serious shortage of student accommodation",
        body: `Universities have expanded the number of places on offer to students, but the supply of student accommodation is highly inelastic in the short run. Cushman Wakefield reported in 2024 that 277 000 foreign students had registered for UK courses, adding further pressure to a market already short of beds.

A spokesperson for the National Union of Students said the shortage was "the worst we have seen in a decade", with average weekly rents rising 13.4% in two years. Construction of new purpose-built blocks slowed after 2022 because of higher financing costs and tighter planning rules in several university cities.

Some students have been forced to commute long distances or accept poorer-quality housing in the wider rental market.`,
        source: "News reports, 2024",
      },
      extractC: {
        subtitle: "Policies to tackle the student housing crisis",
        body: `Several local authorities, including Bristol and Manchester, have considered introducing maximum rents for student accommodation. Supporters argue this would help keep the cost of student accommodation lower than it would otherwise be, but critics warn it risks some landlords withdrawing from the market.

The Department for Levelling Up has consulted on planning reforms to speed up construction of purpose-built blocks. Subsidies for build-to-rent investors and tax breaks for landlords letting to students have also been suggested. Each policy has different effects on supply, equity and the wider housing market, and policy choices may also affect local communities and the private rental sector.

Critics argue that the deeper cause is rapid expansion of student numbers without matching investment in housing capacity.`,
        source: "Department for Levelling Up consultation, 2024",
      },
      q01: "Using the data in Extract A (Table 1), calculate the percentage increase in the average weekly rent for purpose-built student accommodation between 2018 and 2024. Give your answer to one decimal place.",
      q01Answer: "27.2%",
      q01Hint: "((187-147)/147)×100 = 27.2%",
      q02: "Explain how the data in Extract A (Table 1) show that the market for purpose-built student accommodation has tightened between 2018 and 2024.",
      q03: "Extract B (lines 1–3) states that 'Universities have expanded the number of places on offer to students, but the supply of student accommodation is highly inelastic'. With the help of a diagram, explain the impact of the increase in the number of students attending university on the market for student accommodation.",
      q03Diagram: {
        primary: "A demand and supply diagram for student accommodation showing a rightward shift in demand against a near-vertical short-run supply curve, with original equilibrium (P₁, Q₁) and new equilibrium (P₂, Q₂).",
        alternatives: ["A diagram showing inelastic supply with a price rise after a demand shift"],
        requiredLabels: ["Price (rent)", "Quantity of bed spaces", "D₁", "D₂", "S (inelastic)", "P₁", "P₂", "Q₁", "Q₂"],
        figureKey: "sd-housing.svg",
        figureCaption: "Figure 2 — Demand shift against inelastic short-run supply (PBSA market)",
      },
      q04: "Extract C (lines 1–3) states that 'A maximum rent can help keep the cost of student accommodation lower than it would otherwise be, but risks some landlords withdrawing from the market'. Using the data in the extracts and your knowledge of economics, discuss the advantages and disadvantages of policies the government might introduce to improve the market for student accommodation.",
    },
    c2: {
      title: "Public transport and urban congestion",
      extractD: `**Figure 1:** Bus passenger journeys (millions) in selected English city regions, 2019–2024
Source: Department for Transport Bus Statistics, 2024

| City region | 2019 | 2021 | 2023 | 2024 |
|-------------|------|------|------|------|
| Greater Manchester | 191 | 113 | 161 | 172 |
| West Midlands | 268 | 152 | 213 | 219 |
| West Yorkshire | 142 | 81 | 121 | 128 |
| Liverpool City Region | 109 | 64 | 92 | 96 |`,
      extractE: {
        subtitle: "Bus subsidies return to UK city regions",
        body: `Several English city regions reintroduced fare caps and bus subsidies in 2024, citing congestion, air quality and access to work. Greater Manchester's £2 single fare, launched as part of franchising, saw bus journeys recover sharply.

A spokesperson for the Department for Transport described public transport as "the backbone of urban productivity", arguing that lower fares improve labour mobility for low-income households who spend a disproportionate share of income on travel.

Citizens Advice highlighted that 13.3% of low-income households reported missing work or appointments because of transport costs in the previous year.`,
        source: "News reports, 2024",
      },
      extractF: {
        subtitle: "The case for and against transport subsidies",
        body: `Supporters of bus subsidies emphasise positive externalities: lower congestion, fewer emissions, and improved access to work and education. Cost–benefit appraisals from Transport for the North suggest some routes deliver £2.40 of social value for every £1 spent.

Critics question whether subsidies are value for money. Resolution Foundation analysis warned that broad fare caps can be poorly targeted and may benefit higher-income commuters as well as the low-paid. Government failure may also arise if subsidies entrench inefficient operators and discourage innovation.

Alternative policies — such as targeted concessionary fares, road pricing, or capital investment in segregated bus lanes — may achieve similar objectives with smaller fiscal cost.`,
        source: "Resolution Foundation, 2024",
      },
      q05: "Using the data in Extract D, calculate the percentage change in bus passenger journeys in Greater Manchester between 2019 and 2024. Give your answer to one decimal place.",
      q05Answer: "−9.9%",
      q05Hint: "((172-191)/191)×100 = −9.9%",
      q06: "Explain how the data in Extract D show that the recovery in bus passenger journeys has been uneven across English city regions.",
      q07: "Extract F (lines 1–3) states that 'lower congestion, fewer emissions, and improved access to work and education' are positive externalities of bus subsidies. With the help of a diagram, explain how a subsidy on bus travel could improve allocative efficiency in an urban transport market.",
      q07Diagram: {
        primary: "A positive consumption externality diagram showing MPB below MSB, with a per-unit subsidy shifting MPB up to align with MSB and removing the welfare loss triangle.",
        alternatives: ["A market diagram with a subsidy lowering price and increasing quantity"],
        requiredLabels: ["Price/Cost/Benefit", "Quantity of bus journeys", "MPC=MSC", "MPB", "MSB", "Q₁", "Q*", "Welfare gain"],
        figureKey: "pos-externality-welfare.svg",
        figureCaption: "Figure 3 — Positive consumption externality with corrective subsidy",
      },
      q08: "Extract F (lines 4–6) states: 'broad fare caps can be poorly targeted and may benefit higher-income commuters as well as the low-paid'. Using the data in the extracts and your knowledge of economics, evaluate the view that subsidies for public transport are the most effective way to tackle urban congestion.",
    },
    essays: [
      {
        stimulus: "In April 2024 the UK National Living Wage rose to £11.44 per hour, an increase of 9.8% on the previous rate. Some firms warned about hiring intentions in low-margin sectors, while the Resolution Foundation estimated that 2.7 million workers were directly affected.",
        explain: "Explain why a national minimum wage may affect employment in different ways depending on the structure of the labour market.",
        evaluate: "Evaluate the view that the National Living Wage always improves the welfare of low-paid workers in the UK.",
        explainContent: [
          "Define national minimum wage and identify the level above the equilibrium wage in a competitive labour market.",
          "Standard analysis: surplus of labour (excess supply) when MNW set above equilibrium.",
          "Monopsony case: a binding NMW can simultaneously raise wages and increase employment up to the competitive level.",
        ],
        evaluateContent: [
          "Benefits: higher pay, reduced in-work poverty, possible productivity gains via efficiency wages.",
          "Costs: potential job losses, substitution toward automation, reduced hours, informal employment.",
          "Magnitude depends on PED for labour, market structure, regional wage differentials, and how firms absorb costs (margins vs prices).",
          "Judgement: net welfare effect contingent on labour market structure and complementary policies (e.g. training).",
        ],
        diagram: {
          primary: "A competitive labour market with W_min above the equilibrium wage W*, showing excess supply of labour (unemployment) between the quantity demanded and supplied at the minimum wage.",
          requiredLabels: ["Wage (W)", "Quantity of labour (L)", "S_L", "D_L", "W_min", "W*", "Excess supply (unemployment)"],
          figureKey: "labour-union.svg",
          figureCaption: "Figure 4 — Minimum wage above competitive equilibrium",
        },
      },
      {
        stimulus: "In 2024 Public Health England reported that 64% of UK adults are overweight or obese. The Soft Drinks Industry Levy raised £415m in 2024 and prompted reformulation by major brands; the government has consulted on extending the levy to high-sugar milk-based drinks.",
        explain: "Explain why sugary drinks may be considered a demerit good.",
        evaluate: "Assess the view that an indirect tax is the most effective way to reduce the consumption of demerit goods.",
        explainContent: [
          "Define demerit good and the role of imperfect information / negative externalities of consumption.",
          "MSB < MPB diagram (informal in 15-mark) explaining over-consumption.",
          "Application: NHS costs, productivity losses, reformulation incentive of the levy.",
        ],
        evaluateContent: [
          "Strengths of indirect tax: internalises externality, raises revenue, encourages reformulation (evidence: SDIL).",
          "Weaknesses: regressive incidence, smuggling/substitution, PED on inelastic goods limits effect on consumption.",
          "Alternatives: education, advertising restrictions, regulation, nudges (default options, labelling).",
          "Judgement: most effective when used in combination; indirect tax alone insufficient.",
        ],
        diagram: {
          primary: "A negative consumption externality / demerit good diagram with MPB above MSB and over-consumption at the free-market equilibrium; an indirect tax shifts S to S+tax to reduce quantity to the socially optimal level.",
          requiredLabels: ["Price", "Quantity", "S=MPC", "S+tax", "MPB=D", "MSB", "Q₁", "Q*", "Welfare loss"],
          figureKey: "indirect-tax.svg",
          figureCaption: "Figure 5 — Indirect tax on a demerit good (SDIL)",
        },
      },
      {
        stimulus: "The UK Emissions Trading Scheme covers around a third of UK emissions. The carbon price rose from £22/tonne in 2019 to £78/tonne in 2024, prompting major manufacturers including the steel and chemical industries to lobby for relief, citing international competitiveness.",
        explain: "Explain how a tradable pollution permit scheme aims to reduce a negative externality of production.",
        evaluate: "Evaluate the view that market-based environmental policies are more effective than government regulation in tackling climate change.",
        explainContent: [
          "Define negative externality of production; MSC > MPC; welfare loss.",
          "Mechanism of permits: cap, allocation, trading; firms with low MAC sell, those with high MAC buy.",
          "Equimarginal principle: efficient distribution of abatement effort across firms.",
        ],
        evaluateContent: [
          "Market-based strengths: cost-efficient abatement, dynamic incentive to innovate, revenue if permits auctioned.",
          "Market-based weaknesses: cap-setting difficult, leakage, price volatility, distributional concerns.",
          "Regulation strengths: certainty of outcomes, simpler to enforce in some sectors.",
          "Judgement: effectiveness depends on sector characteristics; mixed approaches typically optimal.",
        ],
        diagram: {
          primary: "A negative production externality diagram with MSC above MPC; the welfare loss triangle exists at the free-market equilibrium where Q₁ > Q*. Permits / tax internalise the externality, shifting MPC up to MSC.",
          requiredLabels: ["Price", "Quantity", "MPC", "MSC", "D=MPB=MSB", "Q₁", "Q*", "Welfare loss"],
          figureKey: "neg-externality-welfare.svg",
          figureCaption: "Figure 6 — Negative production externality and welfare loss",
        },
      },
    ],
  },
};

// Sets B–G follow the same shape but cover different topics.
// To keep file size manageable, we declare them more compactly as variants on the canonical Set A pattern.

const ADDITIONAL_SETS: Array<[string, AqaPaper1OverrideSet]> = [
  ["econ-p1-b", buildSetVariant({
    setLabel: "Predicted Paper Set B",
    micro1: { topic: "energy market concentration", focus: "oligopoly" },
    micro2: { topic: "natural monopoly in water supply", focus: "regulation" },
    essayTopics: ["minimum wage and labour markets", "negative externalities of fast fashion", "competition policy in digital markets"],
  })],
  ["econ-p1-c", buildSetVariant({
    setLabel: "Predicted Paper Set C",
    micro1: { topic: "household energy price cap", focus: "maximum prices" },
    micro2: { topic: "industrial pollution from chemicals", focus: "negative externalities" },
    essayTopics: ["price elasticity and tax incidence", "merit goods and healthcare", "tradable pollution permits"],
  })],
  ["econ-p1-d", buildSetVariant({
    setLabel: "Predicted Paper Set D",
    micro1: { topic: "the UK gaming industry merger", focus: "monopoly power" },
    micro2: { topic: "regulation of natural monopolies", focus: "natural monopoly" },
    essayTopics: ["asymmetric information in healthcare", "minimum prices in alcohol markets", "labour market discrimination"],
  })],
  ["econ-p1-e", buildSetVariant({
    setLabel: "Predicted Paper Set E",
    micro1: { topic: "UK retail energy oligopoly", focus: "oligopoly" },
    micro2: { topic: "merit goods and vaccinations", focus: "merit goods" },
    essayTopics: ["price discrimination by airlines", "rent controls in London housing", "monopsony in nursing"],
  })],
  ["econ-p1-f", buildSetVariant({
    setLabel: "Predicted Paper Set F",
    micro1: { topic: "the National Living Wage and hospitality", focus: "labour markets" },
    micro2: { topic: "asymmetric information in online markets", focus: "information failure" },
    essayTopics: ["productive vs allocative efficiency", "tradable permits vs carbon tax", "trade union power in public sector"],
  })],
  ["econ-p1-g", buildSetVariant({
    setLabel: "Predicted Paper Set G",
    micro1: { topic: "regulation of large technology platforms", focus: "monopoly power" },
    micro2: { topic: "contestable markets in low-cost airlines", focus: "contestability" },
    essayTopics: ["sugar tax and demerit goods", "subsidies for renewable energy", "kinked demand and oligopoly"],
  })],
];

interface VariantSpec {
  setLabel: string;
  micro1: { topic: string; focus: string };
  micro2: { topic: string; focus: string };
  essayTopics: [string, string, string];
}

/**
 * Variant builder — creates structurally complete sets with topic-flavoured
 * extracts. Keeps individual override files small while preserving authentic
 * AQA structure (two contexts, three essays, level-based MS).
 */
function buildSetVariant(v: VariantSpec): AqaPaper1OverrideSet {
  return {
    setLabel: v.setLabel,
    c1: {
      title: `Context 1: ${v.micro1.topic}`,
      extractA: `**Table 1:** Indicators relevant to ${v.micro1.topic}, UK, 2019–2024
Source: Office for National Statistics, 2024

| Year | Indicator A | Indicator B | Indicator C | Indicator D |
|------|-------------|-------------|-------------|-------------|
| 2019 | 142 | 18.3 | 4.1 | 28.7 |
| 2021 | 167 | 12.4 | 5.2 | 32.4 |
| 2023 | 184 | 8.1 | 6.7 | 41.6 |
| 2024 | 192 | 6.2 | 7.3 | 47.2 |`,
      extractB: {
        subtitle: `Pressure builds in ${v.micro1.topic}`,
        body: `The Competition and Markets Authority published findings in 2024 showing rising concentration in ${v.micro1.topic}. A spokesperson for the Resolution Foundation noted that "consumer outcomes have deteriorated" over the period, with prices outpacing average earnings growth of 6.6%.

Industry representatives argued that high regulatory and financing costs make scale necessary, while consumer groups pointed to falling switching rates and weak competitive pressure as evidence of market power. The Office for Budget Responsibility estimated the welfare cost at around £1.7bn annually.

Smaller firms reported that 13.3% of new entrants exited within two years, citing barriers to entry and predatory pricing by incumbents.`,
        source: "News reports, 2024",
      },
      extractC: {
        subtitle: `Policy options for ${v.micro1.topic}`,
        body: `Policymakers face a difficult balance. Direct regulation through the CMA could limit ${v.micro1.focus}, but risks deterring investment. Some economists argue that price caps would protect consumers in the short run but blunt incentives to innovate.

The Institute for Fiscal Studies has suggested that competition could be improved through structural remedies — splitting up dominant firms, mandating data sharing, or lowering switching costs. The Bank of England has warned that excessive intervention could reduce dynamic efficiency in the long run.

Alternative approaches include encouraging market entry through subsidies for new entrants, public procurement rules, and stronger consumer protection standards.`,
        source: "Institute for Fiscal Studies, 2024",
      },
      q01: `Using the data in Extract A, calculate the percentage change in Indicator A between 2019 and 2024. Give your answer to one decimal place.`,
      q01Answer: "35.2%",
      q01Hint: "((192-142)/142)×100",
      q02: `Explain how the data in Extract A show that ${v.micro1.topic} has changed between 2019 and 2024.`,
      q03: `Extract B (lines 1–3) states that "consumer outcomes have deteriorated". With the help of a diagram, explain how ${v.micro1.focus} can lead to a welfare loss in ${v.micro1.topic}.`,
      q03Diagram: {
        primary: `A diagram appropriate to ${v.micro1.focus} (e.g. monopoly diagram showing P>MC welfare loss, or oligopoly kinked demand) with clearly labelled equilibrium and welfare loss triangle.`,
        requiredLabels: ["Price/Cost", "Quantity", "AC", "MC", "AR (D)", "MR", "Pₘ", "Qₘ", "Welfare loss"],
        figureKey: /oligopoly|kinked/i.test(v.micro1.focus) ? "caie-kinked-demand.svg" : "monopoly-profit.svg",
        figureCaption: `Figure — ${v.micro1.focus} (welfare analysis)`,
      },
      q04: `Extract C (lines 1–3) discusses regulation, price caps, and structural remedies. Using the data in the extracts and your knowledge of economics, evaluate the view that government intervention is the most effective way to address ${v.micro1.focus} in ${v.micro1.topic}.`,
    },
    c2: {
      title: `Context 2: ${v.micro2.topic}`,
      extractD: `**Figure 1:** Selected indicators for ${v.micro2.topic}, UK, 2019–2024
Source: Department for Business and Trade, 2024

| Year | Output | Price (£) | Concentration ratio (CR3, %) | Investment (£m) |
|------|--------|-----------|------------------------------|------------------|
| 2019 | 88 | 1254 | 73 | 412 |
| 2021 | 84 | 1389 | 71 | 467 |
| 2023 | 79 | 1568 | 76 | 521 |
| 2024 | 81 | 1611 | 78 | 548 |`,
      extractE: {
        subtitle: `${v.micro2.topic}: market features under scrutiny`,
        body: `The Office for National Statistics reported that ${v.micro2.topic} continues to display features of ${v.micro2.focus}. A spokesperson for Citizens Advice noted that "consumers have very limited ability to switch supplier", with switching rates of just 6.2% in 2024.

Industry analysts at the Institute for Fiscal Studies argued that high fixed costs and significant economies of scale create natural barriers to entry. Investment of £548m in 2024 helped sustain capacity, but the long-run cost of capital has risen since the Bank of England's interest rate cycle began.

Critics argue that without intervention, prices will continue to rise faster than average household income.`,
        source: "Citizens Advice and ONS, 2024",
      },
      extractF: {
        subtitle: `Should the government intervene in ${v.micro2.topic}?`,
        body: `Some economists argue that ${v.micro2.focus} justifies regulation, public ownership or price caps. Others warn that excessive intervention may reduce dynamic efficiency and discourage long-term investment.

The Resolution Foundation has proposed targeted support for low-income households facing rising prices in ${v.micro2.topic}. The CMA has consulted on remedies including mandatory transparency, structural separation of network and retail, and tighter regulation of profit margins.

Internationally, the OECD has highlighted that countries with stronger competition policy in network industries tend to achieve lower consumer prices and higher long-run investment.`,
        source: "Resolution Foundation and OECD, 2024",
      },
      q05: `Using the data in Extract D, calculate the change in the concentration ratio (CR3) between 2019 and 2024.`,
      q05Answer: "+5 percentage points",
      q05Hint: "78 - 73 = 5 percentage points",
      q06: `Explain how the data in Extract D show that ${v.micro2.topic} displays features of ${v.micro2.focus}.`,
      q07: `Extract E (lines 4–6) states that "high fixed costs and significant economies of scale create natural barriers to entry". With the help of a diagram, explain how ${v.micro2.focus} can lead to outcomes that differ from those of a perfectly competitive market.`,
      q07Diagram: {
        primary: `A diagram illustrating ${v.micro2.focus} (e.g. natural monopoly LRAC falling through MES, or contestability with hit-and-run entry).`,
        requiredLabels: ["Price/Cost", "Quantity", "LRAC", "MC", "AR", "MR", "Equilibrium points"],
        figureKey: /contestab/i.test(v.micro2.focus) ? "contestable.svg" : "natural-monopoly.svg",
        figureCaption: `Figure — ${v.micro2.focus}`,
      },
      q08: `Extract F (lines 1–3) presents arguments for and against intervention. Using the data in the extracts and your knowledge of economics, assess the view that government regulation always improves outcomes in markets characterised by ${v.micro2.focus}.`,
    },
    essays: v.essayTopics.map((topic, i) => ({
      stimulus: `In 2024 the topic of ${topic} attracted significant policy attention in the UK. The Office for National Statistics reported relevant indicators, and the Resolution Foundation estimated that around 2.7 million workers and consumers were directly affected. Ministers debated the appropriate balance between market mechanisms and government intervention.`,
      explain: `Explain how ${topic} can affect the allocation of resources in a market economy.`,
      evaluate: `Evaluate the view that government intervention is the most effective way to address issues arising from ${topic}.`,
      explainContent: [
        `Define the key economic concept underlying ${topic}.`,
        `Apply relevant theory (e.g. externalities, market power, information failure) to explain the mechanism.`,
        `Use a diagram (where appropriate) to support the explanation.`,
      ],
      evaluateContent: [
        `Strengths of intervention: corrects market failure, addresses equity, raises revenue.`,
        `Weaknesses: government failure, regulatory capture, unintended consequences, distributional impact.`,
        `Alternative policies: market-based instruments vs regulation vs information provision.`,
        `Judgement: effectiveness depends on context, magnitude of failure, and policy design.`,
      ],
      diagram: {
        primary: `A diagram appropriate to ${topic}: market with intervention, externality, or labour market analysis.`,
        requiredLabels: ["Price/Wage", "Quantity", "S", "D", "Equilibrium", "Welfare effect"],
        figureKey:
          /externalit|pollut|sugar|tax|fashion|carbon/i.test(topic) ? "neg-externality-welfare.svg" :
          /minimum wage|labour|monopsony|union|nursing/i.test(topic) ? "labour-union.svg" :
          /merit|vaccin|healthcare|education/i.test(topic) ? "pos-externality-welfare.svg" :
          /price discrimination|monopoly|natural monopoly|digital|tech/i.test(topic) ? "monopoly-profit.svg" :
          /rent|max(imum)?\s*price|ceiling/i.test(topic) ? "sd-housing.svg" :
          /min(imum)?\s*price|alcohol/i.test(topic) ? "indirect-tax.svg" :
          "indirect-tax.svg",
        figureCaption: `Figure — Reference diagram for ${topic}`,
      },
    })) as AqaPaper1OverrideSet["essays"],
  };
}

ADDITIONAL_SETS.forEach(([id, set]) => {
  SETS[id] = set;
});

// ── Renderers ────────────────────────────────────────────────────────────────

function lineNumber(body: string): string {
  // Insert line-number markers every ~5 logical lines.
  const sentences = body.split(/(?<=\.)\s+/);
  return sentences
    .map((s, i) => {
      if ((i + 1) % 3 === 0) return `${s}\n[line ${(i + 1) * 2}]`;
      return s;
    })
    .join(" ");
}

function renderExtract(label: string, ext: { subtitle: string; body: string; source: string }): string {
  return `### Extract ${label}
*${ext.subtitle}*

${lineNumber(ext.body)}

*Source: ${ext.source}*`;
}

function buildPaper(set: AqaPaper1OverrideSet): string {
  return `# AQA A-Level Economics (7136) — Paper 1: Markets and Market Failure — ${set.setLabel}

**Time: 2 hours | Total: 80 marks**

---

## Section A — Data response (40 marks)

### Context 1 — ${set.c1.title}
*Total for this Context: 40 marks*

Study Extracts A, B and C and then answer all parts of Context 1 which follow.

### Extract A
${set.c1.extractA}

${renderExtract("B", set.c1.extractB)}

${renderExtract("C", set.c1.extractC)}

Question 01 [2 marks]
${set.c1.q01}

Question 02 [4 marks]
${set.c1.q02}

Question 03 [9 marks]
${set.c1.q03}${figureMd(set.c1.q03Diagram)}

Question 04 [25 marks]
${set.c1.q04}

---

## Section B — Essay (40 marks)

**Answer both parts of the essay below.**

---

${set.essays[0].stimulus}

Question 05 [15 marks]
${set.essays[0].explain}${figureMd(set.essays[0].diagram)}

Question 06 [25 marks]
${set.essays[0].evaluate}`;
}

function buildMarkScheme(set: AqaPaper1OverrideSet): string {
  const sections: string[] = [
    `# AQA A-Level Economics (7136/1) — Mark Scheme — ${set.setLabel}`,
    `**Total: 80 marks** | Section A: data response (40 marks). Section B: answer ONE essay (40 marks).`,
    `---`,
    `## Section A — Context 1`,
    renderPointMark({
      questionLabel: "0\u20091",
      totalMarks: 2,
      expectedAnswer: `${set.c1.q01Answer} (working: ${set.c1.q01Hint}).`,
      markPoints: [
        { description: `Correct answer (${set.c1.q01Answer}) to the required decimal places, with units/symbol`, marks: 2 },
        { description: "Correct method but wrong final answer, OR correct answer with wrong formatting", marks: 1 },
      ],
    }),
    renderPointMark({
      questionLabel: "0\u20092",
      totalMarks: 4,
      expectedAnswer: "Two explained data references, each developed.",
      markPoints: [
        { description: "Identifies a relevant data point from Extract A", marks: 1 },
        { description: "Develops the data point with linked economic reasoning", marks: 1 },
        { description: "Identifies a second relevant data point", marks: 1 },
        { description: "Develops the second point with linked reasoning", marks: 1 },
      ],
    }),
    renderLevelMark({
      questionLabel: "0\u20093",
      totalMarks: 9,
      diagram: set.c1.q03Diagram,
      indicativeContent: [
        "K: definitions of demand, supply, equilibrium and price elasticity of supply.",
        "App: explicit reference to Extract B and the inelastic short-run supply.",
        "An: chain showing rising demand against inelastic supply produces large price rise and small quantity rise.",
        "E (not required at full level): brief acknowledgement of long-run elasticity.",
      ],
    }),
    renderLevelMark({
      questionLabel: "0\u20094",
      totalMarks: 25,
      indicativeContent: [
        "K: definitions of relevant policies (maximum prices, subsidies, planning reform).",
        "App: explicit reference to Extracts A–C and the data on rents, vacancy rates and student numbers.",
        "An: chains of reasoning for each policy with clear cause-and-effect.",
        "E: counter-arguments (landlord exit, time lags, distributional impact); prioritised judgement with supported conclusion.",
      ],
    }),
    `---`,
    `## Section B — Essay`,
  ];

  const essay = set.essays[0];
  sections.push(
    renderLevelMark({
      questionLabel: "0\u20095",
      totalMarks: 15,
      diagram: essay.diagram,
      indicativeContent: essay.explainContent,
    }),
  );
  sections.push(
    renderLevelMark({
      questionLabel: "0\u20096",
      totalMarks: 25,
      indicativeContent: essay.evaluateContent,
    }),
  );

  return sections.join("\n\n");
}

const PAPER_CONTENT: Record<string, string> = {};
const PAPER_MARK_SCHEMES: Record<string, string> = {};
Object.entries(SETS).forEach(([id, set]) => {
  PAPER_CONTENT[id] = buildPaper(set);
  PAPER_MARK_SCHEMES[id] = buildMarkScheme(set);
});

export function getAqaPaper1OverrideContent(paperId: string): string | null {
  return PAPER_CONTENT[paperId] ?? null;
}

export function getAqaPaper1OverrideMarkScheme(paperId: string): string | null {
  return PAPER_MARK_SCHEMES[paperId] ?? null;
}
