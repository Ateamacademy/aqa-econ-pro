import { Link } from "react-router-dom";
import { samplePapers } from "@/lib/rubrics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, ArrowRight, ExternalLink, ClipboardList } from "lucide-react";
import { useSubject } from "@/contexts/SubjectContext";
import { PremiumGate } from "@/components/PremiumGate";

type Difficulty = "moderate" | "hard" | "advanced";

const EDEXCEL_A_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string }[] = [
  { number: 1, code: "9EC0/01", title: "Markets and Business Behaviour", focus: "Microeconomics" },
  { number: 2, code: "9EC0/02", title: "The National and Global Economy", focus: "Macroeconomics" },
  { number: 3, code: "9EC0/03", title: "Microeconomics and Macroeconomics", focus: "Synoptic" },
];

const EDEXCEL_B_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "9EB0/01", title: "Markets, Consumers and Firms", focus: "Microeconomics", available: true },
  { number: 2, code: "9EB0/02", title: "The Wider Economic Environment", focus: "Macroeconomics", available: true },
  { number: 3, code: "9EB0/03", title: "The Global Economy", focus: "Synoptic", available: true },
];

const OCR_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "H460/01", title: "Microeconomics",                            focus: "Microeconomics", available: true  },
  { number: 2, code: "H460/02", title: "Macroeconomics",                            focus: "Macroeconomics", available: true  },
  { number: 3, code: "H460/03", title: "Themes in Economics",                       focus: "Synoptic",       available: true  },
];

const CAIE_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; duration: string; marks: number; available: boolean }[] = [
  { number: 1, code: "9708/01", title: "Multiple Choice (AS)",          focus: "Microeconomics & Macroeconomics", duration: "1h",    marks: 30, available: true  },
  { number: 2, code: "9708/02", title: "Data Response and Essays (AS)", focus: "AS Core",                          duration: "1h 30", marks: 40, available: true  },
  { number: 3, code: "9708/03", title: "Multiple Choice (A2)",          focus: "Advanced Theory",                  duration: "1h 15", marks: 30, available: true  },
  
];

