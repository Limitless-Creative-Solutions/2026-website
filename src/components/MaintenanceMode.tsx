import { useState, useEffect } from "react";
import { Wrench, Clock } from "lucide-react";

export default function MaintenanceMode({ children }: { children: React.ReactNode }) {
  const [maintenance, setMaintenance] = useState(false);
  const [message, setMessage] = useState("We're currently performing maintenance. We'll be back soon!");

  useEffect(() => {
    checkMaintenance();
    const handleUpdate = () => checkMaintenance();
    window.addEventListener("contentUpdated", handleUpdate);
    return () => window.removeEventListener("contentUpdated", handleUpdate);
  }, []);

  const checkMaintenance = () => {
    const savedContent = localStorage.getItem("siteContent");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setMaintenance(parsed.maintenanceMode || false);
        setMessage(parsed.maintenanceMessage || message);
      } catch (e) {
        console.error("Error checking maintenance:", e);
      }
    }
  };

  if (!maintenance) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#05060B] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border border-primary/40 mb-8 animate-pulse">
          <Wrench className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
          Under <span className="text-primary">Maintenance</span>
        </h1>
        
        <p className="text-xl text-white/60 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="flex items-center justify-center gap-3 text-white/40">
          <Clock className="w-5 h-5" />
          <span className="text-sm">We'll be back shortly</span>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-sm text-white/60">
            Need urgent assistance? Contact us at{" "}
            <a href="mailto:hello@limitless.lk" className="text-primary hover:underline">
              hello@limitless.lk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
