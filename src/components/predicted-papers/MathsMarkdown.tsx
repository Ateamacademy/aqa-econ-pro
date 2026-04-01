import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import type { Components } from "react-markdown";
import { extractDiagramBlocks, EconDiagramCanvas } from "./EconDiagramSVG";
import { resolveDiagramType } from "@/components/revision/EconDiagramLibrary";
import { FigureChart } from "./FigureChart";

interface MathsMarkdownProps {
  children: string;
  className?: string;
  /** When true, S&D / economics diagrams are suppressed (useful for extract/context sections) */
  suppressDiagrams?: boolean;
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
  
  // Check for "Diagram family:" field — this is the primary indicator from structured AI output
  const familyMatch = desc.match(/Diagram\s+family:\s*(\S+)/i);
  const familyId = familyMatch?.[1]?.trim() || "";
  
  // Detect S&D curve references: D₀/S₀, D0/S0, D₁/S₁, or demand/supply curve descriptions
  const hasCurveRefs = /[ds][₀₁01₂2]/i.test(desc) || (/demand/i.test(lower) && /supply/i.test(lower));
  const hasAxes = /(?:vertical|horizontal)\s*axis/i.test(desc);
  
  // Accept if we have a Diagram family field, OR the traditional curve refs + axes
  if (!familyId && (!hasCurveRefs || !hasAxes)) return null;
  
  // Extract axis labels
  const vMatch = desc.match(/vertical\s*axis:\s*(.+?)(?:\s+horizontal|\s*$)/i);
  const hMatch = desc.match(/horizontal\s*axis:\s*(.+?)(?:\s+[DS][₀₁01₂2]|\s+The\s|\s*$)/i);
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
  
  // Allow diagrams WITHOUT shifts — show initial equilibrium only
  
  // Extract conclusion from description
  const leadingTo = desc.match(/leading\s+to\s+(.+?)(?:\.|$)/i);
  const resultIn = desc.match(/result(?:s|ing)\s+in\s+(.+?)(?:\.|$)/i);
  conclusion = leadingTo?.[1]?.trim() || resultIn?.[1]?.trim() || "";
  
  // Extract equilibrium label
  const eqMatch = desc.match(/equilibrium[^.]*(?:are|is|at)\s+([EePp][\d₀₁₂])/i);
  const eqLabel = eqMatch?.[1] || (shift ? "E₀" : "E₁");
  
  // Extract source
  const sourceMatch = desc.match(/Source:\s*(.+)/i);
  
  // Determine curve labels from text
  const dLabel = /D₁/i.test(desc) ? "D₁" : "D₀";
  const sLabel = /S₁/i.test(desc) ? "S₁" : "S₀";

  // If we have a family ID, try to resolve it to a known diagram type
  const resolvedFromFamily = familyId ? resolveDiagramType(familyId, shift) : null;
  const diagramType = resolvedFromFamily || title;
  
