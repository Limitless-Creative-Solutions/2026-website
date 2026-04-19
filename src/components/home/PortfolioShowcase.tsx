import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Eye, ArrowRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const defaultProjects: Project[] = [
  {
    title: "Quantum Pay",
    category: "Fintech Ecosystem",
    description: "Revolutionary payment platform",
    image: "https://picsum.photos/seed/quantum/1000/700",
    link: "#",
    tags: []
  },
  {
    title: "Lumina Cloud",
    category: "Cloud Storage SaaS",
    description: "Next-gen cloud storage",
    image: "https://picsum.photos/seed/lumina/1000/700",
    link: "#",
    tags: []
  }
];

export default function PortfolioShowcase() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    loadProjects();
    const handleUpdate = () => loadProjects();
    window.addEventListener("portfolioUpdated", handleUpdate);
    return () => window.removeEventListener("portfolioUpdated", handleUpdate);
  }, []);

  const loadProjects = () => {
    try {
      const saved = localStorage.getItem("portfolioProjects");
      if (saved) {
        const loadedProjects = JSON.parse(saved);
        // Only show first 2 projects on home page
        setProjects(loadedProjects.slice(0, 2));
      }
    } catch (e) {
      console.error("Error loading portfolio:", e);
    }
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-32 relative bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Selected Trajectories</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
              Proof Of <br /><span className="text-gradient">Performance.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-sm mb-2">We don't build projects. We engineer revenue engines for market leaders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="group relative"
             >
                <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden mb-8 border border-white/10 group-hover:border-primary/50 transition-colors">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/60 to-transparent">
                     <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2 block">{project.category}</span>
                     <h3 className="text-4xl font-display font-bold text-white mb-6 underline-offset-8 group-hover:underline">
                        {project.title}
                     </h3>
                     <div className="flex gap-4">
                        <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 group/btn">
                           Private Demo <Eye size={16} />
                        </button>
                        {project.link && project.link !== "#" && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-all"
                          >
                            Case Study <ArrowRight size={16} />
                          </a>
                        )}
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
