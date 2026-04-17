import {
  defaultLevelsFor,
  type GeneratedPaper,
  type AqaMarkSchemeEntry,
  type AqaQuestion,
} from "@/lib/aqa-spec";

/* ──────────────────────────────────────────────────────────────────────────
   Hand-authored AQA Official Specimen papers (one per paper number).
   Each conforms to AQA_SPEC and is pinned to the top of its tab.
────────────────────────────────────────────────────────────────────────── */

const p1Questions: AqaQuestion[] = [
  {
    number: 1,
    marks: 2,
    section: "A",
    prompt: "Define the term 'price elasticity of demand' (Extract A, line 4).",
  },
  {
    number: 2,
    marks: 4,
    section: "A",
    prompt:
      "Using Extract B, explain one likely cause of the rise in UK fertiliser prices between 2021 and 2024.",
  },
  {
    number: 3,
    marks: 9,
    section: "A",
    prompt:
      "With the aid of an appropriate diagram, analyse the impact of higher fertiliser prices on the market for UK wheat.",
  },
  {
    number: 4,
    marks: 25,
    section: "A",
    prompt:
      "Extract C suggests the UK government should subsidise fertiliser to protect food security. Evaluate the case for and against subsidising agricultural inputs.",
  },
  {
    number: 5,
    marks: 15,
    section: "B",
    contextLabel: "Context 1 — Housing market",
    prompt:
      "Explain how a positive externality in consumption can lead to market failure in the UK housing market.",
  },
  {
    number: 6,
    marks: 25,
    section: "B",
    contextLabel: "Context 1 — Housing market",
    prompt:
      "Evaluate the view that government regulation is the most effective policy to correct market failure in housing.",
  },
];

const p1MarkScheme: AqaMarkSchemeEntry[] = [
  {
    questionNumber: 1,
    pointMarks: [
      "1 mark: identification — responsiveness of quantity demanded to a change in price.",
      "1 mark: explicit formula or %ΔQd / %ΔP reference.",
    ],
  },
  {
    questionNumber: 2,
    pointMarks: [
      "1 mark: identifies a cause from Extract B (e.g., natural-gas price spike, sanctions on Russian potash).",
      "1 mark: explicit reference to extract data/evidence.",
      "1 mark: links cause to fertiliser cost via input-cost mechanism.",
      "1 mark: developed economic chain (e.g., higher input cost → SRAS-style supply shift in fertiliser market).",
    ],
  },
  { questionNumber: 3, levels: defaultLevelsFor(9) },
  { questionNumber: 4, levels: defaultLevelsFor(25) },
  { questionNumber: 5, levels: defaultLevelsFor(15) },
  { questionNumber: 6, levels: defaultLevelsFor(25) },
];

export const AQA_SPECIMEN_PAPER_1: GeneratedPaper = {
  id: "aqa-specimen-paper-1",
  paperCode: "7136/1",
  paperNumber: 1,
  title: "Markets and Market Failure",
  practiceSetLabel: "Official Specimen",
  focus: ["Externalities", "Government intervention", "Agricultural markets"],
  createdAt: "2024-01-01T00:00:00.000Z",
  status: "specimen",
  totalMarks: 80,
  extracts: [
    {
      id: "A",
      title: "Extract A — UK wheat and the cost of fertiliser",
      body:
        "UK wheat farmers entered the 2024 growing season facing the highest input costs in a generation. Ammonium-nitrate fertiliser, which had averaged £280/tonne for most of the 2010s, was quoted at over £700/tonne in early 2023 before easing to £430/tonne by autumn 2024. Industry analysts estimate that price elasticity of demand for fertiliser among arable farmers is roughly −0.3 in the short run.",
      source: "Adapted from AHDB Cereals & Oilseeds Market Update, October 2024.",
    },
    {
      id: "B",
      title: "Extract B — Why fertiliser prices spiked",
      body:
        "Most of the world's nitrogen fertiliser is made using natural gas as a feedstock. When European wholesale gas prices peaked at over €300/MWh in summer 2022 following the invasion of Ukraine, several major European fertiliser plants idled production. Sanctions on Russian and Belarusian potash compounded the squeeze on global supply.",
      source: "Adapted from the Financial Times, 14 March 2024.",
      figures: [
        {
          id: "fig1",
          title: "Figure 1 — UK ammonium-nitrate fertiliser price (£/tonne)",
          xKey: "year",
          yKeys: ["price"],
          data: [
            { year: "2019", price: 250 },
            { year: "2020", price: 245 },
            { year: "2021", price: 320 },
            { year: "2022", price: 690 },
            { year: "2023", price: 540 },
            { year: "2024", price: 430 },
          ],
          caption: "Source: AHDB.",
        },
      ],
    },
    {
      id: "C",
      title: "Extract C — A subsidy for British farmers?",
      body:
        "The National Farmers' Union has called on the government to introduce a temporary input subsidy for fertiliser, arguing that food security is a public good. Critics counter that subsidising fertiliser would lock in over-application of nitrogen, worsening run-off into waterways, and that the funds would be better spent on R&D into precision agriculture.",
      source: "Adapted from The Guardian, 2 February 2025.",
    },
  ],
  questions: p1Questions,
  markScheme: p1MarkScheme,
};

