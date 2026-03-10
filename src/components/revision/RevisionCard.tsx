/**
 * Revision Card System — Color-coded, structured UI components
 * with smooth animations for a dynamic infographic-style experience.
 */

import { ReactNode } from "react";
import { BookOpen, Lightbulb, AlertTriangle, Calculator, Tag, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ── Section wrapper ── */
interface SectionProps {
  children: ReactNode;
  className?: string;
}

const boxVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/* ── Definition Box (Blue) ── */
export function DefinitionBox({ term, children }: { term?: string; children: ReactNode }) {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      className="revision-box revision-definition"
    >
      <div className="revision-box-header">
        <BookOpen className="h-4 w-4" />
        <span>{term ? `Definition: ${term}` : "Definition"}</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </motion.div>
  );
}

/* ── Example Box (Amber) ── */
export function ExampleBox({ children }: SectionProps) {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.4, 0.25, 1] }}
      className="revision-box revision-example"
    >
      <div className="revision-box-header">
        <Lightbulb className="h-4 w-4" />
        <span>Real-World Example</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </motion.div>
  );
}

/* ── Exam Tip Box (Red) ── */
export function ExamTipBox({ children }: SectionProps) {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className="revision-box revision-exam-tip"
    >
      <div className="revision-box-header">
        <AlertTriangle className="h-4 w-4" />
        <span>Exam Tip</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </motion.div>
  );
}

/* ── Formula Box (Purple) ── */
export function FormulaBox({ children }: SectionProps) {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35, delay: 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      className="revision-box revision-formula"
    >
      <div className="revision-box-header">
        <Calculator className="h-4 w-4" />
        <span>Formula</span>
      </div>
      <div className="revision-box-content font-mono text-base">{children}</div>
    </motion.div>
  );
}

/* ── Key Terms List (Teal) ── */
export function KeyTermsList({ terms }: { terms: { term: string; definition: string }[] }) {
  if (!terms.length) return null;
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35, delay: 0.04, ease: [0.25, 0.4, 0.25, 1] }}
      className="revision-box revision-key-terms"
    >
      <div className="revision-box-header">
        <Tag className="h-4 w-4" />
        <span>Key Terms</span>
      </div>
      <div className="revision-box-content">
        <dl className="space-y-2">
          {terms.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="flex gap-2"
            >
              <dt className="font-bold text-sm min-w-[80px] shrink-0">{t.term}</dt>
              <dd className="text-sm opacity-90">{t.definition}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </motion.div>
  );
}

/* ── Diagram Box (Green) — wraps any diagram component ── */
export function DiagramBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className="revision-box revision-diagram"
    >
      <div className="revision-box-header">
        <TrendingUp className="h-4 w-4" />
        <span>{title || "Key Diagram"}</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </motion.div>
  );
}

/* ── Analysis Chain (numbered reasoning steps) ── */
export function AnalysisChain({ steps }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.35 }}
      className="revision-box revision-analysis"
    >
      <div className="revision-box-header">
        <TrendingUp className="h-4 w-4" />
        <span>Chain of Reasoning</span>
      </div>
      <div className="revision-box-content">
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex gap-3 items-start text-sm"
            >
              <span className="revision-step-number">{i + 1}</span>
              <span className="leading-relaxed">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

/* ── Full Revision Topic Card ── */
export function RevisionTopicCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn("revision-topic-card", className)}
    >
      <h2 className="revision-topic-title">{title}</h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}
