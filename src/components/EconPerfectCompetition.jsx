export default function EconPerfectCompetition() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'720px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 720 540" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="pcR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="pcU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="720" height="540" fill="#fff"/>
        <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Perfect Competition · Short Run &amp; Long Run</text>
        <text x="175" y="56" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Short Run (Supernormal Profit)</text>
        <text x="540" y="56" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#555">Long Run (Normal Profit)</text>
        <line x1="355" y1="70" x2="355" y2="510" stroke="#ddd" strokeWidth="1.5"/>
        {/* SR PANEL */}
        <line x1="40" y1="480" x2="40" y2="78" stroke="#111" strokeWidth="2" markerEnd="url(#pcU)"/>
        <line x1="40" y1="480" x2="330" y2="480" stroke="#111" strokeWidth="2" markerEnd="url(#pcR)"/>
        <text x="30" y="76" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">P</text>
        <text x="318" y="496" fontSize="11" fontWeight="bold" fill="#111">Q</text>
        <path d="M 55 180 Q 140 480 250 350 Q 290 300 310 260" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/>
        <text x="316" y="254" fontSize="12" fontWeight="bold" fill="#111">MC</text>
        <path d="M 55 320 Q 130 430 210 370 Q 270 330 310 310" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/>
        <text x="316" y="314" fontSize="12" fontWeight="bold" fill="#111">ATC</text>
        <line x1="40" y1="240" x2="320" y2="240" stroke="#2255cc" strokeWidth="2.2"/>
        <text x="322" y="244" fontSize="12" fontWeight="bold" fill="#2255cc">P=AR=MR</text>
        <line x1="40" y1="310" x2="320" y2="310" stroke="#888" strokeWidth="1.4" strokeDasharray="6,4"/>
        <polygon points="40,240 200,240 200,310 40,310" fill="rgba(255,200,50,0.40)"/>
        <text x="118" y="280" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">Supernormal</text>
        <text x="118" y="294" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">profit</text>
        <line x1="200" y1="240" x2="200" y2="480" stroke="#888" strokeWidth="1.3" strokeDasharray="5,4"/>
        <line x1="40" y1="240" x2="200" y2="240" stroke="#888" strokeWidth="1.3" strokeDasharray="5,4"/>
        <text x="38" y="244" textAnchor="end" fontSize="12" fontWeight="bold" fill="#2255cc">P1</text>
        <text x="38" y="314" textAnchor="end" fontSize="12" fontWeight="bold" fill="#888">C1</text>
        <text x="200" y="496" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#888">Q1</text>
        {/* LR PANEL */}
        <line x1="400" y1="480" x2="400" y2="78" stroke="#111" strokeWidth="2" markerEnd="url(#pcU)"/>
        <line x1="400" y1="480" x2="692" y2="480" stroke="#111" strokeWidth="2" markerEnd="url(#pcR)"/>
        <text x="390" y="76" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">P</text>
        <text x="680" y="496" fontSize="11" fontWeight="bold" fill="#111">Q</text>
        <path d="M 415 180 Q 500 480 610 350 Q 650 300 672 260" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/>
        <text x="676" y="254" fontSize="12" fontWeight="bold" fill="#111">MC</text>
        <path d="M 415 320 Q 490 430 570 370 Q 630 330 672 310" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round"/>
        <text x="676" y="314" fontSize="12" fontWeight="bold" fill="#111">ATC</text>
        <line x1="400" y1="340" x2="655" y2="340" stroke="#1a944a" strokeWidth="2.2"/>
        <text x="657" y="344" fontSize="12" fontWeight="bold" fill="#1a944a">P=AR=MR</text>
        <line x1="555" y1="340" x2="555" y2="480" stroke="#888" strokeWidth="1.3" strokeDasharray="5,4"/>
        <line x1="400" y1="340" x2="555" y2="340" stroke="#888" strokeWidth="1.3" strokeDasharray="5,4"/>
        <circle cx="555" cy="340" r="6" fill="#1a944a"/>
        <text x="562" y="334" fontSize="12" fontWeight="bold" fill="#111">LR eq.</text>
        <text x="396" y="344" textAnchor="end" fontSize="12" fontWeight="bold" fill="#1a944a">P=min ATC</text>
        <text x="555" y="496" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#888">Q*</text>
        <rect x="400" y="492" width="290" height="36" rx="5" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1"/>
        <text x="410" y="508" fontSize="10" fontWeight="bold" fill="#111">Long run:</text>
        <text x="410" y="522" fontSize="10" fill="#555" textLength="272" lengthAdjust="spacingAndGlyphs">Supernormal profit → entry → P falls → P = min ATC (normal profit)</text>
      </svg>
    </div>
  );
}