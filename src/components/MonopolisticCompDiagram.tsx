import { useState } from "react";

// Long-run AR: tangent to AC at Q≈266, P≈327 (further left, lower price)
const LR_PATHS = {
  ar: "M 85,250 L 105,258 L 125,265 L 145,273 L 165,281 L 185,289 L 205,297 L 225,305 L 245,313 L 266,321 L 285,329 L 305,337 L 325,345 L 345,353 L 365,361 L 385,369 L 405,377 L 425,385 L 445,393 L 465,401 L 485,409 L 505,417 L 525,425",
  mr: "M 85,255 L 100,266 L 115,277 L 130,288 L 145,299 L 160,310 L 175,321 L 190,332 L 205,343 L 220,354 L 235,365 L 250,376 L 265,387 L 280,398 L 295,409 L 310,420",
};

// Short-run AR: clearly RIGHT of long-run AR (higher demand before entry erodes it)
// Tangent-style higher curve so P₁ > AC(Q₁) producing supernormal profit rectangle
const SR_PATHS = {
  ar: "M 85,170 L 110,180 L 135,190 L 160,200 L 185,210 L 210,220 L 235,230 L 260,240 L 285,250 L 310,260 L 335,270 L 360,280 L 385,290 L 410,300 L 435,310 L 460,320 L 485,330 L 510,340 L 535,350",
  mr: "M 85,175 L 105,192 L 125,209 L 145,226 L 165,243 L 185,260 L 205,277 L 225,294 L 245,311 L 265,328 L 285,345 L 305,362 L 325,379 L 345,396 L 365,413",
};

const SHARED_PATHS = {
  // U-shaped MC rising sharply on the right
  mc: "M 109,254 L 118,269 L 127,283 L 136,296 L 145,308 L 155,318 L 164,328 L 173,337 L 182,344 L 191,351 L 200,356 L 209,361 L 218,364 L 227,366 L 236,367 L 245,368 L 254,367 L 263,365 L 272,361 L 281,357 L 290,352 L 300,346 L 309,338 L 318,330 L 327,320 L 336,310 L 345,298 L 354,285 L 363,272 L 372,257 L 381,241 L 390,224 L 399,206 L 408,187 L 417,167 L 426,145 L 436,123 L 445,100 L 454,75 L 463,50",
  // U-shaped AC, minimum near x≈315, y≈332
  ac: "M 109,229 L 119,239 L 129,248 L 139,257 L 149,266 L 159,274 L 169,281 L 180,288 L 190,294 L 200,300 L 210,305 L 220,310 L 230,315 L 240,319 L 250,322 L 260,325 L 270,328 L 280,330 L 290,331 L 300,332 L 310,332 L 320,332 L 330,332 L 340,331 L 350,329 L 360,327 L 370,325 L 380,322 L 390,319 L 401,315 L 411,310 L 421,305 L 431,300 L 441,294 L 451,288 L 461,281 L 471,273 L 481,265 L 491,257 L 501,248 L 511,239",
};

const COLORS = {
  title: "hsl(var(--foreground))",
  text: "hsl(var(--muted-foreground))",
  textStrong: "hsl(var(--foreground))",
  border: "hsl(var(--border) / 0.3)",
  panel: "hsl(var(--background) / 0.3)",
  surface: "hsl(var(--background) / 0.92)",
  axis: "hsl(var(--muted-foreground))",
  shortRun: "hsl(var(--electric-blue))",
  longRun: "hsl(var(--indigo-glow))",
  marginalCost: "hsl(var(--warning))",
  averageCost: "hsl(var(--success))",
  accent: "hsl(var(--accent))",
  danger: "hsl(var(--destructive))",
  toggleOff: "hsl(var(--muted-foreground) / 0.45)",
  toggleKnob: "hsl(var(--primary-foreground))",
  profitFill: "hsl(var(--success) / 0.18)",
  profitText: "hsl(var(--success))",
  ghost: "hsl(var(--electric-blue) / 0.15)",
};

const monoStyle = { fontFamily: "'JetBrains Mono', monospace" };

type Mode = "short-run" | "long-run";

