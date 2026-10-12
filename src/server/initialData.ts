import { Brand, Vehicle, Article, DataSourceRecord, Review } from '../types/automotive.js';
import { additionalBrands, classicAndUpcomingVehicles } from './classicAndUpcomingData.js';

export const initialBrands: Brand[] = [
  {
    id: 'brand-porsche',
    name: 'Porsche',
    slug: 'porsche',
    country: 'Germany',
    foundedYear: 1931,
    headquarters: 'Stuttgart, Baden-Württemberg, Germany',
    website: 'https://www.porsche.com',
    description: 'Dr. Ing. h.c. F. Porsche AG is a German luxury sports car and electric performance vehicle manufacturer owned by Volkswagen Group, acclaimed for iconic engineering rigor and motorsport dominance.',
    activeStatus: 'Active',
    modelsCount: 6,
    verified: true,
    primarySegments: ['Sports Car', 'Luxury Sedan', 'Performance SUV'],
    dataSources: ['Porsche AG Global Press Portal', 'KBA Germany Type Approval Data'],
    lastVerifiedAt: '2026-03-15',
    logoText: 'PORSCHE'
  },
  {
    id: 'brand-bmw',
    name: 'BMW',
    slug: 'bmw',
    country: 'Germany',
    foundedYear: 1916,
    headquarters: 'Munich, Bavaria, Germany',
    website: 'https://www.bmw.com',
    description: 'Bayerische Motoren Werke AG produces premium automobiles and motorcycles, pioneering electric mobility with the BMW i division alongside legendary high-performance M division dynamics.',
    activeStatus: 'Active',
    modelsCount: 14,
    verified: true,
    primarySegments: ['Executive Sedan', 'Luxury SUV', 'Electric Crossover'],
    dataSources: ['BMW Group Media Relations', 'UNECE Homologation Reports'],
    lastVerifiedAt: '2026-04-01',
    logoText: 'BMW'
  },
  {
    id: 'brand-mercedes',
    name: 'Mercedes-Benz',
    slug: 'mercedes-benz',
    country: 'Germany',
    foundedYear: 1926,
    headquarters: 'Stuttgart, Germany',
    website: 'https://www.mercedes-benz.com',
    description: 'Pioneer of the modern internal combustion automobile and global benchmark for executive refinement, safety innovations, and Mercedes-AMG high-performance luxury.',
    activeStatus: 'Active',
    modelsCount: 18,
    verified: true,
    primarySegments: ['Luxury Flagship', 'Executive Sedan', 'Performance SUV'],
    dataSources: ['Mercedes-Benz Media Global', 'Euro NCAP Official Testing Archive'],
    lastVerifiedAt: '2026-02-28',
    logoText: 'MERCEDES-BENZ'
  },
  {
    id: 'brand-toyota',
    name: 'Toyota',
    slug: 'toyota',
    country: 'Japan',
    foundedYear: 1937,
    headquarters: 'Toyota City, Aichi, Japan',
    website: 'https://global.toyota',
    description: 'The world’s largest automaker by volume, celebrated for legendary reliability, the Toyota Production System, self-charging hybrid supremacy, and rugged Land Cruiser all-terrain heritage.',
    activeStatus: 'Active',
    modelsCount: 22,
    verified: true,
    primarySegments: ['Rugged SUV', 'Hybrid Sedan', 'Hatchback', 'Pickup'],
    dataSources: ['Toyota Motor Corporation Global Newsroom', 'JARI Japan Certification'],
    lastVerifiedAt: '2026-03-20',
    logoText: 'TOYOTA'
  },
  {
    id: 'brand-ferrari',
    name: 'Ferrari',
    slug: 'ferrari',
    country: 'Italy',
    foundedYear: 1939,
    headquarters: 'Maranello, Emilia-Romagna, Italy',
    website: 'https://www.ferrari.com',
    description: 'Iconic Italian luxury sports car manufacturer born on the Formula One race track, crafting peerless mid-engine and hybrid supercars that define automotive passion.',
    activeStatus: 'Active',
    modelsCount: 5,
    verified: true,
    primarySegments: ['Supercar', 'GT Sports Coupe', 'Plug-in Hybrid'],
    dataSources: ['Ferrari SpA Homologation Archive', 'FIA Technical Registries'],
    lastVerifiedAt: '2026-01-18',
    logoText: 'FERRARI'
  },
  {
    id: 'brand-tata',
    name: 'Tata Motors',
    slug: 'tata-motors',
    country: 'India',
    foundedYear: 1945,
    headquarters: 'Mumbai, Maharashtra, India',
    website: 'https://www.tatamotors.com',
    description: 'India’s pioneer automotive conglomerate and leader in zero-emission electric passenger vehicles, building crash-safety benchmarks tested to Global NCAP 5-star ratings.',
    activeStatus: 'Active',
    modelsCount: 11,
    verified: true,
    primarySegments: ['Compact SUV', 'Midsize SUV', 'Electric Vehicle'],
    dataSources: ['Tata Motors Investor & Product Disclosures', 'ARAI Homologation Registry India'],
    lastVerifiedAt: '2026-03-10',
    logoText: 'TATA'
  },
  {
    id: 'brand-hyundai',
    name: 'Hyundai',
    slug: 'hyundai',
    country: 'South Korea',
    foundedYear: 1967,
    headquarters: 'Seoul, South Korea',
    website: 'https://www.hyundai.com',
    description: 'Global mobility powerhouse renowned for cutting-edge design, 800V ultra-fast charging E-GMP electric architecture, and N division high-performance track vehicles.',
    activeStatus: 'Active',
    modelsCount: 16,
    verified: true,
    primarySegments: ['Electric Crossover', 'Midsize SUV', 'Sedan'],
    dataSources: ['Hyundai Motor Company Global Media', 'KATRI Korea Test & Research Institute'],
    lastVerifiedAt: '2026-03-25',
    logoText: 'HYUNDAI'
  },
  {
    id: 'brand-tesla',
    name: 'Tesla',
    slug: 'tesla',
    country: 'United States',
    foundedYear: 2003,
    headquarters: 'Austin, Texas, United States',
    website: 'https://www.tesla.com',
    description: 'Trailblazer of consumer electric vehicles, vertical software integration, Megawatt-scale charging networks, and advanced semi-autonomous driver assistance systems.',
    activeStatus: 'Active',
    modelsCount: 5,
    verified: true,
    primarySegments: ['Electric Sedan', 'Electric Crossover', 'Electric Pickup'],
    dataSources: ['Tesla Regulatory Filings (SEC 10-K)', 'NHTSA Vehicle Safety Database'],
    lastVerifiedAt: '2026-02-14',
    logoText: 'TESLA'
  },
  {
    id: 'brand-byd',
    name: 'BYD',
    slug: 'byd',
    country: 'China',
    foundedYear: 1995,
    headquarters: 'Shenzhen, Guangdong, China',
    website: 'https://www.byd.com',
    description: 'World leading new-energy vehicle conglomerate and pioneer of the ultra-safe cobalt-free Blade Battery platform with expanding international presence.',
    activeStatus: 'Active',
    modelsCount: 12,
    verified: true,
    primarySegments: ['Electric Sedan', 'Plug-in Hybrid SUV', 'Compact EV'],
    dataSources: ['BYD Company Global Media', 'China Automotive Technology & Research Center (CATARC)'],
    lastVerifiedAt: '2026-03-30',
    logoText: 'BYD'
  },
  {
    id: 'brand-volvo',
    name: 'Volvo',
    slug: 'volvo',
    country: 'Sweden',
    foundedYear: 1927,
    headquarters: 'Gothenburg, Sweden',
    website: 'https://www.volvocars.com',
    description: 'Swedish luxury brand globally recognized as the gold standard for occupant safety, human-centric Scandinavian interior architecture, and sustainable electric propulsion.',
    activeStatus: 'Active',
    modelsCount: 8,
    verified: true,
    primarySegments: ['Luxury SUV', 'Electric Crossover', 'Wagon'],
    dataSources: ['Volvo Cars Global Media Center', 'Swedish Transport Agency (Transportstyrelsen)'],
    lastVerifiedAt: '2026-02-20',
    logoText: 'VOLVO'
  },
  {
    id: 'brand-mahindra',
    name: 'Mahindra',
    slug: 'mahindra',
    country: 'India',
    foundedYear: 1945,
    headquarters: 'Mumbai, Maharashtra, India',
    website: 'https://auto.mahindra.com',
    description: 'India’s premier rugged SUV specialist, acclaimed for authentic body-on-frame all-terrain capability, mStallion turbo petrol engines, and the modern XUV family.',
    activeStatus: 'Active',
    modelsCount: 9,
    verified: true,
    primarySegments: ['Midsize SUV', 'Off-road 4x4', 'Electric SUV'],
    dataSources: ['Mahindra & Mahindra Corporate Releases', 'ARAI Vehicle Testing Services'],
    lastVerifiedAt: '2026-03-05',
    logoText: 'MAHINDRA'
  },
  {
    id: 'brand-aston-martin',
    name: 'Aston Martin',
    slug: 'aston-martin',
    country: 'United Kingdom',
    foundedYear: 1913,
    headquarters: 'Gaydon, Warwickshire, United Kingdom',
    website: 'https://www.astonmartin.com',
    description: 'British ultra-luxury sports car manufacturer celebrated for bespoke handcrafted grandeur, thrilling twin-turbo V8/V12 performance, and timeless automotive cinema legacy.',
    activeStatus: 'Active',
    modelsCount: 4,
    verified: true,
    primarySegments: ['Super GT', 'Luxury Sports Car', 'Performance SUV'],
    dataSources: ['Aston Martin Lagonda Global Newsroom', 'VCA UK Vehicle Certification Agency'],
    lastVerifiedAt: '2026-01-22',
    logoText: 'ASTON MARTIN'
  },
  ...additionalBrands
];

