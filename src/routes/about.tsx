import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  Check,
  Compass,
  FileCheck,
  Globe2,
  Scale,
  ShieldCheck,
  Ship,
  Target,
  Users,
} from "lucide-react";
import { PageHero, SectionLabel } from "../components/site";
import warehouseImage from "../assets/warehouse-operations.jpg";
import heroImage from "../assets/global-port-hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Meridian Trade Co. — International Trading House" },
      {
        name: "description",
        content:
          "Established in 2012. Meridian connects origin producers with global destination markets through verified procurement, disciplined trade execution, and multimodal maritime logistics.",
      },
      { property: "og:title", content: "About Meridian Trade Co." },
      {
        property: "og:description",
        content:
          "Old-World Global Trade × Modern Industrial Luxury. Learn our history, governance, and operating philosophy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const pillars = [
    {
      num: "01",
      title: "PROVENANCE & ORIGIN INTEGRITY",
      desc: "We verify every agricultural terroir, milling facility, and manufacturing plant directly at source, guaranteeing traceable authenticity and physical quality.",
      icon: Target,
    },
    {
      num: "02",
      title: "CONTRACTUAL & FINANCIAL RIGOR",
      desc: "Our trade contracts are anchored in Incoterms 2020 and executed via secure banking instruments (Letters of Credit, Escrow), eliminating counterparty exposure.",
      icon: Scale,
    },
    {
      num: "03",
      title: "MARITIME LOGISTICS COMMAND",
      desc: "Deep-rooted carrier partnerships guarantee container slot access, reefer temperature telemetry, and smooth port terminal clearance across key choke points.",
      icon: Ship,
    },
    {
      num: "04",
      title: "LONG-TERM SYNDICATE PARTNERSHIPS",
      desc: "We build multi-year relationships with family agricultural cooperatives, industrial mills, and sovereign import bodies rather than transactional trades.",
      icon: Users,
    },
  ];

  const milestones = [
    {
      year: "2012",
      title: "FOUNDATION OF MERIDIAN",
      desc: "Established in Dubai's maritime financial district as an agricultural commodity trade syndicate.",
    },
    {
      year: "2016",
      title: "EXPANSION INTO INDUSTRIAL MATERIALS",
      desc: "Began chartering flat-rolled steel and line pipe shipments from East Asian mills into Europe and the GCC.",
    },
    {
      year: "2020",
      title: "INTEGRATED LOGISTICS ARM",
      desc: "Launched dedicated multimodal freight coordination and bonded warehousing facilities.",
    },
    {
      year: "2024+",
      title: "GLOBAL COMMERCE EXPEDITION",
      desc: "Surpassed 500+ vessel charter shipments across 25+ sovereign destination markets.",
    },
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      {/* Page Hero */}
      <PageHero
        eyebrow="THE TRADING HOUSE"
        categoryNumber="ABOUT"
        title="TRADE BUILT ON INTEGRITY & ACCOUNTABILITY."
        copy="Established in 2012, Meridian Trade Co. orchestrates complex cross-border commerce between producing terroirs, industrial hubs, and global consumption centers."
        image={heroImage}
      />

      {/* Origin Story: Split Editorial Section */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <SectionLabel number="01">OUR FOUNDATION</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161210] leading-tight">
              A TRADING HOUSE
              <br />
              <span className="italic text-[#9E4E39]">FORGED BY INTEGRITY.</span>
            </h2>
            <div className="space-y-5 text-sm md:text-base leading-relaxed text-[#6B625B]">
              <p>
                In an era dominated by opaque brokers and automated digital exchanges, Meridian was
                founded upon an enduring trade truth: international commerce succeeds only when
                backed by physical verification, deep contractual discipline, and personal
                accountability.
              </p>
              <p>
                Operating between deep-water container terminals, bonded agricultural warehouses,
                and precision manufacturing centers, we bridge producers with buyers through
                structured trade terms that protect capital and ensure predictable delivery.
              </p>
            </div>

            {/* Brass Checklist */}
            <div className="space-y-3 font-mono text-xs text-[#161210] pt-4 border-t border-[#D8CEBD]">
              <div className="flex items-center gap-3">
                <span className="size-1.5 bg-[#C5A059]" />
                <span>Audited origin mills across South Asia, the Americas, and Europe</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="size-1.5 bg-[#C5A059]" />
                <span>Strict non-negotiable pre-shipment surveyor certification</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="size-1.5 bg-[#C5A059]" />
                <span>Full Incoterms 2020 legal framework compliance</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden border border-[#C5A059] shadow-2xl">
              <img
                src={warehouseImage}
                alt="Meridian global trade warehouse operations"
                className="aspect-[4/5] w-full object-cover filter contrast-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 border border-[#D8CEBD] bg-[#161210] p-6 text-[#FAF7F2] max-w-xs shadow-xl">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
                [ HEADQUARTERS ]
              </span>
              <span className="font-serif text-xl font-bold block">MARITIME DISTRICT</span>
              <span className="text-xs text-[#FAF7F2]/60 font-mono">
                Coordinating Atlantic, Arabian, and Pacific shipping lanes.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars in Espresso Background */}
      <section className="bg-[#161210] py-24 lg:py-36 px-6 lg:px-12 text-[#FAF7F2] border-y border-[#C5A059]/25">
        <div className="mx-auto max-w-[1440px]">
          <div className="border-b border-[#FAF7F2]/10 pb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <SectionLabel dark number="02">
                GOVERNANCE
              </SectionLabel>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold">
                THE FOUR PILLARS
                <br />
                <span className="text-[#C5A059] italic">OF OUR TRADE.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#FAF7F2]/65">
              These fundamental principles guide every purchase order, freight booking, and cargo
              delivery undertaken by Meridian.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.num}
                  className="border border-[#C5A059]/20 bg-[#1F1916] p-8 transition-colors duration-300 hover:border-[#C5A059]"
                >
                  <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-4">
                    <span className="font-mono text-xl font-bold text-[#C5A059]">{pillar.num}</span>
                    <Icon size={22} className="text-[#C5A059]" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold text-[#FAF7F2]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#FAF7F2]/65">{pillar.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 bg-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <SectionLabel number="03">CHRONOLOGY</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-[#161210]">
            A Decade of Continuous Trade Execution
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <div key={m.year} className="border-t-2 border-[#C5A059] pt-6 space-y-3">
                <span className="font-mono text-2xl font-bold text-[#9E4E39]">{m.year}</span>
                <h4 className="font-serif text-lg font-bold text-[#161210]">{m.title}</h4>
                <p className="text-xs text-[#6B625B] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="border-t border-[#D8CEBD] bg-[#161210] py-20 px-6 lg:px-12 text-[#FAF7F2] text-center">
        <div className="mx-auto max-w-3xl space-y-5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block">
            [ INITIATE PARTNERSHIP ]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Start a Commercial Conversation with Our Trade Desk
          </h2>
          <p className="text-sm text-[#FAF7F2]/70 max-w-xl mx-auto leading-relaxed">
            Whether seeking reliable procurement of agricultural commodities or requiring export
            representation, our team is ready to review your terms.
          </p>
          <div className="pt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-[#C5A059] bg-[#C5A059] px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#161210] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>CONNECT WITH TRADE OFFICERS</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
