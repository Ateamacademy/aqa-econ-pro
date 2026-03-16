export interface WjecPastPaper {
  id: string;
  paper: 1 | 2 | 3 | 4;
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Economics/A-level/Past-Papers/WJEC-Wales";

function pdfUrl(unit: number, label: string) {
  return `${PMT}/Unit-${unit}/${encodeURIComponent(label)}.pdf`;
}

const years: (number | "Specimen")[] = [2024, 2023, 2022, 2019, 2018, 2017, 2016, "Specimen"];

export const wjecPastPapers: WjecPastPaper[] = [];

for (const unit of [1, 2, 3, 4] as const) {
  for (const year of years) {
    const prefix = year === "Specimen" ? "Specimen" : `June ${year}`;
    const level = unit <= 2 ? "AS-level" : "A-level";

    wjecPastPapers.push({
      id: `wjec-u${unit}-${year}-qp`,
      paper: unit,
      year,
      type: "Question Paper",
      url: pdfUrl(unit, `${prefix} QP - Unit ${unit} WJEC Economics ${level}`),
    });
    wjecPastPapers.push({
      id: `wjec-u${unit}-${year}-ms`,
      paper: unit,
      year,
      type: "Mark Scheme",
      url: pdfUrl(unit, `${prefix} MS - Unit ${unit} WJEC Economics ${level}`),
    });
  }
}

export const wjecPaperTitles: Record<number, string> = {
  1: "Introduction to Economics",
  2: "Economics in Action",
  3: "Exploring Economic Behaviour",
  4: "Evaluating Economic Models & Policies",
};
