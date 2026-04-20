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
    const tokens = renderToTokens(md);
    // eslint-disable-next-line no-console
    console.log("TOKENS:", tokens.length, tokens.slice(0, 80));
    expect(tokens.some((t) => t.includes("without"))).toBe(true);
    expect(tokens.some((t) => t.includes("industrial"))).toBe(true);
    expect(tokens.some((t) => t.includes("emissions"))).toBe(true);
    const singleLetters = tokens.filter((t) => /^[a-z]$/i.test(t));
    expect(singleLetters.length).toBeLessThan(3);
  });

  it("does not force-justify final lines (no large inter-character gaps)", () => {
    const md = "This is a short final line.";
    const tokens = renderToTokens(md);
    // No long run of single-letter tokens (the symptom of letter-spacing
    // based justification).
    let maxRun = 0,
      run = 0;
    for (const t of tokens) {
      if (/^[a-z]$/i.test(t)) {
        run++;
        maxRun = Math.max(maxRun, run);
      } else {
        run = 0;
      }
    }
    expect(maxRun).toBeLessThan(3);
  });

  it("preserves real short words like 'the', 'ETS', '9-14'", () => {
    const md = "The ETS reduced emissions by 9-14 M tonnes a year.";
    const tokens = renderToTokens(md);
    expect(tokens.some((t) => t.includes("ETS"))).toBe(true);
    expect(tokens.some((t) => t.includes("9-14"))).toBe(true);
    expect(tokens.some((t) => t.includes("The"))).toBe(true);
  });
});
