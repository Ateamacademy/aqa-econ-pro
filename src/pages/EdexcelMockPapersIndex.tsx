import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { EDEXCEL_MOCK_PAPERS } from "@/data/edexcelMockPapers";

/**
 * EdexcelMockPapersIndex — landing page listing the three Edexcel A
 * Pearson-style mock exam papers (9EC0/01, 9EC0/02, 9EC0/03).
 */
export default function EdexcelMockPapersIndex() {
  useEffect(() => {
    document.title = "Edexcel A A-Level Economics Mock Papers (9EC0)";
  }, []);

  const papers = [EDEXCEL_MOCK_PAPERS[1], EDEXCEL_MOCK_PAPERS[2], EDEXCEL_MOCK_PAPERS[3]];

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edexcel A A-Level Economics — Mock Papers</h1>
        <p className="mt-2 text-muted-foreground">
          Three full-length practice papers (Paper 1, 2 and 3) rendered in the authentic Pearson Edexcel
          booklet format. Print or save to PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {papers.map((p) => (
          <Card key={p.code} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-xs font-mono text-muted-foreground">{p.code}</span>
              </div>
              <CardTitle className="text-lg leading-snug mt-2">
                Paper {p.number}: {p.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <dl className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Date</dt>
                  <dd className="font-medium text-foreground">{p.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Duration</dt>
                  <dd className="font-medium text-foreground">2 hours</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Total marks</dt>
                  <dd className="font-medium text-foreground">{p.totalMarks}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Sections</dt>
                  <dd className="font-medium text-foreground">A · B · C</dd>
                </div>
              </dl>
              <div className="mt-auto pt-5">
                <Button asChild className="w-full gap-2">
                  <Link to={`/mock-papers/edexcel-a/${p.number}`}>
                    View Paper <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
