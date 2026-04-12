import { useParams, useNavigate, Link } from "react-router-dom";
import { getPaperById } from "@/lib/rubrics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarkScheme } from "@/components/marking/MarkScheme";
import { Clock, FileText, ArrowRight, ArrowLeft } from "lucide-react";

export default function PaperOverview() {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const paper = getPaperById(paperId || "");

  if (!paper) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-12 text-center">
        <p className="text-muted-foreground">Paper not found.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/papers">Back to Papers</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <Button variant="ghost" size="sm" className="mb-6 gap-1.5" onClick={() => navigate("/papers")}>
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Papers
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">{paper.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {paper.timeMinutes} minutes</span>
          <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {paper.totalMarks} marks</span>
          <Badge variant="outline">{paper.board}</Badge>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-foreground">Questions</h2>
        {paper.questions.map((q) => (
          <div key={q.id} className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">{q.questionNumber}</Badge>
              <Badge variant="outline" className="text-[10px]">{q.rubric.totalMarks} marks</Badge>
              <Badge variant="outline" className="text-[10px] capitalize">{q.rubric.questionType}</Badge>
            </div>
            <p className="text-sm text-foreground mb-3">{q.questionText}</p>
            {q.extract && (
              <div className="p-3 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground mb-3 italic">
                {q.extract}
              </div>
            )}
            <MarkScheme rubric={q.rubric} />
          </div>
        ))}
      </div>

      <Button size="lg" className="w-full gap-2" onClick={() => navigate(`/papers/${paper.id}/attempt`)}>
        Start Paper <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
