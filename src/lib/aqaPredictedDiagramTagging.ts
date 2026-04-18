/**
 * AQA A-Level Economics — runtime tagger for predicted-paper questions.
 *
 * Decides — from the parsed question stem alone — whether a question
 * requires (or optionally supports) a student-drawn diagram, what
 * template to preselect, and what AQA-style rubric the marker should
 * use for structural + AI checks.
 *
 * Trigger rules (mirrors AQA past-paper conventions):
 *   • Paper 1/2 9-mark Section A questions whose stem contains
 *     "with the help/aid of a diagram" or "using a diagram, explain"
 *     → REQUIRED.
 *   • Paper 1/2 25-mark Section A questions on diagram-friendly topics
 *     (elasticity, market failure, intervention, market structures,
 *     macro shocks) → REQUIRED.
 *   • Paper 1/2 15- and 25-mark Section B essays → OPTIONAL.
 *   • Paper 3 Section B 10/15/25-mark questions → REQUIRED when stem
 *     mentions diagram or maps to a diagram-friendly topic; otherwise
 *     OPTIONAL.
 *   • MCQs → never required.
 */

import {
  type AqaDiagramRubric,
  type DiagramType,
  defaultAdAsRubric,
  defaultSdRubric,
} from "./aqa-diagram-rubric";
import { pickReferenceFigure } from "./aqa-diagram-catalog";

export interface AqaDiagramTag {
  requiresDiagram: boolean;
  /** True when the diagram is supported but not strictly required. */
  optional: boolean;
  diagramType: DiagramType;
  rubric: AqaDiagramRubric;
  /** Catalog id of the read-only reference figure (if available). */
  referenceFigureId?: string;
  /** Per-question scenario override (e.g. "UK NHS Nursing — RCN"). */
  referenceFigureScenario?: string;
  /** True when no catalog entry covered this diagram type. */
  referenceFigureMissing?: boolean;
}

const EXPLICIT_DIAGRAM_RE =
  /\b(with the (help|aid) of (an? )?diagram|using (an? )?diagram|draw (an? )?diagram|sketch (an? )?diagram|illustrate.*diagram|on (an? )?diagram)\b/i;

const SUPPLY_DEMAND_HINTS = [
  /supply\s*(and|&)?\s*demand|s\s*&\s*d|s\/d/i,
  /tax|subsid|price (cap|ceiling|floor|control)|maximum price|minimum price/i,
  /shortage|surplus|equilibrium price|market for/i,
  /elasticit/i,
  /shift in (supply|demand)/i,
];

const AD_AS_HINTS = [
  /ad\/as|aggregate (demand|supply)|sras|lras|macroecon|inflation|recession|output gap/i,
  /interest rate|monetary policy|fiscal policy|exchange rate|government spending/i,
];

const PHILLIPS_HINTS = [/phillips curve|trade.?off between (inflation|unemployment)/i];
const PPF_HINTS = [/production possibility|ppf|opportunity cost frontier/i];
const MONOPOLY_HINTS = [/monopoly|monopolist|price discrimination/i];
const PERFECT_COMP_HINTS = [/perfect competition|competitive market.*long run/i];
const MONOPSONY_HINTS = [/monopsony/i];
const LABOUR_HINTS = [/labour market|wage|trade union|minimum wage|national living wage/i];
const EXTERNALITY_HINTS = [
  /externalit|merit good|demerit good|msc|msb|social (cost|benefit)|negative externalit|positive externalit/i,
];
const INDIRECT_TAX_HINTS = [/indirect tax|excise duty|sugar tax|sin tax|specific tax|ad valorem/i];
const SUBSIDY_HINTS = [/subsid/i];
const PRICE_CONTROL_HINTS = [/maximum price|minimum price|price ceiling|price floor|rent control/i];

function classifyDiagramType(stem: string): DiagramType {
  const s = stem.toLowerCase();
  if (PHILLIPS_HINTS.some((re) => re.test(s))) return "phillips";
  if (PPF_HINTS.some((re) => re.test(s))) return "ppf";
  if (MONOPOLY_HINTS.some((re) => re.test(s))) return "monopoly";
  if (PERFECT_COMP_HINTS.some((re) => re.test(s))) return "perfectComp";
  if (MONOPSONY_HINTS.some((re) => re.test(s))) return "monopsony";
  if (LABOUR_HINTS.some((re) => re.test(s))) return "labour";
  if (PRICE_CONTROL_HINTS.some((re) => re.test(s))) return "priceControl";
  if (INDIRECT_TAX_HINTS.some((re) => re.test(s))) return "indirectTax";
  if (SUBSIDY_HINTS.some((re) => re.test(s))) return "subsidy";
  if (EXTERNALITY_HINTS.some((re) => re.test(s))) return "externality";
  if (AD_AS_HINTS.some((re) => re.test(s))) return "adAs";
  if (SUPPLY_DEMAND_HINTS.some((re) => re.test(s))) return "supplyDemand";
  return "supplyDemand";
}

