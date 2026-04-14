/**
 * Marking telemetry — logs every marking event to localStorage.
 * Includes ghost-mark detection.
 */

export interface MarkingLogEntry {
  timestamp: string;
  questionId: string;
  inkRatio: number;
  verificationCompleteness: string | null;
  claudeRawTotal: number;
  validatedTotal: number;
  capped: boolean;
  capReason: string | null;
  // Ghost-mark detection fields
  diagramMarksGivenWithEmpty?: boolean;
  ghostMarkFlag?: boolean;
  componentCount?: number;
}

const LOG_KEY = "marking_log";

export function logMarkingEvent(entry: MarkingLogEntry): void {
  try {
    // Compute ghost-mark flags
    const isEmptyVerification = entry.verificationCompleteness === "empty" || entry.verificationCompleteness === "sparse";
    entry.diagramMarksGivenWithEmpty = isEmptyVerification && entry.claudeRawTotal > 0;
    entry.ghostMarkFlag = entry.validatedTotal > 0 && (entry.inkRatio < 0.05 || (entry.componentCount !== undefined && entry.componentCount < 4));

    if (entry.ghostMarkFlag) {
      console.error(`REGRESSION: ghost mark awarded for question ${entry.questionId}. Review prompt & validator immediately.`);
    }

    const existing: MarkingLogEntry[] = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    existing.push(entry);
    if (existing.length > 200) existing.splice(0, existing.length - 200);
    localStorage.setItem(LOG_KEY, JSON.stringify(existing));
  } catch {
    console.warn("Failed to log marking event");
  }
}

export function getMarkingLog(): MarkingLogEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getGhostMarks(): MarkingLogEntry[] {
  return getMarkingLog().filter((e) => e.ghostMarkFlag);
}

export function getCapRate(): { rate: number; total: number; capped: number } {
  const log = getMarkingLog();
  const recent = log.slice(-50);
  const capped = recent.filter((e) => e.capped).length;
  return { rate: recent.length > 0 ? (capped / recent.length) * 100 : 0, total: recent.length, capped };
}
