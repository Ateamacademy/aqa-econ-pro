import { useState, useEffect, useMemo } from "react";
import { useSubject } from "@/contexts/SubjectContext";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronDown, ChevronRight, Search, Layers, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

// Data imports
import { aqaYear1Paper1Topics, aqaYear1Paper2Topics, aqaYear2Paper1Topics, aqaYear2Paper2Topics } from "@/data/studyNotes/aqaNotes";
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
    { heading: "Year 1 (AS) — Paper 1: Markets & Market Failure", topics: aqaYear1Paper1Topics, prefix: "y1p1", icon: "📗", color: "var(--revision-green)" },
    { heading: "Year 1 (AS) — Paper 2: National Economy in a Global Context", topics: aqaYear1Paper2Topics, prefix: "y1p2", icon: "📗", color: "var(--revision-blue)" },
    { heading: "Year 2 (A2) — Paper 1: Markets & Market Failure (Extended)", topics: aqaYear2Paper1Topics, prefix: "y2p1", icon: "📘", color: "var(--revision-purple)" },
    { heading: "Year 2 (A2) — Paper 2: National & International Economy (Extended)", topics: aqaYear2Paper2Topics, prefix: "y2p2", icon: "📘", color: "var(--revision-amber)" },
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

/* ── Stat card for infographic header ── */
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
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

export default function StudyNotes() {
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => { setExpanded({}); setSearch(""); }, [subject]);

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const sections = paperSections[subject];

  // Stats for infographic header
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
          className="space-y-3"
        >
          {sub.definition && (
            <DefinitionBox term={sub.title}>
              <MathsMarkdown>{sub.definition}</MathsMarkdown>
            </DefinitionBox>
          )}
          {sub.keyTerms && sub.keyTerms.length > 0 && (
            <KeyTermsList terms={sub.keyTerms} />
          )}
          {sub.explanation && (
            <div className="ai-response text-sm px-1">
              <MathsMarkdown>{sub.explanation}</MathsMarkdown>
            </div>
          )}
          {sub.formula && (
            <FormulaBox>
              <MathsMarkdown>{sub.formula}</MathsMarkdown>
            </FormulaBox>
          )}
          {sub.diagram && (
            <DiagramBox title={sub.title}>
              <EconDiagramTemplate type={sub.diagram} />
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
        </motion.div>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: idx * 0.06 }}
        className="prose prose-sm max-w-none dark:prose-invert"
      >
        <MathsMarkdown>{sub.content || ""}</MathsMarkdown>
      </motion.div>
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
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4 text-primary" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base tracking-tight">{topic.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              {topic.subtopics.some(s => s.diagram) && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  Diagrams
                </span>
              )}
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
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
                  {filteredSubs.map((sub, idx) => (
                    <RevisionTopicCard key={sub.title} title={sub.title}>
                      {renderSubtopic(sub, idx)}
                    </RevisionTopicCard>
                  ))}
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
      {/* ── Hero header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Study Notes</h1>
            <p className="text-sm text-muted-foreground">{examBoard} {level} {subjectLabel}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl">
          Structured revision notes with interactive diagrams, key terms & exam tips — designed for efficient A* revision.
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
          className="pl-11 rounded-2xl h-12 text-sm border-border bg-card shadow-sm focus-visible:shadow-md transition-shadow"
        />
      </motion.div>

      {/* ── Sections ── */}
      {sections.map((section, i) => {
        const topicCount = section.topics.reduce((acc, t) => acc + t.subtopics.length, 0);
        return (
          <motion.div
            key={section.prefix}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Section divider */}
            <div className={`${i > 0 ? "mt-12" : ""} mb-6`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{section.icon}</span>
                <div className="flex-1">
                  <h2 className="font-bold text-lg tracking-tight">{section.heading}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{section.topics.length} modules</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground">{topicCount} subtopics</span>
                  </div>
                </div>
              </div>
              {/* Progress-style decoration bar */}
              <div className="h-1 rounded-full bg-muted overflow-hidden mt-3">
                <motion.div
                  className="h-full rounded-full bg-primary/40"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                />
              </div>
            </div>
            {renderTopics(section.topics, section.prefix)}
          </motion.div>
        );
      })}
    </div>
  );
}
