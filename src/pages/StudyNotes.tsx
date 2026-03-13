import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject } from "@/contexts/SubjectContext";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronRight, Search, Layers, GraduationCap, Sparkles, TrendingUp, Pen, Eye } from "lucide-react";
import {
  RevisionTopicCard,
  DefinitionBox,
  ExampleBox,
  ExamTipBox,
  FormulaBox,
  KeyTermsList,
  DiagramBox,
} from "@/components/revision/RevisionCard";
import { EconDiagramTemplate, type DiagramType } from "@/components/revision/EconDiagramLibrary";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import type { Topic, Subtopic } from "@/data/studyNotes/edexcelANotes";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SubtopicPractice } from "@/components/study-notes/SubtopicPractice";
import { EndOfTopicTest } from "@/components/study-notes/EndOfTopicTest";

// Data imports
import { aqaYear1Paper1Topics, aqaYear1Paper2Topics, aqaYear2Paper1Topics, aqaYear2Paper2Topics, aqaBook1MicroTopics, aqaBook1MacroTopics, aqaBook2MicroTopics, aqaBook2MacroTopics } from "@/data/studyNotes/aqaNotes";
import { edexcelAPaper1Topics, edexcelAPaper2Topics } from "@/data/studyNotes/edexcelANotes";
import { edexcelBPaper1Topics, edexcelBPaper2Topics } from "@/data/studyNotes/edexcelBNotes";
import { ocrComponent1Topics, ocrComponent2Topics } from "@/data/studyNotes/ocrNotes";
import { caiePaper1Topics, caiePaper2Topics } from "@/data/studyNotes/caieNotes";
import { gcsePaper1Topics, gcsePaper2Topics } from "@/data/studyNotes/gcseNotes";
import { igcsePart1Topics, igcsePart2Topics } from "@/data/studyNotes/igcseNotes";

/* ── Paper configs per subject ── */
interface PaperSection {
  heading: string;
  topics: Topic[];
  prefix: string;
  icon: string;
  color: string;
}

type Subject = import("@/contexts/SubjectContext").Subject;

const paperSections: Record<Subject, PaperSection[]> = {
  economics: [
    { heading: "Book 1 — Microeconomics (Chapters 1–5)", topics: aqaBook1MicroTopics, prefix: "b1m", icon: "📗", color: "var(--revision-green)" },
    { heading: "Book 1 — Macroeconomics (Chapters 6–9)", topics: aqaBook1MacroTopics, prefix: "b1M", icon: "📗", color: "var(--revision-blue)" },
    { heading: "Book 2 — Microeconomics (Chapters 1–6)", topics: aqaBook2MicroTopics, prefix: "b2m", icon: "📘", color: "var(--revision-purple)" },
    { heading: "Book 2 — Macroeconomics (Chapters 7–10)", topics: aqaBook2MacroTopics, prefix: "b2M", icon: "📘", color: "var(--revision-amber)" },
  ],
  "edexcel-a": [
    { heading: "Paper 1 — Markets & Business Behaviour", topics: edexcelAPaper1Topics, prefix: "p1", icon: "📗", color: "var(--revision-green)" },
    { heading: "Paper 2 — The National & Global Economy", topics: edexcelAPaper2Topics, prefix: "p2", icon: "📘", color: "var(--revision-blue)" },
  ],
  "edexcel-b": [
    { heading: "Paper 1 — Markets, Consumers & Firms", topics: edexcelBPaper1Topics, prefix: "p1", icon: "📗", color: "var(--revision-green)" },
    { heading: "Paper 2 — The Wider Economic Environment", topics: edexcelBPaper2Topics, prefix: "p2", icon: "📘", color: "var(--revision-blue)" },
  ],
  "ocr": [
    { heading: "Component 01 — Microeconomics", topics: ocrComponent1Topics, prefix: "c1", icon: "📗", color: "var(--revision-green)" },
    { heading: "Component 02 — Macroeconomics", topics: ocrComponent2Topics, prefix: "c2", icon: "📘", color: "var(--revision-blue)" },
  ],
  "cambridge": [
    { heading: "Paper 1 & 2 — AS Level (Micro & Macro)", topics: caiePaper1Topics, prefix: "p1", icon: "📗", color: "var(--revision-green)" },
    { heading: "Paper 3 & 4 — A2 Level (Advanced)", topics: caiePaper2Topics, prefix: "p2", icon: "📘", color: "var(--revision-blue)" },
  ],
  "aqa-gcse": [
    { heading: "Paper 1 — How Markets Work", topics: gcsePaper1Topics, prefix: "p1", icon: "📗", color: "var(--revision-green)" },
    { heading: "Paper 2 — How the Economy Works", topics: gcsePaper2Topics, prefix: "p2", icon: "📘", color: "var(--revision-blue)" },
  ],
  "cambridge-igcse": [
    { heading: "Paper 1 — Multiple Choice & Core Topics", topics: igcsePart1Topics, prefix: "p1", icon: "📗", color: "var(--revision-green)" },
    { heading: "Paper 2 — Structured Questions & Extended Topics", topics: igcsePart2Topics, prefix: "p2", icon: "📘", color: "var(--revision-blue)" },
  ],
};

