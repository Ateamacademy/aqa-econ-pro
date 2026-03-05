/**
 * Comprehensive past-paper question patterns extracted from AQA Economics (2017–2024),
 * Edexcel GCSE Maths (2017–2024), and AQA GCSE Chemistry (2018–2024) past papers.
 *
 * These patterns are injected into AI generation prompts so the model produces
 * exam-authentic predicted papers that mirror real exam structure and style.
 */

// ─── EDEXCEL GCSE MATHS PAST-PAPER PATTERNS ───────────────────────────

export const MATHS_PAST_PAPER_KNOWLEDGE = `
YOU MUST USE THE FOLLOWING REAL PAST-PAPER PATTERNS FROM EDEXCEL GCSE MATHS (2017–2024) TO GENERATE AUTHENTIC QUESTIONS.

## PAPER STRUCTURE (observed across all years)
- Paper 1: Non-Calculator, 80 marks, 1h30m, ~20–25 questions
- Paper 2: Calculator, 80 marks, 1h30m, ~20–25 questions  
- Paper 3: Calculator, 80 marks, 1h30m, ~20–25 questions
- Questions always numbered 1–25 (approx), increasing difficulty
- First 3–5 questions are 1–2 marks (quick recall/procedure)
- Final 3–5 questions are 4–6 marks (extended reasoning/proof)
- Multi-part questions labelled (a), (b), (c)

## REAL QUESTION PATTERNS BY TOPIC (from 2017–2024 papers)

### Number (appears in every paper)
- June 2024 P1H: "Write 0.00347 in standard form" [1 mark]
- June 2023 P1H: "Work out 3/4 ÷ 2/5" [2 marks]
- June 2022 P2H: "A car costs £18,500. It depreciates by 12% per year. Find its value after 3 years." [3 marks]
- June 2019 P1F: "Put these decimals in order: 0.34, 0.304, 0.043, 0.4" [1 mark]
- Common patterns: HCF/LCM using prime factorisation, standard form arithmetic, reverse percentages, compound interest/depreciation, ratio sharing, bounds

### Algebra (appears in every paper, 15–25 marks)
- June 2024 P1H: "Simplify fully (2x²+5x−3)/(x²−9)" [3 marks]
- June 2023 P1H: "Prove that (n+1)²−(n−1)² is always a multiple of 4" [3 marks]
- June 2022 P1H: "Solve 3x²+7x−2=0 by factorising" [3 marks]
- June 2020 P3H: "Use iteration xₙ₊₁ = √(5+3/xₙ) with x₀=2 to find x₃" [3 marks]
- June 2019 P1H: "Rearrange y = (3x+2)/(x−1) to make x the subject" [4 marks]
- Common patterns: expand and simplify, factorise quadratics, solve simultaneous equations (one linear one quadratic for Higher), algebraic proof, sequences (nth term of linear and quadratic), function notation f(x), composite and inverse functions

### Ratio, Proportion & Rates of Change (5–10 marks per paper)
- June 2024 P2H: "y is directly proportional to √x. When x=16, y=20. Find y when x=100" [3 marks]
- June 2023 P2F: "Share £450 in the ratio 2:3:4" [2 marks]
- June 2022 P3H: "A recipe for 6 people uses 450g flour. How much for 15 people?" [2 marks]
- Common patterns: best value for money (comparing unit prices), recipe scaling, speed/distance/time, direct and inverse proportion, compound measures (pressure, density), percentage change

### Geometry & Measures (15–25 marks per paper — CRITICAL)
- June 2024 P2H: "The diagram shows a frustum formed by removing a small cone of height 4cm from a cone of height 12cm and base radius 9cm. Calculate the volume." [5 marks]
- June 2023 P1H: "Prove that triangle ABC is congruent to triangle DEF. AB=DE=7cm, angle BAC=angle EDF=40°, AC=DF=5cm." [3 marks]
- June 2023 P3H: "A, B, C, D are points on a circle. Angle ABD=38°, angle BDC=52°. Find angle BAC. Give reasons." [4 marks]
- June 2022 P2H: "The diagram shows a right-angled triangle. Calculate angle x using trigonometry." [3 marks]
- June 2019 P2H: "A solid hemisphere has radius 6cm. Calculate the total surface area." [3 marks]
- Common patterns: Pythagoras (including 3D), trigonometry (SOHCAHTOA + sine/cosine rule for Higher), circle theorems, vectors, area and volume of complex shapes, similar shapes (area/volume scale factors), bearings, constructions and loci

### Probability (5–10 marks per paper)
- June 2024 P3H: "A bag contains 5 red and 3 blue balls. Two are drawn without replacement. Find P(both same colour)." [4 marks]
- June 2022 P2H: "The Venn diagram shows sets A and B from 50 students. P(A)=0.4, P(A∩B)=0.14, P(B')=0.5. Complete the Venn diagram." [3 marks]
- June 2019 P2F: "The probability of rain is 0.3. Draw a probability tree for two days." [3 marks]
- Common patterns: tree diagrams (with/without replacement), Venn diagrams (two/three sets), relative frequency, expected outcomes, mutually exclusive and independent events, conditional probability (Higher)

### Statistics (5–15 marks per paper)
- June 2024 P2H: "The table shows grouped data. (a) Complete the cumulative frequency table. (b) Draw the cumulative frequency diagram. (c) Use your diagram to find the median and IQR." [6 marks]
- June 2023 P3H: "The histogram shows times. The bar for 10≤t<20 has frequency density 1.5 and represents 30 people. The bar for 20≤t<25 has frequency density 2.4. Calculate the number of people in the 20≤t<25 class." [3 marks]
- June 2022 P2H: "Compare two box plots showing test scores for Class A and Class B. Compare medians, ranges, and IQR." [3 marks]
- Common patterns: frequency tables (mean from grouped data), cumulative frequency diagrams, box plots, histograms with frequency density, scatter diagrams with line of best fit, moving averages, sampling methods

### Problem Solving / "Show that" (appears in every paper, 8–15 marks)
- June 2024 P1H: "Show that the area of the shaded region is (4π−8)cm²" [5 marks]
- June 2023 P3H: "Batteries are sold in packs. Pack of 4: £1.80, Pack of 8: £3.20, Pack of 12: £6.00. Which is best value?" [3 marks]
- June 2022 P2H: "A cylinder has volume 1200cm³ and height 40cm. It exerts 90N force. Calculate the pressure." [5 marks]
- Common patterns: "show that" algebraic proofs, best buy comparisons, multi-step contextual problems, area left over problems, optimisation

## MARK DISTRIBUTION (typical Higher paper)
- 1-mark questions: 3–5 (quick recall)
- 2-mark questions: 4–6 (one-step problems)
- 3-mark questions: 5–7 (multi-step or explain)
- 4-mark questions: 4–6 (extended calculation/reasoning)
- 5-mark questions: 2–3 (complex multi-step)
- 6-mark questions: 0–1 (proof or investigation)

## MARK DISTRIBUTION (typical Foundation paper)
- 1-mark questions: 5–7
- 2-mark questions: 5–8
- 3-mark questions: 5–7
- 4-mark questions: 3–5
- 5-mark questions: 0–2
`;

// ─── AQA GCSE CHEMISTRY PAST-PAPER PATTERNS ───────────────────────────

