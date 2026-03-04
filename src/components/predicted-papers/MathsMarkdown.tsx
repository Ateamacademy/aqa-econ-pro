import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import type { Components } from "react-markdown";
import { extractDiagramBlocks, EconDiagramCanvas } from "./EconDiagramSVG";

interface MathsMarkdownProps {
  children: string;
  className?: string;
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
 */
export function MathsMarkdown({ children, className }: MathsMarkdownProps) {
  const segments = extractDiagramBlocks(children);
  const hasDiagrams = segments.some((s) => s.type === "diagram");

  if (!hasDiagrams) {
    return (
      <div className={className}>
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
          {children}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={className}>
      {segments.map((seg, i) =>
        seg.type === "diagram" ? (
          <EconDiagramCanvas key={i} diagram={seg.diagram} />
        ) : (
          <ReactMarkdown key={i} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
            {seg.content}
          </ReactMarkdown>
        )
      )}
    </div>
  );
}
