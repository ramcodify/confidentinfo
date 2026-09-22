import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Globe2,
  Headphones,
  PackageCheck,
  Scale,
  Search,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { MarqueeTicker, PageHero, SectionLabel } from "../components/site";
import { useMachineryStore } from "../lib/machinery-store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Confident Textiles Machinery — China to India Machinery Sourcing" },
      {
        name: "description",
        content:
          "Learn how Confident Textiles Machinery sources, verifies, and facilitates the import of reliable textile machinery from trusted Chinese manufacturers to textile industries across India.",
      },
      { property: "og:title", content: "About Confident Textiles Machinery" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { companyInfo } = useMachineryStore();

  const processStages = [
    {
      num: "01",
      title: "Supplier Identification",
      desc: "Direct origin factory discovery in Shanghai, Wuxi, Guangzhou & Ningbo. Evaluating manufacturer track records and technical capabilities.",
      icon: Search,
    },
    {
      num: "02",
      title: "Machinery Evaluation",
      desc: "Comprehensive engineering review of machine frames, motor specs, electronic controllers, and power grid compatibility.",
      icon: Wrench,
    },
    {
      num: "03",
      title: "Quality Verification",
      desc: "On-site pre-shipment inspection, test-run calibration, noise/vibration testing, and component authenticity validation.",
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "Documentation",
      desc: "Bill of Lading, Packing Lists, CE/ISO certificates, Form A/COO, and Letter of Credit (L/C) compliance alignment.",
      icon: ClipboardCheck,
    },
    {
      num: "05",
      title: "Export & Logistics",
      desc: "ISPM-15 anti-moisture barrier crating, container stuffing, and tier-1 ocean liner bookings from Chinese ports.",
      icon: Ship,
    },
    {
      num: "06",
      title: "Delivery to India",
      desc: "Port customs clearance at Chennai, Mundra, or Nhava Sheva with low-bed road trailer transit to factory doorstep.",
      icon: Truck,
    },
    {
      num: "07",
      title: "Customer Support",
      desc: "Installation coordination, commissioning assistance, genuine spare parts supply, and long-term technical advisory.",
      icon: Headphones,
    },
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#161210]">
      {/* 1. EDITORIAL PAGE HERO */}
      <PageHero
        eyebrow="CHINA TO INDIA TEXTILE MACHINERY SOURCING DESK"
        categoryNumber="ABOUT"
        title="SOURCING CHINA'S MACHINERY FOR INDIA'S MILLS."
        copy={companyInfo.heroSupportingText || "Confident Textiles Machinery bridges Chinese engineering excellence with India's manufacturing mills—eliminating import risk through on-site factory verification, ISO pre-shipment inspections, and seamless port-to-factory logistics across Indian customs gateways."}
        image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
      />

      {/* 2. REAL-TIME BILATERAL TRADE METRICS STRIP */}
      <section className="border-b border-[#C5A059]/30 bg-[#161210] py-6 sm:py-8 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                ESTABLISHED
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                2012
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                14+ Years Bilateral Trade
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                ORIGIN BASINS
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                4 Hubs
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Shanghai, Wuxi & Guangzhou
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                PRE-SHIPMENT AUDIT
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                100%
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                8-Hour Factory Run Trials
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                INDIAN REACH
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#DFBA6F]">
                Mill Gate
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Pan-India Textile Clusters
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MARQUEE TICKER */}
      <MarqueeTicker />

      {/* Section 1: Company Introduction */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <SectionLabel number="01">COMPANY INTRODUCTION</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161210] leading-tight">
                About Confident
                <br />
                <span className="text-[#9E4E39] italic">Textiles Machinery.</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6B625B] leading-relaxed">
                {companyInfo.aboutIntro ||
                  "Confident Textiles Machinery specializes in sourcing and supplying textile machinery from China to textile and manufacturing industries across India."}
              </p>
              <p className="text-sm sm:text-base text-[#6B625B] leading-relaxed">
                We understand that purchasing industrial capital equipment from overseas requires more than browsing a catalogue. It demands deep technical knowledge, on-the-ground presence in Chinese manufacturing basins, strict pre-shipment quality verification, and seamless port-to-factory logistics across Indian customs gateways.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-4 border-t border-[#D8CEBD] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#C5A059]" />
                  <span>Verified Chinese OEMs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#C5A059]" />
                  <span>On-Site Factory Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#C5A059]" />
                  <span>Incoterms 2020 Rigor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#C5A059]" />
                  <span>Doorstep Mill Delivery</span>
                </div>
              </div>
            </div>

            {/* Visual Box */}
            <div className="rounded-3xl border border-[#C5A059]/40 bg-[#161210] p-6 sm:p-10 text-[#FAF7F2] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-[#C5A059] tracking-widest uppercase font-bold block">
                [ THE CONFIDENT COMMITMENT ]
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Eliminating Risk in Machinery Import
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                Indian textile manufacturers face significant hurdles when attempting to import machinery independently: language barriers, unverified factory claims, substandard component substitutions, and customs delays at Indian ports.
              </p>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
                Confident acts as your dedicated on-the-ground sourcing desk in China and logistics partner in India—ensuring complete contractual security, machinery precision, and dependable operational performance.
              </p>
              <div className="pt-2">
                <Link
                  to="/products"
                  className="w-auto inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 sm:px-7 py-2.5 sm:py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition shadow-md"
                >
                  <span>EXPLORE OUR MACHINERY RANGE</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Detailed Pillars (What we do, Where sourced, Quality, Logistics, Support) */}
      <section className="bg-[#161210] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 text-[#FAF7F2] border-y border-[#C5A059]/25">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl space-y-3 mb-12">
            <SectionLabel dark number="02">OPERATIONAL ARCHITECTURE</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              How China → India Supply Works
            </h2>
            <p className="text-sm sm:text-base text-[#FAF7F2]/75 leading-relaxed">
              Every machine delivered across India follows a structured, disciplined commercial and engineering protocol.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Where Machines Are Sourced */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] space-y-3">
              <span className="font-mono text-xs text-[#C5A059] font-bold block">01 · ORIGIN HUBS</span>
              <h4 className="font-serif text-xl font-bold">Where Machines Are Sourced</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Direct partnerships with audited machinery clusters in Shanghai, Wuxi, Guangzhou, Ningbo, and Qingdao—China's recognized centers of textile engineering excellence.
              </p>
            </div>

            {/* How Suppliers Are Selected */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] space-y-3">
              <span className="font-mono text-xs text-[#C5A059] font-bold block">02 · VETTING PROTOCOL</span>
              <h4 className="font-serif text-xl font-bold">How Suppliers Are Selected</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                We evaluate factory manufacturing licenses, ISO accreditations, machine frame casting tolerances, servo controller authenticity, and commercial creditworthiness before signing any supply agreement.
              </p>
            </div>

            {/* Quality Verification */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] space-y-3">
              <span className="font-mono text-xs text-[#C5A059] font-bold block">03 · CALIBRATION CHECKS</span>
              <h4 className="font-serif text-xl font-bold">Quality Verification</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Our engineering team conducts on-site test runs, high-speed vibration analysis, noise decibel testing, and electronic touch-screen diagnostics prior to container dispatch.
              </p>
            </div>

            {/* Import Process */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] space-y-3">
              <span className="font-mono text-xs text-[#C5A059] font-bold block">04 · REGULATORY MASTERY</span>
              <h4 className="font-serif text-xl font-bold">Import Process & Documentation</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                We handle complete Incoterms 2020 purchase agreements, clean ocean Bills of Lading, consular invoices, and Indian Harmonized System (HS) code classifications to eliminate tariff surprises.
              </p>
            </div>

            {/* Logistics Support */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] space-y-3">
              <span className="font-mono text-xs text-[#C5A059] font-bold block">05 · PORT DISPATCH</span>
              <h4 className="font-serif text-xl font-bold">Logistics Support</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Chartered vessel allocations on direct-call routes into Chennai, Nhava Sheva (JNPT) Mumbai, and Mundra ports with low-bed multi-axle trailer delivery to your factory.
              </p>
            </div>

            {/* Customer Support */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#C5A059]/25 bg-[#1E1916] space-y-3">
              <span className="font-mono text-xs text-[#C5A059] font-bold block">06 · AFTER-SALES CARE</span>
              <h4 className="font-serif text-xl font-bold">Customer & Technical Support</h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
                Post-delivery installation guidance, machine commissioning oversight, genuine OEM spare parts supply, and responsive technical troubleshooting across all Indian textile hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 7-Stage Horizontal Process Timeline */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl space-y-3 mb-12">
            <SectionLabel number="03">PROCESS TIMELINE</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161210]">
              The 7-Stage
              <br />
              <span className="text-[#9E4E39] italic">Sourcing & Delivery Pipeline.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#6B625B] leading-relaxed">
              From initial factory identification in China to successful commissioning on the Indian factory floor.
            </p>
          </div>

          {/* Horizontal Process Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {processStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.num}
                  className="rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-5 space-y-3 transition-all hover:border-[#C5A059] hover:shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#D8CEBD] pb-3">
                      <span className="font-mono text-lg font-bold text-[#9E4E39]">{stage.num}</span>
                      <Icon size={18} className="text-[#C5A059]" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#161210] leading-snug">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-[#6B625B] leading-relaxed font-sans">
                      {stage.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-mono text-[#C5A059] font-bold">
                    STAGE {idx + 1} OF 7
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Requirement Submission Banner */}
      <section className="bg-[#161210] py-16 sm:py-20 px-4 sm:px-6 lg:px-12 text-[#FAF7F2] text-center border-t border-[#C5A059]/30">
        <div className="mx-auto max-w-3xl space-y-5">
          <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#C5A059]">
            [ COLLABORATE WITH CONFIDENT ]
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold">
            Ready to Upgrade Your Textile Facility?
          </h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/75 leading-relaxed">
            Discuss your machinery specifications with our China sourcing desk today. We will provide verified factory options, technical datasheets, and CIF Indian port quotations.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-5 sm:px-7 py-2.5 sm:py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition-colors shadow-md w-auto mx-auto"
            >
              <span>Request Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
