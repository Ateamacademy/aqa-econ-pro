import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { renderPaperMarkdown } from "./generatePaperPdf";
import { getCatalogEntry, AQA_DIAGRAM_CATALOG, pickReferenceFigure } from "./aqa-diagram-catalog";
import type { DiagramType } from "./aqa-diagram-rubric";
import { getEdexcelASkillSplit } from "./boards/edexcel-a-a-level";

// Detect Edexcel A so we can render an authentic Pearson 9EC0 mark scheme
// (per-skill K/Ap/An/Ev grid + indicative content, no AQA "levels" table).
function isEdexcelA(meta: { examBoard?: string; level?: string } | undefined): boolean {
  const b = (meta?.examBoard || "").toLowerCase();
  const l = (meta?.level || "").toLowerCase();
  if (!b) return false;
  if (b.includes("aqa")) return false;
  // Match "Edexcel A", "edexcel-a", "Edexcel (A)" but NOT "Edexcel B".
  const isEdexcel = b.includes("edexcel");
  const isB = /\bedexcel[\s\-(]*b\b/i.test(b);
  if (!isEdexcel || isB) return false;
  // Only A-Level (not AS) gets the 9EC0 treatment.
  return l.includes("a-level") || l.includes("alevel") || l === "a level" || !l;
}

// ─── Diagram embedding ────────────────────────────────────────────────
//
// Resolve a diagram reference (catalog id, legacy AI keyword, or scenario hint)
// to an SVG path under /public, fetch it, rasterise to PNG, and return a
// base64 data URL embeddable via jsPDF.addImage. All work happens before the
// PDF is generated so jsPDF stays sync.

const LEGACY_DIAGRAM_ID_MAP: Record<string, string> = {
  tax_incidence: "indirect-tax",
  indirect_tax: "indirect-tax",
  sugar_tax: "indirect-tax",
  sdil: "indirect-tax",
  negative_externality: "negative-externality",
  negative_externality_coal: "negative-externality",
  negative_production_externality: "negative-externality-welfare",
  positive_externality: "positive-externality-welfare",
  externality: "negative-externality",
  welfare_loss: "negative-externality-welfare",
  demand_decrease: "supply-demand-housing",
  demand_shift: "supply-demand-housing",
  supply_shift: "supply-demand-cost-shock",
  cost_shock: "supply-demand-cost-shock",
  supply_demand: "supply-demand-cost-shock",
  monopoly: "monopoly-supernormal-profit",
  monopoly_profit: "monopoly-supernormal-profit",
  natural_monopoly: "natural-monopoly",
  kinked_demand: "kinked-demand",
  oligopoly: "kinked-demand",
  ad_as: "ad-as-equilibrium",
  ad_as_demand_pull: "ad-as-demand-pull",
  ad_as_cost_push: "ad-as-cost-push",
  cost_push: "ad-as-cost-push",
  cost_push_inflation: "ad-as-cost-push",
  demand_pull: "ad-as-demand-pull",
  fiscal_policy_ad: "ad-as-fiscal",
  phillips: "phillips-srlr",
  phillips_curve: "phillips-srlr",
  labour_market: "labour-market-union",
  monopsony: "labour-monopsony",
  lorenz: "lorenz-curve",
  lorenz_curve: "lorenz-curve",
  gini: "lorenz-curve",
  quota: "import-quota",
  import_quota: "import-quota",
};

function resolveDiagramReference(raw: string): string | null {
  if (!raw) return null;
  const cleaned = raw.toLowerCase().trim().replace(/[\s-]+/g, "_").replace(/[^a-z0-9_]/g, "");
  // Direct catalog id match (canonical hyphenated form)
  const hyphen = cleaned.replace(/_/g, "-");
  if (getCatalogEntry(hyphen)) return hyphen;
  // Legacy id map
  if (LEGACY_DIAGRAM_ID_MAP[cleaned]) return LEGACY_DIAGRAM_ID_MAP[cleaned];
  // Substring match against catalog
  for (const entry of AQA_DIAGRAM_CATALOG) {
    if (cleaned.includes(entry.id.replace(/-/g, "_"))) return entry.id;
  }
  return null;
}

/** Detect diagram references inside mark-scheme / model-answer markdown. */
function extractDiagramIds(text: string): string[] {
  if (!text) return [];
  const ids = new Set<string>();
  // "Diagram: foo_bar" / "Diagram - foo bar" / "Required diagram: foo"
  const reA = /(?:^|\n)\s*(?:required\s+)?diagram\s*[:\-–]\s*([a-z0-9_\- ]{3,60})/gi;
  let m: RegExpExecArray | null;
  while ((m = reA.exec(text))) {
    const resolved = resolveDiagramReference(m[1]);
    if (resolved) ids.add(resolved);
  }
  // "**Figure N:** Title — Diagram family: foo"
  const reB = /diagram\s+family\s*[:\-–]\s*([a-z0-9_\- ]{3,60})/gi;
  while ((m = reB.exec(text))) {
    const resolved = resolveDiagramReference(m[1]);
    if (resolved) ids.add(resolved);
  }
  return Array.from(ids);
}

/** Strip noisy diagram placeholder lines so they don't render as raw text. */
function stripDiagramPlaceholders(text: string): string {
  if (!text) return text;
  return text
    .replace(/(?:^|\n)\s*(?:required\s+)?diagram\s*[:\-–]\s*[a-z0-9_\- ]{3,60}\s*(?=\n|$)/gi, "\n")
    .replace(/diagram\s+family\s*[:\-–]\s*[a-z0-9_\- ]{3,60}/gi, "")
    .replace(/\n{3,}/g, "\n\n");
}

/** Load any image (svg/png/jpg) into an HTMLImageElement. */
async function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => resolve(i);
    i.onerror = (e) => reject(e);
    i.src = url;
  });
}

