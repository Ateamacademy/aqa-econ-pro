export interface ChemistryPastPaper {
  id: string;
  paper: 1 | 2;
  tier: "Foundation" | "Higher";
  year: number | "Specimen";
  type: "Question Paper" | "Mark Scheme";
  url: string;
}

const PMT =
  "https://pmt.physicsandmathstutor.com/download/Chemistry/GCSE/Past-Papers/AQA";

function tierCode(paper: 1 | 2, tier: "Foundation" | "Higher") {
  return `Paper-${paper}${tier === "Foundation" ? "F" : "H"}`;
}

function pdfUrl(
  paper: 1 | 2,
  tier: "Foundation" | "Higher",
  folder: "QP" | "MS",
  label: string,
) {
  return `${PMT}/${tierCode(paper, tier)}/${folder}/${encodeURIComponent(label)}.pdf`;
}

const years: (number | "Specimen")[] = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, "Specimen",
];

const tiers: ("Foundation" | "Higher")[] = ["Foundation", "Higher"];

function yearLabel(y: number | "Specimen") {
  return y === "Specimen" ? "Specimen" : `June ${y}`;
}

export const chemistryPastPapers: ChemistryPastPaper[] = [];

for (const paper of [1, 2] as const) {
  for (const tier of tiers) {
    for (const year of years) {
      const label = yearLabel(year);

      chemistryPastPapers.push({
        id: `chem-p${paper}-${tier[0]}-${year}-qp`,
        paper,
        tier,
        year,
        type: "Question Paper",
        url: pdfUrl(paper, tier, "QP", `${label} QP`),
      });

      chemistryPastPapers.push({
        id: `chem-p${paper}-${tier[0]}-${year}-ms`,
        paper,
        tier,
        year,
        type: "Mark Scheme",
        url: pdfUrl(paper, tier, "MS", `${label} MS`),
      });
    }
  }
}

export const chemistryPaperTitles: Record<number, string> = {
  1: "Topics 1–5: Atomic Structure, Bonding, Quantitative Chemistry, Chemical Changes, Energy Changes",
  2: "Topics 6–10: Rate & Equilibrium, Organic Chemistry, Chemical Analysis, Atmosphere, Using Resources",
};
