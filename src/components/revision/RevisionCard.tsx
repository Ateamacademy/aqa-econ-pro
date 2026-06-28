/**
 * Revision Card System · editorial notes aesthetic.
 * Colour-coded callouts driven by the --n-* design tokens, so they render
 * dark-native by default and adapt inside a light reading surface. Shared by
 * Study Notes, the 24/7 tutor and predicted-paper feedback.
 */

import { ReactNode, useRef } from "react";
import { BookOpen, Lightbulb, AlertTriangle, Calculator, Tag, TrendingUp, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { AnimatedDiagram } from "./AnimatedDiagram";

/* ── Subtle reveal-on-scroll wrapper ── */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Editorial callout label (icon chip + uppercase label) ── */
function CalloutLabel({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="note-callout-label">
      <span className="ni"><Icon className="h-4 w-4" /></span>
      {label}
    </div>
  );
}

/* ── Definition (indigo) ── */
export function DefinitionBox({ term, children }: { term?: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="note-callout nc-def">
        <CalloutLabel icon={BookOpen} label={term ? `Definition · ${term}` : "Definition"} />
        <div className="note-callout-body">{children}</div>
      </div>
    </Reveal>
  );
}

/* ── Real-world example (green) ── */
export function ExampleBox({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={0.05}>
      <div className="note-callout nc-ex">
        <CalloutLabel icon={Lightbulb} label="Real-world case" />
        <div className="note-callout-body">{children}</div>
      </div>
    </Reveal>
  );
}

/* ── Exam tip (amber) ── */
export function ExamTipBox({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={0.1}>
      <div className="note-callout nc-tip">
        <CalloutLabel icon={AlertTriangle} label="Examiner tip" />
        <div className="note-callout-body">{children}</div>
      </div>
    </Reveal>
  );
}

/* ── Formula (violet) ── */
export function FormulaBox({ children }: { children: ReactNode }) {
  return (
    <Reveal delay={0.08}>
      <div className="note-callout nc-formula">
        <CalloutLabel icon={Calculator} label="Formula" />
        <div className="note-callout-body note-formula-body">{children}</div>
      </div>
    </Reveal>
  );
}

/* ── Key terms (grid) ── */
export function KeyTermsList({ terms }: { terms: { term: string; definition: string }[] }) {
  if (!terms.length) return null;
  return (
    <Reveal delay={0.04}>
      <div className="space-y-3">
        <div className="note-callout-label" style={{ color: "hsl(var(--n-fg-strong))" }}>
          <span className="ni" style={{ background: "hsl(var(--accent) / 0.16)", color: "hsl(var(--accent))" }}>
            <Tag className="h-4 w-4" />
          </span>
          Key terms
        </div>
        <div className="grid gap-2.5">
          {terms.map((t, i) => (
            <div key={i} className="note-keyterm">
              <span className="kt-term">{t.term}</span>
              <span className="kt-def">{t.definition}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ── Diagram (always-dark "screen" card) ── */
export function DiagramBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Reveal delay={0.1}>
      <div className="note-diagram-card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "hsl(var(--success) / 0.18)", color: "hsl(var(--success))" }}>
            <TrendingUp className="h-4 w-4" />
          </span>
          <h4 className="ndc-title font-display text-base font-semibold">{title || "Key diagram"}</h4>
        </div>
        <div className="text-sm" style={{ color: "#C8CCE0" }}>
          <AnimatedDiagram>{children}</AnimatedDiagram>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Analysis chain (numbered reasoning) ── */
export function AnalysisChain({ steps }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
    <Reveal>
      <div className="note-callout nc-def">
        <CalloutLabel icon={GitBranch} label="Chain of reasoning" />
        <ol className="space-y-2.5 mt-1">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start note-callout-body">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold mt-0.5"
                style={{ background: "hsl(var(--primary) / 0.16)", color: "hsl(var(--primary))" }}
              >
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

/* ── Full subtopic card ── */
export function RevisionTopicCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn("note-card p-5 md:p-6", className)}
    >
      <h2 className="note-card-title font-display text-2xl font-semibold tracking-tight mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}
