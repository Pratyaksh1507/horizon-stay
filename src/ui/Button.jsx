import { motion } from "framer-motion";

const sizes = {
  small: "text-[1.1rem] px-2 py-1 uppercase font-semibold text-center",
  medium: "text-[1.35rem] px-4 py-3 font-medium",
  large: "text-[1.5rem] px-6 py-3 font-medium",
};

const variations = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-zinc-900 text-zinc-400 border border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200",
  danger: "bg-red-600 text-red-100 hover:bg-red-700",
};

function Button({
  variation = "primary",
  size = "medium",
  type = "button",
  disabled,
  onClick,
  children,
  className = "",
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg shadow-sm transition-all duration-200 ${sizes[size]} ${variations[variation]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
