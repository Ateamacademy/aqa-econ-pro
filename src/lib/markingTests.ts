/**
 * Marking test harness — defines test scenarios for validation.
 * Surface via /debug/marking-tests?debug=1
 */

import type { ValidationResult } from "./imageValidation";

export interface MarkingTestScenario {
  id: string;
  name: string;
  description: string;
  expectedScore: string;
  expectedApiCall: boolean;
  expectedGate: string | null;
}

export const markingTestScenarios: MarkingTestScenario[] = [
  {
    id: "empty-canvas",
    name: "Empty canvas",
    description: "A completely blank white canvas with no marks at all.",
    expectedScore: "0/8",
    expectedApiCall: false,
    expectedGate: "A (ink ratio < 0.5%)",
  },
  {
    id: "single-squiggle",
    name: "Single squiggle",
    description: "A single short curved line (~2cm) with no axes, labels, or other elements.",
    expectedScore: "0/8",
    expectedApiCall: false,
    expectedGate: "A or B (too sparse or too small)",
  },
  {
    id: "unlabelled-axes",
    name: "Two perpendicular lines, no labels",
    description: "Just two perpendicular lines (potential axes) but zero text labels anywhere.",
    expectedScore: "max 1/8",
    expectedApiCall: true,
    expectedGate: null,
  },
  {
    id: "correct-full-diagram",
    name: "Correct full diagram with all features",
    description: "A complete, correctly drawn and fully labelled diagram with all required components.",
    expectedScore: "7-8/8",
    expectedApiCall: true,
    expectedGate: null,
  },
  {
    id: "good-diagram-short-text",
    name: "Correct diagram, explanation under 20 words",
    description: "Full correct diagram but the written explanation is fewer than 20 words.",
    expectedScore: "Diagram marks awarded, AO scores all 0",
    expectedApiCall: true,
    expectedGate: null,
  },
  {
    id: "empty-everything-25",
    name: "Empty answer + empty diagram (25-mark essay)",
    description: "Both the typed answer and diagram canvas are completely empty for a 25-mark question.",
    expectedScore: "0/25",
    expectedApiCall: false,
    expectedGate: "Word count gate (0 words, min 500)",
  },
  {
    id: "copy-pasted-question",
    name: "25-mark essay with question copy-pasted",
    description: "Student copy-pasted the question as their answer. After deduplication the effective word count is near zero.",
    expectedScore: "0/25",
    expectedApiCall: false,
    expectedGate: "Word count gate or plagiarism gate",
  },
];
