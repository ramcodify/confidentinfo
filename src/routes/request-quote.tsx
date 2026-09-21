import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileCheck2,
  FileSpreadsheet,
  HelpCircle,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { InquiryForm } from "../components/forms";
import { PageHero, SectionLabel } from "../components/site";
import terminalImage from "../assets/industry-terminal.jpg";

export const Route = createFileRoute("/request-quote")({
  head: () => ({
    meta: [
      { title: "Request a Trade Quote & Commodity Allocation | Meridian" },
      {
        name: "description",
        content:
          "Submit your container volume, commodity requirements, incoterms, and destination port for an official commercial pro-forma trade quotation.",
      },
      { property: "og:title", content: "Request a Trade Quote | Meridian Trade Co." },
      {
        property: "og:description",
        content:
          "Formal commercial trade quotation manifest for international import and export operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RequestQuotePage,
});

function RequestQuotePage() {
  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      {/* Page Hero */}
      <PageHero
        eyebrow="COMMERCIAL ALLOCATION"
        categoryNumber="QUOTATION"
        title="REQUEST A TRADE QUOTE."
        copy="Submit your target commodity specifications, required volume (MOQ), discharge port, and scheduling window. Our trade desk provides pro-forma commercial terms structured around active ocean freight indices."
        image={terminalImage}
      />

      {/* Main Quotation Workstation */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left Column: Quotation Guidelines & Standards */}
          <div className="space-y-8">
            <div>
              <SectionLabel number="01">PROCEDURAL PROTOCOL</SectionLabel>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#161210]">
                Commercial Allocation Protocol
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6B625B]">
                Each formal trade quotation issued by Meridian Trade Co. is backed by verified
                supplier capacity, audited stock reserves, and active ocean carrier container
                bookings.
              </p>
            </div>

            <div className="border border-[#D8CEBD] bg-[#FAF7F2] p-6 space-y-4 shadow-sm">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-[#9E4E39] block">
                [ INCLUDED IN YOUR PRO-FORMA DOSSIER ]
              </span>
              <ul className="space-y-3 font-mono text-xs text-[#161210]">
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Itemized FOB / CIF ocean freight cost breakdown</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Certified pre-shipment inspection scope (SGS/BV)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Packaging specifications & container stuffing configuration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Payment terms via Irrevocable Letter of Credit (L/C) or T/T</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-[#C5A059] bg-[#FAF7F2] p-6 text-xs text-[#6B625B] leading-relaxed">
              <strong className="block font-serif text-sm font-bold text-[#161210] mb-1">
                Commercial Confidentiality
              </strong>
              All customer product requests, target destination ports, and operational
              specifications are handled with strict non-disclosure compliance.
            </div>
          </div>

          {/* Right Column: Trade Manifest Form */}
          <div>
            <div className="mb-4">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-[#9E4E39]">
                [ TRADE QUOTATION DOCUMENT ]
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#161210]">
                Official Commercial Inquiry Manifest
              </h3>
            </div>
            <InquiryForm quote={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
