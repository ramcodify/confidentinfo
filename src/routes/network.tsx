import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Globe2,
  HelpCircle,
  Layers,
  MapPin,
  Navigation,
  PackageCheck,
  Radio,
  Scale,
  ShieldCheck,
  Ship,
  Sparkles,
  Truck,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";
import { PageHero, SectionLabel, MarqueeTicker } from "../components/site";
import { useMachineryStore } from "../lib/machinery-store";
import globalPortHero from "../assets/global-port-hero.jpg";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "China–India Supply Network & Logistics Corridors | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "Explore Confident Textiles Machinery's bilateral China-to-India supply corridors. Direct factory sourcing from Shanghai, Wuxi, Ningbo, and Guangzhou to Indian textile mills in Surat, Tirupur, Coimbatore, and Ahmedabad.",
      },
      { property: "og:title", content: "China–India Supply Network | Confident Textiles Machinery" },
      {
        property: "og:description",
        content:
          "Direct shipping routes, port clearance schedules, transit time estimators, and inland logistics corridors connecting Chinese machinery plants with Indian textile mills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NetworkPage,
});

/* =============================================================================
   HUB DATA DEFINITIONS
   ============================================================================= */
interface PortHub {
  id: string;
  name: string;
  country: "China" | "India" | "Global";
  flag: string;
  city: string;
  category: "Origin Port" | "Discharge Port" | "Transshipment Waypoint";
  coords: [number, number]; // [SVG X, SVG Y] in 960x480 coordinate space
  lat: string;
  lon: string;
  terminal: string;
  transitTime: string;
  machineryFocus: string;
  inlandCorridor: string;
  handledTonnage: string;
  weeklySailings: string;
  description: string;
}

