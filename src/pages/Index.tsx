import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Brain, FileText, MessageCircle, PenTool, ArrowRight, Sparkles, ChevronRight, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "Predicted Papers",
    description: "AI-generated predicted papers with per-question marking and examiner tips.",
    to: "/predicted",
    tag: "Most Popular",
  },
  {
    icon: MessageCircle,
    title: "AI Tutor",
    description: "Ask any economics question and get exam-board-focused explanations instantly.",
    to: "/tutor",
  },
  {
    icon: PenTool,
    title: "Answer Grader",
    description: "Paste your essay or data response and receive marks, feedback, and improvement tips.",
    to: "/grader",
  },
  {
    icon: Brain,
    title: "Practice Questions",
    description: "Generate exam-style economics questions on any topic with instant AI marking.",
    to: "/practice",
  },
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Organised revision notes covering every specification topic across all boards.",
    to: "/notes",
  },
];

const boards = [
  { name: "AQA", level: "A-Level", papers: "3 Papers", desc: "Markets, National Economy & Principles" },
  { name: "Edexcel A", level: "A-Level", papers: "3 Papers", desc: "Markets, National & Global Economy" },
  { name: "Edexcel B", level: "A-Level", papers: "3 Papers", desc: "Markets, Wider & Global Economy" },
  { name: "OCR", level: "A-Level", papers: "3 Components", desc: "Micro, Macro & Themes" },
  { name: "Cambridge", level: "A-Level", papers: "4 Papers", desc: "MCQ, Data Response & Essays" },
  { name: "AQA", level: "GCSE", papers: "2 Papers", desc: "Markets & The Economy" },
  { name: "Cambridge", level: "IGCSE", papers: "2 Papers", desc: "MCQ & Structured Questions" },
];

const topics = [
  "Supply & Demand", "Market Failure", "Fiscal Policy", "Monetary Policy",
  "Elasticity", "Trade & Globalisation", "Aggregate Demand", "Unemployment",
  "Inflation", "Economic Growth", "Exchange Rates", "Development",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } },
};

export default function Index() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-background overflow-hidden">
        {/* Subtle gradient orb behind hero */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

        <div className="max-w-[980px] mx-auto px-5 pt-24 pb-20 md:pt-36 md:pb-28 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          >
            {/* Subject badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-8 border border-primary/20">
              <TrendingUp className="h-4 w-4" />
              Built for Economics Students
            </div>

            <h1 className="text-5xl md:text-[72px] lg:text-[88px] font-bold tracking-[-0.04em] leading-[1.02] mb-2">
              Ace your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Economics
              </span>{" "}
              exams.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-normal mt-5 mb-1 tracking-tight max-w-[640px] mx-auto leading-relaxed">
              AI-powered revision for GCSE & A-Level Economics. Predicted papers, instant tutoring, and exam-style practice.
            </p>
            <p className="text-sm text-muted-foreground/70 font-normal mb-10 mt-4">
              Covering <span className="font-semibold text-foreground/80">AQA</span> · <span className="font-semibold text-foreground/80">Edexcel A & B</span> · <span className="font-semibold text-foreground/80">OCR</span> · <span className="font-semibold text-foreground/80">Cambridge</span> · <span className="font-semibold text-foreground/80">GCSE</span> · <span className="font-semibold text-foreground/80">IGCSE</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-sm h-12 font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                <Link to="/practice">
                  Start Revising <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-sm h-12 font-semibold border-border/60 bg-card/50 backdrop-blur-sm">
                <Link to="/predicted">
                  Predicted Papers <ChevronRight className="h-4 w-4 ml-0.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scrolling topics strip */}
        <div className="relative overflow-hidden py-4 border-y border-border/40 bg-card/50">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -600] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...topics, ...topics].map((t, i) => (
              <span key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exam boards */}
      <section className="bg-background">
        <div className="max-w-[980px] mx-auto px-5 py-20 md:py-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-3">
              Every major exam board.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-normal">
              Full coverage for GCSE and A-Level Economics specifications.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">A-Level</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {boards.filter(b => b.level === "A-Level").map((b) => (
                <motion.div key={b.name + b.level} variants={cardFade}>
                  <div className="bg-card border border-border/60 rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full">
                    <h3 className="text-base font-bold tracking-tight">{b.name}</h3>
                    <p className="text-xs text-primary font-semibold mt-1">{b.papers}</p>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">GCSE & IGCSE</p>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {boards.filter(b => b.level !== "A-Level").map((b) => (
                <motion.div key={b.name + b.level} variants={cardFade}>
                  <div className="bg-card border border-border/60 rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 h-full">
                    <div className="inline-block bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-[10px] font-bold mb-1.5">{b.level}</div>
                    <h3 className="text-base font-bold tracking-tight">{b.name}</h3>
                    <p className="text-xs text-primary font-semibold mt-1">{b.papers}</p>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features grid — dark section */}
      <section className="bg-[hsl(240,10%,8%)] text-[hsl(240,7%,93%)]">
        <div className="max-w-[980px] mx-auto px-5 py-20 md:py-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-3">
              Everything you need to revise Economics.
            </h2>
            <p className="text-lg md:text-xl text-[hsl(240,7%,55%)] font-normal">
              Five powerful tools. One platform.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={cardFade}>
                  <Link to={f.to}>
                    <div className="group relative p-6 rounded-2xl bg-[hsl(246,8%,14%)] border border-[hsl(246,8%,20%)] hover:border-primary/40 hover:bg-[hsl(246,8%,17%)] transition-all duration-300 h-full">
                      {"tag" in f && f.tag && (
                        <span className="absolute top-4 right-4 bg-primary/20 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {f.tag}
                        </span>
                      )}
                      <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base font-bold mb-2 tracking-tight">{f.title}</h3>
                      <p className="text-sm text-[hsl(240,7%,50%)] leading-relaxed">{f.description}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                        Learn more <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Social proof / stats */}
      <section className="bg-card border-y border-border/40">
        <div className="max-w-[980px] mx-auto px-5 py-16 md:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "7", label: "Exam Boards" },
              { value: "200+", label: "Economics Topics" },
              { value: "1000+", label: "Practice Questions" },
              { value: "A*", label: "Target Grade" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={cardFade}>
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-background relative overflow-hidden">
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
        <div className="max-w-[980px] mx-auto px-5 py-24 md:py-32 text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-3">
              Start revising Economics today.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-normal mb-10">
              Free to get started. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-sm h-12 font-semibold shadow-lg shadow-primary/25">
                <Link to="/practice">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-sm h-12 font-semibold border-border/60 bg-card/50">
                <Link to="/pricing">See Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
