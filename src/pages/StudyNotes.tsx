import { useState, useEffect } from "react";
import { useSubject } from "@/contexts/SubjectContext";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronDown, ChevronRight, Search } from "lucide-react";
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

// Data imports
import { aqaPaper1Topics, aqaPaper2Topics } from "@/data/studyNotes/aqaNotes";
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
}

type Subject = import("@/contexts/SubjectContext").Subject;

const paperSections: Record<Subject, PaperSection[]> = {
  economics: [
    { heading: "Paper 1 — Markets & Market Failure", topics: econPaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — National & International Economy", topics: econPaper2Topics, prefix: "p2" },
  ],
  "edexcel-a": [
    { heading: "Paper 1 — Markets & Business Behaviour", topics: edexcelAPaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — The National & Global Economy", topics: edexcelAPaper2Topics, prefix: "p2" },
  ],
  "edexcel-b": [
    { heading: "Paper 1 — Markets, Consumers & Firms", topics: edexcelBPaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — The Wider Economic Environment", topics: edexcelBPaper2Topics, prefix: "p2" },
  ],
  "ocr": [
    { heading: "Component 01 — Microeconomics", topics: ocrComponent1Topics, prefix: "c1" },
    { heading: "Component 02 — Macroeconomics", topics: ocrComponent2Topics, prefix: "c2" },
  ],
  "cambridge": [
    { heading: "Paper 1 & 2 — AS Level (Micro & Macro)", topics: caiePaper1Topics, prefix: "p1" },
    { heading: "Paper 3 & 4 — A2 Level (Advanced)", topics: caiePaper2Topics, prefix: "p2" },
  ],
  "aqa-gcse": [
    { heading: "Paper 1 — How Markets Work", topics: gcsePaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — How the Economy Works", topics: gcsePaper2Topics, prefix: "p2" },
  ],
  "cambridge-igcse": [
    { heading: "Paper 1 — Multiple Choice & Core Topics", topics: igcsePart1Topics, prefix: "p1" },
    { heading: "Paper 2 — Structured Questions & Extended Topics", topics: igcsePart2Topics, prefix: "p2" },
  ],
};

export default function StudyNotes() {
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => { setExpanded({}); }, [subject]);

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const renderSubtopic = (sub: Subtopic) => {
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
        </div>
      );
    }
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
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
    }).map((topic) => {
      const key = `${prefix}-${topic.name}`;
      const isOpen = expanded[key];
      return (
        <div key={key} className="mb-4">
          <button onClick={() => toggle(key)} className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-muted/50 transition-colors rounded-xl border border-border bg-card">
            {isOpen ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            <h3 className="font-bold text-base tracking-tight">{topic.name}</h3>
            <span className="text-xs text-muted-foreground ml-auto">{topic.subtopics.length} topics</span>
          </button>
          {isOpen && (
            <div className="mt-3 ml-4 space-y-6">
              {topic.subtopics.filter(s => {
                if (!search) return true;
                const q = search.toLowerCase();
                return s.title.toLowerCase().includes(q) ||
                  (s.definition || "").toLowerCase().includes(q) ||
                  (s.content || "").toLowerCase().includes(q);
              }).map((sub) => (
                <RevisionTopicCard key={sub.title} title={sub.title}>
                  {renderSubtopic(sub)}
                </RevisionTopicCard>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const sections = paperSections[subject];

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Study Notes</h1>
        <p className="text-sm text-muted-foreground">{examBoard} {level} {subjectLabel} — structured revision notes with diagrams, key terms & exam tips</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search topics, terms, definitions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-full h-11" />
      </div>

      {sections.map((section, i) => (
        <div key={section.prefix}>
          <h2 className={`font-bold text-xl mb-4 flex items-center gap-2 ${i > 0 ? "mt-10" : ""}`}>
            <BookOpen className="h-5 w-5 text-primary" /> {section.heading}
          </h2>
          {renderTopics(section.topics, section.prefix)}
        </div>
      ))}
    </div>
  );
}
