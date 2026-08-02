import { useMemo, useCallback } from "react";

// Map database nationality strings to GeoJSON feature names
const COUNTRY_NAME_MAPPING = {
  "Great Britain": "United Kingdom",
  "USA": "United States of America",
  "United States": "United States of America",
};

export function useVisitorStats(confirmedStays = []) {
  const { visitorsByCountry, visitorCounts } = useMemo(() => {
    const stats = {};
    confirmedStays.forEach((stay) => {
      let nationality = stay.guests?.nationality;
      if (!nationality) return;

      if (COUNTRY_NAME_MAPPING[nationality]) {
        nationality = COUNTRY_NAME_MAPPING[nationality];
      }

      // Count 1 unique visitor group per stay
      stats[nationality] = (stats[nationality] || 0) + 1;
    });

    const counts = Object.values(stats);
    return { visitorsByCountry: stats, visitorCounts: counts };
  }, [confirmedStays]);

  const visitorStats = useMemo(() => {
    const total = visitorCounts.reduce((sum, val) => sum + val, 0);
    return {
      trend: 0, // In a real app with historical data, calculate percentage change here
      total,
    };
  }, [visitorCounts]);

  const getVisitorColor = useCallback((feature) => {
    const name = feature.properties?.name;
    const mappedName = COUNTRY_NAME_MAPPING[name] || name;
    
    const visitors = visitorsByCountry[name] || visitorsByCountry[mappedName];

    if (!visitors) {
      return "var(--color-zinc-800)";
    }

    const max = Math.max(...visitorCounts, 1);
    
    // Dynamic grayscale tiers based on max visitors in current period
    if (visitors >= max * 0.8) return "var(--color-zinc-300)";
    if (visitors >= max * 0.6) return "var(--color-zinc-400)";
    if (visitors >= max * 0.4) return "var(--color-zinc-500)";
    if (visitors >= max * 0.2) return "var(--color-zinc-600)";
    
    return "var(--color-zinc-700)";
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
    getVisitorColor,
    getVisitorValue,
    computeVisitorTrend,
  };
}
