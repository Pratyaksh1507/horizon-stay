// Comprehensive Test Suite for Horizon Stay
// Validates Data Layer, Services, Business Logic, and Assets

import { strict as assert } from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Mock LocalStorage for Node environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new MockLocalStorage();

console.log("\n========================================================");
console.log("  🏨 HORIZON STAY COMPREHENSIVE TEST SUITE");
console.log("========================================================\n");

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

async function runSuite() {
  // Import services dynamically
  const {
    initMockData,
    getMockBookings,
    getMockBooking,
    getMockBookingsAfterDate,
    getMockStaysAfterDate,
    getMockStaysTodayActivity,
    createMockBooking,
    updateMockBooking,
    deleteMockBooking,
    getMockCabins,
    createEditMockCabin,
    deleteMockCabin,
    getMockSettings,
    updateMockSettings,
    mockLogin,
    mockSignup,
    mockGetCurrentUser,
    mockUpdateCurrentUser,
    mockLogout,
  } = await import("../src/data/mockData.js");

  const { formatCurrency, formatDistanceFromNow } = await import("../src/utils/helpers.js");

  // ----------------------------------------------------
  // SUITE 1: STATIC ASSETS VERIFICATION
  // ----------------------------------------------------
  console.log("📁 [SUITE 1] Static Photography & Assets Verification");

  await test("All 8 cabin images exist in /public/images/", () => {
    for (let i = 1; i <= 8; i++) {
      const filename = `cabin-00${i}.jpg`;
      const filePath = path.join(rootDir, "public", "images", filename);
      assert.ok(fs.existsSync(filePath), `Missing asset: ${filePath}`);
    }
  });

  await test("All 8 cabin images exist in /public/cabins/", () => {
    for (let i = 1; i <= 8; i++) {
      const filename = `cabin-00${i}.jpg`;
      const filePath = path.join(rootDir, "public", "cabins", filename);
      assert.ok(fs.existsSync(filePath), `Missing asset: ${filePath}`);
    }
  });

  // ----------------------------------------------------
  // SUITE 2: STORAGE & SEED ENGINE
  // ----------------------------------------------------
  console.log("\n💾 [SUITE 2] Mock Data & Storage Initialization");

  await test("initMockData initializes full seed into localStorage", () => {
    localStorage.clear();
    initMockData();

    const bookings = JSON.parse(localStorage.getItem("horizon-stay-bookings"));
    const cabins = JSON.parse(localStorage.getItem("horizon-stay-cabins"));
    const settings = JSON.parse(localStorage.getItem("horizon-stay-settings"));
    const user = JSON.parse(localStorage.getItem("horizon-stay-user"));

    assert.ok(Array.isArray(bookings) && bookings.length >= 20, "Bookings should have 20+ seed items");
    assert.ok(Array.isArray(cabins) && cabins.length === 8, "Cabins should have 8 seed units");
    assert.strictEqual(settings.breakfastPrice, 15, "Default breakfast price should be 15");
    assert.strictEqual(user.email, "demo@horizonstay.com", "Demo user email matches");
  });

  // ----------------------------------------------------
  // SUITE 3: BOOKINGS OPERATIONS & CALCULATIONS
  // ----------------------------------------------------
  console.log("\n📅 [SUITE 3] Bookings API & Pricing Engine");

  await test("getMockBookings retrieves paginated list and total count", async () => {
    const res = await getMockBookings({ page: 1 });
    assert.ok(Array.isArray(res.data), "res.data should be an array");
    assert.strictEqual(res.data.length, 7, "Default page size should be 7");
    assert.ok(res.count >= 20, "Total count should be at least 20");
  });

  await test("getMockBookings filters by status", async () => {
    const unconfirmed = await getMockBookings({ filter: { field: "status", value: "unconfirmed" } });
    assert.ok(unconfirmed.data.every((b) => b.status === "unconfirmed"), "All should be unconfirmed");

    const checkedIn = await getMockBookings({ filter: { field: "status", value: "checked-in" } });
    assert.ok(checkedIn.data.every((b) => b.status === "checked-in"), "All should be checked-in");
  });

  await test("getMockBookings sorts by totalPrice descending", async () => {
    const sorted = await getMockBookings({ sortBy: { field: "totalPrice", direction: "desc" } });
    for (let i = 0; i < sorted.data.length - 1; i++) {
      assert.ok(sorted.data[i].totalPrice >= sorted.data[i + 1].totalPrice, "Should be descending by price");
    }
  });

  await test("createMockBooking calculates room price and breakfast extras correctly", async () => {
    const newBooking = await createMockBooking({
      cabinId: 1, // regularPrice: 250, discount: 0
      startDate: "2026-09-01",
      endDate: "2026-09-05", // 4 nights
      numGuests: 2,
      numNights: 4,
      hasBreakfast: true, // 15 * 4 * 2 = 120
      guestName: "Lord Arthur",
      guestEmail: "arthur@example.com",
      nationality: "United Kingdom",
    });

    assert.strictEqual(newBooking.cabinPrice, 1000, "Cabin price should be 4 * 250 = 1000");
    assert.strictEqual(newBooking.extrasPrice, 120, "Breakfast should be 15 * 4 * 2 = 120");
    assert.strictEqual(newBooking.totalPrice, 1120, "Total price should be 1120");
    assert.strictEqual(newBooking.status, "unconfirmed", "Default status is unconfirmed");
    assert.strictEqual(newBooking.guests.countryFlag, "🇬🇧", "Country flag should be UK flag");
  });

  await test("updateMockBooking modifies booking status and payment", async () => {
    const updated = await updateMockBooking(1001, {
      status: "checked-in",
      isPaid: true,
    });
    assert.strictEqual(updated.status, "checked-in");
    assert.strictEqual(updated.isPaid, true);
  });

  await test("deleteMockBooking removes reservation", async () => {
    const before = await getMockBookings();
    const targetId = before.data[0].id;
    await deleteMockBooking(targetId);
    const after = await getMockBookings();
    assert.strictEqual(after.count, before.count - 1);
  });

  await test("getMockStaysTodayActivity returns today's arrivals and departures", async () => {
    const activity = await getMockStaysTodayActivity();
    assert.ok(Array.isArray(activity), "Should return array");
    assert.ok(activity.length >= 1, "Should have activities scheduled for today");
  });

  await test("getMockBookingsAfterDate and getMockStaysAfterDate filter timeline correctly", async () => {
    const past30Days = new Date(Date.now() - 30 * 86400000).toISOString();
    const bookings30 = await getMockBookingsAfterDate(past30Days);
    const stays30 = await getMockStaysAfterDate(past30Days);

    assert.ok(Array.isArray(bookings30), "Bookings should be an array");
    assert.ok(Array.isArray(stays30), "Stays should be an array");
    assert.ok(bookings30.length > 0, "Should have bookings in past 30 days");
  });

  // ----------------------------------------------------
  // SUITE 4: CABINS API & INVENTORY
  // ----------------------------------------------------
  console.log("\n🏡 [SUITE 4] Cabins Inventory & Management");

  await test("getMockCabins returns all 8 resort units", async () => {
    const cabins = await getMockCabins();
    assert.strictEqual(cabins.length, 8, "Should have 8 cabins");
    assert.strictEqual(cabins[0].name, "001");
  });

  await test("createEditMockCabin adds a new unit", async () => {
    const newCabin = await createEditMockCabin({
      name: "009",
      maxCapacity: 4,
      regularPrice: 450,
      discount: 50,
      description: "Brand new panoramic suite.",
      image: "/images/cabin-001.jpg",
    });

    assert.ok(newCabin.id > 8, "New cabin ID generated");
    assert.strictEqual(newCabin.name, "009");
    assert.strictEqual(newCabin.regularPrice, 450);

    const all = await getMockCabins();
    assert.strictEqual(all.length, 9);
  });

  await test("createEditMockCabin edits an existing unit", async () => {
    const edited = await createEditMockCabin(
      {
        regularPrice: 280,
        discount: 30,
      },
      1
    );

    assert.strictEqual(edited.regularPrice, 280);
    assert.strictEqual(edited.discount, 30);
  });

  await test("deleteMockCabin removes a unit", async () => {
    await deleteMockCabin(9);
    const all = await getMockCabins();
    assert.strictEqual(all.length, 8);
  });

  // ----------------------------------------------------
  // SUITE 5: SETTINGS API
  // ----------------------------------------------------
  console.log("\n⚙️ [SUITE 5] Resort Policy & Settings Management");

  await test("getMockSettings and updateMockSettings update configuration", async () => {
    const current = await getMockSettings();
    assert.strictEqual(current.minBookingLength, 1);

    const updated = await updateMockSettings({
      minBookingLength: 2,
      breakfastPrice: 20,
    });

    assert.strictEqual(updated.minBookingLength, 2);
    assert.strictEqual(updated.breakfastPrice, 20);

    // Reset back
    await updateMockSettings({ minBookingLength: 1, breakfastPrice: 15 });
  });

  // ----------------------------------------------------
  // SUITE 6: AUTHENTICATION & SESSIONS
  // ----------------------------------------------------
  console.log("\n🔐 [SUITE 6] Authentication & Profile Services");

  await test("mockLogin authenticates user and issues token", async () => {
    const res = await mockLogin({ email: "demo@horizonstay.com", password: "password123" });
    assert.ok(res.session.access_token, "Session token should be generated");
    assert.strictEqual(res.user.email, "demo@horizonstay.com");

    const current = await mockGetCurrentUser();
    assert.strictEqual(current.email, "demo@horizonstay.com");
  });

  await test("mockUpdateCurrentUser updates name and portrait", async () => {
    const updated = await mockUpdateCurrentUser({
      fullName: "Executive Director",
      avatar: "https://images.unsplash.com/photo-test",
    });

    assert.strictEqual(updated.user_metadata.fullName, "Executive Director");
    assert.strictEqual(updated.user_metadata.avatar, "https://images.unsplash.com/photo-test");
  });

  await test("mockLogout terminates active session", async () => {
    await mockLogout();
    const user = await mockGetCurrentUser();
    assert.strictEqual(user, null, "User should be null after logout");
  });

  // ----------------------------------------------------
  // SUITE 7: UTILITY HELPERS & FORMATTERS
  // ----------------------------------------------------
  console.log("\n🛠️ [SUITE 7] Utility Helpers & Formatters");

  await test("formatCurrency formats USD correctly", () => {
    const formatted = formatCurrency(1250);
    assert.ok(formatted.includes("1,250") || formatted.includes("$1,250"), `Formatted: ${formatted}`);
  });

  await test("formatDistanceFromNow formats relative dates cleanly", () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    const result = formatDistanceFromNow(yesterday);
    assert.ok(result.includes("day") || result.includes("yesterday") || result.includes("ago"), `Result: ${result}`);
  });

  // ----------------------------------------------------
  // FINAL REPORT
  // ----------------------------------------------------
  console.log("\n========================================================");
  console.log(`  📊 TEST RESULTS SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSuite();
