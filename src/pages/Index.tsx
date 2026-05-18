import { Link } from "react-router-dom";
import { startCheckout } from "@/lib/startCheckout";
import GradeStepLadder from "@/components/homepage/GradeStepLadder";
import DiagnosticCalculator from "@/components/homepage/DiagnosticCalculator";
import GradeCalculator from "@/pages/GradeCalculator";
import DashboardDemo from "@/components/homepage/DashboardDemo";
import studentMaya from "@/assets/student-maya.jpg";
import studentJames from "@/assets/student-james.jpg";
import studentPriya from "@/assets/student-priya.jpg";
import studentDaniel from "@/assets/student-daniel.jpg";
import studentSophie from "@/assets/student-sophie.jpg";
import studentOmar from "@/assets/student-omar.jpg";
import InstantMarkingDemo from "@/components/InstantMarkingDemo";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FileText, Bot, BarChart3, Compass, MessageCircle, BookOpen,
  ArrowRight, ChevronDown, Check, Star, ArrowUpRight, Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── animation variants ─── */
const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/* ─── data ─── */
const features = [
  { icon: FileText, title: "Exam Board Specific Papers", desc: "Generate full exam-format papers based on the latest mark schemes. Unique every time.", to: "/predicted" },
  { icon: Bot, title: "Instant Marking & Feedback", desc: "Submit answers and get instant mark-scheme-accurate feedback with improvement tips.", to: "/grader" },
  { icon: BarChart3, title: "Progress Tracking", desc: "Visual readiness score, topic heatmaps, and grade trajectory charts updated after every session.", to: "/dashboard" },
  { icon: Compass, title: "Diagram Builder", desc: "Practice drawing and labelling economic diagrams with accuracy feedback.", to: "/diagram-practice" },
  { icon: MessageCircle, title: "24/7 Economics Tutor", desc: "Ask any economics question and get curriculum-aligned explanations instantly.", to: "/tutor" },
  { icon: BookOpen, title: "Structured Notes", desc: "Clean, concise topic notes organised by syllabus. Linked to practice questions.", to: "/notes" },
];

const steps = [
  { num: "01", title: "Choose Your Topic", desc: "Pick a syllabus area or get recommendations based on your weak spots." },
  { num: "02", title: "Generate a Paper", desc: "Get a unique, exam-format paper matched to your board and specification." },
  { num: "03", title: "Submit & Get Marked", desc: "Write your answers and receive instant, mark-scheme-accurate feedback." },
  { num: "04", title: "Track Your Progress", desc: "Watch your readiness score climb as you revise smarter, not harder." },
];

const testimonials = [
  { quote: "I went from a C to an A* in 6 weeks. The predicted papers were almost identical to the real thing.", name: "Maya", detail: "A-Level Economics, Edexcel", rating: 5, avatar: studentMaya },
  { quote: "The tutor explained diagrams better than my actual teacher. Worth every penny.", name: "James", detail: "GCSE Economics, AQA", rating: 5, avatar: studentJames },
  { quote: "I used Econ Rev every day for 3 months. My predicted grade went from a 5 to an 8.", name: "Priya", detail: "GCSE Economics, OCR", rating: 4.5, avatar: studentPriya },
  { quote: "The instant marking caught mistakes I never would have noticed. My evaluation skills doubled overnight.", name: "Daniel", detail: "A-Level Economics, AQA", rating: 5, avatar: studentDaniel },
  { quote: "Finally a revision tool that actually feels like the real exam. The diagram practice is unreal.", name: "Sophie", detail: "A-Level Economics, OCR", rating: 4.5, avatar: studentSophie },
  { quote: "Got my predicted A* confirmed by mocks. The topic heatmap told me exactly what to revise.", name: "Omar", detail: "A-Level Economics, Edexcel", rating: 5, avatar: studentOmar },
];

const freeFeatures = [
  "3 Predicted Papers / month",
  "3 Marking sessions / month",
  "Full access to notes, questions & mark schemes",
  "5 Tutor questions / month",
  "Basic readiness score & progress tracking",
  "5 diagram builds with feedback",
];
const proFeatures = [
  "Unlimited Predicted Papers",
  "Unlimited Marking",
  "Full readiness engine with mountain tracker",
  "Diagram builder with feedback",
  "Parent monitoring dashboard",
  "Performance analytics & grade trajectory",
  "24/7 Tutor unlimited",
  "Access to all future platform updates",
];

