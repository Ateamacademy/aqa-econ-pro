import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * OCR AS Economics (H060) · predicted papers library.
 *  · Paper 1 (H060/01) — Microeconomics.
 *
 * Each paper: 1h 30m · 70 marks. Three difficulty tiers (Moderate / Hard /
 * Advanced) ship as PDF booklets in /public/ocr-as-mocks/.
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
    code: "H060/01",
    title: "Microeconomics",
    descriptions: {
      Moderate: "OCR AS Microeconomics. Markets, market failure & government intervention. Standard data response and essay.",
      Hard:     "OCR AS Microeconomics. Demanding analysis of price mechanism, externalities and intervention.",
      Advanced: "OCR AS Microeconomics. Top-band synoptic micro evaluation under exam conditions.",
    },
  },
];

const placeholderContent = (p: AsPaperSpec) => `# OCR AS Economics (${p.code}) · Paper ${p.num} — ${p.title}

**Time: 1 hour 30 minutes | Total: 70 marks**

Open the booklet PDF for the full question paper.`;

export const ocrAsPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `ocr-as${p.num}-${t.letter}`,
    subject: "ocr",
    paper: `as-${p.num}`,
    title: `AS Paper ${p.num} · Set ${t.letter.toUpperCase()}`,
    description: p.descriptions[t.label],
    totalMarks: 70,
    content: placeholderContent(p),
  }))
);
