export default function EconShortRunShutdown() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'640px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 640 520" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="sdR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="sdU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
          <marker id="sdRedArr" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#cc2222"/></marker>
        </defs>
        <rect width="640" height="520" fill="#fff"/>
        <text x="320" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#111">Short-Run Shutdown Point (P = min AVC)</text>
        <text x="320" y="44" textAnchor="middle" fontSize="11" fill="#555">Firm shuts down when P falls below minimum AVC — loss exceeds fixed costs</text>
        <line x1="80" y1="440" x2="80" y2="42" stroke="#111" strokeWidth="2.2" markerEnd="url(#sdU)"/>
        <line x1="80" y1="440" x2="562" y2="440" stroke="#111" strokeWidth="2.2" markerEnd="url(#sdR)"/>
        <text x="74" y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Costs (£)</text>
        <text x="310" y="470" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">Output (Q)</text>
        <polyline points="105.3,139.9 110.3,184.4 115.2,216.1 120.2,239.7 125.2,257.9 130.2,272.3 135.1,284.0 140.1,293.5 145.1,301.5 150.1,308.2 155.0,313.9 160.0,318.7 165.0,322.9 170.0,326.6 174.9,329.7 179.9,332.4 184.9,334.8 189.9,336.9 194.8,338.8 199.8,340.4 204.8,341.8 209.7,343.0 214.7,344.1 219.7,345.0 224.7,345.8 229.6,346.5 234.6,347.0 239.6,347.5 244.6,347.9 249.5,348.2 254.5,348.5 259.5,348.7 264.5,348.8 269.4,348.9 274.4,348.9 279.4,348.9 284.4,348.8 289.3,348.7 294.3,348.5 299.3,348.4 304.3,348.1 309.2,347.9 314.2,347.6 319.2,347.3 324.1,347.0 329.1,346.6 334.1,346.3 339.1,345.9 344.0,345.4 349.0,345.0 354.0,344.6 359.0,344.1 363.9,343.6 368.9,343.1 373.9,342.6 378.9,342.1 383.8,341.5 388.8,341.0 393.8,340.4 398.8,339.8 403.7,339.2 408.7,338.6 413.7,338.0 418.6,337.4 423.6,336.8 428.6,336.1 433.6,335.5 438.5,334.9 443.5,334.2 448.5,333.5 453.5,332.9 458.4,332.2 463.4,331.5 468.4,330.8 473.4,330.1 478.3,329.4 483.3,328.7 488.3,328.0 493.3,327.3 498.2,326.5 503.2,325.8" fill="none" stroke="#2255cc" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="509.2" y="333.8" fontSize="13" fontWeight="bold" fill="#2255cc">AVC</text>
        <polyline points="116.6,75.8 121.5,115.3 126.5,146.1 131.5,170.8 136.4,191.1 141.4,207.9 146.3,222.0 151.3,234.1 156.2,244.4 161.2,253.4 166.2,261.3 171.1,268.2 176.1,274.3 181.0,279.7 186.0,284.5 190.9,288.8 195.9,292.6 200.9,296.1 205.8,299.2 210.8,302.0 215.7,304.5 220.7,306.8 225.6,308.9 230.6,310.8 235.5,312.5 240.5,314.0 245.5,315.4 250.4,316.7 255.4,317.8 260.3,318.8 265.3,319.7 270.2,320.6 275.2,321.3 280.2,321.9 285.1,322.5 290.1,323.0 295.0,323.5 300.0,323.8 304.9,324.1 309.9,324.4 314.9,324.6 319.8,324.8 324.8,324.9 329.7,325.0 334.7,325.0 339.6,325.1 344.6,325.0 349.5,325.0 354.5,324.9 359.5,324.8 364.4,324.6 369.4,324.4 374.3,324.2 379.3,324.0 384.2,323.8 389.2,323.5 394.2,323.2 399.1,322.9 404.1,322.6 409.0,322.2 414.0,321.8 418.9,321.5 423.9,321.1 428.9,320.7 433.8,320.2 438.8,319.8 443.7,319.4 448.7,318.9 453.6,318.4 458.6,317.9 463.5,317.4 468.5,316.9 473.5,316.4 478.4,315.9 483.4,315.3 488.3,314.8 493.3,314.2 498.2,313.7 503.2,313.1" fill="none" stroke="#1a944a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="509.2" y="307.1" fontSize="13" fontWeight="bold" fill="#1a944a">ATC</text>
        <polyline points="116.8,263.9 120.7,270.7 124.5,277.2 128.4,283.5 132.2,289.5 136.1,295.3 139.9,300.8 143.8,306.2 147.6,311.2 151.5,316.1 155.3,320.7 159.2,325.0 163.0,329.1 166.9,333.0 170.7,336.7 174.6,340.0 178.4,343.2 182.3,346.1 186.1,348.8 190.0,351.2 193.8,353.4 197.7,355.4 201.6,357.1 205.4,358.6 209.3,359.8 213.1,360.8 217.0,361.6 220.8,362.1 224.7,362.4 228.5,362.4 232.4,362.2 236.2,361.8 240.1,361.1 243.9,360.2 247.8,359.0 251.6,357.6 255.5,355.9 259.3,354.1 263.2,351.9 267.0,349.6 270.9,347.0 274.8,344.1 278.6,341.1 282.5,337.7 286.3,334.2 290.2,330.4 294.0,326.3 297.9,322.1 301.7,317.5 305.6,312.8 309.4,307.8 313.3,302.5 317.1,297.1 321.0,291.3 324.8,285.4 328.7,279.2 332.5,272.7 336.4,266.1 340.2,259.1 344.1,252.0 347.9,244.6 351.8,236.9 355.7,229.1 359.5,221.0 363.4,212.6 367.2,204.0 371.1,195.2 374.9,186.1 378.8,176.8 382.6,167.2 386.5,157.4 390.3,147.4 394.2,137.1 398.0,126.6 401.9,115.8 405.7,104.8 409.6,93.6 413.4,82.1 417.3,70.4 421.1,58.4 425.0,46.2" fill="none" stroke="#cc2222" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="431.0" y="36.2" fontSize="13" fontWeight="bold" fill="#cc2222">MC</text>
        <line x1="80" y1="348.9" x2="343.0" y2="348.9" stroke="#2255cc" strokeWidth="1.8" strokeDasharray="7,5"/>
        <circle cx="274.0" cy="348.9" r="10" fill="#cc2222" stroke="#fff" strokeWidth="2"/>
        <line x1="274.0" y1="348.9" x2="274.0" y2="440" stroke="#cc2222" strokeWidth="1.8" strokeDasharray="7,5"/>
        <text x="70" y="352.9" textAnchor="end" fontSize="12" fontWeight="bold" fill="#cc2222">P = min AVC</text>
        <text x="274.0" y="458" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#cc2222">Qsd</text>
        <line x1="329.0" y1="348.9" x2="288.0" y2="348.9" stroke="#cc2222" strokeWidth="1.5" markerEnd="url(#sdRedArr)"/>
        <text x="334.0" y="338.9" fontSize="12" fontWeight="bold" fill="#cc2222">SHUT-DOWN POINT</text>
        <text x="334.0" y="352.9" fontSize="10" fill="#555">MC = AVC at its minimum</text>
        <line x1="80" y1="325.1" x2="407.1" y2="325.1" stroke="#1a944a" strokeWidth="1.5" strokeDasharray="6,4"/>
        <text x="70" y="329.1" textAnchor="end" fontSize="11" fontWeight="bold" fill="#1a944a">P = min ATC</text>
        <text x="388.1" y="317.1" fontSize="10" fontStyle="italic" fill="#1a944a">Break-even price</text>
        <rect x="80" y="478" width="482" height="42" rx="5" fill="#fff0f0" stroke="#fca5a5" strokeWidth="1.2"/>
        <text x="92" y="496" fontSize="11" fontWeight="bold" fill="#cc2222">If P &lt; min AVC:</text>
        <text x="92" y="512" fontSize="11" fill="#555">Every unit sold increases losses beyond fixed costs → rational firm shuts down in the short run.</text>
      </svg>
    </div>
  );
}