import { useEffect, useRef, useState } from "react";

const ESSAY = `Evaluate the view that an increase in the national minimum wage will reduce unemployment in the UK economy. (25 marks)

A national minimum wage (NMW) is a legally enforced price floor in the labour market set above the equilibrium wage. Classical theory suggests raising the NMW above W₀ creates excess supply of labour (Q_s > Q_d), increasing unemployment, particularly among low-skilled workers in retail and hospitality.

However, in monopsonistic labour markets where a single dominant employer faces an upward-sloping supply curve, a higher NMW can raise BOTH wages AND employment up to the marginal revenue product, as shown by Card & Krueger (1994).`;

type Feedback = {
  ao: string;
  label: string;
  score: string;
  pct: number;
  tone: "good" | "ok" | "warn";
  note: string;
  tip: string;
};

const FEEDBACK: Feedback[] = [
  { ao: "AO1", label: "Knowledge", score: "4/4", pct: 100, tone: "good", note: "Sharp NMW definition + price-floor mechanism.", tip: "Quote a real UK NMW figure (£11.44/hr) for credit." },
  { ao: "AO2", label: "Application", score: "5/6", pct: 83, tone: "good", note: "Strong UK context — retail & hospitality.", tip: "Add an industry stat (e.g. 1.6m affected workers)." },
  { ao: "AO3", label: "Analysis", score: "7/9", pct: 78, tone: "ok",   note: "Logical chain, but needs a labour-market diagram.", tip: "Draw W/Q axes with W₁ above W₀ → excess supply gap." },
  { ao: "AO4", label: "Evaluation", score: "5/6", pct: 83, tone: "good", note: "Excellent counterpoint via Card & Krueger.", tip: "Finish with a judgement on magnitude vs elasticity." },
];

const toneColor = (t: Feedback["tone"]) =>
  t === "good" ? "#34D399" : t === "ok" ? "#FBBF24" : "#F87171";

const HandDrawnDiagram = () => {
  // Sketchy labour-market diagram: NMW (W1) above equilibrium W0, showing excess supply gap (unemployment)
  return (
    <div
      className="my-4 inline-block w-full"
      style={{
        contain: "layout paint",
      }}
    >
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 360,
          padding: "14px 16px 10px",
          background: "rgba(255,253,240,0.96)",
          color: "#1a1a2e",
          borderRadius: 10,
          transform: "rotate(-1.2deg)",
          boxShadow:
            "0 18px 40px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.06), inset 0 0 30px rgba(255,210,120,0.12)",
          fontFamily: "'Caveat','Comic Sans MS',cursive",
        }}
      >
        <div
          className="mb-1 text-center"
          style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.3 }}
        >
          Labour Market · NMW
        </div>
        <svg
          viewBox="0 0 360 220"
          width="100%"
          height="200"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            <filter id="rough">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="1.6" />
            </filter>
          </defs>
          <g
            stroke="#1a1a2e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#rough)"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: 1200,
              animation: "imd-draw 1.8s ease-out forwards",
            }}
          >
            {/* Axes */}
            <path d="M50,30 L50,190 L330,190" />
            {/* Supply (upward) */}
            <path d="M70,180 C140,150 200,110 310,50" />
            {/* Demand (downward) */}
            <path d="M70,55 C150,95 220,140 310,180" />
            {/* W0 equilibrium dashed */}
            <path d="M50,125 L195,125" strokeDasharray="5 5" />
            <path d="M195,125 L195,190" strokeDasharray="5 5" />
            {/* W1 NMW line above */}
            <path d="M50,85 L300,85" stroke="#d23e57" strokeWidth="2.5" />
            {/* Gap arrows: Qd to Qs at W1 */}
            <path d="M132,85 L132,200" stroke="#d23e57" strokeDasharray="4 4" />
            <path d="M258,85 L258,200" stroke="#d23e57" strokeDasharray="4 4" />
            <path d="M138,205 L252,205" stroke="#d23e57" />
            <path d="M138,205 L146,200 M138,205 L146,210" stroke="#d23e57" />
            <path d="M252,205 L244,200 M252,205 L244,210" stroke="#d23e57" />
          </g>
          {/* Labels */}
          <g
            style={{
              fontFamily: "'Caveat','Comic Sans MS',cursive",
              fontSize: 15,
              fill: "#1a1a2e",
              opacity: 0,
              animation: "imd-fadein 0.6s ease 1.4s forwards",
            }}
          >
            <text x="32" y="22">W</text>
            <text x="332" y="195">Q</text>
            <text x="14" y="89" fill="#d23e57" fontWeight="700">W₁</text>
            <text x="22" y="129">W₀</text>
            <text x="300" y="48">S</text>
            <text x="300" y="185">D</text>
            <text x="120" y="225" fill="#d23e57" fontWeight="700">unemployment</text>
          </g>
        </svg>
        <div
          className="mt-1 text-center"
          style={{
            fontSize: 14,
            opacity: 0,
            animation: "imd-fadein 0.6s ease 1.6s forwards",
          }}
        >
          W₁ &gt; W₀ → Q<sub>s</sub> &gt; Q<sub>d</sub> = excess supply of labour
        </div>
      </div>
    </div>
  );
};

