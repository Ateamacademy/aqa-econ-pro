const actions = [
  {
    icon: "📊",
    label: "Practice elasticity diagrams",
    points: 4,
    accent: "#6366f1",
  },
  {
    icon: "📝",
    label: "Complete a predicted paper",
    points: 6,
    accent: "#a855f7",
  },
  {
    icon: "✍️",
    label: "Submit an essay for grading",
    points: 3,
    accent: "#ec4899",
  },
];

export default function ActionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {actions.map((a) => (
        <div
          key={a.label}
          className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-4 flex items-start gap-3 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer group"
          style={{ borderLeftWidth: 3, borderLeftColor: a.accent }}
        >
          <span className="text-xl mt-0.5">{a.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[#f1f5f9] text-sm font-medium leading-snug">{a.label}</p>
            <span
              className="inline-block mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: a.accent + "22",
                color: a.accent,
              }}
            >
              +{a.points} pts
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
