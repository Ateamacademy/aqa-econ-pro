import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import type { Components } from "react-markdown";
import { extractDiagramBlocks, EconDiagramCanvas } from "./EconDiagramSVG";
import { FigureChart } from "./FigureChart";

interface MathsMarkdownProps {
  children: string;
  className?: string;
}

/** 
 * Extract "Figure N: Title" blocks followed by chart data.
 * Supports: Line-based data, axis labels, AND markdown tables with numeric data.
 */
function extractFigureBlocks(text: string): { type: "text" | "figure"; content: string; figTitle?: string; figDesc?: string }[] {
  const segments: { type: "text" | "figure"; content: string; figTitle?: string; figDesc?: string }[] = [];
  // Match figure header followed by content until next major section
  const figRegex = /(?:^|\n)\s*(?:#{1,4}\s*)?\*{0,2}(Figure\s+\d+[^*\n]*)\*{0,2}\s*\n((?:[\s\S]*?)(?=\n\s*(?:#{1,4}\s+(?!Data|Vertical|Horizontal|Line)|\*{0,2}(?:Figure|Table|Extract)\s|Question\s|Source:|$)))/gi;
  
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  
  while ((match = figRegex.exec(text)) !== null) {
    const desc = match[2].trim();
    // Treat as chart if it has: Line-based data, axis+year data, OR a markdown table with numbers
    const hasLineData = /Line\s+\d+/i.test(desc) && /\d{4}:\s*[\d.]+/i.test(desc);
    const hasSingleSeriesData = /(?:vertical|horizontal)\s*axis:/i.test(desc) && /\d{4}:\s*[\d.]+/i.test(desc);
    const hasMarkdownTable = /\|.*\|.*\|/.test(desc) && /\|\s*[\d,.]+\s*\|/.test(desc);
    
    if (hasLineData || hasSingleSeriesData || hasMarkdownTable) {
      if (match.index > lastIndex) {
        segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }
      segments.push({ type: "figure", content: "", figTitle: match[1].trim(), figDesc: desc });
      lastIndex = match.index + match[0].length;
    }
  }
  
  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }
  
  return segments.length > 0 ? segments : [{ type: "text", content: text }];
}

const markdownComponents: Components = {
  table: ({ children, ...props }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border bg-background shadow-sm">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/60 border-b border-border" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2 text-sm text-foreground/90 border-t border-border/50" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props}>
      {children}
    </tr>
  ),
  p: ({ children, ...props }) => {
    const text = typeof children === "string" ? children : "";
    if (typeof children === "string" && /^Source:/i.test(text.trim())) {
      return (
        <p className="text-[11px] italic text-muted-foreground mt-1 mb-3" {...props}>
          {children}
        </p>
      );
    }
    return <p {...props}>{children}</p>;
  },
  strong: ({ children, ...props }) => {
    const text = typeof children === "string" ? children : "";
    if (/^(Figure|Extract|Table)\s+\w+:?$/i.test(text.trim())) {
      return (
        <strong className="inline-block mt-4 mb-1 px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide border border-primary/20" {...props}>
          {children}
        </strong>
      );
    }
    return <strong {...props}>{children}</strong>;
  },
  ul: ({ children, ...props }) => (
    <ul className="my-2 ml-4 space-y-1 text-sm list-disc marker:text-muted-foreground/60" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <li className="text-sm text-foreground/85 leading-relaxed" {...props}>
      {children}
    </li>
  ),
};

/**
 * Renders markdown with LaTeX math support via KaTeX.
 * Automatically detects and renders economics diagrams as SVG visuals.
 * Renders figure chart descriptions as interactive Recharts line charts.
 */
export function MathsMarkdown({ children, className }: MathsMarkdownProps) {
  // First extract figure charts
  const figSegments = extractFigureBlocks(children);
  const hasFigures = figSegments.some(s => s.type === "figure");

  const renderMarkdownWithDiagrams = (text: string, keyPrefix: string = "") => {
    const segments = extractDiagramBlocks(text);
    const hasDiagrams = segments.some((s) => s.type === "diagram");

    if (!hasDiagrams) {
      return (
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
          {text}
        </ReactMarkdown>
      );
    }

    return segments.map((seg, i) =>
      seg.type === "diagram" ? (
        <EconDiagramCanvas key={`${keyPrefix}d${i}`} diagram={seg.diagram} />
      ) : (
        <ReactMarkdown key={`${keyPrefix}m${i}`} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
          {seg.content}
        </ReactMarkdown>
      )
    );
  };

  if (!hasFigures) {
    return <div className={className}>{renderMarkdownWithDiagrams(children)}</div>;
  }

  return (
    <div className={className}>
      {figSegments.map((seg, i) =>
        seg.type === "figure" ? (
          <FigureChart key={`fig${i}`} title={seg.figTitle!} description={seg.figDesc!} />
        ) : (
          <div key={`txt${i}`}>{renderMarkdownWithDiagrams(seg.content, `s${i}`)}</div>
        )
      )}
    </div>
  );
}
