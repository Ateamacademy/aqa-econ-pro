import { motion } from "framer-motion";
import type { Insights } from "@/hooks/useGradeInsights";
import { Sparkles, Heart, Target, ListChecks } from "lucide-react";

interface Props {
  insights: Insights | undefined;
  loading: boolean;
}

const SECTIONS = [
  { key: "summary", label: "Performance summary", icon: Sparkles },
  { key: "reassurance", label: "Reassurance", icon: Heart },
  { key: "strategy", label: "Paper 3 strategy", icon: Target },
] as const;

export function AIInsightFeed({ insights, loading }: Props) {
  if (loading && !insights) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-1/3 bg-popover rounded" />
          <div className="h-3 w-full bg-popover rounded" />
          <div className="h-3 w-5/6 bg-popover rounded" />
        </div>
      </div>
    );
  }
  if (!insights) return null;

  return (
    <div className="space-y-3">
      {SECTIONS.map(({ key, label, icon: Icon }, i) => {
        const text = (insights as any)[key] as string;
        if (!text) return null;
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</h4>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{text}</p>
          </motion.div>
        );
      })}
      {insights.priorities?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="rounded-2xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revision priorities</h4>
          </div>
          <ul className="space-y-2">
            {insights.priorities.map((p, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-foreground">
                <span className="font-mono text-primary text-xs mt-0.5">{idx + 1}.</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
