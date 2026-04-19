import { motion } from "motion/react";

const services = [
  { num: "01", name: "Software Dev" },
  { num: "02", name: "Web Experiences" },
  { num: "03", name: "Mobile Apps" },
  { num: "04", name: "Digital Marketing" },
  { num: "05", name: "Cloud Storage" },
  { num: "06", name: "AI Creativity" },
];

export default function ServiceStrip() {
  return (
    <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-1 border-l border-primary/20 pl-4"
            >
              <span className="text-[10px] font-mono text-primary font-bold">{service.num}</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">{service.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
