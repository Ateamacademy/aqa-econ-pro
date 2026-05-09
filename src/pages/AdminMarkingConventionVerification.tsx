/**
 * Admin: Non-AQA marking convention verification.
 *
 * Lists the 11 non-AQA boards (AQA A-Level is intentionally absent · it was
 * verified previously and is excluded from this refinement). Per board:
 *   • Source spec reference
 *   • verifiedByAdmin status (display only · toggling persists in
 *     localStorage as a quick admin override; production changes are made
 *     by editing the board's marking-convention.ts file)
 *   • Mark-band / per-skill summary
 *
 * Admin gate: email matches the project admin.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { listNonAqaConventions } from "@/lib/non-aqa/conventions";
import type { NonAqaBoardId, NonAqaMarkingConvention } from "@/lib/non-aqa/marking-convention.types";
import { getBoardDefinition } from "@/lib/boards/registry";

const ADMIN_EMAIL = "swapnil.kumar22@alumni.imperial.ac.uk";
const OVERRIDE_KEY = "non-aqa-verification-overrides-v1";

type Overrides = Record<NonAqaBoardId, boolean>;

function loadOverrides(): Overrides {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY);
    return raw ? (JSON.parse(raw) as Overrides) : ({} as Overrides);
  } catch {
    return {} as Overrides;
  }
}

function saveOverrides(o: Overrides) {
  try {
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(o));
  } catch {
    /* ignore */
  }
}

export default function MarkingConventionVerification() {
  const { user } = useAuth();
  const [overrides, setOverrides] = useState<Overrides>(() => loadOverrides());
  const conventions = useMemo(() => listNonAqaConventions(), []);

  useEffect(() => saveOverrides(overrides), [overrides]);

  const isAdmin = user?.email === ADMIN_EMAIL;

  if (!isAdmin) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Admin only</AlertTitle>
          <AlertDescription>
            This page is restricted. <Link to="/" className="underline">Return home</Link>.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const verifiedCount = conventions.filter((c) => c.verifiedByAdmin || overrides[c.boardId]).length;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Marking convention verification</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          11 non-AQA boards. AQA A-Level is excluded (verified previously; not part of this refinement).
        </p>
        <div className="mt-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-sm">{verifiedCount} of {conventions.length} verified</span>
        </div>
      </header>

      <div className="grid gap-4">
        {conventions.map((c) => (
          <ConventionCard
            key={c.boardId}
            convention={c}
            override={!!overrides[c.boardId]}
            onToggleOverride={(v) =>
              setOverrides((prev) => ({ ...prev, [c.boardId]: v }))
            }
          />
        ))}
      </div>
    </div>
  );
}

function ConventionCard({
  convention,
  override,
  onToggleOverride,
}: {
  convention: NonAqaMarkingConvention;
  override: boolean;
  onToggleOverride: (v: boolean) => void;
}) {
  const def = getBoardDefinition(convention.boardId);
  const verified = convention.verifiedByAdmin || override;
  const markValues = Object.keys(convention.markBandsByQuestionMarks).map(Number).sort((a, b) => a - b);
  const pointValues = Object.keys(convention.pointMarkingByQuestionMarks ?? {}).map(Number).sort((a, b) => a - b);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">{def.displayName}</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              {def.qualificationCode} · {convention.skillFramework} · {convention.descriptorStyle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {verified ? (
              <Badge>Verified</Badge>
            ) : (
              <Badge variant="outline">Pending</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <span className="text-xs font-medium text-muted-foreground">Source: </span>
          <span className="text-xs">{convention.sourceReference}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {convention.annotationTags.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
          ))}
        </div>
        {markValues.length > 0 && (
          <div className="text-xs">
            <span className="text-muted-foreground">Mark bands defined for: </span>
            <span className="font-mono">{markValues.join(", ")} marks</span>
          </div>
        )}
        {pointValues.length > 0 && (
          <div className="text-xs">
            <span className="text-muted-foreground">Point-marking defined for: </span>
            <span className="font-mono">{pointValues.join(", ")} marks</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <Switch
              id={`override-${convention.boardId}`}
              checked={override}
              onCheckedChange={onToggleOverride}
              disabled={convention.verifiedByAdmin}
            />
            <label htmlFor={`override-${convention.boardId}`} className="cursor-pointer text-xs">
              {convention.verifiedByAdmin ? "Verified in source" : "Mark verified (local override)"}
            </label>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to={`/predicted`}>View papers →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
