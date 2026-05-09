import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { PRO_RATA_BOUNDARIES_PER_PAPER, type StudentDashboardState } from "@/hooks/useDashboardState";

interface Props {
  state: StudentDashboardState;
}

const BOUNDARY_LINES = [
  { mark: PRO_RATA_BOUNDARIES_PER_PAPER["A*"], label: "A*" },
  { mark: PRO_RATA_BOUNDARIES_PER_PAPER.A, label: "A" },
  { mark: PRO_RATA_BOUNDARIES_PER_PAPER.B, label: "B" },
  { mark: PRO_RATA_BOUNDARIES_PER_PAPER.C, label: "C" },
  { mark: PRO_RATA_BOUNDARIES_PER_PAPER.D, label: "D" },
  { mark: PRO_RATA_BOUNDARIES_PER_PAPER.E, label: "E" },
];

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export default function GradeTrendPanel({ state }: Props) {
  const navigate = useNavigate();
  const data = state.paperAttempts.map((p) => ({
    ...p,
    dateLabel: fmt(p.date),
  }));

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-foreground font-semibold text-sm">Grade Trend</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Last {data.length || 10} predicted-paper attempts</p>
        </div>
        {data.length > 0 && (
          <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded-full">
            Avg {Math.round(data.reduce((a, p) => a + p.marksAwarded, 0) / data.length)}/80
          </span>
        )}
      </div>

      {data.length === 0 ? (
        <div className="h-[220px] flex flex-col items-center justify-center text-center px-6">
          <p className="text-sm text-muted-foreground mb-1">No paper attempts yet</p>
          <p className="text-[11px] text-muted-foreground/70">
            Complete your first predicted paper to see your grade trend appear here.
          </p>
        </div>
      ) : (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 24, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="gradeTrendStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--indigo-bright))" />
                  <stop offset="100%" stopColor="hsl(var(--cyan-pop))" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="dateLabel" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 80]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
              {BOUNDARY_LINES.map((b) => (
                <ReferenceLine
                  key={b.label}
                  y={b.mark}
                  stroke="hsl(var(--border))"
                  strokeDasharray="4 4"
                  label={{ value: b.label, position: "right", fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                />
              ))}
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11, color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [`${value}/80`, "Mark"]}
              />
              <Line
                type="monotone"
                dataKey="marksAwarded"
                stroke="url(#gradeTrendStroke)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "hsl(var(--primary))", stroke: "hsl(var(--card))", strokeWidth: 2, cursor: "pointer" }}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--card))",
                  strokeWidth: 2,
                  cursor: "pointer",
                  onClick: (_: unknown, payload: any) => {
                    if (payload?.payload?.id) navigate(`/predicted`);
                  },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground mt-3 italic leading-relaxed">
        Boundaries shown are per-paper pro-rata from Summer 2024 full-qualification boundaries (A* 189, A 161, B 134,
        C 107, D 81, E 55 · out of 240). Indicative only.
      </p>
    </div>
  );
}
