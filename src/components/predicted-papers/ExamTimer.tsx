import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  /** Total exam duration in minutes */
  durationMinutes: number;
  /** Called when the timer reaches zero */
  onTimeUp: () => void;
  /** Whether exam mode is active */
  isActive: boolean;
  /** Called when user starts the timer */
  onStart: () => void;
}

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ExamTimer({ durationMinutes, onTimeUp, isActive, onStart }: ExamTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasCalledTimeUp = useRef(false);

  // Reset when duration changes
  useEffect(() => {
    setSecondsLeft(durationMinutes * 60);
    hasCalledTimeUp.current = false;
  }, [durationMinutes]);

  // Countdown logic
  useEffect(() => {
    if (!isActive || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (!hasCalledTimeUp.current) {
            hasCalledTimeUp.current = true;
            // Defer to avoid state update during render
            setTimeout(() => onTimeUp(), 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, paused, onTimeUp]);

  const totalSeconds = durationMinutes * 60;
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const isLow = secondsLeft <= 300; // 5 minutes
  const isCritical = secondsLeft <= 60; // 1 minute

  if (!isActive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Button
          onClick={onStart}
          size="sm"
          className="gap-2 rounded-full px-5 bg-success hover:bg-success/90 text-white font-semibold shadow-lg shadow-success/25"
        >
          <Play className="h-3.5 w-3.5" /> Start Exam Mode ({durationMinutes} min)
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "sticky top-20 z-40 flex items-center justify-between gap-4 rounded-2xl border px-5 py-3 backdrop-blur-xl transition-colors duration-500",
        isCritical
          ? "border-destructive/50 bg-destructive/10"
          : isLow
          ? "border-warning/50 bg-warning/10"
          : "border-primary/30 bg-card/90"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "h-9 w-9 rounded-xl flex items-center justify-center",
          isCritical ? "bg-destructive/20" : isLow ? "bg-warning/20" : "bg-primary/15"
        )}>
          {isCritical ? (
            <AlertTriangle className="h-4.5 w-4.5 text-destructive animate-pulse" />
          ) : (
            <Clock className={cn("h-4.5 w-4.5", isLow ? "text-warning" : "text-primary")} />
          )}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
            {isCritical ? "Time almost up!" : isLow ? "Hurry up!" : "Exam Mode"}
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={secondsLeft}
              initial={{ opacity: 0.5, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "text-xl font-bold font-mono tabular-nums tracking-tight",
                isCritical ? "text-destructive" : isLow ? "text-warning" : "text-foreground"
              )}
            >
              {formatTime(secondsLeft)}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex-1 max-w-xs hidden sm:block">
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <motion.div
            className={cn(
              "h-full rounded-full transition-colors duration-500",
              isCritical ? "bg-destructive" : isLow ? "bg-warning" : "bg-primary"
            )}
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPaused((p) => !p)}
          className="gap-1.5 text-xs rounded-full"
        >
          {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          {paused ? "Resume" : "Pause"}
        </Button>
      </div>
    </motion.div>
  );
}
