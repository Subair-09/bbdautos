import fs from 'fs';
import path from 'path';
import { Product, QuoteRequest, ContactMessage } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const QUOTES_FILE = path.join(DATA_DIR, 'quotes.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-truck-tyre-295-80r22',
    slug: 'truck-tyre-295-80r22-5',
    name: 'Truck Tyre',
    brand: 'Premium Brand',
    category: 'tyres',
    subcategory: 'Commercial Radial',
    image: '/images/products/commercial_truck_tyre.jpg',
    galleryImages: [
      '/images/products/commercial_truck_tyre.jpg',
      '/images/detail_tyre.jpg',
      '/images/feat_tyre.jpg'
    ],
    shortDescription: 'High-performance truck tyre designed for durability, load carrying capacity and excellent road grip. Suitable for long-haul and regional transport.',
    fullDescription: 'The Premium Brand 295/80R22.5 Radial Truck Tyre is engineered specifically for the demanding highway, inter-state and mixed-road conditions across Nigeria. It features an advanced wear-resistant tread compound and reinforced casing for enhanced mileage, resistance to punctures, and superior heat dissipation under heavy commercial cargo loads.',
    specifications: {
      'Type': 'Radial',
      'Size': '295/80R22.5',
      'Load Index': '152/148',
      'Speed Rating': 'M (130 km/h)',
      'Pattern': 'Highway / All-Position Rib',
      'Ply Rating': '18PR',
      'Standard Rim': '9.00 x 22.5',
      'Max Pressure': '900 kPa'
    },
    featured: true,
    inStock: true,
    published: true,
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'prod-heavy-duty-truck-6x4',
    slug: 'heavy-duty-truck-6x4-cargo',
    name: 'Heavy-Duty Truck',
    brand: 'Reliable Brand',
    category: 'trucks',
    subcategory: 'Cargo & Haulage',
    image: '/images/hero/red_heavy_truck_hd.jpg',
    galleryImages: [
      '/images/hero/red_heavy_truck_hd.jpg',
      '/images/cat_trucks.jpg',
      '/images/feat_truck.jpg'
    ],
    shortDescription: 'Reliable 6x4 heavy-duty commercial truck designed for logistics, construction, haulage and cross-country transport across Nigeria.',
    fullDescription: 'The Reliable Brand 6x4 Heavy-Duty Cargo Truck combines robust chassis engineering with high-torque diesel powertrain efficiency. Built with reinforced suspension and dual driving rear axles, this vehicle is configured for heavy haulage containers, flatbeds, and high-payload commercial logistics operations.',
    specifications: {
      'Model': '6x4 Cargo Hauler',
      'Engine Power': '420 HP Turbocharged Diesel',
      'Transmission': '12-Speed Manual with Overdrive',
      'Drive Configuration': '6x4 Dual Drive Axles',
      'Payload Capacity': '35 - 45 Tonnes',
      'Wheelbase': '3800 + 1350 mm',
      'Fuel Tank': '600L Aluminium Long-Haul',
      'Cabin': 'High-Roof Sleeper with Air Conditioning'
    },
    featured: true,
    inStock: true,
    published: true,
    createdAt: '2026-01-16T10:00:00Z'
  },
  {
    id: 'prod-suv-4x4-commercial',
    slug: 'premium-suv-4x4-executive',
    name: 'SUV',
    brand: 'Premium Brand',
    category: 'vehicles',
    subcategory: 'Executive & Fleet SUV',
    image: '/images/products/white_suv.jpg',
    galleryImages: [
      '/images/products/white_suv.jpg',
      '/images/feat_suv.jpg',
      '/images/cat_vehicles.jpg'
    ],
    shortDescription: 'Premium 4x4 executive SUV offering comfort, reliability, and all-terrain performance for corporate fleets and executive mobility.',
    fullDescription: 'Designed for durability and executive comfort, this 4x4 SUV is equipped with a high-clearance frame, robust all-wheel drive transmission, and modern passenger amenities. Ideal for site inspections, regional travel, and corporate executive transport across Nigeria.',
    specifications: {
      'Model': '4x4 Executive',
      'Vehicle Type': 'Full-Size SUV',
      'Drivetrain': 'Full-Time 4WD with Low Range',
      'Seating Capacity': '7 Passengers',
      'Engine': 'V6 Petrol / Turbo Diesel',
      'Transmission': '8-Speed Automatic',
      'Fuel Tank': '87L Capacity'
    },
    featured: true,
    inStock: true,
    published: true,
    createdAt: '2026-01-17T11:00:00Z'
  },
  {
    id: 'prod-commercial-van-15-seater',
    slug: 'commercial-van-15-seater-passenger',
    name: 'Commercial Van',
    brand: 'Reliable Brand',
    category: 'vehicles',
    subcategory: 'Passenger Transport',
    image: '/images/products/commercial_van.jpg',
    galleryImages: [
      '/images/products/commercial_van.jpg',
      '/images/feat_van.jpg'
    ],
    shortDescription: 'High-roof 15-seater commercial passenger van engineered for interstate transit, staff transport, and commercial shuttle services.',
    fullDescription: 'The Reliable Brand 15-Seater Commercial Van offers unmatched passenger comfort, high ceiling clearance, heavy-duty suspension, and proven fuel economy. It is the premier choice for Nigerian transport operators, schools, private logistics, and corporate employee transport.',
    specifications: {
      'Model': '15 Seater High Roof',
      'Vehicle Type': 'Passenger Van',
      'Engine': '2.8L Turbo Diesel Common Rail',
      'Seating Capacity': '15 Passengers',
      'Transmission': '5-Speed Manual Heavy-Duty',
      'Air Conditioning': 'Dual Zone Front & Rear Blowers',
      'Safety': 'ABS, Dual Airbags, Reinforced Pillar Body'
    },
    featured: true,
    inStock: true,
    published: true,
    createdAt: '2026-01-18T12:00:00Z'
  },
  {
    id: 'prod-bus-tyre-315-80r22',
    slug: 'bus-tyre-315-80r22-5',
    name: 'Bus Tyre',
    brand: 'Premium Brand',
    category: 'tyres',
    subcategory: 'Coach & Heavy Bus',
    image: '/images/products/commercial_truck_tyre.jpg',
    galleryImages: [
      '/images/products/commercial_truck_tyre.jpg',
      '/images/detail_tyre.jpg'
    ],
    shortDescription: 'Heavy-duty long-distance bus tyre engineered for high passenger safety, smooth ride, and high heat resistance on expressways.',
    fullDescription: 'Engineered specifically for intercity passenger coaches and transit buses. Low rolling resistance minimizes operational fuel costs while multi-siped tread patterns offer maximum stopping power on both wet and dry paved roads.',
    specifications: {
      'Type': 'Radial',
      'Size': '315/80R22.5',
      'Load Index': '156/150',
      'Speed Rating': 'L',
      'Pattern': 'Steer / All-Position Coach Rib',
      'Ply Rating': '20PR',
      'Standard Rim': '9.00 x 22.5'
    },
    featured: false,
    inStock: true,
    published: true,
    createdAt: '2026-01-19T14:00:00Z'
  },
  {
    id: 'prod-pickup-truck-4x4',
    slug: 'pickup-truck-4x4-double-cabin',
    name: 'Pickup Truck',
    brand: 'Reliable Brand',
    category: 'vehicles',
    subcategory: 'Commercial Utility',
    image: '/images/cat_vehicles.jpg',
    galleryImages: [
      '/images/cat_vehicles.jpg',
      '/images/feat_suv.jpg'
    ],
    shortDescription: 'Robust 4x4 double-cabin pickup truck built for field operations, construction teams, cargo hauling, and rugged road access.',
    fullDescription: 'A workhorse vehicle designed for commercial and industrial demands. Features a reinforced steel cargo bed, electronic 4WD selector, heavy-duty leaf spring rear suspension, and 1-tonne carrying capacity.',
    specifications: {
      'Model': '4x4 Double Cabin',
      'Vehicle Type': 'Pick-up Utility',
      'Engine': '2.5L Diesel Intercooled Turbo',
      'Transmission': '6-Speed Manual',
      'Towing Capacity': '3,000 kg',
      'Cargo Bed Length': '1,525 mm',
      'Ground Clearance': '235 mm'
    },
    featured: false,
    inStock: true,
    published: true,
    createdAt: '2026-01-20T15:00:00Z'
  },
  {
    id: 'prod-heavy-tipper-truck-380',
    slug: 'heavy-duty-tipper-truck-6x4-380hp',
    name: 'Heavy-Duty Tipper Truck',
    brand: 'Reliable Brand',
    category: 'trucks',
    subcategory: 'Construction & Mining',
    image: '/images/hero/red_heavy_truck_hd.jpg',
    galleryImages: [
      '/images/hero/red_heavy_truck_hd.jpg',
      '/images/cat_trucks.jpg'
    ],
    shortDescription: 'Rugged 6x4 dump truck designed for gravel, sand, mining and heavy infrastructure construction projects.',
    fullDescription: 'Engineered for extreme off-road quarry and site operations. Features high-tensile steel tipping bucket, hydraulic front-lift ram, heavy-duty planetary hub-reduction drive axles, and heavy chassis reinforcement.',
    specifications: {
      'Model': '6x4 Tipper / Dump',
      'Engine Power': '380 HP High Torque Diesel',
      'Dump Box Volume': '18 - 20 m³',
      'Axle Type': 'Hub Reduction 16-Tonne Rear Axles',
      'Tipping Mechanism': 'Hyva Front Hydraulic Ram',
      'Payload': '30 Tonnes'
    },
    featured: false,
    inStock: true,
    published: true,
    createdAt: '2026-01-21T16:00:00Z'
  },
  {
    id: 'prod-tyre-1200r20-heavy-lug',
    slug: 'tyre-1200r20-heavy-lug-construction',
    name: 'Heavy Lug Mining & Construction Tyre',
    brand: 'Premium Brand',
    category: 'tyres',
    subcategory: 'Off-Road & Construction',
    image: '/images/cat_tyres.jpg',
    galleryImages: [
      '/images/cat_tyres.jpg',
      '/images/products/commercial_truck_tyre.jpg'
    ],
    shortDescription: 'Extra deep tread heavy-lug tube-type radial tyre for tipper trucks, mining trucks, and rough road construction.',
    fullDescription: 'Specially engineered for aggressive cut, chip and chunk resistance. The deep transversal block pattern delivers superior traction in mud, loose gravel, and unpaved haul roads throughout Nigeria.',
    specifications: {
      'Type': 'Tube-Type Radial with Flap & Tube',
      'Size': '12.00R20',
      'Ply Rating': '20PR',
      'Tread Depth': '22 mm Heavy Lug',
      'Max Load Single': '4,000 kg',
      'Standard Rim': '8.50-20'
    },
    featured: false,
    inStock: true,
    published: true,
    createdAt: '2026-01-22T17:00:00Z'
  }
];

