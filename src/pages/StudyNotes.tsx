import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function StudyNotes() {
  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Study Notes</h1>
        <p className="text-muted-foreground">
          Revision notes organised by AQA specification topic with definitions, diagrams, and evaluation points.
        </p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="font-serif text-2xl mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Comprehensive study notes covering every topic across all three papers will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
