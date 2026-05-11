/**
 * Board-specific diagnostic question bank.
 * Six questions per board (2 + 1 + 1 + 4 + 15 + 6 = 29 marks).
 * Content is tailored to each board's specification, command words,
 * and qualification level (A-Level vs GCSE/IGCSE).
 */

export type Board =
  | "aqa" | "edexcel-a" | "edexcel-b" | "ocr" | "cambridge" | "ib"
  | "wjec" | "eduqas" | "aqa-gcse" | "cambridge-igcse" | "edexcel-igcse" | "ocr-gcse";

export interface Q1Spec {
  prompt: string;
  hint: string;
  correct: number;
  tolerance: number;
}
export interface McqSpec {
  prompt: string;
  options: string[];
  correctIndex: number;
}
export interface WrittenSpec {
  prompt: string;
  totalMarks: number;
  rubric: string;
}

export interface DiagnosticSet {
  q1: Q1Spec;
  q2: McqSpec;
  q3: McqSpec;
  q4: WrittenSpec;          // 4-mark explain
  q5: WrittenSpec;          // 15-mark essay + diagram
  q6: WrittenSpec;          // 6-mark diagram-only
}

/* ─── Reusable Q1 calculations ─── */

const Q1_REAL_GDP: Q1Spec = {
  prompt:
    "A country's nominal GDP rose from £500bn to £540bn. Inflation over the same period was 3%. Calculate the real GDP growth rate (to 1 decimal place, as a %).",
  hint: "Real growth ≈ nominal growth − inflation. Give your answer to 1 d.p. with a % sign.",
  correct: 5.0, tolerance: 0.2,
};
const Q1_PED: Q1Spec = {
  prompt:
    "The price of a chocolate bar rises from £1.00 to £1.20 and weekly sales fall from 500 to 425. Calculate the price elasticity of demand (to 1 d.p., ignore the sign).",
  hint: "PED = %ΔQ ÷ %ΔP. %ΔQ = (425−500)/500. %ΔP = (1.20−1.00)/1.00.",
  correct: 0.8, tolerance: 0.1,
};
const Q1_REVENUE: Q1Spec = {
  prompt:
    "A firm sells 4,000 units at £15 each. Variable cost per unit is £9 and fixed costs are £12,000. Calculate total profit (£).",
  hint: "Profit = TR − TVC − TFC.",
  correct: 12000, tolerance: 50,
};
const Q1_INFLATION: Q1Spec = {
  prompt:
    "A basket of goods cost £200 last year and £210 this year. Calculate the inflation rate (to 1 d.p., as a %).",
  hint: "Inflation = (new − old) ÷ old × 100.",
  correct: 5.0, tolerance: 0.2,
};

/* ─── Reusable MCQs ─── */

const MCQ_AD: McqSpec = {
  prompt: "Which of the following would most likely cause a rightward shift of the aggregate demand curve?",
  options: [
    "A rise in income tax rates",
    "A fall in consumer confidence",
    "A cut in the central bank's base interest rate",
    "An appreciation of the domestic currency",
  ],
  correctIndex: 2,
};
const MCQ_MONOPOLY: McqSpec = {
  prompt: "A profit-maximising monopolist produces where:",
  options: [
    "Price equals average cost",
    "Marginal revenue equals marginal cost",
    "Average revenue equals average cost",
    "Price equals marginal cost",
  ],
  correctIndex: 1,
};
const MCQ_SUPPLY: McqSpec = {
  prompt: "Which of the following would most likely cause a leftward shift in the supply curve for bread?",
  options: [
    "A fall in the price of flour",
    "A new technology that speeds up baking",
    "A rise in the wages paid to bakers",
    "An increase in the number of bakeries",
  ],
  correctIndex: 2,
};
const MCQ_DEMAND_GCSE: McqSpec = {
  prompt: "Which of the following is most likely to increase the demand for cinema tickets?",
  options: [
    "A rise in the price of cinema tickets",
    "A fall in average household incomes",
    "A successful advertising campaign",
    "A fall in the price of streaming subscriptions",
  ],
  correctIndex: 2,
};
const MCQ_OPP_COST: McqSpec = {
  prompt: "Opportunity cost is best defined as:",
  options: [
    "The money spent buying a good",
    "The next best alternative foregone",
    "The total cost of producing a good",
    "The fixed cost of running a business",
  ],
  correctIndex: 1,
};
const MCQ_BUSINESS_OBJECTIVE: McqSpec = {
  prompt: "Which of the following is most consistent with a firm pursuing a market-share objective rather than profit maximisation?",
  options: [
    "Setting price where MR = MC",
    "Cutting price below short-run profit-maximising level to attract customers",
    "Reducing output to raise price",
    "Closing loss-making divisions to maximise short-run profit",
  ],
  correctIndex: 1,
};

