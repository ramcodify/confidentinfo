export type Category = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentLabel: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  categoryId: string;
  origin: string;
  grade: string;
  description: string;
  packaging: string;
  moq: string;
  destination: string;
  regions: string[];
  image: string;
  specs: string[];
  compliance: string[];
  tradeTerms: string[];
};

export const categoryList: Category[] = [
  {
    id: "agricultural-products",
    number: "01",
    name: "Agricultural Products",
    tagline: "Sourced from fertile terroirs, audited mills & agricultural collectives.",
    description:
      "Direct-origin export commodities including aged aromatic basmati, plantation spices, sortex pulses, and oilseeds managed with stringent pre-shipment phytosanitary controls.",
    heroImage:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#3E4C34",
    accentBg: "rgba(62, 76, 52, 0.08)",
    accentBorder: "rgba(62, 76, 52, 0.3)",
    accentLabel: "Deep Olive",
  },
  {
    id: "food-beverages",
    number: "02",
    name: "Food & Beverages",
    tagline: "Commercial shelf-ready & bulk ingredients for global distribution.",
    description:
      "Specialty single-origin tea, grade-1 green arabica coffee, and aseptic tropical fruit purees with complete batch traceability and destination compliance certifications.",
    heroImage:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#9E4E39",
    accentBg: "rgba(158, 78, 57, 0.08)",
    accentBorder: "rgba(158, 78, 57, 0.3)",
    accentLabel: "Muted Terracotta",
  },
  {
    id: "industrial-materials",
    number: "03",
    name: "Industrial Materials",
    tagline: "Certified mill-origin raw materials for global manufacturing & construction.",
    description:
      "Flat-rolled steel coils, heavy seamless carbon steel line pipes, and architectural aluminum alloy profiles backed by mill test certificates and dimensional inspections.",
    heroImage:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#2B2725",
    accentBg: "rgba(43, 39, 37, 0.08)",
    accentBorder: "rgba(43, 39, 37, 0.3)",
    accentLabel: "Charcoal Steel",
  },
  {
    id: "machinery-equipment",
    number: "04",
    name: "Machinery & Equipment",
    tagline: "Engineered capital goods, prime power systems & precision tooling.",
    description:
      "Industrial centrifugal process pumps, continuous diesel generator sets, and 5-axis CNC machining centers shipped in ISPM-15 export-rated moisture barrier crating.",
    heroImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#17282A",
    accentBg: "rgba(23, 40, 42, 0.08)",
    accentBorder: "rgba(23, 40, 42, 0.3)",
    accentLabel: "Deep Petrol",
  },
  {
    id: "automotive",
    number: "05",
    name: "Automotive",
    tagline: "OEM and tier-1 qualified vehicle components and mechanical systems.",
    description:
      "Precision forged engine crankshafts, ventilated ceramic brake rotors, and case-hardened transmission gearing built for commercial fleets and assembly plants.",
    heroImage:
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#3B424A",
    accentBg: "rgba(59, 66, 74, 0.08)",
    accentBorder: "rgba(59, 66, 74, 0.3)",
    accentLabel: "Graphite",
  },
  {
    id: "packaging",
    number: "06",
    name: "Packaging",
    tagline: "Transit-rated protective containment and export palletizing systems.",
    description:
      "Double-wall corrugated shipping cartons, heat-treated EPAL wooden pallets, and multi-layer cast stretch barrier film configured for high-stress international sea routes.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#C5A059",
    accentBg: "rgba(197, 160, 89, 0.08)",
    accentBorder: "rgba(197, 160, 89, 0.3)",
    accentLabel: "Antique Brass",
  },
  {
    id: "chemical-raw-materials",
    number: "07",
    name: "Chemical & Raw Materials",
    tagline: "Safely managed industrial intermediates & compliant processing chemicals.",
    description:
      "Linear alkyl benzene (LAB) surfactant bases and 99.7% pure refined technical glycerin handled strictly under audited international chemical handling standards.",
    heroImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#1D3D3B",
    accentBg: "rgba(29, 61, 59, 0.08)",
    accentBorder: "rgba(29, 61, 59, 0.3)",
    accentLabel: "Deep Teal",
  },
  {
    id: "textiles",
    number: "08",
    name: "Textiles",
    tagline: "Natural spun cotton staples & luxury organic industrial woven fabrics.",
    description:
      "Long-staple combed cotton bales and high-density organic linen and canvas fabric rolls certified under OEKO-TEX Standard 100 for premium apparel and home textile markets.",
    heroImage:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1400&q=85",
    accentColor: "#6B4423",
    accentBg: "rgba(107, 68, 35, 0.08)",
    accentBorder: "rgba(107, 68, 35, 0.3)",
    accentLabel: "Warm Brown",
  },
];

