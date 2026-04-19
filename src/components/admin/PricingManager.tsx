import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Plus, Trash2, Edit2, Check, X, DollarSign } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: string;
  popular: boolean;
}

const defaultPlans: PricingPlan[] = [
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

export default function PricingManager() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedPlans = localStorage.getItem("pricingPlans");
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error("Error loading plans:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("pricingPlans", JSON.stringify(plans));
    setSaved(true);
    setEditingIndex(null);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleUpdate = (index: number, field: keyof PricingPlan, value: any) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };

  const handleAddFeature = (index: number) => {
    const updated = [...plans];
    updated[index].features.push("New Feature");
    setPlans(updated);
  };

  const handleRemoveFeature = (planIndex: number, featureIndex: number) => {
    const updated = [...plans];
    updated[planIndex].features = updated[planIndex].features.filter((_, i) => i !== featureIndex);
    setPlans(updated);
  };

  const handleUpdateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updated = [...plans];
    updated[planIndex].features[featureIndex] = value;
    setPlans(updated);
  };

  const handleDelete = (index: number) => {
    if (confirm("Delete this pricing plan?")) {
      setPlans(plans.filter((_, i) => i !== index));
    }
  };

  const handleAdd = () => {
    const newPlan: PricingPlan = {
      name: "New Plan",
      price: "$0",
      description: "Plan description",
      features: ["Feature 1"],
      icon: "Zap",
      popular: false
    };
    setPlans([...plans, newPlan]);
    setEditingIndex(plans.length);
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Pricing Manager</h2>
            <p className="text-white/60">Manage pricing plans and features</p>
          </div>
          <button
            onClick={handleAdd}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-black/40 backdrop-blur-xl border rounded-3xl p-8 ${
              plan.popular ? "border-primary/50 bg-primary/5" : "border-white/10"
            }`}
          >
            {editingIndex === index ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Edit Plan</h3>
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Plan Name</label>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => handleUpdate(index, "name", e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Price</label>
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => handleUpdate(index, "price", e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Description</label>
                  <textarea
                    rows={2}
                    value={plan.description}
                    onChange={(e) => handleUpdate(index, "description", e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 text-white/80">Features</label>
                  <div className="space-y-2">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleUpdateFeature(index, fIndex, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                        />
                        <button
                          onClick={() => handleRemoveFeature(index, fIndex)}
                          className="p-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddFeature(index)}
                      className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-all"
                    >
                      + Add Feature
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={plan.popular}
                    onChange={(e) => handleUpdate(index, "popular", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-white/80">Mark as Popular</label>
                </div>

                <button
                  onClick={() => handleDelete(index)}
                  className="w-full py-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 font-bold text-sm transition-all"
                >
                  Delete Plan
                </button>
              </div>
            ) : (
              <div>
                {plan.popular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-4">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4 text-primary">{plan.price}</div>
                <p className="text-white/60 text-sm mb-6">{plan.description}</p>
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setEditingIndex(index)}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Plan
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            saved ? "bg-green-500 text-white" : "bg-primary hover:bg-primary-dark text-white"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved! Refresh page to see changes.
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save All Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
