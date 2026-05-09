import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPaperById } from "@/lib/rubrics";
import { Trash2, Clock } from "lucide-react";

interface HistoryEntry {
  paperId: string;
  timestamp: number;
  synthesis: {
    overallGrade: string;
    overallPercentage: number;
    totalAwarded: number;
    totalPossible: number;
  };
}

const GRADE_COLORS: Record<string, string> = {
  "A*": "text-violet-400", A: "text-emerald-400", B: "text-emerald-300",
  C: "text-amber-400", D: "text-amber-500", E: "text-red-400", U: "text-red-500",
};

export default function AttemptHistoryPanel() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("paper-history");
    if (raw) {
      try { setEntries(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("paper-history");
    setEntries([]);
  };

  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Attempt History</h2>
        </div>
        {entries.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory} className="gap-1.5 text-red-400 h-7 text-xs">
            <Trash2 className="h-3 w-3" /> Clear
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground mb-3">No past paper attempts yet.</p>
          <Button asChild size="sm" variant="outline"><Link to="/papers">Browse Papers</Link></Button>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.slice(0, 8).map((entry, i) => {
            const paper = getPaperById(entry.paperId);
            return (
              <Link
                key={i}
                to={`/papers/${entry.paperId}/results`}
                className="flex items-center gap-3 p-3 rounded-xl bg-background/40 border border-border hover:border-primary/40 transition-colors"
              >
                <div className={`text-2xl font-black w-10 text-center ${GRADE_COLORS[entry.synthesis.overallGrade] || "text-foreground"}`}>
                  {entry.synthesis.overallGrade}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{paper?.title || entry.paperId}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-0.5">
                    <span>{entry.synthesis.overallPercentage}%</span>
                    <span>{entry.synthesis.totalAwarded}/{entry.synthesis.totalPossible} marks</span>
                    <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                {paper?.board && (
                  <Badge variant="outline" className="text-[10px] shrink-0">{paper.board}</Badge>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
