import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle, Upload, RefreshCw, ArrowLeft } from "lucide-react";
import ExcelJS from "exceljs";
import {
  runRegressionValidators,
  type QaIssue,
} from "@/lib/qaTrackerValidators";

interface TrackerIssue {
  id: string;
  board: string;
  paper_code: string;
  paper_set: string | null;
  question_number: string | null;
  category: string;
  severity: string;
  status: string;
  title: string;
  description: string;
  resolution_notes: string | null;
  resolved_at: string | null;
  source: string;
  created_at: string;
}

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";

export default function AdminQaTracker() {
  const { user, loading: authLoading } = useAuth();
  const [issues, setIssues] = useState<TrackerIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("open");
  const [notesById, setNotesById] = useState<Record<string, string>>({});
  const [autoIssues, setAutoIssues] = useState<QaIssue[]>([]);
  const [running, setRunning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  async function loadIssues() {
    setLoading(true);
    const { data, error } = await supabase
      .from("qa_tracker_issues")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load issues: " + error.message);
    } else {
      setIssues((data ?? []) as TrackerIssue[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isAdmin) loadIssues();
  }, [isAdmin]);

  async function resolveIssue(id: string) {
    const notes = notesById[id] ?? "";
    const { error } = await supabase
      .from("qa_tracker_issues")
      .update({
        status: "resolved",
        resolved_at: new Date().toISOString(),
        resolved_by: user!.id,
        resolution_notes: notes,
      })
      .eq("id", id);
    if (error) {
      toast.error("Resolve failed: " + error.message);
    } else {
      toast.success("Issue resolved");
      loadIssues();
    }
  }

  async function reopenIssue(id: string) {
    const { error } = await supabase
      .from("qa_tracker_issues")
      .update({ status: "open", resolved_at: null, resolved_by: null })
      .eq("id", id);
    if (error) toast.error(error.message);
    else loadIssues();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf);
      const rows: any[] = [];
      for (const name of wb.SheetNames) {
        const sheet = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: "" });
        for (const r of sheet as any[]) {
          rows.push({ sheet: name, ...r });
        }
      }
      const inserts = rows
        .filter((r) => r.title || r.Title || r.description || r.Description)
        .map((r) => ({
          board: (r.board || r.Board || "aqa").toString().toLowerCase(),
          paper_code: (r.paper_code || r.Paper || r.paper || "unknown").toString(),
          paper_set: r.paper_set || r.set || r.Set || null,
          question_number: r.question_number || r.Q || r.question || null,
          category: (r.category || r.Category || r.sheet || "other").toString(),
          severity: (r.severity || "medium").toString(),
          title: (r.title || r.Title || `${r.sheet} entry`).toString().slice(0, 200),
          description: (r.description || r.Description || JSON.stringify(r)).toString(),
          source: "tracker_upload",
        }));
      if (inserts.length === 0) {
        toast.error("No usable rows found");
        return;
      }
      const { error } = await supabase.from("qa_tracker_issues").insert(inserts);
      if (error) toast.error(error.message);
      else {
        toast.success(`Imported ${inserts.length} issues`);
        loadIssues();
      }
    } catch (err: any) {
      toast.error("Upload failed: " + err.message);
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function runValidators() {
    setRunning(true);
    try {
      // Validators run over what we can statically harvest. The override
      // modules expose getter functions per paper-id; we sample known ids.
      const p1 = await import("@/data/aqaPaper1Overrides");
      const p2 = await import("@/data/aqaPaper2Overrides");
      const records: any[] = [];
      const sets = ["A", "B", "C", "D", "E", "F", "G"];
      for (const set of sets) {
        const id1 = `aqa-7136-1-${set.toLowerCase()}`;
        const id2 = `aqa-7136-2-${set.toLowerCase()}`;
        const content1 = p1.getAqaPaper1OverrideContent?.(id1) ?? "";
        const ms1 = p1.getAqaPaper1OverrideMarkScheme?.(id1) ?? "";
        const content2 = p2.getAqaPaper2OverrideContent?.(id2) ?? "";
        const ms2 = p2.getAqaPaper2OverrideMarkScheme?.(id2) ?? "";
        if (content1) records.push({ paper_code: "7136/1", paper_set: set, question_number: "all", marks: 25, stem: content1, markScheme: ms1, modelAnswer: ms1 });
        if (content2) records.push({ paper_code: "7136/2", paper_set: set, question_number: "all", marks: 25, stem: content2, markScheme: ms2, modelAnswer: ms2 });
      }
      const result = runRegressionValidators(records);
      setAutoIssues(result.issues);
      toast.success(`Validators ran: ${result.passed} passed, ${result.failed} new issues`);
    } catch (err: any) {
      toast.error("Validator run failed: " + err.message);
    } finally {
      setRunning(false);
    }
  }

  const filtered = useMemo(() => {
    if (filter === "all") return issues;
    return issues.filter((i) => i.status === filter);
  }, [issues, filter]);

  if (authLoading) return <div className="p-8 text-muted-foreground">Loading…</div>;
  if (!isAdmin) return <div className="p-8 text-destructive">Admin access required.</div>;

  return (
    <div className="container mx-auto max-w-6xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/dashboard" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
          <h1 className="text-2xl font-bold mt-2 tracking-tight">QA Tracker · AQA A-Level</h1>
          <p className="text-sm text-muted-foreground">
            Reviewer-flagged issues, automated validators, and resolution audit trail.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload className="h-3.5 w-3.5 mr-1.5" /> Upload tracker .xlsx
          </Button>
          <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleUpload} />
          <Button variant="outline" size="sm" onClick={runValidators} disabled={running}>
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${running ? "animate-spin" : ""}`} />
            Run validators
          </Button>
          <Button variant="ghost" size="sm" onClick={loadIssues}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Auto validator results */}
      {autoIssues.length > 0 && (
        <Card className="border-yellow-500/40">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Automated regression validators · {autoIssues.length} new issue(s)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {autoIssues.map((i) => (
                <li key={i.id} className="border-l-2 border-yellow-500/60 pl-3">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-xs text-muted-foreground">{i.description}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Filter chips */}
      <div className="flex gap-2">
        {(["open", "resolved", "all"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
            {f} {f !== "all" && `(${issues.filter((i) => i.status === f).length})`}
          </Button>
        ))}
      </div>

      {/* Issue list */}
      {loading ? (
        <div className="text-muted-foreground text-sm">Loading…</div>
      ) : filtered.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No issues in this view.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((issue) => (
            <Card key={issue.id} className={issue.status === "resolved" ? "opacity-70" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{issue.paper_code}</Badge>
                      {issue.paper_set && <Badge variant="outline">Set {issue.paper_set}</Badge>}
                      {issue.question_number && <Badge variant="outline">Q{issue.question_number}</Badge>}
                      <Badge variant="secondary">{issue.category}</Badge>
                      <Badge
                        className={
                          issue.severity === "critical" || issue.severity === "high"
                            ? "bg-destructive/15 text-destructive border-destructive/30"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {issue.severity}
                      </Badge>
                      {issue.status === "resolved" && (
                        <Badge className="bg-green-500/15 text-green-500 border-green-500/30">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> resolved
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base mt-2">{issue.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-foreground/85 whitespace-pre-wrap">{issue.description}</p>
                {issue.resolution_notes && (
                  <div className="text-xs bg-muted/40 rounded p-2 border border-border">
                    <div className="font-medium mb-1">Resolution notes</div>
                    <div className="text-muted-foreground">{issue.resolution_notes}</div>
                    {issue.resolved_at && (
                      <div className="text-[10px] mt-1 opacity-70">
                        {new Date(issue.resolved_at).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}
                {issue.status === "open" ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Textarea
                      placeholder="Resolution notes (what changed, where, screenshot link)…"
                      value={notesById[issue.id] ?? ""}
                      onChange={(e) => setNotesById((p) => ({ ...p, [issue.id]: e.target.value }))}
                      className="text-xs min-h-[60px]"
                    />
                    <Button size="sm" onClick={() => resolveIssue(issue.id)} className="self-start">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Mark resolved
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => reopenIssue(issue.id)}>
                    Reopen
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
