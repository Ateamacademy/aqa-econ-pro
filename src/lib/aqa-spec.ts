/**
 * AQA A-Level Economics (7136) — paper blueprint.
 * Single source of truth for every generated paper, preview, and mark scheme.
 */

export type PaperCode = "PAPER_1" | "PAPER_2" | "PAPER_3";
export type PaperNumber = 1 | 2 | 3;
export type AqaPaperCode = "7136/1" | "7136/2" | "7136/3";
export type SectionId = "A" | "B";

export interface AqaQuestionSpec {
  number: number;
  marks: number;
  skill?: string;
  format?: "MCQ" | "WRITTEN";
  options?: number;
}

export interface AqaSectionSpec {
  id: SectionId;
  name: string;
  marks: number;
  requires?: string[];
  questions: AqaQuestionSpec[];
}

export interface AqaPaperSpec {
  code: AqaPaperCode;
  number: PaperNumber;
  title: string;
  durationMinutes: number;
  totalMarks: 80;
  sections: AqaSectionSpec[];
}

export const AQA_SPEC: Record<PaperCode, AqaPaperSpec> = {
  PAPER_1: {
    code: "7136/1",
    number: 1,
    title: "Markets and Market Failure",
    durationMinutes: 120,
    totalMarks: 80,
    sections: [
      {
        id: "A",
        name: "Section A — Data response",
        marks: 40,
        requires: ["Extract A", "Extract B", "Extract C", "At least one figure/graph/table"],
        questions: [
          { number: 1, marks: 2, skill: "Definition / calculation", format: "WRITTEN" },
          { number: 2, marks: 4, skill: "Explain using extract", format: "WRITTEN" },
          { number: 3, marks: 9, skill: "Analyse with diagram", format: "WRITTEN" },
          { number: 4, marks: 25, skill: "Evaluate — extended response", format: "WRITTEN" },
        ],
      },
      {
        id: "B",
        name: "Section B — Essay (choose one of three contexts)",
        marks: 40,
        questions: [
          { number: 5, marks: 15, skill: "Explain / analyse", format: "WRITTEN" },
          { number: 6, marks: 25, skill: "Evaluate", format: "WRITTEN" },
        ],
      },
    ],
  },
  PAPER_2: {
    code: "7136/2",
    number: 2,
    title: "National and International Economy",
    durationMinutes: 120,
    totalMarks: 80,
    sections: [
      {
        id: "A",
        name: "Section A — Data response",
        marks: 40,
        requires: ["Extract A", "Extract B", "Extract C", "At least one figure/graph/table"],
        questions: [
          { number: 1, marks: 2, skill: "Definition / calculation", format: "WRITTEN" },
          { number: 2, marks: 4, skill: "Explain using extract", format: "WRITTEN" },
          { number: 3, marks: 9, skill: "Analyse with diagram", format: "WRITTEN" },
          { number: 4, marks: 25, skill: "Evaluate — extended response", format: "WRITTEN" },
        ],
      },
      {
        id: "B",
        name: "Section B — Essay (choose one of three contexts)",
        marks: 40,
        questions: [
          { number: 5, marks: 15, skill: "Explain / analyse", format: "WRITTEN" },
          { number: 6, marks: 25, skill: "Evaluate", format: "WRITTEN" },
        ],
      },
    ],
  },
  PAPER_3: {
    code: "7136/3",
    number: 3,
    title: "Economic Principles and Issues",
    durationMinutes: 120,
    totalMarks: 80,
    sections: [
      {
        id: "A",
        name: "Section A — Multiple choice",
        marks: 30,
        questions: Array.from({ length: 30 }, (_, i) => ({
          number: i + 1,
          marks: 1,
          format: "MCQ" as const,
          options: 4,
        })),
      },
      {
        id: "B",
        name: "Section B — Case study",
        marks: 50,
        requires: ["Long case study / extract"],
        questions: [
          { number: 31, marks: 10, skill: "Apply to context", format: "WRITTEN" },
          { number: 32, marks: 15, skill: "Analyse", format: "WRITTEN" },
          { number: 33, marks: 25, skill: "Evaluate — extended response", format: "WRITTEN" },
        ],
      },
    ],
  },
};

/* ── Domain types for actual generated papers ── */

export interface AqaFigure {
  id: string;
  title: string;
  /** Inline data for native rendering via recharts (preferred over images). */
  data?: Array<Record<string, string | number>>;
  xKey?: string;
  yKeys?: string[];
  caption?: string;
}

