/**
 * AQA A-Level Economics · diagram rubric model + structural checker.
 *
 * Generated at paper-generation time per diagram-required question.
 * The structural checker auto-validates label presence + curve orientation
 * against the canvas's structured element data; contextual checks are
 * surfaced as self-confirmation prompts.
 */

import type { KaaeSkill } from "./aqa-levels";

export type DiagramType =
  | "adAs"
  | "lras"
  | "phillips"
  | "supplyDemand"
  | "ppf"
  | "monopoly"
  | "monopolisticComp"
  | "perfectComp"
  | "monopsony"
  | "labour"
  | "externality"
  | "negExtPalmOil"
  | "indirectTax"
  | "specificAdValorem"
  | "subsidy"
  | "priceControl"
  | "pedRevenue"
  | "lorenz"
  | "jCurve"
  | "other";

/** A single checkable component in a diagram rubric. */
export interface AqaDiagramComponent {
  id: string;
  description: string;
  /** Which level this component contributes to. */
  levelCategory: "L1" | "L2" | "L3" | "L4";
  /** Optional: required label strings the canvas must contain (case-insensitive). */
  requiredLabels?: string[];
  /** structural · can be auto-checked from canvas elements; contextual · needs student confirmation. */
  checkable: "structural" | "contextual";
  /** Optional KAA+E skill this component primarily supports. */
  skill?: KaaeSkill;
}

export interface AqaDiagramRubric {
  diagramType: DiagramType;
  /** Headline expected diagram (verbatim style of AQA mark schemes). */
  primaryExpected: string;
  /** Acceptable alternatives (also verbatim style). */
  acceptableAlternatives: string[];
  /** Required label strings across the whole diagram. */
  requiredLabels: string[];
  components: AqaDiagramComponent[];
}

/* ──────────────────────────────────────────────────────────────────────────
   Canvas element shape · kept minimal so the checker doesn't depend on the
   drawing tool's internal types. Anything with a `text` (label) or `points`
   (line) field can be inspected.
────────────────────────────────────────────────────────────────────────── */

export interface CanvasLabelEl {
  type: "text";
  text: string;
}

export interface CanvasLineEl {
  type: "line";
  /** [[x1,y1],[x2,y2], …] in any consistent coordinate space. */
  points: [number, number][];
  label?: string;
}

export type CanvasElement = CanvasLabelEl | CanvasLineEl | { type: string; [k: string]: unknown };

/* ──────────────────────────────────────────────────────────────────────────
   Macro-diagram axis-label check (Price level vs Price).
   AQA examiner reports repeatedly note this as a Level 1 loss on
   AD/AS, LRAS, Phillips curve diagrams.
────────────────────────────────────────────────────────────────────────── */

const MACRO_DIAGRAM_TYPES: DiagramType[] = ["adAs", "lras", "phillips"];

const PRICE_LEVEL_PATTERNS = [/price\s*level/i, /general\s*price\s*level/i];
const BARE_PRICE_PATTERNS = [/^price$/i, /^p$/i];

export interface PriceLevelCheckResult {
  applies: boolean;
  passed: boolean;
  message: string;
}

