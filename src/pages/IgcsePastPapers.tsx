import { useState } from "react";
import { Download, FileText, ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DB_BASE = "https://www.dropbox.com/scl/fo/9dix0nd5sfit6bni4j3w8";

const EXTRA_DB_BASE = "https://www.dropbox.com/scl/fo/07pgfxx9yf3iw75trvgtj";

const additionalResources = [
  { label: "CAIE IGCSE Economics Additional Resources", url: `${EXTRA_DB_BASE}/AAICrRS0H2SCJHMuvX5UYQ0?rlkey=8onaqbp0d073rhky5l7bzqkxs&dl=0` },
];

const resources = [
  { label: "Examination Resources", url: `${DB_BASE}/AFCJH6LF6HSTHgJfvAsNMyo/Examination%20Resources?rlkey=1wm8jv56olq85faaaienr8y3f&dl=0` },
  { label: "Revision Notes", url: `${DB_BASE}/AM1vkeDxMKw_iJnLNqS9RGo/Revision%20Notes?rlkey=1wm8jv56olq85faaaienr8y3f&dl=0` },
  { label: "Specimen Material", url: `${DB_BASE}/AGG6VMON8Qc6uyksVmsINsk/Specimen%20Material?rlkey=1wm8jv56olq85faaaienr8y3f&dl=0` },
  { label: "Syllabus", url: `${DB_BASE}/ACV76ISPwp9bWj6WbsCnIkc/Syllabus?rlkey=1wm8jv56olq85faaaienr8y3f&dl=0` },
  { label: "Teaching & Learning", url: `${DB_BASE}/AAMT-YMW5Q6uPlgdeSO9GHI/Teaching%20and%20Learning?rlkey=1wm8jv56olq85faaaienr8y3f&dl=0` },
];

export default function IgcsePastPapers() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Cambridge IGCSE Economics Past Papers</h1>
        <p className="text-muted-foreground">Browse Cambridge International IGCSE Economics (0455) past papers and resources.</p>
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