function imageToPngDataUrl(img: HTMLImageElement, targetWidth = 900): string | null {
  const ratio = img.height / img.width || 0.7;
  const w = targetWidth;
  const h = Math.round(w * ratio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/png");
}

async function rasteriseAssetToPng(assetPath: string, targetWidth = 900): Promise<string | null> {
  try {
    const lower = assetPath.toLowerCase();
    const isSvg = lower.endsWith(".svg") || lower.includes(".svg?");
    if (isSvg) {
      const res = await fetch(assetPath);
      if (!res.ok) return null;
      let svgText = await res.text();
      if (!/background/i.test(svgText)) {
        svgText = svgText.replace(/<svg(\s)/i, '<svg style="background:#ffffff"$1');
      }
      const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      try {
        const img = await loadImageFromUrl(url);
        return imageToPngDataUrl(img, targetWidth);
      } finally {
        URL.revokeObjectURL(url);
      }
    }
    // Raster (png/jpg/webp): load directly.
    const img = await loadImageFromUrl(assetPath);
    return imageToPngDataUrl(img, targetWidth);
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[generateSolutionPdf] asset rasterise failed", assetPath, err);
    return null;
  }
}

/** Render a React diagram component off-screen, serialise its <svg>, rasterise to PNG. */
async function rasteriseReactDiagramToPng(
  Component: React.ComponentType,
  targetWidth = 900,
): Promise<string | null> {
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-99999px";
  host.style.top = "0";
  host.style.width = "900px";
  host.style.background = "#ffffff";
  host.style.pointerEvents = "none";
  document.body.appendChild(host);
  const root = createRoot(host);
  try {
    flushSync(() => {
      root.render(createElement(Component));
    });
    // Give layout a tick (fonts, etc.)
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    const svg = host.querySelector("svg");
    if (!svg) return null;
    // Ensure xmlns
    if (!svg.getAttribute("xmlns")) svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const serialiser = new XMLSerializer();
    let svgText = serialiser.serializeToString(svg);
    if (!/background/i.test(svgText)) {
      svgText = svgText.replace(/<svg(\s)/i, '<svg style="background:#ffffff"$1');
    }
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    try {
      const img = await loadImageFromUrl(url);
      return imageToPngDataUrl(img, targetWidth);
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[generateSolutionPdf] react diagram rasterise failed", err);
    return null;
  } finally {
    try { root.unmount(); } catch {}
    try { document.body.removeChild(host); } catch {}
  }
}

interface ResolvedDiagram {
  catalogId: string;
  title: string;
  pngDataUrl: string;
  widthPx: number;
  heightPx: number;
}

const SUBSCRIPT_DIGITS: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
};

const DIAGRAM_LABEL_TOKEN_RE = /\b(?:Pnet|Pp|Pe|Po|Qo|Qe|Q\*|P\*|DWL|MPC|MSC|MPB|MSB|SRAS\d?|LRAS|AD\d?|AR|MR|MC|AC|S\d?|D\d?|P\d?|Q\d?)\b/g;

export function repairSolutionSpacing(text: string): string {
  if (!text) return text;
  const tokens = text.replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, " ").split(/\s+/);
  const out: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i].length <= 2 && /^[\p{L}\p{N}\p{P}]+$/u.test(tokens[i])) {
      let j = i;
      while (j < tokens.length && tokens[j].length <= 2 && /^[\p{L}\p{N}\p{P}]+$/u.test(tokens[j])) j++;
      if (j - i >= 3) {
        out.push(tokens.slice(i, j).join(""));
        i = j;
        continue;
      }
    }
    out.push(tokens[i]);
    i += 1;
  }
  return out.join(" ").replace(/[ \t]{2,}/g, " ").trim();
}

