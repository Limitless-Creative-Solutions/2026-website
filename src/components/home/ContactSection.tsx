import { useState, useEffect, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "vision@limitless.lcc",
    phone: "+94 77 123 4567",
    address: "Level 26, One Colombo, SL"
  });

  useEffect(() => {
    loadContactInfo();
    const handleUpdate = () => loadContactInfo();
    window.addEventListener("contactInfoUpdated", handleUpdate);
    return () => window.removeEventListener("contactInfoUpdated", handleUpdate);
  }, []);

  const loadContactInfo = () => {
    const saved = localStorage.getItem("contactInfo");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContactInfo({
          email: parsed.email || contactInfo.email,
          phone: parsed.phone || contactInfo.phone,
          address: parsed.address || contactInfo.address
        });
      } catch (e) {
        console.error("Error loading contact info:", e);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Save message to localStorage
    const message = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: Date.now(),
      read: false
    };

    const existing = localStorage.getItem("contactMessages");
    const messages = existing ? JSON.parse(existing) : [];
    messages.push(message);
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    // Trigger event for admin panel
    window.dispatchEvent(new Event("newContactMessage"));

    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };
  return (
    <section className="py-32 relative bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="glass-card p-12 lg:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 italic">Ready to <br /><span className="text-gradient">Scale?</span></h2>
              <p className="text-white/60 text-lg mb-12">Whether you need an enterprise SaaS or a viral creative strategy, our engineers in Colombo are ready.</p>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Neural Inbox", val: contactInfo.email },
                  { icon: Phone, label: "Direct Line", val: contactInfo.phone },
                  { icon: MapPin, label: "Node Core", val: contactInfo.address },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{item.label}</div>
                      <div className="text-lg font-display font-bold group-hover:text-primary transition-colors">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Your Identity</label>
                   <input 
                      type="text" 
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                   />
                 </div>
                 <div className="space-y-4">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Digital Address</label>
                   <input 
                      type="email" 
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                   />
                 </div>
               </div>
               <div className="space-y-4">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Phone (Optional)</label>
                 <input 
                    type="tel" 
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                 />
               </div>
               <div className="space-y-4">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">Brief Trajectory</label>
                 <textarea 
                    placeholder="Tell us about the project scope..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
                 />
               </div>
               <button 
                  type="submit"
                  className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                    submitted ? "bg-green-500" : "bg-primary hover:bg-primary-dark"
                  }`}
               >
                  {submitted ? (
                    <>
                      <Check size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Initialize Transmission
                      <Send size={20} />
                    </>
                  )}
               </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
