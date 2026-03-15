import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, CartesianGrid } from "recharts";
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

const GRADE_BOUNDARIES = [
  { score: 80, grade: "A*" },
  { score: 70, grade: "A" },
  { score: 60, grade: "B" },
  { score: 50, grade: "C" },
  { score: 40, grade: "D" },
];

export default function GradeTrendChart({ sessions, subject }: Props) {
  const chartData = useMemo(() => {
    const scored = sessions
      .filter(s => s.subject === subject && s.score_percent !== null)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    if (scored.length === 0) return [];

    // Group by date and compute rolling average
    const byDate: Record<string, number[]> = {};
    scored.forEach(s => {
      const date = s.created_at.slice(0, 10);
      if (!byDate[date]) byDate[date] = [];
      byDate[date].push(s.score_percent!);
    });

    const dates = Object.keys(byDate).sort();
    let cumulativeScores: number[] = [];

    return dates.map(date => {
      const dayScores = byDate[date];
      cumulativeScores = [...cumulativeScores, ...dayScores];
      const avg = Math.round(cumulativeScores.reduce((a, b) => a + b, 0) / cumulativeScores.length);
      const dayAvg = Math.round(dayScores.reduce((a, b) => a + b, 0) / dayScores.length);

      return {
        date: new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        score: dayAvg,
        avg,
        grade: getGrade(avg),
      };
    });
  }, [sessions, subject]);

  if (chartData.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4">Grade Trend</h3>
        <div className="h-[180px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Complete some sessions to see your grade trend</p>
        </div>
      </div>
    );
  }

  const latestAvg = chartData[chartData.length - 1]?.avg ?? 0;
  const firstAvg = chartData[0]?.avg ?? 0;
  const improvement = latestAvg - firstAvg;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-semibold text-sm">Grade Trend</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono text-primary">{getGrade(latestAvg)}</span>
          {improvement !== 0 && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              improvement > 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            }`}>
              {improvement > 0 ? "↑" : "↓"} {Math.abs(improvement)}%
            </span>
          )}
        </div>
      </div>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
            <defs>
              <linearGradient id="gradeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(236,100%,65%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(236,100%,65%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(228,36%,18%)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "hsl(215,16%,65%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[20, 100]}
              ticks={[40, 50, 60, 70, 80]}
              tick={{ fill: "hsl(215,16%,65%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            {/* Grade boundary lines */}
            {GRADE_BOUNDARIES.map(b => (
              <ReferenceLine
                key={b.grade}
                y={b.score}
                stroke="hsl(228,36%,22%)"
                strokeDasharray="4 4"
                label={{
                  value: b.grade,
                  position: "right",
                  fill: "hsl(215,16%,50%)",
                  fontSize: 9,
                }}
              />
            ))}
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(228,30%,12%)",
                border: "1px solid hsl(228,36%,18%)",
                borderRadius: "10px",
                fontSize: "12px",
                color: "hsl(210,40%,96%)",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "hsl(215,16%,65%)", fontSize: 10, marginBottom: 4 }}
              formatter={(value: number, name: string) => {
                if (name === "avg") return [`${value}% (${getGrade(value)})`, "Running Avg"];
                return [`${value}%`, "Session Score"];
              }}
            />
            <Area
              type="monotone"
              dataKey="avg"
              stroke="hsl(236,100%,65%)"
              strokeWidth={2.5}
              fill="url(#gradeFill)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "hsl(236,100%,65%)",
                stroke: "hsl(228,38%,9%)",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(188,95%,43%)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              dot={{
                r: 3,
                fill: "hsl(188,95%,43%)",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 5,
                fill: "hsl(188,95%,43%)",
                stroke: "hsl(228,38%,9%)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full bg-primary" />
          Running Average
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full bg-cyan-pop" style={{ background: "hsl(188,95%,43%)" }} />
          Session Score
        </div>
      </div>
    </div>
  );
}
