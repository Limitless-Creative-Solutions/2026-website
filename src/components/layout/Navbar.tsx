import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, MessageSquare, Phone, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/lib/AuthContext";

interface MenuItem {
  id: string;
  name: string;
  href: string;
  enabled: boolean;
  order: number;
}

interface NavbarSettings {
  menuItems: MenuItem[];
  showClientPortal: boolean;
  clientPortalText: string;
  showContactButton: boolean;
  contactButtonText: string;
  contactButtonLink: string;
  showWhatsAppInNav: boolean;
  whatsappText: string;
  showPhoneInNav: boolean;
  phoneText: string;
  logoSize: number;
  navBackgroundColor: string;
  navTextColor: string;
  navActiveColor: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
}

const defaultSettings: NavbarSettings = {
  menuItems: [
    { id: "services", name: "Services", href: "/services", enabled: true, order: 1 },
    { id: "marketplace", name: "Marketplace", href: "/marketplace", enabled: true, order: 2 },
    { id: "portfolio", name: "Portfolio", href: "/portfolio", enabled: true, order: 3 },
    { id: "portal", name: "Portal", href: "/portal", enabled: true, order: 4 },
  ],
  showClientPortal: true,
  clientPortalText: "Client Portal",
  showContactButton: true,
  contactButtonText: "Start Project",
  contactButtonLink: "/contact",
  showWhatsAppInNav: false,
  whatsappText: "Chat on WhatsApp",
  showPhoneInNav: false,
  phoneText: "Call Us",
  logoSize: 40,
  navBackgroundColor: "#05060B",
  navTextColor: "#FFFFFF",
  navActiveColor: "#3B82F6",
  buttonBackgroundColor: "#3B82F6",
  buttonTextColor: "#FFFFFF",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<NavbarSettings>(defaultSettings);
  const [contactInfo, setContactInfo] = useState({ phone: "+94771234567", whatsapp: "94771234567" });
  const location = useLocation();
  const { user, signIn, logout } = useAuth();

  useEffect(() => {
    loadSettings();
    loadContactInfo();
    
    const handleUpdate = () => {
      loadSettings();
      loadContactInfo();
    };
    
    window.addEventListener("navbarUpdated", handleUpdate);
    window.addEventListener("contactInfoUpdated", handleUpdate);
    
    return () => {
      window.removeEventListener("navbarUpdated", handleUpdate);
      window.removeEventListener("contactInfoUpdated", handleUpdate);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem("navbarSettings");
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading navbar settings:", e);
    }
  };

  const loadContactInfo = () => {
    try {
      const saved = localStorage.getItem("contactInfo");
      if (saved) {
        const info = JSON.parse(saved);
        setContactInfo({
          phone: info.phone || "+94771234567",
          whatsapp: info.whatsapp || "94771234567"
        });
      }
    } catch (e) {
      console.error("Error loading contact info:", e);
    }
  };

  const enabledMenuItems = settings.menuItems
    .filter(item => item.enabled)
    .sort((a, b) => a.order - b.order);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi Limitless team, I'd like to start a new project.");
    const url = `https://wa.me/${contactInfo.whatsapp}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[5000] transition-all duration-300 h-[70px] flex items-center border-b border-white/10",
        isScrolled ? "backdrop-blur-xl" : "backdrop-blur-md"
      )}
      style={{
        backgroundColor: isScrolled 
          ? `${settings.navBackgroundColor}E6` 
          : `${settings.navBackgroundColor}CC`
      }}
    >
      <div className="container mx-auto px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo-white.svg" 
            alt="Limitless Creative Solutions" 
            className="transition-transform group-hover:scale-110"
            style={{ height: `${settings.logoSize}px`, width: `${settings.logoSize}px` }}
          />
          <div 
            className="font-display font-black text-xl tracking-tighter"
            style={{ color: settings.navTextColor }}
          >
            LIMITLESS<span style={{ color: settings.navActiveColor }}>.</span>LCC
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {enabledMenuItems.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.1em] transition-colors hover:opacity-100"
              style={{
                color: location.pathname === link.href 
                  ? settings.navActiveColor 
                  : `${settings.navTextColor}66`,
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Phone */}
          {settings.showPhoneInNav && (
            <button
              onClick={handlePhoneClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
              style={{ color: `${settings.navTextColor}99` }}
            >
              <Phone size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {settings.phoneText}
              </span>
            </button>
          )}

          {/* WhatsApp */}
          {settings.showWhatsAppInNav && (
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
              style={{ color: `${settings.navTextColor}99` }}
            >
              <MessageSquare size={16} className="text-green-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {settings.whatsappText}
              </span>
            </button>
          )}

          {/* Client Portal */}
          {settings.showClientPortal && (
            <>
              {user ? (
                <div className="flex items-center gap-4 border-r border-white/10 pr-4">
                  <Link to="/portal" className="flex items-center gap-2 group">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt="User" 
                        className="w-8 h-8 rounded-full border border-primary/20" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${settings.navActiveColor}33`,
                          color: settings.navActiveColor 
                        }}
                      >
                        <UserIcon size={14} />
                      </div>
                    )}
                    <span 
                      className="text-[10px] font-bold group-hover:opacity-100 transition-all uppercase tracking-widest"
                      style={{ color: `${settings.navTextColor}66` }}
                    >
                      Portal
                    </span>
                  </Link>
                  <button 
                    onClick={logout} 
                    className="transition-all hover:text-red-500"
                    style={{ color: `${settings.navTextColor}4D` }}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={signIn}
                  className="text-[11px] uppercase tracking-widest font-bold transition-all pr-4 border-r border-white/10"
                  style={{ 
                    color: `${settings.navTextColor}66`,
                  }}
                >
                  {settings.clientPortalText}
                </button>
              )}
            </>
          )}
          
          {/* Contact Button */}
          {settings.showContactButton && (
            <Link
              to={settings.contactButtonLink}
              className="px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: settings.buttonBackgroundColor,
                color: settings.buttonTextColor,
                boxShadow: `0 0 20px ${settings.buttonBackgroundColor}4D`
              }}
            >
              {settings.contactButtonText}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: settings.navTextColor }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 mt-2 px-6"
          >
            <div 
              className="backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex flex-col gap-6"
              style={{ backgroundColor: `${settings.navBackgroundColor}F2` }}
            >
              {enabledMenuItems.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  className="text-2xl font-display font-bold"
                  style={{
                    color: location.pathname === link.href 
                      ? settings.navActiveColor 
                      : settings.navTextColor
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <div className="flex flex-col gap-4">
                {settings.showContactButton && (
                  <Link
                    to={settings.contactButtonLink}
                    className="w-full py-4 rounded-2xl text-center font-bold"
                    style={{
                      backgroundColor: settings.buttonBackgroundColor,
                      color: settings.buttonTextColor
                    }}
                  >
                    {settings.contactButtonText}
                  </Link>
                )}
                {settings.showWhatsAppInNav && (
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-white/5 py-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2"
                    style={{ color: settings.navTextColor }}
                  >
                    <MessageSquare size={20} className="text-green-500" />
                    {settings.whatsappText}
                  </button>
                )}
                {settings.showPhoneInNav && (
                  <button
                    onClick={handlePhoneClick}
                    className="w-full bg-white/5 py-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2"
                    style={{ color: settings.navTextColor }}
                  >
                    <Phone size={20} style={{ color: settings.navActiveColor }} />
                    {settings.phoneText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
