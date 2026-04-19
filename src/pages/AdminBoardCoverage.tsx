import { useMemo } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Hourglass, Plus, AlertCircle } from "lucide-react";
import { BOARD_REGISTRY, subjectToBoardId } from "@/lib/boards/registry";
import {
  computeBoardCoverage,
  REQUIRED_SET_LABELS,
  BOARD_PAPER_COUNT,
  type BoardCoverage,
} from "@/lib/boards/paper-sets";
import { predictedPapersLibrary } from "@/data/predictedPapersLibrary";
import type { BoardId } from "@/lib/boards/board-definition";

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";

/** Build a paperCode → existing set labels map by scanning the static library. */
function buildExistingSetsForBoard(boardId: BoardId): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const paper of predictedPapersLibrary) {
    const mapped = subjectToBoardId(paper.subject);
    if (mapped !== boardId) continue;
    // paper.id usually encodes paper code + set label; fall back to paperNumber
    const code = (paper as any).paperCode ?? `paper-${(paper as any).paperNumber ?? ""}`;
    const set = (paper as any).setLabel ?? paper.title?.match(/Set\s+([A-Z])/i)?.[1];
    if (!code || !set) continue;
    out[code] ??= [];
    if (!out[code].includes(set)) out[code].push(set);
  }
  return out;
}

export default function AdminBoardCoverage() {
  const { user, loading } = useAuth();

  const coverages: BoardCoverage[] = useMemo(() => {
    return (Object.keys(BOARD_REGISTRY) as BoardId[]).map((boardId) =>
      computeBoardCoverage(boardId, buildExistingSetsForBoard(boardId)),
    );
  }, []);

  if (loading) return <div className="p-8 text-muted-foreground">Loading…</div>;
  if (!user || user.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="flex items-end justify-between gap-4 mb-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Board coverage
          </h1>
          <Link to="/admin/board-status" className="text-xs text-muted-foreground hover:text-foreground underline">
            Status overview →
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Sets A, B, C minimum per paper · AQA exempt from set caps (ships with 7 sets per paper).
        </p>

        <div className="space-y-4">
          {coverages.map((c) => (
            <Card key={c.boardId} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {c.displayName}{" "}
                      <span className="text-xs text-muted-foreground font-normal">
                        ({BOARD_PAPER_COUNT[c.boardId]} paper{BOARD_PAPER_COUNT[c.boardId] === 1 ? "" : "s"})
                      </span>
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                      {c.refinementStatus.replace("-", " ")}
                    </p>
                  </div>
                  {c.refinementStatus !== "refined" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-warning/15 text-warning">
                      <Hourglass className="h-3 w-3" /> Awaiting blueprint
                    </span>
                  ) : c.overallMeetsMinimum ? (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-success/15 text-success">
                      <CheckCircle2 className="h-3 w-3" /> Minimum met
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-destructive/15 text-destructive">
                      <AlertCircle className="h-3 w-3" /> Below minimum
                    </span>
                  )}
                </div>

                {c.refinementStatus === "refined" && c.papers.length > 0 ? (
                  <ul className="space-y-1.5">
                    {c.papers.map((p) => (
                      <li
                        key={p.paper.code}
                        className="flex items-center justify-between gap-3 text-xs font-mono bg-muted/30 rounded px-3 py-2"
                      >
                        <span className="text-foreground">
                          {p.paper.code}{" "}
                          <span className="text-muted-foreground font-sans">
                            — {p.paper.title}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className={p.meetsMinimum ? "text-success" : "text-destructive"}>
                            Sets: {p.existingSets.length > 0 ? p.existingSets.join(", ") : "—"}{" "}
                            ({p.existingSets.length}/{REQUIRED_SET_LABELS.length} min)
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-[10px]"
                            disabled
                            title="Triggers initialiseBoard() in a future build"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Set {nextSetLabel(p.existingSets)}
                          </Button>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    {c.refinementStatus === "refined"
                      ? "No papers configured."
                      : "Awaiting refinement — no set slots generated."}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function nextSetLabel(existing: string[]): string {
  const used = new Set(existing.map((s) => s.toUpperCase()));
  for (let i = 0; i < 26; i++) {
    const l = String.fromCharCode(65 + i);
    if (!used.has(l)) return l;
  }
  return "?";
}
