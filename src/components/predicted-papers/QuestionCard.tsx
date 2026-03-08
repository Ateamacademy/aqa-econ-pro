import { useState, useRef } from "react";
import { Send, Clock, FileText, Lightbulb, ChevronDown, PenLine, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MathsMarkdown } from "./MathsMarkdown";
import { RevisionRenderer } from "@/components/revision/RevisionRenderer";
import { EquationToolbar } from "./EquationToolbar";
import { DrawingCanvas } from "@/components/tools/DrawingCanvas";
import { EconDiagramBuilder, type DiagramData } from "@/components/tools/EconDiagramBuilder";
import { GraphPaper } from "@/components/tools/GraphPaper";
import { GeometryTools } from "@/components/tools/GeometryTools";
import { cn } from "@/lib/utils";

import type { ParsedQuestion, MCQOption } from "./parseQuestions";

interface QuestionCardProps {
  question: ParsedQuestion;
  answer: string;
  onAnswerChange: (val: string) => void;
  onMark: (diagramImage?: string) => void;
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
  subject?: string;
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
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const isMCQ = !!question.mcqOptions && question.mcqOptions.length >= 2;

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

  const insertVisualTemplate = (kind: "graph" | "diagram") => {
    const template = kind === "graph"
      ? `\n\n[GRAPH NOTES]\n- Axes labels and units:\n- Scale used:\n- Key points/coordinates plotted:\n- Shape/gradient/turning points:\n- Final reading/conclusion:\n[/GRAPH NOTES]`
      : subject === "economics"
      ? `\n\n[DIAGRAM NOTES]\n- Diagram type (e.g. S&D, AD/AS, PPF, Externality):\n- X-axis label:\n- Y-axis label:\n- Curves drawn and labelled:\n- Original equilibrium (P₁, Q₁):\n- Shift direction and new curve label:\n- New equilibrium (P₂, Q₂):\n- Shaded area and what it represents:\n- Key conclusion from diagram:\n[/DIAGRAM NOTES]`
      : `\n\n[DIAGRAM NOTES]\n- Labels included:\n- What each arrow/line/curve represents:\n- Key values used:\n- Final conclusion from the diagram:\n[/DIAGRAM NOTES]`;

    onAnswerChange(`${answer}${template}`);
    setTimeout(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.selectionStart = el.selectionEnd = el.value.length;
    }, 0);
  };

  const feedbackSections = [
    { key: "markScheme", label: "Mark Scheme", icon: Clock, content: feedback?.markScheme || "" },
    { key: "modelAnswer", label: "Model Answer", icon: FileText, content: feedback?.modelAnswer || "" },
    { key: "examinerTip", label: "Examiner Tip", icon: Lightbulb, content: feedback?.examinerTip || "" },
  ];

  const hasExtraTools = showEconDiagram || showDrawingCanvas || showGraphPaper || showGeometryTools;
  const canInsertGraphNotes = showGraphPaper || subject === "maths";
  const canInsertDiagramNotes = showDrawingCanvas || showEconDiagram || subject === "chemistry" || subject === "economics";

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
          <Send className="h-3.5 w-3.5" /> {isMCQ ? "Select Your Answer" : "Your Answer"}
        </p>

        {/* MCQ Options */}
        {isMCQ && (
          <div className="space-y-2 mb-3">
            {question.mcqOptions!.map((opt) => (
              <label
                key={opt.letter}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                  answer === opt.letter
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-muted/50",
                  feedback && "cursor-default opacity-80"
                )}
              >
                <input
                  type="radio"
                  name={`mcq-${question.id}`}
                  value={opt.letter}
                  checked={answer === opt.letter}
                  onChange={() => !feedback && onAnswerChange(opt.letter)}
                  disabled={!!feedback}
                  className="sr-only"
                />
                <span className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-bold shrink-0",
                  answer === opt.letter
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40 text-muted-foreground"
                )}>
                  {opt.letter}
                </span>
                <span className="text-sm text-foreground">{opt.text}</span>
              </label>
            ))}
          </div>
        )}

        {/* Non-MCQ tools and textarea */}
        {!isMCQ && (
          <>
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
            {showCanvas && !feedback && (
              <div className="mb-3">
                <DrawingCanvas
                  showGrid={showGeometryTools}
                  onSave={(dataUrl) => {
                    setCanvasDataUrl(dataUrl);
                    insertVisualTemplate("diagram");
                  }}
                  onDrawEnd={(dataUrl) => setCanvasDataUrl(dataUrl)}
                />
              </div>
            )}
            
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

            {!feedback && (canInsertGraphNotes || canInsertDiagramNotes) && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {canInsertGraphNotes && (
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => insertVisualTemplate("graph")}>
                    Add Graph Notes Template
                  </Button>
                )}
                {canInsertDiagramNotes && (
                  <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={() => insertVisualTemplate("diagram")}>
                    Add Diagram Notes Template
                  </Button>
                )}
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
                  : subject === "economics"
                  ? "Type your answer here... Use diagrams where relevant. The AI examiner will mark using AQA KAA criteria."
                  : showMathTools
                  ? "Type your answer here... Show all working. Use the toolbar above for maths symbols."
                  : "Type your answer here... The AI examiner will mark it for you."
              }
              className="bg-background font-mono text-sm"
              disabled={!!feedback}
            />

            {showMathTools && subject !== "economics" && (
              <p className="text-[10px] text-muted-foreground mt-1.5">
                Tip: Show each step of working on a new line. Use symbols above or type e.g. x^2, sqrt(9), pi.
              </p>
            )}
            {subject === "economics" && (
              <p className="text-[10px] text-muted-foreground mt-1.5">
                Tip: Draw your diagram using the Drawing tool with multiple colours (e.g. blue for demand, red for supply, green for shifts). The AI will visually analyse your drawing when you mark. You can also add Diagram Notes for extra clarity.
              </p>
            )}
          </>
        )}

      </div>

      {/* Mark button */}
      {!feedback && (
        <div className="px-4 pt-4">
          <Button
            size="sm"
            onClick={() => onMark(canvasDataUrl || undefined)}
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
                  <div className="bg-muted/40 rounded-lg p-4">
                    <RevisionRenderer content={s.content} />
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
