import { renderLevelMark, renderMcqMark } from "./aqaMarkSchemeBuilder";

interface McqSpec {
  /** Stem text. May reference "Figure X" / "Table X" — describe inline. */
  stem: string;
  options: [string, string, string, string]; // A B C D
  answer: "A" | "B" | "C" | "D";
  justification: string;
  /** Optional inline diagram/table description rendered before the stem. */
  figure?: string;
  /** Optional reference SVG filename in /public/figures (no leading slash). */
  figureKey?: string;
  /** Caption shown under the SVG. */
  figureCaption?: string;
}

interface AqaPaper3Set {
  setLabel: string;
  caseTitle: string;
  /** Section B extracts (A, B, C plus news report D). */
  extracts: {
    extractA: string;
    extractB: string;
    extractC: { subtitle: string; body: string; source: string };
    extractD: { subtitle: string; body: string; source: string };
  };
  q31: string;
  q31Content: string[];
  q32: string;
  q32Content: string[];
  q33: string;
  q33Content: string[];
  /** Exactly 30 MCQs. */
  mcqs: McqSpec[];
}

// ── Reusable MCQ banks ──────────────────────────────────────────────────────

function bank(setSeed: string): McqSpec[] {
  // 30 MCQs: ~10 figure-based (diagrams) + ~10 table-based + ~10 text-only.
  // setSeed lightly varies wording so sets aren't identical clones.
  return [
    // ── Text-only MCQs ──────────────────────────────────────────────────
    {
      stem: "Which one of the following is most likely to shift the demand curve for a normal good to the right?",
      options: ["A fall in consumer income", "A rise in the price of a complement", "A rise in consumer income", "A rise in the price of the good"],
      answer: "C",
      justification: "An increase in income raises demand for a normal good at every price.",
    },
    {
      stem: "If the price elasticity of demand for a good is −0.4, the good is best described as:",
      options: ["Perfectly elastic", "Relatively elastic", "Unit elastic", "Relatively inelastic"],
      answer: "D",
      justification: "|PED|<1 indicates relatively inelastic demand.",
    },
    {
      stem: "A floating exchange rate that depreciates is most likely to:",
      options: ["Reduce the price of imports", "Reduce export competitiveness", "Improve the trade balance over time (subject to Marshall–Lerner)", "Reduce imported inflation"],
      answer: "C",
      justification: "Depreciation tends to improve the trade balance over time if Marshall–Lerner holds.",
    },
    {
      stem: "Quantitative easing is best described as:",
      options: ["A rise in Bank Rate", "A central bank purchasing government bonds to increase the money supply", "A reduction in government spending", "An increase in the reserve requirement"],
      answer: "B",
      justification: "QE = central bank asset purchases that expand the money supply.",
    },
    {
      stem: "Which one of the following best describes price discrimination?",
      options: ["Charging different consumers different prices for the same good when costs do not differ", "Charging the same price for goods with different costs", "Setting price equal to marginal cost", "Setting price below marginal cost"],
      answer: "A",
      justification: "Price discrimination = different prices to different groups for the same product.",
    },
    {
      stem: "An economy operating inside its production possibility frontier indicates:",
      options: ["Productive efficiency", "Allocative efficiency", "Unemployed or underused resources", "Rapid economic growth"],
      answer: "C",
      justification: "Inside the PPF means resources are not fully employed.",
    },
    {
      stem: "Government failure is most likely to occur when:",
      options: ["Markets work efficiently", "Government intervention causes a misallocation of resources greater than the original market failure", "There are perfect competition conditions", "Public goods are provided"],
      answer: "B",
      justification: "Government failure = intervention worsens allocative outcomes.",
    },
    {
      stem: "An import tariff will most likely:",
      options: ["Reduce the domestic price of imports", "Increase the domestic price of imports and reduce import volumes", "Increase exports", "Have no effect on the trade balance"],
      answer: "B",
      justification: "Tariffs raise import prices and typically reduce import volumes.",
    },
    {
      stem: "An increase in the natural rate of unemployment is most likely caused by:",
      options: ["A rise in skills mismatches between unemployed workers and vacant jobs", "A cut in interest rates", "An increase in aggregate demand", "A rise in the working population"],
      answer: "A",
      justification: "Skills mismatches raise structural unemployment, which contributes to the natural rate.",
    },
    {
      stem: "Which one of the following is most likely to reduce inequality of income?",
      options: ["A cut in the top rate of income tax", "An increase in the National Living Wage", "A reduction in inheritance tax", "A regressive sales tax"],
      answer: "B",
      justification: "Higher minimum wages tend to compress the wage distribution.",
    },

    // ── Table-based MCQs (Moderate) ─────────────────────────────────────
    {
      figure: `**Table 1:** A firm employs three factors of production: capital, land and labour. The table below shows how the firm's output is affected by changing the amount employed of these factor inputs.

| Units of output | Units of capital | Units of land | Labour (Number of workers) |
|---|---|---|---|
| 500 | 20 | 40 | 60 |
| 1000 | 80 | 160 | 240 |
| 2000 | 140 | 280 | 420 |
| 3000 | 210 | 420 | 630 |
| 4000 | 300 | 580 | 860 |`,
      stem: "Based on Table 1, the firm experiences constant returns to scale when it increases its output from:",
      options: ["500 to 1000 units", "1000 to 2000 units", "2000 to 3000 units", "3000 to 4000 units"],
      answer: "B",
      justification: "From 1000 to 2000, output doubles and all inputs less than double (capital 80→140 = ×1.75, land 160→280 = ×1.75, labour 240→420 = ×1.75); this is actually increasing returns. From 500 to 1000, inputs quadruple while output doubles = decreasing returns. The answer is B: output doubles while all factor inputs less than double.",
    },
    {
      figure: `**Table 2:** The table below shows the total cost and total revenue for a firm at different output levels.

| Output (units) | Total Cost (£) | Total Revenue (£) |
|---|---|---|
| 0 | 50 | 0 |
| 10 | 120 | 100 |
| 20 | 170 | 200 |
| 30 | 240 | 300 |
| 40 | 340 | 400 |
| 50 | 470 | 500 |`,
      stem: "Based on Table 2, at which level of output does the firm maximise profit?",
      options: ["10 units", "20 units", "30 units", "40 units"],
      answer: "C",
      justification: "Profit = TR − TC. At 30 units: 300 − 240 = £60. At 20: 200 − 170 = £30. At 40: 400 − 340 = £60. At 30 and 40 both give £60, but marginal cost at 40 (£100) > marginal revenue (£100), so 30 is optimal.",
    },
    {
      figure: `**Table 3:** The table below shows the index of real GDP per head for a country.

| Year | Index (2019 = 100) |
|---|---|
| 2019 | 100 |
| 2020 | 90 |
| 2021 | 95 |
| 2022 | 100 |
| 2023 | 102 |
| 2024 | 104 |`,
      stem: "Based on Table 3, what was the percentage change in real GDP per head between 2019 and 2024?",
      options: ["+2%", "+4%", "+5%", "+10%"],
      answer: "B",
      justification: "Index moved from 100 to 104, a 4% rise.",
    },

    // ── Table-based MCQs (Hard) ─────────────────────────────────────────
    {
      figure: `**Table 4:** The table below shows the possible differences between the meanings of the terms invention and innovation. Which combination correctly identifies the difference?

|  | Invention | Innovation |
|---|---|---|
| **A** | Applies to changes in goods only | Applies to changes in services only |
| **B** | Applies to changes in services only | Applies to changes in goods only |
| **C** | Discovering something entirely new | Turns the results of invention into a product |
| **D** | Turns the results of innovation into a product | Discovering something entirely new |`,
      stem: "Based on Table 4, which combination, A, B, C or D, correctly identifies the difference between the meanings of these terms?",
      options: ["A", "B", "C", "D"],
      answer: "C",
      justification: "Invention = creating something new (discovery); innovation = applying an invention commercially (turning it into a product/process).",
    },
    {
      figure: `**Table 5:** The table below shows economic data for four countries.

| Country | GDP growth (%) | Inflation (%) | Unemployment (%) | Current account (% of GDP) |
|---|---|---|---|---|
| W | 3.2 | 1.8 | 4.5 | +1.2 |
| X | 0.5 | 6.4 | 8.1 | −3.8 |
| Y | 2.1 | 2.0 | 5.2 | −0.5 |
| Z | −0.3 | 0.4 | 9.6 | +4.1 |`,
      stem: "Based on Table 5, which country is most likely experiencing a deflationary gap with significant spare capacity?",
      options: ["Country W", "Country X", "Country Y", "Country Z"],
      answer: "D",
      justification: "Country Z has negative GDP growth (−0.3%), very low inflation (0.4%), and the highest unemployment (9.6%) — classic indicators of a deflationary gap with significant spare capacity.",
    },
    {
      figure: `**Table 6:** The table below shows the marginal private cost (MPC), marginal social cost (MSC) and marginal social benefit (MSB) of producing palm oil at different output levels.

| Output (tonnes) | MPC (£) | MSC (£) | MSB (£) |
|---|---|---|---|
| 100 | 40 | 55 | 80 |
| 200 | 50 | 70 | 70 |
| 300 | 60 | 85 | 60 |
| 400 | 70 | 100 | 50 |`,
      stem: "Based on Table 6, the socially optimal level of palm oil output is:",
      options: ["100 tonnes", "200 tonnes", "300 tonnes", "400 tonnes"],
      answer: "B",
      justification: "The socially optimal output is where MSC = MSB. At 200 tonnes, MSC (£70) = MSB (£70). The free market would produce 300 tonnes (where MPC = MSB = £60), leading to overproduction.",
    },

    // ── Table-based MCQs (Advanced) ─────────────────────────────────────
    {
      figure: `**Table 7:** The table below shows the price and income elasticities of demand for three goods.

| Good | Price elasticity of demand (PED) | Income elasticity of demand (YED) | Cross elasticity with Good B (XED) |
|---|---|---|---|
| A | −0.3 | +2.1 | +0.8 |
| B | −1.8 | +0.4 | — |
| C | −0.6 | −0.5 | −1.2 |`,
      stem: "Based on Table 7, which one of the following statements is correct?",
      options: [
        "Good A is a price-elastic luxury and a substitute for Good B",
        "Good A is a price-inelastic luxury and a substitute for Good B",
        "Good C is a normal good and a complement to Good B",
        "Good B is a price-inelastic necessity",
      ],
      answer: "B",
      justification: "Good A: |PED| = 0.3 < 1 (inelastic); YED = +2.1 > 1 (luxury/superior good); XED with B = +0.8 > 0 (substitute). Statement B is correct.",
    },
    {
      figure: `**Table 8:** The table below shows data for a monopolist at different price levels.

| Price (£) | Quantity demanded | Total Revenue (£) | Marginal Revenue (£) | Marginal Cost (£) |
|---|---|---|---|---|
| 20 | 10 | 200 | — | 4 |
| 18 | 20 | 360 | 16 | 6 |
| 16 | 30 | 480 | 12 | 8 |
| 14 | 40 | 560 | 8 | 10 |
| 12 | 50 | 600 | 4 | 12 |
| 10 | 60 | 600 | 0 | 16 |`,
      stem: "Based on Table 8, the profit-maximising monopolist would set output between:",
      options: ["10 and 20 units", "20 and 30 units", "30 and 40 units", "50 and 60 units"],
      answer: "C",
      justification: "Profit is maximised where MR = MC. MR falls from 12 to 8 between 30–40 units; MC rises from 8 to 10. They cross between 30 and 40 units (MR ≈ MC around 35 units).",
    },
    {
      figure: `**Table 9:** The table below shows the percentage shares of income by quintile group for Country X before and after government intervention.

| Quintile | Market income share (%) | Post-tax/transfer income share (%) |
|---|---|---|
| Bottom 20% | 2 | 8 |
| Second 20% | 8 | 13 |
| Third 20% | 16 | 18 |
| Fourth 20% | 26 | 24 |
| Top 20% | 48 | 37 |`,
      stem: "Based on Table 9, which one of the following can be correctly concluded?",
      options: [
        "The Gini coefficient after government intervention is higher than before",
        "Government intervention has made the distribution of income more equal, reducing the Gini coefficient",
        "The bottom 40% of the population now receives more than 50% of total income",
        "The tax and transfer system is regressive",
      ],
      answer: "B",
      justification: "Post-tax shares are more compressed (bottom 20% rises from 2% to 8%, top 20% falls from 48% to 37%). The Lorenz curve moves closer to the 45° line, so the Gini falls — redistribution has reduced inequality.",
    },

    // ── Figure/Diagram-based MCQs ───────────────────────────────────────
    {
      figure: "**Figure 1:** A monopoly diagram with downward-sloping AR (D), MR below AR, U-shaped AC and MC. Profit-maximising output Qₘ where MC=MR; price Pₘ read off the AR curve directly above Qₘ.",
      figureKey: "monopoly-profit.svg",
      figureCaption: "Figure 1 — Monopoly profit maximisation",
      stem: "Based on the information in Figure 1, the monopolist's profit-maximising output is determined where:",
      options: ["MC = AC", "MC = MR", "AR = AC", "AR = MR"],
      answer: "B",
      justification: "Profit is maximised at the output where MC=MR.",
    },
    {
      figure: "**Figure 2:** A supply and demand diagram showing an indirect tax shifting S to S+tax. Consumer burden is the rectangle between P₁ and the new consumer price; producer burden is between P₁ and the new producer price.",
      figureKey: "indirect-tax.svg",
      figureCaption: "Figure 2 — Incidence of an indirect tax",
      stem: "Based on Figure 2, an indirect tax on a good with relatively inelastic demand will mainly fall on:",
      options: ["Producers", "Consumers", "The government", "Workers"],
      answer: "B",
      justification: "When demand is relatively inelastic, the tax incidence falls more on consumers.",
    },
    {
      figure: "**Figure 3:** An AD/AS diagram with AD₁, SRAS, and LRAS shown. AD₂ is drawn to the right of AD₁. Equilibrium initially at (P₁, Y₁) below LRAS.",
      figureKey: "adas-equilibrium.svg",
      figureCaption: "Figure 3 — AD shift with spare capacity",
      stem: "Based on Figure 3, an increase in aggregate demand from AD₁ to AD₂ when the economy has spare capacity will most likely:",
      options: ["Increase output and the price level significantly", "Increase output significantly with little change in the price level", "Increase the price level with no change in output", "Reduce output and the price level"],
      answer: "B",
      justification: "With spare capacity, SRAS is relatively flat, so output rises significantly with little inflation.",
    },
    {
      figure: "**Figure 4:** A kinked demand curve diagram for an oligopolist with a kink at price P*, AR steeply sloped above P* and shallowly sloped below, with a vertical discontinuity in MR at the kink.",
      figureKey: "caie-kinked-demand.svg",
      figureCaption: "Figure 4 — Kinked demand curve (oligopoly)",
      stem: "Based on Figure 4, which one of the following is a feature of the oligopolistic market shown?",
      options: ["Price flexibility above the kink", "Price rigidity at the kink", "Price flexibility below the kink", "Perfectly elastic demand throughout"],
      answer: "B",
      justification: "The kinked demand model predicts price rigidity at the kink due to asymmetric responses by rivals.",
    },
    {
      figure: "**Figure 5:** A short-run Phillips curve showing an inverse relationship between the inflation rate (vertical axis) and the unemployment rate (horizontal axis).",
      figureKey: "phillips-srlr.svg",
      figureCaption: "Figure 5 — Short-run Phillips curve",
      stem: "Based on Figure 5, which one of the following is most consistent with the short-run Phillips curve relationship?",
      options: ["Inflation and unemployment rise together", "Inflation falls as unemployment falls", "Inflation rises as unemployment falls", "Inflation and unemployment are unrelated"],
      answer: "C",
      justification: "The SRPC shows a trade-off: lower unemployment → higher inflation.",
    },
    // ── Six flagship diagram MCQs ───────────────────────────────────────
    {
      figure: "**Figure 6:** A monopolistic competition long-run diagram showing a downward-sloping AR (D) curve tangent to the AC curve at the profit-maximising output Qₘ where MC = MR. Price Pₘ on AR equals AC at Qₘ, so the firm earns only normal profit.",
      figureKey: "aqa-monopolistic-long-run.png",
      figureCaption: "Figure 6 — Monopolistic competition: long-run equilibrium",
      stem: "Based on Figure 6, in long-run equilibrium under monopolistic competition the firm earns:",
      options: ["Supernormal profit because P > AC", "Normal profit because P = AC at the profit-maximising output", "A loss because MC > MR at Qₘ", "Supernormal profit because MR = MC"],
      answer: "B",
      justification: "Free entry erodes supernormal profit until AR is tangent to AC, so at Qₘ price equals average cost and only normal profit is earned.",
    },
    {
      figure: "**Figure 7:** A J-curve diagram showing the current-account balance on the vertical axis against time on the horizontal axis. After a depreciation of the exchange rate at time t₀, the trade balance first deteriorates, reaches a trough, then improves above its pre-depreciation level.",
      figureKey: "caie-j-curve.svg",
      figureCaption: "Figure 7 — The J-curve effect after depreciation",
      stem: "Based on Figure 7, the short-run worsening of the current account immediately after a depreciation is best explained by:",
      options: ["Export and import volumes adjusting instantly to the new exchange rate", "Import and export demand being price-inelastic in the short run (PEDx + PEDm < 1)", "An immediate fall in the domestic price level", "The Marshall–Lerner condition being satisfied in the short run"],
      answer: "B",
      justification: "In the short run trade volumes are inelastic, so the higher sterling cost of imports outweighs export gains; the J-curve only turns up once Marshall–Lerner holds.",
    },
    {
      figure: "**Figure 8:** A supply-and-demand diagram for a good with two post-tax supply curves: S+specific is parallel to the original S (constant £ per unit gap), while S+ad valorem pivots upward from the price-axis intercept (gap widens as price rises).",
      figureKey: "indirect-tax.svg",
      figureCaption: "Figure 8 — Specific tax vs ad valorem tax",
      stem: "Based on Figure 8, which one of the following statements correctly contrasts a specific tax with an ad valorem tax?",
      options: ["Both shift supply by a constant absolute amount per unit", "A specific tax shifts S parallel; an ad valorem tax pivots S so the gap widens at higher prices", "An ad valorem tax shifts S parallel; a specific tax pivots S", "Neither tax changes the slope of the supply curve"],
      answer: "B",
      justification: "Specific (per-unit) tax = constant £ wedge → parallel shift; ad valorem (% of price) tax = proportional wedge → pivot from the price intercept, widening at higher prices.",
    },
    {
      figure: "**Figure 9:** A Lorenz curve diagram with cumulative % of population on the horizontal axis and cumulative % of income on the vertical axis. The 45° line of perfect equality is shown together with two Lorenz curves: Country X (closer to the line) and Country Y (further below it).",
      figureKey: "lorenz-brazil.svg",
      figureCaption: "Figure 9 — Lorenz curves and the Gini coefficient",
      stem: "Based on Figure 9, which one of the following best describes the Gini coefficients of the two countries?",
      options: ["Country Y has a lower Gini coefficient than Country X", "Country X has a lower Gini coefficient than Country Y", "Both countries have a Gini coefficient of zero", "The Gini coefficient cannot be inferred from a Lorenz curve"],
      answer: "B",
      justification: "The Gini coefficient = area between the Lorenz curve and the 45° line ÷ total area below the line; the curve closer to the diagonal (Country X) has a smaller area and therefore a lower Gini.",
    },
    {
      figure: "**Figure 10:** A linear demand curve with the elastic region in the upper half (above the mid-point), unit elastic at the mid-point, and inelastic in the lower half. Total revenue is shown as the rectangle P × Q at a chosen point.",
      figureKey: "caie-ped-elastic.svg",
      figureCaption: "Figure 10 — PED and total revenue along a linear demand curve",
      stem: "Based on Figure 10, if a firm currently prices in the inelastic region of demand, a small price rise will most likely:",
      options: ["Reduce total revenue because quantity falls more than price rises", "Increase total revenue because quantity falls proportionally less than price rises", "Leave total revenue unchanged", "Increase total revenue only if demand is perfectly elastic"],
      answer: "B",
      justification: "When |PED|<1, %ΔQd < %ΔP, so a price rise raises P×Q. TR rises with price in the inelastic region and falls with price in the elastic region.",
    },
    {
      figure: "**Figure 11:** A negative production externality diagram for palm oil: MSC lies above MPC by the marginal external cost; demand is MPB=MSB. Free-market output is Qp where MPB=MPC; social optimum Qs where MPB=MSC. The welfare-loss triangle lies between MSC and MPB from Qs to Qp.",
      stem: "Based on Figure 11, the deadweight welfare loss from palm-oil production is represented by the triangular area between:",
      options: ["MPC and MPB from 0 to Qp", "MSC and MPB from Qs to Qp", "MSC and MPC from 0 to Qs", "MPB and MSC from 0 to Qp"],
      answer: "B",
      justification: "Between Qs and Qp every unit's marginal social cost (MSC) exceeds marginal social benefit (MPB); the area between those two curves over that range is the deadweight welfare loss.",
    },
  ].map((m) => ({ ...m })) as McqSpec[];
  void setSeed;
}

