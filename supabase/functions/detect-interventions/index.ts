import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: userRes } = await supabase.auth.getUser();
    if (!userRes?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const teacherId = userRes.user.id;

    const body = await req.json().catch(() => ({}));
    const targetClassId: string | undefined = body?.class_id;

    // Classes the teacher owns/has access to
    let classQuery = supabase.from("classes").select("id, name, teacher_id, school_id");
    if (targetClassId) classQuery = classQuery.eq("id", targetClassId);
    const { data: classes, error: cErr } = await classQuery;
    if (cErr) throw cErr;

    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const since14 = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    let created = 0;

    for (const c of classes ?? []) {
      const { data: roster } = await supabase
        .from("class_students")
        .select("student_id")
        .eq("class_id", c.id);

      for (const r of roster ?? []) {
        const sid = (r as any).student_id;

        // Pull recent practice sessions
        const { data: sessions } = await supabase
          .from("practice_sessions")
          .select("score_percent, created_at")
          .eq("user_id", sid)
          .gte("created_at", since)
          .not("score_percent", "is", null);

        const scores = (sessions ?? []).map((s: any) => s.score_percent as number);
        const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
        const recent = (sessions ?? []).filter((s: any) => s.created_at >= since14).map((s: any) => s.score_percent);
        const prior = (sessions ?? []).filter((s: any) => s.created_at < since14).map((s: any) => s.score_percent);
        const recentAvg = recent.length ? recent.reduce((a, b) => a + b, 0) / recent.length : null;
        const priorAvg = prior.length ? prior.reduce((a, b) => a + b, 0) / prior.length : null;

        // Existing open interventions for student in this class
        const { data: open } = await supabase
          .from("interventions")
          .select("id, type")
          .eq("student_id", sid)
          .eq("detected_by_class_id", c.id)
          .is("resolved_at", null);
        const openTypes = new Set((open ?? []).map((o: any) => o.type));

        const toInsert: any[] = [];
        if (avg != null && avg < 50 && scores.length >= 3 && !openTypes.has("at_risk")) {
          toInsert.push({
            student_id: sid, detected_by_class_id: c.id,
            type: "at_risk", severity: avg < 35 ? "high" : "medium",
            message: `Average ${avg.toFixed(0)}% across ${scores.length} attempts in the last 30 days.`,
          });
        }
        if (recentAvg != null && priorAvg != null && priorAvg - recentAvg >= 8 && !openTypes.has("declining")) {
          toInsert.push({
            student_id: sid, detected_by_class_id: c.id,
            type: "declining", severity: priorAvg - recentAvg >= 15 ? "high" : "medium",
            message: `Score dropped from ${priorAvg.toFixed(0)}% to ${recentAvg.toFixed(0)}% over the last fortnight.`,
          });
        }
        if (scores.length === 0 && !openTypes.has("inactive")) {
          toInsert.push({
            student_id: sid, detected_by_class_id: c.id,
            type: "inactive", severity: "low",
            message: "No practice activity in the last 30 days.",
          });
        }

        if (toInsert.length) {
          const { error: iErr } = await supabase.from("interventions").insert(toInsert);
          if (!iErr) created += toInsert.length;
        }
      }
    }

    return new Response(JSON.stringify({ ok: true, created }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
