import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPaperById } from "@/lib/rubrics";
import { Clock, FileText, Trash2 } from "lucide-react";

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

export default function History() {
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
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Attempt History</h1>
          <p className="text-sm text-muted-foreground">Review your past paper attempts and results.</p>
        </div>
        {entries.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory} className="gap-1.5 text-red-400">
            <Trash2 className="h-3.5 w-3.5" /> Clear All
          </Button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No attempts yet. Start a paper to see your results here.</p>
          <Button asChild><Link to="/papers">Browse Papers</Link></Button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, i) => {
            const paper = getPaperById(entry.paperId);
            return (
              <Link
                key={i}
                to={`/papers/${entry.paperId}/results`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <div className={`text-3xl font-black ${GRADE_COLORS[entry.synthesis.overallGrade] || "text-foreground"}`}>
                  {entry.synthesis.overallGrade}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{paper?.title || entry.paperId}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{entry.synthesis.overallPercentage}%</span>
                    <span>{entry.synthesis.totalAwarded}/{entry.synthesis.totalPossible} marks</span>
                    <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">{paper?.board}</Badge>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
