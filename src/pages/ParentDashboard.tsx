import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useReadinessScore, type SessionRow } from "@/hooks/useReadinessScore";
import ReadinessRadial from "@/components/dashboard/ReadinessRadial";
import MountainTracker from "@/components/dashboard/MountainTracker";
import StudyStreak from "@/components/dashboard/StudyStreak";
import GradeTrendChart from "@/components/dashboard/GradeTrendChart";
import PerformanceOverTime from "@/components/dashboard/PerformanceOverTime";
import StrengthWeakness from "@/components/dashboard/StrengthWeakness";
import TopicHeatmap from "@/components/dashboard/TopicHeatmap";
import RecentPapersTable from "@/components/dashboard/RecentPapersTable";
import PredictedGrade from "@/components/dashboard/PredictedGrade";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Lock, Users, GraduationCap, TrendingUp, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChildProfile {
  user_id: string;
  display_name: string;
  student_email: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

export default function ParentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("token");

  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingInvite, setAcceptingInvite] = useState(false);
  const [showFullDashboard, setShowFullDashboard] = useState(false);

  // Accept invite if token present
  useEffect(() => {
    if (!user || !inviteToken) return;
    const accept = async () => {
      setAcceptingInvite(true);
      const { data, error } = await supabase.rpc("accept_parent_invite", { token: inviteToken });
      if (error) {
        toast.error("Failed to accept invite: " + error.message);
      } else if (data) {
        toast.success("You're now linked to your child's account!");
        // Remove token from URL
        navigate("/parent-dashboard", { replace: true });
      } else {
        toast.error("Invalid or expired invite link");
      }
      setAcceptingInvite(false);
    };
    accept();
  }, [user, inviteToken]);

  // Fetch linked children
  useEffect(() => {
    if (!user) return;
    const fetchChildren = async () => {
      const { data, error } = await supabase.rpc("get_child_profiles", { p_parent_id: user.id });
      if (!error && data) {
        setChildren(data as ChildProfile[]);
        if (data.length > 0 && !selectedChild) {
          setSelectedChild((data as ChildProfile[])[0].user_id);
        }
      }
      setLoading(false);
    };
    fetchChildren();
  }, [user, acceptingInvite]);

  // Fetch selected child's sessions
  useEffect(() => {
    if (!user || !selectedChild) return;
    const fetchSessions = async () => {
      const { data } = await supabase.rpc("get_child_sessions", { p_parent_id: user.id });
      if (data) {
        const childSessions = (data as any[])
          .filter((s) => s.user_id === selectedChild)
          .map((s) => ({
            id: s.id,
            user_id: s.user_id,
            subject: s.subject,
            topic: s.topic,
            session_type: s.session_type,
            score_percent: s.score_percent,
            feedback_summary: s.feedback_summary,
            created_at: s.created_at,
          })) as SessionRow[];
        setSessions(childSessions);
      }
    };
    fetchSessions();
  }, [user, selectedChild]);

  const selectedProfile = children.find((c) => c.user_id === selectedChild);
  const r = useReadinessScore(sessions, "economics");

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
        <Lock className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Sign in to view the Parent Dashboard</h1>
        <p className="text-muted-foreground text-sm">Use the login credentials from your invite email.</p>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  if (loading || acceptingInvite) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <Users className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground tracking-tight">No Students Linked</h1>
        <p className="text-muted-foreground text-sm max-w-md">
          You haven't been linked to any student accounts yet. Ask your child to send you an invite from their dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 tracking-tight">
            <Users className="h-6 w-6 text-primary" />
            Parent Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor your child's exam preparation progress</p>
        </div>

        {/* Child selector */}
        {children.length > 1 && (
          <select
            value={selectedChild || ""}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {children.map((c) => (
              <option key={c.user_id} value={c.user_id}>{c.display_name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Summary Cards */}
      <motion.div
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: GraduationCap, label: "Predicted Grade", value: r.score >= 80 ? "A*" : r.score >= 70 ? "A" : r.score >= 60 ? "B" : r.score >= 50 ? "C" : "D", color: "text-primary" },
            { icon: TrendingUp, label: "Readiness Score", value: `${r.score}%`, color: "text-success" },
            { icon: BookOpen, label: "Papers Completed", value: `${r.predictedPaperCount}`, color: "text-accent" },
            { label: "Study Streak", value: `${r.streak} days`, icon: () => <span className="text-lg">🔥</span>, color: "text-warning" },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  {typeof Icon === "function" && "displayName" in Icon ? <Icon className={cn("h-4 w-4", color)} /> : <Icon />}
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Readiness + Mountain */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6 flex justify-center">
              <ReadinessRadial score={r.score} stageName={r.stageName} stage={r.stage} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold">Progress Journey</CardTitle></CardHeader>
            <CardContent>
              <MountainTracker activeStage={r.stage} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Grade Trend + Predicted */}
        <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6 mb-6">
          <GradeTrendChart sessions={sessions} subject="economics" />
          <PredictedGrade score={r.avgScore ?? r.score} />
        </motion.div>

        {/* Strengths & Weaknesses */}
        <motion.div variants={fadeUp} className="mb-6">
          <StrengthWeakness sessions={sessions} subject="economics" />
        </motion.div>

        {/* Expand for full dashboard */}
        <motion.div variants={fadeUp} className="mb-6">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setShowFullDashboard(!showFullDashboard)}
          >
            {showFullDashboard ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showFullDashboard ? "Hide Detailed Analytics" : "View Detailed Analytics"}
          </Button>
        </motion.div>

        {showFullDashboard && (
          <>
            <motion.div variants={fadeUp} className="mb-6">
              <RecentPapersTable sessions={sessions} subject="economics" />
            </motion.div>
            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6 mb-6">
              <PerformanceOverTime sessions={sessions} subject="economics" />
              <StudyStreak streak={r.streak} weeklyDays={r.weeklyDays} />
            </motion.div>
            <motion.div variants={fadeUp} className="mb-6">
              <TopicHeatmap topics={r.topicMastery} />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
