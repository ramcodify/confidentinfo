import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Ship,
  ShieldCheck,
  Scale,
  CheckCircle2,
  FileCheck2,
  AlertCircle,
  Anchor,
  Package,
  Truck,
  Wrench,
  Download,
  ArrowRight,
  Layers,
  FileText,
  Check,
  Clock,
  Cpu,
  Award,
  Globe,
  HelpCircle,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { PageHero, SectionLabel } from "./site";
import globalPortHero from "../assets/global-port-hero.jpg";
import warehouseOps from "../assets/warehouse-operations.jpg";

export type ComplianceTab = "carriage" | "compliance" | "incoterms";

interface TradeCompliancePageProps {
  initialTab?: ComplianceTab;
}

export function TradeCompliancePage({ initialTab = "carriage" }: TradeCompliancePageProps) {
  const [activeTab, setActiveTab] = useState<ComplianceTab>(initialTab);

  // Sync state if initialTab changes (e.g. route transitions)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="bg-[#FAF7F2] text-[#161210] min-h-screen">
      {/* 1. Standardized Hero Section */}
      <PageHero
        eyebrow="BILATERAL MARITIME & REGULATORY DOSSIER"
        categoryNumber="LEGAL & LOGISTICS"
        title="TERMS OF CARRIAGE, COMPLIANCE & INCOTERMS 2020."
        copy="The engineering protocols, maritime carriage safeguards, pre-shipment load audits, and Incoterms 2020 commercial terms that protect Indian textile mills during China machinery procurement."
        image={globalPortHero}
      />

      {/* 2. Interactive Protocol Navigation Tabs */}
      <section className="sticky top-20 z-30 border-y border-[#D8CEBD]/80 bg-[#FAF7F2]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 lg:px-12 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] hidden md:inline">
                SELECT PROTOCOL:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("carriage")}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === "carriage"
                      ? "bg-[#161210] text-[#FAF7F2] shadow-md shadow-[#161210]/15 ring-2 ring-[#C5A059]"
                      : "bg-white/80 text-[#524942] hover:bg-white hover:text-[#161210] border border-[#D8CEBD]"
                  }`}
                >
                  <Ship className={`size-4 ${activeTab === "carriage" ? "text-[#C5A059]" : "text-[#524942]"}`} />
                  <span>Terms of Carriage</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] ${
                      activeTab === "carriage" ? "bg-[#C5A059] text-[#161210]" : "bg-[#FAF7F2] text-[#9C9185]"
                    }`}
                  >
                    4 Pillars
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("compliance")}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === "compliance"
                      ? "bg-[#161210] text-[#FAF7F2] shadow-md shadow-[#161210]/15 ring-2 ring-[#C5A059]"
                      : "bg-white/80 text-[#524942] hover:bg-white hover:text-[#161210] border border-[#D8CEBD]"
                  }`}
                >
                  <ShieldCheck className={`size-4 ${activeTab === "compliance" ? "text-[#C5A059]" : "text-[#524942]"}`} />
                  <span>Compliance Protocols</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] ${
                      activeTab === "compliance" ? "bg-[#C5A059] text-[#161210]" : "bg-[#FAF7F2] text-[#9C9185]"
                    }`}
                  >
                    5 Stages
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("incoterms")}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === "incoterms"
                      ? "bg-[#161210] text-[#FAF7F2] shadow-md shadow-[#161210]/15 ring-2 ring-[#C5A059]"
                      : "bg-white/80 text-[#524942] hover:bg-white hover:text-[#161210] border border-[#D8CEBD]"
                  }`}
                >
                  <Scale className={`size-4 ${activeTab === "incoterms" ? "text-[#C5A059]" : "text-[#524942]"}`} />
                  <span>Incoterms 2020</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] ${
                      activeTab === "incoterms" ? "bg-[#C5A059] text-[#161210]" : "bg-[#FAF7F2] text-[#9C9185]"
                    }`}
                  >
                    Matrix
                  </span>
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#524942]">
              <span className="inline-block size-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>DGFT &amp; Indian Customs Compliant (2026 Edition)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TAB CONTENT SECTIONS */}
      <main className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        {/* =========================================================================
            TAB 1: TERMS OF CARRIAGE & MARITIME LOGISTICS
           ========================================================================= */}
        {activeTab === "carriage" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Header Banner */}
            <div className="rounded-2xl border border-[#C5A059]/30 bg-[#161210] p-6 sm:p-10 text-[#FAF7F2] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase block">
                  [ MARITIME LOGISTICS &amp; BILL OF LADING STANDARDS ]
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  Zero-Damage Ocean Transit Across the Indian Ocean Corridor.
                </h2>
                <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-sans">
                  Transporting high-precision electronic jacquards, rapier looms, and computerized spinning frames across 3,500+ nautical miles demands rigorous maritime packing, dedicated container allocation, and extended demurrage safety buffers at Indian discharge terminals.
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">14–18 Days</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Shanghai to Nhava Sheva</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">21 Days</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Free Port Demurrage</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">ISPM-15</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Heat-Treated Timber Crates</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">Class A</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">All-Risk Cargo Insurance</div>
                </div>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="space-y-6">
              <SectionLabel number="CARRIAGE">FOUR OPERATIONAL PILLARS</SectionLabel>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Pillar 1 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059]">
                      <Ship className="size-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#9C9185]">PILLAR · 01</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#161210]">
                    Tier-1 Liner Booking &amp; Direct Bill of Lading
                  </h3>
                  <p className="text-sm text-[#524942] leading-relaxed">
                    All shipments from Shanghai, Ningbo, Guangzhou, and Qingdao are booked directly with premier container liners (COSCO, Maersk, ONE, MSC). Confident secures straight, non-negotiable or to-order ocean Bills of Lading (B/L), preventing unauthorized cargo releases and ensuring transparent carrier tracking.
                  </p>
                  <ul className="space-y-2 border-t border-[#D8CEBD]/60 pt-4 text-xs text-[#524942]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>Direct feeder routing avoiding unpredictable secondary transshipment delays.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>Dedicated container seals with serialized tamper-evident metal bolts.</span>
                    </li>
                  </ul>
                </div>

                {/* Pillar 2 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059]">
                      <Package className="size-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#9C9185]">PILLAR · 02</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#161210]">
                    Anti-Corrosion VCI Packaging &amp; Heavy Crating
                  </h3>
                  <p className="text-sm text-[#524942] leading-relaxed">
                    Maritime equatorial humidity in the Straits of Malacca causes catastrophic micro-rusting on machine spindles, reed blades, and electronic sensors if improperly protected. Confident enforces an uncompromising chemical and mechanical barrier before container doors are closed.
                  </p>
                  <ul className="space-y-2 border-t border-[#D8CEBD]/60 pt-4 text-xs text-[#524942]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>Volatile Corrosion Inhibitor (VCI) heat-sealed multi-ply vacuum shrink wrap.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>Calibrated industrial silica desiccant bags placed inside electronic cabinets.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>ISPM-15 certified fumigated timber skids with heavy steel channel anchoring.</span>
                    </li>
                  </ul>
                </div>

                {/* Pillar 3 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059]">
                      <Clock className="size-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#9C9185]">PILLAR · 03</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#161210]">
                    Extended 14 to 21 Days Free Demurrage &amp; Detention
                  </h3>
                  <p className="text-sm text-[#524942] leading-relaxed">
                    Port congestion and Indian customs Bill of Entry (BoE) processing can create crippling daily demurrage penalties if only standard 7-day allowances are granted. Confident pre-negotiates extended 14 to 21 days free time directly with shipping lines.
                  </p>
                  <ul className="space-y-2 border-t border-[#D8CEBD]/60 pt-4 text-xs text-[#524942]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>Zero unexpected port detention costs while customs valuation checks occur.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>Applies at all primary Indian gateways: Nhava Sheva (JNPT), Mundra, Chennai, &amp; Tuticorin.</span>
                    </li>
                  </ul>
                </div>

                {/* Pillar 4 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059]">
                      <ShieldCheck className="size-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#9C9185]">PILLAR · 04</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#161210]">
                    All-Risk Marine Cargo Insurance (Institute Cargo Clauses A)
                  </h3>
                  <p className="text-sm text-[#524942] leading-relaxed">
                    Full warehouse-to-warehouse cargo insurance underwritten by accredited global underwriters under Institute Cargo Clauses (A). Complete protection against vessel collision, heavy weather washing, rough crane handling shocks, and overland transit damage.
                  </p>
                  <ul className="space-y-2 border-t border-[#D8CEBD]/60 pt-4 text-xs text-[#524942]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>110% CIF invoice valuation coverage encompassing ocean freight and customs duties.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-[#C5A059] mt-0.5" />
                      <span>Dedicated Indian claims adjusters for seamless surveyor appointments at mill gates.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Container Stuffing & Lashing Standards */}
            <div className="rounded-2xl border border-[#D8CEBD] bg-[#F4EFE6] p-6 sm:p-10 space-y-6">
              <div className="max-w-2xl space-y-2">
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#9E4E39]">
                  STUFFING &amp; STOWAGE SPECIFICATION
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#161210]">
                  Container Rigging &amp; Center of Gravity Balancing
                </h3>
                <p className="text-sm text-[#524942]">
                  Textile machines feature high centers of gravity and asymmetric motor placements. Our engineers inspect factory container stuffing to enforce strict nautical safety criteria.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#D8CEBD] bg-white p-5 space-y-2">
                  <div className="font-mono text-xs font-bold text-[#C5A059]">EQUIPMENT PROFILE</div>
                  <div className="font-serif text-base font-bold text-[#161210]">40ft High Cube (HC)</div>
                  <p className="text-xs text-[#524942] leading-relaxed">
                    Recommended for enclosed rapier looms, circular knitting machines, and carding frames with max 2.68m internal door height.
                  </p>
                </div>
                <div className="rounded-xl border border-[#D8CEBD] bg-white p-5 space-y-2">
                  <div className="font-mono text-xs font-bold text-[#C5A059]">OVERSIZED UNITS</div>
                  <div className="font-serif text-base font-bold text-[#161210]">Flat Rack &amp; Open Top</div>
                  <p className="text-xs text-[#524942] leading-relaxed">
                    Mandatory for large stenter heat-setting chambers, sizing machine cylinders, and wide-width non-woven calenders.
                  </p>
                </div>
                <div className="rounded-xl border border-[#D8CEBD] bg-white p-5 space-y-2">
                  <div className="font-mono text-xs font-bold text-[#C5A059]">LASHING STANDARD</div>
                  <div className="font-serif text-base font-bold text-[#161210]">16mm Steel Turnbuckles</div>
                  <p className="text-xs text-[#524942] leading-relaxed">
                    Cross-braced high-tensile steel wire with anti-slip timber chocks bolted directly to container floor corrugations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: COMPLIANCE PROTOCOLS & PRE-SHIPMENT AUDIT
           ========================================================================= */}
        {activeTab === "compliance" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Header Banner */}
            <div className="rounded-2xl border border-[#C5A059]/30 bg-[#161210] p-6 sm:p-10 text-[#FAF7F2] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase block">
                  [ ENGINEERING INTEGRITY &amp; FACTORY INSPECTION STANDARDS ]
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  Five-Stage Pre-Shipment Inspection Protocol.
                </h2>
                <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-sans">
                  We bridge the language and technical gap between Chinese factories and Indian textile mills. Confident technical inspectors conduct rigorous physical audits before authorizing maritime container dispatch.
                </p>
              </div>

              {/* Quick Quality Guarantee */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">8 Hours</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Continuous Run Trial</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">100%</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Servo &amp; PLC Vetted</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">415V / 50Hz</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Indian Grid Certified</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">0% EPCG</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Customs Tariff Filing</div>
                </div>
              </div>
            </div>

            {/* 5 Stages Breakdown */}
            <div className="space-y-6">
              <SectionLabel number="INSPECTION">FIVE-STAGE QUALITY PIPELINE</SectionLabel>
              <div className="space-y-4">
                {/* Stage 1 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A059] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059] font-mono font-bold text-sm">
                      01
                    </div>
                    <div className="space-y-1 max-w-2xl">
                      <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                        STAGE 1 · FACTORY FLOOR LICENSING &amp; CASTING VETTING
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#161210]">
                        Foundry Quality &amp; Machine Frame Stress Relieving
                      </h4>
                      <p className="text-sm text-[#524942] leading-relaxed">
                        We inspect the manufacturer's ISO 9001 certifications, raw casting aging yards, and CNC bed milling accuracy. Machine frames must undergo proper artificial or natural thermal aging to eliminate structural warp under high-speed weaving vibrations.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-xs text-[#9C9185] bg-[#FAF7F2] border border-[#D8CEBD] px-3 py-1.5 rounded-lg text-center">
                    STRUCTURAL VERIFICATION
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A059] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059] font-mono font-bold text-sm">
                      02
                    </div>
                    <div className="space-y-1 max-w-2xl">
                      <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                        STAGE 2 · COMPONENT AUTHENTICITY &amp; BRAND MATCHING
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#161210]">
                        Zero Substandard Part Substitutions
                      </h4>
                      <p className="text-sm text-[#524942] leading-relaxed">
                        Every drive, sensor, and motor is verified against your purchase order BOM (Bill of Materials). We inspect genuine serial tags on Yaskawa/Panasonic servos, Siemens/Schneider/Delta PLCs, NSK high-speed bearings, and SMC pneumatic valves to guarantee 100% genuine industrial components.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-xs text-[#9C9185] bg-[#FAF7F2] border border-[#D8CEBD] px-3 py-1.5 rounded-lg text-center">
                    BOM CROSS-EXAMINATION
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A059] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059] font-mono font-bold text-sm">
                      03
                    </div>
                    <div className="space-y-1 max-w-2xl">
                      <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                        STAGE 3 · 8-HOUR CONTINUOUS RUN TRIAL UNDER LOAD
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#161210]">
                        Live Yarn Weaving / Spinning Trial
                      </h4>
                      <p className="text-sm text-[#524942] leading-relaxed">
                        Machines are loaded with the customer’s specified yarn count (cotton, polyester, blended) and run continuously for 8 hours. We record thermal heat dissipation on main drive motors, vibration amplitudes on headstocks, and sensor tripping metrics.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-xs text-[#9C9185] bg-[#FAF7F2] border border-[#D8CEBD] px-3 py-1.5 rounded-lg text-center">
                    LOAD PERFORMANCE AUDIT
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A059] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059] font-mono font-bold text-sm">
                      04
                    </div>
                    <div className="space-y-1 max-w-2xl">
                      <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                        STAGE 4 · INDIAN ELECTRICAL GRID SYNCHRONIZATION
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#161210]">
                        415V / 50Hz 3-Phase Calibration &amp; Harmonic Filters
                      </h4>
                      <p className="text-sm text-[#524942] leading-relaxed">
                        Chinese industrial power commonly operates at 380V / 50Hz. Confident ensures all transformer tapings, electronic inverters, and main breaker panels are calibrated for Indian 415V (+/-10%) 50Hz grid conditions to prevent electronic drive burnouts in Surat or Tiruppur mills.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-xs text-[#9C9185] bg-[#FAF7F2] border border-[#D8CEBD] px-3 py-1.5 rounded-lg text-center">
                    POWER GRID CALIBRATION
                  </div>
                </div>

                {/* Stage 5 */}
                <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C5A059] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#161210] text-[#C5A059] font-mono font-bold text-sm">
                      05
                    </div>
                    <div className="space-y-1 max-w-2xl">
                      <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                        STAGE 5 · EPCG COMPLIANCE &amp; VIDEO DISPATCH DOSSIER
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#161210]">
                        Pre-Shipment Inspection Certificate &amp; Customs Pack
                      </h4>
                      <p className="text-sm text-[#524942] leading-relaxed">
                        Before the container departs the Chinese factory gates, the Indian mill receives a timestamped HD video of the run trial, machine serial number photos, full electrical circuit schematics, and commercial invoices aligned with India’s 0% EPCG scheme.
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 font-mono text-xs text-[#9C9185] bg-[#FAF7F2] border border-[#D8CEBD] px-3 py-1.5 rounded-lg text-center">
                    DISPATCH CLEARANCE
                  </div>
                </div>
              </div>
            </div>

            {/* Indian Customs & EPCG Scheme Integration */}
            <div className="rounded-2xl border border-[#C5A059]/40 bg-[#1E1916] p-6 sm:p-10 text-[#FAF7F2] space-y-6">
              <div className="max-w-2xl space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
                  [ TARIFF FACILITATION ]
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                  India Export Promotion Capital Goods (EPCG) 0% Duty Alignment
                </h3>
                <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                  The Indian Directorate General of Foreign Trade (DGFT) permits zero basic customs duty import of capital textile machinery under the EPCG scheme. Confident ensures every invoice and technical catalogue strictly complies with Indian customs valuation norms.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-white/10 text-xs text-[#FAF7F2]/80">
                <div className="space-y-1.5">
                  <div className="font-mono text-[#C5A059] font-bold">HS CLASSIFICATION</div>
                  <p>Accurate 8-digit Harmonized System (HS) classifications for spinning (8445), weaving (8446), and knitting (8447) machinery.</p>
                </div>
                <div className="space-y-1.5">
                  <div className="font-mono text-[#C5A059] font-bold">CERTIFICATE OF ORIGIN</div>
                  <p>AFTA / Asia-Pacific trade agreement documentation verified through authorized Chinese chambers of commerce (CCPIT).</p>
                </div>
                <div className="space-y-1.5">
                  <div className="font-mono text-[#C5A059] font-bold">CHARTERED ENGINEER AUDIT</div>
                  <p>Preparation of CEC certificates and installation declarations required for seamless bond cancellation with Indian customs.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: INCOTERMS 2020 OPERATIONAL GUIDE
           ========================================================================= */}
        {activeTab === "incoterms" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Header Banner */}
            <div className="rounded-2xl border border-[#C5A059]/30 bg-[#161210] p-6 sm:p-10 text-[#FAF7F2] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase block">
                  [ COMMERCIAL RISK &amp; COST RESPONSIBILITY STANDARD ]
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  Incoterms 2020 Operational Matrix for Machinery Importers.
                </h2>
                <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-sans">
                  Published by the International Chamber of Commerce (ICC), Incoterms 2020 define precisely when risk and freight costs transfer between the Chinese manufacturer, Confident Textiles Machinery, and the Indian purchasing mill.
                </p>
              </div>

              {/* Incoterms Summary Strip */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">FOB</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Origin Port Delivered</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">CIF</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Indian Port + Insured</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">DAP</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Mill Doorstep Delivered</div>
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFBA6F]">DDP</div>
                  <div className="text-[11px] font-mono text-[#FAF7F2]/60 uppercase tracking-wider">Turnkey Duty-Paid Option</div>
                </div>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="space-y-6">
              <SectionLabel number="INCOTERMS 2020">RESPONSIBILITY COMPARISON MATRIX</SectionLabel>
              <div className="overflow-x-auto rounded-2xl border border-[#D8CEBD] bg-white shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-[#D8CEBD] bg-[#161210] font-mono text-[11px] uppercase tracking-wider text-[#FAF7F2]">
                    <tr>
                      <th className="p-4 sm:p-5">Milestone / Responsibility</th>
                      <th className="p-4 sm:p-5 text-center">EXW (Factory)</th>
                      <th className="p-4 sm:p-5 text-center bg-[#C5A059]/20 text-[#DFBA6F]">FOB (Shanghai)</th>
                      <th className="p-4 sm:p-5 text-center bg-[#C5A059]/30 text-[#DFBA6F]">CIF (Nhava/Mundra)</th>
                      <th className="p-4 sm:p-5 text-center text-[#DFBA6F]">DAP (Mill Gate)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8CEBD]/60 font-mono">
                    <tr className="hover:bg-[#FAF7F2]/60">
                      <td className="p-4 font-sans font-semibold text-[#161210]">Export VCI Crating &amp; Marking</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Option</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]/60">
                      <td className="p-4 font-sans font-semibold text-[#161210]">China Factory to Port Trucking</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Arranges</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]/60">
                      <td className="p-4 font-sans font-semibold text-[#161210]">China Export Customs Clearance</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Responsibility</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Seller / Confident</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]/60">
                      <td className="p-4 font-sans font-semibold text-[#161210]">Ocean Vessel Freight Booking</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Arranges</td>
                      <td className="p-4 text-center text-[#524942]">Buyer / Confident Desk</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Confident Arranges</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Confident Arranges</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]/60">
                      <td className="p-4 font-sans font-semibold text-[#161210]">Institute Cargo Marine Insurance (All-Risk)</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Arranges</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Arranges</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Confident Arranges (110%)</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Confident Arranges</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]/60">
                      <td className="p-4 font-sans font-semibold text-[#161210]">Indian Port Customs &amp; EPCG Filing</td>
                      <td className="p-4 text-center text-[#524942]">Buyer's CHA</td>
                      <td className="p-4 text-center text-[#524942]">Buyer's CHA</td>
                      <td className="p-4 text-center text-[#524942]">Buyer's CHA / Assisted</td>
                      <td className="p-4 text-center text-[#524942]">Buyer (Customs Duty)</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]/60">
                      <td className="p-4 font-sans font-semibold text-[#161210]">Inland Hydraulic Low-Bed Trailer to Mill</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Arranges</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Arranges</td>
                      <td className="p-4 text-center text-[#524942]">Buyer Arranges</td>
                      <td className="p-4 text-center font-bold text-emerald-700">Confident Delivers Doorstep</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F2]/60 bg-[#FAF7F2]">
                      <td className="p-4 font-sans font-semibold text-[#161210]">Risk Transfer Handover Point</td>
                      <td className="p-4 text-center text-[#9C9185]">At Factory Gate</td>
                      <td className="p-4 text-center text-[#9E4E39] font-bold">On Board Ship (China)</td>
                      <td className="p-4 text-center text-[#9E4E39] font-bold">On Board Ship (China)</td>
                      <td className="p-4 text-center text-emerald-800 font-bold">At Indian Mill Gate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Term Descriptions */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* FOB */}
              <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 space-y-4">
                <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                  TERM 1 · FOB (FREE ON BOARD)
                </div>
                <h4 className="font-serif text-xl font-bold text-[#161210]">
                  FOB Shanghai / Ningbo Port
                </h4>
                <p className="text-sm text-[#524942] leading-relaxed">
                  Best for Indian groups with existing shipping agreements or preferred ocean freight forwarders. The manufacturer and Confident deliver the verified machinery across the ship’s rail in China and execute all Chinese export customs clearances.
                </p>
                <div className="rounded-xl bg-[#FAF7F2] p-4 text-xs font-mono text-[#524942] space-y-1">
                  <div className="font-bold text-[#161210]">BEST SUITED FOR:</div>
                  <div>Established corporate spinning mills with centralized logistics desks.</div>
                </div>
              </div>

              {/* CIF */}
              <div className="rounded-2xl border-2 border-[#C5A059] bg-white p-6 sm:p-8 space-y-4 shadow-md relative">
                <div className="absolute -top-3 right-6 bg-[#C5A059] text-[#161210] font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                  TERM 2 · CIF (COST, INSURANCE &amp; FREIGHT)
                </div>
                <h4 className="font-serif text-xl font-bold text-[#161210]">
                  CIF Nhava Sheva / Mundra / Chennai
                </h4>
                <p className="text-sm text-[#524942] leading-relaxed">
                  Confident manages factory collection, packing inspection, vessel nomination, and pays for ocean freight plus comprehensive marine cargo insurance directly to your designated Indian discharge port. You manage domestic customs clearance.
                </p>
                <div className="rounded-xl bg-[#FAF7F2] p-4 text-xs font-mono text-[#524942] space-y-1">
                  <div className="font-bold text-[#161210]">BEST SUITED FOR:</div>
                  <div>Medium-to-large mills seeking zero maritime freight headaches with local clearing agents.</div>
                </div>
              </div>

              {/* DAP */}
              <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 space-y-4">
                <div className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                  TERM 3 · DAP (DELIVERED AT PLACE)
                </div>
                <h4 className="font-serif text-xl font-bold text-[#161210]">
                  DAP Mill Gate (Turnkey Corridor)
                </h4>
                <p className="text-sm text-[#524942] leading-relaxed">
                  Complete end-to-end corridor management. Confident takes custody at Chinese factory floor, manages sea shipping, coordinates Indian port clearance with your CHA, and transports the machines directly into your factory compound on hydraulic trailers.
                </p>
                <div className="rounded-xl bg-[#FAF7F2] p-4 text-xs font-mono text-[#524942] space-y-1">
                  <div className="font-bold text-[#161210]">BEST SUITED FOR:</div>
                  <div>Greenfield weaving shed installations and turnkey expansions in Surat &amp; Tiruppur.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Contact / Advisory Callout Section */}
      <section className="border-t border-[#D8CEBD] bg-[#161210] py-16 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059]">
                [ EXPERT TRADE &amp; LOGISTICS ASSISTANCE ]
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
                Need Custom Incoterms or Pre-Shipment Inspection for Your Mill?
              </h3>
              <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                Connect with our bilateral engineering desk in China or our India liaison office to structure custom carriage contracts, port clearances, and inspection timelines.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Link
                to="/request-quote"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition-colors shadow-lg cursor-pointer"
              >
                <span>REQUEST TRADE PROPOSAL</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FAF7F2] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                <PhoneCall className="size-4" />
                <span>SPEAK TO TRADE DESK</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
