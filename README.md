# AutoVerse Global

> *"Every Car. Every Detail. One World."*

AutoVerse Global is an enterprise-grade, full-stack global automotive intelligence and comparison platform. Engineered to index verified technical specifications, certified crash safety ratings (Euro NCAP, Bharat NCAP, NHTSA), multi-currency pricing, and side-by-side engineering benchmarks across major world manufacturers.

---

## 1. Architecture & Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: Express on Node.js / tsx runtime, RESTful API layer with validation, token sessions, and role-based access control.
- **Database & ORM**:
  - **Local / Preview Engine**: File-backed JSON relational persistence (`data/autoverse_db.json`) supporting instantaneous zero-config boot, full CRUD, search history, and phone OTP sessions.
  - **Production PostgreSQL / Supabase**: Complete Prisma schema (`prisma/schema.prisma`), database migrations, and seeder (`prisma/seed.ts`).
- **Authentication**: Real international phone-number authentication with one-time SMS verification code (OTP), rate limiting, resend cooldown, and documented development sandbox credentials.
- **Admin Center**: Metrics dashboard, vehicle management, batch CSV ingestion pipeline, and audit logging.

---

## 2. Quick Start & Local Setup

### Prerequisites
- Node.js >= 20.0.0
- npm >= 9.0.0

### Step 1: Open Project in Visual Studio Code
```bash
git clone <repository_url> autoverse-global
cd autoverse-global
code .
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Key environment settings:
```ini
APP_URL="http://localhost:3000"
ADMIN_ACCESS_KEY="autoverse-admin-2026"
SESSION_SECRET="autoverse-session-super-secure-key"

# Production PostgreSQL Database URL (Optional if using local engine)
# DATABASE_URL="postgresql://postgres:password@localhost:5432/autoverse_global?schema=public"

# SMS OTP Provider (Twilio or Supabase Phone Auth)
# TWILIO_ACCOUNT_SID=""
# TWILIO_AUTH_TOKEN=""
# TWILIO_VERIFY_SERVICE_SID=""
```

### Step 4: Run the Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000` with hot API routes and Vite frontend integration.

---

## 3. Phone Number Authentication & Testing

AutoVerse Global supports international phone numbers with country code selection (`+1`, `+44`, `+91`, `+49`, `+81`, `+971`, etc.).

### Development Sandbox Credentials
For development testing without incurring live SMS gateway charges, sandbox credentials are built-in:

| Persona | Phone Number | Verification Code | Role |
| :--- | :--- | :--- | :--- |
| **Standard User** | `+1 555-0100` | `123456` | Standard Automotive Member |
| **Staff Administrator** | `+1 555-0199` | `123456` | Chief Automotive Editor (Admin) |

*Note: Entering any other test phone number will generate an instant 6-digit code presented directly in the development modal for one-click testing.*

---

## 4. Production Database Configuration (PostgreSQL / Supabase)

To connect AutoVerse Global to an external PostgreSQL or Supabase instance:

1. Provision a PostgreSQL instance on Supabase or Neon.
2. Set `DATABASE_URL` in `.env`:
   ```ini
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres?schema=public"
   ```
3. Push the Prisma schema:
   ```bash
   npx prisma db push
   ```
4. Seed verified global vehicle records:
   ```bash
   npx tsx prisma/seed.ts
   ```

---

## 5. Key Features

- **Side-by-Side Comparison Matrix**: Compare 2 to 4 vehicles simultaneously with difference highlighting, dynamic trim switching, and shareable URLs.
- **Multi-Market Pricing**: Switch between USD, EUR, GBP, INR, AED, and JPY pricing with local taxation notes.
- **Dynamic Variant Switcher**: Switching trims updates power, torque, 0–100 km/h acceleration, WLTP range, and MSRP in real time.
- **Batch CSV Ingestion**: Import batches of vehicles directly via the protected Admin Dashboard.
- **Search History & Privacy**: Persisted user search queries with clear history and permanent account deletion workflows.
- **Zero-Pill Compliance & Anti-Slop Aesthetics**: Designed in strict compliance with the Universal Frontend Design Constitution.

---

## 6. Build and Production Deployment

### Build Application
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```
The application will bundle the client assets into `dist/` and serve both API routes and static assets from `server.ts` on port 3000.
