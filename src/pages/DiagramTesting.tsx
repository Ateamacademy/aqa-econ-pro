/**
 * Diagram Testing Pipeline · AQA A-Level Individual-Level Testing
 * Tests each topic independently against its trained figure mapping.
 */
import { useState, useMemo } from "react";
import { resolveDiagramType, EconDiagramTemplate, DiagramType } from "@/components/revision/EconDiagramLibrary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle, Download, Filter, Eye, Bug } from "lucide-react";

// ─── Topic-to-Figure trained mappings ───
interface TestInput {
  id: string;
  input: string;
  shiftHint?: string;
  expectedFigure: DiagramType;
}

interface TopicSpec {
  topicName: string;
  primaryFigure: DiagramType;
  allowedFigures: DiagramType[];
  testInputs: TestInput[];
}

interface TestResult {
  topicName: string;
  testItemId: string;
  input: string;
  predictedFigure: DiagramType | null;
  expectedFigure: DiagramType;
  confidence: number;
  matchStatus: "Correct" | "Incorrect" | "Needs Review";
  errorType: string;
  explanation: string;
}

const AQA_SPECS: TopicSpec[] = [
  {
    topicName: "Supply & Demand · Shift in Demand",
    primaryFigure: "demand_shift_dual",
    allowedFigures: ["demand_shift_dual", "demand_increase", "demand_decrease"],
    testInputs: [
      { id: "sd-d-1", input: "Supply & Demand · Shift in Demand", expectedFigure: "demand_shift_dual" },
      { id: "sd-d-2", input: "shift in demand", expectedFigure: "demand_shift_dual" },
      { id: "sd-d-3", input: "demand shift", expectedFigure: "demand_shift_dual" },
      { id: "sd-d-4", input: "Demand shifts right", shiftHint: "Demand shifts right", expectedFigure: "demand_shift_dual" },
      { id: "sd-d-5", input: "Demand shifts left", shiftHint: "Demand shifts left", expectedFigure: "demand_shift_dual" },
      { id: "sd-d-6", input: "increase in demand", expectedFigure: "demand_increase" },
      { id: "sd-d-7", input: "decrease in demand", expectedFigure: "demand_decrease" },
    ],
  },
  {
    topicName: "Supply & Demand · Shift in Supply",
    primaryFigure: "supply_shift_dual",
    allowedFigures: ["supply_shift_dual", "supply_increase", "supply_decrease"],
    testInputs: [
      { id: "sd-s-1", input: "Supply & Demand · Shift in Supply", expectedFigure: "supply_shift_dual" },
      { id: "sd-s-2", input: "shift in supply", expectedFigure: "supply_shift_dual" },
      { id: "sd-s-3", input: "supply shift", expectedFigure: "supply_shift_dual" },
      { id: "sd-s-4", input: "Supply shifts right", shiftHint: "Supply shifts right", expectedFigure: "supply_shift_dual" },
      { id: "sd-s-5", input: "Supply shifts left", shiftHint: "Supply shifts left", expectedFigure: "supply_shift_dual" },
      { id: "sd-s-6", input: "increase in supply", expectedFigure: "supply_increase" },
      { id: "sd-s-7", input: "decrease in supply", expectedFigure: "supply_decrease" },
    ],
  },
  {
    topicName: "Indirect Tax (Ad Valorem / Specific)",
    primaryFigure: "tax_incidence",
    allowedFigures: ["tax_incidence"],
    testInputs: [
      { id: "tax-1", input: "Indirect Tax (Ad Valorem / Specific)", expectedFigure: "tax_incidence" },
      { id: "tax-2", input: "indirect tax", expectedFigure: "tax_incidence" },
      { id: "tax-3", input: "specific tax", expectedFigure: "tax_incidence" },
      { id: "tax-4", input: "ad valorem tax", expectedFigure: "tax_incidence" },
      { id: "tax-5", input: "tax incidence", expectedFigure: "tax_incidence" },
      { id: "tax-6", input: "indirect-tax", expectedFigure: "tax_incidence" },
    ],
  },
  {
    topicName: "Subsidy on a Good",
    primaryFigure: "subsidy",
    allowedFigures: ["subsidy"],
    testInputs: [
      { id: "sub-1", input: "Subsidy on a Good", expectedFigure: "subsidy" },
      { id: "sub-2", input: "subsidy", expectedFigure: "subsidy" },
      { id: "sub-3", input: "subsidy diagram", expectedFigure: "subsidy" },
    ],
  },
  {
    topicName: "Negative Externality (Overconsumption / Overproduction)",
    primaryFigure: "negative_externality",
    allowedFigures: ["negative_externality", "negative_production_externality"],
    testInputs: [
      { id: "neg-1", input: "Negative Externality (Overconsumption / Overproduction)", expectedFigure: "negative_externality" },
      { id: "neg-2", input: "negative externality", expectedFigure: "negative_externality" },
      { id: "neg-3", input: "overconsumption", expectedFigure: "negative_externality" },
      { id: "neg-4", input: "overproduction", expectedFigure: "negative_production_externality" },
      { id: "neg-5", input: "demerit good", expectedFigure: "negative_externality" },
      { id: "neg-6", input: "negative consumption externality", expectedFigure: "negative_externality" },
      { id: "neg-7", input: "negative production externality", expectedFigure: "negative_production_externality" },
    ],
  },
  {
    topicName: "Positive Externality (Underconsumption / Underproduction)",
    primaryFigure: "positive_externality",
    allowedFigures: ["positive_externality", "positive_production_externality"],
    testInputs: [
      { id: "pos-1", input: "Positive Externality (Underconsumption / Underproduction)", expectedFigure: "positive_externality" },
      { id: "pos-2", input: "positive externality", expectedFigure: "positive_externality" },
      { id: "pos-3", input: "underconsumption", expectedFigure: "positive_externality" },
      { id: "pos-4", input: "underproduction", expectedFigure: "positive_production_externality" },
      { id: "pos-5", input: "merit good", expectedFigure: "positive_externality" },
      { id: "pos-6", input: "positive consumption externality", expectedFigure: "positive_externality" },
      { id: "pos-7", input: "positive production externality", expectedFigure: "positive_production_externality" },
    ],
  },
  {
    topicName: "Maximum Price (Price Ceiling)",
    primaryFigure: "price_ceiling",
    allowedFigures: ["price_ceiling"],
    testInputs: [
      { id: "ceil-1", input: "Maximum Price (Price Ceiling)", expectedFigure: "price_ceiling" },
      { id: "ceil-2", input: "price ceiling", expectedFigure: "price_ceiling" },
      { id: "ceil-3", input: "maximum price", expectedFigure: "price_ceiling" },
      { id: "ceil-4", input: "rent control", expectedFigure: "price_ceiling" },
      { id: "ceil-5", input: "price cap", expectedFigure: "price_ceiling" },
    ],
  },
  {
    topicName: "Minimum Price (Price Floor)",
    primaryFigure: "price_floor",
    allowedFigures: ["price_floor"],
    testInputs: [
      { id: "floor-1", input: "Minimum Price (Price Floor)", expectedFigure: "price_floor" },
      { id: "floor-2", input: "price floor", expectedFigure: "price_floor" },
      { id: "floor-3", input: "minimum price", expectedFigure: "price_floor" },
      { id: "floor-4", input: "minimum wage", expectedFigure: "price_floor" },
      { id: "floor-5", input: "buffer stock", expectedFigure: "price_floor" },
    ],
  },
  {
    topicName: "AD/AS · Demand-Side Shock",
    primaryFigure: "demand_side_shock",
    allowedFigures: ["demand_side_shock", "ad_increase", "ad_decrease"],
    testInputs: [
      { id: "ad-d-1", input: "AD/AS · Demand-Side Shock", expectedFigure: "demand_side_shock" },
      { id: "ad-d-2", input: "demand side shock", expectedFigure: "demand_side_shock" },
      { id: "ad-d-3", input: "demand pull inflation", expectedFigure: "ad_increase" },
      { id: "ad-d-4", input: "aggregate demand increase", expectedFigure: "ad_increase" },
      { id: "ad-d-5", input: "aggregate demand decrease", expectedFigure: "ad_decrease" },
    ],
  },
  {
    topicName: "AD/AS · Supply-Side Shock",
    primaryFigure: "sras_decrease",
    allowedFigures: ["sras_decrease", "sras_increase"],
    testInputs: [
      { id: "as-s-1", input: "AD/AS · Supply-Side Shock", expectedFigure: "sras_decrease" },
      { id: "as-s-2", input: "cost push inflation", expectedFigure: "sras_decrease" },
      { id: "as-s-3", input: "supply side shock", expectedFigure: "sras_decrease" },
      { id: "as-s-4", input: "aggregate supply decrease", expectedFigure: "sras_decrease" },
      { id: "as-s-5", input: "aggregate supply increase", expectedFigure: "sras_increase" },
      { id: "as-s-6", input: "stagflation", expectedFigure: "sras_decrease" },
    ],
  },
  {
    topicName: "AD/AS · Economic Growth (LRAS Shift)",
    primaryFigure: "lras_shift",
    allowedFigures: ["lras_shift", "ppf_growth"],
    testInputs: [
      { id: "lras-1", input: "AD/AS · Economic Growth (LRAS Shift)", expectedFigure: "lras_shift" },
      { id: "lras-2", input: "LRAS shift", expectedFigure: "lras_shift" },
      { id: "lras-3", input: "long run growth", expectedFigure: "lras_shift" },
      { id: "lras-4", input: "productive capacity", expectedFigure: "lras_shift" },
    ],
  },
  {
    topicName: "Keynesian AS · Spare Capacity vs Full Employment",
    primaryFigure: "keynesian_as",
    allowedFigures: ["keynesian_as"],
    testInputs: [
      { id: "key-1", input: "Keynesian AS · Spare Capacity vs Full Employment", expectedFigure: "keynesian_as" },
      { id: "key-2", input: "keynesian", expectedFigure: "keynesian_as" },
      { id: "key-3", input: "spare capacity", expectedFigure: "keynesian_as" },
      { id: "key-4", input: "keynesian aggregate supply", expectedFigure: "keynesian_as" },
    ],
  },
  {
    topicName: "Labour Market · Wage Determination",
    primaryFigure: "labour_market",
    allowedFigures: ["labour_market"],
    testInputs: [
      { id: "lab-1", input: "Labour Market · Wage Determination", expectedFigure: "labour_market" },
      { id: "lab-2", input: "labour market", expectedFigure: "labour_market" },
      { id: "lab-3", input: "wage determination", expectedFigure: "labour_market" },
      { id: "lab-4", input: "marginal revenue product", expectedFigure: "labour_market" },
      { id: "lab-5", input: "derived demand", expectedFigure: "labour_market" },
    ],
  },
  {
    topicName: "Monopoly · Profit Maximisation (MC=MR)",
    primaryFigure: "monopoly",
    allowedFigures: ["monopoly"],
    testInputs: [
      { id: "mon-1", input: "Monopoly · Profit Maximisation (MC=MR)", expectedFigure: "monopoly" },
      { id: "mon-2", input: "monopoly", expectedFigure: "monopoly" },
      { id: "mon-3", input: "profit maximisation", expectedFigure: "monopoly" },
      { id: "mon-4", input: "monopoly profit", expectedFigure: "monopoly" },
    ],
  },
  {
    topicName: "Perfect Competition · Short Run & Long Run",
    primaryFigure: "perfect_competition",
    allowedFigures: ["perfect_competition"],
    testInputs: [
      { id: "pc-1", input: "Perfect Competition · Short Run & Long Run", expectedFigure: "perfect_competition" },
      { id: "pc-2", input: "perfect competition", expectedFigure: "perfect_competition" },
      { id: "pc-3", input: "perfectly competitive", expectedFigure: "perfect_competition" },
    ],
  },
];

