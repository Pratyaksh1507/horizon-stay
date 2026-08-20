import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BedDouble, Users, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";

function CabinOccupancyMatrix({ cabins = [], confirmedStays = [] }) {
  const [filter, setFilter] = useState("all"); // "all" | "occupied" | "reserved" | "available"

  // Determine occupancy status for each cabin
  const enrichedCabins = useMemo(() => {
    return cabins.map((cabin) => {
      // 1. Current in-house guest (checked-in)
      const inHouseStay = confirmedStays.find(
        (stay) =>
          (stay.cabinId === cabin.id || stay.cabins?.id === cabin.id) &&
          stay.status === "checked-in"
      );

      // 2. Upcoming reserved stay (unconfirmed or future)
      const reservedStay = confirmedStays.find(
        (stay) =>
          (stay.cabinId === cabin.id || stay.cabins?.id === cabin.id) &&
          stay.status === "unconfirmed"
      );

      const activeStay = inHouseStay || reservedStay;
      const isOccupied = Boolean(inHouseStay);
      const isReserved = !isOccupied && Boolean(reservedStay);

      let status = "available";
      if (isOccupied) status = "occupied";
      else if (isReserved) status = "reserved";

      return {
        ...cabin,
        isOccupied,
        isReserved,
        status,
        currentGuest: activeStay?.guests?.fullName || null,
        stayLength: activeStay?.numNights || null,
      };
    });
  }, [cabins, confirmedStays]);

  const occupiedCount = useMemo(
    () => enrichedCabins.filter((c) => c.isOccupied).length,
    [enrichedCabins]
  );
  const reservedCount = useMemo(
    () => enrichedCabins.filter((c) => c.isReserved).length,
    [enrichedCabins]
  );
  const availableCount = enrichedCabins.length - occupiedCount - reservedCount;

  const filteredCabins = useMemo(() => {
    if (filter === "occupied") return enrichedCabins.filter((c) => c.isOccupied);
    if (filter === "reserved") return enrichedCabins.filter((c) => c.isReserved);
    if (filter === "available") return enrichedCabins.filter((c) => c.status === "available");
    return enrichedCabins;
  }, [enrichedCabins, filter]);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between gap-5 h-full shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-[1.8rem] font-bold text-zinc-100 tracking-tight">
              Cabin Status & Turnover
            </h3>
            <span className="text-[1.15rem] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {occupiedCount} In-House &bull; {reservedCount} Reserved &bull; {availableCount} Available
            </span>
          </div>
          <p className="text-[1.25rem] text-zinc-400 mt-0.5">
            Real-time resort unit readiness & in-house guest allocation
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center p-1 bg-zinc-950/70 border border-zinc-800 rounded-xl self-start sm:self-auto text-[1.2rem]">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === "all"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All ({enrichedCabins.length})
          </button>
          <button
            onClick={() => setFilter("occupied")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === "occupied"
                ? "bg-zinc-800 text-amber-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            In-House ({occupiedCount})
          </button>
          <button
            onClick={() => setFilter("reserved")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === "reserved"
                ? "bg-zinc-800 text-sky-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Reserved ({reservedCount})
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === "available"
                ? "bg-zinc-800 text-emerald-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Available ({availableCount})
          </button>
        </div>
      </div>

      {/* Grid of Cabins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 flex-1">
        <AnimatePresence mode="popLayout">
          {filteredCabins.map((cabin) => (
            <motion.div
              key={cabin.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-3 group relative overflow-hidden ${
                cabin.isOccupied
                  ? "bg-zinc-950/70 border-amber-500/20 hover:border-amber-500/40"
                  : "bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700/80"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  {cabin.image ? (
                    <img
                      src={cabin.image}
                      alt={cabin.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/cabin-001.jpg";
                      }}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-zinc-800"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center flex-shrink-0 text-zinc-400">
                      <BedDouble className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-[1.4rem] font-bold text-zinc-100 truncate group-hover:text-amber-300 transition-colors">
                      {cabin.name}
                    </h4>
                    <p className="text-[1.15rem] text-zinc-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      Up to {cabin.maxCapacity} guests
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-md text-[1.05rem] font-bold uppercase tracking-wider ${
                    cabin.status === "occupied"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : cabin.status === "reserved"
                      ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {cabin.status === "occupied"
                    ? "In-House"
                    : cabin.status === "reserved"
                    ? "Reserved"
                    : "Ready"}
                </span>
              </div>

              {/* Guest / Pricing info */}
              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[1.2rem]">
                {cabin.currentGuest ? (
                  <span className="text-zinc-300 font-medium truncate">
                    {cabin.status === "occupied" ? "In-House:" : "Arriving:"}{" "}
                    <span className="text-amber-300 font-semibold">{cabin.currentGuest}</span>
                  </span>
                ) : (
                  <span className="text-zinc-400">
                    <span className="text-zinc-100 font-bold tabular-nums">
                      {formatCurrency(cabin.regularPrice)}
                    </span>
                    /night
                  </span>
                )}

                <Link
                  to="/cabins"
                  className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded-md"
                  title="View Cabin Details"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CabinOccupancyMatrix;
