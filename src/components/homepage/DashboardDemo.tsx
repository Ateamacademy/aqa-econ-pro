import { motion, useInView, useMotionValue, useTransform, animate, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { Flame, Trophy, TrendingUp, Target, Sparkles, Zap, CheckCircle2 } from "lucide-react";

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

/* ── Animated number counter ── */
function Counter({ to, duration = 1.6, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, to, { duration, ease });
    return () => ctrl.stop();
  }, [inView, to, duration, mv]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ── Animated readiness ring ── */
function ReadinessRing({ value }: { value: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-50px" });
  const C = 2 * Math.PI * 36;

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    node.style.strokeDasharray = `${C}`;
    node.style.strokeDashoffset = `${C}`;
    const ctrl = animate(C, C - (value / 100) * C, {
      duration: 1.8,
      ease,
      onUpdate: (v) => {
        if (node) node.style.strokeDashoffset = `${v}`;
      },
    });
    return () => ctrl.stop();
  }, [inView, value, C]);

  return (
    <div ref={wrapRef} className="relative w-28 h-28 shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--magenta-pop))" />
            <stop offset="50%" stopColor="hsl(var(--violet-pop))" />
            <stop offset="100%" stopColor="hsl(var(--cyan-pop))" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="36" fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
        <circle
          ref={ref}
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 10px hsl(var(--violet-pop) / 0.6))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold font-mono text-foreground leading-none">
          <Counter to={value} suffix="%" />
        </span>
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">Ready</span>
      </div>
    </div>
  );
}

/* ── Animated bar (heatmap cell) ── */
function HeatCell({ value, label, delay, seed }: { value: number; label: string; delay: number; seed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const shimmer = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(seed * 9301 + n * 49297) * 233280;
      return x - Math.floor(x);
    };
    return {
      duration: 2.6 + rand(1) * 2.4,
      delay: rand(2) * 3,
    };
  }, [seed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease }}
      style={{
        background: `linear-gradient(135deg, hsl(var(--violet-pop) / ${value / 100 * 0.5 + 0.08}), hsl(var(--magenta-pop) / ${value / 100 * 0.4 + 0.05}))`,
        border: "1px solid hsl(var(--border))",
      }}
      className="relative h-12 rounded-lg flex flex-col items-center justify-center text-[9px] font-mono font-bold overflow-hidden group cursor-default will-change-[filter]"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={inView ? {
          opacity: [0, 0.9, 0],
          boxShadow: [
            "0 0 0px hsl(var(--magenta-pop) / 0)",
            "0 0 18px hsl(var(--magenta-pop) / 0.7), inset 0 0 14px hsl(var(--violet-pop) / 0.45)",
            "0 0 0px hsl(var(--magenta-pop) / 0)",
          ],
        } : {}}
        transition={{
          duration: shimmer.duration,
          delay: shimmer.delay,
          repeat: Infinity,
          repeatDelay: 1.5 + shimmer.delay,
          ease: "easeInOut",
        }}
      />
      <span className="text-foreground/90 font-bold">{value}%</span>
      <span className="text-[8px] text-muted-foreground/80 truncate max-w-full px-1">{label}</span>
    </motion.div>
  );
}

/* ── Animated bar chart ── */
function GrowthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const data = [
    { v: 42, g: "E" },
    { v: 50, g: "D" },
    { v: 58, g: "C" },
    { v: 66, g: "B" },
    { v: 74, g: "A" },
    { v: 86, g: "A*" },
  ];

  const pts = data.map((d, i) => ({
    x: (i + 0.5) * (100 / data.length),
    y: 100 - d.v,
  }));
  const path = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cx = prev.x + (p.x - prev.x) * 0.5;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");
  const last = pts[pts.length - 1];

  return (
    <div ref={ref} className="h-20 flex items-end gap-1.5 relative">
      {data.map((d, i) => (
        <motion.div
          key={i}
          className="flex-1 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 + i * 0.08 }}
        >
          <motion.div
            className="w-full rounded-md relative overflow-hidden"
            style={{
              background:
                i === data.length - 1
                  ? "linear-gradient(180deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)))"
                  : "linear-gradient(180deg, hsl(var(--violet-pop) / 0.4), hsl(var(--primary) / 0.2))",
              boxShadow: i === data.length - 1 ? "0 0 14px hsl(var(--magenta-pop) / 0.6)" : "none",
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${d.v}%` } : {}}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease }}
          />
          <span className="text-[9px] font-mono font-bold text-muted-foreground">{d.g}</span>
        </motion.div>
      ))}

      {/* Trajectory curve overlay */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-[calc(100%-1.25rem)] w-full pointer-events-none overflow-visible"
      >
        <defs>
          <linearGradient id="trajGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--cyan-pop))" stopOpacity="0.6" />
            <stop offset="60%" stopColor="hsl(var(--violet-pop))" />
            <stop offset="100%" stopColor="hsl(var(--magenta-pop))" />
          </linearGradient>
          <linearGradient id="trajFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--magenta-pop) / 0.22)" />
            <stop offset="100%" stopColor="hsl(var(--magenta-pop) / 0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${path} L ${last.x} 100 L ${pts[0].x} 100 Z`}
          fill="url(#trajFill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#trajGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--magenta-pop) / 0.6))" }}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, delay: 0.4, ease }}
        />
        <motion.circle
          cx={last.x}
          cy={last.y}
          r="2.4"
          fill="hsl(var(--magenta-pop))"
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--magenta-pop)))" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: [0, 1.5, 1], opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.9, ease }}
        />
      </svg>
    </div>
  );
}

