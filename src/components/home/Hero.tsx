import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [showButtons, setShowButtons] = useState(true);

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
        setShowButtons(content.heroButtonsEnabled !== false);
      }
    } catch (e) {
      console.error("Error loading hero content:", e);
    }
  };

  return (
    <section className="relative min-h-screen pt-[70px] flex items-center overflow-hidden">
      <div className="container mx-auto px-10 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 lg:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full glass border-white/5 bg-white/5 mb-8"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">2026 • Sri Lanka</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-[100px] font-display font-black leading-[0.95] tracking-tighter mb-8 uppercase"
          >
            CREATIVE <br /> 
            <span className="outline-text">SOLUTIONS.</span> <br />
            NO LIMITS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-white/40 max-w-xl font-medium leading-relaxed mb-12"
          >
            Sri Lanka's most advanced digital ecosystem for brands that scale. We combine high-end creative agency services with AI-powered SaaS automation.
          </motion.p>

          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Book Strategy Call
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3">
                Explore Marketplace
              </button>
            </motion.div>
          )}
        </div>

        <div className="flex-1 w-full lg:max-w-xl relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="portal-preview w-full glass rounded-[32px] border-white/10 overflow-hidden shadow-2xl saturate-150"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-black/40">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <span className="ml-auto text-[10px] uppercase tracking-widest font-bold opacity-30">LCC OS v2.4</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] h-[400px]">
              <div className="border-r border-white/10 p-4 space-y-4">
                <div className="h-6 bg-white/5 rounded" />
                <div className="h-6 bg-white/5 rounded" />
                <div className="h-6 bg-primary/20 rounded border border-primary/20" />
              </div>
              <div className="p-8">
                <h3 className="text-[12px] font-bold uppercase tracking-widest mb-6 opacity-60">Neon Horizon Dashboard</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'Delivery', val: '94%' },
                    { label: 'Ad ROI', val: '$12.4k' },
                    { label: 'Cloud', val: 'Active' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="text-lg font-bold text-primary">{s.val}</div>
                      <div className="text-[8px] uppercase tracking-widest opacity-40 font-bold mt-1 text-nowrap">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="h-32 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-[10px] uppercase font-bold tracking-[0.2em] opacity-20 italic">
                  Neural Sync Active...
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
