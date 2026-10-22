import fs from 'fs';
import path from 'path';
import os from 'os';
import { Product, QuoteRequest, ContactMessage } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const TMP_DATA_DIR = path.join(os.tmpdir(), 'bbdautos-data');

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

const TMP_PRODUCTS_FILE = path.join(TMP_DATA_DIR, 'products.json');
const TMP_QUOTES_FILE = path.join(TMP_DATA_DIR, 'quotes.json');
const TMP_MESSAGES_FILE = path.join(TMP_DATA_DIR, 'messages.json');

function safeWriteJson(mainFile: string, tmpFile: string, data: any): void {
  const content = JSON.stringify(data, null, 2);
  // 1. Attempt writing to local project data dir (local dev, VPS, Docker)
  try {
    const dir = path.dirname(mainFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(mainFile, content, 'utf-8');
    return;
  } catch {
    // Expected on read-only environments like Vercel / AWS Lambda
  }

  // 2. Fallback writing to serverless /tmp writable directory
  try {
    const tmpDir = path.dirname(tmpFile);
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(tmpFile, content, 'utf-8');
  } catch (tmpErr) {
    console.warn('[Storage] Notice: unable to write to tmp file:', tmpErr);
  }
}

function safeReadJson<T>(mainFile: string, tmpFile: string, fallback: T): T {
  // 1. Check if updated copy exists in /tmp
  try {
    if (fs.existsSync(tmpFile)) {
      const raw = fs.readFileSync(tmpFile, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }

  // 2. Check bundled file in project repository
  try {
    if (fs.existsSync(mainFile)) {
      const raw = fs.readFileSync(mainFile, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }

  return fallback;
}

let memoryProducts: Product[] | null = null;
let memoryQuotes: QuoteRequest[] | null = null;
let memoryMessages: ContactMessage[] | null = null;

const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-chery-tiggo-8-pro-max",
    "slug": "chery-tiggo-8-pro-max",
    "name": "Chery Tiggo 8 Pro Max",
    "brand": "Chery",
    "category": "vehicles",
    "subcategory": "Executive SUV",
    "image": "/images/products/chery_tiggo_8_pro_max.jpg",
    "galleryImages": [
      "/images/products/chery_tiggo_8_pro_max.jpg",
      "/images/products/white_suv.jpg"
    ],
    "shortDescription": "Flagship 2.0L TGDI Turbo executive SUV combining supreme cabin luxury, advanced safety, and 254 HP performance.",
    "fullDescription": "The Chery Tiggo 8 Pro Max is engineered for corporate executives, high-tier fleet logistics, and luxury passenger transport across Nigeria. Powered by a potent 2.0L TGDI turbocharged petrol engine producing 254 HP (187 kW) and 390 Nm of torque paired with a smooth 7-Speed Dual Clutch Transmission (DCT). Equipped with panoramic sunroof, intelligent driver assistance systems, and flexible seating.",
    "specifications": {
      "Engine": "2.0L TGDI Turbo Petrol",
      "Max Power": "187 kW / 254 HP",
      "Max Torque": "390 Nm",
      "Transmission": "7-Speed Dual Clutch (DCT)",
      "Seating Capacity": "5 - 7 Passengers",
      "Drivetrain": "Front-Wheel Drive / Intelligent AWD",
      "Fuel Type": "Premium Unleaded Petrol",
      "Vehicle Type": "Executive Full-Size SUV"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T09:00:00Z"
  },
  {
    "id": "prod-changan-uni-t",
    "slug": "changan-uni-t",
    "name": "Changan UNI-T",
    "brand": "Changan",
    "category": "vehicles",
    "subcategory": "Crossover SUV",
    "image": "/images/products/changan_uni_t.jpg",
    "galleryImages": [
      "/images/products/changan_uni_t.jpg"
    ],
    "shortDescription": "Avant-garde futuristic crossover SUV featuring high fuel economy, aerodynamic styling, and cutting-edge digital infotainment.",
    "fullDescription": "The Changan UNI-T represents the next generation of modern commercial and personal mobility. Powered by an agile 1.5L Turbocharged Blue Core petrol engine delivering 300 Nm of torque through a 7-Speed wet dual-clutch transmission. Boasts striking geometric styling, concealed door handles, and comprehensive electronic stability control.",
    "specifications": {
      "Engine": "1.5L Turbo Petrol Blue Core",
      "Max Power": "117 HP / 138 kW",
      "Max Torque": "300 Nm",
      "Transmission": "7-Speed Wet DCT",
      "Seating Capacity": "5 Passengers",
      "Fuel Economy": "6.3L / 100km Combined",
      "Vehicle Type": "Modern Compact Crossover"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T09:30:00Z"
  },
  {
    "id": "prod-soueast-s07",
    "slug": "soueast-s07",
    "name": "Soueast S07",
    "brand": "Soueast",
    "category": "vehicles",
    "subcategory": "Mid-Size SUV",
    "image": "/images/products/soueast_s07.jpg",
    "galleryImages": [
      "/images/products/soueast_s07.jpg"
    ],
    "shortDescription": "Spacious and refined mid-size commercial SUV with 1.6L Turbo power, 8-speed transmission, and rugged suspension.",
    "fullDescription": "The Soueast S07 is tailored for reliable Nigerian road conditions, corporate travel, and family transport. Fitted with a 1.6L Turbocharged petrol engine pushing 197 HP (145 kW) and 390 Nm of torque through a robust 8-speed transmission, offering impressive hill climb and smooth expressway manners.",
    "specifications": {
      "Engine": "1.6L Turbo Petrol",
      "Max Power": "145 kW / 197 HP",
      "Max Torque": "390 Nm",
      "Transmission": "8-Speed Automatic",
      "Seating Capacity": "5 Passengers",
      "Brakes": "Front & Rear Ventilated Discs",
      "Vehicle Type": "Mid-Size Passenger SUV"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T10:00:00Z"
  },
  {
    "id": "prod-jetour-t2",
    "slug": "jetour-t2",
    "name": "Jetour T2",
    "brand": "Jetour",
    "category": "vehicles",
    "subcategory": "Rugged 4x4 SUV",
    "image": "/images/products/jetour_t2.jpg",
    "galleryImages": [
      "/images/products/jetour_t2.jpg"
    ],
    "shortDescription": "Tough, boxy all-terrain adventure SUV built with reinforced underbody protection, 254 HP turbo punch, and smart 4WD modes.",
    "fullDescription": "The Jetour T2 is an imposing, purpose-built all-terrain SUV created for site engineers, executive regional tours, and heavy-duty outdoor travel. Equipped with a 2.0L Turbocharged petrol engine producing 254 HP (187 kW) and 390 Nm torque, mated to a 7-Speed DCT and an automated BorgWarner electronic 4WD system with multi-terrain rock/mud selectors.",
    "specifications": {
      "Engine": "2.0L Turbo Petrol",
      "Max Power": "187 kW / 254 HP",
      "Max Torque": "390 Nm",
      "Transmission": "7-Speed DCT",
      "Drivetrain": "Intelligent 4WD with Multi-Terrain Select",
      "Seating Capacity": "5 Passengers",
      "Ground Clearance": "220 mm",
      "Vehicle Type": "Rugged All-Terrain SUV"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T10:30:00Z"
  },
  {
    "id": "prod-tata-xenon-x2",
    "slug": "tata-xenon-x2",
    "name": "Tata Xenon x2 Pickup",
    "brand": "Tata",
    "category": "vehicles",
    "subcategory": "Commercial Pickups",
    "image": "/images/products/tata_xenon_x2.jpg",
    "galleryImages": [
      "/images/products/tata_xenon_x2.jpg"
    ],
    "shortDescription": "Heavy-duty double cab commercial pickup with 1.2-tonne payload and reliable 497 Dicor turbo diesel power.",
    "fullDescription": "The Tata Xenon x2 is an established commercial workhorse built for agricultural transport, security patrol, and industrial field logistics. Powered by the venerable 497 Dicor turbo engine generating 148 HP with peak torque at 4000 rpm and a reinforced ladder-frame chassis capable of carrying 1.2 tonnes.",
    "specifications": {
      "Engine": "497 Dicor Turbo Diesel",
      "Max Power": "148 HP",
      "Max Torque": "Peak @ 4000 rpm",
      "Payload Capacity": "1.2 Tonnes",
      "Fuel Tank Capacity": "70 Litres",
      "Drive Configuration": "4x4 / 4x2 Heavy-Duty",
      "Body Style": "Double Cabin Pickup"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T11:00:00Z"
  },
  {
    "id": "prod-foton-tunland",
    "slug": "foton-tunland",
    "name": "Foton Tunland Pickup",
    "brand": "Foton",
    "category": "vehicles",
    "subcategory": "Commercial Pickups",
    "image": "/images/products/foton_tunland.jpg",
    "galleryImages": [
      "/images/products/foton_tunland.jpg"
    ],
    "shortDescription": "Rugged commercial utility pickup equipped with a 2.4L 4G69 engine and 1-tonne cargo bed capacity.",
    "fullDescription": "Built for demanding African operational environments, the Foton Tunland combines durable leaf-spring rear suspension with a proven 4G69 2.4L petrol engine delivering 135 HP at 3600 rpm. Features a 70-litre long-range tank and reinforced tie-down cargo points.",
    "specifications": {
      "Engine": "4G69 2.4L Petrol Engine",
      "Max Power": "135 HP",
      "Max Torque": "Peak @ 3600 rpm",
      "Payload Capacity": "1.0 Tonne",
      "Fuel Tank Capacity": "70 Litres",
      "Body Type": "Commercial Double Cab"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T11:30:00Z"
  },
  {
    "id": "prod-chery-himla",
    "slug": "chery-himla",
    "name": "Chery Himla Pickup",
    "brand": "Chery",
    "category": "vehicles",
    "subcategory": "Commercial Pickups",
    "image": "/images/products/chery_himla.jpg",
    "galleryImages": [
      "/images/products/chery_himla.jpg"
    ],
    "shortDescription": "Modern rugged commercial double-cab pickup truck with 158 HP output and 1-tonne cargo payload.",
    "fullDescription": "The Chery Himla combines modern executive styling with high-payload commercial utility. Powered by a responsive 2.4L petrol engine pushing 158 HP and 240 Nm of torque, backed by a 70-litre fuel capacity and heavy-duty rear bed.",
    "specifications": {
      "Engine": "2.4L Multi-Point Petrol Engine",
      "Max Power": "158 HP",
      "Max Torque": "240 Nm",
      "Payload Capacity": "1.0 Tonne",
      "Fuel Tank Capacity": "70 Litres",
      "Cabin": "Double Cabin 5-Seater"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T12:00:00Z"
  },
  {
    "id": "prod-foton-tm3",
    "slug": "foton-tm3",
    "name": "Foton TM3 Small Commercial Truck",
    "brand": "Foton",
    "category": "trucks",
    "subcategory": "Small Commercial Vehicles (SCV)",
    "image": "/images/products/foton_tm3.jpg",
    "galleryImages": [
      "/images/products/foton_tm3.jpg"
    ],
    "shortDescription": "Agile urban small commercial vehicle with 1.2-tonne payload and economical DAM 15R petrol engine.",
    "fullDescription": "The Foton TM3 is designed specifically for urban last-mile distribution, FMCG dispatch, market logistics, and express parcel transport. Featuring a DAM 15R 1.5L petrol engine delivering 105 HP and 3500 rpm torque, paired with a 1.2-tonne payload chassis and 50L fuel tank.",
    "specifications": {
      "Engine": "DAM 15R 1.5L Petrol Engine",
      "Max Power": "105 HP",
      "Max Torque": "Peak @ 3500 rpm",
      "Payload Capacity": "1.2 Tonnes",
      "Fuel Tank Capacity": "50 Litres",
      "Chassis Configuration": "Flatbed / Dropside / Box Body",
      "Vehicle Class": "SCV - Small Commercial Vehicle"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T12:30:00Z"
  },
  {
    "id": "prod-forland-2-ton",
    "slug": "forland-2-ton",
    "name": "Forland 2-Ton Light Cargo Truck",
    "brand": "Forland",
    "category": "trucks",
    "subcategory": "Small Commercial Vehicles (SCV)",
    "image": "/images/products/forland_2_ton.jpg",
    "galleryImages": [
      "/images/products/forland_2_ton.jpg"
    ],
    "shortDescription": "Heavy-duty 2-tonne dropside light truck with 2.5L diesel engine built for regional trade and haulage.",
    "fullDescription": "The Forland 2-Ton is an economical, high-torque light commercial carrier equipped with a durable 2.5L diesel engine pushing 95 HP and 240 Nm of torque. Designed with reinforced steel cargo sides and 60L diesel tank for daily commercial deliveries.",
    "specifications": {
      "Engine": "2.5L Industrial Diesel",
      "Max Power": "95 HP",
      "Max Torque": "240 Nm",
      "Payload Capacity": "2.0 Tonnes",
      "Fuel Tank Capacity": "60 Litres",
      "Body Type": "Dropside Cargo Bed"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T13:00:00Z"
  },
  {
    "id": "prod-tata-intra-v10",
    "slug": "tata-intra-v10",
    "name": "Tata Intra V10 Delivery Truck",
    "brand": "Tata",
    "category": "trucks",
    "subcategory": "Small Commercial Vehicles (SCV)",
    "image": "/images/products/tata_intra_v10.jpg",
    "galleryImages": [
      "/images/products/tata_intra_v10.jpg"
    ],
    "shortDescription": "Compact smart cargo van/truck designed with 798cc Dicor engine for ultra-low operational costs.",
    "fullDescription": "The Tata Intra V10 sets the benchmark for low-cost commercial goods distribution in dense urban commercial hubs like Lagos, Kano, and Ibadan. Engineered with a 798cc Dicor engine generating 40 HP and 3750 rpm, handling 1 tonne of payload with minimal diesel consumption.",
    "specifications": {
      "Engine": "798cc Dicor Diesel Engine",
      "Max Power": "40 HP",
      "Max Torque": "Peak @ 3750 rpm",
      "Payload Capacity": "1.0 Tonne",
      "Fuel Tank Capacity": "35 Litres",
      "Vehicle Class": "SCV - Small Commercial Vehicle"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T13:30:00Z"
  },
  {
    "id": "prod-tata-lpt1116",
    "slug": "tata-lpt1116",
    "name": "TATA LPT1116 Medium Freight Truck",
    "brand": "Tata",
    "category": "trucks",
    "subcategory": "Light Commercial Trucks (LCV)",
    "image": "/images/products/tata_lpt1116.jpg",
    "galleryImages": [
      "/images/products/tata_lpt1116.jpg"
    ],
    "shortDescription": "Workhorse 8-tonne medium cargo truck powered by 697 Diesel engine with 160L fuel capacity.",
    "fullDescription": "The TATA LPT1116 is one of the most proven mid-range cargo trucks in West Africa. Powered by a high-displacement 697 Diesel engine delivering 158 HP at 2400 rpm, an 8-tonne payload capacity, and heavy-duty leaf springs designed for interstate transport.",
    "specifications": {
      "Engine": "697 Turbo Diesel",
      "Max Power": "158 HP",
      "Max Torque": "Peak @ 2400 rpm",
      "Payload Capacity": "8.0 Tonnes",
      "Fuel Tank Capacity": "160 Litres",
      "Transmission": "6-Speed Manual Heavy-Duty",
      "Chassis Type": "Rigid Medium Cargo Hauler"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T14:00:00Z"
  },
  {
    "id": "prod-isuzu-npr",
    "slug": "isuzu-npr",
    "name": "ISUZU NPR Freight Truck",
    "brand": "Isuzu",
    "category": "trucks",
    "subcategory": "Light Commercial Trucks (LCV)",
    "image": "/images/products/isuzu_npr.jpg",
    "galleryImages": [
      "/images/products/isuzu_npr.jpg"
    ],
    "shortDescription": "World-renowned Japanese reliability: 5-tonne commercial freight truck with 4HG1 4570cc diesel powertrain.",
    "fullDescription": "The ISUZU NPR is legendary for extreme longevity, uptime, and high resale value. Built with the 4HG1 4.57L diesel engine producing 120 HP with substantial low-end torque, a 5-tonne payload capability, and standard 100L fuel capacity for reliable daily haulage.",
    "specifications": {
      "Engine": "4HG1 4570cc Inline-4 Diesel",
      "Max Power": "120 HP",
      "Displacement": "4570 cc",
      "Payload Capacity": "5.0 Tonnes",
      "Fuel Tank Capacity": "100 Litres",
      "Configuration": "4x2 Cab-Over-Engine"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T14:30:00Z"
  },
  {
    "id": "prod-faw-5-ton",
    "slug": "faw-5-ton",
    "name": "FAW 5-Ton Cargo Truck",
    "brand": "FAW",
    "category": "trucks",
    "subcategory": "Light Commercial Trucks (LCV)",
    "image": "/images/products/faw_5_ton.jpg",
    "galleryImages": [
      "/images/products/faw_5_ton.jpg"
    ],
    "shortDescription": "Modern 5-tonne commercial cargo carrier with 3.8L Diesel engine delivering 500 Nm torque.",
    "fullDescription": "The FAW 5-Ton medium truck delivers high productivity for building materials, beverage crate transport, and bulk goods. Powered by a 3.8L Diesel engine generating 150 HP and 500 Nm torque, matched with an efficient 120L fuel tank.",
    "specifications": {
      "Engine": "3.8L Turbo Diesel",
      "Max Power": "150 HP",
      "Max Torque": "500 Nm",
      "Payload Capacity": "5.0 Tonnes",
      "Fuel Tank Capacity": "120 Litres",
      "Vehicle Class": "LCV - Light Commercial Vehicle"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T15:00:00Z"
  },
  {
    "id": "prod-forland-8-ton",
    "slug": "forland-8-ton",
    "name": "FORLAND 8-Ton Heavy Hauler",
    "brand": "Forland",
    "category": "trucks",
    "subcategory": "Light Commercial Trucks (LCV)",
    "image": "/images/products/forland_8_ton.jpg",
    "galleryImages": [
      "/images/products/forland_8_ton.jpg"
    ],
    "shortDescription": "Heavy 8-tonne transport vehicle with 210 HP high-power engine and massive 760 Nm torque rating.",
    "fullDescription": "The FORLAND 8-Ton is a muscular, high-output commercial truck engineered for regional distribution and heavy freight. Features a 210 HP powerplant producing 760 Nm torque, 8 tonnes of payload capacity, and a 160L fuel reservoir for long haul journeys.",
    "specifications": {
      "Engine": "2.0L Turbo High-Output Powertrain",
      "Max Power": "210 HP",
      "Max Torque": "760 Nm",
      "Payload Capacity": "8.0 Tonnes",
      "Fuel Tank Capacity": "160 Litres",
      "Chassis": "Reinforced Dual-Axle Medium Cargo"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T15:30:00Z"
  },
  {
    "id": "prod-faw-lng",
    "slug": "faw-lng",
    "name": "FAW LNG Heavy Tractor Head",
    "brand": "FAW",
    "category": "trucks",
    "subcategory": "Heavy Commercial Trucks (HCV)",
    "image": "/images/products/faw_lng_tractor.jpg",
    "galleryImages": [
      "/images/products/faw_lng_tractor.jpg"
    ],
    "shortDescription": "Premier 80-tonne prime mover powered by WP13NG engine pushing 460 HP and 2300 Nm torque for severe haulage.",
    "fullDescription": "The FAW LNG heavy-duty prime mover is engineered for massive haulage operations including containerized port clearing, interstate fuel/cement transport, and multi-trailer logistics across Nigeria. Powered by the high-torque WP13NG engine generating 460 HP and 2300 Nm torque, rated for 80 tonnes total gross weight.",
    "specifications": {
      "Engine": "WP13NG Heavy-Duty Industrial Engine",
      "Max Power": "460 HP",
      "Max Torque": "2300 Nm",
      "Payload / GCW": "80 Tonnes",
      "Drive Configuration": "6x4 Heavy Prime Mover",
      "Cabin": "High-Roof Sleeper Cabin with AC",
      "Application": "Interstate Container Haulage & Heavy Logistics"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T16:00:00Z"
  },
  {
    "id": "prod-sino-howo-6x4",
    "slug": "sino-howo-6x4",
    "name": "SINO-HOWO 6X4 Heavy Cargo Truck",
    "brand": "Sinotruk HOWO",
    "category": "trucks",
    "subcategory": "Heavy Commercial Trucks (HCV)",
    "image": "/images/products/sino_howo_6x4.jpg",
    "galleryImages": [
      "/images/products/sino_howo_6x4.jpg"
    ],
    "shortDescription": "Nigeria's preferred heavy logistics hauler: 430 HP MT13.43 engine, 80-tonne rating, and 2080L fuel capacity.",
    "fullDescription": "The SINO-HOWO 6X4 is the undisputed champion of heavy freight and long-distance logistics on Nigerian corridors. Powered by the MT13.43 heavy diesel engine delivering 430 HP at 1900 rpm, paired with dual heavy driving axles, an 80-tonne payload rating, and a multi-tank setup totaling 2080L (260L x 8).",
    "specifications": {
      "Engine": "MT13.43 Heavy Diesel",
      "Max Power": "430 HP",
      "Max Torque": "Peak @ 1900 rpm",
      "Payload / GCW": "80 Tonnes",
      "Fuel Tank Capacity": "2080L (260L x 8 Tanks)",
      "Drive Configuration": "6x4 Dual Reduction Axles",
      "Cabin": "HW76 Sleeper Cab with Climate Control"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T16:30:00Z"
  },
  {
    "id": "prod-shacman-8x4",
    "slug": "shacman-8x4",
    "name": "SHACMAN 8X4 Heavy Tipper Dump Truck",
    "brand": "Shacman",
    "category": "trucks",
    "subcategory": "Heavy Commercial Trucks (HCV)",
    "image": "/images/products/shacman_8x4_tipper.jpg",
    "galleryImages": [
      "/images/products/shacman_8x4_tipper.jpg"
    ],
    "shortDescription": "Severe-duty 40-tonne 8x4 mining and construction tipper with Weichai WP12 430 HP powerplant.",
    "fullDescription": "The SHACMAN 8X4 Heavy-Duty Tipper is engineered for the harshest mining, quarry, and civil construction environments. Powered by the renowned Weichai WP12 12-Litre diesel engine pushing 430 HP and 2060 Nm torque through four heavy axles, tipping up to 40 tonnes of granite, sand, or earth.",
    "specifications": {
      "Engine": "Weichai WP12 12-Litre Turbo Diesel",
      "Max Power": "430 HP",
      "Max Torque": "2060 Nm",
      "Payload Capacity": "40 Tonnes",
      "Drive Configuration": "8x4 Heavy Tandem Axles",
      "Tipper Body": "Reinforced Manganese Steel Box",
      "Application": "Quarry, Civil Earthmoving & Road Works"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T17:00:00Z"
  },
  {
    "id": "prod-michelin-car-suv-tyre",
    "slug": "michelin-car-suv-tyre",
    "name": "Michelin Premium Passenger Car & SUV Radial Tyre",
    "brand": "Michelin",
    "category": "tyres",
    "subcategory": "Cars & SUVs Tyres",
    "image": "/images/products/michelin_car_suv_tyre.jpg",
    "galleryImages": [
      "/images/products/michelin_car_suv_tyre.jpg"
    ],
    "shortDescription": "World-class comfort, superior wet braking, and long tread life for passenger cars and executive SUVs.",
    "fullDescription": "Manufactured to Michelin's highest global safety standards, this premium passenger radial tyre delivers exceptional road grip, low rolling resistance for reduced fuel consumption, and optimized noise-reduction tread pattern.",
    "specifications": {
      "Brand": "Michelin",
      "Application": "Passenger Cars & Executive SUVs",
      "Available Sizes": "205/55R16, 215/60R17, 225/55R18, 235/60R18",
      "Tread Pattern": "Asymmetric All-Season Radial",
      "Speed Rating": "V / W (Up to 240 - 270 km/h)",
      "Warranty": "Manufacturer Quality Guaranteed"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T17:30:00Z"
  },
  {
    "id": "prod-bridgestone-car-suv-tyre",
    "slug": "bridgestone-car-suv-tyre",
    "name": "Bridgestone All-Terrain Highway Radial Tyre",
    "brand": "Bridgestone",
    "category": "tyres",
    "subcategory": "Cars & SUVs Tyres",
    "image": "/images/products/bridgestone_car_suv_tyre.jpg",
    "galleryImages": [
      "/images/products/bridgestone_car_suv_tyre.jpg"
    ],
    "shortDescription": "Rugged all-terrain radial tyre engineered for high-mileage highway endurance and tough Nigerian terrain.",
    "fullDescription": "Bridgestone delivers maximum puncture resistance and reinforced sidewalls with this all-terrain tyre, ideal for corporate pickups, SUVs, and cross-country transit.",
    "specifications": {
      "Brand": "Bridgestone",
      "Application": "SUVs & 4x4 Commercial Pickups",
      "Available Sizes": "245/70R16, 265/65R17, 265/60R18",
      "Tread Pattern": "Dualer All-Terrain (A/T)",
      "Ply Rating": "Reinforced Construction"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T18:00:00Z"
  },
  {
    "id": "prod-maxxis-car-suv-tyre",
    "slug": "maxxis-car-suv-tyre",
    "name": "Maxxis Commercial Heavy Ply Tyre",
    "brand": "Maxxis",
    "category": "tyres",
    "subcategory": "Cars & SUVs Tyres",
    "image": "/images/products/maxxis_car_suv_tyre.jpg",
    "galleryImages": [
      "/images/products/maxxis_car_suv_tyre.jpg"
    ],
    "shortDescription": "Heavy-duty commercial tyre built with high-ply casing for commercial transit buses and utility vans.",
    "fullDescription": "Maxxis commercial tyres provide outstanding durability under high load factors, resistance to irregular wear, and dependable wet weather traction.",
    "specifications": {
      "Brand": "Maxxis",
      "Application": "Commercial Vans & Utility Vehicles",
      "Available Sizes": "195R14C, 195R15C, 215/70R16C",
      "Ply Rating": "8PR / 10PR Commercial"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T18:30:00Z"
  },
  {
    "id": "prod-austone-suv-tyre",
    "slug": "austone-suv-tyre",
    "name": "Austone Rugged SUV Off-Road Mud Terrain Tyre",
    "brand": "Austone",
    "category": "tyres",
    "subcategory": "Cars & SUVs Tyres",
    "image": "/images/products/austone_suv_tyre.jpg",
    "galleryImages": [
      "/images/products/austone_suv_tyre.jpg"
    ],
    "shortDescription": "Aggressive deep-lug mud-terrain tyre for mining sites, construction projects, and severe off-road trails.",
    "fullDescription": "Austone off-road tyres feature self-cleaning shoulder blocks, heavy stone ejectors, and cut-and-chip resistant compound formulation.",
    "specifications": {
      "Brand": "Austone",
      "Application": "Mining, Exploration & Heavy 4x4 SUVs",
      "Available Sizes": "265/75R16, 285/75R16, 285/70R17",
      "Tread Pattern": "Mud-Terrain (M/T) Deep Lug"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T19:00:00Z"
  },
  {
    "id": "prod-apollo-car-tyre",
    "slug": "apollo-car-tyre",
    "name": "Apollo Endurace Long-Distance Radial Tyre",
    "brand": "Apollo",
    "category": "tyres",
    "subcategory": "Cars & SUVs Tyres",
    "image": "/images/products/apollo_car_tyre.jpg",
    "galleryImages": [
      "/images/products/apollo_car_tyre.jpg"
    ],
    "shortDescription": "Fuel-efficient passenger car radial delivering low road noise, responsive steering, and high mileage.",
    "fullDescription": "The Apollo passenger car range is designed for high fuel economy, reliable braking, and consistent wear across urban and interstate highways.",
    "specifications": {
      "Brand": "Apollo",
      "Application": "Sedans, Hatchbacks & Compact SUVs",
      "Available Sizes": "185/65R15, 195/65R15, 205/60R16",
      "Tread Pattern": "Highway Performance Radial"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T19:30:00Z"
  },
  {
    "id": "prod-ceat-truck-tyre",
    "slug": "ceat-truck-tyre",
    "name": "CEAT Winmile Heavy Commercial Truck Radial Tyre",
    "brand": "CEAT",
    "category": "tyres",
    "subcategory": "Trucks & Forklift Tyres",
    "image": "/images/products/ceat_truck_tyre.jpg",
    "galleryImages": [
      "/images/products/ceat_truck_tyre.jpg"
    ],
    "shortDescription": "Premium all-position heavy truck radial tyre offering high retreadability and ultra-low cost per kilometre.",
    "fullDescription": "CEAT Winmile radial truck tyres are trusted across major haulage fleets for robust steel belt construction, cooler running temperatures, and exceptional casing integrity.",
    "specifications": {
      "Brand": "CEAT",
      "Application": "Heavy Commercial Trucks & Long-Distance Trailers",
      "Available Sizes": "295/80R22.5, 315/80R22.5, 12R22.5",
      "Ply Rating": "18PR / 20PR Commercial",
      "Position": "All-Position / Steer / Drive"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T20:00:00Z"
  },
  {
    "id": "prod-gallant-truck-tyre",
    "slug": "gallant-truck-tyre",
    "name": "Gallant Heavy Haulage Highway Tyre",
    "brand": "Gallant",
    "category": "tyres",
    "subcategory": "Trucks & Forklift Tyres",
    "image": "/images/products/gallant_truck_tyre.jpg",
    "galleryImages": [
      "/images/products/gallant_truck_tyre.jpg"
    ],
    "shortDescription": "Engineered for high-mileage interstate cargo haulage with superior heat dissipation and casing durability.",
    "fullDescription": "Gallant commercial radial truck tyres provide heavy freight operators with high resistance to shoulder scrub and irregular wear on heavy container trailers.",
    "specifications": {
      "Brand": "Gallant",
      "Application": "Heavy Commercial Freight Trucks",
      "Available Sizes": "295/80R22.5, 315/80R22.5",
      "Ply Rating": "18PR Commercial Grade"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T20:30:00Z"
  },
  {
    "id": "prod-roadwing-truck-tyre",
    "slug": "roadwing-truck-tyre",
    "name": "Roadwing Mining & Construction Trailer Tyre",
    "brand": "Roadwing",
    "category": "tyres",
    "subcategory": "Trucks & Forklift Tyres",
    "image": "/images/products/roadwing_truck_tyre.jpg",
    "galleryImages": [
      "/images/products/roadwing_truck_tyre.jpg"
    ],
    "shortDescription": "Heavy-lug mining and earthworks construction radial built to withstand severe cuts, chips, and high payloads.",
    "fullDescription": "Roadwing tyres are engineered for dump trucks, tippers, and mining flatbeds working on mixed roads and unpaved terrain.",
    "specifications": {
      "Brand": "Roadwing",
      "Application": "Tippers, Dump Trucks & Quarry Operations",
      "Available Sizes": "12.00R20, 12.00R24, 315/80R22.5",
      "Ply Rating": "20PR Heavy Lug Construction"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T21:00:00Z"
  },
  {
    "id": "prod-bkt-heavy-lug-tyre",
    "slug": "bkt-heavy-lug-tyre",
    "name": "BKT Earthmax Heavy Industrial Lug Tyre",
    "brand": "BKT",
    "category": "tyres",
    "subcategory": "Trucks & Forklift Tyres",
    "image": "/images/products/bkt_heavy_lug_tyre.jpg",
    "galleryImages": [
      "/images/products/bkt_heavy_lug_tyre.jpg"
    ],
    "shortDescription": "Severe-duty industrial and agro-allied tractor lug tyre providing maximum traction on loose soil and rocky terrain.",
    "fullDescription": "BKT (Growing Together) is the global benchmark for agricultural, quarry, and industrial off-the-road (OTR) tyres. Equipped with reinforced non-directional tread lugs.",
    "specifications": {
      "Brand": "BKT",
      "Application": "Agricultural Tractors, Agro-Allied & Industrial Loaders",
      "Available Sizes": "10.00-20, 11.2-24, 16.9-28",
      "Tread Pattern": "Industrial Deep Lug Traction"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T21:30:00Z"
  },
  {
    "id": "prod-addo-india-forklift-tyre",
    "slug": "addo-india-forklift-tyre",
    "name": "Addo India Forklift & Port Material Handling Tyre",
    "brand": "Addo India",
    "category": "tyres",
    "subcategory": "Trucks & Forklift Tyres",
    "image": "/images/products/addo_india_forklift_tyre.jpg",
    "galleryImages": [
      "/images/products/addo_india_forklift_tyre.jpg"
    ],
    "shortDescription": "Heavy pneumatic and solid industrial forklift tyre engineered for container terminals and warehouses.",
    "fullDescription": "Addo India provides ultra-durable pneumatic and resilient forklift tyres designed to withstand continuous 24/7 warehouse, factory, and port operations.",
    "specifications": {
      "Brand": "Addo India",
      "Application": "Forklifts, Material Handlers & Airport Baggage Tugs",
      "Available Sizes": "6.00-9, 7.00-12, 8.25-15",
      "Type": "Pneumatic / Solid Resilient Options"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T22:00:00Z"
  },
  {
    "id": "prod-solideal-solid-industrial-tyre",
    "slug": "solideal-solid-industrial-tyre",
    "name": "Solideal Industrial Heavy-Duty Forklift Solid Tyre",
    "brand": "Solideal",
    "category": "tyres",
    "subcategory": "Trucks & Forklift Tyres",
    "image": "/images/products/solideal_solid_industrial_tyre.jpg",
    "galleryImages": [
      "/images/products/solideal_solid_industrial_tyre.jpg"
    ],
    "shortDescription": "100% puncture-proof solid industrial tyre for scrap yards, heavy manufacturing plants, and logistics hubs.",
    "fullDescription": "Solideal (The Natural Choice) represents the highest tier of resilient 3-stage solid industrial tyres. Zero downtime, zero punctures, and massive tread lifespan under maximum tonnage.",
    "specifications": {
      "Brand": "Solideal",
      "Application": "Heavy Forklifts, Port Reach Stackers & Foundries",
      "Available Sizes": "28x9-15, 8.25-15, 300-15",
      "Construction": "3-Stage Solid Rubber Resilient"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T22:30:00Z"
  },
  {
    "id": "prod-solite-automotive-battery",
    "slug": "solite-automotive-battery",
    "name": "Solite Premium Automotive Starting Battery",
    "brand": "Solite",
    "category": "batteries",
    "subcategory": "Automotive & Commercial Batteries",
    "image": "/images/products/solite_automotive_battery.jpg",
    "galleryImages": [
      "/images/products/solite_automotive_battery.jpg"
    ],
    "shortDescription": "Maintenance-free calcium starting battery delivering strong cold cranking amps (CCA) in tropical climates.",
    "fullDescription": "Solite automotive batteries are original equipment (OEM) grade, engineered with calcium-lead alloy plates for high heat tolerance, zero water topping requirement, and extended operational life across Nigerian roads.",
    "specifications": {
      "Brand": "Solite",
      "Application": "Passenger Cars, SUVs & Light Pickups",
      "Voltage / Capacity": "12V 75Ah / 90Ah / 100Ah",
      "Technology": "Sealed Maintenance-Free (SMF) Calcium",
      "Warranty": "12 Months Replacement Warranty"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T23:00:00Z"
  },
  {
    "id": "prod-rocket-heavy-duty-battery",
    "slug": "rocket-heavy-duty-battery",
    "name": "Rocket Heavy-Duty Commercial Truck Battery",
    "brand": "Rocket",
    "category": "batteries",
    "subcategory": "Automotive & Commercial Batteries",
    "image": "/images/products/rocket_heavy_duty_battery.jpg",
    "galleryImages": [
      "/images/products/rocket_heavy_duty_battery.jpg"
    ],
    "shortDescription": "Heavy fleet 200Ah commercial battery with extreme vibration resistance and high cyclic power for heavy trucks.",
    "fullDescription": "Rocket heavy commercial batteries are built to handle the intense electrical demands of sleeper cabs, heavy-duty prime movers (Sinotruk HOWO, Shacman, FAW), and commercial diesel generators.",
    "specifications": {
      "Brand": "Rocket",
      "Application": "Heavy Commercial Trucks, Prime Movers & Fleet Haulage",
      "Voltage / Capacity": "12V 150Ah / 200Ah",
      "Plate Structure": "Heavy Reinforced Grid with Fiberglass Separators",
      "Cold Cranking Amps (CCA)": "1200+ CCA"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-28T23:30:00Z"
  },
  {
    "id": "prod-bosch-commercial-battery",
    "slug": "bosch-commercial-battery",
    "name": "Bosch High-Performance Commercial Battery",
    "brand": "Bosch",
    "category": "batteries",
    "subcategory": "Automotive & Commercial Batteries",
    "image": "/images/products/bosch_commercial_battery.jpg",
    "galleryImages": [
      "/images/products/bosch_commercial_battery.jpg"
    ],
    "shortDescription": "German-engineered silver alloy battery providing dependable starting power for corporate fleets.",
    "fullDescription": "Bosch commercial batteries feature patented PowerFrame grid technology for superior current flow and corrosion resistance, maximizing electrical uptime for executive fleets and distribution trucks.",
    "specifications": {
      "Brand": "Bosch",
      "Application": "Corporate Vehicles, SUVs & Commercial Fleets",
      "Voltage / Capacity": "12V 80Ah / 100Ah",
      "Technology": "Silver-Calcium PowerFrame Grid",
      "Origin": "German Automotive Standards"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-29T00:00:00Z"
  },
  {
    "id": "prod-runall-car-battery",
    "slug": "runall-car-battery",
    "name": "Runall Commercial Vehicle Battery",
    "brand": "Runall",
    "category": "batteries",
    "subcategory": "Automotive & Commercial Batteries",
    "image": "/images/products/runall_car_battery.jpg",
    "galleryImages": [
      "/images/products/runall_car_battery.jpg"
    ],
    "shortDescription": "Economical and robust commercial starter battery with high thermal stability and shock resistance.",
    "fullDescription": "Runall commercial vehicle batteries provide cost-conscious fleet owners with reliable ignition performance, heavy-duty polypropylene casing, and consistent discharge curves.",
    "specifications": {
      "Brand": "Runall",
      "Application": "Taxis, Commercial Buses, Pickups & Vans",
      "Voltage / Capacity": "12V 65Ah / 75Ah",
      "Maintenance": "Sealed Calcium Maintenance-Free"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-29T00:30:00Z"
  },
  {
    "id": "prod-sebang-maintenance-free-battery",
    "slug": "sebang-maintenance-free-battery",
    "name": "Sebang Global Maintenance-Free Commercial Battery",
    "brand": "Sebang",
    "category": "batteries",
    "subcategory": "Automotive & Commercial Batteries",
    "image": "/images/products/sebang_maintenance_free_battery.jpg",
    "galleryImages": [
      "/images/products/sebang_maintenance_free_battery.jpg"
    ],
    "shortDescription": "Renowned Korean industrial battery delivering exceptional starting punch, zero acid leakage, and long cyclic resilience.",
    "fullDescription": "Sebang Global batteries deliver high-rate discharge efficiency and rugged anti-vibration container construction. Engineered specifically for demanding multi-shift delivery vans, commercial transport buses, and heavy agricultural equipment across Nigeria.",
    "specifications": {
      "Brand": "Sebang",
      "Application": "Commercial Buses, Light Trucks & Industrial Equipment",
      "Voltage / Capacity": "12V 75Ah / 100Ah / 150Ah",
      "Technology": "Sealed Maintenance-Free (SMF) Calcium-Tin Alloy",
      "Origin": "South Korea",
      "Warranty": "12 Months Manufacturer Warranty"
    },
    "featured": true,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-29T01:00:00Z"
  },
  {
    "id": "prod-everstart-premium-battery",
    "slug": "everstart-premium-battery",
    "name": "EverStart Premium Heavy-Duty Fleet Battery",
    "brand": "EverStart",
    "category": "batteries",
    "subcategory": "Automotive & Commercial Batteries",
    "image": "/images/products/everstart_premium_battery.jpg",
    "galleryImages": [
      "/images/products/everstart_premium_battery.jpg"
    ],
    "shortDescription": "Top-tier high CCA starting battery designed for heavy diesel cranking, intense heat cycles, and fleet reliability.",
    "fullDescription": "EverStart Heavy-Duty commercial batteries are built to exceed strict commercial fleet ignition requirements. Featuring reinforced radial grid plates, impact-resistant polypropylene casing, and high reserve capacity for demanding electronics and heavy diesel engines.",
    "specifications": {
      "Brand": "EverStart",
      "Application": "Heavy Diesel Trucks, Fleet Haulage & SUVs",
      "Voltage / Capacity": "12V 100Ah / 120Ah / 200Ah",
      "Cold Cranking Amps (CCA)": "1000+ CCA",
      "Plate Technology": "Reinforced Cast-on Strap & Calcium Alloy",
      "Warranty": "12 Months Fleet Warranty"
    },
    "featured": false,
    "inStock": true,
    "published": true,
    "createdAt": "2026-01-29T01:30:00Z"
  }
];

export function getProducts(): Product[] {
  if (memoryProducts && memoryProducts.length > 0) {
    return memoryProducts;
  }
  const loaded = safeReadJson<Product[]>(PRODUCTS_FILE, TMP_PRODUCTS_FILE, INITIAL_PRODUCTS);
  memoryProducts = loaded && loaded.length > 0 ? loaded : INITIAL_PRODUCTS;
  return memoryProducts;
}

export function saveProducts(products: Product[]): void {
  memoryProducts = products;
  safeWriteJson(PRODUCTS_FILE, TMP_PRODUCTS_FILE, products);
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug || p.id === slug);
}

export function saveProduct(product: Product): Product {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.unshift(product);
  }
  saveProducts(products);
  return product;
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length !== products.length) {
    saveProducts(filtered);
    return true;
  }
  return false;
}

export function getQuotes(): QuoteRequest[] {
  if (memoryQuotes && memoryQuotes.length > 0) {
    return memoryQuotes;
  }
  const loaded = safeReadJson<QuoteRequest[]>(QUOTES_FILE, TMP_QUOTES_FILE, []);
  memoryQuotes = loaded;
  return loaded;
}

export function saveQuotes(quotes: QuoteRequest[]): void {
  memoryQuotes = quotes;
  safeWriteJson(QUOTES_FILE, TMP_QUOTES_FILE, quotes);
}

export function getQuoteById(id: string): QuoteRequest | undefined {
  const quotes = getQuotes();
  return quotes.find(q => q.id.toUpperCase() === id.toUpperCase());
}

export function createQuote(data: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
  const quotes = getQuotes();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = 'RFQ-2026-' + randomSuffix;
  const newQuote: QuoteRequest = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
    status: 'New',
    internalNotes: []
  };
  quotes.unshift(newQuote);
  saveQuotes(quotes);
  return newQuote;
}

export function updateQuoteStatus(id: string, status: QuoteRequest['status'], note?: string): QuoteRequest | undefined {
  const quotes = getQuotes();
  const quote = quotes.find(q => q.id.toUpperCase() === id.toUpperCase());
  if (!quote) return undefined;

  quote.status = status;
  if (!quote.history) quote.history = [];
  quote.history.push({
    status,
    changedAt: new Date().toISOString(),
    note
  });
  if (note) {
    if (!quote.internalNotes) quote.internalNotes = [];
    quote.internalNotes.push({
      date: new Date().toISOString(),
      text: note,
      author: 'Admin'
    });
  }
  saveQuotes(quotes);
  return quote;
}

export function addQuoteNote(id: string, text: string, author: string = 'Admin'): QuoteRequest | undefined {
  const quotes = getQuotes();
  const quote = quotes.find(q => q.id.toUpperCase() === id.toUpperCase());
  if (!quote) return undefined;
  if (!quote.internalNotes) quote.internalNotes = [];
  quote.internalNotes.push({
    date: new Date().toISOString(),
    text,
    author
  });
  saveQuotes(quotes);
  return quote;
}

export function getMessages(): ContactMessage[] {
  if (memoryMessages && memoryMessages.length > 0) {
    return memoryMessages;
  }
  const loaded = safeReadJson<ContactMessage[]>(MESSAGES_FILE, TMP_MESSAGES_FILE, []);
  memoryMessages = loaded;
  return loaded;
}

export function saveMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  const messages = getMessages();
  const msg: ContactMessage = {
    ...data,
    id: 'MSG-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'Unread'
  };
  messages.unshift(msg);
  memoryMessages = messages;
  safeWriteJson(MESSAGES_FILE, TMP_MESSAGES_FILE, messages);
  return msg;
}
