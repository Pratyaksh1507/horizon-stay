import { DollarSign, Calendar, BedDouble, Users } from "lucide-react";
import Stat from "./Stat";

function Stats({ bookings = [], confirmedStays = [], numDays = 7, cabinCount = 0 }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce((acc, cur) => acc + (cur.totalPrice || 0), 0);
  const extrasSales = bookings.reduce((acc, cur) => acc + (cur.extrasPrice || 0), 0);
  const roomSales = Math.max(totalSales - extrasSales, 0);

  const totalNightsStayed = confirmedStays.reduce((acc, cur) => acc + (cur.numNights || 0), 0);
  const maxPossibleNights = numDays * Math.max(cabinCount, 1);
  const occupation = Math.min(totalNightsStayed / maxPossibleNights, 1);
  const occupancyPercentage = Math.round(occupation * 100);

  const avgStayLength = confirmedStays.length > 0
    ? (totalNightsStayed / confirmedStays.length).toFixed(1)
    : "0.0";

  const adr = totalNightsStayed > 0
    ? Math.round(totalSales / totalNightsStayed)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
      <Stat
        title="Total Revenue"
        theme="amber"
        icon={<DollarSign className="w-5 h-5" />}
        numericValue={totalSales}
        prefix="$"
        formatOptions={{ maximumFractionDigits: 0 }}
        subtext={
          <span className="flex items-center gap-2">
            <span className="text-zinc-300">Rooms ${(roomSales / 1000).toFixed(1)}k</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-amber-400/80">Extras ${(extrasSales / 1000).toFixed(1)}k</span>
          </span>
        }
        badgeText={adr > 0 ? `ADR $${adr}` : undefined}
      />

      <Stat
        title="Occupancy Rate"
        theme="emerald"
        icon={<BedDouble className="w-5 h-5" />}
        numericValue={occupancyPercentage}
        suffix="%"
        formatOptions={{ maximumFractionDigits: 0 }}
        subtext={
          <span className="flex items-center gap-2">
            <span className="text-zinc-300">{totalNightsStayed}</span>
            <span className="text-zinc-500">of</span>
            <span className="text-zinc-300">{maxPossibleNights}</span>
            <span className="text-zinc-500">capacity nights</span>
          </span>
        }
        badgeText={occupancyPercentage >= 75 ? "High Demand" : "Optimal"}
      />

      <Stat
        title="Confirmed Stays"
        theme="sky"
        icon={<Calendar className="w-5 h-5" />}
        numericValue={confirmedStays.length}
        formatOptions={{ maximumFractionDigits: 0 }}
        subtext={
          <span className="flex items-center gap-2">
            <span className="text-zinc-500">Avg. length:</span>
            <span className="text-zinc-300">{avgStayLength} nights</span>
          </span>
        }
        badgeText={`${numBookings} reservations`}
      />

      <Stat
        title="Guest Nights"
        theme="indigo"
        icon={<Users className="w-5 h-5" />}
        numericValue={totalNightsStayed}
        formatOptions={{ maximumFractionDigits: 0 }}
        subtext={
          <span className="flex items-center gap-2">
            <span className="text-indigo-300">{cabinCount}</span>
            <span className="text-zinc-500">luxury cabins online</span>
          </span>
        }
        badgeText="Resort Capacity"
      />
    </div>
  );
}

export default Stats;
