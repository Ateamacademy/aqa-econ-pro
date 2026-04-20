import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EdexcelBooklet from "@/components/edexcel-booklet/EdexcelBooklet";
import "@/components/edexcel-booklet/edexcel-booklet.css";
import { getMockPaper } from "@/data/edexcelMockPapers";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";

/**
 * EdexcelMockPaperPage — renders one of the three hardcoded Edexcel A mock
 * exam papers (Paper 1, 2 or 3) as a Pearson-style A4 booklet.
 */
export default function EdexcelMockPaperPage() {
  const { paperNum } = useParams<{ paperNum: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const fromShortcut = location.pathname.match(/^\/paper-([123])$/)?.[1];
  const n = Number(paperNum ?? fromShortcut);

  useEffect(() => {
    document.title = `Edexcel A Paper ${n} (9EC0/0${n}) — Mock Exam`;
  }, [n]);

  if (n !== 1 && n !== 2 && n !== 3) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-muted-foreground">Unknown paper.</p>
        <Button onClick={() => navigate("/mock-papers")} className="mt-4">Back</Button>
      </div>
    );
  }

  const paper = getMockPaper(n as 1 | 2 | 3);

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Toolbar — hidden on print */}
      <div className="edx-no-print sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/mock-papers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All mock papers
          </Link>
          <div className="text-sm font-semibold">
            Paper {paper.number}: {paper.title} <span className="text-muted-foreground font-normal">({paper.code})</span>
          </div>
          <Button size="sm" onClick={() => window.print()} className="gap-2">
            <Printer className="h-4 w-4" /> Print / Save PDF
          </Button>
        </div>
      </div>

      <div className="py-6">
        <EdexcelBooklet paper={paper} />
      </div>
    </div>
  );
}