/**
 * Coarse "would a top-band answer benefit from a diagram?" check used
 * for 25-mark essays where the stem doesn't say "with a diagram" outright.
 */
function isDiagramFriendlyTopic(stem: string): boolean {
  return [
    ...SUPPLY_DEMAND_HINTS,
    ...AD_AS_HINTS,
    ...PHILLIPS_HINTS,
    ...MONOPOLY_HINTS,
    ...PERFECT_COMP_HINTS,
    ...MONOPSONY_HINTS,
    ...LABOUR_HINTS,
    ...EXTERNALITY_HINTS,
    ...INDIRECT_TAX_HINTS,
    ...SUBSIDY_HINTS,
    ...PRICE_CONTROL_HINTS,
  ].some((re) => re.test(stem));
}

/**
 * Build an AQA rubric scaffold for a given diagram type + stem.
 * Falls back to S&D / AD-AS defaults when there's no specific factory.
 */
export function buildRubric(diagramType: DiagramType, stem: string): AqaDiagramRubric {
  const trimmed = stem.length > 140 ? stem.slice(0, 137).trim() + "…" : stem.trim();
  switch (diagramType) {
    case "adAs":
    case "lras":
    case "phillips":
      return defaultAdAsRubric(trimmed);
    case "supplyDemand":
    case "indirectTax":
    case "subsidy":
    case "priceControl":
    case "labour":
    case "externality":
    case "monopoly":
    case "perfectComp":
    case "monopsony":
    case "ppf":
    case "other":
    default:
      return defaultSdRubric(trimmed);
  }
}

export interface TaggerInput {
  /** Question number string from the parser (e.g. "03", "31", "5"). */
  number: string;
  marks: number;
  /** Raw stem text (no answer options). */
  text: string;
  /** True when the parser found ≥ 2 MCQ options for this question. */
  isMcq: boolean;
  /** AQA paper number — 1, 2, or 3. */
  paper: 1 | 2 | 3;
}

export function tagAqaQuestion(q: TaggerInput): AqaDiagramTag | null {
  if (q.isMcq) return null; // MCQs never require student-drawn diagrams

  const stem = q.text;
  const diagramType = classifyDiagramType(stem);
  const explicit = EXPLICIT_DIAGRAM_RE.test(stem);

  // Paper 1 & 2
  if (q.paper === 1 || q.paper === 2) {
    if (q.marks === 9 && explicit) {
      return { requiresDiagram: true, optional: false, diagramType, rubric: buildRubric(diagramType, stem) };
    }
    if (q.marks === 25) {
      // Required when stem says so OR topic strongly benefits.
      if (explicit || isDiagramFriendlyTopic(stem)) {
        return { requiresDiagram: true, optional: false, diagramType, rubric: buildRubric(diagramType, stem) };
      }
    }
    if (q.marks === 15) {
      return { requiresDiagram: true, optional: true, diagramType, rubric: buildRubric(diagramType, stem) };
    }
    if (q.marks === 25 || q.marks === 20) {
      // Section B essays — optional.
      return { requiresDiagram: true, optional: true, diagramType, rubric: buildRubric(diagramType, stem) };
    }
  }

  // Paper 3
  if (q.paper === 3) {
    if (q.marks === 10 || q.marks === 15 || q.marks === 25) {
      const required = explicit || (q.marks >= 15 && isDiagramFriendlyTopic(stem));
      return {
        requiresDiagram: true,
        optional: !required,
        diagramType,
        rubric: buildRubric(diagramType, stem),
      };
    }
  }

  return null;
}

/**
 * Infer the paper number from the parsed question label/number.
 * Predicted papers are loaded one at a time, so the surrounding flow
 * already knows the paper number — pass it in directly. This helper is
 * a small fallback when only a number string is available.
 */
export function inferPaperFromContext(paperValue: string | undefined): 1 | 2 | 3 {
  if (paperValue?.includes("3")) return 3;
  if (paperValue?.includes("2")) return 2;
  return 1;
}
