import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Globe2,
  Instagram,
  Linkedin,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Ship,
  Sparkles,
  UserRound,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  isAdminAuthenticated,
  isLoginLockedOut,
  loginAdmin,
  logoutAdmin,
  subscribeToAuth,
} from "../lib/auth";
import { navLinks } from "../lib/nav";

export function MonogramLogo({ light = true }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none select-none shrink-0"
      aria-label="Confident Textiles Machinery Home"
    >
      {/* Precision Geometric Textile & Machinery Emblem */}
      <div className="relative flex size-8 sm:size-10 2xl:size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#DFBA6F] via-[#C5A059] to-[#8C4331] p-0.5 shadow-lg shadow-[#C5A059]/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#C5A059]/40 shrink-0">
        <div className="flex size-full items-center justify-center rounded-[10px] bg-[#161210]">
          <svg viewBox="0 0 32 32" className="size-5 sm:size-6 2xl:size-7" fill="none">
            {/* Outer Diamond Loom Frame */}
            <path
              d="M16 2L30 16L16 30L2 16L16 2Z"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className="opacity-80"
            />
            {/* Precision Warp & Weft Grid Lines */}
            <path
              d="M8 10L24 22M8 22L24 10"
              stroke="#C5A059"
              strokeWidth="1"
              strokeDasharray="1.5 1.5"
              className="opacity-50"
            />
            {/* Interlocking Monogram 'C' for Confident */}
            <path
              d="M21 11.5C19.5 9.5 16.5 9 14 10.5C11.5 12 10.5 15 11 18C11.5 21 14 23 17 22.5C19.5 22 21 20 21 20"
              stroke="#FAF7F2"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Central Spindle Pivot */}
            <circle cx="16" cy="16" r="2" fill="#C5A059" />
            <circle cx="16" cy="16" r="3.5" stroke="#C5A059" strokeWidth="0.75" className="opacity-70" />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="goldGradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#DFBA6F" />
                <stop offset="0.5" stopColor="#C5A059" />
                <stop offset="1" stopColor="#9E4E39" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand title — architectural flush lockup */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif text-[14px] sm:text-[18px] 2xl:text-[22px] font-bold tracking-[0.12em] sm:tracking-[0.16em] uppercase leading-none transition-colors ${
            light ? "text-[#FAF7F2] group-hover:text-[#C5A059]" : "text-[#161210] group-hover:text-[#C5A059]"
          }`}
        >
          CONFIDENT
        </span>
        <span className="mt-0.5 sm:mt-1 font-mono text-[6.5px] sm:text-[8.5px] 2xl:text-[10px] font-bold tracking-[0.18em] sm:tracking-[0.28em] text-[#C5A059] uppercase leading-none">
          TEXTILES MACHINERY
        </span>
      </div>
    </Link>
  );
}

export function AdminAuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(isAdminAuthenticated());

  useEffect(() => {
    return subscribeToAuth((auth) => setIsAuth(auth));
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const lockout = isLoginLockedOut();
    if (lockout.locked) {
      setError(`Security Lockout: Retry in ${lockout.remainingSeconds}s.`);
      return;
    }

    const success = loginAdmin(adminId, password);
    if (success) {
      setError("");
      setAdminId("");
      setPassword("");
      onClose();
    } else {
      const updatedLockout = isLoginLockedOut();
      if (updatedLockout.locked) {
        setError("Security Lockout: Too many failed attempts. Locked for 5 minutes.");
      } else {
        setError("Invalid Admin ID or Password. Access restricted.");
      }
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-150" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-16 sm:top-20 right-2.5 sm:right-6 lg:right-10 w-[calc(100vw-1.25rem)] sm:w-[390px] max-h-[85vh] overflow-y-auto rounded-2xl border border-[#C5A059]/50 border-t-[#FAF7F2]/30 bg-[#161210]/95 backdrop-blur-md p-5 sm:p-6 text-[#FAF7F2] shadow-[0_16px_48px_rgba(0,0,0,0.85)] ring-1 ring-white/10 animate-in fade-in slide-in-from-top-3 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-white/10 transition cursor-pointer"
          aria-label="Close popup"
        >
          <X size={16} />
        </button>

        {isAuth ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-[#C5A059]/20 pb-4">
              <div className="flex size-10 items-center justify-center rounded-none bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#C5A059] font-bold block">
                  AUTHENTICATED ADMIN
                </span>
                <h3 className="text-base sm:text-lg font-bold font-serif text-[#FAF7F2]">Ariana Salim</h3>
                <span className="text-[11px] text-[#FAF7F2]/60 font-mono break-all">admin@confidenttextiles.com</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-[#FAF7F2]/80 bg-[#1E1916] p-3 rounded-none border border-[#C5A059]/20">
              <div className="flex justify-between">
                <span className="text-[#C5A059]">ROLE:</span>
                <span>Super Administrator</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C5A059]">CLEARANCE:</span>
                <span className="text-emerald-400">Full Access · Level 5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C5A059]">STATUS:</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Session
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <Link
                to="/admin"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-none bg-[#C5A059] py-2.5 text-xs font-bold font-mono tracking-wider uppercase text-[#161210] hover:bg-[#FAF7F2] transition shadow-md"
              >
                <span>OPEN ADMIN DASHBOARD</span>
                <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-none border border-[#9E4E39]/40 bg-[#9E4E39]/10 py-2 text-xs font-mono font-bold tracking-wider uppercase text-[#FAF7F2] hover:bg-[#9E4E39] transition cursor-pointer"
              >
                <LogOut size={13} />
                <span>LOG OUT OF ADMIN</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left border-b border-[#C5A059]/20 pb-3">
              <div className="flex items-center gap-1.5 text-[#C5A059]">
                <Lock size={14} />
                <span className="font-mono text-[9px] tracking-[0.25em] font-bold uppercase">
                  RESTRICTED ADMIN PORTAL
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#FAF7F2]">Admin Authentication</h3>
              <p className="text-[11px] text-[#FAF7F2]/60">
                Only verified administrators can access the control panel.
              </p>
            </div>

            {error && (
              <div className="rounded-none border border-[#9E4E39]/50 bg-[#9E4E39]/15 p-2.5 text-xs text-rose-200 font-mono">
                {error}
              </div>
            )}

            <div className="space-y-2.5 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-[#C5A059] uppercase block font-bold">
                  Admin ID
                </label>
                <input
                  type="text"
                  required
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Enter admin ID…"
                  className="w-full rounded-none bg-[#1E1916] border border-[#C5A059]/30 px-3 py-2 text-sm sm:text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-[#C5A059] uppercase block font-bold">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-none bg-[#1E1916] border border-[#C5A059]/30 px-3 py-2 text-sm sm:text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/30 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-none bg-[#C5A059] py-2.5 text-xs font-bold font-mono tracking-wider uppercase text-[#161210] hover:bg-[#FAF7F2] transition shadow-md shadow-[#C5A059]/20 mt-3 cursor-pointer"
            >
              <span>AUTHENTICATE & ENTER</span>
              <ArrowRight size={14} />
            </button>

            <div className="rounded-none bg-[#1F1916]/80 p-2 border border-[#C5A059]/15 text-[10px] font-mono text-[#FAF7F2]/60 text-center">
              <span>Credentials: ID: <strong className="text-[#C5A059]">admin</strong> | Pass: <strong className="text-[#C5A059]">admin123</strong></span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setIsAuth(isAdminAuthenticated());
    return subscribeToAuth((auth) => setIsAuth(auth));
  }, []);

  // Throttled scroll listener to avoid unnecessary state triggers
  useEffect(() => {
    let last = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== last) {
        last = isScrolled;
        setScrolled(isScrolled);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-2.5 sm:inset-x-6 lg:inset-x-8 top-2.5 sm:top-5 z-50 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] mx-auto pointer-events-none transition-all duration-300 ${
          scrolled ? "top-1.5 sm:top-3.5 scale-[0.99]" : ""
        }`}
      >
        <div
          style={{ transform: "translateZ(0)" }}
          className={`pointer-events-auto rounded-2xl bg-[#161210]/90 backdrop-blur-md border border-[#C5A059]/40 border-t-[#FAF7F2]/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.65)] ring-1 ring-white/10 px-3.5 sm:px-6 2xl:px-8 py-2 sm:py-2.5 2xl:py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "bg-[#161210]/95 border-[#C5A059]/60 border-t-[#FAF7F2]/40 shadow-[0_12px_40px_0_rgba(0,0,0,0.85)] py-1.5 sm:py-2" : ""
          }`}
        >
          {/* Left: Monogram Logo */}
          <div className="shrink-0">
            <MonogramLogo light />
          </div>

          {/* Center: Desktop Navigation Links (balanced & centered in capsule) */}
          <nav className="hidden items-center justify-center gap-1 xl:gap-1.5 2xl:gap-2.5 lg:flex mx-auto" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 sm:px-3.5 2xl:px-4 py-1.5 2xl:py-2 rounded-xl text-xs 2xl:text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/50 backdrop-blur-md font-bold shadow-xs shadow-[#C5A059]/10"
                      : "text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-[#C5A059]/15 border border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Profile Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 2xl:gap-3.5 shrink-0">
            {/* Profile / Admin Button */}
            {isAuth ? (
              <Link
                to="/admin"
                className="group relative flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-[#C5A059] bg-[#C5A059]/25 text-[#C5A059] shadow-sm shadow-[#C5A059]/25 font-bold transition-all duration-200 px-2.5 sm:px-3.5 2xl:px-4 py-1.5 2xl:py-2 text-xs 2xl:text-sm font-mono cursor-pointer"
                title="Admin Dashboard (Online)"
                aria-label="Admin Dashboard"
              >
                <div className="relative flex size-5 sm:size-6 items-center justify-center rounded-md bg-[#C5A059] text-[#161210] font-bold text-[9px] sm:text-[10px] 2xl:text-xs">
                  AS
                </div>
                <span className="hidden sm:inline tracking-wider font-semibold">ADMIN</span>
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </Link>
            ) : (
              <Link
                to="/profile"
                className="group relative flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-[#C5A059]/40 bg-[#1E1916]/80 text-[#FAF7F2] hover:border-[#C5A059] hover:bg-[#C5A059]/20 hover:text-[#FAF7F2] transition-all duration-200 px-2.5 sm:px-3.5 2xl:px-4 py-1.5 2xl:py-2 text-xs 2xl:text-sm font-mono cursor-pointer shadow-xs"
                title="Owner & Leadership Profile"
                aria-label="Owner & Leadership Profile"
              >
                <UserRound size={14} className="text-[#C5A059] 2xl:size-4" />
                <span className="hidden sm:inline tracking-wider font-semibold">PROFILE</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-8 sm:size-9 items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#1E1916]/80 text-[#FAF7F2] transition-colors hover:bg-[#C5A059]/20 lg:hidden cursor-pointer"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation drawer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with square corners and rich glassmorphism */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-[62px] sm:top-[74px] inset-x-2.5 sm:inset-x-6 max-w-7xl mx-auto rounded-2xl border border-[#C5A059]/40 border-t-[#FAF7F2]/25 bg-[#161210]/95 backdrop-blur-md p-5 sm:p-6 text-[#FAF7F2] shadow-[0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-white/10 max-h-[calc(100vh-5.5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-3 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#C5A059]/25 pb-3 sm:pb-4 flex items-center justify-between">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#C5A059] font-bold">
                [ DIRECTORY · CONFIDENT TEXTILES MACHINERY ]
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[#FAF7F2]/70 hover:text-[#FAF7F2] p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="my-4 sm:my-5 flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const isActive = currentPath === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3 border transition-all duration-200 ${
                      isActive
                        ? "bg-[#C5A059]/25 text-[#C5A059] border-[#C5A059]/60 backdrop-blur-md shadow-xs shadow-[#C5A059]/20"
                        : "border-transparent text-[#FAF7F2]/90 hover:bg-[#FAF7F2]/10 hover:border-[#C5A059]/30 hover:text-[#FAF7F2]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs text-[#C5A059] font-bold">0{idx + 1}</span>
                      <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider group-hover:text-[#C5A059] transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-[#C5A059] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-4 pt-4 border-t border-[#C5A059]/25">
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#C5A059] bg-gradient-to-r from-[#DFBA6F] via-[#C5A059] to-[#9E4E39] py-3 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#161210] hover:brightness-110 transition-all shadow-lg shadow-black/60 cursor-pointer"
              >
                <Lock size={14} />
                <span>{isAuth ? "MANAGE ADMIN DASHBOARD" : "ADMIN CONTROL PORTAL"}</span>
              </Link>

              {/* Contact Details */}
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between bg-[#1E1916]/70 p-3 border border-[#C5A059]/25 rounded-xl">
                  <span className="text-[#C5A059] font-bold text-[10px] uppercase tracking-wider">Trade Desk</span>
                  <a href="mailto:contact@confidentmachinery.com" className="text-[#FAF7F2]/80 hover:text-[#C5A059] transition-colors text-[10px]">
                    contact@confidentmachinery.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MarqueeTicker() {
  const items = [
    "IMPORT & EXPORT EXECUTION",
    "DIRECT ORIGIN SOURCING",
    "MULTIMODAL FREIGHT LOGISTICS",
    "HIGH-PRECISION TEXTILE MACHINERY",
    "GLOBAL COMMERCE NETWORK",
    "RIGOROUS TECHNICAL INSPECTION",
    "BORDER & CUSTOMS COORDINATION",
    "ESTABLISHED 2012",
  ];

  return (
    <div className="relative overflow-hidden border-y border-[#C5A059]/30 bg-[#161210] py-3 text-[#FAF7F2]">
      <div className="animate-ticker flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-mono text-[11px] font-medium tracking-[0.24em] text-[#EBE3D3] uppercase">
              {text}
            </span>
            <span className="size-1.5 rotate-45 bg-[#C5A059]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SectionLabel({
  children,
  dark = false,
  number,
}: {
  children: ReactNode;
  dark?: boolean;
  number?: string | undefined;
}) {
  return (
    <div className="flex items-center gap-3">
      {number && <span className="font-mono text-[11px] font-bold text-[#C5A059]">[{number}]</span>}
      <span className="h-px w-6 bg-[#C5A059]" />
      <span
        className={`font-mono text-[10px] font-bold tracking-[0.26em] uppercase ${
          dark ? "text-[#FAF7F2]/70" : "text-[#6B625B]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function EditorialHeading({
  title,
  subtitle,
  dark = false,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  dark?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`space-y-3 sm:space-y-4 ${centered ? "text-center mx-auto max-w-3xl 2xl:max-w-4xl" : "max-w-4xl 2xl:max-w-5xl"}`}>
      <h2
        className={`font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl leading-[1.08] ${
          dark ? "text-[#FAF7F2]" : "text-[#161210]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm sm:text-base 2xl:text-lg leading-relaxed ${
            dark ? "text-[#FAF7F2]/70" : "text-[#6B625B]"
          } ${centered ? "mx-auto max-w-2xl 2xl:max-w-3xl" : "max-w-2xl 2xl:max-w-3xl"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  categoryNumber,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  categoryNumber?: string;
}) {
  return (
    <section className="relative flex min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] items-end overflow-hidden bg-[#161210] pb-10 sm:pb-16 lg:pb-20 pt-28 sm:pt-36 lg:pt-44 text-[#FAF7F2]">
      {/* Background Image with warm editorial grading */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 size-full object-cover opacity-30 filter brightness-90 contrast-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#161210] via-[#161210]/60 to-transparent" />

      {/* Decorative vertical coordinate tag */}
      <div className="absolute right-6 lg:right-12 top-28 sm:top-36 hidden flex-col items-end gap-2 font-mono text-[10px] tracking-[0.25em] text-[#C5A059]/60 lg:flex">
        <span>LAT: 25°15' N</span>
        <span>LON: 55°18' E</span>
        <span className="h-10 w-px bg-[#C5A059]/30" />
        <span>CONFIDENT PORTFOLIO</span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 z-10">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <SectionLabel dark number={categoryNumber}>
            {eyebrow}
          </SectionLabel>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.12]">
            {title}
          </h1>
          <p className="max-w-2xl text-xs sm:text-base lg:text-lg leading-relaxed text-[#FAF7F2]/80 font-sans">
            {copy}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; subtitle: string; sections: { heading: string; body: string }[] }> = {
    carriage: {
      title: "TERMS OF CARRIAGE & MARITIME TRANSIT",
      subtitle: "Bilateral China–India Machinery Freight & Container Logistics Standard",
      sections: [
        {
          heading: "1. Ocean Bill of Lading & Carrier Allocation",
          body: "All maritime shipments from Chinese ports (Shanghai, Ningbo, Guangzhou, Qingdao) are booked with Tier-1 ocean container liners under direct liner bills of lading. Dedicated 40ft High Cube (HC) and Flat Rack containers are assigned based on machine frame dimensions.",
        },
        {
          heading: "2. Anti-Corrosion VCI Crating Mandate",
          body: "Prior to container stuffing, all bare metallic shafts, looms, and electronic drives undergo Volatile Corrosion Inhibitor (VCI) vacuum packaging, desiccants placement, and heavy ISPM-15 heat-treated timber reinforcement to withstand equatorial maritime humidity.",
        },
        {
          heading: "3. Demurrage & Detention Protection",
          body: "Confident arranges extended 14 to 21 free demurrage days at Indian discharge ports (Nhava Sheva, Mundra, Chennai, Tuticorin) to eliminate unexpected port holding charges while customs duty clearance and road dispatch are executed.",
        },
      ],
    },
    compliance: {
      title: "COMPLIANCE & PRE-SHIPMENT AUDIT PROTOCOLS",
      subtitle: "Engineering Verification Standard for Indian Textile Manufacturing",
      sections: [
        {
          heading: "1. Factory Floor Verification & 8-Hour Run Trial",
          body: "Confident technical inspectors verify machinery manufacturing licenses, component authenticity (servos, PLCs, inverters), and execute an uninterrupted 8-hour continuous run test using customer-specified yarn or fabric prior to export sign-off.",
        },
        {
          heading: "2. EPCG Scheme 0% Duty Facilitation",
          body: "We provide complete documentation aligning with India's Export Promotion Capital Goods (EPCG) scheme, enabling qualifying Indian textile mills to import state-of-the-art machinery at 0% basic customs duty against export obligations.",
        },
        {
          heading: "3. Electrical Grid & Voltage Synchronization",
          body: "All machine electrical panels, transformer units, and servo motor controllers are calibrated and certified for Indian three-phase 415V / 50Hz grid conditions to prevent harmonic distortion or voltage drops.",
        },
      ],
    },
    incoterms: {
      title: "INCOTERMS 2020 OPERATIONAL GUIDE",
      subtitle: "Standard Commercial Delivery Terminology for Bilateral Trade",
      sections: [
        {
          heading: "FOB — Free on Board (Chinese Origin Port)",
          body: "Supplier delivers machinery on board the vessel nominated by Confident at Shanghai or Ningbo. Export clearance is handled by the origin factory; maritime transit risk and freight are managed by Confident on behalf of the buyer.",
        },
        {
          heading: "CIF — Cost, Insurance and Freight (Indian Discharge Port)",
          body: "Confident manages origin handling, ocean freight booking, and marine cargo insurance up to arrival at Nhava Sheva, Mundra, or Chennai port. The Indian mill takes over for domestic customs clearance and inland trailer transit.",
        },
        {
          heading: "DDP / DAP — Delivered at Place (Mill Doorstep)",
          body: "Full turnkey door-to-door delivery: Confident handles Chinese factory pickup, ocean shipping, Indian customs clearance, GST/EPCG filing, and heavy low-bed trailer delivery directly to the mill gates in Surat, Tirupur, Coimbatore, or Ahmedabad.",
        },
      ],
    },
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-[#161210] text-[#FAF7F2] border-t border-[#C5A059]/20">
        {/* Background subtle warm glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A059]/5 to-[#161210] pointer-events-none" />

        <div className="relative mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center sm:text-left">
            {/* Brand & Tagline */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <MonogramLogo light />
              <div className="hidden sm:block h-6 w-px bg-[#C5A059]/20" />
              <p className="text-xs text-[#FAF7F2]/60 max-w-sm sm:max-w-md leading-relaxed">
                China–India Textile Machinery Sourcing, Factory Verification & Maritime Logistics.
              </p>
            </div>

            {/* Quick Nav Links */}
            <nav className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] sm:text-xs font-mono text-[#FAF7F2]/80">
              <Link to="/" className="hover:text-[#C5A059] transition-colors py-1 px-1.5">
                HOME
              </Link>
              <Link to="/about" className="hover:text-[#C5A059] transition-colors py-1 px-1.5">
                ABOUT
              </Link>
              <Link to="/products" className="hover:text-[#C5A059] transition-colors py-1 px-1.5">
                PRODUCTS
              </Link>
              <Link to="/network" className="hover:text-[#C5A059] transition-colors py-1 px-1.5">
                NETWORK
              </Link>
              <Link to="/industries" className="hover:text-[#C5A059] transition-colors py-1 px-1.5">
                INDUSTRIES
              </Link>
              <Link to="/profile" className="hover:text-[#C5A059] transition-colors py-1 px-1.5">
                OWNER PROFILE
              </Link>
              <Link to="/contact" className="hover:text-[#C5A059] transition-colors py-1 px-1.5">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* Bottom Sub-bar */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#C5A059]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] sm:text-[11px] font-mono text-[#FAF7F2]/50">
            <div className="text-center sm:text-left tracking-wider">
              © 2026 CONFIDENT TEXTILES MACHINERY · ALL RIGHTS RESERVED
            </div>
            {/* Policy Capsules linking to proper dedicated pages */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[#FAF7F2]/70">
              <Link
                to="/terms-of-carriage"
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 hover:border-[#C5A059] hover:text-[#C5A059] transition cursor-pointer"
              >
                Terms of Carriage
              </Link>
              <Link
                to="/compliance-protocols"
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 hover:border-[#C5A059] hover:text-[#C5A059] transition cursor-pointer"
              >
                Compliance Protocols
              </Link>
              <Link
                to="/incoterms-2020"
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 hover:border-[#C5A059] hover:text-[#C5A059] transition cursor-pointer"
              >
                Incoterms 2020
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy / Compliance Modal */}
      {activeModal && policyContent[activeModal] && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#C5A059]/40 bg-[#161210] p-6 sm:p-8 text-[#FAF7F2] shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#C5A059] font-bold tracking-[0.2em] uppercase block">
                  TRADE & COMPLIANCE DOSSIER
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2] mt-1">
                  {policyContent[activeModal].title}
                </h3>
                <p className="text-xs text-[#FAF7F2]/60 font-mono mt-0.5">
                  {policyContent[activeModal].subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-lg p-2 text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-white/10 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              {policyContent[activeModal].sections.map((sec, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-[#1E1916] p-4 sm:p-5 space-y-2">
                  <h4 className="font-serif text-base font-bold text-[#DFBA6F]">{sec.heading}</h4>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/75 leading-relaxed font-sans">{sec.body}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono text-[#C5A059]">Confident Textiles Machinery Trade Protocol</span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-xl bg-[#C5A059] px-5 py-2 font-mono text-xs font-bold text-[#161210] hover:bg-[#FAF7F2] transition cursor-pointer"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
