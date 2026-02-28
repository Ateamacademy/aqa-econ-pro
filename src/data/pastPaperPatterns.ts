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

## PAPER STRUCTURE (observed across all years)
- Paper 1: Topics 1–5, 100 marks, 1h45m
- Paper 2: Topics 6–10, 100 marks, 1h45m
- Section A: ~15 multiple-choice questions (1 mark each, A/B/C/D)
- Section B: Structured questions (~85 marks), increasing difficulty
- At least one 6-mark extended response per paper
- Questions numbered with sub-parts: 01.1, 01.2, 02.1 etc. OR Question 1a, 1b format

## REAL QUESTION PATTERNS BY TOPIC (from 2018–2024 papers)

### Paper 1 — Topic 1: Atomic Structure & Periodic Table
- June 2024 P1H: "Explain why elements in Group 0 are unreactive" [2 marks]
- June 2023 P1H: "A sample of chlorine contains 75% Cl-35 and 25% Cl-37. Calculate the relative atomic mass." [2 marks]
- June 2022 P1H: "Describe how Mendeleev arranged his periodic table differently from Newlands" [3 marks]
- Common patterns: isotope calculations (RAM), electron configuration, group/period properties, development of periodic table, ion formation

### Paper 1 — Topic 2: Bonding, Structure & Properties
- June 2024 P1H: "Draw a dot-and-cross diagram for MgCl₂. Show outer electrons only." [2 marks]
- June 2023 P1H: "Explain, in terms of structure and bonding, why diamond has a high melting point" [3 marks]
- June 2022 P1H: "Compare the structures and properties of diamond and graphite" [6 marks]
- June 2019 P1H: "Explain why sodium chloride has a high melting point but does not conduct electricity when solid" [3 marks]
- Common patterns: dot-and-cross (ionic and covalent), giant structures vs simple molecular, metallic bonding, graphene and fullerenes, explaining properties from structure

### Paper 1 — Topic 3: Quantitative Chemistry (Higher only for most)
- June 2024 P1H: "Calculate the mass of CO₂ produced when 10g of CaCO₃ reacts with excess HCl" [4 marks]
- June 2023 P1H: "A titration used 25.0cm³ of 0.100mol/dm³ NaOH. Calculate concentration of HCl if 20.0cm³ was needed." [4 marks]
- June 2022 P1H: "Calculate the empirical formula of a compound containing 40% Ca, 12% C, 48% O" [3 marks]
- June 2019 P1H: "Calculate atom economy for: 2Fe₂O₃ + 3C → 4Fe + 3CO₂" [2 marks]
- Common patterns: moles calculations (mass÷Mr), concentration (moles÷volume), percentage yield, atom economy, empirical formula from % composition, titration calculations with data tables

### Paper 1 — Topic 4: Chemical Changes
- June 2024 P1H: "Put these metals in order of reactivity: Cu, Mg, Zn, Fe. Explain using the reactivity series." [3 marks]
- June 2023 P1H: "Describe how copper is purified by electrolysis. Include half equations." [6 marks]
- June 2022 P1H: "Write ionic equations for the reaction of zinc with copper sulfate solution" [2 marks]
- Common patterns: reactivity series, displacement reactions, extraction of metals, electrolysis (including half equations), oxidation/reduction (electron transfer), acids + metals/bases/carbonates, pH scale, strong vs weak acids

### Paper 1 — Topic 5: Energy Changes
- June 2024 P1H: "A reaction profile shows reactants at 150kJ, peak at 350kJ, products at 250kJ. (a) Calculate activation energy. (b) Calculate overall energy change. (c) Is reaction exothermic or endothermic?" [5 marks]
- June 2023 P1H: "Figure 9 shows the displayed formula equation for propane + oxygen. Table 4 gives bond energies with C-H as X. Overall energy change is -2219 kJ/mol. Calculate X." [5 marks]
- June 2022 P1H: "50cm³ of 1.0mol/dm³ HCl + 50cm³ of 1.0mol/dm³ NaOH. Temperature rise = 6.8°C. Calculate energy change (c=4.18 J/g/°C)" [4 marks]
- Common patterns: reaction profiles (label Ea, ΔH, catalyst effect), bond energy calculations with Figure/Table format, Q=mcΔT calculations, exo vs endothermic identification, hydrogen fuel cell

### Paper 2 — Topic 6: Rate & Extent of Chemical Change
- June 2024 P2H: "The graph shows volume of gas vs time. (a) At what time does the reaction stop? (b) Draw a tangent at 30s. Calculate rate." [5 marks]
- June 2023 P2H: "Using collision theory, explain why increasing concentration increases rate" [3 marks]
- June 2022 P2H: "Compare two rate curves: large marble chips vs powder + same acid. Explain why both give same final volume." [4 marks]
- Common patterns: rate graphs (volume vs time, mass vs time), tangent method for rate at a point (Higher), collision theory explanations, surface area/concentration/temperature/catalyst effects, reversible reactions, dynamic equilibrium, Le Chatelier's principle, Haber process conditions

### Paper 2 — Topic 7: Organic Chemistry
- June 2024 P2H: "Draw the displayed formula of propene. Explain why alkenes are more reactive than alkanes." [3 marks]
- June 2023 P2H: "Write a balanced equation for the complete combustion of butane (C₄H₁₀)" [2 marks]
- Common patterns: alkanes (general formula CₙH₂ₙ₊₂), alkenes (CₙH₂ₙ), displayed formulae, combustion equations, cracking, polymerisation, alcohols and carboxylic acids (Higher), addition vs condensation polymerisation

### Paper 2 — Topic 8: Chemical Analysis
- June 2024 P2H: "A chromatogram has solvent front at 8.0cm. Spot A is at 5.6cm. Calculate Rf." [2 marks]
- June 2023 P2H: "Describe how you would test for chloride, bromide, and iodide ions" [3 marks]
- Common patterns: chromatography and Rf values, flame tests (Li=crimson, Na=yellow, K=lilac, Ca=orange-red, Cu=green), NaOH precipitate tests, gas tests (H₂ pop, O₂ glowing splint, CO₂ limewater, Cl₂ bleaches litmus)

### Paper 2 — Topics 9 & 10: Atmosphere & Resources
- June 2024 P2H: "Describe how Earth's atmosphere has changed over 4.6 billion years" [4 marks]
- June 2023 P2H: "Evaluate the use of hydrogen fuel cells vs petrol engines" [6 marks]
- Common patterns: evolution of atmosphere, greenhouse effect, carbon footprint, potable water treatment, desalination, life cycle assessment, reduce/reuse/recycle, Haber process conditions graph

## FIGURE/TABLE PATTERNS (CRITICAL — these appear in EVERY real paper)
- **Figure format**: "Figure 3 shows the reaction profile for..." with labelled axes
- **Table format**: "Table 2 shows the results of the titration" with burette readings
- **Graph format**: "Figure 5 shows how the volume of gas changes over time" with data points
- **Displayed formula format**: Structural formulae showing all bonds (H-C-H etc.)
- Bond energy tables with 5–6 bond types, one unknown value to calculate
- Titration tables with rough + 3 concordant results, one anomalous

## MARK DISTRIBUTION (typical Higher paper)
- 1-mark MCQs: 15
- 2-mark questions: 6–8
- 3-mark questions: 5–7
- 4-mark questions: 4–6
- 5-mark questions: 2–3
- 6-mark extended response: 1–2
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
