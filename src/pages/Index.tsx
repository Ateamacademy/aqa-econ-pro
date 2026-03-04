import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Brain, Calculator, FileText, MessageCircle, PenTool, ArrowRight, Sparkles, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Past Papers",
    description: "Browse organised past papers for Economics, Maths, and Chemistry with direct links to questions and mark schemes.",
    to: "/papers",
    color: "text-primary",
  },
  {
    icon: Sparkles,
    title: "Predicted Papers",
    description: "AI-generated predicted exam papers with per-question marking, model answers, and examiner tips.",
    to: "/predicted",
    color: "text-primary",
  },
  {
    icon: MessageCircle,
    title: "AI Tutor",
    description: "Ask any question and get clear, exam-board-focused explanations with proper terminology and diagrams.",
    to: "/tutor",
    color: "text-accent",
  },
  {
    icon: PenTool,
    title: "Answer Grader",
    description: "Paste your response and receive marks, feedback, and improvement tips against official mark scheme criteria.",
    to: "/grader",
    color: "text-accent",
  },
  {
    icon: Brain,
    title: "Practice Questions",
    description: "Generate exam-style questions on any topic — multiple choice, short answer, or extended — with instant marking.",
    to: "/practice",
    color: "text-primary",
  },
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Organised revision notes covering every specification topic with definitions, formulae, and key points.",
    to: "/notes",
    color: "text-accent",
  },
];

const subjects = [
  { title: "AQA A-Level Economics", icon: FileText, papers: ["Paper 1: Markets & Market Failure", "Paper 2: National & International Economy", "Paper 3: Economic Principles & Issues"] },
  { title: "Edexcel A-Level Economics A", icon: FileText, papers: ["Paper 1: Markets & Business Behaviour", "Paper 2: The National & Global Economy", "Paper 3: Micro & Macroeconomics"] },
  { title: "Edexcel A-Level Economics B", icon: FileText, papers: ["Paper 1: Markets, Consumers & Firms", "Paper 2: The Wider Economic Environment", "Paper 3: The Global Economy"] },
  { title: "Edexcel GCSE Maths", icon: Calculator, papers: ["Paper 1: Non-Calculator", "Paper 2: Calculator (1)", "Paper 3: Calculator (2)"] },
  { title: "AQA GCSE Chemistry", icon: FlaskConical, papers: ["Paper 1: Topics 1–5 (Atomic Structure to Energy)", "Paper 2: Topics 6–10 (Rates to Resources)"] },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">
              Ace your <span className="italic text-accent">Exams</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              AI-powered revision for AQA Economics, Edexcel GCSE Maths & AQA GCSE Chemistry. Past papers, instant tutoring, answer grading, and practice — all in one place.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2 text-base">
                <Link to="/practice">
                  Start Revising <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/predicted">Predicted Papers</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects overview */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">
            Three Subjects, One Platform
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {subjects.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={item}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-5 w-5 text-accent" />
                        <h3 className="font-serif text-lg">{s.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {s.papers.map((p) => (
                          <li key={p} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
            Everything You Need to Revise
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Built for AQA Economics, Edexcel GCSE Maths & AQA GCSE Chemistry specifications.
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={item}>
                  <Link to={f.to}>
                    <Card className="h-full group hover:shadow-md transition-all hover:-translate-y-0.5">
                      <CardContent className="p-6">
                        <Icon className={`h-8 w-8 mb-4 ${f.color}`} />
                        <h3 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors">
                          {f.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