const PORT_HUBS: PortHub[] = [
  {
    id: "hub-shanghai",
    name: "Shanghai & Wuxi Machinery Port",
    country: "China",
    flag: "🇨🇳",
    city: "Shanghai / Wuxi",
    category: "Origin Port",
    coords: [710, 175],
    lat: "31.23° N",
    lon: "121.47° E",
    terminal: "Yangshan Deepwater Port (Berths 4–7)",
    transitTime: "14 – 16 Ocean Transit Days",
    machineryFocus: "Air Jet Looms, High-Draft Ring Frames, Electronic Dobbies",
    inlandCorridor: "Direct highway link to Wuxi and Changzhou machinery plants",
    handledTonnage: "18,500+ MT Industrial Textile Equipment / Year",
    weeklySailings: "4 Direct Container Vessels / Week",
    description:
      "China's premier industrial export terminal. Primary departure gate for heavy air jet weaving looms and spinning frame lines destined for western and southern Indian ports.",
  },
  {
    id: "hub-ningbo",
    name: "Ningbo-Zhoushan Deepwater Port",
    country: "China",
    flag: "🇨🇳",
    city: "Ningbo",
    category: "Origin Port",
    coords: [725, 192],
    lat: "29.86° N",
    lon: "121.54° E",
    terminal: "Beilun Container Terminal (Berths 1–4)",
    transitTime: "14 – 17 Ocean Transit Days",
    machineryFocus: "Carding Engines, Rapier Weaving Looms, Open-Width Washers",
    inlandCorridor: "Rail and highway access across Zhejiang engineering belt",
    handledTonnage: "14,200+ MT Machinery / Year",
    weeklySailings: "3 Direct Container Vessels / Week",
    description:
      "Specialized deepwater harbor with heavy-lift gantry cranes capable of loading 65-ton unibody textile machine frames into flat rack and 40ft High Cube containers.",
  },
  {
    id: "hub-guangzhou",
    name: "Guangzhou Nansha Port",
    country: "China",
    flag: "🇨🇳",
    city: "Guangzhou / Foshan",
    category: "Origin Port",
    coords: [682, 222],
    lat: "23.12° N",
    lon: "113.26° E",
    terminal: "Nansha Port Phase III Container Terminal",
    transitTime: "12 – 15 Ocean Transit Days",
    machineryFocus: "Circular Knitting Machines, HTHP Dyeing Vessels, Stenter Frames",
    inlandCorridor: "Guangdong Pearl River Delta manufacturing artery",
    handledTonnage: "12,800+ MT Machinery / Year",
    weeklySailings: "3 Express Sailings / Week",
    description:
      "The primary origin port for knitting and dyeing equipment. Offers the shortest ocean transit time to Chennai and Tuticorin for south Indian garment and hosiery manufacturers.",
  },
  {
    id: "hub-qingdao",
    name: "Qingdao Machinery Terminal",
    country: "China",
    flag: "🇨🇳",
    city: "Qingdao",
    category: "Origin Port",
    coords: [698, 145],
    lat: "36.06° N",
    lon: "120.38° E",
    terminal: "Qingdao Qianwan Container Terminal",
    transitTime: "16 – 19 Ocean Transit Days",
    machineryFocus: "Water Jet Looms, Nonwoven Needle Punching, Blowroom Machinery",
    inlandCorridor: "Shandong textile machinery manufacturing corridor",
    handledTonnage: "9,600+ MT Machinery / Year",
    weeklySailings: "2 Direct Sailings / Week",
    description:
      "Northern origin hub serving heavy fabric processing and nonwoven machinery manufacturers across Shandong province with direct routes to Nhava Sheva and Mundra.",
  },
  {
    id: "hub-nhava-sheva",
    name: "Nhava Sheva (JNPT) Port",
    country: "India",
    flag: "🇮🇳",
    city: "Mumbai / Navi Mumbai",
    category: "Discharge Port",
    coords: [568, 238],
    lat: "18.94° N",
    lon: "72.94° E",
    terminal: "BMCT & APM Terminals Mumbai (JNPT)",
    transitTime: "24 – 36h Customs Discharge Gate-Out",
    machineryFocus: "Discharge for Surat Weaving, Bhiwandi, Ichalkaranji & Solapur",
    inlandCorridor: "Direct expressway to Surat (5h) and Pune-Kolhapur (8h)",
    handledTonnage: "22,000+ MT Clearance / Year",
    weeklySailings: "5 Vessel Calls / Week from China",
    description:
      "India's largest container port handling over 55% of all imported Chinese weaving and texturizing machinery for the western India textile industrial corridor.",
  },
  {
    id: "hub-mundra",
    name: "Mundra International Port",
    country: "India",
    flag: "🇮🇳",
    city: "Mundra, Gujarat",
    category: "Discharge Port",
    coords: [545, 212],
    lat: "22.84° N",
    lon: "69.70° E",
    terminal: "Adani Mundra Container Terminal (MICT)",
    transitTime: "24 – 48h Customs Discharge Gate-Out",
    machineryFocus: "Discharge for Ahmedabad Denim, Bhilwara Suiting & Ludhiana",
    inlandCorridor: "Western Dedicated Freight Corridor (WDFC) & National Highway 8A",
    handledTonnage: "19,500+ MT Clearance / Year",
    weeklySailings: "4 Direct Vessel Calls / Week",
    description:
      "Deep-draft private port with high-speed rail evacuation to Inland Container Depots (ICDs) across Rajasthan, Haryana, and Punjab for spinning and denim machinery.",
  },
  {
    id: "hub-chennai",
    name: "Chennai Port Container Terminal",
    country: "India",
    flag: "🇮🇳",
    city: "Chennai, Tamil Nadu",
    category: "Discharge Port",
    coords: [598, 268],
    lat: "13.08° N",
    lon: "80.29° E",
    terminal: "DP World & PSA Chennai Container Terminals",
    transitTime: "24 – 36h Customs Discharge Gate-Out",
    machineryFocus: "Discharge for Coimbatore Spinning, Tirupur Knitwear & Karur",
    inlandCorridor: "NH544 4-lane freight corridor directly to Tirupur & Coimbatore",
    handledTonnage: "16,800+ MT Clearance / Year",
    weeklySailings: "4 Direct Liner Calls / Week",
    description:
      "Eastern gateway for circular knitting machines and high-draft spinning equipment destined for Tamil Nadu's $15B garment manufacturing and export clusters.",
  },
  {
    id: "hub-tuticorin",
    name: "V.O. Chidambaranar Port (Tuticorin)",
    country: "India",
    flag: "🇮🇳",
    city: "Tuticorin, Tamil Nadu",
    category: "Discharge Port",
    coords: [588, 298],
    lat: "8.76° N",
    lon: "78.13° E",
    terminal: "Dakshin Bharat Gateway Terminal (DBGT)",
    transitTime: "24 – 48h Customs Discharge Gate-Out",
    machineryFocus: "Discharge for Madurai, Rajapalayam, Kovilpatti & Tirunelveli Mills",
    inlandCorridor: "NH38 / NH44 southern Tamil Nadu industrial corridor",
    handledTonnage: "8,400+ MT Clearance / Year",
    weeklySailings: "2 Feeder / Direct Calls / Week",
    description:
      "Deepwater southern port offering rapid road dispatch to southern spinning mills, avoiding Chennai city transit restrictions for oversized open-top trailers.",
  },
  {
    id: "hub-singapore",
    name: "Singapore Strait Waypoint",
    country: "Global",
    flag: "🌐",
    city: "Singapore",
    category: "Transshipment Waypoint",
    coords: [670, 288],
    lat: "1.35° N",
    lon: "103.81° E",
    terminal: "Port of Singapore Authority (PSA)",
    transitTime: "Mid-Voyage Bunkering & AIS Tracking",
    machineryFocus: "Marine vessel AIS monitoring and weather re-routing",
    inlandCorridor: "Strategic Malacca Strait transit choke-point",
    handledTonnage: "Global Transshipment Hub",
    weeklySailings: "Continuous Daily Passages",
    description:
      "Key navigational checkpoint where Confident logistics officers monitor vessel speed, container reefer/humidity telemetry, and maritime liner transit schedules.",
  },
  {
    id: "hub-colombo",
    name: "Colombo Deepwater Transshipment Hub",
    country: "Global",
    flag: "🌐",
    city: "Colombo",
    category: "Transshipment Waypoint",
    coords: [594, 305],
    lat: "6.92° N",
    lon: "79.86° E",
    terminal: "Colombo South Container Terminal (CICT)",
    transitTime: "24 – 48h Feeder Transshipment",
    machineryFocus: "Direct feeder connection to Chennai and Tuticorin",
    inlandCorridor: "Indian Ocean deepwater feeder connection",
    handledTonnage: "Regional Transshipment Gateway",
    weeklySailings: "Daily Feeder Shuttle to South India",
    description:
      "Strategic transshipment facility allowing mainline 18,000-TEU container ships from China to transfer flat rack machinery cargo onto regional shuttles entering Indian waters.",
  },
];

