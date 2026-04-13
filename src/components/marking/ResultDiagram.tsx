import type { MarkingResult } from "@/lib/validation";
import type { Rubric } from "@/lib/rubrics";
import type { VerificationReport } from "@/lib/verification";
import { formatVerificationFindings } from "@/lib/verification";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, ArrowRight, Shield, Search, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { RemarkDialog } from "./RemarkDialog";
import { HowMarkingWorksModal } from "./MarkScheme";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const STATUS_STYLE = {
  met: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  partial: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  missing: { icon: HelpCircle, color: "text-muted-foreground", bg: "bg-muted/50", border: "border-border" },
  incorrect: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" },
};

const LEVEL_COLORS = {
  1: "bg-red-500/20 text-red-400 border-red-500/30",
  2: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  3: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  4: "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

interface Props {
  result: MarkingResult;
  rubric: Rubric;
  warning: string | null;
  onRemark?: (justification: string) => void;
  isReMarking?: boolean;
  previousResult?: MarkingResult | null;
  verification?: VerificationReport | null;
  validationFlags?: {
    capped: boolean;
    capReason: string | null;
    correctedRequirements: string[];
    recalculated: boolean;
    originalTotal: number;
  } | null;
}

export function ResultDiagram({ result, rubric, warning, onRemark, isReMarking, previousResult, verification, validationFlags }: Props) {
  const pct = Math.round((result.totalAwarded / result.totalPossible) * 100);
  const findings = verification ? formatVerificationFindings(verification) : [];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Integrity badge */}
        {validationFlags?.capped && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs">
            <Shield className="h-4 w-4 shrink-0" />
            <div>
              <span className="font-semibold">Marking integrity check applied.</span>
              {validationFlags.capReason && <span className="ml-1">{validationFlags.capReason}</span>}
            </div>
          </div>
        )}

        {validationFlags?.recalculated && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs">
            <Shield className="h-4 w-4 shrink-0" />
            Marks recalculated for accuracy.
          </div>
        )}

        {/* Warning banner */}
        {warning && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {warning}
          </div>
        )}

        {/* Verification findings panel */}
        {verification && findings.length > 0 && (
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Diagram Analysis</h3>
              <Badge variant="outline" className="text-[10px] ml-auto">Pre-marking verification</Badge>
            </div>
            <div className="space-y-1.5">
              {findings.map((finding, i) => (
                <div key={i} className={cn(
                  "text-xs px-2 py-1 rounded",
                  finding.startsWith("✓") ? "text-emerald-400" :
                  finding.startsWith("✗") ? "text-red-400" :
                  "text-muted-foreground"
                )}>
                  {finding}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score dial */}
        <div className="flex items-center gap-6 p-6 rounded-xl bg-card border border-border">
          <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="8"
                strokeDasharray={`${pct * 2.64} 264`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{result.totalAwarded}</span>
              <span className="text-xs text-muted-foreground">/{result.totalPossible}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={cn("text-xs", LEVEL_COLORS[result.level])}>Level {result.level}</Badge>
              <span className="text-lg font-bold text-foreground">{pct}%</span>
            </div>
            <p className="text-sm text-muted-foreground">{result.levelJustification}</p>
          </div>
        </div>

        {/* Requirement breakdown */}
        {result.requirementBreakdown.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Requirement Breakdown</h3>
            <div className="space-y-2">
              {result.requirementBreakdown.map((r) => {
                const style = STATUS_STYLE[r.status];
                const Icon = style.icon;

                // Determine verification status for this requirement
                let verifyIcon: "present" | "absent" | "unknown" = "unknown";
                if (verification) {
                  if (r.status === "met") verifyIcon = "present";
                  else if (r.status === "missing" || r.status === "incorrect") verifyIcon = "absent";
                  else verifyIcon = "unknown";
                }

                return (
                  <div key={r.id} className={cn("p-3 rounded-lg border", style.border, style.bg)}>
                    <div className="flex items-start gap-2">
                      <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", style.color)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-foreground">{r.requirement}</span>
                            {verification && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="text-xs">
                                    {verifyIcon === "present" ? "🔍" : verifyIcon === "absent" ? "⚠️" : "❓"}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {verifyIcon === "present" ? "Verified present in diagram" :
                                   verifyIcon === "absent" ? "No marks awarded — this feature was not detected in your diagram." :
                                   "Could not verify — marked based on available evidence"}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          <span className={cn("text-xs font-bold shrink-0", style.color)}>
                            {r.marksAwarded}/{r.marksAvailable}
                          </span>
                        </div>
                        {r.evidence && (
                          <p className="text-xs text-muted-foreground mt-1 italic">"{r.evidence}"</p>
                        )}
                        {r.examinerNote && (
                          <p className="text-xs text-muted-foreground mt-1">{r.examinerNote}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AO breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Assessment Objectives</h3>
          <div className="grid grid-cols-2 gap-3">
            {(["ao1", "ao2", "ao3", "ao4"] as const).map((ao) => {
              const data = result.writtenExplanation[ao];
              if (!data) return null;
              const aoPct = data.outOf > 0 ? Math.round((data.score / data.outOf) * 100) : 0;
              const label = { ao1: "AO1 Knowledge", ao2: "AO2 Application", ao3: "AO3 Analysis", ao4: "AO4 Evaluation" }[ao];
              return (
                <div key={ao} className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground">{label}</span>
                    <span className="text-xs text-muted-foreground">{data.score}/{data.outOf}</span>
                  </div>
                  <Progress value={aoPct} className="h-2 mb-1.5" />
                  <p className="text-[11px] text-muted-foreground">{data.comment}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 mb-2">✓ Strengths</h3>
            <div className="space-y-2">
              {result.strengths.map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-foreground">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-400 mb-2">△ Improvements</h3>
            <div className="space-y-2">
              {result.improvements.map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-foreground">{s}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Model improvement */}
        {result.modelImprovement && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Model Improvement</h3>
            <div className="p-4 rounded-lg bg-card border border-border text-sm text-muted-foreground italic">
              {result.modelImprovement}
            </div>
          </div>
        )}

        {/* Next steps */}
        {result.nextSteps && result.nextSteps.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Next Steps</h3>
            <div className="flex flex-wrap gap-2">
              {result.nextSteps.map((s, i) => (
                <Badge key={i} variant="outline" className="text-xs py-1.5 px-3 gap-1.5">
                  <ArrowRight className="h-3 w-3" /> {s}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <HowMarkingWorksModal />
          {onRemark && <RemarkDialog onRemark={onRemark} isReMarking={isReMarking ?? false} />}
        </div>

        {/* Previous result comparison */}
        {previousResult && (
          <div className="p-4 rounded-lg bg-card border border-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Previous Mark (for comparison)</h4>
            <p className="text-sm text-muted-foreground">
              Score: {previousResult.totalAwarded}/{previousResult.totalPossible} — Level {previousResult.level}
            </p>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
