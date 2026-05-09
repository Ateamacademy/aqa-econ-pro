/**
 * diagramScenarioRubrics.ts
 *
 * Builds a deterministic, scenario-specific marking rubric for every Diagram
 * Practice · Exam Scenario across ALL exam boards. The rubric is derived from
 * the scenario's `expectedDiagramKeyword`, `question`, `topic`, `hints`, and
 * `marks`, then injected into both the streaming examiner prompt and the
 * structured `mark-diagram` edge function payload.
 *
 * Goal: replace the generic "5-criteria" rubric with a precise per-question
 * mark scheme so the AI can award marks against named, board-aware criteria
 * instead of vague impressions.
 */

import type { DiagramScenario } from "@/data/diagramScenarios";

export interface ScenarioRubricCriterion {
  /** Short human-readable name shown in the component breakdown. */
  component: string;
  /** Marks available for this criterion (sums to scenario.marks). */
  marks: number;
  /** Accepted labels / wording variants the student may have used. */
  acceptedLabels: string[];
  /** What the student must explicitly demonstrate to earn the marks. */
  requirement: string;
  /** True if the criterion is non-negotiable (zero overall if missing). */
  mandatory?: boolean;
}

export interface ScenarioRubric {
  scenarioId: string;
  diagramKeyword: string;
  totalMarks: number;
  criteria: ScenarioRubricCriterion[];
  /** Board-specific tweaks (terminology, acceptable variants). */
  boardNote?: string;
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Per-keyword rubric templates                                              */
/* ────────────────────────────────────────────────────────────────────────── */

type Template = (marks: number) => ScenarioRubricCriterion[];

const splitMarks = (total: number, parts: number[]): number[] => {
  // Distribute `total` across slots proportional to `parts` (integers, sum = total)
  const sumParts = parts.reduce((a, b) => a + b, 0);
  const raw = parts.map((p) => (p / sumParts) * total);
  const floored = raw.map((r) => Math.floor(r));
  let remainder = total - floored.reduce((a, b) => a + b, 0);
  // Distribute leftover marks to slots with largest fractional part
  const fracOrder = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < remainder; k++) floored[fracOrder[k % parts.length].i] += 1;
  return floored.map((m) => Math.max(1, m));
};

