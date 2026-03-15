import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const mockData = [
  { session: "Feb 10", score: 55 },
  { session: "Feb 18", score: 58 },
  { session: "Feb 25", score: 64 },
  { session: "Mar 2", score: 68 },
  { session: "Mar 8", score: 72 },
  { session: "Mar 14", score: 78 },
];

export default function GradeTrendChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-foreground font-semibold text-sm mb-4">Predicted Grade Trend</h3>
      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <XAxis
              dataKey="session"
              tick={{ fill: "hsl(215,16%,65%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[40, 100]}
              tick={{ fill: "hsl(215,16%,65%)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(228,30%,12%)",
                border: "1px solid hsl(228,36%,18%)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(210,40%,96%)",
              }}
              labelStyle={{ color: "hsl(215,16%,65%)" }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(236,100%,65%)"
              strokeWidth={2.5}
              dot={{ fill: "hsl(236,100%,65%)", r: 4, strokeWidth: 0 }}
              activeDot={{
                r: 6,
                fill: "hsl(236,100%,65%)",
                stroke: "hsl(236,100%,65%)",
                strokeWidth: 2,
                filter: "drop-shadow(0 0 6px rgba(79,86,255,0.5))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
