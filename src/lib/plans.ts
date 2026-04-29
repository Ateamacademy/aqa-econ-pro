// Stripe product/price IDs
export const PLAN = {
  name: "Econ Rev Pro",
  price: "£29",
  priceId: "price_1TBHfFHNDORnMchl1Qmf2n3G",
  productId: "prod_U9aqndaYOc63cn",
  expiresAt: "2026-06-29T23:59:59Z",
  description: "One-off payment · Full access until 29 June 2026",
} as const;

export const FREE_LIMITS = {
  papers: 10,
  marking: 10,
  questions: 10,
  tutorQuestions: 10,
  diagrams: 10,
  predictedPapers: 10,
} as const;
