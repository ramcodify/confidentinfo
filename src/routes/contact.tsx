import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Compass, Mail, MapPin, Phone, Radio, Ship } from "lucide-react";
import { InquiryForm } from "../components/forms";
import { PageHero, SectionLabel } from "../components/site";
import heroImage from "../assets/global-port-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Our Trade Desk | Meridian Trade Co." },
      {
        name: "description",
        content:
          "Connect directly with Meridian Trade Co.'s international procurement and vessel logistics desks for import, export, and commodity inquiries.",
      },
      { property: "og:title", content: "Contact Meridian Trade Co." },
      {
        property: "og:description",
        content:
          "Maritime office coordinates, commercial desk channels, and official trade inquiry manifest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const contactChannels = [
    {
      title: "Commercial Trade Desk",
      primary: "trade@meridiantrade.com",
      sub: "Inquiries, commodity allocation, pro-forma quotes",
      icon: Mail,
    },
    {
      title: "Operations & Freight Coordination",
      primary: "+1 (800) 492-8723",
      sub: "Vessel tracking, container milestones, customs release",
      icon: Phone,
    },
    {
      title: "Maritime Registered Office",
      primary: "Trade Towers, Level 42, Port Financial Center",
      sub: "Maritime Commercial District, Free Zone Area",
      icon: MapPin,
    },
    {
      title: "Trade Desk Operating Hours",
      primary: "Mon–Fri: 08:00 – 19:00 UTC",
      sub: "Vessel dispatch monitoring: 24/7 active watch",
      icon: Clock3,
    },
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      {/* Page Hero */}
      <PageHero
        eyebrow="DIRECT COMMUNICATION"
        categoryNumber="CONTACT"
        title="WHERE TRADE BEGINS."
        copy="Reach our international trade officers to initiate a sourcing requirement, schedule a bulk ocean shipment, or request a pro-forma quote."
        image={heroImage}
      />

      {/* Split-Screen Contact Section */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Left Column: Editorial Information & Stylized Port Card */}
          <div className="space-y-10">
            <div>
              <SectionLabel number="01">COMMUNICATION DESK</SectionLabel>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161210] leading-tight">
                WHERE
                <br />
                TRADE
                <br />
                <span className="text-[#9E4E39] italic">BEGINS.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6B625B]">
                Whether you are a food distributor sourcing containerized agricultural harvests or
                an industrial procurement director seeking mill-certified steel coils, our trade
                team provides clear commercial direction.
              </p>
            </div>

            {/* Contact Channels List */}
            <div className="space-y-6 border-t border-[#D8CEBD] pt-8">
              {contactChannels.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center border border-[#C5A059] bg-[#FAF7F2] text-[#161210]">
                      <Icon size={18} className="text-[#C5A059]" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-[#6B625B] block">
                        {item.title}
                      </span>
                      <strong className="mt-1 block font-serif text-lg font-bold text-[#161210]">
                        {item.primary}
                      </strong>
                      <span className="text-xs text-[#6B625B] font-sans">{item.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stylized Port Coordinates Card (replacing generic Google Map) */}
            <div className="relative overflow-hidden border border-[#C5A059] bg-[#161210] p-8 text-[#FAF7F2] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#FAF7F2]/10 pb-4">
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase flex items-center gap-2">
                  <Radio size={14} className="text-[#C5A059] animate-pulse" />[ MARITIME PORT RADAR
                  STATION ]
                </span>
                <span className="font-mono text-[10px] text-[#FAF7F2]/50">MTC-VHF-CH16</span>
              </div>

              <div className="mt-6 space-y-3 font-mono text-xs text-[#FAF7F2]/80">
                <div className="flex justify-between border-b border-[#FAF7F2]/10 pb-2">
                  <span>TERMINAL LOCATION</span>
                  <span className="text-[#FAF7F2] font-bold">PORT LOGISTICS HUB 1</span>
                </div>
                <div className="flex justify-between border-b border-[#FAF7F2]/10 pb-2">
                  <span>GLOBAL LATITUDE</span>
                  <span className="text-[#C5A059]">25° 15' 08" N</span>
                </div>
                <div className="flex justify-between border-b border-[#FAF7F2]/10 pb-2">
                  <span>GLOBAL LONGITUDE</span>
                  <span className="text-[#C5A059]">55° 18' 22" E</span>
                </div>
                <div className="flex justify-between border-b border-[#FAF7F2]/10 pb-2">
                  <span>BERTH CHANNEL DEPTH</span>
                  <span>18.5 METERS (POST-PANAMAX)</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>CUSTOMS ACCREDITATION</span>
                  <span className="text-[#3E4C34] font-bold text-[#C5A059]">AEO-F CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Trade Inquiry Form */}
          <div>
            <div className="mb-4">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-[#9E4E39]">
                [ TRANSMIT MANIFEST ]
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#161210]">
                Direct Trade Inquiry Submission
              </h3>
            </div>
            <InquiryForm quote={false} />
          </div>
        </div>
      </section>
    </div>
  );
}
