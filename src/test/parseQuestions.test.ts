import { describe, it, expect } from "vitest";
import { parseQuestions } from "@/components/predicted-papers/parseQuestions";

const ocrSample = `# OCR A-Level Economics (H460/01) — Component 01: Microeconomics — Set A

**Time: 2 hours | Total: 80 marks**

## Section A: Data Response

Read the extract below and answer all questions.

**Extract: The UK Housing Market**

UK house prices rose by an average of 7.8% in 2024.

Question 1 [2 marks]
Define the term "market equilibrium".

Question 2 [4 marks]
Using the extract, explain two factors that have contributed to rising UK house prices.

Question 3 [8 marks]
With the aid of a supply and demand diagram, analyse the impact of an increase in the supply of new housing.

## Section B: Extended Response

Question 5 [8 marks]
With the aid of a diagram, explain how negative externalities of production lead to market failure.

Question 6 [16 marks]
Evaluate the view that monopolies are always against the public interest.

## Section C: Essay

Answer ONE of the following:

Question 7 [25 marks]
"Labour markets work most efficiently when there is no government intervention." Evaluate this statement.

Question 8 [25 marks]
Evaluate the view that the theory of contestable markets is more useful.`;

describe("parseQuestions", () => {
  it("should parse OCR library paper questions", () => {
    const { context, questions } = parseQuestions(ocrSample);
    console.log("Context:", context.slice(0, 100));
    console.log("Questions:", questions.map(q => `${q.label} [${q.marks}m]`));
    
    expect(questions.length).toBeGreaterThan(1);
    expect(questions[0].label).toBe("Question 1");
    expect(questions[0].marks).toBe(2);
  });

  it("should parse CAIE MCQ paper format", () => {
    const caie = `# Cambridge IGCSE Economics — Paper 1

Question 1 [1 marks]
What is the basic economic problem?
- A Governments cannot collect enough tax
- B Resources are limited but wants are unlimited
- C Some countries are richer
- D Prices keep rising

Question 2 [1 marks]
Which is an example of enterprise?
- A A factory
- B A worker
- C A business owner taking risks
- D Raw materials`;

    const { questions } = parseQuestions(caie);
    expect(questions.length).toBe(2);
    expect(questions[0].mcqOptions).toBeDefined();
    expect(questions[0].mcqOptions!.length).toBe(4);
  });

  it("should parse Edexcel A supported MCQ format", () => {
    const edexA = `## Section A: Supported Multiple Choice

Question 01a [1 marks]
Which of the following best describes allocative efficiency?
- A MC = AC
- B MC = MR
- C P = MC
- D P = AC

Question 01b [3 marks]
Explain your answer.

Question 02a [1 marks]
A firm operates where MR > MC. The firm should:
- A Increase output
- B Decrease output
- C Maintain output
- D Shut down`;

    const { questions } = parseQuestions(edexA);
    expect(questions.length).toBe(3);
    expect(questions[0].label).toContain("01a");
  });

  it("should parse GCSE format", () => {
    const gcse = `Question 1 [1 marks]
Define the term "opportunity cost".

Question 2 [1 marks]
Which of the following is a factor of production?
- A A factory worker
- B A delivery van
- C Crude oil
- D Farmland

Question 3 [2 marks]
Explain one reason why scarcity is a problem.`;

    const { questions } = parseQuestions(gcse);
    expect(questions.length).toBe(3);
  });

  it("should parse questions with markdown headers (### Question)", () => {
    const withHeaders = `# OCR Paper

### Question 1 [2 marks]
Define market equilibrium.

### Question 2 [4 marks]
Explain two factors.

## Section B

### Question 3 [8 marks]
Analyse the impact.`;

    const { questions } = parseQuestions(withHeaders);
    console.log("Header questions:", questions.map(q => `${q.label} [${q.marks}m]`));
    expect(questions.length).toBe(3);
    expect(questions[0].label).toBe("Question 1");
  });

  it("should parse OCR inline format when question text comes before marks", () => {
    const ocrInline = `Question 1 Define the term market equilibrium. [2 marks]
Question 2 Using the extract, explain two causes of house price rises. [4 marks]
Question 3 With the aid of a supply and demand diagram, analyse the impact of increased supply. [8 marks]`;

    const { questions } = parseQuestions(ocrInline);
    expect(questions.length).toBe(3);
    expect(questions[0].text).toContain("Define the term market equilibrium");
    expect(questions[1].text).toContain("Using the extract");
  });

  it("should parse bold questions with marks as bare numbers [N] (no 'marks' word)", () => {
    const boldNoMarks = `**Question 1** Calculate the percentage change in the Number of Energy Suppliers in the UK between January 2020 and January 2023. [2]
**Question 2** Explain two reasons why the demand for energy is often considered to be price inelastic. [4]
**Question 3** Explain, using a diagram, how a maximum price can lead to a shortage in the market. [8]
**Question 4** Evaluate the extent to which the energy price cap is an effective policy for correcting market failures in the UK energy market. [16]`;

    const { questions } = parseQuestions(boldNoMarks);
    console.log("Bold no-marks:", questions.map(q => `${q.label} [${q.marks}m] "${q.text.slice(0,40)}..."`));
    expect(questions.length).toBe(4);
    expect(questions[0].marks).toBe(2);
    expect(questions[0].text).toContain("Calculate the percentage change");
    expect(questions[2].marks).toBe(8);
    expect(questions[3].marks).toBe(16);
  });

  it("should parse sub-part questions like Question 5 (a) ... [10]", () => {
    const subParts = `**Question 5** (a) Explain how the concept of derived demand applies to the labour market. [10] (b) Evaluate the view that an increase in the national minimum wage will always lead to a significant rise in unemployment. [15]
**Question 6** (a) Explain how firms in an oligopolistic market might use non-price competition. [10] (b) Evaluate whether oligopolistic firms are likely to act in the best interests of consumers. [15]`;

    const { questions } = parseQuestions(subParts);
    console.log("Sub-parts:", questions.map(q => `${q.label} [${q.marks}m]`));
    expect(questions.length).toBeGreaterThanOrEqual(2);
  });
});
