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
  Wrench,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHero, SectionLabel } from "./site";
import terminal from "../assets/industry-terminal.jpg";
import warehouse from "../assets/warehouse-operations.jpg";
import { useSiteContent } from "../lib/site-content";

export function ImportPage() {
  const { content } = useSiteContent();

  const importSteps = [
    {
      num: "01",
      title: "ORIGIN MACHINERY SOURCING",
      desc: "Identify verified Chinese original equipment manufacturers (OEMs) in Shanghai, Wuxi, Guangzhou, and Ningbo meeting exact mechanical, speed, and automation tolerances.",
      icon: Search,
    },
    {
      num: "02",
      title: "SUPPLIER AUDITING & CALIBRATION",
      desc: "Perform comprehensive factory background checks, casting frame assessments, and servo drive vetting prior to executing bilateral purchase agreements.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "ON-SITE 8-HOUR RUN TRIAL",
      desc: "Mandate continuous factory floor test-runs on customer-specified yarn or fabric. Test vibration levels, pick insertion rates, and electronic sensor responsiveness.",
      icon: PackageCheck,
    },
    {
      num: "04",
      title: "CUSTOMS & EPCG CLASSIFICATION",
      desc: "Prepare accurate Harmonized System (HS) code filings (HS 8445/8446/8447/8448), EPCG 0% duty license alignment, consular invoices, and Certificates of Origin.",
      icon: ClipboardCheck,
    },
    {
      num: "05",
      title: "VCI CRATING & OCEAN FREIGHT",
      desc: "Apply Volatile Corrosion Inhibitor (VCI) vacuum packaging with ISPM-15 timber crating, securing dedicated 40ft HC or Flat Rack container slots on direct liner vessels.",
      icon: Ship,
    },
    {
      num: "06",
      title: "INDIAN MILL GATE COMMISSIONING",
      desc: "Oversee port customs clearance at Nhava Sheva, Mundra, or Chennai, coordinated road trailer transit, and on-site technician trial commissioning at your textile mill.",
      icon: Warehouse,
    },
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      <PageHero
        eyebrow="INBOUND SOURCING SOLUTIONS"
        categoryNumber="IMPORT"
        title="CHINA TO INDIA MACHINERY IMPORT."
        copy="Structured machinery sourcing from China's premier textile equipment manufacturers. Verified quality inspection, EPCG duty facilitation, and multimodal ocean freight delivered directly to Indian textile mills."
        image={content.media.warehouseOperations || warehouse}
      />

      {/* Narrative Section in Deep Obsidian & Warm Gold */}
      <section className="bg-[#161210] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 2xl:px-16 text-[#FAF7F2] border-b border-[#C5A059]/20">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">
                [ THE INBOUND SOURCING FRAMEWORK ]
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl 2xl:text-6xl font-bold leading-tight">
                Control from Factory Floor
                <br />
                <span className="text-[#C5A059] italic">to Indian Mill Gates.</span>
              </h2>
              <p className="text-sm md:text-base 2xl:text-lg leading-relaxed text-[#FAF7F2]/80">
                Importing industrial machinery from China involves complex variables: language barriers, component substitutions, maritime humidity corrosion, and intricate Indian customs regulations.
              </p>
              <p className="text-sm 2xl:text-base leading-relaxed text-[#FAF7F2]/65">
                Confident acts as your dedicated on-the-ground engineering desk in China—auditing manufacturers, testing machines under commercial load, securing ocean vessel allocations, and executing fast-track port clearance under EPCG schemes.
              </p>
            </div>

            <div className="border border-[#C5A059]/40 bg-[#1E1916] p-6 sm:p-10 shadow-2xl rounded-2xl">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-4 font-bold">
                [ INBOUND RISK MITIGATION ]
              </span>
              <ul className="space-y-4 font-mono text-xs text-[#FAF7F2]/85">
                <li className="flex items-start gap-3 border-b border-white/10 pb-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>Documentary Letter of Credit (L/C) & Escrow Milestone Protection</span>
                </li>
                <li className="flex items-start gap-3 border-b border-white/10 pb-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>On-site 8-hour continuous test runs on customer yarn/fabric</span>
                </li>
                <li className="flex items-start gap-3 border-b border-white/10 pb-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>VCI barrier rustproofing & ISPM-15 heat-treated crating</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-[#C5A059] shrink-0" />
                  <span>EPCG 0% duty license & pre-arrival customs manifest filing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed 6-Stage Grid */}
      <section className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 py-20 lg:px-12 2xl:px-16 lg:py-32">
        <div className="border-b border-[#D8CEBD] pb-8">
          <SectionLabel number="01">STEP-BY-STEP DISCIPLINE</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-[#161210]">
            The 6-Stage Sourcing Pipeline
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {importSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.num}
                className="group rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-8 transition-all duration-300 hover:border-[#C5A059] hover:shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-[#D8CEBD] pb-4">
                  <span className="font-mono text-2xl font-bold text-[#C5A059]">{step.num}</span>
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
        title="Planning a Machinery Import from China for Your Textile Mill?"
        buttonText="SUBMIT MACHINERY REQUIREMENT"
        direction="Import"
      />
    </div>
  );
}