/* ─── Reusable written question shells ─── */

const Q4_INDIRECT_TAX: WrittenSpec = {
  prompt: "Explain two reasons why a government might impose an indirect tax on a demerit good such as cigarettes. (4 marks)",
  totalMarks: 4,
  rubric: "Award 1 mark per valid reason identified (max 2 reasons). Award 1 further mark per reason for development with economic theory or example. Valid reasons include: internalising negative externalities (MPC < MSC), reducing overconsumption, raising government revenue, correcting information failure, discouraging consumption due to inelastic PED. Mere assertion without economic mechanism scores 1 mark per reason.",
};
const Q4_BUSINESS_GROWTH: WrittenSpec = {
  prompt: "Explain two reasons why a business might choose to grow through horizontal integration rather than organic growth. (4 marks)",
  totalMarks: 4,
  rubric: "Award 1 mark per valid reason identified (max 2 reasons), +1 for development with applied business reasoning. Valid reasons include: faster increase in market share, exploitation of economies of scale, reduction of competition, access to new markets/customers, synergies in marketing or distribution. Pure assertion = 1 mark per reason.",
};
const Q4_GLOBALISATION: WrittenSpec = {
  prompt: "Explain two ways in which globalisation has affected developing economies. (4 marks)",
  totalMarks: 4,
  rubric: "Award 1 mark per valid effect identified, +1 for developed economic explanation with example. Valid effects: FDI inflows raising capital stock, technology transfer, export-led growth, dependency on commodity prices, vulnerability to global shocks, widening inequality. Real-world example expected at top mark.",
};
const Q4_GCSE_DEMAND: WrittenSpec = {
  prompt: "Explain two factors that might cause an increase in the demand for electric vehicles. (4 marks)",
  totalMarks: 4,
  rubric: "GCSE-level. Award 1 mark per valid factor identified, +1 for simple development. Valid factors: rising consumer incomes, government subsidies, environmental concerns, rising petrol prices, improved technology/range. Examples not required but credited.",
};
const Q4_IGCSE_SPECIALISATION: WrittenSpec = {
  prompt: "Explain two advantages of specialisation for a worker. (4 marks)",
  totalMarks: 4,
  rubric: "IGCSE-level. Award 1 mark per advantage identified, +1 for development. Valid advantages: higher productivity, higher wages, increased skill, job satisfaction, time saved by avoiding task switching.",
};

/* 15-mark essays */

const Q5_NMW_ALEVEL: WrittenSpec = {
  prompt: "Evaluate the likely impact of a significant increase in the national minimum wage on the level of unemployment. (15 marks)",
  totalMarks: 15,
  rubric: "Required: definitions of NMW & unemployment; correct labour-market diagram (W on Y, QL on X) showing NMW above equilibrium creating excess supply; chains of reasoning; counter-arguments (monopsony, efficiency wages, demand-side multiplier); supported judgement (depends on size of rise, elasticity, sector). Apply this board's standard 15-mark levels/skill convention. No diagram → cap ~50%. No evaluation → cap ~50%. No judgement → cap ~67%.",
};
const Q5_EDEXCEL_B_BUSINESS: WrittenSpec = {
  prompt: "Evaluate the likely impact on a UK supermarket chain of a sustained rise in UK interest rates from 4% to 6%. (15 marks)",
  totalMarks: 15,
  rubric: "Edexcel B style: AO1=3, AO2=3, AO3=5, AO4=4. Required: definition of interest rate transmission; applied business context (supermarkets, low margins, debt-financed expansion); chains (higher cost of debt → lower investment, lower discretionary consumer spend → lower demand for non-essentials, possible trading-down to value lines); evaluation (magnitude, time lags, hedging, market position); judgement. Diagram (AD/AS or revenue/cost) credited under AO3.",
};
const Q5_IB_TRADE: WrittenSpec = {
  prompt: "Using a real-world example, evaluate the view that protectionism is likely to harm the long-run economic growth of an economy. (15 marks)",
  totalMarks: 15,
  rubric: "IB markbands. Required: definitions (protectionism, economic growth); accurate tariff diagram (P/Q axes, world supply, domestic S/D, tariff wedge, deadweight loss); chains linking protection → higher prices, reduced specialisation, retaliation; counter-arguments (infant industry, dumping, structural unemployment); REAL-WORLD example mandatory (e.g. US-China tariffs, EU CAP); reasoned judgement. No diagram → cap 9. No real-world example → cap 12.",
};
const Q5_GCSE_GOVT_INTERVENTION: WrittenSpec = {
  prompt: "Discuss whether a government should subsidise renewable energy producers in order to reduce carbon emissions. (15 marks, mapped from GCSE band-marking)",
  totalMarks: 15,
  rubric: "GCSE-level (mapped). Expect: definition of subsidy; supply-side diagram (S shifts right, P falls, Q rises); chains (lower price → higher demand → lower fossil fuel use → lower emissions); counter-arguments (cost to taxpayer, opportunity cost, possible inefficiency); simple reasoned conclusion. Diagram credited but not mandatory at GCSE; without diagram cap at L2 (~10).",
};
const Q5_IGCSE_INFLATION: WrittenSpec = {
  prompt: "Discuss whether a rise in interest rates is the most effective way to reduce inflation. (15 marks, mapped from IGCSE extended response)",
  totalMarks: 15,
  rubric: "IGCSE extended response (mapped). Required: definitions (interest rate, inflation); chains (higher rates → higher cost of borrowing → less consumption/investment → lower AD → lower demand-pull inflation); alternatives (fiscal contraction, supply-side); counter-arguments (cost-push inflation unaffected, time lags, exchange-rate effect); reasoned decision. Diagram not mandatory.",
};

