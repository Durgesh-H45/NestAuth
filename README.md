# NestAuth Next.js Frontend

A modern Next.js 16 + React 19 + Tailwind CSS frontend interface for the NestJS + Prisma + PostgreSQL API deployed on Render.

## Features

- **Signup & Login UI**: Modern, responsive authentication forms with validation, password visibility toggles, and instant error feedback.
- **Protected Profile Dashboard**: Displays user email, ID, assigned role (`USER`, `ADMIN`, etc.), token expiration countdown, and raw JWT payload inspection.
- **Zero CORS Issues**: Uses Next.js Route Handlers as a server-to-server proxy to the NestJS API.
- **Secure httpOnly Cookie Storage**: JWT `accessToken` is stored in an `httpOnly`, `SameSite=Lax` cookie, preventing client-side XSS vulnerabilities.
- **Render Cold-Start Handling**: Built-in backend health status indicator, extended 70s timeout, and animated cold-start warning banners with live second counters (`⏱️ 32s...`) when Render is waking up from idle.

## Getting Started

### 1. Configure Environment Variables
A `.env.local` file is already created:
```env
NEST_API_URL=https://nestjs-postgres-prisma.onrender.com
```
*Note: If testing against a local NestJS instance, change this to `http://localhost:3000`.*

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Run Production
```bash
npm run build
npm run start
```

## Routes Overview

| Route | Description |
|---|---|
| `/` | Landing page with architecture overview and quick links |
| `/login` | User login interface with error handling |
| `/signup` | User registration interface (saves to Postgres via Prisma) |
| `/profile` | Guarded user profile (calls `/users/profile` with Bearer token) |
| `/api/auth/*` | Server route handlers for login, signup, profile, logout, and health |
