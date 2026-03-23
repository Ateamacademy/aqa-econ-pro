import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, Lock, Send, Sparkles, RotateCcw, CheckCircle2, FileText, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { RevisionRenderer } from "@/components/revision/RevisionRenderer";
import { FREE_LIMITS } from "@/lib/plans";
import { questionTypesBySubject, topicsBySubject } from "@/lib/subjectConfig";
import { UpgradeModal } from "@/components/UpgradeModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Set up", icon: FileText },
  { id: 2, label: "Write", icon: PenTool },
  { id: 3, label: "Feedback", icon: MessageSquare },
];

export default function EssayGrader() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();

  const questionTypes = questionTypesBySubject[subject];
  const topics = topicsBySubject[subject];

  const [essay, setEssay] = useState("");
  const [questionType, setQuestionType] = useState(questionTypes[0]);
  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingQ, setIsGeneratingQ] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  if (!user) {
    return (
      <div className="container py-24 max-w-3xl text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Sign in to use the Essay Grader</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Get instant, examiner-quality feedback on your answers.</p>
        <Button onClick={() => navigate("/auth")} size="lg" className="rounded-full px-10 shadow-lg shadow-primary/20">Sign In</Button>
      </div>
    );
  }

  const canUse = subscribed || (profile && profile.free_papers_used < FREE_LIMITS.papers);

  const handleGenerateQuestion = async () => {
    setIsGeneratingQ(true);
    setQuestion("");
    let result = "";
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    await streamChat({
      messages: [{
        role: "user",
        content: `Generate ONE ${questionType} exam question for ${examBoard} ${level} ${subjectLabel} on the topic "${randomTopic}".

RULES:
- Write ONLY the question. No preamble, no answer, no explanation.
- Include the mark allocation in brackets, e.g. [25 marks]
- Match the exact style and wording of a real ${examBoard} exam paper.
- Be concise. Maximum 3 sentences for the question stem.
- If it's a data response question, include a brief extract (2-3 sentences) before the question.`,
      }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setQuestion(result); },
      onDone: () => setIsGeneratingQ(false),
      onError: (err) => { toast.error(err); setIsGeneratingQ(false); },
    });
  };

  const handleGrade = async () => {
    if (!essay.trim() || !question.trim()) { toast.error("Enter both the question and your answer"); return; }
    if (!canUse) { setShowUpgrade(true); return; }

    setIsLoading(true);
    setFeedback("");
    setStep(3);
    let result = "";

    await streamChat({
      messages: [{
        role: "user" as const,
        content: `Question type: ${questionType}\n\nQuestion: ${question}\n\nMy answer:\n${essay}`,
      }],
      mode: "grade",
      subject,
      onDelta: (chunk) => { result += chunk; setFeedback(result); },
      onDone: async () => {
        setIsLoading(false);
        if (!subscribed && profile) {
          await supabase.from("profiles").update({ free_papers_used: profile.free_papers_used + 1 }).eq("user_id", user.id);
          refreshProfile();
        }
      },
      onError: (err) => { toast.error(err); setIsLoading(false); setStep(2); },
    });
  };

  const reset = () => {
    setStep(1);
    setEssay("");
    setQuestion("");
    setFeedback("");
  };

  const currentStep = feedback ? 3 : essay.trim() ? 2 : 1;

  return (
    <div className="container py-10 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Essay Grader</h1>
        <p className="text-sm text-muted-foreground">
          {examBoard} {level} {subjectLabel} · {subscribed ? "Unlimited grading" : `${FREE_LIMITS.papers - (profile?.free_papers_used ?? 0)} free grading(s) remaining`}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-1",
                isActive ? "bg-primary/10 text-primary border border-primary/20" :
                isDone ? "bg-accent/50 text-accent-foreground" :
                "bg-muted/50 text-muted-foreground"
              )}>
                {isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> : <Icon className="h-3.5 w-3.5" />}
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div className={cn("h-px w-4 shrink-0", isDone ? "bg-primary/40" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1 & 2: Question + Answer */}
        {step < 3 && (
          <motion.div key="input" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="space-y-5">
              {/* Question Type */}
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Question Type</label>
                  <select
                    value={questionType}
                    onChange={e => setQuestionType(e.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    {questionTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </CardContent>
              </Card>

              {/* Question */}
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Exam Question</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGenerateQuestion}
                      disabled={isGeneratingQ}
                      className="gap-1.5 text-xs h-7 rounded-full"
                    >
                      <Sparkles className="h-3 w-3" />
                      {isGeneratingQ ? "Generating..." : "Generate Question"}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Paste the exam question here or click 'Generate Question' above..."
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              {/* Answer */}
              <Card className="border-border/60">
                <CardContent className="p-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Your Answer</label>
                  <Textarea
                    placeholder="Paste or type your answer here..."
                    value={essay}
                    onChange={e => { setEssay(e.target.value); if (e.target.value.trim()) setStep(2); else setStep(1); }}
                    rows={10}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              {/* Submit */}
              <Button
                onClick={handleGrade}
                disabled={isLoading || !canUse || !essay.trim() || !question.trim()}
                size="lg"
                className="w-full gap-2 rounded-xl h-12 shadow-lg shadow-primary/20"
              >
                <Send className="h-4 w-4" />
                {isLoading ? "Grading..." : canUse ? "Grade My Answer" : "Subscribe to Grade"}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Feedback */}
        {step === 3 && (
          <motion.div key="feedback" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="space-y-5">
              {/* Question recap */}
              <Card className="border-border/60 bg-muted/30">
                <CardContent className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Question</p>
                  <p className="text-sm text-foreground/80">{question}</p>
                </CardContent>
              </Card>

              {/* Feedback */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <PenTool className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">Examiner Feedback</h2>
                  </div>
                  {feedback ? (
                    <RevisionRenderer content={feedback} />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                      </span>
                      Analysing your answer...
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              {!isLoading && feedback && (
                <Button onClick={reset} variant="outline" className="gap-2 rounded-xl">
                  <RotateCcw className="h-4 w-4" /> Grade Another Answer
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} feature="marking sessions" />
    </div>
  );
}
