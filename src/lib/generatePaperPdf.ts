import jsPDF from "jspdf";

/**
 * Professional AQA-format PDF generator for predicted papers.
 * Mirrors the exact layout of official AQA A-Level Economics papers (7136/1, 7136/2, 7136/3).
 */

interface PaperMeta {
  subject?: string;
  examBoard?: string;
  level?: string;
  tier?: string;
  paperNumber?: string;
  paperTitle?: string;
  date?: string;
  timeAllowed?: string;
  totalMarks?: number;
  paperRef?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function ensureSpace(doc: jsPDF, y: number, needed: number, pageH: number): number {
  if (y + needed > pageH - 25) {
    doc.addPage();
    return 25;
  }
  return y;
}

function drawFooters(doc: jsPDF, meta: PaperMeta, marginL: number) {
  const totalPages = doc.getNumberOfPages();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(140, 140, 140);
    const ref = meta.paperRef || `7136/${meta.paperNumber || "1"}`;
    doc.text(ref, marginL, pageH - 10);
    doc.text(`Page ${i} of ${totalPages}`, pageW / 2, pageH - 10, { align: "center" });
    doc.text("AI Predicted Paper", pageW - marginL, pageH - 10, { align: "right" });
  }
}

// ─── Cover Page ─────────────────────────────────────────────────────

function drawCoverPage(doc: jsPDF, meta: PaperMeta) {
  const pageW = doc.internal.pageSize.getWidth();
  const marginL = 20;
  const marginR = 20;
  const maxW = pageW - marginL - marginR;
  let y = 30;

  // Top line
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);
  doc.line(marginL, y, pageW - marginR, y);
  y += 12;

  // Exam board name
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(meta.examBoard || "AQA", marginL, y);
  y += 10;

  // Level
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(meta.level || "A-level", marginL, y);
  y += 12;

  // Subject
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text((meta.subject || "ECONOMICS").toUpperCase(), marginL, y);
  y += 12;

  // Paper title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const paperTitle = meta.paperTitle || `Paper ${meta.paperNumber || "1"}`;
  const titleLines = doc.splitTextToSize(paperTitle, maxW);
  doc.text(titleLines, marginL, y);
  y += titleLines.length * 7 + 8;

  // Date / Time
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(meta.date || "AI-Generated Predicted Paper", marginL, y);
  y += 7;
  doc.text(`Time allowed: ${meta.timeAllowed || "2 hours"}`, marginL, y);
  y += 14;

  // Divider
  doc.setLineWidth(0.5);
  doc.line(marginL, y, pageW - marginR, y);
  y += 10;

  // Materials
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Materials", marginL, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const materials = [
    "• an answer book or lined paper",
    "• a calculator.",
  ];
  for (const m of materials) {
    doc.text(m, marginL + 4, y);
    y += 5.5;
  }
  y += 6;

  // Instructions
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Instructions", marginL, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const pNum = meta.paperNumber || "1";
  let instructions: string[];
  if (pNum === "3") {
    instructions = [
      "• Answer all questions.",
      "• Use black ink or black ball-point pen. Pencil should only be used for drawing.",
    ];
  } else {
    instructions = [
      "• Use black ink or black ball-point pen. Pencil should only be used for drawing.",
      `• The Paper Reference is 7136/${pNum}.`,
      "• In Section A, answer EITHER Context 1 OR Context 2.",
      "• In Section B, answer ONE essay.",
    ];
  }
  for (const instr of instructions) {
    const lines = doc.splitTextToSize(instr, maxW - 4);
    for (const l of lines) {
      doc.text(l, marginL + 4, y);
      y += 5.5;
    }
  }
  y += 6;

  // Information
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Information", marginL, y);
  y += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const totalMarks = meta.totalMarks || 80;
  const info = [
    "• The marks for questions are shown in brackets.",
    `• The maximum mark for this paper is ${totalMarks}.`,
  ];
  if (pNum !== "3") {
    info.push(`• There are ${totalMarks / 2} marks for Section A and ${totalMarks / 2} marks for Section B.`);
  }
  for (const inf of info) {
    doc.text(inf, marginL + 4, y);
    y += 5.5;
  }
  y += 6;

  // Advice
  if (pNum !== "3") {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Advice", marginL, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("• You are advised to spend 1 hour on Section A and 1 hour on Section B.", marginL + 4, y);
    y += 8;
  }

  // Bottom line
  y = doc.internal.pageSize.getHeight() - 35;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);
  doc.line(marginL, y, pageW - marginR, y);
  y += 8;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("AI-Generated Predicted Paper — For revision purposes only", marginL, y);
  doc.text(`7136/${pNum}`, pageW - marginR, y, { align: "right" });
}

// ─── Content Renderer ───────────────────────────────────────────────

