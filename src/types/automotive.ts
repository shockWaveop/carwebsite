export type PowertrainType =
  | 'Battery Electric'
  | 'Hybrid'
  | 'Plug-in Hybrid'
  | 'Petrol'
  | 'Diesel'
  | 'Hydrogen Fuel Cell';

export type BodyStyle =
  | 'SUV'
  | 'Sedan'
  | 'Hatchback'
  | 'Coupe'
  | 'Sports Car'
  | 'Convertible'
  | 'MPV'
  | 'Pickup';

export type AvailabilityStatus =
  | 'Available Now'
  | 'Upcoming'
  | 'Discontinued'
  | 'Historical';

export interface VehicleVariant {
  id: string;
  name: string;
  trimLevel: string;
  price: {
    currency: string;
    amount: number;
    formatted: string;
  };
  powerHp: number;
  torqueNm: number;
  zeroToHundredKphSec: number;
  topSpeedKph: number;
  rangeKm?: number;
  batteryKwh?: number;
  displacementCc?: number;
  transmission: string;
  driveType: 'AWD' | 'RWD' | 'FWD';
  keyFeatures: string[];
}

export type VehicleEra = 'Classic / Historical' | 'Modern' | 'Upcoming / Concept';

export interface VehicleImage {
  id: string;
  category:
    | 'Hero'
    | 'Front'
    | 'Front 3/4'
    | 'Profile'
    | 'Top / Overhead'
    | 'Rear'
    | 'Rear 3/4'
    | 'Interior'
    | 'Dashboard'
    | 'Seating'
    | 'Wheel Detail'
    | 'Engine / Powertrain';
  url: string;
  caption: string;
  isPrimary?: boolean;
  verifiedSource: string;
}

export interface VehiclePricing {
  marketCode: string;
  marketName: string;
  currency: string;
  price: number;
  formatted: string;
  localTaxNote: string;
  updatedAt: string;
}

export interface VehicleSpecs {
  engineDisplacementCc?: number;
  cylinders?: number;
  maxPowerHp: number;
  maxPowerKw: number;
  maxTorqueNm: number;
  transmission: string;
  gearCount?: number;
  driveType: 'AWD' | 'RWD' | 'FWD';
  zeroToHundredKphSec: number;
  topSpeedKph: number;
  batteryCapacityKwh?: number;
  usableBatteryKwh?: number;
  electricRangeKm?: number;
  chargingSpeedKw?: number;
  chargingTime10to80Min?: number;
  fuelEfficiencyKmpl?: number;
  fuelEfficiencyMpg?: number;
  fuelTankCapacityLiters?: number;
  emissionStandard: string;
}

export interface VehicleDimensions {
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  wheelbaseMm: number;
  groundClearanceMm: number;
  bootCapacityLiters: number;
  frunkCapacityLiters?: number;
  seatingCapacity: number;
  doors: number;
  kerbWeightKg: number;
  wheelSizeInches: number;
  tyreSpecs: string;
}

export interface VehicleEquipment {
  safety: string[];
  interior: string[];
  infotainment: string[];
  exterior: string[];
  adasFeatures: string[];
  warranty: string;
}

export interface SafetyRating {
  ncapOrganization: string;
  stars: number;
  yearTested: number;
  adultSafetyPercent: number;
  childSafetyPercent: number;
  vulnerableRoadUserPercent: number;
  safetyAssistPercent: number;
  testNotes: string;
}

export interface VehicleColor {
  name: string;
  hex: string;
  finish: 'Metallic' | 'Pearl' | 'Solid' | 'Matte';
}

export interface DataSourceCitation {
  sourceName: string;
  retrievedDate: string;
  officialCatalogUrl: string;
  verificationLevel: 'Official OEM Specification' | 'National Homologation Authority' | 'Verified Independent Road Test';
  verifierNotes: string;
}

export interface Vehicle {
  id: string;
  brandId: string;
  brandName: string;
  brandCountry: string;
  name: string;
  slug: string;
  modelYear: number;
  generation: string;
  bodyStyle: BodyStyle;
  primaryMarket: string;
  availabilityStatus: AvailabilityStatus;
  launchDate: string;
  discontinuationDate?: string;
  powertrainType: PowertrainType;
  basePrice: {
    currency: string;
    amount: number;
    formatted: string;
  };
  variants: VehicleVariant[];
  specs: VehicleSpecs;
  dimensions: VehicleDimensions;
  equipment: VehicleEquipment;
  safetyRating: SafetyRating;
  internationalPricing: VehiclePricing[];
  colors: VehicleColor[];
  gallery: VehicleImage[];
  pros: string[];
  cons: string[];
  expertVerdict: string;
  verifiedDataSource: DataSourceCitation;
  isTrending?: boolean;
  isLatestLaunch?: boolean;
  featuredOrder?: number;
  era?: VehicleEra;
  viewsMultiAngle?: {
    front?: string;
    side?: string;
    top?: string;
    rear?: string;
    interior?: string;
  };
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string;
  foundedYear: number;
  headquarters: string;
  website: string;
  description: string;
  activeStatus: 'Active' | 'Discontinued';
  modelsCount: number;
  verified: boolean;
  primarySegments: string[];
  dataSources: string[];
  lastVerifiedAt: string;
  logoText: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  countryCode: string;
  name: string;
  email?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  lastLoginAt: string;
}

export interface SearchHistoryEntry {
  id: string;
  userId?: string;
  query: string;
  filters?: {
    bodyStyle?: string;
    powertrain?: string;
    brand?: string;
    priceRange?: string;
  };
  timestamp: string;
}

export interface Review {
  id: string;
  vehicleId: string;
  vehicleName: string;
  authorName: string;
  rating: number; // 1 to 5
  title: string;
  reviewText: string;
  date: string;
  verifiedOwner: boolean;
  ownershipPeriod: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'Industry Intelligence' | 'First Drive' | 'Technology' | 'Market Trends' | 'Sustainability';
  summary: string;
  author: string;
  readTime: string;
  publishedDate: string;
  content: string;
  relatedVehicleId?: string;
}

export interface DataSourceRecord {
  id: string;
  name: string;
  organization: string;
  coverageCountries: string[];
  url: string;
  verificationLevel: string;
  recordsCount: number;
  lastSyncedAt: string;
  status: 'Active' | 'Pending Audit' | 'Archived';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminUser: string;
  action: 'CREATE_VEHICLE' | 'UPDATE_VEHICLE' | 'DELETE_VEHICLE' | 'IMPORT_CSV' | 'UPDATE_PRICING' | 'VERIFY_RECORD';
  targetEntity: string;
  details: string;
}
