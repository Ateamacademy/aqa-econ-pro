import {
  renderLevelMark,
  renderPointMark,
} from "./aqaMarkSchemeBuilder";

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

interface VariantSpec {
  setLabel: string;
  macro1: { topic: string; focus: string };
  macro2: { topic: string; focus: string };
  essayTopics: [string, string, string];
}

interface AqaPaper2Set {
  setLabel: string;
  c1: ContextBlock;
  c2: ContextBlock;
  essays: EssayBlock[];
}

interface ContextBlock {
  title: string;
  data: string; // table/figure markdown
  prose1: { subtitle: string; body: string; source: string };
  prose2: { subtitle: string; body: string; source: string };
  q1: string; q1Answer: string; q1Working: string;
  q2: string;
  q3: string; q3Diagram: DiagramSpec;
  q4: string;
}

interface EssayBlock {
  stimulus: string;
  explain: string;
  evaluate: string;
  explainContent: string[];
  evaluateContent: string[];
  diagram?: DiagramSpec;
}

function makeContext(
  number: 1 | 2,
  topic: string,
  focus: string,
  questionStart: number,
): ContextBlock {
  const labels = number === 1 ? ["A", "B", "C"] : ["D", "E", "F"];
  return {
    title: topic,
    data: `**Table 1:** UK macroeconomic indicators relevant to ${topic}, 2019–2024
Source: Office for National Statistics, 2024

| Year | GDP growth (%) | CPI inflation (%) | Unemployment (%) | Bank Rate (%) |
|------|----------------|-------------------|------------------|---------------|
| 2019 | 1.6 | 1.8 | 3.8 | 0.75 |
| 2021 | 7.6 | 2.6 | 4.5 | 0.10 |
| 2022 | 4.3 | 9.1 | 3.7 | 3.50 |
| 2023 | 0.1 | 7.3 | 4.2 | 5.25 |
| 2024 | 0.6 | 3.2 | 4.3 | 5.00 |`,
    prose1: {
      subtitle: `${topic}: pressures on the UK economy`,
      body: `The Bank of England raised Bank Rate from 0.1% in December 2021 to 5.25% by August 2023 in response to inflation peaking at 11.1% in October 2022. The Resolution Foundation reported that 6.6% pay growth in services contributed to underlying inflation persistence, while CPI inflation fell to 4.0% by December 2023.

A spokesperson for the Bank of England warned in 2024 that "the full impact of past rate rises has not yet been felt", citing variable mortgage exposure of around 1.6 million households. The Office for Budget Responsibility estimated that debt-servicing costs had risen to 3.9% of GDP, the highest since the 1980s.

Some economists argued that supply-side shocks from the war in Ukraine and the 2021 energy price surge made tight monetary policy necessary; others pointed out that monetary policy operates with long and variable lags.`,
      source: "Resolution Foundation and OBR, 2024",
    },
    prose2: {
      subtitle: `Policy responses to ${focus}`,
      body: `Critics of tight monetary policy argue that ${focus} cannot be effectively controlled by interest rates alone, especially when imported through energy and food prices. The Institute for Fiscal Studies has highlighted that around 13.3% of household disposable income is now spent on energy, transport and food.

The Bank of England has emphasised the importance of anchoring inflation expectations to prevent a wage-price spiral. The IMF has cautioned that premature loosening could undo progress, while the OECD has highlighted the trade-off between containing inflation and supporting growth.

Fiscal policy has remained restrictive, with HM Treasury maintaining tight departmental spending and introducing fiscal rules requiring debt to fall as a share of GDP within five years. The Office for Budget Responsibility has warned that meeting these rules will require difficult choices.`,
      source: "IMF, OECD and HM Treasury, 2024",
    },
    q1: `Using the data in Extract ${labels[0]}, calculate the change in CPI inflation between 2022 and 2024. State clearly whether this is an increase or a decrease.`,
    q1Answer: "−5.9 percentage points (decrease)",
    q1Working: "3.2 - 9.1 = −5.9 percentage points (decrease)",
    q2: `Explain how the data in Extract ${labels[0]} show that UK macroeconomic conditions deteriorated between 2021 and 2023.`,
    q3: `Extract ${labels[1]} (lines 1–3) states that "the full impact of past rate rises has not yet been felt". With the help of a diagram and using the extracts, analyse how a sustained rise in interest rates is likely to affect UK macroeconomic performance.`,
    q3Diagram: {
      primary: "An AD/AS diagram showing AD shifting left from AD₁ to AD₂, with the price level falling from P₁ to P₂ and real output falling from Y₁ to Y₂.",
      alternatives: ["A diagram showing the transmission mechanism from interest rates to consumption and investment"],
      requiredLabels: ["Price level", "Real output (Y)", "AD₁", "AD₂", "SRAS", "LRAS", "P₁", "P₂", "Y₁", "Y₂", "Yfe"],
      figureKey:
        /supply\s*shock|cost.?push|oil|energy/i.test(focus) ? "cost-push.svg" :
        /demand|interest|monetary|fiscal|aggregate demand/i.test(focus) ? "ad-as-g.svg" :
        /growth|lras|productivity/i.test(focus) ? "adas-equilibrium.svg" :
        /trade|export|exchange|globalisation/i.test(focus) ? "caie-j-curve.svg" :
        "ad-as-g.svg",
      figureCaption: `Figure · AD/AS analysis of ${focus}`,
    },
    q4: `Extract ${labels[2]} (lines 1–3) states: "${focus} cannot be effectively controlled by interest rates alone". Using the data in the extracts and your knowledge of economics, evaluate the view that monetary policy is the most effective tool for managing ${focus} in the UK.`,
  };
}

