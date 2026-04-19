import { motion } from "motion/react";
import { Play, Video } from "lucide-react";
import { useState, useEffect } from "react";

export default function InstructionVideo() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadVideo();
    const handleUpdate = () => {
      loadVideo();
      setIsPlaying(false); // Reset playing state when video changes
    };
    window.addEventListener("videoUpdated", handleUpdate);
    return () => window.removeEventListener("videoUpdated", handleUpdate);
  }, []);

  const loadVideo = () => {
    try {
      const savedUrl = localStorage.getItem("instructionVideoUrl");
      if (savedUrl) {
        setVideoUrl(savedUrl);
        console.log("✅ Loaded video URL:", savedUrl);
      } else {
        // Default video if none is set
        setVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ");
      }
    } catch (e) {
      console.error("Error loading video:", e);
      setVideoUrl("https://www.youtube.com/embed/dQw4w9WgXcQ");
    }
  };

  // Don't render if no video URL
  if (!videoUrl) {
    return null;
  }

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-[#05060B] to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Video className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              How It Works
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-black mb-6">
            Watch Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Quick Guide
            </span>
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Learn how to get started with Limitless Creative Solutions in just a few minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
            {/* Video Container */}
            <div className="relative aspect-video">
              {!isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] transition-all"
                  >
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </motion.button>
                  
                  {/* Thumbnail Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Preview Text */}
                  <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                    <p className="text-white font-bold text-xl mb-2">Getting Started Guide</p>
                    <p className="text-white/60 text-sm">Click to watch the full tutorial</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Instruction Video"
                />
              )}
            </div>

            {/* Video Info */}
            <div className="p-8 border-t border-white/10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Getting Started Guide</h3>
                  <p className="text-white/60 text-sm">
                    Everything you need to know to start your project with us
                  </p>
                </div>
                
                {!isPlaying && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" fill="white" />
                    Watch Now
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "🎯", title: "Step 1", desc: "Choose Your Service" },
              { icon: "💬", title: "Step 2", desc: "Discuss Your Vision" },
              { icon: "🚀", title: "Step 3", desc: "Launch & Grow" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
