import { motion } from "motion/react";
import { Terminal, Code, Smartphone, Rocket, Database, Wand2 } from "lucide-react";

const services = [
  { icon: Terminal, title: "Software Development", description: "Bespoke enterprise software designed for absolute scalability.", price: "Starts from $4,999" },
  { icon: Code, title: "Web Experiences", description: "Immersive, high-performance web platforms that convert users.", price: "Starts from $2,499" },
  { icon: Smartphone, title: "Mobile Ecosystems", description: "Native iOS & Android apps built for the next generation.", price: "Starts from $5,999" },
  { icon: Rocket, title: "Digital Growth", description: "Data-driven marketing and SEO dominance for your brand.", price: "$999 / Month" },
  { icon: Database, title: "Cloud Systems", description: "Secure, real-time infrastructure and storage solutions.", price: "$49 / Month" },
  { icon: Wand2, title: "AI Integration", description: "Bespoke AI pipelines and LLM-powered creative tools.", price: "Starts from $7,999" },
];

export default function Services() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8">Our <span className="text-gradient">Arsenal</span></h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide the technical and creative firepower required to dominate the digital landscape in 2026.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-8">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 mb-8 leading-relaxed">{service.description}</p>
              <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                <span className="text-white/40 text-sm">{service.price}</span>
                <button className="text-primary font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  Book Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
