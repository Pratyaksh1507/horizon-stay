import { motion } from "framer-motion";

function ButtonText({ children, onClick, disabled, ...props }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="text-brand-500 font-medium text-center bg-none border-none rounded-lg transition-all duration-200 hover:text-brand-400 disabled:opacity-50"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default ButtonText;
