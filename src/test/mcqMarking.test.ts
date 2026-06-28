/**
 * Regression tests for instant MCQ marking (src/components/predicted-papers/mcqMarking.ts).
 *
 * Guards the fix for the incident where submitting an MCQ predicted paper left every
 * question on "pending marking" forever: the answer key must parse from the official
 * mark-scheme markdown, and feedback must award 1/1 or 0/1 correctly.
 */
import { describe, it, expect } from "vitest";
import { parseMcqAnswerKey, buildMcqFeedback, questionNumberKey } from "@/components/predicted-papers/mcqMarking";

// Mirrors the official CAIE 9708 Paper 1 mark-scheme table layout.
const PLAINTEXT_MS = `
ECONOMICS 9708/P1M
MARK SCHEME  Maximum Mark: 30

Question   Answer   Marks
    1        C        1
    2        A        1
    3        A        1
   10        B        1
   30        D        1
`;

// Some boards publish the key as a markdown pipe table.
const PIPE_MS = `
| Question | Answer | Marks |
| --- | --- | --- |
| 1 | B | 1 |
| 2 | D | 1 |
`;

describe("parseMcqAnswerKey", () => {
  it("parses the official plain-text Question/Answer/Marks table", () => {
    const key = parseMcqAnswerKey(PLAINTEXT_MS);
    expect(key["1"]).toBe("C");
    expect(key["2"]).toBe("A");
    expect(key["3"]).toBe("A");
    expect(key["10"]).toBe("B");
    expect(key["30"]).toBe("D");
  });

  it("parses pipe-delimited tables", () => {
    const key = parseMcqAnswerKey(PIPE_MS);
    expect(key["1"]).toBe("B");
    expect(key["2"]).toBe("D");
  });

  it("does NOT mistake prose for an answer row (requires a trailing marks digit)", () => {
    // "A student earns..." must not be read as Q15 -> A; "$15" must not become an answer.
    const key = parseMcqAnswerKey("Question 15\nA student earns money. The boat costs money.");
    expect(key["15"]).toBeUndefined();
  });

  it("returns an empty map for null / empty input", () => {
    expect(parseMcqAnswerKey(null)).toEqual({});
    expect(parseMcqAnswerKey("")).toEqual({});
    expect(parseMcqAnswerKey(undefined)).toEqual({});
  });
});

describe("questionNumberKey", () => {
  it("normalises parsed numbers and labels", () => {
    expect(questionNumberKey({ number: "1" })).toBe("1");
    expect(questionNumberKey({ number: "01" })).toBe("1");
    expect(questionNumberKey({ label: "Question 7" })).toBe("7");
    expect(questionNumberKey({})).toBeNull();
  });
});

describe("buildMcqFeedback", () => {
  it("awards 1/1 for a correct letter (case-insensitive)", () => {
    const fb = buildMcqFeedback("c", "C");
    expect(fb.markScheme).toContain("1/1");
    expect(fb.markScheme.toLowerCase()).toContain("correct");
    expect(fb.modelAnswer).toContain("C");
  });

  it("awards 0/1 for a wrong letter and names both choices", () => {
    const fb = buildMcqFeedback("B", "C");
    expect(fb.markScheme).toContain("0/1");
    expect(fb.markScheme).toContain("B");
    expect(fb.markScheme).toContain("C");
  });
});
