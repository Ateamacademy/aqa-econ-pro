import { describe, it, expect } from "vitest";

// We test the exported renderer's underlying behaviour by exercising the same
// content path through generatePaperPdf -> renderPaperMarkdown. To unit-test
// just the spacing repair, we re-implement an inline import via the module's
// public surface: renderPaperMarkdown writes text into the jsPDF doc, and we
// read back the resulting text stream by inspecting the internal output.

import jsPDF from "jspdf";
import { renderPaperMarkdown } from "@/lib/generatePaperPdf";

function renderToTokens(md: string): string[] {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  renderPaperMarkdown(doc, md);
  const raw = doc.output();
  const matches = raw.match(/\(([^()\\]*)\)\s*Tj/g) || [];
  // Each Tj is one drawn string. We split each into whitespace-separated
  // tokens to inspect what jsPDF actually drew on the page.
  return matches
    .map((m) => m.replace(/^\((.*)\)\s*Tj$/, "$1"))
    .flatMap((s) => s.split(/\s+/))
    .filter(Boolean);
}

describe("PDF extract typography", () => {
  it("repairs upstream letter-spaced text (the ETS extract bug)", () => {
    const md =
      "A 2024 CBI survey reported that 41% of energy-intensive UK firms had postponed planned investment in low-carbon production because of allowance price uncertainty. Government modelling suggested t h a t , w i t h o u t t h e ETS, UK i n d u s t r i a l e m i s s i o n s would have been 9-14 M tonnes higher.";
    const rendered = renderToString(md);
    // The pathological run must be repaired
    expect(rendered).toContain("that");
    expect(rendered).toContain("without");
    expect(rendered).toContain("industrial");
    expect(rendered).toContain("emissions");
    // And the broken pattern must be gone
    expect(rendered).not.toMatch(/t\s+h\s+a\s+t/);
    expect(rendered).not.toMatch(/w\s+i\s+t\s+h\s+o\s+u\s+t/);
    expect(rendered).not.toMatch(/i\s+n\s+d\s+u\s+s\s+t\s+r\s+i\s+a\s+l/);
  });

  it("does not force-justify final lines (no large inter-character gaps)", () => {
    const md = "This is a short final line.";
    const rendered = renderToString(md);
    // No single character should appear isolated by spaces (the symptom of
    // letter-spacing-based justification).
    expect(rendered).not.toMatch(/(?:^|\s)[a-z](?:\s[a-z]){3,}/i);
  });

  it("preserves real short words like 'the', 'ETS', '9-14'", () => {
    const md = "The ETS reduced emissions by 9-14 M tonnes a year.";
    const rendered = renderToString(md);
    expect(rendered).toContain("ETS");
    expect(rendered).toContain("9-14");
    expect(rendered).toContain("The");
  });
});
