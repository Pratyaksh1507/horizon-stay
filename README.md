# Horizon Stay &mdash; Executive Resort Management Dashboard

A modern, production-ready luxury hotel and mountain resort management platform built with **React 18**, **Vite**, **TanStack React Query**, and **Tailwind CSS**. Designed for hospitality managers, resort operators, and front-desk concierges to streamline bookings, guest check-ins, cabin inventory, staff access, and revenue intelligence in one unified interface.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Design System](#architecture--design-system)
- [Frontend Structure](#frontend-structure)
- [Data & API Layer](#data--api-layer)
- [Performance & Smooth Loading](#performance--smooth-loading)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts & Quality Assurance](#scripts--quality-assurance)
- [Deployment](#deployment)
- [Roadmap & Future Enhancements](#roadmap--future-enhancements)
- [Author & License](#author--license)

---

## Overview

**Horizon Stay** provides luxury hospitality teams with real-time operational control. From managing high-touch guest arrivals to tracking chalet turnover schedules and global demographic trends, the platform combines responsive executive aesthetics with 60fps data visualizations.

---

## Key Features

### 1. Operations Dashboard
- **Executive KPI Metrics**: Real-time cards displaying total period revenue, room vs. extras breakdown, occupancy rates, and Average Daily Rate (ADR) powered by animated `NumberFlow` counters.
- **Revenue & Operations Intelligence**: 4-mode dynamic area chart supporting Combined Revenue, Rooms vs. Extras breakdown, Room Nights occupancy, and Daily Benchmark lines across 7, 30, and 90-day intervals.
- **Front Desk Today Activity**: Instant view of today's unconfirmed arrivals and departing residents with 1-click check-in/out actions.
- **Cabin Turnover Matrix**: Visual grid of all 8 luxury chalets showing live occupancy status, guest identities, and housekeeping turnover readiness.
- **Global Guest Reach Map**: Interactive world choropleth map with an **"All Clients" vs. "Active In-House"** toggle and ranked top-source markets leaderboard.
- **Stay Duration Breakdown**: Recharts-driven donut chart analyzing guest stay lengths (1-3 nights, 4-5 nights, 6-7 nights, 8+ nights).

### 2. Reservations Hub (`/bookings`)
- Filter by status (**All**, **Checked In**, **Unconfirmed**, **Checked Out**) with animated segmented tabs.
- Multi-field sorting by start date, departure date, and total amount.
- Monospace cabin unit chips, guest country flags, email subtitles, and duration badges.
- Paginated table with instant query prefetching for zero-latency page transitions.

### 3. Concierge Guest Check-In (`/checkin/:id`)
- Dedicated concierge check-in workflow with stay recap and guest notes.
- **Gourmet Breakfast Package Upsell**: Interactive switch that calculates optional breakfast add-ons and updates total billing in real time.
- Payment confirmation checkbox with verified status tags.

### 4. Create Reservation Engine (`/new-booking`)
- Dynamic booking form with integrated calendar date picker.
- Live pricing calculator showing cabin base rates, length-of-stay discounts, breakfast add-ons, and total charges before submission.
- Real-time cabin availability and capacity validation.

### 5. Cabin Inventory Management (`/cabins`)
- High-resolution photography previews with hover zoom animations.
- Pricing breakdown with strikethrough discount tags and capacity chips.
- 1-click cabin duplication and multi-column creation/edit modal with live image upload previews.

### 6. Staff & User Directory (`/users`)
- Active staff cards featuring profile portraits, department tags, on-duty status indicators, and verified badges.
- Internal employee invitation portal with role assignment (*Front Desk Concierge*, *Executive Housekeeping*, *Resort Operations*, *Assistant General Manager*).

### 7. Resort Policy & Configuration (`/settings`)
- 4 interactive policy cards for minimum stay duration, maximum booking limits, guest thresholds, and breakfast pricing.
- Real-time auto-saving with instant feedback badges.

### 8. Manager Account & Security (`/account`)
- Personal manager profile management with live portrait upload and instant navbar/sidebar synchronization.
- Credential update form with secure password validation.

### 9. Theme & Navigation Polish
- **Dynamic Dark / Light Mode**: Smooth theme switching between Executive Obsidian (`#09090b`) and Alpine Light (`#f8fafc`) with dynamic CSS variable tokens.
- **Collapsible Sidebar**: Smooth expandable/collapsible sidebar with compact icon rail mode and floating hover tooltips.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18 (Hooks, Suspense, Lazy Loading, Context API) |
| **Build & Tooling** | Vite 4, Rollup |
| **Routing** | React Router v6 (Nested Routes, URL Search Params, Protected Routes) |
| **State & Data Caching** | TanStack React Query v5 |
| **Styling** | Tailwind CSS v4, Dynamic CSS Custom Properties |
| **Motion & Micro-interactions** | Framer Motion |
| **Charts & Geospatial** | Recharts, Visx (Geo & Responsive), D3-Geo, TopoJSON |
| **Forms & Validation** | React Hook Form |
| **Icons & Numbers** | Lucide React, React Icons, NumberFlow |
| **Notifications** | React Hot Toast |

---

## Architecture & Design System

Horizon Stay employs a modular, feature-based architecture:

```
src/
├── components/          # Standalone shared visualization components (Choropleth map)
├── context/             # React Context providers (DarkModeContext, SidebarContext)
├── data/                # Data storage engine and realistic resort seed models
├── features/            # Domain-driven feature modules
│   ├── authentication/  # Login, signup, user avatar, profile & password management
│   ├── bookings/        # Reservation table, rows, details card, booking mutations
│   ├── cabins/          # Cabin table, rows, creation/edit modal, CRUD hooks
│   ├── check-in-out/    # Check-in concierge, checkout triggers, Today Activity
│   ├── dashboard/       # KPI Stats, SalesChart, DurationChart, Cabin Matrix, Map hooks
│   └── settings/        # Resort policy forms and update hooks
├── hooks/               # Reusable utility hooks (useOutsideClick, useLocalStorageState)
├── pages/               # Lazy-loaded top-level view components
├── services/            # API abstraction layer (apiAuth, apiBookings, apiCabins, apiSettings)
├── ui/                  # Reusable UI component library (Table, Modal, ErrorBoundary, Skeletons)
└── utils/               # Formatting and date calculation helpers
```

---

## Performance & Smooth Loading

1. **Route Code-Splitting**: All top-level page routes are dynamically imported via `React.lazy()` and wrapped in `<Suspense>`, keeping the initial bundle payload to **~89 kB (25.8 kB gzipped)**.
2. **Rollup Vendor Chunking**: Heavy third-party libraries (`vendor-react`, `vendor-query`, `vendor-motion`, `vendor-charts`, `vendor-icons`) are bundled into separate cached chunks in `vite.config.js`.
3. **Zero Cumulative Layout Shift (CLS = 0)**: Shimmering skeleton loaders ([`DashboardSkeleton.jsx`](file:///Users/pratyakshkalsi/Desktop/horizon-stay/src/ui/DashboardSkeleton.jsx), [`PageSkeleton.jsx`](file:///Users/pratyakshkalsi/Desktop/horizon-stay/src/ui/PageSkeleton.jsx)) render matching component layouts before data resolves.
4. **TanStack Query Caching**: Configured with `staleTime: 2m` and `gcTime: 10m` to prevent network refetch flickers during navigation.
5. **Top-Level Error Boundary**: Global React Error Boundary catches client-side exceptions and presents a graceful recovery UI.

---

## Getting Started

### Prerequisites

- Node.js **18.x** or higher
- npm **9.x** or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Pratyaksh1507/horizon-stay.git

# Navigate into project directory
cd horizon-stay

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

> **Demo Login**: On the login screen, click **"Auto-fill Demo Credentials"** to authenticate instantly as the General Manager.

---

## Environment Variables

Copy `.env.example` to create a local `.env` file if connecting to an external backend:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

*Note: Horizon Stay includes a built-in localStorage mock engine out of the box, allowing full evaluation without mandatory external database credentials.*

---

## Scripts & Quality Assurance

```bash
# Start development server
npm run dev

# Run automated test suite (21/21 passing tests)
npm test

# Run ESLint validation (0 errors, 0 warnings)
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

Horizon Stay is optimized for one-click deployment on standard cloud static hosts:

### Vercel
- The repository includes [`vercel.json`](file:///Users/pratyakshkalsi/Desktop/horizon-stay/vercel.json) with client-side SPA routing rewrites.
- Simply import the repository in the Vercel dashboard and click **Deploy**.

### Netlify
- The repository includes [`public/_redirects`](file:///Users/pratyakshkalsi/Desktop/horizon-stay/public/_redirects) for SPA routing fallback.
- Set build command to `npm run build` and publish directory to `dist`.

---

## Roadmap & Future Enhancements

- [ ] Multi-property portfolio switcher for hotel groups with multiple locations.
- [ ] Exportable reservation reports in PDF and Excel formats.
- [ ] Direct guest SMS notification integration for check-in arrival instructions.
- [ ] Housekeeping mobile tablet view for real-time room readiness updates.

---

## Author & License

Developed with precision by **Pratyaksh Kalsi**.  
Licensed under the [MIT License](LICENSE).
