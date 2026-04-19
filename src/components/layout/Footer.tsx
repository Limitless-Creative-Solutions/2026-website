import { Link } from "react-router-dom";
import { MessageSquare, Twitter, Instagram, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    email: "vision@limitless.lcc",
    phone: "+94 77 123 4567",
    address: "Level 26, One Colombo, SL",
    facebook: "https://facebook.com/limitless",
    instagram: "https://instagram.com/limitless",
    linkedin: "https://linkedin.com/company/limitless",
    twitter: "https://twitter.com/limitless"
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
          address: parsed.address || contactInfo.address,
          facebook: parsed.facebook || contactInfo.facebook,
          instagram: parsed.instagram || contactInfo.instagram,
          linkedin: parsed.linkedin || contactInfo.linkedin,
          twitter: parsed.twitter || contactInfo.twitter
        });
      } catch (e) {
        console.error("Error loading contact info:", e);
      }
    }
  };

  const socialLinks = [
    { Icon: Twitter, url: contactInfo.twitter },
    { Icon: Instagram, url: contactInfo.instagram },
    { Icon: Linkedin, url: contactInfo.linkedin },
    { Icon: Github, url: "https://github.com/limitless" }
  ];
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl neon-glow">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight tracking-tight">LIMITLESS</span>
                <span className="text-[10px] text-white/50 tracking-[0.2em] font-medium uppercase">Creative Solutions</span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm">
              Sri Lanka's leading digital powerhouse, engineering futuristic experiences that scale brands globally.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-primary hover:bg-white/10 transition-all border border-white/5"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-primary">Services</h4>
            <ul className="flex flex-col gap-4">
              {["Software Development", "Web Experiences", "Mobile Apps", "Digital Growth", "Cloud Storage", "AI Creativity"].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-white/50 hover:text-white transition-colors text-sm flex items-center group">
                    {item}
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-8 uppercase tracking-widest text-primary">Agency</h4>
            <ul className="flex flex-col gap-4">
              {["Our Portfolio", "Case Studies", "Template Market", "Founder's Story", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={item === "Template Market" ? "/marketplace" : "/portfolio"} className="text-white/50 hover:text-white transition-colors text-sm flex items-center group">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 border-primary/20 bg-primary/5">
            <h4 className="font-display font-bold text-lg mb-4 text-white">Subscribe to News</h4>
            <p className="text-white/50 text-xs mb-6">Receive curated insights into AI and design.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="w-full bg-white text-black font-bold py-3 rounded-xl text-sm hover:bg-primary hover:text-white transition-all">
                Join Network
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest">
            © 2026 Limitless Creative Solutions LCC. All Rights Reserved. Sri Lanka.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
