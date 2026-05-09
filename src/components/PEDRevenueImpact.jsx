export default function PEDRevenueImpact() {
  const NAVY='#0d1b2e', BLUE='#4a90e8', DARKRED='#c22040', RED='#e84040';
  const TEAL='#20c0b0', GREEN='#2ecc71', AMBER='#f5c518', ORANGE='#e87c18';
  const WHITE='#ffffff', AX='#c8d6e8', DASH='7,5';
  return (
    <div style={{background:NAVY,borderRadius:'10px',padding:'4px',maxWidth:'100%',fontFamily:"'Segoe UI',Arial,sans-serif",border:'1px solid rgba(255,255,255,0.10)'}}>
      <svg viewBox="0 0 720 1160" width="100%" style={{display:"block"}}>
        <defs>
          <marker id="aR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill={AX}/></marker>
          <marker id="aU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill={AX}/></marker>
          <marker id="amU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill={AMBER}/></marker>
          <marker id="amD" markerWidth="7" markerHeight="9" refX="3.5" refY="8" orient="auto-start-reverse"><polygon points="0 9,3.5 0,7 9" fill={AMBER}/></marker>
          <marker id="wA" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill={WHITE}/></marker>
        </defs>
        <rect width="720" height="1160" fill={NAVY}/>
        <rect x="0" y="0" width="720" height="36" rx="6" fill="rgba(74,144,232,0.18)"/>
        <text x="360" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill={BLUE}>Diagram 1 · Profit-Maximising Monopolist &amp; PED Regions</text>
        <text x="360" y="54" textAnchor="middle" fontSize="13" fill={AX}>The profit maximising monopolist produces in the elastic range of the demand (AR) curve</text>
        <polygon points="76,253.51428571428568 298.3111111111111,253.51428571428568 298.3111111111111,396.5333797909408 76,396.5333797909408" fill="rgba(232,124,24,0.60)"/>
        <line x1="76" y1="253.5" x2="298.3" y2="253.5" stroke="rgba(200,220,200,0.38)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1="298.3" y1="253.5" x2="298.3" y2="490" stroke="rgba(200,220,200,0.38)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1="428.4" y1="317.3" x2="428.4" y2="490" stroke="rgba(200,220,200,0.25)" strokeWidth="1.2" strokeDasharray={DASH}/>
        <polyline points="95.5,113.4 99.3,167.3 103.1,206.0 107.0,235.0 110.8,257.6 114.6,275.7 118.4,290.4 122.2,302.7 126.0,313.0 129.8,321.8 133.7,329.4 137.5,336.0 141.3,341.8 145.1,346.9 148.9,351.4 152.7,355.5 156.5,359.1 160.4,362.4 164.2,365.3 168.0,368.0 171.8,370.4 175.6,372.6 179.4,374.7 183.2,376.5 187.0,378.2 190.9,379.8 194.7,381.2 198.5,382.5 202.3,383.8 206.1,384.9 209.9,385.9 213.7,386.9 217.6,387.8 221.4,388.6 225.2,389.4 229.0,390.1 232.8,390.8 236.6,391.4 240.4,391.9 244.3,392.5 248.1,392.9 251.9,393.4 255.7,393.8 259.5,394.2 263.3,394.5 267.1,394.8 270.9,395.1 274.8,395.4 278.6,395.6 282.4,395.8 286.2,396.0 290.0,396.2 293.8,396.4 297.6,396.5 301.5,396.6 305.3,396.7 309.1,396.8 312.9,396.9 316.7,397.0 320.5,397.0 324.3,397.0 328.2,397.1 332.0,397.1 335.8,397.1 339.6,397.1 343.4,397.0 347.2,397.0 351.0,397.0 354.8,396.9 358.7,396.8 362.5,396.8 366.3,396.7 370.1,396.6 373.9,396.5 377.7,396.4 381.5,396.3 385.4,396.2 389.2,396.1 393.0,396.0 396.8,395.8 400.6,395.7 404.4,395.6 408.2,395.4 412.1,395.3 415.9,395.1 419.7,394.9 423.5,394.8 427.3,394.6 431.1,394.4 434.9,394.2 438.7,394.1 442.6,393.9 446.4,393.7 450.2,393.5 454.0,393.3 457.8,393.1 461.6,392.9 465.4,392.7 469.3,392.5 473.1,392.2 476.9,392.0 480.7,391.8 484.5,391.6 488.3,391.3 492.1,391.1 496.0,390.9 499.8,390.7 503.6,390.4 507.4,390.2 511.2,389.9 515.0,389.7 518.8,389.4 522.6,389.2 526.5,388.9 530.3,388.7 534.1,388.4 537.9,388.2 541.7,387.9 545.5,387.7 549.3,387.4 553.2,387.1" fill="none" stroke={TEAL} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="542.9" y="393.2" fontSize="13" fontWeight="bold" fill={TEAL}>ATC</text>
        <polyline points="86.8,481.3 90.3,480.8 93.7,480.3 97.1,479.8 100.6,479.2 104.0,478.5 107.4,477.8 110.9,477.0 114.3,476.2 117.8,475.4 121.2,474.5 124.6,473.5 128.1,472.6 131.5,471.6 134.9,470.5 138.4,469.4 141.8,468.3 145.2,467.1 148.7,465.9 152.1,464.7 155.5,463.4 159.0,462.1 162.4,460.8 165.8,459.4 169.3,458.0 172.7,456.6 176.1,455.1 179.6,453.6 183.0,452.1 186.4,450.5 189.9,448.9 193.3,447.3 196.7,445.7 200.2,444.0 203.6,442.3 207.0,440.6 210.5,438.8 213.9,437.1 217.3,435.3 220.8,433.4 224.2,431.6 227.6,429.7 231.1,427.8 234.5,425.8 237.9,423.9 241.4,421.9 244.8,419.9 248.2,417.9 251.7,415.8 255.1,413.7 258.5,411.6 262.0,409.5 265.4,407.3 268.9,405.1 272.3,402.9 275.7,400.7 279.2,398.5 282.6,396.2 286.0,393.9 289.5,391.6 292.9,389.2 296.3,386.9 299.8,384.5 303.2,382.1 306.6,379.7 310.1,377.2 313.5,374.7 316.9,372.2 320.4,369.7 323.8,367.2 327.2,364.6 330.7,362.1 334.1,359.5 337.5,356.8 341.0,354.2 344.4,351.5 347.8,348.9 351.3,346.2 354.7,343.4 358.1,340.7 361.6,337.9 365.0,335.1 368.4,332.3 371.9,329.5 375.3,326.7 378.7,323.8 382.2,320.9 385.6,318.0 389.0,315.1 392.5,312.2 395.9,309.2 399.3,306.2 402.8,303.2 406.2,300.2 409.6,297.2 413.1,294.1 416.5,291.1 419.9,288.0 423.4,284.9 426.8,281.7 430.3,278.6 433.7,275.4 437.1,272.3 440.6,269.1 444.0,265.8 447.4,262.6 450.9,259.3 454.3,256.1 457.7,252.8 461.2,249.5 464.6,246.1 468.0,242.8 471.5,239.4 474.9,236.1 478.3,232.7 481.8,229.2 485.2,225.8 488.6,222.4 492.1,218.9 495.5,215.4 498.9,211.9" fill="none" stroke={RED} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="488.1" y="210.9" fontSize="13" fontWeight="bold" fill={RED}>MC</text>
        <line x1="76.0" y1="144.6" x2="558.6" y2="381.1" stroke={DARKRED} strokeWidth="3" strokeLinecap="round"/>
        <text x="559.2" y="378.4" fontSize="12.5" fontWeight="bold" fill={DARKRED}>Demand = AR</text>
        <line x1="76.0" y1="144.6" x2="428.4" y2="490.0" stroke={BLUE} strokeWidth="2.8" strokeLinecap="round"/>
        <text x="433.9" y="508.0" fontSize="13" fontWeight="bold" fill={BLUE}>MR</text>
        <circle cx="428.4" cy="317.3" r="9" fill={BLUE} stroke={WHITE} strokeWidth="2"/>
        <circle cx="428.4" cy="317.3" r="3.5" fill={WHITE}/>
        <text x="406.4" y="305.3" fontSize="13.5" fontWeight="bold" fill={WHITE}>A</text>
        <circle cx="428.4" cy="490" r="6" fill={NAVY} stroke={BLUE} strokeWidth="2"/>
        <circle cx="298.3" cy="253.5" r="6" fill={WHITE} stroke={ORANGE} strokeWidth="2.2"/>
        <rect x="135.6" y="158.5" width="82" height="26" rx="4" fill="rgba(232,124,24,0.82)"/>
        <text x="176.6" y="178.5" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>PED &gt; 1</text>
        <rect x="320.0" y="270.1" width="72" height="26" rx="4" fill="rgba(232,124,24,0.82)"/>
        <text x="356" y="290.1" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>PED = 1</text>
        <line x1="392.0" y1="283.1" x2="416.4" y2="319.3" stroke={WHITE} strokeWidth="1.3" markerEnd="url(#wA)"/>
        <text x="450.4" y="323.3" fontSize="13" fontWeight="bold" fill={WHITE}>PED &lt; 1</text>
        <text x="66" y="258.5" textAnchor="end" fontSize="13.5" fontWeight="bold" fill={AX}>P</text>
        <line x1="76" y1="506" x2="76" y2="104" stroke={AX} strokeWidth="2" markerEnd="url(#aU)"/>
        <line x1="76" y1="490" x2="586" y2="490" stroke={AX} strokeWidth="2" markerEnd="url(#aR)"/>
        <text x="70" y="98" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Costs /</text>
        <text x="70" y="112" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Revenue</text>
        <text x="592" y="498" fontSize="13.5" fontWeight="bold" fill={AX}>Output</text>
        <text x="60" y="510" fontSize="13" fill={AX}>O</text>
        <text x="298.3" y="510" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={AX}>Q</text>
        <text x="428.4" y="526" textAnchor="middle" fontSize="13" fontWeight="bold" fill={AX}>Qd</text>
        <line x1="24" y1="764" x2="696" y2="764" stroke="rgba(74,144,232,0.30)" strokeWidth="1.5"/>
        <rect x="0" y="548" width="720" height="36" rx="6" fill="rgba(46,204,113,0.15)"/>
        <text x="360" y="572" textAnchor="middle" fontSize="14" fontWeight="bold" fill={GREEN}>Diagram 2 · Petrol: Price Inelastic Demand &amp; Revenue Impact</text>
        <text x="360" y="602" textAnchor="middle" fontSize="13" fill={AX}>Petrol PED &lt; 1 · Few substitutes for most drivers</text>
        <text x="360" y="618" textAnchor="middle" fontSize="13" fill={AX}>A 10% price rise causes a small fall in quantity · net revenue gain</text>
        <polygon points="316.4,788.2 401.3,788.2 401.3,1038 316.4,1038" fill="rgba(232,64,64,0.55)"/>
        <polygon points="76,763.3 316.4,763.3 316.4,788.2 76,788.2" fill="rgba(46,204,113,0.58)"/>
        <line x1="76.0" y1="692.6" x2="536.9" y2="828.1" stroke={DARKRED} strokeWidth="3" strokeLinecap="round"/>
        <text x="542.9" y="833.1" fontSize="12.5" fontWeight="bold" fill={DARKRED}>Demand</text>
        <rect x="440.7" y="771.0" width="70" height="24" rx="4" fill="rgba(232,64,64,0.82)"/>
        <text x="475.7" y="789.0" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={WHITE}>PED &lt; 1</text>
        <line x1="76" y1="763.3" x2="316.4" y2="763.3" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1="76" y1="788.2" x2="401.3" y2="788.2" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1="316.4" y1="763.3" x2="316.4" y2="1038" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1="401.3" y1="788.2" x2="401.3" y2="1038" stroke="rgba(200,220,200,0.40)" strokeWidth="1.4" strokeDasharray={DASH}/>
        <line x1="54" y1="785" x2="54" y2="766" stroke={AMBER} strokeWidth="2.2" markerEnd="url(#amU)" markerStart="url(#amD)"/>
        <text x="38" y="781" textAnchor="middle" fontSize="11" fontWeight="bold" fill={AMBER}>+10%</text>
        <circle cx="401.3" cy="788.2" r="8" fill={NAVY} stroke={AMBER} strokeWidth="2.2"/>
        <circle cx="401.3" cy="788.2" r="3.5" fill={AMBER}/>
        <circle cx="316.4" cy="763.3" r="8" fill={NAVY} stroke={WHITE} strokeWidth="2.2"/>
        <circle cx="316.4" cy="763.3" r="3.5" fill={WHITE}/>
        <text x="196.2" y="769.8" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Revenue</text>
        <text x="196.2" y="787.8" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Gained</text>
        <text x="358.9" y="907.1" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Revenue</text>
        <text x="358.9" y="925.1" textAnchor="middle" fontSize="13" fontWeight="bold" fill={WHITE}>Lost</text>
        <rect x="84" y="648" width="385" height="26" rx="5" fill="rgba(46,204,113,0.18)" stroke={GREEN} strokeWidth="1.2"/>
        <text x="274" y="667" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={GREEN}>Net Effect: Total Revenue INCREASES (Gained &gt; Lost)</text>
        <text x="66" y="768.3" textAnchor="end" fontSize="13.5" fontWeight="bold" fill={WHITE}>P2</text>
        <text x="66" y="793.2" textAnchor="end" fontSize="13.5" fontWeight="bold" fill={AMBER}>P1</text>
        <text x="316.4" y="1058" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={WHITE}>Q2</text>
        <text x="401.3" y="1058" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={AMBER}>Q1</text>
        <line x1="76" y1="1054" x2="76" y2="652" stroke={AX} strokeWidth="2" markerEnd="url(#aU)"/>
        <line x1="76" y1="1038" x2="586" y2="1038" stroke={AX} strokeWidth="2" markerEnd="url(#aR)"/>
        <text x="70" y="646" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Costs /</text>
        <text x="70" y="661" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={AX}>Revenue</text>
        <text x="592" y="1046" fontSize="13.5" fontWeight="bold" fill={AX}>Output</text>
        <text x="60" y="1058" fontSize="13" fill={AX}>O</text>
        <rect x="16" y="1076" width="16" height="16" rx="3" fill="rgba(46,204,113,0.60)" stroke={GREEN} strokeWidth="1"/>
        <text x="38" y="1089" fontSize="12" fill={AX}>Revenue Gained</text>
        <rect x="172" y="1076" width="16" height="16" rx="3" fill="rgba(232,64,64,0.60)" stroke={RED} strokeWidth="1"/>
        <text x="194" y="1089" fontSize="12" fill={AX}>Revenue Lost</text>
        <circle cx="354" cy="1084" r="5" fill={AMBER}/>
        <text x="364" y="1089" fontSize="12" fill={AX}>Before (P1, Q1)</text>
        <circle cx="488" cy="1084" r="5" fill={WHITE}/>
        <text x="498" y="1089" fontSize="12" fill={AX}>After (P2, Q2)</text>
      </svg>
    </div>
  );
}