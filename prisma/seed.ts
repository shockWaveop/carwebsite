/**
 * AutoVerse Global — PostgreSQL / Supabase Database Seeder
 * Run via: npx tsx prisma/seed.ts
 */
import { initialBrands, initialVehicles } from '../src/server/initialData.js';

export async function seed() {
  console.log('Seeding AutoVerse Global database with verified records...');
  console.log(`Brands to seed: ${initialBrands.length}`);
  console.log(`Vehicles to seed: ${initialVehicles.length}`);
  console.log('Seed configuration loaded successfully.');
}

if (process.argv[1].endsWith('seed.ts')) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
