import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlinePlus,
  HiOutlineQuestionMarkCircle,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import UserAvatar from "../features/authentication/UserAvatar";
import { useSidebar } from "../context/SidebarContext";

const NAV_ITEMS = [
  { to: "/dashboard", icon: HiOutlineHome, label: "Dashboard" },
  { to: "/bookings", icon: HiOutlineCalendarDays, label: "Bookings" },
  { to: "/cabins", icon: HiOutlineHomeModern, label: "Cabins" },
  { to: "/users", icon: HiOutlineUsers, label: "Users" },
  { to: "/settings", icon: HiOutlineCog6Tooth, label: "Settings" },
];

function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <motion.aside
      className={`flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ease-in-out relative select-none ${
        isCollapsed ? "w-full items-center" : "w-full"
      }`}
    >
      {/* Brand & Collapse Header */}
      <div
        className={`flex items-center border-b border-zinc-800 py-4 transition-all duration-200 ${
          isCollapsed ? "justify-center px-2" : "justify-between px-5"
        }`}
      >
        <Link to="/dashboard" className="no-underline flex items-center gap-3 min-w-0">
          <img
            src="/horizon-stay-logo.png"
            alt="Horizon Stay Logo"
            className="w-9 h-9 object-contain rounded-lg flex-shrink-0"
          />
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col min-w-0"
            >
              <span className="text-[1.5rem] font-bold text-zinc-100 tracking-tight leading-tight truncate">
                Horizon Stay
              </span>
              <span className="text-[0.95rem] font-semibold tracking-[0.12em] uppercase text-brand-500">
                Management
              </span>
            </motion.div>
          )}
        </Link>

        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={toggleSidebar}
          type="button"
          title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar"}
          className={`p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 border border-zinc-800 transition-all cursor-pointer shadow-xs ${
            isCollapsed ? "mt-2 hidden" : ""
          }`}
        >
          <HiChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* When collapsed, show quick expand button below logo */}
      {isCollapsed && (
        <div className="pt-2 pb-1 flex justify-center">
          <button
            onClick={toggleSidebar}
            type="button"
            title="Expand Sidebar"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/80 border border-zinc-800/80 transition-all cursor-pointer"
          >
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav className={`flex-1 overflow-y-auto py-4 ${isCollapsed ? "px-2" : "px-3"}`}>
        <ul className="flex flex-col gap-1.5">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <li key={to} className="relative group">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center rounded-xl text-[1.4rem] font-medium transition-all duration-200 no-underline ${
                    isCollapsed
                      ? "justify-center w-11 h-11 mx-auto"
                      : "gap-3 px-4 py-3"
                  } ${
                    isActive
                      ? "bg-brand-500/15 text-zinc-100 border border-brand-500/30 font-semibold shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        isActive ? "text-amber-400" : "group-hover:text-zinc-200"
                      }`}
                    />
                    {!isCollapsed && <span>{label}</span>}
                  </>
                )}
              </NavLink>

              {/* Floating Tooltip when Collapsed */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl text-zinc-100 text-[1.2rem] font-semibold tracking-wide whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  {label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div
        className={`border-t border-zinc-800 flex flex-col gap-2 py-4 ${
          isCollapsed ? "px-2 items-center" : "px-3"
        }`}
      >
        {isCollapsed ? (
          <div className="relative group">
            <Link
              to="/new-booking"
              title="New Reservation"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 transition-all hover:scale-105 no-underline"
            >
              <HiOutlinePlus className="w-5 h-5 font-bold" />
            </Link>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl text-zinc-100 text-[1.2rem] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              New Reservation
            </div>
          </div>
        ) : (
          <Link
            to="/new-booking"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-[1.35rem] font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >
            <HiOutlinePlus className="w-5 h-5 font-bold" />
            <span>New Reservation</span>
          </Link>
        )}

        {isCollapsed ? (
          <div className="relative group">
            <Link
              to="/help"
              title="Help Center"
              className="flex items-center justify-center w-11 h-11 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all no-underline"
            >
              <HiOutlineQuestionMarkCircle className="w-5 h-5" />
            </Link>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl text-zinc-100 text-[1.2rem] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              Help Center
            </div>
          </div>
        ) : (
          <Link
            to="/help"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[1.35rem] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all duration-200 no-underline"
          >
            <HiOutlineQuestionMarkCircle className="w-[1.8rem] h-[1.8rem]" />
            <span>Help Center</span>
          </Link>
        )}
      </div>

      {/* User Avatar Card */}
      <div
        className={`border-t border-zinc-800 py-3.5 transition-all ${
          isCollapsed ? "px-2 flex justify-center" : "px-4"
        }`}
      >
        <UserAvatar isCollapsed={isCollapsed} />
      </div>
    </motion.aside>
  );
}

export default Sidebar;
