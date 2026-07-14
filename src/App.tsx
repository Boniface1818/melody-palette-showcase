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
import LiturgicalMusicSuggestions from "./pages/LiturgicalMusicSuggestions";
import HolySpiritHymns from "./pages/HolySpiritHymns";
import FuneralHymns from "./pages/FuneralHymns";
import FloatingNotes from "./components/FloatingNotes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <FloatingNotes count={16} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/compositions" element={<Compositions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/liturgical-music-suggestions" element={<LiturgicalMusicSuggestions />} />
          <Route path="/resources/holy-spirit-hymns" element={<HolySpiritHymns />} />
          {/* Legacy redirect */}
          <Route path="/projects" element={<Compositions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
