// Stripe product/price IDs
export const PLANS = {
  monthly: {
    name: "Monthly",
    price: "£4.99/mo",
    priceId: "price_1T4SwcLW1T0jThuRcIzckf1N",
    productId: "prod_U2Y2lMRTLe9DFM",
  },
  yearly: {
    name: "Yearly",
    price: "£47.90/yr",
    priceId: "price_1T4SwzLW1T0jThuR9pAk4POs",
    productId: "prod_U2Y3nYXzLGATVE",
    badge: "Save 20%",
  },
} as const;

export const FREE_LIMITS = {
  papers: 3,
  questions: 2,
  diagrams: 20,
  predictedPapers: 20,
} as const;
