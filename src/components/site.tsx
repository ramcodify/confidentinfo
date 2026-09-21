import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ship,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export const navLinks = [
  { label: "ABOUT", to: "/about" },
  { label: "PRODUCTS", to: "/products" },
  { label: "IMPORT", to: "/import" },
  { label: "EXPORT", to: "/export" },
  { label: "NETWORK", to: "/global-network" },
  { label: "INDUSTRIES", to: "/industries" },
  { label: "CONTACT", to: "/contact" },
] as const;

export function MonogramLogo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3 focus:outline-none" aria-label="Home">
      {/* Modern emblem */}
      <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[2]">
          <circle cx="12" cy="12" r="9" className="opacity-40" />
          <path d="M12 3v18M3 12h18" className="opacity-30" strokeDasharray="2 2" />
          <polygon points="12,7 15,12 12,11 9,12" className="fill-white stroke-none" />
          <polygon points="12,17 9,12 12,13 15,12" className="fill-blue-200 stroke-none" />
        </svg>
      </div>

      {/* Brand title */}
      <div className="flex flex-col">
        <span
          className={`text-[15px] font-bold tracking-tight leading-none transition-colors ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          CONFIDENT
        </span>
        <span className="mt-1 font-mono text-[9px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
          TEXTILES MACHINERY
        </span>
      </div>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  // On scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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

  const isHome = currentPath === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-slate-950/60 backdrop-blur-xl border-b border-white/10 py-4 text-white"
          : "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-3 text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
        {/* Monogram Logo */}
        <MonogramLogo light={isTransparent} />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? isTransparent
                      ? "bg-white/15 text-white shadow-xs"
                      : "bg-blue-50 text-blue-600 font-bold"
                    : isTransparent
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-5 md:flex">
          <div
            className={`flex items-center gap-2 text-xs font-medium hidden lg:flex ${
              isTransparent ? "text-slate-300" : "text-slate-500"
            }`}
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GLOBAL DISPATCH 24/7</span>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4.5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-98"
          >
            <span>VIEW PRODUCTS</span>
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`flex size-10 items-center justify-center rounded-xl border transition-colors md:hidden ${
            isTransparent
              ? "border-white/20 text-white hover:bg-white/10"
              : "border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
          aria-expanded={mobileOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer (Full-Screen Editorial Overlay) */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[76px] z-50 flex flex-col justify-between overflow-y-auto bg-[#161210] p-8 text-[#FAF7F2] md:hidden animate-in fade-in duration-300">
          <div className="border-b border-[#C5A059]/20 pb-4">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A059]">
              [ TRADE DIRECTORY · EST. 2012 ]
            </span>
          </div>

          <nav className="my-8 flex flex-col gap-5">
            {navLinks.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between border-b border-[#FAF7F2]/10 pb-4"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#C5A059]">0{idx + 1}</span>
                  <span className="font-serif text-3xl font-bold tracking-wider group-hover:text-[#C5A059] transition-colors">
                    {link.label}
                  </span>
                </div>
                <ArrowRight
                  size={18}
                  className="text-[#C5A059] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </nav>

          <div className="space-y-6 pt-4 border-t border-[#C5A059]/20">
            <Link
              to="/products"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 bg-[#9E4E39] py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#FAF7F2]"
            >
              <span>EXPLORE PRODUCTS</span>
              <ArrowRight size={14} />
            </Link>

            <div className="grid grid-cols-2 gap-4 text-[11px] text-[#FAF7F2]/60 font-mono">
              <div>
                <b className="block text-[#C5A059] uppercase">Global Desk</b>
                <span>trade@meridiantrade.com</span>
              </div>
              <div>
                <b className="block text-[#C5A059] uppercase">Operations</b>
                <span>+1 (800) 492-TRADE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function MarqueeTicker() {
  const items = [
    "IMPORT & EXPORT EXECUTION",
    "DIRECT ORIGIN SOURCING",
    "MULTIMODAL FREIGHT LOGISTICS",
    "CERTIFIED BULK COMMODITIES",
    "GLOBAL COMMERCE NETWORK",
    "RIGOROUS PHYTOSANITARY INSPECTION",
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
    <div className={`space-y-4 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-4xl"}`}>
      <h2
        className={`font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] ${
          dark ? "text-[#FAF7F2]" : "text-[#161210]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm md:text-base leading-relaxed ${
            dark ? "text-[#FAF7F2]/70" : "text-[#6B625B]"
          } ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
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
    <section className="relative flex min-h-[500px] items-end overflow-hidden bg-[#161210] pb-16 pt-36 text-[#FAF7F2] lg:min-h-[580px] lg:pb-24">
      {/* Background Image with warm editorial grading */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 size-full object-cover opacity-35 filter brightness-90 contrast-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#161210] via-[#161210]/60 to-transparent" />

      {/* Decorative vertical coordinate tag */}
      <div className="absolute right-8 top-32 hidden flex-col items-end gap-2 font-mono text-[10px] tracking-[0.25em] text-[#C5A059]/60 lg:flex">
        <span>LAT: 25°15' N</span>
        <span>LON: 55°18' E</span>
        <span className="h-10 w-px bg-[#C5A059]/30" />
        <span>EXPEDITION PORTFOLIO</span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-3xl space-y-5">
          <SectionLabel dark number={categoryNumber}>
            {eyebrow}
          </SectionLabel>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#FAF7F2] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#FAF7F2]/75 font-sans md:text-lg">
            {copy}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const corridors = [
    "North America · Europe (Atlantic Run)",
    "Middle East · India (Arabian Sea Corridor)",
    "Southeast Asia · Africa (Indian Ocean Transit)",
    "Far East · Mediterranean (Suez Route)",
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-12 border-t border-slate-800">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-slate-950 pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Top CTA Banner */}
        <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                PRODUCT SHOWCASE & CATALOGUE
              </span>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
                EXPLORE OUR
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
                  PRODUCT PORTFOLIO.
                </span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-slate-300">
                From high-precision textile machinery to verified industrial supplies, browse our
                curated catalogue showcasing engineering excellence and dependable performance.
              </p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <span>BROWSE PRODUCT CATALOGUE</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 border-b border-slate-800">
          {/* Col 1: Brand & Contact */}
          <div className="space-y-6">
            <MonogramLogo light />
            <p className="text-xs leading-relaxed text-slate-400 max-w-xs">
              Confident Textiles Machinery & Trade operates across principal international shipping
              corridors and manufacturing hubs worldwide.
            </p>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400 shrink-0" />
                <span>Trade Towers, Maritime District</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400 shrink-0" />
                <span>contact@confidentmachinery.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-400 shrink-0" />
                <span>+1 (800) 492-8723</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <b className="text-xs tracking-wider uppercase text-blue-400 block mb-5 font-semibold">
              SOLUTIONS
            </b>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/import" className="text-slate-400 hover:text-white transition-colors">
                  Inbound Import Solutions
                </Link>
              </li>
              <li>
                <Link to="/export" className="text-slate-400 hover:text-white transition-colors">
                  Outbound Export Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                  Trade Commodity Catalogue
                </Link>
              </li>
              <li>
                <Link
                  to="/global-network"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Global Shipping Corridors
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Industry Sectors
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Product Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Trade Corridors */}
          <div>
            <b className="text-xs tracking-wider uppercase text-blue-400 block mb-5 font-semibold">
              ACTIVE CORRIDORS
            </b>
            <ul className="space-y-3 text-xs text-slate-400">
              {corridors.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400">→</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Dispatch Bulletin */}
          <div className="space-y-4">
            <b className="text-xs tracking-wider uppercase text-blue-400 block font-semibold">
              TRADE DISPATCH
            </b>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quarterly intelligence on global freight rates, seasonal equipment harvests, and
              regulatory border updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter trade email…"
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-sm"
                >
                  JOIN
                </button>
              </div>
              <span className="text-[10px] text-slate-500 block">
                Strict trade intelligence only. No unsolicited marketing.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row pb-6">
          <div>
            © 2026 CONFIDENT TEXTILES MACHINERY · ALL BILLS OF LADING & CHARTER PARTIES RESERVED.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition">
              TERMS OF CARRIAGE
            </span>
            <span className="hover:text-slate-300 cursor-pointer transition">
              COMPLIANCE PROTOCOLS
            </span>
            <span className="hover:text-slate-300 cursor-pointer transition">INCOTERMS 2020</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
