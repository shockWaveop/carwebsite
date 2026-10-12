import type { Config } from '@netlify/functions';
import { db } from '../../src/server/db.js';
import type { User } from '../../src/types/automotive.js';

type Params = Record<string, string>;
type Ctx = { req: Request; url: URL; params: Params; body: any; user: User | null };
type Handler = (ctx: Ctx) => Promise<Response> | Response;

const json = (data: unknown, status = 200) => Response.json(data, { status });

async function authenticateUser(req: Request): Promise<User | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return db.getUserByToken(authHeader.substring(7));
}

// Returns the acting admin's display name, or null when the caller is not an administrator.
function adminName(ctx: Ctx): string | null {
  const adminKey = ctx.req.headers.get('x-admin-key');
  const expectedKey = process.env.ADMIN_ACCESS_KEY;
  if (adminKey && expectedKey && adminKey === expectedKey) return 'System Superadmin';
  if (ctx.user && ctx.user.role === 'ADMIN') return ctx.user.name;
  return null;
}

const forbidden = () => json({ error: 'Unauthorized: Administrator privileges required.' }, 403);

function requireAdmin(handler: (ctx: Ctx, admin: string) => Promise<Response> | Response): Handler {
  return (ctx) => {
    const admin = adminName(ctx);
    return admin ? handler(ctx, admin) : forbidden();
  };
}

function requireUser(handler: (ctx: Ctx, user: User) => Promise<Response> | Response, error = 'Authentication required'): Handler {
  return (ctx) => (ctx.user ? handler(ctx, ctx.user) : json({ error }, 401));
}

