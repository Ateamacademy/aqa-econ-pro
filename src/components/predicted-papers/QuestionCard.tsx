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
import EconNegExtUKEnergy from "@/components/EconNegExtUKEnergy.jsx";
import EconMaxPriceCeiling from "@/components/EconMaxPriceCeiling.jsx";
import EconNegExtConsumptionSoda from "@/components/EconNegExtConsumptionSoda.jsx";
import EconNegExtIBSoftDrinks from "@/components/EconNegExtIBSoftDrinks.jsx";
import EconAllocativeInefficiencyMCMB from "@/components/EconAllocativeInefficiencyMCMB.jsx";
import EconMonopolyDWL from "@/components/EconMonopolyDWL.jsx";
import EconPerfectCompetition from "@/components/EconPerfectCompetition.jsx";
import PerfectCompetitionDiagram from "@/components/PerfectCompetitionDiagram.jsx";
import EconExchangeRateNaira from "@/components/EconExchangeRateNaira.jsx";
import EconExchangeRatePound from "@/components/EconExchangeRatePound.jsx";
import EconMultiplierEffect from "@/components/EconMultiplierEffect.jsx";
import EconADASCostPush from "@/components/EconADASCostPush.jsx";
import EconPosExtEduqasTransport from "@/components/EconPosExtEduqasTransport.jsx";
import EconMonopolyBusinessObjectivesEduqas from "@/components/EconMonopolyBusinessObjectivesEduqas.jsx";

