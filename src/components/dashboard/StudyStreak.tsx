import { motion } from "framer-motion";

interface Props {
  streak: number;
  weeklyDays: { day: string; done: boolean; isToday: boolean }[];
}

export default function StudyStreak({ streak, weeklyDays }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-foreground font-bold text-lg leading-tight font-mono">{streak}</p>
          <p className="text-muted-foreground text-xs">Day Streak</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        {weeklyDays.map((d, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                d.done ? "bg-primary text-primary-foreground" : "bg-popover text-muted-foreground"
              } ${d.isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""}`}
            >
              {d.done ? "✓" : ""}
            </div>
            <span className={`text-[10px] ${d.isToday ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              {d.day}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
