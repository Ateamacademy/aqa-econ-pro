export interface EdexcelPastPaper {
  id: string;
  paper: 1 | 2 | 3;
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Economics/A-level/Past-Papers/Edexcel-B";

function pdfUrl(paper: number, label: string) {
  return `${PMT}/Paper-${paper}/${encodeURIComponent(label)}.pdf`;
}

const years: (number | "Specimen")[] = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, "Specimen"];

function fileLabel(y: number | "Specimen", type: "QP" | "MS", paper: number) {
  const prefix = y === "Specimen" ? "Specimen" : `June ${y}`;
  return `${prefix} ${type} - Paper ${paper} Edexcel (B) Economics A-level`;
}

export const edexcelBPastPapers: EdexcelPastPaper[] = [];

for (const paper of [1, 2, 3] as const) {
  for (const year of years) {
    edexcelBPastPapers.push({
      id: `edxb-p${paper}-${year}-qp`,
      paper,
      year,
      type: "Question Paper",
      url: pdfUrl(paper, fileLabel(year, "QP", paper)),
    });
    edexcelBPastPapers.push({
      id: `edxb-p${paper}-${year}-ms`,
      paper,
      year,
      type: "Mark Scheme",
      url: pdfUrl(paper, fileLabel(year, "MS", paper)),
    });
  }
}

export const edexcelBPaperTitles: Record<number, string> = {
  1: "Markets, Consumers & Firms",
  2: "The Wider Economic Environment",
  3: "The Global Economy",
};
