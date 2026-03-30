/**
 * OCR A-LEVEL DIAGRAM_SPECS
 *
 * Diagram specs derived from the official OCR Teacher Support Diagram Guide (2024)
 * and OCR-endorsed textbooks (Peter Smith, 4th Edition).
 *
 * OCR-specific design rules embedded:
 *   - Axes MUST be labelled in context when question names specific goods
 *   - Points on diagrams MUST be explicitly referenced (x, y, A, B, C etc.)
 *   - OCR distinguishes merit/demerit goods from externalities
 *   - OCR merit good uses D (perceived) and D₁ (actual), NOT MSB/MPB
 *   - OCR demerit good uses D (perceived) and D₁ (actual), NOT MSB/MPB
 *   - Welfare triangles: negative ext → "backwards" triangle; positive → "forwards"
 *   - Buffer stock schemes have buy/sell price bands
 *   - Tradeable pollution permits have their own market diagram
 */

import type { DiagramSpec } from "@/components/diagrams/diagramSpecs";

const C = {
  demand: "#ef4444",
  supply: "#3b82f6",
  shifted: "#f59e0b",
  eq: "#16a34a",
  area: "#8b5cf6",
  msc: "#ef4444",
  msb: "#3b82f6",
  mpc: "#f97316",
  mpb: "#93c5fd",
  orange: "#f97316",
  gold: "#eab308",
  teal: "#14b8a6",
  pink: "#ec4899",
  lras: "#6b7280",
};

