import { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import NumberFlow from "@number-flow/react";
import { TrendingUp, Sparkles, Layers } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";
import { useDarkMode } from "../../context/DarkModeContext";

function CustomSalesTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const total = payload.find((p) => p.dataKey === "totalSales")?.value ?? null;
  const extras = payload.find((p) => p.dataKey === "extrasSales")?.value ?? null;
  const rooms = payload.find((p) => p.dataKey === "roomSales")?.value ?? null;
  const occupiedRooms = payload.find((p) => p.dataKey === "occupiedRooms")?.value ?? null;
  const activeGuests = payload.find((p) => p.dataKey === "activeGuests")?.value ?? null;

  return (
    <div className="bg-zinc-950/95 border border-zinc-800/90 shadow-2xl rounded-xl p-4 min-w-[210px] backdrop-blur-xl">
      <p className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex flex-col gap-1.5">
        {total !== null && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-[1.3rem] text-zinc-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Total Revenue
            </span>
            <span className="text-[1.4rem] font-bold text-zinc-100 tabular-nums">
              {formatCurrency(total)}
            </span>
          </div>
        )}
        {rooms !== null && (
          <div className="flex items-center justify-between gap-4 text-[1.2rem] text-zinc-400 pl-4 border-l border-zinc-800">
            <span>Room Bookings</span>
            <span className="font-medium text-zinc-300 tabular-nums">
              {formatCurrency(rooms)}
            </span>
          </div>
        )}
        {extras !== null && (
          <div className="flex items-center justify-between gap-4 text-[1.2rem] text-zinc-400 pl-4 border-l border-zinc-800">
            <span>Extras & Services</span>
            <span className="font-medium text-emerald-400 tabular-nums">
              {formatCurrency(extras)}
            </span>
          </div>
        )}
        {occupiedRooms !== null && (
          <div className="flex items-center justify-between gap-4 pt-1 mt-1 border-t border-zinc-800 text-[1.25rem]">
            <span className="text-sky-300 font-medium">In-House Stays</span>
            <span className="font-bold text-zinc-100 tabular-nums">
              {occupiedRooms} cabins ({activeGuests} guests)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function SalesChart({ bookings = [], confirmedStays = [], numDays = 7 }) {
  const { isDarkMode } = useDarkMode();
  const [viewMode, setViewMode] = useState("combined"); // "combined" | "breakdown" | "occupancy" | "trend"

  const allDates = useMemo(
    () =>
      eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
      }),
    [numDays]
  );

  const data = useMemo(() => {
    return allDates.map((date) => {
      const matchingBookings = bookings.filter((b) => {
        const dateVal = b.createdAt || b.created_at;
        return dateVal ? isSameDay(date, new Date(dateVal)) : false;
      });
      const total = matchingBookings.reduce(
        (acc, cur) => acc + (cur.totalPrice || 0),
        0
      );
      const extras = matchingBookings.reduce(
        (acc, cur) => acc + (cur.extrasPrice || 0),
        0
      );
      const rooms = Math.max(total - extras, 0);

      // Active stays in-house on this date
      const activeStaysOnDay = confirmedStays.filter((stay) => {
        if (!stay.startDate || !stay.endDate) return false;
        const start = new Date(stay.startDate);
        const end = new Date(stay.endDate);
        return date >= start && date <= end;
      });

      const activeGuestsOnDay = activeStaysOnDay.reduce(
        (acc, cur) => acc + (cur.numGuests || 1),
        0
      );

      return {
        dateObj: date,
        label: format(date, numDays > 30 ? "MMM dd" : "EEE, MMM dd"),
        shortLabel: format(date, "MMM dd"),
        totalSales: total,
        extrasSales: extras,
        roomSales: rooms,
        occupiedRooms: activeStaysOnDay.length,
        activeGuests: activeGuestsOnDay,
      };
    });
  }, [allDates, bookings, confirmedStays, numDays]);

  const totalPeriodSales = useMemo(
    () => data.reduce((acc, cur) => acc + cur.totalSales, 0),
    [data]
  );

  const dailyAvg = useMemo(
    () => (data.length > 0 ? Math.round(totalPeriodSales / data.length) : 0),
    [data, totalPeriodSales]
  );

  const peakDay = useMemo(() => {
    if (!data.length) return null;
    return [...data].sort((a, b) => b.totalSales - a.totalSales)[0];
  }, [data]);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-6 sm:p-7 flex flex-col gap-6 shadow-xl relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[1.8rem] font-bold text-zinc-100 tracking-tight">
              Revenue & Operations Intelligence
            </h3>
            <span className="text-[1.15rem] font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {numDays} Days Interval
            </span>
          </div>
          <p className="text-[1.25rem] text-zinc-400 mt-0.5">
            {format(allDates[0], "MMMM d, yyyy")} &mdash;{" "}
            {format(allDates[allDates.length - 1], "MMMM d, yyyy")}
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center p-1 bg-zinc-950/70 border border-zinc-800 rounded-xl self-start sm:self-auto text-[1.2rem]">
          <button
            onClick={() => setViewMode("combined")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "combined"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Combined
          </button>
          <button
            onClick={() => setViewMode("breakdown")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "breakdown"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Rooms vs Extras
          </button>
          <button
            onClick={() => setViewMode("occupancy")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "occupancy"
                ? "bg-zinc-800 text-sky-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Room Nights
          </button>
          <button
            onClick={() => setViewMode("trend")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === "trend"
                ? "bg-zinc-800 text-amber-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Daily Benchmark
          </button>
        </div>
      </div>

      {/* Metric Quick Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10 pt-2 border-t border-zinc-800/60">
        <div className="flex flex-col">
          <span className="text-[1.15rem] font-medium text-zinc-400 uppercase tracking-wider">
            Period Total
          </span>
          <span className="text-[2rem] font-bold text-zinc-100 tracking-tight tabular-nums flex items-baseline">
            <NumberFlow
              value={totalPeriodSales}
              prefix="$"
              format={{ maximumFractionDigits: 0 }}
            />
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[1.15rem] font-medium text-zinc-400 uppercase tracking-wider">
            Daily Average
          </span>
          <span className="text-[2rem] font-bold text-zinc-100 tracking-tight tabular-nums flex items-baseline">
            <NumberFlow
              value={dailyAvg}
              prefix="$"
              format={{ maximumFractionDigits: 0 }}
            />
            <span className="text-[1.2rem] font-normal text-zinc-500 ml-1">/day</span>
          </span>
        </div>
        {peakDay && peakDay.totalSales > 0 && (
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-[1.15rem] font-medium text-zinc-400 uppercase tracking-wider">
              Peak Day
            </span>
            <span className="text-[1.4rem] font-semibold text-amber-400 mt-1">
              {peakDay.shortLabel}: {formatCurrency(peakDay.totalSales)}
            </span>
          </div>
        )}
      </div>

      {/* Chart Area */}
      <div className="w-full h-[320px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="totalSalesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="roomSalesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="extrasSalesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis
              dataKey="shortLabel"
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "#27272a" }}
              dy={8}
            />
            <YAxis
              unit={viewMode === "occupancy" ? "" : "$"}
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                viewMode === "occupancy"
                  ? v
                  : v >= 1000
                  ? `${(v / 1000).toFixed(0)}k`
                  : v
              }
            />
            <Tooltip
              content={<CustomSalesTooltip />}
              cursor={{ stroke: "#52525b", strokeWidth: 1, strokeDasharray: "4 4" }}
            />

            {viewMode === "trend" && (
              <ReferenceLine
                y={dailyAvg}
                stroke="#a1a1aa"
                strokeDasharray="4 4"
                label={{
                  value: `Avg: $${dailyAvg}`,
                  fill: "#a1a1aa",
                  fontSize: 11,
                  position: "top",
                }}
              />
            )}

            {viewMode === "occupancy" ? (
              <>
                <Area
                  type="monotone"
                  dataKey="occupiedRooms"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#roomSalesGrad)"
                  name="Occupied Cabins"
                  activeDot={{ r: 6, fill: "#38bdf8", stroke: "#18181b", strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="activeGuests"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#extrasSalesGrad)"
                  name="In-House Guests"
                  activeDot={{ r: 5, fill: "#10b981", stroke: "#18181b", strokeWidth: 2 }}
                />
              </>
            ) : viewMode === "combined" || viewMode === "trend" ? (
              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#f59e0b"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#totalSalesGrad)"
                name="Total Revenue"
                activeDot={{ r: 6, fill: "#fbbf24", stroke: "#18181b", strokeWidth: 2 }}
              />
            ) : (
              <>
                <Area
                  type="monotone"
                  dataKey="roomSales"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#roomSalesGrad)"
                  name="Room Bookings"
                  activeDot={{ r: 5, fill: "#38bdf8", stroke: "#18181b", strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="extrasSales"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#extrasSalesGrad)"
                  name="Extras & Services"
                  activeDot={{ r: 5, fill: "#10b981", stroke: "#18181b", strokeWidth: 2 }}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
