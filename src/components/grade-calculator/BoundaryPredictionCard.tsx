import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { TrendingDown, Database } from "lucide-react";
import {
  AQA_A_LEVEL_HISTORY,
  AQA_A_LEVEL_PREDICTION,
  AQA_GCSE_HISTORY,
  AQA_GCSE_PREDICTION,
  EDEXCEL_A_LEVEL_HISTORY,
  EDEXCEL_A_LEVEL_PREDICTION,
  EDEXCEL_B_A_LEVEL_HISTORY,
  EDEXCEL_B_A_LEVEL_PREDICTION,
  OCR_A_LEVEL_HISTORY,
  OCR_A_LEVEL_PREDICTION,
} from "@/lib/gradeCalculator/historicalBoundaries";
import type { ExamBoard, Qualification } from "@/lib/gradeCalculator/types";

interface Props {
  qualification: Qualification;
  board: ExamBoard;
  edexcelVariant?: "A" | "B";
}

const GRADE_COLORS: Record<string, string> = {
  "A*": "hsl(var(--primary))",
  A: "#60a5fa",
  B: "#34d399",
  C: "#fbbf24",
  D: "#fb923c",
  E: "#f87171",
  "9": "hsl(var(--primary))",
  "8": "#60a5fa",
  "7": "#34d399",
  "6": "#a3e635",
  "5": "#fbbf24",
  "4": "#fb923c",
  "3": "#f87171",
  "2": "#ef4444",
  "1": "#dc2626",
};

interface Dataset {
  label: string;
  grades: string[];
  history: { year: number; max: number; boundaries: Record<string, number> }[];
  prediction: { max: number; predicted: Record<string, number>; stdDev: Record<string, number>; yearsUsed: number[]; method: string };
}

const A_LEVEL_GRADES = ["A*", "A", "B", "C", "D", "E"];
const GCSE_GRADES_DESC = ["9", "8", "7", "6", "5", "4", "3", "2", "1"];

function datasetFor(qualification: Qualification, board: ExamBoard, variant: "A" | "B"): Dataset | Dataset[] | null {
  if (qualification === "A-Level") {
    if (board === "AQA") {
      return { label: "AQA A-Level Economics (7136)", grades: A_LEVEL_GRADES, history: AQA_A_LEVEL_HISTORY, prediction: AQA_A_LEVEL_PREDICTION };
    }
    if (board === "Edexcel") {
      return variant === "B"
        ? { label: "Edexcel B A-Level Economics (9EB0)", grades: A_LEVEL_GRADES, history: EDEXCEL_B_A_LEVEL_HISTORY, prediction: EDEXCEL_B_A_LEVEL_PREDICTION }
        : { label: "Edexcel A A-Level Economics (9EC0)", grades: A_LEVEL_GRADES, history: EDEXCEL_A_LEVEL_HISTORY, prediction: EDEXCEL_A_LEVEL_PREDICTION };
    }
    if (board === "OCR") {
      return { label: "OCR A-Level Economics (H460)", grades: A_LEVEL_GRADES, history: OCR_A_LEVEL_HISTORY, prediction: OCR_A_LEVEL_PREDICTION };
    }
    return null;
  }
  // GCSE
  if (board === "AQA") {
    return { label: "AQA GCSE Economics (8136)", grades: GCSE_GRADES_DESC, history: AQA_GCSE_HISTORY, prediction: AQA_GCSE_PREDICTION };
  }
  return null;
}

function PredictionPanel({ ds }: { ds: Dataset }) {
  const pred = ds.prediction;
  const chartData = ds.history
    .map((r) => ({ year: r.year, ...r.boundaries }))
    .concat([
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
      <div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingDown className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Predicted 2026 Grade Boundaries — {ds.label}</h3>
        </div>
        <p className="text-[11px] text-muted-foreground max-w-xl">
          Built from {pred.yearsUsed.length} published series
          ({pred.yearsUsed[0]}–{pred.yearsUsed[pred.yearsUsed.length - 1]}). {pred.method}
        </p>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {(["A*", "A", "B", "C", "D", "E"] as const).map((g) => (
          <div key={g} className="rounded-lg border border-border bg-background/60 p-2.5 text-center">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{g}</div>
            <div className="text-base font-mono font-semibold text-foreground">{pred.predicted[g]}</div>
            <div className="text-[10px] text-muted-foreground font-mono">±{pred.stdDev[g].toFixed(1)}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-muted-foreground -mt-2">
        All marks out of {pred.max}. ± figures are ±1σ historical variance.
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} stroke="hsl(var(--border))" />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} stroke="hsl(var(--border))" domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            {(["A*", "A", "B", "C", "D", "E"] as const).map((g) => (
              <Line key={g} type="monotone" dataKey={g} stroke={GRADE_COLORS[g]} strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-muted-foreground italic border-t border-border pt-3">
        Source: published exam-board grade boundary archive. These are{" "}
        <span className="text-foreground font-medium">predictions, not guarantees</span>; actual 2026
        boundaries are set by the board after results.
      </div>
    </motion.div>
  );
}

export default function BoundaryPredictionCard({ qualification, board, edexcelVariant = "A" }: Props) {
  const ds = datasetFor(qualification, board, edexcelVariant);

  if (!ds) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Boundary Prediction</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Historical boundary prediction is currently available for AQA and Edexcel A-Level Economics.
          {" "}{board} {qualification} will use the most recent published boundary set until its
          historical archive is wired in.
        </p>
      </div>
    );
  }

  const datasets = Array.isArray(ds) ? ds : [ds];
  return (
    <div className="space-y-4">
      {datasets.map((d) => (
        <PredictionPanel key={d.label} ds={d} />
      ))}
    </div>
  );
}
