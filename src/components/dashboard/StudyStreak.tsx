interface Props {
  streak: number;
  weeklyDays: { day: string; done: boolean; isToday: boolean }[];
}

export default function StudyStreak({ streak, weeklyDays }: Props) {
  return (
    <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-[#f1f5f9] font-bold text-lg leading-tight">{streak}</p>
          <p className="text-[#64748b] text-xs">day streak</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        {weeklyDays.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                d.done ? "bg-[#6366f1] text-white" : "bg-[#2a2a4a] text-[#64748b]"
              } ${d.isToday ? "ring-2 ring-[#a855f7] ring-offset-2 ring-offset-[#1a1a2e]" : ""}`}
            >
              {d.done ? "✓" : ""}
            </div>
            <span className={`text-[10px] ${d.isToday ? "text-[#f1f5f9] font-semibold" : "text-[#64748b]"}`}>
              {d.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
