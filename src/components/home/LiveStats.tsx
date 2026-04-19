import { motion } from "motion/react";
import { User, Globe, Rocket, BarChart } from "lucide-react";

export default function LiveStats() {
  return (
    <section className="py-20 relative bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: User, label: "Global Clients", val: "500+", color: "text-blue-500" },
            { icon: Globe, label: "Projects Scale", val: "$10M+", color: "text-purple-500" },
            { icon: Rocket, label: "Ecosystems Built", val: "240", color: "text-cyan-500" },
            { icon: BarChart, label: "ROI Generated", val: "300%", color: "text-green-500" },
          ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="text-center"
             >
                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 ${stat.color}`}>
                   <stat.icon size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-display font-bold mb-2 tracking-tighter">{stat.val}</div>
                <div className="text-white/40 text-[10px] uppercase font-bold tracking-[0.3em]">{stat.label}</div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
