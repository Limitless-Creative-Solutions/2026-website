import { motion } from "motion/react";

const brands = [
  "STRIPE", "SUPABASE", "PAYHERE", "GOOGLE CLOUD", "AWS", "DIGITAL OCEAN", "NEXT.JS", "REACT"
];

export default function FeaturedOn() {
  return (
    <section className="py-20 border-y border-white/10 bg-[#05060B]/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-12">
          INTEGRATION PARTNERS & TECHNOLOGIES
        </p>
        <div className="overflow-hidden whitespace-nowrap mask-gradient relative">
          <motion.div 
            className="flex items-center gap-20 py-4"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <span key={i} className="text-3xl md:text-5xl font-display font-black text-white/5 hover:text-primary/20 transition-colors cursor-pointer tracking-tighter">
                {brand}
              </span>
            ))}
          </motion.div>
          
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#05060B] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#05060B] to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
