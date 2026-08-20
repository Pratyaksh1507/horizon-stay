// Mock data & storage engine for Horizon Stay
// High-fidelity resort data with rich dynamic timeline for analytics and screenshots

export const mockCabins = [
  {
    id: 1,
    name: "001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: "/images/cabin-001.jpg",
    description:
      "Discover the ultimate luxury getaway for couples in cozy wooden cabin 001. Nestled in a picturesque pine forest, this stunning cabin offers modern wood interiors, plush king-size bed, fireplace, and private deck with heated hot tub.",
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
  {
    id: 2,
    name: "002",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: "/images/cabin-002.jpg",
    description:
      "Escape to mountain serenity in cabin 002. Features floor-to-ceiling panoramic glass, king-size bed, spa-like rain shower, stone fireplace, and sunset forest views.",
    createdAt: new Date(Date.now() - 85 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 85 * 86400000).toISOString(),
  },
  {
    id: 3,
    name: "003",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: "/images/cabin-003.jpg",
    description:
      "Experience luxury family living in wooden cabin 003. Two private suites, gourmet kitchen, cathedral wood ceilings, and an outdoor cedar deck with heated jacuzzi.",
    createdAt: new Date(Date.now() - 80 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 80 * 86400000).toISOString(),
  },
  {
    id: 4,
    name: "004",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: "/images/cabin-004.jpg",
    description:
      "Indulge in premium mountain alpine living in cabin 004. Features bespoke handcrafted timber, custom stone hearth, spa-inspired bathrooms, and heated outdoor lounge.",
    createdAt: new Date(Date.now() - 75 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 75 * 86400000).toISOString(),
  },
  {
    id: 5,
    name: "005",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: "/images/cabin-005.jpg",
    description:
      "Spacious group chalet 005. Three bedrooms, expansive dining hall, roaring central fireplace, ski gear drying room, and wrap-around deck overlooking the horizon.",
    createdAt: new Date(Date.now() - 70 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 70 * 86400000).toISOString(),
  },
  {
    id: 6,
    name: "006",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: "/images/cabin-006.jpg",
    description:
      "The pinnacle of executive luxury. Opulent vaulted wood interiors, gourmet chef kitchen, private en-suite steam rooms, wine cellar, and heated infinity hot tub.",
    createdAt: new Date(Date.now() - 65 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 65 * 86400000).toISOString(),
  },
  {
    id: 7,
    name: "007",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: "/images/cabin-007.jpg",
    description:
      "Grand mountain lodge 007 designed for large family gatherings. Multiple living areas, stone fireplaces, bunkhouse wing, private sauna, and fire pit deck.",
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: 8,
    name: "008",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: "/images/cabin-008.jpg",
    description:
      "The Presidential Estate 008. Five lavish master suites, heated infinity hydrotherapy pool, private cinema room, personal concierge desk, and breathtaking 360-degree ridge panoramas.",
    createdAt: new Date(Date.now() - 55 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 55 * 86400000).toISOString(),
  },
];

// Helper to generate dynamic dates relative to today
const today = new Date();
const addDays = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const subDaysIso = (days, hoursAgo = 8) => {
  const d = new Date(today);
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hoursAgo);
  return d.toISOString();
};

export const COUNTRY_FLAGS = {
  USA: "🇺🇸",
  "United States": "🇺🇸",
  UK: "🇬🇧",
  "United Kingdom": "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Japan: "🇯🇵",
  India: "🇮🇳",
  Switzerland: "🇨🇭",
  Norway: "🇳🇴",
  Sweden: "🇸🇪",
  Brazil: "🇧🇷",
  Mexico: "🇲🇽",
  Netherlands: "🇳🇱",
  China: "🇨🇳",
  Singapore: "🇸🇬",
  Austria: "🇦🇹",
  Denmark: "🇩🇰",
};

export function getCountryFlag(country = "") {
  return COUNTRY_FLAGS[country] || "🌍";
}