const TEMPLATES: Record<string, Template> = {
  /* ── Supply & Demand family ───────────────────────────────────────────── */
  supply_demand: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 1, 1]);
    return [
      { component: "Axes labelled (Price on Y, Quantity on X)", marks: a,
        acceptedLabels: ["Price", "P", "Quantity", "Q"], mandatory: true,
        requirement: "Both axes drawn and explicitly labelled with Price and Quantity (or P and Q)." },
      { component: "Original demand & supply curves", marks: b,
        acceptedLabels: ["D", "D1", "Demand", "S", "S1", "Supply"],
        requirement: "Downward-sloping D and upward-sloping S, both labelled, intersecting at the original equilibrium." },
      { component: "Original equilibrium (P1, Q1) shown with dashed projections", marks: c,
        acceptedLabels: ["P1", "Q1", "P*", "Q*"],
        requirement: "Equilibrium dot marked and projected with dashed lines to both axes, labelled P1 and Q1." },
      { component: "Correct shift / new equilibrium with explanation match", marks: d,
        acceptedLabels: ["D2", "S2", "P2", "Q2"],
        requirement: "The required shift is drawn in the correct direction, new equilibrium (P2, Q2) is labelled, and the written explanation matches the diagram movement." },
    ];
  },

  /* ── PPF family ───────────────────────────────────────────────────────── */
  ppf: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 1, 1]);
    return [
      { component: "Axes labelled (Capital goods / Consumer goods, or equivalent)", marks: a,
        acceptedLabels: ["Capital goods", "Consumer goods", "Good X", "Good Y"], mandatory: true,
        requirement: "Both axes labelled with two named goods (capital/consumer or equivalent pair)." },
      { component: "Original PPF correctly concave to the origin", marks: b,
        acceptedLabels: ["PPF", "PPF1"],
        requirement: "PPF drawn bowed outward (concave to origin) and labelled." },
      { component: "Shift in PPF in correct direction (balanced / biased / inward)", marks: c,
        acceptedLabels: ["PPF2", "New PPF"],
        requirement: "New PPF drawn in the direction the scenario implies (outward symmetric for balanced growth, biased on one axis for unbalanced, inward for disaster)." },
      { component: "Productive efficiency / unemployment annotation", marks: d,
        acceptedLabels: ["Point A", "Unemployment", "Inefficiency"],
        requirement: "Interior point shown for unemployed resources OR points on the frontier shown for productive efficiency, with brief written justification." },
    ];
  },
  ppf_natural_disaster: (m) => TEMPLATES.ppf(m),

  /* ── Elasticity / revenue ────────────────────────────────────────────── */
  ped_revenue_impact: (m) => {
    const [a, b, c, d, e] = splitMarks(m, [1, 1, 1, 1, 1]);
    return [
      { component: "Axes labelled (Price, Quantity)", marks: a,
        acceptedLabels: ["Price", "P", "Quantity", "Q"], mandatory: true,
        requirement: "Both axes labelled." },
      { component: "Steep demand curve (inelastic) drawn and labelled", marks: b,
        acceptedLabels: ["D", "Demand", "PED < 1"],
        requirement: "Steep downward-sloping demand curve clearly labelled to indicate inelasticity." },
      { component: "Two price levels P1 and P2 with quantity projections", marks: c,
        acceptedLabels: ["P1", "P2", "Q1", "Q2"],
        requirement: "Both price levels marked with dashed lines projecting to corresponding quantities." },
      { component: "Revenue gained vs revenue lost areas shaded", marks: d,
        acceptedLabels: ["Revenue gained", "Revenue lost"],
        requirement: "Two distinct rectangles shaded · area gained from price rise and area lost from quantity fall." },
      { component: "Conclusion: net revenue effect explained", marks: e,
        acceptedLabels: ["Revenue rises", "Net revenue", "Total revenue"],
        requirement: "Written conclusion that for inelastic demand, revenue gained > revenue lost ⇒ total revenue rises." },
    ];
  },
  yed_luxury: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 1, 1]);
    return [
      { component: "Axes labelled (Income on Y, Quantity on X)", marks: a,
        acceptedLabels: ["Income", "Y", "Quantity", "Q"], mandatory: true,
        requirement: "Y-axis = Income (or Average Income), X-axis = Quantity demanded." },
      { component: "Two upward-sloping demand-against-income curves", marks: b,
        acceptedLabels: ["Normal good", "Luxury good", "YED > 1"],
        requirement: "Two curves drawn · a steeper one for normal good (0 < YED < 1) and a flatter one for luxury (YED > 1)." },
      { component: "Income & quantity levels with dashed projections", marks: c,
        acceptedLabels: ["Y1", "Y2", "Q1", "Q2"],
        requirement: "Two income levels and corresponding quantities marked with dashed projections." },
      { component: "Comparison: luxury more income-elastic", marks: d,
        acceptedLabels: ["YED > 1", "Income elastic"],
        requirement: "Written comparison stating luxury good demand rises more than proportionally with income." },
    ];
  },

  /* ── Externalities ───────────────────────────────────────────────────── */
  positive_externality_consumption: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 2, 2]);
    return [
      { component: "Axes labelled (P/cost on Y, Q on X)", marks: a,
        acceptedLabels: ["Price", "Cost", "Benefit", "Quantity"], mandatory: true,
        requirement: "Both axes labelled with cost/benefit and quantity." },
      { component: "MPB and MSB curves with MSB above MPB", marks: b,
        acceptedLabels: ["MPB", "D = MPB", "MSB", "Marginal Social Benefit"],
        requirement: "MPB (= D) drawn AND MSB drawn ABOVE MPB, both labelled. Vertical gap = external benefit." },
      { component: "Q_market vs Q_optimal identified", marks: c,
        acceptedLabels: ["Q1", "Q*", "Q market", "Q social", "Qmkt", "Qopt"],
        requirement: "Free-market quantity (MPC = MPB) and socially optimum quantity (MPC = MSB) clearly labelled, showing under-consumption." },
      { component: "Welfare-loss triangle shaded between Q_mkt and Q_opt", marks: d,
        acceptedLabels: ["Welfare loss", "Deadweight loss", "DWL"],
        requirement: "Welfare-loss triangle correctly shaded between Q_market and Q_optimal (bounded by MSB and MPB)." },
    ];
  },
  negative_externality_production: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 2, 2]);
    return [
      { component: "Axes labelled (P/cost on Y, Q on X)", marks: a,
        acceptedLabels: ["Price", "Cost", "Quantity"], mandatory: true,
        requirement: "Both axes labelled." },
      { component: "MPC and MSC curves with MSC above MPC", marks: b,
        acceptedLabels: ["MPC", "S = MPC", "MSC"],
        requirement: "MPC (= S) drawn AND MSC drawn ABOVE MPC, both labelled. Vertical gap = external cost." },
      { component: "Q_market vs Q_optimal identified (over-production)", marks: c,
        acceptedLabels: ["Q1", "Q*", "Qmkt", "Qopt"],
        requirement: "Free-market quantity (MPC = MPB) and socially optimum quantity (MSC = MPB) labelled, showing over-production." },
      { component: "Welfare-loss triangle shaded between Q_opt and Q_mkt", marks: d,
        acceptedLabels: ["Welfare loss", "Deadweight loss", "DWL"],
        requirement: "DWL triangle bounded by MSC, MPB and the over-produced quantity correctly shaded." },
    ];
  },
  information_failure_demerit: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 1, 2]);
    return [
      { component: "Axes labelled (P, Q)", marks: a, acceptedLabels: ["Price", "Quantity"], mandatory: true,
        requirement: "Both axes labelled." },
      { component: "Perceived demand vs true demand curves", marks: b,
        acceptedLabels: ["D perceived", "D true", "MPB", "MSB"],
        requirement: "Two demand-side curves drawn, perceived demand to the RIGHT of the true demand (information gap)." },
      { component: "Over-consumption identified", marks: c,
        acceptedLabels: ["Q_market", "Q_optimal", "Over-consumption"],
        requirement: "Free-market quantity > socially optimum quantity, both labelled." },
      { component: "Information gap & welfare loss explained", marks: d,
        acceptedLabels: ["Information failure", "Welfare loss"],
        requirement: "Written explanation that the information gap drives over-consumption and creates welfare loss." },
    ];
  },

  /* ── Government intervention ─────────────────────────────────────────── */
  maximum_price: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 1, 2]);
    return [
      { component: "Axes & S/D curves with original equilibrium", marks: a,
        acceptedLabels: ["P", "Q", "S", "D"], mandatory: true,
        requirement: "Both axes labelled, S and D intersecting at original equilibrium (Pe, Qe)." },
      { component: "Maximum price drawn BELOW equilibrium and labelled", marks: b,
        acceptedLabels: ["Pmax", "Price ceiling"],
        requirement: "Horizontal price line drawn strictly BELOW Pe and labelled as the max/ceiling price." },
      { component: "Quantity demanded > quantity supplied at Pmax", marks: c,
        acceptedLabels: ["Qd", "Qs"],
        requirement: "Qd and Qs marked on the X-axis at Pmax, with Qd to the right of Qs." },
      { component: "Excess demand (shortage) clearly labelled", marks: d,
        acceptedLabels: ["Excess demand", "Shortage"],
        requirement: "The horizontal gap (Qd − Qs) at Pmax is shaded/bracketed and labelled as excess demand." },
    ];
  },
  minimum_price: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 1, 3]);
    return [
      { component: "Axes & S/D with original equilibrium", marks: a,
        acceptedLabels: ["P", "Q", "S", "D"], mandatory: true,
        requirement: "Standard S/D set-up with original equilibrium labelled." },
      { component: "Minimum price drawn ABOVE equilibrium", marks: b,
        acceptedLabels: ["Pmin", "Price floor"],
        requirement: "Horizontal Pmin line strictly above Pe, labelled." },
      { component: "Qs > Qd at Pmin", marks: c,
        acceptedLabels: ["Qs", "Qd"],
        requirement: "At Pmin, Qs to the right of Qd, both projected to X-axis." },
      { component: "Excess supply & impact on consumption explained", marks: d,
        acceptedLabels: ["Excess supply", "Surplus"],
        requirement: "Excess supply (surplus) gap shaded and the written explanation links higher price to lower quantity consumed." },
    ];
  },
  subsidy: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 1, 2]);
    return [
      { component: "Axes & original S/D equilibrium", marks: a,
        acceptedLabels: ["P", "Q", "S1", "D"], mandatory: true,
        requirement: "Standard S/D with original equilibrium labelled (P1, Q1)." },
      { component: "Supply shifts RIGHT (vertical distance = subsidy)", marks: b,
        acceptedLabels: ["S2", "S + subsidy"],
        requirement: "New supply curve drawn parallel and to the RIGHT of S1, labelled S2 (or S+subsidy). Vertical gap = subsidy per unit." },
      { component: "New equilibrium (P2 lower, Q2 higher) marked", marks: c,
        acceptedLabels: ["P2", "Q2"],
        requirement: "P2 < P1 and Q2 > Q1, both projected with dashed lines and labelled." },
      { component: "Consumer/producer benefit OR market-failure correction explained", marks: d,
        acceptedLabels: ["Consumer benefit", "Producer benefit", "Under-consumption"],
        requirement: "Written explanation linking subsidy to lower price for consumers, higher revenue for producers, and correction of under-consumption." },
    ];
  },
  indirect_tax: (m) => {
    const [a, b, c, d, e] = splitMarks(m, [1, 1, 1, 2, 1]);
    return [
      { component: "Axes & original S/D equilibrium", marks: a,
        acceptedLabels: ["P", "Q", "S1", "D"], mandatory: true,
        requirement: "Standard S/D with original equilibrium (P1, Q1) labelled." },
      { component: "Supply shifts LEFT (parallel, vertical gap = tax)", marks: b,
        acceptedLabels: ["S2", "S + tax", "S1+Tax"],
        requirement: "New supply curve parallel and to the LEFT of S1, labelled S+Tax. Vertical gap = tax per unit." },
      { component: "New equilibrium (P2 higher, Q2 lower)", marks: c,
        acceptedLabels: ["P2", "Q2"],
        requirement: "P2 > P1 and Q2 < Q1 marked with dashed projections." },
      { component: "Consumer & producer tax burden shaded separately", marks: d,
        acceptedLabels: ["Consumer burden", "Producer burden", "Tax incidence"],
        requirement: "Two distinct rectangles: consumer burden (above P1, below P2) and producer burden (below P1, above the price net of tax)." },
      { component: "Deadweight welfare loss triangle", marks: e,
        acceptedLabels: ["DWL", "Welfare loss"],
        requirement: "DWL triangle to the right of Q2 between S2 and D shaded and labelled." },
    ];
  },
  specific_ad_valorem: (m) => {
    const [a, b, c] = splitMarks(m, [2, 2, 2]);
    return [
      { component: "Specific tax: parallel leftward shift of supply", marks: a,
        acceptedLabels: ["S+specific tax"], mandatory: true,
        requirement: "Diagram 1 shows S2 parallel to S1 (constant vertical gap = specific tax per unit)." },
      { component: "Ad valorem tax: pivoted leftward shift of supply", marks: b,
        acceptedLabels: ["S+ad valorem"], mandatory: true,
        requirement: "Diagram 2 shows S2 pivoting from the same intercept, with vertical gap WIDENING as price rises (because tax is a percentage)." },
      { component: "Both diagrams: new equilibria + brief contrast", marks: c,
        acceptedLabels: ["P2", "Q2"],
        requirement: "Both diagrams mark the new equilibrium and the written explanation contrasts how the tax burden grows with price under ad valorem." },
    ];
  },
  tradable_pollution_permits: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 2, 2]);
    return [
      { component: "Axes labelled (Price of permits, Quantity of permits)", marks: a,
        acceptedLabels: ["Price of permits", "Quantity of permits"], mandatory: true,
        requirement: "Both axes labelled in terms of permits, not generic price/quantity." },
      { component: "Vertical (perfectly inelastic) supply of permits", marks: b,
        acceptedLabels: ["S permits", "Cap"],
        requirement: "Supply drawn as a vertical line at the government cap." },
      { component: "Supply shifts LEFT when cap is reduced", marks: c,
        acceptedLabels: ["S2", "Reduced cap"],
        requirement: "New vertical supply drawn to the LEFT of the original (lower cap), with new higher equilibrium price labelled." },
      { component: "Pollution-reduction mechanism explained", marks: d,
        acceptedLabels: ["Higher permit price", "Incentive to abate"],
        requirement: "Written explanation that higher permit price incentivises firms to invest in cleaner tech and reduces emissions." },
    ];
  },

  /* ── Costs / firm-level ──────────────────────────────────────────────── */
  cost_curves: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Axes labelled (Cost on Y, Output on X)", marks: a,
        acceptedLabels: ["Cost", "Output", "Q"], mandatory: true,
        requirement: "Y-axis = Cost (£), X-axis = Output." },
      { component: "ATC, AVC, AFC drawn with correct shapes", marks: b,
        acceptedLabels: ["ATC", "AVC", "AFC"],
        requirement: "ATC and AVC U-shaped, AFC continuously falling, all three labelled." },
      { component: "MC passes through min of ATC and min of AVC", marks: c,
        acceptedLabels: ["MC"],
        requirement: "MC drawn intersecting both ATC and AVC at their minimum points." },
      { component: "AFC = ATC − AVC relationship visible", marks: d,
        acceptedLabels: ["AFC = ATC − AVC"],
        requirement: "Vertical gap between ATC and AVC narrows as output rises (AFC falling)." },
    ];
  },
  economies_of_scale: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Axes labelled (Cost, Output)", marks: a,
        acceptedLabels: ["Cost", "Output"], mandatory: true,
        requirement: "Standard axes." },
      { component: "Multiple SRAC curves", marks: b,
        acceptedLabels: ["SRAC1", "SRAC2", "SRAC3"],
        requirement: "At least three SRAC curves drawn at increasing scale." },
      { component: "LRAC envelope tangent to each SRAC", marks: c,
        acceptedLabels: ["LRAC", "Envelope"],
        requirement: "LRAC drawn as the lower envelope, U-shaped, tangent to each SRAC." },
      { component: "Regions labelled: EoS / constant returns / DoS, plus MES", marks: d,
        acceptedLabels: ["EoS", "MES", "Diseconomies"],
        requirement: "Economies of scale, constant returns, diseconomies regions labelled, and MES marked at the start of constant returns." },
    ];
  },
  shutdown_short_run: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Axes & cost curves (ATC, AVC, MC)", marks: a,
        acceptedLabels: ["Cost", "Output", "ATC", "AVC", "MC"], mandatory: true,
        requirement: "All three cost curves drawn with correct shapes and labelled." },
      { component: "Shutdown point at P = min AVC", marks: b,
        acceptedLabels: ["Shutdown point", "min AVC"],
        requirement: "Shutdown point clearly marked where MC cuts AVC at its minimum." },
      { component: "Loss area shaded between AVC and ATC", marks: c,
        acceptedLabels: ["Loss"],
        requirement: "Rectangle of loss shaded between AVC and ATC at the profit-maximising output." },
      { component: "Explanation: continue if P ≥ AVC", marks: d,
        acceptedLabels: ["Variable cost", "Cover variable cost"],
        requirement: "Written reason that the firm continues short-run if revenue covers variable costs." },
    ];
  },

  /* ── Market structures ───────────────────────────────────────────────── */
  monopoly: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Axes & curves: AR(D), MR, MC, ATC", marks: a,
        acceptedLabels: ["AR", "D", "MR", "MC", "ATC"], mandatory: true,
        requirement: "Standard monopoly diagram: downward-sloping AR=D, MR steeper below it, U-shaped MC and ATC, all labelled." },
      { component: "Profit-max output where MC = MR", marks: b,
        acceptedLabels: ["Q*", "Qm"],
        requirement: "Output Qm marked where MC intersects MR, projected up to AR for the price." },
      { component: "Price set on AR curve at Qm (NOT on MR)", marks: c,
        acceptedLabels: ["Pm"],
        requirement: "Price Pm read from AR curve directly above Qm · not from the MR curve." },
      { component: "Supernormal profit rectangle shaded (Pm − ATC) × Qm", marks: d,
        acceptedLabels: ["Supernormal profit", "AC at Qm"],
        requirement: "Profit rectangle correctly bounded by Pm, ATC at Qm, the Y-axis and Qm." },
    ];
  },
  perfect_competition: (m) => {
    const [a, b, c, d] = splitMarks(m, [2, 2, 2, 2]);
    return [
      { component: "Two side-by-side diagrams (SR and LR)", marks: a,
        acceptedLabels: ["Short run", "Long run"], mandatory: true,
        requirement: "Two firm-level diagrams drawn side by side, both with axes labelled." },
      { component: "Horizontal AR=MR=D=P (price taker) in both", marks: b,
        acceptedLabels: ["AR = MR = D = P"],
        requirement: "In each diagram the firm faces a horizontal demand curve labelled AR=MR=D=P." },
      { component: "SR supernormal profit rectangle (P > ATC)", marks: c,
        acceptedLabels: ["Supernormal profit"],
        requirement: "Diagram 1 shows P above min ATC with profit rectangle shaded." },
      { component: "LR normal profit (P = min ATC) and entry of new firms explained", marks: d,
        acceptedLabels: ["Normal profit", "Entry of firms"],
        requirement: "Diagram 2 shows P = min ATC; written explanation links new entrants → market supply right → price falls." },
    ];
  },
  kinked_demand: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Axes (P, Q) and kinked demand at current price P*", marks: a,
        acceptedLabels: ["Price", "Quantity", "AR", "D"], mandatory: true,
        requirement: "Demand curve drawn with a clear kink at P*, more elastic above and less elastic below." },
      { component: "Two MR sections with discontinuous gap directly below the kink", marks: b,
        acceptedLabels: ["MR1", "MR2", "MR gap", "Discontinuity"],
        requirement: "Two MR segments shown with a vertical discontinuity directly below the kink in demand." },
      { component: "MC can shift within the MR gap without changing P*/Q*", marks: c,
        acceptedLabels: ["MC", "MC1", "MC2"],
        requirement: "MC drawn cutting through the MR gap; explanation says MC can shift within the gap and price stays sticky." },
      { component: "Written explanation of price rigidity", marks: d,
        acceptedLabels: ["Price rigidity", "Sticky prices"],
        requirement: "Explicit conclusion that oligopoly prices are sticky because rivals match cuts but not rises." },
    ];
  },
  monopolistic_competition: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Axes & curves (AR, MR, MC, ATC) for LR equilibrium", marks: a,
        acceptedLabels: ["AR", "MR", "MC", "ATC"], mandatory: true,
        requirement: "Standard monopolistic competition LR diagram with all four curves labelled." },
      { component: "Profit-max output where MC = MR", marks: b,
        acceptedLabels: ["Q*"],
        requirement: "Q* identified where MC = MR." },
      { component: "AR tangent to ATC at Q* (normal profit only)", marks: c,
        acceptedLabels: ["Tangency", "Normal profit"],
        requirement: "AR (= P) just touches ATC at Q* · normal profit, not above ATC." },
      { component: "Excess capacity gap (Q* < Q at min ATC) labelled", marks: d,
        acceptedLabels: ["Excess capacity"],
        requirement: "Horizontal gap between Q* and the output at min ATC clearly labelled as excess capacity." },
    ];
  },

  /* ── Labour market ───────────────────────────────────────────────────── */
  minimum_wage: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 1, 2]);
    return [
      { component: "Axes labelled (Wage on Y, Quantity of labour on X)", marks: a,
        acceptedLabels: ["Wage", "W", "Quantity of labour", "QL"], mandatory: true,
        requirement: "Y-axis = Wage rate, X-axis = Quantity of labour." },
      { component: "Labour demand & supply with original equilibrium We", marks: b,
        acceptedLabels: ["DL", "SL", "We", "Qe"],
        requirement: "Downward-sloping DL and upward-sloping SL with original equilibrium We, Qe labelled." },
      { component: "Minimum wage drawn ABOVE We", marks: c,
        acceptedLabels: ["Wmin", "NMW", "NLW"],
        requirement: "Horizontal Wmin line strictly above We, labelled." },
      { component: "Unemployment gap (Qs > Qd) labelled", marks: d,
        acceptedLabels: ["Unemployment", "Excess supply of labour"],
        requirement: "Horizontal gap between Qs and Qd at Wmin shaded/bracketed and labelled as unemployment." },
    ];
  },
  monopsony: (m) => {
    const [a, b, c, d] = splitMarks(m, [2, 2, 2, 2]);
    return [
      { component: "Axes & curves: S = AC_L, MC_L, D = MRP_L", marks: a,
        acceptedLabels: ["AC_L", "MC_L", "MRP_L", "Wage"], mandatory: true,
        requirement: "All three curves labelled with MC_L lying above AC_L (since AC_L slopes up)." },
      { component: "Monopsony employment where MC_L = MRP_L", marks: b,
        acceptedLabels: ["Qm"],
        requirement: "Quantity Qm marked where MC_L cuts MRP_L." },
      { component: "Monopsony wage read from AC_L (BELOW MRP_L)", marks: c,
        acceptedLabels: ["Wm"],
        requirement: "Wage Wm read off AC_L at Qm · strictly below the competitive wage." },
      { component: "Comparison with competitive outcome + welfare loss", marks: d,
        acceptedLabels: ["Wc", "Qc", "Welfare loss"],
        requirement: "Competitive wage Wc and employment Qc identified; welfare-loss triangle bounded by MC_L, MRP_L between Qm and Qc shaded." },
    ];
  },

  /* ── Macro ───────────────────────────────────────────────────────────── */
  ad_as: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 2, 2]);
    return [
      { component: "Axes labelled (Price level on Y, Real GDP on X)", marks: a,
        acceptedLabels: ["Price level", "PL", "Real GDP", "Y"], mandatory: true,
        requirement: "Y-axis = Price level, X-axis = Real GDP / Real output." },
      { component: "AD downward, SRAS upward (and LRAS vertical if used)", marks: b,
        acceptedLabels: ["AD", "SRAS", "LRAS"],
        requirement: "Standard AD/AS curves drawn with correct slopes and labelled." },
      { component: "Correct shift (AD right for demand-pull, SRAS left for cost-push)", marks: c,
        acceptedLabels: ["AD2", "SRAS2"],
        requirement: "The curve named in the scenario shifts in the direction the scenario implies." },
      { component: "New equilibrium with PL & Real GDP changes labelled", marks: d,
        acceptedLabels: ["PL2", "Y2"],
        requirement: "New PL and Y identified; written explanation matches (e.g. demand-pull → both PL and Y rise; cost-push → PL up, Y down = stagflation)." },
    ];
  },
  keynesian_as: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Axes (PL, Real GDP)", marks: a,
        acceptedLabels: ["PL", "Real GDP"], mandatory: true,
        requirement: "Standard macro axes." },
      { component: "Keynesian AS with horizontal, upward-sloping & vertical sections", marks: b,
        acceptedLabels: ["Keynesian AS", "Spare capacity"],
        requirement: "Three distinct sections drawn and labelled." },
      { component: "AD shifts right in spare-capacity (horizontal) region", marks: c,
        acceptedLabels: ["AD1", "AD2"],
        requirement: "Initial AD intersects in horizontal region; AD2 still in horizontal region · large ΔY, ~no ΔPL." },
      { component: "Conclusion: large output gain, minimal inflation", marks: d,
        acceptedLabels: ["Output gain", "No inflation"],
        requirement: "Written conclusion linking spare capacity to fiscal stimulus producing big GDP rise without inflation." },
    ];
  },
  phillips_curve: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 2, 2, 1]);
    return [
      { component: "Two diagrams: AD/AS and Phillips Curve, axes labelled", marks: a,
        acceptedLabels: ["PL", "Real GDP", "Inflation", "Unemployment"], mandatory: true,
        requirement: "AD/AS axes (PL, Y) and Phillips axes (π, U) all correctly labelled." },
      { component: "AD/AS: AD shift raising PL, output returning to YFe", marks: b,
        acceptedLabels: ["LRAS", "SRAS1", "SRAS2", "AD2"],
        requirement: "Sequence Pe → P2 → P3 with output back at YFe shown." },
      { component: "Phillips: SRPC1, SRPC2, vertical LRPC at natural rate", marks: c,
        acceptedLabels: ["SRPC1", "SRPC2", "LRPC", "Natural rate"],
        requirement: "Three Phillips curves drawn; LRPC vertical at the natural rate of unemployment." },
      { component: "Long-run conclusion: no permanent π/U trade-off", marks: d,
        acceptedLabels: ["No long-run trade-off"],
        requirement: "Written conclusion that in the long run unemployment returns to the natural rate." },
    ];
  },

  /* ── Lorenz / Gini ───────────────────────────────────────────────────── */
  lorenz_curve: (m) => {
    const [a, b, c, d] = splitMarks(m, [1, 1, 2, 2]);
    return [
      { component: "Axes labelled (Cumulative % population, Cumulative % income)", marks: a,
        acceptedLabels: ["Cumulative % of Population", "Cumulative % of Income"], mandatory: true,
        requirement: "X-axis = Cumulative % of Population (poorest → richest), Y-axis = Cumulative % of Income." },
      { component: "45° line of perfect equality from (0,0) to (100,100)", marks: b,
        acceptedLabels: ["Line of Perfect Equality", "45-degree line"],
        requirement: "Straight diagonal labelled as line of perfect equality." },
      { component: "Lorenz curve(s) convex (bowed BELOW equality line)", marks: c,
        acceptedLabels: ["Lorenz curve", "Country A", "Country B"],
        requirement: "Lorenz curve(s) drawn convex to origin (bowed below equality line). For comparison, two curves with the more unequal one further from the line." },
      { component: "Gini interpretation in writing", marks: d,
        acceptedLabels: ["Gini", "Area A / (Area A + Area B)"],
        requirement: "Explanation that the larger the gap between curve and equality line, the higher the Gini and the more unequal the distribution." },
    ];
  },
};

