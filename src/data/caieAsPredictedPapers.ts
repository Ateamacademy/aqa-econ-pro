import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * CAIE AS Economics · predicted papers library.
 *  · Paper 1 (9708/01) — Multiple Choice (AS).
 *
 * 1h · 30 marks. Three difficulty tiers (Moderate / Hard / Advanced) ship as
 * PDF booklets in /public/caie-as-mocks/.
 */

type Tier = { letter: "a" | "b" | "c"; label: "Moderate" | "Hard" | "Advanced" };

const TIERS: Tier[] = [
  { letter: "a", label: "Moderate" },
  { letter: "b", label: "Hard" },
  { letter: "c", label: "Advanced" },
];

type AsPaperSpec = {
  num: 1;
  code: string;
  title: string;
  descriptions: Record<Tier["label"], string>;
};

const PAPERS: AsPaperSpec[] = [
  {
    num: 1,
    code: "9708/01",
    title: "Multiple Choice",
    descriptions: {
      Moderate: "CAIE AS Paper 1. 30 multiple-choice questions across the basic economic problem, price system, government microeconomic intervention and the macroeconomy.",
      Hard:     "CAIE AS Paper 1. Demanding multiple-choice on elasticity, market failure, AD/AS and balance of payments with tighter distractors.",
      Advanced: "CAIE AS Paper 1. Top-band multiple-choice with full AS Micro & Macro coverage under exam conditions.",
    },
  },
];

const placeholderContent = (p: AsPaperSpec) => `# CAIE AS Economics (${p.code}) · Paper ${p.num} — ${p.title}

**Time: 1 hour | Total: 30 marks**

Open the booklet PDF for the full question paper.`;

export const caieAsPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `caie-as${p.num}-${t.letter}`,
    subject: "cambridge",
    paper: `as-${p.num}`,
    title: `AS Paper ${p.num} · Set ${t.letter.toUpperCase()}`,
    description: p.descriptions[t.label],
    totalMarks: 30,
    content: placeholderContent(p),
  }))
);
