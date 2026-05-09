/**
 * Pre-flight gates for AQA marking.
 *
 * For any question with `requiresDiagram: true`, the Tier 1 marker requires
 * BOTH:
 *   1. Diagram evidence · a drawn canvas data URL OR a textual description
 *      containing axis labels, named curves, shift indication, and a new
 *      equilibrium point.
 *   2. Written explanation · at least 30 words of coherent prose.
 *
 * If either is missing, `evaluateDiagramGate` returns `{ ok: false }` so the
 * UI can show a soft warning + confirm dialog. If the student bypasses, the
 * marker scores 0/N with the canonical message.
 */

export interface DiagramGateInput {
  answer: string;
  diagramImage?: string | null;
  isMacro?: boolean;
}

export interface DiagramGateResult {
  ok: boolean;
  hasDiagramEvidence: boolean;
  hasWrittenExplanation: boolean;
  wordCount: number;
  missing: string[];
  message: string;
}

const MICRO_AXIS_RE = /\b(price|p)\b.*\b(quantity|q|output)\b|\b(quantity|q|output)\b.*\b(price|p)\b/i;
const MACRO_AXIS_RE = /\b(price\s*level|pl)\b.*\b(real\s*output|real\s*gdp|y)\b|\b(real\s*output|real\s*gdp|y)\b.*\b(price\s*level|pl)\b/i;
const CURVE_RE = /\b(supply|demand|s\d?|d\d?|ad|as|sras|lras|mpc|msc|mpb|msb|mc|atc|ac|mr|ar)\b/gi;
const SHIFT_RE = /\b(shift(s|ed|ing)?|move(s|d)?|leftward|rightward|upward|downward|increase|decrease|inwards|outwards|→|->)\b/i;
const EQUILIBRIUM_RE = /\b(equilibrium|p[₁-₉12]|q[₁-₉12]|new\s+(price|equilibrium|point)|p\*|q\*)\b/i;

export function countWords(s: string): number {
  if (!s) return 0;
  return s.trim().split(/\s+/).filter((w) => w.length > 0).length;
}

export function evaluateDiagramGate(input: DiagramGateInput): DiagramGateResult {
  const text = input.answer || "";
  const wordCount = countWords(text);
  const hasImage = !!input.diagramImage && input.diagramImage.length > 100;

  const axisOk = input.isMacro ? MACRO_AXIS_RE.test(text) : MICRO_AXIS_RE.test(text);
  const curveMatches = text.match(CURVE_RE) || [];
  const distinctCurves = new Set(curveMatches.map((c) => c.toLowerCase())).size;
  const shiftOk = SHIFT_RE.test(text);
  const equilibriumOk = EQUILIBRIUM_RE.test(text);
  const describedDiagram = axisOk && distinctCurves >= 2 && shiftOk && equilibriumOk;

  const hasDiagramEvidence = hasImage || describedDiagram;
  const hasWrittenExplanation = wordCount >= 30;

  const missing: string[] = [];
  if (!hasDiagramEvidence) missing.push("a drawn diagram or a written description with axes, two curves, a shift, and a new equilibrium");
  if (!hasWrittenExplanation) missing.push(`a written explanation (≥30 words; you have ${wordCount})`);

  return {
    ok: hasDiagramEvidence && hasWrittenExplanation,
    hasDiagramEvidence,
    hasWrittenExplanation,
    wordCount,
    missing,
    message:
      missing.length === 0
        ? ""
        : `This question requires both a diagram and a written explanation. Please draw your diagram on the canvas or describe it in words, then explain the economic mechanism. Missing: ${missing.join("; ")}.`,
  };
}

export const DIAGRAM_GATE_FAIL_MESSAGE =
  "This question requires both a diagram and a written explanation. Please draw your diagram on the canvas or describe it in words, then explain the economic mechanism.";
