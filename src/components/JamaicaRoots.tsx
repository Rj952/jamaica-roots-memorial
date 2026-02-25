"use client";

import { useState, useEffect, useMemo, useRef } from "react";

// âââ DESIGN TOKENS âââââââââââââââââââââââââââââââââââââ
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
const sampleMemorials = [
  {
    id: 1,
    name: "Icilda May Thompson",
    years: "1934 \u2013 2024",
    parish: "St. Elizabeth",
    tribute: "A pillar of grace who taught us that love is the only legacy that matters. Her garden still blooms.",
    photo: null,
    candles: 47,
    flowers: 23,
    visitors: 312,
  },
  {
    id: 2,
    name: "Desmond Carlton Wright",
    years: "1948 \u2013 2023",
    parish: "Portland",
    tribute: "Fisherman, father, storyteller. The sea remembers your songs, Papa.",
    photo: null,
    candles: 89,
    flowers: 41,
    visitors: 584,
  },
  {
    id: 3,
    name: "Marcia Elaine Brooks",
    years: "1955 \u2013 2024",
    parish: "Diaspora \u2013 United Kingdom",
    tribute: "From Chapelton to Brixton, you carried Jamaica in your heart. Rest now, Mama.",
    photo: null,
    candles: 156,
    flowers: 78,
    visitors: 1247,
  },
];

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
            of those who shaped us â rooted in Jamaican heritage,
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
            Jamaica Roots is not a social media platform. It is a living archive â
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
          From Kingston to London, New York to Toronto â wherever
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
        }}>Heritage Technology â Preserving memory with dignity.</p>
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
  const [soundOn, setSoundOn] = useState(false);
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

      {/* Sound toggle */}
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
  const [loaded, setLoaded] = useState(false);

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
      case 1: return formData.passingYear.trim().length > 0;
      case 2: return true;
      case 3: return true;
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

        {step === 2 && (
          <button onClick={() => setStep(step + 1)} style={{
            fontFamily: tokens.fonts.body, fontSize: 13,
            color: tokens.colors.warmSand,
            background: "none", border: "none",
            cursor: "pointer", marginTop: 16,
            textDecoration: "underline", textUnderlineOffset: 3,
          }}>Skip this step</button>
        )}
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

// âââ MAIN APP ââââââââââââââââââââââââââââââââââââââââââââ
export default function JamaicaRoots() {
  const [view, setView] = useState("home");
  const [selectedMemorial, setSelectedMemorial] = useState(sampleMemorials[0]);

  const isDark = view === "memorial";
  const bgVariant = view === "memorial" ? "memorial" : view === "create" ? "create" : "default";

  return (
    <div style={{
      fontFamily: tokens.fonts.body,
      minHeight: "100vh",
      position: "relative",
      overflowX: "hidden",
    }}>
      <GrainOverlay />
      <SacredBackground variant={bgVariant} />
      <Navigation currentView={view} setView={setView} dark={isDark} />

      <main>
        <div key={view} style={{ animation: "fadeIn 0.6s ease" }}>
          {view === "home" && <HomeView setView={setView} setSelectedMemorial={setSelectedMemorial} />}
          {view === "memorial" && <MemorialView memorial={selectedMemorial} setView={setView} />}
          {view === "create" && <CreateView setView={setView} setSelectedMemorial={setSelectedMemorial} />}
          {view === "explore" && <ExploreView setView={setView} setSelectedMemorial={setSelectedMemorial} />}
          {view === "about" && <AboutView />}
        </div>
      </main>
    </div>
  );
                       }
