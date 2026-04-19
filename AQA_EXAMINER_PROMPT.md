# AQA Examiner Marking — opt-in module

A production AQA-examiner marking pipeline that returns structured JSON.
This module is **parallel and opt-in** — it does **not** replace or modify
any existing AQA marking code (`src/lib/aiMarking.ts`,
`src/lib/aqa-marking-engine.ts`, the `mark-with-ai` edge function, etc.).

## Files

- `supabase/functions/mark-aqa-examiner/index.ts` — edge function with the
  full system prompt, tool-calling JSON schema, and Lovable AI Gateway call.
- `src/lib/aqaExaminerMarking.ts` — typed client wrapper.

## Usage

```ts
import { callAqaExaminerMarking } from "@/lib/aqaExaminerMarking";

const result = await callAqaExaminerMarking({
  subject: "Economics",
  paper_code: "7136/1",
  question_number: "06",
  max_marks: 25,
  ao_breakdown: "AO1: 4, AO2: 6, AO3: 8, AO4: 7",
  question_type: "essay",
  question_text: "Evaluate the case for…",
  mark_scheme_text: "<verbatim AQA mark scheme>",
  indicative_content: "<bullet list>",
  level_descriptors: "L5 21-25 …",
  student_response: studentText,
});

if (result.ok) {
  // result.marking conforms to the schema below
}
```

## Output schema

```json
{
  "total_mark": 0,
  "max_marks": 0,
  "percentage": 0.0,
  "grade_band_estimate": "A*|A|B|C|D|E|U",
  "ao_breakdown": [{ "ao_code": "AO1", "marks_awarded": 0, "marks_available": 0, "justification": "" }],
  "level_awarded": { "level": null, "level_range": null, "rationale": "" },
  "marked_points": [{ "mark_scheme_point": "", "credited": true, "evidence_from_response": "", "comment": "" }],
  "strengths": [""],
  "areas_for_improvement": [{ "issue": "", "how_to_improve": "", "reference_to_response": "" }],
  "examiner_summary": "",
  "examiner_notes": "",
  "confidence": "high|medium|low",
  "confidence_explanation": ""
}
```

JSON validity is enforced by tool-calling (the model is forced to call
`submit_marking` with the exact schema), not by free-text JSON mode.

## Defences built in

- **Prompt injection**: student response is wrapped in `<<<STUDENT_RESPONSE>>>`
  delimiters and the system prompt instructs the model to treat the contents
  as untrusted text.
- **Schema drift**: enforced via OpenAI tool-calling JSON schema.
- **Out-of-range marks**: server-side clamps `total_mark` to `[0, max_marks]`
  and recomputes `percentage` from the payload's `max_marks`.
- **Mark-scheme hallucination**: system prompt explicitly forbids it; model
  must surface gaps in `examiner_notes`.
- **Low confidence flag**: surfaced for borderline / ambiguous cases — the UI
  should expose a "Request teacher review" affordance when `confidence ===
  "low"`.

## Recommended UI patterns

- Show `grade_band_estimate` with a disclaimer: "Indicative only — real
  boundaries depend on the full paper and annual standardisation."
- Render `level_awarded` only when non-null (levels-based questions).
- Render `marked_points` as a checklist (✓/✗) with the model's evidence quote.
- Group `areas_for_improvement` so each item shows the response excerpt it
  refers to.

## What this does NOT touch

- `src/lib/aqa-*` (catalog, rubric, tagging, levels, spec, marking engine,
  paper generator, phrases, grade boundaries).
- `src/lib/aiMarking.ts` (AQA Tier-3 advisory marking).
- `supabase/functions/mark-with-ai`, `supabase/functions/mark-exam`,
  `supabase/functions/mark-diagram`.

If you want the existing AQA marking page to use this examiner module, add a
small router at the call site — do not edit any of the protected files.
