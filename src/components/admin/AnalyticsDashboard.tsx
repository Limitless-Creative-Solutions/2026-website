import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, Monitor, Smartphone, Tablet, Globe, Clock, 
  TrendingUp, Eye, RefreshCw, Download, BarChart3 
} from "lucide-react";
import { getAnalyticsSummary, getVisitorHistory, type VisitorData } from "@/src/lib/analytics";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    setLoading(true);
    const summary = getAnalyticsSummary();
    const history = getVisitorHistory();
    setAnalytics(summary);
    setVisitors(history);
    setLoading(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const exportData = () => {
    const dataStr = JSON.stringify(visitors, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics_${Date.now()}.json`;
    link.click();
  };

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              Visitor Analytics
            </h2>
            <p className="text-white/60">Track and analyze your website visitors</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadAnalytics}
              className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
            <button
              onClick={exportData}
              className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-3xl font-bold mb-2">{analytics.today}</h3>
          <p className="text-white/60 text-sm">Visitors Today</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2">{analytics.week}</h3>
          <p className="text-white/60 text-sm">This Week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2">{analytics.month}</h3>
          <p className="text-white/60 text-sm">This Month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2">{analytics.total}</h3>
          <p className="text-white/60 text-sm">Total Visitors</p>
        </motion.div>
      </div>

      {/* Device & Browser Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Devices */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            Devices
          </h3>
          <div className="space-y-4">
            {Object.entries(analytics.devices).map(([device, count]: [string, any]) => (
              <div key={device} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {device === "Desktop" && <Monitor size={20} className="text-white/60" />}
                  {device === "Mobile" && <Smartphone size={20} className="text-white/60" />}
                  {device === "Tablet" && <Tablet size={20} className="text-white/60" />}
                  <span className="text-white/80">{device}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(count / analytics.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/60 text-sm font-bold w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browsers */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Browsers
          </h3>
          <div className="space-y-4">
            {Object.entries(analytics.browsers).slice(0, 5).map(([browser, count]: [string, any]) => (
              <div key={browser} className="flex items-center justify-between">
                <span className="text-white/80">{browser}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(count / analytics.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/60 text-sm font-bold w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Systems */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6">Operating Systems</h3>
          <div className="space-y-4">
            {Object.entries(analytics.os).map(([os, count]: [string, any]) => (
              <div key={os} className="flex items-center justify-between">
                <span className="text-white/80">{os}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(count / analytics.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/60 text-sm font-bold w-12 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6">Top Pages</h3>
        <div className="space-y-3">
          {Object.entries(analytics.pages)
            .sort(([, a]: any, [, b]: any) => b - a)
            .slice(0, 10)
            .map(([page, views]: [string, any]) => (
              <div key={page} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <span className="text-white/80 font-mono text-sm">{page}</span>
                <span className="text-white/60 font-bold">{views} views</span>
              </div>
            ))}
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h3 className="text-lg font-bold mb-6">Recent Visitors</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/60 text-sm font-bold">Time</th>
                <th className="text-left py-3 px-4 text-white/60 text-sm font-bold">Device</th>
                <th className="text-left py-3 px-4 text-white/60 text-sm font-bold">Browser</th>
                <th className="text-left py-3 px-4 text-white/60 text-sm font-bold">OS</th>
                <th className="text-left py-3 px-4 text-white/60 text-sm font-bold">Location</th>
                <th className="text-left py-3 px-4 text-white/60 text-sm font-bold">Pages</th>
                <th className="text-left py-3 px-4 text-white/60 text-sm font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {analytics.recentVisitors.map((visitor: VisitorData, index: number) => (
                <tr key={visitor.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white/80 text-sm">
                    {formatDate(visitor.timestamp)}
                  </td>
                  <td className="py-3 px-4 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                      {visitor.device === "Desktop" && <Monitor size={16} />}
                      {visitor.device === "Mobile" && <Smartphone size={16} />}
                      {visitor.device === "Tablet" && <Tablet size={16} />}
                      {visitor.device}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/80 text-sm">{visitor.browser}</td>
                  <td className="py-3 px-4 text-white/80 text-sm">{visitor.os}</td>
                  <td className="py-3 px-4 text-white/80 text-sm">
                    <div className="text-xs">
                      <div>{visitor.timezone}</div>
                      <div className="text-white/40">{visitor.language}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/80 text-sm">{visitor.pagesVisited.length}</td>
                  <td className="py-3 px-4 text-white/80 text-sm">
                    {formatDuration(visitor.sessionDuration)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
