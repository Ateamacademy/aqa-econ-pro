import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { MonopCompLongRunSvg } from "@/components/Diagrams/MonopCompLongRunSvg";
import { MonopCompShortRunSvg } from "@/components/Diagrams/MonopCompShortRunSvg";
import { MONOP_COMP_COLORS, type RunMode } from "@/components/Diagrams/monopolisticCompetitionShared";
import { RunToggle } from "@/components/ui/RunToggle";

const captionStyle = {
  color: MONOP_COMP_COLORS.muted,
  fontSize: "0.875rem",
  lineHeight: 1.6,
};

const STORAGE_KEY = "monopcomp-mode";

function readStoredMode(): RunMode {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "short-run" || stored === "long-run") return stored;
  } catch {
    // sessionStorage unavailable
  }
  return "short-run";
}

export default function MonopolisticCompetitionDiagram() {
  // Initialise from sessionStorage so re-mounts (e.g. when parent recreates
  // inline component definitions) don't snap the toggle back to short-run.
  const [mode, setModeState] = useState<RunMode>(readStoredMode);

  const setMode = useCallback((next: RunMode) => {
    setModeState(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const location = useLocation();
  const isClickDebugEnabled = useMemo(
    () => new URLSearchParams(location.search).get("debug-clicks") === "1",
    [location.search],
  );

  const caption =
    mode === "short-run"
      ? "Short run: the firm sets MC = MR at Q₁, charges P₁ from AR. Because P₁ > AC₁, the firm earns supernormal profit (shaded rectangle). This attracts entrants · switch to Long run."
      : "Long run: entry shifts AR leftward until AR is tangent to AC at Q₂. P₂ = AC(Q₂), so the firm earns only normal profit. Because Q₂ sits left of AC min, the firm produces below efficient scale · this gap is excess capacity.";

  useEffect(() => {
    if (!isClickDebugEnabled) return;

    const handler = (event: MouseEvent) => {
      const target = event.target instanceof Element ? `${event.target.tagName}.${event.target.className}` : String(event.target);
      console.log(`[Click debug] ${target}`);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [isClickDebugEnabled]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          Monopolistic Competition: {mode === "short-run" ? "Short Run" : "Long Run"}
        </h3>

        <RunToggle mode={mode} onChange={setMode} />
      </div>

      {/* Keep BOTH SVGs mounted; swap via display so toggling is instant
          and never triggers a remount/repaint of the inactive variant. */}
      <div className="overflow-hidden rounded-xl border border-border bg-card/40" style={{ pointerEvents: "auto" }}>
        <div style={{ display: mode === "short-run" ? "block" : "none" }}>
          <MonopCompShortRunSvg />
        </div>
        <div style={{ display: mode === "long-run" ? "block" : "none" }}>
          <MonopCompLongRunSvg />
        </div>
      </div>

      <div className="mt-4" style={captionStyle}>
        {caption}
      </div>
    </div>
  );
}
