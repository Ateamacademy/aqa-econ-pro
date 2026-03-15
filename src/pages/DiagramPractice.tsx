import { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Lock, Send, RotateCcw, Info, Pencil, FileText, ChevronDown, ChevronUp, MessageSquare, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { FREE_LIMITS } from "@/lib/plans";
import { DrawingCanvas } from "@/components/tools/DrawingCanvas";
import { cn } from "@/lib/utils";
import { extractDiagramBlocks, EconDiagramCanvas } from "@/components/predicted-papers/EconDiagramSVG";
import { UpgradeModal } from "@/components/UpgradeModal";

const DIAGRAM_TOPICS: Record<string, string[]> = {
  economics: [
    "Supply & Demand — Shift in Demand",
    "Supply & Demand — Shift in Supply",
    "Indirect Tax (Ad Valorem / Specific)",
    "Subsidy on a Good",
    "Negative Externality (Overconsumption / Overproduction)",
    "Positive Externality (Underconsumption / Underproduction)",
    "Maximum Price (Price Ceiling)",
    "Minimum Price (Price Floor)",
    "AD/AS — Demand-Side Shock",
    "AD/AS — Supply-Side Shock",
    "AD/AS — Economic Growth (LRAS Shift)",
    "Keynesian AS — Spare Capacity vs Full Employment",
    "Labour Market — Wage Determination",
    "Monopoly — Profit Maximisation (MC=MR)",
    "Perfect Competition — Short Run & Long Run",
  ],
  "edexcel-a": [
    "Supply & Demand — Market Equilibrium Change",
    "Indirect Tax & Subsidy",
    "Negative / Positive Externality (Welfare Loss)",
    "AD/AS — Demand-Pull Inflation",
    "AD/AS — Cost-Push Inflation",
    "AD/AS — Supply-Side Policy Effect",
    "Monopoly — Supernormal Profit",
    "Oligopoly — Kinked Demand Curve",
    "Labour Market — Minimum Wage",
    "Exchange Rate Determination",
    "Terms of Trade",
    "J-Curve Effect (Balance of Payments)",
  ],
  "edexcel-b": [
    "Supply & Demand — Price Mechanism",
    "Market Failure — Externalities",
    "AD/AS — Macroeconomic Equilibrium",
    "AD/AS — Fiscal Policy Effect",
    "Cost & Revenue Curves — Profit Maximisation",
    "Market Structures — Monopoly vs Perfect Competition",
    "Labour Market — Trade Union Effect",
    "Phillips Curve",
    "Lorenz Curve & Gini Coefficient",
  ],
  ocr: [
    "Supply & Demand — Market Equilibrium",
    "Indirect Tax — Incidence on Consumers & Producers",
    "Negative Externality — Welfare Loss Triangle",
    "Positive Externality — Welfare Gain",
    "AD/AS — Demand-Pull Inflation",
    "AD/AS — Cost-Push Inflation",
    "AD/AS — Supply-Side Policy",
    "Monopoly — Abnormal Profit",
    "Contestable Markets — Hit-and-Run Entry",
    "Labour Market — Monopsony",
    "Phillips Curve — Short Run vs Long Run",
    "Comparative Advantage & Terms of Trade",
  ],
  cambridge: [
    "Supply & Demand — Market Equilibrium",
    "Price Elasticity of Demand — Effect on Revenue",
    "Indirect Tax — Consumer vs Producer Burden",
    "Negative Externality — MSC vs MPC",
    "Positive Externality — MSB vs MPB",
    "AD/AS — Inflationary / Deflationary Gap",
    "Keynesian AS — Horizontal, Upward Sloping, Vertical Sections",
    "Monopoly — Price Discrimination",
    "Oligopoly — Kinked Demand Curve",
    "Perfect Competition — Long Run Equilibrium",
    "Labour Market — Bilateral Monopoly",
    "Comparative Advantage — PPC Approach",
    "The Multiplier — AD Shift",
    "Marshall-Lerner Condition — J-Curve",
  ],
};

const DIFFICULTY_LEVELS = ["Foundation", "Intermediate", "Advanced"] as const;

type InputMode = "draw" | "text";

export default function DiagramPractice() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();

  const topics = DIAGRAM_TOPICS[subject] || DIAGRAM_TOPICS.economics;

  const [topic, setTopic] = useState(topics[0]);
  const [difficulty, setDifficulty] = useState<string>("Intermediate");
  const [generatedQ, setGeneratedQ] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>("draw");
  const [diagramImage, setDiagramImage] = useState<string | null>(null);
  const [diagramDesc, setDiagramDesc] = useState("");
  const [explanation, setExplanation] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [step, setStep] = useState<"generate" | "answer" | "feedback">("generate");
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const t = DIAGRAM_TOPICS[subject] || DIAGRAM_TOPICS.economics;
    setTopic(t[0]);
    reset();
  }, [subject]);

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to practice diagrams</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  const diagramsUsed = (profile as any)?.free_diagrams_used ?? 0;
  const canUse = subscribed || (profile && diagramsUsed < FREE_LIMITS.diagrams);

  const generateQuestion = async () => {
    if (!canUse) { setShowUpgrade(true); return; }
    setIsGenerating(true);
    setGeneratedQ("");
    let result = "";

    await streamChat({
      messages: [{ role: "user", content: `Generate a ${difficulty}-level diagram practice question on: "${topic}" for ${examBoard} ${level} ${subjectLabel}.

The question should:
1. Present an economic scenario that requires a diagram to explain
2. Specify what type of diagram is expected (e.g., "Draw and annotate a supply and demand diagram showing...")
3. Ask the student to draw the diagram AND provide a written explanation connecting the diagram to the scenario
4. State the mark allocation (typically 4-8 marks for diagram + explanation)

Format: Give the scenario context, then the question. Nothing else.` }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setGeneratedQ(result); },
      onDone: () => { setIsGenerating(false); setStep("answer"); },
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const markDiagram = async () => {
    setIsMarking(true);
    setFeedback("");
    let result = "";

    const diagramContent = inputMode === "draw" && diagramImage
      ? [
          { type: "text" as const, text: `Question: ${generatedQ}\n\nThe student has drawn a diagram (attached as an image). Please analyse the drawn diagram.\n\nStudent's Written Explanation:\n${explanation}` },
          { type: "image_url" as const, image_url: { url: diagramImage } },
        ]
      : `Question: ${generatedQ}\n\nStudent's Diagram Description:\n${diagramDesc}\n\nStudent's Written Explanation:\n${explanation}`;

    await streamChat({
      messages: [
        { role: "user", content: diagramContent },
        { role: "user", content: `Mark this diagram submission using ${examBoard} ${level} ${subjectLabel} criteria.

You MUST evaluate using ALL 5 diagram marking criteria:

1. **AXES** — Are axes labelled correctly? (e.g., Price/P on Y-axis, Quantity/Q on X-axis; for macro: Price Level & Real GDP)
2. **CURVE DIRECTION** — Are curves sloping the correct way? (Demand downward, Supply upward, LRAS vertical, etc.)
3. **SHIFT DIRECTION** — Does the described shift match the scenario? (Right = increase, Left = decrease)
4. **EQUILIBRIUM** — Is original equilibrium (P1,Q1) marked? Is new equilibrium (P2,Q2) identified with dotted lines to axes?
5. **EXPLANATION ↔ DIAGRAM CONSISTENCY** — Does the written explanation logically match the diagram? Are the direction of changes consistent?

You MUST structure your response using EXACTLY these section headers (the app parses them):

## Your mark: X/Y

State the mark awarded clearly.

## Smart Mark feedback

Give the main feedback summary in 2-3 sentences. Be direct and specific about what the student got right or wrong. Use bullet points for key corrections with **bold** for important terms.

## Explain my feedback

Provide a detailed breakdown of each of the 5 marking criteria. Use tick ✓ or cross ✗ for each:
- **Axes**: ✓/✗ — detail
- **Curve direction**: ✓/✗ — detail  
- **Shift direction**: ✓/✗ — detail
- **Equilibrium**: ✓/✗ — detail
- **Explanation-diagram consistency**: ✓/✗ — detail

## Improve my answer

Give specific, actionable steps to improve. Include:
- What to add or correct in the diagram
- How to strengthen the written explanation
- A memory trick or exam technique tip
- You MUST include a structured diagram block in EXACTLY this format (the app will render it as a visual SVG diagram):

**Diagram: [Diagram Title]**
- X-axis: [label]
- Y-axis: [label]
- Initial curves: [describe D1, S1 etc.]
- Initial equilibrium: [P1, Q1]
- Shift: [which curve shifts which direction, e.g. "Supply shifts left from S1 to S2"]
- New equilibrium: [P2, Q2 and direction of change]
- Key conclusion: [one sentence summary]

Then provide a model written explanation that would score full marks.

Speak directly to the student using "you" and "your". Be encouraging but honest.` }],
      mode: "grade",
      subject,
      onDelta: (chunk) => { result += chunk; setFeedback(result); },
      onDone: async () => {
        setIsMarking(false);
        setStep("feedback");
        if (user) {
          await supabase.from("practice_sessions").insert({
            user_id: user.id,
            subject,
            session_type: "diagram",
            topic,
          });
        }
        if (!subscribed && profile) {
          await supabase.from("profiles").update({ free_diagrams_used: diagramsUsed + 1 } as any).eq("user_id", user.id);
          refreshProfile();
        }
      },
      onError: (err) => { toast.error(err); setIsMarking(false); },
    });
  };

  const reset = () => {
    setStep("generate");
    setGeneratedQ("");
    setDiagramDesc("");
    setDiagramImage(null);
    setExplanation("");
    setFeedback("");
  };

  const hasSubmission = inputMode === "draw" ? !!diagramImage : !!diagramDesc.trim();

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-1">Diagram Practice</h1>
        <p className="text-sm text-muted-foreground">
          {examBoard} {level} {subjectLabel} · {subscribed ? "Unlimited practice" : `${Math.max(0, FREE_LIMITS.diagrams - (profile?.free_questions_used ?? 0))} free attempt(s) remaining`}
        </p>
      </div>


      {step === "generate" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Diagram Topic</label>
              <select value={topic} onChange={e => setTopic(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Difficulty</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {DIFFICULTY_LEVELS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <Button onClick={generateQuestion} disabled={isGenerating || !canUse} className="gap-2">
              <PenTool className="h-4 w-4" />
              {isGenerating ? "Generating..." : canUse ? "Generate Diagram Question" : "Subscribe for More"}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "answer" && (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="font-serif text-lg">Question</CardTitle></CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{generatedQ}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              {/* Mode toggle */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 w-fit">
                <button
                  onClick={() => setInputMode("draw")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    inputMode === "draw" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Pencil className="h-3.5 w-3.5" /> Draw Diagram
                </button>
                <button
                  onClick={() => setInputMode("text")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    inputMode === "text" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <FileText className="h-3.5 w-3.5" /> Describe Diagram
                </button>
              </div>

              {inputMode === "draw" ? (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Draw your diagram below. Use different colours for curves, shifts, and labels. The AI will analyse your drawing.</p>
                  <DrawingCanvas
                    width={700}
                    height={500}
                    showGrid
                    label="Your Diagram"
                    onDrawEnd={(dataUrl) => setDiagramImage(dataUrl)}
                    onSave={(dataUrl) => setDiagramImage(dataUrl)}
                  />
                  {diagramImage && (
                    <p className="text-xs text-accent mt-1">✓ Diagram captured — ready to submit</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium block mb-2">Your Diagram Description</label>
                  <p className="text-xs text-muted-foreground mb-2">Describe your diagram using structured text. Include: axes labels, curve names & slopes, any shifts, equilibrium points, and dotted lines to axes.</p>
                  <Textarea
                    value={diagramDesc}
                    onChange={e => setDiagramDesc(e.target.value)}
                    rows={6}
                    placeholder={`Example:\nX-axis: Quantity (Q)\nY-axis: Price (P)\nDemand curve D1 slopes downward\nSupply curve S1 slopes upward\nInitial equilibrium at P1, Q1\nSupply shifts left from S1 to S2 (due to higher costs)\nNew equilibrium at P2 (higher), Q2 (lower)`}
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium block mb-2">Your Written Explanation</label>
                <p className="text-xs text-muted-foreground mb-2">Explain the economic reasoning that connects to your diagram. Use chains of analysis and refer to your diagram.</p>
                <Textarea
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  rows={6}
                  placeholder="Explain the economic impact shown in your diagram. Reference the shifts, equilibrium changes, and connect to the scenario..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={markDiagram} disabled={isMarking || (!hasSubmission && !explanation.trim())} className="gap-2">
                  <Send className="h-4 w-4" /> {isMarking ? "Marking..." : "Submit for Marking"}
                </Button>
                <Button variant="outline" onClick={reset}>New Question</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === "feedback" && <DiagramFeedbackView
        generatedQ={generatedQ}
        diagramImage={diagramImage}
        inputMode={inputMode}
        diagramDesc={diagramDesc}
        explanation={explanation}
        feedback={feedback}
        onReset={reset}
      />}
    </div>
  );
}

/* ── Smart Mark Feedback Component ── */
function parseFeedbackSections(feedback: string) {
  const sections: { mark: string; smartFeedback: string; explain: string; improve: string } = {
    mark: "",
    smartFeedback: "",
    explain: "",
    improve: "",
  };

  // Split by ## headers
  const markMatch = feedback.match(/## Your mark:\s*([\s\S]*?)(?=##|$)/i);
  const smartMatch = feedback.match(/## Smart Mark feedback\s*([\s\S]*?)(?=## Explain|## Improve|$)/i);
  const explainMatch = feedback.match(/## Explain my feedback\s*([\s\S]*?)(?=## Improve|$)/i);
  const improveMatch = feedback.match(/## Improve my answer\s*([\s\S]*?)$/i);

  if (markMatch) sections.mark = markMatch[1].trim();
  if (smartMatch) sections.smartFeedback = smartMatch[1].trim();
  if (explainMatch) sections.explain = explainMatch[1].trim();
  if (improveMatch) sections.improve = improveMatch[1].trim();

  // Fallback: if no sections found, put everything in smartFeedback
  if (!sections.mark && !sections.smartFeedback && !sections.explain) {
    sections.smartFeedback = feedback;
  }

  return sections;
}

function DiagramFeedbackView({
  generatedQ,
  diagramImage,
  inputMode,
  diagramDesc,
  explanation,
  feedback,
  onReset,
}: {
  generatedQ: string;
  diagramImage: string | null;
  inputMode: InputMode;
  diagramDesc: string;
  explanation: string;
  feedback: string;
  onReset: () => void;
}) {
  const [showExplain, setShowExplain] = useState(false);
  const [showImprove, setShowImprove] = useState(false);
  const sections = useMemo(() => parseFeedbackSections(feedback), [feedback]);

  const renderContent = (text: string) => (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      {extractDiagramBlocks(text).map((seg, i) =>
        seg.type === "diagram" ? (
          <EconDiagramCanvas key={i} diagram={seg.diagram} />
        ) : (
          <ReactMarkdown key={i}>{seg.content}</ReactMarkdown>
        )
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="font-serif text-lg">Question</CardTitle></CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert"><ReactMarkdown>{generatedQ}</ReactMarkdown></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="font-serif text-lg">Your Diagram</CardTitle></CardHeader>
        <CardContent>
          {diagramImage && inputMode === "draw" ? (
            <img src={diagramImage} alt="Your drawn diagram" className="rounded-lg border max-w-full" />
          ) : (
            <p className="text-sm whitespace-pre-wrap">{diagramDesc}</p>
          )}
          {explanation && (
            <>
              <p className="text-sm font-medium mb-1 mt-3">Your Explanation:</p>
              <p className="text-sm whitespace-pre-wrap">{explanation}</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Mark display */}
      {sections.mark && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5">
            <p className="text-xl font-bold text-foreground">Your mark: {sections.mark}</p>
          </CardContent>
        </Card>
      )}

      {/* Smart Mark feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Smart Mark feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent(sections.smartFeedback)}
        </CardContent>
      </Card>

      {/* Explain my feedback — collapsible */}
      {sections.explain && (
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
              {renderContent(sections.explain)}
            </CardContent>
          )}
        </Card>
      )}

      {/* Improve my answer — collapsible */}
      {sections.improve && (
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
              {renderContent(sections.improve)}
            </CardContent>
          )}
        </Card>
      )}

      <Button onClick={onReset} className="gap-2"><PenTool className="h-4 w-4" /> Try Another Diagram</Button>
    </div>
  );
}
