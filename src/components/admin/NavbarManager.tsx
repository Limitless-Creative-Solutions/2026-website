import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Check, Plus, Trash2, Edit2, Eye, EyeOff, Menu, Palette, Phone, MessageSquare } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  href: string;
  enabled: boolean;
  order: number;
}

interface NavbarSettings {
  // Menu Items
  menuItems: MenuItem[];
  
  // Client Portal
  showClientPortal: boolean;
  clientPortalText: string;
  
  // Contact Button
  showContactButton: boolean;
  contactButtonText: string;
  contactButtonLink: string;
  
  // WhatsApp
  showWhatsAppInNav: boolean;
  whatsappText: string;
  
  // Phone Number
  showPhoneInNav: boolean;
  phoneText: string;
  
  // Styles
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

export default function NavbarManager() {
  const [settings, setSettings] = useState<NavbarSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem("navbarSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Error loading navbar settings:", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("navbarSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    
    // Trigger update event
    window.dispatchEvent(new Event("navbarUpdated"));
  };

  const handleUpdate = (field: keyof NavbarSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleMenuItemUpdate = (id: string, field: keyof MenuItem, value: any) => {
    const updated = settings.menuItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setSettings({ ...settings, menuItems: updated });
  };

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: `custom-${Date.now()}`,
      name: "New Menu Item",
      href: "/new-page",
      enabled: true,
      order: settings.menuItems.length + 1
    };
    setSettings({ ...settings, menuItems: [...settings.menuItems, newItem] });
    setEditingItem(newItem.id);
  };

  const handleDeleteMenuItem = (id: string) => {
    if (confirm("Delete this menu item?")) {
      setSettings({
        ...settings,
        menuItems: settings.menuItems.filter(item => item.id !== id)
      });
    }
  };

  const moveMenuItem = (id: string, direction: "up" | "down") => {
    const index = settings.menuItems.findIndex(item => item.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === settings.menuItems.length - 1)
    ) {
      return;
    }

    const newItems = [...settings.menuItems];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    
    // Update order
    newItems.forEach((item, i) => {
      item.order = i + 1;
    });

    setSettings({ ...settings, menuItems: newItems });
  };

  return (
    <div className="space-y-6">
      {/* Menu Items */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Menu className="w-6 h-6 text-primary" />
              Navigation Menu Items
            </h2>
            <p className="text-white/60">Manage menu links and order</p>
          </div>
          <button
            onClick={handleAddMenuItem}
            className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>

        <div className="space-y-4">
          {settings.menuItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              {editingItem === item.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 text-white/80">Menu Text</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleMenuItemUpdate(item.id, "name", e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2 text-white/80">Link URL</label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => handleMenuItemUpdate(item.id, "href", e.target.value)}
                        placeholder="/page-url"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleDeleteMenuItem(item.id)}
                      className="px-4 py-2 rounded-xl bg-red-500/20 text-red-500 font-bold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveMenuItem(item.id, "up")}
                        disabled={index === 0}
                        className="text-white/40 hover:text-white disabled:opacity-20 text-xs"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveMenuItem(item.id, "down")}
                        disabled={index === settings.menuItems.length - 1}
                        className="text-white/40 hover:text-white disabled:opacity-20 text-xs"
                      >
                        ▼
                      </button>
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-xs text-white/40">{item.href}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-xs text-white/60">
                        {item.enabled ? "Visible" : "Hidden"}
                      </span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={item.enabled}
                          onChange={(e) => handleMenuItemUpdate(item.id, "enabled", e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </label>
                    <button
                      onClick={() => setEditingItem(item.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Client Portal & Buttons */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6">Action Buttons</h3>
        
        <div className="space-y-6">
          {/* Client Portal */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-white/80">Client Portal Button</p>
                <p className="text-xs text-white/40">Login button for clients</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.showClientPortal}
                    onChange={(e) => handleUpdate("showClientPortal", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
            </div>
            {settings.showClientPortal && (
              <input
                type="text"
                value={settings.clientPortalText}
                onChange={(e) => handleUpdate("clientPortalText", e.target.value)}
                placeholder="Client Portal"
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
              />
            )}
          </div>

          {/* Contact Button */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-white/80">Contact Button</p>
                <p className="text-xs text-white/40">Main CTA button</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.showContactButton}
                    onChange={(e) => handleUpdate("showContactButton", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
            </div>
            {settings.showContactButton && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={settings.contactButtonText}
                  onChange={(e) => handleUpdate("contactButtonText", e.target.value)}
                  placeholder="Start Project"
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  value={settings.contactButtonLink}
                  onChange={(e) => handleUpdate("contactButtonLink", e.target.value)}
                  placeholder="/contact"
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-white/80 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                  WhatsApp Button
                </p>
                <p className="text-xs text-white/40">Show WhatsApp in navbar</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.showWhatsAppInNav}
                    onChange={(e) => handleUpdate("showWhatsAppInNav", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
            </div>
            {settings.showWhatsAppInNav && (
              <input
                type="text"
                value={settings.whatsappText}
                onChange={(e) => handleUpdate("whatsappText", e.target.value)}
                placeholder="Chat on WhatsApp"
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
              />
            )}
          </div>

          {/* Phone */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-white/80 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Button
                </p>
                <p className="text-xs text-white/40">Show phone number in navbar</p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.showPhoneInNav}
                    onChange={(e) => handleUpdate("showPhoneInNav", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                </div>
              </label>
            </div>
            {settings.showPhoneInNav && (
              <input
                type="text"
                value={settings.phoneText}
                onChange={(e) => handleUpdate("phoneText", e.target.value)}
                placeholder="Call Us"
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary"
              />
            )}
          </div>
        </div>
      </div>

      {/* Styles */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Navbar Styles
        </h3>
        
        <div className="space-y-6">
          {/* Logo Size */}
          <div>
            <label className="block text-sm font-bold mb-3 text-white/80">
              Logo Size: {settings.logoSize}px
            </label>
            <input
              type="range"
              min="30"
              max="60"
              value={settings.logoSize}
              onChange={(e) => handleUpdate("logoSize", parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Background Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={settings.navBackgroundColor}
                  onChange={(e) => handleUpdate("navBackgroundColor", e.target.value)}
                  className="w-16 h-12 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.navBackgroundColor}
                  onChange={(e) => handleUpdate("navBackgroundColor", e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Text Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={settings.navTextColor}
                  onChange={(e) => handleUpdate("navTextColor", e.target.value)}
                  className="w-16 h-12 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.navTextColor}
                  onChange={(e) => handleUpdate("navTextColor", e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Active Link Color</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={settings.navActiveColor}
                  onChange={(e) => handleUpdate("navActiveColor", e.target.value)}
                  className="w-16 h-12 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.navActiveColor}
                  onChange={(e) => handleUpdate("navActiveColor", e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Button Background</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={settings.buttonBackgroundColor}
                  onChange={(e) => handleUpdate("buttonBackgroundColor", e.target.value)}
                  className="w-16 h-12 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.buttonBackgroundColor}
                  onChange={(e) => handleUpdate("buttonBackgroundColor", e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary transition-all font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            saved ? "bg-green-500 text-white" : "bg-primary hover:bg-primary-dark text-white"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved! Navbar updated.
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Navbar Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
