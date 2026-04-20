import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { flushSync } from "react-dom";
import { renderPaperMarkdown } from "./generatePaperPdf";
import { getCatalogEntry, AQA_DIAGRAM_CATALOG, pickReferenceFigure } from "./aqa-diagram-catalog";
import type { DiagramType } from "./aqa-diagram-rubric";

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

  const out: ResolvedDiagram[] = [];
  for (const id of ids) {
    const cat = getCatalogEntry(id);
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
  /** True if AI marker tagged this question as requiring a diagram. */
  requiresDiagram?: boolean;
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

const MARGIN_L = 20;
const MARGIN_R = 20;
const PAGE_TOP = 25;
const PAGE_BOT = 25;

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

function drawFooters(doc: jsPDF, meta: SolutionMeta) {
  const totalPages = doc.getNumberOfPages();
  const { pageW, pageH } = pageWH(doc);
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(140, 140, 140);
    const ref = meta.paperRef || `7136/${meta.paperNumber || "1"}`;
    doc.text(`${ref} — Mark Scheme`, MARGIN_L, pageH - 10);
    doc.text(`Page ${i} of ${totalPages}`, pageW / 2, pageH - 10, { align: "center" });
    doc.text("Predicted Solution", pageW - MARGIN_L, pageH - 10, { align: "right" });
  }
}

// Strip markdown emphasis but keep readable structure
function clean(text: string): string {
  if (!text) return "";
  return text
    .replace(/\r/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
  const paragraphs = text.split(/\n/);
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

function drawSectionHeader(doc: jsPDF, y: number, label: string, color: [number, number, number]) {
  const { pageW } = pageWH(doc);
  const x = MARGIN_L;
  const w = pageW - MARGIN_L - MARGIN_R;
  y = ensureSpace(doc, y, 10);
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(x, y - 4.5, 2.5, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(label, x + 6, y);
  return y + 5;
}

function drawDiagramImage(doc: jsPDF, diagram: ResolvedDiagram, y: number): number {
  const { pageW } = pageWH(doc);
  const maxW = pageW - MARGIN_L - MARGIN_R;
  // Convert px aspect ratio to mm. Cap width at 140mm so it sits nicely on A4.
  const widthMm = Math.min(maxW, 140);
  const aspect = diagram.heightPx / diagram.widthPx || 0.7;
  const heightMm = Math.min(120, widthMm * aspect);
  // Caption + image needs ~heightMm + 10
  y = ensureSpace(doc, y, heightMm + 12);
  // Centre horizontally
  const x = MARGIN_L + (maxW - widthMm) / 2;
  try {
    doc.addImage(diagram.pngDataUrl, "PNG", x, y, widthMm, heightMm, undefined, "FAST");
  } catch (err) {
    if (import.meta.env.DEV) console.warn("[generateSolutionPdf] addImage failed", diagram.catalogId, err);
    return y;
  }
  y += heightMm + 2;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 110);
  doc.text(`Reference diagram: ${diagram.title}`, pageW / 2, y + 3, { align: "center" });
  doc.setTextColor(30, 30, 30);
  return y + 8;
}

function drawQuestion(
  doc: jsPDF,
  entry: SolutionEntry,
  diagrams: ResolvedDiagram[],
  y: number,
): number {
  const { pageW } = pageWH(doc);
  const maxW = pageW - MARGIN_L - MARGIN_R;

  // Need at least ~30mm before starting
  y = ensureSpace(doc, y, 30);

  // Question header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  const header = `${entry.label}  [${entry.marks} marks]`;
  doc.text(header, MARGIN_L, y);
  y += 7;

  // Underline
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_L, y - 3, MARGIN_L + 40, y - 3);

  // Question stem
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  y = writeWrapped(doc, clean(entry.questionText), MARGIN_L, y, maxW, 5);
  y += 4;

  // Referenced figures / tables (rendered with the question-paper engine)
  if (entry.figuresMarkdown && entry.figuresMarkdown.trim()) {
    y = ensureSpace(doc, y, 20);
    y = renderPaperMarkdown(doc, entry.figuresMarkdown, y);
    y += 2;
  }

  // Embedded reference diagram(s)
  for (const d of diagrams) {
    y = drawDiagramImage(doc, d, y);
  }

  // Mark Scheme — strip placeholder lines so raw "Diagram: tax_incidence" never shows
  y = drawSectionHeader(doc, y, "Mark Scheme", [37, 99, 235]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  y = writeWrapped(
    doc,
    stripDiagramPlaceholders(clean(entry.markScheme)) || "(no mark scheme generated)",
    MARGIN_L,
    y,
    maxW,
    5,
  );
  y += 4;

  // Model Answer
  if (entry.modelAnswer && entry.modelAnswer.trim()) {
    y = drawSectionHeader(doc, y, "Model Answer", [22, 163, 74]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    y = writeWrapped(doc, stripDiagramPlaceholders(clean(entry.modelAnswer)), MARGIN_L, y, maxW, 5);
    y += 4;
  }

  // Examiner Tip
  if (entry.examinerTip && entry.examinerTip.trim()) {
    y = drawSectionHeader(doc, y, "Examiner Tip", [217, 119, 6]);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(80, 60, 20);
    y = writeWrapped(doc, clean(entry.examinerTip), MARGIN_L, y, maxW, 5);
    y += 4;
  }

  // Divider
  y = ensureSpace(doc, y, 8);
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_L, y, pageW - MARGIN_R, y);
  y += 8;

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

  // Body
  doc.addPage();
  let y = PAGE_TOP;

  // Booklet title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`${fullMeta.paperTitle} — Mark Scheme`, MARGIN_L, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(110, 110, 110);
  doc.text(
    `${fullMeta.examBoard} ${fullMeta.level} ${fullMeta.subject}  •  Total: ${fullMeta.totalMarks} marks  •  ${entries.length} questions`,
    MARGIN_L,
    y,
  );
  y += 8;

  for (let i = 0; i < entries.length; i++) {
    y = drawQuestion(doc, entries[i], diagramsByEntry[i] ?? [], y);
  }

  drawFooters(doc, fullMeta);

  const safeName = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
  doc.save(`${safeName}_Solutions.pdf`);
}
