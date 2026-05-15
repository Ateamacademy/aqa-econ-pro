import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * WJEC AS Economics · predicted papers library.
 *  · Component 1 (1090U10-1) — Introduction to Economics.
 *
 * 1h 30m · 80 marks. Three difficulty tiers (Moderate / Hard / Advanced)
 * ship as PDF booklets in /public/wjec-as-mocks/.
 */

type Tier = { letter: "a" | "b" | "c"; label: "Moderate" | "Hard" | "Advanced" };

const TIERS: Tier[] = [
  { letter: "a", label: "Moderate" },
  { letter: "b", label: "Hard" },
  { letter: "c", label: "Advanced" },
];

type AsPaperSpec = {
  num: 1 | 2;
  code: string;
  title: string;
  descriptions: Record<Tier["label"], string>;
};

const PAPERS: AsPaperSpec[] = [
  {
    num: 1,
    code: "1090U10-1",
    title: "Introduction to Economics",
    descriptions: {
      Moderate: "WJEC AS Component 1. Markets, demand & supply, market failure and intervention. Standard data response and structured questions.",
      Hard:     "WJEC AS Component 1. Demanding analysis of price mechanism, externalities and government intervention.",
      Advanced: "WJEC AS Component 1. Top-band synoptic micro evaluation under exam conditions.",
    },
  },
  {
    num: 2,
    code: "1090U20-1",
    title: "Exploring Economic Issues",
    descriptions: {
      Moderate: "WJEC AS Component 2. Macroeconomic indicators, AD/AS, fiscal, monetary and supply-side policy with applied data response.",
      Hard:     "WJEC AS Component 2. Demanding analysis of macro objectives, policy trade-offs and the global context.",
      Advanced: "WJEC AS Component 2. Top-band synoptic macro evaluation under exam conditions.",
    },
  },
];

const placeholderContent = (p: AsPaperSpec) => `# WJEC AS Economics (${p.code}) · Component ${p.num} — ${p.title}

**Time: 1 hour 30 minutes | Total: 80 marks**

Open the booklet PDF for the full question paper.`;

export const wjecAsPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `wjec-as${p.num}-${t.letter}`,
    subject: "wjec",
    paper: `as-${p.num}`,
    title: `AS Component ${p.num} · Set ${t.letter.toUpperCase()}`,
    description: p.descriptions[t.label],
    totalMarks: 80,
    content: placeholderContent(p),
  }))
);