/* ────────────────────────────────────────────────────────────────────────── */
/*  Generic fallback                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

function genericTemplate(scenario: DiagramScenario): ScenarioRubricCriterion[] {
  const m = scenario.marks;
  const [a, b, c, d] = splitMarks(m, [1, 1, 1, 1]);
  return [
    { component: "Axes labelled correctly for the topic", marks: a,
      acceptedLabels: ["Y-axis label", "X-axis label"], mandatory: true,
      requirement: "Both axes drawn and labelled with the variables the topic requires." },
    { component: "Required curves drawn with correct shape & direction", marks: b,
      acceptedLabels: [],
      requirement: "All curves named in the question are present, sloping the right way and labelled." },
    { component: "Required shift / change drawn in correct direction", marks: c,
      acceptedLabels: [],
      requirement: "The scenario's stated change is shown by the appropriate shift, with the new curve labelled." },
    { component: "Equilibria / key annotations + written explanation match", marks: d,
      acceptedLabels: [],
      requirement: "Original and new equilibria (or key points) are labelled, and the written answer is consistent with the diagram." },
  ];
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Board-specific overlays                                                   */
/* ────────────────────────────────────────────────────────────────────────── */

const BOARD_NOTES: Record<string, string> = {
  "AQA": "AQA: accept 'Price' or 'P', 'Quantity' or 'Q'. Reward chains of reasoning. Diagrams must be relevant to the marker scheme indicative content.",
  "AQA GCSE": "AQA GCSE: simpler vocabulary; do not require advanced terms (e.g. MRP, deadweight loss) unless explicitly in the question.",
  "Edexcel A": "Edexcel A: positional accuracy matters. Penalise unlabelled curves heavily. Reward use of subject-specific terminology.",
  "Edexcel B": "Edexcel B: business/global context emphasised. Accept business-style terminology alongside theoretical labels.",
  "Edexcel IGCSE": "Edexcel IGCSE: simpler diagrams; do not require advanced concepts unless in the question.",
  "OCR": "OCR: reward correct economic reasoning + appropriate diagrams. Strict on mismatch between explanation and diagram.",
  "OCR GCSE": "OCR GCSE: simpler diagrams; basic terminology accepted.",
  "CAIE": "Cambridge International A Level: technical precision required. All curves must be labelled.",
  "CAIE IGCSE": "Cambridge IGCSE: simpler diagrams; do not require A-Level concepts.",
  "IB": "IB Economics: reward clear axes labels, exact curve labels (D, S etc.), and explicit equilibrium points (Pe, Qe). Penalise missing units on axes.",
  "WJEC": "WJEC: reward correct economic content and proper diagram conventions.",
  "Eduqas": "Eduqas: reward correct economic content and proper diagram conventions.",
};

