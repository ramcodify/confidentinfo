import { useState, useEffect } from "react";

export type MachineSpecs = {
  speed: string;
  power: string;
  voltage: string;
  dimensions: string;
  weight: string;
  capacity: string;
  automation: string;
};

export type MachineProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryId: string;
  manufacturer: string;
  country: string;
  origin?: string;
  description: string;
  specs?: MachineSpecs;
  specifications: {
    productionSpeed: string;
    powerConsumption: string;
    voltage: string;
    dimensions: string;
    weight: string;
    capacity: string;
    automation: string;
  };
  features: string[];
  applications: string[];
  relatedIndustries: string[];
  relatedMachines: string[];
  image: string;
  brochureUrl?: string;
  status: "Active" | "Draft";
  createdAt: string;
};

export type TextileMachine = MachineProduct;

export function normalizeProduct(p: any): MachineProduct {
  const speed = p?.specifications?.productionSpeed || p?.specs?.speed || "850 – 1,100 RPM";
  const power = p?.specifications?.powerConsumption || p?.specs?.power || "3.7 kW – 5.5 kW";
  const voltage = p?.specifications?.voltage || p?.specs?.voltage || "380V / 50Hz (3-Phase)";
  const dimensions = p?.specifications?.dimensions || p?.specs?.dimensions || "3,850 × 1,950 × 1,650 mm";
  const weight = p?.specifications?.weight || p?.specs?.weight || "2,850 kg";
  const capacity = p?.specifications?.capacity || p?.specs?.capacity || "Continuous Production";
  const automation = p?.specifications?.automation || p?.specs?.automation || "Fully Automatic PLC";

  return {
    ...p,
    id: p?.id || `mach-${Date.now()}`,
    slug: p?.slug || "textile-machine",
    name: p?.name || "Textile Machine",
    category: p?.category || "Weaving Machinery",
    categoryId: p?.categoryId || "weaving-machinery",
    manufacturer: p?.manufacturer || "Precision Machinery Co.",
    country: p?.country || p?.origin || "China",
    origin: p?.origin || p?.country || "China",
    description: p?.description || "High-performance industrial textile machinery.",
    image: p?.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    specs: {
      speed,
      power,
      voltage,
      dimensions,
      weight,
      capacity,
      automation,
    },
    specifications: {
      productionSpeed: speed,
      powerConsumption: power,
      voltage,
      dimensions,
      weight,
      capacity,
      automation,
    },
    features: Array.isArray(p?.features) ? p.features : [],
    applications: Array.isArray(p?.applications) ? p.applications : [],
    relatedIndustries: Array.isArray(p?.relatedIndustries) ? p.relatedIndustries : [],
    relatedMachines: Array.isArray(p?.relatedMachines) ? p.relatedMachines : [],
    status: p?.status || "Active",
    createdAt: p?.createdAt || new Date().toISOString(),
  };
}

export type TextileIndustry = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  applications: string[];
  suitableMachineSlugs: string[];
  suitableMachinery?: string[];
  clusters?: string[];
  compliance?: string[];
};

export function normalizeIndustry(ind: any): TextileIndustry {
  return {
    ...ind,
    id: ind?.id || `ind-${Date.now()}`,
    name: ind?.name || "Textile Industry",
    tagline: ind?.tagline || "Industrial Textile Sector",
    description: ind?.description || "",
    image:
      ind?.image ||
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    applications: Array.isArray(ind?.applications) ? ind.applications : [],
    suitableMachineSlugs: Array.isArray(ind?.suitableMachineSlugs) ? ind.suitableMachineSlugs : [],
    suitableMachinery:
      Array.isArray(ind?.suitableMachinery) && ind.suitableMachinery.length > 0
        ? ind.suitableMachinery
        : Array.isArray(ind?.suitableMachineSlugs) && ind.suitableMachineSlugs.length > 0
        ? ind.suitableMachineSlugs.map((s: string) =>
            s
              .split("-")
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          )
        : ["Air Jet Looms", "Ring Spinning Frames", "Circular Knitters"],
    clusters:
      Array.isArray(ind?.clusters) && ind.clusters.length > 0
        ? ind.clusters
        : ["Surat", "Tirupur", "Coimbatore", "Ahmedabad", "Bhilwara", "Ludhiana"],
    compliance:
      Array.isArray(ind?.compliance) && ind.compliance.length > 0
        ? ind.compliance
        : [
            "ISO 9001:2015 Verified",
            "CE Machinery Compliance",
            "EPCG Clearance Handled",
            "On-Site Mill Calibration",
          ],
  };
}

export type NetworkLocation = {
  id: string;
  name: string;
  country: "China" | "India";
  city: string;
  type?: "Manufacturer" | "Supplier" | "Port" | "Customer" | "Textile Cluster";
  role?: string;
  latitude?: number;
  longitude?: number;
  coordinates?: string;
  description: string;
  activeFlow?: string;
  services?: string[];
};

export type OwnerProfile = {
  name: string;
  designation: string;
  company: string;
  photo: string;
  biography: string;
  experience: string[];
  expertise: string[];
  phone: string;
  email: string;
  location: string;
  linkedin: string;
};

export type CustomerEnquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  machineId?: string;
  machineName?: string;
  industry?: string;
  quantity?: string;
  location?: string;
  requirement: string;
  status: "New" | "Contacted" | "new" | "reviewed" | "completed";
  createdAt: string;
};

