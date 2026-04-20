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

/**
 * Real AQA 7136/3 MCQ stems only carry a stimulus figure when the question
 * itself names one ("Figure 1 shows…", "The diagram shows…", "The table shows…").
 * Most MCQs are pure prose. We mirror that — no blanket figure rotation.
 */
const MCQ_EXPLICIT_STIMULUS_RE =
  /\b(figure\s*\d+|the (diagram|figure|graph|chart|table) (shows|above|below)|shown (in|on) the (diagram|figure|graph|chart|table)|refer to (the|figure))\b/i;

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
  /\b(with the (help|aid) of (?:an?\s+)?(?:fully\s+labelled\s+)?(?:appropriate\s+)?(?:[a-z\-]+\s+){0,4}diagram|using (?:an?\s+)?(?:fully\s+labelled\s+)?(?:[a-z\-]+\s+){0,4}diagram|draw (?:an?\s+)?(?:fully\s+labelled\s+)?(?:[a-z\-]+\s+){0,4}diagram|sketch (?:an?\s+)?(?:fully\s+labelled\s+)?(?:[a-z\-]+\s+){0,4}diagram|illustrate[^.\n]{0,80}diagram|on (?:your|an?\s+)?diagram|your diagram|tax incidence diagram|welfare loss triangle|negative externality diagram)\b/i;

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
const MONOP_COMP_HINTS = [/monopolistic competition|short.?run.*long.?run.*entry|differentiated product/i];
const MONOPOLY_HINTS = [/monopoly|monopolist|price discrimination/i];
const PERFECT_COMP_HINTS = [/perfect competition|competitive market.*long run/i];
const MONOPSONY_HINTS = [/monopsony/i];
const LABOUR_HINTS = [/labour market|wage|trade union|minimum wage|national living wage/i];
const PALM_OIL_HINTS = [/palm oil|deforestation.*palm|indonesia.*palm|malaysia.*palm/i];
const EXTERNALITY_HINTS = [
  /externalit|merit good|demerit good|msc|msb|social (cost|benefit)|negative externalit|positive externalit/i,
];
const SPECIFIC_AD_VAL_HINTS = [/specific tax.*ad valorem|ad valorem.*specific|specific (vs|versus) ad valorem/i];
const INDIRECT_TAX_HINTS = [/indirect tax|excise duty|sugar tax|sin tax|specific tax|ad valorem/i];
const SUBSIDY_HINTS = [/subsid/i];
const PRICE_CONTROL_HINTS = [/maximum price|minimum price|price ceiling|price floor|rent control/i];
const PED_REVENUE_HINTS = [/(price elasticity|ped).*(revenue|total revenue)|elasticity.*(revenue|tr)/i];
const LORENZ_HINTS = [/lorenz|gini coefficient|gini ratio/i];
const J_CURVE_HINTS = [/j.?curve|marshall.?lerner|current account.*depreciat/i];

function classifyDiagramType(stem: string): DiagramType {
  const s = stem.toLowerCase();
  if (J_CURVE_HINTS.some((re) => re.test(s))) return "jCurve";
  if (LORENZ_HINTS.some((re) => re.test(s))) return "lorenz";
  if (PHILLIPS_HINTS.some((re) => re.test(s))) return "phillips";
  if (PPF_HINTS.some((re) => re.test(s))) return "ppf";
  if (MONOP_COMP_HINTS.some((re) => re.test(s))) return "monopolisticComp";
  if (MONOPOLY_HINTS.some((re) => re.test(s))) return "monopoly";
  if (PERFECT_COMP_HINTS.some((re) => re.test(s))) return "perfectComp";
  if (MONOPSONY_HINTS.some((re) => re.test(s))) return "monopsony";
  if (LABOUR_HINTS.some((re) => re.test(s))) return "labour";
  if (PRICE_CONTROL_HINTS.some((re) => re.test(s))) return "priceControl";
  if (SPECIFIC_AD_VAL_HINTS.some((re) => re.test(s))) return "specificAdValorem";
  if (INDIRECT_TAX_HINTS.some((re) => re.test(s))) return "indirectTax";
  if (SUBSIDY_HINTS.some((re) => re.test(s))) return "subsidy";
  if (PALM_OIL_HINTS.some((re) => re.test(s))) return "negExtPalmOil";
  if (EXTERNALITY_HINTS.some((re) => re.test(s))) return "externality";
  if (PED_REVENUE_HINTS.some((re) => re.test(s))) return "pedRevenue";
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
    ...MONOP_COMP_HINTS,
    ...MONOPOLY_HINTS,
    ...PERFECT_COMP_HINTS,
    ...MONOPSONY_HINTS,
    ...LABOUR_HINTS,
    ...EXTERNALITY_HINTS,
    ...PALM_OIL_HINTS,
    ...INDIRECT_TAX_HINTS,
    ...SPECIFIC_AD_VAL_HINTS,
    ...SUBSIDY_HINTS,
    ...PRICE_CONTROL_HINTS,
    ...PED_REVENUE_HINTS,
    ...LORENZ_HINTS,
    ...J_CURVE_HINTS,
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
    case "jCurve":
      return defaultAdAsRubric(trimmed);
    case "supplyDemand":
    case "indirectTax":
    case "specificAdValorem":
    case "subsidy":
    case "priceControl":
    case "labour":
    case "externality":
    case "negExtPalmOil":
    case "monopoly":
    case "monopolisticComp":
    case "perfectComp":
    case "monopsony":
    case "ppf":
    case "pedRevenue":
    case "lorenz":
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
  /** Set letter A..G (used to rotate scenarios across the library). */
  setLabel?: string;
}

