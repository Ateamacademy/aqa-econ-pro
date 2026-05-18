import type { BoardConfig, ExamBoard, Qualification } from "./types";
import {
  AQA_A_LEVEL_PREDICTION,
  AQA_AS_PREDICTION,
  AQA_GCSE_PREDICTION,
  CAIE_IGCSE_PREDICTION,
  EDEXCEL_A_LEVEL_PREDICTION,
  EDEXCEL_AS_PREDICTION,
  EDEXCEL_B_A_LEVEL_PREDICTION,
  EDEXCEL_IGCSE_PREDICTION,
  OCR_A_LEVEL_PREDICTION,
  OCR_AS_PREDICTION,
  OCR_GCSE_PREDICTION,
  proRataGcseToPapers,
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
    // PREDICTED 2026 boundaries from 4 published series (2022–2025).
    boundaries: { ...OCR_A_LEVEL_PREDICTION.predicted },
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
    // PREDICTED 2026 boundaries built from AQA GCSE Economics 8136 archive
    // (2019, 2022–2025), pro-rata /160 → /240 to fit the 3-paper UI.
    boundaries: proRataGcseToPapers(AQA_GCSE_PREDICTION.predicted, 240, AQA_GCSE_PREDICTION.max),
  },
  Edexcel: {
    board: "Edexcel",
    paperMax: [80, 80, 80],
    // PREDICTED 2026 boundaries built from Edexcel IGCSE Economics 4EC1 archive
    // (2020, 2022–2025 main June series), pro-rata /160 → /240 for the 3-paper UI.
    boundaries: proRataGcseToPapers(EDEXCEL_IGCSE_PREDICTION.predicted, 240, EDEXCEL_IGCSE_PREDICTION.max),
  },
  OCR: {
    board: "OCR",
    paperMax: [80, 80, 80],
    // PREDICTED 2026 boundaries built from OCR GCSE Economics J205 archive
    // (2022–2025), pro-rata /160 → /240 to fit the 3-paper UI.
    boundaries: proRataGcseToPapers(OCR_GCSE_PREDICTION.predicted, 240, OCR_GCSE_PREDICTION.max),
  },
  CAIE: {
    board: "CAIE",
    // IGCSE 0455: 2 components (P1 30, P2 90); P3 treated as improvement target.
    paperMax: [30, 90, 60],
    // PREDICTED 2026 boundaries built from CAIE IGCSE Economics 0455 archive
    // (2023–2025 June, X+Y zones averaged), pro-rata /150 → /180 for the 3-slot UI.
    boundaries: proRataGcseToPapers(CAIE_IGCSE_PREDICTION.predicted, 180, CAIE_IGCSE_PREDICTION.max),
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

/**
 * AS-Level boards. AS has 2 papers and NO A* grade.
 * We map to paperMax = [P1_max, 0, P2_max] so the existing 3-slot engine
 * treats slot index 2 as the "what do I need" paper (= AS Paper 2).
 * The UI hides the middle Paper 2 input for AS and relabels Paper 3 → Paper 2.
 *
 * Boundaries are PREDICTED 2026 figures from the savemyexams.com archive
 * (AQA 7135, Edexcel A 8EC0, OCR H060) via the same exponentially-weighted
 * algorithm used for A-Level.
 */
const AS_GRADES = ["A", "B", "C", "D", "E"] as const;

function asBoundariesFromPrediction(predicted: Record<string, number>): Record<string, number> {
  // Engine reads "A*" as the top grade, but AS has no A*. We omit it; predict
  // will simply never award A* because A* isn't in the grades list.
  return { A: predicted.A, B: predicted.B, C: predicted.C, D: predicted.D, E: predicted.E };
}

const asLevelBoards: Partial<Record<ExamBoard, Omit<BoardConfig, "qualification" | "grades">>> = {
  AQA: {
    board: "AQA",
    // AQA AS 7135: 2 papers × 70 = 140
    paperMax: [70, 0, 70],
    boundaries: asBoundariesFromPrediction(AQA_AS_PREDICTION.predicted),
  },
  Edexcel: {
    board: "Edexcel",
    // Edexcel A AS 8EC0: 2 papers × 80 = 160
    paperMax: [80, 0, 80],
    boundaries: asBoundariesFromPrediction(EDEXCEL_AS_PREDICTION.predicted),
  },
  OCR: {
    board: "OCR",
    // OCR AS H060: 2 papers × 60 = 120
    paperMax: [60, 0, 60],
    boundaries: asBoundariesFromPrediction(OCR_AS_PREDICTION.predicted),
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
  if (qualification === "AS-Level") {
    // Fall back to AQA if board has no AS spec (e.g. CAIE/WJEC/IB).
    const base = asLevelBoards[board] ?? asLevelBoards.AQA!;
    return { ...base, qualification, grades: [...AS_GRADES] };
  }
  return { ...gcseBoards[board], qualification, grades: [...GCSE_GRADES] };
}

export const TARGET_GRADES: Record<Qualification, string[]> = {
  "A-Level": [...A_LEVEL_GRADES],
  "AS-Level": [...AS_GRADES],
  GCSE: [...GCSE_GRADES],
};
