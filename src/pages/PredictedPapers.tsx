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

  return `You are an expert Edexcel GCSE Mathematics examiner. Generate a COMPLETE, REALISTIC predicted exam paper for ${paperLabel}.

TIER: ${tierDesc}

CALCULATOR: ${isCalc ? "YES — this is a CALCULATOR paper. Questions can involve complex arithmetic, trigonometry with decimals, statistical calculations, and iterative methods." : "NO — this is a NON-CALCULATOR paper. All arithmetic must be manageable by hand. Focus on fractions, mental methods, estimation, exact values, and algebraic manipulation."}

STRUCTURE (match real Edexcel papers EXACTLY):
- 20–25 questions, numbered sequentially
- Total: 80 marks
- Questions progress from easy (1–2 marks) to hard (5–6 marks)
- Multi-part questions use (a), (b), (c) labelling
- Include a variety of command words: "Work out", "Calculate", "Show that", "Prove", "Explain why", "Give a reason"
- Start with 3–4 short 1–2 mark "warm-up" questions, then build complexity

QUESTION TYPES TO INCLUDE (ensure EVERY category appears):
1. **Number & calculation**: fractions, percentages, ratio, proportion, standard form, indices
2. **Algebra**: solving equations, inequalities, sequences, rearranging formulae, simultaneous equations${tier === "Higher" ? ", algebraic fractions, iteration" : ""}
3. **Graphs & diagrams** (AT LEAST 6 questions — this is critical):
   - ${isCalc ? "Scatter diagrams with data tables — ask to describe correlation, draw line of best fit, estimate values, explain reliability of extrapolation" : "Linear graphs — complete a table of values, plot and draw the graph, find gradient and y-intercept"}
   - ${tier === "Higher" ? "Quadratic/cubic graphs — describe key features (turning points, roots, y-intercept), solve equations graphically, sketch transformations y=f(x)+a, y=f(x+a), y=-f(x)" : "Real-life graphs — interpret conversion graphs, read off values"}
   - Velocity-time or distance-time graphs — calculate speed/acceleration/distance from areas and gradients
   - ${isCalc ? "Cumulative frequency diagrams — draw from grouped data table, find median and IQR from graph" : "Bar charts, pictograms, or frequency diagrams — read and interpret"}
   - ${isCalc ? "Histograms with unequal class widths — calculate frequency density, draw histogram, estimate frequencies" : "Pie charts — calculate angles, interpret sectors"}
   - ${tier === "Higher" ? "Box plots — compare two distributions using median, range, IQR" : ""}
   For EVERY graph question: provide enough numerical information so it can be answered from text alone.
4. **Geometry**: angles, area/perimeter, volume, Pythagoras, trigonometry${tier === "Higher" ? ", circle theorems, vectors, congruence/similarity proofs, frustums" : ""}
   - Include at least one diagram question with specific measurements (e.g., "The diagram shows a cylinder with radius r cm and height h cm...")
   - For compound shapes, describe each component precisely
5. **Statistics & Probability**: averages from tables, probability trees/Venn diagrams, relative frequency${tier === "Higher" ? ", conditional probability, histograms with frequency density" : ""}
6. **Problem-solving**: at least 3–4 questions requiring multi-step reasoning
   - "Show that" questions with algebraic proof
   - "Best value for money" comparison questions with specific pack sizes and prices
   - Contextual multi-step problems (e.g., pressure = force ÷ area with cylinder dimensions)
7. **Past-paper authenticity**:
   - Mirror Edexcel GCSE style from 2018–2024 papers and specimen material
   - Include at least 3 questions formatted as exam resources with "Figure" or "Table" headings and clear data beneath

IMPORTANT FORMATTING — FOLLOW EXACTLY:
Question 1 [2 marks]
Question 2 [3 marks]
Question 3a [1 marks]
Question 3b [2 marks]

Do NOT wrap question headers in bold/asterisks. Write them exactly as shown above.
Use realistic Figure/Table blocks where appropriate, but always include all required data in text so the question is fully answerable.
Make questions topical, varied, and exam-authentic. Avoid repeating similar question types.`;
};

