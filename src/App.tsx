import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import NeuralSearchPage from "./pages/NeuralSearchPage";
import RuleEditorPage from "./pages/RuleEditorPage";
import CamerasPage from "./pages/CamerasPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-player" element={<VideoPlayerPage />} />
          <Route path="/neural-search" element={<NeuralSearchPage />} />
          <Route path="/rule-editor" element={<RuleEditorPage />} />
          <Route path="/cameras" element={<CamerasPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
