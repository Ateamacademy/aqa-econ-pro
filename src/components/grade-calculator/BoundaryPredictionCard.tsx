import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { TrendingDown, Database } from "lucide-react";
import { AQA_A_LEVEL_HISTORY, AQA_A_LEVEL_PREDICTION } from "@/lib/gradeCalculator/historicalBoundaries";
import type { ExamBoard, Qualification } from "@/lib/gradeCalculator/types";

interface Props {
  qualification: Qualification;
  board: ExamBoard;
}

const GRADE_COLORS: Record<string, string> = {
  "A*": "hsl(var(--primary))",
  A: "#60a5fa",
  B: "#34d399",
  C: "#fbbf24",
  D: "#fb923c",
  E: "#f87171",
};

export default function BoundaryPredictionCard({ qualification, board }: Props) {
  // Only AQA A-Level has verified historical data wired in for now.
  if (qualification !== "A-Level" || board !== "AQA") {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Boundary Prediction</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Historical boundary prediction is currently available for AQA A-Level Economics (8 years of data).
          {board} {qualification} will use the most recent published boundary set until its historical
          archive is wired in.
        </p>
      </div>
    );
  }

  const pred = AQA_A_LEVEL_PREDICTION;
  const chartData = AQA_A_LEVEL_HISTORY.map((r) => ({
    year: r.year,
    ...r.boundaries,
  })).concat([
    {
      year: 2026 as number,
      "A*": pred.predicted["A*"],
      A: pred.predicted.A,
      B: pred.predicted.B,
      C: pred.predicted.C,
      D: pred.predicted.D,
      E: pred.predicted.E,
    },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-5 space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Predicted 2026 Grade Boundaries — AQA A-Level (7136)
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground max-w-xl">
            Built from {pred.yearsUsed.length} years of published AQA boundaries
            ({pred.yearsUsed[0]}–{pred.yearsUsed[pred.yearsUsed.length - 1]}). {pred.method}
          </p>
        </div>
      </div>

      {/* Predicted boundary chips */}
      <div className="grid grid-cols-6 gap-2">
        {(["A*", "A", "B", "C", "D", "E"] as const).map((g) => (
          <div
            key={g}
            className="rounded-lg border border-border bg-background/60 p-2.5 text-center"
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{g}</div>
            <div className="text-base font-mono font-semibold text-foreground">
              {pred.predicted[g]}
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              ±{pred.stdDev[g].toFixed(1)}
            </div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-muted-foreground -mt-2">
        All marks out of {pred.max}. ± figures are ±1σ historical variance.
      </div>

      {/* Trend chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis
              dataKey="year"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              stroke="hsl(var(--border))"
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              stroke="hsl(var(--border))"
              domain={[40, 210]}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 11,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            {(["A*", "A", "B", "C", "D", "E"] as const).map((g) => (
              <Line
                key={g}
                type="monotone"
                dataKey={g}
                stroke={GRADE_COLORS[g]}
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-muted-foreground italic border-t border-border pt-3">
        Source: AQA grade boundary archive (2017–2025). 2021 excluded — Teacher-Assessed Grades.
        These are <span className="text-foreground font-medium">predictions, not guarantees</span>; the
        actual 2026 boundaries are set by AQA after results.
      </div>
    </motion.div>
  );
}
