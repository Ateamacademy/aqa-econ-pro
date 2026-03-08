import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Lock, Bot, User } from "lucide-react";
import { toast } from "sonner";
import { RevisionRenderer } from "@/components/revision/RevisionRenderer";

type Msg = { role: "user" | "assistant"; content: string };

export default function AITutor() {
  const { user } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { setMessages([]); }, [subject]);

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to use the AI Tutor</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        mode: "tutor",
        subject,
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (err) => { toast.error(err); setIsLoading(false); },
      });
    } catch { setIsLoading(false); }
  };

  return (
    <div className="container py-6 max-w-3xl flex flex-col" style={{ height: "calc(100vh - 8rem)" }}>
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">AI {subjectLabel} Tutor</h1>
        <p className="text-sm text-muted-foreground">{examBoard} {level} · Ask any question and get structured, exam-focused explanations</p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-4 space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-7 w-7 text-primary" />
            </div>
            <p className="font-semibold text-lg text-foreground mb-1">Ask me anything about {subjectLabel}</p>
            <p className="text-sm max-w-md mx-auto">I'll break it down with clear headings, bullet points, key terms highlighted, and step-by-step explanations.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {["Explain the multiplier effect", "What causes market failure?", "Draw an AD/AS diagram"].map(s => (
                <button key={s} onClick={() => { setInput(s); }} className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              m.role === "user"
                ? "bg-primary text-primary-foreground text-sm"
                : "bg-muted/50 border border-border/50"
            }`}>
              {m.role === "assistant" ? (
                <RevisionRenderer content={m.content} />
              ) : m.content}
            </div>
            {m.role === "user" && (
              <div className="h-7 w-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-1">
                <User className="h-4 w-4 text-foreground/60" />
              </div>
            )}
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <div className="bg-muted/50 border border-border/50 rounded-2xl px-4 py-3 text-sm text-muted-foreground">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          className="flex-1 rounded-full h-11 px-5"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="rounded-full h-11 w-11">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}