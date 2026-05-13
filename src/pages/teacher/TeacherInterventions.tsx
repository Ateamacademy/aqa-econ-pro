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
  AlertTriangle, RefreshCw, CheckCircle2, Mail, Loader2, Filter,
  TrendingDown, UserX, Inbox, ChevronRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Row = {
  id: string;
  student_id: string;
  type: string;
  severity: "low" | "medium" | "high" | string;
  message: string | null;
  created_at: string;
  resolved_at: string | null;
  detected_by_class_id: string | null;
  // joined
  class_name?: string;
  student_email?: string;
  student_name?: string | null;
};

const TYPE_META: Record<string, { label: string; icon: any; color: string }> = {
  at_risk: { label: "At risk", icon: AlertTriangle, color: "text-destructive" },
  declining: { label: "Declining", icon: TrendingDown, color: "text-amber-500" },
  inactive: { label: "Inactive", icon: UserX, color: "text-muted-foreground" },
};

export default function TeacherInterventions() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [filterClass, setFilterClass] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    // Fetch teacher's classes (RLS scopes this)
    const { data: classes } = await supabase.from("classes").select("id, name");
    const classIds = (classes ?? []).map((c: any) => c.id);
    const classMap = new Map<string, string>((classes ?? []).map((c: any) => [c.id, c.name]));
    if (classIds.length === 0) { setRows([]); setLoading(false); return; }

    let q = supabase
      .from("interventions")
      .select("id, student_id, type, severity, message, created_at, resolved_at, detected_by_class_id")
      .in("detected_by_class_id", classIds)
      .order("created_at", { ascending: false })
      .limit(200);
    if (!showResolved) q = q.is("resolved_at", null);

    const { data, error } = await q;
    if (error) { toast({ title: "Could not load interventions", description: error.message, variant: "destructive" }); setLoading(false); return; }

    // Hydrate student emails/names via class_roster RPC across each class (cheap fallback: profiles)
    const studentIds = Array.from(new Set((data ?? []).map((r: any) => r.student_id)));
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, display_name")
      .in("user_id", studentIds);
    const profileMap = new Map<string, string | null>((profiles ?? []).map((p: any) => [p.user_id, p.display_name]));

    const hydrated: Row[] = (data ?? []).map((r: any) => ({
      ...r,
      class_name: classMap.get(r.detected_by_class_id) ?? "—",
      student_name: profileMap.get(r.student_id) ?? null,
    }));
    setRows(hydrated);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [showResolved]);

  const scan = async () => {
    setScanning(true);
    const { data, error } = await supabase.functions.invoke("detect-interventions", { body: {} });
    setScanning(false);
    if (error) {
      toast({ title: "Scan failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Scan complete", description: `${(data as any)?.created ?? 0} new interventions detected.` });
    load();
  };

  const resolve = async (id: string) => {
    const { error } = await supabase.from("interventions").update({ resolved_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast({ title: "Could not resolve", description: error.message, variant: "destructive" }); return; }
    setRows((rs) => rs.filter((r) => r.id !== id || showResolved));
    toast({ title: "Resolved" });
  };

  const classes = useMemo(() => {
    const m = new Map<string, string>();
    rows.forEach((r) => r.detected_by_class_id && m.set(r.detected_by_class_id, r.class_name ?? "—"));
    return Array.from(m.entries());
  }, [rows]);

  const filtered = rows.filter((r) =>
    (filterClass === "all" || r.detected_by_class_id === filterClass) &&
    (filterSeverity === "all" || r.severity === filterSeverity)
  );

  const counts = useMemo(() => {
    const open = rows.filter((r) => !r.resolved_at);
    return {
      total: open.length,
      high: open.filter((r) => r.severity === "high").length,
      at_risk: open.filter((r) => r.type === "at_risk").length,
      declining: open.filter((r) => r.type === "declining").length,
    };
  }, [rows]);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1300px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-1">
            <Inbox className="h-3.5 w-3.5" /> Interventions
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Intervention inbox</h1>
          <p className="text-sm text-muted-foreground mt-1">Students flagged as at-risk, declining or inactive across your classes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowResolved((v) => !v)}>
            {showResolved ? "Hide resolved" : "Show resolved"}
          </Button>
          <Button size="sm" onClick={scan} disabled={scanning}>
            {scanning ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5 mr-1.5" />}
            Scan now
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Open" value={counts.total} />
        <Stat label="High severity" value={counts.high} tone="destructive" />
        <Stat label="At risk" value={counts.at_risk} />
        <Stat label="Declining" value={counts.declining} />
      </div>

      <Card className="p-3 flex flex-wrap items-center gap-3">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="h-8 w-[180px] text-xs"><SelectValue placeholder="All classes" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All classes</SelectItem>
            {classes.map(([id, name]) => <SelectItem key={id} value={id}>{name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterSeverity} onValueChange={setFilterSeverity}>
          <SelectTrigger className="h-8 w-[150px] text-xs"><SelectValue placeholder="Any severity" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any severity</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} shown</span>
      </Card>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">Inbox zero</p>
            <p className="text-xs text-muted-foreground mt-1">No interventions match your filters. Click "Scan now" to refresh.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((r) => {
              const meta = TYPE_META[r.type] ?? { label: r.type, icon: AlertTriangle, color: "text-muted-foreground" };
              const Icon = meta.icon;
              return (
                <li key={r.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${meta.color}`}><Icon className="h-4 w-4" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          {r.student_name ?? "Student"}
                        </span>
                        <Badge
                          variant={r.severity === "high" ? "destructive" : r.severity === "medium" ? "secondary" : "outline"}
                          className="text-[10px] uppercase tracking-wider"
                        >
                          {meta.label} · {r.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{r.class_name}</span>
                        {r.resolved_at && <Badge variant="outline" className="text-[10px]">Resolved</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{r.message}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">{new Date(r.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button asChild size="sm" variant="ghost" className="h-8 text-xs">
                        <Link to={`/teacher/reports?student=${r.student_id}&class=${r.detected_by_class_id ?? ""}`}>
                          <Mail className="h-3.5 w-3.5 mr-1" /> Report
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="ghost" className="h-8 text-xs">
                        <Link to={`/teacher/classes/${r.detected_by_class_id}`}>
                          Class <ChevronRight className="h-3 w-3" />
                        </Link>
                      </Button>
                      {!r.resolved_at && (
                        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => resolve(r.id)}>
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Resolve
                        </Button>
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

function Stat({ label, value, tone }: { label: string; value: number; tone?: "destructive" }) {
  return (
    <Card className="p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${tone === "destructive" ? "text-destructive" : "text-foreground"}`}>{value}</p>
    </Card>
  );
}
