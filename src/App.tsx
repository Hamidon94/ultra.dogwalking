import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddDog from "./pages/AddDog";
import FindWalkers from "./pages/FindWalkers";
import Walkers from "./pages/Walkers";
import FindWalker from "./pages/FindWalker";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";
import BookWalk from "./pages/BookWalk";
import BookWalkPage from "./pages/BookWalkPage";
import WalkerRegister from "./pages/WalkerRegister";
import WalkerRegisterEnhanced from "./pages/WalkerRegisterEnhanced";
import WalkerSummary from "./pages/WalkerSummary";
import WalkerDashboard from "./pages/WalkerDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import HelpCenter from "./pages/HelpCenter";
import ReportProblem from "./pages/ReportProblem";
import About from "./pages/About";
import WalkerTraining from "./pages/WalkerTraining";
import Blog from "./pages/Blog";
import Partners from "./pages/Partners";
import Careers from "./pages/Careers";
import CookiesPolicy from "./pages/CookiesPolicy";
import Search from "./pages/Search";
import Priority from "./pages/Priority";
import Services from "./pages/Services";
import Help from "./pages/Help";
import WalkTracking from "./pages/WalkTracking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dogs/add" element={<AddDog />} />
      <Route path="/find-walker" element={<FindWalker />} />
          <Route path="/find-walkers" element={<FindWalkers />} />
          <Route path="/walkers" element={<Walkers />} />
          <Route path="/book-walk" element={<BookWalkPage />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
          <Route path="/book/:walkerId" element={<BookWalk />} />
          <Route path="/walker/register" element={<WalkerRegisterEnhanced />} />
          <Route path="/walker/summary/:walkerId" element={<WalkerSummary />} />
          <Route path="/walker/dashboard" element={<WalkerDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/security" element={<Security />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/report-problem" element={<ReportProblem />} />
          <Route path="/about" element={<About />} />
          <Route path="/walker-training" element={<WalkerTraining />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/priority" element={<Priority />} />
          <Route path="/services" element={<Services />} />
          <Route path="/help" element={<Help />} />
          <Route path="/walk-tracking/:bookingId" element={<WalkTracking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
