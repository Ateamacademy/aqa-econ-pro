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
      <header className="sticky top-0 z-50 bg-[hsl(240,10%,8%/0.92)] backdrop-blur-2xl border-b border-[hsl(246,8%,20%)]">
        <div className="max-w-[1080px] mx-auto flex h-12 items-center justify-between px-5 lg:px-0">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-[hsl(240,7%,93%)] tracking-tight">
              ExamAce
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.slice(1).map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    isActive
                      ? "text-primary-foreground bg-primary/20 text-[hsl(239,28%,85%)]"
                      : "text-[hsl(240,7%,60%)] hover:text-[hsl(240,7%,90%)] hover:bg-[hsl(246,8%,15%)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {/* Subject pill switcher */}
            <div className="flex items-center bg-[hsl(246,8%,14%)] rounded-full p-0.5 gap-0.5">
              {SUBJECTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSubject(s.value)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all duration-200",
                    subject === s.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-[hsl(240,7%,55%)] hover:text-[hsl(240,7%,80%)]"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-[hsl(246,8%,20%)] mx-1" />

            {!subscribed && (
              <Link to="/pricing" className="text-[hsl(240,7%,60%)] hover:text-[hsl(240,7%,90%)] text-xs font-medium transition-colors">
                Pricing
              </Link>
            )}
            {user ? (
              <button onClick={signOut} className="text-[hsl(240,7%,60%)] hover:text-[hsl(240,7%,90%)] text-xs font-medium transition-colors">
                Sign Out
              </button>
            ) : (
              <Link to="/auth" className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Sign In
              </Link>
            )}
          </div>

          <button className="lg:hidden text-[hsl(240,7%,75%)]" onClick={() => setMobileOpen(!mobileOpen)}>
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
          <nav className="lg:hidden bg-[hsl(240,10%,8%)] border-t border-[hsl(246,8%,18%)] px-4 pb-4">
            {/* Mobile subject switcher */}
            <div className="flex flex-wrap items-center bg-[hsl(246,8%,14%)] rounded-xl p-1 gap-0.5 my-3">
              {SUBJECTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSubject(s.value)}
                  className={cn(
                    "flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-center min-w-[50px]",
                    subject === s.value
                      ? "bg-primary text-primary-foreground"
                      : "text-[hsl(240,7%,55%)]"
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
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "text-[hsl(240,7%,93%)] bg-primary/15"
                      : "text-[hsl(240,7%,60%)] hover:text-[hsl(240,7%,90%)]"
                  )}
                >
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
            {!subscribed && (
              <Link to="/pricing" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[hsl(240,7%,60%)] hover:text-[hsl(240,7%,90%)]">
                <Crown className="h-4 w-4" /> Pricing
              </Link>
            )}
            {user ? (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[hsl(240,7%,60%)] hover:text-[hsl(240,7%,90%)] text-left">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[hsl(240,7%,60%)] hover:text-[hsl(240,7%,90%)]">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[hsl(240,10%,8%)] border-t border-[hsl(246,8%,18%)]">
        <div className="max-w-[1080px] mx-auto px-5 py-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <GraduationCap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-[hsl(240,7%,80%)]">ExamAce</span>
          </div>
          <p className="text-xs text-[hsl(240,7%,45%)] leading-relaxed max-w-2xl">
            ExamAce provides AI-powered revision tools for A-Level and GCSE Economics across AQA, Edexcel A, Edexcel B, OCR, Cambridge International, AQA GCSE, and CAIE IGCSE exam boards. Past papers, predicted papers, AI tutoring, answer grading, and practice questions in one place.
          </p>
          <div className="border-t border-[hsl(246,8%,18%)] mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-[hsl(240,7%,40%)]">© 2026 ExamAce. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/pricing" className="text-xs text-[hsl(240,7%,50%)] hover:text-[hsl(240,7%,80%)] transition-colors">Pricing</Link>
              <Link to="/auth" className="text-xs text-[hsl(240,7%,50%)] hover:text-[hsl(240,7%,80%)] transition-colors">Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