/* 6-mark diagram-only */

const Q6_TAX_DIAGRAM: WrittenSpec = {
  prompt: "Draw a fully labelled supply-and-demand diagram for the market for petrol, showing the impact of an indirect tax (specific tax) imposed on producers. Label clearly: P, Q axes; original S and D curves; new S+tax curve; original equilibrium (P₁, Q₁); new equilibrium (P₂, Q₂); the tax wedge; and the consumer/producer tax incidence regions. (6 marks)",
  totalMarks: 6,
  rubric: "Diagram-only marking (vision). 1 mark each for: axes labelled (P on Y, Q on X); upward S and downward D; second supply curve S+tax shifted left/up; both equilibria (P₁,Q₁) & (P₂,Q₂) labelled; vertical tax wedge shown; consumer & producer incidence regions indicated. No image → 0 marks.",
};
const Q6_MONOPOLY_DIAGRAM: WrittenSpec = {
  prompt: "Draw a fully labelled diagram showing the profit-maximising price and output of a monopolist. Label clearly: P and Q axes; AR (=D), MR, MC and AC curves; profit-maximising output Qm and price Pm; the supernormal profit area. (6 marks)",
  totalMarks: 6,
  rubric: "Diagram-only marking. 1 mark each for: axes (P on Y, Q on X); downward-sloping AR curve labelled; MR below and twice the slope of AR; MC and AC curves correctly drawn; Qm where MR=MC and Pm read up to AR; supernormal profit rectangle shaded between Pm, AC at Qm.",
};
const Q6_TARIFF_DIAGRAM: WrittenSpec = {
  prompt: "Draw a fully labelled tariff diagram showing the effect of a tariff on imports of steel. Label clearly: P, Q axes; domestic S and D; world price Pw; price with tariff Pw+t; quantities Q1, Q2, Q3, Q4; tariff revenue rectangle; deadweight welfare loss triangles. (6 marks)",
  totalMarks: 6,
  rubric: "Diagram-only marking. 1 mark each for: axes labelled; domestic S & D; horizontal world supply at Pw; new horizontal line at Pw+t; quantity changes Q1→Q2 (production rises) and Q4→Q3 (consumption falls) labelled; tariff revenue rectangle and DWL triangles shaded.",
};
const Q6_GCSE_SHIFT_DIAGRAM: WrittenSpec = {
  prompt: "Draw a fully labelled supply-and-demand diagram for the market for ice cream during a heatwave. Label clearly: P and Q axes; original S and D curves; the shifted demand curve (D2); original equilibrium (P1, Q1) and new equilibrium (P2, Q2). (6 marks)",
  totalMarks: 6,
  rubric: "GCSE diagram. 1 mark each for: axes labelled (P on Y, Q on X); upward-sloping S labelled; downward-sloping D labelled; D2 to the right of D; P1,Q1 marked; P2,Q2 marked. No image → 0.",
};
const Q6_IGCSE_PPF_DIAGRAM: WrittenSpec = {
  prompt: "Draw a fully labelled production possibility curve (PPC) for an economy producing capital goods and consumer goods. Show: a point of productive efficiency (A) on the curve; a point of unemployment (B) inside the curve; an outward shift representing economic growth. (6 marks)",
  totalMarks: 6,
  rubric: "1 mark each for: axes labelled (capital goods, consumer goods); concave PPC drawn; point A on the curve labelled; point B inside the curve labelled; second PPC shifted outward; arrow/label showing economic growth.",
};

