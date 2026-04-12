import { useState } from "react";
import type { Rubric, DiagramReq, Level } from "@/lib/rubrics";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function StatusIcon({ critical }: { critical: boolean }) {
  return critical ? (
    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
  ) : (
    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
  );
}

export function MarkScheme({ rubric }: { rubric: Rubric }) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors w-full py-2">
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        Mark Scheme — {rubric.totalMarks} marks
        <Badge variant="outline" className="ml-auto text-[10px]">{rubric.command}</Badge>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-2 pb-4">
        {/* Diagram requirements */}
        {rubric.diagramRequirements && rubric.diagramRequirements.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Diagram Requirements</h4>
            <div className="space-y-1.5">
              {rubric.diagramRequirements.map((r) => (
                <div key={r.id} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-card border border-border">
                  <StatusIcon critical={r.critical} />
                  <span className="flex-1 text-foreground">{r.requirement}</span>
                  <Badge variant="secondary" className="text-[10px] shrink-0">{r.marks}mk{r.marks > 1 ? "s" : ""}</Badge>
                  {r.critical && <Badge className="text-[10px] bg-amber-500/20 text-amber-400 border-amber-500/30 shrink-0">Critical</Badge>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Level descriptors */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Level Descriptors</h4>
          <div className="space-y-1.5">
            {rubric.levels.map((l) => (
              <div key={l.level} className="flex items-start gap-3 text-xs p-2 rounded-lg bg-card border border-border">
                <Badge className="shrink-0 bg-violet-500/20 text-violet-400 border-violet-500/30 text-[10px]">
                  L{l.level} ({l.markRange[0]}–{l.markRange[1]})
                </Badge>
                <span className="text-muted-foreground">{l.descriptor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicative content */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Indicative Content</h4>
          <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
            {rubric.indicativeContent.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        {/* Key terms */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Terms</h4>
          <div className="flex flex-wrap gap-1.5">
            {rubric.keyTerms.map((t) => (
              <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
            ))}
          </div>
        </div>

        {/* Common errors */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Common Errors</h4>
          <ul className="space-y-1 text-xs text-red-400 list-disc list-inside">
            {rubric.commonErrors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function HowMarkingWorksModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Info className="h-3.5 w-3.5" />
          How marking works
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>How AI Marking Works</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>Your answers are marked using a <strong className="text-foreground">rubric-driven AI examiner</strong> that mirrors Edexcel's official mark scheme methodology.</p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-foreground">Evidence-based:</strong> Every mark is tied to a specific rubric criterion and a quoted snippet from your answer.</li>
            <li><strong className="text-foreground">Level-based:</strong> Your response is placed into Edexcel's 4-level framework (L1–L4).</li>
            <li><strong className="text-foreground">AO-weighted:</strong> Marks are allocated across AO1 (Knowledge), AO2 (Application), AO3 (Analysis), and AO4 (Evaluation).</li>
            <li><strong className="text-foreground">Constructive:</strong> You receive specific strengths, improvements, and a model answer improvement.</li>
          </ul>
          <p className="text-xs text-muted-foreground/70 italic pt-2 border-t border-border">
            This is an AI-powered practice tool — not an official Edexcel mark. Use it to identify gaps and improve your exam technique.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
