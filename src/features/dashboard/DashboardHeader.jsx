import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ShieldCheck, Cloud, MapPin, Plus } from "lucide-react";
import DashboardFilter from "./DashboardFilter";
import { motion } from "framer-motion";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function DashboardHeader({ occupancyRate = 0 }) {
  const navigate = useNavigate();
  const greeting = getGreeting();
  const currentDateStr = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-800/80 relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="flex flex-col gap-2.5">
        {/* Resort Location & Weather Badge */}
        <div className="flex flex-wrap items-center gap-3 text-[1.15rem] font-medium text-zinc-400 mb-1">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/60 border border-zinc-800/80 shadow-sm backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            Horizon Aspen Ridge
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-950/30 border border-sky-900/30 text-sky-200/80 shadow-sm backdrop-blur-sm">
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
            21°C Clear Skies
          </span>
          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/30 border border-amber-900/30 text-amber-200/80 shadow-sm backdrop-blur-sm">
            Peak Season
          </span>
        </div>

        <div className="flex items-center gap-4">
          <h1 className="text-[2.8rem] font-bold text-zinc-50 tracking-tight leading-none">
            {greeting},{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow-sm">
              Horizon Team
            </span>
          </h1>
          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[1.15rem] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Resort Live Operations
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[1.3rem] text-zinc-400 font-medium mt-1">
          <span className="text-zinc-300">{currentDateStr}</span>
          <span className="text-zinc-700 hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1.5 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            System Status: <span className="text-zinc-100 font-semibold">Active & Optimized</span>
          </span>
          {occupancyRate > 0 && (
            <>
              <span className="text-zinc-700 hidden sm:inline">&bull;</span>
              <span className="text-amber-300/90 font-medium">
                {Math.round(occupancyRate * 100)}% Period Occupancy
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 self-start lg:self-auto w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
        <motion.button
          onClick={() => navigate("/new-booking")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold text-[1.3rem] shadow-lg shadow-amber-500/20 border border-amber-400/50 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Reservation</span>
          <span className="sm:hidden">New</span>
        </motion.button>
        <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
        <DashboardFilter />
      </div>
    </div>
  );
}

export default DashboardHeader;
