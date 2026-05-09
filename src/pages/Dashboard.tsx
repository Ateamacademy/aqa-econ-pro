import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { supabase } from "@/integrations/supabase/client";
import { useReadinessScore, type SessionRow } from "@/hooks/useReadinessScore";
import { useDashboardState } from "@/hooks/useDashboardState";
import ReadinessRadial from "@/components/dashboard/ReadinessRadial";
import InteractiveJourney from "@/components/dashboard/InteractiveJourney";
import StatTiles from "@/components/dashboard/StatTiles";
import DailyActionCard from "@/components/dashboard/DailyActionCard";
import GradeTrendPanel from "@/components/dashboard/GradeTrendPanel";
import GradeLikelihoodPanel from "@/components/dashboard/GradeLikelihoodPanel";
import StudyStreak from "@/components/dashboard/StudyStreak";
import TopicHeatmap from "@/components/dashboard/TopicHeatmap";
import Leaderboard from "@/components/dashboard/Leaderboard";
import ActionCards from "@/components/dashboard/ActionCards";
import ScoreDelta from "@/components/dashboard/ScoreDelta";
import RecentPapersTable from "@/components/dashboard/RecentPapersTable";
import AttemptHistoryPanel from "@/components/dashboard/AttemptHistoryPanel";
import PerformanceOverTime from "@/components/dashboard/PerformanceOverTime";
import StrengthWeakness from "@/components/dashboard/StrengthWeakness";
import { motion } from "framer-motion";
import {
  Lock, LayoutDashboard, FileText, BookOpen, Compass, MessageCircle,
  BarChart3, Settings, Crown, Bell, GraduationCap, ChevronRight, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InviteParentModal } from "@/components/dashboard/InviteParentModal";

const sidebarNav = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard", active: true },
  { icon: FileText, label: "Predicted Papers", to: "/predicted" },
  { icon: BookOpen, label: "Study Notes", to: "/notes" },
  { icon: Compass, label: "Diagram Builder", to: "/diagram-practice" },
  { icon: MessageCircle, label: "24/7 Tutor", to: "/tutor" },
  { icon: BarChart3, label: "Progress", to: "/dashboard" },
  { icon: Settings, label: "Settings", to: "/dashboard" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

export default function Dashboard() {
  const { user, subscribed } = useAuth();
  const { subject, subjectLabel, examBoard } = useSubject();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteParent, setShowInviteParent] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchSessions = async () => {
      const { data } = await supabase
        .from("practice_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(500);
      setSessions((data as SessionRow[]) || []);
      setLoading(false);
    };
    fetchSessions();

    const channel = supabase
      .channel("readiness-sessions")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "practice_sessions" }, (payload) => {
        setSessions((prev) => [payload.new as SessionRow, ...prev].slice(0, 500));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const r = useReadinessScore(sessions, subject);
  const dash = useDashboardState(sessions as any, subject);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 bg-background">
        <Lock className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground">Sign in to view your dashboard</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* ═══ SIDEBAR ═══ */}
      <aside className="hidden lg:flex flex-col w-[240px] border-r border-border bg-background shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        {/* User */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {user.email?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.email?.split("@")[0]}</p>
              <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {examBoard}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  item.active
                    ? "bg-popover text-foreground border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-popover/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade card */}
        {!subscribed && (
          <div className="p-3">
            <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
              <Crown className="h-5 w-5 text-primary mb-2" />
              <p className="text-xs font-semibold text-foreground mb-1">Upgrade to Pro</p>
              <p className="text-[10px] text-muted-foreground mb-3">Unlock unlimited papers, marking, and 24/7 tutor.</p>
              <Button size="sm" onClick={() => navigate("/pricing")} className="w-full text-xs h-8">
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-3 flex items-center justify-between gap-4">
          <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
          <div className="flex-1" />
          <div className="flex items-center gap-3 shrink-0">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <Button size="sm" variant="outline" onClick={() => setShowInviteParent(true)} className="gap-1.5 text-xs">
              <Users className="h-3.5 w-3.5" /> Invite Parent
            </Button>
            <Button size="sm" onClick={() => navigate("/predicted")} className="gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" /> Generate New Paper
            </Button>
          </div>
        </div>

        {/* Dashboard content */}
        <motion.div
          className="p-6 lg:p-8 max-w-[1200px] mx-auto"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Daily Action Card — for everyone */}
          <motion.div variants={fadeUp}>
            <DailyActionCard action={dash.dailyAction} today={dash.today} />
          </motion.div>

          {/* Readiness Score Hero — Pro only */}
          {subscribed && (
            <motion.div variants={fadeUp} className="flex justify-center py-6 relative">
              <ScoreDelta points={dash.readinessScore.weeklyChange} />
              <ReadinessRadial
                score={dash.readinessScore.value}
                stageName={dash.readinessScore.stageName}
                stage={dash.readinessScore.stage}
              />
            </motion.div>
          )}

          {/* Interactive Journey — Pro only */}
          {subscribed && (
            <motion.div variants={fadeUp}>
              <InteractiveJourney state={dash} />
            </motion.div>
          )}

          {/* Stat tiles — clickable */}
          <motion.div variants={fadeUp}>
            <StatTiles state={dash} />
          </motion.div>

          {/* Grade Trend + Likelihood */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <motion.div variants={fadeUp}>
              <GradeTrendPanel state={dash} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <GradeLikelihoodPanel state={dash} />
            </motion.div>
          </div>

          {/* Action Cards */}
          {subscribed && (
            <motion.div variants={fadeUp} className="mb-6">
              <h3 className="text-foreground font-semibold text-sm mb-3">Recommended Actions</h3>
              <ActionCards actions={r.recommendations} />
            </motion.div>
          )}

          {/* Two-Column Lower */}
          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            {/* Left */}
            <div className="space-y-6">
              <motion.div variants={fadeUp}>
                <RecentPapersTable sessions={sessions} subject={subject} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <AttemptHistoryPanel />
              </motion.div>
              <motion.div variants={fadeUp}>
                <StrengthWeakness sessions={sessions} subject={subject} />
              </motion.div>
              <motion.div variants={fadeUp}>
                <TopicHeatmap topics={r.topicMastery} />
              </motion.div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              {subscribed && (
                <motion.div variants={fadeUp}>
                  <StudyStreak streak={r.streak} weeklyDays={r.weeklyDays} />
                </motion.div>
              )}
              {subscribed && (
                <motion.div variants={fadeUp}>
                  <PerformanceOverTime sessions={sessions} subject={subject} />
                </motion.div>
              )}
              {subscribed && (
                <motion.div variants={fadeUp}>
                  <Leaderboard userScore={r.score} />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <InviteParentModal open={showInviteParent} onOpenChange={setShowInviteParent} />
    </div>
  );
}
