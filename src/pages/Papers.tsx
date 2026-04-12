import { Link } from "react-router-dom";
import { samplePapers } from "@/lib/rubrics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, ArrowRight } from "lucide-react";

export default function Papers() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Predicted Papers</h1>
        <p className="text-sm text-muted-foreground">Full timed papers with rubric-driven AI marking. See exactly how an examiner would grade your work.</p>
      </div>
      <div className="grid gap-4">
        {samplePapers.map((paper) => (
          <Link
            key={paper.id}
            to={`/papers/${paper.id}`}
            className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {paper.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {paper.timeMinutes} min</span>
                  <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {paper.totalMarks} marks</span>
                  <Badge variant="outline" className="text-[10px]">{paper.board}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {paper.questions.length} questions — includes {paper.questions.filter(q => q.rubric.questionType === "essay").length} essay(s)
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
