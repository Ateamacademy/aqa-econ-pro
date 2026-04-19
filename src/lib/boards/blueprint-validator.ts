/**
 * Per-board blueprint + content validators.
 *
 * Used by paper generation to verify that generated papers match a board's
 * structural rules and don't contain forbidden boilerplate.
 */
import type { BoardDefinition } from "./board-definition";
import { getBoardDefinition } from "./registry";
import type { BoardId } from "./board-definition";

export type ValidationIssue = {
  kind: "structure" | "forbidden-phrase" | "totals";
  message: string;
  location?: string;
};

/**
 * Verify a generated paper's structure against a board's blueprint.
 *
 * @param boardId   target board
 * @param paperCode paper code (e.g. "9EC0/01")
 * @param parsed    parsed questions [{ number, marks }]
 */
export function validateBlueprint(
  boardId: BoardId,
  paperCode: string,
  parsed: Array<{ number: string; marks: number }>,
): ValidationIssue[] {
  const def = getBoardDefinition(boardId);
  const issues: ValidationIssue[] = [];

  if (def.refinementStatus !== "refined") return issues; // skip pending boards

  const paper = def.papers.find((p) => p.code === paperCode);
  if (!paper) {
    issues.push({ kind: "structure", message: `Unknown paper code "${paperCode}" for ${def.displayName}` });
    return issues;
  }

  const expectedTotal = paper.totalMarks;
  const actualTotal = parsed.reduce((sum, q) => sum + q.marks, 0);
  if (actualTotal !== expectedTotal) {
    issues.push({
      kind: "totals",
      message: `${def.displayName} ${paperCode}: expected ${expectedTotal} marks, got ${actualTotal}`,
    });
  }

  // Edexcel-specific: every section must hit its declared marks total.
  // (For "chooseN" sections we count only the answered N items.)
  if (boardId === "edexcel-a-a-level") {
    for (const section of paper.sections) {
      const sectionQs = section.chooseN
        ? section.questions.slice(0, section.chooseN.answer)
        : section.questions;
      const sectionExpected = section.chooseN
        ? sectionQs.reduce((s, q) => s + q.marks, 0)
        : section.marks;
      const sectionActual = sectionQs
        .map((q) => parsed.find((pq) => pq.number === q.number)?.marks ?? 0)
        .reduce((a, b) => a + b, 0);
      if (sectionActual !== sectionExpected && sectionActual !== 0) {
        issues.push({
          kind: "structure",
          message: `${def.displayName} ${paperCode} Section ${section.id}: expected ${sectionExpected} marks, got ${sectionActual}`,
          location: `Section ${section.id}`,
        });
      }
    }
  }

  return issues;
}

/** Scan generated paper text for board-specific forbidden boilerplate. */
export function findForbiddenPhrases(boardId: BoardId, sectionKey: string, text: string): string[] {
  const def = getBoardDefinition(boardId);
  const list = def.forbiddenPhrases[sectionKey] ?? [];
  return list.filter((phrase) => text.toLowerCase().includes(phrase.toLowerCase()));
}

export function summarizeIssues(issues: ValidationIssue[]): string {
  if (!issues.length) return "✓ Blueprint OK";
  return issues.map((i) => `• [${i.kind}] ${i.message}`).join("\n");
}

export type { BoardDefinition };
