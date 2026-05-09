/**
 * Edexcel A A-Level Economics (9EC0) · board definition.
 *
 * This folder is the canonical home of all Edexcel A board metadata. Existing
 * files in `src/data/edexcelA*.ts` and `src/data/edexcelBoardProfiles.ts` hold
 * the live predicted-paper content + diagram taxonomy and are imported here;
 * they remain in their current location to keep the ~15 dependent pages
 * working unchanged.
 *
 * Cross-board imports are forbidden · this folder must not import from
 * `src/lib/boards/aqa-a-level/` or any other board folder.
 */
import type { BoardDefinition } from "../board-definition";
import { EDEXCEL_A_PAPERS } from "./blueprint";
import { EDEXCEL_A_PHRASES } from "./phrases";
import { EDEXCEL_A_MARK_SCHEME } from "./mark-scheme";
import { EDEXCEL_A_GRADE_BOUNDARIES } from "./grade-boundaries";
import { EDEXCEL_A_FORBIDDEN_PHRASES } from "./forbidden-phrases";

export const EDEXCEL_A_A_LEVEL_DEFINITION: BoardDefinition = {
  id: "edexcel-a-a-level",
  displayName: "Edexcel A A-Level",
  qualificationType: "A-Level",
  qualificationCode: "9EC0",
  papers: EDEXCEL_A_PAPERS,
  markSchemeConvention: EDEXCEL_A_MARK_SCHEME,
  phraseLibrary: EDEXCEL_A_PHRASES,
  gradeBoundaries: EDEXCEL_A_GRADE_BOUNDARIES,
  topicSpec: {
    numberingScheme: "1.x.x / 2.x.x / 3.x.x / 4.x.x (Themes 1–4)",
    themes: [
      { code: "1", name: "Theme 1 · Introduction to markets and market failure", paper: 1 },
      { code: "2", name: "Theme 2 · The UK economy: performance and policies", paper: 2 },
      { code: "3", name: "Theme 3 · Business behaviour and the labour market", paper: 1 },
      { code: "4", name: "Theme 4 · A global perspective", paper: 2 },
    ],
  },
  refinementStatus: "refined",
  forbiddenPhrases: EDEXCEL_A_FORBIDDEN_PHRASES,
  examples: {
    paper1: "Edexcel 9EC0/01 June 2024",
    paper2: "Edexcel 9EC0/02 June 2024",
    paper3: "Edexcel 9EC0/03 June 2024",
  },
};

export { getEdexcelASkillSplit } from "./mark-scheme";
