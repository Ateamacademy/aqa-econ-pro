interface Props {
  score: number;
}

function predictedGrade(score: number): string {
  if (score >= 80) return "A*";
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";
  return "E";
}

function gradeBoundary(grade: string): number {
  const map: Record<string, number> = { "A*": 80, A: 70, B: 60, C: 50, D: 40, E: 30 };
  return map[grade] ?? 30;
}

export default function PredictedGrade({ score }: Props) {
  const grade = predictedGrade(score);
  const boundary = gradeBoundary(grade);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-muted-foreground text-xs font-medium mb-1">Predicted Grade</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-foreground font-mono">{grade}</span>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">Boundary: {boundary}%</span>
          <span className={`text-[10px] font-medium ${score >= boundary ? "text-success" : "text-warning"}`}>
            Your avg: {score}%
          </span>
        </div>
      </div>
      <svg viewBox="0 0 120 30" className="w-full h-8 mt-3">
        <polyline
          points="0,25 15,22 30,20 45,18 60,16 75,13 90,10 105,8 120,5"
          fill="none"
          stroke="hsl(var(--success))"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="120" cy="5" r="3" fill="hsl(var(--success))">
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