function renderContent(doc: jsPDF, content: string, meta: PaperMeta) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginL = 20;
  const marginR = 20;
  const maxW = pageW - marginL - marginR;
  const lineH = 5.5;
  let y = 25;

  const lines = content.split("\n");

  for (let li = 0; li < lines.length; li++) {
    const rawLine = lines[li];
    const line = rawLine.trimEnd();

    // Skip empty lines
    if (!line.trim()) {
      y += 3;
      continue;
    }

    // ── Section headers (Section A, Section B) ──
    const sectionMatch = line.match(/^#{1,2}\s*(Section\s+[A-Z])/i);
    if (sectionMatch) {
      // New page for each section
      if (y > 30) {
        doc.addPage();
        y = 25;
      }
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(sectionMatch[1], marginL, y);
      y += 4;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.8);
      doc.line(marginL, y, pageW - marginR, y);
      y += 8;
      continue;
    }

    // ── Context / EITHER / OR / Essay headers ──
    const contextMatch = line.match(/^#{1,3}\s*((?:EITHER|OR|Context\s+\d+|Essay\s+\d+|INVESTIGATION).*)/i);
    if (contextMatch) {
      y = ensureSpace(doc, y, 14, pageH);
      y += 4;
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(contextMatch[1], marginL, y);
      y += 8;
      continue;
    }

    // ── Extract headers ──
    const extractMatch = line.match(/^#{1,4}\s*(Extract\s+[A-Z](?::.*)?)/i);
    if (extractMatch) {
      y = ensureSpace(doc, y, 12, pageH);
      y += 3;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(20, 20, 20);
      const wrapped = doc.splitTextToSize(extractMatch[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 6 + 3;
      continue;
    }

    // ── Figure / Table headers ──
    const figMatch = line.match(/^#{0,4}\s*\*{0,2}((?:Figure|Table)\s+\d+(?::.*)?)\*{0,2}\s*$/i);
    if (figMatch) {
      y = ensureSpace(doc, y, 10, pageH);
      y += 2;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      const wrapped = doc.splitTextToSize(figMatch[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 5.5 + 2;
      continue;
    }

    // ── H1 headings ──
    const h1 = line.match(/^#\s+(.+)/);
    if (h1 && !sectionMatch && !contextMatch) {
      y = ensureSpace(doc, y, 14, pageH);
      y += 4;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      const wrapped = doc.splitTextToSize(h1[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 7 + 4;
      continue;
    }

    // ── H2/H3/H4 headings ──
    const h2 = line.match(/^##\s+(.+)/);
    if (h2 && !sectionMatch) {
      y = ensureSpace(doc, y, 12, pageH);
      y += 3;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(20, 20, 20);
      const wrapped = doc.splitTextToSize(h2[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 6 + 3;
      continue;
    }

    const h3 = line.match(/^###\s+(.+)/);
    if (h3) {
      y = ensureSpace(doc, y, 10, pageH);
      y += 2;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      const wrapped = doc.splitTextToSize(h3[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 5.5 + 2;
      continue;
    }

    const h4 = line.match(/^####\s+(.+)/);
    if (h4) {
      y = ensureSpace(doc, y, 10, pageH);
      y += 2;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      const wrapped = doc.splitTextToSize(h4[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 5 + 2;
      continue;
    }

    // ── Question line with marks badge ──
    const questionMatch = line.match(/^(?:\*{0,2})?(?:Question\s*)?((?:\d{1,2}(?:\.\d+)?[a-z]?|0\s?\d{1,2}(?:\.\d+)?[a-z]?))\s*(?:\*{0,2})[^\[]*?\[\s*(\d+)\s*marks?\s*\]/i);
    if (questionMatch) {
      y = ensureSpace(doc, y, 12, pageH);
      y += 4;

      const qNum = questionMatch[1].replace(/\s+/g, "");
      const marks = questionMatch[2];
      const qLabel = `Question ${qNum}`;

      // Question number in bold
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(qLabel, marginL, y);

      // Marks badge (right-aligned, rounded rect)
      const badgeText = `${marks} marks`;
      doc.setFontSize(8.5);
      const badgeW = doc.getTextWidth(badgeText) + 8;
      const badgeX = pageW - marginR - badgeW;
      doc.setFillColor(230, 230, 230);
      doc.roundedRect(badgeX, y - 4, badgeW, 6, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setTextColor(60, 60, 60);
      doc.text(badgeText, badgeX + 4, y);

      y += 7;

      // Check if there's question text after the header on the same line
      const afterHeader = line.replace(/^(?:\*{0,2})?(?:Question\s*)?(?:\d{1,2}(?:\.\d+)?[a-z]?|0\s?\d{1,2}(?:\.\d+)?[a-z]?)\s*(?:\*{0,2})[^\[]*?\[\s*\d+\s*marks?\s*\]\s*/i, "").trim();
      if (afterHeader) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(30, 30, 30);
        const wrapped = doc.splitTextToSize(afterHeader, maxW);
        for (const wl of wrapped) {
          y = ensureSpace(doc, y, lineH, pageH);
          doc.text(wl, marginL, y);
          y += lineH;
        }
      }
      continue;
    }

    // ── MCQ options (A/B/C/D) ──
    const mcqMatch = line.match(/^\s*[-•]?\s*([A-D])\s+(.+)/);
    if (mcqMatch) {
      y = ensureSpace(doc, y, 6, pageH);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      // Draw circle
      doc.circle(marginL + 3, y - 1.2, 2.2);
      doc.setFont("helvetica", "normal");
      doc.text(mcqMatch[1], marginL + 1.5, y);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      const optText = mcqMatch[2].replace(/\*\*/g, "");
      const wrapped = doc.splitTextToSize(optText, maxW - 12);
      doc.text(wrapped, marginL + 10, y);
      y += wrapped.length * lineH + 1;
      continue;
    }

    // ── Table rows ──
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      // Skip separator lines
      if (/^\|[\s\-:|]+\|$/.test(line.trim())) continue;

      y = ensureSpace(doc, y, 7, pageH);
      const cells = line.split("|").filter((c) => c.trim()).map((c) => c.trim());
      const colW = maxW / cells.length;
      doc.setFontSize(8.5);
      doc.setTextColor(0, 0, 0);

      const isHeader = /\*\*/.test(line);
      doc.setFont("helvetica", isHeader ? "bold" : "normal");

      cells.forEach((cell, i) => {
        const clean = cell.replace(/\*\*/g, "");
        doc.text(clean, marginL + i * colW + 2, y, { maxWidth: colW - 4 });
      });

      // Row border
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(marginL, y + 2, pageW - marginR, y + 2);
      y += lineH + 1;
      continue;
    }

    // ── "Total for this context/investigation" lines ──
    const totalMatch = line.match(/total for this (?:context|investigation):\s*(\d+)\s*marks/i);
    if (totalMatch) {
      y = ensureSpace(doc, y, 8, pageH);
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(80, 80, 80);
      doc.text(`Total for this section: ${totalMatch[1]} marks`, marginL, y);
      y += 7;
      continue;
    }

    // ── "Answer EITHER…" / "Answer one essay…" instruction lines ──
    if (/^answer\s+(either|one|all)/i.test(line.replace(/[#*]/g, "").trim())) {
      y = ensureSpace(doc, y, 8, pageH);
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(60, 60, 60);
      const clean = line.replace(/[#*]/g, "").trim();
      const wrapped = doc.splitTextToSize(clean, maxW);
      for (const wl of wrapped) {
        doc.text(wl, marginL, y);
        y += lineH;
      }
      y += 2;
      continue;
    }

    // ── Regular paragraph text ──
    y = ensureSpace(doc, y, lineH, pageH);
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);

    const cleanLine = line
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1");

    const isBold = /^\*\*/.test(line.trim());
    doc.setFont("helvetica", isBold ? "bold" : "normal");

    const wrapped = doc.splitTextToSize(cleanLine, maxW);
    for (const wl of wrapped) {
      y = ensureSpace(doc, y, lineH, pageH);
      doc.text(wl, marginL, y);
      y += lineH;
    }
  }
}

// ─── Main Export ────────────────────────────────────────────────────

export function generatePaperPdf(
  title: string,
  content: string,
  meta?: { subject?: string; examBoard?: string; level?: string; tier?: string }
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Determine paper number from title
  const paperNumMatch = title.match(/Paper\s*(\d)/i);
  const paperNumber = paperNumMatch ? paperNumMatch[1] : "1";

  const paperTitles: Record<string, string> = {
    "1": "Paper 1 Markets and Market Failure",
    "2": "Paper 2 National and International Economy",
    "3": "Paper 3 Economic Principles and Issues",
  };

  const fullMeta: PaperMeta = {
    subject: meta?.subject || "Economics",
    examBoard: meta?.examBoard || "AQA",
    level: meta?.level || "A-level",
    tier: meta?.tier,
    paperNumber,
    paperTitle: paperTitles[paperNumber] || title,
    date: "AI-Generated Predicted Paper",
    timeAllowed: "2 hours",
    totalMarks: 80,
    paperRef: `7136/${paperNumber}`,
  };

  // Page 1: Cover page
  drawCoverPage(doc, fullMeta);

  // Page 2+: Content
  doc.addPage();
  renderContent(doc, content, fullMeta);

  // Footers on every page
  drawFooters(doc, fullMeta, 20);

  // Download
  const safeName = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
  doc.save(`${safeName}.pdf`);
}
