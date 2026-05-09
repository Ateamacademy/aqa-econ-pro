/**
 * Edexcel A A-Level (9EC0) · boilerplate phrases that must NEVER appear in
 * generated papers. Picked up by `src/lib/boards/blueprint-validator.ts`.
 *
 * Distinct from AQA's forbidden phrases · AQA uses "Source: News reports,
 * {year}" and the "0 1 / 0 2" question prefix; Edexcel uses full-URL sources
 * and "1(a) / 6(b)" numbering.
 */
export const EDEXCEL_A_FORBIDDEN_PHRASES: Record<string, string[]> = {
  "paper1-sectionA": [
    "you are advised to spend 1 hour",
    "answer both parts",
    "Source: News reports", // AQA-style placeholder, illegal on Edexcel
  ],
  "paper1-sectionB": [
    "Source: News reports",
    "0 1",
    "0 2",
    "0 3", // AQA's two-digit prefix style
  ],
  "paper1-sectionC": [
    "Source: News reports",
    "Answer BOTH Question 5 AND Question 6", // AQA Section B instruction
  ],
  "paper2-sectionA": [
    "you are advised to spend 1 hour",
    "Source: News reports",
  ],
  "paper2-sectionB": [
    "Source: News reports",
    "0 1",
    "0 2",
  ],
  "paper2-sectionC": [
    "Source: News reports",
    "Answer BOTH Question 5 AND Question 6",
  ],
  "paper3-sectionA": [
    "Source: News reports",
    "Multiple Choice", // Paper 3 has no MCQ in Edexcel A
  ],
  "paper3-sectionB": [
    "Source: News reports",
  ],
};
