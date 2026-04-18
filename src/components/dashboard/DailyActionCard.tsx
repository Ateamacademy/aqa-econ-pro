import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles } from "lucide-react";
import type { DailyAction, StudentDashboardState } from "@/hooks/useDashboardState";

interface Props {
  action: DailyAction;
  alternativeAction?: DailyAction;
  today: StudentDashboardState["today"];
}

export default function DailyActionCard({ action, alternativeAction, today }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const current = dismissed && alternativeAction ? alternativeAction : action;

  return (
    <div className="w-full max-w-[640px] mx-auto mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.kind + (dismissed ? "-alt" : "")}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-card to-card p-5 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3 relative">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                Today's recommended action
              </span>
            </div>
            {!dismissed && alternativeAction && (
              <button
                onClick={() => setDismissed(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Show another action"
                title="Not now — show me another"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <h3 className="text-foreground font-semibold text-base mt-3">{current.headline}</h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{current.body}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              to={current.ctaHref}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3.5 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {current.ctaLabel}
              <ArrowRight className="h-3 w-3" />
            </Link>
            <span className="text-[10px] text-muted-foreground">
              Refreshes at midnight
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Today's progress strip */}
      <div className="mt-3 flex items-center justify-between rounded-xl bg-card/60 border border-border px-4 py-2.5">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Today</span>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span>
            <span className="text-foreground font-semibold font-mono">{today.minutesStudied}</span> min studied
          </span>
          <span className="opacity-50">·</span>
          <span>
            <span className="text-foreground font-semibold font-mono">{today.sessionsCompleted}</span>{" "}
            session{today.sessionsCompleted === 1 ? "" : "s"}
          </span>
          <span className="opacity-50">·</span>
          <span>
            <span className="text-foreground font-semibold font-mono">{today.papersCompleted}</span> paper
            {today.papersCompleted === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
