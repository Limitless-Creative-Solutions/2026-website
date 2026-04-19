import { motion } from "motion/react";
import { Terminal, Code, Smartphone, Rocket, Database, Wand2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const defaultServices = [
  { 
    icon: "Terminal", 
    title: "Software Engineering", 
    label: "Enterprise Scale", 
    color: "from-blue-500/20",
    description: "Propelling brands into the next dimension with cutting-edge technical architecture and creative genius.",
    demoLink: "#",
    orderLink: "#"
  },
  { 
    icon: "Code", 
    title: "Web Experiences", 
    label: "High Conversion", 
    color: "from-purple-500/20",
    description: "Propelling brands into the next dimension with cutting-edge technical architecture and creative genius.",
    demoLink: "#",
    orderLink: "#"
  },
  { 
    icon: "Smartphone", 
    title: "Mobile Apps", 
    label: "IOS & Android", 
    color: "from-cyan-500/20",
    description: "Propelling brands into the next dimension with cutting-edge technical architecture and creative genius.",
    demoLink: "#",
    orderLink: "#"
  },
  { 
    icon: "Rocket", 
    title: "Growth Marketing", 
    label: "Viral Scale", 
    color: "from-red-500/20",
    description: "Propelling brands into the next dimension with cutting-edge technical architecture and creative genius.",
    demoLink: "#",
    orderLink: "#"
  },
  { 
    icon: "Database", 
    title: "Cloud Storage", 
    label: "Secure Vault", 
    color: "from-green-500/20",
    description: "Propelling brands into the next dimension with cutting-edge technical architecture and creative genius.",
    demoLink: "#",
    orderLink: "#"
  },
  { 
    icon: "Wand2", 
    title: "AI Generation", 
    label: "Neural Creativity", 
    color: "from-yellow-500/20",
    description: "Propelling brands into the next dimension with cutting-edge technical architecture and creative genius.",
    demoLink: "#",
    orderLink: "#"
  },
];

const iconMap: any = {
  Terminal,
  Code,
  Smartphone,
  Rocket,
  Database,
  Wand2,
};

export default function ServicesGrid() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    // Load services from localStorage
    const savedServices = localStorage.getItem("servicesData");
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch (e) {
        console.error("Error loading services:", e);
      }
    }
  }, []);
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Our Expertise</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              A Future-Proof <br />
              <span className="text-gradient">Service Ecosystem.</span>
            </h2>
          </div>
          <Link 
            to="/services" 
            className="group flex items-center gap-3 text-lg font-bold hover:text-primary transition-colors"
          >
            Explore All Services
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
              <ArrowUpRight size={20} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const IconComponent = iconMap[service.icon] || Terminal;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-10 group bg-gradient-to-br ${service.color} to-transparent border-white/5`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <IconComponent size={28} />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2 block">{service.label}</span>
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex gap-4">
                  <a 
                    href={service.demoLink || "#"} 
                    target={service.demoLink && service.demoLink !== "#" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 hover:bg-primary py-3 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    View Demo
                  </a>
                  <a 
                    href={service.orderLink || "#"} 
                    target={service.orderLink && service.orderLink !== "#" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex-1 border border-white/10 hover:border-primary py-3 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    Order Now
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
