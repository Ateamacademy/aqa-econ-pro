import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pastPapers, paperTitles } from "@/data/pastPapers";
import { getASPapers, asPaperTitles } from "@/data/asPastPapers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PastPapers() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [level, setLevel] = useState<"alevel" | "as">("alevel");

  const asPapers = getASPapers("aqa");

  const years = level === "alevel"
    ? [...new Set(pastPapers.map((p) => p.year))].filter((y): y is number => typeof y === "number").sort((a, b) => b - a)
    : [...new Set(asPapers.map((p) => p.year))].filter((y): y is number => typeof y === "number").sort((a, b) => b - a);

  const filtered = (paper: number) =>
    pastPapers.filter((p) => {
      if (p.paper !== paper) return false;
      if (yearFilter !== "all") {
        if (yearFilter === "specimen") { if (p.year !== "Specimen") return false; }
        else if (p.year !== Number(yearFilter)) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return p.type.toLowerCase().includes(q) || String(p.year).toLowerCase().includes(q) || paperTitles[p.paper].toLowerCase().includes(q);
      }
      return true;
    });

  const filteredAS = (paper: number) =>
    asPapers.filter((p) => {
      if (p.paper !== paper) return false;
      if (yearFilter !== "all") {
        if (yearFilter === "specimen") { if (p.year !== "Specimen") return false; }
        else if (p.year !== Number(yearFilter)) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return p.type.toLowerCase().includes(q) || String(p.year).toLowerCase().includes(q);
      }
      return true;
    });

  const renderPaperCard = (p: { id: string; year: number | string; type: string; url: string; paper: number }, label?: string) => (
    <Card key={p.id} className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
          <div>
            <p className="font-medium text-sm">{p.year === "Specimen" ? "Specimen" : p.year} — {p.type}</p>
            <p className="text-xs text-muted-foreground">{label || `Paper ${p.paper}`}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <a href={p.url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">AQA Economics Past Papers</h1>
        <p className="text-muted-foreground">Browse AQA A-Level & AS Economics past papers and mark schemes.</p>
      </div>

      {/* Level toggle */}
      <div className="flex items-center gap-2 mb-6">
        <div className="inline-flex items-center bg-muted rounded-full p-1 gap-0.5">
          <button onClick={() => { setLevel("alevel"); setYearFilter("all"); }} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${level === "alevel" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>A-Level</button>
          <button onClick={() => { setLevel("as"); setYearFilter("all"); }} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${level === "as" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>AS Level</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input placeholder="Search papers..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Years</option>
          {years.map((y) => (<option key={y} value={y}>{y}</option>))}
          <option value="specimen">Specimen</option>
        </select>
      </div>

      {level === "alevel" ? (
        <Tabs defaultValue="1">
          <TabsList className="mb-6">
            <TabsTrigger value="1">Paper 1</TabsTrigger>
            <TabsTrigger value="2">Paper 2</TabsTrigger>
            <TabsTrigger value="3">Paper 3</TabsTrigger>
          </TabsList>
          {[1, 2, 3].map((paper) => (
            <TabsContent key={paper} value={String(paper)}>
              <p className="text-sm text-muted-foreground mb-4">{paperTitles[paper]}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered(paper).map((p) => renderPaperCard(p))}
                {filtered(paper).length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No papers match your filters.</p>}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Tabs defaultValue="1">
          <TabsList className="mb-6">
            <TabsTrigger value="1">Paper 1</TabsTrigger>
            <TabsTrigger value="2">Paper 2</TabsTrigger>
          </TabsList>
          {[1, 2].map((paper) => (
            <TabsContent key={paper} value={String(paper)}>
              <p className="text-sm text-muted-foreground mb-4">{asPaperTitles.aqa[paper]}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAS(paper).map((p) => renderPaperCard(p, `AS Paper ${p.paper}`))}
                {filteredAS(paper).length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No papers match your filters.</p>}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
