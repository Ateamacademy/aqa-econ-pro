import type { BoardConfig, ExamBoard, Qualification } from "./types";
import {
  AQA_A_LEVEL_PREDICTION,
  EDEXCEL_A_LEVEL_PREDICTION,
  EDEXCEL_B_A_LEVEL_PREDICTION,
  OCR_A_LEVEL_PREDICTION,
  proRataToPapers,
} from "./historicalBoundaries";

export type EdexcelVariant = "A" | "B";

/**
 * NOTE: Boundary figures are seed placeholders aligned to recent published
 * series (2024 where verified). They must be replaced with Ofqual / board-
 * published data per series before production launch.
 *
 * AQA A-Level boundaries are PREDICTED from 8 years of historical data
 * (2017–2025) via an exponentially-weighted average — see
 * `historicalBoundaries.ts`.
 */

const A_LEVEL_GRADES = ["A*", "A", "B", "C", "D", "E"] as const;
const GCSE_GRADES = ["9", "8", "7", "6", "5", "4", "3", "2", "1"] as const;

const aLevelBoards: Record<ExamBoard, Omit<BoardConfig, "qualification" | "grades">> = {
  AQA: {
    board: "AQA",
    paperMax: [80, 80, 80],
    boundaries: { ...AQA_A_LEVEL_PREDICTION.predicted },
  },

  Edexcel: {
    board: "Edexcel",
    paperMax: [100, 100, 100],
    // PREDICTED 2026 boundaries from 4 published series (2022–2025), pro-rata /335 → /300.
    boundaries: proRataToPapers(EDEXCEL_A_LEVEL_PREDICTION.predicted, 300, EDEXCEL_A_LEVEL_PREDICTION.max),
  },
  OCR: {
    board: "OCR",
    paperMax: [80, 80, 80],
    boundaries: { "A*": 184, A: 158, B: 132, C: 106, D: 81, E: 56 },
  },
  CAIE: {
    board: "CAIE",
    // CAIE 9708: 4 components, but for Grade Calculator we treat as P1+P2+P3 weighted to 100% scale.
    paperMax: [30, 70, 75],
    // Approx % bands on /175 total
    boundaries: { "A*": 137, A: 123, B: 109, C: 95, D: 81, E: 67 },
  },
  WJEC: {
    board: "WJEC",
    paperMax: [80, 80, 80],
    boundaries: { "A*": 186, A: 160, B: 134, C: 109, D: 84, E: 60 },
  },
  IB: {
    board: "IB",
    paperMax: [25, 50, 25],
    boundaries: { "A*": 80, A: 70, B: 60, C: 50, D: 40, E: 30 },
  },
};

const gcseBoards: Record<ExamBoard, Omit<BoardConfig, "qualification" | "grades">> = {
  AQA: {
    board: "AQA",
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
  CAIE: {
    board: "CAIE",
    // IGCSE 0455: 2 components (P1 30, P2 90); P3 treated as improvement target
    paperMax: [30, 90, 60],
    boundaries: { "9": 145, "8": 130, "7": 115, "6": 100, "5": 85, "4": 70, "3": 55, "2": 40, "1": 25 },
  },
  WJEC: {
    board: "WJEC",
    paperMax: [80, 80, 80],
    boundaries: { "9": 130, "8": 116, "7": 102, "6": 88, "5": 72, "4": 56, "3": 42, "2": 28, "1": 14 },
  },
  IB: {
    board: "IB",
    paperMax: [40, 40, 40],
    boundaries: { "9": 96, "8": 84, "7": 72, "6": 60, "5": 48, "4": 36, "3": 24, "2": 12, "1": 0 },
  },
};

export function getBoardConfig(
  qualification: Qualification,
  board: ExamBoard,
  edexcelVariant: EdexcelVariant = "A",
): BoardConfig {
  if (qualification === "A-Level") {
    const base = aLevelBoards[board];
    if (board === "Edexcel" && edexcelVariant === "B") {
      return {
        ...base,
        qualification,
        grades: [...A_LEVEL_GRADES],
        boundaries: proRataToPapers(
          EDEXCEL_B_A_LEVEL_PREDICTION.predicted,
          300,
          EDEXCEL_B_A_LEVEL_PREDICTION.max,
        ),
      };
    }
    return { ...base, qualification, grades: [...A_LEVEL_GRADES] };
  }
  return { ...gcseBoards[board], qualification, grades: [...GCSE_GRADES] };
}

export const TARGET_GRADES: Record<Qualification, string[]> = {
  "A-Level": [...A_LEVEL_GRADES],
  GCSE: [...GCSE_GRADES],
};
