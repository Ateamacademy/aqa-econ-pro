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
 * Extract markdown table blocks from text and return segments of text vs table.
 * This ensures tables always render correctly regardless of remark plugin issues.
 */
function extractTableBlocks(text: string): { type: "text" | "table"; content: string }[] {
  const lines = text.split("\n");
  const segments: { type: "text" | "table"; content: string }[] = [];
  let i = 0;
  let textBuffer: string[] = [];

  const flushText = () => {
    if (textBuffer.length > 0) {
      segments.push({ type: "text", content: textBuffer.join("\n") });
      textBuffer = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i].trim();
    // Detect start of a markdown table: line starts and ends with |
    if (line.startsWith("|") && line.endsWith("|") && line.length > 2) {
      // Look ahead: need at least header + separator + 1 data row
      const tableLines: string[] = [lines[i]];
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (nextLine.startsWith("|") && nextLine.endsWith("|") && nextLine.length > 2) {
          tableLines.push(lines[j]);
          j++;
        } else {
          break;
        }
      }
      // Check if we have a valid table (at least 3 rows with a separator)
      const hasSeparator = tableLines.some(l => /^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(l.trim()));
      if (tableLines.length >= 3 && hasSeparator) {
        flushText();
        segments.push({ type: "table", content: tableLines.join("\n") });
        i = j;
        continue;
      }
    }
    textBuffer.push(lines[i]);
    i++;
  }
  flushText();
  return segments;
}

/**
 * Render a markdown table string as a styled HTML table.
 */
