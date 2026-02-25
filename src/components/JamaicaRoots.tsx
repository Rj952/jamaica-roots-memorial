"use client";

import { useState, useEffect, useMemo, useRef } from "react";
const AUDIO_DATA_URI = "data:audio/mpeg;base64,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rsdqBuoxFZgqGPsiSg99Nqcw+qIQsFt4bbbvJ393ayD/qgBJwCz/8zLE5Q+o/tJees52JzPq1TKt6SruWc1pMcRRrD3o8iVphD/11QAFkpcbbf/gCEzioQk1obuG+YhR3PD8//XoQKXaZN5+e0AU260VT5iH//MwxOgSQNKgcstWjMzJtmQKuv0O9rW3e97HB3D1Wv2xi7gw1Gz5k532ZBUAIzGNkS6DdDKLDmkQ3GcFdA6WB4n2QN5uaywo9L50qarQ//MwxOAO0P7CfnrEcKzgJRg4Ge2Y6/pURr2nqxHd+Jxsa5vOWonv3/7FAHeebkjkAGLggJNm3KxMgwormXZgtUBW3SGMZ3P0CMbWepq2//MyxOUOSM6cQMjUwNdgqG/1dT//dk3km0OlEh573nvhsjcpsutKJoUNo1+fATHq5dVbiMwLqjNlQXAE0QErhrKtn6RMg3Ljg3Z+ooLA6v/zMMTtEdFKxn57BJBaaKJK1SwI86omz5zj4aV/qg09YevGIUo4odc25KtiNiRbZV7vogDQYYOIBLADqewsR4W9jkzQffKVyKf7jh+96f/zMMTmD6EimYjMBMSMaagQffyCo5zVQuWhWhSBRfszhP96LY5W5nt8Slbdy37Hc9yhetcJK03SFtllwA5yB42H5yoAIiq6n4v4D5VHLv/zMsToE0l20b5hzSYf8HQ726gb1AsgatT8WOhT6HT3HX1QXdyP+ptwYU5PXtLE1TNwCPhdYSQa+ohFWbUc+qocgL8DozvMC9Acl0KsRZz/8zDE3A9w0qRAw05wCwB5VVCW6i4Tf1PFxVKaaNvtaVHXp3atVXzulQUpHp9bbaABpu1Hmrvcc9CTznPH9MSOsHPpn2xUzWAcOqMEYmn/8zLE3xB40rXews7IISB4IV6rrKHP/Quu26oU386fr1qpJh08Lu6mauhCxRUAACAUCsUisUCgUgAAAAuH6I6SX80QIR3E9/B/nmhLd+BI//MwxN8PENLyfjJUPoI2X2JonuILjJlwyHOK/ImOokDAyNjEy8oIEUNSsZkVWRU98qHSfL5fJsrooqRpf5uovoMYGCzRJ1OtVH/zRZos//MwxOMOoSKkUMtUaN2M1m6YjEIBCR08HSP/+tVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MyxOkREXbmX09QAlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zMMTmHJHmtl+PiABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zMMS0AAADSAHAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";

// ═══════════════════ AUTH HELPERS ═══════════════════════════════════════════
const AUTH_STORAGE_KEY = "jroots_users";
const SESSION_KEY = "jroots_session";

const getUsers = (): Record<string, { email: string; password: string; name: string }> => {
  try { return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "{}"); } catch { return {}; }
};
const saveUsers = (users: Record<string, { email: string; password: string; name: string }>) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
};
const getSession = (): { email: string; name: string } | null => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
};
const setSession = (s: { email: string; name: string } | null) => {
  if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  else localStorage.removeItem(SESSION_KEY);
};



// ═══════════════════ DESIGN TOKENS ═══════════════════════════════════════════
const tokens = {
  colors: {
    parchment: "#F7F2EA",
    cream: "#EDE6D8",
    warmSand: "#D4C5A9",
    amber: "#C4956A",
    terracotta: "#B07B5F",
    deepEarth: "#6B4C3B",
    bark: "#3D2B1F",
    night: "#1A1410",
    sage: "#8B9E7E",
    deepSage: "#5C7050",
    ocean: "#5B7E8A",
    gold: "#D4A853",
    softGold: "rgba(212, 168, 83, 0.15)",
    candleGlow: "#F5D17E",
    candleWarm: "#E8A840",
    flowerPink: "#D4A0A0",
    flowerWhite: "#F0EAE0",
  },
  fonts: {
    display: "'Instrument Serif', 'Cormorant Garamond', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    serif: "'Cormorant Garamond', Georgia, serif",
  },
};

// Note: Global styles (keyframes, scrollbar, selection) are in globals.css
// Fonts are loaded via next/font in layout.tsx

// âââ GRAIN OVERLAY âââââââââââââââââââââââââââââââââââââââ
const GrainOverlay = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
      animation: "grainMove 8s steps(10) infinite",
    }}
  />
);

// âââ ICON COMPONENTS âââââââââââââââââââââââââââââââââââââ
const Icons = {
  Candle: ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2c0 0-3 4-3 6.5S10.34 12 12 12s3-1 3-3.5S12 2 12 2z" fill={tokens.colors.candleGlow} stroke={tokens.colors.candleWarm} />
      <rect x="10" y="12" width="4" height="10" rx="1" fill={tokens.colors.cream} stroke={color} />
      <line x1="12" y1="12" x2="12" y2="14" />
    </svg>
  ),
  Flower: ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="10" r="2" fill={tokens.colors.gold} />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 12 + Math.cos(rad) * 4;
        const cy = 10 + Math.sin(rad) * 4;
        return <ellipse key={i} cx={cx} cy={cy} rx="2.2" ry="3" transform={`rotate(${angle} ${cx} ${cy})`} fill={tokens.colors.flowerWhite} stroke={color} strokeWidth="0.8" />;
      })}
      <path d="M12 14v8" stroke={tokens.colors.deepSage} strokeWidth="1.5" />
      <path d="M10 18c-2-1-3-3-3-3" stroke={tokens.colors.sage} strokeWidth="1" />
    </svg>
  ),
  Dove: ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20c-4-2-8-6-8-10 0-2 1.5-4 4-4 1.5 0 3 1 4 2.5C13 7 14.5 6 16 6c2.5 0 4 2 4 4 0 4-4 8-8 10z" fill={tokens.colors.flowerWhite} />
    </svg>
  ),
  MapPin: ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Music: ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  JamaicaFlag: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size * 0.667} viewBox="0 0 60 40" fill="none" role="img" aria-label="Jamaica flag">
      <rect width="60" height="40" fill="#009B3A" />
      <polygon points="0,0 30,20 0,40" fill="#000" />
      <polygon points="60,0 30,20 60,40" fill="#000" />
      <polygon points="0,0 60,40 56,40 0,4" fill="#FED100" />
      <polygon points="0,0 4,0 60,36 60,40" fill="#FED100" />
      <polygon points="0,40 0,36 56,0 60,0" fill="#FED100" />
      <polygon points="4,40 60,4 60,0 0,40" fill="#FED100" />
    </svg>
  ),
  Globe: ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
  Heart: ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  ChevronRight: ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
  ),
  X: ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
  ),
  Camera: ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Check: ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
  ),
  Menu: ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

// âââ JAMAICA PARISHES ââââââââââââââââââââââââââââââââââââ
const parishes = [
  "Kingston", "St. Andrew", "St. Thomas", "Portland", "St. Mary",
  "St. Ann", "Trelawny", "St. James", "Hanover", "Westmoreland",
  "St. Elizabeth", "Manchester", "Clarendon", "St. Catherine",
  "Diaspora \u2013 United Kingdom", "Diaspora \u2013 United States",
  "Diaspora \u2013 Canada", "Diaspora \u2013 Other"
];

// âââ SAMPLE MEMORIAL DATA ââââââââââââââââââââââââââââââââ
const sampleMemorials: any[] = [];

