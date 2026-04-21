/**
 * Edexcel A A-Level Economics A (9EC0) — Mock Exam Papers
 *
 * Three full mock papers (Paper 1, 2, 3) with Sections A, B, C.
 * All content is original mock content in the Edexcel house style — not real past papers.
 * Used by /paper-1, /paper-2, /paper-3 routes to render authentic Pearson booklets.
 */

export type MCQOption = { letter: "A" | "B" | "C" | "D"; text: string };

export type Figure = {
  id: string;
  caption: string;
  kind: "pie" | "bar" | "line" | "hbar" | "svg-supply-demand" | "svg-cost-revenue" | "svg-adas" | "line-vs-line";
  data?: any;
};

export type Extract = {
  id: string;
  title: string;
  body: string; // Plain text; rendered with line numbers every 5 lines
};

export type QuestionPart = {
  label: string; // "(a)", "(b)(i)" etc — empty for parent
  prompt: string;
  marks: number;
  mcq?: MCQOption[];
  diagram?: Figure;
  showWorking?: boolean;
};

export type Question = {
  number: string; // "1", "2", "6", "7"
  intro?: string; // Stem before parts
  table?: { headers: string[]; rows: (string | number)[][] };
  diagram?: Figure;
  parts: QuestionPart[];
  totalMarks: number;
  isEither?: boolean;
  isOr?: boolean;
};

export type Section = {
  id: "A" | "B" | "C";
  totalMarks: number;
  timeAdvice: string;
  instructions: string[];
  mcqReminder?: boolean;
  preamble?: string; // e.g. "Read Figures 1 and 2 and Extracts A to C before answering Question 6."
  figures?: Figure[];
  extracts?: Extract[];
  questions: Question[];
};

export type Paper = {
  code: "9EC0/01" | "9EC0/02" | "9EC0/03";
  number: 1 | 2 | 3;
  title: string;
  date: string;
  sessionTime: string;
  duration: string;
  totalMarks: 100;
  sections: Section[];
};