export const categories = ["All", ...categoryList.map((c) => c.name)];

export const products: Product[] = [
  // 01 Agricultural Products
  {
    slug: "premium-basmati-rice",
    name: "Aged Traditional Basmati Rice",
    category: "Agricultural Products",
    categoryId: "agricultural-products",
    origin: "Punjab & Haryana, Indo-Gangetic Plains",
    grade: "1121 Steam Extra-Long Grain (8.35mm+)",
    description:
      "Naturally aged for a minimum of 24 months, delivering distinct aroma, non-sticky elongation up to 2.5×, and pristine purity for international retail and foodservice distributors.",
    packaging: "5 kg, 10 kg, 20 kg, 50 kg BOPP & Non-Woven Jute Bags",
    moq: "One 20 ft FCL (25 Metric Tonnes)",
    destination: "Jebel Ali, Dammam, Rotterdam, Felixstowe, Newark",
    regions: ["Middle East", "Europe", "North America"],
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Average grain length: 8.35mm before cooking",
      "Moisture content: Max 12.5%",
      "Broken grains: Under 1.0%",
      "Crop year: Audited 2-year aged stock",
    ],
    compliance: ["Phytosanitary Certificate", "FSSAI / ISO 22000", "Non-GMO Verification"],
    tradeTerms: ["FOB Mundra / Nhava Sheva", "CIF Destination Port", "100% Irrevocable L/C"],
  },
  {
    slug: "tellicherry-black-pepper",
    name: "Malabar Tellicherry Garbled Black Pepper",
    category: "Agricultural Products",
    categoryId: "agricultural-products",
    origin: "Malabar Coast, Kerala, India",
    grade: "TGSEB (Tellicherry Garbled Special Extra Bold - 4.75mm+)",
    description:
      "Sun-dried, high-piperine peppercorns harvested from high-elevation Malabar vines. Cleaned, destoned, and metal-detected to guarantee unmatched pungency and aroma.",
    packaging: "25 kg Multi-wall Kraft paper sacks with HDPE inner liner",
    moq: "5 Metric Tonnes (Combined container shipments accepted)",
    destination: "Hamburg, Antwerp, New York, Tokyo, Dubai",
    regions: ["Europe", "North America", "East Asia", "Middle East"],
    image:
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Bulk density: 570 g/L minimum",
      "Piperine content: 5.5% – 6.8%",
      "Volatile oil: Min 2.5%",
      "Moisture: Max 11.0%",
    ],
    compliance: [
      "ASTA Cleanliness Standards",
      "Eurofins Pesticide Screening",
      "Certificate of Origin",
    ],
    tradeTerms: ["FOB Cochin", "CIF European Ports", "T/T or L/C at Sight"],
  },
  {
    slug: "green-cardamom-pods",
    name: "Alleppey Green Bold Cardamom",
    category: "Agricultural Products",
    categoryId: "agricultural-products",
    origin: "Idukki Hills, Western Ghats",
    grade: "Extra Bold 8mm+ Deep Green Pods",
    description:
      "Whole green cardamom pods sorted by diameter and chlorophyll retention. Vacuum packed directly post-curing to seal in floral cineole and terpinyl acetate essential oils.",
    packaging: "10 kg Food-grade vacuum sealed foil pouches in master carton",
    moq: "2 Metric Tonnes",
    destination: "Riyadh, Jeddah, Dubai, Doha, London",
    regions: ["Middle East", "Europe", "North America"],
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Size classification: 8mm to 8.5mm",
      "Color uniformity: Min 92% deep olive green",
      "Essential oil volume: 8.5% min",
      "Immature/empty pods: Under 0.5%",
    ],
    compliance: ["Spice Board of India Export Certificate", "HACCP Certified Curing"],
    tradeTerms: ["FOB Cochin", "Air Freight Expedited Available", "L/C at Sight"],
  },
  {
    slug: "split-red-lentils",
    name: "Sortex Cleaned Red Split Lentils",
    category: "Agricultural Products",
    categoryId: "agricultural-products",
    origin: "Saskatchewan, Canada / New South Wales, Australia",
    grade: "Machine Cleaned & Sortex 99.5% Purity (No. 1 Canada)",
    description:
      "Dehulled and split red lentils with uniform oil/water polish. High protein profile, fast-cooking properties, and consistent sizing for institutional foodservice.",
    packaging: "25 kg & 50 kg PP Woven Export Bags with UV Stabilizer",
    moq: "Two 20 ft FCLs (50 Metric Tonnes)",
    destination: "Port Said, Alexandria, Colombo, Chittagong, Jebel Ali",
    regions: ["Middle East", "North Africa", "South Asia"],
    image:
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Purity: 99.5% by weight",
      "Foreign matter: Max 0.2%",
      "Damaged/discolored: Max 0.5%",
      "Moisture: Max 12.0%",
    ],
    compliance: ["Canadian Grain Commission Grading", "Phytosanitary Release"],
    tradeTerms: ["FOB Vancouver / Montreal", "CFR Destination Port", "L/C or CAD"],
  },

  // 02 Food & Beverages
  {
    slug: "ceylon-estate-black-tea",
    name: "Single-Estate Ceylon Black Tea (BOPF)",
    category: "Food & Beverages",
    categoryId: "food-beverages",
    origin: "Nuwara Eliya & Dimbula Highlands, Sri Lanka",
    grade: "Broken Orange Pekoe Fannings (High-Grown)",
    description:
      "High-grown orthodox black tea produced at altitudes exceeding 1,800 meters. Bright coppery liquor, delicate floral astringency, and high polyphenol content for master blending.",
    packaging: "45 kg Multi-ply aluminum-barrier kraft sacks / Bulk Tea Chests",
    moq: "3 Metric Tonnes",
    destination: "London, Hamburg, Dubai, Almaty, Toronto",
    regions: ["Europe", "Middle East", "Central Asia", "North America"],
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Elevation: 6,000 ft above sea level",
      "Liquor characteristic: Bright amber with copper ring",
      "Total ash: Max 6.5%",
      "Water soluble extract: Min 34%",
    ],
    compliance: ["Lion Logo Certified Pure Ceylon", "Rainforest Alliance / ISO 22000"],
    tradeTerms: ["FOB Colombo", "CIF Destination", "L/C 60 Days"],
  },
  {
    slug: "highland-arabica-coffee",
    name: "Specialty Grade-1 Green Arabica Coffee",
    category: "Food & Beverages",
    categoryId: "food-beverages",
    origin: "Yirgacheffe & Sidama, Ethiopian Highlands",
    grade: "Specialty Grade 1 (Washed, Screen 15+)",
    description:
      "Hand-picked and double-washed green unroasted coffee beans with notes of bergamot, jasmine, and citrus zest. Packed in hermetic GrainPro liners to safeguard moisture balance.",
    packaging: "60 kg Jute Sacks with internal GrainPro Hermetic Liners",
    moq: "One 20 ft FCL (300 bags / 18 Metric Tonnes)",
    destination: "Rotterdam, Genoa, Yokohama, Seattle, Melbourne",
    regions: ["Europe", "North America", "East Asia", "Oceania"],
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Cup score: 86.5+ SCAA standard",
      "Moisture: 10.5% – 11.5%",
      "Defects: Zero primary defects per 350g sample",
      "Screen size: 15/17 sorted",
    ],
    compliance: ["Ethiopian Coffee & Tea Authority Grading", "Fairtrade / Organic Optional"],
    tradeTerms: ["FOB Djibouti", "CIF Buyer Port", "L/C at Sight"],
  },
  {
    slug: "cold-pressed-fruit-purees",
    name: "Aseptic Alphonso Mango Puree & Concentrate",
    category: "Food & Beverages",
    categoryId: "food-beverages",
    origin: "Ratnagiri & Devgad, Maharashtra, India",
    grade: "Grade AA Aseptic Pulp (Min 28° Brix Concentrated)",
    description:
      "Pure pulp processed from ripened GI-tagged Alphonso mangoes without added sugar, preservatives, or colorants. Flash-sterilized and hermetically filled under sterile nitrogen.",
    packaging: "215 kg Aseptic bag in conical epoxy steel drums with tamper seals",
    moq: "80 Drums (One 20 ft FCL / 17.2 Metric Tonnes)",
    destination: "Rotterdam, Marseilles, Dubai, Singapore, Los Angeles",
    regions: ["Europe", "Middle East", "Southeast Asia", "North America"],
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Total soluble solids: 28° Brix minimum",
      "Acidity (as citric): 0.6% – 0.8%",
      "pH range: 3.8 to 4.2",
      "Color: Deep golden orange (Gardner score > 12)",
    ],
    compliance: ["US FDA Registered Facility", "BRCGS Food Safety Issue 9", "Halal & Kosher"],
    tradeTerms: ["FOB Nhava Sheva", "CFR Buyer Port", "Irrevocable L/C"],
  },

  // 03 Industrial Materials
  {
    slug: "cold-rolled-steel-coils",
    name: "Prime Cold-Rolled Steel Coils (CRC)",
    category: "Industrial Materials",
    categoryId: "industrial-materials",
    origin: "Pohang, South Korea / Nagoya, Japan",
    grade: "SPCC / DC01 deep-drawing quality according to EN 10130",
    description:
      "High-precision cold-reduced sheet steel with oiled surface finish, uniform gauge tolerance across width, and superior ductility for automotive stamping and appliance housings.",
    packaging: "Eye-to-sky / eye-to-wall waterproof VCI kraft wrap with steel edge rings",
    moq: "50 Metric Tonnes (Coil weights: 12 – 18 MT each)",
    destination: "Antwerp, Bilbao, Busan, Chennai, Houston",
    regions: ["Europe", "Asia", "North America"],
    image:
      "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Thickness range: 0.40mm – 2.50mm (Tolerance ±0.03mm)",
      "Coil width: 900mm – 1500mm",
      "Yield strength: 140 – 280 MPa",
      "Surface quality: Oiled light rust protection",
    ],
    compliance: ["EN 10204 3.1 Mill Test Certificate", "ISO 9001 / ISO 14001"],
    tradeTerms: ["FOB Korean/Japanese Ports", "CIF Major Ports", "L/C at Sight"],
  },
  {
    slug: "seamless-carbon-steel-pipes",
    name: "Heavy Seamless Carbon Steel Line Pipes",
    category: "Industrial Materials",
    categoryId: "industrial-materials",
    origin: "Duisburg, Germany / Vallourec Certified Mills",
    grade: "ASTM A106 Grade B / API 5L Grade X52 PSL2",
    description:
      "Hot-finished seamless pipes engineered for high-temperature service, refinery piping networks, and offshore hydrocarbons. Hydrostatically tested with full ultrasonic NDT.",
    packaging: "Hexagonal strapped steel bundles with bevel protector rings & end caps",
    moq: "25 Metric Tonnes",
    destination: "Dammam, Abu Dhabi, Port Klang, Lagos, Corpus Christi",
    regions: ["Middle East", "Southeast Asia", "Africa", "North America"],
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Nominal size: 2-inch to 24-inch OD",
      "Wall schedule: SCH 40 / SCH 80 / SCH 160",
      "Hydrostatic test: Up to 3,000 PSI held for 10 seconds",
      "Coating: External black mill varnish",
    ],
    compliance: ["API 5L Spec Monogram", "Ultrasonic & Magnetic Particle Reports"],
    tradeTerms: ["FOB European Port", "CIF Destination", "Irrevocable L/C"],
  },
  {
    slug: "architectural-aluminum-extrusions",
    name: "Structural Aluminum Alloy Sheets & Profiles",
    category: "Industrial Materials",
    categoryId: "industrial-materials",
    origin: "Dubai, UAE / Manisa, Turkey",
    grade: "AA 6063-T6 / Marine Grade 5052-H32",
    description:
      "Precision anodized and mill-finished structural alloy profiles and panels for curtain-wall facade engineering, marine transport, and structural industrial frameworks.",
    packaging: "Protective peel-off PE film interleafed in heavy timber export boxes",
    moq: "10 Metric Tonnes",
    destination: "London, Frankfurt, Sydney, Doha, Vancouver",
    regions: ["Europe", "Middle East", "Oceania", "North America"],
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Tensile strength: Min 215 MPa",
      "Anodizing thickness: Class 1 (15–20 microns)",
      "Standard length: 5.85m / 6.0m containerized",
      "Surface options: Clear anodized / Electrostatic powder coat",
    ],
    compliance: ["Qualicoat Approved", "EN 12020-2 Dimensional Precision"],
    tradeTerms: ["FOB Jebel Ali / Izmir", "CIF Destination", "T/T with Deposit"],
  },

  // 04 Machinery & Equipment
  {
    slug: "industrial-centrifugal-pumps",
    name: "High-Pressure Industrial Slurry & Chemical Pumps",
    category: "Machinery & Equipment",
    categoryId: "machinery-equipment",
    origin: "Stuttgart, Germany / Pune, India",
    grade: "ISO 5199 / API 610 Heavy Duty Industrial Standard",
    description:
      "Heavy-duty end-suction centrifugal pump assemblies with duplex stainless steel impellers, mechanical cartridge seals, and explosion-proof IE3 high-efficiency drive motors.",
    packaging: "ISPM-15 fumigated timber containment crate with vapor inhibitor bags",
    moq: "2 Complete Pump Units",
    destination: "Singapore, Rotterdam, Valparaiso, Durban, Perth",
    regions: ["Southeast Asia", "Europe", "South America", "Africa", "Oceania"],
    image:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Flow rate capacity: Up to 1,200 m³/hr",
      "Discharge head: Up to 160 meters",
      "Casing metallurgy: CF8M (316 SS) or CD4MCu duplex",
      "Operating temperature: -30°C to +220°C",
    ],
    compliance: ["CE Conformity Marking", "ATEX Explosion Proof Zone 1 Certified"],
    tradeTerms: ["FOB Hamburg / Mumbai", "DAP Jobsite Available", "L/C at Sight"],
  },
  {
    slug: "industrial-diesel-generators",
    name: "Acoustic Enclosed Prime Diesel Generator Sets",
    category: "Machinery & Equipment",
    categoryId: "machinery-equipment",
    origin: "Peterborough, UK / Istanbul, Turkey",
    grade: "500 kVA – 1500 kVA Prime Continuous Rating (50Hz / 60Hz)",
    description:
      "Heavy-duty prime power generator units powered by industrial turbocharged diesel engines with brushless alternators, digital synchronizing controllers, and soundproof IP54 enclosures.",
    packaging: "Heavy-duty structural steel skid with protective export heat-shrink wrap",
    moq: "1 Generator Unit",
    destination: "Nairobi, Accra, Jeddah, Colombo, Manila",
    regions: ["Africa", "Middle East", "South Asia", "Southeast Asia"],
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Prime power: 500 kVA / 400 kW at 1500 RPM",
      "Fuel consumption: 198 g/kWh at 75% load",
      "Sound attenuation: 68 dBA @ 7 meters",
      "Control module: DeepSea Electronics 8610 Auto-Mains Failure",
    ],
    compliance: ["ISO 8528 Standard", "Stage III A / Tier 3 Emission Compliant"],
    tradeTerms: ["FOB Felixstowe / Istanbul", "CIF African & Asian Ports", "L/C"],
  },
  {
    slug: "multi-axis-cnc-machining-center",
    name: "5-Axis High-Speed CNC Machining Center",
    category: "Machinery & Equipment",
    categoryId: "machinery-equipment",
    origin: "Taichung, Taiwan / Stuttgart, Germany",
    grade: "Ultra-Precision DIN 8615 Machine Tool Standard",
    description:
      "Simultaneous 5-axis vertical machining center engineered for aerospace impellers, medical components, and precision automotive dies. Direct-drive 18,000 RPM spindle.",
    packaging: "Moisture-barrier vacuum sealed aluminum foil inside reinforced timber crate",
    moq: "1 Machine Center",
    destination: "Hamburg, Chicago, Nagoya, Bangalore, Monterrey",
    regions: ["Europe", "North America", "East Asia", "South Asia"],
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Travel X/Y/Z: 850 × 700 × 500 mm",
      "Table diameter: 630mm with B/C rotary axes",
      "Spindle speed: 18,000 RPM (HSK-A63 tooling)",
      "Positioning accuracy: ±0.003mm",
    ],
    compliance: ["CE Machinery Directive 2006/42/EC", "Heidenhain / Siemens Control"],
    tradeTerms: ["FOB Keelung / Hamburg", "CIF Destination Port", "Irrevocable L/C"],
  },

  // 05 Automotive
  {
    slug: "forged-engine-components",
    name: "Forged Steel Engine Crankshafts & Connecting Rods",
    category: "Automotive",
    categoryId: "automotive",
    origin: "Aichi, Japan / Pune, India",
    grade: "IATF 16949 Certified / Micro-Alloy Forged Steel 42CrMo4",
    description:
      "Induction-hardened forged crankshafts and fracture-split connecting rods manufactured for medium- and heavy-duty commercial turbo-diesel engines.",
    packaging: "VCI Anti-Corrosion barrier bags nested in compartmentalized export cartons",
    moq: "250 Sets",
    destination: "Detroit, Stuttgart, Gothenburg, Curitiba, Shanghai",
    regions: ["North America", "Europe", "South America", "East Asia"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Material standard: 42CrMo4 forged alloy",
      "Journal surface hardness: HRC 54–58 (depth 2.5mm)",
      "Dynamic balance rating: ISO 1940 Grade G2.5",
      "Surface finish: Ra 0.2 microns on bearing journals",
    ],
    compliance: ["IATF 16949 Automotive Quality", "PPAP Level 3 Documentation"],
    tradeTerms: ["FOB Nagoya / Mumbai", "CIF Assembly Plant Port", "L/C at Sight"],
  },
  {
    slug: "ventilated-brake-rotors",
    name: "High-Carbon Ventilated Brake Disc Rotors",
    category: "Automotive",
    categoryId: "automotive",
    origin: "Brescia, Italy / Shandong, China",
    grade: "ECE R90 Certified / High-Carbon Grey Cast Iron GG20Cr",
    description:
      "Curved-vane directional ventilated brake disc rotors formulated with high thermal damping coefficients to eradicate thermal judder and fade in performance applications.",
    packaging: "Oil-treated inner box with anti-rust liner, 50 units per export euro pallet",
    moq: "500 Rotor Assemblies",
    destination: "Rotterdam, Felixstowe, Dubai, Los Angeles, Melbourne",
    regions: ["Europe", "Middle East", "North America", "Oceania"],
    image:
      "https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Disc diameter: 320mm – 410mm range",
      "Runout tolerance: Max 0.03mm across friction face",
      "Thickness variation (DTV): Under 0.008mm",
      "Coating: Geomet / zinc-aluminum anti-corrosion",
    ],
    compliance: ["ECE R90 Homologation", "TÜV Rheinland Audited Foundry"],
    tradeTerms: ["FOB Genoa / Qingdao", "CIF Port", "T/T 30/70 or L/C"],
  },
  {
    slug: "transmission-drive-gears",
    name: "Case-Hardened Precision Transmission & Bevel Gears",
    category: "Automotive",
    categoryId: "automotive",
    origin: "Bavaria, Germany / Bengaluru, India",
    grade: "DIN 3962 Class 6 Precision / Case-Hardened 20MnCr5",
    description:
      "Helical transmission gears and spiral bevel crown wheel & pinion gear sets with ground tooth profiles to ensure minimal gear whine and extended service lifetime.",
    packaging: "Protective preservative dip in molded high-density foam cells",
    moq: "300 Gear Sets",
    destination: "Gothenburg, Munich, Tokyo, Chicago, São Paulo",
    regions: ["Europe", "East Asia", "North America", "South America"],
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Case depth: 0.8mm – 1.2mm carburized",
      "Core hardness: HRC 32–40",
      "Surface hardness: HRC 58–62",
      "Tooth profile grinding: DIN Class 5/6",
    ],
    compliance: ["ISO 1328 Gear Accuracy Grade", "Material Traceability Certificates"],
    tradeTerms: ["FOB Hamburg / Chennai", "CIF Buyer Port", "L/C 60 Days"],
  },

  // 06 Packaging
  {
    slug: "corrugated-export-cartons",
    name: "Heavy-Duty Double-Wall Corrugated Export Cartons",
    category: "Packaging",
    categoryId: "packaging",
    origin: "Regional Pulp Mills / UAE & India Converting Plants",
    grade: "350# BC-Flute Double Wall (Bursting Strength > 2,200 kPa)",
    description:
      "Heavy virgin kraft liner corrugated export shippers engineered to endure humid marine transit and long ocean container voyages without wall compression or collapse.",
    packaging: "Flat-packed strapped bundles on pallets with corner edge-protectors",
    moq: "5,000 Units (Custom dimensions and flexo-printing available)",
    destination: "Jebel Ali, Dammam, Mombasa, Colombo, Singapore",
    regions: ["Middle East", "Africa", "South Asia", "Southeast Asia"],
    image:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Board grade: 250K / 150F / 150F / 150F / 250K",
      "Edge Crush Test (ECT): Min 14.5 kN/m",
      "Moisture resistance: Starch adhesive water-resistant treatment",
      "Print options: Up to 4-color water-based flexographic print",
    ],
    compliance: ["FSC Recycled / Mixed Certified", "FEFCO Container Standards"],
    tradeTerms: ["FOB Regional Ports", "CIF Destination", "T/T with Order"],
  },
  {
    slug: "ispm-15-wooden-pallets",
    name: "Heat-Treated ISPM-15 Euro & Standard Cargo Pallets",
    category: "Packaging",
    categoryId: "packaging",
    origin: "Riga, Latvia / Gdansk, Poland",
    grade: "EPAL 1 Certified Heat Treated (HT) European Standard",
    description:
      "Kiln-dried Scandinavian pine pallets heat treated to core temperature of 56°C for 30 minutes in accordance with IPPC ISPM-15 phytosanitary regulations.",
    packaging: "Nestable interlocked stacks (25 pallets per stack), strapped with weather shroud",
    moq: "One 40 ft High-Cube Container (550 Pallets) or Full Truckload",
    destination: "Rotterdam, Antwerp, Felixstowe, Hamburg, Le Havre",
    regions: ["Europe", "United Kingdom"],
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Dimensions: 1,200mm × 800mm × 144mm",
      "Safe working load: 1,500 kg dynamic / 4,000 kg static",
      "Moisture content: Under 20% post kiln drying",
      "Nails: EPAL approved certified screw nails",
    ],
    compliance: ["IPPC ISPM-15 Stamp with Registration Code", "EPAL Quality Audited"],
    tradeTerms: ["FOB Baltic Ports", "DAP European Distribution Hubs", "T/T or L/C"],
  },
  {
    slug: "industrial-stretch-film-rolls",
    name: "5-Layer Cast LLDPE High-Yield Machine Stretch Film",
    category: "Packaging",
    categoryId: "packaging",
    origin: "Pasir Gudang, Malaysia / Houston, USA",
    grade: "Cast 5-Layer LLDPE (20 Micron / 300% Pre-Stretch Capability)",
    description:
      "High-clarity cast stretch wrap with superior puncture and tear resistance. Engineered for automated high-speed orbital turntable pallet wrapping lines.",
    packaging: "4 rolls per corrugated carton / bulk slip-sheeted on export pallets",
    moq: "10 Pallets (500 Cartons / 2,000 Rolls)",
    destination: "Singapore, Sydney, Dubai, Rotterdam, Long Beach",
    regions: ["Southeast Asia", "Oceania", "Middle East", "Europe", "North America"],
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Film thickness: 17, 20, or 23 microns",
      "Roll width: 500mm standard",
      "Pre-stretch elongation: Guaranteed 300% minimum",
      "Cling: Differential one-side cling prevents pallet friction",
    ],
    compliance: ["100% Recyclable Category 4 (LDPE)", "RoHS / REACH Compliant"],
    tradeTerms: ["FOB Port Klang / Houston", "CIF Destination Port", "L/C at Sight"],
  },

  // 07 Chemical & Raw Materials
  {
    slug: "linear-alkyl-benzene",
    name: "Linear Alkyl Benzene (LAB) Surfactant Intermediate",
    category: "Chemical & Raw Materials",
    categoryId: "chemical-raw-materials",
    origin: "Jubail, Saudi Arabia / Dahej, India",
    grade: "Technical Pure Grade (Min 96.0% Active LAB Content)",
    description:
      "Colorless biodegradable synthetic alkylbenzene intermediate used globally as the primary raw material for Linear Alkylbenzene Sulfonate (LAS) detergent manufacturing.",
    packaging: "200L HDPE Drums (170 kg net) or 24,000L Stainless Steel ISO Tank Containers",
    moq: "One ISO Tank Container (24,000 Litres) or 80 Drums",
    destination: "Mombasa, Durban, Chittagong, Alexandria, Jakarta",
    regions: ["Africa", "South Asia", "Southeast Asia", "Middle East"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Active LAB content: Min 96.0% by weight",
      "Bromine index: Max 10 mg/100g",
      "Water content: Max 0.05%",
      "Color (Saybolt): Min +28",
    ],
    compliance: ["REACH Registered Substance", "ISO 9001 Manufacturer Certificate of Analysis"],
    tradeTerms: ["FOB Jubail / Dahej", "CFR Destination Port", "Irrevocable L/C"],
  },
  {
    slug: "refined-technical-glycerin",
    name: "Refined Pure Vegetable Glycerin (99.7% USP/FCC)",
    category: "Chemical & Raw Materials",
    categoryId: "chemical-raw-materials",
    origin: "Sumatra, Indonesia / Penang, Malaysia",
    grade: "USP / FCC / EP Grade 99.7% Pure Vegetable Source",
    description:
      "Odorless, water-white pharmaceutical and industrial grade refined glycerin derived strictly from sustainable non-GMO palm kernel oil and vegetable feedstock.",
    packaging: "250 kg epoxy-coated internal steel drums / 1,000L IBC Totes",
    moq: "One 20 ft FCL (80 Drums / 20 Metric Tonnes)",
    destination: "Hamburg, Genoa, Savannah, Santos, Busan",
    regions: ["Europe", "North America", "South America", "East Asia"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Glycerol content: Min 99.7%",
      "Specific gravity (25°C): Min 1.2612 g/cm³",
      "Heavy metals: Under 5 ppm",
      "Color (APHA): Max 10 (Water White)",
    ],
    compliance: [
      "USP / EP Pharmacopoeia Standard",
      "RSPO Supply Chain Certified",
      "Kosher & Halal",
    ],
    tradeTerms: ["FOB Belawan / Port Klang", "CIF Destination Port", "L/C at Sight"],
  },

  // 08 Textiles
  {
    slug: "combed-cotton-bales",
    name: "Raw Long-Staple Combed Cotton Bales",
    category: "Textiles",
    categoryId: "textiles",
    origin: "Gujarat & Maharashtra, India / West Africa",
    grade: "Shankar-6 / MCU-5 Grade (Staple Length 29mm – 31mm)",
    description:
      "Hand-picked natural white long-staple cotton ginned with minimal trash content. Excellent tensile strength and uniform micronaire for high-count ring spinning yarns.",
    packaging: "High-density export bales (approx. 170 kg each), strapped with wire bands",
    moq: "One 40 ft HC FCL (approx. 100 Bales / 17 Metric Tonnes)",
    destination: "Haiphong, Chittagong, Mersin, Port Said, Jakarta",
    regions: ["Southeast Asia", "South Asia", "Middle East", "Europe"],
    image:
      "https://images.unsplash.com/photo-1594824813571-638f06724d27?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Staple length: 29.5mm – 30.5mm (2.5% span length)",
      "Micronaire value: 3.8 – 4.2 NCL",
      "Fiber strength (g/tex): Min 29.5 g/tex",
      "Trash content: Under 2.5%",
    ],
    compliance: ["Cotton Corporation of India Grading", "Phytosanitary Fumigation"],
    tradeTerms: ["FOB Mundra", "CFR Asian & European Ports", "100% L/C at Sight"],
  },
  {
    slug: "organic-linen-canvas-rolls",
    name: "High-Density Organic Woven Linen & Canvas Fabrics",
    category: "Textiles",
    categoryId: "textiles",
    origin: "Flanders, Belgium / Guimarães, Portugal",
    grade: "OEKO-TEX Standard 100 / GOTS Certified (320 – 480 GSM)",
    description:
      "Heavyweight natural organic woven linen and tightly woven cotton duck canvas rolls. Exceptional tensile stability and natural textural aesthetics for upholstery, luggage, and workwear.",
    packaging: "Double PE poly-wrapped rolls with desiccant packs in heavy export tubes",
    moq: "2,000 Linear Meters",
    destination: "London, Milan, New York, Tokyo, Dubai",
    regions: ["Europe", "North America", "East Asia", "Middle East"],
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=85",
    specs: [
      "Fabric weight: 380 GSM (±5%)",
      "Fabric width: 145 cm – 150 cm usable",
      "Tensile strength warp/weft: 1,200 N / 950 N",
      "Yarn count: 10/2 × 10/2 Ne organic combed",
    ],
    compliance: ["GOTS (Global Organic Textile Standard)", "OEKO-TEX Class 1 Cleanliness"],
    tradeTerms: ["FOB Antwerp / Leixões", "CIF Destination", "T/T with Order"],
  },
];

const categoryImageUrls = categoryList.map((category) => category.heroImage);
const productImageUrls = products.map((product) => product.image);

if (new Set(categoryImageUrls).size !== categoryImageUrls.length) {
  throw new Error("Each product category must have a unique hero image.");
}

if (new Set(productImageUrls).size !== productImageUrls.length) {
  throw new Error("Each product must have a unique product image.");
}

if (productImageUrls.some((image) => categoryImageUrls.includes(image))) {
  throw new Error("Product images must not reuse category hero images.");
}
