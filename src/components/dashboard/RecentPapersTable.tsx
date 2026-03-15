import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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

function gradeColor(grade: string): string {
  if (grade === "A*" || grade === "A") return "border-primary/40 text-primary bg-primary/10";
  if (grade === "B") return "border-cyan-pop/40 text-cyan-400 bg-cyan-400/10";
  if (grade === "C") return "border-warning/40 text-warning bg-warning/10";
  return "border-destructive/40 text-destructive bg-destructive/10";
}

function formatSessionType(type: string): string {
  const map: Record<string, string> = {
    question: "Practice",
    predicted_paper: "Predicted Paper",
    essay: "Essay",
    diagram: "Diagram",
    topic_test: "Topic Test",
  };
  return map[type] || type;
}

export default function RecentPapersTable({ sessions, subject }: Props) {
  const recentScored = useMemo(() => {
    return sessions
      .filter(s => s.subject === subject && s.score_percent !== null)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 8);
  }, [sessions, subject]);

  if (recentScored.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-foreground font-semibold text-sm">Recent Sessions</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No scored sessions yet. Complete a paper or practice session to see results here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-foreground font-semibold text-sm">Recent Sessions</h3>
        <span className="text-[10px] text-muted-foreground">{recentScored.length} shown</span>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground text-xs">Topic</TableHead>
            <TableHead className="text-muted-foreground text-xs">Type</TableHead>
            <TableHead className="text-muted-foreground text-xs">Date</TableHead>
            <TableHead className="text-muted-foreground text-xs text-right">Score</TableHead>
            <TableHead className="text-muted-foreground text-xs text-right">Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentScored.map((s) => {
            const grade = getGrade(s.score_percent!);
            const dateStr = new Date(s.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            });
            return (
              <TableRow key={s.id} className="border-border hover:bg-popover/50 transition-colors">
                <TableCell className="text-sm font-medium text-foreground max-w-[160px] truncate">
                  {s.topic}
                </TableCell>
                <TableCell>
                  <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {formatSessionType(s.session_type)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{dateStr}</TableCell>
                <TableCell className="text-right">
                  <span className="text-sm font-bold font-mono text-foreground">{s.score_percent}%</span>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={cn("text-xs font-bold", gradeColor(grade))}>
                    {grade}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
