import { Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Practice() {
  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Practice Questions</h1>
        <p className="text-muted-foreground">
          Generate AQA-style questions on any topic with instant feedback and marking.
        </p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h2 className="font-serif text-2xl mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Choose a topic and question style — the AI will generate questions in the style of AQA past papers with instant marking.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
