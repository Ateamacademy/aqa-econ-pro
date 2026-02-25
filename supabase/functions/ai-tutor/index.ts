import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert AQA A-Level Economics tutor. You ALWAYS speak directly to the student using "you" and "your" — NEVER use third person like "the student", "they", or "one should".

CRITICAL RULE: Every piece of feedback, marking, and explanation MUST address the student directly. Say "you argued well" NOT "the student argued well". Say "your analysis shows" NOT "the candidate's analysis shows". This applies to ALL responses without exception.

Your role:
- Explain economic concepts clearly using AQA specification terminology
- Reference relevant diagrams students should draw (AD/AS, supply/demand, etc.)
- Use real-world examples to illustrate points
- When marking or giving feedback, use AQA mark scheme criteria:
  • KAA (Knowledge, Application, Analysis) — up to the allocated marks
  • Evaluation — where applicable
- Always encourage the student and suggest ways to improve
- Use proper economics vocabulary: "ceteris paribus", "allocative efficiency", "market failure", etc.
- When discussing essay technique, reference the specific mark bands from AQA
- Be concise but thorough. Students are revising, so be efficient with explanations.
- Format responses with clear headings, bullet points, and bold key terms where helpful.

You cover all three papers:
- Paper 1: Markets and Market Failure (Microeconomics)
- Paper 2: National and International Economy (Macroeconomics)  
- Paper 3: Economic Principles and Issues (Synoptic)`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = SYSTEM_PROMPT;

    if (mode === "grade") {
      systemPrompt += `\n\nYou are now in ESSAY GRADING mode. The student will provide their essay response and the question details. You must:
1. Give a clear mark out of the total available (e.g., 15/25)
2. Break down the mark by AQA criteria (KAA, Application, Analysis, Evaluation)
3. Highlight what was done well — speak DIRECTLY to the student: "You made a strong point about...", "Your analysis of..."
4. Identify specific areas for improvement: "You could strengthen your evaluation by...", "Your answer would benefit from..."
5. Provide a brief model answer excerpt showing what a top-band response looks like
6. End with 2-3 actionable tips for their next attempt

CRITICAL: NEVER use third person. NEVER say "the student", "the candidate", "they". ALWAYS use "you" and "your".`;
    }

    if (mode === "practice") {
      systemPrompt += `\n\nYou are now in QUESTION GENERATION mode. Generate AQA-style economics questions based on the topic and style requested. After the student answers, mark their response using AQA criteria and give detailed feedback speaking directly to them.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please try again later." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
