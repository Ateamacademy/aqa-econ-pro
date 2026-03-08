/**
 * RevisionRenderer — Parses AI markdown responses and extracts
 * structured blocks (definitions, examples, exam tips, diagrams, formulas)
 * then renders them using color-coded RevisionCard components.
 * 
 * This is the "Style Engine" layer that transforms raw AI output
 * into textbook-quality revision notes.
 */

import { useMemo } from "react";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import {
  DefinitionBox,
  ExampleBox,
  ExamTipBox,
  FormulaBox,
  KeyTermsList,
  DiagramBox,
  AnalysisChain,
} from "./RevisionCard";
import { EconDiagramTemplate, resolveDiagramType, type DiagramType } from "./EconDiagramLibrary";

interface RevisionRendererProps {
  content: string;
  className?: string;
}

interface Block {
  type: "text" | "definition" | "example" | "exam_tip" | "key_point" | "formula" | "diagram" | "chain" | "key_terms";
  content: string;
  meta?: string;
}

/**
 * Parse markdown content and extract structured revision blocks.
 * Looks for patterns like:
 * - > 📝 **Key Point:** ...
 * - > 💡 **Exam Tip:** ...
 * - ### Definition / **Definition:**
 * - ### Example / **Example:**
 * - ### Formula
 * - **Diagram:** type_name or [DIAGRAM: type_name]
 * - ### Chain of Reasoning (numbered list follows)
 */
