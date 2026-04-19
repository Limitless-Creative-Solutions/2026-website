import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Phone, ArrowUp, X } from "lucide-react";
import { useState, useEffect, MouseEvent } from "react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("94771234567");
  const [phoneNumber, setPhoneNumber] = useState("+94771234567");

  useEffect(() => {
    // Load contact info on mount
    loadContactInfo();
    
    // Listen for updates
    const handleUpdate = () => {
      console.log("🔄 Contact info updated - reloading...");
      loadContactInfo();
    };
    window.addEventListener("contactInfoUpdated", handleUpdate);
    
    // Scroll handler
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Show tooltip after 10 seconds
    const timer = setTimeout(() => setShowTooltip(true), 10000);
    
    return () => {
      window.removeEventListener("contactInfoUpdated", handleUpdate);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const loadContactInfo = () => {
    try {
      const saved = localStorage.getItem("contactInfo");
      if (saved) {
        const info = JSON.parse(saved);
        
        // Set WhatsApp number (remove any + or spaces)
        if (info.whatsapp) {
          const cleanWhatsapp = info.whatsapp.replace(/[\s+]/g, '');
          setWhatsappNumber(cleanWhatsapp);
          console.log("✅ WhatsApp number loaded:", cleanWhatsapp);
        }
        
        // Set phone number
        if (info.phone) {
          setPhoneNumber(info.phone);
          console.log("✅ Phone number loaded:", info.phone);
        }
      } else {
        console.log("⚠️ No contact info found in localStorage");
      }
    } catch (e) {
      console.error("❌ Error loading contact info:", e);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = encodeURIComponent("Hi Limitless team, I'd like to start a new project.");
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    console.log("📱 Opening WhatsApp:", url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = `tel:${phoneNumber}`;
    console.log("📞 Opening Call:", url);
    window.location.href = url;
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button with Tooltip */}
      <div className="relative">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-full right-0 mb-4 w-64 bg-white text-black p-4 rounded-2xl shadow-2xl"
            >
              <button 
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 text-black/40 hover:text-black"
                aria-label="Close tooltip"
              >
                <X size={14} />
              </button>
              <p className="text-xs font-bold leading-relaxed">
                🚀 Ready to scale your brand? <br />
                <span className="text-primary">Chat with our engineering team now.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <motion.button
          onClick={handleWhatsAppClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,211,102,0.4)] relative cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <MessageSquare size={28} />
        </motion.button>
      </div>

      {/* Call Button */}
      <motion.button
        onClick={handleCallClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer"
        aria-label="Call us"
      >
        <Phone size={20} />
      </motion.button>
    </div>
  );
}
