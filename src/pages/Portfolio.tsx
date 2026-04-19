import { motion } from "motion/react";
import { Briefcase, Eye, ArrowRight } from "lucide-react";

const works = [
  { title: "NeoBank International", category: "Fintech", img: "https://picsum.photos/seed/bank/800/600" },
  { title: "Metaverse Real Estate", category: "Web3", img: "https://picsum.photos/seed/property/800/600" },
  { title: "Pulse Fitness SaaS", category: "Health", img: "https://picsum.photos/seed/gym/800/600" },
  { title: "Aura Luxury Fashion", category: "E-Commerce", img: "https://picsum.photos/seed/fashion/800/600" },
];

export default function Portfolio() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8">Selected <span className="text-gradient">Work</span></h1>
          <p className="text-white/60 max-w-xl text-lg leading-relaxed">
            Case studies of digital products we've engineered to dominate their respective markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {works.map((work, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group cursor-pointer"
             >
               <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] mb-6">
                 <img 
                   src={work.img} 
                   alt={work.title}
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform">
                      <Eye size={24} />
                    </div>
                 </div>
               </div>
               <div className="flex justify-between items-end">
                 <div>
                   <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">{work.category}</span>
                   <h3 className="text-2xl font-display font-bold">{work.title}</h3>
                 </div>
                 <ArrowRight className="text-white/20 group-hover:text-primary transition-colors group-hover:translate-x-2 transition-transform" />
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
