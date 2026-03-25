import type { Subject } from "@/contexts/SubjectContext";

export type Difficulty = "moderate" | "hard" | "very-hard" | "limited-edition";

export interface LibraryPaper {
  id: string;
  subject: Subject;
  paper: string;        // "1" | "2" | "3" / "full"
  paperLabel: string;   // "Paper 1", "Component 01", "Unit 1", etc.
  paperTitle: string;   // "Markets & Market Failure"
  difficulty: Difficulty;
  set: number;          // 1-10
  title: string;        // display title
  description: string;
  totalMarks: number;
  duration: number;     // minutes
  premium: boolean;     // true for limited-edition
}

/* ── Board metadata ── */
interface BoardMeta {
  subject: Subject;
  boardLabel: string;
  level: string;
  papers: { value: string; label: string; title: string; marks: number; duration: number }[];
}

const BOARDS: BoardMeta[] = [
  {
    subject: "economics", boardLabel: "AQA", level: "A-Level",
    papers: [
      { value: "1", label: "Paper 1", title: "Markets & Market Failure", marks: 80, duration: 105 },
      { value: "2", label: "Paper 2", title: "National & International Economy", marks: 80, duration: 105 },
      { value: "full", label: "Paper 3", title: "Economic Principles & Issues", marks: 80, duration: 120 },
    ],
  },
  {
    subject: "edexcel-a", boardLabel: "Edexcel A", level: "A-Level",
    papers: [
      { value: "1", label: "Paper 1", title: "Markets & Business Behaviour", marks: 100, duration: 120 },
      { value: "2", label: "Paper 2", title: "The National & Global Economy", marks: 100, duration: 120 },
      { value: "full", label: "Paper 3", title: "Microeconomics & Macroeconomics", marks: 100, duration: 120 },
    ],
  },
  {
    subject: "edexcel-b", boardLabel: "Edexcel B", level: "A-Level",
    papers: [
      { value: "1", label: "Paper 1", title: "Markets, Consumers & Firms", marks: 80, duration: 120 },
      { value: "2", label: "Paper 2", title: "The Wider Economic Environment", marks: 80, duration: 120 },
      { value: "full", label: "Paper 3", title: "The Global Economy", marks: 80, duration: 120 },
    ],
  },
  {
    subject: "ocr", boardLabel: "OCR", level: "A-Level",
    papers: [
      { value: "1", label: "Component 01", title: "Microeconomics", marks: 80, duration: 120 },
      { value: "2", label: "Component 02", title: "Macroeconomics", marks: 80, duration: 120 },
      { value: "full", label: "Component 03", title: "Themes in Economics", marks: 80, duration: 120 },
    ],
  },
  {
    subject: "cambridge", boardLabel: "CAIE", level: "A-Level",
    papers: [
      { value: "1", label: "Paper 1", title: "Multiple Choice (AS)", marks: 30, duration: 75 },
      { value: "2", label: "Paper 2", title: "Data Response & Essay (AS)", marks: 40, duration: 135 },
      { value: "full", label: "Paper 3", title: "Multiple Choice (A2)", marks: 30, duration: 135 },
    ],
  },
  {
    subject: "ib", boardLabel: "IB", level: "HL/SL",
    papers: [
      { value: "1", label: "Paper 1", title: "Extended Response", marks: 50, duration: 90 },
      { value: "2", label: "Paper 2", title: "Data Response", marks: 40, duration: 105 },
      { value: "full", label: "Paper 3 (HL)", title: "HL Extension Paper", marks: 60, duration: 105 },
    ],
  },
  {
    subject: "wjec", boardLabel: "WJEC", level: "A-Level",
    papers: [
      { value: "1", label: "Unit 1", title: "Introduction to Economics", marks: 75, duration: 90 },
      { value: "2", label: "Unit 2", title: "Economics in Action", marks: 75, duration: 90 },
      { value: "full", label: "Units 3 & 4", title: "A2 Applied Economics", marks: 100, duration: 120 },
    ],
  },
  {
    subject: "eduqas", boardLabel: "Eduqas", level: "A-Level",
    papers: [
      { value: "1", label: "Component 1", title: "Markets & Market Failure", marks: 80, duration: 120 },
      { value: "2", label: "Component 2", title: "National & International Economy", marks: 80, duration: 120 },
      { value: "full", label: "Component 3", title: "Synoptic Data Response", marks: 100, duration: 135 },
    ],
  },
  {
    subject: "aqa-gcse", boardLabel: "AQA", level: "GCSE",
    papers: [
      { value: "1", label: "Paper 1", title: "How Markets Work", marks: 80, duration: 105 },
      { value: "2", label: "Paper 2", title: "How the Economy Works", marks: 80, duration: 105 },
      { value: "full", label: "Full Paper", title: "Full Predicted Paper", marks: 80, duration: 105 },
    ],
  },
  {
    subject: "cambridge-igcse", boardLabel: "CAIE", level: "IGCSE",
    papers: [
      { value: "1", label: "Paper 1", title: "Multiple Choice", marks: 30, duration: 45 },
      { value: "2", label: "Paper 2", title: "Structured Questions", marks: 90, duration: 135 },
      { value: "full", label: "Full Paper", title: "Full Predicted Paper", marks: 90, duration: 135 },
    ],
  },
  {
    subject: "edexcel-igcse", boardLabel: "Edexcel", level: "IGCSE",
    papers: [
      { value: "1", label: "Paper 1", title: "Microeconomics & Business", marks: 80, duration: 75 },
      { value: "2", label: "Paper 2", title: "Macroeconomics & Global", marks: 80, duration: 85 },
      { value: "full", label: "Full Paper", title: "Full Predicted Paper", marks: 80, duration: 85 },
    ],
  },
  {
    subject: "ocr-gcse", boardLabel: "OCR", level: "GCSE",
    papers: [
      { value: "1", label: "Component 1", title: "Introduction to Economics", marks: 80, duration: 75 },
      { value: "2", label: "Component 2", title: "National & International Economics", marks: 80, duration: 75 },
      { value: "full", label: "Full Paper", title: "Full Predicted Paper", marks: 80, duration: 75 },
    ],
  },
];

