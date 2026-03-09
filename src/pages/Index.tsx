import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Brain, FileText, MessageCircle, PenTool, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FileText,
    title: "Past Papers",
    description: "Browse organised past papers with direct links to questions and mark schemes.",
    to: "/papers",
  },
  {
    icon: Sparkles,
    title: "Predicted Papers",
    description: "AI-generated predicted papers with per-question marking and examiner tips.",
    to: "/predicted",
  },
  {
    icon: MessageCircle,
    title: "AI Tutor",
    description: "Ask any question and get exam-board-focused explanations instantly.",
    to: "/tutor",
  },
  {
    icon: PenTool,
    title: "Answer Grader",
    description: "Paste your response and receive marks, feedback, and improvement tips.",
    to: "/grader",
  },
  {
    icon: Brain,
    title: "Practice Questions",
    description: "Generate exam-style questions on any topic with instant AI marking.",
    to: "/practice",
  },
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Organised revision notes covering every specification topic.",
    to: "/notes",
  },
];

const boards = [
  { name: "AQA", papers: "3 Papers", desc: "Markets, National Economy & Principles" },
  { name: "Edexcel A", papers: "3 Papers", desc: "Markets, National & Global Economy" },
  { name: "Edexcel B", papers: "3 Papers", desc: "Markets, Wider & Global Economy" },
  { name: "OCR", papers: "3 Components", desc: "Micro, Macro & Themes" },
  { name: "Cambridge", papers: "4 Papers", desc: "MCQ, Data Response & Essays" },
  { name: "AQA GCSE", papers: "2 Papers", desc: "Markets & The Economy" },
  { name: "CAIE IGCSE", papers: "2 Papers", desc: "MCQ & Structured Questions" },
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
      {/* Hero — Apple style: centered, massive typography, clean */}
      <section className="relative bg-background">
        <div className="max-w-[980px] mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          >
            <h1 className="text-5xl md:text-[80px] lg:text-[96px] font-semibold tracking-[-0.03em] leading-[1.05] mb-2">
              Ace your exams.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-normal mt-4 mb-1 tracking-tight">
              AI-powered revision for A-Level & GCSE Economics.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-normal mb-8">
              AQA · Edexcel · OCR · Cambridge · GCSE · IGCSE.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-base h-12 font-normal">
                <Link to="/practice">
                  Start Revising <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base h-12 font-normal border-foreground/20">
                <Link to="/predicted">
                  Predicted Papers <ChevronRight className="h-4 w-4 ml-0.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features grid — dark section like Apple product sections */}
      <section className="bg-foreground text-background">
        <div className="max-w-[980px] mx-auto px-4 py-20 md:py-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] mb-3">
              Everything you need to revise.
            </h2>
            <p className="text-lg md:text-xl opacity-60 font-normal">
              Six powerful tools. One platform.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={cardFade}>
                  <Link to={f.to}>
                    <div className="group p-6 rounded-2xl bg-[hsl(0,0%,18%)] hover:bg-[hsl(0,0%,22%)] transition-all duration-300 h-full">
                      <Icon className="h-8 w-8 mb-4 text-primary" />
                      <h3 className="text-lg font-semibold mb-2 tracking-tight">{f.title}</h3>
                      <p className="text-sm opacity-60 leading-relaxed">{f.description}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm mt-4 group-hover:gap-2 transition-all">
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

      {/* Exam boards — light grey section */}
      <section className="bg-secondary">
        <div className="max-w-[980px] mx-auto px-4 py-20 md:py-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] mb-3">
              Seven exam boards. One platform.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-normal">
              Full coverage across every major A-Level and GCSE Economics specification.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {boards.map((b) => (
              <motion.div key={b.name} variants={cardFade}>
                <div className="bg-background rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-semibold tracking-tight mb-1">{b.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{b.papers}</p>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-background">
        <div className="max-w-[980px] mx-auto px-4 py-20 md:py-28 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] mb-3">
              Start revising today.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-normal mb-8">
              Free to get started. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-base h-12 font-normal">
                <Link to="/practice">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base h-12 font-normal border-foreground/20">
                <Link to="/pricing">See Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
