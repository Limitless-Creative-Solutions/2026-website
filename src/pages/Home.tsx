import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Hero from "@/src/components/home/Hero";
import ServiceStrip from "@/src/components/home/ServiceStrip";
import FeaturedOn from "@/src/components/home/FeaturedOn";
import ServicesGrid from "@/src/components/home/ServicesGrid";
import TemplatePreview from "@/src/components/home/TemplatePreview";
import PortfolioShowcase from "@/src/components/home/PortfolioShowcase";
import PricingSection from "@/src/components/home/PricingSection";
import AIToolsSection from "@/src/components/home/AIToolsSection";
import LiveStats from "@/src/components/home/LiveStats";
import ContactSection from "@/src/components/home/ContactSection";
import InstructionVideo from "@/src/components/home/InstructionVideo";
import AboutSection from "@/src/components/home/AboutSection";
import MissionSection from "@/src/components/home/MissionSection";
import BackgroundVideo from "@/src/components/BackgroundVideo";
import TestimonialsSection from "@/src/components/home/TestimonialsSection";

export default function Home() {
  const [showAITools, setShowAITools] = useState(true);

  useEffect(() => {
    loadContent();
    const handleUpdate = () => loadContent();
    window.addEventListener("contentUpdated", handleUpdate);
    return () => window.removeEventListener("contentUpdated", handleUpdate);
  }, []);

  const loadContent = () => {
    try {
      const saved = localStorage.getItem("siteContent");
      if (saved) {
        const content = JSON.parse(saved);
        setShowAITools(content.aiToolsEnabled !== false);
      }
    } catch (e) {
      console.error("Error loading content:", e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden relative"
    >
      <BackgroundVideo />
      <Hero />
      <ServiceStrip />
      <FeaturedOn />
      <AboutSection />
      <ServicesGrid />
      <InstructionVideo />
      <MissionSection />
      <PortfolioShowcase />
      {showAITools && <AIToolsSection />}
      <TemplatePreview />
      <TestimonialsSection />
      <LiveStats />
      <PricingSection />
      <ContactSection />
    </motion.div>
  );
}
