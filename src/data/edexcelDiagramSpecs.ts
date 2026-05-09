/**
 * EDEXCEL-SPECIFIC DIAGRAM_SPECS
 * 
 * Additional diagram specs derived from the Edexcel A-Level Economics
 * Diagram Practice Book (tutor2u) and Hodder Revision Notes.
 * 
 * These specs cover diagram families NOT already in diagramSpecs.ts:
 *   - PPF variants (balanced growth, biased, unemployment, trade-off, shifts)
 *   - Consumer & Producer Surplus
 *   - Subsidy diagram
 *   - Price floor & price ceiling
 *   - Cost curves (MC, AC, AVC, AFC)
 *   - LRAC / Economies of scale
 *   - Monopoly
 *   - Monopolistic competition (SR supernormal, LR normal)
 *   - Labour market
 *   - Phillips curve (SR & LR)
 *   - Keynesian AS
 *   - Tariff diagram
 *   - Quota diagram
 *   - Trade subsidy
 *   - Kinked demand (oligopoly)
 *   - J-curve
 *   - Lorenz curve
 */

import type { DiagramSpec } from "@/components/diagrams/diagramSpecs";

const C = {
  demand: "#ef4444",
  supply: "#3b82f6",
  shifted: "#f59e0b",
  eq: "#16a34a",
  area: "#8b5cf6",
  lras: "#6b7280",
  orange: "#f97316",
  gold: "#eab308",
  teal: "#14b8a6",
  pink: "#ec4899",
};

