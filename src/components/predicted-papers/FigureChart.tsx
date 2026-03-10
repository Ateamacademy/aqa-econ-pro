import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
  if (!parsed) return null;

  const { dataSets, axisLabels } = parsed;

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
      <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
      <ResponsiveContainer width="100%" height={280}>
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
      </ResponsiveContainer>
    </div>
  );
}
