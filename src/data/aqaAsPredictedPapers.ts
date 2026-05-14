import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * AQA AS Economics (7135/1) · Paper 1 — The Operation of Markets and Market Failure.
 * 1h 30m · 60 marks · Section A data response (40) + Section B essay (20).
 *
 * Three difficulty tiers (Moderate / Hard / Advanced) ship as PDF booklets in
 * /public/aqa-as-mocks/ (uploaded by the user). The cards in the predicted
 * papers library open the static QP PDF directly in a new tab; the marking
 * scheme is downloadable via the standard staticPaperResolver path used by
 * the rest of the AQA library.
 */

type Tier = { letter: "a" | "b" | "c"; label: "Moderate" | "Hard" | "Advanced" };

const TIERS: Tier[] = [
  { letter: "a", label: "Moderate" },
  { letter: "b", label: "Hard" },
  { letter: "c", label: "Advanced" },
];

const DESCRIPTIONS: Record<Tier["label"], string> = {
  Moderate: "AS Microeconomics. Markets, market failure & government intervention. Standard data response and essay.",
  Hard:     "AS Microeconomics. Demanding analysis of price mechanism, externalities and intervention.",
  Advanced: "AS Microeconomics. Top-band synoptic micro evaluation under exam conditions.",
};

// Minimal placeholder content — AS cards bypass the interactive marking flow
// and open the static PDF booklet, so question parsing is not invoked.
const PLACEHOLDER_CONTENT = `# AQA AS Economics (7135/1) · Paper 1 — The Operation of Markets and Market Failure

**Time: 1 hour 30 minutes | Total: 60 marks**

Open the booklet PDF for the full question paper.`;

export const aqaAsPredictedPapers: PredictedPaper[] = TIERS.map<PredictedPaper>((t) => ({
  id: `econ-as1-${t.letter}`,
  subject: "economics",
  paper: "as-1",
  title: `AS Paper 1 · Set ${t.letter.toUpperCase()}`,
  description: DESCRIPTIONS[t.label],
  totalMarks: 60,
  content: PLACEHOLDER_CONTENT,
}));
