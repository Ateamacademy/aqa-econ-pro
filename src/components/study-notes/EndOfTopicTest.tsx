import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { streamChat } from "@/lib/streamChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { TestResultsCarousel } from "./TestResultsCarousel";

interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
}

interface EndOfTopicTestProps {
  chapterName: string;
  subtopicTitles: string[];
}

function parseMCQs(text: string): MCQ[] {
  const questions: MCQ[] = [];
  // Match Q1, Q2, etc. blocks
  const qBlocks = text.split(/(?:^|\n)Q\d+[.:]\s*/i).filter(Boolean);
  
  for (const block of qBlocks) {
    const lines = block.trim().split("\n").filter(l => l.trim());
    if (lines.length < 3) continue;
    
    const question = lines[0].trim();
    const options: string[] = [];
    let correctIndex = 0;
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      // Match A) B) C) D) or A. B. C. D. patterns
      const match = line.match(/^([A-D])[.)]\s*(\*?)(.+)/i);
      if (match) {
        const isCorrect = match[2] === "*" || line.includes("✓") || line.includes("(correct)");
        const optionText = match[3].replace(/\s*\(correct\)\s*/i, "").replace(/\s*✓\s*/, "").trim();
        if (isCorrect) correctIndex = options.length;
        options.push(optionText);
      }
    }
    
    if (options.length >= 3) {
      questions.push({ question, options, correctIndex });
    }
  }
  
  return questions;
}

export function EndOfTopicTest({ chapterName, subtopicTitles }: EndOfTopicTestProps) {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, examBoard, level, subjectLabel } = useSubject();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [rawText, setRawText] = useState("");

  const generateTest = useCallback(async () => {
    if (!user) { toast.error("Sign in to take tests"); return; }
    setLoading(true);
    setQuestions([]);
    setCurrentQ(0);
    setSelected([]);
    setSubmitted(false);
    setRawText("");

    let result = "";
    const topicsList = subtopicTitles.slice(0, 8).join(", ");

    await streamChat({
      messages: [{
        role: "user",
      content: `Generate exactly 10 multiple-choice questions for an end-of-chapter test on "${chapterName}" for ${examBoard} ${level} ${subjectLabel}.

Topics covered: ${topicsList}

FORMAT RULES (follow EXACTLY):
Q1. [question text]
A) [option]
B) [option]
C) [option]
D) [correct option](correct)

Q2. [question text]
A) [option]
B) [correct option](correct)
C) [option]
D) [option]

...and so on for Q3 through Q10.

RULES:
- Each question must have exactly 4 options (A-D)
- Mark the correct answer with (correct) after the option text
- Questions should test understanding, not just recall
- Mix difficulty: 3 easy, 4 medium, 3 hard
- Cover different subtopics from the chapter
- Keep questions concise (1-2 sentences max)
- Include a mix of: definitions, application, analysis, and evaluation questions
- Do NOT include any preamble or explanation, ONLY the 10 questions`
      }],
      mode: "practice",
      subject,
      onDelta: (chunk) => { result += chunk; setRawText(result); },
      onDone: () => {
        const parsed = parseMCQs(result);
        if (parsed.length >= 5) {
          setQuestions(parsed.slice(0, 10));
          setSelected(new Array(Math.min(parsed.length, 10)).fill(null));
        } else {
          toast.error("Failed to generate test. Try again.");
        }
        setLoading(false);
      },
      onError: (err) => { toast.error(err); setLoading(false); },
    });
  }, [user, chapterName, subtopicTitles, examBoard, level, subjectLabel, subject]);

  const handleSubmit = async () => {
    if (selected.some(s => s === null)) {
      toast.error("Answer all questions first");
      return;
    }
    setSubmitted(true);

    const correctCount = questions.reduce((acc, q, i) => acc + (selected[i] === q.correctIndex ? 1 : 0), 0);
    const scorePercent = Math.round((correctCount / questions.length) * 100);

    // Save to practice_sessions
    if (user) {
      await supabase.from("practice_sessions").insert({
        user_id: user.id,
        subject,
        session_type: "topic_test",
        topic: chapterName,
        score_percent: scorePercent,
        feedback_summary: `${correctCount}/${questions.length} correct`,
      });
    }

    if (!subscribed && profile) {
      await supabase.from("profiles").update({ free_questions_used: profile.free_questions_used + 1 }).eq("user_id", user!.id);
      refreshProfile();
    }
  };

  const reset = () => {
    setOpen(false);
    setQuestions([]);
    setCurrentQ(0);
    setSelected([]);
    setSubmitted(false);
    setRawText("");
  };

  return (
    <div className="mt-6 mb-4">
      {!open ? (
        <Button
          onClick={() => { setOpen(true); generateTest(); }}
          className="gap-2 w-full rounded-xl h-12 text-sm font-semibold"
          variant="outline"
        >
          <ClipboardCheck className="h-4 w-4" />
          Take End of Chapter Test
          <ChevronRight className="h-4 w-4 ml-auto" />
        </Button>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-primary/20 overflow-hidden">
              <div className="bg-primary/5 px-5 py-3 border-b border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">End of Chapter Test</span>
                </div>
                {questions.length > 0 && !submitted && (
                  <span className="text-xs text-muted-foreground">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                )}
              </div>

              <CardContent className="p-5">
                {loading && questions.length === 0 && (
                  <div className="flex items-center gap-3 py-8 justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Generating your test...</span>
                  </div>
                )}

                {/* Question display */}
                {questions.length > 0 && !submitted && (
                  <div className="space-y-4">
                    {/* Progress bar */}
                    <Progress
                      value={((currentQ + 1) / questions.length) * 100}
                      className="h-1.5"
                    />

                    <p className="text-sm font-semibold text-foreground leading-relaxed">
                      {questions[currentQ].question}
                    </p>

                    <div className="space-y-2">
                      {questions[currentQ].options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => {
                            const newSelected = [...selected];
                            newSelected[currentQ] = oi;
                            setSelected(newSelected);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                            selected[currentQ] === oi
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                          }`}
                        >
                          <span className="font-semibold mr-2 text-xs opacity-60">
                            {String.fromCharCode(65 + oi)})
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={currentQ === 0}
                        onClick={() => setCurrentQ(c => c - 1)}
                      >
                        ← Previous
                      </Button>

                      {currentQ < questions.length - 1 ? (
                        <Button
                          size="sm"
                          disabled={selected[currentQ] === null}
                          onClick={() => setCurrentQ(c => c + 1)}
                        >
                          Next →
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={selected.some(s => s === null)}
                          onClick={handleSubmit}
                          className="gap-1.5"
                        >
                          <Trophy className="h-3.5 w-3.5" /> Submit Test
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {submitted && (
                  <TestResultsCarousel
                    questions={questions}
                    selected={selected}
                    onRetake={() => { setOpen(true); generateTest(); }}
                    onClose={reset}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