/* ─── Per-board sets ─── */

export const QUESTION_BANK: Record<Board, DiagnosticSet> = {
  "aqa": {
    q1: Q1_REAL_GDP, q2: MCQ_AD, q3: MCQ_MONOPOLY,
    q4: Q4_INDIRECT_TAX, q5: Q5_NMW_ALEVEL, q6: Q6_TAX_DIAGRAM,
  },
  "edexcel-a": {
    q1: Q1_REAL_GDP, q2: MCQ_AD, q3: MCQ_MONOPOLY,
    q4: Q4_INDIRECT_TAX, q5: Q5_NMW_ALEVEL, q6: Q6_TAX_DIAGRAM,
  },
  "edexcel-b": {
    q1: Q1_REVENUE, q2: MCQ_BUSINESS_OBJECTIVE, q3: MCQ_MONOPOLY,
    q4: Q4_BUSINESS_GROWTH, q5: Q5_EDEXCEL_B_BUSINESS, q6: Q6_MONOPOLY_DIAGRAM,
  },
  "ocr": {
    q1: Q1_REAL_GDP, q2: MCQ_AD, q3: MCQ_MONOPOLY,
    q4: Q4_INDIRECT_TAX, q5: Q5_NMW_ALEVEL, q6: Q6_TAX_DIAGRAM,
  },
  "cambridge": {
    q1: Q1_PED, q2: MCQ_AD, q3: MCQ_MONOPOLY,
    q4: Q4_INDIRECT_TAX, q5: Q5_NMW_ALEVEL, q6: Q6_TAX_DIAGRAM,
  },
  "ib": {
    q1: Q1_PED, q2: MCQ_AD, q3: MCQ_MONOPOLY,
    q4: Q4_GLOBALISATION, q5: Q5_IB_TRADE, q6: Q6_TARIFF_DIAGRAM,
  },
  "wjec": {
    q1: Q1_REAL_GDP, q2: MCQ_AD, q3: MCQ_MONOPOLY,
    q4: Q4_INDIRECT_TAX, q5: Q5_NMW_ALEVEL, q6: Q6_TAX_DIAGRAM,
  },
  "eduqas": {
    q1: Q1_REAL_GDP, q2: MCQ_AD, q3: MCQ_MONOPOLY,
    q4: Q4_INDIRECT_TAX, q5: Q5_NMW_ALEVEL, q6: Q6_TAX_DIAGRAM,
  },
  "aqa-gcse": {
    q1: Q1_INFLATION, q2: MCQ_DEMAND_GCSE, q3: MCQ_OPP_COST,
    q4: Q4_GCSE_DEMAND, q5: Q5_GCSE_GOVT_INTERVENTION, q6: Q6_GCSE_SHIFT_DIAGRAM,
  },
  "ocr-gcse": {
    q1: Q1_INFLATION, q2: MCQ_DEMAND_GCSE, q3: MCQ_OPP_COST,
    q4: Q4_GCSE_DEMAND, q5: Q5_GCSE_GOVT_INTERVENTION, q6: Q6_GCSE_SHIFT_DIAGRAM,
  },
  "cambridge-igcse": {
    q1: Q1_PED, q2: MCQ_SUPPLY, q3: MCQ_OPP_COST,
    q4: Q4_IGCSE_SPECIALISATION, q5: Q5_IGCSE_INFLATION, q6: Q6_IGCSE_PPF_DIAGRAM,
  },
  "edexcel-igcse": {
    q1: Q1_PED, q2: MCQ_SUPPLY, q3: MCQ_OPP_COST,
    q4: Q4_IGCSE_SPECIALISATION, q5: Q5_IGCSE_INFLATION, q6: Q6_IGCSE_PPF_DIAGRAM,
  },
};

export function getDiagnosticSet(board: Board): DiagnosticSet {
  return QUESTION_BANK[board] ?? QUESTION_BANK["aqa"];
}
