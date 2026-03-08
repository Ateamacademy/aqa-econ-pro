import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Lock, Send } from "lucide-react";
import { toast } from "sonner";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import { FREE_LIMITS } from "@/lib/plans";
import { questionTypesBySubject } from "@/lib/subjectConfig";

export default function EssayGrader() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();

  const questionTypes = questionTypesBySubject[subject];

  const [essay, setEssay] = useState("");
  const [questionType, setQuestionType] = useState(questionTypes[0]);
  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to use the Essay Grader</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  const canUse = subscribed || (profile && profile.free_papers_used < FREE_LIMITS.papers);

  const handleGrade = async () => {
    if (!essay.trim() || !question.trim()) { toast.error("Enter both the question and your answer"); return; }
    if (!canUse) { toast.error("Free limit reached. Subscribe for unlimited access."); navigate("/pricing"); return; }

    setIsLoading(true);
    setFeedback("");
    let result = "";

    const messages = [{
      role: "user" as const,
      content: `Question type: ${questionType}\n\nQuestion: ${question}\n\nMy answer:\n${essay}`,
    }];

    await streamChat({
      messages,
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
      onError: (err) => { toast.error(err); setIsLoading(false); },
    });
  };

  const graderLabel = "Essay Grader";

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-1">AI {graderLabel}</h1>
        <p className="text-sm text-muted-foreground">
          {examBoard} {level} {subjectLabel} · {subscribed ? "Unlimited grading" : `${FREE_LIMITS.papers - (profile?.free_papers_used ?? 0)} free grading(s) remaining`}
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Question Type</label>
            <select
              value={questionType}
              onChange={e => setQuestionType(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {questionTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Question</label>
            <Textarea placeholder="Paste the exam question here..." value={question} onChange={e => setQuestion(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Your Answer</label>
            <Textarea placeholder="Paste or type your answer/working here..." value={essay} onChange={e => setEssay(e.target.value)} rows={10} />
          </div>
          <Button onClick={handleGrade} disabled={isLoading || !canUse} className="gap-2">
            <Send className="h-4 w-4" />
            {isLoading ? "Grading..." : canUse ? "Grade My Answer" : "Subscribe to Grade"}
          </Button>
        </CardContent>
      </Card>

      {feedback && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <PenTool className="h-5 w-5 text-highlight" /> Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{feedback}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
