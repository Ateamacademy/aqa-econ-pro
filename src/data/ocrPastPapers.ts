export interface OcrPastPaper {
  id: string;
  component: 1 | 2 | 3;
  year: number | "Practice" | "Sample";
  session: "jun" | "practice" | "sample";
  type: "Question Paper" | "Mark Scheme" | "Insert";
  url: string;
  label: string;
}

/**
 * OCR A-Level Economics H460
 * Component 01: Microeconomics
 * Component 02: Macroeconomics
 * Component 03: Themes in Economics
 *
 * Papers sourced from official Dropbox resource folder.
 */

const DB = "https://www.dropbox.com/scl/fo/dy5554llvn79ltkaywac8";

function dbUrl(path: string, id: string) {
  return `${DB}/${id}/A-Level%20OCR%20Economis%20Full/${encodeURIComponent(path).replace(/%2F/g, "/")}?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`;
}

export const ocrPastPapers: OcrPastPaper[] = [
  // ── 2025 Papers ──
  {
    id: "ocr-c1-2025-jun-qp",
    component: 1,
    year: 2025,
    session: "jun",
    type: "Question Paper",
    label: "2025 Paper 1",
    url: `${DB}/AG7OoEdcsa_aent9S-IEcVU/A-Level%20OCR%20Economis%20Full/2025%20Papers/Papers/A%20Level%20Economics%20Paper%201.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c1-2025-jun-ms",
    component: 1,
    year: 2025,
    session: "jun",
    type: "Mark Scheme",
    label: "2025 Mark Scheme 1",
    url: `${DB}/AAnSql2hWrA70_wldGkSdTo/A-Level%20OCR%20Economis%20Full/2025%20Papers/Mark%20Scheme/Mark%20Scheme%20Paper%201.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c2-2025-jun-qp",
    component: 2,
    year: 2025,
    session: "jun",
    type: "Question Paper",
    label: "2025 Paper 2",
    url: `${DB}/AL4jHz3NMnLg3ReOxPd06is/A-Level%20OCR%20Economis%20Full/2025%20Papers/Papers/A%20Level%20Economics%20Paper%202.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c2-2025-jun-ms",
    component: 2,
    year: 2025,
    session: "jun",
    type: "Mark Scheme",
    label: "2025 Mark Scheme 2",
    url: `${DB}/AJCMRNtoG0bKF15LmOXFVBM/A-Level%20OCR%20Economis%20Full/2025%20Papers/Mark%20Scheme/Mark%20Scheme%20Paper%202.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c3-2025-jun-qp",
    component: 3,
    year: 2025,
    session: "jun",
    type: "Question Paper",
    label: "2025 Paper 3",
    url: `${DB}/AAy6pb_Yu-rTPp6ju2uTJZM/A-Level%20OCR%20Economis%20Full/2025%20Papers/Papers/A%20Level%20Economics%20Paper%203.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c3-2025-jun-ms",
    component: 3,
    year: 2025,
    session: "jun",
    type: "Mark Scheme",
    label: "2025 Mark Scheme 3",
    url: `${DB}/ABGZ-_6AWnp7PXh3UMS-pF8/A-Level%20OCR%20Economis%20Full/2025%20Papers/Mark%20Scheme/Mark%20Scheme%20Paper%203.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },

  // ── Practice Question Papers (H460) ──
  {
    id: "ocr-c1-practice-qp",
    component: 1,
    year: "Practice",
    session: "practice",
    type: "Question Paper",
    label: "Practice Paper (H460/01)",
    url: `${DB}/AKYzo45QtXrtZJfwEZ8LygE/A-Level%20OCR%20Economis%20Full/Practice%20Question%20Papers/Question%20paper_%20Practice%20%28H460_01%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c1-practice-ms",
    component: 1,
    year: "Practice",
    session: "practice",
    type: "Mark Scheme",
    label: "Practice Mark Scheme (H460/01)",
    url: `${DB}/AP4ehUo3YdmAlB-3HbdBdRw/A-Level%20OCR%20Economis%20Full/Mark%20Scheme%20Practice/Mark%20scheme_%20Practice%20%28H460_01%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c2-practice-qp",
    component: 2,
    year: "Practice",
    session: "practice",
    type: "Question Paper",
    label: "Practice Paper (H460/02)",
    url: `${DB}/AO9-IIiSoBQ2N8M3wRLUZz0/A-Level%20OCR%20Economis%20Full/Practice%20Question%20Papers/Question%20paper_%20Practice%20%28H460_02%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c2-practice-ms",
    component: 2,
    year: "Practice",
    session: "practice",
    type: "Mark Scheme",
    label: "Practice Mark Scheme (H460/02)",
    url: `${DB}/AGrFyqeG18cQSRjEC-yNzuU/A-Level%20OCR%20Economis%20Full/Mark%20Scheme%20Practice/Mark%20scheme_%20Practice%20%28H460_02%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c3-practice-qp",
    component: 3,
    year: "Practice",
    session: "practice",
    type: "Question Paper",
    label: "Practice Paper (H460/03)",
    url: `${DB}/ABE27kKpv67L01RCpNTX4C8/A-Level%20OCR%20Economis%20Full/Practice%20Question%20Papers/Question%20paper_%20Practice%20%28H460_03%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c3-practice-ms",
    component: 3,
    year: "Practice",
    session: "practice",
    type: "Mark Scheme",
    label: "Practice Mark Scheme (H460/03)",
    url: `${DB}/AB5HJ_sVYHHMzbD_oQ6Evlw/A-Level%20OCR%20Economis%20Full/Mark%20Scheme%20Practice/Mark%20scheme_%20Practice%20%28H460_03%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },

  // ── Sample Question Papers (H460 A-Level) ──
  {
    id: "ocr-c1-sample-qp",
    component: 1,
    year: "Sample",
    session: "sample",
    type: "Question Paper",
    label: "Sample Paper (H460/01)",
    url: `${DB}/AAUmzBTIuF2AwwYBJUcPyvA/A-Level%20OCR%20Economis%20Full/Sample%20Question%20Paper/Sample%20question%20paper%20%28H460_01%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c2-sample-qp",
    component: 2,
    year: "Sample",
    session: "sample",
    type: "Question Paper",
    label: "Sample Paper (H460/02)",
    url: `${DB}/AGma-sgk2HOvxp8HOTovfJQ/A-Level%20OCR%20Economis%20Full/Sample%20Question%20Paper/Sample%20question%20paper%20%28H460_02%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
  {
    id: "ocr-c3-sample-qp",
    component: 3,
    year: "Sample",
    session: "sample",
    type: "Question Paper",
    label: "Sample Paper (H460/03)",
    url: `${DB}/AESaLp6R72Z1TTHX7e4OlHY/A-Level%20OCR%20Economis%20Full/Sample%20Question%20Paper/Sample%20question%20paper%20%28H460_03%29.pdf?rlkey=c3obohcntjwxus8rfp7qz11x7&dl=1`,
  },
];

export const ocrComponentTitles: Record<number, string> = {
  1: "Component 01 · Microeconomics (H460/01)",
  2: "Component 02 · Macroeconomics (H460/02)",
  3: "Component 03 · Themes in Economics (H460/03)",
};
