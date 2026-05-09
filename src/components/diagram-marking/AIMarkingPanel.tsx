import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Award, FileText, Eye, RotateCcw, ChevronDown, ChevronUp,
  Lightbulb, BookOpen, MessageSquare, Sparkles,
} from "lucide-react";
import { MarkBreakdownCard } from "./MarkBreakdownCard";
import { ExaminerReportModal } from "./ExaminerReportModal";
import type { DiagramMarkingResult } from "./types";

interface Props {
  result: DiagramMarkingResult;
  difficulty: string;
  diagramImage: string | null;
  inputMode: "draw" | "text";
  diagramDesc: string;
  explanation: string;
  questionText: string;
  onRetry: () => void;
  onRevealIdeal: () => void;
  referenceDiagram?: React.ReactNode;
}

export function AIMarkingPanel({
  result, difficulty, diagramImage, inputMode, diagramDesc,
  explanation, questionText, onRetry, onRevealIdeal, referenceDiagram,
}: Props) {
  const [showReport, setShowReport] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [showMisconceptions, setShowMisconceptions] = useState(false);

  const pct = result.mark_percentage;
  const scoreColor = pct >= 80 ? "text-emerald-500" : pct >= 60 ? "text-amber-500" : "text-red-500";
  const scoreBg = pct >= 80 ? "bg-emerald-500/10 border-emerald-500/30" : pct >= 60 ? "bg-amber-500/10 border-amber-500/30" : "bg-red-500/10 border-red-500/30";

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT · Student's answer */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Your Answer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {diagramImage && inputMode === "draw" ? (
                <img src={diagramImage} alt="Your diagram" className="rounded-lg border max-w-full" />
              ) : diagramDesc ? (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-sm whitespace-pre-wrap">{diagramDesc}</p>
                </div>
              ) : null}
              {explanation && (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Your Explanation</p>
                  <p className="text-sm whitespace-pre-wrap">{explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT · AI Marking */}
        <div className="space-y-4">
          {/* Score card */}
          <Card className={cn("border", scoreBg)}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">AI Examiner Score</p>
                  <p className={cn("text-3xl font-bold mt-1", scoreColor)}>
                    {result.marks_awarded}/{result.total_marks}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{pct}% · {result.examiner_summary.estimated_grade_band}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className="text-[10px]">{difficulty}</Badge>
                  <Badge variant="outline" className="text-[10px]">
                    <Sparkles className="h-2.5 w-2.5 mr-0.5" /> AI Marked
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Overall feedback */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Examiner Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.examiner_summary.overall_feedback}
              </p>
              {result.examiner_summary.strongest_areas.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-semibold text-emerald-500">Strongest areas:</p>
                  {result.examiner_summary.strongest_areas.map((a, i) => (
                    <p key={i} className="text-xs text-muted-foreground pl-3 border-l-2 border-emerald-500/30">✓ {a}</p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mark breakdown */}
          <Card>
            <CardContent className="p-5">
              <MarkBreakdownCard results={result.component_results} />
            </CardContent>
          </Card>

          {/* Reference diagram */}
          {referenceDiagram && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  Reference Diagram
                </CardTitle>
              </CardHeader>
              <CardContent>{referenceDiagram}</CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Collapsible sections below the split */}
      <div className="space-y-3 mt-4">
        {/* Model answer */}
        <Card className="overflow-hidden">
          <button
            onClick={() => setShowModel(!showModel)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Reveal Ideal Answer</span>
            </div>
            {showModel ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {showModel && (
            <CardContent className="pt-0 pb-5 px-5 border-t border-border/50 space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {result.model_answer.text}
              </p>
              {result.model_answer.key_labels.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {result.model_answer.key_labels.map((l, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{l}</Badge>
                  ))}
                </div>
              )}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="text-xs font-semibold text-primary mb-1">Ideal Diagram</p>
                <p className="text-xs text-muted-foreground">{result.model_answer.diagram_description}</p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Misconceptions */}
        {result.misconceptions_detected.length > 0 && (
          <Card className="overflow-hidden">
            <button
              onClick={() => setShowMisconceptions(!showMisconceptions)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-500" />
                <span className="font-semibold text-sm">Misconceptions Detected ({result.misconceptions_detected.length})</span>
              </div>
              {showMisconceptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showMisconceptions && (
              <CardContent className="pt-0 pb-5 px-5 border-t border-border/50 space-y-2">
                {result.misconceptions_detected.map((mc, i) => (
                  <div key={i} className={cn("rounded-lg border p-3",
                    mc.severity === "major" ? "border-red-500/30 bg-red-500/5" :
                    mc.severity === "moderate" ? "border-amber-500/30 bg-amber-500/5" :
                    "border-border bg-muted/30"
                  )}>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px]">{mc.severity}</Badge>
                    </div>
                    <p className="text-sm text-red-400 line-through">{mc.misconception}</p>
                    <p className="text-sm text-emerald-400 mt-1">✓ {mc.correction}</p>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        )}

        {/* Follow-up questions */}
        {result.follow_up_questions.length > 0 && (
          <Card className="overflow-hidden">
            <button
              onClick={() => setShowFollowUp(!showFollowUp)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Targeted Follow-Up Questions</span>
              </div>
              {showFollowUp ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {showFollowUp && (
              <CardContent className="pt-0 pb-5 px-5 border-t border-border/50 space-y-2">
                {result.follow_up_questions.map((q, i) => (
                  <div key={i} className="rounded-lg border border-border p-3">
                    <Badge variant="secondary" className="text-[10px] mb-1">{q.topic}</Badge>
                    <p className="text-sm text-foreground">{q.question}</p>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Retry This Question
          </Button>
          <Button onClick={() => setShowReport(true)} variant="outline" className="gap-2">
            <Award className="h-4 w-4" /> View Examiner Report
          </Button>
          <Button onClick={onRevealIdeal} variant="outline" className="gap-2">
            <Eye className="h-4 w-4" /> Reveal Ideal Diagram
          </Button>
        </div>
      </div>

      <ExaminerReportModal
        open={showReport}
        onOpenChange={setShowReport}
        result={result}
        difficulty={difficulty}
      />
    </>
  );
}
