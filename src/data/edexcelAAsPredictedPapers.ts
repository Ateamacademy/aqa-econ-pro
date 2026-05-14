import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * Edexcel A AS Economics (8EC0) · predicted papers library.
 *  · Paper 2 (8EC0/02) — The Wider Economic Environment (Macro).
 *
 * Each paper: 1h 30m · 80 marks. Three difficulty tiers (Moderate / Hard /
 * Advanced) ship as PDF booklets in /public/edexcel-a-as-mocks/.
 */

type Tier = { letter: "a" | "b" | "c"; label: "Moderate" | "Hard" | "Advanced" };

const TIERS: Tier[] = [
  { letter: "a", label: "Moderate" },
  { letter: "b", label: "Hard" },
  { letter: "c", label: "Advanced" },
];

type AsPaperSpec = {
  num: 2;
  code: string;
  title: string;
  descriptions: Record<Tier["label"], string>;
};

const PAPERS: AsPaperSpec[] = [
  {
    num: 2,
    code: "8EC0/02",
    title: "The Wider Economic Environment",
    descriptions: {
      Moderate: "Edexcel A AS Macroeconomics. AD/AS, macro objectives, fiscal & monetary policy. Standard data response and essay.",
      Hard:     "Edexcel A AS Macroeconomics. Demanding analysis of macro performance, policy trade-offs and global context.",
      Advanced: "Edexcel A AS Macroeconomics. Top-band synoptic macro evaluation under exam conditions.",
    },
  },
];

const placeholderContent = (p: AsPaperSpec) => `# Edexcel A AS Economics (${p.code}) · Paper ${p.num} — ${p.title}

**Time: 1 hour 30 minutes | Total: 80 marks**

Open the booklet PDF for the full question paper.`;

export const edexcelAAsPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `edxa-as${p.num}-${t.letter}`,
    subject: "edexcel-a",
    paper: `as-${p.num}`,
    title: `AS Paper ${p.num} · Set ${t.letter.toUpperCase()}`,
    description: p.descriptions[t.label],
    totalMarks: 80,
    content: placeholderContent(p),
  }))
);
