interface DebugAssetPanelProps {
  boardName: string;
  requestedDiagramType: string;
  matchedDiagramType?: string | null;
  assetName?: string | null;
  rawPath?: string | null;
  resolvedUrl?: string | null;
  loading: boolean;
  success: boolean;
  error?: string | null;
  note?: string | null;
}

export default function DebugAssetPanel({
  boardName,
  requestedDiagramType,
  matchedDiagramType,
  assetName,
  rawPath,
  resolvedUrl,
  loading,
  success,
  error,
  note,
}: DebugAssetPanelProps) {
  const statusLabel = loading ? "Loading" : error ? "Error" : success ? "Loaded" : "Waiting";
  const statusClassName = loading
    ? "text-muted-foreground"
    : error
      ? "text-destructive"
      : success
        ? "text-primary"
        : "text-muted-foreground";

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold uppercase tracking-[0.18em] text-foreground">Asset debug</p>
        <span className={statusClassName}>{statusLabel}</span>
      </div>

      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Board</dt>
          <dd className="font-medium text-foreground">{boardName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Requested figure</dt>
          <dd className="font-medium text-foreground">{requestedDiagramType}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Matched figure</dt>
          <dd className="font-medium text-foreground">{matchedDiagramType || "—"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Uploaded asset</dt>
          <dd className="font-medium text-foreground break-all">{assetName || "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Stored path</dt>
          <dd className="font-medium text-foreground break-all">{rawPath || "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Resolved URL</dt>
          <dd className="font-medium text-foreground break-all">{resolvedUrl || "—"}</dd>
        </div>
      </dl>

      {note ? <p className="mt-3 text-muted-foreground">{note}</p> : null}
      {error ? <p className="mt-2 font-medium text-destructive">{error}</p> : null}
    </div>
  );
}