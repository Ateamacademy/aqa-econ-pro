/**
 * Revision Card System — Color-coded, structured UI components
 * that transform AI output into textbook-quality revision notes.
 * 
 * Color coding:
 * - Definition: Blue
 * - Example: Amber/Yellow  
 * - Diagram: Green
 * - Exam Tip: Red
 * - Formula: Purple
 * - Key Terms: Teal
 */

import { ReactNode } from "react";
import { BookOpen, Lightbulb, AlertTriangle, Calculator, Tag, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Section wrapper ── */
interface SectionProps {
  children: ReactNode;
  className?: string;
}

/* ── Definition Box (Blue) ── */
export function DefinitionBox({ term, children }: { term?: string; children: ReactNode }) {
  return (
    <div className="revision-box revision-definition">
      <div className="revision-box-header">
        <BookOpen className="h-4 w-4" />
        <span>{term ? `Definition: ${term}` : "Definition"}</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </div>
  );
}

/* ── Example Box (Amber) ── */
export function ExampleBox({ children }: SectionProps) {
  return (
    <div className="revision-box revision-example">
      <div className="revision-box-header">
        <Lightbulb className="h-4 w-4" />
        <span>Real-World Example</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </div>
  );
}

/* ── Exam Tip Box (Red) ── */
export function ExamTipBox({ children }: SectionProps) {
  return (
    <div className="revision-box revision-exam-tip">
      <div className="revision-box-header">
        <AlertTriangle className="h-4 w-4" />
        <span>Exam Tip</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </div>
  );
}

/* ── Formula Box (Purple) ── */
export function FormulaBox({ children }: SectionProps) {
  return (
    <div className="revision-box revision-formula">
      <div className="revision-box-header">
        <Calculator className="h-4 w-4" />
        <span>Formula</span>
      </div>
      <div className="revision-box-content font-mono text-base">{children}</div>
    </div>
  );
}

/* ── Key Terms List (Teal) ── */
export function KeyTermsList({ terms }: { terms: { term: string; definition: string }[] }) {
  if (!terms.length) return null;
  return (
    <div className="revision-box revision-key-terms">
      <div className="revision-box-header">
        <Tag className="h-4 w-4" />
        <span>Key Terms</span>
      </div>
      <div className="revision-box-content">
        <dl className="space-y-2">
          {terms.map((t, i) => (
            <div key={i} className="flex gap-2">
              <dt className="font-bold text-sm min-w-[80px] shrink-0">{t.term}</dt>
              <dd className="text-sm opacity-90">{t.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ── Diagram Box (Green) — wraps any diagram component ── */
export function DiagramBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="revision-box revision-diagram">
      <div className="revision-box-header">
        <TrendingUp className="h-4 w-4" />
        <span>{title || "Key Diagram"}</span>
      </div>
      <div className="revision-box-content">{children}</div>
    </div>
  );
}

/* ── Analysis Chain (numbered reasoning steps) ── */
export function AnalysisChain({ steps }: { steps: string[] }) {
  if (!steps.length) return null;
  return (
    <div className="revision-box revision-analysis">
      <div className="revision-box-header">
        <TrendingUp className="h-4 w-4" />
        <span>Chain of Reasoning</span>
      </div>
      <div className="revision-box-content">
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start text-sm">
              <span className="revision-step-number">{i + 1}</span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
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
    <div className={cn("revision-topic-card", className)}>
      <h2 className="revision-topic-title">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
