import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ImageOff, CheckCircle2 } from "lucide-react";
import { predictedPapersLibrary } from "@/data/predictedPapersLibrary";
import { parseQuestions } from "@/components/predicted-papers/parseQuestions";
import { tagAqaQuestion, inferPaperFromContext } from "@/lib/aqaPredictedDiagramTagging";
import { pickReferenceFigure, buildCoverageReport } from "@/lib/aqa-diagram-catalog";

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";

interface MissingRow {
  paperId: string;
  paperLabel: string;
  setLabel: string;
  questionLabel: string;
  diagramType: string;
  marks: number;
}

export default function AdminMissingFigures() {
  const { user } = useAuth();

  const { missing, totals } = useMemo(() => {
    const out: MissingRow[] = [];
    let withFig = 0;
    let total = 0;
    for (const lp of predictedPapersLibrary.filter((p) => p.subject === "economics")) {
      const paperNum = inferPaperFromContext(lp.paper);
      const parsed = parseQuestions(lp.content);
      for (const q of parsed.questions) {
        const isMcq = !!q.mcqOptions && q.mcqOptions.length >= 2;
        const tag = tagAqaQuestion({
          number: q.number ?? "",
          marks: q.marks,
          text: q.text,
          isMcq,
          paper: paperNum,
        });
        if (!tag || !tag.requiresDiagram || tag.optional) continue;
        total++;
        const pick = pickReferenceFigure({
          diagramType: tag.diagramType,
          paperSetLabel: lp.set,
          questionNumber: q.number,
          hint: q.text,
        });
        if (pick) {
          withFig++;
        } else {
          out.push({
            paperId: lp.id,
            paperLabel: lp.title,
            setLabel: lp.set,
            questionLabel: q.label,
            diagramType: tag.diagramType,
            marks: q.marks,
          });
        }
      }
    }
    return { missing: out, totals: { total, withFig, missing: out.length } };
  }, []);

  const coverage = useMemo(() => buildCoverageReport(), []);

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="container max-w-3xl py-16">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground">Admin access only.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AQA — Reference figure coverage</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Diagram-required questions across the AQA predicted-paper library and
          whether each has a catalogued reference figure.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Diagram-required Qs" value={totals.total} />
        <StatCard label="Have a figure" value={totals.withFig} accent="ok" />
        <StatCard label="Missing figure" value={totals.missing} accent={totals.missing ? "warn" : "ok"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageOff className="h-4 w-4" /> Questions needing a template
          </CardTitle>
        </CardHeader>
        <CardContent>
          {missing.length === 0 ? (
            <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Every diagram-required
              question has a catalogued reference figure.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {missing.map((m, i) => (
                <div key={i} className="py-2.5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">
                      {m.paperLabel} · Set {m.setLabel} · {m.questionLabel}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      diagramType: <code className="font-mono">{m.diagramType}</code> · {m.marks}{" "}
                      marks
                    </div>
                  </div>
                  <Link to="/diagram-library">
                    <Button size="sm" variant="outline" className="gap-1.5 h-8">
                      Open Diagrams <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Specification coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {coverage.map((c) => (
              <div
                key={c.code}
                className="flex items-center justify-between rounded-md border border-border px-2.5 py-1.5 text-xs"
              >
                <span className="font-mono">{c.code}</span>
                {c.covered ? (
                  <Badge variant="secondary" className="text-[10px]">
                    {c.entries.length}
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-[10px]">
                    none
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "ok" | "warn";
}) {
  const tone =
    accent === "ok"
      ? "border-emerald-500/30 bg-emerald-500/5"
      : accent === "warn"
        ? "border-amber-500/30 bg-amber-500/5"
        : "border-border";
  return (
    <Card className={tone}>
      <CardContent className="p-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}
