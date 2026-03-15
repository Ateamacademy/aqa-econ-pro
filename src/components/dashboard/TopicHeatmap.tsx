import { motion } from "framer-motion";

interface TopicItem {
  name: string;
  mastery: number;
}

interface Props {
  topics: TopicItem[];
}

const cellVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.03, duration: 0.3, ease: [0, 0, 0.2, 1] as const },
  }),
};

export default function TopicHeatmap({ topics }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-foreground font-semibold text-sm mb-4">Topic Mastery</h3>
      <div className="grid grid-cols-4 gap-2">
        {topics.map((t, i) => {
          const isWeak = t.mastery > 0 && t.mastery < 45;
          const intensity = t.mastery / 100;
          return (
            <motion.div
              key={t.name}
              custom={i}
              variants={cellVariants}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
              className={`rounded-xl p-2.5 flex flex-col items-center justify-center text-center cursor-default ${
                isWeak ? "animate-cell-pulse" : ""
              }`}
              style={{
                backgroundColor: `hsl(var(--primary) / ${intensity * 0.5 + 0.05})`,
                border: `1px solid hsl(var(--primary) / ${intensity * 0.3 + 0.1})`,
                boxShadow: t.mastery >= 80 ? `0 0 12px hsl(var(--primary) / 0.25)` : "none",
              }}
            >
              <span className="text-[10px] text-muted-foreground leading-tight line-clamp-2">{t.name}</span>
              <span className="text-xs font-bold font-mono mt-1" style={{ color: t.mastery >= 50 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>
                {t.mastery}%
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
