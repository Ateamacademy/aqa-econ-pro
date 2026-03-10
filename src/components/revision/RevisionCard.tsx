/**
 * Revision Card System — Notebook-style handwritten aesthetic
 * with dynamic writing animations for a live-lesson experience.
 */

import { ReactNode, useEffect, useRef, useState } from "react";
import { BookOpen, Lightbulb, AlertTriangle, Calculator, Tag, TrendingUp, Pen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

/* ── Animated writing wrapper — reveals children as if being written ── */
function WritingReveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Handwritten section header with highlighter ── */
function HandwrittenHeader({
  icon: Icon,
  label,
  color,
  highlightColor,
}: {
  icon: any;
  label: string;
  color: string;
  highlightColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", color)}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <span className={cn(
        "font-handwriting text-base font-semibold tracking-tight",
        highlightColor || ""
      )}>
        {label}
      </span>
      <motion.div
        className="flex-1 h-[2px] rounded-full opacity-30"
        style={{ background: `hsl(var(--primary))` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        layoutId={undefined}
      />
    </div>
  );
}

/* ── Definition Box (Blue) — notebook style ── */
export function DefinitionBox({ term, children }: { term?: string; children: ReactNode }) {
  return (
    <WritingReveal>
      <div className="revision-box revision-definition">
        <HandwrittenHeader
          icon={BookOpen}
          label={term ? `Definition: ${term}` : "Definition"}
          color="bg-[hsl(var(--revision-blue)/0.15)] text-[hsl(var(--revision-blue))]"
        />
        <div className="revision-box-content notebook-paper notebook-margin pl-6">
          <div className="animate-write-fade">{children}</div>
        </div>
      </div>
    </WritingReveal>
  );
}

/* ── Example Box (Amber) — sticky note style ── */
export function ExampleBox({ children }: { children: ReactNode }) {
  return (
    <WritingReveal delay={0.05}>
      <div className="revision-box revision-example relative">
        <HandwrittenHeader
          icon={Lightbulb}
          label="Real-World Example"
          color="bg-[hsl(var(--revision-amber)/0.15)] text-[hsl(var(--revision-amber))]"
        />
        <div className="revision-box-content">
          <div className="sticky-note font-handwriting-alt text-[0.925rem] leading-[1.7]">
            {children}
          </div>
        </div>
      </div>
    </WritingReveal>
  );
}

/* ── Exam Tip Box (Red) — urgent callout style ── */
export function ExamTipBox({ children }: { children: ReactNode }) {
  return (
    <WritingReveal delay={0.1}>
      <div className="revision-box revision-exam-tip">
        <HandwrittenHeader
          icon={AlertTriangle}
          label="⚠ Exam Tip"
          color="bg-[hsl(var(--revision-red)/0.15)] text-[hsl(var(--revision-red))]"
          highlightColor="highlighter-pink"
        />
        <div className="revision-box-content notebook-paper pl-5">
          <div className="border-l-4 border-[hsl(var(--revision-red)/0.3)] pl-3 animate-write-fade">
            {children}
          </div>
        </div>
      </div>
    </WritingReveal>
  );
}

/* ── Formula Box (Purple) — chalkboard style ── */
export function FormulaBox({ children }: { children: ReactNode }) {
  return (
    <WritingReveal delay={0.08}>
      <div className="revision-box revision-formula">
        <HandwrittenHeader
          icon={Calculator}
          label="Formula"
          color="bg-[hsl(var(--revision-purple)/0.15)] text-[hsl(var(--revision-purple))]"
        />
        <div className="revision-box-content bg-[hsl(var(--foreground)/0.03)]">
          <div className="font-handwriting text-lg text-center py-2 animate-write-in italic">
            {children}
          </div>
        </div>
      </div>
    </WritingReveal>
  );
}

/* ── Key Terms List (Teal) — index card style ── */
export function KeyTermsList({ terms }: { terms: { term: string; definition: string }[] }) {
  if (!terms.length) return null;
  return (
    <WritingReveal delay={0.04}>
      <div className="revision-box revision-key-terms">
        <HandwrittenHeader
          icon={Tag}
          label="Key Terms"
          color="bg-[hsl(var(--revision-teal)/0.15)] text-[hsl(var(--revision-teal))]"
        />
        <div className="revision-box-content">
          <dl className="space-y-3">
            {terms.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex gap-3 items-start"
              >
                <dt className="font-handwriting font-bold text-base min-w-[100px] shrink-0 dynamic-highlight">
                  {t.term}
                </dt>
                <dd className="text-sm opacity-90 pt-0.5 font-handwriting-alt text-[0.925rem] leading-[1.7]">
                  {t.definition}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </WritingReveal>
  );
}

/* ── Diagram Box (Green) — wraps any diagram component ── */
export function DiagramBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <WritingReveal delay={0.1}>
      <div className="revision-box revision-diagram">
        <HandwrittenHeader
          icon={TrendingUp}
          label={title || "Key Diagram"}
          color="bg-[hsl(var(--revision-green)/0.15)] text-[hsl(var(--revision-green))]"
        />
        <div className="revision-box-content">{children}</div>
      </div>
    </WritingReveal>
  );
}

/* ── Analysis Chain (numbered reasoning steps) ── */
export function AnalysisChain({ steps }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
    <WritingReveal>
      <div className="revision-box revision-analysis">
        <HandwrittenHeader
          icon={Pen}
          label="Chain of Reasoning"
          color="bg-[hsl(var(--primary)/0.15)] text-primary"
        />
        <div className="revision-box-content notebook-paper notebook-margin pl-6">
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
                className="flex gap-3 items-start"
              >
                <span className="revision-step-number font-handwriting text-base">{i + 1}</span>
                <span className="font-handwriting-alt text-base leading-relaxed">{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </WritingReveal>
  );
}

/* ── Full Revision Topic Card — notebook page ── */
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
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn("revision-topic-card", className)}
    >
      {/* Notebook hole decorations */}
      <div className="absolute left-3 top-4 flex flex-col gap-6">
        <div className="w-3 h-3 rounded-full border-2 border-border opacity-30" />
        <div className="w-3 h-3 rounded-full border-2 border-border opacity-30" />
      </div>
      <div className="pl-5">
        <h2 className="revision-topic-title handwritten-underline">{title}</h2>
        <div className="space-y-4">{children}</div>
      </div>
    </motion.div>
  );
}
