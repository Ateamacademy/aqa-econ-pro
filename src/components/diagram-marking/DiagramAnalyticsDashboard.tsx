import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target, TrendingUp, AlertTriangle } from "lucide-react";

interface AnalyticsSummary {
  totalAttempts: number;
  avgScore: number;
  bestDiagram: string;
  weakestDiagram: string;
  recentResults: Array<{
    diagram_type: string;
    marks_awarded: number;
    total_marks: number;
    difficulty: string;
    created_at: string;
  }>;
  diagramBreakdown: Record<string, { attempts: number; avgScore: number }>;
}

export function DiagramAnalyticsDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadAnalytics();
  }, [user]);

  const loadAnalytics = async () => {
    if (!user) return;
    setLoading(true);

    const { data } = await supabase
      .from("diagram_marking_results")
      .select("diagram_type, marks_awarded, total_marks, difficulty, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (!data || data.length === 0) {
      setAnalytics(null);
      setLoading(false);
      return;
    }

    const breakdown: Record<string, { attempts: number; totalPct: number }> = {};
    let totalPct = 0;

    for (const r of data) {
      const pct = r.total_marks > 0 ? (r.marks_awarded / r.total_marks) * 100 : 0;
      totalPct += pct;
      if (!breakdown[r.diagram_type]) breakdown[r.diagram_type] = { attempts: 0, totalPct: 0 };
      breakdown[r.diagram_type].attempts++;
      breakdown[r.diagram_type].totalPct += pct;
    }

    const diagramBreakdown: Record<string, { attempts: number; avgScore: number }> = {};
    let bestScore = -1, worstScore = 101;
    let bestDiagram = "", weakestDiagram = "";

    for (const [type, stats] of Object.entries(breakdown)) {
      const avg = stats.totalPct / stats.attempts;
      diagramBreakdown[type] = { attempts: stats.attempts, avgScore: Math.round(avg) };
      if (avg > bestScore) { bestScore = avg; bestDiagram = type; }
      if (avg < worstScore) { worstScore = avg; weakestDiagram = type; }
    }

    setAnalytics({
      totalAttempts: data.length,
      avgScore: Math.round(totalPct / data.length),
      bestDiagram,
      weakestDiagram,
      recentResults: data.slice(0, 10),
      diagramBreakdown,
    });
    setLoading(false);
  };

  if (loading) return <p className="text-sm text-muted-foreground animate-pulse">Loading analytics...</p>;
  if (!analytics) return <p className="text-sm text-muted-foreground">No diagram attempts yet. Complete a diagram question to see your analytics.</p>;

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-2xl font-bold">{analytics.totalAttempts}</p>
            <p className="text-xs text-muted-foreground">Total Attempts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-2xl font-bold">{analytics.avgScore}%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-5 w-5 mx-auto text-emerald-500 mb-1" />
            <p className="text-sm font-bold text-emerald-500 truncate">{analytics.bestDiagram.replace(/_/g, " ")}</p>
            <p className="text-xs text-muted-foreground">Strongest</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-5 w-5 mx-auto text-amber-500 mb-1" />
            <p className="text-sm font-bold text-amber-500 truncate">{analytics.weakestDiagram.replace(/_/g, " ")}</p>
            <p className="text-xs text-muted-foreground">Needs Work</p>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown by diagram type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Performance by Diagram Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(analytics.diagramBreakdown)
              .sort(([, a], [, b]) => b.avgScore - a.avgScore)
              .map(([type, stats]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-xs text-foreground w-40 truncate">{type.replace(/_/g, " ")}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        stats.avgScore >= 80 ? "bg-emerald-500" :
                        stats.avgScore >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${stats.avgScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {stats.avgScore}% ({stats.attempts})
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent results */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Recent Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {analytics.recentResults.map((r, i) => {
              const pct = r.total_marks > 0 ? Math.round((r.marks_awarded / r.total_marks) * 100) : 0;
              return (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30 last:border-0">
                  <span className="text-foreground">{r.diagram_type.replace(/_/g, " ")}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{r.difficulty}</Badge>
                    <span className={pct >= 80 ? "text-emerald-500" : pct >= 60 ? "text-amber-500" : "text-red-500"}>
                      {r.marks_awarded}/{r.total_marks}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
