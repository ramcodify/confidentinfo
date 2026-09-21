import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Calculator,
  Check,
  CheckCircle2,
  Download,
  FileCheck,
  FileText,
  Globe2,
  Layers,
  Package,
  Scale,
  Share2,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
} from "lucide-react";
import { products, type Product } from "../data/products";
import { InquiryForm } from "../components/forms";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData: p }) => ({
    meta: [
      {
        title: p
          ? `${p.name} — Technical Specification & Trade Dossier | Confident Machinery`
          : "Product Not Found | Confident Machinery",
      },
      {
        name: "description",
        content: p
          ? `${p.name} (${p.grade}) sourced from ${p.origin}. Packaging: ${p.packaging}. Minimum order: ${p.moq}.`
          : "Product specification unavailable.",
      },
      {
        property: "og:title",
        content: p ? `${p.name} — Specification Dossier` : "Product Not Found",
      },
      { property: "og:description", content: p?.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const product = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState<"specs" | "packaging" | "compliance" | "shipping">(
    "specs",
  );
  const [volumePreset, setVolumePreset] = useState<"1fcl" | "2fcl" | "5fcl" | "bulk">("1fcl");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Related products from same category or fallback
  const relatedProducts = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.categoryId === product.categoryId || p.category === product.category),
    )
    .slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(
        `Certified Specification Sheet generated for ${product.name} (Batch ${product.slug.toUpperCase()}).`,
      );
    }, 800);
  };

  const volumeCalculations = {
    "1fcl": {
      label: "1x 20ft FCL",
      weight: "24-26 MT",
      cbm: "~33 CBM",
      pallets: "10-12 Europallets",
      transit: "Direct Ocean",
    },
    "2fcl": {
      label: "2x 40ft HQ FCL",
      weight: "52-54 MT",
      cbm: "~136 CBM",
      pallets: "40-44 Europallets",
      transit: "Priority Ocean",
    },
    "5fcl": {
      label: "5x 40ft HQ FCL",
      weight: "130-135 MT",
      cbm: "~340 CBM",
      pallets: "100+ Europallets",
      transit: "Dedicated Vessel Lot",
    },
    bulk: {
      label: "Charter Bulk Lot",
      weight: "500+ MT",
      cbm: "Custom Breakbulk",
      pallets: "Custom Stowage",
      transit: "Charter Bulk Carrier",
    },
  }[volumePreset];

  return (
    <div className="bg-slate-50 text-slate-900 pt-20">
      {/* Top Header & Breadcrumb Bar */}
      <div className="border-b border-slate-200/80 bg-white px-6 py-4 lg:px-12 shadow-xs">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Catalogue</span>
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-600">{product.category}</span>
            <span>/</span>
            <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-[11px] font-bold text-emerald-700">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ALLOCATION ACTIVE</span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              title="Copy share link"
            >
              <Share2 size={13} />
              <span>{copied ? "Copied Link!" : "Share"}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              title="Download spec dossier"
            >
              <Download size={13} />
              <span>{downloading ? "Preparing…" : "Spec Sheet PDF"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left Column: Visual Media & Telemetry */}
          <div className="space-y-6">
            {/* Primary Image Showcase */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-600/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-md">
                  {product.category}
                </span>
                <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-amber-400 border border-amber-400/20">
                  Grade {product.grade}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-slate-950/70 backdrop-blur-md px-4 py-2.5 text-xs text-white border border-white/10">
                <span className="font-mono text-[11px] text-slate-300">
                  BATCH CODE: <strong className="text-white">{product.slug.toUpperCase()}</strong>
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Globe2 size={13} className="text-blue-400" />
                  <span>{product.origin.split(",")[0]}</span>
                </span>
              </div>
            </div>

            {/* Logistics & Handling Telemetry Badges */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition hover:border-blue-300">
                <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
                <span className="mt-2.5 block text-xs font-bold text-slate-900">INSPECTION</span>
                <span className="text-[11px] text-slate-500">SGS / Pre-Shipment</span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition hover:border-blue-300">
                <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Ship size={20} />
                </div>
                <span className="mt-2.5 block text-xs font-bold text-slate-900">TRANSIT</span>
                <span className="text-[11px] text-slate-500">Full Container Load</span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition hover:border-blue-300">
                <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FileCheck size={20} />
                </div>
                <span className="mt-2.5 block text-xs font-bold text-slate-900">INCOTERMS</span>
                <span className="text-[11px] text-slate-500">FOB · CIF · CFR</span>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition hover:border-blue-300">
                <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Truck size={20} />
                </div>
                <span className="mt-2.5 block text-xs font-bold text-slate-900">LEAD TIME</span>
                <span className="text-[11px] text-slate-500">7-14 Days Port Out</span>
              </div>
            </div>

            {/* Interactive Volume & Container Allocation Calculator */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Calculator size={15} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Container Allocation Estimator
                  </h3>
                </div>
                <span className="text-[11px] font-medium text-slate-500">Incoterms 2020</span>
              </div>

              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                Select your intended purchase order volume to calculate estimated container
                requirements, gross weight, and stowing capacity:
              </p>

              {/* Volume selector tabs */}
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { id: "1fcl", label: "1x FCL (20ft)" },
                  { id: "2fcl", label: "2x FCL (40ft HQ)" },
                  { id: "5fcl", label: "5x FCL (Fleet)" },
                  { id: "bulk", label: "Bulk Vessel" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVolumePreset(item.id as any)}
                    className={`rounded-xl py-2 px-3 text-xs font-bold transition-all ${
                      volumePreset === item.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Calculated results card */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl bg-slate-50 p-3.5 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Est. Weight</span>
                  <strong className="text-slate-900 font-semibold">
                    {volumeCalculations.weight}
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Volume (CBM)</span>
                  <strong className="text-slate-900 font-semibold">{volumeCalculations.cbm}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Pallet Stowing</span>
                  <strong className="text-slate-900 font-semibold">
                    {volumeCalculations.pallets}
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Transit Routing</span>
                  <strong className="text-blue-600 font-semibold">
                    {volumeCalculations.transit}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Specification Dossier & Tabs */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {product.category}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Globe2 size={13} />
                  Origin: {product.origin}
                </span>
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <span className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-xs font-bold text-white">
                  SPEC GRADE: {product.grade}
                </span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Quality Verified
                </span>
              </div>

              <p className="mt-4 text-base leading-relaxed text-slate-600">{product.description}</p>
            </div>

            {/* Segmented Modern Tab Controller */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs">
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {[
                  { id: "specs", label: "Specifications" },
                  { id: "packaging", label: "Packaging & MOQ" },
                  { id: "compliance", label: "Certifications" },
                  { id: "shipping", label: "Delivery & Terms" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`rounded-xl py-2 px-3 text-xs font-bold transition-all ${
                      activeTab === t.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Technical Specifications */}
              {activeTab === "specs" && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">
                    Laboratory Benchmarks & Standard Metrics
                  </h4>
                  <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 overflow-hidden">
                    {[
                      ["Commercial Grade", product.grade],
                      ["Origin Mill / Basin", product.origin],
                      ["Standard Packaging", product.packaging],
                      ["Minimum Order Quantity", product.moq],
                      ["Key Discharge Ports", product.destination],
                    ].map(([label, val]) => (
                      <div
                        key={label}
                        className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] p-3 text-xs"
                      >
                        <span className="font-semibold text-slate-500">{label}</span>
                        <span className="font-bold text-slate-900">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      Technical Laboratory Benchmarks:
                    </span>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {product.specs.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-800"
                        >
                          <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Packaging & MOQ */}
              {activeTab === "packaging" && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">
                    Export Packing & Handling Parameters
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Package size={18} />
                        <span className="font-bold text-xs text-slate-900">Packaging Type</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{product.packaging}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Heavy-duty export grade, hermetically sealed or crated according to
                        destination customs standards.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <Scale size={18} />
                        <span className="font-bold text-xs text-slate-900">
                          Minimum Order (MOQ)
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{product.moq}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Custom volume splits and scheduled periodic shipments available upon
                        contract agreement.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Certifications */}
              {activeTab === "compliance" && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">
                    Verified Quality Assurance Protocols
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.compliance.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-xs font-bold text-emerald-800"
                      >
                        <ShieldCheck size={14} className="text-emerald-600" />
                        <span>{c}</span>
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Full batch traceability documents, phytosanitary certifications, certificate of
                    origin, and independent SGS/Bureau Veritas inspection sheets are provided prior
                    to vessel departure.
                  </p>
                </div>
              )}

              {/* Tab 4: Trade Terms */}
              {activeTab === "shipping" && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">
                    Incoterms 2020 & Shipping Delivery Hubs
                  </h4>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Ship size={16} className="text-blue-600" />
                      <span className="text-xs font-bold text-slate-900">Supported Incoterms:</span>
                      <span className="text-xs font-semibold text-blue-600">
                        {product.tradeTerms.join(" · ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe2 size={16} className="text-slate-500" />
                      <span className="text-xs font-bold text-slate-900">Primary Hubs:</span>
                      <span className="text-xs text-slate-700">{product.destination}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Commercial Allocation Banner */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-slate-900 to-blue-950 p-8 text-white shadow-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/20">
                <Sparkles size={13} />
                PRODUCT INQUIRY & SPECIFICATIONS
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white">
                Inquire About {product.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Interested in this product? Submit an inquiry to request complete technical documentation,
                operational specs, or custom configuration details.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#quote-form"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700"
                >
                  <span>Request Product Details</span>
                  <ArrowRight size={14} />
                </a>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-xs font-semibold text-white hover:bg-white/10 transition"
                >
                  <span>Browse Full Catalogue</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Quotation Section Pre-filled with this Product */}
      <section
        id="quote-form"
        className="border-t border-slate-200/80 bg-white py-16 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-2 mb-10">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
              PRODUCT INQUIRY DESK
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Product Inquiry for {product.name}
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              This form directly connects you with our product team regarding {product.name} specifications, availability, and technical documentation.
            </p>
          </div>

          <InquiryForm quote productName={product.name} />
        </div>
      </section>

      {/* Related Products from this Category */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-200/80 bg-slate-50 py-16 px-6 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  SIMILAR PORTFOLIO
                </span>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Related in {product.category}
                </h3>
              </div>
              <Link
                to="/products"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All Products</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.slug}
                  to="/products/$slug"
                  params={{ slug: rel.slug }}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:shadow-md hover:border-blue-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-bold text-white">
                      {rel.grade}
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-[11px] font-medium text-slate-400 uppercase">
                      {rel.origin}
                    </span>
                    <h4 className="mt-1 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {rel.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{rel.description}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-blue-600">
                      <span>View Specifications</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
