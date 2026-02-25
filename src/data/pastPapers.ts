export interface PastPaper {
  id: string;
  paper: 1 | 2 | 3;
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme" | "Insert";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Economics/A-level/Past-Papers/AQA";

function pdfUrl(paper: number, folder: string, label: string) {
  return `${PMT}/Paper-${paper}/${folder}/${encodeURIComponent(label)}.pdf`;
}

const years: (number | "Specimen")[] = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, "Specimen"];

function yearLabel(y: number | "Specimen") {
  return y === "Specimen" ? "Specimen" : `June ${y}`;
}

export const pastPapers: PastPaper[] = [];

for (const paper of [1, 2, 3] as const) {
  for (const year of years) {
    const label = yearLabel(year);

    pastPapers.push({
      id: `p${paper}-${year}-qp`,
      paper,
      year,
      type: "Question Paper",
      url: pdfUrl(paper, "QP", `${label} QP`),
    });

    pastPapers.push({
      id: `p${paper}-${year}-ms`,
      paper,
      year,
      type: "Mark Scheme",
      url: pdfUrl(paper, "MS", `${label} MS`),
    });

    // Paper 3 also has Insert documents
    if (paper === 3) {
      pastPapers.push({
        id: `p${paper}-${year}-in`,
        paper,
        year,
        type: "Insert",
        url: pdfUrl(paper, "IN", `${label} IN`),
      });
    }
  }
}

export const paperTitles: Record<number, string> = {
  1: "Markets & Market Failure",
  2: "National & International Economy",
  3: "Economic Principles & Issues",
};