/* ── Stat card with notebook aesthetic ── */
function StatCard({ icon: Icon, label, value, delay }: { icon: any; label: string; value: string | number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight font-handwriting">{value}</p>
        <p className="text-xs text-muted-foreground font-handwriting-alt">{label}</p>
      </div>
    </motion.div>
  );
}

/* ── Section header with notebook tab styling ── */
function SectionHeader({ section, index }: { section: PaperSection; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const topicCount = section.topics.reduce((acc, t) => acc + t.subtopics.length, 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className={`${index > 0 ? "mt-14" : ""} mb-6`}
    >
      {/* Notebook tab */}
      <div className="flex items-end gap-0 mb-0">
        <div className="notebook-tab">
          <span className="text-2xl mr-2">{section.icon}</span>
          {section.heading.split("—")[0]?.trim()}
        </div>
      </div>
      {/* Section body */}
      <div className="border-2 border-border rounded-b-xl rounded-tr-xl p-5 bg-card">
        <h2 className="font-handwriting text-2xl font-bold tracking-tight text-foreground">
          {section.heading}
        </h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-muted-foreground font-handwriting-alt highlighter-blue">
            {section.topics.length} modules
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
          <span className="text-sm text-muted-foreground font-handwriting-alt highlighter-yellow">
            {topicCount} subtopics
          </span>
        </div>
        {/* Hand-drawn underline */}
        <svg className="w-full h-3 mt-3 overflow-visible" viewBox="0 0 400 8" preserveAspectRatio="none">
          <motion.path
            d="M0,4 C50,2 100,6 150,3 C200,1 250,7 300,4 C350,2 380,5 400,4"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

const DIAGRAM_PROMPTS: Record<string, string> = {
  supply_demand: "supply and demand",
  demand_increase: "demand increase (rightward shift)",
  demand_decrease: "demand decrease (leftward shift)",
  supply_increase: "supply increase (rightward shift)",
  supply_decrease: "supply decrease (leftward shift)",
  positive_externality: "positive externality of consumption",
  negative_externality: "negative externality of consumption",
  negative_production_externality: "negative externality of production",
  positive_production_externality: "positive externality of production",
  ad_increase: "aggregate demand increase",
  ad_decrease: "aggregate demand decrease",
  sras_decrease: "short-run aggregate supply decrease (cost-push inflation)",
  sras_increase: "short-run aggregate supply increase",
  ped_elastic: "price elastic demand",
  ped_inelastic: "price inelastic demand",
  ppf: "production possibility frontier",
  ppf_growth: "economic growth on a PPF",
  phillips_curve: "Phillips curve",
  tax_incidence: "indirect tax incidence",
  subsidy: "subsidy",
  price_floor: "minimum price (price floor)",
  price_ceiling: "maximum price (price ceiling)",
  monopoly: "monopoly profit maximisation",
  perfect_competition: "perfect competition",
};

export default function StudyNotes() {
  const { user } = useAuth();
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [viewedSubtopics, setViewedSubtopics] = useState<Set<string>>(new Set());

  useEffect(() => { setExpanded({}); setSearch(""); }, [subject]);

  // Load viewed subtopics from DB
  useEffect(() => {
    if (!user) return;
    supabase
      .from("practice_sessions")
      .select("topic")
      .eq("user_id", user.id)
      .eq("subject", subject)
      .eq("session_type", "note_view")
      .then(({ data }) => {
        if (data) setViewedSubtopics(new Set(data.map(d => d.topic)));
      });
  }, [user, subject]);

  const markViewed = useCallback(async (subtopicTitle: string, topicName: string) => {
    const key = `${topicName} — ${subtopicTitle}`;
    if (viewedSubtopics.has(key) || !user) return;
    setViewedSubtopics(prev => new Set(prev).add(key));
    await supabase.from("practice_sessions").insert({
      user_id: user.id,
      subject,
      session_type: "note_view",
      topic: key,
    });
  }, [user, subject, viewedSubtopics]);

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const sections = paperSections[subject];

  const stats = useMemo(() => {
    let totalTopics = 0;
    let totalSubtopics = 0;
    let totalDiagrams = 0;
    sections.forEach(s => {
      totalTopics += s.topics.length;
      s.topics.forEach(t => {
        totalSubtopics += t.subtopics.length;
        t.subtopics.forEach(sub => { if (sub.diagram) totalDiagrams++; });
      });
    });
    return { totalTopics, totalSubtopics, totalDiagrams, papers: sections.length };
  }, [sections]);

  const renderSubtopic = (sub: Subtopic, idx: number) => {
    if (sub.definition || sub.keyTerms || sub.diagram || sub.formula || sub.examTip) {
      return (
        <div className="space-y-3">
          {sub.definition && (
            <DefinitionBox term={sub.title}>
              <MathsMarkdown>{sub.definition}</MathsMarkdown>
            </DefinitionBox>
          )}
          {sub.keyTerms && sub.keyTerms.length > 0 && (
            <KeyTermsList terms={sub.keyTerms} />
          )}
          {sub.explanation && (
            <div className="ai-response text-sm px-1 font-handwriting-alt text-base leading-relaxed">
              <MathsMarkdown>{sub.explanation}</MathsMarkdown>
            </div>
          )}
          {sub.formula && (
            <FormulaBox>
              <MathsMarkdown>{sub.formula}</MathsMarkdown>
            </FormulaBox>
          )}
          {sub.diagram && (
            <DiagramBox title={`Diagram Practice: ${sub.title}`}>
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground/90 italic">
                  Draw a fully labelled {DIAGRAM_PROMPTS[sub.diagram] || sub.title.toLowerCase()} diagram.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Label both axes correctly</li>
                  <li>Show the original and new equilibrium positions</li>
                  <li>Use arrows to indicate the direction of any shifts</li>
                  <li>Label all curves clearly (e.g. D₁, S₁, D₂)</li>
                </ul>
                <details className="group">
                  <summary className="text-xs font-semibold text-primary cursor-pointer hover:text-primary/80 transition-colors">
                    Show model diagram
                  </summary>
                  <div className="mt-2">
                    <EconDiagramTemplate type={sub.diagram} />
                  </div>
                </details>
              </div>
            </DiagramBox>
          )}
          {sub.example && (
            <ExampleBox>
              <MathsMarkdown>{sub.example}</MathsMarkdown>
            </ExampleBox>
          )}
          {sub.examTip && (
            <ExamTipBox>
              <MathsMarkdown>{sub.examTip}</MathsMarkdown>
            </ExamTipBox>
          )}
        </div>
      );
    }
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert font-handwriting-alt text-base">
        <MathsMarkdown>{sub.content || ""}</MathsMarkdown>
      </div>
    );
  };

  const renderTopics = (topics: Topic[], prefix: string) => {
    return topics.filter(t => {
      if (!search) return true;
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.subtopics.some(s =>
        s.title.toLowerCase().includes(q) ||
        (s.definition || "").toLowerCase().includes(q) ||
        (s.content || "").toLowerCase().includes(q)
      );
    }).map((topic, tIdx) => {
      const key = `${prefix}-${topic.name}`;
      const isOpen = expanded[key];
      const filteredSubs = topic.subtopics.filter(s => {
        if (!search) return true;
        const q = search.toLowerCase();
        return s.title.toLowerCase().includes(q) ||
          (s.definition || "").toLowerCase().includes(q) ||
          (s.content || "").toLowerCase().includes(q);
      });
      return (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: tIdx * 0.05, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-4"
        >
          <button
            onClick={() => toggle(key)}
            className="group w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-muted/50 transition-all duration-300 rounded-xl border border-border bg-card hover:shadow-md"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="h-4 w-4 text-primary" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-handwriting font-bold text-xl tracking-tight">{topic.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {topic.subtopics.some(s => s.diagram) && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary font-handwriting-alt">
                  📐 Diagrams
                </span>
              )}
              <span className="text-sm font-handwriting font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                {topic.subtopics.length}
              </span>
            </div>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-3 ml-4 space-y-6">
                  {filteredSubs.map((sub, idx) => {
                    const viewKey = `${topic.name} — ${sub.title}`;
                    // Mark as viewed when expanded
                    if (user) markViewed(sub.title, topic.name);
                    return (
                      <RevisionTopicCard key={sub.title} title={sub.title}>
                        {renderSubtopic(sub, idx)}
                        <SubtopicPractice subtopicTitle={sub.title} topicName={topic.name} />
                      </RevisionTopicCard>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    });
  };

  return (
    <div className="container py-10 max-w-4xl">
      {/* ── Hero header — notebook cover ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20">
            <Pen className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-handwriting font-bold tracking-tight">Study Notes</h1>
            <p className="text-base text-muted-foreground font-handwriting-alt">
              {examBoard} {level} {subjectLabel}
            </p>
          </div>
        </div>
        <p className="text-base text-muted-foreground font-handwriting-alt mt-3 max-w-xl leading-relaxed">
          ✨ Handcrafted revision notes with interactive diagrams, key terms & exam tips — presented like a live lesson for efficient A* revision.
        </p>
      </motion.div>

      {/* ── Infographic stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard icon={Layers} label="Papers" value={stats.papers} delay={0.1} />
        <StatCard icon={BookOpen} label="Topics" value={stats.totalTopics} delay={0.15} />
        <StatCard icon={Sparkles} label="Subtopics" value={stats.totalSubtopics} delay={0.2} />
        <StatCard icon={TrendingUp} label="Diagrams" value={stats.totalDiagrams} delay={0.25} />
      </div>

      {/* ── Search bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative mb-8"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search topics, terms, definitions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-11 rounded-2xl h-12 text-sm border-border bg-card shadow-sm focus-visible:shadow-md transition-shadow font-handwriting-alt"
        />
      </motion.div>

      {/* ── Sections ── */}
      {sections.map((section, i) => (
        <div key={section.prefix}>
          <SectionHeader section={section} index={i} />
          {renderTopics(section.topics, section.prefix)}
        </div>
      ))}
    </div>
  );
}
