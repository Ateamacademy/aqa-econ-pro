/**
 * Edexcel A A-Level Economics (9EC0) — paper blueprint.
 *
 * Verified against the published Pearson Edexcel A specification and June
 * 2024 past papers. Every paper is 100 marks / 2 hours / 3 sections.
 *
 * Differences from AQA:
 *   • 100 marks per paper (AQA = 80)
 *   • Three sections, not two
 *   • Section A = mini-question pairs (5 × 4+1 mark pairs = 25 marks)
 *   • Section B = one structured stem with parts (a/b/c/d/e) = 50 marks
 *   • Section C = student CHOOSES one of two essays = 25 marks
 *   • Paper 3 = two synoptic case-study sections, 50 marks each
 *   • Numbering uses 1(a), 6(b) — not AQA's "0 1" two-digit scheme
 */
import type { PaperBlueprint } from "../board-definition";

const PAPER_1: PaperBlueprint = {
  code: "9EC0/01",
  paperNumber: 1,
  title: "Markets and Business Behaviour",
  totalMarks: 100,
  durationMinutes: 120,
  sections: [
    {
      id: "A",
      name: "Section A — Multiple-choice and short data response",
      marks: 25,
      requires: ["Figure 1", "Figure 2 (optional)"],
      questions: [
        { number: "1(a)", marks: 1, skill: "Identify (MCQ)", format: "MCQ", options: 4 },
        { number: "1(b)", marks: 4, skill: "Explain", format: "WRITTEN" },
        { number: "2(a)", marks: 1, skill: "Identify (MCQ)", format: "MCQ", options: 4 },
        { number: "2(b)", marks: 4, skill: "Explain / calculate", format: "WRITTEN" },
        { number: "3(a)", marks: 1, skill: "Identify (MCQ)", format: "MCQ", options: 4 },
        { number: "3(b)", marks: 4, skill: "Explain", format: "WRITTEN" },
        { number: "4(a)", marks: 1, skill: "Identify (MCQ)", format: "MCQ", options: 4 },
        { number: "4(b)", marks: 4, skill: "Explain", format: "WRITTEN" },
        { number: "5(a)", marks: 1, skill: "Identify (MCQ)", format: "MCQ", options: 4 },
        { number: "5(b)", marks: 4, skill: "Explain", format: "WRITTEN" },
      ],
    },
    {
      id: "B",
      name: "Section B — Data response (structured)",
      marks: 50,
      requires: ["Extract 1", "Extract 2", "Figure 1"],
      questions: [
        { number: "6(a)", marks: 5, skill: "Define / explain (K + Ap)", format: "WRITTEN" },
        { number: "6(b)", marks: 8, skill: "Examine (K + Ap + An)", format: "WRITTEN" },
        { number: "6(c)", marks: 10, skill: "Assess (K + Ap + An + Ev)", format: "WRITTEN" },
        { number: "6(d)", marks: 12, skill: "Discuss (K + Ap + An + Ev)", format: "WRITTEN" },
        { number: "6(e)", marks: 15, skill: "Evaluate (K + Ap + An + Ev)", format: "WRITTEN" },
      ],
    },
    {
      id: "C",
      name: "Section C — Essay (choice of one)",
      marks: 25,
      chooseN: { answer: 1, from: 2 },
      questions: [
        { number: "7", marks: 25, skill: "Evaluate essay (option 1)", format: "WRITTEN" },
        { number: "8", marks: 25, skill: "Evaluate essay (option 2)", format: "WRITTEN" },
      ],
    },
  ],
};

const PAPER_2: PaperBlueprint = {
  ...PAPER_1,
  code: "9EC0/02",
  paperNumber: 2,
  title: "The National and Global Economy",
  sections: PAPER_1.sections.map((s) => ({ ...s })),
};

const PAPER_3: PaperBlueprint = {
  code: "9EC0/03",
  paperNumber: 3,
  title: "The Economic Environment and Business",
  totalMarks: 100,
  durationMinutes: 120,
  sections: [
    {
      id: "A",
      name: "Section A — Synoptic case study 1",
      marks: 50,
      requires: ["Extract 1", "Extract 2", "Extract 3", "Figure 1"],
      questions: [
        { number: "1(a)", marks: 5, skill: "Define / explain (K + Ap)", format: "WRITTEN" },
        { number: "1(b)", marks: 8, skill: "Examine (K + Ap + An)", format: "WRITTEN" },
        { number: "1(c)", marks: 12, skill: "Discuss (K + Ap + An + Ev)", format: "WRITTEN" },
        { number: "1(d)", marks: 25, skill: "Evaluate synoptic essay", format: "WRITTEN" },
      ],
    },
    {
      id: "B",
      name: "Section B — Synoptic case study 2",
      marks: 50,
      requires: ["Extract 4", "Extract 5", "Figure 2"],
      questions: [
        { number: "2(a)", marks: 5, skill: "Define / explain (K + Ap)", format: "WRITTEN" },
        { number: "2(b)", marks: 8, skill: "Examine (K + Ap + An)", format: "WRITTEN" },
        { number: "2(c)", marks: 12, skill: "Discuss (K + Ap + An + Ev)", format: "WRITTEN" },
        { number: "2(d)", marks: 25, skill: "Evaluate synoptic essay", format: "WRITTEN" },
      ],
    },
  ],
};

export const EDEXCEL_A_PAPERS: PaperBlueprint[] = [PAPER_1, PAPER_2, PAPER_3];
