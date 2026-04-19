import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Check, Phone, Mail, MapPin, Globe, MessageCircle } from "lucide-react";

interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

const defaultInfo: ContactInfo = {
  email: "hello@limitless.lk",
  phone: "+94 77 123 4567",
  whatsapp: "94771234567",
  address: "Colombo, Sri Lanka",
  website: "https://limitless.lk",
  facebook: "https://facebook.com/limitless",
  instagram: "https://instagram.com/limitless",
  linkedin: "https://linkedin.com/company/limitless",
  twitter: "https://twitter.com/limitless"
};

export default function ContactInfoManager() {
  const [info, setInfo] = useState<ContactInfo>(defaultInfo);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedInfo = localStorage.getItem("contactInfo");
    if (savedInfo) {
      try {
        setInfo(JSON.parse(savedInfo));
      } catch (e) {
        console.error("Error loading contact info:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("contactInfo", JSON.stringify(info));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // Trigger update event
    window.dispatchEvent(new Event("contactInfoUpdated"));
  };

  const handleUpdate = (field: keyof ContactInfo, value: string) => {
    setInfo({ ...info, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-white/60 mb-6">Update contact details - changes apply instantly</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </label>
            <input
              type="email"
              value={info.email}
              onChange={(e) => handleUpdate("email", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Phone Number
            </label>
            <input
              type="tel"
              value={info.phone}
              onChange={(e) => handleUpdate("phone", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={info.whatsapp}
              onChange={(e) => handleUpdate("whatsapp", e.target.value)}
              placeholder="94771234567 (no + or spaces)"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
            <p className="text-xs text-white/40 mt-1">Format: 94771234567 (country code + number)</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Address
            </label>
            <input
              type="text"
              value={info.address}
              onChange={(e) => handleUpdate("address", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Website
            </label>
            <input
              type="url"
              value={info.website}
              onChange={(e) => handleUpdate("website", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Facebook</label>
            <input
              type="url"
              value={info.facebook}
              onChange={(e) => handleUpdate("facebook", e.target.value)}
              placeholder="https://facebook.com/yourpage"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Instagram</label>
            <input
              type="url"
              value={info.instagram}
              onChange={(e) => handleUpdate("instagram", e.target.value)}
              placeholder="https://instagram.com/yourpage"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">LinkedIn</label>
            <input
              type="url"
              value={info.linkedin}
              onChange={(e) => handleUpdate("linkedin", e.target.value)}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Twitter</label>
            <input
              type="url"
              value={info.twitter}
              onChange={(e) => handleUpdate("twitter", e.target.value)}
              placeholder="https://twitter.com/yourhandle"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-primary/10 border border-primary/20">
          <h3 className="font-bold mb-3 text-primary">📝 Note</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>• Changes save to localStorage and apply instantly</li>
            <li>• WhatsApp format: 94771234567 (no + or spaces)</li>
            <li>• Social links should be full URLs</li>
            <li>• Click Save to apply changes across the website</li>
          </ul>
        </div>

        <button
          onClick={handleSave}
          className={`w-full mt-6 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            saved ? "bg-green-500 text-white" : "bg-primary hover:bg-primary-dark text-white"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved! Changes Applied.
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Contact Info
            </>
          )}
        </button>
      </div>
    </div>
  );
}