export interface AqaExtract {
  id: "A" | "B" | "C" | "CASE";
  title: string;
  body: string;
  figures?: AqaFigure[];
  source?: string;
}

export interface AqaQuestion {
  number: number;
  marks: number;
  section: SectionId;
  prompt: string;
  /** Set for Paper 3 Section A. */
  mcqOptions?: string[];
  mcqAnswer?: "A" | "B" | "C" | "D";
  /** For Section B essays where the student picks 1 of 3. */
  contextLabel?: string;
  /** True when AQA conventions expect (or strongly support) a student-drawn diagram. */
  requiresDiagram?: boolean;
  /** True when a diagram would help but is genuinely optional (15/25-mark essays). */
  diagramOptional?: boolean;
  /** Template the canvas preselects when mounted. */
  diagramType?: import("./aqa-diagram-rubric").DiagramType;
  /** AQA-style rubric for AI marking; populated whenever requiresDiagram is true. */
  diagramRubric?: import("./aqa-diagram-rubric").AqaDiagramRubric;
}

export interface AqaLevelDescriptor {
  level: 1 | 2 | 3 | 4;
  markBand: [number, number];
  descriptor: string;
}

export interface AqaMarkSchemeEntry {
  questionNumber: number;
  /** Used for 9, 15, and 25-mark questions (KAA + E). */
  levels?: AqaLevelDescriptor[];
  /** Used for 2- and 4-mark point-marked questions. */
  pointMarks?: string[];
  /** Used for Paper 3 MCQs (A/B/C/D + one-line justification). */
  mcqAnswer?: "A" | "B" | "C" | "D";
  mcqJustification?: string;
}

export type GeneratedPaperStatus = "generated" | "specimen" | "draft";

export interface GeneratedPaper {
  id: string;
  paperCode: AqaPaperCode;
  paperNumber: PaperNumber;
  title: string;
  practiceSetLabel: string;
  focus: string[];
  createdAt: string;
  status: GeneratedPaperStatus;
  extracts?: AqaExtract[];
  questions: AqaQuestion[];
  markScheme: AqaMarkSchemeEntry[];
  totalMarks: 80;
}

/* ── AQA subject content for the topic-focus picker ── */

export const AQA_TOPIC_FOCUS: Record<PaperNumber, string[]> = {
  1: [
    "Price determination",
    "Elasticity",
    "Production, costs & revenue",
    "Market structures",
    "Labour market",
    "Market failure",
    "Externalities",
    "Government intervention",
  ],
  2: [
    "Measurement of macro performance",
    "Aggregate demand & supply",
    "National income & multiplier",
    "Economic growth",
    "Inflation & unemployment",
    "Fiscal policy",
    "Monetary policy",
    "International trade",
    "Balance of payments",
    "Exchange rates",
    "Globalisation & development",
  ],
  3: [
    "Synoptic micro & macro",
    "Behavioural economics",
    "Financial markets",
    "Public sector economics",
  ],
};

/* ── Level-of-response template (AQA convention) ── */

export function defaultLevelsFor(totalMarks: number): AqaLevelDescriptor[] {
  // AQA uses 4-level KAA + E grids for 9, 15, 25 mark questions.
  // Bands scale proportionally to the question total.
  const bands: Array<[number, number]> = [
    [Math.max(1, Math.round(totalMarks * 0.0)), Math.round(totalMarks * 0.25)],
    [Math.round(totalMarks * 0.25) + 1, Math.round(totalMarks * 0.5)],
    [Math.round(totalMarks * 0.5) + 1, Math.round(totalMarks * 0.75)],
    [Math.round(totalMarks * 0.75) + 1, totalMarks],
  ];
  return [
    {
      level: 1,
      markBand: bands[0],
      descriptor:
        "Limited knowledge. Few accurate definitions or theory points. Little or no application to context. No analysis or evaluation.",
    },
    {
      level: 2,
      markBand: bands[1],
      descriptor:
        "Some accurate knowledge & relevant terminology. Some application to the extract / context. One-sided analysis with limited chains of reasoning. No evaluation.",
    },
    {
      level: 3,
      markBand: bands[2],
      descriptor:
        "Sound knowledge with relevant theory and a clear, accurate diagram (where required). Consistent application. Developed analysis with logical chains. Some evaluation, but undeveloped.",
    },
    {
      level: 4,
      markBand: bands[3],
      descriptor:
        "Precise knowledge & full theoretical depth. Sustained application throughout. Rigorous, multi-step analysis. Balanced evaluation with prioritised judgement and a supported conclusion.",
    },
  ];
}