function stripDiagramDescriptionBlock(text: string): string {
  return text
    .replace(/(?:^|\n)Diagram Description:\s*(?:\n(?:[*-]\s.*|[A-Za-z][^\n]*))*?/gi, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normaliseLabelToken(token: string): string {
  return token
    .replace(/[₀-₉]/g, (digit) => SUBSCRIPT_DIGITS[digit] ?? digit)
    .replace(/\s+/g, "")
    .toUpperCase();
}

export function extractReferencedDiagramLabels(text: string): string[] {
  return Array.from(new Set((text.match(DIAGRAM_LABEL_TOKEN_RE) ?? []).map(normaliseLabelToken)));
}

export function stripSolutionDiagramFallback(text: string): string {
  return stripDiagramPlaceholders(stripDiagramDescriptionBlock(text));
}

async function resolveEntryDiagrams(entry: SolutionEntry): Promise<ResolvedDiagram[]> {
  const ids = new Set<string>();
  if (entry.referenceFigureId) {
    const resolved = resolveDiagramReference(entry.referenceFigureId);
    if (resolved) ids.add(resolved);
  }
  for (const id of extractDiagramIds(entry.markScheme)) ids.add(id);
  for (const id of extractDiagramIds(entry.modelAnswer)) ids.add(id);
  for (const id of extractDiagramIds(entry.questionText)) ids.add(id);
  if (import.meta.env.DEV) {
    console.info("[solution-pipeline] resolve:start", {
      label: entry.label,
      requiresDiagram: !!entry.requiresDiagram,
      referenceFigureId: entry.referenceFigureId ?? null,
      diagramType: entry.diagramType ?? null,
      referenceFigureScenario: entry.referenceFigureScenario ?? null,
      extractedIds: Array.from(ids),
    });
  }
  if (ids.size === 0 && entry.requiresDiagram && entry.diagramType) {
    const picked = pickReferenceFigure({
      diagramType: entry.diagramType,
      questionNumber: entry.label,
      hint: [entry.questionText, entry.markScheme, entry.modelAnswer, entry.referenceFigureScenario].filter(Boolean).join("\n"),
    });
    if (import.meta.env.DEV) {
      console.info("[solution-pipeline] resolve:pickReferenceFigure", {
        label: entry.label,
        diagramType: entry.diagramType,
        picked: picked?.entry.id ?? null,
        scenario: picked?.scenario ?? null,
      });
    }
    if (picked) ids.add(picked.entry.id);
  }
  if (entry.requiresDiagram && ids.size === 0) {
    throw new Error(`${entry.label}: required diagram could not be resolved from the catalog.`);
  }

  const out: ResolvedDiagram[] = [];
  for (const id of ids) {
    const cat = getCatalogEntry(id);
    if (import.meta.env.DEV) {
      console.info("[solution-pipeline] resolve:catalog", {
        label: entry.label,
        requestedId: id,
        matchedCatalogId: cat?.id ?? null,
      });
    }
    if (!cat) continue;
    // Prefer the high-fidelity React component when present (matches on-screen),
    // fall back to the catalog asset path (.svg / .png).
    let png: string | null = null;
    if (cat.Component) {
      png = await rasteriseReactDiagramToPng(cat.Component, 900);
    }
    if (!png) {
      png = await rasteriseAssetToPng(cat.svgPath, 900);
    }
    if (!png) continue;
    // Read image dims from a temp <img> for aspect ratio
    const dims = await new Promise<{ w: number; h: number }>((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.width, h: img.height });
      img.onerror = () => resolve({ w: 900, h: 600 });
      img.src = png!;
    });
    out.push({
      catalogId: id,
      title: cat.title,
      pngDataUrl: png,
      widthPx: dims.w,
      heightPx: dims.h,
    });
  }
  if (import.meta.env.DEV) {
    console.info("[solution-pipeline] resolve:done", {
      label: entry.label,
      resolvedDiagramIds: out.map((diagram) => diagram.catalogId),
      count: out.length,
      fallbackDetected: /diagram description\s*:|(?:^|\n)\s*[*-]\s*(?:x-axis|y-axis)\s*:/im.test(`${entry.markScheme}\n${entry.modelAnswer}`),
      rawMarkdownDetected: /\|\s*Level\s*\||(?:^|\n)\s*\|\s*:?-{3,}|(?:^|\n)\s*[*-]\s+/m.test(`${entry.markScheme}\n${entry.modelAnswer}\n${entry.examinerTip ?? ""}`),
    });
  }
  if (entry.requiresDiagram && out.length === 0) {
    throw new Error(`${entry.label}: required diagram was resolved but could not be rendered into the PDF.`);
  }
  if (entry.requiresDiagram && out[0]) {
    const allowed = new Set((getCatalogEntry(out[0].catalogId)?.labels ?? []).map(normaliseLabelToken));
    const referenced = extractReferencedDiagramLabels(`${entry.markScheme}\n${entry.modelAnswer}`);
    const rogue = referenced.filter((token) => !allowed.has(token));
    if (rogue.length > 0) {
      throw new Error(`${entry.label}: prose references diagram labels not present on the attached figure (${rogue.join(", ")}).`);
    }
    if (/diagram description\s*:/i.test(`${entry.markScheme}\n${entry.modelAnswer}`)) {
      throw new Error(`${entry.label}: text-based 'Diagram Description' fallback detected. Generation aborted.`);
    }
  }
  return out;
}

/**
 * Solution / Mark Scheme PDF generator for Predicted Papers.
 *
 * Mirrors the visual style of generatePaperPdf but renders, per question:
 *   • Question label + marks
 *   • Question stem
 *   • Any referenced figures / tables (rendered with the same engine as the question paper)
 *   • Mark Scheme (AO breakdown)
 *   • Model Answer (top-band)
 *   • Examiner Tip
 *
 * Designed to be paired one-to-one with the question paper PDF.
 */

export interface SolutionEntry {
  label: string;          // e.g. "Question 01"
  marks: number;          // e.g. 9
  questionText: string;   // verbatim stem
  markScheme: string;     // marker breakdown
  modelAnswer: string;    // top-band model
  examinerTip?: string;   // optional tip
  figuresMarkdown?: string; // markdown blocks for figures/tables this question references
  /** Catalog id (or legacy alias) for the reference diagram this question expects. */
  referenceFigureId?: string;
  referenceFigureScenario?: string;
  /** True if AI marker tagged this question as requiring a diagram. */
  requiresDiagram?: boolean;
  diagramType?: DiagramType;
}

