import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Globe2,
  PackageCheck,
  Search,
  ShieldCheck,
  Ship,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHero, SectionLabel } from "./site";
import terminal from "../assets/industry-terminal.jpg";
import warehouse from "../assets/warehouse-operations.jpg";

export function ImportPage() {
  const importSteps = [
    {
      num: "01",
      title: "ORIGIN SOURCING",
      desc: "Identify verified farm cooperatives, certified manufacturing mills, and regional suppliers meeting exact chemical, dimensional, and biological tolerances.",
      icon: Search,
    },
    {
      num: "02",
      title: "SUPPLIER AUDITING",
      desc: "Perform comprehensive corporate background checks, factory environmental safety audits, and commercial creditworthiness assessments before purchase agreements.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "PRE-SHIPMENT INSPECTION",
      desc: "Mandate physical cargo sampling, moisture and purity testing, and seal integrity verification by accredited surveyors (SGS / Bureau Veritas standard).",
      icon: PackageCheck,
    },
    {
      num: "04",
      title: "CUSTOMS & CLASSIFICATION",
      desc: "Prepare accurate Harmonized System (HS) code filings, import licenses, consular trade invoices, and preferential tariff documentation (Form A / COO).",
      icon: ClipboardCheck,
    },
    {
      num: "05",
      title: "OCEAN & MULTIMODAL FREIGHT",
      desc: "Coordinate dedicated container slot bookings, reefer temperature telemetry, and marine cargo insurance covering door-to-door transit.",
      icon: Ship,
    },
    {
      num: "06",
      title: "TERMINAL & BONDED DELIVERY",
      desc: "Oversee port discharge handling, bonded customs warehouse storage, and final-mile carrier dispatch directly into your receiving facility.",
      icon: Warehouse,
    },
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      <PageHero
        eyebrow="INBOUND SOLUTIONS"
        categoryNumber="IMPORT"
        title="BRINGING THE WORLD IN."
        copy="Structured international sourcing, verified quality inspection, and multimodal freight management delivered with transparent milestone accountability from factory floor to domestic warehouse."
        image={warehouse}
      />

      {/* Narrative Section in Deep Olive */}
      <section className="bg-[#2D3325] py-20 lg:py-28 px-6 lg:px-12 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">
                [ THE INBOUND FRAMEWORK ]
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
                Control from Producer
                <br />
                <span className="text-[#C5A059] italic">to Destination Port.</span>
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[#FAF7F2]/80">
                Importing across international jurisdictions involves currency exposure, maritime
                risk, phytosanitary barriers, and complex border tariffs.
              </p>
              <p className="text-sm leading-relaxed text-[#FAF7F2]/65">
                Meridian acts as your dedicated trade desk—managing supplier verification, drafting
                bulletproof Incoterms purchase agreements, securing ocean freight allocations, and
                executing fast-track customs clearance.
              </p>
            </div>

            <div className="border border-[#C5A059]/40 bg-[#1E2319] p-8 sm:p-10 shadow-2xl">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-4">
                [ INBOUND RISK MITIGATION ]
              </span>
              <ul className="space-y-4 font-mono text-xs text-[#FAF7F2]/80">
                <li className="flex items-start gap-3 border-b border-[#FAF7F2]/10 pb-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>Escrow & Documentary Letter of Credit (L/C) protection</span>
                </li>
                <li className="flex items-start gap-3 border-b border-[#FAF7F2]/10 pb-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>Phytosanitary & Non-GMO laboratory certification</span>
                </li>
                <li className="flex items-start gap-3 border-b border-[#FAF7F2]/10 pb-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>GPS temperature tracking for reefer food containers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>Pre-cleared customs documentation prior to vessel berthing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed 6-Stage Grid */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="border-b border-[#D8CEBD] pb-8">
          <SectionLabel number="01">STEP-BY-STEP DISCIPLINE</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161210]">
            The 6-Stage Inbound Architecture
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {importSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.num}
                className="group border border-[#D8CEBD] bg-[#FAF7F2] p-8 transition-all duration-300 hover:border-[#C5A059] hover:shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-[#D8CEBD] pb-4">
                  <span className="font-mono text-2xl font-bold text-[#3E4C34]">{step.num}</span>
                  <Icon size={22} className="text-[#C5A059]" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-bold text-[#161210] group-hover:text-[#9E4E39] transition-colors">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B625B]">{step.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Trade Call to Action */}
      <TradeCTA
        title="Planning an Inbound Shipment or Seeking a Verified Supplier?"
        buttonText="REQUEST INBOUND QUOTE"
        direction="Import"
      />
    </div>
  );
}

export function ExportPage() {
  const exportSteps = [
    {
      num: "01",
      title: "MARKET RESEARCH & TARIFF AUDIT",
      desc: "Analyze destination market pricing, import quotas, tariff schedules, and technical packaging mandates before dispatch.",
      icon: Search,
    },
    {
      num: "02",
      title: "OVERSEAS BUYER NETWORK",
      desc: "Connect qualified producers directly with vetted importers, distributors, retail consortia, and manufacturing hubs.",
      icon: Users,
    },
    {
      num: "03",
      title: "EXPORT PACKAGING OPTIMIZATION",
      desc: "Engineer heavy double-wall corrugated cartons, ISPM-15 fumigated timber pallets, and VCI rust protection for ocean transit.",
      icon: PackageCheck,
    },
    {
      num: "04",
      title: "QUALITY INSPECTION & STAMP",
      desc: "Conduct pre-shipment sampling, lab testing, batch certification, and weight bridge verification prior to container stuffing.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "TRADE DOCUMENTATION",
      desc: "Prepare consular invoices, Certificates of Origin, commercial packing manifests, and Letters of Credit compliance packages.",
      icon: ClipboardCheck,
    },
    {
      num: "06",
      title: "VESSEL ALLOCATION & LOGISTICS",
      desc: "Secure direct-call ocean liner space, multimodal port rail linkages, and international marine insurance.",
      icon: Ship,
    },
    {
      num: "07",
      title: "GLOBAL DELIVERY & HANDOVER",
      desc: "Maintain continuous vessel AIS milestone tracking until container gate-out and consignee acceptance sign-off.",
      icon: Globe2,
    },
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      <PageHero
        eyebrow="OUTBOUND COMMERCE"
        categoryNumber="EXPORT"
        title="TAKING VALUE OUT."
        copy="Turn local production excellence into reliable international commodities. From buyer introduction and packaging readiness to Letters of Credit and global ocean delivery."
        image={terminal}
      />

      {/* Narrative Section in Warm Terracotta */}
      <section className="bg-[#9E4E39] py-20 lg:py-28 px-6 lg:px-12 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#161210] uppercase">
                [ THE OUTBOUND CORRIDOR ]
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight text-[#FAF7F2]">
                Expand Beyond
                <br />
                <span className="text-[#FAF7F2]/80 italic">Domestic Horizons.</span>
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[#FAF7F2]/90">
                Exporting successfully requires far more than loading a shipping container. It
                demands aligning products with international consumer tastes, complying with
                stringent destination testing standards, and executing flawless trade documentation.
              </p>
              <p className="text-sm leading-relaxed text-[#FAF7F2]/80">
                Meridian bridges high-quality producers with trusted buyer syndicates across Europe,
                the Middle East, North America, and East Asia, protecting your margins with
                structured commercial terms.
              </p>
            </div>

            <div className="border border-[#FAF7F2]/40 bg-[#833D2A] p-8 sm:p-10 shadow-2xl">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#FAF7F2]/80 block mb-4">
                [ EXPORT READINESS CRITERIA ]
              </span>
              <ul className="space-y-4 font-mono text-xs text-[#FAF7F2]">
                <li className="flex items-start gap-3 border-b border-[#FAF7F2]/20 pb-3">
                  <Check size={16} className="text-[#FAF7F2] shrink-0" />
                  <span>International packaging & labeling compliance</span>
                </li>
                <li className="flex items-start gap-3 border-b border-[#FAF7F2]/20 pb-3">
                  <Check size={16} className="text-[#FAF7F2] shrink-0" />
                  <span>Guaranteed ocean container slot commitments</span>
                </li>
                <li className="flex items-start gap-3 border-b border-[#FAF7F2]/20 pb-3">
                  <Check size={16} className="text-[#FAF7F2] shrink-0" />
                  <span>Consular legalization & Chamber of Commerce stamps</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-[#FAF7F2] shrink-0" />
                  <span>Incoterms: FOB Port of Origin, CIF, or DAP</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed 7-Stage Process */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="border-b border-[#D8CEBD] pb-8">
          <SectionLabel number="02">OUTBOUND PROTOCOL</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161210]">
            The 7-Stage Export Pipeline
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {exportSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <article
                key={step.num}
                className={`group border border-[#D8CEBD] bg-[#FAF7F2] p-8 transition-all duration-300 hover:border-[#9E4E39] hover:shadow-xl ${
                  idx === 6 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#D8CEBD] pb-4">
                  <span className="font-mono text-2xl font-bold text-[#9E4E39]">{step.num}</span>
                  <Icon size={22} className="text-[#C5A059]" />
                </div>
                <h3 className="mt-6 font-serif text-lg font-bold text-[#161210] group-hover:text-[#9E4E39] transition-colors">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#6B625B]">{step.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Trade Call to Action */}
      <TradeCTA
        title="Ready to Export Your Products to International Buyers?"
        buttonText="REQUEST EXPORT ASSESSMENT"
        direction="Export"
      />
    </div>
  );
}

function TradeCTA({
  title,
  buttonText,
  direction,
}: {
  title: string;
  buttonText: string;
  direction: "Import" | "Export";
}) {
  return (
    <section className="border-t border-[#D8CEBD] bg-[#161210] py-20 px-6 lg:px-12 text-[#FAF7F2] text-center">
      <div className="mx-auto max-w-3xl space-y-5">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block">
          [ ADVANCE YOUR COMMERCIAL REACH ]
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">{title}</h2>
        <p className="text-sm md:text-base text-[#FAF7F2]/70 max-w-xl mx-auto leading-relaxed">
          Submit your product specifications, target volume, origin, and destination ports. Our
          trade desk will structure the commercial path.
        </p>
        <div className="pt-6">
          <Link
            to="/request-quote"
            className="inline-flex items-center gap-3 border border-[#C5A059] bg-[#C5A059] px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#161210] hover:bg-[#FAF7F2] transition-colors"
          >
            <span>{buttonText}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
