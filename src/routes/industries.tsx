import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Compass,
  Factory,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHero, SectionLabel, MarqueeTicker } from "../components/site";
import { useMachineryStore, type TextileIndustry } from "../lib/machinery-store";
import industryTerminal from "../assets/industry-terminal.jpg";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Indian Textile Industries We Equip — Machinery Sourcing | Confident" },
      {
        name: "description",
        content:
          "Equipping Indian spinning, weaving, knitting, dyeing, and denim manufacturing mills with precision machinery sourced and verified from leading Chinese manufacturers.",
      },
      { property: "og:title", content: "Textile Industries Served | Confident Machinery" },
      {
        property: "og:description",
        content:
          "Direct machinery supply channels from China to India's major textile production hubs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const { industries, products } = useMachineryStore();
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(null);

  const activeIndustry = selectedIndustryId
    ? industries.find((ind) => ind.id === selectedIndustryId)
    : null;

  // Filter matching machines for active industry
  const matchingMachines = activeIndustry
    ? (products || []).filter(
        (m) =>
          (activeIndustry.suitableMachinery || []).some((sm) =>
            (m.name && m.name.toLowerCase().includes(sm.toLowerCase())) ||
            (sm && sm.toLowerCase().includes((m.name || "").toLowerCase())) ||
            (m.category && m.category.toLowerCase().includes(sm.toLowerCase()))
          ) ||
          (Array.isArray(m.applications) &&
            m.applications.some((app) =>
              (app && app.toLowerCase().includes((activeIndustry.name || "").toLowerCase())) ||
              (activeIndustry.name && activeIndustry.name.toLowerCase().includes(app.toLowerCase()))
            ))
      )
    : [];

  return (
    <div className="bg-[#FAF7F2] text-[#161210]">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="CHINA TO INDIA TEXTILE INDUSTRIAL CORRIDORS"
        categoryNumber="INDUSTRIES"
        title="EQUIPPING INDIA'S TEXTILE INDUSTRIAL VERTICALS."
        copy="From Tirupur's knitwear corridors to Surat's weaving epicenters, Coimbatore's spinning mills, and Ludhiana's wool processing plants. We source, inspect, and deliver high-precision Chinese textile machinery tailored to specific Indian production verticals."
        image={industryTerminal}
      />

      {/* 2. Real-Time Industry Telemetry Metrics Strip */}
      <section className="border-b border-[#C5A059]/30 bg-[#161210] py-6 sm:py-8 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                SECTORS EQUIPPED
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                6 Verticals
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Spinning, Weaving, Knitting &amp; Dyeing
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                MILL HUBS SERVED
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                12 Clusters
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Surat, Tirupur, Coimbatore &amp; Ludhiana
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                POWER GRID SPEC
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                415V / 50Hz
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Indian Grid Synchronized Motors
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                MACHINERY DELIVERED
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#DFBA6F]">
                500+ Units
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Factory Delivery to Production Floor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Marquee Ticker */}
      <MarqueeTicker />

      {/* 4. Main Interactive Industry Directory */}
      <section className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 py-16 lg:px-12 2xl:px-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8CEBD] pb-6 mb-12 gap-4">
          <div>
            <SectionLabel number="01">SECTOR PORTFOLIO</SectionLabel>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161210]">
              Textile Sectors We Power
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#6B625B]">
            Select any textile sector to view its typical Indian manufacturing hubs, compliance requirements, and suitable Chinese machinery.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((ind, idx) => {
            const isSelected = selectedIndustryId === ind.id;

            return (
              <div
                key={ind.id}
                onClick={() => setSelectedIndustryId(isSelected ? null : ind.id)}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#161210] bg-[#FAF7F2] shadow-2xl ring-2 ring-[#C5A059]"
                    : "border-[#D8CEBD] bg-[#FAF7F2] hover:border-[#C5A059] hover:shadow-xl"
                }`}
              >
                {/* Industry Hero Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#161210]">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/90 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="rounded-lg bg-[#161210]/85 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-[#DFBA6F] border border-[#C5A059]/30">
                      SECTOR 0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-lg font-bold text-[#FAF7F2] leading-tight group-hover:text-[#DFBA6F] transition-colors">
                      {ind.name}
                    </h3>
                  </div>
                </div>

                {/* Industry Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] text-[#9E4E39] font-bold">
                      {ind.tagline}
                    </p>
                    <p className="text-xs text-[#6B625B] leading-relaxed line-clamp-3">
                      {ind.description}
                    </p>
                  </div>

                  {/* Suitable Machinery Snippet */}
                  <div className="space-y-2 border-t border-[#D8CEBD] pt-3">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#161210] block">
                      SUITABLE MACHINERY:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(ind.suitableMachinery || []).map((sm, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-[#F4EFE6] border border-[#D8CEBD] px-2 py-0.5 font-mono text-[10px] text-[#161210]"
                        >
                          {sm}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Indian Clusters */}
                  <div className="border-t border-[#D8CEBD] pt-3 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#6B625B] uppercase flex items-center gap-1">
                      <MapPin size={11} className="text-[#C5A059]" />
                      <span>CLUSTERS:</span>
                    </span>
                    <span className="font-bold text-[#161210] truncate max-w-[150px]">
                      {(ind.clusters || []).slice(0, 2).join(", ")}
                    </span>
                  </div>

                  {/* Card Toggle Button */}
                  <button
                    type="button"
                    className={`w-full rounded-xl py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                      isSelected
                        ? "bg-[#161210] text-[#FAF7F2]"
                        : "bg-[#F4EFE6] text-[#161210] hover:bg-[#C5A059] hover:text-[#161210]"
                    }`}
                  >
                    <span>{isSelected ? "HIDE MATCHING MACHINES" : "VIEW MATCHING MACHINES"}</span>
                    <ArrowRight size={12} className={isSelected ? "rotate-90" : ""} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Industry Detail & Matching Machines Modal / Drawer */}
        {activeIndustry && (
          <div className="mt-12 rounded-2xl border-2 border-[#C5A059] bg-[#FAF7F2] p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[#D8CEBD] pb-6 gap-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9E4E39]">
                  [ ACTIVE INDUSTRY FOCUS ]
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#161210] mt-1">
                  {activeIndustry.name}
                </h3>
                <p className="text-sm text-[#6B625B] mt-1 font-mono">
                  Major Indian Manufacturing Hubs: <strong>{(activeIndustry.clusters || []).join(" · ")}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  to="/contact"
                  className="rounded-xl bg-[#161210] px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs font-bold uppercase text-[#FAF7F2] hover:bg-[#C5A059] hover:text-[#161210] transition shadow-md w-auto"
                >
                  Inquire for Sector
                </Link>
                <button
                  onClick={() => setSelectedIndustryId(null)}
                  className="rounded-xl border border-[#D8CEBD] px-3.5 sm:px-4 py-2.5 sm:py-3 font-mono text-xs font-bold uppercase text-[#6B625B] hover:text-[#161210] cursor-pointer w-auto"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Compliance & Regulatory Standards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(activeIndustry.compliance || []).map((c, i) => (
                <div key={i} className="rounded-xl bg-[#F4EFE6] border border-[#D8CEBD] p-4 flex items-center gap-3">
                  <ShieldCheck size={20} className="text-[#C5A059] shrink-0" />
                  <span className="font-mono text-xs font-bold text-[#161210]">{c}</span>
                </div>
              ))}
            </div>

            {/* Matching Machinery Sourced from China */}
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9E4E39] block">
                [ RECOMMENDED CHINESE MACHINERY FOR THIS SECTOR ]
              </span>

              {matchingMachines.length === 0 ? (
                <div className="rounded-xl bg-[#F4EFE6] p-8 text-center border border-[#D8CEBD]">
                  <p className="text-sm text-[#6B625B]">
                    Our engineers source custom turnkey plant lines for {activeIndustry.name}.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-3 inline-flex items-center gap-2 font-mono text-xs font-bold text-[#161210] hover:text-[#9E4E39] uppercase underline"
                  >
                    <span>Request custom plant configuration</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {matchingMachines.map((m) => (
                    <Link
                      key={m.id}
                      to="/products/$slug"
                      params={{ slug: m.slug }}
                      className="group rounded-xl border border-[#D8CEBD] bg-[#FAF7F2] p-4 hover:border-[#C5A059] hover:shadow-md transition-all flex items-center gap-4"
                    >
                      <div className="size-20 rounded-lg overflow-hidden shrink-0 bg-[#161210]">
                        <img src={m.image} alt={m.name} className="size-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-mono text-[9px] font-bold uppercase text-[#9E4E39] block">
                          🇨🇳 {m.manufacturer}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-[#161210] truncate group-hover:text-[#9E4E39] transition-colors">
                          {m.name}
                        </h4>
                        <span className="font-mono text-[11px] text-[#6B625B] block mt-1">
                          Speed: {m.specs?.speed || m.specifications?.productionSpeed || "850 – 1,100 RPM"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
