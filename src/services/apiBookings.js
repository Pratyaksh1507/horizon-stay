import {
  getMockBookings,
  getMockBooking,
  getMockBookingsAfterDate,
  getMockStaysAfterDate,
  getMockStaysTodayActivity,
  createMockBooking,
  updateMockBooking,
  deleteMockBooking,
} from "../data/mockData";

export async function getbookings({ filter, sortBy, page } = {}) {
  return getMockBookings({ filter, sortBy, page });
}

export async function getBooking(id) {
  return getMockBooking(id);
}

export async function getBookingsAfterDate(date) {
  return getMockBookingsAfterDate(date);
}

export async function getStaysAfterDate(date) {
  return getMockStaysAfterDate(date);
}

export async function getStaysTodayActivity() {
  return getMockStaysTodayActivity();
}

export async function createBooking(newBookingData) {
  return createMockBooking(newBookingData);
}

export async function updateBooking(id, obj) {
  return updateMockBooking(id, obj);
}

export async function deleteBooking(id) {
  return deleteMockBooking(id);
}