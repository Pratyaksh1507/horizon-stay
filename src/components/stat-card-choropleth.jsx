"use client";
import { useState, useMemo } from "react";
import { Globe, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import NumberFlow from "@number-flow/react";
import {
  ChoroplethChart,
  ChoroplethFeatureComponent,
  ChoroplethTooltip,
} from "components/charts";
import { useWorldDataStandalone } from "lib/use-world-data";
import { useVisitorStats } from "../features/dashboard/useVisitorStats";
import { StatCardChoroplethHoverBridge } from "./stat-card-choropleth-hover-bridge";

export function StatCardChoropleth({ confirmedStays = [], allBookings = [] }) {
  const [clientFilter, setClientFilter] = useState("all"); // "all" | "active"
  const { worldData, isLoading } = useWorldDataStandalone();

  // Filter dataset based on All Clients vs Active In-House Clients
  const filteredDataset = useMemo(() => {
    const pool = confirmedStays.length > 0 ? confirmedStays : allBookings;
    if (clientFilter === "active") {
      return pool.filter((s) => s.status === "checked-in");
    }
    return pool;
  }, [confirmedStays, allBookings, clientFilter]);

  const {
    getVisitorColor,
    getVisitorValue,
    visitorStats,
    topCountries,
    computeVisitorTrend,
    visitorsByCountry,
  } = useVisitorStats(filteredDataset);

  const [hover, setHover] = useState({
    value: null,
    label: null,
    trend: null,
  });

  const displayValue = hover.value ?? visitorStats.total;
  const displayLabel = hover.label ?? (clientFilter === "active" ? "Active In-House Guests" : "Total Guest Volume");
  const totalCountries = Object.keys(visitorsByCountry).length;

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-6 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[1.8rem] font-bold text-zinc-100 tracking-tight">
                  Global Guest Reach & Demographics
                </h3>
                <span className="text-[1.1rem] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 hidden sm:inline">
                  {clientFilter === "active" ? "In-House Filter Active" : "All Markets"}
                </span>
              </div>
              <p className="text-[1.25rem] text-zinc-400 mt-0.5">
                {clientFilter === "active"
                  ? "Showing origin map for currently checked-in in-house resort residents"
                  : "Geographic distribution across all international reservations and stays"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Segmented Toggle & Quick KPI */}
        <div className="flex flex-wrap items-center gap-4 self-start md:self-auto">
          {/* Segmented Filter Toggle */}
          <div className="flex items-center p-1 bg-zinc-950/80 border border-zinc-800 rounded-xl text-[1.2rem] shadow-xs">
            <button
              onClick={() => setClientFilter("all")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                clientFilter === "all"
                  ? "bg-zinc-800 text-zinc-100 shadow-sm font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>All Clients</span>
            </button>
            <button
              onClick={() => setClientFilter("active")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                clientFilter === "active"
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Active In-House</span>
            </button>
          </div>

          <div className="h-8 w-px bg-zinc-800 hidden sm:block" />

          {/* Header Stats */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[1.1rem] font-medium text-zinc-400 uppercase tracking-wider">
                Source Nations
              </span>
              <span className="text-[2rem] font-bold text-zinc-100 tabular-nums leading-tight">
                <NumberFlow value={totalCountries} />
              </span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div className="flex flex-col items-end">
              <span className="text-[1.1rem] font-medium text-zinc-400 uppercase tracking-wider">
                {displayLabel}
              </span>
              <span className="text-[2rem] font-bold text-amber-400 tabular-nums leading-tight">
                <NumberFlow value={displayValue} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: World Map + Top Markets Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        {/* World Choropleth Map */}
        <div className="lg:col-span-8 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 overflow-hidden relative min-h-[380px] flex items-center justify-center">
          {isLoading || !worldData ? (
            <div className="flex h-full min-h-[380px] items-center justify-center text-zinc-500 text-[1.4rem]">
              Loading interactive globe…
            </div>
          ) : (
            <ChoroplethChart aspectRatio="2.2 / 1" className="min-h-[380px] w-full" data={worldData}>
              <StatCardChoroplethHoverBridge
                onHoverChange={setHover}
                getVisitorValue={getVisitorValue}
                computeVisitorTrend={computeVisitorTrend}
              />
              <ChoroplethFeatureComponent
                stroke="var(--color-zinc-900, #18181b)"
                getFeatureColor={(feature) => getVisitorColor(feature)}
              />
              <ChoroplethTooltip getFeatureValue={getVisitorValue} valueLabel="Guests" />
            </ChoroplethChart>
          )}

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl px-3.5 py-2 flex items-center gap-3 text-[1.15rem] text-zinc-400 shadow-lg">
            <span className="text-zinc-500">Low</span>
            <div className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-sm bg-[#92400e]" title="Moderate Density" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#d97706]" title="High Density" />
              <span className="w-3.5 h-3.5 rounded-sm bg-[#f59e0b]" title="Peak Origin" />
            </div>
            <span className="text-amber-400 font-semibold">Peak Origin</span>
          </div>
        </div>

        {/* Top Markets Sidebar Leaderboard */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4 bg-zinc-950/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[1.5rem] font-bold text-zinc-100 tracking-tight">
                Top Source Markets
              </h4>
              <span className="text-[1.15rem] text-amber-400/90 font-medium">
                {clientFilter === "active" ? "In-House" : "All Time"}
              </span>
            </div>
            <p className="text-[1.2rem] text-zinc-400 mb-5">
              {clientFilter === "active"
                ? "Guest origin breakdown for current in-house occupants"
                : "Leading guest origins by total reservation count"}
            </p>

            {topCountries.length > 0 ? (
              <div className="flex flex-col gap-4">
                {topCountries.map((item, idx) => (
                  <div key={item.country} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[1.3rem]">
                      <div className="flex items-center gap-2 font-semibold text-zinc-200 truncate">
                        <span className="text-amber-400 font-mono text-[1.15rem] w-5">
                          #{idx + 1}
                        </span>
                        <span className="truncate">{item.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-100 tabular-nums">
                          {item.count} {item.count === 1 ? "guest" : "guests"}
                        </span>
                        <span className="text-zinc-500 text-[1.15rem]">
                          ({item.percentage}%)
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(item.percentage, 8)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-zinc-500 text-[1.35rem]">
                No guest nationality data for selected filter
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5 text-[1.2rem] text-zinc-300 mt-2">
            <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              {clientFilter === "active"
                ? "Active guests represent 5 key global mountain travel corridors"
                : "Direct bookings represent highest international retention"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCardChoropleth;
