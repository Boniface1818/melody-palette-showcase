import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import About from "./pages/About";
import Compositions from "./pages/Compositions";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Studio from "./pages/Studio";
import OAuthConsent from "./pages/OAuthConsent";
import FloatingNotes from "./components/FloatingNotes";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <FloatingNotes count={16} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
          <Route path="/compositions" element={<RequireAuth><Compositions /></RequireAuth>} />
          <Route path="/contact" element={<RequireAuth><Contact /></RequireAuth>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          <Route path="/studio" element={<RequireAuth><Studio /></RequireAuth>} />

          {/* Legacy redirect */}
          <Route path="/projects" element={<RequireAuth><Compositions /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
