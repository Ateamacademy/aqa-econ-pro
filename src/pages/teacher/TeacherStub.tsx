import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function TeacherStub({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 lg:p-8 max-w-[1280px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-6">{description}</p>
      <Card className="p-10 text-center">
        <Construction className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-foreground font-medium">Coming in the next iteration</p>
        <p className="text-xs text-muted-foreground mt-1">This module ships next.</p>
      </Card>
    </div>
  );
}
