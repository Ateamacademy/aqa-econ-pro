/**
 * AQA A-Level — diagram-tagging rules.
 *
 * Given a generated paper, set `requiresDiagram` / `diagramOptional` on every
 * question where AQA conventions expect (or strongly support) a student-drawn
 * diagram, and attach a default `AqaDiagramRubric`.
 *
 * Rules (per the spec):
 *  - Paper 1 / 2:
 *      * Q3 / Q7 (9-mark) "With the aid of a diagram…" → required
 *      * Q4 / Q8 (25-mark Section A) on diagram-friendly topics → required
 *      * Q5 / Q9 (15-mark essay) → optional
 *      * Q6 / Q10 (25-mark essay) → optional
 *  - Paper 3:
 *      * Q32 (15-mark) → required when topic is diagram-friendly
 *      * Q33 (25-mark) → optional (strongly supported)
 *      * Q31 (10-mark) → optional
 *      * MCQs never require student-drawn diagrams.
 */

import type { GeneratedPaper, AqaQuestion } from "./aqa-spec";
import {
  type AqaDiagramRubric,
  type DiagramType,
  defaultAdAsRubric,
  defaultSdRubric,
} from "./aqa-diagram-rubric";

/* ── Topic → diagram-type heuristics (lowercased keyword match on prompt). ── */

const DIAGRAM_HEURISTICS: Array<{ pattern: RegExp; type: DiagramType }> = [
  { pattern: /\b(ad\/as|aggregate demand|aggregate supply|sras|lras|inflation|recession|deflation|output gap|monetary|fiscal|exchange rate|deprecia|apprecia)\b/i, type: "adAs" },
  { pattern: /\b(phillips)\b/i, type: "phillips" },
  { pattern: /\b(ppf|production possibility|opportunity cost frontier)\b/i, type: "ppf" },
  { pattern: /\b(monopol(y|ist)|natural monopoly|abnormal profit|supernormal)\b/i, type: "monopoly" },
  { pattern: /\b(perfect competit|long.?run equilibrium|short.?run firm)\b/i, type: "perfectComp" },
  { pattern: /\b(monopsony|single buyer)\b/i, type: "monopsony" },
  { pattern: /\b(labour market|wage|trade union|minimum wage|national living wage)\b/i, type: "labour" },
  { pattern: /\b(externalit(y|ies)|merit good|demerit good|market failure|pollution|sugar tax|alcohol|tobacco)\b/i, type: "externality" },
  { pattern: /\b(indirect tax|specific tax|ad valorem|sin tax|levy)\b/i, type: "indirectTax" },
  { pattern: /\b(subsid(y|ies))\b/i, type: "subsidy" },
  { pattern: /\b(price ceiling|price floor|max(imum)? price|min(imum)? price|rent control)\b/i, type: "priceControl" },
];

const SD_FALLBACK: DiagramType = "supplyDemand";

function detectDiagramType(prompt: string): DiagramType {
  for (const { pattern, type } of DIAGRAM_HEURISTICS) {
    if (pattern.test(prompt)) return type;
  }
  return SD_FALLBACK;
}

/** Build a rubric matching the detected diagram type. Extends the two
 *  base factories with a richer L4 component when appropriate. */
