import { formatDistance, parseISO, differenceInDays } from "date-fns";

const isValidDate = (d) => d instanceof Date && !isNaN(d.getTime());

/**
 * Normalize input to a JS Date.
 * Accepts Date, ISO string, or other strings that new Date() understands.
 * Returns null for falsy/invalid inputs.
 */
const toDate = (input) => {
  if (!input && input !== 0) return null; // null/undefined
  if (input instanceof Date) return input;
  if (typeof input === "string") {
    // prefer parseISO for ISO strings, but fall back to Date constructor if parseISO fails
    const parsed = parseISO(input);
    if (isValidDate(parsed)) return parsed;
    const fallback = new Date(input);
    return isValidDate(fallback) ? fallback : null;
  }
  // numbers (timestamp) or other objects
  const maybeDate = new Date(input);
  return isValidDate(maybeDate) ? maybeDate : null;
};

export const subtractDates = (date1, date2) => {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!d1 || !d2) return NaN;
  return differenceInDays(d1, d2);
};

export const formatDistanceFromNow = (date) => {
  const d = toDate(date);
  if (!d) return "";
  return (
    formatDistance(d, new Date(), { addSuffix: true })
      .replace("about ", "")
      // replace only leading "in " (case-insensitive) with "In "
      .replace(/^in\s+/i, "In ")
  );
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