export const CHEMISTRY_PAST_PAPER_KNOWLEDGE = `
YOU MUST USE THE FOLLOWING REAL PAST-PAPER PATTERNS FROM AQA GCSE CHEMISTRY (2018–2024) TO GENERATE AUTHENTIC QUESTIONS.
THESE PATTERNS ARE EXTRACTED FROM EVERY AVAILABLE PAST PAPER: June 2018, 2019, 2020 (teacher-assessed), 2021 (mini-paper), 2022, 2023, 2024, AND the Specimen paper.

## PAPER STRUCTURE (observed across ALL years — MUST replicate exactly)
- Paper 1 (8462/1): Topics 1–5, 100 marks, 1h 45m
- Paper 2 (8462/2): Topics 6–10, 100 marks, 1h 45m
- Each paper has Section A (15 multiple-choice, 15 marks) and Section B (structured, ~85 marks)
- Section A: 15 MCQs with A/B/C/D, one correct answer, testing recall and application
- Section B: 8–12 structured questions with sub-parts (01.1, 01.2 format OR 1a, 1b format)
- At least ONE 6-mark extended response per paper (Level of Response marking)
- At least ONE required practical context question per paper
- Questions numbered with decimals or letters: Q01.1, Q01.2 or Q1(a), Q1(b)

## COMPREHENSIVE QUESTION PATTERNS BY TOPIC AND YEAR

### Paper 1 — Topic 1: Atomic Structure & Periodic Table

**June 2024 P1H:**
- MCQ: "Which is the correct electronic structure of oxygen? A. 2,4  B. 2,6  C. 2,8  D. 6,2" [1 mark]
- "A sample of chlorine contains 75.8% Cl-35 and 24.2% Cl-37. Calculate the relative atomic mass. Give your answer to 1 decimal place." [2 marks]
- "Explain why elements in Group 0 are unreactive. Refer to electronic structure." [2 marks]

**June 2023 P1H:**
- "Figure 1 shows the timeline of atomic model development. Describe how and why the nuclear model replaced the plum pudding model. Refer to the alpha particle scattering experiment." [4 marks]
- "Explain why the atomic radius increases going down Group 1." [2 marks]

**June 2022 P1H:**
- "Mendeleev left gaps in his periodic table. Explain why this was important." [2 marks]
- "Compare Newlands' Octaves with Mendeleev's periodic table. Give two differences." [2 marks]

**June 2019 P1H:**
- "An atom of element X has 11 protons, 12 neutrons, and 11 electrons. (a) Give the mass number. (b) Name element X. (c) Explain what happens to the electrons when element X reacts with chlorine." [4 marks]

**June 2018 P1H:**
- "Lithium, sodium, and potassium are in Group 1. Describe the trend in reactivity going down Group 1 and explain it in terms of atomic structure." [6 marks — Level of Response]

**Specimen P1H:**
- "Explain, in terms of electronic structure, why sodium and lithium are in the same group of the periodic table." [2 marks]

**COMMON PATTERNS — Topic 1:**
- RAM calculation from isotope abundances (appears almost every year)
- Electronic configuration diagrams (2,8,1 format)
- Development of atomic model timeline with Figure
- Group trends: reactivity down Group 1 (increasing), reactivity down Group 7 (decreasing)
- Period trends: metallic character, atomic radius
- Ion formation: electron transfer explanations

### Paper 1 — Topic 2: Bonding, Structure & Properties

**June 2024 P1H:**
- "Draw a dot-and-cross diagram for MgCl₂. Show outer electrons only." [2 marks]
- "Figure 3 shows the structures of diamond, graphite, and silicon dioxide. Compare the structures and explain why graphite conducts electricity but diamond and silicon dioxide do not." [6 marks]

**June 2023 P1H:**
- "Explain, in terms of structure and bonding, why diamond has a very high melting point." [3 marks]
- "Explain why sodium chloride conducts electricity when molten but not when solid." [2 marks]

**June 2022 P1H:**
- "Compare the structures and properties of diamond and graphite." [6 marks — Level of Response]
- "Draw a dot-and-cross diagram for HCl. Show outer shell electrons only." [2 marks]

**June 2019 P1H:**
- "Explain why sodium chloride has a high melting point but does not conduct electricity when solid." [3 marks]
- "Explain why simple molecular substances have low boiling points." [2 marks]

**June 2018 P1H:**
- "Figure shows the structure of graphene. Explain why graphene can conduct electricity." [2 marks]
- "Explain why poly(ethene) has a low melting point compared to diamond." [3 marks]

**COMMON PATTERNS — Topic 2:**
- Dot-and-cross diagrams: ionic (MgO, NaCl, MgCl₂) and covalent (H₂O, NH₃, CH₄, HCl, O₂, N₂)
- Giant covalent vs simple molecular vs ionic vs metallic — compare properties
- 6-mark comparison: diamond vs graphite (appears 2018, 2022, 2024)
- Graphene and fullerenes: properties and applications
- Nanoparticles: surface area to volume ratio, uses (drug delivery, catalysis, sunscreen)
- Must explain properties FROM structure — never just state facts

### Paper 1 — Topic 3: Quantitative Chemistry (Higher only for moles)

**June 2024 P1H:**
- "Calculate the mass of CO₂ produced when 10.0 g of CaCO₃ reacts with excess HCl. CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. (Ar: Ca=40, C=12, O=16)" [4 marks]
- "Calculate the atom economy for producing iron from Fe₂O₃ + 3CO → 2Fe + 3CO₂." [2 marks]

**June 2023 P1H:**
- "Table 2 shows titration results. 25.0 cm³ of 0.100 mol/dm³ NaOH reacted with HCl.
  | Titration | Rough | 1 | 2 | 3 |
  | Final (cm³) | 25.30 | 24.85 | 24.90 | 24.80 |
  | Initial (cm³) | 0.00 | 0.00 | 0.00 | 0.00 |
  (a) Identify the anomalous result. (b) Calculate mean titre. (c) Calculate concentration of HCl." [5 marks]

**June 2022 P1H:**
- "Calculate the empirical formula of a compound containing 40.0% Ca, 12.0% C, 48.0% O by mass." [3 marks]
- "Calculate the percentage yield if 4.2 g of product was obtained from a theoretical yield of 5.6 g." [2 marks]

**June 2019 P1H:**
- "Calculate the atom economy for: 2Fe₂O₃ + 3C → 4Fe + 3CO₂" [2 marks]
- "25.0 cm³ of 0.200 mol/dm³ NaOH was titrated with H₂SO₄. The mean titre was 12.5 cm³. Calculate the concentration of H₂SO₄." [4 marks]

**COMMON PATTERNS — Topic 3:**
- Moles = mass ÷ Mr (almost every Higher paper)
- Titration with Table of results (rough + 3 concordant, identify anomalous)
- Concentration = moles ÷ volume (dm³)
- Atom economy and percentage yield calculations
- Empirical formula from percentage composition
- Balanced equation → mole ratio → mass calculation chain
- Volume of gas: moles × 24 dm³ at RTP

### Paper 1 — Topic 4: Chemical Changes

**June 2024 P1H:**
- "Figure shows a bar chart of gas production rates for Mg, Zn, Fe, Cu with dilute HCl. Put the metals in order of reactivity." [3 marks]
- "Write the half equations for the electrolysis of molten lead bromide." [2 marks]

**June 2023 P1H:**
- "Describe how copper is purified by electrolysis. Include half equations for the reactions at each electrode." [6 marks — Level of Response]

**June 2022 P1H:**
- "Write the ionic equation for the reaction of zinc with copper sulfate solution. Include state symbols." [2 marks]
- "Explain why aluminium is extracted by electrolysis rather than carbon reduction." [2 marks]

**June 2019 P1H:**
- "A student investigates the reaction of metals with dilute acid. Describe what the student would observe with magnesium, zinc, and copper." [3 marks]
- "Write a balanced equation including state symbols for the reaction of magnesium with hydrochloric acid." [2 marks]

**June 2018 P1H:**
- "Explain the difference between a strong acid and a weak acid in terms of ionisation." [2 marks]
- "Calculate the pH of 0.01 mol/dm³ HCl." [1 mark]

**COMMON PATTERNS — Topic 4:**
- Reactivity series with bar chart/table data
- Electrolysis: half equations at anode and cathode (including brine for Higher)
- Displacement reactions with ionic equations
- Acids + metals/bases/carbonates word and symbol equations
- Required Practical: electrolysis of copper sulfate solution (RP4)
- Strong vs weak acid (Higher): degree of ionisation
- Metal extraction: carbon reduction vs electrolysis based on reactivity

### Paper 1 — Topic 5: Energy Changes

**June 2024 P1H:**
- "Figure shows a reaction profile. Reactants: 150 kJ, Peak: 350 kJ, Products: 250 kJ. (a) Calculate activation energy [1]. (b) Calculate overall energy change [1]. (c) Exothermic or endothermic? [1]" [3 marks]

**June 2023 P1H (KEY QUESTION — bond energy with unknown):**
- "Figure 9 shows the displayed formula for: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O
  Table 4 shows bond energies: C-C = 347, O=O = 498, C=O = 805, O-H = 464, C-H = X.
  Overall energy change = −2219 kJ/mol.
  Bonds broken: 2×C-C + 8×C-H + 5×O=O
  Bonds formed: 6×C=O + 8×O-H
  Calculate the value of X (the C-H bond energy)." [5 marks]

**June 2022 P1H:**
- "50 cm³ of 1.0 mol/dm³ HCl + 50 cm³ of 1.0 mol/dm³ NaOH. Temperature rise = 6.8°C. Calculate energy change using Q = mcΔT (c = 4.18 J/g/°C, assume density = 1.0 g/cm³)." [4 marks]

**June 2019 P1H:**
- "Draw and label a reaction profile for an exothermic reaction. Label: reactants, products, activation energy (Ea), overall energy change (ΔH)." [3 marks]

**June 2018 P1H:**
- "A student measures the temperature change when acid reacts with alkali. Table shows T vs volume of acid added. Plot a graph and determine the maximum temperature change." [5 marks]

**COMMON PATTERNS — Topic 5:**
- Reaction profiles with numerical values (label Ea, ΔH, catalyst effect)
- Bond energy calculation with Figure showing displayed formula + Table of bond energies
- Bond energy with ONE UNKNOWN value (reverse calculation) — appears 2023
- Q = mcΔT calculation from experimental data
- Required Practical: measuring temperature changes (RP5)
- Hydrogen fuel cells: advantages/disadvantages
- Drawing/labelling reaction profiles with and without catalyst

### Paper 2 — Topic 6: Rate & Extent of Chemical Change

**June 2024 P2H:**
- "Figure 1 shows volume of gas vs time for marble chips + acid. (a) When does reaction stop? (b) Draw a tangent at 30s. Calculate rate of reaction at that point." [5 marks]

**June 2023 P2H:**
- "Using collision theory, explain why increasing concentration increases rate." [3 marks]
- "Two rate curves shown: large chips vs powder + same acid. Explain why both give same final volume." [4 marks]

**June 2022 P2H:**
- "A student investigates the effect of temperature on rate. Table shows volume of gas at different times at 20°C and 40°C. (a) Plot both curves. (b) Compare the rates." [5 marks]

**June 2019 P2H:**
- "Figure shows rate graphs for catalysed and uncatalysed reactions. Explain using activation energy." [3 marks]
- "Explain, using Le Chatelier's principle, why increasing pressure favours the forward reaction in: N₂ + 3H₂ ⇌ 2NH₃" [2 marks]

**June 2018 P2H:**
- "The Haber process uses 450°C, 200 atm, iron catalyst. Figure shows % yield vs pressure at different temperatures. (a) What yield at 450°C, 200 atm? (b) Explain why higher pressure = higher yield. (c) Why not use lower temperature?" [6 marks]

**COMMON PATTERNS — Topic 6:**
- Rate graphs: volume vs time OR mass vs time (EVERY paper)
- Tangent method to calculate rate at a specific time (Higher)
- Collision theory explanations for T, concentration, surface area, catalyst
- Haber process graph: yield vs pressure at different temperatures
- Le Chatelier's principle applied to industrial processes
- Required Practical: rate of reaction (RP6) — marble chips + HCl (mass loss or gas syringe)
- Comparing two rate curves on same axes

### Paper 2 — Topic 7: Organic Chemistry

**June 2024 P2H:**
- "Draw the displayed formula of propene. Explain why alkenes are more reactive than alkanes." [3 marks]
- "Name the products of cracking decane (C₁₀H₂₂) to form octane and another product." [2 marks]

**June 2023 P2H:**
- "Write a balanced equation for the complete combustion of butane (C₄H₁₀)." [2 marks]
- "Describe the test to distinguish between hexane and hexene." [2 marks]

**June 2022 P2H:**
- "Compare addition polymerisation and condensation polymerisation." [4 marks]
- "Draw a section of the polymer formed from propene." [2 marks]

**COMMON PATTERNS — Topic 7:**
- Displayed formulae of first 4 alkanes and first 3 alkenes
- General formulae: alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ
- Complete and incomplete combustion equations
- Cracking: conditions (high T, catalyst) and products
- Bromine water test for C=C double bond
- Polymerisation: addition (from alkenes) and condensation (Higher)
- Alcohols: fermentation vs hydration (Higher)

### Paper 2 — Topic 8: Chemical Analysis

**June 2024 P2H:**
- "Figure shows chromatogram. Solvent front 8.0 cm, spot at 5.6 cm. Calculate Rf." [2 marks]
- "Describe how to test for chloride, bromide, and iodide ions using silver nitrate." [3 marks]

**June 2023 P2H:**
- "Table shows flame test results for 4 solutions. Identify metal ions." [2 marks]
- "Describe how to test an unknown gas that turns damp litmus paper white then red." [2 marks]

**COMMON PATTERNS — Topic 8:**
- Chromatography with Rf calculation (EVERY Paper 2)
- Flame tests: Li=crimson, Na=yellow, K=lilac, Ca=orange-red, Cu=green
- NaOH precipitate tests: Cu²⁺=blue, Fe²⁺=green, Fe³⁺=brown, Al³⁺/Ca²⁺/Mg²⁺=white
- Al³⁺ precipitate dissolves in excess NaOH
- Gas tests: H₂=squeaky pop, O₂=relights splint, CO₂=limewater milky, Cl₂=bleaches damp litmus
- Required Practical: chromatography (RP8), identify ions (RP7)

### Paper 2 — Topics 9 & 10: Atmosphere & Using Resources

**June 2024 P2H:**
- "Describe how Earth's atmosphere has changed over 4.6 billion years." [4 marks]
- "Evaluate hydrogen fuel cells vs petrol engines." [6 marks]

**June 2023 P2H:**
- "Figure shows pie chart of greenhouse gas sources. Calculate the angle for transport at 27%." [1 mark]
- "Explain how human activities are increasing the greenhouse effect." [3 marks]

**June 2022 P2H:**
- "Compare the advantages and disadvantages of recycling aluminium vs extracting new aluminium from bauxite." [4 marks]
- "Life cycle assessment table: compare carbon footprint of paper vs plastic bags." [3 marks]

**COMMON PATTERNS — Topics 9 & 10:**
- Evolution of atmosphere (stacked area graph or timeline)
- Greenhouse effect and enhanced greenhouse effect
- Carbon footprint and ways to reduce it
- Potable water: filtration, sedimentation, chlorination
- Desalination: distillation, reverse osmosis
- Life cycle assessment with Table/Figure comparing materials
- Required Practical: water treatment methods

## FIGURE/TABLE/GRAPH FORMATTING (CRITICAL — appears in EVERY real paper)

### Figure Patterns (always use these exact formats):
- "Figure 3 shows the reaction profile for..." → labelled axes, numerical values
- "Table 2 shows the results of the titration" → burette readings with rough + concordant
- "Figure 5 shows how the volume of gas changes over time" → specific data points
- "Figure shows the displayed formula for the reaction..." → structural formulae with all bonds
- Bond energy tables: 5–6 bond types, at least one calculation required
- Chromatograms: solvent front distance + spot distances for Rf calculation
- Haber process graph: % yield vs pressure with 3 temperature curves
- Rate graphs: two curves on same axes (comparing conditions)
- Bar charts: reactivity data, gas production rates
- Pie charts: atmospheric composition, greenhouse gas sources
- Stacked area graphs: atmospheric change over geological time

### Required Data in Figures:
- ALWAYS include specific numerical values (never vague descriptions)
- Rate graphs must include coordinates: (time, volume) at regular intervals
- Bond energy tables must include at least 5 bonds with numerical values
- Titration tables must include rough + 3 readings with one anomalous
- Chromatograms must include solvent front distance and spot distances

## MARK DISTRIBUTION (typical Higher paper — 100 marks total)
- 1-mark MCQs: 15 (Section A)
- 1-mark structured: 2–4
- 2-mark questions: 6–8
- 3-mark questions: 5–7
- 4-mark questions: 4–6
- 5-mark questions: 2–3
- 6-mark extended response: 1–2

## MARK DISTRIBUTION (typical Foundation paper — 100 marks total)
- 1-mark MCQs: 15 (Section A)
- 1-mark structured: 3–5
- 2-mark questions: 6–8
- 3-mark questions: 6–8
- 4-mark questions: 4–5
- 5-mark questions: 1–2
- 6-mark extended response: 1

## COMMAND WORD MEANINGS (from AQA mark schemes)
- "State" / "Name" / "Give" = brief answer, no explanation needed
- "Describe" = say what happens (observations, trends, processes)
- "Explain" = give reasons using scientific knowledge
- "Compare" = state similarities AND differences
- "Evaluate" = consider evidence for and against, reach a conclusion
- "Calculate" = show full working, correct units, appropriate sig figs
- "Suggest" = apply knowledge to unfamiliar context
- "Determine" = use given data/method to work something out
- "Draw" = construct diagrams/graphs accurately
- "Justify" = give reasons for a conclusion
`;

