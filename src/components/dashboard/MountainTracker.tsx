const STAGES = [
  { label: "Base Camp", x: 40 },
  { label: "Early Ascent", x: 200 },
  { label: "Momentum Zone", x: 400 },
  { label: "Summit Approach", x: 600 },
  { label: "Peak Mastery", x: 800 },
];

const Y_MAP = [90, 70, 60, 50, 30];

interface Props {
  activeStage: number;
}

export default function MountainTracker({ activeStage }: Props) {
  return (
    <div className="w-full overflow-x-auto py-4">
      <svg viewBox="0 0 860 130" className="w-full min-w-[600px]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="mtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--indigo-bright))" />
            <stop offset="100%" stopColor="hsl(var(--cyan-pop))" />
          </linearGradient>
          <filter id="wpGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Full path (muted) */}
        <path
          d="M 40 90 Q 120 30 200 70 Q 300 20 400 60 Q 500 10 600 50 Q 700 5 800 30"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 6"
        />

        {/* Completed segments */}
        {[
          { d: "M 40 90 Q 120 30 200 70", stage: 1 },
          { d: "M 200 70 Q 300 20 400 60", stage: 2 },
          { d: "M 400 60 Q 500 10 600 50", stage: 3 },
          { d: "M 600 50 Q 700 5 800 30", stage: 4 },
        ].map((seg) =>
          activeStage >= seg.stage ? (
            <path
              key={seg.stage}
              d={seg.d}
              fill="none"
              stroke="url(#mtGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ) : null
        )}

        {/* Waypoints */}
        {STAGES.map((s, i) => {
          const y = Y_MAP[i];
          const completed = i <= activeStage;
          const isCurrent = i === activeStage;
          return (
            <g key={s.label}>
              {isCurrent && (
                <circle cx={s.x} cy={y} r="14" fill="hsl(var(--primary))" opacity="0.2">
                  <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={s.x}
                cy={y}
                r="6"
                fill={completed ? (isCurrent ? "hsl(var(--primary))" : "hsl(var(--indigo-bright))") : "hsl(var(--border))"}
                stroke={completed ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="2"
              />
              {isCurrent && <circle cx={s.x} cy={y} r="3" fill="hsl(var(--foreground))" />}
              <text
                x={s.x}
                y={y + 24}
                textAnchor="middle"
                className="text-[9px]"
                fill={completed ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
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
