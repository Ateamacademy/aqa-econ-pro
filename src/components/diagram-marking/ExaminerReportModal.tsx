import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DiagramMarkingResult } from "./types";
import { Award, Target, AlertTriangle, BookOpen, TrendingUp } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: DiagramMarkingResult;
  difficulty: string;
}

export function ExaminerReportModal({ open, onOpenChange, result, difficulty }: Props) {
  const { examiner_summary: es, marks_awarded, total_marks, mark_percentage } = result;
  const errorTypes = es.errors_by_type;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-primary" />
            Examiner Report
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Score overview */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
              <div>
                <p className="text-3xl font-bold text-foreground">{marks_awarded}/{total_marks}</p>
                <p className="text-sm text-muted-foreground">{mark_percentage}% achieved</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-1">{difficulty}</Badge>
                <p className="text-sm font-semibold text-primary">{es.estimated_grade_band}</p>
              </div>
            </div>

            {/* Overall feedback */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" /> Overall Assessment
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{es.overall_feedback}</p>
            </div>

            {/* Strongest areas */}
            {es.strongest_areas.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-emerald-500">
                  <TrendingUp className="h-4 w-4" /> Strongest Areas
                </h3>
                <ul className="space-y-1">
                  {es.strongest_areas.map((a, i) => (
                    <li key={i} className="text-sm text-muted-foreground pl-4 border-l-2 border-emerald-500/30">{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Errors by type */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-amber-500">
                <AlertTriangle className="h-4 w-4" /> Errors by Type
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(errorTypes).map(([type, errors]) => {
                  if (!errors || errors.length === 0) return null;
                  const label = type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                  return (
                    <div key={type} className="rounded-lg border border-border p-3">
                      <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
                      <ul className="space-y-0.5">
                        {errors.map((e, i) => (
                          <li key={i} className="text-xs text-muted-foreground">• {e}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Priority revision */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Priority Revision Actions
              </h3>
              <ol className="space-y-1 list-decimal list-inside">
                {es.priority_revision.map((p, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{p}</li>
                ))}
              </ol>
            </div>

            {/* How to gain full marks */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-primary">How to Gain Full Marks</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{es.how_to_gain_full_marks}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
