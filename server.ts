import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/server/db.js';
import { GLOBAL_LOCATIONS } from './src/types/locations.js';
import { aiService } from './src/server/aiService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Admin-Key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Helper to authenticate user from Bearer header
function authenticateUser(req: Request): any | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  return db.getUserByToken(token);
}

// Admin guard middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const adminKey = req.headers['x-admin-key'] as string;
  if (adminKey && process.env.ADMIN_ACCESS_KEY && adminKey === process.env.ADMIN_ACCESS_KEY) {
    (req as any).adminUser = 'System Superadmin';
    return next();
  }

  const user = authenticateUser(req);
  if (user && user.role === 'ADMIN') {
    (req as any).adminUser = user.name;
    return next();
  }

  res.status(403).json({ error: 'Unauthorized: Administrator privileges required.' });
}

// ================= API ROUTES =================

// --- Metrics & Health ---
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'AutoVerse Global' });
});

// --- Vehicles ---
app.get('/api/vehicles', (req: Request, res: Response) => {
  try {
    let vehicles = db.getVehicles();

    const {
      q,
      brand,
      bodyStyle,
      powertrain,
      minPrice,
      maxPrice,
      country,
      status,
      trending,
      latest,
      sortBy
    } = req.query;

    if (q && typeof q === 'string') {
      const query = q.toLowerCase().trim();
      vehicles = vehicles.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.brandName.toLowerCase().includes(query) ||
          v.bodyStyle.toLowerCase().includes(query) ||
          v.powertrainType.toLowerCase().includes(query) ||
          v.variants.some((vr) => vr.name.toLowerCase().includes(query))
      );
    }

    if (brand && typeof brand === 'string' && brand !== 'all') {
      vehicles = vehicles.filter(
        (v) =>
          v.brandId.toLowerCase() === brand.toLowerCase() ||
          v.brandName.toLowerCase() === brand.toLowerCase()
      );
    }

    if (bodyStyle && typeof bodyStyle === 'string' && bodyStyle !== 'all') {
      vehicles = vehicles.filter((v) => v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase());
    }

    if (powertrain && typeof powertrain === 'string' && powertrain !== 'all') {
      vehicles = vehicles.filter((v) => v.powertrainType.toLowerCase() === powertrain.toLowerCase());
    }

    if (country && typeof country === 'string' && country !== 'all') {
      vehicles = vehicles.filter(
        (v) =>
          v.brandCountry.toLowerCase() === country.toLowerCase() ||
          v.primaryMarket.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (status && typeof status === 'string' && status !== 'all') {
      vehicles = vehicles.filter((v) => v.availabilityStatus.toLowerCase() === status.toLowerCase());
    }

    if (trending === 'true') {
      vehicles = vehicles.filter((v) => v.isTrending);
    }

    if (latest === 'true') {
      vehicles = vehicles.filter((v) => v.isLatestLaunch);
    }

    if (minPrice && typeof minPrice === 'string') {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        vehicles = vehicles.filter((v) => v.basePrice.amount >= min);
      }
    }

    if (maxPrice && typeof maxPrice === 'string') {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        vehicles = vehicles.filter((v) => v.basePrice.amount <= max);
      }
    }

    // Sorting
    if (sortBy === 'price_asc') {
      vehicles.sort((a, b) => a.basePrice.amount - b.basePrice.amount);
    } else if (sortBy === 'price_desc') {
      vehicles.sort((a, b) => b.basePrice.amount - a.basePrice.amount);
    } else if (sortBy === 'power_desc') {
      vehicles.sort((a, b) => b.specs.maxPowerHp - a.specs.maxPowerHp);
    } else if (sortBy === 'acceleration_asc') {
      vehicles.sort((a, b) => a.specs.zeroToHundredKphSec - b.specs.zeroToHundredKphSec);
    } else if (sortBy === 'year_desc') {
      vehicles.sort((a, b) => b.modelYear - a.modelYear);
    }

    res.json({
      total: vehicles.length,
      vehicles
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error retrieving vehicles' });
  }
});

app.get('/api/vehicles/:idOrSlug', (req: Request, res: Response) => {
  const vehicle = db.getVehicleById(req.params.idOrSlug);
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  res.json(vehicle);
});

app.post('/api/vehicles', requireAdmin, (req: Request, res: Response) => {
  try {
    const adminName = (req as any).adminUser || 'Admin';
    const vehicle = db.createVehicle(req.body, adminName);
    res.status(201).json(vehicle);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/vehicles/:id', requireAdmin, (req: Request, res: Response) => {
  const adminName = (req as any).adminUser || 'Admin';
  const updated = db.updateVehicle(req.params.id, req.body, adminName);
  if (!updated) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  res.json(updated);
});

app.delete('/api/vehicles/:id', requireAdmin, (req: Request, res: Response) => {
  const adminName = (req as any).adminUser || 'Admin';
  const success = db.deleteVehicle(req.params.id, adminName);
  if (!success) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  res.json({ success: true, message: 'Vehicle archived successfully' });
});

// --- Brands ---
app.get('/api/brands', (req: Request, res: Response) => {
  let brands = db.getBrands();
  const { country, q } = req.query;

  if (country && typeof country === 'string' && country !== 'all') {
    brands = brands.filter((b) => b.country.toLowerCase() === country.toLowerCase());
  }

  if (q && typeof q === 'string') {
    const query = q.toLowerCase().trim();
    brands = brands.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.country.toLowerCase().includes(query) ||
        b.primarySegments.some((s) => s.toLowerCase().includes(query))
    );
  }

  res.json({ total: brands.length, brands });
});

app.get('/api/brands/:idOrSlug', (req: Request, res: Response) => {
  const brand = db.getBrandById(req.params.idOrSlug);
  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }
  const models = db.getVehicles().filter((v) => v.brandId === brand.id || v.brandName === brand.name);
  res.json({ brand, models });
});

