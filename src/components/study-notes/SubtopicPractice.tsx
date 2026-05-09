import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { streamChat } from "@/lib/streamChat";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Send, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { FeedbackCarousel } from "./FeedbackCarousel";

interface SubtopicPracticeProps {
  subtopicTitle: string;
  topicName: string;
}

export function SubtopicPractice({ subtopicTitle, topicName }: SubtopicPracticeProps) {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, examBoard, level, subjectLabel } = useSubject();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [step, setStep] = useState<"idle" | "question" | "feedback">("idle");

  const generateQuestion = async () => {
    if (!user) { toast.error("Sign in to practice"); return; }
    setIsGenerating(true);
    setQuestion("");
    setStep("question");
    let result = "";

    await streamChat({
      messages: [{ role: "user", content: `Generate ONE short exam-style question on "${subtopicTitle}" for ${examBoard} ${level} ${subjectLabel}.

RULES:
- Maximum 2 sentences. Be concise like a real exam paper.
- Include mark allocation in brackets, e.g. [4 marks]
- Do NOT include any preamble, explanation, or answer
- Match the style of a real ${examBoard} exam paper
- Examples of good style: "Define opportunity cost. [2 marks]", "Explain one reason why demand for electric vehicles has increased. [4 marks]", "Using a supply and demand diagram, analyse the impact of a minimum wage on unemployment. [8 marks]"

Output ONLY the question text and mark allocation. Nothing else.` }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setQuestion(result); },
      onDone: () => setIsGenerating(false),
      onError: (err) => { toast.error(err); setIsGenerating(false); },
    });
  };

  const submitAnswer = async () => {
    if (!answer.trim()) { toast.error("Write your answer first"); return; }
    setIsMarking(true);
    setFeedback("");
    let result = "";

    await streamChat({
      messages: [
        { role: "user", content: `Question: ${question}\n\nStudent's Answer:\n${answer}` },
        { role: "user", content: `Mark this answer for ${examBoard} ${level} ${subjectLabel}. Give a mark out of the total, brief feedback on what was good, what was missing, and a model answer. Be encouraging but honest. Speak directly to the student.` },
      ],
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
            session_type: "question",
            topic: `${topicName} · ${subtopicTitle}`,
          });
        }
        if (!subscribed && profile) {
          await supabase.from("profiles").update({ free_questions_used: profile.free_questions_used + 1 }).eq("user_id", user.id);
          refreshProfile();
        }
      },
      onError: (err) => { toast.error(err); setIsMarking(false); },
    });
  };

  const reset = () => {
    setStep("idle");
    setQuestion("");
    setAnswer("");
    setFeedback("");
  };

  return (
    <div className="mt-4 border-t border-border/40 pt-4">
      <button
        onClick={() => { setOpen(!open); if (!open && step === "idle") generateQuestion(); }}
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        <Brain className="h-4 w-4" />
        Practice this subtopic
        {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-3">
              {/* Question */}
              {(step === "question" || step === "feedback") && question && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Practice Question</p>
                    <p className="text-sm leading-relaxed">{question}</p>
                  </CardContent>
                </Card>
              )}

              {isGenerating && !question && (
                <p className="text-sm text-muted-foreground animate-pulse">Generating question...</p>
              )}

              {/* Answer input */}
              {step === "question" && !isGenerating && (
                <div className="space-y-2">
                  <Textarea
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    rows={5}
                    placeholder="Write your answer here..."
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={submitAnswer} disabled={isMarking || !answer.trim()} className="gap-1.5">
                      <Send className="h-3.5 w-3.5" /> {isMarking ? "Marking..." : "Submit"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={generateQuestion} disabled={isGenerating} className="gap-1.5">
                      <RotateCcw className="h-3.5 w-3.5" /> New Question
                    </Button>
                  </div>
                </div>
              )}

              {/* Feedback carousel */}
              {step === "feedback" && feedback && (
                <FeedbackCarousel
                  feedback={feedback}
                  question={question}
                  onNewQuestion={generateQuestion}
                  onClose={reset}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
