import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ClipboardList, Plus, FileText, Eye, Send, Filter, ChevronRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Assignment = {
  id: string;
  title: string;
  topic: string | null;
  difficulty: string | null;
  time_minutes: number | null;
  status: string;
  content_json: any;
  created_at: string;
  class_id: string;
  class_name?: string;
  submission_count?: number;
};

export default function TeacherHomeworkAll() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterClass, setFilterClass] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const { data: cls } = await supabase.from("classes").select("id, name").order("name");
    const list = (cls ?? []) as { id: string; name: string }[];
    setClasses(list);
    const classMap = new Map(list.map((c) => [c.id, c.name]));
    if (list.length === 0) { setItems([]); setLoading(false); return; }

    const { data: assignments, error } = await supabase
      .from("homework_assignments")
      .select("id, title, topic, difficulty, time_minutes, status, content_json, created_at, class_id")
      .in("class_id", list.map((c) => c.id))
      .order("created_at", { ascending: false });
    if (error) { toast({ title: "Could not load homework", description: error.message, variant: "destructive" }); setLoading(false); return; }

    const ids = (assignments ?? []).map((a: any) => a.id);
    const subCounts = new Map<string, number>();
    if (ids.length) {
      const { data: subs } = await supabase
        .from("homework_submissions")
        .select("assignment_id, status")
        .in("assignment_id", ids);
      (subs ?? []).forEach((s: any) => {
        if (s.status === "ai_marked" || s.status === "submitted" || s.status === "reviewed") {
          subCounts.set(s.assignment_id, (subCounts.get(s.assignment_id) ?? 0) + 1);
        }
      });
    }

    setItems((assignments ?? []).map((a: any) => ({
      ...a,
      class_name: classMap.get(a.class_id) ?? "—",
      submission_count: subCounts.get(a.id) ?? 0,
    })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => items.filter((a) =>
    (filterClass === "all" || a.class_id === filterClass) &&
    (filterStatus === "all" || a.status === filterStatus) &&
    (search === "" || a.title.toLowerCase().includes(search.toLowerCase()) || (a.topic ?? "").toLowerCase().includes(search.toLowerCase()))
  ), [items, filterClass, filterStatus, search]);

  const counts = useMemo(() => ({
    total: items.length,
    published: items.filter((a) => a.status === "published").length,
    drafts: items.filter((a) => a.status === "draft").length,
    submissions: items.reduce((n, a) => n + (a.submission_count ?? 0), 0),
  }), [items]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1300px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-1">
            <ClipboardList className="h-3.5 w-3.5" /> Homework
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">All homework</h1>
          <p className="text-sm text-muted-foreground mt-1">Assignments across every class you teach.</p>
        </div>
        <div className="flex items-center gap-2">
          {classes.length > 0 ? (
            <Select onValueChange={(v) => navigate(`/teacher/classes/${v}/homework`)}>
              <SelectTrigger className="h-9 w-[200px] text-xs"><SelectValue placeholder="New homework in…" /></SelectTrigger>
              <SelectContent>
                {classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          ) : (
            <Button asChild size="sm"><Link to="/teacher/classes"><Plus className="h-3.5 w-3.5 mr-1.5" /> Create a class</Link></Button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Total" value={counts.total} />
        <Stat label="Published" value={counts.published} />
        <Stat label="Drafts" value={counts.drafts} />
        <Stat label="Submissions" value={counts.submissions} />
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
          <SelectTrigger className="h-8 w-[150px] text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search title or topic…" value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 text-xs flex-1 min-w-[200px]" />
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} shown</span>
      </Card>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2"><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">No homework yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              {classes.length === 0
                ? "Create a class to start setting homework."
                : "Pick a class above to generate your first worksheet."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((a) => (
              <li key={a.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant={a.status === "published" ? "default" : "outline"} className="text-[10px] uppercase">{a.status}</Badge>
                      <span className="text-xs text-muted-foreground">{a.class_name}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {a.difficulty} · {a.time_minutes ?? "?"} min · {(a.content_json?.questions?.length ?? 0)} Qs
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.topic}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{new Date(a.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button asChild size="sm" variant="ghost" className="h-8 text-xs">
                      <Link to={`/teacher/classes/${a.class_id}/homework`}><Eye className="h-3.5 w-3.5 mr-1" /> Open</Link>
                    </Button>
                    {a.status === "published" && (
                      <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                        <Link to={`/teacher/classes/${a.class_id}/homework/${a.id}/submissions`}>
                          <Send className="h-3.5 w-3.5 mr-1" /> {a.submission_count ?? 0} subs <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold mt-1 text-foreground">{value}</p>
    </Card>
  );
}
