import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * AQA AS Economics (7135) · predicted papers library.
 *  · Paper 1 (7135/1) — The Operation of Markets and Market Failure (Micro).
 *  · Paper 2 (7135/2) — The National Economy (Macro).
 *
 * Each paper: 1h 30m · 60 marks · Section A data response (40) + Section B essay (20).
 *
 * Three difficulty tiers (Moderate / Hard / Advanced) per paper ship as PDF
 * booklets in /public/aqa-as-mocks/. The cards in the predicted papers
 * library open the static QP PDF directly in a new tab; the marking scheme
 * is downloadable via the standard staticPaperResolver path used by the rest
 * of the AQA library.
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
    code: "7135/1",
    title: "The Operation of Markets and Market Failure",
    descriptions: {
      Moderate: "AS Microeconomics. Markets, market failure & government intervention. Standard data response and essay.",
      Hard:     "AS Microeconomics. Demanding analysis of price mechanism, externalities and intervention.",
      Advanced: "AS Microeconomics. Top-band synoptic micro evaluation under exam conditions.",
    },
  },
  {
    num: 2,
    code: "7135/2",
    title: "The National Economy",
    descriptions: {
      Moderate: "AS Macroeconomics. AD/AS, macro objectives, fiscal & monetary policy. Standard data response and essay.",
      Hard:     "AS Macroeconomics. Demanding analysis of macro performance and policy trade-offs.",
      Advanced: "AS Macroeconomics. Top-band synoptic macro evaluation under exam conditions.",
    },
  },
];

const placeholderContent = (p: AsPaperSpec) => `# AQA AS Economics (${p.code}) · Paper ${p.num} — ${p.title}

**Time: 1 hour 30 minutes | Total: 60 marks**

Open the booklet PDF for the full question paper.`;

export const aqaAsPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `econ-as${p.num}-${t.letter}`,
    subject: "economics",
    paper: `as-${p.num}`,
    title: `AS Paper ${p.num} · Set ${t.letter.toUpperCase()}`,
    description: p.descriptions[t.label],
    totalMarks: 60,
    content: placeholderContent(p),
  }))
);
