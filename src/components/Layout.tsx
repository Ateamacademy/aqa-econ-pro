import { Link, useLocation } from "react-router-dom";
import { GraduationCap, LogIn, LogOut, Crown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject, type Subject } from "@/contexts/SubjectContext";

const navLinks = [
  { to: "/notes", label: "Notes" },
  { to: "/tutor", label: "AI Tutor" },
  { to: "/grader", label: "Grader" },
  { to: "/practice", label: "Practice" },
  { to: "/diagram-practice", label: "Diagrams" },
  { to: "/predicted", label: "Predicted Papers" },
  { to: "/dashboard", label: "Dashboard" },
];

const homepageNavLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#pricing", label: "For Schools" },
];

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
  const [scrolled, setScrolled] = useState(false);
  const { user, subscribed, signOut } = useAuth();
  const { subject, setSubject } = useSubject();
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentNavLinks = isHomepage ? homepageNavLinks : navLinks;

  return (
    <div className="min-h-screen flex flex-col bg-background dot-grid-bg">
      {/* Frosted glass navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1280px] mx-auto flex h-16 items-center justify-between px-5 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center animate-inner-glow">
              <div className="h-4 w-4 rounded-sm bg-primary" />
            </div>
            <span className="text-base font-bold text-foreground tracking-tight">Econ Rev</span>
          </Link>

          {/* Centre nav */}
          <nav className="hidden lg:flex items-center gap-7 mx-auto">
            {isHomepage
              ? homepageNavLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </a>
                ))
              : navLinks.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "text-sm font-medium transition-colors relative",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {!isHomepage && (
              <div className="flex items-center bg-card border border-border rounded-full p-1 gap-0.5 mr-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSubject(s.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap",
                      subject === s.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            {isHomepage ? (
              <>
                <Link
                  to="/auth"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                >
                  Log In
                </Link>
                <Button asChild size="sm" className="rounded-lg px-5 gap-1.5">
                  <Link to="/auth">
                    Start Free <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>


                {user ? (
                  <button onClick={signOut} className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                    Sign Out
                  </button>
                ) : (
                  <Button asChild size="sm" className="rounded-lg px-5">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile toggle */}
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
          <nav className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border px-4 pb-4">
            {!isHomepage && (
              <div className="flex flex-wrap items-center bg-card rounded-xl p-1 gap-0.5 my-3">
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
            )}
            {(isHomepage ? homepageNavLinks.map(l => ({ to: l.href, label: l.label })) : navLinks).map((item) => (
              isHomepage ? (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    location.pathname === item.to
                      ? "text-foreground bg-primary/15"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
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

      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-[1280px] mx-auto px-5 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <div className="h-3.5 w-3.5 rounded-sm bg-primary" />
                </div>
                <span className="text-sm font-bold text-foreground">Econ Rev</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Predicted papers, instant marking, diagram practice &amp; expert support; like having a personal Economics tutor on demand 24/7.
              </p>
              <div className="flex items-center gap-3">
                {["X", "IG", "TT"].map((s) => (
                  <span key={s} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{s}</span>
                ))}
              </div>
            </div>
            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Product</h4>
              <div className="flex flex-col gap-2.5">
                {["Features", "Pricing", "How It Works", "For Schools"].map((l) => (
                  <span key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{l}</span>
                ))}
              </div>
            </div>
            {/* Col 3 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Resources</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Notes Library", to: "/notes" },
                  { label: "Exam Boards", to: "/" },
                  { label: "Blog", to: "/" },
                  { label: "Help Centre", to: "/" },
                ].map((l) => (
                  <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
            {/* Col 4 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Company</h4>
              <div className="flex flex-col gap-2.5">
                {["About", "Contact", "Privacy Policy", "Terms"].map((l) => (
                  <span key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{l}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">© 2025 Econ Rev. Built for students, by educators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
