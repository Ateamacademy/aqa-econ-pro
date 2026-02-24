import { PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function EssayGrader() {
  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">AI Essay Grader</h1>
        <p className="text-muted-foreground">
          Submit your essay response and receive marks and feedback against AQA criteria.
        </p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <PenTool className="h-12 w-12 mx-auto mb-4 text-highlight" />
          <h2 className="font-serif text-2xl mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            The Essay Grader will assess your responses using KAA, Application, Analysis, and Evaluation criteria from the AQA mark scheme.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
