/**
 * Automated regression validators for the QA tracker.
 *
 * Each validator returns a list of issues that should be surfaced on
 * /admin/qa-tracker. They run over the AQA paper overrides + mark-scheme
 * builders so issues caught here can be prevented from re-entering the
 * library.
 */

export interface QaIssue {
  id: string;
  category: string;
  paper_code: string;
  paper_set?: string | null;
  question_number?: string | null;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
}

const FORBIDDEN_9_MARK_PHRASE = /your\s+knowledge\s+of\s+economics/i;
const REQUIRED_DIAGRAM_STEM = /(with the help of a diagram|using\s+(a|an)\s+[a-z\- ]*\s*diagram)/i;
const PERCENT_DIRECTION = /(increase|decrease|increased|decreased|rise|fall)/i;

export function validateNineMarkDiagramStem(stem: string): string | null {
  if (!REQUIRED_DIAGRAM_STEM.test(stem)) {
    return "9-mark diagram question must begin with 'With the help of a diagram...' or 'Using a [type] diagram...'";
  }
  if (FORBIDDEN_9_MARK_PHRASE.test(stem)) {
    return "9-mark question must not contain 'your knowledge of economics' (reserved for 15/25-mark)";
  }
  return null;
}

export function validatePercentChangeStem(stem: string): string | null {
  if (!/percentage\s+(change|increase|decrease)/i.test(stem)) return null;
  if (!PERCENT_DIRECTION.test(stem)) {
    return "Percentage change calculation must explicitly say 'increase or decrease'";
  }
  return null;
}

export function validateTwentyFiveMarkScheme(markScheme: string): string | null {
  // AQA 5-level banding — must mention all five level ranges.
  const bands = ["1–5", "6–10", "11–15", "16–20", "21–25"];
  const missing = bands.filter((b) => !markScheme.includes(b));
  if (missing.length > 0) {
    return `25-mark scheme missing AQA 5-level bands: ${missing.join(", ")}`;
  }
  if (!/AO4/i.test(markScheme)) {
    return "25-mark scheme must reference AO4 as top-band discriminator";
  }
  return null;
}

export function validateFifteenMarkScheme(markScheme: string): string | null {
  const bands = ["1–5", "6–10", "11–15"];
  const missing = bands.filter((b) => !markScheme.includes(b));
  if (missing.length > 0) {
    return `15-mark scheme missing AQA 3-level bands: ${missing.join(", ")}`;
  }
  if (/AO4/i.test(markScheme)) {
    return "15-mark scheme must NOT reference AO4 (AO3 is the top discriminator)";
  }
  return null;
}

export function validateEvaluateModelAnswer(modelAnswer: string): string | null {
  if (!/evaluation|conclusion|judg(e|)ment/i.test(modelAnswer)) {
    return "25-mark Evaluate model answer missing Evaluation/Conclusion section";
  }
  // Find the conclusion/evaluation block and check it's ≥60 words.
  const match = modelAnswer.match(/(evaluation|conclusion|judg(?:e|)ment)[\s\S]{0,2000}$/i);
  if (match) {
    const wc = match[0].trim().split(/\s+/).length;
    if (wc < 60) {
      return `Evaluation/Conclusion section is ${wc} words; AQA requires ≥60`;
    }
  }
  return null;
}

export interface ValidatorRunResult {
  passed: number;
  failed: number;
  issues: QaIssue[];
}

/**
 * Runs all validators over a set of paper-question records. Each record
 * carries its stem and (optionally) its mark scheme + model answer text.
 */
export function runRegressionValidators(
  records: Array<{
    paper_code: string;
    paper_set?: string;
    question_number: string;
    marks: number;
    stem: string;
    markScheme?: string;
    modelAnswer?: string;
  }>,
): ValidatorRunResult {
  const issues: QaIssue[] = [];
  let passed = 0;

  for (const r of records) {
    const checks: Array<[string, string | null]> = [];
    if (r.marks === 9) checks.push(["9-mark stem", validateNineMarkDiagramStem(r.stem)]);
    if (/percentage/i.test(r.stem)) checks.push(["% change direction", validatePercentChangeStem(r.stem)]);
    if (r.marks === 25 && r.markScheme) checks.push(["25-mark banding", validateTwentyFiveMarkScheme(r.markScheme)]);
    if (r.marks === 15 && r.markScheme) checks.push(["15-mark banding", validateFifteenMarkScheme(r.markScheme)]);
    if (r.marks === 25 && r.modelAnswer && /evaluate/i.test(r.stem))
      checks.push(["Evaluation section", validateEvaluateModelAnswer(r.modelAnswer)]);

    for (const [label, err] of checks) {
      if (err) {
        issues.push({
          id: `${r.paper_code}-${r.question_number}-${label}`,
          category: label,
          paper_code: r.paper_code,
          paper_set: r.paper_set,
          question_number: r.question_number,
          severity: "high",
          title: `${r.paper_code} ${r.paper_set ?? ""} Q${r.question_number}: ${label}`,
          description: err,
        });
      } else {
        passed += 1;
      }
    }
  }

  return { passed, failed: issues.length, issues };
}
