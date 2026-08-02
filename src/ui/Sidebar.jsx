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
} from "react-icons/hi2";
import UserAvatar from "../features/authentication/UserAvatar";

const NAV_ITEMS = [
  { to: "/dashboard", icon: HiOutlineHome, label: "Dashboard" },
  { to: "/bookings", icon: HiOutlineCalendarDays, label: "Bookings" },
  { to: "/cabins", icon: HiOutlineHomeModern, label: "Cabins" },
  { to: "/users", icon: HiOutlineUsers, label: "Users" },
  { to: "/settings", icon: HiOutlineCog6Tooth, label: "Settings" },
];

const sidebarVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { x: -12, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.25 } },
};

function Sidebar() {
  return (
    <motion.aside
      className="flex flex-col bg-zinc-900 border-r border-zinc-800 overflow-y-auto"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Brand */}
      <Link to="/dashboard" className="no-underline">
        <motion.div
          className="flex items-center gap-3 px-5 py-5 border-b border-zinc-800"
          variants={itemVariants}
        >
          <img
            src="/horizon-stay-logo.png"
            alt="Horizon Stay Logo"
            className="w-10 h-10 object-contain rounded-lg flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-[1.5rem] font-bold text-zinc-100 tracking-tight leading-tight">
              Horizon Stay
            </span>
            <span className="text-[1rem] font-semibold tracking-[0.12em] uppercase text-brand-500">
              Management
            </span>
          </div>
        </motion.div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <motion.li key={to} variants={itemVariants}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-[1.45rem] font-medium transition-all duration-200 no-underline ${
                    isActive
                      ? "bg-brand-500/10 text-zinc-100 border border-brand-500/20"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-brand-500" : ""
                      }`}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Bottom actions */}
      <motion.div
        className="px-3 py-4 border-t border-zinc-800 flex flex-col gap-2"
        variants={itemVariants}
      >
        <Link
          to="/new-booking"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-[1.35rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-600/25 no-underline"
        >
          <HiOutlinePlus className="w-5 h-5" />
          New Booking
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-[1.35rem] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all duration-200 no-underline"
        >
          <HiOutlineQuestionMarkCircle className="w-[1.8rem] h-[1.8rem]" />
          Help Center
        </Link>
      </motion.div>

      {/* User */}
      <motion.div
        className="px-3 py-4 border-t border-zinc-800"
        variants={itemVariants}
      >
        <UserAvatar />
      </motion.div>
    </motion.aside>
  );
}

export default Sidebar;