function RenderedTable({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n").map(l => l.trim()).filter(Boolean);
  const sepIdx = lines.findIndex(l => /^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(l));
  if (sepIdx < 1) return null;

  const parseCells = (row: string) =>
    row.split("|").slice(1, -1).map(c => c.trim());

  const headers = parseCells(lines[sepIdx - 1]);
  const dataRows = lines.slice(sepIdx + 1).map(parseCells);

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border bg-background shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 border-b border-border">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, ri) => (
            <tr key={ri} className="hover:bg-muted/30 transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2 text-sm text-foreground/90 border-t border-border/50">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Parse a figure description that describes S&D / AD-AS curves into DiagramProps.
 */
function parseFigureAsDiagram(title: string, desc: string): import("./EconDiagramSVG").DiagramProps | null {
  const lower = desc.toLowerCase();
  
  // Detect S&D curve references: D₀/S₀, D0/S0, demand/supply curves
  const hasCurveRefs = /[ds][₀₁01]/i.test(desc) || (/demand/i.test(lower) && /supply/i.test(lower) && /shift/i.test(lower));
  const hasAxes = /(?:vertical|horizontal)\s*axis/i.test(desc);
  
  if (!hasCurveRefs || !hasAxes) return null;
  
  // Extract axis labels
  const vMatch = desc.match(/vertical\s*axis:\s*(.+)/i);
  const hMatch = desc.match(/horizontal\s*axis:\s*(.+)/i);
  const yAxis = vMatch?.[1]?.trim() || "Price (P)";
  const xAxis = hMatch?.[1]?.trim() || "Quantity (Q)";
  
  // Determine shift type and direction
  let shift = "";
  let conclusion = "";
  
  const demandRight = /demand\b[^.]*shift[^.]*right/i.test(lower) || /demand\b[^.]*increase/i.test(lower);
  const demandLeft = /demand\b[^.]*shift[^.]*left/i.test(lower) || /demand\b[^.]*decrease/i.test(lower);
  const supplyRight = /supply\b[^.]*shift[^.]*right/i.test(lower) || /supply\b[^.]*increase/i.test(lower);
  const supplyLeft = /supply\b[^.]*shift[^.]*left/i.test(lower) || /supply\b[^.]*decrease/i.test(lower);
  
  // Check for "both shift" or "more pronounced" patterns
  const bothShift = (demandRight || demandLeft) && (supplyRight || supplyLeft);
  const demandMorePronounced = /demand\b[^.]*more\s+pronounced/i.test(lower);
  
  if (bothShift && demandMorePronounced) {
    // Both shift right but demand more – net effect is demand shift right
    shift = "Demand shifts right (more pronounced than supply shift)";
  } else if (demandRight) {
    shift = "Demand shifts right";
  } else if (demandLeft) {
    shift = "Demand shifts left";
  } else if (supplyRight) {
    shift = "Supply shifts right";
  } else if (supplyLeft) {
    shift = "Supply shifts left";
  }
  
  if (!shift) return null;
  
  // Extract conclusion from description
  const leadingTo = desc.match(/leading\s+to\s+(.+?)(?:\.|$)/i);
  const resultIn = desc.match(/result(?:s|ing)\s+in\s+(.+?)(?:\.|$)/i);
  conclusion = leadingTo?.[1]?.trim() || resultIn?.[1]?.trim() || "";
  
  // Extract source
  const sourceMatch = desc.match(/Source:\s*(.+)/i);
  
  return {
    type: title,
    xAxis,
    yAxis,
    initialCurves: "D₀ (original demand) and S₀ (original supply)",
    initialEquilibrium: "E₀ at intersection of D₀ and S₀",
    shift,
    newEquilibrium: "E₁ at new intersection",
    shadedArea: "",
    conclusion: conclusion || (sourceMatch ? `${conclusion} (${sourceMatch[0]})` : ""),
  };
}

/** 
 * Extract "Figure N: Title" blocks followed by chart data or diagram descriptions.
 */
type FigureSegment = 
  | { type: "text"; content: string; figTitle?: string; figDesc?: string; diagram?: never }
  | { type: "figure"; content: string; figTitle: string; figDesc: string; diagram?: never }
  | { type: "sd-diagram"; content: string; figTitle?: string; figDesc?: string; diagram: import("./EconDiagramSVG").DiagramProps };

const FIGURE_TITLE_RE = /^\s*(?:[-•*]\s*)?(?:#{1,4}\s*)?(?:\*{1,2})?\s*(Figure\s+\d+\s*:?.*)\s*(?:\*{1,2})?\s*$/i;
const SECTION_BREAK_RE = /^\s*(?:#{1,4}\s+(?!Data|Vertical|Horizontal|Line)|\*{0,2}(?:Figure|Table|Extract)\s+\w+|Question\s+\d+)/i;

function extractFigureBlocks(text: string): FigureSegment[] {
  const lines = text.split("\n");
  const segments: FigureSegment[] = [];
  let textBuffer: string[] = [];
  let i = 0;

  const flushText = () => {
    if (textBuffer.length > 0) {
      segments.push({ type: "text", content: textBuffer.join("\n") });
      textBuffer = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const titleMatch = line.match(FIGURE_TITLE_RE);

    if (!titleMatch) {
      textBuffer.push(line);
      i++;
      continue;
    }

    const figTitle = titleMatch[1].replace(/\*+/g, "").trim();
    const figLines: string[] = [];
    let j = i + 1;

    while (j < lines.length) {
      const next = lines[j];
      const trimmed = next.trim();

      if (trimmed && (FIGURE_TITLE_RE.test(trimmed) || SECTION_BREAK_RE.test(trimmed))) {
        break;
      }

      figLines.push(next);
      j++;
    }

    const desc = figLines.join("\n").trim();

    const diagramProps = parseFigureAsDiagram(figTitle, desc);
    if (diagramProps) {
      flushText();
      segments.push({ type: "sd-diagram", content: "", diagram: diagramProps });
      i = j;
      continue;
    }

    const hasLineData = /Line\s+\d+/i.test(desc) && /\d{4}:\s*[\d.]+/i.test(desc);
    const hasSingleSeriesData = /(?:vertical|horizontal)\s*axis:/i.test(desc) && /\d{4}:\s*[\d.]+/i.test(desc);
    const hasMarkdownTable = /\|.*\|.*\|/.test(desc) && /\|\s*[\d,.]+\s*\|/.test(desc);
    const hasBulletData = /(?:vertical|horizontal)\s*axis:/i.test(desc) && /(?:at\s+[\d.]+%?|[\d.]+%?\s*(?:interest|rate))[^£$€\d]*[£$€]?\s*[\d,]+/i.test(desc);
    const hasTrendNarrative = /from\s+[\d,.]+\s*[^,\n]*?\s+in\s+\d{4}\s+to\s+[\d,.]+/i.test(desc);
    const hasValuesTupleData = /values?\s*:\s*.*\(\s*[-+]?\d[\d,.]*\s*\)/i.test(desc);

    if (hasLineData || hasSingleSeriesData || hasMarkdownTable || hasBulletData || hasTrendNarrative || hasValuesTupleData) {
      flushText();
      segments.push({ type: "figure", content: "", figTitle, figDesc: desc });
      i = j;
      continue;
    }

    textBuffer.push(...lines.slice(i, j));
    i = j;
  }

  flushText();
  return segments.length > 0 ? segments : [{ type: "text", content: text }];
}

const markdownComponents: Components = {
  table: ({ children, ...props }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border bg-background shadow-sm">
      <table className="w-full text-sm" {...props}>{children}</table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/60 border-b border-border" {...props}>{children}</thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground uppercase tracking-wider" {...props}>{children}</th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2 text-sm text-foreground/90 border-t border-border/50" {...props}>{children}</td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props}>{children}</tr>
  ),
  p: ({ children, ...props }) => {
    const text = typeof children === "string" ? children : "";
    if (typeof children === "string" && /^Source:/i.test(text.trim())) {
      return (
        <p className="text-[11px] italic text-muted-foreground mt-1 mb-3" {...props}>{children}</p>
      );
    }
    return <p {...props}>{children}</p>;
  },
  strong: ({ children, ...props }) => {
    const text = typeof children === "string" ? children : "";
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
    <ul className="my-2 ml-4 space-y-1 text-sm list-disc marker:text-muted-foreground/60" {...props}>{children}</ul>
  ),
  li: ({ children, ...props }) => (
    <li className="text-sm text-foreground/85 leading-relaxed" {...props}>{children}</li>
  ),
};

/**
 * Renders a text segment: first extracts tables (rendered natively),
 * then passes remaining text through ReactMarkdown with diagram support.
 */
function renderSegment(text: string, keyPrefix: string = "") {
  const tableSegments = extractTableBlocks(text);
  
  return tableSegments.map((seg, ti) => {
    if (seg.type === "table") {
      return <RenderedTable key={`${keyPrefix}t${ti}`} markdown={seg.content} />;
    }
    
    // For text segments, check for diagrams
    const diagSegments = extractDiagramBlocks(seg.content);
    const hasDiagrams = diagSegments.some((s) => s.type === "diagram");

    if (!hasDiagrams) {
      return (
        <ReactMarkdown key={`${keyPrefix}m${ti}`} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
          {seg.content}
        </ReactMarkdown>
      );
    }

    return (
      <div key={`${keyPrefix}d${ti}`}>
        {diagSegments.map((ds, di) =>
          ds.type === "diagram" ? (
            <EconDiagramCanvas key={`${keyPrefix}d${ti}d${di}`} diagram={ds.diagram} />
          ) : (
            <ReactMarkdown key={`${keyPrefix}d${ti}m${di}`} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
              {ds.content}
            </ReactMarkdown>
          )
        )}
      </div>
    );
  });
}

/**
 * Renders markdown with LaTeX math, GFM tables, economics diagrams, and figure charts.
 */
export function MathsMarkdown({ children, className }: MathsMarkdownProps) {
  // First extract figure charts
  const figSegments = extractFigureBlocks(children);
  const hasSpecialFigures = figSegments.some(s => s.type === "figure" || s.type === "sd-diagram");

  if (!hasSpecialFigures) {
    return <div className={className}>{renderSegment(children)}</div>;
  }

  return (
    <div className={className}>
      {figSegments.map((seg, i) =>
        seg.type === "figure" ? (
          <FigureChart key={`fig${i}`} title={seg.figTitle!} description={seg.figDesc!} />
        ) : seg.type === "sd-diagram" ? (
          <EconDiagramCanvas key={`sddiag${i}`} diagram={seg.diagram!} />
        ) : (
          <div key={`txt${i}`}>{renderSegment(seg.content, `s${i}`)}</div>
        )
      )}
    </div>
  );
}
