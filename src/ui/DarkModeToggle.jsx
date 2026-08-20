import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      type="button"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="p-2 sm:p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all duration-200 cursor-pointer shadow-xs"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDarkMode ? (
        <HiOutlineSun className="w-5 h-5 text-amber-400" />
      ) : (
        <HiOutlineMoon className="w-5 h-5 text-sky-400" />
      )}
    </motion.button>
  );
}

export default DarkModeToggle;
