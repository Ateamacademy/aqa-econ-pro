/**
 * Premium feature access gate.
 *
 * Used to restrict premium-only features (Papers section, Hard/Advanced
 * predicted papers) to paying subscribers and admins. Tester / admin
 * emails are already mapped to `subscribed: true` server-side by the
 * check-subscription edge function, so the subscribed flag from
 * useAuth() is the single source of truth here.
 */

const ADMIN_EMAILS: ReadonlyArray<string> = [
  "swapnil.kumar22@alumni.imperial.ac.uk",
  "aminul.miah@ateamacademy.co.uk",
  "info@ateamacademy.co.uk",
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function hasPremiumAccess(opts: {
  subscribed?: boolean;
  email?: string | null;
}): boolean {
  return Boolean(opts.subscribed) || isAdminEmail(opts.email);
}

/** Difficulties gated behind a paid subscription. */
export const PREMIUM_DIFFICULTIES: ReadonlyArray<string> = ["Hard", "Advanced"];

const SET_DIFFICULTY_MAP: Record<string, "Moderate" | "Hard" | "Advanced"> = {
  A: "Moderate",
  B: "Hard",
  C: "Advanced",
};

export function getPredictedPaperDifficulty(paper?: {
  tier?: string | null;
  title?: string | null;
}): string | null {
  const tier = paper?.tier?.trim();
  if (tier) return tier;

  const title = paper?.title ?? "";
  const explicitDifficulty = title.match(/\b(Moderate|Hard|Advanced)\b/i)?.[1];
  if (explicitDifficulty) {
    return explicitDifficulty[0].toUpperCase() + explicitDifficulty.slice(1).toLowerCase();
  }

  const setLetter = title.match(/\bSet\s+([A-Z])\b/i)?.[1]?.toUpperCase();
  return setLetter ? SET_DIFFICULTY_MAP[setLetter] ?? null : null;
}

export function isPremiumDifficulty(tier?: string | null): boolean {
  if (!tier) return false;
  const normalized = tier.trim().toLowerCase();
  return PREMIUM_DIFFICULTIES.some((difficulty) => difficulty.toLowerCase() === normalized);
}

export function isPremiumPredictedPaper(paper?: {
  tier?: string | null;
  title?: string | null;
}): boolean {
  return isPremiumDifficulty(getPredictedPaperDifficulty(paper));
}
