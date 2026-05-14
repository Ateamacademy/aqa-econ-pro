/**
 * 10 pre-generated predicted papers: 5 Maths (Foundation + Higher across papers) and 5 Economics.
 * Each paper contains questions in the format the parser expects.
 */

export interface PredictedPaper {
  id: string;
  subject: "maths" | "economics" | "chemistry" | "edexcel-a" | "edexcel-b" | "ocr" | "cambridge" | "aqa-gcse" | "cambridge-igcse" | "ib" | "wjec" | "eduqas" | "edexcel-igcse";
  paper: string; // "1" | "2" | "3"
  tier?: "Foundation" | "Higher";
  title: string;
  description: string;
  totalMarks: number;
  content: string; // markdown with questions in "Question N [M marks]" format
  /**
   * Optional: if set, the predicted-paper renderer should display this static
   * Pearson-style HTML booklet (in /public) inside an iframe instead of the
   * interactive exam UI. Used by the 9 Edexcel A mock papers.
   */
  bookletUrl?: string;
}

export const predictedPapersLibrary: PredictedPaper[] = [
  // ── MATHS PAPER 1: Higher (Non-Calculator) ──
  {
    id: "maths-p1-higher-a",
    subject: "maths",
    paper: "1",
    tier: "Higher",
    title: "Paper 1 Higher · Set A",
    description: "Non-Calculator. Covers algebra, fractions, geometry, proof, and surds.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 1 Higher (Non-Calculator) · Predicted Paper Set A

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
    title: "Paper 1 Foundation · Set A",
    description: "Non-Calculator. Covers core number, basic algebra, geometry, and data handling.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 1 Foundation (Non-Calculator) · Predicted Paper Set A

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
    title: "Paper 2 Higher · Set A",
    description: "Calculator allowed. Covers trigonometry, statistics, compound interest, and circle theorems.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 2 Higher (Calculator) · Predicted Paper Set A

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
    title: "Paper 3 Higher · Set A",
    description: "Calculator allowed. Mixed topics with problem-solving and reasoning.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 3 Higher (Calculator) · Predicted Paper Set A

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
    title: "Paper 2 Foundation · Set A",
    description: "Calculator allowed. Covers percentages, area, data handling, and basic trig.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 2 Foundation (Calculator) · Predicted Paper Set A

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
    title: "Paper 1 · Set A",
    description: "Markets and Market Failure. Data response and essay questions.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/1) · Paper 1: Markets and Market Failure · Predicted Paper Set A

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in both Section A and Section B.

---

## Section A: Data Response (40 marks)

**Extract A · The UK sugar tax debate**

The UK government announced in 2024 that it would extend the Soft Drinks Industry Levy (SDIL) to milkshakes and other previously exempt high-sugar drinks. Public Health England estimates that excess sugar consumption costs the NHS approximately £6 billion per year. Reformulated drinks that reduced sugar content below the levy thresholds accounted for over 50% of soft drink sales by volume in 2023. Industry groups argue the tax is regressive and disproportionately affects lower-income households, while public-health campaigners describe the levy as one of the most successful examples of behavioural government intervention.

**Extract B · Sugar consumption and SDIL revenue, 2018–2024**

| Year | Sugary drink consumption (litres per capita) | Adult obesity rate (%) | SDIL revenue (£m) |
|------|----------------------------------------------|------------------------|--------------------|
| 2018 | 78.4 | 28.7 | 240 |
| 2020 | 65.1 | 29.0 | 336 |
| 2022 | 58.3 | 28.5 | 380 |
| 2024 | 52.7 | 27.8 | 415 |

**Extract C · Distributional impact**

A 2024 IFS study found that households in the lowest income decile spent 0.7% of disposable income on SDIL-affected products, compared with 0.2% for the highest decile. Critics therefore describe the levy as regressive in incidence, although supporters argue the long-run health gains accrue disproportionately to lower-income groups, who suffer the highest rates of diet-related disease.

Question 1 [2 marks]
Using Extract B, calculate the percentage increase or decrease in sugary drink consumption between 2018 and 2024. Show your working and state clearly whether the change is an increase or a decrease.

Question 2 [4 marks]
With the help of a fully labelled supply and demand diagram, explain how the introduction of the sugar tax affects the market for high-sugar soft drinks. Your answer must include both a labelled diagram (or a clear description of one) AND a written explanation of the economic mechanism.

Question 3 [9 marks]
With the help of a diagram and using the extracts, analyse why the sugar tax may be considered an example of government intervention to correct market failure.

Question 4 [25 marks]
Using the extracts and your own knowledge, evaluate the view that indirect taxes are the most effective way to reduce consumption of demerit goods.

---

## Section B: Essay (40 marks)


**Short extract:**
Critics of unregulated markets argue that profit-seeking firms systematically under-provide public goods, over-exploit common resources and ignore negative externalities. Supporters reply that competition, the price mechanism and consumer sovereignty deliver superior outcomes to those produced by government intervention.

Question 5 [15 marks]
Explain how the existence of negative externalities and public goods can lead to market failure.

Question 6 [25 marks]
"Free markets always lead to an efficient allocation of resources." Evaluate this statement with reference to real-world examples.`,
  },

  // ── ECONOMICS PAPER 2 ──
  {
    id: "econ-p2-a",
    subject: "economics",
    paper: "2",
    title: "Paper 2 · Set A",
    description: "National and International Economy. Macro data response and essays.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/2) · Paper 2: National and International Economy · Predicted Paper Set A

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in both Section A and Section B.

---

## Section A: Data Response (40 marks)

**Extract A · UK monetary tightening, 2021–2024**

The Bank of England raised Bank Rate from 0.1% in December 2021 to 5.25% by August 2023 in response to surging inflation. CPI peaked at 11.1% in October 2022 before falling back to 4.0% by December 2023. GDP growth slowed sharply, the UK narrowly avoided a technical recession in late 2023, and real wages fell for the longest sustained period since records began. Unemployment remained low at 4.2%, suggesting a degree of labour-market resilience despite the tightening cycle.

**Extract B · Key UK macroeconomic indicators**

| Indicator | 2021 | 2022 | 2023 | 2024 (est.) |
|-----------|------|------|------|-------------|
| Real GDP growth (%) | 7.6 | 4.3 | 0.1 | 0.6 |
| CPI inflation (%) | 2.6 | 9.1 | 7.3 | 3.2 |
| Unemployment (%) | 4.5 | 3.7 | 4.2 | 4.4 |
| Bank Rate (%) | 0.1 | 3.5 | 5.25 | 5.0 |

**Extract C · Transmission lags and household debt**

The MPC has repeatedly noted that monetary policy operates with "long and variable lags." UK household debt-to-income remains above 130%, meaning small changes in interest rates have a disproportionately large effect on disposable incomes. Approximately 1.6 million fixed-rate mortgages were due to refinance during 2024, creating a delayed cost-push shock to consumer spending.

Question 1 [2 marks]
Define the term 'real wages'.

Question 2 [4 marks]
With the help of a fully labelled AD/AS diagram, explain the likely impact of higher interest rates on aggregate demand in the UK. Your answer must include both a labelled diagram (or a clear description of one) AND a written explanation of the economic mechanism.

Question 3 [9 marks]
With the help of a diagram and using the extracts, analyse the trade-off faced by the Bank of England between controlling inflation and maintaining economic growth.

Question 4 [25 marks]
Using the extracts and your own knowledge, evaluate the effectiveness of monetary policy as a tool for managing the UK macroeconomy.

---

## Section B: Essay (40 marks)


**Short extract:**
The UK ran a current account deficit of around 3% of GDP in 2024, financed largely by capital inflows. Some economists view persistent deficits as a symptom of structural weakness; others argue they simply reflect the UK's role as a global financial centre and pose no immediate threat to macroeconomic stability.

Question 5 [15 marks]
Explain the main causes of a current account deficit on the UK's balance of payments.

Question 6 [25 marks]
"Supply-side policies are more effective than demand-side policies in achieving long-run economic growth." Evaluate this statement.`,
  },

  // ── ECONOMICS PAPER 3 ──
  {
    id: "econ-p3-a",
    subject: "economics",
    paper: "3",
    title: "Paper 3 · Set A",
    description: "Economic Principles and Issues. 30 multiple choice questions plus a synoptic case study.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/3) · Paper 3: Economic Principles and Issues · Predicted Paper Set A

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in Section A and ALL questions in Section B.

---

## Section A: Multiple Choice (30 marks)

Question 1 [1 marks]
Which of the following is an example of a positive economic statement?
A. The government should increase NHS spending.
B. UK unemployment fell to 4.2% in 2023.
C. Income inequality ought to be reduced.
D. Minimum wages are the best way to reduce poverty.

Question 2 [1 marks]
A negative externality of consumption means that:
A. Social benefits exceed private benefits
B. Social costs exceed private costs
C. Private costs exceed social costs
D. Marginal private benefit exceeds marginal social benefit

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
D. A fall in aggregate demand

Question 5 [1 marks]
Which of the following is a supply-side policy?
A. Raising interest rates
B. Increasing government spending on infrastructure
C. Reducing income tax to improve work incentives
D. Increasing the National Living Wage

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
C. The ability to separate consumers by price elasticity of demand
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

Question 11 [1 marks]
A profit-maximising monopolist produces where:
A. AR = AC
B. MR = MC
C. P = MC
D. AR = MC

Question 12 [1 marks]
Allocative efficiency in a market occurs when:
A. AC is minimised
B. P = MC
C. MR = MC
D. Total revenue is maximised

Question 13 [1 marks]
A government imposes a per-unit tax on a good with perfectly inelastic demand. The tax is:
A. Borne entirely by producers
B. Borne entirely by consumers
C. Shared equally between consumers and producers
D. Avoided through reformulation

Question 14 [1 marks]
The Lorenz curve is used to measure:
A. The rate of inflation
B. The level of unemployment
C. The distribution of income or wealth
D. Real GDP per capita

Question 15 [1 marks]
A floating exchange rate is most likely to depreciate when:
A. UK interest rates rise relative to the US
B. UK exports become more competitive
C. UK inflation rises faster than its trading partners
D. The UK current account moves into surplus

Question 16 [1 marks]
Which of the following best describes structural unemployment?
A. Unemployment caused by a fall in aggregate demand
B. Unemployment between jobs as workers search
C. Unemployment caused by a mismatch of skills
D. Unemployment caused by seasonal industries

Question 17 [1 marks]
A firm experiences economies of scale when:
A. Long-run average cost falls as output rises
B. Marginal cost equals average cost
C. Total cost falls as output rises
D. Average revenue rises as output rises

Question 18 [1 marks]
A perfectly contestable market requires:
A. Many small firms
B. Zero barriers to entry and exit
C. Homogeneous products
D. Perfect information

Question 19 [1 marks]
Which of the following is most likely to reduce the natural rate of unemployment?
A. An increase in unemployment benefits
B. Improved geographical labour mobility
C. A rise in interest rates
D. A cut in the marginal income tax rate on high earners

Question 20 [1 marks]
A progressive tax system is one in which:
A. The marginal tax rate is constant
B. The average tax rate falls as income rises
C. The average tax rate rises as income rises
D. Everyone pays the same lump sum

Question 21 [1 marks]
The Phillips curve in the long run is generally drawn as:
A. Downward sloping
B. Upward sloping
C. Horizontal
D. Vertical at the natural rate of unemployment

Question 22 [1 marks]
A merit good is best defined as a good that is:
A. Provided by the public sector
B. Under-consumed relative to the socially optimal level
C. Non-rival and non-excludable
D. Always provided free of charge

Question 23 [1 marks]
Quantitative easing is most accurately described as:
A. A cut in income tax to stimulate consumption
B. A central bank purchase of assets to expand the money supply
C. An increase in government spending financed by borrowing
D. A rise in the bank reserve requirement

Question 24 [1 marks]
An increase in labour productivity will most likely cause:
A. SRAS to shift left
B. LRAS to shift right
C. AD to shift left
D. The Phillips curve to shift right

Question 25 [1 marks]
In oligopolistic markets, the kinked demand curve assumes that rivals will:
A. Match price rises but ignore price cuts
B. Match price cuts but ignore price rises
C. Match all price changes
D. Ignore all price changes

Question 26 [1 marks]
The principle of comparative advantage states that countries should specialise in goods in which they have the:
A. Lowest absolute cost
B. Highest absolute cost
C. Lowest opportunity cost
D. Largest market

Question 27 [1 marks]
A government runs a budget deficit when:
A. Tax revenue exceeds public spending
B. Public spending exceeds tax revenue
C. The national debt falls
D. Net exports are negative

Question 28 [1 marks]
Which of the following is most likely to cause demand-pull inflation?
A. A rise in oil prices
B. A fall in labour productivity
C. A large cut in interest rates during a boom
D. An increase in business taxation

Question 29 [1 marks]
The Gini coefficient ranges between:
A. 0 and 1, where 0 indicates perfect equality
B. 0 and 1, where 1 indicates perfect equality
C. -1 and 1
D. 0 and 100, where 0 indicates perfect inequality

Question 30 [1 marks]
A firm in long-run equilibrium under monopolistic competition earns:
A. Supernormal profit
B. Normal profit only
C. A loss equal to fixed cost
D. Profit equal to marginal cost

---

## Section B: Case Study (50 marks)

**Case Study · The UK Housing Market**

The UK housing market has experienced significant price growth over the past decade. Average house prices rose from £195,000 in 2014 to £290,000 in 2024 · an increase of approximately 49%. First-time buyers now need an average deposit of £62,000, equivalent to 2.5 years of pre-tax earnings for an average worker.

The government introduced the Help to Buy scheme to support first-time buyers with equity loans of up to 20% (40% in London). Economists have debated whether this demand-side intervention simply pushed prices higher. Housebuilding completions averaged 180,000 per year · well below the government target of 340,000. Planning restrictions, land banking by developers and skilled labour shortages in construction have been cited as major supply-side barriers.

Question 31 [10 marks]
Using a supply and demand diagram, explain why UK house prices have risen significantly between 2014 and 2024.

Question 32 [15 marks]
Analyse the likely effects of the Help to Buy scheme on house prices and the housing market.

Question 33 [25 marks]
"Supply-side policies are more effective than demand-side interventions in solving the UK housing affordability crisis." Using the case study and your own economic knowledge, evaluate this statement.`,
  },

  // ── ECONOMICS PAPER 1: Set B ──
  {
    id: "econ-p1-b",
    subject: "economics",
    paper: "1",
    title: "Paper 1 · Set B",
    description: "Markets and Market Failure. Environmental economics focus.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/1) · Paper 1: Markets and Market Failure · Predicted Paper Set B

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in both Section A and Section B.

---

## Section A: Data Response (40 marks)

**Extract A · Carbon trading and UK industrial emissions**

The UK Emissions Trading Scheme (UK ETS) launched in 2021 after Brexit, replacing UK participation in the EU ETS. Large industrial emitters must surrender allowances for every tonne of CO₂ released. The carbon allowance price climbed from £50/tonne in early 2021 to £78/tonne in mid-2024. Environmental groups argue the cap is too generous, while energy-intensive manufacturers warn that high carbon prices encourage carbon leakage as production relocates to jurisdictions with weaker regulation.

**Extract B · UK industrial emissions and carbon allowance prices, 2019–2024**

| Year | Carbon price (£/tonne) | UK industrial emissions (MtCO₂) | Renewable share of generation (%) |
|------|------------------------|----------------------------------|------------------------------------|
| 2019 | 22 (EU ETS)            | 102                              | 37                                 |
| 2021 | 50                     | 92                               | 40                                 |
| 2022 | 68                     | 85                               | 42                                 |
| 2024 | 78                     | 79                               | 47                                 |

**Extract C · Further commentary**

A 2024 CBI survey reported that 41% of energy-intensive UK firms had postponed planned investment in low-carbon production because of allowance price uncertainty. Government modelling suggested that, without the ETS, UK industrial emissions would have been 9–14 MtCO₂ higher in 2024.

Question 1 [2 marks]
Using Extract B, calculate the percentage fall in UK industrial emissions between 2019 and 2024.

Question 2 [4 marks]
Using a supply and demand diagram for tradable pollution permits, explain how a tightening of the cap raises the carbon price.

Question 3 [9 marks]
Using the extracts and your knowledge of economics, analyse two ways in which the UK ETS may correct the market failure associated with industrial pollution.

Question 4 [25 marks]
Using the extracts and your own knowledge, evaluate the view that tradable pollution permits are a more effective policy than indirect taxation for reducing industrial carbon emissions.

---

## Section B: Essay (40 marks)


**Short extract:**
Critics of unregulated markets argue that profit-seeking firms over-exploit common resources, ignore externalities and under-supply public goods. Supporters reply that property rights and tradable markets, not direct regulation, deliver superior outcomes.

Question 5 [15 marks]
Explain, using a diagram, how negative externalities of production lead to allocative inefficiency.

Question 6 [25 marks]
"Market-based environmental policies are always more efficient than command-and-control regulation." Evaluate this view with reference to recent UK examples.`,
  },

  // ── ECONOMICS PAPER 2: Set B ──
  {
    id: "econ-p2-b",
    subject: "economics",
    paper: "2",
    title: "Paper 2 · Set B",
    description: "National and International Economy. Trade and globalisation focus.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/2) · Paper 2: National and International Economy · Predicted Paper Set B

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in both Section A and Section B.

---

## Section A: Data Response (40 marks)

**Extract A · UK trade and CPTPP membership**

Since Brexit, the UK has signed independent trade deals with Australia, New Zealand and Japan and joined the CPTPP in 2023. UK goods exports to the EU fell 15% between 2019 and 2023; small businesses cite paperwork and rules-of-origin as the main barriers. The current account deficit widened to 3.1% of GDP in 2023. Inward FDI remained one of the highest in Europe at £29.5bn.

**Extract B · UK trade and FDI, 2019–2023**

| Indicator                          | 2019 | 2021 | 2023 |
|------------------------------------|------|------|------|
| UK goods exports to EU (£bn)       | 170  | 138  | 145  |
| UK goods imports from EU (£bn)     | 228  | 195  | 215  |
| Current account balance (% GDP)    | -2.7 | -1.5 | -3.1 |
| Inward FDI (£bn)                   | 36.2 | 24.1 | 29.5 |
| £/€ exchange rate                  | 1.14 | 1.16 | 1.15 |

**Extract C · Further commentary**

OBR analysis estimates that CPTPP membership will raise UK GDP by 0.08% over 15 years · small relative to the 4% long-run hit estimated from leaving the EU single market. Supporters argue the deal hedges against rising protectionism and unlocks future Asian growth.

Question 1 [2 marks]
Using Extract B, calculate the UK's trade deficit in goods with the EU in 2023.

Question 2 [4 marks]
Using an AD/AS diagram, explain how a fall in net exports affects UK real output and the price level.

Question 3 [9 marks]
Using the extracts and your knowledge of economics, analyse two potential macroeconomic benefits to the UK of joining the CPTPP.

Question 4 [25 marks]
Using the extracts and your own knowledge, evaluate the view that free trade agreements such as CPTPP are beneficial for UK long-run economic growth.

---

## Section B: Essay (40 marks)


**Short extract:**
Globalisation has integrated product, capital and labour markets, creating winners and losers within and between countries. The role of trade agreements in shaping these outcomes is contested.

Question 5 [15 marks]
Explain how comparative advantage can lead to mutual gains from trade between two countries.

Question 6 [25 marks]
"Globalisation has done more to reduce poverty than any government policy." Evaluate this statement.`,
  },

  // ── CHEMISTRY PAPER 1: Higher ──
  {
    id: "chem-p1-higher-a",
    subject: "chemistry",
    paper: "1",
    tier: "Higher",
    title: "Chem Paper 1 Higher · Set A",
    description: "Topics 1–5: Atomic structure, bonding, quantitative chemistry, chemical changes, energy.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) · Paper 1 Higher · Set A\n\n**Time: 1 hour 45 minutes | Total: 100 marks**\n\nQuestion 1 [1 marks]\nWhat is the atomic number of an element?\n\nQuestion 2 [2 marks]\nDraw the electronic structure of a sodium atom (atomic number 11).\n\nQuestion 3 [2 marks]\nExplain why elements in the same group have similar chemical properties.\n\nQuestion 4 [3 marks]\nDescribe the bonding in sodium chloride.\n\nQuestion 5 [2 marks]\nState two properties of ionic compounds.\n\nQuestion 6a [1 marks]\nDefine relative formula mass.\n\nQuestion 6b [2 marks]\nCalculate the relative formula mass of CaCO₃. (Ar: Ca=40, C=12, O=16)\n\nQuestion 7 [3 marks]\nBalance: Fe₂O₃ + C → Fe + CO₂\n\nQuestion 8 [4 marks]\nCalculate the number of moles in 5.6 g of iron. (Ar: Fe=56)\n\nQuestion 9 [3 marks]\nDescribe the test for hydrogen gas.\n\nQuestion 10 [4 marks]\nCalculate the mass of NaCl produced when 25.0 cm³ of 0.1 mol/dm³ HCl reacts with excess NaOH. (Mr NaCl=58.5)\n\nQuestion 11 [3 marks]\nOrder by reactivity (most first): copper, magnesium, zinc, iron.\n\nQuestion 12 [4 marks]\nDescribe how copper is purified by electrolysis.\n\nQuestion 13 [3 marks]\nExplain why HCl + NaOH is exothermic.\n\nQuestion 14 [6 marks]\nCompare ionic and covalent bonding. Describe how each forms, give examples, and explain how bonding affects properties.\n\nQuestion 15 [4 marks]\n25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.5 mol/dm³ H₂SO₄. Calculate the concentration of NaOH. (2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O)\n\nQuestion 16 [3 marks]\nExplain why graphite conducts electricity but diamond does not.\n\nQuestion 17 [4 marks]\nCalculate atom economy for: 2Fe₂O₃ + 3C → 4Fe + 3CO₂\n\nQuestion 18 [3 marks]\nName the flame test colours for lithium, sodium, and potassium.\n\nQuestion 19 [4 marks]\nTheoretical yield is 15.0 g, actual yield is 12.3 g. Calculate percentage yield.\n\nQuestion 20 [3 marks]\nExplain oxidation and reduction in terms of electrons.`,
  },

  // ── CHEMISTRY PAPER 2: Higher ──
  {
    id: "chem-p2-higher-a",
    subject: "chemistry",
    paper: "2",
    tier: "Higher",
    title: "Chem Paper 2 Higher · Set A",
    description: "Topics 6–10: Rates, organic chemistry, analysis, atmosphere, resources.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) · Paper 2 Higher · Set A\n\n**Time: 1 hour 45 minutes | Total: 100 marks**\n\nQuestion 1 [2 marks]\nState two ways to increase the rate of a chemical reaction.\n\nQuestion 2 [3 marks]\nUsing collision theory, explain why increasing temperature increases rate.\n\nQuestion 3 [3 marks]\nDescribe how to measure the volume of gas produced over time.\n\nQuestion 4 [4 marks]\nSketch a graph of volume of gas vs time. Add a second line for higher temperature.\n\nQuestion 5 [2 marks]\nWhat is a catalyst? Give one industrial example.\n\nQuestion 6 [3 marks]\nDescribe how fractional distillation separates crude oil.\n\nQuestion 7 [2 marks]\nWrite the general formula for alkanes. Draw the displayed formula of propane.\n\nQuestion 8 [3 marks]\nWrite a balanced equation for complete combustion of methane.\n\nQuestion 9 [4 marks]\nExplain what cracking is and why it is carried out.\n\nQuestion 10 [3 marks]\nDescribe the test for an alkene. State the reagent and colour change.\n\nQuestion 11 [4 marks]\nAn Rf value is 0.65. The solvent front is 12.0 cm. Calculate the distance the spot travelled.\n\nQuestion 12 [3 marks]\nDescribe flame emission spectroscopy and state one advantage over flame tests.\n\nQuestion 13 [4 marks]\nDescribe how Earth's atmosphere has changed since formation.\n\nQuestion 14 [3 marks]\nExplain how human activities increase CO₂ levels.\n\nQuestion 15 [6 marks]\nEvaluate hydrogen as a fuel compared to petrol.\n\nQuestion 16 [4 marks]\nDescribe how potable water is produced from fresh water in the UK.\n\nQuestion 17 [3 marks]\nWhat is a life cycle assessment? State three factors it considers.\n\nQuestion 18 [3 marks]\nExplain what a reversible reaction is.\n\nQuestion 19 [4 marks]\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g) (exothermic). Explain the effect of increasing pressure on yield.\n\nQuestion 20 [3 marks]\nDescribe the test for sulfate ions.`,
  },

  // ── CHEMISTRY PAPER 1: Higher · Set B (Graph/Diagram Focus) ──
  {
    id: "chem-p1-higher-b",
    subject: "chemistry",
    paper: "1",
    tier: "Higher",
    title: "Chem Paper 1 Higher · Set B",
    description: "Graph & diagram focus: reaction profiles, energy diagrams, bonding dot-and-cross, titration curves.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) · Paper 1 Higher · Set B (Graph & Diagram Focus)

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
- Experiment A: marble chips (large) + 1M HCl · slow start, levels off at 45 cm³
- Experiment B: marble powder + 1M HCl · fast start, levels off at 45 cm³

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

  // ── CHEMISTRY PAPER 2: Higher · Set B (Graph/Diagram Focus) ──
  {
    id: "chem-p2-higher-b",
    subject: "chemistry",
    paper: "2",
    tier: "Higher",
    title: "Chem Paper 2 Higher · Set B",
    description: "Graph & diagram focus: rate graphs, tangent method, chromatography, atmospheric data.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) · Paper 2 Higher · Set B (Graph & Diagram Focus)

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

  // ── MATHS PAPER 2: Higher · Set B (Graph/Diagram Focus) ──
  {
    id: "maths-p2-higher-b",
    subject: "maths",
    paper: "2",
    tier: "Higher",
    title: "Paper 2 Higher · Set B",
    description: "Calculator. Graph & diagram focus: coordinate geometry, transformations, data charts, real-life graphs.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 2 Higher (Calculator) · Set B (Graph & Diagram Focus)

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
- Runner B: starts at $t = 0$, accelerates · reaches 100m at $t = 11$ seconds (curve)

(a) What was Runner A's speed?
(b) Who was ahead at $t = 6$ seconds? Explain.
(c) At what time did Runner B overtake Runner A?`,
  },

  // ── MATHS PAPER 1: Foundation · Set B (Graph/Diagram Focus) ──
  {
    id: "maths-p1-foundation-b",
    subject: "maths",
    paper: "1",
    tier: "Foundation",
    title: "Paper 1 Foundation · Set B",
    description: "Non-Calculator. Graph & diagram focus: bar charts, pictograms, reading scales, basic coordinates.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 1 Foundation (Non-Calculator) · Set B (Graph & Diagram Focus)

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
    title: "Paper 2 · Set C",
    description: "Macroeconomic analysis focus: AD/AS diagrams, Phillips curve, multiplier, fiscal/monetary policy evaluation.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/2) · Paper 2: National and International Economy · Predicted Paper Set C

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in both Section A and Section B.

---

## Section A: Data Response (40 marks)

**Extract A · UK fiscal stance and the inflation cycle**

In 2024 UK national debt exceeded 100% of GDP for the first time since the 1960s, at £2.7 trillion. Despite this, real public spending rose 3.5%. The OBR forecast GDP growth of 0.6% in 2024 rising to 1.4% in 2025. The Bank of England began cutting Bank Rate from 5.25% in late 2024 as headline CPI fell to 2.3%, although core inflation remained sticky at 3.6%. The pound depreciated 5% against the dollar.

**Extract B · UK macroeconomic indicators, 2022–2025**

| Indicator                  | 2022 | 2023 | 2024 | 2025 (f) |
|----------------------------|------|------|------|----------|
| Real GDP growth (%)        | 4.3  | 0.1  | 0.6  | 1.4      |
| CPI inflation (%)          | 9.1  | 7.3  | 3.2  | 2.3      |
| Unemployment (%)           | 3.7  | 4.2  | 4.3  | 4.1      |
| Budget deficit (% GDP)     | 5.1  | 4.3  | 4.8  | 3.9      |
| National debt (% GDP)      | 85   | 93   | 101  | 103      |
| Bank Rate (%)              | 3.5  | 5.25 | 4.75 | 4.0      |

**Extract C · Further commentary**

Economists disagree on whether 2022–24 inflation was demand-pull (excess household savings of c. £200bn after the pandemic) or cost-push (gas prices, supply-chain disruption). By 2024 the supply-side pressures had eased, but demand remained weak owing to the lagged effect of monetary tightening.

Question 1 [2 marks]
Using Extract B, calculate the change in the UK budget deficit as a share of GDP between 2023 and 2024.

Question 2 [4 marks]
Using an AD/AS diagram, explain the likely effect on UK real output and the price level of a cut in Bank Rate.

Question 3 [9 marks]
Using the extracts and your knowledge of economics, analyse two reasons why UK inflation between 2022 and 2024 may have been driven primarily by cost-push factors.

Question 4 [25 marks]
Using the extracts and your own knowledge, evaluate the view that reducing the budget deficit should be the UK government's top macroeconomic priority.

---

## Section B: Essay (40 marks)


**Short extract:**
Monetary and fiscal policy face long and variable lags and may conflict in their objectives. Central bank independence is widely regarded as critical for credible inflation targeting.

Question 5 [15 marks]
Explain how the transmission mechanism of monetary policy affects aggregate demand.

Question 6 [25 marks]
"Fiscal policy is more effective than monetary policy in stabilising the macroeconomy after a deep recession." Evaluate this statement.`,
  },

  // ── ECONOMICS PAPER 1: Set C (Diagram & Graph Focus) ──
  {
    id: "econ-p1-c",
    subject: "economics",
    paper: "1",
    title: "Paper 1 · Set C",
    description: "Diagram & graph focus: supply/demand shifts, welfare analysis, elasticity diagrams, market structures.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/1) · Paper 1: Markets and Market Failure · Predicted Paper Set C

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in both Section A and Section B.

---

## Section A: Data Response (40 marks)

**Extract A · UK energy price cap and the household energy market**

Following the 2022 wholesale gas price spike, the UK government introduced the Energy Price Guarantee, capping the average dual-fuel household bill at £2,500. From 2024 the cap is reset quarterly by Ofgem and fell to £1,568. Critics argue the cap dampens price signals to invest in efficiency; supporters say it shielded vulnerable households at a critical moment. Renewables generated 47% of UK electricity in 2024, up from 37% in 2019, but gas remains essential for baseload supply.

**Extract B · UK energy market data, 2019–2024**

| Year | Average annual bill (£) | Wholesale gas (p/therm) | Renewables share (%) | Fuel poverty (% of households) |
|------|-------------------------|-------------------------|----------------------|--------------------------------|
| 2019 | 1,254                   | 40                      | 37                   | 10.3                           |
| 2021 | 1,138                   | 55                      | 40                   | 13.2                           |
| 2022 | 2,500 (capped)          | 200                     | 42                   | 19.8                           |
| 2024 | 1,568 (capped)          | 68                      | 47                   | 14.5                           |

**Extract C · Further commentary**

Ofgem estimates that the price cap created an effective shortage at the peak of the crisis: at the capped price, quantity demanded exceeded the quantity suppliers were willing to supply at unsubsidised cost, requiring £40bn of taxpayer support to retailers. Income-based studies show the lowest decile spent 11% of disposable income on energy in 2022 versus 4% for the top decile.

Question 1 [2 marks]
Using Extract B, calculate the change in the proportion of households in fuel poverty between 2019 and 2024.

Question 2 [4 marks]
Using a supply and demand diagram, explain how a maximum price (price ceiling) below equilibrium creates excess demand in the household energy market.

Question 3 [9 marks]
Using the extracts and your knowledge of economics, analyse two reasons why the energy price cap may correct or worsen market failure.

Question 4 [25 marks]
Using the extracts and your own knowledge, evaluate the view that maximum prices are the most effective way to protect consumers in essential markets such as energy.

---

## Section B: Essay (40 marks)


**Short extract:**
Government intervention in markets often involves trade-offs between equity and efficiency. Maximum prices, subsidies and direct provision may protect consumers but distort price signals and impose deadweight losses.

Question 5 [15 marks]
Explain, using a diagram, how a per-unit subsidy to renewable electricity producers affects equilibrium price and quantity.

Question 6 [25 marks]
"Government failure is often worse than the market failure it tries to correct." Evaluate this statement with reference to UK price controls or subsidies.`,
  },

  // ── MATHS PAPER 3: Foundation · Set A ──
  {
    id: "maths-p3-foundation-a",
    subject: "maths",
    paper: "3",
    tier: "Foundation",
    title: "Paper 3 Foundation · Set A",
    description: "Calculator allowed. Real-life graphs, data handling, ratio, and basic geometry.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 3 Foundation (Calculator) · Predicted Paper Set A

**Time: 1 hour 30 minutes | Total: 80 marks | Calculator ALLOWED**

Answer ALL questions. Show all your working out.

Question 1 [1 marks]
Write down the value of $7^2$.

Question 2 [2 marks]
A bag contains 3 red, 4 blue, and 5 green marbles. A marble is picked at random. What is the probability it is not blue?

Question 3 [2 marks]
Work out $15\\%$ of £240.

Question 4 [3 marks]
The conversion graph below converts miles to kilometres:

| Miles | 0 | 10 | 20 | 30 | 40 | 50 |
|-------|---|----|----|----|----|-----|
| Km    | 0 | 16 | 32 | 48 | 64 | 80 |

(a) Convert 25 miles to kilometres.
(b) Convert 56 km to miles.

Question 5 [3 marks]
A recipe for 8 flapjacks uses 200 g oats, 120 g butter, and 80 g sugar. How much of each ingredient is needed for 20 flapjacks?

Question 6 [3 marks]
The table shows the shoe sizes of 25 students:

| Size | 4 | 5 | 6 | 7 | 8 | 9 |
|------|---|---|---|---|---|---|
| Freq | 2 | 5 | 8 | 6 | 3 | 1 |

(a) Write down the mode.
(b) Find the median shoe size.
(c) Calculate the mean shoe size.

Question 7 [3 marks]
Solve $4x + 7 = 31$.

Question 8 [4 marks]
The line graph shows the number of visitors to a museum each month:

| Month | Jan | Feb | Mar | Apr | May | Jun |
|-------|-----|-----|-----|-----|-----|-----|
| Visitors | 1200 | 900 | 1500 | 2100 | 2800 | 3200 |

(a) Which month had the fewest visitors?
(b) Calculate the increase from January to June.
(c) Between which two consecutive months was the biggest increase?

Question 9 [3 marks]
A rectangle has length 12 cm and width 7.5 cm. Calculate the perimeter and area.

Question 10 [4 marks]
The scatter diagram shows hours of sunshine and temperature for 8 days:

| Hours of sunshine | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 |
|-------------------|---|---|---|---|---|---|---|-----|
| Temperature (°C)  | 14 | 15 | 18 | 19 | 21 | 22 | 24 | 25 |

(a) Describe the type of correlation.
(b) Estimate the temperature when there are 4 hours of sunshine.
(c) Explain why you cannot reliably predict the temperature for 15 hours of sunshine.

Question 11 [3 marks]
Share £360 in the ratio $4:5$.

Question 12 [4 marks]
A car travels at 48 mph for 2 hours 15 minutes. How far does it travel?

Question 13 [3 marks]
The pie chart shows how 180 students travel to school:
- Walk: 100°
- Bus: 80°
- Car: 120°
- Cycle: 60°

How many students walk? How many students go by car?

Question 14 [4 marks]
A cylinder has radius 5 cm and height 12 cm. Calculate the volume. Give your answer correct to 1 decimal place.

Question 15 [3 marks]
Expand and simplify $5(2x - 3) - 2(x + 4)$.

Question 16 [4 marks]
The dual bar chart shows test results for boys and girls:

| Mark range | 0–20 | 21–40 | 41–60 | 61–80 | 81–100 |
|------------|------|-------|-------|-------|--------|
| Boys       | 2    | 5     | 8     | 10    | 5      |
| Girls      | 1    | 3     | 10    | 12    | 4      |

(a) How many boys scored 61–80?
(b) How many students were surveyed in total?
(c) What percentage of girls scored 41 or above?

Question 17 [4 marks]
A shop sells orange juice in two sizes:
- Small: 500 ml for £1.20
- Large: 1.5 litres for £3.30

Which size is better value for money? Show your working.

Question 18 [3 marks]
A right-angled triangle has base 5 cm and height 12 cm. Calculate the length of the hypotenuse.

Question 19 [4 marks]
£3000 is invested at 2% compound interest per annum. Calculate the value after 3 years.

Question 20 [3 marks]
The probability of rain on Monday is 0.4. The probability of rain on Tuesday is 0.3. The two events are independent.
(a) Find the probability it rains on both days.
(b) Find the probability it rains on neither day.

Question 21 [4 marks]
The time series graph shows the quarterly sales (in £thousands) for a shop:

| Quarter | Q1 2023 | Q2 2023 | Q3 2023 | Q4 2023 | Q1 2024 | Q2 2024 |
|---------|---------|---------|---------|---------|---------|---------|
| Sales   | 45      | 52      | 48      | 68      | 50      | 58      |

(a) In which quarter were sales highest?
(b) Describe the overall trend.
(c) Suggest a reason for the pattern in Q4 sales.

Question 22 [3 marks]
Write $\\dfrac{3}{8}$ as (a) a decimal, (b) a percentage.

Question 23 [4 marks]
The diagram shows an L-shaped room. The main section is 8m × 5m. A smaller section of 3m × 2m extends from one corner. Calculate the total area of the room. Carpet costs £12.50 per m². Calculate the cost to carpet the room.`,
  },

  // ── MATHS PAPER 1: Higher · Set C ──
  {
    id: "maths-p1-higher-c",
    subject: "maths",
    paper: "1",
    tier: "Higher",
    title: "Paper 1 Higher · Set C",
    description: "Non-Calculator. Graph transformations, quadratic sketching, probability trees, algebraic proof.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 1 Higher (Non-Calculator) · Predicted Paper Set C

**Time: 1 hour 30 minutes | Total: 80 marks**

Answer ALL questions. Show all your working out.

Question 1 [2 marks]
Simplify $\\dfrac{8}{12}$ fully.

Question 2 [2 marks]
Write $56000$ in standard form.

Question 3 [3 marks]
Expand and simplify $(2x - 1)(3x + 4)$.

Question 4 [3 marks]
The ratio of boys to girls in a class is $3:5$. There are 12 boys. How many students are there altogether?

Question 5 [3 marks]
Factorise $x^2 - 7x + 12$.

Question 6 [4 marks]
The graph of $y = x^2 - 2x - 3$ is a parabola.

**Graph description:**
- The parabola crosses the x-axis at $(-1, 0)$ and $(3, 0)$
- The y-intercept is at $(0, -3)$
- The turning point (minimum) is at $(1, -4)$
- The curve is U-shaped, opening upward

(a) Write down the coordinates of the turning point.
(b) Write down the equation of the line of symmetry.
(c) Use the graph to find the values of $x$ when $y = 5$.

Question 7 [4 marks]
Solve the simultaneous equations:
$$3x + 2y = 11$$
$$x - y = 2$$

Question 8 [3 marks]
Simplify $\\sqrt{72} - \\sqrt{18}$.

Question 9 [4 marks]
A probability tree shows two events. A bag contains 4 red and 6 blue counters. A counter is drawn AND NOT replaced. Then a second counter is drawn.

(a) Complete the probability tree for drawing two counters without replacement.
(b) Find the probability of getting two red counters.
(c) Find the probability of getting exactly one blue counter.

Question 10 [4 marks]
The graph of $y = f(x)$ passes through the points $(-3, 0)$, $(0, 9)$, $(3, 0)$ with a maximum at $(0, 9)$.

Sketch on separate axes:
(a) $y = f(x) + 2$
(b) $y = f(x - 3)$
(c) $y = -f(x)$
For each, write the new coordinates of the maximum point.

Question 11 [3 marks]
A price increases from £85 to £102. Calculate the percentage increase.

Question 12 [4 marks]
Show that $\\dfrac{x+2}{3} - \\dfrac{x-1}{4} = \\dfrac{x + 11}{12}$.

Question 13 [5 marks]
The velocity–time graph for a cyclist is described below:

**Graph description:**
- From $t = 0$ to $t = 10$: velocity increases linearly from 0 to 8 m/s
- From $t = 10$ to $t = 25$: velocity is constant at 8 m/s
- From $t = 25$ to $t = 30$: velocity decreases linearly from 8 to 0 m/s

(a) Calculate the acceleration in the first 10 seconds.
(b) Calculate the total distance travelled.
(c) Calculate the average speed for the entire journey.

Question 14 [4 marks]
A sector of a circle has radius 10 cm and arc length $15$ cm. Find the angle of the sector in degrees.

Question 15 [5 marks]
Prove algebraically that $(2n+1)^2 - (2n-1)^2$ is always a multiple of 8 for all positive integers $n$.

Question 16 [3 marks]
Solve the inequality $5 - 2x \\ge 3x + 1$. Represent your solution on a number line.

Question 17 [4 marks]
A Venn diagram shows information about 40 students. Set A = French, Set B = Spanish.
- Only French: 12
- Only Spanish: 8
- Both: 15
- Neither: 5

(a) Find the probability a randomly chosen student studies French.
(b) Find the probability a student studies Spanish given they study French.

Question 18 [5 marks]
Rearrange $v = \\dfrac{u + at}{1 - bt}$ to make $t$ the subject.

Question 19 [5 marks]
A frustum is formed by removing a small cone of height 4 cm and radius 2 cm from a cone of height 12 cm and radius 6 cm. Show that the volume of the frustum is $\\dfrac{416\\pi}{3}$ cm³.

Question 20 [4 marks]
Without a calculator, find the exact value of $\\tan 60° + \\cos 30°$. Simplify your answer.

Question 21 [4 marks]
The quadratic sequence begins: 5, 11, 21, 35, ...
Find the nth term.

Question 22 [5 marks]
The diagram shows a solid cylinder on a horizontal floor.

The cylinder has a height of 40 cm and a volume of 1200 cm³.

The cylinder exerts a force of 90 newtons on the floor.

$$\\text{pressure} = \\dfrac{\\text{force}}{\\text{area}}$$

Work out the pressure on the floor due to the cylinder. Give your answer in newtons per cm². Show all your working.`,
  },

  // ── MATHS PAPER 3: Higher · Set B ──
  {
    id: "maths-p3-higher-b",
    subject: "maths",
    paper: "3",
    tier: "Higher",
    title: "Paper 3 Higher · Set B",
    description: "Calculator. Histograms, box plots, trigonometry, iteration, and real-life problem-solving.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 3 Higher (Calculator) · Predicted Paper Set B

**Time: 1 hour 30 minutes | Total: 80 marks | Calculator ALLOWED**

Answer ALL questions. Show all your working out.

Question 1 [2 marks]
Work out $3.2 \\times 10^4 \\div 8 \\times 10^{-2}$. Give your answer in standard form.

Question 2 [3 marks]
Toothpaste is sold in three sizes:
- 75 ml tube for £1.50
- 125 ml tube for £2.20
- 200 ml tube for £3.80
Which tube is the best value for money? Show your working.

Question 3 [3 marks]
A water tank is in the shape of a cuboid with base 40 cm × 30 cm. Water is poured in at a rate of 600 cm³ per minute. How long does it take to fill the tank to a depth of 25 cm?

Question 4 [4 marks]
The histogram shows the times (in minutes) for 120 people to complete a task:

**Histogram data:**
| Time $t$ (min) | $0 < t \\le 10$ | $10 < t \\le 20$ | $20 < t \\le 30$ | $30 < t \\le 50$ | $50 < t \\le 80$ |
|---|---|---|---|---|---|
| Frequency | 15 | 30 | 35 | 28 | 12 |

(a) Calculate the frequency density for each class.
(b) Estimate the number of people who took between 15 and 40 minutes.

Question 5 [4 marks]
Two box plots compare the test scores of Class A and Class B:

**Class A:** Min: 32, Q1: 45, Median: 58, Q3: 72, Max: 95
**Class B:** Min: 40, Q1: 52, Median: 61, Q3: 68, Max: 88

(a) Find the interquartile range for each class.
(b) Compare the two distributions. Make two valid comparisons referring to the data.

Question 6 [4 marks]
A triangle $ABC$ has $AB = 9.2$ cm, $BC = 7.5$ cm, and angle $ABC = 48°$. Calculate the area of the triangle.

Question 7 [4 marks]
The cumulative frequency table shows journey times for 80 commuters:

| Time $t$ (min) | $t \\le 10$ | $t \\le 20$ | $t \\le 30$ | $t \\le 40$ | $t \\le 50$ | $t \\le 60$ |
|---|---|---|---|---|---|---|
| Cum. freq | 4 | 14 | 32 | 56 | 72 | 80 |

(a) Draw a cumulative frequency graph.
(b) Find the median journey time.
(c) Find the interquartile range.
(d) Estimate how many commuters took more than 35 minutes.

Question 8 [5 marks]
Use the iteration formula $x_{n+1} = \\sqrt{\\dfrac{3x_n + 7}{2}}$ with $x_0 = 3$. Find $x_1$, $x_2$, $x_3$, and $x_4$ to 4 decimal places. State the solution to 2 decimal places.

Question 9 [4 marks]
A boat is 150 m from the base of a vertical cliff. The angle of elevation from the boat to the top of the cliff is $23°$. Calculate the height of the cliff.

Question 10 [5 marks]
The graph of $y = 2\\sin x$ for $0° \\le x \\le 360°$:

**Graph description:**
- Passes through $(0, 0)$, peaks at $(90°, 2)$, crosses at $(180°, 0)$, troughs at $(270°, -2)$, returns to $(360°, 0)$

(a) Write down the amplitude.
(b) Solve $2\\sin x = 1.4$ for $0° \\le x \\le 360°$. Give answers to 1 decimal place.
(c) How many solutions does $2\\sin x = 3$ have? Explain your answer.

Question 11 [4 marks]
Two similar cylinders have radii 3 cm and 5 cm. The smaller cylinder has volume $108\\pi$ cm³. Find the volume of the larger cylinder.

Question 12 [4 marks]
The real-life graph shows the depth of water in a swimming pool as it is being filled:

**Graph description:**
- x-axis: Time (hours), 0 to 6
- y-axis: Depth (m), 0 to 2.0
- 0 to 2 hours: depth increases from 0 to 0.8 m (steep, linear)
- 2 to 3 hours: depth stays at 0.8 m (horizontal · pump stopped)
- 3 to 6 hours: depth increases from 0.8 to 2.0 m (linear, less steep than before)

(a) Calculate the rate of filling in the first 2 hours.
(b) What happened between 2 and 3 hours?
(c) Calculate the rate of filling from 3 to 6 hours.

Question 13 [4 marks]
A cone has a curved surface area of $120\\pi$ cm² and slant height 15 cm. Calculate the radius of the cone.

Question 14 [5 marks]
Solve the simultaneous equations:
$$y = x^2 - 3x + 1$$
$$y = 2x - 5$$

Question 15 [4 marks]
The graph shows the exchange rate between pounds and dollars over 5 months:

| Month | Jan | Feb | Mar | Apr | May |
|-------|-----|-----|-----|-----|-----|
| £1 = $ | 1.25 | 1.22 | 1.28 | 1.30 | 1.27 |

(a) In which month was the pound strongest against the dollar?
(b) Sarah changed £400 to dollars in February, then changed them back to pounds in April. Calculate her profit.

Question 16 [5 marks]
The frequency table shows the weights of 100 parcels:

| Weight $w$ (kg) | $0 < w \\le 2$ | $2 < w \\le 4$ | $4 < w \\le 6$ | $6 < w \\le 10$ |
|---|---|---|---|---|
| Frequency | 20 | 35 | 30 | 15 |

(a) Calculate an estimate for the mean weight.
(b) Draw a histogram to represent this data.
(c) Estimate the number of parcels weighing more than 5 kg.

Question 17 [4 marks]
In triangle $PQR$, $PQ = 12$ cm, $PR = 8$ cm, and $QR = 10$ cm. Use the cosine rule to find angle $QPR$.

Question 18 [4 marks]
A geometric sequence has first term 5 and common ratio $\\dfrac{2}{3}$. Find the sum of the first 4 terms. Give your answer as a fraction.`,
  },

  // ── MATHS PAPER 2: Foundation · Set B ──
  {
    id: "maths-p2-foundation-b",
    subject: "maths",
    paper: "2",
    tier: "Foundation",
    title: "Paper 2 Foundation · Set B",
    description: "Calculator. Scatter graphs, pie charts, real-life problems, and basic statistics.",
    totalMarks: 80,
    content: `# Edexcel GCSE Mathematics (1MA1) · Paper 2 Foundation (Calculator) · Set B

**Time: 1 hour 30 minutes | Total: 80 marks | Calculator ALLOWED**

Answer ALL questions. Show all your working out.

Question 1 [1 marks]
What is $\\dfrac{1}{5}$ as a decimal?

Question 2 [2 marks]
A train departs at 08:47 and arrives at 10:15. How long is the journey?

Question 3 [2 marks]
Round 3847 to the nearest hundred.

Question 4 [3 marks]
Sarah earns £9.20 per hour. She works 37.5 hours per week. How much does she earn per week?

Question 5 [3 marks]
The bar chart shows favourite pizza toppings for 40 students:
- Pepperoni: 14
- Margherita: 10
- Hawaiian: 6
- BBQ Chicken: 8
- Vegetarian: 2

(a) How many students chose Pepperoni?
(b) What percentage of students chose Margherita?
(c) A student is picked at random. What is the probability they chose Hawaiian?

Question 6 [3 marks]
Solve $3(2x - 5) = 21$.

Question 7 [4 marks]
The scatter diagram shows the relationship between age and reaction time:

| Age (years) | 15 | 20 | 25 | 30 | 40 | 50 | 55 | 65 |
|---|---|---|---|---|---|---|---|---|
| Reaction time (ms) | 210 | 220 | 230 | 235 | 260 | 285 | 300 | 330 |

(a) Describe the correlation.
(b) Estimate the reaction time for a 35-year-old.
(c) Why would it be unreliable to predict the reaction time for a 90-year-old?

Question 8 [3 marks]
Increase £450 by 12%.

Question 9 [4 marks]
The pie chart shows how 90 people travel to work:
- Car: 140°
- Bus: 80°
- Walk: 60°
- Train: 40°
- Cycle: 40°

(a) How many people travel by car?
(b) How many more people walk than cycle?

Question 10 [3 marks]
A cuboid has dimensions 6 cm × 4 cm × 10 cm. Calculate the surface area.

Question 11 [4 marks]
A line graph shows the price of petrol per litre over 6 months:

| Month | Jan | Feb | Mar | Apr | May | Jun |
|-------|-----|-----|-----|-----|-----|-----|
| Price (p) | 142 | 145 | 148 | 155 | 152 | 158 |

(a) What was the cheapest month for petrol?
(b) Calculate the percentage increase from January to June. Give your answer to 1 decimal place.
(c) Between which two months was there a decrease in price?

Question 12 [3 marks]
Find the LCM of 12 and 18.

Question 13 [4 marks]
A right-angled triangle has sides 8 cm and 15 cm. Calculate the hypotenuse. Then calculate the area of the triangle.

Question 14 [4 marks]
The frequency table shows the number of goals scored per match by a football team in 20 matches:

| Goals | 0 | 1 | 2 | 3 | 4 |
|-------|---|---|---|---|---|
| Frequency | 3 | 7 | 5 | 4 | 1 |

(a) Calculate the mean number of goals.
(b) Find the median.
(c) A journalist says "the team usually scores 2 or more goals." Is this correct? Explain.

Question 15 [3 marks]
Plot the graph of $y = 3x - 2$ for $x$ from $-1$ to $3$.

**Table:**
| $x$ | -1 | 0 | 1 | 2 | 3 |
|-----|-----|---|---|---|---|
| $y$ | -5 | -2 | 1 | 4 | 7 |

What is the gradient of the line?

Question 16 [3 marks]
Batteries are sold in packs of 4, in packs of 8, and in packs of 12.

A pack of 4 batteries costs £1.80
A pack of 8 batteries costs £3.20
A pack of 12 batteries costs £6.00

Which pack gives the best value for money? You must show how you get your answer.

Question 17 [3 marks]
A circle has radius 8.5 cm. Calculate the circumference. Give your answer to 1 decimal place.

Question 18 [4 marks]
A bag contains 5 red, 3 blue, and 2 yellow beads. Two beads are drawn at random with replacement.
(a) What is the probability of drawing two red beads?
(b) What is the probability of drawing one red and one blue (in any order)?

Question 19 [4 marks]
The two-way table shows information about 60 students' exam results:

| | Pass | Fail | Total |
|---|---|---|---|
| Revised | 28 | 4 | |
| Did not revise | 12 | 16 | |
| Total | | | 60 |

Complete the table. Is there evidence that revising improves results? Explain using the data.

Question 20 [3 marks]
Simplify $\\dfrac{4x^2y}{8xy^3}$.

Question 21 [4 marks]
A semicircle has diameter 14 cm. Calculate the perimeter of the semicircle (the curved part plus the diameter). Give your answer to 1 decimal place.

Question 22 [4 marks]
£5000 is invested in a savings account paying 1.8% compound interest per year. Calculate the total amount after 4 years. Give your answer to the nearest penny.`,
  },

  // ── CHEMISTRY PAPER 1: Foundation · Set A ──
  {
    id: "chem-p1-foundation-a",
    subject: "chemistry",
    paper: "1",
    tier: "Foundation",
    title: "Chem Paper 1 Foundation · Set A",
    description: "Foundation tier. Atomic structure, bonding basics, simple calculations, chemical changes, energy.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462/F) · Paper 1 Foundation · Set A

**Time: 1 hour 45 minutes | Total: 100 marks**

Question 1 [1 marks]
Which subatomic particle has a negative charge?
A. Proton
B. Neutron
C. Electron
D. Nucleus

Question 2 [1 marks]
How many electrons does a sodium atom (Na, atomic number 11) have?
A. 10
B. 11
C. 12
D. 23

Question 3 [1 marks]
Which of these is a property of ionic compounds?
A. Low melting point
B. Conduct electricity when solid
C. Conduct electricity when dissolved in water
D. Soft crystals

Question 4 [2 marks]
Draw the electronic structure of a magnesium atom (atomic number 12). Show the electrons in each shell.

Question 5 [2 marks]
Name the type of bonding in water (H₂O). Describe how this bond forms.

Question 6 [3 marks]
The diagram below shows the structure of sodium chloride:

**Diagram description:**
- A 3D lattice arrangement of alternating positive ions (Na⁺, small) and negative ions (Cl⁻, large)
- Regular repeating pattern in all directions

Explain why sodium chloride has a high melting point.

Question 7 [2 marks]
Balance this equation: Mg + O₂ → MgO

Question 8 [3 marks]
The bar chart shows the reactivity of four metals:

| Metal | Reactivity (relative scale 1–10) |
|-------|----------------------------------|
| Potassium | 9 |
| Calcium | 7 |
| Zinc | 4 |
| Copper | 1 |

Using the data, predict which metal would react most vigorously with water. Explain your reasoning.

Question 9 [2 marks]
Describe the test for hydrogen gas. State the result.

Question 10 [3 marks]
Calculate the relative formula mass (Mr) of calcium carbonate, CaCO₃. (Ar: Ca = 40, C = 12, O = 16)

Question 11 [3 marks]
The diagram shows the energy level diagram for a reaction:

**Energy diagram:**
- Reactants energy level: 200 kJ
- Products energy level: 120 kJ
- Peak (activation energy barrier): 280 kJ

(a) Is this reaction exothermic or endothermic? Explain.
(b) What is the overall energy change?

Question 12 [4 marks]
Describe how to carry out a flame test. Name the colours produced by:
(a) Lithium
(b) Sodium
(c) Potassium

Question 13 [3 marks]
What is an acid? Give two examples of common acids and their formulae.

Question 14 [4 marks]
Complete the word equations:
(a) hydrochloric acid + sodium hydroxide → ___ + ___
(b) sulfuric acid + magnesium → ___ + ___

Write the balanced symbol equation for reaction (b).

Question 15 [6 marks]
Compare ionic bonding and covalent bonding. In your answer:
- Describe how each type of bond forms
- Give an example of a substance with each type of bonding
- Explain one property difference between ionic and covalent substances

Question 16 [3 marks]
The graph shows how the temperature changes during a neutralisation reaction:

**Graph description:**
- x-axis: Volume of acid added (cm³), 0 to 50
- y-axis: Temperature (°C), 18 to 30
- Temperature starts at 20°C, rises to 28°C at 25 cm³, then stays constant at 28°C

(a) What is the temperature change?
(b) At what volume of acid is the reaction complete?

Question 17 [3 marks]
Describe the difference between an element, a compound, and a mixture.

Question 18 [4 marks]
The table shows the results of adding metals to acid:

| Metal | Observation with dilute HCl |
|-------|----------------------------|
| Magnesium | Vigorous fizzing, dissolves quickly |
| Iron | Slow fizzing, dissolves slowly |
| Copper | No reaction |
| Zinc | Moderate fizzing, dissolves |

Put the metals in order of reactivity (most reactive first).

Question 19 [3 marks]
Draw a dot-and-cross diagram to show the bonding in hydrogen chloride (HCl). Show only the outer shell electrons.

Question 20 [4 marks]
Explain what happens during electrolysis of molten lead bromide. State what is produced at each electrode.

Question 21 [2 marks]
What is meant by the term 'oxidation' in terms of oxygen?

Question 22 [3 marks]
The pie chart shows the percentage of elements in Earth's crust:
- Oxygen: 46%
- Silicon: 28%
- Aluminium: 8%
- Iron: 5%
- Others: 13%

Which element is most abundant? What is the total percentage of oxygen and silicon?

Question 23 [4 marks]
A student adds dilute acid to a metal carbonate. Describe what you would observe. Write a word equation for the reaction of calcium carbonate with hydrochloric acid.

Question 24 [3 marks]
Explain why graphite can conduct electricity but diamond cannot. Both are forms of carbon.`,
  },

  // ── CHEMISTRY PAPER 2: Foundation · Set A ──
  {
    id: "chem-p2-foundation-a",
    subject: "chemistry",
    paper: "2",
    tier: "Foundation",
    title: "Chem Paper 2 Foundation · Set A",
    description: "Foundation tier. Rates, organic basics, analysis, atmosphere, and resources.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462/F) · Paper 2 Foundation · Set A

**Time: 1 hour 45 minutes | Total: 100 marks**

Question 1 [1 marks]
Which of the following will increase the rate of a chemical reaction?
A. Decreasing the temperature
B. Increasing the concentration of reactants
C. Using larger pieces of solid reactant
D. Removing a catalyst

Question 2 [1 marks]
What is the general formula for alkanes?
A. CₙH₂ₙ
B. CₙH₂ₙ₊₂
C. CₙH₂ₙ₋₂
D. CₙHₙ

Question 3 [1 marks]
Which gas makes up approximately 78% of Earth's atmosphere today?
A. Oxygen
B. Carbon dioxide
C. Nitrogen
D. Argon

Question 4 [2 marks]
State two ways to increase the rate of a chemical reaction.

Question 5 [3 marks]
Using collision theory, explain why increasing the temperature increases the rate of reaction.

Question 6 [4 marks]
The graph shows the volume of gas produced over time for a reaction:

**Graph description:**
- x-axis: Time (s), 0 to 120
- y-axis: Volume of gas (cm³), 0 to 50
- The curve starts steeply from 0, at 20s: 30 cm³, at 40s: 40 cm³, at 60s: 46 cm³, at 80s: 48 cm³, at 100s: 49 cm³, levels off at 50 cm³

(a) At what time does the reaction stop?
(b) At what time is the reaction fastest? How can you tell from the graph?
(c) A second experiment uses the same mass of reactant but at a higher temperature. Sketch how the graph would change.

Question 7 [3 marks]
Name the first four alkanes and draw the displayed formula of methane.

Question 8 [3 marks]
Write a balanced symbol equation for the complete combustion of propane (C₃H₈). Include state symbols.

Question 9 [4 marks]
Describe what fractional distillation is. Explain how it separates the different hydrocarbons in crude oil.

Question 10 [3 marks]
What is cracking? Name the two methods of cracking. Why is cracking important to the oil industry?

Question 11 [3 marks]
Describe the test to distinguish between an alkane and an alkene. State the reagent and observation.

Question 12 [4 marks]
The chromatogram below shows the results of testing two food colourings:

**Chromatogram description:**
- Solvent front: 10.0 cm
- Food A has one spot at 6.0 cm from the baseline
- Food B has two spots: one at 6.0 cm and one at 4.0 cm

(a) Calculate the Rf value for Food A.
(b) Is Food B a pure substance or a mixture? Explain.
(c) What can you say about the relationship between Food A and one of the components of Food B?

Question 13 [3 marks]
Describe how Earth's early atmosphere was different from today. Name one process that increased oxygen levels.

Question 14 [4 marks]
The bar chart shows greenhouse gas emissions by sector in the UK:

| Sector | Emissions (MtCO₂e) |
|--------|---------------------|
| Transport | 120 |
| Energy supply | 90 |
| Business | 75 |
| Residential | 65 |
| Agriculture | 50 |

(a) Which sector produces the most emissions?
(b) Calculate the total emissions shown.
(c) Suggest one way the transport sector could reduce its emissions.

Question 15 [6 marks]
Evaluate the use of hydrogen as a fuel for cars compared to petrol. In your answer, consider:
- Environmental impact
- Practical considerations
- Safety

Question 16 [3 marks]
Describe the steps needed to produce potable water from fresh water in the UK.

Question 17 [3 marks]
What is a life cycle assessment (LCA)? Name three stages it considers.

Question 18 [4 marks]
The graph shows how the rate of reaction changes when a catalyst is added:

**Graph description · mass of product vs time:**
- Without catalyst: curve rises slowly, reaches 3.5 g at 200 seconds
- With catalyst: curve rises steeply, reaches 3.5 g at 80 seconds
- Both curves level off at the same final mass of 3.5 g

(a) What effect does the catalyst have on the rate?
(b) Why do both curves reach the same final mass?
(c) What is a catalyst?

Question 19 [3 marks]
Describe the greenhouse effect. Explain how carbon dioxide contributes to it.

Question 20 [4 marks]
The data table shows the pH of different solutions:

| Solution | pH |
|----------|-----|
| Lemon juice | 2 |
| Water | 7 |
| Baking soda | 9 |
| Oven cleaner | 13 |

(a) Which solution is the most acidic?
(b) Which solution is neutral?
(c) Classify baking soda as acidic, neutral, or alkaline.

Question 21 [3 marks]
Explain why it is important to recycle metals. Give two reasons.

Question 22 [3 marks]
What is the difference between a finite resource and a renewable resource? Give one example of each.

Question 23 [4 marks]
A student tests four solutions using silver nitrate solution (AgNO₃). The results are:

| Solution | Observation |
|----------|------------|
| A | White precipitate |
| B | Cream precipitate |
| C | Yellow precipitate |
| D | No precipitate |

Identify the halide ion present in solutions A, B, and C.

Question 24 [3 marks]
Describe two ways to reduce the use of resources. Explain why reducing waste is important.`,
  },

  // ── CHEMISTRY PAPER 1: Higher · Set C ──
  {
    id: "chem-p1-higher-c",
    subject: "chemistry",
    paper: "1",
    tier: "Higher",
    title: "Chem Paper 1 Higher · Set C",
    description: "Higher tier. Moles, titrations, reaction profiles with catalysts, empirical formulae, and energy calculations.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) · Paper 1 Higher · Set C (Calculations & Graph Focus)

**Time: 1 hour 45 minutes | Total: 100 marks**

Question 1 [1 marks]
What is the relative atomic mass of an element?
A. The number of protons in the nucleus
B. The weighted mean mass of an atom relative to 1/12th of carbon-12
C. The total number of protons and neutrons
D. The mass of one mole of atoms in grams

Question 2 [1 marks]
Which of the following is a covalent compound?
A. NaCl
B. MgO
C. H₂O
D. KBr

Question 3 [2 marks]
Calculate the number of moles in 11.2 g of iron. (Ar: Fe = 56)

Question 4 [3 marks]
The reaction profile below shows an endothermic reaction:

**Reaction profile:**
- x-axis: Progress of reaction
- y-axis: Energy (kJ)
- Reactants at 80 kJ
- Peak at 180 kJ
- Products at 130 kJ

(a) Calculate the activation energy.
(b) Calculate the overall energy change.
(c) Is this reaction exothermic or endothermic? Justify your answer.

Question 5 [4 marks]
Draw dot-and-cross diagrams for:
(a) Sodium chloride (NaCl) · show the electron transfer and charges on ions
(b) Carbon dioxide (CO₂) · show only the outer shell electrons and shared pairs

Question 6 [4 marks]
A compound contains 40.0% calcium, 12.0% carbon, and 48.0% oxygen by mass. Calculate the empirical formula. (Ar: Ca = 40, C = 12, O = 16)

Question 7 [4 marks]
The graph shows how the rate of reaction changes with concentration:

**Graph description:**
- x-axis: Concentration of acid (mol/dm³), 0 to 2.0
- y-axis: Initial rate (cm³/s)
- Data points: (0.2, 0.5), (0.5, 1.2), (0.8, 2.0), (1.0, 2.5), (1.5, 3.7), (2.0, 5.0)
- The relationship appears directly proportional · a straight line through the origin

(a) Describe the relationship between concentration and rate.
(b) Predict the initial rate at a concentration of 1.2 mol/dm³.
(c) Explain this relationship using collision theory.

Question 8 [3 marks]
Balance the equation: Al + Fe₂O₃ → Al₂O₃ + Fe
This is a thermite reaction. Is aluminium oxidised or reduced? Explain.

Question 9 [4 marks]
A titration is carried out to find the concentration of hydrochloric acid. 25.0 cm³ of 0.20 mol/dm³ NaOH is neutralised by 22.5 cm³ of HCl.

NaOH + HCl → NaCl + H₂O

Calculate the concentration of HCl in mol/dm³.

Question 10 [5 marks]
The energy level diagram shows two reactions:

**Reaction A (exothermic):**
- Reactants: 350 kJ
- Products: 200 kJ
- Activation energy: 400 kJ (peak)

**Reaction B (same reaction with catalyst):**
- Reactants: 350 kJ
- Products: 200 kJ
- Activation energy: 320 kJ (lower peak)

(a) Calculate the overall energy change for the reaction.
(b) What is the activation energy without a catalyst?
(c) What is the activation energy with a catalyst?
(d) Explain how the catalyst increases the rate of reaction without being used up.

Question 11 [3 marks]
Explain why metals are good conductors of electricity. Include the terms "delocalised electrons" and "metallic bonding" in your answer.

Question 12 [4 marks]
The table shows titration results:

| Titration | Rough | 1 | 2 | 3 |
|-----------|-------|------|------|------|
| Final reading (cm³) | 24.80 | 23.65 | 23.70 | 23.60 |
| Initial reading (cm³) | 0.00 | 0.00 | 0.00 | 0.00 |

(a) Calculate each titre.
(b) Identify which result is anomalous.
(c) Calculate the mean titre using concordant results only.

Question 13 [6 marks]
Compare the structures and properties of diamond, graphite, and silicon dioxide. Explain, in terms of bonding and structure, why:
- Diamond is very hard
- Graphite is a good conductor of electricity
- Silicon dioxide has a very high melting point

Question 14 [4 marks]
Calculate the percentage by mass of nitrogen in ammonium nitrate, NH₄NO₃. (Ar: N = 14, H = 1, O = 16)

Question 15 [3 marks]
A student heats copper carbonate:
CuCO₃(s) → CuO(s) + CO₂(g)

Describe what you would observe. Explain why this is a thermal decomposition reaction.

Question 15b [5 marks]
Figure 9 shows the displayed formula equation for the reaction between propane and oxygen.

**Figure 9 (displayed formula equation):**
- C₃H₈ + 5O=O → 3O=C=O + 4H−O−H

The overall energy change of this exothermic reaction is −2219 kJ/mol.

Table 4 shows the bond energies of the bonds in the reaction.

| Bond | C−C | C−H | O=O | C=O | O−H |
|------|-----|-----|-----|-----|-----|
| Bond energy (kJ/mol) | 347 | X | 498 | 805 | 464 |

Calculate the bond energy of the C−H bond (X). Show all your working.

Question 15c [2 marks]
The reaction profile below shows the reaction between ammonia and oxygen:

**Reaction profile (Figure 8):**
- x-axis: Progress of reaction
- y-axis: Energy
- Reactants labelled: 4NH₃ + 3O₂ (at a higher energy level on the left)
- The curve rises to a peak (activation energy barrier), then drops
- Products labelled: 2N₂ + 6H₂O (at a lower energy level on the right)

Complete the diagram by labelling:
- the activation energy
- the overall energy change

Question 16 [4 marks]
The graph shows a neutralisation curve (pH vs volume of acid added):

**Graph description:**
- x-axis: Volume of HCl added (cm³), 0 to 40
- y-axis: pH, 0 to 14
- pH starts at 12, stays relatively flat until about 20 cm³
- Sharp drop from pH 11 to pH 2 between 20 and 24 cm³
- Levels off at pH 1 after 24 cm³

(a) What is the starting pH? Is this an acid or alkali?
(b) At what volume of acid does the endpoint occur?
(c) What indicator would be suitable for this titration? Explain.

Question 17 [4 marks]
Calculate the atom economy for producing iron from iron oxide:
2Fe₂O₃ + 3C → 4Fe + 3CO₂
(Ar: Fe = 56, O = 16, C = 12)

Question 18 [3 marks]
Explain what is meant by a half equation. Write the half equation for the reduction of copper ions at the cathode during electrolysis of copper sulfate solution.

Question 19 [4 marks]
50 cm³ of 1.0 mol/dm³ HCl is mixed with 50 cm³ of 1.0 mol/dm³ NaOH. The temperature rises by 6.8°C. Calculate the energy released. (c = 4.18 J/g/°C, density = 1.0 g/cm³). Give your answer in kJ.

Question 20 [3 marks]
Explain the trend in reactivity of Group 1 metals as you go down the group. Reference atomic structure in your answer.`,
  },

  // ── CHEMISTRY PAPER 2: Higher · Set C ──
  {
    id: "chem-p2-higher-c",
    subject: "chemistry",
    paper: "2",
    tier: "Higher",
    title: "Chem Paper 2 Higher · Set C",
    description: "Higher tier. Organic chemistry, equilibrium, atmospheric data, rate calculations, and resource management.",
    totalMarks: 100,
    content: `# AQA GCSE Chemistry (8462) · Paper 2 Higher · Set C (Organic & Environmental Focus)

**Time: 1 hour 45 minutes | Total: 100 marks**

Question 1 [1 marks]
Which of the following is the correct formula for ethanol?
A. CH₃OH
B. C₂H₅OH
C. C₃H₇OH
D. C₂H₄

Question 2 [1 marks]
The Haber process produces which substance?
A. Sulfuric acid
B. Ammonia
C. Nitric acid
D. Ethanol

Question 3 [1 marks]
Which is a greenhouse gas?
A. Nitrogen
B. Oxygen
C. Methane
D. Argon

Question 4 [3 marks]
Draw the displayed formulae of:
(a) Ethane (C₂H₆)
(b) Ethene (C₂H₄)
State one key difference in their bonding.

Question 5 [4 marks]
The graph shows how the yield of ammonia in the Haber process varies with temperature at two pressures:

**Graph description:**
- x-axis: Temperature (°C), from 200 to 600
- y-axis: Yield of NH₃ (%)
- At 100 atm: (200, 50%), (300, 35%), (400, 20%), (500, 10%), (600, 5%)
- At 300 atm: (200, 70%), (300, 55%), (400, 38%), (500, 22%), (600, 12%)

(a) Describe the effect of increasing temperature on the yield of ammonia.
(b) Describe the effect of increasing pressure on the yield of ammonia.
(c) The industrial conditions are 450°C and 200 atm with an iron catalyst. Explain why a lower temperature is not used, even though it gives a higher yield.

Question 6 [3 marks]
Write balanced symbol equations with state symbols for:
(a) Complete combustion of ethanol
(b) Addition of bromine to ethene

Question 7 [4 marks]
The rate of reaction between magnesium and hydrochloric acid is measured. The graph shows volume of hydrogen produced over time:

**Graph description:**
- x-axis: Time (s), 0 to 80
- y-axis: Volume H₂ (cm³), 0 to 60
- Data points: (0, 0), (10, 25), (20, 40), (30, 50), (40, 55), (50, 58), (60, 59), (70, 60), (80, 60)

(a) Using the tangent method at t = 10 seconds, calculate the rate of reaction. The tangent at t = 10 passes through approximately (0, 10) and (20, 42).
(b) Explain why the rate decreases as the reaction proceeds.

Question 8 [3 marks]
What is dynamic equilibrium? State three conditions required for dynamic equilibrium.

Question 9 [4 marks]
The concentration-time graph for a reversible reaction reaching equilibrium:

**Graph description:**
- x-axis: Time (minutes), 0 to 30
- y-axis: Concentration (mol/dm³)
- Reactant A: starts at 1.0, decreases to 0.4 by t = 15 min, then stays constant
- Product B: starts at 0, increases to 0.6 by t = 15 min, then stays constant

(a) At what time is equilibrium reached?
(b) What is the concentration of A at equilibrium?
(c) If the temperature is increased (forward reaction is exothermic), predict and explain what would happen to the concentrations.

Question 10 [4 marks]
The table shows atmospheric data over time:

| Year | CO₂ concentration (ppm) | Global temp anomaly (°C) |
|------|------------------------|--------------------------|
| 1960 | 317 | -0.01 |
| 1980 | 339 | +0.26 |
| 2000 | 370 | +0.39 |
| 2020 | 414 | +1.29 |

(a) Calculate the percentage increase in CO₂ from 1960 to 2020.
(b) Describe the correlation between CO₂ and temperature.
(c) Explain why correlation does not prove causation. What other evidence supports the link?

Question 11 [3 marks]
Describe the test for the presence of:
(a) Chloride ions
(b) Sulfate ions
State the reagent and observation for each.

Question 12 [6 marks]
A company needs to decide between two methods of producing ethanol:
- Method 1: Fermentation of sugar using yeast (batch process, 37°C, produces impure ethanol)
- Method 2: Hydration of ethene using a phosphoric acid catalyst (continuous process, 300°C and 60 atm, produces pure ethanol)

Evaluate these two methods. Consider: rate of production, atom economy, energy costs, sustainability, and purity.

Question 13 [4 marks]
A chromatogram shows the separation of three amino acids from a protein:

**Chromatogram description:**
- Solvent front: 12.0 cm
- Amino acid X: spot at 3.6 cm
- Amino acid Y: spot at 7.2 cm
- Amino acid Z: spot at 9.6 cm

(a) Calculate the Rf value for each amino acid.
(b) An unknown amino acid has an Rf of 0.80. Which amino acid is it most likely to be?

Question 14 [3 marks]
Explain how a catalytic converter in a car exhaust works. Write balanced equations for the reactions that occur.

Question 15 [4 marks]
The graph shows the mass of a reaction vessel over time as a gas is produced:

**Graph description:**
- x-axis: Time (s), 0 to 100
- y-axis: Mass (g), starting at 150.0
- Experiment A (large marble chips): (0, 150.0), (20, 149.5), (40, 149.1), (60, 148.8), (80, 148.6), (100, 148.5)
- Experiment B (powdered marble): (0, 150.0), (20, 148.8), (40, 148.5), (60, 148.5), (80, 148.5), (100, 148.5)

(a) Explain why the mass decreases.
(b) Both experiments lose the same total mass. Explain why.
(c) Explain why Experiment B reaches the final mass sooner, using collision theory.

Question 16 [3 marks]
What is a carbon footprint? State two ways a school could reduce its carbon footprint.

Question 17 [4 marks]
A student heats 6.25 g of hydrated copper sulfate (CuSO₄·xH₂O). The anhydrous mass is 4.00 g.
Calculate the value of x. (Mr: CuSO₄ = 160, H₂O = 18)

Question 18 [3 marks]
Explain why crude oil is a finite resource. Describe one alternative fuel and state an advantage and disadvantage.

Question 19 [4 marks]
Water from different sources requires different treatment:

| Source | Treatment needed |
|--------|-----------------|
| Fresh water (reservoir) | Filtration, sedimentation, chlorination |
| Waste water | Screening, sedimentation, biological treatment, chemical treatment |
| Sea water | Desalination (distillation or reverse osmosis) |

Explain why waste water requires more stages of treatment than fresh water.

Question 20 [3 marks]
Describe how metals can be extracted using phytomining or bioleaching. State one advantage of these methods over traditional mining.`,
  },

  // ── ECONOMICS PAPER 3: Set B ──
  {
    id: "econ-p3-b",
    subject: "economics",
    paper: "3",
    title: "Paper 3 · Set B",
    description: "Synoptic. MCQ + Case study on UK labour market with diagram-based analysis.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/3) · Paper 3: Economic Principles and Issues · Predicted Paper Set B

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in Section A and ALL questions in Section B.

---

## Section A: Multiple Choice (30 marks)

Question 1 [1 marks]
A merit good is one for which:
A. Social benefits exceed private benefits
B. Social costs exceed private costs
C. It is provided free at the point of use
D. There are no external benefits

Question 2 [1 marks]
If the price elasticity of demand for a product is -0.4, demand is:
A. Price elastic
B. Price inelastic
C. Unitary elastic
D. Perfectly elastic

Question 3 [1 marks]
A depreciation of the exchange rate will tend to:
A. Reduce export competitiveness
B. Increase the price of imports
C. Reduce the rate of inflation
D. Strengthen the current account deficit

Question 4 [1 marks]
The multiplier effect means that:
A. Investment always increases GDP
B. An initial change in spending leads to a larger change in national income
C. Tax revenue multiplies government spending
D. Interest-rate changes have no effect on GDP

Question 5 [1 marks]
Which best describes allocative efficiency?
A. Producing at the lowest average cost
B. Producing where P = MC
C. Maximising total revenue
D. Producing on the PPF

Question 6 [1 marks]
Quantitative easing involves:
A. Raising interest rates to reduce money supply
B. Cutting government spending
C. A central bank buying assets to expand the money supply
D. Increasing the bank reserve ratio

Question 7 [1 marks]
A natural monopoly occurs when:
A. There are no barriers to entry
B. Long-run average cost falls continuously as output rises
C. The firm is state-owned
D. There are many small firms in the market

Question 8 [1 marks]
The Laffer curve shows the relationship between:
A. Tax rates and tax revenue
B. Unemployment and inflation
C. Interest rates and investment
D. Government spending and GDP

Question 9 [1 marks]
If the marginal propensity to consume is 0.75, the multiplier is:
A. 0.75
B. 3
C. 4
D. 1.33

Question 10 [1 marks]
Supply-side policies aim primarily to:
A. Increase aggregate demand
B. Shift the LRAS curve to the right
C. Reduce the money supply
D. Increase government borrowing

Question 11 [1 marks]
A perfectly contestable market requires:
A. Many small firms
B. Zero barriers to entry and exit
C. Homogeneous products
D. Perfect information

Question 12 [1 marks]
Which is most likely to reduce the natural rate of unemployment?
A. A rise in unemployment benefits
B. Improved geographical labour mobility
C. A rise in interest rates
D. A cut in income tax for high earners

Question 13 [1 marks]
A progressive tax system is one in which:
A. The marginal tax rate is constant
B. The average tax rate falls as income rises
C. The average tax rate rises as income rises
D. Everyone pays the same lump sum

Question 14 [1 marks]
The long-run Phillips curve is generally drawn as:
A. Downward sloping
B. Upward sloping
C. Horizontal
D. Vertical at the natural rate of unemployment

Question 15 [1 marks]
A monopsonist in the labour market is:
A. A single seller of labour
B. A single buyer of labour
C. A trade union
D. A firm in perfect competition

Question 16 [1 marks]
A government imposes a tax on a good with perfectly inelastic demand. The tax is:
A. Borne entirely by producers
B. Borne entirely by consumers
C. Shared equally
D. Avoided through reformulation

Question 17 [1 marks]
Frictional unemployment refers to workers who are:
A. Permanently outside the labour force
B. Between jobs while searching
C. Unemployed because of a fall in AD
D. Out of work owing to skill mismatch

Question 18 [1 marks]
The Lorenz curve is used to measure:
A. The rate of inflation
B. The level of unemployment
C. The distribution of income or wealth
D. Real GDP per capita

Question 19 [1 marks]
Which is most likely to cause cost-push inflation?
A. A rise in raw-material prices
B. A cut in interest rates during a boom
C. An increase in consumer confidence
D. A fall in income tax

Question 20 [1 marks]
A profit-maximising monopolist produces where:
A. AR = AC
B. MR = MC
C. P = MC
D. AR = MC

Question 21 [1 marks]
The Gini coefficient ranges between:
A. 0 and 1, where 0 indicates perfect equality
B. 0 and 1, where 1 indicates perfect equality
C. -1 and 1
D. 0 and 100, where 0 indicates perfect inequality

Question 22 [1 marks]
A floating exchange rate is most likely to depreciate when:
A. Domestic interest rates rise
B. Domestic exports become more competitive
C. Domestic inflation rises faster than abroad
D. The current account moves into surplus

Question 23 [1 marks]
A firm experiences economies of scale when:
A. Long-run average cost falls as output rises
B. Marginal cost equals average cost
C. Total cost falls as output rises
D. Average revenue rises as output rises

Question 24 [1 marks]
Which would shift the SRAS curve to the left?
A. A fall in oil prices
B. An increase in productivity
C. A rise in indirect taxes
D. A decrease in wage costs

Question 25 [1 marks]
In oligopoly, the kinked-demand curve assumes that rivals will:
A. Match price rises but ignore price cuts
B. Match price cuts but ignore price rises
C. Match all price changes
D. Ignore all price changes

Question 26 [1 marks]
Cross elasticity of demand between two goods is positive. The goods are:
A. Complements
B. Substitutes
C. Normal goods
D. Inferior goods

Question 27 [1 marks]
The principle of comparative advantage states that countries should specialise in goods in which they have the:
A. Lowest absolute cost
B. Highest absolute cost
C. Lowest opportunity cost
D. Largest market

Question 28 [1 marks]
A government runs a budget deficit when:
A. Tax revenue exceeds public spending
B. Public spending exceeds tax revenue
C. The national debt falls
D. Net exports are negative

Question 29 [1 marks]
A merit good is best defined as a good that is:
A. Provided by the public sector
B. Under-consumed relative to the social optimum
C. Non-rival and non-excludable
D. Always provided free of charge

Question 30 [1 marks]
A firm in long-run monopolistic competition earns:
A. Supernormal profit
B. Normal profit only
C. A loss equal to fixed cost
D. Profit equal to marginal cost

---

## Section B: Case Study (50 marks)

**Case Study · The UK labour market**

Net migration from the EU fell from +250,000 per year before Brexit to +50,000 by 2023, contributing to vacancies in hospitality, agriculture and social care. Non-EU net migration rose to 600,000 in 2023 under an expanded Skilled Worker visa. The National Living Wage rose 20% to £11.44 by April 2024. Labour-force participation among 50–64 year-olds fell from 73% to 68% between 2019 and 2023, partly because of long-term sickness. The Treasury estimates this added inactivity costs the economy around £16bn per year in lost output.

| Indicator                              | 2019 | 2021 | 2023 | 2024 |
|----------------------------------------|------|------|------|------|
| Unemployment rate (%)                  | 3.8  | 4.5  | 4.2  | 4.3  |
| Average weekly earnings growth (%)     | 3.5  | 4.8  | 7.2  | 5.8  |
| CPI inflation (%)                      | 1.7  | 2.6  | 7.3  | 3.2  |
| Real wage growth (%)                   | 1.8  | 2.2  | -0.1 | 2.6  |
| National Living Wage (£/hour)          | 8.21 | 8.91 | 10.42| 11.44|
| Economic inactivity, 16–64 (%)         | 20.2 | 21.5 | 21.3 | 21.8 |

Question 31 [10 marks]
Using a labour-market supply and demand diagram, explain how a National Living Wage set above equilibrium creates unemployment in a competitive market. Use the data in the table.

Question 32 [15 marks]
Using the case study and your knowledge of economics, analyse the impact of higher net migration on the UK labour market, considering wages, employment and productivity.

Question 33 [25 marks]
"A higher National Living Wage does more harm than good for the UK economy." Evaluate this statement using the case study and your own economic knowledge.`,
  },

  // (Removed Set D entries · AQA Economics library is locked to Sets A/B/C per paper.)

  // ── ECONOMICS PAPER 3: Set C ──
  {
    id: "econ-p3-c",
    subject: "economics",
    paper: "3",
    title: "Paper 3 · Set C",
    description: "Synoptic. MCQ + Case study on inequality, housing, and progressive taxation.",
    totalMarks: 80,
    content: `# AQA A-Level Economics (7136/3) · Paper 3: Economic Principles and Issues · Predicted Paper Set C

**Time: 2 hours | Total: 80 marks**

Answer ALL questions in Section A and ALL questions in Section B.

---

## Section A: Multiple Choice (30 marks)

Question 1 [1 marks]
A Lorenz curve further from the line of equality indicates:
A. Greater income equality
B. Greater income inequality
C. Higher GDP per capita
D. A progressive tax system

Question 2 [1 marks]
A progressive tax is one in which:
A. Everyone pays the same %
B. The tax rate rises with income
C. The tax rate falls with income
D. A fixed amount is charged

Question 3 [1 marks]
Which is NOT a characteristic of a public good?
A. Non-rival
B. Non-excludable
C. Free-rider problem
D. Positive externalities

Question 4 [1 marks]
If government spending rises by £5bn and the multiplier is 2.5, national income rises by:
A. £2bn
B. £5bn
C. £7.5bn
D. £12.5bn

Question 5 [1 marks]
The J-curve effect implies that following depreciation:
A. The current account improves immediately
B. The current account worsens before improving
C. Inflation falls then rises
D. GDP growth accelerates immediately

Question 6 [1 marks]
Monopsony in the labour market is most likely to result in:
A. Wages above the MRP
B. Wages below the competitive level
C. Higher employment
D. Perfect competition in goods markets

Question 7 [1 marks]
The natural rate of unemployment is the rate at which:
A. There is no unemployment
B. Inflation is zero
C. The labour market is in equilibrium
D. GDP is at maximum

Question 8 [1 marks]
The impact of a per-unit tax on a good is shown by:
A. A rightward shift of demand
B. A leftward (upward) shift of supply
C. A rightward shift of supply
D. A leftward shift of demand

Question 9 [1 marks]
Contestable markets are characterised by:
A. High barriers to entry
B. Free entry/exit with low sunk costs
C. A single dominant firm
D. Price discrimination

Question 10 [1 marks]
An increase in the marginal propensity to save would:
A. Increase the multiplier
B. Decrease the multiplier
C. Have no effect
D. Increase aggregate demand

Question 11 [1 marks]
Which is most likely to reduce structural unemployment?
A. A cut in interest rates
B. Retraining schemes
C. A rise in benefits
D. A rise in income tax

Question 12 [1 marks]
A firm operating in a perfectly competitive market in long-run equilibrium earns:
A. Supernormal profit
B. Normal profit
C. A loss
D. Negative MR

Question 13 [1 marks]
The marginal social cost equals the marginal social benefit when:
A. Output is maximised
B. Allocative efficiency is achieved
C. Profit is maximised
D. Total revenue is maximised

Question 14 [1 marks]
A merit good is most likely to be:
A. Over-consumed
B. Under-consumed
C. Not consumed at all
D. Consumed only by the rich

Question 15 [1 marks]
The accelerator effect refers to:
A. A change in investment caused by a change in the rate of growth of output
B. A change in consumption from a change in income
C. A change in interest rates from a change in inflation
D. A change in net exports from a change in the exchange rate

Question 16 [1 marks]
Which would shift the LRAS curve to the right?
A. A fall in productivity
B. An increase in net immigration of skilled workers
C. A rise in trade-union power
D. A rise in indirect taxation

Question 17 [1 marks]
A regressive tax is one in which:
A. The marginal tax rate is zero
B. The average tax rate falls as income rises
C. The average tax rate rises as income rises
D. Only the rich pay tax

Question 18 [1 marks]
The free-rider problem applies most clearly to:
A. Private goods
B. Public goods
C. Merit goods
D. Demerit goods

Question 19 [1 marks]
A firm with monopsony power will set the wage:
A. Above marginal cost of labour
B. Below marginal revenue product
C. Equal to marginal revenue product
D. Above marginal revenue product

Question 20 [1 marks]
Cyclical unemployment is most directly caused by:
A. Skill mismatches
B. A fall in aggregate demand
C. Seasonal demand changes
D. Frictions in job search

Question 21 [1 marks]
A government policy of cutting interest rates is an example of:
A. Expansionary fiscal policy
B. Contractionary fiscal policy
C. Expansionary monetary policy
D. Contractionary monetary policy

Question 22 [1 marks]
The substitution effect of a wage rise on labour supply is:
A. Always negative
B. Always positive
C. Always zero
D. Indeterminate

Question 23 [1 marks]
A negative externality of consumption means:
A. Private benefit exceeds social benefit
B. Social benefit exceeds private benefit
C. Private cost exceeds social cost
D. No externality exists

Question 24 [1 marks]
A nation's terms of trade improve when:
A. Export prices rise relative to import prices
B. Import prices rise relative to export prices
C. The current account improves
D. The exchange rate depreciates

Question 25 [1 marks]
Government failure occurs when intervention:
A. Always corrects market failure
B. Creates a worse outcome than the market
C. Has no effect
D. Eliminates externalities

Question 26 [1 marks]
A subsidy on a good with positive externalities should:
A. Reduce output to social optimum
B. Increase output to social optimum
C. Have no effect
D. Reduce price below MC

Question 27 [1 marks]
The opportunity cost of a decision is best defined as:
A. The accounting cost
B. The benefit forgone from the next best alternative
C. The total cost incurred
D. The marginal cost of production

Question 28 [1 marks]
A producer in perfect competition is:
A. A price maker
B. A price taker
C. Earning supernormal profit in the long run
D. Restricted in entry

Question 29 [1 marks]
The price elasticity of supply is likely to be higher when:
A. There is spare capacity
B. Production is highly specialised
C. The time period is short
D. Inputs are scarce

Question 30 [1 marks]
A current account deficit can be financed by:
A. Net inflows on the financial account
B. A fall in exports
C. A rise in imports
D. A fall in interest rates

---

## Section B: Case Study (50 marks)

**Case Study · Income inequality and the UK tax system**

The UK Gini coefficient rose from 0.25 in 1979 to 0.36 in 2024. The top decile of earners take 28% of post-tax income; the bottom decile take 3%. Wealth inequality is sharper: the top 10% hold 43% of total wealth. Direct income tax bands are progressive, but indirect taxes (VAT, fuel and alcohol duty) are regressive, taking 27% of disposable income from the bottom quintile against 14% from the top. Universal Credit's 55p taper is criticised for creating a poverty trap.

| Income group | Avg gross income (£) | Direct tax (% income) | Indirect tax (% income) | Benefits received (£) | Net income (£) |
|--------------|----------------------|-----------------------|-------------------------|-----------------------|----------------|
| Bottom 20%   | 12,400               | 10                    | 27                      | 8,900                 | 16,700         |
| Middle 20%   | 32,800               | 18                    | 18                      | 3,200                 | 28,800         |
| Top 20%      | 82,300               | 25                    | 14                      | 400                   | 50,300         |

Question 31 [10 marks]
Using a Lorenz curve diagram, show how a rise in the Gini coefficient from 0.25 to 0.36 would be represented. Label both curves and the line of equality.

Question 32 [15 marks]
Using the case study and your knowledge of economics, analyse whether the UK tax system is genuinely progressive when both direct and indirect taxes are considered.

Question 33 [25 marks]
"Reducing income inequality should be the primary objective of UK government economic policy." Evaluate this statement using the case study and your own knowledge.`,
  },
];

// Merge additional predicted papers from dedicated files
import { chemistryPredictedPapers } from "./chemistryPredictedPapers";
import { economicsPredictedPapersExtra } from "./economicsPredictedPapersExtra";
import { mathsPredictedPapersExtra } from "./mathsPredictedPapersExtra";
import { chemistryPredictedPapersExtra } from "./chemistryPredictedPapersExtra";
import { edexcelAPredictedPapers } from "./edexcelAPredictedPapers";
import { edexcelBPredictedPapers } from "./edexcelBPredictedPapers";
import { cambridgePredictedPapers } from "./cambridgePredictedPapers";
import { ocrPredictedPapers } from "./ocrPredictedPapers";
import { gcsePredictedPapers } from "./gcsePredictedPapers";
import { igcsePredictedPapers } from "./igcsePredictedPapers";
import { multiBoardPredictedPapers } from "./multiBoardPredictedPapers";
import { aqaAsPredictedPapers } from "./aqaAsPredictedPapers";
import { edexcelAAsPredictedPapers } from "./edexcelAAsPredictedPapers";
import { edexcelBAsPredictedPapers } from "./edexcelBAsPredictedPapers";
import { ocrAsPredictedPapers } from "./ocrAsPredictedPapers";
// economicsPredictedPapersExtra intentionally not spread · AQA A-Level Economics
// predicted-paper library is locked to 9 papers (Paper 1/2/3 × Sets A/B/C).
// AQA AS Paper 1 is a separate product line (paper id "as-1") and IS appended.
predictedPapersLibrary.push(...chemistryPredictedPapers, ...mathsPredictedPapersExtra, ...chemistryPredictedPapersExtra, ...edexcelAPredictedPapers, ...edexcelBPredictedPapers, ...cambridgePredictedPapers, ...ocrPredictedPapers, ...gcsePredictedPapers, ...igcsePredictedPapers, ...multiBoardPredictedPapers, ...aqaAsPredictedPapers, ...edexcelAAsPredictedPapers, ...edexcelBAsPredictedPapers, ...ocrAsPredictedPapers);
