## EconRev AI Grade Calculator & Paper 3 Strategy Engine

A new feature that helps Economics students estimate their overall grade after Papers 1 & 2, work out exactly what they need in Paper 3, and get AI-driven feedback and a rescue plan if they're below target.

### Scope (Phase 1 + 2 + 3 in one build)

Phases 1–3 of your spec, shipped together as a single polished route. Phase 4 (teacher integration, cohort benchmarking) deferred — already partially exists in the Teacher area and can be wired later.

### User flow

1. **Setup** — Qualification (GCSE / A-Level), Exam Board (AQA, Edexcel, OCR, IB), Target Grade.
2. **Marks input** — Paper 1 + Paper 2 scores (with max-mark hints per board).
3. **Confidence** — Very confident / Somewhat / Unsure / Worst case.
4. **Live dashboard** — current estimated grade, probability band, Paper 3 required marks, risk level, "What If?" Paper 3 slider, AI insight feed, Grade Rescue panel when below target.

### Pages / components

- **Route**: `/grade-calculator` (lazy-loaded in `App.tsx`, linked from Dashboard + top nav)
- **Page**: `src/pages/GradeCalculator.tsx` — orchestrates state, calls AI edge function
- **Components** in `src/components/grade-calculator/`:
  - `SetupCard.tsx` — qualification / board / target
  - `MarksInputCard.tsx` — animated number inputs + sliders for P1, P2
  - `ConfidenceSelector.tsx` — 4-option segmented control
  - `GradeThermometer.tsx` — animated SVG showing current → target → stretch
  - `Paper3RequirementCard.tsx` — marks needed for each grade band
  - `ProbabilityBands.tsx` — Risk / Likely / Stretch grade visuals
  - `WhatIfSlider.tsx` — drag P3 slider, live grade updates (Framer Motion)
  - `AIInsightFeed.tsx` — scrolling cards: summary, reassurance, strategy, priorities
  - `GradeRescuePanel.tsx` — shows when projected < target
  - `Disclaimer.tsx` — "Predictions are estimates…" footer

### Grade calculation engine

- **Pure TS module**: `src/lib/gradeCalculator/`
  - `boundaries.ts` — static seed data per board × qualification × grade (uses existing `src/lib/aqa-grade-boundaries.ts` and `src/lib/boards/edexcel-a-a-level/grade-boundaries.ts`; adds stubs for OCR, IB, GCSE boards using publicly-known recent series)
  - `papers.ts` — paper weightings + max marks per board
  - `predict.ts` — `predictGrade({ board, qual, p1, p2, confidence, target })` → `{ likely, optimistic, worstCase, p3Required: Record<Grade, number>, confidenceScore, risk }`
  - Confidence widens the band (±2/±5/±8/±12 marks on P1+P2 baseline).

### AI feedback engine

- **Edge function**: `supabase/functions/grade-calculator-insights/index.ts`
  - Input: prediction result + student inputs
  - Calls Lovable AI Gateway (`google/gemini-3-flash-preview`) with structured-output schema returning `{ summary, reassurance, strategy, priorities[], rescuePlan? }`
  - Tone modulated by confidence + gap-to-target
- Client: `useGradeInsights` hook with React Query, debounced 800ms after inputs settle

### Database (Supabase migration)

Track sessions for the analytics requirement (Section 16) — light and additive.

- `grade_calculator_sessions`
  - `user_id`, `qualification`, `exam_board`, `target_grade`
  - `paper1_score`, `paper2_score`, `confidence`
  - `predicted_grade`, `p3_required_target`
  - RLS: users insert/read own rows; service role full access
- No changes to existing tables.

### Visual design

- Reuse the dark-navy premium aesthetic (`bg-card`, `border-border`, `text-primary`, gradient `from-primary to-cyan-pop` as already used in `GradeLikelihoodPanel`).
- Framer Motion for slider/thermometer/number-tick animations.
- Mobile-first single-column → two-column at md+. Grid follows existing dashboard panel style.

### Branding rules respected

- No "AI" student-facing label — call it the "Grade Calculator" / "Instant Feedback" panel (per project memory).
- Disclaimer always visible.
- No grade guarantees in AI prompts (prompt explicitly forbids absolute language).

### Out of scope (this build)

- Teacher cohort dashboards (Phase 4)
- Community benchmarking
- Auto-generated full revision plans (links to existing Study Notes / Predicted Papers instead)
- Post-exam reaction social mode

### Deliverables

1. New `/grade-calculator` route + nav link
2. ~10 new components under `grade-calculator/`
3. Pure calculation library with unit tests in `src/test/`
4. One edge function for AI insights
5. One migration for the sessions table

Ready to build on approval.
