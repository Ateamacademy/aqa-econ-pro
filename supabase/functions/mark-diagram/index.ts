import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { requireUser, corsHeaders } from "../_shared/auth.ts";
import { requireSubscription } from "../_shared/subscription.ts";

/* ── Difficulty-aware tone instructions ── */
const TONE_MAP: Record<string, string> = {
  moderate: `Tone: Supportive and instructional. Praise correct elements warmly, explain errors gently with clear guidance.`,
  hard: `Tone: Rigorous with deeper explanation. Expect strong technical accuracy and chains of reasoning. Explain errors with academic precision.`,
  "very-hard": `Tone: Include advanced reasoning and subtle distinctions. Expect nuanced understanding. Point out subtleties the student may have missed.`,
  "limited-edition": `Tone: Examiner-level precision with high standards. Be exacting and detailed. Expect mastery-level responses.`,
  Foundation: `Tone: Supportive and instructional. Praise correct elements warmly, explain errors gently with clear guidance.`,
  Intermediate: `Tone: Rigorous with deeper explanation. Expect strong technical accuracy and chains of reasoning.`,
  Advanced: `Tone: Include advanced reasoning and subtle distinctions. Expect nuanced understanding and precise terminology.`,
};

/* ── Build the enhanced marking prompt ── */
function buildMarkingPrompt(params: {
  question: string;
  studentAnswer: string;
  diagramType: string;
  difficulty: string;
  totalMarks: number;
  board: string;
  markScheme?: any[];
  answerType: string;
  scenarioRubricPrompt?: string;
}) {
  const { question, studentAnswer, diagramType, difficulty, totalMarks, board, markScheme, answerType, scenarioRubricPrompt } = params;
  const tone = TONE_MAP[difficulty] || TONE_MAP.moderate;

  // Prefer the rendered scenario rubric (highest fidelity) when provided.
  const markSchemeSection = scenarioRubricPrompt
    ? `\n\n${scenarioRubricPrompt}\n`
    : (markScheme && markScheme.length > 0
        ? `\n\n=== MARK SCHEME (use this for marking) ===\n${markScheme.map((ms: any) =>
            `Component: "${ms.component_name}" (${ms.mark_value} mark${ms.mark_value > 1 ? "s" : ""})\n` +
            `  Accepted labels/answers: ${(ms.accepted_labels || []).join(", ")}\n` +
            `  Positional accuracy required: ${ms.positional_required ? "YES" : "NO"}\n` +
            `  Strict mode: ${ms.strict_mode ? "YES (exact match only)" : "NO (allow synonyms & minor spelling)"}`,
          ).join("\n")}\n`
        : "");

  return `You are an expert ${board} Economics examiner marking a student's diagram submission.

${tone}

ANSWER TYPE: ${answerType}
DIAGRAM TYPE: ${diagramType}
TOTAL MARKS AVAILABLE: ${totalMarks}
DIFFICULTY: ${difficulty}
${markSchemeSection}

=== QUESTION ===
${question}

=== STUDENT'S ANSWER ===
${studentAnswer}

=== MARKING INSTRUCTIONS ===

You MUST return a valid JSON response (and ONLY JSON, no markdown fencing) with this exact structure:

{
  "marks_awarded": <number>,
  "total_marks": ${totalMarks},
  "mark_percentage": <number 0-100>,
  "component_results": [
    {
      "component": "<name e.g. 'Axes labels'>",
      "marks_available": <number>,
      "marks_awarded": <number>,
      "status": "<correct|partially_correct|incorrect|missing>",
      "confidence": <number 0.0-1.0>,
      "student_label": "<what student wrote or null>",
      "correct_label": "<what was expected>",
      "feedback": "<1-2 sentence specific feedback>"
    }
  ],
  "examiner_summary": {
    "overall_feedback": "<3-4 sentence examiner-style summary addressing the student as 'you'>",
    "strongest_areas": ["<area 1>", "<area 2>"],
    "errors_by_type": {
      "wrong_label": ["<detail>"],
      "vague_explanation": ["<detail>"],
      "incomplete_process": ["<detail>"],
      "misplacement": ["<detail>"],
      "terminology_weakness": ["<detail>"]
    },
    "priority_revision": ["<action 1>", "<action 2>", "<action 3>"],
    "how_to_gain_full_marks": "<paragraph explaining exactly what a full-marks answer looks like>",
    "estimated_grade_band": "<e.g. 'B/A boundary' or 'Solid A*'>"
  },
  "model_answer": {
    "text": "<full model answer that would score full marks>",
    "key_labels": ["<label 1>", "<label 2>"],
    "diagram_description": "<structured description of the ideal diagram>"
  },
  "follow_up_questions": [
    {"question": "<targeted follow-up question 1>", "topic": "<topic>"},
    {"question": "<targeted follow-up question 2>", "topic": "<topic>"},
    {"question": "<targeted follow-up question 3>", "topic": "<topic>"}
  ],
  "misconceptions_detected": [
    {"misconception": "<what the student got wrong conceptually>", "correction": "<the correct understanding>", "severity": "<minor|moderate|major>"}
  ]
}

MARKING RULES:
1. Compare student labels against accepted synonyms · allow minor spelling variation if meaning is correct
2. For label-based answers: check whether labels match the correct diagram component, not just whether the word exists
3. For explanation-based answers: assess scientific accuracy, completeness, and clarity
4. Distinguish between fully correct, partially correct, mislabelled, and missing elements
5. Award partial credit ONLY when the student has demonstrated genuine understanding of the correct concept · not for vague or accidental resemblance
6. Do NOT over-penalise formatting issues IF the concept is clearly demonstrated · but do NOT award marks for formatting alone
7. Provide confidence scores for each marking decision (1.0 = certain, 0.5 = borderline)
8. Address the student directly using "you" and "your" · NEVER "the student" or "the candidate"
9. Explain exactly why marks were gained or lost
10. Highlight what was correct FIRST, then explain improvements

COMPONENT-BASED SCORING (mark each element independently, then sum · do NOT let one missing element collapse the whole score):
11. Break the diagram into its components (axes, each curve, equilibrium/intersection points, shift direction, shaded/welfare areas, annotations) and award each component's marks on its OWN evidence, then total them.
12. Assess and report SEPARATELY in component_results: (a) the ECONOMIC CONCEPT being tested (e.g. correct shift direction, growth vs contraction, output at MC=MR), (b) DIAGRAM ACCURACY (curve shapes, positions, correct intersections/zones), and (c) LABELLING/PRESENTATION (axis + curve labels). A weakness in one must not zero the others.

WHEN TO AWARD ZERO (only genuine cases · there is NO automatic-zero / "fatal error" rule beyond this):
13. Award 0 ONLY if there is no identifiable economic content at all — no recognisable curves AND no economic labels/annotations (a blank canvas or meaningless scribble).
14. If the diagram shows a recognisable, correctly-oriented economic structure (right curves, correct shift), it MUST score the marks for the elements present, even if axis labels or some curve labels are missing. Missing axis labels cost ONLY the axis-label mark(s) — NEVER the whole score. Do not collapse a substantive diagram to 0, and do not force a genuine 3/4 or 4/6 down to 0.
15. Never award "benefit of the doubt" marks for an ambiguous unlabelled scribble; but equally never zero a substantive diagram over a single missing label.

ACCEPT VALID ALTERNATIVES (do not penalise correct alternatives):
16. Accept economically valid alternative representations and mark the ECONOMICS, not one canonical drawing style. Examples: a straight-line OR bowed-out PPF where the question does not require a specific shape; alternative but correct foreign-exchange axis conventions; any correct way of showing the concept tested. If unsure whether an alternative is valid, treat it as valid and say so in feedback.

VERIFY BEFORE DEDUCTING (do not hallucinate missing elements):
17. Before marking any element "missing" or "incorrect", confirm it is genuinely absent from or wrong in the DIAGRAM ITSELF. Do NOT deduct for an element that is actually present. Do NOT treat "not restated in the written explanation" as "missing from the diagram" — assess the diagram and the explanation separately.

CATCH REAL ERRORS (do not over-reward · full marks require correctness):
18. Explicitly validate every economically-significant LABEL and the spatial POSITION/ZONE of each marked point against the correct diagram. A swapped/mislabelled curve (e.g. MSB/MPB or D/S reversed), a point in the wrong zone (e.g. on the PPF when unemployment requires a point INSIDE it, or output not drawn at MC=MR), or a wrongly-identified welfare area MUST lose the relevant mark(s) even if the overall shape looks correct. Do NOT award full marks when a required label or position is wrong.
19. First identify the policy instrument / diagram sub-type actually drawn (e.g. minimum price vs subsidy, balanced vs biased growth) and mark against THAT; flag any mismatch with the intended diagram.

FEEDBACK STANDARD (mandatory whenever marks_awarded < total_marks):
20. For EVERY mark not awarded, the matching component_results entry MUST state which element was missing/incorrect and why. Never return a reduced total without a specific, element-level reason. Apply consistent penalties to equivalent errors across diagram types.

Return ONLY the JSON object. No markdown code fences, no explanation text outside the JSON.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const auth = await requireUser(req);
    if (!auth.ok) return auth.response;
    const sub = await requireSubscription(auth.email);
    if (!sub.ok) return sub.response;
    const userId = auth.userId;

    const body = await req.json();
    const {
      question,
      studentAnswer,
      diagramType,
      difficulty = "moderate",
      totalMarks = 4,
      board = "AQA",
      answerType = "text",
      scenarioId,
      scenarioRubric, // optional: per-scenario rubric components (preferred when provided)
      scenarioRubricPrompt, // optional: pre-rendered prompt block from client
    } = body;

    if (!question || !studentAnswer) {
      return new Response(JSON.stringify({ error: "Missing question or studentAnswer" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Fetch mark scheme from database if available
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let markScheme: any[] = Array.isArray(scenarioRubric) ? scenarioRubric : [];
    if (markScheme.length === 0 && diagramType) {
      const { data } = await supabase
        .from("diagram_mark_schemes")
        .select("*")
        .eq("diagram_type", diagramType)
        .or(`board.is.null,board.eq.${board}`);
      if (data && data.length > 0) markScheme = data;
    }

    const prompt = buildMarkingPrompt({
      question,
      studentAnswer,
      diagramType: diagramType || "unknown",
      difficulty,
      totalMarks,
      board,
      markScheme,
      answerType,
      scenarioRubricPrompt,
    });

    // Use tool calling for structured output
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert economics diagram examiner. Return ONLY valid JSON." },
          { role: "user", content: prompt },
        ],
        reasoning: { effort: "medium" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI marking failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const responseText = await response.text();
    let aiResult;
    try {
      aiResult = JSON.parse(responseText);
    } catch {
      console.error("AI gateway returned non-JSON:", responseText.substring(0, 500));
      return new Response(JSON.stringify({ error: "AI gateway returned an invalid response. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const rawContent = aiResult.choices?.[0]?.message?.content || "";

    if (!rawContent || rawContent.trim().length === 0) {
      console.error("AI returned empty content");
      return new Response(JSON.stringify({ error: "AI returned an empty response. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Robust JSON extraction with repair
    function extractJson(text: string): unknown {
      let cleaned = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      // Remove control characters
      cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, (ch) => ch === "\n" || ch === "\t" ? ch : "");

      const jsonStart = cleaned.search(/[\{\[]/);
      const startChar = jsonStart !== -1 ? cleaned[jsonStart] : "{";
      const endChar = startChar === "[" ? "]" : "}";
      const jsonEnd = cleaned.lastIndexOf(endChar);

      if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
        throw new Error("No JSON object found in response");
      }

      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);

      try {
        return JSON.parse(cleaned);
      } catch {
        // Fix trailing commas and unbalanced braces
        cleaned = cleaned.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
        let braces = 0, brackets = 0;
        for (const c of cleaned) {
          if (c === "{") braces++;
          if (c === "}") braces--;
          if (c === "[") brackets++;
          if (c === "]") brackets--;
        }
        while (brackets > 0) { cleaned += "]"; brackets--; }
        while (braces > 0) { cleaned += "}"; braces--; }
        return JSON.parse(cleaned);
      }
    }

    let markingResult;
    try {
      markingResult = extractJson(rawContent);
    } catch (parseErr) {
      console.error("Failed to parse marking JSON:", rawContent.substring(0, 500));
      return new Response(JSON.stringify({ error: "Failed to parse marking result. Please try again." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Persist result to database if userId provided
    {
      const { error: insertErr } = await supabase.from("diagram_marking_results").insert({
        user_id: userId,
        diagram_type: diagramType || "unknown",
        topic: diagramType || "unknown",
        difficulty,
        total_marks: totalMarks,
        marks_awarded: markingResult.marks_awarded || 0,
        answer_type: answerType,
        component_results: markingResult.component_results || [],
        examiner_report: markingResult.examiner_summary || null,
        feedback_text: markingResult.examiner_summary?.overall_feedback || "",
        question_text: question,
        student_answer: studentAnswer,
        scenario_id: scenarioId || null,
      });
      if (insertErr) console.error("Failed to persist marking result:", insertErr);

      // Track misconceptions
      if (markingResult.misconceptions_detected?.length > 0) {
        for (const mc of markingResult.misconceptions_detected) {
          // Upsert misconception
          const { data: existing } = await supabase
            .from("diagram_misconceptions")
            .select("id, frequency_count")
            .eq("diagram_type", diagramType || "unknown")
            .eq("misconception_text", mc.misconception)
            .single();

          if (existing) {
            await supabase.from("diagram_misconceptions").update({
              frequency_count: existing.frequency_count + 1,
            }).eq("id", existing.id);
          } else {
            await supabase.from("diagram_misconceptions").insert({
              diagram_type: diagramType || "unknown",
              misconception_text: mc.misconception,
              correct_explanation: mc.correction,
              severity: mc.severity || "minor",
              frequency_count: 1,
            });
          }
        }
      }
    }

    return new Response(JSON.stringify(markingResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("mark-diagram error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
