import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { AuthProvider } from "./lib/AuthContext";
import { trackVisitor, trackPageView } from "./lib/analytics";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/layout/Preloader";
import FloatingActions from "./components/layout/FloatingActions";
import OfferBanner from "./components/OfferBanner";
import MaintenanceMode from "./components/MaintenanceMode";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Portfolio from "./pages/Portfolio";
import Portal from "./pages/Portal";
import Services from "./pages/Services";
import VideoManagerPage from "./pages/VideoManager";
import Admin from "./pages/Admin";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track visitor on first load
    trackVisitor();
    
    // Simulate loading time for premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track page views
    trackPageView(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <Router>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" />}
        </AnimatePresence>

        <div className="min-h-screen bg-[#05060B] text-[#F8FAFC] selection:bg-primary selection:text-white relative overflow-hidden">
          {!loading && (
            <>
              <div className="glow-bg top-[-100px] right-[-100px]" />
              <div className="glow-bg bottom-[-50px] left-[-50px] opacity-70" style={{ width: '400px', height: '400px' }} />

              <div className="fixed left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-[100]">
                <div className="w-px h-10 bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="w-2 h-2 rotate-45 border border-primary/40" />
                <div className="w-2 h-2 bg-primary/40" />
                <div className="w-px h-10 bg-white/10" />
              </div>

              <Routes>
                {/* Admin routes - always accessible */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/video" element={<VideoManagerPage />} />
                
                {/* Regular routes - wrapped in maintenance mode */}
                <Route path="/*" element={
                  <MaintenanceMode>
                    <OfferBanner />
                    <Navbar />
                    <main>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portal" element={<Portal />} />
                        <Route path="*" element={<Home />} />
                      </Routes>
                    </main>
                    <Footer />
                    <FloatingActions />
                  </MaintenanceMode>
                } />
              </Routes>
            </>
          )}
        </div>
      </AuthProvider>
    </Router>
  );
}


