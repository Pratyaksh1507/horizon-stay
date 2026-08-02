"use client";
import { useChoropleth } from "components/charts";
import { useEffect } from "react";
export function StatCardChoroplethHoverBridge({
  onHoverChange,
  getVisitorValue,
  computeVisitorTrend
}) {
  const { tooltipData } = useChoropleth();

  useEffect(() => {
    if (!tooltipData?.feature) {
      onHoverChange({ value: null, label: null, trend: null });
      return;
    }

    const feature = tooltipData.feature;
    const label = (feature.properties?.name) ?? "Unknown";
    const visitors = getVisitorValue(feature);
    const value = visitors ?? 0;
    const trend = visitors === undefined ? null : computeVisitorTrend(visitors);

    onHoverChange({ value, label, trend });
  }, [onHoverChange, tooltipData, getVisitorValue, computeVisitorTrend]);

  return null;
}