const CONFIDENCE_THRESHOLD = 0.6;

function computeConfidence(predicted: DiagramType | null, expected: DiagramType, allowedFigures: DiagramType[]): number {
  if (!predicted) return 0;
  if (predicted === expected) return 1.0;
  if (allowedFigures.includes(predicted)) return 0.7;
  return 0.2;
}

function classifyError(predicted: DiagramType | null, expected: DiagramType, allowedFigures: DiagramType[]): { errorType: string; explanation: string } {
  if (!predicted) return { errorType: "missing figure", explanation: "resolveDiagramType returned null · no match found in alias/keyword bank" };
  if (predicted === expected) return { errorType: "none", explanation: "Exact match with expected figure" };
  if (allowedFigures.includes(predicted)) return { errorType: "label mismatch", explanation: `Resolved to ${predicted} (acceptable alternative) instead of ${expected}` };
  return { errorType: "cross-topic leakage", explanation: `Resolved to ${predicted} which is outside the allowed figure bank [${allowedFigures.join(", ")}]` };
}

function runTests(): TestResult[] {
  const results: TestResult[] = [];
  for (const spec of AQA_SPECS) {
    for (const tc of spec.testInputs) {
      const predicted = resolveDiagramType(tc.input, tc.shiftHint);
      const confidence = computeConfidence(predicted, tc.expectedFigure, spec.allowedFigures);
      const { errorType, explanation } = classifyError(predicted, tc.expectedFigure, spec.allowedFigures);
      const matchStatus: TestResult["matchStatus"] =
        predicted === tc.expectedFigure ? "Correct" :
        confidence < CONFIDENCE_THRESHOLD ? "Needs Review" : "Incorrect";

      results.push({
        topicName: spec.topicName,
        testItemId: tc.id,
        input: tc.input,
        predictedFigure: predicted,
        expectedFigure: tc.expectedFigure,
        confidence,
        matchStatus,
        errorType,
        explanation,
      });
    }
  }
  return results;
}