// ─── PAPER 1 ────────────────────────────────────────────────────────
const PAPER_1: Paper = {
  code: "9EC0/01",
  number: 1,
  title: "Markets and Business Behaviour",
  date: "Wednesday 10 June 2026",
  sessionTime: "Morning",
  duration: "Time: 2 hours",
  totalMarks: 100,
  sections: [
    {
      id: "A",
      totalMarks: 25,
      timeAdvice: "You are advised to spend 30 minutes on this section.",
      instructions: ["Answer ALL questions. Write your answers in the spaces provided."],
      questions: [
        {
          number: "1",
          intro:
            "The table shows market data for reusable coffee cups. The original equilibrium price is £8.\n\nFollowing a government awareness campaign, demand rose by 4,000 cups at every price; at the same time a new supplier entered the market increasing supply by 2,000 cups at every price.",
          table: {
            headers: [
              "Price (£)",
              "Quantity demanded (000s/month)",
              "Quantity supplied (000s/month)",
              "New quantity demanded",
              "New quantity supplied",
            ],
            rows: [
              [10, 12, 22, "", ""],
              [9, 14, 20, "", ""],
              [8, 16, 16, "", ""],
              [7, 18, 14, "", ""],
              [6, 20, 12, "", ""],
            ],
          },
          parts: [
            {
              label: "(a)",
              prompt:
                "Calculate the new equilibrium price and quantity. Use the last two columns of the table for your working.",
              marks: 4,
              showWorking: true,
            },
            {
              label: "(b)",
              prompt:
                "The cross elasticity of demand between reusable coffee cups and disposable cups is estimated to be +1.4. Calculate the percentage change in the quantity demanded of reusable coffee cups following a 10% rise in the price of disposable cups. Show your working.",
              marks: 2,
              showWorking: true,
            },
          ],
          totalMarks: 6,
        },
        {
          number: "2",
          intro:
            "Between 2020 and 2024 the average price of streaming subscriptions in the UK rose from £8.99 to £12.99 per month, while the number of household subscriptions rose from 18 million to 22 million. Over the same period UK real household disposable income rose by 6%.",
          parts: [
            {
              label: "(a)",
              prompt:
                "Assuming the change in quantity was caused only by the change in income, calculate the income elasticity of demand for streaming subscriptions. Show your working.",
              marks: 3,
              showWorking: true,
            },
            {
              label: "(b)",
              prompt:
                "With reference to your answer to (a), explain what the value suggests about the nature of streaming subscriptions as a good.",
              marks: 2,
            },
          ],
          totalMarks: 5,
        },
        {
          number: "3",
          intro:
            "The UK government has introduced an indirect tax of £0.18 per litre on sugary soft drinks. The diagram shows the effect on the market.",
          diagram: {
            id: "fig-q3-tax",
            caption: "Figure 1 — Effect of an indirect tax on sugary soft drinks",
            kind: "svg-supply-demand",
            data: { tax: true, P0: 1.2, P1: 1.32, Q0: 4, Q1: 3.6 },
          },
          parts: [
            {
              label: "(a)",
              prompt:
                "With reference to Figure 1, calculate the total tax revenue raised by the government per year. Show your working.",
              marks: 2,
              showWorking: true,
            },
            {
              label: "(b)",
              prompt:
                "With reference to Figure 1, calculate the share of the tax burden paid by consumers. Show your working.",
              marks: 2,
              showWorking: true,
            },
          ],
          totalMarks: 4,
        },
        {
          number: "4",
          intro:
            "In 2025 Greggs, the UK bakery chain, reported a 4% decline in footfall following a national cost-of-living squeeze.",
          parts: [
            {
              label: "(a)",
              prompt:
                "Draw a cost-and-revenue diagram to show the likely short-run impact of the fall in footfall on Greggs' supernormal profit. Label your diagram fully.",
              marks: 4,
            },
            {
              label: "(b)",
              prompt:
                "With reference to your diagram, explain one likely barrier to entry that may protect Greggs' position in the UK bakery market.",
              marks: 2,
            },
          ],
          totalMarks: 6,
        },
        {
          number: "5",
          intro:
            "The Competition and Markets Authority (CMA) blocked a proposed merger between two UK veterinary chains in 2024, citing reduced competition.",
          parts: [
            { label: "(a)", prompt: "Explain one reason why the CMA might block a horizontal merger.", marks: 2 },
            {
              label: "(b)",
              prompt:
                "Examine one possible cost and one possible benefit to consumers of allowing the merger to proceed.",
              marks: 2,
            },
          ],
          totalMarks: 4,
        },
      ],
    },
    {
      id: "B",
      totalMarks: 50,
      timeAdvice: "You are advised to spend 1 hour on this section.",
      instructions: ["Answer ALL questions. Write your answers in the spaces provided."],
      preamble: "Read Figures 1 and 2 and Extracts A to C before answering Question 6.",
      figures: [
        {
          id: "fig1-p1",
          caption: "Figure 1 — UK EV market share by manufacturer, 2024 (%)",
          kind: "pie",
          data: [
            { name: "Tesla", value: 18 },
            { name: "Volkswagen Group", value: 15 },
            { name: "Stellantis", value: 14 },
            { name: "BYD", value: 12 },
            { name: "Hyundai-Kia", value: 11 },
            { name: "MG", value: 8 },
            { name: "Ford", value: 7 },
            { name: "Others", value: 15 },
          ],
        },
        {
          id: "fig2-p1",
          caption: "Figure 2 — Public EV chargers per 100,000 people, UK regions, 2024",
          kind: "hbar",
          data: [
            { name: "London", value: 148 },
            { name: "Scotland", value: 74 },
            { name: "South East", value: 71 },
            { name: "North West", value: 52 },
            { name: "West Midlands", value: 48 },
            { name: "Wales", value: 39 },
            { name: "Yorkshire", value: 34 },
            { name: "North East", value: 28 },
          ],
        },
      ],
      extracts: [
        {
          id: "extA-p1",
          title: "Extract A — Price competition intensifies in the UK EV market",
          body: `The UK electric vehicle market has seen intense price competition since 2023, with Chinese manufacturer BYD and American firm Tesla both cutting list prices by over 15% in a twelve-month period. Analysts suggest the price war reflects rapidly falling battery costs — down roughly 35% since 2022 — combined with over-capacity in global production. Smaller European manufacturers have warned that the pricing pressure threatens their ability to invest in next-generation platforms. The ending of the UK's Plug-in Car Grant in 2022 initially slowed sales, but aggressive discounting has since revived consumer demand.\n(Source: adapted)`,
        },
        {
          id: "extB-p1",
          title: "Extract B — Charging infrastructure: a classic public-good problem?",
          body: `Despite rapid growth in EV sales, the public charging network remains uneven. Rural areas and the north of England have fewer than a quarter of the chargers per capita found in London. Private operators argue that returns on investment are too thin in low-density areas without government support. Meanwhile, consumer research shows "range anxiety" is still the single largest reason cited by households for not switching to electric. Some economists describe the situation as a coordination failure, where under-provision of chargers reduces demand, which in turn reduces the incentive to install chargers.\n(Source: adapted)`,
        },
        {
          id: "extC-p1",
          title: "Extract C — Proposed merger of two charging-network operators",
          body: `Pod Point and InstaVolt, two of the UK's largest public charging-network operators, have announced plans for a £600 million merger. Combined, the new group would control around 28% of rapid-charging points in the UK. Supporters argue that the merger will unlock economies of scale, enabling faster roll-out of rural chargers and better interoperability. Critics fear it will reduce competitive pressure on pricing, which has risen by over 20% at public chargers in the past two years. The CMA is expected to launch a Phase 1 investigation.\n(Source: adapted)`,
        },
      ],
      questions: [
        {
          number: "6",
          parts: [
            {
              label: "(a)",
              prompt:
                "With reference to Figure 1 and Extract A, explain one likely reason for the shape of the UK EV market structure in 2024.",
              marks: 5,
            },
            {
              label: "(b)",
              prompt:
                "With reference to Figure 2 and Extract B, discuss the possible reasons for market failure in the provision of public EV charging infrastructure.",
              marks: 12,
            },
            {
              label: "(c)",
              prompt:
                "Examine measures the UK government could use to improve the provision of EV chargers in underserved regions.",
              marks: 8,
            },
            {
              label: "(d)",
              prompt:
                "Assess the extent to which \"range anxiety\" (Extract B, line 6) and inadequate charging infrastructure are the main barriers to wider EV adoption in the UK.",
              marks: 10,
            },
            {
              label: "(e)",
              prompt:
                "Discuss the likely impact on consumers of the proposed merger between Pod Point and InstaVolt. Refer to Extract C and your own knowledge.",
              marks: 15,
            },
          ],
          totalMarks: 50,
        },
      ],
    },
    {
      id: "C",
      totalMarks: 25,
      timeAdvice: "You are advised to spend 30 minutes on this section.",
      instructions: ["Answer ONE question from this section. Write your answer in the spaces provided."],
      questions: [
        {
          number: "7",
          isEither: true,
          parts: [
            {
              label: "",
              prompt:
                "In 2025 the UK Competition and Markets Authority announced a review of \"drip pricing\" — the practice of advertising a headline price that does not include all mandatory fees. Evaluate the likely microeconomic effects of banning drip pricing in the UK.",
              marks: 25,
            },
          ],
          totalMarks: 25,
        },
        {
          number: "8",
          isOr: true,
          parts: [
            {
              label: "",
              prompt:
                "\"Profit maximisation is no longer a realistic primary objective for large firms in competitive consumer markets.\" To what extent do you agree? Refer to an industry of your choice.",
              marks: 25,
            },
          ],
          totalMarks: 25,
        },
      ],
    },
  ],
};

