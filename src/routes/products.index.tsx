import { createFileRoute, Link } from "@tanstack/react-router";
import { useDeferredValue, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Compass,
  Cpu,
  Gauge,
  Layers,
  Search,
  SlidersHorizontal,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { PageHero, SectionLabel, MarqueeTicker } from "../components/site";
import { useMachineryStore, type TextileMachine } from "../lib/machinery-store";
import tradeProducts from "../assets/trade-products.jpg";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Textile Machinery Catalogue — China to India Import | Confident Machinery" },
      {
        name: "description",
        content:
          "High-performance textile machinery sourced from top Chinese manufacturers. Air jet looms, ring spinning frames, circular knitting machines, stenter frames, and HTHP dyeing machines delivered with full verification and logistics support to India.",
      },
      { property: "og:title", content: "Textile Machinery Catalogue | Confident Textiles Machinery" },
      {
        property: "og:description",
        content:
          "Verified Chinese textile machinery portfolio for Indian spinning, weaving, knitting, and dyeing mills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const MACHINE_CATEGORIES = [
  "All",
  "Spinning",
  "Weaving",
  "Knitting",
  "Dyeing & Finishing",
  "Textile Processing",
  "Auxiliary Machinery",
] as const;

function ProductsPage() {
  const { products } = useMachineryStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery.toLowerCase().trim());

  // Filter products by category and search query safely
  const filteredProducts = (products || []).filter((p) => {
    if (!p) return false;
    const catLower = (p.category || "").toLowerCase();
    const selLower = selectedCategory.toLowerCase();
    const matchesCategory =
      selectedCategory === "All" ||
      catLower === selLower ||
      catLower.includes(selLower) ||
      (selectedCategory === "Dyeing & Finishing" &&
        (catLower.includes("dyeing") || catLower.includes("finishing")));
    const matchesQuery =
      !deferredQuery ||
      (p.name && p.name.toLowerCase().includes(deferredQuery)) ||
      (p.description && p.description.toLowerCase().includes(deferredQuery)) ||
      (p.manufacturer && p.manufacturer.toLowerCase().includes(deferredQuery)) ||
      (p.category && p.category.toLowerCase().includes(deferredQuery)) ||
      (Array.isArray(p.applications) &&
        p.applications.some((app) => app && app.toLowerCase().includes(deferredQuery))) ||
      (Array.isArray(p.features) &&
        p.features.some((f) => f && f.toLowerCase().includes(deferredQuery)));
    return matchesCategory && matchesQuery;
  });

  const isSearchActive = deferredQuery.length > 0;

  return (
    <div className="bg-[#FAF7F2] text-[#161210]">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="CHINA TO INDIA TEXTILE MACHINERY SOURCING"
        categoryNumber="PRODUCTS"
        title="SOURCING CHINA'S PRECISION MACHINERY."
        copy="High-performance textile machinery sourced from China's premier engineering manufacturers. Inspected on-site with 8-hour load trials, certified for Indian 415V/50Hz power grids, and delivered directly to your mill gates under EPCG schemes."
        image={tradeProducts}
      />

      {/* 2. Real-Time Machinery Telemetry Metrics Strip */}
      <section className="border-b border-[#C5A059]/30 bg-[#161210] py-6 sm:py-8 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                CATALOGUE MODELS
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                50+ Units
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Looms, Spinning &amp; Knitting Lines
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                ORIGIN PLANTS
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                120+ Audited
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Shanghai, Wuxi &amp; Guangzhou OEMs
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                LOAD RUN TRIAL
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                100% Pass
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                8-Hour Factory Run Tests
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                CUSTOMS TARIFF
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#DFBA6F]">
                0% EPCG
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Complete DGFT Documentation Pack
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Marquee Ticker */}
      <MarqueeTicker />

      {/* 4. Control Bar: Search & Category Filter */}
      <section className="sticky top-20 sm:top-24 lg:top-28 z-30 border border-[#D8CEBD] bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 sm:px-6 py-3 sm:py-4 lg:px-8 shadow-md rounded-2xl mx-2.5 sm:mx-6 lg:mx-auto max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1900px] mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-12">
        <div className="flex flex-col gap-2.5 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-2 lg:pb-0 scrollbar-none">
            {MACHINE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 border px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl font-mono text-[9.5px] sm:text-[11px] 2xl:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#161210] bg-[#161210] text-[#FAF7F2] shadow-sm"
                      : "border-[#D8CEBD] bg-transparent text-[#6B625B] hover:border-[#C5A059] hover:text-[#161210]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 2xl:w-80">
            <Search
              size={14}
              className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-[#6B625B]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search machinery, specs, models…"
              className="w-full border border-[#D8CEBD] bg-[#F4EFE6] py-1.5 sm:py-2 pl-8 sm:pl-9 pr-8 font-sans text-xs 2xl:text-sm text-[#161210] placeholder:text-[#6B625B]/50 focus:border-[#C5A059] focus:outline-none rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B625B] hover:text-[#161210] cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 pb-16 sm:pb-24 lg:px-12 2xl:px-16 lg:pb-32">
        {/* Results Counter & Filter Reset */}
        <div className="flex items-center justify-between border-b border-[#D8CEBD] pb-3 sm:pb-4 mb-6 sm:mb-10">
          <span className="font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#6B625B]">
            SHOWING {filteredProducts.length} MACHINES IN [ {selectedCategory.toUpperCase()} ]
          </span>
          {(isSearchActive || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="font-mono text-xs font-bold text-[#9E4E39] uppercase hover:underline cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="border border-[#D8CEBD] bg-[#FAF7F2] p-16 text-center shadow-sm rounded-2xl">
            <Compass size={36} className="mx-auto text-[#C5A059]" />
            <h3 className="mt-4 font-serif text-2xl font-bold text-[#161210]">
              No matching machinery found
            </h3>
            <p className="mt-2 text-sm text-[#6B625B]">
              Try adjusting your search keywords or resetting category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#161210] px-6 py-2.5 font-mono text-xs font-bold uppercase text-[#FAF7F2] hover:bg-[#C5A059] transition cursor-pointer"
            >
              <span>RESET SEARCH</span>
            </button>
          </div>
        ) : (
          /* Grid of Industrial Textile Machines */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        )}

        {/* Bottom Editorial Callout */}
        <div className="mt-20 rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#9E4E39]">
              [ BESPOKE MACHINERY PROCUREMENT ]
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#161210]">
              Need a Custom Textile Machine or Turnkey Plant Line?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B625B] leading-relaxed">
              If your desired machine model, spindle count, or production gauge is not listed above, our Guangzhou and Shanghai sourcing engineering desks will scout, inspect, and negotiate factory direct terms on your behalf.
            </p>
          </div>
          <Link
            to="/contact"
            className="w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#161210] px-5 sm:px-8 py-2.5 sm:py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#9E4E39] transition shadow-md"
          >
            <span>SUBMIT CUSTOM REQUIREMENT</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MachineCard({ machine }: { machine: TextileMachine }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] transition-all duration-300 hover:border-[#C5A059] hover:shadow-xl">
      {/* Machine Image */}
      <div className="relative h-56 sm:h-60 overflow-hidden bg-[#161210]">
        <img
          src={machine.image}
          alt={machine.name}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/80 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-lg bg-[#161210]/85 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-[#DFBA6F] border border-[#C5A059]/30">
            {machine.category}
          </span>
        </div>

        {/* Origin Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#161210]/90 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] text-[#FAF7F2] border border-white/10">
            <span>🇨🇳</span>
            <span>{machine.origin || machine.country || "China"}</span>
          </span>
        </div>
      </div>

      {/* Machine Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2">
          <span className="font-mono text-[10px] font-bold uppercase text-[#9E4E39] tracking-wider block">
            MANUFACTURER: {machine.manufacturer}
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#161210] group-hover:text-[#9E4E39] transition-colors leading-snug">
            {machine.name}
          </h3>
          <p className="text-xs text-[#6B625B] line-clamp-2 leading-relaxed">
            {machine.description}
          </p>
        </div>

        {/* Key Technical Specs Pills */}
        <div className="grid grid-cols-2 gap-2 border-t border-[#D8CEBD] pt-3 text-[11px] font-mono">
          <div className="bg-[#F4EFE6] p-2 rounded-lg">
            <span className="text-[#6B625B] text-[9px] block uppercase">SPEED / RPM</span>
            <span className="font-bold text-[#161210]">{machine.specs?.speed || machine.specifications?.productionSpeed || "850 – 1,100 RPM"}</span>
          </div>
          <div className="bg-[#F4EFE6] p-2 rounded-lg">
            <span className="text-[#6B625B] text-[9px] block uppercase">POWER</span>
            <span className="font-bold text-[#161210]">{machine.specs?.power || machine.specifications?.powerConsumption || "3.7 kW – 5.5 kW"}</span>
          </div>
          <div className="bg-[#F4EFE6] p-2 rounded-lg">
            <span className="text-[#6B625B] text-[9px] block uppercase">AUTOMATION</span>
            <span className="font-bold text-[#161210]">{machine.specs?.automation || machine.specifications?.automation || "PLC Automatic"}</span>
          </div>
          <div className="bg-[#F4EFE6] p-2 rounded-lg">
            <span className="text-[#6B625B] text-[9px] block uppercase">CAPACITY</span>
            <span className="font-bold text-[#161210]">{machine.specs?.capacity || machine.specifications?.capacity || "Continuous Production"}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to="/products/$slug"
            params={{ slug: machine.slug }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#161210] py-2.5 font-mono text-xs font-bold uppercase text-[#FAF7F2] hover:bg-[#C5A059] hover:text-[#161210] transition-colors"
          >
            <span>VIEW DETAILS</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center justify-center rounded-xl border border-[#D8CEBD] px-3 py-2.5 font-mono text-xs font-semibold text-[#161210] hover:border-[#C5A059] hover:bg-[#C5A059]/15 transition-colors"
            title="Inquire about this machine"
          >
            INQUIRE
          </Link>
        </div>
      </div>
    </div>
  );
}