function attachReferenceFigure(
  base: AqaDiagramTag,
  q: TaggerInput,
): AqaDiagramTag {
  const pick = pickReferenceFigure({
    diagramType: base.diagramType,
    paperSetLabel: q.setLabel,
    questionNumber: q.number,
    hint: q.text,
  });
  if (!pick) {
    return { ...base, referenceFigureMissing: true };
  }
  return {
    ...base,
    referenceFigureId: pick.entry.id,
    referenceFigureScenario: pick.scenario,
  };
}

/**
 * Tagging policy for AQA reference figures.
 *
 * Reference figures are PRE-SUPPLIED, read-only diagrams that frame the
 * question (the student reasons FROM them). They must NEVER be attached to
 * essays where the student is expected to choose and draw their own diagram
 * — doing so leaks the answer.
 *
 * AQA convention used here:
 *  - Paper 1/2 Section A 9-mark "with the help of a diagram" → reference figure.
 *  - Paper 1/2 Section B 25-mark essays → student-drawn only, NO reference figure.
 *  - Paper 1/2 15-mark data-response → student-drawn only, NO reference figure.
 *  - Paper 3 case-study questions → reference figure only when stem explicitly
 *    says "Figure X" / "with the help of a diagram"; otherwise student-drawn only.
 */
export function tagAqaQuestion(q: TaggerInput): AqaDiagramTag | null {
  const stem = q.text;
  const diagramType = classifyDiagramType(stem);
  const explicit = EXPLICIT_DIAGRAM_RE.test(stem);
  const base = (optional: boolean): AqaDiagramTag => ({
    requiresDiagram: true,
    optional,
    diagramType,
    rubric: buildRubric(diagramType, stem),
  });
  // Student-drawn only: requires a canvas but never a pre-supplied figure.
  const studentDrawnOnly = (optional: boolean): AqaDiagramTag => ({
    ...base(optional),
    referenceFigureMissing: false,
  });

  // Paper 3 MCQs (Section A, Q1–30): mirror real AQA 7136/3 — most MCQs are
  // pure prose. A figure is only attached when (a) the stem explicitly names
  // one ("Figure 1 shows…", "the table shows…") AND (b) the classifier
  // resolved a concrete diagram family that we can supply a matching figure
  // for. Otherwise: no figure (irrelevant rotated diagrams are worse than none).
  if (q.isMcq) {
    if (q.paper !== 3) return null;
    const mcqBase: AqaDiagramTag = {
      requiresDiagram: false,
      optional: true,
      diagramType,
      rubric: buildRubric(diagramType, stem),
    };
    const stemReferencesFigure = MCQ_EXPLICIT_STIMULUS_RE.test(stem);
    if (!stemReferencesFigure) return mcqBase;
    // Stem cites a figure — try to pick one that matches the classified type.
    const pick = pickReferenceFigure({
      diagramType,
      paperSetLabel: q.setLabel,
      questionNumber: q.number,
      hint: stem,
    });
    if (!pick) return { ...mcqBase, referenceFigureMissing: true };
    return {
      ...mcqBase,
      referenceFigureId: pick.entry.id,
      referenceFigureScenario: pick.scenario,
    };
  }

  if (q.paper === 1 || q.paper === 2) {
    // Short explicit diagram questions (e.g. 4-mark "With the help of a fully labelled…")
    // Student-drawn only — pre-supplied reference figures would leak the answer.
    if (q.marks === 4 && explicit) return studentDrawnOnly(false);
    // Section A 9-mark — only when stem explicitly asks for a diagram.
    // Student-drawn only — the whole point is for the student to construct it.
    if (q.marks === 9 && explicit) return studentDrawnOnly(false);
    // Section A 15-mark data response — student-drawn, no pre-supplied figure.
    if (q.marks === 15) return studentDrawnOnly(true);
    // Section B 25-mark essays — student-drawn, no pre-supplied figure.
    // Diagram-friendly topics still get a canvas (optional), but NEVER a reference figure.
    if (q.marks === 25 || q.marks === 20) {
      const optional = !isDiagramFriendlyTopic(stem);
      return studentDrawnOnly(optional);
    }
  }

  if (q.paper === 3 && (q.marks === 10 || q.marks === 15 || q.marks === 25)) {
    // Paper 3 only gets a reference figure when the stem explicitly cites one
    // (e.g. "Figure 1 shows…", "with the help of a diagram"). Otherwise the
    // student draws their own — diagram-friendly topics make the canvas required.
    if (explicit) return attachReferenceFigure(base(false), q);
    const required = q.marks >= 15 && isDiagramFriendlyTopic(stem);
    return studentDrawnOnly(!required);
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
