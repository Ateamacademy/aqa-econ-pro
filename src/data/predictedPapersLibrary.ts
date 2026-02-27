/**
 * 10 pre-generated predicted papers: 5 Maths (Foundation + Higher across papers) and 5 Economics.
 * Each paper contains questions in the format the parser expects.
 */

export interface PredictedPaper {
  id: string;
  subject: "maths" | "economics" | "chemistry";
  paper: string; // "1" | "2" | "3"
  tier?: "Foundation" | "Higher";
  title: string;
  description: string;
  totalMarks: number;
  content: string; // markdown with questions in "Question N [M marks]" format
}

export const predictedPapersLibrary: PredictedPaper[] = [
  // ── MATHS PAPER 1: Higher (Non-Calculator) ──
  {
    id: "maths-p1-higher-a",
    subject: "maths",
    paper: "1",
    tier: "Higher",
    title: "Paper 1 Higher — Set A",
    description: "Non-Calculator. Covers algebra, fractions, geometry, proof, and surds.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) — Paper 1 Higher (Non-Calculator) — Predicted Paper Set A

**Time: 1 hour 30 minutes | Total: 80 marks**

Answer ALL questions. Show all your working out.

Question 1 [2 marks]
Work out $\\dfrac{3}{4} + \\dfrac{2}{5}$. Give your answer as a fraction in its simplest form.

Question 2 [2 marks]
Simplify $5x^3 \\times 2x^{-1}$.

Question 3 [3 marks]
Expand and simplify $(3x + 2)(x - 5)$.

Question 4a [2 marks]
Write $0.000\\,045\\,6$ in standard form.

Question 4b [2 marks]
Calculate $\\dfrac{3.2 \\times 10^5}{4 \\times 10^{-2}}$. Give your answer in standard form.

Question 5 [3 marks]
There are only red and blue counters in a bag. The ratio of red to blue counters is $3:7$. There are 40 counters in total. How many red counters are there?

Question 6 [3 marks]
Solve $\\dfrac{2x + 1}{3} = \\dfrac{x - 2}{4}$.

Question 7 [4 marks]
A right-angled triangle has a base of $6$ cm and a hypotenuse of $10$ cm. Calculate the area of the triangle.

Question 8 [3 marks]
Factorise completely $6x^2 - 9x$.

Question 9 [4 marks]
The nth term of a sequence is $n^2 + 3n$. Find the first term that is greater than 100.

Question 10 [3 marks]
Simplify $\\dfrac{\\sqrt{50}}{\\sqrt{2}}$.

Question 11 [4 marks]
The diagram shows a trapezium with parallel sides of length $8$ cm and $12$ cm. The perpendicular height is $5$ cm. Calculate the area of the trapezium. A triangle is then cut from the trapezium with base $4$ cm and height $5$ cm. Find the remaining area.

Question 12 [4 marks]
Solve the simultaneous equations:
$$2x + 3y = 13$$
$$4x - y = 5$$

Question 13 [3 marks]
A price decreases from £240 to £198. Calculate the percentage decrease.

Question 14 [4 marks]
Show that $\\dfrac{x^2 - 9}{x^2 + 5x + 6} = \\dfrac{x - 3}{x + 2}$.

Question 15 [4 marks]
The probability that it rains on any given day is $0.3$. The probability it rains on two consecutive days is required. Draw a probability tree diagram and find the probability it rains on exactly one of the two days.

Question 16 [5 marks]
Prove algebraically that the difference between the squares of any two consecutive odd numbers is always a multiple of $8$.

Question 17 [4 marks]
A sector of a circle has radius $8$ cm and angle $135°$. Calculate the exact area of the sector. Give your answer in terms of $\\pi$.

Question 18 [5 marks]
Rearrange $y = \\dfrac{3x + 2}{x - 1}$ to make $x$ the subject.

Question 19 [5 marks]
A cuboid has a square base of side $x$ cm and height $h$ cm. The total surface area is $150$ cm². Show that the volume $V$ of the cuboid can be written as $V = \\dfrac{x(150 - 2x^2)}{4}$.

Question 20 [4 marks]
Sketch the graph of $y = x^2 - 4x + 3$, labelling the turning point and the roots.

Question 21 [4 marks]
Without a calculator, find the exact value of $\\sin 60° \\times \\cos 30° + \\sin 30° \\times \\cos 60°$.

Question 22 [3 marks]
Solve the inequality $3x^2 - 12 < 0$. Show your solution on a number line.`,
  },

  // ── MATHS PAPER 1: Foundation (Non-Calculator) ──
  {
    id: "maths-p1-foundation-a",
    subject: "maths",
    paper: "1",
    tier: "Foundation",
    title: "Paper 1 Foundation — Set A",
    description: "Non-Calculator. Covers core number, basic algebra, geometry, and data handling.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) — Paper 1 Foundation (Non-Calculator) — Predicted Paper Set A

**Time: 1 hour 30 minutes | Total: 80 marks**

Answer ALL questions. Show all your working out.

Question 1 [1 marks]
Write the number 4072 in words.

Question 2 [2 marks]
Work out $456 + 278$.

Question 3 [2 marks]
Write these numbers in order of size, starting with the smallest: $0.32$, $0.3$, $0.302$, $0.032$.

Question 4 [2 marks]
Find $\\dfrac{1}{4}$ of £360.

Question 5 [2 marks]
Simplify $3a + 5b - a + 2b$.

Question 6 [3 marks]
A shop sells pens for 45p each. Priya buys 7 pens. How much change does she get from a £5 note?

Question 7 [2 marks]
What is the name of a shape with 6 sides?

Question 8 [3 marks]
Draw the line of symmetry on a shape described as an isosceles triangle with vertices at $(0, 0)$, $(4, 0)$, and $(2, 3)$.

Question 9 [3 marks]
A bag contains 3 red balls, 5 blue balls, and 2 green balls. A ball is picked at random. What is the probability the ball is blue?

Question 10 [3 marks]
The bar chart shows the number of pets owned by students in a class: Dog: 8, Cat: 6, Fish: 3, Hamster: 2, None: 5. How many students are in the class altogether?

Question 11 [3 marks]
Work out $2\\dfrac{1}{3} + 1\\dfrac{2}{5}$. Give your answer as a mixed number.

Question 12 [3 marks]
Solve $5x - 3 = 17$.

Question 13 [3 marks]
Calculate the area of a rectangle with length $12$ cm and width $7$ cm.

Question 14 [4 marks]
A map has a scale of $1:25000$. Two villages are $8$ cm apart on the map. What is the real distance in kilometres?

Question 15 [3 marks]
Increase £450 by 15%.

Question 16 [4 marks]
The table shows test scores: 5, 7, 3, 8, 6, 4, 7, 9, 5, 6. Find the mean, median, and range.

Question 17 [3 marks]
Convert $\\dfrac{7}{20}$ to (a) a decimal and (b) a percentage.

Question 18 [4 marks]
A straight line passes through points $(0, 2)$ and $(3, 8)$. Find the equation of the line in the form $y = mx + c$.

Question 19 [4 marks]
A tin of beans weighs 420 g. A box holds 24 tins. What is the total weight of the tins in kilograms?

Question 20 [4 marks]
The angles in a triangle are $x$, $2x$, and $3x$. Find the value of $x$ and state the size of each angle.

Question 21 [4 marks]
Tom earns £9.50 per hour. He works 35 hours per week. He pays $\\dfrac{1}{5}$ of his earnings in tax. How much does he take home per week?

Question 22 [4 marks]
A circle has diameter $14$ cm. Calculate the circumference. Use $\\pi = \\dfrac{22}{7}$.

Question 23 [4 marks]
Write $60$ as a product of its prime factors. Use your answer to find the Highest Common Factor of $60$ and $84$.

Question 24 [4 marks]
Jess buys a sofa for £800. She pays a deposit of 30% and then 10 equal monthly payments. Calculate the monthly payment.`,
  },

  // ── MATHS PAPER 2: Higher (Calculator) ──
  {
    id: "maths-p2-higher-a",
    subject: "maths",
    paper: "2",
    tier: "Higher",
    title: "Paper 2 Higher — Set A",
    description: "Calculator allowed. Covers trigonometry, statistics, compound interest, and circle theorems.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) — Paper 2 Higher (Calculator) — Predicted Paper Set A

**Time: 1 hour 30 minutes | Total: 80 marks | Calculator ALLOWED**

Answer ALL questions. Show all your working out.

Question 1 [2 marks]
A car travels 156 miles in 2 hours 24 minutes. Calculate the average speed in mph.

Question 2 [3 marks]
£5000 is invested at 2.5% compound interest per annum. Calculate the value after 3 years.

Question 3 [3 marks]
Solve $3x^2 - 7x + 2 = 0$. Give your answers correct to 2 decimal places.

Question 4 [3 marks]
The table shows the marks scored by 100 students in a test:
| Marks | 0–20 | 21–40 | 41–60 | 61–80 | 81–100 |
|-------|------|-------|-------|-------|--------|
| Frequency | 5 | 18 | 35 | 30 | 12 |

Calculate an estimate of the mean mark.

Question 5 [4 marks]
A triangle has sides of length $7$ cm, $9$ cm, and an included angle of $65°$. Calculate the area of the triangle.

Question 6 [3 marks]
Express $\\dfrac{2}{x + 3} + \\dfrac{5}{x - 1}$ as a single fraction.

Question 7 [4 marks]
A cone has radius $4$ cm and slant height $10$ cm. Calculate the total surface area. Give your answer correct to 3 significant figures.

Question 8 [4 marks]
The cumulative frequency diagram for the weights (in kg) of 60 parcels is described by these points: $(0, 0)$, $(1, 4)$, $(2, 15)$, $(3, 32)$, $(4, 48)$, $(5, 58)$, $(6, 60)$. Estimate the median weight and the interquartile range.

Question 9 [4 marks]
Use the iteration formula $x_{n+1} = \\sqrt[3]{5x_n + 2}$ with $x_0 = 2$ to find the values of $x_1$, $x_2$, and $x_3$. Give your answers correct to 4 decimal places.

Question 10 [5 marks]
In the diagram, $AB$ is a diameter of the circle. $C$ is a point on the circumference. Angle $BAC = 35°$. Find angle $ACB$ and angle $ABC$. Give reasons for each step. (Circle theorem: angle in a semicircle is $90°$.)

Question 11 [4 marks]
A boat sails $15$ km on a bearing of $040°$ from port $A$ to point $B$, then $20$ km on a bearing of $130°$ from $B$ to point $C$. Calculate the direct distance from $A$ to $C$.

Question 12 [4 marks]
$y$ is inversely proportional to the square of $x$. When $x = 3$, $y = 4$. Find $y$ when $x = 6$.

Question 13 [4 marks]
Simplify fully $\\dfrac{x^2 - 4}{x^2 + x - 6}$.

Question 14 [5 marks]
A frustum is made by removing a small cone (radius $2$ cm, height $3$ cm) from the top of a larger cone (radius $6$ cm, height $9$ cm). Calculate the volume of the frustum. Give your answer in terms of $\\pi$.

Question 15 [4 marks]
The functions $f(x) = 2x + 3$ and $g(x) = x^2 - 1$. Find $fg(x)$ and solve $fg(x) = 13$.

Question 16 [5 marks]
A histogram shows the times (in minutes) taken to complete a puzzle. The class intervals are: $0 < t \\le 5$ (freq density 2), $5 < t \\le 10$ (freq density 6), $10 < t \\le 15$ (freq density 4), $15 < t \\le 25$ (freq density 1.5). Calculate the total number of people and estimate how many took more than 12 minutes.

Question 17 [4 marks]
Two vectors are given: $\\vec{a} = \\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}$ and $\\vec{b} = \\begin{pmatrix} -2 \\\\ 5 \\end{pmatrix}$. Find $2\\vec{a} + 3\\vec{b}$ and find the magnitude of $\\vec{a} - \\vec{b}$.

Question 18 [5 marks]
Show that $\\dfrac{1}{\\sqrt{3} - 1} = \\dfrac{\\sqrt{3} + 1}{2}$ by rationalising the denominator.`,
  },

  // ── MATHS PAPER 3: Higher (Calculator) ──
  {
    id: "maths-p3-higher-a",
    subject: "maths",
    paper: "3",
    tier: "Higher",
    title: "Paper 3 Higher — Set A",
    description: "Calculator allowed. Mixed topics with problem-solving and reasoning.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) — Paper 3 Higher (Calculator) — Predicted Paper Set A

**Time: 1 hour 30 minutes | Total: 80 marks | Calculator ALLOWED**

Answer ALL questions. Show all your working out.

Question 1 [2 marks]
Write $\\dfrac{7}{8}$ as a decimal.

Question 2 [3 marks]
A shop sells bags of sweets. Small bags contain 12 sweets and cost £1.20. Large bags contain 20 sweets and cost £1.80. Which bag is better value for money? Show your working.

Question 3 [3 marks]
Solve $\\dfrac{5(x - 2)}{3} = x + 1$.

Question 4 [4 marks]
A rectangle has length $(2x + 3)$ cm and width $(x - 1)$ cm. The area is $65$ cm². Form an equation and solve it to find the dimensions of the rectangle.

Question 5 [3 marks]
$y$ is directly proportional to $\\sqrt{x}$. When $x = 16$, $y = 12$. Find $y$ when $x = 25$.

Question 6 [4 marks]
The graph of $y = f(x)$ passes through $(2, 5)$. Write down the coordinates of the corresponding point on the graph of (a) $y = f(x) + 3$, (b) $y = f(x - 4)$, (c) $y = 2f(x)$, (d) $y = f(-x)$.

Question 7 [4 marks]
A solid hemisphere has radius $6$ cm. Calculate the total surface area. Give your answer correct to 3 significant figures.

Question 8 [4 marks]
There are 200 students in Year 11. The table shows the number achieving each grade in English:
| Grade | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 |
|-------|---|---|---|---|---|---|---|---|---|
| Students | 5 | 12 | 28 | 40 | 55 | 35 | 15 | 7 | 3 |
A student is picked at random. Find the probability they got grade 7 or above.

Question 9 [5 marks]
Two similar vases have heights $12$ cm and $18$ cm. The smaller vase holds $400$ ml. Calculate the capacity of the larger vase.

Question 10 [4 marks]
Use trigonometry: A ladder of length $5.2$ m leans against a wall. The foot of the ladder is $1.5$ m from the base of the wall. Calculate the angle the ladder makes with the ground.

Question 11 [5 marks]
Prove that the sum of any three consecutive integers is always divisible by $3$.

Question 12 [4 marks]
A box contains red, blue, and yellow counters. The probability of picking red is $0.3$ and the probability of picking blue is $0.45$. There are 60 counters in the box. How many yellow counters are there?

Question 13 [4 marks]
The nth term of a quadratic sequence is $an^2 + bn + c$. The first three terms are $3, 10, 21$. Find $a$, $b$, and $c$.

Question 14 [5 marks]
Triangle $PQR$ has $PQ = 8$ cm, $QR = 11$ cm, and angle $PQR = 52°$. Use the cosine rule to find $PR$.

Question 15 [4 marks]
Solve the simultaneous equations:
$$x^2 + y^2 = 25$$
$$y = 2x - 1$$

Question 16 [5 marks]
A velocity–time graph shows an object accelerating uniformly from $5$ m/s to $17$ m/s over $4$ seconds, then travelling at constant velocity for $6$ seconds. Find (a) the acceleration during the first $4$ seconds, (b) the total distance travelled.

Question 17 [5 marks]
$OABC$ is a parallelogram. $\\vec{OA} = \\mathbf{a}$, $\\vec{OC} = \\mathbf{c}$. $M$ is the midpoint of $AB$. $N$ is the point on $OB$ such that $ON:NB = 2:1$. Show that $M$, $N$, and $C$ are collinear.

Question 18 [2 marks]
Given that $f(x) = \\dfrac{1}{x}$, find $f^{-1}(x)$ and state the value of $x$ for which $f(x)$ is undefined.`,
  },

  // ── MATHS PAPER 2: Foundation (Calculator) ──
  {
    id: "maths-p2-foundation-a",
    subject: "maths",
    paper: "2",
    tier: "Foundation",
    title: "Paper 2 Foundation — Set A",
    description: "Calculator allowed. Covers percentages, area, data handling, and basic trig.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) — Paper 2 Foundation (Calculator) — Predicted Paper Set A

**Time: 1 hour 30 minutes | Total: 80 marks | Calculator ALLOWED**

Answer ALL questions. Show all your working out.

Question 1 [1 marks]
Write $0.7$ as a fraction.

Question 2 [2 marks]
Work out $\\dfrac{3}{8}$ of 640.

Question 3 [2 marks]
A bus leaves at 09:45 and arrives at 11:20. How long is the journey?

Question 4 [2 marks]
Round 6.0478 to 2 decimal places.

Question 5 [3 marks]
Ahmed earns £8.75 per hour. He works for $6\\dfrac{1}{2}$ hours. How much does he earn?

Question 6 [3 marks]
A jacket costs £85. In a sale there is 20% off. Calculate the sale price.

Question 7 [3 marks]
Draw a pie chart given: Football: 15, Rugby: 10, Tennis: 5, Swimming: 6. Total: 36 students. Calculate the angle for each sport.

Question 8 [3 marks]
A cuboid has length $8$ cm, width $5$ cm, and height $3$ cm. Calculate the volume.

Question 9 [3 marks]
Plot the graph of $y = 2x - 1$ for values of $x$ from $-2$ to $3$.

Question 10 [4 marks]
A recipe for 4 people uses 300 g flour, 200 ml milk, and 2 eggs. How much of each ingredient is needed for 10 people?

Question 11 [3 marks]
Find the highest common factor (HCF) of 36 and 48.

Question 12 [3 marks]
The probability of winning a game is $\\dfrac{2}{5}$. Ryan plays the game 40 times. Estimate the number of games he wins.

Question 13 [4 marks]
A right-angled triangle has sides $5$ cm and $12$ cm. Use Pythagoras' theorem to find the hypotenuse.

Question 14 [4 marks]
A cylinder has radius $3$ cm and height $10$ cm. Calculate the volume. Give your answer correct to 1 decimal place. (Use $\\pi$ on your calculator.)

Question 15 [3 marks]
Expand and simplify $3(2x + 1) + 4(x - 3)$.

Question 16 [4 marks]
The scatter graph shows the relationship between temperature (°C) and ice cream sales. There are 8 data points: $(15, 20)$, $(18, 35)$, $(20, 50)$, $(22, 55)$, $(25, 70)$, $(28, 85)$, $(30, 90)$, $(32, 95)$. Describe the correlation and estimate the number of ice creams sold at $24°$C.

Question 17 [4 marks]
A bank account pays 1.5% simple interest per year. £2000 is invested. How much interest is earned after 4 years?

Question 18 [4 marks]
Solve $4(3x - 2) = 5x + 13$.

Question 19 [4 marks]
Convert (a) 3.5 km to metres, (b) 4500 g to kg, (c) 2 hours 45 minutes to minutes.

Question 20 [3 marks]
A spinner has 5 equal sections numbered 1 to 5. Find the probability of spinning (a) an even number, (b) a number greater than 3.

Question 21 [4 marks]
The stem-and-leaf diagram shows ages of members in a club:
1 | 5 7 8 9
2 | 0 2 3 5 5 8
3 | 1 4 6
4 | 0 2
Find the median age and the range.

Question 22 [4 marks]
A triangle has a base of $10$ cm and an area of $35$ cm². Calculate the perpendicular height.

Question 23 [4 marks]
Share £240 in the ratio $3:5$ between two people. How much does each person receive?

Question 24 [4 marks]
A shop buys a phone for £120 and sells it for £156. Calculate the percentage profit.`,
  },

  // ── ECONOMICS PAPER 1 ──
  {
    id: "econ-p1-a",
    subject: "economics",
    paper: "1",
    title: "Paper 1 — Set A",
    description: "Markets and Market Failure. Data response and essay questions.",
    totalMarks: 80,
    content: `# AQA A-Level Economics — Paper 1: Markets and Market Failure — Predicted Paper Set A

**Time: 2 hours | Total: 80 marks**

---

## Section A: Data Response

**Context / Extract A:**

The UK government announced in 2024 that it would introduce a sugar tax on milkshakes and other high-sugar drinks not previously covered by the Soft Drinks Industry Levy (SDIL). Public Health England estimates that excess sugar consumption costs the NHS approximately £6 billion per year. Industry groups argue that the tax disproportionately affects lower-income households. Meanwhile, reformulated drinks that reduced sugar content below the levy thresholds accounted for over 50% of soft drink sales by volume in 2023.

**Extract B — Data:**

| Year | Sugary drink consumption (litres per capita) | Obesity rate (%) | SDIL revenue (£m) |
|------|----------------------------------------------|------------------|--------------------|
| 2018 | 78.4 | 28.7 | 240 |
| 2020 | 65.1 | 29.0 | 336 |
| 2022 | 58.3 | 28.5 | 380 |
| 2024 | 52.7 | 27.8 | 415 |

Question 1.1 [2 marks]
Using Extract B, calculate the percentage change in sugary drink consumption between 2018 and 2024.

Question 1.2 [4 marks]
Using a supply and demand diagram, explain how the introduction of a sugar tax would affect the market for sugary drinks.

Question 1.3 [9 marks]
Using the data and your economic knowledge, explain why the sugar tax might be considered an example of government intervention to correct market failure.

Question 1.4 [25 marks]
Evaluate the view that indirect taxes are the most effective way to reduce the consumption of demerit goods. Refer to the information provided and your own knowledge of economics.

---

## Section B: Essay Questions (choose one)

**Either**

Question 2 [25 marks]
"Free markets always lead to an efficient allocation of resources." Evaluate this statement.

**Or**

Question 3 [25 marks]
Evaluate the extent to which government subsidy of public transport is justified on economic grounds.`,
  },

  // ── ECONOMICS PAPER 2 ──
  {
    id: "econ-p2-a",
    subject: "economics",
    paper: "2",
    title: "Paper 2 — Set A",
    description: "National and International Economy. Macro data response and essays.",
    totalMarks: 80,
    content: `# AQA A-Level Economics — Paper 2: National and International Economy — Predicted Paper Set A

**Time: 2 hours | Total: 80 marks**

---

## Section A: Data Response

**Context / Extract A:**

The Bank of England raised interest rates from 0.1% in December 2021 to 5.25% by August 2023 in an effort to combat rising inflation. CPI inflation peaked at 11.1% in October 2022 before falling to 4.0% by December 2023. However, GDP growth slowed significantly, with the UK economy narrowly avoiding a technical recession in Q3 and Q4 2023. Unemployment remained relatively low at 4.2%, but real wages fell for the longest sustained period since records began.

**Extract B — Data:**

| Indicator | 2021 | 2022 | 2023 | 2024 (est.) |
|-----------|------|------|------|-------------|
| GDP Growth (%) | 7.6 | 4.3 | 0.1 | 0.6 |
| CPI Inflation (%) | 2.6 | 9.1 | 7.3 | 3.2 |
| Unemployment (%) | 4.5 | 3.7 | 4.2 | 4.4 |
| Base Rate (%) | 0.1 | 3.5 | 5.25 | 5.0 |

Question 1.1 [2 marks]
Define the term 'real wages'.

Question 1.2 [4 marks]
Using an AD/AS diagram, explain the likely impact of higher interest rates on the UK economy.

Question 1.3 [9 marks]
Using the extracts and your economic knowledge, analyse the trade-off faced by the Bank of England between controlling inflation and maintaining economic growth.

Question 1.4 [25 marks]
Evaluate the effectiveness of monetary policy as a tool for managing the macroeconomy. Use the data provided and your own knowledge.

---

## Section B: Essay Questions (choose one)

**Either**

Question 2 [25 marks]
"A current account deficit is always harmful to the UK economy." Evaluate this statement.

**Or**

Question 3 [25 marks]
Evaluate the extent to which supply-side policies are more effective than demand-side policies in achieving long-run economic growth.`,
  },

  // ── ECONOMICS PAPER 3 ──
  {
    id: "econ-p3-a",
    subject: "economics",
    paper: "3",
    title: "Paper 3 — Set A",
    description: "Economic Principles and Issues. MCQ and case study with synoptic essay.",
    totalMarks: 80,
    content: `# AQA A-Level Economics — Paper 3: Economic Principles and Issues — Predicted Paper Set A

**Time: 2 hours | Total: 80 marks**

---

## Section A: Multiple Choice (30 marks)

Question 1 [1 marks]
Which of the following is an example of a positive economic statement?
A. The government should increase spending on the NHS.
B. Unemployment in the UK fell to 4.2% in 2023.
C. It would be better to reduce income inequality.
D. Minimum wages are the best way to reduce poverty.

Question 2 [1 marks]
A negative externality of consumption means that:
A. Social benefits exceed private benefits
B. Social costs exceed private costs
C. Private costs exceed social costs
D. The good is overconsumed at the free market equilibrium

Question 3 [1 marks]
If the cross elasticity of demand between two goods is positive, the goods are:
A. Complements
B. Substitutes
C. Normal goods
D. Inferior goods

Question 4 [1 marks]
An increase in the money supply with no change in real output is most likely to cause:
A. Deflation
B. Demand-pull inflation
C. Cost-push inflation
D. A decrease in aggregate demand

Question 5 [1 marks]
Which of the following is a supply-side policy?
A. Raising interest rates
B. Increasing government spending on infrastructure
C. Reducing income tax rates
D. Increasing the minimum wage

Question 6 [1 marks]
An economy operating inside its production possibility frontier is:
A. Experiencing economic growth
B. Productively efficient
C. Operating with unemployed resources
D. At full employment

Question 7 [1 marks]
Price discrimination requires:
A. A perfectly competitive market
B. Firms that are price takers
C. The ability to separate consumers into groups with different price elasticities of demand
D. Homogeneous products

Question 8 [1 marks]
If the marginal propensity to consume is 0.8, the value of the multiplier is:
A. 4
B. 5
C. 0.8
D. 1.25

Question 9 [1 marks]
A monopsonist in the labour market is:
A. A single seller of labour
B. A single buyer of labour
C. A trade union
D. A firm in perfect competition

Question 10 [1 marks]
Which of the following would shift the short-run aggregate supply curve to the left?
A. A fall in oil prices
B. An increase in labour productivity
C. A rise in raw material costs
D. A decrease in indirect taxes

---

## Section B: Case Study

**Case Study — The UK Housing Market**

The UK housing market has experienced significant price growth over the past decade. Average house prices increased from £195,000 in 2014 to £290,000 in 2024, an increase of approximately 49%. In some regions, such as the South East, prices have grown even faster. First-time buyers now need an average deposit of £62,000 — equivalent to 2.5 years of pre-tax earnings for an average worker.

The government introduced the Help to Buy scheme to support first-time buyers with equity loans of up to 20% (40% in London). Economists have debated whether this demand-side intervention simply pushed prices higher. Meanwhile, housebuilding completions have averaged 180,000 per year — significantly below the 340,000 homes per year that the government has targeted.

Planning restrictions, land banking by developers, and skilled labour shortages in construction have been cited as major supply-side barriers.

Question 11 [2 marks]
Calculate the percentage increase in average house prices between 2014 and 2024.

Question 12 [4 marks]
Explain, using a supply and demand diagram, why house prices have risen significantly.

Question 13 [9 marks]
Analyse the effectiveness of the Help to Buy scheme as a solution to housing affordability.

Question 14 [10 marks]
Evaluate whether supply-side measures would be more effective than demand-side interventions in solving the UK housing crisis.

Question 15 [25 marks]
"Government intervention in markets does more harm than good." Using the case study and your own economic knowledge, evaluate this statement with reference to both microeconomic and macroeconomic arguments.`,
  },

  // ── ECONOMICS PAPER 1: Set B ──
  {
    id: "econ-p1-b",
    subject: "economics",
    paper: "1",
    title: "Paper 1 — Set B",
    description: "Markets and Market Failure. Environmental economics focus.",
    totalMarks: 80,
    content: `# AQA A-Level Economics — Paper 1: Markets and Market Failure — Predicted Paper Set B

**Time: 2 hours | Total: 80 marks**

---

## Section A: Data Response

**Context / Extract A:**

The UK Emissions Trading Scheme (UK ETS) was launched in January 2021 following Brexit, replacing the EU ETS. Under the scheme, large industrial emitters must buy permits (allowances) for each tonne of CO₂ they emit. The price of carbon allowances rose from £50/tonne in early 2021 to £78/tonne in mid-2024. Environmental groups argue the cap is too generous, allowing firms to continue polluting. Industry groups warn that high carbon prices push manufacturing overseas — a phenomenon known as "carbon leakage."

**Extract B — Data:**

| Year | Carbon price (£/tonne) | UK industrial emissions (MtCO₂) | Renewable energy share (%) |
|------|------------------------|----------------------------------|---------------------------|
| 2019 | 22 (EU ETS) | 102 | 37 |
| 2021 | 50 | 92 | 40 |
| 2022 | 68 | 85 | 42 |
| 2024 | 78 | 79 | 47 |

Question 1.1 [2 marks]
Using Extract B, calculate the fall in UK industrial emissions between 2019 and 2024.

Question 1.2 [4 marks]
Using a diagram, explain how a carbon trading scheme (cap-and-trade) aims to internalise the external costs of pollution.

Question 1.3 [9 marks]
Using the data and your economic knowledge, analyse the extent to which the UK ETS has been successful in reducing carbon emissions.

Question 1.4 [25 marks]
Evaluate the view that market-based policies, such as carbon trading and environmental taxes, are more effective than government regulation in tackling climate change.

---

## Section B: Essay Questions (choose one)

**Either**

Question 2 [25 marks]
Evaluate the view that monopoly power is always against the public interest.

**Or**

Question 3 [25 marks]
"The provision of information is sufficient to correct market failure caused by merit goods." Evaluate this statement.`,
  },

  // ── ECONOMICS PAPER 2: Set B ──
  {
    id: "econ-p2-b",
    subject: "economics",
    paper: "2",
    title: "Paper 2 — Set B",
    description: "National and International Economy. Trade and globalisation focus.",
    totalMarks: 80,
    content: `# AQA A-Level Economics — Paper 2: National and International Economy — Predicted Paper Set B

**Time: 2 hours | Total: 80 marks**

---

## Section A: Data Response

**Context / Extract A:**

Since Brexit, the UK has pursued independent trade deals, signing agreements with Australia, New Zealand, Japan, and joining the CPTPP (Comprehensive and Progressive Agreement for Trans-Pacific Partnership) in 2023. However, UK goods exports to the EU fell by 15% between 2019 and 2023, with small businesses citing increased border checks and paperwork as key barriers. The UK's current account deficit widened to 3.1% of GDP in 2023. Meanwhile, the UK attracted £29.5 billion in foreign direct investment (FDI) in 2023, remaining one of the top destinations in Europe.

**Extract B — Data:**

| Indicator | 2019 | 2021 | 2023 |
|-----------|------|------|------|
| UK goods exports to EU (£bn) | 170 | 138 | 145 |
| UK goods imports from EU (£bn) | 228 | 195 | 215 |
| Current account balance (% of GDP) | -2.7 | -1.5 | -3.1 |
| Inward FDI (£bn) | 36.2 | 24.1 | 29.5 |
| £/€ exchange rate | 1.14 | 1.16 | 1.15 |

Question 1.1 [2 marks]
Using Extract B, calculate the UK's trade deficit in goods with the EU in 2023.

Question 1.2 [4 marks]
Using an appropriate diagram, explain the likely impact of a depreciation of the pound on the UK's current account.

Question 1.3 [9 marks]
Using the data and your economic knowledge, analyse the potential benefits and costs of the UK joining the CPTPP.

Question 1.4 [25 marks]
Evaluate the extent to which free trade agreements are beneficial for the UK economy. Use the data provided and your own knowledge.

---

## Section B: Essay Questions (choose one)

**Either**

Question 2 [25 marks]
"Fiscal policy is a more effective tool than monetary policy for reducing inequality." Evaluate this statement.

**Or**

Question 3 [25 marks]
Evaluate the view that economic growth inevitably leads to environmental degradation.`,
  },

  // ── CHEMISTRY PAPER 1: Higher ──
  {
    id: "chem-p1-higher-a",
    subject: "chemistry",
    paper: "1",
    tier: "Higher",
    title: "Chem Paper 1 Higher — Set A",
    description: "Topics 1–5: Atomic structure, bonding, quantitative chemistry, chemical changes, energy.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) — Paper 1 Higher — Set A\n\n**Time: 1 hour 45 minutes | Total: 100 marks**\n\nQuestion 1 [1 marks]\nWhat is the atomic number of an element?\n\nQuestion 2 [2 marks]\nDraw the electronic structure of a sodium atom (atomic number 11).\n\nQuestion 3 [2 marks]\nExplain why elements in the same group have similar chemical properties.\n\nQuestion 4 [3 marks]\nDescribe the bonding in sodium chloride.\n\nQuestion 5 [2 marks]\nState two properties of ionic compounds.\n\nQuestion 6a [1 marks]\nDefine relative formula mass.\n\nQuestion 6b [2 marks]\nCalculate the relative formula mass of CaCO₃. (Ar: Ca=40, C=12, O=16)\n\nQuestion 7 [3 marks]\nBalance: Fe₂O₃ + C → Fe + CO₂\n\nQuestion 8 [4 marks]\nCalculate the number of moles in 5.6 g of iron. (Ar: Fe=56)\n\nQuestion 9 [3 marks]\nDescribe the test for hydrogen gas.\n\nQuestion 10 [4 marks]\nCalculate the mass of NaCl produced when 25.0 cm³ of 0.1 mol/dm³ HCl reacts with excess NaOH. (Mr NaCl=58.5)\n\nQuestion 11 [3 marks]\nOrder by reactivity (most first): copper, magnesium, zinc, iron.\n\nQuestion 12 [4 marks]\nDescribe how copper is purified by electrolysis.\n\nQuestion 13 [3 marks]\nExplain why HCl + NaOH is exothermic.\n\nQuestion 14 [6 marks]\nCompare ionic and covalent bonding. Describe how each forms, give examples, and explain how bonding affects properties.\n\nQuestion 15 [4 marks]\n25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.5 mol/dm³ H₂SO₄. Calculate the concentration of NaOH. (2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O)\n\nQuestion 16 [3 marks]\nExplain why graphite conducts electricity but diamond does not.\n\nQuestion 17 [4 marks]\nCalculate atom economy for: 2Fe₂O₃ + 3C → 4Fe + 3CO₂\n\nQuestion 18 [3 marks]\nName the flame test colours for lithium, sodium, and potassium.\n\nQuestion 19 [4 marks]\nTheoretical yield is 15.0 g, actual yield is 12.3 g. Calculate percentage yield.\n\nQuestion 20 [3 marks]\nExplain oxidation and reduction in terms of electrons.`,
  },

  // ── CHEMISTRY PAPER 2: Higher ──
  {
    id: "chem-p2-higher-a",
    subject: "chemistry",
    paper: "2",
    tier: "Higher",
    title: "Chem Paper 2 Higher — Set A",
    description: "Topics 6–10: Rates, organic chemistry, analysis, atmosphere, resources.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) — Paper 2 Higher — Set A\n\n**Time: 1 hour 45 minutes | Total: 100 marks**\n\nQuestion 1 [2 marks]\nState two ways to increase the rate of a chemical reaction.\n\nQuestion 2 [3 marks]\nUsing collision theory, explain why increasing temperature increases rate.\n\nQuestion 3 [3 marks]\nDescribe how to measure the volume of gas produced over time.\n\nQuestion 4 [4 marks]\nSketch a graph of volume of gas vs time. Add a second line for higher temperature.\n\nQuestion 5 [2 marks]\nWhat is a catalyst? Give one industrial example.\n\nQuestion 6 [3 marks]\nDescribe how fractional distillation separates crude oil.\n\nQuestion 7 [2 marks]\nWrite the general formula for alkanes. Draw the displayed formula of propane.\n\nQuestion 8 [3 marks]\nWrite a balanced equation for complete combustion of methane.\n\nQuestion 9 [4 marks]\nExplain what cracking is and why it is carried out.\n\nQuestion 10 [3 marks]\nDescribe the test for an alkene. State the reagent and colour change.\n\nQuestion 11 [4 marks]\nAn Rf value is 0.65. The solvent front is 12.0 cm. Calculate the distance the spot travelled.\n\nQuestion 12 [3 marks]\nDescribe flame emission spectroscopy and state one advantage over flame tests.\n\nQuestion 13 [4 marks]\nDescribe how Earth's atmosphere has changed since formation.\n\nQuestion 14 [3 marks]\nExplain how human activities increase CO₂ levels.\n\nQuestion 15 [6 marks]\nEvaluate hydrogen as a fuel compared to petrol.\n\nQuestion 16 [4 marks]\nDescribe how potable water is produced from fresh water in the UK.\n\nQuestion 17 [3 marks]\nWhat is a life cycle assessment? State three factors it considers.\n\nQuestion 18 [3 marks]\nExplain what a reversible reaction is.\n\nQuestion 19 [4 marks]\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g) (exothermic). Explain the effect of increasing pressure on yield.\n\nQuestion 20 [3 marks]\nDescribe the test for sulfate ions.`,
  },
];
