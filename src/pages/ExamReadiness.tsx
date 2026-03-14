import ReadinessRadial from "@/components/dashboard/ReadinessRadial";
import MountainTracker from "@/components/dashboard/MountainTracker";
import StudyStreak from "@/components/dashboard/StudyStreak";
import TopicHeatmap from "@/components/dashboard/TopicHeatmap";
import Leaderboard from "@/components/dashboard/Leaderboard";
import ActionCards from "@/components/dashboard/ActionCards";
import PredictedGrade from "@/components/dashboard/PredictedGrade";
import DailyGoalBanner from "@/components/dashboard/DailyGoalBanner";
import ScoreDelta from "@/components/dashboard/ScoreDelta";
import { Target, Zap } from "lucide-react";

export default function ExamReadiness() {
  return (
    <div
      className="min-h-screen px-4 py-6 lg:px-8 lg:py-8"
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0f0f1a 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientDrift 20s ease infinite",
      }}
    >
      <style>{`
        @keyframes gradientDrift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.08; }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="space-y-4 order-2 lg:order-1">
            <StudyStreak />

            <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-[#a855f7]" />
                <h3 className="text-[#f1f5f9] font-semibold text-sm">Daily Goal</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-[#6366f1]" />
                  <span className="text-[#94a3b8] text-xs">Practice questions</span>
                  <span className="ml-auto text-[10px] text-[#22c55e] font-bold">✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-[#6366f1]" />
                  <span className="text-[#94a3b8] text-xs">Review notes</span>
                  <span className="ml-auto text-[10px] text-[#22c55e] font-bold">✓</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-[#2a2a4a]" />
                  <span className="text-[#64748b] text-xs">Essay practice</span>
                </div>
              </div>
            </div>
          </aside>

          {/* CENTRE */}
          <main className="space-y-6 order-1 lg:order-2">
            <DailyGoalBanner />

            <div className="relative flex justify-center py-8">
              <ScoreDelta />
              <ReadinessRadial />
            </div>

            <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
              <h3 className="text-[#f1f5f9] font-semibold text-sm mb-2">Your Journey</h3>
              <MountainTracker />
            </div>

            <div>
              <h3 className="text-[#f1f5f9] font-semibold text-sm mb-3">Recommended Actions</h3>
              <ActionCards />
            </div>
          </main>

          {/* RIGHT PANEL */}
          <aside className="space-y-4 order-3">
            <TopicHeatmap />
            <Leaderboard />
            <PredictedGrade />
          </aside>
        </div>
      </div>
    </div>
  );
}