// âââ ANIMATED BACKGROUND âââââââââââââââââââââââââââââââââ
const SacredBackground = ({ variant = "default" }: { variant?: "default" | "memorial" | "create" }) => {
  // Pre-compute particle positions so they're stable across renders
  const particles = useMemo(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      width: 4 + (i * 1.3) % 4,
      height: 4 + (i * 0.9) % 4,
      opacity: 0.1 + (i * 0.02),
      left: `${10 + (i * 13.7) % 80}%`,
      top: `${10 + (i * 11.3) % 80}%`,
      duration: 4 + (i * 0.7),
      delay: `${i * 0.5}s`,
    })), []
  );

  const gradients = {
    default: `radial-gradient(ellipse at 20% 50%, rgba(212, 168, 83, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(139, 158, 126, 0.05) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 80%, rgba(176, 123, 95, 0.04) 0%, transparent 50%),
              linear-gradient(180deg, ${tokens.colors.parchment} 0%, ${tokens.colors.cream} 100%)`,
    memorial: `radial-gradient(ellipse at 50% 30%, rgba(212, 168, 83, 0.08) 0%, transparent 60%),
               radial-gradient(ellipse at 30% 70%, rgba(139, 158, 126, 0.04) 0%, transparent 40%),
               linear-gradient(180deg, ${tokens.colors.night} 0%, #2A1F17 50%, #1A1410 100%)`,
    create: `radial-gradient(ellipse at 60% 40%, rgba(212, 168, 83, 0.06) 0%, transparent 50%),
             radial-gradient(ellipse at 20% 80%, rgba(91, 126, 138, 0.04) 0%, transparent 40%),
             linear-gradient(180deg, ${tokens.colors.parchment} 0%, #F0E8D8 100%)`,
  };

  return (
    <div aria-hidden="true" style={{
      position: "fixed", inset: 0, zIndex: 0,
      background: gradients[variant] || gradients.default,
    }}>
      {variant === "memorial" && particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          width: p.width,
          height: p.height,
          borderRadius: "50%",
          background: `rgba(212, 168, 83, ${p.opacity})`,
          left: p.left,
          top: p.top,
          animation: `breathe ${p.duration}s ease-in-out infinite`,
          animationDelay: p.delay,
        }} />
      ))}
    </div>
  );
};

// âââ CANDLE ANIMATION COMPONENT ââââââââââââââââââââââââââ
const AnimatedCandle = ({ lit, onClick, count }: { lit: boolean; onClick: (e: React.MouseEvent) => void; count: number }) => (
  <button
    onClick={onClick}
    aria-label={lit ? `Candle lit. ${count} flames burning` : "Light a candle"}
    aria-pressed={lit}
    style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      background: "none", border: "none", cursor: "pointer",
      padding: "16px 24px", borderRadius: 16,
      transition: "all 0.6s ease",
      transform: lit ? "scale(1.05)" : "scale(1)",
    }}
  >
    <div style={{
      position: "relative", width: 48, height: 64,
      animation: lit ? "gentleFloat 4s ease-in-out infinite" : "none",
    }}>
      {lit && (
        <div style={{
          position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
          width: 14, height: 20, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: `radial-gradient(ellipse, ${tokens.colors.candleGlow}, ${tokens.colors.candleWarm})`,
          animation: "candleFlicker 2s ease-in-out infinite",
          boxShadow: `0 0 20px ${tokens.colors.candleGlow}, 0 0 40px rgba(245, 209, 126, 0.3)`,
        }} />
      )}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 16, height: 44, borderRadius: "3px 3px 2px 2px",
        background: lit
          ? `linear-gradient(180deg, ${tokens.colors.cream}, ${tokens.colors.warmSand})`
          : `linear-gradient(180deg, ${tokens.colors.cream}88, ${tokens.colors.warmSand}44)`,
        transition: "all 0.6s ease",
      }} />
      <div style={{
        position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
        width: 1.5, height: 8,
        background: lit ? tokens.colors.bark : tokens.colors.warmSand,
      }} />
    </div>
    <span style={{
      fontFamily: tokens.fonts.body, fontSize: 11, fontWeight: 400,
      letterSpacing: "0.05em", textTransform: "uppercase",
      color: lit ? tokens.colors.candleGlow : "rgba(255,255,255,0.4)",
      transition: "color 0.6s ease",
    }}>
      {lit ? "Candle Lit" : "Light a Candle"}
    </span>
    {count > 0 && (
      <span style={{
        fontFamily: tokens.fonts.serif, fontSize: 14, fontStyle: "italic",
        color: "rgba(255,255,255,0.35)",
      }}>
        {count} {count === 1 ? "flame" : "flames"} burning
      </span>
    )}
  </button>
);

// âââ FLOWER OFFERING COMPONENT âââââââââââââââââââââââââââ
const FlowerOffering = ({ placed, onClick, count }: { placed: boolean; onClick: (e: React.MouseEvent) => void; count: number }) => {
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    if (placed && petals.length === 0) {
      setPetals(Array.from({ length: 5 }).map((_, i) => ({
        id: i, left: 20 + (i * 12),
        delay: i * 0.3, duration: 2 + (i * 0.4),
      })));
      const timer = setTimeout(() => setPetals([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [placed]);

  return (
    <button
      onClick={onClick}
      aria-label={placed ? `Flowers placed. ${count} offerings` : "Leave flowers"}
      aria-pressed={placed}
      style={{
        position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        background: "none", border: "none", cursor: "pointer",
        padding: "16px 24px", borderRadius: 16,
        transition: "all 0.6s ease",
        overflow: "hidden", minHeight: 100,
      }}
    >
      {petals.map(p => (
        <div key={p.id} aria-hidden="true" style={{
          position: "absolute", top: 0, left: `${p.left}%`,
          width: 8, height: 10, borderRadius: "50% 0 50% 50%",
          background: tokens.colors.flowerWhite,
          animation: `petalDrift ${p.duration}s ease-out forwards`,
          animationDelay: `${p.delay}s`,
          opacity: 0,
        }} />
      ))}
      <div style={{
        transform: placed ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.6s ease",
        opacity: placed ? 1 : 0.5,
      }}>
        <Icons.Flower size={40} color={placed ? tokens.colors.flowerWhite : "rgba(255,255,255,0.4)"} />
      </div>
      <span style={{
        fontFamily: tokens.fonts.body, fontSize: 11, fontWeight: 400,
        letterSpacing: "0.05em", textTransform: "uppercase",
        color: placed ? tokens.colors.flowerWhite : "rgba(255,255,255,0.4)",
        transition: "color 0.6s ease",
      }}>
        {placed ? "Flowers Placed" : "Leave Flowers"}
      </span>
      {count > 0 && (
        <span style={{
          fontFamily: tokens.fonts.serif, fontSize: 14, fontStyle: "italic",
          color: "rgba(255,255,255,0.35)",
        }}>
          {count} offerings
        </span>
      )}
    </button>
  );
};

// âââ PHOTO PLACEHOLDER âââââââââââââââââââââââââââââââââââ
const PhotoPlaceholder = ({ name, size = 280 }: { name: string; size?: number }) => {
  const initials = name ? name.split(" ").map(n => n[0]).join("").slice(0, 2) : "?";
  return (
    <div
      role="img"
      aria-label={`Memorial photo placeholder for ${name}`}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(135deg, ${tokens.colors.deepEarth}, ${tokens.colors.bark})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `2px solid rgba(212, 168, 83, 0.2)`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}
    >
      <span style={{
        fontFamily: tokens.fonts.display, fontSize: size * 0.35,
        color: "rgba(212, 168, 83, 0.4)", fontStyle: "italic",
      }}>{initials}</span>
    </div>
  );
};

// âââ NAVIGATION (responsive with mobile menu) ââââââââââââ
const Navigation = ({ currentView, setView, dark }: { currentView: string; setView: (v: string) => void; dark: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const textColor = dark ? "rgba(255,255,255,0.7)" : tokens.colors.deepEarth;
  const accentColor = dark ? tokens.colors.gold : tokens.colors.terracotta;

  const navItems = [
    { key: "home", label: "Home" },
    { key: "explore", label: "Explore" },
    { key: "about", label: "About" },
  ];

  const handleNav = (key: string) => {
    setView(key);
    setMobileOpen(false);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: dark
          ? "linear-gradient(180deg, rgba(26,20,16,0.95) 0%, rgba(26,20,16,0) 100%)"
          : "linear-gradient(180deg, rgba(247,242,234,0.95) 0%, rgba(247,242,234,0) 100%)",
        animation: "fadeIn 1s ease",
      }}
    >
      <button
        onClick={() => handleNav("home")}
        aria-label="Jamaica Roots - Go to home"
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            borderRadius: 4, overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            display: "flex", alignItems: "center",
          }}>
            <Icons.JamaicaFlag size={28} />
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icons.Dove size={15} color={tokens.colors.night} />
          </div>
        </div>
        <span style={{
          fontFamily: tokens.fonts.display, fontSize: 22,
          color: dark ? tokens.colors.cream : tokens.colors.bark,
          fontStyle: "italic",
        }}>Jamaica Roots</span>
      </button>

      {/* Desktop nav */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}
        className="desktop-nav"
      >
        <style>{`
          @media (max-width: 720px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
          }
          @media (min-width: 721px) {
            .mobile-menu-btn { display: none !important; }
            .mobile-overlay { display: none !important; }
          }
        `}</style>
        {navItems.map(item => (
          <button key={item.key} onClick={() => handleNav(item.key)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: 400,
            letterSpacing: "0.04em",
            color: currentView === item.key ? accentColor : textColor,
            transition: "color 0.3s ease",
            borderBottom: currentView === item.key ? `1px solid ${accentColor}` : "1px solid transparent",
            paddingBottom: 2,
          }}>{item.label}</button>
        ))}
        <button onClick={() => handleNav("create")} style={{
          fontFamily: tokens.fonts.body, fontSize: 13, fontWeight: 500,
          letterSpacing: "0.04em",
          color: tokens.colors.night,
          background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
          border: "none", borderRadius: 100, padding: "10px 24px",
          cursor: "pointer", transition: "all 0.3s ease",
        }}>Create Memorial</button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        style={{
          display: "none", alignItems: "center", justifyContent: "center",
          background: "none", border: "none", cursor: "pointer",
          width: 44, height: 44, borderRadius: 8,
        }}
      >
        {mobileOpen
          ? <Icons.X size={24} color={dark ? tokens.colors.cream : tokens.colors.bark} />
          : <Icons.Menu size={24} color={dark ? tokens.colors.cream : tokens.colors.bark} />
        }
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          style={{
            position: "fixed", top: 70, left: 0, right: 0, bottom: 0,
            background: dark ? "rgba(26,20,16,0.97)" : "rgba(247,242,234,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 32,
            animation: "fadeIn 0.3s ease",
            zIndex: 99,
          }}
        >
          {navItems.map(item => (
            <button key={item.key} onClick={() => handleNav(item.key)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: tokens.fonts.display, fontSize: 28, fontWeight: 400,
              fontStyle: "italic",
              color: currentView === item.key ? accentColor : textColor,
            }}>{item.label}</button>
          ))}
          <button onClick={() => handleNav("create")} style={{
            fontFamily: tokens.fonts.body, fontSize: 16, fontWeight: 500,
            color: tokens.colors.night,
            background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
            border: "none", borderRadius: 100, padding: "14px 36px",
            cursor: "pointer", marginTop: 16,
          }}>Create Memorial</button>
        </div>
      )}
    </nav>
  );
};

