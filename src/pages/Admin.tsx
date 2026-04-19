import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Video, Settings, FileText, Image as ImageIcon, Users, BarChart3, Home, LogOut, Briefcase,
  DollarSign, FolderKanban, Mail, Phone, Bell, Sparkles, Menu as MenuIcon, Palette
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminLogin from "@/src/components/admin/AdminLogin";
import VideoManager from "@/src/components/admin/VideoManager";
import ServicesManager from "@/src/components/admin/ServicesManager";
import PricingManager from "@/src/components/admin/PricingManager";
import PortfolioManager from "@/src/components/admin/PortfolioManager";
import ContactInfoManager from "@/src/components/admin/ContactInfoManager";
import MessagesInbox from "@/src/components/admin/MessagesInbox";
import ContentManager from "@/src/components/admin/ContentManager";
import OfferBannerManager from "@/src/components/admin/OfferBannerManager";
import NavbarManager from "@/src/components/admin/NavbarManager";
import ThemeManager from "@/src/components/admin/ThemeManager";
import SettingsManager from "@/src/components/admin/SettingsManager";
import ReviewsManager from "@/src/components/admin/ReviewsManager";

import AnalyticsDashboard from "@/src/components/admin/AnalyticsDashboard";

type TabType = "dashboard" | "analytics" | "content" | "services" | "pricing" | "portfolio" | "video" | "messages" | "contact" | "offer" | "navbar" | "theme" | "reviews" | "settings";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  useEffect(() => {
    // Check for unread messages
    const checkMessages = () => {
      const messages = localStorage.getItem("contactMessages");
      if (messages) {
        try {
          const parsed = JSON.parse(messages);
          setUnreadMessages(parsed.filter((m: any) => !m.read).length);
        } catch (e) {}
      }
    };
    checkMessages();
    window.addEventListener("newContactMessage", checkMessages);
    return () => window.removeEventListener("newContactMessage", checkMessages);
  }, []);

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: Home },
    { id: "analytics" as TabType, label: "Analytics", icon: BarChart3 },
    { id: "content" as TabType, label: "Content & Sections", icon: FileText },
    { id: "navbar" as TabType, label: "Navigation Menu", icon: MenuIcon },
    { id: "theme" as TabType, label: "Theme & Styles", icon: Palette },
    { id: "offer" as TabType, label: "Offer Banner", icon: Sparkles },
    { id: "services" as TabType, label: "Services", icon: Briefcase },
    { id: "pricing" as TabType, label: "Pricing", icon: DollarSign },
    { id: "portfolio" as TabType, label: "Portfolio", icon: FolderKanban },
    { id: "reviews" as TabType, label: "Client Reviews", icon: Users },
    { id: "video" as TabType, label: "Video", icon: Video },
    { id: "messages" as TabType, label: "Messages", icon: Mail, badge: unreadMessages },
    { id: "contact" as TabType, label: "Contact Info", icon: Phone },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#05060B] pt-24">
      <div className="container mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-black mb-2">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-white/60">Manage your website content and settings</p>
          </div>
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Site
          </Link>
        </div>

        <div className="flex gap-6">
          <aside className="w-64 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-fit sticky top-24">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </div>
                  {tab.badge && tab.badge > 0 && (
                    <span className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                to="/"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-medium"
              >
                <LogOut className="w-5 h-5" />
                Exit Admin
              </Link>
            </div>
          </aside>

          <main className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && <DashboardTab unreadMessages={unreadMessages} setActiveTab={setActiveTab} />}
              {activeTab === "analytics" && <AnalyticsDashboard />}
              {activeTab === "content" && <ContentManager />}
              {activeTab === "navbar" && <NavbarManager />}
              {activeTab === "theme" && <ThemeManager />}
              {activeTab === "offer" && <OfferBannerManager />}
              {activeTab === "services" && <ServicesManager />}
              {activeTab === "pricing" && <PricingManager />}
              {activeTab === "portfolio" && <PortfolioManager />}
              {activeTab === "reviews" && <ReviewsManager />}
              {activeTab === "video" && <VideoManager />}
              {activeTab === "messages" && <MessagesInbox />}
              {activeTab === "contact" && <ContactInfoManager />}
              {activeTab === "settings" && <SettingsManager />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardTab({ unreadMessages, setActiveTab }: { unreadMessages: number; setActiveTab: (tab: TabType) => void }) {
  const [stats, setStats] = useState({
    services: 0,
    pricing: 0,
    portfolio: 0,
    messages: 0,
    reviews: 0,
    visitors: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadRecentActivity();
  }, []);

  const loadStats = () => {
    const services = localStorage.getItem("servicesData");
    const pricing = localStorage.getItem("pricingPlans");
    const portfolio = localStorage.getItem("portfolioProjects");
    const messages = localStorage.getItem("contactMessages");
    const reviews = localStorage.getItem("clientReviews");
    const visitors = localStorage.getItem("visitorHistory");

    setStats({
      services: services ? JSON.parse(services).length : 6,
      pricing: pricing ? JSON.parse(pricing).length : 3,
      portfolio: portfolio ? JSON.parse(portfolio).length : 3,
      messages: messages ? JSON.parse(messages).length : 0,
      reviews: reviews ? JSON.parse(reviews).length : 3,
      visitors: visitors ? JSON.parse(visitors).length : 0
    });
  };

  const loadRecentActivity = () => {
    // Get recent activity from localStorage
    const activity = [];
    
    const messages = localStorage.getItem("contactMessages");
    if (messages) {
      const parsed = JSON.parse(messages);
      const recent = parsed.slice(-3).reverse();
      recent.forEach((msg: any) => {
        activity.push({
          type: "message",
          title: "New message received",
          description: `From ${msg.name}`,
          time: msg.timestamp,
          icon: Mail,
          color: "text-blue-500"
        });
      });
    }

    setRecentActivity(activity.slice(0, 5));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const quickStats = [
    { 
      label: "Total Services", 
      value: stats.services, 
      color: "from-blue-500 to-cyan-500", 
      icon: Briefcase,
      change: "+2 this month",
      trend: "up"
    },
    { 
      label: "Pricing Plans", 
      value: stats.pricing, 
      color: "from-green-500 to-emerald-500", 
      icon: DollarSign,
      change: "Active",
      trend: "neutral"
    },
    { 
      label: "Portfolio Items", 
      value: stats.portfolio, 
      color: "from-purple-500 to-pink-500", 
      icon: FolderKanban,
      change: "+1 this week",
      trend: "up"
    },
    { 
      label: "Messages", 
      value: stats.messages, 
      color: "from-orange-500 to-red-500", 
      icon: Mail, 
      badge: unreadMessages,
      change: `${unreadMessages} unread`,
      trend: unreadMessages > 0 ? "alert" : "neutral"
    },
    { 
      label: "Client Reviews", 
      value: stats.reviews, 
      color: "from-yellow-500 to-orange-500", 
      icon: Users,
      change: "5.0 avg rating",
      trend: "up"
    },
    { 
      label: "Total Visitors", 
      value: stats.visitors, 
      color: "from-indigo-500 to-purple-500", 
      icon: BarChart3,
      change: "All time",
      trend: "neutral"
    },
  ];

  const quickActions = [
    { 
      icon: Briefcase, 
      title: "Manage Services", 
      description: "Add or edit service cards", 
      color: "blue",
      tab: "services" as TabType
    },
    { 
      icon: DollarSign, 
      title: "Update Pricing", 
      description: "Configure pricing plans", 
      color: "green",
      tab: "pricing" as TabType
    },
    { 
      icon: FolderKanban, 
      title: "Portfolio", 
      description: "Showcase your projects", 
      color: "purple",
      tab: "portfolio" as TabType
    },
    { 
      icon: Users, 
      title: "Client Reviews", 
      description: "Manage testimonials", 
      color: "yellow",
      tab: "reviews" as TabType
    },
    { 
      icon: Video, 
      title: "Upload Video", 
      description: "Add instruction video", 
      color: "red",
      tab: "video" as TabType
    },
    { 
      icon: Palette, 
      title: "Theme Settings", 
      description: "Customize appearance", 
      color: "pink",
      tab: "theme" as TabType
    },
    { 
      icon: MenuIcon, 
      title: "Navigation", 
      description: "Edit menu items", 
      color: "indigo",
      tab: "navbar" as TabType
    },
    { 
      icon: BarChart3, 
      title: "Analytics", 
      description: "View visitor stats", 
      color: "cyan",
      tab: "analytics" as TabType
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            {getGreeting()}, Admin! 👋
          </h2>
          <p className="text-white/90 text-lg">
            Welcome back to your dashboard. Here's what's happening today.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden hover:border-white/20 transition-all cursor-pointer"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            
            {/* Badge */}
            {stat.badge && stat.badge > 0 && (
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                  <span className="text-xs font-bold">{stat.badge}</span>
                </div>
              </div>
            )}

            <div className="relative z-10">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>

              {/* Value */}
              <div className="text-4xl font-black mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-white/60 text-sm font-medium mb-3">{stat.label}</div>

              {/* Change Indicator */}
              <div className={`text-xs font-bold flex items-center gap-1 ${
                stat.trend === "up" ? "text-green-400" : 
                stat.trend === "alert" ? "text-orange-400" : 
                "text-white/40"
              }`}>
                {stat.trend === "up" && "↗"}
                {stat.trend === "alert" && "⚠"}
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <div className="text-sm text-white/60">Click to navigate</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveTab(action.tab)}
              className={`p-6 rounded-2xl border-2 transition-all text-left group hover:scale-105 ${
                action.color === "blue" ? "border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10" :
                action.color === "green" ? "border-green-500/20 hover:border-green-500/50 hover:bg-green-500/10" :
                action.color === "purple" ? "border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/10" :
                action.color === "yellow" ? "border-yellow-500/20 hover:border-yellow-500/50 hover:bg-yellow-500/10" :
                action.color === "red" ? "border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10" :
                action.color === "pink" ? "border-pink-500/20 hover:border-pink-500/50 hover:bg-pink-500/10" :
                action.color === "indigo" ? "border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-500/10" :
                "border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/10"
              }`}
            >
              <action.icon className={`w-8 h-8 mb-3 group-hover:scale-110 transition-transform ${
                action.color === "blue" ? "text-blue-500" :
                action.color === "green" ? "text-green-500" :
                action.color === "purple" ? "text-purple-500" :
                action.color === "yellow" ? "text-yellow-500" :
                action.color === "red" ? "text-red-500" :
                action.color === "pink" ? "text-pink-500" :
                action.color === "indigo" ? "text-indigo-500" :
                "text-cyan-500"
              }`} />
              <div className="font-bold mb-1">{action.title}</div>
              <div className="text-sm text-white/60">{action.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity & Getting Started */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Recent Activity
          </h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{activity.title}</div>
                    <div className="text-xs text-white/60 truncate">{activity.description}</div>
                    <div className="text-xs text-white/40 mt-1">
                      {new Date(activity.time).toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/40">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No recent activity</p>
            </div>
          )}
        </div>

        {/* Getting Started */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="space-y-3">
            {[
              { step: 1, title: "Update Services", desc: "Add your services and links", tab: "services" as TabType },
              { step: 2, title: "Set Pricing", desc: "Configure pricing plans", tab: "pricing" as TabType },
              { step: 3, title: "Add Portfolio", desc: "Showcase your projects", tab: "portfolio" as TabType },
              { step: 4, title: "Upload Video", desc: "Add instruction video", tab: "video" as TabType },
              { step: 5, title: "Update Contact", desc: "Set contact information", tab: "contact" as TabType },
            ].map((item) => (
              <motion.button
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.step * 0.1 }}
                onClick={() => setActiveTab(item.tab)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="font-bold">{item.title}</div>
                  <div className="text-sm text-white/60">{item.desc}</div>
                </div>
                <div className="text-white/40 group-hover:text-white transition-colors">→</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-white/80">Site Title</label>
          <input
            type="text"
            defaultValue="Limitless Creative Solutions"
            className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
          <div>
            <div className="font-bold mb-1">Maintenance Mode</div>
            <div className="text-sm text-white/60">Temporarily disable the site</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <button className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all">
          Save Settings
        </button>
      </div>
    </div>
  );
}
