import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Lock, Send, RotateCcw, Pencil, FileText, ChevronDown, ChevronUp, MessageSquare, Lightbulb, BookOpen, Sparkles, Shuffle, Crown } from "lucide-react";
import { toast } from "sonner";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { DrawingCanvas } from "@/components/tools/DrawingCanvas";
import { cn } from "@/lib/utils";
import { extractDiagramBlocks, EconDiagramCanvas } from "@/components/predicted-papers/EconDiagramSVG";
import { resolveDiagramType } from "@/components/revision/EconDiagramLibrary";
import LorenzCurveChart from "@/components/diagrams/LorenzCurveChart";
import LRACDiagram from "@/components/diagrams/LRACDiagram";
import { UpgradeModal } from "@/components/UpgradeModal";
import { diagramScenarios, DIAGRAM_SECTIONS, type DiagramSection, type DiagramScenario, getRandomScenario } from "@/data/diagramScenarios";
import { useDiagramAccess } from "@/hooks/useDiagramAccess";

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
    // Section 1: PPFs, Markets and Allocation
    "PPF — Balanced Growth / Biased Growth / Unemployed Resources",
    "Supply & Demand — Market Equilibrium Change",
    "Indirect Tax & Subsidy",
    // Section 2: Market Failure
    "Negative / Positive Externality (Welfare Loss)",
    "Negative Production Externality (MSC > MPC)",
    // Section 3: Costs & Economies of Scale
    "Short-Run Cost Curves (MC, ATC, AVC)",
    "Long-Run Average Cost (Economies & Diseconomies of Scale)",
    "Short-Run Shutdown Point (P = min AVC)",
    // Section 4: Revenues, Profits & Other Objectives
    "Monopoly — Supernormal Profit (MC = MR)",
    "Perfect Competition — Short Run & Long Run Equilibrium",
    "Monopolistic Competition — Normal Profit / Excess Capacity",
    // Section 5: Market Structures
    "Oligopoly — Kinked Demand Curve",
    "Oligopoly — Game Theory / Payoff Matrix",
    // Section 6: Labour Market
    "Labour Market — Minimum Wage",
    "Labour Market — Monopsony",
    // Macro Section 1: National Income
    "AD/AS — Demand-Pull Inflation",
    "AD/AS — Cost-Push Inflation",
    "AD/AS — Supply-Side Policy Effect",
    "Keynesian AS — Spare Capacity vs Full Employment",
    // Macro Section 2: Macro Objectives
    "Phillips Curve — Short Run vs Long Run",
    "Lorenz Curve & Gini Coefficient",
    // Macro Section 3: Financial Markets
    "Monetary Policy Transmission Mechanism (Flowchart)",
    "Exchange Rate Determination",
    // Macro Section 4: Fiscal & Supply-Side
    "Fiscal Policy Transmission Mechanism (Flowchart)",
    "Multiplier Effect (Flowchart)",
    // Macro Section 5: International Economy
    "Trade Diagram — Effect of Import Quota / Tariff",
    "Terms of Trade",
    "J-Curve Effect (Balance of Payments)",
    // Macro Section 6: Inequality & Development
    "Harrod-Domar Growth Model (Flowchart)",
    "Primary Product Dependency — Volatile Prices",
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

type PracticeMode = "ai" | "scenario";

const inferDiagramType = (...parts: string[]) =>
  resolveDiagramType(parts.filter(Boolean).join("\n")) ?? "supply_demand";

type InputMode = "draw" | "text";

