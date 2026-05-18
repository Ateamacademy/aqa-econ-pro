import { Link } from "react-router-dom";
import { FileText, CheckSquare, MessageCircle, ArrowRight } from "lucide-react";

interface Props {
  weakestTopic?: string;
}

export function CrossLinkStrip({ weakestTopic }: Props) {
  const tutorPrompt = weakestTopic
    ? `?topic=${encodeURIComponent(weakestTopic)}`
    : "";
  const links = [
    {
      to: "/predicted",
      icon: FileText,
      title: "Practise Paper 3",
      sub: "Predicted questions for your board",
    },
    {
      to: "/grader",
      icon: CheckSquare,
      title: "Get this marked",
      sub: "Instant AI marking with feedback",
    },
    {
      to: `/tutor${tutorPrompt}`,
      icon: MessageCircle,
      title: weakestTopic ? `Ask about ${weakestTopic}` : "Ask the 24/7 Tutor",
      sub: "Personalised help on weak topics",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {links.map((l) => {
        const Icon = l.icon;
        return (
          <Link
            key={l.title}
            to={l.to}
            className="group rounded-2xl border border-border bg-card p-4 hover:border-primary/40 hover:bg-primary/[0.03] transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-foreground truncate">{l.title}</h4>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{l.sub}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