const ECON_PAPER_PROMPT = (paperLabel: string) =>
  `You are an expert AQA A-Level Economics chief examiner. Generate a COMPLETE, REALISTIC predicted exam paper for ${paperLabel}.

This must be a full-length paper in the EXACT AQA format:
- For Paper 1 (Microeconomics) & Paper 2 (Macroeconomics): Include Section A (data response with context/extract, real-looking data tables, and structured questions 2+4+9+25 marks) AND Section B (essay questions worth 25 marks each with "Discuss", "Evaluate", or "To what extent" stems). Total marks: 80.
- For Paper 3 (Synoptic): Include Section A (30 MCQs worth 1 mark each) AND Section B (case study with data response questions and an essay question). Total marks: 80.

DIAGRAM & GRAPH QUESTIONS (CRITICAL — at least 4 questions must require diagrams):
1. **Supply/demand diagrams**: "Using a supply and demand diagram, explain..." — explicitly ask students to draw axes (Price on y-axis, Quantity on x-axis), label original and new curves (e.g., S₁ shifting to S₂), shade areas of consumer/producer surplus, and identify deadweight loss triangles
2. **AD/AS diagrams** (Paper 2): "Using an AD/AS diagram, illustrate the impact of..." — specify whether to use Classical LRAS (vertical) or Keynesian LRAS. Ask students to show shifts, label equilibria (e.g., P₁→P₂, Y₁→Y₂), and explain the transmission mechanism step by step
3. **Welfare analysis diagrams**: For market failure questions, require students to draw the divergence between MSC and MPC (or MSB and MPB), shade the welfare loss triangle, and show the optimal vs free-market output
4. **Data interpretation with calculations**: Include tables with real-looking UK economic data. Ask students to calculate percentage changes, index numbers, real vs nominal values, terms of trade
5. **Market structure diagrams** (Paper 1): Include at least one question requiring a monopoly diagram (AR, MR, MC, AC curves), showing supernormal profit or deadweight loss
6. **Cost/revenue curves**: Ask students to draw and label TC, MC, AC, AR, MR curves for specific market structures

MACROECONOMIC ANALYSIS (Paper 2 — CRITICAL):
- Include at least one question requiring AD/AS diagram analysis of fiscal OR monetary policy
- Include one question on the multiplier effect with a numerical example (e.g., "If MPC = 0.8, calculate the multiplier and the final change in GDP from a £10bn spending increase")
- Include the Phillips Curve OR Keynesian vs Classical debate as an essay option
- Reference real UK macroeconomic data (GDP growth 0.6%, inflation 2.3%, unemployment 4.3%, base rate 4.5%)
- Include exchange rate or trade analysis where relevant

IMPORTANT FORMATTING — FOLLOW EXACTLY:
Question 1.1 [2 marks]
Question 1.2 [4 marks]
etc.

Include realistic data extracts and context paragraphs before questions. Use 2024–2025 UK economic themes. Format clearly with ## headings for sections.`;

