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
  // Admins
  "swapnil.kumar22@alumni.imperial.ac.uk",
  "aminul.miah@ateamacademy.co.uk",
  "info@ateamacademy.co.uk",
  "samirmiskin@icloud.com",
  // Testers / comp accounts (mirrors check-subscription tester allowlist so
  // gating still works client-side if the subscription check is degraded).
  "student1@email.com",
  "student2@email.com",
  "tester@email.com",
  "trial1@econrev.com",
  "trial2@econrev.com",
  "trial3@econrev.com",
  "trial4@econrev.com",
  "trial5@econrev.com",
  "aminul_miah@yahoo.co.uk",
  "adeniyisarah05@gmail.com",
  "swapnilkumar.2016@vitalum.ac.in",
  "ivan.radic1992@gmail.com",
  "ufareed12@gmail.com",
  "anjali.doal08@gmail.com",
  "zaki089@outlook.com",
  "avni08parmar@hotmail.com",
  "avniparmar88@hotmail.com",
  "avi08parmar@hotmail.com",
  "aviparmar88@hotmail.com",
  "anviparmar88@hotmail.com",
  "anvi08parmar@hotmail.com",
  "anvith.sujay@gmail.com",
  "zakariyahassan185@gmail.com",
  "adie.gascoigne@gmail.com",
  "josh000000r@gmail.com",
  "tayyibahsajjad@live.co.uk",
  "zainabintrayhan@gmail.com",
  "fatima4r@hotmail.com",
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
