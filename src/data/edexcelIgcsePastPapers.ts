export interface EdexcelIgcsePastPaper {
  id: string;
  paper: 1 | 2;
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Economics/GCSE/Past-Papers/Edexcel-IGCSE";

function pdfUrl(paper: number, folder: string, label: string) {
  return `${PMT}/Paper-${paper}/${folder}/${encodeURIComponent(label)}.pdf`;
}

const years: (number | "Specimen")[] = [2024, 2023, 2022, 2021, 2020, 2019, "Specimen"];

export const edexcelIgcsePastPapers: EdexcelIgcsePastPaper[] = [];

for (const paper of [1, 2] as const) {
  for (const year of years) {
    const prefix = year === "Specimen" ? "Specimen" : `June ${year}`;

    edexcelIgcsePastPapers.push({
      id: `edxig-p${paper}-${year}-qp`,
      paper,
      year,
      type: "Question Paper",
      url: pdfUrl(paper, "QP", `${prefix} QP`),
    });
    edexcelIgcsePastPapers.push({
      id: `edxig-p${paper}-${year}-ms`,
      paper,
      year,
      type: "Mark Scheme",
      url: pdfUrl(paper, "MS", `${prefix} MS`),
    });
  }
}

export const edexcelIgcsePaperTitles: Record<number, string> = {
  1: "Microeconomics & Business Economics",
  2: "Macroeconomics & the Global Economy",
};
