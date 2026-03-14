const topics = [
  { name: "Supply & Demand", mastery: 92 },
  { name: "Elasticity", mastery: 85 },
  { name: "Market Failure", mastery: 78 },
  { name: "Externalities", mastery: 70 },
  { name: "Gov Intervention", mastery: 65 },
  { name: "Labour Markets", mastery: 45 },
  { name: "Monetary Policy", mastery: 88 },
  { name: "Fiscal Policy", mastery: 72 },
  { name: "International Trade", mastery: 55 },
  { name: "Development Econ", mastery: 38 },
  { name: "Competition", mastery: 80 },
  { name: "Business Objectives", mastery: 60 },
  { name: "Macro Objectives", mastery: 75 },
  { name: "Inflation", mastery: 82 },
  { name: "Exchange Rates", mastery: 42 },
  { name: "Growth", mastery: 68 },
];

function getCellColor(mastery: number) {
  if (mastery >= 80) return "#a855f7";
  if (mastery >= 50) return "#6366f1";
  return "#2a2a4a";
}

function getCellGlow(mastery: number) {
  if (mastery >= 80) return "0 0 12px rgba(168,85,247,0.3)";
  return "none";
}

export default function TopicHeatmap() {
  return (
    <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
      <h3 className="text-[#f1f5f9] font-semibold text-sm mb-4">Topic Mastery</h3>
      <div className="grid grid-cols-4 gap-2">
        {topics.map((t) => {
          const isWeak = t.mastery < 45;
          return (
            <div
              key={t.name}
              className={`rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-all hover:scale-105 cursor-default ${
                isWeak ? "animate-pulse" : ""
              }`}
              style={{
                backgroundColor: getCellColor(t.mastery) + "22",
                border: `1px solid ${getCellColor(t.mastery)}44`,
                boxShadow: getCellGlow(t.mastery),
              }}
            >
              <span className="text-[10px] text-[#94a3b8] leading-tight line-clamp-2">{t.name}</span>
              <span
                className="text-xs font-bold mt-1"
                style={{ color: getCellColor(t.mastery) }}
              >
                {t.mastery}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
