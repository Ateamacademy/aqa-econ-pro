/**
 * AQA A-Level Economics (7136) — board definition.
 *
 * IMPORTANT: This file is a thin wrapper over the existing AQA implementation
 * which lives in `src/lib/aqa-*` and `src/data/aqa*`. Those files are the
 * canonical AQA source and MUST NOT be modified by multi-board work.
 *
 * The wrapper exists so that AQA A-Level is discoverable via the multi-board
 * registry without forcing a code-level migration of legacy files.
 */
import type { BoardDefinition, PaperBlueprint } from "../board-definition";
import { AQA_SPEC } from "@/lib/aqa-spec";
import { AQA_QUESTION_STEMS } from "@/lib/aqa-phrases";
import { AQA_GRADE_BOUNDARIES } from "@/lib/aqa-grade-boundaries";

const papers: PaperBlueprint[] = (Object.values(AQA_SPEC) as Array<typeof AQA_SPEC[keyof typeof AQA_SPEC]>).map((p) => ({
  code: p.code,
  paperNumber: p.number,
  title: p.title,
  totalMarks: p.totalMarks,
  durationMinutes: p.durationMinutes,
  sections: p.sections.map((s) => ({
    id: s.id,
    name: s.name,
    marks: s.marks,
    requires: s.requires,
    questions: s.questions.map((q) => ({
      number: String(q.number),
      marks: q.marks,
      skill: q.skill,
      format: q.format,
      options: q.options,
    })),
  })),
}));

export const AQA_A_LEVEL_DEFINITION: BoardDefinition = {
  id: "aqa-a-level",
  displayName: "AQA A-Level",
  qualificationType: "A-Level",
  qualificationCode: "7136",
  papers,
  markSchemeConvention: {
    skillFramework: "KAA+E",
    levelBands: {}, // owned by `src/lib/aqa-levels.ts` — not duplicated here
    examinerAnnotations: ["KAA", "Eval", "L1", "L2", "L3", "L4", "L5"],
    descriptorStyle: "verbatim",
  },
  phraseLibrary: {
    twoMarkCalc: AQA_QUESTION_STEMS.calc,
    shortExplain: AQA_QUESTION_STEMS.explainData,
    diagramExplain: AQA_QUESTION_STEMS.diagramExplain,
    extendedEvaluate: AQA_QUESTION_STEMS.dataEvaluate,
    mcqStems: AQA_QUESTION_STEMS.mcq ?? [],
    essayExplain: AQA_QUESTION_STEMS.essayExplain,
    essayEvaluate: AQA_QUESTION_STEMS.essayEvaluate,
  },
  gradeBoundaries: AQA_GRADE_BOUNDARIES["7136"] as Record<string, BoardDefinition["gradeBoundaries"][string]>,
  topicSpec: {
    numberingScheme: "4.x.x (4.1.1 Markets, 4.2.1 Macro, …)",
    themes: [
      { code: "4.1", name: "Individuals, firms, markets and market failure", paper: 1 },
      { code: "4.2", name: "The national and international economy", paper: 2 },
    ],
  },
  refinementStatus: "refined",
  forbiddenPhrases: {
    // AQA's canonical forbidden-phrase rules live in `src/lib/markValidator.ts`
    // and `src/lib/aqa-spec.ts`. They are intentionally NOT mirrored here to
    // avoid drift; consumers should look up AQA-specific rules at their
    // existing call sites.
  },
  examples: {
    paper1: "AQA 7136/1 June 2024",
    paper2: "AQA 7136/2 June 2024",
    paper3: "AQA 7136/3 June 2024",
  },
};
