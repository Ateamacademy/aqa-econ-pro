// Generates an AI student report card and persists to public.student_reports
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TONE_PROMPTS: Record<string, string> = {
  warm: "Warm, encouraging and supportive. Uses positive framing while still being honest about gaps.",
  professional: "Formal, neutral and academic. Suitable for a school report sent to parents.",
  concise: "Brief, bullet-led, action-oriented. Maximum 120 words total.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const admin = createClient(supabaseUrl, serviceKey);

    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const body = await req.json().catch(() => ({}));
    const { studentId, classId, tone = "professional", period = "this half-term" } = body ?? {};
    if (!studentId || !classId) {
      return new Response(JSON.stringify({ error: "studentId and classId required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!TONE_PROMPTS[tone]) {
      return new Response(JSON.stringify({ error: "Invalid tone" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Authorization: must be teacher of the class
    const { data: isTeacher } = await admin.rpc("is_class_teacher", { _user_id: user.id, _class_id: classId });
    if (!isTeacher) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Pull student context
    const { data: profile } = await admin.from("profiles").select("display_name, target_grade, exam_board").eq("user_id", studentId).maybeSingle();
    const { data: meta } = await admin.from("student_class_metadata").select("target_grade, predicted_grade").eq("class_id", classId).eq("student_id", studentId).maybeSingle();
    const since = new Date(Date.now() - 60 * 86400 * 1000).toISOString();
    const { data: sessions } = await admin
      .from("practice_sessions")
      .select("topic, score_percent, created_at")
      .eq("user_id", studentId).gte("created_at", since)
      .order("created_at", { ascending: false }).limit(60);
    const { data: subs } = await admin
      .from("homework_submissions")
      .select("total_score, ao_breakdown_json, status, submitted_at")
      .eq("student_id", studentId).order("submitted_at", { ascending: false }).limit(20);

    const topicAgg: Record<string, { sum: number; n: number }> = {};
    (sessions ?? []).forEach((s: any) => {
      if (s.score_percent == null) return;
      const t = s.topic ?? "General";
      topicAgg[t] = topicAgg[t] || { sum: 0, n: 0 };
      topicAgg[t].sum += Number(s.score_percent); topicAgg[t].n += 1;
    });
    const topics = Object.entries(topicAgg)
      .map(([t, v]) => ({ topic: t, avg: Math.round(v.sum / v.n), n: v.n }))
      .sort((a, b) => a.avg - b.avg);
    const weakest = topics.slice(0, 3);
    const strongest = [...topics].reverse().slice(0, 3);
    const sessionAvg = sessions?.length
      ? Math.round((sessions.filter((s: any) => s.score_percent != null).reduce((a: number, s: any) => a + Number(s.score_percent), 0)) / Math.max(1, sessions.filter((s: any) => s.score_percent != null).length))
      : null;
    const submittedCount = (subs ?? []).filter((s: any) => s.submitted_at).length;

    const ctx = {
      studentName: profile?.display_name ?? "the student",
      examBoard: profile?.exam_board ?? null,
      targetGrade: meta?.target_grade ?? profile?.target_grade ?? null,
      predictedGrade: meta?.predicted_grade ?? null,
      period,
      stats: { sessionAvg, attempts: sessions?.length ?? 0, homeworkSubmitted: submittedCount },
      strongestTopics: strongest,
      weakestTopics: weakest,
    };

    const sys = `You are an experienced UK Economics teacher writing a school report for parents. ${TONE_PROMPTS[tone]} Output strict JSON only with shape: { "overview": string, "strengths": string[], "weaknesses": string[], "next_steps": string[], "predicted_grade": string|null }. No markdown, no commentary.`;
    const userPrompt = `Write a report for ${ctx.studentName} covering ${ctx.period}. Use this data:\n${JSON.stringify(ctx, null, 2)}\nKeep each strength/weakness/next_step under 20 words. Maximum 4 items per array.`;

    const aiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!aiKey) return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${aiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: sys }, { role: "user", content: userPrompt }],
        response_format: { type: "json_object" },
      }),
    });
    if (!aiRes.ok) {
      const t = await aiRes.text();
      return new Response(JSON.stringify({ error: "AI error", detail: t.slice(0, 500) }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const aiJson = await aiRes.json();
    const raw = aiJson?.choices?.[0]?.message?.content ?? "{}";
    let report: any;
    try { report = JSON.parse(raw); } catch { report = { overview: raw }; }

    const content = {
      overview: String(report.overview ?? ""),
      strengths: Array.isArray(report.strengths) ? report.strengths.slice(0, 4).map(String) : [],
      weaknesses: Array.isArray(report.weaknesses) ? report.weaknesses.slice(0, 4).map(String) : [],
      next_steps: Array.isArray(report.next_steps) ? report.next_steps.slice(0, 4).map(String) : [],
      predicted_grade: report.predicted_grade ?? ctx.predictedGrade ?? null,
      context: ctx,
    };

    const { data: saved, error: insErr } = await admin.from("student_reports").insert({
      student_id: studentId, class_id: classId, period, tone, content, created_by: user.id,
    }).select().single();
    if (insErr) {
      return new Response(JSON.stringify({ error: insErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ report: saved }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
