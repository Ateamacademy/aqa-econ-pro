export interface OcrPastPaper {
  id: string;
  component: 1 | 2 | 3;
  year: number;
  session: "jun" | "oct";
  type: "Question Paper" | "Mark Scheme" | "Insert";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Economics/A-level/Past-Papers/OCR";

/**
 * OCR A-Level Economics H460
 * Component 01: Microeconomics
 * Component 02: Macroeconomics
 * Component 03: Themes in Economics
 * Available from 2017 (first exam) onwards
 */

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017] as const;
const components = [1, 2, 3] as const;
const sessions: Array<{ code: "jun" | "oct"; label: string }> = [
  { code: "jun", label: "June" },
];

export const ocrPastPapers: OcrPastPaper[] = [];

for (const year of years) {
  for (const comp of components) {
    const compStr = String(comp).padStart(2, "0"); // "01", "02", "03"
    const yrShort = String(year).slice(2);

    // PapaCambridge URL pattern for OCR
    const baseUrl = `https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload`;

    // PMT-style URLs (more reliable for OCR)
    const qpUrl = `${PMT}/H460-${compStr}/June%20${year}/H460-${compStr}-QP-Jun${yrShort}.pdf`;
    const msUrl = `${PMT}/H460-${compStr}/June%20${year}/H460-${compStr}-MS-Jun${yrShort}.pdf`;

    ocrPastPapers.push({
      id: `ocr-c${comp}-${year}-jun-qp`,
      component: comp as 1 | 2 | 3,
      year,
      session: "jun",
      type: "Question Paper",
      url: qpUrl,
    });

    ocrPastPapers.push({
      id: `ocr-c${comp}-${year}-jun-ms`,
      component: comp as 1 | 2 | 3,
      year,
      session: "jun",
      type: "Mark Scheme",
      url: msUrl,
    });

    // Components 02 and 03 may have inserts
    if (comp === 2 || comp === 3) {
      ocrPastPapers.push({
        id: `ocr-c${comp}-${year}-jun-in`,
        component: comp as 1 | 2 | 3,
        year,
        session: "jun",
        type: "Insert",
        url: `${PMT}/H460-${compStr}/June%20${year}/H460-${compStr}-Insert-Jun${yrShort}.pdf`,
      });
    }
  }
}

export const ocrComponentTitles: Record<number, string> = {
  1: "Component 01 — Microeconomics (H460/01)",
  2: "Component 02 — Macroeconomics (H460/02)",
  3: "Component 03 — Themes in Economics (H460/03)",
};
