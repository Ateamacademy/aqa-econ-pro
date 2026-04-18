import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Target, Calendar } from "lucide-react";
import { STAGE_NAMES, STAGE_RANGES, type JourneyStage, type StudentDashboardState } from "@/hooks/useDashboardState";

interface Props {
  state: StudentDashboardState;
}

const STAGE_X = [40, 200, 400, 600, 800];
const STAGE_Y = [90, 70, 60, 50, 30];

const STAGE_ACTIONS: Record<JourneyStage, { label: string; href: string; points: number }[]> = {
  0: [
    { label: "Complete a 5-minute MCQ warmup", href: "/practice", points: 4 },
    { label: "Read the AQA spec overview in Study Notes", href: "/notes", points: 3 },
    { label: "Try Paper 1 Set A (or any predicted paper)", href: "/predicted", points: 8 },
  ],
  1: [
    { label: "Complete 3 short-answer practice sets", href: "/practice", points: 6 },
    { label: "Submit a diagram for marking", href: "/diagram-practice", points: 5 },
    { label: "Finish your first predicted paper end-to-end", href: "/predicted", points: 9 },
  ],
  2: [
    { label: "Complete 3 predicted papers with mark-scheme review", href: "/predicted", points: 12 },
    { label: "Work through Paper 1 topic practice for Market Failure", href: "/practice", points: 6 },
    { label: "Ask the 24/7 Tutor about three 25-mark techniques", href: "/tutor", points: 4 },
  ],
  3: [
    { label: "Complete 2 timed predicted papers in Exam Mode", href: "/predicted", points: 10 },
    { label: "Drill your weakest topic to 80%+ mastery", href: "/practice", points: 6 },
    { label: "Submit 3 essays for evaluation marking", href: "/grader", points: 7 },
  ],
  4: [
    { label: "Maintain weekly Exam Mode papers to stay sharp", href: "/predicted", points: 5 },
    { label: "Mock-mark another student's response", href: "/grader", points: 3 },
    { label: "Walk through past A* exemplars in Study Notes", href: "/notes", points: 3 },
  ],
};

const STAGE_DESCRIPTIONS: Record<JourneyStage, string> = {
  0: "You're establishing the basics. Focus on MCQ practice and short-answer questions to build fluency with the specification content.",
  1: "Foundations are forming. Start tackling longer-form questions and submit your first complete paper to calibrate where you stand.",
  2: "You're in the productive zone. Layer in predicted papers and structured mark-scheme review to convert effort into measurable score gains.",
  3: "Within striking distance of the top grades. Focus on evaluation depth, supported conclusions, and timed practice under exam conditions.",
  4: "You're operating at A*-grade. The job now is consistency — maintain practice volume and refine the weakest 10%.",
};

