import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Hourglass } from "lucide-react";
import { BOARD_REGISTRY } from "@/lib/boards/registry";

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";

export default function AdminBoardStatus() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-muted-foreground">Loading…</div>;
  if (!user || user.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

  const boards = Object.values(BOARD_REGISTRY);
  const refined = boards.filter((b) => b.refinementStatus === "refined");
  const pending = boards.filter((b) => b.refinementStatus !== "refined");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Board refinement status
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Multi-board registry — {refined.length} refined, {pending.length} pending.
        </p>

        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" /> Refined ({refined.length})
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {refined.map((b) => (
              <Card key={b.id} className="border-success/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-foreground">{b.displayName}</p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-success/15 text-success">
                      {b.qualificationCode}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {b.papers.length} paper{b.papers.length === 1 ? "" : "s"} · {b.markSchemeConvention.skillFramework}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Phrase library: {Object.values(b.phraseLibrary).flat().length} stems
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Hourglass className="h-4 w-4 text-warning" /> Blueprint pending ({pending.length})
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {pending.map((b) => (
              <Card key={b.id} className="border-warning/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-foreground">{b.displayName}</p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-warning/15 text-warning">
                      {b.qualificationCode}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Awaiting refinement
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
