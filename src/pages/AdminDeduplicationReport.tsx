import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";
import { jaccard, cosine } from "@/lib/uniqueness/similarity";
import { UNIQUENESS_CONFIG } from "@/lib/uniqueness-config";
import { getScenarioCoverage } from "@/lib/uniqueness/dedupClient";

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";

type FpRow = {
  id: string;
  paper_code: string;
  set_label: string;
  section: string;
  marks: number;
  question_number: string;
  token_set: string[];
  semantic_core: string;
  scenario_key: string | null;
  mcq_concept: string | null;
  mcq_answer_value: string | null;
};

type Cluster = {
  a: FpRow;
  b: FpRow;
  jaccardScore: number;
  cosineScore: number;
  reason: "text" | "scenario" | "mcq";
};

type Coverage = { paperCode: string; label: string; used: number; pool: number; ratio: number };

export default function AdminDeduplicationReport() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<FpRow[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [coverage, setCoverage] = useState<Coverage[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("question_fingerprints")
        .select("id, paper_code, set_label, section, marks, question_number, token_set, semantic_core, scenario_key, mcq_concept, mcq_answer_value")
        .order("created_at", { ascending: false });
      if (!mounted) return;
      const all = (data ?? []) as FpRow[];
      setRows(all);

      // Compute clusters
      const found: Cluster[] = [];
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const a = all[i];
          const b = all[j];
          if (a.paper_code !== b.paper_code) continue;
          // Scenario
          if (a.scenario_key && a.scenario_key === b.scenario_key) {
            found.push({ a, b, jaccardScore: 1, cosineScore: 1, reason: "scenario" });
            continue;
          }
          // MCQ concept+answer
          if (a.mcq_concept && a.mcq_concept === b.mcq_concept && a.mcq_answer_value === b.mcq_answer_value) {
            found.push({ a, b, jaccardScore: 1, cosineScore: 1, reason: "mcq" });
            continue;
          }
          // Text similarity (same section + marks)
          if (a.section === b.section && a.marks === b.marks) {
            const jc = jaccard(a.token_set ?? [], b.token_set ?? []);
            const cs = cosine(a.semantic_core ?? "", b.semantic_core ?? "");
            if (jc >= UNIQUENESS_CONFIG.jaccardThreshold || cs >= UNIQUENESS_CONFIG.cosineThreshold) {
              found.push({ a, b, jaccardScore: jc, cosineScore: cs, reason: "text" });
            }
          }
        }
      }
      found.sort((x, y) => Math.max(y.jaccardScore, y.cosineScore) - Math.max(x.jaccardScore, x.cosineScore));
      setClusters(found);

      // Coverage
      const codes = ["7136/1", "7136/2", "7136/3"];
      const cov = await Promise.all(
        codes.map(async (c) => {
          const r = await getScenarioCoverage(c);
          return {
            paperCode: c,
            label: UNIQUENESS_CONFIG.estimatedPools[c]?.label ?? c,
            used: r.used,
            pool: r.pool,
            ratio: r.ratio,
          };
        }),
      );
      setCoverage(cov);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!user) return <Navigate to="/auth" replace />;
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <ShieldCheck className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h1 className="text-xl font-bold text-foreground">Admin only</h1>
        <p className="text-sm text-muted-foreground mt-1">
          The deduplication report is restricted to platform admins.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold mb-2">
          <ShieldCheck className="h-3 w-3" /> Admin
        </div>
        <h1 className="text-2xl font-bold text-foreground">Deduplication report</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cross-set similarity audit for predicted papers. Pairs above the threshold are listed below.
        </p>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-[10px] uppercase font-semibold text-muted-foreground">Total questions</div>
            <div className="text-2xl font-bold text-foreground mt-1">{rows.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-[10px] uppercase font-semibold text-muted-foreground">Duplicate clusters</div>
            <div className="text-2xl font-bold text-foreground mt-1">{clusters.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-[10px] uppercase font-semibold text-muted-foreground">Status</div>
            <div className="text-sm font-semibold mt-1 flex items-center gap-1.5">
              {clusters.length === 0 ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> <span className="text-emerald-300">Clean</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-amber-400" /> <span className="text-amber-300">Review needed</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage */}
      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Scenario coverage</div>
          {coverage.map((c) => (
            <div key={c.paperCode} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground">{c.label}</span>
                <span className={cn(c.ratio >= 0.8 ? "text-amber-300" : "text-muted-foreground")}>
                  {c.used} / ~{c.pool} ({Math.round(c.ratio * 100)}%)
                </span>
              </div>
              <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    c.ratio >= 0.8 ? "bg-amber-500" : c.ratio >= 0.7 ? "bg-amber-400/70" : "bg-emerald-500/70",
                  )}
                  style={{ width: `${Math.min(100, c.ratio * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clusters */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Duplicate clusters
            </div>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="h-3 w-3 mr-1.5" /> Refresh
            </Button>
          </div>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : clusters.length === 0 ? (
            <div className="text-sm text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> No duplicates above threshold.
            </div>
          ) : (
            <div className="space-y-3">
              {clusters.map((cl, i) => {
                const score = Math.max(cl.jaccardScore, cl.cosineScore);
                const sev = score >= 0.85 ? "HIGH" : "MEDIUM";
                return (
                  <div
                    key={i}
                    className="rounded-md border border-border bg-card/50 p-3 text-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant={sev === "HIGH" ? "destructive" : "outline"} className="text-[10px]">
                        {sev}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {cl.reason}
                      </Badge>
                      <span className="text-muted-foreground">
                        Jaccard {cl.jaccardScore.toFixed(2)} · Cosine {cl.cosineScore.toFixed(2)}
                      </span>
                    </div>
                    <div className="font-mono text-foreground">
                      {cl.a.paper_code} Set {cl.a.set_label} Q{cl.a.question_number} ↔ {cl.b.paper_code} Set{" "}
                      {cl.b.set_label} Q{cl.b.question_number}
                    </div>
                    {cl.reason === "scenario" && cl.a.scenario_key && (
                      <div className="text-muted-foreground">Scenario: {cl.a.scenario_key}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
