export interface MathsPastPaper {
  id: string;
  paper: 1 | 2 | 3;
  tier: "Foundation" | "Higher";
  session: string; // e.g. "June 2024", "Nov 2023", "Sample", "Specimen 1", "Specimen 2"
  type: "Question Paper" | "Mark Scheme" | "Model Answer";
  url: string;
}

const PMT = "https://pmt.physicsandmathstutor.com/download/Maths/GCSE/Past-Papers/Edexcel";

function tierCode(paper: number, tier: "Foundation" | "Higher") {
  return `Paper-${paper}${tier === "Foundation" ? "F" : "H"}`;
}

function typeFolder(type: "Question Paper" | "Mark Scheme" | "Model Answer") {
  if (type === "Question Paper") return "QP";
  if (type === "Mark Scheme") return "MS";
  return "MA";
}

function typeAbbrev(type: "Question Paper" | "Mark Scheme" | "Model Answer") {
  if (type === "Question Paper") return "QP";
  if (type === "Mark Scheme") return "MS";
  return "MA";
}

function pdfUrl(paper: number, tier: "Foundation" | "Higher", type: MathsPastPaper["type"], session: string) {
  return `${PMT}/${tierCode(paper, tier)}/${typeFolder(type)}/${encodeURIComponent(`${session} ${typeAbbrev(type)}`)}.pdf`;
}

const juneSessions = [2024, 2023, 2022, 2020, 2019, 2018, 2017];
const novSessions = [2023, 2022, 2021, 2020, 2019, 2018, 2017];
const specialSessions = ["Sample", "Specimen 1", "Specimen 2"];
const tiers: ("Foundation" | "Higher")[] = ["Foundation", "Higher"];
const types: MathsPastPaper["type"][] = ["Question Paper", "Mark Scheme", "Model Answer"];

export const mathsPastPapers: MathsPastPaper[] = [];

for (const paper of [1, 2, 3] as const) {
  for (const tier of tiers) {
    for (const type of types) {
      for (const year of juneSessions) {
        const session = `June ${year}`;
        mathsPastPapers.push({
          id: `m-p${paper}-${tier[0]}-jun${year}-${typeAbbrev(type).toLowerCase()}`,
          paper, tier, session, type,
          url: pdfUrl(paper, tier, type, session),
        });
      }

      for (const year of novSessions) {
        const session = `Nov ${year}`;
        mathsPastPapers.push({
          id: `m-p${paper}-${tier[0]}-nov${year}-${typeAbbrev(type).toLowerCase()}`,
          paper, tier, session, type,
          url: pdfUrl(paper, tier, type, session),
        });
      }

      for (const sp of specialSessions) {
        mathsPastPapers.push({
          id: `m-p${paper}-${tier[0]}-${sp.replace(/\s/g, "").toLowerCase()}-${typeAbbrev(type).toLowerCase()}`,
          paper, tier, session: sp, type,
          url: pdfUrl(paper, tier, type, sp),
        });
      }
    }
  }
}

export const mathsPaperTitles: Record<number, string> = {
  1: "Non-Calculator",
  2: "Calculator (1)",
  3: "Calculator (2)",
};
