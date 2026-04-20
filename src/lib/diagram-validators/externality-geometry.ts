/**
 * Geometric validator for negative-externality diagrams.
 *
 * Catches the broken-template class of error where MSC and MPC intersect or
 * have wildly different slopes. Run on every diagram template at edit time
 * and surface failures at /admin/diagram-catalog-health.
 */

export interface ExternalityValidationResult {
  valid: boolean;
  errors: string[];
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const LINE_RE = /<line\s+([^>]*?)\/?\s*>/gi;
const ATTR_RE = (name: string) => new RegExp(`${name}\\s*=\\s*"([^"]+)"`, "i");
const TEXT_RE = /<text[^>]*>([^<]+)<\/text>/gi;

function attrNum(attrs: string, name: string): number | null {
  const m = attrs.match(ATTR_RE(name));
  if (!m) return null;
  const v = parseFloat(m[1]);
  return Number.isFinite(v) ? v : null;
}

/**
 * Find the line whose stroke colour matches the given hex AND whose label
 * (the closest <text> with the same fill) equals `label`. Heuristic but
 * sufficient for our deterministic templates.
 */
function findLineByLabel(svg: string, label: string, hex: string): Line | null {
  // Build a map of label → fill colour from <text> elements.
  const labelHexRe = new RegExp(
    `<text[^>]*?fill\\s*=\\s*"${hex}"[^>]*>\\s*${label}\\s*<\\/text>`,
    "i",
  );
  if (!labelHexRe.test(svg)) return null;

  // Find the first <line> with a matching stroke.
  const strokeRe = new RegExp(`<line\\s+([^>]*?stroke\\s*=\\s*"${hex}"[^>]*?)\\/?\\s*>`, "i");
  const m = svg.match(strokeRe);
  if (!m) return null;
  const attrs = m[1];
  const x1 = attrNum(attrs, "x1");
  const y1 = attrNum(attrs, "y1");
  const x2 = attrNum(attrs, "x2");
  const y2 = attrNum(attrs, "y2");
  if (x1 == null || y1 == null || x2 == null || y2 == null) return null;
  return { x1, y1, x2, y2 };
}

function slope(l: Line): number {
  if (l.x2 === l.x1) return Number.POSITIVE_INFINITY;
  return (l.y2 - l.y1) / (l.x2 - l.x1);
}

export function validateNegativeProductionExternality(svg: string): ExternalityValidationResult {
  const errors: string[] = [];
  const mpc = findLineByLabel(svg, "MPC", "#ef4444");
  const msc = findLineByLabel(svg, "MSC", "#3b82f6");

  if (!mpc) errors.push("MPC line (red, #ef4444) not found in SVG");
  if (!msc) errors.push("MSC line (blue, #3b82f6) not found in SVG");

  if (mpc && msc) {
    // SVG y-axis grows downward → "above" means smaller y.
    if (msc.y1 >= mpc.y1 || msc.y2 >= mpc.y2) {
      errors.push("MSC must sit ABOVE MPC at both endpoints — curves intersect or MSC is below MPC");
    }
    const dSlope = Math.abs(slope(mpc) - slope(msc));
    if (dSlope > 0.05) {
      errors.push(`MSC must be parallel to MPC (slope diff ${dSlope.toFixed(3)} > 0.05)`);
    }
  }

  // Check MSB = MPB single line presence.
  if (!findLineByLabel(svg, "MPB = MSB", "#10b981")) {
    errors.push("MSB = MPB line (green, #10b981) not found — production externality requires a single demand curve");
  }

  return { valid: errors.length === 0, errors };
}

/** Entry point used by /admin/diagram-catalog-health. */
export function validateExternalityDiagram(
  svg: string,
  diagramType: string,
): ExternalityValidationResult {
  if (diagramType === "externalities-negative-production") {
    return validateNegativeProductionExternality(svg);
  }
  return { valid: true, errors: [] };
}
