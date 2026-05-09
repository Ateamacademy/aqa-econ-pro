import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ocrPastPapers, ocrComponentTitles } from "@/data/ocrPastPapers";
import { getASPapers, asPaperTitles } from "@/data/asPastPapers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function OcrPastPapers() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [level, setLevel] = useState<"alevel" | "as">("alevel");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const asPapers = getASPapers("ocr");
  const asYears = [...new Set(asPapers.map((p) => p.year))].filter((y): y is number => typeof y === "number").sort((a, b) => b - a);

  const filtered = (component: 1 | 2 | 3) =>
    ocrPastPapers.filter((p) => {
      if (p.component !== component) return false;
      if (categoryFilter !== "all" && p.session !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.type.toLowerCase().includes(q) || p.label.toLowerCase().includes(q) || String(p.year).toLowerCase().includes(q);
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

  const sessionBadge = (session: string) => {
    switch (session) {
      case "jun": return <Badge variant="default" className="text-xs">2025</Badge>;
      case "practice": return <Badge variant="secondary" className="text-xs">Practice</Badge>;
      case "sample": return <Badge variant="outline" className="text-xs">Sample</Badge>;
      default: return null;
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">OCR A-Level Economics Past Papers</h1>
        <p className="text-muted-foreground">Browse OCR H460 A-Level Economics papers, mark schemes, and practice materials.</p>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="inline-flex items-center bg-muted rounded-full p-1 gap-0.5">
          <button onClick={() => { setLevel("alevel"); setYearFilter("all"); }} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${level === "alevel" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>A-Level</button>
          <button onClick={() => { setLevel("as"); setYearFilter("all"); }} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${level === "as" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>AS Level</button>
        </div>
      </div>

      {level === "alevel" ? (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap">
            <Input placeholder="Search papers..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">All Categories</option>
              <option value="jun">2025 Papers</option>
              <option value="practice">Practice Papers</option>
              <option value="sample">Sample Papers</option>
            </select>
          </div>

          <Tabs defaultValue="1">
            <TabsList className="mb-6">
              <TabsTrigger value="1">Component 01</TabsTrigger>
              <TabsTrigger value="2">Component 02</TabsTrigger>
              <TabsTrigger value="3">Component 03</TabsTrigger>
            </TabsList>
            {([1, 2, 3] as const).map((comp) => (
              <TabsContent key={comp} value={String(comp)}>
                <p className="text-sm text-muted-foreground mb-4">{ocrComponentTitles[comp]}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered(comp).map((p) => (
                    <Card key={p.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{p.label}</p>
                              {sessionBadge(p.session)}
                            </div>
                            <p className="text-xs text-muted-foreground">{p.type}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={p.url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {filtered(comp).length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No papers match your filters.</p>}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input placeholder="Search papers..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
            <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">All Years</option>
              {asYears.map((y) => (<option key={y} value={y}>{y}</option>))}
              <option value="specimen">Specimen</option>
            </select>
          </div>

          <Tabs defaultValue="1">
            <TabsList className="mb-6">
              <TabsTrigger value="1">Paper 1</TabsTrigger>
              <TabsTrigger value="2">Paper 2</TabsTrigger>
            </TabsList>
            {[1, 2].map((paper) => (
              <TabsContent key={paper} value={String(paper)}>
                <p className="text-sm text-muted-foreground mb-4">{asPaperTitles.ocr[paper]}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAS(paper).map((p) => (
                    <Card key={p.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="font-medium text-sm">{p.year === "Specimen" ? "Specimen" : p.year} · {p.type}</p>
                            <p className="text-xs text-muted-foreground">AS Paper {p.paper}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={p.url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredAS(paper).length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No papers match your filters.</p>}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
}
