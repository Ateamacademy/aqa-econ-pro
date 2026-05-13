import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Question = {
  number: string;
  marks: number;
  command: string;
  stem: string;
  context?: string | null;
  mark_scheme?: any[];
};

export default function StudentHomeworkAttempt() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [marking, setMarking] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!assignmentId) return;
      const { data: u } = await supabase.auth.getUser();
      if (!u?.user) { navigate("/auth"); return; }

      const { data: a, error: ae } = await supabase
        .from("homework_assignments")
        .select("*")
        .eq("id", assignmentId)
        .maybeSingle();
      if (ae || !a) { toast({ title: "Not found", variant: "destructive" }); navigate("/dashboard"); return; }

      // upsert pending submission
      const { data: existing } = await supabase
        .from("homework_submissions")
        .select("*")
        .eq("assignment_id", assignmentId)
        .eq("student_id", u.user.id)
        .maybeSingle();

      let sub = existing;
      if (!sub) {
        const { data: created, error: ce } = await supabase
          .from("homework_submissions")
          .insert({ assignment_id: assignmentId, student_id: u.user.id, response_json: {}, status: "in_progress" })
          .select("*")
          .single();
        if (ce) { toast({ title: "Could not start", description: ce.message, variant: "destructive" }); return; }
        sub = created;
      }

      if (cancelled) return;
      setAssignment(a);
      setSubmission(sub);
      setResponses((sub.response_json as Record<string, string>) ?? {});
      if (a.time_minutes && sub.status === "in_progress") {
        startedAtRef.current = Date.now();
        setSecondsLeft(a.time_minutes * 60);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [assignmentId, navigate]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft == null) return;
    if (secondsLeft <= 0) return;
    const t = window.setInterval(() => setSecondsLeft((s) => (s == null ? null : Math.max(0, s - 1))), 1000);
    return () => window.clearInterval(t);
  }, [secondsLeft]);

  // Auto-save responses every 5s when changed
  const scheduleSave = (next: Record<string, string>) => {
    if (!submission) return;
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(async () => {
      await supabase
        .from("homework_submissions")
        .update({ response_json: next })
        .eq("id", submission.id);
    }, 800);
  };

  const onChange = (key: string, val: string) => {
    setResponses((prev) => {
      const next = { ...prev, [key]: val };
      scheduleSave(next);
      return next;
    });
  };

  const questions = useMemo<Question[]>(() => assignment?.content_json?.questions ?? [], [assignment]);
  const totalMarks = assignment?.content_json?.total_marks ?? questions.reduce((s, q) => s + (q.marks || 0), 0);
  const wordCount = (q: Question) => (responses[q.number] ?? "").trim().split(/\s+/).filter(Boolean).length;

  const submit = async () => {
    if (!submission) return;
    if (submitting || marking) return;
    const blanks = questions.filter((q) => !(responses[q.number] ?? "").trim());
    if (blanks.length > 0 && !confirm(`${blanks.length} question(s) are blank. Submit anyway?`)) return;

    setSubmitting(true);
    const { error: ue } = await supabase
      .from("homework_submissions")
      .update({ response_json: responses, status: "submitted", submitted_at: new Date().toISOString() })
      .eq("id", submission.id);
    setSubmitting(false);
    if (ue) { toast({ title: "Submit failed", description: ue.message, variant: "destructive" }); return; }

    // Trigger AI marking
    setMarking(true);
    const { error: me } = await supabase.functions.invoke("mark-homework-submission", {
      body: { submission_id: submission.id },
    });
    setMarking(false);
    if (me) {
      toast({ title: "Marking error", description: me.message, variant: "destructive" });
      navigate("/dashboard");
      return;
    }
    toast({ title: "Submitted & marked", description: "Your teacher can now review your work." });
    navigate(`/homework/${assignmentId}/result`);
  };

  if (loading) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!assignment) return <div className="p-8 text-sm text-muted-foreground">Assignment not found.</div>;

  // Already marked → redirect to results
  if (submission && (submission.status === "ai_marked" || submission.status === "reviewed")) {
    navigate(`/homework/${assignmentId}/result`, { replace: true });
    return null;
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const r = (s % 60).toString().padStart(2, "0");
    return `${m}:${r}`;
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
      </Link>

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{assignment.title}</h1>
          {assignment.topic && <p className="text-sm text-muted-foreground mt-1">{assignment.topic}</p>}
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            {questions.length} questions · {totalMarks} marks · {assignment.time_minutes ?? "?"} min
          </p>
        </div>
        {secondsLeft != null && (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-md border ${secondsLeft < 120 ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border bg-muted/30"}`}>
            <Clock className="h-4 w-4" />
            <span className="font-mono text-base font-bold">{fmt(secondsLeft)}</span>
          </div>
        )}
      </div>

      {assignment.content_json?.intro && (
        <Card className="p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground italic">{assignment.content_json.intro}</p>
        </Card>
      )}

      <div className="space-y-5">
        {questions.map((q) => {
          const wc = wordCount(q);
          return (
            <Card key={q.number} className="p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-foreground">
                  Question {q.number}. <span className="font-normal text-muted-foreground">{q.command}</span>
                </p>
                <span className="text-[11px] font-mono text-muted-foreground">[{q.marks} marks]</span>
              </div>
              {q.context && <p className="text-xs text-muted-foreground italic mb-2">{q.context}</p>}
              <p className="text-sm text-foreground whitespace-pre-wrap mb-3">{q.stem}</p>
              <Textarea
                rows={Math.max(4, Math.min(14, Math.round(q.marks * 1.2)))}
                placeholder="Type your answer here…"
                value={responses[q.number] ?? ""}
                onChange={(e) => onChange(q.number, e.target.value)}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-muted-foreground font-mono">{wc} words</span>
                {wc < Math.max(20, q.marks * 8) && wc > 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-500">
                    <AlertTriangle className="h-3 w-3" /> Below typical length for {q.marks}-mark answer
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-2 pb-8">
        <Button onClick={submit} disabled={submitting || marking} size="lg" className="gap-2">
          {submitting || marking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {marking ? "Marking…" : submitting ? "Submitting…" : "Submit for marking"}
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground text-center">
        <CheckCircle2 className="inline h-3 w-3 mr-1" /> Your responses are auto-saved as you type.
      </p>
    </div>
  );
}