export type CompanyInfo = {
  heroHeadline: string;
  heroSupportingText: string;
  aboutIntro: string;
  aboutSourcing: string;
  aboutQuality: string;
  aboutLogistics: string;
  phone: string;
  email: string;
  officeAddress: string;
  operatingHours: string;
  companyName?: string;
  tagline?: string;
  address?: string;
};

/* Default Seed Datasets */
export const DEFAULT_CATEGORIES = [
  "Spinning Machinery",
  "Weaving Machinery",
  "Knitting Machinery",
  "Dyeing Machinery",
  "Finishing Machinery",
  "Textile Processing Machinery",
  "Auxiliary Equipment",
] as const;

export const DEFAULT_PRODUCTS: MachineProduct[] = [
  {
    id: "mach-01",
    slug: "high-speed-air-jet-loom",
    name: "High Speed Air Jet Loom CTM-9100",
    category: "Weaving Machinery",
    categoryId: "weaving-machinery",
    manufacturer: "Tongda Textile Machinery Co., Ltd.",
    country: "China",
    description:
      "Engineered for high-yield, low-vibration weaving of cotton, synthetic, and blended yarns. Equipped with electronic let-off and take-up, auxiliary main nozzles, and high-response solenoid valves.",
    specifications: {
      productionSpeed: "850 – 1,100 RPM",
      powerConsumption: "3.7 kW – 5.5 kW",
      voltage: "380V / 50Hz (3-Phase)",
      dimensions: "3,850 × 1,950 × 1,650 mm",
      weight: "2,850 kg",
      capacity: "Reed width: 190 cm – 360 cm",
      automation: "Fully Automatic / Electronic Jacquard & Dobby Compatible",
    },
    features: [
      "Energy-saving sub-nozzle airflow control system",
      "Rigid box-type frame minimizing high-speed vibration",
      "Independent electronic let-off (ELO) and take-up (ETU)",
      "Intelligent touch-screen control with real-time broken pick detection",
      "Low air consumption design saving up to 18% pneumatic pressure",
    ],
    applications: [
      "High-density cotton apparel fabrics",
      "Synthetic filament and polyester taffeta",
      "Home textile sheeting and curtain fabrics",
      "Light-to-medium industrial canvas",
    ],
    relatedIndustries: ["Weaving Industry", "Home Textiles", "Garment & Apparel Manufacturing"],
    relatedMachines: ["rapier-loom-electronic-jacquard", "textile-stenter-finishing-machine"],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "mach-02",
    slug: "high-speed-ring-spinning-machine",
    name: "High Speed Ring Spinning Frame CTM-1588",
    category: "Spinning Machinery",
    categoryId: "spinning-machinery",
    manufacturer: "Jingwei Textile Machinery Corp.",
    country: "China",
    description:
      "Industry-standard high-efficiency ring spinning system for combed and carded yarn production. Features electronic drafting, automatic doffing system, and individual spindle speed control.",
    specifications: {
      productionSpeed: "Spindle speed up to 25,000 RPM",
      powerConsumption: "45 kW – 75 kW",
      voltage: "380V / 415V, 50/60Hz",
      dimensions: "42,000 × 1,450 × 2,200 mm (1,008 spindles)",
      weight: "14,500 kg",
      capacity: "480 to 1,200 spindles per frame",
      automation: "Automated Doffing & Roaming Tube Link Ready",
    },
    features: [
      "Individual spindle monitoring system with LED break indicators",
      "Four-roller compact spinning option for superior yarn hairiness reduction",
      "Fast 2.5-minute automatic doffing cycle",
      "Heavy-duty cast alloy spindle rails for extreme high-speed stability",
      "Centralized suction duct with frequency-regulated fan",
    ],
    applications: [
      "Combed and carded cotton yarns (Ne 10s to Ne 120s)",
      "Polyester-cotton blends (PC & CVC)",
      "Viscose and modal fine count yarns",
      "Core-spun stretch spandex yarns",
    ],
    relatedIndustries: ["Spinning Industry", "Knitting Industry", "Weaving Industry"],
    relatedMachines: ["high-production-carding-machine", "automatic-yarn-splicer-winder"],
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-01-18T11:30:00Z",
  },
  {
    id: "mach-03",
    slug: "single-jersey-circular-knitting-machine",
    name: "Single Jersey High Speed Circular Knitting Machine CTM-3.2F",
    category: "Knitting Machinery",
    categoryId: "knitting-machinery",
    manufacturer: "Wellknit Machinery Technology Co., Ltd.",
    country: "China",
    description:
      "Precision circular knitting machine with 4-track cylinder cam design for plain jersey, pique, twill, and fleece fabrics. Ultra-high feeder density maximizes daily fabric production in knitting mills.",
    specifications: {
      productionSpeed: "28 – 35 RPM (Speed factor: 900+)",
      powerConsumption: "5.5 kW inverter motor",
      voltage: "380V / 50Hz",
      dimensions: "2,600 × 2,400 × 2,650 mm",
      weight: "3,200 kg",
      capacity: "Diameter: 30\" – 38\" / Gauge: 18G – 36G",
      automation: "PLC Computerized Touch Controller with Yarn Feeder Sensors",
    },
    features: [
      "Japanese alloy steel cylinder with specialized heat treatment",
      "Centralized stitch adjustment system for quick fabric weight changes",
      "Positive yarn feeding system with infrared yarn stop motions",
      "Dual dust exhaust fans keeping needles clean for 24/7 continuous operation",
      "Oil-mist lubrication system reducing needle and sinker wear by 40%",
    ],
    applications: [
      "T-shirt and polo knitwear jersey",
      "Activewear, sportswear & stretch spandex fabrics",
      "Single-side pique, mesh, and mini-jacquard knits",
      "Underwear and innerwear tubular fabrics",
    ],
    relatedIndustries: ["Knitting Industry", "Garment & Apparel Manufacturing"],
    relatedMachines: ["high-speed-ring-spinning-machine", "hthp-fabric-dyeing-machine"],
    image:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-02-01T09:15:00Z",
  },
  {
    id: "mach-04",
    slug: "hthp-fabric-dyeing-machine",
    name: "High Temperature High Pressure (HTHP) Rapid Dyeing Machine CTM-D500",
    category: "Dyeing Machinery",
    categoryId: "dyeing-machinery",
    manufacturer: "Jiangsu Hengtian Dyeing & Finishing Machinery",
    country: "China",
    description:
      "Ultra-low liquor ratio (1:4 to 1:6) fabric overflow dyeing vessel engineered for synthetic, cotton, and blended knitted/woven fabrics. Maximizes dye uptake while reducing steam and water consumption.",
    specifications: {
      productionSpeed: "Fabric speed up to 450 m/min",
      powerConsumption: "22 kW – 37 kW main pump",
      voltage: "380V / 415V, 50Hz",
      dimensions: "6,200 × 2,800 × 3,100 mm",
      weight: "5,800 kg",
      capacity: "250 kg per tube (1 to 4 tube configurations available)",
      automation: "Fully Automatic PLC Microprocessor with Dosing Curve Management",
    },
    features: [
      "Specialized overflow and jet dual-nozzle system preventing fabric pilling",
      "Ultra-low liquor ratio design cutting water and chemical costs by 35%",
      "Internal Teflon rod chamber facilitating smooth fabric glide without creasing",
      "High-efficiency stainless heat exchanger with rapid heating/cooling rates",
      "Integrated chemical dosing tank with proportional valve metering",
    ],
    applications: [
      "100% Cotton knit fabrics and terry toweling",
      "Polyester, polyamide, and elastane sportswear blends",
      "Rayon, viscose, and modal delicate textiles",
      "Woven nylon and polyester microfiber fabrics",
    ],
    relatedIndustries: ["Dyeing & Finishing Industry", "Knitting Industry", "Weaving Industry"],
    relatedMachines: ["textile-stenter-finishing-machine", "continuous-open-width-washing-range"],
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-02-10T14:20:00Z",
  },
  {
    id: "mach-05",
    slug: "textile-stenter-finishing-machine",
    name: "Energy-Efficient Textile Stenter Finishing Machine CTM-S800",
    category: "Finishing Machinery",
    categoryId: "finishing-machinery",
    manufacturer: "Shaoxing Keqiao Machinery Works",
    country: "China",
    description:
      "Multi-chamber hot air stenter for precise drying, heat-setting, width control, and chemical finishing. Equipped with dual-heating chambers, high-precision pin/clip chain rails, and automatic weft straightener.",
    specifications: {
      productionSpeed: "15 – 120 m/min",
      powerConsumption: "85 kW – 160 kW (Thermal oil / Natural gas / Steam)",
      voltage: "380V / 50Hz",
      dimensions: "48,000 × 4,800 × 3,200 mm (8-chamber)",
      weight: "32,000 kg",
      capacity: "Working width: 1,800 mm – 3,400 mm",
      automation: "Synchronized Multi-Drive Inverter System with Touch PLC",
    },
    features: [
      "Optimized aerodynamic nozzle chambers ensuring uniform heat distribution",
      "Low-lubrication heavy-duty pin/clip transport chains",
      "Integrated optical weft straightener for zero-skew finishing",
      "Exhaust air heat recovery system recouping up to 25% thermal energy",
      "Precision chemical padding mangle with uniform nip pressure",
    ],
    applications: [
      "Dimensional stabilization and heat setting of synthetic fabrics",
      "Resin finishing, water-repellent, and anti-static coating",
      "Woven cotton, linen, and denim width control",
      "Knitted fabric pre-setting and post-dye drying",
    ],
    relatedIndustries: ["Dyeing & Finishing Industry", "Technical & Industrial Textiles", "Home Textiles"],
    relatedMachines: ["hthp-fabric-dyeing-machine", "continuous-open-width-washing-range"],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-02-15T16:00:00Z",
  },
  {
    id: "mach-06",
    slug: "high-production-carding-machine",
    name: "High Production Blowroom & Carding Machine CTM-C60",
    category: "Spinning Machinery",
    categoryId: "spinning-machinery",
    manufacturer: "Qingdao Textile Machinery Group",
    country: "China",
    description:
      "High-output carding machine designed to open, clean, and parallelize cotton and chemical fibers with minimal fiber damage. Incorporates continuous suction and stationary flats for nep removal.",
    specifications: {
      productionSpeed: "Output up to 120 kg/hour",
      powerConsumption: "15 kW – 22 kW",
      voltage: "380V / 50Hz",
      dimensions: "3,800 × 2,200 × 2,400 mm",
      weight: "5,500 kg",
      capacity: "Working width: 1,020 mm / 1,280 mm",
      automation: "Full Servo Drive & Online Autoleveller",
    },
    features: [
      "Optimized licker-in system with multi-stage mote knife trash ejection",
      "Active revolving flat system with precision reverse drive",
      "Advanced autoleveller guaranteeing sliver count consistency within CV% < 0.8%",
      "Continuous enclosed suction channels maintaining zero airborne lint",
      "Color graphic monitor displaying real-time sliver weight and nep statistics",
    ],
    applications: [
      "Cotton fiber cleaning and opening for ring spinning mills",
      "Polyester, viscose, and nylon staple fiber preparation",
      "Nonwoven carded web preparation lines",
      "Recycled cotton and regenerated fiber lines",
    ],
    relatedIndustries: ["Spinning Industry", "Nonwoven Manufacturing"],
    relatedMachines: ["high-speed-ring-spinning-machine", "automatic-yarn-splicer-winder"],
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-02-20T10:45:00Z",
  },
  {
    id: "mach-07",
    slug: "rapier-loom-electronic-jacquard",
    name: "High-Speed Rapier Loom with Electronic Jacquard CTM-R800J",
    category: "Weaving Machinery",
    categoryId: "weaving-machinery",
    manufacturer: "Hangzhou Huasheng Textile Machinery",
    country: "China",
    description:
      "Versatile flexible rapier weaving loom combined with digital electronic jacquard head for complex patterned fabrics, furnishing textiles, and luxury sarees. Delivers superior weft insertion reliability.",
    specifications: {
      productionSpeed: "550 – 700 RPM",
      powerConsumption: "7.5 kW – 11 kW",
      voltage: "380V / 415V, 50Hz",
      dimensions: "4,200 × 2,100 × 3,800 mm (with Jacquard gantry)",
      weight: "4,600 kg",
      capacity: "Reed width: 190 cm – 340 cm / Jacquard hooks: 2,688 to 10,240",
      automation: "Full Electronic Jacquard Controller with USB/Network Pattern Loading",
    },
    features: [
      "Low-profile carbon fiber rapier tapes reducing friction and wear",
      "Electronic color selector supporting up to 8 to 12 weft colors",
      "Independent electronic jacquard controller with real-time diagnostics",
      "Electronic continuous take-up with pick density programmable up to 200 picks/cm",
      "Rigid ground-mounted gantry structure isolating loom vibrations",
    ],
    applications: [
      "Jacquard upholstery, curtain, and sofa fabrics",
      "Silk, brocade, and luxury traditional saree borders",
      "Technical geotextiles and heavy filtration fabrics",
      "Apparel jacquard weaves and label fabrics",
    ],
    relatedIndustries: ["Weaving Industry", "Home Textiles", "Technical & Industrial Textiles"],
    relatedMachines: ["high-speed-air-jet-loom", "textile-stenter-finishing-machine"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-02-25T13:10:00Z",
  },
  {
    id: "mach-08",
    slug: "continuous-open-width-washing-range",
    name: "Continuous Open-Width Tensionless Washing Range CTM-W600",
    category: "Textile Processing Machinery",
    categoryId: "textile-processing-machinery",
    manufacturer: "Changshu Textile Machinery Co., Ltd.",
    country: "China",
    description:
      "High-efficiency continuous open-width washing range for desizing, scouring, bleaching, and post-print washing. Protects delicate knitted and woven fabrics through precision load-cell tension control.",
    specifications: {
      productionSpeed: "20 – 80 m/min",
      powerConsumption: "45 kW – 90 kW",
      voltage: "380V / 50Hz",
      dimensions: "28,000 × 3,200 × 3,600 mm",
      weight: "18,500 kg",
      capacity: "Fabric width: 1,800 mm – 3,200 mm",
      automation: "Synchronized AC Inverter Drive with Pneumatic Dancer Rollers",
    },
    features: [
      "Counter-current water flow system saving up to 40% fresh water",
      "High-efficiency submerged spray nozzles ensuring rapid chemical penetration",
      "Heavy-duty stainless steel SUS316L washing tanks with inspection windows",
      "Intermediate high-expression squeezing mangles reducing moisture carry-over",
      "Automated pH, temperature, and water-level metering",
    ],
    applications: [
      "Post-dyeing and post-printing wash-off for cotton and rayon",
      "Continuous desizing and scouring of woven apparel fabrics",
      "Preparation washing for digital printing lines",
      "Spandex blend tensionless washing without edge curling",
    ],
    relatedIndustries: ["Dyeing & Finishing Industry", "Garment & Apparel Manufacturing"],
    relatedMachines: ["hthp-fabric-dyeing-machine", "textile-stenter-finishing-machine"],
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=85",
    status: "Active",
    createdAt: "2026-03-01T08:30:00Z",
  },
];

export const DEFAULT_INDUSTRIES: TextileIndustry[] = [
  {
    id: "spinning-industry",
    name: "Spinning Industry",
    tagline: "High-speed carding, drawing, roving, and ring spinning frames.",
    description:
      "Converting raw cotton, synthetic staples, and regenerated fibers into uniform, high-tenacity yarns. We source verified Chinese spinning equipment that delivers low CV%, reduced yarn hairiness, and minimized energy consumption per kilogram.",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85",
    applications: ["Combed & Carded Yarns", "Blended Yarns", "Open-End Rotor Yarns", "Compact Fine Counts"],
    suitableMachineSlugs: [
      "high-speed-ring-spinning-machine",
      "high-production-carding-machine",
    ],
  },
  {
    id: "weaving-industry",
    name: "Weaving Industry",
    tagline: "Air jet looms, rapier systems, and electronic jacquards.",
    description:
      "Equipping modern Indian weaving sheds with robust air-jet, water-jet, and flexible rapier looms from China's leading machinery clusters. Our machines provide maximum filling insertion rates, stable shed geometry, and low air consumption.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    applications: ["High-Density Cotton Weaving", "Shirting & Suiting", "Denim Fabrics", "Jacquard Home Furnishings"],
    suitableMachineSlugs: [
      "high-speed-air-jet-loom",
      "rapier-loom-electronic-jacquard",
    ],
  },
  {
    id: "knitting-industry",
    name: "Knitting Industry",
    tagline: "Circular single/double jersey, interlock, and flat knitting machines.",
    description:
      "Serving Tirupur, Ludhiana, and Kolkata knitting hubs with high-speed circular and computerized flat knitting machinery. Engineered for continuous 24/7 production of tubular and open-width knits.",
    image:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    applications: ["T-Shirt & Polo Knits", "Fleece & French Terry", "Seamless Sportswear", "Rib & Interlock"],
    suitableMachineSlugs: [
      "single-jersey-circular-knitting-machine",
      "high-speed-ring-spinning-machine",
    ],
  },
  {
    id: "dyeing-finishing-industry",
    name: "Dyeing & Finishing Industry",
    tagline: "HTHP rapid dyeing vessels, stenters, and continuous washing ranges.",
    description:
      "Upgrading Indian wet processing facilities with low-liquor ratio dyeing autoclaves, tensionless washers, and multi-chamber stenter finishing lines for superior color fastness and hand feel.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85",
    applications: ["Knitted Fabric Batch Dyeing", "Continuous Woven Finishing", "Heat Setting & Drying", "Chemical Padding"],
    suitableMachineSlugs: [
      "hthp-fabric-dyeing-machine",
      "textile-stenter-finishing-machine",
      "continuous-open-width-washing-range",
    ],
  },
  {
    id: "garment-apparel-manufacturing",
    name: "Garment & Apparel Manufacturing",
    tagline: "Automated fabric spreading, cutting, printing, and sewing auxiliary lines.",
    description:
      "Empowering high-volume garment exporters across India with precision cutting, automatic screen printing, and specialized fabric handling equipment sourced from Chinese automation pioneers.",
    image:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=85",
    applications: ["Ready-Made Garments (RMG)", "Knitted Apparel", "Woven Shirts & Trousers", "Outerwear"],
    suitableMachineSlugs: [
      "single-jersey-circular-knitting-machine",
      "continuous-open-width-washing-range",
    ],
  },
  {
    id: "technical-industrial-textiles",
    name: "Technical & Industrial Textiles",
    tagline: "Heavy-duty looms, coating ranges, and geotextile machinery.",
    description:
      "Catering to India's burgeoning technical textiles sector with specialized wide-width rapier looms, automotive interior fabric machines, filter media processing, and medical nonwoven equipment.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    applications: ["Geotextiles & Agrotextiles", "Automotive Fabrics", "Filtration Media", "Coated Industrial Fabrics"],
    suitableMachineSlugs: [
      "rapier-loom-electronic-jacquard",
      "textile-stenter-finishing-machine",
    ],
  },
  {
    id: "home-textiles",
    name: "Home Textiles",
    tagline: "Extra-wide air jet looms, jacquards, and bed linen finishing lines.",
    description:
      "Supplying Karur, Panipat, and Solapur home textile producers with wide-width looms up to 360cm, rotary printing, and specialized shearing/finishing ranges.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85",
    applications: ["Bed Linen & Sheeting", "Curtain & Upholstery", "Terry Towels", "Table Linen"],
    suitableMachineSlugs: [
      "high-speed-air-jet-loom",
      "rapier-loom-electronic-jacquard",
      "textile-stenter-finishing-machine",
    ],
  },
  {
    id: "nonwoven-manufacturing",
    name: "Nonwoven Manufacturing",
    tagline: "Spunbond, needle punch, and carded web bonding lines.",
    description:
      "Delivering turn-key Chinese nonwoven lines for medical hygiene fabrics, mask media, geotextile felts, and acoustic automotive underlays.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    applications: ["Medical Spunbond", "Hygiene Topsheets", "Needle Punched Felts", "Packaging Nonwovens"],
    suitableMachineSlugs: [
      "high-production-carding-machine",
    ],
  },
];

export const DEFAULT_NETWORK_LOCATIONS: NetworkLocation[] = [
  // China Sourcing & Manufacturing Nodes
  {
    id: "loc-cn-01",
    name: "Shanghai Port & Machinery Export Terminal",
    country: "China",
    city: "Shanghai",
    type: "Port",
    latitude: 31.2304,
    longitude: 121.4737,
    description: "Primary deep-water container terminal for chartered machinery shipments into Indian ports. Direct liner routes.",
    activeFlow: "Heavy Machinery Export · 24-48h Customs Inspection Clearance",
  },
  {
    id: "loc-cn-02",
    name: "Guangzhou Machinery Sourcing Basin",
    country: "China",
    city: "Guangzhou",
    type: "Manufacturer",
    latitude: 23.1291,
    longitude: 113.2644,
    description: "Premier manufacturing zone for circular knitting, sewing automation, and garment manufacturing equipment.",
    activeFlow: "Knitting & Garment Equipment Manufacturing Hub",
  },
  {
    id: "loc-cn-03",
    name: "Shenzhen Quality Testing & Tech Hub",
    country: "China",
    city: "Shenzhen",
    type: "Supplier",
    latitude: 22.5431,
    longitude: 114.0579,
    description: "Electronic control systems, computerized jacquards, servo controllers, and pre-loading inspection station.",
    activeFlow: "Digital Loom Controllers & Optical Sensor Testing",
  },
  {
    id: "loc-cn-04",
    name: "Ningbo Export Container Gateway",
    country: "China",
    city: "Ningbo",
    type: "Port",
    latitude: 29.8683,
    longitude: 121.544,
    description: "Specialized terminal for oversized machinery crates, moisture barrier packaging, and flat-rack container stuffing.",
    activeFlow: "ISPM-15 Crating & High-Capacity Ocean Carrier Bookings",
  },
  {
    id: "loc-cn-05",
    name: "Wuxi & Changshu Textile Machinery Hub",
    country: "China",
    city: "Wuxi",
    type: "Manufacturer",
    latitude: 31.4912,
    longitude: 120.3119,
    description: "Historic cradle of China's spinning frames, air jet looms, and dyeing/finishing stenters.",
    activeFlow: "Air Jet Loom & Spinning Frame Assembly Plants",
  },

  // India Discharge Ports & Industrial Clusters
  {
    id: "loc-in-01",
    name: "Chennai Port Inbound Maritime Terminal",
    country: "India",
    city: "Chennai",
    type: "Port",
    latitude: 13.0827,
    longitude: 80.2707,
    description: "Primary South India entry port for containerized Chinese textile machinery with direct customs clearance corridors.",
    activeFlow: "Direct Port-to-Factory Bonded Transport into Tamil Nadu",
  },
  {
    id: "loc-in-02",
    name: "Nhava Sheva (JNPT) Mumbai Terminal",
    country: "India",
    city: "Mumbai",
    type: "Port",
    latitude: 18.9499,
    longitude: 72.9515,
    description: "West India gateway port providing seamless intermodal rail delivery into Maharashtra and Gujarat textile belts.",
    activeFlow: "Container Gate-out & Multi-Axle Low Bed Machinery Trailer Logistics",
  },
  {
    id: "loc-in-03",
    name: "Mundra Port Logistics Terminal",
    country: "India",
    city: "Mundra",
    type: "Port",
    latitude: 22.8395,
    longitude: 69.7042,
    description: "Deep-draft port with specialized break-bulk and heavy-lift facilities for multi-ton spinning and stenter lines.",
    activeFlow: "Fast-Track Clearance for Gujarat Industrial Clusters",
  },
  {
    id: "loc-in-04",
    name: "Tirupur & Coimbatore Textile Cluster",
    country: "India",
    city: "Tirupur",
    type: "Textile Cluster",
    latitude: 11.1085,
    longitude: 77.3411,
    description: "India's premier knitwear and cotton spinning capital. Over 200+ machines delivered and commissioned across regional mills.",
    activeFlow: "Circular Knitting & Ring Spinning Machine Installations",
  },
  {
    id: "loc-in-05",
    name: "Surat & Ahmedabad Weaving & Processing Belt",
    country: "India",
    city: "Surat",
    type: "Textile Cluster",
    latitude: 21.1702,
    longitude: 72.8311,
    description: "World-renowned synthetic weaving, jacquard fabric, and continuous textile dyeing and finishing center.",
    activeFlow: "Air Jet Loom, Rapier Jacquard & Stenter Deployments",
  },
  {
    id: "loc-in-06",
    name: "Ludhiana Woolen & Knitwear Hub",
    country: "India",
    city: "Ludhiana",
    type: "Textile Cluster",
    latitude: 30.901,
    longitude: 75.8573,
    description: "North India's largest hub for spinning, acrylic knitwear, carded wool, and garment manufacturing.",
    activeFlow: "Carding Machines & Automated Flat Knitting Lines",
  },
];

export const DEFAULT_OWNER_PROFILE: OwnerProfile = {
  name: "Ariana Salim",
  designation: "Founder & Managing Director",
  company: "Confident Textiles Machinery",
  photo:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85",
  biography:
    "Ariana Salim founded Confident Textiles Machinery in 2012 with a definitive mandate: to bridge Chinese high-precision textile machinery engineering directly with India's expanding industrial textile hubs. With over 14 years of direct field experience auditing Chinese manufacturing plants in Shanghai, Guangzhou, and Wuxi, she personally oversees supplier verification, technical calibration checks, and ocean shipping logistics to ensure every machine delivered to Indian textile mills performs to exact commercial benchmarks.",
  experience: [
    "Over 14 years specializing in China-to-India textile machinery sourcing and procurement.",
    "Conducted on-site physical audits across 120+ leading Chinese machinery manufacturing mills.",
    "Facilitated import and customs clearance of over 500+ containerized machine units across Indian ports.",
    "Long-standing commercial partnerships with tier-1 ocean carriers and Indian port logistics operators.",
    "End-to-end customer support covering installation guidance, spare parts sourcing, and technical servicing.",
  ],
  expertise: [
    "China Machinery Sourcing & Manufacturer Audits",
    "International Trade & Incoterms 2020 Compliance",
    "Textile Manufacturing Technology & Calibration",
    "Import, Ocean Logistics & Customs Clearance",
    "Customer Relationship Management & Field Support",
  ],
  phone: "+1 (800) 492-8723",
  email: "contact@confidentmachinery.com",
  location: "Maritime Commercial District / India Operations Hub",
  linkedin: "https://linkedin.com/company/confident-textiles-machinery",
};

export const DEFAULT_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: "enq-001",
    name: "Rajesh K. Sundaram",
    company: "Tirupur Knitwear Exports Ltd.",
    email: "rajesh@tirupurknitwear.com",
    phone: "+91 98421 87654",
    machineId: "mach-03",
    machineName: "Single Jersey High Speed Circular Knitting Machine CTM-3.2F",
    industry: "Knitting Industry",
    quantity: "8 Units",
    location: "Tirupur, Tamil Nadu",
    requirement:
      "We are expanding our jersey production line for export t-shirts and require 8 units of 30-inch, 28G circular knitting machines with Lycra feeders. Please share pro-forma quotation including CIF Chennai Port and delivery lead time from China.",
    status: "New",
    createdAt: "2026-03-20T14:30:00Z",
  },
  {
    id: "enq-002",
    name: "Mukeshbhai Patel",
    company: "Surat Synthetic Weaving Mills",
    email: "patel@suratweaving.in",
    phone: "+91 98250 12345",
    machineId: "mach-01",
    machineName: "High Speed Air Jet Loom CTM-9100",
    industry: "Weaving Industry",
    quantity: "24 Units",
    location: "Surat, Gujarat",
    requirement:
      "Looking to replace older shuttle looms with 24 high-speed air jet looms (reed width 230cm, electronic dobby). Need manufacturer confirmation from China, technical datasheet, and import customs facilitation at Mundra Port.",
    status: "Contacted",
    createdAt: "2026-03-18T10:15:00Z",
  },
  {
    id: "enq-003",
    name: "Vikramjeet Singh",
    company: "Ludhiana Wool & Spinning Co.",
    email: "v.singh@ludhianaspin.com",
    phone: "+91 98140 55678",
    machineId: "mach-06",
    machineName: "High Production Blowroom & Carding Machine CTM-C60",
    industry: "Spinning Industry",
    quantity: "4 Units",
    location: "Ludhiana, Punjab",
    requirement:
      "Require high-production carding frames for regenerated cotton and polyester blend yarn spinning. Please provide power consumption specs, installation timeline, and spare parts availability in India.",
    status: "New",
    createdAt: "2026-03-21T08:45:00Z",
  },
];

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  heroHeadline: "Connecting China’s Textile Machinery with India’s Manufacturing Industry",
  heroSupportingText:
    "We source, verify and facilitate the import of reliable textile machinery from trusted Chinese manufacturers to textile industries across India.",
  aboutIntro:
    "Confident Textiles Machinery specializes in sourcing and supplying high-performance textile machinery from China to textile and manufacturing industries across India. With deep roots in Chinese industrial clusters and Indian textile corridors, we eliminate broker opacity through physical verification, contractual integrity, and seamless port delivery.",
  aboutSourcing:
    "We maintain direct origin partnerships with audited machinery manufacturing plants in Shanghai, Wuxi, Guangzhou, Ningbo, and Qingdao. Every manufacturer is vetted for ISO quality accreditation, component sourcing rigor, and post-dispatch warranty support.",
  aboutQuality:
    "Before any container is sealed for export, our engineering surveyors conduct rigorous on-site machinery evaluations: power consumption checks, spindle/loom vibration analysis, electronic sensor diagnostics, and ISPM-15 anti-moisture crating inspections.",
  aboutLogistics:
    "From factory floor to Indian receiving warehouse, our trade desk manages ocean liner slot bookings, consular documentation, phytosanitary/CE clearances, and fast-track customs releases through Chennai, Nhava Sheva, and Mundra ports.",
  phone: "+1 (800) 492-8723",
  email: "contact@confidentmachinery.com",
  officeAddress: "Confident Trade Towers, Level 42, Maritime Commercial District / India Operations",
  operatingHours: "Monday — Friday: 08:00 – 19:00 UTC | Saturday: 09:00 – 14:00 UTC",
  companyName: "Confident Textiles Machinery",
  tagline: "Connecting China’s Textile Machinery with India’s Manufacturing",
  address: "Confident Trade Towers, Level 42, Maritime Commercial District / India Operations",
};

