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

## PAPER STRUCTURE (observed across all years)

### Paper 1: Markets and Market Failure (Microeconomics)
- 80 marks, 2 hours
- Section A: Data Response (context + extract + data, ~40 marks)
  - Q1.1: Define/State [2 marks]
  - Q1.2: Calculate from data [4 marks]  
  - Q1.3: Explain using diagram [9 marks]
  - Q1.4: Evaluate/Discuss [25 marks]
- Section B: Essay Choice (2 from 3, 25 marks each)
  - Always includes "Evaluate", "Discuss", or "To what extent"

### Paper 2: National and International Economy (Macroeconomics)
- 80 marks, 2 hours
- Same structure as Paper 1 but macroeconomic topics
- Data extracts include UK GDP, inflation, unemployment, trade figures

### Paper 3: Economic Principles and Issues (Synoptic)
- 80 marks, 2 hours
- Section A: 30 MCQs [30 marks]
- Section B: Case study with data + questions [50 marks]
  - Mix of short (2–4 mark) and long (9–25 mark) questions

## REAL QUESTION PATTERNS BY TOPIC (from 2017–2024 papers)

### Paper 1 — Microeconomics
- June 2024 P1: "Using Figure 1, calculate the percentage change in UK house prices between 2020 and 2023." [4 marks]
- June 2024 P1: "Using a supply and demand diagram, explain the likely effect on the market for private rented accommodation of a rent cap below the equilibrium price." [9 marks]
- June 2023 P1: "Evaluate the view that government intervention is always necessary to correct market failure in the provision of healthcare." [25 marks]
- June 2022 P1: "With the help of a diagram, explain how a negative externality leads to market failure." [9 marks]
- June 2019 P1: "Using a diagram, explain how a monopolist determines its profit-maximising level of output and price." [9 marks]
- Common patterns: PED/YED/XED calculations, consumer/producer surplus diagrams, market failure (externalities, public goods, information failure, merit/demerit goods), government intervention (taxes, subsidies, regulation, tradeable permits), monopoly vs perfect competition, contestable markets, labour markets, poverty and inequality

### Paper 2 — Macroeconomics
- June 2024 P2: "Using an AD/AS diagram, explain the likely impact on the UK economy of a significant increase in interest rates." [9 marks]
- June 2024 P2: "Evaluate the effectiveness of supply-side policies in achieving sustained economic growth." [25 marks]
- June 2023 P2: "Using the data in Extract B, calculate the UK's balance of trade in goods for 2022." [2 marks]
- June 2023 P2: "If the MPC is 0.8, calculate the multiplier. Hence calculate the total impact on GDP of a £5 billion increase in government spending." [4 marks]
- June 2022 P2: "Using an AD/AS diagram, evaluate the likely impact of Brexit on the UK economy." [25 marks]
- June 2019 P2: "Explain, using a Phillips Curve diagram, the relationship between unemployment and inflation." [9 marks]
- Common patterns: AD/AS analysis (Classical vs Keynesian LRAS), fiscal/monetary/supply-side policies, multiplier calculations, Phillips Curve, balance of payments, exchange rates, economic growth vs inflation trade-off, globalisation, inequality, UK economic data interpretation

### Paper 3 — Synoptic MCQs
- MCQ topics span micro AND macro
- Always 30 questions, each 1 mark
- Cover: opportunity cost, PPF, elasticity calculations, market structures, AD/AS shifts, fiscal policy, trade, exchange rates
- Distractors are realistic and test common misconceptions

### Data Extract Patterns (CRITICAL — appears in every paper)
- Always includes a contextual passage (200–400 words) with real-looking statistics
- Includes at least one data table or graph
- Data references real UK/world events:
  - 2024: Cost of living crisis, interest rate rises, AI impact on labour markets
  - 2023: Post-COVID recovery, energy price shocks, NHS waiting lists
  - 2022: Ukraine conflict, supply chain disruptions, inflation surge
  - 2019: Brexit uncertainty, trade negotiations
  - 2018: Gig economy, housing market
  - 2017: Trump tariffs, productivity puzzle

### Diagram Requirements (from mark schemes)
- **Supply & Demand**: Correctly labelled axes (P on y, Q on x), original and shifted curves, equilibrium labels (P₁, Q₁, P₂, Q₂), arrows showing direction of shift
- **AD/AS**: Real output on x-axis, Price level on y-axis, distinguish SRAS from LRAS, show shift direction, label old and new equilibria
- **Cost curves**: MC, AC (U-shaped), AR=D (downward sloping for monopoly), MR (below AR for monopoly), profit area shaded
- **Externalities**: MSC/MPC or MSB/MPB divergence, welfare loss triangle shaded, optimal vs free-market output labelled
- Mark schemes award: 1 mark for correct axes, 1 mark for correct curves, 1 mark for correct shift, 1 mark for correct labels

## COMMAND WORD MEANINGS (from AQA mark schemes)
- "State" / "Identify" = 1 mark, no explanation needed
- "Calculate" = show working, final answer
- "Explain" = state + develop + apply (KAA marks)
- "Analyse" = chains of reasoning, cause→effect→consequence
- "Evaluate" / "Discuss" / "To what extent" = KAA + counterargument + weighing up + judgement
- "Using a diagram" = diagram is REQUIRED for full marks

## MARK DISTRIBUTION
- 2-mark: define/state (no diagram)
- 4-mark: calculate or short explain
- 9-mark: explain using diagram (typically 4 KAA + 5 for depth/context)
- 25-mark: evaluate essay (typically 12 KAA + 13 evaluation including judgement)
`;
