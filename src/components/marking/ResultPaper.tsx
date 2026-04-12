import type { SynthesisResult } from "@/lib/validation";
import type { MarkingResult } from "@/lib/validation";
import type { Paper } from "@/lib/rubrics";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResultDiagram } from "./ResultDiagram";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { ArrowRight, BookOpen } from "lucide-react";

interface QuestionResult {
  questionId: string;
  questionNumber: string;
  result: MarkingResult;
  warning: string | null;
}

interface Props {
  synthesis: SynthesisResult;
  questionResults: QuestionResult[];
  paper: Paper;
}

const GRADE_COLORS: Record<string, string> = {
  "A*": "text-violet-400",
  A: "text-emerald-400",
  B: "text-emerald-300",
  C: "text-amber-400",
  D: "text-amber-500",
  E: "text-red-400",
  U: "text-red-500",
};

export function ResultPaper({ synthesis, questionResults, paper }: Props) {
  const aoData = [
    { ao: "AO1", value: synthesis.aoBreakdown.ao1 },
    { ao: "AO2", value: synthesis.aoBreakdown.ao2 },
    { ao: "AO3", value: synthesis.aoBreakdown.ao3 },
    { ao: "AO4", value: synthesis.aoBreakdown.ao4 },
  ];

  return (
    <div className="space-y-8">
      {/* Hero grade */}
      <div className="text-center p-8 rounded-xl bg-card border border-border">
        <div className={`text-7xl font-black mb-2 ${GRADE_COLORS[synthesis.overallGrade] || "text-foreground"}`}>
          {synthesis.overallGrade}
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">{synthesis.overallPercentage}%</div>
        <div className="text-sm text-muted-foreground">
          {synthesis.totalAwarded} / {synthesis.totalPossible} marks
        </div>
        <p className="text-xs text-muted-foreground/70 mt-3 italic">{synthesis.gradeBoundaryContext}</p>
      </div>

      {/* AO Radar */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Assessment Objective Coverage</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={aoData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="ao" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-question accordion */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Per-Question Breakdown</h3>
        <Accordion type="multiple" className="space-y-2">
          {questionResults.map((qr) => {
            const q = paper.questions.find((pq) => pq.id === qr.questionId);
            const pct = Math.round((qr.result.totalAwarded / qr.result.totalPossible) * 100);
            return (
              <AccordionItem key={qr.questionId} value={qr.questionId} className="border rounded-lg bg-card px-4">
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center gap-3 w-full">
                    <span className="font-bold text-foreground">{qr.questionNumber}</span>
                    <span className="text-muted-foreground truncate flex-1 text-left">
                      {q?.questionText.slice(0, 60)}…
                    </span>
                    <Badge variant="outline" className="shrink-0">{qr.result.totalAwarded}/{qr.result.totalPossible}</Badge>
                    <Badge className={`shrink-0 text-[10px] ${pct >= 70 ? "bg-emerald-500/20 text-emerald-400" : pct >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
                      {pct}%
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ResultDiagram
                    result={qr.result}
                    rubric={q?.rubric || paper.questions[0].rubric}
                    warning={qr.warning}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Weakest themes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-red-400 mb-2">Weakest Themes</h3>
          <div className="space-y-2">
            {synthesis.themesWeakest.map((t, i) => (
              <div key={i} className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-foreground flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-red-400 shrink-0" /> {t}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">Strongest Themes</h3>
          <div className="space-y-2">
            {synthesis.themesStrongest.map((t, i) => (
              <div key={i} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam technique */}
      <div className="p-4 rounded-lg bg-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-2">Exam Technique Feedback</h3>
        <p className="text-sm text-muted-foreground">{synthesis.examTechniqueFeedback}</p>
      </div>

      {/* Study plan */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Your 3-Week Study Plan</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {synthesis.personalisedStudyPlan.map((w) => (
            <div key={w.week} className="p-4 rounded-lg bg-card border border-border">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] mb-2">Week {w.week}</Badge>
              <h4 className="text-sm font-semibold text-foreground mb-2">{w.focus}</h4>
              <ul className="space-y-1">
                {w.resources.map((r, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <ArrowRight className="h-3 w-3 shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
