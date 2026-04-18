import { useEffect, useState } from "react";
import { ImageIcon, AlertCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ReportButton } from "@/components/report/ReportButton";
import { getCatalogEntry } from "@/lib/aqa-diagram-catalog";

interface Props {
  /** Catalog id resolved at parse time. When missing, the fallback notice renders. */
  referenceFigureId?: string;
  /** Per-question scenario override (e.g. "UK NHS Nursing — RCN"). */
  scenario?: string;
  /** Caption text shown below the figure (e.g. "Figure 1 — …"). */
  caption?: string;
  /** Question label for the missing-figure report payload. */
  questionLabel?: string;
  /** Stable paper key so the report carries paper context. */
  paperKey?: string;
}

/**
 * Read-only reference figure rendered inline beneath an AQA predicted-paper
 * question. Uses the existing /public/figures SVG library — fetched once and
 * inlined so the in-SVG <text> title can be replaced with the question's
 * scenario override without forking the asset.
 *
 * When `referenceFigureId` is missing or unrecognised, renders a neutral
 * fallback notice with a Report-as-missing button so admins can backfill.
 */
export function ReferenceFigurePanel({
  referenceFigureId,
  scenario,
  caption,
  questionLabel,
  paperKey,
}: Props) {
  const entry = referenceFigureId ? getCatalogEntry(referenceFigureId) : undefined;
  const [svg, setSvg] = useState<string | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!entry) return;
    let cancel = false;
    setErr(false);
    setSvg(null);
    fetch(entry.svgPath)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((text) => {
        if (cancel) return;
        let out = text;
        // Replace the first text node (the title) with the per-question scenario.
        if (scenario) {
          out = out.replace(
            /(<text\b[^>]*>)([^<]*)(<\/text>)/,
            (_m, open, _t, close) => `${open}${escapeXml(scenario)}${close}`,
          );
        }
        // Strip any explicit width/height so the SVG fills its responsive box.
        out = out.replace(/<svg([^>]*)\swidth="[^"]*"/i, "<svg$1");
        out = out.replace(/<svg([^>]*)\sheight="[^"]*"/i, "<svg$1");
        setSvg(out);
      })
      .catch(() => {
        if (!cancel) setErr(true);
      });
    return () => {
      cancel = true;
    };
  }, [entry, scenario]);

  if (!referenceFigureId || !entry) {
    return (
      <div className="mt-3 mb-3 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/[0.04] p-4">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-amber-300 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-wider font-bold text-amber-200">
              Reference figure unavailable
            </p>
            <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
              This question would benefit from a reference diagram. A template hasn't
              been catalogued yet — draw your own in the canvas below.
            </p>
            <div className="flex flex-wrap gap-2 mt-2.5">
              <ReportButton
                context={{
                  page: "predicted-papers",
                  board: "aqa",
                  paperCode: paperKey,
                  questionNumber: questionLabel,
                }}
                variant="outline"
                size="sm"
              />
              <Link
                to="/diagram-library"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:underline"
              >
                Open Diagrams library <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <figure
      className="mt-3 mb-3 rounded-xl border border-border bg-background overflow-hidden"
      aria-label={entry.description}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40">
        <div className="flex items-center gap-2 min-w-0">
          <ImageIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Reference figure
          </span>
        </div>
        <span
          className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5"
          title="This is a read-only reference figure. Use the canvas to draw your own."
        >
          Read only
        </span>
      </div>

      <div className="p-3 bg-white" role="img" aria-label={entry.description}>
        {svg ? (
          <div
            className="w-full [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-[360px] pointer-events-none select-none"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : err ? (
          <div className="text-center text-xs text-muted-foreground py-8">
            Couldn't load reference figure.
          </div>
        ) : (
          <div className="text-center text-[11px] text-muted-foreground py-10">Loading figure…</div>
        )}
      </div>

      <figcaption className="px-3 py-2 border-t border-border text-[11px] text-muted-foreground">
        {caption ?? `Figure — ${scenario ?? entry.title}`}
      </figcaption>
    </figure>
  );
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
