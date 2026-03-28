import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from "recharts";
import type { SessionRow } from "@/hooks/useReadinessScore";

interface Props {
  sessions: SessionRow[];
  subject: string;
}

export default function PerformanceOverTime({ sessions, subject }: Props) {
  const chartData = useMemo(() => {
    const scored = sessions
      .filter(s => s.subject === subject && s.score_percent !== null)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    if (scored.length === 0) return [];

    // Group into weekly buckets
    const now = new Date();
    const weeks: Record<string, number[]> = {};

    scored.forEach(s => {
      const date = new Date(s.created_at);
      const weeksAgo = Math.floor((now.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const weekLabel = weeksAgo === 0 ? "This Week"
        : weeksAgo === 1 ? "Last Week"
        : `${weeksAgo}w ago`;
      if (!weeks[weekLabel]) weeks[weekLabel] = [];
      weeks[weekLabel].push(s.score_percent!);
    });

    // Take last 8 weeks
    const entries = Object.entries(weeks).slice(-8);

    return entries.map(([week, scores]) => ({
      week,
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      count: scores.length,
    }));
  }, [sessions, subject]);

  if (chartData.length < 2) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-foreground font-semibold text-sm mb-4">Weekly Performance</h3>
        <div className="h-[160px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Need at least 2 weeks of data</p>
        </div>
      </div>
    );
  }

  const latest = chartData[chartData.length - 1]?.avg ?? 0;
  const previous = chartData[chartData.length - 2]?.avg ?? 0;
  const change = latest - previous;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-semibold text-sm">Weekly Performance</h3>
        {change !== 0 && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            change > 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
          }`}>
            {change > 0 ? "↑" : "↓"} {Math.abs(change)}% vs last week
          </span>
        )}
      </div>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
            <CartesianGrid stroke="hsl(228,36%,18%)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="week"
              tick={<SmartXAxisTick fill="hsl(215,16%,65%)" fontSize={10} />}
              axisLine={false}
              tickLine={false}
              height={chartData.some(d => d.week.length > 12) ? 60 : 30}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[25, 50, 75, 100]}
              tick={{ fill: "hsl(215,16%,65%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(228,30%,12%)",
                border: "1px solid hsl(228,36%,18%)",
                borderRadius: "10px",
                fontSize: "12px",
                color: "hsl(210,40%,96%)",
                padding: "8px 12px",
              }}
              formatter={(value: number) => [`${value}%`, "Avg Score"]}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="avg" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.avg >= 70 ? "hsl(236,100%,65%)"
                    : entry.avg >= 50 ? "hsl(188,95%,43%)"
                    : "hsl(38,92%,50%)"
                  }
                  fillOpacity={index === chartData.length - 1 ? 1 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