const faqItems = [
  { q: "What exam boards does Econ Rev support?", a: "We support AQA, Edexcel A, Edexcel B, OCR, Cambridge (CAIE), WJEC, and IB Economics for both GCSE and A-Level." },
  { q: "How are the predicted papers generated?", a: "We analyse past paper patterns, mark scheme structures, and syllabus weighting to generate unique, exam-format papers that reflect likely question types." },
  { q: "How accurate is the marking?", a: "Our marking engine is trained on thousands of examiner-marked scripts and follows official mark schemes. It provides band-level accuracy with detailed improvement tips." },
  { q: "Can I use Econ Rev for both GCSE and A-Level?", a: "Yes! Simply select your level and exam board. All content is tailored to your specific specification." },
  { q: "What happens after my exam window ends?", a: "Your access continues. The Exam Window Pass gives you lifetime access to all features for your current exam series." },
  { q: "Is there a version for schools or teachers?", a: "Yes, we offer school licences with teacher dashboards, class progress tracking, and bulk student accounts. Contact us for details." },
];

const marqueeItems = ["AQA", "Edexcel", "OCR", "WJEC", "Cambridge", "IB Economics", "GCSE", "A-Level"];

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const subtitleShimmerRef = useRef<HTMLSpanElement>(null);
  
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const ctaPulseRef = useRef<HTMLDivElement>(null);

  const { refreshSubscription } = useAuth();

  // Scroll to hash on mount (for links like /#pricing from other pages)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  // Handle post-checkout return: force a fresh subscription check (bypasses cache).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") !== "success") return;

    let attempts = 0;
    const tick = async () => {
      attempts += 1;
      try { await refreshSubscription(true); } catch (_) {}
      if (attempts < 4) setTimeout(tick, 3000);
    };
    tick();
    toast.success("Payment received! Activating your Pro access…");

    // Clean the URL so refreshes don't re-trigger.
    const url = new URL(window.location.href);
    url.searchParams.delete("checkout");
    window.history.replaceState({}, "", url.toString());
  }, [refreshSubscription]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Shimmer on "Economics" text
      if (shimmerRef.current) {
        gsap.to(shimmerRef.current, {
          backgroundPosition: "200% center",
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      }

      // Shimmer on subtitle "personal Economics tutor on demand: 24/7"
      if (subtitleShimmerRef.current) {
        gsap.to(subtitleShimmerRef.current, {
          backgroundPosition: "200% center",
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      }


      // Blob drift
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: 30,
          y: -20,
          duration: 60,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: -20,
          y: 30,
          duration: 45,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      // Final CTA pulse
      if (ctaPulseRef.current) {
        gsap.to(ctaPulseRef.current, {
          scale: 1.05,
          opacity: 0.6,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ═══════ GRADE CALCULATOR (above the fold) ═══════ */}
      <section id="grade-calculator" className="relative pt-24 lg:pt-28">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(79,86,255,0.10), transparent 70%)" }} />
        <div className="relative">
          <GradeCalculator />
        </div>
      </section>

      {/* ═══════ DIAGNOSTIC GRADE CALCULATOR ═══════ */}
      <section id="diagnostic" className="relative pt-16 pb-16 lg:pt-20 lg:pb-20">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(79,86,255,0.10), transparent 70%)" }} />
        <div className="max-w-[920px] mx-auto px-5 lg:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              10 mins to predict your current grade
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-4">
              What Grade Are You{" "}
              <span
                className="inline-block bg-clip-text text-transparent animate-shimmer pb-2 leading-[1.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--cyan-pop)), hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
                }}
              >
                Right Now?
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span
                className="inline-block text-5xl md:text-6xl lg:text-7xl text-amber-300 animate-pulse"
                style={{
                  fontFamily: "'Caveat','Patrick Hand','Bradley Hand',cursive",
                  transform: "rotate(-7deg)",
                  textShadow: "0 3px 18px rgba(251,191,36,0.55)",
                  letterSpacing: "0.02em",
                }}
              >
                Try it ↓
              </span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}>
            <DiagnosticCalculator />
          </motion.div>
        </div>
      </section>

      {/* ═══════ HERO FEATURE: INSTANT MARKING DEMO ═══════ */}
      <section className="relative pt-16 lg:pt-20">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-10 md:mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Live demo · no sign-up needed
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-4">
              Watch a 25-mark essay get{" "}
              <span
                className="inline-block bg-clip-text text-transparent animate-shimmer pb-2 leading-[1.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--cyan-pop)), hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
                }}
              >
                marked instantly.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
              Based on real exam-board mark schemes, examiner notes with personalised feedback.
            </p>
          </motion.div>
          <InstantMarkingDemo />
        </div>
      </section>

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative flex items-center overflow-hidden">
        {/* Blobs */}
        <div ref={blob1Ref} className="absolute top-1/4 right-0 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none" style={{ background: "rgba(79,86,255,0.12)", filter: "blur(120px)" }} />
        <div ref={blob2Ref} className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(6,182,212,0.06)", filter: "blur(100px)" }} />

        <div className="max-w-[1280px] mx-auto px-5 lg:px-6 w-full flex flex-col items-center text-center py-12 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }} className="max-w-3xl">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 glow-indigo-sm">
              <span className="text-xs">✦</span> Built for AQA · Edexcel · OCR · All Boards
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-6 text-foreground">
              The Smartest Way to{" "}
              <br className="hidden md:block" />
              Revise{" "}
              <span
                ref={shimmerRef}
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
                  backgroundSize: "200% auto",
                }}
              >
                Economics.
              </span>
            </h1>

            <p className="text-base lg:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-8">
              Predicted papers, instant marking, diagram practice &amp; expert support; like having a{" "}
              <span
                ref={subtitleShimmerRef}
                className="inline-block bg-clip-text text-transparent font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--violet-pop)), hsl(var(--cyan-pop)), hsl(var(--green-pop)), hsl(var(--violet-pop)))",
                  backgroundSize: "200% auto",
                }}
              >
                personal Economics tutor on demand: 24/7
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <Button
                asChild
                size="lg"
                className="rounded-lg px-7 h-12 text-sm font-semibold gap-2 animate-glow-pulse text-white border-0 shadow-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--primary)))",
                }}
              >
                <Link to="/predicted">
                  Generate My First Paper <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg px-7 h-12 text-sm font-semibold gap-2 bg-transparent border-2"
                style={{
                  borderColor: "hsl(var(--violet-pop) / 0.6)",
                  color: "hsl(var(--violet-pop))",
                }}
              >
                <Link to="/grade-calculator">
                  <Calculator className="h-4 w-4" /> Grade Calculator
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg px-7 h-12 text-sm font-semibold gap-2 bg-transparent border-2"
                style={{
                  borderColor: "hsl(var(--cyan-pop) / 0.6)",
                  color: "hsl(var(--cyan-pop))",
                }}
              >
                <a href="#how-it-works">
                  See How It Works <ChevronDown className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Micro stats */}
            <div className="flex items-center justify-center gap-6 text-sm">
              {[
                { val: "12,000+", label: "Students" },
                { val: "94%", label: "Report Grade Improvement" },
                { val: "All", label: "Exam Boards" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  {i > 0 && <div className="h-6 w-px bg-border" />}
                  <div>
                    <span className="font-bold text-foreground font-mono">{s.val}</span>
                    <span className="text-muted-foreground ml-1.5">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ GRADE PROGRESSION ═══════ */}
      <section className="pt-0 pb-10 lg:pb-14 relative -mt-8">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-6">
          <GradeStepLadder />
        </div>
      </section>


      {/* moved: diagnostic section now appears before hero */}
      <div className="relative overflow-hidden border-y border-border py-4" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-4 px-4 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-4">
              Everything You Need{" "}<br className="hidden md:block" />
              to Walk into the Exam Super Confident.
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={cardVariant}>
                  <Link to={f.to} className="group rounded-2xl border border-border bg-card p-6 h-full hover:border-border-glow hover:-translate-y-1 transition-all duration-300 block">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-shadow">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ PROGRESS TRACKING SPOTLIGHT ═══════ */}
      <section className="py-24 lg:py-32 bg-card/50 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[40vw] h-[40vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none" style={{ background: "hsl(var(--violet-pop) / 0.08)", filter: "blur(120px)" }} />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none" style={{ background: "hsl(var(--cyan-pop) / 0.06)", filter: "blur(100px)" }} />

        <div className="max-w-[1280px] mx-auto px-5 lg:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          {/* Left · copy */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 glow-indigo-sm">
              <span className="text-xs">✦</span> Live progress dashboard
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-6">
              Know Exactly Where<br />You Stand,{" "}
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
                  backgroundSize: "200% auto",
                  animation: "shimmer 6s linear infinite",
                }}
              >
                Every Day.
              </span>
            </h2>
            <p className="text-base lg:text-lg text-foreground/80 leading-relaxed mb-6">
              Every question, every paper, every diagram feeds your{" "}
              <span className="font-semibold text-foreground">readiness score</span>. Climb from
              Base Camp to <span className="font-semibold text-foreground">Peak Mastery</span> and
              watch your predicted grade rise in real time.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Streaks keep you consistent, achievements reward your wins, and the heatmap shows
              exactly which topics need attention next.
            </p>

            {/* Reward chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "🔥 Daily streaks", color: "var(--amber-pop)" },
                { label: "🏆 Achievements", color: "var(--magenta-pop)" },
                { label: "📈 Grade trajectory", color: "var(--violet-pop)" },
                { label: "🎯 Smart goals", color: "var(--cyan-pop)" },
              ].map((c) => (
                <span
                  key={c.label}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: `hsl(${c.color} / 0.4)`,
                    color: `hsl(${c.color})`,
                    background: `hsl(${c.color} / 0.08)`,
                  }}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right · live dashboard demo */}
          <DashboardDemo />
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-4">
              Students Who Trusted the Process.
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={cardVariant}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full border-l-2 border-l-primary flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = i + 1 <= Math.floor(t.rating);
                      const half = !filled && i + 0.5 < t.rating;
                      return (
                        <div key={i} className="relative h-4 w-4">
                          <Star className="absolute inset-0 h-4 w-4 text-warning/30" />
                          {filled && <Star className="absolute inset-0 h-4 w-4 fill-warning text-warning" />}
                          {half && (
                            <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                              <Star className="h-4 w-4 fill-warning text-warning" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <span className="ml-1.5 text-xs font-mono font-bold text-muted-foreground">
                      {t.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-5 italic flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={t.avatar}
                      alt={`${t.name}, ${t.detail}`}
                      loading="lazy"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover border-2 border-primary/30 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        {t.name}
                        <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-primary text-[8px] font-bold text-white" title="Verified student">✓</span>
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{t.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" className="py-24 lg:py-32 bg-card/50">
        <div className="max-w-[800px] mx-auto px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-4 text-foreground">
              Transparent Pricing{" "}
              <br className="hidden md:block" />
              to{" "}
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--magenta-pop)), hsl(var(--violet-pop)), hsl(var(--amber-pop)), hsl(var(--magenta-pop)))",
                  backgroundSize: "200% auto",
                  animation: "shimmer 6s linear infinite",
                }}
              >
                Maximise Results.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Free */}
            <div className="rounded-2xl border border-border bg-card p-7">
              <p className="text-sm font-bold text-muted-foreground mb-1">Free</p>
              <p className="text-4xl font-extrabold font-mono mb-1">£0</p>
              <p className="text-sm text-muted-foreground mb-6">Limited attempts</p>
              <div className="space-y-3 mb-8">
                {freeFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-success shrink-0" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full rounded-lg h-11">
                <Link to="/auth">Get Started Free</Link>
              </Button>
            </div>

            {/* Pro */}
            <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl border-2 border-primary bg-card p-7 glow-indigo">
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </div>
              <p className="text-sm font-bold text-primary mb-1">Pro Pass</p>
              <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-4xl font-extrabold font-mono">£29</span>
                <span className="text-sm text-muted-foreground">/one-off</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Unlimited access until 29 June 2026</p>
              <div className="space-y-3 mb-8">
                {proFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-success shrink-0" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full rounded-lg h-11 gap-2 animate-glow-pulse" onClick={() => startCheckout()}>
                Get Unlimited Access <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            One payment. No subscription. Access ends 29 June 2026.
          </p>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section id="faq" className="py-24 lg:py-32">
        <div className="max-w-[720px] mx-auto px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-5 data-[state=open]:border-primary/40 transition-colors">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline py-5">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </div>
  );
}

/* ─── Typing text component ─── */
function TypingText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let i = 0;
    el.textContent = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        // Reset after pause
        setTimeout(() => {
          if (el) { el.textContent = ""; i = 0; }
        }, 2000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span ref={ref} />;
}

/* ─── How It Works Timeline with GSAP draw animation ─── */
function HowItWorksTimeline({ steps }: { steps: { num: string; title: string; desc: string }[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineRef.current) return;
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Fallback: if ScrollTrigger isn't loaded, use IntersectionObserver
  useEffect(() => {
    if ((gsap as any).plugins?.find?.((p: any) => p.name === "scrollTrigger")) return;
    const el = sectionRef.current;
    if (!el || !lineRef.current) return;
    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && lineRef.current) {
          gsap.to(lineRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="grid md:grid-cols-4 gap-6 relative">
      {/* SVG connecting line */}
      <svg className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] w-[75%] h-[2px] overflow-visible" preserveAspectRatio="none">
        <line
          ref={lineRef}
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {steps.map((s, i) => (
        <motion.div
          key={s.num}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center relative"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 mb-5 mx-auto relative z-10">
            <span className="text-xl font-bold font-mono text-primary">{s.num}</span>
          </div>
          <h3 className="text-base font-bold mb-2">{s.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
