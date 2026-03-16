export interface IBPastPaper {
  id: string;
  paper: 1 | 2 | 3;
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme";
  url: string;
}

// IB Economics HL past papers via exampaperspractice.co.uk
const BASE = "https://www.exampaperspractice.co.uk/ib/economics/ib-economics-hl-past-papers";

const years: (number | "Specimen")[] = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

export const ibPastPapers: IBPastPaper[] = [];

for (const paper of [1, 2, 3] as const) {
  for (const year of years) {
    if (paper === 3 && typeof year === "number" && year < 2022) {
      // Paper 3 only available from new spec 2022+
      continue;
    }
    const label = year === "Specimen" ? "Specimen" : `${year}`;
    ibPastPapers.push({
      id: `ib-p${paper}-${year}-qp`,
      paper,
      year,
      type: "Question Paper",
      url: `${BASE}#paper${paper}-${label}`,
    });
    ibPastPapers.push({
      id: `ib-p${paper}-${year}-ms`,
      paper,
      year,
      type: "Mark Scheme",
      url: `${BASE}#paper${paper}-${label}-ms`,
    });
  }
}

export const ibPaperTitles: Record<number, string> = {
  1: "Extended Response (Essay)",
  2: "Data Response",
  3: "HL Extension Paper",
};
