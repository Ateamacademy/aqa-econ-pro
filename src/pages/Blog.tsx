import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const posts = [
  { title: "Top 10 Evaluation Techniques for A-Level Economics", date: "March 2026", tag: "Exam Technique", to: "/notes" },
  { title: "How to Draw Perfect Economics Diagrams Under Pressure", date: "February 2026", tag: "Diagrams", to: "/diagram-practice" },
  { title: "Understanding Monetary Policy: A Complete Guide", date: "February 2026", tag: "Macroeconomics", to: "/notes" },
  { title: "Common Mistakes in Data Response Questions", date: "January 2026", tag: "Exam Technique", to: "/practice" },
  { title: "How Predicted Papers Help You Revise Smarter", date: "January 2026", tag: "Study Tips", to: "/predicted" },
  { title: "The Ultimate Economics Essay Structure", date: "December 2025", tag: "Essays", to: "/grader" },
];

export default function Blog() {
  return (
    <div className="container max-w-4xl py-16 px-4">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Blog</h1>
      <p className="text-muted-foreground mb-10">Revision tips, exam strategies & Economics insights.</p>
      <div className="grid gap-5">
        {posts.map((p) => (
          <Link key={p.title} to={p.to}>
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5 mr-3">{p.tag}</span>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                  <h3 className="text-sm font-semibold mt-1.5">{p.title}</h3>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