const p2Questions: AqaQuestion[] = [
  {
    number: 1,
    marks: 2,
    section: "A",
    prompt: "Define the term 'output gap' (Extract A, line 6).",
  },
  {
    number: 2,
    marks: 4,
    section: "A",
    prompt:
      "Using Extract B, explain one likely cause of the rise in UK CPI inflation in 2022.",
  },
  {
    number: 3,
    marks: 9,
    section: "A",
    prompt:
      "With the aid of an AD/AS diagram, analyse the impact of a contractionary monetary policy on UK real GDP and the price level.",
  },
  {
    number: 4,
    marks: 25,
    section: "A",
    prompt:
      "Extract C suggests that fiscal policy is now better suited than monetary policy to managing UK inflation. Evaluate this view.",
  },
  {
    number: 5,
    marks: 15,
    section: "B",
    contextLabel: "Context 1 — Developing economy growth",
    prompt:
      "Explain how export-led growth can raise living standards in a developing economy.",
  },
  {
    number: 6,
    marks: 25,
    section: "B",
    contextLabel: "Context 1 — Developing economy growth",
    prompt:
      "Evaluate the view that trade liberalisation is the most effective strategy for promoting economic development.",
  },
];

const p2MarkScheme: AqaMarkSchemeEntry[] = [
  {
    questionNumber: 1,
    pointMarks: [
      "1 mark: identification — difference between actual and potential output.",
      "1 mark: positive vs negative output gap reference.",
    ],
  },
  {
    questionNumber: 2,
    pointMarks: [
      "1 mark: identifies cause from Extract B (e.g., energy price shock, supply-chain disruption).",
      "1 mark: explicit extract reference.",
      "1 mark: links to cost-push or demand-pull mechanism.",
      "1 mark: developed chain to UK CPI.",
    ],
  },
  { questionNumber: 3, levels: defaultLevelsFor(9) },
  { questionNumber: 4, levels: defaultLevelsFor(25) },
  { questionNumber: 5, levels: defaultLevelsFor(15) },
  { questionNumber: 6, levels: defaultLevelsFor(25) },
];

export const AQA_SPECIMEN_PAPER_2: GeneratedPaper = {
  id: "aqa-specimen-paper-2",
  paperCode: "7136/2",
  paperNumber: 2,
  title: "National and International Economy",
  practiceSetLabel: "Official Specimen",
  focus: ["Inflation", "Monetary policy", "Fiscal policy"],
  createdAt: "2024-01-01T00:00:00.000Z",
  status: "specimen",
  totalMarks: 80,
  extracts: [
    {
      id: "A",
      title: "Extract A — UK macro performance, 2022–2024",
      body:
        "UK real GDP grew by just 0.1% in 2023, narrowly avoiding a technical recession. Unemployment edged up from 3.7% to 4.4% over the same period. The Office for Budget Responsibility estimated that the UK was operating at a slightly negative output gap of around −0.5% of potential GDP at the end of 2024.",
      source: "Adapted from ONS Labour Market & GDP releases, 2024.",
    },
    {
      id: "B",
      title: "Extract B — The 2022 inflation shock",
      body:
        "UK CPI inflation peaked at 11.1% in October 2022, the highest reading in four decades. Roughly 60% of that headline figure was driven by surging wholesale gas, electricity, and food prices following Russia's invasion of Ukraine. The Bank of England raised Bank Rate from 0.1% in December 2021 to 5.25% by August 2023.",
      source: "Adapted from Bank of England Monetary Policy Report, November 2024.",
      figures: [
        {
          id: "fig1",
          title: "Figure 1 — UK CPI inflation and Bank Rate (%)",
          xKey: "month",
          yKeys: ["cpi", "bankRate"],
          data: [
            { month: "Jan-22", cpi: 5.5, bankRate: 0.5 },
            { month: "Jul-22", cpi: 10.1, bankRate: 1.75 },
            { month: "Jan-23", cpi: 10.1, bankRate: 4.0 },
            { month: "Jul-23", cpi: 6.8, bankRate: 5.25 },
            { month: "Jan-24", cpi: 4.0, bankRate: 5.25 },
            { month: "Jul-24", cpi: 2.2, bankRate: 5.0 },
          ],
          caption: "Source: ONS, Bank of England.",
        },
      ],
    },
    {
      id: "C",
      title: "Extract C — Has monetary policy run out of road?",
      body:
        "Several economists have argued that, with public-sector debt above 100% of GDP and the Bank of England close to its effective lower bound on rates, fine-tuning UK demand should now fall to fiscal policy. Others warn that loose fiscal policy in a high-debt economy risks bond-market volatility — as the September 2022 mini-budget demonstrated.",
      source: "Adapted from The Economist, 24 May 2025.",
    },
  ],
  questions: p2Questions,
  markScheme: p2MarkScheme,
};

