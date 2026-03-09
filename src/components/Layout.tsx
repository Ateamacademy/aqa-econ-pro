import { Link, useLocation } from "react-router-dom";
import { BookOpen, Brain, FileText, GraduationCap, LayoutDashboard, MessageCircle, PenTool, LogIn, LogOut, Crown, Sparkles, TrendingUp, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject, type Subject } from "@/contexts/SubjectContext";

const baseNavItems = [
  { to: "/", label: "Home", icon: GraduationCap },
  { to: "/predicted", label: "Predicted Papers", icon: Sparkles },
  { to: "/tutor", label: "AI Tutor", icon: MessageCircle },
  { to: "/grader", label: "Grader", icon: PenTool },
  { to: "/practice", label: "Practice", icon: Brain },
  { to: "/diagram-practice", label: "Diagrams", icon: PenTool },
  { to: "/notes", label: "Notes", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

function getNavItems(subject: Subject) {
  const papersItem = subject === "economics"
    ? { to: "/papers", label: "Papers", icon: FileText }
    : subject === "edexcel-a"
    ? { to: "/edexcel-a-papers", label: "Papers", icon: FileText }
    : subject === "edexcel-b"
    ? { to: "/edexcel-b-papers", label: "Papers", icon: FileText }
    : subject === "cambridge"
    ? { to: "/cambridge-papers", label: "Papers", icon: FileText }
    : subject === "ocr"
    ? { to: "/ocr-papers", label: "Papers", icon: FileText }
    : subject === "aqa-gcse"
    ? { to: "/gcse-papers", label: "Papers", icon: FileText }
    : subject === "cambridge-igcse"
    ? { to: "/igcse-papers", label: "Papers", icon: FileText }
    : { to: "/papers", label: "Papers", icon: FileText };

  return [
    baseNavItems[0],
    papersItem,
    ...baseNavItems.slice(1),
  ];
}

const SUBJECTS: { value: Subject; label: string }[] = [
  { value: "economics", label: "AQA" },
  { value: "edexcel-a", label: "Edexcel A" },
  { value: "edexcel-b", label: "Edexcel B" },
  { value: "ocr", label: "OCR" },
  { value: "cambridge", label: "CAIE" },
  { value: "aqa-gcse", label: "GCSE" },
  { value: "cambridge-igcse", label: "IGCSE" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, subscribed, signOut } = useAuth();
  const { subject, setSubject } = useSubject();

  const navItems = getNavItems(subject);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Apple-style dark navbar */}
      <header className="sticky top-0 z-50 bg-[hsl(0,0%,11%)] backdrop-blur-2xl bg-opacity-80">
        <div className="max-w-[1024px] mx-auto flex h-11 items-center justify-between px-4 lg:px-0">
          <Link to="/" className="flex items-center gap-1.5 shrink-0">
            <GraduationCap className="h-[18px] w-[18px] text-[hsl(0,0%,96%)]" />
            <span className="text-sm font-medium text-[hsl(0,0%,96%)] tracking-tight">
              ExamAce
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0">
            {navItems.slice(1).map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-2.5 py-1 text-xs font-normal transition-colors",
                    isActive
                      ? "text-[hsl(0,0%,100%)]"
                      : "text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Subject pill switcher */}
            <div className="flex items-center bg-[hsl(0,0%,18%)] rounded-full p-0.5 gap-0.5">
              {SUBJECTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSubject(s.value)}
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-medium transition-all",
                    subject === s.value
                      ? "bg-primary text-primary-foreground"
                      : "text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,90%)]"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {!subscribed && (
              <Link to="/pricing" className="text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)] text-xs transition-colors">
                Pricing
              </Link>
            )}
            {user ? (
              <button onClick={signOut} className="text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)] text-xs transition-colors">
                Sign Out
              </button>
            ) : (
              <Link to="/auth" className="text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)] text-xs transition-colors">
                Sign In
              </Link>
            )}
          </div>

          <button className="lg:hidden text-[hsl(0,0%,80%)]" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden bg-[hsl(0,0%,11%)] border-t border-[hsl(0,0%,18%)] px-4 pb-4">
            {/* Mobile subject switcher */}
            <div className="flex flex-wrap items-center bg-[hsl(0,0%,18%)] rounded-lg p-1 gap-0.5 my-3">
              {SUBJECTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSubject(s.value)}
                  className={cn(
                    "flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors text-center min-w-[50px]",
                    subject === s.value
                      ? "bg-primary text-primary-foreground"
                      : "text-[hsl(0,0%,60%)]"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-normal transition-colors",
                    isActive
                      ? "text-[hsl(0,0%,100%)] bg-[hsl(0,0%,18%)]"
                      : "text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)]"
                  )}
                >
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
            {!subscribed && (
              <Link to="/pricing" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)]">
                <Crown className="h-4 w-4" /> Pricing
              </Link>
            )}
            {user ? (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)] text-left">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[hsl(0,0%,70%)] hover:text-[hsl(0,0%,100%)]">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Apple-style footer */}
      <footer className="bg-secondary border-t">
        <div className="max-w-[1024px] mx-auto px-4 py-8">
          <p className="text-xs text-muted-foreground leading-relaxed">
            ExamAce provides AI-powered revision tools for A-Level Economics across AQA, Edexcel A, Edexcel B, OCR, and Cambridge International exam boards. Past papers, predicted papers, AI tutoring, answer grading, and practice questions — all in one place.
          </p>
          <div className="border-t border-border mt-4 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">© 2026 ExamAce. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/auth" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