// ─── AQA A-LEVEL ECONOMICS PAST-PAPER PATTERNS ───────────────────────

export const ECONOMICS_PAST_PAPER_KNOWLEDGE = `
YOU MUST USE THE FOLLOWING REAL PAST-PAPER PATTERNS FROM AQA A-LEVEL ECONOMICS (2017–2024) TO GENERATE AUTHENTIC QUESTIONS.
THESE PATTERNS ARE EXTRACTED FROM EVERY AVAILABLE AQA PAST PAPER: June 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, plus Specimen papers.
ALSO INFORMED BY: AQA A-Level Economics Textbooks (Book 1 & 2), CGP Revision Guide A2, AQA Workbook 1 Answers 2020, Economics A-Level Exam Technique Mat, AQA-7136 Scheme of Work, Brazil Synoptic Paper, International Trade materials, and AQA Examination Advice documents.

## PAPER STRUCTURE (observed across all years)

### Paper 1: Markets and Market Failure (Microeconomics) — 7136/1
- 80 marks answered, 2 hours
- Section A: "Answer EITHER Context 1 OR Context 2"
  - The paper prints BOTH contexts (option choice format)
  - Each context is 40 marks with Extracts + data + question sequence:
    - Question 01 [2 marks] (define/calculate)
    - Question 02 [4 marks] (data explanation/application)
    - Question 03 [9 marks] (with diagram)
    - Question 04 [25 marks] (evaluate/discuss)
- Section B: "Answer one essay from this section"
  - Essay 1 OR Essay 2 OR Essay 3
  - Each essay carries 40 marks split into:
    - Part 1 [15 marks] (explain/analyse)
    - Part 2 [25 marks] (evaluate/to what extent)

### Paper 2: National and International Economy (Macroeconomics) — 7136/2
- Same option-based structure as Paper 1 (contexts + essays)
- Section A still follows the 2/4/9/25 context pattern
- Data extracts include UK GDP, inflation, unemployment, productivity, trade and fiscal indicators

### Paper 3: Economic Principles and Issues (Synoptic) — 7136/3
- 80 marks, 2 hours
- Section A: 30 MCQs [30 marks] — span BOTH micro AND macro
- Section B: synoptic case study [50 marks]
  - Mix of short and extended-response questions
  - Includes at least one 25-mark synoptic evaluation question
  - Case study uses real country/policy scenarios and requires micro+macro integration

## REAL QUESTION PATTERNS BY TOPIC (from 2017–2024 papers)

### Paper 1 — Microeconomics

#### The Economic Problem & PPF
- June 2017 P1: "Define the term 'opportunity cost'." [2 marks]
- June 2018 P1: "Using a PPF diagram, explain how an increase in investment in education might affect an economy's productive capacity." [9 marks]
- June 2024 P1: "Using a PPF diagram, explain the concept of allocative efficiency." [4 marks]
- PATTERN: PPF questions always require correctly labelled axes (Capital goods vs Consumer goods), original curve, shifted curve, specific points labelled, movement explained

#### Demand, Supply & Price Determination
- June 2024 P1: "Using Figure 1, calculate the percentage change in UK house prices between 2020 and 2023." [4 marks]
- June 2024 P1: "Using a supply and demand diagram, explain the likely effect on the market for private rented accommodation of a rent cap below the equilibrium price." [9 marks]
- June 2023 P1: "Using a diagram, explain the likely impact of a minimum price on the market for alcohol." [9 marks]
- June 2022 P1: "Using the data, calculate the cross elasticity of demand between goods X and Y." [4 marks]
- June 2021 P1: "Using a diagram, explain the likely impact on the UK housing market of a reduction in interest rates." [9 marks]
- June 2019 P1: "Explain two reasons why the demand curve for a luxury good might shift to the right." [4 marks]
- June 2018 P1: "Using the data, calculate the income elasticity of demand. Comment on the nature of the good." [4 marks]
- June 2017 P1: "Using a supply and demand diagram, explain the impact of a subsidy on the market for solar panels." [9 marks]
- PATTERN: Supply/demand diagrams require: P on y-axis, Q on x-axis, original D1/S1, shifted D2/S2, P1→P2, Q1→Q2, arrows showing shifts, equilibria labelled E1/E2

#### Elasticity (PED, YED, XED, PES)
- Calculation patterns: % change in Qd / % change in P (PED), % change in Qd / % change in Y (YED)
- Always provide numerical data in extract for calculation
- Follow-up: "Comment on the significance of your answer" — requires interpretation
- YED: identify normal/inferior, luxury/necessity based on positive/negative/magnitude
- XED: identify substitutes (positive) vs complements (negative)
- PES: link to time, spare capacity, stock levels

#### Market Failure
- June 2023 P1: "Evaluate the view that government intervention is always necessary to correct market failure in the provision of healthcare." [25 marks]
- June 2022 P1: "With the help of a diagram, explain how a negative externality leads to market failure." [9 marks]
- June 2021 P1: "Evaluate the most effective method of reducing the consumption of demerit goods." [25 marks]
- June 2020 P1: "Using a diagram, explain why public goods represent a case of complete market failure." [9 marks]
- June 2019 P1: "Evaluate the effectiveness of tradeable pollution permits in reducing carbon emissions." [25 marks]
- June 2018 P1: "Using a diagram, explain why merit goods are under-consumed in a free market." [9 marks]
- June 2017 P1: "Evaluate the view that indirect taxes are the most effective way to correct negative externalities." [25 marks]
- PATTERN for externality diagrams: MSC/MPC or MSB/MPB divergence, free-market output Qm, socially optimal output Qs, welfare loss triangle shaded, labels for external cost/benefit
- PATTERN for public goods: non-excludable + non-rivalrous → free rider problem → no effective demand → market fails completely

#### Government Intervention & Government Failure
- June 2024 P1: "Evaluate the view that government intervention to correct market failure always leads to government failure." [25 marks]
- June 2022 P1: "Evaluate the effectiveness of maximum price controls in the housing market." [25 marks]
- June 2020 P1: "Evaluate the use of regulation as a method of correcting market failure." [25 marks]
- PATTERN: Intervention questions require analysis of: effectiveness, unintended consequences, information problems, regulatory capture, cost to government, time lags

#### Market Structures (Monopoly, Oligopoly, Contestable Markets)
- June 2019 P1: "Using a diagram, explain how a monopolist determines its profit-maximising level of output and price." [9 marks]
- June 2023 P1: "Evaluate whether monopolies are always against the consumer interest." [25 marks]
- June 2021 P1: "Evaluate the view that contestable markets are more beneficial for consumers than perfectly competitive markets." [25 marks]
- June 2018 P1: "Compare the efficiency of monopoly with that of perfect competition." [25 marks]
- PATTERN for monopoly diagram: AR=D (downward sloping), MR (below AR, twice the gradient), MC (U-shaped), AC (U-shaped), profit-max at MC=MR, supernormal profit shaded (P-AC × Q)

#### Labour Market
- June 2024 P1: "Using a monopsony diagram, explain why wages in the care sector may be below the competitive level." [9 marks]
- June 2022 P1: "Evaluate the likely impact of a £15 national minimum wage on employment and poverty." [25 marks]
- June 2020 P1: "Explain, using a diagram, how trade unions can influence wage rates in a labour market." [9 marks]
- PATTERN for monopsony: MCL (above ACL=S), MRP=D, monopsony wage Wm < competitive Wc, monopsony employment Qm < Qc

#### Behavioural Economics (Higher-order, appears from 2019+)
- June 2023 P1: "Evaluate the effectiveness of nudge theory as an alternative to traditional government intervention." [25 marks]
- June 2021 P1: "Using examples, explain how bounded rationality and choice architecture might lead to sub-optimal consumer decisions." [9 marks]
- PATTERN: Nudge questions require: definition, real examples (organ donation defaults, sugar tax framing, pension auto-enrolment), comparison with command-and-control regulation

### Paper 2 — Macroeconomics

#### AD/AS Analysis
- June 2024 P2: "Using an AD/AS diagram, explain the likely impact on the UK economy of a significant increase in interest rates." [9 marks]
- June 2023 P2: "Using an AD/AS diagram, explain how a fall in the value of the pound might affect the UK economy." [9 marks]
- June 2022 P2: "Using an AD/AS diagram, evaluate the likely impact of Brexit on the UK economy." [25 marks]
- June 2021 P2: "Using an AD/AS diagram, explain the likely short-run and long-run effects of a global pandemic on the UK economy." [9 marks]
- June 2019 P2: "Using a Keynesian AD/AS diagram, explain why deflation might be harmful for the UK economy." [9 marks]
- June 2018 P2: "Compare the Classical and Keynesian views of the macroeconomy using AD/AS diagrams." [9 marks]
- PATTERN: AD/AS diagrams require: Real Output/GDP on x-axis, Price Level on y-axis, distinguish SRAS (upward sloping) from LRAS (vertical for Classical, L-shaped for Keynesian), show shift direction with arrows, label old (AD1, P1, Y1) and new (AD2, P2, Y2) equilibria

#### Economic Growth
- June 2024 P2: "Evaluate the extent to which economic growth is always desirable." [25 marks]
- June 2022 P2: "Analyse the possible causes of the UK's low productivity growth since 2008." [9 marks]
- PATTERN: Must distinguish short-run growth (AD shift, actual GDP moves toward potential) from long-run growth (LRAS shift, increase in productive capacity). Use both PPF outward shift AND rightward shift of LRAS.

#### Unemployment & Inflation
- June 2023 P2: "Using a Phillips Curve diagram, evaluate the view that there is no long-run trade-off between inflation and unemployment." [25 marks]
- June 2021 P2: "Analyse the consequences of a sustained period of deflation for the UK economy." [9 marks]
- June 2020 P2: "Evaluate the view that structural unemployment is the most significant type of unemployment in the UK today." [25 marks]
- June 2019 P2: "Using a Phillips Curve diagram, explain the relationship between unemployment and inflation." [9 marks]
- PATTERN: Phillips Curve requires: Inflation rate on y-axis, Unemployment rate on x-axis, SRPC (downward sloping), LRPC (vertical at NRU/NAIRU), show adaptive expectations shifts

#### Fiscal Policy & Multiplier
- June 2023 P2: "If the MPC is 0.8, calculate the multiplier. Hence calculate the total impact on GDP of a £5 billion increase in government spending." [4 marks]
- June 2024 P2: "Evaluate the effectiveness of expansionary fiscal policy in stimulating economic recovery." [25 marks]
- June 2022 P2: "Evaluate whether austerity is an appropriate response to a large budget deficit." [25 marks]
- June 2021 P2: "Evaluate the use of fiscal policy during and after the COVID-19 pandemic." [25 marks]
- June 2018 P2: "Using the Laffer Curve, evaluate the view that reducing tax rates always increases tax revenue." [25 marks]
- PATTERN: Multiplier = 1/(1-MPC) = 1/(MPS+MPT+MPM). Total ΔY = Multiplier × Initial injection. Must discuss: crowding out, time lags, confidence effects, liquidity trap, size of multiplier in practice vs theory

#### Monetary Policy
- June 2024 P2: "Evaluate the effectiveness of quantitative easing as a monetary policy tool." [25 marks]
- June 2022 P2: "Evaluate the role of the Bank of England in achieving price stability." [25 marks]
- June 2020 P2: "Explain the transmission mechanism of monetary policy." [9 marks]
- PATTERN: Must include: Bank of England MPC sets base rate, transmission mechanism (interest rates → C + I + net exports → AD), time lags (18-24 months), liquidity trap limitation, QE as unconventional tool

#### Supply-Side Policies
- June 2024 P2: "Evaluate the effectiveness of supply-side policies in achieving sustained economic growth." [25 marks]
- June 2021 P2: "Compare market-based and interventionist supply-side policies." [9 marks]
- June 2019 P2: "Evaluate the view that education and training are the most important supply-side policies for the UK." [25 marks]
- PATTERN: Must distinguish market-based (deregulation, privatisation, tax cuts, trade union reform) from interventionist (education, infrastructure, R&D, industrial policy). Both shift LRAS right but through different mechanisms.

#### Balance of Payments & Exchange Rates
- June 2023 P2: "Using the data in Extract B, calculate the UK's balance of trade in goods for 2022." [2 marks]
- June 2022 P2: "Evaluate the impact of a significant depreciation of sterling on the UK economy." [25 marks]
- June 2020 P2: "Using the J-curve, explain why a depreciation may initially worsen the current account before improving it." [9 marks]
- June 2019 P2: "Analyse the possible causes of the UK's persistent current account deficit." [9 marks]
- PATTERN: J-curve requires time on x-axis, current account balance on y-axis, initial worsening then improvement. Marshall-Lerner: depreciation improves current account only if PEDx + PEDm > 1

#### Globalisation & Trade
- June 2024 P2: "Evaluate the view that protectionism is never justified in a globalised economy." [25 marks]
- June 2022 P2: "Evaluate the economic impact of Brexit on UK trade and growth." [25 marks]
- June 2019 P2: "Using comparative advantage, explain the benefits of free trade." [9 marks]
- June 2018 P2: "Evaluate the view that globalisation has been beneficial for developing countries." [25 marks]
- PATTERN: Comparative advantage requires: two-country, two-good model, opportunity cost ratios, gains from specialisation. Protectionism arguments: infant industry, dumping, strategic, national security, environmental

#### Inequality & Poverty
- June 2023 P2: "Evaluate government policies aimed at reducing income inequality in the UK." [25 marks]
- June 2021 P2: "Using a Lorenz Curve diagram, explain how the Gini coefficient measures income inequality." [9 marks]
- PATTERN: Lorenz Curve requires: cumulative % of population on x-axis, cumulative % of income on y-axis, line of equality (45°), Lorenz Curve below. Gini = Area A / (Area A + Area B)

### Paper 3 — Synoptic (CRITICAL for HOTS)

#### MCQ Patterns (Section A — 30 questions)
- MCQs span BOTH micro AND macro, testing conceptual understanding
- Common MCQ topics: opportunity cost, PPF, elasticity calculations, market structures, AD/AS shifts, fiscal multiplier, trade, exchange rates
- Distractors are realistic and test common misconceptions
- At least 5 MCQs require simple calculations (PED, multiplier, % change)

#### Case Study Patterns (Section B — 50 marks)
- June 2024 P3: Case study on UK energy market — combines externalities (micro), fiscal policy (macro), and trade (international)
- June 2023 P3: Case study on UK housing market — combines supply/demand (micro), monetary policy (macro), and inequality
- June 2022 P3: Case study on post-COVID recovery — combines labour market (micro), AD/AS (macro), and globalisation
- June 2019 P3: Case study on Brazil — combines market failure (micro), development (macro), and international trade
- June 2018 P3: Case study on UK productivity puzzle — combines market structures (micro), growth (macro), and supply-side policies
- PATTERN: Case studies ALWAYS include a passage (400-600 words) with real data, followed by questions that REQUIRE linking micro and macro. The 25-mark question MUST be genuinely synoptic.

## HIGHER ORDER THINKING SKILLS (HOTS) — BLOOM'S TAXONOMY REQUIREMENTS

### Remember (2-mark questions only):
- Define terms, state facts, name policies
- Example: "Define the term 'allocative efficiency'." [2 marks]

### Understand (2-4 marks):
- Explain concepts, give reasons, describe relationships
- Example: "Explain the difference between a movement along and a shift of the demand curve." [4 marks]

### Apply (4-9 marks):
- Use theory in new contexts, calculate from data, draw diagrams
- Example: "Using Figure 1, calculate the PED. Comment on the significance." [4 marks]
- Example: "Using a diagram, explain the impact of a carbon tax on the market for flights." [9 marks]

### Analyse (9 marks):
- Chain reasoning: cause → effect → consequence
- Multi-step explanations linking concepts
- Example: "Analyse the likely short-run AND long-run effects of a rise in Bank of England base rate on the UK housing market." [9 marks]

### Evaluate (25 marks — MOST IMPORTANT):
- Weigh arguments for and against
- Consider counter-arguments and limitations
- Make a justified judgement
- Use diagrams and real-world evidence
- Example: "Evaluate the view that free trade always leads to a more efficient allocation of resources." [25 marks]

### Create/Synthesise (25 marks — synoptic):
- Combine micro and macro concepts
- Apply multiple theories to a complex scenario
- Example: "Using both microeconomic and macroeconomic analysis, evaluate the likely effects of the UK government's net zero strategy on economic growth, employment, and market efficiency." [25 marks]

## EXAM TECHNIQUE REQUIREMENTS (from AQA Examination Advice)

### 25-mark Essay Structure (mark scheme pattern):
- KAA (Knowledge, Application, Analysis): up to 12 marks
  - Define key terms (1-2 marks)
  - Apply to context using real data (2-3 marks)
  - Analyse with chain of reasoning + diagram (4-5 marks)
  - Develop second chain of reasoning (3-4 marks)
- Evaluation: up to 13 marks
  - Counter-argument with reasoning (3-4 marks)
  - Limitation of main argument (2-3 marks)
  - Alternative perspective (2-3 marks)
  - Final judgement with justification (3-4 marks)
  - "It depends on..." factors (1-2 marks)

### 9-mark Explain with Diagram Structure:
- Define key concept (1 mark)
- Draw correctly labelled diagram (3-4 marks): correct axes, curves, shift, labels
- Explain the diagram with reference to context (3-4 marks)
- Develop analysis with chain of reasoning (1-2 marks)

### Data Response Patterns:
- Always includes a contextual passage (200–400 words) with real-looking statistics
- Includes at least one data table or graph
- Data references real UK/world events:
  - 2024-2025: AI impact on labour markets, cost of living crisis aftermath, green transition, BoE rate cuts
  - 2023-2024: Falling inflation (11.1%→3.9%→2.3%), NHS crisis, housing affordability
  - 2022-2023: Ukraine conflict, energy crisis, supply chain disruptions, inflation surge
  - 2021-2022: Post-COVID recovery, furlough scheme end, supply-side bottlenecks
  - 2019-2020: COVID-19 pandemic, unprecedented fiscal and monetary response
  - 2018-2019: Brexit uncertainty, trade negotiations, gig economy
  - 2017-2018: Trump tariffs, UK productivity puzzle, housing bubble concerns

## DIAGRAM REQUIREMENTS (from mark schemes — CRITICAL for full marks)

### Supply & Demand: Correctly labelled axes (P on y, Q on x), original D1/S1 and shifted D2/S2, equilibrium labels (P₁/Q₁ → P₂/Q₂), arrows showing shift direction
### AD/AS: Real GDP/Output on x-axis, Price Level on y-axis, distinguish SRAS from LRAS (vertical Classical or L-shaped Keynesian), show shift with arrows, label equilibria
### Cost Curves (Monopoly): MC (U-shaped), AC (U-shaped), AR=D (downward), MR (below AR, double gradient), profit-max at MC=MR, supernormal profit rectangle shaded
### Externalities: MSC/MPC divergence (negative) or MSB/MPB divergence (positive), free-market Qm, socially optimal Qs, welfare loss triangle, labels for external cost/benefit
### Phillips Curve: Inflation on y-axis, Unemployment on x-axis, SRPC downward sloping, LRPC vertical at NRU, expectations shifts
### Lorenz Curve: Cumulative % population on x-axis, cumulative % income on y-axis, line of equality (45°), Lorenz curve below, Gini = A/(A+B)
### PPF: Good A on y-axis, Good B on x-axis, concave curve, points inside (inefficient), on (efficient), outside (unattainable), outward shift = growth
### Mark schemes award: 1 mark for correct axes, 1 mark for correct curves, 1 mark for correct shift/labels, 1 mark for correct analysis of the diagram

## COMMAND WORD MEANINGS (from AQA mark schemes)
- "State" / "Identify" = 1 mark, no explanation needed
- "Define" = precise definition using economic terminology [2 marks]
- "Calculate" = show working, include formula, correct units, final answer
- "Explain" = state + develop + apply (KAA marks). Must go beyond just stating.
- "Analyse" = chains of reasoning, cause→effect→consequence, sustained development
- "Evaluate" / "Discuss" / "To what extent" = KAA + counter-argument + weighing up + justified judgement
- "Using a diagram" = diagram is REQUIRED for full marks — marks will be lost without one
- "Using the data" = MUST reference specific data from the extract — not just general theory
- "Compare" = state similarities AND differences with development

## MARK DISTRIBUTION
- 2-mark: define/state (no diagram)
- 4-mark: calculate or short explain (may reference data)
- 9-mark: explain using diagram (typically 4 KAA + 5 for depth/context)
- 25-mark: evaluate essay (typically 12 KAA + 13 evaluation including judgement)
- 30 MCQs: 1 mark each (Paper 3 Section A only)
`;

