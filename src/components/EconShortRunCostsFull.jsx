export default function EconShortRunCostsFull() {
  return (
    <div style={{background:'#fff',borderRadius:'8px',padding:'6px',maxWidth:'960px',margin:'0 auto',fontFamily:"'Arial',sans-serif",border:'1px solid #ccc'}}>
      <svg viewBox="0 0 960 620" width="100%" style={{display:'block'}}>
        <defs>
          <marker id="srR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#111"/></marker>
          <marker id="srU" markerWidth="7" markerHeight="9" refX="3.5" refY="1" orient="auto"><polygon points="0 9,3.5 0,7 9" fill="#111"/></marker>
        </defs>
        <rect width="960" height="620" fill="#fff"/>

        {/* ══ BOX 1: P > ATC — y=52 to y=230 (HARDCODED) ══ */}
        <rect x="8" y="52" width="354" height="178" rx="8" fill="rgba(34,197,94,0.13)" stroke="#86efac" strokeWidth="1.5"/>
        <text x="22" y="76" fontSize="12" fontWeight="bold" fill="#15803d">P &gt; ATC</text>
        <text x="22" y="96" fontSize="11" fill="#444">Firm makes economic (supernormal) profit</text>
        <line x1="22" y1="112" x2="348" y2="112" stroke="#86efac" strokeWidth="1"/>
        <text x="22" y="130" fontSize="10" fontStyle="italic" fill="#15803d">P = minimum ATC  =  break-even price</text>
        <text x="22" y="148" fontSize="10" fontStyle="italic" fill="#444">Firm makes normal profit</text>
        <text x="22" y="164" fontSize="10" fontStyle="italic" fill="#444">(zero economic profit)</text>

        {/* ══ BOX 2: ATC > P > AVC — y=240 to y=418 (HARDCODED) ══ */}
        <rect x="8" y="240" width="354" height="178" rx="8" fill="rgba(251,191,36,0.15)" stroke="#fcd34d" strokeWidth="1.5"/>
        <text x="22" y="264" fontSize="12" fontWeight="bold" fill="#b45309">ATC &gt; P &gt; AVC</text>
        <text x="22" y="284" fontSize="11" fill="#444">Firm makes a loss but continues to produce</text>
        <line x1="22" y1="300" x2="348" y2="300" stroke="#fcd34d" strokeWidth="1"/>
        <text x="22" y="318" fontSize="10" fontStyle="italic" fill="#b45309">P covers variable costs — loss less than</text>
        <text x="22" y="336" fontSize="10" fontStyle="italic" fill="#444">fixed costs, so output continues</text>

        {/* ══ BOX 3: P < AVC — y=428 to y=606 (HARDCODED) ══ */}
        <rect x="8" y="428" width="354" height="178" rx="8" fill="rgba(220,38,38,0.11)" stroke="#fca5a5" strokeWidth="1.5"/>
        <text x="22" y="452" fontSize="12" fontWeight="bold" fill="#dc2626">P &lt; AVC</text>
        <text x="22" y="472" fontSize="11" fill="#444">Firm makes a loss and shuts down</text>
        <line x1="22" y1="488" x2="348" y2="488" stroke="#fca5a5" strokeWidth="1"/>
        <text x="22" y="506" fontSize="10" fontStyle="italic" fill="#dc2626">P = minimum AVC  =  shut-down price</text>
        <text x="22" y="524" fontSize="10" fontStyle="italic" fill="#444">Firm is indifferent between producing</text>
        <text x="22" y="540" fontSize="10" fontStyle="italic" fill="#444">at a loss or not producing</text>

        {/* ══ AXES ══ */}
        <line x1="380" y1="525" x2="380" y2="48" stroke="#111" strokeWidth="2.2" markerEnd="url(#srU)"/>
        <line x1="380" y1="525" x2="942" y2="525" stroke="#111" strokeWidth="2.2" markerEnd="url(#srR)"/>
        <text x="390" y="32" fontSize="12" fontWeight="bold" fill="#111">price, revenue, costs</text>
        <text x="650" y="555" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111">output, Q</text>

        {/* ══ CURVES ══ */}
        <polyline points="415.5,54.0 419.6,100.1 423.8,137.4 427.9,168.1 432.1,193.8 436.2,215.7 440.4,234.4 444.5,250.6 448.7,264.8 452.8,277.3 457.0,288.3 461.1,298.2 465.3,307.1 469.4,315.0 473.6,322.2 477.7,328.7 481.9,334.7 486.0,340.1 490.2,345.0 494.3,349.6 498.4,353.8 502.6,357.6 506.7,361.2 510.9,364.5 515.0,367.5 519.2,370.4 523.3,373.0 527.5,375.4 531.6,377.7 535.8,379.8 539.9,381.8 544.1,383.6 548.2,385.3 552.4,386.9 556.5,388.4 560.7,389.8 564.8,391.0 569.0,392.3 573.1,393.4 577.3,394.4 581.4,395.4 585.6,396.3 589.7,397.2 593.9,398.0 598.0,398.7 602.2,399.4 606.3,400.0 610.5,400.6 614.6,401.1 618.8,401.6 622.9,402.1 627.1,402.5 631.2,402.9 635.4,403.2 639.5,403.6 643.7,403.8 647.8,404.1 652.0,404.3 656.1,404.5 660.3,404.7 664.4,404.8 668.6,405.0 672.7,405.1 676.9,405.2 681.0,405.2 685.2,405.3 689.3,405.3 693.5,405.3 697.6,405.3 701.8,405.2 705.9,405.2 710.0,405.1 714.2,405.0 718.3,404.9 722.5,404.8 726.6,404.7 730.8,404.6 734.9,404.4 739.1,404.3 743.2,404.1 747.4,403.9 751.5,403.7 755.7,403.5 759.8,403.3 764.0,403.1 768.1,402.8 772.3,402.6 776.4,402.3 780.6,402.1 784.7,401.8 788.9,401.5 793.0,401.2 797.2,400.9 801.3,400.6 805.5,400.3 809.6,400.0 813.8,399.7 817.9,399.3 822.1,399.0 826.2,398.7 830.4,398.3 834.5,398.0 838.7,397.6 842.8,397.2 847.0,396.9 851.1,396.5 855.3,396.1 859.4,395.7 863.6,395.3 867.7,394.9 871.9,394.5 876.0,394.1 880.2,393.7 884.3,393.3 888.5,392.9 892.6,392.4 896.8,392.0 900.9,391.6 905.1,391.1 909.2,390.7" fill="none" stroke="#2a7a3a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="917.2" y="384.7" fontSize="13" fontWeight="bold" fill="#2a7a3a">ATC</text>

        <polyline points="413.5,238.3 417.6,266.6 421.7,289.1 425.9,307.4 430.0,322.6 434.1,335.4 438.3,346.3 442.4,355.6 446.5,363.7 450.7,370.8 454.8,377.0 458.9,382.5 463.1,387.4 467.2,391.7 471.3,395.6 475.4,399.1 479.6,402.3 483.7,405.1 487.8,407.7 492.0,410.1 496.1,412.2 500.2,414.1 504.4,415.9 508.5,417.5 512.6,418.9 516.8,420.3 520.9,421.5 525.0,422.6 529.1,423.6 533.3,424.5 537.4,425.4 541.5,426.1 545.7,426.8 549.8,427.4 553.9,428.0 558.1,428.5 562.2,428.9 566.3,429.3 570.5,429.7 574.6,430.0 578.7,430.3 582.9,430.5 587.0,430.7 591.1,430.8 595.2,431.0 599.4,431.1 603.5,431.1 607.6,431.2 611.8,431.2 615.9,431.2 620.0,431.2 624.2,431.1 628.3,431.0 632.4,430.9 636.6,430.8 640.7,430.7 644.8,430.5 648.9,430.4 653.1,430.2 657.2,430.0 661.3,429.8 665.5,429.6 669.6,429.3 673.7,429.1 677.9,428.8 682.0,428.6 686.1,428.3 690.3,428.0 694.4,427.7 698.5,427.4 702.7,427.1 706.8,426.7 710.9,426.4 715.0,426.1 719.2,425.7 723.3,425.3 727.4,425.0 731.6,424.6 735.7,424.2 739.8,423.8 744.0,423.4 748.1,423.0 752.2,422.6 756.4,422.2 760.5,421.8 764.6,421.4 768.7,420.9 772.9,420.5 777.0,420.0 781.1,419.6 785.3,419.2 789.4,418.7 793.5,418.2 797.7,417.8 801.8,417.3 805.9,416.8 810.1,416.4 814.2,415.9 818.3,415.4 822.4,414.9 826.6,414.4 830.7,413.9 834.8,413.4 839.0,412.9 843.1,412.4 847.2,411.9 851.4,411.4 855.5,410.9 859.6,410.4 863.8,409.9 867.9,409.4 872.0,408.8 876.2,408.3 880.3,407.8 884.4,407.2 888.5,406.7 892.7,406.2 896.8,405.6 900.9,405.1 905.1,404.6 909.2,404.0" fill="none" stroke="#2a7a3a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="917.2" y="412.0" fontSize="13" fontWeight="bold" fill="#2a7a3a">AVC</text>

        <polyline points="423.2,322.6 426.3,327.7 429.3,332.8 432.4,337.7 435.4,342.5 438.5,347.2 441.6,351.7 444.6,356.2 447.7,360.5 450.7,364.8 453.8,368.9 456.9,372.9 459.9,376.8 463.0,380.6 466.0,384.2 469.1,387.8 472.2,391.2 475.2,394.5 478.3,397.8 481.3,400.9 484.4,403.8 487.5,406.7 490.5,409.5 493.6,412.1 496.6,414.7 499.7,417.1 502.8,419.4 505.8,421.6 508.9,423.7 511.9,425.6 515.0,427.5 518.1,429.2 521.1,430.9 524.2,432.4 527.2,433.8 530.3,435.1 533.4,436.2 536.4,437.3 539.5,438.2 542.5,439.1 545.6,439.8 548.7,440.4 551.7,440.9 554.8,441.3 557.8,441.6 560.9,441.7 564.0,441.8 567.0,441.7 570.1,441.5 573.1,441.2 576.2,440.8 579.3,440.3 582.3,439.6 585.4,438.9 588.4,438.0 591.5,437.1 594.6,436.0 597.6,434.8 600.7,433.4 603.7,432.0 606.8,430.5 609.9,428.8 612.9,427.1 616.0,425.2 619.0,423.2 622.1,421.1 625.2,418.9 628.2,416.5 631.3,414.1 634.3,411.5 637.4,408.8 640.5,406.1 643.5,403.2 646.6,400.1 649.6,397.0 652.7,393.8 655.8,390.4 658.8,387.0 661.9,383.4 664.9,379.7 668.0,375.9 671.1,372.0 674.1,367.9 677.2,363.8 680.2,359.5 683.3,355.1 686.4,350.7 689.4,346.1 692.5,341.4 695.5,336.5 698.6,331.6 701.7,326.5 704.7,321.4 707.8,316.1 710.8,310.7 713.9,305.2 717.0,299.6 720.0,293.9 723.1,288.0 726.1,282.1 729.2,276.0 732.3,269.8 735.3,263.5 738.4,257.1 741.4,250.6 744.5,243.9 747.6,237.2 750.6,230.3 753.7,223.4 756.7,216.3 759.8,209.1 762.9,201.7 765.9,194.3 769.0,186.8 772.0,179.1 775.1,171.4 778.2,163.5 781.2,155.5 784.3,147.4 787.3,139.2 790.4,130.8" fill="none" stroke="#2a7a3a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="798.4" y="120.8" fontSize="13" fontWeight="bold" fill="#2a7a3a">MC</text>

        {/* ══ PRICE GUIDES ══ */}
        <line x1="380" y1="152.9" x2="782.2" y2="152.9" stroke="#bbb" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="380" y1="405.3" x2="641.3" y2="405.3" stroke="#bbb" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="380" y1="418.2" x2="626.0" y2="418.2" stroke="#bbb" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="380" y1="431.2" x2="605.4" y2="431.2" stroke="#bbb" strokeWidth="1.3" strokeDasharray="7,5"/>
        <line x1="380" y1="452.4" x2="563.8" y2="452.4" stroke="#bbb" strokeWidth="1.3" strokeDasharray="7,5"/>

        {/* ══ Q VERTICAL GUIDES ══ */}
        <line x1="782.2" y1="152.9" x2="782.2" y2="525" stroke="#ddd" strokeWidth="1.2" strokeDasharray="6,4"/>
        <line x1="641.3" y1="405.3" x2="641.3" y2="525" stroke="#ddd" strokeWidth="1.2" strokeDasharray="6,4"/>
        <line x1="626.0" y1="418.2" x2="626.0" y2="525" stroke="#ddd" strokeWidth="1.2" strokeDasharray="6,4"/>
        <line x1="605.4" y1="431.2" x2="605.4" y2="525" stroke="#ddd" strokeWidth="1.2" strokeDasharray="6,4"/>
        <line x1="563.8" y1="452.4" x2="563.8" y2="525" stroke="#ddd" strokeWidth="1.2" strokeDasharray="6,4"/>

        {/* ══ POINTS 1–5 ON MC ══ */}
        <circle cx="782.2" cy="152.9" r="6" fill="#2a7a3a" stroke="#fff" strokeWidth="2"/>
        <text x="791.2" y="147.9" fontSize="12" fontWeight="bold" fill="#111">1</text>
        <circle cx="641.3" cy="405.3" r="6" fill="#2a7a3a" stroke="#fff" strokeWidth="2"/>
        <text x="650.3" y="400.3" fontSize="12" fontWeight="bold" fill="#111">2</text>
        <circle cx="626.0" cy="418.2" r="6" fill="#2a7a3a" stroke="#fff" strokeWidth="2"/>
        <text x="635.0" y="413.2" fontSize="12" fontWeight="bold" fill="#111">3</text>
        <circle cx="605.4" cy="431.2" r="6" fill="#2a7a3a" stroke="#fff" strokeWidth="2"/>
        <text x="614.4" y="426.2" fontSize="12" fontWeight="bold" fill="#111">4</text>
        <circle cx="563.8" cy="452.4" r="6" fill="#2a7a3a" stroke="#fff" strokeWidth="2"/>
        <text x="572.8" y="447.4" fontSize="12" fontWeight="bold" fill="#111">5</text>

        {/* ══ Y-AXIS LABELS ══ */}
        <text x="372.0" y="156.9" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P1</text>
        <text x="372.0" y="409.3" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P2</text>
        <text x="372.0" y="422.2" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P3</text>
        <text x="372.0" y="435.2" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P4</text>
        <text x="372.0" y="456.4" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111">P5</text>

        {/* ══ X-AXIS LABELS ══ */}
        <text x="563.8" y="543" textAnchor="middle" fontSize="11" fill="#111">Q5</text>
        <text x="605.4" y="543" textAnchor="middle" fontSize="11" fill="#111">Q4</text>
        <text x="626.0" y="543" textAnchor="middle" fontSize="11" fill="#111">Q3</text>
        <text x="641.3" y="543" textAnchor="middle" fontSize="11" fill="#111">Q2</text>
        <text x="782.2" y="543" textAnchor="middle" fontSize="11" fill="#111">Q1</text>

        {/* ══ BOTTOM NOTE ══ */}
        <rect x="380" y="565" width="562" height="36" rx="5" fill="#f0f4fb" stroke="#c8d4e8" strokeWidth="1.2"/>
        <text x="392" y="581" fontSize="11" fontWeight="bold" fill="#111">UK Energy context (2024):</text>
        <text x="392" y="595" fontSize="11" fill="#555">Rising energy prices shift AVC and ATC upward. Output below P=min AVC leads to shutdown.</text>
      </svg>
    </div>
  );
}