/**
 * Paper-sets infrastructure · enforces "Sets A, B, C minimum per paper" across
 * every refined exam board, while respecting each board's actual paper count.
 *
 * AQA A-Level is intentionally exempt from the 3-set MAXIMUM · it ships with
 * 7 sets (A–G) per paper and that library must NOT be reduced. The rule
 * defined here is a minimum (≥3), not a cap.
 */
import type { BoardId, PaperBlueprint } from "./board-definition";
import { getBoardDefinition } from "./registry";

export const REQUIRED_SET_LABELS = ["A", "B", "C"] as const;
export type RequiredSetLabel = (typeof REQUIRED_SET_LABELS)[number];

export type PaperSetsRequirement = {
  minimumSets: 3;
  maximumSets: number | "unlimited";
  requiredSetLabels: readonly ["A", "B", "C"];
};

/** AQA keeps its 7-set library; everyone else starts at 3 with admin extension. */
export const PAPER_SETS_REQUIREMENT: Record<BoardId, PaperSetsRequirement> = {
  "aqa-a-level":         { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "edexcel-a-a-level":   { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "edexcel-b-a-level":   { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "ocr-a-level":         { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "caie-a-level":        { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "ib-hlsl":             { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "wjec-a-level":        { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "eduqas-a-level":      { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "aqa-gcse":            { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "caie-igcse":          { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "edexcel-igcse":       { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
  "ocr-gcse":            { minimumSets: 3, maximumSets: "unlimited", requiredSetLabels: REQUIRED_SET_LABELS },
};

/** IB HL/SL tier handling · IB is one board with two paper structures. */
export type IbVariant = "HL" | "SL";

export const IB_PAPER_CODES: Record<IbVariant, string[]> = {
  HL: ["paper-1", "paper-2", "paper-3"],
  SL: ["paper-1", "paper-2", "paper-3"],
};

/**
 * Authoritative paper count per board.
 *
 * Product rule: every refined board exposes exactly THREE papers
 * (Paper 1, Paper 2, Paper 3) × THREE sets (A, B, C) = 9 papers total.
 * This overrides natural spec counts (e.g. CAIE has 4, GCSE has 2) so the
 * Predicted Papers library is consistent across every board.
 */
export const BOARD_PAPER_COUNT: Record<BoardId, number> = {
  "aqa-a-level":       3,
  "edexcel-a-a-level": 3,
  "edexcel-b-a-level": 3,
  "ocr-a-level":       3,
  "caie-a-level":      3,
  "ib-hlsl":           3,
  "wjec-a-level":      3,
  "eduqas-a-level":    3,
  "aqa-gcse":          3,
  "caie-igcse":        3,
  "edexcel-igcse":     3,
  "ocr-gcse":          3,
};

/** Total papers per board = papers × required sets (always 3 × 3 = 9). */
export const PAPERS_PER_BOARD_TOTAL = 9;


/** Reject generation requests that target non-existent papers on a board. */
export type GenerationRequest = {
  boardId: BoardId;
  paperCode: string;
  setLabel: string;
  ibVariant?: IbVariant;
};

export function validateGenerationRequest(req: GenerationRequest): void {
  const board = getBoardDefinition(req.boardId);

  if (board.refinementStatus !== "refined") {
    throw new Error(
      `${board.displayName} is not refined yet · cannot generate papers.`,
    );
  }

  // IB has its own variant-aware validation
  if (req.boardId === "ib-hlsl") {
    const variant = req.ibVariant ?? "HL";
    const valid = IB_PAPER_CODES[variant];
    if (!valid.includes(req.paperCode)) {
      throw new Error(
        `IB ${variant} does not have ${req.paperCode}. ` +
        `Valid papers: ${valid.join(", ")}.`,
      );
    }
    return;
  }

  const paperExists = board.papers.some((p) => p.code === req.paperCode);
  if (!paperExists) {
    throw new Error(
      `${board.displayName} does not have ${req.paperCode}. ` +
      `Valid papers for this board: ${board.papers.map((p) => p.code).join(", ")}`,
    );
  }
}

/** Per-paper coverage report shown in /admin/board-coverage. */
export type PaperCoverage = {
  paper: PaperBlueprint;
  existingSets: string[];
  meetsMinimum: boolean;
  missingRequired: string[];
};

export type BoardCoverage = {
  boardId: BoardId;
  displayName: string;
  refinementStatus: "refined" | "blueprint-pending" | "not-started";
  papers: PaperCoverage[];
  overallMeetsMinimum: boolean;
};

/**
 * Compute coverage for a board given a map of paperCode → existing set labels.
 * The caller is responsible for sourcing existing sets (e.g. from
 * predictedPapersLibrary or Supabase).
 */
export function computeBoardCoverage(
  boardId: BoardId,
  existingSetsByPaper: Record<string, string[]>,
): BoardCoverage {
  const board = getBoardDefinition(boardId);
  const papers: PaperCoverage[] = board.papers.map((paper) => {
    const existing = existingSetsByPaper[paper.code] ?? [];
    const missing = REQUIRED_SET_LABELS.filter((l) => !existing.includes(l));
    return {
      paper,
      existingSets: existing.slice().sort(),
      meetsMinimum: missing.length === 0,
      missingRequired: [...missing],
    };
  });

  return {
    boardId,
    displayName: board.displayName,
    refinementStatus: board.refinementStatus,
    papers,
    overallMeetsMinimum:
      board.refinementStatus !== "refined" || papers.every((p) => p.meetsMinimum),
  };
}

/**
 * Generate Sets A, B, C in greedy order (all As → all Bs → all Cs) so that each
 * subsequent set has more cross-set fingerprints to avoid. The actual paper
 * generator is injected by the caller · this orchestrator only sequences the
 * calls and surfaces failures.
 */
export type SetGenerator = (req: GenerationRequest) => Promise<void>;

export async function initialiseBoard(
  boardId: BoardId,
  generate: SetGenerator,
  opts?: { ibVariant?: IbVariant; maxRetries?: number },
): Promise<void> {
  const board = getBoardDefinition(boardId);
  if (board.refinementStatus !== "refined") {
    throw new Error(`Board ${boardId} is not refined yet`);
  }

  const maxRetries = opts?.maxRetries ?? 3;
  const papers =
    boardId === "ib-hlsl"
      ? IB_PAPER_CODES[opts?.ibVariant ?? "HL"].map((code) => ({ code }))
      : board.papers.map((p) => ({ code: p.code }));

  // Greedy: all Set As first, then all Bs, then all Cs.
  for (const setLabel of REQUIRED_SET_LABELS) {
    for (const paper of papers) {
      let attempt = 0;
      let lastErr: unknown;
      while (attempt < maxRetries) {
        attempt++;
        try {
          await generate({
            boardId,
            paperCode: paper.code,
            setLabel,
            ibVariant: opts?.ibVariant,
          });
          lastErr = null;
          break;
        } catch (e) {
          lastErr = e;
        }
      }
      if (lastErr) {
        throw new Error(
          `Failed to generate ${board.displayName} ${paper.code} Set ${setLabel} ` +
          `after ${maxRetries} attempts: ${String(lastErr)}`,
        );
      }
    }
  }
}
