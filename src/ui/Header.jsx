import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { Cloud, MapPin, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLogout } from "../features/authentication/useLogout";
import DarkModeToggle from "./DarkModeToggle";

const ROUTE_CONFIG = {
  "/dashboard": { section: "Overview", title: "Operations Dashboard" },
  "/bookings": { section: "Reservations", title: "All Bookings" },
  "/new-booking": { section: "Reservations", title: "Create Reservation" },
  "/cabins": { section: "Inventory", title: "Resort Cabins & Units" },
  "/users": { section: "Administration", title: "Staff & User Directory" },
  "/settings": { section: "Administration", title: "Resort Configuration" },
  "/account": { section: "Personal", title: "Manager Account Profile" },
  "/help": { section: "Support", title: "Help & Knowledge Center" },
};

function getRouteInfo(pathname) {
  if (ROUTE_CONFIG[pathname]) return ROUTE_CONFIG[pathname];
  if (pathname.startsWith("/checkin/")) {
    return { section: "Front Desk", title: "Guest Check-In" };
  }
  if (pathname.startsWith("/bookings/")) {
    return { section: "Reservations", title: "Reservation Details" };
  }
  return { section: "Management", title: "Horizon Stay" };
}

function Header() {
  const { logout, isPending } = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const { section, title } = getRouteInfo(location.pathname);

  return (
    <motion.header
      className="bg-zinc-900/80 backdrop-blur-xl px-6 sm:px-8 border-b border-zinc-800/90 flex items-center justify-between h-16 sm:h-[4.5rem] sticky top-0 z-30 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Breadcrumb & Section Indicator */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/70 border border-zinc-800 text-[1.15rem] font-medium text-zinc-400 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="truncate">{section}</span>
        </div>
        <span className="text-zinc-600 hidden sm:inline">&bull;</span>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-zinc-100 tracking-tight truncate">
          {title}
        </h2>
      </div>

      {/* Right Controls & Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Weather & Location Pill (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800/80 text-[1.15rem] text-zinc-400">
          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
          <span>Aspen Ridge</span>
          <span className="text-zinc-700">&bull;</span>
          <Cloud className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-sky-200/90">21°C</span>
        </div>

        {/* Date Pill */}
        <span className="hidden md:inline-flex items-center gap-1.5 text-[1.15rem] font-medium text-zinc-400 px-3 py-1 bg-zinc-950/60 border border-zinc-800/80 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
          {format(new Date(), "MMM dd, yyyy")}
        </span>

        {/* Quick New Reservation launcher (if not already on new booking page) */}
        {location.pathname !== "/new-booking" && (
          <motion.button
            onClick={() => navigate("/new-booking")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[1.2rem] font-semibold transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Book</span>
          </motion.button>
        )}

        <DarkModeToggle />

        <div className="h-6 w-px bg-zinc-800/80 hidden sm:block" />

        {/* Log Out Button */}
        <motion.button
          onClick={logout}
          disabled={isPending}
          title="Sign out of Horizon"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[1.25rem] text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiArrowRightOnRectangle className="w-5 h-5" />
          <span className="hidden lg:inline font-medium">Log out</span>
        </motion.button>
      </div>
    </motion.header>
  );
}

export default Header;
