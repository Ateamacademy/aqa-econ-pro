import { Link, useLocation } from "react-router-dom";
import { BookOpen, Brain, FileText, GraduationCap, LayoutDashboard, MessageCircle, PenTool, LogIn, LogOut, Crown, Sparkles, TrendingUp, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject, type Subject } from "@/contexts/SubjectContext";

const baseNavItems = [
  { to: "/notes", label: "Notes", icon: BookOpen },
  { to: "/tutor", label: "AI Tutor", icon: MessageCircle },
  { to: "/grader", label: "Grader", icon: PenTool },
  { to: "/practice", label: "Practice", icon: Brain },
  { to: "/diagram-practice", label: "Diagrams", icon: PenTool },
  { to: "/predicted", label: "Predicted Papers", icon: Sparkles },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

function getNavItems(_subject: Subject) {
  return baseNavItems;
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Frosted glass navbar */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-[1280px] mx-auto flex h-14 items-center justify-between px-5 lg:px-6">
          <Link to="/" className="flex items-center shrink-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {/* Subject pill switcher */}
            <div className="flex items-center bg-[hsl(var(--primary)/0.08)] border border-border rounded-full p-1 gap-0.5">
              {SUBJECTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSubject(s.value)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap",
                    subject === s.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {!subscribed && (
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                Pricing
              </Link>
            )}
            {user ? (
              <button onClick={signOut} className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                Sign Out
              </button>
            ) : (
              <Link to="/auth" className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Sign In
              </Link>
            )}
          </div>

          <button className="lg:hidden text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <nav className="lg:hidden bg-background border-t border-border px-4 pb-4">
            <div className="flex flex-wrap items-center bg-muted rounded-xl p-1 gap-0.5 my-3">
              {SUBJECTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSubject(s.value)}
                  className={cn(
                    "flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-center min-w-[50px]",
                    subject === s.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                location.pathname === "/"
                  ? "text-foreground bg-primary/15"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <GraduationCap className="h-4 w-4" /> Home
            </Link>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground bg-primary/15"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
            {!subscribed && (
              <Link to="/pricing" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground">
                <Crown className="h-4 w-4" /> Pricing
              </Link>
            )}
            {user ? (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground text-left">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-[1280px] mx-auto px-5 py-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <GraduationCap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">Econ Rev</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
            Econ Rev provides AI-powered revision tools for A-Level and GCSE Economics across AQA, Edexcel A, Edexcel B, OCR, Cambridge International, AQA GCSE, and CAIE IGCSE exam boards. Past papers, predicted papers, AI tutoring, answer grading, and practice questions in one place.
          </p>
          <div className="border-t border-border mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">© 2026 Econ Rev. All rights reserved.</p>
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
