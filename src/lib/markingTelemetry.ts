/**
 * Marking telemetry — logs every marking event to localStorage.
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
}

const LOG_KEY = "marking_log";

export function logMarkingEvent(entry: MarkingLogEntry): void {
  try {
    const existing: MarkingLogEntry[] = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    existing.push(entry);
    // Keep last 200 entries
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

export function getCapRate(): { rate: number; total: number; capped: number } {
  const log = getMarkingLog();
  const recent = log.slice(-50);
  const capped = recent.filter((e) => e.capped).length;
  return { rate: recent.length > 0 ? (capped / recent.length) * 100 : 0, total: recent.length, capped };
}
