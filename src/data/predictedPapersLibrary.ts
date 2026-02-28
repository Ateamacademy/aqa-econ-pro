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

  // ── CHEMISTRY PAPER 1: Higher — Set B (Graph/Diagram Focus) ──
  {
    id: "chem-p1-higher-b",
    subject: "chemistry",
    paper: "1",
    tier: "Higher",
    title: "Chem Paper 1 Higher — Set B",
    description: "Graph & diagram focus: reaction profiles, energy diagrams, bonding dot-and-cross, titration curves.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) — Paper 1 Higher — Set B (Graph & Diagram Focus)

**Time: 1 hour 45 minutes | Total: 100 marks**

Question 1 [2 marks]
The reaction profile below shows the reaction between ammonia and oxygen:

**Reaction Profile Diagram:**
- The y-axis is labelled "Energy"
- The x-axis is labelled "Progress of reaction"
- The reactants (4NH₃ + 3O₂) start at a certain energy level on the left
- The curve rises to a peak (the activation energy barrier) and then drops to a lower energy level on the right
- The products (2N₂ + 6H₂O) are at a lower energy level than the reactants

Complete the diagram by labelling:
- the activation energy
- the overall energy change

Question 2 [3 marks]
Draw a dot-and-cross diagram to show the bonding in water (H₂O). Show only the outer shell electrons.

Question 3 [4 marks]
The graph below shows how the volume of gas produced changes over time for a reaction at 25°C:

**Graph description:**
- x-axis: Time (seconds), from 0 to 120
- y-axis: Volume of gas (cm³), from 0 to 60
- The curve starts steeply, then gradually levels off at approximately 50 cm³ after 80 seconds

On the same axes, sketch a second curve to show the same reaction at 40°C. Explain two differences between the curves.

Question 4 [3 marks]
Draw a dot-and-cross diagram to show the bonding in magnesium chloride (MgCl₂). Show the charges on the ions.

Question 5 [4 marks]
The diagram shows the energy level diagram for an exothermic reaction.

**Energy level diagram:**
- Reactants are at a higher energy level
- Products are at a lower energy level
- An arrow pointing upward from reactants to the peak is labelled "Activation energy (Ea)"
- An arrow pointing downward from reactants to products is labelled "ΔH (negative)"

A catalyst is added to the reaction. On the diagram, show how the catalyst affects the activation energy. Explain why the catalyst increases the rate.

Question 6 [2 marks]
The diagram shows the structure of diamond. Explain why diamond has a very high melting point.

Question 7 [3 marks]
Draw the displayed formula of ethanol (C₂H₅OH). Show all bonds.

Question 8 [4 marks]
A titration is carried out. 25.0 cm³ of NaOH of unknown concentration is placed in a conical flask. 0.10 mol/dm³ HCl is added from a burette. The results are:

| Titration | Rough | 1 | 2 | 3 |
|-----------|-------|---|---|---|
| Final reading (cm³) | 26.50 | 25.80 | 25.75 | 25.80 |
| Initial reading (cm³) | 0.00 | 0.00 | 0.00 | 0.00 |

Calculate the mean titre (ignoring the rough result) and then calculate the concentration of NaOH. (NaOH + HCl → NaCl + H₂O)

Question 9 [3 marks]
The graph shows the pH change during a titration of NaOH with HCl:

**pH curve description:**
- x-axis: Volume of HCl added (cm³), 0 to 40
- y-axis: pH, 0 to 14
- The curve starts at pH 13, stays relatively flat until about 25 cm³, then drops sharply from pH 10 to pH 3 between 24 and 26 cm³, then levels off at pH 1

From the graph, determine (a) the end point volume and (b) whether the reaction produces an acidic, neutral, or alkaline salt.

Question 10 [3 marks]
Draw a dot-and-cross diagram for methane (CH₄). State the type of bonding and predict the shape of the molecule.

Question 11 [4 marks]
The diagram below shows a simple electrolysis cell for the electrolysis of copper sulfate solution using inert (graphite) electrodes.

**Diagram description:**
- A beaker contains copper sulfate solution (blue)
- Two graphite electrodes are connected to a battery (DC power supply)
- The left electrode is labelled "anode (+)" and the right is "cathode (−)"

Write half equations for the reactions at each electrode. State what you would observe at each electrode.

Question 12 [6 marks]
Compare the structures and properties of diamond, graphite, and graphene. In your answer, include bonding, structure, and explain differences in hardness and electrical conductivity.

Question 13 [3 marks]
The reaction profile for an endothermic reaction is shown:

**Reaction profile:**
- Reactants at a lower energy level
- Products at a higher energy level
- A peak between them representing the activation energy

Label the activation energy and the overall energy change. State whether ΔH is positive or negative.

Question 14 [4 marks]
The bar chart shows the percentage composition by mass of the elements in a compound: Iron = 70%, Oxygen = 30%.

Determine the empirical formula of the compound. (Ar: Fe = 56, O = 16)

Question 15 [3 marks]
Draw a diagram to show the arrangement of ions in a sodium chloride crystal lattice. Label the sodium and chloride ions.

Question 16 [4 marks]
A student investigates rates of reaction by measuring gas volume. Their graph shows:
- Experiment A: marble chips (large) + 1M HCl — slow start, levels off at 45 cm³
- Experiment B: marble powder + 1M HCl — fast start, levels off at 45 cm³

Explain why both experiments produce the same final volume but at different rates.

Question 17 [3 marks]
Using a balanced symbol equation with state symbols, describe what happens when sodium reacts with water.

Question 18 [4 marks]
The temperature change graph for a neutralisation reaction shows:
- Temperature rises from 20°C to 32°C when acid is added to alkali

Calculate the energy change for 50 cm³ of solution. (Specific heat capacity = 4.18 J/g/°C, density = 1 g/cm³). Give your answer in kJ.

Question 19 [3 marks]
Draw the electron arrangement of a chlorine atom and a chloride ion. Explain what has happened in terms of electron transfer.

Question 20 [4 marks]
Explain, using a diagram, why metals are good conductors of electricity. Reference the structure and bonding in your answer.`,
  },

  // ── CHEMISTRY PAPER 2: Higher — Set B (Graph/Diagram Focus) ──
  {
    id: "chem-p2-higher-b",
    subject: "chemistry",
    paper: "2",
    tier: "Higher",
    title: "Chem Paper 2 Higher — Set B",
    description: "Graph & diagram focus: rate graphs, tangent method, chromatography, atmospheric data.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) — Paper 2 Higher — Set B (Graph & Diagram Focus)

**Time: 1 hour 45 minutes | Total: 100 marks**

Question 1 [4 marks]
The graph shows the volume of hydrogen gas produced when magnesium reacts with hydrochloric acid over time.

**Graph description:**
- x-axis: Time (s), 0 to 100
- y-axis: Volume of H₂ (cm³), 0 to 80
- The curve rises steeply at first, then gradually flattens, levelling off at 70 cm³ after about 60 seconds

(a) Use the tangent method to calculate the rate of reaction at 20 seconds. Show your working on the graph.
(b) Explain why the rate decreases over time.

Question 2 [3 marks]
The chromatogram below shows the results of testing three food colourings (A, B, C) against two known dyes (D1, D2).

**Chromatogram description:**
- Solvent front is at 8.0 cm
- Dye D1 has one spot at 5.6 cm
- Dye D2 has one spot at 3.2 cm
- Food colouring A has two spots: one at 5.6 cm and one at 3.2 cm
- Food colouring B has one spot at 5.6 cm
- Food colouring C has one spot at 2.4 cm

(a) Calculate the Rf value for dye D1.
(b) Which food colouring is a mixture? Explain your answer.
(c) Does food colouring C contain either D1 or D2? Explain.

Question 3 [4 marks]
The graph shows how the concentration of reactant changes over time for a reversible reaction reaching dynamic equilibrium.

**Graph description:**
- x-axis: Time
- y-axis: Concentration
- Reactant concentration starts high and decreases, levelling off at a constant value
- Product concentration starts at zero, increases, and levels off at a lower constant value than the reactant

Explain what is meant by dynamic equilibrium. Use the graph to explain when equilibrium has been reached.

Question 4 [3 marks]
The bar chart below shows the composition of Earth's early atmosphere compared to today:

| Gas | Early atmosphere (%) | Today (%) |
|-----|---------------------|-----------|
| CO₂ | 80 | 0.04 |
| N₂ | 10 | 78 |
| O₂ | 0 | 21 |
| Water vapour | 10 | ~1 |

Describe and explain how the atmosphere changed from the early atmosphere to today. Reference the role of plants and oceans.

Question 5 [4 marks]
The graph shows how the rate of an enzyme-catalysed reaction varies with temperature.

**Graph description:**
- x-axis: Temperature (°C), 0 to 80
- y-axis: Rate of reaction
- The curve rises from 0°C, reaches a peak at approximately 37°C, then drops sharply to near zero by 60°C

Explain the shape of the graph. Why does the rate increase initially and then decrease?

Question 6 [3 marks]
Draw the displayed formula for propene (C₃H₆). Label the carbon-carbon double bond. Explain why propene is called an unsaturated hydrocarbon.

Question 7 [4 marks]
The line graph shows the global average temperature anomaly from 1900 to 2024:

**Graph description:**
- x-axis: Year (1900 to 2024)
- y-axis: Temperature anomaly (°C), -0.5 to +1.5
- From 1900-1940: slight increase from -0.2 to 0
- From 1940-1980: relatively flat around 0
- From 1980-2024: steep increase from 0 to +1.3

Using the graph, describe the trend in global temperature. Explain one human activity that contributes to this trend and the mechanism by which it causes warming.

Question 8 [3 marks]
A student tests four unknown solutions using NaOH(aq). The results are:

| Solution | Precipitate colour |
|----------|-------------------|
| A | White |
| B | Green |
| C | Blue |
| D | Brown/orange |

Identify the metal ion present in each solution.

Question 9 [4 marks]
The rate of decomposition of hydrogen peroxide is measured with and without a manganese dioxide catalyst.

**Graph description:**
- Both curves start at 0 and level off at 50 cm³ of oxygen
- With catalyst: reaches 50 cm³ in about 30 seconds
- Without catalyst: reaches 50 cm³ in about 120 seconds

(a) What is the role of manganese dioxide?
(b) Explain why both curves reach the same final volume.
(c) How does the initial rate compare? Explain using collision theory.

Question 10 [3 marks]
Draw the structural formula for ethanoic acid. State one use of ethanoic acid.

Question 11 [6 marks]
A chemical company needs to choose between two methods of extracting copper:
- Method A: Mining and smelting copper ore (high purity, high energy cost, environmental damage)
- Method B: Phytomining using plants (low energy, slow, lower yield)

Evaluate these two methods. Consider environmental, economic, and social factors.

Question 12 [4 marks]
The graph shows how the yield of ammonia in the Haber process changes with temperature at two different pressures.

**Graph description:**
- x-axis: Temperature (°C), 200 to 600
- y-axis: Yield of NH₃ (%), 0 to 80
- At 200 atm: yield decreases from 60% at 200°C to 15% at 600°C
- At 400 atm: yield decreases from 75% at 200°C to 25% at 600°C

Using the graph:
(a) State the effect of increasing temperature on yield at constant pressure.
(b) State the effect of increasing pressure on yield at constant temperature.
(c) The industrial conditions used are 450°C and 200 atm. Explain why these conditions are a compromise.

Question 13 [3 marks]
Describe the test for chloride, bromide, and iodide ions. State the reagent used and the observations for each.

Question 14 [4 marks]
A student heats 5.00 g of hydrated copper sulfate (CuSO₄·xH₂O). After heating, the anhydrous mass is 3.19 g. Calculate the value of x. (Mr: CuSO₄ = 159.5, H₂O = 18)

Question 15 [3 marks]
The pie chart shows the approximate composition of dry clean air: N₂ = 78%, O₂ = 21%, Ar = 0.93%, CO₂ = 0.04%, others = 0.03%.

Name one greenhouse gas other than CO₂. Explain the greenhouse effect in terms of radiation.

Question 16 [4 marks]
Two experiments are conducted with the same mass of zinc and the same volume of acid:
- Experiment 1: 1M HCl
- Experiment 2: 2M HCl

Sketch the expected graphs of mass loss vs time for both experiments on the same axes. Label each curve and explain the differences.

Question 17 [3 marks]
Explain the process of rusting. Write a word equation. State two methods of preventing rust and explain how each works.

Question 18 [4 marks]
The table shows the results of testing water samples from different sources:

| Sample | pH | Dissolved solids (mg/L) | Bacteria count |
|--------|-----|------------------------|----------------|
| River | 6.5 | 450 | High |
| Reservoir | 7.0 | 200 | Medium |
| Desalinated | 7.0 | 10 | None |

Explain why desalinated water has the lowest dissolved solids. Describe the steps needed to make river water safe to drink.

Question 19 [3 marks]
What is meant by the term "carbon footprint"? State two ways an individual can reduce their carbon footprint.

Question 20 [3 marks]
Describe how to carry out a flame test. State the safety precautions you would take.`,
  },

  // ── MATHS PAPER 2: Higher — Set B (Graph/Diagram Focus) ──
  {
    id: "maths-p2-higher-b",
    subject: "maths",
    paper: "2",
    tier: "Higher",
    title: "Paper 2 Higher — Set B",
    description: "Calculator. Graph & diagram focus: coordinate geometry, transformations, data charts, real-life graphs.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) — Paper 2 Higher (Calculator) — Set B (Graph & Diagram Focus)

**Time: 1 hour 30 minutes | Total: 80 marks | Calculator ALLOWED**

Answer ALL questions. Show all your working out.

Question 1 [3 marks]
Batteries are sold in packs of 4, 8, and 12.
- A pack of 4 costs £1.80
- A pack of 8 costs £3.20
- A pack of 12 costs £6.00

Which pack gives the best value for money? You must show how you get your answer.

Question 2 [4 marks]
The diagram shows a solid cylinder standing on a horizontal floor.

The cylinder has:
- volume of 1200 cm³
- height of 40 cm

The cylinder exerts a force of 90 newtons on the floor.

Given that pressure = force ÷ area, work out the pressure on the floor due to the cylinder. Give your answer correct to 3 significant figures. State the units.

Question 3 [4 marks]
The graph of $y = x^2 - 6x + 8$ is drawn on a coordinate grid.

**Graph description:**
- The parabola crosses the x-axis at $(2, 0)$ and $(4, 0)$
- The turning point (minimum) is at $(3, -1)$
- The y-intercept is at $(0, 8)$

(a) Write down the coordinates of the turning point.
(b) Write down the equation of the line of symmetry.
(c) Use the graph to solve $x^2 - 6x + 8 = 3$.

Question 4 [3 marks]
The scatter diagram shows the relationship between hours of study and test scores for 10 students:

| Hours | 2 | 3 | 4 | 5 | 5 | 6 | 7 | 8 | 9 | 10 |
|-------|---|---|---|---|---|---|---|---|---|---|
| Score | 35 | 42 | 48 | 55 | 50 | 62 | 70 | 68 | 78 | 85 |

(a) Describe the type and strength of correlation.
(b) Estimate the test score for a student who studied 6.5 hours.
(c) Explain why it would be unreliable to use this graph to predict the score for 20 hours of study.

Question 5 [4 marks]
The velocity-time graph shows the motion of a car:

**Graph description:**
- From $t = 0$ to $t = 5$: velocity increases linearly from 0 to 15 m/s
- From $t = 5$ to $t = 15$: velocity stays constant at 15 m/s
- From $t = 15$ to $t = 20$: velocity decreases linearly from 15 to 0 m/s

(a) Calculate the acceleration during the first 5 seconds.
(b) Calculate the total distance travelled.

Question 6 [4 marks]
The cumulative frequency table shows the weights of 80 apples:

| Weight $w$ (g) | $w \\le 100$ | $w \\le 120$ | $w \\le 140$ | $w \\le 160$ | $w \\le 180$ | $w \\le 200$ |
|---|---|---|---|---|---|---|
| Cumulative freq | 5 | 15 | 35 | 60 | 72 | 80 |

(a) Draw a cumulative frequency graph.
(b) Use your graph to find the median weight.
(c) Find the interquartile range.

Question 7 [4 marks]
The diagram shows triangle $ABC$ where $A = (1, 2)$, $B = (5, 2)$, and $C = (3, 6)$.

(a) Find the area of the triangle.
(b) The triangle is translated by the vector $\\begin{pmatrix} -3 \\\\ 2 \\end{pmatrix}$. Write down the coordinates of $A'$, $B'$, and $C'$.

Question 8 [5 marks]
The graph below shows the function $y = \\sin x$ for $0° \\le x \\le 360°$:

**Graph description:**
- The sine curve passes through $(0, 0)$, $(90, 1)$, $(180, 0)$, $(270, -1)$, $(360, 0)$
- Maximum at $x = 90°$, minimum at $x = 270°$

(a) Use the graph to solve $\\sin x = 0.5$ for $0° \\le x \\le 360°$.
(b) Sketch the graph of $y = 2\\sin x$ on the same axes.

Question 9 [3 marks]
The pie chart shows how 240 students travel to school:
- Walk: 120°
- Bus: 90°
- Car: 60°
- Cycle: 90°

How many students walk to school? How many more students take the bus than travel by car?

Question 10 [4 marks]
The real-life graph shows the depth of water in a container as it fills up:

**Graph description:**
- x-axis: Time (minutes), 0 to 10
- y-axis: Depth (cm), 0 to 30
- From 0 to 4 min: depth increases from 0 to 16 cm (linear, steep)
- From 4 to 7 min: depth increases from 16 to 22 cm (linear, less steep)
- From 7 to 10 min: depth increases from 22 to 30 cm (linear, steep again)

(a) Calculate the rate at which the depth increases during the first 4 minutes.
(b) Explain what happens to the container between 4 and 7 minutes.

Question 11 [5 marks]
The frequency polygon shows the distribution of heights of 100 students:

**Data points:**
| Height (cm) midpoint | 145 | 155 | 165 | 175 | 185 |
|---|---|---|---|---|---|
| Frequency | 8 | 25 | 40 | 20 | 7 |

(a) Estimate the mean height.
(b) In which class interval does the median lie?
(c) A student claims "most students are taller than 170 cm." Is this correct? Justify.

Question 12 [4 marks]
The diagram shows a trapezium $ABCD$ where $AB = 10$ cm, $DC = 6$ cm, and the perpendicular height is $h$ cm. The area is 48 cm².

(a) Calculate the height $h$.
(b) If the trapezium is enlarged by scale factor 2, what is the area of the enlarged shape?

Question 13 [4 marks]
The box plot shows the times (in seconds) for 60 runners to complete a 100m race:

**Box plot description:**
- Minimum: 11.2
- Lower quartile (Q1): 12.0
- Median: 12.8
- Upper quartile (Q3): 13.5
- Maximum: 15.0

(a) Find the interquartile range.
(b) A time of 15.0 seconds is an outlier. Explain how you can tell.
(c) Compare this distribution to another group with median 13.2 and IQR 1.0.

Question 14 [4 marks]
The graph of $y = f(x)$ is drawn. The graph passes through the points $(-2, 0)$, $(0, 4)$, $(2, 0)$, and has a maximum at $(0, 4)$.

Sketch the following transformations:
(a) $y = f(x) - 3$
(b) $y = f(x + 2)$
(c) $y = -f(x)$

Question 15 [5 marks]
The histogram shows the ages of 200 members of a gym:

**Data:**
| Age ($a$) | $20 \\le a < 30$ | $30 \\le a < 40$ | $40 \\le a < 50$ | $50 \\le a < 70$ | $70 \\le a < 90$ |
|---|---|---|---|---|---|
| Frequency | 30 | 50 | 60 | 40 | 20 |

(a) Calculate the frequency density for each class.
(b) Draw the histogram.
(c) Estimate the number of members aged between 35 and 55.

Question 16 [4 marks]
The graph shows the exchange rate between pounds (£) and euros (€) over a 6-month period:

**Graph description:**
- x-axis: Month (Jan to Jun)
- y-axis: £1 = ? euros
- Jan: 1.12, Feb: 1.14, Mar: 1.10, Apr: 1.08, May: 1.15, Jun: 1.17

(a) In which month was the pound weakest against the euro?
(b) Tom exchanged £500 into euros in March and exchanged them back in June. Calculate his profit or loss.

Question 17 [4 marks]
The graph of $y = x^3 - 3x$ is shown:

**Graph description:**
- The curve has a local maximum at $(-1, 2)$ and a local minimum at $(1, -2)$
- It crosses the x-axis at $x = -\\sqrt{3}$, $x = 0$, and $x = \\sqrt{3}$

(a) Use the graph to estimate the solutions to $x^3 - 3x = 1$.
(b) Write down the coordinates of the local maximum.

Question 18 [4 marks]
The distance-time graph shows two runners in a race:

**Graph description:**
- Runner A: starts at $t = 0$, reaches 100m at $t = 12$ seconds (constant speed)
- Runner B: starts at $t = 0$, accelerates — reaches 100m at $t = 11$ seconds (curve)

(a) What was Runner A's speed?
(b) Who was ahead at $t = 6$ seconds? Explain.
(c) At what time did Runner B overtake Runner A?`,
  },

  // ── MATHS PAPER 1: Foundation — Set B (Graph/Diagram Focus) ──
  {
    id: "maths-p1-foundation-b",
    subject: "maths",
    paper: "1",
    tier: "Foundation",
    title: "Paper 1 Foundation — Set B",
    description: "Non-Calculator. Graph & diagram focus: bar charts, pictograms, reading scales, basic coordinates.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) — Paper 1 Foundation (Non-Calculator) — Set B (Graph & Diagram Focus)

**Time: 1 hour 30 minutes | Total: 80 marks**

Answer ALL questions. Show all your working out.

Question 1 [2 marks]
The pictogram shows the number of books read by students in one month:
- Ali: ■■■ (each ■ = 2 books)
- Bella: ■■■■
- Chris: ■■
- Dina: ■■■■■

How many books did Bella read? How many more books did Dina read than Chris?

Question 2 [3 marks]
The bar chart shows favourite colours of 30 students: Red = 8, Blue = 10, Green = 5, Yellow = 7.

(a) How many students chose blue?
(b) What fraction of students chose green?
(c) A new student joins the class and chooses red. What is the new total?

Question 3 [3 marks]
The thermometer shows a temperature of −3°C. The temperature rises by 8°C. What is the new temperature? The temperature then falls by 12°C. What is the temperature now?

Question 4 [3 marks]
A ruler measures the length of a pencil. The pencil starts at the 2 cm mark and ends at the 14.5 cm mark. How long is the pencil?

Question 5 [3 marks]
The tally chart shows the number of pets owned by students:

| Pets | Tally | Frequency |
|------|-------|-----------|
| 0 | IIII | |
| 1 | IIII III | |
| 2 | IIII I | |
| 3 | III | |
| 4+ | II | |

(a) Complete the frequency column.
(b) How many students were surveyed?
(c) What is the mode?

Question 6 [3 marks]
Plot these points on a coordinate grid: $A(1, 3)$, $B(4, 3)$, $C(4, 7)$, $D(1, 7)$. What shape do the points make? Calculate its area.

Question 7 [2 marks]
A clock shows the time 14:45. Write this in 12-hour format. How many minutes until 3:30 pm?

Question 8 [3 marks]
The line graph shows the temperature in a town over a day:

| Time | 6am | 9am | 12pm | 3pm | 6pm | 9pm |
|------|-----|-----|------|-----|-----|-----|
| Temp (°C) | 5 | 10 | 16 | 18 | 12 | 7 |

(a) What was the highest temperature?
(b) Between which two times did the temperature rise the most?
(c) Estimate the temperature at 10:30 am.

Question 9 [4 marks]
A recipe for 6 pancakes uses: 120 g flour, 2 eggs, 200 ml milk. Calculate the ingredients needed for 15 pancakes.

Question 10 [3 marks]
The scale on a map is 1 cm = 5 km. Two towns are 7.5 cm apart on the map. What is the real distance?

Question 11 [4 marks]
The dual bar chart compares the number of boys and girls choosing different sports:

| Sport | Boys | Girls |
|-------|------|-------|
| Football | 12 | 4 |
| Netball | 3 | 11 |
| Swimming | 8 | 9 |
| Athletics | 5 | 6 |

(a) Which sport has the biggest difference between boys and girls?
(b) How many students were surveyed in total?
(c) What percentage of all students chose swimming?

Question 12 [3 marks]
The diagram shows a right-angled triangle. The base is 6 cm and the height is 8 cm. Calculate the area. Calculate the length of the hypotenuse.

Question 13 [3 marks]
A spinner has 4 equal sections coloured red, blue, green, yellow. The spinner is spun twice. List all the possible outcomes for getting red on the first spin.

Question 14 [4 marks]
The table shows marks scored by 20 students: 3, 5, 7, 4, 6, 8, 5, 7, 6, 4, 9, 5, 3, 7, 6, 8, 5, 4, 6, 7.
(a) Draw a stem-and-leaf diagram.
(b) Find the median mark.
(c) Find the range.

Question 15 [4 marks]
The graph shows $y = 2x + 1$ plotted for $x$ from $-2$ to $3$.

**Table:**
| $x$ | -2 | -1 | 0 | 1 | 2 | 3 |
|-----|----|----|---|---|---|---|
| $y$ | -3 | -1 | 1 | 3 | 5 | 7 |

(a) What is the gradient of the line?
(b) What is the y-intercept?
(c) Use the graph to solve $2x + 1 = 4$.

Question 16 [4 marks]
The diagram shows a garden with a rectangular lawn (8m × 5m) and a circular flower bed (radius 2m) cut out of one corner. Calculate the area of the lawn that remains. Use $\\pi = 3.14$.

Question 17 [3 marks]
The frequency table shows shoe sizes:

| Size | 4 | 5 | 6 | 7 | 8 |
|------|---|---|---|---|---|
| Frequency | 3 | 7 | 10 | 5 | 2 |

Calculate the mean shoe size.

Question 18 [3 marks]
Convert: (a) 3.5 m to cm, (b) 2500 ml to litres, (c) 1.2 kg to grams.

Question 19 [3 marks]
A rectangle has perimeter 28 cm and length 9 cm. Calculate the width and the area.

Question 20 [4 marks]
The two-way table shows how students travel to school:

| | Walk | Bus | Car | Total |
|---|---|---|---|---|
| Boys | 8 | 12 | 5 | |
| Girls | 10 | 7 | | 25 |
| Total | | | | 50 |

Complete the table. What percentage of students walk to school?

Question 21 [3 marks]
Reflect the shape with vertices $(1,1)$, $(3,1)$, $(3,3)$ in the line $y = 4$. Write the coordinates of the reflected vertices.

Question 22 [4 marks]
The line graph shows the cost of electricity over 5 years:

| Year | 2019 | 2020 | 2021 | 2022 | 2023 |
|------|------|------|------|------|------|
| Cost (p/kWh) | 15 | 16 | 18 | 28 | 34 |

(a) What was the biggest year-on-year increase?
(b) Calculate the percentage increase from 2019 to 2023.`,
  },

  // ── ECONOMICS PAPER 2: Set C (Macroeconomic Analysis Focus) ──
  {
    id: "econ-p2-c",
    subject: "economics",
    paper: "2",
    title: "Paper 2 — Set C",
    description: "Macroeconomic analysis focus: AD/AS diagrams, Phillips curve, multiplier, fiscal/monetary policy evaluation.",
    totalMarks: 80,
    content: `# AQA A-Level Economics — Paper 2: National and International Economy — Predicted Paper Set C (Macroeconomic Analysis Focus)

**Time: 2 hours | Total: 80 marks**

---

## Section A: Data Response

**Context / Extract A:**

In 2024–25, the UK government faced a significant fiscal challenge. The national debt exceeded 100% of GDP for the first time since the 1960s, standing at £2.7 trillion. Despite this, the government increased public spending by 3.5% in real terms, focusing on health, education, and infrastructure (HS2 Northern Leg cancellation notwithstanding). The Office for Budget Responsibility (OBR) forecast GDP growth of 0.6% for 2024, rising to 1.4% in 2025. Unemployment held steady at 4.3%, but youth unemployment remained at 12.1%.

The Bank of England began cutting interest rates from 5.25% in late 2024, with rates falling to 4.5% by early 2025. Inflation had returned to 2.3%, close to the 2% target. However, core inflation (excluding food and energy) remained sticky at 3.6%, driven by services sector wage growth. The pound depreciated by 5% against the dollar over the year.

**Extract B — Macroeconomic Data:**

| Indicator | 2022 | 2023 | 2024 | 2025 (forecast) |
|-----------|------|------|------|-----------------|
| Real GDP growth (%) | 4.3 | 0.1 | 0.6 | 1.4 |
| CPI inflation (%) | 9.1 | 7.3 | 3.2 | 2.3 |
| Unemployment (%) | 3.7 | 4.2 | 4.3 | 4.1 |
| Budget deficit (% GDP) | 5.1 | 4.3 | 4.8 | 3.9 |
| National debt (% GDP) | 85 | 93 | 101 | 103 |
| Base rate (%) | 3.5 | 5.25 | 4.75 | 4.0 |
| Current account (% GDP) | -3.8 | -3.1 | -2.8 | -2.5 |

**Extract C — AD/AS Analysis:**

Economists have debated whether the UK's recent inflation was primarily demand-pull or cost-push. The post-pandemic recovery saw a surge in consumer spending (supported by excess savings of £200bn), while simultaneously supply chains were disrupted and energy prices spiked due to geopolitical events. By 2024, the supply-side pressures had largely eased, but domestic demand remained subdued due to the lagged effects of monetary tightening.

Question 1.1 [2 marks]
Using Extract B, calculate the change in the budget deficit as a percentage of GDP between 2023 and 2024.

Question 1.2 [4 marks]
Using an AD/AS diagram, illustrate and explain the impact of the Bank of England cutting interest rates on the UK economy.

Question 1.3 [4 marks]
Using Extract B, explain the relationship between the base rate and inflation between 2022 and 2025. Reference the concept of time lags in monetary policy transmission.

Question 1.4 [9 marks]
Using the extracts and your economic knowledge, analyse whether the UK's inflation between 2022 and 2024 was primarily demand-pull or cost-push. Use AD/AS analysis in your answer.

Question 1.5 [25 marks]
"Reducing the budget deficit should be the government's top macroeconomic priority." Evaluate this statement with reference to the data provided and your knowledge of macroeconomic policy objectives and conflicts.

---

## Section B: Essay Questions (choose one)

**Either**

Question 2 [25 marks]
Using AD/AS diagrams where appropriate, evaluate the view that supply-side policies are more effective than demand-side policies in achieving sustained economic growth without inflation.

In your answer, you should:
- Explain the difference between short-run and long-run aggregate supply
- Analyse at least two specific supply-side policies and two demand-side policies
- Evaluate the effectiveness of each approach using real-world examples
- Consider potential conflicts between macroeconomic objectives
- Draw and reference at least two AD/AS diagrams

**Or**

Question 3 [25 marks]
"The Phillips Curve relationship between unemployment and inflation no longer holds in the modern UK economy." Evaluate this statement.

In your answer, you should:
- Explain the original Phillips Curve and the expectations-augmented Phillips Curve
- Analyse evidence from the UK economy between 2020 and 2025
- Consider the role of supply shocks, globalisation, and labour market changes
- Use appropriate diagrams to support your analysis
- Evaluate whether the breakdown of the Phillips Curve has implications for monetary policy`,
  },

  // ── ECONOMICS PAPER 1: Set C (Diagram & Graph Focus) ──
  {
    id: "econ-p1-c",
    subject: "economics",
    paper: "1",
    title: "Paper 1 — Set C",
    description: "Diagram & graph focus: supply/demand shifts, welfare analysis, elasticity diagrams, market structures.",
    totalMarks: 80,
    content: `# AQA A-Level Economics — Paper 1: Markets and Market Failure — Predicted Paper Set C (Diagram & Graph Focus)

**Time: 2 hours | Total: 80 marks**

---

## Section A: Data Response

**Context / Extract A:**

The UK energy market has undergone significant changes. Following the 2022 energy crisis, the government introduced the Energy Price Guarantee (EPG), capping average household energy bills at £2,500 per year. By 2024, the cap was adjusted quarterly by Ofgem, falling to £1,568 as wholesale gas prices declined. Critics argue the cap distorts price signals, while supporters say it protects vulnerable consumers.

The UK's electricity generation mix also shifted: renewables generated 47% of electricity in 2024, up from 37% in 2019. However, the intermittent nature of wind and solar power means gas remains essential for baseload generation.

**Extract B — UK Energy Market Data:**

| Year | Average annual bill (£) | Wholesale gas price (p/therm) | Renewables share (%) | Fuel poverty (% households) |
|------|------------------------|------------------------------|---------------------|---------------------------|
| 2019 | 1,254 | 40 | 37 | 10.3 |
| 2021 | 1,138 | 55 | 40 | 13.2 |
| 2022 | 2,500 (capped) | 200 | 42 | 19.8 |
| 2024 | 1,568 (capped) | 68 | 47 | 14.5 |

Question 1.1 [2 marks]
Using Extract B, calculate the percentage of households in fuel poverty in 2024 compared to 2022.

Question 1.2 [4 marks]
Draw a supply and demand diagram to show the effect of a maximum price (price ceiling) on the energy market. Label the areas of consumer surplus, producer surplus, and deadweight loss.

Question 1.3 [4 marks]
Using a diagram, explain how a subsidy to renewable energy producers would affect the market for electricity. Show the effect on equilibrium price and quantity.

Question 1.4 [9 marks]
Using the data and your economic knowledge, analyse the costs and benefits of the energy price cap as a form of government intervention.

Question 1.5 [25 marks]
"Government price controls do more harm than good in correcting market failure." Evaluate this statement with reference to the energy market and other examples.

---

## Section B: Essay Questions (choose one)

**Either**

Question 2 [25 marks]
Using appropriate diagrams, evaluate the effectiveness of different methods a government could use to reduce negative externalities of production.

In your answer, you should include:
- A diagram showing the divergence between private and social costs
- Analysis of at least three policy options (e.g., taxation, regulation, tradeable permits)
- Evaluation of the strengths and limitations of each approach
- Real-world examples

**Or**

Question 3 [25 marks]
"Perfect competition is always more beneficial to consumers than monopoly." Using diagrams, evaluate this statement.

In your answer, you should:
- Draw and compare diagrams of perfect competition and monopoly
- Analyse allocative and productive efficiency in each market structure
- Consider dynamic efficiency, natural monopoly, and contestable markets
- Evaluate with reference to real-world examples`,
  },
];