/* Maritime Shipping Routes connecting Hubs */
const SHIPPING_ROUTES = [
  { from: 0, to: 8, label: "Shanghai ➔ Singapore (6d)" },
  { from: 1, to: 8, label: "Ningbo ➔ Singapore (6d)" },
  { from: 2, to: 8, label: "Guangzhou ➔ Singapore (4d)" },
  { from: 3, to: 8, label: "Qingdao ➔ Singapore (8d)" },
  { from: 8, to: 9, label: "Singapore ➔ Colombo (4d)" },
  { from: 8, to: 6, label: "Singapore ➔ Chennai (5d direct)" },
  { from: 9, to: 4, label: "Colombo ➔ Nhava Sheva (3d)" },
  { from: 9, to: 5, label: "Colombo ➔ Mundra (4d)" },
  { from: 9, to: 7, label: "Colombo ➔ Tuticorin (1d feeder)" },
  { from: 4, to: 5, label: "Nhava Sheva ➔ Mundra (Coastal link)" },
];

/* Bilateral Shipping Matrix Data */
const SHIPPING_MATRIX = [
  {
    route: "Shanghai ➔ Nhava Sheva (JNPT)",
    carriers: "COSCO Shipping · Maersk Line · MSC",
    transit: "14 – 16 Days",
    frequency: "5 Sailings / Week",
    cargo: "Air Jet Looms, Rapier Weaving, Ring Spinning Frames",
    customsGate: "JNPT BMCT · 24-36h Direct Port Delivery (DPD)",
    primaryDest: "Surat, Bhiwandi, Ichalkaranji, Solapur",
  },
  {
    route: "Ningbo ➔ Mundra Port",
    carriers: "Evergreen Marine · ONE Line · COSCO",
    transit: "15 – 17 Days",
    frequency: "4 Sailings / Week",
    cargo: "Carding Machines, Open-Width Washers, Calenders",
    customsGate: "Adani MICT · Direct Rail ICD Linkage",
    primaryDest: "Ahmedabad, Bhilwara, Ludhiana, Panipat",
  },
  {
    route: "Guangzhou (Nansha) ➔ Chennai",
    carriers: "Wan Hai Lines · COSCO · Maersk",
    transit: "12 – 14 Days",
    frequency: "4 Sailings / Week",
    cargo: "Circular Knitting, HTHP Dyeing, Stenter Frames",
    customsGate: "DP World Chennai · 24h Green Channel Clearance",
    primaryDest: "Tirupur, Coimbatore, Erode, Karur, Salem",
  },
  {
    route: "Qingdao ➔ Nhava Sheva (JNPT)",
    carriers: "MSC Mediterranean · CMA CGM · COSCO",
    transit: "16 – 19 Days",
    frequency: "3 Sailings / Week",
    cargo: "Water Jet Looms, Nonwoven Lines, Finishing Calenders",
    customsGate: "JNPT APMT · Automated Electronic Clearance",
    primaryDest: "Surat, Ahmedabad, Tarapur, Silvassa",
  },
  {
    route: "Guangzhou ➔ Tuticorin (VOC Port)",
    carriers: "Feeder via Colombo · Direct Coastal Line",
    transit: "14 – 16 Days",
    frequency: "2 Sailings / Week",
    cargo: "Ring Spinning Retrofits, Circular Knitwear Machinery",
    customsGate: "VOC Port DBGT · Direct Road Dispatch",
    primaryDest: "Madurai, Rajapalayam, Kovilpatti, Nagercoil",
  },
];

/* Calculator Cities & Parameters */
const ORIGIN_PORTS = [
  { id: "shanghai", name: "Shanghai / Wuxi Port", daysToSea: 14, defaultHub: "Nhava Sheva" },
  { id: "ningbo", name: "Ningbo-Zhoushan Port", daysToSea: 15, defaultHub: "Mundra" },
  { id: "guangzhou", name: "Guangzhou Nansha Port", daysToSea: 12, defaultHub: "Chennai" },
  { id: "qingdao", name: "Qingdao Machinery Port", daysToSea: 17, defaultHub: "Nhava Sheva" },
];

const DESTINATION_MILL_CLUSTERS = [
  {
    id: "surat",
    name: "Surat & Navsari (Gujarat)",
    sector: "Synthetic Weaving & Jacquard",
    port: "Nhava Sheva (JNPT)",
    roadHours: "5 Hours (280 km via NH48)",
    customsDays: 2,
    trailerDays: 1,
  },
  {
    id: "tirupur",
    name: "Tirupur & Erode (Tamil Nadu)",
    sector: "Cotton Knitwear & Dyeing",
    port: "Chennai Port / Tuticorin",
    roadHours: "8 Hours (420 km via NH544)",
    customsDays: 2,
    trailerDays: 1,
  },
  {
    id: "coimbatore",
    name: "Coimbatore (Tamil Nadu)",
    sector: "Ring Spinning & Technical Textiles",
    port: "Chennai Port / Cochin",
    roadHours: "9 Hours (490 km via NH544)",
    customsDays: 2,
    trailerDays: 1,
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad & Kadi (Gujarat)",
    sector: "Denim, Cotton Spinning & Processing",
    port: "Mundra Port",
    roadHours: "6 Hours (350 km via NH8A)",
    customsDays: 2,
    trailerDays: 1,
  },
  {
    id: "ludhiana",
    name: "Ludhiana & Amritsar (Punjab)",
    sector: "Woolen, Acrylic & Circular Knitting",
    port: "Mundra Port (via ICD)",
    roadHours: "24 Hours (Rail WDFC to Sahnewal ICD)",
    customsDays: 2,
    trailerDays: 2,
  },
  {
    id: "ichalkaranji",
    name: "Ichalkaranji & Kolhapur (Maharashtra)",
    sector: "Powerloom & Shuttleless Weaving",
    port: "Nhava Sheva (JNPT)",
    roadHours: "8 Hours (390 km via NH48)",
    customsDays: 2,
    trailerDays: 1,
  },
  {
    id: "bhilwara",
    name: "Bhilwara (Rajasthan)",
    sector: "PV Suiting & Polyester Weaving",
    port: "Mundra Port",
    roadHours: "12 Hours (620 km via NH27)",
    customsDays: 2,
    trailerDays: 2,
  },
];

