import { motion } from "framer-motion";

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
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="waypointGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Full path (grey) */}
        <path
          d="M 40 90 Q 120 30 200 70 Q 300 20 400 60 Q 500 10 600 50 Q 700 5 800 30"
          fill="none"
          stroke="#2a2a4a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Completed path segments with animated stroke */}
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
              stroke="url(#mountainGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter={activeStage === seg.stage ? "url(#waypointGlow)" : undefined}
            />
          ) : null
        )}

        {/* Peak glow for stage 4 */}
        {activeStage >= 4 && (
          <circle cx={800} cy={30} r="20" fill="#a855f7" opacity="0.15">
            <animate attributeName="r" values="15;25;15" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Waypoints */}
        {STAGES.map((s, i) => {
          const y = Y_MAP[i];
          const completed = i <= activeStage;
          const isCurrent = i === activeStage;
          return (
            <g key={s.label}>
              {isCurrent && (
                <>
                  <circle cx={s.x} cy={y} r="14" fill="#a855f7" opacity="0.2">
                    <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={s.x} cy={y} r="8" fill="#a855f7" opacity="0.15">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.08;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              <circle
                cx={s.x}
                cy={y}
                r="6"
                fill={completed ? (isCurrent ? "#a855f7" : "#6366f1") : "#2a2a4a"}
                stroke={completed ? "#a855f7" : "#3a3a5a"}
                strokeWidth="2"
              />
              {isCurrent && <circle cx={s.x} cy={y} r="3" fill="#f1f5f9" />}
              <text
                x={s.x}
                y={y + 24}
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