/* LocalStorage Keys */
const STORAGE_KEYS = {
  PRODUCTS: "ctm_products_v1",
  INDUSTRIES: "ctm_industries_v1",
  NETWORK: "ctm_network_v1",
  OWNER: "ctm_owner_v1",
  ENQUIRIES: "ctm_enquiries_v1",
  COMPANY: "ctm_company_v1",
};

const SYNC_EVENT = "ctm_machinery_store_update";

/* Helper Functions */
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to load ${key} from storage:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { key } }));
  } catch (err) {
    console.error(`Failed to save ${key} to storage:`, err);
  }
}

/* Store State & Actions Hook */
export function useMachineryStore() {
  const [products, setProducts] = useState<MachineProduct[]>(() => {
    const loaded = loadFromStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    return (Array.isArray(loaded) ? loaded : DEFAULT_PRODUCTS).map(normalizeProduct);
  });
  const [industries, setIndustries] = useState<TextileIndustry[]>(() => {
    const loaded = loadFromStorage(STORAGE_KEYS.INDUSTRIES, DEFAULT_INDUSTRIES);
    return (Array.isArray(loaded) ? loaded : DEFAULT_INDUSTRIES).map(normalizeIndustry);
  });
  const [networkLocations, setNetworkLocations] = useState<NetworkLocation[]>(() =>
    loadFromStorage(STORAGE_KEYS.NETWORK, DEFAULT_NETWORK_LOCATIONS)
  );
  const [ownerProfile, setOwnerProfile] = useState<OwnerProfile>(() =>
    loadFromStorage(STORAGE_KEYS.OWNER, DEFAULT_OWNER_PROFILE)
  );
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() =>
    loadFromStorage(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES)
  );
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() =>
    loadFromStorage(STORAGE_KEYS.COMPANY, DEFAULT_COMPANY_INFO)
  );

  useEffect(() => {
    const handleSync = () => {
      const raw = loadFromStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
      setProducts((Array.isArray(raw) ? raw : DEFAULT_PRODUCTS).map(normalizeProduct));
      const rawInd = loadFromStorage(STORAGE_KEYS.INDUSTRIES, DEFAULT_INDUSTRIES);
      setIndustries((Array.isArray(rawInd) ? rawInd : DEFAULT_INDUSTRIES).map(normalizeIndustry));
      setNetworkLocations(loadFromStorage(STORAGE_KEYS.NETWORK, DEFAULT_NETWORK_LOCATIONS));
      setOwnerProfile(loadFromStorage(STORAGE_KEYS.OWNER, DEFAULT_OWNER_PROFILE));
      setEnquiries(loadFromStorage(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES));
      setCompanyInfo(loadFromStorage(STORAGE_KEYS.COMPANY, DEFAULT_COMPANY_INFO));
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Product Operations
  const addProduct = (product: Omit<MachineProduct, "id" | "createdAt">) => {
    const newProduct = normalizeProduct({
      ...product,
      id: `mach-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<MachineProduct>) => {
    const updated = products.map((p) => (p.id === id ? normalizeProduct({ ...p, ...updates }) : p));
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
  };

  // Industry Operations
  const addIndustry = (industry: Omit<TextileIndustry, "id">) => {
    const newInd: TextileIndustry = {
      ...industry,
      id: `ind-${Date.now()}`,
    };
    const updated = [...industries, newInd];
    setIndustries(updated);
    saveToStorage(STORAGE_KEYS.INDUSTRIES, updated);
    return newInd;
  };

  const updateIndustry = (id: string, updates: Partial<TextileIndustry>) => {
    const updated = industries.map((ind) => (ind.id === id ? { ...ind, ...updates } : ind));
    setIndustries(updated);
    saveToStorage(STORAGE_KEYS.INDUSTRIES, updated);
  };

  const deleteIndustry = (id: string) => {
    const updated = industries.filter((ind) => ind.id !== id);
    setIndustries(updated);
    saveToStorage(STORAGE_KEYS.INDUSTRIES, updated);
  };

  // Network Location Operations
  const addNetworkLocation = (loc: Omit<NetworkLocation, "id">) => {
    const newLoc: NetworkLocation = {
      ...loc,
      id: `loc-${Date.now()}`,
    };
    const updated = [...networkLocations, newLoc];
    setNetworkLocations(updated);
    saveToStorage(STORAGE_KEYS.NETWORK, updated);
    return newLoc;
  };

  const updateNetworkLocation = (id: string, updates: Partial<NetworkLocation>) => {
    const updated = networkLocations.map((loc) => (loc.id === id ? { ...loc, ...updates } : loc));
    setNetworkLocations(updated);
    saveToStorage(STORAGE_KEYS.NETWORK, updated);
  };

  const deleteNetworkLocation = (id: string) => {
    const updated = networkLocations.filter((loc) => loc.id !== id);
    setNetworkLocations(updated);
    saveToStorage(STORAGE_KEYS.NETWORK, updated);
  };

  // Owner Profile Operations
  const updateOwnerProfile = (updates: Partial<OwnerProfile>) => {
    const updated = { ...ownerProfile, ...updates };
    setOwnerProfile(updated);
    saveToStorage(STORAGE_KEYS.OWNER, updated);
  };

  // Customer Enquiry Operations
  const submitEnquiry = (enquiry: Omit<CustomerEnquiry, "id" | "createdAt" | "status">) => {
    const newEnq: CustomerEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: "New",
      createdAt: new Date().toISOString(),
    };
    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    saveToStorage(STORAGE_KEYS.ENQUIRIES, updated);
    return newEnq;
  };

  const updateEnquiryStatus = (id: string, status: CustomerEnquiry["status"]) => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
    setEnquiries(updated);
    saveToStorage(STORAGE_KEYS.ENQUIRIES, updated);
  };

  const deleteEnquiry = (id: string) => {
    const updated = enquiries.filter((e) => e.id !== id);
    setEnquiries(updated);
    saveToStorage(STORAGE_KEYS.ENQUIRIES, updated);
  };

  // Company Info Operations
  const updateCompanyInfo = (updates: Partial<CompanyInfo>) => {
    const updated = { ...companyInfo, ...updates };
    setCompanyInfo(updated);
    saveToStorage(STORAGE_KEYS.COMPANY, updated);
  };

  // Reset Store to Defaults
  const resetAllToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    setIndustries(DEFAULT_INDUSTRIES);
    setNetworkLocations(DEFAULT_NETWORK_LOCATIONS);
    setOwnerProfile(DEFAULT_OWNER_PROFILE);
    setEnquiries(DEFAULT_ENQUIRIES);
    setCompanyInfo(DEFAULT_COMPANY_INFO);
    saveToStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    saveToStorage(STORAGE_KEYS.INDUSTRIES, DEFAULT_INDUSTRIES);
    saveToStorage(STORAGE_KEYS.NETWORK, DEFAULT_NETWORK_LOCATIONS);
    saveToStorage(STORAGE_KEYS.OWNER, DEFAULT_OWNER_PROFILE);
    saveToStorage(STORAGE_KEYS.ENQUIRIES, DEFAULT_ENQUIRIES);
    saveToStorage(STORAGE_KEYS.COMPANY, DEFAULT_COMPANY_INFO);
  };

  return {
    products,
    industries,
    networkLocations,
    ownerProfile,
    enquiries,
    companyInfo,
    addProduct,
    updateProduct,
    deleteProduct,
    addIndustry,
    updateIndustry,
    deleteIndustry,
    addNetworkLocation,
    updateNetworkLocation,
    deleteNetworkLocation,
    updateOwnerProfile,
    submitEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,
    updateCompanyInfo,
    resetAllToDefaults,
  };
}
