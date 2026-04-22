import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowRight, ExternalLink } from "lucide-react";

/**
 * EdexcelMockPapersIndex — landing page for the 9 Edexcel A A-Level mock
 * papers (3 papers × 3 difficulty tiers: Moderate / Hard / Advanced).
 *
 * Each paper is a static, print-ready Pearson-style HTML booklet hosted in
 * /public/edexcel-a-mocks/. The index opens them via an in-app iframe viewer.
 */

type Difficulty = "moderate" | "hard" | "advanced";

interface PaperMeta {
  number: 1 | 2 | 3;
  code: "9EC0/01" | "9EC0/02" | "9EC0/03";
  title: string;
  focus: string;
}

const PAPERS: PaperMeta[] = [
  { number: 1, code: "9EC0/01", title: "Markets and Business Behaviour", focus: "Microeconomics" },
  { number: 2, code: "9EC0/02", title: "The National and Global Economy", focus: "Macroeconomics" },
  { number: 3, code: "9EC0/03", title: "Microeconomics and Macroeconomics", focus: "Synoptic" },
];

const DIFFICULTIES: { id: Difficulty; label: string; tone: string }[] = [
  { id: "moderate", label: "Moderate", tone: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" },
  { id: "hard",     label: "Hard",     tone: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
  { id: "advanced", label: "Advanced", tone: "bg-rose-500/15 text-rose-600 border-rose-500/30" },
];

export default function EdexcelMockPapersIndex() {
  useEffect(() => {
    document.title = "Edexcel A A-Level Economics Mock Papers (9EC0)";
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Edexcel A A-Level Economics — Mock Papers
        </h1>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          Nine full-length practice papers (Paper 1, 2 and 3 × Moderate, Hard and Advanced
          difficulty) rendered in the authentic Pearson Edexcel booklet format. Open in the
          viewer to read on screen or print to PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PAPERS.map((p) => (
          <Card key={p.code} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-xs font-mono text-muted-foreground">{p.code}</span>
              </div>
              <CardTitle className="text-lg leading-snug mt-2">
                Paper {p.number}: {p.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {p.focus} · 2 hours · 100 marks
              </p>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-3">
              {DIFFICULTIES.map((d) => {
                const isPdf = p.number === 1 && (d.id === "moderate" || d.id === "hard" || d.id === "advanced");
                const ext = isPdf ? "pdf" : "html";
                const href = `/edexcel-a-mocks/paper-${p.number}-${d.id}.${ext}`;
                return (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-2 rounded-lg border p-3"
                >
                  <Badge variant="outline" className={`${d.tone} font-semibold`}>
                    {d.label}
                  </Badge>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in new tab"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button asChild size="sm" className="gap-1.5">
                      {isPdf ? (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          View <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <Link to={`/mock-papers/edexcel-a/${p.number}/${d.id}`}>
                          View <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </Button>
                  </div>
                </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Tip: clicking the external-link icon opens the paper directly in a new tab — useful
        for printing without the in-app toolbar.
      </p>
    </div>
  );
}