function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.split("\n");
  let i = 0;
  let textBuffer: string[] = [];

  const flushText = () => {
    if (textBuffer.length > 0) {
      const content = textBuffer.join("\n").trim();
      if (content) blocks.push({ type: "text", content });
      textBuffer = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Key Point callout: > 📝 **Key Point:** ...
    if (/^>\s*📝\s*\*?\*?Key\s*Point\*?\*?:?\s*/i.test(trimmed)) {
      flushText();
      const content = trimmed.replace(/^>\s*📝\s*\*?\*?Key\s*Point\*?\*?:?\s*/i, "").trim();
      // Collect continuation lines
      let full = content;
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith(">")) {
        i++;
        full += " " + lines[i].trim().replace(/^>\s*/, "");
      }
      blocks.push({ type: "key_point", content: full });
      i++;
      continue;
    }

    // Exam Tip callout: > 💡 **Exam Tip:** ...
    if (/^>\s*💡\s*\*?\*?Exam\s*Tip\*?\*?:?\s*/i.test(trimmed)) {
      flushText();
      const content = trimmed.replace(/^>\s*💡\s*\*?\*?Exam\s*Tip\*?\*?:?\s*/i, "").trim();
      let full = content;
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith(">")) {
        i++;
        full += " " + lines[i].trim().replace(/^>\s*/, "");
      }
      blocks.push({ type: "exam_tip", content: full });
      i++;
      continue;
    }

    // Definition heading: ### Definition or **Definition:**
    if (/^#{2,4}\s*Definition/i.test(trimmed) || /^\*\*Definition:?\*\*/i.test(trimmed)) {
      flushText();
      const headerContent = trimmed.replace(/^#{2,4}\s*Definition:?\s*/i, "").replace(/^\*\*Definition:?\*\*:?\s*/i, "").trim();
      let content = headerContent;
      i++;
      // Collect body until next heading or empty double-line
      while (i < lines.length) {
        const next = lines[i].trim();
        if (/^#{2,4}\s/.test(next) || /^\*\*(?:Example|Exam\s*Tip|Formula|Diagram|Key\s*Terms|Chain)/i.test(next) || /^>\s*[📝💡]/.test(next)) break;
        if (next === "" && i + 1 < lines.length && lines[i + 1].trim() === "") break;
        content += "\n" + lines[i];
        i++;
      }
      blocks.push({ type: "definition", content: content.trim() });
      continue;
    }

    // Example heading
    if (/^#{2,4}\s*(?:Real[- ]?World\s*)?Example/i.test(trimmed) || /^\*\*(?:Real[- ]?World\s*)?Example:?\*\*/i.test(trimmed)) {
      flushText();
      let content = "";
      i++;
      while (i < lines.length) {
        const next = lines[i].trim();
        if (/^#{2,4}\s/.test(next) || /^\*\*(?:Definition|Exam\s*Tip|Formula|Diagram|Key\s*Terms|Chain)/i.test(next) || /^>\s*[📝💡]/.test(next)) break;
        if (next === "" && i + 1 < lines.length && lines[i + 1].trim() === "") break;
        content += "\n" + lines[i];
        i++;
      }
      blocks.push({ type: "example", content: content.trim() });
      continue;
    }

    // Formula heading
    if (/^#{2,4}\s*Formula/i.test(trimmed) || /^\*\*Formula:?\*\*/i.test(trimmed)) {
      flushText();
      let content = "";
      i++;
      while (i < lines.length) {
        const next = lines[i].trim();
        if (/^#{2,4}\s/.test(next) || /^\*\*(?:Definition|Example|Exam\s*Tip|Diagram|Key\s*Terms|Chain)/i.test(next) || /^>\s*[📝💡]/.test(next)) break;
        if (next === "" && i + 1 < lines.length && lines[i + 1].trim() === "") break;
        content += "\n" + lines[i];
        i++;
      }
      blocks.push({ type: "formula", content: content.trim() });
      continue;
    }

    // Diagram reference: **Diagram:** type or [DIAGRAM: type] or ### Diagram
    const diagramMatch = trimmed.match(/(?:\*\*Diagram:?\*\*:?\s*|^\[DIAGRAM:\s*|\#{2,4}\s*(?:Key\s*)?Diagram:?\s*)(\w[\w\s]*)/i);
    if (diagramMatch) {
      flushText();
      const rawType = diagramMatch[1].trim();
      const resolved = resolveDiagramType(rawType);
      if (resolved) {
        blocks.push({ type: "diagram", content: resolved, meta: rawType });
      } else {
        // Collect description lines for fallback rendering
        let content = "";
        i++;
        while (i < lines.length) {
          const next = lines[i].trim();
          if (/^#{2,4}\s/.test(next) || /^\*\*(?:Definition|Example|Exam\s*Tip|Formula|Key\s*Terms)/i.test(next) || /^>\s*[📝💡]/.test(next)) break;
          if (next === "" && i + 1 < lines.length && lines[i + 1].trim() === "") break;
          content += "\n" + lines[i];
          i++;
        }
        blocks.push({ type: "text", content: `**Diagram: ${rawType}**\n${content}`.trim() });
      }
      i++;
      continue;
    }

    // Exam Tip heading (non-callout)
    if (/^#{2,4}\s*Exam\s*Tip/i.test(trimmed) || /^\*\*Exam\s*Tip:?\*\*/i.test(trimmed)) {
      flushText();
      let content = "";
      i++;
      while (i < lines.length) {
        const next = lines[i].trim();
        if (/^#{2,4}\s/.test(next) || /^\*\*(?:Definition|Example|Formula|Diagram|Key\s*Terms|Chain)/i.test(next) || /^>\s*[📝💡]/.test(next)) break;
        if (next === "" && i + 1 < lines.length && lines[i + 1].trim() === "") break;
        content += "\n" + lines[i];
        i++;
      }
      blocks.push({ type: "exam_tip", content: content.trim() });
      continue;
    }

    // Default: collect as text
    textBuffer.push(line);
    i++;
  }

  flushText();
  return blocks;
}

export function RevisionRenderer({ content, className }: RevisionRendererProps) {
  const blocks = useMemo(() => parseBlocks(content), [content]);

  // If no structured blocks found (just text), fall back to regular markdown
  const hasStructuredBlocks = blocks.some(b => b.type !== "text");

  if (!hasStructuredBlocks) {
    return (
      <div className={className}>
        <div className="ai-response">
          <MathsMarkdown>{content}</MathsMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "definition":
              return (
                <DefinitionBox key={i}>
                  <MathsMarkdown>{block.content}</MathsMarkdown>
                </DefinitionBox>
              );
            case "example":
              return (
                <ExampleBox key={i}>
                  <MathsMarkdown>{block.content}</MathsMarkdown>
                </ExampleBox>
              );
            case "exam_tip":
              return (
                <ExamTipBox key={i}>
                  <MathsMarkdown>{block.content}</MathsMarkdown>
                </ExamTipBox>
              );
            case "key_point":
              return (
                <DefinitionBox key={i} term="Key Point">
                  <MathsMarkdown>{block.content}</MathsMarkdown>
                </DefinitionBox>
              );
            case "formula":
              return (
                <FormulaBox key={i}>
                  <MathsMarkdown>{block.content}</MathsMarkdown>
                </FormulaBox>
              );
            case "diagram":
              return (
                <DiagramBox key={i} title={block.meta}>
                  <EconDiagramTemplate type={block.content as DiagramType} />
                </DiagramBox>
              );
            case "text":
            default:
              return (
                <div key={i} className="ai-response">
                  <MathsMarkdown>{block.content}</MathsMarkdown>
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}
