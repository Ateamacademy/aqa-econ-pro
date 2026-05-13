import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  CheckSquare, Filter, Loader2, RefreshCw, ChevronRight, ClipboardCheck,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Row = {
  id: string;
  assignment_id: string;
  student_id: string;
  status: string;
  total_score: number | null;
  submitted_at: string | null;
  // joined
  assignment_title?: string;
  class_id?: string;
  class_name?: string;
  student_name?: string | null;
};

const STATUS_META: Record<string, { label: string; tone: "default" | "secondary" | "outline" | "destructive" }> = {
  submitted: { label: "Awaiting AI", tone: "secondary" },
  ai_marked: { label: "Awaiting review", tone: "default" },
  reviewed: { label: "Reviewed", tone: "outline" },
};

export default function TeacherMarkingAll() {
  const [rows, setRows] = useState<Row[]>([]);
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [remarking, setRemarking] = useState<string | null>(null);
  const [filterClass, setFilterClass] = useState("all");
  const [filterStatus, setFilterStatus] = useState("ai_marked");

  const load = async () => {
    setLoading(true);
    const { data: cls } = await supabase.from("classes").select("id, name").order("name");
    const list = (cls ?? []) as { id: string; name: string }[];
    setClasses(list);
    if (list.length === 0) { setRows([]); setLoading(false); return; }

    const { data: assignments } = await supabase
      .from("homework_assignments")
      .select("id, title, class_id")
      .in("class_id", list.map((c) => c.id));
    const aMap = new Map((assignments ?? []).map((a: any) => [a.id, a]));
    const aIds = (assignments ?? []).map((a: any) => a.id);
    if (aIds.length === 0) { setRows([]); setLoading(false); return; }

    const { data: subs, error } = await supabase
      .from("homework_submissions")
      .select("id, assignment_id, student_id, status, total_score, submitted_at")
      .in("assignment_id", aIds)
      .in("status", ["submitted", "ai_marked", "reviewed"])
      .order("submitted_at", { ascending: false })
      .limit(500);
    if (error) { toast({ title: "Could not load submissions", description: error.message, variant: "destructive" }); setLoading(false); return; }

    const studentIds = Array.from(new Set((subs ?? []).map((s: any) => s.student_id)));
    const { data: profiles } = await supabase
      .from("profiles").select("user_id, display_name").in("user_id", studentIds);
    const nameMap = new Map((profiles ?? []).map((p: any) => [p.user_id, p.display_name]));
    const classMap = new Map(list.map((c) => [c.id, c.name]));

    setRows((subs ?? []).map((s: any) => {
      const a = aMap.get(s.assignment_id) as any;
      return {
        ...s,
        assignment_title: a?.title ?? "—",
        class_id: a?.class_id,
        class_name: classMap.get(a?.class_id) ?? "—",
        student_name: nameMap.get(s.student_id) ?? null,
      };
    }));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remark = async (id: string) => {
    setRemarking(id);
    const { error } = await supabase.functions.invoke("mark-homework-submission", { body: { submission_id: id } });
    setRemarking(null);
    if (error) toast({ title: "Re-mark failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Re-marked" }); load(); }
  };

  const approve = async (id: string) => {
    const { error } = await supabase.from("homework_submissions").update({ status: "reviewed" }).eq("id", id);
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Marked as reviewed" }); load(); }
  };

  const filtered = useMemo(() => rows.filter((r) =>
    (filterClass === "all" || r.class_id === filterClass) &&
    (filterStatus === "all" || r.status === filterStatus)
  ), [rows, filterClass, filterStatus]);

  const counts = useMemo(() => ({
    awaiting: rows.filter((r) => r.status === "ai_marked").length,
    pendingAi: rows.filter((r) => r.status === "submitted").length,
    reviewed: rows.filter((r) => r.status === "reviewed").length,
    avg: (() => {
      const scored = rows.filter((r) => r.total_score != null);
      return scored.length ? Math.round(scored.reduce((n, r) => n + (r.total_score ?? 0), 0) / scored.length) : null;
    })(),
  }), [rows]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1300px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-1">
            <CheckSquare className="h-3.5 w-3.5" /> Marking
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Marking queue</h1>
          <p className="text-sm text-muted-foreground mt-1">Review AI-marked submissions and approve grades.</p>
        </div>
        <Button size="sm" variant="outline" onClick={load}><RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh</Button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Awaiting review" value={counts.awaiting} />
        <Stat label="Pending AI" value={counts.pendingAi} />
        <Stat label="Reviewed" value={counts.reviewed} />
        <Stat label="Average score" value={counts.avg == null ? "—" : `${counts.avg}%`} />
      </div>

      <Card className="p-3 flex flex-wrap items-center gap-3">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="h-8 w-[180px] text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All classes</SelectItem>
            {classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-8 w-[170px] text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="ai_marked">Awaiting review</SelectItem>
            <SelectItem value="submitted">Pending AI</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} shown</span>
      </Card>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2"><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <ClipboardCheck className="h-8 w-8 text-success mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">All caught up</p>
            <p className="text-xs text-muted-foreground mt-1">No submissions match your filters.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((r) => {
              const meta = STATUS_META[r.status] ?? { label: r.status, tone: "outline" as const };
              return (
                <li key={r.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">{r.student_name ?? "Student"}</span>
                        <Badge variant={meta.tone} className="text-[10px] uppercase">{meta.label}</Badge>
                        <span className="text-xs text-muted-foreground">{r.class_name}</span>
                        {r.total_score != null && (
                          <span className="text-[11px] font-mono text-foreground">{r.total_score}%</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{r.assignment_title}</p>
                      {r.submitted_at && <p className="text-[11px] text-muted-foreground mt-1">Submitted {new Date(r.submitted_at).toLocaleString()}</p>}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button asChild size="sm" variant="ghost" className="h-8 text-xs">
                        <Link to={`/teacher/classes/${r.class_id}/homework/${r.assignment_id}/submissions`}>
                          Open <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                      {r.status === "ai_marked" && (
                        <>
                          <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => remark(r.id)} disabled={remarking === r.id}>
                            {remarking === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Re-mark"}
                          </Button>
                          <Button size="sm" className="h-8 text-xs" onClick={() => approve(r.id)}>
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Card className="p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold mt-1 text-foreground">{value}</p>
    </Card>
  );
}
