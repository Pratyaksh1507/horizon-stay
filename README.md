<div align="center">

# 🏨 Horizon Stay
### Luxury Resort & Hotel Operations Dashboard

**An all-in-one management platform designed for luxury boutique resorts, hotels, and mountain chalets.**  
*Effortlessly manage bookings, guest check-ins, chalet inventory, and revenue analytics in real time.*

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)

[✨ Live Demo](#-quick-demo--login) • [🚀 Quick Start](#-quick-start-in-1-minute) • [🌟 Key Features](#-what-can-you-do-with-horizon-stay) • [📱 Tech Stack](#-technology-used)

</div>

---

## 📖 What is Horizon Stay?

Running a high-end luxury resort involves dozens of moving parts every day — welcoming new VIP guests, ensuring chalets are cleaned on time, tracking seasonal income, and adjusting resort policies.

**Horizon Stay** gives resort managers and front-desk concierges a single, intuitive control panel to oversee the entire property with zero friction. It turns complicated hospitality data into clean, beautiful charts and instant 1-click actions.

---

## 🌟 What Can You Do with Horizon Stay?

### 📊 1. Executive Operations Hub
- **Instant Financial Insights**: See today's total revenue, room sales vs. gourmet breakfast earnings, overall occupancy percentage, and Average Daily Rate (ADR) at a glance.
- **Interactive Revenue Trends**: Track performance across **7, 30, or 90 days** with smooth charts comparing total income against target benchmarks.
- **Front Desk Today Activity**: View guests arriving today and departing residents with 1-click check-in and check-out buttons.
- **Chalet Housekeeping Matrix**: A visual live grid showing all 8 resort chalets, whether they are occupied or available, and if they're ready for new guests.
- **Global Guest Reach Map**: An interactive world map showing which countries your guests travel from with an **"All Clients" vs. "Active In-House"** toggle.

### 🛎️ 2. Effortless Reservations (`/bookings`)
- View all past, present, and upcoming reservations in a clear, searchable table.
- Filter instantly by status (**Checked In**, **Unconfirmed**, **Checked Out**).
- Sort by date or total price with zero page-load lag.

### 🔑 3. 1-Click Guest Check-In (`/checkin/:id`)
- Review stay details, guest notes, and dietary requests before handing over room keys.
- **Optional Breakfast Add-on**: Easily add gourmet breakfast packages to any stay with automatic live price updates.
- Confirm payments and mark bookings verified on the spot.

### 📝 4. Create New Bookings (`/new-booking`)
- Reserve chalets with an easy interactive calendar date picker.
- Live cost calculator that computes base room rates, multi-night discounts, and optional meals in real time before submitting.

### 🏡 5. Cabin & Suite Management (`/cabins`)
- View beautiful high-definition photo galleries for each luxury chalet.
- Update seasonal rates, special discounts, and maximum guest capacity with 1 click.
- Duplicate existing room setups or add brand new chalets with image upload previews.

### 👥 6. Staff Directory & Permissions (`/users`)
- Manage resort staff profiles (Concierge, Housekeeping, Operations, General Manager).
- Invite new team members with dedicated role access.

### ⚙️ 7. Resort Policy Controls (`/settings`)
- Adjust minimum & maximum stay durations, max guests per booking, and standard breakfast prices across the property.

### 🌓 8. Dark & Light Theme
- Seamlessly toggle between **Executive Obsidian (Dark Mode)** and **Alpine Clean (Light Mode)** to suit any lighting environment.
- **Collapsible Sidebar** gives you more screen space whenever you need it.

---

## 🚀 Quick Start (In 1 Minute)

You don't need any complex database setups to try Horizon Stay — it comes with a built-in demo database right in your browser!

### 1. Clone the repository
```bash
git clone https://github.com/Pratyaksh1507/horizon-stay.git
cd horizon-stay
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the app
```bash
npm run dev
```

Open your browser and go to: **`http://localhost:5173`** 🎉

---

## 🔐 Quick Demo & Login

When you launch the app, you will see a login page. Simply click:

> **✨ "Auto-fill Demo Credentials"**  
> *(This will automatically log you in as General Manager to explore all features instantly)*

---

## 🛠️ Technology Used

Built with modern, industry-standard web technologies to ensure lightning-fast speed and a buttery-smooth 60fps experience:

- **React 18** &mdash; For interactive, modern UI components
- **Vite** &mdash; Super fast build tool and instant hot reloading
- **Tailwind CSS v4** &mdash; Sleek, luxury styling and responsive mobile design
- **TanStack React Query** &mdash; Instant data caching with zero-loading flickers
- **Framer Motion** &mdash; Smooth micro-animations and page transitions
- **Recharts & Visx** &mdash; Dynamic revenue charts and interactive world map
- **Lucide Icons** &mdash; Clean, modern executive iconography

---

## 📁 Project Structure

```
horizon-stay/
├── public/                 # High-definition chalet photos & brand logos
├── src/
│   ├── components/         # Interactive world choropleth map
│   ├── context/            # Dark mode & collapsible sidebar state
│   ├── data/               # Realistic resort mock database engine
│   ├── features/           # Feature modules (Bookings, Cabins, Check-in, Dashboard)
│   ├── pages/              # Clean page views with fast lazy loading
│   ├── services/           # API and data fetching layer
│   └── ui/                 # Reusable UI cards, tables, buttons, and error boundaries
└── scripts/
    └── run-tests.mjs       # Automated test suite (21/21 passing tests)
```

---

## 🧪 Quality & Testing

Horizon Stay is thoroughly tested for stability and performance:

```bash
# Run the complete automated test suite (21/21 passing)
npm test

# Run code style & quality check (0 warnings)
npm run lint

# Create production build
npm run build
```

---

## 👨‍💻 Created By

**Pratyaksh Kalsi**  
*Full Stack & Frontend Software Engineer*  
- GitHub: [@Pratyaksh1507](https://github.com/Pratyaksh1507)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) &mdash; feel free to use it for personal projects, learning, and portfolio inspiration.
