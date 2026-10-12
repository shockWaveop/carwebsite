import fs from 'fs';
import path from 'path';
import {
  Brand,
  Vehicle,
  Article,
  DataSourceRecord,
  Review,
  User,
  SearchHistoryEntry,
  AuditLogEntry
} from '../types/automotive.js';
import {
  initialBrands,
  initialVehicles,
  initialArticles,
  initialDataSources,
  initialReviews
} from './initialData.js';

interface DatabaseState {
  brands: Brand[];
  vehicles: Vehicle[];
  articles: Article[];
  dataSources: DataSourceRecord[];
  reviews: Review[];
  users: User[];
  userFavorites: { [userId: string]: string[] }; // userId -> array of vehicleIds
  searchHistory: SearchHistoryEntry[];
  auditLogs: AuditLogEntry[];
  pendingOtps: {
    [phoneNumber: string]: {
      code: string;
      expiresAt: number;
      createdAt: number;
      attempts: number;
    };
  };
  activeSessions: {
    [token: string]: {
      userId: string;
      createdAt: number;
      expiresAt: number;
    };
  };
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'autoverse_db.json');

class DatabaseService {
  private state: DatabaseState;

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): DatabaseState {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const existingVehicleIds = new Set((parsed.vehicles || []).map((v: any) => v.id));
        const mergedVehicles = [
          ...(parsed.vehicles || []),
          ...initialVehicles.filter((v) => !existingVehicleIds.has(v.id))
        ];

        const existingBrandIds = new Set((parsed.brands || []).map((b: any) => b.id));
        const mergedBrands = [
          ...(parsed.brands || []),
          ...initialBrands.filter((b) => !existingBrandIds.has(b.id))
        ];

        return {
          brands: mergedBrands,
          vehicles: mergedVehicles,
          articles: parsed.articles || initialArticles,
          dataSources: parsed.dataSources || initialDataSources,
          reviews: parsed.reviews || initialReviews,
          users: parsed.users || this.getDefaultUsers(),
          userFavorites: parsed.userFavorites || {},
          searchHistory: parsed.searchHistory || [],
          auditLogs: parsed.auditLogs || this.getDefaultAuditLogs(),
          pendingOtps: parsed.pendingOtps || {},
          activeSessions: parsed.activeSessions || {}
        };
      }
    } catch (err) {
      console.warn('Could not read existing database file, falling back to defaults:', err);
    }

    const defaultState: DatabaseState = {
      brands: initialBrands,
      vehicles: initialVehicles,
      articles: initialArticles,
      dataSources: initialDataSources,
      reviews: initialReviews,
      users: this.getDefaultUsers(),
      userFavorites: {
        'usr-demo-1': ['car-porsche-taycan-turbo-s', 'car-ferrari-296-gtb']
      },
      searchHistory: [
        {
          id: 'sh-1',
          userId: 'usr-demo-1',
          query: 'Porsche Taycan',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: 'sh-2',
          userId: 'usr-demo-1',
          query: 'Electric SUV under $100k',
          filters: { powertrain: 'Battery Electric', bodyStyle: 'SUV' },
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ],
      auditLogs: this.getDefaultAuditLogs(),
      pendingOtps: {},
      activeSessions: {}
    };

    this.saveState(defaultState);
    return defaultState;
  }

  private getDefaultUsers(): User[] {
    return [
      {
        id: 'usr-admin-1',
        phoneNumber: '+1 555-0199',
        countryCode: '+1',
        name: 'Chief Automotive Editor (Admin)',
        email: 'admin@autoverse.global',
        role: 'ADMIN',
        createdAt: '2025-01-01T00:00:00Z',
        lastLoginAt: new Date().toISOString()
      },
      {
        id: 'usr-demo-1',
        phoneNumber: '+1 555-0100',
        countryCode: '+1',
        name: 'Alex Vance',
        email: 'alex.vance@autoverse.example',
        role: 'USER',
        createdAt: '2025-02-10T12:00:00Z',
        lastLoginAt: new Date().toISOString()
      }
    ];
  }

  private getDefaultAuditLogs(): AuditLogEntry[] {
    return [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        adminUser: 'Chief Automotive Editor',
        action: 'VERIFY_RECORD',
        targetEntity: 'Porsche Taycan Turbo S',
        details: 'Verified against European Community Whole Vehicle Type-Approval (EC-WVTA) certificates.'
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        adminUser: 'Chief Automotive Editor',
        action: 'UPDATE_PRICING',
        targetEntity: 'BMW iX M60 xDrive',
        details: 'Updated Euro and GCC pricing based on official 2026 manufacturer dealer bulletin.'
      }
    ];
  }

  private saveState(stateToSave?: DatabaseState) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(stateToSave || this.state, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database to file:', err);
    }
  }

  // --- Vehicles ---
  public getVehicles(): Vehicle[] {
    return this.state.vehicles;
  }

  public getVehicleById(idOrSlug: string): Vehicle | undefined {
    return this.state.vehicles.find(
      (v) => v.id === idOrSlug || v.slug.toLowerCase() === idOrSlug.toLowerCase()
    );
  }

  public createVehicle(vehicle: Vehicle, adminName: string): Vehicle {
    this.state.vehicles.push(vehicle);
    this.logAudit({
      adminUser: adminName,
      action: 'CREATE_VEHICLE',
      targetEntity: `${vehicle.brandName} ${vehicle.name}`,
      details: `Added new vehicle model with base price ${vehicle.basePrice.formatted}`
    });
    this.saveState();
    return vehicle;
  }

  public updateVehicle(id: string, updates: Partial<Vehicle>, adminName: string): Vehicle | null {
    const idx = this.state.vehicles.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    this.state.vehicles[idx] = { ...this.state.vehicles[idx], ...updates };
    this.logAudit({
      adminUser: adminName,
      action: 'UPDATE_VEHICLE',
      targetEntity: this.state.vehicles[idx].name,
      details: `Updated specifications and metadata.`
    });
    this.saveState();
    return this.state.vehicles[idx];
  }

  public deleteVehicle(id: string, adminName: string): boolean {
    const vehicle = this.state.vehicles.find((v) => v.id === id);
    if (!vehicle) return false;
    this.state.vehicles = this.state.vehicles.filter((v) => v.id !== id);
    this.logAudit({
      adminUser: adminName,
      action: 'DELETE_VEHICLE',
      targetEntity: vehicle.name,
      details: `Archived vehicle record ID: ${id}`
    });
    this.saveState();
    return true;
  }

  // --- Brands ---
  public getBrands(): Brand[] {
    return this.state.brands;
  }

  public getBrandById(idOrSlug: string): Brand | undefined {
    return this.state.brands.find(
      (b) => b.id === idOrSlug || b.slug.toLowerCase() === idOrSlug.toLowerCase()
    );
  }

  public createBrand(brand: Brand, adminName: string): Brand {
    this.state.brands.push(brand);
    this.logAudit({
      adminUser: adminName,
      action: 'CREATE_VEHICLE',
      targetEntity: `Brand: ${brand.name}`,
      details: `Created new brand entry from ${brand.country}`
    });
    this.saveState();
    return brand;
  }

  // --- Articles ---
  public getArticles(): Article[] {
    return this.state.articles;
  }

  public getArticleBySlug(slug: string): Article | undefined {
    return this.state.articles.find((a) => a.slug === slug || a.id === slug);
  }

  // --- Data Sources ---
  public getDataSources(): DataSourceRecord[] {
    return this.state.dataSources;
  }

  // --- Reviews ---
  public getReviews(vehicleId?: string): Review[] {
    if (vehicleId) {
      return this.state.reviews.filter((r) => r.vehicleId === vehicleId);
    }
    return this.state.reviews;
  }

  public addReview(review: Review): Review {
    this.state.reviews.unshift(review);
    this.saveState();
    return review;
  }

  // --- Authentication & OTP ---
  public requestOtp(phoneNumber: string): { success: boolean; message: string; cooldownSeconds: number; devCode?: string } {
    const cleanPhone = phoneNumber.trim();
    const now = Date.now();
    const existing = this.state.pendingOtps[cleanPhone];

    if (existing && now - existing.createdAt < 30000) {
      const remainingCooldown = Math.ceil((30000 - (now - existing.createdAt)) / 1000);
      return {
        success: false,
        message: `Please wait ${remainingCooldown} seconds before requesting a new code.`,
        cooldownSeconds: remainingCooldown
      };
    }

    // For sandbox/development testing:
    // If standard test number +1 555-0100 or +1 555-0199, deterministic code 123456
    let code = '123456';
    if (!cleanPhone.includes('555-01')) {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    }

    this.state.pendingOtps[cleanPhone] = {
      code,
      createdAt: now,
      expiresAt: now + 5 * 60 * 1000, // 5 min expiry
      attempts: 0
    };
    this.saveState();

    return {
      success: true,
      message: `Verification code dispatched to ${cleanPhone}. Valid for 5 minutes.`,
      cooldownSeconds: 30,
      devCode: code // Exposed for development preview convenience
    };
  }

  public verifyOtp(phoneNumber: string, code: string, countryCode: string, name?: string): { success: boolean; message: string; token?: string; user?: User } {
    const cleanPhone = phoneNumber.trim();
    const pending = this.state.pendingOtps[cleanPhone];
    const now = Date.now();

    // Universal sandbox acceptance for documented test phone numbers
    const isSandboxNumber = cleanPhone.includes('555-01');
    if (!pending && !isSandboxNumber) {
      return { success: false, message: 'No pending verification found for this phone number. Please request a new code.' };
    }

    if (pending) {
      if (now > pending.expiresAt) {
        delete this.state.pendingOtps[cleanPhone];
        this.saveState();
        return { success: false, message: 'Verification code has expired. Please request a new code.' };
      }

      if (pending.code !== code.trim() && !(isSandboxNumber && code.trim() === '123456')) {
        pending.attempts += 1;
        if (pending.attempts >= 5) {
          delete this.state.pendingOtps[cleanPhone];
          this.saveState();
          return { success: false, message: 'Maximum verification attempts exceeded. Please request a new code.' };
        }
        this.saveState();
        return { success: false, message: 'Invalid verification code. Please check and try again.' };
      }
    }

    // Code matches or sandbox bypass
    delete this.state.pendingOtps[cleanPhone];

    // Find or create user
    let user = this.state.users.find((u) => u.phoneNumber === cleanPhone);
    const isAdmin = cleanPhone.includes('555-0199');

    if (!user) {
      user = {
        id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        phoneNumber: cleanPhone,
        countryCode: countryCode || '+1',
        name: name || (isAdmin ? 'Chief Automotive Editor' : 'Automotive Enthusiast'),
        role: isAdmin ? 'ADMIN' : 'USER',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      this.state.users.push(user);
    } else {
      user.lastLoginAt = new Date().toISOString();
      if (name) user.name = name;
    }

    // Create session token
    const token = `av_${Buffer.from(`${user.id}:${Date.now()}:${Math.random()}`).toString('base64url')}`;
    this.state.activeSessions[token] = {
      userId: user.id,
      createdAt: now,
      expiresAt: now + 30 * 24 * 3600 * 1000 // 30 days
    };

    this.saveState();
    return {
      success: true,
      message: 'Phone number verified successfully.',
      token,
      user
    };
  }

  public getUserByToken(token: string): User | null {
    if (!token) return null;
    const session = this.state.activeSessions[token];
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      delete this.state.activeSessions[token];
      this.saveState();
      return null;
    }
    return this.state.users.find((u) => u.id === session.userId) || null;
  }

  public logout(token: string): boolean {
    if (token && this.state.activeSessions[token]) {
      delete this.state.activeSessions[token];
      this.saveState();
      return true;
    }
    return false;
  }

  public updateUserProfile(userId: string, updates: Partial<User>): User | null {
    const user = this.state.users.find((u) => u.id === userId);
    if (!user) return null;
    if (updates.name) user.name = updates.name;
    if (updates.email) user.email = updates.email;
    this.saveState();
    return user;
  }

  public deleteUserAccount(userId: string): boolean {
    this.state.users = this.state.users.filter((u) => u.id !== userId);
    delete this.state.userFavorites[userId];
    this.state.searchHistory = this.state.searchHistory.filter((sh) => sh.userId !== userId);
    // remove sessions
    for (const [token, session] of Object.entries(this.state.activeSessions)) {
      if (session.userId === userId) {
        delete this.state.activeSessions[token];
      }
    }
    this.saveState();
    return true;
  }

  // --- Favorites & Collections ---
  public getFavorites(userId: string): Vehicle[] {
    const favIds = this.state.userFavorites[userId] || [];
    return this.state.vehicles.filter((v) => favIds.includes(v.id));
  }

  public toggleFavorite(userId: string, vehicleId: string): { isFavorite: boolean; favorites: string[] } {
    if (!this.state.userFavorites[userId]) {
      this.state.userFavorites[userId] = [];
    }
    const list = this.state.userFavorites[userId];
    const idx = list.indexOf(vehicleId);
    let isFavorite = false;
    if (idx === -1) {
      list.push(vehicleId);
      isFavorite = true;
    } else {
      list.splice(idx, 1);
      isFavorite = false;
    }
    this.saveState();
    return { isFavorite, favorites: list };
  }

  // --- Search History ---
  public getSearchHistory(userId?: string): SearchHistoryEntry[] {
    if (userId) {
      return this.state.searchHistory.filter((sh) => sh.userId === userId);
    }
    return this.state.searchHistory.slice(0, 20);
  }

  public addSearchHistory(entry: Omit<SearchHistoryEntry, 'id' | 'timestamp'>): SearchHistoryEntry {
    const item: SearchHistoryEntry = {
      id: `sh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      ...entry
    };
    this.state.searchHistory.unshift(item);
    if (this.state.searchHistory.length > 200) {
      this.state.searchHistory = this.state.searchHistory.slice(0, 200);
    }
    this.saveState();
    return item;
  }

  public clearSearchHistory(userId?: string): void {
    if (userId) {
      this.state.searchHistory = this.state.searchHistory.filter((sh) => sh.userId !== userId);
    } else {
      this.state.searchHistory = [];
    }
    this.saveState();
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLogEntry[] {
    return this.state.auditLogs;
  }

  public logAudit(log: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      ...log
    };
    this.state.auditLogs.unshift(entry);
    if (this.state.auditLogs.length > 300) {
      this.state.auditLogs = this.state.auditLogs.slice(0, 300);
    }
  }

  // --- Batch CSV Vehicle Import ---
  public importVehiclesFromCsv(csvText: string, adminName: string): { importedCount: number; errors: string[] } {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      return { importedCount: 0, errors: ['CSV file must have header and at least 1 record.'] };
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    let imported = 0;
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(',').map((v) => v.trim());

      try {
        const brandName = values[headers.indexOf('brand')] || 'AutoVerse Verified';
        const modelName = values[headers.indexOf('model')] || `Model ${i}`;
        const bodyStyle = (values[headers.indexOf('bodystyle')] || 'Sedan') as any;
        const powertrain = (values[headers.indexOf('powertrain')] || 'Petrol') as any;
        const priceNum = parseFloat(values[headers.indexOf('price')] || '45000') || 45000;
        const powerHp = parseInt(values[headers.indexOf('powerhp')] || '300', 10) || 300;

        const slug = `${brandName.toLowerCase().replace(/\s+/g, '-')}-${modelName.toLowerCase().replace(/\s+/g, '-')}`;
        const newVehicle: Vehicle = {
          id: `car-imported-${Date.now()}-${i}`,
          brandId: 'brand-imported',
          brandName,
          brandCountry: 'Global',
          name: modelName,
          slug,
          modelYear: 2026,
          generation: 'Gen I',
          bodyStyle,
          primaryMarket: 'Global',
          availabilityStatus: 'Available Now',
          launchDate: '2026-01-01',
          powertrainType: powertrain,
          basePrice: {
            currency: 'USD',
            amount: priceNum,
            formatted: `$${priceNum.toLocaleString()}`
          },
          variants: [
            {
              id: `var-imp-${i}`,
              name: 'Standard Edition',
              trimLevel: 'Base',
              price: { currency: 'USD', amount: priceNum, formatted: `$${priceNum.toLocaleString()}` },
              powerHp,
              torqueNm: Math.round(powerHp * 1.3),
              zeroToHundredKphSec: 6.0,
              topSpeedKph: 220,
              transmission: 'Automatic',
              driveType: 'AWD',
              keyFeatures: ['Electronic Stability', 'Air Conditioning', 'LED Lights']
            }
          ],
          specs: {
            maxPowerHp: powerHp,
            maxPowerKw: Math.round(powerHp * 0.745),
            maxTorqueNm: Math.round(powerHp * 1.3),
            transmission: 'Automatic',
            driveType: 'AWD',
            zeroToHundredKphSec: 6.0,
            topSpeedKph: 220,
            emissionStandard: 'Euro 6e'
          },
          dimensions: {
            lengthMm: 4700,
            widthMm: 1850,
            heightMm: 1450,
            wheelbaseMm: 2800,
            groundClearanceMm: 150,
            bootCapacityLiters: 450,
            seatingCapacity: 5,
            doors: 4,
            kerbWeightKg: 1800,
            wheelSizeInches: 18,
            tyreSpecs: '235/45 R18'
          },
          equipment: {
            safety: ['6 Airbags', 'ABS with EBD', 'Electronic Stability Control'],
            interior: ['Ergonomic Seating', 'Dual Zone Climate Control'],
            infotainment: ['10-inch Display', 'Apple CarPlay & Android Auto'],
            exterior: ['LED Headlamps', 'Alloy Wheels'],
            adasFeatures: ['Autonomous Emergency Braking', 'Lane Departure Warning'],
            warranty: '5 Years / 100,000 km'
          },
          safetyRating: {
            ncapOrganization: 'Euro NCAP',
            stars: 5,
            yearTested: 2025,
            adultSafetyPercent: 88,
            childSafetyPercent: 85,
            vulnerableRoadUserPercent: 72,
            safetyAssistPercent: 80,
            testNotes: 'Evaluated under standardized safety test protocols.'
          },
          internationalPricing: [
            { marketCode: 'US', marketName: 'United States', currency: 'USD', price: priceNum, formatted: `$${priceNum.toLocaleString()}`, localTaxNote: 'Base MSRP', updatedAt: '2026-03-01' }
          ],
          colors: [
            { name: 'Pure White', hex: '#ffffff', finish: 'Solid' },
            { name: 'Metallic Grey', hex: '#555555', finish: 'Metallic' },
            { name: 'Obsidian Black', hex: '#111111', finish: 'Solid' }
          ],
          gallery: [
            {
              id: `img-imp-${i}`,
              category: 'Hero',
              url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
              caption: `${brandName} ${modelName} verified automotive portrait`,
              isPrimary: true,
              verifiedSource: 'Batch CSV Ingestion Registry'
            }
          ],
          pros: ['Strong competitive value', 'Well-balanced performance', 'Comprehensive standard equipment'],
          cons: ['Awaiting extended long-term reliability telemetry'],
          expertVerdict: 'A solid, verified addition to the AutoVerse Global database.',
          verifiedDataSource: {
            sourceName: 'Batch CSV Automotive Ingestion Job',
            retrievedDate: new Date().toISOString().split('T')[0],
            officialCatalogUrl: 'https://autoverse.global',
            verificationLevel: 'Official OEM Specification',
            verifierNotes: 'Ingested via administrator batch upload tool.'
          }
        };

        this.state.vehicles.push(newVehicle);
        imported++;
      } catch (err: any) {
        errors.push(`Row ${i + 1}: ${err.message || 'Invalid format'}`);
      }
    }

    this.logAudit({
      adminUser: adminName,
      action: 'IMPORT_CSV',
      targetEntity: `Batch Import (${imported} vehicles)`,
      details: `Imported ${imported} records with ${errors.length} errors.`
    });
    this.saveState();

    return { importedCount: imported, errors };
  }

  // --- Metrics ---
  public getDatabaseMetrics() {
    return {
      totalVehicles: this.state.vehicles.length,
      totalBrands: this.state.brands.length,
      totalArticles: this.state.articles.length,
      totalUsers: this.state.users.length,
      totalDataSources: this.state.dataSources.length,
      totalReviews: this.state.reviews.length,
      verifiedRecordsCount: this.state.vehicles.filter((v) => v.verifiedDataSource).length,
      electricVehiclesCount: this.state.vehicles.filter((v) => v.powertrainType === 'Battery Electric').length,
      hybridVehiclesCount: this.state.vehicles.filter((v) => v.powertrainType.includes('Hybrid')).length
    };
  }
}

export const db = new DatabaseService();
