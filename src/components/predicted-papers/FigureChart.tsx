import { useMemo, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ReactMarkdown from "react-markdown";

interface FigureChartProps {
  title: string;
  description: string;
}

interface DataSet {
  label: string;
  points: { year: string; value: number }[];
}

const COLORS = ["hsl(211, 100%, 50%)", "hsl(0, 75%, 55%)", "hsl(140, 60%, 40%)", "hsl(35, 80%, 50%)"];

/**
 * Parse markdown tables: | Year | Col1 | Col2 | ...
 * Returns datasets if table has numeric year-like first column and numeric data columns.
 */
function parseMarkdownTable(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  const lines = description.split("\n").map(l => l.trim()).filter(Boolean);
  
  // Find table rows (lines with | separators)
  const tableRows = lines.filter(l => l.startsWith("|") && l.endsWith("|"));
  if (tableRows.length < 3) return null; // Need header + separator + at least 1 data row
  
  // Check for separator row (|---|---|)
  const sepIdx = tableRows.findIndex(r => /^\|[\s\-:]+\|/.test(r.replace(/[^|\-:\s]/g, '')));
  if (sepIdx < 1) return null;
  
  const parseCells = (row: string) => row.split("|").slice(1, -1).map(c => c.trim());
  
  const headers = parseCells(tableRows[sepIdx - 1]);
  const dataRows = tableRows.slice(sepIdx + 1).map(parseCells);
  
  if (headers.length < 2 || dataRows.length < 2) return null;
  
  // First column should be year-like or category labels
  const dataSets: DataSet[] = [];
  
  for (let col = 1; col < headers.length; col++) {
    const points: { year: string; value: number }[] = [];
    for (const row of dataRows) {
      const label = row[0]?.replace(/\*+/g, '').trim();
      const rawVal = row[col]?.replace(/[,%£$€*]/g, '').trim();
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

function parseChartData(description: string): { dataSets: DataSet[]; axisLabels: { x: string; y: string } } | null {
  // First try markdown table format
  const tableResult = parseMarkdownTable(description);
  if (tableResult) return tableResult;

  // Fallback: line-based format (Line 1, data points, axis labels)
  const lines = description.split("\n").map(l => l.trim());
  const dataSets: DataSet[] = [];
  let current: DataSet | null = null;
  const axisLabels = { x: "", y: "" };
  let hasLineHeaders = false;

  for (const line of lines) {
    const vMatch = line.match(/vertical\s*axis:\s*(.+)/i);
    if (vMatch) { axisLabels.y = vMatch[1]; continue; }
    const hMatch = line.match(/horizontal\s*axis:\s*(.+)/i);
    if (hMatch) { axisLabels.x = hMatch[1]; continue; }
    const lineMatch = line.match(/^-?\s*\*{0,2}Line\s+\d+\s*\(([^)]+)\):\s*(.+)\*{0,2}/i);
    if (lineMatch) {
      hasLineHeaders = true;
      if (current) dataSets.push(current);
      current = { label: lineMatch[2].trim(), points: [] };
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
  
  // Extract the markdown table from description for raw display
  const markdownTable = useMemo(() => {
    const lines = description.split("\n");
    const tableLines = lines.filter(l => l.trim().startsWith("|"));
    return tableLines.length >= 3 ? tableLines.join("\n") : null;
  }, [description]);

  // Extract source line
  const sourceLine = useMemo(() => {
    const match = description.match(/Source:\s*.+/i);
    return match ? match[0] : null;
  }, [description]);
  
  if (!parsed) {
    // If we couldn't parse chart data but there's a markdown table, render it as a table
    if (markdownTable) {
      return (
        <div className="my-6 rounded-xl border border-border bg-card p-5">
          <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
          <div className="overflow-x-auto">
            <ReactMarkdown components={{
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
    return null;
  }

  const { dataSets, axisLabels } = parsed;
  
  // Check if x-axis values are years (time series → line chart) or categories (→ bar chart)
  const isTimeSeries = dataSets[0].points.every(p => /^\d{4}/.test(p.year));

  // Merge datasets into recharts format
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
          <ReactMarkdown components={{
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
