import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Lock, Send, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { FREE_LIMITS } from "@/lib/plans";

const paperOptions = [
  { value: "1", label: "Paper 1 — Markets & Market Failure", desc: "Microeconomics" },
  { value: "2", label: "Paper 2 — National & International Economy", desc: "Macroeconomics" },
  { value: "3", label: "Paper 3 — Economic Principles & Issues", desc: "Synoptic" },
];

export default function PredictedPapers() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [paper, setPaper] = useState("1");
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [step, setStep] = useState<"select" | "paper" | "answer" | "feedback">("select");

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

  const used = (profile as any)?.free_predicted_papers_used ?? 0;
  const canUse = subscribed || used < FREE_LIMITS.predictedPapers;

  const generatePaper = async () => {
    if (!canUse) { toast.error("Free predicted paper limit reached. Subscribe for unlimited access."); navigate("/pricing"); return; }
    setIsGenerating(true);
    setGeneratedPaper("");
    let result = "";

    const paperLabel = paperOptions.find(p => p.value === paper)?.label ?? `Paper ${paper}`;

    await streamChat({
      messages: [{
        role: "user",
        content: `Generate a full AQA A-Level Economics predicted exam paper for ${paperLabel}.

This must be a realistic, full-length predicted paper in the exact AQA format:
- For Paper 1 & 2: Include Section A (data response with context/extract and short-answer questions worth 2-5 marks each) AND Section B (essay questions worth 25 marks each, with "Discuss", "Evaluate", or "To what extent" stems). Total marks should be 80.
- For Paper 3: Include Section A (multiple choice, 30 questions worth 1 mark each) AND Section B (case study with data response questions and an essay question). Total marks should be 80.

Include question numbers, mark allocations in brackets e.g. [4 marks], and any data/extracts needed.
Make the questions topical and based on likely exam themes for 2025.
Format clearly with headings for each section.`
      }],
      mode: "practice",
      onDelta: (chunk) => { result += chunk; setGeneratedPaper(result); },
      onDone: () => { setIsGenerating(false); setStep("paper"); },
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const markAnswers = async () => {
    if (!answer.trim()) { toast.error("Please write your answers first."); return; }
    setIsMarking(true);
    setFeedback("");
    let result = "";

    await streamChat({
      messages: [
        { role: "user", content: `Here is the predicted exam paper:\n\n${generatedPaper}\n\nHere are my answers:\n\n${answer}` },
        { role: "user", content: `Mark my answers using AQA mark scheme criteria. For every question:
1. Give me a mark out of the available marks
2. Tell me exactly what I did well — speak directly to me using "you" and "your"
3. Tell me specifically where I lost marks and how to improve
4. Provide a model answer showing what a top-band response looks like

At the end, give me:
- My total mark out of 80
- An overall grade boundary estimate (A*, A, B, C, D, E)
- 3 key areas to focus on for improvement

Remember: speak DIRECTLY to me. Say "you wrote..." not "the student wrote...". Be encouraging but honest.` },
      ],
      mode: "grade",
      onDelta: (chunk) => { result += chunk; setFeedback(result); },
      onDone: async () => {
        setIsMarking(false);
        setStep("feedback");
        if (!subscribed) {
          await supabase.from("profiles").update({
            free_predicted_papers_used: used + 1,
          } as any).eq("user_id", user.id);
          refreshProfile();
        }
      },
      onError: (err) => { toast.error(err); setIsMarking(false); },
    });
  };

  const reset = () => {
    setStep("select");
    setGeneratedPaper("");
    setAnswer("");
    setFeedback("");
  };

  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-1 flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-accent" /> Predicted Papers
        </h1>
        <p className="text-sm text-muted-foreground">
          {subscribed
            ? "Unlimited predicted papers"
            : `${FREE_LIMITS.predictedPapers - used} free predicted paper(s) remaining`}
        </p>
      </div>

      {step === "select" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Select Paper</label>
              <select
                value={paper}
                onChange={e => setPaper(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {paperOptions.map(p => (
                  <option key={p.value} value={p.value}>
                    {p.label} — {p.desc}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-muted-foreground">
              A full-length AQA-style predicted paper will be generated with realistic questions based on likely 2025 exam themes.
              After completing the paper you can submit your answers for AI marking with detailed feedback and model solutions.
            </p>
            <Button onClick={generatePaper} disabled={isGenerating || !canUse} className="gap-2">
              <FileText className="h-4 w-4" />
              {isGenerating ? "Generating Paper..." : canUse ? "Generate Predicted Paper" : "Subscribe for More Papers"}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "paper" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">
                Predicted {paperOptions.find(p => p.value === paper)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{generatedPaper}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <label className="text-sm font-medium block">Your Answers</label>
              <p className="text-xs text-muted-foreground">
                Write your answers below. Label each answer clearly (e.g. "Question 1a:", "Section B Q1:").
              </p>
              <Textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={14}
                placeholder="Question 1a: ...&#10;&#10;Question 1b: ...&#10;&#10;Section B, Q1: ..."
              />
              <div className="flex gap-2">
                <Button onClick={markAnswers} disabled={isMarking || !answer.trim()} className="gap-2">
                  <Send className="h-4 w-4" /> {isMarking ? "Marking..." : "Submit for Marking"}
                </Button>
                <Button variant="outline" onClick={reset} className="gap-2">
                  <RotateCcw className="h-4 w-4" /> New Paper
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === "feedback" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg">
                Predicted {paperOptions.find(p => p.value === paper)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{generatedPaper}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="font-serif text-lg">Your Answers</CardTitle></CardHeader>
            <CardContent><p className="text-sm whitespace-pre-wrap">{answer}</p></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-lg text-accent">Mark Scheme & Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{feedback}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
          <Button onClick={reset} className="gap-2">
            <Sparkles className="h-4 w-4" /> Generate Another Paper
          </Button>
        </div>
      )}
    </div>
  );
}
