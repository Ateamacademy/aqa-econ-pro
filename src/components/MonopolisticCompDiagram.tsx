import { useState } from "react";

const SR_PATHS = {
  ar: "M 85,88 L 96,96 L 107,103 L 119,110 L 130,117 L 141,124 L 152,131 L 164,139 L 175,146 L 186,153 L 197,160 L 209,167 L 220,174 L 231,182 L 242,189 L 254,196 L 265,203 L 276,210 L 288,218 L 299,225 L 310,232 L 321,239 L 333,246 L 344,253 L 355,261 L 366,268 L 378,275 L 389,282 L 400,289 L 412,296 L 423,304 L 434,311 L 445,318 L 457,325 L 468,332 L 479,340 L 490,347 L 502,354 L 513,361 L 524,368 L 536,375",
  mr: "M 85,98 L 91,106 L 98,114 L 104,123 L 111,131 L 117,139 L 124,147 L 130,156 L 137,164 L 143,172 L 150,180 L 156,189 L 163,197 L 169,205 L 176,213 L 182,222 L 189,230 L 195,238 L 202,247 L 208,255 L 215,263 L 221,271 L 228,280 L 234,288 L 241,296 L 247,304 L 254,313 L 260,321 L 266,329 L 273,337 L 279,346 L 286,354 L 292,362",
};

const LR_PATHS = {
  ar: "M 85,283 L 96,286 L 107,289 L 119,291 L 130,294 L 141,297 L 152,300 L 164,302 L 175,305 L 186,308 L 197,310 L 209,313 L 220,316 L 231,318 L 242,321 L 254,324 L 265,326 L 276,329 L 288,332 L 299,334 L 310,337 L 321,340 L 333,343 L 344,345 L 355,348 L 366,351 L 378,353 L 389,356 L 400,359 L 412,361 L 423,364 L 434,367 L 445,369 L 457,372 L 468,375 L 479,378 L 490,380 L 502,383 L 513,386 L 524,388 L 536,391",
  mr: "M 85,287 L 92,290 L 100,294 L 107,298 L 115,301 L 122,305 L 130,308 L 137,312 L 144,315 L 152,319 L 159,323 L 167,326 L 174,330 L 182,333 L 189,337 L 197,340 L 204,344 L 212,348 L 219,351 L 227,355 L 234,358 L 242,362 L 249,365 L 257,369 L 264,373 L 272,376 L 279,380 L 286,383 L 294,387 L 301,390 L 309,394 L 316,397 L 324,401 L 331,405 L 339,408 L 346,412 L 354,415 L 361,419 L 369,422 L 376,426 L 384,430",
};

const SHARED_PATHS = {
  mc: "M 109,254 L 118,269 L 127,283 L 136,296 L 145,308 L 155,318 L 164,328 L 173,337 L 182,344 L 191,351 L 200,356 L 209,361 L 218,364 L 227,366 L 236,367 L 245,368 L 254,367 L 263,365 L 272,361 L 281,357 L 290,352 L 300,346 L 309,338 L 318,330 L 327,320 L 336,310 L 345,298 L 354,285 L 363,272 L 372,257 L 381,241 L 390,224 L 399,206 L 408,187 L 417,167 L 426,145 L 436,123 L 445,100 L 454,75 L 463,50",
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
  profitFill: "hsl(var(--success) / 0.15)",
  profitText: "hsl(var(--success))",
  ghost: "hsl(var(--electric-blue) / 0.15)",
};

const monoStyle = {
  fontFamily: "'JetBrains Mono', monospace",
};