export default function InteractiveJourney({ state }: Props) {
  const [openStage, setOpenStage] = useState<JourneyStage>(state.readinessScore.stage);
  const markerRef = useRef<SVGGElement>(null);
  const prevStageRef = useRef<JourneyStage>(state.readinessScore.stage);

  // Animate marker when crossing stages
  useEffect(() => {
    const newStage = state.readinessScore.stage;
    if (markerRef.current && prevStageRef.current !== newStage) {
      gsap.fromTo(
        markerRef.current,
        { scale: 0.6, transformOrigin: `${STAGE_X[newStage]}px ${STAGE_Y[newStage]}px` },
        { scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      );
      prevStageRef.current = newStage;
    }
  }, [state.readinessScore.stage]);

  const range = STAGE_RANGES[openStage];

  const projectionLine = useMemo(() => {
    if (state.readinessScore.stage >= 4) return "You've reached Peak Mastery — keep practising to consolidate.";
    if (state.weeklyReadinessGain <= 0 && state.weeksAtCurrentStage >= 2) {
      return `You've been steady at ${state.readinessScore.stageName} for ${state.weeksAtCurrentStage} week${state.weeksAtCurrentStage === 1 ? "" : "s"}. Try a fresh predicted paper to start moving.`;
    }
    if (state.projectedDateForNextStage) {
      return `At your current pace, you'll reach ${STAGE_NAMES[state.readinessScore.stage + 1]} by ~${state.projectedDateForNextStage}.`;
    }
    return "Complete more sessions to see a projected ascent date.";
  }, [state]);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 mb-6">
      <div className="flex items-start justify-between mb-2 gap-3">
        <div>
          <h3 className="text-foreground font-semibold text-sm">Your Journey</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Tap a camp to see what unlocks the next stage.</p>
        </div>
        <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
          {state.readinessScore.value}% — {state.readinessScore.stageName}
        </span>
      </div>

      <div className="w-full overflow-x-auto py-2">
        <svg viewBox="0 0 860 130" className="w-full min-w-[600px]" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="ijGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--indigo-bright))" />
              <stop offset="100%" stopColor="hsl(var(--cyan-pop))" />
            </linearGradient>
          </defs>

          <path
            d="M 40 90 Q 120 30 200 70 Q 300 20 400 60 Q 500 10 600 50 Q 700 5 800 30"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 6"
          />

          {[
            { d: "M 40 90 Q 120 30 200 70", stage: 1 },
            { d: "M 200 70 Q 300 20 400 60", stage: 2 },
            { d: "M 400 60 Q 500 10 600 50", stage: 3 },
            { d: "M 600 50 Q 700 5 800 30", stage: 4 },
          ].map((seg) =>
            state.readinessScore.stage >= seg.stage ? (
              <path key={seg.stage} d={seg.d} fill="none" stroke="url(#ijGrad)" strokeWidth="3" strokeLinecap="round" />
            ) : null,
          )}

          {STAGE_NAMES.map((label, i) => {
            const stageIdx = i as JourneyStage;
            const x = STAGE_X[i];
            const y = STAGE_Y[i];
            const completed = stageIdx <= state.readinessScore.stage;
            const isCurrent = stageIdx === state.readinessScore.stage;
            const isOpen = stageIdx === openStage;
            return (
              <g
                key={label}
                role="button"
                tabIndex={0}
                onClick={() => setOpenStage(stageIdx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenStage(stageIdx);
                  }
                }}
                className="cursor-pointer focus:outline-none"
                style={{ outline: "none" }}
              >
                {/* Hit area */}
                <circle cx={x} cy={y} r="22" fill="transparent" />
                {isCurrent && (
                  <g ref={markerRef}>
                    <circle cx={x} cy={y} r="14" fill="hsl(var(--primary))" opacity="0.2">
                      <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isOpen ? 8 : 6}
                  fill={completed ? (isCurrent ? "hsl(var(--primary))" : "hsl(var(--indigo-bright))") : "hsl(var(--border))"}
                  stroke={isOpen ? "hsl(var(--primary))" : completed ? "hsl(var(--primary))" : "hsl(var(--border))"}
                  strokeWidth={isOpen ? "3" : "2"}
                  className="transition-all"
                />
                {isCurrent && <circle cx={x} cy={y} r="3" fill="hsl(var(--foreground))" />}
                <text
                  x={x}
                  y={y + 26}
                  textAnchor="middle"
                  className="text-[9px]"
                  fill={isOpen ? "hsl(var(--primary))" : completed ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                  fontWeight={isOpen || isCurrent ? "600" : "400"}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Projection line */}
      <div className="flex items-center gap-2 mt-1 mb-4">
        <Calendar className="h-3 w-3 text-muted-foreground" />
        <p className="text-[11px] text-muted-foreground italic">{projectionLine}</p>
      </div>

      {/* Stage detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={openStage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-border bg-popover/40 p-4"
        >
          <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-semibold text-foreground">{STAGE_NAMES[openStage]}</span>
              <span className="text-[10px] font-mono text-muted-foreground bg-card px-2 py-0.5 rounded-full">
                {range.min}–{range.max}%
              </span>
            </div>
            {openStage === state.readinessScore.stage && (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">You are here</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{STAGE_DESCRIPTIONS[openStage]}</p>

          <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            {openStage < 4 ? `Reach ${STAGE_NAMES[openStage + 1]} by:` : "Stay sharp by:"}
          </p>
          <ul className="space-y-1.5">
            {STAGE_ACTIONS[openStage].map((a) => (
              <li key={a.label}>
                <Link
                  to={a.href}
                  className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-card hover:bg-card/70 border border-border hover:border-primary/40 transition-all group"
                >
                  <span className="text-xs text-foreground">{a.label}</span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-success">+{a.points} pts</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
