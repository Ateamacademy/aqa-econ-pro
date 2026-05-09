import { Link, useLocation } from "react-router-dom";
import { GraduationCap, LogIn, LogOut, Crown, ArrowRight, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSubject, type Subject } from "@/contexts/SubjectContext";
import econRevLogo from "@/assets/econ-rev-logo.jpg";

const navLinks = [
  { to: "/notes", label: "Notes" },
  { to: "/tutor", label: "24/7 Tutor" },
  { to: "/grader", label: "Grader" },
  { to: "/practice", label: "Practice" },
  { to: "/diagram-practice", label: "Diagrams" },
  { to: "/predicted", label: "Predicted Papers" },
  { to: "/papers", label: "Papers" },
  { to: "/dashboard", label: "Dashboard" },
];

const homepageNavLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#pricing", label: "For Schools" },
];

const SUBJECTS: { value: Subject; label: string }[] = [
  { value: "economics", label: "AQA A-Level" },
  { value: "edexcel-a", label: "Edexcel A A-Level" },
  { value: "edexcel-b", label: "Edexcel B A-Level" },
  { value: "ocr", label: "OCR A-Level" },
  { value: "cambridge", label: "CAIE A-Level" },
  { value: "ib", label: "IB HL/SL" },
  { value: "wjec", label: "WJEC A-Level" },
  { value: "eduqas", label: "Eduqas A-Level" },
  { value: "aqa-gcse", label: "AQA GCSE" },
  { value: "cambridge-igcse", label: "CAIE IGCSE" },
  { value: "edexcel-igcse", label: "Edexcel IGCSE" },
  { value: "ocr-gcse", label: "OCR GCSE" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const [menuRevealed, setMenuRevealed] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const { user, subscribed, signOut } = useAuth();
  const { subject, setSubject } = useSubject();
  const isHomepage = location.pathname === "/";
  const currentBoard = SUBJECTS.find((s) => s.value === subject);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) setBoardOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal homepage app menu 5s after page load
  useEffect(() => {
    if (!isHomepage) { setMenuRevealed(false); return; }
    const t = setTimeout(() => setMenuRevealed(true), 5000);
    return () => clearTimeout(t);
  }, [isHomepage]);

  const currentNavLinks = isHomepage ? homepageNavLinks : navLinks;

  return (
    <div className="min-h-screen flex flex-col bg-background dot-grid-bg">
      {/* Frosted glass navbar */}
      <header
        className={cn(
          "group fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1280px] mx-auto flex h-24 items-center justify-between px-5 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 mr-8">
            <div className="h-20 w-20 rounded-full bg-white p-0.5 ring-2 ring-primary/60 shadow-[0_0_32px_rgba(99,102,241,0.6)]">
              <img
                src={econRevLogo}
                alt="Econ Rev logo"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">The GDP of Grades</span>
          </Link>

          {/* Centre nav (non-homepage) */}
          {!isHomepage && (
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 mx-auto">
              {navLinks.map((item) => {
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
          )}

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {!isHomepage && (
              <div className="relative" ref={boardRef}>
                <button
                  onClick={() => setBoardOpen(!boardOpen)}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 transition-colors mr-2"
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {currentBoard?.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", boardOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {boardOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg shadow-black/10 py-1.5 z-50"
                    >
                      {SUBJECTS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => { setSubject(s.value); setBoardOpen(false); }}
                          className={cn(
                            "w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors",
                            subject === s.value
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {s.label}
                          {subject === s.value && <Check className="h-3.5 w-3.5" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
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

        {/* Homepage hover-revealed app menu (sub-row) */}
        {isHomepage && (
          <div
            className="hidden md:block max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-16 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          >
            <nav className="max-w-[1280px] mx-auto flex items-center justify-center gap-8 lg:gap-10 px-5 lg:px-6 pb-3">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground/50 hover:text-foreground transition-colors relative group/link"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-primary/70 group-hover/link:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>
        )}


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
                <div className="h-10 w-10 rounded-full bg-white p-0.5 ring-2 ring-primary/60 shadow-[0_0_18px_rgba(99,102,241,0.5)]">
                  <img src={econRevLogo} alt="Econ Rev logo" className="h-full w-full rounded-full object-cover" />
                </div>
                <span className="text-sm font-bold text-foreground">Econ Rev</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Predicted papers, instant marking, diagram practice &amp; expert support; like having a personal Economics tutor on demand 24/7.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://www.instagram.com/econrev.co/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@examrev.co?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z"/></svg>
                </a>
              </div>
            </div>
            {/* Col 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Product</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Features", hash: "features" },
                  { label: "Pricing", hash: "pricing" },
                  { label: "How It Works", hash: "how-it-works" },
                  { label: "For Schools", hash: "faq" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={`/#${l.hash}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (location.pathname === "/") {
                        document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = `/#${l.hash}`;
                      }
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Col 3 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Resources</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Notes Library", to: "/notes" },
                  { label: "Exam Boards", to: "/predicted" },
                  { label: "Blog", to: "/blog" },
                  { label: "Help Centre", to: "/help" },
                ].map((l) => (
                  <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
            {/* Col 4 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Company</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "About", to: "/about" },
                  { label: "Contact", to: "/contact" },
                  { label: "Privacy Policy", to: "/privacy" },
                  { label: "Terms", to: "/terms" },
                ].map((l) => (
                  <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
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