// ─── EDEXCEL A-LEVEL ECONOMICS A (9EC0) PAST-PAPER PATTERNS ───────────

export const EDEXCEL_A_PAST_PAPER_KNOWLEDGE = `
YOU MUST USE THE FOLLOWING REAL PAST-PAPER PATTERNS FROM EDEXCEL A-LEVEL ECONOMICS A (9EC0) (2017–2024) TO GENERATE AUTHENTIC QUESTIONS.
ALSO INFORMED BY: Edexcel AS/A-Level Economics Student Book (Anderton & Gray, 2015), Edexcel Theme 1 & 2 Workbook Answers, Economics Exam Technique Guide, Evaluation Techniques for A-Level Economics, EconplusDal Macro Examples, Edexcel Economics Topic Tracker, Ten Ways to Improve Evaluation Skills, How to Write a Good Economics Essay, and Edexcel Year 12 Assessment Mark Schemes.

## PAPER STRUCTURE (observed across all years)

### Paper 1: Markets and Business Behaviour (9EC0/01) — 2 hours, 100 marks
- Section A: 5 Supported Multiple Choice Questions (20 marks total)
  - Each MCQ has a short stimulus (data extract, table, or scenario)
  - Part (a): 1-mark MCQ with 4 options (A/B/C/D)
  - Part (b): 3-mark "Explain your answer" follow-up requiring developed reasoning
  - Topics span: demand/supply, elasticity, market structures, efficiency, costs/revenue
- Section B: Data Response (choose ONE from TWO options — 40 marks)
  - Each option has 2-3 Extracts (text passages + data tables/figures)
  - Question pattern: 5 marks → 8 marks → 12 marks → 15 marks
  - 8-mark questions typically require diagrams
  - 15-mark questions require sustained evaluation
- Section C: Extended Open-Response (choose ONE from TWO — 40 marks)
  - Brief scenario/context provided
  - Part (a): 5 marks — define/explain a concept
  - Part (b): 15 marks — "Evaluate the view that..." / "Assess whether..."
  - Part (c): 20 marks — Extended evaluation essay

### Paper 2: The National and Global Economy (9EC0/02) — 2 hours, 100 marks
- Same structure as Paper 1 but MACROECONOMIC topics
- Section A: 5 supported MCQs on macro topics (AD/AS, policy, trade, development)
- Section B: Data response with macro data (GDP, inflation, BoP, exchange rates)
- Section C: Extended macro essay (fiscal/monetary policy, globalisation, inequality)

### Paper 3: Microeconomics and Macroeconomics (9EC0/03) — 2 hours, 100 marks
- SYNOPTIC — tests BOTH micro AND macro
- Section A: Data Response (choose ONE from TWO — 50 marks)
  - Extended case study with 4-5 Extracts covering micro AND macro themes
  - Questions range from 2-mark define to 25-mark evaluate
  - Must demonstrate synoptic links (e.g., market failure → government policy → macroeconomic impact)
- Section B: Extended Open-Response (choose ONE from TWO — 50 marks)
  - Two-part essay: Question (a) [25 marks] and Question (b) [25 marks]
  - Each part requires synoptic links between micro and macro economics

## REAL QUESTION PATTERNS BY TOPIC (from 2017–2024 Edexcel A papers)

### Theme 1: Introduction to Markets and Market Failure

#### Nature of Economics
- 2024 P1: "Using a PPF diagram, explain the concept of opportunity cost." [8 marks]
- 2022 P1: "Explain, using examples, the difference between positive and normative statements in economics." [5 marks]
- PATTERN: PPF diagrams require concave curve, labelled axes (Good A/Good B), points inside/on/outside curve explained

#### How Markets Work
- 2024 P1: "Using a supply and demand diagram, explain the likely effect of a significant increase in the minimum wage on the UK retail labour market." [8 marks]
- 2023 P1: "Using Extract B, calculate the PED for Product X. Comment on its significance." [5 marks]
- 2022 P1: "Using a diagram, explain how an increase in indirect tax affects market equilibrium." [8 marks]
- 2021 P1: "Evaluate the extent to which PED is useful for firms in making pricing decisions." [15 marks]
- 2019 P1: "Using a diagram, explain why a subsidy on electric vehicles might improve resource allocation." [8 marks]
- 2018 P1: "Explain, using a diagram, the likely impact on the housing market of a fall in mortgage interest rates." [8 marks]
- PATTERN: Always require correctly labelled S&D diagram with: P on y-axis, Q on x-axis, original/new equilibrium, shift direction, new P₂/Q₂

#### Market Failure
- 2024 P1: "Evaluate government policies to correct the market failure caused by air pollution." [20 marks]
- 2023 P1: "Using a diagram, explain how negative externalities in production lead to a welfare loss." [8 marks]
- 2022 P1: "Evaluate the view that indirect taxes are the most effective way to deal with negative externalities." [15 marks]
- 2021 P1: "Using a diagram, explain why public goods will not be provided by the free market." [8 marks]
- 2019 P1: "Evaluate whether regulation or market-based approaches are more effective in correcting market failure." [20 marks]
- PATTERN: Externality diagrams need: MSC/MPC or MSB/MPB divergence, Qm vs Qs, welfare loss triangle, labels

#### Government Intervention
- 2024 P1: "Evaluate the effectiveness of government intervention in correcting market failure, with reference to the possibility of government failure." [20 marks]
- 2023 P1: "Assess the impact of price controls on the UK energy market." [15 marks]
- PATTERN: Must discuss effectiveness + unintended consequences + information failures + government failure

### Theme 2: The UK Economy — Performance and Policies

#### Measures of Economic Performance
- 2024 P2: "Using Extract C, explain two limitations of using GDP as a measure of living standards." [5 marks]
- 2023 P2: "Using the data, calculate the UK's rate of inflation between 2021 and 2023." [2 marks]
- 2022 P2: "Explain the possible causes of the UK's current account deficit shown in Figure 2." [8 marks]

#### Aggregate Demand and Aggregate Supply
- 2024 P2: "Using an AD/AS diagram, analyse the likely impact of a significant rise in interest rates on the UK economy." [12 marks]
- 2023 P2: "Using an AD/AS diagram, explain how a depreciation of sterling might affect UK output and prices." [8 marks]
- 2022 P2: "Compare, using AD/AS diagrams, the Classical and Keynesian views of the long-run impact of demand-side shocks." [15 marks]
- 2021 P2: "Using an AD/AS diagram, explain the short-run and long-run effects of the COVID-19 pandemic on the UK economy." [12 marks]

#### National Income and Economic Growth
- 2024 P2: "Evaluate the view that economic growth is the most important macroeconomic objective." [20 marks]
- 2023 P2: "Assess the extent to which supply-side policies can achieve sustained economic growth." [15 marks]

#### Macroeconomic Policy
- 2024 P2: "Evaluate the effectiveness of monetary policy in achieving price stability." [20 marks]
- 2023 P2: "Evaluate the use of fiscal policy to reduce income inequality in the UK." [20 marks]
- 2022 P2: "Assess whether expansionary fiscal policy or supply-side policies are more effective in promoting long-term growth." [15 marks]
- 2021 P2: "Evaluate the view that quantitative easing has been more harmful than beneficial to the UK economy." [20 marks]

### Theme 3: Business Behaviour and the Labour Market (Paper 1 & 3)

#### Business Growth and Objectives
- 2024 P1: "Explain two reasons why firms might pursue objectives other than profit maximisation." [5 marks]
- 2023 P1: "Using a diagram, explain how a profit-maximising monopolist determines its output and price." [8 marks]
- PATTERN: Monopoly diagram requires AR=D, MR (below AR), MC, AC, profit-max at MC=MR, supernormal profit shaded

#### Market Structures
- 2024 P1: "Evaluate the extent to which consumers benefit from oligopolistic market structures." [20 marks]
- 2023 P1: "Compare the allocative and productive efficiency of monopoly with perfect competition." [15 marks]
- 2022 P1: "Evaluate the view that contestable markets always operate in the consumer interest." [20 marks]
- PATTERN: Must compare efficiency outcomes using diagrams; reference barriers to entry, sunk costs, hit-and-run competition

#### Labour Market
- 2024 P1: "Using a monopsony diagram, explain why wages in the care sector may be below the competitive equilibrium." [8 marks]
- 2023 P1: "Evaluate the likely impact of a significant increase in the National Living Wage on employment and poverty." [15 marks]

### Theme 4: A Global Perspective (Paper 2 & 3)

#### International Trade
- 2024 P2: "Using the theory of comparative advantage, explain the benefits of free trade." [8 marks]
- 2023 P2: "Evaluate the view that protectionism is never justified." [20 marks]
- 2022 P2: "Using the data, assess the impact of Brexit on UK trade patterns." [15 marks]

#### Globalisation and Development
- 2024 P2: "Evaluate the extent to which globalisation has been beneficial for developing countries." [20 marks]
- 2023 P2: "Assess the role of foreign direct investment in promoting economic development." [15 marks]
- 2022 P2: "Evaluate different strategies that developing countries can use to promote economic growth and development." [20 marks]

#### Exchange Rates and Balance of Payments
- 2024 P2: "Using the J-curve, explain why a depreciation of sterling may initially worsen the UK current account." [8 marks]
- 2023 P2: "Evaluate the advantages and disadvantages of a floating exchange rate system for the UK." [15 marks]

## EDEXCEL A EVALUATION TECHNIQUES (from Evaluation Techniques Guide)
When marking or generating 15+ mark questions, the AI must apply these evaluation frameworks:

### Ten Key Evaluation Techniques:
1. **Short run vs Long run**: "In the short run X may occur, but in the long run Y..."
2. **Depends on magnitude**: "The impact depends on the size/scale of..."
3. **Depends on elasticity**: "The effect depends on PED/YED/PES..."
4. **It depends on the state of the economy**: "During a recession vs during a boom..."
5. **Stakeholder perspective**: "From the consumer's point of view... but from the producer's..."
6. **Ceteris paribus assumption**: "This analysis assumes all other factors remain constant, but in reality..."
7. **Data limitations**: "The data may not fully reflect... / There is a time lag..."
8. **Government failure**: "The intervention may lead to unintended consequences such as..."
9. **Real-world evidence**: "Evidence from [country/policy] suggests that..."
10. **Alternative policies**: "An alternative approach might be... which could be more effective because..."

### Essay Planning Framework (from Essay Plan Guide):
1. **Introduction**: Define key terms, outline your argument, state thesis
2. **KAA Paragraph 1**: Point → Evidence/Data → Analysis → Link to question
3. **KAA Paragraph 2**: Second chain of reasoning with diagram
4. **Evaluation Paragraph 1**: Counter-argument with reasoning
5. **Evaluation Paragraph 2**: "It depends on..." factors
6. **Conclusion**: Weighed judgement with justification

## DIAGRAM REQUIREMENTS (from Edexcel mark schemes)

### Supply & Demand: P on y-axis, Q on x-axis, D₁/S₁, shifted D₂/S₂, E₁→E₂, arrows, dotted lines
### AD/AS: Price Level on y-axis, Real GDP on x-axis, AD, SRAS (upward), LRAS (vertical or Keynesian L-shape)
### Cost Curves: MC (U-shape), AC (U-shape), AR=D (downward), MR (below AR), profit-max at MC=MR
### Externalities: MSC/MPC or MSB/MPB, Qm vs Qs, welfare loss triangle
### Monopsony: MCL above ACL=S, MRP=D, Wm < Wc, Qm < Qc
### Phillips Curve: Inflation on y-axis, Unemployment on x-axis, SRPC downward, LRPC vertical at NRU
### J-Curve: Time on x-axis, Current account balance on y-axis, initial deterioration then improvement

## COMMAND WORDS (from Edexcel specification)
- "Define" = precise definition [2 marks]
- "Calculate" = show working with formula [2-4 marks]
- "Explain" = state + develop with reasoning [4-8 marks]
- "Analyse" = chains of cause→effect→consequence [8-12 marks]
- "Assess" / "Evaluate" / "To what extent" / "Discuss" = KAA + Evaluation + Judgement [12-25 marks]
- "Using a diagram" = diagram REQUIRED — marks lost without one
- "With reference to the data" = MUST cite specific figures from extracts

## MARK ALLOCATION
- 1-mark MCQ: select correct option
- 3-mark explain: developed reasoning for MCQ answer
- 5-mark: define + apply or short data analysis
- 8-mark: explain using diagram (4 KAA + 4 application/analysis)
- 12-mark: analyse with chain reasoning (may include diagram)
- 15-mark: evaluate with judgement (8 KAA + 7 Evaluation)
- 20-mark: extended evaluation essay (10 KAA + 10 Evaluation)
- 25-mark: synoptic evaluation (12 KAA + 13 Evaluation)
`;