type FilterStatus = "all" | "Correct" | "Incorrect" | "Needs Review";

export default function DiagramTesting() {
  const [results] = useState<TestResult[]>(() => runTests());
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterTopic, setFilterTopic] = useState<string>("all");
  const [showDebug, setShowDebug] = useState<string | null>(null);
  const [compareItem, setCompareItem] = useState<string | null>(null);

  const topics = useMemo(() => [...new Set(results.map(r => r.topicName))], [results]);
  
  const filtered = useMemo(() => {
    return results.filter(r => {
      if (filterStatus !== "all" && r.matchStatus !== filterStatus) return false;
      if (filterTopic !== "all" && r.topicName !== filterTopic) return false;
      return true;
    });
  }, [results, filterStatus, filterTopic]);

  // ─── Summaries ───
  const topicSummary = useMemo(() => {
    const map = new Map<string, { total: number; correct: number; incorrect: number; review: number }>();
    for (const r of results) {
      const cur = map.get(r.topicName) || { total: 0, correct: 0, incorrect: 0, review: 0 };
      cur.total++;
      if (r.matchStatus === "Correct") cur.correct++;
      else if (r.matchStatus === "Incorrect") cur.incorrect++;
      else cur.review++;
      map.set(r.topicName, cur);
    }
    return map;
  }, [results]);

  const figureSummary = useMemo(() => {
    const map = new Map<string, { total: number; correct: number }>();
    for (const r of results) {
      const key = r.expectedFigure;
      const cur = map.get(key) || { total: 0, correct: 0 };
      cur.total++;
      if (r.matchStatus === "Correct") cur.correct++;
      map.set(key, cur);
    }
    return map;
  }, [results]);

  const overallCorrect = results.filter(r => r.matchStatus === "Correct").length;
  const overallTotal = results.length;

  function exportJSON() {
    const blob = new Blob([JSON.stringify({ results, topicSummary: Object.fromEntries(topicSummary), figureSummary: Object.fromEntries(figureSummary) }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "diagram-test-results.json";
    a.click();
  }

  function exportCSV() {
    const headers = ["Topic", "Test ID", "Input", "Predicted", "Expected", "Confidence", "Status", "Error Type", "Explanation"];
    const rows = results.map(r => [r.topicName, r.testItemId, r.input, r.predictedFigure || "null", r.expectedFigure, r.confidence.toFixed(2), r.matchStatus, r.errorType, r.explanation]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "diagram-test-results.csv";
    a.click();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Diagram Testing Pipeline</h1>
        <p className="text-muted-foreground mt-1">AQA A-Level Economics · Individual-level topic testing</p>
      </div>

      {/* Overall Score */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Overall Accuracy</p>
              <p className="text-4xl font-black text-primary">{((overallCorrect / overallTotal) * 100).toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">{overallCorrect}/{overallTotal} tests passed</p>
            </div>
            <div className="flex gap-3">
              <Badge variant="outline" className="border-green-500/40 text-green-600 bg-green-500/10 text-sm px-3 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> {results.filter(r => r.matchStatus === "Correct").length} Correct
              </Badge>
              <Badge variant="outline" className="border-amber-500/40 text-amber-600 bg-amber-500/10 text-sm px-3 py-1.5">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" /> {results.filter(r => r.matchStatus === "Needs Review").length} Review
              </Badge>
              <Badge variant="outline" className="border-red-500/40 text-red-600 bg-red-500/10 text-sm px-3 py-1.5">
                <XCircle className="h-3.5 w-3.5 mr-1" /> {results.filter(r => r.matchStatus === "Incorrect").length} Incorrect
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportJSON}><Download className="h-3.5 w-3.5 mr-1" /> JSON</Button>
              <Button variant="outline" size="sm" onClick={exportCSV}><Download className="h-3.5 w-3.5 mr-1" /> CSV</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic-wise Accuracy Summary */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Topic-wise Accuracy Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map(t => {
              const s = topicSummary.get(t)!;
              const pct = (s.correct / s.total) * 100;
              return (
                <button key={t} onClick={() => setFilterTopic(filterTopic === t ? "all" : t)}
                  className={cn("text-left p-3 rounded-xl border transition-all",
                    filterTopic === t ? "border-primary/50 bg-primary/5" : "border-border/40 hover:border-border/80")}>
                  <p className="text-xs font-semibold truncate">{t}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-2 rounded-full bg-muted/60 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? "#16a34a" : pct >= 70 ? "#f59e0b" : "#ef4444" }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: pct === 100 ? "#16a34a" : pct >= 70 ? "#f59e0b" : "#ef4444" }}>{pct.toFixed(0)}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{s.correct}/{s.total} correct · {s.incorrect} fail · {s.review} review</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-muted-foreground mr-1">Filter:</span>
        {(["all", "Correct", "Incorrect", "Needs Review"] as FilterStatus[]).map(s => (
          <Button key={s} variant={filterStatus === s ? "default" : "outline"} size="sm"
            onClick={() => setFilterStatus(s)} className="text-xs">
            {s === "all" ? "All" : s}
          </Button>
        ))}
        {filterTopic !== "all" && (
          <Badge variant="secondary" className="cursor-pointer" onClick={() => setFilterTopic("all")}>
            Topic: {filterTopic.split("·")[0].trim()} ✕
          </Badge>
        )}
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Test Results ({filtered.length})</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 text-left">
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Topic</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Input</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Expected</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Predicted</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Confidence</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Status</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Error</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <>
                    <tr key={r.testItemId} className={cn("border-b border-border/20 hover:bg-muted/20 transition-colors",
                      r.matchStatus === "Incorrect" && "bg-red-500/5",
                      r.matchStatus === "Needs Review" && "bg-amber-500/5")}>
                      <td className="px-4 py-2.5 text-xs max-w-[160px] truncate">{r.topicName.split("·")[0].trim()}</td>
                      <td className="px-4 py-2.5 text-xs font-mono max-w-[180px] truncate">{r.input}</td>
                      <td className="px-4 py-2.5"><Badge variant="outline" className="text-[10px] font-mono">{r.expectedFigure}</Badge></td>
                      <td className="px-4 py-2.5">
                        <Badge variant="outline" className={cn("text-[10px] font-mono",
                          r.matchStatus === "Correct" && "border-green-500/40 text-green-600",
                          r.matchStatus === "Incorrect" && "border-red-500/40 text-red-600",
                          r.matchStatus === "Needs Review" && "border-amber-500/40 text-amber-600")}>
                          {r.predictedFigure || "null"}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={cn("text-xs font-bold",
                          r.confidence >= 0.9 ? "text-green-600" : r.confidence >= 0.6 ? "text-amber-600" : "text-red-600")}>
                          {(r.confidence * 100).toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {r.matchStatus === "Correct" && <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />}
                        {r.matchStatus === "Incorrect" && <XCircle className="h-4 w-4 text-red-600 mx-auto" />}
                        {r.matchStatus === "Needs Review" && <AlertTriangle className="h-4 w-4 text-amber-600 mx-auto" />}
                      </td>
                      <td className="px-4 py-2.5 text-[10px] text-muted-foreground max-w-[140px] truncate">{r.errorType}</td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex gap-1 justify-center">
                          <button onClick={() => setShowDebug(showDebug === r.testItemId ? null : r.testItemId)}
                            className="p-1 rounded hover:bg-muted/60 transition-colors" title="Debug info">
                            <Bug className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                          <button onClick={() => setCompareItem(compareItem === r.testItemId ? null : r.testItemId)}
                            className="p-1 rounded hover:bg-muted/60 transition-colors" title="Compare diagrams">
                            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {showDebug === r.testItemId && (
                      <tr key={`${r.testItemId}-debug`}><td colSpan={8} className="px-4 py-3 bg-muted/20">
                        <p className="text-xs font-semibold mb-1">Debug: Why was "{r.predictedFigure}" selected?</p>
                        <p className="text-xs text-muted-foreground">{r.explanation}</p>
                        <p className="text-xs text-muted-foreground mt-1">Allowed figures for this topic: <span className="font-mono">{AQA_SPECS.find(s => s.topicName === r.topicName)?.allowedFigures.join(", ")}</span></p>
                      </td></tr>
                    )}
                    {compareItem === r.testItemId && (
                      <tr key={`${r.testItemId}-compare`}><td colSpan={8} className="px-4 py-3 bg-muted/10">
                        <p className="text-xs font-semibold mb-3">Side-by-side: Expected vs Predicted</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-green-600 mb-1 uppercase tracking-wider">Expected: {r.expectedFigure}</p>
                            <EconDiagramTemplate type={r.expectedFigure} className="my-0" />
                          </div>
                          {r.predictedFigure && r.predictedFigure !== r.expectedFigure && (
                            <div>
                              <p className="text-[10px] font-bold text-red-600 mb-1 uppercase tracking-wider">Predicted: {r.predictedFigure}</p>
                              <EconDiagramTemplate type={r.predictedFigure} className="my-0" />
                            </div>
                          )}
                          {r.predictedFigure === r.expectedFigure && (
                            <div className="flex items-center justify-center text-green-600">
                              <CheckCircle2 className="h-8 w-8 mr-2" />
                              <span className="font-semibold">Exact match · no comparison needed</span>
                            </div>
                          )}
                        </div>
                      </td></tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Figure-wise Accuracy */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Figure-wise Accuracy Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {[...figureSummary.entries()].sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([fig, s]) => {
              const pct = (s.correct / s.total) * 100;
              return (
                <div key={fig} className="p-2.5 rounded-lg border border-border/40 text-center">
                  <p className="text-[10px] font-mono font-semibold truncate">{fig}</p>
                  <p className="text-lg font-black mt-0.5" style={{ color: pct === 100 ? "#16a34a" : pct >= 70 ? "#f59e0b" : "#ef4444" }}>{pct.toFixed(0)}%</p>
                  <p className="text-[9px] text-muted-foreground">{s.correct}/{s.total}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Low Confidence Items */}
      {results.filter(r => r.confidence < CONFIDENCE_THRESHOLD).length > 0 && (
        <Card className="border-amber-500/30">
          <CardHeader><CardTitle className="text-lg text-amber-600">Low Confidence Items</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.filter(r => r.confidence < CONFIDENCE_THRESHOLD).map(r => (
                <li key={r.testItemId} className="flex items-start gap-2 text-xs">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span><strong>{r.topicName}</strong> → "{r.input}" · confidence {(r.confidence * 100).toFixed(0)}% · {r.explanation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Recommendations</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {results.filter(r => r.matchStatus !== "Correct").length === 0 ? (
              <li className="flex items-center gap-2 text-green-600"><CheckCircle2 className="h-4 w-4" /> All tests passing · no recommendations needed</li>
            ) : (
              <>
                {results.some(r => r.errorType === "cross-topic leakage") && (
                  <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" /> Fix cross-topic leakage: tighten ALIASES/FAMILY_ALIASES to prevent figures resolving to wrong topic bank</li>
                )}
                {results.some(r => r.errorType === "missing figure") && (
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" /> Add missing alias entries for inputs that returned null</li>
                )}
                {results.some(r => r.errorType === "label mismatch") && (
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" /> Consider adding more specific alias entries to distinguish similar labels</li>
                )}
              </>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
