/**
 * Build the markdown `content` field expected by `parseQuestions` for each of
 * the 9 Edexcel A A-Level mock papers, sourced from the structured JSON in
 * `edexcelAPredictedPapersData.json` (extracted from the official Pearson-style
 * HTML booklets in /public/edexcel-a-mocks/).
 *
 * Output format follows the patterns supported by `parseQuestions`:
 *   Section A
 *   Question 1 [5 marks]
 *   <stem + extracts>
 *   Question 1a [4 marks]
 *   <part text>
 *   A) ...
 *   B) ...
 *
 * Each part is emitted as its own question so the marking UI gives the
 * student a separate answer box per part — matching the AQA flow shown in
 * the design reference.
 */
import data from "./edexcelAPredictedPapersData.json";

type Option = { label: string; text: string };
type Part = { label: string | null; text: string; marks: number | null; options: Option[] | null };
type Question = {
  number: number | null;
  stem: string;
  tables: string[][][];
  figures: string[];
  parts: Part[];
  totalMarks: number | null;
};
type Extract = { title: string; subtitle: string | null; body: string };
type Section = {
  label: string;
  intro: string[];
  extracts: Extract[];
  questions: Question[];
  totalMarks: number | null;
};
type Paper = { id: string; paper: number; tier: string; title: string; sections: Section[] };

const PAPERS = data as unknown as Paper[];

function tableToMarkdown(rows: string[][]): string {
  if (!rows.length) return "";
  const [head, ...body] = rows;
  const sep = head.map(() => "---").join(" | ");
  const fmt = (r: string[]) => "| " + r.join(" | ") + " |";
  return [fmt(head), `| ${sep} |`, ...body.map(fmt)].join("\n");
}

function renderQuestion(q: Question, fallbackNum: number): string {
  const num = q.number ?? fallbackNum;
  const blocks: string[] = [];

  // Stem block: include figure captions and tables, but no marks header
  // unless the question has no parts (essay-style Section C / Paper 3 essays).
  const stemBits: string[] = [];
  if (q.stem) stemBits.push(q.stem);
  q.figures.forEach((f) => stemBits.push(`*${f}*`));
  q.tables.forEach((t) => stemBits.push(tableToMarkdown(t)));
  const stem = stemBits.join("\n\n");

  if (q.parts.length === 0) {
    // Essay-style: emit one question header with the total marks and the stem text
    const marks = q.totalMarks ?? 25;
    blocks.push(`Question ${num} [${marks} marks]\n${stem}`);
    return blocks.join("\n\n");
  }

  // Multi-part: emit a context block first (no marks header), then each part
  if (stem) {
    blocks.push(`**Question ${num} — context**\n${stem}`);
  }
  q.parts.forEach((p, i) => {
    const lbl = p.label ?? String.fromCharCode(97 + i);
    const marks = p.marks ?? 0;
    const lines: string[] = [];
    lines.push(`Question ${num}${lbl} [${marks} marks]`);
    lines.push(p.text);
    if (p.options && p.options.length) {
      p.options.forEach((o) => lines.push(`${o.label}) ${o.text}`));
    }
    blocks.push(lines.join("\n"));
  });
  return blocks.join("\n\n");
}

function renderExtracts(extracts: Extract[]): string {
  if (!extracts.length) return "";
  return extracts
    .map((e) => {
      const head = e.subtitle
        ? `**${e.title} — ${e.subtitle}**`
        : `**${e.title}**`;
      return `${head}\n\n${e.body}`;
    })
    .join("\n\n");
}

function renderSection(s: Section, runningQNum: { n: number }): string {
  const blocks: string[] = [];
  blocks.push(`## Section ${s.label}${s.totalMarks ? ` (${s.totalMarks} marks)` : ""}`);
  if (s.intro.length) blocks.push(s.intro.join("\n\n"));
  const extractsMd = renderExtracts(s.extracts);
  if (extractsMd) blocks.push(extractsMd);
  s.questions.forEach((q) => {
    blocks.push(renderQuestion(q, runningQNum.n));
    runningQNum.n = (q.number ?? runningQNum.n) + 1;
  });
  return blocks.join("\n\n");
}

export function buildEdexcelAPaperMarkdown(paperId: string): string | null {
  const paper = PAPERS.find((p) => p.id === paperId);
  if (!paper) return null;
  const header = [
    `# ${paper.title}`,
    "",
    `**Time: 2 hours | Total: 100 marks**`,
    "",
    `Answer ALL questions in Sections A and B. Section C: answer ONE question only.`,
  ].join("\n");
  const running = { n: 1 };
  const body = paper.sections.map((s) => renderSection(s, running)).join("\n\n");
  return `${header}\n\n${body}\n`;
}
