import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MathsMarkdownProps {
  children: string;
  className?: string;
}

/**
 * Renders markdown with LaTeX math support via KaTeX.
 * Inline math: $...$  or \(...\)
 * Display math: $$...$$ or \[...\]
 */
export function MathsMarkdown({ children, className }: MathsMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
