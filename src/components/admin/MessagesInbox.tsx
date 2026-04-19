import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Trash2, Eye, EyeOff, Clock, User, Phone, MessageSquare, Bell } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export default function MessagesInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadMessages();
    // Listen for new messages
    const handleNewMessage = () => loadMessages();
    window.addEventListener("newContactMessage", handleNewMessage);
    return () => window.removeEventListener("newContactMessage", handleNewMessage);
  }, []);

  useEffect(() => {
    setUnreadCount(messages.filter(m => !m.read).length);
  }, [messages]);

  const loadMessages = () => {
    const savedMessages = localStorage.getItem("contactMessages");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.sort((a: Message, b: Message) => b.timestamp - a.timestamp));
      } catch (e) {
        console.error("Error loading messages:", e);
      }
    }
  };

  const markAsRead = (id: string) => {
    const updated = messages.map(m => 
      m.id === id ? { ...m, read: true } : m
    );
    setMessages(updated);
    localStorage.setItem("contactMessages", JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    if (confirm("Delete this message?")) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem("contactMessages", JSON.stringify(updated));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Mail className="w-8 h-8 text-primary" />
              Messages Inbox
              {unreadCount > 0 && (
                <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold flex items-center gap-1">
                  <Bell className="w-4 h-4" />
                  {unreadCount} New
                </span>
              )}
            </h2>
            <p className="text-white/60">Contact form submissions</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{messages.length}</div>
            <div className="text-sm text-white/60">Total Messages</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {messages.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-white/40" />
              <p className="text-white/60">No messages yet</p>
              <p className="text-sm text-white/40 mt-2">Messages from contact form will appear here</p>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) markAsRead(message.id);
                }}
                className={`bg-black/40 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all hover:border-primary/50 ${
                  selectedMessage?.id === message.id ? "border-primary/50 bg-primary/5" : "border-white/10"
                } ${!message.read ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{message.name}</div>
                      <div className="text-xs text-white/60">{message.email}</div>
                    </div>
                  </div>
                  {!message.read && (
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  )}
                </div>
                <p className="text-sm text-white/70 line-clamp-2 mb-2">{message.message}</p>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  {formatDate(message.timestamp)}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedMessage.name}</h3>
                    <p className="text-white/60">{formatDate(selectedMessage.timestamp)}</p>
                  </div>
                </div>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-3 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-white/60">Email</div>
                    <a href={`mailto:${selectedMessage.email}`} className="text-white hover:text-primary transition-all">
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                {selectedMessage.phone && (
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs text-white/60">Phone</div>
                      <a href={`tel:${selectedMessage.phone}`} className="text-white hover:text-primary transition-all">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h4 className="font-bold">Message</h4>
                </div>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="flex gap-4 mt-6">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your message&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                  className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-center transition-all"
                >
                  Reply via Email
                </a>
                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-center transition-all"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-white/40" />
                <p className="text-white/60">Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