const rawBookings = [
  // ----------------------------------------------------
  // TODAY'S FRONT DESK ACTIVITIES (Arrivals & Departures)
  // ----------------------------------------------------
  {
    id: 1001,
    createdAt: subDaysIso(0, 2),
    startDate: addDays(0),
    endDate: addDays(4),
    numNights: 4,
    numGuests: 2,
    cabinPrice: 1000,
    extrasPrice: 120,
    totalPrice: 1120,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "VIP couples getaway. Requested chilled champagne in room.",
    cabinId: 1,
    cabins: { id: 1, name: "001" },
    guests: { id: 1, fullName: "Sarah Jenkins", email: "sarah.j@example.com", nationality: "United States", countryFlag: "🇺🇸" },
  },
  {
    id: 1002,
    createdAt: subDaysIso(1, 4),
    startDate: addDays(0),
    endDate: addDays(5),
    numNights: 5,
    numGuests: 4,
    cabinPrice: 2250,
    extrasPrice: 300,
    totalPrice: 2550,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "Anniversary celebration. Extra down pillows requested.",
    cabinId: 4,
    cabins: { id: 4, name: "004" },
    guests: { id: 2, fullName: "Marcus Vance", email: "marcus.v@example.com", nationality: "United Kingdom", countryFlag: "🇬🇧" },
  },
  {
    id: 1003,
    createdAt: subDaysIso(2, 6),
    startDate: addDays(0),
    endDate: addDays(3),
    numNights: 3,
    numGuests: 4,
    cabinPrice: 1050,
    extrasPrice: 180,
    totalPrice: 1230,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "Arriving around 4:00 PM. Airport transfer arranged.",
    cabinId: 5,
    cabins: { id: 5, name: "005" },
    guests: { id: 3, fullName: "Liam Davies", email: "liam.d@example.com", nationality: "Australia", countryFlag: "🇦🇺" },
  },
  {
    id: 1004,
    createdAt: subDaysIso(3, 8),
    startDate: addDays(-4),
    endDate: addDays(0),
    numNights: 4,
    numGuests: 2,
    cabinPrice: 1300,
    extrasPrice: 0,
    totalPrice: 1300,
    status: "checked-in",
    hasBreakfast: false,
    isPaid: true,
    observations: "Late checkout requested for 12:00 PM.",
    cabinId: 2,
    cabins: { id: 2, name: "002" },
    guests: { id: 4, fullName: "Elena Rostova", email: "elena.r@example.com", nationality: "Germany", countryFlag: "🇩🇪" },
  },
  {
    id: 1005,
    createdAt: subDaysIso(4, 5),
    startDate: addDays(-7),
    endDate: addDays(0),
    numNights: 7,
    numGuests: 8,
    cabinPrice: 3500,
    extrasPrice: 840,
    totalPrice: 4340,
    status: "checked-in",
    hasBreakfast: true,
    isPaid: true,
    observations: "Hiking group departure. Luggage storage until 3 PM.",
    cabinId: 7,
    cabins: { id: 7, name: "007" },
    guests: { id: 5, fullName: "Chloe Dubois", email: "chloe.d@example.com", nationality: "France", countryFlag: "🇫🇷" },
  },

  // ----------------------------------------------------
  // IN-HOUSE ACTIVE RESIDENTS (Checked-in)
  // ----------------------------------------------------
  {
    id: 1006,
    createdAt: subDaysIso(5, 7),
    startDate: addDays(-3),
    endDate: addDays(3),
    numNights: 6,
    numGuests: 4,
    cabinPrice: 1800,
    extrasPrice: 360,
    totalPrice: 2160,
    status: "checked-in",
    hasBreakfast: true,
    isPaid: true,
    observations: "Family with two children. Fireplace wood replenished.",
    cabinId: 3,
    cabins: { id: 3, name: "003" },
    guests: { id: 6, fullName: "Alexander Wright", email: "alex.w@example.com", nationality: "Canada", countryFlag: "🇨🇦" },
  },
  {
    id: 1007,
    createdAt: subDaysIso(6, 4),
    startDate: addDays(-2),
    endDate: addDays(4),
    numNights: 6,
    numGuests: 6,
    cabinPrice: 4200,
    extrasPrice: 540,
    totalPrice: 4740,
    status: "checked-in",
    hasBreakfast: true,
    isPaid: true,
    observations: "VIP corporate retreat. Private chef dinner reserved.",
    cabinId: 6,
    cabins: { id: 6, name: "006" },
    guests: { id: 7, fullName: "Kenji Takahashi", email: "kenji.t@example.com", nationality: "Japan", countryFlag: "🇯🇵" },
  },

  // ----------------------------------------------------
  // HISTORICAL REVENUE & STAYS (Past 7, 30 & 90 Days)
  // ----------------------------------------------------
  {
    id: 1008,
    createdAt: subDaysIso(7, 10),
    startDate: addDays(-5),
    endDate: addDays(-1),
    numNights: 4,
    numGuests: 2,
    cabinPrice: 1000,
    extrasPrice: 120,
    totalPrice: 1120,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 1,
    cabins: { id: 1, name: "001" },
    guests: { id: 8, fullName: "Hannah Meyer", email: "hannah.m@example.com", nationality: "Switzerland", countryFlag: "🇨🇭" },
  },
  {
    id: 1009,
    createdAt: subDaysIso(10, 14),
    startDate: addDays(-8),
    endDate: addDays(-3),
    numNights: 5,
    numGuests: 4,
    cabinPrice: 2250,
    extrasPrice: 300,
    totalPrice: 2550,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 4,
    cabins: { id: 4, name: "004" },
    guests: { id: 9, fullName: "Matteo Ricci", email: "matteo.r@example.com", nationality: "Italy", countryFlag: "🇮🇹" },
  },
  {
    id: 1010,
    createdAt: subDaysIso(14, 8),
    startDate: addDays(-11),
    endDate: addDays(-6),
    numNights: 5,
    numGuests: 6,
    cabinPrice: 1750,
    extrasPrice: 0,
    totalPrice: 1750,
    status: "checked-out",
    hasBreakfast: false,
    isPaid: true,
    observations: "",
    cabinId: 5,
    cabins: { id: 5, name: "005" },
    guests: { id: 10, fullName: "Sofia Morales", email: "sofia.m@example.com", nationality: "Spain", countryFlag: "🇪🇸" },
  },
  {
    id: 1011,
    createdAt: subDaysIso(18, 12),
    startDate: addDays(-14),
    endDate: addDays(-9),
    numNights: 5,
    numGuests: 4,
    cabinPrice: 1500,
    extrasPrice: 300,
    totalPrice: 1800,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 3,
    cabins: { id: 3, name: "003" },
    guests: { id: 11, fullName: "Priya Sharma", email: "priya.s@example.com", nationality: "India", countryFlag: "🇮🇳" },
  },
  {
    id: 1012,
    createdAt: subDaysIso(22, 16),
    startDate: addDays(-16),
    endDate: addDays(-12),
    numNights: 4,
    numGuests: 2,
    cabinPrice: 1300,
    extrasPrice: 120,
    totalPrice: 1420,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 2,
    cabins: { id: 2, name: "002" },
    guests: { id: 12, fullName: "Lucas Silva", email: "lucas.s@example.com", nationality: "Brazil", countryFlag: "🇧🇷" },
  },
  {
    id: 1013,
    createdAt: subDaysIso(28, 14),
    startDate: addDays(-22),
    endDate: addDays(-17),
    numNights: 5,
    numGuests: 10,
    cabinPrice: 7000,
    extrasPrice: 750,
    totalPrice: 7750,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "Executive annual planning session.",
    cabinId: 8,
    cabins: { id: 8, name: "008" },
    guests: { id: 13, fullName: "Henrik Lindqvist", email: "henrik.l@example.com", nationality: "Sweden", countryFlag: "🇸🇪" },
  },
  {
    id: 1014,
    createdAt: subDaysIso(35, 6),
    startDate: addDays(-26),
    endDate: addDays(-21),
    numNights: 5,
    numGuests: 6,
    cabinPrice: 3500,
    extrasPrice: 450,
    totalPrice: 3950,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 6,
    cabins: { id: 6, name: "006" },
    guests: { id: 14, fullName: "Oliver Hansen", email: "oliver.h@example.com", nationality: "Norway", countryFlag: "🇳🇴" },
  },
  {
    id: 1015,
    createdAt: subDaysIso(42, 11),
    startDate: addDays(-36),
    endDate: addDays(-30),
    numNights: 6,
    numGuests: 4,
    cabinPrice: 1800,
    extrasPrice: 360,
    totalPrice: 2160,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 3,
    cabins: { id: 3, name: "003" },
    guests: { id: 15, fullName: "David Miller", email: "david.m@example.com", nationality: "United States", countryFlag: "🇺🇸" },
  },
  {
    id: 1016,
    createdAt: subDaysIso(52, 9),
    startDate: addDays(-48),
    endDate: addDays(-42),
    numNights: 6,
    numGuests: 2,
    cabinPrice: 1500,
    extrasPrice: 180,
    totalPrice: 1680,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 1,
    cabins: { id: 1, name: "001" },
    guests: { id: 16, fullName: "Charlotte King", email: "charlotte.k@example.com", nationality: "United Kingdom", countryFlag: "🇬🇧" },
  },
  {
    id: 1017,
    createdAt: subDaysIso(65, 15),
    startDate: addDays(-60),
    endDate: addDays(-53),
    numNights: 7,
    numGuests: 6,
    cabinPrice: 4200,
    extrasPrice: 630,
    totalPrice: 4830,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 6,
    cabins: { id: 6, name: "006" },
    guests: { id: 17, fullName: "Lars Van Dijk", email: "lars.vd@example.com", nationality: "Netherlands", countryFlag: "🇳🇱" },
  },
  {
    id: 1018,
    createdAt: subDaysIso(75, 8),
    startDate: addDays(-75),
    endDate: addDays(-68),
    numNights: 7,
    numGuests: 8,
    cabinPrice: 3500,
    extrasPrice: 840,
    totalPrice: 4340,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 7,
    cabins: { id: 7, name: "007" },
    guests: { id: 18, fullName: "Wei Zhang", email: "wei.z@example.com", nationality: "China", countryFlag: "🇨🇳" },
  },
  {
    id: 1019,
    createdAt: subDaysIso(85, 12),
    startDate: addDays(-88),
    endDate: addDays(-82),
    numNights: 6,
    numGuests: 2,
    cabinPrice: 1950,
    extrasPrice: 180,
    totalPrice: 2130,
    status: "checked-out",
    hasBreakfast: true,
    isPaid: true,
    observations: "",
    cabinId: 2,
    cabins: { id: 2, name: "002" },
    guests: { id: 19, fullName: "Grace Tan", email: "grace.t@example.com", nationality: "Singapore", countryFlag: "🇸🇬" },
  },

  // ----------------------------------------------------
  // UPCOMING FUTURE RESERVATIONS
  // ----------------------------------------------------
  {
    id: 1020,
    createdAt: subDaysIso(0, 5),
    startDate: addDays(4),
    endDate: addDays(9),
    numNights: 5,
    numGuests: 2,
    cabinPrice: 1250,
    extrasPrice: 150,
    totalPrice: 1400,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "Direct online reservation.",
    cabinId: 1,
    cabins: { id: 1, name: "001" },
    guests: { id: 20, fullName: "Emma Watson", email: "emma.w@example.com", nationality: "United States", countryFlag: "🇺🇸" },
  },
  {
    id: 1021,
    createdAt: subDaysIso(1, 7),
    startDate: addDays(7),
    endDate: addDays(13),
    numNights: 6,
    numGuests: 4,
    cabinPrice: 2700,
    extrasPrice: 360,
    totalPrice: 3060,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    observations: "Late check-in requested.",
    cabinId: 4,
    cabins: { id: 4, name: "004" },
    guests: { id: 21, fullName: "Felix Bauer", email: "felix.b@example.com", nationality: "Germany", countryFlag: "🇩🇪" },
  },
  {
    id: 1022,
    createdAt: subDaysIso(2, 11),
    startDate: addDays(10),
    endDate: addDays(16),
    numNights: 6,
    numGuests: 10,
    cabinPrice: 8400,
    extrasPrice: 900,
    totalPrice: 9300,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "Presidential suite group retreat.",
    cabinId: 8,
    cabins: { id: 8, name: "008" },
    guests: { id: 22, fullName: "James Sterling", email: "james.s@example.com", nationality: "United Kingdom", countryFlag: "🇬🇧" },
  },
];

