import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, ChevronRight, Loader2, RefreshCw, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Sub = {
  id: string;
  student_id: string;
  status: string;
  total_score: number | null;
  submitted_at: string | null;
  ai_marks_json: any;
  ao_breakdown_json: any;
  feedback_json: any;
  response_json: any;
  email?: string;
  display_name?: string | null;
};

export default function TeacherSubmissions() {
  const { classId, assignmentId } = useParams<{ classId: string; assignmentId: string }>();
  const [assignment, setAssignment] = useState<any>(null);
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [remarking, setRemarking] = useState<string | null>(null);

  const load = async () => {
    if (!assignmentId || !classId) return;
    setLoading(true);
    const [{ data: a }, { data: roster }, { data: rows }] = await Promise.all([
      supabase.from("homework_assignments").select("*").eq("id", assignmentId).maybeSingle(),
      supabase.rpc("get_class_roster", { _class_id: classId }),
      supabase.from("homework_submissions").select("*").eq("assignment_id", assignmentId),
    ]);

    const map = new Map<string, Sub>();
    (rows ?? []).forEach((s: any) => map.set(s.student_id, s as Sub));

    const merged: Sub[] = ((roster as any[]) ?? []).map((r: any) => {
      const s = map.get(r.student_id);
      return s
        ? { ...s, email: r.email, display_name: r.display_name }
        : {
            id: `pending-${r.student_id}`, student_id: r.student_id, status: "not_started",
            total_score: null, submitted_at: null, ai_marks_json: null, ao_breakdown_json: null,
            feedback_json: null, response_json: null, email: r.email, display_name: r.display_name,
          };
    });

    setAssignment(a);
    setSubs(merged);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [assignmentId, classId]);

  const remark = async (submissionId: string) => {
    setRemarking(submissionId);
    const { error } = await supabase.functions.invoke("mark-homework-submission", { body: { submission_id: submissionId } });
    setRemarking(null);
    if (error) toast({ title: "Re-mark failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Re-marked" }); await load(); }
  };

  const markReviewed = async (id: string) => {
    const { error } = await supabase.from("homework_submissions").update({ status: "reviewed" }).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Marked as reviewed" }); await load(); }
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!assignment) return <div className="p-8 text-sm text-muted-foreground">Assignment not found.</div>;

  const completed = subs.filter((s) => s.status === "ai_marked" || s.status === "reviewed");
  const avgScore = completed.length > 0 ? Math.round(completed.reduce((s, x) => s + (x.total_score ?? 0), 0) / completed.length) : null;

  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-6">
      <Link to={`/teacher/classes/${classId}/homework`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Homework
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{assignment.title}</h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          {subs.length} students · {completed.length} marked{avgScore != null ? ` · class avg ${avgScore}%` : ""}
        </p>
      </div>

      <div className="grid gap-2">
        {subs.map((s) => {
          const open = expanded === s.id;
          const aiQ: any[] = s.ai_marks_json?.questions ?? [];
          return (
            <Card key={s.id} className="overflow-hidden">
              <button
                onClick={() => setExpanded(open ? null : s.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors text-left"
              >
                {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{s.display_name ?? s.email}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{s.email}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  s.status === "reviewed" ? "bg-success/15 text-success" :
                  s.status === "ai_marked" ? "bg-primary/15 text-primary" :
                  s.status === "submitted" ? "bg-amber-500/15 text-amber-500" :
                  s.status === "in_progress" ? "bg-muted text-muted-foreground" :
                  "bg-muted/50 text-muted-foreground"
                }`}>
                  {s.status.replace("_", " ")}
                </span>
                {s.total_score != null && (
                  <span className="font-mono text-sm font-bold text-foreground w-14 text-right">{Math.round(s.total_score)}%</span>
                )}
              </button>

              {open && (
                <div className="border-t border-border p-5 bg-muted/10 space-y-4">
                  {s.status === "not_started" && (
                    <p className="text-sm text-muted-foreground italic">Student has not started this homework.</p>
                  )}
                  {s.status === "in_progress" && (
                    <p className="text-sm text-muted-foreground italic">Student is still working on this.</p>
                  )}
                  {(s.status === "submitted" || s.status === "ai_marked" || s.status === "reviewed") && (
                    <>
                      {s.feedback_json?.summary && (
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Examiner summary</p>
                          <p className="text-xs text-foreground">{s.feedback_json.summary}</p>
                        </div>
                      )}

                      {s.ao_breakdown_json && Object.keys(s.ao_breakdown_json).length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {Object.entries(s.ao_breakdown_json as Record<string, { awarded: number; total: number }>).map(([k, v]) => {
                            const p = v.total > 0 ? Math.round((v.awarded / v.total) * 100) : 0;
                            return (
                              <div key={k} className="rounded-md border border-border p-2">
                                <p className="text-[10px] font-mono uppercase text-muted-foreground">{k}</p>
                                <p className="text-sm font-bold text-foreground">{v.awarded}/{v.total}</p>
                                <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${p}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {aiQ.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground">Per-question</p>
                          {aiQ.map((q: any) => {
                            const studentAns = (s.response_json ?? {})[q.number] ?? "";
                            return (
                              <div key={q.number} className="rounded-md border border-border p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-xs font-semibold text-foreground">Q{q.number}</p>
                                  <span className="text-[11px] font-mono text-muted-foreground">{q.marks_awarded}/{q.marks_total}</span>
                                </div>
                                <details className="text-[11px]">
                                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Student answer</summary>
                                  <p className="mt-1 whitespace-pre-wrap text-foreground bg-muted/30 p-2 rounded">{studentAns || <em>blank</em>}</p>
                                </details>
                                {q.feedback && <p className="text-[11px] text-muted-foreground mt-2 whitespace-pre-wrap">{q.feedback}</p>}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex gap-2 justify-end pt-1">
                        <Button size="sm" variant="outline" onClick={() => remark(s.id)} disabled={remarking === s.id} className="gap-1.5">
                          {remarking === s.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                          Re-mark
                        </Button>
                        {s.status === "ai_marked" && (
                          <Button size="sm" onClick={() => markReviewed(s.id)}>Mark reviewed</Button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {subs.length === 0 && (
        <Card className="p-10 text-center">
          <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-semibold text-foreground">No students in this class yet</p>
        </Card>
      )}
    </div>
  );
}
