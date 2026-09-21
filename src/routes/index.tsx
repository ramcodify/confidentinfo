import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  FileCheck2,
  Globe2,
  Layers,
  MapPin,
  MoveRight,
  Package,
  Plane,
  Scale,
  Search,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  Warehouse,
} from "lucide-react";
import heroImage from "../assets/global-port-hero.jpg";
import warehouseImage from "../assets/warehouse-operations.jpg";
import terminalImage from "../assets/industry-terminal.jpg";
import { InquiryForm } from "../components/forms";
import { EditorialHeading, MarqueeTicker, SectionLabel } from "../components/site";
import { categoryList } from "../data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian Trade Co. — Global Import & Export Trading House" },
      {
        name: "description",
        content:
          "Old-World Global Trade × Modern Industrial Luxury. Verified commodity sourcing, international freight logistics, and border execution across global markets.",
      },
      { property: "og:title", content: "Meridian Trade Co. — Global Commerce Redefined" },
      {
        property: "og:description",
        content:
          "Connecting producers, suppliers, and global markets through verified sourcing, international logistics, and disciplined trade execution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

/* Interactive Number Counter */
function StatCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseInt(value.replace(/\D/g, ""), 10);
    const hasPlus = value.includes("+");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        let start = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const interval = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(`${target}${hasPlus ? "+" : ""}`);
            clearInterval(interval);
          } else {
            setCount(`${start}${hasPlus ? "+" : ""}`);
          }
        }, 30);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="p-8 lg:p-12 border-b border-[#FAF7F2]/10 md:border-b-0 md:border-r last:border-r-0"
    >
      <div className="font-serif text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[#FAF7F2]">
        {count}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="size-1 bg-[#C5A059]" />
        <span className="font-mono text-xs font-bold tracking-[0.24em] text-[#C5A059] uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

