import {
  AQA_SPEC,
  type GeneratedPaper,
  type AqaQuestion,
  type AqaMarkSchemeEntry,
  type PaperNumber,
  type AqaPaperCode,
  defaultLevelsFor,
  validateGeneratedPaper,
} from "@/lib/aqa-spec";

export interface GenerateOptions {
  paperNumber: PaperNumber;
  practiceSetLabel: string;
  focus: string[];
  difficulty: "as" | "a2" | "mixed";
  /** Paper 1/2 only · link the three Section B essay choices around one theme. */
  thematicEssays?: boolean;
  /** Paper 3 only · synoptic across all 3 papers vs themed. */
  synopticMcq?: boolean;
}

/**
 * Local, deterministic paper generator that produces a paper conforming to
 * AQA_SPEC. Replace with an Edge Function call when AI generation is wired up;
 * the validator is the single contract that matters.
 */
export function generateAqaPaper(opts: GenerateOptions): GeneratedPaper {
  const spec = AQA_SPEC[`PAPER_${opts.paperNumber}`];
  const focusBlurb = opts.focus.length ? opts.focus.join(", ") : "general";
  const difficultyTag = opts.difficulty === "as" ? "AS-level" : opts.difficulty === "a2" ? "A2 challenging" : "mixed";

  const id = `aqa-gen-${opts.paperNumber}-${Date.now()}`;
  const createdAt = new Date().toISOString();

  if (opts.paperNumber === 3) {
    return assembleAndValidate({
      id,
      paperCode: spec.code as AqaPaperCode,
      paperNumber: 3,
      title: spec.title,
      practiceSetLabel: opts.practiceSetLabel,
      focus: opts.focus,
      createdAt,
      status: "generated",
      totalMarks: 80,
      extracts: [
        {
          id: "CASE",
          title: `Case Study · ${focusBlurb}`,
          body:
            `This generated case study (${difficultyTag}) explores the focus area of ${focusBlurb}. ` +
            `Candidates should integrate micro and macro reasoning${opts.synopticMcq ? " across all three Paper 3 themes" : ""}.`,
        },
      ],
      questions: [
        ...Array.from({ length: 30 }, (_, i): AqaQuestion => ({
          number: i + 1,
          marks: 1,
          section: "A",
          prompt: `MCQ ${i + 1} · ${focusBlurb} (${difficultyTag}).`,
          mcqOptions: ["Option A", "Option B", "Option C", "Option D"],
          mcqAnswer: (["A", "B", "C", "D"] as const)[i % 4],
        })),
        { number: 31, marks: 10, section: "B", prompt: `Apply the case study to ${focusBlurb}.` },
        { number: 32, marks: 15, section: "B", prompt: `Analyse the mechanism described in the case study.` },
        { number: 33, marks: 25, section: "B", prompt: `Evaluate the policy options open to government.` },
      ],
      markScheme: [
        ...Array.from({ length: 30 }, (_, i): AqaMarkSchemeEntry => ({
          questionNumber: i + 1,
          mcqAnswer: (["A", "B", "C", "D"] as const)[i % 4],
          mcqJustification: "Correct option isolates the mechanism while distractors swap a key variable.",
        })),
        { questionNumber: 31, levels: defaultLevelsFor(10) },
        { questionNumber: 32, levels: defaultLevelsFor(15) },
        { questionNumber: 33, levels: defaultLevelsFor(25) },
      ],
    });
  }

  // Paper 1 or 2
  return assembleAndValidate({
    id,
    paperCode: spec.code as AqaPaperCode,
    paperNumber: opts.paperNumber,
    title: spec.title,
    practiceSetLabel: opts.practiceSetLabel,
    focus: opts.focus,
    createdAt,
    status: "generated",
    totalMarks: 80,
    extracts: [
      { id: "A", title: `Extract A · ${focusBlurb}`, body: `Extract A on ${focusBlurb} (${difficultyTag}).` },
      {
        id: "B",
        title: `Extract B · supporting data on ${focusBlurb}`,
        body: `Extract B with figures on ${focusBlurb}.`,
        figures: [
          {
            id: "fig1",
            title: "Figure 1 · Generated trend data",
            xKey: "year",
            yKeys: ["value"],
            data: [
              { year: "2020", value: 100 },
              { year: "2021", value: 108 },
              { year: "2022", value: 121 },
              { year: "2023", value: 117 },
              { year: "2024", value: 125 },
            ],
            caption: "Source: generated for practice.",
          },
        ],
      },
      { id: "C", title: `Extract C · policy commentary on ${focusBlurb}`, body: `Extract C · policy debate on ${focusBlurb}.` },
    ],
    questions: [
      { number: 1, marks: 2, section: "A", prompt: `Define a key term from the focus area: ${opts.focus[0] ?? "given"}.` },
      { number: 2, marks: 4, section: "A", prompt: `Using Extract B, explain one cause of the trend shown in Figure 1.` },
      { number: 3, marks: 9, section: "A", prompt: `With the aid of an appropriate diagram, analyse the impact described in Extract A.` },
      { number: 4, marks: 25, section: "A", prompt: `Evaluate the policy options for ${focusBlurb} discussed in Extract C.` },
      {
        number: 5,
        marks: 15,
        section: "B",
        contextLabel: opts.thematicEssays ? `Context (linked) · ${opts.focus[0] ?? "selected"}` : "Context 1",
        prompt: `Explain how the key mechanism applies to ${opts.focus[0] ?? "the selected context"}.`,
      },
      {
        number: 6,
        marks: 25,
        section: "B",
        contextLabel: opts.thematicEssays ? `Context (linked) · ${opts.focus[0] ?? "selected"}` : "Context 1",
        prompt: `Evaluate the most effective policy in this context.`,
      },
    ],
    markScheme: [
      { questionNumber: 1, pointMarks: ["1 mark: identification.", "1 mark: development / formula."] },
      {
        questionNumber: 2,
        pointMarks: [
          "1 mark: identifies cause from extract.",
          "1 mark: explicit data reference.",
          "1 mark: links cause to mechanism.",
          "1 mark: developed economic chain.",
        ],
      },
      { questionNumber: 3, levels: defaultLevelsFor(9) },
      { questionNumber: 4, levels: defaultLevelsFor(25) },
      { questionNumber: 5, levels: defaultLevelsFor(15) },
      { questionNumber: 6, levels: defaultLevelsFor(25) },
    ],
  });
}

function assembleAndValidate(paper: GeneratedPaper): GeneratedPaper {
  const result = validateGeneratedPaper(paper);
  if (!result.valid) {
    const detail = result.issues.map((i) => `${i.code}: ${i.message}`).join("; ");
    throw new Error(`Generated paper failed AQA blueprint validation · ${detail}`);
  }
  return paper;
}