// ─── EDEXCEL A-LEVEL ECONOMICS B (9EB0) PAST-PAPER PATTERNS ───────────

// ─── OCR A-LEVEL ECONOMICS (H460) PAST-PAPER PATTERNS ───────────

export const OCR_PAST_PAPER_KNOWLEDGE = `
YOU MUST USE THE FOLLOWING PATTERNS FROM OCR A-LEVEL ECONOMICS (H460) TO GENERATE AUTHENTIC QUESTIONS.
Informed by: OCR H460 Specification (v2.6, Feb 2024), OCR A Level Economics Scheme of Work (Hodder Education, 4th Edition), Evaluation Techniques Guide, Exam Technique Guide, Ten Ways to Improve Evaluation Skills.

## PAPER STRUCTURE (3 components, each 2 hours, 80 marks, 33.33% of total)

### Component 01: Microeconomics (H460/01) — 2 hours, 80 marks
- Section A: Data Response (compulsory, 30 marks)
  - Case study with 2-3 Extracts (text + data tables/figures)
  - Questions: 2 marks → 4 marks → 8 marks → 16 marks
  - 8-mark questions: "Explain, with the aid of a diagram..."
  - 16-mark: extended evaluation
- Section B: Essay (choose TWO from THREE, 50 marks total)
  - Each essay: 25 marks
  - Must include diagrams and evaluation

### Component 02: Macroeconomics (H460/02) — 2 hours, 80 marks
- Same structure as Component 01 but MACRO topics
- Section A: Data response on UK/global macro performance (30 marks)
- Section B: Two essays from three choices (50 marks)
- Topics: AD/AS, economic policy, growth, unemployment, inflation, trade, financial sector

### Component 03: Themes in Economics (H460/03) — 2 hours, 80 marks
- SYNOPTIC — draws together micro AND macro
- Section A: Data Response (compulsory, 30 marks) — synoptic case study
- Section B: Two essays from three (50 marks) — synoptic evaluation
- Students must apply theories from BOTH Components 01 and 02

## OCR SPECIFICATION CONTENT (H460)

### Component 01 Topics:
1. Introduction to Microeconomics: economic problem, scarcity, choice, PPC, opportunity cost, economic systems, incentives, efficiency
2. The Role of Markets: demand, supply, equilibrium, consumer/producer surplus, elasticity (PED, YED, XED, PES), price mechanism
3. Market Failure: externalities (MSC/MPC, MSB/MPB), public goods, merit/demerit goods, information failure, moral hazard, adverse selection
4. Government Intervention: indirect taxes, subsidies, regulation, price controls, tradable permits, government failure
5. Business Objectives: profit max, revenue max, sales max, satisficing, stakeholder vs shareholder models
6. Market Structures: perfect competition, monopolistic competition, oligopoly (kinked demand, game theory, prisoner's dilemma), monopoly, contestable markets, natural monopoly
7. The Labour Market: wage determination, MRP, derived demand, trade unions, monopsony, minimum/maximum wages, discrimination

### Component 02 Topics:
1. Aggregate Demand and Aggregate Supply: components of AD, multiplier, SRAS/LRAS (Classical vs Keynesian)
2. Economic Policy Objectives: growth, inflation, unemployment, balance of payments, conflicts between objectives
3. Implementing Policy: fiscal policy, monetary policy (Bank of England, QE), supply-side policies (market-based vs interventionist)
4. The Global Context: globalisation, comparative advantage, free trade vs protectionism, WTO, exchange rates, balance of payments, J-curve
5. The Financial Sector: role of banks, financial markets, regulation, systemic risk, moral hazard, 2008 crisis

## OCR COMMAND WORDS (from specification section 3c)
- "Explain" = demonstrate knowledge + apply to context [4-8 marks]
- "Explain, with the aid of a diagram" = explain + construct/label diagram + describe what it illustrates [8 marks]
- "Evaluate" = explain + weigh both sides + compare alternatives + supported judgement [16-25 marks]
- "Calculate" = apply quantitative skills [2-4 marks]

## OCR ASSESSMENT OBJECTIVES
- AO1: Knowledge and understanding (25-30%)
- AO2: Application (25-30%)
- AO3: Analysis (20-25%)
- AO4: Evaluation (20-25%)

## EVALUATION TECHNIQUES (from Evaluation Techniques Guide)
1. **Magnitude**: How large/small are the changes? Put in context as % changes
2. **Significance**: How large an impact regardless of magnitude? Consider proportion of total cost, elasticity
3. **Time-lags**: Effects may take months/years to materialise
4. **Stakeholder impact**: Different groups affected differently (consumers, producers, government, workers)
5. **Elasticity considerations**: Impact depends on PED/PES/YED
6. **Short run vs Long run**: Different outcomes over different time horizons
7. **Ceteris paribus**: Drop the assumption — what else might change simultaneously?
8. **Real-world evidence**: Reference specific countries, policies, data

## ESSAY PLANNING FRAMEWORK
1. Introduction: Define key terms, outline approach
2. KAA Paragraph 1: Point → Evidence → Analysis → Link (with diagram)
3. KAA Paragraph 2: Second chain of reasoning
4. Evaluation Paragraph 1: Counter-argument with evidence
5. Evaluation Paragraph 2: "It depends on..." factors
6. Conclusion: Weighed judgement with justification

## DIAGRAM REQUIREMENTS (from OCR mark schemes)
- Supply & Demand: P on y-axis, Q on x-axis, D₁/S₁, shifted D₂/S₂, E₁→E₂
- AD/AS: Price Level on y-axis, Real GDP on x-axis, AD, SRAS, LRAS
- Cost Curves: MC, AC, AR=D, MR, profit-max at MC=MR
- Externalities: MSC/MPC or MSB/MPB, Qm vs Qs, welfare loss triangle
- Labour Market: Wage on y-axis, Quantity of Labour on x-axis, MRP=D, S=ACL
- PPF: Concave curve, points inside/on/outside

## MARK ALLOCATION
- 2-mark: define/calculate
- 4-mark: explain with reasoning
- 8-mark: explain with diagram (KAA)
- 16-mark: evaluate (8 KAA + 8 Evaluation)
- 25-mark: extended evaluation essay (12 KAA + 13 Evaluation)

## REAL-WORLD EXAMPLES TO USE
- UK energy crisis 2022-23, Bank of England rate rises (0.1%→5.25%), NHS staffing crisis
- China's economic slowdown 2023-24, US-China trade tensions, CPTPP
- Climate change policies (net zero 2050), carbon pricing, green subsidies
- AI and automation impact on labour markets, gig economy regulation
- Post-COVID recovery, cost of living crisis, inequality widening
`;

