import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ScanSearch, CheckCircle, AlertTriangle, XCircle, Copy, Eye, EyeOff } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FigureAnalysisItem {
  figureId: string;
  figureTitle: string;
  figureDescription: string;
  precedingExtract?: string;
  followingExtract?: string;
  relevanceDecision: "relevant" | "irrelevant" | "duplicate" | "ambiguous";
  confidenceScore: number;
  reason: string;
  isDuplicate: boolean;
  duplicateOf?: string;
}

interface FigureAnalysisResult {
  examBoard: string;
  paperTitle: string;
  figures: FigureAnalysisItem[];
  cleanedContent: string;
  summary: string;
}

interface FigureAnalysisPanelProps {
  paperContent: string;
  examBoard: string;
  paperTitle: string;
  onCleanedContent?: (content: string) => void;
  className?: string;
}

const DECISION_CONFIG = {
  relevant: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", label: "Relevant" },
  irrelevant: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", label: "Irrelevant" },
  duplicate: { icon: Copy, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", label: "Duplicate" },
  ambiguous: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Ambiguous" },
} as const;

export function FigureAnalysisPanel({
  paperContent,
  examBoard,
  paperTitle,
  onCleanedContent,
  className,
}: FigureAnalysisPanelProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FigureAnalysisResult | null>(null);
  const [showDetails, setShowDetails] = useState(true);

  const runAnalysis = async () => {
    if (!paperContent?.trim()) {
      toast.error("No paper content to analyze");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-paper-figures", {
        body: { paperContent, examBoard, paperTitle },
      });

      if (error) {
        console.error("Figure analysis error:", error);
        toast.error("Analysis failed. Please try again.");
        return;
      }

      setResult(data as FigureAnalysisResult);

      const irrelevantCount = (data as FigureAnalysisResult).figures.filter(
        (f) => f.relevanceDecision === "irrelevant" || f.relevanceDecision === "duplicate"
      ).length;

      if (irrelevantCount > 0) {
        toast.warning(`Found ${irrelevantCount} irrelevant/duplicate figure(s)`);
        if (onCleanedContent && data.cleanedContent) {
          onCleanedContent(data.cleanedContent);
        }
      } else {
        toast.success("All figures are contextually relevant");
      }
    } catch (err) {
      console.error("Figure analysis error:", err);
      toast.error("Analysis failed unexpectedly");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const irrelevantFigures = result?.figures.filter(
    (f) => f.relevanceDecision === "irrelevant" || f.relevanceDecision === "duplicate"
  ) || [];
  const relevantFigures = result?.figures.filter(
    (f) => f.relevanceDecision === "relevant"
  ) || [];
  const ambiguousFigures = result?.figures.filter(
    (f) => f.relevanceDecision === "ambiguous"
  ) || [];

  return (
    <Card className={cn("border-border/60", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ScanSearch className="h-4 w-4 text-primary" />
            Figure Relevance Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            {result && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="h-7 px-2 text-xs"
              >
                {showDetails ? <EyeOff className="h-3.5 w-3.5 mr-1" /> : <Eye className="h-3.5 w-3.5 mr-1" />}
                {showDetails ? "Hide" : "Show"}
              </Button>
            )}
            <Button
              size="sm"
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="h-7 px-3 text-xs rounded-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                  Analyzing...
                </>
              ) : result ? (
                "Re-analyze"
              ) : (
                <>
                  <ScanSearch className="h-3.5 w-3.5 mr-1" />
                  Analyze Figures
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {result && showDetails && (
        <CardContent className="pt-0 space-y-4">
          {/* Summary stats */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-xs">
              {relevantFigures.length} Relevant
            </Badge>
            <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 text-xs">
              {irrelevantFigures.length} Irrelevant
            </Badge>
            {ambiguousFigures.length > 0 && (
              <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-400 text-xs">
                {ambiguousFigures.length} Ambiguous
              </Badge>
            )}
            <Badge variant="outline" className="text-muted-foreground text-xs">
              {result.figures.length} Total Figures
            </Badge>
          </div>

          {/* Summary text */}
          <p className="text-xs text-muted-foreground leading-relaxed">{result.summary}</p>

          {/* Figure details */}
          {result.figures.length > 0 && (
            <Accordion type="multiple" className="space-y-1">
              {result.figures.map((fig, idx) => {
                const config = DECISION_CONFIG[fig.relevanceDecision];
                const Icon = config.icon;

                return (
                  <AccordionItem key={fig.figureId || idx} value={fig.figureId || `fig-${idx}`} className="border-none">
                    <AccordionTrigger className={cn(
                      "px-3 py-2 rounded-lg text-xs hover:no-underline border",
                      config.bg
                    )}>
                      <div className="flex items-center gap-2 text-left">
                        <Icon className={cn("h-3.5 w-3.5 shrink-0", config.color)} />
                        <span className="font-medium truncate max-w-[200px]">
                          {fig.figureTitle || `Figure ${idx + 1}`}
                        </span>
                        <span className={cn("text-[10px] font-bold uppercase", config.color)}>
                          {config.label}
                        </span>
                        <span className="text-muted-foreground ml-auto mr-2">
                          {Math.round(fig.confidenceScore * 100)}%
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pt-2 text-xs space-y-2">
                      {fig.figureDescription && (
                        <p className="text-muted-foreground">{fig.figureDescription}</p>
                      )}
                      <p className="text-foreground/80">{fig.reason}</p>
                      {fig.isDuplicate && fig.duplicateOf && (
                        <p className="text-amber-400 text-[10px]">
                          Duplicate of: {fig.duplicateOf}
                        </p>
                      )}

                      {/* Context preview */}
                      {(fig.precedingExtract || fig.followingExtract) && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {fig.precedingExtract && (
                            <div className="p-2 rounded bg-muted/30 border border-border/40">
                              <span className="text-[10px] text-muted-foreground block mb-1">Before:</span>
                              <span className="text-[11px] text-foreground/70 line-clamp-3">
                                {fig.precedingExtract}
                              </span>
                            </div>
                          )}
                          {fig.followingExtract && (
                            <div className="p-2 rounded bg-muted/30 border border-border/40">
                              <span className="text-[10px] text-muted-foreground block mb-1">After:</span>
                              <span className="text-[11px] text-foreground/70 line-clamp-3">
                                {fig.followingExtract}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Confidence bar */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] text-muted-foreground">Confidence:</span>
                        <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", {
                              "bg-emerald-500": fig.confidenceScore >= 0.8,
                              "bg-yellow-500": fig.confidenceScore >= 0.5 && fig.confidenceScore < 0.8,
                              "bg-red-500": fig.confidenceScore < 0.5,
                            })}
                            style={{ width: `${fig.confidenceScore * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {(fig.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </CardContent>
      )}
    </Card>
  );
}
