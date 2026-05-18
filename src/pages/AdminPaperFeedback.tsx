import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, RefreshCw, Download } from "lucide-react";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  Line, ComposedChart, CartesianGrid,
} from "recharts";

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";

interface Row {
  id: string;
  user_id: string | null;
  exam_board: string;
  qualification: string;
  paper_label: string | null;
  difficulty: string;
  predicted_grade: string | null;
  comment: string | null;
  created_at: string;
}

export default function AdminPaperFeedback() {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("paper_feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) toast.error("Failed to load: " + error.message);
    else setRows((data ?? []) as Row[]);
    setLoading(false);
  }

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) =>
      [r.exam_board, r.qualification, r.paper_label, r.difficulty, r.predicted_grade, r.comment]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(t)),
    );
  }, [rows, q]);

  // Difficulty distribution + smoothed bell curve
  const DIFF_ORDER: { key: string; label: string; color: string }[] = [
    { key: "easy", label: "Easy", color: "#22c55e" },
    { key: "medium", label: "Medium", color: "#3b82f6" },
    { key: "hard", label: "Hard", color: "#f59e0b" },
    { key: "very_hard", label: "Very Hard", color: "#ef4444" },
  ];
  const { bellData, totalFiltered, consensus, mean, stddev } = useMemo(() => {
    const counts: Record<string, number> = { easy: 0, medium: 0, hard: 0, very_hard: 0 };
    filtered.forEach((r) => {
      if (counts[r.difficulty] !== undefined) counts[r.difficulty] += 1;
    });
    const ordered = DIFF_ORDER.map((d) => ({ key: d.key, label: d.label, color: d.color, count: counts[d.key] || 0 }));
    const total = ordered.reduce((s, d) => s + d.count, 0);
    // Smoothed (rolling) curve for visual bell shape
    const cs = ordered.map((d) => d.count);
    const smoothed = cs.map((_, i) => {
      const prev = cs[i - 1] ?? cs[i];
      const next = cs[i + 1] ?? cs[i];
      return (prev + cs[i] * 2 + next) / 4;
    });
    // Numeric stats (Easy=1 … Very Hard=4)
    let m = 0;
    if (total > 0) {
      const sum = ordered.reduce((s, d, i) => s + (i + 1) * d.count, 0);
      m = sum / total;
    }
    let sd = 0;
    if (total > 0) {
      const variance = ordered.reduce((s, d, i) => s + d.count * Math.pow(i + 1 - m, 2), 0) / total;
      sd = Math.sqrt(variance);
    }
    const top = ordered.reduce((a, b) => (b.count > a.count ? b : a), ordered[0]);
    return {
      bellData: ordered.map((d, i) => ({ ...d, curve: smoothed[i] })),
      totalFiltered: total,
      consensus: total > 0 ? top.label : "—",
      mean: m,
      stddev: sd,
    };
  }, [filtered]);

  function exportCsv() {
    const header = ["created_at", "exam_board", "qualification", "paper_label", "difficulty", "predicted_grade", "user_id", "comment"];
    const lines = [header.join(",")];
    filtered.forEach((r) => {
      lines.push(
        header
          .map((h) => {
            const v = (r as any)[h] ?? "";
            const s = String(v).replace(/"/g, '""');
            return /[",\n]/.test(s) ? `"${s}"` : s;
          })
          .join(","),
      );
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paper_feedback_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (authLoading) return <div className="p-8 text-muted-foreground">Loading…</div>;
  if (!isAdmin) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Admin only</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">You don't have access to this page.</p>
            <Link to="/" className="text-sm underline mt-3 inline-block">Back home</Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <Link to="/" className="text-xs text-muted-foreground inline-flex items-center gap-1 mb-2 hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
          <h1 className="text-2xl font-bold">Grade Calculator — Feedback</h1>
          <p className="text-sm text-muted-foreground">Student-submitted paper feedback ({rows.length} total)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
        </div>
      </div>

      <Input
        placeholder="Filter by board, qualification, grade, comment…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-4 max-w-md"
      />

      {/* Difficulty bell curve */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Difficulty distribution</CardTitle>
          <p className="text-xs text-muted-foreground">
            {totalFiltered} response{totalFiltered === 1 ? "" : "s"} · consensus: <span className="text-foreground font-medium">{consensus}</span>
            {totalFiltered > 0 && (
              <> · mean = <span className="font-mono">{mean.toFixed(2)}</span> / 4 · σ = <span className="font-mono">{stddev.toFixed(2)}</span></>
            )}
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {totalFiltered === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground border border-dashed border-border rounded-lg">
                No feedback yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={bellData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                    formatter={(v: any, name: string) => [v, name === "curve" ? "Trend" : "Responses"]}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {bellData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Bar>
                  <Line type="monotone" dataKey="curve" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {bellData.map((d) => {
              const pct = totalFiltered > 0 ? Math.round((d.count / totalFiltered) * 100) : 0;
              return (
                <div key={d.key} className="rounded-lg border border-border p-3 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.label}</div>
                  <div className="text-xl font-bold text-foreground mt-1">{d.count}</div>
                  <div className="text-[11px] text-muted-foreground">{pct}%</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">When</th>
                <th className="text-left p-3">Board</th>
                <th className="text-left p-3">Qualification</th>
                <th className="text-left p-3">Paper</th>
                <th className="text-left p-3">Difficulty</th>
                <th className="text-left p-3">Predicted</th>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Comment</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">No feedback yet.</td></tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/20">
                    <td className="p-3 whitespace-nowrap text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="p-3">{r.exam_board}</td>
                    <td className="p-3">{r.qualification}</td>
                    <td className="p-3">{r.paper_label || "—"}</td>
                    <td className="p-3"><Badge variant="outline">{r.difficulty}</Badge></td>
                    <td className="p-3 font-mono">{r.predicted_grade || "—"}</td>
                    <td className="p-3 text-xs text-muted-foreground">{r.user_id ? r.user_id.slice(0, 8) : "anon"}</td>
                    <td className="p-3 text-xs max-w-xs truncate" title={r.comment ?? ""}>{r.comment || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
