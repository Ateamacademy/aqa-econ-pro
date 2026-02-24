import { LayoutDashboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your revision progress and see suggested areas to focus on.
        </p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <LayoutDashboard className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h2 className="font-serif text-2xl mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Your revision progress, recent activity, and personalised focus areas will appear here once the backend is connected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
