import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function BecomeATeacher() {
  const { user } = useAuth();
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-xl w-full p-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 mb-4">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Become a teacher on EconRev</h1>
        <p className="text-sm text-muted-foreground mt-2">
          The Teacher Workspace lets you create classes, set homework, mark with AI assistance, run cohort analytics, generate parent reports, and surface at-risk students.
        </p>
        <div className="mt-6 space-y-3 text-sm">
          <p className="text-foreground font-medium">How to request access</p>
          <p className="text-muted-foreground">
            We are onboarding schools manually right now. Email{" "}
            <a href="mailto:elevate@econrev.co" className="text-primary underline">elevate@econrev.co</a>{" "}
            with your school name and the email you signed up with{user ? `: ${user.email}` : ""}.
          </p>
          <p className="text-muted-foreground">We'll grant your account teacher access within one working day.</p>
        </div>
        <div className="flex gap-2 mt-8">
          <Button asChild variant="outline" className="flex-1"><Link to="/dashboard">Back to dashboard</Link></Button>
          <Button asChild className="flex-1 gap-1.5">
            <a href="mailto:elevate@econrev.co?subject=Teacher%20access%20request">
              <Mail className="h-4 w-4" /> Email us
            </a>
          </Button>
        </div>
      </Card>
    </div>
  );
}
