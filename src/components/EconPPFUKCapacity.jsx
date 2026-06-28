import { useState, useEffect } from "react";

/**
 * UK productive-capacity PPF · animated outward shift (potential growth).
 * Geometry is computed (quarter-ellipse, concave to the origin) so the curves are
 * clean, and the layout keeps the title clear of the axis labels. PPF2 draws in on
 * mount and can be replayed.
 */
export default function EconPPFUKCapacity() {
  const [shifted, setShifted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShifted(true), 450);
    return () => clearTimeout(t);
  }, []);
  const replay = () => { setShifted(false); setTimeout(() => setShifted(true), 60); };

  // Plot frame
  const ox = 110, oy = 430, top = 80, right = 560;
  // PPF extents (x, y)
  const a1 = 320, b1 = 300; // PPF1
  const a2 = 400, b2 = 350; // PPF2 (outward shift)
  const N = 64;
  const curve = (a, b) => {
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const th = (i / N) * (Math.PI / 2);
      pts.push(`${(ox + a * Math.sin(th)).toFixed(1)},${(oy - b * Math.cos(th)).toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const ptOn = (a, b, deg) => {
    const th = (deg * Math.PI) / 180;
    return { x: ox + a * Math.sin(th), y: oy - b * Math.cos(th) };
  };
  const arrows = [26, 50, 72].map((deg) => {
    const p1 = ptOn(a1, b1, deg), p2 = ptOn(a2, b2, deg);
    const dx = p2.x - p1.x, dy = p2.y - p1.y, len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    return {
      x1: (p1.x + ux * 7).toFixed(1), y1: (p1.y + uy * 7).toFixed(1),
      x2: (p2.x - ux * 11).toFixed(1), y2: (p2.y - uy * 11).toFixed(1),
    };
  });
  const sp1 = ptOn(a1, b1, 45);
  const sp2 = ptOn(a2, b2, 45);

  const C1 = "#0f172a";   // PPF1 · slate
  const C2 = "#2563eb";   // PPF2 · blue (growth)
  const DASH = 920;       // > curve length, for the draw-in animation
  const yMid = (top + oy) / 2;

  const btn = {
    fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 8, cursor: "pointer",
    border: "1px solid #d4dbe8", background: "#fff", color: "#334155",
  };
  const btnPrimary = { ...btn, background: "#2563eb", borderColor: "#2563eb", color: "#fff" };

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "12px 12px 8px", maxWidth: 640, margin: "0 auto", fontFamily: "'Inter', system-ui, sans-serif", border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 6 }}>
        <button style={shifted ? btn : btnPrimary} onClick={() => setShifted(true)}>Show economic growth</button>
        <button style={btn} onClick={replay} aria-label="Replay animation">Replay</button>
      </div>

      <svg viewBox="0 0 660 600" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ukR" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#0f172a" /></marker>
          <marker id="ukU" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto"><polygon points="0 10,3.5 0,7 10" fill="#0f172a" /></marker>
          <marker id="ukBlue" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill={C2} /></marker>
        </defs>

        {/* Title band (kept clear of the plot + axis labels) */}
        <text x="330" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0f172a">UK productive capacity</text>
        <text x="330" y="50" textAnchor="middle" fontSize="12.5" fill="#64748b">Vocational training and capital investment shift the PPF outward</text>

        {/* Axes */}
        <line x1={ox} y1={oy} x2={ox} y2={top - 8} stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#ukU)" />
        <line x1={ox} y1={oy} x2={right} y2={oy} stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#ukR)" />

        {/* Axis labels — y rotated alongside the axis so it never collides with the title */}
        <text x="34" y={yMid} textAnchor="middle" fontSize="13" fontWeight="600" fill="#0f172a" transform={`rotate(-90, 34, ${yMid})`}>Capital goods</text>
        <text x={(ox + right) / 2} y={oy + 34} textAnchor="middle" fontSize="13" fontWeight="600" fill="#0f172a">Consumer goods</text>
        <text x={ox - 16} y={oy + 16} textAnchor="middle" fontSize="12" fill="#64748b">O</text>

        {/* PPF1 (always shown) */}
        <polyline points={curve(a1, b1)} fill="none" stroke={C1} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x={ox + a1 + 6} y={oy + 18} fontSize="13" fontWeight="700" fill={C1}>PPF₁</text>

        {/* PPF1 sample point + guides */}
        <line x1={ox} y1={sp1.y.toFixed(1)} x2={sp1.x.toFixed(1)} y2={sp1.y.toFixed(1)} stroke="rgba(15,23,42,0.28)" strokeWidth="1.3" strokeDasharray="7,5" />
        <line x1={sp1.x.toFixed(1)} y1={sp1.y.toFixed(1)} x2={sp1.x.toFixed(1)} y2={oy} stroke="rgba(15,23,42,0.28)" strokeWidth="1.3" strokeDasharray="7,5" />
        <circle cx={sp1.x.toFixed(1)} cy={sp1.y.toFixed(1)} r="5" fill="#fff" stroke={C1} strokeWidth="2" />

        {/* PPF2 (draws in on shift) */}
        <polyline
          points={curve(a2, b2)} fill="none" stroke={C2} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: DASH, strokeDashoffset: shifted ? 0 : DASH, opacity: shifted ? 1 : 0, transition: "stroke-dashoffset 1.15s ease-out, opacity 0.3s ease-out" }}
        />
        <text x={ox + a2 + 6} y={oy + 18} fontSize="13" fontWeight="700" fill={C2}
          style={{ opacity: shifted ? 1 : 0, transition: "opacity 0.5s ease-out 0.9s" }}>PPF₂</text>

        {/* Outward-shift arrows (fade in after the curve draws) */}
        {arrows.map((a, i) => (
          <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={C2} strokeWidth="2.2" markerEnd="url(#ukBlue)"
            style={{ opacity: shifted ? 1 : 0, transition: `opacity 0.45s ease-out ${0.75 + i * 0.18}s` }} />
        ))}

        {/* PPF2 sample point + guides */}
        <g style={{ opacity: shifted ? 1 : 0, transition: "opacity 0.5s ease-out 1.1s" }}>
          <line x1={ox} y1={sp2.y.toFixed(1)} x2={sp2.x.toFixed(1)} y2={sp2.y.toFixed(1)} stroke="rgba(37,99,235,0.32)" strokeWidth="1.3" strokeDasharray="7,5" />
          <line x1={sp2.x.toFixed(1)} y1={sp2.y.toFixed(1)} x2={sp2.x.toFixed(1)} y2={oy} stroke="rgba(37,99,235,0.32)" strokeWidth="1.3" strokeDasharray="7,5" />
          <circle cx={sp2.x.toFixed(1)} cy={sp2.y.toFixed(1)} r="5" fill="#fff" stroke={C2} strokeWidth="2" />
        </g>

        {/* Growth annotation */}
        <g style={{ opacity: shifted ? 1 : 0, transition: "opacity 0.5s ease-out 1.0s" }}>
          <text x="372" y="150" fontSize="12.5" fontWeight="700" fill={C2}>Economic growth</text>
          <text x="372" y="167" fontSize="12.5" fill={C2}>(outward shift)</text>
        </g>

        {/* Reasoning box */}
        <rect x={ox} y="486" width="440" height="92" rx="10" fill="#f1f5fd" stroke="#d7e1f3" strokeWidth="1.2" />
        <text x={ox + 14} y="508" fontSize="11.5" fontWeight="700" fill="#0f172a">Microeconomic reasoning</text>
        <text x={ox + 14} y="527" fontSize="11.5" fill="#475569">Vocational training raises labour productivity (human capital);</text>
        <text x={ox + 14} y="544" fontSize="11.5" fill="#475569">capital investment expands the capital stock. Both increase the</text>
        <text x={ox + 14} y="561" fontSize="11.5" fill="#475569">quantity and quality of factors, shifting the PPF outward (PPF₁ → PPF₂).</text>
      </svg>
    </div>
  );
}
