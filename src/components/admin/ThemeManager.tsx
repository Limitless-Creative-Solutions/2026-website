import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Check, Palette, Type, Sparkles, Eye, RefreshCw } from "lucide-react";

interface ThemeSettings {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  
  // Typography
  headingFont: string;
  bodyFont: string;
  fontSize: number;
  headingSize: number;
  
  // Effects
  enableAnimations: boolean;
  enableGlowEffects: boolean;
  enableGradients: boolean;
  animationSpeed: number;
  
  // Spacing
  sectionPadding: number;
  borderRadius: number;
  
  // Background
  backgroundPattern: string;
  backgroundOpacity: number;
}

const defaultTheme: ThemeSettings = {
  primaryColor: "#3B82F6",
  secondaryColor: "#8B5CF6",
  backgroundColor: "#05060B",
  textColor: "#F8FAFC",
  accentColor: "#10B981",
  headingFont: "Inter",
  bodyFont: "Inter",
  fontSize: 16,
  headingSize: 48,
  enableAnimations: true,
  enableGlowEffects: true,
  enableGradients: true,
  animationSpeed: 1,
  sectionPadding: 128,
  borderRadius: 24,
  backgroundPattern: "dots",
  backgroundOpacity: 10,
};

const fontOptions = [
  "Inter",
  "Poppins",
  "Montserrat",
  "Roboto",
  "Open Sans",
  "Lato",
  "Raleway",
  "Playfair Display",
  "Merriweather",
];

const backgroundPatterns = [
  { id: "none", name: "None" },
  { id: "dots", name: "Dots" },
  { id: "grid", name: "Grid" },
  { id: "gradient", name: "Gradient" },
];

export default function ThemeManager() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = () => {
    try {
      const saved = localStorage.getItem("themeSettings");
      if (saved) {
        setTheme(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading theme:", e);
    }
  };

  const handleSave = () => {
    localStorage.setItem("themeSettings", JSON.stringify(theme));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Apply theme to document
    applyTheme(theme);
    
    // Trigger update event
    window.dispatchEvent(new Event("themeUpdated"));
  };

  const applyTheme = (settings: ThemeSettings) => {
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty("--color-primary", settings.primaryColor);
    root.style.setProperty("--color-secondary", settings.secondaryColor);
    root.style.setProperty("--color-background", settings.backgroundColor);
    root.style.setProperty("--color-text", settings.textColor);
    root.style.setProperty("--color-accent", settings.accentColor);
    
    // Typography
    root.style.setProperty("--font-heading", settings.headingFont);
    root.style.setProperty("--font-body", settings.bodyFont);
    root.style.setProperty("--font-size-base", `${settings.fontSize}px`);
    root.style.setProperty("--font-size-heading", `${settings.headingSize}px`);
    
    // Spacing
    root.style.setProperty("--section-padding", `${settings.sectionPadding}px`);
    root.style.setProperty("--border-radius", `${settings.borderRadius}px`);
    
    // Background
    root.style.setProperty("--bg-opacity", `${settings.backgroundOpacity}%`);
    
    // Animation speed
    root.style.setProperty("--animation-speed", `${settings.animationSpeed}s`);
  };

  const handleUpdate = (field: keyof ThemeSettings, value: any) => {
    setTheme({ ...theme, [field]: value });
  };

  const handleReset = () => {
    if (confirm("Reset to default theme? This cannot be undone.")) {
      setTheme(defaultTheme);
      localStorage.setItem("themeSettings", JSON.stringify(defaultTheme));
      applyTheme(defaultTheme);
      window.dispatchEvent(new Event("themeUpdated"));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Palette className="w-6 h-6 text-primary" />
              Theme Customization
            </h2>
            <p className="text-white/60">Customize colors, fonts, and effects</p>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Color Scheme
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Primary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => handleUpdate("primaryColor", e.target.value)}
                className="w-16 h-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => handleUpdate("primaryColor", e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Secondary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => handleUpdate("secondaryColor", e.target.value)}
                className="w-16 h-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={theme.secondaryColor}
                onChange={(e) => handleUpdate("secondaryColor", e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Background Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => handleUpdate("backgroundColor", e.target.value)}
                className="w-16 h-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={theme.backgroundColor}
                onChange={(e) => handleUpdate("backgroundColor", e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Text Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.textColor}
                onChange={(e) => handleUpdate("textColor", e.target.value)}
                className="w-16 h-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={theme.textColor}
                onChange={(e) => handleUpdate("textColor", e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Accent Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) => handleUpdate("accentColor", e.target.value)}
                className="w-16 h-12 rounded-xl cursor-pointer"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => handleUpdate("accentColor", e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Type className="w-5 h-5 text-primary" />
          Typography
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Heading Font</label>
            <select
              value={theme.headingFont}
              onChange={(e) => handleUpdate("headingFont", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Body Font</label>
            <select
              value={theme.bodyFont}
              onChange={(e) => handleUpdate("bodyFont", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">
              Body Font Size: {theme.fontSize}px
            </label>
            <input
              type="range"
              min="14"
              max="20"
              value={theme.fontSize}
              onChange={(e) => handleUpdate("fontSize", parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">
              Heading Size: {theme.headingSize}px
            </label>
            <input
              type="range"
              min="32"
              max="72"
              value={theme.headingSize}
              onChange={(e) => handleUpdate("headingSize", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Effects & Animations */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Effects & Animations
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <p className="font-bold text-white/80">Enable Animations</p>
              <p className="text-xs text-white/40">Smooth transitions and effects</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={theme.enableAnimations}
                  onChange={(e) => handleUpdate("enableAnimations", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <p className="font-bold text-white/80">Glow Effects</p>
              <p className="text-xs text-white/40">Glowing buttons and elements</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={theme.enableGlowEffects}
                  onChange={(e) => handleUpdate("enableGlowEffects", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <p className="font-bold text-white/80">Gradient Effects</p>
              <p className="text-xs text-white/40">Colorful gradients on text</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={theme.enableGradients}
                  onChange={(e) => handleUpdate("enableGradients", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">
              Animation Speed: {theme.animationSpeed}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={theme.animationSpeed}
              onChange={(e) => handleUpdate("animationSpeed", parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Spacing & Layout */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6">Spacing & Layout</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">
              Section Padding: {theme.sectionPadding}px
            </label>
            <input
              type="range"
              min="64"
              max="192"
              step="8"
              value={theme.sectionPadding}
              onChange={(e) => handleUpdate("sectionPadding", parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">
              Border Radius: {theme.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="48"
              step="4"
              value={theme.borderRadius}
              onChange={(e) => handleUpdate("borderRadius", parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6">Background</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">Pattern</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {backgroundPatterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => handleUpdate("backgroundPattern", pattern.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme.backgroundPattern === pattern.id
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="font-bold text-sm">{pattern.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">
              Pattern Opacity: {theme.backgroundOpacity}%
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={theme.backgroundOpacity}
              onChange={(e) => handleUpdate("backgroundOpacity", parseInt(e.target.value))}
              className="w-full"
            />
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
              Saved! Theme Applied.
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Theme Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
