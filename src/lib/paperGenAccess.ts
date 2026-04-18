/**
 * Allowlist for the "Generate New" predicted-paper feature.
 * Only these emails can see or use the generator UI.
 */
export const PAPER_GEN_ALLOWLIST: ReadonlyArray<string> = [
  "aminul.miah@ateamacademy.co.uk",
  "swapnil.kumar22@alumni.imperial.ac.uk",
  "info@ateamacademy.co.uk",
];

export function canGeneratePapers(email?: string | null): boolean {
  if (!email) return false;
  return PAPER_GEN_ALLOWLIST.includes(email.trim().toLowerCase());
}
