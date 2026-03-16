import { useMemo, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FigureChartProps {
  title: string;
  description: string;
}

interface DataSet {
  label: string;
  points: { year: string; value: number }[];
}

const COLORS = ["hsl(211, 100%, 50%)", "hsl(0, 75%, 55%)", "hsl(140, 60%, 40%)", "hsl(35, 80%, 50%)"];

function normalizeFigureDescription(description: string): string {
  let text = description
    .replace(/\r/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[\*_`~]/g, "");

  // Insert newlines before axis labels and category entries when they're inline
  text = text
    .replace(/\s+(Vertical\s+axis\s*:)/gi, "\n$1")
    .replace(/\s+(Horizontal\s+axis\s*:)/gi, "\n$1")
    .replace(/\s+((?:Bar|Line)\s+(?:chart|graph)\s+showing\s*:)/gi, "\n$1")
    .replace(/\s+(Data\s+points?\s*:)/gi, "\n$1")
    .replace(/\s+(Source\s*:)/gi, "\n$1");

  // After "showing:" or "Data points:", split inline category:value pairs
  for (const headingPattern of [/(showing\s*:)\s*/i, /(Data\s+points?\s*:)\s*/i]) {
    const headingMatch = text.match(headingPattern);
    if (headingMatch) {
      const idx = text.indexOf(headingMatch[0]) + headingMatch[0].length;
      const before = text.slice(0, idx);
      const after = text.slice(idx);
      // Insert newline before each "SomeLabel: £N" or "SomeLabel: N" pattern
      const split = after.replace(/\s+(?=[\w\s&/()']+:\s*[£$€]?\s*\d)/g, "\n");
      text = before + "\n" + split;
    }
  }

  return text
    .split("\n")
    .map((line) => line.replace(/^>\s?/, "").trimEnd())
    .join("\n");
}

/**
 * Parse markdown tables: | Year | Col1 | Col2 | ...
 */
function parseMarkdownTable(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const lines = description.split("\n").map(l => l.trim()).filter(Boolean);
  const tableRows = lines.filter(l => l.startsWith("|") && l.endsWith("|"));
  if (tableRows.length < 3) return null;

  const sepIdx = tableRows.findIndex(r => /^\|[\s\-:]+\|/.test(r.replace(/[^|\-:\s]/g, '')));
  if (sepIdx < 1) return null;

  const parseCells = (row: string) => row.split("|").slice(1, -1).map(c => c.trim());
  const headers = parseCells(tableRows[sepIdx - 1]);
  const dataRows = tableRows.slice(sepIdx + 1).map(parseCells);

  if (headers.length < 2 || dataRows.length < 2) return null;

  const dataSets: DataSet[] = [];
  for (let col = 1; col < headers.length; col++) {
    const points: { year: string; value: number }[] = [];
    for (const row of dataRows) {
      const label = row[0]?.replace(/\*+/g, '').trim();
      const rawVal = row[col]?.replace(/[,%£$€*()a-zA-Z\s]/g, '').trim();
      const val = parseFloat(rawVal);
      if (label && !isNaN(val)) {
        points.push({ year: label, value: val });
      }
    }
    if (points.length >= 2) {
      dataSets.push({ label: headers[col].replace(/\*+/g, '').trim(), points });
    }
  }

  if (dataSets.length === 0) return null;
  return {
    dataSets,
    axisLabels: { x: headers[0].replace(/\*+/g, '').trim(), y: dataSets.length === 1 ? dataSets[0].label : "" },
  };
}

/**
 * Parse bullet-point data like:
 *   "At 0.5% interest, monthly payment is £650"
 *   "At 3.0% interest, monthly payment is £900"
 */
function parseBulletPointData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const axisLabels = { x: "", y: "" };
  const lines = description.split("\n").map(l => l.trim());

  for (const line of lines) {
    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+)/i);
    if (vMatch) axisLabels.y = vMatch[1].trim();
    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+)/i);
    if (hMatch) axisLabels.x = hMatch[1].trim();
  }

  // Match patterns like "At 0.5% interest, monthly payment is £650" or "At 0.5%, value is 650"
  const bulletRegex = /(?:at|when)\s+([\d.]+)\s*(%|percent)?[^£$€\d]*?[£$€]?\s*([\d,]+)/gi;
  const points: { year: string; value: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = bulletRegex.exec(description)) !== null) {
    const xVal = match[1] + (match[2] || "%");
    const yVal = parseFloat(match[3].replace(/,/g, ''));
    if (!isNaN(yVal)) {
      points.push({ year: xVal, value: yVal });
    }
  }

  if (points.length < 2) return null;

  return {
    dataSets: [{ label: axisLabels.y || "Value", points }],
    axisLabels,
  };
}

function parseValueTupleData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const axisLabels = { x: "", y: "" };
  const lines = description.split("\n").map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+)/i);
    if (vMatch) axisLabels.y = vMatch[1].trim();
    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+)/i);
    if (hMatch) axisLabels.x = hMatch[1].trim();
  }

  const valuesLine = lines.find(l => /values?\s*:/i.test(l));
  if (!valuesLine) return null;

  const valuesText = valuesLine
    .replace(/^[-•*]\s*/, "")
    .replace(/.*values?\s*:\s*/i, "")
    .replace(/source\s*:.*/i, "");

  const tupleRegex = /([^,]+?)\s*\(\s*([-+]?\d[\d,]*(?:\.\d+)?)\s*\)/g;
  const points: { year: string; value: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = tupleRegex.exec(valuesText)) !== null) {
    const xVal = match[1].replace(/^[-•*]\s*/, "").trim();
    const yVal = parseFloat(match[2].replace(/,/g, ""));
    if (xVal && Number.isFinite(yVal)) {
      points.push({ year: xVal, value: yVal });
    }
  }

  if (points.length < 2) return null;

  if (!axisLabels.x && points.every(p => /^\d{4}$/.test(p.year))) {
    axisLabels.x = "Year";
  }

  return {
    dataSets: [{ label: axisLabels.y || "Value", points }],
    axisLabels,
  };
}

function parseTrendNarrativeData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const axisLabels = { x: "", y: "" };
  const lines = description.split("\n").map(l => l.trim());

  for (const line of lines) {
    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+)/i);
    if (vMatch) axisLabels.y = vMatch[1].trim();
    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+)/i);
    if (hMatch) axisLabels.x = hMatch[1].trim();
  }

  const normalized = lines.join(" ");
  const fromToMatch = normalized.match(/from\s+([\d,.]+)\s*[^,\n]*?\s+in\s+(\d{4})\s+to\s+([\d,.]+)\s*[^,\n]*?\s+in\s+(\d{4})/i);
  if (!fromToMatch) return null;

  const startValue = parseFloat(fromToMatch[1].replace(/,/g, ""));
  const startYear = parseInt(fromToMatch[2], 10);
  const endValue = parseFloat(fromToMatch[3].replace(/,/g, ""));
  const endYear = parseInt(fromToMatch[4], 10);

  if (!Number.isFinite(startValue) || !Number.isFinite(endValue) || !Number.isFinite(startYear) || !Number.isFinite(endYear) || endYear <= startYear) {
    return null;
  }

  const points: { year: string; value: number }[] = [];
  const span = endYear - startYear;
  for (let year = startYear; year <= endYear; year++) {
    const progress = (year - startYear) / span;
    const value = startValue + (endValue - startValue) * progress;
    points.push({ year: String(year), value: Math.round(value * 100) / 100 });
  }

  const flatRangeMatch = normalized.match(/flat\s+trend\s+from\s+(\d{4})\s*(?:-|–|to)\s*(\d{4})/i);
  if (flatRangeMatch) {
    const flatStart = parseInt(flatRangeMatch[1], 10);
    const flatEnd = parseInt(flatRangeMatch[2], 10);
    for (const point of points) {
      const year = parseInt(point.year, 10);
      if (year >= flatStart && year <= flatEnd) {
        point.value = Math.round(endValue * 100) / 100;
      }
    }
  }

  return {
    dataSets: [{ label: axisLabels.y || "Value", points }],
    axisLabels: { x: axisLabels.x || "Year", y: axisLabels.y },
  };
}

function parseCategoryValueData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const axisLabels = { x: "", y: "" };
  const lines = description.split("\n").map(l => l.trim()).filter(Boolean);
  const listHeadingRegex = /^(values?|bar\s*chart\s*showing|chart\s*showing|data)\s*:/i;
  const hasListHeading = lines.some(line => listHeadingRegex.test(line.replace(/^[-•*]\s*/, "").trim()));

  const points: { year: string; value: number }[] = [];
  let inValuesSection = !hasListHeading;

  for (const rawLine of lines) {
    const line = rawLine.replace(/^[-•*]\s*/, "").trim();

    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+)/i);
    if (vMatch) {
      axisLabels.y = vMatch[1].trim();
      continue;
    }

    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+)/i);
    if (hMatch) {
      axisLabels.x = hMatch[1].trim();
      continue;
    }

    if (listHeadingRegex.test(line)) {
      inValuesSection = true;
      continue;
    }

    if (!inValuesSection) continue;

    const withoutSource = line.replace(/\s+source\s*:.*/i, "").trim();
    const valueMatch = withoutSource.match(/^(?!(?:vertical|horizontal|x|y)\s*-?\s*axis|values?\b|bar\s*chart\s*showing\b|chart\s*showing\b|data\b)([^:\n]+):\s*[£$€]?\s*([-+]?\d[\d,]*(?:\.\d+)?)/i);
    if (!valueMatch) continue;

    const category = valueMatch[1].trim();
    const value = parseFloat(valueMatch[2].replace(/,/g, ""));
    if (category && Number.isFinite(value)) {
      points.push({ year: category, value });
    }
  }

  if (points.length < 2) return null;

  return {
    dataSets: [{ label: axisLabels.y || "Value", points }],
    axisLabels: { x: axisLabels.x || "Category", y: axisLabels.y },
  };
}

function parseLooseLabelValueData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const axisLabels = { x: "", y: "" };
  const lines = description.split("\n").map(l => l.trim()).filter(Boolean);
  const points: { year: string; value: number }[] = [];
  const seen = new Set<string>();

  const addPoint = (label: string, rawValue: string) => {
    const xVal = label.replace(/^[-•*]\s*/, "").trim();
    const value = parseFloat(rawValue.replace(/,/g, ""));
    if (!xVal || !Number.isFinite(value)) return;
    const key = `${xVal}::${value}`;
    if (seen.has(key)) return;
    seen.add(key);
    points.push({ year: xVal, value });
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/^[-•*]\s*/, "").trim();
    if (!line) continue;

    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+)/i);
    if (vMatch) {
      axisLabels.y = vMatch[1].trim();
      continue;
    }

    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+)/i);
    if (hMatch) {
      axisLabels.x = hMatch[1].trim();
      continue;
    }

    if (/^source\s*:/i.test(line)) {
      continue;
    }

    const candidate = line.replace(/^(values?|bar\s*chart\s*showing|chart\s*showing|data)\s*:\s*/i, "").trim();
    if (!candidate) continue;

    const pairRegex = /([^,;:\n]{2,}?)\s*(?:[:=]|->|→)\s*[£$€]?\s*([-+]?\d[\d,]*(?:\.\d+)?)/gi;
    const tupleRegex = /([^,;:\n]{2,}?)\s*\(\s*[£$€]?\s*([-+]?\d[\d,]*(?:\.\d+)?)\s*\)/gi;
    const dashRegex = /([^,;:\n]{2,}?)\s*[–-]\s*[£$€]?\s*([-+]?\d[\d,]*(?:\.\d+)?)(?=\s*(?:,|;|$))/gi;

    let matched = false;

    for (const match of candidate.matchAll(pairRegex)) {
      matched = true;
      addPoint(match[1], match[2]);
    }

    for (const match of candidate.matchAll(tupleRegex)) {
      matched = true;
      addPoint(match[1], match[2]);
    }

    if (!matched) {
      for (const match of candidate.matchAll(dashRegex)) {
        addPoint(match[1], match[2]);
      }
    }
  }

  if (points.length < 2) return null;

  if (!axisLabels.x) {
    axisLabels.x = points.every(p => /^\d{4}(?:\s*(?:-|–|\/)\s*\d{2,4})?$/.test(p.year)) ? "Year" : "Category";
  }

  return {
    dataSets: [{ label: axisLabels.y || "Value", points }],
    axisLabels,
  };
}

/**
 * Parse inline year:value pairs like "2004: 4.8 2009: 5.4 2014: 5.0 2019: 7.0 2023: 7.5"
 */
function parseInlineYearValueData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const axisLabels = { x: "", y: "" };
  const lines = description.split("\n").map(l => l.trim());

  for (const line of lines) {
    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+?)(?=\s+(?:horizontal|x)\s*-?\s*axis|\s*$)/i);
    if (vMatch) axisLabels.y = vMatch[1].trim();
    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+?)(?=\s+(?:vertical|y)\s*-?\s*axis|\s+(?:line|bar|showing)|\s*$)/i);
    if (hMatch) axisLabels.x = hMatch[1].trim();
  }

  // Match patterns like "2004: 4.8" repeated inline
  const fullText = lines.join(" ");
  const pairRegex = /(\d{4})\s*:\s*([\d,.]+)/g;
  const points: { year: string; value: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = pairRegex.exec(fullText)) !== null) {
    const val = parseFloat(match[2].replace(/,/g, ''));
    if (!isNaN(val)) {
      points.push({ year: match[1], value: val });
    }
  }

  if (points.length < 2) return null;

  return {
    dataSets: [{ label: axisLabels.y || "Value", points }],
    axisLabels: { x: axisLabels.x || "Year", y: axisLabels.y },
  };
}

/**
 * Parse multi-series inline data like:
 * "(blue): New Housing Completions, showing 179k (2020), 195k (2021) (red): Household Formation, showing 230k (2020)"
 * Also handles: "Line A (blue): ... showing 179k (2020)" or "Series 1: ... showing 179k (2020)"
 */
function parseMultiSeriesInlineData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const axisLabels = { x: "", y: "" };
  const lines = description.split("\n").map(l => l.trim());

  for (const line of lines) {
    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+?)(?=\s+(?:horizontal|x)\s*-?\s*axis|\s+\(|\s*$)/i);
    if (vMatch) axisLabels.y = vMatch[1].trim();
    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+?)(?=\s+(?:vertical|y)\s*-?\s*axis|\s+\(|\s*$)/i);
    if (hMatch) axisLabels.x = hMatch[1].trim();
  }

  const fullText = lines.join(" ");

  // Split by color/series markers: "(blue):", "(red):", "(green):", "(orange):" etc.
  const seriesRegex = /\((\w+)\)\s*:?\s*([^(]*?),?\s*showing\s+([\s\S]*?)(?=\s*\(\w+\)\s*:|\s*Source\s*:|$)/gi;
  const dataSets: DataSet[] = [];
  let match: RegExpExecArray | null;

  while ((match = seriesRegex.exec(fullText)) !== null) {
    const label = match[2].trim().replace(/,\s*$/, '') || match[1];
    const dataStr = match[3];

    // Parse value-year pairs like "179k (2020), 195k (2021)" or "179,000 (2020)"
    const pointRegex = /([£$€]?\s*[\d,.]+)\s*([kKmMbBnN]{1,2})?\s*\((\d{4}(?:\s*[Ff]orecast)?)\)/g;
    const points: { year: string; value: number }[] = [];
    let pm: RegExpExecArray | null;

    while ((pm = pointRegex.exec(dataStr)) !== null) {
      let rawVal = parseFloat(pm[1].replace(/[£$€,\s]/g, ''));
      const unit = (pm[2] || '').toLowerCase();
      if (unit === 'k') rawVal *= 1;        // keep as thousands
      else if (unit === 'm') rawVal *= 1000; // convert to thousands
      else if (unit === 'bn' || unit === 'b') rawVal *= 1000000;
      if (!isNaN(rawVal)) {
        points.push({ year: pm[3].trim(), value: rawVal });
      }
    }

    if (points.length >= 2) {
      dataSets.push({ label, points });
    }
  }

  if (dataSets.length === 0) return null;

  // Ensure all series have same x-axis points aligned
  if (!axisLabels.x) axisLabels.x = "Year";

  return { dataSets, axisLabels };
}

function parseChartData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const normalizedDescription = normalizeFigureDescription(description);

  // Try markdown table first
  const tableResult = parseMarkdownTable(normalizedDescription);
  if (tableResult) return tableResult;

  // Try multi-series inline format: "(blue): Label, showing 179k (2020), ..."
  const multiSeriesResult = parseMultiSeriesInlineData(normalizedDescription);
  if (multiSeriesResult) return multiSeriesResult;

  // Try inline year:value pairs (e.g. "2004: 4.8 2009: 5.4")
  const inlineResult = parseInlineYearValueData(normalizedDescription);
  if (inlineResult) return inlineResult;

  // Try bullet-point "At X%, value is Y" format
  const bulletResult = parseBulletPointData(normalizedDescription);
  if (bulletResult) return bulletResult;

  // Try values tuple format: "Values: 2000 (3.5), 2005 (5.0), ..."
  const tupleResult = parseValueTupleData(normalizedDescription);
  if (tupleResult) return tupleResult;

  // Try categorical value list format: "Values:\n- Water: 0.2"
  const categoryResult = parseCategoryValueData(normalizedDescription);
  if (categoryResult) return categoryResult;

  // Try loose label/value pairs: "2019 = 20", "Q1 (35)", "UK: £120"
  const looseLabelValueResult = parseLooseLabelValueData(normalizedDescription);
  if (looseLabelValueResult) return looseLabelValueResult;

  // Try trend narrative format
  const trendResult = parseTrendNarrativeData(normalizedDescription);
  if (trendResult) return trendResult;

  // Fallback: line-based format (Line 1, data points, axis labels)
  const lines = normalizedDescription.split("\n").map(l => l.trim());
  const dataSets: DataSet[] = [];
  let current: DataSet | null = null;
  const axisLabels = { x: "", y: "" };
  let hasLineHeaders = false;

  for (const line of lines) {
    const vMatch = line.match(/(?:vertical|y)\s*-?\s*axis\s*:\s*(.+)/i);
    if (vMatch) { axisLabels.y = vMatch[1]; continue; }
    const hMatch = line.match(/(?:horizontal|x)\s*-?\s*axis\s*:\s*(.+)/i);
    if (hMatch) { axisLabels.x = hMatch[1]; continue; }
    const lineMatch = line.match(/^-?\s*\*{0,2}Line\s+\d+\s*\(([^)]+)\):\s*(.+)\*{0,2}/i);
    if (lineMatch) {
      hasLineHeaders = true;
      if (current) dataSets.push(current);
      current = { label: lineMatch[1].trim(), points: [] };
      continue;
    }
    const dataMatch = line.match(/^[-•*]?\s*(\d{4})(?:\s*\([^)]*\))?\s*:\s*([\d.]+)\s*(%|million|billion|bn)?/i);
    if (dataMatch) {
      if (!current && !hasLineHeaders) {
        current = { label: "Value", points: [] };
      }
      if (current) {
        current.points.push({ year: dataMatch[1], value: parseFloat(dataMatch[2]) });
      }
    }
  }
  if (current && current.points.length > 0) dataSets.push(current);
  if (dataSets.length === 0 || dataSets[0].points.length < 2) return null;
  return { dataSets, axisLabels };
}

export function FigureChart({ title, description }: FigureChartProps) {
  const parsed = useMemo(() => parseChartData(description), [description]);
  const [showTable, setShowTable] = useState(false);
  
  const markdownTable = useMemo(() => {
    const lines = description.split("\n");
    const tableLines = lines.filter(l => l.trim().startsWith("|"));
    return tableLines.length >= 3 ? tableLines.join("\n") : null;
  }, [description]);

  const sourceLine = useMemo(() => {
    const match = description.match(/Source:\s*.+/i);
    return match ? match[0] : null;
  }, [description]);
  
  if (!parsed) {
    if (markdownTable) {
      return (
        <div className="my-6 rounded-xl border border-border bg-card p-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
          <div className="overflow-x-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              table: ({ children }) => <table className="w-full text-sm border-collapse">{children}</table>,
              thead: ({ children }) => <thead className="bg-muted/60 border-b border-border">{children}</thead>,
              th: ({ children }) => <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground uppercase tracking-wider">{children}</th>,
              td: ({ children }) => <td className="px-4 py-2 text-sm text-foreground/90 border-t border-border/50">{children}</td>,
              tr: ({ children }) => <tr className="hover:bg-muted/30 transition-colors">{children}</tr>,
            }}>
              {markdownTable}
            </ReactMarkdown>
          </div>
          {sourceLine && <p className="text-[11px] italic text-muted-foreground mt-2">{sourceLine}</p>}
        </div>
      );
    }
    // Fallback: render as a styled figure info box for narrative descriptions
    const hasAxes = /(?:vertical|horizontal)\s*axis/i.test(description);
    const hasLines = /Line\s+[A-Z]/i.test(description);
    if (hasAxes || hasLines) {
      const lines = description.split(/\n/).map(l => l.trim()).filter(Boolean);
      return (
        <div className="my-6 rounded-xl border border-border bg-card p-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
          <div className="bg-muted/30 rounded-lg p-4 space-y-1.5">
            {lines.map((line, i) => {
              if (/^source:/i.test(line)) {
                return <p key={i} className="text-[11px] italic text-muted-foreground mt-2">{line}</p>;
              }
              if (/^(vertical|horizontal)\s*axis:/i.test(line) || /^Line\s+[A-Z]/i.test(line)) {
                return <p key={i} className="text-sm text-foreground/90"><span className="font-semibold">{line.split(':')[0]}:</span>{line.slice(line.indexOf(':') + 1)}</p>;
              }
              return <p key={i} className="text-sm text-foreground/80">{line}</p>;
            })}
          </div>
          {sourceLine && <p className="text-[11px] italic text-muted-foreground mt-2">{sourceLine}</p>}
        </div>
      );
    }
    return null;
  }

  const { dataSets, axisLabels } = parsed;
  const isTimeSeries = dataSets[0].points.every(p => /^\d{4}/.test(p.year));

  const chartData = dataSets[0].points.map((p, i) => {
    const entry: Record<string, string | number> = { year: p.year };
    dataSets.forEach((ds, di) => {
      entry[`line${di}`] = ds.points[i]?.value ?? 0;
    });
    return entry;
  });

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        {markdownTable && (
          <button
            onClick={() => setShowTable(!showTable)}
            className="text-[11px] text-primary hover:underline font-medium"
          >
            {showTable ? "Show Chart" : "Show Data Table"}
          </button>
        )}
      </div>
      
      {showTable && markdownTable ? (
        <div className="overflow-x-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            table: ({ children }) => <table className="w-full text-sm border-collapse">{children}</table>,
            thead: ({ children }) => <thead className="bg-muted/60 border-b border-border">{children}</thead>,
            th: ({ children }) => <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground uppercase tracking-wider">{children}</th>,
            td: ({ children }) => <td className="px-4 py-2 text-sm text-foreground/90 border-t border-border/50">{children}</td>,
            tr: ({ children }) => <tr className="hover:bg-muted/30 transition-colors">{children}</tr>,
          }}>
            {markdownTable}
          </ReactMarkdown>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          {isTimeSeries ? (
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                label={axisLabels.x ? { value: axisLabels.x, position: "insideBottom", offset: -5, fontSize: 11, fill: "hsl(var(--muted-foreground))" } : undefined}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                label={axisLabels.y ? { value: axisLabels.y, angle: -90, position: "insideLeft", offset: 0, fontSize: 11, fill: "hsl(var(--muted-foreground))" } : undefined}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px" }}
                formatter={(_, entry) => {
                  const idx = parseInt(String(entry.dataKey).replace("line", ""));
                  return dataSets[idx]?.label || "";
                }}
              />
              {dataSets.map((ds, i) => (
                <Line
                  key={i}
                  type="monotone"
                  dataKey={`line${i}`}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                  strokeDasharray={i > 0 ? "6 3" : undefined}
                  dot={{ r: 3, fill: COLORS[i % COLORS.length] }}
                  activeDot={{ r: 5 }}
                  name={ds.label}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              {dataSets.map((ds, i) => (
                <Bar key={i} dataKey={`line${i}`} fill={COLORS[i % COLORS.length]} name={ds.label} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      )}
      {sourceLine && <p className="text-[11px] italic text-muted-foreground mt-2">{sourceLine}</p>}
    </div>
  );
}