// Ensure every booking has BOTH createdAt and created_at
export const mockBookings = rawBookings.map((b) => ({
  ...b,
  created_at: b.createdAt,
}));

export const mockSettings = {
  id: 1,
  minBookingLength: 1,
  maxBookingLength: 90,
  maxGuestsPerBooking: 10,
  breakfastPrice: 15,
  createdAt: new Date(Date.now() - 365 * 86400000).toISOString(),
  created_at: new Date(Date.now() - 365 * 86400000).toISOString(),
};

export const mockUser = {
  id: "demo-user-id",
  email: "demo@horizonstay.com",
  user_metadata: {
    fullName: "Horizon Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  createdAt: new Date(Date.now() - 180 * 86400000).toISOString(),
  created_at: new Date(Date.now() - 180 * 86400000).toISOString(),
};

const DATA_VERSION_KEY = "horizon-stay-data-version-v7";

const STORAGE_KEYS = {
  BOOKINGS: "horizon-stay-bookings",
  CABINS: "horizon-stay-cabins",
  SETTINGS: "horizon-stay-settings",
  USER: "horizon-stay-user",
  AUTH_TOKEN: "horizon-stay-auth-token",
  USER_ROSTER: "horizon-stay-user-roster",
};

function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

export function initMockData() {
  const currentVersion = localStorage.getItem(DATA_VERSION_KEY);
  if (!currentVersion) {
    // Fresh seed or version upgrade
    setToStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
    setToStorage(STORAGE_KEYS.CABINS, mockCabins);
    setToStorage(STORAGE_KEYS.SETTINGS, mockSettings);
    setToStorage(STORAGE_KEYS.USER, mockUser);
    setMockAuthToken("mock-jwt-token-initial");
    localStorage.setItem(DATA_VERSION_KEY, "true");
  } else {
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      setToStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CABINS)) {
      setToStorage(STORAGE_KEYS.CABINS, mockCabins);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      setToStorage(STORAGE_KEYS.SETTINGS, mockSettings);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      setToStorage(STORAGE_KEYS.USER, mockUser);
      setMockAuthToken("mock-jwt-token-initial");
    }
  }
}

