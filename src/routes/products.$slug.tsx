import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Download,
  Gauge,
  Globe2,
  Layers,
  MapPin,
  Package,
  Scale,
  Share2,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { useMachineryStore, type TextileMachine } from "../lib/machinery-store";

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const { products, submitEnquiry } = useMachineryStore();

  const product = products.find((p) => p.slug === slug);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    quantity: "1 Unit",
    message: "",
  });

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-[#F4EFE6] pt-36 pb-20 px-6 text-center text-[#161210]">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="font-serif text-3xl font-bold">Textile Machine Not Found</h1>
          <p className="text-sm text-[#6B625B]">
            The machine specification you requested could not be located in our active catalogue.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-[#161210] px-6 py-3 font-mono text-xs font-bold uppercase text-[#FAF7F2] hover:bg-[#C5A059] transition"
          >
            <ArrowLeft size={14} />
            <span>BACK TO MACHINERY CATALOGUE</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related machines from same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      machineId: product.id,
      machineName: product.name,
      requirement: `[Inquiry for ${product.name} - Qty: ${formData.quantity}, Location: ${formData.location}] ${formData.message}`,
    });
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      {/* Top Breadcrumb Header */}
      <section className="border-b border-[#D8CEBD] bg-[#FAF7F2] pt-28 sm:pt-36 pb-6 px-4 sm:px-6 lg:px-12 2xl:px-16">
        <div className="mx-auto max-w-[1440px] 2xl:max-w-[1680px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#6B625B]">
              <Link to="/products" className="hover:text-[#161210] flex items-center gap-1.5 font-bold uppercase">
                <ArrowLeft size={13} />
                <span>CATALOGUE</span>
              </Link>
              <span>/</span>
              <span className="uppercase text-[#9E4E39] font-semibold">{product.category}</span>
              <span>/</span>
              <span className="text-[#161210] font-bold truncate max-w-xs">{product.name}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg bg-[#161210]/5 border border-[#D8CEBD] px-3 py-1 font-mono text-[11px] text-[#161210]">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ACTIVE CHINA SOURCING PIPELINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Showcase */}
      <section className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] px-4 sm:px-6 lg:px-12 2xl:px-16 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Left Column: Big Machine Image & Gallery Visuals */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#D8CEBD] bg-[#161210] shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[380px] sm:h-[480px] 2xl:h-[560px] object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161210]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#DFBA6F] block">
                    MANUFACTURER: {product.manufacturer}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
                    {product.name}
                  </h2>
                </div>
                <div className="rounded-xl bg-[#161210]/80 backdrop-blur-md px-3 py-1.5 border border-white/20 font-mono text-xs text-[#FAF7F2] shrink-0">
                  <span>🇨🇳 {product.origin || product.country || "China"}</span>
                </div>
              </div>
            </div>

            {/* Sourcing & Verification Guarantee Card */}
            <div className="rounded-2xl border border-[#C5A059]/40 bg-[#161210] p-6 sm:p-8 text-[#FAF7F2] space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <ShieldCheck size={24} className="text-[#C5A059]" />
                <div>
                  <h4 className="font-serif text-lg font-bold">100% Quality Verified Before Shipment</h4>
                  <p className="text-xs text-[#FAF7F2]/70 font-mono">
                    Confident Engineers perform full on-site trial runs at the Chinese factory prior to containerization.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
                <div className="bg-[#1E1916] p-3 rounded-xl border border-white/5">
                  <span className="text-[#C5A059] block font-bold mb-1">01. FACTORY AUDIT</span>
                  <span className="text-[#FAF7F2]/80 text-[11px]">Precision tolerance check & mechanical calibration.</span>
                </div>
                <div className="bg-[#1E1916] p-3 rounded-xl border border-white/5">
                  <span className="text-[#C5A059] block font-bold mb-1">02. RUN TRIAL</span>
                  <span className="text-[#FAF7F2]/80 text-[11px]">8-hour continuous test on customer yarn/fabric specs.</span>
                </div>
                <div className="bg-[#1E1916] p-3 rounded-xl border border-white/5">
                  <span className="text-[#C5A059] block font-bold mb-1">03. SAFE SHIPPING</span>
                  <span className="text-[#FAF7F2]/80 text-[11px]">VCI rustproofing, vacuum sealed crating & customs clearance.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Direct Inquiry */}
          <div className="space-y-8">
            <div>
              <div className="inline-block rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/40 px-3 py-1 font-mono text-xs font-bold uppercase text-[#9E4E39] mb-3">
                {product.category} MACHINERY
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl 2xl:text-5xl font-bold text-[#161210] leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#6B625B] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9E4E39] block">
                [ TECHNICAL SPECIFICATIONS ]
              </span>
              <div className="rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-5 divide-y divide-[#D8CEBD] text-xs sm:text-sm font-mono shadow-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6B625B]">Production Speed / RPM</span>
                  <span className="font-bold text-[#161210] text-right">
                    {product.specs?.speed || product.specifications?.productionSpeed || "850 – 1,100 RPM"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6B625B]">Installed Power</span>
                  <span className="font-bold text-[#161210] text-right">
                    {product.specs?.power || product.specifications?.powerConsumption || "3.7 kW – 5.5 kW"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6B625B]">Operating Voltage</span>
                  <span className="font-bold text-[#161210] text-right">
                    {product.specs?.voltage || product.specifications?.voltage || "380V / 50Hz (3-Phase)"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6B625B]">Machine Dimensions</span>
                  <span className="font-bold text-[#161210] text-right">
                    {product.specs?.dimensions || product.specifications?.dimensions || "3,850 × 1,950 × 1,650 mm"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6B625B]">Net Machine Weight</span>
                  <span className="font-bold text-[#161210] text-right">
                    {product.specs?.weight || product.specifications?.weight || "2,850 kg"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6B625B]">Production Capacity</span>
                  <span className="font-bold text-[#161210] text-right">
                    {product.specs?.capacity || product.specifications?.capacity || "High Yield Continuous"}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#6B625B]">Automation Level</span>
                  <span className="font-bold text-[#9E4E39] text-right">
                    {product.specs?.automation || product.specifications?.automation || "Fully Automatic PLC"}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Features & Applications */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-5 space-y-3">
                <span className="font-mono text-xs font-bold uppercase text-[#9E4E39] block">
                  KEY FEATURES
                </span>
                <ul className="space-y-2 text-xs text-[#161210]">
                  {(product.features || []).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-5 space-y-3">
                <span className="font-mono text-xs font-bold uppercase text-[#9E4E39] block">
                  APPLICATIONS
                </span>
                <ul className="space-y-2 text-xs text-[#161210]">
                  {(product.applications || []).map((app, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-[#9E4E39] shrink-0 mt-1.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Machine Inquiry Form */}
            <div className="rounded-2xl border border-[#C5A059] bg-[#FAF7F2] p-6 sm:p-8 shadow-xl space-y-5">
              <div className="border-b border-[#D8CEBD] pb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#9E4E39] block">
                  [ DIRECT MACHINE SOURCING INQUIRY ]
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#161210] mt-1">
                  Inquire for {product.name}
                </h3>
                <p className="text-xs text-[#6B625B] mt-1">
                  Connect directly with our China-India machinery desk for pricing, lead times, and factory test reports.
                </p>
              </div>

              {formSubmitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-6 text-center space-y-3">
                  <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you, {formData.name}. Our technical trade desk has received your request for{" "}
                    <strong>{product.name}</strong> and will contact you via {formData.email || formData.phone} within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="inline-block font-mono text-xs text-emerald-900 underline font-bold cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                        Indian Factory / City
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Coimbatore, Tamil Nadu"
                        className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                        Required Units
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="e.g. 4 Units / 1 Complete Line"
                        className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 px-4 py-3 sm:py-3.5 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#524942] block">
                      Specific Requirements / Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify fabric width, yarn count, production targets, or electrical requirements…"
                      className="w-full rounded-xl border border-[#D8CEBD] bg-white/90 p-4 text-sm text-[#161210] placeholder-[#9C9185] outline-none transition-all duration-200 hover:border-[#C5A059]/60 focus:border-[#C5A059] focus:bg-white focus:ring-2 focus:ring-[#C5A059]/20 resize-y min-h-[100px] leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#161210] py-2.5 sm:py-3.5 px-5 sm:px-8 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FAF7F2] transition-all duration-200 hover:bg-[#C5A059] hover:text-[#161210] hover:shadow-md cursor-pointer font-mono w-auto"
                    >
                      <span>Send Inquiry</span>
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Related Machinery Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-[#D8CEBD] pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#9E4E39] tracking-wider">
                  [ COMPLEMENTARY EQUIPMENT ]
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#161210] mt-1">
                  More {product.category} Machinery
                </h3>
              </div>
              <Link
                to="/products"
                className="font-mono text-xs font-bold uppercase text-[#161210] hover:text-[#9E4E39] flex items-center gap-1.5"
              >
                <span>ALL MACHINERY</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to="/products/$slug"
                  params={{ slug: rel.slug }}
                  className="group block rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-5 hover:border-[#C5A059] hover:shadow-lg transition-all"
                >
                  <div className="h-44 rounded-xl overflow-hidden mb-4 bg-[#161210]">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-[#9E4E39] font-bold uppercase">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#161210] group-hover:text-[#9E4E39] transition-colors mt-1">
                    {rel.name}
                  </h4>
                  <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#6B625B]">
                    <span>Speed: {rel.specs?.speed || rel.specifications?.productionSpeed || "850 – 1,100 RPM"}</span>
                    <span className="text-[#C5A059] font-bold group-hover:translate-x-1 transition-transform">
                      View →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