interface SolutionMeta {
  subject?: string;
  examBoard?: string;
  level?: string;
  tier?: string;
  paperNumber?: string;
  paperTitle?: string;
  paperRef?: string;
  totalMarks?: number;
}

// ─── Helpers ────────────────────────────────────────────────────────

const MARGIN_L = 18;
const MARGIN_R = 18;
const PAGE_TOP = 22;
const PAGE_BOT = 22;

// AQA mark scheme palette (muted, print-friendly)
const COLOR_INK: [number, number, number] = [20, 24, 35];
const COLOR_MUTED: [number, number, number] = [110, 116, 130];
const COLOR_RULE: [number, number, number] = [205, 210, 220];
const COLOR_BAND_BG: [number, number, number] = [241, 244, 249];
const COLOR_BAND_INK: [number, number, number] = [33, 41, 60];
const COLOR_ACCENT: [number, number, number] = [37, 99, 235];

function pageWH(doc: jsPDF) {
  return {
    pageW: doc.internal.pageSize.getWidth(),
    pageH: doc.internal.pageSize.getHeight(),
  };
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  const { pageH } = pageWH(doc);
  if (y + needed > pageH - PAGE_BOT) {
    doc.addPage();
    return PAGE_TOP;
  }
  return y;
}

function drawRunningHeader(doc: jsPDF, meta: SolutionMeta, pageIndex: number) {
  if (pageIndex === 1) return; // skip cover
  const { pageW } = pageWH(doc);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_MUTED);
  const left = `MARK SCHEME – ${(meta.level || "A-LEVEL").toUpperCase()} ${(meta.subject || "ECONOMICS").toUpperCase()} – ${meta.paperRef || ""}`;
  doc.text(left, MARGIN_L, 12);
  doc.setDrawColor(...COLOR_RULE);
  doc.setLineWidth(0.2);
  doc.line(MARGIN_L, 14, pageW - MARGIN_R, 14);
}

function drawFooters(doc: jsPDF, meta: SolutionMeta) {
  const totalPages = doc.getNumberOfPages();
  const { pageW, pageH } = pageWH(doc);
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawRunningHeader(doc, meta, i);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLOR_MUTED);
    const ref = meta.paperRef || `7136/${meta.paperNumber || "1"}`;
    doc.text(`${ref} – Predicted Mark Scheme`, MARGIN_L, pageH - 10);
    doc.text(`${i} of ${totalPages}`, pageW / 2, pageH - 10, { align: "center" });
    doc.text(meta.examBoard || "AQA", pageW - MARGIN_R, pageH - 10, { align: "right" });
  }
}

// ─── Markdown / LaTeX → plain-text normalisation ──────────────────────
//
// jsPDF's Helvetica font is WinAnsi only — it cannot render most emoji or
// extended Unicode (e.g. 🔑, Ø=ÜÝ artefacts, fullwidth math). It also has
// no markdown awareness, so any *, |, $...$, ~~, > characters reach the
// page verbatim. `clean()` is the single sanitiser that:
//   1. flattens markdown emphasis / headings / code spans
//   2. converts inline LaTeX ($...$, \frac, \text, \times) to readable
//      plain text so prose like "$\frac{52.7-78.4}{78.4} \times 100$"
//      becomes "(52.7-78.4)/78.4 × 100"
//   3. converts list/table syntax into wrapped paragraphs with line
//      breaks instead of leaking raw "* item * item" or "| a | b |"
//   4. strips characters Helvetica cannot encode (replaces with a safe
//      ASCII equivalent or drops them)
function latexToPlain(input: string): string {
  let s = input;
  // \frac{a}{b} → (a)/(b)
  s = s.replace(/\\d?frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "($1)/($2)");
  // \text{...}, \mathrm{...}, \mathbf{...} → contents only
  s = s.replace(/\\(?:text|mathrm|mathbf|mathit|operatorname)\s*\{([^{}]*)\}/g, "$1");
  // \times → ×, \div → ÷, \pm → ±, \cdot → ·, \approx → ≈, \neq → ≠, \leq → ≤, \geq → ≥
  s = s
    .replace(/\\times\b/g, "×")
    .replace(/\\div\b/g, "÷")
    .replace(/\\pm\b/g, "±")
    .replace(/\\cdot\b/g, "·")
    .replace(/\\approx\b/g, "≈")
    .replace(/\\neq\b/g, "≠")
    .replace(/\\leq\b/g, "≤")
    .replace(/\\geq\b/g, "≥")
    .replace(/\\rightarrow\b|\\to\b/g, "→")
    .replace(/\\leftarrow\b/g, "←")
    .replace(/\\Delta\b/g, "Δ")
    .replace(/\\percent\b/g, "%")
    .replace(/\\%/g, "%")
    .replace(/\\\$/g, "$")
    .replace(/\\,|\\;|\\!|\\:/g, " ")
    .replace(/\\\\/g, " ");
  // Subscripts / superscripts: a_1 → a₁, a^2 → a², {…} groups stripped
  const SUBS: Record<string, string> = { "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉" };
  const SUPS: Record<string, string> = { "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹" };
  s = s.replace(/_\{([^{}]+)\}/g, (_m, g) => g.split("").map((c: string) => SUBS[c] ?? c).join(""));
  s = s.replace(/\^\{([^{}]+)\}/g, (_m, g) => g.split("").map((c: string) => SUPS[c] ?? c).join(""));
  s = s.replace(/_([0-9])/g, (_m, c) => SUBS[c] ?? `_${c}`);
  s = s.replace(/\^([0-9])/g, (_m, c) => SUPS[c] ?? `^${c}`);
  // Drop residual single-char braces / backslash commands we didn't catch
  s = s.replace(/\\[a-zA-Z]+\b/g, "").replace(/[{}]/g, "");
  return s;
}

