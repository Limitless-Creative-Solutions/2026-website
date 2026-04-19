import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Target } from "lucide-react";

export default function MissionSection() {
  const [content, setContent] = useState({
    missionTitle: "Our Mission",
    missionDescription: "To empower businesses with cutting-edge technology and creative solutions that drive growth and innovation.",
    missionEnabled: false
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
          missionTitle: parsed.missionTitle || content.missionTitle,
          missionDescription: parsed.missionDescription || content.missionDescription,
          missionEnabled: parsed.missionEnabled || false
        });
      } catch (e) {
        console.error("Error loading mission content:", e);
      }
    }
  };

  if (!content.missionEnabled) return null;

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Our Mission
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
            {content.missionTitle}
          </h2>
          
          <p className="text-xl text-white/60 leading-relaxed">
            {content.missionDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
