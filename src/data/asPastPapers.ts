export interface ASPastPaper {
  id: string;
  board: "aqa" | "edexcel-a" | "edexcel-b" | "ocr";
  paper: 1 | 2;
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme" | "Insert";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Economics/A-level/Past-Papers";

/* ── AQA AS (7135) ── */
// Papers 1 & 2, years 2016–2024 + Specimen (no 2021)
const aqaASYears: (number | "Specimen")[] = [2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, "Specimen"];

function aqaASUrl(paper: number, folder: string, label: string) {
  return `${PMT}/AQA/AS-Paper-${paper}/${folder}/${encodeURIComponent(label)}.pdf`;
}

function yearLabel(y: number | "Specimen") {
  return y === "Specimen" ? "Specimen" : `June ${y}`;
}

const aqaAS: ASPastPaper[] = [];
for (const paper of [1, 2] as const) {
  for (const year of aqaASYears) {
    const label = yearLabel(year);
    aqaAS.push({ id: `aqa-as-p${paper}-${year}-qp`, board: "aqa", paper, year, type: "Question Paper", url: aqaASUrl(paper, "QP", `${label} QP`) });
    aqaAS.push({ id: `aqa-as-p${paper}-${year}-ms`, board: "aqa", paper, year, type: "Mark Scheme", url: aqaASUrl(paper, "MS", `${label} MS`) });
    // AQA AS Papers 1 & 2 have inserts
    aqaAS.push({ id: `aqa-as-p${paper}-${year}-in`, board: "aqa", paper, year, type: "Insert", url: aqaASUrl(paper, "IN", `${label} IN`) });
  }
}

/* ── Edexcel A AS ── */
const edxAASYears: (number | "Specimen")[] = [2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, "Specimen"];

function edxAASUrl(paper: number, label: string) {
  return `${PMT}/Edexcel-A/AS-Paper-${paper}/${encodeURIComponent(label)}.pdf`;
}

function edxASLabel(y: number | "Specimen", type: "QP" | "MS", paper: number, spec: "A" | "B") {
  const prefix = y === "Specimen" ? "Specimen" : `June ${y}`;
  return `${prefix} ${type} - AS Paper ${paper} Edexcel (${spec}) Economics A-level`;
}

const edxAAS: ASPastPaper[] = [];
for (const paper of [1, 2] as const) {
  for (const year of edxAASYears) {
    edxAAS.push({ id: `edxa-as-p${paper}-${year}-qp`, board: "edexcel-a", paper, year, type: "Question Paper", url: `${PMT}/Edexcel-A/AS-Paper-${paper}/${encodeURIComponent(edxASLabel(year, "QP", paper, "A"))}.pdf` });
    edxAAS.push({ id: `edxa-as-p${paper}-${year}-ms`, board: "edexcel-a", paper, year, type: "Mark Scheme", url: `${PMT}/Edexcel-A/AS-Paper-${paper}/${encodeURIComponent(edxASLabel(year, "MS", paper, "A"))}.pdf` });
  }
}

/* ── Edexcel B AS ── */
const edxBASYears: (number | "Specimen")[] = [2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, "Specimen"];

const edxBAS: ASPastPaper[] = [];
for (const paper of [1, 2] as const) {
  for (const year of edxBASYears) {
    edxBAS.push({ id: `edxb-as-p${paper}-${year}-qp`, board: "edexcel-b", paper, year, type: "Question Paper", url: `${PMT}/Edexcel-B/AS-Paper-${paper}/${encodeURIComponent(edxASLabel(year, "QP", paper, "B"))}.pdf` });
    edxBAS.push({ id: `edxb-as-p${paper}-${year}-ms`, board: "edexcel-b", paper, year, type: "Mark Scheme", url: `${PMT}/Edexcel-B/AS-Paper-${paper}/${encodeURIComponent(edxASLabel(year, "MS", paper, "B"))}.pdf` });
  }
}

/* ── OCR AS (H060) ── */
const ocrASYears: (number | "Specimen")[] = [2024, 2023, 2022, 2020, 2019, 2018, 2017, 2016, "Specimen"];

function ocrASLabel(y: number | "Specimen", type: "QP" | "MS", paper: number) {
  const prefix = y === "Specimen" ? "Specimen" : `June ${y}`;
  return `${prefix} ${type} - AS Paper ${paper} OCR Economics A-level`;
}

const ocrAS: ASPastPaper[] = [];
for (const paper of [1, 2] as const) {
  for (const year of ocrASYears) {
    ocrAS.push({ id: `ocr-as-p${paper}-${year}-qp`, board: "ocr", paper, year, type: "Question Paper", url: `${PMT}/OCR/AS-Paper-${paper}/${encodeURIComponent(ocrASLabel(year, "QP", paper))}.pdf` });
    ocrAS.push({ id: `ocr-as-p${paper}-${year}-ms`, board: "ocr", paper, year, type: "Mark Scheme", url: `${PMT}/OCR/AS-Paper-${paper}/${encodeURIComponent(ocrASLabel(year, "MS", paper))}.pdf` });
  }
}

export const asPastPapers: ASPastPaper[] = [...aqaAS, ...edxAAS, ...edxBAS, ...ocrAS];

export function getASPapers(board: "aqa" | "edexcel-a" | "edexcel-b" | "ocr") {
  return asPastPapers.filter(p => p.board === board);
}

export const asPaperTitles: Record<string, Record<number, string>> = {
  aqa: { 1: "AS Paper 1 · The Operation of Markets & Market Failure (7135/1)", 2: "AS Paper 2 · The National Economy in a Global Context (7135/2)" },
  "edexcel-a": { 1: "AS Paper 1 · Introduction to Markets and Market Failure", 2: "AS Paper 2 · The UK Economy" },
  "edexcel-b": { 1: "AS Paper 1 · Markets, Consumers and Firms", 2: "AS Paper 2 · The Wider Economic Environment" },
  ocr: { 1: "AS Paper 1 · Microeconomics (H060/01)", 2: "AS Paper 2 · Macroeconomics (H060/02)" },
};
