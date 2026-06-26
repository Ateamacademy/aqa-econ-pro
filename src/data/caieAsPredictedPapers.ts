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
  num: 1 | 2 | 3 | 4;
  code: string;
  title: string;
  totalMarks: number;
  duration: string;
  descriptions: Record<Tier["label"], string>;
};

const PAPERS: AsPaperSpec[] = [
  {
    num: 1,
    code: "9708/01",
    title: "Multiple Choice",
    totalMarks: 30,
    duration: "1 hour",
    descriptions: {
      Moderate: "CAIE AS Paper 1. 30 multiple-choice questions across the basic economic problem, price system, government microeconomic intervention and the macroeconomy.",
      Hard:     "CAIE AS Paper 1. Demanding multiple-choice on elasticity, market failure, AD/AS and balance of payments with tighter distractors.",
      Advanced: "CAIE AS Paper 1. Top-band multiple-choice with full AS Micro & Macro coverage under exam conditions.",
    },
  },
  {
    num: 2,
    code: "9708/02",
    title: "Data Response & Essay (AS)",
    totalMarks: 40,
    duration: "1 hour 30 minutes",
    descriptions: {
      Moderate: "CAIE AS Paper 2. Data response plus structured essay covering AS Micro & Macro core content.",
      Hard:     "CAIE AS Paper 2. Demanding data-response and essay tasks with sharper command words and tighter mark schemes.",
      Advanced: "CAIE AS Paper 2. Top-band data response and essays across full AS Micro & Macro under exam conditions.",
    },
  },
  {
    num: 3,
    code: "9708/03",
    title: "Multiple Choice (A2)",
    totalMarks: 30,
    duration: "1 hour 15 minutes",
    descriptions: {
      Moderate: "CAIE A2 Paper 3. 30 multiple-choice questions on A2 Micro & Macro content — more analytical than Paper 1.",
      Hard:     "CAIE A2 Paper 3. Demanding A2 multiple-choice with tighter distractors across market structures, costs/revenue, labour and trade.",
      Advanced: "CAIE A2 Paper 3. Top-band A2 multiple-choice with full A2 Micro & Macro coverage under exam conditions.",
    },
  },
  {
    num: 4,
    code: "9708/04",
    title: "Data Response and Essays (A2)",
    totalMarks: 70,
    duration: "2 hours 15 minutes",
    descriptions: {
      Moderate: "CAIE A2 Paper 4. Data response plus structured essay covering full A2 Micro & Macro content.",
      Hard:     "CAIE A2 Paper 4. Demanding data-response and essay tasks with sharper command words and tighter mark schemes.",
      Advanced: "CAIE A2 Paper 4. Top-band data response and essays across full A2 Micro & Macro under exam conditions.",
    },
  },
];

const placeholderContent = (p: AsPaperSpec) => `# CAIE AS Economics (${p.code}) · Paper ${p.num} — ${p.title}

**Time: ${p.duration} | Total: ${p.totalMarks} marks**

Open the booklet PDF for the full question paper.`;

export const caieAsPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `caie-as${p.num}-${t.letter}`,
    subject: "cambridge",
    paper: `as-${p.num}`,
    title: `${p.num <= 2 ? "AS" : "A2"} Paper ${p.num} · Set ${t.letter.toUpperCase()}`,
    description: p.descriptions[t.label],
    totalMarks: p.totalMarks,
    content: placeholderContent(p),
  }))
);
