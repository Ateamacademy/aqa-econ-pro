import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import PastPapers from "./pages/PastPapers";
import AITutor from "./pages/AITutor";
import EssayGrader from "./pages/EssayGrader";
import Practice from "./pages/Practice";
import StudyNotes from "./pages/StudyNotes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/papers" element={<PastPapers />} />
            <Route path="/tutor" element={<AITutor />} />
            <Route path="/grader" element={<EssayGrader />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/notes" element={<StudyNotes />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
