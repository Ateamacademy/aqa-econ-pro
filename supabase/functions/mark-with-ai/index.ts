// Tier 3 — provider-agnostic AI marking.
// Default provider is Lovable AI Gateway (no key setup required).
// To swap to Gemini-direct / Anthropic / OpenAI later, set AI_PROVIDER and
// AI_API_KEY in Supabase secrets — no code change needed.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type AnswerKind = "extended-response" | "diagram";

interface MarkingPayload {
  kind: AnswerKind;
  paperId?: string;
  questionId: string;
  question: {
    number: string;
    marks: number;
    prompt: string;
    markScheme?: {
      levels?: Array<{ level: string; band: string; descriptor: string }>;
      indicativeContent?: string[];
    };
  };
  studentAnswer: string;
  diagramData?: unknown;
  structuralCheckResults?: unknown;
}

interface AiAnalysis {
  strengths: string[];
  gaps: string[];
  levelRecommendation: { level: "L1" | "L2" | "L3" | "L4" | "L5"; rationale: string };
  kaaeBreakdown: {
    knowledge: { present: boolean; evidence: string };
    application: { present: boolean; evidence: string };
    analysis: { present: boolean; evidence: string };
    evaluation: { present: boolean; evidence: string };
  };
}

/* ── Rate limit: 20 calls / hour per user ── */
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkRate(userId: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const b = rateBuckets.get(userId);
  if (!b || b.resetAt < now) {
    rateBuckets.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (b.count >= RATE_LIMIT) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count++;
  return { ok: true };
}

/* ── SHA-256 cache key ── */
async function hashPayload(payload: MarkingPayload): Promise<string> {
  const text = JSON.stringify({
    q: payload.questionId,
    a: payload.studentAnswer,
    d: payload.diagramData ?? null,
  });
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ── Prompts ──
 * Tuned for MAXIMUM AQA EXAMINER STRICTNESS. The previous prompt was too
 * lenient ("award generously", "be direct but…") and ignored the AQA
 * level discriminators, so students got L4/L5 for L2/L3 work.
 */
function buildSystemPrompt(_payload: MarkingPayload): string {
  return `You are a senior AQA A-Level Economics (7136) Principal Examiner. You apply the AQA mark scheme with the SAME RIGOR used in live examination marking. You are deliberately STRICT. You do NOT assign numerical marks — only a level recommendation (L1–L5) — but your level placement must match how an AQA examiner would judge the script.

═══════════════════════════════════════════════════
AQA LEVEL-OF-RESPONSE FRAMEWORK — APPLY EXACTLY
═══════════════════════════════════════════════════
For 25-mark essays and 15-mark / 9-mark extended-response questions, AQA uses 5 levels keyed to the KAA+E assessment objectives:

• L1 (lowest band) — Isolated/superficial knowledge. Little or no application to context. No analytical chains. No evaluation. Often just definitions or assertions. Frequent inaccuracy.

• L2 — Some relevant knowledge but partial / muddled. Limited or generic application (named context but not used analytically). Underdeveloped chains of reasoning (one-step "X causes Y", no further consequence). Evaluation absent or asserted ("however, it depends") with no reasoning. Diagrams may be present but unexplained.

• L3 — Sound knowledge with mostly accurate use of theory. Application is explicit and uses the case/extract/scenario data. Analysis develops a chain of at least 2–3 logical steps with correct economic mechanism. Some evaluation is attempted but is undeveloped, one-sided, or unsupported (e.g. "in the long run this might not work" without explaining why).

• L4 — Detailed knowledge accurately deployed. Sustained application throughout, integrating context data into the argument (not just naming it). Multiple analytical chains, each developed with correct cause-and-effect. Evaluation is supported with reasoning — counter-arguments, magnitude/probability/time-frame considerations, or qualifications — but lacks a prioritised, justified judgement.

• L5 (top band) — As L4, plus a SUPPORTED, PRIORITISED JUDGEMENT. The student weighs competing factors, signals which matters most and why (using criteria such as elasticity, magnitude, time-frame, ceteris-paribus realism, or stakeholder impact), and reaches a justified conclusion that follows from the analysis. Evaluation is sustained throughout, not just bolted on at the end.

═══════════════════════════════════════════════════
HARD DISCRIMINATORS — DO NOT IGNORE
═══════════════════════════════════════════════════
1. NO EVALUATION → maximum L3. An answer with KAA but zero supported evaluation CANNOT reach L4 regardless of how good the analysis is. "However…" or "On the other hand…" without reasoning is NOT evaluation.
2. NO SUPPORTED JUDGEMENT → maximum L4. A conclusion that just restates points without prioritising them is L4, not L5. "In conclusion, both sides have merit" is NOT a supported judgement.
3. NO USE OF CONTEXT (where given) → maximum L2 for application. Naming the firm/country/extract without using its data analytically does NOT count as application.
4. CHAIN OF REASONING <2 STEPS → maximum L2 for analysis. "Tax raises price so demand falls" is one step. To reach L3 analysis the student must extend (e.g. "…demand falls; the size of the fall depends on PED; if demand is inelastic, revenue rises…").
5. INACCURATE THEORY (wrong diagram, wrong direction of shift, wrong definition) → cap at L2 regardless of length.
6. INDICATIVE CONTENT — if the mark scheme lists indicative content and the answer addresses NONE of it, cap at L2. If it addresses some but with errors, cap at L3.
7. LENGTH IS NOT QUALITY. A long answer that repeats the same point or padding with definitions does NOT climb levels. Reward DEPTH not WORD COUNT.

═══════════════════════════════════════════════════
ANTI-LENIENCY RULES
═══════════════════════════════════════════════════
• You are NOT a friendly tutor. You are an examiner. Default to the LOWER level when an answer is on the borderline. AQA examiners err on the side of strictness, not generosity.
• Do NOT give credit for "potential" or "implied" understanding. Mark only what is ACTUALLY WRITTEN.
• Do NOT round up because the student "tried hard" or showed effort.
• If the answer is short (< 80 words for a 9-mark, < 200 words for a 15-mark, < 400 words for a 25-mark), it almost certainly cannot reach L4 — there is not enough material.
• If you cannot quote a specific phrase that demonstrates a KAA+E component, that component is NOT present. Mark "present": false.

═══════════════════════════════════════════════════
KAA+E COMPONENT TEST (be ruthless)
═══════════════════════════════════════════════════
• knowledge.present = true ONLY if the student correctly defines or accurately uses the relevant economic concept(s) named in the question. Misuse or vague gestures = false.
• application.present = true ONLY if the student references specific data, names, numbers, or features from the case study/extract AND uses them in the argument (not just decoration). If the question has no context, application = use of a real-world example with specifics.
• analysis.present = true ONLY if there is a chain of reasoning of at least 2 logical steps with correct economic mechanism. A diagram counts toward analysis ONLY if it is explained in the prose.
• evaluation.present = true ONLY if there is REASONED evaluation — a counter-argument, qualification (PED/PES/time-frame/magnitude), comparison of alternatives, or supported judgement with WHY. "It depends" with no explanation = false.

═══════════════════════════════════════════════════
OUTPUT
═══════════════════════════════════════════════════
• Output JSON ONLY. No preamble, no markdown, no commentary outside the schema.
• NEVER write a numerical mark ("7/9", "worth 5 marks", "5 out of 9", etc.). Recommend a level only.
• Strengths and gaps MUST quote short verbatim phrases from the student's answer (in "double quotes") to ground the judgement. If you cannot quote, the point is too vague to include.
• Gaps MUST name the specific AQA discriminator the student missed (e.g. "no supported judgement — Level 5 ceiling not met", "chain of reasoning stops at one step — Level 3 analysis ceiling").
• rationale MUST reference (a) the highest level the answer reaches and (b) the specific discriminator that caps it from going higher.

Schema (exact):
{
  "strengths": [2-3 bullet points, each grounded in a verbatim quote],
  "gaps": [2-3 bullet points, each naming the AQA discriminator missed],
  "levelRecommendation": {
    "level": "L1"|"L2"|"L3"|"L4"|"L5",
    "rationale": "1-2 sentences: highest level reached + which AQA discriminator caps it"
  },
  "kaaeBreakdown": {
    "knowledge": {"present": boolean, "evidence": "short verbatim quote or 'no evidence found'"},
    "application": {"present": boolean, "evidence": "short verbatim quote or 'no evidence found'"},
    "analysis": {"present": boolean, "evidence": "short verbatim quote or 'no evidence found'"},
    "evaluation": {"present": boolean, "evidence": "short verbatim quote or 'no evidence found'"}
  }
}`;
}

function buildUserPrompt(payload: MarkingPayload): string {
  const lines: string[] = [];
  lines.push(`QUESTION ${payload.question.number} — worth ${payload.question.marks} marks (AQA A-Level Economics 7136)`);
  lines.push("");
  lines.push("PROMPT:");
  lines.push(payload.question.prompt);

  if (payload.question.markScheme?.levels?.length) {
    lines.push("\nAQA MARK SCHEME — LEVEL DESCRIPTORS (apply verbatim):");
    for (const lvl of payload.question.markScheme.levels) {
      lines.push(`• ${lvl.level} (${lvl.band}): ${lvl.descriptor}`);
    }
  }

  if (payload.question.markScheme?.indicativeContent?.length) {
    lines.push("\nINDICATIVE CONTENT (the answer should address several of these — if it addresses NONE, cap at L2; if it addresses some but with errors, cap at L3):");
    for (const item of payload.question.markScheme.indicativeContent) {
      lines.push(`• ${item}`);
    }
  }

  // Word count signal — helps enforce length-based caps
  const wordCount = (payload.studentAnswer ?? "").trim().split(/\s+/).filter(Boolean).length;
  lines.push(`\nSTUDENT ANSWER LENGTH: ${wordCount} words`);
  if (payload.question.marks >= 25 && wordCount < 400) {
    lines.push("⚠ Length signal: under 400 words for a 25-mark question — almost certainly cannot reach L4 unless exceptionally dense.");
  } else if (payload.question.marks >= 15 && wordCount < 200) {
    lines.push("⚠ Length signal: under 200 words for a 15-mark question — almost certainly cannot reach L4.");
  } else if (payload.question.marks >= 9 && wordCount < 80) {
    lines.push("⚠ Length signal: under 80 words for a 9-mark question — almost certainly cannot reach L3.");
  }

  if (payload.kind === "diagram") {
    lines.push("\nSTUDENT'S DRAWN DIAGRAM (structured canvas data — judge whether the diagram correctly demonstrates the economic mechanism named in the question):");
    lines.push(JSON.stringify(payload.diagramData ?? {}, null, 2));
    if (payload.structuralCheckResults) {
      lines.push("\nTier 1 structural check results (these are AUTHORITATIVE — if Tier 1 says axes/curves are missing, you must NOT credit those components):");
      lines.push(JSON.stringify(payload.structuralCheckResults, null, 2));
    }
    if (payload.studentAnswer?.trim()) {
      lines.push("\nWRITTEN EXPLANATION:");
      lines.push(payload.studentAnswer);
    } else {
      lines.push("\nWRITTEN EXPLANATION: (none provided — diagram alone caps analysis/evaluation at L2 since the student has not explained the mechanism).");
    }
  } else {
    lines.push("\nSTUDENT ANSWER (mark this verbatim — do NOT infer intent):");
    lines.push(payload.studentAnswer?.trim() ? payload.studentAnswer : "(empty answer — recommend L1 with all KAA+E components absent)");
  }

  lines.push("\n═══════════════════════════════════════════════════");
  lines.push("Now apply the AQA framework with examiner rigor. Quote verbatim. Default LOWER on borderlines. Return JSON only.");
  return lines.join("\n");
}

/* ── Provider implementations ── */
type ProviderResult = { analysis: AiAnalysis; inputTokens?: number; outputTokens?: number };

async function callLovable(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Lovable AI error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Lovable AI returned empty response");
  return {
    analysis: JSON.parse(text),
    inputTokens: data.usage?.prompt_tokens,
    outputTokens: data.usage?.completion_tokens,
  };
}

async function callGemini(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1500,
        responseMimeType: "application/json",
      },
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Gemini error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned empty response");
  return {
    analysis: JSON.parse(text),
    inputTokens: data.usageMetadata?.promptTokenCount,
    outputTokens: data.usageMetadata?.candidatesTokenCount,
  };
}

async function callAnthropic(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      temperature: 0.3,
      system: systemPrompt + "\n\nReturn ONLY the JSON object — no markdown fences.",
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Anthropic error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error("Anthropic returned empty response");
  // Strip code fences defensively
  const json = text.replace(/^```json\s*|\s*```$/g, "").trim();
  return {
    analysis: JSON.parse(json),
    inputTokens: data.usage?.input_tokens,
    outputTokens: data.usage?.output_tokens,
  };
}

async function callOpenAI(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string,
): Promise<ProviderResult> {
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`OpenAI error ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenAI returned empty response");
  return {
    analysis: JSON.parse(text),
    inputTokens: data.usage?.prompt_tokens,
    outputTokens: data.usage?.completion_tokens,
  };
}

/* ── Sanitiser: defensively strip any numerical-mark phrases ── */
function stripMarks(text: string): string {
  if (!text) return text;
  return text
    .replace(/\b\d+\s*\/\s*\d+\b/g, "[mark stripped]")
    .replace(/\b\d+\s+marks?\b/gi, "[marks stripped]")
    .replace(/\bworth\s+\d+\b/gi, "[stripped]")
    .replace(/\baward(?:ed)?\s+\d+\b/gi, "[stripped]")
    .replace(/\bscore\s+of\s+\d+\b/gi, "[stripped]")
    .replace(/\blevel\s*\d\s+is\s+worth\b/gi, "[stripped]");
}

function sanitiseAnalysis(a: AiAnalysis): AiAnalysis {
  return {
    strengths: (a.strengths ?? []).map(stripMarks),
    gaps: (a.gaps ?? []).map(stripMarks),
    levelRecommendation: {
      level: a.levelRecommendation?.level ?? "L1",
      rationale: stripMarks(a.levelRecommendation?.rationale ?? ""),
    },
    kaaeBreakdown: {
      knowledge: {
        present: !!a.kaaeBreakdown?.knowledge?.present,
        evidence: stripMarks(a.kaaeBreakdown?.knowledge?.evidence ?? ""),
      },
      application: {
        present: !!a.kaaeBreakdown?.application?.present,
        evidence: stripMarks(a.kaaeBreakdown?.application?.evidence ?? ""),
      },
      analysis: {
        present: !!a.kaaeBreakdown?.analysis?.present,
        evidence: stripMarks(a.kaaeBreakdown?.analysis?.evidence ?? ""),
      },
      evaluation: {
        present: !!a.kaaeBreakdown?.evaluation?.present,
        evidence: stripMarks(a.kaaeBreakdown?.evaluation?.evidence ?? ""),
      },
    },
  };
}

function validateAnalysis(a: unknown): a is AiAnalysis {
  if (!a || typeof a !== "object") return false;
  const x = a as Record<string, unknown>;
  if (!Array.isArray(x.strengths) || !Array.isArray(x.gaps)) return false;
  const lr = x.levelRecommendation as Record<string, unknown> | undefined;
  if (!lr || typeof lr.level !== "string" || typeof lr.rationale !== "string") return false;
  const kb = x.kaaeBreakdown as Record<string, unknown> | undefined;
  if (!kb) return false;
  for (const k of ["knowledge", "application", "analysis", "evaluation"]) {
    const v = kb[k] as Record<string, unknown> | undefined;
    if (!v || typeof v.present !== "boolean" || typeof v.evidence !== "string") return false;
  }
  return true;
}

/* ── Main handler ── */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  // Auth
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  let userId: string | null = null;
  if (token) {
    const { data } = await supabase.auth.getUser(token);
    userId = data.user?.id ?? null;
  }
  if (!userId) {
    return new Response(JSON.stringify({ error: "auth_required" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Provider config
  const provider = (Deno.env.get("AI_PROVIDER") ?? "lovable").toLowerCase();
  const lovableKey = Deno.env.get("LOVABLE_API_KEY") ?? "";
  const customKey = Deno.env.get("AI_API_KEY") ?? "";
  const apiKey = provider === "lovable" ? lovableKey : customKey;
  const defaultModel =
    provider === "lovable" ? "google/gemini-2.5-flash"
    : provider === "gemini" ? "gemini-2.0-flash"
    : provider === "anthropic" ? "claude-sonnet-4-20250514"
    : provider === "openai" ? "gpt-4o-mini"
    : "google/gemini-2.5-flash";
  const model = Deno.env.get("AI_MODEL") ?? defaultModel;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ai_not_configured" }), {
      status: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Parse payload
  let payload: MarkingPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!payload?.questionId || !payload?.question || !payload?.kind) {
    return new Response(JSON.stringify({ error: "missing_fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Cache lookup
  const cacheKey = await hashPayload(payload);
  const { data: cached } = await supabase
    .from("ai_marking_cache")
    .select("analysis")
    .eq("cache_key", cacheKey)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (cached?.analysis) {
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      paper_id: payload.paperId ?? null,
      question_id: payload.questionId,
      provider,
      model,
      cache_hit: true,
      status: "ok",
    });
    return new Response(JSON.stringify({ analysis: cached.analysis, cached: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Rate limit
  const rate = checkRate(userId);
  if (!rate.ok) {
    return new Response(
      JSON.stringify({ error: "rate_limited", retryAfterSec: rate.retryAfterSec }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rate.retryAfterSec ?? 3600),
        },
      },
    );
  }

  // Call provider
  const systemPrompt = buildSystemPrompt(payload);
  const userPrompt = buildUserPrompt(payload);

  let providerResult: ProviderResult;
  try {
    providerResult =
      provider === "lovable" ? await callLovable(apiKey, model, systemPrompt, userPrompt)
      : provider === "gemini" ? await callGemini(apiKey, model, systemPrompt, userPrompt)
      : provider === "anthropic" ? await callAnthropic(apiKey, model, systemPrompt, userPrompt)
      : provider === "openai" ? await callOpenAI(apiKey, model, systemPrompt, userPrompt)
      : (() => { throw new Error(`Unknown AI_PROVIDER: ${provider}`); })();
  } catch (err) {
    console.error("AI provider call failed:", err);
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      paper_id: payload.paperId ?? null,
      question_id: payload.questionId,
      provider,
      model,
      cache_hit: false,
      status: "provider_error",
    });
    return new Response(JSON.stringify({ error: "provider_error" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!validateAnalysis(providerResult.analysis)) {
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      paper_id: payload.paperId ?? null,
      question_id: payload.questionId,
      provider,
      model,
      cache_hit: false,
      input_tokens: providerResult.inputTokens ?? null,
      output_tokens: providerResult.outputTokens ?? null,
      status: "malformed_response",
    });
    return new Response(JSON.stringify({ error: "malformed_response" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const cleaned = sanitiseAnalysis(providerResult.analysis);

  // Cache (best-effort — ignore conflict)
  await supabase.from("ai_marking_cache").upsert(
    {
      cache_key: cacheKey,
      question_id: payload.questionId,
      analysis: cleaned,
    },
    { onConflict: "cache_key" },
  );

  await supabase.from("ai_usage_log").insert({
    user_id: userId,
    paper_id: payload.paperId ?? null,
    question_id: payload.questionId,
    provider,
    model,
    cache_hit: false,
    input_tokens: providerResult.inputTokens ?? null,
    output_tokens: providerResult.outputTokens ?? null,
    status: "ok",
  });

  return new Response(JSON.stringify({ analysis: cleaned, cached: false }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
