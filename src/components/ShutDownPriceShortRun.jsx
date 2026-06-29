export default function ShutDownPriceShortRun() {
  return (
    <div style={{
      background: "#e8f0f8",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #b8cce4",
      width: "100%",
    }}>
      <svg width="100%" viewBox="0 0 480 330" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="sdY" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#7030a0" />
          </marker>
          <marker id="sdX" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <polygon points="0,0 7,3.5 0,7" fill="#e07b00" />
          </marker>
        </defs>

        <rect x="0" y="0" width="480" height="330" fill="#e8f0f8" />

        {/* Title box */}
        <rect x="68" y="8" width="330" height="30" rx="5"
          fill="#dce8f5" stroke="#8ab0d4" strokeWidth="1.2" />
        <text x="233" y="28" fill="#1a1a1a" fontSize="14" fontFamily="Arial"
          fontWeight="bold" textAnchor="middle">Shut Down Price in the Short Run</text>

        {/* Y axis purple */}
        <line x1="68" y1="46" x2="68" y2="294"
          stroke="#7030a0" strokeWidth="2.2" markerEnd="url(#sdY)" />
        {/* X axis orange */}
        <line x1="66" y1="290" x2="456" y2="290"
          stroke="#e07b00" strokeWidth="2.2" markerEnd="url(#sdX)" />

        <text transform="translate(18,218) rotate(-90)"
          fill="#444" fontSize="9.5" fontFamily="Arial" fontWeight="bold" textAnchor="middle">
          Cost and Price
        </text>
        <text x="432" y="308" fill="#444" fontSize="9.5" fontFamily="Arial" fontWeight="bold">
          Output
        </text>

        {/* Green dashed reference lines */}
        <line x1="68" y1="100" x2="210" y2="100"
          stroke="#5a8a1e" strokeWidth="1.8" strokeDasharray="7,5" />
        <line x1="68" y1="220" x2="210" y2="220"
          stroke="#5a8a1e" strokeWidth="1.8" strokeDasharray="7,5" />
        <line x1="210" y1="100" x2="210" y2="290"
          stroke="#5a8a1e" strokeWidth="1.8" strokeDasharray="7,5" />

        {/* AC curve */}
        <path d="M 82,122 C 130,148 200,170 290,176 C 340,179 380,184 425,196"
          fill="none" stroke="#1a56db" strokeWidth="2.6" strokeLinecap="round" />

        {/* AVC curve · min exactly at (210,220) */}
        <path d="M 82,192 C 118,214 158,222 210,220 C 252,218 285,220 348,230"
          fill="none" stroke="#1a56db" strokeWidth="2.6" strokeLinecap="round" />

        {/* MC curve · dips to ~(155,220) then rises through C1=(210,100) */}
        <path d="M 82,148 C 100,188 122,212 155,220 C 178,222 192,168 210,100 C 220,60 228,50 236,46"
          fill="none" stroke="#1a56db" strokeWidth="2.6" strokeLinecap="round" />

        {/* AR line · gentle red downward */}
        <line x1="82" y1="262" x2="425" y2="218" stroke="#c0392b" strokeWidth="2.4" />

        {/* MR line · steeper red, passes through (210,220) */}
        <line x1="82" y1="262" x2="310" y2="187" stroke="#c0392b" strokeWidth="2.4" />

        {/* Curve label boxes */}
        <rect x="237" y="38" width="30" height="19" rx="3" fill="#d8efc0" stroke="#8aba40" strokeWidth="1" />
        <text x="252" y="51" fill="#2d5a00" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">MC</text>

        <rect x="428" y="184" width="30" height="19" rx="3" fill="#d8efc0" stroke="#8aba40" strokeWidth="1" />
        <text x="443" y="197" fill="#2d5a00" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">AC</text>

        <rect x="350" y="220" width="36" height="19" rx="3" fill="#d8efc0" stroke="#8aba40" strokeWidth="1" />
        <text x="368" y="233" fill="#2d5a00" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">AVC</text>

        <rect x="260" y="210" width="30" height="19" rx="3" fill="#f5c0c0" stroke="#c0392b" strokeWidth="1" />
        <text x="275" y="223" fill="#7a0000" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">MR</text>

        <rect x="352" y="243" width="30" height="19" rx="3" fill="#f5c0c0" stroke="#c0392b" strokeWidth="1" />
        <text x="367" y="256" fill="#7a0000" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">AR</text>

        {/* Axis value labels */}
        <rect x="38" y="91" width="28" height="19" rx="3" fill="#d8efc0" stroke="#8aba40" strokeWidth="1" />
        <text x="52" y="104" fill="#2d5a00" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">C1</text>

        <rect x="38" y="211" width="28" height="19" rx="3" fill="#d8efc0" stroke="#8aba40" strokeWidth="1" />
        <text x="52" y="224" fill="#2d5a00" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">P1</text>

        <rect x="197" y="293" width="28" height="19" rx="3" fill="#d8efc0" stroke="#8aba40" strokeWidth="1" />
        <text x="211" y="306" fill="#2d5a00" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">Q1</text>

        {/* Green shutdown point dot at (210,220) */}
        <circle cx="210" cy="220" r="9" fill="#00b050" stroke="#fff" strokeWidth="2.5" />
        <circle cx="210" cy="220" r="4.5" fill="#66ff99" />
      </svg>
    </div>
  );
}