const DIFFICULTIES: { id: Difficulty; label: string; tone: string }[] = [
  { id: "moderate", label: "Moderate", tone: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { id: "hard",     label: "Hard",     tone: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { id: "advanced", label: "Advanced", tone: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
];

function EdexcelAPapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Edexcel A A-Level — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Nine full mock papers (Paper 1, 2 & 3 × Moderate, Hard, Advanced) in the authentic
          Pearson Edexcel format, each paired with its full mark scheme.
        </p>
      </div>

      <div className="space-y-8">
        {EDEXCEL_A_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 2h · 100 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const isPdf =
                  (p.number === 1 && (d.id === "moderate" || d.id === "hard" || d.id === "advanced")) ||
                  (p.number === 2 && (d.id === "moderate" || d.id === "hard" || d.id === "advanced")) ||
                  (p.number === 3 && (d.id === "moderate" || d.id === "hard" || d.id === "advanced"));
                const ext = isPdf ? "pdf" : "html";
                const paperHref = `/edexcel-a-mocks/paper-${p.number}-${d.id}.${ext}`;
                const msHref = `/edexcel-a-mocks/mark-scheme-paper-${p.number}-${d.id}.${ext}`;
                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                        <Button asChild size="sm" className="h-7 gap-1 text-xs">
                          {isPdf ? (
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link to={`/mock-papers/edexcel-a/${p.number}/${d.id}`}>
                              View <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                          {isPdf ? (
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link to={`/mock-papers/edexcel-a/${p.number}/${d.id}/mark-scheme`}>
                              View <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function EdexcelBPapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Edexcel B A-Level — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Paper 3 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced.
        </p>
      </div>

      <div className="space-y-8">
        {EDEXCEL_B_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 2h · 100 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/edexcel-b-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/edexcel-b-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;

                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const AQA_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "7136/1", title: "Markets and Market Failure",          focus: "Microeconomics", available: true  },
  { number: 2, code: "7136/2", title: "National and International Economy",  focus: "Macroeconomics", available: true  },
  { number: 3, code: "7136/3", title: "Economic Principles and Issues",      focus: "Synoptic",       available: true  },
];

function AqaPapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">AQA A-Level — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Full mock papers (Paper 1, 2 & 3 × Moderate, Hard, Advanced) in the authentic
          AQA format, each paired with its full mark scheme.
        </p>
      </div>

      <div className="space-y-8">
        {AQA_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 2h · 80 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/aqa-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/aqa-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;
                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    {/* Question paper */}
                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Mark scheme */}
                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function OcrPapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">OCR A-Level — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced.
        </p>
      </div>

      <div className="space-y-8">
        {OCR_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 2h · 80 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/ocr-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/ocr-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;

                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const EDUQAS_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "A510QS-1", title: "Introduction to Economics",   focus: "Micro",            available: true  },
  { number: 2, code: "A510QS-2", title: "Exploring Economic Issues",   focus: "Macro",            available: true  },
  { number: 3, code: "A510QS-3", title: "Economic Analysis & Policy",  focus: "Synoptic A2",      available: true  },
];

function EduqasPapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Eduqas A-Level — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Full timed papers paired with mark schemes across Moderate, Hard, and Advanced difficulty tiers.
        </p>
      </div>

      <div className="space-y-8">
        {EDUQAS_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 2h · 80 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/eduqas-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/eduqas-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;

                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const WJEC_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "1090U10-1", title: "Introduction to Economics",                  focus: "AS Micro",       available: true  },
  { number: 2, code: "1090U20-1", title: "Economics in Action",                        focus: "AS Macro",       available: true  },
  { number: 3, code: "A090U30-1", title: "Exploring Economic Behaviour",               focus: "A2 Micro/Macro", available: true  },
];

function WjecPapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">WJEC A-Level — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced.
        </p>
      </div>

      <div className="space-y-8">
        {WJEC_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 2h · 80 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/wjec-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/wjec-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;

                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function CaiePapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">CAIE A-Level — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced.
        </p>
      </div>

      <div className="space-y-8">
        {CAIE_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · {p.duration} · {p.marks} marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/caie-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/caie-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;

                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const AQA_GCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "8136/1", title: "How Markets Work",       focus: "Microeconomics", available: true  },
  { number: 2, code: "8136/2", title: "How the Economy Works",  focus: "Macroeconomics", available: true  },
];

const EDEXCEL_IGCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "4EC1/01", title: "Microeconomics & Business Economics", focus: "Microeconomics", available: true },
  { number: 2, code: "4EC1/02", title: "Macroeconomics & the Global Economy", focus: "Macroeconomics", available: true },
];

const CAIE_IGCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; duration: string; marks: number; available: boolean }[] = [
  { number: 1, code: "0455/01", title: "Multiple Choice", focus: "All topics", duration: "45m", marks: 30, available: true },
  { number: 2, code: "0455/02", title: "Structured Questions", focus: "Data response & essays", duration: "2h 15m", marks: 90, available: true },
];

const OCR_GCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "J205/01", title: "Introduction to Economics", focus: "Microeconomics", available: true },
  { number: 2, code: "J205/02", title: "National and International Economics", focus: "Macroeconomics", available: true },
];

function OcrGcsePapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">OCR GCSE — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Full mock papers (Moderate, Hard, Advanced) in the authentic OCR GCSE (J205) format,
          each paired with its full mark scheme.
        </p>
      </div>

      <div className="space-y-8">
        {OCR_GCSE_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 1h 30m · 80 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/ocr-gcse-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/ocr-gcse-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;
                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function EdexcelIgcsePapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Edexcel IGCSE — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Full mock papers (Moderate, Hard, Advanced) in the authentic Edexcel IGCSE (4EC1) format,
          each paired with its full mark scheme.
        </p>
      </div>

      <div className="space-y-8">
        {EDEXCEL_IGCSE_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 1h 30m · 80 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/edexcel-igcse-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/edexcel-igcse-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;
                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function AqaGcsePapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">AQA GCSE — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Full mock papers (Moderate, Hard, Advanced) in the authentic AQA GCSE format,
          each paired with its full mark scheme.
        </p>
      </div>

      <div className="space-y-8">
        {AQA_GCSE_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · 1h 45m · 80 marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/aqa-gcse-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/aqa-gcse-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;
                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function CaieIgcsePapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Cambridge IGCSE — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Full mock papers (Moderate, Hard, Advanced) in the authentic Cambridge IGCSE Economics (0455) format,
          each paired with its full mark scheme.
        </p>
      </div>

      <div className="space-y-8">
        {CAIE_IGCSE_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · {p.duration} · {p.marks} marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/caie-igcse-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/caie-igcse-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;
                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}


const IB_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; duration: string; marks: number; available: boolean }[] = [
  { number: 1, code: "IBDP P1", title: "Extended Response (HL & SL)", focus: "Microeconomics & Macroeconomics", duration: "1h 15m", marks: 25, available: true  },
  { number: 2, code: "IBDP P2", title: "Data Response (HL & SL)",     focus: "Stimulus-based",                  duration: "1h 45m", marks: 40, available: true  },
  { number: 3, code: "IBDP P3", title: "Policy Paper (HL only)",      focus: "Quantitative & Policy",           duration: "1h 45m", marks: 60, available: true  },
];

function IbPapersList() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">IB HL/SL — Papers</h1>
        <p className="text-sm text-muted-foreground">
          Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced.
        </p>
      </div>

      <div className="space-y-8">
        {IB_PAPERS.map((p) => (
          <section key={p.code}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Paper {p.number}: {p.title}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                {p.code} · {p.focus} · {p.duration} · {p.marks} marks
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {DIFFICULTIES.map((d) => {
                const paperHref = `/ib-mocks/paper-${p.number}-${d.id}.pdf`;
                const msHref = `/ib-mocks/mark-scheme-paper-${p.number}-${d.id}.pdf`;
                const disabled = !p.available;

                return (
                  <div
                    key={d.id}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${d.tone} font-semibold`}>
                        {d.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Paper {p.number} {d.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">Paper {p.number}</span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" className="h-7 gap-1 text-xs">
                            <a href={paperHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Paper {p.number} {d.label} Marking scheme
                        </span>
                      </div>
                      {disabled ? (
                        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
                      ) : (
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <a href={msHref} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-7 gap-1 text-xs">
                            <a href={msHref} target="_blank" rel="noopener noreferrer">
                              View <ArrowRight className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function PapersInner() {
  const { subject } = useSubject();

  if (subject === "edexcel-a") {
    return <EdexcelAPapersList />;
  }

  if (subject === "edexcel-b") {
    return <EdexcelBPapersList />;
  }

  if (subject === "ocr") {
    return <OcrPapersList />;
  }

  if (subject === "cambridge") {
    return <CaiePapersList />;
  }

  if (subject === "wjec") {
    return <WjecPapersList />;
  }

  if (subject === "eduqas") {
    return <EduqasPapersList />;
  }

  if (subject === "economics") {
    return <AqaPapersList />;
  }

  if (subject === "aqa-gcse") {
    return <AqaGcsePapersList />;
  }

  if (subject === "edexcel-igcse") {
    return <EdexcelIgcsePapersList />;
  }

  if (subject === "cambridge-igcse") {
    return <CaieIgcsePapersList />;
  }

  if (subject === "ocr-gcse") {
    return <OcrGcsePapersList />;
  }

  if (subject === "ib") {
    return <IbPapersList />;
  }

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

export default function Papers() {
  return (
    <PremiumGate
      feature="Papers"
      description="The full mock-paper library — Moderate, Hard and Advanced — across every supported board. Includes mark schemes and AI marking."
    >
      <PapersInner />
    </PremiumGate>
  );
}