// ─── PAPER 2 ────────────────────────────────────────────────────────
const PAPER_2: Paper = {
  code: "9EC0/02",
  number: 2,
  title: "The National and Global Economy",
  date: "Monday 15 June 2026",
  sessionTime: "Morning",
  duration: "Time: 2 hours",
  totalMarks: 100,
  sections: [
    {
      id: "A",
      totalMarks: 25,
      timeAdvice: "You are advised to spend 30 minutes on this section.",
      instructions: ["Answer ALL questions. Write your answers in the spaces provided."],
      questions: [
        {
          number: "1",
          intro: "The table shows selected macroeconomic data for the UK economy, 2022–2024.",
          table: {
            headers: [
              "Year",
              "Real GDP growth (%)",
              "CPI inflation (%)",
              "Unemployment rate (%)",
              "Current account (% GDP)",
            ],
            rows: [
              [2022, 4.3, 9.1, 3.7, -3.8],
              [2023, 0.1, 7.3, 4.0, -3.1],
              [2024, 0.9, 2.6, 4.3, -2.4],
            ],
          },
          parts: [
            {
              label: "(a)",
              prompt:
                "Using the data, calculate the change in the UK's real GDP index number between 2022 and 2024, taking 2022 = 100. Show your working.",
              marks: 4,
              showWorking: true,
            },
            {
              label: "(b)",
              prompt:
                "With reference to the data, explain what the combination of indicators in 2024 suggests about the UK's macroeconomic position.",
              marks: 2,
            },
          ],
          totalMarks: 6,
        },
        {
          number: "2",
          intro: "In 2025 the Bank of England's Monetary Policy Committee cut the Bank Rate from 5.25% to 4.50%.",
          parts: [
            {
              label: "(a)",
              prompt:
                "Explain two likely transmission mechanisms through which this cut in interest rates will affect aggregate demand.",
              marks: 4,
            },
            {
              label: "(b)",
              prompt: "Explain the likely effect of this cut in interest rates on the sterling exchange rate.",
              marks: 2,
            },
          ],
          totalMarks: 6,
        },
        {
          number: "3",
          intro: "Government net borrowing in the UK rose to 5.4% of GDP in 2024.",
          parts: [
            {
              label: "(a)",
              prompt: "Distinguish between the cyclical and structural components of a budget deficit.",
              marks: 4,
            },
          ],
          totalMarks: 4,
        },
        {
          number: "4",
          intro:
            "In 2024 China recorded a current account surplus of US$422 billion, while the United States recorded a deficit of US$990 billion.",
          parts: [
            {
              label: "(a)",
              prompt:
                "Using an AD/AS diagram, show the likely short-run effect of a persistent current account deficit on US national income. Label your diagram fully.",
              marks: 4,
            },
            {
              label: "(b)",
              prompt: "Explain one supply-side policy that could help correct a persistent current account deficit in the long run.",
              marks: 2,
            },
          ],
          totalMarks: 6,
        },
        {
          number: "5",
          intro:
            "The OECD estimates the UK's long-run trend growth rate has fallen from 2.5% in the 2000s to approximately 1.4% in the 2020s.",
          parts: [
            { label: "(a)", prompt: "Explain one supply-side reason for the fall in the UK's trend growth rate.", marks: 3 },
          ],
          totalMarks: 3,
        },
      ],
    },
    {
      id: "B",
      totalMarks: 50,
      timeAdvice: "You are advised to spend 1 hour on this section.",
      instructions: ["Answer ALL questions. Write your answers in the spaces provided."],
      preamble: "Read Figures 1 and 2 and Extracts A to C before answering Question 6.",
      figures: [
        {
          id: "fig1-p2",
          caption: "Figure 1 — CPI inflation, selected economies, 2021–2025 (%)",
          kind: "line-vs-line",
          data: {
            years: ["2021", "2022", "2023", "2024", "2025"],
            series: [
              { name: "UK", values: [2.6, 9.1, 7.3, 2.6, 2.2] },
              { name: "US", values: [4.7, 8.0, 4.1, 2.9, 2.4] },
              { name: "Eurozone", values: [2.6, 8.4, 5.4, 2.4, 2.0] },
              { name: "Japan", values: [-0.2, 2.5, 3.2, 2.6, 1.8] },
              { name: "Turkey", values: [19.6, 72.3, 53.9, 47.2, 35.0] },
            ],
          },
        },
        {
          id: "fig2-p2",
          caption: "Figure 2 — External debt as % of GNI, selected emerging economies, 2024",
          kind: "bar",
          data: [
            { name: "Argentina", value: 75 },
            { name: "Turkey", value: 55 },
            { name: "Egypt", value: 48 },
            { name: "Pakistan", value: 42 },
            { name: "Kenya", value: 38 },
            { name: "Brazil", value: 35 },
            { name: "India", value: 19 },
          ],
        },
      ],
      extracts: [
        {
          id: "extA-p2",
          title: "Extract A — The post-pandemic inflation shock",
          body: `Global inflation surged in 2022 as energy prices spiked following Russia's invasion of Ukraine and supply chains strained after the pandemic. Central banks in advanced economies raised policy rates sharply: the US Federal Reserve lifted rates by 525 basis points in under two years, while the Bank of England moved from 0.1% to 5.25%. Disinflation has since taken hold, but core inflation has proved stickier than headline measures. Wage growth in services remains elevated in several economies, and unit labour costs continue to rise faster than pre-pandemic trends.\n(Source: adapted)`,
        },
        {
          id: "extB-p2",
          title: "Extract B — The squeeze on emerging-market borrowers",
          body: `Rising US interest rates have tightened global financial conditions. Many emerging-market governments borrowed heavily in US dollars during the 2010s low-rate era, and the resulting dollar strength has sharply increased their debt-servicing burden. Argentina defaulted on sovereign bonds for the third time this decade. Egypt agreed an IMF programme worth US$8 billion conditional on exchange-rate liberalisation and subsidy reform. Several African borrowers have been frozen out of bond markets entirely. Critics argue the international financial system transmits shocks disproportionately to the world's poorest nations.\n(Source: adapted)`,
        },
        {
          id: "extC-p2",
          title: "Extract C — A coordinated response?",
          body: `The IMF and World Bank have called for debt restructuring for 25 low-income countries and proposed that multilateral development banks expand concessional lending. Some economists propose SDR (Special Drawing Rights) reallocation from rich to poor countries. Others argue domestic supply-side reforms — in education, tax administration and energy pricing — matter more than external aid in restoring growth. China, now the largest bilateral creditor to many African states, has been slow to agree to coordinated restructuring.\n(Source: adapted)`,
        },
      ],
      questions: [
        {
          number: "6",
          parts: [
            {
              label: "(a)",
              prompt:
                "With reference to Figure 1 and Extract A, explain one likely cause of the divergence in inflation rates between advanced and emerging economies in 2022.",
              marks: 5,
            },
            {
              label: "(b)",
              prompt:
                "With reference to Figure 2 and Extract B, discuss the possible impact of rising US interest rates on the macroeconomic performance of emerging economies.",
              marks: 12,
            },
            {
              label: "(c)",
              prompt: "Examine policies the IMF could use to support countries experiencing a balance-of-payments crisis.",
              marks: 8,
            },
            {
              label: "(d)",
              prompt:
                "Assess the extent to which \"sticky core inflation\" (Extract A, line 5) reflects wage-price spiral effects rather than supply-side shocks.",
              marks: 10,
            },
            {
              label: "(e)",
              prompt:
                "Discuss the likely effectiveness of sovereign debt restructuring in restoring growth in low-income economies. Refer to Extract C and your own knowledge.",
              marks: 15,
            },
          ],
          totalMarks: 50,
        },
      ],
    },
    {
      id: "C",
      totalMarks: 25,
      timeAdvice: "You are advised to spend 30 minutes on this section.",
      instructions: ["Answer ONE question from this section. Write your answer in the spaces provided."],
      questions: [
        {
          number: "7",
          isEither: true,
          parts: [
            {
              label: "",
              prompt:
                "The UK government is considering a significant increase in public investment financed by additional borrowing. Evaluate the likely macroeconomic effects of such a policy.",
              marks: 25,
            },
          ],
          totalMarks: 25,
        },
        {
          number: "8",
          isOr: true,
          parts: [
            {
              label: "",
              prompt:
                "\"A floating exchange rate is always preferable to a fixed exchange rate for a small open economy.\" To what extent do you agree? Refer to one or more economies in your answer.",
              marks: 25,
            },
          ],
          totalMarks: 25,
        },
      ],
    },
  ],
};