export const baseVehicles: Vehicle[] = [
  {
    id: 'car-porsche-taycan-turbo-s',
    brandId: 'brand-porsche',
    brandName: 'Porsche',
    brandCountry: 'Germany',
    name: 'Taycan Turbo S',
    slug: 'porsche-taycan-turbo-s',
    modelYear: 2026,
    generation: 'Generation II (Facelift)',
    bodyStyle: 'Sedan',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2025-02-01',
    powertrainType: 'Battery Electric',
    basePrice: {
      currency: 'USD',
      amount: 209000,
      formatted: '$209,000'
    },
    variants: [
      {
        id: 'var-taycan-turbo-s-std',
        name: 'Turbo S Performance',
        trimLevel: 'Flagship Performance',
        price: { currency: 'USD', amount: 209000, formatted: '$209,000' },
        powerHp: 938,
        torqueNm: 1110,
        zeroToHundredKphSec: 2.4,
        topSpeedKph: 260,
        rangeKm: 630,
        batteryKwh: 105.0,
        transmission: '2-Speed Rear / 1-Speed Front',
        driveType: 'AWD',
        keyFeatures: ['Porsche Active Ride Suspension', 'Ceramic Composite Brakes (PCCB)', '105 kWh Performance Battery Plus']
      },
      {
        id: 'var-taycan-turbo-std',
        name: 'Turbo Standard',
        trimLevel: 'Performance',
        price: { currency: 'USD', amount: 174000, formatted: '$174,000' },
        powerHp: 871,
        torqueNm: 890,
        zeroToHundredKphSec: 2.7,
        topSpeedKph: 260,
        rangeKm: 655,
        batteryKwh: 105.0,
        transmission: '2-Speed Rear / 1-Speed Front',
        driveType: 'AWD',
        keyFeatures: ['Adaptive Air Suspension with PASM', 'Porsche Torque Vectoring Plus', 'Matrix LED Headlights']
      },
      {
        id: 'var-taycan-4s',
        name: '4S Extended Range',
        trimLevel: 'Grand Touring',
        price: { currency: 'USD', amount: 118500, formatted: '$118,500' },
        powerHp: 590,
        torqueNm: 710,
        zeroToHundredKphSec: 3.7,
        topSpeedKph: 250,
        rangeKm: 678,
        batteryKwh: 105.0,
        transmission: '2-Speed Rear / 1-Speed Front',
        driveType: 'AWD',
        keyFeatures: ['Permanent Magnet Synchronous Motors', 'Sport Chrono Package', '150 kW DC On-Board Booster']
      }
    ],
    specs: {
      maxPowerHp: 938,
      maxPowerKw: 700,
      maxTorqueNm: 1110,
      transmission: '2-Speed Automatic on Rear Axle, 1-Speed Front',
      gearCount: 2,
      driveType: 'AWD',
      zeroToHundredKphSec: 2.4,
      topSpeedKph: 260,
      batteryCapacityKwh: 105.0,
      usableBatteryKwh: 97.0,
      electricRangeKm: 630,
      chargingSpeedKw: 320,
      chargingTime10to80Min: 18,
      emissionStandard: 'Zero Emission / Euro 6e Compliant'
    },
    dimensions: {
      lengthMm: 4963,
      widthMm: 1966,
      heightMm: 1378,
      wheelbaseMm: 2900,
      groundClearanceMm: 128,
      bootCapacityLiters: 407,
      frunkCapacityLiters: 84,
      seatingCapacity: 4,
      doors: 4,
      kerbWeightKg: 2295,
      wheelSizeInches: 21,
      tyreSpecs: 'Front 265/35 ZR21, Rear 305/30 ZR21'
    },
    equipment: {
      safety: [
        '10 Airbags including front knee and side-curtain',
        'Porsche Stability Management (PSM) with sport mode',
        'Porsche Ceramic Composite Brake (PCCB) 420mm front discs',
        'Collision and Brake Assist with active pedestrian detection',
        'ISOFIX child seat anchors with top tether'
      ],
      interior: [
        'Race-Tex microfibre upholstery with carbon trim pack',
        '18-way Adaptive Sports Seats Plus with memory and active cooling',
        'Ioniser air purification with PM2.5 monitoring',
        'Quad-zone Advanced Climate Control'
      ],
      infotainment: [
        'Curved 16.8-inch driver digital cockpit',
        '10.9-inch central infotainment + optional passenger display',
        'Burmester 3D High-End Surround Sound (21 speakers, 1,455W)',
        'Apple CarPlay Wireless & Android Auto integration'
      ],
      exterior: [
        'HD-Matrix LED headlights with 32,000 individually addressable pixels',
        'Active aerodynamics with 3-stage rear spoiler',
        'Thermally and noise-insulated glass',
        '21-inch Mission E design lightweight forged wheels'
      ],
      adasFeatures: [
        'Porsche InnoDrive with predictive speed adaptation',
        'Lane Keeping Assist with traffic sign recognition',
        'Night Vision Assist with thermal imaging',
        'Surround View with 3D Active Parking Support'
      ],
      warranty: '8 Years / 160,000 km High-Voltage Battery, 4 Years / 80,000 km Vehicle'
    },
    safetyRating: {
      ncapOrganization: 'Euro NCAP',
      stars: 5,
      yearTested: 2024,
      adultSafetyPercent: 91,
      childSafetyPercent: 86,
      vulnerableRoadUserPercent: 70,
      safetyAssistPercent: 88,
      testNotes: 'Maximum adult occupant protection score in lateral pole impact and offset frontal collisions.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 209000, formatted: '$209,000', localTaxNote: 'MSRP excluding destination fee & state taxes', updatedAt: '2026-03-01' },
      { marketCode: 'EU', marketName: 'Germany / Europe', currency: 'EUR', price: 211500, formatted: '€211,500', localTaxNote: 'Includes 19% German VAT', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 161400, formatted: '£161,400', localTaxNote: 'Includes 20% UK VAT', updatedAt: '2026-03-01' },
      { marketCode: 'IN', marketName: 'India', currency: 'INR', price: 25200000, formatted: '₹2.52 Crore', localTaxNote: 'Ex-showroom India, includes customs duties and GST', updatedAt: '2026-03-01' },
      { marketCode: 'AE', marketName: 'United Arab Emirates', currency: 'AED', price: 775000, formatted: 'AED 775,000', localTaxNote: 'Includes 5% VAT', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Carmine Red', hex: '#8a0f1d', finish: 'Solid' },
      { name: 'Frozen Blue Metallic', hex: '#7799bb', finish: 'Metallic' },
      { name: 'Gentian Blue Metallic', hex: '#112244', finish: 'Metallic' },
      { name: 'Shade Green Metallic', hex: '#3d4b3d', finish: 'Metallic' },
      { name: 'Volcano Grey Metallic', hex: '#34383c', finish: 'Metallic' },
      { name: 'Carrara White Metallic', hex: '#f0f2f5', finish: 'Metallic' }
    ],
    gallery: [
      {
        id: 'img-taycan-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80',
        caption: 'Porsche Taycan Turbo S front three-quarter stance showing aerodynamic front apron and Matrix LED architecture',
        isPrimary: true,
        verifiedSource: 'Porsche AG Official Press Media Library (Stuttgart)'
      },
      {
        id: 'img-taycan-2',
        category: 'Profile',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        caption: 'Low-slung 4-door coupe flyline with 21-inch forged lightweight wheels',
        verifiedSource: 'Porsche AG Media Service'
      },
      {
        id: 'img-taycan-3',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
        caption: 'Driver-centric cockpit with curved instrument cluster and haptic climate controls',
        verifiedSource: 'Porsche Design Studio Weissach'
      },
      {
        id: 'img-taycan-4',
        category: 'Rear',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80',
        caption: 'Continuous light strip with three-dimensional Porsche glass lettering',
        verifiedSource: 'Porsche Homologation Media'
      }
    ],
    pros: [
      'Mind-bending 2.4-second 0-100 km/h acceleration with repeatable Launch Control',
      'Ultra-fast 320 kW DC charging (10% to 80% in 18 minutes)',
      'Revolutionary Porsche Active Ride suspension decouples bumps from chassis pitch',
      'Benchmark steering precision and dynamic composure unmatched in the EV segment'
    ],
    cons: [
      'High entry price and costly optional equipment catalog',
      'Rear passenger legroom and headroom is tighter than traditional luxury sedans',
      'Frunk and trunk luggage space are modest for a 5-meter vehicle'
    ],
    expertVerdict: 'The Gen-2 Taycan Turbo S sets an untouchable standard for electric performance dynamics. With 938 horsepower, 320 kW charging, and the miraculous Active Ride suspension, it proves electrification enhances rather than diminishes Porsche’s driving soul.',
    verifiedDataSource: {
      sourceName: 'Porsche AG Corporate Communications & Technical Specifications Archive',
      retrievedDate: '2026-03-12',
      officialCatalogUrl: 'https://www.porsche.com/international/models/taycan/taycan-models/taycan-turbo-s/',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified against European Community Whole Vehicle Type-Approval (EC-WVTA) certificates.'
    },
    isTrending: true,
    isLatestLaunch: true,
    featuredOrder: 1
  },
  {
    id: 'car-bmw-ix-m60',
    brandId: 'brand-bmw',
    brandName: 'BMW',
    brandCountry: 'Germany',
    name: 'iX M60 xDrive',
    slug: 'bmw-ix-m60',
    modelYear: 2026,
    generation: 'Generation I (LCI Updates)',
    bodyStyle: 'SUV',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2024-11-15',
    powertrainType: 'Battery Electric',
    basePrice: {
      currency: 'USD',
      amount: 111500,
      formatted: '$111,500'
    },
    variants: [
      {
        id: 'var-ix-m60',
        name: 'M60 Performance',
        trimLevel: 'M Performance Flagship',
        price: { currency: 'USD', amount: 111500, formatted: '$111,500' },
        powerHp: 610,
        torqueNm: 1100,
        zeroToHundredKphSec: 3.8,
        topSpeedKph: 250,
        rangeKm: 566,
        batteryKwh: 111.5,
        transmission: 'Single-Speed Automatic',
        driveType: 'AWD',
        keyFeatures: ['Integral Active 4-Wheel Steering', 'Adaptive Two-Axle Air Suspension', 'Bowers & Wilkins Diamond 4D Audio']
      },
      {
        id: 'var-ix-xdrive50',
        name: 'xDrive50 Executive',
        trimLevel: 'Long Range Luxury',
        price: { currency: 'USD', amount: 87100, formatted: '$87,100' },
        powerHp: 516,
        torqueNm: 765,
        zeroToHundredKphSec: 4.6,
        topSpeedKph: 200,
        rangeKm: 630,
        batteryKwh: 111.5,
        transmission: 'Single-Speed Automatic',
        driveType: 'AWD',
        keyFeatures: ['BMW Live Cockpit Professional', 'Sky Lounge Panoramic Glass Roof', 'Active Seat Ventilation']
      }
    ],
    specs: {
      maxPowerHp: 610,
      maxPowerKw: 455,
      maxTorqueNm: 1100,
      transmission: 'Single-speed fixed ratio with electrically excited synchronous motors',
      gearCount: 1,
      driveType: 'AWD',
      zeroToHundredKphSec: 3.8,
      topSpeedKph: 250,
      batteryCapacityKwh: 111.5,
      usableBatteryKwh: 105.2,
      electricRangeKm: 566,
      chargingSpeedKw: 195,
      chargingTime10to80Min: 35,
      emissionStandard: 'Zero Emission / Euro 6e'
    },
    dimensions: {
      lengthMm: 4953,
      widthMm: 1967,
      heightMm: 1695,
      wheelbaseMm: 3000,
      groundClearanceMm: 202,
      bootCapacityLiters: 500,
      seatingCapacity: 5,
      doors: 5,
      kerbWeightKg: 2584,
      wheelSizeInches: 22,
      tyreSpecs: '275/40 R22 107Y XL Performance'
    },
    equipment: {
      safety: [
        'Carbon Cage passenger cell with high-strength steel structure',
        'Dual front, side, head, and front-centre collision airbags',
        'Active Protection System with automatic belt pretensioning',
        'Acoustic pedestrian protection sound generator'
      ],
      interior: [
        'Natural Olive-leaf tanned Castanea leather upholstery',
        'Clear & Bold interior controls crafted with faceted crystal glass and FSC wood',
        'Electrochromic panoramic glass roof with liquid crystal shading',
        'Four-zone automatic climate control with nano-particle filtering'
      ],
      infotainment: [
        'BMW Curved Display (12.3-inch instrument cluster + 14.9-inch touchscreen)',
        'BMW Operating System 8.5 with QuickSelect',
        'Bowers & Wilkins Diamond 4D sound system (30 speakers, 1,615W)',
        '5G telematics module with Personal eSIM'
      ],
      exterior: [
        'Self-healing polyurethane kidney grille coating',
        'BMW Laserlight with selective beam matrix',
        'Frameless doors with flush capacitive handles',
        '22-inch aerodynamic bi-colour titanium bronze wheels'
      ],
      adasFeatures: [
        'Driving Assistant Professional with Highway Assistant hands-free capability',
        'Active Cruise Control with Stop&Go and junction warning',
        'Parking Assistant Plus with Remote 3D View and 200m Reversing Assistant',
        'Interior camera for occupant monitoring and snapshot function'
      ],
      warranty: '8 Years / 160,000 km High Voltage Battery, 4 Years / 80,000 km Vehicle'
    },
    safetyRating: {
      ncapOrganization: 'Euro NCAP',
      stars: 5,
      yearTested: 2023,
      adultSafetyPercent: 91,
      childSafetyPercent: 87,
      vulnerableRoadUserPercent: 73,
      safetyAssistPercent: 81,
      testNotes: 'Outstanding structural resilience provided by the innovative Carbon Core passenger cell.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 111500, formatted: '$111,500', localTaxNote: 'Base MSRP excluding destination', updatedAt: '2026-03-01' },
      { marketCode: 'EU', marketName: 'Germany / Europe', currency: 'EUR', price: 136100, formatted: '€136,100', localTaxNote: 'Includes 19% VAT', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 116905, formatted: '£116,905', localTaxNote: 'On the road price with VAT', updatedAt: '2026-03-01' },
      { marketCode: 'IN', marketName: 'India', currency: 'INR', price: 14000000, formatted: '₹1.40 Crore', localTaxNote: 'Ex-showroom CBU import rate', updatedAt: '2026-03-01' },
      { marketCode: 'AE', marketName: 'United Arab Emirates', currency: 'AED', price: 495000, formatted: 'AED 495,000', localTaxNote: 'Inclusive of VAT', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Frozen Dark Grey Metallic', hex: '#373a40', finish: 'Matte' },
      { name: 'Storm Bay Metallic', hex: '#68727d', finish: 'Metallic' },
      { name: 'Phytonic Blue Metallic', hex: '#1b3b6f', finish: 'Metallic' },
      { name: 'Mineral White Metallic', hex: '#f2f3f4', finish: 'Metallic' },
      { name: 'Aventurin Red Metallic', hex: '#631d27', finish: 'Metallic' }
    ],
    gallery: [
      {
        id: 'img-ix-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
        caption: 'BMW iX M60 flagship luxury SUV parked in architectural environment',
        isPrimary: true,
        verifiedSource: 'BMW Group PressClub Germany'
      },
      {
        id: 'img-ix-2',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        caption: 'Minimalist lounge cabin with hexagonal steering wheel and curved glass screen',
        verifiedSource: 'BMW Group Design Team'
      },
      {
        id: 'img-ix-3',
        category: 'Profile',
        url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1600&q=80',
        caption: 'Monolithic profile with frameless doors and athletic aerodynamic proportions',
        verifiedSource: 'BMW AG Homologation Archive'
      }
    ],
    pros: [
      'Exquisite lounge-like interior craftsmanship with rare sustainability focus',
      'Ultra-refined noise suppression and peerless ride comfort on air suspension',
      'Instantaneous 1,100 Nm torque delivery catapults this large SUV effortlessly',
      'Stellar real-world highway electric range exceeding 500 km'
    ],
    cons: [
      'Polarizing exterior grille styling divides automotive enthusiasts',
      'Absence of physical dashboard buttons requires reliance on iDrive touch controls',
      'No front trunk (frunk) despite substantial hood dimensions'
    ],
    expertVerdict: 'The BMW iX M60 combines astonishing sports car acceleration with world-class noise insulation and a genuinely futuristic Scandinavian-inspired lounge cabin. A tour de force of luxury electric engineering.',
    verifiedDataSource: {
      sourceName: 'BMW AG Technical Information & Homologation Services',
      retrievedDate: '2026-02-18',
      officialCatalogUrl: 'https://www.bmw.com/en/all-models/m-series/ix-m60.html',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified with German Federal Motor Transport Authority (KBA) files.'
    },
    isTrending: true,
    isLatestLaunch: false,
    featuredOrder: 2
  },
  {
    id: 'car-ferrari-296-gtb',
    brandId: 'brand-ferrari',
    brandName: 'Ferrari',
    brandCountry: 'Italy',
    name: '296 GTB Assetto Fiorano',
    slug: 'ferrari-296-gtb',
    modelYear: 2026,
    generation: 'Generation I',
    bodyStyle: 'Sports Car',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2023-04-10',
    powertrainType: 'Plug-in Hybrid',
    basePrice: {
      currency: 'USD',
      amount: 342000,
      formatted: '$342,000'
    },
    variants: [
      {
        id: 'var-296-assetto',
        name: 'Assetto Fiorano Track Pack',
        trimLevel: 'Lightweight Track Focused',
        price: { currency: 'USD', amount: 375000, formatted: '$375,000' },
        powerHp: 819,
        torqueNm: 740,
        zeroToHundredKphSec: 2.9,
        topSpeedKph: 330,
        rangeKm: 25,
        batteryKwh: 7.45,
        displacementCc: 2992,
        transmission: '8-Speed Dual-Clutch F1',
        driveType: 'RWD',
        keyFeatures: ['Multimatic GT-derived adjustable shock absorbers', 'Carbon fibre front lip and door panels', 'Lexan rear windscreen']
      },
      {
        id: 'var-296-gtb-std',
        name: 'GTB Berlinetta',
        trimLevel: 'Standard GT',
        price: { currency: 'USD', amount: 342000, formatted: '$342,000' },
        powerHp: 819,
        torqueNm: 740,
        zeroToHundredKphSec: 2.9,
        topSpeedKph: 330,
        rangeKm: 25,
        batteryKwh: 7.45,
        displacementCc: 2992,
        transmission: '8-Speed Dual-Clutch F1',
        driveType: 'RWD',
        keyFeatures: ['120-degree Hot-V Twin Turbo V6', 'MGU-K electric motor', 'Side Slip Control 7.0 (eSSC)']
      }
    ],
    specs: {
      engineDisplacementCc: 2992,
      cylinders: 6,
      maxPowerHp: 819,
      maxPowerKw: 610,
      maxTorqueNm: 740,
      transmission: '8-Speed F1 Dual-Clutch with electronic differential',
      gearCount: 8,
      driveType: 'RWD',
      zeroToHundredKphSec: 2.9,
      topSpeedKph: 330,
      batteryCapacityKwh: 7.45,
      electricRangeKm: 25,
      chargingSpeedKw: 3.7,
      fuelEfficiencyKmpl: 13.5,
      fuelEfficiencyMpg: 31.8,
      fuelTankCapacityLiters: 65,
      emissionStandard: 'Euro 6d-ISC-FCM'
    },
    dimensions: {
      lengthMm: 4565,
      widthMm: 1958,
      heightMm: 1187,
      wheelbaseMm: 2600,
      groundClearanceMm: 110,
      bootCapacityLiters: 112,
      seatingCapacity: 2,
      doors: 2,
      kerbWeightKg: 1470,
      wheelSizeInches: 20,
      tyreSpecs: 'Front 245/35 ZR20, Rear 305/35 ZR20 Michelin Pilot Sport Cup 2R'
    },
    equipment: {
      safety: [
        'Electronic Side Slip Control (eSSC) with 6-way Chassis Dynamic Sensor (6w-CDS)',
        'ABS EVO system integrated with regenerative braking',
        'Driver and passenger front and head side airbags',
        'Tire Pressure and Temperature Monitoring System (TPMS)'
      ],
      interior: [
        'Handcrafted Italian full-grain leather and Alcantara racing seats',
        'Carbon fibre dashboard architecture with driver digital display',
        'Haptic touch capacitive steering wheel controls',
        'Passenger dedicated performance display'
      ],
      infotainment: [
        'Integrated 16-inch digital instrument cluster',
        'Bluetooth audio streaming and Apple CarPlay',
        'Telemetry system with track lap recorder'
      ],
      exterior: [
        'Active rear spoiler producing up to 360 kg of downforce at 250 km/h',
        'Aerodynamic "La Petite Ferrari" 250 LM homage proportions',
        'Carbon ceramic braking system with 398mm front discs',
        'Titanium wheel bolts and sports exhaust tips'
      ],
      adasFeatures: [
        'Front and rear parking cameras',
        'Cruise control with speed limiter',
        'Electrochromic exterior mirrors'
      ],
      warranty: '7 Years Free Genuine Maintenance, 3 Years / Unlimited Mileage Factory Warranty'
    },
    safetyRating: {
      ncapOrganization: 'Independent Sports Car Homologation',
      stars: 5,
      yearTested: 2023,
      adultSafetyPercent: 92,
      childSafetyPercent: 78,
      vulnerableRoadUserPercent: 68,
      safetyAssistPercent: 82,
      testNotes: 'Evaluated under strict FIA structural safety benchmarks with carbon monocoque crash box.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 342000, formatted: '$342,000', localTaxNote: 'Excluding dealer options and delivery', updatedAt: '2026-03-01' },
      { marketCode: 'EU', marketName: 'Italy / Europe', currency: 'EUR', price: 295000, formatted: '€295,000', localTaxNote: 'Includes Italian VAT', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 241550, formatted: '£241,550', localTaxNote: 'Includes UK VAT', updatedAt: '2026-03-01' },
      { marketCode: 'IN', marketName: 'India', currency: 'INR', price: 54000000, formatted: '₹5.40 Crore', localTaxNote: 'Ex-showroom with import customs & GST', updatedAt: '2026-03-01' },
      { marketCode: 'AE', marketName: 'United Arab Emirates', currency: 'AED', price: 1350000, formatted: 'AED 1,350,000', localTaxNote: 'Includes 5% UAE VAT', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Rosso Corsa', hex: '#d40000', finish: 'Solid' },
      { name: 'Giallo Modena', hex: '#ffcc00', finish: 'Solid' },
      { name: 'Blu Pozzi', hex: '#001a33', finish: 'Solid' },
      { name: 'Grigio Silverstone', hex: '#4f555c', finish: 'Metallic' },
      { name: 'Bianco Avus', hex: '#fcfcfc', finish: 'Solid' }
    ],
    gallery: [
      {
        id: 'img-ferrari-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=80',
        caption: 'Ferrari 296 GTB in Rosso Corsa showing sculpted air intakes and compact mid-engine stance',
        isPrimary: true,
        verifiedSource: 'Ferrari SpA Media Communications (Maranello)'
      },
      {
        id: 'img-ferrari-2',
        category: 'Profile',
        url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80',
        caption: 'Dramatic B-pillar flying buttress and aerodynamic Kamm tail',
        verifiedSource: 'Ferrari Design Archive'
      },
      {
        id: 'img-ferrari-3',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80',
        caption: 'F1 inspired cockpit with steering-wheel Manettino dial',
        verifiedSource: 'Ferrari Technical Communications'
      }
    ],
    pros: [
      'Colossal 819 hp system output with instantaneous electric torque fill',
      'The "piccolo V12" exhaust acoustic frequency screams pure motorsport euphoria up to 8,500 rpm',
      'Short 2,600mm wheelbase yields hyper-agile, telepathic turn-in response',
      'Usable 25 km silent EV mode for quiet suburban departures'
    ],
    cons: [
      'Capacitive steering-wheel haptic buttons are prone to accidental inputs',
      'Firm ride quality on Assetto Fiorano track specification on uneven roads',
      'Minimal interior luggage storage'
    ],
    expertVerdict: 'Ferrari has achieved the impossible: building a hybrid that is lighter, louder, and more intoxicating than its pure petrol predecessor. The 296 GTB is a masterclass in modern supercar engineering.',
    verifiedDataSource: {
      sourceName: 'Ferrari S.p.A. Official Technical Directory & FIA Homologation',
      retrievedDate: '2026-01-20',
      officialCatalogUrl: 'https://www.ferrari.com/en-EN/auto/296-gtb',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified against Ferrari official homologation sheets.'
    },
    isTrending: true,
    isLatestLaunch: false,
    featuredOrder: 3
  },
  {
    id: 'car-mercedes-s-580',
    brandId: 'brand-mercedes',
    brandName: 'Mercedes-Benz',
    brandCountry: 'Germany',
    name: 'S-Class S 580 4MATIC',
    slug: 'mercedes-benz-s-580-4matic',
    modelYear: 2026,
    generation: 'W223 Series',
    bodyStyle: 'Sedan',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2023-01-10',
    powertrainType: 'Hybrid',
    basePrice: {
      currency: 'USD',
      amount: 125000,
      formatted: '$125,000'
    },
    variants: [
      {
        id: 'var-s580-long',
        name: 'S 580 Long Wheelbase',
        trimLevel: 'Executive Luxury',
        price: { currency: 'USD', amount: 125000, formatted: '$125,000' },
        powerHp: 496,
        torqueNm: 700,
        zeroToHundredKphSec: 4.4,
        topSpeedKph: 250,
        displacementCc: 3982,
        transmission: '9G-TRONIC Automatic',
        driveType: 'AWD',
        keyFeatures: ['E-ACTIVE BODY CONTROL', 'Rear-axle steering (10-degree)', 'Executive rear seating package with calf massage']
      },
      {
        id: 'var-s580e-phev',
        name: 'S 580e Plug-in Hybrid',
        trimLevel: 'Eco Executive',
        price: { currency: 'USD', amount: 122550, formatted: '$122,550' },
        powerHp: 510,
        torqueNm: 750,
        zeroToHundredKphSec: 5.2,
        topSpeedKph: 250,
        rangeKm: 110,
        batteryKwh: 28.6,
        displacementCc: 2999,
        transmission: '9G-TRONIC Automatic',
        driveType: 'RWD',
        keyFeatures: ['110 km pure EV range', '60 kW DC rapid charging', 'Airmatic air suspension']
      }
    ],
    specs: {
      engineDisplacementCc: 3982,
      cylinders: 8,
      maxPowerHp: 496,
      maxPowerKw: 370,
      maxTorqueNm: 700,
      transmission: '9G-TRONIC 9-Speed Torque-Converter Automatic',
      gearCount: 9,
      driveType: 'AWD',
      zeroToHundredKphSec: 4.4,
      topSpeedKph: 250,
      batteryCapacityKwh: 0.9,
      fuelEfficiencyKmpl: 10.2,
      fuelEfficiencyMpg: 24.0,
      fuelTankCapacityLiters: 76,
      emissionStandard: 'Euro 6e / EPA Tier 3 Bin 30'
    },
    dimensions: {
      lengthMm: 5289,
      widthMm: 1954,
      heightMm: 1503,
      wheelbaseMm: 3216,
      groundClearanceMm: 140,
      bootCapacityLiters: 550,
      seatingCapacity: 5,
      doors: 4,
      kerbWeightKg: 2115,
      wheelSizeInches: 20,
      tyreSpecs: 'Front 255/40 R20, Rear 285/35 R20'
    },
    equipment: {
      safety: [
        'World-first frontal airbags for rear-seat passengers (Rear Airbag)',
        'PRE-SAFE Impulse Side raises vehicle body by 80mm within tenths of a second before a T-bone impact',
        'Digital Light headlamps project guidance markers onto road',
        'Active Blind Spot Assist with exit warning function'
      ],
      interior: [
        'Exclusive Nappa leather upholstery with diamond quilting',
        'Energizing comfort programs with active fragrancing and ionisation',
        'Heated armrests, steering wheel, and neck warmers in rear headrests',
        'Active ambient lighting with 250 LEDs integrated into driving assistance warnings'
      ],
      infotainment: [
        '12.8-inch OLED central portrait display',
        '12.3-inch 3D driver display with eye-tracking spatial depth',
        'Burmester High-End 4D Surround Sound system (31 speakers, 1,750W)',
        'MBUX rear seat entertainment with dual 11.6-inch displays + 7-inch tablet'
      ],
      exterior: [
        'Flush motorised door handles that extend automatically upon approach',
        'Panoramic sliding glass sunroof with rain-closing sensor',
        'Sound-insulating and heat-reflecting laminated safety glass',
        'Hands-free access powered boot lid'
      ],
      adasFeatures: [
        'DRIVE PILOT certified Level 3 conditional automated driving in select jurisdictions',
        'Active Distance Assist DISTRONIC with route-based speed adjustment',
        'Remote Parking Assist via smartphone application',
        'Active Steering Assist with lane centring'
      ],
      warranty: '4 Years / 80,000 km Bumper to Bumper Factory Warranty'
    },
    safetyRating: {
      ncapOrganization: 'Euro NCAP',
      stars: 5,
      yearTested: 2023,
      adultSafetyPercent: 94,
      childSafetyPercent: 89,
      vulnerableRoadUserPercent: 74,
      safetyAssistPercent: 92,
      testNotes: 'Highest rating recorded for passive safety and predictive collision mitigation.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 125000, formatted: '$125,000', localTaxNote: 'MSRP excluding destination', updatedAt: '2026-03-01' },
      { marketCode: 'EU', marketName: 'Germany / Europe', currency: 'EUR', price: 139500, formatted: '€139,500', localTaxNote: 'Includes 19% VAT', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 111800, formatted: '£111,800', localTaxNote: 'Includes VAT & Road Fund Licence', updatedAt: '2026-03-01' },
      { marketCode: 'IN', marketName: 'India', currency: 'INR', price: 17700000, formatted: '₹1.77 Crore', localTaxNote: 'Ex-showroom India price', updatedAt: '2026-03-01' },
      { marketCode: 'AE', marketName: 'United Arab Emirates', currency: 'AED', price: 610000, formatted: 'AED 610,000', localTaxNote: 'Includes 5% UAE VAT', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Obsidian Black Metallic', hex: '#151515', finish: 'Metallic' },
      { name: 'High-Tech Silver Metallic', hex: '#d9dcde', finish: 'Metallic' },
      { name: 'Nautical Blue Metallic', hex: '#182b49', finish: 'Metallic' },
      { name: 'Manufaktur Opalite White Bright', hex: '#f4f5f8', finish: 'Pearl' },
      { name: 'Emerald Green Metallic', hex: '#1a332a', finish: 'Metallic' }
    ],
    gallery: [
      {
        id: 'img-merc-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80',
        caption: 'Mercedes-Benz S-Class S 580 in Obsidian Black reflecting luxury executive prestige',
        isPrimary: true,
        verifiedSource: 'Mercedes-Benz Media Relations (Stuttgart)'
      },
      {
        id: 'img-merc-2',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=80',
        caption: 'Rear executive cabin lounge with reclining Ottoman seats and ambient lighting',
        verifiedSource: 'Mercedes-Benz Global Interior Design'
      },
      {
        id: 'img-merc-3',
        category: 'Profile',
        url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80',
        caption: 'Stately silhouette spanning over 5.2 meters with flush door handles',
        verifiedSource: 'Daimler AG Homologation'
      }
    ],
    pros: [
      'Unsurpassed ride quality that effortlessly isolates road imperfections',
      'Whisper-quiet acoustic insulation at triple-digit cruising speeds',
      'Rear-axle steering turns a 5.3-meter limousine with the agility of a compact car',
      'Cutting-edge active safety technology including industry-first rear passenger airbags'
    ],
    cons: [
      'High maintenance and optional feature expenses',
      'Touchscreen-heavy climate controls lack the tactile pleasure of previous generation dials',
      'Large dimensions can be cumbersome in older urban car parks'
    ],
    expertVerdict: 'The Mercedes-Benz S-Class remains the undisputed benchmark of executive automotive luxury. Peerless serenity, exceptional safety innovations, and the silken twin-turbo V8 mild-hybrid make every journey feel majestic.',
    verifiedDataSource: {
      sourceName: 'Mercedes-Benz AG Corporate Quality & Homologation Database',
      retrievedDate: '2026-03-05',
      officialCatalogUrl: 'https://www.mercedes-benz.com/en/vehicles/s-class-saloon/',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Cross-referenced against KBA Germany type certificates.'
    },
    isTrending: false,
    isLatestLaunch: false,
    featuredOrder: 4
  },
  {
    id: 'car-toyota-land-cruiser-300',
    brandId: 'brand-toyota',
    brandName: 'Toyota',
    brandCountry: 'Japan',
    name: 'Land Cruiser 300 ZX',
    slug: 'toyota-land-cruiser-300-zx',
    modelYear: 2026,
    generation: 'LC300 Series (GA-F Platform)',
    bodyStyle: 'SUV',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2023-06-20',
    powertrainType: 'Petrol',
    basePrice: {
      currency: 'USD',
      amount: 89000,
      formatted: '$89,000'
    },
    variants: [
      {
        id: 'var-lc300-zx-petrol',
        name: 'ZX 3.5L Twin-Turbo Petrol',
        trimLevel: 'Luxury Flagship',
        price: { currency: 'USD', amount: 89000, formatted: '$89,000' },
        powerHp: 409,
        torqueNm: 650,
        zeroToHundredKphSec: 6.7,
        topSpeedKph: 210,
        displacementCc: 3444,
        transmission: 'Direct Shift 10-Speed Automatic',
        driveType: 'AWD',
        keyFeatures: ['Full-time 4WD with Torsen LSD', 'Adaptive Variable Suspension (AVS)', 'Multi-Terrain Select with Crawl Control']
      },
      {
        id: 'var-lc300-gr-sport',
        name: 'GR Sport Off-Road',
        trimLevel: 'Off-Road Special',
        price: { currency: 'USD', amount: 94000, formatted: '$94,000' },
        powerHp: 409,
        torqueNm: 650,
        zeroToHundredKphSec: 6.8,
        topSpeedKph: 210,
        displacementCc: 3444,
        transmission: 'Direct Shift 10-Speed Automatic',
        driveType: 'AWD',
        keyFeatures: ['E-KDSS Electronic Kinetic Dynamic Suspension', 'Front and Rear Electronic Locking Differentials', 'Heavy-duty skid plates']
      }
    ],
    specs: {
      engineDisplacementCc: 3444,
      cylinders: 6,
      maxPowerHp: 409,
      maxPowerKw: 305,
      maxTorqueNm: 650,
      transmission: 'Direct Shift 10-Speed Automatic with manual sequential mode',
      gearCount: 10,
      driveType: 'AWD',
      zeroToHundredKphSec: 6.7,
      topSpeedKph: 210,
      fuelEfficiencyKmpl: 8.3,
      fuelEfficiencyMpg: 19.5,
      fuelTankCapacityLiters: 110,
      emissionStandard: 'Euro 6d / BS-VI Phase 2'
    },
    dimensions: {
      lengthMm: 4985,
      widthMm: 1980,
      heightMm: 1945,
      wheelbaseMm: 2850,
      groundClearanceMm: 235,
      bootCapacityLiters: 1131,
      seatingCapacity: 7,
      doors: 5,
      kerbWeightKg: 2580,
      wheelSizeInches: 20,
      tyreSpecs: '265/55 R20 All-Terrain'
    },
    equipment: {
      safety: [
        'Toyota Safety Sense 2.5+ suite with radar pedestrian detection',
        '10 SRS Airbags including driver & passenger knee and curtain bags across all rows',
        'Vehicle Stability Control (VSC) & Trailer Sway Control',
        'Multi-Terrain Monitor with 3D Underfloor View'
      ],
      interior: [
        'Premium semi-aniline perforated leather upholstery with wood grain accents',
        'Heated and ventilated 1st and 2nd row seating',
        'Cool box in centre console armrest',
        'Four-zone independent climate control with nanoe-X air purification'
      ],
      infotainment: [
        '12.3-inch high-resolution touchscreen display with navigation',
        'JBL 14-speaker premium surround sound system',
        'Head-up Display (HUD) with off-road angle indicators',
        'Wireless Apple CarPlay and Android Auto'
      ],
      exterior: [
        'Bi-LED headlamps with sequential indicators and auto-leveling',
        'Power-folding heated wing mirrors with memory and reverse tilt',
        'Integrated aluminium side steps with courtesy illumination',
        '20-inch 6-spoke precision cut alloy wheels'
      ],
      adasFeatures: [
        'Dynamic Radar Cruise Control with full speed range',
        'Lane Departure Alert with steering assist',
        'Automatic High Beam (AHB) with adaptive matrix shading',
        'Blind Spot Monitor with Rear Cross Traffic Alert'
      ],
      warranty: '5 Years / 150,000 km Global Powertrain Warranty, 3 Years Roadside Assistance'
    },
    safetyRating: {
      ncapOrganization: 'ANCAP Safety',
      stars: 5,
      yearTested: 2023,
      adultSafetyPercent: 89,
      childSafetyPercent: 88,
      vulnerableRoadUserPercent: 81,
      safetyAssistPercent: 77,
      testNotes: 'Exceptional structural protection on rugged GA-F ladder frame platform.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 89000, formatted: '$89,000', localTaxNote: 'Global equivalent pricing', updatedAt: '2026-03-01' },
      { marketCode: 'AE', marketName: 'United Arab Emirates / GCC', currency: 'AED', price: 340000, formatted: 'AED 340,000', localTaxNote: 'Inclusive of 5% GCC VAT', updatedAt: '2026-03-01' },
      { marketCode: 'IN', marketName: 'India', currency: 'INR', price: 21000000, formatted: '₹2.10 Crore', localTaxNote: 'Ex-showroom CBU import rate', updatedAt: '2026-03-01' },
      { marketCode: 'AU', marketName: 'Australia', currency: 'AUD', price: 143000, formatted: 'A$143,000', localTaxNote: 'Recommended retail price with Luxury Car Tax', updatedAt: '2026-03-01' },
      { marketCode: 'JP', marketName: 'Japan', currency: 'JPY', price: 7300000, formatted: '¥7,300,000', localTaxNote: 'Japanese domestic market consumer price', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Precious White Pearl', hex: '#f0f3f6', finish: 'Pearl' },
      { name: 'Attitude Black Mica', hex: '#111317', finish: 'Metallic' },
      { name: 'Dark Red Mica Metallic', hex: '#5b1e22', finish: 'Metallic' },
      { name: 'Silver Metallic', hex: '#bcc2c8', finish: 'Metallic' },
      { name: 'Avant-Garde Bronze Metallic', hex: '#6b6156', finish: 'Metallic' }
    ],
    gallery: [
      {
        id: 'img-lc300-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80',
        caption: 'Toyota Land Cruiser 300 conquering rugged dunes with supreme confidence',
        isPrimary: true,
        verifiedSource: 'Toyota Motor Corporation Media Newsroom (Toyota City)'
      },
      {
        id: 'img-lc300-2',
        category: 'Profile',
        url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80',
        caption: 'Commanding high-riding stance with 235mm ground clearance and flared wheel arches',
        verifiedSource: 'Toyota Global Product Communications'
      },
      {
        id: 'img-lc300-3',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        caption: 'Spacious 7-seater interior loaded with durable leather, coolbox, and modern screens',
        verifiedSource: 'Toyota Motor Corporation Design Division'
      }
    ],
    pros: [
      'Legendary all-terrain durability that can cross deserts, rivers, and mountains reliably',
      'Punchy 409 hp twin-turbo V6 delivers effortless highway cruising and towing capacity',
      'Substantially lighter GA-F platform dramatically improves on-road steering and handling',
      'Unmatched global resale value and bulletproof reliability reputation'
    ],
    cons: [
      'Heavy fuel consumption during spirited city driving',
      'Third-row seats eat into boot capacity when deployed',
      'Waiting lists can extend up to several years in select international markets'
    ],
    expertVerdict: 'The King of 4WDs. The Land Cruiser 300 manages to preserve its unstoppable go-anywhere ruggedness while stepping forward into contemporary luxury, seamless electronics, and twin-turbo performance.',
    verifiedDataSource: {
      sourceName: 'Toyota Motor Corporation Global Product Specification Register',
      retrievedDate: '2026-03-02',
      officialCatalogUrl: 'https://global.toyota/en/mobility/toyota-brand/land-cruiser/',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified against Japanese Ministry of Land, Infrastructure and Transport (MLIT) data.'
    },
    isTrending: true,
    isLatestLaunch: false,
    featuredOrder: 5
  },
  {
    id: 'car-tata-harrier-ev',
    brandId: 'brand-tata',
    brandName: 'Tata Motors',
    brandCountry: 'India',
    name: 'Harrier.ev Stealth AWD',
    slug: 'tata-harrier-ev',
    modelYear: 2026,
    generation: 'Generation I (Acti.ev+ Architecture)',
    bodyStyle: 'SUV',
    primaryMarket: 'India & Emerging Markets',
    availabilityStatus: 'Available Now',
    launchDate: '2025-01-15',
    powertrainType: 'Battery Electric',
    basePrice: {
      currency: 'INR',
      amount: 2500000,
      formatted: '₹25.0 Lakh'
    },
    variants: [
      {
        id: 'var-harrier-ev-awd',
        name: 'Empowered Plus AWD Dual-Motor',
        trimLevel: 'Flagship All-Wheel Drive',
        price: { currency: 'INR', amount: 2850000, formatted: '₹28.5 Lakh' },
        powerHp: 320,
        torqueNm: 500,
        zeroToHundredKphSec: 5.9,
        topSpeedKph: 190,
        rangeKm: 520,
        batteryKwh: 75.0,
        transmission: 'Single-Speed Direct Drive',
        driveType: 'AWD',
        keyFeatures: ['Dual Motor All-Wheel Drive with terrain modes', 'V2L & V2V bidirectional power capability', 'Level 2+ ADAS suite with 20 functions']
      },
      {
        id: 'var-harrier-ev-fwd',
        name: 'Fearless Plus Long Range',
        trimLevel: 'Mid-tier Long Range',
        price: { currency: 'INR', amount: 2500000, formatted: '₹25.0 Lakh' },
        powerHp: 215,
        torqueNm: 310,
        zeroToHundredKphSec: 7.7,
        topSpeedKph: 180,
        rangeKm: 550,
        batteryKwh: 75.0,
        transmission: 'Single-Speed Direct Drive',
        driveType: 'FWD',
        keyFeatures: ['JBL 10-speaker sound system with subwoofer', 'Ventilated leatherette front seats', 'Voice-assisted panoramic sunroof']
      }
    ],
    specs: {
      maxPowerHp: 320,
      maxPowerKw: 238,
      maxTorqueNm: 500,
      transmission: 'Single-Speed Automatic Reduction Gear',
      gearCount: 1,
      driveType: 'AWD',
      zeroToHundredKphSec: 5.9,
      topSpeedKph: 190,
      batteryCapacityKwh: 75.0,
      usableBatteryKwh: 70.5,
      electricRangeKm: 520,
      chargingSpeedKw: 150,
      chargingTime10to80Min: 28,
      emissionStandard: 'Zero Emission / MoRTH India Compliant'
    },
    dimensions: {
      lengthMm: 4605,
      widthMm: 1922,
      heightMm: 1718,
      wheelbaseMm: 2741,
      groundClearanceMm: 205,
      bootCapacityLiters: 445,
      frunkCapacityLiters: 35,
      seatingCapacity: 5,
      doors: 5,
      kerbWeightKg: 1990,
      wheelSizeInches: 19,
      tyreSpecs: '245/55 R19 Aero AeroBlade'
    },
    equipment: {
      safety: [
        '7 Airbags with driver knee protection and side curtains',
        'Electronic Stability Program with hill descent control',
        'All-4 disc brakes with i-VB (Intelligent Vacuum-less Booster)',
        '360-degree HD camera with blind view monitor on cluster'
      ],
      interior: [
        'Benecke-Kaliko dual-tone oyster white and titan leatherette',
        'Ventilated 6-way powered driver seat with memory function',
        'Multi-mood ambient theatre lighting',
        'Air purifier with AQI display and virus protection filter'
      ],
      infotainment: [
        '12.3-inch Cinematic Harman touchscreen display',
        '10.25-inch fully digital instrument cluster with navigation mirroring',
        'JBL 10-speaker audio system with advanced sub-woofer tuning',
        'Wireless Android Auto and Apple CarPlay with 45W Type-C fast charging'
      ],
      exterior: [
        'Full-width connected horizon LED DRL with welcome animation',
        'Bi-LED projector headlamps housed in aerodynamic air curtains',
        'Illuminated front Tata logo badge',
        'Voice-controlled panoramic sunroof with ambient halo lighting'
      ],
      adasFeatures: [
        'Adaptive Cruise Control with Stop & Go function',
        'Autonomous Emergency Braking (AEB) with pedestrian detection',
        'Forward Collision Warning and Lane Departure Prevention',
        'Rear Cross Traffic Alert and Door Open Alert'
      ],
      warranty: '8 Years / 160,000 km Battery & Motor Warranty, 3 Years / 100,000 km Vehicle'
    },
    safetyRating: {
      ncapOrganization: 'Bharat NCAP',
      stars: 5,
      yearTested: 2024,
      adultSafetyPercent: 96,
      childSafetyPercent: 92,
      vulnerableRoadUserPercent: 78,
      safetyAssistPercent: 86,
      testNotes: 'Highest score recorded in Bharat NCAP history with 31.88/32 for adult occupant safety.'
    },
    internationalPricing: [
      { marketCode: 'IN', marketName: 'India', currency: 'INR', price: 2500000, formatted: '₹25.0 Lakh', localTaxNote: 'Introductory ex-showroom price', updatedAt: '2026-03-01' },
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 30100, formatted: '$30,100', localTaxNote: 'Estimated international equivalent', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 23800, formatted: '£23,800', localTaxNote: 'Estimated export equivalent', updatedAt: '2026-03-01' },
      { marketCode: 'AE', marketName: 'United Arab Emirates', currency: 'AED', price: 110000, formatted: 'AED 110,000', localTaxNote: 'Estimated GCC equivalent', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Sunlit Yellow Metallic', hex: '#d9a300', finish: 'Metallic' },
      { name: 'Oberon Black', hex: '#111215', finish: 'Solid' },
      { name: 'Pristine White', hex: '#f7f8f9', finish: 'Solid' },
      { name: 'Seaweed Green Metallic', hex: '#2e433b', finish: 'Metallic' },
      { name: 'Ash Grey', hex: '#63676c', finish: 'Metallic' }
    ],
    gallery: [
      {
        id: 'img-harrier-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80',
        caption: 'Tata Harrier.ev commanding stance showcasing Land Rover D8-derived pedigree and EV aerodynamics',
        isPrimary: true,
        verifiedSource: 'Tata Motors Passenger Vehicles Media Portal (Mumbai)'
      },
      {
        id: 'img-harrier-2',
        category: 'Profile',
        url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80',
        caption: 'Muscular side silhouette with aeroblade diamond-cut 19-inch wheels',
        verifiedSource: 'Tata Motors Design Center UK'
      },
      {
        id: 'img-harrier-3',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        caption: 'Dual screen high-tech dashboard with touch climate panel and illuminated steering emblem',
        verifiedSource: 'Tata Motors Product Media'
      }
    ],
    pros: [
      'Uncompromising 5-star crash safety on solid Land Rover-derived OMEGArc/acti.ev foundation',
      'Dual-motor AWD delivers rapid 5.9-second 0-100 km/h acceleration with genuine rough-road grip',
      'Substantial 520 km real-world certified range and 150 kW DC fast charging',
      'Class-leading road presence and opulent feature package at an accessible price point'
    ],
    cons: [
      'Fit and finish of minor switchgear still lags behind premium German rivals',
      'Public fast-charging infrastructure varies significantly across tier-2 and tier-3 routes',
      'Large turning circle in tight parking spaces'
    ],
    expertVerdict: 'A triumphant milestone for Indian automotive engineering. Tata has taken their flagship SUV and elevated it with brutal electric performance, genuine all-wheel-drive capability, and unmatched structural safety.',
    verifiedDataSource: {
      sourceName: 'Tata Motors Corporate Disclosures & ARAI Certification Records',
      retrievedDate: '2026-02-25',
      officialCatalogUrl: 'https://ev.tatamotors.com/harrier-ev.html',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified against ARAI AIS-040 homologation certificates.'
    },
    isTrending: true,
    isLatestLaunch: true,
    featuredOrder: 6
  },
  {
    id: 'car-hyundai-ioniq-5-n',
    brandId: 'brand-hyundai',
    brandName: 'Hyundai',
    brandCountry: 'South Korea',
    name: 'Ioniq 5 N',
    slug: 'hyundai-ioniq-5-n',
    modelYear: 2026,
    generation: 'Generation I',
    bodyStyle: 'Hatchback',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2024-03-20',
    powertrainType: 'Battery Electric',
    basePrice: {
      currency: 'USD',
      amount: 66100,
      formatted: '$66,100'
    },
    variants: [
      {
        id: 'var-ioniq-5-n-base',
        name: '5 N Performance AWD',
        trimLevel: 'N High Performance',
        price: { currency: 'USD', amount: 66100, formatted: '$66,100' },
        powerHp: 641,
        torqueNm: 770,
        zeroToHundredKphSec: 3.4,
        topSpeedKph: 260,
        rangeKm: 448,
        batteryKwh: 84.0,
        transmission: 'Single-Speed with N e-Shift Virtual 8-Speed Paddle System',
        driveType: 'AWD',
        keyFeatures: ['N e-Shift virtual dual-clutch simulated gearshifts', 'N Active Sound+ synthesized combustion acoustics', 'N Drift Optimizer with torque kick function']
      }
    ],
    specs: {
      maxPowerHp: 641,
      maxPowerKw: 478,
      maxTorqueNm: 770,
      transmission: 'Single-Speed Dual Motor with N e-Shift virtual DCT logic',
      gearCount: 1,
      driveType: 'AWD',
      zeroToHundredKphSec: 3.4,
      topSpeedKph: 260,
      batteryCapacityKwh: 84.0,
      usableBatteryKwh: 80.0,
      electricRangeKm: 448,
      chargingSpeedKw: 350,
      chargingTime10to80Min: 18,
      emissionStandard: 'Zero Emission / Euro 6e'
    },
    dimensions: {
      lengthMm: 4715,
      widthMm: 1940,
      heightMm: 1585,
      wheelbaseMm: 3000,
      groundClearanceMm: 142,
      bootCapacityLiters: 480,
      seatingCapacity: 5,
      doors: 5,
      kerbWeightKg: 2205,
      wheelSizeInches: 21,
      tyreSpecs: '275/35 ZR21 Pirelli P-Zero Elect HN'
    },
    equipment: {
      safety: [
        'Hyundai SmartSense ADAS with Forward Collision-Avoidance Assist 2.0',
        '7 Airbags including front-seat centre side airbag',
        'Electronic Stability Control with N Corner Carving Differential (e-LSD)',
        'Heavy-duty 400mm front brakes with 4-piston monobloc calipers'
      ],
      interior: [
        'N Light bucket sports seats with illuminated N logos and reinforced bolsters',
        'N bespoke performance steering wheel with N Grin Boost (NGB) button',
        'Alcantara and recycled poly sports trim with Performance Blue stitching',
        'Sliding centre console optimized for track leg bracing'
      ],
      infotainment: [
        'Dual 12.3-inch curved panoramic display with dedicated N Performance Pages',
        'Bose 8-speaker premium audio system with external speakers for N Active Sound',
        'Track day telemetry recording with lap times and G-force maps',
        'Wireless smartphone charging with cooling vent'
      ],
      exterior: [
        'N exclusive aerodynamic bodykit with luminous orange front splitter and diffuser',
        'Functional air curtains and active front air flaps',
        'WRC-inspired roof spoiler with triangular third brake light',
        '21-inch lightweight forged aluminium wheels'
      ],
      adasFeatures: [
        'Highway Driving Assist 2 with lane change assist',
        'Blind-Spot View Monitor with live camera feed in cluster',
        'Remote Smart Parking Assist 2 (RSPA 2)',
        'Surround View Monitor with 360-degree top view'
      ],
      warranty: '10 Years / 160,000 km Powertrain Warranty, 5 Years / 100,000 km Bumper-to-Bumper'
    },
    safetyRating: {
      ncapOrganization: 'Euro NCAP',
      stars: 5,
      yearTested: 2023,
      adultSafetyPercent: 88,
      childSafetyPercent: 86,
      vulnerableRoadUserPercent: 63,
      safetyAssistPercent: 88,
      testNotes: 'Outstanding battery enclosure integrity and high-voltage isolation during side impact.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 66100, formatted: '$66,100', localTaxNote: 'Base MSRP', updatedAt: '2026-03-01' },
      { marketCode: 'EU', marketName: 'Germany / Europe', currency: 'EUR', price: 74900, formatted: '€74,900', localTaxNote: 'Includes 19% VAT', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 65000, formatted: '£65,000', localTaxNote: 'Includes UK VAT', updatedAt: '2026-03-01' },
      { marketCode: 'KR', marketName: 'South Korea', currency: 'KRW', price: 76000000, formatted: '₩76,000,000', localTaxNote: 'Before eco subsidies', updatedAt: '2026-03-01' },
      { marketCode: 'AU', marketName: 'Australia', currency: 'AUD', price: 111000, formatted: 'A$111,000', localTaxNote: 'Driveaway price', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Performance Blue Matte', hex: '#638eb4', finish: 'Matte' },
      { name: 'Abyss Black Pearl', hex: '#121316', finish: 'Pearl' },
      { name: 'Cyber Grey Metallic', hex: '#80858e', finish: 'Metallic' },
      { name: 'Atlas White', hex: '#f2f3f5', finish: 'Solid' },
      { name: 'Soultronic Orange Pearl', hex: '#d9541e', finish: 'Pearl' }
    ],
    gallery: [
      {
        id: 'img-ioniq-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
        caption: 'Hyundai Ioniq 5 N in iconic Performance Blue with luminous orange aero highlights',
        isPrimary: true,
        verifiedSource: 'Hyundai Motor Company Global Media (Seoul)'
      },
      {
        id: 'img-ioniq-2',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        caption: 'Track-ready bucket seats, N steering buttons, and digital performance pages',
        verifiedSource: 'Hyundai N Worldwide'
      }
    ],
    pros: [
      'The first EV that genuinely thrills petrolheads with simulated gearshifts and pops',
      'Astonishing 641 hp output with 0-100 km/h in 3.4 seconds',
      'Ultra-fast 800V charging refuels from 10% to 80% in just 18 minutes',
      'Remarkably practical 5-passenger hatchback layout for weekday commutes'
    ],
    cons: [
      'Track modes deplete battery range rapidly during sustained hot laps',
      'Firm suspension damping on potholed city streets',
      'Heavier kerb weight (2,205 kg) than internal combustion hot hatches'
    ],
    expertVerdict: 'A triumph of madcap brilliance. The Hyundai Ioniq 5 N proves electric performance cars do not have to be soulless straight-line appliances. It is hilarious, engaging, and deeply capable on both track and street.',
    verifiedDataSource: {
      sourceName: 'Hyundai N Worldwide Engineering & Homologation Office',
      retrievedDate: '2026-02-14',
      officialCatalogUrl: 'https://www.hyundai-n.com/en/models/ioniq-5-n.do',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified with KATRI (Korea Automobile Testing & Research Institute) certificates.'
    },
    isTrending: true,
    isLatestLaunch: false,
    featuredOrder: 7
  },
  {
    id: 'car-tesla-model-s-plaid',
    brandId: 'brand-tesla',
    brandName: 'Tesla',
    brandCountry: 'United States',
    name: 'Model S Plaid',
    slug: 'tesla-model-s-plaid',
    modelYear: 2026,
    generation: 'Generation II Refresh',
    bodyStyle: 'Sedan',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2023-01-01',
    powertrainType: 'Battery Electric',
    basePrice: {
      currency: 'USD',
      amount: 89990,
      formatted: '$89,990'
    },
    variants: [
      {
        id: 'var-plaid-tri-motor',
        name: 'Plaid Tri-Motor AWD',
        trimLevel: 'Hyper Performance',
        price: { currency: 'USD', amount: 89990, formatted: '$89,990' },
        powerHp: 1020,
        torqueNm: 1420,
        zeroToHundredKphSec: 2.1,
        topSpeedKph: 322,
        rangeKm: 578,
        batteryKwh: 100.0,
        transmission: 'Single-Speed Direct Drive',
        driveType: 'AWD',
        keyFeatures: ['Carbon-sleeved rotors with torque vectoring', 'Track Package with carbon ceramic brakes', 'Yoke or Round steering wheel choice']
      },
      {
        id: 'var-model-s-long-range',
        name: 'Model S Dual-Motor Long Range',
        trimLevel: 'Grand Touring Long Range',
        price: { currency: 'USD', amount: 74990, formatted: '$74,990' },
        powerHp: 670,
        torqueNm: 755,
        zeroToHundredKphSec: 3.2,
        topSpeedKph: 250,
        rangeKm: 647,
        batteryKwh: 100.0,
        transmission: 'Single-Speed Direct Drive',
        driveType: 'AWD',
        keyFeatures: ['Adaptive air suspension with smart location memory', 'Sub-0.208 Cd drag coefficient', 'Glass panoramic roof']
      }
    ],
    specs: {
      maxPowerHp: 1020,
      maxPowerKw: 760,
      maxTorqueNm: 1420,
      transmission: 'Single-Speed Dual/Tri-Motor with Carbon-Sleeved Rotors',
      gearCount: 1,
      driveType: 'AWD',
      zeroToHundredKphSec: 2.1,
      topSpeedKph: 322,
      batteryCapacityKwh: 100.0,
      usableBatteryKwh: 95.0,
      electricRangeKm: 578,
      chargingSpeedKw: 250,
      chargingTime10to80Min: 27,
      emissionStandard: 'Zero Emission / EPA Tier 3'
    },
    dimensions: {
      lengthMm: 4980,
      widthMm: 1964,
      heightMm: 1440,
      wheelbaseMm: 2960,
      groundClearanceMm: 126,
      bootCapacityLiters: 709,
      frunkCapacityLiters: 89,
      seatingCapacity: 5,
      doors: 5,
      kerbWeightKg: 2162,
      wheelSizeInches: 21,
      tyreSpecs: 'Front 265/35 R21, Rear 295/30 R21 Michelin Pilot Sport 4S'
    },
    equipment: {
      safety: [
        'Rigid aluminum and high-strength steel chassis with lowest rollover risk in NHTSA tests',
        '8 active cameras with 360-degree vision processing',
        'Automatic Emergency Braking and obstacle-aware acceleration mitigation',
        'Front and side-curtain curtain airbags with smart passenger sensing'
      ],
      interior: [
        'Vegan leather upholstery with ventilated front seats',
        'Tri-zone climate control with HEPA Bioweapon Defense Mode',
        'Hidden invisible HVAC air vents with directional touch steering',
        'Active road noise cancellation via microphones in seat cushions'
      ],
      infotainment: [
        '17-inch horizontal cinema touchscreen with 2200x1300 resolution and gaming PC GPU',
        'Rear 8-inch passenger display for media and climate controls',
        '22-speaker, 960-watt premium audio system with active acoustic tuning',
        'Multi-device wireless smartphone charging docks'
      ],
      exterior: [
        'Aerodynamic drag coefficient of 0.208 Cd',
        'Power liftgate with deep under-floor trunk cavern',
        'LED headlights with adaptive matrix beam',
        'Carbon fibre rear decklid spoiler'
      ],
      adasFeatures: [
        'Autopilot standard with traffic-aware cruise control and autosteer',
        'Full Self-Driving (Supervised) capability with neural network navigation',
        'Auto Lane Change on highway ramps',
        'Autopark and Summon functionality'
      ],
      warranty: '8 Years / 240,000 km Battery & Drive Unit Warranty, 4 Years / 80,000 km Vehicle'
    },
    safetyRating: {
      ncapOrganization: 'Euro NCAP',
      stars: 5,
      yearTested: 2023,
      adultSafetyPercent: 94,
      childSafetyPercent: 91,
      vulnerableRoadUserPercent: 85,
      safetyAssistPercent: 98,
      testNotes: 'Scored 98% in Safety Assist — the highest safety assist score in Euro NCAP history.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 89990, formatted: '$89,990', localTaxNote: 'Federal incentives may apply', updatedAt: '2026-03-01' },
      { marketCode: 'EU', marketName: 'Germany / Europe', currency: 'EUR', price: 109990, formatted: '€109,990', localTaxNote: 'Includes 19% VAT', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 92000, formatted: '£92,000', localTaxNote: 'Estimated import cost', updatedAt: '2026-03-01' },
      { marketCode: 'AE', marketName: 'United Arab Emirates', currency: 'AED', price: 384000, formatted: 'AED 384,000', localTaxNote: 'Includes 5% VAT', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Ultra Red', hex: '#991122', finish: 'Metallic' },
      { name: 'Solid Black', hex: '#111215', finish: 'Solid' },
      { name: 'Stealth Grey', hex: '#373a40', finish: 'Metallic' },
      { name: 'Pearl White Multi-Coat', hex: '#f0f2f5', finish: 'Pearl' },
      { name: 'Deep Blue Metallic', hex: '#1a2e5c', finish: 'Metallic' }
    ],
    gallery: [
      {
        id: 'img-tesla-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=80',
        caption: 'Tesla Model S Plaid in Ultra Red displaying ultra-low aerodynamic silhouette',
        isPrimary: true,
        verifiedSource: 'Tesla Media Relations (Austin, TX)'
      },
      {
        id: 'img-tesla-2',
        category: 'Interior',
        url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80',
        caption: 'Minimalist cockpit with 17-inch tilt display and dual wireless chargers',
        verifiedSource: 'Tesla Global Press Pack'
      }
    ],
    pros: [
      'Unbelievable 1,020 horsepower delivers sub-2.1s 0-100 km/h hypercar acceleration',
      'Giant 709L liftback trunk plus front frunk makes it exceptionally practical for family travel',
      'Unrivalled access to the global Tesla Supercharger high-speed charging network',
      'Benchmark vehicle software with seamless over-the-air performance updates'
    ],
    cons: [
      'Interior build tolerances and cabin materials trail established German luxury rivals',
      'Track endurance requires optional $20,000 carbon ceramic brake package',
      'Absence of physical stalks for indicators and gear selection takes adaptation'
    ],
    expertVerdict: 'The Model S Plaid remains the undisputed king of electric straight-line acceleration. While other luxury makers craft plusher interiors, nothing else with five seats and a massive hatchback can outrun million-dollar hypercars so nonchalantly.',
    verifiedDataSource: {
      sourceName: 'Tesla Regulatory Disclosures & EPA Certificate of Conformity',
      retrievedDate: '2026-02-10',
      officialCatalogUrl: 'https://www.tesla.com/models',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified with US EPA and NHTSA databases.'
    },
    isTrending: false,
    isLatestLaunch: false,
    featuredOrder: 8
  },
  {
    id: 'car-byd-seal-awd',
    brandId: 'brand-byd',
    brandName: 'BYD',
    brandCountry: 'China',
    name: 'Seal Performance AWD',
    slug: 'byd-seal-performance-awd',
    modelYear: 2026,
    generation: 'Generation I (e-Platform 3.0)',
    bodyStyle: 'Sedan',
    primaryMarket: 'Global',
    availabilityStatus: 'Available Now',
    launchDate: '2024-02-15',
    powertrainType: 'Battery Electric',
    basePrice: {
      currency: 'USD',
      amount: 45000,
      formatted: '$45,000'
    },
    variants: [
      {
        id: 'var-seal-perf',
        name: 'Performance AWD Dual Motor',
        trimLevel: 'Flagship Performance',
        price: { currency: 'USD', amount: 45000, formatted: '$45,000' },
        powerHp: 523,
        torqueNm: 670,
        zeroToHundredKphSec: 3.8,
        topSpeedKph: 200,
        rangeKm: 520,
        batteryKwh: 82.5,
        transmission: 'Single-Speed Automatic',
        driveType: 'AWD',
        keyFeatures: ['Cell-to-Body (CTB) Blade Battery', 'iTAC Intelligent Torque Adaptation Control', 'Frequency Selective Damping (FSD) shocks']
      },
      {
        id: 'var-seal-design',
        name: 'Design Extended Range RWD',
        trimLevel: 'Grand Touring Long Range',
        price: { currency: 'USD', amount: 39500, formatted: '$39,500' },
        powerHp: 308,
        torqueNm: 360,
        zeroToHundredKphSec: 5.9,
        topSpeedKph: 180,
        rangeKm: 570,
        batteryKwh: 82.5,
        transmission: 'Single-Speed Automatic',
        driveType: 'RWD',
        keyFeatures: ['Rotating 15.6-inch infotainment screen', 'Dynaudio 12-speaker audio system', 'Head-up display']
      }
    ],
    specs: {
      maxPowerHp: 523,
      maxPowerKw: 390,
      maxTorqueNm: 670,
      transmission: 'Single-Speed Reduction Gear',
      gearCount: 1,
      driveType: 'AWD',
      zeroToHundredKphSec: 3.8,
      topSpeedKph: 200,
      batteryCapacityKwh: 82.5,
      usableBatteryKwh: 80.0,
      electricRangeKm: 520,
      chargingSpeedKw: 150,
      chargingTime10to80Min: 32,
      emissionStandard: 'Zero Emission / Euro 6e'
    },
    dimensions: {
      lengthMm: 4800,
      widthMm: 1875,
      heightMm: 1460,
      wheelbaseMm: 2920,
      groundClearanceMm: 140,
      bootCapacityLiters: 400,
      frunkCapacityLiters: 53,
      seatingCapacity: 5,
      doors: 4,
      kerbWeightKg: 2185,
      wheelSizeInches: 19,
      tyreSpecs: '235/45 R19 Continental EcoContact 6 Q'
    },
    equipment: {
      safety: [
        'Blade Battery passes nail penetration test without thermal runaway fire or smoke',
        '9 SRS Airbags including front-seat far-side airbag',
        'Cell-to-Body structural integration doubles torsional rigidity to 40,500 Nm/deg',
        '360-degree panoramic camera with transparent chassis view'
      ],
      interior: [
        'Ocean aesthetic with undulating suede and leather dashboard styling',
        'Crystal gear selector with physical drive mode buttons',
        'Heated and ventilated 8-way power adjustable sports seats',
        'Full panoramic glass roof with silver-plated thermal insulation'
      ],
      infotainment: [
        '15.6-inch electrically rotating central touchscreen (portrait or landscape)',
        '10.25-inch LCD driver information display',
        'Dynaudio 12-speaker hi-fi audio system with bespoke acoustic equalizer',
        'Dual 15W wireless inductive smartphone charging trays'
      ],
      exterior: [
        'Ocean X face design with ripple LED daytime running lights',
        'Water-drop pattern rear dot-matrix LED taillight strip',
        'Aerodynamic drag coefficient of 0.219 Cd',
        '19-inch bi-colour aerodynamic blade alloys'
      ],
      adasFeatures: [
        'Adaptive Cruise Control with Intelligent Cruise Control',
        'Automatic Emergency Braking (AEB) and Predictive Collision Warning',
        'Blind Spot Detection (BSD) with Emergency Lane Keeping',
        'Door Opening Warning and Rear Cross Traffic Alert with braking'
      ],
      warranty: '8 Years / 160,000 km Battery Warranty, 6 Years / 150,000 km Vehicle Warranty'
    },
    safetyRating: {
      ncapOrganization: 'Euro NCAP',
      stars: 5,
      yearTested: 2023,
      adultSafetyPercent: 89,
      childSafetyPercent: 87,
      vulnerableRoadUserPercent: 82,
      safetyAssistPercent: 76,
      testNotes: 'Exceptional side barrier impact score thanks to rigid Cell-to-Body Blade battery construction.'
    },
    internationalPricing: [
      { marketCode: 'US', marketName: 'United States', currency: 'USD', price: 45000, formatted: '$45,000', localTaxNote: 'Global currency benchmark', updatedAt: '2026-03-01' },
      { marketCode: 'EU', marketName: 'Germany / Europe', currency: 'EUR', price: 47990, formatted: '€47,990', localTaxNote: 'Includes 19% VAT', updatedAt: '2026-03-01' },
      { marketCode: 'GB', marketName: 'United Kingdom', currency: 'GBP', price: 48695, formatted: '£48,695', localTaxNote: 'Includes VAT', updatedAt: '2026-03-01' },
      { marketCode: 'IN', marketName: 'India', currency: 'INR', price: 4100000, formatted: '₹41.0 Lakh', localTaxNote: 'Ex-showroom price', updatedAt: '2026-03-01' },
      { marketCode: 'AU', marketName: 'Australia', currency: 'AUD', price: 68748, formatted: 'A$68,748', localTaxNote: 'Driveaway retail price', updatedAt: '2026-03-01' }
    ],
    colors: [
      { name: 'Arctic Blue', hex: '#68849b', finish: 'Metallic' },
      { name: 'Atlantis Grey', hex: '#484d54', finish: 'Metallic' },
      { name: 'Aurora White', hex: '#eff2f5', finish: 'Solid' },
      { name: 'Space Black', hex: '#141518', finish: 'Metallic' }
    ],
    gallery: [
      {
        id: 'img-seal-1',
        category: 'Hero',
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=80',
        caption: 'BYD Seal Performance in Arctic Blue showing sculpted ocean aerodynamic front',
        isPrimary: true,
        verifiedSource: 'BYD Company Global Media Center (Shenzhen)'
      },
      {
        id: 'img-seal-2',
        category: 'Profile',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        caption: 'Fastback coupe proportions with flush door handles and 0.219 drag coefficient',
        verifiedSource: 'BYD Global Press Office'
      }
    ],
    pros: [
      'Outstanding price-to-performance ratio delivering 523 hp under $50,000',
      'Ultra-safe cobalt-free LFP Blade Battery with class-leading thermal stability',
      'Very refined ride with frequency-selective dampers and low cabin wind noise',
      'Generous standard equipment including head-up display and Dynaudio speakers'
    ],
    cons: [
      'Peak DC charging speed (150 kW) is modest compared to 800V rivals',
      'Driver assistance audio beeps can be overzealous on narrow European streets',
      'Boot opening aperture is relatively shallow'
    ],
    expertVerdict: 'The BYD Seal is one of the most formidable electric sedans on the market. With its rigid Cell-to-Body architecture, safe Blade Battery, and punchy 3.8-second acceleration, it offers tremendous value and true global maturity.',
    verifiedDataSource: {
      sourceName: 'BYD Automotive Engineering Research Institute',
      retrievedDate: '2026-02-18',
      officialCatalogUrl: 'https://www.byd.com/en/car/seal',
      verificationLevel: 'Official OEM Specification',
      verifierNotes: 'Verified with Euro NCAP and CATARC certification documents.'
    },
    isTrending: false,
    isLatestLaunch: true,
    featuredOrder: 9
  }
];

export const initialVehicles: Vehicle[] = [
  ...baseVehicles.map((v) => ({
    ...v,
    era: v.era || ('Modern' as const),
    viewsMultiAngle: v.viewsMultiAngle || {
      front: v.gallery[0]?.url,
      side: v.gallery[1]?.url || v.gallery[0]?.url,
      top: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80',
      rear: v.gallery[2]?.url || v.gallery[0]?.url,
      interior:
        v.gallery.find((g) => g.category.includes('Interior') || g.category.includes('Dashboard'))?.url ||
        v.gallery[1]?.url ||
        v.gallery[0]?.url
    }
  })),
  ...classicAndUpcomingVehicles
];

export const initialArticles: Article[] = [
  {
    id: 'art-solid-state-breakthrough',
    slug: 'solid-state-batteries-commercial-readiness-2026',
    title: 'Solid-State Battery Tech Reaches Pilot Production: The 1,000 km EV Era Begins',
    category: 'Technology',
    summary: 'A deep-dive investigation into how Toyota, BMW, and QuantumScape are transitioning solid electrolyte pouch cells from laboratory prototypes into initial production validation.',
    author: 'Dr. Julian Vane, Automotive Systems Fellow',
    readTime: '6 min read',
    publishedDate: '2026-03-28',
    content: `The automotive powertrain landscape is crossing its most crucial threshold since the arrival of commercial lithium-ion cells. As global automotive standards push for higher energy density without thermal vulnerability, solid-state battery architecture has progressed from theoretical patents into automated pilot production lines in Japan and Germany.\n\nKey advantages verified in independent laboratory trials include volumetric energy densities surpassing 450 Wh/kg, near-zero flammability, and the capability to accept continuous 10C fast-charge pulses without dendritic short-circuits. Automakers are prioritizing initial rollout in limited-series halo supercars and flagship grand tourers before scaling supply chains for mass-market compact vehicles by late 2028.`
  },
  {
    id: 'art-global-ncap-harmonization',
    slug: 'global-crash-safety-standards-harmonization',
    title: 'Global Crash Safety Standards: How Euro NCAP, Bharat NCAP, and NHTSA Compare',
    category: 'Industry Intelligence',
    summary: 'Analyzing the testing protocols, child occupant dynamics, and active ADAS scoring differences across the world’s foremost vehicle safety evaluation bodies.',
    author: 'Elena Rostova, Chief Vehicle Safety Analyst',
    readTime: '8 min read',
    publishedDate: '2026-03-14',
    content: `When a consumer views a "5-Star Safety Rating," the underlying regulatory criteria vary substantially by jurisdiction. Euro NCAP places immense weight on vulnerable road user protection and algorithmic driver monitoring systems. Bharat NCAP in India evaluates rigorous structural intrusion under offset frontal collisions and lateral pole tests designed for diverse road topographies.\n\nOur cross-jurisdictional study details how contemporary modular platforms like Volkswagen MEB, BMW CLAR, and Tata acti.ev engineer crumple zones to comply simultaneously with North American FMVSS standards and European ECE regulations.`
  },
  {
    id: 'art-luxury-v12-hybrid-renaissance',
    slug: 'v12-hybrid-supercar-renaissance',
    title: 'Electrified V12 Engines: Why Ferrari and Lamborghini Are Keeping Cylinders Alive',
    category: 'First Drive',
    summary: 'Rather than ditching multi-cylinder combustion completely, exotic Italian manufacturers have turned to hybrid electric axial-flux motors to elevate high-revving naturally aspirated engines.',
    author: 'Marco Bellini, Senior Motorsport Editor',
    readTime: '5 min read',
    publishedDate: '2026-02-22',
    content: `Rather than resigning multi-cylinder atmospheric engines to history, Maranello and Sant’Agata Bolognese have reinvented internal combustion through hybrid integration. By employing lightweight axial-flux electric motors directly adjacent to the gearbox and front axle, engineers eliminate low-RPM turbo lag without sacrificing the spine-tingling acoustic crescendo of an 8,500+ RPM redline.`
  }
];

export const initialDataSources: DataSourceRecord[] = [
  {
    id: 'ds-1',
    name: 'KBA Type Approval Register (Kraftfahrt-Bundesamt)',
    organization: 'German Federal Motor Transport Authority',
    coverageCountries: ['Germany', 'European Union'],
    url: 'https://www.kba.de',
    verificationLevel: 'Government Homologation Authority',
    recordsCount: 4820,
    lastSyncedAt: '2026-04-05T08:30:00Z',
    status: 'Active'
  },
  {
    id: 'ds-2',
    name: 'Euro NCAP Technical Testing Archive',
    organization: 'European New Car Assessment Programme',
    coverageCountries: ['European Union', 'United Kingdom'],
    url: 'https://www.euroncap.com',
    verificationLevel: 'Independent Crash Safety Standard',
    recordsCount: 1240,
    lastSyncedAt: '2026-04-02T12:00:00Z',
    status: 'Active'
  },
  {
    id: 'ds-3',
    name: 'ARAI Homologation Registry (Automotive Research Association of India)',
    organization: 'Ministry of Heavy Industries, Govt. of India',
    coverageCountries: ['India'],
    url: 'https://www.araiindia.com',
    verificationLevel: 'National Homologation Authority',
    recordsCount: 3110,
    lastSyncedAt: '2026-03-29T14:15:00Z',
    status: 'Active'
  },
  {
    id: 'ds-4',
    name: 'NHTSA Vehicle Safety & EPA Fuel Economy Database',
    organization: 'US National Highway Traffic Safety Administration & EPA',
    coverageCountries: ['United States'],
    url: 'https://www.nhtsa.gov',
    verificationLevel: 'Federal Regulatory Registry',
    recordsCount: 5690,
    lastSyncedAt: '2026-04-01T09:45:00Z',
    status: 'Active'
  },
  {
    id: 'ds-5',
    name: 'OEM Official Manufacturer Press & Engineering Portals',
    organization: 'Authorized Global Automaker Press Portals',
    coverageCountries: ['Global'],
    url: 'https://press.autoverse-global.internal',
    verificationLevel: 'Official Manufacturer OEM Documentation',
    recordsCount: 14200,
    lastSyncedAt: '2026-04-06T10:00:00Z',
    status: 'Active'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    vehicleId: 'car-porsche-taycan-turbo-s',
    vehicleName: 'Porsche Taycan Turbo S',
    authorName: 'Marcus Sterling',
    rating: 5,
    title: 'The Active Ride suspension is nothing short of witchcraft',
    reviewText: 'Coming from a 992 GT3 and a Model S, the Gen-2 Taycan Turbo S has astonished me. The Porsche Active Ride system absorbs cobblestones like a velvet carpet, yet you flick into Sport Plus and body roll ceases to exist. Launch control creates an instant physical roller-coaster rush.',
    date: '2026-03-20',
    verifiedOwner: true,
    ownershipPeriod: '6 months / 12,000 km'
  },
  {
    id: 'rev-2',
    vehicleId: 'car-bmw-ix-m60',
    vehicleName: 'BMW iX M60 xDrive',
    authorName: 'David K. Hoffman',
    rating: 5,
    title: 'Supreme acoustic quietness and real 500+ km motorway range',
    reviewText: 'Photos do not do the iX interior justice. The open lounge architecture, panoramic electrochromic roof, and Bowers & Wilkins diamond sound system turn 6-hour cross-country journeys into pure relaxation.',
    date: '2026-02-14',
    verifiedOwner: true,
    ownershipPeriod: '1 year / 24,000 km'
  },
  {
    id: 'rev-3',
    vehicleId: 'car-tata-harrier-ev',
    vehicleName: 'Tata Harrier.ev Stealth AWD',
    authorName: 'Ananya Deshmukh',
    rating: 5,
    title: 'Tank-like build quality with zero tailpipe emissions and real AWD',
    reviewText: 'Drove through heavy monsoon rain on the Mumbai-Goa highway. The dual-motor AWD system never flinched through waterlogged tracks, and the Bharat NCAP 5-star crash safety gives tremendous peace of mind. Truly proud of how Tata has designed this vehicle.',
    date: '2026-03-05',
    verifiedOwner: true,
    ownershipPeriod: '3 months / 7,500 km'
  }
];
