import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CalendarView from "./pages/CalendarView.tsx";
import NotFound from "./pages/NotFound.tsx";
import SettingsView from "./pages/SettingsView.tsx";
import AlunosView from "./pages/AlunosView.tsx";
import StudentProfileView from "./pages/StudentProfileView.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alunos" element={<AlunosView />} />
          <Route path="/alunos/:id" element={<StudentProfileView />} />
          <Route path="/calendario" element={<CalendarView />} />
          <Route path="/configuracoes" element={<SettingsView />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
