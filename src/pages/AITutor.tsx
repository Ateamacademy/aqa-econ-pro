import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AITutor() {
  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">AI Economics Tutor</h1>
        <p className="text-muted-foreground">
          Ask any AQA Economics question and get clear, specification-focused explanations.
        </p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h2 className="font-serif text-2xl mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            The AI Tutor will be enabled once the backend is connected. It will understand AQA terminology, mark scheme language, and diagram expectations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