// === SHORT-RUN VIEW ===
// Profit max: MR=MC at Q₁≈245, price read off AR at Q₁ → P₁≈230 (above AC≈322)
function ShortRunSvg() {
  const Q1_X = 245;
  const P1_Y = 230;        // P read off AR₁ at Q₁
  const AC_AT_Q1_Y = 322;  // AC value at Q₁

  return (
    <g>
      {/* Supernormal profit rectangle */}
      <rect
        x={70}
        y={P1_Y}
        width={Q1_X - 70}
        height={AC_AT_Q1_Y - P1_Y}
        fill={COLORS.profitFill}
        stroke={COLORS.profitText}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <text x={(70 + Q1_X) / 2} y={(P1_Y + AC_AT_Q1_Y) / 2 - 4} fill={COLORS.profitText} fontSize="11" fontWeight="700" textAnchor="middle">
        Supernormal
      </text>
      <text x={(70 + Q1_X) / 2} y={(P1_Y + AC_AT_Q1_Y) / 2 + 10} fill={COLORS.profitText} fontSize="11" fontWeight="700" textAnchor="middle">
        profit
      </text>

      {/* AR₁ = D₁ */}
      <path d={SR_PATHS.ar} fill="none" stroke={COLORS.shortRun} strokeWidth="2.5" />
      <text x="540" y="350" fill={COLORS.shortRun} fontSize="12" fontWeight="700">AR₁ = D₁</text>

      {/* MR₁ */}
      <path d={SR_PATHS.mr} fill="none" stroke={COLORS.shortRun} strokeWidth="2" strokeDasharray="8 5" />
      <text x="335" y="400" fill={COLORS.shortRun} fontSize="12" fontWeight="700">MR₁</text>

      {/* Profit-max marker (MR=MC at Q₁) */}
      <circle cx={Q1_X} cy={P1_Y + 90} r="6" fill="none" stroke={COLORS.marginalCost} strokeWidth="2.2" />
      <circle cx={Q1_X} cy={P1_Y + 90} r="2.5" fill={COLORS.marginalCost} />

      {/* Price/output guides */}
      <line x1="70" y1={P1_Y} x2={Q1_X} y2={P1_Y} stroke={COLORS.shortRun} strokeWidth="1" strokeDasharray="4 3" />
      <line x1={Q1_X} y1={P1_Y} x2={Q1_X} y2="430" stroke={COLORS.averageCost} strokeWidth="1" strokeDasharray="4 3" />
      <line x1="70" y1={AC_AT_Q1_Y} x2={Q1_X} y2={AC_AT_Q1_Y} stroke={COLORS.averageCost} strokeWidth="1" strokeDasharray="4 3" />

      {/* Equilibrium dot on AR */}
      <circle cx={Q1_X} cy={P1_Y} r="6" fill="none" stroke={COLORS.shortRun} strokeWidth="2" />
      <circle cx={Q1_X} cy={P1_Y} r="2.5" fill={COLORS.shortRun} />

      <text x="60" y={P1_Y + 4} fill={COLORS.shortRun} fontSize="12" fontWeight="700" textAnchor="end">P₁</text>
      <text x="60" y={AC_AT_Q1_Y + 4} fill={COLORS.averageCost} fontSize="12" fontWeight="700" textAnchor="end">AC₁</text>
      <text x={Q1_X} y="446" fill={COLORS.averageCost} fontSize="12" fontWeight="700" textAnchor="middle">Q₁</text>

      {/* Profit-max callout */}
      <rect x={Q1_X + 18} y={P1_Y + 78} width="92" height="28" rx="4" fill={COLORS.surface} stroke={COLORS.border} strokeWidth="0.8" />
      <text x={Q1_X + 64} y={P1_Y + 90} fill={COLORS.textStrong} fontSize="9" fontWeight="600" textAnchor="middle">Profit max</text>
      <text x={Q1_X + 64} y={P1_Y + 101} fill={COLORS.text} fontSize="8" textAnchor="middle">(MR₁ = MC)</text>
    </g>
  );
}