const routes: Array<[string, string, Handler]> = [
  // --- Metrics & Health ---
  ['GET', '/api/health', () => json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'AutoVerse Global' })],

  // --- Vehicles ---
  ['GET', '/api/vehicles', async ({ url }) => {
    let vehicles = await db.getVehicles();
    const q = url.searchParams;
    const brand = q.get('brand');
    const bodyStyle = q.get('bodyStyle');
    const powertrain = q.get('powertrain');
    const country = q.get('country');
    const status = q.get('status');
    const minPrice = q.get('minPrice');
    const maxPrice = q.get('maxPrice');
    const sortBy = q.get('sortBy');

    const query = q.get('q')?.toLowerCase().trim();
    if (query) {
      vehicles = vehicles.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.brandName.toLowerCase().includes(query) ||
          v.bodyStyle.toLowerCase().includes(query) ||
          v.powertrainType.toLowerCase().includes(query) ||
          v.variants.some((vr) => vr.name.toLowerCase().includes(query))
      );
    }

    if (brand && brand !== 'all') {
      vehicles = vehicles.filter(
        (v) => v.brandId.toLowerCase() === brand.toLowerCase() || v.brandName.toLowerCase() === brand.toLowerCase()
      );
    }

    if (bodyStyle && bodyStyle !== 'all') {
      vehicles = vehicles.filter((v) => v.bodyStyle.toLowerCase() === bodyStyle.toLowerCase());
    }

    if (powertrain && powertrain !== 'all') {
      vehicles = vehicles.filter((v) => v.powertrainType.toLowerCase() === powertrain.toLowerCase());
    }

    if (country && country !== 'all') {
      vehicles = vehicles.filter(
        (v) =>
          v.brandCountry.toLowerCase() === country.toLowerCase() ||
          v.primaryMarket.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (status && status !== 'all') {
      vehicles = vehicles.filter((v) => v.availabilityStatus.toLowerCase() === status.toLowerCase());
    }

    if (q.get('trending') === 'true') {
      vehicles = vehicles.filter((v) => v.isTrending);
    }

    if (q.get('latest') === 'true') {
      vehicles = vehicles.filter((v) => v.isLatestLaunch);
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) vehicles = vehicles.filter((v) => v.basePrice.amount >= min);
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) vehicles = vehicles.filter((v) => v.basePrice.amount <= max);
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

    return json({ total: vehicles.length, vehicles });
  }],

  ['GET', '/api/vehicles/:idOrSlug', async ({ params }) => {
    const vehicle = await db.getVehicleById(params.idOrSlug);
    return vehicle ? json(vehicle) : json({ error: 'Vehicle not found' }, 404);
  }],

  ['POST', '/api/vehicles', requireAdmin(async ({ body }, admin) => {
    try {
      return json(await db.createVehicle(body, admin), 201);
    } catch (err: any) {
      return json({ error: err.message }, 400);
    }
  })],

  ['PUT', '/api/vehicles/:id', requireAdmin(async ({ params, body }, admin) => {
    const updated = await db.updateVehicle(params.id, body, admin);
    return updated ? json(updated) : json({ error: 'Vehicle not found' }, 404);
  })],

  ['DELETE', '/api/vehicles/:id', requireAdmin(async ({ params }, admin) => {
    const success = await db.deleteVehicle(params.id, admin);
    return success
      ? json({ success: true, message: 'Vehicle archived successfully' })
      : json({ error: 'Vehicle not found' }, 404);
  })],

  // --- Brands ---
  ['GET', '/api/brands', async ({ url }) => {
    let brands = await db.getBrands();
    const country = url.searchParams.get('country');
    const query = url.searchParams.get('q')?.toLowerCase().trim();

    if (country && country !== 'all') {
      brands = brands.filter((b) => b.country.toLowerCase() === country.toLowerCase());
    }

    if (query) {
      brands = brands.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.country.toLowerCase().includes(query) ||
          b.primarySegments.some((s) => s.toLowerCase().includes(query))
      );
    }

    return json({ total: brands.length, brands });
  }],

  ['GET', '/api/brands/:idOrSlug', async ({ params }) => {
    const brand = await db.getBrandById(params.idOrSlug);
    if (!brand) return json({ error: 'Brand not found' }, 404);
    const models = (await db.getVehicles()).filter((v) => v.brandId === brand.id || v.brandName === brand.name);
    return json({ brand, models });
  }],

  ['POST', '/api/brands', requireAdmin(async ({ body }, admin) => {
    try {
      return json(await db.createBrand(body, admin), 201);
    } catch (err: any) {
      return json({ error: err.message }, 400);
    }
  })],

  // --- Comparison Matrix ---
  ['GET', '/api/compare', async ({ url }) => {
    const idsQuery = url.searchParams.get('ids');
    if (!idsQuery) {
      return json({ error: 'Query parameter ids is required (comma-separated).' }, 400);
    }
    const ids = idsQuery.split(',').map((id) => id.trim()).filter(Boolean);
    const found = await Promise.all(ids.map((id) => db.getVehicleById(id)));
    const vehicles = found.filter((v): v is NonNullable<typeof v> => v !== undefined);
    return json({ count: vehicles.length, vehicles });
  }],

  // --- Articles ---
  ['GET', '/api/articles', () => json({ articles: db.getArticles() })],

  ['GET', '/api/articles/:slug', ({ params }) => {
    const article = db.getArticleBySlug(params.slug);
    return article ? json(article) : json({ error: 'Article not found' }, 404);
  }],

  // --- Data Sources ---
  ['GET', '/api/data-sources', () => json({ sources: db.getDataSources() })],

  // --- Reviews ---
  ['GET', '/api/reviews', async ({ url }) => {
    const vehicleId = url.searchParams.get('vehicleId') || undefined;
    return json({ reviews: await db.getReviews(vehicleId) });
  }],

  ['POST', '/api/reviews', async ({ body }) => {
    const { vehicleId, vehicleName, authorName, rating, title, reviewText, ownershipPeriod } = body;
    if (!vehicleId || !rating || !reviewText) {
      return json({ error: 'vehicleId, rating, and reviewText are required.' }, 400);
    }

    const review = await db.addReview({
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

    return json(review, 201);
  }],

  // --- Authentication (Phone OTP) ---
  ['POST', '/api/auth/request-otp', async ({ body }) => {
    if (!body.phoneNumber) return json({ error: 'Phone number is required.' }, 400);
    return json(await db.requestOtp(body.phoneNumber));
  }],

  ['POST', '/api/auth/verify-otp', async ({ body }) => {
    const { phoneNumber, code, countryCode, name } = body;
    if (!phoneNumber || !code) {
      return json({ error: 'Phone number and verification code are required.' }, 400);
    }
    const result = await db.verifyOtp(phoneNumber, code, countryCode, name);
    return json(result, result.success ? 200 : 400);
  }],

  ['GET', '/api/auth/me', requireUser((_ctx, user) => json({ user }), 'Not authenticated')],

  ['POST', '/api/auth/logout', async ({ req }) => {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      await db.logout(authHeader.substring(7));
    }
    return json({ success: true, message: 'Logged out successfully' });
  }],

  ['PUT', '/api/auth/profile', requireUser(async ({ body }, user) => {
    return json({ user: await db.updateUserProfile(user.id, body) });
  }, 'Not authenticated')],

  ['DELETE', '/api/auth/account', requireUser(async (_ctx, user) => {
    await db.deleteUserAccount(user.id);
    return json({ success: true, message: 'Account permanently deleted' });
  }, 'Not authenticated')],

  // --- User Favorites ---
  ['GET', '/api/user/favorites', requireUser(async (_ctx, user) => json({ favorites: await db.getFavorites(user.id) }))],

  ['POST', '/api/user/favorites/toggle', requireUser(async ({ body }, user) => {
    if (!body.vehicleId) return json({ error: 'vehicleId is required' }, 400);
    return json(await db.toggleFavorite(user.id, body.vehicleId));
  })],

  // --- Search History ---
  ['GET', '/api/user/history', async ({ user }) => json({ history: await db.getSearchHistory(user?.id) })],

  ['POST', '/api/user/history', async ({ body, user }) => {
    if (!body.query) return json({ error: 'Query is required' }, 400);
    const item = await db.addSearchHistory({ userId: user?.id, query: body.query, filters: body.filters });
    return json(item, 201);
  }],

  ['DELETE', '/api/user/history', async ({ user }) => {
    await db.clearSearchHistory(user?.id);
    return json({ success: true, message: 'Search history cleared' });
  }],

  // --- Admin Endpoints ---
  ['GET', '/api/admin/metrics', requireAdmin(async () => {
    const [metrics, auditLogs] = await Promise.all([db.getDatabaseMetrics(), db.getAuditLogs()]);
    return json({ metrics, auditLogs });
  })],

  ['POST', '/api/admin/import-csv', requireAdmin(async ({ body }, admin) => {
    if (!body.csvText) return json({ error: 'csvText is required in request body.' }, 400);
    return json(await db.importVehiclesFromCsv(body.csvText, admin));
  })]
];

function matchRoute(pattern: string, pathname: string): Params | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params: Params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

export default async (req: Request) => {
  const url = new URL(req.url);

  try {
    for (const [method, pattern, handler] of routes) {
      if (method !== req.method) continue;
      const params = matchRoute(pattern, url.pathname);
      if (!params) continue;

      await db.ensureSeeded();
      const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await req.json().catch(() => ({})) : {};
      const user = await authenticateUser(req);
      return await handler({ req, url, params, body: body ?? {}, user });
    }

    return json({ error: 'Not found' }, 404);
  } catch (err: any) {
    console.error('API error', err);
    return json({ error: err?.message || 'Internal server error' }, 500);
  }
};

export const config: Config = {
  path: '/api/*'
};