/* Interactive SVG World Map */
function InteractiveWorldMap() {
  const [activeHub, setActiveHub] = useState<number | null>(0);

  const hubs = [
    {
      name: "ROTTERDAM & HAMBURG",
      region: "Northwest Europe",
      coords: [490, 115],
      commodities: "Industrial Steel, Heavy Machinery, Specialty Foods",
      transit: "Base European Transshipment · 24-48h clearance",
    },
    {
      name: "JEBEL ALI & DAMMAM",
      region: "Middle East & GCC",
      coords: [580, 185],
      commodities: "Basmati Rice, Cardamom, Petrochemical LAB, Aluminum",
      transit: "Free Zone Multimodal Distribution · Hub Port",
    },
    {
      name: "NHAVA SHEVA & MUNDRA",
      region: "South Asia / India",
      coords: [665, 205],
      commodities: "Aged Basmati, Spices, Forged Auto Components, Cotton",
      transit: "Primary Origin Basin · Direct Rail Corridors",
    },
    {
      name: "SINGAPORE & PORT KLANG",
      region: "Southeast Asia",
      coords: [740, 255],
      commodities: "Refined Glycerin, Cast LLDPE Film, Electronics",
      transit: "Malacca Strait Gateway · Bulk Transshipment",
    },
    {
      name: "HOUSTON & LONG BEACH",
      region: "North America",
      coords: [210, 175],
      commodities: "Machinery, Grains, Specialty Polymers, Equipment",
      transit: "Trans-Pacific / Atlantic Terminals · Intermodal Rail",
    },
    {
      name: "MOMBASA & DURBAN",
      region: "Sub-Saharan Africa",
      coords: [545, 290],
      commodities: "Industrial Pipes, Construction Steel, Rice, Tea",
      transit: "East & South African Inbound Corridors",
    },
  ];

  // Route arcs between hubs
  const routes = [
    { from: 4, to: 0 }, // Houston -> Rotterdam
    { from: 0, to: 1 }, // Rotterdam -> Jebel Ali
    { from: 1, to: 2 }, // Jebel Ali -> India
    { from: 2, to: 3 }, // India -> Singapore
    { from: 1, to: 5 }, // Jebel Ali -> Mombasa/Durban
    { from: 3, to: 4 }, // Singapore -> Long Beach
  ];

  return (
    <div className="relative mt-12 w-full overflow-hidden border border-[#C5A059]/25 bg-[#120F0D] p-6 lg:p-10 shadow-2xl">
      <div className="flex flex-col justify-between gap-4 border-b border-[#FAF7F2]/10 pb-6 md:flex-row md:items-center">
        <div>
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#C5A059] uppercase">
            [ CARTOGRAPHIC TRADE SCHEMATIC ]
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#FAF7F2]">
            Global Maritime Corridors & Active Hubs
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-[#FAF7F2]/60">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#C5A059] animate-ping" />
            Active Route
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 bg-[#C5A059]" />
            Strategic Hub
          </span>
        </div>
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full max-h-[540px]">
        <svg
          viewBox="0 0 960 480"
          className="size-full"
          fill="none"
          aria-label="Global Trade Route Map"
        >
          {/* Subtle Latitude/Longitude Grid Lines */}
          {[120, 240, 360].map((y) => (
            <line
              key={`lat-${y}`}
              x1="0"
              y1={y}
              x2="960"
              y2={y}
              stroke="#C5A059"
              strokeWidth="0.5"
              strokeDasharray="3 6"
              opacity="0.12"
            />
          ))}
          {[200, 400, 600, 800].map((x) => (
            <line
              key={`lon-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="480"
              stroke="#C5A059"
              strokeWidth="0.5"
              strokeDasharray="3 6"
              opacity="0.12"
            />
          ))}

          {/* Stylized Minimal Continent Outlines */}
          {/* North America */}
          <path
            d="M90 70 L240 50 L310 110 L280 180 L230 220 L190 260 L140 230 L110 160 Z"
            fill="#231C18"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />
          {/* South America */}
          <path
            d="M230 250 L310 260 L360 330 L320 420 L270 450 L230 360 Z"
            fill="#231C18"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />
          {/* Europe */}
          <path
            d="M440 60 L550 50 L560 110 L520 150 L450 140 L430 90 Z"
            fill="#231C18"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />
          {/* Africa */}
          <path
            d="M450 160 L570 170 L610 240 L580 370 L520 420 L460 320 L430 210 Z"
            fill="#231C18"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />
          {/* Asia */}
          <path
            d="M570 60 L830 50 L890 120 L840 230 L730 260 L650 240 L580 160 Z"
            fill="#231C18"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />
          {/* Australia / Oceania */}
          <path
            d="M770 310 L890 320 L880 400 L800 420 L760 360 Z"
            fill="#231C18"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeOpacity="0.25"
          />

          {/* Trade Route Arcs with Moving Beams */}
          {routes.map((r, i) => {
            const start = hubs[r.from].coords;
            const end = hubs[r.to].coords;
            const midX = (start[0] + end[0]) / 2;
            const midY = Math.min(start[1], end[1]) - 40;
            const pathD = `M${start[0]} ${start[1]} Q${midX} ${midY} ${end[0]} ${end[1]}`;

            return (
              <g key={`route-${i}`}>
                {/* Background route track */}
                <path d={pathD} stroke="#C5A059" strokeWidth="1" strokeOpacity="0.2" fill="none" />
                {/* Glowing moving beam */}
                <path
                  d={pathD}
                  stroke="#C5A059"
                  strokeWidth="2"
                  className="route-line"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Hub Nodes */}
          {hubs.map((hub, idx) => {
            const isSelected = activeHub === idx;
            return (
              <g
                key={hub.name}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveHub(idx)}
                onMouseEnter={() => setActiveHub(idx)}
              >
                {/* Outer radar pulse */}
                <circle
                  cx={hub.coords[0]}
                  cy={hub.coords[1]}
                  r={isSelected ? 18 : 12}
                  className="route-dot fill-[#C5A059]/20"
                />
                <circle
                  cx={hub.coords[0]}
                  cy={hub.coords[1]}
                  r={isSelected ? 8 : 5}
                  className="fill-[#C5A059]"
                />
                <circle
                  cx={hub.coords[0]}
                  cy={hub.coords[1]}
                  r={isSelected ? 3 : 2}
                  className="fill-[#161210]"
                />

                {/* Hub Label */}
                <text
                  x={hub.coords[0]}
                  y={hub.coords[1] - 14}
                  textAnchor="middle"
                  className={`font-mono text-[9px] font-bold uppercase transition-all duration-300 ${
                    isSelected ? "fill-[#C5A059] font-extrabold" : "fill-[#FAF7F2]/70"
                  }`}
                  letterSpacing="0.1em"
                >
                  {hub.name.split(" & ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Hub Dossier Overlay */}
        {activeHub !== null && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md border border-[#C5A059] bg-[#161210]/95 backdrop-blur-md p-5 text-[#FAF7F2] shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-2">
              <span className="font-mono text-[10px] font-bold text-[#C5A059] tracking-[0.25em] uppercase">
                [ {hubs[activeHub].region} ]
              </span>
              <span className="font-mono text-[10px] text-[#FAF7F2]/50">STRATEGIC TERMINAL</span>
            </div>
            <h4 className="mt-2 font-serif text-xl font-bold text-[#FAF7F2]">
              {hubs[activeHub].name}
            </h4>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="text-[#FAF7F2]/70 font-sans">
                <strong className="text-[#C5A059] font-mono text-[11px] block uppercase">
                  Primary Flow:
                </strong>
                {hubs[activeHub].commodities}
              </div>
              <div className="text-[#FAF7F2]/60 font-mono text-[11px] pt-1">
                {hubs[activeHub].transit}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage() {
  // Parallax / mouse tilt state for signature hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCatalogueIdx, setActiveCatalogueIdx] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className="relative overflow-hidden bg-[#F4EFE6] text-[#161210]">
      {/* =========================================================================
          1. SIGNATURE EDITORIAL HERO
          ========================================================================= */}
      <section
        onMouseMove={handleMouseMove}
        className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#161210] pt-28 pb-8 text-[#FAF7F2]"
      >
        {/* Cinematic Backdrop Image with Parallax & Grading */}
        <div
          className="absolute inset-0 size-full overflow-hidden transition-transform duration-700 ease-out"
          style={{
            transform: `scale(1.05) translate(${mousePos.x * 14}px, ${mousePos.y * 14}px)`,
          }}
        >
          <img
            src={heroImage}
            alt="International container vessel and maritime port"
            className="size-full object-cover opacity-35 filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161210] via-[#161210]/40 to-transparent" />
        </div>

        {/* Vertical Left Side Label */}
        <div className="absolute left-6 top-36 hidden lg:flex flex-col items-center gap-6 font-mono text-[10px] tracking-[0.35em] text-[#C5A059] uppercase z-10">
          <span className="[writing-mode:vertical-lr] rotate-180">EST. 2012 · GLOBAL COMMERCE</span>
          <span className="h-16 w-px bg-[#C5A059]/40" />
          <Compass size={14} className="text-[#C5A059]" />
        </div>

        {/* Hero Central Content */}
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 lg:px-20 z-10">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 border border-[#C5A059]/40 bg-[#161210]/60 px-4 py-1.5 backdrop-blur-sm">
                <span className="size-1.5 bg-[#C5A059]" />
                <span className="font-mono text-[10px] font-bold tracking-[0.28em] text-[#FAF7F2] uppercase">
                  INTERNATIONAL IMPORT & EXPORT
                </span>
              </div>

              {/* Enormous Editorial Headline */}
              <h1 className="font-serif text-5xl font-bold tracking-tight text-[#FAF7F2] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[94px] leading-[1.02]">
                GLOBAL
                <br />
                <span className="text-[#C5A059] italic font-normal">TRADE,</span>
                <br />
                REDEFINED.
              </h1>

              <p className="max-w-xl text-base md:text-lg leading-relaxed text-[#FAF7F2]/80 font-sans">
                Connecting producers, certified suppliers, and global markets through verified
                sourcing, deep-water freight logistics, and disciplined commercial execution.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-4">
                <Link
                  to="/products"
                  className="group relative inline-flex items-center gap-3 border border-[#C5A059] bg-[#C5A059] px-8 py-4 font-mono text-xs font-bold tracking-[0.22em] uppercase text-[#161210] transition-colors duration-300 hover:bg-[#FAF7F2] hover:border-[#FAF7F2]"
                >
                  <span>EXPLORE CATALOGUE</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 border border-[#FAF7F2]/30 bg-transparent px-8 py-4 font-mono text-xs font-bold tracking-[0.22em] uppercase text-[#FAF7F2] transition duration-300 hover:border-[#C5A059] hover:bg-[#C5A059]/10"
                >
                  <span>CONTACT US</span>
                  <ArrowUpRight
                    size={15}
                    className="text-[#C5A059] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>

            {/* Oversized Circular Emblem / CTA */}
            <div className="flex flex-col items-start lg:items-end justify-center">
              <Link
                to="/products"
                className="group relative flex size-48 md:size-56 items-center justify-center rounded-full border border-[#C5A059]/40 bg-[#161210]/80 p-4 text-center backdrop-blur-md transition-transform duration-500 hover:scale-105 hover:border-[#C5A059]"
              >
                {/* Rotating Outer Text Ring */}
                <div className="absolute inset-0 size-full animate-spin-slow">
                  <svg viewBox="0 0 200 200" className="size-full">
                    <path
                      id="circlePath"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                      fill="none"
                    />
                    <text className="font-mono text-[9px] font-bold tracking-[0.32em] fill-[#C5A059] uppercase">
                      <textPath href="#circlePath">
                        · EXPLORE OUR WORLD · GLOBAL COMMERCE ·
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Center Core */}
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Compass
                    size={24}
                    className="text-[#C5A059] transition-transform duration-500 group-hover:rotate-45"
                  />
                  <span className="font-serif text-lg font-bold text-[#FAF7F2] leading-tight">
                    TRADE
                    <br />
                    BORDERS
                  </span>
                  <ArrowRight size={14} className="text-[#C5A059]" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Ticker */}
        <div className="mt-12 z-10">
          <MarqueeTicker />
        </div>
      </section>

      {/* =========================================================================
          2. GLOBAL NUMBERS (STATISTICS STRIP)
          ========================================================================= */}
      <section className="relative z-20 border-b border-[#FAF7F2]/10 bg-[#161210] text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCounter value="25+" label="COUNTRIES SERVED" />
            <StatCounter value="100+" label="COMMODITIES TRADED" />
            <StatCounter value="500+" label="VESSEL SHIPMENTS" />
            <StatCounter value="10+" label="YEARS OF INTEGRITY" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTRODUCTION SECTION ("FROM ORIGIN TO OPPORTUNITY")
          ========================================================================= */}
      <section className="relative py-24 lg:py-36 bg-[#F4EFE6] px-6 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Vertical Luxury Photo Composition */}
            <div className="relative">
              <div className="relative overflow-hidden border border-[#C5A059]/50 shadow-2xl">
                <img
                  src={warehouseImage}
                  alt="Meridian disciplined warehouse and trade distribution"
                  className="aspect-[4/5] w-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/60 via-transparent to-transparent" />
              </div>

              {/* Editorial handwritten / annotation overlay */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 border border-[#C5A059] bg-[#FAF7F2] p-6 sm:p-8 text-[#161210] shadow-2xl max-w-xs">
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
                  [ EXECUTION PIPELINE ]
                </span>
                <div className="font-serif text-2xl font-bold leading-tight">
                  SOURCE
                  <br />
                  <span className="text-[#9E4E39]">→</span> MOVE
                  <br />
                  <span className="text-[#3E4C34]">→</span> DELIVER
                </div>
                <p className="mt-3 text-[11px] font-mono text-[#6B625B] leading-normal">
                  Three disciplines. Zero friction. Absolute border accountability.
                </p>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="space-y-8 lg:pl-8">
              <SectionLabel number="01">ORIGIN TO OPPORTUNITY</SectionLabel>

              <EditorialHeading
                title="FROM ORIGIN TO OPPORTUNITY."
                subtitle="We connect producers, certified suppliers, and global markets across borders through trusted sourcing, international logistics, and disciplined trade execution."
              />

              <div className="space-y-5 text-sm md:text-base leading-relaxed text-[#6B625B]">
                <p>
                  Trade is not merely logistics—it is the disciplined convergence of quality
                  assurance, contractual integrity, maritime precision, and regulatory fluency.
                </p>
                <p>
                  Whether facilitating high-volume grain exports from the Indo-Gangetic plains or
                  coordinating multimodal transit of precision industrial equipment into European
                  manufacturing corridors, Meridian ensures accountability at every bill of lading.
                </p>
              </div>

              {/* Thin brass lines connecting principles */}
              <div className="grid grid-cols-2 gap-4 border-t border-[#D8CEBD] pt-6 font-mono text-xs text-[#161210]">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 bg-[#C5A059]" />
                  <span>Audited Supply Chains</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 bg-[#C5A059]" />
                  <span>Phytosanitary Rigor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 bg-[#C5A059]" />
                  <span>Customs Acceleration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 bg-[#C5A059]" />
                  <span>Transparent Incoterms</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-3 font-mono text-xs font-bold tracking-[0.2em] text-[#161210] uppercase hover:text-[#9E4E39] transition-colors"
                >
                  <span>READ OUR TRADING PHILOSOPHY</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1 text-[#C5A059]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. TRADE CATALOGUE ("WHAT CROSSES OUR BORDERS")
          ========================================================================= */}
      <section className="relative bg-[#FAF7F2] py-24 lg:py-36 px-6 lg:px-12 border-y border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-[#D8CEBD] pb-8">
            <div className="space-y-3">
              <SectionLabel number="02">TRADE CATALOGUE</SectionLabel>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-[#161210] sm:text-5xl lg:text-6xl">
                WHAT CROSSES
                <br />
                <span className="italic text-[#9E4E39]">OUR BORDERS.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-[#6B625B]">
                Explore our primary trade commodities. Each vertical maintains specialized
                procurement protocols, international testing criteria, and custom export packing
                standards.
              </p>
              <div className="mt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-[#9E4E39] uppercase hover:underline"
                >
                  VIEW FULL 8-CATEGORY PORTFOLIO →
                </Link>
              </div>
            </div>
          </div>

          {/* Vertical Editorial Accordion / Hover Rows */}
          <div className="mt-12 divide-y divide-[#D8CEBD]">
            {categoryList.slice(0, 5).map((category, idx) => {
              const isActive = activeCatalogueIdx === idx;
              return (
                <div
                  key={category.id}
                  onMouseEnter={() => setActiveCatalogueIdx(idx)}
                  className={`group relative transition-all duration-500 py-8 lg:py-10 cursor-pointer ${
                    isActive ? "bg-[#F4EFE6]/60 px-4 -mx-4" : ""
                  }`}
                >
                  <div className="grid gap-6 lg:grid-cols-[80px_1.2fr_1fr_auto] lg:items-center">
                    {/* Category Number */}
                    <span
                      className={`font-mono text-2xl lg:text-3xl font-bold transition-colors ${
                        isActive ? "text-[#C5A059]" : "text-[#6B625B]/40 group-hover:text-[#161210]"
                      }`}
                    >
                      {category.number}
                    </span>

                    {/* Category Name & Tagline */}
                    <div>
                      <h3
                        className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold transition-colors ${
                          isActive
                            ? "text-[#161210]"
                            : "text-[#161210]/80 group-hover:text-[#161210]"
                        }`}
                      >
                        {category.name}
                      </h3>
                      <p className="mt-2 text-xs md:text-sm text-[#6B625B] line-clamp-2">
                        {category.tagline}
                      </p>
                    </div>

                    {/* Expanded Preview Image on Desktop */}
                    <div className="hidden lg:block overflow-hidden h-28 border border-[#D8CEBD] bg-[#161210]">
                      <img
                        src={category.heroImage}
                        alt={category.name}
                        className={`size-full object-cover transition-transform duration-700 ${
                          isActive ? "scale-110 opacity-100" : "opacity-60 scale-100"
                        }`}
                      />
                    </div>

                    {/* Arrow CTA */}
                    <div className="flex items-center justify-end">
                      <Link
                        to="/products"
                        className={`flex size-12 items-center justify-center border transition-all ${
                          isActive
                            ? "border-[#161210] bg-[#161210] text-[#FAF7F2]"
                            : "border-[#D8CEBD] text-[#6B625B] group-hover:border-[#C5A059] group-hover:text-[#161210]"
                        }`}
                      >
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. IMPORT / EXPORT (TWO DRAMATICALLY DIFFERENT WORLDS)
          ========================================================================= */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          {/* IMPORT: DEEP OLIVE WORLD */}
          <article className="relative overflow-hidden bg-[#2D3325] p-10 sm:p-16 lg:p-24 text-[#FAF7F2]">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#C5A059]">
              [ INBOUND TRADE ENGINE ]
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              BRINGING THE
              <br />
              <span className="italic text-[#C5A059]">WORLD IN.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#FAF7F2]/75">
              Disciplined international procurement, factory audit verification, pre-loading
              inspection, customs clearance coordination, and onward delivery right into regional
              distribution centers.
            </p>

            {/* Inbound 5-Stage Process */}
            <div className="mt-12 space-y-4 font-mono text-xs">
              {[
                ["01", "SOURCE", "Direct origin engagement across verified producer networks."],
                ["02", "VERIFY", "Rigorous commercial credit and factory capability audit."],
                ["03", "INSPECT", "Batch sampling, lab testing, and pre-dispatch stamp."],
                ["04", "SHIP", "Ocean multimodal charter & inland bonded transit."],
                ["05", "DELIVER", "Terminal handling & direct warehouse receipt."],
              ].map(([num, stage, desc]) => (
                <div
                  key={num}
                  className="flex items-baseline gap-4 border-b border-[#FAF7F2]/10 pb-3"
                >
                  <span className="text-[#C5A059] font-bold">{num}</span>
                  <span className="font-bold tracking-widest text-[#FAF7F2] w-24">{stage}</span>
                  <span className="text-[#FAF7F2]/60 font-sans text-xs">{desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                to="/import"
                className="inline-flex items-center gap-3 border border-[#C5A059] bg-[#1E2319] px-7 py-3.5 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FAF7F2] hover:bg-[#C5A059] hover:text-[#161210] transition-colors"
              >
                <span>EXPLORE IMPORT SOLUTIONS</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>

          {/* EXPORT: WARM TERRACOTTA WORLD */}
          <article className="relative overflow-hidden bg-[#9E4E39] p-10 sm:p-16 lg:p-24 text-[#FAF7F2]">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-[#161210]">
              [ OUTBOUND TRADE EXPEDITION ]
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-[#FAF7F2]">
              TAKING VALUE
              <br />
              <span className="italic text-[#FAF7F2]/80">OUT.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#FAF7F2]/90">
              Transforming local production excellence into market-ready international commodities.
              Packaging optimization, export certification, trade finance, and overseas
              distribution.
            </p>

            {/* Outbound 5-Stage Process */}
            <div className="mt-12 space-y-4 font-mono text-xs">
              {[
                ["01", "PREPARE", "Container stuffing, anti-moisture crating, export tagging."],
                ["02", "CERTIFY", "Phytosanitary, Chamber certificates, ISO test sheets."],
                ["03", "DOCUMENT", "Clean Bills of Lading, Packing Lists, consular clearance."],
                ["04", "SHIP", "Bookings on tier-1 ocean liner routes with real-time tracking."],
                ["05", "DELIVER", "Destination port clearance and buyer handover."],
              ].map(([num, stage, desc]) => (
                <div
                  key={num}
                  className="flex items-baseline gap-4 border-b border-[#FAF7F2]/20 pb-3"
                >
                  <span className="text-[#161210] font-bold">{num}</span>
                  <span className="font-bold tracking-widest text-[#FAF7F2] w-24">{stage}</span>
                  <span className="text-[#FAF7F2]/80 font-sans text-xs">{desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                to="/export"
                className="inline-flex items-center gap-3 border border-[#FAF7F2] bg-[#FAF7F2] px-7 py-3.5 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#161210] hover:bg-[#161210] hover:text-[#FAF7F2] hover:border-[#161210] transition-colors"
              >
                <span>EXPLORE EXPORT SERVICES</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
          6. GLOBAL NETWORK ("CONNECTED BY TRADE")
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#161210] py-24 lg:py-36 px-6 lg:px-12 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <SectionLabel dark number="03">
                GLOBAL REACH
              </SectionLabel>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-[#FAF7F2] sm:text-5xl lg:text-6xl">
                CONNECTED BY
                <br />
                <span className="text-[#C5A059] italic">TRADE.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#FAF7F2]/65">
              Strategic presences across the Arabian Gulf, Indian subcontinent, European ports,
              Southeast Asian logistics gateways, and North American distribution arteries.
            </p>
          </div>

          <InteractiveWorldMap />
        </div>
      </section>

      {/* =========================================================================
          7. TRADE JOURNEY (HORIZONTAL INTERACTIVE TIMELINE)
          ========================================================================= */}
      <section className="relative bg-[#FAF7F2] py-24 lg:py-36 px-6 lg:px-12 border-b border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px]">
          <SectionLabel number="04">THE METHODOLOGY</SectionLabel>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-4xl font-bold text-[#161210] sm:text-5xl">
              THE DISCIPLINED
              <br />
              <span className="text-[#9E4E39] italic">TRADE JOURNEY.</span>
            </h2>
            <span className="font-mono text-xs text-[#6B625B]">
              [ INCOTERMS 2020 COMPLIANT WORKFLOW ]
            </span>
          </div>

          {/* Horizontal Journey Pipeline */}
          <div className="relative mt-16">
            {/* Connected Brass Line */}
            <div className="hidden lg:block absolute left-4 right-4 top-7 h-0.5 bg-[#C5A059]/40 z-0" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 relative z-10">
              {[
                {
                  step: "01",
                  title: "SOURCE",
                  desc: "Direct farm-gate and mill identification backed by commercial credit analysis.",
                },
                {
                  step: "02",
                  title: "VERIFY",
                  desc: "On-site facility evaluation, phytosanitary audit, and test batch validation.",
                },
                {
                  step: "03",
                  title: "PREPARE",
                  desc: "Export-grade containment, VCI rust inhibitors, and moisture-sealed crating.",
                },
                {
                  step: "04",
                  title: "DOCUMENT",
                  desc: "Consular legalization, Bills of Lading, and Letters of Credit alignment.",
                },
                {
                  step: "05",
                  title: "SHIP",
                  desc: "Dedicated vessel bookings, reefer tracking, and maritime insurance coverage.",
                },
                {
                  step: "06",
                  title: "DELIVER",
                  desc: "Port customs clearance, inland bonded transport, and consignee sign-off.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="space-y-4 border-t border-[#C5A059] pt-4 lg:border-t-0 lg:pt-0"
                >
                  <div className="flex size-14 items-center justify-center border border-[#C5A059] bg-[#FAF7F2] font-mono text-sm font-bold text-[#161210] shadow-sm">
                    {item.step}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#161210]">{item.title}</h4>
                  <p className="text-xs text-[#6B625B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. INDUSTRIES (FULL-WIDTH EDITORIAL LIST)
          ========================================================================= */}
      <section className="relative bg-[#161210] py-24 lg:py-36 px-6 lg:px-12 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="border-b border-[#FAF7F2]/10 pb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <SectionLabel dark number="05">
                KEY SECTORS
              </SectionLabel>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-[#FAF7F2] sm:text-5xl lg:text-6xl">
                INDUSTRIES WE SERVE.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#FAF7F2]/65">
              Each sector has unique storage variables, phytosanitary requirements, and cargo
              handling tolerances. Hover any sector to inspect our coverage.
            </p>
          </div>

          <div className="mt-8 divide-y divide-[#FAF7F2]/10">
            {[
              {
                name: "AGRICULTURE & COMMODITIES",
                sub: "Grains, Spices, Pulses & Oilseeds",
                corridor: "South Asia · Middle East · Europe",
              },
              {
                name: "FOOD PROCESSING & BEVERAGES",
                sub: "Orthodox Tea, Specialty Coffee & Tropical Purees",
                corridor: "East Africa · Europe · North America",
              },
              {
                name: "HEAVY MANUFACTURING & STEEL",
                sub: "Cold-Rolled Coils, Line Pipes & Alloy Extrusions",
                corridor: "Far East · Middle East · Latin America",
              },
              {
                name: "AUTOMOTIVE & COMMERCIAL FLEETS",
                sub: "Forged Crankshafts, Brake Rotors & Transmission Gears",
                corridor: "Europe · North America · Asia",
              },
              {
                name: "CONSTRUCTION & INFRASTRUCTURE",
                sub: "Structural Sections, Fasteners & Facade Profiles",
                corridor: "Middle East · Africa · Europe",
              },
              {
                name: "ENERGY & CAPITAL EQUIPMENT",
                sub: "Industrial Diesel Generators & High-Pressure Pumps",
                corridor: "UK · Africa · Southeast Asia",
              },
              {
                name: "EXPORT PACKAGING & LOGISTICS",
                sub: "Corrugated Export Shippers & Heat-Treated Pallets",
                corridor: "Baltic Corridor · GCC · Asia",
              },
              {
                name: "TEXTILES & NATURAL FIBERS",
                sub: "Raw Cotton Bales, Organic Woven Linen & Canvas",
                corridor: "India · Vietnam · Turkey · Portugal",
              },
            ].map((ind, i) => (
              <div
                key={ind.name}
                className="group flex flex-col justify-between gap-4 py-7 transition-all duration-300 hover:bg-[#FAF7F2]/5 hover:px-4 sm:flex-row sm:items-center cursor-pointer"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-[#C5A059]">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#FAF7F2] group-hover:text-[#C5A059] transition-colors">
                      {ind.name}
                    </h3>
                    <span className="font-mono text-xs text-[#FAF7F2]/50 block mt-1">
                      {ind.sub}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[11px] text-[#C5A059]/80 hidden md:block">
                    {ind.corridor}
                  </span>
                  <div className="flex size-10 items-center justify-center border border-[#FAF7F2]/20 text-[#FAF7F2] group-hover:border-[#C5A059] group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/industries"
              className="inline-flex items-center gap-3 border border-[#C5A059] bg-[#C5A059] px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] text-[#161210] uppercase hover:bg-[#FAF7F2] transition-colors"
            >
              <span>INSPECT INDUSTRY SPECIFICATIONS</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. QUALITY SECTION ("TRUST IS PART OF THE CARGO")
          ========================================================================= */}
      <section className="relative overflow-hidden bg-[#1D1714] py-24 lg:py-36 px-6 lg:px-12 text-[#FAF7F2] border-y border-[#C5A059]/25">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <SectionLabel dark number="06">
              INTEGRITY & ASSURANCE
            </SectionLabel>
            <h2 className="font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
              TRUST IS PART
              <br />
              <span className="text-[#C5A059] italic">OF THE CARGO.</span>
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-[#FAF7F2]/70">
              International trade cannot withstand guesswork. We anchor our execution around six
              non-negotiable quality disciplines.
            </p>
          </div>

          {/* 6 Quality Principles */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "QUALITY CONTROL",
                desc: "Certified independent surveyor inspection (SGS/Bureau Veritas compatible protocols) prior to container loading.",
                icon: ShieldCheck,
              },
              {
                title: "BATCH TRACEABILITY",
                desc: "Full farm-to-port or mill-to-consignee batch provenance recorded in every trade packet.",
                icon: Layers,
              },
              {
                title: "REGULATORY COMPLIANCE",
                desc: "Destination country import standards, customs classification codes, and phytosanitary rules strictly verified.",
                icon: Scale,
              },
              {
                title: "PRE-SHIPMENT INSPECTION",
                desc: "Moisture, granulation, tensile strength, and packaging seal integrity validated with photographic logs.",
                icon: Search,
              },
              {
                title: "LEGAL DOCUMENTATION",
                desc: "Clean on-board ocean bills of lading, consular invoices, and certificates of origin without ambiguity.",
                icon: FileCheck2,
              },
              {
                title: "ROUTE RELIABILITY",
                desc: "Long-standing carrier partnerships ensuring container slot commitments even during peak seasonal runs.",
                icon: Ship,
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group relative border border-[#C5A059]/20 bg-[#161210] p-8 transition-colors duration-300 hover:border-[#C5A059]"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={26} className="text-[#C5A059]" />
                    <span className="font-mono text-xs text-[#FAF7F2]/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold tracking-wide text-[#FAF7F2]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#FAF7F2]/65 font-sans">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Client Certification Placeholder Area */}
          <div className="mt-12 border border-[#FAF7F2]/10 bg-[#161210]/50 p-6 text-center">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
              [ CERTIFICATION PARTNERS ]
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-3 text-xs font-mono text-[#FAF7F2]/50">
              <span>ISO 9001:2015 AUDITED</span>
              <span>•</span>
              <span>PHYTOSANITARY BOARD COMPLIANT</span>
              <span>•</span>
              <span>HACCP FOOD SAFETY ACCREDITATION</span>
              <span>•</span>
              <span>INCOTERMS 2020 REGISTERED</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. TRADE INQUIRY MANIFEST FORM ("LET'S MOVE SOMETHING")
          ========================================================================= */}
      <section id="inquiry" className="relative py-24 lg:py-36 bg-[#F4EFE6] px-6 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            {/* Left Column Statement */}
            <div className="space-y-6">
              <SectionLabel number="07">TRADE QUOTATION</SectionLabel>
              <h2 className="font-serif text-4xl font-bold text-[#161210] sm:text-5xl lg:text-6xl leading-[1.05]">
                LET’S MOVE
                <br />
                <span className="text-[#9E4E39] italic">SOMETHING.</span>
              </h2>
              <p className="text-base leading-relaxed text-[#6B625B]">
                Initiate a formal commercial trade inquiry. Our trade desk coordinates route
                logistics, supplier allocation, and contractual pricing based on current ocean
                indices.
              </p>

              {/* Trade Desk Details */}
              <div className="space-y-4 pt-6 border-t border-[#D8CEBD] text-xs font-mono">
                <div className="flex items-center gap-3 text-[#161210]">
                  <span className="text-[#C5A059]">●</span>
                  <span>Response Time: Within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-[#161210]">
                  <span className="text-[#C5A059]">●</span>
                  <span>Contract Terms: FOB, CIF, CFR, DAP</span>
                </div>
                <div className="flex items-center gap-3 text-[#161210]">
                  <span className="text-[#C5A059]">●</span>
                  <span>Direct Desk: trade@meridiantrade.com</span>
                </div>
              </div>
            </div>

            {/* Right Column Manifest Form */}
            <div>
              <InquiryForm quote />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. CONTACT ("WHERE TRADE BEGINS")
          ========================================================================= */}
      <section className="relative bg-[#FAF7F2] py-24 lg:py-36 px-6 lg:px-12 border-t border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-6">
              <SectionLabel number="08">HEADQUARTERS</SectionLabel>
              <h2 className="font-serif text-4xl font-bold text-[#161210] sm:text-5xl lg:text-6xl">
                WHERE TRADE
                <br />
                <span className="text-[#C5A059] italic">BEGINS.</span>
              </h2>
              <p className="text-base text-[#6B625B] leading-relaxed max-w-md">
                Our operations coordinators are situated in key maritime commercial zones to ensure
                unbroken oversight across global trading hours.
              </p>

              <div className="grid gap-6 pt-6 border-t border-[#D8CEBD] sm:grid-cols-2 font-mono text-xs">
                <div>
                  <b className="block font-serif text-base text-[#161210] mb-1 font-bold">
                    Primary Trade Office
                  </b>
                  <p className="text-[#6B625B] leading-relaxed">
                    Meridian Trade Towers, Level 42
                    <br />
                    Maritime Commercial District
                    <br />
                    Port Financial Center
                  </p>
                </div>
                <div>
                  <b className="block font-serif text-base text-[#161210] mb-1 font-bold">
                    Operating Hours
                  </b>
                  <p className="text-[#6B625B] leading-relaxed">
                    Monday — Friday: 08:00 – 19:00 UTC
                    <br />
                    Saturday: 09:00 – 14:00 UTC
                    <br />
                    Vessel Dispatch: 24/7 Monitoring
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Port Coordinate Card */}
            <div className="border border-[#C5A059] bg-[#161210] p-8 sm:p-12 text-[#FAF7F2] shadow-2xl relative">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block mb-4">
                [ PORT RADAR & DESK CONTACT ]
              </span>
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs text-[#FAF7F2]/50 block">
                    COMMERCIAL INQUIRIES
                  </span>
                  <a
                    href="mailto:trade@meridiantrade.com"
                    className="font-serif text-2xl font-bold text-[#C5A059] hover:underline"
                  >
                    trade@meridiantrade.com
                  </a>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#FAF7F2]/50 block">
                    DIRECT OPERATIONS TELEPHONE
                  </span>
                  <a
                    href="tel:+18004928723"
                    className="font-serif text-2xl font-bold text-[#FAF7F2] hover:underline"
                  >
                    +1 (800) 492-TRADE
                  </a>
                </div>
                <div className="pt-6 border-t border-[#FAF7F2]/10 font-mono text-xs text-[#FAF7F2]/60">
                  <div className="flex justify-between py-1">
                    <span>RADIO FREQ</span>
                    <span className="text-[#C5A059]">VHF CH 16 / CH 72</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>PORT LAT/LON</span>
                    <span>25°15' N / 55°18' E</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>DISPATCH STATUS</span>
                    <span className="text-[#C5A059]">BERTHS ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
