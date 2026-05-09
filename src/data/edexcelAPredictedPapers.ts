import type { PredictedPaper } from "./predictedPapersLibrary";
import { buildEdexcelAPaperMarkdown } from "./edexcelAPredictedPapersBuilder";

/**
 * Edexcel A A-Level Economics (9EC0) · predicted papers library.
 *
 * The 9 entries below (Paper 1/2/3 × Moderate/Hard/Advanced) are sourced
 * from `edexcelAPredictedPapersData.json`, a structured extraction of the
 * 9 Pearson-style HTML booklets in /public/edexcel-a-mocks/. Each entry
 * exposes a markdown `content` field that the standard `parseQuestions`
 * pipeline turns into individual answer cards in the marking UI (matching
 * the AQA Predicted Papers flow).
 *
 * `bookletUrl` still points to the original print HTML so users can open
 * the authentic A4 Pearson booklet from the paper toolbar.
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
  TIERS.map<PredictedPaper>((t) => {
    const dataId = `paper-${p.num}-${t.slug}`;
    const content = buildEdexcelAPaperMarkdown(dataId)
      ?? `# Edexcel A-Level Economics A (${p.code}) · Paper ${p.num} · ${t.label}\n\n_Booklet content unavailable._`;
    return {
      id: `edxa-p${p.num}-${t.letter.toLowerCase()}`,
      subject: "edexcel-a",
      paper: p.num,
      title: `Paper ${p.num} · Set ${t.letter}`, // displayed via SET_LABEL_DISPLAY_MAP
      description: p.descriptions[t.label],
      totalMarks: 100,
      bookletUrl: `/edexcel-a-mocks/paper-${p.num}-${t.slug}.html`,
      content,
    };
  })
);
