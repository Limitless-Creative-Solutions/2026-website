import { useState, useEffect } from "react";

export default function BackgroundVideo() {
  const [videoUrl, setVideoUrl] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    loadVideo();
    // Listen for content updates
    const handleUpdate = () => loadVideo();
    window.addEventListener("contentUpdated", handleUpdate);
    return () => window.removeEventListener("contentUpdated", handleUpdate);
  }, []);

  const loadVideo = () => {
    const savedContent = localStorage.getItem("siteContent");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setVideoUrl(parsed.backgroundVideoUrl || "");
        setEnabled(parsed.backgroundVideoEnabled || false);
      } catch (e) {
        console.error("Error loading video:", e);
      }
    }
  };

  if (!enabled || !videoUrl) return null;

  // Convert YouTube URL to embed if needed
  let embedUrl = videoUrl;
  if (videoUrl.includes('youtube.com/watch')) {
    const videoId = new URL(videoUrl).searchParams.get('v');
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`;
  } else if (videoUrl.includes('youtu.be/')) {
    const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0`;
  } else if (videoUrl.includes('vimeo.com/')) {
    const videoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1`;
  }

  const isDirectVideo = videoUrl.match(/\.(mp4|webm|ogg|mov)$/i);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {isDirectVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type={`video/${videoUrl.split('.').pop()}`} />
        </video>
      ) : (
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full object-cover scale-150"
          allow="autoplay; encrypted-media"
          style={{ border: 'none', pointerEvents: 'none' }}
          title="Background Video"
        />
      )}
    </div>
  );
}
