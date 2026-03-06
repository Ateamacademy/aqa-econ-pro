import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubjectProvider } from "@/contexts/SubjectContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import PastPapers from "./pages/PastPapers";
import EdexcelAPastPapers from "./pages/EdexcelAPastPapers";
import EdexcelBPastPapers from "./pages/EdexcelBPastPapers";
import CambridgePastPapers from "./pages/CambridgePastPapers";
import OcrPastPapers from "./pages/OcrPastPapers";
import AITutor from "./pages/AITutor";
import EssayGrader from "./pages/EssayGrader";
import Practice from "./pages/Practice";
import DiagramPractice from "./pages/DiagramPractice";
import StudyNotes from "./pages/StudyNotes";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Pricing from "./pages/Pricing";
import PredictedPapers from "./pages/PredictedPapers";
import NotFound from "./pages/NotFound";

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
              <Route path="/maths-papers" element={<MathsPastPapers />} />
              <Route path="/chemistry-papers" element={<ChemistryPastPapers />} />
              <Route path="/edexcel-a-papers" element={<EdexcelAPastPapers />} />
              <Route path="/cambridge-papers" element={<CambridgePastPapers />} />
              <Route path="/edexcel-b-papers" element={<EdexcelBPastPapers />} />
              <Route path="/ocr-papers" element={<OcrPastPapers />} />
              <Route path="/predicted" element={<PredictedPapers />} />
              <Route path="/tutor" element={<AITutor />} />
              <Route path="/grader" element={<EssayGrader />} />
              <Route path="/practice" element={<Practice />} />
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