export function getProducts(): Product[] {
  ensureDataDir();
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(INITIAL_PRODUCTS, null, 2), 'utf-8');
    return INITIAL_PRODUCTS;
  }
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products:', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  ensureDataDir();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
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
  ensureDataDir();
  if (!fs.existsSync(QUOTES_FILE)) {
    // Seed sample demonstration quotes for realistic admin review
    const sampleQuotes: QuoteRequest[] = [
      {
        id: 'RFQ-2026-1042',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        status: 'New',
        companyName: 'Dangote Transport & Logistics',
        businessType: 'Fleet Logistics Operator',
        fullName: 'Alhaji Ibrahim Musa',
        email: 'i.musa@dangotegroup-sample.com',
        phone: '+234 803 456 7890',
        deliveryLocation: 'Ikeja Depot, Lagos State',
        additionalNotes: 'Urgent bulk requirement for Q1 fleet maintenance. Delivery required in Lagos within 10 days.',
        items: [
          {
            productId: 'prod-truck-tyre-295-80r22',
            name: 'Truck Tyre',
            brand: 'Premium Brand',
            category: 'tyres',
            specificationSummary: '295/80R22.5 · Radial',
            image: '/images/products/commercial_truck_tyre.jpg',
            quantity: 40,
            slug: 'truck-tyre-295-80r22-5'
          },
          {
            productId: 'prod-heavy-duty-truck-6x4',
            name: 'Heavy-Duty Truck',
            brand: 'Reliable Brand',
            category: 'trucks',
            specificationSummary: '6x4 · Cargo',
            image: '/images/hero/red_heavy_truck_hd.jpg',
            quantity: 2,
            slug: 'heavy-duty-truck-6x4-cargo'
          }
        ],
        internalNotes: [
          {
            date: new Date(Date.now() - 3600000 * 2).toISOString(),
            text: 'Verified client entity. Spoke with procurement head regarding tyre specs.',
            author: 'Sales Desk'
          }
        ]
      },
      {
        id: 'RFQ-2026-1039',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'Quotation Sent',
        companyName: 'Julius Berger Civil Works',
        businessType: 'Construction & Civil Engineering',
        fullName: 'Engr. Babatunde Adeleke',
        email: 'babatunde.adeleke@jb-sample.com',
        phone: '+234 802 334 1122',
        deliveryLocation: 'Abuja Central Terminal, FCT',
        additionalNotes: 'Quote needed for heavy tipper supply and spare tyres for earthmoving works.',
        items: [
          {
            productId: 'prod-heavy-tipper-truck-380',
            name: 'Heavy-Duty Tipper Truck',
            brand: 'Reliable Brand',
            category: 'trucks',
            specificationSummary: '6x4 · Tipper 380HP',
            image: '/images/hero/red_heavy_truck_hd.jpg',
            quantity: 4,
            slug: 'heavy-duty-tipper-truck-6x4-380hp'
          },
          {
            productId: 'prod-tyre-1200r20-heavy-lug',
            name: 'Heavy Lug Mining & Construction Tyre',
            brand: 'Premium Brand',
            category: 'tyres',
            specificationSummary: '12.00R20 · 20PR',
            image: '/images/cat_tyres.jpg',
            quantity: 24,
            slug: 'tyre-1200r20-heavy-lug-construction'
          }
        ]
      }
    ];
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(sampleQuotes, null, 2), 'utf-8');
    return sampleQuotes;
  }
  try {
    const raw = fs.readFileSync(QUOTES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading quotes:', err);
    return [];
  }
}

export function saveQuotes(quotes: QuoteRequest[]): void {
  ensureDataDir();
  fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2), 'utf-8');
}

export function getQuoteById(id: string): QuoteRequest | undefined {
  const quotes = getQuotes();
  return quotes.find(q => q.id.toUpperCase() === id.toUpperCase());
}

export function createQuote(data: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
  const quotes = getQuotes();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `RFQ-2026-${randomSuffix}`;
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
  ensureDataDir();
  if (!fs.existsSync(MESSAGES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function saveMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  ensureDataDir();
  const messages = getMessages();
  const msg: ContactMessage = {
    ...data,
    id: `MSG-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Unread'
  };
  messages.unshift(msg);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  return msg;
}
