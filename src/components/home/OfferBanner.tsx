import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight, Gift } from "lucide-react";

interface OfferData {
  enabled: boolean;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  textColor: string;
  icon: string;
  position: string;
  animation: string;
}

const defaultOffer: OfferData = {
  enabled: false,
  title: "🎉 Special Offer - 50% OFF",
  description: "Limited time offer on all web development packages!",
  buttonText: "Claim Offer",
  buttonLink: "#",
  backgroundColor: "#3B82F6",
  textColor: "#FFFFFF",
  icon: "gift",
  position: "top",
  animation: "slide"
};

const iconMap: any = {
  gift: Gift,
  sparkles: Sparkles,
  arrow: ArrowRight
};

export default function OfferBanner() {
  const [offer, setOffer] = useState<OfferData>(defaultOffer);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    loadOffer();
    const handleUpdate = () => loadOffer();
    window.addEventListener("offerUpdated", handleUpdate);
    return () => window.removeEventListener("offerUpdated", handleUpdate);
  }, []);

  const loadOffer = () => {
    try {
      const saved = localStorage.getItem("offerBanner");
      if (saved) {
        const data = JSON.parse(saved);
        setOffer(data);
        setIsVisible(data.enabled && !isDismissed);
      }
    } catch (e) {
      console.error("Error loading offer:", e);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || !offer.enabled) {
    return null;
  }

  const IconComponent = iconMap[offer.icon] || Gift;

  const getAnimationVariants = () => {
    switch (offer.animation) {
      case "slide":
        return {
          initial: offer.position === "top" ? { y: -100, opacity: 0 } : { y: 100, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: offer.position === "top" ? { y: -100, opacity: 0 } : { y: 100, opacity: 0 }
        };
      case "fade":
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 }
        };
      case "bounce":
        return {
          initial: { y: offer.position === "top" ? -100 : 100, opacity: 0 },
          animate: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", bounce: 0.5, duration: 0.8 }
          },
          exit: { y: offer.position === "top" ? -100 : 100, opacity: 0 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const positionClasses = offer.position === "top" 
    ? "top-0 left-0 right-0" 
    : "bottom-0 left-0 right-0";

  return (
    <AnimatePresence>
      <motion.div
        {...getAnimationVariants()}
        transition={{ duration: 0.5 }}
        className={`fixed ${positionClasses} z-[9998] shadow-2xl`}
        style={{ backgroundColor: offer.backgroundColor }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-1">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="hidden sm:block"
              >
                <IconComponent 
                  size={32} 
                  style={{ color: offer.textColor }}
                />
              </motion.div>
              
              <div className="flex-1">
                <h3 
                  className="font-bold text-lg md:text-xl mb-1"
                  style={{ color: offer.textColor }}
                >
                  {offer.title}
                </h3>
                <p 
                  className="text-sm opacity-90"
                  style={{ color: offer.textColor }}
                >
                  {offer.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {offer.buttonLink && offer.buttonLink !== "#" && (
                <motion.a
                  href={offer.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
                  style={{ 
                    backgroundColor: offer.textColor,
                    color: offer.backgroundColor
                  }}
                >
                  {offer.buttonText}
                  <ArrowRight size={16} />
                </motion.a>
              )}

              <button
                onClick={handleDismiss}
                className="p-2 rounded-full hover:bg-white/20 transition-all"
                style={{ color: offer.textColor }}
                aria-label="Close offer"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${offer.textColor}, transparent)`
          }}
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
