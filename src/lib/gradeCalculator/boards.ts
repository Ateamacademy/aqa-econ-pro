import type { BoardConfig, ExamBoard, Qualification } from "./types";

/**
 * Grade boundary data. Where verified series exist (AQA 7136 summer-2024,
 * Edexcel 9EC0 summer-2024) we use the published full-qualification figures.
 * For other boards we use the most recent published series or sensible
 * recent-average approximations. Tunable in one place.
 */

const A_LEVEL_GRADES = ["A*", "A", "B", "C", "D", "E"] as const;
const GCSE_GRADES = ["9", "8", "7", "6", "5", "4", "3", "2", "1"] as const;

const aLevelBoards: Record<ExamBoard, Omit<BoardConfig, "qualification" | "grades">> = {
  AQA: {
    board: "AQA",
    paperMax: [80, 80, 80],
    // Verified summer-2024 7136 (/240)
    boundaries: { "A*": 189, A: 161, B: 134, C: 107, D: 81, E: 55 },
  },
  Edexcel: {
    board: "Edexcel",
    paperMax: [100, 100, 100],
    // Verified summer-2024 9EC0 (/300)
    boundaries: { "A*": 217, A: 185, B: 154, C: 123, D: 93, E: 63 },
  },
  OCR: {
    board: "OCR",
    paperMax: [80, 80, 80],
    // Approximation based on recent H460 series (/240)
    boundaries: { "A*": 184, A: 158, B: 132, C: 106, D: 81, E: 56 },
  },
  IB: {
    board: "IB",
    // IB HL: P1 25, P2 50, P3 25 (approx, /100 conversion-friendly)
    paperMax: [25, 50, 25],
    // IB final % to grade (out of 100 total marks shown)
    boundaries: { "A*": 80, A: 70, B: 60, C: 50, D: 40, E: 30 },
  },
};

const gcseBoards: Record<ExamBoard, Omit<BoardConfig, "qualification" | "grades">> = {
  AQA: {
    board: "AQA",
    // AQA 8136 is 2 papers; we treat "Paper 3" as a mock / improvement target.
    paperMax: [80, 80, 80],
    boundaries: { "9": 130, "8": 115, "7": 100, "6": 85, "5": 70, "4": 55, "3": 42, "2": 30, "1": 18 },
  },
  Edexcel: {
    board: "Edexcel",
    paperMax: [80, 80, 80],
    boundaries: { "9": 132, "8": 117, "7": 102, "6": 87, "5": 72, "4": 57, "3": 43, "2": 30, "1": 17 },
  },
  OCR: {
    board: "OCR",
    paperMax: [80, 80, 80],
    boundaries: { "9": 128, "8": 113, "7": 98, "6": 84, "5": 70, "4": 56, "3": 42, "2": 28, "1": 14 },
  },
  IB: {
    // IB doesn't run a GCSE; treat as MYP-style 1-7 mapped to 9-3 for UX consistency
    board: "IB",
    paperMax: [40, 40, 40],
    boundaries: { "9": 96, "8": 84, "7": 72, "6": 60, "5": 48, "4": 36, "3": 24, "2": 12, "1": 0 },
  },
};

export function getBoardConfig(qualification: Qualification, board: ExamBoard): BoardConfig {
  if (qualification === "A-Level") {
    return { ...aLevelBoards[board], qualification, grades: [...A_LEVEL_GRADES] };
  }
  return { ...gcseBoards[board], qualification, grades: [...GCSE_GRADES] };
}

export const TARGET_GRADES: Record<Qualification, string[]> = {
  "A-Level": [...A_LEVEL_GRADES],
  GCSE: [...GCSE_GRADES],
};
