export interface CambridgePastPaper {
  id: string;
  paper: 1 | 2 | 3 | 4;
  year: number;
  session: "s" | "w" | "m";
  variant: number;
  type: "Question Paper" | "Mark Scheme" | "Insert";
  url: string;
}

const BASE = "https://pastpapers.papacambridge.com/directories/CAIE/CAIE-pastpapers/upload";

/**
 * CAIE 9708 AS & A-Level Economics
 * Papers: 1 (MCQ AS), 2 (Data Response AS), 3 (MCQ A2), 4 (Data Response A2)
 * Sessions: s = May/June, w = Oct/Nov, m = March
 * Variants: 1, 2, 3 (not all exist for every session)
 */

type SessionInfo = { code: "s" | "w" | "m"; label: string };

const sessions: Record<number, SessionInfo[]> = {
  2024: [
    { code: "s", label: "May/Jun 2024" },
    { code: "w", label: "Oct/Nov 2024" },
    { code: "m", label: "Mar 2024" },
  ],
  2023: [
    { code: "s", label: "May/Jun 2023" },
    { code: "w", label: "Oct/Nov 2023" },
    { code: "m", label: "Mar 2023" },
  ],
  2022: [
    { code: "s", label: "May/Jun 2022" },
    { code: "w", label: "Oct/Nov 2022" },
    { code: "m", label: "Feb/Mar 2022" },
  ],
  2021: [
    { code: "s", label: "May/Jun 2021" },
    { code: "w", label: "Oct/Nov 2021" },
    { code: "m", label: "Mar 2021" },
  ],
  2020: [
    { code: "s", label: "May/Jun 2020" },
    { code: "w", label: "Oct/Nov 2020" },
    { code: "m", label: "Mar 2020" },
  ],
  2019: [
    { code: "s", label: "May/Jun 2019" },
    { code: "w", label: "Oct/Nov 2019" },
    { code: "m", label: "Mar 2019" },
  ],
  2018: [
    { code: "s", label: "May/Jun 2018" },
    { code: "w", label: "Oct/Nov 2018" },
    { code: "m", label: "Mar 2018" },
  ],
  2017: [
    { code: "s", label: "May/Jun 2017" },
    { code: "w", label: "Oct/Nov 2017" },
  ],
};

const papers = [1, 2, 3, 4] as const;
const variants = [1, 2, 3] as const;

export const cambridgePastPapers: CambridgePastPaper[] = [];

for (const [yearStr, sessionList] of Object.entries(sessions)) {
  const year = Number(yearStr);
  for (const sess of sessionList) {
    for (const paper of papers) {
      for (const variant of variants) {
        const pv = `${paper}${variant}`; // e.g. "11", "21", "32"
        
        // Question Paper
        cambridgePastPapers.push({
          id: `caie-p${paper}-${year}-${sess.code}-v${variant}-qp`,
          paper,
          year,
          session: sess.code,
          variant,
          type: "Question Paper",
          url: `${BASE}/9708_${sess.code}${String(year).slice(2)}_qp_${pv}.pdf`,
        });
        
        // Mark Scheme
        cambridgePastPapers.push({
          id: `caie-p${paper}-${year}-${sess.code}-v${variant}-ms`,
          paper,
          year,
          session: sess.code,
          variant,
          type: "Mark Scheme",
          url: `${BASE}/9708_${sess.code}${String(year).slice(2)}_ms_${pv}.pdf`,
        });

        // Insert (Papers 2 and 4 have inserts)
        if (paper === 2 || paper === 4) {
          cambridgePastPapers.push({
            id: `caie-p${paper}-${year}-${sess.code}-v${variant}-in`,
            paper,
            year,
            session: sess.code,
            variant,
            type: "Insert",
            url: `${BASE}/9708_${sess.code}${String(year).slice(2)}_in_${pv}.pdf`,
          });
        }
      }
    }
  }
}

export const cambridgePaperTitles: Record<number, string> = {
  1: "Multiple Choice (AS)",
  2: "Data Response & Essay (AS)",
  3: "Multiple Choice (A2)",
  4: "Data Response & Essay (A2)",
};

export const sessionLabels: Record<string, string> = {
  s: "May/June",
  w: "Oct/Nov",
  m: "March",
};
