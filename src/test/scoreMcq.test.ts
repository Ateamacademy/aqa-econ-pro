import { describe, it, expect } from "vitest";
import { scoreMcq, checkMcqDefects } from "@/marking/scoreMcq";
import {
  buildMcqFeedbackPrompt,
  validateMcqExplanation,
  fallbackMcqExplanation,
} from "@/marking/mcqFeedbackTemplate";

const opts = (...texts: string[]) =>
  texts.map((t, i) => ({ letter: ["A", "B", "C", "D"][i], text: t }));

describe("scoreMcq — Bug #1 (wrong answer marked correct)", () => {
  it("scoreMcq_P3-Q8_picking_A_returns_zero_marks", () => {
    // Multiplier — correct is B (5). Picking A (4) must score 0.
    expect(scoreMcq("A", "B")).toMatchObject({ correct: false, mark: 0 });
  });
  it("scoreMcq_P3-Q9_picking_A_returns_zero_marks_for_monopsony", () => {
    expect(scoreMcq("A", "B")).toMatchObject({ correct: false, mark: 0 });
  });
  it("scoreMcq_P3-Q15_picking_B_for_depreciation_returns_zero", () => {
    expect(scoreMcq("B", "C")).toMatchObject({ correct: false, mark: 0 });
  });
  it("scoreMcq_P3-Q21_picking_B_for_long_run_phillips_returns_zero", () => {
    expect(scoreMcq("B", "D")).toMatchObject({ correct: false, mark: 0 });
  });
});

describe("scoreMcq — Bug #2 (correct answer marked incorrect)", () => {
  it("scoreMcq_P3-Q20_picking_C_for_progressive_tax_returns_one", () => {
    expect(scoreMcq("C", "C")).toMatchObject({ correct: true, mark: 1 });
  });
  it("scoreMcq_P3-Q14_picking_C_for_lorenz_returns_one", () => {
    expect(scoreMcq("C", "C")).toMatchObject({ correct: true, mark: 1 });
  });
});

describe("scoreMcq — canonicalisation", () => {
  it("trims whitespace and uppercases", () => {
    expect(scoreMcq("  b  ", "B")).toMatchObject({ correct: true, mark: 1 });
    expect(scoreMcq("b", "B")).toMatchObject({ correct: true, mark: 1 });
  });
  it("empty submission is never correct, even against empty key", () => {
    expect(scoreMcq("", "")).toMatchObject({ correct: false, mark: 0 });
    expect(scoreMcq(null, "B")).toMatchObject({ correct: false, mark: 0 });
    expect(scoreMcq("B", null)).toMatchObject({ correct: false, mark: 0 });
  });
});

describe("checkMcqDefects — render-time guards (Bug #4)", () => {
  it("flags missing stem", () => {
    expect(
      checkMcqDefects({
        questionId: "P3-Q1",
        stem: "",
        options: opts("a", "b", "c", "d"),
      }),
    ).toBe("missing_stem");
  });
  it("flags too few options", () => {
    expect(
      checkMcqDefects({
        questionId: "P3-Q1",
        stem: "x",
        options: opts("a"),
      }),
    ).toBe("too_few_options");
  });
  it("flags duplicate option ids", () => {
    expect(
      checkMcqDefects({
        questionId: "P3-Q1",
        stem: "x",
        options: [
          { letter: "A", text: "x" },
          { letter: "A", text: "y" },
        ],
      }),
    ).toBe("duplicate_option_ids");
  });
  it("flags case-study mismatch (P3-Q30 class)", () => {
    expect(
      checkMcqDefects({
        questionId: "P3-Q30",
        stem: "x",
        options: opts("a", "b", "c", "d"),
        caseStudyRef: "uk-housing",
        caseStudyLinkedIds: ["P2-Q5", "P2-Q6"],
      }),
    ).toBe("case_study_mismatch");
  });
  it("passes a clean MCQ", () => {
    expect(
      checkMcqDefects({
        questionId: "P3-Q1",
        stem: "x",
        options: opts("a", "b", "c", "d"),
      }),
    ).toBeNull();
  });
});

describe("buildMcqFeedbackPrompt — branch correctness (Bug #3)", () => {
  const input = {
    questionId: "P3-Q14",
    questionStem: "The Lorenz curve is used to measure:",
    options: opts(
      "The rate of inflation",
      "The level of unemployment",
      "The distribution of income or wealth",
      "Real GDP per capita",
    ),
    submittedOptionId: "C",
    markSchemeAnswerId: "C",
  };

  it("correct branch banner names only the correct letter", () => {
    const result = scoreMcq("C", "C");
    const tpl = buildMcqFeedbackPrompt(input, result);
    expect(tpl.markSchemeBanner).toContain("Correct");
    expect(tpl.markSchemeBanner).toContain("C");
    expect(tpl.systemPrompt).toContain("CORRECT");
  });

  it("incorrect branch (P3-Q15 reproducer): names BOTH wrong B and right C", () => {
    const wrongInput = {
      ...input,
      questionStem:
        "A floating exchange rate is most likely to depreciate when:",
      submittedOptionId: "B",
      markSchemeAnswerId: "C",
    };
    const result = scoreMcq("B", "C");
    const tpl = buildMcqFeedbackPrompt(wrongInput, result);
    expect(tpl.markSchemeBanner).toContain("Incorrect");
    expect(tpl.markSchemeBanner).toContain("B");
    expect(tpl.markSchemeBanner).toContain("C");
    expect(tpl.systemPrompt).toContain("INCORRECT");
  });
});

describe("validateMcqExplanation — anti-hallucination guard", () => {
  const correct = scoreMcq("C", "C");
  const wrong = scoreMcq("B", "C");

  it("flags a correct-branch explanation that quotes another option letter (P3-Q14 bug)", () => {
    const bad =
      "You correctly identified that choice B refers to the measurement of inequality.";
    expect(validateMcqExplanation(bad, correct)).toContain("feedback_letter_mismatch");
  });
  it("passes a correct-branch explanation that names only C", () => {
    const good = "Option C is correct: the Lorenz curve plots cumulative income share.";
    expect(validateMcqExplanation(good, correct)).toBeNull();
  });
  it("flags an incorrect-branch explanation missing the correct letter", () => {
    const bad = "Your reasoning about competitiveness is fine.";
    expect(validateMcqExplanation(bad, wrong)).toContain("feedback_missing_correct_letter");
  });
  it("passes an incorrect-branch explanation that names both letters", () => {
    const good =
      "Option B is incorrect because more competitive exports do not cause depreciation. Option C is correct: higher relative inflation reduces export competitiveness.";
    expect(validateMcqExplanation(good, wrong)).toBeNull();
  });
});

describe("fallbackMcqExplanation", () => {
  const input = {
    questionId: "P3-Q15",
    questionStem: "x",
    options: opts(
      "Interest rates rise",
      "Exports more competitive",
      "Inflation rises faster",
      "Current account surplus",
    ),
    submittedOptionId: "B",
    markSchemeAnswerId: "C",
  };
  it("incorrect branch names both letters and option text", () => {
    const out = fallbackMcqExplanation(input, scoreMcq("B", "C"));
    expect(out).toContain("B");
    expect(out).toContain("C");
    expect(out.toLowerCase()).toContain("incorrect");
  });
  it("correct branch names only the correct letter", () => {
    const out = fallbackMcqExplanation(
      { ...input, submittedOptionId: "C" },
      scoreMcq("C", "C"),
    );
    expect(out).toContain("C");
    expect(out.toLowerCase()).toContain("correct");
  });
});