function buildRubric(type: DiagramType, prompt: string): AqaDiagramRubric {
  const scenario = prompt.split(/\.\s/)[0].slice(0, 120);

  // Macro family → AD/AS rubric.
  if (type === "adAs" || type === "lras" || type === "phillips") {
    return defaultAdAsRubric(scenario || "the macro shock described");
  }

  // Indirect tax — supply-and-demand with a tax-wedge L4 component.
  if (type === "indirectTax" || type === "subsidy" || type === "externality") {
    const base = defaultSdRubric(scenario || "the intervention described");
    return {
      ...base,
      acceptableAlternatives: [
        ...base.acceptableAlternatives,
        type === "indirectTax"
          ? "Diagram showing the tax as a parallel upward shift of S (S → S+tax) rather than a generic leftward shift."
          : type === "subsidy"
          ? "Diagram showing the subsidy as a parallel downward shift of S (S → S−subsidy)."
          : "Diagram showing the welfare-loss triangle from the externality.",
      ],
      components: [
        ...base.components,
        {
          id: "wedgeOrWelfare",
          description:
            type === "indirectTax"
              ? "Tax wedge shown between consumer price and producer price (L4 discriminator)."
              : type === "subsidy"
              ? "Subsidy gap shown between consumer price and producer price (L4 discriminator)."
              : "Welfare-loss triangle clearly shaded between MSB/MSC and MPB/MPC (L4 discriminator).",
          levelCategory: "L4",
          checkable: "structural",
          requiredLabels: type === "externality" ? ["MSB", "MSC"] : ["P consumer", "P producer"],
        },
      ],
    };
  }

  // Default: supply-and-demand.
  return defaultSdRubric(scenario || "the market described");
}

/* ──────────────────────────────────────────────────────────────────────────
   Question-level tagging
────────────────────────────────────────────────────────────────────────── */

function tagsForQuestion(
  q: AqaQuestion,
  paperNumber: 1 | 2 | 3,
): { requiresDiagram: boolean; diagramOptional: boolean } {
  // MCQs never require a student-drawn diagram.
  if (q.mcqOptions) return { requiresDiagram: false, diagramOptional: false };

  // Explicit "with the aid of a diagram" stem ⇒ always required.
  if (/with (the aid of|the help of) (an? )?(appropriate )?diagram/i.test(q.prompt)) {
    return { requiresDiagram: true, diagramOptional: false };
  }

  if (paperNumber === 1 || paperNumber === 2) {
    // Q3 / Q7 — 9-mark Section A analyse-with-diagram.
    if (q.section === "A" && q.marks === 9) return { requiresDiagram: true, diagramOptional: false };
    // Q4 / Q8 — 25-mark Section A: required only if topic is diagram-friendly.
    if (q.section === "A" && q.marks === 25) {
      return {
        requiresDiagram: detectDiagramType(q.prompt) !== SD_FALLBACK || /market|tax|subsid|price|supply|demand/i.test(q.prompt),
        diagramOptional: false,
      };
    }
    // Section B essays: optional.
    if (q.section === "B" && (q.marks === 15 || q.marks === 25)) {
      return { requiresDiagram: false, diagramOptional: true };
    }
  }

  if (paperNumber === 3) {
    // Q32 (15) — required when diagram-friendly; Q33 (25) — optional; Q31 (10) — optional.
    if (q.marks === 15) {
      return { requiresDiagram: detectDiagramType(q.prompt) !== SD_FALLBACK, diagramOptional: false };
    }
    if (q.marks === 25 || q.marks === 10) {
      return { requiresDiagram: false, diagramOptional: true };
    }
  }

  return { requiresDiagram: false, diagramOptional: false };
}

/** Mutates and returns a paper, attaching diagram metadata to applicable questions. */
export function tagPaperWithDiagrams(paper: GeneratedPaper): GeneratedPaper {
  const tagged = paper.questions.map((q) => {
    const { requiresDiagram, diagramOptional } = tagsForQuestion(q, paper.paperNumber);
    if (!requiresDiagram && !diagramOptional) return q;
    const diagramType = detectDiagramType(q.prompt);
    const diagramRubric = requiresDiagram || diagramOptional ? buildRubric(diagramType, q.prompt) : undefined;
    return { ...q, requiresDiagram, diagramOptional, diagramType, diagramRubric };
  });
  return { ...paper, questions: tagged };
}

/** Convenience: tag a list of papers (idempotent). */
export function tagPapersWithDiagrams(papers: GeneratedPaper[]): GeneratedPaper[] {
  return papers.map(tagPaperWithDiagrams);
}
