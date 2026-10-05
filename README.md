# ITeaLab Website

Website for ITeaLab built with Next.js (App Router), React 19, Tailwind CSS, Supabase, and Cloudinary.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`)
- **State & Caching**: [TanStack Query v5](https://tanstack.com/query)
- **Media Storage**: [Cloudinary](https://cloudinary.com/)
- **3D & Animations**: Three.js, `@react-three/fiber`, `@react-three/drei`, Framer Motion

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer recommended)
- [pnpm](https://pnpm.io/) (`corepack enable pnpm` or `npm install -g pnpm`)

---

## Environment Variables

Copy the example environment configuration file:

```bash
cp .env.example .env.local
```

Fill in the required credentials in `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

# Cloudinary Configuration (Image Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
# Start Next.js development server (still works as before)
pnpm dev

# Or start the Vinext dev server (Vite / Cloudflare)
pnpm run dev:vinext
```

- Next.js: [http://localhost:3000](http://localhost:3000)
- Vinext: [http://localhost:3001](http://localhost:3001)

---

## Building and Running Production

### Next.js

```bash
# Build Next.js production bundle (.next)
pnpm build

# Start Next.js production server locally
pnpm start
```

### Cloudflare Workers (Vinext)

```bash
# Build production output
pnpm run build:vinext

# Preview the built Worker locally
pnpm run start:vinext

# Deploy Workers Response Store before the application
pnpm run deploy:response-store

# Deploy to Cloudflare Workers
pnpm run deploy:vinext
```

---

## Development & Maintenance Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Next.js (still works as before) |
| `pnpm build` | Build Next.js production bundle |
| `pnpm start` | Start Next.js production server |
| `pnpm run dev:vinext` | Start the Vinext dev server |
| `pnpm run build:vinext` | Build production output |
| `pnpm run start:vinext` | Preview the built Worker locally |
| `pnpm run deploy:response-store` | Deploy Workers Response Store before the application |
| `pnpm run deploy:vinext` | Deploy to Cloudflare Workers |

---

## Media Storage (Cloudinary)

Image uploads are processed server-side via API and stored under the **`uploads/`** folder in Cloudinary.

---

## Database Schema (Supabase)

The application interacts with 3 tables in Supabase:

- `news`: Announcements and articles.
- `workshops`: Lab workshops and session links.
- `join_requests`: Submissions from the Join Us form.