// === LONG-RUN VIEW ===
function LongRunSvg() {
  const Q2_X = 266;
  const P2_Y = 321;        // tangent: P = AC

  return (
    <g>
      {/* Ghost short-run AR for context */}
      <path d={SR_PATHS.ar} fill="none" stroke={COLORS.shortRun} strokeWidth="1" opacity="0.18" strokeDasharray="3 4" />
      <text x="540" y="335" fill={COLORS.shortRun} fontSize="9" opacity="0.4" fontStyle="italic">D₁ (was)</text>

      {/* AR₂ = D₂ (tangent to AC) */}
      <path d={LR_PATHS.ar} fill="none" stroke={COLORS.shortRun} strokeWidth="2.5" />
      <text x="530" y="430" fill={COLORS.shortRun} fontSize="12" fontWeight="700">AR₂ = D₂</text>

      {/* MR₂ */}
      <path d={LR_PATHS.mr} fill="none" stroke={COLORS.shortRun} strokeWidth="2" strokeDasharray="8 5" />
      <text x="320" y="425" fill={COLORS.shortRun} fontSize="12" fontWeight="700">MR₂</text>

      {/* Tangent point */}
      <circle cx={Q2_X} cy={P2_Y} r="8" fill="none" stroke={COLORS.averageCost} strokeWidth="2.5" />
      <circle cx={Q2_X} cy={P2_Y} r="3" fill={COLORS.averageCost} />

      {/* Normal-profit callout */}
      <rect x={Q2_X + 20} y={P2_Y - 40} width="135" height="38" rx="5" fill={COLORS.surface} stroke={COLORS.border} strokeWidth="0.8" />
      <text x={Q2_X + 88} y={P2_Y - 24} fill={COLORS.textStrong} fontSize="11" fontWeight="700" textAnchor="middle">Normal profit</text>
      <text x={Q2_X + 88} y={P2_Y - 10} fill={COLORS.text} fontSize="9" textAnchor="middle">(P = AC at Q₂)</text>

      {/* Guides */}
      <line x1="70" y1={P2_Y} x2={Q2_X} y2={P2_Y} stroke={COLORS.shortRun} strokeWidth="1" strokeDasharray="4 3" />
      <line x1={Q2_X} y1={P2_Y} x2={Q2_X} y2="430" stroke={COLORS.averageCost} strokeWidth="1" strokeDasharray="4 3" />

      <text x="60" y={P2_Y + 4} fill={COLORS.shortRun} fontSize="12" fontWeight="700" textAnchor="end">P₂</text>
      <text x={Q2_X} y="446" fill={COLORS.averageCost} fontSize="12" fontWeight="700" textAnchor="middle">Q₂</text>

      {/* Entry annotation */}
      <line x1="400" y1="140" x2="310" y2="140" stroke={COLORS.longRun} strokeWidth="2" />
      <polygon points="310,140 320,135 320,145" fill={COLORS.longRun} />
      <text x="355" y="128" fill={COLORS.longRun} fontSize="11" fontWeight="700" textAnchor="middle">New firms enter</text>
      <text x="355" y="158" fill={COLORS.longRun} fontSize="11" fontWeight="700" textAnchor="middle">→ D shifts left</text>

      {/* Excess capacity arrow Q₂ → AC min (≈315) */}
      <line x1={Q2_X} y1="418" x2="315" y2="418" stroke={COLORS.danger} strokeWidth="1.5" />
      <polygon points={`${Q2_X},418 ${Q2_X + 6},414 ${Q2_X + 6},422`} fill={COLORS.danger} />
      <polygon points="315,418 309,414 309,422" fill={COLORS.danger} />
      <text x={(Q2_X + 315) / 2} y="412" fill={COLORS.danger} fontSize="9" fontWeight="700" textAnchor="middle">Excess capacity</text>

      <circle cx="315" cy="332" r="3" fill={COLORS.averageCost} />
      <text x="323" y="336" fill={COLORS.averageCost} fontSize="9" fontStyle="italic">AC min</text>

      <text x="85" y="347" fill={COLORS.averageCost} fontSize="9" fontStyle="italic">AR tangent to AC</text>
      <text x="85" y="359" fill={COLORS.averageCost} fontSize="9" fontStyle="italic">→ zero supernormal profit</text>
    </g>
  );
}

