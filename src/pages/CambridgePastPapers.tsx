import { useState } from "react";
import { Download, FileText, ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cambridgePastPapers, cambridgePaperTitles, sessionLabels } from "@/data/cambridgePastPapers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DB_BASE = "https://www.dropbox.com/scl/fo/a6ihfh382tgxp98ex701g";

const additionalResources = [
  { label: "CAIE A-Level Economics Resources", url: `${DB_BASE}/AINXwAnem4EV6v7MKyB1T8c?rlkey=fqwe61nwgwsywutgo4i59tquj&dl=0` },
];

export default function CambridgePastPapers() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sessionFilter, setSessionFilter] = useState<string>("all");
  const [variantFilter, setVariantFilter] = useState<string>("all");

  const years = [...new Set(cambridgePastPapers.map((p) => p.year))].sort((a, b) => b - a);

  const filtered = (paper: 1 | 2 | 3 | 4) =>
    cambridgePastPapers.filter((p) => {
      if (p.paper !== paper) return false;
      if (yearFilter !== "all" && p.year !== Number(yearFilter)) return false;
      if (sessionFilter !== "all" && p.session !== sessionFilter) return false;
      if (variantFilter !== "all" && p.variant !== Number(variantFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.type.toLowerCase().includes(q) ||
          String(p.year).includes(q) ||
          cambridgePaperTitles[p.paper].toLowerCase().includes(q)
        );
      }
      return true;
    });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Cambridge International A-Level Economics Past Papers</h1>
        <p className="text-muted-foreground">
          Browse CAIE 9708 AS & A-Level Economics past papers, mark schemes, and inserts from PapaCambridge.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap">
        <Input placeholder="Search papers..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Years</option>
          {years.map((y) => (<option key={y} value={y}>{y}</option>))}
        </select>
        <select value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Sessions</option>
          <option value="s">May/June</option>
          <option value="w">Oct/Nov</option>
          <option value="m">March</option>
        </select>
        <select value={variantFilter} onChange={(e) => setVariantFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Variants</option>
          <option value="1">Variant 1</option>
          <option value="2">Variant 2</option>
          <option value="3">Variant 3</option>
        </select>
      </div>

      <Tabs defaultValue="1">
        <TabsList className="mb-6">
          <TabsTrigger value="1">Paper 1</TabsTrigger>
          <TabsTrigger value="2">Paper 2</TabsTrigger>
          <TabsTrigger value="3">Paper 3</TabsTrigger>
          <TabsTrigger value="4">Paper 4</TabsTrigger>
        </TabsList>

        {([1, 2, 3, 4] as const).map((paper) => (
          <TabsContent key={paper} value={String(paper)}>
            <p className="text-sm text-muted-foreground mb-4">{cambridgePaperTitles[paper]}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered(paper).map((p) => (
                <Card key={p.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{sessionLabels[p.session]} {p.year} — {p.type}</p>
                        <p className="text-xs text-muted-foreground">Paper {p.paper} · Variant {p.variant}</p>
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
