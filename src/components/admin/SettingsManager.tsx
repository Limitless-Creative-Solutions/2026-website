import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Check, Lock, Eye, EyeOff, Shield, LogOut, AlertCircle } from "lucide-react";

export default function SettingsManager() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    setError("");

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    // Check current password
    const savedPassword = localStorage.getItem("adminPassword") || "admin123";
    if (currentPassword !== savedPassword) {
      setError("Current password is incorrect");
      return;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    // Check password strength
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Save new password
    localStorage.setItem("adminPassword", newPassword);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    // Clear fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      sessionStorage.removeItem("adminLoggedIn");
      window.location.reload();
    }
  };

  const handleResetPassword = () => {
    if (confirm("Reset password to default (admin123)? You will need to login again.")) {
      localStorage.setItem("adminPassword", "admin123");
      sessionStorage.removeItem("adminLoggedIn");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              Admin Settings
            </h2>
            <p className="text-white/60">Manage your admin account and security</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Change Password
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">
              New Password
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-white/80">
              Confirm New Password
            </label>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-500">
              <AlertCircle size={20} />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <button
            onClick={handleChangePassword}
            disabled={!currentPassword || !newPassword || !confirmPassword}
            className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              saved
                ? "bg-green-500 text-white"
                : "bg-primary hover:bg-primary-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                Password Changed!
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Change Password
              </>
            )}
          </button>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6">Security Information</h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="font-bold text-white/80 mb-2">Current Password</p>
            <p className="text-sm text-white/60">
              {localStorage.getItem("adminPassword") ? "Custom password set" : "Using default password (admin123)"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="font-bold text-white/80 mb-2">Session Status</p>
            <p className="text-sm text-white/60">
              Logged in • Session expires when browser closes
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-black/40 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 text-red-500 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Danger Zone
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="font-bold text-white/80 mb-2">Reset Password</p>
            <p className="text-sm text-white/60 mb-4">
              Reset your password to the default (admin123). You will need to login again.
            </p>
            <button
              onClick={handleResetPassword}
              className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-500 font-bold text-sm transition-all"
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="font-bold mb-4 text-primary flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Password Guidelines
        </h3>
        
        <ul className="space-y-2 text-sm text-white/80">
          <li>• Use at least 6 characters</li>
          <li>• Mix uppercase and lowercase letters</li>
          <li>• Include numbers and special characters</li>
          <li>• Don't use common words or phrases</li>
          <li>• Change your password regularly</li>
          <li>• Don't share your password with anyone</li>
        </ul>
      </div>
    </div>
  );
}