app.post('/api/brands', requireAdmin, (req: Request, res: Response) => {
  const adminName = (req as any).adminUser || 'Admin';
  const brand = db.createBrand(req.body, adminName);
  res.status(201).json(brand);
});

// --- Comparison Matrix ---
app.get('/api/compare', (req: Request, res: Response) => {
  const idsQuery = req.query.ids;
  if (!idsQuery || typeof idsQuery !== 'string') {
    return res.status(400).json({ error: 'Query parameter ids is required (comma-separated).' });
  }

  const ids = idsQuery.split(',').map((id) => id.trim()).filter(Boolean);
  const vehicles = ids
    .map((id) => db.getVehicleById(id))
    .filter((v): v is NonNullable<typeof v> => v !== undefined);

  res.json({
    count: vehicles.length,
    vehicles
  });
});

// --- Articles ---
app.get('/api/articles', (_req: Request, res: Response) => {
  res.json({ articles: db.getArticles() });
});

app.get('/api/articles/:slug', (req: Request, res: Response) => {
  const article = db.getArticleBySlug(req.params.slug);
  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }
  res.json(article);
});

// --- Data Sources ---
app.get('/api/data-sources', (_req: Request, res: Response) => {
  res.json({ sources: db.getDataSources() });
});

// --- Reviews ---
app.get('/api/reviews', (req: Request, res: Response) => {
  const vehicleId = req.query.vehicleId as string | undefined;
  res.json({ reviews: db.getReviews(vehicleId) });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { vehicleId, vehicleName, authorName, rating, title, reviewText, ownershipPeriod } = req.body;
  if (!vehicleId || !rating || !reviewText) {
    return res.status(400).json({ error: 'vehicleId, rating, and reviewText are required.' });
  }

  const review = db.addReview({
    id: `rev-${Date.now()}`,
    vehicleId,
    vehicleName: vehicleName || 'Verified Vehicle',
    authorName: authorName || 'Automotive Enthusiast',
    rating: Number(rating),
    title: title || 'Comprehensive Ownership Feedback',
    reviewText,
    date: new Date().toISOString().split('T')[0],
    verifiedOwner: true,
    ownershipPeriod: ownershipPeriod || 'Verified Owner'
  });

  res.status(201).json(review);
});

// --- Authentication (Phone OTP) ---
app.post('/api/auth/request-otp', (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  const result = db.requestOtp(phoneNumber);
  res.json(result);
});

app.post('/api/auth/verify-otp', (req: Request, res: Response) => {
  const { phoneNumber, code, countryCode, name } = req.body;
  if (!phoneNumber || !code) {
    return res.status(400).json({ error: 'Phone number and verification code are required.' });
  }

  const result = db.verifyOtp(phoneNumber, code, countryCode, name);
  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    db.logout(authHeader.substring(7));
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

app.put('/api/auth/profile', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const updated = db.updateUserProfile(user.id, req.body);
  res.json({ user: updated });
});

app.delete('/api/auth/account', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  db.deleteUserAccount(user.id);
  res.json({ success: true, message: 'Account permanently deleted' });
});

// --- User Favorites ---
app.get('/api/user/favorites', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const favorites = db.getFavorites(user.id);
  res.json({ favorites });
});

app.post('/api/user/favorites/toggle', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { vehicleId } = req.body;
  if (!vehicleId) {
    return res.status(400).json({ error: 'vehicleId is required' });
  }

  const result = db.toggleFavorite(user.id, vehicleId);
  res.json(result);
});

// --- Search History ---
app.get('/api/user/history', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  const history = db.getSearchHistory(user ? user.id : undefined);
  res.json({ history });
});

app.post('/api/user/history', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  const { query, filters } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const item = db.addSearchHistory({
    userId: user ? user.id : undefined,
    query,
    filters
  });

  res.status(201).json(item);
});

app.delete('/api/user/history', (req: Request, res: Response) => {
  const user = authenticateUser(req);
  db.clearSearchHistory(user ? user.id : undefined);
  res.json({ success: true, message: 'Search history cleared' });
});

// --- Admin Endpoints ---
app.get('/api/admin/metrics', requireAdmin, (_req: Request, res: Response) => {
  const metrics = db.getDatabaseMetrics();
  const auditLogs = db.getAuditLogs();
  res.json({ metrics, auditLogs });
});

app.post('/api/admin/import-csv', requireAdmin, (req: Request, res: Response) => {
  const { csvText } = req.body;
  if (!csvText) {
    return res.status(400).json({ error: 'csvText is required in request body.' });
  }

  const adminName = (req as any).adminUser || 'Admin';
  const result = db.importVehiclesFromCsv(csvText, adminName);
  res.json(result);
});

// ================= VITE DEV MIDDLEWARE OR PRODUCTION SERVE =================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoVerse Global server listening on port ${PORT}`);
  });
}

startServer();
