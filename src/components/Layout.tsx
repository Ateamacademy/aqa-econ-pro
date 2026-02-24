import { Link, useLocation } from "react-router-dom";
import { BookOpen, Brain, FileText, GraduationCap, LayoutDashboard, MessageCircle, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home", icon: GraduationCap },
  { to: "/papers", label: "Past Papers", icon: FileText },
  { to: "/tutor", label: "AI Tutor", icon: MessageCircle },
  { to: "/grader", label: "Essay Grader", icon: PenTool },
  { to: "/practice", label: "Practice", icon: Brain },
  { to: "/notes", label: "Study Notes", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t bg-card p-2 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
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
