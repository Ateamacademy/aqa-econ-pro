/**
 * AQA A-Level Economics (7136) · verbatim question stem templates.
 * Drawn from real past papers (June 2017 – June 2024).
 *
 * The generator selects from this library and fills placeholders.
 * It does NOT invent new phrasings. Validation regexes confirm that
 * every generated stem matches one of these templates.
 */

export const AQA_QUESTION_STEMS = {
  // 2-mark calculation / definition
  calc: [
    "Using the data in Extract {X}, calculate {what}. Give your answer to {dp} decimal place{s}.",
    "Using the data in Extract {X} (Table {Y}), calculate the percentage {direction} in {variable} between {year1} and {year2}. Give your answer to one decimal place.",
    "Using the data in Extract {X}, calculate the ratio of {A} to {B}. Give your answer to two decimal places.",
    "Define the term '{term}'.",
  ],

  // 4-mark explain-from-data
  explainData: [
    "Explain how the data in Extract {X} (Figure {Y} and Table {Z}) show that {observation}.",
    "Explain how the data in Extract {X} show that {observation}.",
  ],

  // 9-mark diagram-explain
  diagramExplain: [
    "Extract {X} (lines {a}–{b}) states that '{quote}'. With the help of a diagram, explain {what}.",
    "With the help of a diagram, explain how {cause} is likely to affect {outcome}.",
    "With the help of a diagram, explain the impact of {change} on {market}.",
  ],

  // 25-mark data-response evaluate
  dataEvaluate: [
    "Extract {X} (lines {a}–{b}) states that '{quote}'. Using the data in the extracts and your knowledge of economics, discuss {proposition}.",
    "Extract {X} (lines {a}–{b}) states: '{quote}'. Using the data in the extracts and your knowledge of economics, evaluate the view that {proposition}.",
    "Extract {X} (lines {a}–{b}) states: '{quote}'. Using the data in the extracts and your knowledge of economics, assess the view that {proposition}.",
  ],

  // 15-mark essay part (explain / analyse)
  essayExplain: [
    "Explain {concept}.",
    "Explain, using examples, how {mechanism}.",
    "Explain the factors which determine {variable}.",
    "Explain why {phenomenon} may {effect}.",
    "Explain possible reasons why {scenario}.",
  ],

  // 25-mark essay part (evaluate)
  essayEvaluate: [
    "Evaluate the view that {proposition}.",
    "Assess the view that {proposition}.",
    "Assess whether {proposition}.",
    "To what extent {proposition}?",
    "Discuss whether {proposition}.",
  ],

  // Paper 3 MCQ stems
  mcq: [
    "Which one of the following {question}?",
    "Based on the information in {ref}, which one of the following statements is correct?",
    "What was {metric} over the period shown in {ref}?",
  ],
} as const;

/**
 * Forbidden generic openers · flagged as "AI-tells".
 * Real AQA papers never start an essay stimulus this way.
 */
export const FORBIDDEN_OPENERS = [
  /^some economists argue that/i,
  /^in recent years[,\s]/i,
  /^it is widely believed that/i,
  /^many people believe that/i,
  /^throughout history/i,
  /^in today'?s world/i,
];

/**
 * Canonical real-world organisations that authentic AQA extracts cite.
 * At least one must appear per Section A context.
 */
export const CANONICAL_ORGS = [
  "Office for National Statistics",
  "ONS",
  "Bank of England",
  "Office for Budget Responsibility",
  "OBR",
  "Competition and Markets Authority",
  "CMA",
  "Resolution Foundation",
  "Institute for Fiscal Studies",
  "IFS",
  "HM Treasury",
  "Department for Business",
  "Cushman Wakefield",
  "Citizens Advice",
  "National Union of Students",
  "Trades Union Congress",
  "TUC",
  "IMF",
  "World Bank",
  "OECD",
  "WTO",
  "Federal Reserve",
  "European Central Bank",
];

// ── Validators ──────────────────────────────────────────────────────────────

const STEM_REGEXES = {
  calc: [
    /^using the data in extract\s+\w+(?:\s+\(table\s+\w+\))?,?\s+calculate /i,
    /^define the term/i,
  ],
  explainData: [/^explain how the data in extract\s+\w+/i],
  diagramExplain: [
    /^extract\s+\w+\s+\(lines\s+[\d\u2013\u2014\-]+\).+with the help of a diagram, explain /i,
    /^with the help of a diagram, explain (?:how|the impact of)/i,
  ],
  dataEvaluate: [
    /^extract\s+\w+\s+\(lines\s+[\d\u2013\u2014\-]+\).+(?:discuss|evaluate the view that|assess the view that)/i,
  ],
  essayExplain: [
    /^explain (?:the |possible reasons why |why |how |, using examples,|using examples how )/i,
    /^explain (?:the factors|how|why)/i,
  ],
  essayEvaluate: [
    /^(?:evaluate the view that|assess the view that|assess whether|to what extent|discuss whether)/i,
  ],
  mcq: [
    /^which one of the following/i,
    /^based on the information in/i,
    /^what was /i,
  ],
};

export type StemKind = keyof typeof STEM_REGEXES;

/** Returns the matching stem kind, or null if none matches. */
export function classifyStem(stem: string): StemKind | null {
  const trimmed = stem.trim();
  for (const kind of Object.keys(STEM_REGEXES) as StemKind[]) {
    if (STEM_REGEXES[kind].some((re) => re.test(trimmed))) return kind;
  }
  return null;
}

