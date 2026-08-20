import { useMemo, useCallback } from "react";

// Map database nationality strings to GeoJSON feature names
const COUNTRY_NAME_MAPPING = {
  "Great Britain": "United Kingdom",
  "USA": "United States of America",
  "United States": "United States of America",
  "South Korea": "Korea, Republic of",
};

export function useVisitorStats(staysList = []) {
  const { visitorsByCountry, visitorCounts } = useMemo(() => {
    const stats = {};
    staysList.forEach((stay) => {
      let nationality = stay.guests?.nationality || stay.nationality;
      if (!nationality) return;

      if (COUNTRY_NAME_MAPPING[nationality]) {
        nationality = COUNTRY_NAME_MAPPING[nationality];
      }

      // Count unique guests or groups
      stats[nationality] = (stats[nationality] || 0) + (stay.numGuests || 1);
    });

    const counts = Object.values(stats);
    return { visitorsByCountry: stats, visitorCounts: counts };
  }, [staysList]);

  const visitorStats = useMemo(() => {
    const total = visitorCounts.reduce((sum, val) => sum + val, 0);
    return {
      trend: 0,
      total,
    };
  }, [visitorCounts]);

  const topCountries = useMemo(() => {
    const total = visitorStats.total || 1;
    return Object.entries(visitorsByCountry)
      .map(([country, count]) => ({
        country,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [visitorsByCountry, visitorStats.total]);

  const getVisitorColor = useCallback((feature) => {
    const name = feature.properties?.name;
    const mappedName = COUNTRY_NAME_MAPPING[name] || name;
    
    const visitors = visitorsByCountry[name] || visitorsByCountry[mappedName];

    if (!visitors) {
      return "var(--color-zinc-850, #202024)";
    }

    const max = Math.max(...visitorCounts, 1);
    
    // Dynamic warm gold/amber gradient for visitor density
    if (visitors >= max * 0.75) return "#f59e0b"; // Vibrant Amber 500
    if (visitors >= max * 0.5) return "#fbbf24";  // Warm Amber 400
    if (visitors >= max * 0.25) return "#d97706"; // Deep Amber 600
    if (visitors >= max * 0.1) return "#b45309";  // Amber 700
    
    return "#92400e";
  }, [visitorsByCountry, visitorCounts]);

  const getVisitorValue = useCallback((feature) => {
    const name = feature.properties?.name;
    const mappedName = COUNTRY_NAME_MAPPING[name] || name;
    return visitorsByCountry[name] || visitorsByCountry[mappedName] || undefined;
  }, [visitorsByCountry]);

  const computeVisitorTrend = useCallback((visitors) => {
    if (visitorCounts.length === 0) return 0;
    const average = visitorStats.total / visitorCounts.length;
    if (average === 0) return 0;
    return ((visitors - average) / average) * 100;
  }, [visitorCounts.length, visitorStats.total]);

  return {
    visitorsByCountry,
    visitorStats,
    topCountries,
    getVisitorColor,
    getVisitorValue,
    computeVisitorTrend,
  };
}
