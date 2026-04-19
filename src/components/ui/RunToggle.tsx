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

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onChange(isLongRun ? "short-run" : "long-run");
  };

  const handleSetMode = (next: RunMode) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(next);
    };
  };

  return (
    <div
      className="inline-flex items-center gap-3"
      style={{ pointerEvents: "auto", position: "relative", zIndex: 2 }}
    >
      <button
        type="button"
        onClick={handleSetMode("short-run")}
        className="text-sm transition-colors"
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
          color: isLongRun ? COLORS.mutedText : COLORS.activeText,
          fontWeight: isLongRun ? 500 : 700,
        }}
        onMouseEnter={(event) => {
          if (isLongRun) event.currentTarget.style.color = COLORS.mutedHover;
        }}
        onMouseLeave={(event) => {
          if (isLongRun) event.currentTarget.style.color = COLORS.mutedText;
        }}
      >
        Short run
      </button>

      <button
        type="button"
        onClick={handleToggle}
        aria-label="Toggle short run and long run"
        role="switch"
        aria-checked={isLongRun}
        className="relative inline-flex h-7 w-14 items-center rounded-full border transition-all duration-200"
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
          background: isLongRun ? COLORS.trackOn : COLORS.trackOff,
          borderColor: COLORS.trackBorder,
          padding: 0,
          position: "relative",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute h-5 w-5 rounded-full transition-all duration-200"
          style={{
            pointerEvents: "none",
            background: COLORS.thumb,
            left: isLongRun ? "calc(100% - 1.4rem)" : "0.15rem",
            boxShadow: "0 1px 3px hsl(0 0% 0% / 0.28)",
          }}
        />
      </button>

      <button
        type="button"
        onClick={handleSetMode("long-run")}
        className="text-sm transition-colors"
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
          color: isLongRun ? COLORS.activeText : COLORS.mutedText,
          fontWeight: isLongRun ? 700 : 500,
        }}
        onMouseEnter={(event) => {
          if (!isLongRun) event.currentTarget.style.color = COLORS.mutedHover;
        }}
        onMouseLeave={(event) => {
          if (!isLongRun) event.currentTarget.style.color = COLORS.mutedText;
        }}
      >
        Long run
      </button>
    </div>
  );
}