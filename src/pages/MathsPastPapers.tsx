import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mathsPastPapers, mathsPaperTitles } from "@/data/mathsPastPapers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MathsPastPapers() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [sessionFilter, setSessionFilter] = useState<string>("all");

  // Unique sessions sorted reverse-chronologically, specials at end
  const sessions = [...new Set(mathsPastPapers.map((p) => p.session))].sort((a, b) => {
    const yearA = parseInt(a.replace(/\D/g, "")) || 0;
    const yearB = parseInt(b.replace(/\D/g, "")) || 0;
    if (yearA !== yearB) return yearB - yearA;
    return a.localeCompare(b);
  });

  const filtered = (paper: number) =>
    mathsPastPapers.filter((p) => {
      if (p.paper !== paper) return false;
      if (tierFilter !== "all" && p.tier !== tierFilter) return false;
      if (sessionFilter !== "all" && p.session !== sessionFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.type.toLowerCase().includes(q) ||
          p.session.toLowerCase().includes(q) ||
          p.tier.toLowerCase().includes(q)
        );
      }
      return true;
    });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Maths Past Papers</h1>
        <p className="text-muted-foreground">
          Browse Edexcel GCSE Maths (1MA1) past papers, mark schemes and model answers.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search papers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All Tiers</option>
          <option value="Foundation">Foundation</option>
          <option value="Higher">Higher</option>
        </select>
        <select
          value={sessionFilter}
          onChange={(e) => setSessionFilter(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All Sessions</option>
          {sessions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="1">
        <TabsList className="mb-6">
          <TabsTrigger value="1">Paper 1</TabsTrigger>
          <TabsTrigger value="2">Paper 2</TabsTrigger>
          <TabsTrigger value="3">Paper 3</TabsTrigger>
        </TabsList>

        {[1, 2, 3].map((paper) => (
          <TabsContent key={paper} value={String(paper)}>
            <p className="text-sm text-muted-foreground mb-4">
              {mathsPaperTitles[paper]}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered(paper).map((p) => (
                <Card key={p.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium text-sm">
                          {p.session} · {p.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Paper {p.paper} · {p.tier}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {filtered(paper).length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-8">
                  No papers match your filters.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
