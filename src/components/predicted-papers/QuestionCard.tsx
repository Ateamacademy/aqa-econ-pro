import { useState } from "react";
import { Send, Clock, FileText, Lightbulb, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

import type { ParsedQuestion } from "./parseQuestions";

interface QuestionCardProps {
  question: ParsedQuestion;
  answer: string;
  onAnswerChange: (val: string) => void;
  onMark: () => void;
  isMarking: boolean;
  feedback: {
    markScheme: string;
    modelAnswer: string;
    examinerTip: string;
  } | null;
}

export function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onMark,
  isMarking,
  feedback,
}: QuestionCardProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const sections = feedback
    ? [
        { key: "markScheme", label: "Mark Scheme", icon: Clock, content: feedback.markScheme },
        { key: "modelAnswer", label: "Model Answer", icon: FileText, content: feedback.modelAnswer },
        { key: "examinerTip", label: "Examiner Tip", icon: Lightbulb, content: feedback.examinerTip },
      ]
    : [];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Question header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="font-bold text-sm text-foreground">{question.label}</h3>
          <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
            {question.marks} marks
          </span>
        </div>
        <p className="text-sm text-foreground/90">{question.text}</p>
      </div>

      {/* Answer area */}
      <div className="p-5 border-b border-border bg-muted/30">
        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
          <Send className="h-3.5 w-3.5" /> Your Answer
        </p>
        <Textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          rows={5}
          placeholder="Type your answer here... The AI examiner will mark it for you."
          className="bg-background"
          disabled={!!feedback}
        />
      </div>

      {/* Actions */}
      <div className="p-4 flex flex-wrap items-center gap-2">
        {!feedback ? (
          <Button
            size="sm"
            onClick={onMark}
            disabled={isMarking || !answer.trim()}
            className="gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            {isMarking ? "Marking..." : "Mark My Answer"}
          </Button>
        ) : (
          sections.map((s) => (
            <Collapsible key={s.key} open={openSection === s.key} onOpenChange={() => toggle(s.key)}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      openSection === s.key && "rotate-180"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 px-1">
                <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/40 rounded-lg p-4">
                  <ReactMarkdown>{s.content}</ReactMarkdown>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </div>
    </div>
  );
}
