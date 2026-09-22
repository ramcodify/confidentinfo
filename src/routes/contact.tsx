import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { PageHero, SectionLabel, MarqueeTicker } from "../components/site";
import { useMachineryStore } from "../lib/machinery-store";
import warehouseOperations from "../assets/warehouse-operations.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Our Machinery Trade Desk | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "Connect directly with Confident Textiles Machinery's China-India trade desk for machinery sourcing, factory inspection verification, container shipping, and import customs clearance.",
      },
      { property: "og:title", content: "Contact Confident Textiles Machinery" },
      {
        property: "og:description",
        content:
          "Direct communication channels with our China sourcing engineering desks and Indian industrial representatives.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { companyInfo, products, submitEnquiry } = useMachineryStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    machineCategory: "Weaving",
    specificMachine: "",
    quantity: "1 Unit",
    message: "",
    // honeypot — must stay empty; bots fill this
    _trap: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot check — if trap field is filled, silently reject (bot submission)
    if (formData._trap) return;
    submitEnquiry({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      machineName: formData.specificMachine || `${formData.machineCategory} Machinery`,
      requirement: `[Mill Location: ${formData.location}, Qty: ${formData.quantity}, Category: ${formData.machineCategory}] ${formData.message}`,
    });
    setFormSubmitted(true);
  };

  const contactChannels = [
    {
      title: "Commercial Trade & Machinery Desk",
      primary: companyInfo.email || "contact@confidenttextiles.com",
      sub: "Technical specifications, manufacturer verification, order allocation",
      icon: Mail,
    },
    {
      title: "Direct Operations & WhatsApp",
      primary: companyInfo.phone || "+91 98422 12345 / +86 20 8123 4567",
      sub: "Bilingual trade officers in English, Hindi, and Mandarin Chinese",
      icon: Phone,
    },
    {
      title: "Indian Liaison Headquarters",
      primary: companyInfo.officeAddress || (companyInfo as any).address || "Confident Towers, Avinashi Road, Coimbatore, Tamil Nadu 641018",
      sub: "Liaison desks in Surat (Gujarat) and Tirupur (Tamil Nadu)",
      icon: MapPin,
    },
    {
      title: "Trade Desk Operating Hours",
      primary: "Mon–Sat: 08:30 – 19:30 IST",
      sub: "Active vessel tracking & China factory liaison: 24/7",
      icon: Clock3,
    },
  ];

  return (
    <div className="bg-[#FAF7F2] text-[#161210]">
      {/* 1. Page Hero */}
      <PageHero
        eyebrow="CHINA TO INDIA TEXTILE MACHINERY TRADE DESK"
        categoryNumber="CONTACT"
        title="DIRECT ACCESS TO CHINA'S TEXTILE INDUSTRY."
        copy="Reach our specialized trade desk to initiate a machinery sourcing inquiry, schedule an on-site factory audit in China, or arrange oceanic shipping directly to your Indian manufacturing facility."
        image={warehouseOperations}
      />

      {/* 2. Real-Time Communication Telemetry Metrics Strip */}
      <section className="border-b border-[#C5A059]/30 bg-[#161210] py-6 sm:py-8 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                RESPONSE SLA
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                &lt; 2 Hours
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Same-Day Technical Assessment
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                CHINA DESKS
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                3 Hubs
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Shanghai, Guangzhou &amp; Wuxi
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                LIAISON REACH
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                Pan-India
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Surat, Tirupur &amp; Coimbatore
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                COMMUNICATION
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#DFBA6F]">
                24 / 7
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                English, Hindi, Tamil &amp; Mandarin
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Marquee Ticker */}
      <MarqueeTicker />

      {/* 4. Split-Screen Contact Section */}
      <section className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 py-16 sm:py-20 lg:px-12 lg:py-28 2xl:py-36">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Left Column: Communication Coordinates & Logistics Radar */}
          <div className="space-y-8 sm:space-y-10">
            <div>
              <SectionLabel number="01">COMMUNICATION DESK</SectionLabel>
              <h2 className="mt-3 sm:mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161210] leading-tight">
                WHERE
                <br />
                SOURCING
                <br />
                <span className="text-[#9E4E39] italic">BEGINS.</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[#6B625B]">
                Whether you need a single precision rapier loom or a complete turnkey ring spinning line, our bilingual engineering teams in China and India handle the entire chain.
              </p>
            </div>

            {/* Channels List */}
            <div className="space-y-5 sm:space-y-6 border-t border-[#D8CEBD] pt-6 sm:pt-8">
              {contactChannels.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5 sm:gap-4">
                    <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center border border-[#C5A059] bg-[#FAF7F2] text-[#161210] rounded-xl shadow-xs">
                      <Icon size={18} className="text-[#C5A059] 2xl:size-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] sm:text-[10px] 2xl:text-xs font-bold tracking-[0.22em] uppercase text-[#6B625B] block">
                        {item.title}
                      </span>
                      <strong className="mt-0.5 sm:mt-1 block font-serif text-base sm:text-lg font-bold text-[#161210] break-all">
                        {item.primary}
                      </strong>
                      <span className="text-xs text-[#6B625B] font-sans">{item.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bilateral Maritime Hubs Card */}
            <div className="relative overflow-hidden border border-[#C5A059] bg-[#161210] p-4 sm:p-8 text-[#FAF7F2] shadow-2xl rounded-2xl">
              <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-3 sm:pb-4">
                <span className="font-mono text-[10px] 2xl:text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase flex items-center gap-2">
                  <Radio size={14} className="text-[#C5A059] animate-pulse" />
                  [ CHINA–INDIA SHIPPING CORRIDORS ]
                </span>
                <span className="font-mono text-[10px] text-[#FAF7F2]/50">ACTIVE FREIGHT</span>
              </div>

              <div className="mt-5 space-y-2.5 font-mono text-[11px] sm:text-xs text-[#FAF7F2]/80">
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#FAF7F2]/10 pb-2 gap-0.5">
                  <span className="text-[#FAF7F2]/60">ORIGIN PORTS (CHINA)</span>
                  <span className="text-[#DFBA6F] font-bold">Shanghai · Ningbo · Guangzhou</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#FAF7F2]/10 pb-2 gap-0.5">
                  <span className="text-[#FAF7F2]/60">DISCHARGE PORTS (INDIA)</span>
                  <span className="text-[#FAF7F2] font-bold">Nhava Sheva · Chennai · Tuticorin · Mundra</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#FAF7F2]/10 pb-2 gap-0.5">
                  <span className="text-[#FAF7F2]/60">AVERAGE TRANSIT TIME</span>
                  <span className="text-[#C5A059] font-bold">14 – 18 Ocean Transit Days</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between pt-1 gap-0.5">
                  <span className="text-[#FAF7F2]/60">CUSTOMS / EPCG LICENSE</span>
                  <span className="text-emerald-400 font-bold">Full Import Clearance Handled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Machinery Sourcing Inquiry Form */}
          <div className="rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-5 sm:p-10 lg:p-12 shadow-xl">
            <div className="mb-6 sm:mb-8 border-b border-[#D8CEBD]/80 pb-5 sm:pb-6">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#9E4E39] block mb-1.5 sm:mb-2">
                [ TRANSMIT REQUIREMENT ]
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#161210] tracking-tight">
                Machinery Sourcing Inquiry
              </h3>
              <p className="text-sm text-[#6B625B] mt-2.5 leading-relaxed">
                Tell us your mill's production requirements. We evaluate Chinese manufacturers, organize pre-shipment tests, and quote complete delivered terms.
              </p>
            </div>

            {formSubmitted ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-8 sm:p-10 text-center space-y-4">
                <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-emerald-900">
                  Requirement Received Successfully
                </h4>
                <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you, {formData.name}. Our commercial trade desk has registered your requirement for{" "}
                  <strong>{formData.company}</strong> and will contact you within 24 hours with verified manufacturer options.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="inline-block rounded-xl bg-[#161210] px-6 py-3 font-mono text-xs text-[#FAF7F2] font-bold hover:bg-[#C5A059] transition shadow-md cursor-pointer"
                >
                  Submit another requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information Group */}
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Full Name <span className="text-[#9E4E39]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Company / Mill Name <span className="text-[#9E4E39]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company / Mill Name"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Email Address <span className="text-[#9E4E39]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Phone / WhatsApp <span className="text-[#9E4E39]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Mobile Number"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                </div>

                {/* Location and Category */}
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Indian Mill / City Location <span className="text-[#9E4E39]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Coimbatore / Tirupur / Surat"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Machinery Category
                    </label>
                    <div className="relative">
                      <select
                        value={formData.machineCategory}
                        onChange={(e) => setFormData({ ...formData, machineCategory: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 pr-10 text-sm text-[#161210] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20 cursor-pointer"
                      >
                        <option value="Spinning">Spinning Machinery</option>
                        <option value="Weaving">Weaving Machinery (Air Jet / Rapier)</option>
                        <option value="Knitting">Knitting Machinery (Circular / Flat)</option>
                        <option value="Dyeing & Finishing">Dyeing & Finishing Machinery</option>
                        <option value="Textile Processing">Textile Processing & Washing</option>
                        <option value="Turnkey Line">Complete Turnkey Mill Line</option>
                      </select>
                      <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B625B]" />
                    </div>
                  </div>
                </div>

                {/* Model and Quantity */}
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Specific Machine Model <span className="text-[11px] font-normal text-[#8A7E73] normal-case">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.specificMachine}
                      onChange={(e) => setFormData({ ...formData, specificMachine: e.target.value })}
                      placeholder="e.g. High-Speed Air Jet Loom CF-9000"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Estimated Quantity / Units
                    </label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 12 Machines / 1 Complete Plant"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                    />
                  </div>
                </div>

                {/* Production Requirements & Specifications */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                    Production Requirements & Specifications <span className="text-[#9E4E39]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify target fabrics/yarns, required output per day, preferred Chinese brands or budget considerations…"
                    className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 p-4 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20 resize-y min-h-[120px] leading-relaxed"
                  />
                </div>

                {/* Honeypot field — hidden from users, traps bots */}
                <div aria-hidden="true" tabIndex={-1} style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
                  <label htmlFor="_trap">Leave this field empty</label>
                  <input
                    id="_trap"
                    type="text"
                    name="_trap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._trap}
                    onChange={(e) => setFormData({ ...formData, _trap: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#161210] py-2.5 sm:py-3.5 px-5 sm:px-8 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FAF7F2] transition-all duration-200 hover:bg-[#9E4E39] hover:shadow-md cursor-pointer font-mono w-auto"
                  >
                    <span>Submit Requirement</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
