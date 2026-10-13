import {
  Vehicle,
  Brand,
  Article,
  DataSourceRecord,
  Review,
  User,
  SearchHistoryEntry,
  AuditLogEntry
} from '../types/automotive.js';

const API_BASE = 'https://carmitra-backend-2026.onrender.com/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('autoverse_token');
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('autoverse_token', token);
  } else {
    localStorage.removeItem('autoverse_token');
  }
}

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || errorBody.message || `HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  // Vehicles
  getVehicles: async (params: Record<string, string | number | boolean> = {}): Promise<{ total: number; vehicles: Vehicle[] }> => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        searchParams.append(k, String(v));
      }
    });
    const qs = searchParams.toString();
    return fetchJson(`/vehicles${qs ? `?${qs}` : ''}`);
  },

  getVehicleById: async (idOrSlug: string): Promise<Vehicle> => {
    return fetchJson(`/vehicles/${encodeURIComponent(idOrSlug)}`);
  },

  createVehicle: async (vehicle: Partial<Vehicle>): Promise<Vehicle> => {
    return fetchJson('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicle)
    });
  },

  updateVehicle: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
    return fetchJson(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  deleteVehicle: async (id: string): Promise<{ success: boolean; message: string }> => {
    return fetchJson(`/vehicles/${id}`, {
      method: 'DELETE'
    });
  },

  // Brands
  getBrands: async (params: Record<string, string> = {}): Promise<{ total: number; brands: Brand[] }> => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) searchParams.append(k, v);
    });
    const qs = searchParams.toString();
    return fetchJson(`/brands${qs ? `?${qs}` : ''}`);
  },

  getBrandById: async (idOrSlug: string): Promise<{ brand: Brand; models: Vehicle[] }> => {
    return fetchJson(`/brands/${encodeURIComponent(idOrSlug)}`);
  },

  // Comparison
  compareVehicles: async (ids: string[]): Promise<{ count: number; vehicles: Vehicle[] }> => {
    return fetchJson(`/compare?ids=${ids.join(',')}`);
  },

  // Articles
  getArticles: async (): Promise<{ articles: Article[] }> => {
    return fetchJson('/articles');
  },

  getArticleBySlug: async (slug: string): Promise<Article> => {
    return fetchJson(`/articles/${slug}`);
  },

  // Data Sources
  getDataSources: async (): Promise<{ sources: DataSourceRecord[] }> => {
    return fetchJson('/data-sources');
  },

  // Reviews
  getReviews: async (vehicleId?: string): Promise<{ reviews: Review[] }> => {
    return fetchJson(`/reviews${vehicleId ? `?vehicleId=${vehicleId}` : ''}`);
  },

  submitReview: async (reviewData: Partial<Review>): Promise<Review> => {
    return fetchJson('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Auth
  requestOtp: async (phoneNumber: string): Promise<{ success: boolean; message: string; cooldownSeconds: number; devCode?: string }> => {
    return fetchJson('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber })
    });
  },

  verifyOtp: async (data: { phoneNumber: string; code: string; countryCode: string; name?: string }): Promise<{ success: boolean; message: string; token: string; user: User }> => {
    return fetchJson('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  getMe: async (): Promise<{ user: User }> => {
    return fetchJson('/auth/me');
  },

  logout: async (): Promise<{ success: boolean }> => {
    return fetchJson('/auth/logout', { method: 'POST' });
  },

  updateProfile: async (data: Partial<User>): Promise<{ user: User }> => {
    return fetchJson('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  deleteAccount: async (): Promise<{ success: boolean }> => {
    return fetchJson('/auth/account', { method: 'DELETE' });
  },

  // User Favorites & History
  getFavorites: async (): Promise<{ favorites: Vehicle[] }> => {
    return fetchJson('/user/favorites');
  },

  toggleFavorite: async (vehicleId: string): Promise<{ isFavorite: boolean; favorites: string[] }> => {
    return fetchJson('/user/favorites/toggle', {
      method: 'POST',
      body: JSON.stringify({ vehicleId })
    });
  },

  getHistory: async (): Promise<{ history: SearchHistoryEntry[] }> => {
    return fetchJson('/user/history');
  },

  addHistory: async (query: string, filters?: any): Promise<SearchHistoryEntry> => {
    return fetchJson('/user/history', {
      method: 'POST',
      body: JSON.stringify({ query, filters })
    });
  },

  clearHistory: async (): Promise<{ success: boolean }> => {
    return fetchJson('/user/history', { method: 'DELETE' });
  },

  // Admin
  getAdminMetrics: async (): Promise<{ metrics: any; auditLogs: AuditLogEntry[] }> => {
    return fetchJson('/admin/metrics');
  },

  importCsv: async (csvText: string): Promise<{ importedCount: number; errors: string[] }> => {
    return fetchJson('/admin/import-csv', {
      method: 'POST',
      body: JSON.stringify({ csvText })
    });
  }
};
