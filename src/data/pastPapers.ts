export interface PastPaper {
  id: string;
  paper: 1 | 2 | 3;
  year: number;
  type: "Question Paper" | "Mark Scheme";
  url: string;
}

const BASE = {
  1: "https://www.physicsandmathstutor.com/past-papers/a-level-economics/aqa-paper-1/",
  2: "https://www.physicsandmathstutor.com/past-papers/a-level-economics/aqa-paper-2/",
  3: "https://www.physicsandmathstutor.com/past-papers/a-level-economics/aqa-paper-3/",
};

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

export const pastPapers: PastPaper[] = [];

for (const paper of [1, 2, 3] as const) {
  for (const year of years) {
    pastPapers.push({
      id: `p${paper}-${year}-qp`,
      paper,
      year,
      type: "Question Paper",
      url: BASE[paper],
    });
    pastPapers.push({
      id: `p${paper}-${year}-ms`,
      paper,
      year,
      type: "Mark Scheme",
      url: BASE[paper],
    });
  }
}

export const paperTitles: Record<number, string> = {
  1: "Markets & Market Failure",
  2: "National & International Economy",
  3: "Economic Principles & Issues",
};
