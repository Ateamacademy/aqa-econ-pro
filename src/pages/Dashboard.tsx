import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Lock, Brain, PenTool, Crown, FileText, TrendingUp, Calendar, Target,
  BarChart3, Flame, BookOpen, GraduationCap, ArrowRight, Sparkles,
  Clock, Award, Zap, LineChart, PieChart, StickyNote,
} from "lucide-react";
import { FREE_LIMITS } from "@/lib/plans";

interface SessionRow {
  id: string;
  subject: string;
  session_type: string;
  topic: string;
  score_percent: number | null;
  created_at: string;
  feedback_summary: string | null;
}

const MotionCard = motion.create(Card);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

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
        .limit(200);
      setSessions((data as SessionRow[]) || []);
      setLoading(false);
    };
    fetchSessions();

    const channel = supabase
      .channel("dashboard-sessions")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "practice_sessions" }, (payload) => {
        setSessions((prev) => [payload.new as SessionRow, ...prev].slice(0, 200));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Derived stats
  const stats = useMemo(() => {
    const subjectSessions = sessions.filter(s => s.subject === subject);
    const totalSessions = subjectSessions.filter(s => s.session_type !== "note_view").length;
    const diagramSessions = subjectSessions.filter(s => s.session_type === "diagram").length;
    const questionSessions = subjectSessions.filter(s => s.session_type === "question").length;
    const essaySessions = subjectSessions.filter(s => s.session_type === "essay").length;
    const topicTestSessions = subjectSessions.filter(s => s.session_type === "topic_test");
    const noteViews = subjectSessions.filter(s => s.session_type === "note_view");
    const notesViewed = new Set(noteViews.map(s => s.topic)).size;

    // Topic test scores - best score per chapter
    const topicTestScores: Record<string, number> = {};
    topicTestSessions.forEach(s => {
      if (s.score_percent !== null) {
        topicTestScores[s.topic] = Math.max(topicTestScores[s.topic] ?? 0, s.score_percent);
      }
    });
    const topicTestEntries = Object.entries(topicTestScores).sort((a, b) => a[0].localeCompare(b[0]));
    const topicTestAvg = topicTestEntries.length > 0
      ? Math.round(topicTestEntries.reduce((a, [, v]) => a + v, 0) / topicTestEntries.length)
      : null;

    // Topics practiced
    const topicCounts: Record<string, number> = {};
    subjectSessions.filter(s => s.session_type !== "note_view").forEach(s => { topicCounts[s.topic] = (topicCounts[s.topic] || 0) + 1; });
    const topTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const uniqueTopics = Object.keys(topicCounts).length;

    // Activity last 14 days (exclude note_view from activity chart)
    const activeSessions = subjectSessions.filter(s => s.session_type !== "note_view");
    const now = new Date();
    const last14 = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (13 - i));
      return d.toISOString().slice(0, 10);
    });
    const dailyCounts = last14.map(date => ({
      date,
      count: activeSessions.filter(s => s.created_at.slice(0, 10) === date).length,
    }));
    const maxDaily = Math.max(...dailyCounts.map(d => d.count), 1);

    // Streak
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (activeSessions.some(s => s.created_at.slice(0, 10) === key)) {
        streak++;
      } else if (i > 0) break;
    }

    // Scores
    const scored = activeSessions.filter(s => s.score_percent !== null);
    const avgScore = scored.length > 0 ? Math.round(scored.reduce((a, s) => a + (s.score_percent ?? 0), 0) / scored.length) : null;

    // Session type breakdown for mini pie
    const typeBreakdown = [
      { type: "Questions", count: questionSessions, color: "hsl(var(--chart-1))" },
      { type: "Diagrams", count: diagramSessions, color: "hsl(var(--chart-2))" },
      { type: "Essays", count: essaySessions, color: "hsl(var(--chart-3))" },
      { type: "Chapter Tests", count: topicTestSessions.length, color: "hsl(var(--chart-4))" },
    ].filter(t => t.count > 0);

    // Weekly comparison
    const thisWeek = activeSessions.filter(s => {
      const d = new Date(s.created_at);
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length;
    const lastWeek = activeSessions.filter(s => {
      const d = new Date(s.created_at);
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff > 7 && diff <= 14;
    }).length;
    const weeklyChange = lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : thisWeek > 0 ? 100 : 0;

    return {
      subjectSessions: activeSessions, totalSessions, diagramSessions, questionSessions, essaySessions,
      topTopics, uniqueTopics, dailyCounts, maxDaily, streak, avgScore,
      typeBreakdown, thisWeek, lastWeek, weeklyChange, notesViewed,
      topicTestEntries, topicTestAvg, topicTestCount: topicTestSessions.length,
    };
  }, [sessions, subject]);

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
  const predictedUsed = profile?.free_predicted_papers_used ?? 0;

  return (
    <motion.div
      className="container py-8 max-w-5xl"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif mb-1">Your Dashboard</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            {examBoard} {subjectLabel} · {user.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {subscribed ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">
              <Crown className="h-3.5 w-3.5" /> Pro Plan Active
            </span>
          ) : (
            <Button size="sm" variant="outline" onClick={() => navigate("/pricing")} className="gap-1.5">
              <Crown className="h-3.5 w-3.5" /> Upgrade to Pro
            </Button>
          )}
        </div>
      </motion.div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Target, label: "Total Sessions", value: stats.totalSessions, accent: "text-primary" },
          { icon: Flame, label: "Day Streak", value: stats.streak, accent: "text-destructive" },
          { icon: BookOpen, label: "Topics Covered", value: stats.uniqueTopics, accent: "text-accent" },
          { icon: Award, label: "Avg Score", value: stats.avgScore !== null ? `${stats.avgScore}%` : "—", accent: "text-highlight" },
        ].map(({ icon: Icon, label, value, accent }, i) => (
          <MotionCard key={label} variants={fadeUp} className="overflow-hidden relative group hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center relative z-10">
              <Icon className={`h-5 w-5 mx-auto mb-1.5 ${accent}`} />
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">{value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </MotionCard>
        ))}
      </div>

      {/* Activity Breakdown Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {[
          { icon: Brain, label: "Questions", value: stats.questionSessions, color: "bg-primary/10 text-primary" },
          { icon: PenTool, label: "Diagrams", value: stats.diagramSessions, color: "bg-accent/10 text-accent" },
          { icon: FileText, label: "Essays", value: stats.essaySessions, color: "bg-highlight/10 text-highlight" },
          { icon: StickyNote, label: "Notes Reviewed", value: stats.notesViewed, color: "bg-chart-4/10 text-chart-4" },
          { icon: Zap, label: "This Week", value: stats.thisWeek, color: "bg-destructive/10 text-destructive", badge: stats.weeklyChange !== 0 ? `${stats.weeklyChange > 0 ? "+" : ""}${stats.weeklyChange}%` : undefined },
        ].map(({ icon: Icon, label, value, color, badge }) => (
          <MotionCard key={label} variants={fadeUp}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold leading-tight">{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
              {badge && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  stats.weeklyChange > 0 ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"
                }`}>{badge}</span>
              )}
            </CardContent>
          </MotionCard>
        ))}
      </div>

      {/* Activity Chart — 14 days */}
      <MotionCard variants={fadeUp} className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> 14-Day Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-28">
            {stats.dailyCounts.map((d, i) => {
              const isToday = i === stats.dailyCounts.length - 1;
              const height = (d.count / stats.maxDaily) * 96;
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    {d.count}
                  </span>
                  <motion.div
                    className={`w-full rounded-sm transition-colors min-h-[3px] ${
                      isToday ? "bg-accent" : d.count > 0 ? "bg-primary/60" : "bg-muted"
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height, 3)}px` }}
                    transition={{ delay: i * 0.03, duration: 0.4 }}
                  />
                  <span className={`text-[9px] ${isToday ? "text-accent font-semibold" : "text-muted-foreground"}`}>
                    {new Date(d.date).toLocaleDateString("en-GB", { weekday: "narrow" })}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </MotionCard>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Session Type Breakdown */}
        <MotionCard variants={fadeUp}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <PieChart className="h-4 w-4" /> Session Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.typeBreakdown.length > 0 ? (
              <div className="space-y-3">
                {stats.typeBreakdown.map(({ type, count, color }) => {
                  const pct = stats.totalSessions > 0 ? Math.round((count / stats.totalSessions) * 100) : 0;
                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{type}</span>
                        <span className="text-muted-foreground text-xs">{count} ({pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No sessions yet — start practising!</p>
            )}
          </CardContent>
        </MotionCard>

        {/* Top Topics */}
        <MotionCard variants={fadeUp}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Most Practised Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.topTopics.length > 0 ? (
              <ul className="space-y-2">
                {stats.topTopics.map(([topic, count], i) => {
                  const maxCount = stats.topTopics[0][1] as number;
                  const pct = Math.round((count / maxCount) * 100);
                  return (
                    <li key={topic} className="group">
                      <div className="flex items-center justify-between text-sm mb-0.5">
                        <span className="truncate mr-2 text-xs">{topic}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0 font-medium">{count}×</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-accent/70"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No sessions yet — start practising!</p>
            )}
          </CardContent>
        </MotionCard>
      </div>

      {/* Subscription + Free Limits */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {/* Subscription Card */}
        <MotionCard variants={fadeUp} className={subscribed ? "border-accent/30 bg-accent/5" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Crown className="h-4 w-4" /> Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscribed ? (
              <div>
                <p className="text-lg font-bold text-accent flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> Pro Active
                </p>
                {subscriptionEnd && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Renews {new Date(subscriptionEnd).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-lg font-bold">Free Plan</p>
                <p className="text-xs text-muted-foreground mt-1">Limited access to features</p>
                <Button size="sm" className="mt-3 gap-1" onClick={() => navigate("/pricing")}>
                  Upgrade <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            )}
          </CardContent>
        </MotionCard>

        {/* Usage meters */}
        {!subscribed && (
          <>
            <MotionCard variants={fadeUp}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Past Papers", used: papersUsed, limit: FREE_LIMITS.papers },
                  { label: "Questions", used: questionsUsed, limit: FREE_LIMITS.questions },
                  { label: "Predicted Papers", used: predictedUsed, limit: FREE_LIMITS.predictedPapers },
                ].map(({ label, used, limit }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{label}</span>
                      <span className="text-muted-foreground">{used}/{limit}</span>
                    </div>
                    <Progress value={(used / limit) * 100} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </MotionCard>
            <MotionCard variants={fadeUp}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Diagrams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16">
                    <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none" className="stroke-accent"
                        strokeWidth="3" strokeDasharray="100" strokeLinecap="round"
                        strokeDashoffset={100 - ((questionsUsed / FREE_LIMITS.diagrams) * 100)}
                      />
                    </svg>
                    <PenTool className="h-4 w-4 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{Math.max(0, FREE_LIMITS.diagrams - questionsUsed)}</p>
                    <p className="text-[11px] text-muted-foreground">free attempts left</p>
                  </div>
                </div>
              </CardContent>
            </MotionCard>
          </>
        )}

        {subscribed && (
          <>
            <MotionCard variants={fadeUp} className="border-accent/20">
              <CardContent className="p-4 flex items-center gap-3 h-full">
                <div className="rounded-lg p-2 bg-accent/10">
                  <LineChart className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-lg font-bold">{stats.thisWeek}</p>
                  <p className="text-[11px] text-muted-foreground">Sessions this week</p>
                </div>
              </CardContent>
            </MotionCard>
            <MotionCard variants={fadeUp} className="border-accent/20">
              <CardContent className="p-4 flex items-center gap-3 h-full">
                <div className="rounded-lg p-2 bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold">{stats.streak} days</p>
                  <p className="text-[11px] text-muted-foreground">Current streak</p>
                </div>
              </CardContent>
            </MotionCard>
          </>
        )}
      </div>

      {/* Recent Activity */}
      {stats.subjectSessions.length > 0 && (
        <MotionCard variants={fadeUp} className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stats.subjectSessions.slice(0, 10).map((s, i) => (
                <motion.li
                  key={s.id}
                  className="flex items-center justify-between text-sm border-b border-border/50 pb-2 last:border-0"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      s.session_type === "diagram" ? "bg-accent/10 text-accent" :
                      s.session_type === "essay" ? "bg-highlight/10 text-highlight" :
                      "bg-primary/10 text-primary"
                    }`}>
                      {s.session_type}
                    </span>
                    <span className="truncate text-xs">{s.topic}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {s.score_percent !== null && (
                      <span className="text-[10px] font-semibold text-accent">{s.score_percent}%</span>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </MotionCard>
      )}

      {/* Quick Links */}
      <motion.div variants={fadeUp}>
        <h2 className="font-serif text-2xl mb-4">Quick Links</h2>
        <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { icon: FileText, label: "Past Papers", to: "/papers", desc: "Browse & download" },
            { icon: Brain, label: "Practice", to: "/practice", desc: "Topic questions" },
            { icon: PenTool, label: "Diagrams", to: "/diagram-practice", desc: "Draw & get feedback" },
            { icon: BookOpen, label: "Study Notes", to: "/notes", desc: "Revision materials" },
            { icon: Sparkles, label: "Predicted Papers", to: "/predicted", desc: "AI-generated exams" },
          ].map(({ icon: Icon, label, to, desc }) => (
            <Card
              key={to}
              className="cursor-pointer hover:shadow-md hover:border-accent/30 transition-all group"
              onClick={() => navigate(to)}
            >
              <CardContent className="p-4 text-center">
                <Icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground group-hover:text-accent transition-colors" />
                <p className="font-medium text-sm">{label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
