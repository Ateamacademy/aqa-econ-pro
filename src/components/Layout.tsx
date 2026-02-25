import { Link, useLocation } from "react-router-dom";
import { BookOpen, Brain, FileText, GraduationCap, LayoutDashboard, MessageCircle, PenTool, LogIn, LogOut, Crown, Sparkles, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/", label: "Home", icon: GraduationCap },
  { to: "/papers", label: "Econ Papers", icon: FileText },
  { to: "/maths-papers", label: "Maths Papers", icon: Calculator },
  { to: "/predicted", label: "Predicted Papers", icon: Sparkles },
  { to: "/tutor", label: "AI Tutor", icon: MessageCircle },
  { to: "/grader", label: "Essay Grader", icon: PenTool },
  { to: "/practice", label: "Practice", icon: Brain },
  { to: "/notes", label: "Study Notes", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, subscribed, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-accent" />
            <span className="font-serif text-xl font-normal tracking-tight">
              Econ<span className="text-accent">Ace</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {!subscribed && (
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link to="/pricing"><Crown className="h-3.5 w-3.5" /> Pricing</Link>
              </Button>
            )}
            {user ? (
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-1">
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </Button>
            ) : (
              <Button asChild size="sm" className="gap-1">
                <Link to="/auth"><LogIn className="h-3.5 w-3.5" /> Sign In</Link>
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t bg-card p-2 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                  className={cn("flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}>
                  <Icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
            {!subscribed && (
              <Link to="/pricing" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
                <Crown className="h-4 w-4" /> Pricing
              </Link>
            )}
            {user ? (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted text-left">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>EconAce — AQA A-Level Economics Revision Platform</p>
        </div>
      </footer>
    </div>
  );
}
