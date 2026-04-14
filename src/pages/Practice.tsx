import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Lock, Send, RotateCcw, Settings2, FileQuestion, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { RevisionRenderer } from "@/components/revision/RevisionRenderer";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { FREE_LIMITS } from "@/lib/plans";
import { topicsBySubject, stylesBySubject } from "@/lib/subjectConfig";
import { UpgradeModal } from "@/components/UpgradeModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const stepsMeta = [
  { id: "generate", label: "Choose", icon: Settings2 },
  { id: "answer", label: "Answer", icon: FileQuestion },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
] as const;

export default function Practice() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();

  const topics = topicsBySubject[subject];
  const styles = stylesBySubject[subject];

  const [topic, setTopic] = useState(topics[0]);
  const [style, setStyle] = useState(styles[0]);
  const [generatedQ, setGeneratedQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [step, setStep] = useState<"generate" | "answer" | "feedback">("generate");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const reset = () => { setStep("generate"); setGeneratedQ(""); setAnswer(""); setFeedback(""); };

  useEffect(() => {
    setTopic(topicsBySubject[subject][0]);
    setStyle(stylesBySubject[subject][0]);
    reset();
  }, [subject]);

  if (!user) {
    return (
      <div className="container py-24 max-w-3xl text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Sign in to practice</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Generate exam-style questions and get instant AI marking.</p>
        <Button onClick={() => navigate("/auth")} size="lg" className="rounded-full px-10 shadow-lg shadow-primary/20">Sign In</Button>
      </div>
    );
  }

  const canUse = subscribed || (profile && profile.free_questions_used < FREE_LIMITS.questions);

  const generateQuestion = async () => {
    if (!canUse) { setShowUpgrade(true); return; }
    setIsGenerating(true);
    setGeneratedQ("");
    let result = "";

    await streamChat({
      messages: [{ role: "user", content: `Generate ONE ${style} exam-style question on "${topic}" for ${examBoard} ${level} ${subjectLabel}.

RULES:
- Maximum 2 sentences. Be concise like a real exam paper.
- Include mark allocation in brackets, e.g. [4 marks]
- Do NOT include any preamble, explanation, or answer
- Match the exact style and wording of a real ${examBoard} exam paper
- For multiple choice: give 4 options labelled A–D
- For short answer: "Define...", "State two...", "Calculate..."
- For longer questions: "Explain...", "Evaluate...", "Discuss..."

Output ONLY the question text and mark allocation. Nothing else.` }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setGeneratedQ(result); },
      onDone: () => { setIsGenerating(false); setStep("answer"); },
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const markAnswer = async () => {
    setIsMarking(true);
    setFeedback("");
    setStep("feedback");
    let result = "";

    await streamChat({
      messages: [
        { role: "user", content: `Question: ${generatedQ}\n\nMy answer: ${answer}` },
        { role: "user", content: `Please mark this answer using ${examBoard} ${level} ${subjectLabel} criteria. Speak directly to me.` },
      ],
      mode: "grade",
      subject,
      onDelta: (chunk) => { result += chunk; setFeedback(result); },
      onDone: async () => {
        setIsMarking(false);
        if (!subscribed && profile) {
          await supabase.from("profiles").update({ free_questions_used: profile.free_questions_used + 1 }).eq("user_id", user.id);
          refreshProfile();
        }
      },
      onError: (err) => { toast.error(err); setIsMarking(false); setStep("answer"); },
    });
  };

  // reset is defined above the useEffect (line 44)

  const stepIndex = stepsMeta.findIndex(s => s.id === step);

  return (
    <div className="container py-10 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Practice Questions</h1>
        <p className="text-sm text-muted-foreground">
          {examBoard} {level} {subjectLabel} · {subscribed ? "Unlimited practice" : `${FREE_LIMITS.questions - (profile?.free_questions_used ?? 0)} free question(s) remaining`}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {stepsMeta.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = stepIndex > i;
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
              {i < stepsMeta.length - 1 && (
                <div className={cn("h-px w-4 shrink-0", isDone ? "bg-primary/40" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Generate */}
        {step === "generate" && (
          <motion.div key="gen" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <Card className="border-border/60">
              <CardContent className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Topic</label>
                  <select value={topic} onChange={e => setTopic(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Question Style</label>
                  <select value={style} onChange={e => setStyle(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                    {styles.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <Button onClick={generateQuestion} disabled={isGenerating || !canUse} size="lg" className="w-full gap-2 rounded-xl h-12 shadow-lg shadow-primary/20">
                  <Brain className="h-4 w-4" />
                  {isGenerating ? "Generating..." : canUse ? "Generate Question" : "Subscribe for More"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Answer */}
        {step === "answer" && (
          <motion.div key="ans" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="space-y-5">
              <Card className="border-primary/20">
                <CardContent className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Question</p>
                  <div className="ai-response text-sm">
                    <MathsMarkdown>{generatedQ}</MathsMarkdown>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60">
                <CardContent className="p-5 space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Your Answer</label>
                  <Textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={8} placeholder="Type your answer here..." className="resize-none" />
                  <div className="flex gap-2">
                    <Button onClick={markAnswer} disabled={isMarking || !answer.trim()} size="lg" className="flex-1 gap-2 rounded-xl h-12 shadow-lg shadow-primary/20">
                      <Send className="h-4 w-4" /> {isMarking ? "Marking..." : "Submit for Marking"}
                    </Button>
                    <Button variant="outline" onClick={generateQuestion} disabled={isGenerating} className="gap-2 rounded-xl h-12">
                      <RotateCcw className="h-4 w-4" /> New
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 3: Feedback */}
        {step === "feedback" && (
          <motion.div key="fb" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <div className="space-y-5">
              {/* Question recap */}
              <Card className="border-border/60 bg-muted/30">
                <CardContent className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Question</p>
                  <div className="text-sm text-foreground/80 ai-response"><MathsMarkdown>{generatedQ}</MathsMarkdown></div>
                </CardContent>
              </Card>

              {/* Your answer recap */}
              <Card className="border-border/60 bg-muted/30">
                <CardContent className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Your Answer</p>
                  <p className="text-sm whitespace-pre-wrap text-foreground/80">{answer}</p>
                </CardContent>
              </Card>

              {/* Feedback card */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
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
                      Marking your answer...
                    </div>
                  )}
                </CardContent>
              </Card>

              {!isMarking && feedback && (
                <Button onClick={reset} className="gap-2 rounded-xl">
                  <Brain className="h-4 w-4" /> Try Another Question
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} feature="practice questions" />
    </div>
  );
}
