import { useState } from "react";
import { Download, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DB_BASE = "https://www.dropbox.com/scl/fo/f20wdv2mccnzt8cts52xr";

const resources = [
  { label: "2025 Papers", url: `${DB_BASE}/AOiTQhGYedctewxrINCoKYU/2025%20Papers?rlkey=r7waxfbjez5e38jy7qsj64unc&dl=0` },
  { label: "Mark Schemes", url: `${DB_BASE}/AJ_rYoLqRaLHyrspJ886mgk/Mark%20Scheme?rlkey=r7waxfbjez5e38jy7qsj64unc&dl=0` },
  { label: "Curriculum", url: `${DB_BASE}/AAPhF98SnLxzVdfe7YgYjrI/Curriculum?rlkey=r7waxfbjez5e38jy7qsj64unc&dl=0` },
  { label: "Exam Reports", url: `${DB_BASE}/AE-i99VXlpeB9btjzKnMFnQ/Exam%20Reports?rlkey=r7waxfbjez5e38jy7qsj64unc&dl=0` },
  { label: "Specification", url: `${DB_BASE}/AKhrQV5rXr8sFE-Xgb07gTw/Specification?rlkey=r7waxfbjez5e38jy7qsj64unc&dl=0` },
];

export default function GcsePastPapers() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">AQA GCSE Economics Past Papers</h1>
        <p className="text-muted-foreground">Browse AQA GCSE Economics (8136) past papers, mark schemes, and exam resources.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <Card key={r.label} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-sm">{r.label}</h3>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