/* ── Difficulty distribution: 3 Moderate, 3 Hard, 3 Very Hard, 1 Limited Edition ── */
const DIFFICULTY_MAP: Difficulty[] = [
  "moderate", "moderate", "moderate",
  "hard", "hard", "hard",
  "very-hard", "very-hard", "very-hard",
  "limited-edition",
];

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  moderate: "Moderate",
  hard: "Hard",
  "very-hard": "Very Hard",
  "limited-edition": "Limited Edition",
};

const DIFFICULTY_DESC: Record<Difficulty, string> = {
  moderate: "Exam-realistic difficulty. Great for building confidence and consolidating knowledge.",
  hard: "Application-heavy questions requiring deeper analysis and evaluation skills.",
  "very-hard": "Top-grade difficulty with extended reasoning, counter-arguments, and judgement.",
  "limited-edition": "Elite challenge paper — the most original, demanding, and high-value questions.",
};

function buildLibrary(): LibraryPaper[] {
  const papers: LibraryPaper[] = [];

  for (const board of BOARDS) {
    for (const p of board.papers) {
      for (let i = 0; i < 10; i++) {
        const diff = DIFFICULTY_MAP[i];
        const setNum = i + 1;
        const diffLabel = DIFFICULTY_LABELS[diff];
        const setLetter = String.fromCharCode(65 + i); // A-J

        papers.push({
          id: `${board.subject}-${p.value}-${setLetter}`.toLowerCase(),
          subject: board.subject,
          paper: p.value,
          paperLabel: p.label,
          paperTitle: p.title,
          difficulty: diff,
          set: setNum,
          title: `${board.boardLabel} ${board.level} ${p.label} — Set ${setLetter}`,
          description: `${diffLabel} difficulty. ${p.title}. ${DIFFICULTY_DESC[diff]}`,
          totalMarks: p.marks,
          duration: p.duration,
          premium: diff === "limited-edition",
        });
      }
    }
  }

  return papers;
}

export const paperLibrary = buildLibrary();
export { BOARDS, DIFFICULTY_LABELS, DIFFICULTY_DESC };
export type { BoardMeta };
