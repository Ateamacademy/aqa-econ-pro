export default function NegativeExternalityPalmOil() {
  /**
   * Negative Externality (Palm Oil) · textbook black-and-white style.
   *
   * DATA
   *   MPB = MSB (demand): P = 10 − Q  (downward)
   *   MPC (private supply): P = 1 + Q  (upward, moderate slope)
   *   MSC (social cost):    P = 1 + 2Q (upward, steeper)
   *
   * KEY INTERSECTIONS
   *   Socially optimal: MSC = MPB → Qs=3,  Ps=7
   *   Market eq:        MPC = MPB → Qp=4.5, Pp=5.5
   *
   * SHADED REGION: hatched parallelogram between MPC & MSC, from Qs to Qp
   *   vertices: (Qs,MSC(Qs)), (Qs,MPC(Qs)), (Qp,MPC(Qp)), (Qp,MSC(Qp))
   *           = (3,7), (3,4), (4.5,5.5), (4.5,10)
   */

  const W = 580, H = 500;
  const cL = 80, cT = 40, cR = 490, cB = 430;
  const QM = 8, PM = 12;

  const X = q => cL + (q / QM) * (cR - cL);
  const Y = p => cB - (p / PM) * (cB - cT);

  const mpb = q => 10 - q;
  const mpc = q => 1 + q;
  const msc = q => 1 + 2 * q;

  // Key coords
  const Qs = 3,   Ps = 7;
  const Qp = 4.5, Pp = 5.5;

  const xQs = X(Qs), yPs = Y(Ps);
  const xQp = X(Qp), yPp = Y(Pp);
  const yMscQp = Y(msc(Qp));   // MSC at Qp = Y(10)
  const yMpcQs = Y(mpc(Qs));   // MPC at Qs = Y(4)

  // Extend curve drawing range
  const qMin = 0, qMax = 7.2;

  return (
    <div style={{
      background: "#fff",
      padding: "8px",
      maxWidth: "580px",
      margin: "0 auto",
      fontFamily: "'Times New Roman', Georgia, serif",
      border: "1px solid #d0d0d0",
      borderRadius: "6px",
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          {/* Diagonal hatch pattern for externality region */}
          <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#444" strokeWidth="1.1"/>
          </pattern>
          {/* Arrow marker */}
          <marker id="arrBlk" markerWidth="8" markerHeight="6"
            refX="7" refY="3" orient="auto">
            <polygon points="0 0,8 3,0 6" fill="#111"/>
          </marker>
          <marker id="arrBlkU" markerWidth="6" markerHeight="9"
            refX="3" refY="1" orient="auto">
            <polygon points="0 9,3 0,6 9" fill="#111"/>
          </marker>
          <marker id="arrBlkD" markerWidth="6" markerHeight="9"
            refX="3" refY="8" orient="auto-start-reverse">
            <polygon points="0 9,3 0,6 9" fill="#111"/>
          </marker>
        </defs>

        {/* White background */}
        <rect width={W} height={H} fill="#fff"/>

        {/* ══ HATCHED EXTERNALITY REGION ══
            Vertices: (Qs,7)→(Qs,4)→(Qp,5.5)→(Qp,10) */}
        <polygon
          points={`${xQs},${yPs} ${xQs},${yMpcQs} ${xQp},${yPp} ${xQp},${yMscQp}`}
          fill="url(#hatch)"
          stroke="none"
        />

        {/* ══ DOTTED GUIDE LINES ══ */}
        {/* Ps horizontal */}
        <line x1={cL} y1={yPs} x2={xQs} y2={yPs}
          stroke="#555" strokeWidth="1.4" strokeDasharray="5,4"/>
        {/* Pp horizontal */}
        <line x1={cL} y1={yPp} x2={xQp} y2={yPp}
          stroke="#555" strokeWidth="1.4" strokeDasharray="5,4"/>
        {/* Qs vertical */}
        <line x1={xQs} y1={yPs} x2={xQs} y2={cB}
          stroke="#555" strokeWidth="1.4" strokeDasharray="5,4"/>
        {/* Qp vertical */}
        <line x1={xQp} y1={yPp} x2={xQp} y2={cB}
          stroke="#555" strokeWidth="1.4" strokeDasharray="5,4"/>

        {/* ══ CURVES ══ */}

        {/* MPB = MSB (downward): P = 10-Q */}
        <line x1={X(qMin)} y1={Y(mpb(qMin))} x2={X(qMax)} y2={Y(mpb(qMax))}
          stroke="#111" strokeWidth="2.8" strokeLinecap="round"/>

        {/* MPC (upward moderate): P = 1+Q */}
        <line x1={X(qMin)} y1={Y(mpc(qMin))} x2={X(qMax)} y2={Y(mpc(qMax))}
          stroke="#111" strokeWidth="2.8" strokeLinecap="round"/>

        {/* MSC (upward steep): P = 1+2Q */}
        <line x1={X(qMin)} y1={Y(msc(qMin))} x2={X(qMax)} y2={Y(msc(qMax))}
          stroke="#111" strokeWidth="2.8" strokeLinecap="round"/>

        {/* ══ AXES ══ */}
        {/* Y-axis */}
        <line x1={cL} y1={cB} x2={cL} y2={cT - 15}
          stroke="#111" strokeWidth="2.5" markerEnd="url(#arrBlkU)"/>
        {/* X-axis */}
        <line x1={cL} y1={cB} x2={cR + 24} y2={cB}
          stroke="#111" strokeWidth="2.5" markerEnd="url(#arrBlk)"/>

        {/* ══ DOUBLE-HEADED ARROW: externality gap at Qp ══ */}
        {/* Arrow from MPC(Qp) up to MSC(Qp) */}
        <line x1={xQp + 14} y1={yPp}      x2={xQp + 14} y2={yMscQp + 2}
          stroke="#111" strokeWidth="1.6"
          markerEnd="url(#arrBlkU)" markerStart="url(#arrBlkD)"/>

        {/* ══ ANNOTATION: "Negative externality per unit" ══ */}
        {/* angled leader line from label to gap arrow */}
        <line x1={xQp + 60} y1={Y(9.5)} x2={xQp + 18} y2={(yPp + yMscQp) / 2}
          stroke="#111" strokeWidth="1.3"/>
        <text x={xQp + 58} y={Y(9.5) - 4}
          fontSize="12" fill="#111" fontWeight="bold">Negative externality per unit</text>

        {/* ══ AXIS LABELS ══ */}
        {/* Y-axis title (rotated) */}
        <text
          transform={`rotate(-90,${cL - 42},${(cT + cB) / 2})`}
          x={cL - 42} y={(cT + cB) / 2 + 5}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">MC/MB $</text>

        {/* X-axis label */}
        <text x={(cL + cR + 24) / 2} y={cB + 36}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Quantity</text>

        {/* Origin */}
        <text x={cL - 14} y={cB + 18} fontSize="14" fill="#111">0</text>

        {/* ══ PRICE LABELS ══ */}
        <text x={cL - 10} y={yPs + 5}
          textAnchor="end" fontSize="14" fontWeight="bold" fill="#111">Ps</text>
        <text x={cL - 10} y={yPp + 5}
          textAnchor="end" fontSize="14" fill="#111">Pp</text>

        {/* ══ QUANTITY LABELS ══ */}
        <text x={xQs} y={cB + 20}
          textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111">Qs</text>
        <text x={xQp} y={cB + 20}
          textAnchor="middle" fontSize="14" fill="#111">Qp</text>

        {/* ══ CURVE LABELS (right side) ══ */}
        {/* MSC exits the plot top near q=5.5, so anchor its label beside the
            visible segment (q≈5) instead of at qMax where it maps off-canvas */}
        <text x={X(5) + 8} y={Y(msc(5)) - 2}
          fontSize="14" fontWeight="bold" fill="#111">MSC</text>
        <text x={X(qMax) + 6} y={Y(mpc(qMax)) + 5}
          fontSize="14" fontWeight="bold" fill="#111">MPC</text>
        <text x={X(qMax) + 6} y={Y(mpb(qMax)) + 5}
          fontSize="14" fontWeight="bold" fill="#111">MPB=MSB</text>

      </svg>
    </div>
  );
}
