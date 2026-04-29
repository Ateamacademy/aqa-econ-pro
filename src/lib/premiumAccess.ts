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

export function isPremiumDifficulty(tier?: string | null): boolean {
  if (!tier) return false;
  return PREMIUM_DIFFICULTIES.includes(tier.trim());
}
