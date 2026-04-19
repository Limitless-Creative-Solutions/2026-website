import { motion } from "motion/react";
import { Layout, Smartphone, ShoppingCart, Briefcase, Eye, Download } from "lucide-react";
import { Link } from "react-router-dom";

const templates = [
  { icon: ShoppingCart, title: "LCC E-Commerce", tag: "REVENUE FOCUS" },
  { icon: Briefcase, title: "Enterprise Hub", tag: "B2B SCALED" },
  { icon: Layout, title: "Creative Folio", tag: "ARTISTIC" },
];

export default function TemplatePreview() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 italic">Engineered <br /> <span className="text-gradient">Frameworks.</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-10">Skip the 6-month dev cycle. Deploy our production-ready digital architectures designed in Colombo for global performance.</p>
          <Link to="/marketplace" className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-5 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95">
             Marketplace Entry
             <Download size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass-card group"
             >
               <div className="p-8 pb-0">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <tpl.icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{tpl.tag}</span>
                  </div>
                  <h4 className="text-2xl font-display font-bold mb-4">{tpl.title}</h4>
               </div>
               
               <div className="px-8 pb-8 flex gap-4">
                  <button className="flex-1 bg-white/5 py-3 rounded-xl text-xs font-bold hover:bg-white/10 flex items-center justify-center gap-2">
                    <Eye size={14} /> Preview
                  </button>
                  <button className="flex-1 bg-primary py-3 rounded-xl text-xs font-bold hover:bg-primary-dark">Deploy</button>
               </div>

               <div className="aspect-[16/10] bg-white/5 mt-auto rounded-b-[24px] overflow-hidden group-hover:scale-[0.98] transition-transform">
                  <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent p-4">
                    <div className="flex gap-2 mb-4">
                       <div className="w-2 h-2 rounded-full bg-white/20" />
                       <div className="w-2 h-2 rounded-full bg-white/20" />
                       <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <div className="space-y-2">
                       <div className="h-4 bg-white/5 rounded w-full" />
                       <div className="h-4 bg-white/5 rounded w-full" />
                       <div className="h-4 bg-white/5 rounded w-2/3" />
                       <div className="h-20 bg-primary/10 rounded-xl border border-primary/20 mt-4" />
                    </div>
                  </div>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
