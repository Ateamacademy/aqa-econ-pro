import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";

export default function ChemistryPastPapers() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-2 flex items-center gap-2">
          <FlaskConical className="h-7 w-7 text-accent" /> AQA GCSE Chemistry Past Papers
        </h1>
        <p className="text-muted-foreground">Browse AQA GCSE Chemistry (8462) past papers by year.</p>
      </div>

      <div className="space-y-4">
        {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
          <Card key={year}>
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-lg">{year}</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              {["Paper 1 (Topics 1–5)", "Paper 2 (Topics 6–10)"].map((paper, i) => (
                <div key={paper} className="border rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">{paper}</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Question Paper", "Mark Scheme"].map((type) => (
                      <a
                        key={type}
                        href={`https://www.physicsandmathstutor.com/chemistry-revision/gcse-aqa/past-papers/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        {type} ↗
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
