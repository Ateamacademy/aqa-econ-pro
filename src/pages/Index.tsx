import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Brain, FileText, MessageCircle, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Past Paper Browser",
    description: "Browse AQA Economics papers organised by year and paper number with direct links to questions and mark schemes.",
    to: "/papers",
    color: "text-primary",
  },
  {
    icon: MessageCircle,
    title: "AI Tutor",
    description: "Ask any economics question and get clear, AQA-focused explanations with proper terminology and diagram guidance.",
    to: "/tutor",
    color: "text-accent",
  },
  {
    icon: PenTool,
    title: "Essay Grader",
    description: "Paste your essay response and receive marks, feedback, and improvement tips against AQA mark scheme criteria.",
    to: "/grader",
    color: "text-highlight",
  },
  {
    icon: Brain,
    title: "Practice Questions",
    description: "Generate AQA-style questions on any topic — multiple choice, data response, or essay — with instant marking.",
    to: "/practice",
    color: "text-destructive",
  },
  {
    icon: BookOpen,
    title: "Study Notes",
    description: "Organised revision notes covering every specification topic with definitions, diagrams, and evaluation points.",
    to: "/notes",
    color: "text-primary",
  },
];

const papers = [
  { number: 1, title: "Markets & Market Failure", topics: "Microeconomics, market structures, market failure, government intervention" },
  { number: 2, title: "National & International Economy", topics: "Macroeconomics, fiscal/monetary policy, trade, development" },
  { number: 3, title: "Economic Principles & Issues", topics: "Synoptic paper combining micro and macro analysis" },
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
              Ace your <span className="italic text-accent">Economics</span> A-Level
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              AI-powered revision for AQA Economics. Past papers, instant tutoring, essay grading, and practice questions — all in one place.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2 text-base">
                <Link to="/practice">
                  Start Revising <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/papers">Browse Past Papers</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-base">
                <Link to="/tutor">Ask the AI Tutor</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Papers overview */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">
            Three Papers, One Platform
          </h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {papers.map((p) => (
              <motion.div key={p.number} variants={item}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-serif text-lg">
                        {p.number}
                      </span>
                      <h3 className="font-serif text-xl">{p.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.topics}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            Built specifically for the AQA A-Level Economics specification.
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
