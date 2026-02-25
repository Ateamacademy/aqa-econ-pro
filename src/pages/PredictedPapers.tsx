import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Lock, Sparkles, RotateCcw, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { FREE_LIMITS } from "@/lib/plans";
import { PaperSelector } from "@/components/predicted-papers/PaperSelector";
import { QuestionCard } from "@/components/predicted-papers/QuestionCard";
import { parseQuestions, type ParsedQuestion } from "@/components/predicted-papers/parseQuestions";
import { paperOptionsBySubject } from "@/lib/subjectConfig";

type QuestionFeedback = {
  markScheme: string;
  modelAnswer: string;
  examinerTip: string;
};

export default function PredictedPapers() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();
  const [paper, setPaper] = useState("1");
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState<"select" | "paper">("select");

  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [paperContext, setPaperContext] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, QuestionFeedback>>({});
  const [markingId, setMarkingId] = useState<string | null>(null);

  const used = (profile as any)?.free_predicted_papers_used ?? 0;
  const canUse = subscribed || used < FREE_LIMITS.predictedPapers;
  const remaining = FREE_LIMITS.predictedPapers - used;

  const paperOptions = paperOptionsBySubject[subject];

  // Reset when subject changes
  useEffect(() => { reset(); }, [subject]);

  const generatePaper = async () => {
    if (!canUse) {
      toast.error("Free predicted paper limit reached. Subscribe for unlimited access.");
      navigate("/pricing");
      return;
    }
    setIsGenerating(true);
    setGeneratedPaper("");
    let result = "";

    const selectedPaper = paperOptions.find((p) => p.value === paper);
    const paperLabel = selectedPaper ? `${selectedPaper.label}: ${selectedPaper.title}` : `Paper ${paper}`;

    const prompt = subject === "maths"
      ? `Generate a full Edexcel GCSE Maths predicted exam paper for ${paperLabel}.

This must be a realistic, full-length predicted paper in the exact Edexcel (1MA1) format:
- ${paper === "1" ? "This is a NON-CALCULATOR paper." : "This is a CALCULATOR paper."}
- Include approximately 20-25 questions of increasing difficulty
- Cover a mix of topics: Number, Algebra, Ratio & Proportion, Geometry, Statistics, Probability
- Include both Foundation and Higher crossover questions, with harder questions at the end
- Total marks should be 80
- Questions should progress from 1-2 mark questions to 5-6 mark extended problems

IMPORTANT FORMATTING: Each question MUST follow this exact format on its own line:
Question 1 [2 marks]
Question 2 [3 marks]
etc.

Make questions topical and realistic. Format clearly with any diagrams described in text.`
      : `Generate a full AQA A-Level Economics predicted exam paper for ${paperLabel}.

This must be a realistic, full-length predicted paper in the exact AQA format:
- For Paper 1 & 2: Include Section A (data response with context/extract and short-answer questions) AND Section B (essay questions worth 25 marks each, with "Discuss", "Evaluate", or "To what extent" stems). Total marks should be 80.
- For Paper 3: Include Section A (multiple choice, 30 questions worth 1 mark each) AND Section B (case study with data response questions and an essay question). Total marks should be 80.

IMPORTANT FORMATTING: Each question MUST follow this exact format on its own line:
Question 1.1 [2 marks]
Question 1.2 [4 marks]
etc.

Include any data/extracts needed before the questions. Make questions topical based on likely 2025 exam themes. Format clearly with headings for each section.`;

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

      let result = "";
      await streamChat({
        messages: [
          {
            role: "user",
            content: `You are marking a ${examBoard} ${level} ${subjectLabel} answer. Here is the context from the paper:\n\n${paperContext}\n\nHere is the question:\n${question.label} [${question.marks} marks]\n${question.text}\n\nHere is my answer:\n${answer}`,
          },
          {
            role: "user",
            content: `Mark my answer using ${examBoard} mark scheme criteria. You MUST respond in this exact structure with these three sections clearly labelled:

## Mark Scheme
Give me a mark out of ${question.marks}. Explain the marking criteria and how my answer maps to each level/band. Speak DIRECTLY to me using "you" and "your" — never say "the student" or "the candidate".

## Model Answer
Write a full top-band model answer that would score full marks for this question.${subject === "maths" ? " Show all working clearly step by step." : ""}

## Examiner Tip
Give 2-3 specific, actionable tips for how I can improve. Address me directly. Be encouraging but honest about where I lost marks.`,
          },
        ],
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
    [answers, paperContext, feedbacks, subscribed, used, user?.id, refreshProfile, subject, examBoard, level, subjectLabel]
  );

  const reset = () => {
    setStep("select");
    setGeneratedPaper("");
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
          <FileText className="h-3.5 w-3.5" /> Full Paper Mode
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Generate a Predicted Paper</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Select which {examBoard} {level} {subjectLabel} paper you want to practice. The AI will generate a realistic full paper with mark schemes, model answers, and examiner tips.
        </p>
      </div>

      {step === "select" && (
        <div className="space-y-6">
          <PaperSelector selected={paper} onSelect={setPaper} subject={subject} />

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
                    </button>{" "}
                    for unlimited papers
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
        </div>
      )}

      {isGenerating && generatedPaper && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{generatedPaper}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "paper" && !isGenerating && (
        <div className="space-y-5">
          {paperContext && (
            <Card>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{paperContext}</ReactMarkdown>
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
            />
          ))}

          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" /> Generate Another Paper
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
