import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface Props {
  score: number;
}

const GRADES = ["E", "D", "C", "B", "A", "A*"] as const;

function predictedGrade(score: number): string {
  if (score >= 80) return "A*";
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";
  return "E";
}

function gradeIndex(grade: string): number {
  return GRADES.indexOf(grade as any);
}

function gradeColor(grade: string, isActive: boolean, isPassed: boolean) {
  if (isActive) {
    const map: Record<string, string> = {
      "E": "from-destructive/80 to-destructive",
      "D": "from-warning/80 to-warning",
      "C": "from-warning to-yellow-400",
      "B": "from-cyan-pop/80 to-cyan-400",
      "A": "from-primary/80 to-primary",
      "A*": "from-primary to-indigo-400",
    };
    return map[grade] || "from-primary to-primary";
  }
  if (isPassed) return "from-primary/30 to-primary/20";
  return "";
}

export default function PredictedGrade({ score }: Props) {
  const grade = predictedGrade(score);
  const activeIdx = gradeIndex(grade);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const gradeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedGrade, setAnimatedGrade] = useState("E");
  const [showGlow, setShowGlow] = useState(false);

  // Animate grade-by-grade reveal
  useEffect(() => {
    const targetIdx = activeIdx;
    let current = 0;

    // Reset
    setAnimatedGrade("E");
    setShowGlow(false);

    const interval = setInterval(() => {
      if (current <= targetIdx) {
        setAnimatedGrade(GRADES[current]);

        // GSAP pop animation on each grade block
        const el = gradeRefs.current[current];
        if (el) {
          gsap.fromTo(el,
            { scale: 0.7, opacity: 0.3 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
            }
          );
        }

        current++;
      } else {
        clearInterval(interval);
        setShowGlow(true);

        // Final glow pulse on active grade
        const activeEl = gradeRefs.current[targetIdx];
        if (activeEl) {
          gsap.to(activeEl, {
            boxShadow: "0 0 24px hsl(var(--primary) / 0.6)",
            duration: 0.6,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          });
        }

        // Progress bar animation
        if (progressRef.current) {
          gsap.fromTo(progressRef.current,
            { width: "0%" },
            {
              width: `${((targetIdx + 1) / GRADES.length) * 100}%`,
              duration: 1.2,
              ease: "power3.out",
              delay: 0.2,
            }
          );
        }
      }
    }, 280);

    return () => clearInterval(interval);
  }, [activeIdx]);

  const animatedIdx = gradeIndex(animatedGrade);

  return (
    <div ref={containerRef} className="rounded-2xl border border-border bg-card p-5 overflow-hidden relative">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Predicted Grade</h3>
        <AnimatePresence mode="wait">
          <motion.span
            key={grade}
            initial={{ opacity: 0, y: -12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-3xl font-bold font-mono text-primary"
          >
            {grade}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Grade blocks */}
      <div className="relative">
        {/* Background track */}
        <div className="flex gap-1.5 relative z-10">
          {GRADES.map((g, i) => {
            const isPassed = i < animatedIdx;
            const isActive = i === animatedIdx;
            const isReached = i <= animatedIdx;

            return (
              <div
                key={g}
                ref={(el) => { gradeRefs.current[i] = el; }}
                className="relative flex-1"
                style={{ opacity: i <= activeIdx ? undefined : 0.25 }}
              >
                {/* Grade block */}
                <motion.div
                  className={`
                    h-10 rounded-lg flex items-center justify-center relative overflow-hidden
                    border transition-colors duration-300
                    ${isReached
                      ? "border-primary/30"
                      : "border-border"
                    }
                  `}
                  style={{
                    background: isReached
                      ? `linear-gradient(135deg, hsl(var(--primary) / ${isActive ? 0.4 : 0.15}), hsl(var(--primary) / ${isActive ? 0.25 : 0.05}))`
                      : "hsl(var(--muted) / 0.3)",
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {/* Active glow effect */}
                  {isActive && showGlow && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        background: "radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)",
                      }}
                    />
                  )}

                  {/* Shimmer sweep for passed grades */}
                  {isPassed && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                      style={{
                        background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)",
                        width: "50%",
                      }}
                    />
                  )}

                  <span className={`
                    text-xs font-bold relative z-10 font-mono
                    ${isActive ? "text-primary" : isPassed ? "text-primary/70" : "text-muted-foreground/50"}
                  `}>
                    {g}
                  </span>

                  {/* Check mark for passed grades */}
                  {isPassed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0.5 right-0.5"
                    >
                      <div className="h-3 w-3 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4.5 7.5L8 3" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Grade label below */}
                <motion.p
                  className={`text-center mt-1.5 text-[9px] font-medium
                    ${isActive ? "text-primary" : "text-muted-foreground/50"}
                  `}
                  animate={{ opacity: isReached ? 1 : 0.3 }}
                >
                  {g === "E" ? "30%" : g === "D" ? "40%" : g === "C" ? "50%" : g === "B" ? "60%" : g === "A" ? "70%" : "80%"}
                </motion.p>
              </div>
            );
          })}
        </div>

        {/* Connecting progress line behind blocks */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-border z-0" />
        <div
          ref={progressRef}
          className="absolute top-5 left-0 h-[2px] z-[1]"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--primary)))",
          }}
        />
      </div>

      {/* Bottom info */}
      <motion.div
        className="flex items-center justify-between mt-4 pt-3 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-muted-foreground">
            Your average: <span className="text-foreground font-semibold">{score}%</span>
          </span>
        </div>
        {activeIdx < GRADES.length - 1 && (
          <span className="text-[10px] text-muted-foreground">
            Next: <span className="text-primary font-semibold">{GRADES[activeIdx + 1]}</span>
            {" "}at {activeIdx + 1 === 5 ? "80" : activeIdx + 1 === 4 ? "70" : activeIdx + 1 === 3 ? "60" : activeIdx + 1 === 2 ? "50" : "40"}%
          </span>
        )}
        {activeIdx === GRADES.length - 1 && (
          <span className="text-[10px] font-semibold text-primary">🎯 Top grade achieved!</span>
        )}
      </motion.div>
    </div>
  );
}
