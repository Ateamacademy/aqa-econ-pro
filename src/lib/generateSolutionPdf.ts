import jsPDF from "jspdf";

/**
 * Solution / Mark Scheme PDF generator for Predicted Papers.
 *
 * Mirrors the visual style of generatePaperPdf but renders, per question:
 *   • Question label + marks
 *   • Question stem
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

function drawQuestion(doc: jsPDF, entry: SolutionEntry, y: number): number {
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

  // Mark Scheme
  y = drawSectionHeader(doc, y, "Mark Scheme", [37, 99, 235]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  y = writeWrapped(doc, clean(entry.markScheme) || "(no mark scheme generated)", MARGIN_L, y, maxW, 5);
  y += 4;

  // Model Answer
  if (entry.modelAnswer && entry.modelAnswer.trim()) {
    y = drawSectionHeader(doc, y, "Model Answer", [22, 163, 74]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    y = writeWrapped(doc, clean(entry.modelAnswer), MARGIN_L, y, maxW, 5);
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

export function generateSolutionPdf(
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

  for (const entry of entries) {
    y = drawQuestion(doc, entry, y);
  }

  drawFooters(doc, fullMeta);

  const safeName = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
  doc.save(`${safeName}_Solutions.pdf`);
}
