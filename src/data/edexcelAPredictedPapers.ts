import type { PredictedPaper } from "./predictedPapersLibrary";

/**
 * Edexcel A A-Level Economics (9EC0) — predicted papers library.
 *
 * The 9 entries below (Paper 1/2/3 × Moderate/Hard/Advanced) are backed by
 * static, print-ready Pearson-style HTML booklets in /public/edexcel-a-mocks/.
 * The PredictedPapers UI detects the `bookletUrl` field and renders the
 * booklet in an iframe instead of the interactive exam-marking workflow.
 *
 * The legacy "Set A/B/C" id convention is preserved so existing routing,
 * sorting and library lookups (e.g. paper-sets coverage reports) continue
 * to resolve. The display layer maps Set A→Moderate, B→Hard, C→Advanced.
 */

type Tier = { letter: "A" | "B" | "C"; label: "Moderate" | "Hard" | "Advanced"; slug: "moderate" | "hard" | "advanced" };

const TIERS: Tier[] = [
  { letter: "A", label: "Moderate", slug: "moderate" },
  { letter: "B", label: "Hard",     slug: "hard"     },
  { letter: "C", label: "Advanced", slug: "advanced" },
];

const PAPERS: Array<{
  num: "1" | "2" | "3";
  code: string;
  title: string;
  descriptions: Record<Tier["label"], string>;
}> = [
  {
    num: "1",
    code: "9EC0/01",
    title: "Markets and Business Behaviour",
    descriptions: {
      Moderate: "Markets & Business Behaviour. Standard data response and essays on micro topics.",
      Hard:     "Markets & Business Behaviour. Demanding analysis of market structures and labour.",
      Advanced: "Markets & Business Behaviour. Synoptic micro evaluation at the top of the spec.",
    },
  },
  {
    num: "2",
    code: "9EC0/02",
    title: "The National and Global Economy",
    descriptions: {
      Moderate: "National & Global Economy. AD/AS, fiscal & monetary policy, trade.",
      Hard:     "National & Global Economy. Tight evaluation of macro performance and policy.",
      Advanced: "National & Global Economy. Demanding synoptic macro across all four objectives.",
    },
  },
  {
    num: "3",
    code: "9EC0/03",
    title: "Microeconomics and Macroeconomics",
    descriptions: {
      Moderate: "Synoptic paper. Two case-study sections combining micro and macro.",
      Hard:     "Synoptic paper. Demanding cross-theme evaluation under exam conditions.",
      Advanced: "Synoptic paper. A* level synoptic case studies and 25-mark evaluations.",
    },
  },
];

export const edexcelAPredictedPapers: PredictedPaper[] = PAPERS.flatMap((p) =>
  TIERS.map<PredictedPaper>((t) => ({
    id: `edxa-p${p.num}-${t.letter.toLowerCase()}`,
    subject: "edexcel-a",
    paper: p.num,
    title: `Paper ${p.num} — Set ${t.letter}`, // displayed as "Paper N — Moderate/Hard/Advanced" via SET_LABEL_DISPLAY_MAP
    description: p.descriptions[t.label],
    totalMarks: 100,
    bookletUrl: `/edexcel-a-mocks/paper-${p.num}-${t.slug}.html`,
    // Minimal placeholder content — the renderer uses bookletUrl, not this.
    content: `# Edexcel A-Level Economics A (${p.code}) — Paper ${p.num} — ${t.label}

**Time: 2 hours | Total: 100 marks**

This paper is presented as an authentic Pearson-style printable booklet. Click "Open Pearson Booklet" to view, print or save as PDF.
`,
  }))
);
