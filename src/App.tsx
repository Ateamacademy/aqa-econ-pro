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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/papers" element={<PastPapers />} />
              <Route path="/edexcel-a-papers" element={<EdexcelAPastPapers />} />
              <Route path="/cambridge-papers" element={<CambridgePastPapers />} />
              <Route path="/edexcel-b-papers" element={<EdexcelBPastPapers />} />
              <Route path="/ocr-papers" element={<OcrPastPapers />} />
              <Route path="/gcse-papers" element={<GcsePastPapers />} />
              <Route path="/igcse-papers" element={<IgcsePastPapers />} />
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
          </Layout>
          </SubjectProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
