import { useParams, useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Printer, ExternalLink } from "lucide-react";

/**
 * EdexcelMockPaperViewer — renders one of the nine static Pearson-style HTML
 * mock papers (Paper 1/2/3 × Moderate/Hard/Advanced) inside a sandboxed
 * iframe with a thin React toolbar.
 *
 * The legacy short-cut routes /paper-1, /paper-2, /paper-3 redirect here at
 * Moderate difficulty (set in App.tsx).
 */

type Difficulty = "moderate" | "hard" | "advanced";

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  moderate: "Moderate",
  hard: "Hard",
  advanced: "Advanced",
};

const DIFFICULTY_TONE: Record<Difficulty, string> = {
  moderate: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  hard: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  advanced: "bg-rose-500/15 text-rose-600 border-rose-500/30",
};

const PAPER_TITLE: Record<string, string> = {
  "1": "Markets and Business Behaviour",
  "2": "The National and Global Economy",
  "3": "Microeconomics and Macroeconomics",
};

export default function EdexcelMockPaperViewer() {
  const { paperNum, difficulty } = useParams<{ paperNum: string; difficulty: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Support legacy /paper-N shortcut
  const fromShortcut = location.pathname.match(/^\/paper-([123])$/)?.[1];
  const n = paperNum ?? fromShortcut;
  const d = (difficulty ?? "moderate") as Difficulty;

  const validPaper = n === "1" || n === "2" || n === "3";
  const validDifficulty = d === "moderate" || d === "hard" || d === "advanced";

  useEffect(() => {
    if (validPaper && validDifficulty) {
      document.title = `Edexcel A Paper ${n} (9EC0/0${n}) — ${DIFFICULTY_LABEL[d]} Mock`;
    }
  }, [n, d, validPaper, validDifficulty]);

  if (!validPaper || !validDifficulty) {
    if (fromShortcut && !difficulty) {
      return <Navigate to={`/mock-papers/edexcel-a/${fromShortcut}/moderate`} replace />;
    }
    return (
      <div className="container mx-auto p-8">
        <p className="text-muted-foreground">Unknown paper.</p>
        <Button onClick={() => navigate("/mock-papers")} className="mt-4">Back</Button>
      </div>
    );
  }

  const src = `/edexcel-a-mocks/paper-${n}-${d}.html`;
  const printIframe = () => {
    iframeRef.current?.contentWindow?.focus();
    iframeRef.current?.contentWindow?.print();
  };

  return (
    <div className="flex flex-col h-screen bg-muted/40">
      {/* Toolbar */}
      <div className="shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 py-3 px-4">
          <Link
            to="/mock-papers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All mock papers
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold">
              Paper {n}: {PAPER_TITLE[n!]}{" "}
              <span className="text-muted-foreground font-normal">(9EC0/0{n})</span>
            </span>
            <Badge variant="outline" className={`${DIFFICULTY_TONE[d]} font-semibold`}>
              {DIFFICULTY_LABEL[d]}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" className="gap-2">
              <a href={src} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" /> Open
              </a>
            </Button>
            <Button size="sm" onClick={printIframe} className="gap-2">
              <Printer className="h-4 w-4" /> Print / Save PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Booklet iframe */}
      <iframe
        ref={iframeRef}
        src={src}
        title={`Edexcel A Paper ${n} ${DIFFICULTY_LABEL[d]}`}
        className="flex-1 w-full border-0 bg-white"
      />
    </div>
  );
}
