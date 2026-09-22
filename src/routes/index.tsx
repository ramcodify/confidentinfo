import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  Layers,
  MapPin,
  MoveRight,
  Package,
  Scale,
  Search,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  Warehouse,
} from "lucide-react";
import { MarqueeTicker, SectionLabel } from "../components/site";
import { useMachineryStore } from "../lib/machinery-store";

import heroImage from "../assets/global-port-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Confident Textiles Machinery — China to India Textile Machinery Sourcing" },
      {
        name: "description",
        content:
          "Connecting China's Textile Machinery with India's Manufacturing Industry. Sourcing, quality verification, and import logistics for spinning, weaving, knitting, and dyeing machinery.",
      },
      { property: "og:title", content: "Confident Textiles Machinery — China to India Machinery Sourcing" },
      {
        property: "og:description",
        content:
          "We source, verify and facilitate the import of reliable textile machinery from trusted Chinese manufacturers to textile industries across India.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { products, industries, networkLocations, ownerProfile, companyInfo } = useMachineryStore();

  const featuredProducts = products.slice(0, 4);
  const featuredIndustries = industries.slice(0, 6);

  return (
    <div className="relative overflow-hidden bg-[#F4EFE6] text-[#161210]">
      {/* ═══════════════════════════════════════════════════════
          HERO: CHINA → INDIA TEXTILE MACHINERY SOURCING
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#161210] text-[#FAF7F2]"
      >
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 size-full overflow-hidden">
          <img
            src={heroImage}
            alt="Global Maritime Port and Industrial Textile Machinery Trade Operations"
            className="size-full object-cover opacity-35"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161210] via-[#161210]/50 to-transparent" />
        </div>

        {/* Ambient Warm Lighting using zero-cost CSS radial gradients */}
        <div
          className="absolute top-1/4 left-0 size-[500px] pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(197,160,89,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 size-[400px] pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(158,78,57,0.14) 0%, transparent 70%)",
          }}
        />

        {/* ── Hero Content ── */}
        <div className="relative mx-auto flex w-full max-w-[1440px] 2xl:max-w-[1720px] flex-1 flex-col justify-center
                        px-5 sm:px-8 lg:px-12 2xl:px-16 z-10
                        pt-24 sm:pt-36 lg:pt-40 pb-8 sm:pb-20 lg:pb-24">

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20 lg:items-center">

            {/* ─ Left: Headline + CTA ─ */}
            <div className="flex flex-col gap-6 sm:gap-8">

              {/* Status Badge */}
              <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#C5A059]/40
                              bg-[#161210]/80 px-4 py-2 backdrop-blur-xl shadow-lg">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#DFBA6F] uppercase">
                  China Sourcing → Indian Textile Mills
                </span>
              </div>

              {/* Main Headline */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-bold
                               text-[#FAF7F2] leading-[1.15] sm:leading-[1.1] tracking-tight">
                  Connecting China's{" "}
                  <span className="bg-gradient-to-r from-[#FAF7F2] via-[#E5C98F] to-[#C5A059]
                                   bg-clip-text text-transparent italic font-semibold">
                    Textile Machinery
                  </span>{" "}
                  with India's Mills.
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-[#FAF7F2]/75 leading-[1.8] font-sans">
                  {companyInfo.heroSupportingText ||
                    "We source, verify and import trusted Chinese textile machinery — spinning, weaving, knitting, and dyeing — directly to Indian manufacturers."}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-[#C5A059]
                             px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs sm:text-sm font-bold
                             tracking-wider uppercase text-[#161210] transition-all duration-300
                             hover:bg-[#FAF7F2] hover:shadow-xl hover:shadow-[#C5A059]/30 shadow-md cursor-pointer"
                >
                  <span>Explore Machinery</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-[#FAF7F2]/25
                             bg-white/5 backdrop-blur-xl px-6 sm:px-8 py-3.5 sm:py-4 font-mono
                             text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FAF7F2]
                             transition duration-300 hover:border-[#C5A059] hover:bg-[#C5A059]/15 cursor-pointer"
                >
                  <span>Sourcing Desk</span>
                  <ArrowUpRight size={14} className="text-[#C5A059] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </Link>
              </div>
            </div>

            {/* ─ Right: 360° Rotating Circular Emblem / Sourcing Corridor Seal ─ */}
            <div className="flex flex-col items-center lg:items-end justify-center mt-6 sm:mt-8 lg:mt-0">
              <Link
                to="/products"
                aria-label="Explore Textile Machinery Sourcing Corridor"
                className="group relative flex size-64 sm:size-80 lg:size-[360px] xl:size-[400px] items-center justify-center rounded-full border border-[#C5A059]/40 bg-[#161210]/90 p-4 text-center backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.85)] transition-all duration-300 hover:scale-[1.03] hover:border-[#C5A059] hover:shadow-[0_0_70px_rgba(197,160,89,0.28)] cursor-pointer select-none"
              >
                {/* Subtle Ambient Radial Glow */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(197,160,89,0.14) 0%, transparent 70%)",
                  }}
                />

                {/* 360° Continuous Smooth Rotating Outer Ring */}
                <div
                  style={{ transform: "translateZ(0)" }}
                  className="absolute inset-0 size-full animate-spin-slow pointer-events-none"
                >
                  <svg viewBox="0 0 400 400" className="size-full overflow-visible">
                    <defs>
                      <path
                        id="circleTextPath"
                        d="M 200, 200 m -155, 0 a 155,155 0 1,1 310,0 a 155,155 0 1,1 -310,0"
                        fill="none"
                      />
                    </defs>

                    {/* Outer Thin Perimeter Guide */}
                    <circle
                      cx="200"
                      cy="200"
                      r="188"
                      fill="none"
                      stroke="#C5A059"
                      strokeOpacity="0.25"
                      strokeWidth="1"
                    />

                    {/* Inner Dotted Concentric Ring */}
                    <circle
                      cx="200"
                      cy="200"
                      r="124"
                      fill="none"
                      stroke="#C5A059"
                      strokeOpacity="0.38"
                      strokeWidth="1.2"
                      strokeDasharray="3 5"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="120"
                      fill="none"
                      stroke="#C5A059"
                      strokeOpacity="0.18"
                      strokeWidth="0.75"
                    />

                    {/* Circular 360° Rotating Text */}
                    <text className="font-mono text-[10px] font-bold tracking-[0.24em] fill-[#DFBA6F] uppercase">
                      <textPath
                        href="#circleTextPath"
                        xlinkHref="#circleTextPath"
                        startOffset="0%"
                        textLength="960"
                        lengthAdjust="spacing"
                      >
                        · QUALITY CHECK ·· IMPORT LOGISTICS ·· CHINA MANUFACTURING ··
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Stationary Center Core (Upright & Readable) */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-1.5 sm:space-y-2">
                  {/* Top Corridor Pill with Dotted Connectors */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 sm:w-6 border-t border-dotted border-[#C5A059]/40" />
                    <span className="rounded border border-[#C5A059]/60 bg-[#1A1513]/90 px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider text-[#DFBA6F] uppercase shadow-sm">
                      CN CHINA — IN INDIA
                    </span>
                    <span className="inline-block w-4 sm:w-6 border-t border-dotted border-[#C5A059]/40" />
                  </div>

                  {/* Machine Category Title */}
                  <div className="flex flex-col items-center leading-none">
                    <span className="font-serif text-2xl sm:text-3xl xl:text-4xl font-bold tracking-[0.14em] text-[#FAF7F2] uppercase">
                      TEXTILE
                    </span>
                    <span className="font-serif text-xl sm:text-2xl xl:text-3xl font-bold italic tracking-[0.12em] text-[#DFBA6F] uppercase mt-0.5">
                      MACHINERY
                    </span>
                  </div>

                  {/* Sourcing Corridor Subtitle */}
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.26em] text-[#FAF7F2]/60 uppercase">
                    SOURCING CORRIDOR
                  </span>

                  {/* Interactive CTA with Arrow */}
                  <div className="pt-1.5 sm:pt-2 flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#DFBA6F] group-hover:text-[#FAF7F2] transition-colors uppercase">
                    <span>EXPLORE</span>
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1 text-[#C5A059]" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* ─ Mobile-Only Trade Telemetry Strip: Fills the blank space on mobile view ─ */}
          <div className="lg:hidden mt-6 sm:mt-8 w-full max-w-lg mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
              <div className="rounded-xl border border-[#C5A059]/25 bg-[#1E1916]/85 p-3 backdrop-blur-md space-y-1">
                <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-wider block">
                  QUALITY AUDIT
                </span>
                <div className="font-serif text-base sm:text-lg font-bold text-emerald-400">
                  99.4% Pass
                </div>
                <span className="font-mono text-[9px] text-[#FAF7F2]/60 block">
                  8-Hr Load Testing
                </span>
              </div>

              <div className="rounded-xl border border-[#C5A059]/25 bg-[#1E1916]/85 p-3 backdrop-blur-md space-y-1">
                <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-wider block">
                  OCEAN TRANSIT
                </span>
                <div className="font-serif text-base sm:text-lg font-bold text-[#FAF7F2]">
                  14–18 Days
                </div>
                <span className="font-mono text-[9px] text-[#FAF7F2]/60 block">
                  Direct Sea Route
                </span>
              </div>

              <div className="rounded-xl border border-[#C5A059]/25 bg-[#1E1916]/85 p-3 backdrop-blur-md space-y-1">
                <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-wider block">
                  CUSTOMS / EPCG
                </span>
                <div className="font-serif text-base sm:text-lg font-bold text-[#DFBA6F]">
                  0% Duty Pass
                </div>
                <span className="font-mono text-[9px] text-[#FAF7F2]/60 block">
                  DGFT Dossier
                </span>
              </div>

              <div className="rounded-xl border border-[#C5A059]/25 bg-[#1E1916]/85 p-3 backdrop-blur-md space-y-1">
                <span className="font-mono text-[9px] text-[#C5A059] font-bold uppercase tracking-wider block">
                  COMMISSIONING
                </span>
                <div className="font-serif text-base sm:text-lg font-bold text-[#FAF7F2]">
                  Pan-India
                </div>
                <span className="font-mono text-[9px] text-[#FAF7F2]/60 block">
                  Mill Gate Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className="z-10">
          <MarqueeTicker />
        </div>
      </section>

      {/* =========================================================================
          2. TRUSTED CHINA → INDIA MACHINERY SUPPLY STRIP
          ========================================================================= */}
      <section className="relative z-20 border-b border-[#C5A059]/20 bg-[#161210] text-[#FAF7F2] py-8 sm:py-10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916]/80 backdrop-blur-md space-y-2">
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">
                01 · VERIFIED SOURCING
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">Trusted China Supplier Network</h3>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Direct partnerships with ISO-certified machinery plants across Shanghai, Wuxi, Guangzhou, and Ningbo.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916]/80 backdrop-blur-md space-y-2">
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">
                02 · TECHNICAL INSPECTION
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">On-Site Quality Verification</h3>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Full mechanical, electrical, and vibration evaluations conducted prior to export container stuffing.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916]/80 backdrop-blur-md space-y-2">
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#C5A059] uppercase block">
                03 · DOORSTEP DELIVERY
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">End-to-End Import Logistics</h3>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Fast-track customs clearance at Chennai, Mundra, and Nhava Sheva ports with direct mill delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED MACHINERY CATALOGUE
          ========================================================================= */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-[#D8CEBD]">
            <div>
              <SectionLabel number="01">FEATURED EQUIPMENT</SectionLabel>
              <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161210]">
                HIGH-PRECISION
                <br />
                <span className="text-[#9E4E39] italic">TEXTILE MACHINERY.</span>
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider uppercase text-[#9E4E39] hover:underline self-start sm:self-auto"
            >
              <span>View All {products.length} Machines →</span>
            </Link>
          </div>

          {/* Industrial Machine Cards Grid */}
          <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((machine) => (
              <article
                key={machine.id}
                className="group rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#C5A059] hover:shadow-xl hover:bg-[#F4EFE6]"
              >
                <div>
                  {/* Machine Image (4:3 ratio) */}
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#D8CEBD] bg-[#161210]">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Machine Meta */}
                  <div className="mt-4 space-y-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#C5A059] uppercase block tracking-wider">
                      {machine.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#161210] group-hover:text-[#9E4E39] transition-colors line-clamp-2">
                      {machine.name}
                    </h3>
                    <p className="text-xs text-[#6B625B] font-mono">
                      Manufacturer: <strong className="text-[#161210]">{machine.manufacturer}</strong>
                    </p>
                    <p className="text-xs text-[#6B625B] font-mono">
                      Origin: <strong className="text-[#161210]">🇨🇳 {machine.country}</strong>
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-4 border-t border-[#D8CEBD] flex items-center justify-between">
                  <Link
                    to="/products/$slug"
                    params={{ slug: machine.slug }}
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#161210] uppercase hover:text-[#9E4E39] transition-colors"
                  >
                    <span>View Machine</span>
                    <ArrowRight size={13} />
                  </Link>
                  <span className="text-[10px] font-mono text-[#6B625B] bg-[#EBE3D3] px-2 py-0.5 rounded-md">
                    Verified
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CHINA → INDIA SUPPLY NETWORK TEASER
          ========================================================================= */}
      <section className="bg-[#161210] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 text-[#FAF7F2] border-t border-[#C5A059]/30">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#FAF7F2]/15">
            <div>
              <SectionLabel dark number="02">STRATEGIC CORRIDOR</SectionLabel>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2]">
                OUR CHINA–INDIA
                <br />
                <span className="text-[#DFBA6F] italic">SUPPLY NETWORK.</span>
              </h2>
            </div>
            <Link
              to="/network"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition shadow-md w-auto self-start sm:self-auto"
            >
              <span>Inspect Map</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {networkLocations.slice(0, 4).map((loc) => (
              <div
                key={loc.id}
                className="p-5 sm:p-6 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#DFBA6F] font-bold">
                    {loc.country === "China" ? "🇨🇳" : "🇮🇳"} {loc.country}
                  </span>
                  <span className="text-[10px] text-[#FAF7F2]/50 uppercase">{loc.type}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#FAF7F2]">{loc.name}</h4>
                <p className="text-xs text-[#FAF7F2]/70 leading-relaxed line-clamp-2">
                  {loc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INDUSTRIES WE SERVE
          ========================================================================= */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2] border-t border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#D8CEBD]">
            <div>
              <SectionLabel number="03">SECTOR SPECIFICATIONS</SectionLabel>
              <h2 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161210]">
                INDUSTRIES
                <br />
                <span className="text-[#9E4E39] italic">WE SERVE.</span>
              </h2>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#9E4E39] hover:underline"
            >
              <span>VIEW ALL INDUSTRIES & MACHINES →</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredIndustries.map((ind) => (
              <div
                key={ind.id}
                className="group rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-6 space-y-4 transition-all hover:border-[#C5A059] hover:shadow-xl hover:bg-[#F4EFE6]"
              >
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#D8CEBD] bg-[#161210]">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#161210] group-hover:text-[#9E4E39] transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#6B625B] leading-relaxed line-clamp-3">
                  {ind.description}
                </p>
                <div className="pt-2">
                  <Link
                    to="/industries"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#C5A059] uppercase hover:underline"
                  >
                    <span>VIEW SUITABLE MACHINERY →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CONFIDENT TEXTILES MACHINERY?
          ========================================================================= */}
      <section className="bg-[#1D1714] py-16 sm:py-24 px-4 sm:px-6 lg:px-12 text-[#FAF7F2] border-y border-[#C5A059]/25">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl space-y-3 mb-12">
            <SectionLabel dark number="04">KEY ADVANTAGES</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              Why Confident Textiles Machinery?
            </h2>
            <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
              We eliminate the risks of cross-border machinery procurement through hands-on technical verification, contractual transparency, and direct port facilitation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl border border-[#C5A059]/25 bg-[#161210] space-y-3">
              <CheckCircle2 size={24} className="text-[#C5A059]" />
              <h4 className="font-serif text-lg font-bold">China Supplier Network</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Direct partnerships with audited manufacturers eliminating broker markups and opacity.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#C5A059]/25 bg-[#161210] space-y-3">
              <ShieldCheck size={24} className="text-[#C5A059]" />
              <h4 className="font-serif text-lg font-bold">Machinery Verification</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Pre-shipment engineering audits validating power, speed, calibration, and crating integrity.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#C5A059]/25 bg-[#161210] space-y-3">
              <Ship size={24} className="text-[#C5A059]" />
              <h4 className="font-serif text-lg font-bold">Import Support</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Full Incoterms 2020 management, marine cargo insurance, and Indian customs acceleration.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[#C5A059]/25 bg-[#161210] space-y-3">
              <Layers size={24} className="text-[#C5A059]" />
              <h4 className="font-serif text-lg font-bold">Industry Solutions</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Tailored machine configurations matching the specific raw materials and power grids of Indian mills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. OWNER / DIRECTOR TEASER SECTION
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#F4EFE6]">
        <div className="mx-auto max-w-[1440px]">
          <div className="rounded-3xl border border-[#C5A059]/40 bg-[#161210] p-6 sm:p-10 lg:p-14 text-[#FAF7F2] shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center">
              <div className="overflow-hidden rounded-2xl border-2 border-[#C5A059] aspect-[4/5] bg-[#1E1916]">
                <img
                  src={ownerProfile.photo}
                  alt={ownerProfile.name}
                  className="size-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#C5A059] tracking-widest uppercase font-bold">
                  [ EXECUTIVE LEADERSHIP ]
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold">{ownerProfile.name}</h3>
                <p className="text-xs text-[#DFBA6F] font-mono font-semibold">
                  {ownerProfile.designation} · {ownerProfile.company}
                </p>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                  {ownerProfile.biography}
                </p>
                <div className="pt-2">
                  <Link
                    to="/owner"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition shadow-md w-auto"
                  >
                    <span>Read Owner Profile</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. NEED TEXTILE MACHINERY? REQUIREMENT CTA
          ========================================================================= */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 lg:px-12 bg-[#FAF7F2] border-t border-[#D8CEBD] text-center">
        <div className="mx-auto max-w-2xl space-y-4 sm:space-y-5">
          <span className="font-mono text-[10.5px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#9E4E39]">
            [ COMMERCIAL INQUIRY DESK ]
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#161210] tracking-tight">
            Need Textile Machinery?
          </h2>
          <p className="text-xs sm:text-base text-[#6B625B] leading-relaxed max-w-lg mx-auto font-sans">
            Tell us your production requirements, fiber type, and target output. Our trade and engineering team will evaluate and quote suitable Chinese machinery delivered right to your factory in India.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#161210] px-5 sm:px-8 py-2.5 sm:py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#9E4E39] transition-colors shadow-md w-auto mx-auto"
            >
              <span>Submit Requirement</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