export function priceLevelAxisCheck(
  diagramType: DiagramType,
  elements: CanvasElement[],
): PriceLevelCheckResult {
  if (!MACRO_DIAGRAM_TYPES.includes(diagramType)) {
    return { applies: false, passed: true, message: "Not a macro diagram." };
  }
  const labels = elements
    .filter((e): e is CanvasLabelEl => e.type === "text")
    .map((e) => (e.text || "").trim());

  const hasPriceLevel = labels.some((l) => PRICE_LEVEL_PATTERNS.some((re) => re.test(l)));
  if (hasPriceLevel) {
    return {
      applies: true,
      passed: true,
      message: "Vertical axis labelled 'Price level' · Level 1 macro convention met.",
    };
  }
  const hasBarePrice = labels.some((l) => BARE_PRICE_PATTERNS.some((re) => re.test(l)));
  if (hasBarePrice) {
    return {
      applies: true,
      passed: false,
      message:
        "Macro diagrams require 'Price level' (or 'General price level') on the vertical axis. 'Price' alone is the most common Level 1 mark loss flagged in AQA examiner reports.",
    };
  }
  return {
    applies: true,
    passed: false,
    message:
      "No vertical-axis label detected. Macro diagrams need 'Price level' on the y-axis.",
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   Structural component checker.
────────────────────────────────────────────────────────────────────────── */

export interface ComponentCheckResult {
  componentId: string;
  description: string;
  levelCategory: "L1" | "L2" | "L3" | "L4";
  checkable: "structural" | "contextual";
  /** "auto" · checked here. "self" · needs student confirmation. */
  source: "auto" | "self";
  /** undefined when source === "self" and not yet confirmed. */
  passed?: boolean;
  /** Detail message displayed in the marking UI. */
  detail: string;
}

function labelsContain(elements: CanvasElement[], required: string[]): {
  matched: string[];
  missing: string[];
} {
  const labels = elements
    .filter((e): e is CanvasLabelEl => e.type === "text")
    .map((e) => (e.text || "").toLowerCase());
  const matched: string[] = [];
  const missing: string[] = [];
  for (const r of required) {
    const needle = r.toLowerCase();
    if (labels.some((l) => l.includes(needle))) matched.push(r);
    else missing.push(r);
  }
  return { matched, missing };
}

export function checkDiagramRubric(
  rubric: AqaDiagramRubric,
  elements: CanvasElement[],
): {
  componentResults: ComponentCheckResult[];
  priceLevel: PriceLevelCheckResult;
  /** Highest L the student can currently attain from auto-checks alone. */
  estimatedLevel: 1 | 2 | 3 | 4;
} {
  const componentResults: ComponentCheckResult[] = rubric.components.map((c) => {
    if (c.checkable === "contextual") {
      return {
        componentId: c.id,
        description: c.description,
        levelCategory: c.levelCategory,
        checkable: c.checkable,
        source: "self",
        detail: "Self-confirm in the panel below.",
      };
    }
    if (c.requiredLabels && c.requiredLabels.length > 0) {
      const { matched, missing } = labelsContain(elements, c.requiredLabels);
      const passed = missing.length === 0;
      return {
        componentId: c.id,
        description: c.description,
        levelCategory: c.levelCategory,
        checkable: c.checkable,
        source: "auto",
        passed,
        detail: passed
          ? `All required labels present (${matched.join(", ")}).`
          : `Missing label${missing.length === 1 ? "" : "s"}: ${missing.join(", ")}.`,
      };
    }
    // No specific labels · treat as a "must have at least one labelled element" check.
    const someLabel = elements.some((e) => e.type === "text" && (e as CanvasLabelEl).text);
    return {
      componentId: c.id,
      description: c.description,
      levelCategory: c.levelCategory,
      checkable: c.checkable,
      source: "auto",
      passed: someLabel,
      detail: someLabel ? "Element detected." : "No matching element detected on canvas.",
    };
  });

  const priceLevel = priceLevelAxisCheck(rubric.diagramType, elements);

  // Estimated level = highest L where ALL auto components below or equal pass.
  const order: Array<"L1" | "L2" | "L3" | "L4"> = ["L1", "L2", "L3", "L4"];
  let highest: 1 | 2 | 3 | 4 = 1;
  for (let i = 0; i < order.length; i++) {
    const lvl = order[i];
    const atLevel = componentResults.filter(
      (r) => r.source === "auto" && r.levelCategory === lvl,
    );
    if (atLevel.length === 0) continue;
    const allPass = atLevel.every((r) => r.passed);
    if (allPass) highest = (i + 1) as 1 | 2 | 3 | 4;
    else break;
  }
  // If macro and price-level check failed, cap at L1.
  if (priceLevel.applies && !priceLevel.passed) highest = 1;

  return { componentResults, priceLevel, estimatedLevel: highest };
}

/* ──────────────────────────────────────────────────────────────────────────
   Sample rubric factory · used by paper-generation code to attach a rubric
   to a diagram-required question. Specific questions can override.
────────────────────────────────────────────────────────────────────────── */

export function defaultAdAsRubric(scenario: string): AqaDiagramRubric {
  return {
    diagramType: "adAs",
    primaryExpected: `AD/AS diagram showing ${scenario}.`,
    acceptableAlternatives: [
      "Cost-push diagram with SRAS shifting left only",
      "Combined AD shift + SRAS shift if consistent with reasoning",
    ],
    requiredLabels: ["Price level", "Real output", "AD", "SRAS"],
    components: [
      {
        id: "axes",
        description:
          "Vertical axis labelled 'Price level' (NOT 'Price'); horizontal axis labelled 'Real output' or 'Real GDP'.",
        levelCategory: "L1",
        requiredLabels: ["Price level", "Real output"],
        checkable: "structural",
        skill: "K",
      },
      {
        id: "curves",
        description:
          "AD curve downward-sloping, SRAS upward-sloping, LRAS vertical (if shown).",
        levelCategory: "L1",
        requiredLabels: ["AD", "SRAS"],
        checkable: "structural",
        skill: "K",
      },
      {
        id: "shift",
        description: "Correct curve shifted in the correct direction for the scenario.",
        levelCategory: "L2",
        checkable: "contextual",
        skill: "App",
      },
      {
        id: "priceChange",
        description: "New equilibrium price level labelled higher/lower than original (P2 vs P1).",
        levelCategory: "L3",
        requiredLabels: ["P1", "P2"],
        checkable: "structural",
        skill: "An",
      },
    ],
  };
}

export function defaultSdRubric(scenario: string): AqaDiagramRubric {
  return {
    diagramType: "supplyDemand",
    primaryExpected: `Supply and demand diagram showing ${scenario}.`,
    acceptableAlternatives: [],
    requiredLabels: ["Price", "Quantity", "S", "D"],
    components: [
      {
        id: "axes",
        description: "Vertical axis labelled 'Price'; horizontal axis labelled 'Quantity'.",
        levelCategory: "L1",
        requiredLabels: ["Price", "Quantity"],
        checkable: "structural",
        skill: "K",
      },
      {
        id: "curves",
        description: "Demand curve downward-sloping; supply curve upward-sloping.",
        levelCategory: "L1",
        requiredLabels: ["S", "D"],
        checkable: "structural",
        skill: "K",
      },
      {
        id: "shift",
        description: "Correct curve shifted in the correct direction.",
        levelCategory: "L2",
        checkable: "contextual",
        skill: "App",
      },
      {
        id: "newEquilibrium",
        description: "New equilibrium price and quantity clearly labelled (P2, Q2).",
        levelCategory: "L3",
        requiredLabels: ["P2", "Q2"],
        checkable: "structural",
        skill: "An",
      },
    ],
  };
}