// ─── PAPER 3 ────────────────────────────────────────────────────────
const PAPER_3: Paper = {
  code: "9EC0/03",
  number: 3,
  title: "Microeconomics and Macroeconomics",
  date: "Friday 19 June 2026",
  sessionTime: "Morning",
  duration: "Time: 2 hours",
  totalMarks: 100,
  sections: [
    {
      id: "A",
      totalMarks: 25,
      timeAdvice: "You are advised to spend 30 minutes on this section.",
      instructions: ["Answer ALL questions. Write your answers in the spaces provided."],
      preamble: "Case Study 1: UK housing market and monetary policy. Read Figure 1 and Extract A before answering Question 1.",
      figures: [
        {
          id: "fig1-p3",
          caption: "Figure 1 — UK house price index (2005=100) and Bank of England base rate, 2005–2025",
          kind: "line-vs-line",
          data: {
            years: ["2005", "2010", "2015", "2020", "2025"],
            series: [
              { name: "House price index", values: [100, 110, 132, 168, 198] },
              { name: "Base rate (%)", values: [4.5, 0.5, 0.5, 0.1, 4.25] },
            ],
          },
        },
      ],
      extracts: [
        {
          id: "extA-p3",
          title: "Extract A — Housing affordability in 2025",
          body: `Average UK house prices stood at 8.4 times median earnings in 2025, close to a record high. First-time buyers increasingly depend on parental support ("the Bank of Mum and Dad") or government schemes. Mortgage approvals fell by 18% year-on-year as the Bank Rate stayed above 4%. House-building completions in 2024 were 215,000 — well below the government's 300,000 annual target.\n(Source: adapted)`,
        },
      ],
      questions: [
        {
          number: "1",
          parts: [
            {
              label: "(a)",
              prompt:
                "With reference to the data, calculate the ratio of house prices to earnings in 2025 and explain what it suggests about housing affordability.",
              marks: 5,
              showWorking: true,
            },
            { label: "(b)", prompt: "Explain one likely reason why higher interest rates reduce housing demand.", marks: 5 },
            {
              label: "(c)",
              prompt:
                "Examine one likely microeconomic consequence of a sustained fall in UK house prices on household behaviour.",
              marks: 5,
            },
            { label: "(d)", prompt: "Explain one supply-side barrier to higher UK housing completions.", marks: 10 },
          ],
          totalMarks: 25,
        },
      ],
    },
    {
      id: "B",
      totalMarks: 25,
      timeAdvice: "You are advised to spend 30 minutes on this section.",
      instructions: ["Answer ALL questions. Write your answer in the spaces provided."],
      questions: [
        {
          number: "2",
          parts: [
            {
              label: "",
              prompt:
                "Using Extract A and your knowledge of economics, evaluate the likely effects on the UK economy of a large government-funded programme of social housing construction.",
              marks: 25,
            },
          ],
          totalMarks: 25,
        },
      ],
    },
    {
      id: "C",
      totalMarks: 50,
      timeAdvice: "You are advised to spend 1 hour on this section.",
      instructions: ["Answer ALL questions. Write your answers in the spaces provided."],
      preamble: "Case Study 2: Global green transition. Read Figure 2 and Extract B before answering Question 3.",
      figures: [
        {
          id: "fig2-p3",
          caption: "Figure 2 — Global renewable energy investment, US$ billion, 2015–2024",
          kind: "bar",
          data: [
            { name: "2015", value: 290 },
            { name: "2017", value: 320 },
            { name: "2019", value: 360 },
            { name: "2021", value: 510 },
            { name: "2023", value: 620 },
            { name: "2024", value: 745 },
          ],
        },
        {
          id: "fig3-p3",
          caption: "Figure 3 — Carbon intensity (tonnes CO₂ per US$ million GDP), selected countries, 2024",
          kind: "hbar",
          data: [
            { name: "South Africa", value: 580 },
            { name: "China", value: 440 },
            { name: "India", value: 380 },
            { name: "Russia", value: 360 },
            { name: "USA", value: 220 },
            { name: "Germany", value: 150 },
            { name: "UK", value: 120 },
            { name: "France", value: 95 },
          ],
        },
      ],
      extracts: [
        {
          id: "extB-p3",
          title: "Extract B — Green subsidies and international competition",
          body: `The US Inflation Reduction Act (2022) and the EU's Green Deal Industrial Plan have committed over US$1 trillion combined to clean-energy subsidies. China leads the world in solar panel production, controlling over 80% of global supply. Developing countries have argued that the green transition is occurring on unequal terms, with rich economies able to subsidise their way into new industries while poorer countries face carbon tariffs on their exports.\n(Source: adapted)`,
        },
      ],
      questions: [
        {
          number: "3",
          parts: [
            {
              label: "(a)",
              prompt: "Explain one likely effect of large clean-energy subsidies on the global market for renewable technology.",
              marks: 8,
            },
            {
              label: "(b)",
              prompt:
                "Discuss the possible microeconomic and macroeconomic consequences of carbon border adjustment mechanisms (carbon tariffs).",
              marks: 12,
            },
            {
              label: "(c)",
              prompt:
                "Evaluate the extent to which government intervention — rather than the market mechanism — is the most effective route to achieving the global green transition. Refer to Extract B and your own knowledge.",
              marks: 30,
            },
          ],
          totalMarks: 50,
        },
      ],
    },
  ],
};

export const EDEXCEL_MOCK_PAPERS: Record<1 | 2 | 3, Paper> = {
  1: PAPER_1,
  2: PAPER_2,
  3: PAPER_3,
};

export function getMockPaper(n: 1 | 2 | 3): Paper {
  return EDEXCEL_MOCK_PAPERS[n];
}

/** Map a question's mark allocation → number of dotted answer lines. */
export function linesForMarks(marks: number): number {
  if (marks <= 2) return 6;
  if (marks <= 5) return 10;
  if (marks <= 8) return 16;
  if (marks <= 12) return 24;
  if (marks <= 15) return 32;
  if (marks <= 25) return 64; // ~4 pages of lines
  if (marks <= 30) return 80;
  return 16;
}