function buildSet(v: VariantSpec): AqaPaper2Set {
  return {
    setLabel: v.setLabel,
    c1: makeContext(1, v.macro1.topic, v.macro1.focus, 1),
    c2: makeContext(2, v.macro2.topic, v.macro2.focus, 5),
    essays: v.essayTopics.map((topic) => ({
      stimulus: `In November 2024, the Office for Budget Responsibility published its assessment of the UK economy, highlighting issues around ${topic}. The Bank of England warned of risks to growth, while the Resolution Foundation estimated that around £1.7bn was at stake annually for affected households. Ministers debated whether monetary, fiscal or supply-side policy offered the best response.`,
      explain: `Explain how ${topic} can affect macroeconomic performance in the UK.`,
      evaluate: `Evaluate the view that supply-side policies are the most effective way to address ${topic}.`,
      explainContent: [
        `Define key macro concept underpinning ${topic} (e.g. AD, AS, multiplier, exchange rate).`,
        `Apply theory using AD/AS or other diagram framework.`,
        `Develop chain showing impact on growth, inflation, unemployment, BoP.`,
      ],
      evaluateContent: [
        `Strengths of supply-side: long-run growth, productive capacity, lower NAIRU.`,
        `Weaknesses: long time lags, high fiscal cost, distributional effects.`,
        `Compare with demand-side fiscal and monetary policy.`,
        `Judgement: best mix depends on cause of the problem and economic conditions.`,
      ],
      diagram: {
        primary: `An AD/AS or related macro diagram appropriate to ${topic}, with clearly labelled axes, equilibrium points and shifts.`,
        requiredLabels: ["Price level", "Real output (Y)", "AD", "SRAS", "LRAS", "Equilibrium points"],
        figureKey:
          /phillips|nairu|unemployment/i.test(topic) ? "phillips-srlr.svg" :
          /j.?curve|marshall|exchange|sterling|depreciation/i.test(topic) ? "caie-j-curve.svg" :
          /fiscal|public|debt|crowding|consolidation/i.test(topic) ? "adas-fiscal.svg" :
          /supply.?side|productivity|skills|growth|lras|carbon|green/i.test(topic) ? "adas-equilibrium.svg" :
          /protectionism|trade|tariff|liberalisation/i.test(topic) ? "quota.svg" :
          "ad-as-g.svg",
        figureCaption: `Figure · Reference diagram for ${topic}`,
      },
    })),
  };
}

const SETS: Record<string, AqaPaper2Set> = {
  "econ-p2-a": buildSet({
    setLabel: "Predicted Paper Set A",
    macro1: { topic: "Bank Rate and the cost of borrowing", focus: "demand-pull inflation" },
    macro2: { topic: "the UK current account deficit", focus: "external imbalances" },
    essayTopics: ["a deep recession", "rising public sector debt", "exchange rate depreciation"],
  }),
  "econ-p2-b": buildSet({
    setLabel: "Predicted Paper Set B",
    macro1: { topic: "public investment in infrastructure", focus: "weak productivity growth" },
    macro2: { topic: "developing economies and primary commodity dependency", focus: "trade volatility" },
    essayTopics: ["the UK output gap", "fiscal consolidation", "trade liberalisation"],
  }),
  "econ-p2-c": buildSet({
    setLabel: "Predicted Paper Set C",
    macro1: { topic: "the tight UK labour market", focus: "wage-driven inflation" },
    macro2: { topic: "globalisation and UK income distribution", focus: "structural unemployment" },
    essayTopics: ["full employment", "labour market flexibility", "the Phillips curve"],
  }),
  "econ-p2-d": buildSet({
    setLabel: "Predicted Paper Set D",
    macro1: { topic: "sterling depreciation and trade", focus: "the J-curve effect" },
    macro2: { topic: "exchange rate management in emerging economies", focus: "capital flow volatility" },
    essayTopics: ["floating vs fixed exchange rates", "capital controls", "the Marshall–Lerner condition"],
  }),
  "econ-p2-e": buildSet({
    setLabel: "Predicted Paper Set E",
    macro1: { topic: "rising debt servicing costs", focus: "fiscal sustainability" },
    macro2: { topic: "external debt and developing economies", focus: "the role of the IMF" },
    essayTopics: ["fiscal rules", "crowding out", "international institutions"],
  }),
  "econ-p2-f": buildSet({
    setLabel: "Predicted Paper Set F",
    macro1: { topic: "the UK productivity puzzle", focus: "weak business investment" },
    macro2: { topic: "global productivity slowdown", focus: "trade and technology diffusion" },
    essayTopics: ["supply-side policy mix", "human capital and skills", "protectionism"],
  }),
  "econ-p2-g": buildSet({
    setLabel: "Predicted Paper Set G",
    macro1: { topic: "the UK net zero transition", focus: "decarbonisation costs" },
    macro2: { topic: "climate change as a global externality", focus: "international coordination" },
    essayTopics: ["carbon pricing", "green growth", "the Paris Agreement"],
  }),
};

