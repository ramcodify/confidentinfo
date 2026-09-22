import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  FileCheck,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Quote,
  Scale,
  ShieldCheck,
  Ship,
  Sparkles,
} from "lucide-react";
import { PageHero, SectionLabel, MarqueeTicker } from "../components/site";
import { useMachineryStore, DEFAULT_OWNER_PROFILE } from "../lib/machinery-store";
import founderPortrait from "../assets/founder-portrait.jpg";
import industryTerminal from "../assets/industry-terminal.jpg";

export const Route = createFileRoute("/owner")({
  head: () => ({
    meta: [
      { title: "Owner & Leadership | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "Meet the Founder & Managing Director of Confident Textiles Machinery. Over 14 years commanding China-to-India textile machinery sourcing, factory audits, and import logistics.",
      },
      { property: "og:title", content: "Owner & Leadership | Confident Textiles Machinery" },
    ],
  }),
  component: OwnerProfilePage,
});

export function OwnerProfilePage() {
  const { ownerProfile } = useMachineryStore();
  const profile = ownerProfile || DEFAULT_OWNER_PROFILE;

  return (
    <div className="bg-[#FAF7F2] text-[#161210]">
      {/* 1. Editorial Page Hero */}
      <PageHero
        eyebrow="CHINA TO INDIA TEXTILE MACHINERY EXECUTIVE LEADERSHIP"
        categoryNumber="PROFILE"
        title="OWNER &amp; MANAGING DIRECTOR."
        copy="Architecting an international machinery sourcing enterprise built on physical Chinese factory verification, technical precision, and personal accountability to Indian textile mills."
        image={industryTerminal}
      />

      {/* 2. Real-Time Executive Telemetry Metrics Strip */}
      <section className="border-b border-[#C5A059]/30 bg-[#161210] py-6 sm:py-8 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                DIRECTOR TENURE
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                14+ Years
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                China–India Machinery Corridor
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                PLANTS AUDITED
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                120+ Mills
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Shanghai, Guangzhou &amp; Wuxi
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                IMPORT CLEARANCES
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                500+ Units
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Nhava Sheva, Mundra &amp; Chennai
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                ACCOUNTABILITY
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#DFBA6F]">
                100% Direct
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Personal Factory Floor Load Trials
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Marquee Ticker */}
      <MarqueeTicker />

      {/* 4. Main Profile & Background Section */}
      <section className="mx-auto max-w-[1440px] 2xl:max-w-[1680px] 3xl:max-w-[2000px] px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Owner Portrait & Bio Card */}
          <div className="space-y-6 sm:space-y-8">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border-2 border-[#C5A059] shadow-2xl bg-[#161210]">
                <img
                  src={profile.photo || founderPortrait}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = founderPortrait;
                  }}
                  alt={profile.name}
                  className="aspect-[4/5] w-full object-cover filter contrast-105"
                />
              </div>

              {/* Leadership Dossier Badge */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-6 border border-[#C5A059]/40 bg-[#161210] p-4 sm:p-6 text-[#FAF7F2] shadow-2xl max-w-full sm:max-w-xs rounded-xl">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
                  [ LEADERSHIP DOSSIER ]
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold block text-[#FAF7F2]">
                  {profile.name}
                </h3>
                <p className="text-xs text-[#C5A059] font-mono mt-0.5 font-semibold">
                  {profile.designation}
                </p>
                <p className="mt-2 text-[10px] sm:text-[11px] text-[#FAF7F2]/70 leading-relaxed font-sans">
                  {profile.company} · 14+ Years Sourcing Across China & Delivering to India.
                </p>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="rounded-2xl border border-[#D8CEBD] bg-[#FAF7F2] p-6 space-y-4 shadow-sm">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-[#9E4E39] block">
                [ DIRECT EXECUTIVE DESK ]
              </span>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-[#C5A059]" />
                  <a href={`tel:${profile.phone}`} className="hover:underline text-[#161210]">
                    {profile.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-[#C5A059]" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:underline text-[#161210] break-all"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={15} className="text-[#C5A059]" />
                  <span className="text-[#6B625B]">{profile.location}</span>
                </div>
                {profile.linkedin && (
                  <div className="flex items-center gap-3">
                    <Linkedin size={15} className="text-[#C5A059]" />
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[#161210]"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Background & Experience */}
          <div className="space-y-8 lg:pl-6">
            <div>
              <SectionLabel number="01">PROFESSIONAL BACKGROUND</SectionLabel>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#161210] leading-tight">
                “MACHINERY RELIABILITY IS
                <br />
                <span className="text-[#9E4E39] italic">PERSONAL ACCOUNTABILITY.”</span>
              </h2>
            </div>

            {/* Pull Quote */}
            <div className="relative border-l-2 border-[#C5A059] pl-6 py-2">
              <Quote className="text-[#C5A059] size-7 mb-2 opacity-60" />
              <p className="font-serif text-xl sm:text-2xl text-[#161210] italic leading-relaxed">
                Textile machinery cannot be procured from catalogues alone. It demands physical
                visits to Chinese factory floors, dimensional calibration checks, component vetting,
                and direct supervision from container stuffing in Shanghai to commissioning in
                Tirupur or Surat.
              </p>
            </div>

            {/* Biography */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#6B625B]">
              <p>{profile.biography}</p>
            </div>

            {/* Experience Checklist */}
            <div className="space-y-4 pt-4 border-t border-[#D8CEBD]">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#161210] uppercase block">
                PROFESSIONAL EXPERIENCE & ACHIEVEMENTS:
              </span>
              <div className="space-y-3">
                {(profile.experience || []).map((exp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#161210] leading-relaxed">{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Expertise Grid */}
            <div className="space-y-4 pt-4 border-t border-[#D8CEBD]">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#161210] uppercase block">
                AREAS OF EXPERTISE:
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {(profile.expertise || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#C5A059]/40 bg-[#FAF7F2] text-xs font-mono font-bold text-[#161210] flex items-center gap-2"
                  >
                    <span className="size-1.5 bg-[#9E4E39] rounded-full" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex w-auto items-center justify-center gap-2 rounded-xl bg-[#161210] px-5 sm:px-8 py-2.5 sm:py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#9E4E39] transition-colors shadow-md"
              >
                <span>CONSULT WITH THE DESK</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
