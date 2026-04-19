// Visitor analytics and tracking

export interface VisitorData {
  id: string;
  timestamp: number;
  
  // Device Info
  device: string;
  browser: string;
  os: string;
  screenResolution: string;
  
  // Location (approximate from timezone)
  timezone: string;
  language: string;
  
  // Session Info
  sessionDuration: number;
  pagesVisited: string[];
  referrer: string;
  
  // User Agent
  userAgent: string;
}

// Get device type
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "Mobile";
  }
  return "Desktop";
};

// Get browser name
const getBrowserName = (): string => {
  const ua = navigator.userAgent;
  let browserName = "Unknown";

  if (ua.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (ua.indexOf("SamsungBrowser") > -1) {
    browserName = "Samsung Internet";
  } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
    browserName = "Opera";
  } else if (ua.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
  } else if (ua.indexOf("Edge") > -1) {
    browserName = "Edge (Legacy)";
  } else if (ua.indexOf("Edg") > -1) {
    browserName = "Edge (Chromium)";
  } else if (ua.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (ua.indexOf("Safari") > -1) {
    browserName = "Safari";
  }

  return browserName;
};

// Get OS name
const getOSName = (): string => {
  const ua = navigator.userAgent;
  let osName = "Unknown";

  if (ua.indexOf("Win") > -1) osName = "Windows";
  else if (ua.indexOf("Mac") > -1) osName = "MacOS";
  else if (ua.indexOf("Linux") > -1) osName = "Linux";
  else if (ua.indexOf("Android") > -1) osName = "Android";
  else if (ua.indexOf("like Mac") > -1) osName = "iOS";

  return osName;
};

// Generate unique visitor ID
const generateVisitorId = (): string => {
  const stored = localStorage.getItem("visitorId");
  if (stored) return stored;

  const id = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem("visitorId", id);
  return id;
};

// Track visitor
export const trackVisitor = (): VisitorData => {
  const visitorData: VisitorData = {
    id: generateVisitorId(),
    timestamp: Date.now(),
    
    // Device Info
    device: getDeviceType(),
    browser: getBrowserName(),
    os: getOSName(),
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    
    // Location
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    
    // Session Info
    sessionDuration: 0,
    pagesVisited: [window.location.pathname],
    referrer: document.referrer || "Direct",
    
    // User Agent
    userAgent: navigator.userAgent,
  };

  // Save to localStorage
  saveVisitorData(visitorData);
  
  return visitorData;
};

// Save visitor data
const saveVisitorData = (data: VisitorData) => {
  try {
    const visitors = getVisitorHistory();
    
    // Check if visitor already exists today
    const today = new Date().toDateString();
    const existingIndex = visitors.findIndex(v => 
      v.id === data.id && 
      new Date(v.timestamp).toDateString() === today
    );

    if (existingIndex >= 0) {
      // Update existing visitor
      visitors[existingIndex] = {
        ...visitors[existingIndex],
        pagesVisited: [...new Set([...visitors[existingIndex].pagesVisited, ...data.pagesVisited])],
        sessionDuration: Date.now() - visitors[existingIndex].timestamp,
      };
    } else {
      // Add new visitor
      visitors.push(data);
    }

    // Keep only last 1000 visitors
    const recentVisitors = visitors.slice(-1000);
    localStorage.setItem("visitorHistory", JSON.stringify(recentVisitors));
  } catch (e) {
    console.error("Error saving visitor data:", e);
  }
};

// Get visitor history
export const getVisitorHistory = (): VisitorData[] => {
  try {
    const data = localStorage.getItem("visitorHistory");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error loading visitor history:", e);
    return [];
  }
};

// Track page view
export const trackPageView = (path: string) => {
  try {
    const visitorId = localStorage.getItem("visitorId");
    if (!visitorId) return;

    const visitors = getVisitorHistory();
    const visitor = visitors.find(v => v.id === visitorId);
    
    if (visitor && !visitor.pagesVisited.includes(path)) {
      visitor.pagesVisited.push(path);
      localStorage.setItem("visitorHistory", JSON.stringify(visitors));
    }
  } catch (e) {
    console.error("Error tracking page view:", e);
  }
};

// Get analytics summary
export const getAnalyticsSummary = () => {
  const visitors = getVisitorHistory();
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

  const todayVisitors = visitors.filter(v => v.timestamp > oneDayAgo);
  const weekVisitors = visitors.filter(v => v.timestamp > oneWeekAgo);
  const monthVisitors = visitors.filter(v => v.timestamp > oneMonthAgo);

  // Device breakdown
  const deviceBreakdown = visitors.reduce((acc, v) => {
    acc[v.device] = (acc[v.device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Browser breakdown
  const browserBreakdown = visitors.reduce((acc, v) => {
    acc[v.browser] = (acc[v.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // OS breakdown
  const osBreakdown = visitors.reduce((acc, v) => {
    acc[v.os] = (acc[v.os] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top pages
  const pageViews = visitors.flatMap(v => v.pagesVisited);
  const pageBreakdown = pageViews.reduce((acc, page) => {
    acc[page] = (acc[page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: visitors.length,
    today: todayVisitors.length,
    week: weekVisitors.length,
    month: monthVisitors.length,
    devices: deviceBreakdown,
    browsers: browserBreakdown,
    os: osBreakdown,
    pages: pageBreakdown,
    recentVisitors: visitors.slice(-10).reverse(),
  };
};
