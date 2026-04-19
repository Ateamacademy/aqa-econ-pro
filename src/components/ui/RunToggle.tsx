import React from "react";

type RunMode = "short-run" | "long-run";

type RunToggleProps = {
  mode: RunMode;
  onChange: (mode: RunMode) => void;
};

const COLORS = {
  activeText: "hsl(var(--foreground))",
  mutedText: "hsl(var(--muted-foreground))",
  mutedHover: "hsl(var(--foreground) / 0.85)",
  trackOn: "hsl(var(--primary))",
  trackOff: "hsl(var(--muted) / 0.9)",
  trackBorder: "hsl(var(--border))",
  thumb: "hsl(var(--primary-foreground))",
};

export function RunToggle({ mode, onChange }: RunToggleProps) {
  const isLongRun = mode === "long-run";

  const handleSetMode = (next: RunMode, label: string) => {
    console.log(`[RunToggle] ${label} selected`);
    onChange(next);
  };

  return (
    <fieldset
      aria-label="Select short run or long run"
      className="inline-flex rounded-full border p-1"
      style={{
        pointerEvents: "auto",
        position: "relative",
        zIndex: 10,
        borderColor: COLORS.trackBorder,
        background: COLORS.trackOff,
      }}
    >
      <legend className="sr-only">Run mode</legend>

      <label
        className="relative inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-sm transition-colors"
        style={{
          pointerEvents: "auto",
          color: isLongRun ? COLORS.mutedText : COLORS.activeText,
          fontWeight: isLongRun ? 500 : 700,
          background: isLongRun ? "transparent" : COLORS.trackOn,
        }}
      >
        <input
          type="radio"
          name="monopolistic-run-mode"
          value="short-run"
          checked={!isLongRun}
          onChange={() => handleSetMode("short-run", "Short run")}
          className="sr-only"
        />
        <span>Short run</span>
      </label>

      <label
        className="relative inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-sm transition-colors"
        style={{
          pointerEvents: "auto",
          color: isLongRun ? COLORS.activeText : COLORS.mutedText,
          fontWeight: isLongRun ? 700 : 500,
          background: isLongRun ? COLORS.trackOn : "transparent",
        }}
      >
        <input
          type="radio"
          name="monopolistic-run-mode"
          value="long-run"
          checked={isLongRun}
          onChange={() => handleSetMode("long-run", "Long run")}
          className="sr-only"
        />
        <span>Long run</span>
      </label>
    </fieldset>
  );
}