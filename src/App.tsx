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
const IbPastPapers = lazy(() => import("./pages/IbPastPapers"));
const EdexcelIgcsePastPapers = lazy(() => import("./pages/EdexcelIgcsePastPapers"));
const OcrGcsePastPapers = lazy(() => import("./pages/OcrGcsePastPapers"));
const AITutor = lazy(() => import("./pages/AITutor"));
const EssayGrader = lazy(() => import("./pages/EssayGrader"));
const Practice = lazy(() => import("./pages/Practice"));
const DiagramPractice = lazy(() => import("./pages/DiagramPractice"));
const StudyNotes = lazy(() => import("./pages/StudyNotes"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PredictedPapers = lazy(() => import("./pages/PredictedPapers"));
const ParentDashboard = lazy(() => import("./pages/ParentDashboard"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const HelpCentre = lazy(() => import("./pages/HelpCentre"));
const FounderDashboard = lazy(() => import("./pages/FounderDashboard"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const DiagramTesting = lazy(() => import("./pages/DiagramTesting"));
const PaperLibrary = lazy(() => import("./pages/PaperLibrary"));
const EconDiagramShowcase = lazy(() => import("./components/revision/EconDiagramShowcase"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min cache for 50K user scale
      gcTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

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
              {/* Past paper routes */}
              <Route path="/past-papers/ib" element={<IbPastPapers />} />
              <Route path="/past-papers/edexcel-igcse" element={<EdexcelIgcsePastPapers />} />
              <Route path="/past-papers/ocr-gcse" element={<OcrGcsePastPapers />} />
              <Route path="/past-papers/cambridge" element={<CambridgePastPapers />} />
              <Route path="/past-papers/igcse" element={<IgcsePastPapers />} />
              <Route path="/past-papers/gcse" element={<GcsePastPapers />} />
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
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/help" element={<HelpCentre />} />
              <Route path="/founder" element={<FounderDashboard />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/diagram-testing" element={<DiagramTesting />} />
              <Route path="/paper-library" element={<PaperLibrary />} />
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
