import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Check, Video, Image as ImageIcon, FileText, Eye, EyeOff } from "lucide-react";

interface SiteContent {
  // Hero Section
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  heroButtonsEnabled: boolean;
  
  // About Section
  aboutTitle: string;
  aboutDescription: string;
  aboutEnabled: boolean;
  
  // Mission Section
  missionTitle: string;
  missionDescription: string;
  missionEnabled: boolean;
  
  // AI Tools Section (Engineered Frameworks)
  aiToolsEnabled: boolean;
  
  // Testimonials Section
  testimonialsEnabled: boolean;
  
  // Pricing Section
  pricingButtonsEnabled: boolean;
  
  // Background Video
  backgroundVideoUrl: string;
  backgroundVideoEnabled: boolean;
  
  // Maintenance Mode
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const defaultContent: SiteContent = {
  heroHeading: "CREATIVE\nSOLUTIONS.\nNO LIMITS.",
  heroSubheading: "We Create. We Grow. We Scale Brands.",
  heroDescription: "Sri Lanka's most advanced digital ecosystem for brands that scale. We combine high-end creative agency services with AI-powered SaaS automation.",
  heroButtonsEnabled: true,
  aboutTitle: "About Us",
  aboutDescription: "We are a team of passionate creators, developers, and strategists dedicated to building exceptional digital experiences.",
  aboutEnabled: false,
  missionTitle: "Our Mission",
  missionDescription: "To empower businesses with cutting-edge technology and creative solutions that drive growth and innovation.",
  missionEnabled: false,
  aiToolsEnabled: true,
  testimonialsEnabled: true,
  pricingButtonsEnabled: true,
  backgroundVideoUrl: "",
  backgroundVideoEnabled: false,
  maintenanceMode: false,
  maintenanceMessage: "We're currently performing maintenance. We'll be back soon!"
};

export default function ContentManager() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);
  const [videoError, setVideoError] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("siteContent");
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Error loading content:", e);
      }
    }
  }, []);

  const validateVideoUrl = (url: string): boolean => {
    if (!url) return true; // Empty is valid
    
    // Check if it's a valid URL
    try {
      new URL(url);
    } catch {
      setVideoError("Invalid URL format");
      return false;
    }

    // Check if it's a video file or embed URL
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    const isVideoFile = videoExtensions.some(ext => url.toLowerCase().includes(ext));
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    const isVimeo = url.includes('vimeo.com');

    if (!isVideoFile && !isYouTube && !isVimeo) {
      setVideoError("URL must be a video file (.mp4, .webm, .ogg) or YouTube/Vimeo link");
      return false;
    }

    setVideoError("");
    return true;
  };

  const handleSave = () => {
    // Validate video URL if enabled
    if (content.backgroundVideoEnabled && !validateVideoUrl(content.backgroundVideoUrl)) {
      return;
    }

    localStorage.setItem("siteContent", JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Trigger update event
    window.dispatchEvent(new Event("contentUpdated"));
  };

  const handleUpdate = (field: keyof SiteContent, value: any) => {
    setContent({ ...content, [field]: value });
    if (field === "backgroundVideoUrl") {
      validateVideoUrl(value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          Hero Section
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Main Heading</label>
            <textarea
              rows={3}
              value={content.heroHeading}
              onChange={(e) => handleUpdate("heroHeading", e.target.value)}
              placeholder="CREATIVE\nSOLUTIONS.\nNO LIMITS."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono"
            />
            <p className="text-xs text-white/40 mt-1">Use \n for line breaks</p>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Subheading</label>
            <input
              type="text"
              value={content.heroSubheading}
              onChange={(e) => handleUpdate("heroSubheading", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Description</label>
            <textarea
              rows={3}
              value={content.heroDescription}
              onChange={(e) => handleUpdate("heroDescription", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div>
              <p className="font-bold text-white/80">Show Hero Buttons</p>
              <p className="text-xs text-white/40">Book Strategy Call & Explore Marketplace</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={content.heroButtonsEnabled}
                  onChange={(e) => handleUpdate("heroButtonsEnabled", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Background Video */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Video className="w-6 h-6 text-primary" />
            Background Video
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">Enable</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={content.backgroundVideoEnabled}
                onChange={(e) => handleUpdate("backgroundVideoEnabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        {content.backgroundVideoEnabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Video URL</label>
              <input
                type="url"
                value={content.backgroundVideoUrl}
                onChange={(e) => handleUpdate("backgroundVideoUrl", e.target.value)}
                placeholder="https://example.com/video.mp4 or YouTube/Vimeo URL"
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white focus:outline-none transition-all ${
                  videoError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-primary"
                }`}
              />
              {videoError && (
                <p className="text-xs text-red-500 mt-2">{videoError}</p>
              )}
              <p className="text-xs text-white/40 mt-2">
                Supported: .mp4, .webm, .ogg files or YouTube/Vimeo embeds
              </p>
            </div>

            {content.backgroundVideoUrl && !videoError && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-500 font-bold">✓ Valid video URL</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            About Section
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">Show on Homepage</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={content.aboutEnabled}
                onChange={(e) => handleUpdate("aboutEnabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Title</label>
            <input
              type="text"
              value={content.aboutTitle}
              onChange={(e) => handleUpdate("aboutTitle", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Description</label>
            <textarea
              rows={4}
              value={content.aboutDescription}
              onChange={(e) => handleUpdate("aboutDescription", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            Mission Section
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">Show on Homepage</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={content.missionEnabled}
                onChange={(e) => handleUpdate("missionEnabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Title</label>
            <input
              type="text"
              value={content.missionTitle}
              onChange={(e) => handleUpdate("missionTitle", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Description</label>
            <textarea
              rows={4}
              value={content.missionDescription}
              onChange={(e) => handleUpdate("missionDescription", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* AI Tools Section (Engineered Frameworks) */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              AI Tools Section
            </h2>
            <p className="text-white/60 text-sm mt-2">Engineered Frameworks / AI-Powered Lab</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">Show on Homepage</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={content.aiToolsEnabled}
                onChange={(e) => handleUpdate("aiToolsEnabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              Client Reviews Section
            </h2>
            <p className="text-white/60 text-sm mt-2">Show client testimonials and reviews</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">Show on Homepage</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={content.testimonialsEnabled}
                onChange={(e) => handleUpdate("testimonialsEnabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Pricing Buttons */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              Pricing Card Buttons
            </h2>
            <p className="text-white/60 text-sm mt-2">"Get Started" buttons on pricing cards</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">Show Buttons</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={content.pricingButtonsEnabled}
                onChange={(e) => handleUpdate("pricingButtonsEnabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3 text-red-500">
              <EyeOff className="w-6 h-6" />
              Maintenance Mode
            </h2>
            <p className="text-white/60 text-sm mt-2">Temporarily disable the website</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-white/80">Enable</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={content.maintenanceMode}
                onChange={(e) => handleUpdate("maintenanceMode", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
            </div>
          </label>
        </div>

        {content.maintenanceMode && (
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">Maintenance Message</label>
            <textarea
              rows={2}
              value={content.maintenanceMessage}
              onChange={(e) => handleUpdate("maintenanceMessage", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all"
            />
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <button
          onClick={handleSave}
          disabled={!!videoError}
          className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            saved
              ? "bg-green-500 text-white"
              : videoError
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark text-white"
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
              Save All Content
            </>
          )}
        </button>
      </div>
    </div>
  );
}
