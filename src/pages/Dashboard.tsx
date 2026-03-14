import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { supabase } from "@/integrations/supabase/client";
import { useReadinessScore, type SessionRow } from "@/hooks/useReadinessScore";
import ReadinessRadial from "@/components/dashboard/ReadinessRadial";
import MountainTracker from "@/components/dashboard/MountainTracker";
import StudyStreak from "@/components/dashboard/StudyStreak";
import TopicHeatmap from "@/components/dashboard/TopicHeatmap";
import Leaderboard from "@/components/dashboard/Leaderboard";
import ActionCards from "@/components/dashboard/ActionCards";
import PredictedGrade from "@/components/dashboard/PredictedGrade";
import DailyGoalBanner from "@/components/dashboard/DailyGoalBanner";
import ScoreDelta from "@/components/dashboard/ScoreDelta";
import GradientMeshBg from "@/components/dashboard/GradientMeshBg";
import { motion } from "framer-motion";
import { Lock, Target, Zap, BarChart3, Award, Brain, PenTool, FileText, Flame, BookOpen, GraduationCap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const STAGE_BG: Record<number, string> = {
  0: "linear-gradient(135deg, #1a1a2e 0%, #1a1a2e 100%)",
  1: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  2: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
  3: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0f0f1a 100%)",
  4: "linear-gradient(135deg, #0f0f1a 0%, #2e1065 30%, #1a0a2e 70%, #0f0f1a 100%)",
};

export default function Dashboard() {
  const { user, subscribed } = useAuth();
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

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4" style={{ background: STAGE_BG[0] }}>
        <Lock className="h-12 w-12 text-[#64748b]" />
        <h1 className="text-2xl font-bold text-[#f1f5f9]">Sign in to view your dashboard</h1>
        <Button onClick={() => navigate("/auth")} className="bg-[#6366f1] hover:bg-[#6366f1]/90">Sign In</Button>
      </div>
    );
  }

  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div
      className="min-h-screen px-4 py-6 lg:px-8 lg:py-8"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      style={{
        background: STAGE_BG[r.stage],
        backgroundSize: r.stage >= 3 ? "400% 400%" : undefined,
        animation: r.stage >= 3 ? "gradientDrift 20s ease infinite" : undefined,
      }}
    >
      <style>{`
        @keyframes gradientDrift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9] flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-[#a855f7]" /> Exam Readiness
            </h1>
            <p className="text-sm text-[#64748b] mt-1">{examBoard} {subjectLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            {subscribed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6366f1]/15 text-[#a855f7] text-xs font-semibold">
                <Crown className="h-3.5 w-3.5" /> Pro
              </span>
            ) : (
              <Button size="sm" onClick={() => navigate("/pricing")} className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-xs gap-1">
                <Crown className="h-3.5 w-3.5" /> Upgrade
              </Button>
            )}
          </div>
        </motion.div>

        {/* Achievement badge for Peak Mastery */}
        {r.stage === 4 && (
          <motion.div variants={fadeUp} className="mb-4 rounded-xl bg-[#a855f7]/15 border border-[#a855f7]/30 px-4 py-3 flex items-center gap-3">
            <Award className="h-5 w-5 text-[#a855f7]" />
            <span className="text-[#f1f5f9] text-sm font-semibold">🏆 Exam Ready Economist — You've reached Peak Mastery!</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="space-y-4 order-2 lg:order-1">
            <motion.div variants={fadeUp}>
              <StudyStreak streak={r.streak} weeklyDays={r.weeklyDays} />
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-[#a855f7]" />
                <h3 className="text-[#f1f5f9] font-semibold text-sm">Score Breakdown</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Questions (25%)", value: r.questionAccuracy, icon: Brain },
                  { label: "Predicted (30%)", value: r.predictedPaperScore, icon: FileText },
                  { label: "Essays (15%)", value: r.essayScore, icon: PenTool },
                  { label: "Diagrams (10%)", value: r.diagramAccuracy, icon: PenTool },
                  { label: "Topics (10%)", value: r.topicCoverage, icon: BookOpen },
                  { label: "Streak (5%)", value: r.streakScore, icon: Flame },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[#94a3b8] flex items-center gap-1.5">
                        <Icon className="h-3 w-3 text-[#6366f1]" /> {label}
                      </span>
                      <span className="text-[#f1f5f9] font-semibold">{value}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-[#2a2a4a] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity Chart */}
            <motion.div variants={fadeUp} className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-[#6366f1]" />
                <h3 className="text-[#f1f5f9] font-semibold text-sm">14-Day Activity</h3>
              </div>
              <div className="flex items-end gap-1 h-20">
                {r.dailyCounts.map((d, i) => {
                  const maxDaily = Math.max(...r.dailyCounts.map(x => x.count), 1);
                  const height = (d.count / maxDaily) * 64;
                  const isToday = i === r.dailyCounts.length - 1;
                  return (
                    <div key={d.date} className="flex-1 flex flex-col items-center gap-0.5 group">
                      <motion.div
                        className={`w-full rounded-sm min-h-[2px] ${
                          isToday ? "bg-[#a855f7]" : d.count > 0 ? "bg-[#6366f1]/60" : "bg-[#2a2a4a]"
                        }`}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(height, 2)}px` }}
                        transition={{ delay: i * 0.03, duration: 0.4 }}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </aside>

          {/* CENTRE */}
          <main className="space-y-6 order-1 lg:order-2">
            <motion.div variants={fadeUp}>
              <DailyGoalBanner />
            </motion.div>

            <motion.div variants={fadeUp} className="relative flex justify-center py-8">
              <ScoreDelta points={r.score > 0 ? 5 : 0} />
              <ReadinessRadial score={r.score} stageName={r.stageName} />
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
              <h3 className="text-[#f1f5f9] font-semibold text-sm mb-2">Your Journey</h3>
              <MountainTracker activeStage={r.stage} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-[#f1f5f9] font-semibold text-sm mb-3">Recommended Actions</h3>
              <ActionCards actions={r.recommendations} />
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Sessions", value: r.totalSessions, color: "#6366f1" },
                { label: "Questions", value: r.questionCount, color: "#a855f7" },
                { label: "Essays", value: r.essayCount, color: "#ec4899" },
                { label: "Topics", value: r.uniqueTopics, color: "#22c55e" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-4 text-center">
                  <p className="text-2xl font-bold text-[#f1f5f9] tabular-nums">{value}</p>
                  <p className="text-[10px] text-[#64748b] mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </main>

          {/* RIGHT PANEL */}
          <aside className="space-y-4 order-3">
            <motion.div variants={fadeUp}>
              <TopicHeatmap topics={r.topicMastery} />
            </motion.div>
            {r.stage >= 3 && (
              <motion.div variants={fadeUp}>
                <Leaderboard userScore={r.score} />
              </motion.div>
            )}
            <motion.div variants={fadeUp}>
              <PredictedGrade score={r.score} />
            </motion.div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
