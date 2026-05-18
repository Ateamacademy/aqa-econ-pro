import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2, Users, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Line,
  ComposedChart,
} from "recharts";

type Difficulty = "easy" | "medium" | "hard" | "very_hard";

interface Props {
  examBoard: string;
  qualification: string;
  paperLabel?: string;
  predictedGrade?: string | null;
}

const DIFFICULTIES: { value: Difficulty; label: string; emoji: string }[] = [
  { value: "easy", label: "Easy", emoji: "😌" },
  { value: "medium", label: "Medium", emoji: "🙂" },
  { value: "hard", label: "Hard", emoji: "😬" },
  { value: "very_hard", label: "Very Hard", emoji: "😭" },
];

const GRADE_ORDER_A = ["A*", "A", "B", "C", "D", "E", "U"];
const GRADE_ORDER_GCSE = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "U"];

export default function PaperFeedbackBellCurve({
  examBoard,
  qualification,
  paperLabel = "overall",
  predictedGrade,
}: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<{ difficulty: string; predicted_grade: string | null }[]>([]);

  const isGCSE = qualification.toLowerCase().includes("gcse");
  const gradeOrder = isGCSE ? GRADE_ORDER_GCSE : GRADE_ORDER_A;

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("paper_feedback")
      .select("difficulty, predicted_grade")
      .eq("exam_board", examBoard)
      .eq("qualification", qualification)
      .eq("paper_label", paperLabel)
      .limit(5000);
    if (error) {
      console.error("[feedback] fetch", error);
    } else {
      setRows(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [examBoard, qualification, paperLabel]);

  const submit = async () => {
    if (!difficulty) return;
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("paper_feedback").insert({
      user_id: user?.id ?? null,
      exam_board: examBoard,
      qualification,
      paper_label: paperLabel,
      difficulty,
      predicted_grade: predictedGrade ?? null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit feedback");
      return;
    }
    setSubmitted(true);
    toast.success("Thanks — your feedback is included in the curve");
    fetchData();
  };

  const { difficultyDist, gradeDist, total } = useMemo(() => {
    const dCounts: Record<string, number> = { easy: 0, medium: 0, hard: 0, very_hard: 0 };
    const gCounts: Record<string, number> = {};
    gradeOrder.forEach((g) => (gCounts[g] = 0));
    rows.forEach((r) => {
      dCounts[r.difficulty] = (dCounts[r.difficulty] || 0) + 1;
      if (r.predicted_grade && gCounts[r.predicted_grade] !== undefined) {
        gCounts[r.predicted_grade] += 1;
      }
    });
    return {
      difficultyDist: DIFFICULTIES.map((d) => ({
        name: d.label,
        emoji: d.emoji,
        count: dCounts[d.value] || 0,
      })),
      gradeDist: gradeOrder.map((g) => ({ grade: g, count: gCounts[g] || 0 })),
      total: rows.length,
    };
  }, [rows, gradeOrder]);

  // Build a smoothed bell curve overlay from grade counts
  const bellData = useMemo(() => {
    if (total === 0) return gradeDist.map((g) => ({ ...g, curve: 0 }));
    const counts = gradeDist.map((g) => g.count);
    const smoothed = counts.map((_, i) => {
      const prev = counts[i - 1] ?? counts[i];
      const next = counts[i + 1] ?? counts[i];
      return (prev + counts[i] * 2 + next) / 4;
    });
    return gradeDist.map((g, i) => ({ ...g, curve: smoothed[i] }));
  }, [gradeDist, total]);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/60">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            How was the paper?
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Tell us how it felt — your response shapes the predicted grade bell curve.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Users className="h-3.5 w-3.5" />
          {total} {total === 1 ? "response" : "responses"}
        </div>
      </div>

      {/* Feedback form */}
      {!submitted ? (
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={cn(
                  "rounded-lg border px-3 py-3 text-sm transition-all flex flex-col items-center gap-1",
                  difficulty === d.value
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                <span className="text-2xl">{d.emoji}</span>
                <span className="font-medium">{d.label}</span>
              </button>
            ))}
          </div>
          <Button
            onClick={submit}
            disabled={!difficulty || submitting}
            className="w-full"
            size="sm"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit feedback"}
          </Button>
        </div>
      ) : (
        <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-foreground">
          ✓ Your feedback is included. See the live bell curve below.
        </div>
      )}

      {/* Difficulty bar */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
          Difficulty consensus
        </p>
        <div className="h-32">
          {loading ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyDist}>
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {difficultyDist.map((_, i) => (
                    <Cell key={i} fill={["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bell curve of predicted grades */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
          Predicted grade distribution {total > 0 && `· ${total} students`}
        </p>
        <div className="h-56">
          {loading ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : total === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-lg">
              No responses yet — be the first to submit feedback.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={bellData}>
                <XAxis dataKey="grade" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: any, name: string) => [v, name === "curve" ? "Trend" : "Students"]}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="hsl(var(--primary) / 0.6)" />
                <Line
                  type="monotone"
                  dataKey="curve"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
        {total > 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            Bell curve based on {total} student {total === 1 ? "prediction" : "predictions"} for {examBoard.toUpperCase()} {qualification}.
          </p>
        )}
      </div>
    </Card>
  );
}