export const EDEXCEL_DIAGRAM_SPECS: Record<string, DiagramSpec> = {

  /* ══════════════════════════════════════════
     PPF VARIANTS (Edexcel Practice Book S1)
     ══════════════════════════════════════════ */

  ppf_balanced_growth: {
    title: "PPF · Balanced Economic Growth",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
      { id: "PPF2", label: "PPF₂", params: { type: "linear", slope: -1, intercept: 10 }, color: C.eq, dash: true, shiftedFrom: "PPF1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Balanced outward shift", position: { x: 5, y: 8 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "PPF₁", color: C.supply }, { label: "PPF₂ (growth)", color: C.eq }],
    notes: "Balanced growth: PPF shifts outward proportionally. Both sectors benefit equally from increased factor productivity.",
    examTips: [
      "Balanced growth → parallel outward shift of the entire PPF",
      "Caused by increased quantity/quality of ALL factors of production",
      "Show arrow indicating direction of shift",
    ],
  },

  ppf_biased_capital: {
    title: "PPF · Biased Growth (Capital Goods)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
      { id: "PPF2", label: "PPF₂", params: { type: "linear", slope: -1.5, intercept: 12 }, color: C.eq, dash: true, shiftedFrom: "PPF1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Biased toward capital", position: { x: 3, y: 9 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "PPF₁", color: C.supply }, { label: "PPF₂ (biased)", color: C.eq }],
    notes: "Biased growth toward capital goods. PPF pivots outward more on the capital goods axis due to sector-specific productivity improvements.",
    examTips: [
      "PPF pivots · NOT parallel shift",
      "Y-intercept increases MORE than X-intercept",
      "Example: technological innovation in manufacturing",
    ],
  },

  ppf_biased_consumer: {
    title: "PPF · Biased Growth (Consumer Goods)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
      { id: "PPF2", label: "PPF₂", params: { type: "linear", slope: -0.6, intercept: 8 }, color: C.eq, dash: true, shiftedFrom: "PPF1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Biased toward consumer goods", position: { x: 7, y: 5 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "PPF₁", color: C.supply }, { label: "PPF₂ (biased)", color: C.eq }],
    notes: "Biased growth toward consumer goods. X-intercept increases more. Example: improved agricultural technology.",
    examTips: [
      "X-intercept shifts more; Y-intercept stays same or shifts less",
      "PPF pivots outward along consumer goods axis",
      "Example: agricultural innovation increasing food output capacity",
    ],
  },

  ppf_unemployment: {
    title: "PPF · Unemployment / Productive Inefficiency",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "X (inside = inefficiency)", position: { x: 3, y: 3 }, color: C.demand, size: 10 },
      { text: "Points ON curve = productive efficiency", position: { x: 5, y: 7.5 }, color: C.eq, size: 9 },
    ],
    legend: [{ label: "PPF", color: C.supply }, { label: "Inefficient point", color: C.demand }],
    notes: "A point inside the PPF represents unemployed or underused resources · productively inefficient. A point on the curve is productively efficient.",
    examTips: [
      "Inside PPF = unemployed resources / productive inefficiency",
      "ON the PPF = productively efficient",
      "Outside PPF = currently unattainable without growth",
      "Movement FROM inside TO the curve = reducing unemployment",
    ],
  },

  ppf_inward_shift: {
    title: "PPF · Inward Shift (Factor Destruction)",
    axisLabels: { x: "Consumer Goods", y: "Capital Goods" },
    curves: [
      { id: "PPF1", label: "PPF₁", params: { type: "linear", slope: -1, intercept: 8 }, color: C.supply },
      { id: "PPF2", label: "PPF₂", params: { type: "linear", slope: -1, intercept: 6 }, color: C.demand, dash: true, shiftedFrom: "PPF1" },
    ],
    equilibria: [],
    annotations: [
      { text: "Inward shift · destruction of factors", position: { x: 3, y: 4 }, color: C.demand, size: 10 },
    ],
    legend: [{ label: "PPF₁", color: C.supply }, { label: "PPF₂ (inward)", color: C.demand }],
    notes: "Inward shift caused by natural disaster, war, or loss of factors of production. Productive capacity falls.",
    examTips: [
      "Inward shift = LOSS of productive capacity",
      "Causes: natural disaster, war, emigration, depreciation of capital stock",
      "All output combinations reduce",
    ],
  },

  /* ══════════════════════════════════════════
     CONSUMER & PRODUCER SURPLUS
     ══════════════════════════════════════════ */

  consumer_producer_surplus: {
    title: "Consumer & Producer Surplus",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "P*", qLabel: "Q*", tooltip: "Equilibrium: max total surplus" },
    ],
    shading: [
      {
        type: "triangle",
        vertices: [
          { x: 0, y: 9 },
          { eq: "E1" },
          { curve: "D1", atX: 0 },
        ],
        color: C.supply,
        opacity: 0.15,
        label: "CS",
        labelColor: C.supply,
      },
      {
        type: "triangle",
        vertices: [
          { x: 0, y: 1 },
          { eq: "E1" },
          { curve: "S1", atX: 0 },
        ],
        color: C.demand,
        opacity: 0.15,
        label: "PS",
        labelColor: C.demand,
      },
    ],
    legend: [{ label: "CS", color: C.supply }, { label: "PS", color: C.demand }],
    notes: "Consumer surplus = area between demand curve and price. Producer surplus = area between price and supply curve.",
    examTips: [
      "CS = area ABOVE price, BELOW demand curve",
      "PS = area BELOW price, ABOVE supply curve",
      "Total welfare = CS + PS maximised at equilibrium",
      "Taxes/subsidies/price controls change CS and PS",
    ],
  },

  /* ══════════════════════════════════════════
     SUBSIDY DIAGRAM
     ══════════════════════════════════════════ */

  subsidy: {
    title: "Effect of a Subsidy",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 2 }, color: C.supply },
      { id: "S2", label: "S + subsidy", params: { type: "linear", slope: 0.8, intercept: 0 }, color: C.eq, dash: true, shiftedFrom: "S1" },
    ],
    equilibria: [
      { id: "E1", label: "E₁", curve1: "D1", curve2: "S1", color: C.supply, pLabel: "P₁", qLabel: "Q₁", tooltip: "Pre-subsidy equilibrium" },
      { id: "E2", label: "E₂", curve1: "D1", curve2: "S2", color: C.eq, pLabel: "P₂", qLabel: "Q₂", tooltip: "Post-subsidy: lower P, higher Q" },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "S", color: C.supply }, { label: "S + subsidy", color: C.eq }],
    notes: "Subsidy shifts supply right/down. Consumer pays lower price P₂. Producer receives P₂ + subsidy per unit.",
    examTips: [
      "Supply shifts RIGHT/DOWN by the amount of subsidy per unit",
      "Consumer price falls from P₁ to P₂",
      "Producer receives P₂ + subsidy = higher than before",
      "Government cost = subsidy × Q₂",
      "Quantity increases from Q₁ to Q₂",
    ],
  },

  /* ══════════════════════════════════════════
     PRICE CONTROLS
     ══════════════════════════════════════════ */

  price_floor: {
    title: "Price Floor (Minimum Price)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmin", label: "Pmin", params: { type: "horizontal", y: 6.5 }, color: C.demand, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "Pe", qLabel: "Qe", tooltip: "Free market equilibrium" },
      { id: "Qd", label: "Qd", curve1: "D1", curve2: "Pmin", color: C.demand, pLabel: "", qLabel: "Qd", tooltip: "Quantity demanded at Pmin" },
      { id: "Qs", label: "Qs", curve1: "S1", curve2: "Pmin", color: C.supply, pLabel: "", qLabel: "Qs", tooltip: "Quantity supplied at Pmin" },
    ],
    annotations: [
      { text: "Surplus", position: { x: 5, y: 7 }, color: C.demand, size: 11 },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "S", color: C.supply }, { label: "Pmin", color: C.demand }],
    notes: "Price floor above equilibrium creates surplus. Qd < Qe < Qs. Used in minimum wage or agricultural support.",
    examTips: [
      "Floor must be ABOVE equilibrium to be effective",
      "Creates SURPLUS: Qs > Qd",
      "Example: minimum wage, CAP price supports",
      "Label Qd and Qs clearly on x-axis",
    ],
  },

  price_ceiling: {
    title: "Price Ceiling (Maximum Price)",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "D1", label: "D", params: { type: "linear", slope: -0.8, intercept: 9 }, color: C.demand },
      { id: "S1", label: "S", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pmax", label: "Pmax", params: { type: "horizontal", y: 3.5 }, color: C.eq, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "D1", curve2: "S1", color: C.eq, pLabel: "Pe", qLabel: "Qe", tooltip: "Free market equilibrium" },
      { id: "Qd", label: "Qd", curve1: "D1", curve2: "Pmax", color: C.demand, pLabel: "", qLabel: "Qd", tooltip: "Quantity demanded at Pmax" },
      { id: "Qs", label: "Qs", curve1: "S1", curve2: "Pmax", color: C.supply, pLabel: "", qLabel: "Qs", tooltip: "Quantity supplied at Pmax" },
    ],
    annotations: [
      { text: "Shortage", position: { x: 5, y: 3 }, color: C.demand, size: 11 },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "S", color: C.supply }, { label: "Pmax", color: C.eq }],
    notes: "Price ceiling below equilibrium creates shortage. Qd > Qs. Used in rent controls or essential goods price limits.",
    examTips: [
      "Ceiling must be BELOW equilibrium to be effective",
      "Creates SHORTAGE: Qd > Qs",
      "Example: rent controls, price caps on energy",
      "May lead to black markets / queuing",
    ],
  },

  /* ══════════════════════════════════════════
     COST CURVES
     ══════════════════════════════════════════ */

  cost_curves_short_run: {
    title: "Short-Run Cost Curves (MC, ATC, AVC)",
    axisLabels: { x: "Output (Q)", y: "Costs (£)" },
    curves: [
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.4, b: -2.5, c: 6 }, color: C.demand },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.25, b: -1.8, c: 5.5 }, color: C.supply },
      { id: "AVC", label: "AVC", params: { type: "quadratic", a: 0.2, b: -1.5, c: 4 }, color: C.orange },
    ],
    equilibria: [],
    annotations: [
      { text: "MC cuts ATC & AVC at their minima", position: { x: 5, y: 8.5 }, color: C.lras, size: 9 },
    ],
    legend: [{ label: "MC", color: C.demand }, { label: "ATC", color: C.supply }, { label: "AVC", color: C.orange }],
    notes: "MC curve passes through the minimum of both ATC and AVC. When MC < AC, AC is falling. When MC > AC, AC is rising.",
    examTips: [
      "MC passes through MINIMUM of ATC and AVC",
      "When MC < ATC, ATC is falling; MC > ATC → ATC rising",
      "ATC = AVC + AFC; gap between ATC and AVC = AFC",
      "Short-run shutdown: P < AVC (AR < AVC)",
      "Productive efficiency at min ATC",
    ],
  },

  lrac: {
    title: "Long-Run Average Cost (LRAC)",
    axisLabels: { x: "Output (Q)", y: "Average Cost (£)" },
    curves: [
      {
        id: "LRAC", label: "LRAC",
        params: {
          type: "piecewise",
          segments: [
            { xFrom: 0.5, xTo: 4, curve: { type: "linear", slope: -0.8, intercept: 7 } },
            { xFrom: 4, xTo: 6.5, curve: { type: "linear", slope: 0, intercept: 3.8 } },
            { xFrom: 6.5, xTo: 10, curve: { type: "linear", slope: 0.6, intercept: 0 } },
          ],
        },
        color: C.supply,
      },
    ],
    equilibria: [],
    annotations: [
      { text: "Economies of Scale", position: { x: 2, y: 6 }, color: C.eq, size: 10 },
      { text: "Constant Returns", position: { x: 5, y: 4.5 }, color: C.lras, size: 10 },
      { text: "Diseconomies of Scale", position: { x: 8, y: 6 }, color: C.demand, size: 10 },
      { text: "MES", position: { x: 4, y: 3.2 }, color: C.eq, size: 9 },
    ],
    legend: [{ label: "LRAC", color: C.supply }],
    notes: "U-shaped LRAC shows economies of scale (falling AC), constant returns, then diseconomies (rising AC). MES = Minimum Efficient Scale.",
    examTips: [
      "Economies of scale: LRAC falling · internal EoS",
      "Constant returns: LRAC flat at minimum",
      "Diseconomies of scale: LRAC rising · coordination/control problems",
      "MES = output at which LRAC first reaches minimum",
      "Distinguish between internal and external economies of scale",
    ],
  },

  /* ══════════════════════════════════════════
     MARKET STRUCTURES
     ══════════════════════════════════════════ */

  monopoly: {
    title: "Monopoly · Profit Maximisation",
    axisLabels: { x: "Output (Q)", y: "Price / Cost (£)" },
    curves: [
      { id: "AR", label: "AR = D", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.supply },
      { id: "MR", label: "MR", params: { type: "linear", slope: -1.2, intercept: 9 }, color: C.demand },
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.5, b: -2, c: 4 }, color: C.orange },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.35, b: -1.8, c: 5 }, color: C.lras },
    ],
    equilibria: [
      { id: "ProfMax", label: "MC=MR", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "", qLabel: "Qm", tooltip: "Profit max: MC = MR" },
    ],
    annotations: [
      { text: "Supernormal profit", position: { x: 4.5, y: 6.5 }, color: C.eq, size: 10 },
      { text: "Pm read from AR curve", position: { x: 6, y: 8 }, color: C.supply, size: 9 },
    ],
    legend: [
      { label: "AR = D", color: C.supply },
      { label: "MR", color: C.demand },
      { label: "MC", color: C.orange },
      { label: "ATC", color: C.lras },
    ],
    notes: "Monopolist sets output where MC = MR, then charges price on the AR (demand) curve above. Supernormal profit = (AR − ATC) × Q.",
    examTips: [
      "MC = MR → find Qm (profit-maximising output)",
      "Read PRICE from AR curve at Qm · NOT from MC=MR intersection",
      "Shade supernormal profit: rectangle (Pm − ATC) × Qm",
      "MR is twice as steep as AR (linear demand)",
      "Monopoly = allocatively inefficient (P > MC)",
      "Monopoly = productively inefficient (not at min ATC)",
    ],
  },

  monopolistic_competition_sr: {
    title: "Monopolistic Competition · Short Run",
    axisLabels: { x: "Output (Q)", y: "Price / Cost (£)" },
    curves: [
      { id: "AR", label: "AR = D", params: { type: "linear", slope: -0.5, intercept: 8 }, color: C.supply },
      { id: "MR", label: "MR", params: { type: "linear", slope: -1, intercept: 8 }, color: C.demand },
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.5, b: -2, c: 4 }, color: C.orange },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.35, b: -1.8, c: 5 }, color: C.lras },
    ],
    equilibria: [
      { id: "ProfMax", label: "MC=MR", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "P", qLabel: "Q", tooltip: "SR: supernormal profit" },
    ],
    annotations: [
      { text: "Supernormal profit (SR)", position: { x: 5, y: 6.5 }, color: C.eq, size: 10 },
    ],
    legend: [
      { label: "AR = D", color: C.supply },
      { label: "MR", color: C.demand },
      { label: "MC", color: C.orange },
      { label: "ATC", color: C.lras },
    ],
    notes: "Short run: firm earns supernormal profit. Low barriers → firms enter → demand shifts left → LR normal profit.",
    examTips: [
      "SR: similar to monopoly diagram but flatter demand (more elastic)",
      "Supernormal profit attracts entry → long run adjustment",
      "Products are differentiated but close substitutes",
    ],
  },

  monopolistic_competition_lr: {
    title: "Monopolistic Competition · Long Run",
    axisLabels: { x: "Output (Q)", y: "Price / Cost (£)" },
    curves: [
      { id: "AR", label: "AR = D", params: { type: "linear", slope: -0.5, intercept: 7 }, color: C.supply },
      { id: "MR", label: "MR", params: { type: "linear", slope: -1, intercept: 7 }, color: C.demand },
      { id: "MC", label: "MC", params: { type: "quadratic", a: 0.5, b: -2, c: 4 }, color: C.orange },
      { id: "ATC", label: "ATC", params: { type: "quadratic", a: 0.35, b: -1.8, c: 5 }, color: C.lras },
    ],
    equilibria: [
      { id: "ProfMax", label: "MC=MR", curve1: "MC", curve2: "MR", color: C.eq, pLabel: "P", qLabel: "Q", tooltip: "LR: normal profit only" },
    ],
    annotations: [
      { text: "AR tangent to ATC → normal profit", position: { x: 5.5, y: 7.5 }, color: C.lras, size: 9 },
    ],
    legend: [
      { label: "AR = D", color: C.supply },
      { label: "MR", color: C.demand },
      { label: "MC", color: C.orange },
      { label: "ATC", color: C.lras },
    ],
    notes: "Long run: entry erodes supernormal profit. AR curve tangent to ATC → normal profit. Firm is allocatively and productively inefficient.",
    examTips: [
      "LR: AR curve TANGENT to ATC → zero supernormal profit",
      "Firm NOT productively efficient (not at min ATC)",
      "Firm NOT allocatively efficient (P > MC)",
      "Demand shifted left due to entry of competitors",
    ],
  },

  /* ══════════════════════════════════════════
     LABOUR MARKET
     ══════════════════════════════════════════ */

  labour_market: {
    title: "Labour Market · Wage Determination",
    axisLabels: { x: "Quantity of Labour (L)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D = MRP", params: { type: "linear", slope: -0.7, intercept: 8.5 }, color: C.demand },
      { id: "SL", label: "S", params: { type: "linear", slope: 0.7, intercept: 1.5 }, color: C.supply },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "W*", qLabel: "L*", tooltip: "Equilibrium wage and employment" },
    ],
    legend: [{ label: "D = MRP", color: C.demand }, { label: "S (Labour)", color: C.supply }],
    notes: "Wage determined by intersection of labour demand (MRP) and labour supply. Shifts from migration, productivity, policy etc.",
    examTips: [
      "D for labour = Marginal Revenue Product (MRP)",
      "S of labour = workers' willingness to supply at each wage",
      "Factors shifting DL: productivity, demand for product, technology",
      "Factors shifting SL: migration, training, barriers to entry, retirement age",
    ],
  },

  labour_market_minimum_wage: {
    title: "Labour Market · Minimum Wage",
    axisLabels: { x: "Quantity of Labour (L)", y: "Wage Rate (W)" },
    curves: [
      { id: "DL", label: "D = MRP", params: { type: "linear", slope: -0.7, intercept: 8.5 }, color: C.demand },
      { id: "SL", label: "S", params: { type: "linear", slope: 0.7, intercept: 1.5 }, color: C.supply },
      { id: "Wmin", label: "W(min)", params: { type: "horizontal", y: 6.5 }, color: C.orange, dash: true, width: 2 },
    ],
    equilibria: [
      { id: "E1", label: "E", curve1: "DL", curve2: "SL", color: C.eq, pLabel: "We", qLabel: "Le", tooltip: "Free market wage" },
      { id: "Ld", label: "Ld", curve1: "DL", curve2: "Wmin", color: C.demand, pLabel: "", qLabel: "Ld", tooltip: "Labour demanded at min wage" },
      { id: "Ls", label: "Ls", curve1: "SL", curve2: "Wmin", color: C.supply, pLabel: "", qLabel: "Ls", tooltip: "Labour supplied at min wage" },
    ],
    annotations: [
      { text: "Unemployment = Ls − Ld", position: { x: 5, y: 7.2 }, color: C.demand, size: 10 },
    ],
    legend: [{ label: "D = MRP", color: C.demand }, { label: "S", color: C.supply }, { label: "W(min)", color: C.orange }],
    notes: "Minimum wage above equilibrium creates surplus of labour (unemployment). More workers willing to work but fewer demanded.",
    examTips: [
      "NMW/NLW must be ABOVE free market wage to be binding",
      "Creates real-wage unemployment: Ls > Ld",
      "Debate: classical vs Keynesian effects; monopsony argument",
    ],
  },

  /* ══════════════════════════════════════════
     PHILLIPS CURVE
     ══════════════════════════════════════════ */

  phillips_curve: {
    title: "Short-Run & Long-Run Phillips Curves",
    axisLabels: { x: "Unemployment Rate (%)", y: "Inflation Rate (%)" },
    curves: [
      { id: "SRPC1", label: "SRPC₁", params: { type: "linear", slope: -0.8, intercept: 8 }, color: C.supply },
      { id: "SRPC2", label: "SRPC₂", params: { type: "linear", slope: -0.8, intercept: 10 }, color: C.supply, dash: true, shiftedFrom: "SRPC1" },
      { id: "LRPC", label: "LRPC", params: { type: "vertical", x: 5 }, color: C.lras, width: 2.5 },
    ],
    equilibria: [
      { id: "A", label: "A", curve1: "SRPC1", curve2: "LRPC", color: C.eq, pLabel: "π₁", qLabel: "Un", tooltip: "LR equilibrium on SRPC₁" },
      { id: "B", label: "B", curve1: "SRPC2", curve2: "LRPC", color: C.shifted, pLabel: "π₂", qLabel: "Un", tooltip: "Higher inflation expectations" },
    ],
    annotations: [
      { text: "NRU / NAIRU", position: { x: 5, y: 1 }, color: C.lras, size: 10 },
    ],
    legend: [{ label: "SRPC", color: C.supply }, { label: "LRPC", color: C.lras }],
    notes: "SRPC shows inflation-unemployment trade-off. LRPC is vertical at NRU (natural rate). Expectations shifts SRPC.",
    examTips: [
      "SRPC: inverse relationship between inflation and unemployment",
      "LRPC is vertical at the NRU · no long-run trade-off",
      "Movement along SRPC: AD changes",
      "Shift of SRPC: change in expectations or supply shock",
      "Monetarist view: monetary expansion only raises inflation in LR",
    ],
  },

  /* ══════════════════════════════════════════
     KEYNESIAN AS
     ══════════════════════════════════════════ */

  keynesian_as: {
    title: "Keynesian AD/AS Model",
    axisLabels: { x: "Real GDP (Y)", y: "Price Level (PL)" },
    curves: [
      {
        id: "KAS", label: "AS (Keynesian)",
        params: {
          type: "piecewise",
          segments: [
            { xFrom: 0.5, xTo: 4, curve: { type: "linear", slope: 0, intercept: 2 } },
            { xFrom: 4, xTo: 7, curve: { type: "linear", slope: 1.2, intercept: -2.8 } },
            { xFrom: 7, xTo: 7.5, curve: { type: "linear", slope: 20, intercept: -134 } },
          ],
        },
        color: C.supply,
      },
      { id: "AD1", label: "AD₁", params: { type: "linear", slope: -0.8, intercept: 5 }, color: C.demand },
      { id: "AD2", label: "AD₂", params: { type: "linear", slope: -0.8, intercept: 8 }, color: C.demand, dash: true, shiftedFrom: "AD1" },
      { id: "AD3", label: "AD₃", params: { type: "linear", slope: -0.8, intercept: 11 }, color: C.shifted, dash: true, shiftedFrom: "AD2" },
    ],
    equilibria: [],
    annotations: [
      { text: "Spare capacity (horizontal)", position: { x: 2, y: 1.3 }, color: C.supply, size: 9 },
      { text: "Bottleneck (upward)", position: { x: 5.5, y: 5 }, color: C.supply, size: 9 },
      { text: "Full capacity (vertical)", position: { x: 7.5, y: 8 }, color: C.supply, size: 9 },
      { text: "Yfe", position: { x: 7.2, y: 1 }, color: C.lras, size: 10 },
    ],
    legend: [{ label: "AS (Keynesian)", color: C.supply }, { label: "AD shifts", color: C.demand }],
    notes: "Keynesian AS has 3 ranges: horizontal (spare capacity → no inflation), upward sloping (bottlenecks → some inflation), vertical (full employment → only inflation).",
    examTips: [
      "Horizontal: spare capacity · AD↑ increases output, NOT price level",
      "Upward: approaching capacity · AD↑ raises both output and PL",
      "Vertical: full employment · AD↑ is purely inflationary",
      "Key distinction from classical model: output CAN be below Yfe for extended periods",
    ],
  },

  /* ══════════════════════════════════════════
     INTERNATIONAL TRADE
     ══════════════════════════════════════════ */

  tariff: {
    title: "Effect of a Tariff",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "Dd", label: "D (domestic)", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "S (domestic)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "P(world)", params: { type: "horizontal", y: 3 }, color: C.eq, width: 2 },
      { id: "Pw_tariff", label: "P(w) + tariff", params: { type: "horizontal", y: 4.5 }, color: C.orange, dash: true },
    ],
    equilibria: [
      { id: "Q1", label: "Q₁", curve1: "Sd", curve2: "Pw", color: C.supply, pLabel: "", qLabel: "Q₁", tooltip: "Domestic supply at Pw" },
      { id: "Q2", label: "Q₂", curve1: "Dd", curve2: "Pw", color: C.demand, pLabel: "", qLabel: "Q₂", tooltip: "Domestic demand at Pw" },
      { id: "Q3", label: "Q₃", curve1: "Sd", curve2: "Pw_tariff", color: C.supply, pLabel: "", qLabel: "Q₃", tooltip: "Domestic supply at Pw+t" },
      { id: "Q4", label: "Q₄", curve1: "Dd", curve2: "Pw_tariff", color: C.demand, pLabel: "", qLabel: "Q₄", tooltip: "Domestic demand at Pw+t" },
    ],
    annotations: [
      { text: "Tariff revenue", position: { x: 5, y: 4 }, color: C.orange, size: 9 },
      { text: "Imports shrink", position: { x: 5, y: 2 }, color: C.demand, size: 9 },
    ],
    legend: [
      { label: "D (domestic)", color: C.demand },
      { label: "S (domestic)", color: C.supply },
      { label: "P(world)", color: C.eq },
      { label: "P(w) + tariff", color: C.orange },
    ],
    notes: "Tariff raises domestic price from Pw to Pw+t. Imports fall (Q₄−Q₃ < Q₂−Q₁). Domestic producers gain, consumers lose.",
    examTips: [
      "Import BEFORE tariff = Q₂ − Q₁",
      "Import AFTER tariff = Q₄ − Q₃ (smaller)",
      "Tariff revenue = (Pw+t − Pw) × imports after tariff",
      "DWL = two triangles (production + consumption inefficiency)",
      "Consumer surplus falls; producer surplus rises; government gains revenue",
    ],
  },

  trade_quota: {
    title: "Import Quota",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "Dd", label: "D (domestic)", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "S (domestic)", params: { type: "linear", slope: 0.8, intercept: 1 }, color: C.supply },
      { id: "Pw", label: "P(world)", params: { type: "horizontal", y: 3 }, color: C.eq, width: 2 },
      { id: "Pw_quota", label: "P(quota)", params: { type: "horizontal", y: 4.5 }, color: C.orange, dash: true },
    ],
    equilibria: [
      { id: "Q1", label: "Q₁", curve1: "Sd", curve2: "Pw", color: C.supply, pLabel: "", qLabel: "Q₁" },
      { id: "Q2", label: "Q₂", curve1: "Dd", curve2: "Pw", color: C.demand, pLabel: "", qLabel: "Q₂" },
      { id: "Q3", label: "Q₃", curve1: "Sd", curve2: "Pw_quota", color: C.supply, pLabel: "", qLabel: "Q₃" },
      { id: "Q4", label: "Q₄", curve1: "Dd", curve2: "Pw_quota", color: C.demand, pLabel: "", qLabel: "Q₄" },
    ],
    annotations: [
      { text: "Quota = Q₄ − Q₃", position: { x: 5, y: 5 }, color: C.orange, size: 10 },
    ],
    legend: [
      { label: "D", color: C.demand },
      { label: "S", color: C.supply },
      { label: "Pw", color: C.eq },
      { label: "P(quota)", color: C.orange },
    ],
    notes: "Quota limits imports to fixed quantity. Reduces supply → price rises. Creates quota rent for import license holders.",
    examTips: [
      "Quota physically limits imports to a fixed volume",
      "Price rises from Pw to P(quota)",
      "No government revenue (unlike tariff) · quota rent goes to license holders",
      "DWL similar to tariff but no revenue rectangle for government",
    ],
  },

  trade_subsidy: {
    title: "Domestic Subsidy on Trade",
    axisLabels: { x: "Quantity (Q)", y: "Price (P)" },
    curves: [
      { id: "Dd", label: "D (domestic)", params: { type: "linear", slope: -0.6, intercept: 9 }, color: C.demand },
      { id: "Sd", label: "S (domestic)", params: { type: "linear", slope: 0.8, intercept: 2 }, color: C.supply },
      { id: "Sd2", label: "S (with subsidy)", params: { type: "linear", slope: 0.8, intercept: 0 }, color: C.eq, dash: true, shiftedFrom: "Sd" },
      { id: "Pw", label: "P(world)", params: { type: "horizontal", y: 3 }, color: C.lras, width: 2 },
    ],
    equilibria: [
      { id: "Q1", label: "Q₁", curve1: "Sd", curve2: "Pw", color: C.supply, pLabel: "", qLabel: "Q₁", tooltip: "Domestic supply pre-subsidy" },
      { id: "Q2", label: "Q₂", curve1: "Sd2", curve2: "Pw", color: C.eq, pLabel: "", qLabel: "Q₂", tooltip: "Domestic supply post-subsidy" },
    ],
    annotations: [
      { text: "Subsidy increases domestic supply", position: { x: 5, y: 1.5 }, color: C.eq, size: 9 },
    ],
    legend: [{ label: "D", color: C.demand }, { label: "S", color: C.supply }, { label: "S + subsidy", color: C.eq }, { label: "Pw", color: C.lras }],
    notes: "Government subsidises domestic producers → supply shifts right → imports fall. Price stays at Pw but domestic share increases.",
    examTips: [
      "Price remains at Pw · no change for consumers",
      "Domestic production rises Q₁ → Q₂",
      "Imports fall",
      "Government cost = subsidy per unit × Q₂",
    ],
  },

  /* ══════════════════════════════════════════
     OLIGOPOLY · KINKED DEMAND
     ══════════════════════════════════════════ */

  kinked_demand: {
    title: "Kinked Demand Curve (Oligopoly)",
    axisLabels: { x: "Output (Q)", y: "Price (P)" },
    curves: [
      {
        id: "KD", label: "D (kinked)",
        params: {
          type: "piecewise",
          segments: [
            { xFrom: 1, xTo: 5, curve: { type: "linear", slope: -0.4, intercept: 8 } },
            { xFrom: 5, xTo: 9, curve: { type: "linear", slope: -1.2, intercept: 12 } },
          ],
        },
        color: C.demand,
      },
      {
        id: "KMR", label: "MR",
        params: {
          type: "piecewise",
          segments: [
            { xFrom: 1, xTo: 5, curve: { type: "linear", slope: -0.8, intercept: 8 } },
            { xFrom: 5, xTo: 5, curve: { type: "linear", slope: -100, intercept: 504 } },
            { xFrom: 5, xTo: 8, curve: { type: "linear", slope: -2.4, intercept: 12 } },
          ],
        },
        color: C.supply,
      },
    ],
    equilibria: [],
    annotations: [
      { text: "Kink at P*,Q*", position: { x: 5, y: 6.2 }, color: C.eq, size: 10 },
      { text: "MR gap → price rigidity", position: { x: 6, y: 2 }, color: C.supply, size: 9 },
    ],
    legend: [{ label: "D (kinked)", color: C.demand }, { label: "MR", color: C.supply }],
    notes: "Oligopoly: rivals match price cuts but not price rises → kinked demand. Discontinuity in MR → price rigidity even when MC changes.",
    examTips: [
      "Above kink: elastic · rivals don't match price rises → lose customers",
      "Below kink: inelastic · rivals match price cuts → no gain",
      "Discontinuity in MR explains price rigidity",
      "MC can shift within the MR gap without changing price",
    ],
  },

  /* ══════════════════════════════════════════
     J-CURVE
     ══════════════════════════════════════════ */

  j_curve: {
    title: "J-Curve Effect",
    axisLabels: { x: "Time", y: "Current Account Balance" },
    curves: [
      {
        id: "JC", label: "Balance",
        params: {
          type: "piecewise",
          segments: [
            { xFrom: 0, xTo: 3, curve: { type: "linear", slope: 0, intercept: 4 } },
            { xFrom: 3, xTo: 5, curve: { type: "linear", slope: -1.5, intercept: 8.5 } },
            { xFrom: 5, xTo: 10, curve: { type: "linear", slope: 0.8, intercept: -3 } },
          ],
        },
        color: C.supply,
      },
    ],
    equilibria: [],
    annotations: [
      { text: "Depreciation occurs", position: { x: 3, y: 5 }, color: C.lras, size: 10 },
      { text: "Initial worsening", position: { x: 4, y: 2 }, color: C.demand, size: 10 },
      { text: "Long-run improvement", position: { x: 8, y: 6 }, color: C.eq, size: 10 },
    ],
    legend: [{ label: "Current Account", color: C.supply }],
    notes: "After depreciation, the trade balance initially worsens (inelastic demand in SR) then improves as PED rises over time (Marshall-Lerner).",
    examTips: [
      "SR: demand for imports/exports inelastic → balance worsens",
      "LR: demand becomes elastic → volumes adjust → balance improves",
      "Relies on Marshall-Lerner condition: PEDx + PEDm > 1",
      "Time lag typically 6-18 months",
    ],
  },

  /* ══════════════════════════════════════════
     LORENZ CURVE
     ══════════════════════════════════════════ */

  lorenz_curve: {
    title: "Lorenz Curve · Income Distribution",
    axisLabels: { x: "Cumulative % of Population", y: "Cumulative % of Income" },
    curves: [
      { id: "equality", label: "Line of Equality", params: { type: "linear", slope: 1, intercept: 0 }, color: C.lras, dash: true },
      { id: "lorenz", label: "Lorenz Curve", params: { type: "quadratic", a: 0.1, b: 0, c: 0 }, color: C.supply },
    ],
    equilibria: [],
    annotations: [
      { text: "Gini coefficient = A / (A+B)", position: { x: 3, y: 7 }, color: C.demand, size: 10 },
      { text: "A", position: { x: 4, y: 4 }, color: C.demand, size: 14 },
      { text: "B", position: { x: 6, y: 2 }, color: C.supply, size: 14 },
    ],
    legend: [{ label: "Line of Equality", color: C.lras }, { label: "Lorenz Curve", color: C.supply }],
    notes: "Line of equality = perfect income distribution. The further the Lorenz curve from it, the greater inequality. Gini = A/(A+B).",
    examTips: [
      "Perfect equality: Lorenz = line of equality (Gini = 0)",
      "Perfect inequality: Gini = 1",
      "After tax/benefits: Lorenz moves closer to equality line",
      "Compare countries or time periods by overlaying curves",
    ],
  },
};
