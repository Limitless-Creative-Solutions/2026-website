import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Plus, Trash2, ExternalLink, Edit2, Check, X } from "lucide-react";

interface Service {
  icon: string;
  title: string;
  label: string;
  color: string;
  description: string;
  demoLink: string;
  orderLink: string;
}

const defaultServices: Service[] = [
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

const iconOptions = ["Terminal", "Code", "Smartphone", "Rocket", "Database", "Wand2", "Globe", "Zap", "Star", "Heart"];
const colorOptions = [
  { name: "Blue", value: "from-blue-500/20" },
  { name: "Purple", value: "from-purple-500/20" },
  { name: "Cyan", value: "from-cyan-500/20" },
  { name: "Red", value: "from-red-500/20" },
  { name: "Green", value: "from-green-500/20" },
  { name: "Yellow", value: "from-yellow-500/20" },
  { name: "Pink", value: "from-pink-500/20" },
  { name: "Orange", value: "from-orange-500/20" },
];

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    localStorage.setItem("servicesData", JSON.stringify(services));
    setSaved(true);
    setEditingIndex(null);
    setTimeout(() => setSaved(false), 3000);
    // Trigger page reload to update services
    window.dispatchEvent(new Event("servicesUpdated"));
  };

  const handleUpdate = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const updated = services.filter((_, i) => i !== index);
      setServices(updated);
    }
  };

  const handleAdd = () => {
    const newService: Service = {
      icon: "Terminal",
      title: "New Service",
      label: "New Label",
      color: "from-blue-500/20",
      description: "Service description goes here.",
      demoLink: "#",
      orderLink: "#"
    };
    setServices([...services, newService]);
    setEditingIndex(services.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Services Manager</h2>
            <p className="text-white/60">Manage service cards, links, and content</p>
          </div>
          <button
            onClick={handleAdd}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>

        {/* Instructions */}
        <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
          <h3 className="font-bold mb-3 text-primary">📝 Instructions</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>• Click "Edit" to modify a service card</li>
            <li>• Add demo link (e.g., https://demo.yoursite.com)</li>
            <li>• Add order link (e.g., https://order.yoursite.com or WhatsApp link)</li>
            <li>• Links open in new tab automatically</li>
            <li>• Click "Save All" to apply changes to website</li>
          </ul>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            {editingIndex === index ? (
              // Edit Mode
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Edit Service #{index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-white/80">Service Title</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleUpdate(index, "title", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white/80">Label/Badge</label>
                    <input
                      type="text"
                      value={service.label}
                      onChange={(e) => handleUpdate(index, "label", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white/80">Icon</label>
                    <select
                      value={service.icon}
                      onChange={(e) => handleUpdate(index, "icon", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white/80">Color Theme</label>
                    <select
                      value={service.color}
                      onChange={(e) => handleUpdate(index, "color", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                    >
                      {colorOptions.map((color) => (
                        <option key={color.value} value={color.value}>{color.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-white/80">Description</label>
                    <textarea
                      rows={3}
                      value={service.description}
                      onChange={(e) => handleUpdate(index, "description", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white/80">
                      Demo Link (Button 1)
                    </label>
                    <input
                      type="url"
                      value={service.demoLink}
                      onChange={(e) => handleUpdate(index, "demoLink", e.target.value)}
                      placeholder="https://demo.example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                    />
                    {service.demoLink && service.demoLink !== "#" && (
                      <a
                        href={service.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Test link
                      </a>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-white/80">
                      Order Link (Button 2)
                    </label>
                    <input
                      type="url"
                      value={service.orderLink}
                      onChange={(e) => handleUpdate(index, "orderLink", e.target.value)}
                      placeholder="https://order.example.com or WhatsApp link"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
                    />
                    {service.orderLink && service.orderLink !== "#" && (
                      <a
                        href={service.orderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Test link
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Service
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} to-transparent border border-white/10 flex items-center justify-center`}>
                      <span className="text-xs font-bold">{service.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <span className="text-xs text-white/60 uppercase tracking-widest">{service.label}</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{service.description}</p>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-white/40">Demo: </span>
                      <span className="text-primary">{service.demoLink || "Not set"}</span>
                    </div>
                    <div>
                      <span className="text-white/40">Order: </span>
                      <span className="text-primary">{service.orderLink || "Not set"}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setEditingIndex(index)}
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            saved
              ? "bg-green-500 text-white"
              : "bg-primary hover:bg-primary-dark text-white"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved Successfully! Refresh page to see changes.
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save All Changes
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
