export default function EconMonetaryPolicyFlow() {
  const W=660, H=580;
  const BOX={w:170,h:48,rx:8};
  const BLUE="#1a5fb4", GREEN="#1a944a", AMBER="#d97706", RED="#dc2626", GRAY="#555";
  const boxes=[
    {x:245,y:40,  color:BLUE,  text:"Bank of England",      sub:"raises interest rate"},
    {x:245,y:140, color:BLUE,  text:"Cost of borrowing",    sub:"increases"},
    {x:50, y:240, color:GREEN, text:"Households",           sub:"reduce spending (C↓)"},
    {x:440,y:240, color:GREEN, text:"Firms",                sub:"reduce investment (I↓)"},
    {x:245,y:340, color:AMBER, text:"Aggregate Demand (AD)",sub:"shifts left"},
    {x:120,y:440, color:RED,   text:"Real GDP falls",       sub:"(output gap widens)"},
    {x:370,y:440, color:RED,   text:"Inflation falls",      sub:"(price level ↓)"},
  ];
  const arrows=[
    {x1:330,y1:88, x2:330,y2:140},
    {x1:310,y1:188,x2:200,y2:240},
    {x1:350,y1:188,x2:460,y2:240},
    {x1:200,y1:288,x2:310,y2:340},
    {x1:460,y1:288,x2:350,y2:340},
    {x1:300,y1:388,x2:205,y2:440},
    {x1:360,y1:388,x2:455,y2:440},
  ];
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'660px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox={"0 0 "+W+" "+H} width="100%" style={{display:'block'}}>
        <defs>
          <marker id="mpArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#555"/></marker>
        </defs>
        <rect width={W} height={H} fill="#fff"/>
        <text x={W/2} y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Monetary Policy Transmission Mechanism</text>
        {arrows.map(function(a,i){return (
          <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#888" strokeWidth="2" markerEnd="url(#mpArrow)"/>
        );})}
        {boxes.map(function(b,i){return (
          <g key={i}>
            <rect x={b.x} y={b.y} width={BOX.w} height={BOX.h} rx={BOX.rx} fill={b.color} stroke="none"/>
            <text x={b.x+BOX.w/2} y={b.y+18} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">{b.text}</text>
            <text x={b.x+BOX.w/2} y={b.y+34} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.88)">{b.sub}</text>
          </g>
        );})}
        <rect x="50" y="510" width="560" height="50" rx="6" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="62" y="528" fontSize="11" fontWeight="bold" fill="#111">Contractionary monetary policy:</text>
        <text x="62" y="543" fontSize="11" fill="#333">Higher interest rates → lower C and I → AD shifts left → lower inflation and output.</text>
        <text x="62" y="557" fontSize="11" fill="#333">Exchange rate also appreciates → exports fall, imports rise → net exports (X-M) fall.</text>
      </svg>
    </div>
  );
}