function stripUnsafeGlyphs(input: string): string {
  // jsPDF Helvetica cannot encode characters outside WinAnsi (≈ U+0000–U+00FF
  // plus a small set). Emoji and fancy Unicode show up as "Ø=ÜÝ" or boxes.
  // Map the common offenders, then drop anything else above U+02FF.
  return input
    .replace(/[\u{1F300}-\u{1FAFF}\u{1F000}-\u{1F2FF}\u{2600}-\u{27BF}]/gu, "") // emoji & misc symbols
    .replace(/[\u200B-\u200F\u2028-\u202F\u205F\u2060\uFEFF]/g, " ")             // zero-width / bidi
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u02B0-\u02FF\u0300-\u036F]/g, "");
}

function flattenMarkdownTable(block: string): string {
  // Convert a pipe table into "row1col1 | row1col2" lines (drop the |---|---| separator).
  const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines
    .filter((l) => !/^\|?\s*:?-{2,}/.test(l.replace(/\|/g, "")))
    .map((l) => l.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim()).join("  •  "))
    .join("\n");
}

function normaliseListsAndTables(text: string): string {
  let s = text;
  // Detect inline-collapsed bullet runs ("foo. * Bar: baz * Qux: …") that
  // appear when the model returns a bullet list on a single line. Split on
  // " * " when surrounded by sentence text; preserve real prose asterisks.
  s = s.replace(/\s\*\s+(?=[A-Z(])/g, "\n• ");
  // Leading "* " or "- " bullets at line start → "• "
  s = s.replace(/^[\t ]*[*\-]\s+/gm, "• ");
  // Numbered lists "1. " stay as-is, just ensure they sit on their own line.
  s = s.replace(/(?<!\n)\n(?=\d{1,2}\.\s)/g, "\n");
  // Markdown tables: detect contiguous pipe-line blocks and flatten them.
  s = s.replace(/(?:^\|.*\|\s*\n?){2,}/gm, (block) => `\n${flattenMarkdownTable(block)}\n`);
  // Block quotes "> "
  s = s.replace(/^[\t ]*>\s?/gm, "");
  return s;
}

function stripInlineLatex(text: string): string {
  // $$...$$ display math
  let s = text.replace(/\$\$([\s\S]+?)\$\$/g, (_m, inner) => latexToPlain(inner));
  // $...$ inline math (non-greedy, single line)
  s = s.replace(/\$([^\n$]+?)\$/g, (_m, inner) => latexToPlain(inner));
  // Bare \frac / \text outside $...$ (defensive)
  if (/\\(?:frac|text|times|div|approx|leq|geq|Delta)\b/.test(s)) {
    s = latexToPlain(s);
  }
  return s;
}

// Strip markdown emphasis & convert LaTeX/markdown to plain readable text.
function clean(text: string): string {
  if (!text) return "";
  let s = text.replace(/\r/g, "");
  // 1. inline emphasis & code
  s = s.replace(/\*\*([^*]+?)\*\*/g, "$1");
  s = s.replace(/__([^_]+?)__/g, "$1");
  s = s.replace(/`([^`]+)`/g, "$1");
  s = s.replace(/^#{1,6}\s*/gm, "");
  // 2. LaTeX → plain
  s = stripInlineLatex(s);
  // 3. lists & tables → line-broken plain text
  s = normaliseListsAndTables(s);
  // 4. unsafe glyphs (emoji, smart quotes, bidi marks)
  s = stripUnsafeGlyphs(s);
  // 5. tidy whitespace
  s = s.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

function writeWrapped(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
): number {
  if (!text) return y;
  const paragraphs = repairSolutionSpacing(text).split(/\n/);
  for (const para of paragraphs) {
    if (!para.trim()) {
      y += lineH * 0.5;
      y = ensureSpace(doc, y, lineH);
      continue;
    }
    const lines = doc.splitTextToSize(para, maxW) as string[];
    for (const ln of lines) {
      y = ensureSpace(doc, y, lineH);
      doc.text(ln, x, y);
      y += lineH;
    }
  }
  return y;
}

// ─── Cover ──────────────────────────────────────────────────────────

function drawCover(doc: jsPDF, meta: SolutionMeta) {
  const { pageW, pageH } = pageWH(doc);

  // Top brand band
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageW, 38, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text((meta.examBoard || "AQA").toUpperCase(), MARGIN_L, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`${meta.level || "A-level"} ${meta.subject || "Economics"}`, MARGIN_L, 24);
  doc.text(meta.paperRef || `7136/${meta.paperNumber || "1"}`, pageW - MARGIN_R, 16, { align: "right" });
  doc.text("Predicted Mark Scheme", pageW - MARGIN_R, 24, { align: "right" });

  // Centre block
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("Mark Scheme", pageW / 2, pageH / 2 - 30, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(meta.paperTitle || `Paper ${meta.paperNumber || "1"}`, pageW / 2, pageH / 2 - 18, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text(
    `${meta.examBoard || "AQA"} ${meta.level || "A-level"} ${meta.subject || "Economics"}`,
    pageW / 2,
    pageH / 2 - 8,
    { align: "center" },
  );

  if (meta.tier) {
    doc.text(`Tier: ${meta.tier}`, pageW / 2, pageH / 2, { align: "center" });
  }

  // Notice box
  const boxY = pageH / 2 + 20;
  const boxX = MARGIN_L + 10;
  const boxW = pageW - 2 * (MARGIN_L + 10);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.roundedRect(boxX, boxY, boxW, 50, 3, 3);

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("How to use this mark scheme", boxX + 6, boxY + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const notice =
    "This solution booklet shows the mark allocation, a top-band model answer and an examiner tip for every question in the matching predicted paper. Use it after attempting the paper under exam conditions to self-mark and identify gaps in technique.";
  const noticeLines = doc.splitTextToSize(notice, boxW - 12) as string[];
  let ny = boxY + 18;
  for (const ln of noticeLines) {
    doc.text(ln, boxX + 6, ny);
    ny += 5;
  }

  // Bottom strip
  doc.setFillColor(15, 23, 42);
  doc.rect(0, pageH - 16, pageW, 16, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text("Predicted Mark Scheme — for revision use only", pageW / 2, pageH - 6, { align: "center" });
}

// ─── Per-question block ─────────────────────────────────────────────

function drawSectionHeader(doc: jsPDF, y: number, label: string) {
  const { pageW } = pageWH(doc);
  const x = MARGIN_L;
  const w = pageW - MARGIN_L - MARGIN_R;
  y = ensureSpace(doc, y, 9);
  // Subtle filled band
  doc.setFillColor(...COLOR_BAND_BG);
  doc.rect(x, y - 4.5, w, 6.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_BAND_INK);
  doc.text(label.toUpperCase(), x + 2.5, y);
  return y + 5;
}

/**
 * Top-of-question header bar.
 *
 * AQA: Question | Answer | Marks | AO
 * Edexcel A (9EC0): Question | Answer | Marks | K · Ap · An · Ev (per-skill split)
 */
function drawQuestionHeaderBar(
  doc: jsPDF,
  y: number,
  entry: SolutionEntry,
  meta: SolutionMeta,
  ao?: string,
): number {
  const { pageW } = pageWH(doc);
  const x = MARGIN_L;
  const w = pageW - MARGIN_L - MARGIN_R;
  const rowH = 7;
  const edexcel = isEdexcelA(meta);

  // Column widths
  const cQ = 22;       // Question
  const cM = 18;       // Marks
  // Edexcel needs a wider rightmost column for "K2 · Ap2 · An4 · Ev2"
  const cAO = edexcel ? 38 : 26;
  const cA = w - cQ - cM - cAO; // Answer

  y = ensureSpace(doc, y, rowH + 2);

  // Border
  doc.setDrawColor(...COLOR_RULE);
  doc.setLineWidth(0.3);
  doc.setFillColor(...COLOR_BAND_BG);
  doc.rect(x, y, w, rowH, "FD");
  // Column dividers
  doc.line(x + cQ, y, x + cQ, y + rowH);
  doc.line(x + cQ + cA, y, x + cQ + cA, y + rowH);
  doc.line(x + cQ + cA + cM, y, x + cQ + cA + cM, y + rowH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_BAND_INK);
  doc.text("Question", x + cQ / 2, y + 4.6, { align: "center" });
  doc.text("Answer", x + cQ + cA / 2, y + 4.6, { align: "center" });
  doc.text("Marks", x + cQ + cA + cM / 2, y + 4.6, { align: "center" });
  doc.text(edexcel ? "K · Ap · An · Ev" : "AO", x + cQ + cA + cM + cAO / 2, y + 4.6, { align: "center" });

  y += rowH;

  // Value row
  const qNum = (entry.label.match(/(\d+)/) || ["", entry.label])[1];
  const qPreview = clean(entry.questionText).split("\n")[0].slice(0, 110);
  const valH = Math.max(rowH, 7);

  doc.rect(x, y, w, valH, "D");
  doc.line(x + cQ, y, x + cQ, y + valH);
  doc.line(x + cQ + cA, y, x + cQ + cA, y + valH);
  doc.line(x + cQ + cA + cM, y, x + cQ + cA + cM, y + valH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLOR_INK);
  doc.text(qNum || entry.label, x + cQ / 2, y + 4.8, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_INK);
  const previewLines = doc.splitTextToSize(qPreview, cA - 4) as string[];
  doc.text(previewLines[0] || "", x + cQ + 2, y + 4.8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(String(entry.marks), x + cQ + cA + cM / 2, y + 4.8, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  let rightLabel = ao || aoForMarks(entry.marks);
  if (edexcel) {
    const split = getEdexcelASkillSplit(entry.marks);
    rightLabel = split
      ? `K${split.K} · Ap${split.Ap} · An${split.An} · Ev${split.Ev}`
      : "—";
  }
  doc.text(rightLabel, x + cQ + cA + cM + cAO / 2, y + 4.8, { align: "center" });

  return y + valH + 4;
}

function aoForMarks(marks: number): string {
  if (marks <= 1) return "AO1";
  if (marks <= 4) return "AO1/AO2";
  if (marks <= 9) return "AO2/AO3";
  if (marks <= 15) return "AO2/AO3";
  return "AO1–AO4";
}

function drawDiagramImage(doc: jsPDF, diagram: ResolvedDiagram, y: number): number {
  const { pageW } = pageWH(doc);
  const maxW = pageW - MARGIN_L - MARGIN_R;
  const widthMm = Math.min(maxW, 130);
  const aspect = diagram.heightPx / diagram.widthPx || 0.7;
  const heightMm = Math.min(110, widthMm * aspect);
  y = ensureSpace(doc, y, heightMm + 12);
  const x = MARGIN_L + (maxW - widthMm) / 2;
  try {
    doc.addImage(diagram.pngDataUrl, "PNG", x, y, widthMm, heightMm, undefined, "FAST");
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[generateSolutionPdf] addImage failed", diagram.catalogId, err);
    return y;
  }
  y += heightMm + 2;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_MUTED);
  doc.text(`Reference diagram: ${diagram.title}`, pageW / 2, y + 3, { align: "center" });
  doc.setTextColor(...COLOR_INK);
  return y + 8;
}

/** Render levels-of-response banding for extended-response questions. */
function drawLevelsTable(doc: jsPDF, y: number, marks: number): number {
  const { pageW } = pageWH(doc);
  const x = MARGIN_L;
  const w = pageW - MARGIN_L - MARGIN_R;

  let bands: { level: string; range: string; descriptor: string }[] = [];
  if (marks >= 25) {
    bands = [
      { level: "Level 5", range: "21–25", descriptor: "Sophisticated analysis & evaluation; balanced judgement supported throughout; precise use of theory, diagrams and data; clear reasoned conclusion." },
      { level: "Level 4", range: "16–20", descriptor: "Good analysis with some evaluation; mostly accurate theory and relevant application; conclusion present but reasoning may lack depth." },
      { level: "Level 3", range: "11–15", descriptor: "Sound knowledge with developed analysis; limited evaluation; some application to context." },
      { level: "Level 2", range: "6–10", descriptor: "Some relevant knowledge and basic analysis; evaluation absent or assertion-based." },
      { level: "Level 1", range: "1–5", descriptor: "Limited knowledge; little or no analysis; weak or no application." },
    ];
  } else if (marks >= 15) {
    bands = [
      { level: "Level 4", range: "13–15", descriptor: "Sophisticated analysis & balanced evaluation; precise theory, accurate diagram(s), reasoned conclusion." },
      { level: "Level 3", range: "9–12", descriptor: "Good analysis with some evaluation; mostly accurate theory and application; conclusion present." },
      { level: "Level 2", range: "5–8", descriptor: "Sound knowledge; basic analysis; little evaluation; limited application." },
      { level: "Level 1", range: "1–4", descriptor: "Limited knowledge; no real analysis; weak application." },
    ];
  } else if (marks >= 9) {
    bands = [
      { level: "Level 3", range: "7–9", descriptor: "Clear knowledge, accurate analysis with appropriate diagram, application to context." },
      { level: "Level 2", range: "4–6", descriptor: "Sound knowledge with some analysis; partial application; diagram may have errors." },
      { level: "Level 1", range: "1–3", descriptor: "Limited knowledge; descriptive only; no/weak diagram." },
    ];
  } else {
    return y;
  }

  y = drawSectionHeader(doc, y, "Levels of response");

  const cL = 22;
  const cM = 18;
  const cD = w - cL - cM;
  const rowH = 5;
  doc.setDrawColor(...COLOR_RULE);
  doc.setLineWidth(0.25);

  // Header row
  y = ensureSpace(doc, y, rowH + 2);
  doc.setFillColor(...COLOR_BAND_BG);
  doc.rect(MARGIN_L, y, w, rowH, "FD");
  doc.line(MARGIN_L + cL, y, MARGIN_L + cL, y + rowH);
  doc.line(MARGIN_L + cL + cM, y, MARGIN_L + cL + cM, y + rowH);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_BAND_INK);
  doc.text("Level", MARGIN_L + 2, y + 3.5);
  doc.text("Marks", MARGIN_L + cL + 2, y + 3.5);
  doc.text("Descriptor", MARGIN_L + cL + cM + 2, y + 3.5);
  y += rowH;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLOR_INK);
  doc.setFontSize(8);
  for (const b of bands) {
    const lines = doc.splitTextToSize(b.descriptor, cD - 4) as string[];
    const h = Math.max(rowH, lines.length * 3.6 + 2);
    y = ensureSpace(doc, y, h);
    doc.rect(MARGIN_L, y, w, h, "D");
    doc.line(MARGIN_L + cL, y, MARGIN_L + cL, y + h);
    doc.line(MARGIN_L + cL + cM, y, MARGIN_L + cL + cM, y + h);
    doc.setFont("helvetica", "bold");
    doc.text(b.level, MARGIN_L + 2, y + 3.6);
    doc.setFont("helvetica", "normal");
    doc.text(b.range, MARGIN_L + cL + 2, y + 3.6);
    let ty = y + 3.6;
    for (const ln of lines) {
      doc.text(ln, MARGIN_L + cL + cM + 2, ty);
      ty += 3.6;
    }
    y += h;
  }
  return y + 4;
}

function drawQuestion(
  doc: jsPDF,
  entry: SolutionEntry,
  diagrams: ResolvedDiagram[],
  y: number,
  isFirst: boolean,
  meta: SolutionMeta,
): number {
  const { pageW } = pageWH(doc);
  const maxW = pageW - MARGIN_L - MARGIN_R;
  const edexcel = isEdexcelA(meta);

  // Each question starts on its own page (except the first which follows the booklet title)
  if (!isFirst) {
    doc.addPage();
    y = PAGE_TOP;
  }

  // Header bar (AO column for AQA, K·Ap·An·Ev for Edexcel A)
  y = drawQuestionHeaderBar(doc, y, entry, meta);

  // Full question stem
  y = drawSectionHeader(doc, y, "Question");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_INK);
  y = writeWrapped(doc, clean(entry.questionText), MARGIN_L, y, maxW, 4.8);
  y += 3;

  // Referenced figures / tables
  if (entry.figuresMarkdown && entry.figuresMarkdown.trim()) {
    y = ensureSpace(doc, y, 20);
    y = renderPaperMarkdown(doc, entry.figuresMarkdown, y);
    y += 2;
  }

  // Embedded reference diagram(s)
  for (const d of diagrams) {
    y = drawDiagramImage(doc, d, y);
  }

  // Indicative content (Mark Scheme)
  y = drawSectionHeader(doc, y, "Indicative content");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_INK);
  y = writeWrapped(
    doc,
    stripSolutionDiagramFallback(clean(entry.markScheme)) || "(no indicative content)",
    MARGIN_L,
    y,
    maxW,
    4.8,
  );
  y += 4;

  // Marking grid:
  //   • AQA → "Levels of response" descriptor table (≥9 marks)
  //   • Edexcel A → per-skill K/Ap/An/Ev allocation table
  if (edexcel) {
    y = drawEdexcelSkillTable(doc, y, entry.marks);
  } else if (entry.marks >= 9) {
    y = drawLevelsTable(doc, y, entry.marks);
  }

  // Top-band model answer
  if (entry.modelAnswer && entry.modelAnswer.trim()) {
    y = drawSectionHeader(doc, y, "Top-band model answer");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...COLOR_INK);
    y = writeWrapped(doc, stripSolutionDiagramFallback(clean(entry.modelAnswer)), MARGIN_L, y, maxW, 4.8);
    y += 3;
  }

  // Examiner tip
  if (entry.examinerTip && entry.examinerTip.trim()) {
    y = drawSectionHeader(doc, y, "Examiner tip");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(...COLOR_MUTED);
    y = writeWrapped(doc, clean(entry.examinerTip), MARGIN_L, y, maxW, 4.6);
    y += 3;
  }

  return y;
}

// ─── Main Export ────────────────────────────────────────────────────

export async function generateSolutionPdf(
  title: string,
  entries: SolutionEntry[],
  meta?: { subject?: string; examBoard?: string; level?: string; tier?: string },
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const paperNumMatch = title.match(/Paper\s*(\d)/i);
  const paperNumber = paperNumMatch ? paperNumMatch[1] : "1";

  const paperTitles: Record<string, string> = {
    "1": "Paper 1 Markets and Market Failure",
    "2": "Paper 2 National and International Economy",
    "3": "Paper 3 Economic Principles and Issues",
  };

  const fullMeta: SolutionMeta = {
    subject: meta?.subject || "Economics",
    examBoard: meta?.examBoard || "AQA",
    level: meta?.level || "A-level",
    tier: meta?.tier,
    paperNumber,
    paperTitle: paperTitles[paperNumber] || title,
    paperRef: `7136/${paperNumber}`,
    totalMarks: entries.reduce((s, e) => s + (e.marks || 0), 0),
  };

  // Pre-resolve diagrams for every question BEFORE drawing so jsPDF stays sync.
  const diagramsByEntry: ResolvedDiagram[][] = [];
  for (const entry of entries) {
    try {
      diagramsByEntry.push(await resolveEntryDiagrams(entry));
    } catch (err) {
      if (import.meta.env.DEV) console.warn("[generateSolutionPdf] diagram resolve failed", entry.label, err);
      diagramsByEntry.push([]);
    }
  }

  // Cover
  drawCover(doc, fullMeta);

  // Booklet intro page
  doc.addPage();
  let y = PAGE_TOP + 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLOR_INK);
  doc.text(`${fullMeta.paperTitle}`, MARGIN_L, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...COLOR_BAND_INK);
  doc.text(`Mark scheme · ${fullMeta.paperRef}`, MARGIN_L, y);
  y += 6;

  doc.setDrawColor(...COLOR_RULE);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_L, y, pageWH(doc).pageW - MARGIN_R, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_MUTED);
  doc.text(
    `${fullMeta.examBoard} · ${fullMeta.level} · ${fullMeta.subject}    Total: ${fullMeta.totalMarks} marks    Questions: ${entries.length}`,
    MARGIN_L,
    y,
  );

  for (let i = 0; i < entries.length; i++) {
    y = drawQuestion(doc, entries[i], diagramsByEntry[i] ?? [], y, i === 0);
  }

  drawFooters(doc, fullMeta);

  const safeName = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
  doc.save(`${safeName}_Solutions.pdf`);
}