const CHEM_PAPER_PROMPT = (paperLabel: string, tier: "Foundation" | "Higher") => {
  const tierDesc = tier === "Foundation"
    ? "Foundation tier (grades 1–5). Avoid higher-only content like moles calculations, titration calculations, and rate tangent method. Focus on recall, description, and simple application."
    : "Higher tier (grades 4–9). Include moles calculations, concentration, titration, rate tangent method, atom economy, and percentage yield calculations.";
  return `You are an expert AQA GCSE Chemistry chief examiner. Generate a COMPLETE, REALISTIC predicted exam paper for ${paperLabel}.

TIER: ${tierDesc}

STRUCTURE (match real AQA papers EXACTLY):
- Total: 100 marks
- Mix of multiple choice (~15 marks, 15 questions with A/B/C/D options) and structured questions (~85 marks)
- Include at least one 6-mark extended response question with a clear command word (Describe, Explain, Compare, Evaluate)
- Multi-part questions use (a), (b), (c) labelling
- Questions should cover the relevant topics for this paper
- Paper 1: Topics 1–5 (Atomic structure, Bonding, Quantitative chemistry, Chemical changes, Energy changes)
- Paper 2: Topics 6–10 (Rate & extent, Organic chemistry, Chemical analysis, Atmosphere, Using resources)
- Style must mirror AQA Chemistry papers from 2018–2024 plus specimen material (clear exam language, realistic data, and authentic command words)

GRAPH, IMAGE & FIGURE QUESTIONS (CRITICAL — at least 6 questions must involve graphs/diagrams/tables):
1. **Reaction profile diagrams**: Describe a reaction profile with energy on y-axis, progress of reaction on x-axis. Specify reactant and product energy levels numerically (e.g., "Reactants: 150 kJ, Peak: 350 kJ, Products: 250 kJ"). Ask students to calculate activation energy and overall energy change
2. **Bond-energy Figure/Table question (MANDATORY in Higher papers)**:
   - Include a question in this exact style: a displayed formula equation for propane combustion, overall energy change given, and a bond-energy table with one unknown (X)
   - Use this data format: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O, overall energy change = −2219 kJ/mol, bond energies: C–C 347, C–H X, O=O 498, C=O 805, O–H 464 (kJ/mol)
   - Ask: "Calculate the bond energy of the C–H bond (X). Show all working."
3. **Rate of reaction graphs**: Describe a curve of volume of gas (cm³) vs time (s) with specific data points. For Higher: ask students to draw a tangent at a specific time and calculate the rate
4. **Dot-and-cross diagrams**: Ask students to draw outer shell electrons for specific compounds (NaCl, H₂O, CO₂, MgCl₂). State clearly: "Show only outer shell electrons" or "Show the charges on the ions"
5. **Chromatography / Rf values**: Describe a chromatogram with solvent front distance and spot distances. Ask students to calculate Rf values and identify unknown substances by comparison
6. **Titration data tables**: Present titre results (rough + 3 concordant) with burette readings. Ask students to identify anomalous results, calculate mean titre, then calculate concentration
7. **Temperature change graphs**: Describe neutralisation or dissolving experiments with temperature data. Ask students to calculate energy change using Q = mcΔT
8. **Haber process yield curves** (Higher only): Describe yield (%) vs temperature curves at two different pressures with specific values. Ask students to explain compromise conditions
9. **Bar charts / data tables**: Include percentage composition data for empirical formula calculations

IMPORTANT FORMATTING — FOLLOW EXACTLY:
Question 1 [1 marks]
Question 2 [2 marks]
Question 3a [1 marks]
Question 3b [3 marks]

Do NOT wrap question headers in bold/asterisks. Include balanced equations with state symbols throughout. Use correct IUPAC naming. Use Figure/Table headings where appropriate, but include enough numerical detail so questions are answerable from text alone.`;
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

If this is a graph/diagram question, explicitly mark:
- axis labels + units
- sensible scales
- correct plotted points/curve shape/gradient features
- correct final reading or conclusion
Use any student graph notes/diagram notes in their answer as marking evidence.

You MUST respond in this EXACT structure:

## Mark Scheme
Give a mark out of ${question.marks}. List each M/A/B mark and whether it was awarded. If a mark was lost, explain exactly why. Use "you" and "your" — speak directly to the student.

## Model Answer
Write a full model answer that would score ${question.marks}/${question.marks}. Show ALL working step by step. For graph/diagram questions, include a concise Figure-style description of what should be drawn.

## Examiner Tip
Give 2–3 specific, actionable tips. Mention common mistakes to avoid. Address the student directly.`
        : isChemistry
        ? `You are marking an AQA GCSE Chemistry (${tier} tier) answer.

Here is the context from the paper:
${paperContext}

Here is the question:
${question.label} [${question.marks} marks]
${question.text}

Here is the student's answer:
${answer}

Mark this answer using AQA GCSE Chemistry mark scheme criteria. Award marks using:
- **AO1** (Knowledge and understanding) — recall of facts, formulae, definitions
- **AO2** (Application) — applying knowledge to familiar and unfamiliar contexts
- **AO3** (Analysis and evaluation) — interpreting data, drawing conclusions

For 6-mark questions, use Level of Response marking (Level 1: 1-2, Level 2: 3-4, Level 3: 5-6).
Check: balanced equations, state symbols, correct formulae, units, significant figures.

If this is a graph/image/diagram question, explicitly mark:
- axis labels + units
- labelled curves/peaks/arrows and what they represent
- correct values read from figure/table data
- correct calculation chain from that data
Use any student diagram notes or graph notes in their answer as valid evidence.

You MUST respond in this EXACT structure:

## Mark Scheme
Give a mark out of ${question.marks}. List each mark point and whether it was awarded. If a mark was lost, explain exactly why. Check for correct chemical notation, balanced equations, state symbols, and figure/table interpretation. Use "you" and "your" — speak directly to the student.

## Model Answer
Write a full model answer that would score ${question.marks}/${question.marks}. Include balanced equations with state symbols, correct units, and full working for any calculations. For graph/diagram/image questions, include a clear Figure/Table-style description of the expected labels and values.

## Examiner Tip
Give 2–3 specific, actionable tips. Mention common mistakes (e.g., forgetting state symbols, not balancing equations, missing units, misreading graph axes). Address the student directly.`
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
Give me a mark out of ${question.marks}. Explain the marking criteria and how my answer maps to each level/band. For diagram questions, check correct labelling of axes, curves, shifts, and shaded areas. Speak DIRECTLY to me using "you" and "your".

## Model Answer
Write a full top-band model answer that would score full marks for this question. For diagram questions, describe the diagram in full detail (axes, curves, labels, shifts, equilibria).

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