function lineNumber(body: string): string {
  const sentences = body.split(/(?<=\.)\s+/);
  return sentences
    .map((s, i) => ((i + 1) % 3 === 0 ? `${s}\n[line ${(i + 1) * 2}]` : s))
    .join(" ");
}

function renderExtract(label: string, ext: { subtitle: string; body: string; source: string }): string {
  return `### Extract ${label}
*${ext.subtitle}*

${lineNumber(ext.body)}

*Source: ${ext.source}*`;
}

function buildPaper(set: AqaPaper2Set): string {
  const c1 = set.c1;
  const [e1] = set.essays;
  return `# AQA A-Level Economics (7136) · Paper 2: National and International Economy · ${set.setLabel}

**Time: 2 hours | Total: 80 marks**

---

## Section A · Data response (40 marks)

### ${c1.title}

### Extract A
${c1.data}

${renderExtract("B", c1.prose1)}

${renderExtract("C", c1.prose2)}

Question 01 [2 marks]
${c1.q1}

Question 02 [4 marks]
${c1.q2}

Question 03 [9 marks]
${c1.q3}${figureMd(c1.q3Diagram)}

Question 04 [25 marks]
${c1.q4}

---

## Section B · Essay (40 marks)

You are advised to spend 1 hour on this section. Answer BOTH parts.

${e1.stimulus}

Question 05 [15 marks]
${e1.explain}${figureMd(e1.diagram)}

Question 06 [25 marks]
${e1.evaluate}`;
}

function buildMarkScheme(set: AqaPaper2Set): string {
  const c1 = set.c1;
  const [e1] = set.essays;
  const sections: string[] = [
    `# AQA A-Level Economics (7136/2) · Mark Scheme · ${set.setLabel}`,
    `**Total: 80 marks** | Section A: data response (40 marks, Q01–Q04). Section B: essay (40 marks, Q05–Q06).`,
    `---`,
    `## Section A · Data response (Q01–Q04)`,
    renderPointMark({
      questionLabel: "0\u20091",
      totalMarks: 2,
      expectedAnswer: `${c1.q1Answer} (working: ${c1.q1Working}).`,
      markPoints: [
        { description: `Correct answer (${c1.q1Answer}) with correct sign and units`, marks: 2 },
        { description: "Correct method but wrong final answer", marks: 1 },
      ],
    }),
    renderPointMark({
      questionLabel: "0\u20092",
      totalMarks: 4,
      expectedAnswer: "Two explained references to Extract A data.",
      markPoints: [
        { description: "Identifies first relevant data point", marks: 1 },
        { description: "Develops first point with macro reasoning", marks: 1 },
        { description: "Identifies second relevant data point", marks: 1 },
        { description: "Develops second point with macro reasoning", marks: 1 },
      ],
    }),
    renderLevelMark({
      questionLabel: "0\u20093",
      totalMarks: 9,
      diagram: c1.q3Diagram,
      indicativeContent: [
        "K: definitions of AD, AS, monetary transmission mechanism.",
        "App: explicit reference to Extract B and the Bank Rate path.",
        "An: chain from rate rise → consumption/investment fall → AD shift left → output and price level fall.",
        "Diagram: AD/AS with clear shift, both axes labelled, equilibrium points marked.",
      ],
    }),
    renderLevelMark({
      questionLabel: "0\u20094",
      totalMarks: 25,
      indicativeContent: [
        "K: precise definitions of monetary policy and its transmission mechanism.",
        "App: sustained reference to Extracts A–C and the data path.",
        "An: rigorous chains for monetary, fiscal, and supply-side responses.",
        "E: balanced evaluation; lags, expectations, exchange rate channels; supported judgement.",
      ],
    }),
    `---`,
    `## Section B · Essay (Q05–Q06)`,
    renderLevelMark({
      questionLabel: "0\u20095",
      totalMarks: 15,
      diagram: e1.diagram,
      indicativeContent: e1.explainContent,
    }),
    renderLevelMark({
      questionLabel: "0\u20096",
      totalMarks: 25,
      indicativeContent: e1.evaluateContent,
    }),
  ];

  return sections.join("\n\n");
}

const PAPER_CONTENT: Record<string, string> = {};
const PAPER_MS: Record<string, string> = {};
Object.entries(SETS).forEach(([id, set]) => {
  PAPER_CONTENT[id] = buildPaper(set);
  PAPER_MS[id] = buildMarkScheme(set);
});

export function getAqaPaper2OverrideContent(paperId: string): string | null {
  return PAPER_CONTENT[paperId] ?? null;
}

export function getAqaPaper2OverrideMarkScheme(paperId: string): string | null {
  return PAPER_MS[paperId] ?? null;
}
