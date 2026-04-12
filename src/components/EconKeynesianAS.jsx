export default function EconKeynesianAS() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'0',maxWidth:'820px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc',overflow:'hidden'}}>
      <svg viewBox="0 0 820 540" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="kyR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="kyU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="kyGrn" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#1a8a1a"/></marker>
          <marker id="kyGrnU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#1a8a1a"/></marker>
          <marker id="kyGry" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#555"/></marker>
        </defs>
        <rect width="820" height="540" fill="#fff"/>

        {/* HEADER BARS */}
        <rect x="0" y="0" width="410" height="38" fill="#2a6496"/>
        <text x="205" y="25" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">Spare Capacity</text>
        <rect x="410" y="0" width="410" height="38" fill="#2a6496"/>
        <text x="615" y="25" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">Full Capacity</text>

        {/* FOOTER BARS */}
        <rect x="0" y="500" width="410" height="40" fill="#0000cc"/>
        <text x="205" y="526" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#fff">Growth</text>
        <rect x="410" y="500" width="410" height="40" fill="#0000cc"/>
        <text x="615" y="526" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#fff">Inflation</text>

        {/* ── LEFT PANEL: SPARE CAPACITY ── */}
        <line x1="52" y1="470" x2="52" y2="56" stroke="#111" strokeWidth="2" markerEnd="url(#kyU)"/>
        <line x1="52" y1="470" x2="380" y2="470" stroke="#111" strokeWidth="2" markerEnd="url(#kyR)"/>
        <text x="36" y="82" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Price</text>
        <text x="36" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Level</text>
        <text x="360" y="485" fontSize="12" fontWeight="bold" fill="#111">Real Output</text>

        {/* Keynesian AS: flat then steep */}
        <path d="M 60 370 L 240 370 Q 290 370 310 320 Q 330 270 340 120" fill="none" stroke="#cc2222" strokeWidth="2.8" strokeLinecap="round"/>
        <text x="344" y="116" fontSize="13" fontWeight="bold" fill="#cc2222">AS</text>

        {/* YFE vertical dashed */}
        <line x1="338" y1="130" x2="338" y2="470" stroke="#111" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="338" y="485" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Y&#8320;&#x2013;&#x2013;</text>
        <text x="338" y="485" textAnchor="middle" fontSize="11" fill="#111">YFE</text>

        {/* AD (original, blue, left) */}
        <line x1="60" y1="220" x2="280" y2="420" stroke="#2255cc" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="62" y="216" fontSize="13" fontWeight="bold" fill="#2255cc">AD</text>

        {/* AD1 (shifted right, blue) */}
        <line x1="100" y1="220" x2="320" y2="420" stroke="#2255cc" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="270" y="218" fontSize="13" fontWeight="bold" fill="#2255cc">AD</text>
        <text x="280" y="218" fontSize="10" fill="#2255cc">1</text>

        {/* Shift arrow for AD */}
        <line x1="158" y1="300" x2="196" y2="300" stroke="#555" strokeWidth="2" markerEnd="url(#kyGry)"/>

        {/* Price P (flat section) */}
        <line x1="52" y1="370" x2="165" y2="370" stroke="#888" strokeWidth="1.3" strokeDasharray="6,4"/>
        <text x="46" y="374" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">P</text>

        {/* Equilibrium dots */}
        <circle cx="150" cy="370" r="6" fill="#cc2222"/>
        <circle cx="200" cy="370" r="6" fill="#cc2222"/>

        {/* Y and Y1 dashed verticals */}
        <line x1="150" y1="370" x2="150" y2="470" stroke="#888" strokeWidth="1.3" strokeDasharray="6,4"/>
        <line x1="200" y1="370" x2="200" y2="470" stroke="#888" strokeWidth="1.3" strokeDasharray="6,4"/>
        <text x="150" y="485" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Y</text>
        <text x="200" y="485" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Y1</text>

        {/* Green arrow right (growth) */}
        <line x1="156" y1="494" x2="196" y2="494" stroke="#1a8a1a" strokeWidth="3" markerEnd="url(#kyGrn)"/>

        {/* ── RIGHT PANEL: FULL CAPACITY ── */}
        <line x1="430" y1="470" x2="430" y2="56" stroke="#111" strokeWidth="2" markerEnd="url(#kyU)"/>
        <line x1="430" y1="470" x2="800" y2="470" stroke="#111" strokeWidth="2" markerEnd="url(#kyR)"/>
        <text x="414" y="82" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Price</text>
        <text x="414" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Level</text>
        <text x="778" y="485" fontSize="12" fontWeight="bold" fill="#111">Real Output</text>

        {/* LRAS vertical (red) */}
        <line x1="640" y1="470" x2="640" y2="78" stroke="#cc2222" strokeWidth="2.8"/>
        <text x="644" y="86" fontSize="13" fontWeight="bold" fill="#cc2222">LRAS</text>

        {/* AD (original, blue) */}
        <line x1="436" y1="200" x2="756" y2="440" stroke="#2255cc" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="740" y="448" fontSize="13" fontWeight="bold" fill="#2255cc">AD</text>

        {/* AD1 (shifted right, blue) */}
        <line x1="472" y1="200" x2="790" y2="440" stroke="#2255cc" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="776" y="438" fontSize="13" fontWeight="bold" fill="#2255cc">AD1</text>

        {/* Shift arrows (dark grey, diagonal) */}
        <line x1="690" y1="380" x2="718" y2="360" stroke="#555" strokeWidth="2" markerEnd="url(#kyGry)"/>
        <line x1="620" y1="440" x2="648" y2="420" stroke="#555" strokeWidth="2" markerEnd="url(#kyGry)"/>

        {/* Price P and P1 */}
        <line x1="430" y1="370" x2="640" y2="370" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <line x1="430" y1="300" x2="640" y2="300" stroke="#888" strokeWidth="1.4" strokeDasharray="7,5"/>
        <text x="424" y="374" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">P</text>
        <text x="424" y="304" textAnchor="end" fontSize="13" fontWeight="bold" fill="#111">P1</text>

        {/* Equilibrium dots */}
        <circle cx="640" cy="370" r="7" fill="#cc2222"/>
        <circle cx="640" cy="300" r="7" fill="#cc2222"/>

        {/* YFE on x-axis */}
        <text x="640" y="485" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">YFE</text>

        {/* Green upward arrow (inflation) */}
        <line x1="420" y1="360" x2="420" y2="310" stroke="#1a8a1a" strokeWidth="3" markerEnd="url(#kyGrnU)"/>
      </svg>
    </div>
  );
}