// âââ HOME VIEW âââââââââââââââââââââââââââââââââââââââââââ
const HomeView = ({ setView, setSelectedMemorial }: { setView: (v: string) => void; setSelectedMemorial: (m: any) => void }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px",
      }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}>
          <div aria-hidden="true" style={{
            width: 1, height: 80, background: `linear-gradient(180deg, transparent, ${tokens.colors.gold})`,
            margin: "0 auto 40px",
          }} />

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{
              borderRadius: 6, overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              display: "flex", alignItems: "center",
            }}>
              <Icons.JamaicaFlag size={48} />
            </div>
          </div>

          <p style={{
            fontFamily: tokens.fonts.body, fontSize: 11, fontWeight: 400,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: tokens.colors.amber, marginBottom: 24,
          }}>A Digital Heritage Sanctuary</p>

          <h1 style={{
            fontFamily: tokens.fonts.display, fontWeight: 400,
            fontSize: "clamp(36px, 7vw, 80px)", lineHeight: 1.1,
            color: tokens.colors.bark, marginBottom: 32,
            fontStyle: "italic", maxWidth: 700,
          }}>
            Where Memory<br />Becomes Legacy
          </h1>

          <p style={{
            fontFamily: tokens.fonts.serif, fontSize: "clamp(17px, 2.5vw, 22px)",
            fontWeight: 300, lineHeight: 1.7,
            color: tokens.colors.deepEarth, maxWidth: 520,
            margin: "0 auto 56px", fontStyle: "italic",
          }}>
            A sacred space to honor, remember, and preserve the lives
            of those who shaped us — rooted in Jamaican heritage,
            reaching across the diaspora.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setView("create")} style={{
              fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 500,
              letterSpacing: "0.03em",
              color: tokens.colors.night,
              background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
              border: "none", borderRadius: 100, padding: "16px 36px",
              cursor: "pointer", transition: "all 0.4s ease",
              boxShadow: "0 4px 20px rgba(212, 168, 83, 0.3)",
            }}>
              Create a Memorial
            </button>
            <button onClick={() => setView("explore")} style={{
              fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 400,
              letterSpacing: "0.03em",
              color: tokens.colors.deepEarth,
              background: "transparent",
              border: `1px solid ${tokens.colors.warmSand}`,
              borderRadius: 100, padding: "16px 36px",
              cursor: "pointer", transition: "all 0.3s ease",
            }}>
              Visit a Memorial
            </button>
          </div>
        </div>

        <div aria-hidden="true" style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: loaded ? 0.4 : 0, transition: "opacity 2s ease 1s",
        }}>
          <div style={{
            width: 1, height: 40,
            background: `linear-gradient(180deg, ${tokens.colors.warmSand}, transparent)`,
          }} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{
        padding: "80px 24px 100px",
        display: "flex", justifyContent: "center",
      }}>
        <div style={{ maxWidth: 900, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginBottom: 64, flexWrap: "wrap" }}>
            {[
              { icon: <Icons.Dove size={28} color={tokens.colors.terracotta} />, word: "Dignity" },
              { icon: <Icons.Candle size={28} />, word: "Remembrance" },
              { icon: <Icons.Heart size={28} color={tokens.colors.terracotta} />, word: "Belonging" },
              { icon: <Icons.Globe size={28} color={tokens.colors.terracotta} />, word: "Legacy" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                animation: "fadeInUp 0.8s ease forwards",
                animationDelay: `${0.2 + i * 0.15}s`,
                opacity: 0,
              }}>
                {item.icon}
                <span style={{
                  fontFamily: tokens.fonts.serif, fontSize: 16, fontWeight: 400,
                  color: tokens.colors.deepEarth, fontStyle: "italic",
                }}>{item.word}</span>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: tokens.fonts.serif, fontSize: 20, lineHeight: 1.8,
            color: tokens.colors.deepEarth, fontWeight: 300,
            maxWidth: 640, margin: "0 auto",
          }}>
            Jamaica Roots is not a social media platform. It is a living archive —
            a place where the stories of our people are kept with the reverence they deserve.
            Every memorial is a garden, every visit an act of love.
          </p>
        </div>
      </section>

      {/* Featured Memorials */}
      <section aria-label="Recent memorials" style={{ padding: "40px 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{
              fontFamily: tokens.fonts.body, fontSize: 11, fontWeight: 400,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: tokens.colors.amber, marginBottom: 16,
            }}>Lives Remembered</p>
            <h2 style={{
              fontFamily: tokens.fonts.display, fontSize: 36, fontWeight: 400,
              color: tokens.colors.bark, fontStyle: "italic",
            }}>Recent Memorials</h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
          }}>
            {sampleMemorials.map((memorial, i) => (
              <button key={memorial.id}
                onClick={() => { setSelectedMemorial(memorial); setView("memorial"); }}
                aria-label={`View memorial for ${memorial.name}, ${memorial.years}`}
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid rgba(212, 168, 83, 0.15)`,
                  borderRadius: 20, padding: 28,
                  cursor: "pointer", textAlign: "center",
                  transition: "all 0.5s ease",
                  animation: "fadeInUp 0.8s ease forwards",
                  animationDelay: `${0.3 + i * 0.15}s`,
                  opacity: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(107, 76, 59, 0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <PhotoPlaceholder name={memorial.name} size={100} />
                <div style={{ marginTop: 24 }}>
                  <h3 style={{
                    fontFamily: tokens.fonts.display, fontSize: 22, fontWeight: 400,
                    color: tokens.colors.bark, fontStyle: "italic", marginBottom: 4,
                  }}>{memorial.name}</h3>
                  <p style={{
                    fontFamily: tokens.fonts.serif, fontSize: 14, color: tokens.colors.amber,
                    fontWeight: 300, marginBottom: 16,
                  }}>{memorial.years}</p>
                  <p style={{
                    fontFamily: tokens.fonts.serif, fontSize: 15, lineHeight: 1.6,
                    color: tokens.colors.deepEarth, fontStyle: "italic",
                    fontWeight: 300,
                  }}>{memorial.tribute}</p>
                  <div style={{
                    display: "flex", justifyContent: "center", gap: 20, marginTop: 20,
                    paddingTop: 16, borderTop: `1px solid rgba(212, 168, 83, 0.1)`,
                  }}>
                    <span style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.warmSand }}>
                      {memorial.candles} candles
                    </span>
                    <span style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.warmSand }}>
                      {memorial.flowers} flowers
                    </span>
                    <span style={{ fontFamily: tokens.fonts.body, fontSize: 12, color: tokens.colors.warmSand }}>
                      {memorial.visitors} visits
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora Connection */}
      <section aria-label="Diaspora statistics" style={{
        padding: "80px 24px", textAlign: "center",
        background: `linear-gradient(180deg, transparent, rgba(212, 168, 83, 0.05), transparent)`,
      }}>
        <Icons.Globe size={32} color={tokens.colors.amber} />
        <h2 style={{
          fontFamily: tokens.fonts.display, fontSize: 32, fontWeight: 400,
          color: tokens.colors.bark, fontStyle: "italic",
          marginTop: 20, marginBottom: 16,
        }}>Connected Across the Diaspora</h2>
        <p style={{
          fontFamily: tokens.fonts.serif, fontSize: 17, lineHeight: 1.7,
          color: tokens.colors.deepEarth, fontWeight: 300,
          maxWidth: 500, margin: "0 auto 40px",
        }}>
          From Kingston to London, New York to Toronto — wherever
          Jamaicans call home, their memories are preserved here.
        </p>
        <div style={{
          display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
        }}>
          {[
            { num: "2,847", label: "Memorials Created" },
            { num: "14", label: "Countries Connected" },
            { num: "47,000+", label: "Candles Lit" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: tokens.fonts.display, fontSize: 36,
                color: tokens.colors.gold, fontStyle: "italic",
              }}>{stat.num}</p>
              <p style={{
                fontFamily: tokens.fonts.body, fontSize: 12,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: tokens.colors.warmSand, marginTop: 4,
              }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "60px 24px 40px", textAlign: "center",
        borderTop: `1px solid rgba(212, 168, 83, 0.1)`,
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16,
        }}>
          <div style={{
            borderRadius: 3, overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex", alignItems: "center",
          }}>
            <Icons.JamaicaFlag size={22} />
          </div>
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icons.Dove size={14} color={tokens.colors.night} />
          </div>
          <span style={{
            fontFamily: tokens.fonts.display, fontSize: 18,
            color: tokens.colors.bark, fontStyle: "italic",
          }}>Jamaica Roots</span>
        </div>
        <p style={{
          fontFamily: tokens.fonts.serif, fontSize: 14,
          color: tokens.colors.warmSand, fontStyle: "italic",
        }}>Heritage Technology — Preserving memory with dignity.</p>
        <p style={{
          fontFamily: tokens.fonts.body, fontSize: 11,
          color: tokens.colors.warmSand, marginTop: 20,
          letterSpacing: "0.05em",
        }}>&copy; 2026 Jamaica Roots. Every design decision honors the person being remembered.</p>
      </footer>
    </div>
  );
};

// âââ MEMORIAL VIEW âââââââââââââââââââââââââââââââââââââââ
const MemorialView = ({ memorial, setView }: { memorial: any; setView: (v: string) => void }) => {
  const [candleLit, setCandleLit] = useState(false);
  const [flowerPlaced, setFlowerPlaced] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { name: "Aunt Beverly, Kingston", text: "Walk good, my darling. You are forever in our hearts.", time: "3 days ago" },
    { name: "Michael W., London", text: "Thank you for the lessons that shaped my life.", time: "1 week ago" },
  ]);
  const [loaded, setLoaded] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  const addRipple = (x: number, y: number) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1500);
  };

  const handleComment = () => {
    if (comment.trim()) {
      setComments(prev => [{ name: "You", text: comment.trim(), time: "Just now" }, ...prev]);
      setComment("");
      setShowComment(false);
    }
  };

  return (
    <div style={{
      position: "relative", zIndex: 1, minHeight: "100vh",
      color: tokens.colors.cream,
    }}>
      {ripples.map(r => (
        <div key={r.id} aria-hidden="true" style={{
          position: "fixed", left: r.x - 20, top: r.y - 20,
          width: 40, height: 40, borderRadius: "50%",
          border: `1px solid rgba(212, 168, 83, 0.3)`,
          animation: "ripple 1.5s ease-out forwards",
          pointerEvents: "none", zIndex: 200,
        }} />
      ))}

            {/* Memorial Content */}
      <div style={{
        maxWidth: 680, margin: "0 auto",
        padding: "140px 24px 100px",
        textAlign: "center",
      }}>
        <button
          onClick={() => setView("home")}
          aria-label="Return to home"
          style={{
            position: "absolute", top: 90, left: 24,
            background: "none", border: "none", cursor: "pointer",
            fontFamily: tokens.fonts.body, fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            display: "flex", alignItems: "center", gap: 6,
            transition: "color 0.3s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
        >
          &larr; Return
        </button>

        {/* Photo */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          marginBottom: 40,
          display: "flex", justifyContent: "center",
        }}>
          <div style={{ position: "relative" }}>
            <PhotoPlaceholder name={memorial.name} size={220} />
            <div aria-hidden="true" style={{
              position: "absolute", inset: -8, borderRadius: "50%",
              border: "1px solid rgba(212, 168, 83, 0.15)",
              animation: "pulseGlow 4s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Name & Details */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease 0.3s",
        }}>
          <h1 style={{
            fontFamily: tokens.fonts.display, fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 400, fontStyle: "italic",
            color: tokens.colors.cream, lineHeight: 1.2, marginBottom: 8,
          }}>{memorial.name}</h1>

          <p style={{
            fontFamily: tokens.fonts.serif, fontSize: 18,
            color: tokens.colors.gold, fontWeight: 300,
            marginBottom: 8,
          }}>{memorial.years}</p>

          {memorial.parish && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 6, marginBottom: 32,
            }}>
              <Icons.MapPin size={14} color="rgba(255,255,255,0.3)" />
              <span style={{
                fontFamily: tokens.fonts.body, fontSize: 13,
                color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em",
              }}>{memorial.parish}</span>
            </div>
          )}

          <div aria-hidden="true" style={{
            width: 60, height: 1, margin: "0 auto 32px",
            background: `linear-gradient(90deg, transparent, ${tokens.colors.gold}, transparent)`,
          }} />

          <blockquote style={{
            fontFamily: tokens.fonts.serif, fontSize: 20, lineHeight: 1.8,
            fontWeight: 300, fontStyle: "italic",
            color: "rgba(255,255,255,0.8)",
            maxWidth: 500, margin: "0 auto 56px",
            border: "none", padding: 0,
          }}>
            &ldquo;{memorial.tribute}&rdquo;
          </blockquote>
        </div>

        {/* Interactions */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 0.6s",
        }}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 24,
            marginBottom: 56, flexWrap: "wrap",
          }}>
            <AnimatedCandle
              lit={candleLit}
              onClick={(e) => { setCandleLit(true); addRipple(e.clientX, e.clientY); }}
              count={memorial.candles + (candleLit ? 1 : 0)}
            />
            <FlowerOffering
              placed={flowerPlaced}
              onClick={(e) => { setFlowerPlaced(true); addRipple(e.clientX, e.clientY); }}
              count={memorial.flowers + (flowerPlaced ? 1 : 0)}
            />
          </div>

          {/* Comments */}
          <section aria-label="Words of remembrance" style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 20, padding: "24px 28px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 24, flexWrap: "wrap", gap: 12,
            }}>
              <p style={{
                fontFamily: tokens.fonts.body, fontSize: 11,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}>Words of Remembrance</p>
              <button onClick={() => setShowComment(!showComment)} style={{
                fontFamily: tokens.fonts.body, fontSize: 12,
                color: tokens.colors.gold, background: "none",
                border: `1px solid rgba(212, 168, 83, 0.3)`,
                borderRadius: 100, padding: "8px 20px",
                cursor: "pointer", transition: "all 0.3s ease",
              }}>
                {showComment ? "Cancel" : "Share a Memory"}
              </button>
            </div>

            {showComment && (
              <div style={{ marginBottom: 24, animation: "fadeInUp 0.4s ease" }}>
                <label htmlFor="tribute-input" style={{
                  position: "absolute", width: 1, height: 1,
                  overflow: "hidden", clip: "rect(0,0,0,0)",
                }}>Write your tribute</label>
                <textarea
                  id="tribute-input"
                  value={comment} onChange={e => setComment(e.target.value)}
                  maxLength={300}
                  placeholder="Share a respectful memory or tribute..."
                  style={{
                    width: "100%", height: 100, padding: 16,
                    fontFamily: tokens.fonts.serif, fontSize: 15,
                    fontStyle: "italic", lineHeight: 1.6,
                    color: tokens.colors.cream,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, resize: "none",
                    outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(212, 168, 83, 0.3)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <div style={{
                  display: "flex", justifyContent: "space-between", marginTop: 12,
                }}>
                  <span aria-live="polite" style={{
                    fontFamily: tokens.fonts.body, fontSize: 11,
                    color: "rgba(255,255,255,0.25)",
                  }}>{comment.length}/300</span>
                  <button
                    onClick={handleComment}
                    disabled={!comment.trim()}
                    aria-label="Submit tribute"
                    style={{
                      fontFamily: tokens.fonts.body, fontSize: 13,
                      color: tokens.colors.night,
                      background: tokens.colors.gold,
                      border: "none", borderRadius: 100, padding: "8px 24px",
                      cursor: comment.trim() ? "pointer" : "default",
                      opacity: comment.trim() ? 1 : 0.4,
                      transition: "all 0.3s ease",
                    }}
                  >Leave Tribute</button>
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {comments.map((c, i) => (
                <div key={i} style={{
                  textAlign: "left",
                  paddingBottom: 20,
             paddingBottom: 20,
                  borderBottom: i < comments.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  animation: i === 0 && c.name === "You" ? "fadeInUp 0.5s ease" : "none",
                }}>
                  <p style={{
                    fontFamily: tokens.fonts.serif, fontSize: 15,
                    fontStyle: "italic", lineHeight: 1.7,
                    color: "rgba(255,255,255,0.65)",
                  }}>&ldquo;{c.text}&rdquo;</p>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginTop: 8,
                  }}>
                    <span style={{
                      fontFamily: tokens.fonts.body, fontSize: 12,
                      color: "rgba(255,255,255,0.3)",
                    }}>&mdash; {c.name}</span>
                    <span style={{
                      fontFamily: tokens.fonts.body, fontSize: 11,
                      color: "rgba(255,255,255,0.2)",
                    }}>{c.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <p style={{
            fontFamily: tokens.fonts.body, fontSize: 12,
            color: "rgba(255,255,255,0.2)",
            marginTop: 40, letterSpacing: "0.05em",
          }}>
            {memorial.visitors.toLocaleString()} people have visited this memorial
          </p>
        </div>
      </div>
    </div>
  );
};

// âââ CREATE MEMORIAL VIEW ââââââââââââââââââââââââââââââââ
const CreateView = ({ setView, setSelectedMemorial }: { setView: (v: string) => void; setSelectedMemorial: (m: any) => void }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "", birthYear: "", passingYear: "",
    parish: "", tribute: "", photos: [],
    ownershipConfirmed: false, permissionConfirmed: false,
  });

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
  const [loaded, setLoaded] = useState(false);

  const handlePhotoUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData(prev => {
        const newPhotos = [...prev.photos] as string[];
        newPhotos[index] = result;
        return { ...prev, photos: newPhotos };
      });
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const steps = [
    { title: "Their Name", subtitle: "Who are you honoring?" },
    { title: "Their Time", subtitle: "The years of their journey" },
    { title: "Their Place", subtitle: "Where are their roots?" },
    { title: "Their Image", subtitle: "A photograph to remember" },
    { title: "Their Story", subtitle: "A tribute in your words" },
    { title: "Your Promise", subtitle: "Affirm your care for this memorial" },
  ];

  const canProceed = () => {
    switch (step) {
      case 0: return formData.name.trim().length > 2;
      case 1: return formData.birthYear.trim().length > 0 && formData.passingYear.trim().length > 0;
      case 2: return formData.parish.trim().length > 0;
      case 3: return (formData.photos as string[]).filter(Boolean).length > 0;
      case 4: return formData.tribute.trim().length > 0;
      case 5: return formData.ownershipConfirmed && formData.permissionConfirmed;
      default: return false;
    }
  };

  const handleCreate = () => {
    const newMemorial = {
      id: Date.now(),
      name: formData.name,
      years: `${formData.birthYear || "?"} \u2013 ${formData.passingYear}`,
      parish: formData.parish,
      tribute: formData.tribute,
      candles: 0, flowers: 0, visitors: 1,
    };
    setSelectedMemorial(newMemorial);
    setView("memorial");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "16px 0",
    fontFamily: tokens.fonts.display, fontSize: "clamp(22px, 4vw, 28px)",
    fontStyle: "italic", fontWeight: 400,
    color: tokens.colors.bark,
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${tokens.colors.warmSand}`,
    outline: "none",
    textAlign: "center",
    transition: "border-color 0.3s ease",
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <label htmlFor="name-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Full name of your loved one
            </label>
            <input
              id="name-input"
              autoFocus
              placeholder="Full name of your loved one"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = tokens.colors.gold}
              onBlur={e => e.target.style.borderColor = tokens.colors.warmSand}
            />
          </>
        );
      case 1:
        return (
          <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <label htmlFor="birth-year" style={{
                fontFamily: tokens.fonts.body, fontSize: 11,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: tokens.colors.amber, display: "block", marginBottom: 12,
              }}>Born</label>
              <input
                id="birth-year"
                placeholder="Year"
                value={formData.birthYear}
                onChange={e => setFormData({ ...formData, birthYear: e.target.value })}
                style={{ ...inputStyle, width: 140, fontSize: 24 }}
                onFocus={e => e.target.style.borderColor = tokens.colors.gold}
                onBlur={e => e.target.style.borderColor = tokens.colors.warmSand}
              />
            </div>
            <span aria-hidden="true" style={{
              fontFamily: tokens.fonts.display, fontSize: 24,
              color: tokens.colors.warmSand, marginTop: 20,
            }}>&mdash;</span>
            <div style={{ textAlign: "center" }}>
              <label htmlFor="passing-year" style={{
                fontFamily: tokens.fonts.body, fontSize: 11,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: tokens.colors.amber, display: "block", marginBottom: 12,
              }}>Passed</label>
              <input
                id="passing-year"
                autoFocus
                placeholder="Year"
                value={formData.passingYear}
                onChange={e => setFormData({ ...formData, passingYear: e.target.value })}
                style={{ ...inputStyle, width: 140, fontSize: 24 }}
                onFocus={e => e.target.style.borderColor = tokens.colors.gold}
                onBlur={e => e.target.style.borderColor = tokens.colors.warmSand}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <label htmlFor="parish-select" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Select parish or location
            </label>
            <select
              id="parish-select"
              value={formData.parish}
              onChange={e => setFormData({ ...formData, parish: e.target.value })}
              style={{
                width: "100%", padding: 16,
                fontFamily: tokens.fonts.serif, fontSize: 18,
                fontStyle: "italic",
                color: formData.parish ? tokens.colors.bark : tokens.colors.warmSand,
                background: "rgba(255,255,255,0.5)",
                border: `1px solid ${tokens.colors.warmSand}`,
                borderRadius: 12, outline: "none",
                cursor: "pointer", appearance: "none",
                textAlign: "center",
              }}
            >
              <option value="">Select parish or location (optional)</option>
              {parishes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        );
      case 3:
        return (
          <div style={{ maxWidth: 450, margin: "0 auto" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={i === 0 ? "Upload primary photo" : "Upload photo " + (i + 1)}
                  onClick={() => fileInputRefs.current[i]?.click()}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") fileInputRefs.current[i]?.click(); }}
                  style={{
                    position: "relative",
                    aspectRatio: "1", borderRadius: 16,
                    border: "1.5px dashed " + tokens.colors.warmSand,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 8,
                    cursor: "pointer",
                    background: (formData.photos as string[])[i] ? "transparent" : "rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = tokens.colors.gold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = tokens.colors.warmSand}
                >
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={el => { fileInputRefs.current[i] = el; }}
                    onChange={e => handlePhotoUpload(i, e)}
                  />
                  {(formData.photos as string[])[i] ? (
                    <img
                      src={(formData.photos as string[])[i]}
                      alt={"Photo " + (i + 1)}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }}
                    />
                  ) : (
                    <>
                      <Icons.Camera size={24} color={tokens.colors.warmSand} />
                      <span style={{
                        fontFamily: tokens.fonts.body, fontSize: 11,
                        color: tokens.colors.warmSand,
                        letterSpacing: "0.05em",
                      }}>
                        {i === 0 ? "Primary Photo" : "Photo " + (i + 1)}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: tokens.fonts.body, fontSize: 12,
              color: tokens.colors.warmSand, marginTop: 16,
              textAlign: "center",
            }}>
              Up to 4 photographs &middot; You must own or have permission for each image
            </p>
          </div>
        );
      case 4:
        return (
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <label htmlFor="tribute-text" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              A few words to honor their memory
            </label>
            <textarea
              id="tribute-text"
              autoFocus
              placeholder="A few words to honor their memory..."
              value={formData.tribute}
              onChange={e => {
                if (e.target.value.length <= 200) setFormData({ ...formData, tribute: e.target.value });
              }}
              style={{
                width: "100%", height: 140, padding: 20,
                fontFamily: tokens.fonts.serif, fontSize: 18,
                fontStyle: "italic", lineHeight: 1.7,
                color: tokens.colors.bark,
                background: "rgba(255,255,255,0.4)",
                border: `1px solid ${tokens.colors.warmSand}`,
                borderRadius: 16, resize: "none", outline: "none",
                textAlign: "center",
              }}
              onFocus={e => e.target.style.borderColor = tokens.colors.gold}
              onBlur={e => e.target.style.borderColor = tokens.colors.warmSand}
            />
            <p aria-live="polite" style={{
              fontFamily: tokens.fonts.body, fontSize: 12,
              color: tokens.colors.warmSand, marginTop: 12,
              textAlign: "right",
            }}>
              {formData.tribute.length}/200
            </p>
          </div>
        );
      case 5:
        return (
          <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "left" }}>
            {[
              { key: "ownershipConfirmed" as const, text: "I confirm that I own or have permission to use all uploaded photographs." },
              { key: "permissionConfirmed" as const, text: "I affirm that this memorial is created with respect and in good faith to honor the memory of the named individual." },
            ].map(item => (
              <label key={item.key} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                cursor: "pointer", padding: "20px 0",
                borderBottom: `1px solid rgba(212, 168, 83, 0.1)`,
              }}>
                <div
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={formData[item.key]}
                  onKeyDown={e => e.key === "Enter" && setFormData({ ...formData, [item.key]: !formData[item.key] })}
                  onClick={() => setFormData({ ...formData, [item.key]: !formData[item.key] })}
                  style={{
                    width: 24, height: 24, minWidth: 24, borderRadius: 6,
                    border: `1.5px solid ${formData[item.key] ? tokens.colors.gold : tokens.colors.warmSand}`,
                    background: formData[item.key] ? tokens.colors.gold : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease", marginTop: 2,
                  }}
                >
                  {formData[item.key] && <Icons.Check size={14} color={tokens.colors.night} />}
                </div>
                <span style={{
                  fontFamily: tokens.fonts.serif, fontSize: 15,
                  color: tokens.colors.deepEarth, lineHeight: 1.6,
                  fontWeight: 300,
                }}>{item.text}</span>
              </label>
            ))}
            <div style={{
              marginTop: 32, padding: 24,
              background: "rgba(212, 168, 83, 0.06)",
              borderRadius: 16, textAlign: "center",
            }}>
              <p style={{
                fontFamily: tokens.fonts.serif, fontSize: 14,
                color: tokens.colors.amber, lineHeight: 1.6,
                fontStyle: "italic",
              }}>
                This memorial will be active for 30 days.
                You may renew annually for $20 to keep this legacy alive.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      position: "relative", zIndex: 1, minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px 24px 80px",
    }}>
      {/* Progress indicator */}
      <div
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Step ${step + 1} of ${steps.length}`}
        style={{
          position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 8, zIndex: 50,
          opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease",
        }}
      >
        {steps.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 32 : 8, height: 3,
            borderRadius: 2,
            background: i <= step ? tokens.colors.gold : tokens.colors.warmSand,
            transition: "all 0.5s ease",
          }} />
        ))}
      </div>

      <div style={{
        width: "100%", maxWidth: 600,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease",
        textAlign: "center",
      }}>
        <div key={step} style={{ animation: "fadeInUp 0.5s ease", marginBottom: 48 }}>
          <p style={{
            fontFamily: tokens.fonts.body, fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: tokens.colors.amber, marginBottom: 16,
          }}>Step {step + 1} of {steps.length}</p>
          <h2 style={{
            fontFamily: tokens.fonts.display, fontSize: "clamp(28px, 5vw, 36px)",
            fontWeight: 400, fontStyle: "italic",
            color: tokens.colors.bark, marginBottom: 8,
          }}>{steps[step].title}</h2>
          <p style={{
            fontFamily: tokens.fonts.serif, fontSize: 16,
            color: tokens.colors.deepEarth, fontWeight: 300,
            fontStyle: "italic",
          }}>{steps[step].subtitle}</p>
        </div>

        <div key={`content-${step}`} style={{ animation: "fadeInUp 0.5s ease 0.1s", opacity: 0, animationFillMode: "forwards" }}>
          {renderStep()}
        </div>

        <div style={{
          display: "flex", justifyContent: "center", gap: 16,
          marginTop: 56, flexWrap: "wrap",
        }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{
              fontFamily: tokens.fonts.body, fontSize: 14,
              color: tokens.colors.deepEarth,
              background: "transparent",
              border: `1px solid ${tokens.colors.warmSand}`,
              borderRadius: 100, padding: "14px 36px",
              cursor: "pointer", transition: "all 0.3s ease",
            }}>Back</button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              style={{
                fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 500,
                color: canProceed() ? tokens.colors.night : tokens.colors.warmSand,
                background: canProceed()
                  ? `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`
                  : "rgba(212, 168, 83, 0.15)",
                border: "none", borderRadius: 100, padding: "14px 36px",
                cursor: canProceed() ? "pointer" : "default",
                transition: "all 0.4s ease",
              }}
            >Continue</button>
          ) : (
            <button
              onClick={() => canProceed() && handleCreate()}
              disabled={!canProceed()}
              style={{
                fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 500,
                color: canProceed() ? tokens.colors.night : tokens.colors.warmSand,
                background: canProceed()
                  ? `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`
                  : "rgba(212, 168, 83, 0.15)",
                border: "none", borderRadius: 100, padding: "14px 40px",
                cursor: canProceed() ? "pointer" : "default",
                transition: "all 0.4s ease",
                boxShadow: canProceed() ? "0 4px 20px rgba(212, 168, 83, 0.3)" : "none",
              }}
            >
              Create Memorial
            </button>
          )}
        </div>

        {/* All fields are now required — no skip button */}
      </div>
    </div>
  );
};

// âââ EXPLORE VIEW ââââââââââââââââââââââââââââââââââââââââ
const ExploreView = ({ setView, setSelectedMemorial }: { setView: (v: string) => void; setSelectedMemorial: (m: any) => void }) => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? sampleMemorials
    : sampleMemorials.filter(m =>
        filter === "Diaspora" ? m.parish.startsWith("Diaspora") : m.parish === filter
      );

  return (
    <div style={{
      position: "relative", zIndex: 1, minHeight: "100vh",
      padding: "140px 24px 100px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{
            fontFamily: tokens.fonts.body, fontSize: 11,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: tokens.colors.amber, marginBottom: 16,
          }}>The Garden of Memory</p>
          <h1 style={{
            fontFamily: tokens.fonts.display, fontSize: "clamp(32px, 5vw, 42px)",
            fontWeight: 400, fontStyle: "italic",
            color: tokens.colors.bark, marginBottom: 16,
          }}>Explore Memorials</h1>
          <p style={{
            fontFamily: tokens.fonts.serif, fontSize: 17,
            color: tokens.colors.deepEarth, fontWeight: 300,
            fontStyle: "italic", maxWidth: 500, margin: "0 auto",
          }}>
            Visit the memorials of those remembered here. Each page is a sacred space.
          </p>
        </div>

        {/* Filter */}
        <div role="tablist" aria-label="Filter memorials by location" style={{
          display: "flex", justifyContent: "center", gap: 12,
          marginBottom: 48, flexWrap: "wrap",
        }}>
          {["All", "Kingston", "St. Elizabeth", "Portland", "Diaspora"].map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: tokens.fonts.body, fontSize: 12,
                letterSpacing: "0.03em",
                color: filter === f ? tokens.colors.night : tokens.colors.deepEarth,
                background: filter === f ? tokens.colors.gold : "rgba(255,255,255,0.5)",
                border: `1px solid ${filter === f ? tokens.colors.gold : tokens.colors.warmSand}`,
                borderRadius: 100, padding: "8px 20px",
                cursor: "pointer", transition: "all 0.3s ease",
              }}
            >{f}</button>
          ))}
        </div>

        {/* Memorial list */}
        <div role="list" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {filtered.map((memorial, i) => (
            <button key={memorial.id}
              role="listitem"
              onClick={() => { setSelectedMemorial(memorial); setView("memorial"); }}
              aria-label={`View memorial for ${memorial.name}, ${memorial.years}, ${memorial.parish}`}
              style={{
                display: "flex", alignItems: "center", gap: 24,
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(212, 168, 83, 0.1)",
                borderRadius: 20, padding: "20px 24px",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.4s ease",
                animation: "fadeInUp 0.6s ease forwards",
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                flexWrap: "wrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(107, 76, 59, 0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <PhotoPlaceholder name={memorial.name} size={72} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <h3 style={{
                  fontFamily: tokens.fonts.display, fontSize: "clamp(18px, 3vw, 22px)",
                  fontWeight: 400, fontStyle: "italic",
                  color: tokens.colors.bark,
                }}>{memorial.name}</h3>
                <p style={{
                  fontFamily: tokens.fonts.serif, fontSize: 14,
                  color: tokens.colors.amber, fontWeight: 300,
                  margin: "2px 0 8px",
                }}>{memorial.years} &middot; {memorial.parish}</p>
                <p style={{
                  fontFamily: tokens.fonts.serif, fontSize: 14,
                  color: tokens.colors.deepEarth,
                  fontStyle: "italic", fontWeight: 300,
                  lineHeight: 1.5,
                }}>{memorial.tribute}</p>
              </div>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4,
                minWidth: 80,
              }}>
                <span style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.warmSand }}>
                  {memorial.candles} candles
                </span>
                <span style={{ fontFamily: tokens.fonts.body, fontSize: 11, color: tokens.colors.warmSand }}>
                  {memorial.flowers} flowers
                </span>
              </div>
              <Icons.ChevronRight size={20} color={tokens.colors.warmSand} />
            </button>
          ))}
          {filtered.length === 0 && (
            <p style={{
              textAlign: "center",
              fontFamily: tokens.fonts.serif, fontSize: 16,
              color: tokens.colors.warmSand, fontStyle: "italic",
              padding: 40,
            }}>No memorials found for this location.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// âââ ABOUT VIEW ââââââââââââââââââââââââââââââââââââââââââ
const AboutView = () => (
  <div style={{
    position: "relative", zIndex: 1, minHeight: "100vh",
    padding: "160px 24px 100px",
    display: "flex", justifyContent: "center",
  }}>
    <article style={{ maxWidth: 600, textAlign: "center" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center", gap: 12,
          marginBottom: 24,
        }}>
          <div style={{
            borderRadius: 5, overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            display: "flex", alignItems: "center",
          }}>
            <Icons.JamaicaFlag size={40} />
          </div>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icons.Dove size={28} color={tokens.colors.night} />
          </div>
        </div>
        <h1 style={{
          fontFamily: tokens.fonts.display, fontSize: "clamp(32px, 5vw, 40px)",
          fontWeight: 400, fontStyle: "italic",
          color: tokens.colors.bark, marginBottom: 24,
        }}>About Jamaica Roots</h1>
      </div>

      <div style={{ textAlign: "left" }}>
        {[
          {
            title: "Our Purpose",
            text: "Jamaica Roots is a digital heritage sanctuary \u2014 a sacred space where the memories of loved ones are preserved with the dignity, warmth, and reverence they deserve. We are not a social media platform. We are a living archive of Jamaican families and their stories."
          },
          {
            title: "Heritage Technology",
            text: "Every design decision answers one question: Does this honor the person being remembered? We believe that technology, when built with care, can preserve the intergenerational connections that make us who we are."
          },
          {
            title: "The Diaspora Connection",
            text: "From Kingston to London, New York to Toronto, Miami to Birmingham \u2014 wherever Jamaicans have planted roots, their memories deserve a home. Jamaica Roots quietly connects our global community through shared remembrance."
          },
          {
            title: "Privacy & Trust",
            text: "Your memories are sacred. We operate with a privacy-first philosophy: no intrusive advertising, no algorithmic manipulation, no popularity metrics. Every memorial is treated with archival dignity and care."
          },
          {
            title: "Our Vision",
            text: "We are building what could one day become the digital national memory space of Jamaica. Not trendy. Not temporary. Timeless."
          },
        ].map((section, i) => (
          <div key={i} style={{
            marginBottom: 40,
            animation: "fadeInUp 0.6s ease forwards",
            animationDelay: `${0.1 + i * 0.1}s`,
            opacity: 0,
          }}>
            <h3 style={{
              fontFamily: tokens.fonts.display, fontSize: 22,
              fontWeight: 400, fontStyle: "italic",
              color: tokens.colors.bark, marginBottom: 12,
            }}>{section.title}</h3>
            <p style={{
              fontFamily: tokens.fonts.serif, fontSize: 16,
              lineHeight: 1.8, color: tokens.colors.deepEarth,
              fontWeight: 300,
            }}>{section.text}</p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 40, padding: 32,
        background: "rgba(212, 168, 83, 0.06)",
        borderRadius: 20,
        border: "1px solid rgba(212, 168, 83, 0.1)",
      }}>
        <blockquote style={{
          fontFamily: tokens.fonts.display, fontSize: 20,
          fontStyle: "italic", color: tokens.colors.bark,
          lineHeight: 1.6, border: "none", padding: 0, margin: 0,
        }}>
          &ldquo;Every design decision should answer:<br />
          Does this honor the person being remembered?&rdquo;
        </blockquote>
        <p style={{
          fontFamily: tokens.fonts.body, fontSize: 12,
          color: tokens.colors.amber, marginTop: 16,
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>Our North Star Principle</p>
      </div>
    </article>
  </div>
);
// ═══════════════════ SPLASH OVERLAY ═══════════════════════════════════════════
const SplashOverlay = ({ onEnter }: { onEnter: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const handleEnter = () => {
    setFading(true);
    onEnter();
    setTimeout(() => setVisible(false), 800);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #1A1410 0%, #2C1810 50%, #1A1410 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.8s ease",
    }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 32px", boxShadow: "0 8px 40px rgba(212, 168, 83, 0.3)",
        }}>
          <Icons.Candle size={36} color={tokens.colors.night} />
        </div>
        <h1 style={{
          fontFamily: tokens.fonts.display, fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 400, fontStyle: "italic",
          color: tokens.colors.parchment, marginBottom: 16,
          lineHeight: 1.3,
        }}>Jamaica Roots Memorial</h1>
        <p style={{
          fontFamily: tokens.fonts.serif, fontSize: 16,
          color: "rgba(255,255,255,0.6)", fontWeight: 300,
          fontStyle: "italic", marginBottom: 48, lineHeight: 1.7,
        }}>A sacred space to honor those who came before us</p>
        <button onClick={handleEnter} style={{
          fontFamily: tokens.fonts.body, fontSize: 15, fontWeight: 500,
          color: tokens.colors.night, letterSpacing: "0.1em", textTransform: "uppercase",
          background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
          border: "none", borderRadius: 100, padding: "16px 48px",
          cursor: "pointer", transition: "all 0.3s ease",
          boxShadow: "0 4px 24px rgba(212, 168, 83, 0.4)",
        }}>Enter</button>
        <p style={{
          fontFamily: tokens.fonts.body, fontSize: 11,
          color: "rgba(255,255,255,0.35)", marginTop: 24,
          letterSpacing: "0.05em",
        }}>Music will play when you enter</p>
      </div>
    </div>
  );
};

// ═══════════════════ AUTH SCREEN ══════════════════════════════════════════════
const AuthScreen = ({ onAuth }: { onAuth: (user: { email: string; name: string }) => void }) => {
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", marginBottom: 16,
    fontFamily: tokens.fonts.body, fontSize: 15,
    color: tokens.colors.bark, background: "rgba(255,255,255,0.06)",
    border: `1px solid ${tokens.colors.warmSand}40`,
    borderRadius: 8, outline: "none",
    transition: "border-color 0.3s ease",
  };

  const handleLogin = () => {
    setError("");
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    const users = getUsers();
    const user = users[email.toLowerCase()];
    if (!user || user.password !== password) { setError("Invalid email or password."); return; }
    onAuth({ email: user.email, name: user.name });
  };

  const handleRegister = () => {
    setError("");
    if (!email.trim() || !password.trim() || !name.trim()) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const users = getUsers();
    if (users[email.toLowerCase()]) { setError("An account with this email already exists."); return; }
    users[email.toLowerCase()] = { email: email.toLowerCase(), password, name };
    saveUsers(users);
    onAuth({ email: email.toLowerCase(), name });
  };

  const handleReset = () => {
    setError(""); setSuccess("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    const users = getUsers();
    if (!users[email.toLowerCase()]) { setError("No account found with this email."); return; }
    setSuccess("Password reset instructions have been sent to " + email + ". Please check your inbox.");
  };

  return (
    <div style={{
      position: "relative", zIndex: 1, minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: 400, width: "100%", textAlign: "center",
        background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)",
        borderRadius: 16, padding: "48px 32px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <Icons.Candle size={24} color={tokens.colors.night} />
        </div>

        <h2 style={{
          fontFamily: tokens.fonts.display, fontSize: 26,
          fontWeight: 400, fontStyle: "italic",
          color: tokens.colors.bark, marginBottom: 8,
        }}>
          {mode === "login" ? "Welcome Back" : mode === "register" ? "Create Account" : "Reset Password"}
        </h2>
        <p style={{
          fontFamily: tokens.fonts.serif, fontSize: 14,
          color: tokens.colors.deepEarth, fontWeight: 300,
          fontStyle: "italic", marginBottom: 32,
        }}>
          {mode === "login" ? "Sign in to honor your loved ones" :
           mode === "register" ? "Join us in remembrance" :
           "We will send reset instructions to your email"}
        </p>

        {error && <p style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: "#c0392b", marginBottom: 16, padding: "10px 12px", background: "rgba(192,57,43,0.1)", borderRadius: 8 }}>{error}</p>}
        {success && <p style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: "#27ae60", marginBottom: 16, padding: "10px 12px", background: "rgba(39,174,96,0.1)", borderRadius: 8 }}>{success}</p>}

        {mode === "register" && (
          <input type="text" placeholder="Your full name" value={name}
            onChange={e => setName(e.target.value)} style={inputStyle} />
        )}
        <input type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)} style={inputStyle} />
        {mode !== "reset" && (
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} style={inputStyle}
            onKeyDown={e => { if (e.key === "Enter") { mode === "login" ? handleLogin() : handleRegister(); } }} />
        )}

        <button
          onClick={mode === "login" ? handleLogin : mode === "register" ? handleRegister : handleReset}
          style={{
            width: "100%", padding: "14px 0", marginTop: 8,
            fontFamily: tokens.fonts.body, fontSize: 14, fontWeight: 500,
            color: tokens.colors.night, letterSpacing: "0.05em",
            background: `linear-gradient(135deg, ${tokens.colors.gold}, ${tokens.colors.amber})`,
            border: "none", borderRadius: 100, cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(212, 168, 83, 0.3)",
          }}>
          {mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : "Send Reset Link"}
        </button>

        <div style={{ marginTop: 24 }}>
          {mode === "login" && (<>
            <button onClick={() => { setMode("register"); setError(""); setSuccess(""); }}
              style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.amber, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
              Create an account
            </button><br />
            <button onClick={() => { setMode("reset"); setError(""); setSuccess(""); }}
              style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.warmSand, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, marginTop: 8 }}>
              Forgot password?
            </button>
          </>)}
          {(mode === "register" || mode === "reset") && (
            <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
              style={{ fontFamily: tokens.fonts.body, fontSize: 13, color: tokens.colors.amber, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


// âââ MAIN APP ââââââââââââââââââââââââââââââââââââââââââââ
export default function JamaicaRoots() {
  const [view, setView] = useState("home");
  const [selectedMemorial, setSelectedMemorial] = useState(sampleMemorials[0]);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const isDark = view === "memorial";
  const bgVariant = view === "memorial" ? "memorial" : view === "create" ? "create" : "default";

  // Restore session on mount
  useEffect(() => {
    const s = getSession();
    if (s) setUser(s);
  }, []);

  // Initialize audio on mount
  useEffect(() => {
    const audio = new Audio(AUDIO_DATA_URI);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Play/pause based on soundOn toggle
  useEffect(() => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [soundOn]);

  const handleEnterSite = () => {
    setEntered(true);
    setSoundOn(true);
  };

  const handleAuth = (u: { email: string; name: string }) => {
    setUser(u);
    setSession(u);
  };

  const handleLogout = () => {
    setUser(null);
    setSession(null);
    setView("home");
  };

  // Intercept create view — require auth
  const handleSetView = (v: string) => {
    if (v === "create" && !user) {
      setView("auth");
      return;
    }
    setView(v);
  };

  return (
    <div style={{
      fontFamily: tokens.fonts.body,
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* Splash overlay — shown before user enters */}
      {!entered && <SplashOverlay onEnter={handleEnterSite} />}

      <GrainOverlay />
      <SacredBackground variant={bgVariant} />
      <Navigation currentView={view} setView={handleSetView} dark={isDark} />

      <main>
        <div key={view} style={{ animation: "fadeIn 0.6s ease" }}>
          {view === "home" && <HomeView setView={handleSetView} setSelectedMemorial={setSelectedMemorial} />}
          {view === "memorial" && <MemorialView memorial={selectedMemorial} setView={handleSetView} />}
          {view === "create" && <CreateView setView={handleSetView} setSelectedMemorial={setSelectedMemorial} />}
          {view === "explore" && <ExploreView setView={handleSetView} setSelectedMemorial={setSelectedMemorial} />}
          {view === "about" && <AboutView />}
          {view === "auth" && <AuthScreen onAuth={(u) => { handleAuth(u); setView("create"); }} />}
        </div>
      </main>

      {/* User info / Logout button */}
      {user && (
        <div style={{
          position: "fixed", top: 16, right: 16, zIndex: 100,
          display: "flex", alignItems: "center", gap: 12,
          background: "rgba(26,20,16,0.8)", backdropFilter: "blur(10px)",
          borderRadius: 100, padding: "6px 16px 6px 16px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <span style={{
            fontFamily: tokens.fonts.body, fontSize: 12,
            color: tokens.colors.gold, letterSpacing: "0.03em",
          }}>{user.name}</span>
          <button onClick={handleLogout} style={{
            fontFamily: tokens.fonts.body, fontSize: 11,
            color: "rgba(255,255,255,0.4)", background: "none",
            border: "none", cursor: "pointer", textDecoration: "underline",
            textUnderlineOffset: 2,
          }}>Sign out</button>
        </div>
      )}

      {/* Global Sound Toggle */}
      <button
        onClick={() => setSoundOn(!soundOn)}
        aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
        aria-pressed={soundOn}
        style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 100,
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
      >
        <Icons.Music size={18} color={soundOn ? tokens.colors.gold : "rgba(255,255,255,0.4)"} />
      </button>
      {soundOn && (
        <div aria-live="polite" style={{
          position: "fixed", bottom: 86, right: 32, zIndex: 100,
          background: "rgba(26,20,16,0.9)", backdropFilter: "blur(10px)",
          borderRadius: 12, padding: "12px 16px",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "fadeIn 0.3s ease",
        }}>
          <p style={{
            fontFamily: tokens.fonts.body, fontSize: 11,
            color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em",
          }}>Ambient Soundscape Playing</p>
        </div>
      )}
    </div>
  );
}