/* =============================================================================
   MAIN NETWORK PAGE COMPONENT
   ============================================================================= */
function NetworkPage() {
  const [activeHubIdx, setActiveHubIdx] = useState<number>(0);
  const [filterCountry, setFilterCountry] = useState<"All" | "China" | "India">("All");

  // Interactive Route Estimator State
  const [calcOrigin, setCalcOrigin] = useState<string>("shanghai");
  const [calcDest, setCalcDest] = useState<string>("surat");
  const [calcMachineType, setCalcMachineType] = useState<string>("Weaving (Air Jet Loom)");

  const selectedOrigin = (ORIGIN_PORTS.find((o) => o.id === calcOrigin) ?? ORIGIN_PORTS[0])!;
  const selectedDest =
    (DESTINATION_MILL_CLUSTERS.find((d) => d.id === calcDest) ?? DESTINATION_MILL_CLUSTERS[0])!;

  const totalEstimatedDays =
    selectedOrigin.daysToSea + selectedDest.customsDays + selectedDest.trailerDays;

  const filteredHubs =
    filterCountry === "All"
      ? PORT_HUBS
      : PORT_HUBS.filter((h) => h.country === filterCountry);

  const activeHub = PORT_HUBS[activeHubIdx] || PORT_HUBS[0];

  return (
    <div className="bg-[#FAF7F2] text-[#161210]">
      {/* 1. EDITORIAL PAGE HERO */}
      <PageHero
        eyebrow="CHINA TO INDIA TEXTILE MACHINERY LOGISTICS DESK"
        categoryNumber="NETWORK"
        title="CHINA–INDIA MARITIME SUPPLY CORRIDORS."
        copy="Architecting a high-precision maritime and inland logistics corridor. Sourcing textile machinery directly from factory basins in Shanghai, Wuxi, Guangzhou, and Ningbo with chartered ocean transit to India's major manufacturing hubs."
        image={globalPortHero}
      />

      {/* 2. REAL-TIME CORRIDOR TELEMETRY METRICS STRIP */}
      <section className="border-b border-[#C5A059]/30 bg-[#161210] py-6 sm:py-8 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                ACTIVE OCEAN LANES
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                10 Corridors
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                China Coastal Ports ➔ Indian Gateways
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                TRANSIT TIME
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF7F2]">
                12 – 16 Days
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Direct Container Liner Service
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                CUSTOMS &amp; EPCG CLEARANCE
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-400">
                24 – 48 Hours
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Direct Port Delivery (DPD) Expedited
              </span>
            </div>

            <div className="rounded-xl border border-[#C5A059]/20 bg-[#1E1916]/80 p-3.5 sm:p-5 backdrop-blur-md space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#C5A059] font-bold block uppercase tracking-wider">
                INLAND TRAILER REACH
              </span>
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#DFBA6F]">
                100% Mill Gate
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#FAF7F2]/60 font-mono block">
                Low-Bed Hydraulic Transport across India
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MARQUEE TICKER */}
      <MarqueeTicker />

      {/* 4. INTERACTIVE WORLD & BILATERAL TRADE MAP */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#161210] text-[#FAF7F2] border-b border-[#C5A059]/25">
        <div className="mx-auto max-w-[1440px] space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#FAF7F2]/10 pb-6">
            <div>
              <SectionLabel dark number="01">CARTOGRAPHIC SCHEMATIC</SectionLabel>
              <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2]">
                Interactive Trade Corridors & Active Ports
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#FAF7F2]/75 max-w-2xl font-sans leading-relaxed">
                Click or hover over any port node to inspect berthing terminals, handled machinery categories, weekly vessel frequencies, and direct road links to Indian textile mills.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#FAF7F2]/70">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Maritime Lane
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#C5A059]" />
                Machinery Port Node
              </span>
            </div>
          </div>

          {/* SVG Tactical Map Canvas */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-[#C5A059]/35 bg-[#120F0D] p-4 sm:p-8 shadow-2xl">
            {/* Ambient Lighting Gradients */}
            <div
              className="absolute top-1/4 left-1/4 size-[400px] pointer-events-none rounded-full"
              style={{
                background: "radial-gradient(circle at center, rgba(197,160,89,0.12) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 size-[400px] pointer-events-none rounded-full"
              style={{
                background: "radial-gradient(circle at center, rgba(158,78,57,0.14) 0%, transparent 70%)",
              }}
            />

            <div className="relative aspect-[16/9] w-full max-h-[560px]">
              <svg
                viewBox="0 0 960 480"
                className="size-full select-none"
                fill="none"
                aria-label="China to India Textile Machinery Shipping Map"
              >
                {/* Tactical Coordinate Grid Lines */}
                {[80, 160, 240, 320, 400].map((y) => (
                  <line
                    key={`lat-${y}`}
                    x1="0"
                    y1={y}
                    x2="960"
                    y2={y}
                    stroke="#C5A059"
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                    opacity="0.12"
                  />
                ))}
                {[160, 320, 480, 640, 800].map((x) => (
                  <line
                    key={`lon-${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="480"
                    stroke="#C5A059"
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                    opacity="0.12"
                  />
                ))}

                {/* Styled Geographical Outlines */}
                {/* Eurasian Continental Landmass */}
                <path
                  d="M420 40 L560 35 L680 40 L840 45 L910 90 L880 160 L830 210 L760 250 L710 240 L660 210 L610 180 L560 170 L510 140 L450 110 Z"
                  fill="#1C1613"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />

                {/* Indian Subcontinent Geographic Silhouette */}
                <path
                  d="M520 170 L630 175 L625 250 L605 295 L580 330 L555 270 L525 220 Z"
                  fill="#241C18"
                  stroke="#C5A059"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                />

                {/* Southeast Asia & Indochina */}
                <path
                  d="M660 210 L720 220 L730 280 L695 310 L665 260 Z"
                  fill="#1C1613"
                  stroke="#C5A059"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />

                {/* Indonesia & Maritime Archipelago */}
                <path
                  d="M650 330 L760 340 L800 370 L720 380 Z"
                  fill="#1C1613"
                  stroke="#C5A059"
                  strokeWidth="0.6"
                  strokeOpacity="0.25"
                />

                {/* Shipping Route Curved Beams */}
                {SHIPPING_ROUTES.map((route, idx) => {
                  const start = PORT_HUBS[route.from]?.coords;
                  const end = PORT_HUBS[route.to]?.coords;
                  if (!start || !end) return null;
                  const midX = (start[0] + end[0]) / 2;
                  const midY = Math.min(start[1], end[1]) - 35;
                  const pathData = `M${start[0]} ${start[1]} Q${midX} ${midY} ${end[0]} ${end[1]}`;

                  return (
                    <g key={`route-${idx}`}>
                      <path
                        d={pathData}
                        stroke="#C5A059"
                        strokeWidth="1.2"
                        strokeOpacity="0.3"
                        fill="none"
                      />
                      <path
                        d={pathData}
                        stroke="#DFBA6F"
                        strokeWidth="2.2"
                        className="route-line"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}

                {/* Port Markers & Tactical Radar Rings */}
                {PORT_HUBS.map((hub, idx) => {
                  const isSelected = activeHubIdx === idx;
                  return (
                    <g
                      key={hub.id}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActiveHubIdx(idx)}
                      onMouseEnter={() => setActiveHubIdx(idx)}
                    >
                      {/* Outer pulse */}
                      <circle
                        cx={hub.coords[0]}
                        cy={hub.coords[1]}
                        r={isSelected ? 18 : 10}
                        className={`route-dot ${
                          isSelected ? "fill-[#DFBA6F]/30" : "fill-[#C5A059]/15"
                        }`}
                      />
                      {/* Core circle */}
                      <circle
                        cx={hub.coords[0]}
                        cy={hub.coords[1]}
                        r={isSelected ? 7 : 4.5}
                        className={isSelected ? "fill-[#DFBA6F]" : "fill-[#C5A059]"}
                      />
                      <circle
                        cx={hub.coords[0]}
                        cy={hub.coords[1]}
                        r={isSelected ? 2.5 : 1.5}
                        className="fill-[#161210]"
                      />

                      {/* Port Name Label */}
                      <text
                        x={hub.coords[0]}
                        y={hub.coords[1] - 12}
                        textAnchor="middle"
                        className={`font-mono text-[8.5px] sm:text-[9.5px] font-bold uppercase transition-all duration-300 ${
                          isSelected
                            ? "fill-[#DFBA6F] font-extrabold text-[10px]"
                            : "fill-[#FAF7F2]/80"
                        }`}
                        letterSpacing="0.08em"
                      >
                        {hub.city.split("/")[0]?.trim() || hub.city}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Floating Active Port Dossier Card: below map on mobile, floating on desktop */}
            {activeHub && (
              <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-24 sm:left-8 sm:max-w-md rounded-2xl border-2 border-[#C5A059] bg-[#161210]/95 backdrop-blur-2xl p-4 sm:p-5 text-[#FAF7F2] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between border-b border-[#FAF7F2]/15 pb-2.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#DFBA6F] tracking-[0.2em] uppercase flex items-center gap-2">
                    <span>{activeHub.flag}</span>
                    <span>[ {activeHub.category} ]</span>
                  </span>
                  <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase">
                    {activeHub.lat} · {activeHub.lon}
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-lg sm:text-xl font-bold text-[#FAF7F2]">
                  {activeHub.name}
                </h3>

                <div className="mt-2.5 space-y-1.5 text-xs">
                  <div className="text-[#FAF7F2]/80 font-sans leading-snug">
                    <strong className="text-[#C5A059] font-mono text-[9.5px] block uppercase">
                      Terminal & Handling:
                    </strong>
                    {activeHub.terminal} ({activeHub.weeklySailings})
                  </div>
                  <div className="text-[#FAF7F2]/80 font-sans leading-snug">
                    <strong className="text-[#C5A059] font-mono text-[9.5px] block uppercase">
                      Primary Machinery Focus:
                    </strong>
                    {activeHub.machineryFocus}
                  </div>
                  <div className="rounded-lg bg-[#1E1916] p-2 border border-white/5 font-mono text-[10.5px] text-[#DFBA6F] mt-2">
                    <span>Transit: {activeHub.transitTime}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Port Selector Tabs for Touch Screens */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="font-mono text-[9.5px] text-[#C5A059] uppercase tracking-wider block mb-2 font-bold">
                SELECT PORT FOR OPERATIONAL DOSSIER:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10.5px]">
                {PORT_HUBS.map((hub, idx) => (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHubIdx(idx)}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                      activeHubIdx === idx
                        ? "bg-[#C5A059] text-[#161210] border-[#C5A059] font-bold shadow-xs"
                        : "bg-[#1E1916] text-[#FAF7F2]/80 border-[#C5A059]/20 hover:border-[#C5A059]"
                    }`}
                  >
                    {hub.flag} {hub.city.split("/")[0]?.trim() || hub.city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BILATERAL SHIPPING SCHEDULE & TRANSIT TIMES MATRIX */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2] border-b border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px] space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D8CEBD] pb-6">
            <div>
              <SectionLabel number="02">MARITIME MATRIX</SectionLabel>
              <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161210]">
                Bilateral Liner Schedules & Transit Times
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#6B625B] max-w-2xl font-sans leading-relaxed">
                Direct container line allocations contracted with Tier-1 ocean carriers. All transit times represent direct ocean voyages excluding domestic inland trailer transit.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#161210] px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#9E4E39] transition shadow-md w-auto self-start md:self-auto"
            >
              <span>Book Vessel Slot</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Responsive Shipping Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#D8CEBD] bg-white shadow-sm">
            <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#D8CEBD] bg-[#FAF7F2] font-mono text-[10.5px] uppercase tracking-wider text-[#161210]">
                  <th className="py-3.5 px-4 font-bold">Corridor Lane</th>
                  <th className="py-3.5 px-4 font-bold">Liner Carriers</th>
                  <th className="py-3.5 px-4 font-bold">Ocean Transit</th>
                  <th className="py-3.5 px-4 font-bold">Sailings / Wk</th>
                  <th className="py-3.5 px-4 font-bold">Customs Gate-Out</th>
                  <th className="py-3.5 px-4 font-bold">Major Mill Destinations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8CEBD]/60">
                {SHIPPING_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#161210] whitespace-nowrap">
                      {row.route}
                    </td>
                    <td className="py-4 px-4 text-[#6B625B] font-mono text-xs">
                      {row.carriers}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {row.transit}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#161210] font-mono text-xs whitespace-nowrap">
                      {row.frequency}
                    </td>
                    <td className="py-4 px-4 text-[#6B625B] text-xs">
                      {row.customsGate}
                    </td>
                    <td className="py-4 px-4 text-[#9E4E39] font-medium text-xs">
                      {row.primaryDest}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TRANSIT TIME & FREIGHT CALCULATOR */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4EFE6] border-b border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px] space-y-8">
          <div>
            <SectionLabel number="03">TRANSIT TIME ESTIMATOR</SectionLabel>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161210]">
              Factory-to-Factory Timeline Calculator
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B625B] max-w-2xl font-sans leading-relaxed">
              Calculate the total estimated duration from ex-factory handover in China through ocean voyage, Indian customs clearance, and direct low-bed trailer delivery to your mill gates.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
            {/* Input Controls */}
            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 sm:p-8 shadow-md space-y-5">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#9E4E39] block">
                [ ROUTE PARAMETERS ]
              </span>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#524942] uppercase tracking-wider block mb-1.5">
                    1. Select China Origin Port / Basin:
                  </label>
                  <select
                    value={calcOrigin}
                    onChange={(e) => setCalcOrigin(e.target.value)}
                    className="w-full rounded-xl border border-[#D8CEBD] bg-[#FAF7F2] p-3 text-sm text-[#161210] font-sans outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    {ORIGIN_PORTS.map((o) => (
                      <option key={o.id} value={o.id}>
                        🇨🇳 {o.name} (~{o.daysToSea} Ocean Days)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#524942] uppercase tracking-wider block mb-1.5">
                    2. Select Indian Textile Mill Destination:
                  </label>
                  <select
                    value={calcDest}
                    onChange={(e) => setCalcDest(e.target.value)}
                    className="w-full rounded-xl border border-[#D8CEBD] bg-[#FAF7F2] p-3 text-sm text-[#161210] font-sans outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    {DESTINATION_MILL_CLUSTERS.map((d) => (
                      <option key={d.id} value={d.id}>
                        🇮🇳 {d.name} · {d.sector}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#524942] uppercase tracking-wider block mb-1.5">
                    3. Machinery Category:
                  </label>
                  <select
                    value={calcMachineType}
                    onChange={(e) => setCalcMachineType(e.target.value)}
                    className="w-full rounded-xl border border-[#D8CEBD] bg-[#FAF7F2] p-3 text-sm text-[#161210] font-sans outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    <option>Weaving (Air Jet / Rapier Loom)</option>
                    <option>Spinning (Ring Frame / Carding Engine)</option>
                    <option>Knitting (Circular / Flat Knitting)</option>
                    <option>Dyeing & Finishing (Stenter / HTHP Vessel)</option>
                    <option>Complete Turnkey Production Line</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculated Results Dossier Card */}
            <div className="rounded-2xl border-2 border-[#C5A059] bg-[#161210] p-6 sm:p-8 text-[#FAF7F2] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#FAF7F2]/15 pb-4">
                <span className="font-mono text-xs font-bold tracking-wider text-[#C5A059] uppercase flex items-center gap-2">
                  <Calculator size={16} />
                  [ TIMELINE ESTIMATION BREAKDOWN ]
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  TOTAL: ~{totalEstimatedDays} DAYS
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[#FAF7F2]/70">Ocean Voyage ({selectedOrigin.name}):</span>
                  <span className="text-[#DFBA6F] font-bold">~{selectedOrigin.daysToSea} Days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[#FAF7F2]/70">Customs Clearance ({selectedDest.port}):</span>
                  <span className="text-emerald-400 font-bold">~{selectedDest.customsDays} Days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-[#FAF7F2]/70">Inland Low-Bed Trailer ({selectedDest.roadHours}):</span>
                  <span className="text-[#DFBA6F] font-bold">~{selectedDest.trailerDays} Days</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#FAF7F2]/70">Recommended Discharge Port:</span>
                  <span className="text-white font-bold">{selectedDest.port}</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#1E1916] p-3.5 border border-[#C5A059]/30 text-xs text-[#FAF7F2]/80 space-y-1 font-sans">
                <strong className="text-[#C5A059] block font-mono text-[10.5px] uppercase">
                  Logistics Assurance:
                </strong>
                <span>
                  Includes Volatile Corrosion Inhibitor (VCI) maritime barrier crating, 14 free demurrage days at {selectedDest.port}, and full EPCG 0% duty documentation.
                </span>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] py-2.5 sm:py-3.5 px-5 sm:px-7 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition shadow-md"
                >
                  <span>Request Formal Delivery Quotation</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PORT INFRASTRUCTURE & CRATING STANDARDS */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2] border-b border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px] space-y-10">
          <div>
            <SectionLabel number="04">PROTECTION & INFRASTRUCTURE</SectionLabel>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161210]">
              Heavy Cargo Handling & Anti-Corrosion Protocols
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B625B] max-w-2xl font-sans leading-relaxed">
              Industrial textile machines feature high-precision electronic servos, optical sensors, and cast-iron frame rails that require rigorous maritime protection during equatorial crossings.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 space-y-3 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#9E4E39]">
                <PackageCheck size={20} />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#161210]">VCI Moisture Barrier</h4>
              <p className="text-xs text-[#6B625B] leading-relaxed">
                All bare metallic shafts, looms, and motor mounts are vacuum-sealed in Volatile Corrosion Inhibitor (VCI) films with industrial desiccants.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 space-y-3 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#9E4E39]">
                <Warehouse size={20} />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#161210]">ISPM-15 Timber Crating</h4>
              <p className="text-xs text-[#6B625B] leading-relaxed">
                Heat-treated heavy timber frameworks built to withstand multi-axis acceleration, rough sea states, and crane hoist tension.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 space-y-3 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#9E4E39]">
                <Ship size={20} />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#161210]">Flat Rack & 40ft HC</h4>
              <p className="text-xs text-[#6B625B] leading-relaxed">
                Dedicated container selection matching machine dimensions, preventing out-of-gauge (OOG) shipping penalties or accidental impact.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 space-y-3 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#F4EFE6] text-[#9E4E39]">
                <Clock size={20} />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#161210]">Free Demurrage Period</h4>
              <p className="text-xs text-[#6B625B] leading-relaxed">
                Pre-negotiated 14 to 21 free demurrage and detention days at Indian ports, protecting your mill from unexpected port holding charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INDIAN CUSTOMS & EPCG 0% DUTY FACILITATION */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#161210] text-[#FAF7F2] border-b border-[#C5A059]/25">
        <div className="mx-auto max-w-[1440px] space-y-10">
          <div>
            <SectionLabel dark number="05">REGULATORY COMPLIANCE</SectionLabel>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              Indian Customs & EPCG 0% Duty Facilitation
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#FAF7F2]/75 max-w-2xl font-sans leading-relaxed">
              We eliminate tariff ambiguities by aligning import paperwork with Indian foreign trade policy, the Export Promotion Capital Goods (EPCG) scheme, and ICEGATE digital clearance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 sm:p-8 space-y-3">
              <span className="font-mono text-xs text-[#DFBA6F] font-bold block">
                01 · EPCG 0% CUSTOMS DUTY
              </span>
              <h4 className="font-serif text-xl font-bold text-[#FAF7F2]">
                Zero-Duty Capital Goods
              </h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed font-sans">
                Under the Government of India's EPCG scheme, qualifying textile mills can import modern spinning, weaving, and knitting machinery at 0% basic customs duty against export obligations.
              </p>
            </div>

            <div className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 sm:p-8 space-y-3">
              <span className="font-mono text-xs text-[#DFBA6F] font-bold block">
                02 · HARMONIZED SYSTEM CODES
              </span>
              <h4 className="font-serif text-xl font-bold text-[#FAF7F2]">
                Accurate HS Classification
              </h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed font-sans">
                Expert filing under HS Codes 8445 (Spinning), 8446 (Weaving looms), 8447 (Knitting machines), and 8448 (Auxiliary parts), preventing costly customs misclassification penalties.
              </p>
            </div>

            <div className="rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-6 sm:p-8 space-y-3">
              <span className="font-mono text-xs text-[#DFBA6F] font-bold block">
                03 · ICEGATE PORT REGISTRATION
              </span>
              <h4 className="font-serif text-xl font-bold text-[#FAF7F2]">
                Direct Port Delivery (DPD)
              </h4>
              <p className="text-xs text-[#FAF7F2]/70 leading-relaxed font-sans">
                Pre-arrival electronic filing on the ICEGATE portal enables direct gate-out within 24–36 hours of vessel discharge, bypassing off-dock container freight station (CFS) delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INLAND HIGHWAY CORRIDORS & MILL GATE FLEET */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF7F2] border-b border-[#D8CEBD]">
        <div className="mx-auto max-w-[1440px] space-y-10">
          <div>
            <SectionLabel number="06">INLAND TRANSPORT</SectionLabel>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161210]">
              Direct Road Dispatch to Indian Mill Gates
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#6B625B] max-w-2xl font-sans leading-relaxed">
              We do not stop at port discharge. Confident manages the final overland leg with specialized multi-axle low-bed hydraulic trailers delivering directly inside your factory compound.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9E4E39] font-bold">
                <Truck size={16} />
                <span>WESTERN CORRIDOR</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#161210]">
                JNPT ➔ Surat, Ichalkaranji & Ahmedabad
              </h4>
              <p className="text-xs text-[#6B625B] leading-relaxed">
                Dedicated 40ft low-bed trailers departing daily via NH48 and Mumbai-Ahmedabad expressway. Direct factory offloading in Surat, Bhiwandi, and Kolhapur within 6 to 12 hours.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9E4E39] font-bold">
                <Truck size={16} />
                <span>SOUTHERN CORRIDOR</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#161210]">
                Chennai / Tuticorin ➔ Tirupur & Coimbatore
              </h4>
              <p className="text-xs text-[#6B625B] leading-relaxed">
                High-frequency freight movement via NH544 serving spinning, knitting, and dyeing units across Tirupur, Coimbatore, Erode, and Karur within 12 to 16 hours of port clearance.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9E4E39] font-bold">
                <Truck size={16} />
                <span>NORTHERN CORRIDOR</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#161210]">
                Mundra ➔ Bhilwara, Panipat & Ludhiana
              </h4>
              <p className="text-xs text-[#6B625B] leading-relaxed">
                Combined rail freight and multi-axle trailers via the Western Dedicated Freight Corridor (WDFC) delivering heavy spinning frames and looms to northern industrial centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. STRATEGIC NETWORK FAQ */}
      <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F4EFE6] border-b border-[#D8CEBD]">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-3">
            <SectionLabel number="07">COMMERCIAL INTELLIGENCE</SectionLabel>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#161210]">
              Frequently Asked Logistics Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#6B625B] max-w-xl mx-auto font-sans leading-relaxed">
              Clear answers regarding shipping security, customs protocols, and delivery guarantees.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-5 sm:p-6 space-y-2 shadow-sm">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#161210]">
                How are sensitive machine electronic controllers protected during ocean transit?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B625B] leading-relaxed font-sans">
                All electrical panels, touch-screen PLCs, and servo drives are removed from vibration mounts, packed in anti-static humidity barrier foil with silica gel desiccants, and securely crated inside the container to prevent any condensation damage.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-5 sm:p-6 space-y-2 shadow-sm">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#161210]">
                Who handles port demurrage and customs inspection in India?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B625B] leading-relaxed font-sans">
                Confident arranges extended 14–21 days of free detention and demurrage with the shipping lines. Our licensed Customs House Agents (CHAs) in Nhava Sheva, Mundra, and Chennai manage all document verification, duty assessment, and container gate-out directly.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-5 sm:p-6 space-y-2 shadow-sm">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#161210]">
                Can we track our machinery container during maritime transit?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B625B] leading-relaxed font-sans">
                Yes. Once your container is stuffed and the ocean Bill of Lading is issued, our logistics desk provides live satellite AIS vessel tracking updates at regular waypoints including Singapore Strait and Colombo.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8CEBD] bg-white p-5 sm:p-6 space-y-2 shadow-sm">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#161210]">
                Can Confident coordinate delivery to tier-2 or remote industrial towns?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B625B] leading-relaxed font-sans">
                Absolutely. Our contracted road transport network operates heavy-lift multi-axle trailers reaching mills across Ichalkaranji, Rajapalayam, Bhiwandi, Tarapur, Silvassa, Karur, and Kadi directly into your mill premises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CONSULTATION CTA BANNER */}
      <section className="bg-[#161210] py-14 sm:py-20 px-5 sm:px-6 lg:px-12 text-[#FAF7F2] text-center border-t border-[#C5A059]/30">
        <div className="mx-auto max-w-2xl space-y-4 sm:space-y-5">
          <span className="font-mono text-[10.5px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059]">
            [ SCHEDULE YOUR SOURCING CORRIDOR ]
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Connect Your Mill with China's Machinery Network?
          </h2>
          <p className="text-xs sm:text-base text-[#FAF7F2]/75 leading-relaxed max-w-lg mx-auto font-sans">
            Contact our trade logistics desk to discuss vessel slot availability, EPCG zero-duty documentation, and factory doorstep delivery quotations.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059] px-5 sm:px-8 py-2.5 sm:py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#161210] hover:bg-[#FAF7F2] transition-colors shadow-md w-auto mx-auto"
            >
              <span>Connect with Trade Desk</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
