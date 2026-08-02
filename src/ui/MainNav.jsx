import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const NAV_ITEMS = [
  { to: "/dashboard", icon: HiOutlineHome, label: "Dashboard" },
  { to: "/bookings", icon: HiOutlineCalendarDays, label: "Bookings" },
  { to: "/cabins", icon: HiOutlineHomeModern, label: "Cabins" },
  { to: "/users", icon: HiOutlineUsers, label: "Users" },
  { to: "/settings", icon: HiOutlineCog6Tooth, label: "Settings" },
];

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-[1.5rem] font-medium transition-all duration-300 no-underline rounded-lg ${
                  isActive
                    ? "text-zinc-200 bg-zinc-800/50"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30"
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
