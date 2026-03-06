import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ocrPastPapers, ocrComponentTitles } from "@/data/ocrPastPapers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OcrPastPapers() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const years = [...new Set(ocrPastPapers.map((p) => p.year))].sort((a, b) => b - a);

  const filtered = (component: 1 | 2 | 3) =>
    ocrPastPapers.filter((p) => {
      if (p.component !== component) return false;
      if (yearFilter !== "all" && p.year !== Number(yearFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.type.toLowerCase().includes(q) ||
          String(p.year).includes(q) ||
          ocrComponentTitles[p.component].toLowerCase().includes(q)
        );
      }
      return true;
    });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">OCR A-Level Economics Past Papers</h1>
        <p className="text-muted-foreground">
          Browse OCR H460 A-Level Economics past papers and mark schemes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap">
        <Input placeholder="Search papers..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Years</option>
          {years.map((y) => (<option key={y} value={y}>{y}</option>))}
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
                        <p className="font-medium text-sm">June {p.year} — {p.type}</p>
                        <p className="text-xs text-muted-foreground">Component {String(p.component).padStart(2, "0")}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={p.url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {filtered(comp).length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-8">No papers match your filters.</p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
