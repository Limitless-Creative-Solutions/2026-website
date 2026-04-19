import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Get saved password from localStorage
    const savedPassword = localStorage.getItem("adminPassword");
    const correctPassword = savedPassword || "admin123"; // Default password

    setTimeout(() => {
      if (password === correctPassword) {
        // Save login session
        sessionStorage.setItem("adminLoggedIn", "true");
        onLogin();
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#05060B] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="glow-bg top-[-100px] right-[-100px]" />
      <div className="glow-bg bottom-[-50px] left-[-50px] opacity-70" style={{ width: '400px', height: '400px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
            <p className="text-white/60">Enter password to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className={`w-full px-4 py-4 pr-12 rounded-xl bg-white/5 border text-white placeholder:text-white/40 focus:outline-none transition-all ${
                    error ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-primary"
                  }`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                  <Lock size={14} />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password || isLoading}
              className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock size={20} />
                  Login to Admin
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-white/80">
              <strong className="text-primary">Default Password:</strong> admin123
            </p>
            <p className="text-xs text-white/60 mt-2">
              Change your password in Settings after logging in.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm mt-6">
          Limitless Creative Solutions © 2026
        </p>
      </motion.div>
    </div>
  );
}