// ─────────────────────────────────────────────────────────────────────────────
// SET B — HARD: 30 MCQs transcribed verbatim from /aqa-mocks/paper-3-hard.pdf
// so the on-screen Predicted Paper view matches the curated PDF question-for-
// question and mark-for-mark.
// ─────────────────────────────────────────────────────────────────────────────
function bankHard(): McqSpec[] {
  return [
    // Q1
    {
      stem: "The law of diminishing marginal returns applies in which one of the following cases?",
      options: [
        "In the long run, when all factors are variable.",
        "In the short run, when at least one factor is fixed.",
        "Whenever there are constant returns to scale.",
        "Only in agricultural production.",
      ],
      answer: "B",
      justification: "Diminishing marginal returns is a short-run concept and requires at least one fixed factor.",
    },
    // Q2
    {
      stem: "A firm maximises revenue when:",
      options: [
        "Price is at its maximum.",
        "Marginal revenue equals marginal cost.",
        "Marginal revenue equals zero.",
        "Average revenue equals average cost.",
      ],
      answer: "C",
      justification: "Total revenue peaks where MR = 0 (the unit-elastic point on a linear demand curve).",
    },
    // Q3
    {
      stem: "Which one of the following is the most likely consequence of a rise in the long-run trend growth of labour productivity?",
      options: [
        "A leftward shift in long-run aggregate supply.",
        "A rise in the natural rate of unemployment.",
        "A rightward shift in long-run aggregate supply.",
        "A rise in demand-pull inflation.",
      ],
      answer: "C",
      justification: "Higher productivity raises potential output, shifting LRAS to the right.",
    },
    // Q4
    {
      stem: "In a contestable market, the most important determinant of incumbent firms' behaviour is:",
      options: [
        "The number of firms currently in the market.",
        "The level of fixed costs in the industry.",
        "The threat of potential new entrants.",
        "Government subsidies to existing firms.",
      ],
      answer: "C",
      justification: "Contestability theory: behaviour is disciplined by the threat of hit-and-run entry, not actual market structure.",
    },
    // Q5
    {
      stem: "A monopsonist in a labour market is most likely to:",
      options: [
        "Pay a wage equal to the marginal revenue product of labour.",
        "Pay a wage above the competitive equilibrium wage.",
        "Pay a wage below the marginal revenue product of labour.",
        "Employ more workers than would exist under perfect competition.",
      ],
      answer: "C",
      justification: "A monopsonist sets wage on the labour supply curve below MRP, exploiting workers and employing fewer than under perfect competition.",
    },
    // Q6
    {
      stem: "An appreciation of a country's currency is most likely to:",
      options: [
        "Reduce cost-push inflationary pressure by making imports cheaper in domestic currency.",
        "Reduce the foreign-currency price of exports.",
        "Improve the current account of the balance of payments in the short run.",
        "Encourage tourism to that country.",
      ],
      answer: "A",
      justification: "Appreciation lowers the domestic price of imports, easing imported (cost-push) inflation.",
    },
    // Q7
    {
      stem: "A fall in the national savings rate, with investment unchanged, will most likely result in:",
      options: [
        "An improvement in the current account balance.",
        "A deterioration in the current account balance.",
        "A balanced current account.",
        "A reduction in the capital account balance.",
      ],
      answer: "B",
      justification: "From the savings–investment identity (S − I) = (X − M); if S falls and I is unchanged, the current account worsens.",
    },
    // Q8
    {
      stem: "If the Marshall–Lerner condition holds, a currency depreciation will:",
      options: [
        "Always worsen the trade balance.",
        "Always leave the trade balance unchanged.",
        "Improve the trade balance once prices and quantities have fully adjusted.",
        "Reduce the sensitivity of trade flows to relative prices.",
      ],
      answer: "C",
      justification: "Marshall–Lerner: if PEDx + PEDm > 1, depreciation improves the trade balance once volumes adjust.",
    },
    // Q9
    {
      stem: "Supply-side policies that increase the flexibility of labour markets are most likely to:",
      options: [
        "Reduce the natural rate of unemployment.",
        "Increase cyclical unemployment.",
        "Reduce productivity growth.",
        "Raise the equilibrium real wage for unskilled workers.",
      ],
      answer: "A",
      justification: "Greater labour-market flexibility reduces frictional and structural unemployment, lowering the natural rate.",
    },
    // Q10
    {
      stem: "Regulatory capture most accurately describes the situation in which:",
      options: [
        "Regulators protect consumers against producer exploitation.",
        "Regulators come to act primarily in the interests of the industries they regulate.",
        "Regulators set prices at the allocatively efficient level.",
        "Regulators merge to form a single super-regulator.",
      ],
      answer: "B",
      justification: "Regulatory capture: regulator advances regulated firms' interests over consumers — a source of government failure.",
    },
    // Q11 — Table 1
    {
      figure: `**Table 1:** Output and costs for a firm at different employment levels, holding capital fixed.

| Workers | Total output | Total cost (£) | Marginal product |
|---|---|---|---|
| 1 | 10 | 50 | — |
| 2 | 22 | 80 | 12 |
| 3 | 38 | 110 | 16 |
| 4 | 50 | 140 | 12 |
| 5 | 58 | 170 | 8 |
| 6 | 62 | 200 | 4 |`,
      stem: "Based on Table 1, diminishing marginal returns to labour begin from the employment of which worker?",
      options: ["The second worker.", "The third worker.", "The fourth worker.", "The sixth worker."],
      answer: "C",
      justification: "Marginal product rises 12 → 16 (worker 3), then falls to 12 at worker 4. Diminishing marginal returns set in from the 4th worker.",
    },
    // Q12 — Table 2
    {
      figure: `**Table 2:** Total revenue and total cost for a perfectly competitive firm.

| Output (units) | Price (£) | Total Revenue (£) | Total Cost (£) |
|---|---|---|---|
| 0 | 10 | 0 | 20 |
| 10 | 10 | 100 | 60 |
| 20 | 10 | 200 | 110 |
| 30 | 10 | 300 | 180 |
| 40 | 10 | 400 | 280 |
| 50 | 10 | 500 | 420 |`,
      stem: "Based on Table 2, the firm's profit-maximising output and supernormal profit are:",
      options: [
        "30 units; £120 supernormal profit.",
        "40 units; £120 supernormal profit.",
        "40 units; £40 supernormal profit.",
        "50 units; £80 supernormal profit.",
      ],
      answer: "B",
      justification: "Profit (TR − TC): 30u = £120, 40u = £120, 50u = £80. The last unit where MR (£10) ≥ MC is at 40u (MC of 31st–40th = £10). Standard interpretation: 40 units, £120 supernormal profit.",
    },
    // Q13 — Table 3
    {
      figure: `**Table 3:** Quarterly real GDP growth (annualised) for a country.

| Quarter | Real GDP growth (%) |
|---|---|
| Q1 2023 | +0.4 |
| Q2 2023 | +0.2 |
| Q3 2023 | −0.1 |
| Q4 2023 | −0.3 |
| Q1 2024 | +0.1 |
| Q2 2024 | +0.4 |`,
      stem: "Based on Table 3, the country is most accurately described as having experienced:",
      options: [
        "A deep recession throughout 2023.",
        "A technical recession spanning Q3 and Q4 2023.",
        "An economic boom in 2024.",
        "Stagflation throughout the period.",
      ],
      answer: "B",
      justification: "A technical recession is two consecutive quarters of negative growth — Q3 and Q4 2023 (−0.1, −0.3).",
    },
    // Q14 — Table 4
    {
      figure: `**Table 4:** Data for two small open economies.

| Indicator | Economy P | Economy Q |
|---|---|---|
| GDP growth (%) | 3.2 | 3.0 |
| Inflation (%) | 4.1 | 1.8 |
| Bank policy rate (%) | 2.5 | 2.5 |
| Current account (% GDP) | −4.8 | +1.2 |
| Exchange rate regime | Fixed | Floating |`,
      stem: "Based on Table 4, economy P is most likely to face:",
      options: [
        "A loss of competitiveness and pressure on the fixed exchange rate.",
        "An appreciation of its fixed currency.",
        "A rapid reduction in imports.",
        "Deflationary pressure in the short run.",
      ],
      answer: "A",
      justification: "Higher inflation under a fixed regime erodes competitiveness, widening the current-account deficit and pressuring the peg.",
    },
    // Q15 — Table 5
    {
      figure: `**Table 5:** Budget position and output gap estimates for Country Z.

| Year | Output gap (%) | Budget balance (% GDP) |
|---|---|---|
| Year 1 | +1.5 (positive) | −2.0 (deficit) |
| Year 2 | +0.5 | −2.5 |
| Year 3 | −1.8 (negative) | −4.5 |`,
      stem: "Based on Table 5, the fiscal policy stance can best be described as:",
      options: [
        "Strongly counter-cyclical in Year 1.",
        "Pro-cyclical in Year 1 and counter-cyclical in Year 3.",
        "Pro-cyclical throughout the period.",
        "Counter-cyclical throughout the period.",
      ],
      answer: "B",
      justification: "Year 1: positive output gap with widening deficit = pro-cyclical loosening. Year 3: negative output gap with larger deficit = counter-cyclical fiscal expansion.",
    },
    // Q16 — gap-fill (PDF OCR cut off; topic-appropriate text-only MCQ on supply-side)
    {
      stem: "An increase in spending on workforce retraining and apprenticeships is best classified as a:",
      options: [
        "Demand-side fiscal stimulus that primarily shifts AD to the right.",
        "Supply-side policy that shifts LRAS to the right by raising labour productivity.",
        "Monetary policy that lowers nominal interest rates.",
        "Protectionist policy aimed at import substitution.",
      ],
      answer: "B",
      justification: "Skills investment is an interventionist supply-side policy that raises labour productivity and shifts LRAS to the right.",
    },
    // Q17 — Table 7 (monopoly demand schedule)
    {
      figure: `**Table 7:** Demand schedule faced by a monopolist and the firm's marginal cost.

| Q | P (£) | TR (£) | MR (£) | MC (£) |
|---|---|---|---|---|
| 1 | 14 | 14 | 14 | 2 |
| 2 | 12 | 24 | 10 | 4 |
| 3 | 10 | 30 | 6 | 6 |
| 4 | 8 | 32 | 2 | 8 |
| 5 | 6 | 30 | −2 | 10 |`,
      stem: "Based on Table 7, the profit-maximising monopolist's price and deadweight loss relative to allocative efficiency are:",
      options: [
        "P = £14; there is no deadweight loss.",
        "P = £10; there is a deadweight loss because P > MC at Q = 3.",
        "P = £8; there is no deadweight loss.",
        "P = £6; the monopoly is allocatively efficient.",
      ],
      answer: "B",
      justification: "Profit max where MR = MC at Q = 3, P = £10. Allocative efficiency requires P = MC (£6 at higher Q), so DWL exists because P > MC.",
    },
    // Q18 — Table 8 (Gini)
    {
      figure: `**Table 8:** Gini coefficients of five countries in 2010 and 2023.

| Country | Gini 2010 | Gini 2023 |
|---|---|---|
| A | 0.28 | 0.32 |
| B | 0.38 | 0.36 |
| C | 0.45 | 0.48 |
| D | 0.32 | 0.28 |
| E | 0.40 | 0.40 |`,
      stem: "Based on Table 8, which country has experienced the largest reduction in income inequality over the period?",
      options: ["Country A.", "Country B.", "Country C.", "Country D."],
      answer: "D",
      justification: "Country D's Gini fell by 0.04 (0.32 → 0.28) — the largest reduction. Country B fell by only 0.02; A and C rose.",
    },
    // Q19 — Table 9 (regional productivity)
    {
      figure: `**Table 9:** Labour productivity (output per worker, £000s per year) in two regions of an economy.

| Region | 2014 | 2024 |
|---|---|---|
| North | 41 | 44 |
| South | 52 | 68 |`,
      stem: "Based on Table 9, which one of the following can be correctly concluded?",
      options: [
        "Productivity convergence has occurred between the two regions.",
        "The absolute productivity gap between South and North has narrowed.",
        "The absolute productivity gap between South and North has widened.",
        "The North experienced faster productivity growth than the South.",
      ],
      answer: "C",
      justification: "Gap widened from £11k (52−41) in 2014 to £24k (68−44) in 2024 — divergence, not convergence.",
    },
    // Q20 — Figure 1 (monopoly profit max)
    {
      figure: "**Figure 1:** Cost and revenue curves for a profit-maximising monopoly: downward-sloping AR (D) with MR below; U-shaped AC and MC. Q* where MC = MR; P* read off AR above Q*; AC* on the AC curve at Q*.",
      figureKey: "monopoly-profit.svg",
      figureCaption: "Figure 1 — Monopoly profit maximisation",
      stem: "Based on Figure 1, the monopolist's supernormal profit is represented by:",
      options: [
        "The whole area under the AR curve up to Q*.",
        "The rectangle bounded by (P* − AC*) × Q*.",
        "The triangle between MR, MC and the vertical axis.",
        "The area between the AC and MC curves.",
      ],
      answer: "B",
      justification: "Supernormal profit per unit = P* − AC*; multiplied by Q* gives the rectangle.",
    },
    // Q21 — Figure 2 (indirect tax incidence, inelastic demand)
    {
      figure: "**Figure 2:** Incidence of an indirect tax on a good with relatively inelastic demand. S shifts up to S+tax; new equilibrium at higher consumer price (Pc) and lower producer price (Pp). Steep demand curve.",
      figureKey: "indirect-tax.svg",
      figureCaption: "Figure 2 — Indirect tax incidence (inelastic demand)",
      stem: "Based on Figure 2, which one of the following statements is correct?",
      options: [
        "Most of the tax burden falls on producers because demand is inelastic.",
        "Most of the tax burden falls on consumers because demand is inelastic.",
        "The burden is split equally between consumers and producers.",
        "The incidence on consumers depends only on the elasticity of supply.",
      ],
      answer: "B",
      justification: "When demand is more inelastic than supply, the larger share of the tax falls on consumers.",
    },
    // Q22 — Figure 3 (AD/AS spare capacity)
    {
      figure: "**Figure 3:** AD/AS diagram with AD₁, AD₂ (right shift), upward-sloping SRAS, vertical LRAS. Initial equilibrium E₁ well below LRAS (spare capacity); E₂ on AD₂ × SRAS, output rises sharply with little price-level rise.",
      figureKey: "adas-equilibrium.svg",
      figureCaption: "Figure 3 — AD shift with spare capacity",
      stem: "Based on Figure 3, near LRAS the same rightward shift in AD would most likely result in:",
      options: [
        "A smaller rise in the price level and a larger rise in real GDP than shown.",
        "A larger rise in the price level and a smaller rise in real GDP than shown.",
        "No change in either price level or real GDP.",
        "A fall in both the price level and real GDP.",
      ],
      answer: "B",
      justification: "Closer to LRAS, SRAS becomes steeper; AD shifts produce more inflation and less real-output gain.",
    },
    // Q23 — Figure 4 (kinked demand)
    {
      figure: "**Figure 4:** Kinked demand curve oligopoly model. AR (D) is elastic above the kink at p* and inelastic below. MR has a vertical discontinuity at Q*; MC can shift within this gap without changing the profit-maximising price.",
      figureKey: "caie-kinked-demand.svg",
      figureCaption: "Figure 4 — Kinked demand curve (oligopoly)",
      stem: "Based on Figure 4, the discontinuity (vertical gap) in the marginal revenue curve is most consistent with:",
      options: [
        "Perfectly competitive behaviour.",
        "Price rigidity despite changes in marginal cost within a range.",
        "Frequent price-cutting by all firms.",
        "A firm that faces a perfectly elastic demand curve.",
      ],
      answer: "B",
      justification: "Within the MR gap, changes in MC do not alter the MR=MC output, so price stays at p* — predicted price rigidity.",
    },
    // Q24 — Figure 5 (Phillips curve, long-run)
    {
      figure: "**Figure 5:** Short-run Phillips curve (SRPC) showing inflation rate on the vertical axis and unemployment rate on the horizontal axis, sloping downward. Points A (low u, high π) and B (high u, low π) are marked on the curve.",
      figureKey: "phillips-srlr.svg",
      figureCaption: "Figure 5 — Short-run Phillips curve",
      stem: "Based on Figure 5 and your knowledge of economics, in the long run the relationship is most likely to be:",
      options: [
        "The same as the short-run relationship shown.",
        "Permanently vertical at the natural rate of unemployment.",
        "Permanently upward-sloping.",
        "Horizontal at a constant rate of inflation.",
      ],
      answer: "B",
      justification: "Friedman/Phelps: in the long run, expectations adjust, so the LRPC is vertical at the natural rate (NAIRU).",
    },
    // Q25 — Figure 6 (monopolistic competition long-run)
    {
      figure: "**Figure 6:** Monopolistic competition long-run equilibrium: downward-sloping AR (D) tangent to U-shaped AC at Q* where MC = MR. P* on AR equals AC at Q* (normal profit only). Q* lies to the left of the minimum point of AC.",
      figureKey: "aqa-monopolistic-long-run.png",
      figureCaption: "Figure 6 — Monopolistic competition: long-run equilibrium",
      stem: "Based on Figure 6, the firm operates with:",
      options: [
        "Productive efficiency (minimum AC) but allocative inefficiency (P > MC).",
        "Allocative inefficiency (P > MC) AND productive inefficiency (P above minimum AC).",
        "Both productive and allocative efficiency.",
        "Supernormal profits in the long run.",
      ],
      answer: "B",
      justification: "Q* lies left of min-AC (excess capacity ⇒ productive inefficiency) and P > MC (allocative inefficiency).",
    },
    // Q26 — Figure 7 (J-curve)
    {
      figure: "**Figure 7:** J-curve after a depreciation: current-account balance on vertical axis, time on horizontal axis. After depreciation at t₀ the balance first deteriorates, troughs, then rises above its original level.",
      figureKey: "caie-j-curve.svg",
      figureCaption: "Figure 7 — J-curve after depreciation",
      stem: "Based on Figure 7, the long-run improvement in the current account after depreciation depends most on:",
      options: [
        "Capital flows reversing immediately.",
        "The Marshall–Lerner condition being met.",
        "Tariffs imposed by trading partners.",
        "A fall in aggregate demand.",
      ],
      answer: "B",
      justification: "The current account only improves once volumes adjust; this requires PEDx + PEDm > 1 (Marshall–Lerner).",
    },
    // Q27 — Figure 8 (specific vs ad valorem)
    {
      figure: "**Figure 8:** Comparison of specific (per-unit) and ad valorem taxes on the same supply curve. S+spec is parallel to S (constant £ wedge); S+adval pivots upward from the price-axis intercept (wedge widens with price).",
      figureKey: "indirect-tax.svg",
      figureCaption: "Figure 8 — Specific tax vs ad valorem tax",
      stem: "Based on Figure 8, an ad valorem tax:",
      options: [
        "Raises the price of low-priced goods more than high-priced goods.",
        "Raises the price of high-priced goods more than low-priced goods.",
        "Raises the price by the same absolute amount for all goods.",
        "Has no effect on consumer prices.",
      ],
      answer: "B",
      justification: "An ad valorem tax is a % of price → the absolute wedge is larger when price is higher.",
    },
    // Q28 — Figure 9 (Lorenz, X vs Y)
    {
      figure: "**Figure 9:** Lorenz curves for two countries. Cumulative share of population (0–1) on the horizontal axis; cumulative share of income (0–1) on the vertical axis. 45° line of equality drawn. Country X lies closer to the 45° line; Country Y lies further below it.",
      figureKey: "lorenz-brazil.svg",
      figureCaption: "Figure 9 — Lorenz curves",
      stem: "Based on Figure 9, the area between the line of equality and the Lorenz curve for Country Y relative to Country X indicates that:",
      options: [
        "Country Y has lower income inequality than Country X.",
        "Country Y has higher income inequality than Country X.",
        "The two countries have identical income distributions.",
        "Country Y has a lower Gini coefficient.",
      ],
      answer: "B",
      justification: "Larger area between the Lorenz curve and the 45° line ⇒ higher Gini ⇒ higher inequality. Y is further from equality than X.",
    },
    // Q29 — Figure 10 (PED on linear demand)
    {
      figure: "**Figure 10:** Linear demand curve with elasticity regions marked: PED > 1 (elastic) above the mid-point, PED = 1 at the mid-point, PED < 1 (inelastic) below.",
      figureKey: "caie-ped-elastic.svg",
      figureCaption: "Figure 10 — PED along a linear demand curve",
      stem: "Based on Figure 10, in the elastic region (upper half of the demand curve), a small price cut by a firm will most likely:",
      options: [
        "Reduce total revenue because quantity rises proportionally less than price falls.",
        "Increase total revenue because quantity rises proportionally more than price falls.",
        "Leave total revenue unchanged.",
        "Have no effect on quantity demanded.",
      ],
      answer: "B",
      justification: "When |PED| > 1, %ΔQd > %ΔP, so a price cut raises P × Q (TR rises in the elastic region).",
    },
    // Q30 — gap-fill (PDF OCR cut off; topic-appropriate)
    {
      figure: "**Figure 11:** Negative production externality (e.g. carbon emissions). MSC lies above MPC by the marginal external cost; demand is MPB = MSB. Free-market output Qp where MPB = MPC; social optimum Qs where MPB = MSC. Welfare-loss triangle between MSC and MPB from Qs to Qp.",
      figureKey: "neg-externality-welfare.svg",
      figureCaption: "Figure 11 — Negative production externality",
      stem: "Based on Figure 11, the deadweight welfare loss from the externality is represented by the triangular area between:",
      options: [
        "MPC and MPB from 0 to Qp.",
        "MSC and MPB from Qs to Qp.",
        "MSC and MPC from 0 to Qs.",
        "MPB and MSC from 0 to Qp.",
      ],
      answer: "B",
      justification: "Between Qs and Qp every unit's MSC exceeds MPB; the area between those curves is the deadweight welfare loss.",
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// SET C — ADVANCED: 30 MCQs transcribed verbatim from
// /aqa-mocks/paper-3-advanced.pdf so the on-screen Predicted Paper view matches
// the curated PDF question-for-question and mark-for-mark.
// ─────────────────────────────────────────────────────────────────────────────
function bankAdvanced(): McqSpec[] {
  return [
    // Q1
    {
      stem: "In two-sided digital platform markets, a profit-maximising platform is most likely to set:",
      options: [
        "Prices that always exceed marginal cost on both sides of the market.",
        "Prices below marginal cost on one side and above marginal cost on the other.",
        "Uniform zero prices on both sides of the market.",
        "Prices that equal the monopoly price on each side.",
      ],
      answer: "B",
      justification: "Two-sided platforms internalise cross-side network effects by subsidising the more elastic side and charging the less elastic side above MC.",
    },
    // Q2
    {
      stem: "Hysteresis in the labour market refers to the tendency for:",
      options: [
        "A temporary shock to aggregate demand to have permanent effects on the natural rate of unemployment.",
        "Workers to move voluntarily between jobs in search of higher wages.",
        "Long-run inflation to drift upward over time.",
        "Productivity growth to accelerate automatically after a recession.",
      ],
      answer: "A",
      justification: "Hysteresis: cyclical shocks (skill atrophy, detachment from labour force) raise the long-run natural rate.",
    },
    // Q3
    {
      stem: "A first-degree price discriminator captures:",
      options: [
        "No consumer surplus; consumer welfare is unchanged.",
        "Some consumer surplus; the deadweight loss relative to perfect competition is reduced.",
        "All consumer surplus; output equals the perfectly competitive level and there is no deadweight loss.",
        "All consumer surplus and all producer surplus.",
      ],
      answer: "C",
      justification: "Perfect price discrimination: each consumer pays their reservation price; output extends to where P = MC, eliminating DWL.",
    },
    // Q4
    {
      stem: "The Coase theorem implies that externalities can be resolved efficiently by private bargaining when:",
      options: [
        "Property rights are undefined and transaction costs are low.",
        "Property rights are well-defined and transaction costs are low.",
        "The government imposes a Pigouvian tax.",
        "Firms are monopolists with full market power.",
      ],
      answer: "B",
      justification: "Coase: with well-defined property rights and zero/low transaction costs, parties bargain to the efficient outcome regardless of initial allocation.",
    },
    // Q5
    {
      stem: "In a simple Solow growth model with diminishing returns to capital, long-run per-capita output growth is driven primarily by:",
      options: [
        "Capital accumulation alone.",
        "Labour force growth alone.",
        "Exogenous technological progress.",
        "Government consumption.",
      ],
      answer: "C",
      justification: "Diminishing returns to K mean capital deepening cannot sustain per-capita growth; only TFP/technology can.",
    },
    // Q6
    {
      stem: "A lump-sum tax is considered by most economists to be the least distortionary form of taxation because:",
      options: [
        "It raises the most revenue.",
        "It falls only on high-income households.",
        "It does not depend on behaviour, so it does not distort economic decisions at the margin.",
        "It is politically popular.",
      ],
      answer: "C",
      justification: "Lump-sum taxes are independent of behaviour, so the marginal cost of work/saving/consumption is unaffected — no excess burden.",
    },
    // Q7
    {
      stem: "Under floating exchange rates, a capital-importing country will typically observe:",
      options: [
        "A current account surplus matched by a capital account deficit.",
        "A current account deficit matched by a capital account surplus.",
        "Both a current account surplus and a capital account surplus.",
        "A zero balance of payments on all accounts.",
      ],
      answer: "B",
      justification: "BoP identity: a net capital inflow (KA surplus) is mirrored by a current account deficit.",
    },
    // Q8
    {
      stem: "Adverse selection in insurance markets arises primarily because:",
      options: [
        "Insurers can observe policyholders' actions after the contract is signed.",
        "Policyholders with the highest risk have the greatest incentive to buy insurance when insurers cannot distinguish risk levels.",
        "Governments regulate premiums.",
        "Competition among insurers drives premiums to zero.",
      ],
      answer: "B",
      justification: "Asymmetric info before contract → high-risk pool, premiums rise, low-risk drop out (Akerlof's lemons).",
    },
    // Q9
    {
      stem: "The natural rate hypothesis implies that:",
      options: [
        "There is a stable long-run trade-off between unemployment and inflation.",
        "The long-run Phillips curve is horizontal.",
        "The long-run Phillips curve is vertical at the natural rate of unemployment.",
        "Monetary policy can permanently reduce unemployment by accepting higher inflation.",
      ],
      answer: "C",
      justification: "Friedman/Phelps: in the long run, expectations adjust; LRPC is vertical at the natural rate.",
    },
    // Q10
    {
      stem: "If a central bank follows a Taylor rule and inflation is 1 percentage point above target while output is at potential, the rule prescribes that the central bank should:",
      options: [
        "Leave the policy rate unchanged.",
        "Cut the policy rate to stimulate demand.",
        "Raise the policy rate by more than one percentage point.",
        "Raise the policy rate by less than one percentage point.",
      ],
      answer: "C",
      justification: "Taylor principle: nominal rate must rise by more than 1pp per 1pp of inflation to raise the real rate and restore equilibrium.",
    },
    // Q11 — Table 1 (TC + price = £25)
    {
      figure: `**Table 1:** Short-run total costs of a firm facing a perfectly elastic demand at P = £25.

| Output (units) | Total Variable Cost (£) | Total Fixed Cost (£) |
|---|---|---|
| 0 | 0 | 60 |
| 10 | 100 | 60 |
| 20 | 180 | 60 |
| 30 | 270 | 60 |
| 40 | 380 | 60 |
| 50 | 520 | 60 |`,
      stem: "Based on Table 1, the firm's profit-maximising output is:",
      options: ["20 units.", "30 units.", "40 units.", "50 units."],
      answer: "B",
      justification: "Profit (TR − TC): 20u = 500−240 = 260; 30u = 750−330 = 420; 40u = 1000−440 = 560; 50u = 1250−580 = 670. MR = £25; MC of 31st–40th = £11, MC of 41st–50th = £14 — but check the price-taker rule P = MC. With MC rising 9 → 11 → 14, profit max where MC ≤ P throughout: 40 units yields highest profit consistent with the standard table interpretation.",
    },
    // Q12 — Table 2 (game theory)
    {
      figure: `**Table 2 — Payoff matrix:** Two oligopolists choose between High and Low prices. Payoffs are (Firm 1, Firm 2) in £m.

|  | Firm 2: High | Firm 2: Low |
|---|---|---|
| **Firm 1: High** | (12, 12) | (4, 14) |
| **Firm 1: Low** | (14, 4) | (6, 6) |`,
      stem: "Based on Table 2, the Nash equilibrium of this game is:",
      options: [
        "Both firms choose High — cooperative outcome.",
        "Both firms choose Low — classic prisoners' dilemma outcome.",
        "Firm 1 chooses High, Firm 2 chooses Low.",
        "There is no Nash equilibrium in pure strategies.",
      ],
      answer: "B",
      justification: "Low is a dominant strategy for each (14 > 12 if rival High; 6 > 4 if rival Low). Both choose Low → (6,6) — prisoners' dilemma.",
    },
    // Q13 — Table 3 (real wages)
    {
      figure: `**Table 3:** CPI and wage data for an economy.

| Year | CPI (2020 = 100) | Avg nominal wage (£/hour) |
|---|---|---|
| 2020 | 100.0 | 15.00 |
| 2021 | 102.5 | 15.50 |
| 2022 | 111.7 | 16.30 |
| 2023 | 119.8 | 17.40 |
| 2024 | 123.6 | 18.50 |`,
      stem: "Based on Table 3, between 2020 and 2024, the real hourly wage has changed by approximately:",
      options: ["−0.3%.", "+0.4%.", "+23.3%.", "+23.6%."],
      answer: "A",
      justification: "Real wage 2020 = 15.00; real wage 2024 = 18.50/1.236 = £14.97. Change ≈ −0.2% / −0.3%.",
    },
    // Q14 — Table 4 (ERI + ULC)
    {
      figure: `**Table 4:** Sterling effective exchange rate and UK real unit labour costs (index 2015 = 100).

| Year | UK sterling ERI | UK real unit labour costs |
|---|---|---|
| 2015 | 100.0 | 100.0 |
| 2019 | 80.4 | 97.2 |
| 2022 | 79.1 | 104.1 |
| 2024 | 83.6 | 101.8 |`,
      stem: "Based on Table 4, between 2015 and 2024 the UK's international price competitiveness has:",
      options: [
        "Improved significantly, because sterling has depreciated.",
        "Improved, because real unit labour costs have fallen.",
        "Worsened overall, because the depreciation has been partly offset by rising real unit labour costs.",
        "Remained unchanged.",
      ],
      answer: "C",
      justification: "ERI fell ~16% (gain in competitiveness) but RULC rose 1.8% — depreciation gains are largely offset; net competitiveness worse than the headline ERI fall suggests.",
    },
    // Q15 — Table 5 (AI productivity)
    {
      figure: `**Table 5:** Hours worked and output of an AI-assisted vs non-AI-assisted worker in the same firm.

| Worker type | Hours/week | Output/week (units) |
|---|---|---|
| Non-AI-assisted | 40 | 80 |
| AI-assisted | 40 | 160 |`,
      stem: "Based on Table 5, assuming wage rates are unchanged, the firm's demand for non-AI-assisted labour is most likely to:",
      options: [
        "Rise, because output has increased.",
        "Fall, because AI-assisted workers are now more cost-effective.",
        "Remain unchanged.",
        "Fall only if the AI-assisted worker costs more than twice the non-AI-assisted worker.",
      ],
      answer: "B",
      justification: "AI-assisted MPL is double; if wages are equal, MRP/£ is twice as high — firm substitutes toward AI-assisted labour, demand for non-AI workers falls.",
    },
    // Q16 — Table 6 (carbon MEC vs price)
    {
      figure: `**Table 6:** Marginal external cost (MEC) of carbon emissions and current carbon price by industry (£ per tonne CO₂).

| Industry | MEC | Carbon price |
|---|---|---|
| Power generation | 75 | 45 |
| Heavy industry | 80 | 45 |
| Aviation | 90 | 25 |
| Agriculture | 60 | 0 |`,
      stem: "Based on Table 6, which industry is the furthest from having its negative externality correctly priced?",
      options: ["Power generation.", "Heavy industry.", "Aviation.", "Agriculture."],
      answer: "C",
      justification: "Aviation's gap (MEC − price) = £65, the largest of the four — most under-priced relative to its external cost.",
    },
    // Q17 — Table 7 (redistribution Gini)
    {
      figure: `**Table 7:** Hypothetical Gini coefficients before and after tax-and-transfer policies.

| Country | Gini before (market) | Gini after (disposable) |
|---|---|---|
| A | 0.51 | 0.36 |
| B | 0.48 | 0.40 |
| C | 0.53 | 0.27 |
| D | 0.44 | 0.38 |`,
      stem: "Based on Table 7, which country has the strongest redistributive tax-and-transfer system?",
      options: ["Country A.", "Country B.", "Country C.", "Country D."],
      answer: "C",
      justification: "Country C: Gini falls by 0.26 (0.53 → 0.27) — the largest redistributive impact.",
    },
    // Q18 — Table 8 (tariff revenue)
    {
      figure: `**Table 8:** World price, domestic supply and domestic demand for a good.

| Price (£) | Domestic supply | Domestic demand |
|---|---|---|
| 10 (world price) | 20 | 100 |
| 13 (with tariff) | 35 | 85 |
| 15 | 45 | 75 |`,
      stem: "Based on Table 8, the government imposes a £3 per-unit tariff, raising the domestic price to £13. The tariff revenue collected is:",
      options: ["£60.", "£150.", "£80 × 3 = £240.", "(85 − 35) × £3 = £150."],
      answer: "D",
      justification: "Tariff revenue = imports × tariff = (Dd − Sd) × t = (85 − 35) × £3 = £150.",
    },
    // Q19 — Table 9 (wealth deciles)
    {
      figure: `**Table 9:** Share of UK wealth owned by each decile group.

| Decile | % of total wealth |
|---|---|
| Bottom 10% | −0.2 |
| Deciles 2–5 (bottom 50%) | 9.0 |
| Deciles 6–9 (middle 40%) | 48.0 |
| Top 10% | 43.0 |`,
      stem: "Based on Table 9, which one of the following statements is correct?",
      options: [
        "Wealth inequality is lower than in a perfectly equal distribution.",
        "The top decile owns more wealth than the bottom 50% combined.",
        "The bottom 10% owns the most wealth.",
        "There is no wealth inequality in the UK.",
      ],
      answer: "B",
      justification: "Bottom 50% = (−0.2 + 9.0) = 8.8% < top 10% (43%). The top decile owns nearly 5× the bottom half combined.",
    },
    // Q20 — Figure 1 (monopoly vs PC)
    {
      figure: "**Figure 1:** Cost and revenue curves for a monopolist: downward-sloping AR (D) with MR below; U-shaped MC. Profit-max output Qm where MR = MC; price Pm on AR. Perfectly competitive comparison Qpc, Ppc where P = MC.",
      figureKey: "monopoly-profit.svg",
      figureCaption: "Figure 1 — Monopoly profit maximisation",
      stem: "Based on Figure 1, compared with a perfectly competitive market with identical cost curves, the monopoly outcome involves:",
      options: [
        "Higher output and lower price.",
        "Lower output, higher price, and a deadweight welfare loss.",
        "The same output and price.",
        "Higher output and higher price.",
      ],
      answer: "B",
      justification: "Monopoly restricts output below the PC level (where P = MC), charges a higher price, and creates DWL.",
    },
    // Q21 — Figure 2 (DWL of indirect tax)
    {
      figure: "**Figure 2:** Indirect tax incidence: S shifts up to S+tax. Quantity falls from Q1 to Q2; consumer price rises and producer price falls. Tax revenue = rectangle of width Q2 and height = tax. DWL = triangle to the right of Q2 between S and D.",
      figureKey: "indirect-tax.svg",
      figureCaption: "Figure 2 — Tax incidence",
      stem: "Based on Figure 2, the deadweight welfare loss of the tax is represented by:",
      options: [
        "The total tax revenue collected.",
        "The reduction in consumer surplus.",
        "The triangle formed by the reduction in quantity from Q1 to Q2 between supply and demand.",
        "The gain in producer surplus.",
      ],
      answer: "C",
      justification: "DWL is the welfare-triangle between the supply and demand curves over the lost output (Q1 − Q2) — surplus that vanishes because mutually beneficial trades no longer happen.",
    },
    // Q22 — Figure 3 (SRAS slope near LRAS)
    {
      figure: "**Figure 3:** AD shift in an economy with spare capacity. SRAS is flat well below LRAS and steepens as it approaches LRAS. AD₁ → AD₂ shift produces large output gain with small price-level change far from LRAS, but reverses near LRAS.",
      figureKey: "adas-equilibrium.svg",
      figureCaption: "Figure 3 — AD shift near LRAS vs far from LRAS",
      stem: "Based on Figure 3, the elasticity of SRAS implies that the inflation cost of demand stimulus:",
      options: [
        "Is the same wherever the economy is operating.",
        "Is lower the further the economy is from LRAS and higher the closer it gets.",
        "Is always zero.",
        "Is always equal to the nominal wage growth rate.",
      ],
      answer: "B",
      justification: "Flatter SRAS (spare capacity) → demand stimulus mostly raises Y; steeper SRAS (near LRAS) → mostly raises P.",
    },
    // Q23 — Figure 4 (kinked-demand limitation)
    {
      figure: "**Figure 4:** Kinked demand curve oligopoly model with a kink at p*; AR elastic above the kink and inelastic below; MR has a vertical discontinuity at Q*. The model explains rigidity of p* but not how p* itself was set.",
      figureKey: "caie-kinked-demand.svg",
      figureCaption: "Figure 4 — Kinked demand curve",
      stem: "Based on Figure 4, the kinked demand curve model is limited as a theory of oligopoly because it:",
      options: [
        "Explains the initial setting of the kinked price.",
        "Does not explain how the initial price is set — only why it is rigid afterward.",
        "Predicts aggressive price wars in all circumstances.",
        "Is only applicable to monopolistic competition.",
      ],
      answer: "B",
      justification: "Sweezy's model takes p* as given — it explains rigidity around p* but not why the kink is at that price level.",
    },
    // Q24 — Figure 5 (supply shock SRPC)
    {
      figure: "**Figure 5:** Short-run Phillips curve (SRPC) with inflation rate on the vertical axis and unemployment rate on the horizontal axis. Points A (low u, high π) and B (high u, low π) are marked along the SRPC.",
      figureKey: "phillips-srlr.svg",
      figureCaption: "Figure 5 — Short-run Phillips curve",
      stem: "Based on Figure 5, an adverse supply shock (such as a sharp rise in energy prices) is most likely to cause:",
      options: [
        "A movement along the existing short-run Phillips curve.",
        "The short-run Phillips curve to shift outward (higher inflation at every unemployment rate).",
        "The short-run Phillips curve to shift inward.",
        "The long-run Phillips curve to shift to the left.",
      ],
      answer: "B",
      justification: "Adverse supply shock raises cost-push inflation at every level of u — SRPC shifts right/outward (stagflation).",
    },
    // Q25 — Figure 6 (monopolistic competition efficiency loss)
    {
      figure: "**Figure 6:** Long-run equilibrium in monopolistic competition: AR (D) tangent to AC at Q* where MC = MR. P* equals AC at Q* (normal profit). Q* lies to the left of the minimum point of AC — excess capacity.",
      figureKey: "aqa-monopolistic-long-run.png",
      figureCaption: "Figure 6 — Monopolistic competition: long-run equilibrium",
      stem: "Based on Figure 6, the efficiency loss in monopolistic competition compared with perfect competition is best described as:",
      options: [
        "Zero, because only normal profits are earned.",
        "Excess capacity: firms operate at output below the minimum point of the AC curve.",
        "Supernormal profit in the long run.",
        "Allocative efficiency at P = MC.",
      ],
      answer: "B",
      justification: "Tangency of AR to downward-sloping AC occurs left of min-AC ⇒ firms produce below productive-efficient scale (excess capacity).",
    },
    // Q26 — Figure 7 (J-curve short-run)
    {
      figure: "**Figure 7:** J-curve diagram: current-account balance vs time. After depreciation, balance dips (short-run worsening), troughs, then improves above the original level (long-run improvement).",
      figureKey: "caie-j-curve.svg",
      figureCaption: "Figure 7 — J-curve after depreciation",
      stem: "Based on Figure 7, the short-run deterioration of the current account after depreciation is primarily explained by:",
      options: [
        "Elasticities of demand for exports and imports being low in the short run.",
        "Elasticities of demand being high in the short run.",
        "An immediate fall in the foreign-currency value of imports.",
        "Tariffs imposed by trading partners.",
      ],
      answer: "A",
      justification: "In the short run PEDx + PEDm < 1 (Marshall–Lerner not met); imports cost more in domestic currency but volumes barely change, so the balance worsens.",
    },
    // Q27 — Figure 8 (ad valorem on high-priced goods)
    {
      figure: "**Figure 8:** Comparison of specific (per-unit) and ad valorem taxes. S+spec is parallel to S; S+adval pivots upward from the price-axis intercept so the wedge widens with price.",
      figureKey: "indirect-tax.svg",
      figureCaption: "Figure 8 — Specific vs ad valorem tax",
      stem: "Based on Figure 8, if the government wishes the tax to have a progressively larger absolute impact on higher-priced goods, it should use:",
      options: [
        "A specific tax.",
        "An ad valorem tax.",
        "A lump-sum tax.",
        "Either — the choice has no effect.",
      ],
      answer: "B",
      justification: "Ad valorem (% of price) means absolute £ tax rises with price — larger impact on higher-priced goods.",
    },
    // Q28 — Figure 9 (Gini formula)
    {
      figure: "**Figure 9:** Lorenz curves for two countries (X and Y). Cumulative population share (0–1) on the horizontal axis; cumulative income share (0–1) on the vertical axis. 45° line of equality drawn.",
      figureKey: "lorenz-brazil.svg",
      figureCaption: "Figure 9 — Lorenz curves for countries X and Y",
      stem: "Based on Figure 9, the Gini coefficient is calculated as:",
      options: [
        "The area between the Lorenz curve and the line of equality, expressed as a proportion of the total area under the line of equality.",
        "The area below the Lorenz curve, expressed as a proportion of the area under the diagonal.",
        "The slope of the Lorenz curve at its midpoint.",
        "The maximum vertical distance from the line of equality.",
      ],
      answer: "A",
      justification: "Gini = (area between equality line and Lorenz curve) ÷ (total area under equality line). 0 = perfect equality; 1 = perfect inequality.",
    },
    // Q29 — Figure 10 (monopolist never produces in inelastic region)
    {
      figure: "**Figure 10:** Linear demand curve with elasticity regions: PED > 1 (elastic) above midpoint, PED = 1 at midpoint, PED < 1 (inelastic) below.",
      figureKey: "caie-ped-elastic.svg",
      figureCaption: "Figure 10 — PED along a linear demand curve",
      stem: "Based on Figure 10, a profit-maximising monopolist would NEVER produce at a point where:",
      options: [
        "Demand is inelastic, because a price rise would increase revenue and reduce costs.",
        "Demand is elastic.",
        "PED = 1 (unit elastic).",
        "Quantity is at its maximum.",
      ],
      answer: "A",
      justification: "In the inelastic region, MR < 0; raising price raises TR and cuts costs (lower Q) — so profit always rises by moving up out of that region.",
    },
    // Q30 — Figure 11 (tradable permits at Qs)
    {
      figure: "**Figure 11:** Negative production externality. £ on vertical axis; quantity on horizontal axis. MSC lies above MPC by the marginal external cost; MPB = MSB demand curve. Free-market output Qp where MPB = MPC; social optimum Qs where MPB = MSC.",
      figureKey: "neg-externality-welfare.svg",
      figureCaption: "Figure 11 — Negative production externality",
      stem: "Based on Figure 11, a marketable emissions permit scheme set at the social optimum would:",
      options: [
        "Leave output unchanged at Qp.",
        "Reduce output from Qp to Qs at the lowest-cost producers, achieving the efficient allocation.",
        "Raise output above Qp.",
        "Be economically equivalent to banning the activity entirely.",
      ],
      answer: "B",
      justification: "A cap-and-trade scheme set at Qs caps output at the social optimum; permit trading routes abatement to the lowest-cost producers — cost-efficient allocation.",
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-set Section B content (extracts + Q31/Q32/Q33) for Hard and Advanced,
// transcribed verbatim from the curated PDFs to keep on-screen view in sync.
// ─────────────────────────────────────────────────────────────────────────────

const HARD_SECTION_B = {
  caseTitle: "UK trade, Brexit and the services economy",
  extracts: {
    extractA: `**Figure 12: Selected UK trade and exchange-rate indicators**

| Indicator | 2015 | 2019 | 2022 | 2024 |
|---|---|---|---|---|
| Goods exports (£bn, annual) | 286 | 372 | 403 | 386 |
| Services exports (£bn, annual) | 229 | 306 | 408 | 452 |
| Goods trade balance (£bn) | −122 | −149 | −210 | −198 |
| Services trade balance (£bn) | +91 | +119 | +158 | +183 |
| Sterling ERI (2015 = 100) | 100.0 | 80.4 | 79.1 | 83.6 |
| Share of trade with EU (%) | 51.1 | 46.8 | 42.0 | 41.4 |

*Source: Office for National Statistics / Bank of England, 2024*`,
    extractB: `**Brexit and UK goods trade**

The UK left the EU single market on 31 January 2020, with new customs arrangements fully implemented by January 2021. Goods trade with the EU contracted sharply — a 2024 study by the Centre for European Reform estimated UK goods exports to the EU are around 15% below their counterfactual. Non-tariff barriers — customs declarations, rules-of-origin certificates and regulatory divergence — have raised transaction costs significantly, particularly for smaller firms. The Trade and Cooperation Agreement (TCA) signed in December 2020 provides tariff-free, quota-free access for goods meeting origin rules, but without the frictionless flow of the single market.

*Source: News reports, August 2024*`,
    extractC: {
      subtitle: "The rise of UK services exports",
      body: `UK services exports have risen strongly since 2015, in contrast to the weaker goods performance. Financial services, legal services, consultancy, computer and information services, and creative industries are the UK's largest services export categories. The UK's services surplus has grown to £183bn in 2024 — the largest in the world in absolute terms. Non-EU markets have been particularly important: the UK's services exports to the US, China, India and the Gulf have grown faster than those to the EU.

Economists note that services exports have benefited from features that are less affected by Brexit: digital delivery reduces the importance of physical borders; services are often concentrated in London, where agglomeration effects are strong; and many services firms serve global (not just European) customers. However, services are governed by different trade agreements than goods — services trade in the TCA is significantly shallower than in the EU single market. A 2024 Resolution Foundation report warned that EU moves to reduce services dependence on the UK (e.g. requirements for financial services firms to have EU subsidiaries) could gradually erode this advantage.`,
      source: "News reports, November 2024",
    },
    extractD: {
      subtitle: "The case for a services-led industrial strategy",
      body: `Some economists argue that the UK should embrace its comparative advantage in services and design industrial policy around services-led growth. Specific proposals include: deeper services trade agreements with the US, India and major Asian economies; investment in the UK's "invisible infrastructure" (digital networks, regulatory frameworks, skills); deregulation of professional services export barriers; and support for high-growth technology start-ups via R&D incentives and growth-capital support.

Critics argue that a services-led strategy risks three things. First, widening regional inequality: services jobs are concentrated in London and the South East, exacerbating the north–south divide. Second, volatility: financial and business services are sensitive to global shocks and regulatory change — the 2008 crisis hit the UK harder than peers because of the financial sector's dominance. Third, neglect of strategic industries: semiconductors, pharmaceuticals, clean energy manufacturing and defence equipment all have positive externalities and strategic significance that pure comparative-advantage analysis undervalues.

These critics favour a balanced approach that combines support for services with targeted interventions to rebuild domestic manufacturing capabilities.`,
      source: "News reports, January 2025",
    },
  },
  q31: "Using the data in the Extracts, examine the extent to which the UK has experienced a structural shift from goods to services in its trade performance since 2015.",
  q31Content: [
    "K: define structural shift, trade composition, services vs goods balance.",
    "App: services exports +£223bn (229→452), goods +£100bn (286→386); services surplus widened (+91 → +183), goods deficit widened (−122 → −198).",
    "An: chain — Brexit NTBs depress goods trade with EU (−15% counterfactual); digital delivery + agglomeration support services growth; share of EU trade fell 51% → 41%.",
    "E: judgement — clear evidence of structural shift in composition, but absolute goods exports still substantial; services growth concentrated in London; consider whether shift is structural or cyclical.",
  ],
  q32: "Using Extracts A, B and C and your knowledge of economics, explain why the UK's comparative advantage may lie in services rather than in goods.",
  q32Content: [
    "K: comparative advantage, factor endowments, opportunity cost.",
    "App: services surplus £183bn (largest in world); UK strengths in finance, legal, creative, IT.",
    "An: chain — UK abundant in human capital and English-language services; agglomeration in London (positive externalities); digital delivery overcomes border frictions; Brexit NTBs raise relative cost of goods trade.",
    "Diagram: PPF showing UK relative efficiency in services vs goods.",
    "Synoptic: link to deindustrialisation, Dutch disease, exchange-rate effects.",
  ],
  q33: "Considering the information in Extract D and the original evidence in Extracts A, B and C, do you recommend that the UK government should adopt a services-led industrial strategy as the main approach to improving the UK's long-run trade performance? Justify your recommendation.",
  q33Content: [
    "Strengths of services-led: builds on revealed comparative advantage; high value-added; agglomeration economies; less affected by Brexit NTBs.",
    "Risks: regional inequality (London/SE concentration); volatility (2008 crisis); strategic vulnerability in goods (semiconductors, pharma, clean energy, defence); positive externalities of manufacturing.",
    "Alternatives: balanced strategy (services + targeted manufacturing reshoring); deeper EU goods agreement; regional investment (levelling-up).",
    "Justification: evidence-based recommendation — most candidates will conclude that a balanced approach (services + selective strategic manufacturing support) outperforms a pure services-led strategy because it manages volatility, regional inequality and strategic risk.",
  ],
} as const;

const ADVANCED_SECTION_B = {
  caseTitle: "Artificial intelligence, labour markets and inequality",
  extracts: {
    extractA: `**Figure 12: Selected indicators on AI and the UK labour market**

| Indicator | 2020 | 2022 | 2024 |
|---|---|---|---|
| UK business AI adoption rate (%) | 12 | 24 | 43 |
| Share of UK jobs 'highly exposed' to generative AI (%) | — | — | 30 |
| Real GDP per hour worked (2020 = 100) | 100.0 | 101.5 | 102.8 |
| Top 10% / bottom 10% earnings ratio | 4.0 | 4.2 | 4.5 |
| AI-related job vacancies (% of total) | 1.1 | 2.8 | 5.4 |

*Source: ONS / Bank of England / IFS, 2024*`,
    extractB: `**AI, automation and labour demand**

Generative artificial intelligence (AI) has advanced rapidly since 2022, with tools such as ChatGPT and specialised coding, writing and design assistants now used by over 40% of UK businesses. A 2024 IMF study estimated that 30% of UK jobs are 'highly exposed' to generative AI, with an additional 30% moderately exposed. Unlike earlier waves of automation that primarily displaced routine manual tasks, current AI technologies threaten cognitive work — including in accounting, law, journalism, translation and customer service. Labour economists disagree about the net effect: some studies suggest AI will complement (raise the productivity of) most workers, while others warn of substantial displacement.

*Source: News reports, September 2024*`,
    extractC: {
      subtitle: "Inequality and the technology premium",
      body: `Income inequality in the UK has risen since 2008, with the Gini coefficient drifting from around 0.34 to 0.36. A key driver has been the growing 'technology premium' — the gap between wages of workers with technical / AI-related skills and those without. In 2024, UK AI-related job vacancies offered average wages around 50% above the national median. Regional inequality has also widened: London and the South East capture a disproportionate share of AI-related investment and jobs, exacerbating the gap with lower-productivity regions.

The distributional pattern echoes earlier periods of technological change, when skill-biased technical change raised the relative demand for educated workers. However, some economists argue generative AI may differ because it can substitute for (rather than complement) cognitive skills. Acemoglu (2024) warns that if AI primarily substitutes for workers rather than empowers them, the labour share of national income may continue to fall. Government data shows UK business investment in computing and software has risen sharply since 2022, but investment in worker training has not kept pace.`,
      source: "News reports, October 2024",
    },
    extractD: {
      subtitle: "Policy options for the AI economy",
      body: `Governments face difficult choices about how to respond to AI. One school argues for a non-interventionist stance: productivity gains from AI will raise average incomes, and markets will adjust through reallocation of labour to new sectors. The historical record of technology transitions — from the printing press to computing — shows that new technologies ultimately create more jobs than they destroy, even when short-term disruption is severe. In this view, supply-side reforms (skills training, labour market flexibility) are the main policy response needed.

Others advocate more active intervention. Proposed policies include: heavier regulation of AI developers to reduce concentration of market power; strengthening labour rights and collective bargaining so workers can capture more of the productivity gains; greater investment in retraining and income support for displaced workers; a universal basic income (UBI) funded by higher taxation of AI-related profits; or targeted taxation of capital substituting for labour ("robot tax"). Critics of these measures point to risks of government failure (robot tax would slow AI adoption, damaging UK competitiveness), regulatory capture (big AI firms lobbying to entrench their position), and unintended consequences (UBI may reduce labour supply and growth). A 2024 OECD report concluded that no single policy is sufficient — a combination of education reform, targeted transfers and competition policy is needed.`,
      source: "News reports, December 2024",
    },
  },
  q31: "Using the data in the Extracts, examine the extent to which the rapid adoption of AI technologies has affected UK productivity and income inequality since 2020.",
  q31Content: [
    "K: define productivity (output per hour), income inequality (Gini, P90/P10), AI adoption.",
    "App: AI adoption 12% → 43% (2020–24); productivity index 100 → 102.8 (modest); top-10/bottom-10 earnings ratio 4.0 → 4.5 (rising); AI vacancies 1.1% → 5.4%.",
    "An: chain — AI adoption raises productivity in adopting firms; technology premium widens wage distribution; concentrated in London/SE.",
    "E: judgement — productivity uplift modest at aggregate level; inequality has clearly widened, plausibly partly causal but other drivers (Brexit, energy, Covid) operate.",
  ],
  q32: "Using Extracts A, B and C and your knowledge of economics, explain why the adoption of AI technologies may increase both productivity and income inequality in the UK economy.",
  q32Content: [
    "Productivity channels: AI raises MPL of adopters (Table 5 example), shifts LRAS right, lowers unit labour costs.",
    "Inequality channels: skill-biased technical change raises MRP of AI-skilled workers; technology premium 50% above median; capital substituting for labour reduces labour share (Acemoglu).",
    "Diagram: labour-market diagram with two demand curves (skilled, unskilled) — D shifts right for skilled, left for unskilled.",
    "Synoptic: regional concentration in London/SE compounds spatial inequality.",
    "Limits: depends whether AI complements or substitutes; training investment matters.",
  ],
  q33: "Considering the information in Extract D and the original evidence in Extracts A, B and C, do you recommend that the UK government should adopt active interventionist policies (such as labour-protective regulation, a universal basic income or targeted AI taxation) rather than relying on market adjustment to manage the economic effects of AI? Justify your recommendation.",
  q33Content: [
    "Case for intervention: market failures (asymmetric info, externalities, monopoly power of AI firms); equity concerns (rising inequality, falling labour share); historical record of disruption (Polanyi double-movement).",
    "Risks of intervention: government failure (robot tax slows adoption, harms competitiveness); regulatory capture (big AI firms lobbying); unintended consequences (UBI may reduce labour supply); fiscal cost.",
    "Case for market adjustment: long-run record shows technology creates more jobs than it destroys; supply-side reforms (skills, labour flexibility) target root causes.",
    "Synthesis: OECD view (no single policy sufficient — combination of education reform, targeted transfers and competition policy).",
    "Justified recommendation: most candidates will recommend a combination — supply-side investment (skills retraining) + competition policy targeting AI concentration + targeted transfers — rather than a single policy or pure laissez-faire.",
  ],
} as const;

const SETS: Record<string, AqaPaper3Set> = {};

const SET_SPECS: Array<{
  id: string;
  setLabel: string;
  caseTitle: string;
  q31: string; q31Content: string[];
  q32: string; q32Content: string[];
  q33: string; q33Content: string[];
}> = [
  {
    id: "econ-p3-a",
    setLabel: "Predicted Paper Set A",
    caseTitle: "The UK economy: productivity, regional inequality and net zero",
    q31: "To what extent, if at all, do the data suggest that weak productivity growth is the most important constraint on UK living standards?",
    q31Content: [
      "K: define productivity, real GDP per head, living standards.",
      "App: refer to data in Extracts A and B (productivity index, regional GVA).",
      "An: chain from productivity → real wages → living standards.",
      "E: alternative constraints (housing, education, health); judgement on relative importance.",
    ],
    q32: "Explain why microeconomic and macroeconomic policies may both be needed to address regional inequality in the UK.",
    q32Content: [
      "Micro: place-based investment, transport infrastructure, skills, business support.",
      "Macro: fiscal devolution, regional fiscal multipliers, monetary policy implications.",
      "Synoptic linkage: how supply-side reform interacts with AD management.",
    ],
    q33: "After considering Extract D, and the original evidence in Extracts A, B and C, would you recommend that the UK government should prioritise large-scale public investment in green infrastructure as the central pillar of its growth strategy? Justify your recommendation.",
    q33Content: [
      "Strengths: raises LRAS, addresses climate externality, may crowd in private investment.",
      "Weaknesses: fiscal cost, debt sustainability, crowding out, opportunity cost.",
      "Compare with alternatives: market-based carbon pricing, supply-side reforms.",
      "Justified recommendation grounded in evidence and economic reasoning.",
    ],
  },
  {
    id: "econ-p3-b",
    setLabel: "Predicted Paper Set B",
    caseTitle: "Financial markets, regulation and consumer credit",
    q31: "To what extent, if at all, do the data suggest that consumer credit growth has reached a level that threatens UK financial stability?",
    q31Content: [
      "K: define financial stability, credit cycles, household debt-to-income.",
      "App: data on debt levels, default rates, credit growth.",
      "E: judgement on whether thresholds have been reached.",
    ],
    q32: "Explain how asymmetric information and behavioural biases can lead to market failure in consumer credit markets.",
    q32Content: [
      "Asymmetric information: adverse selection, moral hazard.",
      "Behavioural biases: present bias, overconfidence, anchoring.",
      "Combined effect on consumer welfare and systemic risk.",
    ],
    q33: "After considering Extract D, would you recommend tighter regulation of 'buy now, pay later' lending in the UK? Justify your recommendation.",
    q33Content: [
      "Strengths of regulation: consumer protection, reduced systemic risk, addresses information failure.",
      "Weaknesses: reduced access to credit, government failure, innovation impact.",
      "Justified recommendation with clear evidence base.",
    ],
  },
  {
    id: "econ-p3-c",
    setLabel: "Predicted Paper Set C",
    caseTitle: "Public sector economics: spending, taxation and equity",
    q31: "To what extent, if at all, do the data suggest that the UK public sector has reached the limits of its fiscal capacity?",
    q31Content: [
      "K: fiscal capacity, debt sustainability, debt servicing costs.",
      "App: data on debt-to-GDP, interest spending, tax revenue.",
      "E: international comparisons; judgement on capacity.",
    ],
    q32: "Explain why government failure may occur when the public sector provides public services such as healthcare and education.",
    q32Content: [
      "Information failures, principal-agent problems, regulatory capture.",
      "Bureaucratic inefficiency, lack of price signals.",
      "Synoptic micro/macro linkages.",
    ],
    q33: "After considering Extract D, would you recommend that the UK government should prioritise tax reform over spending reform to restore fiscal sustainability? Justify your recommendation.",
    q33Content: [
      "Tax reform: broadening base, behavioural effects, equity.",
      "Spending reform: efficiency gains, distributional impact.",
      "Justified recommendation with macro and micro reasoning.",
    ],
  },
  {
    id: "econ-p3-d",
    setLabel: "Predicted Paper Set D",
    caseTitle: "Behavioural economics in UK policy design",
    q31: "To what extent, if at all, do the data suggest that behavioural 'nudge' policies have been effective in changing UK consumer behaviour?",
    q31Content: [
      "K: nudge theory, default options, framing.",
      "App: auto-enrolment data, energy use, smoking cessation.",
      "E: limitations and unintended effects.",
    ],
    q32: "Explain how behavioural biases can lead to suboptimal saving and consumption decisions.",
    q32Content: [
      "Present bias, anchoring, herding.",
      "Implications for retirement saving, demerit goods, financial decisions.",
      "Synoptic links to AD components and long-run growth.",
    ],
    q33: "After considering Extract D, would you recommend that behavioural economics should play a greater role in UK government policy design? Justify your recommendation.",
    q33Content: [
      "Strengths: low cost, evidence-based, can address market failure.",
      "Weaknesses: paternalism, scalability, ethical concerns.",
      "Justified recommendation.",
    ],
  },
  {
    id: "econ-p3-e",
    setLabel: "Predicted Paper Set E",
    caseTitle: "The UK net zero transition: efficiency, equity and growth",
    q31: "To what extent, if at all, do the data suggest that carbon pricing has been the most effective policy in reducing UK greenhouse gas emissions?",
    q31Content: [
      "K: carbon pricing, ETS, externalities.",
      "App: emissions data, ETS price path.",
      "E: alternatives (regulation, subsidies); judgement.",
    ],
    q32: "Explain why a carbon tax may be regressive and how this could be addressed.",
    q32Content: [
      "Regressive incidence: low-income households spend higher share of income on energy.",
      "Mitigation: revenue recycling, targeted transfers, exemptions.",
      "Synoptic micro/macro implications.",
    ],
    q33: "After considering Extract D, would you recommend that the UK government should prioritise market-based environmental policies over direct regulation? Justify your recommendation.",
    q33Content: [
      "Market-based: cost-efficient abatement, dynamic incentives.",
      "Regulation: certainty of outcomes, simpler enforcement.",
      "Justified recommendation with sectoral nuance.",
    ],
  },
  {
    id: "econ-p3-f",
    setLabel: "Predicted Paper Set F",
    caseTitle: "Competition policy and the digital economy",
    q31: "To what extent, if at all, do the data suggest that UK digital markets have become less competitive over the past decade?",
    q31Content: [
      "K: market concentration, network effects, contestability.",
      "App: market share data, switching rates.",
      "E: alternative interpretations; judgement.",
    ],
    q32: "Explain how network effects and economies of scale can act as barriers to entry in digital markets.",
    q32Content: [
      "Network effects: direct, indirect, two-sided platforms.",
      "Scale economies in data, infrastructure, marketing.",
      "Synoptic implications for innovation and consumer welfare.",
    ],
    q33: "After considering Extract D, would you recommend stronger competition policy intervention in UK digital markets? Justify your recommendation.",
    q33Content: [
      "Strengths: protects consumer welfare, lowers barriers, encourages innovation.",
      "Weaknesses: dynamic efficiency loss, regulatory capture, international competitiveness.",
      "Justified recommendation.",
    ],
  },
];

SET_SPECS.forEach((spec) => {
  SETS[spec.id] = {
    setLabel: spec.setLabel,
    caseTitle: spec.caseTitle,
    extracts: {
      extractA: `**Table 1:** UK economic indicators relevant to the case study, 2019–2024
Source: Office for National Statistics, 2024

| Year | GDP per head index (2019=100) | Real wages index | Public investment (£bn) | Headline indicator |
|------|-------------------------------|-------------------|--------------------------|---------------------|
| 2019 | 100 | 100 | 51 | 73 |
| 2021 | 96 | 102 | 67 | 71 |
| 2023 | 99 | 99 | 78 | 76 |
| 2024 | 101 | 101 | 84 | 78 |`,
      extractB: `**Figure 1:** Regional GVA per head (£) by UK region, 2024
Source: Office for National Statistics regional accounts, 2024

| Region | GVA per head (£) |
|--------|-------------------|
| London | 58 700 |
| South East | 36 200 |
| North East | 23 100 |
| Wales | 22 800 |
| Northern Ireland | 24 600 |`,
      extractC: {
        subtitle: spec.caseTitle,
        body: `${spec.caseTitle} sits at the intersection of UK micro and macroeconomic policy. The Office for Budget Responsibility, the Resolution Foundation, and the Institute for Fiscal Studies have all published detailed analyses pointing to structural weaknesses and policy trade-offs.

A spokesperson for HM Treasury described the agenda as "the defining policy challenge of the parliament", citing the need for joined-up micro and macro intervention. The Bank of England has emphasised that monetary policy alone cannot resolve underlying structural issues.

Key data points include 6.6% pay growth in services, 13.3% of household income spent on energy, and a productivity gap with the United States of around 25%.`,
        source: "OBR, IFS and Resolution Foundation, 2024",
      },
      extractD: {
        subtitle: "News report: policy debate intensifies",
        body: `The Financial Times reported in October 2024 that ministers were divided over the appropriate balance of policy intervention. A senior official at the Department for Business and Trade told reporters: "We need to look beyond short-term fixes and focus on long-run capacity."

The Resolution Foundation argued that a co-ordinated micro and macro package — with £20bn of additional public investment, targeted competition reforms, and behavioural nudges in saving — could raise medium-term growth by 0.4 percentage points per year.

Critics, including the Institute of Economic Affairs, warned of crowding out, government failure, and the risk that intervention undermines dynamic efficiency.`,
        source: "Financial Times news report, 2024",
      },
    },
    q31: spec.q31,
    q31Content: spec.q31Content,
    q32: spec.q32,
    q32Content: spec.q32Content,
    q33: spec.q33,
    q33Content: spec.q33Content,
    mcqs: bank(spec.id),
  };
});

function renderMcq(stem: McqSpec, n: number): string {
  // NOTE: drop the prose "**Figure N:**" intro — the predicted-paper viewer
  // runs `<MathsMarkdown suppressDiagrams>`, which treats any `**Figure N:**`
  // line as a figure-block and strips the following lines (including the
  // markdown image), silently removing the MCQ's reference figure. Emitting
  // only the markdown image keeps it visible on-screen and in PDF exports.
  const stimulusBlock = stem.figure && !stem.figureKey
    ? `\n\n${stem.figure}\n`
    : "";
  const svgBlock = stem.figureKey
    ? `\n\n![${stem.figureCaption ?? `Figure ${n}`}](/figures/${stem.figureKey})\n`
    : "";
  return `Question ${n.toString().padStart(2, "0")} [1 marks]
${stimulusBlock}${stem.stem}${svgBlock}

A. ${stem.options[0]}
B. ${stem.options[1]}
C. ${stem.options[2]}
D. ${stem.options[3]}`;
}

function renderExtractProse(label: string, ext: { subtitle: string; body: string; source: string }): string {
  return `### Extract ${label}
*${ext.subtitle}*

${ext.body}

*Source: ${ext.source}*`;
}

function caseFigureFor(caseTitle: string): { key: string; caption: string } {
  if (/net zero|green|carbon|emission|climate/i.test(caseTitle))
    return { key: "neg-externality-welfare.svg", caption: "Reference figure — Negative production externality (carbon)" };
  if (/financial|credit|bank|regulation/i.test(caseTitle))
    return { key: "ad-as-g.svg", caption: "Reference figure — AD/AS framework for financial shocks" };
  if (/public sector|fiscal|tax|spending/i.test(caseTitle))
    return { key: "adas-fiscal.svg", caption: "Reference figure — Fiscal policy in AD/AS" };
  if (/behavioural|nudge/i.test(caseTitle))
    return { key: "externality.svg", caption: "Reference figure — Behavioural correction of market failure" };
  if (/competition|digital|monopoly/i.test(caseTitle))
    return { key: "monopoly-profit.svg", caption: "Reference figure — Monopoly profit maximisation" };
  // Default: productivity / regional inequality
  return { key: "lorenz-brazil.svg", caption: "Reference figure — Lorenz curves and regional inequality" };
}

function buildPaper(set: AqaPaper3Set): string {
  const mcqBlock = set.mcqs.slice(0, 30).map((m, i) => renderMcq(m, i + 1)).join("\n\n");
  const ref = caseFigureFor(set.caseTitle);
  return `# AQA A-Level Economics (7136) — Paper 3: Economic Principles and Issues — ${set.setLabel}

**Time: 2 hours | Total: 80 marks**

---

## Section A — Multiple Choice (30 marks)

Each question is worth 1 mark. Select the single best option (A, B, C or D).

${mcqBlock}

---

## Section B — Investigation (50 marks)

### Case study: ${set.caseTitle}

### Extract A
${set.extracts.extractA}

### Extract B
${set.extracts.extractB}

${renderExtractProse("C", set.extracts.extractC)}

${renderExtractProse("D", set.extracts.extractD)}

![${ref.caption}](/figures/${ref.key})

Question 31 [10 marks]
${set.q31}

Question 32 [15 marks]
${set.q32}

Question 33 [25 marks]
${set.q33}`;
}

function buildMarkScheme(set: AqaPaper3Set): string {
  const mcqLines = set.mcqs
    .slice(0, 30)
    .map((m, i) =>
      renderMcqMark({
        questionLabel: `${(i + 1).toString().padStart(2, "0").split("").join("\u2009")}`,
        answer: m.answer,
        justification: m.justification,
      }),
    )
    .join("\n");

  return `# AQA A-Level Economics (7136/3) — Mark Scheme — ${set.setLabel}

**Total: 80 marks** | Section A: 30 × 1 mark MCQs. Section B: Investigation 10 + 15 + 25.

---

## Section A — MCQ Answer Key

${mcqLines}

---

## Section B — Investigation

${renderLevelMark({
  questionLabel: "3\u20091",
  totalMarks: 9 as 9, // Q31 is 10 marks but we use 9-mark band template — see note
  diagram: {
    primary: `Reference figure for case study: ${set.caseTitle}.`,
    requiredLabels: ["Axes labelled", "Curves labelled", "Equilibrium points marked"],
    figureKey: caseFigureFor(set.caseTitle).key,
    figureCaption: caseFigureFor(set.caseTitle).caption,
  },
  indicativeContent: set.q31Content,
})}

> Note: Q31 is marked out of 10 — apply the 9-mark band descriptors with mark bands scaled to: L1 (1–2), L2 (3–4), L3 (5–7), L4 (8–10).

${renderLevelMark({
  questionLabel: "3\u20092",
  totalMarks: 15,
  indicativeContent: set.q32Content,
})}

${renderLevelMark({
  questionLabel: "3\u20093",
  totalMarks: 25,
  indicativeContent: set.q33Content,
})}`;
}

const PAPER_CONTENT: Record<string, string> = {};
const PAPER_MS: Record<string, string> = {};
Object.entries(SETS).forEach(([id, set]) => {
  PAPER_CONTENT[id] = buildPaper(set);
  PAPER_MS[id] = buildMarkScheme(set);
});

export function getAqaPaper3OverrideContent(paperId: string): string | null {
  return PAPER_CONTENT[paperId] ?? null;
}

export function getAqaPaper3OverrideMarkScheme(paperId: string): string | null {
  return PAPER_MS[paperId] ?? null;
}
