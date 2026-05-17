/**
 * Regenerate /public/aqa-mocks/paper-2-*.pdf and mark-scheme-paper-2-*.pdf
 * from the canonical AQA A-Level 7136/2 overrides. The previously checked-in
 * files were AQA GCSE (8136/2) content uploaded by mistake.
 *
 * Run with:  bun scripts/build-aqa-paper2-pdfs.mjs
 */
import { writeFileSync } from "node:fs";
import { jsPDF } from "jspdf";
import {
  getAqaPaper2OverrideContent,
  getAqaPaper2OverrideMarkScheme,
} from "../src/data/aqaPaper2Overrides.ts";

const TIERS = [
  { id: "econ-p2-a", tier: "moderate", label: "Moderate" },
  { id: "econ-p2-b", tier: "hard", label: "Hard" },
  { id: "econ-p2-c", tier: "advanced", label: "Advanced" },
];

const PAGE = { w: 595.28, h: 841.89, margin: 56 };
const LINE_H = 14;
const MAX_W = PAGE.w - PAGE.margin * 2;

function renderMarkdownToPdf(md, filename, headerTitle) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.setFont("helvetica", "normal");
  let y = PAGE.margin;

  function ensureSpace(needed = LINE_H) {
    if (y + needed > PAGE.h - PAGE.margin) {
      doc.addPage();
      y = PAGE.margin;
    }
  }

  function writeLines(text, size, weight) {
    doc.setFont("helvetica", weight);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, MAX_W);
    for (const line of lines) {
      ensureSpace(size + 4);
      doc.text(line, PAGE.margin, y);
      y += size + 4;
    }
  }

  // Header band
  doc.setFillColor(8, 11, 20);
  doc.rect(0, 0, PAGE.w, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(headerTitle, PAGE.margin, 26);
  doc.setTextColor(20, 20, 20);
  y = 70;

  const lines = md.split("\n");
  for (const raw of lines) {
    const line = raw.replace(/\r/g, "");
    if (!line.trim()) {
      y += LINE_H * 0.6;
      continue;
    }
    if (line.startsWith("# ")) {
      y += 8;
      writeLines(line.slice(2), 18, "bold");
      y += 4;
    } else if (line.startsWith("## ")) {
      y += 6;
      writeLines(line.slice(3), 14, "bold");
      y += 2;
    } else if (line.startsWith("### ")) {
      y += 4;
      writeLines(line.slice(4), 12, "bold");
    } else if (line.startsWith("**") && line.endsWith("**")) {
      writeLines(line.replace(/\*\*/g, ""), 11, "bold");
    } else if (line.startsWith("---")) {
      ensureSpace(8);
      doc.setDrawColor(200);
      doc.line(PAGE.margin, y, PAGE.w - PAGE.margin, y);
      y += 10;
    } else if (line.startsWith("![")) {
      // skip image markdown — render caption only
      const cap = line.match(/!\[([^\]]+)\]/)?.[1];
      if (cap) writeLines(`[Figure: ${cap}]`, 10, "italic");
    } else if (line.startsWith("|")) {
      writeLines(line, 9, "normal");
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      writeLines(line.replace(/\*/g, ""), 10, "italic");
    } else {
      // strip simple inline ** and *
      const clean = line.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
      writeLines(clean, 11, "normal");
    }
  }

  // Footer page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(`Page ${i} of ${pageCount}`, PAGE.w - PAGE.margin, PAGE.h - 24, { align: "right" });
    doc.text("AQA A-Level Economics · 7136/2 · Predicted Paper", PAGE.margin, PAGE.h - 24);
  }

  const buf = Buffer.from(doc.output("arraybuffer"));
  writeFileSync(filename, buf);
  console.log(`✓ ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
}

for (const { id, tier, label } of TIERS) {
  const paperMd = getAqaPaper2OverrideContent(id);
  const msMd = getAqaPaper2OverrideMarkScheme(id);
  if (!paperMd || !msMd) {
    throw new Error(`Missing override content for ${id}`);
  }
  writeFileSync(`public/aqa-mocks/paper-2-${tier}.md`, `<!-- Auto-generated from aqaPaper2Overrides.ts (${label}) -->\n${paperMd}\n`);
  writeFileSync(`public/aqa-mocks/mark-scheme-paper-2-${tier}.md`, `<!-- Auto-generated from aqaPaper2Overrides.ts (${label}) -->\n${msMd}\n`);
  renderMarkdownToPdf(
    paperMd,
    `public/aqa-mocks/paper-2-${tier}.pdf`,
    `AQA A-Level Economics · 7136/2 · Predicted Paper · ${label}`,
  );
  renderMarkdownToPdf(
    msMd,
    `public/aqa-mocks/mark-scheme-paper-2-${tier}.pdf`,
    `AQA A-Level Economics · 7136/2 · Mark Scheme · ${label}`,
  );
}

console.log("Done.");
