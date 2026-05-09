import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { useNavigate } from "react-router-dom";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle, Send, Lock, Bot, User, Mic, ChevronRight, ChevronDown,
  BookOpen, Lightbulb, HelpCircle, GraduationCap, Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { RevisionRenderer } from "@/components/revision/RevisionRenderer";
import { topicsBySubject } from "@/lib/subjectConfig";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FREE_LIMITS } from "@/lib/plans";
import { UpgradeModal } from "@/components/UpgradeModal";

type Msg = { role: "user" | "assistant"; content: string };

/* ─── Topic tree grouped into Micro / Macro ─── */
function buildTopicTree(topics: string[]) {
  const micro = topics.filter((t) =>
    /demand|supply|elast|market|fail|extern|public good|merit|interven|compet|labour|wage|cost|revenue|surplus|contest|business|structure|mono/i.test(t)
  );
  const macro = topics.filter((t) => !micro.includes(t));
  return [
    { label: "Microeconomics", topics: micro.length > 0 ? micro : topics.slice(0, Math.ceil(topics.length / 2)) },
    { label: "Macroeconomics", topics: macro.length > 0 ? macro : topics.slice(Math.ceil(topics.length / 2)) },
  ];
}

const quickActions = [
  { label: "Explain this", icon: Lightbulb, prefix: "Explain the concept of " },
  { label: "Real-world example", icon: BookOpen, prefix: "Give me a real-world example of " },
  { label: "Test me", icon: GraduationCap, prefix: "Test me with a practice question on " },
  { label: "Compare & contrast", icon: HelpCircle, prefix: "Compare and contrast the key differences between " },
];

export default function AITutor() {
  const { user, subscribed, profile, refreshProfile } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ Microeconomics: true, Macroeconomics: false });
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const tutorUsed = profile?.free_tutor_used ?? 0;
  const canUse = subscribed || tutorUsed < FREE_LIMITS.tutorQuestions;

  const topics = topicsBySubject[subject] || [];
  const tree = buildTopicTree(topics);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { setMessages([]); setActiveTopic(null); }, [subject]);

  const selectTopic = (topic: string) => {
    setActiveTopic(topic);
    setInput(`Explain ${topic} for ${examBoard} ${level} ${subjectLabel}`);
  };

  if (!user) {
    return (
      <div className="container py-24 max-w-3xl text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Sign in to use the 24/7 Tutor</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Get instant, curriculum-aligned explanations for any topic.</p>
        <Button onClick={() => navigate("/auth")} size="lg" className="rounded-full px-10 shadow-lg shadow-primary/20">Sign In</Button>
      </div>
    );
  }

  const send = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;
    if (!canUse) { setShowUpgrade(true); return; }
    const userMsg: Msg = { role: "user", content: text };
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
        onDone: async () => {
          setIsLoading(false);
          if (!subscribed && profile) {
            await supabase.from("profiles").update({ free_tutor_used: (profile.free_tutor_used ?? 0) + 1 } as any).eq("user_id", user!.id);
            refreshProfile();
          }
        },
        onError: (err) => { toast.error(err); setIsLoading(false); },
      });
    } catch { setIsLoading(false); }
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const clearChat = () => {
    setMessages([]);
    setActiveTopic(null);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background">
      {/* ═══ LEFT PANEL · Topic Navigator ═══ */}
      <aside className="hidden lg:flex flex-col w-[320px] border-r border-border bg-card/50 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-foreground truncate">24/7 {subjectLabel} Tutor</h2>
              <p className="text-[10px] text-muted-foreground">{examBoard} {level}</p>
            </div>
          </div>
        </div>

        {/* Topic Tree */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">Topics</p>
          {tree.map((group) => (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {expandedGroups[group.label] ? (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                )}
                {group.label}
                <span className="ml-auto text-[10px] text-muted-foreground/60">{group.topics.length}</span>
              </button>
              <AnimatePresence>
                {expandedGroups[group.label] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-5 space-y-0.5 pb-2">
                      {group.topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => selectTopic(topic)}
                          className={cn(
                            "w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all truncate",
                            activeTopic === topic
                              ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Clear chat button */}
        {messages.length > 0 && (
          <div className="p-3 border-t border-border/60">
            <Button variant="ghost" size="sm" onClick={clearChat} className="w-full gap-2 text-xs text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Clear Conversation
            </Button>
          </div>
        )}
      </aside>

      {/* ═══ RIGHT PANEL · Chat Interface ═══ */}
      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-64px)]">
        {/* Chat header (mobile) */}
        <div className="lg:hidden px-5 py-3 border-b border-border bg-background/80 backdrop-blur-xl">
          <h1 className="text-lg font-bold text-foreground">24/7 {subjectLabel} Tutor</h1>
          <p className="text-xs text-muted-foreground">{examBoard} {level}</p>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-5 border border-primary/15">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Ask me anything about {subjectLabel}</h2>
              <p className="text-sm text-muted-foreground max-w-md mb-8">
                I'll give you revision-guide-style answers with headings, diagrams, key terms, and exam tips.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Try asking</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {["Explain the multiplier effect", "What causes market failure?", "Compare fiscal and monetary policy", "Draw a negative externality diagram"].map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-4 py-2 rounded-full border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                m.role === "user"
                  ? "bg-primary text-primary-foreground text-sm"
                  : "bg-card border border-border/60 shadow-sm"
              )}>
                {m.role === "assistant" ? (
                  <RevisionRenderer content={m.content} />
                ) : m.content}
              </div>
              {m.role === "user" && (
                <div className="h-8 w-8 rounded-xl bg-foreground/10 flex items-center justify-center shrink-0 mt-1">
                  <User className="h-4 w-4 text-foreground/60" />
                </div>
              )}
            </motion.div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <div className="bg-card border border-border/60 rounded-2xl px-4 py-3 text-sm text-muted-foreground shadow-sm">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                </span>{" "}Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick-action chips */}
        {messages.length > 0 && (
          <div className="px-4 lg:px-8 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => {
                      const topic = activeTopic || subjectLabel;
                      send(`${action.prefix}${topic}`);
                    }}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
                  >
                    <Icon className="h-3 w-3" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input bar */}
        <div className="px-4 lg:px-8 pb-5 pt-2 border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={activeTopic ? `Ask about ${activeTopic}...` : "Ask a question..."}
                disabled={isLoading}
                className="rounded-full h-12 pl-5 pr-12 bg-card border-border/60 text-sm shadow-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                title="Voice input (coming soon)"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full h-12 w-12 shadow-lg shadow-primary/20 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            {subscribed ? "Unlimited questions" : `${FREE_LIMITS.tutorQuestions - tutorUsed} free question(s) remaining`}
          </p>
        </div>
      </div>
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} feature="24/7 Tutor questions" />
    </div>
  );
}
