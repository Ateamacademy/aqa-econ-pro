// Diagnostic Calculator — strict AQA-style marking via Lovable AI Gateway.
// Marks Q4 (4-mark explain) and Q5 (15-mark essay) and returns numeric marks.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface DiagnosticItem {
  id: "q4" | "q5";
  prompt: string;
  totalMarks: number;
  answer: string;
  hasDiagram?: boolean; // q5 only
  rubric: string;
}

interface ItemResult {
  id: string;
  marks: number;
  totalMarks: number;
  rationale: string;
  strengths: string[];
  improvements: string[];
}

function buildSystem() {
  return `You are a STRICT AQA A-Level Economics (7136) Principal Examiner.

You assign a NUMERICAL mark for the question. Apply AQA mark schemes with full rigor. Default LOWER on borderlines. Never give the benefit of the doubt. Mark only what is actually written — never infer intent.

HARD RULES:
- Cap analysis at 1 mark if chain of reasoning is < 2 logical steps.
- Cap evaluation at 1 mark if not REASONED (a "however" without explanation does not count).
- Inaccurate theory (wrong direction of shift, wrong definition) → cap total at 30%.
- For 15-mark essay: NO supported judgement → cap at 10/15. NO evaluation at all → cap at 7/15.
- For 15-mark essay: missing/incorrect required diagram → cap at 50% (per AQA convention).
- Empty / off-topic / < 15 words → 0 marks.
- Never round up for effort or length. Length is not quality.

Output JSON ONLY in this schema (no markdown, no preamble):
{
  "marks": <integer 0..totalMarks>,
  "rationale": "1-2 sentences citing the AQA discriminator that capped the mark",
  "strengths": ["short bullet quoting student verbatim", ...],
  "improvements": ["specific AQA-aligned next step", ...]
}`;
}

function buildUser(item: DiagnosticItem): string {
  const wc = item.answer.trim().split(/\s+/).filter(Boolean).length;
  const lines = [
    `QUESTION (${item.totalMarks} marks): ${item.prompt}`,
    "",
    `MARK SCHEME / RUBRIC:`,
    item.rubric,
    "",
    `STUDENT ANSWER (${wc} words):`,
    item.answer || "(empty)",
  ];
  if (item.id === "q5") {
    lines.push("", `STUDENT REPORTS DIAGRAM DRAWN: ${item.hasDiagram ? "YES" : "NO"}`);
    if (!item.hasDiagram) {
      lines.push("→ MUST cap total at 7/15 (no diagram = 50% cap on a question that requires one).");
    }
    if (wc < 200) {
      lines.push(`⚠ Under 200 words for a 15-mark question — almost certainly cannot exceed 8/15.`);
    }
  }
  if (item.id === "q4" && wc < 30) {
    lines.push(`⚠ Under 30 words for a 4-mark explain question — almost certainly cannot exceed 2/4.`);
  }
  lines.push("", "Return JSON only.");
  return lines.join("\n");
}

async function markItem(apiKey: string, item: DiagnosticItem): Promise<ItemResult> {
  // Empty-answer short-circuit
  if (!item.answer || item.answer.trim().length < 5) {
    return {
      id: item.id, marks: 0, totalMarks: item.totalMarks,
      rationale: "No answer provided.",
      strengths: [], improvements: ["Write a substantive response addressing the question."],
    };
  }

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: buildSystem() },
        { role: "user", content: buildUser(item) },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    }),
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`AI gateway error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty AI response");
  const parsed = JSON.parse(text);
  let marks = Math.max(0, Math.min(item.totalMarks, Math.round(Number(parsed.marks) || 0)));
  // Server-side enforcement of the no-diagram cap on Q5
  if (item.id === "q5" && item.hasDiagram === false) {
    marks = Math.min(marks, Math.floor(item.totalMarks * 0.5));
  }
  return {
    id: item.id,
    marks,
    totalMarks: item.totalMarks,
    rationale: String(parsed.rationale ?? ""),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3).map(String) : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 3).map(String) : [],
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const body = await req.json();
    const items: DiagnosticItem[] = body.items ?? [];
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items provided" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results = await Promise.all(items.map((it) => markItem(apiKey, it)));

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
