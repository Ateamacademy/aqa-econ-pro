/**
 * Edexcel A A-Level Economics (9EC0) — verbatim question stem templates.
 *
 * Drawn from real 9EC0 past papers (June 2017–June 2024). The paper generator
 * picks from these and fills placeholders. It does NOT invent new phrasings.
 */
import type { PhraseLibrary } from "../board-definition";

export const EDEXCEL_A_PHRASES: PhraseLibrary = {
  // Section A short-data questions
  twoMarkCalc: [
    "With reference to Figure {X}, calculate {what}. You are advised to show your working.",
    "Using the data in Figure {X}, calculate the percentage {direction} in {variable} between {year1} and {year2}.",
    "Define the term '{term}'.",
  ],

  // 4-mark Section A explain pairs
  shortExplain: [
    "Which two of the following are most likely to cause {phenomenon}?",
    "Explain, with reference to Figure {X}, one likely reason for {observation}.",
    "Explain one cause of {phenomenon} indicated in Figure {X}.",
  ],

  // Diagram-explain (Section B 8-mark style)
  diagramExplain: [
    "With reference to Extract {X}, examine, using a diagram, the likely impact of {cause} on {market}.",
    "Using a diagram and your knowledge of economics, examine how {policy} may affect {outcome}.",
  ],

  // Section B (10/12/15) and Section C (25) extended evaluate
  extendedEvaluate: [
    "With reference to the data provided and your own knowledge of economics, assess {proposition}.",
    "Discuss the view that {proposition}.",
    "Evaluate {proposition}.",
    "Evaluate the likely impact of {policy_or_event} on {outcome}.",
  ],

  // Section A MCQ stems (single best answer)
  mcqStems: [
    "Which one of the following is most likely to {action}?",
    "Based on Figure {X}, which one of the following statements is correct?",
    "Which of the following best describes {concept}?",
  ],

  // Section C essay openers
  essayExplain: [
    "Examine the factors that determine {variable}.",
    "Examine the likely causes of {phenomenon} in {context}.",
  ],
  essayEvaluate: [
    "Evaluate the view that {proposition}.",
    "Assess the likely impact of {policy_or_event} on {outcome}.",
    "Discuss the extent to which {proposition}.",
    "Evaluate the effectiveness of {policy} in achieving {goal}.",
  ],
};
