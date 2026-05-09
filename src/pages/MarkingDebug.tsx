import { useSearchParams } from "react-router-dom";
import { markingTestScenarios } from "@/lib/markingTests";
import { getMarkingLog, getCapRate } from "@/lib/markingTelemetry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Shield } from "lucide-react";

export default function MarkingDebug() {
  const [params] = useSearchParams();
  if (params.get("debug") !== "1") {
    return <div className="max-w-4xl mx-auto px-5 py-12 text-center text-muted-foreground">Access denied.</div>;
  }

  const log = getMarkingLog();
  const { rate, total, capped } = getCapRate();

  return (
    <div className="max-w-4xl mx-auto px-5 py-12 space-y-8">
      <h1 className="text-2xl font-bold text-foreground">Marking Debug & Integrity</h1>

      {/* Cap rate monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" /> Integrity Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{rate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Cap rate (last 50)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{capped}</p>
              <p className="text-xs text-muted-foreground">Corrections applied</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{total}</p>
              <p className="text-xs text-muted-foreground">Total markings</p>
            </div>
          </div>
          {rate > 15 && (
            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Marking model may be drifting · review prompts. Cap rate exceeds 15%.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Test Scenarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {markingTestScenarios.map((s) => (
            <div key={s.id} className="p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{s.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">{s.expectedScore}</Badge>
                  <Badge variant={s.expectedApiCall ? "default" : "secondary"} className="text-[10px]">
                    {s.expectedApiCall ? "API call" : "No API call"}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{s.description}</p>
              {s.expectedGate && (
                <p className="text-xs text-amber-400 mt-1">Gate: {s.expectedGate}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent marking log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Marking Log ({log.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          {log.length === 0 ? (
            <p className="text-sm text-muted-foreground">No marking events logged yet.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {log.slice().reverse().slice(0, 50).map((entry, i) => (
                <div key={i} className="p-2 rounded bg-muted/30 text-xs font-mono flex items-center gap-3 flex-wrap">
                  <span className="text-muted-foreground">{new Date(entry.timestamp).toLocaleString()}</span>
                  <span className="text-foreground">{entry.questionId}</span>
                  <span>ink: {(entry.inkRatio * 100).toFixed(1)}%</span>
                  <span>raw: {entry.claudeRawTotal}</span>
                  <span>final: {entry.validatedTotal}</span>
                  {entry.capped ? (
                    <Badge variant="destructive" className="text-[9px]">CAPPED: {entry.capReason}</Badge>
                  ) : (
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
