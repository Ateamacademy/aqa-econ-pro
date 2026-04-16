export { default } from "@/components/MonopolisticCompDiagram";

  // ── Short-run specific ─────────────────────────────────────────────────────
  // AR_SR: (0,8) → (10,0)
  const arSrPts = sample(AR_SR, 0, 10);
  // MR_SR: (0,8) → (5,0) — clip at y=0
  const mrSrPts = sample(MR_SR, 0, 5);

  // Profit rectangle vertices (in SVG coords)
  const [rectX0]    = toS(0,      AC_SR);
  const [rectX1]    = toS(Q_SR,   AC_SR);
  const [, rectTop]  = toS(0,     P_SR);
  const [, rectBot]  = toS(0,     AC_SR);
  const rectW = rectX1 - rectX0;
  const rectH = Math.abs(rectBot - rectTop);

  // ── Long-run specific ──────────────────────────────────────────────────────
  // AR_LR: (0,5.7) → (7.125,0)
  const arLrPts = sample(AR_LR, 0, 7.13);
  // MR_LR: (0,5.7) → (3.5625,0)
  const mrLrPts = sample(MR_LR, 0, 3.57);

  // Excess capacity arrow: Q_LR(3) → Q_MIN_AC(5) at y≈1.2
  const excY = 1.2;
  const [excX1] = toS(Q_LR, excY);
  const [excX2] = toS(Q_MIN_AC, excY);
  const [, excSy] = toS(0, excY);

  // AC at Q_MIN_AC (the min point — used for vertical ref)
  const [minAcSx] = toS(Q_MIN_AC, 0);
  const [, minAcSy] = toS(0, ACfn(Q_MIN_AC));

  // Label positions
  const [arSrLx, arSrLy] = toS(9.6, AR_SR(9.6));
  const [arLrLx, arLrLy] = toS(6.8, AR_LR(6.8));
  const [mrSrLx, mrSrLy] = toS(4.6, MR_SR(4.6));
  const [mrLrLx, mrLrLy] = toS(3.3, MR_LR(3.3));
  const [mcLx,   mcLy]   = toS(7.0, MCfn(7.0));
  const [acLx,   acLy]   = toS(9.0, ACfn(9.0));

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: "100%", display: "block" }}>
      <GridLines />
      <Axes />

      {/* ── SHORT RUN ────────────────────────────────────────────────── */}
      {!showLR && (
        <>
          {/* Supernormal profit rectangle */}
          <rect x={rectX0} y={rectTop} width={rectW} height={rectH}
            fill="rgba(74,222,128,0.14)"
            stroke={C.eq_sr} strokeWidth="1.2" strokeDasharray="5,4" />
          <text x={rectX0 + rectW / 2} y={rectTop + rectH / 2}
            fill={C.eq_sr} fontSize="10" fontFamily={MONO}
            textAnchor="middle" dominantBaseline="middle" opacity="0.88">
            Supernormal profit
          </text>

          {/* MR_SR */}
          <polyline points={mrSrPts} fill="none" stroke={C.mr}
            strokeWidth="2.6" strokeDasharray="8,4"
            strokeLinecap="round" strokeLinejoin="round" />
          <text x={mrSrLx + 8} y={mrSrLy} fill={C.mr} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">MR</text>

          {/* AC (must be drawn before AR so AR shows on top at tangency) */}
          <polyline points={acPts} fill="none" stroke={C.ac}
            strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x={acLx + 7} y={acLy} fill={C.ac} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">AC</text>

          {/* MC */}
          <polyline points={mcPts} fill="none" stroke={C.mc}
            strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x={mcLx + 7} y={mcLy} fill={C.mc} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">MC</text>

          {/* AR = D (SR) */}
          <polyline points={arSrPts} fill="none" stroke={C.ar_sr}
            strokeWidth="2.8" strokeLinecap="round" />
          <text x={arSrLx + 8} y={arSrLy} fill={C.ar_sr} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">AR = D</text>

          {/* MR=MC small dot (determines Q, not P) */}
          <SmallDot dx={Q_SR} dy={MCfn(Q_SR)} color={C.mc} />

          {/* Equilibrium on AR curve */}
          <EqPoint
            dx={Q_SR} dy={P_SR} color={C.eq_sr}
            pLabel="P₁" qLabel="Q₁"
            badge="Profit max"
            labelDx={10} labelDy={-16}
          />

          {/* AC level at Q_SR — horizontal reference */}
          {(() => {
            const [, acRefY] = toS(0, AC_SR);
            const [qSrX]     = toS(Q_SR, 0);
            return (
              <>
                <line x1={X0} y1={acRefY} x2={qSrX} y2={acRefY}
                  stroke={C.ac} strokeWidth="1.2"
                  strokeDasharray="5,4" opacity="0.5" />
                <text x={X0 - 8} y={acRefY} fill={C.ac} fontSize="11"
                  fontWeight="700" fontFamily={MONO}
                  textAnchor="end" dominantBaseline="middle">AC₁</text>
              </>
            );
          })()}
        </>
      )}

      {/* ── LONG RUN ─────────────────────────────────────────────────── */}
      {showLR && (
        <>
          {/* MR_LR */}
          <polyline points={mrLrPts} fill="none" stroke={C.mr}
            strokeWidth="2.6" strokeDasharray="8,4"
            strokeLinecap="round" strokeLinejoin="round" />
          <text x={mrLrLx + 8} y={mrLrLy} fill={C.mr} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">MR</text>

          {/* AC — drawn first so AR_LR tangency is visible on top */}
          <polyline points={acPts} fill="none" stroke={C.ac}
            strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x={acLx + 7} y={acLy} fill={C.ac} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">AC</text>

          {/* MC */}
          <polyline points={mcPts} fill="none" stroke={C.mc}
            strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x={mcLx + 7} y={mcLy} fill={C.mc} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">MC</text>

          {/* AR_LR — tangent to AC. Draw on top so tangency is visible */}
          <polyline points={arLrPts} fill="none" stroke={C.ar_lr}
            strokeWidth="2.8" strokeLinecap="round" />
          <text x={arLrLx + 8} y={arLrLy} fill={C.ar_lr} fontSize="13"
            fontWeight="700" fontFamily={MONO} dominantBaseline="middle">AR = D</text>

          {/* Tangency label — highlight that AR just touches AC */}
          {(() => {
            const [tx, ty] = toS(Q_LR, P_LR);
            return (
              <text x={tx + 12} y={ty - 20}
                fill={C.eq_lr} fontSize="10" fontFamily={MONO}
                textAnchor="start" dominantBaseline="middle" opacity="0.88">
                AR tangent to AC
              </text>
            );
          })()}

          {/* MR=MC small dot */}
          <SmallDot dx={Q_LR} dy={MCfn(Q_LR)} color={C.mc} />

          {/* LR equilibrium at tangency (P = AC = normal profit) */}
          <EqPoint
            dx={Q_LR} dy={P_LR} color={C.eq_lr}
            pLabel="P₁" qLabel="Q₁"
            badge="Normal profit"
            labelDx={10} labelDy={-16}
          />

          {/* Min AC reference — where firm WOULD produce if efficient */}
          <line x1={minAcSx} y1={Y1} x2={minAcSx} y2={minAcSy}
            stroke={C.ac} strokeWidth="1" strokeDasharray="4,5" opacity="0.35" />
          <text x={minAcSx} y={Y1 + 17} fill={C.ac} fontSize="10"
            fontFamily={MONO} textAnchor="middle" opacity="0.6">Q*</text>

          {/* Excess capacity double-headed arrow */}
          {(() => {
            const [qLrSx] = toS(Q_LR, 0);
            return (
              <>
                {/* Arrow line */}
                <line x1={excX1} y1={excSy} x2={excX2} y2={excSy}
                  stroke={C.excess} strokeWidth="1.6" />
                {/* Left arrowhead */}
                <polygon
                  points={`${excX1},${excSy} ${excX1 + 8},${excSy - 4} ${excX1 + 8},${excSy + 4}`}
                  fill={C.excess}
                />
                {/* Right arrowhead */}
                <polygon
                  points={`${excX2},${excSy} ${excX2 - 8},${excSy - 4} ${excX2 - 8},${excSy + 4}`}
                  fill={C.excess}
                />
                {/* Label */}
                <text
                  x={(excX1 + excX2) / 2} y={excSy - 10}
                  fill={C.excess} fontSize="10" fontWeight="600"
                  fontFamily={MONO} textAnchor="middle">
                  Excess capacity
                </text>
              </>
            );
          })()}
        </>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function MonopolisticCompetitionDiagram() {
  const [showLR, setShowLR] = useState(true);

  const legendItems = showLR
    ? [
        { color: C.ar_lr,  label: "AR = D (long run — shifted left)", line: true },
        { color: C.mr,     label: "MR",                                dash: true },
        { color: C.mc,     label: "MC — marginal cost",                line: true },
        { color: C.ac,     label: "AC — average cost (U-shaped)",      line: true },
        { color: C.eq_lr,  label: "Tangency → normal profit",          dot:  true },
        { color: C.excess, label: "Excess capacity",                   line: true },
      ]
    : [
        { color: C.ar_sr,  label: "AR = D (short run)",                line: true },
        { color: C.mr,     label: "MR",                                dash: true },
        { color: C.mc,     label: "MC — marginal cost",                line: true },
        { color: C.ac,     label: "AC — average cost (U-shaped)",      line: true },
        { color: C.eq_sr,  label: "Supernormal profit",                filled: true },
      ];

  const note = showLR
    ? "Long run: supernormal profit attracts new firms → demand for each existing firm shifts LEFT " +
      "until AR = D is TANGENT to AC at Q₁. At tangency: P = AC (normal profit). " +
      "MR = MC also holds at Q₁ (verified: MR_LR(3) = MC(3) = 0.9). " +
      "Firm produces Q₁ = 3 but min AC is at Q* = 5 → excess capacity of 2 units (productive inefficiency)."
    : "Short run: firm has market power (downward-sloping demand). Profit max where MR = MC → output Q₁. " +
      "Price P₁ read from AR = D curve above Q₁. Since P₁ > AC(Q₁), supernormal profit exists (shaded). " +
      "MR has the same y-intercept as AR but exactly twice the slope (standard monopoly MR rule).";

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: MONO,
      color: C.text,
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg,#3b5ef7,#8b3cf7)",
            borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, flexShrink: 0,
          }}>📊</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
              MONOPOLISTIC COMPETITION
            </div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
              {showLR
                ? "Long run — AR = D tangent to AC → normal profit + excess capacity"
                : "Short run — MR = MC → supernormal profit (same diagram as monopoly)"}
            </div>
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            onClick={() => setShowLR(false)}
            style={{
              fontSize: 11,
              color: !showLR ? C.ar_sr : C.muted,
              fontWeight: !showLR ? 700 : 400,
              cursor: "pointer",
              userSelect: "none",
            }}
          >Short run</span>
          <button
            type="button"
            onClick={() => setShowLR(v => !v)}
            aria-label="Toggle short run / long run"
            style={{
              width: 46, height: 24, borderRadius: 12,
              position: "relative",
              background: showLR ? C.ar_lr : C.ar_sr,
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
              border: "none",
              padding: 0,
            }}
          >
            <div style={{
              position: "absolute",
              top: 3, left: showLR ? 25 : 3,
              width: 18, height: 18,
              borderRadius: "50%",
              background: "white",
              transition: "left 0.2s",
              pointerEvents: "none",
            }} />
          </button>
          <span
            onClick={() => setShowLR(true)}
            style={{
              fontSize: 11,
              color: showLR ? C.ar_lr : C.muted,
              fontWeight: showLR ? 700 : 400,
              cursor: "pointer",
              userSelect: "none",
            }}
          >Long run</span>
        </div>
      </div>

      {/* Diagram */}
      <div style={{ flex: 1, padding: "12px 16px" }}>
        <div style={{
          background: C.surface,
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          padding: "8px 4px 4px 0",
        }}>
          <DiagramSVG showLR={showLR} />
        </div>

        {/* Legend */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: "6px 18px", marginTop: 12, paddingLeft: 6,
        }}>
          {legendItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              {item.dot ? (
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: item.color, flexShrink: 0,
                }} />
              ) : item.filled ? (
                <div style={{
                  width: 18, height: 11, borderRadius: 3,
                  background: `${item.color}28`,
                  border: `1px solid ${item.color}`,
                  flexShrink: 0,
                }} />
              ) : (
                <svg width="22" height="4" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="2" x2="22" y2="2"
                    stroke={item.color} strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={item.dash ? "6,3" : undefined} />
                </svg>
              )}
              <span style={{ fontSize: 10, color: C.muted, fontFamily: MONO }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Economics note */}
        <div style={{
          marginTop: 10, padding: "9px 14px",
          background: C.surface,
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          fontSize: 10, color: C.muted,
          lineHeight: 1.7, fontFamily: MONO,
        }}>
          {note}
        </div>
      </div>
    </div>
  );
}