export const OCR_DIAGRAM_SPECS: Record<string, DiagramSpec> = {

  /* ══════════════════════════════════════════
     1. TRADE-OFF (Straight-line PPC)
     ══════════════════════════════════════════ */

  ocr_tradeoff_straight: {
    title: "Straight-Line Trade-Off (Constant Opportunity Cost)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPC", label: "PPC", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "x", position: { x: 3, y: 5 }, color: C.eq, size: 12 },
      { text: "y", position: { x: 5, y: 3 }, color: C.eq, size: 12 },
      { text: "Constant opportunity cost", position: { x: 2, y: 2 }, color: C.area, size: 10 },
    ],
    legend: [{ label: "PPC", color: C.supply }],
    notes: "A straight-line PPC shows constant opportunity cost. Moving from x to y means giving up the same amount of capital goods for each extra consumer good. OCR requires axes labelled in context when specific goods are named.",
    examTips: [
      "Straight line = constant opportunity cost",
      "Always refer to named points (x, y) in your analysis",
      "In micro context, rename axes to match the goods in the question",
    ],
  },

  /* ══════════════════════════════════════════
     2. PPC VARIANTS
     ══════════════════════════════════════════ */

  ocr_ppc_basic: {
    title: "Production Possibility Curve — Basic",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPC", label: "PPC", params: { type: "quadratic", a: 0.15, b: -2, c: 9 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "A (efficient)", position: { x: 3, y: 5.5 }, color: C.eq, size: 10 },
      { text: "B (efficient)", position: { x: 5, y: 3.5 }, color: C.eq, size: 10 },
      { text: "D (inefficient)", position: { x: 3, y: 3 }, color: C.demand, size: 10 },
      { text: "E (unattainable)", position: { x: 7, y: 6 }, color: C.pink, size: 10 },
    ],
    legend: [{ label: "PPC", color: C.supply }],
    notes: "Points on the PPC (A, B, C) are efficient — maximum output using all resources. D inside is inefficient. E outside is unattainable with current resources. OCR emphasises increasing opportunity cost with curved PPC.",
    examTips: [
      "On the PPC = efficient (all resources utilised)",
      "Inside = inefficient (not all resources utilised)",
      "Outside = unattainable with current resources",
      "Use labelled points in your written analysis",
    ],
  },

  ocr_ppc_shift_out: {
    title: "PPC — Outward Shift (Economic Growth)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPC1", label: "PPC₁", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
      { id: "PPC2", label: "PPC₂", params: { type: "linear", slope: -1, intercept: 10 }, color: C.eq, dash: true, shiftedFrom: "PPC1" },
    ],
    equilibria: [],
    annotations: [
      { text: "More resources / productivity", position: { x: 4, y: 8.5 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "PPC₁", color: C.supply }, { label: "PPC₂ (growth)", color: C.eq }],
    notes: "PPC shifts outward from more factors of production, improved productivity, or technical progress. OCR expects explanation of the cause of the shift.",
    examTips: [
      "Shift out = more/better factors of production or technical advance",
      "Show arrow indicating direction of shift",
      "If only one sector improves, PPC pivots on one axis only",
    ],
  },

  ocr_ppc_biased: {
    title: "PPC — Biased Shift (One Sector Only)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPC1", label: "PPC₁", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
      { id: "PPC2", label: "PPC₂", params: { type: "linear", slope: -1.5, intercept: 12 }, color: C.eq, dash: true, shiftedFrom: "PPC1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Improvement in capital goods production only", position: { x: 2, y: 9 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "PPC₁", color: C.supply }, { label: "PPC₂ (biased)", color: C.eq }],
    notes: "If improvement only affects ability to produce one type of good (e.g. capital), PPC shifts outward only on that axis. This is a pivotal/biased shift.",
    examTips: [
      "Only shifts on the axis where improvement occurs",
      "Must explain WHY only one sector benefits",
    ],
  },

  /* ══════════════════════════════════════════
     3. DEMAND VARIANTS
     ══════════════════════════════════════════ */

  ocr_demand_basic: {
    title: "Demand Curve — Basic",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "P", position: { x: 0.5, y: 7 }, color: C.demand, size: 11 },
      { text: "P₁", position: { x: 0.5, y: 5 }, color: C.demand, size: 11 },
      { text: "Q", position: { x: 2.5, y: 0.5 }, color: C.demand, size: 11 },
      { text: "Q₁", position: { x: 5, y: 0.5 }, color: C.demand, size: 11 },
    ],
    legend: [{ label: "Demand", color: C.demand }],
    notes: "The demand curve slopes downward. As price falls from P to P₁, quantity demanded increases from Q to Q₁. OCR: Always fully label axes with 'Price' and 'Quantity'.",
    examTips: [
      "Always fully label axes",
      "Explain what is happening to P and Q and why",
      "Individual demand vs market demand",
    ],
  },

  ocr_demand_shift: {
    title: "Demand — Shift (Increase/Decrease)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 8 }, color: C.demand },
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 10 }, color: C.shifted, dash: true, shiftedFrom: "D" },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S", color: C.eq, pLabel: "P", qLabel: "Q" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S", color: C.gold, pLabel: "P₁", qLabel: "Q₁" },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "D₁", color: C.shifted }, { label: "S", color: C.supply }],
    notes: "Non-price factors shift demand: income, tastes, population, advertising, price of substitutes/complements. OCR: explain what happens to P and Q.",
    examTips: [
      "Price → movement along; other factors → shift",
      "Extension (price falls) / Contraction (price rises)",
      "If given info about size of change, show in diagram",
    ],
  },

  ocr_demand_joint: {
    title: "Joint Demand (Complementary Goods)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 8 }, color: C.demand },
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 10 }, color: C.shifted, dash: true, shiftedFrom: "D" },
    ],
    equilibria: [],
    annotations: [
      { text: "Demand increases as complement price falls", position: { x: 3, y: 9 }, color: C.shifted, size: 10 },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "D₁", color: C.shifted }],
    notes: "Joint demand: two complementary goods demanded together. If price of consoles falls, demand for games increases (D→D₁). OCR: use two market diagrams to show knock-on effect.",
  },

  ocr_demand_competitive: {
    title: "Competitive Demand (Substitute Goods)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 8 }, color: C.demand },
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 10 }, color: C.shifted, dash: true, shiftedFrom: "D" },
    ],
    equilibria: [],
    annotations: [
      { text: "Demand increases as substitute price rises", position: { x: 3, y: 9 }, color: C.shifted, size: 10 },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "D₁", color: C.shifted }],
    notes: "Competitive demand: substitute goods. If price of butter rises, demand for margarine increases. OCR: label curves with product names for clarity.",
  },

  /* ══════════════════════════════════════════
     4. SUPPLY VARIANTS
     ══════════════════════════════════════════ */

  ocr_supply_basic: {
    title: "Supply Curve — Basic",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "Extension", position: { x: 7, y: 7 }, color: C.supply, size: 10 },
      { text: "Contraction", position: { x: 3, y: 3.5 }, color: C.supply, size: 10 },
    ],
    legend: [{ label: "Supply", color: C.supply }],
    notes: "Supply slopes upward. Higher price incentivises producers to supply more. OCR: distinguish movement along (extension/contraction) from shift (increase/decrease).",
  },

  ocr_supply_shift: {
    title: "Supply — Shift",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 2 }, color: C.supply },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 0.5 }, color: C.eq, dash: true, shiftedFrom: "S" },
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S", color: C.eq, pLabel: "P", qLabel: "Q" },
      { id: "E2", label: "E₂", curve1: "D", curve2: "S1", color: C.gold, pLabel: "P₁", qLabel: "Q₁" },
    ],
    legend: [{ label: "S", color: C.supply }, { label: "S₁", color: C.eq }, { label: "D", color: C.demand }],
    notes: "Supply increases (shifts right) due to lower costs, technology, more firms. OCR: always explain what happens to price and quantity.",
  },

  /* ══════════════════════════════════════════
     5. CONSUMER & PRODUCER SURPLUS
     ══════════════════════════════════════════ */

  ocr_consumer_surplus: {
    title: "Consumer Surplus",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
    ],
    equilibria: [],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { x: 0, y: 9 },
          { x: 0, y: 5 },
          { x: 5, y: 5 },
        ],
        color: C.supply,
        opacity: 0.15,
        label: "Consumer Surplus",
      },
    ],
    annotations: [
      { text: "Market price", position: { x: 6, y: 5 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "CS (shaded)", color: C.supply }],
    notes: "Consumer surplus = area above price, below demand curve. It represents the difference between what consumers are willing to pay and what they actually pay. OCR: use labels rather than just shading.",
    examTips: [
      "CS is above price, below demand",
      "When price rises, CS decreases",
      "Use point labels (X, Y, Z) for area references in written analysis",
    ],
  },

  ocr_producer_surplus: {
    title: "Producer Surplus",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { x: 0, y: 1 },
          { x: 0, y: 5 },
          { x: 5, y: 5 },
        ],
        color: C.demand,
        opacity: 0.15,
        label: "Producer Surplus",
      },
    ],
    annotations: [
      { text: "Market price", position: { x: 6, y: 5 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "S", color: C.supply }, { label: "PS (shaded)", color: C.demand }],
    notes: "Producer surplus = area below market price, above supply curve. OCR: label areas clearly for reference in analysis.",
  },

  /* ══════════════════════════════════════════
     6. MARGINAL UTILITY
     ══════════════════════════════════════════ */

  ocr_marginal_utility: {
    title: "Marginal Utility / Diminishing MU",
    axisLabels: { x: "Quantity", y: "Price / Utility" },
    curves: [
      { id: "DMU", label: "D = MU", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
    ],
    equilibria: [],
    annotations: [
      { text: "Diminishing marginal utility", position: { x: 5, y: 6 }, color: C.area, size: 10 },
    ],
    legend: [{ label: "D = MU", color: C.demand }],
    notes: "Marginal utility curve is the demand curve when utility is measured in money. Each additional unit gives less satisfaction → explains downward slope. OCR: can label D or D=MU.",
  },

  /* ══════════════════════════════════════════
     7. EXTERNALITIES (OCR-specific labelling)
     ══════════════════════════════════════════ */

  ocr_neg_prod_ext: {
    title: "Negative Production Externality",
    axisLabels: { x: "Quantity", y: "Costs / Benefits" },
    curves: [
      { id: "MPC", label: "MPC", params: { type: "linear", slope: 0.6, intercept: 1 }, color: C.mpc },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.6, intercept: 3 }, color: C.msc },
      { id: "MPB_MSB", label: "MPB = MSB", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.msb },
    ],
    equilibria: [
      { id: "Efm", label: "Free market", curve1: "MPB_MSB", curve2: "MPC", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "Social optimum", curve1: "MPB_MSB", curve2: "MSC", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { eq: "Eopt" },
          { eq: "Efm" },
          { x: 5.71, y: 6.43 },
        ],
        color: C.demand,
        opacity: 0.15,
        label: "Deadweight welfare loss",
      },
    ],
    legend: [
      { label: "MPC", color: C.mpc },
      { label: "MSC", color: C.msc },
      { label: "MPB = MSB", color: C.msb },
    ],
    notes: "OCR: Producer only considers MPC. External costs (MEC) = vertical distance between MPC and MSC. Overproduction at Q; social optimum at Q₁. Welfare loss triangle 'points backwards'. Size of gap = significance of externality.",
    examTips: [
      "Free market → overproduction (Q > Q₁)",
      "Welfare loss triangle points backwards (left)",
      "Label MPC, MSC, MPB=MSB clearly",
      "Size of gap between MPC and MSC = size of external cost",
    ],
    sanityChecks: [
      { description: "Q₁ < Q (social opt < free market → overproduction)", check: { eq1: "Eopt", eq2: "Efm", axis: "x", relation: "<" } },
    ],
  },

  ocr_pos_prod_ext: {
    title: "Positive Production Externality",
    axisLabels: { x: "Quantity", y: "Costs / Benefits" },
    curves: [
      { id: "MPC", label: "MPC", params: { type: "linear", slope: 0.7, intercept: 2 }, color: C.mpc },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.4, intercept: 0.5 }, color: C.teal },
      { id: "MPB_MSB", label: "MPB = MSB", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.msb },
    ],
    equilibria: [
      { id: "Efm", label: "Free market", curve1: "MPB_MSB", curve2: "MPC", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "Social optimum", curve1: "MPB_MSB", curve2: "MSC", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { eq: "Efm" },
          { eq: "Eopt" },
          { x: 4.67, y: 3.77 },
        ],
        color: C.eq,
        opacity: 0.15,
        label: "Welfare gain possible",
      },
    ],
    legend: [
      { label: "MPC", color: C.mpc },
      { label: "MSC", color: C.teal },
      { label: "MPB = MSB", color: C.msb },
    ],
    notes: "OCR: MSC is BELOW MPC because production creates positive spillovers. Underproduction at Q; social optimum at Q₁ (more). Welfare triangle 'points forwards'. OCR: size of shift indicates significance of underproduction.",
    examTips: [
      "MSC below MPC = positive production externality",
      "Free market → underproduction (Q < Q₁)",
      "Welfare triangle points forwards (right)",
    ],
    sanityChecks: [
      { description: "Q < Q₁ (free market < social opt → underproduction)", check: { eq1: "Efm", eq2: "Eopt", axis: "x", relation: "<" } },
    ],
  },

  ocr_pos_cons_ext: {
    title: "Positive Consumption Externality",
    axisLabels: { x: "Quantity", y: "Costs / Benefits" },
    curves: [
      { id: "MSC_MPC", label: "MSC = MPC", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.mpc },
      { id: "MPB", label: "MPB", params: { type: "linear", slope: -0.8, intercept: 8 }, color: C.demand },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.8, intercept: 10 }, color: C.msb, dash: true },
    ],
    equilibria: [
      { id: "Efm", label: "Free market", curve1: "MPB", curve2: "MSC_MPC", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "Social optimum", curve1: "MSB", curve2: "MSC_MPC", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { eq: "Efm" },
          { eq: "Eopt" },
          { x: 4.67, y: 7.27 },
        ],
        color: C.eq,
        opacity: 0.15,
        label: "Welfare that could have been gained",
      },
    ],
    legend: [
      { label: "MSC = MPC", color: C.mpc },
      { label: "MPB", color: C.demand },
      { label: "MSB", color: C.msb },
    ],
    notes: "OCR: Consumer only considers MPB. External benefits to third parties mean MSB > MPB. Underconsumption at Q; social optimum at Q₁. NOT to be confused with merit goods.",
    examTips: [
      "MSB above MPB = positive consumption externality",
      "Underconsumption → welfare that could have been gained",
      "Do NOT confuse with merit good diagram",
    ],
    sanityChecks: [
      { description: "Q < Q₁ (underconsumption)", check: { eq1: "Efm", eq2: "Eopt", axis: "x", relation: "<" } },
    ],
  },

  ocr_neg_cons_ext: {
    title: "Negative Consumption Externality",
    axisLabels: { x: "Quantity", y: "Costs / Benefits" },
    curves: [
      { id: "MSC_MPC", label: "MSC = MPC", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.mpc },
      { id: "MPB", label: "MPB", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "MSB", label: "MSB", params: { type: "linear", slope: -0.8, intercept: 7 }, color: C.msb, dash: true },
    ],
    equilibria: [
      { id: "Efm", label: "Free market", curve1: "MPB", curve2: "MSC_MPC", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "Social optimum", curve1: "MSB", curve2: "MSC_MPC", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { eq: "Eopt" },
          { eq: "Efm" },
          { x: 5.33, y: 5.73 },
        ],
        color: C.demand,
        opacity: 0.15,
        label: "Deadweight welfare loss",
      },
    ],
    legend: [
      { label: "MSC = MPC", color: C.mpc },
      { label: "MPB", color: C.demand },
      { label: "MSB", color: C.msb },
    ],
    notes: "OCR: MPB > MSB means consumer ignores negative externality to third parties. Overconsumption at Q; social optimum at Q₁ (less). Do NOT confuse with demerit goods.",
    examTips: [
      "MPB above MSB = negative consumption externality",
      "Overconsumption → deadweight welfare loss",
      "Do NOT confuse with demerit good diagram",
    ],
    sanityChecks: [
      { description: "Q₁ < Q (overconsumption)", check: { eq1: "Eopt", eq2: "Efm", axis: "x", relation: "<" } },
    ],
  },

  /* ══════════════════════════════════════════
     8. INFORMATION FAILURE — MERIT & DEMERIT
     OCR uses D(perceived)/D₁(actual), NOT MSB/MPB
     ══════════════════════════════════════════ */

  ocr_merit_good: {
    title: "Merit Good (Information Failure)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D_perceived", label: "D (perceived)", params: { type: "linear", slope: -0.8, intercept: 7 }, color: C.demand },
      { id: "D_actual", label: "D₁ (actual)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.eq, dash: true },
    ],
    equilibria: [
      { id: "Efm", label: "Market failure", curve1: "D_perceived", curve2: "S", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "Optimum", curve1: "D_actual", curve2: "S", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { eq: "Efm" },
          { eq: "Eopt" },
          { x: 4, y: 6.6 },
        ],
        color: C.eq,
        opacity: 0.15,
        label: "Welfare gain possible",
      },
    ],
    legend: [
      { label: "S", color: C.supply },
      { label: "D (perceived)", color: C.demand },
      { label: "D₁ (actual)", color: C.eq },
    ],
    notes: "OCR CRITICAL: Merit goods are NOT the same as externalities. They are a separate form of market failure caused by information failure. The individual underestimates the benefit. Use D/D₁ labelling, NOT MSB/MPB.",
    examTips: [
      "Merit good = information failure, NOT externality",
      "Use D (perceived) and D₁ (actual) — NOT MSB/MPB",
      "Underconsumption due to lack of information",
      "Education is a common example",
      "Size of shift = extent of information failure",
    ],
    sanityChecks: [
      { description: "Q < Q₁ (underconsumption)", check: { eq1: "Efm", eq2: "Eopt", axis: "x", relation: "<" } },
    ],
  },

  ocr_demerit_good: {
    title: "Demerit Good (Information Failure)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D_perceived", label: "D (perceived)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "D_actual", label: "D₁ (actual)", params: { type: "linear", slope: -0.8, intercept: 7 }, color: C.teal, dash: true },
    ],
    equilibria: [
      { id: "Efm", label: "Market failure", curve1: "D_perceived", curve2: "S", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "Optimum", curve1: "D_actual", curve2: "S", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    shading: [
      {
        type: "triangle" as const,
        vertices: [
          { eq: "Eopt" },
          { eq: "Efm" },
          { x: 5.33, y: 5.73 },
        ],
        color: C.demand,
        opacity: 0.15,
        label: "Welfare loss",
      },
    ],
    legend: [
      { label: "S", color: C.supply },
      { label: "D (perceived)", color: C.demand },
      { label: "D₁ (actual)", color: C.teal },
    ],
    notes: "OCR CRITICAL: Demerit goods are NOT negative externalities. They are information failure — the individual overestimates the benefit. Use D (perceived) / D₁ (actual), NOT MSB/MPB.",
    examTips: [
      "Demerit good = information failure, NOT externality",
      "Use D (perceived) and D₁ (actual) — NOT MSB/MPB",
      "Overconsumption due to perceived benefit > actual benefit",
      "Smoking and alcohol are common examples",
    ],
    sanityChecks: [
      { description: "Q₁ < Q (overconsumption)", check: { eq1: "Eopt", eq2: "Efm", axis: "x", relation: "<" } },
    ],
  },

  /* ══════════════════════════════════════════
     9. GOVERNMENT INTERVENTION
     ══════════════════════════════════════════ */

  ocr_indirect_tax: {
    title: "Indirect Tax (Correcting Negative Externality)",
    axisLabels: { x: "Quantity", y: "Costs / Price" },
    curves: [
      { id: "MPC", label: "MPC", params: { type: "linear", slope: 0.6, intercept: 1 }, color: C.mpc },
      { id: "MSC_tax", label: "MSC = MPC + tax", params: { type: "linear", slope: 0.6, intercept: 3 }, color: C.msc, dash: true },
      { id: "MPB_MSB", label: "MPB = MSB", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.msb },
    ],
    equilibria: [
      { id: "Efm", label: "Before tax", curve1: "MPB_MSB", curve2: "MPC", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "After tax", curve1: "MPB_MSB", curve2: "MSC_tax", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    legend: [
      { label: "MPC", color: C.mpc },
      { label: "MSC = MPC + tax", color: C.msc },
      { label: "MPB = MSB", color: C.msb },
    ],
    notes: "OCR: Tax shifts MPC to MSC, internalising the externality. Price rises P→P₁, quantity falls Q→Q₁. Effectiveness depends on PED, XED, and accuracy of tax level.",
    examTips: [
      "Tax internalises the externality",
      "Effectiveness depends on PED and correct tax level",
      "For demerit goods, use S/D labels instead of MSC/MPB",
    ],
  },

  ocr_subsidy_correction: {
    title: "Subsidy (Correcting Positive Externality)",
    axisLabels: { x: "Quantity", y: "Costs / Price" },
    curves: [
      { id: "MPC", label: "MPC", params: { type: "linear", slope: 0.7, intercept: 2 }, color: C.mpc },
      { id: "MSC", label: "MSC", params: { type: "linear", slope: 0.4, intercept: 0.5 }, color: C.teal },
      { id: "MSC_sub", label: "MPC + subsidy", params: { type: "linear", slope: 0.7, intercept: 0.5 }, color: C.eq, dash: true, shiftedFrom: "MPC" },
      { id: "MPB_MSB", label: "MPB = MSB", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.msb },
    ],
    equilibria: [
      { id: "Efm", label: "Before subsidy", curve1: "MPB_MSB", curve2: "MPC", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "After subsidy", curve1: "MPB_MSB", curve2: "MSC_sub", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    legend: [
      { label: "MPC", color: C.mpc },
      { label: "MPC + subsidy", color: C.eq },
      { label: "MPB = MSB", color: C.msb },
    ],
    notes: "OCR: Subsidy reduces production costs, shifting MPC to correct underproduction. Price falls P→P₁, quantity rises Q→Q₁. For merit goods, use S/D labels.",
  },

  ocr_max_price: {
    title: "Maximum Price (Price Ceiling)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmax", label: "P Max", params: { type: "horizontal", y: 4 }, color: C.demand, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S", color: C.eq, pLabel: "P", qLabel: "Q" },
    ],
    annotations: [
      { text: "Excess demand", position: { x: 5, y: 3.2 }, color: C.demand, size: 11 },
      { text: "QS", position: { x: 3.75, y: 0.5 }, color: C.supply, size: 11 },
      { text: "QD", position: { x: 6.25, y: 0.5 }, color: C.demand, size: 11 },
    ],
    legend: [
      { label: "D", color: C.demand },
      { label: "S", color: C.supply },
      { label: "P Max", color: C.demand },
    ],
    notes: "OCR: Maximum price is set BELOW equilibrium. Creates excess demand (QD > QS). Used for essential goods like housing. May cause shortages, black markets.",
    examTips: [
      "Must be below equilibrium to be effective",
      "Creates excess demand / shortage",
      "May cause unintended consequences: black market, lower quality",
    ],
  },

  ocr_min_price: {
    title: "Minimum Price (Price Floor)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmin", label: "P Min", params: { type: "horizontal", y: 6 }, color: C.eq, dash: true, width: 3 },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S", color: C.eq, pLabel: "P", qLabel: "Q" },
    ],
    annotations: [
      { text: "Excess supply", position: { x: 5, y: 6.8 }, color: C.supply, size: 11 },
      { text: "QD", position: { x: 3.75, y: 0.5 }, color: C.demand, size: 11 },
      { text: "QS", position: { x: 6.25, y: 0.5 }, color: C.supply, size: 11 },
    ],
    legend: [
      { label: "D", color: C.demand },
      { label: "S", color: C.supply },
      { label: "P Min", color: C.eq },
    ],
    notes: "OCR: Minimum price is set ABOVE equilibrium. Creates excess supply (QS > QD). Used for alcohol, agricultural products, minimum wage. May cause surplus, waste.",
    examTips: [
      "Must be above equilibrium to be effective",
      "Creates excess supply / surplus",
      "Scotland's minimum unit price on alcohol is a common example",
    ],
  },

  ocr_info_provision: {
    title: "Information Provision (Correcting Merit/Demerit Good)",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "S", label: "S", params: { type: "linear", slope: 0.7, intercept: 1 }, color: C.supply },
      { id: "D", label: "D (before info)", params: { type: "linear", slope: -0.8, intercept: 7 }, color: C.demand },
      { id: "D1", label: "D₁ (after info)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.eq, dash: true, shiftedFrom: "D" },
    ],
    equilibria: [
      { id: "Efm", label: "Before", curve1: "D", curve2: "S", color: C.demand, pLabel: "P", qLabel: "Q" },
      { id: "Eopt", label: "After info", curve1: "D1", curve2: "S", color: C.eq, pLabel: "P₁", qLabel: "Q₁" },
    ],
    legend: [
      { label: "S", color: C.supply },
      { label: "D (before)", color: C.demand },
      { label: "D₁ (after info)", color: C.eq },
    ],
    notes: "OCR: Government provides information to shift demand from D to D₁. For merit goods, demand shifts right (increased awareness). For demerit goods, demand shifts left (awareness of harm). Effectiveness depends on quality of information and targeting.",
  },

  /* ══════════════════════════════════════════
     10. SIMULTANEOUS SHIFT
     ══════════════════════════════════════════ */

  ocr_simultaneous_shift: {
    title: "Simultaneous Shift in Demand & Supply",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 8 }, color: C.demand },
      { id: "D1", label: "D₁", params: { type: "linear", slope: -0.8, intercept: 10 }, color: C.shifted, dash: true, shiftedFrom: "D" },
      { id: "S", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S1", label: "S₁", params: { type: "linear", slope: 0.8, intercept: 0 }, color: C.teal, dash: true, shiftedFrom: "S" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D", curve2: "S", color: C.eq, pLabel: "P", qLabel: "Q" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S1", color: C.gold, pLabel: "P₁", qLabel: "Q₁" },
    ],
    legend: [
      { label: "D", color: C.demand }, { label: "D₁", color: C.shifted },
      { label: "S", color: C.supply }, { label: "S₁", color: C.teal },
    ],
    notes: "OCR: When both D and S shift, the relative size of the shifts determines the net effect on P and Q. If D shift > S shift, price rises. If S shift > D shift, price may fall.",
    examTips: [
      "Relative size of shifts determines outcome",
      "Consider which shift is larger for evaluation",
    ],
  },

  /* ══════════════════════════════════════════
     11. TRADEABLE POLLUTION PERMITS
     ══════════════════════════════════════════ */

  ocr_tradeable_permits: {
    title: "Tradeable Pollution Permits",
    axisLabels: { x: "Quantity of Permits", y: "Price of Permits" },
    curves: [
      { id: "D", label: "D (permits)", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S", label: "S (permits)", params: { type: "vertical", x: 5 }, color: C.supply, width: 3 },
    ],
    equilibria: [],
    annotations: [
      { text: "Fixed supply of permits", position: { x: 5.5, y: 8 }, color: C.supply, size: 10 },
      { text: "Market price for permits", position: { x: 3, y: 5.5 }, color: C.eq, size: 10 },
    ],
    legend: [
      { label: "D (permits)", color: C.demand },
      { label: "S (fixed)", color: C.supply },
    ],
    notes: "OCR: Government sets total number of permits (fixed supply = vertical line). Firms buy/sell permits in a market. Price is determined by demand. Over time government can reduce supply to reduce pollution.",
  },

  /* ══════════════════════════════════════════
     12. BUFFER STOCK
     ══════════════════════════════════════════ */

  ocr_buffer_stock: {
    title: "Buffer Stock Scheme",
    axisLabels: { x: "Quantity", y: "Price" },
    curves: [
      { id: "D", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S₁ (poor harvest)", params: { type: "linear", slope: 0.8, intercept: 3 }, color: C.msc },
      { id: "S2", label: "S₂ (normal)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "S3", label: "S₃ (bumper harvest)", params: { type: "linear", slope: 0.8, intercept: -0.5 }, color: C.eq },
      { id: "Pceil", label: "Price ceiling", params: { type: "horizontal", y: 6.5 }, color: C.demand, dash: true },
      { id: "Pfloor", label: "Price floor", params: { type: "horizontal", y: 4 }, color: C.teal, dash: true },
    ],
    equilibria: [],
    annotations: [
      { text: "Sell stocks", position: { x: 1, y: 7 }, color: C.demand, size: 10 },
      { text: "Buy stocks", position: { x: 1, y: 3.5 }, color: C.teal, size: 10 },
    ],
    legend: [
      { label: "D", color: C.demand },
      { label: "S₁ (poor)", color: C.msc },
      { label: "S₂ (normal)", color: C.supply },
      { label: "S₃ (bumper)", color: C.eq },
    ],
    notes: "OCR: Buffer stock schemes stabilise prices between floor and ceiling. Release stocks when supply is low (S₁→S₂), buy stocks when supply is high (S₃→S₄). Expensive, perishable goods problematic, may encourage overproduction.",
  },
};
