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
    doc.text("Predicted Paper", pageW - marginL, pageH - 10, { align: "right" });
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
  doc.text(meta.date || "Predicted Paper", marginL, y);
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
  doc.text("Predicted Paper — For revision purposes only", marginL, y);
  doc.text(`7136/${pNum}`, pageW - marginR, y, { align: "right" });
}

// ─── Content Renderer ───────────────────────────────────────────────

export function renderPaperMarkdown(doc: jsPDF, content: string, startY?: number): number {
  return renderContent(doc, content, {} as PaperMeta, startY);
}

function renderContent(doc: jsPDF, content: string, meta: PaperMeta, startY?: number): number {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginL = 20;
  const marginR = 20;
  const maxW = pageW - marginL - marginR;
  const lineH = 5.5;
  let y = startY ?? 25;

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

      // Check if following lines describe a line chart (axis + data points)
      // Collect figure description lines
      const figLines: string[] = [];
      let fli = li + 1;
      while (fli < lines.length) {
        const fl = lines[fli].trim();
        if (!fl || /^#{1,4}\s/.test(fl) || /^Question\s/i.test(fl) || /^\*{0,2}(?:Figure|Table|Extract)\s/i.test(fl)) break;
        figLines.push(fl);
        fli++;
      }

      // Detect if this is a line chart figure (supports both explicit year:value lines and narrative trends)
      const lineDataSets: { label: string; points: { year: string; value: number }[] }[] = [];
      let currentSet: { label: string; points: { year: string; value: number }[] } | null = null;
      let axisLabels = { x: "", y: "" };

      for (const fl of figLines) {
        const vAxisMatch = fl.match(/vertical\s*axis:\s*(.+)/i);
        if (vAxisMatch) { axisLabels.y = vAxisMatch[1].trim(); continue; }
        const hAxisMatch = fl.match(/horizontal\s*axis:\s*(.+)/i);
        if (hAxisMatch) { axisLabels.x = hAxisMatch[1].trim(); continue; }
        const lineMatch = fl.match(/^-?\s*Line\s+\d+\s*\(([^)]+)\):\s*(.+)/i);
        if (lineMatch) {
          if (currentSet) lineDataSets.push(currentSet);
          currentSet = { label: lineMatch[2].trim(), points: [] };
          continue;
        }
        const dataMatch = fl.match(/^-?\s*(\d{4}):\s*([\d.]+)%?/);
        if (dataMatch && currentSet) {
          currentSet.points.push({ year: dataMatch[1], value: parseFloat(dataMatch[2]) });
        }
      }
      if (currentSet && currentSet.points.length > 0) lineDataSets.push(currentSet);

      // Narrative trend fallback (e.g. "upward trend from 28% in 2010 to 35% in 2024")
      if (lineDataSets.length === 0) {
        const normalized = figLines.join(" ");
        const fromToMatch = normalized.match(/from\s+([\d,.]+)\s*[^,\n]*?\s+in\s+(\d{4})\s+to\s+([\d,.]+)\s*[^,\n]*?\s+in\s+(\d{4})/i);
        if (fromToMatch) {
          const startValue = parseFloat(fromToMatch[1].replace(/,/g, ""));
          const startYear = parseInt(fromToMatch[2], 10);
          const endValue = parseFloat(fromToMatch[3].replace(/,/g, ""));
          const endYear = parseInt(fromToMatch[4], 10);

          if (Number.isFinite(startValue) && Number.isFinite(endValue) && Number.isFinite(startYear) && Number.isFinite(endYear) && endYear > startYear) {
            const points: { year: string; value: number }[] = [];
            const span = endYear - startYear;
            for (let year = startYear; year <= endYear; year++) {
              const progress = (year - startYear) / span;
              const value = startValue + (endValue - startValue) * progress;
              points.push({ year: String(year), value: Math.round(value * 100) / 100 });
            }

            const flatRangeMatch = normalized.match(/flat\s+trend\s+from\s+(\d{4})\s*(?:-|–|to)\s*(\d{4})/i);
            if (flatRangeMatch) {
              const flatStart = parseInt(flatRangeMatch[1], 10);
              const flatEnd = parseInt(flatRangeMatch[2], 10);
              for (const point of points) {
                const year = parseInt(point.year, 10);
                if (year >= flatStart && year <= flatEnd) {
                  point.value = Math.round(endValue * 100) / 100;
                }
              }
            }

            lineDataSets.push({ label: axisLabels.y || "Value", points });
            if (!axisLabels.x) axisLabels.x = "Year";
          }
        }
      }

      // Check if it's an S&D / economics diagram figure
      const figDescJoined = figLines.join(" ").toLowerCase();
      const figDescRaw = figLines.join(" ");
      const hasDiagramFamily = /Diagram\s+family:\s*\S+/i.test(figDescRaw);
      const hasCurveRefs = /[ds][₀₁01]/i.test(figDescRaw) || (/demand/i.test(figDescJoined) && /supply/i.test(figDescJoined) && /shift/i.test(figDescJoined));
      
      if ((hasCurveRefs || hasDiagramFamily) && lineDataSets.length === 0) {
        li = fli - 1; // Skip processed lines

        const diagramW = maxW * 0.7;
        const diagramH = 70;
        const dX = marginL + (maxW - diagramW) / 2 + 12;
        y = ensureSpace(doc, y, diagramH + 35, pageH);
        const dY0 = y + 8;
        const dYEnd = dY0 + diagramH;
        const dXEnd = dX + diagramW;

        // Draw axes
        doc.setDrawColor(40, 40, 40);
        doc.setLineWidth(0.6);
        doc.line(dX, dY0, dX, dYEnd); // Y axis
        doc.line(dX, dYEnd, dXEnd, dYEnd); // X axis

        // Axis labels
        const figJoined = figLines.join("\n");
        const vAxisM = figJoined.match(/vertical\s*axis:\s*(.+)/i);
        const hAxisM = figJoined.match(/horizontal\s*axis:\s*(.+)/i);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 30, 30);
        doc.text(vAxisM?.[1]?.trim() || "Price (P)", dX - 3, dY0 - 2, { align: "right" });
        doc.text(hAxisM?.[1]?.trim() || "Quantity (Q)", dXEnd + 2, dYEnd + 4);
        doc.text("O", dX - 3, dYEnd + 4, { align: "right" });

        // Determine shifts
        const demandRight = /demand\b[^.]*shift[^.]*right/i.test(figDescJoined) || /demand\b[^.]*increase/i.test(figDescJoined);
        const demandLeft = /demand\b[^.]*shift[^.]*left/i.test(figDescJoined) || /demand\b[^.]*decrease/i.test(figDescJoined);
        const supplyRight = /supply\b[^.]*shift[^.]*right/i.test(figDescJoined) || /supply\b[^.]*increase/i.test(figDescJoined);
        const supplyLeft = /supply\b[^.]*shift[^.]*left/i.test(figDescJoined) || /supply\b[^.]*decrease/i.test(figDescJoined);
        const dShift = demandRight ? 18 : demandLeft ? -18 : 0;
        const sShift = supplyRight ? 12 : supplyLeft ? -12 : 0;

        // Original curves
        const d0x1 = dX + 8, d0y1 = dY0 + 4;
        const d0x2 = dXEnd - 8, d0y2 = dYEnd - 4;
        const s0x1 = dX + 8, s0y1 = dYEnd - 4;
        const s0x2 = dXEnd - 8, s0y2 = dY0 + 4;

        // Draw D₀
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.5);
        doc.line(d0x1, d0y1, d0x2, d0y2);
        doc.setFontSize(6.5);
        doc.setTextColor(0, 102, 204);
        doc.text("D₀", d0x2 + 1, d0y2 + 3);

        // Draw S₀
        doc.setDrawColor(220, 50, 50);
        doc.setLineWidth(0.5);
        doc.line(s0x1, s0y1, s0x2, s0y2);
        doc.setTextColor(220, 50, 50);
        doc.text("S₀", s0x2 + 1, s0y2 - 1);

        // Calculate E₀ intersection
        const denomE0 = (d0x1 - d0x2) * (s0y1 - s0y2) - (d0y1 - d0y2) * (s0x1 - s0x2);
        const t0 = ((d0x1 - s0x1) * (s0y1 - s0y2) - (d0y1 - s0y1) * (s0x1 - s0x2)) / denomE0;
        const e0x = d0x1 + t0 * (d0x2 - d0x1);
        const e0y = d0y1 + t0 * (d0y2 - d0y1);

        // Draw shifted curves if applicable
        if (dShift !== 0) {
          doc.setDrawColor(0, 70, 180);
          doc.setLineWidth(0.5);
          doc.line(d0x1 + dShift, d0y1, d0x2 + dShift, d0y2);
          doc.setTextColor(0, 70, 180);
          doc.text("D₁", d0x2 + dShift + 1, d0y2 + 3);
        }
        if (sShift !== 0) {
          doc.setDrawColor(180, 30, 30);
          doc.setLineWidth(0.5);
          doc.line(s0x1 + sShift, s0y1, s0x2 + sShift, s0y2);
          doc.setTextColor(180, 30, 30);
          doc.text("S₁", s0x2 + sShift + 1, s0y2 - 1);
        }

        // E₀ dot and projection
        doc.setFillColor(5, 150, 105);
        doc.circle(e0x, e0y, 1, "F");
        doc.setDrawColor(5, 150, 105);
        doc.setLineWidth(0.15);
        doc.setLineDashPattern([1, 1], 0);
        doc.line(dX, e0y, e0x, e0y);
        doc.line(e0x, e0y, e0x, dYEnd);
        doc.setLineDashPattern([], 0);
        doc.setFontSize(6);
        doc.setTextColor(5, 150, 105);
        doc.text("E₀", e0x + 2, e0y - 2);
        doc.text("P₀", dX - 3, e0y + 1, { align: "right" });
        doc.text("Q₀", e0x, dYEnd + 4, { align: "center" });

        // Calculate E₁
        const d1x1 = d0x1 + dShift, d1x2 = d0x2 + dShift;
        const s1x1 = s0x1 + sShift, s1x2 = s0x2 + sShift;
        const denomE1 = (d1x1 - d1x2) * (s0y1 - s0y2) - (d0y1 - d0y2) * (s1x1 - s1x2);
        if (Math.abs(denomE1) > 0.001) {
          const t1 = ((d1x1 - s1x1) * (s0y1 - s0y2) - (d0y1 - s0y1) * (s1x1 - s1x2)) / denomE1;
          const e1x = d1x1 + t1 * (d1x2 - d1x1);
          const e1y = d0y1 + t1 * (d0y2 - d0y1);

          doc.setFillColor(217, 119, 6);
          doc.circle(e1x, e1y, 1, "F");
          doc.setDrawColor(217, 119, 6);
          doc.setLineWidth(0.15);
          doc.setLineDashPattern([1, 1], 0);
          doc.line(dX, e1y, e1x, e1y);
          doc.line(e1x, e1y, e1x, dYEnd);
          doc.setLineDashPattern([], 0);
          doc.setFontSize(6);
          doc.setTextColor(217, 119, 6);
          doc.text("E₁", e1x + 2, e1y - 2);
          doc.text("P₁", dX - 3, e1y + 1, { align: "right" });
          doc.text("Q₁", e1x, dYEnd + 4, { align: "center" });
        }

        // Source
        const sourceText = figLines.join(" ").match(/Source:\s*.+/i)?.[0];
        if (sourceText) {
          doc.setFontSize(6.5);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(100, 100, 100);
          doc.text(doc.splitTextToSize(sourceText.replace(/^[•\-*\s]+/, "").trim(), diagramW), dX, dYEnd + 10);
          y = dYEnd + 16;
        } else {
          y = dYEnd + 8;
        }
        continue;
      }

      // Draw chart if we have data
      if (lineDataSets.length > 0 && lineDataSets[0].points.length > 1) {
        li = fli - 1; // Skip processed lines

        const chartW = maxW * 0.85;
        const chartH = 55;
        const chartX = marginL + 15;
        y = ensureSpace(doc, y, chartH + 30, pageH);
        const chartY0 = y + 5;
        const chartYEnd = chartY0 + chartH;

        // Find min/max values
        const allValues = lineDataSets.flatMap(ds => ds.points.map(p => p.value));
        let minVal = Math.floor(Math.min(...allValues));
        let maxVal = Math.ceil(Math.max(...allValues));
        if (minVal === maxVal) { minVal -= 1; maxVal += 1; }
        const range = maxVal - minVal;

        // Draw axes
        doc.setDrawColor(60, 60, 60);
        doc.setLineWidth(0.4);
        doc.line(chartX, chartY0, chartX, chartYEnd); // Y axis
        doc.line(chartX, chartYEnd, chartX + chartW, chartYEnd); // X axis

        // Y axis labels
        doc.setFontSize(6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        const yTicks = 5;
        for (let t = 0; t <= yTicks; t++) {
          const val = minVal + (range * t) / yTicks;
          const ty = chartYEnd - (chartH * t) / yTicks;
          doc.text(val.toFixed(1), chartX - 2, ty + 1, { align: "right" });
          doc.setDrawColor(220, 220, 220);
          doc.setLineWidth(0.1);
          doc.line(chartX, ty, chartX + chartW, ty);
        }

        // Y axis label
        if (axisLabels.y) {
          doc.setFontSize(6);
          doc.setTextColor(60, 60, 60);
          doc.text(axisLabels.y, marginL, chartY0 - 2);
        }

        // Draw each data set
        const colors: [number, number, number][] = [[0, 102, 204], [220, 50, 50], [40, 160, 40], [180, 100, 0]];
        const years = lineDataSets[0].points.map(p => p.year);
        const xStep = chartW / (years.length - 1);

        // X axis labels
        years.forEach((yr, i) => {
          const tx = chartX + i * xStep;
          doc.setFontSize(6);
          doc.setTextColor(80, 80, 80);
          doc.text(yr, tx, chartYEnd + 4, { align: "center" });
        });

        lineDataSets.forEach((ds, di) => {
          const color = colors[di % colors.length];
          doc.setDrawColor(color[0], color[1], color[2]);
          doc.setLineWidth(di === 0 ? 0.6 : 0.4);

          // Draw line
          for (let pi = 0; pi < ds.points.length - 1; pi++) {
            const x1 = chartX + pi * xStep;
            const x2 = chartX + (pi + 1) * xStep;
            const y1 = chartYEnd - ((ds.points[pi].value - minVal) / range) * chartH;
            const y2 = chartYEnd - ((ds.points[pi + 1].value - minVal) / range) * chartH;

            // Dashed line for second dataset
            if (di > 0) {
              const segments = 8;
              const dx = (x2 - x1) / segments;
              const dy = (y2 - y1) / segments;
              for (let s = 0; s < segments; s += 2) {
                doc.line(x1 + s * dx, y1 + s * dy, x1 + (s + 1) * dx, y1 + (s + 1) * dy);
              }
            } else {
              doc.line(x1, y1, x2, y2);
            }
          }

          // Draw dots
          doc.setFillColor(color[0], color[1], color[2]);
          for (let pi = 0; pi < ds.points.length; pi++) {
            const px = chartX + pi * xStep;
            const py = chartYEnd - ((ds.points[pi].value - minVal) / range) * chartH;
            doc.circle(px, py, 0.8, "F");
          }
        });

        // Legend
        let legendY = chartYEnd + 10;
        doc.setFontSize(6);
        lineDataSets.forEach((ds, di) => {
          const color = colors[di % colors.length];
          doc.setFillColor(color[0], color[1], color[2]);
          doc.rect(chartX, legendY - 1.5, 4, 0.6, "F");
          doc.setTextColor(60, 60, 60);
          doc.text(ds.label, chartX + 6, legendY);
          legendY += 4;
        });

        const sourceText = figLines.join(" ").match(/Source:\s*.+/i)?.[0];
        if (sourceText) {
          doc.setFontSize(6.5);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(100, 100, 100);
          const cleanSource = sourceText.replace(/^[•\-*\s]+/, "").trim();
          doc.text(doc.splitTextToSize(cleanSource, chartW), chartX, legendY + 2);
          y = legendY + 7;
        } else {
          y = legendY + 3;
        }
      }
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

    // ── Table block ──
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      // Collect all contiguous table lines
      const tableLines: string[] = [];
      let tli = li;
      while (tli < lines.length && lines[tli].trim().startsWith("|") && lines[tli].trim().endsWith("|")) {
        tableLines.push(lines[tli].trim());
        tli++;
      }
      // Skip processed lines (minus 1 because the for loop increments)
      li = tli - 1;

      // Parse table: filter out separator rows
      const dataRows = tableLines.filter(r => !/^\|[\s\-:|]+\|$/.test(r));
      if (dataRows.length === 0) continue;

      const parsedRows = dataRows.map(r =>
        r.split("|").filter(c => c.trim() !== "").map(c => c.replace(/\*\*/g, "").trim())
      );
      const numCols = Math.max(...parsedRows.map(r => r.length));

      // Calculate column widths based on content
      doc.setFontSize(7);
      const colWidths: number[] = [];
      for (let ci = 0; ci < numCols; ci++) {
        let maxCellW = 0;
        for (const row of parsedRows) {
          const cellText = row[ci] || "";
          const textW = doc.getTextWidth(cellText);
          maxCellW = Math.max(maxCellW, textW);
        }
        colWidths.push(maxCellW + 6); // padding
      }
      // Scale to fit maxW
      const totalW = colWidths.reduce((a, b) => a + b, 0);
      const scale = totalW > maxW ? maxW / totalW : 1;
      const finalWidths = colWidths.map(w => w * scale);

      // Ensure minimum column width
      const minColW = maxW / (numCols * 2);
      for (let ci = 0; ci < finalWidths.length; ci++) {
        if (finalWidths[ci] < minColW) finalWidths[ci] = minColW;
      }
      // Re-scale if needed after minimum enforcement
      const totalFinal = finalWidths.reduce((a, b) => a + b, 0);
      if (totalFinal > maxW) {
        const s2 = maxW / totalFinal;
        for (let ci = 0; ci < finalWidths.length; ci++) finalWidths[ci] *= s2;
      }

      const rowH = 7;
      const tableH = parsedRows.length * rowH + 2;
      y = ensureSpace(doc, y, tableH, pageH);
      y += 2;

      for (let ri = 0; ri < parsedRows.length; ri++) {
        y = ensureSpace(doc, y, rowH, pageH);
        const row = parsedRows[ri];
        const isHeader = ri === 0;

        // Background for header
        if (isHeader) {
          doc.setFillColor(240, 240, 240);
          doc.rect(marginL, y - 4.5, maxW, rowH, "F");
        }

        doc.setFontSize(7);
        doc.setFont("helvetica", isHeader ? "bold" : "normal");
        doc.setTextColor(0, 0, 0);

        let xOff = marginL;
        for (let ci = 0; ci < numCols; ci++) {
          const cellText = row[ci] || "";
          const cellW = finalWidths[ci];
          // Wrap text within cell
          const wrapped = doc.splitTextToSize(cellText, cellW - 3);
          doc.text(wrapped[0] || "", xOff + 1.5, y);
          xOff += cellW;
        }

        // Row border
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.15);
        doc.line(marginL, y + 2.5, marginL + maxW, y + 2.5);
        y += rowH;
      }
      y += 3;
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
  return y;
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
    date: "Predicted Paper",
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
