import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  boardName: string;
}

/**
 * Friendly "coming soon" panel shown in the Predicted Papers section when a
 * student selects a board whose definition is `refinementStatus !== "refined"`.
 */
export function ComingSoonBoard({ boardName }: Props) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-8 md:p-10">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold mb-4">
        <Sparkles className="h-3.5 w-3.5" /> Coming soon
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-3">
        Predicted papers for {boardName} are coming soon
      </h2>
      <p className="text-sm text-muted-foreground max-w-2xl mb-6">
        We're working on producing papers that match {boardName}'s exact structure,
        question style, and mark-scheme conventions. In the meantime, you can:
      </p>
      <ul className="space-y-2 mb-8 text-sm text-foreground/90">
        <li className="flex items-start gap-2">
          <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          Use the AQA A-Level predicted papers (most similar content coverage)
        </li>
        <li className="flex items-start gap-2">
          <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          Generate practice questions via the Practice section
        </li>
        <li className="flex items-start gap-2">
          <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          Try the 24/7 Tutor for {boardName}-specific exam-technique questions
        </li>
      </ul>
      <div className="flex flex-wrap gap-3">
        <Button asChild className="rounded-full px-6">
          <Link to="/practice">Open Practice</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/tutor">Ask the 24/7 Tutor</Link>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-6">
        We'll notify you when {boardName} papers become available.
      </p>
    </div>
  );
}
