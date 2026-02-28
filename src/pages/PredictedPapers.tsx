import { useState, useCallback, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Lock, Sparkles, RotateCcw, ArrowRight, Library, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { FREE_LIMITS } from "@/lib/plans";
import { PaperSelector } from "@/components/predicted-papers/PaperSelector";
import { TierSelector } from "@/components/predicted-papers/TierSelector";
import { QuestionCard } from "@/components/predicted-papers/QuestionCard";
import { parseQuestions, type ParsedQuestion } from "@/components/predicted-papers/parseQuestions";
import { paperOptionsBySubject } from "@/lib/subjectConfig";
import { predictedPapersLibrary, type PredictedPaper } from "@/data/predictedPapersLibrary";

type QuestionFeedback = {
  markScheme: string;
  modelAnswer: string;
  examinerTip: string;
};

const MATHS_PAPER_PROMPT = (paperLabel: string, isCalc: boolean, tier: "Foundation" | "Higher") => {
  const tierDesc = tier === "Foundation"
    ? "Foundation tier (targeting grades 1–5). Questions should be accessible and build gradually. Include standard procedural questions, real-life context problems, and some reasoning questions. Avoid higher-only topics like surds, circle theorems, sine/cosine rule, and algebraic proof."
    : "Higher tier (targeting grades 4–9). Include a good mix of difficulty. Start with accessible crossover questions (grades 4–5), build through grades 6–7 questions, and finish with challenging grade 8–9 questions including proof, circle theorems, iteration, algebraic fractions, and advanced trigonometry.";

  return `Generate a full, realistic Edexcel GCSE Maths (1MA1) predicted exam paper for ${paperLabel}.

TIER: ${tierDesc}

CALCULATOR: ${isCalc ? "YES — this is a CALCULATOR paper. Questions can involve complex arithmetic, trigonometry with decimals, statistical calculations, and iterative methods." : "NO — this is a NON-CALCULATOR paper. All arithmetic must be manageable by hand. Focus on fractions, mental methods, estimation, exact values, and algebraic manipulation."}

STRUCTURE (match real Edexcel papers exactly):
- 20–25 questions, numbered sequentially
- Total: 80 marks
- Questions progress from easy (1–2 marks) to hard (5–6 marks)
- Multi-part questions should use (a), (b), (c) labelling
- Include a variety of command words: "Work out", "Calculate", "Show that", "Prove", "Explain why", "Give a reason"

QUESTION TYPES TO INCLUDE:
1. **Number & calculation**: fractions, percentages, ratio, proportion, standard form, indices
2. **Algebra**: solving equations, inequalities, sequences, rearranging formulae, simultaneous equations${tier === "Higher" ? ", algebraic fractions, iteration" : ""}
3. **Graphs**: interpret or sketch ${isCalc ? "scatter graphs, cumulative frequency, histograms" : "linear graphs, quadratic sketches, real-life graphs"}${tier === "Higher" ? ", describe transformations of graphs" : ""}
4. **Geometry**: angles, area/perimeter, volume, Pythagoras, trigonometry${tier === "Higher" ? ", circle theorems, vectors, congruence/similarity proofs" : ""}
5. **Statistics & Probability**: averages, probability trees/Venn diagrams, relative frequency${tier === "Higher" ? ", conditional probability, histograms with frequency density" : ""}
6. **Problem-solving**: at least 3–4 questions requiring multi-step reasoning with "Show that" or contextual scenarios

FOR GRAPH/DIAGRAM QUESTIONS (CRITICAL — include at least 4):
1. **Coordinate graphs**: Describe graphs with specific coordinates, axes, and features. Ask students to read values, draw tangents, or sketch transformations
2. **Statistical diagrams**: Include questions that describe scatter diagrams, cumulative frequency, box plots, histograms, or pie charts with specific data
3. **Geometry diagrams**: Describe shapes with specific measurements (cylinders, trapezoids, triangles). Ask students to calculate areas, volumes, or pressures from the diagram data
4. **Real-life graphs**: Include velocity-time, distance-time, depth-time, or conversion graphs. Ask students to calculate rates of change, areas under curves, or interpret features
5. **Value for money / comparison**: Include at least one question where students compare unit prices from different pack sizes (similar to real Edexcel papers)
6. **Function graphs**: Describe quadratic, cubic, or trigonometric graphs with key points. Ask students to solve equations graphically, identify features, or sketch transformations
Students should be able to answer based on your text description of the diagram/graph.

IMPORTANT FORMATTING: Each question MUST follow this exact pattern on its own line:
Question 1 [2 marks]
Question 2 [3 marks]
Question 3a [1 marks]
Question 3b [2 marks]

Do NOT wrap question headers in bold/asterisks. Write them exactly as shown above.
Make questions topical, realistic, and exam-authentic.`;
};

const ECON_PAPER_PROMPT = (paperLabel: string) =>
  `Generate a full AQA A-Level Economics predicted exam paper for ${paperLabel}.

This must be a realistic, full-length predicted paper in the exact AQA format:
- For Paper 1 & 2: Include Section A (data response with context/extract, data tables, and short-answer questions) AND Section B (essay questions worth 25 marks each, with "Discuss", "Evaluate", or "To what extent" stems). Total marks should be 80.
- For Paper 3: Include Section A (multiple choice, 30 questions worth 1 mark each) AND Section B (case study with data response questions and an essay question). Total marks should be 80.

DIAGRAM & GRAPH QUESTIONS (CRITICAL — include at least 3):
1. **Supply/demand diagram questions**: "Using a supply and demand diagram, explain..." — ask students to draw/label shifts, shade surplus/deadweight loss areas
2. **AD/AS diagram questions**: "Using an AD/AS diagram, illustrate the impact of..." — for Paper 2, include questions on demand-pull vs cost-push inflation, fiscal/monetary policy effects
3. **Data interpretation**: Include tables with real-looking economic data. Ask students to calculate percentage changes, interpret trends, and link data to theory
4. **Welfare analysis diagrams**: Consumer surplus, producer surplus, deadweight loss for market failure questions
5. **Market structure diagrams**: For Paper 1, include at least one question requiring a monopoly/oligopoly diagram or cost curve diagram

MACROECONOMIC ANALYSIS (for Paper 2 specifically):
- Include questions on AD/AS shifts with diagram requirements
- Include multiplier effect analysis
- Include Phillips Curve or Keynesian/Classical debate questions
- Include trade/exchange rate diagram questions
- Reference real macroeconomic data (GDP, inflation, unemployment, interest rates)

IMPORTANT FORMATTING: Each question MUST follow this exact format on its own line:
Question 1.1 [2 marks]
Question 1.2 [4 marks]
etc.

Include any data/extracts needed before the questions. Make questions topical based on likely 2025 exam themes. Format clearly with headings for each section.`;

const CHEM_PAPER_PROMPT = (paperLabel: string, tier: "Foundation" | "Higher") => {
  const tierDesc = tier === "Foundation"
    ? "Foundation tier (grades 1–5). Avoid higher-only content like moles calculations and titration calculations."
    : "Higher tier (grades 4–9). Include moles calculations, concentration, titration, rate tangent method.";
  return `Generate a full AQA GCSE Chemistry (8462) predicted exam paper for ${paperLabel}.
TIER: ${tierDesc}
STRUCTURE: Total 100 marks. Mix of multiple choice (~15 marks) and structured questions (~85 marks). Include a 6-mark extended response. Multi-part questions use (a), (b), (c).
Include balanced equations with state symbols. Use correct formulae.

GRAPH & DIAGRAM QUESTIONS (CRITICAL — include at least 4):
1. **Reaction profile diagrams**: Describe a reaction profile (energy vs progress of reaction). Ask students to label activation energy and overall energy change, or compare catalysed vs uncatalysed profiles
2. **Rate of reaction graphs**: Volume of gas vs time, or mass vs time graphs. Ask students to sketch curves for different temperatures/concentrations/surface areas. For Higher: include tangent method to calculate rate at a specific time
3. **Dot-and-cross diagrams**: Ask students to draw bonding diagrams for ionic and covalent compounds
4. **Chromatography results**: Describe chromatograms and ask students to calculate Rf values and identify substances
5. **Data tables**: Include titration results tables, temperature change data, and ask students to process the data
6. **Energy level diagrams**: Show exothermic/endothermic energy profiles and ask students to annotate them
7. **Haber process yield graphs** (Higher only): Temperature vs yield at different pressures

IMPORTANT FORMATTING: Each question MUST follow this exact pattern:
Question 1 [1 marks]
Question 2 [2 marks]
Question 3a [1 marks]
Question 3b [3 marks]
Make questions exam-authentic.`;
};

export default function PredictedPapers() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"library" | "generate">("library");
  const [paper, setPaper] = useState("1");
  const [tier, setTier] = useState<"Foundation" | "Higher">("Higher");
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<"select" | "paper">("select");

  const [selectedLibraryPaper, setSelectedLibraryPaper] = useState<PredictedPaper | null>(null);
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [paperContext, setPaperContext] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, QuestionFeedback>>({});
  const [markingId, setMarkingId] = useState<string | null>(null);

  const used = (profile as any)?.free_predicted_papers_used ?? 0;
  const canUse = subscribed || used < FREE_LIMITS.predictedPapers;
  const remaining = FREE_LIMITS.predictedPapers - used;

  const paperOptions = paperOptionsBySubject[subject];
  const isMaths = subject === "maths";
  const isChemistry = subject === "chemistry";
  const isEconomics = subject === "economics";

  const libraryPapers = useMemo(
    () => predictedPapersLibrary.filter((p) => p.subject === subject),
    [subject]
  );

  useEffect(() => { reset(); }, [subject]);

  const openLibraryPaper = (lp: PredictedPaper) => {
    setSelectedLibraryPaper(lp);
    const { context, questions } = parseQuestions(lp.content);
    setPaperContext(context);
    setParsedQuestions(questions);
    setAnswers({});
    setFeedbacks({});
    setMarkingId(null);
    setStep("paper");
  };

  const generatePaper = async () => {
    if (!canUse) {
      toast.error("Free predicted paper limit reached. Subscribe for unlimited access.");
      navigate("/pricing");
      return;
    }
    setIsGenerating(true);
    setGeneratedPaper("");
    setSelectedLibraryPaper(null);
    let result = "";

    const selectedPaper = paperOptions.find((p) => p.value === paper);
    const paperLabel = selectedPaper ? `${selectedPaper.label}: ${selectedPaper.title}` : `Paper ${paper}`;
    const isCalc = paper !== "1";

    const prompt = isMaths
      ? MATHS_PAPER_PROMPT(paperLabel, isCalc, tier)
      : isChemistry
      ? CHEM_PAPER_PROMPT(paperLabel, tier)
      : ECON_PAPER_PROMPT(paperLabel);

    await streamChat({
      messages: [{ role: "user", content: prompt }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setGeneratedPaper(result); },
      onDone: () => {
        setIsGenerating(false);
        const { context, questions } = parseQuestions(result);
        setPaperContext(context);
        setParsedQuestions(questions);
        setStep("paper");
      },
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const markQuestion = useCallback(
    async (question: ParsedQuestion) => {
      const answer = answers[question.id];
      if (!answer?.trim()) { toast.error("Please write your answer first."); return; }
      setMarkingId(question.id);

      const markingPrompt = isMaths
        ? `You are marking an Edexcel GCSE Maths (${tier} tier) answer.

Here is the context from the paper:
${paperContext}

Here is the question:
${question.label} [${question.marks} marks]
${question.text}

Here is the student's answer:
${answer}

Mark this answer using Edexcel mark scheme criteria. Award marks using:
- **M marks** (method) — for correct approach/strategy
- **A marks** (accuracy) — for correct answers following correct method
- **B marks** (independent) — for correct results independent of method

You MUST respond in this EXACT structure:

## Mark Scheme
Give a mark out of ${question.marks}. List each M/A/B mark and whether it was awarded. If a mark was lost, explain exactly why. Use "you" and "your" — speak directly to the student.

## Model Answer
Write a full model answer that would score ${question.marks}/${question.marks}. Show ALL working step by step. Use proper mathematical notation.

## Examiner Tip
Give 2–3 specific, actionable tips. Mention common mistakes to avoid. Address the student directly.`
        : `You are marking an AQA A-Level Economics answer.

Here is the context from the paper:
${paperContext}

Here is the question:
${question.label} [${question.marks} marks]
${question.text}

Here is my answer:
${answer}

Mark my answer using AQA mark scheme criteria. You MUST respond in this exact structure:

## Mark Scheme
Give me a mark out of ${question.marks}. Explain the marking criteria and how my answer maps to each level/band. Speak DIRECTLY to me using "you" and "your".

## Model Answer
Write a full top-band model answer that would score full marks for this question.

## Examiner Tip
Give 2-3 specific, actionable tips for how I can improve. Address me directly. Be encouraging but honest about where I lost marks.`;

      let result = "";
      await streamChat({
        messages: [{ role: "user", content: markingPrompt }],
        mode: "grade",
        subject,
        onDelta: (chunk) => { result += chunk; },
        onDone: async () => {
          const markSchemeMatch = result.match(/## Mark Scheme\s*([\s\S]*?)(?=## Model Answer|$)/i);
          const modelAnswerMatch = result.match(/## Model Answer\s*([\s\S]*?)(?=## Examiner Tip|$)/i);
          const examinerTipMatch = result.match(/## Examiner Tip\s*([\s\S]*?)$/i);

          setFeedbacks((prev) => ({
            ...prev,
            [question.id]: {
              markScheme: markSchemeMatch?.[1]?.trim() || result,
              modelAnswer: modelAnswerMatch?.[1]?.trim() || "",
              examinerTip: examinerTipMatch?.[1]?.trim() || "",
            },
          }));
          setMarkingId(null);

          if (!subscribed && Object.keys(feedbacks).length === 0) {
            await supabase
              .from("profiles")
              .update({ free_predicted_papers_used: used + 1 } as any)
              .eq("user_id", user.id);
            refreshProfile();
          }
        },
        onError: (err) => { toast.error(err); setMarkingId(null); },
      });
    },
    [answers, paperContext, feedbacks, subscribed, used, user?.id, refreshProfile, subject, tier, isMaths]
  );

  const reset = () => {
    setStep("select");
    setGeneratedPaper("");
    setSelectedLibraryPaper(null);
    setParsedQuestions([]);
    setPaperContext("");
    setAnswers({});
    setFeedbacks({});
    setMarkingId(null);
  };

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to access Predicted Papers</h1>
        <p className="text-muted-foreground mb-6">Generate AI-predicted exam papers with full marking and model solutions.</p>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted text-muted-foreground rounded-full px-3 py-1 mb-4">
          <FileText className="h-3.5 w-3.5" /> {examBoard} {level} {subjectLabel}
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Predicted Papers</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Choose from our library of 10 ready-made predicted papers or generate a fresh one with AI.
        </p>
      </div>

      {step === "select" && (
        <Tabs value={mode} onValueChange={(v) => setMode(v as "library" | "generate")} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="library" className="gap-1.5"><Library className="h-4 w-4" /> Paper Library</TabsTrigger>
            <TabsTrigger value="generate" className="gap-1.5"><Wand2 className="h-4 w-4" /> Generate New</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            {libraryPapers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No pre-generated papers for this subject yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {libraryPapers.map((lp) => (
                  <Card
                    key={lp.id}
                    className="group cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
                    onClick={() => openLibraryPaper(lp)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-accent shrink-0" />
                        <h3 className="font-bold text-sm text-foreground group-hover:text-accent transition-colors">{lp.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{lp.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                          {lp.totalMarks} marks
                        </span>
                        {lp.tier && (
                          <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                            {lp.tier}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            <PaperSelector selected={paper} onSelect={setPaper} subject={subject} />

            {(isMaths || isChemistry) && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Select Tier</h3>
                <TierSelector selected={tier} onSelect={setTier} />
              </div>
            )}

            <div className="text-center space-y-2">
              {!subscribed && (
                <p className="text-sm text-muted-foreground">
                  🎁 Free tier:{" "}
                  <span className="font-bold text-foreground">{Math.max(0, remaining)}</span> of{" "}
                  {FREE_LIMITS.predictedPapers} free paper remaining
                  {remaining <= 0 && (
                    <>
                      {" — "}
                      <button onClick={() => navigate("/pricing")} className="font-semibold text-primary underline underline-offset-2">
                        Subscribe to Pro
                      </button>
                    </>
                  )}
                </p>
              )}

              <Button
                onClick={canUse ? generatePaper : () => navigate("/pricing")}
                disabled={isGenerating}
                size="lg"
                className="gap-2 px-8"
              >
                {isGenerating ? (
                  <><Sparkles className="h-4 w-4 animate-spin" /> Generating Paper...</>
                ) : canUse ? (
                  <><Sparkles className="h-4 w-4" /> Generate Predicted Paper</>
                ) : (
                  <>Subscribe to Generate <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {isGenerating && generatedPaper && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <MathsMarkdown>{generatedPaper}</MathsMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "paper" && !isGenerating && (
        <div className="space-y-5">
          {selectedLibraryPaper && (
            <div className="text-center mb-2">
              <h2 className="font-serif text-xl font-bold">{selectedLibraryPaper.title}</h2>
              <p className="text-sm text-muted-foreground">{selectedLibraryPaper.description}</p>
            </div>
          )}

          {paperContext && (
            <Card>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <MathsMarkdown>{paperContext}</MathsMarkdown>
                </div>
              </CardContent>
            </Card>
          )}

          {parsedQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              answer={answers[q.id] || ""}
              onAnswerChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
              onMark={() => markQuestion(q)}
              isMarking={markingId === q.id}
              feedback={feedbacks[q.id] || null}
              showMathTools={isMaths || isChemistry}
              showEconDiagram={isEconomics}
              showDrawingCanvas={isMaths || isChemistry}
              showGraphPaper={isMaths}
              showGeometryTools={isMaths}
              subject={subject}
            />
          ))}

          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" /> Back to Paper Selection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
