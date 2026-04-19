import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Brain, Cpu, MessageSquare, ArrowRight } from "lucide-react";
import { generateWebsiteIdea, generateBrandName } from "@/src/services/gemini";

export default function AIToolsSection() {
  const [industry, setIndustry] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!industry) return;
    setLoading(true);
    const result = await generateWebsiteIdea(industry);
    setIdea(result || "");
    setLoading(false);
  };

  return (
    <section className="py-32 relative bg-[#050505] border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3B82F615_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              AI-Powered Lab
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
              Generate Your Future <br />
              <span className="text-gradient">In Seconds.</span>
            </h2>
            <p className="text-white/50 text-lg mb-12 leading-relaxed">
              We've integrated neural networks to accelerate your creative process. Use our free AI tools to jumpstart your 2026 digital trajectory.
            </p>

            <div className="space-y-4">
              {[
                { icon: Brain, title: "Website Idea Generator", desc: "Neuro-mapped concepts for any industry." },
                { icon: Cpu, title: "Cost & ROI Predictor", desc: "Data-backed financial trajectory for your project." },
                { icon: MessageSquare, title: "Smart Content Engine", desc: "Futuristic copy that converts at maximum velocity." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-0 overflow-hidden border-primary/30">
            <div className="bg-white/5 border-b border-white/10 p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-primary">AI IDEATOR v2.6</span>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <label className="text-[10px] font-bold uppercase text-white/40 block mb-4 tracking-widest">Input Industry / Niche</label>
                <div className="flex gap-2">
                  <input 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    type="text" 
                    placeholder="e.g. Luxury Real Estate, DeFi SaaS"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-primary text-white p-3 rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50"
                  >
                    {loading ? <Cpu className="animate-spin" /> : <ArrowRight />}
                  </button>
                </div>
              </div>

              <div className="relative min-h-[300px] bg-black/40 rounded-2xl border border-white/5 p-6 overflow-y-auto max-h-[400px]">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                     <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                     <p className="text-white/40 animate-pulse text-xs font-bold uppercase tracking-widest">Neural Processing...</p>
                  </div>
                ) : idea ? (
                  <div className="prose prose-invert prose-sm">
                    <pre className="whitespace-pre-wrap font-sans text-white/80 leading-relaxed text-xs underline-offset-4 overflow-x-hidden">
                       {idea}
                    </pre>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
                     <Brain size={64} className="mb-4" />
                     <p className="text-sm">Enter an industry to start the neural engine</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
