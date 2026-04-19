/**
 * Multi-board infrastructure — canonical types.
 *
 * Every supported exam board is described as DATA via a `BoardDefinition`,
 * not as scattered code. Each board's content lives in its own folder under
 * `src/lib/boards/{boardId}/` and is registered in `./registry.ts`.
 *
 * AQA A-Level was the first board implemented (in legacy files under
 * `src/lib/aqa-*` and `src/data/*aqa*`). Its definition wraps those files
 * untouched. New boards (starting with Edexcel A) own their data inside
 * their own folder.
 */

export type BoardId =
  | "aqa-a-level"
  | "edexcel-a-a-level"
  | "edexcel-b-a-level"
  | "ocr-a-level"
  | "caie-a-level"
  | "ib-hlsl"
  | "wjec-a-level"
  | "eduqas-a-level"
  | "aqa-gcse"
  | "caie-igcse"
  | "edexcel-igcse"
  | "ocr-gcse";

export type QualificationType = "A-Level" | "GCSE" | "IGCSE" | "IB";

export type RefinementStatus = "refined" | "blueprint-pending" | "not-started";

/** Skill frameworks used by different boards' mark schemes. */
export type SkillFramework =
  | "KAA+E"          // AQA A-Level (Knowledge, Application, Analysis + Evaluation)
  | "K/Ap/An/Ev"     // Edexcel A — explicit per-skill mark splits
  | "AO1-AO4"        // AOs (CAIE / WJEC variants)
  | "Custom";

export type LevelBand = {
  level: number;
  range: [number, number]; // marks range, inclusive
  descriptor: string;
};

/** A per-skill split for boards that use explicit K/Ap/An/Ev marks. */
export type SkillSplit = {
  K: number;   // Knowledge
  Ap: number;  // Application
  An: number;  // Analysis
  Ev: number;  // Evaluation
};

export type MarkSchemeConvention = {
  skillFramework: SkillFramework;
  /** Level-of-response grids keyed by question mark value (used by KAA+E boards). */
  levelBands: Record<number, LevelBand[]>;
  /** Per-skill mark splits keyed by question mark value (used by K/Ap/An/Ev boards). */
  skillSplits?: Record<number, SkillSplit>;
  examinerAnnotations: string[];
  descriptorStyle: "verbatim" | "paraphrased";
};

export type PhraseLibrary = {
  twoMarkCalc: string[];
  shortExplain: string[];
  diagramExplain: string[];
  extendedEvaluate: string[];
  mcqStems: string[];
  essayExplain: string[];
  essayEvaluate: string[];
};

export type GradeBoundarySet = {
  "A*": number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  maxMarks: number;
};

export type SectionBlueprint = {
  id: string;             // "A" | "B" | "C" etc.
  name: string;
  marks: number;
  questions: Array<{
    number: string;       // "1", "1(a)", "6(b)", etc. — string to support sub-parts
    marks: number;
    skill?: string;
    format?: "MCQ" | "WRITTEN";
    options?: number;
  }>;
  /** Free-text required components, e.g. "Extract 1", "Figure 1", "Table 1". */
  requires?: string[];
  /** For "choice" sections — the student answers N of M questions. */
  chooseN?: { answer: number; from: number };
};

export type PaperBlueprint = {
  code: string;            // e.g. "9EC0/01" or "7136/1"
  paperNumber: number;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  sections: SectionBlueprint[];
};

export type TopicSpecification = {
  /** Free-form board topic numbering scheme, e.g. "1.1.1 / 1.2.3" for Edexcel. */
  numberingScheme: string;
  /** Top-level themes / paper-areas for this board. */
  themes: Array<{ code: string; name: string; paper: number }>;
};

export type BoardDefinition = {
  id: BoardId;
  displayName: string;
  qualificationType: QualificationType;
  qualificationCode: string;
  papers: PaperBlueprint[];
  markSchemeConvention: MarkSchemeConvention;
  phraseLibrary: PhraseLibrary;
  gradeBoundaries: Record<string, GradeBoundarySet | null>;
  topicSpec: TopicSpecification;
  refinementStatus: RefinementStatus;
  /** Forbidden boilerplate phrases this board's papers must never contain. */
  forbiddenPhrases: Record<string, string[]>;
  examples?: {
    paper1?: string;
    paper2?: string;
    paper3?: string;
  };
};

/** Helper: empty stub used by boards that are not yet refined. */
export function makeStub(id: BoardId, displayName: string, qualificationType: QualificationType, qualificationCode: string): BoardDefinition {
  return {
    id,
    displayName,
    qualificationType,
    qualificationCode,
    papers: [],
    markSchemeConvention: {
      skillFramework: "Custom",
      levelBands: {},
      examinerAnnotations: [],
      descriptorStyle: "paraphrased",
    },
    phraseLibrary: {
      twoMarkCalc: [],
      shortExplain: [],
      diagramExplain: [],
      extendedEvaluate: [],
      mcqStems: [],
      essayExplain: [],
      essayEvaluate: [],
    },
    gradeBoundaries: {},
    topicSpec: { numberingScheme: "TBD", themes: [] },
    refinementStatus: "blueprint-pending",
    forbiddenPhrases: {},
  };
}
