import { motion } from "motion/react";
import { Package, Search, Filter } from "lucide-react";

export default function Marketplace() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Store / SaaS</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Template <span className="text-gradient">Marketplace</span></h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Ready-to-deploy digital frameworks for e-commerce, portfolios, and enterprise solutions.
          </p>
        </motion.div>

        {/* Filters and Search Placeholder */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input 
              type="text" 
              placeholder="Search templates..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors">
            <Filter size={20} />
            Categories
          </button>
        </div>

        {/* Coming Soon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass-card overflow-hidden group">
              <div className="aspect-video bg-white/5 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                  <button className="bg-primary px-6 py-2 rounded-full font-bold">Live Preview</button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display font-bold text-xl">LCC Frame v{i}.0</h3>
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded">PREMIUM</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-white/40">E-Commerce</span>
                  <span className="text-white font-bold">$149.00</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
