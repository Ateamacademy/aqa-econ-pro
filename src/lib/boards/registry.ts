/**
 * Multi-board registry — single lookup for every supported exam board.
 *
 * Boards with `refinementStatus === "refined"` have a full
 * `BoardDefinition`. Boards with `"blueprint-pending"` are stubs that the
 * UI uses to render the "coming soon" panel.
 */
import { type BoardDefinition, type BoardId, makeStub, makeRefinedStub } from "./board-definition";
import { AQA_A_LEVEL_DEFINITION } from "./aqa-a-level";
import { EDEXCEL_A_A_LEVEL_DEFINITION } from "./edexcel-a-a-level";

export const BOARD_REGISTRY: Record<BoardId, BoardDefinition> = {
  "aqa-a-level": AQA_A_LEVEL_DEFINITION,
  "edexcel-a-a-level": EDEXCEL_A_A_LEVEL_DEFINITION,

  // Refined: predicted-paper library exists in src/data/*. Full mark-scheme
  // grids land in subsequent prompts via makeRefinedStub upgrades.
  "edexcel-b-a-level": makeRefinedStub("edexcel-b-a-level", "Edexcel B A-Level", "A-Level", "9EB0"),
  "ocr-a-level":       makeRefinedStub("ocr-a-level",       "OCR A-Level",        "A-Level", "H460"),
  "caie-a-level":      makeRefinedStub("caie-a-level",      "CAIE A-Level",       "A-Level", "9708"),
  "ib-hlsl":           makeRefinedStub("ib-hlsl",           "IB HL/SL",           "IB",      "IBDP"),
  "wjec-a-level":      makeRefinedStub("wjec-a-level",      "WJEC A-Level",       "A-Level", "1EC0"),
  "eduqas-a-level":    makeRefinedStub("eduqas-a-level",    "Eduqas A-Level",     "A-Level", "A510QS"),
  "aqa-gcse":          makeRefinedStub("aqa-gcse",          "AQA GCSE",           "GCSE",    "8136"),
  "caie-igcse":        makeRefinedStub("caie-igcse",        "CAIE IGCSE",         "IGCSE",   "0455"),
  "edexcel-igcse":     makeRefinedStub("edexcel-igcse",     "Edexcel IGCSE",      "IGCSE",   "4EC1"),
  "ocr-gcse":          makeRefinedStub("ocr-gcse",          "OCR GCSE",           "GCSE",    "J205"),
};

export function getBoardDefinition(boardId: BoardId): BoardDefinition {
  return BOARD_REGISTRY[boardId];
}

export function listRefinedBoards(): BoardDefinition[] {
  return Object.values(BOARD_REGISTRY).filter((b) => b.refinementStatus === "refined");
}

export function listPendingBoards(): BoardDefinition[] {
  return Object.values(BOARD_REGISTRY).filter((b) => b.refinementStatus !== "refined");
}

/**
 * Map the legacy `subject` keys used across the codebase
 * (`"economics"`, `"edexcel-a"`, …) onto canonical multi-board `BoardId`s.
 * Returns `null` for non-economics subjects (chemistry, maths, etc.).
 */
export function subjectToBoardId(subject: string): BoardId | null {
  switch (subject) {
    case "economics":         return "aqa-a-level";
    case "edexcel-a":         return "edexcel-a-a-level";
    case "edexcel-b":         return "edexcel-b-a-level";
    case "ocr":               return "ocr-a-level";
    case "cambridge":         return "caie-a-level";
    case "ib":                return "ib-hlsl";
    case "wjec":              return "wjec-a-level";
    case "eduqas":            return "eduqas-a-level";
    case "aqa-gcse":          return "aqa-gcse";
    case "cambridge-igcse":   return "caie-igcse";
    case "edexcel-igcse":     return "edexcel-igcse";
    case "ocr-gcse":          return "ocr-gcse";
    default:                  return null;
  }
}
