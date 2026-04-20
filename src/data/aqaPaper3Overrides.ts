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
      figureKey: "externality.svg",
      figureCaption: "Figure 11 — Negative production externality of palm oil",
      stem: "Based on Figure 11, the deadweight welfare loss from palm-oil production is represented by the triangular area between:",
      options: ["MPC and MPB from 0 to Qp", "MSC and MPB from Qs to Qp", "MSC and MPC from 0 to Qs", "MPB and MSC from 0 to Qp"],
      answer: "B",
      justification: "Between Qs and Qp every unit's marginal social cost (MSC) exceeds marginal social benefit (MPB); the area between those two curves over that range is the deadweight welfare loss.",
    },
  ].map((m) => ({ ...m })) as McqSpec[];
  void setSeed;
}

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
  const svgBlock = stem.figureKey
    ? `\n\n![${stem.figureCaption ?? `Figure ${n}`}](/figures/${stem.figureKey})\n`
    : "";
  return `Question ${n.toString().padStart(2, "0")} [1 marks]
${stem.stem}${svgBlock}

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
