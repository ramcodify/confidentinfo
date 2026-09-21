import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Anchor,
  ArrowRight,
  Check,
  Compass,
  Globe2,
  MapPin,
  Navigation,
  Ship,
  Sparkles,
} from "lucide-react";
import { PageHero, SectionLabel } from "../components/site";
import heroImage from "../assets/global-port-hero.jpg";

export const Route = createFileRoute("/global-network")({
  head: () => ({
    meta: [
      { title: "Global Network & Shipping Corridors | Meridian Trade Co." },
      {
        name: "description",
        content:
          "Explore Meridian's active maritime trade routes and terminal hubs connecting India, the Middle East, Europe, Africa, Southeast Asia, and North America.",
      },
      { property: "og:title", content: "Global Network & Trade Routes | Meridian" },
      {
        property: "og:description",
        content: "Interactive cartographic trade corridor explorer and hub terminal dossiers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GlobalNetworkPage,
});

function GlobalNetworkPage() {
  const [selectedHub, setSelectedHub] = useState<number>(0);

  const hubs = [
    {
      id: "middle-east",
      name: "JEBEL ALI & DAMMAM",
      region: "Middle East & GCC",
      coords: [580, 185],
      portAuthority: "DP World & Mawani Certified",
      coordinates: "25°00' N / 55°03' E",
      turnaround: "24–36 hrs average berth discharge",
      primaryFlow: "Aromatic Basmati Rice, Cardamom, Petrochemicals, Re-Export Packaging",
      overview:
        "The primary transshipment nerve center connecting South Asian agricultural basins with European and North African distribution channels.",
    },
    {
      id: "south-asia",
      name: "NHAVA SHEVA & MUNDRA",
      region: "South Asia / India",
      coords: [665, 205],
      portAuthority: "JNPT & Adani Ports Gateway",
      coordinates: "18°56' N / 72°56' E",
      turnaround: "Direct inland rail head connections",
      primaryFlow: "Aged Basmati, Whole Spices, Pulses, Forged Engine Components, Raw Cotton",
      overview:
        "The vital agricultural and manufacturing export origin corridor supplying premium food staples and engineered capital goods worldwide.",
    },
    {
      id: "europe",
      name: "ROTTERDAM & HAMBURG",
      region: "Europe",
      coords: [490, 115],
      portAuthority: "Port of Rotterdam Authority & HHM",
      coordinates: "51°55' N / 04°24' E",
      turnaround: "Continuous 24/7 automated intermodal handling",
      primaryFlow: "Cold-Rolled Steel Coils, Heavy Machine Tools, Specialty Food Ingredients",
      overview:
        "Europe’s premier deep-sea container gateway, providing barge, rail, and feeder links into the Rhine-Ruhr and Northern industrial heartlands.",
    },
    {
      id: "southeast-asia",
      name: "SINGAPORE & PORT KLANG",
      region: "Southeast Asia",
      coords: [740, 255],
      portAuthority: "PSA Singapore & Port Klang Authority",
      coordinates: "01°16' N / 103°51' E",
      turnaround: "Global transshipment leader",
      primaryFlow: "Cast LLDPE Stretch Film, Refined Vegetable Glycerin, Electronics",
      overview:
        "Dominating the Strait of Malacca, serving as the pivotal transit link between Far Eastern manufacturing centers and Western trade channels.",
    },
    {
      id: "north-america",
      name: "HOUSTON & LONG BEACH",
      region: "North America",
      coords: [210, 175],
      portAuthority: "Port Houston & Port of Long Beach",
      coordinates: "29°45' N / 95°17' W",
      turnaround: "Class-1 intermodal railroad connections",
      primaryFlow: "Industrial Pipes, Agricultural Pulses, Specialty Chemicals, Machinery",
      overview:
        "Anchor destinations for inbound bulk commodities and prime launchpads for capital goods moving across Atlantic and Pacific waters.",
    },
    {
      id: "africa",
      name: "MOMBASA & DURBAN",
      region: "Sub-Saharan Africa",
      coords: [545, 290],
      portAuthority: "KPA & Transnet Port Terminals",
      coordinates: "04°03' S / 39°40' E",
      turnaround: "Key East & Southern African Gateway",
      primaryFlow: "Construction Steel, Grains, Tea, Packaged Consumer Commodities",
      overview:
        "Strategic gateways facilitating vital commodity inflows and tea exports across the Northern Corridor and Southern African Development Community.",
    },
  ];

  const routes = [
    { from: 4, to: 2 }, // Houston -> Rotterdam
    { from: 2, to: 0 }, // Rotterdam -> Jebel Ali
    { from: 0, to: 1 }, // Jebel Ali -> India
    { from: 1, to: 3 }, // India -> Singapore
    { from: 0, to: 5 }, // Jebel Ali -> Mombasa
    { from: 3, to: 4 }, // Singapore -> North America
  ];

  return (
    <div className="bg-[#F4EFE6] text-[#161210]">
      {/* Page Hero */}
      <PageHero
        eyebrow="MARITIME CORRIDORS"
        categoryNumber="NETWORK"
        title="CONNECTED BY TRADE."
        copy="A disciplined international sourcing, terminal handling, and multimodal logistics network spanning six principal oceanic corridors."
        image={heroImage}
      />

      {/* Main Map & Hub Console Section in Deep Espresso */}
      <section className="bg-[#161210] py-20 lg:py-32 px-6 lg:px-12 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-6 border-b border-[#FAF7F2]/10 pb-8 md:flex-row md:items-end">
            <div className="space-y-3">
              <SectionLabel dark number="01">
                CARTOGRAPHIC CONTROL
              </SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
                Global Trade Routes & Strategic Hubs
              </h2>
            </div>
            <p className="max-w-md text-xs font-mono text-[#FAF7F2]/60">
              Click any terminal node on the radar schematic below to inspect port coordinates,
              cargo flows, and average customs clearance velocity.
            </p>
          </div>

          {/* Interactive World Map SVG */}
          <div className="relative mt-12 overflow-hidden border border-[#C5A059]/30 bg-[#120F0D] p-6 lg:p-12 shadow-2xl">
            <div className="relative aspect-[16/9] w-full max-h-[580px]">
              <svg viewBox="0 0 960 480" className="size-full" fill="none">
                {/* Coordinate Grids */}
                {[120, 240, 360].map((y) => (
                  <line
                    key={`lat-${y}`}
                    x1="0"
                    y1={y}
                    x2="960"
                    y2={y}
                    stroke="#C5A059"
                    strokeWidth="0.5"
                    strokeDasharray="3 6"
                    opacity="0.12"
                  />
                ))}
                {[200, 400, 600, 800].map((x) => (
                  <line
                    key={`lon-${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="480"
                    stroke="#C5A059"
                    strokeWidth="0.5"
                    strokeDasharray="3 6"
                    opacity="0.12"
                  />
                ))}

                {/* Minimal Continent Outlines */}
                <path
                  d="M90 70 L240 50 L310 110 L280 180 L230 220 L190 260 L140 230 L110 160 Z"
                  fill="#231C18"
                  stroke="#C5A059"
                  strokeWidth="0.75"
                  strokeOpacity="0.25"
                />
                <path
                  d="M230 250 L310 260 L360 330 L320 420 L270 450 L230 360 Z"
                  fill="#231C18"
                  stroke="#C5A059"
                  strokeWidth="0.75"
                  strokeOpacity="0.25"
                />
                <path
                  d="M440 60 L550 50 L560 110 L520 150 L450 140 L430 90 Z"
                  fill="#231C18"
                  stroke="#C5A059"
                  strokeWidth="0.75"
                  strokeOpacity="0.25"
                />
                <path
                  d="M450 160 L570 170 L610 240 L580 370 L520 420 L460 320 L430 210 Z"
                  fill="#231C18"
                  stroke="#C5A059"
                  strokeWidth="0.75"
                  strokeOpacity="0.25"
                />
                <path
                  d="M570 60 L830 50 L890 120 L840 230 L730 260 L650 240 L580 160 Z"
                  fill="#231C18"
                  stroke="#C5A059"
                  strokeWidth="0.75"
                  strokeOpacity="0.25"
                />
                <path
                  d="M770 310 L890 320 L880 400 L800 420 L760 360 Z"
                  fill="#231C18"
                  stroke="#C5A059"
                  strokeWidth="0.75"
                  strokeOpacity="0.25"
                />

                {/* Route Arcs */}
                {routes.map((r, i) => {
                  const start = hubs[r.from].coords;
                  const end = hubs[r.to].coords;
                  const midX = (start[0] + end[0]) / 2;
                  const midY = Math.min(start[1], end[1]) - 40;
                  const pathD = `M${start[0]} ${start[1]} Q${midX} ${midY} ${end[0]} ${end[1]}`;

                  return (
                    <g key={`route-${i}`}>
                      <path
                        d={pathD}
                        stroke="#C5A059"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                        fill="none"
                      />
                      <path
                        d={pathD}
                        stroke="#C5A059"
                        strokeWidth="2"
                        className="route-line"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}

                {/* Hub Nodes */}
                {hubs.map((hub, idx) => {
                  const isSelected = selectedHub === idx;
                  return (
                    <g
                      key={hub.name}
                      className="cursor-pointer"
                      onClick={() => setSelectedHub(idx)}
                    >
                      <circle
                        cx={hub.coords[0]}
                        cy={hub.coords[1]}
                        r={isSelected ? 18 : 12}
                        className="route-dot fill-[#C5A059]/25"
                      />
                      <circle
                        cx={hub.coords[0]}
                        cy={hub.coords[1]}
                        r={isSelected ? 8 : 5}
                        className="fill-[#C5A059]"
                      />
                      <circle
                        cx={hub.coords[0]}
                        cy={hub.coords[1]}
                        r={isSelected ? 3 : 2}
                        className="fill-[#161210]"
                      />
                      <text
                        x={hub.coords[0]}
                        y={hub.coords[1] - 14}
                        textAnchor="middle"
                        className={`font-mono text-[9px] font-bold uppercase ${isSelected ? "fill-[#C5A059]" : "fill-[#FAF7F2]/70"
                          }`}
                      >
                        {hub.name.split(" & ")[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Selected Terminal Detailed Dossier */}
          <div className="mt-12 border border-[#C5A059] bg-[#161210] p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col justify-between gap-4 border-b border-[#FAF7F2]/10 pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">
                  [ REGIONAL CORRIDOR DOSSIER ]
                </span>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
                  {hubs[selectedHub].name}
                </h3>
                <span className="font-mono text-xs text-[#FAF7F2]/60">
                  {hubs[selectedHub].region} · {hubs[selectedHub].portAuthority}
                </span>
              </div>
              <div className="font-mono text-xs text-right text-[#FAF7F2]/60 hidden sm:block">
                <div>COORDINATES: {hubs[selectedHub].coordinates}</div>
                <div className="text-[#C5A059] mt-1">{hubs[selectedHub].turnaround}</div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#FAF7F2]/80">
              {hubs[selectedHub].overview}
            </p>

            <div className="mt-8 grid gap-4 border-t border-[#FAF7F2]/10 pt-6 sm:grid-cols-2 font-mono text-xs">
              <div>
                <strong className="block text-[#C5A059] uppercase mb-1">
                  Primary Commodities:
                </strong>
                <p className="text-[#FAF7F2]/70 font-sans">{hubs[selectedHub].primaryFlow}</p>
              </div>
              <div>
                <strong className="block text-[#C5A059] uppercase mb-1">Berth Turnaround:</strong>
                <p className="text-[#FAF7F2]/70 font-sans">{hubs[selectedHub].turnaround}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                to="/request-quote"
                className="inline-flex items-center gap-2 border border-[#C5A059] bg-[#C5A059] px-6 py-3 font-mono text-xs font-bold uppercase text-[#161210] hover:bg-[#FAF7F2] transition-colors"
              >
                <span>ASSESS SHIPMENT ON THIS ROUTE</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Corridor Matrices */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 mx-auto max-w-[1440px]">
        <SectionLabel number="02">TRANSIT MATRICES</SectionLabel>
        <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-[#161210]">
          Standard Ocean Corridors & Estimated Transit
        </h2>

        <div className="mt-12 overflow-x-auto border border-[#D8CEBD] bg-[#FAF7F2]">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-[#D8CEBD] bg-[#EBE3D3] font-mono uppercase text-[#6B625B]">
              <tr>
                <th className="p-4">Origin Port</th>
                <th className="p-4">Destination Port</th>
                <th className="p-4">Ocean Route</th>
                <th className="p-4">Estimated Transit</th>
                <th className="p-4">Service Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8CEBD] text-[#161210]">
              {[
                [
                  "Mundra / Nhava Sheva (IN)",
                  "Jebel Ali (UAE)",
                  "Arabian Gulf Direct",
                  "3–5 Days",
                  "Tri-Weekly Sailings",
                ],
                [
                  "Mundra / Nhava Sheva (IN)",
                  "Rotterdam (NL)",
                  "Via Suez Direct Call",
                  "18–22 Days",
                  "Weekly Ocean Liner",
                ],
                [
                  "Colombo (LK)",
                  "Hamburg (DE)",
                  "Indian Ocean – North Sea",
                  "20–24 Days",
                  "Weekly Scheduled",
                ],
                [
                  "Singapore (SG)",
                  "Rotterdam (NL)",
                  "Strait – Europe Run",
                  "22–26 Days",
                  "Bi-Weekly Sailings",
                ],
                [
                  "Pohang (KR)",
                  "Antwerp (BE)",
                  "Trans-Pacific / Atlantic",
                  "28–34 Days",
                  "Monthly Bulk Charter",
                ],
                [
                  "Jebel Ali (UAE)",
                  "Mombasa (KE)",
                  "East Africa Express",
                  "7–10 Days",
                  "Weekly Container Run",
                ],
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#F4EFE6] transition-colors">
                  <td className="p-4 font-bold">{row[0]}</td>
                  <td className="p-4">{row[1]}</td>
                  <td className="p-4 font-mono text-[#6B625B]">{row[2]}</td>
                  <td className="p-4 font-mono font-bold text-[#9E4E39]">{row[3]}</td>
                  <td className="p-4 text-[#3E4C34] font-medium">{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
