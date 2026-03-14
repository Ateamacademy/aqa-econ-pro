const stages = [
  { label: "Base Camp", x: 40 },
  { label: "Early Ascent", x: 200 },
  { label: "Momentum Zone", x: 400 },
  { label: "Summit Approach", x: 600 },
  { label: "Peak Mastery", x: 800 },
];

const activeIndex = 3; // Summit Approach

export default function MountainTracker() {
  return (
    <div className="w-full overflow-x-auto py-4">
      <svg viewBox="0 0 860 120" className="w-full min-w-[600px]" preserveAspectRatio="xMidYMid meet">
        {/* Mountain path */}
        <path
          d="M 40 90 Q 120 30 200 70 Q 300 20 400 60 Q 500 10 600 50 Q 700 5 800 30"
          fill="none"
          stroke="#2a2a4a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Completed path */}
        <path
          d="M 40 90 Q 120 30 200 70 Q 300 20 400 60 Q 500 10 600 50"
          fill="none"
          stroke="url(#mountainGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Waypoints */}
        {stages.map((s, i) => {
          const yMap = [90, 70, 60, 50, 30];
          const y = yMap[i];
          const completed = i <= activeIndex;
          const isCurrent = i === activeIndex;
          return (
            <g key={s.label}>
              {/* Pulse for current */}
              {isCurrent && (
                <circle cx={s.x} cy={y} r="12" fill="#a855f7" opacity="0.3">
                  <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={s.x}
                cy={y}
                r="6"
                fill={completed ? (isCurrent ? "#a855f7" : "#6366f1") : "#2a2a4a"}
                stroke={completed ? "#a855f7" : "#3a3a5a"}
                strokeWidth="2"
              />
              {isCurrent && (
                <circle cx={s.x} cy={y} r="3" fill="#f1f5f9" />
              )}
              <text
                x={s.x}
                y={y + 22}
                textAnchor="middle"
                className="text-[9px]"
                fill={completed ? "#f1f5f9" : "#64748b"}
                fontWeight={isCurrent ? "600" : "400"}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