export function ExportPage() {
  const { content } = useSiteContent();

  const exportSteps = [
    {
      num: "01",
      title: "MARKET AUDIT & EPCG OBLIGATION",
      desc: "Analyze export market pricing, destination tariff schedules, and evaluate EPCG export obligation fulfillment strategies for Indian manufacturers.",
      icon: Search,
    },
    {
      num: "02",
      title: "OVERSEAS BUYER SYNDICATES",
      desc: "Connect qualified Indian textile producers with vetted international buyers, distribution partners, and manufacturing consortia globally.",
      icon: Users,
    },
    {
      num: "03",
      title: "EXPORT PACKAGING & VCI BARRIER",
      desc: "Engineer heavy ISPM-15 fumigated timber pallets, double-wall corrugated moisture packaging, and VCI rust barrier protection for maritime transit.",
      icon: PackageCheck,
    },
    {
      num: "04",
      title: "QUALITY INSPECTION & STAMP",
      desc: "Conduct comprehensive pre-shipment sampling, laboratory yarn/fabric testing, batch verification, and container stuffing audits.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "CONSULAR TRADE DOCUMENTATION",
      desc: "Prepare consular invoices, Certificates of Origin (COO), commercial packing manifests, and Letter of Credit (L/C) compliance dossiers.",
      icon: ClipboardCheck,
    },
    {
      num: "06",
      title: "VESSEL ALLOCATION & LINER FREIGHT",
      desc: "Secure direct-call ocean liner container slots, multimodal port rail linkages from Indian ICDs, and comprehensive marine cargo insurance.",
      icon: Ship,
    },
    {
      num: "07",
      title: "DESTINATION HANDOVER & ACCEPTANCE",
      desc: "Maintain continuous vessel AIS milestone tracking until destination port gate-out and consignee acceptance sign-off.",
      icon: Globe2,
    },
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      <PageHero
        eyebrow="OUTBOUND COMMERCE SOLUTIONS"
        categoryNumber="EXPORT"
        title="BILATERAL TRADE & EXPORT EXECUTION."
        copy="Empowering Indian textile manufacturers with structured export logistics, international buyer networks, and seamless EPCG compliance to take production excellence to global markets."
        image={content.media.industryTerminal || terminal}
      />

      {/* Narrative Section in Warm Terracotta */}
      <section className="bg-[#9E4E39] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 2xl:px-16 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#161210] uppercase">
                [ THE OUTBOUND TRADE CORRIDOR ]
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl 2xl:text-6xl font-bold leading-tight text-[#FAF7F2]">
                Expand Beyond
                <br />
                <span className="text-[#FAF7F2]/80 italic">Domestic Horizons.</span>
              </h2>
              <p className="text-sm md:text-base 2xl:text-lg leading-relaxed text-[#FAF7F2]/90">
                Exporting successfully demands far more than loading a shipping container. It requires aligning with international technical standards, fulfilling EPCG export commitments, and executing flawless trade documentation.
              </p>
              <p className="text-sm 2xl:text-base leading-relaxed text-[#FAF7F2]/80">
                Confident bridges high-quality Indian textile producers with trusted buyer syndicates across the Middle East, Europe, and Asia—safeguarding commercial terms and ensuring dependable logistics.
              </p>
            </div>

            <div className="border border-[#FAF7F2]/40 bg-[#833D2A] p-6 sm:p-10 shadow-2xl rounded-2xl">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#FAF7F2]/80 block mb-4 font-bold">
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
      <section className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 py-20 lg:px-12 2xl:px-16 lg:py-32">
        <div className="border-b border-[#D8CEBD] pb-8">
          <SectionLabel number="02">OUTBOUND PROTOCOL</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-[#161210]">
            The 7-Stage Export Pipeline
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {exportSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <article
                key={step.num}
                className={`group rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-8 transition-all duration-300 hover:border-[#9E4E39] hover:shadow-xl ${
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
        title="Ready to Structure Your Textile Machinery or Fabric Exports?"
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
    <section className="border-t border-[#D8CEBD] bg-[#161210] py-20 px-4 sm:px-6 lg:px-12 2xl:px-16 text-[#FAF7F2] text-center">
      <div className="mx-auto max-w-3xl 2xl:max-w-4xl space-y-5">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block font-bold">
          [ BILATERAL MACHINERY TRADE DESK ]
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold">{title}</h2>
        <p className="text-sm md:text-base 2xl:text-lg text-[#FAF7F2]/70 max-w-xl 2xl:max-w-2xl mx-auto leading-relaxed">
          Submit your machinery specifications, required spindle/loom count, or target ports. Our engineering trade desk will structure the commercial path.
        </p>
        <div className="pt-6">
          <Link
            to="/contact"
            className="w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#C5A059] bg-[#C5A059] px-5 sm:px-8 py-2.5 sm:py-3.5 font-mono text-xs font-bold tracking-wider uppercase text-[#161210] hover:bg-[#FAF7F2] transition-colors shadow-md cursor-pointer mx-auto"
          >
            <span>{buttonText}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
