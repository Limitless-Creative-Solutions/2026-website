import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Info } from "lucide-react";

export default function AboutSection() {
  const [content, setContent] = useState({
    aboutTitle: "About Us",
    aboutDescription: "We are a team of passionate creators, developers, and strategists dedicated to building exceptional digital experiences.",
    aboutEnabled: false
  });

  useEffect(() => {
    loadContent();
    // Listen for content updates
    const handleUpdate = () => loadContent();
    window.addEventListener("contentUpdated", handleUpdate);
    return () => window.removeEventListener("contentUpdated", handleUpdate);
  }, []);

  const loadContent = () => {
    const savedContent = localStorage.getItem("siteContent");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent({
          aboutTitle: parsed.aboutTitle || content.aboutTitle,
          aboutDescription: parsed.aboutDescription || content.aboutDescription,
          aboutEnabled: parsed.aboutEnabled || false
        });
      } catch (e) {
        console.error("Error loading about content:", e);
      }
    }
  };

  if (!content.aboutEnabled) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-[#05060B]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              About Us
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
            {content.aboutTitle}
          </h2>
          
          <p className="text-xl text-white/60 leading-relaxed">
            {content.aboutDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
