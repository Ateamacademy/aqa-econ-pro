import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Target, TrendingUp } from "lucide-react";

type QResult = {
  number: string;
  marks_awarded: number;
  marks_total: number;
  ao_breakdown?: Record<string, { awarded: number; total: number }>;
  feedback?: string;
  strengths?: string[];
  improvements?: string[];
};

export default function StudentHomeworkResult() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [data, setData] = useState<{ assignment: any; submission: any } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u?.user || !assignmentId) return;
      const [{ data: a }, { data: s }] = await Promise.all([
        supabase.from("homework_assignments").select("*").eq("id", assignmentId).maybeSingle(),
        supabase.from("homework_submissions").select("*").eq("assignment_id", assignmentId).eq("student_id", u.user.id).maybeSingle(),
      ]);
      setData({ assignment: a, submission: s });
    })();
  }, [assignmentId]);

  if (!data?.assignment || !data?.submission) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  const { assignment, submission } = data;
  const aiMarks: QResult[] = (submission.ai_marks_json?.questions ?? []) as QResult[];
  const ao: Record<string, { awarded: number; total: number }> = submission.ao_breakdown_json ?? {};
  const overall: { strengths?: string[]; improvements?: string[]; summary?: string } = submission.feedback_json ?? {};
  const totalAwarded = aiMarks.reduce((s, q) => s + (q.marks_awarded || 0), 0);
  const totalAvailable = aiMarks.reduce((s, q) => s + (q.marks_total || 0), 0);
  const pct = totalAvailable > 0 ? Math.round((totalAwarded / totalAvailable) * 100) : 0;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{assignment.title}</h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">{assignment.topic}</p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Score</p>
            <p className="text-3xl font-bold text-foreground mt-1">{totalAwarded}<span className="text-base text-muted-foreground">/{totalAvailable}</span></p>
            <p className="text-xs text-muted-foreground mt-0.5">{pct}%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Status</p>
            <p className="text-sm font-semibold text-foreground mt-1 inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-success" />
              {submission.status === "reviewed" ? "Teacher reviewed" : "Marked"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Questions</p>
            <p className="text-sm font-semibold text-foreground mt-1">{aiMarks.length}</p>
          </div>
        </div>

        {Object.keys(ao).length > 0 && (
          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-3">Assessment Objectives</p>
            <div className="space-y-2">
              {Object.entries(ao).map(([k, v]) => {
                const p = v.total > 0 ? Math.round((v.awarded / v.total) * 100) : 0;
                return (
                  <div key={k}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-foreground">{k.toUpperCase()}</span>
                      <span className="text-muted-foreground">{v.awarded}/{v.total} ({p}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {(overall.strengths?.length || overall.improvements?.length) && (
        <div className="grid sm:grid-cols-2 gap-3">
          {overall.strengths && overall.strengths.length > 0 && (
            <Card className="p-4">
              <p className="text-[10px] uppercase font-bold text-success mb-2 inline-flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> Strengths</p>
              <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside">
                {overall.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </Card>
          )}
          {overall.improvements && overall.improvements.length > 0 && (
            <Card className="p-4">
              <p className="text-[10px] uppercase font-bold text-amber-500 mb-2 inline-flex items-center gap-1.5"><Target className="h-3 w-3" /> To improve</p>
              <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside">
                {overall.improvements.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </Card>
          )}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-[10px] uppercase font-bold text-muted-foreground">Per-question feedback</p>
        {aiMarks.map((q) => (
          <Card key={q.number} className="p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-foreground">Question {q.number}</p>
              <span className="text-[11px] font-mono text-muted-foreground">{q.marks_awarded}/{q.marks_total} marks</span>
            </div>
            {q.feedback && <p className="text-xs text-muted-foreground whitespace-pre-wrap">{q.feedback}</p>}
            {(q.strengths?.length || q.improvements?.length) && (
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {q.strengths && q.strengths.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase font-bold text-success mb-1">What worked</p>
                    <ul className="text-[11px] text-foreground space-y-1 list-disc list-inside">
                      {q.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {q.improvements && q.improvements.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-500 mb-1">Next step</p>
                    <ul className="text-[11px] text-foreground space-y-1 list-disc list-inside">
                      {q.improvements.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
