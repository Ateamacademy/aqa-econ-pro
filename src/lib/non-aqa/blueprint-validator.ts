/**
 * Non-AQA blueprint validator · parallel to `src/lib/boards/blueprint-validator.ts`.
 *
 * The shared validator already covers totals + Edexcel-A section structure,
 * but the per-board sectional rules differ widely (CAIE has 4 papers, IB has
 * different paper sets, GCSE has 2 papers, etc.). Rather than overloading the
 * shared validator with branch logic for every board, this file owns the
 * non-AQA structural checks. AQA continues to use whatever validation runs
 * via the shared validator · that path is untouched.
 */
import type { BoardDefinition, PaperBlueprint } from "@/lib/boards/board-definition";
import type { NonAqaBoardId } from "./marking-convention.types";
import { getBoardDefinition } from "@/lib/boards/registry";

export type NonAqaValidationIssue = {
  kind: "structure" | "totals" | "section-marks" | "missing-paper";
  severity: "error" | "warning";
  message: string;
  location?: string;
};

export function validateNonAqaPaper(
  boardId: NonAqaBoardId,
  paperCode: string,
  parsedQuestions: Array<{ number: string; marks: number; sectionId?: string }>,
): NonAqaValidationIssue[] {
  const def: BoardDefinition = getBoardDefinition(boardId);
  const issues: NonAqaValidationIssue[] = [];

  if (def.refinementStatus !== "refined" || def.papers.length === 0) {
    return issues;
  }

  const paper: PaperBlueprint | undefined = def.papers.find((p) => p.code === paperCode);
  if (!paper) {
    issues.push({
      kind: "missing-paper",
      severity: "error",
      message: `${def.displayName}: paper code "${paperCode}" not in blueprint`,
    });
    return issues;
  }

  const total = parsedQuestions.reduce((s, q) => s + q.marks, 0);
  if (total !== paper.totalMarks) {
    issues.push({
      kind: "totals",
      severity: "error",
      message: `${def.displayName} ${paperCode}: expected ${paper.totalMarks} marks, got ${total}`,
    });
  }

  // Per-section sums (works for any board whose paper has multiple sections)
  for (const section of paper.sections) {
    const inSection = parsedQuestions.filter((q) =>
      section.questions.some((bq) => bq.number === q.number),
    );
    if (inSection.length === 0) continue;
    const expected = section.chooseN
      ? section.questions
          .slice(0, section.chooseN.answer)
          .reduce((s, q) => s + q.marks, 0)
      : section.marks;
    const actual = inSection.reduce((s, q) => s + q.marks, 0);
    if (actual !== expected) {
      issues.push({
        kind: "section-marks",
        severity: "warning",
        message: `${def.displayName} ${paperCode} Section ${section.id}: expected ${expected} marks, got ${actual}`,
        location: `Section ${section.id}`,
      });
    }
  }

  return issues;
}

export function summarizeNonAqaIssues(issues: NonAqaValidationIssue[]): string {
  if (!issues.length) return "✓ Non-AQA blueprint OK";
  return issues.map((i) => `• [${i.severity} | ${i.kind}] ${i.message}`).join("\n");
}
