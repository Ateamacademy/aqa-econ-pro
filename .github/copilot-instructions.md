# Copilot instructions — EconRev

Persistent rules for **every** Copilot task in this repo. Place this file at
`.github/copilot-instructions.md` so Copilot loads it automatically.

## What this project is
EconRev (econrev.co) is a Vite + React + TypeScript app with a Supabase backend
(edge functions in `supabase/functions`, schema in `supabase/migrations`). It
generates predicted exam papers, marks answers with AI, renders economics
diagrams, and runs an AI tutor — across boards (AQA, Edexcel, OCR, WJEC/Eduqas,
CAIE, IB) and levels (GCSE, AS, A-Level, IB SL/HL).

## Where things live — do not guess, use these paths
**Predicted-paper QUESTIONS + MARK SCHEMES are editable data, not the PDFs:**
- OCR: `src/data/ocrPredictedPapers.ts`, `src/data/ocrPredictedMarkSchemes.ts`
- CAIE/Cambridge: `src/data/cambridgePredictedPapers.ts`, `src/data/caieAsPredictedPapers.ts`
- Cross-board: `src/data/multiBoardPredictedPapers.ts`, `src/data/predictedPapersLibrary.ts`, `src/data/economicsPredictedPapersExtra.ts`
- JSON: `src/data/edexcelAPredictedPapersData.json`, `src/data/edexcel-b-mark-schemes/raw.json`
- Markdown mark schemes: `public/<board>-mocks/mark-scheme-*.md`

**PDF rendering + the static cache:**
- `src/lib/generatePaperPdf.ts`, `src/lib/generateSolutionPdf.ts` — dynamic render (jsPDF)
- `src/lib/staticPaperResolver.ts` — serves a pre-rendered PDF from `public/<board>-mocks/` **if one exists**, else falls back to dynamic generation from the data above
- Static PDFs: `public/<board>-mocks/*.pdf`

**Diagrams (SVG/React):**
- Main library: `src/components/revision/EconDiagramLibrary.tsx`
- Specs: `src/components/diagrams/diagramSpecs.ts`
- Per-diagram components: e.g. `src/components/EconJCurveEffect.jsx`, `src/components/PhillipsCurveSRvsLR.jsx`
- Resolver: `src/components/CustomDiagramResolver.tsx`; in-paper: `src/components/predicted-papers/PredictedPaperDiagramBlock.tsx`

**Math / markdown rendering:** `src/components/predicted-papers/MathsMarkdown.tsx` and `repairSpacing()` in `src/lib/generatePaperPdf.ts` (tests: `src/test/repairSpacing.test.ts`).

**AI marking PROMPTS:** `supabase/functions/mark-with-ai/index.ts`, `mark-aqa-examiner/index.ts`, `mark-diagnostic/index.ts`, `mark-diagram/index.ts`, `mark-homework-submission/index.ts`.

**AI tutor PROMPTS + diagram-keyword sections:** `supabase/functions/ai-tutor/index.ts`.

**On-spec reference (use to avoid reintroducing off-spec content):** `src/data/economicsKnowledgeGraph.ts`, `src/data/topicsCaie.ts`, and the board profiles `src/data/*BoardProfile*.ts` / `src/data/gcseBoardProfiles.ts`.

## Hard rules
1. **Never edit a `.pdf` directly** — they are binary. Edit the data source, then refresh the artifact (rule 2).
2. **Stale static PDF = the #1 cause of "I fixed it but nothing changed."** After editing a paper's data, check `public/<board>-mocks/` for a matching file (e.g. `paper-1-hard.pdf` and its `mark-scheme-...`). If it exists, **delete it** so `staticPaperResolver` falls back to dynamic generation from the updated data. (Only regenerate-and-replace instead if an exact static layout is required.) If no static file exists, the data edit alone is sufficient.
3. **On-spec only.** Never introduce a concept that is not in that board+level's spec (`economicsKnowledgeGraph.ts` / board profiles). When replacing an off-spec question, the replacement must stay in spec. "Harder" means a more demanding question on on-spec content — never a more advanced or obscure concept.
4. **Keep question and mark scheme in sync.** If you change a question, update its mark-scheme entry in the matching `*MarkSchemes*` file or `mark-scheme-*.md` (and vice-versa).
5. **Small, reviewable diffs.** One paper (or one diagram) per commit. Touch only the target item — never reformat or rewrite neighbouring questions.
6. **Verify before "done":** `npm run test` (vitest) must pass and the file must type-check. For diagrams, re-render and visually confirm the corrected geometry.
7. **You cannot unit-test AI marking/tutor quality.** For prompt edits, make the exact change requested and flag it for human re-testing — do not claim it is verified.