/* ── Streak flame ── */
function StreakBadge() {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="h-11 w-11 rounded-xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
          boxShadow: "0 0 18px hsl(var(--amber-pop) / 0.5)",
        }}
      >
        <Flame className="h-6 w-6 text-white" />
      </motion.div>
      <div>
        <p className="text-xl font-extrabold font-mono text-foreground leading-none">
          <Counter to={27} /> <span className="text-xs text-muted-foreground font-sans font-medium">days</span>
        </p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Study streak</p>
      </div>
    </div>
  );
}

/* ── Achievement unlock toast (cycles) ── */
function AchievementTicker() {
  const items = [
    { icon: Trophy, text: "Unlocked: Diagram Pro", color: "var(--amber-pop)" },
    { icon: CheckCircle2, text: "Paper 2 marked: 22/25", color: "var(--green-pop)" },
    { icon: Zap, text: "Topic mastered: Elasticity", color: "var(--cyan-pop)" },
    { icon: Sparkles, text: "Predicted grade: A → A*", color: "var(--magenta-pop)" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 2400);
    return () => clearInterval(t);
  }, []);
  const Item = items[idx];
  const Icon = Item.icon;
  return (
    <div className="relative h-10 overflow-hidden rounded-xl border border-border bg-background/60 px-3">
      <motion.div
        key={idx}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.45, ease }}
        className="absolute inset-0 flex items-center gap-2.5 px-3"
      >
        <div
          className="h-6 w-6 rounded-md flex items-center justify-center shrink-0"
          style={{ background: `hsl(${Item.color} / 0.18)` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: `hsl(${Item.color})` }} />
        </div>
        <span className="text-xs font-medium text-foreground truncate">{Item.text}</span>
      </motion.div>
    </div>
  );
}

export default function DashboardDemo() {
  const topics = [
    { v: 92, l: "Elasticity" },
    { v: 78, l: "Mkt Fail" },
    { v: 65, l: "Macro" },
    { v: 88, l: "Fiscal" },
    { v: 54, l: "Trade" },
    { v: 71, l: "Labour" },
    { v: 83, l: "Costs" },
    { v: 60, l: "Mon Pol" },
  ];

  return (
    <div className="relative">
      {/* Glow blobs (hero-style) */}
      <div
        className="absolute -top-10 -right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "hsl(var(--violet-pop) / 0.18)", filter: "blur(80px)" }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "hsl(var(--cyan-pop) / 0.12)", filter: "blur(80px)" }}
      />

      {/* Dashboard frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease }}
        className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-5 lg:p-6 shadow-2xl"
        style={{ boxShadow: "0 25px 80px -20px hsl(var(--violet-pop) / 0.25)" }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
            econrev.co/dashboard
          </span>
          <div className="h-1.5 w-12 rounded-full bg-border" />
        </div>

        {/* Top row: ring + streak */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-2xl border border-border bg-background/40 p-4 flex items-center gap-3">
            <ReadinessRing value={86} />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Status</p>
              <p
                className="text-sm font-extrabold bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)))",
                }}
              >
                Peak Mastery
              </p>
              <p className="text-[10px] text-success font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> +12 this week
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/40 p-4 flex flex-col justify-between">
            <StreakBadge />
          </div>
        </div>

        {/* Daily goal progress bar */}
        <div className="rounded-2xl border border-border bg-background/40 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Today's Goal
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-foreground">
              <Counter to={4} />/5 sessions
            </span>
          </div>
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease, delay: 0.3 }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--cyan-pop)))",
                boxShadow: "0 0 12px hsl(var(--violet-pop) / 0.6)",
              }}
            />
          </div>
        </div>

        {/* Topic mastery heatmap */}
        <div className="rounded-2xl border border-border bg-background/40 p-4 mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Topic Mastery
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {topics.map((t, i) => (
              <HeatCell key={i} value={t.v} label={t.l} delay={0.05 * i} seed={i + 1} />
            ))}
          </div>
        </div>

        {/* Grade trajectory */}
        <div className="rounded-2xl border border-border bg-background/40 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Grade Trajectory
            </p>
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "hsl(var(--magenta-pop) / 0.15)",
                color: "hsl(var(--magenta-pop))",
              }}
            >
              Predicted: A*
            </span>
          </div>
          <GrowthChart />
        </div>

        {/* Achievement ticker */}
        <AchievementTicker />
      </motion.div>

      {/* Floating reward badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8, ease }}
        className="absolute -top-4 -right-2 lg:-right-6 rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl border border-border"
        style={{
          background: "linear-gradient(135deg, hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
          boxShadow: "0 10px 30px -5px hsl(var(--magenta-pop) / 0.5)",
        }}
      >
        <Trophy className="h-4 w-4 text-white" />
        <div className="text-white">
          <p className="text-[9px] uppercase tracking-wider opacity-90 leading-none">Level up</p>
          <p className="text-xs font-extrabold leading-none mt-0.5">Top 5% this week</p>
        </div>
      </motion.div>
    </div>
  );
}