export default function DiagramPractice() {
  const { user } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();

  const topics = DIAGRAM_TOPICS[subject] || DIAGRAM_TOPICS.economics;

  const [practiceMode, setPracticeMode] = useState<PracticeMode>("scenario");
  const [topic, setTopic] = useState(topics[0]);
  const [difficulty, setDifficulty] = useState<string>("Intermediate");
  const [sectionFilter, setSectionFilter] = useState<DiagramSection | "all">("all");
  const [selectedScenario, setSelectedScenario] = useState<DiagramScenario | null>(null);
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

  const {
    isLoading: isAccessLoading,
    isAllowed,
    remainingAttempts,
    isPremium,
    message: accessMessage,
    error: accessError,
    refresh: refreshAccess,
    consumeAttempt,
    resetAttemptsForTesting,
  } = useDiagramAccess();
  const isCertainlyBlocked = !isAccessLoading && !isAllowed && !isPremium;

  const filteredScenarios = useMemo(() => {
    let pool = diagramScenarios;
    if (sectionFilter !== "all") pool = pool.filter(s => s.section === sectionFilter);
    if (difficulty !== "all") pool = pool.filter(s => s.difficulty === difficulty);
    return pool;
  }, [sectionFilter, difficulty]);

  useEffect(() => {
    const t = DIAGRAM_TOPICS[subject] || DIAGRAM_TOPICS.economics;
    setTopic(t[0]);
    setStep("generate");
    setGeneratedQ("");
    setDiagramDesc("");
    setDiagramImage(null);
    setExplanation("");
    setFeedback("");
    setSelectedScenario(null);
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

  const ensureEligible = async () => {
    const latest = await refreshAccess();
    if (!latest.isAllowed && !latest.isPremium) {
      setShowUpgrade(true);
      return false;
    }
    if (latest.isLoading) {
      toast.info("We’re checking your available attempts...");
      return false;
    }
    return true;
  };

  const generateQuestion = async () => {
    if (isGenerating) return;
    if (!(await ensureEligible())) return;
    setIsGenerating(true);
    setGeneratedQ("");
    let result = "";

    const isLorenzTopic = /lorenz|gini|income\s*inequality|income\s*distribution|inequality/i.test(topic);
    const isYEDTopic = /\byed\b|income\s*elasticity/i.test(topic);
    const isXEDTopic = /\bxed\b|cross.*elasticity|complements?\b|substitutes?\b/i.test(topic);
    const isPhillipsTopic = /phillips\s*curve/i.test(topic);
    const isNegExtProd = /negative\s*externality.*production|palm\s*oil|msc.*mpc|overproduction/i.test(topic);
    const isSugarTax = /sugar\s*tax|pigouvian|welfare\s*analysis/i.test(topic);

    let FIGURE_CONTENT_GUIDANCE: string;

    if (isLorenzTopic) {
      FIGURE_CONTENT_GUIDANCE = `
FIGURE CONTENT GUIDANCE (CRITICAL — Lorenz Curve topic detected):
You MUST include exactly ONE Figure 1 block describing a LORENZ CURVE diagram. Do NOT describe supply/demand or any other diagram type.

**Figure 1: Lorenz Curve — Income Distribution**
- Vertical axis: Cumulative % of Income
- Horizontal axis: Cumulative % of Population (Poorest to Richest)
- Line of Perfect Equality: 45-degree straight line from origin to (100,100)
- Lorenz Curve: convex curve bowed below the equality line
- Area A: between the equality line and the Lorenz curve (represents inequality)
- Area B: below the Lorenz curve
- Gini Coefficient = Area A / (Area A + Area B)
Source: Hypothetical scenario for exam practice

If the question involves comparing two countries, describe TWO Lorenz curves: Country A (more equal, closer to line) and Country B (less equal, further from line).
Do NOT mention supply, demand, tax, welfare loss, MC, MR, AC, or any micro/macro diagram.`;
    } else if (isYEDTopic) {
      FIGURE_CONTENT_GUIDANCE = `
FIGURE CONTENT GUIDANCE (CRITICAL — YED topic detected):
You MUST include exactly ONE Figure 1 block describing a YED (Income Elasticity of Demand) diagram.

**Figure 1: YED for a Normal Good and a Luxury Good**
- Vertical axis: Average Income (£) Week
- Horizontal axis: Quantity
- Curve 1: "Demand for Normal Good YED>0" — upward-sloping, STEEP (quantity rises less than proportionally with income)
- Curve 2: "Demand for Luxury Good YED>1" — upward-sloping, FLATTER (quantity rises more than proportionally with income)
- Mark two income levels (e.g. 550, 800) and two quantity levels (e.g. 850, 950) with dashed projections
- Both curves intersect or cross near the lower income level
- At the higher income level, the luxury good curve shows a larger quantity increase
Source: Hypothetical scenario for exam practice

Do NOT draw supply and demand curves. This is an Engel curve / income-quantity diagram.`;
    } else if (isXEDTopic) {
      FIGURE_CONTENT_GUIDANCE = `
FIGURE CONTENT GUIDANCE (CRITICAL — XED / Cross Elasticity topic detected):
You MUST include exactly ONE Figure 1 block describing a Cross-Price Elasticity of Demand diagram.

**Figure 1: Cross-Price Elasticity of Demand**
- Vertical axis: Price of Good Y
- Horizontal axis: Quantity of Good X
- Curve 1: "Positive Cross Price Elasticity (substitutes)" — upward-sloping from bottom-left to top-right (red)
- Curve 2: "Negative Cross Price Elasticity (complements)" — downward-sloping from top-left to bottom-right (blue)
- Mark two price levels: Py1 (lower) and Py2 (higher)
- Mark two quantity levels: Qx1 and Qx2
- Dashed projections from (Qx1, Py1) and (Qx2, Py2)
- Show XED calculation: % change in Qd of X / % change in price of Y
- Substitutes: εxy > 0 (price of Y rises → Qty of X rises)
- Complements: εxy < 0 (price of Y rises → Qty of X falls)
Source: Hypothetical scenario for exam practice

Do NOT draw standard supply and demand curves.`;
    } else if (isPhillipsTopic) {
      FIGURE_CONTENT_GUIDANCE = `
FIGURE CONTENT GUIDANCE (CRITICAL — Phillips Curve topic detected):
You MUST include exactly ONE Figure 1 block describing a DUAL-PANEL Phillips Curve diagram.

**Figure 1: Phillips Curve Short/Long Run**

Diagram A — AD/AS:
- Vertical axis: PL (Price Level)
- Horizontal axis: Real GDP
- LRAS₁: vertical line at YFe (full employment output)
- SRAS₁: upward-sloping short-run aggregate supply
- SRAS₂: shifted left (higher costs from wage adjustment)
- AD₁: downward-sloping aggregate demand (original)
- AD₂: shifted right (expansionary policy)
- Equilibria: Pe at (YFe, Pe), then P2 at (Y2, P2), then P3 at (YFe, P3)

Diagram B — Phillips Curve:
- Vertical axis: Inflation (%)
- Horizontal axis: Unemployment (%)
- LRPC₁: vertical at natural rate (e.g. 5%)
- SRPC₁: downward-sloping short-run Phillips Curve
- SRPC₂: shifted upward (higher inflation expectations)
- Point A: (5%, 3%) — initial equilibrium on SRPC₁
- Point B: (3%, 4%) — movement along SRPC₁ (lower unemployment, higher inflation)
- Point C: (5%, 5%) — long-run adjustment on SRPC₂ (unemployment returns to natural rate)
Source: Hypothetical scenario for exam practice

Show BOTH diagrams side by side. The AD/AS diagram explains WHY the Phillips Curve shifts.`;
    } else if (isNegExtProd || isSugarTax) {
      FIGURE_CONTENT_GUIDANCE = `
FIGURE CONTENT GUIDANCE (CRITICAL — Negative Externality of Production topic detected):
You MUST include exactly ONE Figure 1 block describing a negative production externality diagram.

**Figure 1: Negative Externality of Production**
- Vertical axis: MC/MB ($) or P
- Horizontal axis: Quantity
- Curve 1: MSC (Social Marginal Cost) — upward-sloping, ABOVE the supply curve (steeper)
- Curve 2: S = MPC (Private Marginal Cost) — upward-sloping supply curve
- Curve 3: D = MPB = MSB — downward-sloping demand curve
- The vertical gap between MSC and MPC = "Negative externality per unit"
- Private equilibrium at Qp, Pp (where MPC = MPB)
- Social optimum at Qs, Ps (where MSC = MSB), with Qs < Qp and Ps > Pp
- Shade the deadweight welfare loss TRIANGLE between MSC and MPB from Qs to Qp
Source: Hypothetical scenario for exam practice

Do NOT draw an indirect tax wedge diagram. This is an externality diagram with MSC above MPC.`;
    } else {
      FIGURE_CONTENT_GUIDANCE = `
FIGURE CONTENT GUIDANCE (CRITICAL — the app renders these as interactive charts/diagrams):
You MUST include exactly ONE Figure 1 block in the question using this format:

**Figure 1: [Descriptive title for the diagram]**
- Vertical axis: [Y-axis label, e.g. Price (P), Price Level, Cost/Revenue]
- Horizontal axis: [X-axis label, e.g. Quantity (Q), Real GDP, Output]
- [Curve 1 name] slopes [direction] (e.g. D₁ slopes downward from left to right)
- [Curve 2 name] slopes [direction] (e.g. S₁ slopes upward from left to right)
- Initial equilibrium at [label, e.g. E₁]: price P₁, quantity Q₁
- [If shift required]: [Curve] shifts [direction] from [old label] to [new label] due to [reason]
- [If shift required]: New equilibrium at [label, e.g. E₂]: price P₂, quantity Q₂
- [If shaded area relevant]: Shaded area represents [welfare loss/gain/tax revenue/deadweight loss]
Source: Hypothetical scenario for exam practice

The figure must be scenario-specific — include the exact curves, labels, and shifts that match the economic context described in the question.`;
    }

    await streamChat({
      messages: [{ role: "user", content: `Generate a ${difficulty}-level diagram practice question on: "${topic}" for ${examBoard} ${level} ${subjectLabel}.

The question should:
1. Present an economic scenario that requires a diagram to explain
2. Include a Figure 1 block showing the initial market/macro conditions as structured text (axes, curves, equilibrium)
3. Specify what type of diagram is expected (e.g., "Draw and annotate a supply and demand diagram showing...")
4. Ask the student to draw the diagram AND provide a written explanation connecting the diagram to the scenario
5. State the mark allocation (typically 4-8 marks for diagram + explanation)
${FIGURE_CONTENT_GUIDANCE}

Format: Give the scenario context with Figure 1, then the question. Nothing else.` }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setGeneratedQ(result); },
      onDone: () => { setIsGenerating(false); setStep("answer"); },
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const startScenario = async (scenario: DiagramScenario) => {
    if (!(await ensureEligible())) return;
    setSelectedScenario(scenario);
    setGeneratedQ(`**${scenario.topic}**\n\n${scenario.scenario}\n\n${scenario.question}`);
    setStep("answer");
  };

  const startRandomScenario = async () => {
    const filters: { section?: DiagramSection; difficulty?: string } = {};
    if (sectionFilter !== "all") filters.section = sectionFilter;
    if (difficulty !== "all") filters.difficulty = difficulty;
    const scenario = getRandomScenario(filters);
    await startScenario(scenario);
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

    const expectedDiagramType = selectedScenario?.expectedDiagramKeyword ?? inferDiagramType(topic, generatedQ, diagramDesc, explanation);

    // ── Topic-specific rubric: Lorenz Curve / Gini ──
    const isLorenzTopic = expectedDiagramType === "lorenz_curve" ||
      /lorenz|gini|income\s*inequality|income\s*distribution|cumulative\s*%\s*of\s*(income|population)|45[\s-]*degree|line\s*of\s*(perfect\s*)?equality/i.test(generatedQ + " " + topic);

    const lorenzRubric = `
CRITICAL TOPIC LOCK: This is a LORENZ CURVE / GINI COEFFICIENT question.
You MUST ONLY evaluate against the Lorenz Curve rubric below. Do NOT mention or reference:
- supply and demand, S1, D, D1
- indirect tax, ad valorem tax, specific tax
- welfare loss, deadweight loss
- AC, MC, MR, AR
- monopoly, oligopoly, perfect competition
- PED, YED, XED
- any micro/macro diagram that is NOT a Lorenz Curve
If any of these terms appear in your feedback, you have made an error — remove them.

Detected topic: Income inequality — Lorenz Curve / Gini coefficient
Expected diagram: Lorenz Curve with 45-degree line of equality

You MUST evaluate using ALL 6 Lorenz Curve marking criteria:

1. **AXES** — X-axis = "Cumulative % of Population" (poorest to richest), Y-axis = "Cumulative % of Income"
2. **LINE OF EQUALITY** — 45-degree straight line from origin to (100,100) present and labelled "Line of Perfect Equality"
3. **CURVE SHAPE** — Lorenz curve is convex to the origin (bowed BELOW the equality line). A hump-shaped or concave curve is WRONG.
4. **COMPARISON** (if question requires two countries) — Two curves drawn: Country A (more equal) closer to equality line, Country B (less equal) further away. Both clearly labelled.
5. **GINI EXPLANATION** — Larger gap between curve and equality line = higher Gini = more inequality. Smaller gap = lower Gini = more equality. Gini = Area A / (Area A + Area B).
6. **EXPLANATION ↔ DIAGRAM CONSISTENCY** — Written explanation matches the diagram drawn. If student says "Country A is more equal" then Country A's curve must be closer to the line.`;

    const standardRubric = `
You MUST evaluate using ALL 5 diagram marking criteria:

1. **AXES** — Are axes labelled correctly? (e.g., Price/P on Y-axis, Quantity/Q on X-axis; for macro: Price Level & Real GDP)
2. **CURVE DIRECTION** — Are curves sloping the correct way? (Demand downward, Supply upward, LRAS vertical, etc.)
3. **SHIFT DIRECTION** — Does the described shift match the scenario? (Right = increase, Left = decrease)
4. **EQUILIBRIUM** — Is original equilibrium (P1,Q1) marked? Is new equilibrium (P2,Q2) identified with dotted lines to axes?
5. **EXPLANATION ↔ DIAGRAM CONSISTENCY** — Does the written explanation logically match the diagram? Are the direction of changes consistent?`;

    const rubric = isLorenzTopic ? lorenzRubric : standardRubric;

    await streamChat({
      messages: [
        { role: "user", content: diagramContent },
        { role: "user", content: `Mark this diagram submission using ${examBoard} ${level} ${subjectLabel} criteria.

${rubric}

You MUST structure your response using EXACTLY these section headers (the app parses them):

## Your mark: X/Y

State the mark awarded clearly.

## Smart Mark feedback

Give the main feedback summary in 2-3 sentences. Be direct and specific about what the student got right or wrong. Use bullet points for key corrections with **bold** for important terms.

## Explain my feedback

Provide a detailed breakdown of each marking criterion. Use tick ✓ or cross ✗ for each.

## Improve my answer

Give specific, actionable steps to improve. Include:
- What to add or correct in the diagram
- How to strengthen the written explanation
- A memory trick or exam technique tip
- You MUST include exactly ONE structured diagram block using this exact keyword: 
  ### Diagram: ${expectedDiagramType}
- Do NOT use placeholders like [Diagram Title] and do NOT use a different diagram keyword.
${isLorenzTopic ? `- For Lorenz Curve, use this structure:

### Diagram: lorenz_curve
- X-axis: Cumulative % of Population
- Y-axis: Cumulative % of Income
- Line of Perfect Equality: 45-degree line from origin
- Lorenz Curve: convex below equality line
- Key conclusion: The further the curve bows from the equality line, the greater income inequality` : `- Use this exact structure (the app parses it):

### Diagram: ${expectedDiagramType}
- X-axis: [label]
- Y-axis: [label]
- Initial curves: [describe D1, S1 etc.]
- Initial equilibrium: [P1, Q1]
- Shift: [which curve shifts which direction, e.g. "Supply shifts left from S1 to S2"]
- New equilibrium: [P2, Q2 and direction of change]
- Key conclusion: [one sentence summary]`}

Then provide a model written explanation that would score full marks.

IMPORTANT: Do NOT include any "Key Point" or "Exam Tip" blocks in your response. Do NOT use "📝 Key Point:" or "💡 Exam Tip:" callouts. Keep your feedback structured using ONLY the section headers above.

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
        await consumeAttempt();
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
    setSelectedScenario(null);
  };

  const hasSubmission = inputMode === "draw" ? !!diagramImage : !!diagramDesc.trim();

  const handleDevReset = async () => {
    const ok = await resetAttemptsForTesting();
    if (ok) toast.success("Diagram attempts reset for testing.");
    else toast.error("Unable to reset attempts.");
  };

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-1">Diagram Practice</h1>
        <p className="text-sm text-muted-foreground">
          {examBoard} {level} {subjectLabel} · {accessMessage}
        </p>
      </div>

      {step === "generate" && (
        <div className="space-y-4">
          {/* Mode toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 w-fit">
            <button
              onClick={() => setPracticeMode("scenario")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                practiceMode === "scenario" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BookOpen className="h-3.5 w-3.5" /> Exam Scenarios
            </button>
            <button
              onClick={() => setPracticeMode("ai")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                practiceMode === "ai" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" /> AI Generated
            </button>
          </div>

          <div className="rounded-md border border-border/60 bg-card/50 px-3 py-2">
            <p className={cn("text-xs", isAccessLoading ? "text-muted-foreground animate-pulse" : "text-muted-foreground")}>{accessMessage}</p>
            {import.meta.env.DEV && accessError && (
              <p className="text-xs text-destructive mt-1">Debug: {accessError}</p>
            )}
          </div>

          {practiceMode === "scenario" ? (
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-xs text-muted-foreground">
                  Real-world scenario-based diagram questions modelled on exam practice books. Read the context, then draw & explain.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Section</label>
                    <select
                      value={sectionFilter}
                      onChange={e => setSectionFilter(e.target.value as DiagramSection | "all")}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="all">All Sections</option>
                      {DIAGRAM_SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Difficulty</label>
                    <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      {DIFFICULTY_LEVELS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <Button onClick={() => void startRandomScenario()} disabled={filteredScenarios.length === 0 || isCertainlyBlocked} className="gap-2 w-full">
                  <Shuffle className="h-4 w-4" /> Random Scenario ({filteredScenarios.length} available)
                </Button>

                {/* Scenario list */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {filteredScenarios.map(s => (
                    <button
                      key={s.id}
                      onClick={() => void startScenario(s)}
                      disabled={isCertainlyBlocked}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all group",
                        isCertainlyBlocked && "opacity-60 cursor-not-allowed hover:border-border/60 hover:bg-transparent"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">{s.topic}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{s.scenario}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded",
                            s.difficulty === "Foundation" ? "bg-accent/20 text-accent-foreground" :
                            s.difficulty === "Intermediate" ? "bg-secondary text-secondary-foreground" :
                            "bg-destructive/10 text-destructive"
                          )}>{s.difficulty}</span>
                          <span className="text-[10px] font-bold text-muted-foreground">[{s.marks}]</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
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
                {!isCertainlyBlocked ? (
                  <Button onClick={generateQuestion} disabled={isGenerating} className="gap-2">
                    <PenTool className="h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate Diagram Question"}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{accessMessage}</p>
                    <Button onClick={() => setShowUpgrade(true)} variant="default" className="gap-2 w-full bg-gradient-to-r from-primary to-primary/80">
                      <Crown className="h-4 w-4" /> Upgrade to Unlock Unlimited Diagrams
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {import.meta.env.DEV && (
            <Card className="border-dashed border-border/70">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground">Dev-only testing helpers · Remaining: {remainingAttempts ?? "∞"}</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => void refreshAccess()} className="gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" /> Refresh eligibility
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => void handleDevReset()}>
                    Reset diagram attempts
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {step === "answer" && (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="font-serif text-lg">Question</CardTitle></CardHeader>
            <CardContent>
              <MathsMarkdown className="prose prose-sm max-w-none dark:prose-invert">{generatedQ}</MathsMarkdown>
              {selectedScenario?.hints && selectedScenario.hints.length > 0 && (
                <details className="mt-3">
                  <summary className="text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">💡 Show hints</summary>
                  <ul className="mt-2 space-y-1">
                    {selectedScenario.hints.map((h, i) => (
                      <li key={i} className="text-xs text-muted-foreground pl-3 border-l-2 border-primary/30">{h}</li>
                    ))}
                  </ul>
                </details>
              )}
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
        topic={topic}
        generatedQ={generatedQ}
        diagramImage={diagramImage}
        inputMode={inputMode}
        diagramDesc={diagramDesc}
        explanation={explanation}
        feedback={feedback}
        onReset={reset}
      />}
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} feature="diagram practice sessions" />
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
  topic,
  generatedQ,
  diagramImage,
  inputMode,
  diagramDesc,
  explanation,
  feedback,
  onReset,
}: {
  topic: string;
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
  const expectedDiagramType = inferDiagramType(topic, generatedQ, diagramDesc, explanation);

  // Determine if we should show a dedicated reference diagram component
  const isLorenzTopic = /lorenz|gini|income\s*inequality|income\s*distribution/i.test(topic);
  const isLRACTopic = /lrac|long.run average cost|economies.*scale|diseconomies|envelope/i.test(topic);

  const ReferenceDiagram = ({ locked = false }: { locked?: boolean }) => {
    if (isLorenzTopic) return <LorenzCurveChart showRegionsToggle={!locked} showRefToggle={!locked} height={locked ? 390 : 420} className="mt-3" />;
    if (isLRACTopic) return <LRACDiagram className="mt-3" />;
    return null;
  };
  const hasReferenceDiagram = isLorenzTopic || isLRACTopic;

  // Aggressively strip ALL Key Point and Exam Tip blocks (any format)
  const stripAnnotations = (t: string) => {
    const lines = t.split("\n");
    const result: string[] = [];
    let skipping = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const stripped = line.replace(/^>\s*/, "").trim();

      // Detect start of a Key Point or Exam Tip block (any emoji/markdown variant)
      const isAnnotationHeader =
        /📝\s*\*{0,2}Key\s*Point\*{0,2}/i.test(stripped) ||
        /💡\s*\*{0,2}Exam\s*Tip\*{0,2}/i.test(stripped) ||
        /^\*{0,2}Key\s*Point:?\*{0,2}/i.test(stripped) ||
        /^\*{0,2}Exam\s*Tip:?\*{0,2}/i.test(stripped) ||
        /^#{1,4}\s*Key\s*Point/i.test(stripped) ||
        /^#{1,4}\s*Exam\s*Tip/i.test(stripped) ||
        /^#{1,4}\s*💡/i.test(stripped) ||
        /^#{1,4}\s*📝/i.test(stripped) ||
        /^>\s*\*{0,2}Key\s*Point/i.test(stripped) ||
        /^>\s*\*{0,2}Exam\s*Tip/i.test(stripped) ||
        /^Key\s*Point\s*[:\-]/i.test(stripped) ||
        /^Exam\s*Tip\s*[:\-]/i.test(stripped) ||
        /^⚠️?\s*\*{0,2}Exam\s*Tip/i.test(stripped) ||
        /^\*{0,2}⚠\s*Exam\s*Tip/i.test(stripped);

      if (isAnnotationHeader) {
        skipping = true;
        continue;
      }

      // If skipping, continue until we hit an empty line, a new heading, or a new section marker
      if (skipping) {
        if (stripped === "" || /^#{1,4}\s/.test(stripped) || /^\*\*[A-Z]/.test(stripped)) {
          skipping = false;
          if (stripped !== "") {
            result.push(line);
          }
        }
        continue;
      }

      result.push(line);
    }

    return result.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  };

  const stripLorenzTaxArtifacts = (t: string) => {
    if (!isLorenzTopic) return t;

    const taxArtifactPattern = /(effect of an indirect tax|ad valorem|indirect tax|tax incidence|welfare loss|s(?:1|₁)\s*\+|(?:^|\W)d(?:1|₁)(?:\W|$)|(?:^|\W)s(?:1|₁)(?:\W|$)|(?:^|\W)e(?:1|₁|2|₂)(?:\W|$))/i;

    const cleanedParagraphs = t
      .split(/\n\s*\n/)
      .filter((paragraph) => !taxArtifactPattern.test(paragraph.trim()));

    return cleanedParagraphs
      .join("\n\n")
      .split("\n")
      .filter((line) => !taxArtifactPattern.test(line.trim()))
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  };

  const smartFeedbackText = isLorenzTopic ? stripLorenzTaxArtifacts(sections.smartFeedback) : sections.smartFeedback;
  const explainFeedbackText = isLorenzTopic ? stripLorenzTaxArtifacts(sections.explain) : sections.explain;

  const renderContent = (text: string) => {
    if (hasReferenceDiagram) {
      // For topics with dedicated reference diagrams, skip ALL diagram extraction
      // and render pure text only — this prevents cross-topic contamination
      // (e.g. Ad Valorem tax diagram appearing in Lorenz Curve feedback)
      return (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <MathsMarkdown suppressDiagrams>{stripAnnotations(text)}</MathsMarkdown>
        </div>
      );
    }

    const segments = extractDiagramBlocks(stripAnnotations(text), {
      contextText: `${topic}\n${generatedQ}`,
      fallbackType: expectedDiagramType,
    });

    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        {segments.map((seg, i) =>
          seg.type === "diagram" ? (
            <EconDiagramCanvas key={i} diagram={seg.diagram} />
          ) : (
            <MathsMarkdown key={i}>{seg.content}</MathsMarkdown>
          )
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="font-serif text-lg">Question</CardTitle></CardHeader>
        <CardContent>
          <MathsMarkdown className="prose prose-sm max-w-none dark:prose-invert">{generatedQ}</MathsMarkdown>
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
          {renderContent(smartFeedbackText)}
          {isLorenzTopic && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Reference Diagram</p>
              <ReferenceDiagram />
            </div>
          )}
          {isLRACTopic && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Reference Diagram</p>
              <ReferenceDiagram />
            </div>
          )}
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
              {renderContent(explainFeedbackText)}
              {hasReferenceDiagram && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Reference Diagram</p>
                  <ReferenceDiagram locked />
                </div>
              )}
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
              {hasReferenceDiagram && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Reference Diagram</p>
                  <ReferenceDiagram locked />
                  {isLorenzTopic && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="rounded-lg border border-border/50 p-3">
                        <p className="text-sm font-semibold" style={{ color: "#4ade80" }}>Country A</p>
                        <p className="text-xs text-muted-foreground mt-1">Gini ≈ 0.29 — curve stays close to the diagonal line of equality, indicating relatively low income inequality.</p>
                      </div>
                      <div className="rounded-lg border border-border/50 p-3">
                        <p className="text-sm font-semibold" style={{ color: "#fb923c" }}>Country B</p>
                        <p className="text-xs text-muted-foreground mt-1">Gini ≈ 0.56 — curve bows sharply toward the bottom-right, indicating significantly higher income inequality.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}

      <Button onClick={onReset} className="gap-2"><PenTool className="h-4 w-4" /> Try Another Diagram</Button>
    </div>
  );
}
