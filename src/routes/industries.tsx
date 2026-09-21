import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Compass, ShieldCheck } from "lucide-react";
import { PageHero, SectionLabel } from "../components/site";
import { categoryList } from "../data/products";
import terminalImage from "../assets/industry-terminal.jpg";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Sector Expertise | Meridian Trade Co." },
      {
        name: "description",
        content:
          "Cross-border supply expertise across Agriculture, Food Processing, Manufacturing, Automotive, Construction, Energy, Retail, and Packaging.",
      },
      { property: "og:title", content: "Industry Sectors | Meridian Trade Co." },
      {
        property: "og:description",
        content:
          "Detailed supply chain profiles, regulatory tolerances, and specialized handling protocols.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const categoryImages = categoryList.map((category) => category.heroImage);

  const industries = [
    {
      number: "01",
      name: "AGRICULTURE & COMMODITIES",
      tagline: "Grains, Spices, Pulses & Oilseeds",
      desc: "Farm-gate aggregation, Sortex optical grading, bulk bag packaging, and fumigated oceanic transport for agricultural staples.",
      image: categoryImages[0],
      compliance: [
        "Phytosanitary Certificates",
        "Aflatoxin & Heavy Metal Screening",
        "Non-GMO Verification",
      ],
    },
    {
      number: "02",
      name: "FOOD PROCESSING & BEVERAGES",
      tagline: "Orthodox Tea, Green Arabica & Aseptic Purees",
      desc: "Temperature-controlled reefer container logistics, hermetic barrier packaging, and sanitary import documentation.",
      image: categoryImages[1],
      compliance: ["ISO 22000 / FSSC 22000", "US FDA Registration", "Halal & Kosher Audits"],
    },
    {
      number: "03",
      name: "HEAVY MANUFACTURING & STEEL",
      tagline: "Cold-Rolled Coils, Line Pipes & Alloy Extrusions",
      desc: "Direct mill contracts, ultrasonic non-destructive testing, and heavy-duty maritime stowage for industrial manufacturing.",
      image: categoryImages[2],
      compliance: [
        "EN 10204 3.1 Mill Test Reports",
        "ASTM & API Monograms",
        "Dimensional Verification",
      ],
    },
    {
      number: "04",
      name: "AUTOMOTIVE & COMMERCIAL FLEETS",
      tagline: "Forged Crankshafts, Brake Rotors & Gears",
      desc: "Precision engineering supply pipelines, VCI anti-corrosion preservation, and just-in-time container deliveries to assembly plants.",
      image: categoryImages[4],
      compliance: [
        "IATF 16949 Certified Foundries",
        "PPAP Level 3 Documentation",
        "ECE R90 Certification",
      ],
    },
    {
      number: "05",
      name: "CONSTRUCTION & INFRASTRUCTURE",
      tagline: "Structural Steel, Fasteners & Facade Profiles",
      desc: "Project-based sourcing, breakbulk ocean chartering, and jobsite-delivered structural materials for major development corridors.",
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=85",
      compliance: [
        "CE Structural Conformity",
        "Zinc Coating Thickness Logs",
        "Yield Stress Audits",
      ],
    },
    {
      number: "06",
      name: "ENERGY & CAPITAL EQUIPMENT",
      tagline: "Diesel Power Generators & High-Pressure Pumps",
      desc: "Heavy-lift crating, custom chassis rigging, and marine warranty surveyor sign-offs for critical power and processing machinery.",
      image: categoryImages[3],
      compliance: [
        "ATEX Explosion Proof Zone 1",
        "ISO 8528 Generator Standards",
        "CE Machinery Directive",
      ],
    },
    {
      number: "07",
      name: "EXPORT PACKAGING & LOGISTICS",
      tagline: "Corrugated Shippers & Heat-Treated Pallets",
      desc: "Transit-engineered protective supplies, moisture barrier films, and heat-treated wooden platforms ensuring damage-free ocean carriage.",
      image: categoryImages[5],
      compliance: [
        "IPPC ISPM-15 Heat Treatment Stamps",
        "FEFCO Box Standards",
        "FSC Recycled Certification",
      ],
    },
    {
      number: "08",
      name: "TEXTILES & NATURAL FIBERS",
      tagline: "Combed Cotton Bales & Woven Organic Canvas",
      desc: "Direct spinning mill consignments, staple fiber micronaire testing, and moisture-controlled ocean container stuffing.",
      image: categoryImages[7],
      compliance: [
        "GOTS Organic Certification",
        "OEKO-TEX Standard 100",
        "Cotton Corporation Lab Reports",
      ],
    },
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      {/* Page Hero */}
      <PageHero
        eyebrow="SECTOR EXPERTISE"
        categoryNumber="INDUSTRIES"
        title="BUILT FOR ESSENTIAL COMMERCE."
        copy="Every industry enforces distinct quality tolerances, customs clearance classifications, and transit handling rules. Our dedicated sector desks deliver tailored commercial execution."
        image={terminalImage}
      />

      {/* Editorial Horizontal List Section */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12 lg:py-36">
        <div className="border-b border-[#D8CEBD] pb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <SectionLabel number="01">SECTOR PORTFOLIO</SectionLabel>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#161210]">
              The 8 Industry Desks
            </h2>
          </div>
          <p className="max-w-md text-xs font-mono text-[#6B625B]">
            Hover any sector row to reveal the operational image, trade overview, and certified
            testing standards.
          </p>
        </div>

        {/* Large Editorial Rows */}
        <div className="mt-8 divide-y divide-[#D8CEBD]">
          {industries.map((ind, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={ind.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative overflow-hidden transition-all duration-500 py-10 lg:py-12 px-6 -mx-6 ${
                  isHovered ? "bg-[#FAF7F2] shadow-xl" : "bg-transparent"
                }`}
              >
                <div className="grid gap-8 lg:grid-cols-[100px_1.2fr_1fr_auto] lg:items-center relative z-10">
                  {/* Number */}
                  <span
                    className={`font-mono text-3xl sm:text-4xl font-bold transition-colors duration-300 ${
                      isHovered ? "text-[#9E4E39]" : "text-[#D8CEBD]"
                    }`}
                  >
                    {ind.number}
                  </span>

                  {/* Title & Tagline */}
                  <div>
                    <h3
                      className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all duration-300 ${
                        isHovered ? "text-[#161210] translate-x-2" : "text-[#161210]/90"
                      }`}
                    >
                      {ind.name}
                    </h3>
                    <span className="mt-2 block font-mono text-xs text-[#9E4E39]">
                      {ind.tagline}
                    </span>
                    <p className="mt-2 text-xs md:text-sm text-[#6B625B] leading-relaxed max-w-xl">
                      {ind.desc}
                    </p>
                  </div>

                  {/* Hover Image Preview */}
                  <div className="hidden lg:block overflow-hidden h-32 border border-[#D8CEBD] bg-[#161210]">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className={`size-full object-cover transition-transform duration-700 ${
                        isHovered ? "scale-110 opacity-100" : "scale-100 opacity-60"
                      }`}
                    />
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-end">
                    <Link
                      to="/request-quote"
                      className={`flex size-14 items-center justify-center border transition-all duration-300 ${
                        isHovered
                          ? "border-[#161210] bg-[#161210] text-[#FAF7F2]"
                          : "border-[#D8CEBD] text-[#6B625B] group-hover:border-[#C5A059]"
                      }`}
                    >
                      <ArrowRight
                        size={20}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>

                {/* Expanded Compliance Pill Tags */}
                {isHovered && (
                  <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#D8CEBD] animate-in fade-in duration-300 relative z-10">
                    {ind.compliance.map((comp) => (
                      <span
                        key={comp}
                        className="border border-[#D8CEBD] bg-[#F4EFE6] px-3 py-1 font-mono text-[11px] text-[#161210]"
                      >
                        ✓ {comp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Industry Trade Consultation */}
      <section className="border-t border-[#D8CEBD] bg-[#161210] py-20 px-6 lg:px-12 text-[#FAF7F2] text-center">
        <div className="mx-auto max-w-3xl space-y-5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block">
            [ TAILORED SECTOR CONSULTATION ]
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Discuss Your Specific Commodity or Industrial Supply Need
          </h2>
          <p className="text-sm text-[#FAF7F2]/70 max-w-xl mx-auto leading-relaxed">
            Our trade officers analyze chemical specifications, phytosanitary requirements, and
            ocean stowage restrictions to structure a compliant delivery path.
          </p>
          <div className="pt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-[#C5A059] bg-[#C5A059] px-8 py-4 font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#161210] hover:bg-[#FAF7F2] transition-colors"
            >
              <span>CONNECT WITH INDUSTRY DESK</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
