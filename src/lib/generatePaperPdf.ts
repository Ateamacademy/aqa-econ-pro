import jsPDF from "jspdf";

/**
 * Generates a formatted PDF from predicted paper markdown content.
 * Handles headings, bold text, tables, and question formatting.
 */
export function generatePaperPdf(
  title: string,
  content: string,
  meta?: { subject?: string; examBoard?: string; level?: string; tier?: string }
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginL = 20;
  const marginR = 20;
  const maxW = pageW - marginL - marginR;
  const lineH = 5.5;
  let y = 20;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // Header bar
  doc.setFillColor(30, 30, 30);
  doc.rect(0, 0, pageW, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const headerLeft = [meta?.examBoard, meta?.level, meta?.subject].filter(Boolean).join(" • ");
  doc.text(headerLeft, marginL, 9);
  if (meta?.tier) {
    doc.text(meta.tier, pageW - marginR, 9, { align: "right" });
  }

  // Title
  y = 24;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(title, maxW);
  doc.text(titleLines, marginL, y);
  y += titleLines.length * 7 + 4;

  // Instruction line
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text("AI-Generated Predicted Paper — For revision purposes only", marginL, y);
  y += 8;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(marginL, y, pageW - marginR, y);
  y += 6;

  // Process content lines
  const lines = content.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Skip empty lines
    if (!line.trim()) {
      y += 3;
      continue;
    }

    // Markdown headings
    const h1 = line.match(/^# (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    const h4 = line.match(/^#### (.+)/);

    if (h1) {
      ensureSpace(14);
      y += 4;
      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      const wrapped = doc.splitTextToSize(h1[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 7 + 3;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(marginL, y, pageW - marginR, y);
      y += 4;
      continue;
    }

    if (h2) {
      ensureSpace(12);
      y += 3;
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(20, 20, 20);
      const wrapped = doc.splitTextToSize(h2[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 6.5 + 3;
      continue;
    }

    if (h3) {
      ensureSpace(10);
      y += 2;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      const wrapped = doc.splitTextToSize(h3[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 5.5 + 2;
      continue;
    }

    if (h4) {
      ensureSpace(10);
      y += 2;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      const wrapped = doc.splitTextToSize(h4[1], maxW);
      doc.text(wrapped, marginL, y);
      y += wrapped.length * 5 + 2;
      continue;
    }

    // Question line (bold + marks badge)
    const questionMatch = line.match(/^(Question\s+\S+(?:\s*\([a-z]\))?)\s*\[(\d+)\s*marks?\]/i);
    if (questionMatch) {
      ensureSpace(10);
      y += 2;
      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(questionMatch[1], marginL, y);
      // Marks badge
      const badgeText = `${questionMatch[2]} marks`;
      const badgeW = doc.getTextWidth(badgeText) + 6;
      const badgeX = pageW - marginR - badgeW;
      doc.setFillColor(235, 235, 235);
      doc.roundedRect(badgeX, y - 3.5, badgeW, 5, 1.5, 1.5, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(badgeText, badgeX + 3, y);
      y += 6;
      continue;
    }

    // Table rows (simple | delimited)
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      // Skip separator lines
      if (/^\|[\s\-:|]+\|$/.test(line.trim())) continue;

      ensureSpace(7);
      const cells = line.split("|").filter((c) => c.trim()).map((c) => c.trim());
      const colW = maxW / cells.length;
      doc.setFontSize(8.5);
      doc.setTextColor(0, 0, 0);

      // Detect header row (first table row is usually header)
      const isHeader = /\*\*/.test(line);
      doc.setFont("helvetica", isHeader ? "bold" : "normal");

      cells.forEach((cell, i) => {
        const clean = cell.replace(/\*\*/g, "");
        doc.text(clean, marginL + i * colW + 2, y, { maxWidth: colW - 4 });
      });

      // Row border
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.line(marginL, y + 2, pageW - marginR, y + 2);
      y += lineH + 1;
      continue;
    }

    // Regular paragraph text
    ensureSpace(lineH);
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);

    // Handle bold segments
    const cleanLine = line
      .replace(/\*\*(.+?)\*\*/g, "$1")  // strip markdown bold for PDF
      .replace(/\*(.+?)\*/g, "$1")       // strip italic
      .replace(/`(.+?)`/g, "$1");        // strip code

    const isBold = /^\*\*/.test(line.trim());
    doc.setFont("helvetica", isBold ? "bold" : "normal");

    const wrapped = doc.splitTextToSize(cleanLine, maxW);
    for (const wl of wrapped) {
      ensureSpace(lineH);
      doc.text(wl, marginL, y);
      y += lineH;
    }
  }

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${totalPages}`, pageW / 2, pageH - 10, { align: "center" });
    doc.text("Generated by AQA Econ Pro", marginL, pageH - 10);
  }

  // Download
  const safeName = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
  doc.save(`${safeName}.pdf`);
}
