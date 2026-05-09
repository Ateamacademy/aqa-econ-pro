import { useParams, useLocation, Link } from "react-router-dom";
import { getPaperById } from "@/lib/rubrics";
import { ResultPaper } from "@/components/marking/ResultPaper";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PaperResults() {
  const { paperId } = useParams<{ paperId: string }>();
  const location = useLocation();
  const paper = getPaperById(paperId || "");

  // Results come from navigation state or localStorage
  const state = location.state as any;
  let resultData = state;

  if (!resultData) {
    // Try to find in history
    const history = JSON.parse(localStorage.getItem("paper-history") || "[]");
    resultData = history.find((h: any) => h.paperId === paperId);
  }

  if (!paper || !resultData) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-12 text-center">
        <p className="text-muted-foreground">Results not found.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/papers">Back to Papers</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <Button variant="ghost" size="sm" className="mb-6 gap-1.5" asChild>
        <Link to="/papers"><ArrowLeft className="h-3.5 w-3.5" /> Back to Papers</Link>
      </Button>

      <h1 className="text-2xl font-bold text-foreground mb-2">{paper.title} · Results</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Completed {new Date(resultData.timestamp).toLocaleDateString()}
      </p>

      <ResultPaper
        synthesis={resultData.synthesis}
        questionResults={resultData.questionResults}
        paper={paper}
      />
    </div>
  );
}
