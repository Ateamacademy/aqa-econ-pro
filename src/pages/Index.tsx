import { Link } from "react-router-dom";
import GradeStepLadder from "@/components/homepage/GradeStepLadder";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FileText, Bot, BarChart3, Compass, MessageCircle, BookOpen,
  ArrowRight, ChevronDown, Check, Star, ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  { icon: FileText, title: "Exam Board Specific Papers", desc: "Generate full exam-format papers based on the latest mark schemes. Unique every time." },
  { icon: Bot, title: "Instant Marking & Feedback", desc: "Submit answers and get instant mark-scheme-accurate feedback with improvement tips." },
  { icon: BarChart3, title: "Progress Tracking", desc: "Visual readiness score, topic heatmaps, and grade trajectory charts updated after every session." },
  { icon: Compass, title: "Diagram Builder", desc: "Practice drawing and labelling economic diagrams with accuracy feedback." },
  { icon: MessageCircle, title: "24/7 Economics Tutor", desc: "Ask any economics question and get curriculum-aligned explanations instantly." },
  { icon: BookOpen, title: "Structured Notes", desc: "Clean, concise topic notes organised by syllabus. Linked to practice questions." },
];

const steps = [
  { num: "01", title: "Choose Your Topic", desc: "Pick a syllabus area or get recommendations based on your weak spots." },
  { num: "02", title: "Generate a Paper", desc: "Get a unique, exam-format paper matched to your board and specification." },
  { num: "03", title: "Submit & Get Marked", desc: "Write your answers and receive instant, mark-scheme-accurate feedback." },
  { num: "04", title: "Track Your Progress", desc: "Watch your readiness score climb as you revise smarter, not harder." },
];

