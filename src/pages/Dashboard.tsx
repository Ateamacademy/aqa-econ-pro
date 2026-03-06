import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Lock, Brain, PenTool, Crown, FileText, TrendingUp, Calendar, Target, BarChart3 } from "lucide-react";
import { FREE_LIMITS } from "@/lib/plans";
import { Progress } from "@/components/ui/progress";

interface SessionRow {
  id: string;
  subject: string;
  session_type: string;
  topic: string;
  score_percent: number | null;
  created_at: string;
}

export default function Dashboard() {
  const { user, subscribed, subscriptionEnd, profile } = useAuth();
  const { subject, subjectLabel, examBoard } = useSubject();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSessions = async () => {
      const { data } = await supabase
        .from("practice_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(100);
      setSessions((data as SessionRow[]) || []);
      setLoading(false);
    };
    fetchSessions();

    // Realtime updates
    const channel = supabase
      .channel("dashboard-sessions")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "practice_sessions" }, (payload) => {
        setSessions((prev) => [payload.new as SessionRow, ...prev].slice(0, 100));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to view your dashboard</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  const papersUsed = profile?.free_papers_used ?? 0;
  const questionsUsed = profile?.free_questions_used ?? 0;

  // Derived stats
  const subjectSessions = sessions.filter(s => s.subject === subject);
  const totalSessions = subjectSessions.length;
  const diagramSessions = subjectSessions.filter(s => s.session_type === "diagram").length;
  const questionSessions = subjectSessions.filter(s => s.session_type === "question").length;
  const essaySessions = subjectSessions.filter(s => s.session_type === "essay").length;

  // Topics practiced
  const topicCounts: Record<string, number> = {};
  subjectSessions.forEach(s => { topicCounts[s.topic] = (topicCounts[s.topic] || 0) + 1; });
  const topTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Activity last 7 days
  const now = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  const dailyCounts = last7.map(date => ({
    date,
    count: subjectSessions.filter(s => s.created_at.slice(0, 10) === date).length,
  }));
  const maxDaily = Math.max(...dailyCounts.map(d => d.count), 1);

  // Streak
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (subjectSessions.some(s => s.created_at.slice(0, 10) === key)) {
      streak++;
    } else if (i > 0) break;
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">{examBoard} {subjectLabel} · {user.email}</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-5 w-5 mx-auto mb-1 text-accent" />
            <p className="text-2xl font-bold">{totalSessions}</p>
            <p className="text-xs text-muted-foreground">Total Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-5 w-5 mx-auto mb-1 text-accent" />
            <p className="text-2xl font-bold">{questionSessions}</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PenTool className="h-5 w-5 mx-auto mb-1 text-accent" />
            <p className="text-2xl font-bold">{diagramSessions}</p>
            <p className="text-xs text-muted-foreground">Diagrams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-5 w-5 mx-auto mb-1 text-accent" />
            <p className="text-2xl font-bold">{streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity chart */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Last 7 Days Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1.5 h-24">
            {dailyCounts.map(d => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-accent/80 rounded-sm transition-all min-h-[2px]"
                  style={{ height: `${(d.count / maxDaily) * 80}px` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {new Date(d.date).toLocaleDateString("en-GB", { weekday: "short" })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Subscription */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Crown className="h-4 w-4" /> Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscribed ? (
              <div>
                <p className="text-lg font-semibold text-accent">Active</p>
                {subscriptionEnd && <p className="text-xs text-muted-foreground">Renews: {new Date(subscriptionEnd).toLocaleDateString()}</p>}
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold">Free Plan</p>
                <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/pricing")}>Upgrade</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top topics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Most Practiced Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topTopics.length > 0 ? (
              <ul className="space-y-1.5">
                {topTopics.map(([topic, count]) => (
                  <li key={topic} className="flex items-center justify-between text-sm">
                    <span className="truncate mr-2">{topic}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{count}×</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No sessions yet — start practising!</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Free limits */}
      {!subscribed && (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <PenTool className="h-4 w-4" /> Free Papers Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{papersUsed} / {FREE_LIMITS.papers}</p>
              <Progress value={(papersUsed / FREE_LIMITS.papers) * 100} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Brain className="h-4 w-4" /> Free Questions Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{questionsUsed} / {FREE_LIMITS.questions}</p>
              <Progress value={(questionsUsed / FREE_LIMITS.questions) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent activity */}
      {subjectSessions.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {subjectSessions.slice(0, 8).map(s => (
                <li key={s.id} className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.session_type === "diagram" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                      {s.session_type}
                    </span>
                    <span className="truncate max-w-[200px]">{s.topic}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <h2 className="font-serif text-2xl mb-4">Quick Links</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: FileText, label: "Past Papers", to: "/papers" },
          { icon: Brain, label: "Practice", to: "/practice" },
          { icon: PenTool, label: "Diagram Practice", to: "/diagram-practice" },
        ].map(({ icon: Icon, label, to }) => (
          <Card key={to} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => navigate(to)}>
            <CardContent className="p-4 flex items-center gap-3">
              <Icon className="h-5 w-5 text-accent" />
              <span className="font-medium text-sm">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
