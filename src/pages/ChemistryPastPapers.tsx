import { useState } from "react";
import { Download, FileText, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  chemistryPastPapers,
  chemistryPaperTitles,
} from "@/data/chemistryPastPapers";

export default function ChemistryPastPapers() {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<"Foundation" | "Higher">("Higher");

  const years = [...new Set(chemistryPastPapers.map((p) => p.year))]
    .filter((y): y is number => typeof y === "number")
    .sort((a, b) => b - a);

  const filtered = (paper: number) =>
    chemistryPastPapers.filter((p) => {
      if (p.paper !== paper) return false;
      if (p.tier !== tierFilter) return false;
      if (yearFilter !== "all") {
        if (yearFilter === "specimen") {
          if (p.year !== "Specimen") return false;
        } else if (p.year !== Number(yearFilter)) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return (
          p.type.toLowerCase().includes(q) ||
          String(p.year).toLowerCase().includes(q)
        );
      }
      return true;
    });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2 flex items-center gap-2">
          <FlaskConical className="h-8 w-8 text-accent" />
          AQA GCSE Chemistry Past Papers
        </h1>
        <p className="text-muted-foreground">
          Browse AQA GCSE Chemistry (8462) past papers and mark schemes.
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
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
          <option value="specimen">Specimen</option>
        </select>
        <select
          value={tierFilter}
          onChange={(e) =>
            setTierFilter(e.target.value as "Foundation" | "Higher")
          }
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="Higher">Higher</option>
          <option value="Foundation">Foundation</option>
        </select>
      </div>

      <Tabs defaultValue="1">
        <TabsList className="mb-6">
          <TabsTrigger value="1">Paper 1</TabsTrigger>
          <TabsTrigger value="2">Paper 2</TabsTrigger>
        </TabsList>

        {[1, 2].map((paper) => (
          <TabsContent key={paper} value={String(paper)}>
            <p className="text-sm text-muted-foreground mb-4">
              {chemistryPaperTitles[paper]}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered(paper).map((p) => (
                <Card key={p.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium text-sm">
                          {p.year === "Specimen" ? "Specimen" : p.year} —{" "}
                          {p.type}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Paper {p.paper} ({p.tier})
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
