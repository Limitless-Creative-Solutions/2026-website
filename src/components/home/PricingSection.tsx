import { motion } from "motion/react";
import { Check, Zap, Shield, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";

const defaultPlans = [
  {
    name: "Starter",
    price: "$999",
    description: "Perfect for innovative startups looking for a solid digital entry.",
    features: ["Custom Landing Page", "PWA Ready", "SEO Basic Setup", "Standard Support"],
    icon: "Zap",
    popular: false
  },
  {
    name: "Business",
    price: "$2,499",
    description: "The complete ecosystem for scaling brands and generating ROI.",
    features: ["Full Marketing Funnel", "SaaS Integration", "Client Portal Access", "Priority 24/7 Support", "AI Mini-Tools"],
    icon: "Shield",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke engineering for massive global scale and complexity.",
    features: ["Dedicated Dev Team", "Custom AI Pipelines", "Enterprise Security", "Cloud Infrastructure", "Success Manager"],
    icon: "Crown",
    popular: false
  }
];

const iconMap: any = { Zap, Shield, Crown };

export default function PricingSection() {
  const [plans, setPlans] = useState(defaultPlans);
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    const savedPlans = localStorage.getItem("pricingPlans");
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error("Error loading plans:", e);
      }
    }

    // Load button visibility
    const savedContent = localStorage.getItem("siteContent");
    if (savedContent) {
      try {
        const content = JSON.parse(savedContent);
        setShowButtons(content.pricingButtonsEnabled !== false);
      } catch (e) {
        console.error("Error loading content:", e);
      }
    }

    // Listen for updates
    const handleUpdate = () => {
      const savedContent = localStorage.getItem("siteContent");
      if (savedContent) {
        try {
          const content = JSON.parse(savedContent);
          setShowButtons(content.pricingButtonsEnabled !== false);
        } catch (e) {
          console.error("Error loading content:", e);
        }
      }
    };
    window.addEventListener("contentUpdated", handleUpdate);
    return () => window.removeEventListener("contentUpdated", handleUpdate);
  }, []);
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">Invest in <span className="text-gradient">Results.</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">Transparent pricing model tailored for sustainable digital growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => {
            const IconComponent = iconMap[plan.icon] || Zap;
            return (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className={cn(
                 "glass-card p-10 flex flex-col relative overflow-hidden",
                 plan.popular ? "border-primary/50 bg-primary/5 scale-105 z-10" : "border-white/5"
               )}
             >
               {plan.popular && (
                  <div className="absolute top-6 right-[-35px] bg-primary text-white text-[10px] font-bold py-1 px-10 rotate-45 uppercase tracking-widest">
                    Best Value
                  </div>
               )}
               
               <div className="mb-8">
                 <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6">
                    <IconComponent size={24} />
                 </div>
                 <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                 <div className="text-4xl font-display font-bold mb-4">{plan.price}</div>
                 <p className="text-white/50 text-sm h-12">{plan.description}</p>
               </div>

               <div className="space-y-4 mb-10 flex-1">
                 {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check size={12} />
                      </div>
                      {feature}
                    </div>
                 ))}
               </div>

               {showButtons && (
                 <button className={cn(
                   "w-full py-4 rounded-2xl font-bold transition-all",
                   plan.popular ? "bg-primary text-white hover:bg-primary-dark" : "bg-white/5 text-white hover:bg-white/10"
                 )}>
                   Get Started
                 </button>
               )}
             </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