const testimonials = [
  { quote: "I went from a C to an A* in 6 weeks. The predicted papers were almost identical to the real thing.", name: "Maya", detail: "A-Level Economics, Edexcel" },
  { quote: "The tutor explained diagrams better than my actual teacher. Worth every penny.", name: "James", detail: "GCSE Economics, AQA" },
  { quote: "I used Econ Rev every day for 3 months. My predicted grade went from a 5 to an 8.", name: "Priya", detail: "GCSE Economics, OCR" },
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
      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Blobs */}
        <div ref={blob1Ref} className="absolute top-1/4 right-0 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none" style={{ background: "rgba(79,86,255,0.12)", filter: "blur(120px)" }} />
        <div ref={blob2Ref} className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(6,182,212,0.06)", filter: "blur(100px)" }} />

        <div className="max-w-[1280px] mx-auto px-5 lg:px-6 w-full flex flex-col items-center text-center py-20 lg:py-0">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }} className="max-w-3xl">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 glow-indigo-sm">
              <span className="text-xs">✦</span> Built for AQA · Edexcel · OCR · All Boards
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-6">
              The Smartest Way to{" "}
              <br className="hidden md:block" />
              Revise{" "}
              <span
                ref={shimmerRef}
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--cyan-pop)), hsl(var(--accent)))",
                  backgroundSize: "200% auto",
                }}
              >
                Economics.
              </span>
            </h1>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Predicted papers, instant marking, diagram practice &amp; expert support; like having a{" "}
              <span
                ref={subtitleShimmerRef}
                className="inline-block bg-clip-text text-transparent font-semibold"
                style={{
                  backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--cyan-pop)), hsl(var(--primary)))",
                  backgroundSize: "200% auto",
                }}
              >
                personal Economics tutor on demand: 24/7
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <Button asChild size="lg" className="rounded-lg px-7 h-12 text-sm font-semibold gap-2 animate-glow-pulse">
                <Link to="/predicted">
                  Generate My First Paper <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-lg px-7 h-12 text-sm font-semibold border-border gap-2">
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
      <section className="py-16 lg:py-20 relative">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-6">
          <GradeStepLadder />
        </div>
      </section>


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
              Everything a Student Needs<br className="hidden md:block" />
              to Walk into the Exam Confident.
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={cardVariant}>
                  <div className="group rounded-2xl border border-border bg-card p-6 h-full hover:border-border-glow hover:-translate-y-1 transition-all duration-300">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-shadow">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-card/50">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-4">
              From Zero to Exam Ready<br className="hidden md:block" />
              in Four Steps.
            </h2>
          </motion.div>

          <HowItWorksTimeline steps={steps} />
        </div>
      </section>

      {/* ═══════ PREDICTED PAPERS SPOTLIGHT ═══════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — mock paper */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-border bg-card overflow-hidden relative" style={{ borderTopColor: "hsl(var(--accent))", borderTopWidth: "2px" }}>
              <div className="absolute top-3 right-3 bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full animate-glow-pulse">
                Predicted
              </div>
              <div className="p-6 border-b border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">Economics — Paper 1</p>
                <p className="text-sm font-bold">Predicted | June 2025</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { q: "1. Define the term 'opportunity cost'.", marks: 2 },
                  { q: "2. Explain how a fall in interest rates affects aggregate demand.", marks: 8 },
                  { q: "3. Evaluate the effectiveness of supply-side policies in reducing unemployment.", marks: 25 },
                ].map((item) => (
                  <div key={item.marks} className="flex items-start justify-between gap-3">
                    <p className="text-sm text-foreground">{item.q}</p>
                    <span className="shrink-0 text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">[{item.marks} marks]</span>
                  </div>
                ))}
                {/* Marking overlay */}
                <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/20 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-destructive">Instant Marking</span>
                    <span className="font-mono text-sm font-bold text-foreground">7/8 marks</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Strong analysis, develop evaluation further</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-6">
              Exam Papers, Generated<br />& Marked Instantly.
            </h2>
            <div className="space-y-4 mb-8">
              {[
                "Matches your exact exam board format",
                "New unique paper every attempt",
                "Instant mark-scheme-accurate feedback",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-sm text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="rounded-lg px-7 h-12 text-sm font-semibold gap-2">
              <Link to="/predicted">
                Generate My First Paper <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PROGRESS TRACKING SPOTLIGHT ═══════ */}
      <section className="py-24 lg:py-32 bg-card/50">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-6">
              Know Exactly Where<br />You Stand, Every Day.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Your readiness score tracks every question answered, paper completed, and concept mastered.
              Watch your mountain climb progress from Base Camp to Peak Mastery as exam day approaches.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set daily goals, maintain your study streak, and see exactly which topics need attention
              with our intelligent heatmap system.
            </p>
          </motion.div>

          {/* Right — mini dashboard */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="space-y-4">
            {/* Readiness ring */}
            <motion.div variants={cardVariant} className="rounded-2xl border border-border bg-card p-6 flex items-center gap-6">
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--accent))" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${0.74 * 201} ${201}`} style={{ filter: "drop-shadow(0 0 8px rgba(99,102,241,0.5))" }} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold font-mono text-foreground">74%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Summit Approach</p>
                <p className="text-xs text-success font-medium">↑ +5 this week</p>
              </div>
            </motion.div>

            {/* Heatmap */}
            <motion.div variants={cardVariant} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Topic Mastery</p>
              <div className="grid grid-cols-4 gap-1.5">
                {[85, 72, 45, 90, 60, 38, 78, 55].map((v, i) => (
                  <div key={i} className="h-8 rounded-md flex items-center justify-center text-[9px] font-mono font-bold" style={{ background: `hsl(var(--accent) / ${v / 100 * 0.7 + 0.1})`, color: v > 50 ? "white" : "hsl(var(--muted-foreground))" }}>
                    {v}%
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Grade trend */}
            <motion.div variants={cardVariant} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Grade Trend</p>
              <div className="h-12 flex items-end gap-1">
                {[55, 58, 62, 65, 70, 74].map((v, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-primary" style={{ height: `${v}%`, opacity: 0.4 + (i / 6) * 0.6 }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
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
                <div className="rounded-2xl border border-border bg-card p-6 h-full border-l-2 border-l-primary">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-5 italic">"{t.quote}"</p>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.detail}</p>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-4">
              Simple Pricing.<br />No Surprises.
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
              <p className="text-sm font-bold text-primary mb-1">Exam Window Pass</p>
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
              <Button asChild className="w-full rounded-lg h-11 gap-2 animate-glow-pulse">
                <Link to="/pricing">
                  Get Unlimited Access <ArrowRight className="h-4 w-4" />
                </Link>
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

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div ref={ctaPulseRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(79,86,255,0.12), transparent 70%)" }} />
        </div>

        <div className="max-w-[720px] mx-auto px-5 lg:px-6 text-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-6">
              Your Exam Is Coming.<br />Start Preparing Today.
            </h2>
            <Button asChild size="lg" className="rounded-lg px-8 h-13 text-base font-semibold gap-2 animate-glow-pulse">
              <Link to="/predicted">
                Generate My First Predicted Paper <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-5">
              Free to start. No credit card required.
            </p>
          </motion.div>
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