export const EDEXCEL_B_PAST_PAPER_KNOWLEDGE = `
YOU MUST USE THE FOLLOWING REAL PAST-PAPER PATTERNS FROM EDEXCEL A-LEVEL ECONOMICS B (9EB0) (2017–2024) TO GENERATE AUTHENTIC QUESTIONS.

## PAPER STRUCTURE

### Paper 1: Markets, Consumers and Firms (9EB0/01) — 2 hours, 80 marks
- Section A: Data Response (compulsory — 40 marks)
  - Case study with 3-4 Extracts (text + data tables/charts)
  - Question pattern: 4 marks → 8 marks → 10 marks → 18 marks
  - 8-mark questions typically require "Using a diagram, explain..."
  - 18-mark questions require sustained evaluation with judgement
- Section B: Essay (choose ONE from THREE — 40 marks)
  - Single extended essay requiring full KAA + Evaluation
  - Topics: demand/supply, elasticity, market failure, business objectives, costs/revenue, market structures, labour market, behavioural economics

### Paper 2: The Wider Economic Environment (9EB0/02) — 2 hours, 80 marks
- Same structure as Paper 1 but MACRO topics
- Section A: compulsory data response on UK macro performance (40 marks)
- Section B: essay choice on macro policy (40 marks)
- Topics: economic indicators, AD/AS, macro objectives conflicts, policy effectiveness, financial sector, inequality, role of the state

### Paper 3: The Global Economy (9EB0/03) — 2 hours, 80 marks
- SYNOPTIC PAPER — requires micro + macro integration
- Section A: Data Response (compulsory — 40 marks)
  - Global case study with extracts on trade, development, globalisation, emerging economies
- Section B: Essay (choose ONE from THREE — 40 marks)
  - Global economy themes requiring synoptic micro + macro links
  - Topics: globalisation, trade agreements, WTO, trading blocs, FDI, development strategies, exchange rates, financial markets

## REAL QUESTION PATTERNS (from 2017–2024 Edexcel B papers)

### Theme 1: Markets, Consumers and Firms
- 2024 P1: "Using a diagram, explain how an increase in the minimum wage affects employment in the UK retail sector." [8 marks]
- 2023 P1: "Evaluate the view that monopolies always act against the consumer interest." [18 marks]
- 2022 P1: "Using a diagram, explain why negative externalities lead to market failure." [8 marks]
- 2021 P1: "Assess the effectiveness of different government policies to correct the market failure caused by pollution." [10 marks]
- 2019 P1: "Using a diagram, analyse the impact of an increase in indirect tax on the market for cigarettes." [8 marks]

### Theme 2: The Wider Economic Environment
- 2024 P2: "Using an AD/AS diagram, analyse the likely impact of a rise in Bank of England base rate on the UK economy." [8 marks]
- 2023 P2: "Evaluate the effectiveness of fiscal policy as a tool for achieving macroeconomic stability." [18 marks]
- 2022 P2: "Assess whether supply-side policies are more effective than demand-side policies in promoting long-term growth." [10 marks]
- 2021 P2: "Using an AD/AS diagram, explain the short-run and long-run effects of the COVID pandemic." [8 marks]
- 2019 P2: "Evaluate the extent to which monetary policy has been effective in controlling UK inflation since 2010." [18 marks]

### Theme 3: The Global Economy
- 2024 P3: "Using the theory of comparative advantage, explain the benefits of free trade between two countries." [8 marks]
- 2023 P3: "Evaluate the impact of globalisation on income inequality within and between countries." [18 marks]
- 2022 P3: "Assess the effectiveness of protectionist policies in promoting economic development." [10 marks]
- 2021 P3: "Evaluate the role of international institutions (WTO, IMF, World Bank) in promoting global economic stability." [18 marks]
- 2019 P3: "Using examples, assess the impact of foreign direct investment on economic development in Sub-Saharan Africa." [10 marks]

### 40-mark Essay Patterns (Section B):
- 2024 P1 Essay: "Evaluate the view that contestable markets always produce better outcomes for consumers than monopolistic markets." [40 marks]
- 2023 P2 Essay: "Evaluate the effectiveness of supply-side policies in achieving sustainable economic growth in the UK." [40 marks]
- 2022 P3 Essay: "Evaluate the view that free trade is always preferable to protectionism for developing economies." [40 marks]
- PATTERN: 40-mark essays require minimum 4 developed paragraphs (2 KAA + 2 Evaluation) plus introduction and conclusion
- Mark scheme: 20 KAA + 20 Evaluation
  - KAA (up to 20): definitions (2), application to context (4), analysis chain 1 with diagram (7), analysis chain 2 (7)
  - Evaluation (up to 20): counter-argument 1 (5), counter-argument 2 (5), "it depends" factors (5), justified final judgement (5)

## EDEXCEL B EVALUATION FRAMEWORK
- **Short run vs Long run**: Different outcomes over different time horizons
- **Depends on context**: State of economy, type of market, country-specific factors
- **Depends on magnitude**: Size of tax/subsidy/policy change matters
- **Stakeholder analysis**: Consumers vs producers vs government vs workers
- **Unintended consequences**: Government failure, regulatory capture, bureaucracy
- **Real-world evidence**: Reference UK data, specific policies, country case studies
- **Alternative approaches**: Compare different policy options
- **Assumptions**: Challenge ceteris paribus, rationality, perfect information

## EXAM TECHNIQUE — HOW TO WRITE A GOOD ECONOMICS ESSAY (from Guide)
1. **Read the question twice** — identify command word, topic, and scope
2. **Plan before writing** — 5-minute plan with key points and diagram(s)
3. **Define key terms** in first paragraph — shows knowledge
4. **Use diagrams** — labelled correctly, referenced in text, analysed
5. **Develop chains of reasoning** — Point → Explain → Develop → Link back
6. **Use real-world examples** — UK data, named policies, specific years
7. **Evaluate throughout** — don't save all evaluation for the end
8. **Reach a justified conclusion** — "On balance..." with reasoning

## MACRO EXAMPLES FOR EVERYTHING (from EconplusDal Guide)
### Key Real-World Examples to Reference:
- **Demand-pull inflation**: UK 2021-22 post-COVID demand surge, US stimulus checks
- **Cost-push inflation**: UK energy crisis 2022 (gas prices +300%), food price inflation
- **Structural unemployment**: UK coal mining 1980s, Detroit auto industry decline
- **Cyclical unemployment**: UK 2008-09 recession (unemployment 2.6m)
- **Supply-side success**: UK privatisation 1980s (BT, BA), Singapore education investment
- **Fiscal policy**: UK furlough scheme 2020 (£70bn), Sunak's Eat Out to Help Out
- **Monetary policy**: Bank of England QE £895bn, rate rises 2022-23 (0.1% → 5.25%)
- **Current account deficit**: UK persistent deficit (~4% GDP), caused by deindustrialisation
- **Exchange rate**: Sterling crash post-Brexit vote (1.50→1.20 vs USD), 2022 mini-budget crash
- **Inequality**: UK Gini coefficient ~0.35, top 1% own 21% of wealth
- **Development**: China lifting 800m from poverty, India's IT sector growth
- **Trade**: UK-Australia FTA 2021, CPTPP accession 2023

## DIAGRAM REQUIREMENTS (same standards as Edexcel A)
Mark schemes award: 1 mark for correct axes, 1 mark for correct curves, 1 mark for correct shift/labels, 1 mark for correct analysis linked to diagram

## COMMAND WORDS
- "Explain" = develop a point with reasoning [4-8 marks]
- "Analyse" = chains of reasoning, cause→effect→consequence [8-10 marks]
- "Assess" = weigh up evidence, make a judgement [10-18 marks]
- "Evaluate" = sustained argument for and against with justified conclusion [18-40 marks]
- "Using a diagram" = diagram REQUIRED
- "With reference to the data/extracts" = MUST cite specific data
`;
