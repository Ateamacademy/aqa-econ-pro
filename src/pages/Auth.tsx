import { useState, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2, Sparkles, TrendingUp, BookOpen, Award, CheckCircle2 } from "lucide-react";
import econRevLogo from "@/assets/econ-rev-logo.jpg";

export default function Auth() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Redirect logged-in users
  useEffect(() => {
    if (user && profile) {
      let pendingCheckout = false;
      try {
        if (sessionStorage.getItem("postAuthAction") === "checkout") {
          sessionStorage.removeItem("postAuthAction");
          pendingCheckout = true;
        }
      } catch {}
      if (pendingCheckout) {
        import("@/lib/startCheckout")
          .then(({ startCheckout }) => startCheckout())
          .catch(() => toast.error("Couldn't start checkout — please refresh and try again."));
        return;
      }
      navigate(profile.onboarding_completed ? "/dashboard" : "/onboarding", { replace: true });
    }
  }, [user, profile, navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === "undefined") return "login";
    const tab = new URLSearchParams(window.location.search).get("tab");
    return tab === "signup" ? "signup" : "login";
  });

  const handleGoogleLogin = useCallback(async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast.error("Google sign-in failed. Please try again.");
        console.error("Google OAuth error:", error);
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
      console.error("Google OAuth exception:", e);
    } finally {
      setGoogleLoading(false);
    }
  }, []);

  const handleAppleLogin = useCallback(async () => {
    setAppleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("apple", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast.error("Apple sign-in failed. Please try again.");
        console.error("Apple OAuth error:", error);
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setAppleLoading(false);
    }
  }, []);

  const handleResendConfirmation = useCallback(async (targetEmail?: string) => {
    const trimmedEmail = (targetEmail ?? email).trim();
    if (!trimmedEmail) {
      toast.error("Enter your email address first.");
      return;
    }
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: trimmedEmail,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Confirmation email re-sent. Check your inbox (and spam folder).");
    } catch {
      toast.error("Network error. Please try again.");
    }
  }, [email]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        if (error.message.includes("Invalid login")) {
          toast.error("Incorrect email or password. Please try again.");
        } else if (error.message.toLowerCase().includes("email not confirmed")) {
          toast.error("Email not confirmed yet.", {
            description: "Click below to resend the confirmation link.",
            action: {
              label: "Resend email",
              onClick: () => handleResendConfirmation(email),
            },
            duration: 10000,
          });
        } else {
          toast.error(error.message);
        }
        return;
      }
      toast.success("Welcome back!");
      navigate("/");
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [email, password, loading, navigate, handleResendConfirmation]);

  const handleSignup = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const trimmedEmail = email.trim();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Try logging in instead.");
        } else {
          toast.error(error.message);
        }
        return;
      }
      toast.success("Account created · welcome!");
      navigate("/");
    } catch {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [email, password, loading, navigate]);

  const handleForgotPassword = useCallback(async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Enter your email address first.");
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Password reset link sent · check your inbox.");
    } catch {
      toast.error("Network error. Please try again.");
    }
  }, [email]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-bright/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: "10s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
      </div>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 gap-0">
        {/* Left: Branded value panel */}
        <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 border-r border-border/40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5"
          >
            <div className="h-12 w-12 rounded-full bg-white p-0.5 ring-2 ring-primary/60 shadow-[0_0_24px_rgba(99,102,241,0.55)]">
              <img src={econRevLogo} alt="Econ Rev logo" className="h-full w-full rounded-full object-cover" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Econ Rev · The GDP of Grades
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8 max-w-lg"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Trusted by 12,000+ students</span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-foreground">
                Master economics.
                <br />
                <span className="bg-gradient-to-r from-indigo-bright via-primary to-accent bg-clip-text text-transparent">
                  Ace your exams.
                </span>
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Predicted papers, instant marking, and a 24/7 tutor · built for AQA, Edexcel, OCR, CAIE & IB.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: TrendingUp, text: "Instant exam marking with examiner-grade feedback" },
                { icon: BookOpen, text: "Board-specific predicted papers & study notes" },
                { icon: Award, text: "Personalised grade progression tracking" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground/90 pt-1.5">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 text-xs text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/40 to-indigo-bright/40 border-2 border-background" />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Joined this week by 1,200+ students</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Auth form */}
        <div className="flex items-center justify-center px-4 py-12 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
              <div className="h-12 w-12 rounded-full bg-white p-0.5 ring-2 ring-primary/60 shadow-[0_0_24px_rgba(99,102,241,0.55)]">
                <img src={econRevLogo} alt="Econ Rev logo" className="h-full w-full rounded-full object-cover" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Econ Rev
              </span>
            </div>

            <Card className="border-border/50 bg-card/60 backdrop-blur-2xl shadow-2xl shadow-primary/10 rounded-2xl">
              <CardHeader className="text-center pb-2 pt-8">
                <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground">
                  {activeTab === "login" ? "Welcome back" : "Create your account"}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  {activeTab === "login"
                    ? "Sign in to continue your revision"
                    : "Start your free trial · no card required"}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 pb-8 pt-5 space-y-5">
                {/* Google OAuth */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-sm font-medium border-border/70 hover:bg-secondary/80 hover:border-primary/40 transition-all group"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || appleLoading || loading}
                >
                  {googleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                {/* Apple OAuth */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-sm font-medium border-border/70 hover:bg-secondary/80 hover:border-primary/40 transition-all group"
                  onClick={handleAppleLogin}
                  disabled={appleLoading || googleLoading || loading}
                >
                  {appleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  )}
                  Continue with Apple
                </Button>

                {/* Divider */}
                <div className="relative flex items-center gap-3">
                  <Separator className="flex-1 bg-border/50" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">or with email</span>
                  <Separator className="flex-1 bg-border/50" />
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full mb-5 h-11 bg-secondary/50 p-1">
                    <TabsTrigger value="login" className="flex-1 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all rounded-md">
                      Log In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="flex-1 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all rounded-md">
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-3">
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                          className="pl-11 h-12 bg-background/60 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          className="pl-11 pr-11 h-12 bg-background/60 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-primary to-indigo-bright hover:opacity-95 transition-all shadow-lg shadow-primary/25"
                        disabled={loading || googleLoading}
                      >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {loading ? "Signing in…" : "Log In"}
                      </Button>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm text-muted-foreground hover:text-primary w-full text-center transition-colors pt-1"
                      >
                        Forgot password?
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResendConfirmation()}
                        className="text-xs text-muted-foreground hover:text-primary w-full text-center transition-colors"
                      >
                        Didn't get the confirmation email? Resend it
                      </button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-3">
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                          className="pl-11 h-12 bg-background/60 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password (min 6 characters)"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                          minLength={6}
                          autoComplete="new-password"
                          className="pl-11 pr-11 h-12 bg-background/60 border-border/60 focus-visible:border-primary/60 focus-visible:ring-primary/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 text-sm font-semibold bg-gradient-to-r from-primary to-indigo-bright hover:opacity-95 transition-all shadow-lg shadow-primary/25"
                        disabled={loading || googleLoading}
                      >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {loading ? "Creating account…" : "Create free account"}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center pt-1">
                        By signing up, you agree to our{" "}
                        <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Trusted by students across AQA, Edexcel, OCR, CAIE & IB
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
