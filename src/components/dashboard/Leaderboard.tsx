import { Trophy } from "lucide-react";

interface Props {
  userScore: number;
}

export default function Leaderboard({ userScore }: Props) {
  // Generate mock peers around the user's score
  const students = [
    { rank: 1, name: "Alex", score: Math.min(userScore + 5, 100), isYou: false },
    { rank: 2, name: "You", score: userScore, isYou: true },
    { rank: 3, name: "Jamie", score: Math.max(userScore - 7, 0), isYou: false },
    { rank: 4, name: "Sam", score: Math.max(userScore - 13, 0), isYou: false },
    { rank: 5, name: "Priya", score: Math.max(userScore - 18, 0), isYou: false },
  ].sort((a, b) => b.score - a.score).map((s, i) => ({ ...s, rank: i + 1 }));

  const avatarColors = ["#ec4899", "#6366f1", "#a855f7", "#22c55e", "#f59e0b"];

  return (
    <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
      <h3 className="text-[#f1f5f9] font-semibold text-sm mb-4">Leaderboard</h3>
      <div className="space-y-2">
        {students.map((s, i) => (
          <div
            key={s.name}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              s.isYou ? "bg-[#6366f1]/15 border border-[#6366f1]/30" : "hover:bg-[#2a2a4a]/50"
            }`}
          >
            <span className="text-[#64748b] text-xs font-semibold w-4 text-center">
              {s.rank === 1 ? <Trophy className="h-3.5 w-3.5 text-[#f59e0b] inline" /> : s.rank}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
              style={{ backgroundColor: avatarColors[i] }}
            >
              {s.name[0]}
            </div>
            <span className={`text-sm flex-1 ${s.isYou ? "text-[#f1f5f9] font-semibold" : "text-[#94a3b8]"}`}>
              {s.name}
            </span>
            <span className="text-sm font-bold text-[#f1f5f9] tabular-nums">{s.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