export const InstantMarkingDemo = () => {
  const [phase, setPhase] = useState<"typing" | "marking" | "feedback">("typing");
  const [typed, setTyped] = useState(0);
  const [revealedRows, setRevealedRows] = useState(0);
  const [showGrade, setShowGrade] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 4;
      setTyped(i);
      if (i >= ESSAY.length) {
        window.clearInterval(id);
        setTimeout(() => setPhase("marking"), 600);
      }
    }, 18);
    return () => window.clearInterval(id);
  }, [phase]);

  // Marking → feedback
  useEffect(() => {
    if (phase !== "marking") return;
    const t = setTimeout(() => setPhase("feedback"), 1400);
    return () => clearTimeout(t);
  }, [phase]);

  // Stagger AO rows
  useEffect(() => {
    if (phase !== "feedback") return;
    setRevealedRows(0);
    setShowGrade(false);
    const ids: number[] = [];
    FEEDBACK.forEach((_, i) => {
      ids.push(window.setTimeout(() => setRevealedRows(i + 1), 200 + i * 220));
    });
    ids.push(window.setTimeout(() => setShowGrade(true), 200 + FEEDBACK.length * 220 + 150));
    // Loop the demo
    ids.push(
      window.setTimeout(() => {
        setTyped(0);
        setPhase("typing");
      }, 9000)
    );
    return () => ids.forEach((i) => window.clearTimeout(i));
  }, [phase]);

  // 3D parallax on mouse move
  const onMouseMove = (e: React.MouseEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 8, y: px * 12 });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  const visibleText = ESSAY.slice(0, typed);
  const stillTyping = phase === "typing";
  const diagramAnchor = ESSAY.indexOf("However");
  const showDiagram = typed >= diagramAnchor;
  const beforeDiagram = visibleText.slice(0, Math.min(typed, diagramAnchor));
  const afterDiagram = typed > diagramAnchor ? visibleText.slice(diagramAnchor) : "";

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full overflow-hidden rounded-3xl"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% 10%, #1f1a3a 0%, transparent 60%), radial-gradient(900px 500px at 90% 90%, #1a2742 0%, transparent 55%), #0A0A14",
        perspective: "1600px",
        minHeight: 720,
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 65%)", filter: "blur(20px)", opacity: 0.55 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full"
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 65%)", filter: "blur(20px)", opacity: 0.4 }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 md:px-8 pt-5 md:pt-7">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-2.5 w-2.5 rounded-full"
            style={{ background: "#34D399", boxShadow: "0 0 12px #34D399" }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            Live
          </span>
        </div>
        <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-white/50">
          AQA · Paper 2 · Q4 · 25 marks
        </div>
      </div>

      {/* 3D stage */}
      <div
        className="relative z-10 grid grid-cols-1 gap-6 px-6 pb-8 pt-6 md:grid-cols-[1.15fr_1fr] md:px-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* PAPER */}
        <div
          className="relative"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + 6}deg) translateZ(20px)`,
            transformStyle: "preserve-3d",
            transition: "transform 200ms ease-out",
          }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border"
            style={{
              background: "linear-gradient(180deg, #15151F 0%, #11111B 100%)",
              borderColor: "#2A2A3E",
              boxShadow:
                "0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
              minHeight: 560,
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: "#2A2A3E", background: "#1B1B28" }}>
              <span className="h-3 w-3 rounded-full" style={{ background: "#FF5F57" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#FEBC2E" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#28C840" }} />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-white/50">
                response.docx
              </span>
              <span className="ml-auto font-mono text-[11px] text-white/40">
                {Math.min(visibleText.split(/\s+/).filter(Boolean).length, 999)} words
              </span>
            </div>
            {/* Body */}
            <div className="px-7 py-6 text-[15px] leading-relaxed text-white/90" style={{ minHeight: 460, whiteSpace: "pre-wrap" }}>
              {beforeDiagram}
              {showDiagram && <HandDrawnDiagram />}
              {afterDiagram}
              {stillTyping && (
                <span
                  className="ml-0.5 inline-block align-middle"
                  style={{
                    width: 2,
                    height: 18,
                    background: "#3FC9F5",
                    boxShadow: "0 0 8px #3FC9F5",
                    animation: "imd-blink 0.9s steps(2) infinite",
                  }}
                />
              )}
            </div>

            {/* Marking sweep */}
            {phase === "marking" && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.0) 38%, rgba(99,102,241,0.55) 50%, rgba(99,102,241,0.0) 62%, transparent 100%)",
                  animation: "imd-sweep 1.4s ease-in-out forwards",
                  mixBlendMode: "screen",
                }}
              />
            )}
          </div>

          {/* Status pill under paper */}
          <div className="mt-4 flex items-center justify-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest"
              style={{
                borderColor: phase === "typing" ? "#3FC9F555" : phase === "marking" ? "#FBBF2455" : "#34D39955",
                color: phase === "typing" ? "#3FC9F5" : phase === "marking" ? "#FBBF24" : "#34D399",
                background: "#0F0F1A",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: phase === "typing" ? "#3FC9F5" : phase === "marking" ? "#FBBF24" : "#34D399",
                  boxShadow: `0 0 10px ${phase === "typing" ? "#3FC9F5" : phase === "marking" ? "#FBBF24" : "#34D399"}`,
                }}
              />
              {phase === "typing" && "Student typing…"}
              {phase === "marking" && "AI examiner marking against AQA scheme"}
              {phase === "feedback" && "Marked · feedback ready"}
            </div>
          </div>
        </div>

        {/* FEEDBACK STACK */}
        <div
          className="relative"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y - 8}deg) translateZ(40px)`,
            transformStyle: "preserve-3d",
            transition: "transform 200ms ease-out",
          }}
        >
          <div
            className="rounded-2xl border p-5"
            style={{
              background: "linear-gradient(180deg, rgba(21,21,31,0.92) 0%, rgba(15,15,26,0.92) 100%)",
              borderColor: "#2A2A3E",
              boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(63,201,245,0.2)",
              backdropFilter: "blur(8px)",
              minHeight: 560,
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl text-base font-black text-[#0A0A14]"
                style={{ background: "linear-gradient(135deg, #6366F1, #3FC9F5)" }}
              >
                ✦
              </div>
              <div>
                <div className="text-base font-bold text-white">Instant Feedback</div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                  AQA mark scheme · level descriptors
                </div>
              </div>
            </div>

            {/* AO rows */}
            <div className="space-y-2.5">
              {FEEDBACK.map((row, i) => {
                const visible = revealedRows > i;
                const c = toneColor(row.tone);
                return (
                  <div
                    key={row.ao}
                    className="rounded-xl border p-3.5"
                    style={{
                      background: "#1B1B28",
                      borderColor: "#252538",
                      borderLeft: `3px solid ${c}`,
                      opacity: visible ? 1 : 0,
                      transform: visible
                        ? "translate3d(0,0,0) scale(1)"
                        : "translate3d(40px,0,-30px) scale(0.96)",
                      transition: "opacity 400ms ease, transform 500ms cubic-bezier(.2,.8,.2,1)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-sm font-extrabold" style={{ color: c, width: 42 }}>
                        {row.ao}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">{row.label}</div>
                        <div className="text-[12px] text-white/60">{row.note}</div>
                      </div>
                      <div className="font-mono text-base font-extrabold" style={{ color: c }}>
                        {row.score}
                      </div>
                    </div>
                    {/* Progress */}
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "#0F0F1A" }}>
                      <div
                        className="h-full"
                        style={{
                          width: visible ? `${row.pct}%` : "0%",
                          background: `linear-gradient(90deg, ${c}, ${c}aa)`,
                          boxShadow: `0 0 10px ${c}88`,
                          transition: "width 800ms cubic-bezier(.2,.8,.2,1) 120ms",
                        }}
                      />
                    </div>
                    {/* Examiner tip */}
                    <div
                      className="mt-2.5 flex items-start gap-2 rounded-lg px-2.5 py-2"
                      style={{ background: "rgba(255,255,255,0.025)", border: "1px dashed #2A2A3E" }}
                    >
                      <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: "#3FC9F5" }}>
                        TIP
                      </span>
                      <span className="text-[12px] leading-snug text-white/75">{row.tip}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Grade badge */}
            <div
              className="mt-4 flex items-center justify-between rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #6366F1, #3FC9F5)",
                color: "#0A0A14",
                opacity: showGrade ? 1 : 0,
                transform: showGrade ? "translateZ(60px) scale(1)" : "translateZ(0) scale(0.85)",
                transition: "opacity 400ms ease, transform 600ms cubic-bezier(.2,.8,.2,1)",
                boxShadow: "0 25px 60px -10px rgba(99,102,241,0.6)",
              }}
            >
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-70">
                  Score
                </div>
                <div className="text-3xl font-black tracking-tight">21/25</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-70">
                  Predicted grade
                </div>
                <div className="text-3xl font-black tracking-tight">A*</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes imd-blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes imd-draw { to { stroke-dashoffset: 0; } }
        @keyframes imd-fadein { to { opacity: 1; } }
        @keyframes imd-sweep {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default InstantMarkingDemo;
