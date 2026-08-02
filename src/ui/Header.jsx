import { format } from "date-fns";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useLogout } from "../features/authentication/useLogout";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  const { logout, isPending } = useLogout();

  return (
    <motion.header
      className="bg-zinc-900 px-8 border-b border-zinc-800 flex items-center justify-between h-16"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h2 className="text-[1.8rem] font-bold text-zinc-100 tracking-tight">
        Dashboard
      </h2>

      <div className="flex items-center gap-2">
        <span className="text-[1.15rem] font-semibold tracking-[0.1em] uppercase text-zinc-500 px-3 py-1.5 bg-zinc-800 rounded-full">
          {format(new Date(), "MMM dd, yyyy")}
        </span>
        <DarkModeToggle />
        <motion.button
          onClick={logout}
          disabled={isPending}
          title="Log out"
          className="p-2.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiArrowRightOnRectangle className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.header>
  );
}

export default Header;