/* ────────────────────────────────────────────────────────────────────────── */
/*  Public API                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

export function buildScenarioRubric(
  scenario: DiagramScenario,
  board?: string,
): ScenarioRubric {
  const keyword = (scenario.expectedDiagramKeyword || "").toLowerCase();
  const tpl = TEMPLATES[keyword];
  const criteria = tpl ? tpl(scenario.marks) : genericTemplate(scenario);

  // Normalise marks so they sum to scenario.marks
  const sum = criteria.reduce((s, c) => s + c.marks, 0);
  if (sum !== scenario.marks && criteria.length > 0) {
    const diff = scenario.marks - sum;
    criteria[criteria.length - 1].marks = Math.max(1, criteria[criteria.length - 1].marks + diff);
  }

  return {
    scenarioId: scenario.id,
    diagramKeyword: scenario.expectedDiagramKeyword || "unknown",
    totalMarks: scenario.marks,
    criteria,
    boardNote: board ? BOARD_NOTES[board] : undefined,
  };
}

/**
 * Render the rubric as a prompt block to inject into the streaming examiner
 * prompt (DiagramPractice.tsx → markDiagram()).
 */
export function renderRubricForPrompt(rubric: ScenarioRubric): string {
  const lines: string[] = [];
  lines.push(`=== SCENARIO-SPECIFIC MARK SCHEME (${rubric.totalMarks} marks total) ===`);
  rubric.criteria.forEach((c, i) => {
    lines.push(
      `${i + 1}. **${c.component}** · ${c.marks} mark${c.marks > 1 ? "s" : ""}${c.mandatory ? " *(mandatory · zero overall if missing)*" : ""}`,
    );
    lines.push(`   Requirement: ${c.requirement}`);
    if (c.acceptedLabels.length > 0) {
      lines.push(`   Accepted labels: ${c.acceptedLabels.join(" · ")}`);
    }
  });
  if (rubric.boardNote) {
    lines.push("");
    lines.push(`Board note: ${rubric.boardNote}`);
  }
  lines.push("");
  lines.push("Award marks ONLY against these named criteria. Sum the criterion marks to produce the total · do not award marks for anything outside this rubric.");
  return lines.join("\n");
}

/**
 * Convert the rubric to the structured `markScheme` array shape that the
 * `mark-diagram` edge function consumes.
 */
export function rubricToMarkSchemePayload(rubric: ScenarioRubric) {
  return rubric.criteria.map((c) => ({
    component_name: c.component,
    mark_value: c.marks,
    accepted_labels: c.acceptedLabels,
    positional_required: c.mandatory ?? false,
    strict_mode: false,
    notes: c.requirement,
  }));
}
