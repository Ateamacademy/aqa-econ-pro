// AQA — diagram contextual analysis (AI feedback only, never marks).
// Runs against AQA's level-of-response framework. Hard constraints + JSON-only output.
//
// Request body:
//   {
//     prompt: string,
//     rubric: AqaDiagramRubric,
//     diagramElements: Array<unknown>,    // structured canvas data (no images)
//     writtenAnswer?: string,
//     structuralResults?: Array<{ componentId: string; passed: boolean }>,
//   }
//
// Response: AiDiagramAnalysis (see types in src/lib/aqa-diagram-ai.ts).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are marking an AQA A-Level Economics diagram against the provided rubric.

Follow these rules strictly:
1. Do NOT assign a numerical mark. Never output numbers like "7/9" or "worth 5 marks".
2. Recommend a Level (L1, L2, L3, or L4) based on AQA's level-of-response framework, NOT a specific mark.
3. Ground every component assessment in evidence from the student's diagram data or written answer.
4. Use AQA's KAA+E terminology (Knowledge, Application, Analysis, Evaluation) when explaining the level recommendation.
5. If the student has used an acceptable alternative diagram listed in the rubric, award components generously.
6. Be direct about gaps. Students benefit from specific feedback, not vague encouragement.

Return ONLY a JSON object — no prose, no markdown — matching this exact shape:
{
  "contextualComponents": [
    { "componentId": "string", "present": boolean, "evidence": "string", "confidence": "high"|"medium"|"low" }
  ],
  "strengths": ["..."],
  "gaps": ["..."],
  "levelRecommendation": { "level": "L1"|"L2"|"L3"|"L4", "rationale": "..." },
  "writtenAnswerInteraction": "string"
}`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const body = await req.json();
    const { prompt, rubric, diagramElements, writtenAnswer, structuralResults } = body ?? {};
    if (!prompt || !rubric) {
      return new Response(JSON.stringify({ error: "prompt and rubric are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userPayload = {
      questionPrompt: prompt,
      rubric,
      structuralResultsAlreadyComputed: structuralResults ?? [],
      diagramElements: diagramElements ?? [],
      writtenAnswer: writtenAnswer ?? "",
    };

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: JSON.stringify(userPayload) },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (upstream.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limited — try again shortly." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (upstream.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!upstream.ok) {
      const t = await upstream.text();
      console.error("AI gateway error:", upstream.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await upstream.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";

    // Sanitize: strip ANY numerical-mark phrasing the model might emit.
    let analysis: any;
    try { analysis = JSON.parse(raw); } catch { analysis = {}; }

    const sanitiseString = (s: string): string =>
      s
        .replace(/\b\d+\s*\/\s*\d+\b/g, "—")
        .replace(/\b\d+\s*marks?\b/gi, "marks")
        .replace(/worth\s+\d+/gi, "worth")
        .replace(/awarded?\s+\d+/gi, "awarded");

    const sanitiseAny = (val: any): any => {
      if (typeof val === "string") return sanitiseString(val);
      if (Array.isArray(val)) return val.map(sanitiseAny);
      if (val && typeof val === "object") {
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(val)) out[k] = sanitiseAny(v);
        return out;
      }
      return val;
    };

    const cleaned = sanitiseAny(analysis);

    // Validate required shape — fall back to neutral message on malformed output.
    const valid =
      cleaned &&
      Array.isArray(cleaned.contextualComponents) &&
      Array.isArray(cleaned.strengths) &&
      Array.isArray(cleaned.gaps) &&
      cleaned.levelRecommendation &&
      typeof cleaned.levelRecommendation.level === "string" &&
      /^L[1234]$/.test(cleaned.levelRecommendation.level);

    if (!valid) {
      return new Response(
        JSON.stringify({
          fallback: true,
          message: "AI analysis unavailable — proceed with self-assessment.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(cleaned), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("aqa-mark-diagram error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
