import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Sparkles, Clock, ArrowRight } from "lucide-react";

interface OfferData {
  enabled: boolean;
  text: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  textColor: string;
  position: "top" | "bottom";
  showCountdown: boolean;
  countdownDate: string;
  showSparkles: boolean;
  dismissible: boolean;
}

const defaultOffer: OfferData = {
  enabled: false,
  text: "🎉 Special Offer: Get 30% OFF on all packages!",
  subtext: "Limited time only - Don't miss out!",
  buttonText: "Claim Offer",
  buttonLink: "#",
  backgroundColor: "#3B82F6",
  textColor: "#FFFFFF",
  position: "top",
  showCountdown: false,
  countdownDate: "",
  showSparkles: true,
  dismissible: true
};

export default function OfferBanner() {
  const [offer, setOffer] = useState<OfferData>(defaultOffer);
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    loadOffer();
    const handleUpdate = () => loadOffer();
    window.addEventListener("offerUpdated", handleUpdate);
    
    // Check if user dismissed the banner
    const isDismissed = sessionStorage.getItem("offerBannerDismissed");
    if (isDismissed === "true") {
      setDismissed(true);
    }

    return () => window.removeEventListener("offerUpdated", handleUpdate);
  }, []);

  useEffect(() => {
    if (offer.showCountdown && offer.countdownDate) {
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [offer.showCountdown, offer.countdownDate]);

  const loadOffer = () => {
    try {
      const saved = localStorage.getItem("offerBanner");
      if (saved) {
        setOffer(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading offer:", e);
    }
  };

  const calculateTimeLeft = () => {
    if (!offer.countdownDate) return;
    
    const difference = +new Date(offer.countdownDate) - +new Date();
    
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("offerBannerDismissed", "true");
  };

  if (!offer.enabled || dismissed) {
    return null;
  }

  const positionClass = offer.position === "top" 
    ? "top-0" 
    : "bottom-0";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: offer.position === "top" ? -100 : 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: offer.position === "top" ? -100 : 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed ${positionClass} left-0 right-0 z-[9998] shadow-2xl`}
        style={{ backgroundColor: offer.backgroundColor }}
      >
        <div className="container mx-auto px-6 py-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left Side - Text */}
            <div className="flex items-center gap-4 flex-1">
              {offer.showSparkles && (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={24} style={{ color: offer.textColor }} />
                </motion.div>
              )}
              
              <div className="text-center md:text-left">
                <p 
                  className="font-bold text-lg md:text-xl mb-1"
                  style={{ color: offer.textColor }}
                >
                  {offer.text}
                </p>
                {offer.subtext && (
                  <p 
                    className="text-sm opacity-90"
                    style={{ color: offer.textColor }}
                  >
                    {offer.subtext}
                  </p>
                )}
              </div>
            </div>

            {/* Center - Countdown */}
            {offer.showCountdown && offer.countdownDate && (
              <div className="flex items-center gap-3">
                <Clock size={20} style={{ color: offer.textColor }} />
                <div className="flex gap-2">
                  {timeLeft.days > 0 && (
                    <div 
                      className="px-3 py-2 rounded-lg backdrop-blur-sm"
                      style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                    >
                      <div className="text-xl font-bold" style={{ color: offer.textColor }}>
                        {timeLeft.days}
                      </div>
                      <div className="text-xs opacity-80" style={{ color: offer.textColor }}>
                        Days
                      </div>
                    </div>
                  )}
                  <div 
                    className="px-3 py-2 rounded-lg backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                  >
                    <div className="text-xl font-bold" style={{ color: offer.textColor }}>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-xs opacity-80" style={{ color: offer.textColor }}>
                      Hours
                    </div>
                  </div>
                  <div 
                    className="px-3 py-2 rounded-lg backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                  >
                    <div className="text-xl font-bold" style={{ color: offer.textColor }}>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-xs opacity-80" style={{ color: offer.textColor }}>
                      Min
                    </div>
                  </div>
                  <div 
                    className="px-3 py-2 rounded-lg backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                  >
                    <div className="text-xl font-bold" style={{ color: offer.textColor }}>
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-xs opacity-80" style={{ color: offer.textColor }}>
                      Sec
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right Side - Button */}
            <div className="flex items-center gap-3">
              {offer.buttonText && (
                <motion.a
                  href={offer.buttonLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg backdrop-blur-sm"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: offer.textColor,
                    border: `2px solid ${offer.textColor}`
                  }}
                >
                  {offer.buttonText}
                  <ArrowRight size={16} />
                </motion.a>
              )}

              {offer.dismissible && (
                <button
                  onClick={handleDismiss}
                  className="p-2 rounded-full hover:bg-white/20 transition-all"
                  style={{ color: offer.textColor }}
                  aria-label="Close offer banner"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Animated Background Effect */}
          {offer.showSparkles && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: offer.textColor }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: offer.textColor }}
                animate={{
                  x: [0, -100, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
