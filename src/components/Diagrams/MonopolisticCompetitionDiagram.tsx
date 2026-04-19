import React, { forwardRef, useEffect, useMemo, useState } from "react";
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

const MonopolisticCompetitionDiagram = forwardRef<HTMLDivElement>(function MonopolisticCompetitionDiagram(_, ref) {
  const [mode, setMode] = useState<RunMode>("short-run");
  const location = useLocation();
  const isClickDebugEnabled = useMemo(
    () => new URLSearchParams(location.search).get("debug-clicks") === "1",
    [location.search],
  );
  const ActiveDiagram = mode === "short-run" ? MonopCompShortRunSvg : MonopCompLongRunSvg;
  const caption =
    mode === "short-run"
      ? "Short run: the firm sets MC = MR at Q₁, charges P₁ from AR. Because P₁ > AC₁, the firm earns supernormal profit (shaded rectangle). This attracts entrants — switch to Long run."
      : "Long run: entry shifts AR leftward until AR is tangent to AC at Q₂. P₂ = AC(Q₂), so the firm earns only normal profit. Because Q₂ sits left of AC min, the firm produces below efficient scale — this gap is excess capacity.";

  useEffect(() => {
    if (!isClickDebugEnabled) return;

    const handler = (event: MouseEvent) => {
      const path = event.composedPath();
      const target = event.target instanceof Element ? `${event.target.tagName}.${event.target.className}` : String(event.target);
      const composedPath = path
        .slice(0, 8)
        .map((el) => (el instanceof Element ? `${el.tagName}.${el.className}` : String(el)))
        .join(" -> ");
      console.log(`[Click debug] ${target}`);
      console.log(`[Click debug path] ${composedPath}`);
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [isClickDebugEnabled]);

  return (
    <div ref={ref} className="w-full">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          Monopolistic Competition: {mode === "short-run" ? "Short Run" : "Long Run"}
        </h3>

        <RunToggle mode={mode} onChange={setMode} />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card/40" style={{ pointerEvents: "auto" }}>
        <ActiveDiagram />
      </div>

      <div className="mt-4" style={captionStyle}>
        {caption}
      </div>
    </div>
  );
});

export default MonopolisticCompetitionDiagram;