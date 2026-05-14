import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * Edexcel B AS Economics (8EB0) · predicted papers library.
 *  · Paper 1 (8EB0/01) — Markets, Consumers and Firms (Micro).
 *  · Paper 2 (8EB0/02) — The Wider Economic Environment (Macro).
 *
 * Each paper: 1h 30m · 80 marks. Three difficulty tiers (Moderate / Hard /
 * Advanced) ship as PDF booklets in /public/edexcel-b-as-mocks/.
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
    code: "8EB0/01",
    title: "Markets, Consumers and Firms",
    descriptions: {
      Moderate: "Edexcel B AS Microeconomics. Markets, demand & supply, consumer behaviour and the role of firms.",
      Hard:     "Edexcel B AS Microeconomics. Demanding analysis of market structures, costs, revenues and competition.",
      Advanced: "Edexcel B AS Microeconomics. Top-band synoptic micro evaluation under exam conditions.",
    },
  },
  {
    num: 2,
    code: "8EB0/02",
    title: "The Wider Economic Environment",
    descriptions: {
      Moderate: "Edexcel B AS Macroeconomics. AD/AS, macro objectives, fiscal & monetary policy in the wider economy.",
      Hard:     "Edexcel B AS Macroeconomics. Demanding analysis of macro performance and policy trade-offs.",
      Advanced: "Edexcel B AS Macroeconomics. Top-band synoptic macro evaluation under exam conditions.",
    },
  },
];

const placeholderContent = (p: AsPaperSpec) => `# Edexcel B AS Economics (${p.code}) · Paper ${p.num} — ${p.title}

**Time: 1 hour 30 minutes | Total: 80 marks**

Open the booklet PDF for the full question paper.`;

export const edexcelBAsPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `edxb-as${p.num}-${t.letter}`,
    subject: "edexcel-b",
    paper: `as-${p.num}`,
    title: `AS Paper ${p.num} · Set ${t.letter.toUpperCase()}`,
    description: p.descriptions[t.label],
    totalMarks: 80,
    content: placeholderContent(p),
  }))
);
