export default function NegativeExternalityDiagram() {
  /**
   * Negative Externality – Palm Oil diagram
   * Exact replica of reference (economicsonline.co.uk style)
   *
   * COORDINATE SYSTEM  viewBox="0 0 520 500"
   *   X(Q) = 70 + Q * 54        Q range 0–8
   *   Y(P) = 450 - P * 19.5     P range 0–23
   *
   * CURVES
   *   D  (Social Benefit): P = 20 − 2Q   blue downward
   *   S  (Private Supply): P = 2Q         blue upward
   *   MSC (Social Cost):   P = 3Q         red, steeper
   *
   * KEY POINTS
   *   A = (5, 10)  market equilibrium  → £10m  [D = S]
   *   B = (4, 12)  socially efficient  → [D = MSC]
   *   C = (5, 15)  MSC at market Q     → £15m
   *
   * WELFARE LOSS TRIANGLE  B → C → A
   */

  const W = 520, H = 500;
  const xO = 70, yO = 450;           // origin (Q=0, P=0)

  const X = Q => xO + Q * 54;        // Q → svg x
  const Y = P => yO - P * 19.5;      // P → svg y

  // Key points
  const pA = { x: X(5), y: Y(10) };  // A (5,10)
  const pB = { x: X(4), y: Y(12) };  // B (4,12)
  const pC = { x: X(5), y: Y(15) };  // C (5,15)

  const BLUE   = "#1e50d8";
  const RED    = "#e01010";
  const ORANGE = "#f59e0b";
  const WHITE  = "#ffffff";

  return (
    <div style={{
      background: "#111",
      borderRadius: "10px",
      padding: "6px",
      maxWidth: "520px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block" }}
      >
        <defs>
          {/* White arrowhead for axes */}
          <marker id="wA" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0,9 3.5,0 7" fill={WHITE}/>
          </marker>
          {/* Blue arrowhead for curves */}
          <marker id="bA" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0,9 3.5,0 7" fill={BLUE}/>
          </marker>
          {/* Red arrowhead */}
          <marker id="rA" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0,9 3.5,0 7" fill={RED}/>
          </marker>
        </defs>

        {/* ══ BACKGROUND ══ */}
        <rect x="0" y="0" width={W} height={H} fill="#111"/>

        {/* ══ WELFARE LOSS TRIANGLE  B–C–A ══ */}
        <polygon
          points={`${pB.x},${pB.y} ${pC.x},${pC.y} ${pA.x},${pA.y}`}
          fill="rgba(200,15,15,0.6)"
          stroke="none"
        />

        {/* ══ CURVES ══ */}

        {/* Social Benefit / Demand  P = 20−2Q  (BLUE downward) */}
        {/* From Q=0.4,P=19.2 → Q=7.8,P=4.4 */}
        <line
          x1={X(0.4)} y1={Y(19.2)}
          x2={X(7.8)} y2={Y(4.4)}
          stroke={BLUE} strokeWidth="2.8" strokeLinecap="round"
          markerEnd="url(#bA)"
        />

        {/* S – Private Supply  P = 2Q  (BLUE upward) */}
        {/* From Q=0.4,P=0.8 → Q=7.6,P=15.2 */}
        <line
          x1={X(0.4)} y1={Y(0.8)}
          x2={X(7.6)} y2={Y(15.2)}
          stroke={BLUE} strokeWidth="2.8" strokeLinecap="round"
          markerEnd="url(#bA)"
        />

        {/* Social Cost / MSC  P = 3Q  (RED steeper) */}
        {/* From Q=0.4,P=1.2 → Q=6.5,P=19.5 */}
        <line
          x1={X(0.4)} y1={Y(1.2)}
          x2={X(6.5)} y2={Y(19.5)}
          stroke={RED} strokeWidth="2.8" strokeLinecap="round"
          markerEnd="url(#rA)"
        />

        {/* ══ DASHED GUIDE LINES ══ */}

        {/* P horizontal from y-axis to A */}
        <line
          x1={xO} y1={pA.y} x2={pA.x} y2={pA.y}
          stroke="#666" strokeWidth="1.1" strokeDasharray="5,4"
        />
        {/* Q1 vertical from x-axis to B */}
        <line
          x1={pB.x} y1={yO} x2={pB.x} y2={pB.y}
          stroke="#666" strokeWidth="1.1" strokeDasharray="5,4"
        />
        {/* Q vertical from x-axis to A */}
        <line
          x1={pA.x} y1={yO} x2={pA.x} y2={pA.y}
          stroke="#666" strokeWidth="1.1" strokeDasharray="5,4"
        />

        {/* ══ AXES ══ */}
        {/* Y (P) axis */}
        <line
          x1={xO} y1={yO} x2={xO} y2={26}
          stroke={WHITE} strokeWidth="2.2" markerEnd="url(#wA)"
        />
        {/* X (Q) axis */}
        <line
          x1={xO} y1={yO} x2={468} y2={yO}
          stroke={WHITE} strokeWidth="2.2" markerEnd="url(#wA)"
        />

        {/* ══ POINT MARKERS ══ */}
        <circle cx={pA.x} cy={pA.y} r="6.5" fill="#ff9999" stroke={WHITE} strokeWidth="1.5"/>
        <circle cx={pB.x} cy={pB.y} r="6.5" fill="#ff9999" stroke={WHITE} strokeWidth="1.5"/>
        <circle cx={pC.x} cy={pC.y} r="6.5" fill="#ff9999" stroke={WHITE} strokeWidth="1.5"/>

        {/* ══ ORANGE HORIZONTAL ARROW POINTING LEFT → B ══ */}
        {/* Body */}
        <line
          x1={pA.x + 80} y1={pB.y}
          x2={pB.x + 16} y2={pB.y}
          stroke={ORANGE} strokeWidth="2.8"
        />
        {/* Arrowhead (pointing left) */}
        <polygon
          points={`${pB.x+16},${pB.y-7} ${pB.x},${pB.y} ${pB.x+16},${pB.y+7}`}
          fill={ORANGE}
        />

        {/* ══ CURVE LABELS ══ */}

        {/* S — private supply, at top of blue supply curve */}
        <text
          x={X(7.6) + 4} y={Y(15.2) + 4}
          fill={BLUE} fontSize="20" fontWeight="bold"
          fontFamily="Arial, sans-serif">S</text>

        {/* S — social cost curve label (top of red curve) */}
        <text
          x={X(6.5) + 4} y={Y(19.5) + 4}
          fill={RED} fontSize="20" fontWeight="bold"
          fontFamily="Arial, sans-serif">S</text>

        {/* Social Cost label — red italic near MSC curve */}
        <text
          x={X(4.6)} y={Y(17.5)}
          fill={RED} fontSize="11" fontStyle="italic"
          fontFamily="Arial, sans-serif">Social Cost</text>

        {/* Social Benefit label — red italic at bottom right */}
        <text
          x={X(6.4)} y={Y(5.5)}
          fill={RED} fontSize="11" fontStyle="italic"
          fontFamily="Arial, sans-serif">Social</text>
        <text
          x={X(6.4)} y={Y(5.5) + 15}
          fill={RED} fontSize="11" fontStyle="italic"
          fontFamily="Arial, sans-serif">Benefit</text>

        {/* ══ AXIS / QUANTITY LABELS ══ */}

        {/* P label on y-axis tick */}
        <line x1={xO-5} y1={pA.y} x2={xO} y2={pA.y} stroke={WHITE} strokeWidth="1.5"/>
        <text
          x={xO - 16} y={pA.y + 5}
          fill={WHITE} fontSize="15" fontWeight="bold"
          fontFamily="Arial, sans-serif" textAnchor="middle">P</text>

        {/* Q label at axis end */}
        <text
          x={472} y={yO + 6}
          fill={WHITE} fontSize="15" fontWeight="bold"
          fontFamily="Arial, sans-serif">Q</text>

        {/* Q1 tick + label */}
        <line x1={pB.x} y1={yO} x2={pB.x} y2={yO+5} stroke={WHITE} strokeWidth="1.5"/>
        <text
          x={pB.x} y={yO + 20}
          textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold"
          fontFamily="Arial, sans-serif">Q1</text>

        {/* Q tick + label */}
        <line x1={pA.x} y1={yO} x2={pA.x} y2={yO+5} stroke={WHITE} strokeWidth="1.5"/>
        <text
          x={pA.x} y={yO + 20}
          textAnchor="middle" fill={WHITE} fontSize="14" fontWeight="bold"
          fontFamily="Arial, sans-serif">Q</text>

        {/* Socially Efficient label */}
        <text
          x={pB.x} y={yO + 36}
          textAnchor="middle" fill="#fbbf24" fontSize="11" fontStyle="italic"
          fontFamily="Arial, sans-serif">Socially</text>
        <text
          x={pB.x} y={yO + 50}
          textAnchor="middle" fill="#fbbf24" fontSize="11" fontStyle="italic"
          fontFamily="Arial, sans-serif">Efficient</text>

        {/* ══ POINT LABELS A, B, C ══ */}

        {/* B */}
        <text
          x={pB.x - 22} y={pB.y + 5}
          fill={WHITE} fontSize="16" fontWeight="bold"
          fontFamily="Arial, sans-serif">B</text>

        {/* C + £15m */}
        <text
          x={pC.x + 10} y={pC.y - 2}
          fill={WHITE} fontSize="16" fontWeight="bold"
          fontFamily="Arial, sans-serif">C</text>
        <text
          x={pC.x + 28} y={pC.y - 2}
          fill={WHITE} fontSize="12"
          fontFamily="Arial, sans-serif">£15m</text>

        {/* A + £10m */}
        <text
          x={pA.x + 10} y={pA.y + 5}
          fill={WHITE} fontSize="16" fontWeight="bold"
          fontFamily="Arial, sans-serif">A</text>
        <text
          x={pA.x + 28} y={pA.y + 5}
          fill={WHITE} fontSize="12"
          fontFamily="Arial, sans-serif">£10m</text>

      </svg>
    </div>
  );
}
