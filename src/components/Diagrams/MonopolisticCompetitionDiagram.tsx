import React, { forwardRef, useEffect, useState } from "react";
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

  useEffect(() => {
    if (new URLSearchParams(location.search).get("debug-clicks") !== "1") return;

    const handler = (event: MouseEvent) => {
      const path = event.composedPath();
      console.log("[Click debug] target:", event.target);
      console.log(
        "[Click debug] composed path:",
        path.slice(0, 8).map((el: any) => `${el.tagName ?? el.nodeName}.${el.className ?? ""}`),
      );
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [location.search]);

  return (
    <div ref={ref} className="w-full">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          Monopolistic Competition: {mode === "short-run" ? "Short Run" : "Long Run"}
        </h3>

        <RunToggle mode={mode} onChange={setMode} />
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-border bg-card/40"
        style={{ pointerEvents: "auto" }}
      >
        <div
          className="transition-opacity duration-200"
          style={{
            opacity: mode === "short-run" ? 1 : 0,
            pointerEvents: mode === "short-run" ? "auto" : "none",
            position: mode === "short-run" ? "relative" : "absolute",
            inset: mode === "short-run" ? undefined : 0,
            visibility: mode === "short-run" ? "visible" : "hidden",
          }}
          aria-hidden={mode !== "short-run"}
        >
          <MonopCompShortRunSvg />
        </div>
        <div
          className="transition-opacity duration-200"
          style={{
            opacity: mode === "long-run" ? 1 : 0,
            pointerEvents: mode === "long-run" ? "auto" : "none",
            position: mode === "long-run" ? "relative" : "absolute",
            inset: mode === "long-run" ? undefined : 0,
            visibility: mode === "long-run" ? "visible" : "hidden",
          }}
          aria-hidden={mode !== "long-run"}
        >
          <MonopCompLongRunSvg />
        </div>
      </div>

      <div className="mt-4" style={captionStyle}>
        {mode === "short-run"
          ? "Short run: the firm sets MC = MR at Q₁, charges P₁ from AR. Because P₁ > AC₁, the firm earns supernormal profit (shaded rectangle). This attracts entrants — switch to Long run."
          : "Long run: entry shifts AR leftward until AR is tangent to AC at Q₂. P₂ = AC(Q₂), so the firm earns only normal profit. Because Q₂ sits left of AC min, the firm produces below efficient scale — this gap is excess capacity."}
      </div>
    </div>
  );
});

export default MonopolisticCompetitionDiagram;