// @ts-nocheck
import { corsHeaders, requireUser } from "../_shared/auth.ts";



const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

interface InsightInput {
  qualification: string;
  board: string;
  targetGrade: string;
  confidence: string;
  paper1: number;
  paper2: number;
  paper1Max: number;
  paper2Max: number;
  paper3Max: number;
  likelyGrade: string;
  optimisticGrade: string;
  worstCaseGrade: string;
  p3RequiredForTarget: number;
  onTrack: boolean;
  risk: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const auth = await requireUser(req);
    if (!auth.ok) return auth.response;
    const input: InsightInput = await req.json();

    const sys = `You are an encouraging Economics study coach. NEVER guarantee grades. Use phrases like "on track for", "achievable", "within reach". Keep tone emotionally supportive but honest. Output STRICT JSON only — no markdown, no preamble.`;

    const user = `Student profile:
- Qualification: ${input.qualification} ${input.board}
- Target grade: ${input.targetGrade}
- Confidence: ${input.confidence}
- Paper 1: ${input.paper1}/${input.paper1Max}
- Paper 2: ${input.paper2}/${input.paper2Max}
- Paper 3 still to take (max ${input.paper3Max})

Current projection:
- Likely grade: ${input.likelyGrade}
- Optimistic: ${input.optimisticGrade}
- Worst case: ${input.worstCaseGrade}
- Paper 3 marks needed for target ${input.targetGrade}: ${input.p3RequiredForTarget === -1 ? "not mathematically possible" : input.p3RequiredForTarget}
- Risk level: ${input.risk}
- On track for target: ${input.onTrack}

Respond with JSON of shape:
{
  "summary": "1-2 sentence honest performance summary",
  "reassurance": "1-2 sentence emotionally calming message",
  "strategy": "1-2 sentence strategic Paper 3 advice",
  "priorities": ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
  "rescuePlan": "Only if not on track: 1-2 sentence comeback plan. Otherwise empty string."
}

Priorities must be specific Economics revision items (e.g. "Macro policy evaluation chains", "Synoptic links between micro and macro", "15-mark essay timing"). No generic advice.`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY ?? "",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: text }), {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: any;
    try { parsed = JSON.parse(content); } catch { parsed = { summary: content }; }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
