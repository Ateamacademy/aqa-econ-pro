import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ClipboardList, ArrowRight, CheckCircle2, Clock } from "lucide-react";

type Row = {
  id: string;
  title: string;
  topic: string | null;
  difficulty: string | null;
  time_minutes: number | null;
  due_date: string | null;
  content_json: any;
  class_name: string;
  submission_status: string | null;
  submission_score: number | null;
};

export default function PendingHomeworkCard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u?.user) { setLoading(false); return; }

      // Get student's classes
      const { data: cs } = await supabase
        .from("class_students")
        .select("class_id, classes(name)")
        .eq("student_id", u.user.id);
      const classMap = new Map<string, string>();
      (cs ?? []).forEach((c: any) => classMap.set(c.class_id, c.classes?.name ?? "Class"));
      if (classMap.size === 0) { if (!cancelled) { setLoading(false); setRows([]); } return; }

      const { data: assignments } = await supabase
        .from("homework_assignments")
        .select("id, title, topic, difficulty, time_minutes, due_date, content_json, class_id")
        .eq("status", "published")
        .in("class_id", Array.from(classMap.keys()))
        .order("created_at", { ascending: false })
        .limit(10);

      const ids = (assignments ?? []).map((a) => a.id);
      const { data: subs } = ids.length
        ? await supabase
            .from("homework_submissions")
            .select("assignment_id, status, total_score")
            .in("assignment_id", ids)
            .eq("student_id", u.user.id)
        : { data: [] as any[] };
      const subMap = new Map<string, { status: string; total_score: number | null }>();
      (subs ?? []).forEach((s: any) => subMap.set(s.assignment_id, { status: s.status, total_score: s.total_score }));

      const out: Row[] = (assignments ?? []).map((a) => ({
        id: a.id,
        title: a.title,
        topic: a.topic,
        difficulty: a.difficulty,
        time_minutes: a.time_minutes,
        due_date: a.due_date,
        content_json: a.content_json,
        class_name: classMap.get(a.class_id) ?? "Class",
        submission_status: subMap.get(a.id)?.status ?? null,
        submission_score: subMap.get(a.id)?.total_score ?? null,
      }));

      if (!cancelled) { setRows(out); setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading || rows.length === 0) return null;

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
          <ClipboardList className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Homework from your teacher</p>
          <p className="text-[11px] text-muted-foreground">Click an assignment to attempt it.</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => {
          const done = r.submission_status === "submitted" || r.submission_status === "ai_marked" || r.submission_status === "reviewed";
          return (
            <Link
              key={r.id}
              to={`/homework/${r.id}`}
              className="flex items-center gap-3 px-3 py-2 rounded-md border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">{r.class_name}</span>
                  {r.difficulty && <span className="text-[10px] text-muted-foreground">· {r.difficulty}</span>}
                  {r.time_minutes && <span className="text-[10px] text-muted-foreground">· {r.time_minutes} min</span>}
                </div>
                <p className="text-sm font-semibold text-foreground truncate">{r.title}</p>
                {r.topic && <p className="text-[11px] text-muted-foreground truncate">{r.topic}</p>}
              </div>
              {done ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {r.submission_score != null ? `${Math.round(r.submission_score)}%` : "Submitted"}
                </span>
              ) : r.submission_status === "in_progress" ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                  <Clock className="h-3.5 w-3.5" /> In progress
                </span>
              ) : (
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              )}
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