/** Validates a stem against the expected kind for a given mark value. */
export function isValidStemForMarks(stem: string, marks: number): boolean {
  const kind = classifyStem(stem);
  if (!kind) return false;
  if (marks === 1) return kind === "mcq";
  if (marks === 2) return kind === "calc";
  if (marks === 4) return kind === "explainData";
  if (marks === 9) return kind === "diagramExplain";
  if (marks === 15) return kind === "essayExplain";
  if (marks === 25) return kind === "dataEvaluate" || kind === "essayEvaluate";
  if (marks === 10) return true; // Paper 3 Q31 · bespoke "to what extent" stem
  return true;
}

/** Detect a forbidden generic essay opener. */
export function hasForbiddenOpener(text: string): boolean {
  const trimmed = text.trim();
  return FORBIDDEN_OPENERS.some((re) => re.test(trimmed));
}

// ── Reviewer-tracker validators (Paper 1 / Paper 2 wording rules) ──────────

/**
 * Rule (reviewer-flagged, P1 Q3 / P2 Q3): a 9-mark question that requires
 * a diagram MUST start with an explicit diagram instruction. The phrase
 * "your knowledge of economics" is reserved for 15 / 25-mark essays.
 */
const DIAGRAM_INSTRUCTION_RE =
  /\b(with\s+the\s+(help|aid)\s+of\s+(an?\s+)?(appropriate\s+)?diagram|using\s+an?\s+[a-z\/\-\s]*diagram)\b/i;
const KNOWLEDGE_OF_ECON_RE = /\byour\s+knowledge\s+of\s+economics\b/i;

export interface NineMarkValidation {
  ok: boolean;
  reason?: string;
}

/** Validate a 9-mark diagram question stem against AQA conventions. */
export function validateNineMarkDiagramStem(stem: string): NineMarkValidation {
  const t = stem.trim();
  if (!DIAGRAM_INSTRUCTION_RE.test(t)) {
    return {
      ok: false,
      reason:
        'A 9-mark diagram question must begin with "With the help of a diagram..." (or specify a named diagram type).',
    };
  }
  if (KNOWLEDGE_OF_ECON_RE.test(t)) {
    return {
      ok: false,
      reason:
        'The phrase "your knowledge of economics" is reserved for 15- and 25-mark extended-response questions and must not appear on 9-mark diagram questions.',
    };
  }
  return { ok: true };
}

/**
 * Rule (reviewer-flagged, P1 Q1): a 2-mark percentage-change calculation
 * must say "increase or decrease" (or "change in") so direction matters.
 * Pure "percentage change" without direction is ambiguous and loses marks.
 */
const PERCENT_CHANGE_RE = /\bpercentage\s+change\b/i;
const DIRECTION_EXPLICIT_RE =
  /\b(increase\s+or\s+decrease|state\s+(?:clearly\s+)?whether|state\s+the\s+direction|indicate\s+whether)\b/i;

export interface PercentChangeValidation {
  ok: boolean;
  reason?: string;
}

export function validatePercentageChangeStem(stem: string): PercentChangeValidation {
  const t = stem.trim();
  if (!PERCENT_CHANGE_RE.test(t)) return { ok: true };
  if (DIRECTION_EXPLICIT_RE.test(t)) return { ok: true };
  return {
    ok: false,
    reason:
      'A percentage-change calculation must explicitly ask for direction · e.g. "Calculate the percentage increase or decrease..." or "...and state clearly whether the change is an increase or a decrease."',
  };
}

/**
 * Rule (reviewer-flagged, P1 Q6): every 25-mark "evaluate" model answer must
 * contain a substantive evaluation/conclusion section.
 */
const CONCLUSION_HEADER_RE = /\b(conclusion|evaluation\s+and\s+conclusion|judgement|overall(\s+judgement)?)\b/i;

export interface ModelAnswerValidation {
  ok: boolean;
  reason?: string;
}

export function validateEvaluateModelAnswer(modelAnswer: string): ModelAnswerValidation {
  const text = modelAnswer || "";
  if (!CONCLUSION_HEADER_RE.test(text)) {
    return {
      ok: false,
      reason:
        'A 25-mark "evaluate" model answer must end with a Conclusion / Evaluation and Conclusion section containing a supported judgement.',
    };
  }
  // Crude check: at least 60 words after the conclusion marker.
  const idx = text.search(CONCLUSION_HEADER_RE);
  const tail = text.slice(idx).split(/\s+/).filter(Boolean);
  if (tail.length < 60) {
    return {
      ok: false,
      reason:
        'The Conclusion section must contain at least 60 words of supported judgement (currently shorter).',
    };
  }
  return { ok: true };
}

/**
 * Heuristic: a paragraph fails the "non-round-numbers" gate if every numeric
 * value in it is an exact multiple of 5 or 10.
 */
export function hasNonRoundNumbers(paragraph: string): boolean {
  const nums = paragraph.match(/\b\d+(?:\.\d+)?\b/g);
  if (!nums || nums.length === 0) return true;
  return nums.some((n) => {
    const v = parseFloat(n);
    if (Number.isNaN(v)) return false;
    return v % 5 !== 0 && v % 10 !== 0;
  });
}

/** Detect at least one canonical org reference. */
export function mentionsCanonicalOrg(text: string): boolean {
  return CANONICAL_ORGS.some((org) =>
    new RegExp(`\\b${org.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(text),
  );
}

// ── Question-numbering helpers ──────────────────────────────────────────────

/** Render an AQA-style question number with a thin space between digits: "0 1". */
export function aqaNumber(n: number): string {
  const s = n.toString().padStart(2, "0");
  // U+2009 thin space
  return `${s[0]}\u2009${s[1]}`;
}
