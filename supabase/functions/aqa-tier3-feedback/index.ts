/**
 * AQA Tier 3 analytical feedback edge function.
 *
 * STRICT GUARDRAIL: never assigns a numerical mark or specific level.
 * Returns analytical feedback on strengths and gaps only.
 * The client also strips numbers/levels as a backstop.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Body {
  questionNumber: number;
  totalMarks: number;
  prompt: string;
  studentAnswer: string;
  indicativeContent: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    if (!body?.studentAnswer || !body?.prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt or studentAnswer" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const indicative = (body.indicativeContent ?? []).map((c) => `- ${c}`).join("\n");

    const systemPrompt = `You are an experienced AQA A-Level Economics (7136) examiner providing ANALYTICAL FEEDBACK to a student.

STRICT RULES — these are non-negotiable:
1. DO NOT assign a numerical mark (e.g. "5/9", "12 out of 15").
2. DO NOT suggest a specific level (e.g. "Level 3", "this is Level 2").
3. DO NOT use phrases like "I would award", "this would score", "this gets X marks".
4. Provide analytical feedback on STRENGTHS and GAPS only.
5. Use AQA's KAA+E framework: Knowledge, Application, Analysis, Evaluation.
6. Reference indicative content where the answer falls short.
7. Suggest concrete improvements (e.g. "extend the chain of reasoning to a third step", "weigh up the limitation X before concluding").
8. Keep feedback to 4-6 short paragraphs.

If you cannot avoid assigning a mark/level, the response will be discarded.`;

    const userPrompt = `Question (${body.totalMarks} marks): ${body.prompt}

Indicative content the answer should engage with:
${indicative || "(none provided)"}

Student answer:
"""
${body.studentAnswer}
"""

Provide analytical feedback now. Remember: NO marks, NO levels.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 800,
          stream: false,
        }),
      },
    );

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited — please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "Feedback service unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const feedback = data.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("aqa-tier3-feedback error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
