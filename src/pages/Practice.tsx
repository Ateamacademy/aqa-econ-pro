import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lock, Send } from "lucide-react";
import { toast } from "sonner";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { FREE_LIMITS } from "@/lib/plans";
import { topicsBySubject, stylesBySubject } from "@/lib/subjectConfig";

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

  // Reset when subject changes
  useEffect(() => {
    setTopic(topicsBySubject[subject][0]);
    setStyle(stylesBySubject[subject][0]);
    reset();
  }, [subject]);

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to practice</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  const canUse = subscribed || (profile && profile.free_questions_used < FREE_LIMITS.questions);

  const generateQuestion = async () => {
    if (!canUse) { toast.error("Free question limit reached."); navigate("/pricing"); return; }
    setIsGenerating(true);
    setGeneratedQ("");
    let result = "";

    await streamChat({
      messages: [{ role: "user", content: `Generate a ${style} question on the topic: ${topic}. This should be in the style of ${examBoard} ${level} ${subjectLabel}. Just give me the question, nothing else.` }],
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
        setStep("feedback");
        if (!subscribed && profile) {
          await supabase.from("profiles").update({ free_questions_used: profile.free_questions_used + 1 }).eq("user_id", user.id);
          refreshProfile();
        }
      },
      onError: (err) => { toast.error(err); setIsMarking(false); },
    });
  };

  const reset = () => { setStep("generate"); setGeneratedQ(""); setAnswer(""); setFeedback(""); };

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-1">Practice Questions</h1>
        <p className="text-sm text-muted-foreground">
          {examBoard} {level} {subjectLabel} · {subscribed ? "Unlimited practice" : `${FREE_LIMITS.questions - (profile?.free_questions_used ?? 0)} free question(s) remaining`}
        </p>
      </div>

      {step === "generate" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Topic</label>
              <select value={topic} onChange={e => setTopic(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Question Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <Button onClick={generateQuestion} disabled={isGenerating || !canUse} className="gap-2">
              <Brain className="h-4 w-4" />
              {isGenerating ? "Generating..." : canUse ? "Generate Question" : "Subscribe for More"}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "answer" && (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="font-serif text-lg">Question</CardTitle></CardHeader>
            <CardContent>
              <div className="ai-response">
                <MathsMarkdown>{generatedQ}</MathsMarkdown>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <label className="text-sm font-medium block">Your Answer</label>
              <Textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={8} placeholder="Type your answer here..." />
              <div className="flex gap-2">
                <Button onClick={markAnswer} disabled={isMarking || !answer.trim()} className="gap-2">
                  <Send className="h-4 w-4" /> {isMarking ? "Marking..." : "Submit for Marking"}
                </Button>
                <Button variant="outline" onClick={reset}>New Question</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === "feedback" && (
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="font-serif text-lg">Question</CardTitle></CardHeader>
            <CardContent>
              <div className="ai-response"><MathsMarkdown>{generatedQ}</MathsMarkdown></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="font-serif text-lg">Your Answer</CardTitle></CardHeader>
            <CardContent><p className="text-sm whitespace-pre-wrap">{answer}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="font-serif text-lg text-accent">Feedback</CardTitle></CardHeader>
            <CardContent>
              <div className="ai-response"><MathsMarkdown>{feedback}</MathsMarkdown></div>
            </CardContent>
          </Card>
          <Button onClick={reset} className="gap-2"><Brain className="h-4 w-4" /> Try Another Question</Button>
        </div>
      )}
    </div>
  );
}
