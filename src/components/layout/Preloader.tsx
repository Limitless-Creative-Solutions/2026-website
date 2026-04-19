import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      id="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="loader-content">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="loader-logo text-gradient"
        >
          LIMITLESS CREATIVE SOLUTIONS
        </motion.div>
        <div className="flex flex-col items-center">
          <div className="loader-bar">
            <motion.div 
              className="loader-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 font-display text-[10px] uppercase tracking-[0.2em] text-white/40">
            Initializing LCS... {progress}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
