import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { getPaperById } from "@/lib/rubrics";
import { markSubQuestion, synthesisePaper } from "@/lib/marking";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MarkingLoader } from "@/components/marking/MarkingLoader";
import { cn } from "@/lib/utils";
import { Clock, Save, Send, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { getAqaPaperById } from "@/data/aqaPapers";
import AqaPaperViewer from "@/components/paper-library/AqaPaperViewer";

const STORAGE_KEY = (paperId: string) => `paper-attempt-${paperId}`;

export default function PaperAttempt() {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();

  // ── AQA papers route through the new exam-style viewer ──
  const aqaPaper = paperId ? getAqaPaperById(paperId) : undefined;
  if (aqaPaper) {
    return <AqaPaperViewer paperId={paperId!} />;
  }

  const paper = getPaperById(paperId || "");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [images, setImages] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMarking, setIsMarking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Load saved answers
  useEffect(() => {
    if (!paper) return;
    const saved = localStorage.getItem(STORAGE_KEY(paper.id));
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setImages(parsed.images || {});
      } catch { /* ignore */ }
    }
    setTimeLeft(paper.timeMinutes * 60);
  }, [paper]);

  // Auto-save every 10s
  useEffect(() => {
    if (!paper) return;
    const interval = setInterval(() => {
      localStorage.setItem(STORAGE_KEY(paper.id), JSON.stringify({ answers, images, timestamp: Date.now() }));
    }, 10000);
    return () => clearInterval(interval);
  }, [paper, answers, images]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !paper) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setImages((prev) => ({ ...prev, [paper.questions[currentQ].id]: base64 }));
    };
    reader.readAsDataURL(file);
  }, [currentQ, paper]);

  const handleSubmit = useCallback(async () => {
    if (!paper) return;
    setIsMarking(true);

    try {
      // Mark all questions in parallel
      const markingPromises = paper.questions.map(async (q) => {
        const answer = answers[q.id] || "(No answer provided)";
        const image = images[q.id];
        const { result, warning } = await markSubQuestion(
          q.questionText,
          q.rubric,
          answer,
          q.extract,
          image
        );
        return { questionId: q.id, questionNumber: q.questionNumber, result, warning, totalMarks: q.rubric.totalMarks };
      });

      const qResults = await Promise.all(markingPromises);

      // Synthesis call
      const synthesis = await synthesisePaper(qResults);

      // Save results
      const resultData = { paperId: paper.id, questionResults: qResults, synthesis, timestamp: Date.now() };
      const history = JSON.parse(localStorage.getItem("paper-history") || "[]");
      history.unshift(resultData);
      localStorage.setItem("paper-history", JSON.stringify(history.slice(0, 50)));

      // Clean up attempt
      localStorage.removeItem(STORAGE_KEY(paper.id));

      // Navigate to results
      navigate(`/papers/${paper.id}/results`, { state: resultData });
    } catch (err) {
      console.error("Marking failed:", err);
      alert(err instanceof Error ? err.message : "Marking failed. Please try again.");
    } finally {
      setIsMarking(false);
    }
  }, [paper, answers, images, navigate]);

  if (!paper) {
    return <div className="max-w-4xl mx-auto px-5 py-12 text-center text-muted-foreground">Paper not found.</div>;
  }

  if (isMarking) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-12">
        <h2 className="text-lg font-semibold text-foreground text-center mb-2">Marking your paper…</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Marking {paper.questions.length} questions in parallel. This may take 30–60 seconds.
        </p>
        <MarkingLoader />
      </div>
    );
  }

  const q = paper.questions[currentQ];
  const answerStatus = (id: string) => {
    if (answers[id]?.trim()) return "complete";
    if (images[id]) return "complete";
    return "not-started";
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-3">
          <Badge variant="outline">{paper.title}</Badge>
          <span className={cn("text-sm font-mono font-bold", timeLeft < 300 ? "text-red-400" : "text-foreground")}>
            <Clock className="h-4 w-4 inline mr-1" />
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY(paper.id), JSON.stringify({ answers, images, timestamp: Date.now() }));
              navigate("/papers");
            }}
          >
            <Save className="h-3.5 w-3.5 mr-1" /> Save & Exit
          </Button>
          <Button size="sm" onClick={handleSubmit} className="gap-1.5">
            <Send className="h-3.5 w-3.5" /> Submit Paper
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Question navigator */}
        <div className="w-48 shrink-0 hidden md:block">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Questions</h3>
          <div className="space-y-1.5">
            {paper.questions.map((pq, i) => {
              const status = answerStatus(pq.id);
              return (
                <button
                  key={pq.id}
                  onClick={() => setCurrentQ(i)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left",
                    i === currentQ ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    status === "complete" ? "bg-emerald-500" : "bg-muted-foreground/30"
                  )} />
                  {pq.questionNumber}
                  <Badge variant="outline" className="text-[9px] ml-auto">{pq.rubric.totalMarks}mk</Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main question pane */}
        <div className="flex-1 min-w-0">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{q.questionNumber}</Badge>
              <Badge variant="outline" className="text-[10px]">{q.rubric.totalMarks} marks</Badge>
              <Badge variant="outline" className="text-[10px] capitalize">{q.rubric.command}</Badge>
            </div>

            {q.extract && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground mb-4 italic">
                <span className="font-semibold text-foreground not-italic block mb-1">Extract</span>
                {q.extract}
              </div>
            )}

            <p className="text-sm text-foreground mb-4 font-medium">{q.questionText}</p>

            <Textarea
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
              placeholder="Type your answer here…"
              className="min-h-[200px] mb-3"
            />

            {/* Image upload */}
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-1.5">
                <Upload className="h-3.5 w-3.5" />
                {images[q.id] ? "Replace diagram" : "Upload diagram"}
              </Button>
              {images[q.id] && (
                <span className="text-xs text-emerald-400">✓ Diagram attached</span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentQ === 0}
              onClick={() => setCurrentQ((i) => i - 1)}
              className="gap-1"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Previous
            </Button>
            <span className="text-xs text-muted-foreground">{currentQ + 1} of {paper.questions.length}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentQ === paper.questions.length - 1}
              onClick={() => setCurrentQ((i) => i + 1)}
              className="gap-1"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
