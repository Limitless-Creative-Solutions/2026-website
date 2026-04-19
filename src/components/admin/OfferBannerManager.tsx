import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Check, Sparkles, Eye, EyeOff, Clock, Palette } from "lucide-react";

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

const colorPresets = [
  { name: "Blue", bg: "#3B82F6", text: "#FFFFFF" },
  { name: "Green", bg: "#10B981", text: "#FFFFFF" },
  { name: "Purple", bg: "#8B5CF6", text: "#FFFFFF" },
  { name: "Red", bg: "#EF4444", text: "#FFFFFF" },
  { name: "Orange", bg: "#F59E0B", text: "#FFFFFF" },
  { name: "Pink", bg: "#EC4899", text: "#FFFFFF" },
  { name: "Dark", bg: "#1F2937", text: "#FFFFFF" },
  { name: "Gold", bg: "#D97706", text: "#FFFFFF" },
];

export default function OfferBannerManager() {
  const [offer, setOffer] = useState<OfferData>(defaultOffer);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedOffer = localStorage.getItem("offerBanner");
    if (savedOffer) {
      try {
        setOffer(JSON.parse(savedOffer));
      } catch (e) {
        console.error("Error loading offer:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("offerBanner", JSON.stringify(offer));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Trigger update event
    window.dispatchEvent(new Event("offerUpdated"));
    
    // Clear session storage so banner shows again
    sessionStorage.removeItem("offerBannerDismissed");
  };

  const handleUpdate = (field: keyof OfferData, value: any) => {
    setOffer({ ...offer, [field]: value });
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setOffer({
      ...offer,
      backgroundColor: preset.bg,
      textColor: preset.text
    });
  };

  return (
    <div className="space-y-6">
      {/* Enable/Disable */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              Offer Banner
            </h2>
            <p className="text-white/60">Create promotional banners with countdown timers</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">
              {offer.enabled ? "Enabled" : "Disabled"}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={offer.enabled}
                onChange={(e) => handleUpdate("enabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Preview */}
      {offer.enabled && (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Live Preview
          </h3>
          <div 
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ backgroundColor: offer.backgroundColor }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                {offer.showSparkles && <Sparkles size={24} style={{ color: offer.textColor }} />}
                <div>
                  <p className="font-bold text-lg" style={{ color: offer.textColor }}>
                    {offer.text || "Your offer text here"}
                  </p>
                  {offer.subtext && (
                    <p className="text-sm opacity-90" style={{ color: offer.textColor }}>
                      {offer.subtext}
                    </p>
                  )}
                </div>
              </div>
              {offer.buttonText && (
                <button 
                  className="px-6 py-3 rounded-full font-bold text-sm"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: offer.textColor,
                    border: `2px solid ${offer.textColor}`
                  }}
                >
                  {offer.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Settings */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6">Content Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Offer Text</label>
            <input
              type="text"
              value={offer.text}
              onChange={(e) => handleUpdate("text", e.target.value)}
              placeholder="🎉 Special Offer: Get 30% OFF!"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Subtext (Optional)</label>
            <input
              type="text"
              value={offer.subtext}
              onChange={(e) => handleUpdate("subtext", e.target.value)}
              placeholder="Limited time only - Don't miss out!"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Button Text</label>
              <input
                type="text"
                value={offer.buttonText}
                onChange={(e) => handleUpdate("buttonText", e.target.value)}
                placeholder="Claim Offer"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Button Link</label>
              <input
                type="url"
                value={offer.buttonLink}
                onChange={(e) => handleUpdate("buttonLink", e.target.value)}
                placeholder="https://example.com/offer"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Design Settings */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Design Settings
        </h3>
        
        <div className="space-y-6">
          {/* Color Presets */}
          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">Color Presets</label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyColorPreset(preset)}
                  className="aspect-square rounded-xl border-2 border-white/10 hover:border-primary transition-all relative group"
                  style={{ backgroundColor: preset.bg }}
                  title={preset.name}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: preset.text }}>
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Background Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={offer.backgroundColor}
                  onChange={(e) => handleUpdate("backgroundColor", e.target.value)}
                  className="w-16 h-12 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={offer.backgroundColor}
                  onChange={(e) => handleUpdate("backgroundColor", e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Text Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={offer.textColor}
                  onChange={(e) => handleUpdate("textColor", e.target.value)}
                  className="w-16 h-12 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={offer.textColor}
                  onChange={(e) => handleUpdate("textColor", e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">Banner Position</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleUpdate("position", "top")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  offer.position === "top"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="font-bold mb-1">Top</div>
                <div className="text-xs text-white/60">Banner at top of page</div>
              </button>
              <button
                onClick={() => handleUpdate("position", "bottom")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  offer.position === "bottom"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="font-bold mb-1">Bottom</div>
                <div className="text-xs text-white/60">Banner at bottom of page</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Advanced Settings
        </h3>
        
        <div className="space-y-6">
          {/* Countdown Timer */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <p className="font-bold text-white/80">Show Countdown Timer</p>
              <p className="text-xs text-white/40">Display time remaining for offer</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={offer.showCountdown}
                  onChange={(e) => handleUpdate("showCountdown", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>

          {offer.showCountdown && (
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Countdown End Date & Time</label>
              <input
                type="datetime-local"
                value={offer.countdownDate}
                onChange={(e) => handleUpdate("countdownDate", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
              />
              <p className="text-xs text-white/40 mt-2">Set when the offer expires</p>
            </div>
          )}

          {/* Sparkles Animation */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <p className="font-bold text-white/80">Show Sparkles Animation</p>
              <p className="text-xs text-white/40">Animated sparkles and background effects</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={offer.showSparkles}
                  onChange={(e) => handleUpdate("showSparkles", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>

          {/* Dismissible */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <p className="font-bold text-white/80">Allow Users to Dismiss</p>
              <p className="text-xs text-white/40">Show close button (hides until page refresh)</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={offer.dismissible}
                  onChange={(e) => handleUpdate("dismissible", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
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
              Saved! Banner is now live.
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Offer Banner
            </>
          )}
        </button>
      </div>
    </div>
  );
}
