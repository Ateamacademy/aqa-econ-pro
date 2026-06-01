// Stripe publishable key (safe to expose in client code).
// Used only if/when Stripe.js is loaded on the client. Checkout itself
// runs server-side via the create-checkout edge function and redirects
// to a Stripe-hosted page, so this key is here for completeness and any
// future client-side Stripe.js usage (Elements, payment status, etc.).
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_lyVept1Bz4d2OWmn7166D7BK00UFpsAgOS";
