import { useState } from "react";
import { Download, FileText, ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PMT_BASE = "https://www.physicsandmathstutor.com/past-papers/gcse-economics";
const SPEC_URL = "https://www.ocr.org.uk/Images/306377-specification-accredited-gcse-economics-j205.pdf";

const DB_BASE = "https://www.dropbox.com/scl/fo/k2lzge03t6xo3dlfzw3cm";

const additionalResources = [
  { label: "OCR GCSE Economics Resources", url: `${DB_BASE}/AI1rn11oAtjHc2fKnjfPIHw?rlkey=y2fkr51adqws12ytno2vedq22&dl=0` },
];

const paperLinks = {
  1: {
    title: "Component 01: Introduction to Economics",
    description: "Covers microeconomic concepts including supply & demand, market structures, market failure, and government intervention.",
    pmtUrl: `${PMT_BASE}/ocr-component-1/`,
  },
  2: {
    title: "Component 02: National and International Economics",
    description: "Covers macroeconomic concepts including GDP, inflation, unemployment, fiscal/monetary policy, and international trade.",
    pmtUrl: `${PMT_BASE}/ocr-component-2/`,
  },
};

export default function OcrGcsePastPapers() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">OCR GCSE Economics Past Papers</h1>
        <p className="text-muted-foreground">
          Browse OCR GCSE Economics (J205) past papers, mark schemes, and resources. Papers are hosted on Physics & Maths Tutor.
        </p>
      </div>

      {/* Specification */}
      <div className="mb-6">
        <Card className="border-primary/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-sm">OCR GCSE Economics Specification (J205)</p>
                <p className="text-xs text-muted-foreground">Official accredited specification document</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={SPEC_URL} target="_blank" rel="noopener noreferrer">
                <Download className="h-3.5 w-3.5" /> Download PDF
              </a>
            </Button>
          </CardContent>
        </Card>
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

      {/* Past Papers by Component */}
      <Tabs defaultValue="1">
        <TabsList className="mb-6">
          <TabsTrigger value="1">Component 01</TabsTrigger>
          <TabsTrigger value="2">Component 02</TabsTrigger>
        </TabsList>

        {([1, 2] as const).map((comp) => (
          <TabsContent key={comp} value={String(comp)}>
            <div className="mb-6">
              <h3 className="font-semibold mb-1">{paperLinks[comp].title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{paperLinks[comp].description}</p>
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">View All Component {String(comp).padStart(2, "0")} Papers</p>
                      <p className="text-xs text-muted-foreground">Question papers, mark schemes, and examiner reports on Physics & Maths Tutor</p>
                    </div>
                  </div>
                  <Button variant="default" size="sm" className="w-full gap-2" asChild>
                    <a href={paperLinks[comp].pmtUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" /> Browse on PMT
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
