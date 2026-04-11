export default function EconMultiplierCircular() {
  const W=680, H=620;
  const BW=210, BH=52, RX=8;
  const BLUE="#1a5fb4", TEAL="#0891b2", GREEN="#1a944a", AMBER="#d97706";
  const cx=W/2;
  const boxes=[
    {x:cx-105,y:44,  c:BLUE,  t1:"Initial Injection (I)",            t2:"£1bn rail electrification (North Wales)"},
    {x:cx-105,y:148, c:TEAL,  t1:"Construction firms receive income", t2:"→ pay wages to workers"},
    {x:cx-105,y:252, c:GREEN, t1:"Workers spend fraction (MPC)",      t2:"on UK goods and services"},
    {x:cx-105,y:356, c:GREEN, t1:"Further rounds of spending",        t2:"each round × MPC (diminishing)"},
    {x:cx-105,y:460, c:AMBER, t1:"Total rise in National Income (Y)", t2:"= k × Initial Injection (k = 1/MPS)"},
  ];
  const arrows=[
    {x1:cx,y1:96, x2:cx,y2:148},
    {x1:cx,y1:200,x2:cx,y2:252},
    {x1:cx,y1:304,x2:cx,y2:356},
    {x1:cx,y1:408,x2:cx,y2:460},
  ];
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'8px',maxWidth:'680px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox={"0 0 "+W+" "+H} width="100%" style={{display:'block'}}>
        <defs>
          <marker id="mcArr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#888"/></marker>
          <marker id="mcRed" markerWidth="7" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse"><polygon points="0 0,7 3,0 6" fill="#dc2626"/></marker>
        </defs>
        <rect width={W} height={H} fill="#fff"/>
        <text x={W/2} y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#111">Multiplier Effect &amp; Circular Flow of Income</text>
        {arrows.map(function(a,i){return <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#888" strokeWidth="2.2" markerEnd="url(#mcArr)"/>;  })}
        {boxes.map(function(b,i){return (
          <g key={i}>
            <rect x={b.x} y={b.y} width={BW} height={BH} rx={RX} fill={b.c}/>
            <text x={b.x+BW/2} y={b.y+20} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">{b.t1}</text>
            <text x={b.x+BW/2} y={b.y+38} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.90)">{b.t2}</text>
          </g>
        );})}
        <rect x="468" y="240" width="178" height="130" rx="8" fill="rgba(220,38,38,0.10)" stroke="#dc2626" strokeWidth="1.5"/>
        <text x="557" y="262" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">Withdrawals</text>
        <text x="557" y="282" textAnchor="middle" fontSize="11" fill="#dc2626">Saving (S)</text>
        <text x="557" y="300" textAnchor="middle" fontSize="11" fill="#dc2626">Taxation (T)</text>
        <text x="557" y="318" textAnchor="middle" fontSize="11" fill="#dc2626">Imports (M)</text>
        <text x="557" y="340" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#dc2626">reduce size of each round</text>
        <text x="557" y="358" textAnchor="middle" fontSize="10" fontStyle="italic" fill="#dc2626">MPS = 1 − MPC</text>
        <line x1="468" y1="305" x2="445" y2="305" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,4" markerEnd="url(#mcRed)"/>
        <rect x="16" y="278" width="108" height="50" rx="6" fill="rgba(26,95,180,0.10)" stroke="#1a5fb4" strokeWidth="1.2"/>
        <text x="70" y="298" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1a5fb4">MPC fraction</text>
        <text x="70" y="312" textAnchor="middle" fontSize="10" fill="#1a5fb4">passes to next</text>
        <text x="70" y="324" textAnchor="middle" fontSize="10" fill="#1a5fb4">spending round</text>
        <line x1="124" y1="303" x2="cx-105" y2="303" stroke="#1a5fb4" strokeWidth="1.3" strokeDasharray="5,4"/>
        <rect x="50" y="530" width="580" height="72" rx="6" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="62" y="548" fontSize="11" fontWeight="bold" fill="#111">Example: If MPC = 0.8, MPS = 0.2 → Multiplier k = 1/0.2 = 5</text>
        <text x="62" y="564" fontSize="11" fill="#333">£1bn injection → £5bn total rise in National Income. Higher MPC = larger multiplier.</text>
        <text x="62" y="580" fontSize="11" fill="#555">Withdrawals (S+T+M) reduce each successive round — the more open the economy, the</text>
        <text x="62" y="596" fontSize="11" fill="#555">smaller the multiplier, as income leaks abroad through imports.</text>
      </svg>
    </div>
  );
}