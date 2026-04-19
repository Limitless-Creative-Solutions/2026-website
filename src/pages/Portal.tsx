import { useState } from "react";
import { motion } from "motion/react";
import { LayoutDashboard, FolderKanban, FileText, MessageCircle, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/src/lib/AuthContext";
import { Navigate } from "react-router-dom";

export default function Portal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, userProfile, logout, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-[#020202] pt-24">
      <div className="container mx-auto px-6 h-[calc(100vh-120px)] flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 glass rounded-[32px] p-8 hidden lg:flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">L</div>
            <span className="font-display font-bold">PORTAL</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "projects", label: "Projects", icon: FolderKanban },
              { id: "invoices", label: "Invoices", icon: FileText },
              { id: "messages", label: "Live Chat", icon: MessageCircle },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all ${
                  activeTab === item.id ? "bg-primary text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-white/10">
            <button 
              onClick={logout}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-medium w-full"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 glass rounded-[32px] p-10 overflow-hidden flex flex-col">
          <header className="mb-10 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-display font-bold uppercase">TRAJECTORY: {user.displayName?.split(' ')[0]}</h2>
              <p className="text-white/40">Secure connection established from Node: {userProfile?.role || 'CLIENT'}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-bold text-gradient">Status: Verified</div>
                <div className="text-xs text-white/30">{user.email}</div>
              </div>
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full border border-primary/40 p-1" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
                  {user.displayName?.charAt(0)}
                </div>
              )}
            </div>
          </header>


          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2">
            <div className="glass-card p-8 border-primary/20 bg-primary/5">
              <h3 className="font-display font-bold text-xl mb-4">Active Project</h3>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-display font-bold mb-1">E-Commerce Sync</div>
                  <div className="text-white/40 text-sm">Phase: Engineering / QA</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-bold text-primary">85%</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Progress</div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="font-display font-bold text-xl mb-4">Timeline Update</h3>
              <div className="space-y-4">
                {[
                  { time: "2h ago", text: "API Integration completed", status: "DONE" },
                  { time: "Yesterday", text: "Mobile checkout testing", status: "DONE" },
                  { time: "Monday", text: "Stripe connection module", status: "PENDING" },
                ].map((update, i) => (
                   <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                     <span className="text-white/60">{update.text}</span>
                     <span className={`text-[10px] font-bold px-2 py-1 rounded ${update.status === 'DONE' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                       {update.status}
                     </span>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
