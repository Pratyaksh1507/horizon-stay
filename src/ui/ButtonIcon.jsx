import { motion } from "framer-motion";

function ButtonIcon({ children, onClick, disabled, title, className = "" }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default ButtonIcon;
