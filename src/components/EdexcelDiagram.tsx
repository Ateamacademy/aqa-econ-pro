import { useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import DebugAssetPanel from "@/components/DebugAssetPanel";

type DiagramExemplar = Tables<"diagram_exemplars">;

const DIAGRAM_TYPE_ALIASES: Record<string, string[]> = {
  ped_revenue_impact: ["ped_revenue_impact", "ped_elastic", "ped_inelastic"],
  ped_elastic: ["ped_elastic", "ped_revenue_impact", "ped_inelastic"],
  ped_inelastic: ["ped_inelastic", "ped_revenue_impact", "ped_elastic"],
  yed_luxury: ["yed_luxury", "yed"],
  yed: ["yed", "yed_luxury"],
  maximum_price: ["maximum_price", "price_ceiling"],
  price_ceiling: ["price_ceiling", "maximum_price"],
  cost_curves: ["cost_curves", "short_run_costs"],
  short_run_costs: ["short_run_costs", "cost_curves"],
  minimum_wage: ["minimum_wage"],
  primary_product_dependency: ["primary_product_dependency", "coffee_price_volatility"],
  harrod_domar_ppf: ["harrod_domar_ppf"],
  multiplier_effect: ["multiplier_effect"],
  fiscal_policy_ad: ["fiscal_policy_ad"],
  terms_of_trade: ["terms_of_trade"],
  ppf: ["ppf", "ppf_growth"],
  ppf_growth: ["ppf_growth", "ppf"],
  ppf_natural_disaster: ["ppf_natural_disaster"],
  supply_demand_multiple_shifts: ["supply_demand_multiple_shifts"],
  sugar_tax: ["sugar_tax"],
  competition_consumer_surplus: ["competition_consumer_surplus"],
  negative_externality: ["negative_externality", "negative_externality_production", "negative_production_externality"],
  negative_externality_production: ["negative_externality_production", "negative_externality", "negative_production_externality"],
  negative_production_externality: ["negative_production_externality", "negative_externality_production", "negative_externality"],
};

function normalizeBoardKey(value?: string | null) {
  return (value ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function humanizeDiagramType(diagramType: string) {
  return diagramType.replace(/_/g, " ");
}

function getLookupKeys(diagramType: string) {
  return DIAGRAM_TYPE_ALIASES[diagramType] ?? [diagramType];
}

function getEdexcelBoardScore(board: string | null | undefined) {
  const normalized = normalizeBoardKey(board);

  if (!normalized) return -1;
  if (["edexcel a", "edexcel a level", "edexcel a a level", "economics a", "edexcel economics a"].includes(normalized)) return 6;
  if (/\bedexcel\b/.test(normalized) && /\beconomics a\b/.test(normalized)) return 5;
  if (/\bedexcel\b/.test(normalized) && /\ba level\b/.test(normalized) && /\ba\b/.test(normalized)) return 4;
  if (/\bedexcel\b/.test(normalized) && /\ba\b/.test(normalized)) return 3;
  if (normalized === "edexcel") return 1;

  return -1;
}

function pickEdexcelFigure(rows: DiagramExemplar[], requestedDiagramType: string) {
  if (rows.length === 0) {
    return {
      figure: null,
      note: `No uploaded figure record was found for ${humanizeDiagramType(requestedDiagramType)}.`,
    };
  }

  const ranked = rows
    .map((row) => ({
      row,
      boardScore: getEdexcelBoardScore(row.board),
      typeScore: row.diagram_type === requestedDiagramType ? 2 : 1,
    }))
    .filter((entry) => entry.boardScore >= 0)
    .sort((a, b) => {
      if (b.boardScore !== a.boardScore) return b.boardScore - a.boardScore;
      if (b.typeScore !== a.typeScore) return b.typeScore - a.typeScore;
      return new Date(b.row.created_at).getTime() - new Date(a.row.created_at).getTime();
    });

  if (ranked.length === 0) {
    const availableBoards = Array.from(new Set(rows.map((row) => row.board || "unassigned"))).join(", ");
    return {
      figure: null,
      note: `Uploaded figure records were found, but none were tagged for Edexcel A. Available board tags: ${availableBoards}.`,
    };
  }

  const selected = ranked[0];
  return {
    figure: selected.row,
    note:
      selected.boardScore === 1
        ? "Using a generic Edexcel asset because no Edexcel A-specific board tag was found."
        : `Matched board tag: ${selected.row.board || "unassigned"}.`,
  };
}

function resolveUploadedAssetUrl(rawPath: string) {
  if (!rawPath) {
    return { url: null, error: "The uploaded record does not contain an asset path." };
  }

  if (rawPath.startsWith("blob:")) {
    return {
      url: null,
      error: "The uploaded figure was saved as a temporary blob URL, so it cannot be restored after refresh. Save a persistent backend URL or storage path instead.",
    };
  }

  if (rawPath.startsWith("data:image/")) {
    return { url: rawPath, error: null };
  }

  if (/^https?:\/\//i.test(rawPath)) {
    return { url: rawPath, error: null };
  }

  if (rawPath.startsWith("public/")) {
    return { url: `/${rawPath.slice(7)}`, error: null };
  }

  if (rawPath.startsWith("/")) {
    return { url: rawPath, error: null };
  }

  const storageSchemeMatch = rawPath.match(/^storage:\/\/([^/]+)\/(.+)$/i);
  if (storageSchemeMatch) {
    const [, bucket, path] = storageSchemeMatch;
    return { url: supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl, error: null };
  }

  const cleanedPath = rawPath.replace(/^\.\//, "");
  const looksLikeImageFile = /\.(png|jpe?g|svg|webp|gif|avif)$/i.test(cleanedPath);

  if (looksLikeImageFile) {
    const parts = cleanedPath.split("/");

    if (parts.length === 1) {
      return { url: `/${cleanedPath}`, error: null };
    }

    const [bucket, ...pathParts] = parts;
    return {
      url: supabase.storage.from(bucket).getPublicUrl(pathParts.join("/")).data.publicUrl,
      error: null,
    };
  }

  return {
    url: null,
    error: `Unsupported uploaded asset path format: ${rawPath}`,
  };
}

function getAssetName(path?: string | null) {
  if (!path) return null;
  return path.split("/").pop() || path;
}

interface EdexcelDiagramProps {
  diagramType: string;
  fallback: ReactNode;
}

export default function EdexcelDiagram({ diagramType, fallback }: EdexcelDiagramProps) {
  const [edexcelFigure, setEdexcelFigure] = useState<DiagramExemplar | null>(null);
  const [edexcelFigureUrl, setEdexcelFigureUrl] = useState<string | null>(null);
  const [edexcelLoading, setEdexcelLoading] = useState(true);
  const [edexcelError, setEdexcelError] = useState<string | null>(null);
  const [edexcelLoaded, setEdexcelLoaded] = useState(false);
  const [debugNote, setDebugNote] = useState<string | null>(null);

  const lookupKeys = useMemo(() => getLookupKeys(diagramType), [diagramType]);

  useEffect(() => {
    let cancelled = false;

    const loadEdexcelFigure = async () => {
      setEdexcelLoading(true);
      setEdexcelError(null);
      setEdexcelLoaded(false);
      setEdexcelFigure(null);
      setEdexcelFigureUrl(null);
      setDebugNote(null);

      console.info("[EdexcelDiagram] Fetching uploaded figure", { diagramType, lookupKeys });

      const { data, error } = await supabase
        .from("diagram_exemplars")
        .select("id, board, diagram_type, exemplar_image_url, exemplar_text, created_at")
        .in("diagram_type", lookupKeys)
        .not("exemplar_image_url", "is", null)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        console.error("[EdexcelDiagram] Figure query failed", { diagramType, error });
        setEdexcelError(`Figure retrieval failed: ${error.message}`);
        setEdexcelLoading(false);
        return;
      }

      const { figure, note } = pickEdexcelFigure((data ?? []) as DiagramExemplar[], diagramType);
      setDebugNote(note);

      if (!figure?.exemplar_image_url) {
        console.info("[EdexcelDiagram] No matching uploaded figure", { diagramType, rows: data?.length ?? 0, note });
        setEdexcelLoading(false);
        return;
      }

      const resolved = resolveUploadedAssetUrl(figure.exemplar_image_url);
      setEdexcelFigure(figure);

      if (resolved.error || !resolved.url) {
        console.error("[EdexcelDiagram] Could not resolve uploaded figure URL", {
          diagramType,
          rawPath: figure.exemplar_image_url,
          error: resolved.error,
        });
        setEdexcelError(resolved.error || "The uploaded figure URL could not be resolved.");
        setEdexcelLoading(false);
        return;
      }

      console.info("[EdexcelDiagram] Resolved uploaded figure", {
        diagramType,
        matchedDiagramType: figure.diagram_type,
        board: figure.board,
        resolvedUrl: resolved.url,
      });

      setEdexcelFigureUrl(resolved.url);
      setEdexcelLoading(false);
    };

    void loadEdexcelFigure();

    return () => {
      cancelled = true;
    };
  }, [diagramType, lookupKeys]);

  const shouldShowFallback = !edexcelLoading && !edexcelFigure && !edexcelError;
  const inlineStatusMessage = edexcelLoading
    ? `Checking backend figure records for ${humanizeDiagramType(diagramType)}...`
    : edexcelError
      ? `Unable to load the uploaded Edexcel A figure: ${edexcelError}`
      : shouldShowFallback
        ? `No Edexcel figure uploaded for ${humanizeDiagramType(diagramType)}. Showing the built-in Edexcel fallback instead.`
        : edexcelLoaded
          ? `Uploaded Edexcel A figure loaded successfully.`
          : `Loading the uploaded Edexcel A figure...`;

  return (
    <div className="space-y-3">
      {edexcelFigureUrl ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={edexcelFigureUrl}
            alt={`Uploaded Edexcel A diagram for ${humanizeDiagramType(diagramType)}`}
            className="h-auto w-full"
            loading="lazy"
            onLoad={() => {
              console.info("[EdexcelDiagram] Uploaded figure loaded", { diagramType, edexcelFigureUrl });
              setEdexcelLoaded(true);
            }}
            onError={() => {
              const message = `Image load failed for ${edexcelFigureUrl}. Check whether the stored path points to a public image file and that the file type is supported.`;
              console.error("[EdexcelDiagram] Uploaded figure failed to load", { diagramType, edexcelFigureUrl });
              setEdexcelLoaded(false);
              setEdexcelError(message);
            }}
          />
        </div>
      ) : null}

      <div className={`rounded-xl border p-3 text-sm ${edexcelError ? "border-destructive/30 bg-destructive/10 text-foreground" : "border-border bg-muted/40 text-muted-foreground"}`}>
        {inlineStatusMessage}
      </div>

      {shouldShowFallback ? <div>{fallback}</div> : null}

      <DebugAssetPanel
        boardName="Edexcel A A-Level"
        requestedDiagramType={diagramType}
        matchedDiagramType={edexcelFigure?.diagram_type ?? null}
        assetName={getAssetName(edexcelFigure?.exemplar_image_url)}
        rawPath={edexcelFigure?.exemplar_image_url ?? null}
        resolvedUrl={edexcelFigureUrl}
        loading={edexcelLoading}
        success={Boolean(edexcelLoaded && edexcelFigureUrl && !edexcelError)}
        error={edexcelError}
        note={debugNote}
      />
    </div>
  );
}