export default function MonopolisticCompDiagram() {
  const [mode, setMode] = useState<Mode>("long-run");
  const longRun = mode === "long-run";

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
          padding: "0 4px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: COLORS.title,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Monopolistic Competition
          </div>
          <div
            style={{
              fontSize: "11px",
              color: COLORS.text,
              marginTop: "2px",
              ...monoStyle,
            }}
          >
            {longRun
              ? "Long run → entry erodes profit → AR tangent to AC → normal profit"
              : "Short run → MR = MC → P > AC → supernormal profit"}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setMode("short-run")}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              color: !longRun ? COLORS.shortRun : COLORS.text,
              userSelect: "none",
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            Short run
          </button>

          <button
            type="button"
            onClick={() => setMode(longRun ? "short-run" : "long-run")}
            aria-label="Toggle short run and long run"
            role="switch"
            aria-checked={longRun}
            style={{
              position: "relative",
              width: "48px",
              height: "24px",
              borderRadius: "12px",
              border: `1px solid ${COLORS.border}`,
              cursor: "pointer",
              backgroundColor: longRun ? COLORS.accent : COLORS.toggleOff,
              transition: "background-color 0.3s, border-color 0.3s",
              flexShrink: 0,
              padding: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1px",
                left: longRun ? "25px" : "1px",
                width: "20px",
                height: "20px",
                borderRadius: "10px",
                backgroundColor: COLORS.toggleKnob,
                boxShadow: "0 1px 3px hsl(0 0% 0% / 0.3)",
                transition: "left 0.3s",
              }}
            />
          </button>

          <button
            type="button"
            onClick={() => setMode("long-run")}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              color: longRun ? COLORS.longRun : COLORS.text,
              userSelect: "none",
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            Long run
          </button>
        </div>
      </div>

      <svg
        key={mode}
        viewBox="0 0 620 480"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: COLORS.panel,
          borderRadius: "8px",
          border: `1px solid ${COLORS.border}`,
          transition: "opacity 0.3s",
        }}
      >
        <line x1="70" y1="40" x2="70" y2="430" stroke={COLORS.axis} strokeWidth="1.5" />
        <line x1="70" y1="430" x2="560" y2="430" stroke={COLORS.axis} strokeWidth="1.5" />
        <polygon points="70,40 65,50 75,50" fill={COLORS.axis} />
        <polygon points="560,430 550,425 550,435" fill={COLORS.axis} />
        <text x="20" y="235" fill={COLORS.axis} fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90 20 235)">
          Price / Cost / Revenue
        </text>
        <text x="315" y="468" fill={COLORS.axis} fontSize="11" fontWeight="600" textAnchor="middle">
          Quantity (Q)
        </text>

        {/* Shared cost curves */}
        <path d={SHARED_PATHS.mc} fill="none" stroke={COLORS.marginalCost} strokeWidth="2.8" strokeLinecap="round" />
        <text x="390" y="218" fill={COLORS.marginalCost} fontSize="14" fontWeight="700">MC</text>

        <path d={SHARED_PATHS.ac} fill="none" stroke={COLORS.averageCost} strokeWidth="2.8" strokeLinecap="round" />
        <text x="500" y="232" fill={COLORS.averageCost} fontSize="14" fontWeight="700">AC</text>

        {longRun ? <LongRunSvg /> : <ShortRunSvg />}
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "8px", padding: "0 4px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: COLORS.text }}>
          <span style={{ display: "inline-block", width: "16px", height: "2px", backgroundColor: COLORS.shortRun, borderRadius: "1px" }} />
          AR = D
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: COLORS.text }}>
          <span style={{ display: "inline-block", width: "16px", height: "0px", borderTop: `2px dashed ${COLORS.shortRun}` }} />
          MR
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: COLORS.text }}>
          <span style={{ display: "inline-block", width: "16px", height: "2px", backgroundColor: COLORS.marginalCost, borderRadius: "1px" }} />
          MC — marginal cost
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: COLORS.text }}>
          <span style={{ display: "inline-block", width: "16px", height: "2px", backgroundColor: COLORS.averageCost, borderRadius: "1px" }} />
          AC — average cost (U-shaped)
        </span>
        {!longRun && (
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: COLORS.text }}>
            <span style={{ display: "inline-block", width: "12px", height: "12px", backgroundColor: COLORS.profitFill, border: `1px solid ${COLORS.averageCost}`, borderRadius: "2px" }} />
            Supernormal profit
          </span>
        )}
      </div>

      <div style={{ fontSize: "11px", color: COLORS.text, marginTop: "8px", padding: "0 4px", lineHeight: "1.5", ...monoStyle }}>
        {!longRun ? (
          <p>
            Short run: firm has market power (downward-sloping demand). Profit max where MR = MC → output Q₁. Price P₁ read from AR = D curve above Q₁. Since P₁ {">"} AC(Q₁), supernormal profit exists (shaded). MR has the same y-intercept as AR but exactly twice the slope (standard monopoly MR rule).
          </p>
        ) : (
          <p>
            Long run: supernormal profit attracts new entrants → each takes market share → AR shifts left. Entry continues until AR is tangent to AC: P₂ = AC(Q₂) → normal profit only. The firm produces LEFT of AC min → excess capacity (the "cost" of product variety).
          </p>
        )}
      </div>
    </div>
  );
}