export function getMockUser() {
  return getFromStorage(STORAGE_KEYS.USER, mockUser);
}

export function setMockUser(user) {
  setToStorage(STORAGE_KEYS.USER, user);
}

export function getMockAuthToken() {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
}

export function setMockAuthToken(token) {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

export function clearMockAuth() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// ----------------------------------------------------
// BOOKINGS API
// ----------------------------------------------------
export async function getMockBookings({ filter, sortBy, page } = {}) {
  await new Promise((r) => setTimeout(r, 150));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);

  let filtered = [...bookings];

  if (filter) {
    filtered = filtered.filter((b) => b[filter.field] === filter.value);
  }

  if (sortBy) {
    filtered.sort((a, b) => {
      let aVal = a[sortBy.field];
      let bVal = b[sortBy.field];
      if (sortBy.direction === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }

  const PAGE_SIZE = 7;
  let paginated = filtered;
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    paginated = filtered.slice(from, to);
  }

  return { data: paginated, count: filtered.length };
}

export async function getMockBooking(id) {
  await new Promise((r) => setTimeout(r, 100));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
  const booking = bookings.find((b) => b.id === Number(id));
  if (!booking) throw new Error(`Booking #${id} not found`);
  return booking;
}

export async function getMockBookingsAfterDate(date) {
  await new Promise((r) => setTimeout(r, 100));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
  return bookings.filter((b) => {
    const d = b.createdAt || b.created_at;
    return d >= date && d <= new Date().toISOString();
  });
}

export async function getMockStaysAfterDate(date) {
  await new Promise((r) => setTimeout(r, 100));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
  const todayStr = new Date().toISOString().split("T")[0];
  return bookings.filter(
    (b) => b.startDate >= date && b.startDate <= todayStr
  );
}

export async function getMockStaysTodayActivity() {
  await new Promise((r) => setTimeout(r, 100));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
  const todayStr = new Date().toISOString().split("T")[0];
  return bookings.filter(
    (b) =>
      (b.status === "unconfirmed" && b.startDate === todayStr) ||
      (b.status === "checked-in" && b.endDate === todayStr)
  );
}

export async function createMockBooking(newBookingData) {
  await new Promise((r) => setTimeout(r, 250));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
  const cabins = getFromStorage(STORAGE_KEYS.CABINS, mockCabins);
  const settings = getFromStorage(STORAGE_KEYS.SETTINGS, mockSettings);

  const cabin = cabins.find((c) => c.id === Number(newBookingData.cabinId)) || cabins[0];

  const startDateStr = newBookingData.startDate ? new Date(newBookingData.startDate).toISOString().split("T")[0] : addDays(1);
  const endDateStr = newBookingData.endDate ? new Date(newBookingData.endDate).toISOString().split("T")[0] : addDays(5);

  const numNights = Number(newBookingData.numNights) || 
    Math.max(1, Math.ceil((new Date(endDateStr) - new Date(startDateStr)) / (1000 * 60 * 60 * 24)));

  const numGuests = Number(newBookingData.numGuests) || 1;
  const cabinPrice = (cabin.regularPrice - (cabin.discount || 0)) * numNights;
  const extrasPrice = newBookingData.hasBreakfast
    ? (settings.breakfastPrice || 15) * numNights * numGuests
    : 0;
  const totalPrice = cabinPrice + extrasPrice;

  const newId = bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1001;

  const nationality = newBookingData.nationality || "United States";
  const countryFlag = getCountryFlag(nationality);
  const nowIso = new Date().toISOString();

  const newBooking = {
    id: newId,
    createdAt: nowIso,
    created_at: nowIso,
    startDate: startDateStr,
    endDate: endDateStr,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    status: newBookingData.status || "unconfirmed",
    hasBreakfast: Boolean(newBookingData.hasBreakfast),
    isPaid: Boolean(newBookingData.isPaid),
    observations: newBookingData.observations || "",
    cabinId: cabin.id,
    cabins: { id: cabin.id, name: cabin.name },
    guestId: newId,
    guests: {
      id: newId,
      fullName: newBookingData.guestName || "Guest",
      email: newBookingData.guestEmail || "guest@example.com",
      nationality,
      countryFlag,
    },
  };

  bookings.unshift(newBooking);
  setToStorage(STORAGE_KEYS.BOOKINGS, bookings);
  return newBooking;
}

export async function updateMockBooking(id, obj) {
  await new Promise((r) => setTimeout(r, 150));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
  const index = bookings.findIndex((b) => b.id === Number(id));
  if (index === -1) throw new Error(`Booking #${id} not found`);
  bookings[index] = { ...bookings[index], ...obj };
  setToStorage(STORAGE_KEYS.BOOKINGS, bookings);
  return bookings[index];
}

export async function deleteMockBooking(id) {
  await new Promise((r) => setTimeout(r, 150));
  const bookings = getFromStorage(STORAGE_KEYS.BOOKINGS, mockBookings);
  const filtered = bookings.filter((b) => b.id !== Number(id));
  setToStorage(STORAGE_KEYS.BOOKINGS, filtered);
  return { success: true };
}

// ----------------------------------------------------
// CABINS API
// ----------------------------------------------------
export async function getMockCabins() {
  await new Promise((r) => setTimeout(r, 150));
  return getFromStorage(STORAGE_KEYS.CABINS, mockCabins);
}

export async function createEditMockCabin(newCabin, id) {
  await new Promise((r) => setTimeout(r, 250));
  const cabins = getFromStorage(STORAGE_KEYS.CABINS, mockCabins);
  const payload = { ...newCabin };
  const nowIso = new Date().toISOString();

  if (!id) {
    const newId = cabins.length > 0 ? Math.max(...cabins.map((c) => c.id)) + 1 : 1;
    const created = {
      ...payload,
      id: newId,
      regularPrice: Number(payload.regularPrice) || 200,
      maxCapacity: Number(payload.maxCapacity) || 2,
      discount: Number(payload.discount) || 0,
      image: payload.image || "/images/cabin-001.jpg",
      createdAt: nowIso,
      created_at: nowIso,
    };
    cabins.push(created);
    setToStorage(STORAGE_KEYS.CABINS, cabins);
    return created;
  } else {
    const index = cabins.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error("Cabin not found");
    cabins[index] = {
      ...cabins[index],
      ...payload,
      regularPrice: Number(payload.regularPrice) || cabins[index].regularPrice,
      maxCapacity: Number(payload.maxCapacity) || cabins[index].maxCapacity,
      discount: Number(payload.discount) || 0,
    };
    setToStorage(STORAGE_KEYS.CABINS, cabins);
    return cabins[index];
  }
}

export async function deleteMockCabin(id) {
  await new Promise((r) => setTimeout(r, 150));
  const cabins = getFromStorage(STORAGE_KEYS.CABINS, mockCabins);
  const filtered = cabins.filter((c) => c.id !== Number(id));
  setToStorage(STORAGE_KEYS.CABINS, filtered);
  return { success: true };
}

// ----------------------------------------------------
// SETTINGS API
// ----------------------------------------------------
export async function getMockSettings() {
  await new Promise((r) => setTimeout(r, 100));
  return getFromStorage(STORAGE_KEYS.SETTINGS, mockSettings);
}

export async function updateMockSettings(newSetting) {
  await new Promise((r) => setTimeout(r, 200));
  const settings = getFromStorage(STORAGE_KEYS.SETTINGS, mockSettings);
  const updated = {
    ...settings,
    ...newSetting,
    minBookingLength: newSetting.minBookingLength !== undefined ? Number(newSetting.minBookingLength) : settings.minBookingLength,
    maxBookingLength: newSetting.maxBookingLength !== undefined ? Number(newSetting.maxBookingLength) : settings.maxBookingLength,
    maxGuestsPerBooking: newSetting.maxGuestsPerBooking !== undefined ? Number(newSetting.maxGuestsPerBooking) : settings.maxGuestsPerBooking,
    breakfastPrice: newSetting.breakfastPrice !== undefined ? Number(newSetting.breakfastPrice) : settings.breakfastPrice,
  };
  setToStorage(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// ----------------------------------------------------
// AUTHENTICATION API
// ----------------------------------------------------
export async function mockLogin({ email, password }) {
  await new Promise((r) => setTimeout(r, 300));

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const roster = getFromStorage(STORAGE_KEYS.USER_ROSTER, [mockUser]);
  const nowIso = new Date().toISOString();
  const user = roster.find((u) => u.email.toLowerCase() === email.toLowerCase()) || {
    id: "user-" + Date.now(),
    email,
    user_metadata: {
      fullName: email.split("@")[0],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    createdAt: nowIso,
    created_at: nowIso,
  };

  const token = "mock-jwt-token-" + Date.now();
  setMockAuthToken(token);
  setMockUser(user);
  return { user, session: { access_token: token } };
}

export async function mockSignup({ fullName, email, password }) {
  await new Promise((r) => setTimeout(r, 300));

  if (!email || !password || !fullName) {
    throw new Error("Full name, email and password are required");
  }

  const roster = getFromStorage(STORAGE_KEYS.USER_ROSTER, [mockUser]);
  if (roster.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("User with this email already exists");
  }

  const nowIso = new Date().toISOString();
  const newUser = {
    id: "user-" + Date.now(),
    email,
    user_metadata: {
      fullName,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    createdAt: nowIso,
    created_at: nowIso,
  };

  roster.push(newUser);
  setToStorage(STORAGE_KEYS.USER_ROSTER, roster);

  return { user: newUser };
}

export async function mockGetCurrentUser() {
  await new Promise((r) => setTimeout(r, 100));
  const token = getMockAuthToken();
  if (!token) return null;
  return getMockUser();
}

export async function mockLogout() {
  await new Promise((r) => setTimeout(r, 100));
  clearMockAuth();
  return { success: true };
}

export async function mockUpdateCurrentUser({ password, fullName, avatar }) {
  await new Promise((r) => setTimeout(r, 200));
  const user = getMockUser();
  if (!user) throw new Error("Not authenticated");

  let avatarUrl = user.user_metadata?.avatar;
  if (avatar) {
    if (typeof avatar === "string") {
      avatarUrl = avatar;
    } else if (avatar instanceof File || avatar instanceof Blob) {
      avatarUrl = URL.createObjectURL(avatar);
    }
  }

  const updated = {
    ...user,
    user_metadata: {
      ...user.user_metadata,
      ...(fullName ? { fullName } : {}),
      avatar: avatarUrl || user.user_metadata?.avatar,
    },
  };

  setMockUser(updated);

  const roster = getFromStorage(STORAGE_KEYS.USER_ROSTER, [mockUser]);
  const idx = roster.findIndex((u) => u.id === user.id);
  if (idx !== -1) {
    roster[idx] = updated;
    setToStorage(STORAGE_KEYS.USER_ROSTER, roster);
  }

  return updated;
}