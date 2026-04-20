import { useState, useRef, lazy, Suspense } from "react";
import { Send, Clock, FileText, Lightbulb, ChevronDown, ChevronUp, PenLine, BarChart3, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MathsMarkdown } from "./MathsMarkdown";
const RevisionRenderer = lazy(() => import("@/components/revision/RevisionRenderer").then(m => ({ default: m.RevisionRenderer })));
import { EquationToolbar } from "./EquationToolbar";
import { DrawingCanvas } from "@/components/tools/DrawingCanvas";
import { EconDiagramBuilder, type DiagramData } from "@/components/tools/EconDiagramBuilder";
import { GraphPaper } from "@/components/tools/GraphPaper";
import { GeometryTools } from "@/components/tools/GeometryTools";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractDiagramBlocks, EconDiagramCanvas } from "./EconDiagramSVG";
import { resolveDiagramType } from "@/components/revision/EconDiagramLibrary";
import { PredictedPaperDiagramBlock } from "./PredictedPaperDiagramBlock";
import { ReferenceFigurePanel } from "./ReferenceFigurePanel";
import type { AqaDiagramRubric } from "@/lib/aqa-diagram-rubric";
import { evaluateDiagramGate } from "@/lib/markGates";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    isDiagramFeedback?: boolean;
    mark?: string;
    smartFeedback?: string;
    explainFeedback?: string;
    improveFeedback?: string;
  } | null;
  showMathTools?: boolean;
  showEconDiagram?: boolean;
  showDrawingCanvas?: boolean;
  showGraphPaper?: boolean;
  showGeometryTools?: boolean;
  subject?: string;
  /** Stable key per loaded paper — used to namespace localStorage drawings. */
  paperKey?: string;
  /** Called when student finishes a stroke on the inline AQA canvas. */
  onDiagramImageChange?: (questionId: string, dataUrl: string) => void;
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
  paperKey,
  onDiagramImageChange,
}: QuestionCardProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);
  const [geoTool, setGeoTool] = useState<string | null>(null);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const [aqaDiagramDataUrl, setAqaDiagramDataUrl] = useState<string | null>(null);
  const [showExplain, setShowExplain] = useState(false);
  const [showImprove, setShowImprove] = useState(false);
  const [gateWarning, setGateWarning] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isMCQ = !!question.mcqOptions && question.mcqOptions.length >= 2;
  const aqaDiagramRequired = !!question.requiresDiagram;
  const aqaDiagramOptional = !!question.diagramOptional;

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

  const expectedDiagramType = resolveDiagramType(`${question.label}\n${question.text}\n${answer}`) ?? undefined;

  const renderDiagramContent = (text: string) => (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      {extractDiagramBlocks(text, {
        contextText: `${question.label}\n${question.text}`,
        fallbackType: expectedDiagramType,
      }).map((seg, i) =>
        seg.type === "diagram" ? (
          <EconDiagramCanvas key={i} diagram={seg.diagram} />
        ) : (
          <Suspense key={i} fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
            <RevisionRenderer content={seg.content} />
          </Suspense>
        )
      )}
    </div>
  );

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
          {aqaDiagramRequired && !aqaDiagramOptional && (
            <span className="text-[10px] uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-bold">
              Diagram required
            </span>
          )}
        </div>
        <div className="text-sm text-foreground/90">
          <MathsMarkdown>{question.text}</MathsMarkdown>
        </div>

        {/* AQA reference figure + drawing canvas — side-by-side on lg, stacked on mobile.
            MCQs already render their figure inline within the stem markdown, so we
            suppress the separate Reference figure panel for MCQs to avoid showing
            two copies of the same diagram. */}
        {(aqaDiagramRequired || (question.referenceFigureId && !isMCQ)) && !feedback && paperKey && (
          <div className={`mt-3 grid grid-cols-1 gap-3 ${question.referenceFigureId && !isMCQ && aqaDiagramRequired ? "lg:grid-cols-2" : ""}`}>
            {question.referenceFigureId && !isMCQ && (
              <ReferenceFigurePanel
                referenceFigureId={question.referenceFigureId}
                scenario={question.referenceFigureScenario}
                questionLabel={question.label}
                paperKey={paperKey}
              />
            )}
            {aqaDiagramRequired && (
              <PredictedPaperDiagramBlock
                questionId={question.id}
                paperKey={paperKey}
                required={aqaDiagramRequired}
                optional={aqaDiagramOptional}
                diagramType={question.diagramType}
                rubric={question.diagramRubric as AqaDiagramRubric | undefined}
                onChange={(dataUrl) => {
                  setAqaDiagramDataUrl(dataUrl);
                  onDiagramImageChange?.(question.id, dataUrl);
                }}
              />
            )}
          </div>
        )}
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
                  ? "Type your answer here... Use diagrams where relevant. The examiner will mark using AQA KAA criteria."
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
            onClick={() => {
              const img = aqaDiagramDataUrl || canvasDataUrl || undefined;
              if (aqaDiagramRequired && !aqaDiagramOptional) {
                const isMacro = /macro|inflation|gdp|monetary|fiscal|aggregate/i.test(
                  `${question.label} ${question.text}`,
                );
                const gate = evaluateDiagramGate({ answer, diagramImage: img, isMacro });
                if (!gate.ok) {
                  setGateWarning(gate.message);
                  return;
                }
              }
              onMark(img);
            }}
            disabled={isMarking || !answer.trim()}
            className="gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            {isMarking ? "Marking..." : "Mark My Answer"}
          </Button>
          <AlertDialog open={!!gateWarning} onOpenChange={(o) => !o && setGateWarning(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Diagram and explanation required</AlertDialogTitle>
                <AlertDialogDescription>{gateWarning}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go back and add</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setGateWarning(null);
                    onMark(aqaDiagramDataUrl || canvasDataUrl || undefined);
                  }}
                >
                  Submit anyway (will score 0)
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Feedback sections */}
      <div className="p-4 flex flex-col gap-2">
        {feedback?.isDiagramFeedback ? (
          /* Smart Mark format — matching Diagram Practice section */
          <div className="space-y-3">
            {/* Mark display */}
            {feedback.mark && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-5">
                  <p className="text-xl font-bold text-foreground">Your mark: {feedback.mark}</p>
                </CardContent>
              </Card>
            )}

            {/* Smart Mark feedback */}
            {feedback.smartFeedback && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Smart Mark feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderDiagramContent(feedback.smartFeedback)}
                </CardContent>
              </Card>
            )}

            {/* Explain my feedback — collapsible */}
            {feedback.explainFeedback && (
              <Card className="overflow-hidden">
                <button
                  onClick={() => setShowExplain(!showExplain)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">Explain my feedback</span>
                  </div>
                  {showExplain ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                {showExplain && (
                  <CardContent className="pt-0 pb-5 px-5 border-t border-border/50">
                    {renderDiagramContent(feedback.explainFeedback)}
                  </CardContent>
                )}
              </Card>
            )}

            {/* Improve my answer — collapsible */}
            {feedback.improveFeedback && (
              <Card className="overflow-hidden">
                <button
                  onClick={() => setShowImprove(!showImprove)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-sm">Improve my answer</span>
                  </div>
                  {showImprove ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                {showImprove && (
                  <CardContent className="pt-0 pb-5 px-5 border-t border-border/50">
                    {renderDiagramContent(feedback.improveFeedback)}
                  </CardContent>
                )}
              </Card>
            )}
          </div>
        ) : (
          /* Standard format for non-diagram questions */
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
                      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}><RevisionRenderer content={s.content} /></Suspense>
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
