import { useMemo } from "react";
import { motion } from "framer-motion";
import type { SessionRow } from "@/hooks/useReadinessScore";

interface Props {
  sessions: SessionRow[];
  subject: string;
}

function getGrade(score: number): string {
  if (score >= 80) return "A*";
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";
  return "E";
}

export default function StrengthWeakness({ sessions, subject }: Props) {
  const analysis = useMemo(() => {
    const topicScores: Record<string, { total: number; count: number }> = {};
    sessions
      .filter(s => s.subject === subject && s.score_percent !== null)
      .forEach(s => {
        if (!topicScores[s.topic]) topicScores[s.topic] = { total: 0, count: 0 };
        topicScores[s.topic].total += s.score_percent!;
        topicScores[s.topic].count++;
      });

    const topics = Object.entries(topicScores)
      .map(([name, data]) => ({
        name,
        avg: Math.round(data.total / data.count),
        count: data.count,
      }))
      .sort((a, b) => b.avg - a.avg);

    const strengths = topics.filter(t => t.avg >= 70).slice(0, 3);
    const weaknesses = topics.filter(t => t.avg < 60).sort((a, b) => a.avg - b.avg).slice(0, 3);

    return { strengths, weaknesses };
  }, [sessions, subject]);

  if (analysis.strengths.length === 0 && analysis.weaknesses.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-foreground font-semibold text-sm mb-4">Strengths & Weaknesses</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Strengths */}
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-success mb-3">
            💪 Strengths
          </p>
          <div className="space-y-2">
            {analysis.strengths.length === 0 ? (
              <p className="text-xs text-muted-foreground">Keep practising to find your strengths</p>
            ) : (
              analysis.strengths.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{t.name}</p>
                    <div className="h-1.5 rounded-full bg-border mt-1 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-success"
                        initial={{ width: 0 }}
                        animate={{ width: `${t.avg}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-success shrink-0">{t.avg}%</span>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Weaknesses */}
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-warning mb-3">
            🎯 Focus Areas
          </p>
          <div className="space-y-2">
            {analysis.weaknesses.length === 0 ? (
              <p className="text-xs text-muted-foreground">No weak areas yet — great work!</p>
            ) : (
              analysis.weaknesses.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{t.name}</p>
                    <div className="h-1.5 rounded-full bg-border mt-1 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-warning"
                        initial={{ width: 0 }}
                        animate={{ width: `${t.avg}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-warning shrink-0">{t.avg}%</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
