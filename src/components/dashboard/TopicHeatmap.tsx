import { motion } from "framer-motion";

interface TopicItem {
  name: string;
  mastery: number;
}

interface Props {
  topics: TopicItem[];
}

function getCellColor(mastery: number) {
  if (mastery >= 80) return "#a855f7";
  if (mastery >= 50) return "#6366f1";
  return "#2a2a4a";
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
    <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
      <h3 className="text-[#f1f5f9] font-semibold text-sm mb-4">Topic Mastery</h3>
      <div className="grid grid-cols-4 gap-2">
        {topics.map((t, i) => {
          const isWeak = t.mastery > 0 && t.mastery < 45;
          const color = getCellColor(t.mastery);
          return (
            <motion.div
              key={t.name}
              custom={i}
              variants={cellVariants}
              initial="hidden"
              animate="show"
              whileHover={{
                scale: 1.08,
                boxShadow: t.mastery >= 50
                  ? `0 0 16px 4px ${color}44`
                  : "none",
                transition: { duration: 0.2 },
              }}
              className={`rounded-xl p-2.5 flex flex-col items-center justify-center text-center cursor-default ${
                isWeak ? "animate-pulse" : ""
              }`}
              style={{
                backgroundColor: color + "22",
                border: `1px solid ${color}44`,
                boxShadow: t.mastery >= 80 ? `0 0 12px rgba(168,85,247,0.25)` : "none",
              }}
            >
              <span className="text-[10px] text-[#94a3b8] leading-tight line-clamp-2">{t.name}</span>
              <span className="text-xs font-bold mt-1" style={{ color }}>
                {t.mastery}%
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
