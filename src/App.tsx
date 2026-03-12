import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubjectProvider } from "@/contexts/SubjectContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Lazy-load feature pages to avoid bundler initialization order issues
const PastPapers = lazy(() => import("./pages/PastPapers"));
const EdexcelAPastPapers = lazy(() => import("./pages/EdexcelAPastPapers"));
const EdexcelBPastPapers = lazy(() => import("./pages/EdexcelBPastPapers"));
const CambridgePastPapers = lazy(() => import("./pages/CambridgePastPapers"));
const OcrPastPapers = lazy(() => import("./pages/OcrPastPapers"));
const GcsePastPapers = lazy(() => import("./pages/GcsePastPapers"));
const IgcsePastPapers = lazy(() => import("./pages/IgcsePastPapers"));
const AITutor = lazy(() => import("./pages/AITutor"));
const EssayGrader = lazy(() => import("./pages/EssayGrader"));
const Practice = lazy(() => import("./pages/Practice"));
const DiagramPractice = lazy(() => import("./pages/DiagramPractice"));
const StudyNotes = lazy(() => import("./pages/StudyNotes"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PredictedPapers = lazy(() => import("./pages/PredictedPapers"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SubjectProvider>
          <Layout>
            <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Past paper routes hidden */}
              <Route path="/predicted" element={<PredictedPapers />} />
              <Route path="/tutor" element={<AITutor />} />
              <Route path="/grader" element={<EssayGrader />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/diagram-practice" element={<DiagramPractice />} />
              <Route path="/notes" element={<StudyNotes />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </Layout>
          </SubjectProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
