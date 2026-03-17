import { useState } from "react";
import { Download, FileText, ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { edexcelIgcsePastPapers, edexcelIgcsePaperTitles } from "@/data/edexcelIgcsePastPapers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DB_BASE = "https://www.dropbox.com/scl/fo/5bgrr9xxdquzczxgoeki8";

const additionalResources = [
  { label: "Edexcel IGCSE Economics Resources", url: `${DB_BASE}/ACDp8GpoFGosLd8TvtF7Nj4?rlkey=g4mi7mns1zehcdh2jz1q23toz&dl=0` },
];

export default function EdexcelIgcsePastPapers() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const years = [...new Set(edexcelIgcsePastPapers.map((p) => p.year))].filter((y): y is number => typeof y === "number").sort((a, b) => b - a);

  const filtered = (paper: 1 | 2) =>
    edexcelIgcsePastPapers.filter((p) => {
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

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Edexcel IGCSE Economics Past Papers</h1>
        <p className="text-muted-foreground">
          Browse Pearson Edexcel International GCSE Economics (4EC1) past papers and mark schemes from Physics & Maths Tutor.
        </p>
      </div>

      {/* Additional Resources */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" /> Additional Resources
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalResources.map((r) => (
            <Card key={r.label} className="hover:shadow-sm transition-shadow border-primary/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-sm">{r.label}</h3>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3.5 w-3.5" /> Browse Resources
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
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

      <Tabs defaultValue="1">
        <TabsList className="mb-6">
          <TabsTrigger value="1">Paper 1</TabsTrigger>
          <TabsTrigger value="2">Paper 2</TabsTrigger>
        </TabsList>

        {([1, 2] as const).map((paper) => (
          <TabsContent key={paper} value={String(paper)}>
            <p className="text-sm text-muted-foreground mb-4">{edexcelIgcsePaperTitles[paper]}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered(paper).map((p) => (
                <Card key={p.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{p.year === "Specimen" ? "Specimen" : p.year} — {p.type}</p>
                        <p className="text-xs text-muted-foreground">Paper {p.paper}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={p.url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {filtered(paper).length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-8">No papers match your filters.</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