/* ──────────────────────────────────────────────────────────────────────────
   VALIDATION — papers must conform to the spec or they're rejected.
────────────────────────────────────────────────────────────────────────── */

export interface ValidationIssue {
  code: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export function validateGeneratedPaper(paper: GeneratedPaper): ValidationResult {
  const issues: ValidationIssue[] = [];
  const specKey: PaperCode = `PAPER_${paper.paperNumber}` as PaperCode;
  const spec = AQA_SPEC[specKey];

  if (!spec) {
    return { valid: false, issues: [{ code: "UNKNOWN_PAPER", message: `Unknown paper number ${paper.paperNumber}` }] };
  }

  if (paper.paperCode !== spec.code) {
    issues.push({ code: "WRONG_CODE", message: `Expected ${spec.code}, got ${paper.paperCode}` });
  }
  if (paper.totalMarks !== spec.totalMarks) {
    issues.push({ code: "WRONG_TOTAL", message: `Expected ${spec.totalMarks} total marks, got ${paper.totalMarks}` });
  }

  // Per-section question + mark conformance
  for (const section of spec.sections) {
    const expectedQs = section.questions;
    const actualQs = paper.questions.filter((q) => q.section === section.id);
    if (actualQs.length !== expectedQs.length) {
      issues.push({
        code: `SECTION_${section.id}_COUNT`,
        message: `Section ${section.id}: expected ${expectedQs.length} questions, got ${actualQs.length}`,
      });
    }
    const sectionMarks = actualQs.reduce((sum, q) => sum + q.marks, 0);
    if (sectionMarks !== section.marks) {
      issues.push({
        code: `SECTION_${section.id}_MARKS`,
        message: `Section ${section.id}: expected ${section.marks} marks, got ${sectionMarks}`,
      });
    }
    for (const expected of expectedQs) {
      const actual = actualQs.find((q) => q.number === expected.number);
      if (!actual) {
        issues.push({
          code: `Q${expected.number}_MISSING`,
          message: `Q${expected.number} missing from section ${section.id}`,
        });
        continue;
      }
      if (actual.marks !== expected.marks) {
        issues.push({
          code: `Q${expected.number}_MARKS`,
          message: `Q${expected.number}: expected ${expected.marks} marks, got ${actual.marks}`,
        });
      }
      if (expected.format === "MCQ") {
        if (!actual.mcqOptions || actual.mcqOptions.length !== (expected.options ?? 4)) {
          issues.push({
            code: `Q${expected.number}_MCQ_OPTIONS`,
            message: `Q${expected.number}: MCQ must have exactly ${expected.options ?? 4} options`,
          });
        }
      }
    }
  }

  // Extract requirements
  if (paper.paperNumber === 1 || paper.paperNumber === 2) {
    const ids = new Set((paper.extracts ?? []).map((e) => e.id));
    for (const required of ["A", "B", "C"] as const) {
      if (!ids.has(required)) {
        issues.push({ code: `EXTRACT_${required}_MISSING`, message: `Extract ${required} is required` });
      }
    }
    const hasFigure = (paper.extracts ?? []).some((e) => e.figures && e.figures.length > 0);
    if (!hasFigure) {
      issues.push({ code: "FIGURE_MISSING", message: "At least one figure/graph/table is required in Section A" });
    }
  }
  if (paper.paperNumber === 3) {
    const ids = new Set((paper.extracts ?? []).map((e) => e.id));
    if (!ids.has("CASE")) {
      issues.push({ code: "CASE_MISSING", message: "Paper 3 Section B requires a long case study extract" });
    }
  }

  return { valid: issues.length === 0, issues };
}

/* ── Helpers for the UI ── */

export function blueprintStrip(paperNumber: PaperNumber): string {
  if (paperNumber === 3) return "MCQ · 30 · Case · 50 · Total · 80";
  return "Sec A · 40 · Sec B · 40 · Total · 80";
}

export function questionMarkChips(paperNumber: PaperNumber): Array<{ label: string; sub: string }> {
  if (paperNumber === 3) {
    return [
      { label: "Q1–30", sub: "MCQ (30)" },
      { label: "Q31", sub: "10" },
      { label: "Q32", sub: "15" },
      { label: "Q33", sub: "25" },
    ];
  }
  return [
    { label: "Q1", sub: "2" },
    { label: "Q2", sub: "4" },
    { label: "Q3", sub: "9" },
    { label: "Q4", sub: "25" },
    { label: "Q5", sub: "15" },
    { label: "Q6", sub: "25" },
  ];
}