export default function MonopolisticCompDiagram() {
  const [longRun, setLongRun] = useState(true);

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
              : "Short run → MR = MC → supernormal profit (same diagram as monopoly)"}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            onClick={() => setLongRun(false)}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              color: !longRun ? COLORS.shortRun : COLORS.text,
              userSelect: "none",
            }}
          >
            Short run
          </span>

          <button
            type="button"
            onClick={() => setLongRun((prev) => !prev)}
            aria-label="Toggle short run and long run"
            aria-pressed={longRun}
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

          <span
            onClick={() => setLongRun(true)}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              color: longRun ? COLORS.longRun : COLORS.text,
              userSelect: "none",
            }}
          >
            Long run
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 620 480"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: COLORS.panel,
          borderRadius: "8px",
          border: `1px solid ${COLORS.border}`,
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

        <path d={SHARED_PATHS.mc} fill="none" stroke={COLORS.marginalCost} strokeWidth="2.8" strokeLinecap="round" />
        <text x="390" y="218" fill={COLORS.marginalCost} fontSize="14" fontWeight="700">MC</text>

        <path d={SHARED_PATHS.ac} fill="none" stroke={COLORS.averageCost} strokeWidth="2.8" strokeLinecap="round" />
        <text x="500" y="232" fill={COLORS.averageCost} fontSize="14" fontWeight="700">AC</text>

        {!longRun && (
          <g>
            <path d={SR_PATHS.ar} fill="none" stroke={COLORS.shortRun} strokeWidth="2.5" />
            <text x="530" y="382" fill={COLORS.shortRun} fontSize="12" fontWeight="700">AR = D</text>

            <path d={SR_PATHS.mr} fill="none" stroke={COLORS.shortRun} strokeWidth="2" strokeDasharray="8 5" />
            <text x="285" y="378" fill={COLORS.shortRun} fontSize="12" fontWeight="700">MR</text>

            <rect x="70" y="217" width="216" height="114" fill={COLORS.profitFill} stroke={COLORS.averageCost} strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="178" y="268" fill={COLORS.profitText} fontSize="11" fontWeight="700" textAnchor="middle">Supernormal</text>
            <text x="178" y="282" fill={COLORS.profitText} fontSize="11" fontWeight="700" textAnchor="middle">profit</text>

            <circle cx="286" cy="355" r="7" fill="none" stroke={COLORS.marginalCost} strokeWidth="2.5" />
            <circle cx="286" cy="355" r="2.5" fill={COLORS.marginalCost} />

            <rect x="296" y="337" width="82" height="28" rx="4" fill={COLORS.surface} stroke={COLORS.border} strokeWidth="0.8" />
            <text x="337" y="349" fill={COLORS.textStrong} fontSize="9" fontWeight="600" textAnchor="middle">Profit max</text>
            <text x="337" y="360" fill={COLORS.text} fontSize="8" textAnchor="middle">(MR = MC)</text>

            <circle cx="286" cy="217" r="6" fill="none" stroke={COLORS.shortRun} strokeWidth="2" />
            <circle cx="286" cy="217" r="2" fill={COLORS.shortRun} />

            <line x1="70" y1="217" x2="286" y2="217" stroke={COLORS.shortRun} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="286" y1="217" x2="286" y2="430" stroke={COLORS.averageCost} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="70" y1="331" x2="286" y2="331" stroke={COLORS.averageCost} strokeWidth="1" strokeDasharray="4 3" />

            <text x="60" y="221" fill={COLORS.shortRun} fontSize="12" fontWeight="700" textAnchor="end">P₁</text>
            <text x="60" y="335" fill={COLORS.averageCost} fontSize="12" fontWeight="700" textAnchor="end">AC₁</text>
            <text x="286" y="446" fill={COLORS.averageCost} fontSize="12" fontWeight="700" textAnchor="middle">Q₁</text>
          </g>
        )}

        {longRun && (
          <g>
            <path d={SR_PATHS.ar} fill="none" stroke={COLORS.shortRun} strokeWidth="1" opacity="0.15" />
            <text x="530" y="370" fill={COLORS.shortRun} fontSize="9" opacity="0.3" fontStyle="italic">D₁</text>

            <path d={LR_PATHS.ar} fill="none" stroke={COLORS.shortRun} strokeWidth="2.5" />
            <text x="530" y="398" fill={COLORS.shortRun} fontSize="12" fontWeight="700">AR₂ = D₂</text>

            <path d={LR_PATHS.mr} fill="none" stroke={COLORS.shortRun} strokeWidth="2" strokeDasharray="8 5" />
            <text x="370" y="445" fill={COLORS.shortRun} fontSize="12" fontWeight="700">MR₂</text>

            <circle cx="266" cy="327" r="8" fill="none" stroke={COLORS.averageCost} strokeWidth="2.5" />
            <circle cx="266" cy="327" r="3" fill={COLORS.averageCost} />

            <rect x="280" y="280" width="135" height="38" rx="5" fill={COLORS.surface} stroke={COLORS.border} strokeWidth="0.8" />
            <text x="348" y="296" fill={COLORS.textStrong} fontSize="11" fontWeight="700" textAnchor="middle">Normal profit</text>
            <text x="348" y="310" fill={COLORS.text} fontSize="9" textAnchor="middle">(P = AC at Q₂)</text>

            <line x1="70" y1="327" x2="266" y2="327" stroke={COLORS.shortRun} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="266" y1="327" x2="266" y2="430" stroke={COLORS.averageCost} strokeWidth="1" strokeDasharray="4 3" />

            <text x="60" y="331" fill={COLORS.shortRun} fontSize="12" fontWeight="700" textAnchor="end">P₂</text>
            <text x="266" y="446" fill={COLORS.averageCost} fontSize="12" fontWeight="700" textAnchor="middle">Q₂</text>

            <line x1="400" y1="140" x2="310" y2="140" stroke={COLORS.longRun} strokeWidth="2" />
            <polygon points="310,140 320,135 320,145" fill={COLORS.longRun} />
            <text x="355" y="128" fill={COLORS.longRun} fontSize="11" fontWeight="700" textAnchor="middle">New firms enter</text>
            <text x="355" y="158" fill={COLORS.longRun} fontSize="11" fontWeight="700" textAnchor="middle">→ D shifts left</text>

            <line x1="266" y1="418" x2="315" y2="418" stroke={COLORS.danger} strokeWidth="1.5" />
            <polygon points="266,418 272,414 272,422" fill={COLORS.danger} />
            <polygon points="315,418 309,414 309,422" fill={COLORS.danger} />
            <text x="290" y="412" fill={COLORS.danger} fontSize="9" fontWeight="700" textAnchor="middle">Excess capacity</text>

            <circle cx="315" cy="332" r="3" fill={COLORS.averageCost} />
            <text x="323" y="336" fill={COLORS.averageCost} fontSize="9" fontStyle="italic">AC min</text>

            <text x="85" y="347" fill={COLORS.averageCost} fontSize="9" fontStyle="italic">AR tangent to AC</text>
            <text x="85" y="359" fill={COLORS.averageCost} fontSize="9" fontStyle="italic">→ zero supernormal profit</text>
          </g>
        )}
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
