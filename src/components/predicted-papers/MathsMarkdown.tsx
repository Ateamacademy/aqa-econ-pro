import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
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
 * Pre-process markdown text to ensure tables render correctly.
 * ReactMarkdown requires blank lines before/after table blocks.
 * Handles both properly-formatted multi-line tables AND single-line
 * concatenated tables from streaming output.
 */
function preprocessMarkdown(text: string): string {
  // Step 1: Detect if a table separator row exists on a line that also has data
  // (i.e. the whole table was concatenated onto one line)
  // Pattern: find separator row like |---|---| and count its columns
  const sepMatch = text.match(/\|[\s\-:]+(?:\|[\s\-:]+)+\|/);
  if (sepMatch) {
    const colCount = sepMatch[0].split("|").length - 1; // number of columns (pipes - 1 for outer)
    if (colCount >= 2) {
      // Build regex to split rows: match sequences of colCount cells forming a complete row
      // A row = | cell | cell | ... | (colCount pipes total including outer)
      // We need to split when a closing | is followed by whitespace then opening | of next row
      // BUT NOT between cells within the same row
      // Strategy: count pipes - after every (colCount) pipes, that's a row boundary
      const chars = text.split('');
      let pipePositions: number[] = [];
      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '|') pipePositions.push(i);
      }
      
      // Find the separator in the original text
      const sepStart = text.indexOf(sepMatch[0]);
      const sepEnd = sepStart + sepMatch[0].length;
      
      // Check if the line containing the separator also has other table rows
      const lineOfSep = text.substring(
        text.lastIndexOf('\n', sepStart) + 1,
        text.indexOf('\n', sepEnd) === -1 ? text.length : text.indexOf('\n', sepEnd)
      );
      
      const pipesInLine = (lineOfSep.match(/\|/g) || []).length;
      // If this line has more pipes than a single row, the table is concatenated
      if (pipesInLine > colCount) {
        // Reconstruct: split by groups of colCount pipes
        let result = '';
        let lastEnd = 0;
        let count = 0;
        
        // Find the start of the table block (first | before the separator)
        let tableStart = sepStart;
        while (tableStart > 0 && text[tableStart - 1] !== '\n') tableStart--;
        // Find the last | that's part of the table
        // Work through the text from tableStart
        result = text.substring(0, tableStart);
        
        let pos = tableStart;
        count = 0;
        let rowStart = pos;
        while (pos < text.length) {
          if (text[pos] === '|') {
            count++;
            if (count === colCount) {
              // End of a row
              result += text.substring(rowStart, pos + 1) + '\n';
              count = 0;
              // Skip whitespace until next | or non-table content
              let next = pos + 1;
              while (next < text.length && (text[next] === ' ' || text[next] === '\n')) next++;
              if (next < text.length && text[next] === '|') {
                rowStart = next;
                pos = next;
              } else {
                // End of table
                rowStart = next;
                pos = next;
                break;
              }
            } else {
              pos++;
            }
          } else {
            pos++;
          }
        }
        if (rowStart < text.length) {
          result += text.substring(rowStart);
        }
        text = result;
      }
    }
  }

  // Step 2: Ensure blank lines around table blocks so ReactMarkdown parses them
  const lines = text.split("\n");
  const output: string[] = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isTableRow = line.trim().startsWith("|") && line.trim().endsWith("|") && line.trim().length > 2;

    if (isTableRow && !inTable) {
      if (output.length > 0 && output[output.length - 1].trim() !== "") {
        output.push("");
      }
      inTable = true;
    } else if (!isTableRow && inTable) {
      if (output.length > 0 && output[output.length - 1].trim() !== "") {
        output.push("");
      }
      inTable = false;
    }

    output.push(line);
  }

  return output.join("\n");
}

/** 
 * Extract "Figure N: Title" blocks followed by chart data.
 * Supports: Line-based data, axis labels, markdown tables with numeric data,
 * AND bullet-point data (e.g. "At 0.5% interest, monthly payment is £650").
 */
function extractFigureBlocks(text: string): { type: "text" | "figure"; content: string; figTitle?: string; figDesc?: string }[] {
  const segments: { type: "text" | "figure"; content: string; figTitle?: string; figDesc?: string }[] = [];
  // Match figure header followed by content until next major section
  const figRegex = /(?:^|\n)\s*(?:#{1,4}\s*)?\*{0,2}(Figure\s+\d+[^*\n]*)\*{0,2}\s*\n((?:[\s\S]*?)(?=\n\s*(?:#{1,4}\s+(?!Data|Vertical|Horizontal|Line)|\*{0,2}(?:Figure|Table|Extract)\s|Question\s|Source:|$)))/gi;
  
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  
  while ((match = figRegex.exec(text)) !== null) {
    const desc = match[2].trim();
    // Treat as chart if it has: Line-based data, axis+year data, markdown table with numbers,
    // OR bullet-point data with values (e.g. "At 0.5% interest, monthly payment is £650")
    const hasLineData = /Line\s+\d+/i.test(desc) && /\d{4}:\s*[\d.]+/i.test(desc);
    const hasSingleSeriesData = /(?:vertical|horizontal)\s*axis:/i.test(desc) && /\d{4}:\s*[\d.]+/i.test(desc);
    const hasMarkdownTable = /\|.*\|.*\|/.test(desc) && /\|\s*[\d,.]+\s*\|/.test(desc);
    const hasBulletData = /(?:vertical|horizontal)\s*axis:/i.test(desc) && /(?:at\s+[\d.]+%?|[\d.]+%?\s*(?:interest|rate))[^£$€\d]*[£$€]?\s*[\d,]+/i.test(desc);
    
    if (hasLineData || hasSingleSeriesData || hasMarkdownTable || hasBulletData) {
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
    // Style Extract/Figure/Table headers as badges
    if (/^(Figure|Extract|Table)\s+\w+/i.test(text.trim())) {
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
 * Pre-processes markdown to ensure tables always render correctly.
 */
export function MathsMarkdown({ children, className }: MathsMarkdownProps) {
  // Pre-process to fix table formatting
  const processedText = preprocessMarkdown(children);

  // First extract figure charts
  const figSegments = extractFigureBlocks(processedText);
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
    return <div className={className}>{renderMarkdownWithDiagrams(processedText)}</div>;
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