// Wrapper for the interactive Short-run/Long-run toggle perfect-competition
// diagram so it sits inside a card without forcing 100vh height (which would
// crop the toggle pill on narrow containers like the Smart Mark feedback panel).
const PerfectCompetitionToggleFigure = () => (
  <div style={{ width: "100%", overflowX: "auto", borderRadius: 8 }}>
    <div style={{ minWidth: 640, width: "100%" }}>
      <PerfectCompetitionDiagram />
    </div>
  </div>
);
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
  /** Stable key per loaded paper · used to namespace localStorage drawings. */
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
  const isMaxPriceOverride =
    paperKey === "econ-p2-c" && /question\s*0?1\s*\(?\s*b\s*\)?|^q?\s*0?1\s*b\b|\b1b\b/i.test(question.label);
  // IB negative-externality / common-access-resource questions across all IB
  // predicted papers (ib-p1-*, ib-p2-*, ib-p3-*). Uses the canonical IB
  // consumption-externality diagram (MSB dashed below MPB, MPC=MSC=S, DWL).
  const ibQuestionBody = `${question.label}\n${question.text}`;
  const isIbPaper = typeof paperKey === "string" && /^ib-p[123]-/.test(paperKey);
  // Production externality (MSC > MPC, MPB=MSB) · use UK Energy diagram.
  const isIbProductionExternalityOverride =
    isIbPaper &&
    /negative\s+production\s+externalit/i.test(ibQuestionBody);
  const isIbSodaOverride =
    isIbPaper &&
    !isIbProductionExternalityOverride &&
    (
      /negative\s+externality/i.test(ibQuestionBody) ||
      /common\s+access\s+resource/i.test(ibQuestionBody) ||
      /demerit\s+good/i.test(ibQuestionBody)
    );
  // IB Paper 2 Moderate (ib-p2-a) Q1 (a)(i) · "Define the term foreign direct investment (FDI)" (Text B, Paragraph 1)
  const isIbFdiSuppressOnly =
    paperKey === "ib-p2-a" &&
    /define\s+the\s+term\s+\**foreign\s+direct\s+investment/i.test(ibQuestionBody);
  // IB Paper 3 Moderate (ib-p3-a) Q1 (a)(iv) · MC/MB allocative inefficiency from negative externality of production
  const isIbMcMbAllocOverride =
    paperKey === "ib-p3-a" &&
    /marginal-?cost\s*\/\s*marginal-?benefit\s+diagram/i.test(ibQuestionBody) &&
    /allocativ\w*\s+inefficien/i.test(ibQuestionBody);
  // IB Paper 3 Moderate (ib-p3-a) Q1 (v) · monopoly DWL diagram.
  const isIbMonopolyDwlOverride =
    paperKey === "ib-p3-a" &&
    /firm\s*x/i.test(ibQuestionBody) &&
    /short-?run\s+equilibrium/i.test(ibQuestionBody) &&
    /long-?run\s+equilibrium/i.test(ibQuestionBody);
  // IB Paper 3 Hard (ib-p3-b) Q1 (a) · Firm X is perfectly competitive. Use the two-panel
  // industry/firm perfect-competition diagram across all Figure 1 sub-parts (profit-max output,
  // supernormal profit, SR→LR adjustment, etc.).
  const isIbPerfectCompetitionFirmXOverride =
    paperKey === "ib-p3-b" &&
    /firm\s*x/i.test(ibQuestionBody) &&
    (
      /short-?run\s+equilibrium/i.test(ibQuestionBody) &&
      /long-?run\s+equilibrium/i.test(ibQuestionBody)
      || /figure\s*1/i.test(ibQuestionBody)
      || /profit-?maximi[sz]ing\s+output/i.test(ibQuestionBody)
      || /supernormal\s+profit/i.test(ibQuestionBody)
      || /perfect(ly)?\s+competit/i.test(ibQuestionBody)
    );
  // IB naira exchange-rate unification question (Paper 3 Hard ib-p3-b and
  // Paper 2 Advanced ib-p2-c). Uses the dedicated NGN currency-market diagram
  // (depreciation: S shifts right).
  const isIbNairaExchangeRateOverride =
    (paperKey === "ib-p3-b" || paperKey === "ib-p2-c") &&
    /naira/i.test(ibQuestionBody) &&
    (/exchange\s*rate/i.test(ibQuestionBody) || /unification/i.test(ibQuestionBody));
  // Eduqas Paper 1 · Moderate (eduqas-p1-a) Q22 · public transport positive
  // consumption externality. Use the dedicated Eduqas positive-consumption
  // externality figure across Smart Mark feedback, Explain my feedback, etc.
  const isEduqasPosConsExtTransportOverride =
    paperKey === "eduqas-p1-a" &&
    /positive\s+consumption\s+externalit/i.test(ibQuestionBody) &&
    /public\s+transport/i.test(ibQuestionBody);
  // Eduqas Paper 2 · Moderate (eduqas-p2-a) Q2.3 · supermarket abnormal
  // profits / expansion of Aldi & Lidl. Use the Monopoly Business Objectives
  // (cost & revenue) reference diagram across Smart Mark / Explain feedback.
  const isEduqasMonopolyBusinessObjectivesOverride =
    (paperKey === "eduqas-p2-a" ||
      paperKey === "eduqas-p2-b" ||
      paperKey === "eduqas-p2-c" ||
      paperKey === "wjec-p2-a" ||
      paperKey === "wjec-p2-b" ||
      paperKey === "wjec-p2-c") &&
    /costs?\s+and\s+revenue\s+diagram/i.test(ibQuestionBody) &&
    /abnormal\s+profits?/i.test(ibQuestionBody) &&
    /(aldi|lidl|supermarket|ofgem|price\s*cap|energy\s+suppl|digital\s+platform|interoperab|dominant)/i.test(
      ibQuestionBody,
    );
  // Eduqas Paper 3 · Hard (eduqas-p3-b) Q3.1 · "Using a diagram, explain the
  // factors that determine the exchange rate of the pound in a floating
  // exchange rate system." Use the dedicated GBP currency-market diagram
  // across Smart Mark / Explain feedback / Improve my answer.
  const isEduqasPoundExchangeRateOverride =
    paperKey === "eduqas-p3-b" &&
    /pound/i.test(ibQuestionBody) &&
    /floating\s+exchange\s+rate/i.test(ibQuestionBody);
  // WJEC Paper 3 · Hard (wjec-p3-b) Q6 · LNG yen price / Japan macro shock.
  // Use the canonical AD–AS "Increase in Aggregate Demand / Multiplier Effect"
  // diagram across Smart Mark / Explain feedback / Improve my answer.
  const isWjecP3LngAdAsOverride =
    paperKey === "wjec-p3-b" &&
    /(lng|liquefied\s+natural\s+gas|yen|japan)/i.test(ibQuestionBody);
  const suppressFeedbackDiagramPreview =
    (paperKey === "econ-p1-b" && /question\s*0?[25]/i.test(question.label)) ||
    (paperKey === "econ-p1-a" && /question\s*0?3/i.test(question.label)) ||
    (paperKey === "econ-p1-c" && /question\s*0?5/i.test(question.label)) ||
    (paperKey === "econ-p2-a" && /question\s*0?2/i.test(question.label)) ||
    (paperKey === "econ-p2-c" && /question\s*0?2/i.test(question.label)) ||
    isMaxPriceOverride ||
    isIbSodaOverride ||
    isIbProductionExternalityOverride ||
    isIbFdiSuppressOnly ||
    isIbMcMbAllocOverride ||
    isIbMonopolyDwlOverride ||
    isIbPerfectCompetitionFirmXOverride ||
    isIbNairaExchangeRateOverride ||
    isEduqasPosConsExtTransportOverride ||
    isEduqasMonopolyBusinessObjectivesOverride ||
    isEduqasPoundExchangeRateOverride ||
    isWjecP3LngAdAsOverride;

  const CanonicalFigure = isWjecP3LngAdAsOverride
    ? EconADASCostPush
    : isEduqasPoundExchangeRateOverride
    ? EconExchangeRatePound
    : isIbNairaExchangeRateOverride
    ? EconExchangeRateNaira
    : isEduqasMonopolyBusinessObjectivesOverride
      ? EconMonopolyBusinessObjectivesEduqas
      : isEduqasPosConsExtTransportOverride
        ? EconPosExtEduqasTransport
        : isIbPerfectCompetitionFirmXOverride
          ? PerfectCompetitionToggleFigure
          : isIbMonopolyDwlOverride
            ? EconMonopolyDWL
            : isIbMcMbAllocOverride
              ? EconAllocativeInefficiencyMCMB
              : isIbProductionExternalityOverride
                ? EconNegExtIBSoftDrinks
                : isIbSodaOverride
                  ? EconNegExtIBSoftDrinks
                  : isMaxPriceOverride
                    ? EconMaxPriceCeiling
                    : EconNegExtUKEnergy;
  const showCanonicalFigure = !isIbFdiSuppressOnly;

  const renderDiagramContent = (text: string, opts?: { withCanonicalFigure?: boolean }) => {
    if (suppressFeedbackDiagramPreview) {
      const strippedText = text
        .replace(/^\s*(?:#{2,4}\s*)?(?:\*\*)?Diagram\s*:[\s\S]*?(?=^\s*#{1,4}\s+\S|\Z)/gim, "")
        .replace(/^\s*\[DIAGRAM:[^\]]+\]\s*$/gim, "")
        .trim();

      return (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {opts?.withCanonicalFigure && showCanonicalFigure && (
            <div className="not-prose mb-4 rounded-lg border border-border bg-card overflow-hidden">
              <CanonicalFigure />
            </div>
          )}
          <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
            <RevisionRenderer content={strippedText} />
          </Suspense>
        </div>
      );
    }

    return (
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
          {aqaDiagramRequired && !aqaDiagramOptional && (
            <span className="text-[10px] uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-bold">
              Diagram required
            </span>
          )}
        </div>
        <div className="text-sm text-foreground/90">
          <MathsMarkdown>{question.text}</MathsMarkdown>
        </div>

        {/* AQA reference figure + drawing canvas · side-by-side on lg, stacked on mobile.
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
          /* Smart Mark format · matching Diagram Practice section */
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
                  <CardTitle className="text-base font-bold tracking-tight">Smart Mark feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderDiagramContent(feedback.smartFeedback, { withCanonicalFigure: true })}
                </CardContent>
              </Card>
            )}

            {/* Explain my feedback · collapsible */}
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
                    {renderDiagramContent(feedback.explainFeedback, { withCanonicalFigure: true })}
                  </CardContent>
                )}
              </Card>
            )}

            {/* Improve my answer · collapsible */}
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
                    {renderDiagramContent(feedback.improveFeedback, { withCanonicalFigure: true })}
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