  return {
    type: diagramType,
    xAxis,
    yAxis,
    initialCurves: `${dLabel} (demand) and ${sLabel} (supply)`,
    initialEquilibrium: shift ? `E₀ at intersection of ${dLabel} and ${sLabel}` : `${eqLabel} at intersection of ${dLabel} and ${sLabel}`,
    shift: shift || "",
    newEquilibrium: shift ? "E₁ at new intersection" : "",
    shadedArea: "",
    conclusion: conclusion || (sourceMatch ? sourceMatch[0] : ""),
    family: familyId || undefined,
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

function normalizeFigureText(text: string): string {
  let result = text
    .replace(/\r/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[\*_`~]/g, "");

  // Split inline axis labels and data sections onto separate lines
  result = result
    .replace(/\s+(Vertical\s+axis\s*:)/gi, "\n$1")
    .replace(/\s+(Horizontal\s+axis\s*:)/gi, "\n$1")
    .replace(/\s+(Data\s+points?\s*:)/gi, "\n$1")
    .replace(/\s+(Source\s*:)/gi, "\n$1");

  // After "Data points:", split inline category:value pairs onto separate lines
  const dpMatch = result.match(/(Data\s+points?\s*:)\s*/i);
  if (dpMatch) {
    const idx = result.indexOf(dpMatch[0]) + dpMatch[0].length;
    const before = result.slice(0, idx);
    const after = result.slice(idx);
    // Insert newline before each "Label: Number" pattern
    const split = after.replace(/\s+(?=[\w\s&/()']+:\s*[£$€]?\s*\d)/g, "\n");
    result = before + "\n" + split;
  }

  return result
    .split("\n")
    .map((line) => line.replace(/^>\s?/, "").trimEnd())
    .join("\n");
}

function hasCategoryValueData(desc: string): boolean {
  const normalized = normalizeFigureText(desc);
  const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
  const listHeadingRegex = /^(values?|bar\s*chart\s*showing|chart\s*showing|data(?:\s+points?)?)\s*:/i;
  const hasListHeading = lines.some((rawLine) => listHeadingRegex.test(rawLine.replace(/^[-•*]\s*/, "").trim()));

  let inCategorySection = !hasListHeading;
  let valueCount = 0;

  for (const rawLine of lines) {
    const line = rawLine.replace(/^[-•*]\s*/, "").trim();

    if (/^(vertical|horizontal|x|y)\s*-?\s*axis:/i.test(line) || /^source\s*:/i.test(line)) {
      continue;
    }

    if (listHeadingRegex.test(line)) {
      inCategorySection = true;
      continue;
    }

    if (!inCategorySection) continue;

    if (/^[^:\n]{2,}:\s*[£$€]?\s*[-+]?\d[\d,]*(?:\.\d+)?\b/i.test(line)) {
      valueCount++;
    }
  }

  return valueCount >= 2;
}

function hasLooseLabelValueData(desc: string): boolean {
  const normalized = normalizeFigureText(desc);
  const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
  let valueCount = 0;

  for (const rawLine of lines) {
    const line = rawLine.replace(/^[-•*]\s*/, "").trim();
    if (!line || /^(vertical|horizontal|x|y)\s*-?\s*axis:/i.test(line) || /^source\s*:/i.test(line)) {
      continue;
    }

    const pairMatches = [...line.matchAll(/([^,;:\n]{2,}?)\s*(?:[:=]|->|→)\s*[£$€]?\s*([-+]?\d[\d,]*(?:\.\d+)?)/gi)].length;
    const tupleMatches = [...line.matchAll(/([^,;:\n]{2,}?)\s*\(\s*[£$€]?\s*([-+]?\d[\d,]*(?:\.\d+)?)\s*\)/gi)].length;
    const dashMatches = [...line.matchAll(/([^,;:\n]{2,}?)\s*[–-]\s*[£$€]?\s*([-+]?\d[\d,]*(?:\.\d+)?)(?=\s*(?:,|;|$))/gi)].length;

    valueCount += pairMatches + tupleMatches + dashMatches;
    if (valueCount >= 2) return true;
  }

  return false;
}

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

    const inlineDesc = figTitle.replace(/^Figure\s+\d+\s*:?\s*/i, "").trim();
    // Always include inline description if it has meaningful content (>10 chars or contains key terms)
    const includeInlineDesc = inlineDesc.length > 10 || /(?:vertical|horizontal|x|y)\s*-?\s*axis|values?\s*:|\d\s*(?:[:=]|\(|[–-])\s*[£$€]?\s*\d|demand|supply|line\s+[a-z]/i.test(inlineDesc);
    const desc = [includeInlineDesc ? inlineDesc : "", ...figLines].filter(Boolean).join("\n").trim();
    const normalizedDesc = normalizeFigureText(desc);

    const diagramProps = parseFigureAsDiagram(figTitle, normalizedDesc);
    if (diagramProps) {
      flushText();
      segments.push({ type: "sd-diagram", content: "", diagram: diagramProps });
      i = j;
      continue;
    }

    const hasLineData = /Line\s+\d+/i.test(normalizedDesc) && /\d{4}:\s*[\d.]+/i.test(normalizedDesc);
    const hasNamedLineData = /Line\s+[A-Z]/i.test(normalizedDesc) && /(?:vertical|horizontal)\s*axis/i.test(normalizedDesc);
    const hasSingleSeriesData = /(?:vertical|horizontal|x|y)\s*-?\s*axis:/i.test(normalizedDesc) && /(?:\d{4}|Q\d|\w+)\s*:\s*[£$€]?\s*[-+]?\d[\d,.]*/i.test(normalizedDesc);
    const hasMarkdownTable = /\|.*\|.*\|/.test(normalizedDesc) && /\|\s*[\d,.]+\s*\|/.test(normalizedDesc);
    const hasBulletData = /(?:vertical|horizontal|x|y)\s*-?\s*axis:/i.test(normalizedDesc) && /(?:at\s+[\d.]+%?|[\d.]+%?\s*(?:interest|rate))[^£$€\d]*[£$€]?\s*[\d,]+/i.test(normalizedDesc);
    const hasTrendNarrative = /from\s+[\d,.]+\s*[^,\n]*?\s+in\s+\d{4}\s+to\s+[\d,.]+/i.test(normalizedDesc);
    const hasValuesTupleData = /values?\s*:\s*.*\(\s*[-+]?\d[\d,.]*\s*\)/i.test(normalizedDesc);
    const hasCategoryValueList = hasCategoryValueData(normalizedDesc);
    const hasLoosePairs = hasLooseLabelValueData(normalizedDesc);
    const hasLabelValueLines = /(?:^|\n)\s*[-•*]?\s*[^:\n]{2,}\s*:\s*[£$€]?\s*[-+]?\d[\d,]*(?:\.\d+)?/i.test(normalizedDesc);

    if (hasLineData || hasNamedLineData || hasSingleSeriesData || hasMarkdownTable || hasBulletData || hasTrendNarrative || hasValuesTupleData || hasCategoryValueList || hasLoosePairs || hasLabelValueLines) {
      flushText();
      segments.push({ type: "figure", content: "", figTitle, figDesc: normalizedDesc });
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
    return <p className="mb-3 leading-relaxed" {...props}>{children}</p>;
  },
  code: ({ children, ...props }) => {
    // Prevent monospace font — render inline code as normal styled text
    return <span className="font-sans font-semibold text-foreground" {...props}>{children}</span>;
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
function renderSegment(text: string, keyPrefix: string = "", suppressDiagrams: boolean = false) {
  const tableSegments = extractTableBlocks(text);
  
  return tableSegments.map((seg, ti) => {
    if (seg.type === "table") {
      return <RenderedTable key={`${keyPrefix}t${ti}`} markdown={seg.content} />;
    }

    if (suppressDiagrams) {
      const plainContent = extractDiagramBlocks(seg.content)
        .filter((block) => block.type !== "diagram")
        .map((block) => block.content)
        .join("\n")
        .trim();

      if (!plainContent) return null;

      return (
        <ReactMarkdown key={`${keyPrefix}m${ti}`} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
          {plainContent}
        </ReactMarkdown>
      );
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
/**
 * Strip "lines X-Y", "line X", "(lines X–Y)" and standalone dashes used as separators.
 */
function stripLineReferences(text: string): string {
  return text
    // "(lines 5-8)", "(lines 5–8)", "(line 5)"
    .replace(/\s*\(lines?\s+\d+[\s–\-—]+\d+\)\s*/gi, " ")
    .replace(/\s*\(line\s+\d+\)\s*/gi, " ")
    // "lines 5-8" or "lines 5–8" standalone
    .replace(/\blines?\s+\d+[\s–\-—]+\d+/gi, "")
    .replace(/\bline\s+\d+\b/gi, "")
    // Remove em-dashes and en-dashes used as separators (" — ", " – ", " - " between words)
    .replace(/\s+[—–]\s+/g, " ")
    .replace(/\s+-\s+-?\s*/g, " ")
    // Remove leading dashes on lines
    .replace(/^[\s]*[-—–]+\s*/gm, "")
    // Remove horizontal rules (--- or more)
    .replace(/^-{3,}\s*$/gm, "")
    // Clean up double spaces
    .replace(/  +/g, " ")
    .trim();
}

export function MathsMarkdown({ children, className, suppressDiagrams = false }: MathsMarkdownProps) {
  const cleaned = stripLineReferences(children);
  // First extract figure charts
  const figSegments = extractFigureBlocks(cleaned);

  // When suppressDiagrams is true, drop S&D diagram segments AND figure segments
  // that contain economics diagram descriptions (not data charts/tables).
  // These are irrelevant economics diagrams that appear between extract blocks.
  const processedSegments = suppressDiagrams
    ? figSegments.filter(seg => {
        if (seg.type === "sd-diagram") return false;
        // Also suppress figure segments that describe economics diagrams (not data)
        if (seg.type === "figure" && seg.figDesc) {
          const desc = seg.figDesc.toLowerCase();
          const isEconDiagram = /diagram\s+family:/i.test(seg.figDesc) ||
            (/(?:demand|supply|ad|as|sras|lras|mc|mr|ar|atc|mpb|mpc|msb|msc)/i.test(desc) &&
             /(?:curve|shift|equilibrium|intersection)/i.test(desc));
          if (isEconDiagram) return false;
        }
        return true;
      })
    : figSegments;

  return (
    <div className={className}>
      {processedSegments.map((seg, i) =>
        seg.type === "figure" ? (
          <FigureChart key={`fig${i}`} title={seg.figTitle!} description={seg.figDesc!} />
        ) : seg.type === "sd-diagram" ? (
          <EconDiagramCanvas key={`sddiag${i}`} diagram={seg.diagram!} />
        ) : (
          <div key={`txt${i}`}>{renderSegment(seg.content, `s${i}`, suppressDiagrams)}</div>
        )
      )}
    </div>
  );
}
