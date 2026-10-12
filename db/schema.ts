import { pgTable, text, timestamp, integer, jsonb, primaryKey, index } from 'drizzle-orm/pg-core';

// Catalog records keep their full nested document in `data` so the API can return them unchanged.
export const vehicles = pgTable('vehicles', {
  id: text().primaryKey(),
  slug: text().notNull(),
  data: jsonb().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (t) => [index('vehicles_slug_idx').on(t.slug)]);

export const brands = pgTable('brands', {
  id: text().primaryKey(),
  slug: text().notNull(),
  data: jsonb().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const reviews = pgTable('reviews', {
  id: text().primaryKey(),
  vehicleId: text('vehicle_id').notNull(),
  data: jsonb().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (t) => [index('reviews_vehicle_idx').on(t.vehicleId)]);

export const users = pgTable('users', {
  id: text().primaryKey(),
  phoneNumber: text('phone_number').notNull().unique(),
  countryCode: text('country_code').notNull(),
  name: text().notNull(),
  email: text(),
  role: text().notNull().default('USER'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastLoginAt: timestamp('last_login_at').defaultNow().notNull()
});

export const sessions = pgTable('sessions', {
  token: text().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull()
});

export const pendingOtps = pgTable('pending_otps', {
  phoneNumber: text('phone_number').primaryKey(),
  code: text().notNull(),
  attempts: integer().notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull()
});

export const favorites = pgTable('favorites', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  vehicleId: text('vehicle_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (t) => [primaryKey({ columns: [t.userId, t.vehicleId] })]);

export const searchHistory = pgTable('search_history', {
  id: text().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  query: text().notNull(),
  filters: jsonb(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (t) => [index('search_history_user_idx').on(t.userId)]);

export const auditLogs = pgTable('audit_logs', {
  id: text().primaryKey(),
  adminUser: text('admin_user').notNull(),
  action: text().notNull(),
  targetEntity: text('target_entity').notNull(),
  details: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

// Tracks one-off tasks such as seeding the catalog.
export const appMeta = pgTable('app_meta', {
  key: text().primaryKey(),
  value: text().notNull()
});