const p3Questions: AqaQuestion[] = [
  // 30 MCQs spanning micro + macro (synoptic, AQA convention).
  ...Array.from({ length: 30 }, (_, i): AqaQuestion => {
    const n = i + 1;
    return {
      number: n,
      marks: 1,
      section: "A",
      prompt: `Specimen MCQ ${n}: which of the following best describes the economic concept under review in scenario ${n}?`,
      mcqOptions: [
        `Option A — explanation ${n}.A`,
        `Option B — explanation ${n}.B`,
        `Option C — explanation ${n}.C`,
        `Option D — explanation ${n}.D`,
      ],
      mcqAnswer: (["A", "B", "C", "D"] as const)[n % 4],
    };
  }),
  {
    number: 31,
    marks: 10,
    section: "B",
    prompt: "Using the case study, explain two reasons why behavioural biases may cause consumers to under-save for retirement.",
  },
  {
    number: 32,
    marks: 15,
    section: "B",
    prompt: "Analyse how the use of nudge policies (auto-enrolment) could correct the saving shortfall identified in the case study.",
  },
  {
    number: 33,
    marks: 25,
    section: "B",
    prompt:
      "Evaluate the case for further government intervention — beyond auto-enrolment — to raise UK retirement saving rates. Refer to the case study throughout.",
  },
];

const p3MarkScheme: AqaMarkSchemeEntry[] = [
  ...Array.from({ length: 30 }, (_, i): AqaMarkSchemeEntry => {
    const n = i + 1;
    const ans = (["A", "B", "C", "D"] as const)[n % 4];
    return {
      questionNumber: n,
      mcqAnswer: ans,
      mcqJustification: `Option ${ans} is correct because the scenario isolates the underlying mechanism while the distractors swap a key variable.`,
    };
  }),
  { questionNumber: 31, levels: defaultLevelsFor(10) },
  { questionNumber: 32, levels: defaultLevelsFor(15) },
  { questionNumber: 33, levels: defaultLevelsFor(25) },
];

export const AQA_SPECIMEN_PAPER_3: GeneratedPaper = {
  id: "aqa-specimen-paper-3",
  paperCode: "7136/3",
  paperNumber: 3,
  title: "Economic Principles and Issues",
  practiceSetLabel: "Official Specimen",
  focus: ["Synoptic micro & macro", "Behavioural economics", "Public sector economics"],
  createdAt: "2024-01-01T00:00:00.000Z",
  status: "specimen",
  totalMarks: 80,
  extracts: [
    {
      id: "CASE",
      title: "Case Study — UK retirement saving and the auto-enrolment reform",
      body:
        "Auto-enrolment was rolled out from 2012, requiring all UK employers to automatically enrol eligible workers into a workplace pension. The default minimum contribution is 8% of qualifying earnings (3% employer, 5% employee). Pensions Policy Institute research shows participation rose from 55% of eligible employees in 2012 to over 88% by 2023. Yet the same research warns that under-saving remains widespread: around 12.5 million UK workers are projected to receive a retirement income below the Pensions and Lifetime Savings Association's 'Minimum' standard. Behavioural economists attribute much of the gap to present bias, status-quo bias, and information overload around pension choices. Critics of further intervention argue that mandatory contributions reduce take-home pay for low earners and that paternalism risks crowding out private saving via ISAs.",
      source: "Adapted from Pensions Policy Institute, 'The UK Pensions Framework — 2024 Update', and HMT.",
    },
  ],
  questions: p3Questions,
  markScheme: p3MarkScheme,
};

export const AQA_SPECIMENS: GeneratedPaper[] = [
  AQA_SPECIMEN_PAPER_1,
  AQA_SPECIMEN_PAPER_2,
  AQA_SPECIMEN_PAPER_3,
];

/* ──────────────────────────────────────────────────────────────────────────
   In-memory session store (localStorage-backed) for AI-generated papers.
────────────────────────────────────────────────────────────────────────── */

const STORE_KEY = "aqa-generated-papers-v1";

export function loadGeneratedPapers(): GeneratedPaper[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GeneratedPaper[];
  } catch {
    return [];
  }
}

export function saveGeneratedPaper(paper: GeneratedPaper): void {
  const all = loadGeneratedPapers();
  const idx = all.findIndex((p) => p.id === paper.id);
  if (idx >= 0) all[idx] = paper;
  else all.unshift(paper);
  window.localStorage.setItem(STORE_KEY, JSON.stringify(all));
}

export function deleteGeneratedPaper(id: string): void {
  const all = loadGeneratedPapers().filter((p) => p.id !== id);
  window.localStorage.setItem(STORE_KEY, JSON.stringify(all));
}

export function getAllAqaPapers(): GeneratedPaper[] {
  return [...AQA_SPECIMENS, ...loadGeneratedPapers()];
}

export function getAqaPaperById(id: string): GeneratedPaper | undefined {
  return getAllAqaPapers().find((p) => p.id === id);
}
