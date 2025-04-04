
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SubmitFeedback from "./pages/SubmitFeedback";
import DashboardPage from "./pages/DashboardPage";
import FeedbackDetail from "./pages/FeedbackDetail";
import ExplorePage from "./pages/ExplorePage";
import MySubmissionsPage from "./pages/MySubmissionsPage";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/submit-feedback" element={<SubmitFeedback />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/feedback/:id" element={<FeedbackDetail />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/my-submissions" element={<MySubmissionsPage />} />
          <Route path="/reports" element={<Reports />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
