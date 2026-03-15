// Stripe product/price IDs
export const PLAN = {
  name: "Econ Rev Pro",
  price: "£29",
  priceId: "price_1TBDpqLW1T0jThuR5Lq7KNMr",
  productId: "prod_U9WtwjUWrx0aqq",
  expiresAt: "2026-06-29T23:59:59Z",
  description: "One-off payment · Full access until 29 June 2026",
} as const;

export const FREE_LIMITS = {
  papers: 3,
  marking: 3,
  questions: 5,
  tutorQuestions: 5,
  diagrams: 5,
  predictedPapers: 3,
} as const;
