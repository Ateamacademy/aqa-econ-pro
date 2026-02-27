import { useState, useRef } from "react";
import { Send, Clock, FileText, Lightbulb, ChevronDown, PenLine, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MathsMarkdown } from "./MathsMarkdown";
import { EquationToolbar } from "./EquationToolbar";
import { DrawingCanvas } from "@/components/tools/DrawingCanvas";
import { EconDiagramBuilder, type DiagramData } from "@/components/tools/EconDiagramBuilder";
import { GraphPaper } from "@/components/tools/GraphPaper";
import { GeometryTools } from "@/components/tools/GeometryTools";
import { cn } from "@/lib/utils";

import type { ParsedQuestion } from "./parseQuestions";

interface QuestionCardProps {
  question: ParsedQuestion;
  answer: string;
  onAnswerChange: (val: string) => void;
  onMark: () => void;
  isMarking: boolean;
  feedback: {
    markScheme: string;
    modelAnswer: string;
    examinerTip: string;
  } | null;
  showMathTools?: boolean;
  showEconDiagram?: boolean;
  showDrawingCanvas?: boolean;
  showGraphPaper?: boolean;
  showGeometryTools?: boolean;
  subject?: "economics" | "maths" | "chemistry";
}

export function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onMark,
  isMarking,
  feedback,
  showMathTools = false,
  showEconDiagram = false,
  showDrawingCanvas = false,
  showGraphPaper = false,
  showGeometryTools = false,
  subject = "economics",
}: QuestionCardProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [geoTool, setGeoTool] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggle = (section: string) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const insertSymbol = (symbol: string) => {
    const el = textareaRef.current;
    if (!el) { onAnswerChange(answer + symbol); return; }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newVal = answer.slice(0, start) + symbol + answer.slice(end);
    onAnswerChange(newVal);
    setTimeout(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + symbol.length;
    }, 0);
  };

  const handleDiagramSave = (data: DiagramData) => {
    onAnswerChange(answer + `\n\n[DIAGRAM: ${data.description}]`);
  };

  const feedbackSections = [
    { key: "markScheme", label: "Mark Scheme", icon: Clock, content: feedback?.markScheme || "" },
    { key: "modelAnswer", label: "Model Answer", icon: FileText, content: feedback?.modelAnswer || "" },
    { key: "examinerTip", label: "Examiner Tip", icon: Lightbulb, content: feedback?.examinerTip || "" },
  ];

  const hasExtraTools = showEconDiagram || showDrawingCanvas || showGraphPaper || showGeometryTools;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Question header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="font-bold text-sm text-foreground">{question.label}</h3>
          <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
            {question.marks} marks
          </span>
        </div>
        <div className="text-sm text-foreground/90">
          <MathsMarkdown>{question.text}</MathsMarkdown>
        </div>
      </div>

      {/* Answer area */}
      <div className="p-5 border-b border-border bg-muted/30">
        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
          <Send className="h-3.5 w-3.5" /> Your Answer
        </p>

        {/* Tool toggles */}
        {hasExtraTools && !feedback && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {showDrawingCanvas && (
              <Button type="button" variant={showCanvas ? "default" : "outline"} size="sm" className="h-7 text-xs gap-1"
                onClick={() => { setShowCanvas(!showCanvas); setShowGraph(false); setShowDiagram(false); }}>
                <PenLine className="h-3 w-3" /> Drawing
              </Button>
            )}
            {showGraphPaper && (
              <Button type="button" variant={showGraph ? "default" : "outline"} size="sm" className="h-7 text-xs gap-1"
                onClick={() => { setShowGraph(!showGraph); setShowCanvas(false); setShowDiagram(false); }}>
                <BarChart3 className="h-3 w-3" /> Graph
              </Button>
            )}
            {showEconDiagram && (
              <Button type="button" variant={showDiagram ? "default" : "outline"} size="sm" className="h-7 text-xs gap-1"
                onClick={() => { setShowDiagram(!showDiagram); setShowCanvas(false); setShowGraph(false); }}>
                <BarChart3 className="h-3 w-3" /> Diagram
              </Button>
            )}
          </div>
        )}

        {/* Drawing canvas */}
        {showCanvas && !feedback && <div className="mb-3"><DrawingCanvas showGrid={showGeometryTools} /></div>}
        
        {/* Graph paper */}
        {showGraph && !feedback && <div className="mb-3"><GraphPaper /></div>}
        
        {/* Economics diagram builder */}
        {showDiagram && !feedback && <div className="mb-3"><EconDiagramBuilder onSave={handleDiagramSave} /></div>}

        {/* Geometry tools */}
        {showGeometryTools && !feedback && (
          <div className="mb-3"><GeometryTools activeTool={geoTool} onToolChange={setGeoTool} /></div>
        )}

        {showMathTools && !feedback && (
          <div className="mb-2">
            <EquationToolbar onInsert={insertSymbol} />
          </div>
        )}

        <Textarea
          ref={textareaRef}
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          rows={5}
          placeholder={
            subject === "chemistry"
              ? "Type your answer here... Include balanced equations with state symbols where needed."
              : showMathTools
              ? "Type your answer here... Show all working. Use the toolbar above for maths symbols."
              : "Type your answer here... The AI examiner will mark it for you."
          }
          className="bg-background font-mono text-sm"
          disabled={!!feedback}
        />

        {showMathTools && (
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Tip: Show each step of working on a new line. Use symbols above or type e.g. x^2, sqrt(9), pi.
          </p>
        )}
      </div>

      {/* Mark button */}
      {!feedback && (
        <div className="px-4 pt-4">
          <Button
            size="sm"
            onClick={onMark}
            disabled={isMarking || !answer.trim()}
            className="gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            {isMarking ? "Marking..." : "Mark My Answer"}
          </Button>
        </div>
      )}

      {/* Feedback sections */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {feedbackSections.map((s) => (
            <Collapsible key={s.key} open={openSection === s.key} onOpenChange={() => toggle(s.key)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs"
                  disabled={!feedback}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      openSection === s.key && "rotate-180"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              {feedback && (
                <CollapsibleContent className="mt-3 px-1">
                  <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/40 rounded-lg p-4">
                    <MathsMarkdown>{s.content}</MathsMarkdown>
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
