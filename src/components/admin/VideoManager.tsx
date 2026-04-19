import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Upload, Video, Link as LinkIcon, Check, X, Eye, AlertCircle } from "lucide-react";

export default function VideoManager() {
  const [videoUrl, setVideoUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    // Load existing video URL
    const savedUrl = localStorage.getItem("instructionVideoUrl");
    if (savedUrl) {
      setVideoUrl(savedUrl);
      setPreviewUrl(convertToEmbedUrl(savedUrl));
    }
  }, []);

  const convertToEmbedUrl = (url: string): string => {
    if (!url) return "";
    
    try {
      // YouTube
      if (url.includes("youtube.com/watch")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      
      // Vimeo
      if (url.includes("vimeo.com/")) {
        const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
      }
      
      // Direct video files or already embed URLs
      return url;
    } catch (e) {
      return url;
    }
  };

  const validateVideoUrl = (url: string): boolean => {
    if (!url) {
      setError("Please enter a video URL");
      return false;
    }

    // Check if it's a valid URL
    try {
      new URL(url);
    } catch {
      setError("Invalid URL format");
      return false;
    }

    // Check if it's a supported video source
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    const isVimeo = url.includes("vimeo.com");
    const isDirectVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);
    
    if (!isYouTube && !isVimeo && !isDirectVideo) {
      setError("Please use YouTube, Vimeo, or direct video file URL (.mp4, .webm, .ogg)");
      return false;
    }

    setError("");
    return true;
  };

  const handleUrlChange = (url: string) => {
    setVideoUrl(url);
    if (url) {
      const embedUrl = convertToEmbedUrl(url);
      setPreviewUrl(embedUrl);
    } else {
      setPreviewUrl("");
    }
  };

  const handleSave = () => {
    if (!validateVideoUrl(videoUrl)) {
      return;
    }

    // Save to localStorage
    localStorage.setItem("instructionVideoUrl", previewUrl || videoUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Trigger update event
    window.dispatchEvent(new Event("videoUpdated"));
    
    console.log("✅ Video URL saved:", previewUrl || videoUrl);
  };

  const handleClear = () => {
    setVideoUrl("");
    setPreviewUrl("");
    setError("");
    localStorage.removeItem("instructionVideoUrl");
    window.dispatchEvent(new Event("videoUpdated"));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Video className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Instruction Video</h2>
            <p className="text-white/60 text-sm">"Watch Our Quick Guide" section</p>
          </div>
        </div>
      </div>

      {/* Video URL Input */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-primary" />
          Video URL
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">
              Enter Video URL
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
              className={`w-full px-6 py-4 rounded-2xl bg-white/5 border text-white placeholder:text-white/40 focus:outline-none transition-all ${
                error ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-primary"
              }`}
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          {/* Supported Formats */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-bold text-white/60 mb-2">Supported Formats:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                YouTube
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                Vimeo
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                Direct Video (.mp4, .webm, .ogg)
              </span>
            </div>
          </div>

          {/* Example URLs */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs font-bold text-primary mb-2">Example URLs:</p>
            <ul className="space-y-1 text-xs text-white/80">
              <li>• YouTube: https://www.youtube.com/watch?v=dQw4w9WgXcQ</li>
              <li>• YouTube Short: https://youtu.be/dQw4w9WgXcQ</li>
              <li>• Vimeo: https://vimeo.com/123456789</li>
              <li>• Direct: https://example.com/video.mp4</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview */}
      {previewUrl && !error && (
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Preview
          </h3>
          
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
            <iframe
              src={previewUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video Preview"
            />
          </div>
          
          <p className="mt-4 text-sm text-white/60 text-center">
            This is how your video will appear on the home page
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={!videoUrl || !!error}
            className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              saved
                ? "bg-green-500 text-white"
                : "bg-primary hover:bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved! Video Updated.
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Save Video URL
              </>
            )}
          </button>

          {videoUrl && (
            <button
              onClick={handleClear}
              className="px-6 py-4 rounded-2xl font-bold bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="font-bold mb-4 text-primary flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          How to Get Video URLs
        </h3>
        
        <div className="space-y-4 text-sm text-white/80">
          <div>
            <p className="font-bold text-white mb-2">YouTube:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Go to your video on YouTube</li>
              <li>Click the "Share" button</li>
              <li>Copy the URL (e.g., https://youtu.be/...)</li>
              <li>Paste it here</li>
            </ol>
          </div>

          <div>
            <p className="font-bold text-white mb-2">Vimeo:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Go to your video on Vimeo</li>
              <li>Copy the URL from browser address bar</li>
              <li>Paste it here</li>
            </ol>
          </div>

          <div>
            <p className="font-bold text-white mb-2">Direct Video File:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Upload your video to a hosting service (Google Drive, Dropbox, etc.)</li>
              <li>Get the direct link to the video file</li>
              <li>Make sure it ends with .mp4, .webm, or .ogg</li>
              <li>Paste it here</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
