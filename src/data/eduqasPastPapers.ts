export interface EduqasPastPaper {
  id: string;
  paper: 1 | 2 | 3;
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Economics/A-level/Past-Papers/WJEC-England";

function pdfUrl(component: number, label: string) {
  return `${PMT}/Component-${component}/${encodeURIComponent(label)}.pdf`;
}

const years: (number | "Specimen")[] = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, "Specimen"];

export const eduqasPastPapers: EduqasPastPaper[] = [];

for (const component of [1, 2, 3] as const) {
  for (const year of years) {
    const prefix = year === "Specimen" ? "Specimen" : typeof year === "number" && year <= 2020 ? `October ${year}` : `June ${year}`;
    // Naming convention changed around 2021 from "WJEC" to "Eduqas"
    const boardLabel = typeof year === "number" && year >= 2021 ? "Eduqas" : "WJEC";

    eduqasPastPapers.push({
      id: `eduqas-c${component}-${year}-qp`,
      paper: component,
      year,
      type: "Question Paper",
      url: pdfUrl(component, `${prefix} QP - Component ${component} ${boardLabel} Economics A-level`),
    });
    eduqasPastPapers.push({
      id: `eduqas-c${component}-${year}-ms`,
      paper: component,
      year,
      type: "Mark Scheme",
      url: pdfUrl(component, `${prefix} MS - Component ${component} ${boardLabel} Economics A-level`),
    });
  }
}

export const eduqasPaperTitles: Record<number, string> = {
  1: "Markets & Market Failure",
  2: "National & International Economy",
  3: "Synoptic Assessment",
};
