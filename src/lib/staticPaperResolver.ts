/**
 * Resolves a predicted-paper library id to a curated static PDF URL
 * (question paper + mark scheme) when one exists in /public/*-mocks/.
 *
 * Returning null means no static PDF · caller should fall back to dynamic
 * generation.
 */

export type PaperKind = "paper" | "mark-scheme";

export interface StaticPaperPdf {
  /** Public URL to the PDF. */
  url: string;
  /** Suggested filename for the download attribute. */
  filename: string;
  /** Toast label for download success. */
  label: string;
}

interface BoardConfig {
  /** Regex must capture: $1 = paper number, $2 = set letter (a/b/c/...). */
  pattern: RegExp;
  folder: string;
  /** Used in filename + toast label. */
  displayName: string;
  /** Map set letter (lowercase) → tier slug. Letters not in map → no static PDF. */
  tierMap: Record<string, string>;
  /** Optional: restrict which paper numbers have static PDFs. Default = all. */
  allowedPapers?: string[];
}

const BOARDS: BoardConfig[] = [
  // AQA A-Level Economics
  {
    pattern: /^econ-p([123])-([abc])$/i,
    folder: "/aqa-mocks",
    displayName: "AQA-A-Level-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // AQA AS Economics · Paper 1 only (7135/1)
  {
    pattern: /^econ-as(1)-([abc])$/i,
    folder: "/aqa-as-mocks",
    displayName: "AQA-AS-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
    allowedPapers: ["1"],
  },
  // Edexcel A A-Level
  {
    pattern: /^edxa-p([123])-([abc])$/i,
    folder: "/edexcel-a-mocks",
    displayName: "Edexcel-A-Level-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // Edexcel B A-Level
  {
    pattern: /^edxb-p([123])-([abc])$/i,
    folder: "/edexcel-b-mocks",
    displayName: "Edexcel-B-A-Level-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // CAIE A-Level (Cambridge 9708) · id pattern: caie-p{1-4}-set-{a-e}
  // Only Paper 3 is wired to static PDFs (uploaded by user).
  {
    pattern: /^caie-p([1234])-set-([abcde])$/i,
    folder: "/caie-mocks",
    displayName: "CAIE-A-Level-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // IB Diploma Economics · id pattern: ib-p{1-3}-{a|b|c}
  {
    pattern: /^ib-p([123])-([abc])$/i,
    folder: "/ib-mocks",
    displayName: "IB-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // CAIE IGCSE Economics · id pattern: igcse-p{1-2}-{a|b|c} (sometimes p3)
  {
    pattern: /^igcse-p([123])-([abc])$/i,
    folder: "/caie-igcse-mocks",
    displayName: "CAIE-IGCSE-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // Edexcel IGCSE · id pattern: edxigcse-p{1-2}-{a|b|c} (no p3 PDFs available)
  {
    pattern: /^edxigcse-p([12])-([abc])$/i,
    folder: "/edexcel-igcse-mocks",
    displayName: "Edexcel-IGCSE-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
    allowedPapers: ["1", "2"],
  },
  // OCR A-Level · id pattern: ocr-c0{N}-set-{a-f}
  {
    pattern: /^ocr-c0([123])-set-([abcdef])$/i,
    folder: "/ocr-mocks",
    displayName: "OCR-A-Level-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // OCR GCSE
  {
    pattern: /^ocrgcse-p([123])-([abc])$/i,
    folder: "/ocr-gcse-mocks",
    displayName: "OCR-GCSE-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // AQA GCSE
  {
    pattern: /^gcse-p([123])-([abc])$/i,
    folder: "/aqa-gcse-mocks",
    displayName: "AQA-GCSE-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // WJEC A-Level
  {
    pattern: /^wjec-p([123])-([abc])$/i,
    folder: "/wjec-mocks",
    displayName: "WJEC-A-Level-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
  // Eduqas A-Level
  {
    pattern: /^eduqas-p([123])-([abc])$/i,
    folder: "/eduqas-mocks",
    displayName: "Eduqas-A-Level-Economics",
    tierMap: { a: "moderate", b: "hard", c: "advanced" },
  },
];

/**
 * Returns a static PDF descriptor for the given library paper id, or null
 * if no curated PDF exists for that id/kind.
 */
export function resolveStaticPaperPdf(
  paperId: string | undefined,
  kind: PaperKind,
): StaticPaperPdf | null {
  if (!paperId) return null;

  for (const board of BOARDS) {
    const match = paperId.match(board.pattern);
    if (!match) continue;

    const paperNum = match[1];
    const setLetter = match[2].toLowerCase();
    const tierSlug = board.tierMap[setLetter];
    if (!tierSlug) return null;
    if (board.allowedPapers && !board.allowedPapers.includes(paperNum)) return null;

    const fileBase = kind === "mark-scheme"
      ? `mark-scheme-paper-${paperNum}-${tierSlug}.pdf`
      : `paper-${paperNum}-${tierSlug}.pdf`;

    const url = `${board.folder}/${fileBase}`;
    const filename = kind === "mark-scheme"
      ? `${board.displayName}-Paper-${paperNum}-${tierSlug}-Mark-Scheme.pdf`
      : `${board.displayName}-Paper-${paperNum}-${tierSlug}.pdf`;
    const label = kind === "mark-scheme" ? "Mark scheme downloaded!" : "PDF downloaded!";

    return { url, filename, label };
  }

  return null;
}

/** Trigger a browser download for a static PDF descriptor. */
export function triggerStaticPdfDownload(pdf: StaticPaperPdf): void {
  const a = document.createElement("a");
  a.href = pdf.url;
  a.download = pdf.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
