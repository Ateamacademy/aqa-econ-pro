import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Lock, Brain, PenTool, Crown, FileText } from "lucide-react";
import { FREE_LIMITS } from "@/lib/plans";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { user, subscribed, subscriptionEnd, profile } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container py-16 max-w-3xl text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="font-serif text-3xl mb-3">Sign in to view your dashboard</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  const papersUsed = profile?.free_papers_used ?? 0;
  const questionsUsed = profile?.free_questions_used ?? 0;

  return (
    <div className="container py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Crown className="h-4 w-4" /> Subscription Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscribed ? (
              <div>
                <p className="text-lg font-semibold text-accent">Active Subscriber</p>
                {subscriptionEnd && <p className="text-xs text-muted-foreground">Renews: {new Date(subscriptionEnd).toLocaleDateString()}</p>}
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold">Free Plan</p>
                <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/pricing")}>Upgrade</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Joined {new Date(user.created_at).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      {!subscribed && (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <PenTool className="h-4 w-4" /> Free Papers Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{papersUsed} / {FREE_LIMITS.papers}</p>
              <Progress value={(papersUsed / FREE_LIMITS.papers) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Brain className="h-4 w-4" /> Free Questions Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{questionsUsed} / {FREE_LIMITS.questions}</p>
              <Progress value={(questionsUsed / FREE_LIMITS.questions) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>
      )}

      <h2 className="font-serif text-2xl mb-4">Quick Links</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: FileText, label: "Past Papers", to: "/papers" },
          { icon: Brain, label: "Practice", to: "/practice" },
          { icon: PenTool, label: "Essay Grader", to: "/grader" },
        ].map(({ icon: Icon, label, to }) => (
          <Card key={to} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => navigate(to)}>
            <CardContent className="p-4 flex items-center gap-3">
              <Icon className="h-5 w-5 text-accent" />
              <span className="font-medium text-sm">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
