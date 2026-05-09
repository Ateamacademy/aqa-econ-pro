/**
 * Marking test harness · defines test scenarios for validation.
 * Surface via /debug/marking-tests?debug=1
 *
 * These scenarios define ACCEPTANCE CRITERIA for the ghost-mark fix.
 * If any returns non-zero where 0 is expected, flag as regression.
 */

export interface MarkingTestScenario {
  id: string;
  name: string;
  description: string;
  expectedScore: string;
  expectedApiCall: boolean;
  expectedGate: string | null;
  expectedCapApplied?: "empty" | "sparse" | "partial" | null;
}

export const markingTestScenarios: MarkingTestScenario[] = [
  {
    id: "empty-canvas",
    name: "Empty canvas",
    description: "A completely blank white canvas with no marks at all.",
    expectedScore: "0/8",
    expectedApiCall: false,
    expectedGate: "A (ink ratio < 1%)",
    expectedCapApplied: "empty",
  },
  {
    id: "single-squiggle",
    name: "Single squiggle",
    description: "A single short curved line (~2cm) with no axes, labels, or other elements.",
    expectedScore: "0/8",
    expectedApiCall: false,
    expectedGate: "A (ink ratio < 3%) or B (bounding box < 20%)",
    expectedCapApplied: "empty",
  },
  {
    id: "unlabelled-axes",
    name: "Two perpendicular lines, no labels, no curves",
    description: "Just two perpendicular lines (potential axes) but zero text labels and no curves.",
    expectedScore: "0/8",
    expectedApiCall: false,
    expectedGate: "C (too few components) or empty-check (no curves detected)",
    expectedCapApplied: "empty",
  },
  {
    id: "labelled-axes-no-curves",
    name: "Labelled axes but no curves",
    description: "Two perpendicular lines with 'Price' and 'Quantity' labels but no curves drawn.",
    expectedScore: "max 1/8",
    expectedApiCall: true,
    expectedGate: null,
    expectedCapApplied: "sparse",
  },
  {
    id: "correct-full-diagram",
    name: "Correct full diagram with all features",
    description: "A complete, correctly drawn and fully labelled diagram with all required components.",
    expectedScore: "7-8/8",
    expectedApiCall: true,
    expectedGate: null,
    expectedCapApplied: null,
  },
  {
    id: "blank-canvas-brilliant-essay",
    name: "Blank canvas + 500-word brilliant written essay",
    description: "The diagram canvas is completely empty but the student wrote a 500-word perfect explanation.",
    expectedScore: "Diagram: 0, Written: capped at 50% ceiling",
    expectedApiCall: false,
    expectedGate: "A (ink ratio < 1%)",
    expectedCapApplied: "empty",
  },
  {
    id: "blank-canvas-no-text",
    name: "Blank canvas, no text at all",
    description: "Both the diagram canvas and written explanation are completely empty.",
    expectedScore: "0/8",
    expectedApiCall: false,
    expectedGate: "A (ink ratio < 1%)",
    expectedCapApplied: "empty",
  },
];

/**
 * Validate a test result against expected outcome.
 * Returns null if pass, or a regression warning string.
 */
export function validateTestResult(
  scenario: MarkingTestScenario,
  actualScore: number,
  apiCalled: boolean
): string | null {
  // Scenarios expecting 0 marks
  const expectsZero = scenario.expectedScore.startsWith("0/") || scenario.expectedScore === "0/8";

  if (expectsZero && actualScore > 0) {
    return `REGRESSION: Ghost mark detected in scenario "${scenario.id}". Expected 0, got ${actualScore}.`;
  }

  if (!scenario.expectedApiCall && apiCalled) {
    return `REGRESSION: API call made in scenario "${scenario.id}" where none was expected (submission should have been blocked by gates).`;
  }

  return null;
}
